/**
 * Neo Design — apply theme before first paint (no flash).
 * Order of precedence: saved user choice -> system setting -> dark default.
 * Load this in <head> BEFORE a11y-init.js.
 */
(function () {
  try {
    var html = document.documentElement;
    var saved = localStorage.getItem("neo-theme");
    var theme = null;
    if (saved === "light" || saved === "dark") {
      theme = saved;
    } else if (window.matchMedia) {
      var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      theme = prefersLight ? "light" : "dark";
    }
    if (theme) {
      html.setAttribute("data-neo-theme", theme);
    }
    
    function syncEmbeds() {
      var t = html.getAttribute("data-neo-theme");
      if (!t) return;
      var embeds = document.querySelectorAll("[data-neo-wp-embed], .wp-html-module");
      Array.prototype.forEach.call(embeds, function (el) {
        el.setAttribute("data-neo-theme", t);
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", syncEmbeds);
    } else {
      syncEmbeds();
    }
  } catch (e) { /* ignore */ }
})();
