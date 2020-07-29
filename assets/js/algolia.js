/*
 * Algolia's autocomplete using instantsearch
 * Based on
 * https://github.com/creasoft-dev/fundamenty/blob/master/src/scripts/algolia.js
 */

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
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

const contentTypeEmojis = {
  article: '📄',
  link: '🔗',
  note: '💬',
  talk: '👨‍🏫',
  tag: '🏷',
};

autocomplete('#search_input', { hint: false, autoselect: true }, [
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
      footer:
        '<div class="branding"><a href="/articles/2015/06/24/la-recherche-dans-du-statique-facile-avec-algolia/"><img src="/assets/search-by-algolia-light-background.svg" /></a></div>',
    },
  },
]).on('autocomplete:selected', function (event, suggestion, dataset) {
  window.location.assign(suggestion.url);
});
