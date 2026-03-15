const eleventyImg = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/static");
  eleventyConfig.addPassthroughCopy({ "src/assets/static/manifest.json": "manifest.json" });
  eleventyConfig.addPassthroughCopy({ "src/assets/static/robots.txt": "robots.txt" });

  // Watch for image changes
  eleventyConfig.addWatchTarget("src/assets/images/**/*");

  // Image shortcode
  eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw") {
    if (!alt) {
      throw new Error(`Missing alt text for image: ${src}`);
    }

    let metadata = await eleventyImg(`src/assets/images/${src}`, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/",
      urlPath: "/assets/images/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return eleventyImg.generateHTML(metadata, imageAttributes);
  });

  // Featured Image shortcode
  eleventyConfig.addShortcode("featuredImage", function(src, alt, photographer = "", photographerUsername = "") {
    if (!alt) alt = "";
    
    const pathPrefix = this.page && this.page.url ? this.page.url.split('/').slice(0, -1).map(() => '..').join('/') || '.' : '.';
    const imagePath = `${pathPrefix}/assets/images/${src}`;
    
    let html = '<figure class="featured-image">';
    html += `<img src="${imagePath}" alt="${alt}" loading="eager">`;
    
    if (photographer || photographerUsername) {
      html += '<figcaption class="image-credit">';
      html += 'Foto: ';
      if (photographerUsername) {
        html += `<a href="https://unsplash.com/@${photographerUsername}" target="_blank" rel="noopener">${photographer || photographerUsername}</a>`;
      } else {
        html += photographer;
      }
      html += '</figcaption>';
    }
    
    html += '</figure>';
    return html;
  });

  // Year shortcode
  eleventyConfig.addShortcode("year", () => {
    return new Date().getFullYear();
  });

  // Date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // ISO date filter
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  // Limit filter
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // HTML Date String filter
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    pathPrefix: process.env.ELEVENTY_ENV === "production" ? "/internet_mais_segura/" : "/",
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
