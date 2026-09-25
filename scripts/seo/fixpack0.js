// fixpack0.js — site-wide crawl fixes (2026-09-25 audit). Idempotent.
// 1. vercel.json: every old URL redirects in ONE hop to the closest live page. The old `/x/:path*` rules did not
//    match the trailing-slash form (/seo-company/mumbai/ returned 404 — 9,063 Search Console impressions), and 13
//    old URLs went to the homepage, which Google treats as a soft 404. Each base now gets /x, /x/ and /x/(.*).
// 2. Internal links that pointed at a redirected URL now point at its destination (no hop for Googlebot).
// 3. Organization sameAs: linkedin.com/company/techauditpros redirects to another company ("Chiaro");
//    ours is /company/techauditpro.
// Usage: node scripts/seo/fixpack0.js
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const ROOT = path.resolve(__dirname, '../..');
const vpath = path.join(ROOT, 'vercel.json');
const v = JSON.parse(fs.readFileSync(vpath, 'utf8'));

// Better destinations now that matching pages exist. Key = old base path (no trailing slash).
const RETARGET = {
  '/about.html': '/why-us/',
  '/case-studies.html': '/results/',
  '/viraatmarine': '/results/viraat-marine-erp/',
  '/seo-company/mumbai': '/in/mumbai/',
  '/seo-company/bangalore': '/in/',
  '/seo-company/london-uk': '/uk/london/',
  '/seo-company': '/in/',
  '/seo-company-edinburgh': '/uk/scotland/',
  '/white-label-seo-agency-uk': '/uk/seo-services/',
  '/white-label-seo-agency-australia': '/au/',
  '/seo-audit-australia': '/au/',
  '/dedicated-offshore-developers-canada': '/ca/',
  '/seo-outsourcing-services-dubai': '/ae/dubai/',
  '/seo-agency-vadodara': '/in/vadodara/',
  '/seo-company-calicut': '/in/calicut/',
  '/seo-agency-kerala': '/in/kerala/',
  '/seo-consultant-kerala': '/in/kerala/',
  '/seo-training-kerala': '/in/kerala/',
  '/seo-company-india': '/in/',
  '/seo-agency-india': '/in/',
  '/seo-expert-india': '/in/',
  '/outsource-seo-services-to-india': '/in/',
  '/seo-company-chennai': '/in/',
  '/seo-company-delhi': '/in/',
  '/seo-company-pune': '/in/',
  '/digital-marketing-courses': '/blog/what-is-digital-marketing/',
  '/digital-marketing-faq': '/blog/what-is-digital-marketing/',
  '/digital-marketing-for-ecommerce': '/blog/what-is-digital-marketing/',
  '/digital-marketing-for-healthcare': '/blog/what-is-digital-marketing/',
  '/digital-marketing-resources': '/blog/what-is-digital-marketing/',
  '/digital-marketing-services': '/blog/what-is-digital-marketing/',
  '/digital-marketing-strategy': '/blog/what-is-digital-marketing/',
};
const baseOf = s => s.replace(/\/\(\.\*\)$/, '').replace(/\/:path\*$/, '').replace(/\/$/, '') || '/';
const dest = {};
for (const r of v.redirects) { const b = baseOf(r.source); if (b !== '/index.html' && b !== '/us/index.html') dest[b] = r.destination; }
Object.assign(dest, RETARGET);
const exists = p => { const f = path.join(ROOT, p); return p.endsWith('/') ? fs.existsSync(path.join(f, 'index.html')) : fs.existsSync(f); };
for (const [b, d] of Object.entries(dest)) if (!exists(d)) throw new Error(`destination missing on disk: ${b} -> ${d}`);
const bases = Object.keys(dest).sort((a, b) => b.length - a.length || a.localeCompare(b)); // specific first
const redirects = [
  { source: '/index.html', destination: '/', permanent: true },
  { source: '/us/index.html', destination: '/us/', permanent: true },
];
for (const b of bases) {
  redirects.push({ source: b, destination: dest[b], permanent: true });
  if (!b.endsWith('.html')) {
    redirects.push({ source: b + '/', destination: dest[b], permanent: true });
    redirects.push({ source: b + '/(.*)', destination: dest[b], permanent: true });
  }
}
v.redirects = redirects;
fs.writeFileSync(vpath, JSON.stringify(v, null, 2) + '\n');

// resolve an internal path through the new rules (first match wins, like Vercel)
function resolve(p) {
  for (const r of redirects) {
    const src = r.source;
    if (src.endsWith('/(.*)') ? p.startsWith(src.slice(0, -4)) : p === src) return r.destination;
  }
  return null;
}
const pages = execSync('git ls-files "*.html" "scripts/*.js" "scripts/**/*.js"', { cwd: ROOT }).toString().trim().split('\n')
  .filter(f => !/^(archive|scratch|ai_context)\//.test(f) && !/scripts\/seo\/fixpack0\.js$/.test(f));
let links = 0, same = 0, files = 0;
for (const f of pages) {
  const p = path.join(ROOT, f); let s = fs.readFileSync(p, 'utf8'); const before = s;
  if (f.endsWith('.html')) s = s.replace(/href="(\/[^"#?]*)([#?][^"]*)?"/g, (m, u, tail) => {
    const d = resolve(u); if (!d) return m; links++; return `href="${d}"`;
  });
  s = s.replace(/https:\/\/www\.linkedin\.com\/company\/techauditpros\//g, () => { same++; return 'https://www.linkedin.com/company/techauditpro/'; });
  if (s !== before) { files++; fs.writeFileSync(p, s); }
}
console.log('redirect rules', redirects.length, '| internal links re-pointed', links, '| LinkedIn sameAs fixed', same, '| files', files);
