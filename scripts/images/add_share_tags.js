'use strict';
// FAULT 7, and the one the owner actually reported: 28 pages had no og: or twitter: tags at all,
// 24 of them blog posts. Those share as a bare URL with no picture and no description in WhatsApp,
// Slack, LinkedIn or iMessage -- which is exactly what he saw.
//
// This gives every one of them a complete set, derived from the page's own content rather than
// invented: the <title> for og:title, the existing meta description (shortened to 165 characters at
// a word boundary) for og:description, the file path for og:url, and the page's own lead photograph
// for og:image where it has one -- falling back to the brand card where it does not.
//
// FAULT 8, cleaned up at the same time: seven US and Canadian service pages still carried
// descriptions of 204-291 characters.
//
//   usage: node scripts/images/add_share_tags.js [--dry]
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8'));
const CR = String.fromCharCode(13), LF = String.fromCharCode(10);
const DRY = process.argv.includes('--dry');
const SITE = 'https://techauditpros.com';
const CARD = SITE + '/assets/images/og-share-cover.jpg';
const CARD_ALT = 'TechAuditPros &mdash; technical SEO, websites and custom ERP, built in Kochi for clients in the UK, US and Canada';
const MAX_DESC = 165;
const MAX_KB = 300;

// short descriptions for the pages whose own meta description is too long to shorten sensibly
const OVERRIDES = {
  'us/erp/index.html': 'Custom ERP for US businesses &mdash; stock, orders, production and costing in one system, integrated with the accounting package you already use.',
  'us/seo-services/index.html': 'Technical SEO, AEO and GEO for US businesses. Audit first, a written report every month, and the keywords that went down shown too.',
  'us/website-development/index.html': 'Fast, accessible websites for US businesses, written in code and handed over in your own repository and hosting account.',
  'ca/erp/index.html': 'Custom ERP for Canadian businesses &mdash; stock, orders, production and costing in one system, with GST/HST handled and data kept in Canada.',
  'ca/seo-services/index.html': 'Technical SEO, AEO and GEO for Canadian businesses. Audit first, a written report every month, and the keywords that went down shown too.',
  'ca/website-development/index.html': 'Fast, accessible websites for Canadian businesses, written in code and handed over in your own repository and hosting account.',
  'ca/toronto/index.html': 'ERP, websites and search for Toronto and the GTA &mdash; built remotely, reviewed weekly, with data kept in a Canadian region.',
};

const decode = t => t.replace(/&amp;/g, '&');
const esc = t => t.replace(/&(?!(?:amp|lt|gt|quot|mdash|ndash|hellip|rsquo|lsquo|ldquo|rdquo|pound|middot|times|nbsp);)/g, '&amp;').replace(/"/g, '&quot;');

function shorten(t) {
  if (t.length <= MAX_DESC) return t;
  const cut = t.slice(0, MAX_DESC);
  const at = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' &mdash; '), cut.lastIndexOf(', '));
  if (at > 90) return t.slice(0, at + (t[at] === '.' ? 1 : 0)).replace(/[,;:]$/, '').trim();
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '').trim() + '&hellip;';
}

const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) pages.push(rel);
  }
})('');

