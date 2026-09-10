'use strict';
// Header navigation v4 — replaces nav_v3.js (2026-09-10).
//
// WHY: v3 showed every service AND every country at once. Opening "Services" hit the visitor with ~22
// flagged country links across three columns, so the first question — which of the three things do we even
// do? — was buried. Owner: "when someone clicks Services they should see only three: website, SEO, ERP.
// Then from there it expands to each country. Same for Service Areas. Don't confuse the user."
//
// v4 is two levels everywhere:
//   desktop — a two-pane menu. Left rail holds the three services (or the six countries), each with a
//             one-line description. Hover or focus one and its countries (or its pages) fill the right pane.
//             The first item is active on open, so the pane is never empty.
//   mobile  — nested accordions. Tap Services -> three rows. Tap Custom ERP -> its countries.
//
// Lessons carried over from v3, all of which cost a rebuild there:
//   · columns are <div>, never <section>: the site styles every section with 88px of vertical padding
//   · fixed panel widths, never width:max-content (it grew to 1385px and hung off the screen)
//   · CSS and JS live between markers and are REPLACED every run, so edits actually reach built pages
//   · the drawer must scroll, or an open accordion pushes items out of reach
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');

const FORM = L.FORM;
const flag = c => '<img src="https://flagcdn.com/w40/' + c + '.png" alt="" width="40" height="30" loading="lazy" decoding="async" />';

const ICON = {
  erp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 3h8v5h-8v-5zm0-6h8v4h-8v-4z"/></svg>',
  seo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 105.29 14L21 21.71 22.71 20 17 14.29A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 4v10h16V8H4zm1-3v1h2V5H5zm3 0v1h2V5H8z"/></svg>',
};

