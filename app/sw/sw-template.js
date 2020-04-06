/* eslint-disable no-restricted-globals */
/* global importScripts */
if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
  );

  // Catch possible "SKIP_WAITING" events
  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  // Clean old caches created with `sw-precache`
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames
              .filter(cacheName => /^(sw-precache-v3|\$\$\$toolbox-cache\$\$\$)+/.test(cacheName))
              .map(cacheName => {
                console.log(`SW - Deleting old cache "${cacheName}"`);
                return caches.delete(cacheName);
              })
          );
        })
    );
  });

  /* global workbox */
  if (workbox) {

    // Set debug mode based on search params when registering, like: `sw.js?debug`
    // From: https://stackoverflow.com/questions/50795315/workbox-set-debug-mode-dynamically
    const url = new URL(location.href);
    const debug = url.searchParams.has('debug');
    workbox.setConfig({ debug });

    // Import statements
    const {
      core: { setCacheNameDetails, clientsClaim },
      precaching: { precacheAndRoute, createHandlerBoundToURL },
      routing: { NavigationRoute, registerRoute },
      strategies: { StaleWhileRevalidate, CacheFirst },
      expiration: { ExpirationPlugin },
      cacheableResponse: { CacheableResponsePlugin },
    } = workbox;

    // Set a specific prefix for this SW, used in cache names
    setCacheNameDetails({
      prefix: 'chklist',
    });

    // Take control immediatly
    clientsClaim();

    // Take control immediatly (not needed)
    // workbox.core.clientsClaim();

    // Injection point for manifest files
    precacheAndRoute(self.__WB_MANIFEST);

    // custom cache rules

    const handler = createHandlerBoundToURL('./index.html');
    const navigationRoute = new NavigationRoute(handler, {
      denylist: [/^\/_/, /\/[^/]+\.[^/]+$/],
    });
    registerRoute(navigationRoute);

    // Cache for images
    registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            purgeOnQuotaError: true,
          }),
        ],
      })
    );

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    registerRoute(
      /^https:\/\/fonts\.googleapis\.com/,
      new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
      })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, // One year
            maxEntries: 30,
          }),
        ],
      })
    );

  } else
    console.log('Workbox could not be loaded. No Offline support!');

}