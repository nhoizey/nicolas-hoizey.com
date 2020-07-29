// Based on
// https://github.com/creasoft-dev/fundamenty/blob/master/src/scripts/algolia.js

/*
 * Algolia's autocomplete using instantsearch
 */

const searchClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_READ_ONLY_API_KEY
);
var index = searchClient.initIndex(process.env.ALGOLIA_INDEX_NAME);

// Adapter for the new version 4 of algoliasearch js library
function newHitsSource(index, params) {
  return function doSearch(query, cb) {
    index
      .search(query, params)
      .then(function (res) {
        cb(res.hits, res);
      })
      .catch(function (err) {
        console.error(err);
        cb([]);
      });
  };
}

autocomplete('#search_input', { hint: false }, [
  {
    source: newHitsSource(index, { hitsPerPage: 5 }),
    displayKey: 'content',
    templates: {
      suggestion: function (suggestion) {
        return (
          suggestion._highlightResult.title.value +
          ' (' +
          suggestion._highlightResult.tags.value +
          ')'
        );
      },
    },
  },
]).on('autocomplete:selected', function (event, suggestion, dataset) {
  console.log(suggestion, dataset);
  // alert('dataset: ' + dataset + ':  ' + suggestion, null, 2);
  window.location.replace(suggestion.url);
});
