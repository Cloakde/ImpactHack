/*
 * The hero globe: an orthographic Earth drawn as a grid of code characters.
 * A "refactor pass" sweeps east around the planet. Land just behind the
 * sweep is freshly rewritten (green), then settles into clean code, and
 * slowly decays back into noise (red) before the next pass reaches it.
 * Drag to spin it.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("globe");
  if (!canvas || !window.RTW_LAND) return;
  var ctx = canvas.getContext("2d");

  /* ---- Land mask ---- */
  var MW = 240, MH = 120;
  var raw = atob(window.RTW_LAND);
  var mask = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) mask[i] = raw.charCodeAt(i);

  function landIndex(lon, lat) {
    var x = Math.floor(((lon + 180) / 360) * MW) % MW;
    if (x < 0) x += MW;
    var y = Math.min(MH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * MH)));
    var idx = y * MW + x;
    return (mask[idx >> 3] >> (idx & 7)) & 1 ? idx : -1;
  }

  /* ---- Glyphs ---- */
  var CLEAN = "function refactor(world){for(const problem of world.problems){ship(fix(problem));}return world;}const team=students.filter(cares);await build(team,{month:next});";
  var NOISE = "#%&@$?!*~^<>{}|;";

  function hash(a, b) {
    var h = (a * 374761393 + b * 668265263) | 0;
    h = (h ^ (h >>> 13)) * 1274126177;
    return (h ^ (h >>> 16)) >>> 0;
  }

  /* ---- Colors from CSS tokens ---- */
  var css = getComputedStyle(document.documentElement);
  function token(name, fallback) {
    var v = css.getPropertyValue(name).trim();
    return v || fallback;
  }
  var C_PAPER = token("--paper", "#ece8df");
  var C_ADD = token("--add", "#8ee6b0");
  var C_DEL = token("--del", "#ff7a66");
  var C_FAINT = token("--faint", "#4a515c");

  /* ---- State ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = 1, size = 0, cellW = 8, cellH = 12, fontPx = 11;
  var spin = -20;          // degrees of longitude facing the viewer
  var tilt = 18;           // degrees, north pole tipped toward viewer
  var front = 40;          // longitude of the refactor sweep
  var dragVel = 0;
  var dragging = false, lastX = 0, lastY = 0;
  var visible = true, running = false, lastT = 0;

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = Math.max(200, Math.round(rect.width));
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    fontPx = size < 420 ? 8.5 : size < 620 ? 10 : 11.5;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = "500 " + fontPx + 'px "Martian Mono", ui-monospace, monospace';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    cellW = Math.ceil(ctx.measureText("M").width + 1.5);
    cellH = Math.ceil(fontPx * 1.45);
    draw(0);
  }

  function draw(t) {
    var R = size * 0.46;
    var cx = size / 2, cy = size / 2;
    ctx.clearRect(0, 0, size, size);

    // Atmosphere
    var glow = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.12);
    glow.addColorStop(0, "rgba(142, 230, 176, 0.10)");
    glow.addColorStop(1, "rgba(142, 230, 176, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
    ctx.fill();

    var rad = Math.PI / 180;
    var cosT = Math.cos(tilt * rad), sinT = Math.sin(tilt * rad);
    var tick = Math.floor(t / 110);

    var cols = Math.floor((2 * R) / cellW);
    var rows = Math.floor((2 * R) / cellH);
    var x0 = cx - (cols * cellW) / 2 + cellW / 2;
    var y0 = cy - (rows * cellH) / 2 + cellH / 2;

    for (var r = 0; r < rows; r++) {
      var sy = y0 + r * cellH;
      var py = -(sy - cy) / R;
      for (var c = 0; c < cols; c++) {
        var sx = x0 + c * cellW;
        var px = (sx - cx) / R;
        var d2 = px * px + py * py;
        if (d2 > 1) continue;
        var pz = Math.sqrt(1 - d2);

        // Undo the tilt (rotation about the x axis)
        var y1 = py * cosT + pz * sinT;
        var z1 = -py * sinT + pz * cosT;
        var lat = Math.asin(Math.max(-1, Math.min(1, y1))) / rad;
        var lon = Math.atan2(px, z1) / rad + spin;
        lon = ((lon + 540) % 360) - 180;

        var shade = 0.25 + 0.75 * pz;
        var idx = landIndex(lon, lat);

        if (idx < 0) {
          // Ocean: a faint dot grid that still reads as a sphere
          if ((r + c) % 2 === 0) {
            ctx.globalAlpha = 0.22 * shade;
            ctx.fillStyle = C_FAINT;
            ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
          }
          continue;
        }

        // Degrees since the sweep passed this longitude
        var since = (((front - lon) % 360) + 360) % 360;
        var ch, color, alpha;
        if (since < 22) {
          ch = CLEAN.charAt(idx % CLEAN.length);
          color = C_ADD;
          alpha = shade;
        } else if (since < 230) {
          ch = CLEAN.charAt(idx % CLEAN.length);
          color = C_PAPER;
          alpha = shade * (0.85 - (since - 22) / 230 * 0.35);
        } else {
          var n = hash(idx, tick + (idx % 7));
          ch = NOISE.charAt(n % NOISE.length);
          color = C_DEL;
          alpha = shade * (0.35 + ((n >>> 8) % 40) / 100);
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillText(ch, sx, sy);
      }
    }
    ctx.globalAlpha = 1;

    // Rim
    ctx.strokeStyle = C_FAINT;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R + 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    if (!running) return;
    var dt = lastT ? Math.min(64, now - lastT) : 16;
    lastT = now;
    if (!dragging) {
      spin -= dt * 0.006 + dragVel;
      dragVel *= 0.94;
    }
    front += dt * 0.022;
    draw(now);
    requestAnimationFrame(frame);
  }

  function start() {
    if (reduce || running || !visible || document.hidden) return;
    running = true;
    lastT = 0;
    requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
  }

  /* ---- Drag to spin ---- */
  canvas.addEventListener("pointerdown", function (e) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    dragVel = 0;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    var k = 180 / size;
    spin -= dx * k;
    dragVel = dx * k * 0.25;
    tilt = Math.max(-35, Math.min(45, tilt + dy * k));
    if (!running) draw(performance.now());
  });
  function endDrag() {
    dragging = false;
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  /* ---- Lifecycle ---- */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () {
    document.hidden ? stop() : start();
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }

  var ready = document.fonts && document.fonts.load
    ? document.fonts.load('500 11px "Martian Mono"').catch(function () {})
    : Promise.resolve();
  ready.then(function () {
    resize();
    start();
  });
})();
