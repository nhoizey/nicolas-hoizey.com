const twitter = require('twitter-text');
const slugifyString = require('../../_utils/slugify');
const path = require('path');
const entities = require('entities');

const { tagToHashtag } = require('./string.js');

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

const tootHashtagTohandle = (toot, tags) => {
  // Remove tags from the list if they're already in the content as hashtags
  const hashTags = tags
    .filter((tag) => !toot.match(`#${tagToHashtag(tag)}`))
    .map((tag) => `#${tagToHashtag(tag)}`);

  // convert hashtags to Mastodon accounts
  let handles = {
    '#CloudCannon': '@cloudcannon@techhub.social',
    '#Eleventy': '@eleventy@fosstodon.org',
    '#Mastodon': '@Mastodon@mastodon.social',
    '#SpeedCurve': '@speedcurve@webperf.social',
    '#ABookApart': '@abookapart@front-end.social',
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
    toot = toot.replace(`@${atRule}`, `@​${atRule}`);
  });

  if (hashTags.length > 0) {
    toot = toot.concat('\n\n', hashTags.join(' '));
  }

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

const shortMessageMark = (shortMessage) => {
  // only keep the mark text
  shortMessage = shortMessage.replace(/<\/?mark>/g, '');
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
        title: match[1],
      });
    }

    return JSON.stringify(attachments);
  },
  noteToToot: (content, tags) => {
    toot = content.trim();
    toot = shortMessageCode(toot);

    // remove bold and italics
    toot = toot.replace(/\*+([^\*\n]+)\*+/g, '$1');

    toot = tootHashtagTohandle(toot, tags);

    toot = shortMessageRemoveImage(toot);
    toot = shortMessageLinks(toot);
    toot = shortMessageStrike(toot);
    toot = shortMessageMark(toot);

    toot = entities.decodeHTML(toot);

    // escape unicode
    toot = toot.replace(/\\([0-9A-F])/gm, '\\\\$1');

    // find caniuse shortcodes
    toot = toot.replace(/\{% caniuse "([^)]+)" %\}/, 'https://caniuse.com/$1');

    // Remove some escapings
    toot = toot.replace(/\\\+/gm, '+');

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
      content = content.replaceAll(`@${atRule}`, `@​${atRule}`);
    });

    // Twitter's extractMentions function thinks https://mastodon.social/@pixelfed/110117529562163633
    // contains a Twitter mention… 🤦‍♂️

    // "protect" Mastodon-like URLs
    content = content.replace(/(https:\/\/[^\/]+\/)@/g, '$1###AROBASE###');

    let mentions = twitter.extractMentions(content);
    mentions.forEach((mention) => {
      content = content.replace(
        `@${mention}`,
        `<a href="https://twitter.com/${mention}">@${mention}</a>`
      );
    });

    // "restore" Mastodon-like URLs
    content = content.replace(/(https:\/\/[^\/]+\/)###AROBASE###/g, '$1@');

    return content;
  },
};
