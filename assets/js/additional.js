import Toast from './toast.js';

const saveData = 'connection' in navigator && navigator.connection.saveData;
const observable =
  typeof IntersectionObserver !== 'undefined' &&
  'forEach' in NodeList.prototype;

/*****************************************************************
 * Statistics
 * ****************************************************************/

(function (window) {
  let bodyElement = window.document.querySelector('body');
  bodyElement.setAttribute('data-viewportwidth', window.viewport_width);
  bodyElement.setAttribute('data-screendensity', window.screen_density);
  bodyElement.setAttribute('data-rootfontsize', window.root_font_size);
})(window);

/*****************************************************************
 * Install Service Worker
 * ****************************************************************/

if (process.env.NODE_ENV === 'production') {
  // Install Service Worker only on production
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });

    // navigator.serviceWorker.addEventListener('message', async (event) => {
    //   // Optional: ensure the message came from workbox-broadcast-update
    //   if (event.data.meta === 'workbox-broadcast-update') {
    //     const { cacheName, updatedURL } = event.data.payload;
    //     console.groupCollapsed(
    //       `[Page] Updated content in "${cacheName}": ${updatedURL}`
    //     );
    //     const cache = await caches.open(cacheName);
    //     const updatedResponse = await cache.match(updatedURL);
    //     if (updatedResponse) {
    //       const updatedText = await updatedResponse.text();
    //       console.log(updatedText);
    //     }
    //     console.groupEnd();
    //   }
    // });
  }
}

/*****************************************************************
 * Add image background to the footer
 * ****************************************************************/

const loadFooter = () => {
  let backgroundImageWidth = Math.ceil(window.viewport_width / 20) * 20;
  let limbes = `url('https://res.cloudinary.com/nho/image/fetch/c_limit,f_auto,q_auto,w_${backgroundImageWidth}/https://nicolas-hoizey.com/assets/limbes.jpg')`;
  let footer = window.document.querySelector('#footer');
  footer.style.setProperty('--limbes', limbes);
  footer.style.color = '#fff';
  let imageRatio = Math.round((670 / 1534) * 100);
  footer.style.padding = `${imageRatio}vw 0 1em 0`;
};

/*****************************************************************
 * Load lazy loaded images
 * ****************************************************************/

const loadImage = (img) => {
  if (img.getAttribute('data-srcset')) {
    img.setAttribute('srcset', img.getAttribute('data-srcset'));
  }
  img.setAttribute('src', img.getAttribute('data-src'));
};

/*****************************************************************
 * Lazyload some images, the footer background, and some HTML
 * ****************************************************************/

// Inspired by https://www.zachleat.com/web/facepile/

if (!saveData) {
  // Lazyload additional content only if not in save data mode

  if (observable) {
    // Lazyload images
    // ************************************************************/
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImagesCallback = (changes) => {
      changes.forEach((change) => {
        if (change.isIntersecting) {
          lazyImagesObserver.unobserve(change.target);
          loadImage(change.target);
        }
      });
    };
    const lazyImagesOptions = {
      // If the image gets within 300px in the Y axis, start the download.
      rootMargin: '300px 0px 300px 0px',
      threshold: 0.01,
    };
    let lazyImagesObserver = new IntersectionObserver(
      lazyImagesCallback,
      lazyImagesOptions
    );
    lazyImages.forEach((img) => {
      lazyImagesObserver.observe(img);
    });

    // Lazyload footer background
    // ************************************************************/
    if (window.viewport_width > 0) {
      const lazyFooter = document.querySelector('#footer');
      const lazyFooterCallback = (changes) => {
        changes.forEach((change) => {
          if (change.isIntersecting) {
            lazyFooterObserver.unobserve(change.target);
            loadFooter();
          }
        });
      };
      const lazyFooterOptions = {
        // If the image gets within 500px in the Y axis, start the download.
        rootMargin: '500px 0px 0px 0px',
        threshold: 0.01,
      };
      let lazyFooterObserver = new IntersectionObserver(
        lazyFooterCallback,
        lazyFooterOptions
      );
      lazyFooterObserver.observe(lazyFooter);
    }
  } else {
    // No IntersectionObserver support => no lazyloading

    // Load images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      loadImage(img);
    });

    // Load additional HTML content
    if (lazyHtmlElement) {
      lazyHtml();
    }

    // Load footer background
    if (window.viewport_width > 0) {
      loadFooter();
    }
  }
}

