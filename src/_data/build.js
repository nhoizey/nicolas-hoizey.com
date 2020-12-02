const eleventyPkg = require('@11ty/eleventy/package.json');

const timestamp = new Date();

module.exports = {
  env: process.env.NODE_ENV,
  timestamp: timestamp,
  id: timestamp.valueOf(),
  version: eleventyPkg.version,
};
