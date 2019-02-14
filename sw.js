---
---
'use strict';

const version = '20190213-1239';

const cacheName = 'NHO' + `-${version}`;
const offlineFallback = '/offline-fallback.html';
const cachedFiles = [
  offlineFallback,
  '/offline.html',
  '/',
  // '/index.html',
  '/about/',
  '/about/the-website.html',
  '/manifest.webmanifest',
  '{% asset "non-critical-styles" @path %}',
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
  event.waitUntil(
    // Clean previous caches
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }),
        clients.claim(),
      );
    }),
  );
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

  // Only cache resources from own origin and Cloudinary
  // https://mdn.io/request+origin
  if (requestUrl.origin !== self.location.origin && requestUrl.origin !== 'https://res.cloudinary.com') {
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
            // Opaque responses have a 0 status
            // https://cloudfour.com/thinks/when-7-kb-equals-7-mb/
            if ([0, 200].indexOf(serverResponse.status) == -1) {
              // Only cache valid responses (prevent caching of 40x or 50x errors)
              return serverResponse;
            }
            // Stash a copy of this content in cache
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
            if (/(\.html|\/)$/.test(requestUrl.pathname)) {
              // HTML fallback
              return caches.match(offlineFallback).then(fallbackResponse => {
                if (fallbackResponse) {
                  return fallbackResponse;
                } else {
                  // Fallback not available in cache
                  console.info(
                    `[SW] Resource ${offlineFallback} not available anywhere`,
                  );
                  return new Response('page not available', {
                    status: 404,
                    statusText: 'Not found',
                    contentType: 'text/plain',
                  });
                }
              });
            } else {
              // Image fallback
              return new Response(
                '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><title id="offline-title">Offline</title><path fill="rgba(145,145,145,0.5)" d="M0 0h400v225H0z" /><text fill="rgba(0,0,0,0.33)" font-family="Georgia,serif" font-size="27" text-anchor="middle" x="200" y="113" dominant-baseline="central">offline</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } },
              );
            }
          });
        return cacheResponse || fetchPromise;
      });
    }),
  );
});
