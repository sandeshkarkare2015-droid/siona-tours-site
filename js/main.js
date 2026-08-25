// Siona Tours — shared UI behaviour (mobile nav, sticky header, scroll reveal, WhatsApp links)

var SIONA_WHATSAPP_NUMBER = "919404735713";

function buildWhatsAppLink(message) {
  return "https://wa.me/" + SIONA_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

document.addEventListener("DOMContentLoaded", function () {
  // Any element with data-wa="<message text>" gets its href built here,
  // so every WhatsApp link is generated consistently and safely encoded.
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.setAttribute("href", buildWhatsAppLink(el.getAttribute("data-wa")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var navOverlay = document.querySelector(".nav-overlay");

  function closeNav() {
    navToggle.classList.remove("open");
    mainNav.classList.remove("open");
    navOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function toggleNav() {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navOverlay.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (navToggle && mainNav && navOverlay) {
    navToggle.addEventListener("click", toggleNav);
    navOverlay.addEventListener("click", closeNav);
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
