// Because Nunjucks's include doesn't like CSS with "{#"

const fs = require('fs');

let memoizedIncludes = {};

module.exports = {
  include_raw: (file) => {
    if (file in memoizedIncludes) {
      return memoizedIncludes[file];
    } else {
      let content = fs.readFileSync(file);
      memoizedIncludes[file] = content;
      return content;
    }
  },
};
