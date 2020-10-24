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

const titleize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1) + 's';

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
  // searchFunction(helper) {
  // if (window.instantsearchInitialUiState) {
  //   window.instantsearchInitialUiState = false;
  // }
  // if (helper.state.query) {
  //   helper.search();
  // }
  // const page = helper.getPage(); // Retrieve the current page
  // console.dir(helper);
  // helper
  // .setPage(page) // we re-apply the previous page
  // .search();
  // },
  onStateChange({ uiState, setUiState }) {
    let contentType = 'archive';
    let typeTitle = 'Archives';
    if (
      uiState.nho.refinementList.type &&
      uiState.nho.refinementList.type.length === 1
    ) {
      contentType = uiState.nho.refinementList.type[0];
      typeTitle = titleize(contentType);
    }
    document.querySelector('h1').innerText = typeTitle;
    document.title = `${typeTitle} - Nicolas Hoizey`;
    document.querySelectorAll('.navigation li').forEach((li) => {
      const link = li.querySelectorAll(`a[href="/${contentType}s/"]`);
      if (link.length === 1) {
        li.classList.add('current');
      } else {
        li.classList.remove('current');
      }
    });
    setUiState(uiState);
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

// document
//   .querySelectorAll(
//     '.navigation a[href="/articles/"], .navigation a[href="/links/"], .navigation a[href="/notes/"]'
//   )
//   .forEach((navigationItem) => {
//     navigationItem.addEventListener('click', (event) => {
//       event.preventDefault();
//       const typePlural = event.originalTarget.pathname.split('/')[1];
//       const typeSingular = typePlural.slice(0, -1);
//       const refinementItem = document.querySelector(
//         `#types-list .ais-RefinementList-checkbox[value="${typeSingular}"]`
//       );
//       const clickEvent = new Event('click');
//       refinementItem.dispatchEvent(clickEvent);
//       // search.setUiState({
//       //   refinementList: {
//       //     type: [typeSingular],
//       //   },
//       //   page: 1,
//       // });
//       // TODO: change active navigation item
//     });
//   });
