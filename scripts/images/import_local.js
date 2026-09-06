'use strict';
// Imports LOCAL image files (screenshots, the owner's own photographs) into assets/images/library/ through
// the same pipeline fetch_stock.js uses for Unsplash: three tiers (2400 / 1400 / 700 long edge, never
// upscaled), EXIF dropped, real pixel dimensions recorded in _sizes.json so templates emit width/height.
//
//   usage: node scripts/images/import_local.js <manifest.js>
//   manifest: module.exports = [{ src: 'C:/path/shot.png', slug: 'vm-shot-director', alt: '...' , credit: 'Screenshot of ...' }]
//
// Uses ImageMagick when installed, else scripts/images/resize.ps1 (System.Drawing) -- same as fetch_stock.js.
const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const REPO = path.resolve(__dirname, '..', '..');
const LIB = path.join(REPO, 'assets', 'images', 'library');
const SIZES = path.join(LIB, '_sizes.json');
const CREDITS = path.join(LIB, 'CREDITS.md');
const MAGICK = 'C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe';

function optimise(src, slug) {
  if (!fs.existsSync(MAGICK)) {
    const out = execFileSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(__dirname, 'resize.ps1'), src, LIB, slug], { encoding: 'utf8' });
    return out.trim().split(/\r?\n/).filter(Boolean).map(l => { const [file, w, h, kb] = l.trim().split(/\s+/); return { file, w: +w, h: +h, kb: +kb }; });
  }
  const outs = [];
  for (const [w, name] of [[2400, slug + '.jpg'], [1400, slug + '-1400.jpg'], [700, slug + '-700.jpg']]) {
    const dest = path.join(LIB, name);
    execFileSync(MAGICK, [src, '-auto-orient', '-strip', '-resize', w + 'x>', '-quality', '82', '-interlace', 'Plane', '-sampling-factor', '4:2:0', '-colorspace', 'sRGB', dest]);
    const d = execFileSync(MAGICK, ['identify', '-format', '%w %h', dest], { encoding: 'utf8' }).trim().split(' ');
    outs.push({ file: name, w: +d[0], h: +d[1], kb: Math.round(fs.statSync(dest).size / 1024) });
  }
  return outs;
}

const mf = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!mf) throw new Error('usage: node import_local.js <manifest.js>');
const list = require(path.resolve(__dirname, mf));
const sizes = fs.existsSync(SIZES) ? JSON.parse(fs.readFileSync(SIZES, 'utf8')) : {};
const credits = []; let done = 0, failed = 0;
for (const item of list) {
  if (!/^[a-z0-9-]{4,70}$/.test(item.slug)) throw new Error('bad slug: ' + item.slug);
  if (!fs.existsSync(item.src)) { console.log('  MISSING ' + item.src); failed++; continue; }
  try {
    const outs = optimise(item.src, item.slug);
    outs.forEach(o => { sizes[o.file] = { w: o.w, h: o.h, kb: o.kb, id: 'local', alt: item.alt }; });
    if (item.credit) credits.push('- `' + item.slug + '.jpg` &mdash; ' + item.credit);
    console.log('  ok   ' + item.slug.padEnd(46) + outs.map(o => o.w + 'x' + o.h + ' ' + o.kb + 'kB').join('  |  '));
    done++;
  } catch (e) { console.log('  FAIL ' + item.slug.padEnd(46) + e.message.slice(0, 200)); failed++; }
}
fs.writeFileSync(SIZES, JSON.stringify(sizes, null, 1));
if (credits.length) fs.writeFileSync(CREDITS, fs.readFileSync(CREDITS, 'utf8').replace(/\s*$/, '') + '\n' + credits.join('\n') + '\n');
console.log('\nimported ' + done + ', failed ' + failed);
if (failed) process.exitCode = 1;
