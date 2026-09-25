// hreflang.js — one source of truth for which pages are country versions of each other.
// Google ignores an hreflang tag unless both pages point at each other; the 2026-09-25 audit found 179 one-way
// tags (the homepage, /us/, /ca/ and /uk/ never listed /au/, /in/ or /ae/; /ae/erp/ was in no cluster; city pages
// and blog posts carried hreflang with no alternates). Every member of a cluster now lists every member, itself
// and one x-default; every page outside a cluster carries none.
// When a new country version is built, add it to CLUSTERS and re-run.   node scripts/seo/hreflang.js
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const ROOT = path.resolve(__dirname, '../..');
const O = 'https://techauditpros.com';
const CLUSTERS = {
  hub: { 'x-default': '/', 'en-us': '/us/', 'en-ca': '/ca/', 'en-au': '/au/', 'en-in': '/in/', 'en-ae': '/ae/', 'en-gb': '/uk/' },
  erp: { 'x-default': '/us/erp/', 'en-us': '/us/erp/', 'en-ca': '/ca/erp/', 'en-au': '/au/erp/', 'en-ae': '/ae/erp/', 'en-gb': '/uk/erp/' },
  seo: { 'x-default': '/us/seo-services/', 'en-us': '/us/seo-services/', 'en-ca': '/ca/seo-services/', 'en-ae': '/ae/dubai/', 'en-gb': '/uk/seo-services/' },
  web: { 'x-default': '/us/website-development/', 'en-us': '/us/website-development/', 'en-ca': '/ca/website-development/', 'en-au': '/au/website-development/', 'en-gb': '/uk/website-development/' },
};
const fileOf = u => (u === '/' ? 'index.html' : u.slice(1) + 'index.html');
const member = {};
for (const [name, c] of Object.entries(CLUSTERS)) for (const u of Object.values(c)) {
  if (!fs.existsSync(path.join(ROOT, fileOf(u)))) throw new Error(`${name}: ${u} does not exist`);
  if (member[u] && member[u] !== name) throw new Error(`${u} is in two clusters`);
  member[u] = name;
}
const toUrl = f => f === 'index.html' ? '/' : f.endsWith('/index.html') ? '/' + f.slice(0, -10) : '/' + f;
const pages = execSync('git ls-files "*.html"', { cwd: ROOT }).toString().trim().split('\n').filter(f => !/^(archive|scripts|scratch|ai_context)\//.test(f));
let added = 0, removed = 0, touched = 0;
for (const f of pages) {
  const p = path.join(ROOT, f); const before = fs.readFileSync(p, 'utf8'); const eol = before.includes('\r\n') ? '\r\n' : '\n';
  let s = before.replace(/[ \t]*<link[^>]*\bhreflang="[^"]*"[^>]*>[ \t]*\r?\n/g, () => { removed++; return ''; });
  const url = toUrl(f), c = CLUSTERS[member[url]];
  if (c) {
    const m = s.match(/^([ \t]*)<link[^>]*rel="canonical"[^>]*>[ \t]*\r?\n/m);
    if (!m) throw new Error('no canonical line to anchor on: ' + f);
    const tags = Object.entries(c).map(([l, u]) => `${m[1]}<link rel="alternate" hreflang="${l}" href="${O}${u}" />`).join(eol) + eol;
    s = s.replace(m[0], m[0] + tags); added += Object.keys(c).length;
  }
  if (s !== before) { touched++; fs.writeFileSync(p, s); }
}
console.log('pages touched', touched, '| tags removed', removed, '| tags written', added);
