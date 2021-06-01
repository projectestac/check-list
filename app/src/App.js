
import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import color_primary from '@material-ui/core/colors/teal';  // was indigo (teal)
import color_secondary from '@material-ui/core/colors/green';  // was pink (green)
import color_error from '@material-ui/core/colors/red';

import { handleFetchErrors, loadGFont } from './utils/Utils';
import Order from './controllers/Order';

import Header from './components/Header';
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import CheckList from './components/CheckList';
import Snack from './components/Snack';

/**
 * Main Material-UI theme
 */
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: { main: color_primary[500] },
      secondary: { main: color_secondary[500] },
      error: { main: color_error[500] },
    },
    typography: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  })
);

/**
 * Miscellanous values taken from environment variables
 * and from files: `.env`, `.env.development` and `.env.production`
 */
const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';
const CAMPAIGN = process.env.REACT_APP_CAMPAIGN || '';
const UPDATE_INTERVAL = process.env.REACT_APP_UPDATE_INTERVAL || 5000;

/**
 * Main React component
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.snack = React.createRef();
  }

  /**
   * Main data is stored in 'order'
   */
  state = {
    loggedIn: false,
    loading: false,
    error: null,
    centre: null,
    order: null,
  };

  /**
   * Checks if the current user is already logged in, sending the
   * PHP cookie to the API
   */
  checkIfLoggedIn = () => {
    this.setState({ loading: true });

    return fetch(`${API_ROOT}/login/`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(handleFetchErrors)
      .then(response => response.json())
      .then(({ codi }) => {
        if (codi) {
          this.setState({ centre: codi, loading: true });
          return this.loadOrder(codi);
        }
        this.setState({ loading: false });
        return false;
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      });
  }

  /**
   * Fetch a new login request
   */
  checkLogin = (codi, pwd) => {
    this.setState({ loading: true });

    return fetch(`${API_ROOT}/login/`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ codi, pwd })
    })
      .then(handleFetchErrors)
      .then(response => response.json())
      .then(({ codi }) => {
        this.setState({ centre: codi, loading: true });
        return this.loadOrder(codi);
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      })
  }

  /**
   * Load order data for the current school and campaign
   */
  loadOrder = (codi) => {
    return Order.fetchOrder(codi, CAMPAIGN)
      .then((order) => {
        this.setState({ order, loading: false, loggedIn: true });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      });
  }

  /**
   * Closes the current session
   */
  logout = () => {
    this.setState({ loading: true });
    return fetch(`${API_ROOT}/login/?clear=true`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(handleFetchErrors)
      .then(() => document.location.reload())
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      });
  }

  /**
   * Miscellaneous operations to be performed at startup
   */
  componentDidMount() {
    // Load Google's "Roboto" font
    loadGFont('Roboto');
    // Check if the current user is already logged in
    this.checkIfLoggedIn();
    // Prepare a warning message to be shown when leaving the app with unsaved data
    window.onbeforeunload = () => {
      if (Object.keys(this.updateBuffer).length > 0 && !this.processingBuffer) {
        this.processBuffer();
        return 'ATENCIÓ: Hi ha dades pendents de ser desades al servidor!';
      }
    }
    // Prepare a queue processing cron
    window.setInterval(this.processBuffer, UPDATE_INTERVAL);
  }

  /**
   * Prepare a buffer for storing operations not yet processed by the API
   */
  updateBuffer = {};
  processingBuffer = false;

  /**
   * Invoked when data related to some unit has been updated
   */
  handleUpdateUnit = (unit) => {
    const { comanda, producte, num } = unit;
    const key = `${comanda}|${producte}|${num}`;
    // Store changes on buffer, to be processed at the next time interval
    this.updateBuffer[key] = unit;
  }

  /**
   * Process pending transactions.
   * This function is called at regular intervals,
   * every `UPDATE_INTERVAL` seconds.
   */
  processBuffer = () => {
    const keys = [...Object.keys(this.updateBuffer)];
    const { order } = this.state;
    if (keys.length && !this.processingBuffer) {
      this.processingBuffer = true;
      Promise.all(keys.map(k => {
        return order.updateUnit(this.updateBuffer[k])
          .then(response => k);
      }))
        .then(keysProcessed => {
          keysProcessed.forEach(k => delete this.updateBuffer[k]);
          this.processingBuffer = false;
          this.snack.current.close();
        })
        .catch(err => {
          console.error(`ERROR: ${err}`);
          this.processingBuffer = false;
          this.snack.current.show(`ATENCIÓ: La connexió està fallant. No s'estan desant els canvis!`);
        });
    }
  }

  /**
   * Build the main component
   */
  render() {
    const { error, loading, loggedIn, order } = this.state;

    const menuItems = (order && order.items) ?
      order.items.map(item => { return { id: item.id, name: item.descripcio } }) :
      [];

    const centre = (order && `${order.centre} ${order.nomcentre} (${order.localitat})`) || '';

    return (
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <header>
            <Header menuItems={menuItems} centre={centre} logout={centre && this.logout} />
          </header>
          <main>{
            (error && <ErrorPage error={error} />) ||
            (loading && <Loading />) ||
            (loggedIn && <CheckList order={order} updateUnit={this.handleUpdateUnit} />) ||
            <Login onLogin={this.checkLogin} />
          }</main>
          <Snack ref={this.snack} />
        </ThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
