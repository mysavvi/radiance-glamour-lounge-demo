/**
 * Neo Design — restore a11y preferences before paint (optional, load in <head>)
 */
(function () {
  try {
    var raw = localStorage.getItem("neo-a11y");
    if (!raw) return;
    var state = JSON.parse(raw);
    if (state.v !== 1) return;
    var html = document.documentElement;
    if (state.textScale != null && state.textScale !== 0) {
      html.setAttribute("data-a11y-text-scale", String(state.textScale));
    }
    if (state.grayscale) html.setAttribute("data-a11y-grayscale", "true");
    if (state.highContrast) html.setAttribute("data-a11y-high-contrast", "true");
    if (state.negativeContrast) html.setAttribute("data-a11y-negative-contrast", "true");
    if (state.lightBg) {
      html.setAttribute("data-neo-theme-original", html.getAttribute("data-neo-theme") || "dark");
      html.setAttribute("data-neo-theme", "light");
      html.setAttribute("data-a11y-light-bg", "true");
    }
    if (state.linksUnderline) html.setAttribute("data-a11y-links-underline", "true");
    if (state.readableFont) html.setAttribute("data-a11y-readable-font", "true");
  } catch (e) { /* ignore */ }
})();
