let filteredCollectionsMemoization = {};
const getFilteredCollection = (collection, type) => {
  if (type in filteredCollectionsMemoization) {
    return filteredCollectionsMemoization[type];
  } else {
    const pattern = type === 'archives' ? '{articles,links,notes}' : type;
    let filteredCollection = collection
      .getFilteredByGlob(`src/${pattern}/**/*.md`)
      .sort((a, b) => b.date - a.date);
    filteredCollectionsMemoization[type] = filteredCollection;

    return filteredCollection;
  }
};

module.exports = getFilteredCollection;
