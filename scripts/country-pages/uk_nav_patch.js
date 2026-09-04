'use strict';
// Site-wide wiring for the new UK set: the Markets dropdown + footer Markets list on every page that
// already carries the US item, en-gb hreflang on the pages that have a UK counterpart, and the homepage
// / CA-hub region card pointing at /uk/ instead of #contact. Idempotent: re-running changes nothing.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');

// 1. nav + footer on every page carrying the shared header (found by the US item, added 2026-09-03)
const all = [];
(function walk(dir) {
  for (const f of fs.readdirSync(path.join(L.REPO, dir || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', 'scripts'].includes(f)) continue;
    const rel = dir ? dir + '/' + f : f;
    const abs = path.join(L.REPO, rel);
    if (fs.statSync(abs).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) all.push(rel);
  }
})('');
let navPatched = 0;
for (const rel of all) {
  let s = L.read(rel);
  if (!s.includes('href="/us/" class="nav-dropdown-item"')) continue;   // not a shared-header page
  const before = s;
  s = L.addUkToNavAndFooter(s);
  if (s !== before) { L.write(rel, s); navPatched++; }
}
console.log('nav/footer: UK item added to', navPatched, 'of', all.length, 'html files');

// 2. hreflang: add en-gb wherever a UK counterpart now exists
function setHreflang(rel, self, pairs) {
  let s = L.read(rel);
  s = s.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\r?\n/g, '');
  const hl = pairs.map(h => `<link rel="alternate" hreflang="${h.lang}" href="${h.href}" />\n`).join('');
  const before = s;
  s = s.replace(/<link href="([^"]*)" rel="canonical"\/>/, (m, href) => { if (href !== self) throw new Error(rel + ' canonical is ' + href); return hl + m; });
  if (s === before) throw new Error('canonical not found in ' + rel);
  L.must(s, 'rel="canonical"', 1);
  L.write(rel, s);
}
const G = 'https://techauditpros.com/';
setHreflang('index.html', G, [{ lang: 'en-gb', href: G + 'uk/' }, { lang: 'en-us', href: G + 'us/' }, { lang: 'en-ca', href: G + 'ca/' }, { lang: 'x-default', href: G }]);
setHreflang('ca/index.html', G + 'ca/', [{ lang: 'en-ca', href: G + 'ca/' }, { lang: 'en-us', href: G + 'us/' }, { lang: 'en-gb', href: G + 'uk/' }, { lang: 'x-default', href: G }]);
setHreflang('us/index.html', G + 'us/', [{ lang: 'en-us', href: G + 'us/' }, { lang: 'en-ca', href: G + 'ca/' }, { lang: 'en-gb', href: G + 'uk/' }, { lang: 'x-default', href: G }]);
setHreflang('ca/erp/index.html', G + 'ca/erp/', [{ lang: 'en-ca', href: G + 'ca/erp/' }, { lang: 'en-us', href: G + 'us/erp/' }, { lang: 'en-gb', href: G + 'uk/erp/' }]);
setHreflang('us/erp/index.html', G + 'us/erp/', [{ lang: 'en-us', href: G + 'us/erp/' }, { lang: 'en-ca', href: G + 'ca/erp/' }, { lang: 'en-gb', href: G + 'uk/erp/' }]);
setHreflang('ca/website-development/index.html', G + 'ca/website-development/', [{ lang: 'en-ca', href: G + 'ca/website-development/' }, { lang: 'en-us', href: G + 'us/website-development/' }, { lang: 'en-gb', href: G + 'uk/website-development/' }]);
setHreflang('us/website-development/index.html', G + 'us/website-development/', [{ lang: 'en-us', href: G + 'us/website-development/' }, { lang: 'en-ca', href: G + 'ca/website-development/' }, { lang: 'en-gb', href: G + 'uk/website-development/' }]);
// the UK seo page lands later in session B; its CA/US counterparts keep their existing pairs until then

// 3. region cards: the UK card had no destination
{
  const re = /(<a href=")#contact(" class="region-card">\s*<span class="region-flag"><img src="https:\/\/flagcdn\.com\/w80\/gb\.png)/g;
  for (const rel of ['index.html', 'ca/index.html', 'us/index.html']) {
    let s = L.read(rel);
    const n = (s.match(re) || []).length;
    if (n === 1) { s = s.replace(re, '$1/uk/$2'); L.write(rel, s); console.log('region card -> /uk/ in', rel); }
    else if (s.includes('<a href="/uk/" class="region-card">')) console.log('region card already points to /uk/ in', rel);
    else console.log('no UK region card in', rel, '(matches=' + n + ')');
  }
}

// 4. sitemap discovery must include the uk directory
{
  const p = path.join(L.REPO, 'scripts/country-pages/gen_sitemap.js');
  let g = fs.readFileSync(p, 'utf8');
  if (g.includes("['ca', 'us']")) {
    g = g.replace("['ca', 'us']", "['ca', 'uk', 'us']");
    fs.writeFileSync(p, g);
    console.log('gen_sitemap.js now walks ca, uk, us');
  } else console.log('gen_sitemap.js already includes uk');
}
