const { DateTime } = require('luxon');

const formattedDate = (date, lang = 'en') =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang)
    .toFormat('d LLLL y');

const formattedDateTime = (date, lang = 'en') =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang)
    .toFormat('d LLLL y, HH:mm');

const formattedDateTimeFromIso = (date, lang = 'en') =>
  DateTime.fromISO(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang)
    .toFormat('d LLLL y, HH:mm');

const monthString = (month, lang = 'en') => {
  // transforms "2020/02" into "February 2020"
  let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
  return DateTime.fromISO(fullDate, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang)
    .toFormat('LLLL y');
};

const dayMonth = (date, lang = 'en') =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .setLocale(lang)
    .toFormat('LLLL y');

const isoDate = (date) =>
  DateTime.fromJSDate(date, { setZone: true }).setZone('Europe/Paris').toISO();

const year = (date) =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .toFormat('y');
const month = (date) =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .toFormat('LL');
const day = (date) =>
  DateTime.fromJSDate(date, { setZone: true })
    .setZone('Europe/Paris')
    .toFormat('dd');

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
