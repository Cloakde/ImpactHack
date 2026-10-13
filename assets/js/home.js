(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Next hackathon date in the status bar, from assets/js/events.js */
  var events = Array.isArray(window.RTW_EVENTS) ? window.RTW_EVENTS : [];
  var next = events
    .filter(function (e) { return e.status === "upcoming"; })
    .sort(function (a, b) {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date < b.date ? -1 : 1;
    })[0];
  if (next && next.dateLabel) {
    document.querySelectorAll("[data-next-date]").forEach(function (el) {
      el.textContent = next.dateLabel.toLowerCase();
    });
  }

  /* Headline: "the world." starts as noise and is rewritten left to right */
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
          html += ch;
        } else if (i < settled + 3) {
          html += '<span class="patched">' + ch + "</span>";
        } else {
          html += '<span class="noise">' + NOISE.charAt((Math.random() * NOISE.length) | 0) + "</span>";
        }
      }
      el.innerHTML = html;
      if (p < 1) requestAnimationFrame(render);
      else el.textContent = target;
    }
    setTimeout(function () { requestAnimationFrame(render); }, 350);
  });

  /* Tracks: light one up at a time */
  var tracks = document.querySelectorAll("[data-tracks] li");
  if (tracks.length && !reduce) {
    var current = -1;
    setInterval(function () {
      if (document.hidden) return;
      if (current >= 0) tracks[current].classList.remove("lit");
      var n;
      do { n = (Math.random() * tracks.length) | 0; } while (n === current);
      current = n;
      tracks[current].classList.add("lit");
    }, 1600);
  }
})();
