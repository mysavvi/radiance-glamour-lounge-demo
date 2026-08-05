/**
 * Full-bleed hero — auto-rotate images with a soft crossfade.
 * Hold each frame, then fade. Pauses off-screen and while scrolling.
 * Respects prefers-reduced-motion (shows the first frame only).
 * Waits for DOM so WordPress inline pastes work even if the script is early.
 */
(function () {
  "use strict";

  function boot() {
    var HOLD_MS = 3200;
    var FADE_MS = 1400;
    var root = document.querySelector("[data-rb-hero-scroll]");
    if (!root) return;

    var sticky = root.querySelector(".rb-hero-scroll__sticky");
    var frames = root.querySelectorAll(".rb-hero-scroll__frame");
    var dots = root.querySelectorAll(".rb-hero-scroll__dot");
    var reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!sticky || !frames.length) return;

    var activeIndex = 0;
    var timer = null;
    var ticking = false;
    var inView = true;
    var scrolling = false;
    var scrollIdleTimer = null;
    var lastNavSolid = null;

    function enabled() {
      return !reducedMotionMq.matches && frames.length > 1;
    }

    function setActive(index) {
      activeIndex = ((index % frames.length) + frames.length) % frames.length;
      frames.forEach(function (frame, i) {
        var on = i === activeIndex;
        frame.classList.toggle("is-active", on);
        frame.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === activeIndex);
      });
    }

    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function canRun() {
      return enabled() && inView && !scrolling && !document.hidden;
    }

    function scheduleNext() {
      clearTimer();
      if (!canRun()) return;
      timer = setTimeout(function () {
        setActive(activeIndex + 1);
        timer = setTimeout(scheduleNext, FADE_MS);
      }, HOLD_MS);
    }

    function stop() {
      clearTimer();
    }

    function start() {
      if (!canRun()) {
        stop();
        return;
      }
      if (timer) return;
      scheduleNext();
    }

    function updateNavState() {
      var html = document.documentElement;
      var embed = document.querySelector("[data-neo-wp-embed], .wp-html-module");
      /* Keep rb-hero-nav-over for the whole homepage so padding never jumps. */
      html.classList.add("rb-hero-nav-over");
      if (embed) embed.classList.add("rb-hero-nav-over");
      var navSolid = sticky.getBoundingClientRect().bottom <= 50;
      if (navSolid === lastNavSolid) return;
      html.classList.toggle("rb-hero-nav-solid", navSolid);
      if (embed) embed.classList.toggle("rb-hero-nav-solid", navSolid);
      lastNavSolid = navSolid;
    }

    function onScroll() {
      scrolling = true;
      stop();
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(function () {
        scrolling = false;
        start();
      }, 180);

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          updateNavState();
        });
      }
    }

    function setMode() {
      var on = enabled();
      root.classList.toggle("is-static", !on);
      root.style.setProperty("--rb-hero-fade-ms", FADE_MS + "ms");
      lastNavSolid = null;
      setActive(0);
      updateNavState();
      stop();
      if (on) start();
    }

    frames.forEach(function (frame, i) {
      frame.classList.toggle("is-active", i === 0);
      frame.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === 0);
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            inView = entry.isIntersecting;
            if (inView) start();
            else stop();
          });
        },
        { threshold: [0, 0.2, 0.5] }
      );
      io.observe(sticky);
    }

    setMode();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateNavState, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    if (reducedMotionMq.addEventListener) {
      reducedMotionMq.addEventListener("change", setMode);
    } else if (reducedMotionMq.addListener) {
      reducedMotionMq.addListener(setMode);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
