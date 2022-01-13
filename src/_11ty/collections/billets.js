const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  billets: (collection) => {
    return getFilteredCollection(collection, 'billets');
  },
};
