'use strict';
// Puts the site-wide header (top bar + main nav + phone drawer) on /quote/, which had its own mini header (2026-09-23).
// WHY: owner: "add the universal header also for the get a quote page".
// HOW:
//   markup  copied from index.html, so it is the same header every other page shows.
//   css     picked out of index.html by a real browser: a rule is kept only when every class and id in its
//           selector belongs to the header or drawer, so no bare `a{}` / `section{}` rule can reach the quote tool.
//           The variables those rules use are set on the header itself, so it looks the same as on the homepage
//           even where the quote page's own :root differs.
//   nav_v4  its CSS and JS blocks are copied verbatim, markers included, so a later nav_v4.js run replaces them in place.
//           (Never re-run nav_v4.js over the whole site just for this: pages edited after its last run lose changes.)
//   print   the site header is hidden when printing; the quote's own letterhead (.top .bar) shows only on paper.
// Re-runnable: everything sits between site_header markers and is replaced each run.
// Run (playwright-core is not a repo dependency, same as scripts/verify/shot.js):
//   NODE_PATH=<dir with playwright-core>/node_modules node scripts/country-pages/quote_header.js
const L = require('./lib.js'); const fs = require('fs'); const path = require('path'); const http = require('http');
const { chromium } = require('playwright-core');

const CHROME = [process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
const DST = 'quote/index.html';
const home = L.read('index.html');

// ---- markup -------------------------------------------------------------------------------------
function blockAt(s, start, openRe, closeTag) {
  const re = new RegExp(`${openRe.source}|${closeTag}`, 'g'); re.lastIndex = start;
  let depth = 0, t;
  while ((t = re.exec(s))) { if (t[0].startsWith('</')) { if (--depth === 0) return s.slice(start, t.index + t[0].length); } else depth++; }
  throw new Error('unclosed block at ' + start);
}
const hAt = home.indexOf('<header class="site-header">');
const dAt = home.indexOf('<div class="mobile-drawer" id="mobileDrawer">');
if (hAt < 0 || dAt < 0) throw new Error('index.html: header or drawer not found');
const header = blockAt(home, hAt, /<header\b[^>]*>/, '</header>');
const drawer = blockAt(home, dAt, /<div\b[^>]*>/, '</div>');
if (!header.includes('Employee login')) throw new Error('run employee_login_link.js first, so the header carries the Employee login link');

// the homepage's own-page anchors lead back to the homepage from here
const fix = (h) => h.replace(/href="#(services|regions)"/g, 'href="/#$1"');

// ---- css, picked by the browser from the homepage (with nav_v4's block removed; nav_v4.js re-adds it) ------
async function headerCss() {
  const html = home.replace(/\r?\n  \/\* nav_v4:start[\s\S]*?\/\* nav_v4:end \*\/\r?\n/, '\n');
  const server = http.createServer((req, res) => {
    if (req.url === '/') { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end(html); }
    res.writeHead(404); res.end();
  }).listen(0);
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  const out = await page.evaluate(() => {
    const roots = [document.querySelector('.site-header'), document.getElementById('mobileDrawer')];
    const own = new Set();
    for (const r of roots) for (const el of [r, ...r.querySelectorAll('*')]) {
      el.classList.forEach((c) => own.add('.' + c)); if (el.id) own.add('#' + el.id);
    }
    ['.active', '.is-open', '.open', '.scrolled', '.is-active', '.is-visible'].forEach((c) => own.add(c)); // state classes set by JS
    const split = (sel) => { const parts = []; let depth = 0, cur = '';
      for (const ch of sel) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ',' && !depth) { parts.push(cur.trim()); cur = ''; } else cur += ch; }
      parts.push(cur.trim()); return parts; };
    const ownsAll = (sel) => { const toks = sel.match(/[.#][A-Za-z_][\w-]*/g); return !!toks && toks.every((t) => own.has(t)); };
    const vars = new Set(), frames = new Set(), keyframes = {};
    const walk = (rules) => {
      const acc = [];
      for (const r of rules) {
        if (r instanceof CSSStyleRule) {
          const keep = split(r.selectorText).filter(ownsAll);
          if (!keep.length) continue;
          const body = r.style.cssText;
          (body.match(/var\(--[\w-]+/g) || []).forEach((v) => vars.add(v.slice(4)));
          (body.match(/animation(?:-name)?:\s*([\w-]+)/g) || []).forEach((a) => frames.add(a.split(':')[1].trim().split(' ')[0]));
          acc.push(`  ${keep.join(', ')}{ ${body} }`);
        } else if (r instanceof CSSMediaRule || r instanceof CSSSupportsRule) {
          const inner = walk(r.cssRules);
          if (inner.length) acc.push(`  @${r instanceof CSSMediaRule ? 'media' : 'supports'} ${r.conditionText}{\n${inner.map((x) => '  ' + x).join('\n')}\n  }`);
        } else if (r instanceof CSSKeyframesRule) keyframes[r.name] = r.cssText;
      }
      return acc;
    };
    const rules = [];
    for (const sheet of document.styleSheets) { try { rules.push(...walk(sheet.cssRules)); } catch (_) { /* cross-origin font sheets */ } }
    const rootStyle = getComputedStyle(document.documentElement), body = getComputedStyle(document.body);
    const varDecl = [...vars].map((v) => `${v}:${rootStyle.getPropertyValue(v).trim()}`).filter((d) => !d.endsWith(':')).join('; ');
    return {
      css: rules.join('\n'),
      scope: `  .site-header, .mobile-drawer{ ${varDecl}; font-family:${body.fontFamily}; line-height:${body.lineHeight}; color:${body.color}; }`,
      frames: [...frames].filter((f) => keyframes[f]).map((f) => '  ' + keyframes[f]).join('\n'),
      count: rules.length, vars: vars.size,
    };
  });
  await browser.close(); server.close();
  return out;
}

const V4_CSS = (home.match(/\r?\n  \/\* nav_v4:start[\s\S]*?\/\* nav_v4:end \*\//) || [])[0];
const V4_JS = (home.match(/<!-- nav_v4:js:start -->[\s\S]*?<!-- nav_v4:js:end -->/) || [])[0];
if (!V4_CSS || !V4_JS) throw new Error('index.html: nav_v4 css or js block not found');

const DRAWER_JS = `<script>
  // phone drawer (same behaviour as the homepage)
  (function () {
    var drawer = document.getElementById('mobileDrawer');
    var open = document.querySelector('.site-header .mobile-menu-toggle');
    if (!drawer || !open) return;
    function close() { drawer.classList.remove('active'); document.body.style.overflow = ''; }
    open.addEventListener('click', function () { drawer.classList.add('active'); document.body.style.overflow = 'hidden'; });
    var x = document.getElementById('closeDrawer'), o = document.getElementById('drawerOverlay');
    if (x) x.addEventListener('click', close);
    if (o) o.addEventListener('click', close);
    [].slice.call(drawer.querySelectorAll('.drawer-nav a')).forEach(function (a) { a.addEventListener('click', close); });
  })();
</script>`;

(async () => {
  const picked = await headerCss();
  let s = L.read(DST);
  // clear a previous run
  s = s.replace(/<style>\r?\n\/\* site_header:start[\s\S]*?\/\* site_header:end \*\/\r?\n<\/style>\r?\n?/, '');
  s = s.replace(/<!-- site_header:start -->[\s\S]*?<!-- site_header:end -->\r?\n?/, '');
  s = s.replace(/<!-- site_header:js:start -->[\s\S]*?<!-- site_header:js:end -->\r?\n?/, '');

  const css = `<style>
/* site_header:start: the site-wide header, from index.html (scripts/country-pages/quote_header.js) */
${picked.scope}
${picked.css}
${picked.frames}${V4_CSS}
  @media print{ .site-header, .mobile-drawer{ display:none !important; } }
  @media screen{ .top .bar{ display:none; } } /* the quote's own letterhead: paper only, the site header does this job on screen */
/* site_header:end */
</style>
`;
  const topAt = s.indexOf('<div class="top">');
  const bodyEnd = s.lastIndexOf('</body>');
  if (topAt < 0 || bodyEnd < 0) throw new Error(DST + ': <div class="top"> or </body> not found');
  s = s.slice(0, bodyEnd) + `<!-- site_header:js:start -->\n${DRAWER_JS}\n${V4_JS}\n<!-- site_header:js:end -->\n` + s.slice(bodyEnd);
  s = s.slice(0, topAt) + `<!-- site_header:start -->\n${fix(header)}\n\n${fix(drawer)}\n<!-- site_header:end -->\n\n` + s.slice(topAt);
  // this page has no </head> (the parser opens <body> implicitly), so the styles go into <head> when it exists, else just above the header
  const headEnd = s.indexOf('</head>');
  const cssAt = headEnd >= 0 ? headEnd : s.indexOf('<!-- site_header:start -->');
  s = s.slice(0, cssAt) + css + s.slice(cssAt);
  L.write(DST, s);
  console.log(`header css: ${picked.count} rules, ${picked.vars} variables scoped to the header`);
})().catch((e) => { console.error(e); process.exit(1); });
