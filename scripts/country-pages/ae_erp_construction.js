'use strict';
// /ae/erp/construction/ — PLAN-AE §2 page 6: the near-free sector term.
//
// DATA (ae_read.js, 2026-09-07): construction erp software uae 480/KD5 · construction erp software 170/16 · erp software
//   for construction industry 140/11 — ~800/mo, the softest cluster in the whole UAE export.
// WHAT RANKS (live, 2026-09-07): firstbit.ae (~8,500 words, "2,000+ UAE companies", BOQ costing, subcontractors, retention,
//   progress billing, WPS, equipment, VAT/CIT, no price), xpedeon.com (~2,100, 30+ yrs, 30,000 users, FIDIC, CVR, WPS,
//   reverse charge, EOSB, 4 FAQs, no price), fit.ae Horizon, factserp, ebrsoftware, doforttech — all products, none prices.
//   Parity: 3,400+ words · 10 FAQs · the contractor's ten ledgers named · UAE specifics (VAT on certified work and
//   retention, reverse charge on imports, WPS for site labour, EOSB, FIDIC forms) · buy/build honesty · no office first.
// RULES (PLAN-AE §9): brand palette, image-led, no cinema props; no "audit", no "offshore", no price of ours; own photos;
//   start states under html.ae6-on; JS off = complete page.
//
// DESIGN — SIGNATURE "the tower that rises": five floors stack as progress-billing milestones, each certified value
//   adding a floor; a retention slice (held back) stays hatched until handover releases it.
//   Per section: vendor slabs slide in · the site/office pair wipes toward the middle · ten ledgers fan up like a set
//   of drawings · the buy/build triptych rises · price cards (all "demo") · questions with rules that draw · band drifts.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/erp/construction/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'e6-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
const STOCK = { hero: 'aec2-site-workers-crane', site: 'aec2-workers-hard-hats-site', office: 'aec2-two-women-hard-hats-blueprints', tablet: 'aec2-two-workers-plans-tablet', scaffold: 'aec2-workers-scaffolding-sky', big: 'aec2-large-site-yellow-sheeting', group: 'aec2-workers-group-site', exc: 'aec2-worker-excavator', band: 'ae-cranes-over-skyline' };

// ---------------------------------------------------------------------------------------------
const H1 = 'Construction ERP Software for the UAE, <span>built around certified value, retention and the site that is never near the office.</span>';
const SUB = 'A contractor in the Emirates runs on a BOQ, a set of subcontractor certificates, retention held back, progress bills that carry VAT on the certified value, WPS for site labour, and materials that arrive at a site forty kilometres from the accounts. The vendors ranking for this search sell all of that as modules and none of them publishes a price or says when a spreadsheet is enough. We build custom systems for UAE contractors from an engineering team in Kochi, four hours away, and this page names the ten ledgers a contractor&rsquo;s system must carry and how the UAE rules land on each.';
const ANSWER = 'TechAuditPros builds <strong>construction ERP systems for contractors in Dubai, Abu Dhabi and across the UAE</strong> &mdash; BOQ-based project costing, variations, subcontractor certificates, retention, progress billing with VAT on certified value, WPS payroll for site labour, EOSB accrual, equipment and materials to site, and PINT-AE e-invoicing &mdash; from an engineering team in Kochi, India, four hours from Dubai. No UAE office, said first. &ldquo;Construction ERP software UAE&rdquo; is searched 480 times a month at a difficulty of five; the products ranking for it (2,000 UAE companies, thirty years, FIDIC support) are real and none prices itself. For a subcontractor with one crew, a good spreadsheet and the accounting package you have is enough; we say so.';

const FLOORS = [
  ['Mobilisation', '10%', 'advance against the bank guarantee'],
  ['Substructure', '25%', 'certified by the consultant, VAT on the certified value'],
  ['Superstructure', '30%', 'variations priced and approved, or absorbed'],
  ['MEP &amp; finishes', '25%', 'subcontractor certificates back-to-back'],
  ['Handover', '10%', 'retention released at DLP end'],
];

const VENDORS = [
  ['2,000+ UAE companies &middot; 8,500 words', 'the UAE product ranking first: BOQ costing, subcontractors, retention, progress billing, WPS, equipment; no price'],
  ['30+ years &middot; 30,000 users &middot; FIDIC', 'an international construction ERP with a UAE page: CVR, reverse charge on imports, EOSB; four FAQs; no price'],
  ['&ldquo;Request a demo&rdquo;', 'what every other UAE construction ERP page publishes instead of a number'],
];

