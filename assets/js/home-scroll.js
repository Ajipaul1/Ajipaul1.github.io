/* home-scroll.js -- TechAuditPros homepage scroll layer (2026-10-13).
   Markup hooks + CSS are written into index.html by scripts/country-pages/home_scroll.js; this file only
   moves things. Every start state in the CSS is scoped to html.vs, which is added below after the
   reduced-motion check, so with JS off, for crawlers and under reduced motion the page is fully static.

   Scenes (each one runs only while it is on screen):
     1 HERO       intro + dotted globe live in home-globe.js; this file only lifts the copy away on scroll
     2 MANIFESTO  three colour blocks shrink into keyword tags that drift around one sentence (pinned)
     3 CORDS      the tool band pins; two twisted cords wind as the stack slides through the middle
     4 STACK      "How an engagement runs" becomes three cards that stack on top of each other
     5 MARKETS    the six markets become rows; on a mouse, a city photo follows the pointer
     6 TYPE       every section heading rises word by word; blocks, numbers and cards reveal once
   Smooth wheel scrolling (Lenis, self-hosted) on mouse/trackpad only; touch keeps native scrolling. */
(function () {
  'use strict';
  var d = document, de = d.documentElement, w = window;
  var hero = d.querySelector('.tap-new-hero');
  if (!hero) return;
  if (w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  de.classList.add('vs');

  var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var vh = w.innerHeight, vw = w.innerWidth, mobile = vw < 768;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIO(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function el(tag, cls, html) { var e = d.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function pinP(sec) { var r = sec.getBoundingClientRect(), span = r.height - vh; return span > 0 ? clamp(-r.top / span, 0, 1) : (r.top < 0 ? 1 : 0); }
  function near(sec, m) { var r = sec.getBoundingClientRect(); return r.bottom > -m && r.top < vh + m; }
  function headerH() { var h = d.querySelector('.site-header'); return h ? h.getBoundingClientRect().height : 0; }

  /* ---------- smooth wheel scrolling ---------- */
  var lenis = null;
  if (w.Lenis && fine) {
    lenis = new w.Lenis({
      lerp: 0.085, smoothWheel: true,
      prevent: function (n) { return !!(n && n.closest && n.closest('#zoho-modal, .mobile-drawer, [data-lenis-prevent], iframe')); }
    });
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button) return;
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
      var id = a.getAttribute('href'); if (id.length < 2) return;
      var t; try { t = d.querySelector(id); } catch (x) { return; }
      if (!t) return;
      e.preventDefault(); lenis.scrollTo(t, { offset: -headerH() - 8 });
      if (history.replaceState) history.replaceState(null, '', id);
    });
    var modal = d.getElementById('zoho-modal');
    if (modal && w.MutationObserver) new MutationObserver(function () {
      if (modal.style.display === 'flex') lenis.stop(); else lenis.start();
    }).observe(modal, { attributes: true, attributeFilter: ['style'] });
  }

  /* ---------- 6 TYPE: split headings into words that rise on arrival ---------- */
  function split(h) {
    if (h.__vs) return; h.__vs = 1;
    var label = h.textContent.replace(/\s+/g, ' ').trim(), n = 0;
    (function walk(node) {
      var kids = Array.prototype.slice.call(node.childNodes);
      for (var i = 0; i < kids.length; i++) {
        var k = kids[i];
        if (k.nodeType === 3) {
          var parts = k.nodeValue.split(/(\s+)/), frag = d.createDocumentFragment();
          for (var j = 0; j < parts.length; j++) {
            if (!parts[j]) continue;
            if (/^\s+$/.test(parts[j])) { frag.appendChild(d.createTextNode(' ')); continue; }
            var o = el('span', 'vs-w'), inn = el('span', 'vs-wi'); inn.textContent = parts[j];
            inn.style.setProperty('--wi', n++); o.appendChild(inn); frag.appendChild(o);
          }
          node.replaceChild(frag, k);
        } else if (k.nodeType === 1 && !/^(BR|SVG|IMG)$/.test(k.tagName)) walk(k);
      }
    })(h);
    h.setAttribute('aria-label', label);
    for (var c = 0; c < h.children.length; c++) h.children[c].setAttribute('aria-hidden', 'true');
    h.classList.add('vs-split');
  }
  var heads = d.querySelectorAll('section h2');
  var once = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target; t.classList.add('vs-in'); once.unobserve(t);
      if (t.__count) t.__count();
      // once a block has landed, hand it back to its own hover transitions
      if (t.classList.contains('vs-r')) setTimeout(function () { t.classList.remove('vs-r', 'vs-in'); }, 1900);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }) : null;
  function arm(node) { if (once) once.observe(node); else node.classList.add('vs-in'); }
  Array.prototype.forEach.call(heads, function (h) { if (h.closest('.vs-mani')) return; split(h); arm(h); });

  // blocks that fade up once, staggered among their siblings (they leave the site's generic .reveal)
  var REVEAL = '.ofr-card, .ofr-lede, .ofr-note, .pillar-card, .case-card, .compare-card, .hfq-item, .number-stat-item, .promise-content, .promise-media, .regions-footnote, .final-cta-actions, .section-head .eyebrow, .tap-promise-section .eyebrow';
  function reveal(n, i) {
    n.classList.remove('reveal'); n.classList.add('vs-r'); n.style.setProperty('--ri', Math.min(i, 6)); arm(n);
  }
  Array.prototype.forEach.call(d.querySelectorAll(REVEAL), function (n) {
    reveal(n, n.parentNode ? Array.prototype.indexOf.call(n.parentNode.children, n) : 0);
  });

  // numbers count up once and land on their exact original string
  Array.prototype.forEach.call(d.querySelectorAll('.number-stat-item .num'), function (n) {
    var txt = n.textContent, m = txt.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/); if (!m) return;
    var item = n.closest('.number-stat-item'), to = parseFloat(m[2]), dec = (m[2].split('.')[1] || '').length;
    item.__count = function () {
      var t0 = performance.now();
      (function tick(t) {
        var k = ease(clamp((t - t0) / 1400, 0, 1));
        n.textContent = k >= 1 ? txt : m[1] + (to * k).toFixed(dec) + m[3];
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    };
  });

  var scenes = [];

  /* ---------- 1 HERO: the intro and the globe are home-globe.js; here only the copy lifting away ---------- */
  (function () {
    var content = hero.querySelector('.hero-main-content');
    if (!content) return;
    scenes.push(function () {
      if (!near(hero, 0)) return;
      var r = hero.getBoundingClientRect(), q = clamp(-r.top / Math.max(1, r.height), 0, 1);
      content.style.transform = 'translate3d(0,' + (-ease(q) * 90).toFixed(1) + 'px,0)'; content.style.opacity = (1 - seg(q, .25, .85)).toFixed(3);
    });
  })();

  /* ---------- 2 MANIFESTO ---------- */
  (function () {
    var sec = d.querySelector('.vs-mani'); if (!sec) return;
    var pin = sec.querySelector('.vs-mani-pin'), tags = Array.prototype.slice.call(sec.querySelectorAll('.vs-tags li')),
      blocks = Array.prototype.slice.call(sec.querySelectorAll('.vs-blocks i')), title = sec.querySelector('.vs-mani-title'),
      sub = sec.querySelector('.vs-mani-sub'), copy = sec.querySelector('.vs-mani-copy');
    split(title); title.classList.remove('vs-split'); title.classList.add('vs-split-scrub');
    var words = Array.prototype.slice.call(title.querySelectorAll('.vs-wi'));
    var T = tags.map(function (t) {
      var cs = getComputedStyle(t), xf = mobile ? .78 : 1;
      return { el: t, x: (parseFloat(cs.getPropertyValue('--x')) || 0) * xf, y: parseFloat(cs.getPropertyValue('--y')) || 0, z: parseFloat(cs.getPropertyValue('--z')) || .5, w: t.offsetWidth, h: t.offsetHeight, hide: mobile && t.classList.contains('vs-dt') };
    });
    blocks.forEach(function (b, i) { if (T[i]) b.style.background = getComputedStyle(T[i].el).backgroundColor; });
    // where each colour block starts: [x, y] as fractions of the half-viewport, size as a fraction of the short side
    var START = mobile ? [[0, -.42, .62], [-.55, .34, .55], [.55, .4, .58]] : [[-.02, -.36, .5], [-.62, .3, .46], [.6, .32, .5]];
    var mx = 0, my = 0, tx = 0, ty = 0;
    if (fine) w.addEventListener('pointermove', function (e) { tx = e.clientX / vw * 2 - 1; ty = e.clientY / vh * 2 - 1; }, { passive: true });
    function measure() { T.forEach(function (t) { t.w = t.el.offsetWidth; t.h = t.el.offsetHeight; }); }
    w.addEventListener('resize', measure);
    scenes.push(function () {
      if (!near(sec, 50)) return;
      var p = pinP(sec);
      mx += (tx - mx) * .06; my += (ty - my) * .06;
      var hw = vw / 2, hh = vh / 2, short = Math.min(vw, vh);
      var bg = seg(p, .02, .22);
      pin.style.setProperty('--vs-bg', bg.toFixed(3));
      var bt = easeIO(seg(p, .02, .36)), out = seg(p, .8, 1);
      blocks.forEach(function (b, i) {
        var t = T[i], s = START[i], size = s[2] * short;
        var cx = lerp(s[0] * hw, t.x * hw, bt), cy = lerp(s[1] * hh, t.y * hh, bt);
        var bw = lerp(size, t.w, bt), bh = lerp(size, t.h, bt);
        b.style.transform = 'translate3d(' + (cx - bw / 2).toFixed(1) + 'px,' + (cy - bh / 2).toFixed(1) + 'px,0) scale(' + (bw / 100).toFixed(4) + ',' + (bh / 100).toFixed(4) + ')';
        b.style.opacity = (1 - seg(bt, .88, 1)).toFixed(3);
      });
      T.forEach(function (t, i) {
        if (t.hide) return;
        var a = i < blocks.length ? seg(bt, .86, 1) : ease(seg(p, .2 + i * .011, .32 + i * .011));
        var drift = (p - .5), spread = 1 + out * 1.1;
        var x = (t.x * hw + drift * t.x * t.z * vw * .1 + mx * t.z * 22) * spread;
        var y = (t.y * hh - drift * t.z * vh * .42 + my * t.z * 16) * spread;
        var sc = i < blocks.length ? 1 : .55 + .45 * a;
        t.el.style.transform = 'translate3d(' + (x - t.w / 2).toFixed(1) + 'px,' + (y - t.h / 2).toFixed(1) + 'px,0) scale(' + sc.toFixed(3) + ')';
        t.el.style.opacity = (a * (1 - out)).toFixed(3);
      });
      words.forEach(function (wd, k) { wd.style.transform = 'translate3d(0,' + ((1 - ease(seg(p, .26 + k * .022, .42 + k * .022))) * 108).toFixed(1) + '%,0)'; });
      if (sub) sub.style.opacity = seg(p, .44, .56).toFixed(3);
      copy.style.transform = 'translate3d(0,' + (-ease(out) * vh * .14).toFixed(1) + 'px,0) scale(' + (.96 + .04 * seg(p, .24, .5) ).toFixed(4) + ')';
      copy.style.opacity = (1 - seg(p, .88, 1)).toFixed(3);
    });
  })();

  /* ---------- 3 CORDS ---------- */
  (function () {
    var band = d.querySelector('.tl-band'); if (!band) return;
    var seen = {}, items = [];
    Array.prototype.forEach.call(band.querySelectorAll('.tl-item'), function (it) {
      var name = it.textContent.replace(/\s+/g, ' ').trim(), img = it.querySelector('img');
      if (img) name = img.getAttribute('alt') || name;
      if (!name || seen[name]) return; seen[name] = 1; items.push({ name: name, src: img ? img.getAttribute('src') : '' });
    });
    if (items.length < 3) return;
    band.classList.add('vs-cords');
    var pin = el('div', 'vs-cords-pin'), cv = el('canvas', 'vs-cord-cv'); cv.setAttribute('aria-hidden', 'true');
    var left = el('p', 'vs-cords-l', 'We build it'), right = el('p', 'vs-cords-r', 'and stay to run&nbsp;it');
    left.setAttribute('aria-hidden', 'true'); right.setAttribute('aria-hidden', 'true');
    var mid = el('div', 'vs-cords-mid'), list = el('ul', 'vs-stack-list');
    list.setAttribute('aria-hidden', 'true');
    items.forEach(function (it) {
      var li = el('li', 'vs-si' + (it.src ? ' has-logo' : ''));
      li.innerHTML = (it.src ? '<img src="' + it.src + '" alt="" width="46" height="46" loading="lazy" decoding="async">' : '<i></i>') + '<span>' + it.name.replace(/</g, '&lt;') + '</span>';
      list.appendChild(li);
    });
    var label = band.querySelector('.tl-label');
    mid.appendChild(list);
    pin.appendChild(cv); pin.appendChild(left); pin.appendChild(mid); pin.appendChild(right);
    if (label) pin.appendChild(label);
    band.appendChild(pin);
    var lis = Array.prototype.slice.call(list.children), n = lis.length;
    var ctx = cv.getContext('2d'), dpr = Math.min(w.devicePixelRatio || 1, 1.5), W = 0, H = 0;
    function size() { W = pin.clientWidth; H = pin.clientHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + 'px'; cv.style.height = H + 'px'; }
    size(); w.addEventListener('resize', size);
    var PAIRS = [['#D9531E', '#A9C4DE'], ['#5E7426', '#F2B53A']], ST = 3;
    function strand(cx, A, ph, col, twist, front, lw, slide) {
      // one pass of one strand: only the segments on the requested side (front/back) of the twist, so the
      // two strands of a pair pass over and under each other like a cord
      var prev = null, edge = 'rgba(11,32,54,.38)';
      for (var y = -12, i = 0; y <= H + 12; y += ST, i++) {
        var f = Math.PI / 2 + twist * (y / H * 6 * Math.PI) + ph, s = Math.sin(f), dep = Math.cos(f);
        var x = cx + A * s, isFront = dep >= 0;
        if (prev && isFront === front) {
          var wd = lw * (.86 + .14 * Math.abs(dep));
          ctx.strokeStyle = edge; ctx.lineWidth = wd + 2; ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(x, y); ctx.stroke();
          ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(x, y); ctx.stroke();
          var k = (i + slide) % 6, sl = (x - prev[0]) * 1.4;
          if (k === 0 || k === 3) { // the weave: dark flecks on alternating sides, a pale one between
            var side = k === 0 ? -1 : 1;
            ctx.fillStyle = '#0B2036'; ctx.fillRect(x + side * wd * .12 - wd * .28 + sl, y - 1.6, wd * .42, 3.4);
          } else if (k === 1) {
            ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x - wd * .18 + sl, y - 1, wd * .36, 2.2);
          }
        }
        prev = [x, y];
      }
    }
    var tIdle = 0;
    scenes.push(function (now) {
      if (!near(band, 80)) return;
      var p = pinP(band), r = band.getBoundingClientRect(), enter = ease(seg(1 - r.top / vh, 0, 1));
      tIdle = now * .00025;
      var twist = easeIO(seg(p, .02, .55)), ph = p * 9 + tIdle, slide = Math.floor(p * 420);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.lineCap = 'round';
      var gap = mobile ? Math.min(118, W * .3) : Math.max(180, W * .14), lw = mobile ? 11 : 15, A = lw * (.5 + .32 * twist);
      [W / 2 - gap, W / 2 + gap].forEach(function (cx, k) {
        var c = PAIRS[k], phk = ph + k * 1.7;
        strand(cx, A, phk + Math.PI, c[1], twist, false, lw, slide); strand(cx, A, phk, c[0], twist, false, lw, slide);
        strand(cx, A, phk + Math.PI, c[1], twist, true, lw, slide); strand(cx, A, phk, c[0], twist, true, lw, slide);
      });
      pin.style.setProperty('--vs-enter', enter.toFixed(3));
      var pos = ease(seg(p, .06, .9)) * (n - 1), gapY = mobile ? 74 : 86;
      for (var i = 0; i < n; i++) {
        var o = i - pos, a = Math.abs(o);
        if (a > 6) { lis[i].style.opacity = 0; continue; }
        lis[i].style.transform = 'translate3d(-50%,calc(-50% + ' + (o * gapY).toFixed(1) + 'px),0) scale(' + Math.max(.5, 1 - a * .2).toFixed(3) + ')';
        lis[i].style.opacity = Math.max(0, 1 - a * .36).toFixed(3);
        lis[i].classList.toggle('on', a < .5);
      }
      var ex = seg(p, .9, 1);
      left.style.transform = 'translate3d(' + (-(1 - enter) * 30 - ex * 8).toFixed(1) + 'vw,-50%,0)';
      right.style.transform = 'translate3d(' + ((1 - enter) * 30 + ex * 8).toFixed(1) + 'vw,-50%,0)';
      left.style.opacity = right.style.opacity = (1 - ex).toFixed(3);
    });
  })();

  /* ---------- 4 STACK: How an engagement runs ---------- */
  (function () {
    var wrap = d.querySelector('.hsSteps'); if (!wrap) return;
    var steps = Array.prototype.slice.call(wrap.querySelectorAll('.step')); if (steps.length < 2) return;
    var WORDS = ['Audit', 'Build', 'Run'];
    wrap.classList.add('vs-stack');
    wrap.style.setProperty('--vs-top', Math.round(headerH() + 18) + 'px');
    steps.forEach(function (s, i) {
      var g = el('span', 'vs-giant', WORDS[i] || ''); g.setAttribute('aria-hidden', 'true');
      s.insertBefore(g, s.firstChild); s.style.setProperty('--si', i);
    });
    scenes.push(function () {
      if (!near(wrap, 100)) return;
      for (var i = 0; i < steps.length - 1; i++) {
        var a = steps[i].getBoundingClientRect(), b = steps[i + 1].getBoundingClientRect();
        var cover = clamp(1 - (b.top - a.top) / Math.max(1, a.height), 0, 1);
        steps[i].style.transform = 'translate3d(0,' + (-cover * 14).toFixed(1) + 'px,0) scale(' + (1 - cover * .07).toFixed(4) + ')';
        steps[i].style.setProperty('--dim', (cover * .45).toFixed(3));
      }
    });
  })();

  /* ---------- 5 MARKETS: rows with a photo that follows the pointer ---------- */
  (function () {
    var grid = d.querySelector('.regions-grid'); if (!grid) return;
    grid.classList.add('vs-rows');
    var rows = Array.prototype.slice.call(grid.querySelectorAll('.region-card'));
    rows.forEach(function (r, i) {
      var arrow = el('span', 'vs-arrow', '&#8599;'); arrow.setAttribute('aria-hidden', 'true'); r.appendChild(arrow);
      reveal(r, i);
    });
    if (!fine) return;
    var pics = {};
    Array.prototype.forEach.call(d.querySelectorAll('.hs-act a[href]'), function (a) {
      var img = a.querySelector('img'); if (img && !pics[a.getAttribute('href')]) pics[a.getAttribute('href')] = img;
    });
    var chip = el('div', 'vs-chip'); chip.setAttribute('aria-hidden', 'true');
    chip.innerHTML = '<div class="vs-chip-img"></div><span class="vs-chip-tag"></span>';
    d.body.appendChild(chip);
    var box = chip.querySelector('.vs-chip-img'), tag = chip.querySelector('.vs-chip-tag');
    var cx = 0, cy = 0, gx = 0, gy = 0, on = false, vx = 0;
    rows.forEach(function (r) {
      r.addEventListener('pointerenter', function (e) {
        var img = pics[r.getAttribute('href')], src = img ? (img.currentSrc || img.src) : '';
        box.style.backgroundImage = src ? 'url("' + src + '")' : 'none';
        tag.textContent = 'Open ' + (r.querySelector('h3') ? r.querySelector('h3').textContent : '') + ' →';
        if (!on) { cx = gx = e.clientX; cy = gy = e.clientY; }
        on = true; chip.classList.add('on');
      });
      r.addEventListener('pointerleave', function () { on = false; chip.classList.remove('on'); });
    });
    w.addEventListener('pointermove', function (e) { gx = e.clientX; gy = e.clientY; }, { passive: true });
    w.addEventListener('scroll', function () { if (on) { on = false; chip.classList.remove('on'); } }, { passive: true });
    scenes.push(function () {
      if (!chip.classList.contains('on') && Math.abs(gx - cx) < .5) return;
      var nx = cx + (gx - cx) * .16; vx = vx * .8 + (nx - cx) * .2; cx = nx; cy += (gy - cy) * .16;
      chip.style.transform = 'translate3d(' + (cx + 24).toFixed(1) + 'px,' + (cy - 110).toFixed(1) + 'px,0) rotate(' + clamp(vx * .5, -10, 10).toFixed(2) + 'deg)';
    });
  })();

  /* ---------- closing band: the hero grid again, drawn on arrival ---------- */
  (function () {
    var box = d.querySelector('.final-cta'); if (!box) return;
    var g = el('div', 'vs-hgrid vs-cgrid'); g.setAttribute('aria-hidden', 'true');
    g.innerHTML = '<i class="vs-l v v1"></i><i class="vs-l v v2"></i><i class="vs-l h"></i>';
    box.insertBefore(g, box.firstChild);
    if (once) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { box.classList.add('vs-go'); io.disconnect(); } }, { threshold: .3 }); io.observe(box); }
    else box.classList.add('vs-go');
  })();

  /* ---------- one loop for everything ---------- */
  w.addEventListener('resize', function () { vh = w.innerHeight; vw = w.innerWidth; mobile = vw < 768; });
  var running = false;
  function start() { if (!running) { running = true; requestAnimationFrame(frame); } }
  d.addEventListener('visibilitychange', function () { if (!d.hidden) start(); });
  function frame(t) {
    if (d.hidden) { running = false; return; }
    if (lenis) lenis.raf(t);
    for (var i = 0; i < scenes.length; i++) scenes[i](t);
    requestAnimationFrame(frame);
  }
  start();
})();
