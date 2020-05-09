const fetch = require('node-fetch');
const { writeToCache } = require('./cache');

const NOTIST_URL = 'https://noti.st/nhoizey.json';
const NOTIST_CACHE = '_cache/notist.json';

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
          console.log(`Get details for talk "${detail.attributes.title}"`);
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

        writeToCache(notist, NOTIST_CACHE);
      }
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

fetchNotist();
