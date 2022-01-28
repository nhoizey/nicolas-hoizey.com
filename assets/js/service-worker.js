import { precacheAndRoute } from 'workbox-precaching';
import {
  offlineFallback,
  pageCache,
  staticResourceCache,
  imageCache,
} from 'workbox-recipes';

precacheAndRoute(self.__WB_MANIFEST);

pageCache({
  networkTimoutSeconds: 2,
  warmCache: ['/', '/about/', '/about/the-website.html', '/offline/'],
});
staticResourceCache();
imageCache();

offlineFallback({
  pageFallback: '/offline/fallback.html',
  imageFallback: '/offline/fallback.svg',
});
