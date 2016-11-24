// https://remysharp.com/2016/03/22/the-copy--paste-guide-to-your-first-service-worker
// https://jakearchibald.com/2014/offline-cookbook/#network-falling-back-to-cache

const cacheName = 'v1::static';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
