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
