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

  function getEmbedRoot() {
    return document.querySelector("[data-neo-wp-embed], .wp-html-module");
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

  function setMenuOpenClass(open) {
    var targets = [document.body, document.documentElement, getEmbedRoot()];
    targets.forEach(function (el) {
      if (!el) return;
      if (open) el.classList.add("neo-menu-open");
      else el.classList.remove("neo-menu-open");
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
      setMenuOpenClass(true);
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
      setMenuOpenClass(false);
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
    var menu = getMenu();
    var menuButton = getMenuButton();
    if (menu && !menu.hasAttribute("aria-hidden")) {
      menu.setAttribute("aria-hidden", menu.classList.contains("neo-mobile-menu--open") ? "false" : "true");
    }
    if (menuButton && !menuButton.hasAttribute("aria-expanded")) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  }

  /* Suppress conflicting WordPress / Elementor theme headers (mobile-layout skill §10). */
  function hideThemeHeaders() {
    var selectors = [
      "header:not(#neo-mobile-header):not(.neo-mobile-header)",
      "#masthead",
      ".site-header",
      ".elementor-location-header",
      ".elementor-header",
      ".et-l--header",
      ".ast-site-header",
      "#header",
      ".header",
      ".top-bar",
      "[data-elementor-type=\"header\"]"
    ];
    selectors.forEach(function (s) {
      document.querySelectorAll(s).forEach(function (el) {
        if (el.id === "neo-mobile-header" || el.id === "neo-desktop-nav") return;
        if (el.closest && el.closest(".neo-page, [data-neo-wp-embed], .wp-html-module")) return;
        el.style.setProperty("display", "none", "important");
      });
    });
  }

  window.toggleNeoMobileMenu = toggleMobileMenu;

  function boot() {
    initScrollNav();
    initMenuA11y();
    hideThemeHeaders();

    document.querySelectorAll("[data-neo-menu-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleMobileMenu();
      });
    });

    /* Also wire onclick-less close buttons / hamburger without data attrs when present */
    var menuBtn = getMenuButton();
    if (menuBtn && !menuBtn.getAttribute("data-neo-menu-toggle") && !menuBtn.getAttribute("onclick")) {
      menuBtn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleMobileMenu();
      });
    }
    var closeBtn = document.querySelector(".neo-mobile-menu__close");
    if (closeBtn && !closeBtn.getAttribute("data-neo-menu-toggle") && !closeBtn.getAttribute("onclick")) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleMobileMenu();
      });
    }

    document.querySelectorAll("[data-neo-menu-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        var menu = getMenu();
        if (menu && menu.classList.contains("neo-mobile-menu--open")) {
          toggleMobileMenu();
        }
      });
    });

    /* Tap the scrim (the drawer container itself, not the panel) to close. */
    var menuEl = getMenu();
    if (menuEl) {
      menuEl.addEventListener("click", function (e) {
        if (e.target === menuEl && isOpen()) {
          setMenuOpen(false);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", hideThemeHeaders);
})();
