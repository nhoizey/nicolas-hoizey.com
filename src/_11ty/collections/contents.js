const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  contents: (collection) => {
    return getFilteredCollection(collection, '{articles,links,notes}');
  },
};
