
/* hero-scroll.js?v=19 */
/**
 * Full-bleed hero — auto-rotate images with a soft crossfade.
 * Hold each frame, then fade. Pauses off-screen and while scrolling.
 * Respects prefers-reduced-motion (shows the first frame only).
 */
(function () {
  "use strict";

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
    /* Keep rb-hero-nav-over for the whole homepage so padding never jumps. */
    html.classList.add("rb-hero-nav-over");
    var navSolid = sticky.getBoundingClientRect().bottom <= 12;
    if (navSolid === lastNavSolid) return;
    html.classList.toggle("rb-hero-nav-solid", navSolid);
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
          inView = entry.isIntersecting && entry.intersectionRatio > 0.2;
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
})();

/* folder-gallery.js?v=9 */
/**
 * Interactive folder gallery — vanilla port of the folder stack UI.
 */
(function () {
  "use strict";

  var root = document.querySelector("[data-rb-folder-gallery]");
  if (!root) return;

  var stage = root.querySelector(".rb-folder-gallery__stage");
  var front = root.querySelector(".rb-folder-gallery__front");
  var closeBtn = root.querySelector(".rb-folder-gallery__close");
  var backdrop = root.querySelector(".rb-folder-gallery__backdrop");
  var photosWrap = root.querySelector(".rb-folder-gallery__photos");
  var photos = root.querySelectorAll(".rb-folder-gallery__photo");
  var center = (photos.length - 1) / 2;
  var maxOffset = Math.max(center, photos.length - 1 - center);

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileMq = window.matchMedia("(max-width: 767px)");
  var MOBILE_AUTO_MS = 2000;
  var open = false;
  var hover = false;
  var mobileFocus = Math.round(center);
  var mobileAutoTimer = null;

  function isMobileView() {
    return mobileMq.matches;
  }

  function stopMobileAuto() {
    if (mobileAutoTimer) {
      clearInterval(mobileAutoTimer);
      mobileAutoTimer = null;
    }
  }

  function startMobileAuto() {
    stopMobileAuto();
    if (!open || !isMobileView() || reducedMotion) return;
    mobileAutoTimer = setInterval(function () {
      if (!open || !isMobileView()) {
        stopMobileAuto();
        return;
      }
      var next = mobileFocus >= photos.length - 1 ? 0 : mobileFocus + 1;
      focusPhoto(next);
    }, MOBILE_AUTO_MS);
  }

  function measureWidth() {
    if (open) return window.innerWidth;
    if (stage) return stage.clientWidth;
    return 400;
  }

  function metrics() {
    var stageW = measureWidth();
    var mobileView = isMobileView();
    var narrow = mobileView || stageW < 520;
    var mobileOpen = open && mobileView;
    var photoW;
    var photoH;
    var openSpread;

    if (mobileOpen) {
      photoW = Math.min(300, Math.max(220, Math.round(stageW * 0.78)));
      photoH = Math.round(photoW * 1.2);
      openSpread = 28;
    } else if (open) {
      photoW = 224;
      photoH = 288;
      openSpread = maxOffset > 0 ? (Math.min(stageW, 420) - photoW) / maxOffset : 0;
      openSpread = Math.max(46, Math.min(140, openSpread));
    } else if (narrow) {
      photoW = mobileView ? 152 : 168;
      photoH = mobileView ? 196 : 218;
      openSpread = Math.min(118, Math.max(46, (Math.min(stageW, 400) - photoW) * 0.24));
    } else {
      photoW = 224;
      photoH = 288;
      openSpread = Math.min(118, Math.max(46, (stageW - photoW) * 0.24));
    }

    return {
      stageW: stageW,
      narrow: narrow,
      mobileView: mobileView,
      mobileOpen: mobileOpen,
      photoW: photoW,
      photoH: photoH,
      openSpread: openSpread,
    };
  }

  function applyMetrics() {
    var m = metrics();
    root.classList.toggle("is-narrow", m.narrow);
    root.classList.toggle("is-mobile", m.mobileView);
    root.classList.toggle("is-mobile-open", m.mobileOpen);
    root.style.setProperty("--fg-photo-w", m.photoW + "px");
    root.style.setProperty("--fg-photo-h", m.photoH + "px");
    return m;
  }

  function clearFocus() {
    photos.forEach(function (photo) {
      photo.classList.remove("is-focused");
    });
  }

  function focusPhoto(index) {
    mobileFocus = Math.max(0, Math.min(photos.length - 1, index));
    clearFocus();
    photos[mobileFocus].classList.add("is-focused");
    setLayout();
  }

  function setLayout() {
    var m = applyMetrics();
    var focusIdx = mobileFocus;

    photos.forEach(function (photo, i) {
      var offset = i - center;
      var y;
      var x;
      var rot;
      var scale;
      var z;
      var focused = open && photo.classList.contains("is-focused");
      var deckOffset = i - focusIdx;

      if (open && m.mobileOpen) {
        if (focused) {
          y = -12;
          x = 0;
          rot = 0;
          scale = 1;
          z = 120;
        } else if (Math.abs(deckOffset) === 1) {
          y = -6;
          x = deckOffset * m.openSpread;
          rot = deckOffset * 3;
          scale = 0.9;
          z = deckOffset > 0 ? 80 : 70;
        } else {
          y = 0;
          x = deckOffset * 8;
          rot = 0;
          scale = 0.82;
          z = 40 + i;
        }
      } else if (open && focused) {
        y = m.narrow ? -32 : -48;
        x = offset * m.openSpread;
        rot = 0;
        scale = 1.04;
        z = 120;
      } else if (open) {
        y = m.narrow ? -20 : -32;
        x = offset * m.openSpread;
        rot = 0;
        scale = 1;
        z = 50 + i;
      } else if (hover) {
        y = offset * -10 - 40;
        x = offset * (m.mobileView ? 12 : m.narrow ? 18 : 30);
        rot = offset * 8;
        scale = 1 - Math.abs(offset) * 0.03;
        z = i + 10;
      } else {
        y = offset * -8 - 28;
        x = offset * (m.mobileView ? 9 : m.narrow ? 14 : 22);
        rot = offset * (m.mobileView ? 4 : m.narrow ? 6 : 5);
        scale = 1 - Math.abs(offset) * 0.03;
        z = i + 10;
      }

      photo.style.setProperty("--fg-x", x + "px");
      photo.style.setProperty("--fg-y", y + "px");
      photo.style.setProperty("--fg-rot", rot + "deg");
      photo.style.setProperty("--fg-scale", String(scale));
      photo.style.zIndex = String(z);
      photo.classList.toggle("is-deck-hidden", open && m.mobileOpen && Math.abs(deckOffset) > 1 && !focused);
      if (!photo.classList.contains("is-dragging")) {
        photo.style.removeProperty("--drag-y");
      }
    });

    root.classList.toggle("is-open", open);
    root.classList.toggle("is-hover", hover && !open);

    if (front) front.setAttribute("aria-expanded", open ? "true" : "false");
    if (photosWrap) photosWrap.setAttribute("aria-hidden", open ? "false" : "true");
    if (backdrop) backdrop.hidden = !open;
    if (closeBtn) closeBtn.hidden = !open;
    document.documentElement.classList.toggle("rb-gallery-open", open);
  }

  function openGallery() {
    if (open || reducedMotion) return;
    open = true;
    hover = false;
    mobileFocus = Math.round(center);
    clearFocus();
    if (isMobileView()) {
      photos[mobileFocus].classList.add("is-focused");
    }
    setLayout();
    requestAnimationFrame(function () {
      setLayout();
      startMobileAuto();
    });
  }

  function closeGallery() {
    if (!open) return;
    open = false;
    hover = false;
    stopMobileAuto();
    photos.forEach(function (photo) {
      photo.classList.remove("is-dragging", "is-focused", "is-deck-hidden");
    });
    setLayout();
  }

  if (reducedMotion) {
    root.classList.add("is-static");
    return;
  }

  if (front) {
    front.addEventListener("mouseenter", function () {
      if (!open && !isMobileView()) {
        hover = true;
        setLayout();
      }
    });
    front.addEventListener("mouseleave", function () {
      hover = false;
      setLayout();
    });
    front.addEventListener("click", function (event) {
      event.stopPropagation();
      openGallery();
    });
    front.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGallery();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      closeGallery();
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeGallery);

  if (stage) {
    stage.addEventListener("click", function (event) {
      if (event.target.closest(".rb-folder-gallery__close")) return;
      if (!open) {
        openGallery();
        return;
      }
      if (event.target.closest(".rb-folder-gallery__photo")) return;
      closeGallery();
    });
  }

  root.querySelectorAll(".rb-folder-gallery__photo-btn").forEach(function (link) {
    link.addEventListener("click", closeGallery);
  });

  if (photosWrap) {
    photosWrap.addEventListener("mouseleave", function () {
      if (!open || isMobileView()) return;
      clearFocus();
      setLayout();
    });
  }

  photos.forEach(function (photo, index) {
    var startX = 0;
    var startY = 0;
    var dragging = false;

    photo.addEventListener("mouseenter", function () {
      if (!open || dragging || isMobileView()) return;
      clearFocus();
      photo.classList.add("is-focused");
      setLayout();
    });

    photo.addEventListener("click", function (event) {
      if (!open) return;
      if (event.target.closest("a")) return;
      event.stopPropagation();
      if (isMobileView()) {
        if (photo.classList.contains("is-focused")) return;
        focusPhoto(index);
        return;
      }
      var wasFocused = photo.classList.contains("is-focused");
      clearFocus();
      if (!wasFocused) {
        photo.classList.add("is-focused");
        setLayout();
      }
    });

    photo.addEventListener("pointerdown", function (event) {
      if (!open) return;
      if (event.target.closest("a")) return;
      event.preventDefault();
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      photo.setPointerCapture(event.pointerId);
      photo.classList.add("is-dragging");
      if (!isMobileView()) clearFocus();
    });

    photo.addEventListener("pointermove", function (event) {
      if (!dragging || !open) return;
      var dx = event.clientX - startX;
      var dy = Math.max(0, event.clientY - startY);

      if (isMobileView() && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        photo.style.setProperty("--fg-x", dx + "px");
        return;
      }

      photo.style.setProperty("--drag-y", dy + "px");
      if (dy > 0) {
        photo.style.setProperty("--fg-rot", "5deg");
        photo.style.setProperty("--fg-scale", "1.06");
      }
    });

    function endDrag(event) {
      if (!dragging) return;
      dragging = false;
      photo.classList.remove("is-dragging");
      var dx = event.clientX - startX;
      var dy = Math.max(0, event.clientY - startY);
      photo.style.removeProperty("--drag-y");

      if (isMobileView() && Math.abs(dx) > 48 && Math.abs(dx) > dy) {
        if (dx < 0 && mobileFocus < photos.length - 1) focusPhoto(mobileFocus + 1);
        else if (dx > 0 && mobileFocus > 0) focusPhoto(mobileFocus - 1);
        else setLayout();
        return;
      }

      if (dy > 80) closeGallery();
      else setLayout();
    }

    photo.addEventListener("pointerup", endDrag);
    photo.addEventListener("pointercancel", endDrag);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && open) closeGallery();
  });

  if (mobileMq.addEventListener) {
    mobileMq.addEventListener("change", function () {
      if (!isMobileView()) stopMobileAuto();
      else if (open) startMobileAuto();
      if (open || hover) setLayout();
      else applyMetrics();
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopMobileAuto();
    else if (open && isMobileView()) startMobileAuto();
  });

  window.addEventListener("resize", function () {
    if (open || hover) setLayout();
    else applyMetrics();
  });

  setLayout();
})();

