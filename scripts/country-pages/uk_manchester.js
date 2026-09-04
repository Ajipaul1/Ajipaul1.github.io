'use strict';
// /uk/manchester/ — the cheapest ranking win in the whole UK dataset (PLAN-UK phase 2).
// Targets: erp manufacturing software manchester 110/KD7 · cloud erp manchester 110/KD11 ·
//          erp for small business manchester 70/KD0 · enterprise resource planning manchester 50/KD0
//          (340/mo combined, every term at KD 11 or below) plus the Greater Manchester long tail.
// SERP crawl 2026-09-03: the page currently ranking for "erp manufacturing software manchester"
// (alphavima.com/manufacturing/microsoft-erp-for-manufacturing-in-manchester-uk) is ~1,200-1,400 words
// with ZERO Manchester-specific content - no districts, no local sectors, no local figures, no local
// case study; roughly 95% is location-agnostic Business Central copy with the city only in the title
// and URL. It does have a six-question FAQ and no pricing. clutch.co/it-services/erp/uk/england/
// manchester is a directory of consultants.
// So the whole opportunity here is being the page that is actually about Manchester: real districts and
// industrial estates, the sectors that are genuinely concentrated in Greater Manchester, the practical
// realities of running a plant here, and an honest statement that we are remote. Everything below is
// either verifiable public geography/industry fact or plainly framed as our own approach - no invented
// local clients, no fake local office.
// Section vocabulary is unique to this page (owner: every page its own independent design and content).
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/manchester/';
let s = L.read('ca/toronto/index.html');

// the template is the Toronto city page: repoint every service and market link
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.replaceAll(s, 'href="/ca/toronto/"', 'href="/uk/manchester/"');
// blanket localisation: this page is entirely about Manchester, so any surviving Toronto string
// (drawer labels, nav copy, stray sentences) would be a bug. Runs after the href repointing above.
s = s.split('Toronto').join('Manchester').split('Ontario').join('Greater Manchester').split('the GTA').join('Greater Manchester');
if (s.includes('ca/manchester')) throw new Error('a /ca/toronto/ path survived the href repointing');
['optimization|optimisation', 'Optimization|Optimisation', 'optimize|optimise', 'optimized|optimised',
 'organization|organisation', 'analyze|analyse', 'behavior|behaviour', 'license|licence',
 'center|centre', 'Center|Centre'].forEach(pair => { const [us_, uk_] = pair.split('|'); s = s.split(us_).join(uk_); });
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'ERP Software for Manchester Manufacturers | TechAuditPros',
  ogTitle: 'Manufacturing ERP &amp; Cloud ERP for Manchester Businesses',
  desc: 'Custom manufacturing and cloud ERP for Greater Manchester businesses &mdash; stock, works orders, purchasing and finance in one system, integrated with Xero and Sage, MTD-ready, hosted in AWS London. Remote team, audit first, no long-term contract.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }],
});

