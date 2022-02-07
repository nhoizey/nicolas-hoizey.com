const {
  formattedDate,
  formattedDateTime,
  isoDate,
  monthString,
  dayMonth,
  year,
  month,
  day,
  timestamp,
} = require('../../_utils/dates');

module.exports = {
  formattedDate: (date, lang = 'en') => formattedDate(date, lang),
  formattedDateTime: (date, lang = 'en') => formattedDateTime(date, lang),
  monthString: (month, lang = 'en') => monthString(month, lang),
  dayMonth: (date, lang = 'en') => dayMonth(date, lang),
  isoDate: (date) => isoDate(date),
  year: (date) => year(date),
  month: (date) => month(date),
  day: (date) => day(date),
  timestamp: (date) => timestamp(date),
};
