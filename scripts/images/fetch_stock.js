'use strict';
// Downloads large, licence-clean stock photography into assets/images/library/ and records the real
// pixel dimensions so page templates can emit correct width/height (no CLS).
//
// WHY UNSPLASH AND NOT GOOGLE IMAGES: Google Images is an index of other people's photographs -- most
// of the good business results are Getty, iStock or Adobe Stock, who watermark-scan the web and invoice
// UK businesses that use their files. Unsplash photos are released under a licence that explicitly
// permits commercial use with no attribution required, so they are safe to host on a client-facing
// site. We still write the photographer into CREDITS.md because it costs nothing and it is decent.
//
//   usage: node scripts/images/fetch_stock.js manifest_uk.js          # download everything missing
//          node scripts/images/fetch_stock.js manifest_uk.js --force  # re-download even if present
//          node scripts/images/fetch_stock.js --sizes                 # just reprint the size index
//
// A manifest is a module exporting [{ id, slug, alt }] where `id` is the 11-character Unsplash photo
// id and `slug` is the SEO filename we save it under (no extension).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const https = require('https');

const REPO = path.resolve(__dirname, '..', '..');
const LIB = path.join(REPO, 'assets', 'images', 'library');
const SIZES = path.join(LIB, '_sizes.json');
const CREDITS = path.join(LIB, 'CREDITS.md');
const WIDE = 2400;          // hero / full-bleed master
const MID = 1400;           // in-article figure
const MAGICK = 'C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

function get(url, hops) {
  if ((hops || 0) > 6) return Promise.reject(new Error('too many redirects'));
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA, Accept: 'image/jpeg,image/*,*/*' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(res.headers.location, (hops || 0) + 1).then(r => ({ ...r, via: r.via || res.headers.location })));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode + ' for ' + url)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ buf: Buffer.concat(chunks), via: url }));
    }).on('error', reject);
  });
}

// the redirect URL carries "dl=firstname-lastname-<id>-unsplash.jpg" -- the photographer, for CREDITS.md
function photographer(via, id) {
  const m = /[?&]dl=([^&]+)/.exec(via || '');
  if (!m) return null;
  const name = decodeURIComponent(m[1]).replace(new RegExp('-' + id + '-unsplash\\.jpg$'), '');
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || null;
}

function identify(file) {
  const out = execFileSync(MAGICK, ['identify', '-format', '%w %h', file], { encoding: 'utf8' }).trim().split(' ');
  return { w: +out[0], h: +out[1] };
}

// strip EXIF (privacy + bytes), cap the long edge, re-encode progressive at a quality that survives
// a hero crop. Two files per photo: the 2400 master and a 1400 for in-article figures.
function optimise(src, slug) {
  const outs = [];
  for (const [w, name] of [[WIDE, slug + '.jpg'], [MID, slug + '-1400.jpg']]) {
    const dest = path.join(LIB, name);
    execFileSync(MAGICK, [src, '-auto-orient', '-strip', '-resize', w + 'x>', '-quality', '82',
      '-interlace', 'Plane', '-sampling-factor', '4:2:0', '-colorspace', 'sRGB', dest]);
    const d = identify(dest);
    outs.push({ file: name, w: d.w, h: d.h, kb: Math.round(fs.statSync(dest).size / 1024) });
  }
  return outs;
}

(async () => {
  fs.mkdirSync(LIB, { recursive: true });
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const sizes = fs.existsSync(SIZES) ? JSON.parse(fs.readFileSync(SIZES, 'utf8')) : {};

  if (args.includes('--sizes')) {
    Object.keys(sizes).sort().forEach(k => console.log(k.padEnd(52) + sizes[k].w + 'x' + sizes[k].h));
    return;
  }
  const mf = args.find(a => !a.startsWith('--'));
  if (!mf) throw new Error('usage: node fetch_stock.js <manifest.js> [--force]');
  const list = require(path.resolve(__dirname, mf));

  const credits = [];
  let got = 0, skipped = 0, failed = 0;
  for (const item of list) {
    if (!/^[A-Za-z0-9_-]{6,20}$/.test(item.id)) throw new Error('bad photo id: ' + item.id);
    if (!/^[a-z0-9-]{4,70}$/.test(item.slug)) throw new Error('bad slug: ' + item.slug);
    const final = path.join(LIB, item.slug + '.jpg');
    if (fs.existsSync(final) && !force) { skipped++; continue; }
    const url = 'https://unsplash.com/photos/' + item.id + '/download?force=true&w=' + WIDE;
    try {
      const { buf, via } = await get(url);
      if (buf.length < 20000) throw new Error('suspiciously small response (' + buf.length + ' bytes)');
      const tmp = path.join(LIB, '.tmp-' + item.slug);
      fs.writeFileSync(tmp, buf);
      const outs = optimise(tmp, item.slug);
      fs.unlinkSync(tmp);
      outs.forEach(o => { sizes[o.file] = { w: o.w, h: o.h, kb: o.kb, id: item.id, alt: item.alt }; });
      const who = photographer(via, item.id);
      credits.push('- `' + item.slug + '.jpg` &mdash; ' + (who || 'Unsplash contributor') + ' on Unsplash ([photo](https://unsplash.com/photos/' + item.id + '))');
      console.log('  ok   ' + item.slug.padEnd(46) + outs.map(o => o.w + 'x' + o.h + ' ' + o.kb + 'kB').join('  |  '));
      got++;
    } catch (e) {
      console.log('  FAIL ' + item.slug.padEnd(46) + e.message);
      failed++;
    }
  }
  fs.writeFileSync(SIZES, JSON.stringify(sizes, null, 1));
  if (credits.length) {
    const head = fs.existsSync(CREDITS) ? fs.readFileSync(CREDITS, 'utf8')
      : '# Image credits\n\nPhotos from Unsplash, used under the Unsplash Licence (commercial use permitted,\nattribution not required). Credited here anyway.\n';
    fs.writeFileSync(CREDITS, head.replace(/\s*$/, '') + '\n' + credits.join('\n') + '\n');
  }
  console.log('\ndownloaded ' + got + ', already present ' + skipped + ', failed ' + failed);
  if (failed) process.exitCode = 1;
})();
