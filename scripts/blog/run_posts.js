'use strict';
// usage: node run_posts.js posts_erp1.js [posts_seo1.js ...]
const { buildPost } = require('./make_post.js');
const fs = require('fs'); const path = require('path');
const MAN = path.join(__dirname, 'posts_manifest.json');
const manifest = fs.existsSync(MAN) ? JSON.parse(fs.readFileSync(MAN, 'utf8')) : {};
for (const f of process.argv.slice(2)) {
  const defs = require(path.resolve(__dirname, f));
  for (const d of defs) {
    const r = buildPost(d);
    manifest[r.url] = r;
    console.log(`  ${r.url}  ${r.words} words / ${r.mins} min`);
  }
}
fs.writeFileSync(MAN, JSON.stringify(manifest, null, 2));
console.log('manifest:', Object.keys(manifest).length, 'posts');
