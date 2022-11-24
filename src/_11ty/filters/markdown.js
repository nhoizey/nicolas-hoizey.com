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

const shortMessageCode = (shortMessage) => {
  // Deal with inline code
  shortMessage = shortMessage.replace(/`([^`]+)`/g, (correspondance, code) => {
    return '`' + htmlEntities(code) + '`';
  });
  return shortMessage;
};

const tweetHashtagTohandle = (tweet) => {
  // convert hashtags to Twitter accounts
  let handles = {
    '#Algolia': '@algolia',
    '#AlwaysData': '@alwaysdata',
    '#CanIUse': '@caniuse',
    '#Chrome': '@googlechrome',
    '#Cloudflare': '@CloudflareDev',
    '#Cloudinary': '@cloudinary',
    '#CodePen': '@CodePen',
    '#Coil': '@Coil',
    '#Dareboost': '@Dareboost',
    '#Eleventy': '@eleven_ty',
    '#esviji': '@esviji',
    '#Edge': '@MicrosoftEdge',
    '#EveryLayout': '@layoutplusplus',
    '#Fastly': '@fastly',
    '#Firefox': '@firefox',
    '#Flickr': '@Flickr',
    '#Formula1': '@F1',
    '#Gandi': '@gandi_net',
    '#GitHub': '@github',
    '#IFTTT': '@IFTTT',
    '#Jekyll': '@jekyllrb',
    '#Jest': '@fbjest',
    '#Lego': '@LEGO_Group',
    '#Leonardo': '@Leonardo_Color',
    '#Lighthouse': '@____lighthouse',
    '#Mapbox': '@Mapbox',
    '#Mastodon': '@joinmastodon',
    '#Matomo': '@matomo_org',
    '#MDN': '@MozDevNet',
    '#Netlify': '@Netlify',
    '#Notist': '@benotist',
    '#npm': '@npmjs',
    '#Pinboard': '@Pinboard',
    '#Rollup': '@RollupJS',
    '#Setapp': '@setapp',
    '#SpeedCurve': '@SpeedCurve',
    '#Svelte': '@sveltejs',
    '#Tailwind': '@tailwindcss',
    '#Treo': '@__treo',
    '#Unsplash': '@unsplash',
    '#Uphold': '@UpholdInc',
    '#VSCode': '@code',
    '#webhint': '@webhintio',
    '#Workbox': '@workboxjs',
    '#WebPageTest': '@RealWebPageTest',
  };
  for (const tag in handles) {
    tweet = tweet.replaceAll(tag, handles[tag]);
  }

  // Add zero width space to CSS At-rules
  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
  [
    'charset',
    'import',
    'namespace',
    'media',
    'supports',
    'page',
    'font-face',
    'keyframes',
    'counter-style',
    'property',
    'layer',
  ].forEach((atRule) => {
    tweet = tweet.replace(`@{atRule}`, `@​{atRule}`);
  });

  return tweet;
};

const tootHashtagTohandle = (toot) => {
  // convert hashtags to Twitter accounts
  let handles = {
    '#Eleventy': '@eleventy@fosstodon.org',
    '#Mastodon': '@Mastodon@mastodon.social',
  };
  for (const tag in handles) {
    toot = toot.replaceAll(tag, handles[tag]);
  }

  // Add zero width space to CSS At-rules
  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
  [
    'charset',
    'import',
    'namespace',
    'media',
    'supports',
    'page',
    'font-face',
    'keyframes',
    'counter-style',
    'property',
    'layer',
  ].forEach((atRule) => {
    toot = toot.replace(`@{atRule}`, `@​{atRule}`);
  });

  return toot;
};

const shortMessageRemoveImage = (shortMessage) => {
  // remove markdown images
  shortMessage = shortMessage.replace(MARKDOWN_IMAGE_REGEX, '');
  return shortMessage;
};

const shortMessageLinks = (shortMessage) => {
  // only keep the links text
  shortMessage = shortMessage.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '$1');
  return shortMessage;
};

const shortMessageStrike = (shortMessage) => {
  // replace <del>blah blah</del> by b̶̶l̶a̶h̶ ̶b̶l̶a̶h̶
  shortMessage = shortMessage.replace(
    /<del>([^<]+)<\/del>/g,
    ($correspondance, $1) => {
      return $1
        .split('')
        .map((c) => `${c}\u0336`)
        .join('');
    }
  );
  return shortMessage;
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
    tweet = shortMessageCode(tweet);

    // remove bold and italics
    tweet = tweet.replace(/\*+([^\*\n]+)\*+/g, '$1');

    tweet = tweetHashtagTohandle(tweet);

    tweet = shortMessageRemoveImage(tweet);
    tweet = shortMessageLinks(tweet);
    tweet = shortMessageStrike(tweet);

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
  noteToToot: (content, url) => {
    toot = content.trim();
    toot = shortMessageCode(toot);

    // remove bold and italics
    toot = toot.replace(/\*+([^\*\n]+)\*+/g, '$1');

    toot = tootHashtagTohandle(toot);

    toot = shortMessageRemoveImage(toot);
    toot = shortMessageLinks(toot);
    toot = shortMessageStrike(toot);

    toot = entities.decodeHTML(toot);

    // escape unicode
    toot = toot.replace(/\\([0-9A-F])/gm, '\\\\$1');

    // find caniuse shortcodes
    toot = toot.replace(
      /\{% caniuse \\"([^)]+)\\" %\}/,
      'https://caniuse.com/$1'
    );

    // Normalize line feeds
    toot = toot.replace(/\n/gm, '\\n');
    toot = toot.replace(/(\\n){3,}/gm, '\\n\\n');
    toot = toot.replace(/^(\\n)*/gm, '');
    toot = toot.replace(/(\\n)*$/gm, '');

    toot = toot.replace(/"/gm, '\\"');

    return toot;
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
