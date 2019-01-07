// See:
// https://medium.freecodecamp.org/how-to-build-a-pwa-with-create-react-app-and-custom-service-workers-376bd1fdc6d3
// https://github.com/GoogleChromeLabs/sw-precache

module.exports = {
  cacheId: 'chk_main',
  staticFileGlobs: [
    'build/index.html',
    'build/*.json',
    'build/*.js',
    'build/static/css/**.css',
    'build/static/js/**.js',
    'build/ico/favicon.ico',
  ],
  swFilePath: './build/service-worker.js',
  templateFilePath: './node_modules/sw-precache/service-worker.tmpl',
  stripPrefix: 'build/',
  runtimeCaching: [
    { urlPattern: /\/ico\//, handler: 'cacheFirst'},
    { urlPattern: /\/img\//, handler: 'cacheFirst'},
  ]
}