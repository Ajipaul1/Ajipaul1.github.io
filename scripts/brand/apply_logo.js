'use strict';
// LOGO ON EVERY PAGE (owner, 2026-10-15: "Option A, screen face ... make it as logo on site ... jumping ... place
// nicely on the TechAuditPros letters, only the logo"). In every page's header and footer:
//   - the old "TA" box becomes the laptop screen-face mark (drawn in tap_mark.js), inline so it can move;
//   - the name gets the homepage title's split: "Tech" navy, "AuditPros" orange;
//   - only the mark moves: it jumps in sideways over the name and settles when the page opens (owner, 15 Oct),
//     hops when pointed at, and blinks every few seconds;
//     people who ask their device for less motion get it still;
//   - the phone home-screen icon link points at the new 180 px icon (was the 64 px favicon).
// The favicon files, logoonly.svg (also the logo Google reads) and favicon.ico come from build_kit.js.
//
//   node scripts/brand/apply_logo.js           update the pages
//   node scripts/brand/apply_logo.js --check   only count what would change
//
// Safe to run again at any time (it only changes what is still old). Run it after any generator that writes a
// header from an old copy. archive/in-kerala-pre-film/index.html is included on purpose: in_kerala_film.js rebuilds
// /in/kerala/ from it, so it must carry the new logo too.
const fs = require('fs'), path = require('path');
const M = require('./tap_mark');

const ROOT = path.resolve(__dirname, '..', '..');
const CHECK = process.argv.includes('--check');
const SKIP = /^(archive|node_modules|\.git|scripts|test-results|playwright-report|tools)$/;
const EXTRA = ['archive/in-kerala-pre-film/index.html'];

const OLD_MARK = '<span class="logo-mark">TA</span>';
const NEW_MARK = '<span class="logo-mark tap-mark" aria-hidden="true"><svg viewBox="' + [M.TIGHT.x, M.TIGHT.y, M.TIGHT.w, M.TIGHT.h].join(' ')
  + '" focusable="false">' + M.parts('color') + '</svg></span>';
const OLD_NAME = '<span class="logo-text">TechAuditPros</span>';
const NEW_NAME = '<span class="logo-text"><span class="lt-t">Tech</span>AuditPros</span>';

const HOP = '0%,100%{transform:none}18%{transform:scale(1.06,.92)}42%{transform:translateY(-7px) scale(.97,1.04)}66%{transform:scale(1.05,.94)}82%{transform:translateY(-2px)}';
// the entrance (owner, 15 Oct: "jumping ... sideways and settle there"): drops in to the right of its place, three hops
// left over the name, lands with a squash and a small bounce. --tm-run = how far to the right it starts.
const R = (k) => 'calc(var(--tm-run) * ' + k + ')';
const ENTER = '0%{opacity:0;transform:translate(var(--tm-run),-60px) rotate(-12deg)}8%{opacity:1;transform:translate(var(--tm-run),0) scale(1.14,.82)}12%{transform:translate(var(--tm-run),0)}'
  + '20%{transform:translate(' + R(.82) + ',-30px) rotate(-10deg) scale(.95,1.07)}27%{transform:translate(' + R(.66) + ',-34px) rotate(-6deg)}33%{transform:translate(' + R(.55) + ',0) scale(1.12,.86)}37%{transform:translate(' + R(.55) + ',0)}'
  + '45%{transform:translate(' + R(.38) + ',-26px) rotate(-9deg) scale(.95,1.07)}52%{transform:translate(' + R(.24) + ',-29px) rotate(-5deg)}58%{transform:translate(' + R(.14) + ',0) scale(1.1,.88)}62%{transform:translate(' + R(.14) + ',0)}'
  + '70%{transform:translate(' + R(.05) + ',-18px) rotate(-6deg) scale(.97,1.05)}78%{transform:translate(0,-10px) rotate(-2deg)}84%{transform:translate(0,0) scale(1.12,.86)}90%{transform:translate(0,-4px) scale(.98,1.03)}95%{transform:scale(1.02,.98)}100%{opacity:1;transform:none}';
