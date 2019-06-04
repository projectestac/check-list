/* eslint-disable no-restricted-globals */
/* global importScripts */
if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
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

    // Set a specific prefix for this SW, used in cache names
    workbox.core.setCacheNameDetails({
      prefix: 'chklist',
    });


    // Take control immediatly (not needed)
    // workbox.core.clientsClaim();

    // injection point for manifest files
    workbox.precaching.precacheAndRoute([], {});

    // custom cache rules
    workbox.routing.registerNavigationRoute(
      // was '/index.html',
      workbox.precaching.getCacheKeyForURL('./index.html'),
      {
        blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
      }
    );

    // Cache for images
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

  } else
    console.log('Workbox could not be loaded. No Offline support!');

}