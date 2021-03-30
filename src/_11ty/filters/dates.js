const moment = require('moment');

const dtf = {
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

const dtfDigits = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formattedDate(lang, date) {
  return dtf[lang || 'en'].format(date);
}

module.exports = {
  date: (date, format) => {
    return moment(date).format(format);
  },
  formattedDate: (date) => {
    // return moment(date).format('Do MMMM YYYY');
    const isoDate = new Date(date);
    return formattedDate('en', isoDate);
  },
  monthString: (month) => {
    // transforms "2020/02" into "February 2020"
    let fullDate = `${month.replace('/', '-')}-01T10:00:00.000Z`;
    return moment(fullDate).format('MMMM YYYY');
  },
  attributeDate: (date) => date.substr(0, 10),
};
