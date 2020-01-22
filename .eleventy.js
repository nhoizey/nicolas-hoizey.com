const slugify = require("@sindresorhus/slugify");
const { parse, stringify } = require("flatted/cjs");
const cheerio = require('cheerio');
const path = require('path');
const util = require('util');

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

  eleventyConfig.addCollection("notes", function (collection) {
    return collection.getFilteredByGlob("src/notes/**/*.md")
      .sort((a, b) => {
        return b.date - a.date;
      });;
  });

  eleventyConfig.addCollection("tags", require("./_11ty/getTags"));
  eleventyConfig.addCollection("mainTags", require("./_11ty/getMainTags"));

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  const excerpt = require("./src/_filters/excerpt.js");
  eleventyConfig.addFilter("excerpt", excerpt);

  const dateFormat = require("./src/_filters/dateFormat.js");
  eleventyConfig.addFilter("dateFormat", dateFormat);

  const permalinkDate = require("./src/_filters/permalinkDate.js");
  eleventyConfig.addFilter("permalinkDate", permalinkDate);

  const notePermalinkDate = require("./src/_filters/notePermalinkDate.js");
  eleventyConfig.addFilter("notePermalinkDate", notePermalinkDate);

  const attributeDate = require("./src/_filters/attributeDate.js");
  eleventyConfig.addFilter("attributeDate", attributeDate);

  const cleanDeepLinks = require("./src/_filters/cleanDeepLinks.js");
  eleventyConfig.addFilter("cleanDeepLinks", cleanDeepLinks);

  eleventyConfig.addFilter("slugify", function (string) {
    return slugify(string, {
      decamelize: false,
      customReplacements: [
        ['%', ' ']
      ]
    });
  });

  eleventyConfig.addFilter("split", function (string, separator) {
    return string.split(separator);
  });

  // limit filter
  eleventyConfig.addFilter("limit", function (array, limit) {
    return array.slice(0, limit);
  });

  // offset filter
  eleventyConfig.addFilter("offset", function (array, offset) {
    return array.slice(offset);
  });

  // debug utilities
  eleventyConfig.addFilter("safeDump", stringify);
  eleventyConfig.addFilter("dump", obj => util.inspect(obj));

  eleventyConfig.addFilter("stripFootnotes", function (content) {
    // TODO: Use jsdom?
    const $ = cheerio.load(content);
    $('a.footnote, a.footnotes, div.footnote, div.footnotes, sup.footnote, sup.footnotes').remove();
    return $.html();
  });

  eleventyConfig.addFilter("dirname", function (filePath) {
    return path.dirname(filePath);
  });

  eleventyConfig.addFilter("uniq", function (array) {
    return [...new Set(array)];
  });

  eleventyConfig.addFilter("base64", function (url) {
    return Buffer.from(url).toString('base64');
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
  eleventyConfig.addNunjucksFilter("markdownify", markdownString => md.render(markdownString));

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
    .addPassthroughCopy("src/manifest.webmanifest")
    .addPassthroughCopy("src/sw.js")
    .addPassthroughCopy("src/sw-window.mjs");

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setQuietMode(true);

  // eleventyConfig.addWatchTarget("_data");

  return {
    templateFormats: [
      "md",
      "njk",
      "jpg",
      "png",
      "gif",
      "kmz",
      "zip"
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
