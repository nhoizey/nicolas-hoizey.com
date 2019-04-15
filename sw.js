---
---
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

{% capture aboutPage %}{% include_relative about/index.md %}{% endcapture %}
{% capture aboutSitePage %}{% include_relative about/the-website.md %}{% endcapture %}
{% capture manifestFile %}{% include_relative manifest.webmanifest %}{% endcapture %}
{% capture offlineFile %}{% include_relative offline.html %}{% endcapture %}
{% capture offlineFallbackFile %}{% include_relative offline-fallback.html %}{% endcapture %}

const cacheName = "NHO";
const offlineFallback = "/offline-fallback.html";
const preCachedFiles = [
  '{% asset "non-critical-styles" @path %}',
  {
    url: "/about/",
    revision: "{{ aboutPage | md5 }}"
  },
  {
    url: "/about/the-website.html",
    revision: "{{ aboutSitePage | md5 }}"
  },
  {
    url: "/manifest.webmanifest",
    revision: "{{ manifestFile | md5 }}"
  },
  {
    url: "/offline.html",
    revision: "{{ offlineFile | md5 }}"
  },
  {
    url: offlineFallback,
    revision: "{{ offlineFallbackFile | md5 }}"
  }
];

if (workbox) {
  workbox.setConfig({
    debug: true
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
    ({ event }) => event.request.headers.has('range'),
    new workbox.strategies.NetworkOnly()
  );

  // Try to get fresh HTML from network, but don't wait for more than 3 seconds
  workbox.routing.registerRoute(
    /(\.html|\/)$/,
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: 'pages'
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

  workbox.googleAnalytics.initialize();

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  addEventListener("message", event => {
    console.log(`[SW] Receiving a message: ${event.data.type}`);
  });
}
