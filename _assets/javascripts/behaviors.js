/*****************************************************************
 * Statistics
 * ****************************************************************/

;(function(win, doc) {
  doc.body.setAttribute('data-viewportwidth', win.viewport_width)
  doc.body.setAttribute('data-screendensity', win.screen_density)
})(window, document)

/*****************************************************************
 * UX
 * ****************************************************************/

// Add anchor links to titles in the article
;(function(w) {
  var i,
    list = w.document.querySelectorAll(
      'article.main h2, article.main h3, article.main h4, article.main h5, article.main h6',
    ),
    nb = list.length

  for (i = 0; i < nb; ++i) {
    if (undefined !== list[i].id) {
      list[i].innerHTML +=
        '&nbsp;<a class="deeplink" href="#' +
        list[i].id +
        '"><svg><use xlink:href="#symbol-link" /></svg></a>'
    } else {
      list[i].innerHTML +=
        '&nbsp;<a class="deeplink" href="#' +
        i +
        '"><svg><use xlink:href="#symbol-link" /></svg></a>'
    }
  }
})(this)

/*****************************************************************
 * PWA
 * ****************************************************************/

// Install Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

// Clean Service Worker cache
// https://adactio.com/journal/9888
window.addEventListener('load', function() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ command: 'trimCaches' })
  }
})

// Deal with offline/online events
// https://www.youtube.com/watch?v=7fnpsF9tMXc
window.addEventListener('offline', function(event) {
  document.body.classList.add('offline')
  // Array.from(document.querySelectorAll('a'))
  //   .forEach(link => {
  //     if (linkIsAvailableOffline(link)) {
  //       link.classList.add('cached');
  //     }
  //   });
})

window.addEventListener('online', function(event) {
  document.body.classList.remove('offline')
})

/*****************************************************************
 * Search
 * ****************************************************************/

// Utility function to get the search query from the URL query string
// http://stackoverflow.com/a/901144/717195
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

var algoliaLinked = false
var algoliaLoaded = false
var algoliaClient
var algoliaIndex

function onAlgoliaAvailable(callback) {
  if (typeof algoliasearch === 'function') {
    algoliaLoaded = true
    algoliaClient = algoliasearch(algoliaApplicationId, algoliaApiKey)
    algoliaIndex = algoliaClient.initIndex(algoliaIndexName)
    callback()
  } else {
    if (!algoliaLinked) {
      var algoliaScript = window.document.createElement('script')
      algoliaScript.setAttribute(
        'src',
        '/assets/javascript/vendors/algoliasearchLite-3.24.6.min.js',
      )
      window.document.getElementsByTagName('head')[0].appendChild(algoliaScript)
      algoliaLinked = true
    }
    setTimeout(function() {
      onAlgoliaAvailable(callback)
    }, 50)
  }
}

var $input = window.document.getElementById('search_input')
var $results = window.document.getElementById('search_results')
var $currentUrl = window.location.toString()
var $currentContent = window.document.querySelector('main')
var $searchContent = window.document.querySelector('.search')
var searchSettings = {
  hitsPerPage: 50,
  facets: '*',
  attributesToHighlight: 'title,tags',
  attributesToSnippet: 'content:20',
}

// A search query may come from the URL query string
var queryString = getParameterByName('q')
if (queryString.length > 0) {
  $input.value = queryString
  onAlgoliaAvailable(function() {
    algoliaIndex.search(queryString, searchSettings, searchCallback)
  })
}

// A search query may come from the user typing in the search field
$input.addEventListener('keyup', function() {
  if ($input.value.length > 0) {
    history.pushState(null, null, '/recherche.html?q=' + $input.value)
    $currentContent.style.display = 'none'
    $searchContent.style.display = 'block'
    onAlgoliaAvailable(function() {
      algoliaIndex.search($input.value, searchSettings, searchCallback)
    })
  } else {
    console.log($currentUrl)
    history.pushState(null, null, $currentUrl)
    $currentContent.style.display = 'block'
    $searchContent.style.display = 'none'
    $results.innerHTML = ''
  }
})

// Search callback function that shows the results
function searchCallback(err, content) {
  if (content.query !== $input.value) {
    // If we receive a result for an old query, abort
    return
  }

  var months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ]
  $results.innerHTML = ''

  if (err) {
    console.error(err)
    return
  }

  var resultsNumber = content.hits.length

  if (resultsNumber === 0) {
    $results.innerHTML =
      '<p>Aucun résultat, veuillez modifier votre recherche.</p>'
    return
  }

  $results.innerHTML =
    '<p class="nb">' +
    resultsNumber +
    ' résultat' +
    (resultsNumber > 1 ? 's' : '') +
    ' :'

  var hit, post, post_date, post_tags, post_tags_match
  for (var i = 0; i < resultsNumber; i++) {
    hit = content.hits[i]

    switch (hit.layout) {
      case 'post':
        // Build the date to show
        js_post_date = new Date(hit.date * 1000)
        post_date =
          js_post_date.getDate() +
          ' ' +
          months[js_post_date.getMonth()] +
          ' ' +
          js_post_date.getFullYear()

        // Build the tags list
        post_tags = ''
        post_tags_match = 'none'
        for (var j = 0; j < hit._highlightResult.tags.length; j++) {
          post_tags = post_tags + ', ' + hit._highlightResult.tags[j].value
          if (hit._highlightResult.tags[j].matchLevel !== 'none') {
            post_tags_match = hit._highlightResult.tags[j].matchLevel
          }
        }
        post_tags = post_tags.replace(/^, /, '')

        post =
          '<article class="post"><h2><a href="' +
          hit.url +
          '">' +
          hit._highlightResult.title.value +
          '</a></h2><header><ul><li class="date"><svg class="icon"><use xlink:href="#symbol-date" /></svg> ' +
          post_date +
          '</li><li class="tags"><svg class="icon"><use xlink:href="#symbol-tags" /></svg> ' +
          post_tags +
          '</li></ul></header>' +
          (hit.text.trim() ? '<p>… ' + hit.text + ' …</p>' : '') +
          '</article>'

        $results.innerHTML += post
        break
      case 'page':
        page =
          '<article class="post"><h2><a href="' +
          hit.url +
          '">' +
          hit._highlightResult.title.value +
          '</a></h2>' +
          (hit.text.trim() ? '<p>… ' + hit.text + ' …</p>' : '') +
          '</article>'

        $results.innerHTML += page
        break
      default:
        console.log(hit)
    }
  }
  $results.innerHTML +=
    '<p id="powered-by-algolia"><a href="/2015/06/la-recherche-dans-du-statique-facile-avec-algolia.html">Propulsé par l\'excellent <svg><use xlink:href="#symbol-algolia" /></svg></a></p>'
}
