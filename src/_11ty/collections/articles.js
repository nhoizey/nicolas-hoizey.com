const getFilteredCollection = require('../../_utils/filter-collection');

const latestNb = 3;
const promotedNb = 3;

module.exports = {
  articles: (collection) => {
    return getFilteredCollection(collection, 'articles');
  },
  latestArticles: (collection) => {
    // latest articles
    return getFilteredCollection(collection, 'articles').slice(0, latestNb);
  },
  promotedArticles: (collection) => {
    // promoted articles within not the latest ones
    return getFilteredCollection(collection, 'articles')
      .slice(latestNb)
      .filter((article) => article.data.promoted)
      .slice(0, promotedNb);
  },
};
