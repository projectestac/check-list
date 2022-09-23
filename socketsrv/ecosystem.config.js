// Settings for [PM2 Runtime](https://github.com/Unitech/pm2)
// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps : [{
    name: 'SocketSrv',
    cwd: __dirname,
    script: './index.js',    
    autorestart: true,
    watch: process.env.NODE_ENV === 'development',
    env: {
      NODE_ENV: 'production',
      SOCKET_PORT: 8000,
      DEBUG: 'chklist',
      TOKEN: process.env.TOKEN,
      CLEANUP_INTERVAL: process.env.CLEANUP_INTERVAL,
    },
    env_production: {
      NODE_ENV: 'production',
      SOCKET_PORT: 8000,
      DEBUG: 'chklist',
      TOKEN: process.env.TOKEN,
      CLEANUP_INTERVAL: process.env.CLEANUP_INTERVAL,
    },
    env_development: {
      NODE_ENV: 'development',
      SOCKET_PORT: 8000,
      DEBUG: 'chklist',
      TOKEN: process.env.TOKEN,
      CLEANUP_INTERVAL: process.env.CLEANUP_INTERVAL,
    }
  }],
};
