'use strict';
// Site-wide wiring for the new US set: nav dropdown + footer Markets on every page that shares
// the current header, hreflang pairs on the CA/global pages, vercel.json redirect fixes.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');

const pages = [
  'index.html', 'ca/index.html', 'ca/erp/index.html', 'ca/seo-services/index.html', 'ca/website-development/index.html', 'ca/toronto/index.html',
  'blog/what-is-a-content-audit.html', 'blog/website-design-vs-development.html', 'blog/what-is-erp-software-plain-english.html', 'blog/full-service-vs-diy-erp-agency-canada.html',
];
for (const rel of pages) {
  let s = L.read(rel);
  const before = s;
  if (s.includes('href="/ca/" class="nav-dropdown-item"') && s.includes('\u{1F1E8}\u{1F1E6} Canada</a></p>')) s = L.addUsToNavAndFooter(s);
  if (s !== before) { L.write(rel, s); } else console.log('unchanged', rel);
}

// hreflang pairs: CA pages ↔ US pages
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
setHreflang('index.html', 'https://techauditpros.com/', [
  { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'en-us', href: 'https://techauditpros.com/us/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }]);
setHreflang('ca/index.html', 'https://techauditpros.com/ca/', [
  { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'en-us', href: 'https://techauditpros.com/us/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }]);
setHreflang('ca/erp/index.html', 'https://techauditpros.com/ca/erp/', [
  { lang: 'en-ca', href: 'https://techauditpros.com/ca/erp/' }, { lang: 'en-us', href: 'https://techauditpros.com/us/erp/' }]);
setHreflang('ca/seo-services/index.html', 'https://techauditpros.com/ca/seo-services/', [
  { lang: 'en-ca', href: 'https://techauditpros.com/ca/seo-services/' }, { lang: 'en-us', href: 'https://techauditpros.com/us/seo-services/' }]);
setHreflang('ca/website-development/index.html', 'https://techauditpros.com/ca/website-development/', [
  { lang: 'en-ca', href: 'https://techauditpros.com/ca/website-development/' }, { lang: 'en-us', href: 'https://techauditpros.com/us/website-development/' }]);

// homepage regions grid: US card now has a real destination
{
  const re = /(<a href=")#contact(" class="region-card">\s*<span class="region-flag"><img src="https:\/\/flagcdn\.com\/w80\/us\.png)/g;
  for (const rel of ['index.html', 'ca/index.html']) {
    let s = L.read(rel);
    const n = (s.match(re) || []).length;
    if (n === 1) { s = s.replace(re, '$1/us/$2'); L.write(rel, s); }
    else if (s.includes('<a href="/us/" class="region-card">')) console.log('region card already points to /us/ in', rel);
    else throw new Error('US region card not found in ' + rel + ' (matches=' + n + ')');
  }
}

// vercel.json: the old blanket /us/* -> / redirect would swallow the new pages
{
  const p = path.join(L.REPO, 'vercel.json');
  const v = JSON.parse(fs.readFileSync(p, 'utf8'));
  const beforeN = v.redirects.length;
  v.redirects = v.redirects.filter(r => r.source !== '/us/:path*');
  const legacyUs = ['/us/white-label-seo/:path*', '/us/white-label-seo', '/us/index.html'];
  for (const src of legacyUs) if (!v.redirects.some(r => r.source === src)) v.redirects.push({ source: src, destination: src.includes('white-label') ? '/us/seo-services/' : '/us/', permanent: true });
  const repoint = { '/charlotte-seo-company/:path*': '/us/seo-services/', '/orlando-seo-agency/:path*': '/us/seo-services/', '/new-york-city-seo-experts/:path*': '/us/seo-services/', '/white-label-seo-agency-usa/:path*': '/us/seo-services/' };
  for (const r of v.redirects) if (repoint[r.source]) r.destination = repoint[r.source];
  fs.writeFileSync(p, JSON.stringify(v, null, 2).replace(/\{\n\s+"source": ("[^"]*"),\n\s+"destination": ("[^"]*"),\n\s+"permanent": true\n\s+\}/g, '{ "source": $1, "destination": $2, "permanent": true }') + '\n');
  console.log('vercel.json redirects', beforeN, '->', v.redirects.length);
}
