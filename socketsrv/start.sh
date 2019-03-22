#!/bin/sh
. ./.env

# Log to a file:
# SOCKET_PORT=8000 DEBUG=chklist TOKEN=$TOKEN node index.js 2>>/var/log/socket.log | cat

# Log to console:
SOCKET_PORT=8000 DEBUG=chklist TOKEN=$TOKEN CLEANUP_INTERVAL=$CLEANUP_INTERVAL node index.js
