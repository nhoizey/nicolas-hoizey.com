const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  archives: (collection) => {
    return getFilteredCollection(collection, 'archives');
  },
};
