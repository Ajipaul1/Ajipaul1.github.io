/* kerala-film.js -- /in/kerala/ film layer (2026-10-13). Markup + CSS come from
   scripts/country-pages/in_kerala_film.js; this file loads the films and moves things.
   Videos: the phone or desktop cut is chosen by viewport, each file is fetched only as its chapter nears and
   plays only while it is on screen. Reduced motion or Save-Data: no autoplay (posters stay), and the button
   offers "Play video". Every start state lives under html.kf-on, added below after the reduced-motion check. */
(function () {
  'use strict';
  var d = document, de = d.documentElement, w = window;
  if (!d.body || !d.body.classList.contains('kf')) return;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var fine = w.matchMedia && w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var vw = w.innerWidth, vh = w.innerHeight;
  function phone() { return vw < 768 || vh > vw * 1.1; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIO(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pinP(el) { var r = el.getBoundingClientRect(), span = r.height - vh; return span > 0 ? clamp(-r.top / span, 0, 1) : (r.top < 0 ? 1 : 0); }
  function near(el, m) { var r = el.getBoundingClientRect(); return r.bottom > -m && r.top < vh + m; }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }

  /* ---------- films ---------- */
  var vids = $$('video[data-kf-v]'), btn = d.querySelector('.kf-pause');
  var cut = phone() ? '-m' : '-d', auto = !reduce && !saveData, held = !auto;
  function base(v) { return '/assets/videos/kerala/kerala-' + v.getAttribute('data-kf-v') + cut; }
  vids.forEach(function (v) { v.muted = true; v.defaultMuted = true; v.setAttribute('poster', base(v) + '.webp'); });
  function load(v) { if (!v.__src) { v.__src = 1; v.preload = 'auto'; v.src = base(v) + '.mp4'; } }
  function play(v) { if (held) return; load(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if ('IntersectionObserver' in w) {
    var soon = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !held) { load(e.target); soon.unobserve(e.target); } }); }, { rootMargin: '120% 0px' });
    var seen = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.__on = e.isIntersecting; if (e.isIntersecting) play(e.target); else e.target.pause(); });
    }, { threshold: 0.01 });
    vids.forEach(function (v) { soon.observe(v); seen.observe(v); });
  }
  if (btn) {
    btn.hidden = false;
    var label = function () { btn.textContent = held ? '▶' : '❚❚'; btn.setAttribute('aria-label', held ? 'Play background video' : 'Pause background video'); btn.title = btn.getAttribute('aria-label'); btn.setAttribute('aria-pressed', held ? 'true' : 'false'); };
    label();
    btn.addEventListener('click', function () {
      held = !held; label();
      vids.forEach(function (v) { if (held) v.pause(); else if (v.__on) play(v); });
    });
  }

  if (reduce) return;
  de.classList.add('kf-on');
  var hdr = d.querySelector('.site-header');
  function hh() { if (hdr) de.style.setProperty('--kf-hh', Math.round(hdr.getBoundingClientRect().height) + 'px'); }
  hh();

  /* ---------- smooth wheel scrolling (mouse/trackpad only) ---------- */
  var lenis = null;
  if (w.Lenis && fine) {
    lenis = new w.Lenis({ lerp: 0.085, smoothWheel: true, prevent: function (n) { return !!(n && n.closest && n.closest('#zoho-modal, .mobile-drawer, [data-lenis-prevent], .kf-tblwrap, .kf-tiles')); } });
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button) return;
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
      var id = a.getAttribute('href'), t; if (id.length < 2) return;
      try { t = d.querySelector(id); } catch (x) { return; }
      if (!t) return;
      e.preventDefault(); lenis.scrollTo(t, { offset: -80 });
    });
    var modal = d.getElementById('zoho-modal');
    if (modal && w.MutationObserver) new MutationObserver(function () { if (modal.style.display === 'flex') lenis.stop(); else lenis.start(); }).observe(modal, { attributes: true, attributeFilter: ['style'] });
  }

  /* ---------- reveals: once, staggered among siblings ---------- */
  var io = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('kf-in'); io.unobserve(e.target); if (e.target.__count) e.target.__count(); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }) : null;
  function arm(el) { if (io) io.observe(el); else el.classList.add('kf-in'); }
  $$('.kf-r').forEach(function (el) {
    var sib = el.parentNode ? $$(':scope > .kf-r', el.parentNode).indexOf(el) : 0;
    el.style.setProperty('--rd', (Math.min(Math.max(sib, 0), 6) * 0.08).toFixed(2) + 's'); arm(el);
  });
  $$('.kf-team, .kf-range').forEach(arm);
  // figures count up once and land on the exact original string
  $$('.kf-figures b, .kf-trust b').forEach(function (b) {
    var txt = b.textContent, m = txt.match(/^(\D*)(\d+)(.*)$/); if (!m) return;
    var host = b.closest('.kf-r') || b.closest('ul'); var prev = host.__count;
    host.__count = function () {
      if (prev) prev();
      var t0 = performance.now(), to = +m[2];
      (function tick(t) { var k = ease(clamp((t - t0) / 1500, 0, 1)); b.textContent = k >= 1 ? txt : m[1] + Math.round(to * k) + m[3]; if (k < 1) requestAnimationFrame(tick); })(t0);
    };
    if (host.tagName === 'UL' && !host.classList.contains('kf-r')) arm(host);
  });

  var scenes = [];

  /* ---------- hero: the drop opens to the full film ---------- */
  (function () {
    var hero = d.querySelector('.kf-hero'); if (!hero) return;
    var run = hero.querySelector('.kf-hero-run'), media = hero.querySelector('.kf-drop-media'), vid = media.querySelector('video'),
      shade = media.querySelector('.kf-shade'), copy = hero.querySelector('.kf-hero-copy'), aside = hero.querySelector('.kf-hero-aside'),
      glow = hero.querySelector('.kf-glow'), ans = hero.querySelector('.kf-answer');
    function k(cx, cy, S, x, y) { return (cx + x * S).toFixed(1) + ' ' + (cy + y * S).toFixed(1); }
    function drop(cx, cy, S) {   // a water drop, point up, height 2S
      return "path('M" + k(cx, cy, S, 0, -1) + ' C' + k(cx, cy, S, .26, -.6) + ' ' + k(cx, cy, S, .7, -.2) + ' ' + k(cx, cy, S, .7, .3)
        + ' C' + k(cx, cy, S, .7, .7) + ' ' + k(cx, cy, S, .39, 1) + ' ' + k(cx, cy, S, 0, 1)
        + ' C' + k(cx, cy, S, -.39, 1) + ' ' + k(cx, cy, S, -.7, .7) + ' ' + k(cx, cy, S, -.7, .3)
        + ' C' + k(cx, cy, S, -.7, -.2) + ' ' + k(cx, cy, S, -.26, -.6) + ' ' + k(cx, cy, S, 0, -1) + " Z')";
    }
    var wide = function () { return vw >= 900; };
    scenes.push(function (now) {
      if (!near(run, 0)) return;
      var p = pinP(run), e = easeIO(seg(p, 0, .56)), bob = Math.sin(now / 1200) * 7 * (1 - e);
      var cx0 = wide() ? vw * .73 : vw * .5, cy0 = wide() ? vh * .54 : vh * .5, S0 = wide() ? vh * .3 : Math.min(vh * .2, vw * .34);
      var S1 = Math.max(vw, vh) * 2.8, S = lerp(S0, S1, e * e);
      media.style.clipPath = e >= .999 ? 'none' : drop(lerp(cx0, vw / 2, e), lerp(cy0, vh * .56, e) + bob, S);
      if (vid) vid.style.transform = 'scale(' + (1.22 - .22 * e).toFixed(4) + ')';
      shade.style.opacity = (.2 + .8 * seg(p, .4, .58)).toFixed(3);
      if (copy && wide()) { var c = seg(p, .02, .26); copy.style.opacity = (1 - c).toFixed(3); copy.style.transform = 'translate3d(0,' + (-c * 70).toFixed(1) + 'px,0)'; }
      if (aside) aside.style.opacity = (1 - seg(p, .02, .2)).toFixed(3);
      if (glow) glow.style.opacity = (1 - seg(p, 0, .3)).toFixed(3);
      var a = seg(p, .54, .72);
      ans.style.opacity = a.toFixed(3); ans.style.transform = 'translate3d(0,' + ((1 - ease(a)) * 40).toFixed(1) + 'px,0)';
    });
  })();

  /* ---------- film chapters: slow push-in, darken as the chapter body arrives ---------- */
  $$('.kf-film').forEach(function (sec) {
    var media = sec.querySelector('.kf-film-media'), vid = media && media.querySelector('video'), body = sec.querySelector('.kf-film-body');
    if (!media) return;
    scenes.push(function () {
      if (!near(sec, 50)) return;
      var r = sec.getBoundingClientRect(), p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      if (vid) vid.style.setProperty('--zoom', (1.12 - .12 * p).toFixed(4));
      var dark = 0;
      if (body) { var b = body.getBoundingClientRect(); dark = .62 * seg(1 - b.top / vh, 0, .6); }
      media.style.setProperty('--dark', dark.toFixed(3));
    });
  });

  /* ---------- founder portrait drifts inside its frame ---------- */
  (function () {
    var fig = d.querySelector('.kf-portrait'); if (!fig) return;
    scenes.push(function () {
      if (!near(fig, 0)) return;
      var r = fig.getBoundingClientRect(), q = clamp((vh - r.top) / (vh + r.height), 0, 1);
      fig.style.setProperty('--py', ((q - .5) * -40).toFixed(1) + 'px');
    });
  })();

  /* ---------- districts: the map follows the list ---------- */
  (function () {
    var list = $$('.kf-dlist li'); if (!list.length) return;
    var paths = {}, dots = {}, name = d.querySelector('.kf-map-name'), stick = d.querySelector('.kf-map-stick'), cur = '';
    $$('.kf-map path').forEach(function (p) { paths[p.getAttribute('data-d')] = p; });
    $$('.kf-map circle').forEach(function (c) { dots[c.getAttribute('data-d')] = c; });
    var wrap = d.querySelector('.kf-map-grid');
    scenes.push(function () {
      if (!near(wrap, 0)) return;
      var target = phone() || vw < 900 ? (stick.getBoundingClientRect().bottom + vh * .12) : vh * .5, best = null, bd = 1e9;
      list.forEach(function (li) { var r = li.getBoundingClientRect(), m = (r.top + r.bottom) / 2, dd = Math.abs(m - target); if (dd < bd) { bd = dd; best = li; } });
      var id = best.getAttribute('data-d'); if (id === cur) return;
      if (cur) { list.forEach(function (li) { li.classList.remove('on'); }); paths[cur] && paths[cur].classList.remove('on'); dots[cur] && dots[cur].classList.remove('on'); }
      cur = id; best.classList.add('on'); paths[id] && paths[id].classList.add('on'); dots[id] && dots[id].classList.add('on');
      if (name) name.innerHTML = '<b>' + best.querySelector('b').textContent + '</b><span>' + ('0' + (list.indexOf(best) + 1)).slice(-2) + ' / ' + list.length + '</span>';
    });
  })();

  /* ---------- process line fills as the steps pass ---------- */
  (function () {
    var steps = d.querySelector('.kf-steps'), line = steps && steps.querySelector('.kf-steps-line i'); if (!line) return;
    scenes.push(function () {
      if (!near(steps, 0)) return;
      var r = steps.getBoundingClientRect(); line.style.setProperty('--sp', clamp((vh * .62 - r.top) / r.height, 0, 1).toFixed(3));
    });
  })();

  /* ---------- chapter rail ---------- */
  (function () {
    var rail = d.querySelector('.kf-rail'); if (!rail) return;
    var chs = $$('[data-kf-ch]'), n = rail.querySelector('.kf-rail-n'), t = rail.querySelector('.kf-rail-t'), bar = rail.querySelector('.kf-rail-line'), last = null;
    scenes.push(function () {
      var mid = vh * .5, on = chs[0];
      for (var i = 0; i < chs.length; i++) { if (chs[i].getBoundingClientRect().top <= mid) on = chs[i]; }
      var r = on.getBoundingClientRect();
      bar.style.setProperty('--rp', clamp((mid - r.top) / Math.max(1, r.height), 0, 1).toFixed(3));
      if (on !== last) { last = on; n.textContent = on.getAttribute('data-kf-ch'); t.textContent = on.getAttribute('data-kf-label'); }
    });
  })();

  /* ---------- one loop ---------- */
  w.addEventListener('resize', function () {
    vw = w.innerWidth; vh = w.innerHeight; hh();
    var c = phone() ? '-m' : '-d';
    if (c !== cut) { cut = c; vids.forEach(function (v) { v.setAttribute('poster', base(v) + '.webp'); if (v.__src) { v.__src = 0; if (v.__on) play(v); else load(v); } }); }
  });
  var running = false;
  function start() { if (!running) { running = true; requestAnimationFrame(frame); } }
  d.addEventListener('visibilitychange', function () { if (!d.hidden) start(); });
  function frame(t) {
    if (d.hidden) { running = false; return; }
    if (lenis) lenis.raf(t);
    for (var i = 0; i < scenes.length; i++) scenes[i](t);
    requestAnimationFrame(frame);
  }
  for (var i = 0; i < scenes.length; i++) scenes[i](performance.now());
  start();
})();
