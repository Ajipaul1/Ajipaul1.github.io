'use strict';
// /ae/erp/ — PLAN-AE §2 page 5: the compliance page.
//
// DATA (ae_read.js, 2026-09-07): erp software uae 590/KD22 · erp and accounting software 590/36 · erp software dubai
//   480/33 · erp solution providers in uae 390/25 · supply chain management erp software 390/22 · erp system uae 260/34 ·
//   erp system in uae 260/18 · erp software companies in uae 260/16 · erp uae 260/31 · manufacturing erp software 210/26 ·
//   best erp software in uae 170/11 · erp solution providers in dubai 210/30 — ~4,000/mo.
// WHAT RANKS (live, 2026-09-07): gear-up.ae (~8,500 words, "1,247+ UAE clients", 14-day implementation or refund,
//   "60–70% lower than SAP/Oracle", VAT/CT/PINT-AE/WPS/EOSB/free-zone, Arabic RTL, WhatsApp ×5, no price),
//   facts.ae (~3,500, 24 yrs, FTA-accredited e-invoicing ASP, Microsoft-certified, 80% of Al Aweer market, no price),
//   sowaanerp.ae (~8,500, 12+ yrs, ISO, no price), truebays top-10 (Dynamics ~$95/user, NetSuite ~$99, Odoo $20/user,
//   QuickBooks ~$150/mo). Every one is a PRODUCT vendor; every one names compliance as features; none says when not to buy.
//   Parity: 4,000+ words · 12 FAQs · compliance item by item with the FTA/MoF as sources · prices attributed (USD per user,
//   the SAP comparison) · the honest buy / build / not-yet answer · no office said first · WhatsApp CTA.
// RULES (PLAN-AE §9): brand palette, image-led, no cinema props; no "audit" as a service word, no "offshore", no price of
//   ours; own photos (asserted); start states under html.ae5-on; JS off = complete page.
//
// DESIGN — nothing from the other UAE pages, /in/ or /uk/:
//   SIGNATURE "the ledger that balances": a ledger card where nine compliance rows type in across three columns (the
//   system does · a person decides · source), then a totals rule draws and the three column bars settle to one line.
//   Per section: vendor index cards riffle in · sector pallets are placed into the grid (translateY + settle) · the
//   buy/build/not-yet triptych rises · an e-invoice document travels a four-node pipeline (invoice → ASP → FTA → buyer)
//   · price rows slide with their sources · questions with rules that draw · an aerial band that drifts.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/erp/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'e5-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
const STOCK = {
  hero: 'aee-dubai-twilight-towers', vendors: 'aee-dubai-waterfront-highrises', ledger: 'aee-hands-tax-forms-laptop',
  p1: 'aee-forklift-box-warehouse', p2: 'aee-man-forklift-box', p3: 'aee-forklift-stack-boxes', p4: 'aee-dubai-dense-cityscape',
  buy: 'aee-woman-computer-documents', flow: 'aee-man-warehouse-forklift', cost: 'aee-warehouse-pallets-wide', check: 'aee-two-people-reviewing-documents', band: 'aee-dubai-aerial-towers',
};
const PAGE = slug => fs.existsSync(path.join(L.REPO, 'ae', 'erp', slug, 'index.html')) ? '/ae/erp/' + slug + '/' : null;

// ---------------------------------------------------------------------------------------------
const H1 = 'ERP Software for the UAE, <span>with the compliance layer built in &mdash; and an honest word about when not to buy one.</span>';
const SUB = 'Every ERP vendor ranking in the UAE lists VAT, Corporate Tax, e-invoicing and WPS as features, promises fourteen-day implementations or refunds, and never says when a business should keep its accounting package and a spreadsheet. We build custom systems for UAE traders, contractors, workshops and manufacturers &mdash; from an engineering team in Kochi, four hours away &mdash; and this page gives the compliance layer item by item, the published prices with their sources, and the three honest answers: buy, build, or not yet.';
const ANSWER = 'TechAuditPros builds <strong>custom ERP systems for businesses in Dubai, Abu Dhabi and across the UAE</strong> &mdash; stock, orders, purchasing, projects, payroll and job costing in one system of record, with UAE VAT at 5%, Corporate Tax at 9%, PINT-AE e-invoicing through accredited service providers, WPS payroll with SIF files, EOSB accrual and free-zone entity handling built in &mdash; from an engineering team in Kochi, India, four hours from Dubai on the same working week. No UAE office, said first. The vendors ranking for &ldquo;ERP software UAE&rdquo; sell products with fourteen-day guarantees and no published price; a Dubai reseller lists Dynamics 365 at about $95 a user a month, NetSuite at $99 and Odoo at $20. For a stable business under twenty users with standard processes, one of those products &mdash; or the accounting package it already has &mdash; is usually the right answer, and we say so on the first call.';

const VENDORS = [
  ['1,247+ UAE clients &middot; 14 days or refund', 'a UAE vendor ranking first for &ldquo;ERP software UAE&rdquo;; prices itself as &ldquo;60&ndash;70% lower than SAP or Oracle&rdquo;, publishes none'],
  ['24 years &middot; FTA-accredited e-invoicing ASP', 'a Dubai vendor with 80% of one fresh-food market; Microsoft-certified; no published price'],
  ['12+ years &middot; ISO &middot; 6 countries', 'an 8,500-word Dubai vendor page; demo request only'],
  ['$20 &middot; $95 &middot; $99 per user per month', 'Odoo, Dynamics 365 and NetSuite as a Dubai reseller lists them in its top ten; QuickBooks about $150 a month'],
];

