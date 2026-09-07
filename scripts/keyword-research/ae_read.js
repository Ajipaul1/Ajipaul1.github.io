'use strict';
// UAE SEMrush exports (ai_context/data/ae/*.xlsx, git-ignored) -> ai_context/data/ae/ae_keywords.json + a console analysis.
// Same method as India: merge, dedupe (max volume), tag source cluster + city + intent, exclude careers/courses/how-to,
// winnable = vol >= 100 and KD <= 40 (UAE KDs run higher than India; PLAN-AE §1 explains the threshold).
const X = require('xlsx'); const fs = require('fs'); const path = require('path');
const DIR = path.join(__dirname, '../../ai_context/data/ae');
const rows = new Map();
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.xlsx'))) {
  const src = f.split('_')[0].toLowerCase().replace('erp-software', 'erp').replace('website-development', 'web');
  const ws = X.readFile(path.join(DIR, f)).Sheets[0] || Object.values(X.readFile(path.join(DIR, f)).Sheets)[0];
  for (const r of X.utils.sheet_to_json(ws, { header: 1 }).slice(1)) {
    const kw = String(r[0] || '').trim().toLowerCase(); if (!kw) continue;
    const rec = { kw, intent: r[1] || '', vol: +r[2] || 0, kd: r[3] == null ? null : +r[3], cpc: +r[4] || 0, feat: r[5] || '', src };
    const prev = rows.get(kw); if (!prev || rec.vol > prev.vol) rows.set(kw, rec);
  }
}
const all = [...rows.values()];
const CITY = [['dubai', /dubai/], ['abu dhabi', /abu ?dhabi/], ['sharjah', /sharjah/], ['ajman', /ajman/], ['rak', /ras al khaimah|rak\b/], ['al ain', /al ain/], ['fujairah', /fujairah/], ['uae', /\buae\b|emirates/]];
const EXCL = /\bjob|jobs|vacanc|salary|career|internship|course|classes|training|certif|tutorial|how to (make|create|build|learn|become|do)|meaning|full form|what is|definition|interview|resume|cv\b|free download|crack|pdf|ppt|wikipedia|login|portal/;
for (const r of all) { r.city = (CITY.find(([, re]) => re.test(r.kw)) || ['-'])[0]; r.excl = EXCL.test(r.kw); r.ai = /AI Overview/.test(r.feat); r.arabic = /[\u0600-\u06FF]/.test(r.kw); }
const win = all.filter(r => !r.excl && r.vol >= 100 && r.kd != null && r.kd <= 40);
fs.writeFileSync(path.join(DIR, 'ae_keywords.json'), JSON.stringify(all, null, 0));
const sum = a => a.reduce((s, r) => s + r.vol, 0);
console.log('total keywords', all.length, '| volume/mo', sum(all).toLocaleString(), '| winnable (vol>=100, KD<=40, not careers/how-to)', win.length, '|', sum(win).toLocaleString(), '/mo');
console.log('AI Overview on SERP:', (100 * all.filter(r => r.ai).length / all.length).toFixed(0) + '% of all,', (100 * win.filter(r => r.ai).length / win.length).toFixed(0) + '% of winnable');
console.log('arabic-script keywords:', all.filter(r => r.arabic).length);
console.log('\n== winnable by source cluster =='); for (const s of ['seo', 'web', 'erp']) { const a = win.filter(r => r.src === s); console.log(s.padEnd(4), String(a.length).padStart(4), 'kws', String(sum(a)).padStart(7), '/mo'); }
console.log('\n== winnable by city =='); for (const [c] of CITY.concat([['-']])) { const a = win.filter(r => r.city === c); if (a.length) console.log(c.padEnd(10), String(a.length).padStart(4), 'kws', String(sum(a)).padStart(7), '/mo   top:', a.sort((x, y) => y.vol - x.vol).slice(0, 4).map(r => r.kw + ' ' + r.vol + '/' + r.kd).join(' · ')); }
console.log('\n== top 40 winnable =='); for (const r of win.sort((a, b) => b.vol - a.vol).slice(0, 40)) console.log(String(r.vol).padStart(6), String(r.kd).padStart(3), r.src.padEnd(4), r.city.padEnd(10), (r.intent || '').slice(0, 13).padEnd(13), r.kw);
console.log('\n== head terms we cannot win yet (vol>=1000, KD>40) =='); for (const r of all.filter(r => !r.excl && r.vol >= 1000 && r.kd > 40).sort((a, b) => b.vol - a.vol).slice(0, 15)) console.log(String(r.vol).padStart(6), String(r.kd).padStart(3), r.src.padEnd(4), r.kw);
console.log('\n== ERP winnable (all) =='); for (const r of win.filter(r => r.src === 'erp').sort((a, b) => b.vol - a.vol).slice(0, 25)) console.log(String(r.vol).padStart(6), String(r.kd).padStart(3), r.city.padEnd(10), r.kw);
console.log('\n== web winnable top 25 =='); for (const r of win.filter(r => r.src === 'web').sort((a, b) => b.vol - a.vol).slice(0, 25)) console.log(String(r.vol).padStart(6), String(r.kd).padStart(3), r.city.padEnd(10), r.kw);
