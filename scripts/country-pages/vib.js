'use strict';
// VIB layer for the US homepage ONLY (owner, 2026-09-03: "make all the content on that page VIBGYOR
// animation"). Fifth layer, additive on cinematic + imax + flow + engine. Marker-wrapped, idempotent,
// --strip removes it in one command.
//
// Every non-interactive text element on the page gets one animated VIBGYOR gradient clipped to its
// glyphs, so the whole page shimmers through violet-indigo-blue-green-yellow-orange-red and back.
//
// Two things make that survivable on a live commercial page:
//   1 TWO PALETTES, PICKED FROM THE REAL BACKGROUND. The layer walks up from each text element to the
//     nearest painted background, measures its luminance, and uses dark VIBGYOR stops on light sections
//     and light VIBGYOR stops on dark ones. Every stop is chosen to clear 4.5:1 against its own ground,
//     so body copy stays as readable as it was in flat ink.
//   2 IT ONLY TOUCHES TEXT IT CANNOT BREAK. Elements are skipped when they paint their own background
//     (buttons, badges, chips, table headers — clipping there would erase the background), when their
//     text carries emoji (a transparent fill hides colour glyphs), when they are interactive (links,
//     buttons, inputs: colour is how a link is identified, so links keep their own colour), inside the
//     header, nav, drawer or the layer UI, or inside the hero ghost text, which already runs its own
//     sheen from the flow layer.
// Perf: the animation only runs on elements in the viewport (IntersectionObserver), and it steps rather
// than sliding — 90 steps over 12s, so the colour drift is a seventh of the repaint cost and still
// imperceptibly smooth at this speed. Off entirely under prefers-reduced-motion (flat ink, untouched).
//   node scripts/country-pages/vib.js           apply / re-apply
//   node scripts/country-pages/vib.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

// dark stops for light grounds (each >= 4.5:1 on white), light stops for dark grounds (>= 8:1 on navy)
const DARK = '#7A2F86,#3B3AA8,#0B5F77,#0F6B3C,#6B5E00,#8A4B00,#B3261E,#7A2F86';
const LIGHT = '#D9A6FF,#B9A6FF,#7FE3FF,#86FFAE,#FFF06B,#FFC46B,#FF8A8A,#D9A6FF';

const CSS = `<!-- vib-layer:start -->
<style>
  /* ================= VIB LAYER (2026-09-03) — VIBGYOR on every line of copy ================= */
  .vib{ background-image:linear-gradient(90deg, ${DARK}); background-size:300% 100%; background-position:0% 50%; background-repeat:no-repeat; -webkit-background-clip:text; background-clip:text; color:transparent !important; -webkit-text-fill-color:transparent; }
  .vib.vib-l{ background-image:linear-gradient(90deg, ${LIGHT}); }
  .vib.vib-on{ animation:vibFlow 12s steps(90, end) infinite; animation-delay:var(--vd, 0s); }
  @keyframes vibFlow{ to{ background-position:100% 50%; } }
  /* a link inside rainbow copy must still look like a link, so it keeps its own colour and an underline */
  .vib a{ -webkit-text-fill-color:currentColor !important; color:var(--orange-dark) !important; text-decoration:underline; }
  .vib.vib-l a{ color:#FFC46B !important; }
  /* headings carry the wave a little harder than body copy */
  h1.vib, h2.vib, h3.vib, .num.vib, .us-cost-num.vib, .region-rate-amount.vib{ background-size:200% 100%; }
  @media (prefers-reduced-motion: reduce){
    .vib{ background-image:none !important; color:inherit !important; -webkit-text-fill-color:currentColor !important; animation:none !important; }
  }
</style>
<!-- vib-layer:end -->
`;

