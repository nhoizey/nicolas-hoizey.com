import Toast from "./toast.js";

/*****************************************************************
 * Statistics
 * ****************************************************************/

(function (window) {
  let bodyElement = window.document.querySelector('body');
  bodyElement.setAttribute("data-viewportwidth", window.viewport_width);
  bodyElement.setAttribute("data-screendensity", window.screen_density);
  bodyElement.setAttribute("data-rootfontsize", window.root_font_size);
})(window);

/*****************************************************************
 * Lazyload some images
 * ****************************************************************/

// https://www.zachleat.com/web/facepile/
if (!("connection" in navigator) || navigator.connection.saveData !== true) {
  // Load avatars only if not in save data mode
  if (
    typeof IntersectionObserver !== "undefined" &&
    "forEach" in NodeList.prototype
  ) {
    var observer = new IntersectionObserver(changes => {
      changes.forEach(change => {
        if (change.isIntersecting) {
          if (change.target.getAttribute("data-srcset")) {
            change.target.setAttribute(
              "srcset",
              change.target.getAttribute("data-srcset")
            );
          }
          change.target.setAttribute(
            "src",
            change.target.getAttribute("data-src")
          );
          observer.unobserve(change.target);
        }
      });
    });
    document.querySelectorAll("img[data-src]").forEach(img => {
      observer.observe(img);
    });
  } else {
    // No IntersectionObserver support => no lazyloading
    document.querySelectorAll("img[data-src]").forEach(img => {
      if (img.getAttribute("data-srcset")) {
        img.setAttribute("srcset", img.getAttribute("data-srcset"));
      }
      img.setAttribute("src", img.getAttribute("data-src"));
    });
  }
}

/*****************************************************************
 * Autoplay Giphy videos when possible
 * ****************************************************************/

let gifs = document.querySelectorAll(".giphy video");
let gifsNumber = gifs.length;

if (gifsNumber > 0) {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
  var prefersReducedMotionNoPreference = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  );
  function handleReducedMotionChanged() {
    for (i = 0; i < gifsNumber; ++i) {
      if (prefersReducedMotionNoPreference.matches) {
        gifs[i].play();
      } else {
        gifs[i].pause();
      }
    }
  }
  handleReducedMotionChanged(); // trigger this once on load to set up the initial value
  prefersReducedMotion.addListener(handleReducedMotionChanged); // Note: https://webkit.org/b/168491
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
  var notificationIcon = "";
  var notificationType = "";
  var notificationText = "";

  if (typeof navigator.onLine !== "undefined") {
    if (!navigator.onLine) {
      document
        .querySelector("#search input")
        .setAttribute("disabled", "disabled");

      notificationToShow = true;
      notificationIcon = "offline";
      if ("serviceWorker" in navigator) {
        // If the browser supports Service Workers and the Cache API,
        // getting offline should be less stressful. Use a "warning"
        // message instead of an "error and provide a link to content
        // available in cache.

        // TODO: check if SW active and some content in cache
        notificationType = "warning";
        notificationText =
          'It looks like <strong>the connection is lost</strong>. Continue reading this page, or look at <a href="/offline.html">other contents you can read while offline</a>.';
      } else {
        notificationType = "error";
        notificationText =
          "It looks like <strong>the connection is lost</strong>. Continue reading this page, until the connection is back.";
      }
      isOffline = true;
    } else {
      document.querySelector("#search input").removeAttribute("disabled");

      if (isOffline) {
        isOffline = false;
        notificationIcon = "online";
        notificationToShow = true;
        notificationType = "success";
        notificationText =
          "<strong>You are back online!</strong> You can resume your navigation on the website.";
      }
    }

    if (notificationToShow) {
      Toast({
        text: notificationText,
        type: notificationType,
        icon: notificationIcon,
        duration: 5000
      }).showToast();
    }
  }
}

// listen for future changes in connection
function checkConnectivity() {
  window.addEventListener("online", updateConnectivityStatus);
  window.addEventListener("offline", updateConnectivityStatus);
  updateConnectivityStatus();
}

// when the page has finished loading,
window.addEventListener("load", checkConnectivity);

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
var algoliaClient;
var algoliaIndex;

function onAlgoliaAvailable(callback) {
  if (typeof algoliasearch === "function") {
    algoliaClient = algoliasearch(algoliaApplicationId, algoliaApiKey);
    algoliaIndex = algoliaClient.initIndex(algoliaIndexName);
    callback();
  } else {
    if (!algoliaLinked) {
      var algoliaScript = window.document.createElement("script");
      algoliaScript.setAttribute(
        "src",
        "/assets/javascript/vendors/algoliasearchLite-3.35.1.min.js"
      );
      window.document
        .getElementsByTagName("head")[0]
        .appendChild(algoliaScript);
      algoliaLinked = true;
    }
    setTimeout(function () {
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
  onAlgoliaAvailable(function () {
    algoliaIndex.search(queryString, searchSettings, searchCallback);
  });
}

// A search query may come from the user typing in the search field
$input.addEventListener("keyup", function () {
  if ($input.value.length > 0) {
    history.pushState(null, null, "/search/?q=" + $input.value);
    if ($intro) $intro.style.display = "none";
    $currentContent.style.display = "none";
    $searchContent.style.display = "block";
    onAlgoliaAvailable(function () {
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

  var results =
    `<h1>${resultsNumber} ` +
    (resultsNumber > 1 ? "contents contain" : "content contains") +
    ` <em>${$input.value}</em></h1><ul class="list">`;

  for (var i = 0; i < resultsNumber; i++) {
    var hit = content.hits[i];
    var result = "";

    var hit_date = "";
    if (hit.date) {
      var js_hit_date = new Date(hit.date * 1000);
      var date_options = { year: "numeric", month: "long", day: "numeric" };
      hit_date = js_hit_date.toLocaleDateString("en-US", date_options);
    }

    var hit_title = hit._highlightResult.title.value;
    var hit_excerpt = hit._highlightResult.html
      ? hit._highlightResult.html.value
      : hit._snippetResult.content
        ? hit._snippetResult.content.value
        : hit.excerpt_html;

    var hit_tags = "";
    if (hit._highlightResult.tags) {
      // Build the tags list
      hit_tags = "";
      var hit_tags_number = hit._highlightResult.tags.length;
      for (var j = 0; j < hit_tags_number; j++) {
        hit_tags = hit_tags + ", " + hit._highlightResult.tags[j].value;
      }
      hit_tags = hit_tags.replace(/^, /, "");
    }

    result = `<li class="list__item"><div class="card"><p class="card__title"><a href="${hit.url}">${hit_title}</a></p><p class="card__excerpt">${hit_excerpt}</p>`;
    if (hit_date || hit_tags) {
      result += '<footer><ul class="meta">';
      if (hit_date) {
        result += `<li class="date meta__item card__date"><svg class="icon"><use xlink:href="#symbol-date" /></svg> ${hit_date}</li>`;
      }
      if (hit_tags) {
        result += `<li class="tags meta__item card__tags"><svg class="icon"><use xlink:href="#symbol-tags" /></svg> ${hit_tags}</li>`;
      }
      result += "</ul></footer>";
    }
    result += "</div></li>";

    results += result;
  }

  $results.innerHTML =
    results +
    '</ul><p id="powered-by-algolia"><a href="/2015/06/la-recherche-dans-du-statique-facile-avec-algolia.html">Powered by Algolia</a></p>';
}
