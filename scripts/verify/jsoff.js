// usage: node jsoff.js <path> [selector-scope]   — loads the page with JavaScript DISABLED and counts
// elements left invisible (opacity 0, clip-path closed, scale(0)). Reveal start states must live under a
// class JS adds, so with JS off this must report hidden: 0. Default scope: the whole <main>/<body>.
const { chromium } = require('playwright-core');
(async () => {
  let [, , p, scope = 'body'] = process.argv;
  p = '/' + p.replace(/^.*?:\/.*?\/Git\//, '').replace(/^\/+/, '');
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox'] });
  const page = await b.newPage({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  await page.goto('http://127.0.0.1:8934' + p, { waitUntil: 'load', timeout: 45000 });
  const r = await page.evaluate(sel => {
    const els = Array.from(document.querySelectorAll(sel + ' *'));
    const hidden = els.filter(e => {
      const c = getComputedStyle(e); const box = e.getBoundingClientRect();
      if (!(box.width > 0 && box.height > 0)) return false;
      return c.opacity === '0' || (c.clipPath !== 'none' && /100%|\b0%/.test(c.clipPath)) || /scale\(0[,)]/.test(c.transform) || c.visibility === 'hidden';
    });
    return { scanned: els.length, hidden: hidden.length, sample: hidden.slice(0, 6).map(e => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 40)), docW: document.documentElement.scrollWidth, winW: window.innerWidth };
  }, scope);
  console.log('JS-off', p, JSON.stringify(r));
  await b.close();
  process.exit(r.hidden || r.docW > r.winW ? 1 : 0);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
