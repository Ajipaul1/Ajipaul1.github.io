'use strict';
// Round two of the link-preview work, after checking what a scraper actually extracts.
//
// FAULT 5: og:description was 240-323 characters on every main page. WhatsApp shows roughly the
//   first 65 and truncates hard; LinkedIn about 200. So a shared link read as a sentence cut off
//   mid-word. Descriptions are rewritten short, with the first clause standing alone as a complete
//   statement of what the page is -- because on WhatsApp that clause is all anyone sees.
//
// FAULT 6: every blog post's og:image pointed at its 2400px master, which runs from 200KB to over
//   1MB. That is the same fault that stopped the homepage preview appearing, repeated across 56
//   posts. Each now points at its own 1400px variant, with the real dimensions declared so a
//   scraper can reserve the right space.
//
//   usage: node scripts/images/fix_share_text.js [--dry]
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const LIB = path.join(REPO, 'assets', 'images', 'library');
const SIZES = JSON.parse(fs.readFileSync(path.join(LIB, '_sizes.json'), 'utf8'));
const CR = String.fromCharCode(13), LF = String.fromCharCode(10);
const DRY = process.argv.includes('--dry');

// Short descriptions. The first clause has to work alone, because that is the WhatsApp view.
// Kept under 160 characters so LinkedIn and Slack show the whole thing.
const DESCRIPTIONS = {
  'index.html': 'Technical SEO, websites and custom ERP from one team. Built in Kochi for businesses in the UK, the US and Canada. Audit first, no long-term contract.',
  'us/index.html': 'Custom ERP, websites and search for US businesses. One team, one monthly fee, audit first &mdash; and you own the code.',
  'uk/index.html': 'Custom ERP, websites and search for UK businesses. MTD-ready, hosted in the UK, audit first &mdash; and you own the code.',
  'ca/index.html': 'Custom ERP, websites and search for Canadian businesses. GST/HST-ready, data in Canada, audit first &mdash; and you own the code.',
  'uk/erp/index.html': 'Custom ERP built around how your business actually runs &mdash; stock, orders, production and costing, integrated with Xero or Sage. MTD-ready.',
  'uk/website-development/index.html': 'Fast, accessible websites for UK businesses, written in code and handed over in your own repository. Core Web Vitals tested on real devices.',
  'uk/seo-services/index.html': 'Technical SEO, AEO and GEO for UK businesses. Audit first, a written report every month, and the keywords that went down shown too.',
  'uk/manchester/index.html': 'ERP, websites and search for Greater Manchester businesses &mdash; textiles, food, fabrication and distribution round the M60.',
  'uk/reading/index.html': 'ERP, websites and search for Reading and the Thames Valley, built for technical buyers who read your source before the first call.',
  'uk/london/index.html': 'ERP, websites and search for London businesses, from the City to Park Royal. Multi-site and multi-currency, hosted in AWS London.',
  'uk/scotland/index.html': 'ERP, websites and search for Aberdeen and Edinburgh &mdash; field-first energy services and office-first financial services, one page for both.',
  'blog/index.html': 'Plain-English guides on custom ERP, web development and search &mdash; written by the people who do the work, with real figures and honest caveats.',
};

function set(s, key, value, isName) {
  const attr = isName ? 'name' : 'property';
  const re = new RegExp('(<meta ' + attr + '="' + key + '" content=")([^"]*)(")');
  if (re.test(s)) return s.replace(re, '$1' + value + '$3');
  return s;
}

let descFixed = 0, imgFixed = 0, dimAdded = 0, touched = 0;
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) files.push(rel);
  }
})('');

for (const rel of files) {
  const p = path.join(REPO, rel);
  let raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf(CR + LF) >= 0;
  let s = crlf ? raw.split(CR + LF).join(LF) : raw;
  const before = s;

  // ---- 5. short descriptions on the pages we have written one for --------------------------
  if (DESCRIPTIONS[rel]) {
    const d = DESCRIPTIONS[rel];
    s = set(s, 'og:description', d, false);
    s = set(s, 'twitter:description', d, true);
    descFixed++;
  }

  // ---- 6. blog posts share their own lead image, at the 1400px variant ---------------------
  const og = /<meta property="og:image" content="https:\/\/techauditpros\.com\/assets\/images\/library\/([^"]+)"/.exec(s);
  if (og) {
    const file = og[1];
    const base = file.replace(/-(700|1400)\.jpg$/, '').replace(/\.(jpg|jpeg|png|webp)$/, '');
    const mid = SIZES[base + '-1400.jpg'];
    const small = SIZES[base + '-700.jpg'];
    // prefer 1400 when it exists and is a sane weight for a scraper; fall back to 700
    const pick = (mid && mid.kb <= 300) ? { f: base + '-1400.jpg', m: mid }
      : (small ? { f: base + '-700.jpg', m: small } : null);
    if (pick && pick.f !== file) {
      const url = 'https://techauditpros.com/assets/images/library/' + pick.f;
      s = s.replace(/(<meta property="og:image" content=")[^"]*(")/, '$1' + url + '$2');
      s = s.replace(/(<meta name="twitter:image" content=")[^"]*(")/, '$1' + url + '$2');
      imgFixed++;
      // and declare its real size, adding the tags if the page never had them
      if (/property="og:image:width"/.test(s)) {
        s = s.replace(/<meta property="og:image:width" content="[^"]*"/, '<meta property="og:image:width" content="' + pick.m.w + '"');
        s = s.replace(/<meta property="og:image:height" content="[^"]*"/, '<meta property="og:image:height" content="' + pick.m.h + '"');
      } else {
        const anchor = s.match(/^[ \t]*<meta property="og:image" content="[^"]*"[^>]*>[ \t]*\r?\n/m);
        if (anchor) {
          s = s.replace(anchor[0], anchor[0]
            + '<meta property="og:image:width" content="' + pick.m.w + '" />\n'
            + '<meta property="og:image:height" content="' + pick.m.h + '" />\n');
          dimAdded++;
        }
      }
    }
  }

  if (s !== before) { if (!DRY) fs.writeFileSync(p, crlf ? s.split(LF).join(CR + LF) : s); touched++; }
}
console.log((DRY ? 'would fix' : 'fixed') + ': ' + descFixed + ' descriptions shortened, ' + imgFixed
  + ' share images repointed to the 1400px variant, ' + dimAdded + ' pages gained image dimensions, '
  + touched + ' files written');
