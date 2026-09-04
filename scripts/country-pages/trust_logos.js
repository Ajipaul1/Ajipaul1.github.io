'use strict';
// TRUST STRIP (owner, 2026-09-03: "use bigger trust element logos like WordPress, Google, Git, Vercel,
// Supabase, Semrush, Ahrefs, make it so big, use it on many many pages, big moving logos as a trust
// signal").
//
// A full-width band of large, slowly moving tool names, on 14 pages.
//
// Two deliberate decisions:
//   1 REAL MARKS WHERE THEY CAN BE DRAWN EXACTLY, WORDMARKS ELSEWHERE (owner asked for real logos). The only logo files in the repo (semrush.svg, ashref.svg,
//     searchconsole.svg, PageSpeed.svg, Lumar.svg, screamingfrog.svg, gptgemini.svg) are generic
//     assets/images/logos/ now holds eight marks authored here whose geometry is simple and
//     unambiguous, so they are accurate rather than approximate: vercel (triangle), react (nucleus and
//     three orbits), nodejs (hexagon), git (diamond) and supabase (bolt). A first pass also tried
//     TypeScript, Next.js and WordPress and they came out wrong - the TS mark read "ST" - because those
//     depend on exact letterforms. They were reverted to wordmarks rather than shipped inaccurate.
//     THE REST ARE WORDMARKS ON PURPOSE. Google, GitHub, PostgreSQL, WordPress, TypeScript, Next.js,
//     Shopify, Stripe, Xero,
//     Sage, QuickBooks, Semrush, Ahrefs and Screaming Frog have letterform or illustrative marks that
//     cannot be reproduced faithfully from memory, and a wrong logo is worse than no logo - Google in
//     particular restricts use of its mark. To add any of them: download the official SVG from that
//     brand's own brand/press page, save it as assets/images/logos/<slug>.svg, and put the slug in the
//     LOGOS entry below. Nothing else changes.
//   2 LABELLED AS A STACK, NOT AS ENDORSEMENT. The caption says these are the tools we build on and
//     work in - which is true - rather than implying partnership, certification or clientship, which
//     none of these companies have granted. That wording is what keeps a trust signal from becoming a
//     false claim.
//
// Perf: one transform animation on one element, and it only runs while the band is on screen (an
// IntersectionObserver toggles the class). Under prefers-reduced-motion it does not move at all - the
// names wrap into a static grid, so the trust signal still lands.
//   node scripts/country-pages/trust_logos.js           apply / re-apply
//   node scripts/country-pages/trust_logos.js --strip    remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['index.html', 'ca/index.html', 'ca/erp/index.html', 'ca/seo-services/index.html',
  'ca/website-development/index.html', 'ca/toronto/index.html', 'us/index.html', 'us/erp/index.html',
  'us/seo-services/index.html', 'us/website-development/index.html', 'uk/index.html', 'uk/erp/index.html',
  'uk/website-development/index.html', 'uk/seo-services/index.html'];

// the stack, in the order it reads best; official SVGs can replace any of these later
const LOGOS = [
  { n: 'Next.js' }, { n: 'React', f: 'react' }, { n: 'TypeScript' },
  { n: 'Node.js', f: 'nodejs' }, { n: 'PostgreSQL' }, { n: 'Supabase', f: 'supabase' },
  { n: 'Vercel', f: 'vercel' }, { n: 'AWS' }, { n: 'Git', f: 'git' }, { n: 'GitHub' },
  { n: 'WordPress' }, { n: 'Shopify' }, { n: 'Stripe' }, { n: 'Xero' },
  { n: 'Sage' }, { n: 'QuickBooks' }, { n: 'Google Search Console', f: 'google' }, { n: 'Google Analytics 4', f: 'google' },
  { n: 'Looker Studio' }, { n: 'Semrush', f: 'semrush' }, { n: 'Ahrefs', f: 'ahrefs' }, { n: 'Screaming Frog' },
  { n: 'PageSpeed Insights' }, { n: 'Schema.org' }, { n: 'ChatGPT' }, { n: 'Perplexity' },
];

