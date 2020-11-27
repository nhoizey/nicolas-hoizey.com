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

const attributeDate = (date) =>
  dtfDigits.format(date).split('/').reverse().join('-');

const permalinkDate = (date) =>
  dtfDigits.format(date).split('/').reverse().join('/');
function tags(data) {
  let tags = [];
  if (data.layout === 'note') {
    tags = twitter.extractHashtags(twitter.htmlEscape(data.content));
  }
  if (data.tags !== undefined) {
    // merge and deduplicate
    tags = [...new Set([].concat(...tags, ...data.tags))];
  }
  tags.sort((a, b) => {
    return a.localeCompare(b, 'en', { ignorePunctuation: true });
  });
  return tags;
}


// TODO: is it useful?
module.exports = {
  lang: (data) => data.lang || 'en',
  formattedDate: (data) => dtf[data.lang || 'en'].format(data.page.date),
  attributeDate: (data) => attributeDate(data.page.date),
  permalinkDate: (data) => permalinkDate(data.page.date),
  tags: (data) => tags(data),
};
