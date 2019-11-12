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

  eleventyConfig.addFilter("split", function (string, separator) {
    return string.split(separator);
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  eleventyConfig.addNunjucksShortcode("cloudinary", function (preset, image) {
    return `<img src="${image}" />`;
  });

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
  // Markdown
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
    .addPassthroughCopy("src/js")
    .addPassthroughCopy("src/.well-known")
    .addPassthroughCopy("src/.htaccess")
    .addPassthroughCopy("src/manifest.webmanifest");

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
