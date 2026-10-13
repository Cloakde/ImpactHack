(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */

  function storeTheme(theme) {
    try {
      localStorage.setItem("rtw-theme", theme);
    } catch (e) {
      /* storage unavailable: theme just won't persist */
    }
  }

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      storeTheme(next);
    });
  });

  /* ---------- Mobile menu ---------- */

  var menuBtn = document.querySelector(".menu-toggle");
  var menu = document.getElementById("nav-links");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Footer year ---------- */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Events ---------- */

  var events = Array.isArray(window.RTW_EVENTS) ? window.RTW_EVENTS : [];

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeUrl(url) {
    return /^https?:\/\//i.test(url || "") ? url : null;
  }

  // Undated events sort after dated ones.
  function byDate(a, b) {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  }

  var upcoming = events.filter(function (e) { return e.status === "upcoming"; }).sort(byDate);
  var past = events.filter(function (e) { return e.status === "past"; }).sort(byDate).reverse();

  function renderUpcoming(ev) {
    var url = safeUrl(ev.url);
    var action = url
      ? '<a class="btn btn--primary" href="' + esc(url) + '" target="_blank" rel="noopener">register_now</a>'
      : '<a class="btn btn--ghost" href="#" aria-disabled="true" tabindex="-1">registration_opens_soon</a>';

    return (
      '<article class="event">' +
        "<div>" +
          '<div class="event__status">upcoming</div>' +
          "<h3>" + esc(ev.name) + "</h3>" +
          '<div class="event__meta">' +
            "<span>" + esc(ev.dateLabel) + "</span>" +
            "<span>" + esc(ev.format) + "</span>" +
            "<span>" + esc(ev.theme) + "</span>" +
          "</div>" +
          "<p>" + esc(ev.description) + "</p>" +
        "</div>" +
        "<div>" + action + "</div>" +
      "</article>"
    );
  }

  function renderPast(ev) {
    var url = safeUrl(ev.url);
    var name = url
      ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(ev.name) + "</a>"
      : esc(ev.name);

    return (
      "<li>" +
        '<span class="past-list__date">' + esc(ev.dateLabel) + "</span>" +
        "<span>" +
          '<span class="past-list__name">' + name + "</span>" +
          '<span class="past-list__desc">' + esc(ev.description) + "</span>" +
        "</span>" +
        '<span class="past-list__stats">' + esc(ev.stats || "") + "</span>" +
      "</li>"
    );
  }

  document.querySelectorAll('[data-events="next"]').forEach(function (el) {
    if (upcoming.length) el.innerHTML = renderUpcoming(upcoming[0]);
  });

  document.querySelectorAll('[data-events="upcoming"]').forEach(function (el) {
    if (upcoming.length) el.innerHTML = upcoming.map(renderUpcoming).join("");
  });

  document.querySelectorAll('[data-events="past"]').forEach(function (el) {
    if (past.length) el.innerHTML = '<ul class="past-list">' + past.map(renderPast).join("") + "</ul>";
  });
})();
