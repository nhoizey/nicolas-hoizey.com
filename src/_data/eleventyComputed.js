const twitter = require('twitter-text');

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

function attributeDate(date) {
  return dtfDigits.format(date).split('/').reverse().join('-');
}

function permalinkDate(date) {
  return dtfDigits.format(date).split('/').reverse().join('/');
}

function formattedDate(lang, date) {
  return dtf[lang || 'en'].format(date);
}

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

function htmlAuthors(data) {
  let html = '';
  if (data.layout === 'link' && data.authors && data.authors.length > 0) {
    let i = 0;
    const nb = data.authors.length;
    data.authors.forEach((author) => {
      html += '<span class="p-author h-card">';
      if (author.twitter) {
        html += `<img class="u-photo avatar" src="https://res.cloudinary.com/nho/image/twitter_name/${author.twitter}" alt="${author.name} avatar" loading="lazy" width="48" height="48" /> `;
      }
      html += `<b class="p-name">${author.name}</b>`;
      if (author.twitter) {
        html += ` <span class="author__twitter">(<svg><use xlink:href="#symbol-twitter" /></svg> @<a href="https://twitter.com/${author.twitter}">${author.twitter}</a>)</span>`;
      }
      html += '</span>';
      i++;
      if (i < nb - 1) {
        html += ', ';
      }
      if (i === nb - 1) {
        html += ' and ';
      }
    });
  }
  return html;
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

// TODO: remove 'excerpt' filter when this works
function lead(data) {
  // if (data.layout === 'note') {
  //   console.dir(data);
  // }
  if (data.content === undefined) {
    return '';
  }
  const regex = /(<p( [^>]*)?>((?!(<\/p>)).|\n)+<\/p>)/m;
  let lead = '';

  // Remove paragraphs containing only an image
  let cleanContent = data.content.replace(/<p><img [^>]+><\/p>/, '');

  // Get first paragraph, if there's at least one, and remove the paragraph tag
  if ((matches = regex.exec(cleanContent)) !== null) {
    lead = matches[0].replace(/<p( [^>]*)?>(((?!(<\/p>)).|\n)+)<\/p>/, '$2');
  }

  return lead;
}


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

function ogTags(data) {
  return tags(data)
    .map((tag) => '#' + tagToHashtag(tag))
    .join('%20%20');
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

function ogType(data) {
  switch (data.layout) {
    case 'article':
    case 'link':
    case 'note':
    case 'talk':
      return 'article';
  }
  return 'website';
}

function ogTitle(data) {
  if (data.page.url === '/') {
    return data.pkg.title;
  }
  return removeEmojis(title(data));
}

function ogDescription(data) {
  return lead(data).slice(0, 50);
}

function ogImageTitle(data) {
  if (data.page.url === '/') {
    return data.pkg.title;
  }
  switch (data.layout) {
    case 'article':
    case 'link':
    case 'talk':
    case 'note':
      return removeEmojis(title(data));
    // case 'note':
    //   return lead(data);
  }
  return '';
}

function ogImageTagline(data) {
  if (data.page.url === '/') {
    return '';
  }
  switch (data.layout) {
    case 'article':
    case 'link':
    case 'note':
    case 'talk':
      return ogTags(data);
  }
  return '';
}

module.exports = {
  lang: (data) => data.lang || 'en',

  formattedDate: (data) => formattedDate(data.lang, data.page.date),
  attributeDate: (data) => attributeDate(data.page.date),
  permalinkDate: (data) => permalinkDate(data.page.date),
  authors: {
    text: (data) => textAuthors(data),
    html: (data) => htmlAuthors(data),
  },
  head: {
    title: (data) => headTitle(data),
  },
  opengraph: {
    type: (data) => ogType(data),
    title: (data) => ogTitle(data),
    description: (data) => ogDescription(data),
    image: {
      title: (data) => ogImageTitle(data),
      tagline: (data) => ogImageTagline(data),
    },
  },
  lead: (data) => lead(data),
  tags: (data) => tags(data),
};
