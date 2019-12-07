module.exports = function cleanDeepLinks(content) {
  const regex = / <a class="deeplink"((?!(<\/a>)).|\n)+<\/a>/gm;
  return content.replace(regex, '');
};
