const { DateTime } = require("luxon");

module.exports = function permalinkDate(dateObj) {
  return DateTime.fromJSDate(dateObj).toFormat('yyyy/LL');
};