// ---- data: [key, title, one-liner, [[flag, label, href, isSub], …]] ---------------------------
const SERVICES = [
  ['erp', 'Custom ERP', 'One system of record — stock, orders, projects, payroll.', [
    ['us', 'United States', '/us/erp/'], ['gb', 'United Kingdom', '/uk/erp/'], ['ca', 'Canada', '/ca/erp/'],
    ['au', 'Australia', '/au/erp/'], ['ae', 'United Arab Emirates', '/ae/erp/'],
    ['ae', 'UAE · Construction', '/ae/erp/construction/', true], ['ae', 'UAE · Automotive', '/ae/erp/automotive/', true],
    ['in', 'India', '/in/'],
  ]],
  ['seo', 'SEO, AEO &amp; GEO', 'Rank on Google — and be the answer inside the AI summaries above it.', [
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
  ['us', 'United States', 'ERP, search and websites for US businesses.', '/us/',
    [['Custom ERP', '/us/erp/'], ['SEO, AEO &amp; GEO', '/us/seo-services/'], ['Websites &amp; E-commerce', '/us/website-development/']]],
  ['gb', 'United Kingdom', 'Four city pages plus the full service set.', '/uk/',
    [['London', '/uk/london/'], ['Manchester', '/uk/manchester/'], ['Reading', '/uk/reading/'], ['Scotland', '/uk/scotland/'], ['Custom ERP', '/uk/erp/'], ['SEO, AEO &amp; GEO', '/uk/seo-services/'], ['Websites &amp; E-commerce', '/uk/website-development/']]],
  ['ca', 'Canada', 'Toronto and the three services.', '/ca/',
    [['Toronto', '/ca/toronto/'], ['Custom ERP', '/ca/erp/'], ['SEO, AEO &amp; GEO', '/ca/seo-services/'], ['Websites &amp; E-commerce', '/ca/website-development/']]],
  ['ae', 'United Arab Emirates', 'Dubai and Abu Dhabi, with sector ERP.', '/ae/',
    [['Abu Dhabi', '/ae/abu-dhabi/'], ['Dubai', '/ae/dubai/'], ['Custom ERP', '/ae/erp/'], ['Construction ERP', '/ae/erp/construction/'], ['Automotive ERP', '/ae/erp/automotive/'], ['E-commerce', '/ae/ecommerce-website-development/']]],
  ['in', 'India', 'Six cities — this is where the team is.', '/in/',
    [['Kerala', '/in/kerala/'], ['Mumbai', '/in/mumbai/'], ['Kolkata', '/in/kolkata/'], ['Vadodara', '/in/vadodara/'], ['Lucknow', '/in/lucknow/'], ['Calicut', '/in/calicut/']]],
  ['au', 'Australia', 'ERP and websites for Australian businesses.', '/au/',
    [['Custom ERP', '/au/erp/'], ['Websites &amp; E-commerce', '/au/website-development/']]],
];

// ---- every destination must exist ------------------------------------------------------------
{
  const hrefs = new Set(['/why-us/', '/results/', '/blog/']);
  for (const [, , , items] of SERVICES) for (const [, , h] of items) hrefs.add(h);
  for (const [, , , hub, pages] of REGIONS) { hrefs.add(hub); for (const [, h] of pages) hrefs.add(h); }
  const missing = [...hrefs].filter(h => !fs.existsSync(path.join(L.REPO, h.replace(/^\//, ''), 'index.html')));
  if (missing.length) throw new Error('nav points at pages that do not exist:\n  ' + missing.join('\n  '));
  console.log('all ' + hrefs.size + ' destinations exist');
}

// ---- desktop: two-pane panels ----------------------------------------------------------------
const linkRow = ([c, label, href, sub]) =>
  `                            <a href="${href}"${sub ? ' class="is-sub"' : ''}>${flag(c)} ${label}</a>`;

function twoPane(kind, eyebrow, tabs, panes, foot) {
  return `<div class="nav-dropdown-panel nav-mega nav-${kind}">
                    <div class="mg2">
                        <div class="mg2-rail">
                            <p class="mg2-eyebrow">${eyebrow}</p>
${tabs}
                        </div>
                        <div class="mg2-panes">
${panes}
                        </div>
                    </div>
                    <div class="mg2-foot">
                        <span class="mg2-foot-t">${foot}</span>
                        <a class="mg2-foot-l" href="/why-us/">Why us &rarr;</a>
                        <a class="mg2-foot-cta" href="${FORM}" target="_blank" rel="noopener">Book a free strategy call</a>
                    </div>
                </div>`;
}

const servicesPanel = twoPane('services', 'What we build',
  SERVICES.map(([key, title, desc], i) => `                            <button type="button" class="mg2-tab${i === 0 ? ' is-active' : ''}" data-pane="pane-${key}" aria-controls="pane-${key}"${i === 0 ? ' aria-selected="true"' : ''}>
                                <span class="mg2-ico">${ICON[key]}</span>
                                <span class="mg2-tab-t"><strong>${title}</strong><em>${desc}</em></span>
                                <span class="mg2-chev" aria-hidden="true"></span>
                            </button>`).join('\n'),
  SERVICES.map(([key, title, , items], i) => `                            <div class="mg2-pane${i === 0 ? ' is-active' : ''}" id="pane-${key}">
                                <p class="mg2-pane-h">${title} &mdash; choose your country</p>
                                <div class="mg2-links">
${items.map(linkRow).join('\n')}
                                </div>
                            </div>`).join('\n'),
  'Not sure which you need? We will say so honestly &mdash; even when the answer is &ldquo;buy a product instead&rdquo;.');

const regionsPanel = twoPane('regions', 'Where we work',
  REGIONS.map(([c, name, desc, hub], i) => `                            <button type="button" class="mg2-tab${i === 0 ? ' is-active' : ''}" data-pane="pane-r-${c}" aria-controls="pane-r-${c}"${i === 0 ? ' aria-selected="true"' : ''}>
                                <span class="mg2-flag">${flag(c)}</span>
                                <span class="mg2-tab-t"><strong>${name}</strong><em>${desc}</em></span>
                                <span class="mg2-chev" aria-hidden="true"></span>
                            </button>`).join('\n'),
  REGIONS.map(([c, name, , hub, pages], i) => `                            <div class="mg2-pane${i === 0 ? ' is-active' : ''}" id="pane-r-${c}">
                                <p class="mg2-pane-h">${name}</p>
                                <div class="mg2-links">
                                    <a href="${hub}" class="is-hub">${flag(c)} ${name} overview</a>
${pages.map(([label, href]) => `                                    <a href="${href}">${label}</a>`).join('\n')}
                                </div>
                            </div>`).join('\n'),
  'An engineering team in Kochi, India. No office in your country &mdash; we say that first.');

// ---- mobile: nested accordions ---------------------------------------------------------------
const drawerNav = `<nav class="drawer-nav">
                <a href="/">Home</a>
                <button class="drawer-acc" type="button" aria-expanded="false" aria-controls="drawerServices" data-acc="drawerServices">Services<span class="drawer-acc-i" aria-hidden="true"></span></button>
                <div class="drawer-sub" id="drawerServices" hidden>
${SERVICES.map(([key, title, , items]) => `                    <button class="drawer-acc2" type="button" aria-expanded="false" aria-controls="d2-${key}" data-acc2="d2-${key}">${title}<span class="drawer-acc-i" aria-hidden="true"></span></button>
                    <div class="drawer-sub2" id="d2-${key}" hidden>
${items.map(([c, label, href, sub]) => `                        <a href="${href}"${sub ? ' class="is-sub"' : ''}>${flag(c)} ${label}</a>`).join('\n')}
                    </div>`).join('\n')}
                </div>
                <button class="drawer-acc" type="button" aria-expanded="false" aria-controls="drawerRegions" data-acc="drawerRegions">Service Areas<span class="drawer-acc-i" aria-hidden="true"></span></button>
                <div class="drawer-sub" id="drawerRegions" hidden>
${REGIONS.map(([c, name, , hub, pages]) => `                    <button class="drawer-acc2" type="button" aria-expanded="false" aria-controls="d2r-${c}" data-acc2="d2r-${c}">${flag(c)} ${name}<span class="drawer-acc-i" aria-hidden="true"></span></button>
                    <div class="drawer-sub2" id="d2r-${c}" hidden>
                        <a href="${hub}">${name} overview</a>
${pages.map(([label, href]) => `                        <a href="${href}">${label}</a>`).join('\n')}
                    </div>`).join('\n')}
                </div>
                <a href="/results/">Results</a>
                <a href="/why-us/">Why Us</a>
                <a href="/blog/">Blog</a>
                <a href="#contact">Contact</a>
                <a href="${FORM}" target="_blank" class="drawer-cta">Book a Free Strategy Call</a>
            </nav>`;

// ---- css --------------------------------------------------------------------------------------
const CSS = `
  /* nav_v4:start two-pane dropdowns + nested mobile accordions */
  .nav-dropdown::after{ width:340px; }
  /* block, fixed width: the base stylesheet makes these a 5-col grid, and max-content overflows the screen */
  .nav-dropdown-panel.nav-mega{ display:block; padding:0; left:50%; gap:0; min-width:0; }
  .nav-dropdown-panel.nav-services{ width:min(760px, 95vw); }
  .nav-dropdown-panel.nav-regions{ width:min(720px, 95vw); }
  .mg2{ display:grid; grid-template-columns:minmax(0, 300px) minmax(0, 1fr); }
  .mg2-rail{ padding:16px 14px; background:var(--paper-alt); border-radius:10px 0 0 0; border-right:1px solid var(--line); }
  .mg2-eyebrow{ font-family:var(--font-mono, monospace); font-size:.66rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 10px 8px; }
  .mg2-tab{ display:flex; width:100%; gap:10px; align-items:flex-start; text-align:left; padding:9px 10px; margin:0 0 2px; background:none; border:none; border-radius:8px; font:inherit; cursor:pointer; }
  .mg2-tab:hover, .mg2-tab.is-active{ background:#fff; box-shadow:0 1px 3px rgba(11,32,54,.08); }
  .mg2-ico, .mg2-flag{ flex:0 0 26px; width:26px; height:26px; border-radius:7px; display:grid; place-items:center; background:#fff; }
  .mg2-tab.is-active .mg2-ico, .mg2-tab:hover .mg2-ico{ background:var(--paper-alt); }
  .mg2-ico svg{ width:15px; height:15px; fill:var(--orange); }
  .mg2-flag img{ width:22px; height:22px; border-radius:50%; object-fit:cover; }
  .mg2-tab-t{ display:block; min-width:0; flex:1 1 auto; }
  .mg2-tab-t strong{ display:block; font-size:.9rem; color:var(--ink); line-height:1.25; }
  .mg2-tab-t em{ display:block; font-style:normal; font-size:.73rem; line-height:1.4; color:var(--ink-faint); margin-top:2px; }
  .mg2-chev{ flex:0 0 7px; width:7px; height:7px; margin-top:9px; border-right:1.5px solid var(--ink-faint); border-bottom:1.5px solid var(--ink-faint); transform:rotate(-45deg); opacity:0; transition:opacity .15s ease; }
  .mg2-tab.is-active .mg2-chev{ opacity:1; border-color:var(--orange); }
  .mg2-panes{ padding:18px 20px; min-width:0; }
  .mg2-pane{ display:none; }
  .mg2-pane.is-active{ display:block; }
  .mg2-pane-h{ font-size:.72rem; letter-spacing:.06em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 10px; }
  .mg2-links{ display:grid; grid-template-columns:1fr 1fr; gap:1px 10px; }
  .mg2-links a{ display:flex; align-items:center; gap:7px; padding:7px 8px; border-radius:6px; color:var(--ink-soft); text-decoration:none; font-size:.86rem; line-height:1.25; }
  .mg2-links a:hover{ background:var(--paper-alt); color:var(--orange); }
  .mg2-links img{ width:17px; height:17px; border-radius:50%; object-fit:cover; flex-shrink:0; }
  .mg2-links a.is-sub{ padding-left:24px; font-size:.82rem; }
  .mg2-links a.is-hub{ grid-column:1 / -1; font-weight:700; color:var(--ink); }
  .mg2-foot{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; padding:13px 20px; background:var(--paper-alt); border-top:1px solid var(--line); border-radius:0 0 10px 10px; }
  .mg2-foot-t{ flex:1 1 300px; min-width:0; font-size:.76rem; line-height:1.5; color:var(--ink-faint); }
  .mg2-foot-l{ font-size:.79rem; font-weight:700; color:var(--ink); text-decoration:none; white-space:nowrap; }
  .mg2-foot-l:hover{ color:var(--orange); }
  .mg2-foot-cta{ font-size:.79rem; font-weight:700; background:var(--orange); color:#fff; text-decoration:none; padding:9px 14px; border-radius:7px; white-space:nowrap; }
  .mg2-foot-cta:hover{ filter:brightness(1.07); }
  @media (max-width:1180px){
    .mg2{ grid-template-columns:minmax(0, 260px) minmax(0, 1fr); }
    .nav-dropdown-panel.nav-services, .nav-dropdown-panel.nav-regions{ width:min(680px, 96vw); }
  }
  /* mobile drawer — nested accordions; the panel must scroll or an open level pushes items out of reach */
  .mobile-drawer .drawer-content{ overflow-y:auto; max-height:100vh; max-height:100dvh; -webkit-overflow-scrolling:touch; overscroll-behavior:contain; }
  .drawer-acc{ display:flex; align-items:center; justify-content:space-between; width:100%; padding:14px 6px; background:none; border:none; border-bottom:1px solid var(--line); font:inherit; font-weight:600; font-size:1rem; color:var(--ink); cursor:pointer; text-align:left; }
  .drawer-acc-i{ position:relative; width:11px; height:11px; flex:0 0 11px; margin-left:10px; }
  .drawer-acc-i::before, .drawer-acc-i::after{ content:""; position:absolute; background:var(--ink-faint); transition:transform .2s ease, opacity .2s ease; }
  .drawer-acc-i::before{ left:0; top:5px; width:11px; height:1.5px; }
  .drawer-acc-i::after{ left:5px; top:0; width:1.5px; height:11px; }
  .drawer-acc[aria-expanded="true"]{ color:var(--orange); }
  .drawer-acc[aria-expanded="true"] .drawer-acc-i::after{ transform:scaleY(0); opacity:0; }
  .drawer-sub{ padding:4px 0 10px; border-bottom:1px solid var(--line); }
  .drawer-acc2{ display:flex; align-items:center; justify-content:space-between; width:100%; gap:8px; padding:12px 8px; margin:2px 0; background:var(--paper-alt); border:none; border-radius:8px; font:inherit; font-weight:600; font-size:.94rem; color:var(--ink); cursor:pointer; text-align:left; }
  .drawer-acc2 img{ width:18px; height:18px; border-radius:50%; object-fit:cover; margin-right:6px; vertical-align:-4px; }
  .drawer-acc2[aria-expanded="true"]{ background:#fff; color:var(--orange); box-shadow:inset 0 0 0 1px var(--line); }
  .drawer-acc2[aria-expanded="true"] .drawer-acc-i::after{ transform:scaleY(0); opacity:0; }
  .drawer-sub2{ padding:2px 0 8px 6px; }
  .drawer-nav .drawer-sub2 a{ display:flex; align-items:center; gap:8px; padding:10px 8px; font-size:.9rem; font-weight:500; color:var(--ink-soft); border-bottom:none; border-radius:6px; }
  .drawer-nav .drawer-sub2 a:hover, .drawer-nav .drawer-sub2 a:active{ background:var(--paper-alt); color:var(--orange); }
  .drawer-nav .drawer-sub2 a img{ width:17px; height:17px; border-radius:50%; object-fit:cover; }
  .drawer-nav .drawer-sub2 a.is-sub{ padding-left:26px; font-size:.86rem; }
  /* nav_v4:end */
`;

const JS = `<!-- nav_v4:js:start -->
<script>
    // nav_v4: two-pane dropdowns and nested drawer accordions
    (function () {
        // desktop: hovering or focusing a rail tab swaps the pane beside it
        [].slice.call(document.querySelectorAll('.nav-dropdown-panel .mg2')).forEach(function (menu) {
            var tabs = [].slice.call(menu.querySelectorAll('.mg2-tab'));
            function show(tab) {
                tabs.forEach(function (t) {
                    var on = t === tab;
                    t.classList.toggle('is-active', on);
                    t.setAttribute('aria-selected', on ? 'true' : 'false');
                    var pane = document.getElementById(t.getAttribute('data-pane'));
                    if (pane) pane.classList.toggle('is-active', on);
                });
            }
            tabs.forEach(function (tab) {
                tab.addEventListener('mouseenter', function () { show(tab); });
                tab.addEventListener('focus', function () { show(tab); });
                tab.addEventListener('click', function (e) { e.preventDefault(); show(tab); });
            });
        });
        // the triggers point at #services / #regions, anchors that exist on no page: open on click too
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
        // mobile: two levels of accordion. Buttons, so the drawer's close-on-link-tap handler is unaffected.
        function wire(sel, attr) {
            var btns = [].slice.call(document.querySelectorAll(sel));
            btns.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var panel = document.getElementById(btn.getAttribute(attr));
                    var isOpen = btn.getAttribute('aria-expanded') === 'true';
                    btns.forEach(function (other) {              // one open at a time, per level
                        if (other === btn || other.parentNode !== btn.parentNode) return;
                        other.setAttribute('aria-expanded', 'false');
                        var op = document.getElementById(other.getAttribute(attr));
                        if (op) op.hidden = true;
                    });
                    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
                    if (panel) panel.hidden = isOpen;
                });
            });
        }
        wire('.drawer-acc', 'data-acc');
        wire('.drawer-acc2', 'data-acc2');
    })();
</script>
<!-- nav_v4:js:end -->
`;

// ---- rewrite ---------------------------------------------------------------------------------
const SKIP = ['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'];
const walk = (d, out) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};
function swapPanel(s, triggerRe, panel) {
  const m = s.match(triggerRe); if (!m) return s;
  const start = s.indexOf('<div class="nav-dropdown-panel', m.index); if (start < 0) return s;
  const re = /<div\b[^>]*>|<\/div>/g; re.lastIndex = start;
  let depth = 0, end = -1, t;
  while ((t = re.exec(s))) { if (t[0].charAt(1) === '/') { depth--; if (depth === 0) { end = t.index + 6; break; } } else depth++; }
  if (end < 0) return s;
  return s.slice(0, start) + panel + s.slice(end);
}
// remove v3's blocks (and any legacy unmarked one) so nothing runs twice
function stripOld(s) {
  s = s.replace(/\r?\n  \/\* nav_v3:start[\s\S]*?\/\* nav_v3:end \*\/\r?\n/, '\n');
  s = s.replace(/<!-- nav_v3:js:start -->[\s\S]*?<!-- nav_v3:js:end -->\r?\n?/, '');
  s = s.replace(/\r?\n  \/\* nav_v4:start[\s\S]*?\/\* nav_v4:end \*\/\r?\n/, '\n');
  s = s.replace(/<!-- nav_v4:js:start -->[\s\S]*?<!-- nav_v4:js:end -->\r?\n?/, '');
  return s;
}

let pages = 0, drawers = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = stripOld(fs.readFileSync(p, 'utf8'));
  const before = s;
  s = swapPanel(s, /<a href="[^"]*#services"[^>]*>\s*Services\s*<span class="nav-dropdown-caret">/, servicesPanel);
  s = swapPanel(s, /<a href="[^"]*#regions"[^>]*>\s*Service Areas\s*<span class="nav-dropdown-caret">/, regionsPanel);
  const dStart = s.indexOf('<nav class="drawer-nav">');
  if (dStart >= 0) {
    const dEnd = s.indexOf('</nav>', dStart);
    if (dEnd > dStart) { s = s.slice(0, dStart) + drawerNav + s.slice(dEnd + 6); drawers++; }
  }
  { const at = s.indexOf('</style>'); if (at > 0) s = s.slice(0, at) + CSS + s.slice(at); }
  { const bt = s.lastIndexOf('</body>'); if (bt > 0) s = s.slice(0, bt) + JS + s.slice(bt); }
  if (s !== before || true) { L.write(rel, s); if (s !== before) pages++; }
}

// ---- guards ----------------------------------------------------------------------------------
const problems = [];
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  const s = fs.readFileSync(p, 'utf8');
  if (!s.includes('class="nav-dropdown-panel')) continue;
  for (const [needle, label] of [
    ['nav-mega nav-services', 'services panel'], ['nav-mega nav-regions', 'regions panel'],
    ['/* nav_v4:start', 'v4 css'], ['nav_v4:js:start', 'v4 js'],
    ['class="mg2-tab is-active"', 'a default-selected tab'],
    ['class="mg2-pane is-active"', 'a default-visible pane'],
    ['class="drawer-acc2"', 'nested drawer accordions'],
  ]) if (!s.includes(needle)) problems.push(rel + ': missing ' + label);
  for (const [needle, label] of [
    ['nav_v3:start', 'v3 css'], ['nav_v3:js:start', 'v3 js'], ['nav_menus:', 'v2 css'],
    ['href="#services">Services</a>', 'dead drawer link'],
  ]) if (s.includes(needle)) problems.push(rel + ': ' + label + ' survived');
  if ((s.match(/nav_v4:start/g) || []).length > 1) problems.push(rel + ': css twice');
  if ((s.match(/nav_v4:js:start/g) || []).length > 1) problems.push(rel + ': js twice');
  // one active tab and one active pane per menu, or the pane area opens blank / doubled
  if ((s.match(/class="mg2-tab is-active"/g) || []).length !== 2) problems.push(rel + ': active tab count != 2');
  if ((s.match(/class="mg2-pane is-active"/g) || []).length !== 2) problems.push(rel + ': active pane count != 2');
}
if (problems.length) throw new Error(problems.length + ' problem(s):\n  ' + problems.slice(0, 10).join('\n  '));

console.log('nav v4: ' + pages + ' pages changed, ' + drawers + ' drawers, ' +
  SERVICES.length + ' service tabs / ' + REGIONS.length + ' country tabs');
