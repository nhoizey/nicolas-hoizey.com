const glob = require('fast-glob');

module.exports = function (eleventyConfig) {
  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  eleventyConfig.addCollection('articles', function (collection) {
    return collection.getFilteredByGlob('src/articles/**/*.md').sort((a, b) => {
      return b.date - a.date;
    });
  });

  // promoted articles, but not the latest article at all
  eleventyConfig.addCollection('promoted', function (collection) {
    return collection
      .getFilteredByGlob('src/articles/**/*.md')
      .sort((a, b) => {
        return b.date - a.date;
      })
      .slice(1)
      .filter((article) => article.data.promoted);
  });

  eleventyConfig.addCollection('links', function (collection) {
    return collection.getFilteredByGlob('src/links/**/*.md').sort((a, b) => {
      return b.date - a.date;
    });
  });

  const hashtagsToTags = require('./src/_utils/hashtags').hashtagsToTags;
  eleventyConfig.addCollection('notes', function (collection) {
    return collection
      .getFilteredByGlob('src/notes/**/*.md')
      .map((note) => {
        // TODO: deal with hashtags only once
        note.data.tags = [
          ...new Set(
            [].concat(
              ...note.data.tags,
              ...hashtagsToTags(note.template.frontMatter.content)
            )
          ),
        ];
        note.data.rawContent = note.template.frontMatter.content;
        return note;
      })
      .sort((a, b) => {
        return b.date - a.date;
      });
  });

  const yearsWithContent = require('./src/_utils/content-by-date')
    .yearsWithContent;
  eleventyConfig.addCollection('yearsWithArticles', (collection) => {
    return yearsWithContent(
      collection.getFilteredByGlob('src/articles/**/*.md')
    );
  });
  eleventyConfig.addCollection('yearsWithLinks', (collection) => {
    return yearsWithContent(collection.getFilteredByGlob('src/links/**/*.md'));
  });
  eleventyConfig.addCollection('yearsWithNotes', (collection) => {
    return yearsWithContent(collection.getFilteredByGlob('src/notes/**/*.md'));
  });

  // collections for yearly archives
  const contentsByYear = require('./src/_utils/content-by-date').contentByYear;
  ['articles', 'links', 'notes'].forEach((collectionName) => {
    eleventyConfig.addCollection(`${collectionName}ByYear`, (collection) => {
      return contentsByYear(
        collection.getFilteredByGlob(`src/${collectionName}/**/*.md`)
      );
    });
  });

  // collections for monthly archives
  const contentsByMonth = require('./src/_utils/content-by-date')
    .contentByMonth;
  ['articles', 'links', 'notes'].forEach((collectionName) => {
    eleventyConfig.addCollection(`${collectionName}ByMonth`, (collection) => {
      return contentsByMonth(
        collection.getFilteredByGlob(`src/${collectionName}/**/*.md`)
      );
    });
  });

  eleventyConfig.addCollection('tags', require('./src/_11ty/getTags'));
  eleventyConfig.addCollection('mainTags', require('./src/_11ty/getMainTags'));

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  glob.sync('src/_11ty/filters/*.js').forEach((file) => {
    let filters = require('./' + file);
    Object.keys(filters).forEach((name) => {
      eleventyConfig.addFilter(name, filters[name]);
    });
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  glob.sync('src/_11ty/shortcodes/*.js').forEach((file) => {
    let shortcodes = require('./' + file);
    Object.keys(shortcodes).forEach((name) => {
      eleventyConfig.addNunjucksShortcode(name, shortcodes[name]);
    });
  });

  glob.sync('src/_11ty/pairedShortcodes/*.js').forEach((file) => {
    let pairedShortcodes = require('./' + file);
    Object.keys(pairedShortcodes).forEach((name) => {
      eleventyConfig.addPairedShortcode(name, pairedShortcodes[name]);
    });
  });

  // ------------------------------------------------------------------------
  // Plugins
  // ------------------------------------------------------------------------

  const svgContents = require('eleventy-plugin-svg-contents');
  eleventyConfig.addPlugin(svgContents);

  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  eleventyConfig.addPlugin(syntaxHighlight);

  const rss = require('@11ty/eleventy-plugin-rss');
  eleventyConfig.addPlugin(rss);

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

  const slugify = require('@sindresorhus/slugify');
  const markdownItAnchor = require('markdown-it-anchor');
  const markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: 'deeplink',
    permalinkSymbol: '<svg><use xlink:href="#symbol-link"/></svg>',
    level: [2, 3, 4],
    slugify: function (s) {
      return slugify(s);
    },
  };

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
    .use(markdownItHeadingLevel, { firstLevel: 2 })
    .use(markdownItFootnote)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItAttributes)
    .use(markdownItSpan)
    .use(markdownItAbbr)
    .use(markdownItContainer, 'info');
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
    const imagesResponsiverConfig = require('./src/_data/images-responsiver-config.js');
    eleventyConfig.addPlugin(imagesResponsiver, imagesResponsiverConfig);

    const htmlMinTransform = require('./src/_transforms/html-min-transform.js');
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  eleventyConfig
    .addPassthroughCopy('src/assets')
    .addPassthroughCopy('src/.well-known')
    .addPassthroughCopy('src/.htaccess')
    .addPassthroughCopy('src/manifest.webmanifest');

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addWatchTarget('./src/_includes/generated/critical.css');
  eleventyConfig.addWatchTarget('./src/_includes/generated/critical.js');
  eleventyConfig.addWatchTarget('./dist/css/additional.css');
  eleventyConfig.addWatchTarget('./dist/js/additional.js');

  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    // files: ['src/_includes/generated', 'dist/css', 'dist/js'],
  });

  return {
    templateFormats: ['md', 'njk', 'jpg', 'png', 'gif', 'kmz', 'zip'],

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
      output: 'dist',
    },
  };
};