const LEDGERS = [
  ['BOQ &amp; estimate', 'The tender BOQ as the cost baseline, rates by trade, and the estimate that becomes the budget the day the LOA arrives.'],
  ['Variations', 'Priced, submitted, approved or rejected &mdash; with the paper trail the consultant will ask for six months later.'],
  ['Subcontractor certificates', 'Back-to-back with the main certificate, retention deducted, advances recovered, WPS evidence attached.'],
  ['Retention', 'Held at 5&ndash;10% on every certificate, tracked per contract, released at DLP end &mdash; a number, not a memory.'],
  ['Progress billing', 'Interim payment applications from certified quantities, VAT at 5% on the certified value, PINT-AE e-invoice on approval.'],
  ['Materials to site', 'Purchase to site, not to store; delivery notes against the BOQ item; wastage visible per project.'],
  ['Equipment', 'Owned and hired plant charged to the project by the hour or day; idle time shown, not hidden.'],
  ['Site labour &amp; WPS', 'Timesheets by project and trade, WPS SIF files on time, EOSB accruing per worker.'],
  ['Cost value reconciliation', 'Cost to date against certified value against budget, per project, every month &mdash; the report the bank asks for.'],
  ['Cash', 'Certified but unpaid, retention receivable, subcontractor payable, bank guarantees outstanding. The number that decides whether the next site opens.'],
];

const CHECK = [
  ['Show me a progress bill from BOQ to PINT-AE, with retention deducted.', 'In the demo, with a real contract. If the VAT is calculated on the gross before retention, ask again.'],
  ['How do variations reach the costing?', 'If the answer is a spreadsheet beside the system, the system does not do variations.'],
  ['Can a site engineer enter a delivery from the site?', 'On a phone, offline, forty kilometres from the office. Otherwise the stock is wrong by lunchtime.'],
  ['How is subcontractor retention tracked back-to-back?', 'Per certificate, per contract, released by date &mdash; not in the subcontractor&rsquo;s memory.'],
  ['What happens on day fifteen of the guarantee?', 'Ask what &ldquo;implemented&rdquo; means in the refund clause, and who does the migration from your current sheets.'],
  ['Will you tell me a spreadsheet is enough?', 'For a one-crew subcontractor, it is. Anyone who never says so is selling.'],
];

const FAQS = [
  { q: 'Do you have an office in the UAE?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight from Dubai, ninety minutes apart on the clock, the same working week. Construction systems get a kick-off visit, a staging environment you can log into every week, and a written monthly report. If you need a vendor with a Dubai support desk on call, several rank for this search; we will say so.' },
  { q: 'What does construction ERP cost in the UAE?', a: 'None of the vendors ranking for &ldquo;construction ERP software UAE&rdquo; publishes a price; every one asks for a demo. General UAE ERP pricing runs per user per month (a Dubai reseller lists Odoo at about $20, Dynamics 365 at $95, NetSuite at $99), with construction modules and implementation on top. We quote a fixed scope after walking one real contract from LOA to final account with you.' },
  { q: 'How is VAT handled on progress billing and retention?', a: 'VAT at 5% applies on the certified value invoiced on each interim payment application; retention is deducted from the gross before payment and the VAT treatment on retention follows the FTA&rsquo;s rules on the date of supply for retention payments, which the system must apply rather than a person remembering. Imported materials may fall under the reverse charge. We point you at the FTA for the current text and build the system to read the rates from configuration.' },
  { q: 'Does the system handle subcontractor certificates and retention back-to-back?', a: 'Yes. Subcontractor certificates are raised against the main certificate for the same period, retention deducted at the contract rate, advances recovered, and WPS evidence attached where site labour is involved; retention receivable and payable are shown per contract with release dates.' },
  { q: 'Can site staff use it from site?', a: 'Yes, on a phone, with offline capture for deliveries, timesheets and progress photos that sync when the connection returns. A construction system that lives only in the office is a set of accounts, not an ERP.' },
  { q: 'Does it support FIDIC forms?', a: 'The commercial logic FIDIC contracts need &mdash; interim payment applications, variations, extensions of time as records, retention and performance security tracking &mdash; is built in; the contract documents themselves remain your consultant&rsquo;s. One international vendor ranking here sells FIDIC support as a module; we treat it as the default shape of a UAE contract.' },
  { q: 'What about WPS and EOSB for site labour?', a: 'Timesheets by project and trade feed payroll; WPS SIF files are generated on MoHRE&rsquo;s timing; end-of-service benefit accrues per worker under UAE Labour Law and shows as a liability in the accounts rather than a surprise at demobilisation.' },
  { q: 'Should a small contractor buy ERP at all?', a: 'A one-crew subcontractor with a handful of live jobs is better served by the accounting package it has, a disciplined BOQ spreadsheet per job and a WPS bureau. The system earns its place when there are several concurrent contracts, subcontractors below you, retention in both directions and a bank asking for cost value reconciliation.' },
  { q: 'Buy a product or build?', a: 'Buy when the contracts are standard and a product ranking here passes the test: one progress bill from BOQ to PINT-AE with retention deducted, in the demo, with your data. Build when the way you cost, certify or subcontract is unusual and demos keep ending in &ldquo;we can configure that&rdquo;. We build; we still say &ldquo;buy&rdquo; when it is true.' },
  { q: 'What happens if we stop?', a: 'You keep everything: the code, the database, the documentation and the plan. No notice period measured in quarters, no data held hostage.' },
];

