import Unit from './Unit';
import { Parser } from 'json2csv';
import openSocket from 'socket.io-client';
import Utils from '../utils/Utils';

/**
 * Miscellaneous constants used in this class
 */
const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';
const SOCKET_HOST = process.env.REACT_APP_SOCKET_HOST || window.location.hostname;
const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT || window.location.port;
const SOCKET_PROTOCOL = process.env.REACT_APP_SOCKET_PROTOCOL || window.location.protocol;
const SOCKET_SERVER = `${SOCKET_PROTOCOL}//${SOCKET_HOST}:${SOCKET_PORT}`;
const SOCKET_TOKEN = process.env.REACT_APP_SOCKET_TOKEN || '';

/**
 * Builds a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) promise
 * using URLSearchParams to format and encode the request body
 * @param {string} url 
 * @param {object} data 
 * @param {string} method 
 * @param {string} credentials 
 */
function fetchPost(url, data, method = 'POST', credentials = 'same-origin') {
  const body = new URLSearchParams();
  Object.keys(data).forEach(k => body.append(k, data[k]));
  return fetch(url, {
    method,
    credentials,
    body,
  });
}

/**
 * This class encapsulates data related to a specific school order.
 * Each school order should contain multiple 'items'. Each item
 * corresponds to a specifc product.
 * Each product order has a set of checks to be performed and a specific amount of 'units'.
 * Each unit (encapsulated in objects of type `Unit`) has a specific identifier, description,
 * and check state.
 */
class Order {

  id = null;
  campanya = '';
  centre = '00000000';
  estat = 0;
  inici = null;
  final = null;
  observacions = '';
  nomcentre = '';
  localitat = '';
  sstt = '';
  items = [];
  summary = null;
  // Random client ID, used to identify own socket messages
  client = (Math.floor(Math.random() * 0x100000000) + 0x100000000).toString(16).substr(1).toUpperCase();
  socket = null;
  disconnectedSince = null;

  /**
   * Performs a serie of `fetch` queries to the API, returning a promise that resolves on a new `Order` object
   * @param {string} centre 
   * @param {string} campanya 
   */
  static fetchOrder(centre, campanya) {
    // Prepare an empty Order object
    const order = new Order();
    // Fetch main order data
    return fetchPost(`${API_ROOT}/comandes/`, { centre, campanya })
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(orders => {
        if (!orders || orders.length === 0)
          throw (new Error(`El centre ${centre} no existeix o no té cap dotació en curs.`));
        // Fill the `order` object with fetched data
        return Object.assign(order, orders[0]);
      })
      // Fetch data of products related to this order
      .then(() => fetchPost(`${API_ROOT}/productes/`, { comanda: order.id }))
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(products => {
        // Fill order.items with specific product data (no units yet!)
        order.items = [...products];
      })
      // Fetch data for all units related to this order
      .then(() => fetchPost(`${API_ROOT}/unitats/`, { comanda: order.id }))
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(units => {
        // Create the array of Unit objects for each product
        order.items.forEach(it => {
          it.productStatus = 0;
          it.units = units.filter(u => u.producte === it.id).map(u => Unit.createUnit(u, it));
        });
        // Update global data and subscribe to external updates
        order.updateSummary();
        order.subscribeToUpdates();
        window.theOrder=order;
        return order;
      })
  }

  /**
   * Connect this Order object to the socket server and wait for possible updates
   * from other clients.
   */
  subscribeToUpdates() {
    console.log(`Socket client ID: ${this.client}`);
    // TODO: Pass a secret token!
    this.socket = openSocket(`${SOCKET_SERVER}/${this.centre}?client=${this.client}&token=${SOCKET_TOKEN}`);

    this.socket
      .on('reconnect', () => {
        console.log('Reconnected to socket server.');
        const delay = this.disconnectedSince ? new Date().getTime() - this.disconnectedSince : 0;
        if (delay > 5000) {
          // Disconnected for more than 5"
          console.log('Requesting data since ', this.disconnectedSince);
          this.requestSocketMessages(delay);
        }
        this.disconnectedSince = null;
      })
      .on('disconnect', (reason) => {
        console.log(`Disconnected of socket server because of: ${reason}`);
        if (!this.disconnectedSince)
          this.disconnectedSince = new Date().getTime();
      })
      .on('update unit', (body, client) => {
        // Discard own messages!
        if (client !== this.client) {
          const data = JSON.parse(body);
          this.updateUnitFromSocket(data, client);
        }
      });
  }

