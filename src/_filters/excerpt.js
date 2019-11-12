module.exports = function excerpt(content) {
  const regex = /(<p>.*<\/p>)/m;
  let excerpt = '';
  if ((matches = regex.exec(content)) !== null) {
    excerpt = matches[0];
  }
  return excerpt;
};
