/**
 * Neo Salon — demo booking form handler (replace with Elementor Form on go-live).
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("rgl-booking-form");
    var thanks = document.getElementById("rgl-booking-thanks");
    var select = document.getElementById("rgl-treatment-select");
    var treatment = new URLSearchParams(window.location.search).get("treatment");

    if (select && treatment && select.querySelector('option[value="' + treatment + '"]')) {
      select.value = treatment;
    }

    if (!form || !thanks) return;

    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) return;
      event.preventDefault();
      form.hidden = true;
      thanks.hidden = false;
      thanks.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
})();
