// https://github.com/11ty/eleventy/issues/316#issuecomment-441053919
// https://github.com/11ty/eleventy/issues/502#issuecomment-498234424

const moment = require('moment');
const getFilteredCollection = require('../../_utils/filter-collection');

function makeDateFormatter(datePattern) {
  return function (date) {
    return moment(date).format(datePattern);
  };
}

function generateItemsDateSet(items, dateFormatter) {
  const formattedDates = items.map((item) => {
    return dateFormatter(item.data.page.date);
  });
  return [...new Set(formattedDates)];
}

function getItemsByDate(items, date, dateFormatter) {
  return items.filter((item) => {
    return dateFormatter(item.data.page.date) === date;
  });
}

const contentByDateString = (items, dateFormatter) => {
  return generateItemsDateSet(items, dateFormatter).reduce(function (
    collected,
    formattedDate
  ) {
    return Object.assign({}, collected, {
      // lowercase to match month directory page.url
      [formattedDate.toLowerCase()]: getItemsByDate(
        items,
        formattedDate,
        dateFormatter
      ),
    });
  },
  {});
};

const yearsWithContent = (collection) => {
  return generateItemsDateSet(collection, makeDateFormatter('YYYY'));
};

const monthsWithContent = (collection) => {
  return generateItemsDateSet(collection, makeDateFormatter('YYYY/MM'));
};

const contentsByMonth = (collection) => {
  return contentByDateString(collection, makeDateFormatter('YYYY/MM'));
};

const contentsByYear = (collection) => {
  return contentByDateString(collection, makeDateFormatter('YYYY'));
};

let collections = {
  yearsWithArticles: (collection) => {
    return yearsWithContent(getFilteredCollection(collection, 'articles'));
  },
  monthsWithArticles: (collection) => {
    return monthsWithContent(getFilteredCollection(collection, 'articles'));
  },
  yearsWithLinks: (collection) => {
    return yearsWithContent(getFilteredCollection(collection, 'links'));
  },
  monthsWithLinks: (collection) => {
    return monthsWithContent(getFilteredCollection(collection, 'links'));
  },
  yearsWithNotes: (collection) => {
    return yearsWithContent(getFilteredCollection(collection, 'notes'));
  },
  monthsWithNotes: (collection) => {
    return monthsWithContent(getFilteredCollection(collection, 'notes'));
  },
  yearsWithBillets: (collection) => {
    return yearsWithContent(getFilteredCollection(collection, 'billets'));
  },
  monthsWithBillets: (collection) => {
    return monthsWithContent(getFilteredCollection(collection, 'billets'));
  },
  yearsWithTalks: (collection) => {
    return yearsWithContent(getFilteredCollection(collection, 'talks'));
  },
  monthsWithTalks: (collection) => {
    return monthsWithContent(getFilteredCollection(collection, 'talks'));
  },
  yearsWithArchives: (collection) => {
    return yearsWithContent(getFilteredCollection(collection, 'archives'));
  },
  monthsWithArchives: (collection) => {
    return monthsWithContent(getFilteredCollection(collection, 'archives'));
  },
};

['articles', 'links', 'notes', 'talks', 'billets', 'archives'].forEach(
  (collectionName) => {
    // collections for yearly archives
    collections[`${collectionName}ByYear`] = (collection) => {
      return contentsByYear(getFilteredCollection(collection, collectionName));
    };
    // collections for monthly archives
    collections[`${collectionName}ByMonth`] = (collection) => {
      return contentsByMonth(getFilteredCollection(collection, collectionName));
    };
  }
);

module.exports = collections;
