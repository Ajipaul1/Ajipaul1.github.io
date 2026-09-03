'use strict';
// Appends the new placements (US pages + new blog posts) to each image's **Used on:** line in
// assets/images/library/CATALOG.md. Idempotent per placement.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path'); const { execSync } = require('child_process');
const rel = 'assets/images/library/CATALOG.md';
let cat = L.read(rel);
// everything changed since the pre-session commit (the owner's GitHub Desktop auto-commits mid-session)
const BASE = '1b354d4';
const changed = [...new Set([
  ...execSync(`git diff --name-only ${BASE}`, { cwd: L.REPO }).toString().split('\n'),
  ...execSync('git ls-files --others --exclude-standard', { cwd: L.REPO }).toString().split('\n'),
].filter(Boolean).map(l => l.trim().replace(/\\/g, '/')))];
const pages = [];
for (const c of changed) {
  const full = path.join(L.REPO, c);
  if (c.endsWith('.html')) pages.push(c);
  else if (fs.existsSync(full) && fs.statSync(full).isDirectory()) { const walk = d => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) pages.push(path.relative(L.REPO, p).replace(/\\/g, '/')); } }; walk(full); }
}
const uses = {}; // image -> [labels]
for (const p of pages) {
  if (p === 'blog/index.html' || p.startsWith('ca/') || p === 'index.html') continue; // hub pools are noted globally; CA/home pages unchanged in imagery
  const s = fs.readFileSync(path.join(L.REPO, p), 'utf8');
  const label = p.endsWith('index.html') ? '/' + p.replace(/index\.html$/, '') : '/' + p;
  for (const m of new Set([...s.matchAll(/\/assets\/images\/library\/([^"']+)/g)].map(x => x[1]))) { (uses[m] = uses[m] || []).push(label); }
}
let touched = 0;
for (const [img, labels] of Object.entries(uses)) {
  const h = cat.indexOf('## ' + img); if (h === -1) { console.log('not in catalog:', img); continue; }
  const next = cat.indexOf('\n## ', h + 3); const end = next === -1 ? cat.length : next;
  let block = cat.slice(h, end);
  const m = block.match(/\*\*Used on:\*\* (.*)/); if (!m) { console.log('no Used-on line:', img); continue; }
  let current = m[1].trim().replace(/ \(added 2026-09-03\)/g, '');
  const add = labels.filter(l => !current.includes(l));
  if (!add.length) continue;
  const isNone = /\(none yet|\(none currently|\(do not use\)/.test(current);
  const addStr = add.join('; ');
  const updated = isNone ? `**Used on:** ${addStr} (added 2026-09-03)` : `**Used on:** ${current}; ${addStr} (added 2026-09-03)`;
  block = block.replace(m[0], updated);
  cat = cat.slice(0, h) + block + cat.slice(end);
  touched++;
}
fs.writeFileSync(path.join(L.REPO, rel), cat);
console.log('catalog: updated Used-on for', touched, 'images across', pages.length, 'pages');
