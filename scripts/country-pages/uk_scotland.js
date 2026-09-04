'use strict';
// /uk/scotland/ — PLAN-UK phase 2, page four, and the last of the location set.
// One page for two cities on purpose: Edinburgh 160/mo and Aberdeen 160/mo, all of it at KD 0-8
//   erp manufacturing software edinburgh 90/KD8 · erp manufacturing software aberdeen 90/KD0 ·
//   erp for small business edinburgh 70/KD0 · erp for small business aberdeen 70/KD0
// Two separate pages at that volume would each be thin and would compete with each other; one page with
// real substance about both economies is the stronger asset. (PLAN-UK phase 2 called this correctly.)
// SERP crawl 2026-09-03: searches for Aberdeen and Edinburgh ERP return a mix of Clutch and GoodFirms
// directory listings and small consultancy location pages. The genuinely useful signal in the results:
// Aberdeen ERP work is tied to ENERGY SERVICES - one firm advertises "custom software and integration
// for Aberdeen energy-services firms with field-to-ERP systems", another specialises in housebuilding,
// construction and manufacturing from Broadfold Business Centre - while Edinburgh results are dominated
// by Business Central resellers and general ERP consultancies. Neither city has a substantial,
// non-templated page about running ERP in Scotland. clutch.co blocked automated reading (403), so the
// directory shape is taken from the search results rather than a page read.
// So this page is built on the split that actually exists: Aberdeen's field-to-office problem, and
// Edinburgh's professional/finance and food-and-drink shape. Unique sections and signature animation.
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/scotland/';
let s = L.read('ca/toronto/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.replaceAll(s, 'href="/ca/toronto/"', 'href="/uk/scotland/"');
s = s.split('Toronto').join('Scotland').split('Ontario').join('Scotland').split('the GTA').join('the central belt');
if (s.includes('ca/scotland')) throw new Error('a /ca/toronto/ path survived the href repointing');
s = L.ukSpelling(s);   // prose only -- see lib.js; a blanket pass here broke every centred element
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'ERP Software for Scottish Businesses &mdash; Edinburgh &amp; Aberdeen | TechAuditPros',
  ogTitle: 'ERP for Edinburgh, Aberdeen &amp; Scottish Manufacturers',
  desc: 'Custom ERP for businesses in Edinburgh, Aberdeen and across Scotland &mdash; field-to-office for energy services, batch traceability for food and drink, stock and works orders for manufacturers. Integrated with Xero and Sage, MTD-ready, hosted in AWS London. Remote team, audit first.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }],
});

