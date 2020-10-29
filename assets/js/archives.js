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

const titleize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// https://stackoverflow.com/a/46851765/717195
const unescapeHtml = (input) => {
  var el = document.createElement('div');
  return input.replace(/\&#?[0-9a-z]+;/gi, function (enc) {
    el.innerHTML = enc;
    return el.innerText;
  });
};

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
    let contentType = 'archives';
    let typeTitle = 'Archives';
    if (
      uiState.nho.refinementList &&
      uiState.nho.refinementList.type &&
      uiState.nho.refinementList.type.length === 1
    ) {
      contentType = uiState.nho.refinementList.type[0];
      typeTitle = titleize(contentType);
    }
    document.querySelector('h1').innerText = typeTitle;
    document.title = `${typeTitle} - Nicolas Hoizey`;
    document.querySelectorAll('.navigation li').forEach((li) => {
      const link = li.querySelectorAll(`a[href="/${contentType}/"]`);
      // TODO: also update ARIA
      if (link.length === 1) {
        li.classList.add('current');
      } else {
        li.classList.remove('current');
      }
    });
    // TODO: update URL with https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/js/
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
    templates: {
      item: `
      <a class="{{cssClasses.link}}" href="{{url}}">{{label}}</a>
      <span class="{{cssClasses.count}}">{{count}}</span>
    `,
    },
  }),
  languagesPanel({
    container: '#langs-list',
    attribute: 'lang',
    sortBy: ['name:asc'],
    // templates: {
    //   item: `<label class="ais-RefinementList-label">
    //       <input type="checkbox" class="ais-RefinementList-checkbox" value="{{label}}" {{#isRefined}}checked{{/isRefined}}>
    //       <span class="ais-RefinementList-labelText">{{label}}</span>
    //       <span class="ais-RefinementList-count">{{count}}</span>
    //     </label>`,
    // },
  }),
  tagsPanel({
    container: '#tags-list',
    attribute: 'tags',
    sortBy: ['count:desc', 'name:asc'],
    operator: 'and',
    showMore: true,
    showMoreLimit: 1000,
    searchable: true,
    // templates: {
    //   item: `<label class="ais-RefinementList-label">
    //       <input type="checkbox" class="ais-RefinementList-checkbox" value="{{label}}" {{#isRefined}}checked{{/isRefined}}>
    //       <span class="ais-RefinementList-labelText">{{label}}</span>
    //       <span class="ais-RefinementList-count">{{count}}</span>
    //     </label>`,
    // },
  }),
  infiniteHits({
    container: '#hits',
    templates: {
      item(hit) {
        return (
          `<article class="card ${hit.type} h-entry" lang="${hit.lang}">` +
          (hit.illustration
            ? `<figure class="card__illustration">
                <img
                  alt="${hit.illustration.alt}"
                  width="${hit.illustration.width}"
                  height="${hit.illustration.height}"
                  src="https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_320,c_limit/${hit.illustration.src}"
                  class="vignette"
                  crossorigin="anonymous" />
              </figure>`
            : '') +
          (hit.surtitle
            ? '<p class="card__surtitle">' +
              unescapeHtml(
                instantsearch.highlight({
                  attribute: 'surtitle',
                  hit,
                })
              ) +
              '</p>'
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

// TODO: handle navigation as type selection and other facets reset
// document
//   .querySelectorAll(
//     '.navigation a[href="/articles/"], .navigation a[href="/links/"], .navigation a[href="/notes/"], .navigation a[href="/talks/"], .navigation a[href="/archives/"]'
//   )
//   .forEach((navigationItem) => {
//     navigationItem.addEventListener('click', (event) => {
//       event.preventDefault();
//       const type = event.originalTarget.pathname.split('/')[1];
//       const refinementItem = document.querySelector(
//         `#types-list .ais-RefinementList-checkbox[value="${type}"]`
//       );
//       const clickEvent = new Event('click');
//       refinementItem.dispatchEvent(clickEvent);
//       // search.setUiState({
//       //   refinementList: {
//       //     type: [type],
//       //   },
//       //   page: 1,
//       // });
//       // TODO: change active navigation item
//     });
//   });
