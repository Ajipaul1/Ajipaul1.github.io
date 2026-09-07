// usage: node timeline.js <path> <name> <ms,ms,ms...> [width]  — viewport frames at given times after load, no scrolling
const { chromium } = require('playwright-core');
const CHROME = [process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p => require('fs').existsSync(p));
(async () => {
  let [, , p, name, times, w = '1440'] = process.argv; p = '/' + p.replace(/^.*?:\/.*?\/Git\//, '').replace(/^\/+/, '');
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await b.newPage({ viewport: { width: +w, height: 900 } });
  const t0 = Date.now(); await page.goto('http://127.0.0.1:8934' + p, { waitUntil: 'load' });
  const files = [];
  for (const ms of times.split(',').map(Number)) { const wait = ms - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait); const f = __dirname + '/shots/' + name + '_' + ms + '.png'; await page.screenshot({ path: f }); files.push(f); }
  await b.close();
  const { execSync } = require('child_process');
  execSync('"C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe" montage ' + files.map(f => '"' + f + '"').join(' ') + ' -tile 2x -geometry 720x450+6+6 "' + __dirname + '/shots/' + name + '_timeline.png"');
  console.log('timeline written:', name + '_timeline.png');
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
