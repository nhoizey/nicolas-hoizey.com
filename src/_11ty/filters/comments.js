module.exports = {
  getCommentsForUrl: (comments, url) => {
    if (url === undefined) {
      console.log('No URL for comments matching');
      return [];
    }
    let contentPath = url.replace(/^\/(.*)\/$/, '$1');
    // TODO: sort comments by date?
    return comments[contentPath] || [];
  },
};