let addedTo = 0, shortened = 0, usedOwnImage = 0, skipped = 0;
for (const rel of pages) {
  const p = path.join(REPO, rel);
  let raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf(CR + LF) >= 0;
  let s = crlf ? raw.split(CR + LF).join(LF) : raw;
  const before = s;

  // ---- 8. shorten the descriptions that are still too long -------------------------------
  if (OVERRIDES[rel]) {
    s = s.replace(/(<meta property="og:description" content=")[^"]*(")/, '$1' + OVERRIDES[rel] + '$2');
    s = s.replace(/(<meta name="twitter:description" content=")[^"]*(")/, '$1' + OVERRIDES[rel] + '$2');
    shortened++;
  } else if (/property="og:description"/.test(s)) {
    const d = /<meta property="og:description" content="([^"]*)"/.exec(s);
    if (d && d[1].length > MAX_DESC) {
      const short = shorten(d[1]);
      s = s.replace(/(<meta property="og:description" content=")[^"]*(")/, '$1' + short + '$2');
      s = s.replace(/(<meta name="twitter:description" content=")[^"]*(")/, '$1' + short + '$2');
      shortened++;
    }
  }

  // ---- 7. the pages with nothing at all ---------------------------------------------------
  if (!/property="og:image"/.test(s)) {
    if (rel === '404.html') { skipped++; }        // a 404 has nothing worth previewing
    else {
      const title = (/<title>([\s\S]*?)<\/title>/.exec(s) || [])[1];
      const descRaw = (/<meta name="description" content="([^"]*)"/.exec(s) || [])[1];
      if (!title) { skipped++; }
      else {
        const url = SITE + '/' + rel.replace(/index\.html$/, '').replace(/\\/g, '/');
        const desc = shorten(descRaw || decode(title).replace(/\s*\|.*$/, ''));

        // the page's own lead photograph, at a size a scraper will fetch
        let img = CARD, iw = 1200, ih = 630, ialt = CARD_ALT;
        const lead = /<img[^>]*?src="[^"]*?\/assets\/images\/library\/([^"]+)"/.exec(s);
        if (lead) {
          const base = lead[1].replace(/-(700|1400)\.jpg$/, '').replace(/\.(jpg|jpeg|png|webp)$/, '');
          const mid = SIZES[base + '-1400.jpg'], small = SIZES[base + '-700.jpg'];
          const pick = (mid && mid.kb <= MAX_KB) ? { f: base + '-1400.jpg', m: mid } : (small ? { f: base + '-700.jpg', m: small } : null);
          if (pick) {
            img = SITE + '/assets/images/library/' + pick.f; iw = pick.m.w; ih = pick.m.h;
            const a = /<img[^>]*?src="[^"]*?\/assets\/images\/library\/[^"]+"[^>]*?alt="([^"]*)"/.exec(s);
            if (a && a[1]) ialt = a[1];
            usedOwnImage++;
          }
        }

        const block = [
          '<meta property="og:type" content="article" />',
          '<meta property="og:site_name" content="TechAuditPros" />',
          '<meta property="og:url" content="' + url + '" />',
          '<meta property="og:title" content="' + esc(decode(title)) + '" />',
          '<meta property="og:description" content="' + esc(desc) + '" />',
          '<meta property="og:image" content="' + img + '" />',
          '<meta property="og:image:width" content="' + iw + '" />',
          '<meta property="og:image:height" content="' + ih + '" />',
          '<meta property="og:image:type" content="image/jpeg" />',
          '<meta property="og:image:alt" content="' + esc(ialt) + '" />',
          '<meta property="og:locale" content="en_GB" />',
          '<meta name="twitter:card" content="summary_large_image" />',
          '<meta name="twitter:site" content="@techauditpros" />',
          '<meta name="twitter:title" content="' + esc(decode(title)) + '" />',
          '<meta name="twitter:description" content="' + esc(desc) + '" />',
          '<meta name="twitter:image" content="' + img + '" />',
          '<meta name="twitter:image:alt" content="' + esc(ialt) + '" />',
          '',
        ].join('\n');

        // put it straight after the title, which every one of these pages has
        s = s.replace(/(<title>[\s\S]*?<\/title>\s*\n)/, '$1' + block);
        addedTo++;
      }
    }
  }

  if (s !== before && !DRY) fs.writeFileSync(p, crlf ? s.split(LF).join(CR + LF) : s);
}
console.log((DRY ? 'would add' : 'added') + ' a full share-tag set to ' + addedTo + ' pages ('
  + usedOwnImage + ' using their own lead photograph), shortened ' + shortened + ' descriptions'
  + (skipped ? ', skipped ' + skipped : ''));
