module.exports = function (eleventyConfig) {

  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  eleventyConfig.addCollection("articles", function (collection) {
    return collection.getFilteredByGlob("src/articles/**/*.md")
      .sort((a, b) => {
        return b.date - a.date;
      });
  });

  // promoted articles, but not the latest article at all
  eleventyConfig.addCollection("promoted", function (collection) {
    return collection.getFilteredByGlob("src/articles/**/*.md")
      .sort((a, b) => {
        return b.date - a.date;
      })
      .slice(1)
      .filter((article) => article.data.promoted);
  });

  eleventyConfig.addCollection("links", function (collection) {
    return collection.getFilteredByGlob("src/links/**/*.md")
      .sort((a, b) => {
        return b.date - a.date;
      });;
  });

  const hashtagsToTags = require("./src/_utils/hashtags").hashtagsToTags;
  eleventyConfig.addCollection("notes", function (collection) {
    return collection.getFilteredByGlob("src/notes/**/*.md")
      .map(note => {
        // TODO: deal with hashtags only once
        note.data.tags = [...new Set([].concat(...note.data.tags, ...hashtagsToTags(note.template.frontMatter.content)))];
        note.data.rawContent = note.template.frontMatter.content;
        return note;
      })
      .sort((a, b) => {
        return b.date - a.date;
      });
  });

  const yearsWithContent = require("./src/_utils/content-by-date").yearsWithContent;
  eleventyConfig.addCollection(
    "yearsWithArticles", collection => {
      return yearsWithContent(collection.getFilteredByGlob("src/articles/**/*.md"));
    }
  );
  eleventyConfig.addCollection(
    "yearsWithLinks", collection => {
      return yearsWithContent(collection.getFilteredByGlob("src/links/**/*.md"));
    }
  );
  eleventyConfig.addCollection(
    "yearsWithNotes", collection => {
      return yearsWithContent(collection.getFilteredByGlob("src/notes/**/*.md"));
    }
  );

  // collections for yearly archives
  const contentsByYear = require("./src/_utils/content-by-date").contentByYear;
  ['articles', 'links', 'notes'].forEach(collectionName => {
    eleventyConfig.addCollection(
      `${collectionName}ByYear`, collection => {
        return contentsByYear(collection.getFilteredByGlob(`src/${collectionName}/**/*.md`));
      }
    );
  })

  // collections for monthly archives
  const contentsByMonth = require("./src/_utils/content-by-date").contentByMonth;
  ['articles', 'links', 'notes'].forEach(collectionName => {
    eleventyConfig.addCollection(
      `${collectionName}ByMonth`, collection => {
        return contentsByMonth(collection.getFilteredByGlob(`src/${collectionName}/**/*.md`));
      }
    );
  })

  eleventyConfig.addCollection("tags", require("./src/_11ty/getTags"));
  eleventyConfig.addCollection("mainTags", require("./src/_11ty/getMainTags"));

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  const filters = require('./src/_11ty/filters')
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  eleventyConfig.addNunjucksShortcode("youtube", function (id) {
    return `<figure class="video"><iframe width="784" height="441" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`;
  });

  eleventyConfig.addNunjucksShortcode("vimeo", function (id) {
    return `<figure class="video"><iframe width="784" height="441" src="https://player.vimeo.com/video/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`;
  });

  eleventyConfig.addNunjucksShortcode("caniuse", function (id) {
    return `<figure><img src="https://caniuse.bitsofco.de/image/${id}.png" alt="Browser support for feature “${id}“" width="800" /><figcaption><a href="https://caniuse.com/#feat=${id}">Can I Use ${id}?</a></figcaption></figure>`;
  });

  eleventyConfig.addNunjucksShortcode("giphy", function (id) {
    const cloudinaryPrefix = "https://res.cloudinary.com/nho/image/fetch";
    const giphyImage = `https://media.giphy.com/media/${id}/giphy.gif`;
    webmSource = `<source src="${cloudinaryPrefix}/f_webm/${giphyImage}" type="video/webm">`;
    mp4Source = `<source src="${cloudinaryPrefix}/f_mp4/${giphyImage}" type="video/mp4">`;
    posterUrl = `${cloudinaryPrefix}/f_jpg/${giphyImage}`;
    fallback = `<p>Your browser doesn't support video. See <a href="${giphyImage}">the animated GIF</a>.</p>`;
    // videoTag = "<video controls loop muted playsinline preload=\"auto\" crossorigin=\"anonymous\" poster=\"#{posterUrl}\">#{webmSource}#{mp4Source}#{fallback}</video>"
    videoTag = `<video controls loop muted playsinline preload="auto" crossorigin="anonymous">${webmSource}${mp4Source}${fallback}</video>`;

    return `<div class="giphy">${videoTag}</div>`;
  });

  const getShareImage = require('@jlengstorf/get-share-image').default;
  eleventyConfig.addNunjucksShortcode('ogImage', (title) => {
    return title ? getShareImage({
      imageWidth: 1200,
      imageHeight: 630,
      cloudName: 'nho',
      imagePublicID: 'resources/opengraph-background',
      titleFont: 'Noto Serif',
      textAreaWidth: 1100,
      textLeftOffset: 50,
      titleBottomOffset: 330,
      titleFontSize: 50 + Math.max(0, 30 - title.length),
      title: title
    }) : '';
  });

  eleventyConfig.addPairedShortcode("markdown", (content, inline = null) => {
    return inline
      ? markdownIt.renderInline(content)
      : markdownIt.render(content);
  });

  // ------------------------------------------------------------------------
  // Plugins
  // ------------------------------------------------------------------------

  const svgContents = require("eleventy-plugin-svg-contents");
  eleventyConfig.addPlugin(svgContents);

  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  const rss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(rss);

  // ------------------------------------------------------------------------
  // Markdown plugins
  // ------------------------------------------------------------------------

  const markdownIt = require("markdown-it");
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };

  const markdownItFootnote = require("markdown-it-footnote");

  const slugify = require("@sindresorhus/slugify");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: 'deeplink',
    permalinkSymbol: '<svg><use xlink:href="#symbol-link"/></svg>',
    level: [2, 3, 4],
    slugify: function (s) {
      return slugify(s);
    }
  };

  const markdownItAttributes = require("markdown-it-attrs");

  const markdownItSpan = require("markdown-it-bracketed-spans");

  const markdownItContainer = require("markdown-it-container");

  const markdownItAbbr = require("markdown-it-abbr");

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

    md.core.ruler.push("adjust-heading-levels", function (state) {
      var tokens = state.tokens
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type !== "heading_close") {
          continue
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
    .use(markdownItContainer, "info");
  eleventyConfig.setLibrary("md", md);

  // Add markdownify filter with Markdown-it configuration
  eleventyConfig.addFilter("markdownify", markdownString => md.render(markdownString));

  // ------------------------------------------------------------------------
  // Transforms
  // ------------------------------------------------------------------------

  if (process.env.ELEVENTY_ENV == "production") {
    const cloudinaryTransform = require("./src/_transforms/cloudinary-transform.js");
    eleventyConfig.addTransform("cloudinary", cloudinaryTransform);

    const htmlMinTransform = require("./src/_transforms/html-min-transform.js");
    eleventyConfig.addTransform("htmlmin", htmlMinTransform);
  }

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  eleventyConfig
    .addPassthroughCopy("src/assets")
    .addPassthroughCopy("src/.well-known")
    .addPassthroughCopy("src/.htaccess")
    .addPassthroughCopy("src/manifest.webmanifest");

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addWatchTarget("src/_assets/sass/**/*.scss");

  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "jpg",
      "png",
      "gif",
      "kmz",
      "zip",
      "scss"
    ],

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "dist"
    }
  };
};
