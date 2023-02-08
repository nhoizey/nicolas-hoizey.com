const memoize = require('fast-memoize');

const { readFromCache } = require('../../_utils/cache');
const rootUrl = require('../../../package.json').homepage;

const WEBMENTION_CACHE = '_cache/webmentions.json';
const WEBMENTION_BLOCKLIST = '../webmention-blocklist.json';

const getWebmentions = memoize(() => {
  const cached = readFromCache(WEBMENTION_CACHE);
  const webmentionBlocklist = require(WEBMENTION_BLOCKLIST);
  return cached.webmentions.filter(
    (mention) => !webmentionBlocklist.includes(`${mention['wm-id']}`)
  );
});

function isSelf(entry) {
  return (
    entry.url.match(/^https:\/\/twitter.com\/nice_links\//) ||
    (entry['wm-property'] === 'repost-of' &&
      (entry.url.match(/^https:\/\/twitter.com\/nhoizey\//) ||
        entry.author.url === 'https://mamot.fr/@nhoizey'))
  );
}

const getUrlsHistory = memoize((url) => {
  url = encodeURI(url);
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

  // const changedUrls = {
  //   '/articles/2023/01/07/let-s-posse-to-mastodon-with-a-feed-and-a-github-action/':
  //     '/articles/2023/01/07/let-s-posse-to-mastodon-with-a-json-feed-and-a-github-action/',
  // };
  if (
    url.match(
      /^\/articles\/2023\/01\/07\/let-s-posse-to-mastodon-with-a-feed-and-a-github-action\/$/
    )
  ) {
    urlsList.push(
      `${rootUrl}/articles/2023/01/07/let-s-posse-to-mastodon-with-a-json-feed-and-a-github-action/`,
      `${httpRootUrl}/articles/2023/01/07/let-s-posse-to-mastodon-with-a-json-feed-and-a-github-action/`
    );
  }

  return urlsList;
});

module.exports = {
  getLatestWebmentions: () => getWebmentions().slice(-250),
  getWebmentionsForUrl: memoize((url) => {
    // TODO: for each URL, we loop through all webmentions, should be optimized
    if (url === undefined) {
      console.log('No URL for webmention matching');
      return [];
    }
    if (url === false) {
      // TODO: useful? Should happen only for drafts in production mode
      return [];
    }
    let urlsList = getUrlsHistory(url);
    return getWebmentions()
      .filter((entry) => {
        return urlsList.includes(entry['wm-target']);
      })
      .filter((entry) => !isSelf(entry));
  }),
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter((entry) => entry['wm-property'] === mentionType);
  },
};
