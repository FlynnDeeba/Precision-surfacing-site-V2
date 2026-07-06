const fs = require("fs");

module.exports = function (eleventyConfig) {
  // Pass static assets straight through to the build output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Watch CSS/JS so the dev server reloads on change
  eleventyConfig.addWatchTarget("src/assets/");

  // Cache-bust an asset URL with its source file's modification time. Filters
  // run on every build (unlike cached data modules), so editing a JS/CSS file
  // changes its mtime → new ?v= → the browser always fetches the fresh file.
  eleventyConfig.addFilter("bust", function (url) {
    try {
      return url + "?v=" + Math.round(fs.statSync("src" + url).mtimeMs);
    } catch (e) {
      return url;
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md"]
  };
};
