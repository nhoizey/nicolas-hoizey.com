module.exports = function (eleventyConfig) {

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  const excerpt = require("./src/_filters/excerpt.js");
  eleventyConfig.addFilter("excerpt", excerpt);

  const permalinkDate = require("./src/_filters/permalinkDate.js");
  eleventyConfig.addFilter("permalinkDate", permalinkDate);

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