const JS = `<!-- vib-layer-js:start -->
<script>
(function(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // interactive elements keep their own colour; these regions and icon spans are left alone entirely
    var SKIP_SELF = 'a, button, input, select, textarea, label, summary, [role="button"]';
    var SKIP_IN = '.site-header, .mobile-drawer, .nav-dropdown-panel, .imx-rail, .flow-turn, .flow-hint,' +
                  ' .eng-packet, .hero-side-text, #zoho-modal, .mobile-sticky-cta, .whatsapp-float, .gmail-popover, .back-to-top';
    var SKIP_CLS = '.faq-icon, .us-module-icon, .erp-benefit-icon, .security-badge-icon, .us-industry-icon,' +
                   ' .nav-dropdown-icon, .logo-mark, .logo-text, .imx-clock-dot, .hero-feature-item';
    // clipping an ancestor would erase these children's own backgrounds, so their ancestors are skipped
    var BG_INSIDE = '.region-save, .case-tag, .erp-stack-item, .us-compare-hi, button, .primary-btn-large,' +
                    ' .btn-navy, .btn-ghost, .imx-clock-dot, [class*="badge"], [class*="tag"], [class*="chip"]';
    // real emoji / dingbat / flag blocks only — arrows, dashes and quotes must not disqualify a line
    var EMOJI = /[\\u{1F000}-\\u{1FAFF}\\u{2600}-\\u{27BF}\\u{2B00}-\\u{2BFF}\\u{FE0F}\\u{20E3}]/u;
    var CAND = 'h1, h2, h3, h4, h5, h6, p, li, td, th, dt, dd, blockquote, figcaption, caption, span, b, strong, em, small';

    function ground(el){                                     // luminance of the nearest painted background
        for (var n = el; n && n !== document.documentElement; n = n.parentElement){
            var cs = getComputedStyle(n), bc = cs.backgroundColor, m = bc && bc.match(/[\\d.]+/g);
            // every gradient ground on this page (hero, chapter bands, final CTA) is navy-dark
            if (cs.backgroundImage !== 'none' && /gradient/.test(cs.backgroundImage)) return .1;
            if (m && m.length >= 3 && (m.length < 4 || parseFloat(m[3]) > .5)){
                return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
            }
        }
        return 1;                                            // page default is white paper
    }
    var list = [], i, el, cs, t;
    var nodes = document.querySelectorAll(CAND);             // document order: outermost text block wins
    for (i = 0; i < nodes.length; i++){
        el = nodes[i];
        if (el.matches(SKIP_SELF) || el.matches(SKIP_CLS) || el.closest(SKIP_IN)) continue;
        // textContent, not just direct text: the IMAX layer splits headings into per-word spans, and
        // background-clip:text on the heading still clips to every glyph inside it
        t = (el.textContent || '').replace(/\\s+/g, ' ').trim();
        if (!t || EMOJI.test(t)) continue;
        if (el.querySelector(BG_INSIDE)) continue;
        cs = getComputedStyle(el);
        if (cs.backgroundImage !== 'none') continue;         // it paints its own background: clipping would erase it
        var bg = cs.backgroundColor && cs.backgroundColor.match(/[\\d.]+/g);
        if (bg && bg.length >= 3 && (bg.length < 4 || parseFloat(bg[3]) > .05)) continue;
        if (el.parentElement && el.parentElement.closest('.vib')) continue;   // one gradient per block, not per span
        var lum = ground(el.parentElement || el);            // measure first: .vib adds a gradient of its own
        el.classList.add('vib');
        if (lum < .45) el.classList.add('vib-l');            // dark ground: light VIBGYOR, else the dark set
        el.style.setProperty('--vd', (-(i % 40) * .3).toFixed(1) + 's');   // stagger, so the wave travels
        list.push(el);
    }
    // only shimmer what is on screen
    if ('IntersectionObserver' in window){
        var io = new IntersectionObserver(function(es){
            for (var k = 0; k < es.length; k++) es[k].target.classList.toggle('vib-on', es[k].isIntersecting);
        }, { rootMargin: '10% 0px' });
        for (i = 0; i < list.length; i++) io.observe(list[i]);
    } else for (i = 0; i < list.length; i++) list[i].classList.add('vib-on');
    window.__vib = list.length;
})();
</script>
<!-- vib-layer-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- vib-layer:start -->[\s\S]*?<!-- vib-layer:end -->\n/, '')
          .replace(/<!-- vib-layer-js:start -->[\s\S]*?<!-- vib-layer-js:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, 'flow-layer-js:start', 1);      // the hero ghost text keeps its own sheen from the flow layer
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'vib-layer:start', 1); L.must(s, 'vib-layer-js:start', 1); L.must(s, '@keyframes vibFlow', 1);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'vib layer stripped:' : 'vib layer applied:'), rel);
}
