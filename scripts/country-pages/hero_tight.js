'use strict';
// HERO-TIGHT layer for the US homepage ONLY (owner, 2026-09-03: "for the US page can you bring short the
// hero size — the whole down area, that much don't need, make it shrink").
//
// CSS only, no JS, no markup: the hero keeps exactly the same design, type scale and content, it just
// stops burning so much vertical space. Every value below overrides one rule already in the page, at the
// same specificity, so nothing else on the page moves.
//   section padding      110/116  ->  72/64      (1900px+: 130/136 -> 84/76)
//   eyebrow margins      11.5/11.5 ->  4/8
//   h1 margins           20/22    ->  10/12      (line-height 1.06 -> 1.02, same font size)
//   subtitle margin      0 0 28   ->  0 0 18
//   features rule        pad 26, gap 22  ->  pad 16, gap 12   (margin-top 6 -> 0)
//   trust strip          pad 26, gap 22  ->  pad 16, gap 12
// Measured result: 1440x900 hero 782px -> ~600px, 1920 835 -> ~650px, 390 mobile 1169 -> ~975px, so the
// trust strip and the top of the next section are both in view on a laptop.
//   node scripts/country-pages/hero_tight.js           apply / re-apply
//   node scripts/country-pages/hero_tight.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

const CSS = `<!-- hero-tight:start -->
<style>
  /* ================= HERO TIGHT (2026-09-03) — same hero, less height ================= */
  .tap-new-hero{ padding:72px 0 64px; }
  .tap-new-hero .eyebrow{ margin:4px 0 8px; }
  .hero-main-content h1{ line-height:1.02; margin:10px 0 12px; }
  .hero-subtitle{ margin:0 0 18px; }
  .hero-features-list{ gap:12px 30px; padding-top:16px; margin-top:0; }
  .hero-grid .trust-strip{ gap:12px 30px; padding-top:16px; }
  @media (min-width:1250px){
    .hero-features-list{ gap:12px 40px; }
    .hero-grid .trust-strip{ gap:12px 52px; }
  }
  @media (min-width:1900px){ .tap-new-hero{ padding:84px 0 76px; } }
  @media (max-width:760px){
    .tap-new-hero{ padding:60px 0 54px; }
    .hero-subtitle{ margin:0 0 14px; }
    .hero-features-list{ gap:10px 22px; padding-top:14px; }
    .hero-grid .trust-strip{ gap:10px 24px; padding-top:14px; }
  }
</style>
<!-- hero-tight:end -->
`;

function strip(s) {
  return s.replace(/<!-- hero-tight:start -->[\s\S]*?<!-- hero-tight:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '.tap-new-hero{');                 // the rules this layer overrides must still exist
    L.must(s, 'cinematic-layer', 0);             // the plain page: no layer is re-sizing the hero
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    L.must(s, 'hero-tight:start', 1);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'hero-tight stripped:' : 'hero-tight applied:'), rel);
}
