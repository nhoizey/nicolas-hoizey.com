---
---
'use strict';

// Inspirations:
// - Jake Archibald's Offline Cookbook: https://jakearchibald.com/2014/offline-cookbook/
// - Jeremy Keith's Service Worker: https://adactio.com/journal/9775

const mandatoryCacheName = 'mandatory-v20180718-0907';
const pagesCacheName = 'pages-v20180522-0746';
const imagesCacheName = 'images-v20180911-1421';

const unavailableContentPage = '/offline-fallback.html';

const offlineMandatory = [
  unavailableContentPage,
  '/',
  '/offline.html',
  '/about/',
  '/about/the-website.html',
  '/assets/photo-de-nicolas-hoizey-512px.png',
  '/manifest.webmanifest',
  '{% asset "non-critical-styles" @path %}',
]

const offlinePages = [
  {% for post in site.posts limit:1 %}
  '{{ post.url }}',
  {% endfor %}
  {% for link in site.links limit:1 %}
  '{{ link.url }}',
  {% endfor %}
];

const offlineImages = [
];

function updateStaticCache() {
  // These items won't block the installation of the Service Worker
  caches.open(pagesCacheName)
    .then(cache => {
      cache.addAll(offlinePages);
    });
  caches.open(imagesCacheName)
    .then(cache => {
      cache.addAll(offlineImages);
    });
  // These items must be cached for the Service Worker to complete installation
  return caches.open(mandatoryCacheName)
    .then(cache => {
      return cache.addAll(offlineMandatory);
  });
}

function stashInCache(cacheName, request, response) {
  caches.open(cacheName)
    .then(cache => cache.put(request, response));
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
  caches.open(cacheName)
    .then(cache => {
      cache.keys()
        .then(keys => {
          if (keys.length > maxItems) {
            cache.delete(keys[0])
              .then(trimCache(cacheName, maxItems));
          }
        });
    });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys()
    .then(keys => {
      return Promise.all(keys
        .filter(key => `:${mandatoryCacheName}:${pagesCacheName}:${imagesCacheName}:`.indexOf(key) !== 0)
        .map(key => caches.delete(key))
      );
    });
}

self.addEventListener('install', event => {
  // `skipWaiting()` forces the waiting ServiceWorker to become the
  // active ServiceWorker, triggering the `onactivate` event.
  // Together with `Clients.claim()` this allows a worker to take effect
  // immediately in the client(s).
  // https://davidwalsh.name/service-worker-claim
  event.waitUntil(updateStaticCache()
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  // `claim()` sets this worker as the active worker for all clients that
  // match the workers scope and triggers an `oncontrollerchange` event for
  // the clients.
  event.waitUntil(clearOldCaches()
    .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data.command == 'trimCaches') {
    trimCache(pagesCacheName, 50);
    trimCache(imagesCacheName, 50);
  }
});

self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Don't try to handle non-secure assets because fetch will fail
  if (/http:/.test(request.url)) {
    return;
  }

  // Only cache local resources and images from Cloudinary
  if (!(url.origin == location.origin || url.origin == 'https://res.cloudinary.com')) {
    return;
  }

  // For HTML requests:
  // - look in the cache first,
  // - fetch from network and cache for later use,
  // - fallback to offline page
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          // CACHE
          return response || fetch(request)
            .then(response => {
              // NETWORK
              if (response.status === 200) {
                // Stash a copy of this page in the pages cache
                // Only cache valid responses
                // (for example, prevent caching of 404 errors)
                let copy = response.clone();
                stashInCache(pagesCacheName, request, copy);
              }
              return response;
            })
            .catch(() => {
              // OFFLINE WITHOUT CACHE
              return caches.match(unavailableContentPage);
            });
        })
    );

    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  event.respondWith(
    caches.match(request)
      .then(response => {
        // console.log('User agent = ' + navigator.userAgent);
        // console.log('Request.url = ' + request.url);
        // console.log('Request.destination = ' + request.destination);
        // CACHE
        return response || fetch(request)
          .then(response => {
            // NETWORK
            // If the request is for an image, stash a copy of this image in the images cache
            if (request.destination === 'image') {
              let copy = response.clone();
              stashInCache(imagesCacheName, request, copy);
            }
            return response;
          })
          .catch(() => {
            // OFFLINE
            // If the request is for an image, show an offline placeholder
            // https://hackernoon.com/service-worker-one-fallback-offline-image-for-any-aspect-ratio-b427c0f897fb#aaab
            if (request.url.match(/\.(jpe?g|png|gif|webp|svg)$/)) {
              return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><title id="offline-title">Offline</title><path fill="rgba(145,145,145,0.5)" d="M0 0h400v225H0z" /><text fill="rgba(0,0,0,0.33)" font-family="Georgia,serif" font-size="27" text-anchor="middle" x="200" y="113" dominant-baseline="central">offline</text></svg>', {headers: {'Content-Type': 'image/svg+xml'}});
            }
          });
      })
  );
});
