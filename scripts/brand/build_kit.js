'use strict';
// BRAND KIT: every TechAuditPros logo file, made from the one drawing in tap_mark.js (owner, 2026-10-15: "save all
// the sizes of the logo I need anytime ... PNG, PDF, Facebook size, with letters, without letters").
//
//   node scripts/brand/build_kit.js <kit-out-dir> [site-root]
//
// <kit-out-dir>  gets every file + techauditpros-brand-kit.zip (the app serves them at app.techauditpros.com/brand/)
// [site-root]    if given, the website's own copies are refreshed there too: favicons, favicon.ico,
//                apple-touch-icon.png, logoonly.svg (also the logo Google reads), logo.svg, the 500 px logos
//
// Needs two node packages and Chrome: run with NODE_PATH pointing at a folder that has opentype.js and
// playwright-core installed (here: D:/Tools/brandkit/node_modules and any playwright-core), and the two fonts
// (IBM Plex Sans Bold, IBM Plex Mono Medium; free from Google Fonts) in FONT_DIR. The name is turned into outlines,
// so the files look the same on any computer, with or without the fonts.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const opentype = require('opentype.js');
const { chromium } = require('playwright-core');
const M = require('./tap_mark');

const FONT_DIR = process.env.TAP_FONT_DIR || 'D:/Tools/brandkit/fonts';
const SANS = opentype.loadSync(path.join(FONT_DIR, 'IBMPlexSans-Bold.ttf'));
const MONO = opentype.loadSync(path.join(FONT_DIR, 'IBMPlexMono-Medium.ttf'));
const C = M.C;
const WHITE = '#FFFFFF', SOFT = '#4B5B67', SOFT_D = '#A9BACB';

// ---------- the name, as outlines ("Tech" navy + "AuditPros" orange, the split of the homepage title) ----------
function layout(font, str, size, tracking) {
  const scale = size / font.unitsPerEm, glyphs = font.stringToGlyphs(str), out = [];
  let pen = 0;
  glyphs.forEach(function (g, i) {
    out.push({ g: g, x: pen });
    pen += g.advanceWidth * scale + (i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) * scale : 0) + (i < glyphs.length - 1 ? tracking * size : 0);
  });
  return { glyphs: out, width: pen };
}
function pathOf(font, items, size, from, to) {
  let d = '';
  for (let i = from; i < to; i++) d += items[i].g.getPath(items[i].x, 0, size).toPathData(2);
  return d;
}
// returns the two parts with the baseline at y = 0, plus the real ink box
function name(size) {
  const L = layout(SANS, 'TechAuditPros', size, -0.01);
  const tech = pathOf(SANS, L.glyphs, size, 0, 4), audit = pathOf(SANS, L.glyphs, size, 4, L.glyphs.length);
  const p = new opentype.Path(); L.glyphs.forEach(function (it) { p.extend(it.g.getPath(it.x, 0, size)); });
  const b = p.getBoundingBox();
  return { tech: tech, audit: audit, x1: b.x1, y1: b.y1, x2: b.x2, y2: b.y2, w: b.x2 - b.x1, h: b.y2 - b.y1 };
}
function line(str, size, tracking) {
  const L = layout(MONO, str, size, tracking);
  const p = new opentype.Path(); L.glyphs.forEach(function (it) { p.extend(it.g.getPath(it.x, 0, size)); });
  const b = p.getBoundingBox();
  return { d: p.toPathData(2), x1: b.x1, y1: b.y1, w: b.x2 - b.x1, h: b.y2 - b.y1 };
}

// ---------- pieces placed on a canvas ----------
let maskN = 0;
function markAt(variant, x, y, w, fill) {   // the mark's tight box drawn at (x, y), w wide
  const s = w / M.TIGHT.w;
  return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ') translate(' + (-M.TIGHT.x) + ' ' + (-M.TIGHT.y) + ')">'
    + M.parts(variant, { fill: fill, id: 'cut' + (++maskN) }) + '</g>';
}
function nameAt(theme, x, baseline, size) {   // theme: light | dark | black | white
  const n = name(size);
  const t = theme === 'dark' ? [WHITE, C.orangeL] : theme === 'black' ? ['#000', '#000'] : theme === 'white' ? [WHITE, WHITE] : [C.navy, C.orange];
  const tr = ' transform="translate(' + f(x - n.x1) + ' ' + f(baseline) + ')"';
  return { svg: '<path fill="' + t[0] + '" d="' + n.tech + '"' + tr + '/><path fill="' + t[1] + '" d="' + n.audit + '"' + tr + '/>', n: n };
}
function f(v) { return Math.round(v * 100) / 100; }
function variantFor(theme) { return theme === 'dark' ? 'dark' : (theme === 'black' || theme === 'white') ? 'mono' : 'color'; }
function monoFill(theme) { return theme === 'white' ? WHITE : '#000'; }

