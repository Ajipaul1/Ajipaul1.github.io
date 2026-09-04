'use strict';
// HOME MOTION layer for the site homepage ONLY (owner, 2026-09-03: "make the homepage also like a full
// page design and the animation on there too, I like it — and every section on the homepage gets
// something unique, each section a different treatment, very rare, something people would never have
// seen, so they remember it forever — without hurting page speed or SEO").
//
// The two halves of that ask normally fight each other. They are reconciled with one rule: EVERY SECTION
// EFFECT IS ONE-SHOT AND IN-VIEW TRIGGERED, and animates only transform / opacity / clip-path / filter —
// properties the compositor handles. One IntersectionObserver adds a class once and unobserves, so after
// a visitor has scrolled past a section, that section costs exactly zero for the rest of the visit. The
// page is not "animated"; it is a static page that plays a short, distinct move once per section.
//
// SEO and no-JS safety: every hidden/offset start state is scoped under html.hm, and that class is only
// added by JS, after the reduced-motion check. With JS off — and for any crawler that does not run it —
// the page renders exactly as it does today, all text present and visible. No content is created,
// removed or reordered by this layer, no library, no font and no image is added: about 9KB inline.
//
// One treatment per section, all transform-based unless noted:
//   1 HERO           "audit scan": a thin orange scan line sweeps the hero once, and the headline block
//                    rises in behind it, staggered. The scan element deletes itself when it finishes.
//   2 ERP PROMISE    "paper unroll": the media unrolls left-to-right on clip-path while the photo inside
//                    settles from 1.08 scale — the picture is drawn onto the page rather than faded in.
//   3 THREE SERVICES "card deal": the three pillars are dealt out from a stack — outer cards arrive
//                    rotated from their own side, the middle one straight up, 90ms apart.
//   4 MARKETS        "departures board": each market card flips in on its left edge under a shared
//                    perspective, in sequence, like a mechanical flight board.
//   5 COMPARE        "collide": the two columns slide in from opposite edges, a seam draws down the
//                    middle between them, and the TechAuditPros side takes one edge pulse on arrival.
//   6 RESULTS        "domino + odometer": the stat cards tip up from flat on their bottom edge, one after
//                    another, while each figure counts to its real value (and lands on the exact string).
//   7 CASE STUDIES   "develop": cards arrive fully desaturated and gain their colour over 900ms, like a
//                    photograph developing.
//   8 TEAM PROMISE   "focus pull": the block resolves from a 7px blur to sharp — a camera finding focus.
//   9 CLOSING CTA    the converging-lines canvas from the US page, on a navy box, with the VIBGYOR
//                    heading. The only canvas on the page; it runs only while the band is on screen and
//                    stops on a hidden tab.
//   + SPINE          a 1px rule down the left gutter whose orange segment tracks scroll progress: one
//                    transform on one element, the connective tissue that makes the nine reads one page.
// Under prefers-reduced-motion none of it is armed: no html.hm, no canvas, no count-up, no spine.
//   node scripts/country-pages/home_motion.js           apply / re-apply
//   node scripts/country-pages/home_motion.js --strip    remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['index.html'];

