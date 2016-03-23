'use strict';

// https://www.smashingmagazine.com/2016/02/making-a-service-worker/

const cacheName = 'static_v1';

self.addEventListener('install', event => {

  function onInstall () {
    return caches.open(cacheName)
      .then(cache => cache.addAll([
        '/assets/styles.css',
        '/index.html',
        '/',
        '/offline.html'
      ])
    );
  }

  event.waitUntil(onInstall(event));
});

self.addEventListener('activate', event => {

});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
