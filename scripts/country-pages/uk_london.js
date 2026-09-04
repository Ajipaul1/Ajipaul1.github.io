'use strict';
// /uk/london/ — PLAN-UK phase 2, page three. London is the largest city cluster in the UK set: 180
// keywords, 530/mo, and ERP-weighted despite being the capital -
//   erp manufacturing software london 110/KD14 · erp system london 90/KD0 · erp systems london 90/KD0 ·
//   cloud erp london 90/KD0 · erp for small business london 70/KD0, plus the web and SEO London tail.
// SERP crawl 2026-09-03: go-globe.com/erp-software-london.php is ~2,200-2,400 words that are 92-95%
// generic - one passing reference to "London's active business environment", no boroughs, no districts,
// no local sectors, no local case study, nine near-identical CTAs, no FAQ and no pricing. Read verdict:
// a template with London as a location variable. The rest of page one is national ERP listicles
// (erpresearch, dynamicssquare, intelegain) rather than London pages at all. One useful published
// figure from those listings: cloud ERP for a 10-20 user small business is commonly estimated at
// GBP 1,000-3,000 a month all-in, which is worth quoting as market orientation.
// So: be the page that is actually about doing business in London, and carry the FAQ and the honest
// cost framing nobody else has. Unique section vocabulary and signature animation.
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/london/';
let s = L.read('ca/toronto/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.replaceAll(s, 'href="/ca/toronto/"', 'href="/uk/london/"');
s = s.split('Toronto').join('London').split('Ontario').join('Greater London').split('the GTA').join('Greater London');
if (s.includes('ca/london')) throw new Error('a /ca/toronto/ path survived the href repointing');
s = L.ukSpelling(s);   // prose only -- see lib.js; a blanket pass here broke every centred element
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'ERP, Web &amp; SEO for London Businesses | TechAuditPros',
  ogTitle: 'ERP Systems, Websites &amp; Search for London Businesses',
  desc: 'Custom ERP systems, websites and search work for London businesses &mdash; from the City and Canary Wharf to Park Royal, Croydon and Stratford. Integrated with Xero and Sage, MTD-ready, hosted in AWS London. Remote team, audit first, no long-term contract.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }],
});

