#!/usr/bin/env node

/**
 * Socket server for check-list
 * Uses [socket.io](https://socket.io/) to synchronize changes in real time between all
 * open sessions, also on different devices.
 */

const debug = require('debug')('chklist');
const io = require('socket.io')();
const PORT = process.env.SOCKET_PORT || 8080;

debug('Initializing socket.io server');

// Allow only authorized clients
io.use((socket, next) => {
  const phpCookieMatch = (socket.handshake.headers.cookie || '').match(/PHPSESSID=(\w*)/);
  // TODO: Check for cookie validity!
  if (phpCookieMatch && phpCookieMatch.length && phpCookieMatch[1])
    return next();
  else {
    debug('Unauthorized connection attempt from: %s', socket.handshake.address);
    next(new Error('Not authorized'));
  }
});

// Catch connections
io.on('connection', socket => {
  debug('Client connected on socket %s', socket.id);
  socket.on('disconnecting', reason => debug('Socket %s disconnected because of %s', socket.id, reason));
});

// Assign connections to specific namespaces, based on numeric school IDs
io.of(/^\/[0-9]+$/).on('connect', socket => {
  const nsp = socket.nsp;
  debug('Client on socket %s joined namespace %s', socket.id, nsp.name);
  // Catch 'update unit' messages:
  socket.on('update unit', (body, client) => {
    const data = JSON.parse(body);
    debug('Update received from %s for item %s of product %s', client, data.num, data.producte);
    nsp.emit('update unit', body, client);
  });
});

// Start server
io.listen(PORT);
debug('Socket.io is listening on port %d', PORT);
