const moment = require("moment");

module.exports = function attributeDate(date) {
  return moment(date).format('YYYY-MM-DD');
};
