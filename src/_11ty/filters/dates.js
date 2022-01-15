const moment = require('moment');

const dateFormat = {
  en: new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  fr: new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
};

const dateTimeFormat = {
  en: new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  fr: new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
};

const dayMonthFrFormat = new Intl.DateTimeFormat('fr-FR', {
  month: 'long',
  day: 'numeric',
});

const dateFormatDigits = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formattedDate(lang, date) {
  const isoDate = new Date(date);
  return dateFormat[lang || 'en'].format(isoDate);
}

function formattedDateTime(lang, date) {
  const isoDate = new Date(date);
  return dateTimeFormat[lang || 'en'].format(isoDate);
}

module.exports = {
  formattedDate: (date) => {
    return formattedDate('en', date);
  },
  formattedDateTime: (date) => {
    return formattedDateTime('en', date);
  },
  monthString: (month) => {
    // TODO: remove Moment dependency
    // transforms "2020/02" into "February 2020"
    let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
    return moment(fullDate).format('MMMM YYYY');
  },
  dayMonth: (date) => {
    const isoDate = new Date(date);
    return dayMonthFrFormat.format(isoDate);
  },
  attributeDate: (date) => date.substr(0, 10),
  year: (date) => date.toISOString().substr(0, 4),
  month: (date) => date.toISOString().substr(5, 2),
  day: (date) => date.toISOString().substr(8, 2),
  timestamp: (date) => {
    const thisDate = new Date(date);
    return thisDate.getTime() / 1000;
  },
};
