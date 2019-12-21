const moment = require("moment");

module.exports = function dateFormat(date, format) {
  return moment(date).format(format);
};
