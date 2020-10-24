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
  initialUiState: {
    nho: window.instantsearchInitialUiState || {},
  },
  searchFunction(helper) {
    if (window.instantsearchInitialUiState) {
      window.instantsearchInitialUiState = false;
    }
    const page = helper.getPage(); // Retrieve the current page
    // console.dir(helper);
    helper
      .setPage(page) // we re-apply the previous page
      .search();
  },
});

const typesPanel = panel({
  templates: {
    header: 'Types',
  },
  hidden: ({ results }) => results.getFacetValues('type').length === 0,
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
  languagesPanel({
    container: '#langs-list',
    attribute: 'lang',
    sortBy: ['name:asc'],
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
        return (
          `<article class="card ${hit.type} h-entry" lang="${hit.lang}">
            <div class="with-sidebar">
              <div class="only-for-sidebar">` +
          (hit.illustration ? hit.illustration : '') +
          '<div class="card__main not-sidebar">' +
          (hit.surtitle
            ? `<p class="card__surtitle">${hit.surtitle}</p>`
            : '') +
          (hit.title
            ? `<p class="card__title"><a href="${
                hit.url
              }">${instantsearch.highlight({
                attribute: 'title',
                hit,
              })}</a></p>`
            : '') +
          `${
            hit._snippetResult.content.matchLevel !== 'none'
              ? '<div class="card__text p-summary">' +
                hit._snippetResult.content.value +
                '</div>'
              : '<div class="card__text p-summary">' + hit.excerpt + '</div>'
          }` +
          '</div></div></div>' +
          (hit.meta_html
            ? `
${hit.meta_html}`
            : '') +
          '</article>'
        );
      },
    },
  }),
  configure({
    hitsPerPage: 10,
  }),
]);

search.start();

document
  .querySelectorAll(
    '.navigation a[href="/articles/"], .navigation a[href="/links/"], .navigation a[href="/notes/"]'
  )
  .forEach((navigationItem) => {
    // console.dir(navigationItem);
    navigationItem.addEventListener('click', (event) => {
      event.preventDefault();
      const typePlural = event.originalTarget.pathname.split('/')[1];
      const typeSingular = typePlural.slice(0, -1);
      console.log(typeSingular);
      search.setUiState({
        refinementList: {
          type: [typeSingular],
        },
        page: 1,
      });
      // TODO: change active navigation item
    });
  });