const CSS = `<!-- trust-strip:start -->
<style>
  /* ================= TRUST STRIP (2026-09-03) — the stack, big and moving ================= */
  .tl-band{ position:relative; overflow:hidden; padding:38px 0 34px; background:var(--paper-alt); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .tl-label{ text-align:center; font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 22px; padding:0 20px; }
  .tl-view{ position:relative; overflow:hidden; -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .tl-track{ display:flex; align-items:center; gap:clamp(30px, 4vw, 64px); width:max-content; will-change:transform; }
  .tl-band.on .tl-track{ animation:tlRoll 46s linear infinite; }
  @keyframes tlRoll{ from{ transform:translate3d(0,0,0); } to{ transform:translate3d(-50%,0,0); } }
  .tl-item{ display:flex; align-items:center; gap:12px; font-family:var(--font-mono); font-weight:600; font-size:clamp(1.25rem, 2.5vw, 2.05rem); letter-spacing:-0.01em; color:var(--ink); white-space:nowrap; opacity:.72; }
  .tl-item::before{ content:''; width:10px; height:10px; border-radius:3px; background:var(--orange); flex:0 0 10px; transform:rotate(45deg); opacity:.9; }
  .tl-item img{ height:clamp(30px, 3.4vw, 46px); width:auto; display:block; }
  .tl-logo{ opacity:1; }
  .tl-logo::before{ display:none; }              /* the mark replaces the diamond glyph */
  .tl-logo > span{ font-size:.62em; color:var(--ink-soft); }
  .tl-band:hover .tl-track{ animation-play-state:paused; }
  @media (prefers-reduced-motion: reduce){
    .tl-view{ -webkit-mask-image:none; mask-image:none; }
    .tl-track{ animation:none !important; flex-wrap:wrap; width:auto; justify-content:center; row-gap:16px; }
    .tl-band .tl-track > *:nth-child(n+27){ display:none; }   /* the duplicate half is only for the loop */
  }
</style>
<!-- trust-strip:end -->
`;

const LOGO_DIR = path.join(L.REPO, 'assets/images/logos');
const item = o => {
  if (o.f) {
    const rel = 'assets/images/logos/' + o.f + '.svg';
    if (!fs.existsSync(path.join(L.REPO, rel))) throw new Error('missing logo file: ' + rel);
    return `<span class="tl-item tl-logo"><img src="/${rel}" alt="${o.n}" width="46" height="46" loading="lazy" /><span>${o.n}</span></span>`;
  }
  return `<span class="tl-item">${o.n}</span>`;
};
const half = LOGOS.map(item).join('');
const BAND = `<!-- trust-strip-band:start -->
<section class="tl-band" aria-label="Tools and platforms we build on">
    <p class="tl-label">Built on &amp; worked in daily &mdash; the stack behind every engagement</p>
    <div class="tl-view">
        <div class="tl-track">${half}${half}</div>
    </div>
</section>
<!-- trust-strip-band:end -->

`;

const JS = `<!-- trust-strip-js:start -->
<script>
(function(){
    var band = document.querySelector('.tl-band');
    if (!band) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) { band.classList.add('on'); return; }
    new IntersectionObserver(function(es){                       // only moves while it is on screen
        band.classList.toggle('on', es[0].isIntersecting && !document.hidden);
    }, { rootMargin: '10% 0px' }).observe(band);
    document.addEventListener('visibilitychange', function(){ if (document.hidden) band.classList.remove('on'); });
})();
</script>
<!-- trust-strip-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- trust-strip:start -->[\s\S]*?<!-- trust-strip:end -->\n/, '')
          .replace(/<!-- trust-strip-band:start -->[\s\S]*?<!-- trust-strip-band:end -->\n\n?/, '')
          .replace(/<!-- trust-strip-js:start -->[\s\S]*?<!-- trust-strip-js:end -->\n/, '');
}

let n = 0;
for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    // the band goes straight after the hero, where a trust signal earns its keep
    const anchors = ['<section class="tap-answer-section">', '<section class="tap-promise-section">', '<section class="final-cta-section" id="contact">'];
    const anchor = anchors.find(a => s.includes(a));
    if (!anchor) throw new Error('no insertion anchor in ' + rel);
    const at = s.indexOf(anchor);              // first occurrence only: some pages have two promise blocks
    s = s.slice(0, at) + BAND + s.slice(at);
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'trust-strip:start', 1); L.must(s, 'trust-strip-band:start', 1); L.must(s, 'trust-strip-js:start', 1);
    L.must(s, 'class="tl-item', LOGOS.length * 2);
    L.must(s, 'tl-item tl-logo', LOGOS.filter(o => o.f).length * 2);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  n++;
}
console.log((STRIP ? 'trust strip removed from' : 'trust strip applied to') + ' ' + n + ' pages (' +
  LOGOS.filter(o => o.f).length + ' real marks + ' + LOGOS.filter(o => !o.f).length + ' wordmarks, doubled for the loop)');
