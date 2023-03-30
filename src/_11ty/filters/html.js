const cheerio = require('cheerio');
const truncateHtml = require('truncate-html');
const entities = require('entities');

module.exports = {
  cleanDeepLinks: (content) => {
    const regex = /<a class="deeplink"((?!(<\/a>)).|\n)+<\/a>/gm;
    return content.replace(regex, '');
  },
  escapeQuotes: (content, withinQuotation = false) =>
    content.replaceAll(/"([^"]+)"/g, withinQuotation ? '‘$1’' : '“$1”'),
  decodeEntities: (content) => {
    return entities.decodeHTML(content);
  },
  encodeEntities: (content) => {
    return entities.encodeHTML(content);
  },
  cleanForAlgolia: (html) => {
    // Remove some elements with Cheerio: footnote links, heading links
    // Cheerio can't load videos, so we get a fallback message we have to remove
    // TODO: Use BasicHTML?
    const $ = cheerio.load(html);
    $('sup.footnote-ref, a.footnote-backref, a.deeplink, div.giphy').remove();
    html = $.html();
    html = entities.decodeHTML(html);
    html = html.replace("'", '’');

    return html;
  },
  removeEmojis: (content) => {
    // https://thekevinscott.com/emojis-in-javascript/
    return content.replace(
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
      ''
    );
  },
  titleSafe: (content) => {
    return content.replace(/&#39;/g, '’');
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
  truncateHtml: (html, length) =>
    truncateHtml(html, length, {
      reserveLastWord: true,
      ellipsis: '…',
    }),
  cleanForJson: (html) => {
    return html.replace(/&quot;/gm, '\\"');
  },
  algoliaExcerpt: (text) => {
    return text.substring(0, 5000);
  },
};
