const { readFromCache } = require('../_utils/cache');

const NOTIST_CACHE = '_cache/notist.json';

module.exports = async function () {
  return readFromCache(NOTIST_CACHE);
};
