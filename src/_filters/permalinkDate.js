module.exports = function permalinkDate(value) {
  let dateObject = new Date(value);
  dateObject.setHours(dateObject.getHours() + 2);

  // yyyy/mm/dd
  return dateObject
    .toISOString()
    .replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).*$/, "$1/$2/$3");
};
