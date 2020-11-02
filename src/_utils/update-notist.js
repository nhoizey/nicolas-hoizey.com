const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const NOTIST_URL = 'https://noti.st/nhoizey.json';
const NOTIST_MORE = 'src/talks/more.json';

const writeToMarkdown = (notist) => {
  let more = {};
  if (fs.existsSync(NOTIST_MORE)) {
    more = JSON.parse(fs.readFileSync(NOTIST_MORE));
  }

  console.log('Creating talks files');
  notist.map((talk) => {
    console.log(`  ${talk.attributes.title}`);
    const dir = `src/talks/${talk.attributes.presented_on.replace(
      /^([0-9]{4})-([0-9]{2})-([0-9]{2}).*$/,
      '$1/$2/$3'
    )}/${talk.attributes.slug}`;
    console.log(`  ${dir}
`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // prettier-ignore
    const content = `---
date: ${talk.attributes.presented_on} +02:00${
      more[dir] && more[dir].lang
        ? `
lang: ${more[dir].lang}`
        : ''
    }
title: "${talk.attributes.title}"${
      more[dir] && more[dir].tags
        ? `
tags: ${more[dir].tags}`
        : ''
    }
notist_url: "${talk.links.self}"
illustration:
  src: "${talk.attributes.image.src}"
  alt: "Cover slide from the talk “${talk.attributes.title}”"
  width: ${talk.attributes.image.width}
  height: ${talk.attributes.image.height}
location:
  name: "${talk.attributes.event.name}"${
      talk.attributes.event.url !== null && talk.attributes.event.url !== ''
        ? `
  url: "${talk.attributes.event.url}"`
        : ''
    }
---
${talk.attributes.blurb.replace(/<\/p>/g, '').replace(/<p>/g, '\n')}
`;
    fs.writeFileSync(`${dir}/index.md`, content, (err) => {
      if (err) throw err;
    });
  });
};

async function fetchAll(urls) {
  const results = await Promise.all(
    urls.map((url) => fetch(url).then((response) => response.json()))
  );
  return results;
}

const fetchNotist = async () => {
  try {
    const response = await fetch(NOTIST_URL);
    if (response.ok) {
      let notist = await response.json();
      if (notist.data) {
        notist = notist.data[0].relationships.data;

        const urls = notist.map((talk) => talk.links.related);
        const details = await fetchAll(urls);

        details.map((detail) => {
          detail = detail.data[0];
          notist.map((talk) => {
            if (talk.id === detail.id) {
              talk.links.self = detail.links.self;
              talk.attributes.slug = detail.attributes.slug;
              talk.attributes.blurb = detail.attributes.blurb.html;
              talk.attributes.event = {
                name: detail.relationships.data[0].attributes.title,
                url: detail.relationships.data[0].attributes.url,
              };
            }
          });
        });

        writeToMarkdown(notist);
      }
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

fetchNotist();
