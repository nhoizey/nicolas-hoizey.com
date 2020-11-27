const twitter = require('twitter-text');

exports.hashtagsToTags = (content) => {
  if (content === undefined) {
    return [];
  }

  return twitter.extractHashtags(twitter.htmlEscape(content));
};
