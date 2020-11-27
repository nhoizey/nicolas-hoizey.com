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
function textAuthors(data) {
  let text = '';
  if (data.layout === 'link' && data.authors && data.authors.length > 0) {
    let i = 0;
    const nb = data.authors.length;
    data.authors.forEach((author) => {
      text += author.name;
      i++;
      if (i < nb - 1) {
        text += ', ';
      }
      if (i === nb - 1) {
        text += ' and ';
      }
    });
  }
  return text;
}

function title(data) {
  switch (data.layout) {
    case 'link':
      return `${textAuthors(data)}:\n“${data.title}”`;
    case 'note':
      return `Note from ${formattedDate(data.lang, data.page.date)}`;
  }
  if (data.title && data.title !== '') {
    return data.title;
  } else {
    // TODO: console.log(`No title for ${data.page.inputPath}`);
    return '???';
  }
}


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

function headTitle(data) {
  if (data.page.url === '/') {
    return `<title itemprop="name">${data.pkg.title}</title>`;
  }
  // if (data.layout === 'note') {
  //   return `<title>${lead(data).slice(0, 50)} - ${
  //     data.pkg.author.name
  //   }</title>`;
  // }
  return `<title>${title(data)} - ${data.pkg.author.name}</title>`;
}


// TODO: is it useful?
module.exports = {
  lang: (data) => data.lang || 'en',
  formattedDate: (data) => dtf[data.lang || 'en'].format(data.page.date),
  attributeDate: (data) => attributeDate(data.page.date),
  permalinkDate: (data) => permalinkDate(data.page.date),
  head: {
    title: (data) => headTitle(data),
  },
  tags: (data) => tags(data),
};
