/**
 * Neo Design — apply theme before first paint (no flash).
 * Order of precedence: saved user choice -> system setting -> dark default.
 * Load this in <head> BEFORE a11y-init.js.
 */
(function () {
  try {
    var html = document.documentElement;
    var saved = localStorage.getItem("neo-theme");
    if (saved === "light" || saved === "dark") {
      html.setAttribute("data-neo-theme", saved);
    } else if (window.matchMedia) {
      var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      html.setAttribute("data-neo-theme", prefersLight ? "light" : "dark");
    }
  } catch (e) { /* ignore */ }
})();
