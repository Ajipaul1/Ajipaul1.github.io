'use strict';
const L = require('./lib.js');
const URL = 'https://techauditpros.com/us/website-development/';
let s = L.read('ca/website-development/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.usFooterCities(s);

s = L.setHead(s, {
  title: 'Website Design &amp; Development Services for US Businesses | TechAuditPros',
  ogTitle: 'Website Design &amp; Development for US Businesses | TechAuditPros',
  desc: 'Custom website design and development for US businesses &mdash; Next.js and React builds engineered for 90+ Core Web Vitals, mobile-first, SEO-ready from day one. One agreed monthly fee, including updates; you own the code.',
  url: URL,
  hreflang: [{ lang: 'en-us', href: URL }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/website-development/' }],
});

const faqs = [
  { q: 'How much does a business website cost in the US?', a: 'US freelancers typically charge US$3,000&ndash;$10,000 upfront for a template-based site, and agencies US$15,000&ndash;$75,000 or more for a custom build, with maintenance billed separately. TechAuditPros designs, builds and keeps improving your site one agreed monthly fee &mdash; design, development, updates, speed work and the technical SEO foundation included, no separate maintenance invoice.' },
  { q: 'How long does a custom website take?', a: 'Most business websites go from approved design to a live first version in 4&ndash;8 weeks. Larger builds &mdash; e-commerce stores, customer portals, sites with hundreds of pages &mdash; are phased so something useful ships early and the rest follows in sprints.' },
  { q: 'Do you build on WordPress, Shopify or something custom?', a: 'Most sites are custom-built on Next.js and React for speed, security and control. When a client genuinely needs Shopify’s ecosystem for e-commerce we recommend it and build on it. We choose what fits your business, not what is easiest to template.' },
  { q: 'Will the site be fast and SEO-ready?', a: 'Yes &mdash; we build to 90+ Core Web Vitals scores (LCP under 2.5 seconds, INP under 200 ms, CLS under 0.1) with clean markup, structured data and proper indexing from the first sprint. The team that builds your site also runs SEO, so there is no gap between what is built and what ranks.' },
  { q: 'Who owns the website when it is done?', a: 'You do &mdash; the code, the content, the domain and the hosting account. If you ever move on, everything comes with you and nothing is locked behind a proprietary builder.' },
  { q: 'Where is the site hosted?', a: 'On modern US-region infrastructure such as Vercel, AWS or Google Cloud, in an account you own. Hosting for a typical business site costs a few dollars to a few tens of dollars a month; we set it up and manage it for you.' },
  { q: 'Can you redesign our site without losing our Google rankings?', a: 'Yes. Redesigns lose rankings when URLs change without redirects and content quietly disappears. We map every old URL to its new home with 301 redirects, preserve or improve the content that ranks, and verify indexing after launch &mdash; it is a standard part of every redesign.' },
  { q: 'Is the site accessible (ADA / WCAG)?', a: 'We build with WCAG 2.1 AA practices &mdash; semantic markup, keyboard navigation, contrast, alt text, labeled forms &mdash; because accessible sites are also faster and rank better. For a formal accessibility certification we work with your compliance auditor.' },
  { q: 'Can you work with our existing designer or brand guidelines?', a: 'Yes. If you have a brand system or an in-house designer, we build to it and handle the engineering, performance and SEO. If you do not, design is included &mdash; you approve wireframes and a prototype before any code is written.' },
  { q: 'Is ongoing maintenance included?', a: 'Yes. Updates, new pages, security patches, speed monitoring and small improvements are part of the flat monthly rate, handled by the same team who built the site &mdash; not a separate maintenance plan or a support queue.' },
  { q: 'How does working across time zones work?', a: 'Our engineers work from Kochi, India, 9.5 hours ahead of New York and 12.5 ahead of Los Angeles. Feedback you send at the end of your day is done by your next morning, there is a live overlap window every US morning, and you get a weekly demo and a monthly written report.' },
  { q: 'What makes TechAuditPros different from a US web agency?', a: 'Real engineers write your code &mdash; not page-builder operators &mdash; and the same team runs your SEO and, if you need it, your internal software. Flat monthly pricing replaces upfront project fees and change-request invoices, at a fraction of typical US agency cost, with a engineering team you can actually talk to.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Website Design and Development', name: 'Website Design &amp; Development Services for US Businesses', url: URL, country: 'United States', currency: 'USD', price: '1800', desc: 'Custom website design and development for US businesses: Next.js and React builds engineered for 90+ Core Web Vitals, mobile-first and SEO-ready, including ongoing updates, for a flat monthly rate.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United States', 'https://techauditpros.com/us/'], ['Website Development', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to America.', 'US');
s = L.setRotatePhrases(s, 'US', 'Pricing scoped on a call', 'New York &bull; Los Angeles &bull; Chicago &bull; Houston', 'the United States');
s = L.setHero(s, {
  eyebrow: 'Website Design &amp; Development &mdash; United States',
  h1: 'Custom Websites for US Businesses, <span>Engineered to Load Fast, Rank and Convert.</span>',
  sub: 'TechAuditPros designs and builds custom, mobile-first websites for US businesses on Next.js and React &mdash; 90+ Core Web Vitals, SEO-ready from the first sprint, and kept current every month by the engineer who built it. One agreed monthly fee, including updates. You own the code.',
  ghostHref: '#web-services', ghostText: 'See what’s included &darr;',
  features: ['⚡ 90+ Core Web Vitals', '\u{1F4F1} Mobile-First', '\u{1F4BB} You Own the Code'],
  trust: [['250+', 'Projects delivered'], ['one agreed monthly fee', 'Flat rate/mo, updates included'], ['4&ndash;8 wks', 'To first live version'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('<strong>Website development services</strong> cover everything it takes to design, build and keep a business website working: UX and visual design, front-end and back-end code, integrations, hosting, speed and the technical SEO foundation. TechAuditPros builds custom sites for US businesses on <strong>Next.js and React</strong> &mdash; mobile-first, 90+ Core Web Vitals, structured for Google and AI search &mdash; and keeps improving them for a <strong>one agreed monthly fee</strong>, instead of a US$15,000&ndash;$75,000 upfront agency project plus a maintenance retainer.');

body += L.benefitRow('what-a-site-must-do', 'What a Business Website Has to Do in 2026', 'Three jobs your site has before design even matters.', [
  { icon: '\u{1F4F1}', h4: 'Work on a Phone First', p: 'Most of your visitors arrive on a phone, and Google indexes the mobile version of your site. If it is hard to tap, read or load on a phone, it is losing customers you never see.' },
  { icon: '⚡', h4: 'Load in Under 2.5 Seconds', p: 'Core Web Vitals are a ranking signal and a conversion signal. We engineer to LCP under 2.5s, INP under 200ms and CLS under 0.1 &mdash; not as a fix later, as the build standard.' },
  { icon: '\u{1F50E}', h4: 'Be Readable by Google and AI', p: 'Clean semantic markup, structured data and answer-first content so search engines and AI assistants can understand, index and cite what you do.' },
]);

body += L.modulesGrid('web-services', 'What’s Included', 'Eight services, one team, one flat monthly rate.', 'From the first wireframe to the hundredth update &mdash; design, engineering and maintenance are not separate invoices.', [
  { icon: '\u{1F3A8}', h4: 'Custom Website Design', p: 'UX research, wireframes and a clickable prototype you approve before code &mdash; designed around your customers, not a theme.' },
  { icon: '⚙️', h4: 'Next.js &amp; React Development', p: 'Hand-built front end and back end, component by component, with nothing along for the ride your business does not need.' },
  { icon: '\u{1F6D2}', h4: 'E-commerce Builds', p: 'Shopify when its ecosystem fits, headless or custom storefronts when it does not &mdash; fast product pages, clean checkout, inventory sync.' },
  { icon: '\u{1F3AF}', h4: 'Landing Pages &amp; Conversion', p: 'Campaign pages built to convert and measured properly &mdash; forms, calls, bookings &mdash; with A/B tests when traffic justifies them.' },
  { icon: '\u{1F504}', h4: 'Redesign &amp; Migration', p: 'Full 301 redirect maps, content preserved, indexing verified &mdash; so a redesign never costs you the rankings you already earned.' },
  { icon: '\u{1F511}', h4: 'Web Apps &amp; Customer Portals', p: 'Logins, dashboards, quoting tools and client portals connected to your CRM, ERP or payment system.' },
  { icon: '\u{1F680}', h4: 'Speed &amp; Core Web Vitals', p: 'Image pipelines, code splitting, caching and hosting tuned to 90+ scores &mdash; on your new site or the one you already have.' },
  { icon: '\u{1F6E0}️', h4: 'Maintenance &amp; Updates', p: 'New pages, content changes, security patches and monitoring every month, by the engineer who built the site.' },
], true);

body += L.promise({
  h2: 'You See the Design Before a Line of Code Gets Written',
  p: 'Every build starts with a real design pass &mdash; wireframes, then a clickable prototype you review and approve &mdash; not live editing on a template. Your dedicated engineering team walks you through the structure, the content plan and the conversion path first, so development starts from a plan you have already signed off on, not a guess.',
  href: '#process', cta: 'See Our Process',
  img: 'istock-2150307337-creative-studio-neon-review.jpg', alt: 'Designers reviewing website layouts together in a studio', w: 612, h: 323,
});

body += L.compareTable('web-compare', 'Builder vs. Template vs. Custom', 'Three ways to get a business website &mdash; compared honestly.', 'A DIY builder is the right answer for some businesses. Here is how to tell which column you are in.', ['DIY website builder', 'Template / theme site', 'Custom build (TechAuditPros)'], 2, [
  ['Speed &amp; Core Web Vitals', 'Often poor; limited control over scripts and images', 'Varies; plugin stacks slow down as features are added', 'Engineered to 90+ from the start; nothing unnecessary ships'],
  ['Design', 'Preset blocks; looks like every other site on the builder', 'A theme thousands of sites share, restyled', 'Designed around your customers and conversion path'],
  ['SEO control', 'Limited technical control; basic schema at best', 'Depends on plugins and the theme’s markup', 'Full control of markup, structured data, redirects and speed'],
  ['Integrations', 'Whatever the builder offers', 'Plugins, with compatibility and security upkeep', 'Direct integration with your CRM, ERP, payments and booking tools'],
  ['Ownership', 'You rent it; leaving means rebuilding', 'You own the files; theme and plugin licenses continue', 'You own the code, content, domain and hosting outright'],
  ['Cost pattern', 'US$20&ndash;$100/month, your time as the labor', 'US$3,000&ndash;$10,000 upfront plus maintenance', 'One agreed monthly fee, including design, build and updates'],
  ['Best for', 'Very early businesses testing an idea', 'Simple brochure sites with no growth plans', 'US businesses where the site has to win customers and grow'],
], true, 'Third-party ranges reflect commonly quoted US market pricing and vary with scope.');

body += L.processRow('process', 'How We Build It', 'A 6-step process, from discovery to a site that keeps improving.', [
  { h4: 'Discovery', p: 'Your business, customers, goals and current site’s data &mdash; what converts, what does not &mdash; before a wireframe is drawn.' },
  { h4: 'Wireframes &amp; Design', p: 'Structure first, then visual design and a clickable prototype you approve.' },
  { h4: 'Build in Sprints', p: 'Next.js and React development in two-week sprints you can review on a staging site as it comes together.' },
  { h4: 'Content &amp; SEO Foundation', p: 'Page copy, structured data, redirects and indexing set up so the site is ready to rank on day one.' },
  { h4: 'QA &amp; Launch', p: 'Cross-device and browser testing, performance verification, accessibility checks and a careful production launch.' },
  { h4: 'Maintain &amp; Improve', p: 'Updates, new pages and conversion improvements every month by the engineer who built it.' },
]);

body += L.costGrid('web-cost', 'Cost &amp; Timeline', 'What a business website costs in the US &mdash; with real numbers.', 'Most agency pages make you request a quote to learn anything. Here is the honest picture.', [
  { tag: 'US freelancer', num: 'US$3k&ndash;$10k', sub: 'Upfront, typically template-based', items: ['Good for a simple brochure site', 'Maintenance and updates billed separately or not offered', 'Speed and SEO depend on the theme and plugins', 'Continuity depends on one person'] },
  { tag: 'TechAuditPros', num: 'Let’s talk', sub: 'Scoped on the call and put in writing', hi: true, items: ['Design, custom Next.js/React build and ongoing updates included', 'First live version in 4&ndash;8 weeks', '90+ Core Web Vitals and technical SEO foundation built in', 'You own the code, content and hosting', 'Stop any time; the site is yours'] },
  { tag: 'US agency', num: 'US$15k&ndash;$75k+', sub: 'Upfront project fee', items: ['Custom design and development', 'Change requests and new pages billed after launch', 'Maintenance retainer of US$500&ndash;$2,000/month on top', '3&ndash;6 month timelines are common'] },
], 'Third-party ranges reflect commonly quoted US market pricing for small and mid-size business websites and vary with scope. Our rate is fixed in writing before work starts.', true);

body += L.promise({
  h2: 'Real Engineers, Overnight Progress, Your Mornings for Decisions',
  p: 'The people writing your site’s code are engineers you can talk to directly &mdash; not page-builder operators. Working from Kochi, India, 9.5 hours ahead of New York, they turn the feedback you leave at the end of your day into a new staging build by your next morning, with a live overlap window each US morning for calls. That is also why the sites hit 90+ Core Web Vitals: they are engineered, file by file.',
  href: '#webdev-faq', cta: 'Read the FAQ',
  img: 'istock-2228764569-developer-night-debugging-monitors.jpg', alt: 'TechAuditPros engineer working across two monitors during the overnight build window', w: 612, h: 408,
});

body += L.industriesGrid('web-builds', 'What We Build', 'Four kinds of builds, one engineering standard.', 'Marketing sites, stores, portals and campaign pages &mdash; each with its own conversion logic, all built to the same speed and SEO bar.', [
  { img: 'executive-woman-tablet-grand-hall.jpg', alt: 'Business owner reviewing a new company website on a tablet', w: 2400, h: 1601, h4: 'Marketing &amp; Service Websites', p: 'For professional and home services, B2B and local businesses &mdash; built to explain, rank and get the call or the form.' },
  { img: 'istock-1442543641-india-shop-upi-qr-payment.jpg', alt: 'Retail customer completing a purchase on a phone', w: 612, h: 408, h4: 'E-commerce Stores', p: 'Shopify or headless storefronts with fast product pages, clean checkout and inventory that stays in sync.' },
  { img: 'istock-1321462048-woman-holographic-ui-network.jpg', alt: 'User interacting with a connected web application interface', w: 612, h: 344, h4: 'Web Apps &amp; Customer Portals', p: 'Logins, dashboards, quoting and booking tools connected to your CRM, ERP and payments.' },
  { img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Reviewing campaign landing-page performance charts on a tablet', w: 612, h: 402, h4: 'Landing Pages &amp; Campaigns', p: 'Focused pages for paid campaigns and launches, measured on conversions and improved with tests.' },
], false);

body += L.faqHtml('webdev-faq', 'FAQ', 'Website Design &amp; Development in the US: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s scope your website build.', 'Takes 60 seconds &middot; USD pricing &middot; No long-term contract');
s = L.injectExtras(s);

L.must(s, 'https://techauditpros.com/ca/website-development/', 1);
L.must(s, 'Canadian', 0); L.must(s, 'CA$1,490', 0);
L.write('us/website-development/index.html', s);
