const moment = require("moment");
const slugify = require("@sindresorhus/slugify");
const cheerio = require('cheerio');
const rootUrl = require('../_data/site.js').url
const util = require('util');
const path = require('path');

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
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
  slugify: (string) => {
    return slugify(string, {
      decamelize: false,
      customReplacements: [
        ['%', ' ']
      ]
    });
  },
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
  }
}