const LEDGER = [
  ['VAT 5%', 'Tax invoice with TRN, per-line VAT, zero-rated and exempt handling, reverse charge, designated zones, VAT201 data from the ledger', 'Which entity and which zone the invoice is raised from', 'FTA'],
  ['Corporate Tax 9%', 'Taxable-income tracking above the threshold, small-business-relief flag, free-zone qualifying income, transfer-pricing records', 'Whether to elect relief; how to classify qualifying income', 'FTA / MoF'],
  ['E-invoicing (PINT-AE)', 'Invoice as PINT-AE JSON through an accredited service provider, validation, status back on the document; Phase 2 mandates from July 2026 per current guidance', 'Which ASP; cancellation vs credit note', 'MoF'],
  ['WPS payroll', 'Salaries computed, SIF file generated, MoHRE timing respected, bank file issued', 'Deductions and disputes', 'MoHRE'],
  ['EOSB (gratuity)', 'Accrued monthly by contract type and tenure; liability shown in the accounts', 'Settlement on exit; disputes', 'UAE Labour Law'],
  ['Free zone / mainland', 'Entity, licence, zone status and customs treatment carried on every document', 'Which entity trades with whom', 'Zone authority'],
  ['Arabic', 'Bilingual invoices and RTL screens for the people who use them', 'Which documents need it', '&mdash;'],
  ['Customs &amp; re-export', 'HS codes, declarations, landed cost, bonded stock', 'Duty treatment on re-export', 'Dubai Customs'],
  ['Accounting book of record', 'Summarised postings to the accounting package your accountant already uses', 'Chart of accounts; year-end', 'Your accountant'],
];

const SECTORS = [
  { k: 'p1', h: 'Trading &amp; distribution', p: 'Deira, Al Quoz, JAFZA: stock in three godowns, schemes and trade prices, re-export paperwork, a storefront that must read live availability. The largest ERP need in the Emirates and the one products fit worst when the pricing rules are unusual.', alt: 'A forklift lifting a box between warehouse racking', link: null },
  { k: 'p2', h: 'Contracting &amp; construction', p: 'Project costing, subcontractor certificates, retention, progress billing with VAT, WPS for site labour. &ldquo;Construction ERP software UAE&rdquo; is 480 searches a month at a difficulty of five &mdash; almost nobody has written the page.', alt: 'A forklift loading a truck from the loading bay', link: 'construction' },
  { k: 'p3', h: 'Automotive', p: 'Dealers, workshops and parts traders: job cards, parts stock, warranty, the re-export trade in vehicles. &ldquo;Automotive ERP software&rdquo; is 590 searches a month at a difficulty of seven.', alt: 'A forklift carrying a stack of boxes', link: 'automotive' },
  { k: 'p4', h: 'Manufacturing &amp; services', p: 'KIZAD, Sharjah and Ajman units with BOMs, batches and job work; facilities and service firms with contracts and maintenance schedules. Standard enough that a product often fits &mdash; we say so when it does.', alt: 'A dense Dubai cityscape', link: null },
];

const FLOW = ['Invoice raised', 'Accredited service provider', 'FTA platform', 'Buyer receives'];

const COST = [
  ['$20 per user per month', 'Odoo, as a Dubai reseller lists it'],
  ['$95 &ndash; $99 per user per month', 'Dynamics 365 and NetSuite, same list'],
  ['&ldquo;AED 500,000+ for SMEs&rdquo;', 'the SAP comparison a UAE vendor uses to price itself 60&ndash;70% lower'],
  ['&ldquo;Request a demo&rdquo;', 'what the three UAE vendors ranking here publish instead of a number'],
];
const DRIVERS = [
  ['Users, times years', 'Per-user pricing is designed for stable headcounts. Model the seats you will have in three years &mdash; a second shift, a third godown, handhelds for the sales team &mdash; not today&rsquo;s.'],
  ['Which modules are real', 'Accounting and stock are cheap; job costing, customs and multi-entity are where quotes diverge and where products start needing a &ldquo;localisation partner&rdquo;.'],
  ['Migration and clean-up', 'Item masters, customer ledgers and open orders from Tally, Zoho or Excel. Dirty data costs weeks and is never in the quote.'],
  ['Integrations', 'The storefront, the courier, the bank file, the ASP, the accounting package your accountant uses. Each is development; each is where a &ldquo;fourteen-day implementation&rdquo; becomes month four.'],
];

const CHECK = [
  ['Show one invoice go from despatch to PINT-AE to the ledger, with my data.', 'In the demo, not in a slide. A product that needs a &ldquo;localisation partner&rdquo; for this is not UAE-ready.'],
  ['What happens on day fifteen of the fourteen-day guarantee?', 'Ask what &ldquo;implemented&rdquo; means in the refund clause. Usually it means installed, not in use.'],
  ['Which entity and zone does the system think it is?', 'Free-zone and mainland entities, designated zones and re-export all change the tax treatment. If the demo has one company, ask for two.'],
  ['What does a change request cost after go-live?', 'The licence is rarely what hurts. Ask for the rate card for the pricing rule you know they will have to build.'],
  ['Who, by name, does the work &mdash; and where is my data?', 'Two-hundred-person vendors rank here. Ask which three people are yours, where the database lives, and whether you can take it with you.'],
  ['Will you tell me to keep Tally and a spreadsheet?', 'For a stable twelve-person trading firm, that is the right answer. Anyone who never gives it is selling.'],
];

