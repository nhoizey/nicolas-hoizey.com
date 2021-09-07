const glob = require('fast-glob');
const path = require('path');
const config = require('./pack11ty.config.js');

module.exports = function (eleventyConfig) {
  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  glob
    .sync(path.join(config.dir.src, '_11ty/collections/*.js'))
    .forEach((file) => {
      let collection = require('./' + file);
      Object.keys(collection).forEach((name) => {
        eleventyConfig.addCollection(name, collection[name]);
      });
    });

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  glob.sync(path.join(config.dir.src, '_11ty/filters/*.js')).forEach((file) => {
    let filters = require('./' + file);
    Object.keys(filters).forEach((name) => {
      eleventyConfig.addFilter(name, filters[name]);
    });
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  glob
    .sync(path.join(config.dir.src, '_11ty/shortcodes/*.js'))
    .forEach((file) => {
      let shortcodes = require('./' + file);
      Object.keys(shortcodes).forEach((name) => {
        eleventyConfig.addNunjucksShortcode(name, shortcodes[name]);
      });
    });

  glob
    .sync(path.join(config.dir.src, '_11ty/pairedShortcodes/*.js'))
    .forEach((file) => {
      let pairedShortcodes = require('./' + file);
      Object.keys(pairedShortcodes).forEach((name) => {
        eleventyConfig.addPairedShortcode(name, pairedShortcodes[name]);
      });
    });

  // ------------------------------------------------------------------------
  // Plugins
  // ------------------------------------------------------------------------

  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  eleventyConfig.addPlugin(syntaxHighlight);

  const rss = require('@11ty/eleventy-plugin-rss');
  eleventyConfig.addPlugin(rss);

  const embedTweets = require('eleventy-plugin-embed-tweet');
  eleventyConfig.addPlugin(embedTweets, {
    cacheDirectory: '_cache',
    useInlineStyles: false,
    autoEmbed: true,
  });

  const embedEverythingElse = require('eleventy-plugin-embed-everything');
  eleventyConfig.addPlugin(embedEverythingElse, {
    youtube: {
      options: {
        lite: {
          css: {
            path: '/assets/javascript/vendors/yt-lite/lite-yt-embed.css',
          },
          js: {
            path: '/assets/javascript/vendors/yt-lite/lite-yt-embed.js',
          },
        },
      },
    },
  });

  eleventyConfig.addPlugin(require('eleventy-plugin-link_to'));

  // ------------------------------------------------------------------------
  // Markdown plugins
  // ------------------------------------------------------------------------

  const markdownIt = require('markdown-it');
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownItFootnote = require('markdown-it-footnote');

  const markdownItAnchor = require('markdown-it-anchor');
  const slugify = require('@sindresorhus/slugify');
  const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
    class: 'deeplink',
    symbol:
      '<svg class="icon" role="img" focusable="false" viewBox="0 0 24 24" width="1em" height="1em"><use xlink:href="#symbol-anchor" /></svg>',
    style: 'visually-hidden',
    visuallyHiddenClass: 'visually-hidden',
    assistiveText: (title) => `Permalink to heading ${title}`,
  });
  const markdownItAnchorOptions = {
    level: [2, 3, 4],
    slugify,
    permalink(slug, opts, state, idx) {
      state.tokens.splice(
        idx,
        0,
        Object.assign(new state.Token('div_open', 'div', 1), {
          attrs: [['class', 'heading-wrapper']],
          block: true,
        })
      );

      state.tokens.splice(
        idx + 4,
        0,
        Object.assign(new state.Token('div_close', 'div', -1), {
          block: true,
        })
      );

      linkAfterHeader(slug, opts, state, idx + 1);
    },
  };
  // const markdownItAnchorOptions = {
  //   level: [2, 3, 4],
  //   slugify: function (s) {
  //     return slugify(s);
  //   },
  //   permalink: markdownItAnchor.permalink.linkAfterHeader({
  //     class: 'deeplink',
  //     symbol:
  //       '<svg class="icon" role="img" focusable="false" viewBox="0 0 24 24" width="1em" height="1em"><use xlink:href="#symbol-anchor" /></svg>',
  //     style: 'visually-hidden',
  //     visuallyHiddenClass: 'visually-hidden',
  //     assistiveText: (title) => `Permalink to heading ${title}`,
  //   }),
  // };

  const markdownItAttributes = require('markdown-it-attrs');

  const markdownItSpan = require('markdown-it-bracketed-spans');

  const markdownItContainer = require('markdown-it-container');

  const markdownItAbbr = require('markdown-it-abbr');

  // taken from https://gist.github.com/rodneyrehm/4feec9af8a8635f7de7cb1754f146a39
  function getHeadingLevel(tagName) {
    if (tagName[0].toLowerCase() === 'h') {
      tagName = tagName.slice(1);
    }

    return parseInt(tagName, 10);
  }

  function markdownItHeadingLevel(md, options) {
    var firstLevel = options.firstLevel;

    if (typeof firstLevel === 'string') {
      firstLevel = getHeadingLevel(firstLevel);
    }

    if (!firstLevel || isNaN(firstLevel)) {
      return;
    }

    var levelOffset = firstLevel - 1;
    if (levelOffset < 1 || levelOffset > 6) {
      return;
    }

    md.core.ruler.push('adjust-heading-levels', function (state) {
      var tokens = state.tokens;
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type !== 'heading_close') {
          continue;
        }

        var headingOpen = tokens[i - 2];
        var headingClose = tokens[i];

        var currentLevel = getHeadingLevel(headingOpen.tag);
        var tagName = 'h' + Math.min(currentLevel + levelOffset, 6);

        headingOpen.tag = tagName;
        headingClose.tag = tagName;
      }
    });
  }

  const md = markdownIt(markdownItOptions)
    // .disable('code')
    .use(markdownItHeadingLevel, { firstLevel: 2 })
    .use(markdownItFootnote)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItAttributes)
    .use(markdownItSpan)
    .use(markdownItAbbr)
    .use(markdownItContainer, 'lead') // Chapô in French
    .use(markdownItContainer, 'info')
    .use(markdownItContainer, 'success')
    .use(markdownItContainer, 'warning')
    .use(markdownItContainer, 'error');
  eleventyConfig.setLibrary('md', md);

  // Add markdownify filter with Markdown-it configuration
  eleventyConfig.addFilter('markdownify', (markdownString) =>
    md.render(markdownString)
  );

  // ------------------------------------------------------------------------
  // Transforms
  // ------------------------------------------------------------------------

  if (process.env.NODE_ENV === 'production') {
    const imagesResponsiver = require('eleventy-plugin-images-responsiver');
    const imagesResponsiverConfig = require(path.join(
      __dirname,
      config.dir.src,
      '_11ty/images-responsiver-config.js'
    ));
    eleventyConfig.addPlugin(imagesResponsiver, imagesResponsiverConfig);

    // const htmlMinTransform = require(path.join(
    //   __dirname,
    //   config.dir.src,
    //   '_transforms/html-min-transform.js'
    // ));
    // eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  // https://github.com/11ty/eleventy/issues/893#issuecomment-606260541
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('_site/js/');
  eleventyConfig.addWatchTarget('_site/css/');

  eleventyConfig
    .addPassthroughCopy(
      path.join(config.dir.src, '**/*.{jpg,png,gif,svg,kmz,zip,css}')
    )
    .addPassthroughCopy(path.join(config.dir.src, 'assets'))
    .addPassthroughCopy(path.join(config.dir.src, '.well-known'))
    .addPassthroughCopy(path.join(config.dir.src, '.htaccess'))
    .addPassthroughCopy(path.join(config.dir.src, '_headers'))
    .addPassthroughCopy(path.join(config.dir.src, 'opensearch.xml'))
    .addPassthroughCopy(path.join(config.dir.src, 'manifest.webmanifest'));

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setQuietMode(true);

  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    files: ['_site/css/*.css', '_site/js/*.js'],
    open: true,
    browser: 'firefox',
  });

  return {
    templateFormats: ['md', 'njk'],

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      output: config.dir.dist,
      input: config.dir.src,
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
  };
};
