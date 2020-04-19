const twitter = require('twitter-text');
const slugifyString = require('../../_utils/slugify');

function htmlEntities(str) {
  // https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = {
  noteToTweet: (content, url) => {
    tweet = content.trim();

    // Deal with inline code
    tweet = tweet.replace(/`([^`]+)`/g, ($correspondance, code) => {
      return '`' + htmlEntities(code) + '`';
    });

    // remove bold and italics
    tweet = tweet.replace(/\*+([^\*\n]+)\*+/, '$1');

    // convert hashtags to Twitter accounts
    let handles = {
      '#Cloudinary': '@cloudinary',
      '#Dareboost': '@Dareboost',
      '#Eleventy': '@eleven_ty',
      '#EveryLayout': '@layoutplusplus',
      '#Github': '@github',
      '#Jekyll': '@jekyllrb',
      '#Netlify': '@Netlify',
      '#Notist': '@benotist',
      '#Rollup': '@RollupJS',
      '#Tailwind': '@tailwindcss',
      '#Unsplash': '@unsplash',
      '#Workbox': '@workboxjs',
    };
    for (const tag in handles) {
      tweet = tweet.replace(tag, handles[tag]);
    }

    // deal with images
    tweet = tweet.replace(
      /!\[([^\]]+)\]\(([^\) ]+)( [^\)]+)?\)({.[^}]+})?/g,
      `🖼 <a href="${url}$2">image</a>`
    );

    // deal with links
    tweet = tweet.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '$1 ( $2 )');

    // replace <del>blah blah</del> by b̶̶l̶a̶h̶ ̶b̶l̶a̶h̶
    tweet = tweet.replace(/<del>([^<]+)<\/del>/g, ($correspondance, $1) => {
      return $1
        .split('')
        .map((c) => `${c}\u0336`)
        .join('');
    });

    tweet = tweet.replace(/\n/g, '<br />\n');
    // tweet = tweet.replace(/\n/g, "\u000a");

    return tweet;
  },
  noteToHtml: (content) => {
    let hashtags = twitter.extractHashtags(twitter.htmlEscape(content));
    hashtags.forEach((hashtag) => {
      content = content.replace(
        `#${hashtag}`,
        `<a href="/tags/${slugifyString(hashtag)}/">#${hashtag}</a>`,
        'g'
      );
    });

    // deal with Twitter handles
    let mentions = twitter.extractMentions(content);
    mentions.forEach((mention) => {
      content = content.replace(
        `@${mention}`,
        `<a href="https://twitter.com/${mention}">@${mention}</a>`
      );
    });

    return content;
  },
};
