const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  drafts: (collection) => {
    return process.env.NODE_ENV === 'production'
      ? []
      : getFilteredCollection(collection, 'drafts');
  },
};
