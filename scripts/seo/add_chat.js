// Puts the TAP Assistant script tag on every served page (idempotent). A post-pass: run it again after any generator
// that rewrites pages.   node scripts/seo/add_chat.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const TAG = '<script src="/assets/js/tap-chat.js?v=1" defer></script>';
const NOT_SERVED = /^(archive|scripts|ai_context|scratch|supabase)\//;
const pages = execSync('git ls-files "*.html"', { cwd: ROOT, encoding: 'utf8' }).split(/\r?\n/).filter((f) => f && !NOT_SERVED.test(f));

let added = 0, already = 0, noBody = 0;
for (const f of pages) {
  const file = path.join(ROOT, f);
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('/assets/js/tap-chat.js')) { already++; continue; }
  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  const line = TAG + eol;
  let at = html.lastIndexOf('</body>');
  if (at < 0) at = html.lastIndexOf('</html>');
  if (at < 0) { noBody++; fs.writeFileSync(file, html.replace(/\s*$/, '') + eol + line); added++; continue; }
  fs.writeFileSync(file, html.slice(0, at) + line + html.slice(at));
  added++;
}
console.log(`pages ${pages.length} · added ${added} · already there ${already} · pages with no end tag ${noBody}`);
