const memoize = require('fast-memoize');

const { readFromCache } = require('../../_utils/cache');

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

    return getWebmentions()
      .filter((entry) => !isSelf(entry))
      .filter((entry) => {
        return new URL(entry['wm-target']).pathname === url;
      });
  }),
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter((entry) => entry['wm-property'] === mentionType);
  },
};
