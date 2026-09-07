'use strict';
// Service Areas dropdown, site-wide: a grouped grid (country -> its pages) instead of a flat mixed list. Idempotent.
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');
const flag = c => '<img src="https://flagcdn.com/w40/' + c + '.png" alt="" width="40" height="30" loading="lazy" decoding="async" />';
const GROUPS = [
  ['ca', 'Canada', '/ca/', [['Toronto', '/ca/toronto/']]],
  ['us', 'United States', '/us/', [['ERP', '/us/erp/'], ['SEO', '/us/seo-services/'], ['Websites', '/us/website-development/']]],
  ['gb', 'United Kingdom', '/uk/', [['London', '/uk/london/'], ['Manchester', '/uk/manchester/'], ['Reading', '/uk/reading/'], ['Scotland', '/uk/scotland/']]],
  ['in', 'India', '/in/', [['Kerala', '/in/kerala/'], ['Mumbai', '/in/mumbai/'], ['Kolkata', '/in/kolkata/'], ['Vadodara', '/in/vadodara/'], ['Lucknow', '/in/lucknow/'], ['Calicut', '/in/calicut/']]],
  ['ae', 'United Arab Emirates', '/ae/', [['Abu Dhabi', '/ae/abu-dhabi/'], ['Dubai', '/ae/dubai/'], ['E-commerce', '/ae/ecommerce-website-development/'], ['ERP', '/ae/erp/']]],
];
const PANEL = '<div class="nav-dropdown-panel nav-regions">\n' + GROUPS.map(([c, n, h, cities]) => '                        <div class="nav-region"><a href="' + h + '" class="nav-region-head">' + flag(c) + ' ' + n + '</a>' + cities.map(([cn, ch]) => '<a href="' + ch + '" class="nav-region-link">' + cn + '</a>').join('') + '</div>').join('\n') + '\n                    </div>';
const CSS = `
  /* nav_regions: Service Areas grouped by country */
  .nav-dropdown-panel.nav-regions{ display:grid; grid-template-columns:repeat(5, minmax(150px, 1fr)); gap:18px 22px; min-width:min(980px, 94vw); padding:22px 28px; left:50%; }
  .nav-region{ display:grid; gap:4px; align-content:start; }
  .nav-region-head{ display:flex; align-items:center; gap:8px; font-weight:700; color:var(--ink); text-decoration:none; padding:6px 8px; border-radius:6px; border-bottom:2px solid var(--orange); margin-bottom:4px; white-space:nowrap; }
  .nav-region-head img{ width:20px; height:20px; border-radius:50%; object-fit:cover; flex-shrink:0; }
  .nav-region-head:hover{ background:var(--paper-alt); }
  .nav-region-link{ display:block; padding:5px 8px; border-radius:6px; color:var(--ink-soft); text-decoration:none; font-size:.92rem; white-space:nowrap; }
  .nav-region-link:hover{ background:var(--paper-alt); color:var(--orange); }
  @media (max-width:1180px){ .nav-dropdown-panel.nav-regions{ grid-template-columns:repeat(3, 1fr); min-width:min(720px, 92vw); } }
`;
const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
let changed = 0, skipped = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = fs.readFileSync(p, 'utf8');
  const a = s.indexOf('<div class="nav-dropdown-panel">'); if (a < 0) { if (s.includes('class="nav-dropdown-panel nav-regions"')) { skipped++; } else skipped++; continue; }
  const b = s.indexOf('</div>', a); if (b < 0) { skipped++; continue; }
  // the panel contains only <a> items, so the first </div> after it closes the panel
  const inner = s.slice(a, b); if (!/class="nav-dropdown-item"/.test(inner) || /<div/.test(inner.slice(32))) { skipped++; continue; }
  s = s.slice(0, a) + PANEL + s.slice(b + 6);
  if (!s.includes('/* nav_regions:')) { const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); }
  L.write(rel, s); changed++;
}
console.log('nav regions: ' + changed + ' pages regrouped, ' + skipped + ' skipped');
