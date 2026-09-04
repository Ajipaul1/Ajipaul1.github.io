// Slice the deduped UK set into the clusters the plan needs: money terms per service, winnable blog
// topics, and the sub-topics each service page must cover.
const fs = require('fs');
const all = JSON.parse(fs.readFileSync(__dirname + '/uk_keywords.json', 'utf8'));
const show = (title, list, n) => { console.log('\n=== ' + title + ' (' + list.length + ', vol ' + list.reduce((s, r) => s + r.vol, 0) + ') ==='); list.slice(0, n || 30).forEach(r => console.log(String(r.vol).padStart(6), (r.kd === '' ? '--' : String(r.kd)).padStart(3), r.src.padEnd(9), r.kw)); };
const has = (r, re) => re.test(r.kw);

// money terms: what a buyer types
const MONEY = /(agency|agencies|company|companies|services?|consultant|consultancy|consulting|firm|developer|developers|partner|provider|vendor|outsourc|freelance|hire|cost|price|pricing|quote|near me|specialist|expert)/;
const money = all.filter(r => r.vol >= 20 && has(r, MONEY) && !/(course|salary|job|jobs|career|tutorial|free|template|builder|wix|squarespace|godaddy|wordpress\.com)/.test(r.kw));
show('MONEY TERMS - web', money.filter(r => r.src.includes('web')), 40);
show('MONEY TERMS - seo', money.filter(r => r.src.includes('seo')), 40);
show('MONEY TERMS - erp', money.filter(r => r.src.includes('erp')), 40);

// sub-topics each service page must cover (section-level keywords)
const T = {
  erp: { manufacturing: /manufactur/, cloud: /cloud/, 'small business': /small (business|to medium|and medium)|sme/, implementation: /implement/, integration: /integrat/, modules: /module/, inventory: /inventory|stock/, finance: /financ|accounting|invoice/, hr: /\bhr\b|payroll/, crm: /\bcrm\b/, sage: /\bsage\b/, xero: /xero/, odoo: /odoo/, netsuite: /netsuite/, sap: /\bsap\b/, dynamics: /dynamics|business central/, custom: /custom|bespoke/, 'vs': /\bvs\b|versus|difference/, cost: /cost|price|pricing/ },
  seo: { local: /local seo|google business|near me searches|maps/, technical: /technical seo/, audit: /audit/, ecommerce: /ecommerce|e-commerce|shopify seo/, 'on-page': /on[- ]page/, 'off-page/links': /backlink|link building|off[- ]page/, content: /content/, keywords: /keyword/, agency: /agency|company|services|consultant/, aeo: /\baeo\b|answer engine|featured snippet|people also ask/, geo: /\bgeo\b|generative engine|ai search|chatgpt|ai overview|perplexity|gemini|llm/, international: /international|multilingual/, b2b: /b2b|saas/, 'small business': /small business|sme/ },
  web: { ecommerce: /ecommerce|e-commerce|online (shop|store)|shopify|woocommerce|magento/, wordpress: /wordpress/, 'web app': /web app|application development|saas/, redesign: /redesign|revamp|rebuild/, 'landing page': /landing page/, design: /web design|website design/, speed: /speed|core web vitals|fast|performance/, mobile: /mobile|responsive/, hosting: /hosting|domain/, maintenance: /maintenance|support/, react: /react|next\.?js|node|javascript|angular|vue/, cost: /cost|price|pricing|how much/, 'small business': /small business|sme|startup/, agency: /agency|company|services|developer|freelance/, accessibility: /accessib|wcag/ },
};
for (const svc of Object.keys(T)) {
  console.log('\n=== SUB-TOPICS ' + svc.toUpperCase() + ' (keywords >= 10 vol containing the topic; count / volume / top term) ===');
  const pool = all.filter(r => r.src.includes(svc) && r.vol >= 10);
  for (const [name, re] of Object.entries(T[svc])) {
    const hit = pool.filter(r => re.test(r.kw)).sort((a, b) => b.vol - a.vol);
    if (!hit.length) continue;
    console.log(name.padEnd(16), String(hit.length).padStart(5), String(hit.reduce((s, r) => s + r.vol, 0)).padStart(7), ' top:', hit[0].kw, '(' + hit[0].vol + ', KD ' + hit[0].kd + ')', hit[1] ? '| ' + hit[1].kw + ' (' + hit[1].vol + ')' : '');
  }
}

// winnable blog topics: informational, KD <= 35, vol >= 100, not a pure head term
const blog = all.filter(r => r.vol >= 100 && r.kd !== '' && r.kd <= 35 && r.kw.split(/\s+/).length >= 3 && !/(free|wix|squarespace|godaddy|salary|jobs?|course)/.test(r.kw));
show('WINNABLE BLOG TOPICS (KD<=35, vol>=100, 3+ words) - erp', blog.filter(r => r.src.includes('erp')), 30);
show('WINNABLE BLOG TOPICS - seo', blog.filter(r => r.src.includes('seo')), 30);
show('WINNABLE BLOG TOPICS - web', blog.filter(r => r.src.includes('web')), 30);
console.log('\nwinnable blog candidates total:', blog.length, '| KD<=20:', blog.filter(r => r.kd <= 20).length);

// AI-search / GEO surface specifically
show('AI SEARCH / GEO / AEO terms', all.filter(r => r.vol >= 10 && /(ai search|ai seo|seo for ai|chatgpt|ai overview|generative engine|answer engine|\bgeo\b|\baeo\b|llm|perplexity|gemini seo|search generative)/.test(r.kw)), 30);

// UK-specific commercial (the hub page's own set)
show('UK-MODIFIED, commercial-ish, all services', all.filter(r => /\b(uk|united kingdom|british|britain|england)\b/.test(r.kw) && r.vol >= 20 && MONEY.test(r.kw + ' services')), 40);