const CSS = `<!-- home-motion:start -->
<style>
  /* ================= HOME MOTION (2026-09-03) — one distinct one-shot move per section ================= */
  /* every start state is scoped to html.hm, which only JS adds: no JS, no crawler, no hidden content */
  html.hm .hm-a{ opacity:0; }
  html.hm .hm-a.in{ opacity:1; }

  /* 1 hero — audit scan + staggered rise */
  html.hm .hm-hero .hero-main-content > *{ opacity:0; transform:translateY(18px); }
  html.hm .hm-hero.in .hero-main-content > *{ animation:hmRise .85s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.15s + var(--i,0) * .09s); }
  @keyframes hmRise{ to{ opacity:1; transform:none; } }
  .hm-scan{ position:absolute; left:0; right:0; top:0; height:120px; z-index:3; pointer-events:none; background:linear-gradient(180deg, transparent, rgba(217,83,30,.16) 62%, rgba(255,255,255,.5) 82%, transparent); opacity:0; }
  html.hm .hm-hero.in .hm-scan{ animation:hmScan 1.5s cubic-bezier(.4,0,.6,1) .1s forwards; }
  @keyframes hmScan{ 0%{ opacity:0; transform:translateY(-120px); } 12%{ opacity:1; } 88%{ opacity:1; } 100%{ opacity:0; transform:translateY(var(--hm-h, 700px)); } }

  /* 2 ERP promise — paper unroll */
  html.hm .hm-unroll{ clip-path:inset(0 100% 0 0); }
  html.hm .hm-unroll.in{ animation:hmUnroll 1.15s cubic-bezier(.2,.8,.2,1) forwards; }
  @keyframes hmUnroll{ to{ clip-path:inset(0 0 0 0); } }
  html.hm .hm-unroll img{ transform:scale(1.08); }
  html.hm .hm-unroll.in img{ transition:transform 1.5s cubic-bezier(.2,.8,.2,1); transform:none; }

  /* 3 three services — card deal */
  html.hm .hm-deal{ opacity:0; }
  html.hm .hm-deal.in{ animation:hmDeal .9s cubic-bezier(.2,.85,.25,1) forwards; animation-delay:calc(var(--i,0) * .09s); }
  html.hm .hm-deal:nth-child(1){ transform:translate3d(38px,26px,0) rotate(-7deg) scale(.94); }
  html.hm .hm-deal:nth-child(2){ transform:translate3d(0,34px,0) scale(.94); }
  html.hm .hm-deal:nth-child(3){ transform:translate3d(-38px,26px,0) rotate(7deg) scale(.94); }
  @keyframes hmDeal{ to{ opacity:1; transform:none; } }

  /* 4 markets — departures board flip */
  html.hm .hm-board{ perspective:1200px; }
  html.hm .hm-flip{ opacity:0; transform:rotateY(-72deg); transform-origin:left center; backface-visibility:hidden; }
  html.hm .hm-flip.in{ animation:hmFlip .8s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--i,0) * .09s); }
  @keyframes hmFlip{ 60%{ opacity:1; } to{ opacity:1; transform:none; } }

  /* 5 compare — collide, with a seam drawn between the columns */
  html.hm .hm-left{ opacity:0; transform:translate3d(-46px,0,0); }
  html.hm .hm-right{ opacity:0; transform:translate3d(46px,0,0); }
  html.hm .hm-left.in, html.hm .hm-right.in{ animation:hmSlideIn .9s cubic-bezier(.2,.8,.2,1) .05s forwards; }
  @keyframes hmSlideIn{ to{ opacity:1; transform:none; } }
  html.hm .hm-right.in{ animation:hmSlideIn .9s cubic-bezier(.2,.8,.2,1) .05s forwards, hmPulse .9s ease .95s 1; }
  @keyframes hmPulse{ 0%{ box-shadow:0 0 0 0 rgba(217,83,30,.5); } 100%{ box-shadow:0 0 0 22px rgba(217,83,30,0); } }
  .hm-seam{ position:absolute; top:12%; bottom:12%; left:50%; width:1px; background:linear-gradient(180deg, transparent, rgba(217,83,30,.5), transparent); transform:scaleY(0); transform-origin:50% 0; z-index:1; pointer-events:none; }
  html.hm .hm-seam.in{ animation:hmSeam .9s cubic-bezier(.2,.8,.2,1) .35s forwards; }
  @keyframes hmSeam{ to{ transform:scaleY(1); } }
  @media (max-width:900px){ .hm-seam{ display:none; } }

  /* 6 results — domino tip-up */
  html.hm .hm-stack{ perspective:1000px; }
  html.hm .hm-domino{ opacity:0; transform:rotateX(-72deg); transform-origin:50% 100%; }
  html.hm .hm-domino.in{ animation:hmDomino .8s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--i,0) * .12s); }
  @keyframes hmDomino{ to{ opacity:1; transform:none; } }

  /* 7 case studies — develop like a photograph */
  html.hm .hm-develop{ opacity:0; filter:saturate(0) contrast(1.08); transform:scale(.975); }
  html.hm .hm-develop.in{ animation:hmDevelop 1.1s ease forwards; animation-delay:calc(var(--i,0) * .1s); }
  @keyframes hmDevelop{ 40%{ opacity:1; } to{ opacity:1; filter:none; transform:none; } }

  /* 8 team promise — focus pull */
  html.hm .hm-focus{ opacity:0; filter:blur(7px); transform:translateY(14px) scale(1.01); }
  html.hm .hm-focus.in{ animation:hmFocus 1.1s cubic-bezier(.2,.8,.2,1) forwards; }
  @keyframes hmFocus{ to{ opacity:1; filter:none; transform:none; } }

  /* 9 closing CTA — the US page treatment: navy box, converging lines, VIBGYOR heading */
  .final-cta{ position:relative; overflow:hidden; background:var(--navy-deep) !important; }
  .final-cta > *{ position:relative; z-index:2; }
  .final-cta::before{ content:''; position:absolute; z-index:0; pointer-events:none; width:70%; height:340%; left:-14%; top:-120%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.32), transparent 62%); filter:blur(46px); }
  html.hm .final-cta.hm-live::before{ animation:hmAurora 30s ease-in-out infinite alternate; }
  @keyframes hmAurora{ from{ transform:translate3d(0,0,0) scale(1); } to{ transform:translate3d(10%,6%,0) scale(1.15); } }
  .hm-spark{ position:absolute; inset:0; z-index:1; width:100%; height:100%; pointer-events:none; }
  .final-cta h2{ color:#fff; }
  .final-cta .final-cta-note{ color:rgba(255,255,255,.62); }
  .hm-vib{ background-image:linear-gradient(90deg,#86FFAE,#FFF06B,#FFC46B,#FF8A8A,#D9A6FF,#7FE3FF,#86FFAE); background-size:220% 100%; background-position:0% 50%; background-repeat:no-repeat; -webkit-background-clip:text; background-clip:text; color:transparent !important; -webkit-text-fill-color:transparent; }
  html.hm .final-cta.hm-live .hm-vib{ animation:hmSheen 14s linear infinite; }
  @keyframes hmSheen{ to{ background-position:100% 50%; } }

  /* + the spine: one transform on one element, tracking scroll */
  .hm-spine{ position:fixed; left:14px; top:0; bottom:0; width:1px; z-index:900; pointer-events:none; background:rgba(14,42,62,.10); }
  .hm-spine i{ display:block; position:absolute; inset:0; background:linear-gradient(180deg, var(--orange), var(--orange-dark)); transform:scaleY(var(--hm-p,0)); transform-origin:50% 0; }
  body.hm-dark .hm-spine{ background:rgba(255,255,255,.14); }
  @media (max-width:1100px){ .hm-spine{ display:none; } }

  /* the generic site reveal is superseded on the sections this layer treats */
  html.hm .hm-deal.reveal, html.hm .hm-flip.reveal, html.hm .hm-develop.reveal,
  html.hm .hm-focus.reveal, html.hm .hm-unroll.reveal{ opacity:inherit; transform:none; transition:none; }

  @media (max-width:760px){
    /* same choreography, shorter throws, and no 3D on small screens (keeps text crisp) */
    html.hm .hm-flip{ transform:translate3d(-24px,0,0); }
    html.hm .hm-domino{ transform:translate3d(0,20px,0); }
    html.hm .hm-deal:nth-child(1), html.hm .hm-deal:nth-child(2), html.hm .hm-deal:nth-child(3){ transform:translate3d(0,22px,0) scale(.97); }
    html.hm .hm-left, html.hm .hm-right{ transform:translate3d(0,22px,0); }
    html.hm .hm-focus{ filter:blur(4px); }
  }
  @media (prefers-reduced-motion: reduce){
    .hm-scan, .hm-seam, .hm-spark, .hm-spine{ display:none !important; }
    .final-cta::before{ animation:none !important; }
    .hm-vib{ animation:none !important; }
  }
</style>
<!-- home-motion:end -->
`;

