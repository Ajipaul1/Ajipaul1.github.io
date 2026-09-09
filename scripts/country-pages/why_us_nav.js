'use strict';
// Points the header's "Why Us" item at the real /why-us/ page instead of #compare.
// #compare is a homepage section that exists on only 5 of the pages carrying the link, so everywhere else the
// item scrolled nowhere. Idempotent: re-running finds nothing left to change. (2026-09-09)
//
// TWO LINK FORMS. The country/service pages use the bare anchor `href="#compare"`; the blog pages use the
// root-absolute `href="/#compare"`, which does work from a blog post (it lands on the homepage section) but is
// still worse than a dedicated page. The first version of this script only matched the bare form and its
// "nothing left" assertion only checked that form too, so 150 links across 75 blog files were silently missed
// and reported as done. Both forms are handled now, and the assertion checks both.
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
const PAIRS = [
  ['href="#compare">Why Us', 'href="/why-us/">Why Us'],
  ['href="/#compare">Why Us', 'href="/why-us/">Why Us'],
];
let pages = 0, links = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  let hits = 0;
  for (const [from, to] of PAIRS) { const n = L.count(s, from); if (n) { hits += n; s = s.split(from).join(to); } }
  if (s === before) continue;
  L.write(rel, s);
  pages++; links += hits;
}
// no "Why Us" link anywhere may still point at the old anchor, in either form
const left = [];
for (const p of walk(L.REPO, [])) {
  const s = fs.readFileSync(p, 'utf8');
  for (const [from] of PAIRS) if (L.count(s, from)) left.push(path.relative(L.REPO, p) + ' (' + from + ')');
}
if (left.length) throw new Error(left.length + ' "Why Us" links still point at #compare:\n  ' + left.slice(0, 10).join('\n  '));
console.log('Why Us -> /why-us/: ' + links + ' links on ' + pages + ' pages (0 left on the old anchor)');