const faqs = [
  { q: 'Do you have a London office?', a: 'No. TechAuditPros is an engineering team in Kochi, India, working for London clients remotely, and in a city with a consultancy on every corner we would rather lead with that than let you discover it. Kochi is 4.5 hours ahead of London in summer and 5.5 in winter, so you get a live window every morning and early afternoon and your evening feedback is picked up the same day. If your engagement needs someone in the room in EC2 every week, hire in London and we will say so on the call.' },
  { q: 'What does an ERP system cost for a London small business?', a: 'Published estimates for cloud ERP at 10&ndash;20 users commonly land around &pound;1,000&ndash;&pound;3,000 a month once licences, implementation and support are counted, and UK per-user list prices sit near &pound;74&ndash;&pound;112 a month before implementation. Ours is one agreed monthly fee with no per-seat licences and no separate implementation invoice, quoted in writing on the call once we have seen how you actually run. London labour rates are the reason a local build quote is usually the highest number in the room; being remote is how the same engineering costs less.' },
  { q: 'Which London businesses is this actually for?', a: 'Three shapes, mostly. Firms in the City, Canary Wharf and the West End with a serious back office and no software team &mdash; brokers, fund administrators, professional services. Makers and distributors in the outer industrial belt: Park Royal, Enfield, Barking, Croydon, Dagenham, where stock, works orders and delivery routing are the daily problem. And the founder-led businesses in Shoreditch, Hackney and Southwark that outgrew spreadsheets faster than they expected. What they share is a process nobody wants to change to suit a subscription product.' },
  { q: 'Why is London ERP work usually quoted so high?', a: 'Because most of the quote is London labour. A local build carries City-rate consultants, a partner margin and an implementation team charging by the day. None of that makes the software better. What matters is whether the people building it understand your workflow and stay accountable afterwards &mdash; which is a question about engineering and communication, not postcode. That is the argument we are prepared to lose if you disagree.' },
  { q: 'Can you handle multi-site and multi-currency?', a: 'Yes, and in London it is usually needed. Multiple sites with true stock per location, transfers between them, and multi-currency purchasing and sales with the exchange treatment your accountant expects. VAT stays MTD-compliant through Xero, Sage or QuickBooks rather than being reinvented in the ERP.' },
  { q: 'We are regulated. Can you work within that?', a: 'We can work within it, and we will tell you where you need someone else. Data residency, access control, audit trails, retention and deletion, and a UK GDPR data processing agreement are all standard here, with everything hosted in AWS London (eu-west-2) in an account you own. What we do not do is sign off your regulatory compliance &mdash; your compliance officer or adviser does that, and we build to what they specify.' },
  { q: 'Do you do the website and the search work too?', a: 'Yes, and in London that combination is usually the point. The same team builds the ERP, the website and the search work, so the site can show live stock, availability or lead times without a fragile integration in the middle, and nobody can blame another supplier when something breaks.' },
  { q: 'How quickly can we see something real?', a: 'Six to ten weeks to a first working module on your own data for ERP, four to eight weeks to a live first version for a website. Both run in two-week sprints on a staging URL, so you are reviewing something clickable within a fortnight rather than waiting for a launch date.' },
  { q: 'Who owns the code and the data?', a: 'You do, from day one &mdash; repository, database, documentation, domain and hosting, all in your name. Nothing sits in our accounts, so moving in-house or to another supplier is a handover rather than a rebuild.' },
  { q: 'What happens on the first call?', a: 'We walk one real process through your business with you &mdash; an order, a client onboarding, a month-end &mdash; and tell you where software would help and where it would only add admin. You keep that assessment regardless, and if the honest answer is that you do not need us yet, that is what you will hear.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Custom ERP Software Development', name: 'ERP Systems, Websites and Search for London Businesses', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'Custom ERP systems, website development and SEO for London businesses: stock, orders, purchasing and finance in one system, multi-site and multi-currency, integrated with Xero and Sage, MTD-ready, hosted in AWS London.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['London', URL]]),
  L.faqSchema(faqs),
]);

