/* home-globe.js -- homepage hero: a short intro and a dotted globe (2026-10-13).
   Owner: "on the homepage hero section can I have an animation introduction, only the hero, like
   austinwerner.io ... change the hero background ... all the rest is the same as now". Their intro is a
   rendered 3D film of a statue in an LED visor; ours is drawn live on one canvas, in our own terms:
     0.15s  an LED visor of dots lights up and spells TA (the logo mark), a scan line passes
     1.0s   we fly through the visor into a dotted Earth held close on Kochi
     1.1s   the hero copy rises in (it is in the HTML from the start; only its opacity waits)
     1.3s   the camera pulls back to the whole globe
     1.9s   arcs leave Kochi for the five markets abroad, each landing with its name
   then the globe sways between India and the Atlantic, follows the pointer a little, and pulses an arc
   now and then. First visit per tab session only (an inline head script sets html.vs-intro before first
   paint); "Skip intro" ends it at once; repeat visits get the pull-back with the copy already showing.
   Reduced motion: one still frame of the finished globe, no intro. Land dots: home-globe-dots.js
   (Natural Earth, public domain). Draws only while the hero is on screen. */
(function () {
  'use strict';
  var d = document, de = d.documentElement, w = window;
  var hero = d.querySelector('.tap-new-hero');
  function release() { de.classList.add('vs-intro-text'); setTimeout(function () { de.classList.remove('vs-intro', 'vs-intro-text'); }, 1600); }
  if (!hero || !w.TAP_GLOBE_DOTS || !d.createElement('canvas').getContext) { release(); return; }
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = de.classList.contains('vs-intro') && !reduce;
  if (!intro) de.classList.remove('vs-intro');
  try { sessionStorage.setItem('tapIntro', '1'); } catch (e) {}
  de.classList.add('vs-globe');
  var kids = hero.querySelectorAll('.hero-main-content > *');
  for (var q = 0; q < kids.length; q++) kids[q].style.setProperty('--hi', q);

  /* ---------- data ---------- */
  var RAD = Math.PI / 180, B = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', M = {};
  for (var b = 0; b < 64; b++) M[B[b]] = b;
  function vec(lat, lon) { lat *= RAD; lon *= RAD; return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)]; }
  var S = w.TAP_GLOBE_DOTS, n = S.length / 4, X = new Float32Array(n), Y = new Float32Array(n), Z = new Float32Array(n), HOME = new Float32Array(n);
  var KOCHI = { lat: 9.93, lon: 76.27 }, K = vec(KOCHI.lat, KOCHI.lon);
  for (var i = 0; i < n; i++) {
    var la = ((M[S[i * 4]] << 6 | M[S[i * 4 + 1]]) - 900) / 10, lo = ((M[S[i * 4 + 2]] << 6 | M[S[i * 4 + 3]]) - 1800) / 10, v = vec(la, lo);
    X[i] = v[0]; Y[i] = v[1]; Z[i] = v[2];
    var ang = Math.acos(Math.max(-1, Math.min(1, v[0] * K[0] + v[1] * K[1] + v[2] * K[2]))) / RAD;
    HOME[i] = Math.max(0, 1 - ang / 11);
  }
  var MARKETS = [['USA', 40.71, -74.0], ['CANADA', 43.65, -79.38], ['UK', 51.51, -0.13], ['UAE', 25.2, 55.27], ['AUSTRALIA', -33.87, 151.21]].map(function (m) { return { name: m[0], v: vec(m[1], m[2]) }; });
  // T and A in a 5x7 dot font, for the visor
  var GLYPH = { T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'], A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'] };

  /* ---------- canvas + layout ---------- */
  var cv = d.createElement('canvas'); cv.className = 'vs-globe-cv'; cv.setAttribute('aria-hidden', 'true');
  hero.insertBefore(cv, hero.firstChild);
  var ctx = cv.getContext('2d'), dpr = Math.min(w.devicePixelRatio || 1, 2), W = 0, H = 0, L = {};
  function layout() {
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + 'px'; cv.style.height = H + 'px';
    var vh = w.innerHeight, top = hero.getBoundingClientRect().top + w.scrollY;
    if (W >= 1024) L = { cx: W * .765, cy: Math.min(H * .5, (vh - top) * .55 + 20), R: Math.min(H * .42, W * .23, 390), fade: 1, dot: 1 };
    else if (W >= 768) L = { cx: W * .74, cy: H * .3, R: W * .3, fade: .5, dot: .9 };
    else L = { cx: W * .62, cy: Math.min(H * .22, vh * .3), R: W * .46, fade: .42, dot: .8 };
  }
  layout();

  /* ---------- drawing ---------- */
  var view = { lon: KOCHI.lon, lat: KOCHI.lat, R: 1, cx: 0, cy: 0, a: 0 };
  function project(p, out) {
    var cl = Math.cos(view.lon * RAD), sl = Math.sin(view.lon * RAD), cp = Math.cos(view.lat * RAD), sp = Math.sin(view.lat * RAD);
    var x1 = p[0] * cl - p[2] * sl, z1 = p[0] * sl + p[2] * cl, y2 = p[1] * cp - z1 * sp, z2 = p[1] * sp + z1 * cp;
    out[0] = view.cx + x1 * view.R; out[1] = view.cy - y2 * view.R; out[2] = z2; out[3] = x1; out[4] = y2; return out;
  }
  var tmp = [0, 0, 0, 0, 0], BUCK = 7, paths = [];
  function drawGlobe(alpha) {
    if (alpha <= 0) return;
    var cx = view.cx, cy = view.cy, R = view.R;
    var g = ctx.createRadialGradient(cx - R * .3, cy - R * .35, R * .1, cx, cy, R * 1.25);
    g.addColorStop(0, 'rgba(40,78,110,' + (.38 * alpha) + ')'); g.addColorStop(.75, 'rgba(11,32,54,' + (.55 * alpha) + ')'); g.addColorStop(1, 'rgba(11,32,54,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, 7); ctx.fill();
    var halo = ctx.createRadialGradient(cx, cy, R * .92, cx, cy, R * 1.16);   // atmosphere
    halo.addColorStop(0, 'rgba(156,195,228,' + (.2 * alpha) + ')'); halo.addColorStop(1, 'rgba(156,195,228,0)');
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(156,195,228,' + (.3 * alpha) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    var cl = Math.cos(view.lon * RAD), sl = Math.sin(view.lon * RAD), cp = Math.cos(view.lat * RAD), sp = Math.sin(view.lat * RAD);
    for (var k = 0; k < BUCK; k++) paths[k] = [];
    var hot = [], s0 = Math.max(1.6, R / 135) * L.dot;
    for (var i = 0; i < n; i++) {
      var x1 = X[i] * cl - Z[i] * sl, z1 = X[i] * sl + Z[i] * cl, y2 = Y[i] * cp - z1 * sp, z2 = Y[i] * sp + z1 * cp;
      if (z2 <= .02) continue;
      var sx = cx + x1 * R, sy = cy - y2 * R;
      if (sx < -4 || sx > W + 4 || sy < -4 || sy > H + 4) continue;
      if (HOME[i] > 0) { hot.push(sx, sy, z2, HOME[i]); continue; }
      paths[Math.min(BUCK - 1, (z2 * BUCK) | 0)].push(sx, sy);
    }
    for (k = 0; k < BUCK; k++) {
      var pk = paths[k]; if (!pk.length) continue;
      var zf = (k + .5) / BUCK, sz = s0 * (.6 + .55 * zf);
      ctx.fillStyle = 'rgba(205,224,240,' + ((.2 + .78 * zf) * alpha).toFixed(3) + ')';
      ctx.beginPath();
      for (var j = 0; j < pk.length; j += 2) ctx.rect(pk[j] - sz / 2, pk[j + 1] - sz / 2, sz, sz);
      ctx.fill();
    }
    for (j = 0; j < hot.length; j += 4) {   // Kerala and the coast around it glow orange
      var h = hot[j + 3], zz = hot[j + 2], s = s0 * (.7 + .7 * h) * (.6 + .5 * zz);
      ctx.fillStyle = 'rgba(' + Math.round(191 + 64 * h) + ',' + Math.round(214 - 100 * h) + ',' + Math.round(234 - 180 * h) + ',' + ((.25 + .7 * zz) * alpha).toFixed(3) + ')';
      ctx.fillRect(hot[j] - s / 2, hot[j + 1] - s / 2, s, s);
    }
  }
  function slerpArc(a, b, t, alt, out) {
    var dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), om = Math.acos(dot), so = Math.sin(om) || 1;
    var ka = Math.sin((1 - t) * om) / so, kb = Math.sin(t * om) / so, r = 1 + alt * Math.sin(Math.PI * t);
    out[0] = (a[0] * ka + b[0] * kb) * r; out[1] = (a[1] * ka + b[1] * kb) * r; out[2] = (a[2] * ka + b[2] * kb) * r; return out;
  }
  var pa = [0, 0, 0], pp = [0, 0, 0, 0, 0];
  function visible(pr) { return pr[2] > 0; }
  function drawArc(m, prog, alpha, pulse) {
    if (prog <= 0 || alpha <= 0) return;
    var om = Math.acos(Math.max(-1, Math.min(1, K[0] * m.v[0] + K[1] * m.v[1] + K[2] * m.v[2]))), alt = .05 + .13 * om / Math.PI, steps = 64;
    ctx.lineWidth = 1.3; ctx.lineCap = 'round';
    var prev = null;
    for (var s = 0; s <= steps * prog; s++) {
      project(slerpArc(K, m.v, s / steps, alt, pa), pp);
      var vis = visible(pp);
      if (prev && vis && prev[2]) {
        var t = s / steps, glow = pulse >= 0 ? Math.max(0, 1 - Math.abs(t - pulse) * 9) : 0;
        var hz = Math.min(1, pp[2] * 5);
        ctx.strokeStyle = 'rgba(' + Math.round(156 + 99 * glow) + ',' + Math.round(195 - 40 * glow) + ',' + Math.round(228 - 150 * glow) + ',' + (alpha * hz * (.55 + .45 * glow)).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(pp[0], pp[1]); ctx.stroke();
      }
      prev = [pp[0], pp[1], vis];
    }
    if (prog >= 1) {   // landing: a dot and the market's name
      project(m.v, pp);
      if (pp[2] > .05) {
        var la = alpha * Math.min(1, pp[2] * 3);
        ctx.fillStyle = 'rgba(255,255,255,' + la.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(pp[0], pp[1], 2.6, 0, 7); ctx.fill();
        ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.fillStyle = 'rgba(234,240,244,' + (la * .85).toFixed(3) + ')';
        ctx.fillText(m.name, pp[0] + 8, pp[1] - 7);
      }
    }
  }
  function drawHome(alpha, now) {
    project(K, pp); if (pp[2] <= 0 || alpha <= 0) return;
    var ph = (now % 2200) / 2200;
    ctx.strokeStyle = 'rgba(217,83,30,' + ((1 - ph) * .9 * alpha).toFixed(3) + ')'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(pp[0], pp[1], 4 + ph * 18, 0, 7); ctx.stroke();
    ctx.fillStyle = 'rgba(255,138,76,' + alpha + ')'; ctx.beginPath(); ctx.arc(pp[0], pp[1], 3.4, 0, 7); ctx.fill();
    ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.fillStyle = 'rgba(255,170,130,' + (alpha * .95).toFixed(3) + ')';
    ctx.fillText('KOCHI', pp[0] + 9, pp[1] + 14);
  }
  function drawVisor(t, out) {   // t 0..1 build, out 0..1 fly-through
    if (out >= 1) return;
    var cols = 35, rows = 11, cell = Math.max(6, Math.min(13, L.R / 22, W * .84 / (cols + 3))), vw = cols * cell, vh = rows * cell;
    var cx = W < 768 ? W / 2 : L.cx, cy = L.cy, sc = 1 + out * 1.6, a = 1 - out;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc);
    var r = vh / 2;
    ctx.fillStyle = 'rgba(6,16,26,' + (.92 * a) + ')'; ctx.strokeStyle = 'rgba(156,195,228,' + (.35 * a) + ')'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-vw / 2 - r * .4 + r, -vh / 2 - cell);
    ctx.arcTo(vw / 2 + r * .4, -vh / 2 - cell, vw / 2 + r * .4, vh / 2 + cell, r); ctx.arcTo(vw / 2 + r * .4, vh / 2 + cell, -vw / 2 - r * .4, vh / 2 + cell, r);
    ctx.arcTo(-vw / 2 - r * .4, vh / 2 + cell, -vw / 2 - r * .4, -vh / 2 - cell, r); ctx.arcTo(-vw / 2 - r * .4, -vh / 2 - cell, vw / 2, -vh / 2 - cell, r);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    var lit = {}, gx = Math.floor((cols - 11) / 2), gy = 2;
    ['T', 'A'].forEach(function (ch, gi) { GLYPH[ch].forEach(function (row, ry) { for (var rx = 0; rx < 5; rx++) if (row[rx] === '1') lit[(gx + gi * 6 + rx) + ',' + (gy + ry)] = 1; }); });
    var scan = -2 + t * (cols + 4);
    for (var cy2 = 0; cy2 < rows; cy2++) for (var cx2 = 0; cx2 < cols; cx2++) {
      var appear = Math.max(0, Math.min(1, t * 2.4 - (cx2 / cols) * 1.2 - ((cx2 * 7 + cy2 * 13) % 5) * .04));
      if (!appear) continue;
      var x = -vw / 2 + (cx2 + .5) * cell, y = -vh / 2 + (cy2 + .5) * cell, isLit = lit[cx2 + ',' + cy2] && cx2 < scan, near = Math.max(0, 1 - Math.abs(cx2 - scan) / 1.6);
      if (isLit) { ctx.fillStyle = 'rgba(255,128,70,' + a + ')'; ctx.shadowColor = 'rgba(255,110,50,' + a + ')'; ctx.shadowBlur = cell * .9; }
      else { ctx.fillStyle = 'rgba(191,214,234,' + ((.16 + .7 * near) * appear * a).toFixed(3) + ')'; ctx.shadowBlur = 0; }
      var s = isLit ? cell * .62 : cell * .26;
      ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
    ctx.shadowBlur = 0; ctx.restore();
  }

  /* ---------- timeline ---------- */
  var t0 = performance.now(), skip = null, ended = !intro, textShown = !intro, mx = 0, tmx = 0;
  if (intro) {
    skip = d.createElement('button'); skip.type = 'button'; skip.className = 'vs-skip'; skip.innerHTML = 'Skip intro <span aria-hidden="true">&rarr;</span>';
    skip.addEventListener('click', function () { t0 = performance.now() - 3200; });
    hero.appendChild(skip);
  } else t0 = performance.now() - (reduce ? 99999 : 1800);   // repeat visit: only the last of the pull-back, then the arcs
  if (w.matchMedia('(hover: hover) and (pointer: fine)').matches) w.addEventListener('pointermove', function (e) { tmx = e.clientX / w.innerWidth * 2 - 1; }, { passive: true });
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIO(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function seg(x, a, b2) { return Math.max(0, Math.min(1, (x - a) / (b2 - a))); }
  var IDLE_LON = 70;
  var running = false;
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
  function frame(now) {
    var e = now - t0, vis = hero.getBoundingClientRect(), q = Math.max(0, Math.min(1, -vis.top / Math.max(1, vis.height)));
    if (!textShown && e > 1100) { textShown = true; release(); }
    if (!ended && e > 3000) { ended = true; if (skip) { skip.classList.add('gone'); setTimeout(function () { skip.remove(); }, 600); } }
    if (q >= 1 && ended) { running = false; return; }   // hero scrolled away: stop until it comes back
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    var pull = easeIO(seg(e, 1000, 2200)), gIn = seg(e, 950, 1400);
    mx += (tmx - mx) * .04;
    var idle = Math.max(0, e - 2200) / 1000, sway = 27 + 43 * Math.cos(idle * 2 * Math.PI / 52 + Math.acos((IDLE_LON - 27) / 43));
    view.lon = pull < 1 ? KOCHI.lon + (IDLE_LON - KOCHI.lon) * pull : sway; view.lon += mx * 6 * pull;
    view.lat = KOCHI.lat + (18 - KOCHI.lat) * pull;
    view.R = L.R * (3.4 - 2.4 * pull); view.cx = L.cx; view.cy = L.cy - q * 70;
    var alpha = gIn * L.fade * (1 - q * .9);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
    drawGlobe(alpha);
    for (var m = 0; m < MARKETS.length; m++) {
      var start = 1900 + m * 150, prog = ease(seg(e, start, start + 700)), cyc = ((idle * 1000 - m * 900) % 6000) / 1400;
      drawArc(MARKETS[m], prog, alpha * .9, e > 3000 && cyc >= 0 && cyc <= 1 ? cyc : -1);
    }
    drawHome(alpha * seg(e, 1300, 1700), now);
    ctx.restore();
    if (intro) drawVisor(seg(e, 150, 950), seg(e, 950, 1350));
    if (!reduce) requestAnimationFrame(frame); else running = false;
  }
  w.addEventListener('resize', function () { layout(); kick(); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(kick);
  kick();
  // the loop stops while the hero is scrolled away; scrolling back starts it again (only ever one loop)
  w.addEventListener('scroll', function () { if (!reduce && hero.getBoundingClientRect().bottom > 0) kick(); }, { passive: true });
})();
