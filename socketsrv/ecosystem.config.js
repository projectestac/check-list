// Settings for [PM2 Runtime](https://github.com/Unitech/pm2)
// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/

require('dotenv').config();

module.exports = {
  apps : [{
    name: 'SocketSrv',
    script: './index.js',    
    autorestart: true,
    watch: process.env.NODE_ENV === 'development',
    env: {
      SOCKET_PORT: 8000,
      DEBUG: 'chklist'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development'
    }
  }],
};
