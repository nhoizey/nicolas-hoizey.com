const moment = require("moment");

module.exports = function permalinkDate(date) {
  return moment(date).format('YYYY/MM');
};
