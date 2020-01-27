// https://github.com/11ty/eleventy/issues/316#issuecomment-441053919
// https://github.com/11ty/eleventy/issues/502#issuecomment-498234424

const moment = require("moment");

function sortByDate(a, b) {
  return b.date - a.date;
}

function makeDateFormatter(datePattern) {
  return function (date) {
    return moment(date).format(datePattern);
  }
}

function generateItemsDateSet(items, dateFormatter) {
  const formattedDates = items.map(item => {
    return dateFormatter(item.data.page.date);
  });
  return [...new Set(formattedDates)];
}

function getItemsByDate(items, date, dateFormatter) {
  return items.filter(item => {
    return dateFormatter(item.data.page.date) === date;
  }).sort(sortByDate);
}

const contentByDateString = (items, dateFormatter) => {
  return generateItemsDateSet(items, dateFormatter)
    .reduce(function (collected, formattedDate) {
      return Object.assign({}, collected, {
        // lowercase to match month directory page.url
        [formattedDate.toLowerCase()]: getItemsByDate(items, formattedDate, dateFormatter)
      })
    }, {});
}

exports.yearsWithContent = collection => {
  return generateItemsDateSet(collection, makeDateFormatter("YYYY"));
}

exports.contentByMonth = collection => {
  return contentByDateString(
    collection,
    makeDateFormatter("YYYY/MM")
  );
}

exports.contentByYear = collection => {
  return contentByDateString(
    collection,
    makeDateFormatter("YYYY")
  );
}
