## Socket server for CheckList

Uses [socket.io](https://socket.io/) to synchronize changes in real time between all open sessions, also on different devices.

The port number is taken from the environment variable __SOCKET_PORT__

To enable log messages, set also the __DEBUG__ variable

### Manual startup with HTTP/WS

Launch server with only chklist messages:
```
SOCKET_PORT=8000 DEBUG=chklist node index.js
```

Launch server with all debug messages:
```
SOCKET_PORT=8000 DEBUG=* node index.js
```

Launch server debugging to a file:
```
SOCKET_PORT=8000 DEBUG=chklist node index.js 2>>socket.log | cat
```

### Manual startup with HTTPS/WSS

For a direct SSL configuration see:<br>
https://stackoverflow.com/questions/6599470/node-js-socket-io-with-ssl


### Tunneling the socket service through Apache

In Apache 2.4 enable __rewrite__, __proxy__, __proxy_wstunnel__ and __proxy_http__.<br>
Then include this block in the vhost template, replacing _sockethost_ by the
name of the host running the socket server ('localhost' if it's the same machine):

```
RewriteEngine On
RewriteCond %{REQUEST_URI}  ^/socket.io                 [NC]
RewriteCond %{QUERY_STRING} transport=websocket         [NC]
RewriteRule /(.*)           ws://sockethost:8000/$1     [P,L]

ProxyPass        /socket.io http://sockethost:8000/socket.io
ProxyPassReverse /socket.io http://sockethost:8000/socket.io
```

### Deploying socket.io as a service on Linux with [PM2 Runtime](https://pm2.io)

PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

To automatically launch the socket service at server startup:

```
# Globally install PM2 in your system:
host> npm i -g pm2

# Enter on the socketsrv directory, replacing 'path/to/socketsrv' with the real path on your system:
host> cd path/to/socketsrv

# Launch PM2 ('--env' can be 'production' or 'development'):
host> pm2 start ecosystem.config.js --env production

# Launch PM2 on reboot:
host> pm2 startup

# Freeze the list of processes to start on reboot:
host> pm2 save
```

That's all!<br>
From here, use the following commands to check the service and display logs:

```
# List all current PM2 services
host> pm2 ls

# Get more details about the app:
host> pm2 show SocketSrv

# Display service logs:
host> pm2 logs SocketSrv

# Monitor services:
host> pm2 monit
```
