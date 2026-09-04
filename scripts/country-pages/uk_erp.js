'use strict';
// /uk/erp/ — generated from the CA ERP template. Targets, from ai_context/PLAN-UK.md:
//   manufacturing erp software 880/KD15 · erp implementation 1,000/22 · erp solutions for manufacturing
//   720/22 · erp for small business 480/27 · erp systems uk 480/28 · benefits of erp 390/12 · erp software
//   uk 390/18 · erp software for small business 390/28 · erp accounting software 320/22 · erp for
//   manufacturing 320/17 · small business erp 320/22 · what is mrp 480/33 · what is wms 390/32 ·
//   erp systems for small companies 210/23 · erp implementation services 140/11 · erp system uk 140/22 ·
//   erp implementation partner 110/5 · cloud erp uk 110/26 · erp manufacturing software uk 110/9
// SERP crawl 2026-09-03 (comparesoft.com/erp-software/manufacturing, erpresearch.com/en-gb/manufacturing-erp):
// both are product-comparison pages, ~3.5k and ~18k words, quoting Microsoft Dynamics 365 £82/user/mo,
// Infor CloudSuite £112, Oracle NetSuite £74, SAP Business One £77, Epicor Kinetic £75, Statii £99/mo,
// Flowlens £220/mo, Sage 200 from £374/mo and £15,000-£60,000/yr all-in. Neither covers Making Tax
// Digital, UK GAAP, post-Brexit customs or UK GDPR in any depth, and neither builds anything. That gap
// plus a plain custom-vs-subscription cost comparison is this page's angle.
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/erp/';
let s = L.read('ca/erp/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'Custom ERP Software Development for UK Businesses | TechAuditPros',
  ogTitle: 'Custom ERP Software Development for UK Businesses | TechAuditPros',
  desc: 'TechAuditPros builds custom ERP and manufacturing ERP software for UK small and mid-size businesses &mdash; stock, orders, purchasing, production and finance in one system, integrated with Xero, Sage and QuickBooks, MTD-ready, hosted in AWS London. Flat one agreed monthly fee, dedicated engineering team, you own the code.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }, { lang: 'en-us', href: 'https://techauditpros.com/us/erp/' }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/erp/' }],
});

