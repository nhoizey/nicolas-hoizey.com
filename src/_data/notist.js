// From https://github.com/philhawksworth/eleventy-notist-example

const fs = require('fs');
const fetch = require('node-fetch');

const CACHE_FILE_PATH = '_cache/notist.json';

async function fetchNotist() {
  const response = await fetch('https://noti.st/nhoizey.json');
  if (response.ok) {
    const notistData = await response.json();
    if (notistData.data) {
      return notistData.data[0].relationships.data;
    }
    return {};
  }

  return null;
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
  fs.writeFile(CACHE_FILE_PATH, fileContent, err => {
    if (err) throw err;
  })
}

// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH);
    return JSON.parse(cacheFile);
  }

  // no cache found.
  return {};
}

function prepareNotistData(rawData) {
  let talks = {
    future: [],
    past: []
  };

  let now = new Date();
  rawData.map(talk => {
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
  if (process.env.ELEVENTY_ENV === 'production') {
    const newNotistData = await fetchNotist();
    if (newNotistData) {
      writeToCache(newNotistData);
      return prepareNotistData(newNotistData);
    }
  }

  const cachedNotistData = readFromCache();
  return prepareNotistData(cachedNotistData);
}
