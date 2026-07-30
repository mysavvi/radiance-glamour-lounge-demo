/**
 * Interactive folder gallery — vanilla port of the folder stack UI.
 */
(function () {
  "use strict";

  function boot() {
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
      photoW = Math.min(280, Math.max(200, Math.round(stageW * 0.72)));
      photoH = Math.round(photoW * 1.2);
      /* Increase spread on mobile so adjacent cards are clearly visible */
      openSpread = Math.min(80, Math.max(40, Math.round(stageW * 0.18)));
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
        x = offset * (m.mobileView ? 8 : m.narrow ? 18 : 30);
        rot = offset * (m.mobileView ? 5 : 8);
        scale = 1 - Math.abs(offset) * 0.03;
        z = i + 10;
      } else {
        y = offset * -8 - 28;
        x = offset * (m.mobileView ? 6 : m.narrow ? 14 : 22);
        rot = offset * (m.mobileView ? 3 : m.narrow ? 6 : 5);
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

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
