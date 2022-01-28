const slugify = require('@sindresorhus/slugify');

// Adapted from https://gist.github.com/codeguy/6684588#gistcomment-3361909
const poorSlugify = (str) => {
  let slug = str.toString();
  slug = slug.replaceAll('/', ' ');
  // Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  slug = slug.normalize('NFD');
  // Remove https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
  slug = slug.replace(/[\u0300-\u036f]/g, '');
  slug = slug.toLowerCase();
  slug = slug.replace(/\s+/g, ' ');
  slug = slug.trim();
  slug = slug.replace(/ +/g, '-');
  return slug;
};

// slugify is called 1000s of times, let's memoize it
let memoizedSlugs = {};

module.exports = (string) => {
  if (string in memoizedSlugs) {
    return memoizedSlugs[string];
  } else {
    const tifinaghRegex = /^[ \u{2D30}-\u{2D7F}]+$/u;
    // Chinese characters (except the extensions): https://stackoverflow.com/a/41155368/717195
    const chineseRegex =
      /^[ \u{2E80}-\u{2FD5}\u{3190}-\u{319f}\u{3400}-\u{4DBF}\u{4E00}-\u{9FCC}\u{F900}-\u{FAAD}]+$/u;
    let slug = string;
    if (tifinaghRegex.test(slug) || chineseRegex.test(slug)) {
      // slug = slug.replace(/ +/, '-');
      slug = poorSlugify(slug);
    } else {
      slug = slugify(string, {
        decamelize: false,
        customReplacements: [
          ['%', ' '],
          ['…', ' '],
        ],
      });
    }
    memoizedSlugs[string] = slug;
    return slug;
  }
};
