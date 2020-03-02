const path = require('path');

const BUILD_DIR = 'dist';

module.exports = {
  globDirectory: BUILD_DIR,
  globPatterns: [
    './index.html',
    './js/*.js',
    './css/*.css',
    './offline.html',
    './offline-fallback.html'
  ],
  swSrc: path.join(BUILD_DIR, 'sw.js'),
  swDest: path.join(BUILD_DIR, 'sw.js'),
  mode: "production"
};
