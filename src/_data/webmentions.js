const { readFromCache } = require('../_utils/cache');

// Define Cache Location and API Endpoint
const WEBMENTION_CACHE = '_cache/webmentions.json';

module.exports = async function () {
  const cached = readFromCache(WEBMENTION_CACHE);
  return cached.webmentions;
};
