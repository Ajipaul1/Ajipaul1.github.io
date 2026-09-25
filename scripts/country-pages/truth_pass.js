// truth_pass.js — replace every claim the business cannot back up with facts anyone can check.
// Owner decision 2026-09-25: remove 4.9/5, 250+, 128+, 16 countries, 97%, +205/180/165% and the
// "Verified International Trust Score"; the author "Shreya K" has left, her posts are signed by Aji Paul.
// Real proof only: Viraat Marine ERP (45 days, 19 role desks, 38 tables, erp.viraatmarine.com),
// Telgo Power Projects website (telgopowerprojects.com credits us; app.telgopowerprojects.com shows only a README, so no app claim),
// our own staff app, the Semrush certificate, the GSTIN.
// Runs over live pages AND the generators in scripts/, so a regenerated page cannot bring a claim back.
// Idempotent. RUN AFTER ANY GENERATOR RUN (with tone_pass.js).  Usage: node scripts/country-pages/truth_pass.js [--dry]
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const ROOT = path.resolve(__dirname, '../..');
const DRY = process.argv.includes('--dry');

const TRUE_LINE = 'Live shipyard ERP in Kerala &bull; Semrush-certified SEO lead &bull; GST-registered in India';

const STRIP = { // hero trust strip, one-for-one
  '250+': ['45 days', 'Shipyard ERP, first line to live'],
  '128+': ['19', 'Role desks live at the yard'],
  '16': ['2', 'Client systems live today'],
  '4.9/5': ['GST', 'Registered business, Kerala'],
};
const FACTS = { // <ul class="*-facts"> and /results/ lists
  '250+': ['45 days', 'shipyard ERP, start to live'],
  '128+': ['19', 'role desks live'],
  '16': ['2', 'client systems live'],
  '4.9/5': ['GST', 'registered in Kerala'],
  '97%': ['38', 'tables behind that ERP'],
};
const NUMBERS = { // .tap-numbers-section
  '205%': ['45 days', 'Viraat Marine ERP, first line to live'],
  '180%': ['19', 'Role desks the shipyard works from'],
  '97%': ['38', 'Database tables behind them'],
  '165%': ['2', 'Client systems live today'],
};
const ROTATE = {
  "'250+ Projects Delivered'": "'45-Day Shipyard ERP, Live'",
  "'128+ Active Clients Worldwide'": "'Semrush-Certified SEO Lead'",
  "'4.9/5 Client Rating'": "'GST-Registered in Kerala, India'",
  "'16 Countries Served'": "'2 Client Systems Live Today'",
};
const SEO_CARDS = { // /us/seo-services/ stat row
  '+180%': ['Semrush', 'SEO certification held by the engineer who leads your account'],
  '+320': ['Your data', 'Every plan starts from your own Search Console, not a template'],
  '+205%': ['Weekly', 'Crawl, index and ranking check on the pages that earn money'],
  '97%': ['Month to month', 'No long-term contract; you keep every change we make'],
};

function proofSection(eol) {
  return [
    '<section class="tap-cases-section">',
    '    <div class="container">',
    '        <div class="section-head">',
    '            <p class="eyebrow">Proof you can open</p>',
    '            <h2>Live systems, not screenshots.</h2>',
    '        </div>',
    '        <div class="cases-grid">',
    '            <div class="case-card">',
    '                <span class="case-tag">🇮🇳 Kerala · Shipyard</span>',
    '                <h3>Viraat Marine custom ERP</h3>',
    '                <div class="case-stat-row"><span>Built in</span><strong>45 days</strong></div>',
    '                <div class="case-stat-row"><span>Role desks</span><strong>19</strong></div>',
    '                <div class="case-stat-row"><span>Database tables</span><strong>38</strong></div>',
    '                <a class="case-card-link" href="/results/viraat-marine-erp/">Read the case study →</a>',
    '            </div>',
    '            <div class="case-card">',
    '                <span class="case-tag">🇮🇳 Kerala · Power infrastructure</span>',
    '                <h3>Telgo Power Projects website</h3>',
    '                <div class="case-stat-row"><span>Company website</span><strong>Live</strong></div>',
    '                <div class="case-stat-row"><span>Credits us</span><strong>In its footer</strong></div>',
    '                <div class="case-stat-row"><span>Built</span><strong>May–Jul 2026</strong></div>',
    '                <a class="case-card-link" href="https://telgopowerprojects.com/" target="_blank" rel="noopener">telgopowerprojects.com →</a>',
    '            </div>',
    '            <div class="case-card">',
    '                <span class="case-tag">🇮🇳 Kochi · Our own sales team</span>',
    '                <h3>TechAuditPros staff app</h3>',
    '                <div class="case-stat-row"><span>Calls, chat, quotes</span><strong>One phone app</strong></div>',
    '                <div class="case-stat-row"><span>Live since</span><strong>Sep 2026</strong></div>',
    '                <div class="case-stat-row"><span>Built</span><strong>In-house</strong></div>',
    '                <a class="case-card-link" href="/results/">See all our work →</a>',
    '            </div>',
    '        </div>',
    '    </div>',
    '</section>',
  ].join(eol);
}

