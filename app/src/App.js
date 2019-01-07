
import React, { Component } from 'react';

// Tema
import Utils from './utils/Utils';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import color_primary from '@material-ui/core/colors/teal';  // was indigo (teal)
import color_secondary from '@material-ui/core/colors/green';  // was pink (green)
import color_error from '@material-ui/core/colors/red';

import Order from './controllers/Order';

import Header from './components/Header';
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import CheckList from './components/CheckList';
import Snack from './components/Snack';

const theme = createMuiTheme({
  palette: {
    primary: { main: color_primary[500] },
    secondary: { main: color_secondary[500] },
    error: { main: color_error[500] },
  },
  typography: {
    useNextVariants: true,
  },
});

const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';
const CAMPAIGN = process.env.REACT_APP_CAMPAIGN || '';
const UPDATE_INTERVAL = process.env.REACT_APP_UPDATE_INTERVAL || 5000;

class App extends Component {

  constructor(props) {
    super(props);
    this.snack = React.createRef();
  }

  state = {
    loggedIn: false,
    loading: false,
    error: null,
    centre: null,
    order: null,
  };

  checkIfLoggedIn = () => {
    this.setState({ loading: true });

    return fetch(`${API_ROOT}/login/`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(({ codi }) => {
        if (codi)
          return this.loadOrder(codi);
        this.setState({ loading: false });
        return false;
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      });
  }

  checkLogin = (codi, pwd) => {
    this.setState({ loading: true });

    return fetch(`${API_ROOT}/login/`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ codi, pwd })
    })
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(({ codi }) => this.loadOrder(codi))
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      })
  }

  loadOrder = (codi) => {
    this.setState({ centre: codi, loading: true });
    return Order.fetchOrder(codi, CAMPAIGN)
      .then((order) => {
        this.setState({ order, loading: false, loggedIn: true });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      });
  }

  logout = () => {
    this.setState({ loading: true });
    return fetch(`${API_ROOT}/login/?clear=true`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(Utils.handleFetchErrors)
      .then(() => document.location.reload())
      .catch(error => {
        console.error(error);
        this.setState({ error: error.toString() });
      });
  }

  componentDidMount() {
    Utils.loadGFont('Roboto');
    this.checkIfLoggedIn();
    window.onbeforeunload = () => {
      if (Object.keys(this.updateBuffer).length > 0 && !this.processingBuffer) {
        this.processBuffer();
        return 'ATENCIÓ: Hi ha dades pendents de ser desades al servidor!';
      }
    }
    window.setInterval(this.processBuffer, UPDATE_INTERVAL);
  }

  updateBuffer = {};
  processingBuffer = false;

  handleUpdateUnit = (unit) => {
    const {comanda, producte, num} = unit;
    const key = `${comanda}|${producte}|${num}`;
    this.updateBuffer[key] = unit;
  }

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
        })
        .catch(err => {
          console.error(`ERROR: ${err}`);
          this.snack.current.show(`ATENCIÓ: La connexió està fallant. No s'estan desant els canvis!`);
        })
        .finally(() => {
          this.processingBuffer = false;
        });
    }
  }

  render() {
    const { error, loading, loggedIn, order } = this.state;

    const menuItems = (order && order.items) ?
      order.items.map(item => { return { id: item.id, name: item.descripcio } }) :
      [];

    const centre = (order && `${order.centre} ${order.nomcentre} (${order.localitat})`) || '';

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
