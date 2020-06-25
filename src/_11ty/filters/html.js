const cheerio = require('cheerio');
const truncateHtml = require('truncate-html');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {
  cleanDeepLinks: (content) => {
    const regex = / <a class="deeplink"((?!(<\/a>)).|\n)+<\/a>/gm;
    return content.replace(regex, '');
  },
  decodeEntities: (content) => {
    return entities.decode(content);
  },
  cleanForAlgolia: (html) => {
    // TODO: Use BasicHTML?
    const $ = cheerio.load(html);
    $(
      'a.footnote, a.footnotes, div.footnote, div.footnotes, sup.footnote, sup.footnotes, sup.footnote-ref, a.footnote-backref, a.deeplink'
    ).remove();
    html = $.html();
    html = entities.decode(html);
    return html;
  },
  excerpt: (content) => {
    if (content === undefined) {
      return '';
    }
    const regex = /(<p( [^>]*)?>((?!(<\/p>)).|\n)+<\/p>)/m;
    let excerpt = '';

    // Remove paragraphs containing only an image
    cleanContent = content.replace(/<p><img [^>]+><\/p>/, '');

    // Get first paragraph, if there's at least one, and remove the paragraph tag
    if ((matches = regex.exec(cleanContent)) !== null) {
      excerpt = matches[0].replace(
        /<p( [^>]*)?>(((?!(<\/p>)).|\n)+)<\/p>/,
        '$2'
      );
    }

    return excerpt;
  },
  absoluteImagePath: (content, url) => {
    const HTML_IMAGE_REGEX = /<img src="([^"]+)"/g;

    while ((match = HTML_IMAGE_REGEX.exec(content))) {
      if (!match[1].match(/^(\/|https?:\/\/)/)) {
        content = content.replace(match[1], `${url}${match[1]}`);
      }
    }

    return content;
  },
  removeImages: (html) => html.replace(/<img [^>]+>/, ''),
  truncateHtml: (html, length) => {
    return truncateHtml(html, length, {
      reserveLastWord: true,
      ellipsis: '…',
    });
  },
  algoliaExcerpt: (text) => {
    return text.substring(0, 5000);
  },
};
