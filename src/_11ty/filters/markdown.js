const twitter = require('twitter-text');
const slugifyString = require('../../_utils/slugify');
const path = require('path');
const entities = require('entities');
const people = require('../../_data/people.json');

const { tagToHashtag } = require('./string.js');

const TOOT_MAX_LENGTH = 460;
const MARKDOWN_IMAGE_REGEX = /!\[([^\]]*)\]\(([^\) ]+)( [^\)]+)?\)({.[^}]+})?/g;

function htmlEntities(str) {
  // https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const tootCode = (shortMessage) => {
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

  return { tootwithHandles: toot, hashTags: hashTags.join(' ') };
};

const tootRemoveImage = (shortMessage) => {
  // remove markdown images
  shortMessage = shortMessage.replace(MARKDOWN_IMAGE_REGEX, '');
  return shortMessage;
};

const tootLinks = (shortMessage) => {
  // only keep the links text
  shortMessage = shortMessage.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '$1');
  return shortMessage;
};

const tootMark = (shortMessage) => {
  // only keep the mark text
  shortMessage = shortMessage.replace(/<\/?mark>/g, '');
  return shortMessage;
};

const tootStrike = (shortMessage) => {
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

const mdToToot = (title, content, tags, url, link = '', authors = []) => {
  let cleanContent = content.trim();

  cleanContent = tootCode(cleanContent);

  // remove bold and italics
  cleanContent = cleanContent.replace(/\*+([^\*\n]+)\*+/g, '$1');

  let { tootwithHandles, hashTags } = tootHashtagTohandle(cleanContent, tags);

  cleanContent = tootRemoveImage(tootwithHandles);
  cleanContent = tootLinks(cleanContent);
  cleanContent = tootStrike(cleanContent);
  cleanContent = tootMark(cleanContent);

  cleanContent = entities.decodeHTML(cleanContent);

  // escape unicode
  cleanContent = cleanContent.replace(/\\([0-9A-F])/gm, '\\\\$1');

  // find caniuse shortcodes
  cleanContent = cleanContent.replace(
    /\{% caniuse "([^)]+)" %\}/,
    'https://caniuse.com/$1'
  );

  // Remove some escapings
  cleanContent = cleanContent.replace(/\\\+/gm, '+');

  // Normalize line feeds
  cleanContent = cleanContent.replace(/\n/gm, '\\n');
  cleanContent = cleanContent.replace(/(\\n){3,}/gm, '\\n\\n');
  cleanContent = cleanContent.replace(/^(\\n)*/gm, '');
  cleanContent = cleanContent.replace(/(\\n)*$/gm, '');

  cleanContent = cleanContent.replace(/"/gm, '\\"');

  let toot = title;
  let tootLength = toot.length;

  if (link !== '') {
    // This is a link
    const authorsNumber = authors.length;
    if (authorsNumber > 0) {
      toot += ' by ';
      if (authorsNumber === 1) {
        toot += people[authors[0]]?.mastodon || authors[0];
      } else {
        const mastodonAuthors = authors.map(
          (author) => people[author]?.mastodon || author
        );
        toot +=
          mastodonAuthors.slice(0, -1).join(', ') +
          ' and ' +
          mastodonAuthors.slice(-1);
      }
    }
    tootLength = toot.length;

    toot += '\\n\\n🔗 ' + link;
    // A link is always counted as 23 characters:
    // https://docs.joinmastodon.org/user/posting/#links
    tootLength += 25;
  }

  if (tootLength + cleanContent.length + hashTags.length > TOOT_MAX_LENGTH) {
    // the content must be cut
    if (tootLength + hashTags.length > TOOT_MAX_LENGTH) {
      // Even without content it's too long
      cleanContent = '';
      hashTags = hashTags.substring(
        0,
        hashTags.lastIndexOf(' ', TOOT_MAX_LENGTH - tootLength)
      );
    } else {
      // Shorten the content part
      cleanContent =
        cleanContent.substring(
          0,
          cleanContent.lastIndexOf(
            ' ',
            TOOT_MAX_LENGTH - tootLength - hashTags.length
          )
        ) + '…';
    }
  }

  return (
    toot + '\\n\\n' + cleanContent + '\\n\\n' + hashTags + '\\n\\n⚓️ ' + url
  );
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
  mdToToot: (title, content, tags, url, link = '', authors = []) =>
    mdToToot(title, content, tags, url, link, authors),
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
