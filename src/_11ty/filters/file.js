const path = require('path');

module.exports = {
  dirname: (filePath) => {
    return typeof filePath === 'string' ? path.dirname(filePath) : '';
  },
};
