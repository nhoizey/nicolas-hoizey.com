const { DateTime } = require('luxon');

const isoToDateTime = (date, lang = 'en') =>
  DateTime.fromISO(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang);

const jsToDateTime = (date, lang = 'en') =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang);

const formattedDate = (date, lang = 'en') =>
  jsToDateTime(date, lang).toFormat('d LLLL y');

const formattedDateTime = (date, lang = 'en') =>
  jsToDateTime(date, lang).toFormat('d LLLL y, HH:mm');

const formattedDateTimeFromIso = (date, lang = 'en') =>
  isoToDateTime(date, lang).toFormat('d LLLL y, HH:mm');

const monthString = (month, lang = 'en') => {
  // transforms "2020/02" into "February 2020"
  let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
  return isoToDateTime(fullDate, lang).toFormat('LLLL y');
};

const dayMonth = (date, lang = 'en') =>
  jsToDateTime(date, lang).toFormat('LLLL y');

const isoDate = (date) => jsToDateTime(date).toISO();

const year = (date) => jsToDateTime(date).toFormat('y');
const month = (date) => jsToDateTime(date).toFormat('LL');
const day = (date) => jsToDateTime(date).toFormat('dd');

const timestamp = (date) => new Date(date).getTime() / 1000;

module.exports = {
  isoToDateTime,
  jsToDateTime,
  formattedDate,
  formattedDateTime,
  formattedDateTimeFromIso,
  isoDate,
  monthString,
  dayMonth,
  year,
  month,
  day,
  timestamp,
};
