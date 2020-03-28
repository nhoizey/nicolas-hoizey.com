const rootUrl = require('../../_data/site.js').url;

function isSelf(entry) {
  return (
    entry.url.match(/^https:\/\/twitter.com\/nice_links\//) ||
    (entry['wm-property'] === 'repost-of' &&
      (entry.url.match(/^https:\/\/twitter.com\/nhoizey\//) ||
        entry.url.match(/^https:\/\/mamot.fr\/@nhoizey\//)))
  );
}

function getUrlsHistory(url) {
  let urlsList = [`${rootUrl}${url}`];
  let httpRootUrl = rootUrl.replace(/^https:/, 'http:');
  if (
    (parts = url.match(
      /^\/articles\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)\/$/
    ))
  ) {
    // Current permalink: /articles/2018/06/15/users-do-change-font-size/
    // /articles/2018/06/users-do-change-font-size/
    urlsList.push(`${rootUrl}/articles/${parts[1]}/${parts[2]}/${parts[4]}/`);
    urlsList.push(
      `${httpRootUrl}/articles/${parts[1]}/${parts[2]}/${parts[4]}/`
    );
    // /2018/06/users-do-change-font-size/
    urlsList.push(`${rootUrl}/${parts[1]}/${parts[2]}/${parts[4]}/`);
    urlsList.push(`${httpRootUrl}/${parts[1]}/${parts[2]}/${parts[4]}/`);
    // /2018/06/users-do-change-font-size.html
    urlsList.push(`${rootUrl}/${parts[1]}/${parts[2]}/${parts[4]}.html`);
    urlsList.push(`${httpRootUrl}/${parts[1]}/${parts[2]}/${parts[4]}.html`);
  }
  if (
    (parts = url.match(/^\/links\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)\/$/))
  ) {
    // Current permalink: /links/2019/12/10/good-enough/
    // /links/2019/12/good-enough/
    urlsList.push(`${rootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}/`);
    urlsList.push(`${httpRootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}/`);
    // /links/2019/12/good-enough.html
    urlsList.push(`${rootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}.html`);
    urlsList.push(
      `${httpRootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}.html`
    );
  }
  return urlsList;
}

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    if (url === undefined) {
      console.log('No URL for webmention matching');
      return [];
    }
    let urlsList = getUrlsHistory(url);
    return webmentions
      .filter((entry) => {
        return urlsList.includes(entry['wm-target']);
      })
      .filter((entry) => !isSelf(entry));
  },
  getMyWebmentionsForUrl: (webmentions, url) => {
    if (url === undefined) {
      console.log('No URL for webmention matching');
      return [];
    }
    let urlsList = getUrlsHistory(url);
    return webmentions
      .filter((entry) => {
        return urlsList.includes(entry['wm-target']);
      })
      .filter((entry) => isSelf(entry));
  },
  getMyWebmentionsWithoutTarget: (webmentions) => {
    return webmentions.filter((entry) => {
      return entry['wm-target'] === undefined;
    });
  },
  isOwnWebmention: (webmention) => {
    const urls = [
      rootUrl,
      'https://twitter.com/nhoizey',
      'https://twitter.com/nice_links',
    ];
    const authorUrl = webmention.author ? webmention.author.url : false;
    // check if a given URL is part of this site.
    return authorUrl && urls.includes(authorUrl);
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter((entry) => entry['wm-property'] === mentionType);
  },
};
