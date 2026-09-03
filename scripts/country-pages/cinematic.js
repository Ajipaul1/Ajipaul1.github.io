'use strict';
// Cinematic layer for the US pages (owner, 2026-09-03: "full screen, IMAX experience, animations,
// background beauty"). Additive CSS + JS only, brand palette only, every motion disabled under
// prefers-reduced-motion, nothing blocks reading. Idempotent: re-running replaces the layer.
//   - hero: full-viewport (min(94vh,980px)), drifting aurora orbs (screen-blended), fine grid, vignette,
//     staggered entrance, scroll cue
//   - 3px scroll-progress bar
//   - ambient dot-grid + drifting glow on content sections
//   - full-bleed dark "chapter" bands (why-us / proof / how-it-works) with a low-opacity photo + glass cards
//   - process timeline that draws across as it enters view; step borders light up in sequence
//   - count-up numbers (trust strip, stat cards, cost cards); staggered reveals; image settle on reveal
//   - cursor-follow spotlight on cards (hover-capable devices only)
//   - aurora glow behind the final CTA band
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');

const PAGES = {
  'us/index.html': { bands: [['<section id="how-it-works" class="us-section us-section-alt">', '<section id="how-it-works" class="us-section us-section-alt band-cinema" style="--band-img:url(\'/assets/images/library/istock-1674601384-woman-world-map-teal-global.jpg\')">']] },
  'us/erp/index.html': { bands: [['<section class="tap-erp-why-section">', '<section class="tap-erp-why-section band-cinema" style="--band-img:url(\'/assets/images/library/istock-2189585598-electronics-factory-engineers-laptop.jpg\')">']] },
  'us/seo-services/index.html': { bands: [
    ['<section class="tap-erp-why-section">', '<section class="tap-erp-why-section band-cinema" style="--band-img:url(\'/assets/images/library/istock-2148073937-ai-wireframe-head-particles.jpg\')">'],
    ['<section id="seo-proof" class="us-section">', '<section id="seo-proof" class="us-section band-cinema" style="--band-img:url(\'/assets/images/library/istock-1128252197-analyst-data-wall-pencil-thinking.jpg\')">'],
  ] },
  'us/website-development/index.html': { bands: [['<section class="tap-erp-why-section">', '<section class="tap-erp-why-section band-cinema" style="--band-img:url(\'/assets/images/library/istock-2228764569-developer-night-debugging-monitors.jpg\')">']] },
};

