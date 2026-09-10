'use strict';
// Header navigation v3 — replaces nav_menus.js (2026-09-10).
//
// WHY: v2 rendered both dropdowns as bare grids of flagged country links. "United States" appeared three
// times with nothing to distinguish the columns, there was no indication of what each service *is*, the panel
// was tall enough to cover the page, and on mobile the drawer's "Services" and "Service Areas" items pointed
// at #services / #regions — anchors that exist on no page, so they did nothing at all.
//
// v3: a proper mega-menu. Each service carries an icon, a one-line description of what it is, and a compact
// two-column grid of the countries it is available in, with sub-pages indented under their parent. A footer
// strip closes each panel with the honest line and one call to action. On mobile the same content becomes an
// accordion inside the drawer, so every page in the site is reachable from a phone.
//
// Every href below is asserted to exist on disk before anything is written — the old data linked
// service x country combinations that were never built.
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');

const FORM = L.FORM;
const flag = c => '<img src="https://flagcdn.com/w40/' + c + '.png" alt="" width="40" height="30" loading="lazy" decoding="async" />';

// ---- icons: one path each, matching the weight of the existing nav icons ------------------------
const ICON = {
  erp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 3h8v5h-8v-5zm0-6h8v4h-8v-4z"/></svg>',
  seo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 105.29 14L21 21.71 22.71 20 17 14.29A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 4v10h16V8H4zm1-3v1h2V5H5zm3 0v1h2V5H8z"/></svg>',
};

// ---- the menus ---------------------------------------------------------------------------------
// [flag, label, href, isSub]
const SERVICES = [
  ['erp', 'Custom ERP', 'One system of record &mdash; stock, orders, projects, payroll.', [
    ['us', 'United States', '/us/erp/'], ['gb', 'United Kingdom', '/uk/erp/'], ['ca', 'Canada', '/ca/erp/'],
    ['au', 'Australia', '/au/erp/'], ['ae', 'UAE', '/ae/erp/'],
    ['ae', 'Construction', '/ae/erp/construction/', true], ['ae', 'Automotive', '/ae/erp/automotive/', true],
    ['in', 'India', '/in/'],
  ]],
  ['seo', 'SEO, AEO &amp; GEO', 'Rank on Google &mdash; and be the answer inside the AI summaries above it.', [
    ['us', 'United States', '/us/seo-services/'], ['gb', 'United Kingdom', '/uk/seo-services/'], ['ca', 'Canada', '/ca/seo-services/'],
    ['ae', 'Abu Dhabi', '/ae/abu-dhabi/'], ['ae', 'Dubai', '/ae/dubai/'],
    ['in', 'Kerala', '/in/kerala/'], ['in', 'Mumbai', '/in/mumbai/'], ['in', 'Kolkata', '/in/kolkata/'],
  ]],
  ['web', 'Websites &amp; E-commerce', 'Fast pages, live stock and prices, a checkout that never lies.', [
    ['us', 'United States', '/us/website-development/'], ['gb', 'United Kingdom', '/uk/website-development/'],
    ['ca', 'Canada', '/ca/website-development/'], ['au', 'Australia', '/au/website-development/'],
    ['ae', 'UAE e-commerce', '/ae/ecommerce-website-development/'], ['in', 'India', '/in/'],
  ]],
];

