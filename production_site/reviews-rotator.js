(function () {
  "use strict";

  var root = document.querySelector("[data-rb-review-rotator]");
  if (!root) return;

  var slides = root.querySelectorAll(".rb-reviews__spotlight-slide");
  if (slides.length < 2) return;

  var index = 0;
  var timer = null;
  var interval = 5600;
  var exitDuration = 850;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  function applyMotionPreference() {
    if (reduced.matches) {
      root.classList.add("is-reduced-motion");
      interval = 9000;
      exitDuration = 350;
    } else {
      root.classList.remove("is-reduced-motion");
      interval = 5600;
      exitDuration = 850;
    }
  }

  function clearExit(slide) {
    if (!slide) return;
    slide.classList.remove("is-exiting");
  }

  function goTo(next) {
    var current = slides[index];
    var targetIndex = (next + slides.length) % slides.length;
    if (targetIndex === index) return;

    var nextSlide = slides[targetIndex];
    clearExit(nextSlide);
    current.classList.remove("is-active");
    current.classList.add("is-exiting");
    nextSlide.classList.add("is-active");

    window.setTimeout(function () {
      clearExit(current);
    }, exitDuration);

    index = targetIndex;
  }

  function tick() {
    goTo(index + 1);
  }

  function stop() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    timer = window.setInterval(tick, interval);
  }

  applyMotionPreference();
  start();

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", function (event) {
    if (!root.contains(event.relatedTarget)) start();
  });

  if (typeof reduced.addEventListener === "function") {
    reduced.addEventListener("change", function () {
      applyMotionPreference();
      start();
    });
  } else if (typeof reduced.addListener === "function") {
    reduced.addListener(function () {
      applyMotionPreference();
      start();
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });
})();