const CSS = [
  '<!-- brand-logo:start -->',
  '<style>',
  '/* the laptop screen-face logo (scripts/brand/apply_logo.js): only the mark moves, never the name */',
  '.header-logo .logo-mark.tap-mark{width:44px;height:37px;background:none!important;border-radius:0!important;overflow:visible;position:relative;z-index:3;--tm-run:240px}',
  '.tap-mark svg{display:block;width:100%;height:100%;overflow:visible;transform-origin:50% 100%}',
  '.tap-mark .tm-eyes{transform-box:fill-box;transform-origin:50% 50%;animation:tm-blink 6s ease-in-out 2.9s infinite}',
  '.site-header .tap-mark svg,header .tap-mark svg{animation:tm-enter 2.4s cubic-bezier(.45,0,.55,1) .4s both}',
  '.header-logo:hover .tap-mark svg,.header-logo:focus-visible .tap-mark svg{animation:tm-hop2 .9s cubic-bezier(.3,.7,.4,1) both}',
  '.header-logo .logo-text .lt-t{color:var(--navy-deep,#0B2036)}',
  '@keyframes tm-enter{' + ENTER + '}',
  '@keyframes tm-hop2{' + HOP + '}',
  '@keyframes tm-blink{0%,3%,7%,100%{transform:none}5%{transform:scaleY(.12)}}',
  '@media (max-width:640px){.header-logo .logo-mark.tap-mark{width:36px;height:30px;--tm-run:150px}}',
  '@media (prefers-reduced-motion:reduce){.tap-mark svg,.tap-mark .tm-eyes{animation:none!important}}',
  '</style>',
  '<!-- brand-logo:end -->'
];
const BLOCK_RE = /<!-- brand-logo:start -->[\s\S]*?<!-- brand-logo:end -->\r?\n?/;
const ICON_RE = /(<link href="[^"?]*?(?:favicon-(?:16|32|48|64).png|logoonly.svg|apple-touch-icon.png))(" rel="(?:icon|apple-touch-icon)")/g;
const TOUCH_RE = /<link (?:href="([^"]*?)favicon-64\.png" rel="apple-touch-icon"|rel="apple-touch-icon" href="([^"]*?)favicon-64\.png")\s*\/?>/g;

function pages() {
  const out = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f), s = fs.statSync(p);
      if (s.isDirectory()) { if (!SKIP.test(f)) walk(p); } else if (f.endsWith('.html')) out.push(p);
    }
  })(ROOT);
  return out.concat(EXTRA.map((r) => path.join(ROOT, r)).filter((p) => fs.existsSync(p)));
}

const tally = { files: 0, marks: 0, names: 0, css: 0, touch: 0, iconv: 0 };
for (const file of pages()) {
  const before = fs.readFileSync(file, 'utf8');
  let h = before;
  const nl = h.includes('\r\n') ? '\r\n' : '\n';
  const marks = h.split(OLD_MARK).length - 1;
  if (marks) { h = h.split(OLD_MARK).join(NEW_MARK); tally.marks += marks; }
  // the name: only inside a header-logo link that now has the new mark (older blog templates keep their own style)
  h = h.replace(/<a class="header-logo"[^>]*>[\s\S]*?<\/a>/g, function (a) {
    if (a.indexOf('tap-mark') < 0 || a.indexOf(OLD_NAME) < 0) return a;
    tally.names++;
    return a.split(OLD_NAME).join(NEW_NAME);
  });
  if (h.indexOf('tap-mark') >= 0) {
    const block = CSS.join(nl) + nl;
    if (BLOCK_RE.test(h)) h = h.replace(BLOCK_RE, block);
    else {
      // before </head>; a page that never closes its head (quote/) gets it before its site_header block (outside it,
      // so a quote_header.js run cannot wipe it), else before <body> or its first <header>, still read as head
      const at = [/<\/head>/i, /<!-- site_header:start -->/, /<body[\s>]/i, /<header[\s>]/i].map((re) => h.search(re)).find((i) => i >= 0);
      if (at === undefined) throw new Error('no place for the logo styles in ' + file);
      h = h.slice(0, at) + block + h.slice(at); tally.css++;
    }
  }
  h = h.replace(TOUCH_RE, function (m, a, b) { tally.touch++; return '<link href="' + (a || b) + 'apple-touch-icon.png" rel="apple-touch-icon"/>'; });
  // the icon links carry ?v=2 (15 Oct): a browser that kept the old favicon fetches the new one
  h = h.replace(ICON_RE, function (m, a, b) { tally.iconv++; return a + '?v=2' + b; });
  if (h !== before) {
    tally.files++;
    if (!CHECK) fs.writeFileSync(file, h);
  }
}
console.log((CHECK ? '[check] ' : '') + 'pages changed: ' + tally.files + ' | marks: ' + tally.marks + ' | names: ' + tally.names
  + ' | style blocks added: ' + tally.css + ' | home-screen icon links: ' + tally.touch + ' | icon links refreshed: ' + tally.iconv);
