/* Load fonts */
(function(w){
  if(w.document.documentElement.className.indexOf("fonts-loaded" ) > -1) {
    return;
  }
  var observer = new w.FontFaceObserver("Source Sans Pro", { weight: 300 });
  observer.check(null, 5000).then(function() {
    w.document.documentElement.className += " fonts-loaded";
    w.loadCSS(moreFontsUrl);
  });
}(this));

/* Add anchor links to titles in the article */
(function(w){
  var i,
      list = w.document.querySelectorAll("article.main h2, article.main h3, article.main h4, article.main h5, article.main h6"),
      nb = list.length;

  for (i = 0; i < nb; ++i) {
    if (undefined !== list[i].id) {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + list[i].id + '">⚓︎</a>';
    } else {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + i + '">⚓︎</a>';
    }
  }
}(this));
