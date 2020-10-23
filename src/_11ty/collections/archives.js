// https://github.com/11ty/eleventy/issues/316#issuecomment-441053919
// https://github.com/11ty/eleventy/issues/502#issuecomment-498234424

const moment = require('moment');
const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  archives: (collection) => {
    return getFilteredCollection(collection, 'archives');
  },
};