const CSS = `<!-- cinematic-layer:start -->
<style>
  /* ================= CINEMATIC LAYER (2026-09-03) ================= */
  .scroll-progress{ position:fixed; top:0; left:0; width:100%; height:3px; z-index:10000; pointer-events:none; transform-origin:0 50%; transform:scaleX(0); background:linear-gradient(90deg, var(--orange-dark), var(--orange)); box-shadow:0 0 12px rgba(217,83,30,.45); }

  /* hero: full viewport + ambient layers */
  .tap-new-hero.hero-cinema{ min-height:min(94vh, 980px); display:flex; align-items:center; padding-top:96px; padding-bottom:120px; }
  .hero-cinema > .container{ position:relative; z-index:2; width:100%; }
  .hero-aurora{ position:absolute; inset:-25%; z-index:0; pointer-events:none; filter:blur(64px); opacity:.85; }
  .hero-aurora span{ position:absolute; border-radius:50%; mix-blend-mode:screen; will-change:transform; }
  .hero-aurora span:nth-child(1){ width:58vw; height:58vw; left:-6%; top:-4%; background:radial-gradient(circle, rgba(217,83,30,.38) 0%, transparent 66%); animation:aurA 28s ease-in-out infinite alternate; }
  .hero-aurora span:nth-child(2){ width:46vw; height:46vw; right:2%; top:18%; background:radial-gradient(circle, rgba(255,255,255,.13) 0%, transparent 66%); animation:aurB 34s ease-in-out infinite alternate; }
  .hero-aurora span:nth-child(3){ width:40vw; height:40vw; left:28%; bottom:-22%; background:radial-gradient(circle, rgba(217,83,30,.22) 0%, transparent 66%); animation:aurC 31s ease-in-out infinite alternate; }
  @keyframes aurA{ from{ transform:translate3d(0,0,0) scale(1); } to{ transform:translate3d(14vw,10vh,0) scale(1.18); } }
  @keyframes aurB{ from{ transform:translate3d(0,0,0) scale(1.1); } to{ transform:translate3d(-12vw,-8vh,0) scale(.92); } }
  @keyframes aurC{ from{ transform:translate3d(0,0,0) scale(.95); } to{ transform:translate3d(-9vw,-14vh,0) scale(1.2); } }
  .hero-gridlines{ position:absolute; inset:0; z-index:0; pointer-events:none; background-image:linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px); background-size:72px 72px; -webkit-mask-image:radial-gradient(ellipse 68% 62% at 50% 42%, #000 20%, transparent 80%); mask-image:radial-gradient(ellipse 68% 62% at 50% 42%, #000 20%, transparent 80%); }
  .hero-vignette{ position:absolute; inset:0; z-index:0; pointer-events:none; background:radial-gradient(ellipse 92% 82% at 50% 46%, transparent 42%, rgba(6,17,29,.62) 100%); }
  .hero-cinema .hero-main-content > *{ opacity:0; transform:translateY(22px); animation:heroIn 1s cubic-bezier(.2,.8,.2,1) forwards; }
  .hero-cinema .hero-main-content > *:nth-child(1){ animation-delay:.1s; }
  .hero-cinema .hero-main-content > *:nth-child(2){ animation-delay:.22s; }
  .hero-cinema .hero-main-content > *:nth-child(3){ animation-delay:.34s; }
  .hero-cinema .hero-main-content > *:nth-child(4){ animation-delay:.46s; }
  .hero-cinema .hero-main-content > *:nth-child(5){ animation-delay:.6s; }
  .hero-cinema .hero-main-content > *:nth-child(6){ animation-delay:.74s; }
  @keyframes heroIn{ to{ opacity:1; transform:none; } }
  .hero-scroll-cue{ position:absolute; left:50%; bottom:26px; transform:translateX(-50%); z-index:3; color:rgba(255,255,255,.55); font-size:1.4rem; animation:cueBob 2.2s ease-in-out infinite; pointer-events:none; }
  @keyframes cueBob{ 0%,100%{ transform:translateX(-50%) translateY(0); } 50%{ transform:translateX(-50%) translateY(8px); } }
  @media (max-width:1100px){ .hero-scroll-cue{ display:none; } }
  @media (max-width:760px){ .tap-new-hero.hero-cinema{ min-height:auto; padding-top:72px; padding-bottom:84px; } .hero-aurora{ filter:blur(40px); } }

  /* ambient content sections: fine dot grid + one slow orange glow */
  .us-section, .tap-erp-what-section, .tap-erp-process-section, .tap-pillars-section, .tap-regions-section, .tap-cases-section{ position:relative; overflow:hidden; }
  .us-section > .container, .tap-erp-what-section > .container, .tap-erp-process-section > .container, .tap-pillars-section > .container, .tap-regions-section > .container, .tap-cases-section > .container{ position:relative; z-index:2; }
  .us-section::before, .tap-erp-what-section::before, .tap-erp-process-section::before, .tap-pillars-section::before, .tap-regions-section::before, .tap-cases-section::before{ content:''; position:absolute; inset:0; z-index:0; pointer-events:none; background-image:radial-gradient(rgba(14,42,62,.075) 1px, transparent 1.3px); background-size:28px 28px; -webkit-mask-image:radial-gradient(ellipse 85% 75% at 50% 50%, #000 15%, transparent 78%); mask-image:radial-gradient(ellipse 85% 75% at 50% 50%, #000 15%, transparent 78%); }
  .us-section-alt::after, .tap-erp-process-section::after, .tap-regions-section::after{ content:''; position:absolute; z-index:0; pointer-events:none; width:48vw; height:48vw; right:-16vw; top:-20%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.09) 0%, transparent 64%); filter:blur(24px); animation:glowDrift 36s ease-in-out infinite alternate; }
  @keyframes glowDrift{ from{ transform:translate3d(0,0,0); } to{ transform:translate3d(-10vw,18vh,0); } }

  /* full-bleed dark chapter bands */
  .band-cinema{ background:var(--navy-deep) !important; border-color:transparent !important; color:#fff; position:relative; overflow:hidden; }
  .band-cinema::before{ content:''; position:absolute; inset:0; z-index:0; pointer-events:none; background-image:var(--band-img); background-size:cover; background-position:center; background-repeat:no-repeat; opacity:.16; filter:saturate(.55); transform:scale(1.04); -webkit-mask-image:none; mask-image:none; }
  .band-cinema::after{ content:''; position:absolute; inset:0; z-index:0; pointer-events:none; width:auto; height:auto; border-radius:0; filter:none; animation:none; background:linear-gradient(115deg, rgba(11,32,54,.94) 0%, rgba(11,32,54,.74) 55%, rgba(217,83,30,.24) 100%); }
  .band-cinema > .container{ position:relative; z-index:2; }
  .band-cinema .section-head h2{ color:#fff; }
  .band-cinema .eyebrow{ color:var(--orange); }
  .band-cinema .eyebrow::before{ background:var(--orange); border-color:var(--orange); }
  .band-cinema .us-lead{ color:rgba(255,255,255,.72); }
  .band-cinema .us-stat-card, .band-cinema .security-badge-item{ background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.16); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); }
  /* the template ships no grid rules for the badges (they stacked as full-width rows) — define them here */
  .band-cinema .security-badges-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:36px; }
  .band-cinema .security-badge-item{ border-radius:14px; padding:24px 22px; display:flex; flex-direction:column; gap:12px; transition:transform .2s ease, border-color .2s ease; }
  .band-cinema .security-badge-item:hover{ transform:translateY(-3px); border-color:rgba(217,83,30,.55); }
  .band-cinema .security-badge-icon{ font-size:1.6rem; line-height:1; }
  .band-cinema .security-badge-item h4{ color:#fff; font-size:0.98rem; margin:0; }
  @media (max-width:1100px){ .band-cinema .security-badges-grid{ grid-template-columns:repeat(2,1fr); } }
  @media (max-width:560px){ .band-cinema .security-badges-grid{ grid-template-columns:1fr; } }
  .band-cinema .us-stat-card .lbl{ color:rgba(255,255,255,.72); }
  .band-cinema .erp-stack-strip{ border-top-color:rgba(255,255,255,.18); }
  .band-cinema .erp-stack-label{ color:rgba(255,255,255,.55); }
  .band-cinema .erp-stack-item{ background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.18); color:#fff; }

  /* process timeline draws across; steps light up in sequence */
  .erp-process-row::before{ content:''; position:absolute; left:0; right:0; top:0; height:2px; z-index:1; pointer-events:none; background:linear-gradient(90deg, var(--orange) 0%, var(--orange) 55%, rgba(217,83,30,.15) 100%); transform:scaleX(0); transform-origin:0 50%; transition:transform 1.6s cubic-bezier(.2,.8,.2,1); }
  .erp-process-row.in::before{ transform:scaleX(1); }
  .erp-process-row .erp-process-step{ border-top-color:rgba(217,83,30,.18); transition:border-color .5s ease; transition-delay:calc(var(--i,0) * .22s); }
  .erp-process-row.in .erp-process-step{ border-top-color:var(--orange); }
  .erp-process-row.in .erp-process-num{ animation:numPop .55s cubic-bezier(.2,.8,.2,1) both; animation-delay:calc(var(--i,0) * .22s); }
  @keyframes numPop{ 0%{ transform:scale(.6); box-shadow:0 0 0 0 rgba(217,83,30,.5); } 60%{ transform:scale(1.12); } 100%{ transform:scale(1); box-shadow:0 0 0 10px rgba(217,83,30,0); } }
  @media (max-width:900px){ .erp-process-row::before{ display:none; } }

  /* staggered reveals + image settle */
  .reveal, .reveal.in{ transition-delay:calc(var(--i,0) * 70ms); }
  .promise-grid.reveal .promise-media img{ transform:scale(1.08); transition:transform 1.4s cubic-bezier(.2,.8,.2,1); }
  .promise-grid.reveal.in .promise-media img{ transform:scale(1); }

  /* cursor spotlight on cards */
  .card-spot{ position:relative; }
  .card-spot > .spot{ position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:0; transition:opacity .3s ease; z-index:1; background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(217,83,30,.14), transparent 60%); }
  .card-spot:hover > .spot{ opacity:1; }
  .band-cinema .card-spot > .spot{ background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.12), transparent 60%); }

  /* final CTA: same aurora as the opening */
  .final-cta-section{ position:relative; overflow:hidden; }
  .final-cta-section::before{ content:''; position:absolute; z-index:0; pointer-events:none; width:60vw; height:60vw; left:-18vw; top:-40%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.30), transparent 62%); filter:blur(50px); animation:aurA 30s ease-in-out infinite alternate; }
  .final-cta-section > *{ position:relative; z-index:2; }

  @media (prefers-reduced-motion: reduce){
    .hero-aurora span, .hero-scroll-cue, .us-section-alt::after, .tap-erp-process-section::after, .tap-regions-section::after, .final-cta-section::before, .erp-process-row.in .erp-process-num{ animation:none !important; }
    .hero-cinema .hero-main-content > *{ animation:none !important; opacity:1 !important; transform:none !important; }
    .scroll-progress{ display:none; }
    .erp-process-row::before{ transform:scaleX(1); transition:none; }
    .erp-process-row .erp-process-step{ border-top-color:var(--orange) !important; transition:none; }
    .promise-grid.reveal .promise-media img{ transform:none; transition:none; }
    .reveal, .reveal.in{ transition-delay:0s; }
    .card-spot > .spot{ display:none; }
  }
</style>
<!-- cinematic-layer:end -->
`;

