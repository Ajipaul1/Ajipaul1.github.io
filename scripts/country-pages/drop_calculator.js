'use strict';
// Remove the dead savings-calculator JavaScript (owner, 2026-09-03: "don't do the money thing").
//
// Found while building /uk/website-development/: the calculator's MARKUP exists on 0 pages - it was
// removed at some point - but its script survived on 16 pages including the homepage, and that script
// carries our entire rate card in plain source:
//   usa dev 1800 / seo 1200 / content 900 / social 900
//   canada 1490 / 990 / 790 / 790 · australia 1600 / 1100 / 890 / 890
//   uk 1200 / 790 / 590 / 590 · dubai 3800 / 2500 / 1900 / 1900
// So after taking every price out of the visible copy, the full price list was still one view-source
// away (and indexable). It is also dead code that would throw on the first getElementById if the widget
// ever came back. Both reasons say delete.
//
// Removes whole <script> elements whose contents reference the calculator, nothing else. Idempotent.
//   node scripts/country-pages/drop_calculator.js
const fs = require('fs'); const path = require('path');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';
const MARKS = /dev_tap|calc-country|calc-devs-rate|calc-seos-tap-rate|onCountryChange|updateCalculator/;

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', '.vercel', 'scripts'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) files.push(rel);
  }
})('');

let touched = 0, removed = 0;
for (const rel of files) {
  const p = path.join(REPO, rel);
  const src = fs.readFileSync(p, 'utf8');
  if (!MARKS.test(src)) continue;
  let out = '', i = 0, n = 0;
  while (true) {
    const a = src.indexOf('<script', i);
    if (a < 0) { out += src.slice(i); break; }
    const open = src.indexOf('>', a);
    const b = src.indexOf('</script>', open);
    if (open < 0 || b < 0) { out += src.slice(i); break; }
    const end = b + '</script>'.length;
    const block = src.slice(a, end);
    if (MARKS.test(src.slice(open, b))) {
      out += src.slice(i, a).replace(/[ \t]*$/, '');   // drop the block and its trailing indent
      n++;
    } else {
      out += src.slice(i, end);
    }
    i = end;
  }
  if (n) {
    fs.writeFileSync(p, out);
    touched++; removed += n;
    console.log('  removed ' + n + ' script block(s):', rel);
  }
}
console.log('calculator JS removed from ' + touched + ' files (' + removed + ' blocks)');

// verify
const left = files.filter(rel => MARKS.test(fs.readFileSync(path.join(REPO, rel), 'utf8')));
console.log('files still referencing the calculator:', left.length ? left : 'none');
const stray = files.filter(rel => /dev_tap|seo_tap|content_tap|social_tap/.test(fs.readFileSync(path.join(REPO, rel), 'utf8')));
console.log('files still carrying our rate table:', stray.length ? stray : 'none');
