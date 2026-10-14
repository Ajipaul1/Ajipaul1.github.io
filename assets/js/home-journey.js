/* home-journey.js -- the homepage's opening journey (2026-10-14).
   Owner: a cartoon laptop hero (images made by the owner in ChatGPT) told as one continuous camera dive: every
   painting zooms forward into a spot, and the next painting is already waiting inside that spot and grows until
   it fills the screen. Story: arrival -> idea -> two teams apart -> ERP connects them -> unseen talent -> SEO brings
   people -> hidden shop -> website -> TechAuditPros. After the journey the page continues into the existing
   homepage (hero, film, cords...) unchanged. Owner asked for the words to arrive "nicely, slow, one second": the
   lines are time-based transitions (CSS), triggered by the scene, not scrubbed by the scroll.
   Markup + CSS: scripts/country-pages/home_journey.js. Start states only under html.hj-on (added here after the
   reduced-motion check); without it the section shows the final scene, still, with the name and the buttons. */
(function () {
  'use strict';
  var d = document, de = d.documentElement, w = window;
  var root = d.querySelector('.hj'); if (!root) return;
  if (w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  de.classList.add('hj-on');

  // the spot in each painting (fractions of the painting) the camera dives into to reach the next one
  var P = [[0.50, 0.86], [0.53, 0.13], [0.55, 0.25], [0.52, 0.85], [0.60, 0.58], [0.66, 0.14], [0.645, 0.40], [0.49, 0.56], [0.5, 0.5]];
  var Z = 3.4;
  var pin = root.querySelector('.hj-pin'), shots = [].slice.call(root.querySelectorAll('.hj-shot')), N = shots.length;
  var caps = [].slice.call(root.querySelectorAll('.hj-cap')), fin = root.querySelector('.hj-final');
  var bar = root.querySelector('.hj-track i'), hint = root.querySelector('.hj-hint'), skip = root.querySelector('.hj-skip');
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var easeIO = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  // which image size: whatever the browser picked for the first painting
  var first = shots[0].querySelector('img'), big = true;
  function pickSet() { var s = first.currentSrc || first.src || ''; big = s.indexOf('/1536/') < 0; }
  if (first.complete) pickSet(); else first.addEventListener('load', pickSet, { once: true });
  function load(i) {
    var img = shots[i] && shots[i].querySelector('img'); if (!img || img.getAttribute('src')) return;
    img.src = '/assets/images/hero-journey/' + (big ? '2560' : '1536') + '/' + img.getAttribute('data-n') + '.webp';
  }

  // the pin sits under the sticky site header
  var hdr = d.querySelector('.site-header'), L = {};
  function layout() {
    var top = hdr ? Math.round(hdr.getBoundingClientRect().height) : 0;
    root.style.setProperty('--hj-top', top + 'px');
    var W = pin.clientWidth, H = pin.clientHeight, dw, dh;
    if (W / H > 1.5) { dw = W; dh = W / 1.5; } else { dh = H; dw = H * 1.5; }
    L = { W: W, H: H, kx: dw / W, ky: dh / H, top: top };
    sizeMotes();
  }
  function spot(k) { var p = P[k]; return [clamp(0.5 + (p[0] - 0.5) * L.kx, 0.14, 0.86), clamp(0.5 + (p[1] - 0.5) * L.ky, 0.14, 0.86)]; }
  function place(el, tx, ty, s) { el.style.transform = 'translate3d(' + (tx * L.W).toFixed(2) + 'px,' + (ty * L.H).toFixed(2) + 'px,0) scale(' + s.toFixed(5) + ')'; }
  var feathered = [];
  function feather(i, amt) {
    var el = shots[i], key = amt <= 0.001 ? 0 : Math.round(amt * 40);
    if (feathered[i] === key) return; feathered[i] = key;
    if (!key) { el.style.webkitMaskImage = el.style.maskImage = 'none'; return; }
    var a = (amt * 22).toFixed(1) + '%', b = (100 - amt * 22).toFixed(1) + '%';
    var m = 'linear-gradient(to right, transparent 0, #000 ' + a + ', #000 ' + b + ', transparent 100%), linear-gradient(to bottom, transparent 0, #000 ' + a + ', #000 ' + b + ', transparent 100%)';
    el.style.webkitMaskImage = el.style.maskImage = m; el.style.webkitMaskComposite = 'source-in'; el.style.maskComposite = 'intersect';
  }

  // golden motes rushing outward from the dive point
  var cv = root.querySelector('.hj-motes'), ctx = cv.getContext('2d'), dpr = Math.min(w.devicePixelRatio || 1, 2), motes = [];
  function sizeMotes() { cv.width = Math.round(pin.clientWidth * dpr); cv.height = Math.round(pin.clientHeight * dpr); }
  for (var m = 0; m < 70; m++) motes.push({ a: Math.random() * 6.283, r: Math.random(), z: 0.5 + Math.random(), s: 0.6 + Math.random() * 2, ph: Math.random() * 6.28 });

  layout(); w.addEventListener('resize', layout);
  for (var i = 0; i < 3; i++) load(i);

  function progress() { var r = root.getBoundingClientRect(), span = r.height - (w.innerHeight - L.top); return span > 0 ? clamp((L.top - r.top) / span, 0, 1) : 1; }

  var lastF = 0, activeCap = -2, finOn = false;
  function render(p, now) {
    var f = p * N, k = Math.min(N - 1, Math.floor(f)), t = k < N - 1 ? f - k : 0;
    load(k + 1); load(k + 2);
    shots.forEach(function (el, i) { if (i !== k && i !== k + 1) el.style.opacity = 0; });
    if (k < N - 1) {
      var tt = easeIO(t) * 0.35 + t * 0.65, s = Math.pow(Z, tt), Pk = spot(k);
      var g = (1 - Math.pow(Z, -tt)) / (1 - 1 / Z), cx = 0.5 + (Pk[0] - 0.5) * g, cy = 0.5 + (Pk[1] - 0.5) * g;
      place(shots[k], 0.5 - cx * s, 0.5 - cy * s, s);
      shots[k].style.opacity = (1 - clamp((tt - 0.82) / 0.18, 0, 1)).toFixed(3); feather(k, 0);
      place(shots[k + 1], (Pk[0] - 0.5 / Z - cx) * s + 0.5, (Pk[1] - 0.5 / Z - cy) * s + 0.5, s / Z);
      shots[k + 1].style.opacity = clamp((tt - 0.06) / 0.3, 0, 1).toFixed(3);
      feather(k + 1, 1 - clamp((tt - 0.55) / 0.4, 0, 1));
    } else {
      var e0 = clamp(f - (N - 1), 0, 1), fs = 1 + 0.05 * e0;
      place(shots[N - 1], 0.5 - 0.5 * fs, 0.5 - 0.5 * fs, fs); shots[N - 1].style.opacity = 1; feather(N - 1, 0);
    }
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';

    // words: one scene at a time, each line arriving over about a second (CSS transitions)
    var want = -1;
    for (var c = 0; c < caps.length; c++) { var local = f - c; if (local > -0.06 && local < 0.72) want = c; }
    if (want !== activeCap) { caps.forEach(function (el, j) { el.classList.toggle('on', j === want); }); activeCap = want; }
    var finWant = f > N - 1 + 0.06;
    if (finWant !== finOn) { fin.classList.toggle('on', finWant); root.classList.toggle('hj-end', finWant); finOn = finWant; }

    // motes
    var speed = clamp(Math.abs(f - lastF) * 60, 0, 3); lastF = f;
    var P2 = k < N - 1 ? spot(k) : [0.5, 0.5];
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, L.W, L.H);
    motes.forEach(function (o) {
      o.r += (0.0005 + speed * 0.012) * o.z; if (o.r > 1.15) { o.r = 0.02 + Math.random() * 0.1; o.a = Math.random() * 6.283; }
      var R = o.r * Math.max(L.W, L.H) * 0.75, x = P2[0] * L.W + Math.cos(o.a) * R, y = P2[1] * L.H + Math.sin(o.a) * R;
      var tw = 0.55 + 0.45 * Math.sin(now / 800 + o.ph);
      ctx.fillStyle = 'rgba(255,214,150,' + (0.5 * tw * clamp(o.r * 3, 0, 1)).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(x, y, o.s * o.z * (0.5 + o.r), 0, 6.283); ctx.fill();
    });
    hint.style.opacity = clamp(1 - f / 0.12, 0, 1).toFixed(3);
  }

  // smooth-wheel (Lenis) already glides the page on a mouse; elsewhere add a little inertia of our own
  var cur = 0, running = false;
  function frame(now) {
    var r = root.getBoundingClientRect();
    if (r.bottom < -50 || r.top > w.innerHeight + 50) { running = false; return; }   // off screen: stop drawing
    var target = progress();
    cur = de.classList.contains('lenis') ? target : cur + (target - cur) * 0.12;
    if (Math.abs(target - cur) < 0.00004) cur = target;
    render(Math.min(cur, 0.99999), now);
    requestAnimationFrame(frame);
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
  w.addEventListener('scroll', kick, { passive: true });
  cur = progress(); kick();
})();