const JS = `<!-- cinematic-layer-js:start -->
<script>
(function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // stagger indexes for grid children (used by reveal + process timeline)
    document.querySelectorAll('.erp-benefit-row, .erp-advantages-grid, .erp-process-row, .security-badges-grid, .us-modules-grid, .us-industries-grid, .us-cost-grid, .us-stat-row, .pillars-grid, .regions-grid, .cases-grid, .compare-grid, .numbers-grid, .faq-accordion').forEach(function(g){
        Array.prototype.forEach.call(g.children, function(c, i){ c.style.setProperty('--i', Math.min(i, 8)); });
    });
    if (reduce) return;
    // scroll progress
    var bar = document.createElement('div'); bar.className = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
    var ticking = false;
    function onScroll(){ if (ticking) return; ticking = true; requestAnimationFrame(function(){ var h = document.documentElement; var max = h.scrollHeight - h.clientHeight; bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')'; ticking = false; }); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    // count-up numbers (skips ranges like 6-10 wks)
    function countUp(el){
        var t = el.getAttribute('data-target'); var m = t.match(/^([^\\d]*)([\\d,]*\\.?\\d+)(.*)$/); if (!m) return;
        var pre = m[1], numStr = m[2], suf = m[3], hasComma = numStr.indexOf(',') > -1, dec = (numStr.split('.')[1] || '').length, target = parseFloat(numStr.replace(/,/g, ''));
        var start = performance.now(), dur = 1400;
        function fmt(v){ var s = v.toFixed(dec); if (hasComma) { var p = s.split('.'); p[0] = p[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ','); s = p.join('.'); } return s; }
        function step(now){ var p = Math.min(1, (now - start) / dur); var e = 1 - Math.pow(1 - p, 3); el.textContent = pre + fmt(target * e) + suf; if (p < 1) requestAnimationFrame(step); else el.textContent = t; }
        requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (!e.isIntersecting) return; e.target.classList.add('in'); if (e.target.classList.contains('count-up')) countUp(e.target); io.unobserve(e.target); }); }, { rootMargin: '0px 0px -10% 0px' });
        document.querySelectorAll('.erp-process-row').forEach(function(r){ io.observe(r); });
        document.querySelectorAll('.us-stat-card .num, .trust-item .num, .number-stat-item .num, .us-cost-card .us-cost-num').forEach(function(n){
            var t = n.textContent.trim(); if (/[\\u2013\\u2014-]/.test(t) || !/\\d/.test(t)) return;
            n.classList.add('count-up'); n.setAttribute('data-target', t); io.observe(n);
        });
    }
    // cursor spotlight on cards (hover-capable devices only)
    if (window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
        document.querySelectorAll('.us-module-card, .us-cost-card, .us-industry-card, .erp-advantage-card, .erp-benefit-item, .pillar-card, .region-card, .case-card, .us-stat-card, .security-badge-item, .compare-card').forEach(function(c){
            c.classList.add('card-spot'); var s = document.createElement('i'); s.className = 'spot'; s.setAttribute('aria-hidden', 'true'); c.appendChild(s);
            c.addEventListener('mousemove', function(ev){ var r = c.getBoundingClientRect(); c.style.setProperty('--mx', ((ev.clientX - r.left) / r.width * 100) + '%'); c.style.setProperty('--my', ((ev.clientY - r.top) / r.height * 100) + '%'); });
        });
    }
})();
</script>
<!-- cinematic-layer-js:end -->
`;

