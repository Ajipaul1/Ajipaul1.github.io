// Reads the six UK SEMrush exports in C:/Users/marke/Downloads (*_uk_2026-09-03*.xlsx) and the image library. Needs the xlsx package: NODE_PATH to a folder with it, e.g. a scratch npm install. Output feeds ai_context/PLAN-UK.md.
// Read the six UK SEMrush exports + measure the image library, and dump one summary to work the plan from.
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const DL = 'C:/Users/marke/Downloads/';
const FILES = fs.readdirSync(DL).filter(f => /_uk_2026-09-03.*\.xlsx$/i.test(f));
console.log('=== files found ===');
FILES.forEach(f => console.log(' ', f, (fs.statSync(DL + f).size / 1024).toFixed(0) + 'KB'));

const rows = new Map();   // keyword -> best row
let total = 0;
for (const f of FILES) {
  const wb = XLSX.readFile(DL + f);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const js = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  if (!js.length) { console.log('EMPTY:', f); continue; }
  if (total === 0) console.log('\n=== columns ===\n', Object.keys(js[0]).join(' | '));
  total += js.length;
  const src = /ERP/i.test(f) ? 'erp' : /website/i.test(f) ? 'web' : 'seo';
  for (const r of js) {
    const kw = String(r.Keyword || r.keyword || '').trim().toLowerCase();
    if (!kw) continue;
    const vol = Number(String(r.Volume || r.volume || 0).replace(/[^\d.]/g, '')) || 0;
    const kd = Number(String(r['Keyword Difficulty'] || r.KD || r['KD %'] || '').replace(/[^\d.]/g, ''));
    const intent = String(r['Intent'] || r.intent || '').trim();
    const cpc = Number(String(r.CPC || 0).replace(/[^\d.]/g, '')) || 0;
    const prev = rows.get(kw);
    if (!prev || vol > prev.vol) rows.set(kw, { kw, vol, kd: isFinite(kd) ? kd : '', intent, cpc, src });
    else if (prev && !prev.src.includes(src)) prev.src += '+' + src;
  }
}
const all = Array.from(rows.values()).sort((a, b) => b.vol - a.vol);
console.log('\n=== totals ===');
console.log('rows read:', total, '| unique keywords:', all.length, '| combined monthly volume:', all.reduce((s, r) => s + r.vol, 0));
console.log('with volume >= 10:', all.filter(r => r.vol >= 10).length, '| >= 50:', all.filter(r => r.vol >= 50).length, '| >= 100:', all.filter(r => r.vol >= 100).length);

console.log('\n=== top 60 by volume ===');
all.slice(0, 60).forEach(r => console.log(String(r.vol).padStart(6), (r.kd === '' ? '--' : String(r.kd)).padStart(3), (r.intent || '-').padEnd(14), r.src.padEnd(9), r.kw));

// intent split
const byIntent = {};
all.forEach(r => { const k = r.intent || '(none)'; byIntent[k] = (byIntent[k] || 0) + 1; });
console.log('\n=== intent split ===', JSON.stringify(byIntent));

// city / place modifiers that would justify a location page
const CITIES = ['london', 'manchester', 'birmingham', 'leeds', 'glasgow', 'edinburgh', 'bristol', 'liverpool',
  'sheffield', 'cardiff', 'newcastle', 'nottingham', 'leicester', 'southampton', 'brighton', 'reading',
  'milton keynes', 'coventry', 'belfast', 'aberdeen', 'oxford', 'cambridge', 'uk', 'united kingdom', 'england',
  'scotland', 'wales', 'britain', 'near me'];
console.log('\n=== place-modified keywords (volume desc) ===');
const place = all.filter(r => CITIES.some(c => r.kw.includes(c)));
place.slice(0, 45).forEach(r => console.log(String(r.vol).padStart(6), (r.kd === '' ? '--' : String(r.kd)).padStart(3), r.src.padEnd(9), r.kw));
console.log('place-modified count:', place.length, '| their combined volume:', place.reduce((s, r) => s + r.vol, 0));
const cityHits = {};
CITIES.forEach(c => { const hit = all.filter(r => r.kw.includes(c)); if (hit.length) cityHits[c] = { n: hit.length, vol: hit.reduce((s, r) => s + r.vol, 0) }; });
console.log('per place:', JSON.stringify(cityHits));

// question keywords = the AEO/GEO surface
console.log('\n=== question / how-to keywords (the AEO surface) ===');
const q = all.filter(r => /^(what|how|why|which|who|when|is |are |do |does |can |should )/.test(r.kw) || r.kw.includes('?'));
q.slice(0, 40).forEach(r => console.log(String(r.vol).padStart(6), r.src.padEnd(9), r.kw));
console.log('question count:', q.length, '| volume:', q.reduce((s, r) => s + r.vol, 0));

// long tail that reads like a blog post rather than a service page
console.log('\n=== long-tail (4+ words, vol >= 10, not place-modified) ===');
const lt = all.filter(r => r.kw.split(/\s+/).length >= 4 && r.vol >= 10 && !CITIES.some(c => r.kw.includes(c)));
lt.slice(0, 50).forEach(r => console.log(String(r.vol).padStart(6), r.src.padEnd(9), r.kw));
console.log('long-tail count:', lt.length);

// write the full deduped set for the plan
const outDir = __dirname + '/';   // uk_keywords.json lands next to this script (git-ignored: ~148k rows)
fs.writeFileSync(outDir + 'uk_keywords.json', JSON.stringify(all, null, 1));
console.log('\nfull deduped set written to uk_keywords.json');

// ---------- image library: real pixel dimensions, so big slots never get a 612px file ----------
function dims(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b[0] === 0xFF && b[1] === 0xD8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xFF) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  if (b.slice(0, 4).toString() === 'RIFF' && b.slice(8, 12).toString() === 'WEBP') return { w: 0, h: 0 };
  return { w: 0, h: 0 };
}
const LIB = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io/assets/images/library/';
console.log('\n=== image library by width ===');
const imgs = fs.readdirSync(LIB).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).map(f => {
  const d = dims(LIB + f);
  return { f, w: d.w, h: d.h, kb: Math.round(fs.statSync(LIB + f).size / 1024) };
}).sort((a, b) => b.w - a.w);
imgs.forEach(i => console.log(String(i.w).padStart(5) + 'x' + String(i.h).padEnd(5), String(i.kb).padStart(5) + 'KB', i.f));
console.log('\nbig enough for a hero / full-bleed (>=1200px wide):', imgs.filter(i => i.w >= 1200).length);
console.log('split-section / large card (900-1199px):', imgs.filter(i => i.w >= 900 && i.w < 1200).length);
console.log('small cards only (<900px):', imgs.filter(i => i.w < 900).length);
