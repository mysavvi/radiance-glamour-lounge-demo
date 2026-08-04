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
