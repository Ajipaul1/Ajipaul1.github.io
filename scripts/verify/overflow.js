// usage: node overflow.js <path> [width]  — names the elements whose box extends past the viewport (JS on)
const { chromium } = require('playwright-core');
(async () => {
  let [, , p, w = '1440'] = process.argv;
  p = '/' + p.replace(/^.*?:\/.*?\/Git\//, '').replace(/^\/+/, '');
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox'] });
  const page = await b.newPage({ viewport: { width: +w, height: 900 } });
  await page.goto('http://127.0.0.1:8934' + p, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const W = window.innerWidth, out = [];
    for (const e of document.querySelectorAll('body *')) {
      const r = e.getBoundingClientRect();
      if (r.width > 0 && (r.right > W + 2 || r.left < -2)) out.push({ tag: e.tagName.toLowerCase(), cls: String(e.className).slice(0, 50), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) });
    }
    // keep the outermost offenders: drop any whose parent is also listed
    return { docW: document.documentElement.scrollWidth, W, offenders: out.slice(0, 25) };
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
