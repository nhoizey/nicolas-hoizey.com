const moment = require("moment");
const slugify = require("@sindresorhus/slugify");
const cheerio = require('cheerio');
const rootUrl = require('../_data/site.js').url
const util = require('util');
const path = require('path');
const twitter = require('twitter-text');
const truncateHtml = require('truncate-html');

// slugify is called 1000s of times, let's memoize it
let memoizedSlugs = {};
function slugifyString(string) {
  if (string in memoizedSlugs) {
    return memoizedSlugs[string];
  } else {
    let slug = slugify(string, {
      decamelize: false,
      customReplacements: [
        ['%', ' ']
      ]
    });
    memoizedSlugs[string] = slug;
    return slug;
  }
}

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    if (url === undefined) {
      console.log('No URL for webmention matching');
      return [];
    }
    let urlsList = [
      `${rootUrl}${url}`
    ];
    if (parts = url.match(/^\/articles\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)\/$/)) {
      // Current permalink: /articles/2018/06/15/users-do-change-font-size/
      // /articles/2018/06/users-do-change-font-size/
      urlsList.push(`${rootUrl}/articles/${parts[1]}/${parts[2]}/${parts[4]}/`);
      // /2018/06/users-do-change-font-size/
      urlsList.push(`${rootUrl}/${parts[1]}/${parts[2]}/${parts[4]}/`);
      // /2018/06/users-do-change-font-size.html
      urlsList.push(`${rootUrl}/${parts[1]}/${parts[2]}/${parts[4]}.html`);
    }
    if (parts = url.match(/^\/links\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/(.*)\/$/)) {
      // Current permalink: /links/2019/12/10/good-enough/
      // /links/2019/12/good-enough/
      urlsList.push(`${rootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}/`);
      // /links/2019/12/good-enough.html
      urlsList.push(`${rootUrl}/links/${parts[1]}/${parts[2]}/${parts[4]}.html`);
    }
    return webmentions.filter(entry => {
      return urlsList.includes(entry['wm-target']);
    });
  },
  isOwnWebmention: (webmention) => {
    const urls = [
      rootUrl,
      'https://twitter.com/nhoizey',
      'https://twitter.com/nice_links'
    ]
    const authorUrl = webmention.author ? webmention.author.url : false
    // check if a given URL is part of this site.
    return authorUrl && urls.includes(authorUrl)
  },
  size: (mentions) => {
    return !mentions ? 0 : mentions.length
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => entry['wm-property'] === mentionType)
  },
  date: (date, format) => {
    return moment(date).format(format);
  },
  monthString: (month) => {
    // transforms "2020/02" into "February 2020"
    let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
    return moment(fullDate).format("MMMM YYYY");
  },
  attributeDate: (date) => {
    return moment(date).format('YYYY-MM-DD');
  },
  permalinkDate: (date) => {
    return moment(date).format('YYYY/MM');
  },
  notePermalinkDate: (date) => {
    return moment(date).format('YYYY/MM/DD');
  },
  cleanDeepLinks: (content) => {
    const regex = / <a class="deeplink"((?!(<\/a>)).|\n)+<\/a>/gm;
    return content.replace(regex, '');
  },
  split: (string, separator) => {
    return string.split(separator);
  },
  limit: (array, limit) => {
    return array.slice(0, limit);
  },
  offset: (array, offset) => {
    return array.slice(offset);
  },
  dump: (obj) => {
    return util.inspect(obj);
  },
  stripFootnotes: (content) => {
    // TODO: Use jsdom?
    const $ = cheerio.load(content);
    $('a.footnote, a.footnotes, div.footnote, div.footnotes, sup.footnote, sup.footnotes').remove();
    return $.html();
  },
  slugify: (string) => slugifyString(string),
  dirname: (filePath) => {
    return path.dirname(filePath);
  },
  uniq: (array) => {
    return [...new Set(array)];
  },
  base64: (url) => {
    return Buffer.from(url).toString('base64');
  },
  excerpt: (content) => {
    if (content === undefined) {
      return '';
    }
    const regex = /(<p( [^>]*)?>((?!(<\/p>)).|\n)+<\/p>)/m;
    let excerpt = '';

    // Remove paragraphs containing only an image
    cleanContent = content
      .replace(/<p><img [^>]+><\/p>/, '');

    // Get first paragraph, if there's at least one, and remove the paragraph tag
    if ((matches = regex.exec(cleanContent)) !== null) {
      excerpt = matches[0].replace(/<p( [^>]*)?>(((?!(<\/p>)).|\n)+)<\/p>/, "$2");
    }

    return excerpt;
  },
  tagToHashtag: (tag) => {
    let words = tag.replace(/-/, ' ').split(' ');
    return words[0] + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.substr(1)).join('');
  },
  microblogify: (content, url) => {
    tweet = content.trim();

    // convert hashtags to Twitter accounts
    let handles = {
      '#Cloudinary': '@cloudinary',
      '#Eleventy': '@eleven_ty',
      '#Jekyll': '@jekyllrb',
      '#Notist': '@benotist',
      '#Rollup': '@RollupJS',
      '#Tailwind': '@tailwindcss',
      '#Workbox': '@workboxjs'
    };
    for (const tag in handles) {
      tweet = tweet.replace(tag, handles[tag]);
    }

    // deal with images
    tweet = tweet.replace(/!\[([^\]]+)\]\(([^\) ]+)( [^\)]+)?\)({.[^}]+})?/g, `[<a href="${url}$2">image</a>]`);

    // deal with links
    tweet = tweet.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, "$1 ( $2 )");

    tweet = tweet.replace(/\n/g, "<br />\n");

    return tweet;
  },
  hashtagsToTagLinks: (content) => {
    let hashtags = twitter.extractHashtags(twitter.htmlEscape(content));
    hashtags.forEach(hashtag => {
      content = content.replace(`#${hashtag}`, `<a href="/tags/${slugifyString(hashtag)}/">#${hashtag}</a>`, 'g');
    });
    return content;
  },
  absoluteImagePath: (content, url) => {
    let imagesAbsoluteUrl = content.replace(/<img src="([^"]+)"/, (correspondance, $1) => {
      if (!$1.match(/^(\/|https?:\/\/)/)) {
        return `<img src="${url}${$1}"`;
      }
    });
    return imagesAbsoluteUrl;
  },
  removeImages: content => content.replace(/<img [^>]+>/, ''),
  truncateHtml: (content, length) => {
    return truncateHtml(content, length, { reserveLastWord: true, ellipsis: '…' });
  }
}
