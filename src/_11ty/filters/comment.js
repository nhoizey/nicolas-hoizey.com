const { readFromCache } = require('../../_utils/cache');

const COMMENTS_CACHE = 'src/comments/comments.json';
let comments = false;

module.exports = {
  getCommentsForUrl: (url) => {
    if (url === undefined) {
      console.log('No URL for comments matching');
      return [];
    }
    if (url === false) {
      // TODO: useful? Should happen only for drafts in production mode
      return [];
    }
    let contentPath = url.replace(/^\/(.*)\/$/, '$1');
    if (comments === false) {
      comments = readFromCache(COMMENTS_CACHE);
      // TODO: sort comments by date?
    }

    return comments[contentPath] || [];
  },
};
