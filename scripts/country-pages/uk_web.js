'use strict';
// /uk/website-development/ — session B of ai_context/PLAN-UK.md. Targets:
//   web development services 3,600/KD38 · website development services 2,400/34 · website development
//   company 2,400/47 · website development uk 880/41 · website development company in uk 880/36 ·
//   custom web development 720/10 · custom website development 720/17 · web development service 720/28 ·
//   company website design 590/32 · custom website development services 390/16 · professional website
//   development company 390/31 · website development service 390/25 · website developer uk 390/38 ·
//   website development company uk 390/37 · website development services uk 390/36 · web page development
//   services 320/25 · uk website development 260/39 · custom website development company 260/18 ·
//   web development websites in uk 210/32 · how much does it cost to make a website uk 140/18
// Clusters the data says must be covered: cost (926 kw, 23,220/mo), design (1,735 / 65,800), agency
// (1,157 / 49,370), mobile (383 / 18,700), WordPress (987 / 18,370), hosting (255 / 6,740), web apps
// (195 / 5,190), ecommerce (195 / 3,910), maintenance (71 / 1,970), redesign (62 / 1,340).
// SERP crawl 2026-09-03: lightflows.co.uk/web-development-agency (~4,500 words; H2s cover front-end,
// back-end, full-stack, open-source, maintenance and support, hosting and infrastructure, who you'll be
// working with, both technology stacks, benefits, bespoke development, case studies, testimonials,
// process stages, why-us, 6 FAQs; trust: 10+ awards, 16 years, 17+ team, ISO 27001 and 9001, 200+
// products, Clutch reviews, London and Guildford offices; NO PRICING SHOWN) and clutch.co/web-developers/uk
// (directory, ~25 agencies, hourly $25-199 with most $50-99, minimum project sizes $1,000-$50,000+ and
// most above $10,000, London dominant then Manchester and Bristol).
// So this page matches their coverage (both stacks, hosting, maintenance, process, case studies, FAQ)
// and beats them where they are silent: honest cost framing, Core Web Vitals as numbers, UK GDPR/PECR
// and UK hosting, AEO/GEO readiness, redesign without losing rankings, and WCAG 2.2 AA.
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/website-development/';
let s = L.read('ca/website-development/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'Website Development Services for UK Businesses | TechAuditPros',
  ogTitle: 'Website Design &amp; Development for UK Businesses | TechAuditPros',
  desc: 'Custom website design and development services for UK businesses &mdash; Next.js and React builds engineered for 90+ Core Web Vitals, mobile-first, SEO and AI-search ready, hosted in AWS London. One agreed monthly fee including updates; you own the code.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }, { lang: 'en-us', href: 'https://techauditpros.com/us/website-development/' }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/website-development/' }],
});

