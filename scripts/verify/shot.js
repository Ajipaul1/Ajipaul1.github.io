// usage: node shot.js <path> <outname> [width] [fullpage=1]
const { chromium } = require('playwright-core') /* npm install playwright-core in a scratch dir and run from there, or set NODE_PATH */;
const OUT = require('path').join(__dirname, 'shots') + '/';
require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  let [, , p, name, w = '1440', full = '1', scrollY = '0'] = process.argv;
  p = '/' + p.replace(/^.*?:\/.*?\/Git\//, '').replace(/^\/+/, ''); // undo Git Bash path mangling; accept "us/erp/"
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox', '--force-prefers-reduced-motion'] });
  const page = await browser.newPage({ viewport: { width: +w, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGE: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ': ' + r.url()); });
  await page.goto('http://127.0.0.1:8934' + p, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(1200);
  // scroll through the page so lazy images load and reveals fire, then back to top
  await page.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto'; const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 150)); } window.scrollTo({ top: h, behavior: 'instant' }); await new Promise(r => setTimeout(r, 400)); window.scrollTo({ top: 0, behavior: 'instant' }); });
  await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  // wait for every image to finish loading (lazy ones included), max 10s
  await page.evaluate(() => Promise.race([
    Promise.all(Array.from(document.images).map(i => i.complete ? Promise.resolve() : new Promise(r => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }))),
    new Promise(r => setTimeout(r, 10000)),
  ]));
  const imgs = await page.evaluate(() => Array.from(document.images).filter(i => i.src && !i.src.includes('flagcdn')).map(i => ({ ok: i.complete && i.naturalWidth > 0, src: i.getAttribute('src') })));
  const broken = imgs.filter(i => !i.ok);
  console.log('images:', imgs.length, 'broken:', broken.length ? broken.map(b => b.src) : 'none');
  await page.waitForTimeout(400);
  // 6th arg: a pixel offset, or a CSS selector to scroll into view (viewport shots of one section)
  if (scrollY && scrollY !== '0') {
    if (/^\d+$/.test(scrollY)) await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), +scrollY);
    else await page.evaluate(sel => { const el = document.querySelector(sel); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' }); } }, scrollY);
    await page.waitForTimeout(1800);
  }
  const path = OUT + name + '.png';
  await page.screenshot({ path, fullPage: full === '1' });
  const h = await page.evaluate(() => ({ docW: document.documentElement.scrollWidth, winW: window.innerWidth, h: document.documentElement.scrollHeight }));
  console.log(name, JSON.stringify(h), 'errors:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
