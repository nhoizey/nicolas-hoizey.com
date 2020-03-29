module.exports = {
  articles: (collection) => {
    return collection.getFilteredByGlob('src/articles/**/*.md').sort((a, b) => {
      return b.date - a.date;
    });
  },
  promoted: (collection) => {
    // promoted articles, but not the latest article at all
    return collection
      .getFilteredByGlob('src/articles/**/*.md')
      .sort((a, b) => {
        return b.date - a.date;
      })
      .slice(1)
      .filter((article) => article.data.promoted);
  },
};
