/**
 * Pointer-reactive conic border glow for .neo-price-card (vanilla port of GlowingEffect).
 */
(function () {
  "use strict";

  var cards = document.querySelectorAll(".neo-price-card");
  if (!cards.length) return;

  var reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var hoverMq = window.matchMedia("(hover: hover)");

  var inactiveZone = 0.45;
  var proximity = 64;
  var spread = 24;
  var movementDuration = 1.4;
  var borderWidth = 1.5;

  var lastPosition = { x: 0, y: 0 };
  var rafId = 0;
  var instances = [];
  var listening = false;

  function cubicBezierEase(t) {
    var p1x = 0.16;
    var p1y = 1;
    var p2x = 0.3;
    var p2y = 1;
    var cx = 3 * p1x;
    var bx = 3 * (p2x - p1x) - cx;
    var ax = 1 - cx - bx;
    var cy = 3 * p1y;
    var by = 3 * (p2y - p1y) - cy;
    var ay = 1 - cy - by;
    var sample = t;
    for (var i = 0; i < 8; i++) {
      var x = ((ax * sample + bx) * sample + cx) * sample - t;
      if (Math.abs(x) < 0.001) break;
      var dx = (3 * ax * sample + 2 * bx) * sample + cx;
      if (Math.abs(dx) < 0.0001) break;
      sample -= x / dx;
    }
    return ((ay * sample + by) * sample + cy) * sample;
  }

  function animateAngle(track, from, to) {
    if (track._animFrame) {
      cancelAnimationFrame(track._animFrame);
      track._animFrame = 0;
    }

    var start = performance.now();
    var durationMs = movementDuration * 1000;
    var diff = ((to - from + 180) % 360) - 180;
    var target = from + diff;

    function tick(now) {
      var t = Math.min(1, (now - start) / durationMs);
      var eased = cubicBezierEase(t);
      var value = from + (target - from) * eased;
      track.style.setProperty("--start", String(value));
      if (t < 1) {
        track._animFrame = requestAnimationFrame(tick);
      } else {
        track._animFrame = 0;
      }
    }

    track._animFrame = requestAnimationFrame(tick);
  }

  function createGlow(card) {
    if (card.closest(".neo-price-card-shell")) return null;

    var shell = document.createElement("div");
    shell.className = "neo-price-card-shell";
    if (card.classList.contains("neo-price-card--wide")) {
      shell.classList.add("neo-price-card-shell--wide");
    }
    if (card.id) {
      shell.id = card.id + "-shell";
    }
    if (card.parentNode) {
      card.parentNode.insertBefore(shell, card);
    }
    shell.appendChild(card);

    var track = document.createElement("div");
    track.className = "neo-glow-effect";
    track.setAttribute("aria-hidden", "true");
    track.style.setProperty("--blur", "0px");
    track.style.setProperty("--spread", String(spread));
    track.style.setProperty("--start", "0");
    track.style.setProperty("--active", "0");
    track.style.setProperty("--glowingeffect-border-width", borderWidth + "px");
    track.style.setProperty("--repeating-conic-gradient-times", "5");

    var glow = document.createElement("div");
    glow.className = "neo-glow-effect__glow";
    track.appendChild(glow);
    shell.appendChild(track);

    return {
      card: card,
      shell: shell,
      track: track,
    };
  }

  function handleMove(e) {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(function () {
      rafId = 0;
      var mouseX = e && typeof e.x === "number" ? e.x : lastPosition.x;
      var mouseY = e && typeof e.y === "number" ? e.y : lastPosition.y;

      if (e && typeof e.x === "number") {
        lastPosition.x = mouseX;
        lastPosition.y = mouseY;
      }

      instances.forEach(function (instance) {
        var track = instance.track;
        var rect = instance.shell.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        var left = rect.left;
        var top = rect.top;
        var centerX = left + width * 0.5;
        var centerY = top + height * 0.5;
        var distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
        var inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          track.style.setProperty("--active", "0");
          return;
        }

        var isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        track.style.setProperty("--active", isActive ? "1" : "0");
        if (!isActive) return;

        var targetAngle =
          (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;

        var currentAngle =
          parseFloat(track.style.getPropertyValue("--start")) || 0;
        animateAngle(track, currentAngle, targetAngle);
      });
    });
  }

  function startListening() {
    if (listening) return;
    window.addEventListener("scroll", handleMove, { passive: true });
    document.body.addEventListener("pointermove", handleMove, { passive: true });
    listening = true;
  }

  function stopListening() {
    if (!listening) return;
    window.removeEventListener("scroll", handleMove);
    document.body.removeEventListener("pointermove", handleMove);
    listening = false;
  }

  function enable() {
    instances = Array.prototype.map.call(cards, createGlow).filter(Boolean);
    if (!instances.length) return;
    startListening();
  }

  function disable() {
    stopListening();
    instances.forEach(function (instance) {
      if (instance.shell && instance.card) {
        instance.shell.parentNode.insertBefore(instance.card, instance.shell);
        instance.shell.remove();
      }
    });
    instances = [];
  }

  function refresh() {
    if (reducedMotionMq.matches || !hoverMq.matches) {
      disable();
      return;
    }
    disable();
    enable();
  }

  if (!reducedMotionMq.matches && hoverMq.matches) {
    enable();
  }

  reducedMotionMq.addEventListener("change", refresh);
  hoverMq.addEventListener("change", refresh);
})();
