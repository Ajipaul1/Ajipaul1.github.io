'use strict';
// /ae/erp/automotive/ — PLAN-AE §2 page 7: the second near-free sector term.
//
// DATA (ae_read.js, 2026-09-07): automotive erp software 590/KD7 — plus Dubai's re-export trade in vehicles and parts.
// WHAT RANKS (live, 2026-09-07): global product pages — annata.net (Dynamics 365-based DMS/ERP, ~5,000 words, vehicle
//   sales, workshop, parts, warranty, rental, no FAQ, no price), Gartner DMS lists, deskera guide, theerphub workshop
//   module (~1,300 words, job cards, parts, service history, warranty, 5 FAQs, no price), Proginov, DealerBox. Nothing
//   UAE-specific: none mentions the VAT profit-margin scheme on used vehicles, re-export, GCC spec or RTA transfer.
//   Parity: 3,400+ words · 10 FAQs · the three automotive businesses named (dealer, workshop, parts) · UAE specifics ·
//   buy/build honesty · no office first.
// RULES (PLAN-AE §9): brand palette, image-led, no cinema props; no "audit", no "offshore", no price of ours; own photos;
//   start states under html.ae7-on; JS off = complete page.
//
// DESIGN — SIGNATURE "the odometer": three drums roll (translateY on digit strips) to the three numbers an automotive
//   business lives by — job cards this month, parts lines in stock, vehicles on the floor — beside the H1.
//   Per section: vendor plates slide in like number plates · the three businesses as service bays that light in turn ·
//   the job-card flow (check-in → estimate → parts → labour → invoice) draws as a lane · UAE rules list · buy/build
//   triptych · price cards (all "demo") · questions with rules that draw · showroom band drifts.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/erp/automotive/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'e7-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
const STOCK = { hero: 'aea2-showroom-many-cars', dealer: 'aea2-red-car-showroom', workshop: 'aea2-mechanic-engine-workshop', parts: 'aee-forklift-parked-warehouse', under: 'aea2-mechanic-under-vehicle', floor: 'aea2-car-closeup-showroom-floor', garage: 'aea2-cars-in-garage', machine: 'aea2-man-garage-machine', band: 'aea2-orange-sports-car-showroom' };

// ---------------------------------------------------------------------------------------------
const H1 = 'Automotive ERP Software for the UAE, <span>for dealers, workshops and parts traders who live by three numbers.</span>';
const SUB = 'Every automotive ERP page ranking for this search is a global product: Dynamics-based dealer systems, workshop modules with job cards and warranty, Gartner lists. None of them mentions the things a UAE automotive business actually runs into &mdash; the VAT profit-margin scheme on used vehicles, the re-export trade through Dubai, GCC-spec versus imported stock, RTA transfers, parts supersessions across three branches. We build systems for dealers, workshops and parts traders from an engineering team in Kochi, four hours away, and this page names what such a system has to carry.';
const ANSWER = 'TechAuditPros builds <strong>automotive ERP systems for dealers, workshops and parts traders in Dubai, Sharjah and across the UAE</strong> &mdash; vehicle stock and sales including re-export, job cards from check-in to invoice, parts stock across branches with supersessions and VIN lookup, warranty claims, and the accounts with UAE VAT (including the profit-margin scheme on used vehicles), Corporate Tax, PINT-AE e-invoicing and WPS built in &mdash; from an engineering team in Kochi, India, four hours from Dubai. No UAE office, said first. &ldquo;Automotive ERP software&rdquo; is searched 590 times a month at a difficulty of seven; the pages ranking for it are global products and none prices itself or mentions the UAE.';

const DRUMS = [['Job cards', 'this month', 218], ['Parts lines', 'in stock across branches', 14620], ['Vehicles', 'on the floor and in transit', 87]];

const VENDORS = [
  ['Dynamics 365 &middot; DMS + ERP + CRM', 'a global automotive suite ranking first: vehicle sales, workshop, parts, warranty, rental; regions from Scandinavia to Japan, not the Gulf; no price'],
  ['Job cards &middot; parts &middot; warranty &middot; 5 FAQs', 'a workshop module page from an Indian ERP vendor; &ldquo;Middle East&rdquo; named once; no price'],
  ['Gartner Peer Insights', 'the dealer-management-system list that ranks beside them: enterprise products, enterprise prices, none of them shown'],
];

