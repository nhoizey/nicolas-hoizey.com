const twitter = require('twitter-text');

module.exports = {
  layout: 'note',
  lang: 'en',
  permalink: '/notes/{{ page.date | permalinkDate }}/{{ page.fileSlug }}/',
  eleventyComputed: {
    tags: (data) => {
      if (data.content === undefined) {
        return data.tags || [];
      }

      let tags = twitter.extractHashtags(twitter.htmlEscape(data.content));
      if (data.tags !== undefined) {
        // merge and deduplicate
        tags = [...new Set([].concat(...tags, ...data.tags))];
      }
      return tags;
    },
  },
};
