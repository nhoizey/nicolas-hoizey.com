import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';
import {
  clearRefinements,
  configure,
  hierarchicalMenu,
  infiniteHits,
  panel,
  poweredBy,
  refinementList,
  searchBox,
  stats,
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
    templates: {
      resetLabel: 'Clear filters',
    },
  }),
  stats({
    container: '#stats',
  }),
  poweredBy({
    container: '#powered-by',
  }),
  refinementList({
    container: '#langs-list',
    attribute: 'lang',
    sortBy: ['name:asc'],
  }),
  refinementList({
    container: '#types-list',
    attribute: 'type',
    sortBy: ['name:asc'],
  }),
  hierarchicalMenu({
    container: '#dates-menu',
    attributes: ['date.lvl0', 'date.lvl1', 'date.lvl2'],
    limit: 5,
    showMore: true,
    showMoreLimit: 1000,
    sortBy: ['name:desc'],
  }),
  refinementList({
    container: '#tags-list',
    attribute: 'tags',
    sortBy: ['count:desc', 'name:asc'],
    operator: 'and',
    showMore: true,
    showMoreLimit: 1000,
    searchable: true,
  }),
  infiniteHits({
    container: '#hits',
    templates: {
      item(hit) {
        // console.dir(hit);
        return `
          <div class="card ${hit.type}">
            <div class="card__content">
              <p class="card__title">
                <a href="${hit.url}">${instantsearch.highlight({
          attribute: 'title',
          hit,
        })}</a>
              </p>
            </div>
            ${
              hit._snippetResult.content.matchLevel !== 'none'
                ? '<p>' + hit._snippetResult.content.value + '</p>'
                : hit.excerpt
            }
            <div class="card__meta">${hit.meta_html}</div>
          </div>`;
      },
    },
  }),
  configure({
    hitsPerPage: 10,
  }),
]);

search.start();