// ---------------------------------------------------------------------------------------------
const HERO = [
  '<section class="e6h" id="e6-hero" aria-label="Construction ERP software for the UAE">',
  '  <div class="e6h-plate">' + img(STOCK.hero, 'A construction site with workers and a crane', '100vw', 'e6-img', true) + '</div>',
  '  <div class="container e6h-grid">',
  '    <div class="e6h-text">',
  '      <p class="eyebrow">Construction ERP &middot; UAE &middot; BOQ &middot; retention &middot; progress billing &middot; WPS</p>',
  '      <h1>' + H1 + '</h1>',
  '      <p class="e6h-sub">' + SUB + '</p>',
  '      <div class="e6h-ctas"><a class="e6-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="e6-btn ghost" href="#e6-ledgers">The ten ledgers &darr;</a></div>',
  '    </div>',
  '    <div class="e6h-tower" role="img" aria-label="A tower rising floor by floor as progress-billing milestones, with retention held back until handover">',
  '      <div class="floors">' + FLOORS.slice().reverse().map(([n, pct, note], i) => '<div class="fl" style="--d:' + (FLOORS.length - 1 - i) + '"><b>' + n + '</b><span>' + pct + '</span><i>' + note + '</i></div>').join('') + '</div>',
  '      <div class="ret"><span>retention 5&ndash;10%</span><em>held until DLP end</em></div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const head = (eyebrow, title, lede) => '      <div class="e6s-head"><p class="eyebrow">' + eyebrow + '</p><h2 class="e6s-h2">' + title + '</h2>' + (lede ? '<p class="e6s-lede">' + lede + '</p>' : '') + '</div>';

const S1 = [
  '<section class="e6s" id="e6-vendors" aria-label="What ranks">',
  '  <div class="container e6s-two">',
  '    <div>',
  head('What ranks', 'Four hundred and eighty contractors a month search for this. Almost nobody has written them a page.', '&ldquo;Construction ERP software UAE&rdquo; has a keyword difficulty of five &mdash; the softest term in the whole UAE export &mdash; and the pages ranking for it are product vendors: one with two thousand UAE companies and eight thousand words, one with thirty years and FIDIC in the module list, and a row of &ldquo;request a demo&rdquo; buttons. They are real products. What they do not do is explain how the UAE rules land on a contractor&rsquo;s books, or say when a spreadsheet is enough.'),
  '      <div class="e6s-slabs">' + VENDORS.map(([b, by], i) => '<div class="sl" style="--d:' + i + '"><b>' + b + '</b><span>' + by + '</span></div>').join('') + '</div>',
  '    </div>',
  '    <figure class="e6s-side">' + img(STOCK.group, 'A group of construction workers around a site', '(max-width:860px) 100vw, 40vw') + '<figcaption>The people who will actually enter the data. Design for them, not for the demo.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S2 = [
  '<section class="e6s dark" id="e6-siteoffice" aria-label="The site and the office">',
  '  <div class="container">',
  head('Site and office', 'The site is forty kilometres from the accounts. That distance is the whole problem.', 'Every construction system fails at the same point: the delivery note is on site, the invoice is in the office, and the two meet a month later in a spreadsheet. A contractor&rsquo;s system has to be entered from the site &mdash; on a phone, offline, by a foreman in a hard hat &mdash; and read in the office the same afternoon.'),
  '  </div>',
  '  <div class="e6s-pair">',
  '    <figure class="half l">' + img(STOCK.site, 'Construction workers in hard hats and safety vests on site', '(max-width:860px) 100vw, 50vw') + '<figcaption><b>The site</b><span>Deliveries, timesheets, progress photos, variations spotted &mdash; captured where they happen.</span></figcaption></figure>',
  '    <figure class="half r">' + img(STOCK.office, 'Two women in hard hats discussing blueprints', '(max-width:860px) 100vw, 50vw') + '<figcaption><b>The office</b><span>Certificates, retention, VAT, WPS, the bank&rsquo;s CVR &mdash; read from the same record, the same day.</span></figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S3 = [
  '<section class="e6s alt" id="e6-ledgers" aria-label="The ten ledgers">',
  '  <div class="container e6s-two rev">',
  '    <figure class="e6s-side tall">' + img(STOCK.tablet, 'Two construction workers reviewing plans on a tablet', '(max-width:860px) 100vw, 40vw') + '<figcaption>Ten ledgers, one record. The drawings changed; so should the numbers.</figcaption></figure>',
  '    <div>',
  head('The ten ledgers', 'Ten things a UAE contractor&rsquo;s system has to carry, from LOA to final account.', 'Vendors list modules. A contractor thinks in ledgers &mdash; the ten numbers that decide whether the next site opens. Here they are, with the UAE rule that lands on each.'),
  '      <ol class="e6s-fan">' + LEDGERS.map(([h, p], i) => '<li style="--d:' + i + '"><b>' + String(i + 1).padStart(2, '0') + '</b><div><h3>' + h + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S4 = [
  '<section class="e6s" id="e6-uae" aria-label="The UAE rules on a contractor">',
  '  <div class="container e6s-two">',
  '    <div>',
  head('The UAE rules', 'Where VAT, WPS and the reverse charge land on a contractor, specifically.', 'Generic ERP pages say &ldquo;VAT-compliant&rdquo;. A contractor needs four specific things to be right, and a system that gets them wrong produces FTA penalties and a WPS block on the same month.'),
  '      <ul class="e6s-rules"><li><b>VAT on certified value.</b> 5% on each interim payment application, on what the consultant certified, with retention handled per the FTA&rsquo;s date-of-supply rules for retention payments.</li><li><b>Reverse charge on imports.</b> Materials and plant imported for the project self-accounted in the return, not paid twice or missed.</li><li><b>WPS for site labour.</b> Timesheets by project feed the SIF file on MoHRE&rsquo;s timing; a late file blocks new visas across the company, not just the site.</li><li><b>EOSB accrual.</b> Gratuity accrues per worker under UAE Labour Law and is a liability in the accounts from month one, not a shock at demobilisation.</li><li><b>PINT-AE e-invoicing.</b> Progress bills leave the system as structured invoices through an accredited provider, Phase 2 from July 2026 per current guidance.</li><li><b>Free zone and mainland.</b> A JAFZA-registered contractor invoicing a mainland developer needs the right entity and treatment on every document.</li></ul>',
  '      <p class="e6s-p">Rates, thresholds and dates move; the system reads them from configuration and we point you at the FTA and MoHRE for the current text. The compliance ledger for UAE systems in general is on the <a href="/ae/erp/">ERP page</a>.</p>',
  '    </div>',
  '    <figure class="e6s-side">' + img(STOCK.scaffold, 'Workers on scaffolding against a clear blue sky', '(max-width:860px) 100vw, 40vw') + '<figcaption>Every worker on this scaffold is a WPS line, an EOSB accrual and a timesheet against a BOQ item.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S5 = [
  '<section class="e6s dark" id="e6-buy" aria-label="Buy, build, or a spreadsheet">',
  '  <div class="container e6s-two rev">',
  '    <figure class="e6s-side short">' + img(STOCK.exc, 'A worker in a hard hat beside an excavator', '(max-width:860px) 100vw, 40vw') + '<figcaption>One crew, a few live jobs: a disciplined spreadsheet beats a system nobody enters.</figcaption></figure>',
  '    <div>',
  head('Spreadsheet, product, or build', 'The three honest answers, in the order we give them.', 'We build custom systems, which is a bias. So here is the order we actually use on the first call with a contractor.'),
  '      <div class="e6s-trip"><div class="tp" style="--d:0"><span class="k">A spreadsheet</span><h3>One crew, a handful of jobs, no subcontractors below you.</h3><p>Keep the accounting package, run one disciplined BOQ sheet per job, use a WPS bureau. The system earns its place later.</p></div><div class="tp" style="--d:1"><span class="k">A product</span><h3>Several concurrent contracts, standard forms, retention both ways.</h3><p>The products ranking here, tested on one progress bill from BOQ to PINT-AE with retention deducted &mdash; in the demo, with your contract. If it needs a &ldquo;localisation partner&rdquo; for that, keep looking.</p></div><div class="tp hi" style="--d:2"><span class="k">A build</span><h3>The way you cost, certify or subcontract is the reason you are still on sheets.</h3><p>Unusual back-to-back terms, plant charged your way, a group of entities across free zones, a bank that wants CVR in its own format. A system built around the process stops the workarounds.</p></div></div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S6 = [
  '<section class="e6s alt" id="e6-cost" aria-label="What it costs">',
  '  <div class="container e6s-two">',
  '    <div>',
  head('What it costs', 'Nobody ranking for this search publishes a price. Here is what moves it.', 'Every construction ERP page in the UAE ends in a demo request. General UAE ERP pricing, as a Dubai reseller lists it, runs $20&ndash;$99 per user per month for the global products, before construction modules and implementation. Ours comes after walking one real contract with you, and these four things move it.'),
  '      <div class="e6s-drivers">' + [['Concurrent contracts and entities', 'One company, five sites is one system. Three entities across two free zones with a JV is another.'], ['Who enters from site', 'Every site engineer with a phone is a user; per-user products charge for each. Model the seats at your busiest month.'], ['The subcontractor layer', 'Back-to-back certificates, retention both ways and WPS evidence for subcontracted labour are where products start needing configuration.'], ['The bank&rsquo;s report', 'If a financier wants CVR in its own format every month, the system either produces it or someone rebuilds it in Excel forever.']].map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '    </div>',
  '    <figure class="e6s-side short">' + img(STOCK.big, 'Workers on a large construction site with yellow sheeting', '(max-width:860px) 100vw, 40vw') + '<figcaption>Count the seats at the busiest month, not the quiet one the demo was booked in.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S7 = [
  '<section class="e6s" id="e6-check" aria-label="Before you sign">',
  '  <div class="container">',
  head('Before you sign', 'Six questions for any construction ERP vendor in the UAE &mdash; including one four hours away.', 'Ask them in the demo, with your own contract on the screen.'),
  '    <ol class="e6s-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="e6s-band" aria-label="Start on WhatsApp">',
  '  <div class="e6s-bandfig">' + img(STOCK.band, 'Construction cranes towering over a city skyline', '100vw') + '</div>',
  '  <div class="container e6s-bandtext"><p class="eyebrow">No office in the Emirates</p><h2 class="e6s-h2">Walk one contract with us, LOA to final account.</h2><p>Message us on WhatsApp or book a call. We will tell you whether the answer is a spreadsheet, a product or a build &mdash; and show you the progress bill either way.</p><a class="e6-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_erp_construction.js : "the tower that rises" ================= */
  .e6-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .e6-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; } .e6-btn:hover{ background:var(--orange-dark); } .e6-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }
  .e6h{ position:relative; min-height:84svh; background:var(--navy-deep); color:#fff; overflow:hidden; display:grid; align-items:center; }
  .e6h-plate{ position:absolute; inset:0; } .e6h-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.94) 0%, rgba(11,32,54,.75) 50%, rgba(11,32,54,.35) 100%); }
  .e6h-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,60px); align-items:end; padding:clamp(100px,14vh,160px) 0 clamp(56px,8vh,90px); }
  @media (min-width:900px){ .e6h-grid{ grid-template-columns:7fr 5fr; } }
  .e6h .eyebrow{ color:rgba(255,255,255,.7); margin:0 0 14px; }
  .e6h h1{ font-size:clamp(1.7rem,3.7vw,3.3rem); line-height:1.06; letter-spacing:-.02em; margin:0 0 16px; color:#fff; max-width:26ch; } .e6h h1 span{ color:var(--orange); }
  .e6h-sub{ max-width:66ch; color:rgba(255,255,255,.82); font-size:clamp(.96rem,1.12vw,1.08rem); line-height:1.65; margin:0 0 20px; } .e6h-ctas{ display:flex; gap:12px; flex-wrap:wrap; }
  .e6h-tower{ position:relative; display:grid; gap:6px; align-content:end; }
  .e6h-tower .floors{ display:grid; gap:6px; }
  .e6h-tower .fl{ background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.28); border-radius:6px; padding:12px 14px; display:grid; grid-template-columns:1fr auto; gap:2px 12px; color:#fff; transform-origin:bottom center; }
  .e6h-tower .fl b{ font-size:.95rem; } .e6h-tower .fl span{ font-family:var(--font-mono); color:var(--orange); font-weight:700; } .e6h-tower .fl i{ grid-column:1 / -1; font-style:normal; font-size:.76rem; color:rgba(255,255,255,.7); }
  .e6h-tower .ret{ display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:6px; border:1px dashed rgba(255,255,255,.5); font-family:var(--font-mono); font-size:.74rem; letter-spacing:.06em; color:rgba(255,255,255,.85); background:repeating-linear-gradient(-45deg, rgba(217,83,30,.25) 0 6px, transparent 6px 12px); }
  .e6h-tower .ret em{ font-style:normal; color:rgba(255,255,255,.6); }
  .e6s{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:var(--paper); } .e6s.dark{ background:var(--navy-deep); color:#fff; } .e6s.alt{ background:var(--paper-alt); }
  .e6s-head{ max-width:66ch; margin-bottom:clamp(22px,3vw,40px); } .e6s-head .eyebrow{ margin:0 0 10px; } .e6s.dark .eyebrow, .e6s-band .eyebrow{ color:rgba(255,255,255,.7); }
  .e6s-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); } .e6s.dark .e6s-h2, .e6s-band .e6s-h2{ color:#fff; }
  .e6s-lede, .e6s-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; } .e6s.dark .e6s-lede{ color:rgba(255,255,255,.8); } .e6s-p a{ color:var(--orange); }
  .e6s-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; } @media (min-width:860px){ .e6s-two{ grid-template-columns:7fr 5fr; } .e6s-two.rev{ grid-template-columns:5fr 7fr; } }
  .e6s-side{ margin:0; position:relative; aspect-ratio:4/5; overflow:hidden; border-radius:14px; } .e6s-side.short{ aspect-ratio:16/10; } .e6s-side.tall{ aspect-ratio:3/4; }
  .e6s-side figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  .e6s-slabs{ display:grid; gap:12px; margin-top:18px; } .sl{ background:#fff; border:1px solid var(--line); border-left:6px solid var(--navy-deep); border-radius:8px; padding:14px 16px; }
  .sl b{ display:block; font-family:var(--font-mono); font-size:.86rem; color:var(--ink); margin-bottom:6px; } .sl span{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }
  .e6s-pair{ width:100vw; max-width:100vw; margin:clamp(22px,3vw,40px) 0 0 calc(50% - 50vw); display:grid; grid-template-columns:1fr; gap:4px; background:var(--navy-deep); } @media (min-width:760px){ .e6s-pair{ grid-template-columns:1fr 1fr; } }
  .e6s-pair .half{ margin:0; position:relative; aspect-ratio:16/10; overflow:hidden; } .e6s-pair .half::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(11,32,54,.85) 0%, rgba(11,32,54,.1) 55%); }
  .e6s-pair figcaption{ position:absolute; z-index:2; left:clamp(16px,3vw,40px); right:clamp(16px,3vw,40px); bottom:clamp(16px,3vw,36px); color:#fff; } .e6s-pair figcaption b{ display:block; font-size:1.2rem; margin-bottom:6px; } .e6s-pair figcaption span{ font-size:.92rem; line-height:1.5; color:rgba(255,255,255,.85); }
  .e6s-fan{ list-style:none; margin:0; padding:0; display:grid; gap:8px; } .e6s-fan li{ display:grid; grid-template-columns:40px 1fr; gap:12px; padding:12px 14px; background:#fff; border:1px solid var(--line); border-radius:8px; transform-origin:left bottom; }
  .e6s-fan b{ font-family:var(--font-mono); color:var(--orange); } .e6s-fan h3{ margin:0 0 4px; font-size:1rem; color:var(--ink); } .e6s-fan p{ margin:0; font-size:.88rem; line-height:1.5; color:var(--ink-soft); }
  .e6s-rules{ margin:0 0 14px; padding:0 0 0 18px; line-height:1.6; color:var(--ink-soft); } .e6s-rules li{ margin-bottom:10px; } .e6s-rules b{ color:var(--ink); }
  .e6s-trip{ display:grid; gap:14px; } .tp{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); border-radius:12px; padding:20px; color:#fff; } .tp.hi{ background:var(--orange); border-color:var(--orange); }
  .tp .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.75); } .tp h3{ margin:6px 0 8px; font-size:1.1rem; } .tp p{ margin:0; font-size:.92rem; line-height:1.6; color:rgba(255,255,255,.85); }
  .e6s-drivers{ display:grid; gap:14px; } .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; } .drv h3{ margin:0; font-size:1.02rem; color:var(--ink); } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:var(--ink-soft); }
  .e6s-qs{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr; gap:6px 32px; } @media (min-width:760px){ .e6s-qs{ grid-template-columns:1fr 1fr; } }
  .e6s-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; position:relative; } .e6s-qs li::after{ content:''; position:absolute; left:0; right:0; bottom:0; height:1px; background:var(--line-strong); transform-origin:left center; }
  .e6s-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; } .e6s-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); } .e6s-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  .e6s-band{ position:relative; background:var(--navy-deep); color:#fff; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; } .e6s-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; } .e6s-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.88) 0%, rgba(11,32,54,.5) 50%, rgba(11,32,54,.2) 100%); }
  .e6s-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); } .e6s-bandtext p{ color:rgba(255,255,255,.8); max-width:48ch; margin:0 0 18px; } @media (max-width:700px){ .e6s-bandfig{ aspect-ratio:4/5; } }
  /* motion */
  html.ae6-on .e6h-text > *{ opacity:0; transform:translateY(14px); } html.ae6-on .e6h.lit .e6h-text > *{ animation:e6In .7s cubic-bezier(.2,.7,.2,1) forwards; } html.ae6-on .e6h.lit .e6h-text > *:nth-child(2){ animation-delay:.12s; } html.ae6-on .e6h.lit .e6h-text > *:nth-child(3){ animation-delay:.24s; } html.ae6-on .e6h.lit .e6h-text > *:nth-child(4){ animation-delay:.36s; }
  @keyframes e6In{ to{ opacity:1; transform:none; } }
  html.ae6-on .e6h-tower .fl{ opacity:0; transform:scaleY(0); } html.ae6-on .e6h.lit .e6h-tower .fl{ animation:e6Floor .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.5s + var(--d) * .3s); } @keyframes e6Floor{ to{ opacity:1; transform:none; } }
  html.ae6-on .e6h-tower .ret{ opacity:0; } html.ae6-on .e6h.lit .e6h-tower .ret{ opacity:1; transition:opacity .5s linear 2.2s; }
  html.ae6-on .e6s-head .eyebrow, html.ae6-on .e6s-head .e6s-h2, html.ae6-on .e6s-head .e6s-lede{ opacity:0; transform:translateY(12px); } html.ae6-on .e6s-head.lit .eyebrow{ animation:e6In .5s ease forwards; } html.ae6-on .e6s-head.lit .e6s-h2{ animation:e6In .6s cubic-bezier(.2,.7,.2,1) .1s forwards; } html.ae6-on .e6s-head.lit .e6s-lede{ animation:e6In .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  html.ae6-on .e6s-side .e6-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.ae6-on .e6s-side.lit .e6-img{ transform:none; } html.ae6-on .e6s-side figcaption{ opacity:0; } html.ae6-on .e6s-side.lit figcaption{ opacity:1; transition:opacity .5s linear .6s; }
  html.ae6-on .sl{ opacity:0; transform:translateX(-30px); } html.ae6-on .e6s-slabs.lit .sl{ animation:e6In .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.ae6-on .e6s-pair .half.l .e6-img{ clip-path:inset(0 100% 0 0); } html.ae6-on .e6s-pair .half.r .e6-img{ clip-path:inset(0 0 0 100%); } html.ae6-on .e6s-pair.lit .half .e6-img{ animation:e6Wipe 1s cubic-bezier(.3,0,.2,1) forwards; } html.ae6-on .e6s-pair.lit .half.r .e6-img{ animation-delay:.15s; } @keyframes e6Wipe{ to{ clip-path:inset(0); } }
  html.ae6-on .e6s-pair figcaption{ opacity:0; } html.ae6-on .e6s-pair.lit figcaption{ opacity:1; transition:opacity .5s linear 1s; }
  html.ae6-on .e6s-fan li{ opacity:0; transform:rotate(-3deg) translateY(10px); } html.ae6-on .e6s-fan.lit li{ animation:e6Fan .5s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .08s); } @keyframes e6Fan{ to{ opacity:1; transform:none; } }
  html.ae6-on .e6s-rules li{ opacity:0; transform:translateX(-10px); } html.ae6-on .e6s-rules.lit li{ animation:e6In .45s ease forwards; animation-delay:calc(var(--d, 0) * .1s); }
  html.ae6-on .tp{ opacity:0; transform:translateY(16px); } html.ae6-on .e6s-trip.lit .tp{ animation:e6In .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .18s); }
  html.ae6-on .drv{ opacity:0; transform:translateY(14px); } html.ae6-on .e6s-drivers.lit .drv{ animation:e6In .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae6-on .e6s-qs li::after{ transform:scaleX(0); } html.ae6-on .e6s-qs.lit li::after{ animation:e6Rule .7s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .12s); } @keyframes e6Rule{ to{ transform:scaleX(1); } }
  html.ae6-on .e6s-qs li > *{ opacity:0; } html.ae6-on .e6s-qs.lit li > *{ opacity:1; transition:opacity .5s linear calc(.2s + var(--d) * .12s); }
  @supports (animation-timeline: view()){ .e6s-bandfig .e6-img{ animation:e6Drift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; } @keyframes e6Drift{ from{ transform:scale(1.14) translateY(-4%); } to{ transform:scale(1.14) translateY(4%); } } }
  @media (prefers-reduced-motion: reduce){ html.ae6-on .e6h-text > *, html.ae6-on .e6h-tower .fl, html.ae6-on .e6h-tower .ret, html.ae6-on .e6s-head .eyebrow, html.ae6-on .e6s-head .e6s-h2, html.ae6-on .e6s-head .e6s-lede, html.ae6-on .e6s-side .e6-img, html.ae6-on .e6s-side figcaption, html.ae6-on .sl, html.ae6-on .e6s-pair .half .e6-img, html.ae6-on .e6s-pair figcaption, html.ae6-on .e6s-fan li, html.ae6-on .e6s-rules li, html.ae6-on .tp, html.ae6-on .drv, html.ae6-on .e6s-qs li::after, html.ae6-on .e6s-qs li > *, .e6s-bandfig .e6-img{ opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; } }
