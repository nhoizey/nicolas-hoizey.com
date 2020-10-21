import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';
import {
  clearRefinements,
  configure,
  infiniteHits,
  refinementList,
  searchBox,
  sortBy,
} from 'instantsearch.js/es/widgets';

const search = instantsearch({
  indexName: process.env.ALGOLIA_INDEX_NAME,
  searchClient: algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_READ_ONLY_API_KEY
  ),
  routing: true,
});

search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: 'Search for content',
    showSubmit: false,
  }),
  clearRefinements({
    container: '#clear-refinements',
  }),
  refinementList({
    container: '#types-list',
    attribute: 'type',
  }),
  refinementList({
    container: '#tags-list',
    attribute: 'tags',
    sortBy: ['name:asc'],
  }),
  infiniteHits({
    container: '#hits',
    templates: {
      item(hit) {
        // console.dir(hit);
        return `
          <div class="card ${hit.type}">
            <p class="card__title">
              <a href="${hit.url}">${instantsearch.highlight({
          attribute: 'title',
          hit,
        })}</a>
            </p>
            ${
              hit._snippetResult.content.matchLevel !== 'none'
                ? '<p>' + hit._snippetResult.content.value + '</p>'
                : ''
            }
          </div>`;
      },
    },
  }),
  sortBy({
    container: '#sortby',
    items: [
      { label: 'Relevance', value: 'instant_search' },
      { label: 'Freshness', value: 'date' },
    ],
  }),
  configure({
    hitsPerPage: 10,
  }),
]);

search.start();
