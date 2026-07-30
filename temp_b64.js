/* ../../design/neo/theme-init.js */
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

/* ../../design/neo/a11y-init.js */
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

/* ../../design/neo/scroll-reveal.js */
/**
 * Neo scroll-reveal — progressive-enhancement entrance for grids of cards.
 *
 * Any container marked with `data-neo-reveal` has its direct children faded and
 * lifted into view as they enter the viewport. Children that cross the viewport
 * in the same frame are staggered so a row animates in sequence, not all at once.
 *
 * Honours `prefers-reduced-motion`: when reduced motion is requested, nothing is
 * hidden and no transforms run. Without JS the content is fully visible, so the
 * page degrades gracefully.
 */
(function () {
  "use strict";

  var STAGGER_MS = 70; // within the 50–100ms stagger guidance
  var docEl = document.documentElement;

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Flag JS so the hidden initial state only applies when we can reveal it.
  docEl.classList.add("neo-js-reveal");

  function revealAll() {
    var items = document.querySelectorAll("[data-neo-reveal] > *");
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add("is-revealed");
    });
  }

  function initLedFrames() {
    var frames = document.querySelectorAll(".rb-social-presence__intro-frame");
    if (!frames.length) return;

    function setLedActive(frame, active) {
      frame.classList.toggle("is-led-active", active);
    }

    function frameVisible(frame) {
      var rect = frame.getBoundingClientRect();
      return rect.bottom > -120 && rect.top < window.innerHeight + 120;
    }

    if ("IntersectionObserver" in window) {
      var ledObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            setLedActive(entry.target, entry.isIntersecting);
          });
        },
        { threshold: 0, rootMargin: "120px 0px" }
      );

      Array.prototype.forEach.call(frames, function (frame) {
        if (frameVisible(frame)) setLedActive(frame, true);
        ledObserver.observe(frame);
      });
    } else {
      Array.prototype.forEach.call(frames, function (frame) {
        setLedActive(frame, true);
      });
    }
  }

  function boot() {
    initLedFrames();

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return (
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
            );
          })
          .forEach(function (entry, index) {
            var el = entry.target;
            el.style.setProperty("--neo-reveal-delay", index * STAGGER_MS + "ms");
            el.classList.add("is-revealed");
            observer.unobserve(el);
          });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    var items = document.querySelectorAll("[data-neo-reveal] > *");
    Array.prototype.forEach.call(items, function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
