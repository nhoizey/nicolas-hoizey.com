const moment = require("moment");

module.exports = function notePermalinkDate(date) {
  return moment(date).format('YYYY/MM/DD');
};
