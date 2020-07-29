/*
 * Algolia's autocomplete using instantsearch
 * Based on
 * https://github.com/creasoft-dev/fundamenty/blob/master/src/scripts/algolia.js
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
const contentTypeEmojis = {
  article: '📄',
  link: '🔗',
  note: '💬',
  talk: '👨‍🏫',
  tag: '🏷',
};

  {
    source: newHitsSource(index, { hitsPerPage: 10 }),
    displayKey: 'title',
    templates: {
      suggestion: function (suggestion) {
        return `${
          contentTypeEmojis.hasOwnProperty(suggestion.type)
            ? contentTypeEmojis[suggestion.type] + ' '
            : ''
        }<a href="${suggestion.url}">${
          suggestion._highlightResult.title.value
        }</a> ${
          suggestion._highlightResult.tags !== undefined
            ? ' (' +
              suggestion._highlightResult.tags
                .map((tag) => tag.value)
                .join(', ') +
              ')'
            : ''
        }`;
      },
    },
  },
]).on('autocomplete:selected', function (event, suggestion, dataset) {
  console.log(suggestion, dataset);
  // alert('dataset: ' + dataset + ':  ' + suggestion, null, 2);
  window.location.replace(suggestion.url);
});