s = L.must(s, '<span>to London.</span>', 1);
s = L.replaceAll(s, 'heroArcPathCA', 'heroArcPathLDN');
s = L.setRotatePhrases(s, 'London', 'Audit before any retainer', 'The City &bull; Canary Wharf &bull; Park Royal &bull; Croydon', 'London');
s = L.setHero(s, {
  eyebrow: 'ERP, Web &amp; Search &mdash; London',
  h1: 'Software for London Businesses, <span>Without the London Build Quote.</span>',
  sub: 'Custom ERP, websites and search work for firms across the City, Canary Wharf, Park Royal, Croydon and Stratford &mdash; multi-site and multi-currency where you need it, MTD-ready, hosted in AWS London in an account you own. We are a remote team; most of a local quote is London labour, and we are open about that being the trade.',
  ghostHref: '#ldn-reality', ghostText: 'See what you are really paying for &darr;',
  features: ['\u{1F3E6} Multi-Site &amp; Multi-Currency', '\u{1F510} UK GDPR &amp; AWS London', '\u{1F4BB} You Own the Code'],
  trust: [['250+', 'Projects delivered'], ['6&ndash;10 wks', 'To first working module'], ['Audit', 'Before any retainer'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('TechAuditPros builds <strong>custom ERP systems, websites and search programmes for London businesses</strong> &mdash; from the City, Canary Wharf and the West End to the industrial belt at Park Royal, Enfield, Barking and Croydon. One system for stock, orders, purchasing and finance, multi-site and multi-currency where it is needed, integrated with <strong>Xero or Sage</strong>, MTD-ready, hosted in <strong>AWS London</strong> in an account you own. We work remotely from India, there is no London office, and every engagement starts with an audit rather than a retainer.');

body += L.benefitRow('ldn-reality', 'What a London Software Quote Is Actually Made Of', 'Three things worth knowing before you compare numbers.', [
  { icon: '\u{1F4B7}', h4: 'Most of It Is Labour', p: 'A London build quote carries City-rate consultants, a partner margin and an implementation team billing by the day. None of that makes the software better &mdash; it makes the invoice bigger.' },
  { icon: '\u{1F9E9}', h4: 'The Product Is Rarely the Problem', p: 'Published UK list prices for subscription ERP sit near &pound;74&ndash;&pound;112 per user per month, and estimates for a 10&ndash;20 user cloud rollout commonly reach &pound;1,000&ndash;&pound;3,000 a month all-in. The licence is seldom what hurts; the per-seat growth and the change requests are.' },
  { icon: '\u{1F91D}', h4: 'What You Are Really Buying', p: 'Whether the people building it understand your workflow, and whether they are still accountable in month nine. That is a question about engineering and communication rather than postcode &mdash; and it is the argument we are willing to lose.' },
]);

body += L.modulesGrid('ldn-erp', 'The ERP Work, Concretely', 'Six modules London businesses ask for first.', 'The audit sets the order. Multi-site and multi-currency come up here far more often than anywhere else in the UK.', [
  { icon: '\u{1F4E6}', h4: 'Stock Across Sites', p: 'True quantities per location, transfers between sites, reorder points on real lead times, and scanning that works in a warehouse in Barking as well as an office in EC2.' },
  { icon: '\u{1F9FE}', h4: 'Orders to Invoice', p: 'Quote, order, fulfilment and invoice in one thread, with delivery routing where you run your own vehicles and courier integration where you do not.' },
  { icon: '\u{1F4B1}', h4: 'Multi-Currency', p: 'Purchasing and sales in the currencies you actually trade in, with the exchange treatment your accountant expects rather than a spreadsheet adjustment at month end.' },
  { icon: '\u{1F4CA}', h4: 'Project &amp; Job Costing', p: 'For the professional-services shape: time, cost and margin per project or client, visible before the month closes rather than after it.' },
  { icon: '\u{1F9FE}', h4: 'Finance Sync &amp; VAT', p: 'Two-way sync with Xero, Sage or QuickBooks, MTD-ready digital records from order through invoice, and no re-keying between systems.' },
  { icon: '\u{1F510}', h4: 'Access, Audit &amp; Retention', p: 'Role-based access you control, audit trails on the records that matter, and retention and deletion rules your compliance adviser can sign off.' },
], true);

body += L.industriesGrid('ldn-where', 'Where Our London Work Sits', 'Four business shapes, one engineering standard.', 'The capital is not one market. These four turn up most, and each needs a different first module.', [
  { img: 'executive-woman-tablet-grand-hall.jpg', alt: 'Professional services team reviewing operational reporting', w: 2400, h: 1601, h4: 'City, Canary Wharf &amp; the West End', p: 'Professional and financial services with a real back office and no software team: project costing, client onboarding, approvals and audit trails.' },
  { img: 'istock-2189585598-electronics-factory-engineers-laptop.jpg', alt: 'Warehouse team checking stock on a laptop', w: 612, h: 344, h4: 'Park Royal, Enfield &amp; Barking', p: 'Makers and distributors in the industrial belt: stock across sites, works orders, purchasing and delivery routing.' },
  { img: 'small-business-owner-laptop-sidewalk-cafe.jpg', alt: 'Founder working on their business from a cafe', w: 678, h: 452, h4: 'Shoreditch, Hackney &amp; Southwark', p: 'Founder-led businesses that outgrew spreadsheets faster than expected and need one system before the next hire, not after it.' },
  { img: 'istock-1442543641-india-shop-upi-qr-payment.jpg', alt: 'Customer completing a purchase on a phone', w: 612, h: 408, h4: 'Retail &amp; E-commerce', p: 'Multi-channel stock, marketplace and Shopify orders, click-and-collect, and returns that do not corrupt the stock figure.' },
], false);

body += L.promise({
  h2: 'One Real Process, Walked End to End, Before Anything Is Quoted',
  p: 'We take a single process you actually run &mdash; an order, a client onboarding, a month-end close &mdash; and follow it through your business with the people who do it: where it starts, who touches it, which spreadsheet holds the truth, where it stalls, and how it eventually reaches your accounts. That walkthrough produces the audit, the audit sets the build order, and you keep the document whatever you decide. It is also where we say so if the honest answer is a process change rather than software.',
  href: '#ldn-overlap', cta: 'See How Remote Works',
  img: 'istock-1313265074-boardroom-team-through-glass-dark.jpg', alt: 'Team working through a business process together in a meeting room', w: 612, h: 408,
});

body += L.benefitRow('ldn-overlap', 'Remote, From Four and a Half Hours Ahead', 'What a distant team actually looks like from London.', [
  { icon: '\u{1F551}', h4: 'Your Morning Is Our Afternoon', p: 'Kochi runs 4.5 hours ahead in summer and 5.5 in winter. Every London morning and early afternoon there is a live window for calls, Slack or Teams &mdash; and what you send at 6pm is picked up before our day ends.' },
  { icon: '\u{1F4F9}', h4: 'Weekly, on a Staging URL', p: 'A demo every week you can click through yourself, plus a written monthly report. Progress you verify rather than progress you are told about.' },
  { icon: '⚠️', h4: 'When to Hire in London', p: 'If you need someone on site weekly, or your governance requires a named UK-resident supplier, hire locally. In a city this well served, pretending otherwise would waste your time and ours.' },
]);

body += L.costGrid('ldn-cost', 'What It Costs, and What to Ask', 'Three routes for a London business.', 'The page currently ranking above us for London ERP shows no price at all. Here are the published figures that do exist, and the questions that decide value.', [
  { tag: 'Subscription ERP', num: '&pound;74&ndash;&pound;112', sub: 'Per user per month, list, before implementation', items: ['Estimates for 10&ndash;20 users reach &pound;1,000&ndash;&pound;3,000/mo all-in', 'The bill grows with every hire', 'Customisation limited to what the vendor allows', 'Implementation usually via a partner, billed by the day'] },
  { tag: 'TechAuditPros', num: 'Let’s talk', sub: 'Audit first, then one agreed monthly fee', hi: true, items: ['No per-seat licences and no separate implementation invoice', 'First working module in 6&ndash;10 weeks on your own data', 'ERP, website and search from one team', 'AWS London hosting in your account; you own the code', 'Month to month &mdash; stop when it stops earning'] },
  { tag: 'London build quote', num: 'Highest in the room', sub: 'City-rate consultants and day rates', items: ['Ask what share of the number is labour', 'Ask who is still accountable in month nine', 'Ask what a change request costs after go-live', 'Ask for the audit before the contract'] },
], 'Per-user list prices and the &pound;1,000&ndash;&pound;3,000 monthly estimate are published third-party UK figures as of September 2026, quoted for orientation; they vary with scope and reseller. Our number is fixed in writing before work starts.', true);

body += L.faqHtml('ldn-faq', 'FAQ', 'ERP, Web and Search in London: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s walk one process through your business.', 'Takes 60 seconds &middot; the audit is yours to keep &middot; No long-term contract');
s = L.injectExtras(s);

L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/london/"');
L.must(s, 'Toronto', 0); L.must(s, 'Ontario', 0); L.must(s, 'Canadian', 0); L.must(s, 'CA$', 0); L.must(s, 'US$', 0);
L.must(s, '<section class="tap-erp-why-section', 0);
L.must(s, 'Park Royal'); L.must(s, 'Canary Wharf'); L.must(s, 'Croydon');
L.must(s, 'no London office');
L.write('uk/london/index.html', s);
