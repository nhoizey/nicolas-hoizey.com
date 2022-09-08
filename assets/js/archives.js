// import algoliasearch from 'algoliasearch/lite';
import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser.js';
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
import { history } from 'instantsearch.js/es/lib/routers';

const titleize = (string) => {
  if (string === undefined) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// https://stackoverflow.com/a/46851765/717195
const unescapeHtml = (input) => {
  var el = document.createElement('div');
  return input.replace(/\&#?[0-9a-z]+;/gi, function (enc) {
    el.innerHTML = enc;
    return el.innerText;
  });
};

const activateNavItem = (type) => {
  document.querySelectorAll('.navigation li').forEach((li) => {
    const link = li.querySelectorAll(`a[href="/${type}/"]`);
    if (link.length === 1) {
      li.setAttribute('aria-current', 'page');
    } else {
      li.removeAttribute('aria-current');
    }
  });
};

// let firstLoad = true;

const search = instantsearch({
  indexName: process.env.ALGOLIA_INDEX_NAME,
  searchClient: algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_READ_ONLY_API_KEY
  ),
  // Prevent first search query
  // searchFunction: function (helper) {
  //   if (firstLoad === true) {
  //     firstLoad = false;
  //     return;
  //   }
  //   helper.search();
  // },
  routing: {
    router: history({
      windowTitle({ type, query }) {
        let typeSlug = 'archives';
        let title = '';
        if (query) {
          title += `Search for "${query}"`;
          if (type !== undefined && type.length === 1) {
            typeSlug = type[0];
            title += ` in ${type[0]}`;
          } else {
            title += ' in archives';
          }
        } else {
          if (type !== undefined && type.length === 1) {
            typeSlug = type[0];
            title += titleize(type[0]);
          } else {
            title += 'Archives';
          }
        }
        window.document.querySelector('h1').innerText = title;
        title += ' - Nicolas Hoizey';

        activateNavItem(typeSlug);

        return title;
      },
      createURL({ qsModule, routeState, location }) {
        const queryParameters = {};

        let urlPath = 'archives';
        if (routeState.type !== undefined) {
          switch (routeState.type.length) {
            case 0:
              break;
            case 1:
              urlPath = routeState.type[0];
              break;
            default:
              queryParameters.type = routeState.type;
          }
        }
        if (routeState.date !== undefined) {
          urlPath += `/${routeState.date.replace('-', '/')}`;
        }
        if (routeState.query) {
          queryParameters.query = encodeURIComponent(routeState.query);
        }
        if (routeState.page && routeState.page !== 1) {
          queryParameters.page = routeState.page;
        }
        if (routeState.lang && routeState.lang.length > 0) {
          queryParameters.lang = routeState.lang;
        }
        if (routeState.tags && routeState.tags.length > 0) {
          queryParameters.tags = routeState.tags;
        }

        const queryString = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: 'repeat',
        });

        return `/${urlPath}/${queryString}`;
      },

      parseURL({ qsModule, location }) {
        const urlParts = {};

        // Parse location path
        const matches = location.pathname.match(
          /\/([a-z]+)\/(?:([0-9]{4})\/)?(?:([0-9]{2})\/)?$/
        );
        if (matches[1] !== undefined && matches[1] !== 'archives') {
          urlParts.type = [matches[1]];
        }
        if (matches[2] !== undefined) {
          urlParts.date = matches[2];
        }
        if (matches[3] !== undefined) {
          urlParts.date += '-' + matches[3];
        }

        // Parse query string
        const queryParts = qsModule.parse(location.search.slice(1));
        if (queryParts.query !== undefined && queryParts.query !== '') {
          urlParts.query = decodeURIComponent(queryParts.query);
        }
        if (queryParts.page !== undefined && queryParts.page !== 1) {
          urlParts.page = queryParts.page;
        }
        ['type', 'lang', 'tags'].forEach((refinement) => {
          if (
            typeof queryParts[refinement] === 'string' &&
            queryParts[refinement] !== ''
          ) {
            urlParts[refinement] = [queryParts[refinement]];
          }
          if (
            Array.isArray(queryParts[refinement]) &&
            queryParts[refinement].length > 0
          ) {
            urlParts[refinement] = queryParts[refinement];
          }
        });
        return urlParts;
      },
    }),
    stateMapping: {
      routeToState(routeState) {
        const state = { nho: {} };
        if (routeState.query !== undefined && routeState.query !== '') {
          state.nho.query = routeState.query;
        }
        if (routeState.page !== undefined && routeState.page !== 1) {
          state.nho.page = routeState.page;
        }
        ['type', 'lang', 'tags'].forEach((refinement) => {
          if (
            routeState[refinement] !== undefined &&
            routeState[refinement].length > 0
          ) {
            if (state.nho.refinementList === undefined) {
              state.nho.refinementList = {};
            }
            state.nho.refinementList[refinement] = routeState[refinement];
          }
        });
        if (routeState.date !== undefined && routeState.date.length > 0) {
          state.nho.hierarchicalMenu = {
            'date.lvl0': routeState.date.split('-'),
          };
        }
        return state;
      },
      stateToRoute(uiState) {
        const route = {};
        if (uiState['nho'].query !== undefined && uiState['nho'].query !== '') {
          route.query = uiState['nho'].query;
        }
        if (uiState['nho'].page !== undefined && uiState['nho'].page !== 1) {
          route.page = uiState['nho'].page;
        }
        if (uiState['nho'].refinementList !== undefined) {
          ['type', 'lang', 'tags'].forEach((refinement) => {
            if (
              uiState.nho.refinementList[refinement] !== undefined &&
              uiState.nho.refinementList[refinement].length !== 0
            ) {
              route[refinement] = uiState.nho.refinementList[refinement];
            }
          });
        }
        if (
          uiState.nho.hierarchicalMenu !== undefined &&
          uiState.nho.hierarchicalMenu['date.lvl0'] !== undefined &&
          uiState.nho.hierarchicalMenu['date.lvl0'].length !== 0
        ) {
          route.date = uiState.nho.hierarchicalMenu['date.lvl0'].join('-');
        }
        return route;
      },
    },
  },
});

const typesPanel = panel({
  templates: {
    header: 'Types',
  },
  hidden: ({ results }) => results.getFacetValues('type').length === 0,
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
    return results.getFacetValues('date.lvl0').data === null;
  },
})(hierarchicalMenu);

const languagesPanel = panel({
  templates: {
    header: 'Languages',
  },
  hidden: ({ results }) => results.getFacetValues('lang').length === 0,
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
  tagsPanel({
    container: '#tags-list',
    attribute: 'tags',
    sortBy: ['count:desc', 'name:asc'],
    operator: 'and',
    showMore: true,
    showMoreLimit: 1000,
    searchable: true,
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
  }),
  infiniteHits({
    container: '#hits',
    escapeHTML: false,
    showPrevious: true,
    templates: {
      item(hit) {
        return (
          `<article class="card ${hit.type} h-entry" lang="${hit.lang}">` +
          (hit.illustration || '') +
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
          (hit.meta_html
            ? `
${hit.meta_html}`
            : '') +
          `${
            hit._snippetResult.content.matchLevel !== 'none'
              ? '<p class="card__body p-summary">' +
                hit._snippetResult.content.value +
                '</p>'
              : '<p class="card__body p-summary">' + hit.excerpt + '</p>'
          }` +
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
