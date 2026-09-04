'use strict';
// Remove the "Why TechAuditPros / your data stays yours" badge section + "Built on" stack strip
// (owner, 2026-09-03: "I am seeing so many duplicate content repeating on many pages like this section
// ... don't add this section any pages anymore").
//
// It sat on 8 service pages with near-identical badges (NDA, source-code ownership, cloud region,
// weekly backups) and the same Node/PostgreSQL/React stack strip. Not byte-identical page to page, so a
// duplicate-content checker would not flag it, but it is boilerplate repeated across the whole service
// set, which is exactly the thin-content pattern to avoid. The trust facts it carried are not lost:
// they are already in each page's FAQ and, on /uk/erp/, in the UK compliance section.
//
// This script: strips the section from the built pages, removes the L.whySection() calls from the
// generators, drops the cinematic band that targeted it, and un-exports the helper so it cannot be
// re-added by accident. Idempotent.
//   node scripts/country-pages/drop_why_section.js
const fs = require('fs'); const path = require('path');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';
const read = r => fs.readFileSync(path.join(REPO, r), 'utf8');
const write = (r, s) => fs.writeFileSync(path.join(REPO, r), s);

// 1. built pages: drop the section block (no nested <section> inside it)
const PAGES = ['ca/erp/index.html', 'ca/seo-services/index.html', 'ca/toronto/index.html',
  'ca/website-development/index.html', 'uk/erp/index.html', 'us/erp/index.html',
  'us/seo-services/index.html', 'us/website-development/index.html'];
let dropped = 0;
for (const rel of PAGES) {
  let s = read(rel);
  const re = /<section class="tap-erp-why-section[^"]*"[^>]*>[\s\S]*?<\/section>\s*/;
  if (!re.test(s)) { console.log('  already clean:', rel); continue; }
  s = s.replace(re, '');
  if (/tap-erp-why-section[^{]/.test(s.replace(/\.tap-erp-why-section/g, ''))) throw new Error('leftover markup in ' + rel);
  write(rel, s); dropped++;
  console.log('  section removed:', rel);
}
console.log('built pages cleaned:', dropped);

// 2. generators: remove the call so a rebuild does not bring it back
for (const rel of ['scripts/country-pages/uk_erp.js', 'scripts/country-pages/us_erp.js',
  'scripts/country-pages/us_seo.js', 'scripts/country-pages/us_web.js']) {
  let s = read(rel);
  const before = s;
  s = s.replace(/^body \+= L\.whySection\([\s\S]*?\);\r?\n\r?\n?/m, '');
  if (s === before) { console.log('  no whySection call left in', rel); continue; }
  if (s.includes('L.whySection(')) throw new Error('more than one whySection call in ' + rel);
  write(rel, s); console.log('  call removed:', rel);
}

// 3. cinematic.js: its chapter band pointed at that section on the three US service pages
{
  const rel = 'scripts/country-pages/cinematic.js';
  let s = read(rel);
  const before = s;
  s = s.replace(/^\s*'us\/erp\/index\.html': \{ bands: \[\['<section class="tap-erp-why-section">[\s\S]*?\] \},\r?\n/m,
    "  'us/erp/index.html': { bands: [] },   // the why-us band section was removed 2026-09-03 (duplicate boilerplate)\n");
  s = s.replace(/^\s*'us\/website-development\/index\.html': \{ bands: \[\['<section class="tap-erp-why-section">[\s\S]*?\] \},\r?\n/m,
    "  'us/website-development/index.html': { bands: [] },\n");
  // the SEO page keeps its second band (#seo-proof) and loses only the why-us one
  s = s.replace(/\['<section class="tap-erp-why-section">', '<section class="tap-erp-why-section band-cinema" style="--band-img:url\(\\'\/assets\/images\/library\/istock-2148073937-ai-wireframe-head-particles\.jpg\\'\)"\],\r?\n\s*/,
    '');
  if (s !== before) { write(rel, s); console.log('  cinematic bands updated'); }
  else console.log('  cinematic already updated');
}

// 4. lib.js: keep the function for history but stop exporting it
{
  const rel = 'scripts/country-pages/lib.js';
  let s = read(rel);
  if (s.includes('whySection, statRow')) {
    s = s.replace('whySection, statRow', 'statRow');
    s = s.replace('function whySection(', '// DO NOT USE - removed from every page 2026-09-03 as duplicate boilerplate (owner). Kept for reference only; not exported.\nfunction whySection(');
    write(rel, s); console.log('  lib.js: whySection un-exported');
  } else console.log('  lib.js already updated');
}

// 5. verify
const stray = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html') && read(rel).includes('<section class="tap-erp-why-section')) stray.push(rel);
  }
})('');
console.log('pages still carrying the section:', stray.length ? stray : 'none');
