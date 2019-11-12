const { DateTime } = require("luxon");

module.exports = function attributeDate(dateObj) {
  return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
};