const BAYS = [
  { k: 'dealer', h: 'Dealer', p: 'New and used stock by VIN, GCC-spec and imported flagged, cost including customs and PDI, re-export documentation for the Africa and CIS trade, the profit-margin scheme applied correctly on used sales, RTA transfer status, and a sales pipeline that knows which car is where.', alt: 'A red car parked in a showroom' },
  { k: 'workshop', h: 'Workshop', p: 'Check-in with photos, estimate approved on WhatsApp, job card with bays and technicians, parts issued against the job, labour by operation, warranty split from customer-pay, invoice with VAT, and the service history the next customer asks about by chassis number.', alt: 'A mechanic working on a car engine in a workshop' },
  { k: 'parts', h: 'Parts', p: 'Stock across branches and a Sharjah warehouse, supersession chains, VIN and model-year lookup, counter sales and workshop issues from the same stock, re-export orders, and the dead stock report that nobody wants and everybody needs.', alt: 'A forklift parked inside a parts warehouse' },
];

const FLOW = ['Check-in', 'Estimate', 'Parts issued', 'Labour booked', 'Invoice'];

const CHECK = [
  ['Show me a used-vehicle sale under the profit-margin scheme.', 'In the demo. If the VAT is calculated on the full price, the system does not know the UAE.'],
  ['How does a part issued to a job card hit the stock and the invoice at once?', 'If it is two entries, the stock will be wrong by Thursday.'],
  ['Can the customer approve the estimate on WhatsApp?', 'That is how UAE workshops actually get approvals. A portal nobody opens is not an approval.'],
  ['What happens to a supersession across three branches?', 'The old number must find the new one everywhere, or the Sharjah warehouse sells what Al Quoz has just re-ordered.'],
  ['Where is the re-export paperwork?', 'If it lives in a separate spreadsheet, it is not in the system.'],
  ['Will you say a garage-management app is enough?', 'For a two-bay workshop with no parts business, it is. Anyone who never says so is selling.'],
];

const FAQS = [
  { q: 'Do you have an office in the UAE?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight from Dubai, ninety minutes apart on the clock, the same working week. Systems projects get a kick-off visit, a staging environment you can log into every week and a written monthly report. If you need a vendor with a Dubai support desk, several global products rank for this search and we will say so.' },
  { q: 'What does automotive ERP cost in the UAE?', a: 'None of the pages ranking for &ldquo;automotive ERP software&rdquo; publishes a price; they are enterprise dealer systems sold on demo. General UAE ERP pricing, as a Dubai reseller lists it, runs $20&ndash;$99 per user per month for the global products before automotive modules and implementation. We quote a fixed scope after walking one vehicle and one job card through your business.' },
  { q: 'How does VAT work on used-vehicle sales in the UAE?', a: 'Eligible second-hand goods, including used vehicles bought from non-registered persons, can be sold under the FTA&rsquo;s profit-margin scheme, where VAT is accounted for on the margin rather than the full price, subject to the scheme&rsquo;s conditions and record-keeping. The system must apply the scheme per vehicle and keep the records the FTA requires; we point you at the FTA for the current text and build the rule into configuration.' },
  { q: 'Does it handle re-export?', a: 'Yes: vehicles and parts bought for re-export to Africa, the CIS and the wider Gulf carry their customs status, destination and documentation on the record, with the VAT and customs treatment that follows, so the paperwork is generated from the sale rather than assembled afterwards.' },
  { q: 'Can the workshop run on it day to day?', a: 'Check-in with photos, estimates approved on WhatsApp, job cards with bays and technicians, parts issued against the job from live stock, labour by operation, warranty and customer-pay split, invoice with VAT and PINT-AE e-invoicing, and the chassis-number history. On a tablet in the bay, not only at the front desk.' },
  { q: 'How are parts handled across branches?', a: 'One stock record across branches and warehouses, supersession chains so the old part number finds the new one everywhere, VIN and model-year lookup, counter sales and workshop issues from the same stock, transfer orders between branches, and the dead-stock report by age.' },
  { q: 'Does it connect to the accounts and payroll?', a: 'Yes: UAE VAT including the profit-margin scheme, Corporate Tax at 9%, PINT-AE e-invoicing through an accredited provider, WPS payroll for technicians and salespeople with SIF files, EOSB accrual, and postings to the accounting package your accountant already uses.' },
  { q: 'Should a small workshop buy ERP at all?', a: 'A two-bay workshop with no parts business is well served by a garage-management app and its accounting package. The system earns its place when there are several bays, a parts counter, more than one branch, warranty work, or a dealer arm with stock and re-export.' },
  { q: 'Buy a product or build?', a: 'Buy when you are a franchised dealer whose manufacturer mandates a DMS, or when a global product passes the test: a used sale under the profit-margin scheme and a job card from check-in to invoice, in the demo, with your data. Build when you are an independent dealer, workshop or parts trader whose branches, re-export trade and pricing rules keep ending demos in &ldquo;we can configure that&rdquo;.' },
  { q: 'What happens if we stop?', a: 'You keep everything: the code, the database, the documentation and the plan. No notice period measured in quarters, no data held hostage.' },
];

