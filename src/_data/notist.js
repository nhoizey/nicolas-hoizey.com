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
        console.dir(details[0].data[0]);

        details.map((detail) => {
          detail = detail.data[0];
          notist.map((talk) => {
            if (talk.id === detail.id) {
              talk.attributes.slug = detail.attributes.slug;
              talk.attributes.blurb = detail.attributes.blurb.html;
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

function prepareNotistData(rawData) {
  let talks = {
    future: [],
    past: [],
  };

  let now = new Date();
  rawData.map((talk) => {
    let when = new Date(talk.presented_on);
    var future = now - when < 0 ? true : false;
    if (future) {
      talks.future.push(talk);
    } else {
      talks.past.push(talk);
    }
  });

  return talks;
}

module.exports = async function () {
  // Only fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    const newNotistData = await fetchNotist();
    if (newNotistData) {
      writeToCache(newNotistData);
      return prepareNotistData(newNotistData);
    }
  }

  const cachedNotistData = readFromCache();
  return prepareNotistData(cachedNotistData);
};