const JS = `<!-- home-motion-js:start -->
<script>
(function(){
    var doc = document.documentElement, body = document.body;
    var cta = document.querySelector('.final-cta'), h2 = cta && cta.querySelector('h2');
    var note = cta && cta.querySelector('.final-cta-note');
    if (h2) h2.classList.add('hm-vib');
    if (note) note.classList.add('hm-vib');
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    doc.classList.add('hm');                                     // from here on the start states are live

    function $(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
    function stagger(els){ els.forEach(function(e, i){ e.style.setProperty('--i', Math.min(i, 8)); }); }
    function armed(els){ els.forEach(function(e){ e.classList.remove('reveal'); io.observe(e); }); }

    var io = new IntersectionObserver(function(es){
        es.forEach(function(e){
            if (!e.isIntersecting) return;
            e.target.classList.add('in');
            if (e.target.hasAttribute('data-hm-num')) countUp(e.target);
            io.unobserve(e.target);                              // one shot: nothing keeps running
        });
    }, { rootMargin: '0px 0px -12% 0px' });

    /* 1 hero — the scan sweeps once, then removes itself */
    var hero = document.querySelector('.tap-new-hero');
    if (hero){
        hero.classList.add('hm-hero');
        stagger($('.hero-main-content > *', hero));
        var scan = document.createElement('div');
        scan.className = 'hm-scan'; scan.setAttribute('aria-hidden', 'true');
        scan.style.setProperty('--hm-h', hero.offsetHeight + 'px');
        hero.appendChild(scan);
        scan.addEventListener('animationend', function(){ if (scan.parentNode) scan.parentNode.removeChild(scan); });
        requestAnimationFrame(function(){ hero.classList.add('in'); });   // above the fold: play at once
    }

    /* 2 ERP promise — paper unroll (first promise block) */
    var promos = $('.tap-promise-section');
    var media = promos[0] && promos[0].querySelector('.promise-media');
    if (media){ media.classList.add('hm-unroll'); armed([media]); }
    var firstCopy = promos[0] && promos[0].querySelector('.promise-content');
    if (firstCopy){ firstCopy.classList.add('hm-a'); armed([firstCopy]); }

    /* 3 three services — card deal */
    var pillars = $('.pillars-grid > *');
    if (pillars.length){ pillars.forEach(function(c){ c.classList.add('hm-deal'); }); stagger(pillars); armed(pillars); }

    /* 4 markets — departures board */
    var regionGrid = document.querySelector('.regions-grid');
    if (regionGrid){
        regionGrid.classList.add('hm-board');
        var cards = Array.prototype.slice.call(regionGrid.children);
        cards.forEach(function(c){ c.classList.add('hm-flip'); }); stagger(cards); armed(cards);
    }

    /* 5 compare — collide + seam */
    var cmp = document.querySelector('.compare-grid');
    if (cmp){
        var neg = cmp.querySelector('.compare-card.negative') || cmp.children[0];
        var pos = cmp.querySelector('.compare-card:not(.negative)') || cmp.children[1];
        if (neg){ neg.classList.add('hm-left'); armed([neg]); }
        if (pos){ pos.classList.add('hm-right'); armed([pos]); }
        if (getComputedStyle(cmp).position === 'static') cmp.style.position = 'relative';
        var seam = document.createElement('i');
        seam.className = 'hm-seam'; seam.setAttribute('aria-hidden', 'true');
        cmp.appendChild(seam); armed([seam]);
    }

    /* 6 results — domino, and the figures count to their real values */
    var numGrid = document.querySelector('.numbers-grid');
    if (numGrid){
        numGrid.classList.add('hm-stack');
        var stats = $('.number-stat-item', numGrid);
        stats.forEach(function(c){ c.classList.add('hm-domino'); }); stagger(stats); armed(stats);
        $('.num', numGrid).forEach(function(n){
            var t = n.textContent.trim();
            if (!/\\d/.test(t) || /[\\u2013\\u2014-]/.test(t)) return;   // never touch ranges like 6-10 wks
            n.setAttribute('data-hm-num', t); io.observe(n);
        });
    }
    function countUp(el){
        var t = el.getAttribute('data-hm-num'), m = t.match(/^([^\\d]*)([\\d,]*\\.?\\d+)(.*)$/);
        if (!m) return;
        var pre = m[1], ns = m[2], suf = m[3], comma = ns.indexOf(',') > -1, dec = (ns.split('.')[1] || '').length;
        var target = parseFloat(ns.replace(/,/g, '')), t0 = performance.now();
        function fmt(v){ var s = v.toFixed(dec); if (comma){ var p = s.split('.'); p[0] = p[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ','); s = p.join('.'); } return s; }
        (function step(now){
            var p = Math.min(1, (now - t0) / 1300), e = 1 - Math.pow(1 - p, 3);
            el.textContent = pre + fmt(target * e) + suf;
            if (p < 1) requestAnimationFrame(step); else el.textContent = t;   // lands on the exact string
        })(t0);
    }

    /* 7 case studies — develop */
    var cases = $('.cases-grid > *');
    if (cases.length){ cases.forEach(function(c){ c.classList.add('hm-develop'); }); stagger(cases); armed(cases); }

    /* 8 team promise — focus pull (the second promise block) */
    var second = promos[1];
    if (second){
        var blocks = $('.promise-content, .promise-media', second);
        blocks.forEach(function(bk){ bk.classList.add('hm-focus'); }); armed(blocks);
    }

    /* section heads everywhere: a plain, quiet fade so the nine moves stay the loud part */
    $('.section-head').forEach(function(h){ h.classList.add('hm-a'); io.observe(h); });

    /* + the spine */
    var spine = document.createElement('div');
    spine.className = 'hm-spine'; spine.setAttribute('aria-hidden', 'true');
    spine.innerHTML = '<i></i>';
    body.appendChild(spine);
    var dark = $('.tap-new-hero, .final-cta-section, .site-footer'), tick = false;
    function onScroll(){
        if (tick) return; tick = true;
        requestAnimationFrame(function(){
            var h = doc.scrollHeight - doc.clientHeight;
            spine.style.setProperty('--hm-p', h > 0 ? (doc.scrollTop / h).toFixed(4) : 0);
            var mid = window.innerHeight / 2, onDark = false;
            for (var i = 0; i < dark.length; i++){ var r = dark[i].getBoundingClientRect(); if (r.top < mid && r.bottom > mid){ onDark = true; break; } }
            body.classList.toggle('hm-dark', onDark);
            tick = false;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll); onScroll();

    /* 9 closing CTA — the converging lines (the only canvas on this page) */
    if (cta && document.createElement('canvas').getContext){
        var cv = document.createElement('canvas');
        cv.className = 'hm-spark'; cv.setAttribute('aria-hidden', 'true');
        cta.insertBefore(cv, cta.firstChild);
        var x = cv.getContext('2d'), W = 0, H = 0, P = [], run = false, last = 0, glow = 0, fx = 0, fy = 0;
        function seed(){
            var e = Math.random(), px, py;
            if (e < .5){ px = Math.random() * W; py = Math.random() < .5 ? -20 : H + 20; }
            else { px = Math.random() < .5 ? -20 : W + 20; py = Math.random() * H; }
            return { ox: px, oy: py, t: Math.random(), v: .1 + Math.random() * .22, c: Math.random() < .45, r: .9 + Math.random() * 1.6 };
        }
        function layout(){
            W = cta.offsetWidth; H = cta.offsetHeight;
            var r = Math.min(window.devicePixelRatio || 1, 1.75);
            cv.width = Math.max(1, Math.round(W * r)); cv.height = Math.max(1, Math.round(H * r));
            x.setTransform(r, 0, 0, r, 0, 0);
            var cr = cta.getBoundingClientRect();
            if (h2){ var hr = h2.getBoundingClientRect(); fx = hr.left - cr.left + hr.width * .5; fy = hr.top - cr.top + hr.height * .5; }
            else { fx = W * .3; fy = H * .5; }
            var want = W < 760 ? 30 : 64;
            while (P.length > want) P.pop();
            while (P.length < want) P.push(seed());
        }
        function frame(now){
            if (!run) return;
            var dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
            var arrived = 0, i;
            x.clearRect(0, 0, W, H);
            for (i = 0; i < P.length; i++){
                var p = P[i];
                p.t += dt * p.v; if (p.t >= 1){ P[i] = seed(); continue; }
                var e = 1 - Math.pow(1 - p.t, 3), px = p.ox + (fx - p.ox) * e, py = p.oy + (fy - p.oy) * e, tail = Math.max(0, e - .12);
                if (p.t > .82) arrived++;
                x.beginPath(); x.moveTo(p.ox + (fx - p.ox) * tail, p.oy + (fy - p.oy) * tail); x.lineTo(px, py);
                x.strokeStyle = 'rgba(' + (p.c ? '217,83,30' : '255,255,255') + ',' + (.05 + e * .22) + ')'; x.lineWidth = 1; x.stroke();
                x.beginPath(); x.arc(px, py, p.r, 0, 6.283);
                x.fillStyle = 'rgba(' + (p.c ? '217,83,30' : '255,255,255') + ',' + (.2 + e * .6) + ')'; x.fill();
            }
            glow += (Math.min(1, arrived / 8) - glow) * .08;
            if (glow > .01){
                var g = x.createRadialGradient(fx, fy, 0, fx, fy, 110 + glow * 80);
                g.addColorStop(0, 'rgba(217,83,30,' + (.2 * glow) + ')'); g.addColorStop(1, 'rgba(217,83,30,0)');
                x.fillStyle = g; x.beginPath(); x.arc(fx, fy, 110 + glow * 80, 0, 6.283); x.fill();
            }
            requestAnimationFrame(frame);
        }
        function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }
        layout();
        var rt = 0; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(layout, 180); });
        window.addEventListener('load', layout);
        document.addEventListener('visibilitychange', function(){ if (document.hidden) setRun(false); });
        new IntersectionObserver(function(es){
            var vis = es[0].isIntersecting;
            cta.classList.toggle('hm-live', vis);              // the two loops only exist while it is on screen
            setRun(vis && !document.hidden);
        }, { rootMargin: '10% 0px' }).observe(cta);
    }
})();
</script>
<!-- home-motion-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- home-motion:start -->[\s\S]*?<!-- home-motion:end -->\n/, '')
          .replace(/<!-- home-motion-js:start -->[\s\S]*?<!-- home-motion-js:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    // the sections this layer choreographs must all still be there
    ['<section class="tap-new-hero">', 'promise-media', 'pillars-grid', 'regions-grid', 'compare-grid',
     'numbers-grid', 'cases-grid', '<div class="final-cta">'].forEach(k => L.must(s, k));
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'home-motion:start', 1); L.must(s, 'home-motion-js:start', 1);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'home motion stripped:' : 'home motion applied:'), rel);
}