const REGIONS = [
  ['us', 'United States', '/us/', [['Custom ERP', '/us/erp/'], ['SEO, AEO &amp; GEO', '/us/seo-services/'], ['Websites', '/us/website-development/']]],
  ['gb', 'United Kingdom', '/uk/', [['London', '/uk/london/'], ['Manchester', '/uk/manchester/'], ['Reading', '/uk/reading/'], ['Scotland', '/uk/scotland/'], ['Custom ERP', '/uk/erp/'], ['SEO, AEO &amp; GEO', '/uk/seo-services/']]],
  ['ca', 'Canada', '/ca/', [['Toronto', '/ca/toronto/'], ['Custom ERP', '/ca/erp/'], ['SEO, AEO &amp; GEO', '/ca/seo-services/'], ['Websites', '/ca/website-development/']]],
  ['ae', 'United Arab Emirates', '/ae/', [['Abu Dhabi', '/ae/abu-dhabi/'], ['Dubai', '/ae/dubai/'], ['Custom ERP', '/ae/erp/'], ['Construction ERP', '/ae/erp/construction/'], ['Automotive ERP', '/ae/erp/automotive/'], ['E-commerce', '/ae/ecommerce-website-development/']]],
  ['in', 'India', '/in/', [['Kerala', '/in/kerala/'], ['Mumbai', '/in/mumbai/'], ['Kolkata', '/in/kolkata/'], ['Vadodara', '/in/vadodara/'], ['Lucknow', '/in/lucknow/'], ['Calicut', '/in/calicut/']]],
  ['au', 'Australia', '/au/', [['Custom ERP', '/au/erp/'], ['Websites', '/au/website-development/']]],
];

