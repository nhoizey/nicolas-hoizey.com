// Load fonts
;(function(doc) {
  // IE9+
  if(!('geolocation' in navigator)) {
    return;
  }

  var docEl = doc.documentElement;

  if (sessionStorage.firstStageFontsLoaded && sessionStorage.secondStageFontsLoaded) {
    docEl.className += ' firstStageFonts-loaded secondStageFonts-loaded';
    return;
  }

  var firstStageCounter = 0;
  var firstStageSuccess = function() {
    firstStageCounter++;
    if(firstStageCounter === 2) {
      docEl.className += ' firstStageFonts-loaded';
      sessionStorage.firstStageFontsLoaded = true;
      secondStage();
    }
  };
  var secondStageCounter = 0;
  var secondStageSuccess = function() {
    secondStageCounter++;
    if( secondStageCounter === 6 ) {
      docEl.className += ' secondStageFonts-loaded';
      sessionStorage.secondStageFontsLoaded = true;
    }
  };

  // Load first stage fonts
  FontFaceOnload('PTSans', {
    style: 'normal',
    weight: 400,
    success: firstStageSuccess
  });
  FontFaceOnload('PTSerif', {
    style: 'normal',
    weight: 400,
    success: firstStageSuccess
  });

  // Load second stage fonts
  function secondStage() {
    FontFaceOnload('PTSerifBold', {
      style: 'normal',
      weight: 700,
      success: secondStageSuccess
    });
    FontFaceOnload('PTSerifItalic', {
      style: 'italic',
      weight: 400,
      success: secondStageSuccess
    });
    FontFaceOnload('PTSerifBoldItalic', {
      style: 'italic',
      weight: 700,
      success: secondStageSuccess
    });
    FontFaceOnload('PTSansBold', {
      style: 'normal',
      weight: 700,
      success: secondStageSuccess
    });
    FontFaceOnload('PTSansItalic', {
      style: 'italic',
      weight: 400,
      success: secondStageSuccess
    });
    FontFaceOnload('PTSansBoldItalic', {
      style: 'italic',
      weight: 700,
      success: secondStageSuccess
    });
  }
})( document );

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

/* Service Worker */
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js', {
//     scope: '/'
//   });
// }
