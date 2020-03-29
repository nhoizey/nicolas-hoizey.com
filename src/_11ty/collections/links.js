module.exports = {
  links: (collection) => {
    return collection.getFilteredByGlob('src/links/**/*.md').sort((a, b) => {
      return b.date - a.date;
    });
  },
};
