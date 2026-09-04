'use strict';
// Fixes the link-preview tags site-wide, which is why sharing a page on WhatsApp produced a bare
// link with no picture.
//
// FOUR FAULTS FOUND:
//   1. DUPLICATE TAG BLOCKS. index.html, /us/, /uk/ and /ca/ each carried two complete sets of
//      og: and twitter: tags. Scrapers differ on which they take, and duplicated og:image is a
//      documented cause of WhatsApp showing no preview at all.
//   2. THE IMAGE WAS TOO BIG. 724KB. WhatsApp's fetcher gives up on large files silently. The
//      replacement card is 64KB (see make_share_card.js).
//   3. DECLARED SIZE DID NOT MATCH THE FILE. Tags said 1200x630, the file was 1376x768.
//   4. MISSING FIELDS. No og:image:alt, no og:image:type, no og:locale. Alt text in particular is
//      what a screen reader announces for a shared link, and some scrapers use it as a fallback.
//
// It also normalises og:image to the absolute HTTPS URL, because relative og:image values are not
// resolved by most scrapers.
//
//   usage: node scripts/images/fix_share_tags.js
//          node scripts/images/fix_share_tags.js --dry
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const CR = String.fromCharCode(13), LF = String.fromCharCode(10);
const DRY = process.argv.includes('--dry');
const IMG = 'https://techauditpros.com/assets/images/og-share-cover.jpg';
const IMG_ALT = 'TechAuditPros — technical SEO, websites and custom ERP, built in Kochi for clients in the UK, US and Canada';

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) files.push(rel);
  }
})('');

let dedup = 0, added = 0, fixedImg = 0, touched = 0;
for (const rel of files) {
  const p = path.join(REPO, rel);
  let raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf(CR + LF) >= 0;
  let s = crlf ? raw.split(CR + LF).join(LF) : raw;
  const before = s;

  // ---- 1. de-duplicate. Keep the first occurrence of each property, drop later ones. -------
  const seen = new Set();
  s = s.replace(/^[ \t]*<meta (?:property|name)="((?:og|twitter):[a-z:_]+)"[^>]*>[ \t]*\r?\n/gmi, (line, key) => {
    const k = key.toLowerCase();
    if (seen.has(k)) { dedup++; return ''; }
    seen.add(k);
    return line;
  });

  // ---- 2. the image URL, absolute, and the declared size matching the real file ------------
  s = s.replace(/(<meta property="og:image" content=")([^"]*)(")/g, (m, a, url, c) => {
    if (url === IMG) return m;
    fixedImg++; return a + IMG + c;
  });
  s = s.replace(/(<meta name="twitter:image" content=")([^"]*)(")/g, (m, a, url, c) => {
    if (url === IMG) return m;
    return a + IMG + c;
  });
  s = s.replace(/<meta property="og:image:width" content="[^"]*"/g, '<meta property="og:image:width" content="1200"');
  s = s.replace(/<meta property="og:image:height" content="[^"]*"/g, '<meta property="og:image:height" content="630"');

  // ---- 3. add the missing fields, once, after og:image:height (or after og:image) ----------
  const wants = [
    ['og:image:type', '<meta property="og:image:type" content="image/jpeg" />'],
    ['og:image:alt', '<meta property="og:image:alt" content="' + IMG_ALT + '" />'],
    ['og:locale', '<meta property="og:locale" content="en_GB" />'],
    ['twitter:image:alt', '<meta name="twitter:image:alt" content="' + IMG_ALT + '" />'],
  ];
  for (const [key, tag] of wants) {
    if (new RegExp('(?:property|name)="' + key + '"').test(s)) continue;
    const anchor = s.match(/^[ \t]*<meta property="og:image:height"[^>]*>[ \t]*\r?\n/m)
      || s.match(/^[ \t]*<meta property="og:image"[^>]*>[ \t]*\r?\n/m);
    if (!anchor) break;                                   // page has no og:image at all; leave it
    s = s.replace(anchor[0], anchor[0] + tag + '\n');
    added++;
  }

  if (s !== before) {
    if (!DRY) fs.writeFileSync(p, crlf ? s.split(LF).join(CR + LF) : s);
    touched++;
  }
}
console.log((DRY ? 'would fix' : 'fixed') + ': ' + dedup + ' duplicate tags removed, ' + added
  + ' missing tags added, ' + fixedImg + ' og:image URLs normalised, across ' + touched + ' pages');
