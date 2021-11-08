const twitter = require('twitter-text');
const slugifyString = require('../../_utils/slugify');
const path = require('path');
const entities = require('entities');

const MARKDOWN_IMAGE_REGEX = /!\[([^\]]*)\]\(([^\) ]+)( [^\)]+)?\)({.[^}]+})?/g;

function htmlEntities(str) {
  // https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const tweetCode = (tweet) => {
  // Deal with inline code
  tweet = tweet.replace(/`([^`]+)`/g, (correspondance, code) => {
    return '`' + htmlEntities(code) + '`';
  });
  return tweet;
};

const tweetHashtagTohandle = (tweet) => {
  // convert hashtags to Twitter accounts
  let handles = {
    '#Algolia': '@algolia',
    '#AlwaysData': '@alwaysdata',
    '#CanIUse': '@caniuse',
    '#Chrome': '@googlechrome',
    '#Cloudflare': '@Cloudflare',
    '#Cloudinary': '@cloudinary',
    '#Coil': '@Coil',
    '#Dareboost': '@Dareboost',
    '#Eleventy': '@eleven_ty',
    '#esviji': '@esviji',
    '#Edge': '@MicrosoftEdge',
    '#EveryLayout': '@layoutplusplus',
    '#Fastly': '@fastly',
    '#Firefox': '@firefox',
    '#Flickr': '@Flickr',
    '#Gandi': '@gandi_net',
    '#GitHub': '@github',
    '#GoogleAnalytics': '@googleanalytics',
    '#IFTTT': '@IFTTT',
    '#Jekyll': '@jekyllrb',
    '#Jest': '@fbjest',
    '#Lighthouse': '@____lighthouse',
    '#Mapbox': '@Mapbox',
    '#Matomo': '@matomo_org',
    '#MDN': '@MozDevNet',
    '#Netlify': '@Netlify',
    '#Notist': '@benotist',
    '#Pinboard': '@Pinboard',
    '#Rollup': '@RollupJS',
    '#Setapp': '@setapp',
    '#Svelte': '@sveltejs',
    '#Tailwind': '@tailwindcss',
    '#Unsplash': '@unsplash',
    '#Uphold': '@UpholdInc',
    '#VSCode': '@code',
    '#webhint': '@webhintio',
    '#Workbox': '@workboxjs',
  };
  for (const tag in handles) {
    tweet = tweet.replace(tag, handles[tag]);
  }
  return tweet;
};

const tweetRemoveImage = (tweet) => {
  // remove markdown images
  tweet = tweet.replace(MARKDOWN_IMAGE_REGEX, '');
  return tweet;
};

const tweetLinks = (tweet) => {
  // only keep the links text
  tweet = tweet.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '$1');
  return tweet;
};

const tweetStrike = (tweet) => {
  // replace <del>blah blah</del> by b̶̶l̶a̶h̶ ̶b̶l̶a̶h̶
  tweet = tweet.replace(/<del>([^<]+)<\/del>/g, ($correspondance, $1) => {
    return $1
      .split('')
      .map((c) => `${c}\u0336`)
      .join('');
  });
  return tweet;
};

module.exports = {
  hasImage: (content) => {
    return content.match(MARKDOWN_IMAGE_REGEX);
  },
  imagesAsAttachments: (content, url) => {
    let attachments = [];

    while ((match = MARKDOWN_IMAGE_REGEX.exec(content))) {
      attachments.push({
        url: `${url}${match[2]}`,
        mime_type: `image/${path.extname(match[2]).slice(1)}`,
      });
    }

    return JSON.stringify(attachments);
  },
  noteToTweet: (content, url) => {
    tweet = content.trim();
    tweet = tweetCode(tweet);

    // remove bold and italics
    tweet = tweet.replace(/\*+([^\*\n]+)\*+/g, '$1');

    tweet = tweetHashtagTohandle(tweet);
    tweet = tweetRemoveImage(tweet);
    tweet = tweetLinks(tweet);
    tweet = tweetStrike(tweet);

    tweet = entities.decodeHTML(tweet);

    // escape unicode
    tweet = tweet.replace(/\\([0-9A-F])/gm, '\\\\$1');

    // find caniuse shortcodes
    tweet = tweet.replace(
      /\{% caniuse \\"([^)]+)\\" %\}/,
      'https://caniuse.com/$1'
    );

    // Normalize line feeds
    tweet = tweet.replace(/\n/gm, '\\n');
    tweet = tweet.replace(/(\\n){3,}/gm, '\\n\\n');
    tweet = tweet.replace(/^(\\n)*/gm, '');
    tweet = tweet.replace(/(\\n)*$/gm, '');

    tweet = tweet.replace(/"/gm, '\\"');

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
