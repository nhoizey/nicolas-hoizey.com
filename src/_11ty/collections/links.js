const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  links: (collection) => {
    return getFilteredCollection(collection, 'links');
  },
};