/* reviews-rotator.js?v=1 */
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

/* ../../design/neo/social-media-card.js?v=9 */
/**
 * Neo Social Media Card — TikTok Live-style section.
 * Loads social-media-card.json (or data-neo-social-card-src) and hydrates links,
 * media, copy, reviews, and live motion.
 */
(function () {
  "use strict";

  var HEART_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.2-4.6-9.6-8.8C.6 9.2 2.2 6 5.4 5.2c2.2-.6 4.4.2 5.8 1.8 1.4-1.6 3.6-2.4 5.8-1.8 3.2.8 4.8 4 3 7-2.4 4.2-9.6 8.8-9.6 8.8z"/></svg>';

  var LIKE_COLORS = ["#fe2c55", "#ff5c7a", "#ff7eb3"];

  var GIFT_TYPES = [
    { emoji: "❤️", label: "Heart", glow: "#fe2c55", large: false, weight: 5 },
    { emoji: "💖", label: "Love", glow: "#ff4d8d", large: false, weight: 4 },
    { emoji: "💋", label: "Kiss", glow: "#ff3d6e", large: false, weight: 4 },
    { emoji: "🌹", label: "Rose", glow: "#e91e63", large: true, weight: 4 },
    { emoji: "🌸", label: "Flowers", glow: "#f48fb1", large: true, weight: 3 },
    { emoji: "✨", label: "Sparkle", glow: "#ffd54f", large: false, weight: 4 },
    { emoji: "💐", label: "Bouquet", glow: "#ec407a", large: true, weight: 2 },
    { emoji: "👑", label: "Crown", glow: "#ffb300", large: true, weight: 2 },
    { emoji: "🎁", label: "Gift", glow: "#ab47bc", large: true, weight: 2 },
    { emoji: "🔥", label: "Fire", glow: "#ff6d00", large: false, weight: 3 },
  ];

  var SOCIAL_KEYS = ["tiktok", "instagram", "facebook", "linkedin", "youtube", "googleReview"];

  var section = document.querySelector("[data-neo-social-card]");
  if (!section) return;

  var card = section.querySelector(".neo-social-card, .rb-social-live");
  if (!card) return;

  var likeLane = card.querySelector("[data-neo-social-likes], [data-rb-social-live-likes]");
  var giftLane = card.querySelector("[data-neo-social-gifts], [data-rb-social-live-gifts]");
  var toastStage = card.querySelector("[data-neo-social-toast], [data-rb-social-live-toast]");
  var chatList = card.querySelector("[data-neo-social-chat], [data-rb-social-live-chat]");
  var heartBtn = card.querySelector("[data-neo-social-heart], [data-rb-social-heart]");
  var heartCountEl = card.querySelector("[data-neo-social-heart-count], [data-rb-social-heart-count]");
  var viewersEl = card.querySelector("[data-neo-social-viewers], [data-rb-social-viewers]");
  var railActions = card.querySelectorAll("[data-neo-rail-touch], [data-rb-rail-touch]");
  if (!likeLane || !giftLane) return;

  var fallbackReviews = [
    { name: "Alex", text: "Beautiful results and a really welcoming team." },
    { name: "Sam", text: "Professional service from start to finish." },
    { name: "Jordan", text: "Already booked my next appointment." },
  ];

  var clientReviews = fallbackReviews.slice();
  var giftPool = [];
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var likeTimer = null;
  var giftTimer = null;
  var chatTimer = null;
  var viewerTimer = null;
  var railTimer = null;
  var maxLikes = 7;
  var maxGifts = 5;
  var maxChatVisible = 4;
  var chatInterval = 2800;
  var chatIndex = 0;
  var heartCount = 128;
  var viewers = 248;
  var running = false;
  var sectionVisible = false;
  var scrollIdleTimer = null;
  var motionPausedByScroll = false;
  var compactMode = !!section.querySelector(".rb-social-presence__card-slot");

  if (compactMode) {
    maxChatVisible = 1;
    maxGifts = 3;
    maxLikes = 5;
    chatInterval = 3600;
  }

  GIFT_TYPES.forEach(function (gift) {
    var count = gift.weight;
    while (count > 0) {
      giftPool.push(gift);
      count -= 1;
    }
  });

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function pickGift() {
    return pick(giftPool);
  }

  function pickReview() {
    var review = clientReviews[chatIndex % clientReviews.length];
    chatIndex += 1;
    return review;
  }

  function formatCount(value) {
    if (value >= 1000) return (value / 1000).toFixed(1).replace(".0", "") + "K";
    return String(value);
  }

  function setText(el, value) {
    if (el && value) el.textContent = value;
  }

  function setHref(el, value) {
    if (!el) return;
    var href = safeHref(value);
    if (href) el.href = href;
  }

  function safeHref(url) {
    if (!url || typeof url !== "string") return null;
    try {
      var parsed = new URL(url, window.location.href);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
    } catch (e) {}
    return null;
  }

  function setImg(el, src, position) {
    if (!el || !src) return;
    el.src = src;
    if (position) el.style.objectPosition = position;
  }

  function socialIconPath(base, key) {
    var file = key === "googleReview" ? "google" : key;
    return base.replace(/\/$/, "") + "/" + file + ".svg";
  }

  function renderReviewStars(container, score) {
    if (!container) return;
    var value = typeof score === "number" ? score : parseFloat(score);
    if (!value || isNaN(value)) return;

    container.innerHTML = "";
    for (var i = 1; i <= 5; i++) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 20 20");
      svg.setAttribute("width", "14");
      svg.setAttribute("height", "14");
      if (i > Math.round(value)) svg.setAttribute("class", "rb-social-presence__star--soft");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "currentColor");
      path.setAttribute(
        "d",
        "M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"
      );
      svg.appendChild(path);
      container.appendChild(svg);
    }
  }

  function applyReviewPlatforms(platforms, social) {
    if (!platforms || typeof platforms !== "object") return;

    ["treatwell", "google"].forEach(function (key) {
      var data = platforms[key];
      if (!data) return;

      var scoreEl = section.querySelector('[data-neo-social-review-score="' + key + '"]');
      var starsEl = section.querySelector('[data-neo-social-review-stars="' + key + '"]');
      var metaEl = section.querySelector('[data-neo-social-review-meta="' + key + '"]');
      var cardEl = section.querySelector('[data-neo-social-review="' + key + '"]');
      var brand = key === "google" ? "Google" : "Treatwell";

      if (typeof data.score === "number" && scoreEl) {
        scoreEl.textContent = String(data.score);
      }
      if (starsEl) renderReviewStars(starsEl, data.score);
      if (metaEl && typeof data.count === "number") {
        metaEl.textContent =
          key === "google"
            ? data.count + " Google reviews"
            : data.count + " verified reviews";
      }
      if (cardEl && typeof data.score === "number" && typeof data.count === "number") {
        cardEl.setAttribute(
          "aria-label",
          "Rated " + data.score + " out of 5 from " + data.count + " " + brand + " reviews"
        );
      }
      if (cardEl && key === "treatwell" && data.href) {
        setHref(cardEl, data.href);
      }
    });
  }

  function applyConfig(config) {
    if (!config || typeof config !== "object") return;

    var media = config.media || {};
    var social = config.social || {};
    var stats = config.stats || {};
    var iconBase = config.socialIconBase || "neo/assets/social";

    if (media.backgroundPosition) {
      card.style.setProperty("--neo-social-card-bg-pos", media.backgroundPosition);
    }

    setText(card.querySelector("[data-neo-social-title]"), config.title);
    setText(section.querySelector("[data-neo-social-section-title]"), config.title);
    setText(card.querySelector("[data-neo-social-handle]"), config.handle);
    setText(section.querySelector("[data-neo-social-section-handle]"), config.handle);
    setText(card.querySelector("[data-neo-social-caption]"), config.caption);
    setText(card.querySelector("[data-neo-social-cta]"), config.cta);

    setImg(
      card.querySelector("[data-neo-social-img='background']"),
      media.background,
      media.backgroundPosition
    );
    setImg(
      card.querySelector("[data-neo-social-img='avatar-host']"),
      media.avatar || media.background,
      media.avatarPosition || media.backgroundPosition
    );
    setImg(
      card.querySelector("[data-neo-social-img='avatar-rail']"),
      media.avatar || media.background,
      media.avatarPosition || media.backgroundPosition
    );
    setImg(
      card.querySelector("[data-neo-social-img='avatar-disc']"),
      media.avatar || media.background,
      media.avatarPosition || media.backgroundPosition
    );

    SOCIAL_KEYS.forEach(function (key) {
      var url = social[key];
      if (!url) return;
      section.querySelectorAll('[data-neo-social-link="' + key + '"]').forEach(function (el) {
        setHref(el, url);
      });
    });

    card.querySelectorAll("[data-neo-social-channel-icon]").forEach(function (img) {
      var key = img.getAttribute("data-neo-social-channel-icon");
      if (key) img.src = socialIconPath(iconBase, key);
    });

    if (typeof stats.viewers === "number") viewers = stats.viewers;
    if (typeof stats.hearts === "number") heartCount = stats.hearts;

    var commentEl = card.querySelector('[data-neo-social-stat="comments"]');
    var bookmarkEl = card.querySelector('[data-neo-social-stat="bookmarks"]');
    var shareEl = card.querySelector('[data-neo-social-stat="shares"]');

    if (commentEl && stats.comments != null) commentEl.textContent = String(stats.comments);
    if (bookmarkEl && stats.bookmarks != null) bookmarkEl.textContent = String(stats.bookmarks);
    if (shareEl && stats.shares != null) shareEl.textContent = String(stats.shares);

    var rail = card.querySelector(".neo-social-card__rail, .rb-social-live__rail");
    if (rail && config.businessName) {
      rail.setAttribute("aria-label", "Follow " + config.businessName + " online");
    }

    var channels = card.querySelector(".neo-social-card__channels, .rb-social-live__channels");
    if (channels && config.businessName) {
      channels.setAttribute("aria-label", "Follow " + config.businessName + " online");
    }

    if (Array.isArray(config.reviews) && config.reviews.length) {
      clientReviews = config.reviews;
    }

    applyReviewPlatforms(config.reviewPlatforms, social);
  }

  function fetchJson(url) {
    if (!window.fetch || !url) return Promise.reject(new Error("unavailable"));
    return fetch(url, { credentials: "same-origin" }).then(function (response) {
      if (!response.ok) throw new Error("fetch failed");
      return response.json();
    });
  }

  function loadData() {
    var configUrl = section.getAttribute("data-neo-social-card-src") || "social-media-card.json";
    var reviewsUrl =
      section.getAttribute("data-neo-social-reviews-src") || "client-reviews.json";

    return fetchJson(configUrl)
      .then(function (config) {
        applyConfig(config);
        if (Array.isArray(config.reviews) && config.reviews.length) return config;
        var altReviews = config.reviewsUrl || reviewsUrl;
        return fetchJson(altReviews)
          .then(function (reviews) {
            if (Array.isArray(reviews) && reviews.length) clientReviews = reviews;
            return config;
          })
          .catch(function () {
            return config;
          });
      })
      .catch(function () {
        return fetchJson(reviewsUrl)
          .then(function (reviews) {
            if (Array.isArray(reviews) && reviews.length) clientReviews = reviews;
          })
          .catch(function () {});
      });
  }

  function updateHeartCount(delta) {
    heartCount = Math.min(9999, heartCount + (delta || 1));
    if (heartCountEl) heartCountEl.textContent = formatCount(heartCount);
  }

  function updateViewers() {
    viewers += Math.floor(Math.random() * 5) - 1;
    viewers = Math.max(212, Math.min(312, viewers));
    if (viewersEl) viewersEl.textContent = viewers + " watching";
  }

  function createChatItem(review, animate) {
    var item = document.createElement("li");
    item.className = "neo-social-card__chat-item rb-social-live__chat-item" + (animate ? " is-entering" : "");

    var user = document.createElement("span");
    user.className = "neo-social-card__chat-user rb-social-live__chat-user";
    user.textContent = review.name;

    var text = document.createElement("span");
    text.className = "neo-social-card__chat-text rb-social-live__chat-text";
    text.textContent = review.text;

    item.appendChild(user);
    item.appendChild(text);

    if (animate) {
      item.addEventListener(
        "animationend",
        function (event) {
          if (event.animationName === "rb-social-chat-in") item.classList.remove("is-entering");
        },
        { once: true }
      );
    }

    return item;
  }

  function removeOldestChatItem() {
    if (!chatList || !chatList.firstElementChild) return;

    var oldest = chatList.firstElementChild;
    if (reducedMotion.matches) {
      oldest.remove();
      return;
    }

    oldest.classList.add("is-exiting");
    oldest.addEventListener(
      "animationend",
      function (event) {
        if (event.animationName === "rb-social-chat-out") oldest.remove();
      },
      { once: true }
    );
  }

  function pushChatMessage(animate) {
    if (!chatList || !clientReviews.length) return;

    var items = chatList.querySelectorAll(".rb-social-live__chat-item:not(.is-exiting)");
    if (items.length >= maxChatVisible) removeOldestChatItem();

    chatList.appendChild(createChatItem(pickReview(), animate));
  }

  function seedChat() {
    if (!chatList || !clientReviews.length) return;

    chatList.textContent = "";
    var seedCount = compactMode
      ? 1
      : reducedMotion.matches
        ? clientReviews.length
        : Math.min(2, clientReviews.length);
    for (var i = 0; i < seedCount; i += 1) {
      chatList.appendChild(createChatItem(clientReviews[i], !reducedMotion.matches && i > 0));
    }
    chatIndex = seedCount % clientReviews.length;
  }

  function spawnLike() {
    if (likeLane.querySelectorAll(".rb-social-live__like").length >= maxLikes) return;

    var node = document.createElement("span");
    node.className = "neo-social-card__like rb-social-live__like";
    node.innerHTML = HEART_SVG;
    node.style.setProperty("--rb-like-scale", (0.78 + Math.random() * 0.32).toFixed(2));
    node.style.setProperty("--rb-like-drift", ((Math.random() - 0.5) * 12).toFixed(0) + "px");
    node.style.setProperty("--rb-like-duration", (1.9 + Math.random() * 0.8).toFixed(2) + "s");
    node.style.setProperty("--rb-like-delay", (Math.random() * 0.08).toFixed(2) + "s");
    node.style.setProperty("--rb-like-color", pick(LIKE_COLORS));
    likeLane.appendChild(node);

    node.addEventListener("animationend", function () {
      node.remove();
    });
  }

  function spawnGiftFloat(gift) {
    if (giftLane.querySelectorAll(".rb-social-live__gift-float").length >= maxGifts) return;

    var node = document.createElement("span");
    node.className =
      "neo-social-card__gift-float rb-social-live__gift-float" +
      (gift.large ? " rb-social-live__gift-float--lg" : "");

    var emoji = document.createElement("span");
    emoji.className = "neo-social-card__gift-emoji rb-social-live__gift-emoji";
    emoji.textContent = gift.emoji;
    node.appendChild(emoji);

    node.style.setProperty("--rb-gift-scale", (0.9 + Math.random() * 0.22).toFixed(2));
    node.style.setProperty("--rb-gift-drift", ((Math.random() - 0.5) * 22).toFixed(0) + "px");
    node.style.setProperty("--rb-gift-duration", (2.6 + Math.random() * 1.2).toFixed(2) + "s");
    node.style.setProperty("--rb-gift-delay", (Math.random() * 0.12).toFixed(2) + "s");
    node.style.setProperty("--rb-gift-glow", gift.glow);
    node.style.bottom = (4 + Math.random() * 12).toFixed(0) + "%";
    giftLane.appendChild(node);

    node.addEventListener("animationend", function () {
      node.remove();
    });
  }

  function spawnGiftToast(review, gift) {
    if (!toastStage) return;
    if (toastStage.querySelector(".rb-social-live__toast")) return;

    var node = document.createElement("div");
    node.className = "neo-social-card__toast rb-social-live__toast";
    node.style.setProperty("--rb-toast-duration", (3.2 + Math.random() * 0.8).toFixed(2) + "s");

    var icon = document.createElement("span");
    icon.className = "neo-social-card__toast-icon rb-social-live__toast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = gift.emoji;

    var copy = document.createElement("span");
    copy.className = "neo-social-card__toast-copy rb-social-live__toast-copy";

    var name = document.createElement("strong");
    name.textContent = review.name;

    var label = document.createElement("span");
    label.className = "neo-social-card__toast-label rb-social-live__toast-label";
    label.textContent = "sent " + gift.label;

    copy.appendChild(name);
    copy.appendChild(document.createTextNode(" "));
    copy.appendChild(label);
    node.appendChild(icon);
    node.appendChild(copy);
    toastStage.appendChild(node);

    node.addEventListener("animationend", function () {
      node.remove();
    });
  }

  function sendGift() {
    var gift = pickGift();
    var review = pick(clientReviews);
    spawnGiftFloat(gift);
    spawnGiftToast(review, gift);
    updateHeartCount(gift.large ? 3 : 1);
  }

  function pulseHeartButton() {
    if (!heartBtn) return;
    heartBtn.classList.add("is-tapped");
    window.setTimeout(function () {
      heartBtn.classList.remove("is-tapped");
    }, 450);
  }

  function parseRailCount(text) {
    var raw = String(text || "").trim();
    if (!raw) return 0;
    if (raw.indexOf("K") !== -1) return Math.round(parseFloat(raw) * 1000);
    return parseInt(raw, 10) || 0;
  }

  function bumpRailCount(el, delta) {
    if (!el) return;
    var value = parseRailCount(el.textContent) + (delta || 1);
    if (value >= 1000) el.textContent = formatCount(value);
    else el.textContent = String(value);
  }

  function pulseRailAction(action) {
    if (!action || action.classList.contains("is-live-tap")) return;

    action.classList.add("is-live-tap");
    window.setTimeout(function () {
      action.classList.remove("is-live-tap");
    }, 900);

    if (action === heartBtn) return;

    var countEl = action.querySelector("[data-neo-social-stat], [data-rb-rail-count]");
    if (countEl && Math.random() > 0.72) bumpRailCount(countEl, 1);
  }

  function scheduleRailTouch() {
    if (!railActions.length) return;
    var delay = 700 + Math.floor(Math.random() * 1100);
    railTimer = window.setTimeout(function () {
      pulseRailAction(pick(Array.prototype.slice.call(railActions)));
      scheduleRailTouch();
    }, delay);
  }

  function startRailTouches() {
    if (railTimer || !railActions.length || reducedMotion.matches) return;
    scheduleRailTouch();
  }

  function stopRailTouches() {
    if (!railTimer) return;
    window.clearTimeout(railTimer);
    railTimer = null;
    Array.prototype.forEach.call(railActions, function (action) {
      action.classList.remove("is-live-tap");
    });
  }

  function burstLikes(count) {
    var total = count || 1;
    for (var i = 0; i < total; i += 1) {
      window.setTimeout(function () {
        spawnLike();
        updateHeartCount(1);
      }, i * 100);
    }
    pulseHeartButton();
  }

  function seedStaticMotion() {
    spawnLike();
    var gift = pickGift();
    var node = document.createElement("span");
    node.className = "neo-social-card__gift-float rb-social-live__gift-float rb-social-live__gift-float--lg";
    var emoji = document.createElement("span");
    emoji.className = "neo-social-card__gift-emoji rb-social-live__gift-emoji";
    emoji.textContent = gift.emoji;
    node.appendChild(emoji);
    node.style.bottom = "24%";
    node.style.setProperty("--rb-gift-glow", gift.glow);
    node.style.setProperty("--rb-gift-scale", "1");
    giftLane.appendChild(node);
  }

  function startChat() {
    if (!chatList || chatTimer || reducedMotion.matches) return;
    chatTimer = window.setInterval(function () {
      pushChatMessage(true);
    }, chatInterval);
  }

  function stopChat() {
    if (!chatTimer) return;
    window.clearInterval(chatTimer);
    chatTimer = null;
  }

  function startMotion() {
    if (likeTimer) return;
    spawnLike();
    window.setTimeout(sendGift, 900);
    likeTimer = window.setInterval(function () {
      if (Math.random() > 0.2) spawnLike();
    }, 1200);
    giftTimer = window.setInterval(function () {
      if (Math.random() > 0.15) sendGift();
    }, 3800);
    if (viewersEl) {
      updateViewers();
      viewerTimer = window.setInterval(updateViewers, 4200);
    }
    startRailTouches();
  }

  function stopMotion() {
    if (likeTimer) {
      window.clearInterval(likeTimer);
      likeTimer = null;
    }
    if (giftTimer) {
      window.clearInterval(giftTimer);
      giftTimer = null;
    }
    if (viewerTimer) {
      window.clearInterval(viewerTimer);
      viewerTimer = null;
    }
    stopRailTouches();
  }

  function start() {
    if (running) return;
    running = true;
    startChat();
    if (!reducedMotion.matches) startMotion();
  }

  function stop() {
    if (!running) return;
    running = false;
    stopChat();
    stopMotion();
  }

  function applyMotionPreference() {
    stop();
    seedChat();
    if (reducedMotion.matches) {
      seedStaticMotion();
      return;
    }
    if (sectionVisible) start();
  }

  function bindMotionPreference() {
    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", applyMotionPreference);
    } else if (typeof reducedMotion.addListener === "function") {
      reducedMotion.addListener(applyMotionPreference);
    }
  }

  function bindScrollPause() {
    if (reducedMotion.matches) return;

    window.addEventListener(
      "scroll",
      function () {
        if (!sectionVisible || !running) return;

        if (!motionPausedByScroll) {
          motionPausedByScroll = true;
          stopMotion();
        }

        window.clearTimeout(scrollIdleTimer);
        scrollIdleTimer = window.setTimeout(function () {
          motionPausedByScroll = false;
          if (sectionVisible && running && !reducedMotion.matches) startMotion();
        }, 180);
      },
      { passive: true }
    );
  }

  function initLive() {
    seedChat();
    if (heartCountEl) heartCountEl.textContent = formatCount(heartCount);
    if (viewersEl) viewersEl.textContent = viewers + " watching";
    bindMotionPreference();
    bindScrollPause();

    if (heartBtn) {
      heartBtn.addEventListener("click", function () {
        burstLikes(4);
        if (Math.random() > 0.35) {
          window.setTimeout(sendGift, 180);
        }
      });
    }

    if (reducedMotion.matches) {
      seedStaticMotion();
      return;
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            sectionVisible = entry.isIntersecting;
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(section);
    } else {
      sectionVisible = true;
      start();
    }
  }

  section.querySelectorAll("[data-neo-social-review-stars]").forEach(function (el) {
    var key = el.getAttribute("data-neo-social-review-stars");
    var scoreEl = section.querySelector('[data-neo-social-review-score="' + key + '"]');
    if (scoreEl) renderReviewStars(el, parseFloat(scoreEl.textContent, 10));
  });

  loadData().then(initLive).catch(initLive);
})();

