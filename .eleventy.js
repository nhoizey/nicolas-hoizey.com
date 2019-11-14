module.exports = function (eleventyConfig) {

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  const excerpt = require("./src/_filters/excerpt.js");
  eleventyConfig.addFilter("excerpt", excerpt);

  const permalinkDate = require("./src/_filters/permalinkDate.js");
  eleventyConfig.addFilter("permalinkDate", permalinkDate);

  const attributeDate = require("./src/_filters/attributeDate.js");
  eleventyConfig.addFilter("attributeDate", attributeDate);

  const ordinal = require("./src/_filters/ordinal.js");
  eleventyConfig.addFilter("ordinal", ordinal);

  const moment = require("moment");
  eleventyConfig.addFilter("date", function (date, format) {
    return moment(date).format(format);
  });

  eleventyConfig.addFilter("split", function (string, separator) {
    return string.split(separator);
  });

  // TODO: remove?
  eleventyConfig.addFilter("tags_microformat", function (tags) {
    return tags.replace(/(rel="tag")/, 'rel="tag" class="p-category"');
  });

  // limit filter
  eleventyConfig.addFilter("limit", function (array, limit) {
    return array.slice(0, limit);
  });

  // offset filter
  eleventyConfig.addFilter("offset", function (array, offset) {
    return array.slice(offset);
  });

  const { parse, stringify } = require("flatted/cjs");
  eleventyConfig.addFilter("safeDump", stringify);

  const cheerio = require('cheerio');
  eleventyConfig.addFilter("stripFootnotes", function (content) {
    console.error(content);
    const $ = cheerio.load(content);
    $('a.footnote, a.footnotes, div.footnote, div.footnotes, sup.footnote, sup.footnotes').remove();
    return $.html();
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  eleventyConfig.addNunjucksShortcode("cloudinary", function (preset, image) {
    return `<img src="${image}" />`;
  });

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


  // ------------------------------------------------------------------------
  // Plugins
  // ------------------------------------------------------------------------

  const svgContents = require("eleventy-plugin-svg-contents");
  eleventyConfig.addPlugin(svgContents);

  const respimg = require("eleventy-plugin-respimg");
  eleventyConfig.cloudinaryCloudName = 'nho';
  eleventyConfig.srcsetWidths = [320, 640, 960, 1280, 1600, 1920, 2240, 2560];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.presets = {
    "default": {
      "srcsetMinWidth": 360,
      "srcsetMaxWidth": 1600,
      "fallbackWidth": 800,
      "srcsetSteps": 5,
      "sizes": "(max-width: 67rem) 90vw, 60rem",
      "figure": "always",
      "attributes": {
        "loading": "lazy"
      }
    },
    "twothirds": {
      "srcsetMinWidth": 240,
      "srcsetMaxWidth": 1120,
      "fallbackWidth": 600,
      "srcsetSteps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 67rem) 60vw, 40rem",
      "figure": "always",
      "attributes": {
        "class": "twothirds"
      }
    },
    "onehalf": {
      "srcsetMinWidth": 180,
      "srcsetMaxWidth": 800,
      "fallbackWidth": 400,
      "srcsetSteps": 5,
      "sizes": "(max-width: 67rem) 45vw, 30rem",
      "figure": "always",
      "attributes": {
        "class": "onehalf"
      }
    },
    "onethird": {
      "srcsetMinWidth": 120,
      "srcsetMaxWidth": 560,
      "fallbackWidth": 300,
      "srcsetSteps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem",
      "figure": "always",
      "attributes": {
        "class": "onethird right"
      }
    },
    "onefourth": {
      "srcsetMinWidth": 100,
      "srcsetMaxWidth": 400,
      "fallbackWidth": 200,
      "srcsetSteps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 30rem) 30vw, (max-width: 67rem) 22.5vw, 15rem",
      "figure": "always",
      "attributes": {
        "class": "onefourth right"
      }
    },
    "logo": {
      "srcsetMinWidth": 120,
      "srcsetMaxWidth": 560,
      "fallbackWidth": 300,
      "srcsetSteps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem",
      "figure": "never",
      "attributes": {
        "class": "logo"
      }
    }
  }

  eleventyConfig.addPlugin(respimg);

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
  const slugify = require("@sindresorhus/slugify");
  const markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    level: [2, 3, 4],
    slugify: function (s) {
      return slugify(s);
    }
  };

  const markdownItContainer = require("markdown-it-container");

  eleventyConfig.setLibrary(
    "md",
    markdownIt(markdownItOptions)
      .use(markdownItFootnote)
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItContainer, "info")
  );

  // ------------------------------------------------------------------------
  // Eleventy configuration
  // ------------------------------------------------------------------------

  eleventyConfig
    .addPassthroughCopy("src/assets")
    .addPassthroughCopy("src/.well-known")
    .addPassthroughCopy("src/.htaccess")
    .addPassthroughCopy("src/manifest.webmanifest");

  eleventyConfig.setDataDeepMerge(true);

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
