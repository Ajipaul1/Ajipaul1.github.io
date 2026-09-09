'use strict';
// Points the header's "Why Us" item at the real /why-us/ page instead of #compare.
// #compare is a homepage section that exists on only 5 of the 38 pages carrying the link, so on the other 33 the
// item scrolled nowhere. Every occurrence site-wide is `href="#compare">Why Us` (desktop + mobile nav), verified
// before running. Idempotent: re-running finds nothing left to change. (2026-09-09)
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');
const SKIP = ['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'];
const walk = (d, out) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};
const FROM = 'href="#compare">Why Us';
const TO = 'href="/why-us/">Why Us';
let pages = 0, links = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  const s = fs.readFileSync(p, 'utf8');
  const n = L.count(s, FROM);
  if (!n) continue;
  L.write(rel, s.split(FROM).join(TO));
  pages++; links += n;
}
// nothing may still point at the old anchor
let left = 0;
for (const p of walk(L.REPO, [])) left += L.count(fs.readFileSync(p, 'utf8'), FROM);
if (left) throw new Error(left + ' "Why Us" links still point at #compare');
console.log('Why Us -> /why-us/: ' + links + ' links on ' + pages + ' pages');