// horizontal lockup: mark + name, mark 100 units tall; returns { body, w, h }
function lockupH(theme) {
  const mh = 100, mw = mh * M.TIGHT.w / M.TIGHT.h, gap = 30, size = 62;
  const n = name(size), baseline = mh / 2 + (-n.y1) / 2 - 1;   // centre the letters' height on the mark
  const nm = nameAt(theme, mw + gap, baseline, size);
  return { body: markAt(variantFor(theme), 0, 0, mw, monoFill(theme)) + nm.svg, w: mw + gap + n.w, h: mh };
}
// stacked lockup: mark above, name below, centred
function lockupS(theme) {
  const size = 62, n = name(size), mw = n.w * 0.56, mh = mw * M.TIGHT.h / M.TIGHT.w, gap = 30;
  const baseline = mh + gap + (-n.y1);
  const nm = nameAt(theme, 0, baseline, size);
  return { body: markAt(variantFor(theme), (n.w - mw) / 2, 0, mw, monoFill(theme)) + nm.svg, w: n.w, h: baseline + n.y2 };
}
// a lockup scaled into a box (x, y, w, h), centred
function fit(lk, x, y, w, h) {
  const s = Math.min(w / lk.w, h / lk.h);
  return '<g transform="translate(' + f(x + (w - lk.w * s) / 2) + ' ' + f(y + (h - lk.h * s) / 2) + ') scale(' + f(s) + ')">' + lk.body + '</g>';
}
function doc(w, h, body, bg) {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + f(w) + ' ' + f(h) + '" width="' + f(w) + '" height="' + f(h) + '">' + (bg || '') + body + '</svg>';
}
function bgNavy(w, h, id) {   // brand navy with a soft lighter centre and a faint orange glow
  return '<defs><radialGradient id="' + id + 'a" cx="50%" cy="42%" r="62%"><stop offset="0" stop-color="#18406A"/><stop offset="1" stop-color="' + C.navy + '"/></radialGradient>'
    + '<radialGradient id="' + id + 'b" cx="50%" cy="100%" r="55%"><stop offset="0" stop-color="' + C.orange + '" stop-opacity=".22"/><stop offset="1" stop-color="' + C.orange + '" stop-opacity="0"/></radialGradient></defs>'
    + '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'a)"/><rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'b)"/>';
}
function bgSolid(w, h, c) { return '<rect width="' + w + '" height="' + h + '" fill="' + c + '"/>'; }

// lockup files: padded so nothing touches the edge
function lockupFile(lk, pad, bg) {
  const p = lk.h * pad, w = lk.w + 2 * p, h = lk.h + 2 * p;
  return doc(w, h, '<g transform="translate(' + f(p) + ' ' + f(p) + ')">' + lk.body + '</g>', bg ? bg(w, h) : '');
}
// square icon: the mark centred, `frac` of the width, on an optional background
function icon(variant, frac, bg, fill) {
  const W = 1000, mw = W * frac, mh = mw * M.TIGHT.h / M.TIGHT.w;
  return doc(W, W, markAt(variant, (W - mw) / 2, (W - mh) / 2, mw, fill), bg ? bg(W, W) : '');
}
// profile picture: a square that is shown as a circle; with or without the name
function profile(withName, light) {
  const W = 1000;
  if (!withName) return doc(W, W, markAt(light ? 'color' : 'dark', W * 0.19, (W - W * 0.62 * M.TIGHT.h / M.TIGHT.w) / 2, W * 0.62), light ? bgSolid(W, W, WHITE) : bgNavy(W, W, 'pf'));
  const lk = lockupS(light ? 'light' : 'dark');
  return doc(W, W, fit(lk, W * 0.17, W * 0.2, W * 0.66, W * 0.6), light ? bgSolid(W, W, WHITE) : bgNavy(W, W, 'pf'));
}
// cover / banner: navy, the lockup and the services line inside the area every device shows
function cover(W, H, safe) {   // safe = [x, y, w, h] the part no phone or desktop crops
  const lk = lockupH('dark'), sv = line('ERP SOFTWARE  ·  WEBSITES  ·  SEO', 40, 0.08);
  const [sx, sy, sw, sh] = safe;
  const lkH = Math.min(sh * 0.56, sw * 0.82 * lk.h / lk.w), lkW = lkH * lk.w / lk.h;
  const svW = lkW * 0.72, svS = svW / sv.w, svH = sv.h * svS, gap = lkH * 0.3;
  const top = sy + (sh - (lkH + gap + svH)) / 2;
  const body = fit(lk, sx + (sw - lkW) / 2, top, lkW, lkH)
    + '<path fill="' + SOFT_D + '" d="' + sv.d + '" transform="translate(' + f(sx + (sw - svW) / 2 - sv.x1 * svS) + ' ' + f(top + lkH + gap - sv.y1 * svS) + ') scale(' + f(svS) + ')"/>';
  return doc(W, H, body, bgNavy(W, H, 'cv'));
}

