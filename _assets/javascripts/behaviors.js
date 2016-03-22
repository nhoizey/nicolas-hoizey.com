/* Load fonts */
(function(w){
  if(w.document.documentElement.className.indexOf("fonts-loaded" ) > -1) {
    return;
  }
  var observer = new w.FontFaceObserver("PT Serif", { weight: 400 });
  observer.check(null, 5000).then(function() {
    w.document.documentElement.className += " fonts-loaded";
    w.loadCSS(moreFontsUrl);

    // https://github.com/filamentgroup/font-loading/blob/master/data-uris.html
    // var supportsWoff2 = (function( win ){
    //   if( !( "FontFace" in win ) ) {
    //     return false;
    //   }
    //   var f = new win.FontFace( "t", 'url( "data:application/font-woff2;charset=utf-8," ) format( "woff2" )', {} );
    //   f.load().catch(function() {});
    //   return f.status == 'loading';
    // })( window );
    // // load font (woff)
    // var ua = navigator.userAgent,
    //   fontFileUrl = "assets/fonts/morefonts-woff.css";
    // if( supportsWoff2 ) {
    //   fontFileUrl = "assets/fonts/morefonts-woff2.css";
    // // sometimes you have to do the bad thing.  ¯\_(ツ)_/¯
    // //  ttf if non-chrome android webkit browser
    // } else if( ua.indexOf( "Android" ) > -1 && ua.indexOf( "like Gecko" ) > -1 && ua.indexOf( "Chrome" ) === -1 ){
    //   fontFileUrl = "assets/fonts/morefonts-ttf.css";
    // }
    // loadCSS(fontFileUrl);
  });
}(this));

/* Add anchor links to titles in the article */
(function(w){
  var i,
      list = w.document.querySelectorAll("article.main h2, article.main h3, article.main h4, article.main h5, article.main h6"),
      nb = list.length;

  for (i = 0; i < nb; ++i) {
    if (undefined !== list[i].id) {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + list[i].id + '"><svg class="icon"><use xlink:href="#symbol-link" /></svg>︎</a>';
    } else {
      list[i].innerHTML += '&nbsp;<a class="deeplink" href="#' + i + '"><svg class="icon"><use xlink:href="#symbol-link" /></svg></a>';
    }
  }
}(this));
