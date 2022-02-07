const { DateTime } = require('luxon');

const locales = { en: 'en-GB', fr: 'fr-FR' };

const formattedDate = (date, lang = 'en') =>
  new Intl.DateTimeFormat(locales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

const formattedDateTime = (date, lang = 'en') =>
  new Intl.DateTimeFormat(locales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));

const monthString = (month, lang = 'en') => {
  // transforms "2020/02" into "February 2020"
  let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
  return DateTime.fromISO(fullDate).setLocale(lang).toFormat('LLLL y');
};

const dayMonth = (date, lang = 'en') =>
  DateTime.fromJSDate(date).setLocale(lang).toFormat('LLLL y');

const isoDate = (date) => DateTime.fromJSDate(date).toISO();

const year = (date) => DateTime.fromJSDate(date).toFormat('y');
const month = (date) => DateTime.fromJSDate(date).toFormat('LL');
const day = (date) => DateTime.fromJSDate(date).toFormat('dd');

const timestamp = (date) => new Date(date).getTime() / 1000;

module.exports = {
  formattedDate,
  formattedDateTime,
  isoDate,
  monthString,
  dayMonth,
  year,
  month,
  day,
  timestamp,
};