/* ../../design/neo/mobile-nav.js */
/**
 * Neo Design — mobile navigation (drawer toggle + scroll-aware desktop nav)
 */
(function () {
  "use strict";

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var lastTrigger = null;

  function getMenu() {
    return document.getElementById("neo-mobile-menu");
  }

  function getMenuButton() {
    return document.querySelector(".neo-mobile-header__menu-btn");
  }

  function isOpen() {
    var menu = getMenu();
    return !!menu && menu.classList.contains("neo-mobile-menu--open");
  }

  function getFocusable(menu) {
    return Array.prototype.filter.call(menu.querySelectorAll(FOCUSABLE), function (el) {
      return el.getClientRects().length > 0;
    });
  }

  /* Hide the rest of the page from keyboard + assistive tech while the drawer
     is open, so focus stays in the dialog. */
  function setBackgroundInert(inert) {
    var page = document.querySelector(".neo-page");
    var menu = getMenu();
    if (!page) return;
    Array.prototype.forEach.call(page.children, function (child) {
      if (child === menu) return;
      if (inert) child.setAttribute("inert", "");
      else child.removeAttribute("inert");
    });
  }

  function onKeydown(e) {
    if (!isOpen()) return;
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      setMenuOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    var menu = getMenu();
    var focusable = getFocusable(menu);
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function setMenuOpen(open) {
    var menu = getMenu();
    if (!menu) return;
    var menuButton = getMenuButton();

    if (open) {
      lastTrigger = document.activeElement;
      menu.classList.add("neo-mobile-menu--open");
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("neo-menu-open");
      document.documentElement.classList.add("neo-menu-open");
      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close menu");
      }
      setBackgroundInert(true);
      document.addEventListener("keydown", onKeydown, true);
      var target = menu.querySelector(".neo-mobile-menu__close") || getFocusable(menu)[0];
      if (target) {
        window.requestAnimationFrame(function () {
          target.focus();
        });
      }
    } else {
      menu.classList.remove("neo-mobile-menu--open");
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("neo-menu-open");
      document.documentElement.classList.remove("neo-menu-open");
      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      }
      setBackgroundInert(false);
      document.removeEventListener("keydown", onKeydown, true);
      var returnTo = lastTrigger && typeof lastTrigger.focus === "function" ? lastTrigger : menuButton;
      if (returnTo) returnTo.focus();
      lastTrigger = null;
    }
  }

  function toggleMobileMenu() {
    setMenuOpen(!isOpen());
  }

  function initScrollNav() {
    var nav = document.getElementById("neo-desktop-nav");
    var header = document.getElementById("neo-mobile-header");
    if (!nav && !header) return;

    var ticking = false;
    var lastScrolled = null;

    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        var scrolled = window.scrollY > 20;
        if (scrolled === lastScrolled) return;
        lastScrolled = scrolled;
        if (nav) nav.classList.toggle("neo-desktop-nav--scrolled", scrolled);
        if (header) header.classList.toggle("neo-mobile-header--scrolled", scrolled);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMenuA11y() {
    var menu = document.getElementById("neo-mobile-menu");
    var menuButton = getMenuButton();
    if (menu && !menu.hasAttribute("aria-hidden")) {
      menu.setAttribute("aria-hidden", menu.classList.contains("neo-mobile-menu--open") ? "false" : "true");
    }
    if (menuButton && !menuButton.hasAttribute("aria-expanded")) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  }

  window.toggleNeoMobileMenu = toggleMobileMenu;

  document.addEventListener("DOMContentLoaded", function () {
    initScrollNav();
    initMenuA11y();

    document.querySelectorAll("[data-neo-menu-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleMobileMenu();
      });
    });

    document.querySelectorAll("[data-neo-menu-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        var menu = document.getElementById("neo-mobile-menu");
        if (menu && menu.classList.contains("neo-mobile-menu--open")) {
          toggleMobileMenu();
        }
      });
    });

    /* Tap the scrim (the drawer container itself, not the panel) to close. */
    var menuEl = document.getElementById("neo-mobile-menu");
    if (menuEl) {
      menuEl.addEventListener("click", function (e) {
        if (e.target === menuEl && isOpen()) {
          setMenuOpen(false);
        }
      });
    }
  });
})();

