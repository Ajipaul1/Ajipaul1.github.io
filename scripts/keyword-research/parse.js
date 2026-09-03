const XLSX = require('xlsx'); const fs = require('fs'); const path = require('path');
const DL = 'C:/Users/marke/Downloads/';
const files = fs.readdirSync(DL).filter(f => /all-keywords_(us|uk)_2026-09-03/.test(f) && f.endsWith('.xlsx'));
const Q = /^(what|how|why|when|where|which|who|whom|whose|can|could|does|do|did|is|are|was|will|would|should|shall|may|might)\b/i;
const usCities = ['new york','nyc','los angeles','chicago','houston','phoenix','philadelphia','san antonio','san diego','dallas','austin','san jose','jacksonville','fort worth','columbus','charlotte','indianapolis','san francisco','seattle','denver','washington dc','washington','boston','nashville','detroit','portland','las vegas','memphis','louisville','baltimore','milwaukee','albuquerque','tucson','fresno','sacramento','atlanta','miami','orlando','tampa','minneapolis','cleveland','raleigh','pittsburgh','cincinnati','kansas city','st louis','st. louis','salt lake','oklahoma city','omaha','new orleans','buffalo','richmond','boise','birmingham al','texas','california','florida','new jersey','utah','ohio','michigan','georgia','arizona','colorado','virginia','massachusetts','illinois','pennsylvania','north carolina','tennessee','nevada','oregon','minnesota','wisconsin','missouri','maryland','indiana','usa','united states','america','near me'];
const ukCities = ['london','manchester','birmingham','leeds','glasgow','edinburgh','liverpool','bristol','sheffield','newcastle','nottingham','cardiff','belfast','leicester','southampton','brighton','oxford','cambridge','reading','milton keynes','essex','kent','surrey','scotland','wales','northern ireland','yorkshire','coventry','derby','hull','plymouth','bournemouth','aberdeen','dundee','norwich','swansea','sunderland','wolverhampton','uk','united kingdom','england','britain','british','near me'];
const agg = {}; // country->topic->Map(keyword->row)
for (const f of files) {
  const m = f.match(/^(.*?)_all-keywords_(us|uk)_/); const topic = m[1], cc = m[2];
  const wb = XLSX.readFile(DL + f); const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const hdr = rows[0]; const ki = hdr.indexOf('Keyword'), ii = hdr.indexOf('Intent'), vi = hdr.indexOf('Volume'), di = hdr.indexOf('Keyword Difficulty'), ci = hdr.findIndex(h => /CPC/.test(h)), ri = hdr.indexOf('Relevance'), si = hdr.indexOf('SERP Features');
  const data = rows.slice(1).filter(r => r[ki]).map(r => ({ k: String(r[ki]).trim().toLowerCase(), intent: r[ii] || '', vol: +r[vi] || 0, kd: +r[di] || 0, cpc: +r[ci] || 0, rel: +r[ri] || 0, serp: r[si] || '' }));
  const qcount = data.filter(r => Q.test(r.k)).length;
  console.log(`\n##### ${f} | rows=${data.length} | question-rows=${qcount} (${(100*qcount/data.length).toFixed(0)}%) | hdr=${hdr.join(', ')}`);
  agg[cc] = agg[cc] || {}; agg[cc][topic] = agg[cc][topic] || new Map();
  for (const r of data) { const ex = agg[cc][topic].get(r.k); if (!ex || ex.vol < r.vol) agg[cc][topic].set(r.k, r); }
}
let full = '';
for (const cc of Object.keys(agg)) for (const topic of Object.keys(agg[cc])) {
  const arr = [...agg[cc][topic].values()].sort((a, b) => b.vol - a.vol);
  const totalVol = arr.reduce((s, r) => s + r.vol, 0);
  const head = arr.filter(r => !Q.test(r.k)); const qs = arr.filter(r => Q.test(r.k));
  const cities = cc === 'us' ? usCities : ukCities; const citySum = {};
  for (const r of arr) for (const c of cities) { if (new RegExp('\b' + c.replace('.', '\.') + '\b').test(r.k)) { citySum[c] = citySum[c] || { vol: 0, n: 0, top: [] }; citySum[c].vol += r.vol; citySum[c].n++; if (citySum[c].top.length < 4) citySum[c].top.push(r.k + '(' + r.vol + ')'); } }
  const intents = {}; for (const r of arr) for (const it of String(r.intent).split(',').map(s => s.trim()).filter(Boolean)) { intents[it] = intents[it] || 0; intents[it] += r.vol; }
  const fmt = r => `${r.k} | ${r.intent} | vol ${r.vol} | kd ${r.kd} | cpc ${r.cpc} | rel ${r.rel}`;
  const section = `\n=============== ${cc.toUpperCase()} / ${topic} — unique kws ${arr.length}, total vol ${totalVol} ===============\nINTENT VOL: ${JSON.stringify(intents)}\n--- TOP HEAD (non-question) by volume (${cc==='us'?70:45}) ---\n${head.slice(0, cc==='us'?70:45).map(fmt).join('\n')}\n--- TOP QUESTIONS by volume (${cc==='us'?60:40}) ---\n${qs.slice(0, cc==='us'?60:40).map(fmt).join('\n')}\n--- CITY/GEO SUMS (>=50) ---\n${Object.entries(citySum).filter(([c, v]) => v.vol >= 50).sort((a, b) => b[1].vol - a[1].vol).map(([c, v]) => `${c}: ${v.vol}/mo across ${v.n} kws — ${v.top.join('; ')}`).join('\n')}\n`;
  console.log(section);
  full += `\n=============== ${cc.toUpperCase()} / ${topic} ===============\nALL HEAD (vol>=100):\n${head.filter(r => r.vol >= 100).map(fmt).join('\n')}\nALL QUESTIONS (vol>=30):\n${qs.filter(r => r.vol >= 30).map(fmt).join('\n')}\n`;
  fs.writeFileSync(path.join(__dirname, `full_${cc}_${topic}.txt`), `HEAD (vol>=50):\n${head.filter(r => r.vol >= 50).map(fmt).join('\n')}\n\nQUESTIONS (vol>=20):\n${qs.filter(r => r.vol >= 20).map(fmt).join('\n')}\n`);
}
fs.writeFileSync(path.join(__dirname, 'full_all.txt'), full);
