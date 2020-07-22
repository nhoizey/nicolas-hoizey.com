const path = require('path');

module.exports = {
  dirname: (filePath) => {
    return path.dirname(filePath);
  },
  newUrlToOld: (url) => {
    return url.replace(
      /^\/articles(\/[0-9]{4}\/[0-9]{2})\/[0-9]{2}\/(.*)\/$/,
      '$1/$2'
    );
  },
};
