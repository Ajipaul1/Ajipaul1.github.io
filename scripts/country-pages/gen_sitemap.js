'use strict';
// Regenerates sitemap.xml from the files that actually exist. lastmod = today for files git sees as
// modified/untracked, otherwise the previous sitemap's date (or today if it was never listed).
const L = require('./lib.js');
const fs = require('fs'); const path = require('path'); const { execSync } = require('child_process');
const TODAY = '2026-09-03';
const old = {}; for (const m of L.read('sitemap.xml').matchAll(/<loc>https:\/\/techauditpros\.com([^<]*)<\/loc><lastmod>([^<]*)<\/lastmod>/g)) old[m[1]] = m[2];
const BASE = '1b4dbc3'; // pre-session commit; the owner's GitHub Desktop auto-commits mid-session
const changed = new Set([
  ...execSync(`git diff --name-only ${BASE}`, { cwd: L.REPO }).toString().split('\n'),
  ...execSync('git ls-files --others --exclude-standard', { cwd: L.REPO }).toString().split('\n'),
].filter(Boolean).map(l => l.trim().replace(/\\/g, '/')));
function isChanged(rel) { for (const c of changed) { if (rel === c || rel.startsWith(c.endsWith('/') ? c : c + '/')) return true; } return false; }
const urls = [];
function add(url, rel) { urls.push({ url, mod: isChanged(rel) ? TODAY : (old[url] || TODAY) }); }
add('/', 'index.html');
add('/blog/', 'blog/index.html');
for (const f of fs.readdirSync(path.join(L.REPO, 'blog')).sort()) {
  const p = path.join(L.REPO, 'blog', f);
  if (f.endsWith('.html') && f !== 'index.html') add('/blog/' + f, 'blog/' + f);
  else if (fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'))) add('/blog/' + f + '/', 'blog/' + f + '/index.html');
}
for (const dir of ['ca', 'in', 'uk', 'us']) {
  add('/' + dir + '/', dir + '/index.html');
  for (const f of fs.readdirSync(path.join(L.REPO, dir)).sort()) { const p = path.join(L.REPO, dir, f); if (fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'))) add(`/${dir}/${f}/`, `${dir}/${f}/index.html`); }
}
add('/privacy/', 'privacy/index.html'); add('/seo-audit-kochi/', 'seo-audit-kochi/index.html'); add('/terms/', 'terms/index.html');
urls.sort((a, b) => a.url.localeCompare(b.url));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>https://techauditpros.com${u.url}</loc><lastmod>${u.mod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(L.REPO, 'sitemap.xml'), xml);
console.log('sitemap:', urls.length, 'URLs (was', Object.keys(old).length + ')');