// ---------------------------------------------------------------------------------------------
const drum = (n) => { const digits = String(n).split(''); return '<span class="drum" aria-hidden="true">' + digits.map((d, i) => '<i class="strip" style="--n:' + d + ';--d:' + i + '"><em>' + '0123456789'.split('').join('</em><em>') + '</em></i>').join('') + '</span>'; };
const HERO = [
  '<section class="e7h" id="e7-hero" aria-label="Automotive ERP software for the UAE">',
  '  <div class="e7h-plate">' + img(STOCK.hero, 'A car showroom filled with cars', '100vw', 'e7-img', true) + '</div>',
  '  <div class="container e7h-grid">',
  '    <div class="e7h-text">',
  '      <p class="eyebrow">Automotive ERP &middot; dealers &middot; workshops &middot; parts &middot; Dubai &middot; Sharjah &middot; UAE</p>',
  '      <h1>' + H1 + '</h1>',
  '      <p class="e7h-sub">' + SUB + '</p>',
  '      <div class="e7h-ctas"><a class="e7-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="e7-btn ghost" href="#e7-bays">Dealer, workshop, parts &darr;</a></div>',
  '    </div>',
  '    <div class="e7h-odo" role="img" aria-label="Three counters rolling to the numbers an automotive business lives by: 218 job cards this month, 14,620 parts lines in stock, 87 vehicles on the floor">' + DRUMS.map(([h, sub, n], i) => '<div class="od" style="--d:' + i + '">' + drum(n) + '<b>' + n.toLocaleString('en-US') + '</b><span>' + h + '</span><em>' + sub + '</em></div>').join('') + '<p class="note">Illustrative figures for a mid-sized UAE dealer group, not a client&rsquo;s.</p></div>',
  '  </div>',
  '</section>',
].join('\n');

const head = (eyebrow, title, lede) => '      <div class="e7s-head"><p class="eyebrow">' + eyebrow + '</p><h2 class="e7s-h2">' + title + '</h2>' + (lede ? '<p class="e7s-lede">' + lede + '</p>' : '') + '</div>';

const S1 = [
  '<section class="e7s" id="e7-vendors" aria-label="What ranks">',
  '  <div class="container e7s-two">',
  '    <div>',
  head('What ranks', 'Five hundred and ninety searches a month, and every answer is a global product that has never heard of Sharjah.', '&ldquo;Automotive ERP software&rdquo; has a keyword difficulty of seven. The pages that rank are Dynamics-based dealer suites built for franchised dealers in Europe and Japan, a workshop module from an Indian vendor, and a Gartner list. Good products, some of them; none mentions the profit-margin scheme, re-export, GCC spec or the fact that a Dubai parts trader sells to Lagos and Tashkent from a warehouse in Sharjah.'),
  '      <div class="e7s-plates">' + VENDORS.map(([b, by], i) => '<div class="np" style="--d:' + i + '"><b>' + b + '</b><span>' + by + '</span></div>').join('') + '</div>',
  '    </div>',
  '    <figure class="e7s-side">' + img(STOCK.garage, 'Cars parked in a garage', '(max-width:860px) 100vw, 40vw') + '<figcaption>Stock is stock, whether it is a vehicle, a part or an hour of a technician&rsquo;s day.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S2 = [
  '<section class="e7s dark" id="e7-bays" aria-label="Dealer, workshop, parts">',
  '  <div class="container">',
  head('Three businesses, one record', 'A dealer, a workshop and a parts trader are three businesses. In the UAE they are usually the same company.', 'The suites ranking here sell them as modules. The point of one system is that the part issued to a job card leaves the same stock the counter sells from, the vehicle in the workshop is the one the sales team is trying to deliver, and the accounts see all three as one set of books.'),
  '    <div class="e7s-bays">' + BAYS.map((b, i) => '<article class="bay" style="--d:' + i + '"><figure>' + img(STOCK[b.k], b.alt, '(max-width:860px) 100vw, 32vw') + '</figure><div class="t"><span class="k">0' + (i + 1) + '</span><h3>' + b.h + '</h3><p>' + b.p + '</p></div></article>').join('') + '</div>',
  '  </div>',
  '</section>',
].join('\n');

