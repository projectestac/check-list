#!/bin/sh

# Log to a file:
# SOCKET_PORT=8000 DEBUG=chklist node index.js 2>>/var/log/socket.log | cat

# Log to console:
SOCKET_PORT=8000 DEBUG=chklist node index.js
