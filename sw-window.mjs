import { Workbox } from "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-window.prod.mjs";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.addEventListener("activated", event => {
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (!event.isUpdate) {
      console.log("Service worker activated for the first time!");

      // If your service worker is configured to precache assets, those
      // assets should all be available now.
    }
  });

  wb.addEventListener("waiting", event => {
    console.log(
      `A new service worker has installed, but it can't activate` +
        `until all tabs running the current version have fully unloaded.`
    );
  });

  wb.addEventListener("message", event => {
    console.log("--- message ---");
    console.dir(event.data);
    if (event.data.type === "CACHE_UPDATE") {
      const { cacheName, updatedURL } = event.data.payload;
      console.log(
        `A newer version of ${updatedURL} is available in ${cacheName}!`
      );
    }
  });

  // Register the service worker after event listeners have been added.
  wb.register();
}
