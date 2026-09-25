// indexnow.js — tell Bing (and the other IndexNow engines: Yandex, Seznam, Naver, Yep) which URLs changed.
// Google does not use IndexNow; Bing does, and ChatGPT search and Copilot answer from Bing's index.
// Run AFTER the Vercel deploy is live.  node scripts/seo/indexnow.js            -> every URL in sitemap.xml
//                                       node scripts/seo/indexnow.js /us/ /au/  -> just these paths
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const HOST = 'techauditpros.com';
const KEY = 'c3187a44bd83e03783ae953e7671631a'; // served at https://techauditpros.com/<KEY>.txt
const args = process.argv.slice(2);
const urls = args.length ? args.map(p => `https://${HOST}${p}`)
  : [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
(async () => {
  const k = await fetch(`https://${HOST}/${KEY}.txt`); const kt = (await k.text()).trim();
  if (k.status !== 200 || kt !== KEY) { console.error('key file not live yet:', k.status); process.exit(1); }
  const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }) });
  console.log('IndexNow', r.status, r.statusText, '-', urls.length, 'URLs'); // 200/202 = accepted
})();
