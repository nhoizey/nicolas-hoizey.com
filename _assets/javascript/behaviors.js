/*****************************************************************
 * Statistics
 * ****************************************************************/

(function(win, doc) {
  doc.body.setAttribute("data-viewportwidth", win.viewport_width);
  doc.body.setAttribute("data-screendensity", win.screen_density);
  doc.body.setAttribute("data-rootfontsize", win.root_font_size);
})(window, document);

/*****************************************************************
 * UX
 * ****************************************************************/

// Add anchor links to titles in the article
(function(w) {
  var i,
    list = w.document.querySelectorAll(
      "article.main h2[id], article.main h3[id], article.main h4[id], article.main h5[id], article.main h6[id]"
    ),
    nb = list.length;

  for (i = 0; i < nb; ++i) {
    list[i].innerHTML +=
      '&nbsp;<a class="deeplink" href="#' +
      list[i].id +
      '"><svg><use xlink:href="#symbol-link" /></svg></a>';
  }
})(this);

// Lazyload Webmentions avatars
window.addEventListener("load", () => {
  [].forEach.call(document.querySelectorAll("img[data-src]"), function(img) {
    img.setAttribute("srcset", img.getAttribute("data-srcset"));
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = function() {
      img.removeAttribute("data-srcset");
      img.removeAttribute("data-src");
    };
  });
});

/*****************************************************************
 * PWA
 * ****************************************************************/

// Install Service Worker
if ("serviceWorker" in navigator) {
  // https://slides.com/webmax/serviceworker-thebest/#/23
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" });
  });
}

/*****************************************************************
 * Deal with offline/online events
 * ****************************************************************/

// https://mxb.at/blog/youre-offline/
// https://www.youtube.com/watch?v=7fnpsF9tMXc

let isOffline = false;
window.addEventListener("load", checkConnectivity);

// when the page has finished loading,
// listen for future changes in connection
function checkConnectivity() {
  updateConnectivityStatus();
  window.addEventListener("online", updateConnectivityStatus);
  window.addEventListener("offline", updateConnectivityStatus);
}

// check if we're online, set a class on <body> if offline
function updateConnectivityStatus() {
  let offlineNotificationToShow = false;
  let offlineNotificationIcon = "";
  let offlineNotificationType = "";
  let offlineNotificationMessage = "";
  let offlineNotificationElement = window.document.getElementById(
    "offline-notification"
  );

  if (typeof navigator.onLine !== "undefined") {
    if (!navigator.onLine) {
      // add 'offline' class to the body, for any CSS adjustment
      document.body.classList.add("offline");

      offlineNotificationToShow = true;
      offlineNotificationIcon = "offline";
      if ("serviceWorker" in navigator) {
        // If the browser supports Service Workers and the Cache API,
        // getting offline should be less stressful. Use a "warning"
        // message instead of an "error and provide a link to content
        // available in cache.
        offlineNotificationType = "warning";
        offlineNotificationMessage =
          'Désolé, <strong>vous ne semblez plus être connecté</strong>. Vous pouvez continuer à lire cette page, ou <a href="/offline.html">voir ce qui est dans votre cache</a>.';
      } else {
        offlineNotificationType = "error";
        offlineNotificationMessage =
          "Désolé, <strong>vous ne semblez plus être connecté</strong>. Vous pouvez continuer à lire cette page en attendant le retour de la connexion.";
      }
    } else {
      // remove 'offline' class from the body
      document.body.classList.remove("offline");

      offlineNotificationIcon = "online";
      if (offlineNotificationElement) {
        offlineNotificationToShow = true;
        offlineNotificationType = "success";
        offlineNotificationMessage =
          "<strong>Vous être de nouveau connecté</strong> ! Vous pouvez reprendre une navigation normale sur le site.";
      }
    }

    if (
      offlineNotificationToShow &&
      !window.document.getElementById("offline-notification-static")
    ) {
      // https://stackoverflow.com/a/25214113/717195
      let newOfflineNotificationElement = document.createRange()
        .createContextualFragment(`<div class="wrap" id="offline-notification">
        <div class="alert alert-${offlineNotificationType}">
          <p class="alert__icon"><svg class="icon"><use xlink:href="#symbol-${offlineNotificationIcon}" /></svg></p>
          <p class="alert__message">${offlineNotificationMessage}</p>
        </div>
      </div>`);

      if (offlineNotificationElement) {
        offlineNotificationElement.parentNode.replaceChild(
          offlineNotificationElement,
          newOfflineNotificationElement
        );
      } else {
        let mainElement = document.querySelector("main");
        mainElement.parentNode.insertBefore(
          newOfflineNotificationElement,
          mainElement
        );
      }
    }
  }
}

/*****************************************************************
 * Search
 * ****************************************************************/

// Utility function to get the search query from the URL query string
// https://stackoverflow.com/a/901144/717195
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var algoliaLinked = false;
var algoliaLoaded = false;
var algoliaClient;
var algoliaIndex;

