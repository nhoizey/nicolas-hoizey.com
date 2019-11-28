module.exports = function excerpt(content) {
  if (content === undefined) {
    return '';
  }
  const regex = /(<p( [^>]*)?>((?!(<\/p>)).|\n)+<\/p>)/m;
  let excerpt = '';
  cleanContent = content
    // .replace(/<blockquote>(?!(<\/blockquote>))*<\/blockquote>/, '')
    .replace(/<p><img [^>]+><\/p>/, '');
  if ((matches = regex.exec(cleanContent)) !== null) {
    excerpt = matches[0];
  }

  return excerpt;
};
