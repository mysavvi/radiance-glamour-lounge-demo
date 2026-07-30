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
