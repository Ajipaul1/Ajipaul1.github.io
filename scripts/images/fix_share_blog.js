'use strict';
// Corrects an over-reach in fix_share_tags.js.
//
// That script normalised EVERY og:image to the brand share card so the URL would be absolute and
// the file small. That is right for the marketing pages and wrong for the 56 blog posts, which
// previously shared their own lead photograph. A shared article should show the article's picture --
// otherwise every one of 77 posts looks identical in a WhatsApp thread.
//
// So each post is repointed at its own lead image, but at the 1400px variant rather than the 2400px
// master (the masters run 200KB to over 1MB, which is the size fault that stopped previews appearing
// in the first place), with the real dimensions declared.
//
// It also shortens any og:description still over 165 characters, at a word boundary, because
// WhatsApp shows roughly the first 65 and LinkedIn about 200.
//
//   usage: node scripts/images/fix_share_blog.js [--dry]
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8'));
const CR = String.fromCharCode(13), LF = String.fromCharCode(10);
const DRY = process.argv.includes('--dry');
const MAX_DESC = 165;
const MAX_SHARE_KB = 300;

function shorten(t) {
  if (t.length <= MAX_DESC) return t;
  const cut = t.slice(0, MAX_DESC);
  const at = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' &mdash; '), cut.lastIndexOf(', '));
  if (at > 90) return t.slice(0, at + (t[at] === '.' ? 1 : 0)).replace(/[,;:]$/, '').trim();
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '').trim() + '&hellip;';
}

const posts = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html') && rel.startsWith('blog/') && rel !== 'blog/index.html') posts.push(rel);
  }
})('');

let repointed = 0, dimSet = 0, descCut = 0, noLead = 0, touched = 0;
for (const rel of posts) {
  const p = path.join(REPO, rel);
  let raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf(CR + LF) >= 0;
  let s = crlf ? raw.split(CR + LF).join(LF) : raw;
  const before = s;

  // the post's own lead image: the first article figure on the page
  const lead = /<figure class="article-figure[^"]*">\s*<img[^>]*?src="\/assets\/images\/library\/([^"]+)"/.exec(s);
  if (lead) {
    const base = lead[1].replace(/-(700|1400)\.jpg$/, '').replace(/\.(jpg|jpeg|png|webp)$/, '');
    const mid = SIZES[base + '-1400.jpg'], small = SIZES[base + '-700.jpg'], master = SIZES[lead[1]];
    const pick = (mid && mid.kb <= MAX_SHARE_KB) ? { f: base + '-1400.jpg', m: mid }
      : (small ? { f: base + '-700.jpg', m: small } : (master && master.kb <= MAX_SHARE_KB ? { f: lead[1], m: master } : null));
    if (pick) {
      const url = 'https://techauditpros.com/assets/images/library/' + pick.f;
      s = s.replace(/(<meta property="og:image" content=")[^"]*(")/, '$1' + url + '$2');
      s = s.replace(/(<meta name="twitter:image" content=")[^"]*(")/, '$1' + url + '$2');
      // the Article schema names the same image; keep it in step
      s = s.replace(/("image": ")https:\/\/techauditpros\.com\/assets\/images\/library\/[^"]*(")/, '$1' + url + '$2');
      repointed++;

      if (/property="og:image:width"/.test(s)) {
        s = s.replace(/<meta property="og:image:width" content="[^"]*"/, '<meta property="og:image:width" content="' + pick.m.w + '"');
        s = s.replace(/<meta property="og:image:height" content="[^"]*"/, '<meta property="og:image:height" content="' + pick.m.h + '"');
      } else {
        const anchor = s.match(/^[ \t]*<meta property="og:image" content="[^"]*"[^>]*>[ \t]*\r?\n/m);
        if (anchor) {
          s = s.replace(anchor[0], anchor[0]
            + '<meta property="og:image:width" content="' + pick.m.w + '" />\n'
            + '<meta property="og:image:height" content="' + pick.m.h + '" />\n');
          dimSet++;
        }
      }
      // the alt text should describe THIS picture, not the brand card
      const alt = /<figure class="article-figure[^"]*">\s*<img[^>]*?alt="([^"]*)"/.exec(s);
      if (alt) {
        s = s.replace(/(<meta property="og:image:alt" content=")[^"]*(")/, '$1' + alt[1] + '$2');
        s = s.replace(/(<meta name="twitter:image:alt" content=")[^"]*(")/, '$1' + alt[1] + '$2');
      }
    }
  } else noLead++;

  // shorten a long share description
  const d = /<meta property="og:description" content="([^"]*)"/.exec(s);
  if (d && d[1].length > MAX_DESC) {
    const short = shorten(d[1]);
    s = s.replace(/(<meta property="og:description" content=")[^"]*(")/, '$1' + short + '$2');
    s = s.replace(/(<meta name="twitter:description" content=")[^"]*(")/, '$1' + short + '$2');
    descCut++;
  }

  if (s !== before) { if (!DRY) fs.writeFileSync(p, crlf ? s.split(LF).join(CR + LF) : s); touched++; }
}
console.log((DRY ? 'would fix' : 'fixed') + ': ' + repointed + ' posts share their own lead image again, '
  + dimSet + ' gained image dimensions, ' + descCut + ' descriptions shortened, '
  + touched + ' files written' + (noLead ? ' (' + noLead + ' posts have no article figure and keep the brand card)' : ''));
