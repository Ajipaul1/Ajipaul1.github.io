'use strict';
// Both header dropdowns, site-wide, detected by their label (not position):
//   Services      -> three service columns (ERP / SEO / Websites), each listing the country pages with flags
//   Service Areas -> five country columns, each listing its pages
// Idempotent: re-running rewrites both panels from this file. Replaces nav_regions.js (2026-09-07), which matched
// the first panel on each page and so hit the Services menu on pages where Services comes first.
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');
const flag = c => '<img src="https://flagcdn.com/w40/' + c + '.png" alt="" width="40" height="30" loading="lazy" decoding="async" />';
const REGIONS = [
  ['ca', 'Canada', '/ca/', [['Toronto', '/ca/toronto/']]],
  ['us', 'United States', '/us/', [['ERP', '/us/erp/'], ['SEO', '/us/seo-services/'], ['Websites', '/us/website-development/']]],
  ['gb', 'United Kingdom', '/uk/', [['London', '/uk/london/'], ['Manchester', '/uk/manchester/'], ['Reading', '/uk/reading/'], ['Scotland', '/uk/scotland/']]],
  ['in', 'India', '/in/', [['Kerala', '/in/kerala/'], ['Mumbai', '/in/mumbai/'], ['Kolkata', '/in/kolkata/'], ['Vadodara', '/in/vadodara/'], ['Lucknow', '/in/lucknow/'], ['Calicut', '/in/calicut/']]],
  ['ae', 'United Arab Emirates', '/ae/', [['Abu Dhabi', '/ae/abu-dhabi/'], ['Dubai', '/ae/dubai/'], ['E-commerce', '/ae/ecommerce-website-development/'], ['ERP', '/ae/erp/']]],
];
const SERVICES = [
  ['Custom ERP', '/us/erp/', [['us', 'United States', '/us/erp/'], ['gb', 'United Kingdom', '/uk/erp/'], ['ca', 'Canada', '/ca/erp/'], ['ae', 'United Arab Emirates', '/ae/erp/'], ['ae', 'UAE &middot; Construction', '/ae/erp/construction/'], ['ae', 'UAE &middot; Automotive', '/ae/erp/automotive/'], ['in', 'India', '/in/']]],
  ['SEO, AEO &amp; GEO', '/us/seo-services/', [['us', 'United States', '/us/seo-services/'], ['gb', 'United Kingdom', '/uk/seo-services/'], ['ca', 'Canada', '/ca/seo-services/'], ['ae', 'Abu Dhabi', '/ae/abu-dhabi/'], ['ae', 'Dubai', '/ae/dubai/'], ['in', 'Kerala', '/in/kerala/'], ['in', 'Mumbai', '/in/mumbai/'], ['in', 'Kolkata', '/in/kolkata/']]],
  ['Websites &amp; E-commerce', '/us/website-development/', [['us', 'United States', '/us/website-development/'], ['gb', 'United Kingdom', '/uk/website-development/'], ['ca', 'Canada', '/ca/website-development/'], ['ae', 'UAE &middot; E-commerce', '/ae/ecommerce-website-development/'], ['in', 'India', '/in/']]],
];
const regionsPanel = '<div class="nav-dropdown-panel nav-regions">\n' + REGIONS.map(([c, n, h, cities]) => '                        <div class="nav-region"><a href="' + h + '" class="nav-region-head">' + flag(c) + ' ' + n + '</a>' + cities.map(([cn, ch]) => '<a href="' + ch + '" class="nav-region-link">' + cn + '</a>').join('') + '</div>').join('\n') + '\n                    </div>';
const servicesPanel = '<div class="nav-dropdown-panel nav-services">\n' + SERVICES.map(([n, h, rows]) => '                        <div class="nav-region"><a href="' + h + '" class="nav-region-head">' + n + '</a>' + rows.map(([c, cn, ch]) => '<a href="' + ch + '" class="nav-region-link">' + flag(c) + ' ' + cn + '</a>').join('') + '</div>').join('\n') + '\n                    </div>';
const CSS = [
  '',
  '  /* nav_menus: both dropdowns as grouped grids */',
  '  .nav-dropdown-panel.nav-regions, .nav-dropdown-panel.nav-services{ display:grid; gap:18px 22px; padding:22px 28px; left:50%; }',
  '  .nav-dropdown-panel.nav-regions{ grid-template-columns:repeat(5, minmax(150px, 1fr)); min-width:min(980px, 94vw); }',
  '  .nav-dropdown-panel.nav-services{ grid-template-columns:repeat(3, minmax(210px, 1fr)); min-width:min(780px, 94vw); }',
  '  .nav-region{ display:grid; gap:4px; align-content:start; }',
  '  .nav-region-head{ display:flex; align-items:center; gap:8px; font-weight:700; color:var(--ink); text-decoration:none; padding:6px 8px; border-radius:6px; border-bottom:2px solid var(--orange); margin-bottom:4px; white-space:nowrap; }',
  '  .nav-region-head img, .nav-region-link img{ width:20px; height:20px; border-radius:50%; object-fit:cover; flex-shrink:0; }',
  '  .nav-region-head:hover{ background:var(--paper-alt); }',
  '  .nav-region-link{ display:flex; align-items:center; gap:8px; padding:5px 8px; border-radius:6px; color:var(--ink-soft); text-decoration:none; font-size:.92rem; white-space:nowrap; }',
  '  .nav-region-link:hover{ background:var(--paper-alt); color:var(--orange); }',
  '  @media (max-width:1180px){ .nav-dropdown-panel.nav-regions{ grid-template-columns:repeat(3, 1fr); min-width:min(720px, 92vw); } }',
  '',
].join('\n');
const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
// Replace the panel that follows a trigger anchor. Walk div depth from the panel's opening tag to find its own close.
function swapPanel(s, triggerRe, panel) {
  const m = s.match(triggerRe); if (!m) return s;
  const start = s.indexOf('<div class="nav-dropdown-panel', m.index); if (start < 0) return s;
  const re = /<div\b[^>]*>|<\/div>/g; re.lastIndex = start;
  let depth = 0, end = -1, t;
  while ((t = re.exec(s))) { if (t[0].charAt(1) === '/') { depth--; if (depth === 0) { end = t.index + 6; break; } } else depth++; }
  if (end < 0) return s;
  return s.slice(0, start) + panel + s.slice(end);
}
let changed = 0, skipped = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = fs.readFileSync(p, 'utf8'); if (!s.includes('class="nav-dropdown-panel')) { skipped++; continue; }
  const before = s;
  s = swapPanel(s, /<a href="[^"]*#services"[^>]*>\s*Services\s*<span class="nav-dropdown-caret">/, servicesPanel);
  s = swapPanel(s, /<a href="[^"]*#regions"[^>]*>\s*Service Areas\s*<span class="nav-dropdown-caret">/, regionsPanel);
  // drop the earlier nav_regions CSS block if present, then add this one once
  s = s.replace(/\n  \/\* nav_regions: Service Areas grouped by country \*\/\n(?:  \.[^\n]*\n|  @media[^\n]*\n)*/, '\n');
  if (!s.includes('/* nav_menus:')) { const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); }
  if (s !== before) { L.write(rel, s); changed++; } else skipped++;
}
console.log('nav menus: ' + changed + ' pages rewritten, ' + skipped + ' skipped');
