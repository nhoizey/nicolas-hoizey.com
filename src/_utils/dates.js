const { DateTime } = require('luxon');

const iso2DT = (date, lang = 'en') =>
  DateTime.fromISO(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang);

const js2DT = (date, lang = 'en') =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang);

const formattedDate = (date, lang = 'en') =>
  js2DT(date, lang).toFormat('d LLLL y');

const formattedDateTime = (date, lang = 'en') =>
  js2DT(date, lang).toFormat('d LLLL y, HH:mm');

const formattedDateTimeFromIso = (date, lang = 'en') =>
  iso2DT(date, lang).toFormat('d LLLL y, HH:mm');

const monthString = (month, lang = 'en') => {
  // transforms "2020/02" into "February 2020"
  let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
  return iso2DT(fullDate, lang).toFormat('LLLL y');
};

const dayMonth = (date, lang = 'en') => js2DT(date, lang).toFormat('LLLL y');

const isoDate = (date) => js2DT(date).toISO();

const year = (date) => js2DT(date).toFormat('y');
const month = (date) => js2DT(date).toFormat('LL');
const day = (date) => js2DT(date).toFormat('dd');

const timestamp = (date) => new Date(date).getTime() / 1000;

module.exports = {
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
