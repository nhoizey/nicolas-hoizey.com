const twitter = require('twitter-text');

module.exports = {
  layout: "note",
  permalink: "/notes/{{ page.date | notePermalinkDate }}-{{ page.fileSlug }}/",
  eleventyComputed: {
    tags: data => {
      if (data.content === undefined) {
        return data.tags || [];
      }

      let twitterHashtags = twitter.extractHashtags(twitter.htmlEscape(data.content));
      return twitterHashtags || data.tags || [];
    }
  }
};