  updateUnitFromSocket(data, from) {
    const { comanda, producte, num } = data;
    const unit = comanda === this.id && this.findUnit(producte, num);
    if (unit) {
      console.log(`Item ${producte}#${num} modified by ${from}`);
      unit.updateContent(data);
    }
    else
      console.error(`Received update for unknown item: ${comanda} - ${producte} - ${num}`);
  }

  requestSocketMessages(from) {
    this.socket.emit('rewind', this.id, from, (result) => {
      result = JSON.parse(result);
      console.log('Requested data: ', result);
      if (result && result.length)
        result.forEach(d => this.updateUnitFromSocket(d.data, d.client));
    });
  }

  /**
   * Find the Nth unit of a specific product
   * @param {string} productId 
   * @param {number} num 
   */
  findUnit(productId, num) {
    const product = this.items.find(p => p.id === productId);
    return product && product.units.find(u => u.num === num);
  }

  /**
   * Updates the unit data on the database and
   * notifies other possible clients that data has changed
   * @param {Unit} unit - Object of type `Unit`
   */
  updateUnit(unit) {
    const body = unit.getJSON();
    console.log(`Updating unit: ${body}`);
    // Send a PATCH operation to the API
    return fetch(`${API_ROOT}/unitats/`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body,
    })
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(result => {
        // Data successfully saved
        if (this.socket)
          // Broadcast an 'update unit' message to all mates subscribed to the same school
          this.socket.emit('update unit', body);
        return result;
      })
  }

  /**
   * Initializes the summary data
   */
  initSummary() {
    this.summary = {
      products: { num: 0, done: 0, state: [0, 0, 0, 0] },
      units: { num: 0, done: 0, state: [0, 0, 0, 0] },
      checks: { num: 0, done: 0 }
    };
    return this.summary;
  }

  /**
   * Updates the summary data. Called when any element is updated.
   */
  updateSummary() {
    const { products, units, checks } = this.initSummary();
    this.items.forEach(product => {
      const numChecks = product.checks.length;
      products.num++;
      units.num += product.units.length;
      checks.num += numChecks * product.units.length;
      product.productStatus = 0;
      product.units.forEach(unit => {
        const { unitStatus, checksDone } = unit;
        product.productStatus = (product.productStatus === 3 || unitStatus === 3) ? 3
          : (product.productStatus === 2 && unitStatus !== 2) ? 1
            : (product.productStatus === 1) ? 1
              : unitStatus;
        units.state[unitStatus]++;
        units.done += unitStatus === 2 ? 1 : 0;
        checks.done += checksDone || 0;
      })
      products.state[product.productStatus]++;
      products.done += (product.productStatus === 2 ? 1 : 0);
    });
    return this.summary;
  }

  /**
   * Generates a [json2csv](https://github.com/zemirco/json2csv) object
   * containing the data of all items and returns
   * a string with the full CSV file content.
   */
  csvExport() {
    const fields = [
      'PRODUCTE',
      'CODI',
      'NUM',
      'SACE',
      'DESCRIPCIO',
      'PROBLEMES',
      'COMPROVACIONS_TOTAL',
      'COMPROVACIONS_OK',
      'COMPROVAT'
    ];

    const parser = new Parser({ fields });
    return parser.parse(this.items.reduce((all, product) => {
      return all.concat(product.units.map(unit => {
        return {
          PRODUCTE: product.descripcio,
          CODI: product.id,
          NUM: unit.num,
          SACE: unit.id,
          DESCRIPCIO: unit.descripcio,
          PROBLEMES: unit.problemes,
          COMPROVACIONS_TOTAL: product.checks.length,
          COMPROVACIONS_OK: unit.checksDone,
          COMPROVAT: unit.unitStatus === 2,
        }
      }));
    }, []));
  }

  /**
   * Generates a CSV file containing the data of all items.
   * @param {string} fileName 
   */
  csvExportToFile(fileName) {
    const blob = new Blob(['\uFEFF' + this.csvExport()], { type: 'text/csv;charset=utf-16;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}

export default Order;