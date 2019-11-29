const slugify = require("@sindresorhus/slugify");
const moment = require("moment");
const { parse, stringify } = require("flatted/cjs");
const cheerio = require('cheerio');

module.exports = function (eleventyConfig) {

  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  eleventyConfig.addCollection("articles", function (collection) {
    return collection.getFilteredByGlob("src/articles/**/*.md").sort(function (a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("links", function (collection) {
    return collection.getFilteredByGlob("src/links/**/*.md").sort(function (a, b) {
      return b.date - a.date;
    });;
  });

  eleventyConfig.addCollection("tags", require("./_11ty/getTags"));

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  const excerpt = require("./src/_filters/excerpt.js");
  eleventyConfig.addFilter("excerpt", excerpt);

  const permalinkDate = require("./src/_filters/permalinkDate.js");
  eleventyConfig.addFilter("permalinkDate", permalinkDate);

  const attributeDate = require("./src/_filters/attributeDate.js");
  eleventyConfig.addFilter("attributeDate", attributeDate);

  eleventyConfig.addFilter("slugify", function (string) {
    return slugify(string, {
      decamelize: false,
      customReplacements: [
        ['%', ' ']
      ]
    });
  });

  eleventyConfig.addFilter("date", function (date, format) {
    return moment(date).format(format);
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

  eleventyConfig.addFilter("safeDump", stringify);

  eleventyConfig.addFilter("stripFootnotes", function (content) {
    // TODO: Use jsdom?
    const $ = cheerio.load(content);
    $('a.footnote, a.footnotes, div.footnote, div.footnotes, sup.footnote, sup.footnotes').remove();
    return $.html();
  });

  eleventyConfig.addFilter("mdpath2imgpath", function (inputPath) {
    return inputPath.replace(/[^/]+\.md$/, '');
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

  eleventyConfig.setLibrary(
    "md",
    markdownIt(markdownItOptions)
      .use(markdownItHeadingLevel, { firstLevel: 2 })
      .use(markdownItFootnote)
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItAttributes)
      .use(markdownItAbbr)
      .use(markdownItContainer, "info")
  );

  // ------------------------------------------------------------------------
  // Transforms
  // ------------------------------------------------------------------------

  const cloudinaryTransform = require("./src/transforms/cloudinary-transform.js");
  eleventyConfig.addTransform("cloudinary", cloudinaryTransform);

  const htmlMinTransform = require("./src/transforms/html-min-transform.js");
  eleventyConfig.addTransform("htmlmin", htmlMinTransform);

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  eleventyConfig
    .addPassthroughCopy("src/assets")
    .addPassthroughCopy("src/.well-known")
    .addPassthroughCopy("src/.htaccess")
    .addPassthroughCopy("src/manifest.webmanifest");

  eleventyConfig.setDataDeepMerge(true);

  // eleventyConfig.addWatchTarget("_data");

  // function firstParagraph(source, options) {
  //   let excerpt = '';
  //   let parts = source.content.split("\n");

  //   parts.forEach(part => {
  //     if (part.match(/^[^!>#\{]/) && excerpt === '') {
  //       excerpt = part.trim();
  //     }
  //   });

  //   source.data.excerpt = excerpt;
  // }
  // eleventyConfig.setFrontMatterParsingOptions({
  //   excerpt: firstParagraph
  // });

  return {
    templateFormats: [
      "md",
      "njk",
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
