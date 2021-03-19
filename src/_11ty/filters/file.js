const path = require('path');

module.exports = {
  dirname: (filePath) => {
    return typeof filePath === 'string' ? path.dirname(filePath) : '';
  },
  newUrlToOld: (url) => {
    return url.replace(
      /^\/articles(\/[0-9]{4}\/[0-9]{2})\/[0-9]{2}\/(.*)\/$/,
      '$1/$2'
    );
  },
};
