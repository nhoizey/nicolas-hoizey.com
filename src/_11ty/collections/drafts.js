const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  drafts: (collection) => {
    return getFilteredCollection(collection, 'drafts');
  },
};