const FAQS = [
  { q: 'Do you have an office in the UAE?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight from Dubai, ninety minutes apart on the clock, the same Monday-to-Friday week. Systems projects get a kick-off visit and a staging environment you can log into every week; if you need a vendor with a Dubai support desk on call, several rank for this search and we will say so.' },
  { q: 'What does ERP software cost in the UAE?', a: 'The UAE vendors ranking for this search publish no prices and ask for a demo. A Dubai reseller lists Odoo at about $20 per user per month, Dynamics 365 at $95 and NetSuite at $99, and QuickBooks Enterprise at about $150 a month; one UAE vendor prices itself as &ldquo;60&ndash;70% lower than SAP or Oracle&rdquo; against an &ldquo;AED 500,000+&rdquo; SAP comparison. Those are their figures, September 2026. We quote a fixed scope after walking one real order through your business.' },
  { q: 'Which UAE compliance does the system handle?', a: 'VAT at 5% with FTA-compliant invoices and VAT201 data; Corporate Tax at 9% including small-business relief and free-zone qualifying income; e-invoicing in the PINT-AE format through accredited service providers, Phase 2 from July 2026 per current Ministry of Finance guidance; WPS payroll with SIF files; EOSB accrual; free-zone versus mainland entities; customs and re-export; and postings to the accounting package your accountant already uses. Thresholds and dates move, so the system reads them from configuration and we point you at the FTA and MoHRE for current values.' },
  { q: 'What is PINT-AE e-invoicing and who needs it?', a: 'The UAE&rsquo;s Peppol-based e-invoicing standard: invoices leave your system as structured data through an accredited service provider, are validated, and reach the buyer and the Federal Tax Authority in one flow. Rollout is phased by business size from July 2026 per current guidance. A system that generates the PDF and asks you to upload it is not e-invoicing.' },
  { q: 'Should I buy Odoo, Dynamics or a UAE product, or build?', a: 'Buy when your processes are standard and your headcount is stable &mdash; Odoo, ERPNext, Dynamics 365 Business Central, NetSuite, or one of the UAE products ranking here, tested on the compliance flow with your own data. Build when the process is the reason you are still on spreadsheets &mdash; unusual pricing rules, multi-entity re-export, a storefront that must read live stock &mdash; and two demos have ended in &ldquo;we can configure that&rdquo;. For a stable business under twenty users, neither: keep the accounting package and add discipline.' },
  { q: 'Do you build ERP for construction companies in the UAE?', a: 'Yes: project costing, subcontractor certificates, retention, progress billing with VAT, WPS for site labour, and the customs side for imported materials. It is the largest sector in the Emirates and one of the least-served searches in the data, so it has its own page.' },
  { q: 'Do you build ERP for automotive businesses?', a: 'Yes: dealer, workshop and parts businesses &mdash; job cards, parts stock across branches, warranty claims, and the re-export trade in vehicles through Dubai. It has its own page as well.' },
  { q: 'Does the system work in Arabic?', a: 'Bilingual where the people using it need it: invoices, statements and RTL screens for Arabic-reading staff and customers; English for the accounts and the reports your accountant reads. The data says 99% of UAE searches for these services are in English, so this page is; the software is not limited to that.' },
  { q: 'Can it connect to our online store?', a: 'Yes, and for traders that is the point: the storefront reads availability, price and lead time from the system that knows, so overselling stops. Shopify, WooCommerce and custom storefronts, with the UAE checkout realities handled on the store side &mdash; the six of them are on our e-commerce page.' },
  { q: 'How long does implementation take?', a: 'Honestly, longer than fourteen days for anything with your data in it. A phased build has one useful module &mdash; usually stock or job costing &mdash; in real use within six to ten weeks, and that is a better test of fit than any demo. Full scope for a multi-entity trader runs three to six months, mostly waiting on clean data.' },
  { q: 'How do I know work is happening each month?', a: 'You log into the staging environment and see what changed; you read the monthly report against the plan; you can ask for the commit history. If a vendor cannot show you the system before go-live, you are being asked to trust the invoice.' },
  { q: 'What happens if we stop?', a: 'You keep everything: the code, the database, the documentation and the plan. No notice period measured in quarters, no data held hostage. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
];

// ---------------------------------------------------------------------------------------------
const HERO = [
  '<section class="e5h" id="e5-hero" aria-label="ERP software for the UAE">',
  '  <div class="e5h-plate">' + img(STOCK.hero, 'The Burj Khalifa and Downtown Dubai towers at twilight', '100vw', 'e5-img', true) + '</div>',
  '  <div class="container e5h-text">',
  '    <p class="eyebrow">UAE ERP &middot; VAT &middot; Corporate Tax &middot; PINT-AE &middot; WPS &middot; EOSB &middot; free zones</p>',
  '    <h1>' + H1 + '</h1>',
  '    <p class="e5h-sub">' + SUB + '</p>',
  '    <div class="e5h-ctas"><a class="e5-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="e5-btn ghost" href="#e5-ledger">The compliance ledger &darr;</a></div>',
  '    <ul class="e5h-facts"><li><b>250+</b> projects</li><li><b>128+</b> active clients</li><li><b>16</b> countries</li><li><b>4.9/5</b> rating</li></ul>',
  '  </div>',
  '</section>',
].join('\n');

const head = (eyebrow, title, lede) => '      <div class="e5s-head"><p class="eyebrow">' + eyebrow + '</p><h2 class="e5s-h2">' + title + '</h2>' + (lede ? '<p class="e5s-lede">' + lede + '</p>' : '') + '</div>';

const S1 = [
  '<section class="e5s" id="e5-vendors" aria-label="What ranks for ERP software UAE">',
  '  <div class="container e5s-two">',
  '    <div>',
  head('What ranks', 'Every page ranking for &ldquo;ERP software UAE&rdquo; is a product, and every one lists compliance as a feature.', 'Twenty-four-year vendors, FTA-accredited service providers, fourteen-day guarantees, Arabic screens, and no published prices. They are real products and some are good. What none of them will tell you is when your business should not buy one, when the accounting package you already have is enough, and what the guarantee means on day fifteen. We build custom systems, which is a side too &mdash; so this page hangs their numbers where you can read them and gives the three honest answers.'),
  '      <div class="e5s-riffle">' + VENDORS.map(([b, by], i) => '<div class="ic" style="--d:' + i + '"><b>' + b + '</b><span>' + by + '</span></div>').join('') + '</div>',
  '    </div>',
  '    <figure class="e5s-side">' + img(STOCK.vendors, 'Dubai waterfront high-rises by day', '(max-width:860px) 100vw, 40vw') + '<figcaption>Every tower on this shore has a vendor in it. The question is what is missing from the demo.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S2 = [
  '<section class="e5s dark" id="e5-ledger" aria-label="The ledger that balances">',
  '  <div class="container">',
  head('The compliance ledger', 'Nine rows a UAE system has to carry, and the one line they must balance to.', 'Vendors list these as features. We treat them as a ledger: for each row, what the system must do without a human, what a person must still decide, and whose rules apply. Values and dates are as published by the FTA, the Ministry of Finance and MoHRE in September 2026; the system reads them from configuration so they can change without a developer.'),
  '    <div class="e5s-two wide">',
  '      <div class="e5s-ledger" role="table" aria-label="UAE compliance ledger">',
  '        <div class="lh" role="row"><span>Item</span><span>The system does</span><span>A person decides</span><span>Source</span></div>',
  ...LEDGER.map(([k, sys, hum, src], i) => '        <div class="lr" role="row" style="--d:' + i + '"><b>' + k + '</b><span>' + sys + '</span><span>' + hum + '</span><i>' + src + '</i></div>'),
  '        <div class="lt" aria-hidden="true"><i class="rule"></i><div class="bars"><span style="--d:0"><i></i><b>VAT</b></span><span style="--d:1"><i></i><b>CT</b></span><span style="--d:2"><i></i><b>WPS</b></span></div><em>one set of books, one number</em></div>',
  '      </div>',
  '      <figure class="e5s-side tall">' + img(STOCK.ledger, 'Hands holding tax forms beside a calculator and laptop', '(max-width:860px) 100vw, 34vw') + '<figcaption>The form is the last step. The system decides whether it is right before anyone prints it.</figcaption></figure>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S3 = [
  '<section class="e5s alt" id="e5-sectors" aria-label="Who this is for">',
  '  <div class="container">',
  head('Who this is for', 'Four kinds of UAE business, and what each one needs the system to be.', 'The vendors ranking here list eighteen industries. These are the four we actually build for in the Emirates, with the first project each tends to need and an honest note where a product fits.'),
  '    <div class="e5s-pallets">' + SECTORS.map((t, i) => { const href = t.link ? PAGE(t.link) : null; return '<article class="pl" style="--d:' + i + '"><figure>' + img(STOCK[t.k], t.alt, '(max-width:700px) 100vw, 46vw') + '</figure><div class="t"><h3>' + t.h + '</h3><p>' + t.p + '</p>' + (t.link ? (href ? '<a class="e5s-link" href="' + href + '">' + (t.link === 'construction' ? 'Construction ERP page' : 'Automotive ERP page') + ' &rarr;</a>' : '<span class="e5s-link soon">' + (t.link === 'construction' ? 'Construction' : 'Automotive') + ' page &mdash; next</span>') : '') + '</div></article>'; }).join('') + '</div>',
  '  </div>',
  '</section>',
].join('\n');

const S4 = [
  '<section class="e5s" id="e5-buy" aria-label="Buy, build, or not yet">',
  '  <div class="container e5s-two rev">',
  '    <figure class="e5s-side">' + img(STOCK.buy, 'A woman working on a computer and documents at an office desk', '(max-width:860px) 100vw, 40vw') + '<figcaption>The right answer for many UAE businesses is the accounting package she already has, kept clean.</figcaption></figure>',
  '    <div>',
  head('Buy, build, or not yet', 'The three answers no vendor page gives, in the order we give them.', 'We build custom systems. That is a bias, so here is the order we actually use on the first call.'),
  '      <div class="e5s-trip">',
  '        <div class="tp" style="--d:0"><span class="k">Not yet</span><h3>Keep the accounting package. Add discipline.</h3><p>A stable business under about twenty users, one or two entities, standard processes: Zoho Books, QuickBooks or Tally kept clean, a stock count that is believed, a spreadsheet nobody edits without telling the owner. Software does not create discipline; buying it to impose discipline produces a system nobody uses.</p></div>',
  '        <div class="tp" style="--d:1"><span class="k">Buy</span><h3>A product, tested on the compliance flow with your data.</h3><p>Odoo or ERPNext with a capable partner; Dynamics 365 Business Central or NetSuite for multi-entity groups; one of the UAE products ranking here if the sector fit is real. Watch one invoice go from despatch to PINT-AE to the ledger in the demo. Products that need a &ldquo;localisation partner&rdquo; for that are not UAE-ready.</p></div>',
  '        <div class="tp hi" style="--d:2"><span class="k">Build</span><h3>When the process is the reason you are still on spreadsheets.</h3><p>Unusual pricing rules, multi-entity re-export, job work, a storefront that must read live stock &mdash; and two demos that ended in &ldquo;we can configure that&rdquo;. A system built around the process stops the workarounds. It costs more up front and less every year the per-user bill would have grown.</p></div>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S5 = [
  '<section class="e5s dark" id="e5-flow" aria-label="How a UAE e-invoice flows">',
  '  <div class="container e5s-two">',
  '    <div>',
  head('The e-invoice flow', 'From despatch to the FTA in one flow, or it is not e-invoicing.', 'PINT-AE is the UAE&rsquo;s Peppol-based standard: the invoice leaves the system as structured data, passes through an accredited service provider for validation, and reaches the buyer and the Federal Tax Authority without anyone re-keying it. Phase 2 mandates from July 2026 per current Ministry of Finance guidance. Watch this happen in any demo before you sign; a system that produces a PDF and asks you to upload it has not done the work.'),
  '      <div class="e5s-flow" aria-label="Invoice raised, accredited service provider, FTA platform, buyer receives">' + FLOW.map((n, i) => '<div class="nd" style="--d:' + i + '"><i></i><b>' + n + '</b></div>').join('<span class="wire" aria-hidden="true"></span>') + '<em class="doc" aria-hidden="true"></em></div>',
  '      <p class="e5s-p on-dark">What a person still decides: which entity the invoice is raised from, whether a correction is a cancellation or a credit note, and how a rejection from the provider is handled. The system surfaces those as approvals with the clock visible and automates everything around them.</p>',
  '    </div>',
  '    <figure class="e5s-side">' + img(STOCK.flow, 'A man standing in a warehouse beside a forklift', '(max-width:860px) 100vw, 40vw') + '<figcaption>The despatch is where the invoice really starts. Everything after it should be automatic.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S6 = [
  '<section class="e5s alt" id="e5-cost" aria-label="What ERP costs in the UAE">',
  '  <div class="container e5s-two rev">',
  '    <figure class="e5s-side short">' + img(STOCK.cost, 'A large warehouse filled with pallets', '(max-width:860px) 100vw, 40vw') + '<figcaption>Per-user pricing is designed for stable headcounts. Count the seats you will have when this is full.</figcaption></figure>',
  '    <div>',
  head('What it costs', 'What ERP costs in the UAE, from the people who publish a number.', 'Three UAE vendors ranking here publish nothing and ask for a demo; a Dubai reseller lists the global products per user. Here they are, September 2026, and the four things that move any quote &mdash; including ours, which comes after walking one real order through your business.'),
  '      <ol class="e5s-prices">' + COST.map(([p, by], i) => '<li style="--d:' + i + '"><b>' + p + '</b><span>' + by + '</span></li>').join('') + '</ol>',
  '      <div class="e5s-drivers">' + DRIVERS.map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S7 = [
  '<section class="e5s" id="e5-check" aria-label="Before you sign with any ERP vendor in the UAE">',
  '  <div class="container e5s-two">',
  '    <div>',
  head('Before you sign', 'Six questions for any ERP vendor in the UAE &mdash; including one four hours away.', 'They apply to a product demo and to us word for word.'),
  '      <ol class="e5s-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '    </div>',
  '    <figure class="e5s-side">' + img(STOCK.check, 'Two people reviewing documents at a table', '(max-width:860px) 100vw, 40vw') + '<figcaption>Read the refund clause with the person who will run the system, not the person who will sign for it.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="e5s-band" aria-label="Start on WhatsApp">',
  '  <div class="e5s-bandfig">' + img(STOCK.band, 'An aerial view of Dubai towers', '100vw') + '</div>',
  '  <div class="container e5s-bandtext"><p class="eyebrow">No office in the Emirates</p><h2 class="e5s-h2">Walk one real order through your business with us.</h2><p>Message us on WhatsApp or book a call. We will tell you whether the answer is not yet, a product, or a build &mdash; and show you the compliance flow either way.</p><a class="e5-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_erp.js : "the ledger that balances" ================= */
  .e5-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .e5-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .e5-btn:hover{ background:var(--orange-dark); } .e5-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }
  .e5h{ position:relative; min-height:82svh; background:var(--navy-deep); color:#fff; overflow:hidden; display:grid; align-items:center; }
  .e5h-plate{ position:absolute; inset:0; } .e5h-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.94) 0%, rgba(11,32,54,.7) 45%, rgba(11,32,54,.3) 100%); }
  .e5h-text{ position:relative; z-index:2; padding:clamp(100px,14vh,160px) 0 clamp(56px,8vh,100px); }
  .e5h .eyebrow{ color:rgba(255,255,255,.7); margin:0 0 14px; }
  .e5h h1{ font-size:clamp(1.8rem,3.9vw,3.5rem); line-height:1.06; letter-spacing:-.02em; margin:0 0 16px; color:#fff; max-width:26ch; } .e5h h1 span{ color:var(--orange); }
  .e5h-sub{ max-width:66ch; color:rgba(255,255,255,.82); font-size:clamp(.98rem,1.15vw,1.1rem); line-height:1.65; margin:0 0 20px; }
  .e5h-ctas{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
  .e5h-facts{ list-style:none; margin:0; padding:0; display:flex; gap:clamp(14px,3vw,40px); flex-wrap:wrap; font-family:var(--font-mono); font-size:.74rem; letter-spacing:.08em; color:rgba(255,255,255,.65); } .e5h-facts b{ color:#fff; margin-right:6px; }
  .e5s{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:var(--paper); }
  .e5s.dark{ background:var(--navy-deep); color:#fff; } .e5s.alt{ background:var(--paper-alt); }
  .e5s-head{ max-width:66ch; margin-bottom:clamp(22px,3vw,40px); } .e5s-head .eyebrow{ margin:0 0 10px; } .e5s.dark .eyebrow, .e5s-band .eyebrow{ color:rgba(255,255,255,.7); }
  .e5s-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); } .e5s.dark .e5s-h2, .e5s-band .e5s-h2{ color:#fff; }
  .e5s-lede, .e5s-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; } .e5s.dark .e5s-lede, .e5s-p.on-dark{ color:rgba(255,255,255,.8); }
  .e5s-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; }
  @media (min-width:860px){ .e5s-two{ grid-template-columns:7fr 5fr; } .e5s-two.rev{ grid-template-columns:5fr 7fr; } .e5s-two.wide{ grid-template-columns:8fr 4fr; } }
  .e5s-side{ margin:0; position:relative; aspect-ratio:4/5; overflow:hidden; border-radius:14px; } .e5s-side.short{ aspect-ratio:16/10; } .e5s-side.tall{ aspect-ratio:3/4; }
  .e5s-side figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  .e5s-link{ display:inline-block; margin-top:10px; color:var(--orange); font-weight:700; text-decoration:none; } .e5s-link.soon{ color:var(--ink-faint); font-weight:500; font-family:var(--font-mono); font-size:.76rem; letter-spacing:.06em; }
  /* 01 riffle */
  .e5s-riffle{ display:grid; grid-template-columns:1fr; gap:12px; margin-top:18px; } @media (min-width:640px){ .e5s-riffle{ grid-template-columns:1fr 1fr; } }
  .ic{ background:#fff; border:1px solid var(--line); border-left:4px solid var(--orange); border-radius:8px; padding:14px 16px; box-shadow:0 10px 24px rgba(14,42,62,.08); transform-origin:left center; }
  .ic b{ display:block; font-family:var(--font-mono); font-size:.86rem; color:var(--ink); margin-bottom:6px; } .ic span{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }
  /* 02 ledger */
  .e5s-ledger{ background:#fff; color:var(--ink); border-radius:14px; padding:clamp(14px,2vw,24px); box-shadow:0 20px 50px rgba(0,0,0,.35); font-size:.9rem; }
  .e5s-ledger .lh, .e5s-ledger .lr{ display:grid; grid-template-columns:150px 1fr 1fr 110px; gap:12px; padding:10px 0; border-bottom:1px solid var(--line); align-items:start; }
  .e5s-ledger .lh{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); border-bottom:2px solid var(--line-strong); }
  .e5s-ledger .lr b{ color:var(--ink); } .e5s-ledger .lr span{ color:var(--ink-soft); line-height:1.45; } .e5s-ledger .lr i{ font-style:normal; font-family:var(--font-mono); font-size:.7rem; color:var(--ink-faint); }
  .e5s-ledger .lr span, .e5s-ledger .lr b, .e5s-ledger .lr i{ position:relative; }
  .e5s-ledger .lt{ padding-top:14px; display:grid; gap:10px; }
  .e5s-ledger .lt .rule{ display:block; height:3px; background:var(--orange); transform-origin:left center; }
  .e5s-ledger .lt .bars{ display:flex; gap:14px; align-items:flex-end; height:70px; }
  .e5s-ledger .lt .bars span{ flex:1; display:grid; grid-template-rows:1fr auto; align-items:end; gap:4px; } .e5s-ledger .lt .bars i{ display:block; background:var(--navy-deep); border-radius:4px 4px 0 0; height:100%; transform-origin:bottom center; } .e5s-ledger .lt .bars b{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.14em; text-align:center; color:var(--ink-soft); }
  .e5s-ledger .lt .bars span:nth-child(1) i{ height:100%; } .e5s-ledger .lt .bars span:nth-child(2) i{ height:60%; } .e5s-ledger .lt .bars span:nth-child(3) i{ height:80%; }
  .e5s-ledger .lt em{ font-style:normal; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--orange); text-align:right; }
  @media (max-width:760px){ .e5s-ledger .lh{ display:none; } .e5s-ledger .lr{ grid-template-columns:1fr; gap:4px; } .e5s-ledger .lr span::before{ content:attr(data-l); } }
  /* 03 pallets */
  .e5s-pallets{ display:grid; grid-template-columns:1fr; gap:18px; } @media (min-width:700px){ .e5s-pallets{ grid-template-columns:1fr 1fr; } }
  .pl{ background:#fff; border:1px solid var(--line); border-radius:14px; overflow:hidden; } .pl figure{ margin:0; aspect-ratio:16/9; overflow:hidden; } .pl .t{ padding:20px; }
  .pl h3{ margin:0 0 8px; font-size:1.15rem; color:var(--ink); } .pl p{ margin:0; color:var(--ink-soft); line-height:1.6; font-size:.94rem; }
  /* 04 triptych */
  .e5s-trip{ display:grid; gap:14px; }
  .tp{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:20px; } .tp.hi{ background:var(--navy-deep); color:#fff; border-color:var(--navy-deep); }
  .tp .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); } .tp h3{ margin:6px 0 8px; font-size:1.1rem; } .tp p{ margin:0; font-size:.92rem; line-height:1.6; color:var(--ink-soft); } .tp.hi p{ color:rgba(255,255,255,.84); }
  /* 05 flow */
  .e5s-flow{ position:relative; display:grid; grid-template-columns:1fr 24px 1fr 24px 1fr 24px 1fr; align-items:center; gap:0; margin:8px 0 22px; padding:10px 0; }
  .nd{ text-align:center; } .nd i{ display:block; width:46px; height:46px; margin:0 auto 8px; border-radius:50%; background:rgba(255,255,255,.1); border:2px solid rgba(255,255,255,.35); } .nd b{ display:block; font-size:.8rem; line-height:1.3; color:#fff; }
  .e5s-flow .wire{ height:2px; background:rgba(255,255,255,.3); align-self:start; margin-top:22px; transform-origin:left center; }
  .e5s-flow .doc{ position:absolute; left:calc(12.5% - 8px); top:26px; width:16px; height:20px; border-radius:2px; background:var(--orange); box-shadow:0 4px 10px rgba(0,0,0,.4); }
  @media (max-width:560px){ .e5s-flow{ grid-template-columns:1fr; gap:10px; } .e5s-flow .wire{ width:2px; height:20px; margin:0 auto; } .e5s-flow .doc{ display:none; } }
  /* 06 */
  .e5s-prices{ list-style:none; margin:0 0 18px; padding:0; display:grid; gap:10px; } .e5s-prices li{ background:#fff; border:1px solid var(--line); border-radius:10px; padding:14px 16px; display:grid; gap:3px; }
  .e5s-prices b{ font-family:var(--font-mono); font-size:1rem; color:var(--ink); } .e5s-prices span{ font-size:.84rem; color:var(--ink-soft); }
  .e5s-drivers{ display:grid; gap:14px; } .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; } .drv h3{ margin:0; font-size:1.02rem; color:var(--ink); } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:var(--ink-soft); }
  /* 07 */
  .e5s-qs{ list-style:none; margin:0; padding:0; } .e5s-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; position:relative; }
  .e5s-qs li::after{ content:''; position:absolute; left:0; right:0; bottom:0; height:1px; background:var(--line-strong); transform-origin:left center; }
  .e5s-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; } .e5s-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); } .e5s-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  /* band */
  .e5s-band{ position:relative; background:var(--navy-deep); color:#fff; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .e5s-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; } .e5s-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.88) 0%, rgba(11,32,54,.5) 50%, rgba(11,32,54,.2) 100%); }
  .e5s-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); } .e5s-bandtext p{ color:rgba(255,255,255,.8); max-width:48ch; margin:0 0 18px; }
  @media (max-width:700px){ .e5s-bandfig{ aspect-ratio:4/5; } }

  /* ================= motion : start states only under html.ae5-on ================= */
  html.ae5-on .e5h-text > *{ opacity:0; transform:translateY(14px); } html.ae5-on .e5h.lit .e5h-text > *{ animation:e5In .7s cubic-bezier(.2,.7,.2,1) forwards; }
  html.ae5-on .e5h.lit .e5h-text > *:nth-child(2){ animation-delay:.12s; } html.ae5-on .e5h.lit .e5h-text > *:nth-child(3){ animation-delay:.24s; } html.ae5-on .e5h.lit .e5h-text > *:nth-child(4){ animation-delay:.36s; } html.ae5-on .e5h.lit .e5h-text > *:nth-child(5){ animation-delay:.48s; }
  html.ae5-on .e5h-plate .e5-img{ transform:scale(1.06); transition:transform 2s cubic-bezier(.18,.72,.2,1); } html.ae5-on .e5h.lit .e5h-plate .e5-img{ transform:none; }
  @keyframes e5In{ to{ opacity:1; transform:none; } }
  html.ae5-on .e5s-head .eyebrow, html.ae5-on .e5s-head .e5s-h2, html.ae5-on .e5s-head .e5s-lede{ opacity:0; transform:translateY(12px); }
  html.ae5-on .e5s-head.lit .eyebrow{ animation:e5In .5s ease forwards; } html.ae5-on .e5s-head.lit .e5s-h2{ animation:e5In .6s cubic-bezier(.2,.7,.2,1) .1s forwards; } html.ae5-on .e5s-head.lit .e5s-lede{ animation:e5In .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  html.ae5-on .e5s-side .e5-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.ae5-on .e5s-side.lit .e5-img{ transform:none; }
  html.ae5-on .e5s-side figcaption{ opacity:0; } html.ae5-on .e5s-side.lit figcaption{ opacity:1; transition:opacity .5s linear .6s; }
  html.ae5-on .ic{ opacity:0; transform:translateX(-24px) rotate(-2deg); } html.ae5-on .e5s-riffle.lit .ic{ animation:e5In .55s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae5-on .e5s-ledger .lr > *{ clip-path:inset(0 100% 0 0); } html.ae5-on .e5s-ledger.lit .lr > *{ animation:e5Type .5s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .16s); } @keyframes e5Type{ to{ clip-path:inset(0); } }
  html.ae5-on .e5s-ledger .lt .rule{ transform:scaleX(0); } html.ae5-on .e5s-ledger.lit .lt .rule{ animation:e5Rule .8s cubic-bezier(.3,0,.2,1) 1.7s forwards; } @keyframes e5Rule{ to{ transform:scaleX(1); } }
  html.ae5-on .e5s-ledger .lt .bars i{ transform:scaleY(0); } html.ae5-on .e5s-ledger.lit .lt .bars i{ animation:e5Grow .9s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(2.3s + var(--d) * .2s); } @keyframes e5Grow{ to{ transform:none; } }
  html.ae5-on .e5s-ledger .lt em{ opacity:0; } html.ae5-on .e5s-ledger.lit .lt em{ opacity:1; transition:opacity .5s linear 3.3s; }
  html.ae5-on .pl{ opacity:0; transform:translateY(-26px); } html.ae5-on .e5s-pallets.lit .pl{ animation:e5Place .7s cubic-bezier(.3,1.2,.5,1) forwards; animation-delay:calc(var(--d) * .16s); } @keyframes e5Place{ to{ opacity:1; transform:none; } }
  html.ae5-on .tp{ opacity:0; transform:translateY(16px); } html.ae5-on .e5s-trip.lit .tp{ animation:e5In .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .18s); }
  html.ae5-on .e5s-flow .wire{ transform:scaleX(0); } html.ae5-on .e5s-flow.lit .wire{ animation:e5Rule .6s cubic-bezier(.3,0,.2,1) forwards; } html.ae5-on .e5s-flow.lit .wire:nth-of-type(2){ animation-delay:.9s; } html.ae5-on .e5s-flow.lit .wire:nth-of-type(4){ animation-delay:1.8s; } html.ae5-on .e5s-flow.lit .wire:nth-of-type(6){ animation-delay:2.7s; }
  html.ae5-on .nd i{ transform:scale(.4); opacity:.4; } html.ae5-on .e5s-flow.lit .nd i{ animation:e5Node .5s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(var(--d) * .9s); } @keyframes e5Node{ to{ transform:none; opacity:1; background:var(--orange); border-color:var(--orange); } }
  html.ae5-on .e5s-flow .doc{ opacity:0; } html.ae5-on .e5s-flow.lit .doc{ animation:e5Doc 3.2s cubic-bezier(.4,0,.3,1) .3s forwards; } @keyframes e5Doc{ 0%{ opacity:1; left:calc(12.5% - 8px); } 100%{ opacity:1; left:calc(87.5% - 8px); } }
  html.ae5-on .e5s-prices li{ opacity:0; transform:translateX(-16px); } html.ae5-on .e5s-prices.lit li{ animation:e5In .5s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae5-on .drv{ opacity:0; transform:translateY(14px); } html.ae5-on .e5s-drivers.lit .drv{ animation:e5In .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae5-on .e5s-qs li::after{ transform:scaleX(0); } html.ae5-on .e5s-qs.lit li::after{ animation:e5Rule .7s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae5-on .e5s-qs li > *{ opacity:0; } html.ae5-on .e5s-qs.lit li > *{ opacity:1; transition:opacity .5s linear calc(.2s + var(--d) * .12s); }
  @supports (animation-timeline: view()){ .e5s-bandfig .e5-img{ animation:e5Drift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; } @keyframes e5Drift{ from{ transform:scale(1.14) translateY(-4%); } to{ transform:scale(1.14) translateY(4%); } } }
  @media (prefers-reduced-motion: reduce){ html.ae5-on .e5h-text > *, html.ae5-on .e5h-plate .e5-img, html.ae5-on .e5s-head .eyebrow, html.ae5-on .e5s-head .e5s-h2, html.ae5-on .e5s-head .e5s-lede, html.ae5-on .e5s-side .e5-img, html.ae5-on .e5s-side figcaption, html.ae5-on .ic, html.ae5-on .e5s-ledger .lr > *, html.ae5-on .e5s-ledger .lt .rule, html.ae5-on .e5s-ledger .lt .bars i, html.ae5-on .e5s-ledger .lt em, html.ae5-on .pl, html.ae5-on .tp, html.ae5-on .e5s-flow .wire, html.ae5-on .nd i, html.ae5-on .e5s-prices li, html.ae5-on .drv, html.ae5-on .e5s-qs li::after, html.ae5-on .e5s-qs li > *, .e5s-bandfig .e5-img{ opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; } html.ae5-on .e5s-flow .doc{ display:none !important; } }
`;

const JS = `
/* ae_erp.js : light each frame once as it arrives. html.ae5-on is added only here. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('ae5-on');
    var frames = document.querySelectorAll('.e5h, .e5s-head, .e5s-side, .e5s-riffle, .e5s-ledger, .e5s-pallets, .e5s-trip, .e5s-flow, .e5s-prices, .e5s-drivers, .e5s-qs');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"'); s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"'); s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];
s = L.setHead(s, {
  title: 'ERP Software for the UAE | VAT, Corporate Tax, PINT-AE, WPS Built In &mdash; and When Not to Buy | TechAuditPros',
  ogTitle: 'ERP software for the UAE &mdash; the compliance ledger, the published prices, and when not to buy',
  desc: 'Custom ERP for UAE traders, contractors, workshops and manufacturers with VAT, Corporate Tax, PINT-AE e-invoicing, WPS and EOSB built in. The vendors ranking here publish no prices; a reseller lists Odoo $20, Dynamics $95, NetSuite $99 per user. The honest buy / build / not-yet answer, from a Kochi team four hours away.',
  url: URL,
  hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/ae/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', 'https://techauditpros.com/ae/'], ['ERP Software', URL]]),
  L.serviceSchema({ name: 'ERP Software for the UAE', desc: 'Custom ERP systems for UAE trading, contracting, automotive and manufacturing businesses with VAT, Corporate Tax, PINT-AE e-invoicing, WPS payroll and EOSB compliance built in, delivered from Kochi.', url: URL, area: 'United Arab Emirates' }),
  L.faqSchema(FAQS),
]);
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, ''); s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, ''); s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');
s = L.setBody(s, [L.answer(ANSWER), S1, S2, S3, S4, S5, S6, S7, BAND, L.faqHtml('city-faq', 'Questions UAE businesses ask about ERP', 'Twelve straight answers, starting with the office.', FAQS)].join('\n').split('__WA__').join(WA));
s = L.setFinalCta(s, 'Walk one real order through your business with us &mdash; enquiry to invoice.', 'Takes 60 seconds &middot; Dubai, Abu Dhabi and the UAE &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Dubai');
s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Dubai.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING BUSINESSES ACROSS THE UAE');
s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Dubai &bull; Abu Dhabi &bull; Sharjah &bull; Ajman &bull; JAFZA &bull; KIZAD &bull; DMCC &bull; Mussafah &bull; Al Quoz &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'], ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'], ['manage audits and deployments securely', 'manage builds and deployments securely'], ['>SEO Audit Kochi<', '>SEO in Kochi<'], ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.']]) if (s.includes(from)) s = s.split(from).join(to);
{ const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt); }
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" on /ae/erp/: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on /ae/erp/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3800) throw new Error('only ' + words + ' words; parity needs 3,800+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.split(path.sep).join('/').endsWith('/ae/erp/index.html'));
  const used = []; for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<div class="lr"', LEDGER.length); L.must(s, '<article class="pl"', SECTORS.length); L.must(s, '<div class="nd"', FLOW.length); L.must(s, '<div class="ic"', VENDORS.length);
fs.mkdirSync(path.join(L.REPO, 'ae', 'erp'), { recursive: true });
L.write('ae/erp/index.html', s);
console.log('/ae/erp/ written — the ledger that balances, vendor cards, sector pallets, buy/build/not-yet, e-invoice flow, attributed prices, 12 FAQs');
