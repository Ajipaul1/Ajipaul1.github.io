'use strict';
// Site-wide wiring for /ae/: add the UAE item to the Service Areas dropdown and the footer Markets list on every page
// that carries the shared header (anchored after India). Idempotent.
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');
const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
let changed = 0, skipped = 0;
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes('href="/in/" class="nav-dropdown-item"') && !s.includes('href="/uk/" class="nav-dropdown-item"')) { skipped++; continue; }
  const before = s; s = L.addAeToNavAndFooter(s);
  if (s !== before) { L.write(rel, s); changed++; }
}
console.log('ae nav/footer: ' + changed + ' pages updated, ' + skipped + ' without the shared header');
