// usage: node hover.js <path> <name>  — screenshots each header dropdown open (Services, then Service Areas)
const { chromium } = require('playwright-core');
const CHROME = [process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p => require('fs').existsSync(p));
(async () => {
  let [, , p, name] = process.argv; p = '/' + p.replace(/^.*?:\/.*?\/Git\//, '').replace(/^\/+/, '');
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8934' + p, { waitUntil: 'load' }); await page.waitForTimeout(800);
  const trig = await page.$$('.nav-dropdown > a');
  for (let i = 0; i < trig.length; i++) {
    await page.mouse.move(5, 600); await page.waitForTimeout(300);
    await trig[i].hover(); await page.waitForTimeout(650);
    await page.screenshot({ path: __dirname + '/shots/' + name + '_menu' + (i + 1) + '.png' });
  }
  await b.close(); console.log('hover shots:', trig.length);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
