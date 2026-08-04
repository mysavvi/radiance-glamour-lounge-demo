/**
 * Client-side form validation for Neo contact forms.
 * Attach to forms with class .neo-form--validate
 */
(function () {
  "use strict";

  function showError(input, message) {
    var wrap = input.closest(".neo-input-wrap") || input.parentElement;
    var err = wrap && wrap.querySelector(".neo-input-error");
    if (!err) {
      err = document.createElement("p");
      err.className = "neo-input-error";
      err.setAttribute("role", "alert");
      wrap.appendChild(err);
    }
    err.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    var wrap = input.closest(".neo-input-wrap") || input.parentElement;
    var err = wrap && wrap.querySelector(".neo-input-error");
    if (err) err.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  function validateField(input) {
    if (input.required && !input.value.trim()) {
      showError(input, "This field is required.");
      return false;
    }
    if (input.type === "email" && input.value) {
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      if (!ok) {
        showError(input, "Enter a valid email address.");
        return false;
      }
    }
    clearError(input);
    return true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".neo-form--validate").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        var valid = true;
        form.querySelectorAll("input, textarea, select").forEach(function (input) {
          if (!validateField(input)) valid = false;
        });
        if (!valid) event.preventDefault();
      });
      form.querySelectorAll("input, textarea").forEach(function (input) {
        input.addEventListener("blur", function () {
          validateField(input);
        });
      });
    });
  });
})();