// ---------- the file list ----------
// [file name, svg, output width px (PNG only; height follows), formats]
function files() {
  const H = lockupH, S = lockupS, out = [];
  const add = (n, svg, w, fm) => out.push({ n: n, svg: svg, w: w, fm: fm });
  const sq = (v, fill) => icon(v, 0.86, null, fill);
  // 1. logo without letters
  add('techauditpros-logo-mark', sq('color'), [512, 1024, 2048], ['png', 'svg', 'pdf']);
  add('techauditpros-logo-mark-white-bg', icon('color', 0.74, (w, h) => bgSolid(w, h, WHITE)), [1024], ['png']);
  add('techauditpros-logo-mark-for-dark', sq('dark'), [1024], ['png', 'svg']);
  add('techauditpros-logo-mark-on-dark', icon('dark', 0.74, (w, h) => bgNavy(w, h, 'mk')), [1024], ['png']);
  // 2. logo with letters
  add('techauditpros-logo', lockupFile(H('light'), 0.14), [1200, 2400], ['png', 'svg', 'pdf']);
  add('techauditpros-logo-white-bg', lockupFile(H('light'), 0.3, (w, h) => bgSolid(w, h, WHITE)), [2400], ['png']);
  add('techauditpros-logo-for-dark', lockupFile(H('dark'), 0.14), [2400], ['png', 'svg']);
  add('techauditpros-logo-on-dark', lockupFile(H('dark'), 0.3, (w, h) => bgNavy(w, h, 'ld')), [2400], ['png']);
  add('techauditpros-logo-stacked', lockupFile(S('light'), 0.14), [1600], ['png', 'svg', 'pdf']);
  add('techauditpros-logo-stacked-on-dark', lockupFile(S('dark'), 0.22, (w, h) => bgNavy(w, h, 'sd')), [1600], ['png']);
  // 3. one colour (stamps, seals, embossing, one-colour print)
  add('techauditpros-logo-mark-black', sq('mono', '#000'), [1024], ['png', 'svg', 'pdf']);
  add('techauditpros-logo-mark-white', sq('mono', WHITE), [1024], ['png', 'svg']);
  add('techauditpros-logo-black', lockupFile(H('black'), 0.14), [2400], ['png', 'svg', 'pdf']);
  add('techauditpros-logo-white', lockupFile(H('white'), 0.14), [2400], ['png', 'svg']);
  // 4. social media (sizes each site asks for)
  [['facebook-profile', 720], ['instagram-profile', 1080], ['whatsapp-profile', 640], ['linkedin-logo', 400], ['youtube-profile', 800], ['x-profile', 400]].forEach(function (s) {
    add('techauditpros-' + s[0] + '-' + s[1], profile(false, false), [s[1]], ['png']);
    add('techauditpros-' + s[0] + '-with-name-' + s[1], profile(true, true), [s[1]], ['png']);
  });
  add('techauditpros-facebook-cover-1640x624', cover(1640, 624, [220, 90, 1200, 444]), [1640], ['png']);
  add('techauditpros-linkedin-cover-1128x191', cover(1128, 191, [214, 18, 700, 155]), [1128], ['png']);
  add('techauditpros-youtube-banner-2560x1440', cover(2560, 1440, [507, 508, 1546, 423]), [2560], ['png']);
  add('techauditpros-x-header-1500x500', cover(1500, 500, [200, 60, 1100, 320]), [1500], ['png']);
  // 5. website and app icons
  const tile = (frac) => icon('dark', frac, (w, h) => bgNavy(w, h, 'tl'));
  add('favicon', icon('color', 0.94), [16, 32, 48, 64], ['png']);
  add('apple-touch-icon', tile(0.74), [180], ['png']);
  add('android-icon', tile(0.74), [192, 512], ['png']);
  add('maskable-icon', tile(0.56), [512], ['png']);
  return out;
}

