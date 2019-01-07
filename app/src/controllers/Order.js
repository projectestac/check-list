import Unit from './Unit';
import { Parser } from 'json2csv';
import openSocket from 'socket.io-client';
import Utils from '../utils/Utils';

const API_ROOT = process.env.REACT_APP_API_ROOT || '../api';
const SOCKET_HOST = process.env.REACT_APP_SOCKET_HOST || window.location.hostname;
const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT || window.location.port;
const SOCKET_PROTOCOL = process.env.REACT_APP_SOCKET_PROTOCOL || window.location.protocol;
const SOCKET_SERVER = `${SOCKET_PROTOCOL}//${SOCKET_HOST}:${SOCKET_PORT}`;

function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

function fetchPost(url, data, method = 'POST', credentials = 'same-origin') {
  const body = new URLSearchParams();
  Object.keys(data).forEach(k => body.append(k, data[k]));
  return fetch(url, {
    method,
    credentials,
    body,
  });
}

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
  client = (Math.floor(Math.random() * 0x100000000) + 0x100000000).toString(16).substr(1).toUpperCase();
  socket = null;

  static fetchOrder(centre, campanya) {
    const order = new Order();
    return fetchPost(`${API_ROOT}/comandes/`, { centre, campanya })
      .then(handleErrors)
      .then(response => response.json())
      .then(orders => {
        if (!orders || orders.length === 0)
          throw (new Error(`El centre ${centre} no existeix o no té cap dotació en curs.`));
        return Object.assign(order, orders[0]);
      })
      .then(() => fetchPost(`${API_ROOT}/productes/`, { comanda: order.id }))
      .then(handleErrors)
      .then(response => response.json())
      .then(products => {
        order.items = [...products];
      })
      .then(() => fetchPost(`${API_ROOT}/unitats/`, { comanda: order.id }))
      .then(handleErrors)
      .then(response => response.json())
      .then(units => {
        order.items.forEach(it => {
          it.productStatus = 0;
          it.units = units.filter(u => u.producte === it.id).map(u => Unit.createUnit(u, it));
        });
        order.updateSummary();
        order.subscribeToUpdates();
        return order;
      })
  }

  subscribeToUpdates() {
    console.log(`Client ID: ${this.client}`);
    // TODO: Catch socket errors?
    this.socket = openSocket(`${SOCKET_SERVER}/${this.centre}?token=ABCDEF`);
    // Handle 'update unit' messages
    this.socket.on('update unit', (body, client) => {
      // Discard own messages!
      if (client !== this.client) {
        const data = JSON.parse(body);
        const { comanda, producte, num } = data;
        const unit = comanda === this.id && this.findUnit(producte, num);
        if (unit) {
          console.log(`Item ${producte}#${num} modified by ${client}`);
          unit.updateContent(data);
        }
        else
          console.error(`Received update for unknown item: ${comanda} - ${producte} - ${num}`);
      }
    });
  }

  findUnit(productId, num) {
    const product = this.items.find(p => p.id === productId);
    return product && product.units.find(u => u.num === num);
  }

  updateUnit(unit) {
    const body = unit.getJSON();
    console.log(`Updating unit: ${body}`);
    // Save changes to API
    return fetch(`${API_ROOT}/unitats/`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body,
    })
      .then(Utils.handleFetchErrors)
      .then(response => response.json())
      .then(result => {
        if (this.socket)
          // Broadcast an 'update unit' message to all same school mates
          this.socket.emit('update unit', body, this.client);
        return result;
      })
  }

  initSummary() {
    this.summary = {
      products: { num: 0, done: 0, state: [0, 0, 0, 0] },
      units: { num: 0, done: 0, state: [0, 0, 0, 0] },
      checks: { num: 0, done: 0 }
    };
    return this.summary;
  }

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