const faqs = [
  { q: 'Do you have an office in Manchester?', a: 'No, and we will not pretend otherwise. TechAuditPros is an engineering team in Kochi, India, working for UK clients remotely &mdash; 4.5 hours ahead of Manchester in summer and 5.5 in winter, which gives you a live overlap window every morning and early afternoon. If your project genuinely needs someone walking the shop floor weekly, a local firm is the better answer and we will say so on the call. If it needs software built properly and supported every month, distance has not been the problem for our clients in North America or Australia.' },
  { q: 'What does manufacturing ERP need to do for a Greater Manchester factory?', a: 'The same things it needs anywhere, in this order: know what stock you actually hold across sites, turn an order into a works order with a real promise date, tell you the true cost of a job when it closes, and hand clean figures to Xero or Sage without anyone re-typing them. Around here that usually also means handling subcontract operations &mdash; plating, powder coating, heat treatment sent out and brought back &mdash; because so much of the local supply chain works that way.' },
  { q: 'Which Manchester sectors do you build for?', a: 'Greater Manchester&rsquo;s manufacturing base is broad rather than single-industry: textiles and technical fabrics, food and drink, plastics and packaging, engineering and metal fabrication, electronics, and increasingly advanced materials work linked to the universities. We also build for distribution and e-commerce operations around the M60 and the airport corridor, and for professional services in the city centre. The ERP core is the same; the production layer differs by sector, which is what the audit establishes first.' },
  { q: 'We are on Sage. Do we have to replace it?', a: 'No, and usually you should not. Sage or Xero stays as the book of record for accounts, and the ERP becomes the system of record for operations, feeding it clean figures through the official API. That keeps your accountant on software they trust, keeps you MTD-compliant for VAT, and stops the double entry that eats an afternoon a week.' },
  { q: 'What is cloud ERP and is it right for a factory?', a: 'Cloud ERP means the system runs on hosted infrastructure rather than a server in the corner of the office. For a Manchester manufacturer the practical benefits are that it is reachable from a second site, from a customer&rsquo;s premises and from a phone on the shop floor, it is backed up without anyone remembering to do it, and it does not need replacing every five years. Where connectivity on an older industrial estate is genuinely unreliable we build offline-tolerant screens for scanning and job booking, so the line does not stop when the internet does.' },
  { q: 'How long before we see something working?', a: 'Six to ten weeks to a first working module on your own data &mdash; normally stock or works orders, whichever is hurting most &mdash; then the rest in phases over roughly four to nine months. You are using each piece as it lands rather than waiting for one big go-live weekend.' },
  { q: 'How much does it cost?', a: 'One agreed monthly fee, quoted in writing on the call once we have seen how you actually run. For orientation, published UK list prices for subscription ERP sit around &pound;74&ndash;&pound;112 per user per month before implementation, and Sage 200 starts near &pound;374 a month &mdash; which is why per-seat pricing becomes the problem as you add shifts and sites. There is no upfront project fee here and no separate implementation invoice.' },
  { q: 'Who owns the system and the data?', a: 'You do, entirely. The code, the database and the documentation are yours from day one, hosted in a cloud account in your name in AWS London (eu-west-2) so the data stays in the UK. We work under an NDA and a UK GDPR data processing agreement, with access you can revoke.' },
  { q: 'Can you also fix our website and our search visibility?', a: 'Yes, and it is usually the same conversation. The same team builds the ERP, the website and the search work, which is why the site can show live stock or lead times without a fragile integration in between. Plenty of Manchester businesses come to us for one and add the others when the first has paid for itself.' },
  { q: 'What happens on the first call?', a: 'We look at how an order moves through your business today &mdash; the spreadsheets, the whiteboard, the bit only one person understands &mdash; and tell you where software would actually help and where it would just add admin. You get that assessment whether or not you hire us.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Custom ERP Software Development', name: 'Manufacturing and Cloud ERP for Greater Manchester Businesses', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'Custom manufacturing and cloud ERP software for Greater Manchester businesses: stock, works orders, subcontract operations, purchasing and finance in one system, integrated with Xero and Sage, MTD-ready, hosted in AWS London.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['Manchester', URL]]),
  L.faqSchema(faqs),
]);

