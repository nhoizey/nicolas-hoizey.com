importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

const offlineFallback = "/offline-fallback.html";
const preCachedFiles = [
  '/css/additional.css',
  '/js/additional.js',
  '/assets/fonts/notoserif-regular-subset.woff2',
  '/manifest.webmanifest',
  '/assets/default-screenshot.svg',
  '/offline.html',
  offlineFallback,
];
const preCachedPages = ["/about/", "/about/the-website.html"];
const pagesCacheName = "pages";

if (workbox) {
  workbox.setConfig({
    debug: true
  });

  self.addEventListener("install", event => {
    event.waitUntil(
      caches.open(pagesCacheName).then(cache => cache.addAll(preCachedPages))
    );
  });

  // https://developers.google.com/web/tools/workbox/guides/precache-files/
  workbox.precaching.precacheAndRoute(preCachedFiles, {
    // Ignore all URL parameters:
    // https://developers.google.com/web/tools/workbox/modules/workbox-precaching#ignore_url_parameters
    ignoreURLParametersMatching: [/.*/]
  });

  workbox.precaching.cleanupOutdatedCaches();

  // Cache only GET requests
  workbox.routing.registerRoute(
    ({ event }) => event.request.method !== "GET",
    new workbox.strategies.NetworkOnly()
  );

  // Never cache ranged requests (videos)
  workbox.routing.registerRoute(
    ({ event }) => event.request.headers.has("range"),
    new workbox.strategies.NetworkOnly()
  );

  // Try to get fresh HTML from network, but don't wait for more than 3 seconds
  workbox.routing.registerRoute(
    ({ event }) => event.request.destination === "document",
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 2,
      cacheName: pagesCacheName,
      plugins: [new workbox.broadcastUpdate.Plugin()]
    })
  );

  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate({
      plugins: [new workbox.broadcastUpdate.Plugin()]
    })
  );

  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case "document":
        return caches.match(
          workbox.precaching.getCacheKeyForURL(offlineFallback)
        );
        break;

      case "image":
        return new Response(
          '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 225" xmlns="https://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><title id="offline-title">Offline</title><path fill="rgba(145,145,145,0.5)" d="M0 0h400v225H0z" /><text fill="rgba(0,0,0,0.33)" font-family="Georgia,serif" font-size="27" text-anchor="middle" x="200" y="113" dominant-baseline="central">offline</text></svg>',
          { headers: { "Content-Type": "image/svg+xml" } }
        );
        break;

      default:
        // If we don't have a fallback, just return an error response.
        return new Response("Service Temporarily Unavailable", {
          status: 503,
          statusText: "Service Temporarily Unavailable",
          contentType: "text/plain"
        });
    }
  });

  workbox.googleAnalytics.initialize({
    hitFilter: (params) => {
      const queueTimeInSeconds = Math.round(params.get('qt') / 1000);
      params.set('cm1', queueTimeInSeconds);
    },
    parameterOverrides: {
      cd4: 'offline',
    },
  });

  self.addEventListener("message", event => {
    console.log(`[SW] Receiving a message: ${event.data.type}`);
  });

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
}