function onAlgoliaAvailable(callback) {
  if (typeof algoliasearch === "function") {
    algoliaLoaded = true;
    algoliaClient = algoliasearch(algoliaApplicationId, algoliaApiKey);
    algoliaIndex = algoliaClient.initIndex(algoliaIndexName);
    callback();
  } else {
    if (!algoliaLinked) {
      var algoliaScript = window.document.createElement("script");
      algoliaScript.setAttribute(
        "src",
        "/assets/javascript/vendors/algoliasearchLite-3.32.0.min.js"
      );
      window.document
        .getElementsByTagName("head")[0]
        .appendChild(algoliaScript);
      algoliaLinked = true;
    }
    setTimeout(function() {
      onAlgoliaAvailable(callback);
    }, 50);
  }
}

var $intro = window.document.getElementById("intro");
var $input = window.document.getElementById("search_input");
var $results = window.document.getElementById("search_results");
var $currentUrl = window.location.toString();
var $currentContent = window.document.querySelector("main");
var $searchContent = window.document.querySelector(".search");
var searchSettings = {
  hitsPerPage: 50,
  facets: "*",
  attributesToHighlight: "title,tags",
  attributesToSnippet: "content:20"
};

// A search query may come from the URL query string
var queryString = getParameterByName("q");
if (queryString.length > 0) {
  $input.value = queryString;
  onAlgoliaAvailable(function() {
    algoliaIndex.search(queryString, searchSettings, searchCallback);
  });
}

// A search query may come from the user typing in the search field
$input.addEventListener("keyup", function() {
  if ($input.value.length > 0) {
    history.pushState(null, null, "/search.html?q=" + $input.value);
    if ($intro) $intro.style.display = "none";
    $currentContent.style.display = "none";
    $searchContent.style.display = "block";
    onAlgoliaAvailable(function() {
      algoliaIndex.search($input.value, searchSettings, searchCallback);
    });
  } else {
    history.pushState(null, null, $currentUrl);
    if ($intro) $intro.style.display = "block";
    $currentContent.style.display = "block";
    $searchContent.style.display = "none";
    $results.innerHTML = "";
  }
});

// Search callback function that shows the results
function searchCallback(err, content) {
  if (content.query !== $input.value) {
    // If we receive a result for an old query, abort
    return;
  }

  $results.innerHTML = "";

  if (err) {
    console.error(err);
    return;
  }

  var resultsNumber = content.hits.length;

  if (resultsNumber === 0) {
    $results.innerHTML = "<p>No result, please change your search.</p>";
    return;
  }

  var result, results, hit, hit_title, hit_excerpt, hit_date, hit_tags;

  results =
    `<h1>${resultsNumber} ` +
    (resultsNumber > 1 ? "contents contain" : "content contains") +
    ` <em>${$input.value}</em></h1><div class="list"><ul class="list__items">`;

  for (var i = 0; i < resultsNumber; i++) {
    hit = content.hits[i];
    result = "";

    hit_date = "";
    if (hit.date) {
      js_hit_date = new Date(hit.date * 1000);
      date_options = { year: "numeric", month: "long", day: "numeric" };

      if (hit.lang === "en") {
        hit_date = js_hit_date.toLocaleDateString("en-US", date_options);
      } else {
        hit_date = js_hit_date.toLocaleDateString("fr-FR", date_options);
      }
    }

    hit_title = hit._highlightResult.title.value;
    hit_excerpt = hit._highlightResult.html
      ? hit._highlightResult.html.value
      : hit._snippetResult.content
      ? hit._snippetResult.content.value
      : hit.excerpt_html;

    hit_tags = "";
    if (hit._highlightResult.tags) {
      // Build the tags list
      hit_tags = "";
      hit_tags_number = hit._highlightResult.tags.length;
      for (var j = 0; j < hit_tags_number; j++) {
        hit_tags = hit_tags + ", " + hit._highlightResult.tags[j].value;
      }
      hit_tags = hit_tags.replace(/^, /, "");
    }

    result = `<li class="card list__item"><h2 class="card__title"><a href="${
      hit.url
    }">${hit_title}</a></h2><p class="card__excerpt">${hit_excerpt}</p>`;
    if (hit_date || hit_tags) {
      result += '<footer><ul class="card__meta">';
      if (hit_date) {
        result += `<li class="date card__meta__item card__date"><svg class="icon"><use xlink:href="#symbol-date" /></svg> ${hit_date}</li>`;
      }
      if (hit_tags) {
        result += `<li class="tags card__meta__item card__tags"><svg class="icon"><use xlink:href="#symbol-tags" /></svg> ${hit_tags}</li>`;
      }
      result += "</ul></footer>";
    }
    result += "</li>";

    results += result;
  }

  $results.innerHTML =
    results +
    '<p id="powered-by-algolia"><a href="/2015/06/la-recherche-dans-du-statique-facile-avec-algolia.html">Powered by <svg><use xlink:href="#symbol-algolia" /></svg></a></p>';
}
