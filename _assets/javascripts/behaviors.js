---
---

/* ****************************************************************
 * Statistics
 * ****************************************************************/

 ;(function(win, doc) {

  doc.body.setAttribute('data-viewportwidth', win.viewport_width);
  doc.body.setAttribute('data-screendensity', win.screen_density);

})( window, document );

/* ****************************************************************
 * UX
 * ****************************************************************/

// Add anchor links to titles in the article
(function(w){
  var i,
      list = w.document.querySelectorAll("article.main h2, article.main h3, article.main h4, article.main h5, article.main h6"),
      nb = list.length;

  for (i = 0; i < nb; ++i) {
    if (undefined !== list[i].id) {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + list[i].id + '"><svg><use xlink:href="#symbol-link" /></svg>&nbsp;<span>lien&nbsp;direct</span></a>';
    } else {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + i + '"><svg><use xlink:href="#symbol-link" /></svg>&nbsp;<span>lien&nbsp;direct</span></a>';
    }
  }
}(this));

/* ****************************************************************
 * PWA
 * ****************************************************************/

// Install Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Clean Service Worker cache
// https://adactio.com/journal/9888
window.addEventListener('load', function() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({'command': 'trimCaches'});
  }
});

// Deal with offline/online events
// https://www.youtube.com/watch?v=7fnpsF9tMXc
window.addEventListener('offline', function (event) {
  document.body.classList.add('offline');
  // Array.from(document.querySelectorAll('a'))
  //   .forEach(link => {
  //     if (linkIsAvailableOffline(link)) {
  //       link.classList.add('cached');
  //     }
  //   });
});

window.addEventListener('online', function (event) {
  document.body.classList.remove('offline');
});