const faqs = [
  { q: 'Why one page for Edinburgh and Aberdeen rather than two?', a: 'Because they are two different economies and we would rather write honestly about both than publish two thin pages competing with each other. Aberdeen&rsquo;s software problem is mostly field-to-office: crews, equipment and jobs happening away from a desk, in energy services, inspection, fabrication and construction. Edinburgh&rsquo;s is mostly office-to-office: professional and financial services, plus the food and drink producers across the central belt and beyond. The ERP core is the same; which module comes first is not.' },
  { q: 'Do you have an office in Scotland?', a: 'No. TechAuditPros is an engineering team in Kochi, India, working for UK clients remotely, and we say so before you ask. Kochi is 4.5 hours ahead of Scotland in summer and 5.5 in winter, so there is a live window every morning and early afternoon for calls, Slack or Teams. If your work needs someone on a site in Dyce or at a plant in Fife on a regular basis, hire locally &mdash; there are good firms in both cities and we will point you at that answer on the call.' },
  { q: 'What does field-to-ERP actually mean for an Aberdeen energy-services business?', a: 'It means the job does not exist twice. A crew books time, materials, equipment and inspection results on a phone or tablet at the site &mdash; often offline, because signal on a yard or an installation is not a given &mdash; and it syncs into the same system that raises the purchase order, tracks the equipment, values the work in progress and invoices the client. The alternative, which is what most businesses actually live with, is a paper timesheet, a spreadsheet, a WhatsApp photo and someone re-typing all three on Monday.' },
  { q: 'Can you handle equipment, calibration and certification tracking?', a: 'Yes, and in Scottish energy and inspection work it is usually essential. Serialised equipment with location and custody, calibration and certification dates with expiry warnings, service history against the asset, and the paperwork attached to the job rather than in a folder on someone&rsquo;s desktop. If a client audit asks what was used on a job in March and when it was last certified, the system answers it.' },
  { q: 'What about batch traceability for food and drink?', a: 'Recipes and batches rather than parts lists, yields and losses recorded where they happen, allergen data carried through, and full forward and backward lot traceability &mdash; so a recall question is a query rather than a fortnight of reconstruction. Cask, tank and maturation tracking are the same problem shaped differently, and we have built that pattern before.' },
  { q: 'Is anything different about doing this in Scotland rather than England?', a: 'For the software, less than people expect. VAT and Making Tax Digital are UK-wide through HMRC, Companies House is UK-wide, and the accounting stack is the same Xero, Sage and QuickBooks. What genuinely differs is legal: Scotland has its own legal system, so contracts, partnerships and property matters follow Scots law, and public-sector tenders run through Public Contracts Scotland rather than the UK-wide portals. We build to what your solicitor or adviser specifies rather than pretending to advise on it ourselves.' },
  { q: 'How much does it cost?', a: 'One agreed monthly fee, quoted in writing on the call once we have seen how you actually run. For orientation, published UK list prices for subscription ERP sit around &pound;74&ndash;&pound;112 per user per month before implementation, and Sage 200 starts near &pound;374 a month &mdash; per-seat pricing that becomes the problem as you add crews and shifts. There is no upfront project fee here and no separate implementation invoice.' },
  { q: 'How long until something is actually running?', a: 'Six to ten weeks to a first working module on your own data. For an Aberdeen services business that is usually job and time capture; for a manufacturer it is stock or works orders; for a food and drink producer it is batches and traceability. The rest follows in phases over roughly four to nine months, in use as it lands.' },
  { q: 'Our sites have poor connectivity. Does that break a cloud system?', a: 'It would, if we built it naively. Capture screens &mdash; job booking, time, materials, scanning, inspection results &mdash; are built to work offline and sync when the connection returns, because yards, plants and installations are not office wifi. The office side runs in the cloud, hosted in AWS London (eu-west-2) in an account you own.' },
  { q: 'Who owns the system and the data?', a: 'You do, entirely and from day one: the code, the database, the documentation and the cloud account, all in your name, with the data resident in the UK. We work under an NDA and a UK GDPR data processing agreement, with access you can revoke at any time.' },
  { q: 'What happens on the first call?', a: 'We follow one real job through your business &mdash; from enquiry to invoice, including whatever currently happens on paper &mdash; and tell you where a system would pay for itself and where it would just add admin. You keep that assessment either way, and if the answer is that you need a process fixed rather than software bought, that is what we will say.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Custom ERP Software Development', name: 'Custom ERP for Edinburgh, Aberdeen and Scottish Businesses', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'Custom ERP for Scottish businesses: field-to-office job, time and equipment capture for energy services, batch and lot traceability for food and drink, stock and works orders for manufacturers, integrated with Xero and Sage, MTD-ready, hosted in AWS London.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['Scotland', URL]]),
  L.faqSchema(faqs),
]);

