const fs = require('fs');
const path = require('path');
const download = require('download');

const REMOTE_URL = 'https://data.nicolas-hoizey.com/matomo.js';
const LOCAL_PATH = 'src/assets/javascript/vendors';
const LOCAL_FILE = 'matomo.js';
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

(async () => {
  let getIt = false;
  try {
    const LAST_MOD = fs.statSync(path.join(LOCAL_PATH, LOCAL_FILE)).mtimeMs;
    const AGE_IN_DAYS = (new Date().getTime() - LAST_MOD) / ONE_DAY_IN_MS;
    if (AGE_IN_DAYS > 1) {
      console.log(
        `Local version of Matomo is ${Math.round(AGE_IN_DAYS)} days old`
      );
      getIt = true;
    }
  } catch (err) {
    getIt = true;
  } finally {
    if (getIt) {
      console.log(`Downloading a local copy of Matomo…`);
      try {
        await download(REMOTE_URL, LOCAL_PATH, {timeout: 5000});
      } catch (err) {
        console.error(`Unable to download Matomo: ${err}`);
        // This is not a big issue, we can continue without Matomo
        process.exit(0);
      }
    }
  }
})();
