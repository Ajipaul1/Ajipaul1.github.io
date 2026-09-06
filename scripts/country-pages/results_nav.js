'use strict';
// Points the "Results" item in every header nav and mobile drawer at the Results hub (/results/) instead
// of the homepage anchor, and adds "Results & Case Studies" to the footer Company column. Idempotent:
// safe to run after every generator. Exports apply(html) for generators; run directly to patch the site.
//   node scripts/country-pages/results_nav.js
const fs = require('fs'); const path = require('path');
const L = require('./lib');

const FOOTER_ITEM = '<p><a href="/results/" class="footer-link">Results &amp; Case Studies</a></p>';

function apply(s) {
  // header nav + drawer: <a href="#results">Results</a> on the homepage, <a href="/#results">Results</a> elsewhere
  s = s.replace(/<a href="\/?#results">Results<\/a>/g, '<a href="/results/">Results</a>');
  // footer: first item of the Company column (insert once, keep indentation of the heading line)
  if (!s.includes('href="/results/" class="footer-link"')) {
    const m = s.match(/^([ \t]*)<h3>Company<\/h3>\r?\n/m);
    if (m) s = s.replace(m[0], m[0] + m[1] + FOOTER_ITEM + (m[0].endsWith('\r\n') ? '\r\n' : '\n'));
  }
  return s;
}

function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (['.git', 'archive', 'scratch', 'node_modules', 'supabase', 'api'].includes(f)) continue;
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

if (require.main === module) {
  let changed = 0, navHits = 0, footHits = 0;
  for (const p of walk(L.REPO, [])) {
    const before = fs.readFileSync(p, 'utf8');
    const after = apply(before);
    if (after !== before) {
      navHits += L.count(before, 'Results</a>') - L.count(after, '#results">Results</a>') - (L.count(before, 'Results</a>') - L.count(before, '#results">Results</a>'));
      footHits += L.count(after, FOOTER_ITEM) - L.count(before, FOOTER_ITEM);
      fs.writeFileSync(p, after); changed++;
    }
  }
  const left = walk(L.REPO, []).filter(p => /href="\/?#results">Results<\/a>/.test(fs.readFileSync(p, 'utf8')));
  console.log(`results_nav: ${changed} files changed, ${navHits} nav links repointed, ${footHits} footer items added, ${left.length} pages still carry #results nav links`);
  if (left.length) console.log(left.slice(0, 10).join('\n'));
}

module.exports = { apply };
