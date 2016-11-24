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
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + list[i].id + '"><svg class="icon" width=".7em" height=".7em"><use xlink:href="#symbol-link" /></svg></a>';
    } else {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + i + '"><svg class="icon" width=".7em" height=".7em"><use xlink:href="#symbol-link" /></svg></a>';
    }
  }
}(this));

/* Install Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
