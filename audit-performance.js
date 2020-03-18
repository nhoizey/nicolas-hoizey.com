const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const NUMBER_OF_RUNS = 5;

async function runLighthouse(urls) {
  let opts = {
    onlyCategories: ["performance"]
  };
  let config = null;
  let resultLog = new ResultLogger();

  // SpeedIndex was much lower on repeat runs if we don’t
  // kill the chrome instance between runs of the same site
  for (let j = 0; j < NUMBER_OF_RUNS; j++) {
    let count = 0;
    let chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
    opts.port = chrome.port;

    for (let url of urls) {
      console.log(`(URL ${++count} of ${urls.length}, run ${j + 1} of ${NUMBER_OF_RUNS}): ${url}`);
      let rawResult = await lighthouse(url, opts, config).then(results => results.lhr);
      resultLog.add(url, rawResult);
    }

    await chrome.kill();
  }

  return resultLog.getFinalSortedResults();
}

class ResultLogger {
  constructor() {
    this.results = {};
  }

  static sortResultData(a, b) {
    if (b.speedIndex === a.speedIndex) {
      return a.lighthouseScore - b.lighthouseScore;
    }
    return a.speedIndex - b.speedIndex
  }


  add(url, rawResult) {
    if (!this.results[url]) {
      this.results[url] = [];
    }
    this.results[url].push(this.mapResult(rawResult));
  }

  mapResult(result) {
    if (result.requestedUrl.startsWith("https://github.com/")) {
      return {
        url: result.requestedUrl
      };
    }

    return {
      url: result.requestedUrl,
      finalUrl: result.finalUrl,
      lighthouseScore: result.categories.performance.score,
      firstContentfulPaint: result.audits['first-contentful-paint'].numericValue,
      firstMeaningfulPaint: result.audits['first-meaningful-paint'].numericValue,
      speedIndex: result.audits['speed-index'].numericValue,
    };
  }

  getMedianResultForUrl(url) {
    if (this.results[url] && this.results[url].length) {
      // Log all runs
      // console.log( this.results[url] );
      return this.results[url].filter(() => true).sort(ResultLogger.sortResultData)[Math.floor(this.results[url].length / 2)];
    }
  }

  getFinalSortedResults() {
    let finalResults = [];
    for (let url in this.results) {
      finalResults.push(this.getMedianResultForUrl(url));
    }
    finalResults.sort(ResultLogger.sortResultData).map((entry, index) => {
      entry.rank = index + 1;
      return entry;
    });

    return finalResults;
  }
}

(async () => {
  let urls = [
    'https://nicolas-hoizey.com',
    'https://nicolas-hoizey.com/articles/',
    'https://nicolas-hoizey.com/articles/2018/08/01/using-cloudinary-s-fetch-api-to-convert-an-animated-gif-to-a-video/',
    'https://nicolas-hoizey.com/links/',
    'https://nicolas-hoizey.com/links/2020/01/29/humans-can-t-read-urls-how-can-we-fix-it/'
  ];

  console.log(`Testing ${urls.length} URLs:`);

  let results = await runLighthouse(urls);
  fs.writeFileSync("./src/_data/performance.json", JSON.stringify(results, null, 2));
  fs.writeFileSync("./src/_data/performanceMeta.json", JSON.stringify({
    generated: Date.now()
  }, null, 2));

  console.log(results);
})();
