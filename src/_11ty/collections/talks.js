const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  talks: (collection) => {
    return getFilteredCollection(collection, 'talks');
  },
};
