const memoize = require('fast-memoize');

const rootUrl = require('../../../package.json').homepage;

const getOldUrls = memoize((url) => {
  url = encodeURI(url);
  let urlsList = [];

  // Articles
  if (
    (parts = url.match(
      /^\/articles\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)\/$/
    ))
  ) {
    // Current permalink: /articles/2018/06/15/users-do-change-font-size/
    // /articles/2018/06/users-do-change-font-size/
    urlsList.push(`${rootUrl}/articles/${parts[1]}/${parts[2]}/${parts[4]}/`);
    // /2018/06/users-do-change-font-size/
    urlsList.push(`${rootUrl}/${parts[1]}/${parts[2]}/${parts[4]}/`);
    // /2018/06/users-do-change-font-size.html
    urlsList.push(`${rootUrl}/${parts[1]}/${parts[2]}/${parts[4]}.html`);
  }

  // Links
  if (
    (parts = url.match(/^\/links\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)\/$/))
  ) {
    // Current permalink: /links/2019/12/10/good-enough/
    // /links/2019/12/good-enough/
    urlsList.push(`${rootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}/`);
    // /links/2019/12/good-enough.html
    urlsList.push(`${rootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}.html`);
  }

  // Tags
  if ((parts = url.match(/^\/tags\/([^\/]+)\/$/))) {
    // Current permalink: /tags/photo/
    // /tags/photo.html
    urlsList.push(`${rootUrl}/tags/${parts[1]}.html`);
  }
  return urlsList;
});

module.exports = {
  listUrlRewrites: (currentUrl) => {
    const oldUrls = getOldUrls(currentUrl);

    if (oldUrls.length === 0) {
      return '';
    }

    return oldUrls
      .map((oldUrl) => `"${oldUrl}": "${rootUrl}${currentUrl}"`)
      .join(', ');
  },
};
