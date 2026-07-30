/**
 * Simple gallery lightbox for .neo-gallery grids.
 */
(function () {
  "use strict";

  function ensureLightbox() {
    var existing = document.getElementById("neo-lightbox");
    if (existing) return existing;
    var box = document.createElement("div");
    box.id = "neo-lightbox";
    box.className = "neo-lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image preview");
    box.innerHTML =
      '<button type="button" class="neo-btn neo-btn--secondary neo-lightbox__close" aria-label="Close">Close</button>' +
      '<img class="neo-lightbox__img" alt="">';
    document.body.appendChild(box);
    return box;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lightbox = ensureLightbox();
    var img = lightbox.querySelector(".neo-lightbox__img");
    var closeBtn = lightbox.querySelector(".neo-lightbox__close");

    function close() {
      lightbox.classList.remove("is-open");
      img.src = "";
    }

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    document.querySelectorAll(".neo-gallery__item").forEach(function (button) {
      button.addEventListener("click", function () {
        var source = button.querySelector("img");
        if (!source) return;
        img.src = source.currentSrc || source.src;
        img.alt = source.alt || "";
        lightbox.classList.add("is-open");
      });
    });
  });
})();
