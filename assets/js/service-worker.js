import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setDefaultHandler } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import {
  offlineFallback,
  pageCache,
  staticResourceCache,
  imageCache,
} from 'workbox-recipes';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Never cache ranged requests (videos)
registerRoute(({ request }) => request.headers.has('range'), new NetworkOnly());

pageCache({
  networkTimoutSeconds: 2,
  warmCache: ['/', '/about/', '/about/the-website.html'],
});
staticResourceCache();
imageCache();

offlineFallback({
  pageFallback: '/offline/fallback.html',
  imageFallback: '/offline/fallback.svg',
});

// default strategy
setDefaultHandler(
  new StaleWhileRevalidate({
    cacheName: 'default',
    plugins: [new BroadcastUpdatePlugin()],
  })
);
