'use strict';
// LOGO ON EVERY PAGE (owner, 2026-10-15: "Option A, screen face ... make it as logo on site ... jumping ... place
// nicely on the TechAuditPros letters, only the logo"). In every page's header and footer:
//   - the old "TA" box becomes the laptop screen-face mark (drawn in tap_mark.js), inline so it can move;
//   - the name gets the homepage title's split: "Tech" navy, "AuditPros" orange;
//   - only the mark moves: one hop when the page opens, a hop when pointed at, a blink every few seconds;
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
const CSS = [
  '<!-- brand-logo:start -->',
  '<style>',
  '/* the laptop screen-face logo (scripts/brand/apply_logo.js): only the mark moves, never the name */',
  '.header-logo .logo-mark.tap-mark{width:44px;height:37px;background:none!important;border-radius:0!important;overflow:visible}',
  '.tap-mark svg{display:block;width:100%;height:100%;overflow:visible;transform-origin:50% 100%}',
  '.tap-mark .tm-eyes{transform-box:fill-box;transform-origin:50% 50%;animation:tm-blink 6s ease-in-out 3s infinite}',
  '.site-header .tap-mark svg,header .tap-mark svg{animation:tm-hop .9s cubic-bezier(.3,.7,.4,1) .6s both}',
  '.header-logo:hover .tap-mark svg,.header-logo:focus-visible .tap-mark svg{animation:tm-hop2 .9s cubic-bezier(.3,.7,.4,1) both}',
  '.header-logo .logo-text .lt-t{color:var(--navy-deep,#0B2036)}',
  '@keyframes tm-hop{' + HOP + '}',
  '@keyframes tm-hop2{' + HOP + '}',
  '@keyframes tm-blink{0%,93%,97%,100%{transform:none}95%{transform:scaleY(.12)}}',
  '@media (max-width:640px){.header-logo .logo-mark.tap-mark{width:36px;height:30px}}',
  '@media (prefers-reduced-motion:reduce){.tap-mark svg,.tap-mark .tm-eyes{animation:none!important}}',
  '</style>',
  '<!-- brand-logo:end -->'
];
const BLOCK_RE = /<!-- brand-logo:start -->[\s\S]*?<!-- brand-logo:end -->\r?\n?/;
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

const tally = { files: 0, marks: 0, names: 0, css: 0, touch: 0 };
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
  if (h !== before) {
    tally.files++;
    if (!CHECK) fs.writeFileSync(file, h);
  }
}
console.log((CHECK ? '[check] ' : '') + 'pages changed: ' + tally.files + ' | marks: ' + tally.marks + ' | names: ' + tally.names
  + ' | style blocks added: ' + tally.css + ' | home-screen icon links: ' + tally.touch);
