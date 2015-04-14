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
