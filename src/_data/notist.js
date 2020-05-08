const fs = require('fs');
const fetch = require('node-fetch');

const NOTIST_URL = 'https://noti.st/nhoizey.json';
const NOTIST_CACHE = '_cache/notist.json';

async function fetchAll(urls) {
  const results = await Promise.all(
    urls.map((url) => fetch(url).then((response) => response.json()))
  );
  return results;
}

async function fetchNotist() {
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

        return notist;
      }
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
}

// save in cache file
function writeToCache(data) {
  const dir = '_cache';
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // write data to cache json file
  fs.writeFile(NOTIST_CACHE, fileContent, (err) => {
    if (err) throw err;
  });
}

// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(NOTIST_CACHE)) {
    const cacheFile = fs.readFileSync(NOTIST_CACHE);
    return JSON.parse(cacheFile);
  }

  // no cache found.
  return {};
}

module.exports = async function () {
  // Only fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    const newNotistData = await fetchNotist();
    if (newNotistData) {
      writeToCache(newNotistData);
      return newNotistData;
    }
  }

  return readFromCache();
};
