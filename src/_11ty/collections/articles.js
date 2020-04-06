const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  articles: (collection) => {
    return getFilteredCollection(collection, 'articles');
  },
  promoted: (collection) => {
    // promoted articles, but not the latest article at all
    let fullCollection = collection
      .getFilteredByGlob('src/articles/**/*.md')
      .sort((a, b) => {
        return b.date - a.date;
      })
      .slice(1)
      .filter((article) => article.data.promoted);

    return fullCollection;
  },
};
