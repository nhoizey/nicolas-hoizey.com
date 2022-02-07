const twitter = require('twitter-text');
const config = require('../../pack11ty.config.js');

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

const dateFormatDigits = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function attributeDate(date) {
  const dateObject = new Date(date);
  return dateObject.toISOString().substr(0, 10);
}

function formattedDate(lang, date) {
  const isoDate = new Date(date);
  return dateFormat[lang || 'en'].format(isoDate);
  // return dtf[lang || 'en'].format(date);
}

function removeEmojis(content) {
  // https://thekevinscott.com/emojis-in-javascript/
  return content.replace(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    ''
  );
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
      // TODO: Add support for author.mastodon
      if (author.twitter) {
        html += `<img class="u-photo avatar" src="https://res.cloudinary.com/nho/image/twitter_name/${author.twitter}" alt="${author.name} avatar" loading="lazy" width="48" height="48" /> `;
      }
      html += `<b class="p-name">${author.name}</b>`;
      if (author.twitter) {
        html += ` <a class="author__twitter" href="https://twitter.com/${author.twitter}" aria-label="@${author.twitter} on Twitter"><svg><use xlink:href="#symbol-twitter" /></svg></a>`;
      }
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

function bodyTitle(data) {
  if (data.layout === 'note') {
    return `Note from ${formattedDate(data.lang, data.page.date)}`;
  }
  if (data.layout === 'billet') {
    return `Billet du ${formattedDate(data.lang, data.page.date)}`;
  }
  if (data.title && data.title !== '') {
    return data.title;
  } else {
    // TODO: console.log(`No title for ${data.page.inputPath}`);
    return '???';
  }
}

function title(data) {
  let body = bodyTitle(data);
  if (data.layout === 'link') {
    return `${textAuthors(data)}: ${body}`;
  }
  return body;
}

// TODO: refactor with the one in filters
function tagToHashtag(tag) {
  let words = tag.replace(/[-\.]/, ' ').split(' ');
  return (
    words[0] +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
      .join('')
  );
}

function tags(data) {
  let tags = [];
  if (data.layout === 'note') {
    // TODO: duplicate work with collections/notes.js ?
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
  if (data.layout === 'note') {
    return `<title>Note: ${data.page.excerpt.replace(
      /^(.{40}[^\s]*).*/gm,
      '$1'
    )}… - ${data.pkg.author.name}</title>`;
  }
  if (data.layout === 'billet') {
    return `<title>${bodyTitle(data)}</title>`;
  }
  return `<title>${title(data)} - ${data.pkg.author.name}</title>`;
}

function headDescription(data) {
  if (data.page.url === '/') {
    return data.pkg.description;
  }
  return data.page.excerpt;
}

function ogType(data) {
  switch (data.layout) {
    case 'article':
    case 'link':
    case 'note':
    case 'billet':
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

function ogImageTitle(data) {
  if (data.page.url === '/') {
    return data.pkg.title;
  }
  switch (data.layout) {
    case 'article':
    case 'link':
    case 'talk':
      return removeEmojis(title(data));
    case 'note':
      return removeEmojis(data.page.excerpt);
    case 'billet':
      return removeEmojis(data.page.excerpt);
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
    case 'billet':
    case 'talk':
      return ogTags(data);
  }
  return '';
}

module.exports = {
  lang: (data) => data.lang || config.defaultLang || 'en',
  date: (data) => data.date || new Date(),
  formattedDate: (data) => formattedDate(data.lang, data.page.date),
  attributeDate: (data) => attributeDate(data.page.date),
  authors: {
    text: (data) => textAuthors(data),
    html: (data) => htmlAuthors(data),
  },
  head: {
    title: (data) => headTitle(data),
    description: (data) => headDescription(data),
  },
  body: {
    title: (data) => bodyTitle(data),
  },
  opengraph: {
    type: (data) => ogType(data),
    title: (data) => ogTitle(data),
    image: {
      title: (data) => ogImageTitle(data),
      tagline: (data) => ogImageTagline(data),
    },
  },
  // tags: (data) => tags(data),
  permalink: (data) =>
    data.page.filePathStem.startsWith('/drafts/') &&
    process.env.NODE_ENV === 'production'
      ? false
      : data.permalink,
  eleventyExcludeFromCollections: (data) => {
    return (
      data.eleventyExcludeFromCollections === true ||
      (data.page.filePathStem.startsWith('/drafts/') &&
        process.env.NODE_ENV === 'production')
    );
  },
  githubEditUrl: (data) => {
    if (['article', 'link', 'note', 'billet'].includes(data.layout)) {
      return new URL(
        data.page.inputPath,
        'https://github.com/nhoizey/nicolas-hoizey.com/blob/main/'
      ).toString();
    } else {
      return false;
    }
  },
};