const faqs = [
  { q: 'How much does a website cost in the UK?', a: 'It depends on which of three routes you take, and the honest ranges are public. A DIY builder subscription runs roughly &pound;10&ndash;&pound;30 a month plus your own time. UK agencies listed in Clutch&rsquo;s directory charge &pound;20&ndash;&pound;150 an hour, most commonly &pound;40&ndash;&pound;80, and set minimum project sizes commonly above &pound;8,000 &mdash; with maintenance quoted separately afterwards. TechAuditPros works differently: design, custom build, hosting setup and ongoing updates are one agreed monthly fee, scoped on the call and put in writing before anything starts, with no upfront project fee and no separate maintenance invoice.' },
  { q: 'What do website development services actually include?', a: 'Everything between an idea and a site that earns its keep: UX and visual design, front-end and back-end engineering, content structure, integrations with the tools you already run, hosting setup, accessibility, speed work and the technical SEO foundation &mdash; then ongoing updates once it is live. If a supplier quotes only &ldquo;design and build&rdquo;, ask who owns speed, indexing and the first year of changes.' },
  { q: 'How long does a custom website take?', a: 'Most UK business websites go from approved design to a live first version in 4&ndash;8 weeks. Larger builds &mdash; online shops, customer portals, sites with hundreds of pages &mdash; are phased so something useful ships early and the rest follows in two-week sprints you can review on a staging URL.' },
  { q: 'Do you build on WordPress, Shopify or something custom?', a: 'Most sites are custom-built on Next.js and React for speed, security and control. When a business genuinely needs Shopify&rsquo;s ecosystem for retail, or WordPress because an in-house team must edit everything daily, we say so and build on it properly &mdash; hardened, fast and without a plugin stack that rots. We choose what fits your business, not what is quickest to template.' },
  { q: 'Will the site be fast enough to rank?', a: 'We build to 90+ Core Web Vitals: Largest Contentful Paint under 2.5 seconds, Interaction to Next Paint under 200 milliseconds, Cumulative Layout Shift under 0.1 &mdash; measured on a mid-range Android over 4G, not on a fast laptop. Speed is a build standard here, not a fix bolted on later, and you can verify it yourself in PageSpeed Insights the day it goes live.' },
  { q: 'Is the site ready for Google and AI search?', a: 'Yes. Clean semantic markup, structured data, a sensible URL and internal-linking structure, and answer-first content so Google can rank it and so ChatGPT, Perplexity and AI Overviews can quote it. The team that builds the site also runs SEO, AEO and GEO, so there is no gap between what gets built and what gets found.' },
  { q: 'Can you redesign our site without losing our Google rankings?', a: 'Yes, and this is where most redesigns go wrong. Rankings are lost when URLs change without redirects and ranking content quietly disappears. We map every old URL to its new home with 301 redirects, keep or improve the pages that already earn traffic, and verify indexing and Search Console coverage after launch. It is a standard part of every redesign, not an upsell.' },
  { q: 'Who owns the website when it is done?', a: 'You do &mdash; the code, the content, the domain and the hosting account, all in your name from day one. If you ever move to another supplier or in-house, everything comes with you and nothing is locked behind a proprietary builder or our accounts.' },
  { q: 'Where is the site hosted, and is it UK GDPR compliant?', a: 'On modern infrastructure in a UK region &mdash; Vercel&rsquo;s London edge, AWS London (eu-west-2) or Google Cloud europe-west2 &mdash; inside an account you own, so personal data stays in the UK. Forms, analytics and cookie behaviour are built to UK GDPR and PECR: consent before non-essential cookies, a lawful basis for every form, and a data processing agreement between us. Hosting for a typical business site costs a few pounds to a few tens of pounds a month, and we set it up and manage it.' },
  { q: 'Is the site accessible (WCAG)?', a: 'We build to WCAG 2.2 AA practices &mdash; semantic markup, keyboard navigation, visible focus, colour contrast, alt text, labelled forms &mdash; because accessible sites are also faster, easier for Google to parse and legally safer under the Equality Act. For a formal accessibility audit or statement we work alongside your compliance adviser.' },
  { q: 'Is ongoing maintenance included?', a: 'Yes. New pages, content changes, dependency and security updates, uptime and speed monitoring, and small improvements are part of the monthly engagement, handled by the same team that built the site. There is no separate maintenance plan, and no ticket queue between you and the people who know your codebase.' },
  { q: 'Can you work with our existing designer or brand guidelines?', a: 'Yes. If you have a brand system or an in-house designer, we build to it and take the engineering, performance, accessibility and SEO. If you do not, design is included &mdash; you approve wireframes and a clickable prototype before any production code is written.' },
  { q: 'How does working with an India-based team from the UK actually work?', a: 'Our engineers work from Kochi, 4.5 hours ahead of London in summer (BST) and 5.5 ahead in winter (GMT). You get a live overlap window every UK morning and early afternoon for calls, Slack or Teams, anything you send at the end of your day is picked up before ours ends, and you get a weekly demo on a staging URL plus a monthly written report. We have no UK office and say so up front: if you need someone on site, we are not the right fit.' },
  { q: 'What makes TechAuditPros different from a UK web agency?', a: 'Three things, plainly. Real engineers write your code rather than page-builder operators, so 90+ Core Web Vitals is a standard rather than a hope. The same team runs your SEO and, if you need it, the internal software behind the site &mdash; so nobody can blame another supplier. And the commercial model is one agreed monthly fee instead of an upfront project fee followed by change-request invoices. We are also new to the UK market and open about it: our delivered work is in North America, Australia and the Gulf.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Website Design and Development', name: 'Website Development Services for UK Businesses', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'Custom website design and development services for UK businesses: Next.js and React builds engineered for 90+ Core Web Vitals, mobile-first, SEO and AI-search ready, hosted in a UK region, including ongoing updates.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['Website Development', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to Britain.', 'UK');
s = L.setRotatePhrases(s, 'UK', 'Pricing scoped on a call', 'London &bull; Manchester &bull; Leeds &bull; Bristol', 'the UK');
s = L.setHero(s, {
  eyebrow: 'Website Design &amp; Development &mdash; United Kingdom',
  h1: 'Website Development for UK Businesses, <span>Engineered to Load Fast, Rank and Convert.</span>',
  sub: 'TechAuditPros designs and builds custom, mobile-first websites for UK businesses on Next.js and React &mdash; 90+ Core Web Vitals, ready for Google and AI search from the first sprint, hosted in a UK region, and kept current every month by the team that built it. You own the code.',
  ghostHref: '#web-services', ghostText: 'See what’s included &darr;',
  features: ['⚡ 90+ Core Web Vitals', '\u{1F4F1} Mobile-First', '\u{1F1EC}\u{1F1E7} UK Hosting &amp; GDPR'],
  trust: [['250+', 'Projects delivered'], ['4&ndash;8 wks', 'To first live version'], ['90+', 'Core Web Vitals target'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('<strong>Website development services</strong> cover everything it takes to design, build and keep a business website working: UX and visual design, front-end and back-end code, integrations, UK hosting, accessibility, speed and the technical SEO foundation. TechAuditPros builds custom sites for UK businesses on <strong>Next.js and React</strong> &mdash; mobile-first, <strong>90+ Core Web Vitals</strong>, structured for Google and AI search &mdash; and keeps improving them for <strong>one agreed monthly fee</strong>, instead of an upfront agency project fee followed by a separate maintenance retainer.');

body += L.benefitRow('what-a-site-must-do', 'What a Business Website Has to Do in 2026', 'Three jobs your site has before design even matters.', [
  { icon: '\u{1F4F1}', h4: 'Work on a Phone First', p: 'Most of your visitors arrive on a phone and Google indexes the mobile version of your site. If it is hard to tap, read or load on a mid-range Android, it is losing customers you never hear about.' },
  { icon: '⚡', h4: 'Load in Under 2.5 Seconds', p: 'Core Web Vitals are both a ranking signal and a conversion signal. We engineer to LCP under 2.5s, INP under 200ms and CLS under 0.1 as the build standard, and you can verify it in PageSpeed Insights yourself.' },
  { icon: '\u{1F50E}', h4: 'Be Readable by Google and AI', p: 'Semantic markup, structured data and answer-first content so search engines rank it and AI assistants can quote it &mdash; increasingly the difference between being found and being invisible.' },
]);

body += L.modulesGrid('web-services', 'What’s Included', 'Eight services, one team, one monthly engagement.', 'From the first wireframe to the hundredth update &mdash; design, engineering, hosting and maintenance are not separate invoices here.', [
  { icon: '\u{1F3A8}', h4: 'Custom Website Design', p: 'UX research, wireframes and a clickable prototype you approve before code &mdash; designed around your customers and your conversion path, not a theme.' },
  { icon: '⚙️', h4: 'Front-End Development', p: 'Next.js, React and TypeScript, built component by component, with nothing along for the ride that your business does not need.' },
  { icon: '\u{1F5C4}️', h4: 'Back-End Development', p: 'Node.js APIs, PostgreSQL, authentication, payments and third-party integrations &mdash; the part that makes a site do work rather than just display.' },
  { icon: '\u{1F6D2}', h4: 'E-commerce Builds', p: 'Shopify where its ecosystem fits, headless or custom storefronts where it does not &mdash; fast product pages, clean checkout, stock kept in sync with your back office.' },
  { icon: '\u{1F511}', h4: 'Web Apps &amp; Customer Portals', p: 'Logins, dashboards, quoting and booking tools connected to your CRM, ERP or payment provider &mdash; the same engineering standard as the public site.' },
  { icon: '\u{1F504}', h4: 'Redesign &amp; Migration', p: 'Full 301 redirect maps, ranking content preserved, indexing verified in Search Console &mdash; so a redesign never costs you the traffic you already earned.' },
  { icon: '\u{1F680}', h4: 'Speed &amp; Core Web Vitals', p: 'Image pipelines, code splitting, caching and hosting tuned to 90+ scores &mdash; on your new site or the one you already have.' },
  { icon: '\u{1F6E0}️', h4: 'Maintenance &amp; Support', p: 'New pages, content changes, dependency and security updates, uptime and speed monitoring every month, by the team that built the site.' },
], true);

body += L.promise({
  h2: 'You See the Design Before a Line of Code Is Written',
  p: 'Every build starts with a real design pass &mdash; wireframes first, then a clickable prototype you review and approve &mdash; not live editing on a template. Your engineering team walks you through the structure, the content plan and the conversion path before development starts, so the build follows a plan you have already signed off rather than a guess that gets corrected in invoices.',
  href: '#process', cta: 'See Our Process',
  img: 'mentor-explaining-data-on-monitor-warm-office.jpg', alt: 'Reviewing a website prototype and its structure on screen with a client', w: 1344, h: 1335,
});

body += L.modulesGrid('stack', 'The Stack We Build On', 'Named technologies, so you can check we know them.', 'Agency pages list logos; here is what each layer is and why it is in your build. Everything is mainstream and open source, so any developer can pick it up after us.', [
  { icon: '⚛️', h4: 'Next.js &amp; React', p: 'The front end. Server rendering and static generation for speed and crawlability, with React components for anything interactive.' },
  { icon: '\u{1F4D8}', h4: 'TypeScript', p: 'Typed JavaScript, so whole classes of bug are caught before your users find them &mdash; and so the code stays readable for whoever maintains it next.' },
  { icon: '\u{1F7E9}', h4: 'Node.js APIs', p: 'The back end. REST and GraphQL endpoints, authentication, webhooks and the integrations that connect your site to the tools you already run.' },
  { icon: '\u{1F418}', h4: 'PostgreSQL', p: 'The database. Relational, proven and portable &mdash; your data in a standard format you can export or move at any time.' },
  { icon: '☁️', h4: 'UK Hosting &amp; Edge', p: 'Vercel&rsquo;s London edge, AWS London (eu-west-2) or Google Cloud europe-west2, in an account you own, with CDN caching, TLS and automated backups.' },
  { icon: '\u{1F517}', h4: 'Integrations', p: 'Xero, Sage, QuickBooks, Shopify, WooCommerce, Stripe, GoCardless, HubSpot, Salesforce, Google Analytics 4 and Search Console &mdash; built on official APIs.' },
], false);

body += L.compareTable('web-compare', 'Builder vs. Template vs. Custom', 'Three ways to get a UK business website &mdash; compared honestly.', 'A DIY builder is genuinely the right answer for some businesses. Here is how to tell which column you are in before you spend anything.', ['DIY website builder', 'Template / theme site', 'Custom build (TechAuditPros)'], 2, [
  ['Speed &amp; Core Web Vitals', 'Often poor; little control over scripts, fonts and images', 'Varies; plugin stacks slow down as features are added', 'Engineered to 90+ from the start; nothing unnecessary ships'],
  ['Design', 'Preset blocks; looks like every other site on that builder', 'A theme thousands of sites share, restyled', 'Designed around your customers and your conversion path'],
  ['SEO, AEO &amp; GEO control', 'Limited technical control; basic schema at best', 'Depends on plugins and the theme&rsquo;s markup', 'Full control of markup, structured data, redirects, speed and AI-search readiness'],
  ['Integrations', 'Whatever the builder offers', 'Plugins, with compatibility and security upkeep on you', 'Direct integration with Xero, Sage, Shopify, Stripe, your CRM or ERP'],
  ['UK compliance', 'Cookie banner bolted on; data location often unclear', 'Depends on the plugins you install', 'UK GDPR and PECR designed in, data hosted in a UK region, DPA signed'],
  ['Accessibility', 'Whatever the template does', 'Theme-dependent, rarely tested', 'Built to WCAG 2.2 AA practices and tested with a keyboard'],
  ['Ownership', 'You rent it; leaving means rebuilding', 'You own the files; theme and plugin licences continue', 'You own the code, content, domain and hosting outright'],
  ['Cost pattern', '&pound;10&ndash;&pound;30 a month, your own time as the labour', 'A few thousand upfront plus maintenance', 'One agreed monthly fee covering design, build and updates'],
  ['Best for', 'Very early businesses testing an idea', 'Simple brochure sites with no growth plans', 'UK businesses where the site has to win customers and keep improving'],
], true, 'Third-party figures are typical published UK market pricing as of September 2026 and vary with scope.');

body += L.processRow('process', 'How We Build It', 'Six steps, from discovery to a site that keeps improving.', [
  { h4: 'Discovery', p: 'Your business, customers, goals and your current site&rsquo;s real data &mdash; what converts and what does not &mdash; before a wireframe is drawn.' },
  { h4: 'Wireframes &amp; Design', p: 'Structure first, then visual design and a clickable prototype you approve.' },
  { h4: 'Build in Sprints', p: 'Next.js and React development in two-week sprints, reviewable on a staging URL as it comes together.' },
  { h4: 'Content, SEO &amp; Accessibility', p: 'Page copy, structured data, redirect map, indexing and WCAG checks set up so the site is ready to rank and usable on day one.' },
  { h4: 'QA &amp; Launch', p: 'Cross-device and browser testing, Core Web Vitals verification on a real mid-range phone, then a careful production launch.' },
  { h4: 'Maintain &amp; Improve', p: 'Updates, new pages and conversion improvements every month by the team that built it, with a written report of what shipped.' },
]);

body += L.costGrid('web-cost', 'Cost &amp; Timeline', 'What a website actually costs a UK business.', 'Most UK agency pages make you request a quote to learn anything at all &mdash; the current top-ranking one shows no pricing whatsoever. Here is the honest picture, with published figures where they exist.', [
  { tag: 'DIY builder', num: '&pound;10&ndash;&pound;30', sub: 'Per month, plus your own time', items: ['Fine for testing an idea or a one-page presence', 'Speed and technical SEO largely out of your hands', 'You are the designer, copywriter and maintainer', 'You rent the platform; leaving means rebuilding'] },
  { tag: 'TechAuditPros', num: 'Let’s talk', sub: 'Scoped on the call and put in writing', hi: true, items: ['Design, custom Next.js and React build, UK hosting setup and ongoing updates included', 'First live version in 4&ndash;8 weeks', '90+ Core Web Vitals and the technical SEO foundation built in', 'You own the code, content, domain and hosting', 'Month to month; stop any time and the site is yours'] },
  { tag: 'UK agency', num: '&pound;20&ndash;&pound;150/hr', sub: 'Clutch UK directory, most &pound;40&ndash;&pound;80', items: ['Minimum project sizes commonly above &pound;8,000', 'Change requests and new pages billed after launch', 'Maintenance retainer quoted separately', 'Three to six month timelines are common'] },
], 'Agency rates and minimum project sizes are from Clutch&rsquo;s United Kingdom web-development directory, read 3 September 2026, converted from the USD figures it publishes; they vary by agency and scope. Our number is fixed in writing before work starts.', true);

body += L.promise({
  h2: 'Real Engineers, Overnight Progress, Your Mornings for Decisions',
  p: 'The people writing your site&rsquo;s code are engineers you can talk to directly, not page-builder operators. Working from Kochi &mdash; 4.5 hours ahead of London in summer, 5.5 in winter &mdash; they turn the feedback you leave at the end of your day into a new staging build, with a live overlap window every UK morning for calls. That is also why the sites hit 90+ Core Web Vitals: they are engineered, file by file, rather than assembled from plugins.',
  href: '#webdev-faq', cta: 'Read the FAQ',
  img: 'team-standing-document-review-bright-room.jpg', alt: 'The TechAuditPros team reviewing a client build together', w: 2400, h: 1601,
});

body += L.industriesGrid('web-builds', 'What We Build', 'Four kinds of builds, one engineering standard.', 'Marketing sites, shops, portals and campaign pages &mdash; each with its own conversion logic, all held to the same speed, accessibility and SEO bar.', [
  { img: 'male-developer-dual-monitors-colorful-office.jpg', alt: 'Engineer building a marketing website across two monitors', w: 766, h: 400, h4: 'Marketing &amp; Service Websites', p: 'For professional services, trades, B2B and local businesses &mdash; built to explain, rank and get the call or the enquiry.' },
  { img: 'istock-1442543641-india-shop-upi-qr-payment.jpg', alt: 'Customer completing a purchase on a phone', w: 612, h: 408, h4: 'E-commerce Stores', p: 'Shopify or headless storefronts with fast product pages, clean checkout and stock synced to your back office.' },
  { img: 'istock-1321462048-woman-holographic-ui-network.jpg', alt: 'User working in a connected web application interface', w: 612, h: 344, h4: 'Web Apps &amp; Portals', p: 'Logins, dashboards, quoting and booking tools connected to your CRM, ERP and payments.' },
  { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Team reviewing a landing page wireframe sketch', w: 720, h: 419, h4: 'Landing Pages &amp; Campaigns', p: 'Focused pages for paid campaigns and launches, measured on conversions and improved with tests once traffic justifies them.' },
], false);

body += L.faqHtml('webdev-faq', 'FAQ', 'Website Development in the UK: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s scope your website build.', 'Takes 60 seconds &middot; quote in writing &middot; No long-term contract');
s = L.injectExtras(s);

// sanity
L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/seo-services/"'); L.must(s, 'href="/uk/website-development/"');
L.must(s, 'https://techauditpros.com/ca/website-development/', 1);   // hreflang alternate only
L.must(s, 'Canadian', 0);
L.must(s, 'CA$', 0); L.must(s, 'US$', 0);              // the rate-card JS is gone, so these hold
L.must(s, '<section class="tap-erp-why-section', 0);   // the duplicate badge section stays gone (orphan CSS may remain)
L.must(s, 'Core Web Vitals'); L.must(s, 'WCAG 2.2 AA'); L.must(s, 'Clutch');
L.must(s, 'library/istock', 2);                        // 612px files only on two small cards
L.write('uk/website-development/index.html', s);
