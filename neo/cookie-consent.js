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