`;
const JS = `
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('ae6-on');
    var rules = document.querySelectorAll('.e6s-rules li'); for (var r = 0; r < rules.length; r++) rules[r].style.setProperty('--d', r);
    var frames = document.querySelectorAll('.e6h, .e6s-head, .e6s-side, .e6s-slabs, .e6s-pair, .e6s-fan, .e6s-rules, .e6s-trip, .e6s-drivers, .e6s-qs');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"'); s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"'); s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];
s = L.setHead(s, {
  title: 'Construction ERP Software UAE | BOQ, Retention, Progress Billing with VAT, WPS | TechAuditPros',
  ogTitle: 'Construction ERP software for the UAE &mdash; built around certified value, retention and the site',
  desc: 'Construction ERP for UAE contractors: BOQ costing, variations, subcontractor certificates back-to-back, retention, progress billing with VAT on certified value, WPS for site labour, EOSB, PINT-AE e-invoicing. The ten ledgers a contractor must carry, and when a spreadsheet is enough. From a Kochi team four hours away.',
  url: URL, hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/ae/erp/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', 'https://techauditpros.com/ae/'], ['ERP Software', 'https://techauditpros.com/ae/erp/'], ['Construction', URL]]),
  L.serviceSchema({ name: 'Construction ERP Software for the UAE', desc: 'Custom ERP for UAE contractors: BOQ costing, variations, subcontractor certificates, retention, progress billing with VAT, WPS payroll, EOSB and PINT-AE e-invoicing, delivered from Kochi.', url: URL, area: 'United Arab Emirates' }),
  L.faqSchema(FAQS),
]);
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, ''); s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, ''); s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');
s = L.setBody(s, [L.answer(ANSWER), S1, S2, S3, S4, S5, S6, S7, BAND, L.faqHtml('city-faq', 'Questions UAE contractors ask', 'Ten straight answers, starting with the office.', FAQS)].join('\n').split('__WA__').join(WA));
s = L.setFinalCta(s, 'Walk one contract with us, from LOA to final account.', 'Takes 60 seconds &middot; UAE contractors &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Dubai'); s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Dubai.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING CONTRACTORS ACROSS THE UAE'); s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Dubai &bull; Abu Dhabi &bull; Sharjah &bull; Mussafah &bull; ICAD &bull; KIZAD &bull; JAFZA &bull; Al Quoz &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'], ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'], ['manage audits and deployments securely', 'manage builds and deployments securely'], ['>SEO Audit Kochi<', '>SEO in Kochi<'], ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.']]) if (s.includes(from)) s = s.split(from).join(to);
{ const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt); }
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" on construction page: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on construction page');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3200) throw new Error('only ' + words + ' words; parity needs 3,200+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.split(path.sep).join('/').endsWith('/ae/erp/construction/index.html'));
  const used = []; for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<div class="fl"', FLOORS.length); L.must(s, '<div class="sl"', VENDORS.length); L.must(s, 'class="e6s-fan"', 1);
fs.mkdirSync(path.join(L.REPO, 'ae', 'erp', 'construction'), { recursive: true });
L.write('ae/erp/construction/index.html', s);
console.log('/ae/erp/construction/ written — the tower that rises, site|office pair, ten ledgers, UAE rules, spreadsheet/product/build, 10 FAQs');
