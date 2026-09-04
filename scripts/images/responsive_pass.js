'use strict';
// Make every library image on the site responsive and dimensioned.
//
// WHY. The homepage was loading 1,161kB of images before the visitor scrolled a pixel, and none of
// it was the new picture layer -- it was four older service-card images served as full-size masters
// with no srcset and, for three of them, no width or height at all. One was 446kB for a card a few
// hundred pixels wide. The same pattern exists on the /us/, /ca/ and blog pages.
//
// WHAT IT DOES.
//   1. Generates the missing 1400px and 700px variants for every image in assets/images/library
//      that has only a master, and records their real dimensions in _sizes.json.
//   2. Walks every .html file and, for each <img> pointing at the library that has no srcset,
//      adds width, height, a 700/1400/master srcset and a sizes hint, plus decoding="async".
//
// It never touches an <img> that already has a srcset (those come from the picture layers, which set
// their own sizes deliberately), and it never changes src, alt, class or loading.
//
//   usage: node scripts/images/responsive_pass.js            # generate + rewrite
//          node scripts/images/responsive_pass.js --dry      # report only
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');
const LIB = path.join(REPO, 'assets', 'images', 'library');
const SIZES_PATH = path.join(LIB, '_sizes.json');
const MAGICK = 'C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe';
const CR = String.fromCharCode(13), LF = String.fromCharCode(10);
const DRY = process.argv.includes('--dry');

// The default sizes hint. Most library images on these pages sit in a card or an article column, so
// a full-width guess would send phones a file three times bigger than they need.
const DEFAULT_SIZES = '(max-width:700px) 100vw, 760px';

let sizes = fs.existsSync(SIZES_PATH) ? JSON.parse(fs.readFileSync(SIZES_PATH, 'utf8')) : {};

function identify(file) {
  const out = execFileSync(MAGICK, ['identify', '-format', '%w %h', file], { encoding: 'utf8' }).trim().split(' ');
  return { w: +out[0], h: +out[1] };
}

// ---- 1. fill in the missing variants -------------------------------------------------------
const masters = fs.readdirSync(LIB).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && !/-(700|1400)\.jpg$/.test(f));
let made = 0, madeKb = 0;
for (const file of masters) {
  const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  if (!sizes[file]) {
    try { const d = identify(path.join(LIB, file)); sizes[file] = { w: d.w, h: d.h, kb: Math.round(fs.statSync(path.join(LIB, file)).size / 1024) }; }
    catch (e) { console.log('  cannot read ' + file + ' -- ' + e.message); continue; }
  }
  const master = sizes[file];
  for (const width of [1400, 700]) {
    const name = base + '-' + width + '.jpg';
    if (sizes[name] && fs.existsSync(path.join(LIB, name))) continue;
    if (master.w <= width) continue;             // no point upscaling
    if (DRY) { console.log('  would generate ' + name); made++; continue; }
    const dest = path.join(LIB, name);
    execFileSync(MAGICK, [path.join(LIB, file), '-auto-orient', '-strip', '-resize', width + 'x>',
      '-quality', width === 700 ? '80' : '82', '-interlace', 'Plane', '-sampling-factor', '4:2:0',
      '-colorspace', 'sRGB', dest]);
    const d = identify(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    sizes[name] = { w: d.w, h: d.h, kb };
    made++; madeKb += kb;
  }
}
if (!DRY) fs.writeFileSync(SIZES_PATH, JSON.stringify(sizes, null, 1));
console.log((DRY ? 'would generate ' : 'generated ') + made + ' variants' + (madeKb ? ' (' + madeKb + 'kB)' : ''));

// ---- 2. rewrite the plain <img> tags -------------------------------------------------------
function srcsetFor(file) {
  const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const master = sizes[file];
  if (!master) return null;
  const cand = [['-700.jpg', sizes[base + '-700.jpg']], ['-1400.jpg', sizes[base + '-1400.jpg']], [file.slice(base.length), master]]
    .filter(([, m]) => m)
    .map(([suf, m]) => '/assets/images/library/' + base + suf + ' ' + m.w + 'w');
  return { cand, master };
}

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) files.push(rel);
  }
})('');

let touchedFiles = 0, touchedImgs = 0, addedWh = 0, skippedUnknown = 0;
for (const rel of files) {
  const p = path.join(REPO, rel);
  let raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf(CR + LF) >= 0;
  let s = crlf ? raw.split(CR + LF).join(LF) : raw;
  let n = 0;

  s = s.replace(/<img\b[^>]*>/g, tag => {
    if (tag.includes('srcset')) return tag;                        // a picture layer owns this one
    const m = /src="\/assets\/images\/library\/([^"]+)"/.exec(tag);
    if (!m) return tag;
    const info = srcsetFor(m[1]);
    if (!info) { skippedUnknown++; return tag; }
    let out = tag;
    if (info.cand.length > 1) out = out.replace(/(\s*\/?>)$/, ' srcset="' + info.cand.join(', ') + '" sizes="' + DEFAULT_SIZES + '"$1');
    if (!/\bwidth=/.test(out)) { out = out.replace(/(\s*\/?>)$/, ' width="' + info.master.w + '" height="' + info.master.h + '"$1'); addedWh++; }
    if (!/decoding=/.test(out)) out = out.replace(/(\s*\/?>)$/, ' decoding="async"$1');
    if (out !== tag) n++;
    return out;
  });

  if (n && !DRY) { fs.writeFileSync(p, crlf ? s.split(LF).join(CR + LF) : s); }
  if (n) { touchedFiles++; touchedImgs += n; }
}
console.log((DRY ? 'would rewrite ' : 'rewrote ') + touchedImgs + ' <img> tags across ' + touchedFiles + ' pages ('
  + addedWh + ' gained width/height)');
if (skippedUnknown) console.log(skippedUnknown + ' library images have no entry in _sizes.json and were left alone');
