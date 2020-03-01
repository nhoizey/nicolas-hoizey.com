import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Pages
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
      }),
    ],
  }),
);

// Images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
      }),
    ],
  }),
);

// Fonts
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'shell',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

skipWaiting();
clientsClaim();
