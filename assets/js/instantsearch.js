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

const typesPanel = panel({
  templates: {
    header: 'Types',
  },
})(refinementList);

const languagesPanel = panel({
  templates: {
    header: 'Languages',
  },
  hidden: ({ results }) => results.getFacetValues('lang').length === 0,
})(refinementList);

const tagsPanel = panel({
  templates: {
    header: 'Tags',
  },
  hidden: ({ results }) => results.getFacetValues('tags').length === 0,
})(refinementList);

const datesPanel = panel({
  templates: {
    header: 'Dates',
  },
  hidden: ({ results }) => {
    // console.dir(results.getFacetValues('date.lvl0'));
    return results.getFacetValues('date.lvl0').data === null;
  },
})(hierarchicalMenu);

search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: 'Search for content…',
    autofocus: true,
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
  languagesPanel({
    container: '#langs-list',
    attribute: 'lang',
    sortBy: ['name:asc'],
  }),
  typesPanel({
    container: '#types-list',
    attribute: 'type',
    sortBy: ['name:asc'],
  }),
  datesPanel({
    container: '#dates-menu',
    attributes: ['date.lvl0', 'date.lvl1', 'date.lvl2'],
    limit: 5,
    showMore: true,
    showMoreLimit: 1000,
    sortBy: ['name:desc'],
  }),
  tagsPanel({
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
                ? '<div class="card__text p-summary">' +
                  hit._snippetResult.content.value +
                  '</div>'
                : '<div class="card__text p-summary">' + hit.excerpt + '</div>'
            }
            ${
              hit.meta_html && hit.meta_html !== ''
                ? '<div class="card__meta">' + hit.meta_html + '</div>'
                : ''
            }
          </div>`;
      },
    },
  }),
  configure({
    hitsPerPage: 10,
  }),
]);

search.start();
