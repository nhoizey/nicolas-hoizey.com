const yearsWithContent = require('../../_utils/content-by-date')
  .yearsWithContent;

let collections = {
  yearsWithArticles: (collection) => {
    return yearsWithContent(
      collection.getFilteredByGlob('src/articles/**/*.md')
    );
  },
  yearsWithLinks: (collection) => {
    return yearsWithContent(collection.getFilteredByGlob('src/links/**/*.md'));
  },
  yearsWithNotes: (collection) => {
    return yearsWithContent(collection.getFilteredByGlob('src/notes/**/*.md'));
  },
};

// collections for yearly archives
const contentsByYear = require('../../_utils/content-by-date').contentByYear;
['articles', 'links', 'notes'].forEach((collectionName) => {
  collections[`${collectionName}ByYear`] = (collection) => {
    return contentsByYear(
      collection.getFilteredByGlob(`src/${collectionName}/**/*.md`)
    );
  };
});

// collections for monthly archives
const contentsByMonth = require('../../_utils/content-by-date').contentByMonth;
['articles', 'links', 'notes'].forEach((collectionName) => {
  collections[`${collectionName}ByMonth`] = (collection) => {
    return contentsByMonth(
      collection.getFilteredByGlob(`src/${collectionName}/**/*.md`)
    );
  };
});

module.exports = collections;