// ---- every internal href must resolve to a real page -------------------------------------------
{
  const hrefs = new Set();
  for (const [, , , items] of SERVICES) for (const [, , h] of items) hrefs.add(h);
  for (const [, , hub, pages] of REGIONS) { hrefs.add(hub); for (const [, h] of pages) hrefs.add(h); }
  hrefs.add('/why-us/'); hrefs.add('/results/'); hrefs.add('/blog/');
  const missing = [...hrefs].filter(h => !fs.existsSync(path.join(L.REPO, h.replace(/^\//, ''), 'index.html')));
  if (missing.length) throw new Error('nav points at pages that do not exist:\n  ' + missing.join('\n  '));
  console.log('all ' + hrefs.size + ' nav destinations exist');
}

// ---- desktop panels ---------------------------------------------------------------------------
const svcCol = ([key, title, desc, items]) => `                        <section class="mg-col">
                            <div class="mg-head"><span class="mg-ico">${ICON[key]}</span><span class="mg-head-t"><strong>${title}</strong><em>${desc}</em></span></div>
                            <div class="mg-links">
${items.map(([c, label, href, sub]) => `                                <a href="${href}"${sub ? ' class="is-sub"' : ''}>${sub ? '<span class="mg-sub-mark" aria-hidden="true"></span>' : flag(c)} ${label}</a>`).join('\n')}
                            </div>
                        </section>`;

const servicesPanel = `<div class="nav-dropdown-panel nav-mega nav-services">
                    <div class="mg-inner">
                        <p class="mg-eyebrow">What we build</p>
                        <div class="mg-cols">
${SERVICES.map(svcCol).join('\n')}
                        </div>
                        <div class="mg-foot">
                            <span class="mg-foot-t">Not sure which you need? We will say so honestly &mdash; even when the answer is &ldquo;buy a product instead&rdquo;.</span>
                            <a class="mg-foot-l" href="/why-us/">Why us &rarr;</a>
                            <a class="mg-foot-cta" href="${FORM}" target="_blank" rel="noopener">Book a free strategy call</a>
                        </div>
                    </div>
                </div>`;

const regionCol = ([c, name, hub, pages]) => `                        <section class="mg-region">
                            <a class="mg-rhead" href="${hub}">${flag(c)} <strong>${name}</strong></a>
                            <div class="mg-links">
${pages.map(([label, href]) => `                                <a href="${href}">${label}</a>`).join('\n')}
                            </div>
                        </section>`;

const regionsPanel = `<div class="nav-dropdown-panel nav-mega nav-regions">
                    <div class="mg-inner">
                        <p class="mg-eyebrow">Where we work</p>
                        <div class="mg-regions">
${REGIONS.map(regionCol).join('\n')}
                        </div>
                        <div class="mg-foot">
                            <span class="mg-foot-t">An engineering team in Kochi, India. No office in your country &mdash; we say that first.</span>
                            <a class="mg-foot-l" href="/why-us/">How we work &rarr;</a>
                            <a class="mg-foot-cta" href="${FORM}" target="_blank" rel="noopener">Book a free strategy call</a>
                        </div>
                    </div>
                </div>`;

// ---- mobile drawer ----------------------------------------------------------------------------
const drawerNav = `<nav class="drawer-nav">
                <a href="/">Home</a>
                <button class="drawer-acc" type="button" aria-expanded="false" aria-controls="drawerServices" data-acc="drawerServices">Services<span class="drawer-acc-i" aria-hidden="true"></span></button>
                <div class="drawer-sub" id="drawerServices" hidden>
${SERVICES.map(([, title, , items]) => `                    <p class="drawer-sub-h">${title}</p>\n` +
  items.map(([c, label, href, sub]) => `                    <a href="${href}"${sub ? ' class="is-sub"' : ''}>${sub ? '' : flag(c) + ' '}${label}</a>`).join('\n')).join('\n')}
                </div>
                <button class="drawer-acc" type="button" aria-expanded="false" aria-controls="drawerRegions" data-acc="drawerRegions">Service Areas<span class="drawer-acc-i" aria-hidden="true"></span></button>
                <div class="drawer-sub" id="drawerRegions" hidden>
${REGIONS.map(([c, name, hub, pages]) => `                    <p class="drawer-sub-h">${flag(c)} ${name}</p>\n` +
  `                    <a href="${hub}">Overview</a>\n` +
  pages.map(([label, href]) => `                    <a href="${href}">${label}</a>`).join('\n')).join('\n')}
                </div>
                <a href="/results/">Results</a>
                <a href="/why-us/">Why Us</a>
                <a href="/blog/">Blog</a>
                <a href="#contact">Contact</a>
                <a href="${FORM}" target="_blank" class="drawer-cta">Book a Free Strategy Call</a>
            </nav>`;

// ---- css --------------------------------------------------------------------------------------
const CSS = `
  /* nav_v3:start mega dropdowns + mobile accordion */
  .nav-dropdown::after{ width:340px; }
  /* display:block — the base stylesheet makes these panels a 5-column grid, which left empty bands */
  .nav-dropdown-panel.nav-mega{ display:block; padding:0; left:50%; gap:0; }
  /* fixed widths, not max-content: max-content grew this to 1385px and hung it off the left edge */
  .nav-dropdown-panel.nav-services{ width:min(1060px, 95vw); min-width:0; }
  .nav-dropdown-panel.nav-regions{ width:min(1010px, 95vw); min-width:0; }
  .mg-inner{ padding:18px 22px 0; }
  .mg-eyebrow{ font-family:var(--font-mono, monospace); font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 14px; }
  .mg-cols{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:22px; }
  /* these columns are <section>s, and the site styles every section with 88px of vertical padding */
  .mg-col, .mg-region{ padding:0; margin:0; min-width:0; }
  .mg-head{ display:flex; gap:11px; align-items:flex-start; padding-bottom:11px; margin-bottom:9px; border-bottom:1px solid var(--line); }
  .mg-ico{ flex:0 0 30px; width:30px; height:30px; border-radius:8px; background:var(--paper-alt); display:grid; place-items:center; }
  .mg-ico svg{ width:16px; height:16px; fill:var(--orange); }
  .mg-head-t{ display:block; min-width:0; }
  .mg-head-t strong{ display:block; font-size:.95rem; color:var(--ink); line-height:1.25; }
  .mg-head-t em{ display:block; font-style:normal; font-size:.76rem; line-height:1.45; color:var(--ink-faint); margin-top:3px; }
  .mg-links{ display:grid; grid-template-columns:1fr 1fr; gap:1px 8px; }
  .mg-links a{ display:flex; align-items:center; gap:6px; padding:5px 7px; border-radius:6px; color:var(--ink-soft); text-decoration:none; font-size:.85rem; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .mg-links a:hover{ background:var(--paper-alt); color:var(--orange); }
  .mg-links img{ width:17px; height:17px; border-radius:50%; object-fit:cover; flex-shrink:0; }
  .mg-links a.is-sub{ padding-left:26px; font-size:.8rem; position:relative; }
  .mg-sub-mark{ position:absolute; left:12px; top:50%; width:7px; height:7px; border-left:1px solid var(--line-strong, #cbd5dd); border-bottom:1px solid var(--line-strong, #cbd5dd); transform:translateY(-70%); }
  /* three columns of two rows, each region's own links in two columns so the panel stays short */
  .mg-regions{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:16px 24px; }
  .mg-regions .mg-links{ grid-template-columns:1fr 1fr; }
  .mg-rhead{ display:flex; align-items:center; gap:8px; text-decoration:none; padding-bottom:9px; margin-bottom:6px; border-bottom:1px solid var(--line); }
  .mg-rhead img{ width:20px; height:20px; border-radius:50%; object-fit:cover; }
  .mg-rhead strong{ font-size:.9rem; color:var(--ink); }
  .mg-rhead:hover strong{ color:var(--orange); }
  .mg-foot{ display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin:20px -26px 0; padding:14px 26px; background:var(--paper-alt); border-top:1px solid var(--line); border-radius:0 0 10px 10px; }
  .mg-foot-t{ flex:1 1 340px; min-width:0; font-size:.78rem; line-height:1.5; color:var(--ink-faint); }
  .mg-foot-l{ font-size:.8rem; font-weight:700; color:var(--ink); text-decoration:none; white-space:nowrap; }
  .mg-foot-l:hover{ color:var(--orange); }
  .mg-foot-cta{ font-size:.8rem; font-weight:700; background:var(--orange); color:#fff; text-decoration:none; padding:9px 15px; border-radius:7px; white-space:nowrap; }
  .mg-foot-cta:hover{ filter:brightness(1.07); }
  @media (max-width:1240px){
    .mg-cols{ grid-template-columns:repeat(3, minmax(200px, 1fr)); gap:18px; }
    .mg-regions{ grid-template-columns:repeat(3, minmax(180px, 1fr)); gap:18px; }
    .nav-dropdown-panel.nav-services{ min-width:min(880px, 96vw); }
    .nav-dropdown-panel.nav-regions{ min-width:min(900px, 96vw); }
  }
  /* click (or keyboard) opens the panel too, instead of jumping to a dead anchor */
  .nav-dropdown.is-open .nav-dropdown-panel{ opacity:1; visibility:visible; pointer-events:auto; transform:translateX(-50%) translateY(0); }
  .nav-dropdown.is-open .nav-dropdown-caret{ transform:rotate(180deg); }
  /* mobile drawer accordion — the panel scrolls, or an open accordion pushes items out of reach */
  .mobile-drawer .drawer-content{ overflow-y:auto; max-height:100vh; max-height:100dvh; -webkit-overflow-scrolling:touch; overscroll-behavior:contain; }
  .drawer-acc{ display:flex; align-items:center; justify-content:space-between; width:100%; padding:14px 6px; background:none; border:none; border-bottom:1px solid var(--line); font:inherit; font-weight:600; font-size:1rem; color:var(--ink); cursor:pointer; text-align:left; }
  .drawer-acc-i{ position:relative; width:11px; height:11px; flex:0 0 11px; }
  .drawer-acc-i::before, .drawer-acc-i::after{ content:""; position:absolute; background:var(--ink-faint); transition:transform .2s ease, opacity .2s ease; }
  .drawer-acc-i::before{ left:0; top:5px; width:11px; height:1.5px; }
  .drawer-acc-i::after{ left:5px; top:0; width:1.5px; height:11px; }
  .drawer-acc[aria-expanded="true"]{ color:var(--orange); }
  .drawer-acc[aria-expanded="true"] .drawer-acc-i::after{ transform:scaleY(0); opacity:0; }
  .drawer-sub{ padding:6px 0 12px 4px; border-bottom:1px solid var(--line); }
  .drawer-sub-h{ display:flex; align-items:center; gap:7px; margin:12px 0 4px; font-family:var(--font-mono, monospace); font-size:.66rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-faint); }
  .drawer-sub-h img{ width:16px; height:16px; border-radius:50%; object-fit:cover; }
  .drawer-nav .drawer-sub a{ display:flex; align-items:center; gap:8px; padding:10px 8px; font-size:.92rem; font-weight:500; color:var(--ink-soft); border-bottom:none; border-radius:6px; }
  .drawer-nav .drawer-sub a:active, .drawer-nav .drawer-sub a:hover{ background:var(--paper-alt); color:var(--orange); }
  .drawer-nav .drawer-sub a img{ width:17px; height:17px; border-radius:50%; object-fit:cover; }
  .drawer-nav .drawer-sub a.is-sub{ padding-left:26px; font-size:.87rem; }
  /* nav_v3:end */
`;

const JS = `<!-- nav_v3:js:start -->
<script>
    // nav_v3: mobile drawer accordions (buttons, so the existing "close on link tap" handler is unaffected)
    (function () {
        var accs = [].slice.call(document.querySelectorAll('.drawer-acc'));
        if (!accs.length) return;
        accs.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var panel = document.getElementById(btn.getAttribute('data-acc'));
                var isOpen = btn.getAttribute('aria-expanded') === 'true';
                accs.forEach(function (other) {
                    if (other === btn) return;
                    other.setAttribute('aria-expanded', 'false');
                    var op = document.getElementById(other.getAttribute('data-acc'));
                    if (op) op.hidden = true;
                });
                btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
                if (panel) panel.hidden = isOpen;
            });
        });
        // the two dropdown triggers point at #services / #regions, anchors that exist on no page.
        // Hover already opens the panel; make click and keyboard do it too rather than nothing.
        [].slice.call(document.querySelectorAll('.nav-dropdown > a')).forEach(function (a) {
            var href = a.getAttribute('href') || '';
            if (href.indexOf('#services') < 0 && href.indexOf('#regions') < 0) return;
            a.setAttribute('aria-haspopup', 'true');
            a.setAttribute('aria-expanded', 'false');
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var wrap = a.parentNode, open = wrap.classList.contains('is-open');
                [].slice.call(document.querySelectorAll('.nav-dropdown.is-open')).forEach(function (w) {
                    w.classList.remove('is-open');
                    var t = w.firstElementChild; if (t && t.tagName === 'A') t.setAttribute('aria-expanded', 'false');
                });
                if (!open) { wrap.classList.add('is-open'); a.setAttribute('aria-expanded', 'true'); }
            });
        });
        document.addEventListener('click', function (e) {
            if (e.target.closest && e.target.closest('.nav-dropdown')) return;
            [].slice.call(document.querySelectorAll('.nav-dropdown.is-open')).forEach(function (w) { w.classList.remove('is-open'); });
        });
    })();
</script>
<!-- nav_v3:js:end -->
`;

// ---- rewrite every page -----------------------------------------------------------------------
// The first v3 run injected CSS/JS with no markers, so the marker-based replacement below cannot find
// them. Strip any unmarked block first, or pages keep a second accordion handler that cancels the first.
function stripLegacy(s) {
  // legacy css: the comment line, then every following line that is still a rule/comment/@media
  const head = s.indexOf("  /* nav_v3: mega dropdowns");
  if (head >= 0) {
    const rows = s.slice(head).split(/\r?\n/);
    let take = 1;
    while (take < rows.length && /^  (\.|@media|\/\*|\})/.test(rows[take])) take++;
    const block = rows.slice(0, take).join("\n");
    s = s.replace(block, "").replace(/\r?\n\r?\n\r?\n+/g, "\n\n");
  }
  // legacy js: any script tag carrying the accordion comment but not the markers
  s = s.replace(/<script>(?:(?!<\/script>)[\s\S])*nav_v3: mobile drawer accordions(?:(?!<\/script>)[\s\S])*<\/script>\r?\n?/g,
    m => (m.indexOf("nav_v3:js:start") >= 0 ? m : ""));
  return s;
}

const SKIP = ['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'];
const walk = (d, out) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};
// replace the panel that follows a trigger anchor, walking div depth to find its own close tag
function swapPanel(s, triggerRe, panel) {
  const m = s.match(triggerRe); if (!m) return s;
  const start = s.indexOf('<div class="nav-dropdown-panel', m.index); if (start < 0) return s;
  const re = /<div\b[^>]*>|<\/div>/g; re.lastIndex = start;
  let depth = 0, end = -1, t;
  while ((t = re.exec(s))) { if (t[0].charAt(1) === '/') { depth--; if (depth === 0) { end = t.index + 6; break; } } else depth++; }
  if (end < 0) return s;
  return s.slice(0, start) + panel + s.slice(end);
}

let pages = 0, drawers = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = fs.readFileSync(p, 'utf8');
  s = stripLegacy(s);
  const before = s;

  s = swapPanel(s, /<a href="[^"]*#services"[^>]*>\s*Services\s*<span class="nav-dropdown-caret">/, servicesPanel);
  s = swapPanel(s, /<a href="[^"]*#regions"[^>]*>\s*Service Areas\s*<span class="nav-dropdown-caret">/, regionsPanel);

  // the whole drawer nav, replaced wholesale
  const dStart = s.indexOf('<nav class="drawer-nav">');
  if (dStart >= 0) {
    const dEnd = s.indexOf('</nav>', dStart);
    if (dEnd > dStart) { s = s.slice(0, dStart) + drawerNav + s.slice(dEnd + 6); drawers++; }
  }

  // drop the v2 css block, add ours once
  // these pages are CRLF, so every break in the pattern must tolerate the \r
  s = s.replace(/\r?\n  \/\* nav_menus: both dropdowns as grouped grids \*\/\r?\n(?:  \.[^\r\n]*\r?\n|  @media[^\r\n]*\r?\n)*/, '\n');
  s = s.replace(/\r?\n  \/\* nav_v3:start[\s\S]*?\/\* nav_v3:end \*\/\r?\n/, '\n');
  { const at = s.indexOf('</style>'); if (at > 0) s = s.slice(0, at) + CSS + s.slice(at); }
  s = s.replace(/<!-- nav_v3:js:start -->[\s\S]*?<!-- nav_v3:js:end -->\r?\n?/, '');
  { const bt = s.lastIndexOf('</body>'); if (bt > 0) s = s.slice(0, bt) + JS + s.slice(bt); }

  if (s !== before) { L.write(rel, s); pages++; }
}

// ---- guards ----------------------------------------------------------------------------------
const problems = [];
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  const s = fs.readFileSync(p, 'utf8');
  if (!s.includes('class="nav-dropdown-panel')) continue;
  for (const [needle, label] of [
    ['nav-dropdown-panel nav-mega nav-services', 'services mega panel'],
    ['nav-dropdown-panel nav-mega nav-regions', 'regions mega panel'],
    ['/* nav_v3:start', 'nav_v3 css'],
    ['nav_v3: mobile drawer accordions', 'accordion js'],
    ['id="drawerServices"', 'drawer services accordion'],
    ['id="drawerRegions"', 'drawer regions accordion'],
  ]) if (!s.includes(needle)) problems.push(rel + ': missing ' + label);
  // the drawer's flat links are gone (the desktop trigger keeps its href and is handled by JS)
  if (s.includes('href="#services">Services</a>')) problems.push(rel + ': drawer still links the dead #services anchor');
  if (s.includes('href="#regions">Service Areas</a>')) problems.push(rel + ': drawer still links the dead #regions anchor');
  if (s.includes('nav_menus:')) problems.push(rel + ': v2 css survived');
  if ((s.match(/nav_v3:start/g) || []).length > 1) problems.push(rel + ': css injected twice');
  if ((s.match(/nav_v3:js:start/g) || []).length > 1) problems.push(rel + ': js injected twice');
}
if (problems.length) throw new Error(problems.length + ' problem(s):\n  ' + problems.slice(0, 10).join('\n  '));

console.log('nav v3: ' + pages + ' pages rewritten (' + drawers + ' drawers), ' +
  SERVICES.reduce((n, s) => n + s[3].length, 0) + ' service links, ' +
  REGIONS.reduce((n, r) => n + r[3].length + 1, 0) + ' region links');
