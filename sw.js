---
---
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

const cacheName = "NHO";
const offlineFallback = "/offline-fallback.html";
const cachedFiles = [
  // "/index.html",
  "/",
  '{% asset "non-critical-styles" @path %}',
  "/about/",
  "/about/the-website.html",
  "/manifest.webmanifest",
  "/offline.html",
  offlineFallback
];

if (workbox) {
  workbox.setConfig({
    debug: true
  });

  workbox.googleAnalytics.initialize();

  // https://developers.google.com/web/tools/workbox/guides/configure-workbox
  workbox.core.setCacheNameDetails({
    prefix: cacheName
  });

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // https://developers.google.com/web/tools/workbox/guides/precache-files/
  workbox.precaching.precacheAndRoute(cachedFiles);

  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /(\.html|\/)$/,
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case "document":
        return caches.match(offlineFallback);
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
}
