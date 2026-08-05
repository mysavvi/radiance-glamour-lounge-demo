/**
 * Neo Salon — WordPress boot: sync palette/theme, load page scripts.
 * Requires window.NEO_WP = { assetBase, version } in global-head.
 */
(function () {
  "use strict";

  var PAGE_SCRIPTS = {
    home: [
      "neo/scroll-reveal.js",
      "hero-scroll.js",
      "folder-gallery.js",
      "reviews-rotator.js",
      "neo/social-media-card.js"
    ],
    book: ["neo/form-validation.js", "neo/book-form-demo.js"],
    treatments: ["neo/scroll-reveal.js"],
    clinic: ["neo/scroll-reveal.js"],
    contact: ["neo/scroll-reveal.js"],
    reviews: ["neo/scroll-reveal.js"],
    privacy: [],
    terms: []
  };

  function assetUrl(path) {
    var cfg = window.NEO_WP || {};
    var base = (cfg.assetBase || "").replace(/\/$/, "");
    var version = cfg.version ? "?v=" + encodeURIComponent(cfg.version) : "";
    if (path.indexOf("neo/") === 0) {
      return base + "/" + path + version;
    }
    return base + "/" + path + version;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement("script");
      el.src = src;
      el.defer = true;
      el.onload = function () { resolve(); };
      el.onerror = function () { reject(new Error("Failed to load " + src)); };
      document.head.appendChild(el);
    });
  }

  function loadScriptsSequential(paths) {
    var chain = Promise.resolve();
    paths.forEach(function (path) {
      chain = chain.then(function () {
        return loadScript(assetUrl(path));
      });
    });
    return chain;
  }

  function boot() {
    var embed = document.querySelector("[data-neo-wp-embed]");
    if (!embed) return;

    var html = document.documentElement;
    var palette = embed.getAttribute("data-neo-palette");
    var theme = embed.getAttribute("data-neo-theme");
    var extraClass = embed.getAttribute("data-neo-html-class");

    if (palette) html.setAttribute("data-neo-palette", palette);
    if (theme) html.setAttribute("data-neo-theme", theme);
    html.classList.add("js");
    if (extraClass) {
      extraClass.split(/\s+/).forEach(function (cls) {
        if (cls) html.classList.add(cls);
      });
    }
    document.body.classList.add("neo-body");

    var neoPage = embed.getAttribute("data-neo-page") || "";
    var scripts = PAGE_SCRIPTS[neoPage] || [];
    loadScriptsSequential(scripts).catch(function (err) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[neo-wp-boot]", err.message);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