const faqs = [
  { q: 'How much does custom ERP software cost in the UK?', a: 'TechAuditPros builds and runs your custom ERP one agreed monthly fee &mdash; that covers your dedicated engineering team, design, development, integrations, hosting guidance and ongoing support, with no per-seat licences and no separate implementation invoice. For orientation, published UK prices for subscription ERP sit around &pound;74&ndash;&pound;112 per user per month (Oracle NetSuite from &pound;74, Epicor Kinetic from &pound;75, SAP Business One from &pound;77, Microsoft Dynamics 365 from &pound;82, Infor CloudSuite from &pound;112), Sage 200 starts near &pound;374 a month, and independent UK research puts realistic all-in cost at &pound;15,000&ndash;&pound;60,000 a year once implementation and support are counted. Your scope call ends with a fixed monthly number, not an estimate.' },
  { q: 'What is manufacturing ERP software, and how is it different from generic ERP?', a: 'Manufacturing ERP adds the production layer that generic ERP leaves out: bills of materials, work orders and routing, MRP planning against real stock and lead times, shop-floor status, work-in-progress and scrap, batch or lot traceability, and true cost of goods manufactured. If you make, assemble, machine or blend anything, that layer is where the money leaks &mdash; and it is what we build first for UK manufacturers and job shops.' },
  { q: 'What is the difference between MRP, ERP and WMS?', a: 'MRP (material requirements planning) works out what to make or buy and when, from your bills of materials, stock and lead times. ERP is the wider system of record around it &mdash; orders, purchasing, production, stock and finance in one place. WMS (warehouse management) runs the physical warehouse: locations, picking routes, goods-in and stock accuracy. Most UK SMEs need ERP with MRP inside it; a separate WMS only pays for itself once the warehouse is big or complex enough to need directed picking.' },
  { q: 'How long does a custom ERP take to build?', a: 'Most UK engagements reach a working first module &mdash; usually stock, orders or quoting, whichever hurts most &mdash; within 6 to 10 weeks. The full system then rolls out in phases over roughly 4 to 9 months, with your team using each module on real data as it ships rather than waiting for one big launch. For comparison, published UK implementation timelines for subscription ERP are commonly 3 to 6 months for a small business and 6 to 12 for mid-market, before customisation.' },
  { q: 'Is custom ERP realistic for a small UK business?', a: 'Yes, once you are running on Xero or Sage plus three or four disconnected tools and a growing stack of spreadsheets &mdash; that is exactly where a right-sized custom system pays for itself, and where per-user subscription pricing starts to hurt as you hire. If you are a team of five with one simple sales process, an off-the-shelf tool is probably still the better answer, and we will tell you that on the call.' },
  { q: 'Will the ERP work with Making Tax Digital for VAT?', a: 'Yes. Where the system touches VAT we keep the digital records MTD requires and push the figures to your accounting system &mdash; Xero, Sage or QuickBooks &mdash; which files the return through its own HMRC-recognised connection. We do not ask you to replace the software your accountant already trusts; the ERP becomes the system of record that feeds it, with a clean digital audit trail from order to invoice.' },
  { q: 'Can the ERP integrate with Xero, Sage, QuickBooks, Shopify or Stripe?', a: 'Yes. Two-way syncs with Xero, Sage, QuickBooks Online, Shopify, WooCommerce, Amazon, Stripe, GoCardless, HubSpot and Salesforce are scoped during discovery and built on the tools&rsquo; official APIs. Payroll exports for BrightPay, Sage Payroll or your bureau are included where needed, and we can automate the workplace-pension side of auto-enrolment so contributions are not re-keyed by hand.' },
  { q: 'Where is our data hosted under UK GDPR?', a: 'In a UK cloud region inside an account you own &mdash; AWS London (eu-west-2) or Google Cloud europe-west2 by default, so the data does not leave the UK. We work under an NDA and a data processing agreement naming you as controller and us as processor, with role-based access you control and can revoke, weekly encrypted backups and no shared credentials. Access from our team in India is covered by that agreement and the UK international transfer addendum.' },
  { q: 'Who owns the source code?', a: 'You do, fully &mdash; the repository, the database and the documentation are yours from day one. If you ever want to move development in-house or to another supplier, nothing is locked behind us.' },
  { q: 'How does the time-zone difference with your India team work?', a: 'Our engineers work from Kochi, which runs 4.5 hours ahead of London in summer (BST) and 5.5 hours ahead in winter (GMT). In practice you get a live overlap window every UK morning and early afternoon for calls, Slack or Teams, and anything you send at the end of your day is picked up before ours ends. You get a weekly demo and a monthly written report from the same team, first call to hundredth deploy.' },
  { q: 'Cloud or on-premise?', a: 'Cloud by default &mdash; cheaper to run, easier to back up, and reachable from every site and warehouse. If you have a regulatory or connectivity reason to keep the system on your own servers, we can deploy on-premise or into a private cloud instead.' },
  { q: 'What is the difference between custom ERP and a cloud ERP subscription?', a: 'A subscription ERP is one product every customer shares, priced per user, that you configure around; a custom ERP is coded around your workflows, priced flat, and changes whenever your business does. Subscriptions win when your processes are standard and your headcount is stable; custom wins when they are not, or when per-seat fees are climbing faster than the business.' },
  { q: 'Do we need a long-term contract, and do you charge VAT?', a: 'No contract &mdash; engagements are month to month and you can pause or stop at any time, keeping the code and the data either way. Invoices are issued from India in pounds sterling with no UK VAT added; a UK VAT-registered business accounts for it under the reverse charge and normally reclaims it in the same return. Your accountant will confirm your position.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Custom ERP Software Development', name: 'Custom ERP and Manufacturing ERP Software Development for UK Businesses', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'Custom ERP and manufacturing ERP software development for UK small and mid-size businesses: stock, orders, purchasing, production and finance in one system, integrated with Xero, Sage, QuickBooks and Shopify, MTD-ready, hosted in AWS London, built and supported by a dedicated AI-native engineering team.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['Custom ERP Development', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to Britain.', 'UK');
s = L.setRotatePhrases(s, 'UK', 'Pricing scoped on a call', 'London &bull; Manchester &bull; Leeds &bull; Bristol', 'the UK');
s = L.setHero(s, {
  eyebrow: 'Custom ERP &amp; Manufacturing ERP Software &mdash; United Kingdom',
  h1: 'Custom ERP Software <span>Built Around How Your UK Business Actually Runs.</span>',
  sub: 'TechAuditPros designs and builds custom ERP and manufacturing ERP systems for UK small and mid-size businesses &mdash; one system of record for stock, orders, purchasing, production and finance, integrated with the Xero, Sage, QuickBooks and Shopify accounts you already run, MTD-ready and hosted in AWS London. One agreed monthly fee, a dedicated engineering team, source code yours.',
  ghostHref: '#erp-modules', ghostText: 'See what’s included &darr;',
  features: ['\u{1F468}‍\u{1F4BB} Dedicated Engineering Team', '\u{1F1EC}\u{1F1E7} UK Data Residency', '\u{1F4BB} You Own the Code'],
  trust: [['250+', 'Projects delivered'], ['No lock-in', 'Month to month'], ['6&ndash;10 wks', 'To first working module'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('<strong>Custom ERP software</strong> is an enterprise resource planning system designed and coded for one company’s workflows, instead of a subscription product every company shares. TechAuditPros builds custom ERP and <strong>manufacturing ERP</strong> for UK businesses on <strong>Node.js, PostgreSQL and React</strong>, hosted in <strong>AWS London</strong> in an account you own, for a <strong>one agreed monthly fee</strong> &mdash; no per-user licences, no five-figure implementation invoice, no long-term contract. Most clients are using their first working module within 6&ndash;10 weeks.');

body += L.benefitRow('what-custom-erp-replaces', 'What a Custom ERP Replaces', 'The three things that quietly cost a growing UK business the most.', [
  { icon: '\u{1F4CA}', h4: 'The Spreadsheet Sprawl', p: 'The stock sheet, the order tracker, the price list, the one only Dawn understands. A custom ERP turns them into one system of record with one version of the truth.' },
  { icon: '\u{1F9E9}', h4: 'The Tool Tangle', p: 'Xero or Sage for the money, Shopify for orders, a CRM for quotes, email for approvals &mdash; none of them talking. The ERP sits in the middle and keeps them in sync automatically.' },
  { icon: '\u{1F501}', h4: 'The Manual Re-Keying', p: 'Someone typing the same order into three systems, and the errors that follow. Automation handles the routine; your people handle the exceptions.' },
]);

body += L.benefitRow('mrp-erp-wms', 'MRP, ERP or WMS?', 'The three terms UK buyers get sold interchangeably &mdash; and what each one actually does.', [
  { icon: '\u{1F9EE}', h4: 'MRP', p: 'Material requirements planning: works out what to make or buy and when, from your bills of materials, current stock and supplier lead times. It answers &ldquo;can we promise this date?&rdquo;.' },
  { icon: '\u{1F5C3}️', h4: 'ERP', p: 'The system of record around MRP: orders, purchasing, production, stock and finance in one place, with one number everyone works from. It answers &ldquo;what is really happening in the business?&rdquo;.' },
  { icon: '\u{1F3EC}', h4: 'WMS', p: 'Warehouse management: bin locations, directed picking routes, goods-in, despatch and stock accuracy. Worth its own module once the warehouse is big or complex enough to need it.' },
]);

body += L.modulesGrid('erp-modules', 'What’s Included', 'Eight modules, built in the order that pays back fastest.', 'Every business starts with the module that hurts most &mdash; usually stock or orders &mdash; and adds the rest in phases. Nothing you don’t need gets built.', [
  { icon: '\u{1F4E6}', h4: 'Stock &amp; Warehouse', p: 'Multi-site stock, reorder points, lot and serial traceability, barcode scanning and cycle counts.' },
  { icon: '\u{1F9FE}', h4: 'Orders &amp; Fulfilment', p: 'Quote to invoice, pick-pack-despatch, back orders and returns, with Shopify, WooCommerce and Amazon orders flowing in automatically.' },
  { icon: '\u{1F6D2}', h4: 'Purchasing &amp; Suppliers', p: 'Purchase orders, supplier lead times, landed cost including duty, and three-way match against goods-in and invoices.' },
  { icon: '\u{1F3ED}', h4: 'Production &amp; MRP', p: 'Bills of materials, work orders, routing, shop-floor status, WIP and scrap tracking for manufacturers and job shops.' },
  { icon: '\u{1F4B5}', h4: 'Finance Sync &amp; VAT', p: 'Two-way sync with Xero, Sage or QuickBooks, MTD-ready digital records, AR/AP visibility and real margin by job, product and customer.' },
  { icon: '\u{1F91D}', h4: 'CRM &amp; Quoting', p: 'Pipeline and quotes built from live pricing and stock, synced with HubSpot or Salesforce if you already use them.' },
  { icon: '\u{1F465}', h4: 'People &amp; Payroll Data', p: 'Time, roles, approvals and job costing, with clean exports to BrightPay or Sage Payroll and automated workplace-pension contributions.' },
  { icon: '\u{1F4C8}', h4: 'Reporting &amp; Dashboards', p: 'Role-based dashboards, scheduled reports and exports &mdash; the numbers directors actually ask for, without a spreadsheet.' },
], true);

body += L.promise({
  h2: 'We Map Your Real Workflow Before We Write a Line of Code',
  p: 'Every UK engagement starts with your engineering team walking through your actual spreadsheets, exports and daily routines with you &mdash; how an order really moves from quote to cash, where it stalls, who fixes it by hand. You approve a clickable prototype and a data model before development begins, so the system reflects how the business runs today and where you want it to go.',
  href: '#process', cta: 'See Our 6-Step Process',
  img: 'whiteboard-process-mapping-two-colleagues.jpg', alt: 'TechAuditPros engineer mapping a client’s order-to-cash workflow on a whiteboard', w: 2400, h: 1601,
});

// --- SERP parity block: everything the ranking pages cover, then the UK gaps they do not ---
body += L.modulesGrid('production-methods', 'Production Methodologies', 'Whatever you actually make, and however you make it.', 'The ranking comparison sites list production methodologies because ERP fit depends on them. Here is how each one changes what we build &mdash; and every one of these is a configuration of the same custom core, not a different licence tier.', [
  { icon: '\u{1F527}', h4: 'Discrete', p: 'Countable units with bills of materials and routings &mdash; assemblies, equipment, electronics. Serial and lot tracking through build and despatch.' },
  { icon: '\u{2697}️', h4: 'Process &amp; Batch', p: 'Formulas and recipes rather than BOMs, with yields, batch sizing, potency and full forward and backward traceability for food, drink and chemicals.' },
  { icon: '\u{1F3ED}', h4: 'Job Shop', p: 'Every job different: quoting from drawings, per-job routing, machine and labour time capture, and true cost per job when it closes.' },
  { icon: '\u{1F4E5}', h4: 'Make to Order', p: 'Nothing built until the order lands &mdash; demand-driven MRP, promise dates from real capacity, and deposits tracked against the order.' },
  { icon: '\u{1F4E6}', h4: 'Make to Stock', p: 'Forecast and reorder-point planning, safety stock by line, and the finished-goods visibility that stops both stockouts and dead stock.' },
  { icon: '\u{1F9F1}', h4: 'Assemble to Order', p: 'Configurable products built from stocked sub-assemblies &mdash; a product configurator that prices and validates the combination as it is quoted.' },
  { icon: '\u{1F4D0}', h4: 'Engineer to Order', p: 'Design work inside the order: revision control, engineering change orders, CAD file references against the job, and progress billing.' },
  { icon: '\u{267B}️', h4: 'Lean &amp; Just in Time', p: 'Kanban signals, pull replenishment, supplier schedules and takt-time reporting for lines that cannot carry buffer stock.' },
], false);

body += L.benefitRow('erp-costing', 'Costing You Can Defend', 'Standard, actual and job costing &mdash; and the difference it makes at year end.', [
  { icon: '\u{1F4CB}', h4: 'Standard Costing', p: 'Planned cost per unit with variance reporting against it &mdash; material, labour and overhead variances broken out so you can see where the plan broke, not just that margin fell.' },
  { icon: '\u{1F9FE}', h4: 'Actual &amp; Job Costing', p: 'Real material issues, real hours and real machine time rolled up per job or batch, giving true cost of goods manufactured instead of an average that hides your loss-makers.' },
  { icon: '\u{1F4C9}', h4: 'Overhead &amp; WIP', p: 'Overhead absorbed on a basis you choose, with work in progress valued at any date &mdash; the number your accountant asks for at year end, available without a spreadsheet reconstruction.' },
]);

body += L.modulesGrid('uk-compliance', 'UK Compliance, Built In', 'The UK-specific parts the global comparison sites skip.', 'Ranking ERP comparison pages are written for a global audience and barely mention UK obligations. If you trade in Britain, these are not optional extras &mdash; they are scoped before we build.', [
  { icon: '\u{1F9FE}', h4: 'Making Tax Digital for VAT', p: 'Digital records kept from order through invoice, with the VAT figures pushed to Xero, Sage or QuickBooks, which files to HMRC through its own recognised connection. A complete digital audit trail, no re-typing.' },
  { icon: '\u{1F4D8}', h4: 'UK GAAP (FRS 102) Reporting', p: 'Stock valuation, WIP and revenue recognition structured so your accountant&rsquo;s year-end pack comes out of the system rather than out of a spreadsheet rebuild.' },
  { icon: '\u{1F6A2}', h4: 'Post-Brexit Customs', p: 'Commodity codes, country of origin, rules-of-origin evidence, duty and import VAT captured on the purchase and carried into landed cost &mdash; ready for customs declarations and audits.' },
  { icon: '\u{1F510}', h4: 'UK GDPR &amp; PECR', p: 'A data processing agreement naming you as controller, data resident in AWS London, role-based access you can revoke, and the international transfer addendum covering our access from India.' },
  { icon: '\u{1F331}', h4: 'SECR &amp; Reporting Duties', p: 'Energy and carbon figures captured against sites and production where SECR applies, so the annual disclosure is a report, not a project.' },
  { icon: '\u{1F465}', h4: 'Auto-Enrolment &amp; Payroll', p: 'Time and job costing feeding BrightPay or Sage Payroll, with workplace-pension contributions automated instead of re-keyed each period.' },
], true);

body += L.modulesGrid('vs-products', 'If You Are Evaluating the Big Names', 'Sage, NetSuite, Dynamics, Epicor, SAP &mdash; when each one wins, honestly.', 'We are not a reseller and we get nothing if you pick one of these. Published UK list prices, September 2026, and our honest read on where each is the better answer than a custom build.', [
  { icon: '\u{1F4D7}', h4: 'Sage 200 &mdash; from &pound;374/mo', p: 'Wins when your accountant already runs Sage and your processes are standard. Struggles once manufacturing gets specific, or once you need it to behave differently from every other Sage site.' },
  { icon: '\u{1F535}', h4: 'Oracle NetSuite &mdash; from &pound;74/user/mo', p: 'Wins for multi-entity, multi-currency groups that want one global suite. The bill and the implementation both scale with headcount, and customisation lives inside NetSuite&rsquo;s rules.' },
  { icon: '\u{1F7E6}', h4: 'Microsoft Dynamics 365 &mdash; from &pound;82/user/mo', p: 'Wins if you are deep in Microsoft already and want ERP, CRM and BI in one estate. Real fit usually needs a partner, and partner days are where the budget goes.' },
  { icon: '\u{2699}️', h4: 'Epicor Kinetic &mdash; from &pound;75/user/mo', p: 'Strong, genuinely manufacturing-first functionality for discrete makers. Heavier than most UK SMEs need, and priced per user as you grow the shop floor.' },
  { icon: '\u{1F536}', h4: 'SAP Business One &mdash; from &pound;77/user/mo', p: 'Wins when a parent company mandates SAP or you need the SAP ecosystem. Expect partner-led implementation and change requests through that partner.' },
  { icon: '\u{2705}', h4: 'Custom (TechAuditPros) &mdash; one agreed monthly fee', p: 'Wins when your processes are the reason you are still on spreadsheets, when per-user fees are rising faster than the business, or when you need the ERP, the website and the search all pulling together.' },
], false);

body += L.benefitRow('erp-risks', 'Where ERP Projects Actually Go Wrong', 'The four failure modes &mdash; and how each engagement is set up to avoid them.', [
  { icon: '\u{1F5C2}️', h4: 'Dirty Data', p: 'Duplicate parts, wrong costs, stock that never matched. We reconcile and clean during migration, and run old and new side by side before cut-over rather than after.' },
  { icon: '\u{1F4C8}', h4: 'Scope Drift', p: 'Phase one becomes everything. Each phase is one module with a defined outcome, live on real data, before the next one starts &mdash; and the flat monthly rate means scope talk is not a billing negotiation.' },
  { icon: '\u{1F464}', h4: 'Nobody Adopts It', p: 'A system built for the org chart, not the job. Your team tests every sprint on their own data, so by go-live they are using something they helped shape.' },
  { icon: '\u{1F50C}', h4: 'Integrations Discovered Late', p: 'The surprise that blows the timeline. Every integration is proven against the live API during discovery, not assumed from a feature list.' },
]);

body += L.compareTable('erp-compare', 'Custom vs. Subscription vs. Legacy', 'Three ways to run a UK business on software &mdash; compared honestly.', 'The right answer depends on how standard your processes are and how fast you are hiring. Here is how the options actually differ, with published UK prices for orientation.', ['Custom ERP (TechAuditPros)', 'Subscription ERP (SaaS)', 'Legacy on-premise ERP'], 0, [
  ['Fit to your workflows', 'Coded around your processes; nothing generic to work around', 'You configure around the vendor’s model; edge cases become workarounds', 'Deep but rigid; changes need specialist consultants'],
  ['Pricing model', 'One agreed monthly fee, all-in', '&pound;74&ndash;&pound;112 per user per month, plus implementation', 'Large upfront licence plus annual maintenance'],
  ['Per-user fees', 'None &mdash; add staff, sites and warehouses freely', 'Every new hire raises the bill', 'Usually per seat or per module'],
  ['Implementation', 'First module live in 6&ndash;10 weeks, phased rollout', 'Commonly 3&ndash;6 months for a small business, 6&ndash;12 mid-market, billed separately', 'Often 12 months or more'],
  ['Integrations', 'Built on the official APIs of the tools you keep (Xero, Sage, Shopify&hellip;)', 'Marketplace connectors; gaps need middleware', 'Custom connectors, expensive to maintain'],
  ['UK compliance', 'MTD-ready records, UK GDPR scoped up front, duty and rules-of-origin fields where you import', 'Depends on the vendor’s UK localisation', 'Usually solid, but changes are chargeable'],
  ['Changes after go-live', 'Included &mdash; the same team keeps evolving it', 'Wait for the vendor roadmap or pay for add-ons', 'Change requests billed by the hour'],
  ['Data ownership &amp; residency', 'Your cloud account, AWS London, your code', 'Vendor’s multi-tenant cloud; export on exit', 'Your servers, your hardware costs'],
  ['Best for', 'UK SMEs with non-standard processes or rising per-seat costs', 'Standard processes, small stable teams, fast start', 'Regulated environments that must stay on-premise'],
], true, 'Third-party figures are published UK list prices as of September 2026 (Oracle NetSuite from &pound;74/user/mo, Epicor Kinetic &pound;75, SAP Business One &pound;77, Microsoft Dynamics 365 &pound;82, Infor CloudSuite &pound;112, Sage 200 from &pound;374/mo) and vary with scope and reseller. Our rate is fixed in writing before work starts.');

body += L.processRow('process', 'How We Build It', 'A 6-step process from your spreadsheets to a running system.', [
  { h4: 'Discovery &amp; Data Walkthrough', p: 'Your engineering team studies your real data, tools and daily pain points with you &mdash; not a generic questionnaire.' },
  { h4: 'Blueprint &amp; Prototype', p: 'A data model and clickable screens you approve before development, so nothing is built on a guess.' },
  { h4: 'Build in Two-Week Sprints', p: 'First working module in 6&ndash;10 weeks; you test each sprint on your own data and steer priorities.' },
  { h4: 'Migrate &amp; Integrate', p: 'Spreadsheet, Xero or Sage and e-commerce history imported and reconciled; live syncs switched on.' },
  { h4: 'Go-Live &amp; Training', p: 'Role-based training and a cut-over plan, with a parallel run where the risk justifies it.' },
  { h4: 'Run &amp; Evolve', p: 'The same team keeps improving the system every month, with a written report of what shipped.' },
]);

body += L.costGrid('erp-cost', 'Cost &amp; Timeline', 'What ERP actually costs a UK business &mdash; with real numbers.', 'Most ERP pages hide pricing behind a form. Here is the honest picture for a UK small or mid-size business, alongside published market rates.', [
  { tag: 'Typical UK custom build', num: '&pound;40k&ndash;&pound;150k+', sub: 'Upfront project fee, commonly quoted', items: ['6&ndash;18 months before the full system is usable', 'Change requests billed hourly after launch', 'You fund everything before you see value', 'Support retainer on top'] },
  { tag: 'TechAuditPros', num: 'Let’s talk', sub: 'Scoped on the call and put in writing', hi: true, items: ['Dedicated engineering team from discovery through support', 'First working module in 6&ndash;10 weeks; full system phased over 4&ndash;9 months', 'Integrations, migration and training included', 'AWS London hosting in your own account; you own the code', 'Monthly written report; stop any time'] },
  { tag: 'Subscription ERP (SaaS)', num: '&pound;74&ndash;&pound;112', sub: 'Per user per month, plus implementation', items: ['Independent UK research puts all-in cost at &pound;15,000&ndash;&pound;60,000 a year', 'Bill rises with every hire and every module', 'Customisation limited to what the vendor allows', 'Data lives in the vendor’s cloud'] },
], 'Third-party ranges reflect published UK pricing and commonly quoted project fees as of September 2026, shown for orientation; they vary with scope. Our rate is fixed in writing before work starts.', true);

body += L.promise({
  h2: 'Your Day Ends. Our Build Day Overlaps It.',
  p: 'Kochi runs 4.5 hours ahead of London in summer and 5.5 in winter &mdash; so you get a live overlap window every UK morning and early afternoon for calls and Slack, and anything you send at the end of your day is picked up before ours ends. You get a weekly demo, a monthly report in plain English, and the same team on your project from the first call to the hundredth deploy.',
  href: '#erp-faq', cta: 'Read the FAQ',
  img: 'female-developer-red-hair-dual-monitors-code.jpg', alt: 'A TechAuditPros engineer building a client’s ERP module at a dual-monitor workstation', w: 2400, h: 1601,
});

body += L.industriesGrid('erp-industries', 'Who It’s For', 'Built for the UK businesses that outgrow off-the-shelf software first.', 'The same core &mdash; stock, orders, purchasing, finance sync, reporting &mdash; shaped around how each of these actually operates.', [
  { img: 'istock-2155877725-factory-engineers-hardhats-tablet.jpg', alt: 'Manufacturing engineers reviewing production status on a tablet', w: 612, h: 408, h4: 'Manufacturers &amp; Job Shops', p: 'Bills of materials, work orders, routing and shop-floor status &mdash; MRP without the per-user licence.' },
  { img: 'istock-2189585598-electronics-factory-engineers-laptop.jpg', alt: 'Engineers checking stock and orders on a laptop in a facility', w: 612, h: 344, h4: 'Distributors &amp; E-commerce', p: 'Multi-site stock, Shopify and Amazon order flow, purchasing and landed cost including duty in one place.' },
  { img: 'istock-1496103633-healthcare-nurse-tablet-hologram.jpg', alt: 'Clinical staff member reviewing records on a tablet', w: 612, h: 375, h4: 'Clinics &amp; Care Providers', p: 'Scheduling, consumables, billing exports and reporting for multi-site practices, with compliance scoped up front.' },
  { img: 'istock-2196870531-consultants-walking-tablet-corridor.jpg', alt: 'Consultants reviewing a project dashboard while walking through an office', w: 612, h: 408, h4: 'Professional &amp; Field Services', p: 'Jobs, crews, quotes, time and invoicing connected &mdash; from building services and construction to agencies and consultancies.' },
], false);

body += L.faqHtml('erp-faq', 'FAQ', 'Custom ERP Development in the UK: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s map your operations and scope the build.', 'Takes 60 seconds &middot; GBP pricing &middot; No long-term contract');
s = L.injectExtras(s);

// sanity
L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/seo-services/"'); L.must(s, 'href="/uk/website-development/"');
L.must(s, 'https://techauditpros.com/ca/erp/', 1);      // hreflang alternate only
L.must(s, 'Canadian', 0); L.must(s, 'CA$1,490', 0); L.must(s, 'US$', 0);
// FAQ copy exists twice by design (visible HTML + FAQPage schema), so these are presence checks
L.must(s, 'Making Tax Digital'); L.must(s, 'eu-west-2'); L.must(s, 'reverse charge');
L.must(s, 'one agreed monthly fee'); L.must(s, 'library/istock', 4);   // 612px files on the small industry cards only
// SERP parity (crawled 2026-09-03): every theme the ranking pages carry must be present
['Discrete', 'Process &amp; Batch', 'Job Shop', 'Make to Order', 'Make to Stock', 'Assemble to Order',
 'Engineer to Order', 'Lean &amp; Just in Time', 'Standard Costing', 'Overhead &amp; WIP', 'FRS 102',
 'Post-Brexit Customs', 'SECR', 'Sage 200', 'Oracle NetSuite', 'Microsoft Dynamics 365', 'Epicor Kinetic',
 'SAP Business One', 'Dirty Data', 'Scope Drift'].forEach(k => L.must(s, k));
L.write('uk/erp/index.html', s);
