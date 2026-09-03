'use strict';
const L = require('./lib.js');
const URL = 'https://techauditpros.com/us/seo-services/';
let s = L.read('ca/seo-services/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.usFooterCities(s);

s = L.setHead(s, {
  title: 'SEO Services for US Businesses: Rank on Google, Get Cited by AI | TechAuditPros',
  ogTitle: 'SEO Services for US Businesses | TechAuditPros',
  desc: 'Technical, local and content SEO plus AEO/GEO for US small and mid-size businesses &mdash; built on real search data, reported in plain English every month. Flat US$1,800/month, no long-term contract, no paid links.',
  url: URL,
  hreflang: [{ lang: 'en-us', href: URL }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/seo-services/' }],
});

const faqs = [
  { q: 'What are SEO services, exactly?', a: 'SEO services are the ongoing work of making your website easier for Google &mdash; and now AI answer engines like ChatGPT, Perplexity and Google’s AI Overviews &mdash; to find, understand and trust enough to recommend. In practice that means a technical audit and fixes, keyword and intent research, on-page content, local listings, authority building and monthly reporting, run by one team against a plan.' },
  { q: 'How much do SEO services cost in the US?', a: 'US agencies commonly charge US$3,000&ndash;$5,000 or more per month, often on 6&ndash;12 month contracts, and consultants bill roughly US$100&ndash;$300 an hour. TechAuditPros runs the full program &mdash; audit, technical fixes, content, local, AEO/GEO and reporting &mdash; for a flat US$1,800 per month, month to month.' },
  { q: 'How long until we see results?', a: 'Technical fixes and Google Business Profile improvements typically move rankings within 4&ndash;8 weeks. Competitive keywords and AI citations build over 3&ndash;6 months of consistent work. We set the timeline honestly in your first report rather than promising page one in thirty days &mdash; nobody can.' },
  { q: 'Do you handle local SEO and Google Business Profile?', a: 'Yes. For US businesses that serve a city or region &mdash; contractors, clinics, law firms, restaurants, multi-location retailers &mdash; local SEO is usually the highest-leverage work: Google Business Profile optimization, review strategy, citation consistency, service-area pages and local schema, all reported alongside your organic rankings.' },
  { q: 'What are AEO and GEO, and do we actually need them?', a: 'Answer Engine Optimization and Generative Engine Optimization are the practice of structuring content so AI systems cite you directly in their answers, not just rank you on a results page. If your customers ask ChatGPT or Google’s AI Overviews questions your business can answer, yes &mdash; and it uses the same technical foundation as classic SEO, so it is built in rather than sold as an add-on.' },
  { q: 'Do you use AI to write our content?', a: 'We use AI as a research and drafting accelerant, and a named engineer fact-checks, edits and takes responsibility for every page before it goes live. Thin auto-generated content is exactly what search engines are demoting, so we do not publish it.' },
  { q: 'Do you buy backlinks?', a: 'No, ever. Paid link schemes are against Google’s spam policies and get sites penalized. We earn links with content worth citing, digital PR, partnerships and fixing the technical issues that stop existing mentions from counting.' },
  { q: 'Can you work alongside our US marketing team or agency?', a: 'Yes &mdash; many clients keep their brand, paid media or PR partner and hand us the search and engineering side. We share one plan, one report and one Slack or Teams channel so nothing falls between vendors.' },
  { q: 'How do you report progress?', a: 'A written monthly report in plain English: what changed, what moved (rankings, traffic, leads, AI citations) and what is next, against last month’s numbers. If a month was slow the report says so and explains why. No black-box dashboards or vanity metrics.' },
  { q: 'Is SEO worth it for a small US business?', a: 'If your customers search before they buy &mdash; and for most services and products they do &mdash; yes, provided the budget is enough to actually do the work and you can wait a few months for compounding results. If you need leads this week, paid search is the faster lever and we will say so.' },
  { q: 'Should we hire a US agency or an offshore team?', a: 'The honest trade-offs are time zone and communication. Our engineers work from Kochi, India, with a live overlap window every US morning, same-day written responses, a weekly call and a named engineer who knows your account &mdash; and you keep 40&ndash;60% of the typical US agency fee. If you need someone in your office, we are not the right fit.' },
  { q: 'What is the difference between SEO and SEM or PPC?', a: 'SEO earns unpaid visibility that compounds over time; SEM is the umbrella that includes SEO plus paid search ads (PPC), which deliver traffic immediately and stop when the budget stops. Most growing businesses run both, using paid search to cover the gap while organic rankings and AI citations build.' },
  { q: 'Do we need a long-term contract?', a: 'No. Engagements are month to month, invoiced in US dollars, and you can stop whenever you like. Everything we build &mdash; content, schema, fixes, reports &mdash; stays on your site.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Search Engine Optimization Services', name: 'SEO, AEO &amp; GEO Services for US Businesses', url: URL, country: 'United States', currency: 'USD', price: '1800', desc: 'Technical, local and content SEO plus Answer Engine and Generative Engine Optimization for US small and mid-size businesses, built on real search data and reported monthly in plain English.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United States', 'https://techauditpros.com/us/'], ['SEO Services', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to America.', 'US');
s = L.setRotatePhrases(s, 'US', 'US$1,800/mo &bull; Save 60%', 'New York &bull; Los Angeles &bull; Chicago &bull; Houston', 'the United States');
s = L.setHero(s, {
  eyebrow: 'SEO Services &mdash; United States',
  h1: 'SEO Services That Get You <span>Ranked on Google and Cited by AI.</span>',
  sub: 'TechAuditPros runs technical SEO, local SEO, content and AI-visibility optimization (AEO/GEO) for US small and mid-size businesses &mdash; built on real US search data, engineered by the same team that builds your website, and reported every month in plain English. Flat US$1,800/month, no long-term contract.',
  ghostHref: '#seo-deliverables', ghostText: 'See what’s included &darr;',
  features: ['\u{1F4CA} Monthly Plain-English Report', '\u{1F513} No Long-Term Contract', '\u{1F6AB} No Paid Links, Ever'],
  trust: [['250+', 'Projects delivered'], ['US$1,800', 'Flat rate/mo, all-in'], ['4&ndash;8 wks', 'To first ranking movement'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('<strong>SEO services</strong> are the ongoing work of making your website easy for Google &mdash; and now ChatGPT, Perplexity and Google’s AI Overviews &mdash; to find, understand and trust enough to recommend. TechAuditPros delivers the full program for US businesses: a real audit first, then technical fixes, content, local search and AI-citation structuring, run by <strong>one dedicated engineer</strong> against real US keyword data and reported monthly, for a <strong>flat US$1,800/month</strong> instead of the US$3,000&ndash;$5,000+ retainers common at US agencies.');

body += L.benefitRow('what-seo-services-include', 'What SEO Actually Involves', 'Three layers of work &mdash; skip one and the other two underperform.', [
  { icon: '\u{1F527}', h4: 'Technical &amp; Site Health', p: 'Crawlability, indexing, Core Web Vitals, structured data and clean architecture &mdash; the foundation search engines and AI crawlers judge before they read a word.' },
  { icon: '✍️', h4: 'Content &amp; On-Page', p: 'Pages that answer what your customers actually type and ask &mdash; titles, headings, internal links and answer-first copy built from real US search data.' },
  { icon: '\u{1F4CD}', h4: 'Authority, Local &amp; AI Visibility', p: 'Earned links and mentions, Google Business Profile and citations for local businesses, and the structure that gets you quoted inside AI answers.' },
]);

body += L.modulesGrid('seo-deliverables', 'What’s Included', 'Eight deliverables, one flat monthly rate.', 'This is the whole program &mdash; not a menu where the pieces that matter cost extra.', [
  { icon: '\u{1F50D}', h4: 'Full Audit &amp; Baseline', p: 'Technical, content, local and competitor audit against real search data, with a prioritized plan before any work starts.' },
  { icon: '\u{1F3AF}', h4: 'Keyword &amp; Intent Research', p: 'What US customers search and ask &mdash; volumes, intent and difficulty &mdash; mapped to the pages that should win them.' },
  { icon: '⚡', h4: 'Technical Fixes', p: 'Core Web Vitals, crawl and index issues, duplicate content, schema and mobile problems fixed by engineers, not ticketed to someone else.' },
  { icon: '\u{1F4DD}', h4: 'Content &amp; On-Page', p: 'New pages and rewrites with answer-first structure, internal linking and titles that earn the click.' },
  { icon: '\u{1F4CD}', h4: 'Local SEO', p: 'Google Business Profile, reviews strategy, citation consistency, service-area pages and local schema.' },
  { icon: '\u{1F916}', h4: 'AEO &amp; GEO Structuring', p: 'Question-led sections, FAQ and entity schema, and citation tracking across ChatGPT, Perplexity and AI Overviews.' },
  { icon: '\u{1F517}', h4: 'Link Earning &amp; Digital PR', p: 'Links earned through content, data and outreach. No purchased links, no networks, no shortcuts that get sites penalized.' },
  { icon: '\u{1F4CA}', h4: 'Monthly Reporting', p: 'Rankings, traffic, leads and AI citations against last month, in plain English, with what is next.' },
], true);

body += L.promise({
  h2: 'Every Engagement Starts With a Real Audit, Not a Sales Deck',
  p: 'Before we recommend anything, your dedicated engineer goes through what is actually on your site &mdash; what ranks, what is thin, what is technically broken, and which US searches you are missing entirely &mdash; and walks you through the findings. The plan that follows is built on your gaps and your market, not a package every client gets.',
  href: '#process', cta: 'See How We Work',
  img: 'istock-1128252197-analyst-data-wall-pencil-thinking.jpg', alt: 'TechAuditPros analyst reviewing a wall of search-performance data during an SEO audit', w: 612, h: 344,
});

body += L.compareTable('seo-types', 'Which SEO Do You Need?', 'Five kinds of SEO work &mdash; and which one your business actually needs first.', 'Most US businesses need one of these to lead and the others to support. Your audit tells you which.', ['Best for', 'What leads the work', 'Typical first 90 days'], -1, [
  ['Local SEO', 'Contractors, clinics, law firms, restaurants, any business serving a city or region', 'Google Business Profile, reviews, citations, service-area pages, local schema', 'Profile and citation cleanup, top service pages rebuilt, first map-pack movement'],
  ['E-commerce SEO', 'Shopify, WooCommerce and custom stores', 'Category and product page structure, faceted navigation, product schema, speed', 'Technical cleanup, category pages rewritten, product feed and schema fixed'],
  ['B2B &amp; Lead-Gen SEO', 'Manufacturers, SaaS, agencies, professional services', 'Bottom-of-funnel service pages, comparison and pricing content, case studies', 'Service pages rebuilt answer-first, top 10 buyer questions published'],
  ['Multi-Location &amp; Enterprise', 'Franchises, regional chains, sites with thousands of pages', 'Scalable templates, internal linking, crawl budget, location page quality', 'Template fixes that move hundreds of pages at once, index bloat removed'],
  ['AI Search (AEO / GEO)', 'Any business whose customers ask AI tools questions before buying', 'Answer-first content, FAQ and entity schema, brand mentions, citation tracking', 'Top questions answered on-page with schema, first AI citations tracked'],
], true);

body += L.processRow('process', 'How We Work', 'A 6-step program, from audit to compounding results.', [
  { h4: 'Audit &amp; Baseline', p: 'Technical, content, local and competitor findings, with current rankings and traffic recorded as the yardstick.' },
  { h4: 'Technical Fixes', p: 'Speed, crawlability, indexing, schema and mobile issues fixed at the source by the engineers who build sites.' },
  { h4: 'Content &amp; On-Page', p: 'Pages rewritten and created around what US customers search and ask, answer-first, with clean internal links.' },
  { h4: 'Local &amp; AI Structuring', p: 'Google Business Profile, citations and service-area pages; FAQ and entity schema so AI engines can quote you.' },
  { h4: 'Authority Building', p: 'Links and mentions earned through content, data and outreach &mdash; never bought.' },
  { h4: 'Report &amp; Iterate', p: 'A plain-English monthly report and the next month’s plan, from the same engineer who ran the audit.' },
]);

body += L.costGrid('seo-cost', 'Pricing', 'What SEO services cost in the US &mdash; and what you get for it.', 'Transparent numbers, because you should be able to compare before you talk to anyone.', [
  { tag: 'Typical US SEO agency', num: 'US$3,000&ndash;$5,000+', sub: 'Per month, often on 6&ndash;12 month contracts', items: ['Account manager between you and the people doing the work', 'Technical fixes handed to your developer as tickets', 'Reporting dashboards you have to interpret yourself', 'AI search often sold as a separate add-on'] },
  { tag: 'TechAuditPros', num: 'US$1,800/mo', sub: 'Flat, all-in, month to month', hi: true, items: ['Audit, technical fixes, content, local, AEO/GEO and reporting included', 'A named engineer who does the work and answers your questions', 'Fixes implemented directly, not ticketed', 'Plain-English monthly report', 'Stop any time; everything built stays on your site'] },
  { tag: 'Freelancer or consultant', num: 'US$100&ndash;$300', sub: 'Per hour, or fixed-price projects', items: ['Good for a one-time audit or strategy document', 'Rarely includes engineering, content and local together', 'Capacity limits how much gets done each month', 'Continuity depends on one person’s availability'] },
], 'Third-party ranges reflect commonly quoted US market pricing and vary with scope. Our rate is fixed in writing before work starts.', true);

body += L.statRow('seo-proof', 'Real Results', 'Real engagements, real numbers.', 'Figures from actual client work &mdash; not projections.', [
  ['+180%', 'Organic traffic growth for a US HVAC business in 6 months'],
  ['+320', 'Keywords ranked for the same US client'],
  ['+205%', 'Traffic growth for a Canadian appliance retailer in 8 months'],
  ['97%', 'Client retention rate across our engagements'],
], false);

body += L.promise({
  h2: 'Reports Written for Owners, Not for Other SEOs',
  p: 'Every month you get a report that says, in plain language: what we changed, what moved, and what is next &mdash; rankings, traffic, leads and AI citations against last month’s numbers. If a month was slow, it says so and explains why. You should never need an SEO to translate your SEO report.',
  href: '#contact', cta: 'Book a Free Strategy Call',
  img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Reviewing a monthly SEO performance report on a tablet', w: 612, h: 402,
});

body += L.industriesGrid('seo-industries', 'Who It’s For', 'The US businesses we do this for most.', 'Different search behavior, different playbooks &mdash; the same discipline of real data and honest reporting.', [
  { img: 'support-agent-headset-smiling-laptop.jpg', alt: 'Service business staff member booking a customer call', w: 767, h: 400, h4: 'Home &amp; Field Services', p: 'HVAC, plumbing, roofing, electrical, cleaning &mdash; local SEO where the map pack decides who gets the call.' },
  { img: 'istock-1442543641-india-shop-upi-qr-payment.jpg', alt: 'Retail checkout with a customer paying by phone', w: 612, h: 408, h4: 'E-commerce &amp; Retail', p: 'Category and product pages that rank, technical health at scale, and product content AI shopping answers can cite.' },
  { img: 'istock-1094918638-manager-tablet-evening-office-smile.jpg', alt: 'Professional services manager reviewing results on a tablet', w: 612, h: 392, h4: 'Professional Services', p: 'Law, accounting, consulting and agencies &mdash; bottom-of-funnel pages and the questions clients ask before they call.' },
  { img: 'istock-1496103633-healthcare-nurse-tablet-hologram.jpg', alt: 'Clinical staff member using a tablet', w: 612, h: 375, h4: 'Clinics &amp; Healthcare', p: 'Multi-location visibility, provider and service pages, reviews, and content that meets a higher bar for accuracy.' },
], true);

body += L.whySection('Why TechAuditPros', 'Real data. Real reporting. No black box.', [['\u{1F4CA}', 'Monthly Plain-English Reporting'], ['\u{1F3AF}', 'Real US Search Data'], ['\u{1F513}', 'No Long-Term Contracts'], ['\u{1F6AB}', 'No Paid Links, Ever']], 'Tools we use', ['Google Search Console', 'GA4', 'SEMrush', 'Screaming Frog', 'PageSpeed Insights', 'Schema.org']);

body += L.faqHtml('seo-faq', 'FAQ', 'SEO Services in the US: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s find out what’s holding your rankings back.', 'Takes 60 seconds &middot; Real audit, no sales deck');
s = L.injectExtras(s);

L.must(s, 'https://techauditpros.com/ca/seo-services/', 1);
L.must(s, 'Canadian', 1); // the appliance-retailer stat is a real Canadian case
L.must(s, 'CA$1,490', 0);
L.write('us/seo-services/index.html', s);
