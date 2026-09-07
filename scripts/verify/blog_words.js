// usage: node blog_words.js <slug> [...]  — India rules on the ARTICLE BODY only (hero→author row):
// "audit" as a service word, "offshore", and our own price strings must not appear. Prints word count.
const fs = require('fs'); let bad = 0;
for (const slug of process.argv.slice(2)) {
  const h = fs.readFileSync('blog/' + slug + '.html', 'utf8');
  const a = h.indexOf('<section class="article-hero">'), b = h.indexOf('<div class="article-author-row">');
  const body = h.slice(a, b).replace(/<[^>]+>/g, ' ').replace(/TechAuditPros/g, ' ');
  const words = body.split(/\s+/).filter(Boolean).length;
  const hits = [];
  if (/audit/i.test(body)) hits.push('audit');
  if (/offshore/i.test(body)) hits.push('offshore');
  if (/US\$1,800|CA\$1,490|one agreed monthly fee|AU\$1,600|AED ?3,800/.test(body)) hits.push('our-price');
  const links = (h.slice(a, b).match(/href="\/[^"]+"/g) || []).map(x => x.slice(6, -1)).filter(u => !u.startsWith('/blog/') && !fs.existsSync(u.replace(/^\//, '') + (u.endsWith('/') ? 'index.html' : '')));
  if (links.length) hits.push('broken-links: ' + links.join(' '));
  const imgs = (h.match(/\/assets\/images\/library\/[^" ]+\.jpg/g) || []).filter((v, i, arr) => arr.indexOf(v) === i).filter(p => !fs.existsSync(p.slice(1)));
  if (imgs.length) hits.push('missing-images: ' + imgs.length);
  console.log((hits.length ? 'FAIL ' : ' ok  ') + slug.padEnd(52) + String(words).padStart(5) + ' words' + (hits.length ? '   ' + hits.join(' | ') : ''));
  if (hits.length) bad++;
}
process.exit(bad ? 1 : 0);
