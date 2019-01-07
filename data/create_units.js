#!/usr/bin/env node

const fs = require('fs');

// Carrega catàleg i comandes
const products = require('./products.json');
const orders = require('./orders.json');

const ordersSQL = fs.createWriteStream('./orders.sql', 'utf8');
const unitsSQL = fs.createWriteStream('./units.sql', 'utf8');
const productsSQL = fs.createWriteStream('./products.sql', 'utf8');

const CURRENT_PHASE = 'TRGNOV18';
const CURRENT_INDEX = '01';
const START_DATE = '2018-11-02'
const SINCE_DATE = '2018-10-01'
const CHECKS = '0'.repeat(20);

// Genera ProductsSQL
products.forEach(({id, desc, checks }) => {
  const checkStr = JSON.stringify(checks || ['Producte lliurat correctament']).replace(/'/g, '\'\'');
  const descStr = (desc || 'Producte sense descripció').replace(/'/g, '\'\'');
  productsSQL.write(`INSERT INTO productes (id, descripcio, checks, since) VALUES ('${id}', '${descStr}', '${checkStr}', '${SINCE_DATE}') ON DUPLICATE KEY UPDATE descripcio='${descStr}', checks='${checkStr}';\n`);
})

// Omple la propietat "items" amb "units";
orders.forEach(school => {
  const ORDER_ID = `${school.codi}#${CURRENT_INDEX}`;
  ordersSQL.write(`INSERT INTO comandes (id, campanya, centre, estat, inici) VALUES ('${ORDER_ID}', '${CURRENT_PHASE}', '${school.codi}', 0, '${START_DATE}');\n`);
  school.items.forEach(item => {
    const product = products.find(p => p.id === item.id) || { checks: [] };
    item.qty = Math.max(item.qty, 1);
    item.units = [];
    for (let i = 0; i < item.qty; i++) {
      const num = `${1000 + i + 1}`.substr(1);
      const id = `Unitat ${i + 1}`;
      const desc = '';
      const problems = '';
      //const checks = '0'.repeat((product && product.checks && product.checks.length) || 1);
      item.units.push({
        num,
        id,
        desc,
        problems,
        CHECKS,
      });
      unitsSQL.write(`INSERT INTO unitats (comanda, producte, num, id, descripcio, problemes, checks) VALUES ('${ORDER_ID}', '${product.id}', '${num}', '${id}', '${desc}', '${problems}', ${CHECKS}');\n`);
    }
    delete item.qty;
  })
});

ordersSQL.end();
unitsSQL.end();
productsSQL.end();

