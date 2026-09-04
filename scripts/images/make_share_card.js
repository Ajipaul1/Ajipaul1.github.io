'use strict';
// Renders scripts/images/share_card.html at exactly 1200x630 and writes assets/images/og-share-cover.jpg.
//
// WHY THIS EXISTS. Sharing a techauditpros.com link on WhatsApp produced a bare link with no
// picture. Three causes, all in the share card and its tags:
//   1. the file was 724KB. WhatsApp's preview fetcher gives up on large images, so it silently
//      showed nothing. Target here is under 200KB.
//   2. the file was 1376x768 while the tags declared 1200x630. Scrapers that trust the declared
//      size mis-crop or reject it.
//   3. the old card carried invented performance figures -- "+450% CLIENT ROI", "+450.2% YOY
//      GROWTH", "2.1M VISITS", "24 Active Partners" -- and did not say what the company does.
//      That is the first thing a prospective client sees, so it now says what TechAuditPros is
//      and contains no numbers at all.
//
//   usage: node scripts/images/make_share_card.js
//          NODE_PATH=<a dir with playwright-core> node scripts/images/make_share_card.js
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright-core');

const REPO = path.resolve(__dirname, '..', '..');
const SRC = path.join(__dirname, 'share_card.html');
const OUT = path.join(REPO, 'assets', 'images', 'og-share-cover.jpg');
const MAGICK = 'C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MAX_KB = 200;   // WhatsApp is the tightest consumer of this file, so it sets the budget

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file:///' + SRC.replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);       // the brand typeface must be in before capture
  await page.waitForTimeout(900);
  const tmp = path.join(__dirname, '.share-card.png');
  await page.screenshot({ path: tmp, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();

  // step the quality down until it fits the budget rather than guessing a number
  let quality = 88, kb = Infinity;
  for (; quality >= 60; quality -= 4) {
    execFileSync(MAGICK, [tmp, '-strip', '-interlace', 'Plane', '-sampling-factor', '4:2:0',
      '-colorspace', 'sRGB', '-quality', String(quality), OUT]);
    kb = Math.round(fs.statSync(OUT).size / 1024);
    if (kb <= MAX_KB) break;
  }
  fs.unlinkSync(tmp);

  const dim = execFileSync(MAGICK, ['identify', '-format', '%wx%h', OUT], { encoding: 'utf8' }).trim();
  console.log('og-share-cover.jpg written: ' + dim + ', ' + kb + 'kB at quality ' + quality);
  if (dim !== '1200x630') throw new Error('expected 1200x630, got ' + dim + ' -- the og:image tags declare 1200x630');
  if (kb > MAX_KB) throw new Error(kb + 'kB exceeds the ' + MAX_KB + 'kB budget; WhatsApp may skip the preview');
})();