/*****************************************************************
 * Autoplay Giphy videos when possible
 * ****************************************************************/

// TODO: use IntersectionObserver to play the video only when visible in the viewport?
let gifs = document.querySelectorAll('.giphy video');
let gifsNumber = gifs.length;

if (gifsNumber > 0) {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)');
  var prefersReducedMotionNoPreference = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  );
  function handleReducedMotionChanged() {
    for (let i = 0; i < gifsNumber; ++i) {
      if (prefersReducedMotionNoPreference.matches) {
        gifs[i].play();
      } else {
        gifs[i].pause();
      }
    }
  }

  // trigger this once on load to set up the initial value
  handleReducedMotionChanged();

  // Note: https://webkit.org/b/168491
  prefersReducedMotion.addListener(handleReducedMotionChanged);
}

/*****************************************************************
 * Deal with offline/online events
 * ****************************************************************/

// https://mxb.at/blog/youre-offline/
// https://www.youtube.com/watch?v=7fnpsF9tMXc

var isOffline = false;

// check if we're online, set a class on <body> if offline
function updateConnectivityStatus() {
  var notificationToShow = false;
  var notificationIcon = '';
  var notificationType = '';
  var notificationText = '';

  if (typeof navigator.onLine !== 'undefined') {
    if (!navigator.onLine) {
      notificationToShow = true;
      notificationIcon = 'offline';
      if ('serviceWorker' in navigator) {
        // If the browser supports Service Workers and the Cache API,
        // getting offline should be less stressful. Use a "warning"
        // message instead of an "error and provide a link to content
        // available in cache.

        // TODO: check if SW active and some content in cache
        notificationType = 'warning';
        notificationText =
          'It looks like <strong>the connection is lost</strong>. Continue reading this page, or look at <a href="/offline.html">other contents you can read while offline</a>.';
      } else {
        notificationType = 'error';
        notificationText =
          'It looks like <strong>the connection is lost</strong>. Continue reading this page, until the connection is back.';
      }
      isOffline = true;
    } else {
      if (isOffline) {
        isOffline = false;
        notificationIcon = 'online';
        notificationToShow = true;
        notificationType = 'success';
        notificationText =
          '<strong>You are back online!</strong> You can resume your navigation on the website.';
      }
    }

    if (notificationToShow) {
      Toast({
        text: notificationText,
        type: notificationType,
        icon: notificationIcon,
        duration: 5000,
      }).showToast();
    }
  }
}

// listen for future changes in connection
function checkConnectivity() {
  window.addEventListener('online', updateConnectivityStatus);
  window.addEventListener('offline', updateConnectivityStatus);
  updateConnectivityStatus();
}

// when the page has finished loading,
window.addEventListener('load', checkConnectivity);

/*****************************************************************
 * Open details tag on hash/anchor
 * ****************************************************************/

// https://gist.github.com/davidbgk/259daf79d0b833a83dd1ba988f6a42aa
// https://gist.github.com/rik/3b005371537223a28e24349fc1e92489

function openDetailsIfTargetInside() {
  const hash = document.location.hash ? document.location.hash.slice(1) : '';
  if (hash) {
    let target = document.getElementById(hash);
    target?.closest('details')?.setAttribute('open', '');
  }
}
openDetailsIfTargetInside();
window.addEventListener('hashchange', openDetailsIfTargetInside);