const HERO_LAYERS = `    <div class="hero-aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="hero-gridlines" aria-hidden="true"></div>
    <div class="hero-vignette" aria-hidden="true"></div>
`;

for (const [rel, cfg] of Object.entries(PAGES)) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  // strip a previous run
  s = s.replace(/<!-- cinematic-layer:start -->[\s\S]*?<!-- cinematic-layer:end -->\n/, '').replace(/<!-- cinematic-layer-js:start -->[\s\S]*?<!-- cinematic-layer-js:end -->\n/, '');
  s = s.replace(/    <div class="hero-aurora"[\s\S]*?<div class="hero-vignette" aria-hidden="true"><\/div>\n/, '');
  s = s.replace(/    <div class="hero-scroll-cue" aria-hidden="true">&darr;<\/div>\n/, '');
  s = s.replace('<section class="tap-new-hero hero-cinema">', '<section class="tap-new-hero">');
  for (const [, to] of cfg.bands) { const from = to.replace(/ band-cinema" style="--band-img:url\('[^']*'\)"/, '"'); s = s.split(to).join(from); }
  // hero
  s = L.replaceAll(s, '<section class="tap-new-hero">', '<section class="tap-new-hero hero-cinema">', 1);
  s = L.replaceAll(s, '    <div class="hero-spotlight" aria-hidden="true"></div>\n', '    <div class="hero-spotlight" aria-hidden="true"></div>\n' + HERO_LAYERS, 1);
  s = L.replaceAll(s, '</section>\n\n<section class="tap-answer-section">', '    <div class="hero-scroll-cue" aria-hidden="true">&darr;</div>\n</section>\n\n<section class="tap-answer-section">', 1);
  // bands
  for (const [from, to] of cfg.bands) s = L.replaceAll(s, from, to, 1);
  // css + js
  s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
  s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
  L.must(s, '<section class="tap-new-hero hero-cinema">', 1); L.must(s, 'band-cinema" style=', cfg.bands.length);
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log('cinematic layer applied:', rel, '(bands:', cfg.bands.length + ')');
}
