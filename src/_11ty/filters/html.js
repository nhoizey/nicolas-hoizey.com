const cheerio = require('cheerio');
const truncateHtml = require('truncate-html');
const entities = require('entities');

module.exports = {
  cleanDeepLinks: (content) => {
    const regex = / <a class="deeplink"((?!(<\/a>)).|\n)+<\/a>/gm;
    return content.replace(regex, '');
  },
  decodeEntities: (content) => {
    return entities.decodeHTML(content);
  },
  cleanForAlgolia: (html) => {
    // Remove some elements with Cheerio: footnote links, heading links
    // TODO: Use BasicHTML?
    const $ = cheerio.load(html);
    $('sup.footnote-ref, a.footnote-backref, a.deeplink').remove();
    html = $.html();

    // Cheerio can't load videos, so we get a fallback message we have to remove
    html = html.replace(
      "Your browser doesn't support video. See the animated GIF.",
      ''
    );
    html = entities.decodeHTML(html);
    html = html.replace("'", '’');

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