const S3 = [
  '<section class="e7s alt" id="e7-flow" aria-label="The job card">',
  '  <div class="container e7s-two rev">',
  '    <figure class="e7s-side tall">' + img(STOCK.under, 'A mechanic working under a vehicle', '(max-width:860px) 100vw, 40vw') + '<figcaption>The job card starts here and ends at the FTA. Nothing in between should be re-keyed.</figcaption></figure>',
  '    <div>',
  head('The job card', 'From check-in to a PINT-AE invoice in one lane, or it is a garage app with an accounts problem.', 'Five steps every UAE workshop takes on every car. A system either carries the job card through all five with the parts and labour attached, or someone types it twice.'),
  '      <div class="e7s-lane">' + FLOW.map((n, i) => '<div class="st" style="--d:' + i + '"><i></i><b>' + n + '</b></div>').join('') + '<span class="car" aria-hidden="true"></span></div>',
  '      <ul class="e7s-rules"><li><b>Check-in</b> with photos and the customer&rsquo;s complaint, against the chassis number and its history.</li><li><b>Estimate</b> approved on WhatsApp, because that is how UAE workshops actually get approvals.</li><li><b>Parts issued</b> against the job from live stock, with supersessions resolved.</li><li><b>Labour booked</b> by operation and technician; warranty split from customer-pay.</li><li><b>Invoice</b> with VAT, issued as a PINT-AE e-invoice through the accredited provider, posted to the accounts.</li></ul>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S4 = [
  '<section class="e7s" id="e7-uae" aria-label="The UAE rules on an automotive business">',
  '  <div class="container e7s-two">',
  '    <div>',
  head('The UAE rules', 'Where the UAE lands on an automotive business, specifically.', 'Global suites say &ldquo;localised&rdquo;. A UAE dealer, workshop or parts trader needs five specific things right.'),
  '      <ul class="e7s-rules plain"><li><b>The profit-margin scheme.</b> VAT on eligible used-vehicle sales accounted for on the margin, per vehicle, with the FTA&rsquo;s records kept; the system applies it, a person does not remember it.</li><li><b>Re-export.</b> Vehicles and parts sold to Africa, the CIS and the Gulf carry customs status, destination and documents on the record, with the VAT treatment that follows.</li><li><b>GCC spec and imports.</b> Spec, origin and customs cost flagged per VIN; landed cost right before the price is.</li><li><b>RTA and registration.</b> Transfer status tracked on the vehicle record so a car is not sold twice or delivered unregistered.</li><li><b>WPS, EOSB, Corporate Tax, PINT-AE.</b> Technicians and salespeople on WPS with SIF files, gratuity accruing, the 9% tracked, invoices leaving as e-invoices &mdash; the compliance ledger every UAE system carries, on the <a href="/ae/erp/">ERP page</a>.</li></ul>',
  '    </div>',
  '    <figure class="e7s-side">' + img(STOCK.floor, 'Close-up of a car on a showroom floor', '(max-width:860px) 100vw, 40vw') + '<figcaption>Every car on the floor has a VIN, a spec, a customs cost and a VAT treatment. The record should know all four.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S5 = [
  '<section class="e7s dark" id="e7-buy" aria-label="App, product, or build">',
  '  <div class="container e7s-two rev">',
  '    <figure class="e7s-side short">' + img(STOCK.machine, 'A man working on a machine in a garage', '(max-width:860px) 100vw, 40vw') + '<figcaption>Two bays and no parts counter: a garage app and the accounting package are enough.</figcaption></figure>',
  '    <div>',
  head('App, product, or build', 'The three honest answers, in the order we give them.', 'We build custom systems, which is a bias. Here is the order we actually use on the first call with an automotive business.'),
  '      <div class="e7s-trip"><div class="tp" style="--d:0"><span class="k">A garage app</span><h3>Two bays, no parts business, one branch.</h3><p>A garage-management app for job cards plus the accounting package you have. The system earns its place later.</p></div><div class="tp" style="--d:1"><span class="k">A product</span><h3>A franchised dealer whose manufacturer mandates a DMS.</h3><p>Or a global suite that passes the test: a used sale under the profit-margin scheme and a job card from check-in to invoice, in the demo, with your data.</p></div><div class="tp hi" style="--d:2"><span class="k">A build</span><h3>An independent dealer, workshop or parts trader with branches and re-export.</h3><p>Sharjah warehouse, Al Quoz workshop, Deira counter, buyers in Lagos: pricing rules, supersessions and paperwork that keep ending demos in &ldquo;we can configure that&rdquo;. A system built around the trade stops the workarounds.</p></div></div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S6 = [
  '<section class="e7s alt" id="e7-cost" aria-label="What it costs">',
  '  <div class="container e7s-two">',
  '    <div>',
  head('What it costs', 'Nobody ranking for this search publishes a price. Here is what moves it.', 'The dealer suites ranking here are enterprise products sold on demo. General UAE ERP pricing, as a Dubai reseller lists it, runs $20&ndash;$99 per user per month for the global products before automotive modules and implementation. Ours comes after walking one vehicle and one job card through your business, and these four things move it.'),
  '      <div class="e7s-drivers">' + [['Branches and warehouses', 'One workshop is one system. Three branches, a Sharjah warehouse and a re-export desk are another.'], ['Who touches the job card', 'Every technician with a tablet and every counter is a user; per-user products charge for each. Count the busiest month.'], ['The parts catalogue', 'Ten thousand lines with supersessions and VIN lookup is data work before it is software work; it is never in the quote.'], ['The dealer arm', 'Vehicle stock with customs, spec, RTA and the margin scheme is where global products need the most configuration.']].map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '    </div>',
  '    <figure class="e7s-side short">' + img(STOCK.dealer, 'A red car parked in a showroom', '(max-width:860px) 100vw, 40vw') + '<figcaption>One car, one VIN, one price after customs and the margin scheme. The system should get there before the salesperson does.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S7 = [
  '<section class="e7s" id="e7-check" aria-label="Before you sign">',
  '  <div class="container">',
  head('Before you sign', 'Six questions for any automotive ERP vendor in the UAE &mdash; including one four hours away.', 'Ask them in the demo, with your own vehicle and job card on the screen.'),
  '    <ol class="e7s-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="e7s-band" aria-label="Start on WhatsApp">',
  '  <div class="e7s-bandfig">' + img(STOCK.band, 'An orange sports car in a showroom', '100vw') + '</div>',
  '  <div class="container e7s-bandtext"><p class="eyebrow">No office in the Emirates</p><h2 class="e7s-h2">Walk one vehicle and one job card through your business with us.</h2><p>Message us on WhatsApp or book a call. We will tell you whether the answer is an app, a product or a build &mdash; and show you the used-vehicle sale under the margin scheme either way.</p><a class="e7-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_erp_automotive.js : "the odometer" ================= */
  .e7-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .e7-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; } .e7-btn:hover{ background:var(--orange-dark); } .e7-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }
  .e7h{ position:relative; min-height:84svh; background:var(--navy-deep); color:#fff; overflow:hidden; display:grid; align-items:center; }
  .e7h-plate{ position:absolute; inset:0; } .e7h-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.94) 0%, rgba(11,32,54,.75) 50%, rgba(11,32,54,.4) 100%); }
  .e7h-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,60px); align-items:center; padding:clamp(100px,14vh,160px) 0 clamp(56px,8vh,90px); } @media (min-width:900px){ .e7h-grid{ grid-template-columns:7fr 5fr; } }
  .e7h .eyebrow{ color:rgba(255,255,255,.7); margin:0 0 14px; }
  .e7h h1{ font-size:clamp(1.7rem,3.7vw,3.3rem); line-height:1.06; letter-spacing:-.02em; margin:0 0 16px; color:#fff; max-width:26ch; } .e7h h1 span{ color:var(--orange); }
  .e7h-sub{ max-width:66ch; color:rgba(255,255,255,.82); font-size:clamp(.96rem,1.12vw,1.08rem); line-height:1.65; margin:0 0 20px; } .e7h-ctas{ display:flex; gap:12px; flex-wrap:wrap; }
  .e7h-odo{ display:grid; gap:12px; }
  .od{ background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.2); border-radius:12px; padding:14px 16px; display:grid; grid-template-columns:auto 1fr; gap:2px 14px; align-items:center; color:#fff; }
  .od .drum{ display:flex; gap:3px; grid-row:1 / span 3; } .od .strip{ display:block; width:22px; height:36px; overflow:hidden; background:#06101B; border-radius:4px; border:1px solid rgba(255,255,255,.2); position:relative; }
  .od .strip em{ display:block; height:36px; line-height:36px; text-align:center; font-family:var(--font-mono); font-size:1.3rem; font-weight:700; color:#fff; font-style:normal; }
  .od b{ display:none; } .od span{ font-size:1rem; font-weight:700; } .od em{ font-style:normal; font-size:.8rem; color:rgba(255,255,255,.7); }
  .e7h-odo .note{ margin:0; font-size:.74rem; color:rgba(255,255,255,.55); }
  .e7s{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:var(--paper); } .e7s.dark{ background:var(--navy-deep); color:#fff; } .e7s.alt{ background:var(--paper-alt); }
  .e7s-head{ max-width:66ch; margin-bottom:clamp(22px,3vw,40px); } .e7s-head .eyebrow{ margin:0 0 10px; } .e7s.dark .eyebrow, .e7s-band .eyebrow{ color:rgba(255,255,255,.7); }
  .e7s-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); } .e7s.dark .e7s-h2, .e7s-band .e7s-h2{ color:#fff; }
  .e7s-lede, .e7s-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; } .e7s.dark .e7s-lede{ color:rgba(255,255,255,.8); }
  .e7s-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; } @media (min-width:860px){ .e7s-two{ grid-template-columns:7fr 5fr; } .e7s-two.rev{ grid-template-columns:5fr 7fr; } }
  .e7s-side{ margin:0; position:relative; aspect-ratio:4/5; overflow:hidden; border-radius:14px; } .e7s-side.short{ aspect-ratio:16/10; } .e7s-side.tall{ aspect-ratio:3/4; }
  .e7s-side figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  .e7s-plates{ display:grid; gap:12px; margin-top:18px; } .np{ background:#fff; border:2px solid var(--ink); border-radius:8px; padding:12px 16px 12px 22px; position:relative; }
  .np::before{ content:''; position:absolute; left:8px; top:10px; bottom:10px; width:6px; border-radius:3px; background:var(--orange); }
  .np b{ display:block; font-family:var(--font-mono); font-size:.86rem; color:var(--ink); margin-bottom:6px; } .np span{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }
  .e7s-bays{ display:grid; grid-template-columns:1fr; gap:16px; } @media (min-width:860px){ .e7s-bays{ grid-template-columns:repeat(3,1fr); } }
  .bay{ background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.14); border-radius:14px; overflow:hidden; } .bay figure{ margin:0; aspect-ratio:4/3; overflow:hidden; } .bay .t{ padding:20px; }
  .bay .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; color:var(--orange); } .bay h3{ margin:6px 0 10px; font-size:1.2rem; color:#fff; } .bay p{ margin:0; color:rgba(255,255,255,.82); line-height:1.6; font-size:.93rem; }
  .e7s-lane{ position:relative; display:grid; grid-template-columns:repeat(5,1fr); gap:6px; margin:8px 0 18px; padding:26px 0 6px; }
  .e7s-lane::before{ content:''; position:absolute; left:4%; right:4%; top:34px; height:4px; border-radius:2px; background:repeating-linear-gradient(90deg, var(--line-strong) 0 18px, transparent 18px 30px); }
  .e7s-lane .st{ text-align:center; position:relative; } .e7s-lane .st i{ display:block; width:20px; height:20px; margin:0 auto 8px; border-radius:50%; background:#fff; border:4px solid var(--orange); } .e7s-lane .st b{ display:block; font-size:.78rem; color:var(--ink); }
  .e7s-lane .car{ position:absolute; left:calc(10% - 12px); top:24px; width:24px; height:14px; border-radius:4px 6px 3px 3px; background:var(--navy-deep); }
  .e7s-lane .car::after{ content:''; position:absolute; left:4px; right:4px; top:-6px; height:7px; border-radius:3px 3px 0 0; background:var(--navy-deep); }
  .e7s-rules{ margin:0; padding:0 0 0 18px; line-height:1.6; color:var(--ink-soft); } .e7s-rules li{ margin-bottom:10px; } .e7s-rules b{ color:var(--ink); } .e7s-rules a{ color:var(--orange); }
  .e7s-trip{ display:grid; gap:14px; } .tp{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); border-radius:12px; padding:20px; color:#fff; } .tp.hi{ background:var(--orange); border-color:var(--orange); }
  .tp .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.75); } .tp h3{ margin:6px 0 8px; font-size:1.1rem; } .tp p{ margin:0; font-size:.92rem; line-height:1.6; color:rgba(255,255,255,.85); }
  .e7s-drivers{ display:grid; gap:14px; } .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; } .drv h3{ margin:0; font-size:1.02rem; color:var(--ink); } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:var(--ink-soft); }
  .e7s-qs{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr; gap:6px 32px; } @media (min-width:760px){ .e7s-qs{ grid-template-columns:1fr 1fr; } }
  .e7s-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; position:relative; } .e7s-qs li::after{ content:''; position:absolute; left:0; right:0; bottom:0; height:1px; background:var(--line-strong); transform-origin:left center; }
  .e7s-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; } .e7s-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); } .e7s-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  .e7s-band{ position:relative; background:var(--navy-deep); color:#fff; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; } .e7s-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; } .e7s-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.88) 0%, rgba(11,32,54,.5) 50%, rgba(11,32,54,.2) 100%); }
  .e7s-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); } .e7s-bandtext p{ color:rgba(255,255,255,.8); max-width:48ch; margin:0 0 18px; } @media (max-width:700px){ .e7s-bandfig{ aspect-ratio:4/5; } }
  /* the odometer: each strip shows digit --n by translating the 10-digit column; JS off = the digit is shown directly */
  .od .strip em{ transform:translateY(calc(var(--n) * -36px)); }
  .od .strip em:not(:first-child){ display:none; } .od .strip em:first-child{ transform:none; }
  .od .strip::after{ content:attr(data-n); }
  /* motion */
  html.ae7-on .e7h-text > *{ opacity:0; transform:translateY(14px); } html.ae7-on .e7h.lit .e7h-text > *{ animation:e7In .7s cubic-bezier(.2,.7,.2,1) forwards; } html.ae7-on .e7h.lit .e7h-text > *:nth-child(2){ animation-delay:.12s; } html.ae7-on .e7h.lit .e7h-text > *:nth-child(3){ animation-delay:.24s; } html.ae7-on .e7h.lit .e7h-text > *:nth-child(4){ animation-delay:.36s; }
  @keyframes e7In{ to{ opacity:1; transform:none; } }
  html.ae7-on .od .strip em{ display:block !important; transform:none; } html.ae7-on .od .strip .col{ display:block; transition:transform 1.6s cubic-bezier(.2,.8,.2,1); transform:translateY(0); }
  html.ae7-on .e7h.lit .od .strip .col{ transform:translateY(calc(var(--n) * -36px)); transition-delay:calc(.4s + var(--d) * .12s); }
  html.ae7-on .od{ opacity:0; transform:translateX(20px); } html.ae7-on .e7h.lit .od{ animation:e7In .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.2s + var(--d) * .18s); }
  html.ae7-on .e7s-head .eyebrow, html.ae7-on .e7s-head .e7s-h2, html.ae7-on .e7s-head .e7s-lede{ opacity:0; transform:translateY(12px); } html.ae7-on .e7s-head.lit .eyebrow{ animation:e7In .5s ease forwards; } html.ae7-on .e7s-head.lit .e7s-h2{ animation:e7In .6s cubic-bezier(.2,.7,.2,1) .1s forwards; } html.ae7-on .e7s-head.lit .e7s-lede{ animation:e7In .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  html.ae7-on .e7s-side .e7-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.ae7-on .e7s-side.lit .e7-img{ transform:none; } html.ae7-on .e7s-side figcaption{ opacity:0; } html.ae7-on .e7s-side.lit figcaption{ opacity:1; transition:opacity .5s linear .6s; }
  html.ae7-on .np{ opacity:0; transform:translateX(40px); } html.ae7-on .e7s-plates.lit .np{ animation:e7In .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.ae7-on .bay{ opacity:.35; } html.ae7-on .bay figure .e7-img{ transform:scale(1.08); transition:transform 1.4s cubic-bezier(.18,.72,.2,1); } html.ae7-on .e7s-bays.lit .bay{ opacity:1; transition:opacity .6s linear calc(var(--d) * .35s); } html.ae7-on .e7s-bays.lit .bay figure .e7-img{ transform:none; transition-delay:calc(var(--d) * .35s); }
  html.ae7-on .e7s-lane::before{ transform:scaleX(0); transform-origin:left center; } html.ae7-on .e7s-lane.lit::before{ animation:e7Rule 2s cubic-bezier(.4,0,.3,1) forwards; } @keyframes e7Rule{ to{ transform:scaleX(1); } }
  html.ae7-on .e7s-lane .st i{ transform:scale(0); } html.ae7-on .e7s-lane .st b{ opacity:0; } html.ae7-on .e7s-lane.lit .st i{ animation:e7Pop .4s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(.2s + var(--d) * .4s); } html.ae7-on .e7s-lane.lit .st b{ opacity:1; transition:opacity .3s linear calc(.35s + var(--d) * .4s); } @keyframes e7Pop{ to{ transform:none; } }
  html.ae7-on .e7s-lane .car{ opacity:0; } html.ae7-on .e7s-lane.lit .car{ animation:e7Car 2s cubic-bezier(.4,0,.3,1) .2s forwards; } @keyframes e7Car{ 0%{ opacity:1; left:calc(10% - 12px); } 100%{ opacity:1; left:calc(90% - 12px); } }
  html.ae7-on .e7s-rules li{ opacity:0; transform:translateX(-10px); } html.ae7-on .e7s-rules.lit li{ animation:e7In .45s ease forwards; animation-delay:calc(var(--d, 0) * .1s); }
  html.ae7-on .tp{ opacity:0; transform:translateY(16px); } html.ae7-on .e7s-trip.lit .tp{ animation:e7In .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .18s); }
  html.ae7-on .drv{ opacity:0; transform:translateY(14px); } html.ae7-on .e7s-drivers.lit .drv{ animation:e7In .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae7-on .e7s-qs li::after{ transform:scaleX(0); } html.ae7-on .e7s-qs.lit li::after{ animation:e7Rule .7s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae7-on .e7s-qs li > *{ opacity:0; } html.ae7-on .e7s-qs.lit li > *{ opacity:1; transition:opacity .5s linear calc(.2s + var(--d) * .12s); }
  @supports (animation-timeline: view()){ .e7s-bandfig .e7-img{ animation:e7Drift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; } @keyframes e7Drift{ from{ transform:scale(1.14) translateX(-3%); } to{ transform:scale(1.14) translateX(3%); } } }
  @media (prefers-reduced-motion: reduce){ html.ae7-on .e7h-text > *, html.ae7-on .od, html.ae7-on .e7s-head .eyebrow, html.ae7-on .e7s-head .e7s-h2, html.ae7-on .e7s-head .e7s-lede, html.ae7-on .e7s-side .e7-img, html.ae7-on .e7s-side figcaption, html.ae7-on .np, html.ae7-on .bay, html.ae7-on .bay figure .e7-img, html.ae7-on .e7s-lane::before, html.ae7-on .e7s-lane .st i, html.ae7-on .e7s-lane .st b, html.ae7-on .e7s-rules li, html.ae7-on .tp, html.ae7-on .drv, html.ae7-on .e7s-qs li::after, html.ae7-on .e7s-qs li > *, .e7s-bandfig .e7-img{ opacity:1 !important; transform:none !important; animation:none !important; transition:none !important; } html.ae7-on .e7s-lane .car{ display:none !important; } html.ae7-on .od .strip .col{ transform:translateY(calc(var(--n) * -36px)) !important; transition:none !important; } }
`;
const JS = `
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    /* odometer: wrap each strip's ten digits in a column that can roll; JS-off leaves the single visible digit */
    var strips = document.querySelectorAll('.od .strip');
    for (var i = 0; i < strips.length; i++) { var col = document.createElement('span'); col.className = 'col'; while (strips[i].firstChild) col.appendChild(strips[i].firstChild); strips[i].appendChild(col); }
    document.documentElement.classList.add('ae7-on');
    var rules = document.querySelectorAll('.e7s-rules li'); for (var r = 0; r < rules.length; r++) rules[r].style.setProperty('--d', r % 5);
    var frames = document.querySelectorAll('.e7h, .e7s-head, .e7s-side, .e7s-plates, .e7s-bays, .e7s-lane, .e7s-rules, .e7s-trip, .e7s-drivers, .e7s-qs');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"'); s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"'); s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];
s = L.setHead(s, {
  title: 'Automotive ERP Software UAE | Dealers, Workshops &amp; Parts &mdash; Margin Scheme, Re-export, Job Cards | TechAuditPros',
  ogTitle: 'Automotive ERP software for the UAE &mdash; dealers, workshops and parts traders',
  desc: 'Automotive ERP for UAE dealers, workshops and parts traders: vehicle stock and re-export, job cards from check-in to PINT-AE invoice, parts across branches with supersessions, warranty, the VAT profit-margin scheme on used vehicles, WPS. What the global suites never mention, from a Kochi team four hours away.',
  url: URL, hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/ae/erp/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', 'https://techauditpros.com/ae/'], ['ERP Software', 'https://techauditpros.com/ae/erp/'], ['Automotive', URL]]),
  L.serviceSchema({ name: 'Automotive ERP Software for the UAE', desc: 'Custom ERP for UAE dealers, workshops and parts traders: vehicle stock and re-export, job cards, parts across branches, warranty, VAT profit-margin scheme, PINT-AE e-invoicing and WPS, delivered from Kochi.', url: URL, area: 'United Arab Emirates' }),
  L.faqSchema(FAQS),
]);
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, ''); s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, ''); s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');
s = L.setBody(s, [L.answer(ANSWER), S1, S2, S3, S4, S5, S6, S7, BAND, L.faqHtml('city-faq', 'Questions UAE automotive businesses ask', 'Ten straight answers, starting with the office.', FAQS)].join('\n').split('__WA__').join(WA));
s = L.setFinalCta(s, 'Walk one vehicle and one job card through your business with us.', 'Takes 60 seconds &middot; UAE dealers, workshops and parts traders &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Dubai'); s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Dubai.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING AUTOMOTIVE BUSINESSES ACROSS THE UAE'); s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Dubai &bull; Al Quoz &bull; Deira &bull; Sharjah &bull; Ajman &bull; Abu Dhabi &bull; Mussafah &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'], ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'], ['manage audits and deployments securely', 'manage builds and deployments securely'], ['>SEO Audit Kochi<', '>SEO in Kochi<'], ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.']]) if (s.includes(from)) s = s.split(from).join(to);
{ const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt); }
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" on automotive page: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on automotive page');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3200) throw new Error('only ' + words + ' words; parity needs 3,200+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.split(path.sep).join('/').endsWith('/ae/erp/automotive/index.html'));
  const used = []; for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<div class="od"', DRUMS.length); L.must(s, '<article class="bay"', BAYS.length); L.must(s, '<div class="st"', FLOW.length); L.must(s, '<div class="np"', VENDORS.length);
fs.mkdirSync(path.join(L.REPO, 'ae', 'erp', 'automotive'), { recursive: true });
L.write('ae/erp/automotive/index.html', s);
console.log('/ae/erp/automotive/ written — the odometer, number plates, three bays, the job-card lane, UAE rules, app/product/build, 10 FAQs');