/* ../../design/neo/a11y-toolbar.js */
/**
 * Neo Design — Accessibility Tools toolbar
 * End-user controls: text scale, contrast modes, light bg, links, readable font, reset.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "neo-a11y";
  var MIN_SCALE = -2;
  var MAX_SCALE = 2;

  var ICONS = {
    accessibility:
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    "zoom-in":
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>',
    "zoom-out":
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M8 11h6"/></svg>',
    columns:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="4" height="18"/><rect x="10" y="3" width="4" height="18"/><rect x="17" y="3" width="4" height="18"/></svg>',
    contrast:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none"/></svg>',
    eye:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    sun:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    link:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    type:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>',
    "rotate-ccw":
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  };

  var TOOLS = [
    { id: "grayscale", label: "Grayscale", icon: "columns", type: "toggle", attr: "data-a11y-grayscale", exclusive: "contrast" },
    { id: "high-contrast", label: "High Contrast", icon: "contrast", type: "toggle", attr: "data-a11y-high-contrast", exclusive: "contrast" },
    { id: "negative-contrast", label: "Negative Contrast", icon: "eye", type: "toggle", attr: "data-a11y-negative-contrast", exclusive: "contrast" },
    { id: "light-bg", label: "Light Background", icon: "sun", type: "toggle", attr: "data-a11y-light-bg", theme: true },
    { id: "links-underline", label: "Links Underline", icon: "link", type: "toggle", attr: "data-a11y-links-underline" },
    { id: "readable-font", label: "Readable Font", icon: "type", type: "toggle", attr: "data-a11y-readable-font" },
    { id: "reset", label: "Reset", icon: "rotate-ccw", type: "action" },
  ];

  var state = {
    v: 1,
    textScale: 0,
    grayscale: false,
    highContrast: false,
    negativeContrast: false,
    lightBg: false,
    linksUnderline: false,
    readableFont: false,
    themeOriginal: null,
  };

  var html = document.documentElement;
  var root = document.getElementById("neo-a11y-root") || document.body;
  var panel = null;
  var trigger = null;
  var liveRegion = null;
  var focusableButtons = [];
  var textSlider = null;
  var textSliderFill = null;
  var textSliderThumb = null;
  var autoHideTimer = null;
  var AUTO_HIDE_MS = 5000;
  // Snapshot on pointer down so a footer opener can open the panel on click
  // without the same click being treated as an outside dismiss.
  var panelOpenOnPointerDown = false;

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved.v === 1) {
        Object.assign(state, saved);
        applyAll();
      }
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function announce(msg) {
    if (liveRegion) liveRegion.textContent = msg;
  }

  function clearContrastModes() {
    html.removeAttribute("data-a11y-grayscale");
    html.removeAttribute("data-a11y-high-contrast");
    html.removeAttribute("data-a11y-negative-contrast");
    state.grayscale = false;
    state.highContrast = false;
    state.negativeContrast = false;
  }

  function applyTextScale() {
    if (state.textScale === 0) {
      html.removeAttribute("data-a11y-text-scale");
    } else {
      html.setAttribute("data-a11y-text-scale", String(state.textScale));
    }
  }

  function updateTextSlider() {
    if (!textSlider) return;
    var pct = ((state.textScale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * 100;
    if (textSliderFill) textSliderFill.style.width = pct + "%";
    if (textSliderThumb) textSliderThumb.style.left = pct + "%";
    if (textSlider.value !== String(state.textScale)) {
      textSlider.value = String(state.textScale);
    }
  }

  function applyAll() {
    applyTextScale();
    if (state.grayscale) html.setAttribute("data-a11y-grayscale", "true");
    else html.removeAttribute("data-a11y-grayscale");
    if (state.highContrast) html.setAttribute("data-a11y-high-contrast", "true");
    else html.removeAttribute("data-a11y-high-contrast");
    if (state.negativeContrast) html.setAttribute("data-a11y-negative-contrast", "true");
    else html.removeAttribute("data-a11y-negative-contrast");
    if (state.lightBg) {
      if (!state.themeOriginal) {
        state.themeOriginal = html.getAttribute("data-neo-theme") || "dark";
      }
      html.setAttribute("data-neo-theme-original", state.themeOriginal);
      html.setAttribute("data-neo-theme", "light");
      html.setAttribute("data-a11y-light-bg", "true");
    } else {
      html.removeAttribute("data-a11y-light-bg");
      if (state.themeOriginal) {
        html.setAttribute("data-neo-theme", state.themeOriginal);
        html.removeAttribute("data-neo-theme-original");
      }
    }
    if (state.linksUnderline) html.setAttribute("data-a11y-links-underline", "true");
    else html.removeAttribute("data-a11y-links-underline");
    if (state.readableFont) html.setAttribute("data-a11y-readable-font", "true");
    else html.removeAttribute("data-a11y-readable-font");
    updateUI();
  }

  function resetAll() {
    state.textScale = 0;
    state.grayscale = false;
    state.highContrast = false;
    state.negativeContrast = false;
    state.lightBg = false;
    state.linksUnderline = false;
    state.readableFont = false;
    if (state.themeOriginal) {
      html.setAttribute("data-neo-theme", state.themeOriginal);
      state.themeOriginal = null;
    }
    html.removeAttribute("data-neo-theme-original");
    html.removeAttribute("data-a11y-text-scale");
    html.removeAttribute("data-a11y-grayscale");
    html.removeAttribute("data-a11y-high-contrast");
    html.removeAttribute("data-a11y-negative-contrast");
    html.removeAttribute("data-a11y-light-bg");
    html.removeAttribute("data-a11y-links-underline");
    html.removeAttribute("data-a11y-readable-font");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
    updateUI();
    announce("All accessibility settings reset");
  }

  function handleTool(tool) {
    if (tool.id === "reset") {
      resetAll();
    } else if (tool.type === "toggle") {
      if (tool.exclusive === "contrast") {
        var key = tool.id === "grayscale" ? "grayscale" : tool.id === "high-contrast" ? "highContrast" : "negativeContrast";
        var wasOn = state[key];
        clearContrastModes();
        if (!wasOn) {
          state[key] = true;
          html.setAttribute(tool.attr, "true");
          announce(tool.label + " enabled");
        } else {
          announce(tool.label + " disabled");
        }
      } else if (tool.id === "light-bg") {
        state.lightBg = !state.lightBg;
        if (state.lightBg) {
          state.themeOriginal = html.getAttribute("data-neo-theme-original") || html.getAttribute("data-neo-theme") || "dark";
          html.setAttribute("data-neo-theme-original", state.themeOriginal);
          html.setAttribute("data-neo-theme", "light");
          html.setAttribute("data-a11y-light-bg", "true");
          announce("Light background enabled");
        } else {
          html.removeAttribute("data-a11y-light-bg");
          html.setAttribute("data-neo-theme", state.themeOriginal || "dark");
          announce("Light background disabled");
        }
      } else if (tool.id === "links-underline") {
        state.linksUnderline = !state.linksUnderline;
        if (state.linksUnderline) {
          html.setAttribute("data-a11y-links-underline", "true");
          announce("Links underline enabled");
        } else {
          html.removeAttribute("data-a11y-links-underline");
          announce("Links underline disabled");
        }
      } else if (tool.id === "readable-font") {
        state.readableFont = !state.readableFont;
        if (state.readableFont) {
          html.setAttribute("data-a11y-readable-font", "true");
          announce("Readable font enabled");
        } else {
          html.removeAttribute("data-a11y-readable-font");
          announce("Readable font disabled");
        }
      }
      saveState();
      updateUI();
    }
  }

  function isActive(tool) {
    if (tool.id === "grayscale") return state.grayscale;
    if (tool.id === "high-contrast") return state.highContrast;
    if (tool.id === "negative-contrast") return state.negativeContrast;
    if (tool.id === "light-bg") return state.lightBg;
    if (tool.id === "links-underline") return state.linksUnderline;
    if (tool.id === "readable-font") return state.readableFont;
    return false;
  }

  function isDisabled() {
    return false;
  }

  function updateUI() {
    if (!panel) return;
    updateTextSlider();
    focusableButtons.forEach(function (btn, i) {
      var tool = TOOLS[i];
      if (!tool) return;
      btn.disabled = isDisabled(tool);
      btn.classList.toggle("neo-a11y-btn--active", tool.type === "toggle" && isActive(tool));
    });
  }

  function getFocusable() {
    return Array.prototype.slice.call(
      panel.querySelectorAll('input, button:not(:disabled), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
  }

  function startAutoHide() {
    if (root === document.body || !root.classList) return;
    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(function () {
      if (!panel.classList.contains("neo-a11y-panel--open")) {
        root.classList.add("neo-a11y-root--auto-hidden");
      }
    }, AUTO_HIDE_MS);
  }

  function showTrigger() {
    clearTimeout(autoHideTimer);
    if (root.classList) root.classList.remove("neo-a11y-root--auto-hidden");
  }

  function openFromExternalOpener(e) {
    e.preventDefault();
    // Stop this activation from bubbling to the document outside-click handler,
    // which would otherwise treat the opener (outside the toolbar wrapper)
    // as an outside click and immediately close the panel (two-click bug).
    e.stopPropagation();
    // Footer/header openers: open the panel directly. Do not reveal the floating
    // trigger on mobile — that looked like a required second tap on another icon.
    openPanel(false);
  }

  function setupExternalOpeners() {
    var openers = document.querySelectorAll("[data-neo-a11y-open]");
    Array.prototype.forEach.call(openers, function (btn) {
      var openedFromTouch = false;
      // Touch: open on pointerup so the panel appears on the same tap without
      // waiting for a delayed synthetic click (which felt like a second step).
      btn.addEventListener("pointerup", function (e) {
        if (e.pointerType !== "touch") return;
        openedFromTouch = true;
        openFromExternalOpener(e);
      });
      btn.addEventListener("click", function (e) {
        if (openedFromTouch) {
          openedFromTouch = false;
          return;
        }
        openFromExternalOpener(e);
      });
    });
  }

  function openPanel(revealTrigger) {
    if (revealTrigger !== false) showTrigger();
    panel.classList.add("neo-a11y-panel--open");
    if (root.classList) root.classList.add("neo-a11y-root--panel-open");
    trigger.setAttribute("aria-expanded", "true");
    if (textSlider) {
      try {
        textSlider.focus({ preventScroll: true });
      } catch (err) {
        textSlider.focus();
      }
    }
  }

  function closePanel() {
    panel.classList.remove("neo-a11y-panel--open");
    if (root.classList) root.classList.remove("neo-a11y-root--panel-open");
    trigger.setAttribute("aria-expanded", "false");
    showTrigger();
    trigger.focus();
    startAutoHide();
  }

  function trapFocus(e) {
    if (!panel.classList.contains("neo-a11y-panel--open")) return;
    if (e.key !== "Tab") return;
    var focusable = getFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function buildUI() {
    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<button type="button" class="neo-a11y-trigger" aria-label="Open accessibility tools" aria-expanded="false" aria-controls="neo-a11y-panel">' +
      ICONS.accessibility +
      "</button>" +
      '<div id="neo-a11y-panel" class="neo-a11y-panel" role="dialog" aria-label="Accessibility Tools" aria-modal="true">' +
      '<h2 class="neo-a11y-panel__title">Accessibility Tools</h2>' +
      '<div class="neo-a11y-slider">' +
      '<label class="neo-a11y-slider__label" for="neo-a11y-text-size">Text Size</label>' +
      '<div class="neo-slider neo-slider--compact">' +
      '<div class="neo-slider__control">' +
      '<div class="neo-slider__track">' +
      '<div class="neo-slider__fill"></div>' +
      '<div class="neo-slider__thumb"></div>' +
      "</div>" +
      '<input type="range" min="' + MIN_SCALE + '" max="' + MAX_SCALE + '" step="1" value="0" id="neo-a11y-text-size" aria-label="Text size">' +
      "</div>" +
      '<div class="neo-slider__ticks" aria-hidden="true"><span>A−</span><span>A</span><span>A+</span></div>' +
      "</div>" +
      "</div>" +
      '<ul class="neo-a11y-list" role="menu"></ul>' +
      '<div class="neo-a11y-live" aria-live="polite" aria-atomic="true"></div>' +
      "</div>";

    root.appendChild(wrap);
    trigger = wrap.querySelector(".neo-a11y-trigger");
    panel = wrap.querySelector(".neo-a11y-panel");
    liveRegion = wrap.querySelector(".neo-a11y-live");
    var list = wrap.querySelector(".neo-a11y-list");

    textSlider = wrap.querySelector("#neo-a11y-text-size");
    textSliderFill = wrap.querySelector(".neo-a11y-slider .neo-slider__fill");
    textSliderThumb = wrap.querySelector(".neo-a11y-slider .neo-slider__thumb");
    textSlider.addEventListener("input", function () {
      var v = parseInt(textSlider.value, 10);
      if (isNaN(v)) v = 0;
      state.textScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, v));
      applyTextScale();
      updateTextSlider();
      saveState();
      announce(
        state.textScale === 0
          ? "Text size default"
          : state.textScale > 0
          ? "Text size increased"
          : "Text size decreased"
      );
    });

    TOOLS.forEach(function (tool, index) {
      var li = document.createElement("li");
      li.className = "neo-a11y-item";
      li.setAttribute("role", "none");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "neo-a11y-btn";
      btn.setAttribute("role", "menuitem");
      btn.innerHTML = (ICONS[tool.icon] || "") + "<span>" + tool.label + "</span>";
      btn.addEventListener("click", function () {
        handleTool(tool);
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          var next = focusableButtons[index + 1] || focusableButtons[0];
          next.focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          var prev = focusableButtons[index - 1] || focusableButtons[focusableButtons.length - 1];
          prev.focus();
        }
      });
      li.appendChild(btn);
      list.appendChild(li);
      focusableButtons.push(btn);
    });

    trigger.addEventListener("click", function () {
      if (panel.classList.contains("neo-a11y-panel--open")) {
        closePanel();
      } else {
        openPanel();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("neo-a11y-panel--open")) {
        closePanel();
      }
      trapFocus(e);
    });

    // Snapshot on pointer down: only a click that began while the panel was
    // already open should be able to dismiss it. This stops the click that
    // opens the panel from also being read as an outside click. pointerdown
    // covers touch; mousedown covers mouse / legacy synthesis.
    function snapshotPanelOpenOnPointerDown() {
      panelOpenOnPointerDown = panel.classList.contains("neo-a11y-panel--open");
    }
    document.addEventListener("pointerdown", snapshotPanelOpenOnPointerDown, true);
    document.addEventListener("mousedown", snapshotPanelOpenOnPointerDown, true);

    document.addEventListener("click", function (e) {
      if (!panelOpenOnPointerDown) return;
      if (e.target.closest && e.target.closest("[data-neo-a11y-open]")) return;
      if (!panel.classList.contains("neo-a11y-panel--open")) return;
      if (!wrap.contains(e.target)) closePanel();
    });
  }

  function init() {
    if (!document.getElementById("neo-main")) {
      console.warn("Neo a11y: #neo-main not found. Wrap page content in <main id=\"neo-main\">.");
    }
    buildUI();
    loadState();
    updateUI();
    setupExternalOpeners();
    startAutoHide();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ../../design/neo/theme-toggle.js?v=3 */