s = L.must(s, '<span>to Scotland.</span>', 1);
s = L.replaceAll(s, 'heroArcPathCA', 'heroArcPathSCO');
s = L.setRotatePhrases(s, 'Scotland', 'Audit before any retainer', 'Aberdeen &bull; Edinburgh &bull; Dyce &bull; the central belt', 'Scotland');
s = L.setHero(s, {
  eyebrow: 'Custom ERP &mdash; Edinburgh, Aberdeen &amp; Scotland',
  h1: 'ERP for Scottish Businesses, <span>From the Yard to the Ledger.</span>',
  sub: 'Job, time and equipment capture that works offline on a site in Aberdeen; batch and lot traceability for food and drink; stock and works orders for manufacturers across the central belt &mdash; all feeding one system that talks to your Xero or Sage. Remote team, audit first, data hosted in the UK.',
  ghostHref: '#sco-two', ghostText: 'Two cities, two problems &darr;',
  features: ['\u{1F6E0}️ Offline Field Capture', '\u{1F4E6} Batch &amp; Lot Traceability', '\u{1F1EC}\u{1F1E7} AWS London'],
  trust: [['250+', 'Projects delivered'], ['6&ndash;10 wks', 'To first working module'], ['Audit', 'Before any retainer'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('TechAuditPros builds <strong>custom ERP for Scottish businesses</strong> &mdash; Aberdeen, Edinburgh, Dyce, Fife and the central belt. For energy services and inspection work that means <strong>field-to-office capture that works offline</strong>: crews booking time, materials, equipment and results on site, syncing into the system that raises the purchase order and the invoice. For food and drink it means <strong>batch and lot traceability</strong>. For manufacturers it means stock and works orders. All of it integrated with <strong>Xero or Sage</strong>, MTD-ready, hosted in <strong>AWS London</strong> in an account you own. We work remotely from India; there is no Scottish office.');

body += L.benefitRow('sco-two', 'Two Cities, Two Different Problems', 'Why this page covers both rather than pretending they are the same market.', [
  { icon: '\u{1F6A7}', h4: 'Aberdeen: Field to Office', p: 'Energy services, inspection, fabrication and construction &mdash; work that happens on a yard, a site or an installation, then has to become a costed, invoiced job. The gap between the two is where the money leaks.' },
  { icon: '\u{1F3E6}', h4: 'Edinburgh: Office to Office', p: 'Professional and financial services with real back-office process &mdash; onboarding, project costing, approvals, month-end &mdash; plus the software and fintech layer that expects a system to behave like a product.' },
  { icon: '\u{1F943}', h4: 'And Across the Belt: Batches', p: 'Food, drink and process manufacturers from Fife to Speyside: recipes rather than parts lists, yields, allergens, cask and tank tracking, and traceability that answers a recall question in minutes.' },
]);

body += L.modulesGrid('sco-field', 'The Field-to-Office Modules', 'Six pieces, built to work where the signal does not.', 'This is the Aberdeen-shaped build. For an Edinburgh professional-services engagement the first module is usually project costing instead &mdash; the audit decides.', [
  { icon: '\u{1F4F1}', h4: 'Offline Job &amp; Time Capture', p: 'Crews book hours, materials and progress on a phone or tablet with no signal, and it syncs when the connection returns. No paper timesheet, no Monday re-typing.' },
  { icon: '\u{1F527}', h4: 'Equipment &amp; Custody', p: 'Serialised assets with location and who has them, service history against the asset, and hire or cross-charge where equipment moves between jobs.' },
  { icon: '\u{1F4C5}', h4: 'Calibration &amp; Certification', p: 'Certification and calibration dates with expiry warnings before a job is scheduled, and the certificate attached to the job record rather than a folder on a desktop.' },
  { icon: '\u{1F4CB}', h4: 'Inspection &amp; Sign-Off', p: 'Structured results, photographs and client sign-off captured on site, so the report is generated rather than written up afterwards.' },
  { icon: '\u{1F4B0}', h4: 'Job Costing &amp; WIP', p: 'True cost per job as it accrues &mdash; labour, materials, equipment, subcontract &mdash; and work in progress valued at any date, which is the number your accountant asks for.' },
  { icon: '\u{1F9FE}', h4: 'Invoice &amp; Finance Sync', p: 'Application-for-payment or milestone invoicing, then a clean two-way sync with Xero or Sage, MTD-ready, with nobody re-keying figures.' },
], true);

body += L.promise({
  h2: 'We Follow One Job From Enquiry to Invoice',
  p: 'Before anything is quoted we take a single real job and follow it the whole way through with the people who do it &mdash; the enquiry, the quote, what gets written on paper at the site, the photograph in someone&rsquo;s phone, the spreadsheet that holds the truth, the argument at month end about what it actually cost. That walkthrough is the audit, and the audit sets the build order. You keep it whatever you decide, and it will tell you plainly if the fix is a process rather than a system.',
  href: '#sco-timeline', cta: 'See the Build Order',
  img: 'istock-1489414046-woman-engineer-laptop-ops-room.jpg', alt: 'Operations engineer reviewing job and equipment data', w: 612, h: 323,
});

body += L.processRow('sco-timeline', 'How It Gets Built', 'Five steps, and what you have at the end of each.', [
  { h4: 'Week 1 &mdash; Follow the Job', p: 'One real job, end to end, with the crew and the office. Every workaround written down in the words the people using it chose.' },
  { h4: 'Week 2 &mdash; Audit &amp; Order', p: 'A plain-English document: what to build first, what it saves, what it will not fix. Yours to keep either way.' },
  { h4: 'Weeks 3&ndash;10 &mdash; First Module', p: 'Usually offline job and time capture for a services business, stock or works orders for a manufacturer, batches for food and drink. Live on your own data.' },
  { h4: 'Months 3&ndash;9 &mdash; The Rest', p: 'Equipment and certification, costing and WIP, invoicing and finance sync &mdash; each in use before the next begins.' },
  { h4: 'Then &mdash; Monthly', p: 'The same team keeps improving it, with a written report of what shipped and what is next.' },
]);

body += L.benefitRow('sco-uk', 'What Is Actually Different North of the Border', 'Three honest answers, including the parts we do not advise on.', [
  { icon: '\u{1F9FE}', h4: 'Tax and Accounts: UK-Wide', p: 'VAT and Making Tax Digital run through HMRC UK-wide, Companies House is UK-wide, and the accounting stack is the same Xero, Sage and QuickBooks. Nothing special is needed here, and anyone telling you otherwise is selling something.' },
  { icon: '⚖️', h4: 'Law: Genuinely Different', p: 'Scotland has its own legal system, so contracts, partnerships and property follow Scots law. We build to what your solicitor specifies and we do not pretend to advise on it.' },
  { icon: '\u{1F4C4}', h4: 'Public Tenders: Their Own Portal', p: 'Public-sector work in Scotland runs through Public Contracts Scotland rather than the UK-wide portals, which matters if your pipeline includes council, NHS Scotland or Scottish Government work &mdash; the system should produce the documentation those tenders ask for.' },
]);

body += L.industriesGrid('sco-sectors', 'Where This Lands in Scotland', 'Four sector shapes, one engineering standard.', 'Each needs a different first module, and each has a different definition of the job being finished.', [
  { img: 'istock-2155877725-factory-engineers-hardhats-tablet.jpg', alt: 'Engineers reviewing job data on a tablet on site', w: 612, h: 408, h4: 'Energy Services &amp; Inspection', p: 'Aberdeen and Dyce: crews, equipment, certification and offline capture, with WIP visible before the month closes.' },
  { img: 'istock-2189585598-electronics-factory-engineers-laptop.jpg', alt: 'Manufacturing team checking stock and orders', w: 612, h: 344, h4: 'Engineering &amp; Fabrication', p: 'Make-to-order and job-shop work: quoting from drawings, routing, subcontract operations and true cost per job.' },
  { img: 'istock-1094918638-manager-tablet-evening-office-smile.jpg', alt: 'Food and drink producer reviewing batch records', w: 612, h: 392, h4: 'Food, Drink &amp; Process', p: 'Recipes and batches, yields, allergens, cask and tank tracking, and lot traceability that survives an audit.' },
  { img: 'executive-woman-tablet-grand-hall.jpg', alt: 'Professional services team reviewing project costing', w: 2400, h: 1601, h4: 'Professional &amp; Financial Services', p: 'Edinburgh: onboarding, project and client costing, approvals and month-end that does not depend on one spreadsheet.' },
], false);

body += L.benefitRow('sco-remote', 'Remote, and Where That Fails', 'How this works from Aberdeen or Edinburgh, and when to hire locally instead.', [
  { icon: '\u{1F551}', h4: 'Mornings Overlap', p: 'Kochi is 4.5 hours ahead in summer, 5.5 in winter. Every Scottish morning and early afternoon there is a live window for calls; anything sent at the end of your day is picked up before ours ends.' },
  { icon: '\u{1F4F9}', h4: 'Weekly Proof', p: 'A staging system you click through every week and a written report monthly &mdash; which matters more at distance, not less.' },
  { icon: '⚠️', h4: 'When Distance Loses', p: 'If someone needs to be on the yard with the crew during rollout, or your client audits require a UK-resident supplier on site, hire locally. Both cities have capable firms and we will say so.' },
]);

body += L.faqHtml('sco-faq', 'FAQ', 'ERP in Scotland: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s follow one job through your business.', 'Takes 60 seconds &middot; the audit is yours to keep &middot; No long-term contract');
s = L.injectExtras(s);

L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/scotland/"');
L.must(s, 'Toronto', 0); L.must(s, 'Ontario', 0); L.must(s, 'Canadian', 0); L.must(s, 'CA$', 0); L.must(s, 'US$', 0);
L.must(s, '<section class="tap-erp-why-section', 0);
L.must(s, 'Aberdeen'); L.must(s, 'Edinburgh'); L.must(s, 'Public Contracts Scotland'); L.must(s, 'Scots law');
L.must(s, 'no Scottish office');
L.write('uk/scotland/index.html', s);