// the ghost text already reads "to Manchester." after the blanket localisation above; only the arc id
// still needs a city-specific name so two city pages can never collide in one DOM
s = L.must(s, '<span>to Manchester.</span>', 1);
s = L.replaceAll(s, 'heroArcPathCA', 'heroArcPathMCR');
// the template also carries a dead rotateText array still full of Canadian phrases; setRotatePhrases
// has literal fallbacks for exactly those, and its regex branches are no-ops on this template
s = L.setRotatePhrases(s, 'Manchester', 'Audit before any retainer', 'Trafford Park &bull; Salford &bull; Oldham &bull; Stockport', 'Greater Manchester');
s = L.setHero(s, {
  eyebrow: 'Manufacturing &amp; Cloud ERP &mdash; Greater Manchester',
  h1: 'ERP Software for Manchester Manufacturers, <span>Built Around Your Shop Floor.</span>',
  sub: 'Stock, works orders, subcontract operations, purchasing and finance in one system &mdash; integrated with the Xero or Sage you already run, MTD-ready, hosted in AWS London. We are a remote engineering team, we say so up front, and every engagement starts with an audit of how your orders actually move.',
  ghostHref: '#mcr-floor', ghostText: 'See how it maps to your floor &darr;',
  features: ['\u{1F3ED} Works Orders &amp; MRP', '\u{1F501} Subcontract Tracking', '\u{1F1EC}\u{1F1E7} AWS London'],
  trust: [['250+', 'Projects delivered'], ['6&ndash;10 wks', 'To first working module'], ['Audit', 'Before any retainer'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('TechAuditPros builds <strong>custom manufacturing and cloud ERP</strong> for businesses across <strong>Greater Manchester</strong> &mdash; from Trafford Park and Salford to Oldham, Bury, Stockport and the M60 corridor. One system for stock, works orders, subcontract operations, purchasing and finance, integrated with <strong>Xero or Sage</strong>, MTD-ready for VAT, and hosted in <strong>AWS London</strong> in an account you own. We work remotely from India, there is no Manchester office, and every engagement opens with an audit rather than a retainer.');

body += L.benefitRow('mcr-floor', 'Built for How Manchester Actually Manufactures', 'Three realities of a Greater Manchester plant that generic ERP ignores.', [
  { icon: '\u{1F501}', h4: 'Subcontract In and Out', p: 'Plating, powder coating, heat treatment, laser cutting &mdash; so much of the local supply chain runs on work leaving the building and coming back. The system tracks the job while it is out, holds the cost, and does not lose the traceability.' },
  { icon: '\u{1F3E2}', h4: 'More Than One Site', p: 'A unit in Trafford Park and a store in Oldham is a normal shape here. Stock has to be true per site, transfers have to be recorded, and one person has to be able to see the whole picture without walking between buildings.' },
  { icon: '\u{1F4F6}', h4: 'Industrial-Estate Connectivity', p: 'Some units still have unreliable broadband. Scanning and job booking screens are built offline-tolerant and sync when the link returns, so the line does not stop because the internet did.' },
]);

body += L.modulesGrid('mcr-build', 'What Gets Built First', 'Six modules, in the order that pays for itself fastest.', 'The audit sets the order for your business. This is the sequence most Greater Manchester manufacturers end up with.', [
  { icon: '\u{1F4E6}', h4: 'Stock Across Sites', p: 'Real quantities per location and bin, reorder points that reflect actual lead times, lot and serial traceability, and barcode scanning that works on a warehouse phone.' },
  { icon: '\u{1F4CB}', h4: 'Works Orders &amp; Routing', p: 'Bills of materials, operations and routing, labour and machine time booked against the job, scrap recorded where it happens rather than guessed at month end.' },
  { icon: '\u{1F6D2}', h4: 'Purchasing &amp; Subcontract', p: 'Purchase orders with real supplier lead times, subcontract operations tracked while off site, landed cost including duty, and three-way match against goods-in.' },
  { icon: '\u{1F4B0}', h4: 'Job Costing', p: 'True cost of every job when it closes &mdash; material, labour, machine, subcontract and overhead &mdash; so you can see which customers and which products actually make money.' },
  { icon: '\u{1F9FE}', h4: 'Finance Sync &amp; VAT', p: 'Two-way sync with Xero or Sage, MTD-ready digital records from order through invoice, and no one re-typing figures between systems.' },
  { icon: '\u{1F4CA}', h4: 'The Board Report', p: 'On-time delivery, margin by job, stock value, WIP and overdue works orders &mdash; the numbers a director asks for, produced by the system rather than by someone&rsquo;s Sunday evening.' },
], true);

body += L.promise({
  h2: 'We Walk Your Order Through the Business First &mdash; on a Call, Not a Questionnaire',
  p: 'Before anything is quoted, we follow one real order end to end with you: how it arrives, who prices it, what gets written down and where, which spreadsheet holds the truth, what happens when a subcontractor is late, and how it eventually reaches your accounts. That walkthrough is what produces the audit, and the audit is what decides the build order. It is also where we tell you honestly if the answer is a better spreadsheet and a process change rather than a system.',
  href: '#mcr-timeline', cta: 'See the Timeline',
  img: 'whiteboard-process-mapping-two-colleagues.jpg', alt: 'Mapping a manufacturer&rsquo;s order-to-cash process on a whiteboard', w: 2400, h: 1601,
});

body += L.processRow('mcr-timeline', 'From First Call to Running System', 'What happens, and roughly when.', [
  { h4: 'Week 1 &mdash; The Walkthrough', p: 'One real order followed end to end, your spreadsheets and exports reviewed, the pain points written down in your words.' },
  { h4: 'Week 2 &mdash; Audit &amp; Build Order', p: 'A plain-English document: what to fix, in what order, what it will take, and what it is worth. Yours to keep either way.' },
  { h4: 'Weeks 3&ndash;10 &mdash; First Module', p: 'Stock or works orders live on your own data, used by your own people, in two-week sprints you review on a staging system.' },
  { h4: 'Months 3&ndash;9 &mdash; The Rest, in Phases', p: 'Purchasing and subcontract, job costing, finance sync and reporting &mdash; each one live and in use before the next starts.' },
  { h4: 'Cut-over &mdash; Carefully', p: 'History migrated and reconciled, old and new run side by side where the risk justifies it, training by role rather than a manual.' },
  { h4: 'Then &mdash; Every Month', p: 'The same team keeps improving it, with a written report of what shipped and what is next.' },
]);

body += L.industriesGrid('mcr-sectors', 'Greater Manchester Sectors We Build For', 'A broad manufacturing base needs a system that bends, not a template.', 'Textiles and technical fabrics, food and drink, plastics and packaging, engineering and metal fabrication, electronics, distribution around the M60 and the airport corridor &mdash; the ERP core is shared, the production layer is not.', [
  { img: 'istock-2155877725-factory-engineers-hardhats-tablet.jpg', alt: 'Engineers reviewing production status on the shop floor', w: 612, h: 408, h4: 'Engineering &amp; Metal Fabrication', p: 'Job shops and make-to-order work: quoting from drawings, routing, subcontract operations and true cost per job.' },
  { img: 'istock-2189585598-electronics-factory-engineers-laptop.jpg', alt: 'Technicians checking stock and orders on a laptop', w: 612, h: 344, h4: 'Electronics &amp; Assembly', p: 'Multi-level bills of materials, serial traceability and component shortages visible before they stop a build.' },
  { img: 'istock-1489414046-woman-engineer-laptop-ops-room.jpg', alt: 'Operations manager reviewing plant data', w: 612, h: 323, h4: 'Food, Drink &amp; Process', p: 'Recipes and batches rather than parts lists, yields, allergen and lot traceability, and shelf-life handling.' },
  { img: 'istock-1442543641-india-shop-upi-qr-payment.jpg', alt: 'Order being fulfilled for an online customer', w: 612, h: 408, h4: 'Distribution &amp; E-commerce', p: 'Multi-site stock, Shopify and marketplace orders flowing in, pick-pack-despatch and landed cost in one place.' },
], false);

body += L.benefitRow('mcr-remote', 'How Remote Actually Works From Here', 'Three things that make a distant team workable &mdash; and the one case where it is not.', [
  { icon: '\u{1F551}', h4: 'The Overlap Window', p: 'Kochi is 4.5 hours ahead in summer, 5.5 in winter. Every Manchester morning and early afternoon there is a live window for calls, Slack or Teams &mdash; and anything you send at the end of your day is picked up before ours ends.' },
  { icon: '\u{1F4F9}', h4: 'You See It Weekly', p: 'A demo on a staging system every week, so progress is something you click through rather than something you are told about. A written report monthly.' },
  { icon: '⚠️', h4: 'When to Use Someone Local', p: 'If the work needs a person on your floor with a scanner every week, or your buyers expect on-site meetings, hire locally. We would rather say that on the first call than discover it in month three.' },
]);

body += L.faqHtml('mcr-faq', 'FAQ', 'ERP in Greater Manchester: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s walk one order through your business.', 'Takes 60 seconds &middot; the audit is yours to keep &middot; No long-term contract');
s = L.injectExtras(s);

// sanity
L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/manchester/"');
L.must(s, 'Toronto', 0); L.must(s, 'Ontario', 0); L.must(s, 'Canadian', 0); L.must(s, 'CA$', 0);
L.must(s, '<section class="tap-erp-why-section', 0);
L.must(s, 'Trafford Park'); L.must(s, 'Greater Manchester'); L.must(s, 'Salford');
L.must(s, 'no Manchester office');            // the honesty line must survive
L.must(s, 'library/istock', 4);
L.write('uk/manchester/index.html', s);
