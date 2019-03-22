#!/usr/bin/env node

/**
 * Socket server for check-list
 * Uses [socket.io](https://socket.io/) to synchronize changes in real time between all
 * open sessions, also on different devices.
 */

const debug = require('debug')('chklist');
const io = require('socket.io')();
const PORT = process.env.SOCKET_PORT || 8080;
const TOKEN = process.env.TOKEN || '';
const dataBuffer = [];

debug('Initializing socket.io server with token "%s"', TOKEN);

// Allow only authorized clients
io.use((socket, next) => {
  const client = socket.handshake.query.client;
  const token = socket.handshake.query.token || '';
  const phpCookieMatch = (socket.handshake.headers.cookie || '').match(/PHPSESSID=(\w*)/);
  // TODO: Check for cookie validity!
  if (token === TOKEN && client && client.length === 8 && phpCookieMatch && phpCookieMatch.length && phpCookieMatch[1])
    return next();
  else {
    debug('Unauthorized connection attempt from: %s', socket.handshake.address);
    next(new Error('Not authorized'));
  }
});

// Catch connections
io.on('connection', socket => {
  const client = socket.handshake.query.client;
  debug('Client %s connected', client);
  socket.on('disconnecting', reason => debug('Client %s disconnected because of %s', client, reason));
});

// Assign connections to specific namespaces, based on numeric school IDs
io.of(/^\/[0-9]+$/).on('connect', socket => {
  const nsp = socket.nsp;
  const client = socket.handshake.query.client;
  debug('Client %s joined namespace %s', client, nsp.name);
  // Catch 'update unit' messages:
  socket
    .on('update unit', (body) => {
      const data = JSON.parse(body);
      // TODO: Flush buffer at regular intervals!
      dataBuffer.push({ timestamp: new Date().getTime(), client, data });
      debug('Update received from %s for item %s of product %s', client, data.num, data.producte);
      nsp.emit('update unit', body, client);
    })
    .on('rewind', (comanda, since, fn) => {
      debug('Rewind request received from %s for %s since %s', client, comanda, new Date(since));
      const sinceTimestamp = new Date().getTime() - since;
      result = dataBuffer.filter(d => d.data.comanda === comanda && d.timestamp > sinceTimestamp);
      fn(JSON.stringify(result));
    });
});

// Start server
io.listen(PORT);
debug('Socket.io is listening on port %d', PORT);