/**
 * Neo Design — dark/light theme toggle with system auto-detect.
 *
 * - Injects a toggle into the mobile hamburger drawer (a labelled row near
 *   the drawer CTA) and the footer legal bar next to the accessibility button.
 *   The drawer copy is shown on mobile, the footer copy on wider screens (the
 *   footer toggle is hidden under 768px), so only one is ever visible. Falls
 *   back to the mobile header if neither is present.
 * - Persists an explicit choice in localStorage ("neo-theme").
 * - With no explicit choice, follows the device's system setting live.
 *
 * Pairs with theme-init.js, which applies the theme before first paint.
 */
(function () {
  "use strict";

  var KEY = "neo-theme";
  var html = document.documentElement;
  var buttons = [];

  var SUN =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  var MOON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function currentTheme() {
    return html.getAttribute("data-neo-theme") === "light" ? "light" : "dark";
  }

  function savedPref() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function apply(theme, persist) {
    html.setAttribute("data-neo-theme", theme);
    if (persist) {
      try {
        localStorage.setItem(KEY, theme);
      } catch (e) { /* ignore */ }
    }
    updateButtons();
  }

  function updateButtons() {
    var theme = currentTheme();
    // Full sentence for screen readers / tooltip; short visible label so it
    // fits on one line in the narrow drawer without clipping or wrapping.
    var label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
    var shortLabel = theme === "light" ? "Dark mode" : "Light mode";
    var icon = theme === "light" ? MOON : SUN;
    buttons.forEach(function (btn) {
      var iconHost = btn.querySelector(".neo-theme-toggle__icon");
      var labelHost = btn.querySelector(".neo-theme-toggle__label");
      var isDrawer = btn.classList.contains("neo-theme-toggle--drawer");
      if (iconHost) {
        // Drawer row is always the "Dark mode" setting; keep the moon icon stable.
        iconHost.innerHTML = isDrawer ? MOON : icon;
      } else {
        btn.innerHTML = icon;
      }
      if (labelHost) {
        labelHost.textContent = isDrawer ? "Dark mode" : shortLabel;
      }
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      // aria-pressed reflects whether dark mode is active (matches the switch).
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  function toggle() {
    apply(currentTheme() === "light" ? "dark" : "light", true);
  }

  function makeButton(withLabel) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "neo-theme-toggle";
    if (withLabel) {
      var iconSpan = document.createElement("span");
      iconSpan.className = "neo-theme-toggle__icon";
      iconSpan.setAttribute("aria-hidden", "true");
      var labelSpan = document.createElement("span");
      labelSpan.className = "neo-theme-toggle__label";
      btn.appendChild(iconSpan);
      btn.appendChild(labelSpan);
    }
    btn.addEventListener("click", toggle);
    buttons.push(btn);
    return btn;
  }

  /* Mobile: a labelled, full-width row at the foot of the hamburger drawer,
     sitting just below the primary CTA. Stays inside the drawer so the focus
     trap keeps it reachable. */
  function injectIntoDrawer() {
    var inners = document.querySelectorAll(".neo-mobile-menu__inner");
    if (!inners.length) return false;
    Array.prototype.forEach.call(inners, function (inner) {
      var row = document.createElement("div");
      row.className = "neo-mobile-menu__theme";
      var btn = makeButton(true);
      btn.classList.add("neo-theme-toggle--drawer");
      // Visual on/off switch on the right; state is driven by data-neo-theme in CSS.
      var sw = document.createElement("span");
      sw.className = "neo-theme-toggle__switch";
      sw.setAttribute("aria-hidden", "true");
      var knob = document.createElement("span");
      knob.className = "neo-theme-toggle__switch-knob";
      sw.appendChild(knob);
      btn.appendChild(sw);
      row.appendChild(btn);
      var cta = inner.querySelector(".neo-mobile-menu__cta");
      if (cta) {
        // Sit in the bottom group, just above the primary CTA button, so the
        // drawer's margin-top:auto keeps the whole cluster on screen.
        cta.insertBefore(row, cta.firstChild);
      } else {
        inner.appendChild(row);
      }
    });
    return true;
  }

  /* Desktop: a labelled pill in the footer legal bar, sitting next to the
     accessibility button. Hidden under 768px (CSS) so it never duplicates the
     drawer toggle on mobile. */
  function injectIntoFooter() {
    var legals = document.querySelectorAll(".neo-footer__legal");
    if (!legals.length) return false;
    Array.prototype.forEach.call(legals, function (legal) {
      var btn = makeButton(true);
      btn.classList.add("neo-theme-toggle--footer");
      var a11y = legal.querySelector(".neo-a11y-footer-btn");
      if (a11y && a11y.nextSibling) {
        legal.insertBefore(btn, a11y.nextSibling);
      } else {
        legal.appendChild(btn);
      }
    });
    return true;
  }

  /* Last resort if a page has neither drawer nor desktop nav. */
  function injectIntoHeader() {
    var slots = document.querySelectorAll(".neo-mobile-header__actions");
    if (!slots.length) return false;
    Array.prototype.forEach.call(slots, function (actions) {
      actions.insertBefore(makeButton(), actions.firstChild);
    });
    return true;
  }

  function inject() {
    var drawer = injectIntoDrawer();
    var footer = injectIntoFooter();
    if (!drawer && !footer) {
      injectIntoHeader();
    }
    updateButtons();
  }

  function watchSystem() {
    if (!window.matchMedia) return;
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var handler = function (e) {
      if (savedPref()) return;
      apply(e.matches ? "light" : "dark", false);
    };
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else if (mq.addListener) {
      mq.addListener(handler);
    }
  }

  function init() {
    inject();
    watchSystem();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ../../design/neo/cookie-consent.js */
/**
 * Cookie consent banner — stores choice in localStorage.
 * Include cookie-consent.css and a banner element with id="neo-cookie-banner".
 */
(function () {
  "use strict";

  var STORAGE_KEY = "neo-cookie-consent";

  document.addEventListener("DOMContentLoaded", function () {
    var banner = document.getElementById("neo-cookie-banner");
    if (!banner) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    banner.classList.add("is-visible");
    banner.querySelectorAll("[data-neo-cookie-accept]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        localStorage.setItem(STORAGE_KEY, "accepted");
        banner.classList.remove("is-visible");
      });
    });
    banner.querySelectorAll("[data-neo-cookie-decline]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        localStorage.setItem(STORAGE_KEY, "declined");
        banner.classList.remove("is-visible");
      });
    });
  });
})();

