(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  function pad(n) {
    return ("00" + n).slice(-3);
  }

  /* ---------- Footer year ---------- */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Events (data lives in assets/js/events.js) ---------- */

  var events = (Array.isArray(window.RTW_EVENTS) ? window.RTW_EVENTS : []).slice();

  // Oldest first, undated (not yet scheduled) last; build numbers follow that order.
  events.sort(function (a, b) {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  });
  events.forEach(function (e, i) {
    e.build = "build #" + pad(i + 1);
    e.slug = "build-" + pad(i + 1);
    e.tag = e.date ? "v" + e.date.slice(0, 7).replace("-", ".") : "unreleased";
  });

  var upcoming = events.filter(function (e) { return e.status === "upcoming"; });
  var past = events.filter(function (e) { return e.status === "past"; }).reverse();
  var next = upcoming[0];

  if (next) {
    document.querySelectorAll("[data-next-date]").forEach(function (el) {
      el.textContent = String(next.dateLabel || "").toLowerCase();
    });
    document.querySelectorAll("[data-next-build]").forEach(function (el) {
      el.textContent = next.build;
    });
  }

  // Hackathons page: the featured next event
  document.querySelectorAll("[data-next]").forEach(function (el) {
    if (!next) return;
    var url = safeUrl(next.url);
    var action = url
      ? '<a class="button" href="' + esc(url) + '" target="_blank" rel="noopener">Register on Devpost</a>'
      : '<p class="next__soon">Registration opens when the theme drops.</p>';
    el.innerHTML =
      '<p class="label"><span class="live"></span>' + esc(next.build) + " &middot; upcoming</p>" +
      '<h2 class="next__title">' + esc(next.theme) + "</h2>" +
      '<dl class="next__meta">' +
        "<div><dt>Date</dt><dd>" + esc(next.dateLabel) + "</dd></div>" +
        "<div><dt>Where</dt><dd>" + esc(next.format) + "</dd></div>" +
        "<div><dt>Entry</dt><dd>Free</dd></div>" +
      "</dl>" +
      '<p class="next__desc">' + esc(next.description) + "</p>" +
      action;
  });

  // Hackathons page head: a directory listing of every build
  document.querySelectorAll("[data-ls]").forEach(function (el) {
    if (!events.length) return;
    var rows = events.slice().reverse().map(function (e) {
      var url = safeUrl(e.url);
      var name = url
        ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(e.slug) + "/</a>"
        : esc(e.slug) + "/";
      var state = e.status === "upcoming" ? '<span class="ls__up">upcoming</span>' : "shipped";
      return (
        '<div class="ls__row">' +
          '<span class="ls__perm">drwxr-xr-x</span>' +
          '<span class="ls__name">' + name + "</span>" +
          '<span class="ls__state">' + state + "</span>" +
          '<span class="ls__date">' + esc(String(e.dateLabel || "").toLowerCase()) + "</span>" +
          '<span class="ls__title">' + esc(e.name) + "</span>" +
        "</div>"
      );
    });
    el.innerHTML = '<div class="ls__cmd"><span class="sigil">$</span> ls -l hackathons/</div>' + rows.join("");
  });

  // Hackathons page: past events as release tags
  document.querySelectorAll("[data-tags]").forEach(function (el) {
    if (!past.length) return;
    el.innerHTML = past.map(function (e) {
      var url = safeUrl(e.url);
      var link = url
        ? '<a class="textlink" href="' + esc(url) + '" target="_blank" rel="noopener">View projects</a>'
        : "";
      return (
        '<li class="release">' +
          '<div class="release__tag"><span class="ref">' + esc(e.tag) + "</span>" + esc(e.build) + "</div>" +
          '<div class="release__body">' +
            "<h3>" + esc(e.name) + "</h3>" +
            "<p>" + esc(e.description) + "</p>" +
          "</div>" +
          '<div class="release__stats">' + esc(e.stats || "") + link + "</div>" +
        "</li>"
      );
    }).join("");
  });

  /* ---------- Headline: noise rewritten into text, left to right ---------- */

  var NOISE = "#%&@$?!*~^<>{}|;";
  document.querySelectorAll("[data-scramble]").forEach(function (el) {
    if (reduce) return;
    var target = el.textContent;
    var start = null;
    var duration = 1400;
    el.setAttribute("aria-label", target);

    function render(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      var settled = Math.floor(p * (target.length + 3)) - 3;
      var html = "";
      for (var i = 0; i < target.length; i++) {
        var ch = target.charAt(i);
        if (ch === " " || i < settled) {
          html += esc(ch);
        } else if (i < settled + 3) {
          html += '<span class="patched">' + esc(ch) + "</span>";
        } else {
          html += '<span class="noise">' + esc(NOISE.charAt((Math.random() * NOISE.length) | 0)) + "</span>";
        }
      }
      el.innerHTML = html;
      if (p < 1) requestAnimationFrame(render);
      else el.textContent = target;
    }
    setTimeout(function () { requestAnimationFrame(render); }, 300);
  });

  /* ---------- Tracks: light one up at a time ---------- */

  var tracks = document.querySelectorAll("[data-tracks] li");
  if (tracks.length && !reduce) {
    var current = -1;
    setInterval(function () {
      if (document.hidden) return;
      if (current >= 0) tracks[current].classList.remove("lit");
      var n;
      do { n = (Math.random() * tracks.length) | 0; } while (n === current && tracks.length > 1);
      current = n;
      tracks[current].classList.add("lit");
    }, 1600);
  }

  /* ---------- Git log: main rail fills in as you scroll past ---------- */

  document.querySelectorAll("[data-gitlog]").forEach(function (wrap) {
    var bar = wrap.querySelector(".gitlog__progress");
    var items = wrap.querySelectorAll("li");
    if (!bar) return;
    if (reduce) {
      bar.style.height = "100%";
      items.forEach(function (li) { li.classList.add("is-lit"); });
      return;
    }
    var ticking = false;
    function update() {
      ticking = false;
      var rect = wrap.getBoundingClientRect();
      var line = window.innerHeight * 0.6;
      var h = Math.max(0, Math.min(rect.height, line - rect.top));
      bar.style.height = h + "px";
      items.forEach(function (li) {
        li.classList.toggle("is-lit", li.offsetTop + 12 <= h);
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ---------- Copy buttons ---------- */

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      function done(msg) {
        btn.textContent = msg;
        setTimeout(function () { btn.textContent = label; }, 1800);
      }
      function fallback() {
        var target = document.getElementById(btn.getAttribute("aria-controls"));
        if (target) {
          var range = document.createRange();
          range.selectNodeContents(target);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          done("Selected, press Ctrl+C");
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done("Copied"); }, fallback);
      } else {
        fallback();
      }
    });
  });
})();