// ---------- rendering ----------
async function main() {
  const kit = process.argv[2], site = process.argv[3];
  if (!kit) throw new Error('usage: node build_kit.js <kit-out-dir> [site-root]');
  fs.mkdirSync(kit, { recursive: true });
  const CHROME = [process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await (await browser.newContext({ deviceScaleFactor: 1 })).newPage();
  const list = files(), made = [];
  for (const it of list) {
    const vb = it.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/), vw = +vb[1], vh = +vb[2];
    if (it.fm.indexOf('svg') >= 0) { fs.writeFileSync(path.join(kit, it.n + '.svg'), it.svg.replace(/ width="[\d.]+" height="[\d.]+"/, '')); made.push(it.n + '.svg'); }
    for (const px of (it.fm.indexOf('png') >= 0 ? it.w : [])) {
      const w = px, h = Math.round(px * vh / vw);
      await page.setViewportSize({ width: w, height: h });
      await page.setContent('<html><body style="margin:0;background:transparent">' + it.svg.replace(/width="[\d.]+" height="[\d.]+"/, 'width="' + w + '" height="' + h + '"') + '</body></html>');
      // names that already carry their size (facebook-profile-720, x-header-1500x500) keep it; the rest get -<px>
      const file = it.n + (/-\d{2,4}(x\d{2,4})?$/.test(it.n) ? '' : '-' + px) + '.png';
      await page.screenshot({ path: path.join(kit, file), omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } });
      made.push(file);
    }
    if (it.fm.indexOf('pdf') >= 0) {   // vector PDF, page = the artwork's own proportions
      const w = 600, h = Math.round(600 * vh / vw);
      await page.setViewportSize({ width: w, height: h });
      await page.setContent('<html><head><style>@page{size:' + w + 'px ' + h + 'px;margin:0}html,body{margin:0}</style></head><body>' + it.svg.replace(/width="[\d.]+" height="[\d.]+"/, 'width="' + w + '" height="' + h + '"') + '</body></html>');
      await page.pdf({ path: path.join(kit, it.n + '.pdf'), width: w + 'px', height: h + 'px', printBackground: true, pageRanges: '1' });
      made.push(it.n + '.pdf');
    }
  }
  await browser.close();
  // favicon.ico (16 + 32 + 48 in one file)
  execFileSync('magick', ['favicon-16.png', 'favicon-32.png', 'favicon-48.png', 'favicon.ico'], { cwd: kit });
  made.push('favicon.ico');
  // the zip with everything
  const zip = path.join(kit, 'techauditpros-brand-kit.zip');
  if (fs.existsSync(zip)) fs.unlinkSync(zip);
  execFileSync('powershell', ['-NoProfile', '-Command', 'Compress-Archive -Path ' + made.map((m) => "'" + path.join(kit, m) + "'").join(',') + " -DestinationPath '" + zip + "'"]);
  console.log('kit:', made.length, 'files + zip ->', kit);
  // small previews (240 px WebP) for the app's Logo & brand kit screen, so showing the list costs kilobytes, not the
  // 10 MB of full files; not in the zip
  const th = path.join(kit, 'thumbs');
  fs.mkdirSync(th, { recursive: true });
  made.filter((m) => m.endsWith('.png')).forEach((m) => execFileSync('magick', [path.join(kit, m), '-resize', '240x240>', '-quality', '86', path.join(th, m.replace(/\.png$/, '.webp'))]));
  console.log('thumbs:', fs.readdirSync(th).length);

  if (site) {   // the website's own copies (same names the 145 pages already link to)
    const cp = (from, to) => { fs.copyFileSync(path.join(kit, from), path.join(site, to)); console.log('site:', to); };
    [16, 32, 48, 64].forEach((s) => cp('favicon-' + s + '.png', 'assets/favicon-' + s + '.png'));
    cp('favicon.ico', 'favicon.ico');
    cp('apple-touch-icon-180.png', 'assets/apple-touch-icon.png');
    cp('techauditpros-logo-mark-white-bg-1024.png', 'assets/logo-500x500.png');
    cp('techauditpros-logo-mark-white-bg-1024.png', 'assets/official-logo-500x500.png');
    fs.writeFileSync(path.join(site, 'assets/logoonly.svg'), M.svg('color', { square: true }) + '\n'); console.log('site: assets/logoonly.svg');
    fs.writeFileSync(path.join(site, 'assets/faviconlogo.svg'), M.svg('color', { square: true }) + '\n'); console.log('site: assets/faviconlogo.svg');
    fs.copyFileSync(path.join(kit, 'techauditpros-logo.svg'), path.join(site, 'assets/logo.svg')); console.log('site: assets/logo.svg');
    // the 500 px files really are 500 px
    ['assets/logo-500x500.png', 'assets/official-logo-500x500.png'].forEach((p) => execFileSync('magick', [path.join(site, p), '-resize', '500x500', path.join(site, p)]));
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
