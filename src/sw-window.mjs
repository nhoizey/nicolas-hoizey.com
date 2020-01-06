import { Workbox } from "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-window.prod.mjs";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.addEventListener("activated", event => {
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (!event.isUpdate) {
      console.info("Service worker activated for the first time!");

      // If your service worker is configured to precache assets, those
      // assets should all be available now.
    } else {
      console.info("New Service Worker activated");
    }
  });

  wb.addEventListener("waiting", event => {
    console.info(
      `A new service worker has installed, but it can't activate` +
      `until all tabs running the current version have fully unloaded.`
    );
  });

  wb.addEventListener("message", event => {
    if (event.data.type === "CACHE_UPDATED") {
      const { cacheName, updatedURL } = event.data.payload;
      console.info(
        `A newer version of ${updatedURL} is available in ${cacheName}!`
      );
      // if (updatedURL === window.location.href) {
      //   Toast({
      //     type: "info",
      //     icon: "info",
      //     text:
      //       "A new version of this page is available, please reload if you want to see it.",
      //     duration: 3000
      //   }).showToast();
      // }
    }
  });

  // Register the service worker after event listeners have been added.
  wb.register();
}
