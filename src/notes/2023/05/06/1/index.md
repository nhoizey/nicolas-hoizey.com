---
date: 2023-05-06 19:40:55 +02:00
tags: [Service Worker, Workbox]
---

Is it ok to use Workbox's [`injectManifest`](https://developer.chrome.com/docs/workbox/precaching-with-workbox/#precaching-with-injectmanifest) with the recent [recipes](https://developer.chrome.com/docs/workbox/modules/workbox-recipes/) `warmCache` option?

I tried this without success in [the Service Worker in Pack11ty](https://github.com/nhoizey/pack11ty/blob/da1228de52e5658dc9aacb3967f86b62cc984b13/assets/js/service-worker.js#L20-L22):

```javascript
staticResourceCache({
  warmCache: self.__WB_MANIFEST,
});
```

Other caches are warmed up, not this one.
