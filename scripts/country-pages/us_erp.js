'use strict';
const L = require('./lib.js');
const URL = 'https://techauditpros.com/us/erp/';
let s = L.read('ca/erp/index.html');

// --- service links inside header / drawer / footer point at the US set ---
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.usFooterCities(s);

s = L.setHead(s, {
  title: 'Custom ERP Software Development for US Businesses | TechAuditPros',
  ogTitle: 'Custom ERP Software Development for US Businesses | TechAuditPros',
  desc: 'TechAuditPros builds custom ERP software for US small and mid-size businesses &mdash; inventory, orders, purchasing, production and finance in one system, integrated with QuickBooks, Shopify and Salesforce. Flat rate from US$1,800/month, dedicated engineer, you own the code.',
  url: URL,
  hreflang: [{ lang: 'en-us', href: URL }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/erp/' }],
});

const faqs = [
  { q: 'How much does custom ERP software cost in the US?', a: 'TechAuditPros builds and runs your custom ERP for a flat US$1,800 per month &mdash; that covers your dedicated engineer, design, development, integrations, hosting guidance and ongoing support, with no per-seat licenses and no separate implementation invoice. For orientation, US agencies commonly quote custom ERP builds from the high five figures into six figures upfront, and subscription ERP products typically run US$100&ndash;$250 per user per month plus an implementation fee. Your scope call ends with a fixed monthly number, not an estimate.' },
  { q: 'How long does a custom ERP take to build?', a: 'Most US engagements reach a working first module &mdash; usually inventory, orders or quoting, whichever hurts most &mdash; within 6 to 10 weeks. The full system then rolls out in phases over roughly 4 to 9 months, with your team using each module on real data as it ships rather than waiting for a single big launch.' },
  { q: 'Is custom ERP realistic for a small business?', a: 'Yes, once you are running on QuickBooks plus three or four disconnected tools and a growing stack of spreadsheets &mdash; that is exactly where a right-sized custom system pays for itself. If you are a team of five with one simple sales process, an off-the-shelf tool is probably still the better answer, and we will tell you that on the call.' },
  { q: 'Can the ERP integrate with QuickBooks, Shopify, Salesforce, Stripe or ADP?', a: 'Yes. Two-way syncs with QuickBooks Online, Xero, Shopify, Amazon Seller Central, Stripe, Salesforce, HubSpot and payroll exports for ADP or Gusto are scoped during discovery and built on the tools’ official APIs. The goal is to keep what already works for you and put one system of record in the middle.' },
  { q: 'Where is our data hosted, and who can access it?', a: 'In a US cloud region (AWS or Google Cloud, for example us-east-1) inside an account you own. TechAuditPros works under NDA with access you control and can revoke at any time. Weekly encrypted backups and role-based access control are part of every build.' },
  { q: 'Who owns the source code?', a: 'You do, fully &mdash; the repository, the database and the documentation are yours from day one. If you ever want to move development in-house or to another vendor, nothing is locked behind us.' },
  { q: 'How does the time-zone difference with your India team work?', a: 'Our engineers work from Kochi, India, which runs 9.5 hours ahead of New York and 12.5 hours ahead of Los Angeles. In practice that means requests you send at the end of your day are worked overnight and waiting for you the next morning, with a live overlap window every US morning for calls, plus Slack or Teams during it. You get a weekly demo and a monthly written report.' },
  { q: 'Cloud or on-premise?', a: 'Cloud by default &mdash; it is cheaper to run, easier to back up and accessible from every location and warehouse. If you have a regulatory or connectivity reason to keep the system on your own servers, we can deploy on-premise or into a private cloud instead.' },
  { q: 'What is the difference between custom ERP and a cloud ERP subscription?', a: 'A subscription ERP is one product every customer shares, priced per user, that you configure around; a custom ERP is coded around your workflows, priced flat, and changes whenever your business does. Subscriptions win when your processes are standard; custom wins when they are not, or when per-seat fees are climbing faster than headcount.' },
  { q: 'What happens to our spreadsheets and historical data?', a: 'They get migrated, not abandoned. During the migration phase we import and reconcile your spreadsheet, QuickBooks and e-commerce history into the new system, then run the old and new side by side for a defined period before cut-over so nothing is lost.' },
  { q: 'Do we need a long-term contract?', a: 'No. Engagements are month to month, invoiced in US dollars, and you can pause or stop at any time &mdash; you keep the code and the data either way.' },
  { q: 'What makes TechAuditPros different from a US development shop?', a: 'One accountable, AI-native engineering team handles your ERP, your website and your SEO instead of three vendors; you get flat monthly pricing instead of hourly billing; and we use AI tooling for speed with a senior engineer reviewing every line before it ships. The difference shows up as faster delivery at a fraction of typical US rates &mdash; without a junior team learning on your project.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Custom ERP Software Development', name: 'Custom ERP Software Development for US Businesses', url: URL, country: 'United States', currency: 'USD', price: '1800', desc: 'Custom ERP software development for US small and mid-size businesses: inventory, orders, purchasing, production and finance in one system, integrated with QuickBooks, Shopify and Salesforce, built and supported by a dedicated AI-native engineering team.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United States', 'https://techauditpros.com/us/'], ['Custom ERP Development', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to America.', 'US');
s = L.setRotatePhrases(s, 'US', 'US$1,800/mo &bull; Save 60%', 'New York &bull; Los Angeles &bull; Chicago &bull; Houston', 'the United States');
s = L.setHero(s, {
  eyebrow: 'Custom ERP Software Development &mdash; United States',
  h1: 'Custom ERP Software <span>Built Around How Your US Business Actually Runs.</span>',
  sub: 'TechAuditPros designs and builds custom ERP systems for US small and mid-size businesses &mdash; one system of record for inventory, orders, purchasing, production and finance, integrated with the QuickBooks, Shopify, Stripe and Salesforce accounts you already run. Flat monthly rate, dedicated engineer, source code yours.',
  ghostHref: '#erp-modules', ghostText: 'See what’s included &darr;',
  features: ['\u{1F468}‍\u{1F4BB} Dedicated Engineer', '\u{1F1FA}\u{1F1F8} US Data Residency', '\u{1F4BB} You Own the Code'],
  trust: [['250+', 'Projects delivered'], ['US$1,800', 'Flat starting rate/mo'], ['6&ndash;10 wks', 'To first working module'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('<strong>Custom ERP software</strong> is an enterprise resource planning system designed and coded for one company’s workflows, instead of a subscription product every company shares. TechAuditPros builds custom ERP for US businesses on <strong>Node.js, PostgreSQL and React</strong>, hosted in US cloud regions you own, for a <strong>flat US$1,800 per month</strong> &mdash; no per-seat licenses, no six-figure implementation invoice, no long-term contract. Most clients are using their first working module within 6&ndash;10 weeks.');

body += L.benefitRow('what-custom-erp-replaces', 'What a Custom ERP Replaces', 'The three things that quietly cost a growing US business the most.', [
  { icon: '\u{1F4CA}', h4: 'The Spreadsheet Sprawl', p: 'The inventory sheet, the order tracker, the pricing file, the one only Dana understands. A custom ERP turns them into one system of record with one version of the truth.' },
  { icon: '\u{1F9E9}', h4: 'The Tool Tangle', p: 'QuickBooks for money, Shopify for orders, a CRM for quotes, email for approvals &mdash; none of them talking. The ERP sits in the middle and keeps them in sync automatically.' },
  { icon: '\u{1F501}', h4: 'The Manual Re-Keying', p: 'Someone typing the same order into three systems, and the errors that follow. Automation handles the routine; your people handle the exceptions.' },
]);

body += L.modulesGrid('erp-modules', 'What’s Included', 'Eight modules, built in the order that pays back fastest.', 'Every business starts with the module that hurts most &mdash; usually inventory or orders &mdash; and adds the rest in phases. Nothing you don’t need gets built.', [
  { icon: '\u{1F4E6}', h4: 'Inventory &amp; Warehouse', p: 'Multi-location stock, reorder points, lot and serial tracking, barcode scanning, cycle counts.' },
  { icon: '\u{1F9FE}', h4: 'Orders &amp; Fulfillment', p: 'Quote to invoice, pick-pack-ship, backorders and returns, with Shopify and Amazon orders flowing in automatically.' },
  { icon: '\u{1F6D2}', h4: 'Purchasing &amp; Suppliers', p: 'Purchase orders, supplier lead times, landed cost, three-way match against receipts and bills.' },
  { icon: '\u{1F3ED}', h4: 'Production &amp; MRP', p: 'Bills of materials, work orders, routing, shop-floor status and scrap tracking for manufacturers and job shops.' },
  { icon: '\u{1F4B5}', h4: 'Finance Sync', p: 'Two-way sync with QuickBooks Online or Xero, AR/AP visibility, real margin by job, product and customer.' },
  { icon: '\u{1F91D}', h4: 'CRM &amp; Quoting', p: 'Pipeline and quotes built from live pricing and stock, synced with Salesforce or HubSpot if you already use them.' },
  { icon: '\u{1F465}', h4: 'People &amp; Payroll Data', p: 'Time, roles, approvals and job costing, with clean exports to ADP, Gusto or your payroll provider.' },
  { icon: '\u{1F4C8}', h4: 'Reporting &amp; Dashboards', p: 'Role-based dashboards, scheduled reports and exports &mdash; the numbers owners actually ask for, without a spreadsheet.' },
], true);

body += L.promise({
  h2: 'We Map Your Real Workflow Before We Write a Line of Code',
  p: 'Every US engagement starts with your dedicated engineer walking through your actual spreadsheets, exports and daily routines with you &mdash; how an order really moves from quote to cash, where it stalls, who fixes it by hand. You approve a clickable prototype and a data model before development begins, so the system reflects how the business runs today and where you want it to go.',
  href: '#process', cta: 'See Our 6-Step Process',
  img: 'whiteboard-process-mapping-two-colleagues.jpg', alt: 'TechAuditPros engineer mapping a client’s order-to-cash workflow on a whiteboard', w: 2400, h: 1601,
});

body += L.compareTable('erp-compare', 'Custom vs. Subscription vs. Legacy', 'Three ways to run a business on software &mdash; compared honestly.', 'The right answer depends on how standard your processes are and how fast your headcount is growing. Here is how the options actually differ.', ['Custom ERP (TechAuditPros)', 'Subscription ERP (SaaS)', 'Legacy on-premise ERP'], 0, [
  ['Fit to your workflows', 'Coded around your processes; nothing generic to work around', 'You configure around the vendor’s model; edge cases become workarounds', 'Deep but rigid; changes need specialist consultants'],
  ['Pricing model', 'Flat US$1,800/month, all-in', 'US$100&ndash;$250 per user per month, plus implementation', 'Large upfront license plus annual maintenance'],
  ['Per-user fees', 'None &mdash; add staff and warehouses freely', 'Every new hire raises the bill', 'Usually per seat or per module'],
  ['Implementation', 'First module live in 6&ndash;10 weeks, phased rollout', 'Typically 3&ndash;9 months with a partner, billed separately', 'Often 12 months or more'],
  ['Integrations', 'Built on the official APIs of the tools you keep (QuickBooks, Shopify, Salesforce&hellip;)', 'Marketplace connectors; gaps need middleware', 'Custom connectors, expensive to maintain'],
  ['Changes after go-live', 'Included &mdash; the same engineer keeps evolving it', 'Wait for the vendor roadmap or pay for add-ons', 'Change requests billed by the hour'],
  ['Data ownership &amp; residency', 'Your cloud account, your US region, your code', 'Vendor’s multi-tenant cloud; export on exit', 'Your servers, your hardware costs'],
  ['Best for', 'US SMBs with non-standard processes or rising per-seat costs', 'Standard processes, small teams, fast start', 'Regulated environments that must stay on-premise'],
], true, 'Ranges are typical US market figures for small and mid-size businesses, shown for orientation. A scope call gives you a fixed monthly quote for your build.');

body += L.processRow('process', 'How We Build It', 'A 6-step process from your spreadsheets to a running system.', [
  { h4: 'Discovery &amp; Data Walkthrough', p: 'Your engineer studies your real data, tools and daily pain points with you &mdash; not a generic questionnaire.' },
  { h4: 'Blueprint &amp; Prototype', p: 'A data model and clickable screens you approve before development, so nothing is built on a guess.' },
  { h4: 'Build in Two-Week Sprints', p: 'First working module in 6&ndash;10 weeks; you test each sprint on your own data and steer priorities.' },
  { h4: 'Migrate &amp; Integrate', p: 'Spreadsheet, QuickBooks and e-commerce history imported and reconciled; live syncs switched on.' },
  { h4: 'Go-Live &amp; Training', p: 'Role-based training and a cut-over plan, with a parallel run where the risk justifies it.' },
  { h4: 'Run &amp; Evolve', p: 'The same engineer keeps improving the system every month, with a written report of what shipped.' },
]);

body += L.costGrid('erp-cost', 'Cost &amp; Timeline', 'What custom ERP costs in the US &mdash; with real numbers.', 'Most ERP pages hide pricing behind a form. Here is the honest picture for a US small or mid-size business.', [
  { tag: 'Typical US custom build', num: 'US$75k&ndash;$250k+', sub: 'Upfront project fee, commonly quoted', items: ['6&ndash;18 months before the full system is usable', 'Change requests billed hourly after launch', 'You fund everything before you see value', 'Maintenance retainer on top'] },
  { tag: 'TechAuditPros', num: 'US$1,800/mo', sub: 'Flat, all-in, month to month', hi: true, items: ['Dedicated engineer from discovery through support', 'First working module in 6&ndash;10 weeks; full system phased over 4&ndash;9 months', 'Integrations, migration and training included', 'You own the code and the cloud account', 'Monthly written report; stop any time'] },
  { tag: 'Subscription ERP (SaaS)', num: 'US$100&ndash;$250', sub: 'Per user per month, plus implementation', items: ['Implementation partner fees commonly US$15k&ndash;$100k+', 'Bill rises with every hire and every module', 'Customization limited to what the vendor allows', 'Data lives in the vendor’s cloud'] },
], 'Third-party ranges reflect commonly quoted US market pricing for small and mid-size businesses and vary with scope. Our rate is fixed in writing before work starts.', true);

body += L.promise({
  h2: 'Your Day Ends. Our Build Day Starts.',
  p: 'Kochi runs 9.5 hours ahead of New York and 12.5 ahead of Los Angeles &mdash; so the feedback you send at 5pm is worked overnight and waiting for you with your coffee. You get a live overlap window every US morning for calls and Slack, a weekly demo, and a monthly report in plain English. The engineer on your project is the same person from the first call to the hundredth deploy.',
  href: '#erp-faq', cta: 'Read the FAQ',
  img: 'istock-1408255024-indian-dev-team-code-review.jpg', alt: 'TechAuditPros engineers in Kochi reviewing code for a US client’s ERP build', w: 612, h: 408,
});

body += L.industriesGrid('erp-industries', 'Who It’s For', 'Built for the US businesses that outgrow off-the-shelf software first.', 'The same core &mdash; inventory, orders, purchasing, finance sync, reporting &mdash; shaped around how each of these actually operates.', [
  { img: 'istock-2155877725-factory-engineers-hardhats-tablet.jpg', alt: 'Manufacturing engineers reviewing production status on a tablet', w: 612, h: 408, h4: 'Manufacturers &amp; Job Shops', p: 'Bills of materials, work orders, routing and shop-floor status &mdash; MRP without the six-figure license.' },
  { img: 'istock-2189585598-electronics-factory-engineers-laptop.jpg', alt: 'Engineers checking inventory and orders on a laptop in a facility', w: 612, h: 344, h4: 'Distributors &amp; E-commerce', p: 'Multi-warehouse stock, Shopify and Amazon order flow, purchasing and landed cost in one place.' },
  { img: 'istock-1496103633-healthcare-nurse-tablet-hologram.jpg', alt: 'Clinical staff member reviewing records on a tablet', w: 612, h: 375, h4: 'Clinics &amp; Healthcare Operators', p: 'Scheduling, supplies, billing exports and reporting for multi-location practices, with compliance requirements scoped up front.' },
  { img: 'istock-2196870531-consultants-walking-tablet-corridor.jpg', alt: 'Consultants reviewing a project dashboard while walking through an office', w: 612, h: 408, h4: 'Professional &amp; Field Services', p: 'Jobs, crews, quotes, time and invoicing connected &mdash; from HVAC and construction to agencies and consultancies.' },
], false);

body += L.whySection('Why TechAuditPros', 'Your data stays yours &mdash; and stays in the US.', [['\u{1F512}', 'NDA on Every Engagement'], ['\u{1F4BB}', 'Source Code Ownership'], ['\u{1F1FA}\u{1F1F8}', 'US Cloud Regions'], ['\u{1F4BE}', 'Weekly Encrypted Backups']], 'Built on', ['Node.js', 'PostgreSQL', 'React', 'REST &amp; GraphQL APIs', 'AWS / Google Cloud (US regions)']);

body += L.faqHtml('erp-faq', 'FAQ', 'Custom ERP Development in the US: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s map your operations and scope the build.', 'Takes 60 seconds &middot; USD pricing &middot; No long-term contract');
s = L.injectExtras(s);

// sanity
L.must(s, 'href="/us/erp/"'); L.must(s, 'href="/us/seo-services/"'); L.must(s, 'href="/us/website-development/"');
L.must(s, 'https://techauditpros.com/ca/erp/', 1); // only the hreflang alternate
L.must(s, 'Canadian', 0); L.must(s, 'CA$1,490', 0);
L.write('us/erp/index.html', s);
