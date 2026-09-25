'use strict';
// Regenerates sitemap.xml from the files that actually exist. lastmod = the date of the last commit that
// touched the file (today if it has uncommitted changes). Google uses lastmod only while it stays
// "consistently and verifiably accurate"; the old rule (diff against a fixed base commit) stamped every URL
// with the same day, so Google ignored it. /quote/ is noindex and deliberately left out.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path'); const { execSync } = require('child_process');
const TODAY = new Date().toISOString().slice(0, 10);
const dirty = new Set([
  ...execSync('git diff --name-only HEAD', { cwd: L.REPO }).toString().split('\n'),
  ...execSync('git ls-files --others --exclude-standard', { cwd: L.REPO }).toString().split('\n'),
].filter(Boolean).map(l => l.trim().replace(/\\/g, '/')));
function lastmod(rel) {
  if (dirty.has(rel)) return TODAY;
  const d = execSync(`git log -1 --format=%cs -- "${rel}"`, { cwd: L.REPO }).toString().trim();
  return d || TODAY;
}
const urls = [];
function add(url, rel) { urls.push({ url, mod: lastmod(rel) }); }
add('/', 'index.html');
add('/blog/', 'blog/index.html');
for (const f of fs.readdirSync(path.join(L.REPO, 'blog')).sort()) {
  const p = path.join(L.REPO, 'blog', f);
  if (f.endsWith('.html') && f !== 'index.html') add('/blog/' + f, 'blog/' + f);
  else if (fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'))) add('/blog/' + f + '/', 'blog/' + f + '/index.html');
}
for (const dir of ['ae', 'au', 'ca', 'in', 'uk', 'us']) {
  add('/' + dir + '/', dir + '/index.html');
  (function sub(relDir) {   // recurse: nested service pages like /ae/erp/construction/ were being missed
    for (const f of fs.readdirSync(path.join(L.REPO, relDir)).sort()) {
      const p = path.join(L.REPO, relDir, f);
      if (!fs.statSync(p).isDirectory()) continue;
      const child = relDir + '/' + f;
      if (fs.existsSync(path.join(p, 'index.html'))) add('/' + child + '/', child + '/index.html');
      sub(child);
    }
  })(dir);
}
add('/results/', 'results/index.html');
for (const f of fs.readdirSync(path.join(L.REPO, 'results')).sort()) { const p = path.join(L.REPO, 'results', f); if (fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'))) add('/results/' + f + '/', 'results/' + f + '/index.html'); }
add('/why-us/', 'why-us/index.html'); add('/privacy/', 'privacy/index.html'); add('/seo-audit-kochi/', 'seo-audit-kochi/index.html'); add('/terms/', 'terms/index.html');
urls.sort((a, b) => a.url.localeCompare(b.url));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>https://techauditpros.com${u.url}</loc><lastmod>${u.mod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(L.REPO, 'sitemap.xml'), xml);
console.log('sitemap:', urls.length, 'URLs');