function transform(s) {
  const eol = s.includes('\r\n') ? '\r\n' : '\n';
  const n = {};
  const rep = (key, re, fn) => { s = s.replace(re, (...a) => { n[key] = (n[key] || 0) + 1; return typeof fn === 'function' ? fn(...a) : fn; }); };

  rep('utility bar', /🏆 4\.9\/5 Rating &bull; 250\+ Projects Delivered &bull; 16 Countries Served/g, TRUE_LINE);
  rep('old trust bar', /🏆 Verified International Trust Score: <strong>4\.9 \/ 5<\/strong>(?: \(Over 250\+ Audits Completed\))?/g, TRUE_LINE);
  rep('star in link', / \(4\.[89]★\)/g, '');
  rep('hero strip', /<div class="trust-item"><span class="num">(250\+|128\+|16|4\.9\/5)<\/span><span class="lbl">[^<]*<\/span><\/div>/g,
    (m, k) => `<div class="trust-item"><span class="num">${STRIP[k][0]}</span><span class="lbl">${STRIP[k][1]}</span></div>`);
  rep('facts list', /<li><b>(250\+|128\+|16|4\.9\/5|97%)<\/b>(<span>|\s+)([^<]*?)(<\/span>)?<\/li>/g,
    (m, k, open, txt, close) => `<li><b>${FACTS[k][0]}</b>${open}${FACTS[k][1]}${close || ''}</li>`);
  rep('numbers row', /<div class="number-stat-item"><div class="num">(205%|180%|97%|165%)<\/div><div class="label">[^<]*<\/div><\/div>/g,
    (m, k) => `<div class="number-stat-item"><div class="num">${NUMBERS[k][0]}</div><div class="label">${NUMBERS[k][1]}</div></div>`);
  for (const [a, b] of Object.entries(ROTATE)) rep('rotating text', new RegExp(a.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'), 'g'), b);
  rep('case cards', /<section class="tap-cases-section">[\s\S]*?<\/section>/g, m => /\+(205|180|165)%/.test(m) ? proofSection(eol) : m);
  rep('seo stat cards', /<div class="us-stat-card"><span class="num">(\+180%|\+320|\+205%|97%)<\/span><span class="lbl">[^<]*<\/span><\/div>/g,
    (m, k) => `<div class="us-stat-card"><span class="num">${SEO_CARDS[k][0]}</span><span class="lbl">${SEO_CARDS[k][1]}</span></div>`);
  rep('seo stat heading', /<p class="eyebrow">Real Results<\/p>(\s*)<h2>Real engagements, real numbers\.<\/h2>(\s*)<p class="us-lead">Figures from actual client work &mdash; not projections\.<\/p>/g,
    (m, w1, w2) => `<p class="eyebrow">What you can hold us to</p>${w1}<h2>Four things every SEO engagement includes.</h2>${w2}<p class="us-lead">Written into the agreement, not promised on a call.</p>`);
  rep('footer countries', /<h3>Serving Businesses in 16 Countries<\/h3>/g, '<h3>Serving Businesses in Six Markets</h3>');
  rep('footer countries', / &bull; and clients in ten more, remotely, from Kochi/g, ', remotely, from Kochi');
  rep('byline', /By Shreya K, Chief Technical Editor/g, 'By Aji Paul, Founder');
  // the same claims as generator arrays (scripts/country-pages/*.js)
  rep('gen strip', /\['4\.9\/5', 'Client (rating|satisfaction)'\]/g, "['GST', 'Registered business, Kerala']");
  rep('gen strip', /\['16', 'Countries served'\]/g, "['2', 'Client systems live today']");
  rep('gen list', /'250\+ projects delivered', '16 countries served', '4\.9\/5 client rating'/g, "'45-day shipyard ERP, live', '2 client systems live today', 'GST-registered in Kerala'");
  rep('gen seo row', /'Real Results', 'Real engagements, real numbers\.', 'Figures from actual client work &mdash; not projections\.'/g,
    "'What you can hold us to', 'Four things every SEO engagement includes.', 'Written into the agreement, not promised on a call.'");
  rep('gen seo row', /\['(\+180%|\+320|\+205%|97%)', '[^']*(?:HVAC|US client|appliance retailer|retention)[^']*'\]/g, (m, k) => `['${SEO_CARDS[k][0]}', '${SEO_CARDS[k][1]}']`);
  return { s, n };
}

const files = execSync('git ls-files "*.html" "scripts/*.js" "scripts/**/*.js"', { cwd: ROOT }).toString().trim().split('\n')
  .filter(f => !/^(archive|scratch|ai_context)\//.test(f) && !f.endsWith('truth_pass.js'));
const total = {}; let changed = 0;
for (const f of files) {
  const p = path.join(ROOT, f), before = fs.readFileSync(p, 'utf8');
  const { s, n } = transform(before);
  if (s !== before) {
    changed++;
    for (const [k, v] of Object.entries(n)) total[k] = (total[k] || 0) + v;
    if (!DRY) fs.writeFileSync(p, s);
  }
}
// fixed point: a second run must change nothing
for (const f of files) { const p = path.join(ROOT, f), t = fs.readFileSync(p, 'utf8'); if (!DRY && transform(t).s !== t) throw new Error('not idempotent: ' + f); }
console.log((DRY ? '[dry] ' : '') + 'files changed', changed, total);
