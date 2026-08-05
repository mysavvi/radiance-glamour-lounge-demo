/**
 * Neo Social Media Card \u2014 TikTok Live-style section.
 * Loads social-media-card.json (or data-neo-social-card-src) and hydrates links,
 * media, copy, reviews, and live motion.
 */
(function () {
  "use strict";

  var HEART_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.2-4.6-9.6-8.8C.6 9.2 2.2 6 5.4 5.2c2.2-.6 4.4.2 5.8 1.8 1.4-1.6 3.6-2.4 5.8-1.8 3.2.8 4.8 4 3 7-2.4 4.2-9.6 8.8-9.6 8.8z"/></svg>';

  var LIKE_COLORS = ["#fe2c55", "#ff5c7a", "#ff7eb3"];

  var GIFT_TYPES = [
    { emoji: "\u2764\uFE0F", label: "Heart", glow: "#fe2c55", large: false, weight: 5 },
    { emoji: "\uD83D\uDC96", label: "Love", glow: "#ff4d8d", large: false, weight: 4 },
    { emoji: "\uD83D\uDC8B", label: "Kiss", glow: "#ff3d6e", large: false, weight: 4 },
    { emoji: "\uD83C\uDF39", label: "Rose", glow: "#e91e63", large: true, weight: 4 },
    { emoji: "\uD83C\uDF38", label: "Flowers", glow: "#f48fb1", large: true, weight: 3 },
    { emoji: "\u2728", label: "Sparkle", glow: "#ffd54f", large: false, weight: 4 },
    { emoji: "\uD83D\uDC90", label: "Bouquet", glow: "#ec407a", large: true, weight: 2 },
    { emoji: "\uD83D\uDC51", label: "Crown", glow: "#ffb300", large: true, weight: 2 },
    { emoji: "\uD83C\uDF81", label: "Gift", glow: "#ab47bc", large: true, weight: 2 },
    { emoji: "\uD83D\uDD25", label: "Fire", glow: "#ff6d00", large: false, weight: 3 },
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

  function socialIconSrc(config, key) {
    var file = key === "googleReview" ? "google" : key;
    // Prefer inline data URIs from config.socialIcons (avoids SVG upload restrictions)
    if (config.socialIcons && config.socialIcons[file]) {
      return config.socialIcons[file];
    }
    var base = config.socialIconBase || "neo/assets/social";
    return socialIconPath(base, key);
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
    // avatar-disc setImg disabled to preserve google review SVG


    SOCIAL_KEYS.forEach(function (key) {
      var url = social[key];
      if (!url) return;
      section.querySelectorAll('[data-neo-social-link="' + key + '"]').forEach(function (el) {
        setHref(el, url);
      });
    });

    card.querySelectorAll("[data-neo-social-channel-icon]").forEach(function (img) {
      var key = img.getAttribute("data-neo-social-channel-icon");
      if (key) img.src = socialIconSrc(config, key);
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