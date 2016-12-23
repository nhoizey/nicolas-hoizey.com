;(function(win, doc) {

  doc.body.setAttribute('data-viewportwidth', win.viewport_width);
  doc.body.setAttribute('data-screendensity', win.screen_density);

})( window, document );

/* Add anchor links to titles in the article */
(function(w){
  var i,
      list = w.document.querySelectorAll("article.main h2, article.main h3, article.main h4, article.main h5, article.main h6"),
      nb = list.length;

  for (i = 0; i < nb; ++i) {
    if (undefined !== list[i].id) {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + list[i].id + '">#<span>lien&nbsp;direct</span></a>';
    } else {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + i + '">#<span>lien&nbsp;direct</span></a>';
    }
  }
}(this));

/* Install Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
    .then(function(reg) {
      console.info('Service Worker registration succeded with scope: ', reg.scope);
    }).catch(function(error) {
      console.error('Service Worker registration failed with ' + error);
    });
}
