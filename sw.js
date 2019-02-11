---
---
'use strict';

const version = '20190211-1815';

const cacheName = 'NHO' + `-${version}`;
const offlineFallback = '/offline-fallback.html';
const cachedFiles = [
  offlineFallback,
  '/offline.html',
  '/',
  '/index.html',
  '/about/',
  '/about/the-website.html',
  '/manifest.webmanifest',
  '{% asset "non-critical-styles" @path %}',
  {% for link in site.categories['links'] limit:3 %}
  '{{ link.url }}',
  {% endfor %}
];

// https://mdn.io/serviceworker+oninstall
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        // These items won't block the installation
        // https://mdn.io/cache+addall
        return cache.addAll(cachedFiles);
      })
      .then(() => {
        console.info(`[SW] Service Worker ${version} installed.`);
        return self.skipWaiting();
      }),
  );
});

// https://mdn.io/serviceworker+onactivate
self.addEventListener('activate', event => {
  console.info(`[SW] Service Worker ${version} activated.`);
  event.waitUntil(clients.claim());
});

// https://mdn.io/serviceworker+onfetch
self.addEventListener('fetch', event => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  console.groupCollapsed(`[SW] Page requests ${requestUrl.pathname}`);
  console.info(`- mode: ${request.mode}`);
  console.info(`- destination: ${request.destination}`);
  console.info(`- origin: ${requestUrl.origin}`);
  console.groupEnd();

  // https://mdn.io/request+origin
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // Cache First
  event.respondWith(
    // https://mdn.io/cache+match
    caches.open(cacheName).then(cache => {
      return cache.match(request).then(cacheResponse => {
        // Resource available in cache
        if (cacheResponse) {
          console.info(
            `[SW] Resource ${requestUrl.pathname} taken from cache`,
          );
        }
        let fetchPromise = fetch(request)
          .then(serverResponse => {
            // Resource provided by the server
            if (serverResponse.status !== 200) {
              // Only cache valid responses (prevent caching of 40x or 50x errors)
              return serverResponse;
            }
            // Stash a copy of this page in the pages cache
            let copy = serverResponse.clone();
            // https://mdn.io/cache+put
            cache.put(request, copy).then(() => {
              console.info(
                `[SW] Resource ${
                  requestUrl.pathname
                } stored in cache "${cacheName}"`,
              );
            });
            return serverResponse;
          })
          .catch(() => {
            // Can't fetch from server
            console.info(
              `[SW] Couldn't get resource ${requestUrl.pathname} from server`,
            );
            return new Response('Service Temporarily Unavailable', {
              status: 503,
              statusText: 'Service Temporarily Unavailable',
              contentType: 'text/plain',
            });
          });
        return cacheResponse || fetchPromise;
      });
    }),
  );
});
