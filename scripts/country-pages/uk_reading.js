'use strict';
// /uk/reading/ — PLAN-UK phase 2, page two. Web-first, because that is what the data says Reading
// actually searches for: web designer reading 90/KD7 · web development reading 90/KD16 plus 27 more
// Reading-modified long-tail terms, 410/mo combined, the softest competition in the UK set after
// Manchester.
// SERP crawl 2026-09-03: advansys.com/website-design-reading ranks top and is ~1,200 words that are
// roughly 85% generic web-design copy - the only genuinely local elements are a Wokingham head-office
// address, an 0118 phone number, two Berkshire hashtags and one unnamed case-study screenshot. No FAQ,
// no pricing. The rest of the first page is the same shape: small Reading and Berkshire studios with
// service lists and contact forms.
// So the opening is identical to Manchester's: be the page that is actually about the place, and add the
// three things none of them have - a real FAQ with schema, honest cost framing, and engineering
// specifics (Core Web Vitals as numbers, UK hosting, accessibility, redesign without losing rankings).
// Section vocabulary and signature animation are unique to this page.
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/reading/';
let s = L.read('ca/toronto/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.replaceAll(s, 'href="/ca/toronto/"', 'href="/uk/reading/"');
// blanket localisation, as for Manchester: any surviving Toronto string would be a bug
s = s.split('Toronto').join('Reading').split('Ontario').join('Berkshire').split('the GTA').join('the Thames Valley');
if (s.includes('ca/reading')) throw new Error('a /ca/toronto/ path survived the href repointing');
['optimization|optimisation', 'Optimization|Optimisation', 'optimize|optimise', 'optimized|optimised',
 'organization|organisation', 'analyze|analyse', 'behavior|behaviour', 'license|licence',
 'center|centre', 'Center|Centre'].forEach(pair => { const [us_, uk_] = pair.split('|'); s = s.split(us_).join(uk_); });
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'Web Design &amp; Development in Reading, Berkshire | TechAuditPros',
  ogTitle: 'Web Design &amp; Development for Reading &amp; the Thames Valley',
  desc: 'Custom website design and development for Reading and Thames Valley businesses &mdash; Next.js and React builds engineered to 90+ Core Web Vitals, hosted in a UK region, WCAG 2.2 AA, and kept current every month. Remote team, audit first, no long-term contract.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }],
});

const faqs = [
  { q: 'Are you based in Reading?', a: 'No. TechAuditPros is an engineering team in Kochi, India, working for UK clients remotely, and we would rather say that in the first answer than bury it. Kochi runs 4.5 hours ahead of Reading in summer and 5.5 in winter, so you get a live overlap window every morning and early afternoon for calls, Slack or Teams. If you want a designer who can sit in your boardroom in Green Park on a Tuesday, one of the Reading studios is the better answer and we will tell you that on the call.' },
  { q: 'How much does a website cost in Reading?', a: 'Nobody on the first page of Google for this term publishes a figure &mdash; we checked while writing this page. The honest ranges are these: a DIY builder subscription is roughly &pound;10&ndash;&pound;30 a month plus your own time; UK agencies listed in Clutch&rsquo;s directory charge &pound;20&ndash;&pound;150 an hour, most commonly &pound;40&ndash;&pound;80, with minimum project sizes commonly above &pound;8,000 and maintenance quoted separately. Ours is one agreed monthly fee covering design, build, UK hosting setup and ongoing updates, quoted in writing on the call before anything starts.' },
  { q: 'Why does Core Web Vitals matter for a Thames Valley business?', a: 'Because your buyers are on trains and phones. Reading is one of the busiest interchanges in the country and a large share of your traffic will arrive on a mid-range Android over patchy 4G between Paddington and Didcot. We build to LCP under 2.5 seconds, INP under 200 milliseconds and CLS under 0.1 measured on exactly that kind of device, not on a fast laptop on office wifi &mdash; and you can verify it in PageSpeed Insights the day the site goes live.' },
  { q: 'Which Thames Valley sectors do you build for?', a: 'The corridor is unusually weighted towards technology, telecoms, software and pharmaceutical services, with a large professional-services layer around them &mdash; recruitment, accountancy, consultancy, legal &mdash; plus the trades and clinics that serve Reading, Wokingham, Bracknell and Slough. Practically that means two different jobs: B2B sites that have to explain something technical and generate a qualified enquiry, and local service sites that have to be found in Maps and get the phone to ring.' },
  { q: 'Can you redesign our site without losing our Google rankings?', a: 'Yes, and this is where most redesigns quietly fail. Rankings are lost when URLs change without redirects and the pages that were earning traffic disappear into a prettier layout. We map every old URL to its new home with 301 redirects, keep or improve the content that already ranks, and verify indexing and Search Console coverage after launch. It is part of every redesign here, not an upsell.' },
  { q: 'Do you build on WordPress?', a: 'When it genuinely fits &mdash; usually when a marketing team must edit everything daily without waiting for anyone. Otherwise we build custom on Next.js and React, because that is how you get 90+ Core Web Vitals and keep it there without a plugin stack that rots. If you already run WordPress we will tell you honestly whether it is worth hardening or worth replacing.' },
  { q: 'Who owns the site, the domain and the hosting?', a: 'You do, all three, in your own name from day one &mdash; along with the code, the content and the analytics accounts. Nothing is held in our accounts, so moving to another supplier or in-house is a handover rather than a rebuild.' },
  { q: 'Where is the site hosted, and is it UK GDPR compliant?', a: 'On modern infrastructure in a UK region &mdash; Vercel&rsquo;s London edge, AWS London (eu-west-2) or Google Cloud europe-west2 &mdash; in an account you own, so personal data stays in the UK. Forms, analytics and cookie behaviour are built to UK GDPR and PECR: consent before non-essential cookies, a lawful basis for every form, and a data processing agreement between us.' },
  { q: 'Is the site accessible?', a: 'We build to WCAG 2.2 AA practices as standard &mdash; semantic markup, keyboard navigation, visible focus, colour contrast, alt text, labelled forms. Accessible sites are also faster and easier for Google to parse, and under the Equality Act it is the safer position for a UK business. For a formal audit or accessibility statement we work with your compliance adviser.' },
  { q: 'How long does a build take, and what happens after launch?', a: 'Four to eight weeks from approved design to a live first version for most business sites; larger builds are phased so something useful ships early. After launch, new pages, content changes, dependency and security updates, and speed monitoring are part of the monthly engagement, handled by the team that built it &mdash; not a separate maintenance plan.' },
  { q: 'What happens on the first call?', a: 'We look at your current site with you &mdash; what it ranks for, what it is losing on mobile, where enquiries actually come from &mdash; and tell you what we would change first and what we would leave alone. You get that assessment whether or not you hire us, and if the honest answer is that a new site is not your problem, you will hear that.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Website Design and Development', name: 'Web Design and Development for Reading and the Thames Valley', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'Custom website design and development for Reading and Thames Valley businesses: Next.js and React builds engineered to 90+ Core Web Vitals, WCAG 2.2 AA, hosted in a UK region, including ongoing updates.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['Reading', URL]]),
  L.faqSchema(faqs),
]);

s = L.must(s, '<span>to Reading.</span>', 1);
s = L.replaceAll(s, 'heroArcPathCA', 'heroArcPathRDG');
s = L.setRotatePhrases(s, 'Reading', 'Audit before any retainer', 'Green Park &bull; Winnersh &bull; Bracknell &bull; Wokingham', 'the Thames Valley');
s = L.setHero(s, {
  eyebrow: 'Web Design &amp; Development &mdash; Reading &amp; the Thames Valley',
  h1: 'Websites for Reading Businesses, <span>Fast Enough for a Commuter on 4G.</span>',
  sub: 'Custom Next.js and React builds for Reading, Wokingham, Bracknell and Slough &mdash; engineered to 90+ Core Web Vitals on a mid-range Android, WCAG 2.2 AA, hosted in a UK region you own, and kept current every month. We are a remote team and we say so up front.',
  ghostHref: '#rdg-speed', ghostText: 'See the build standard &darr;',
  features: ['⚡ 90+ Core Web Vitals', '\u{1F4F1} Mobile-First', '\u{1F1EC}\u{1F1E7} UK Hosting &amp; GDPR'],
  trust: [['250+', 'Projects delivered'], ['4&ndash;8 wks', 'To first live version'], ['90+', 'Core Web Vitals target'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('TechAuditPros designs and builds <strong>custom websites for Reading and the Thames Valley</strong> &mdash; Green Park, Winnersh, Bracknell, Wokingham, Slough and the M4 corridor &mdash; on <strong>Next.js and React</strong>, engineered to <strong>90+ Core Web Vitals</strong> on a mid-range Android, built to <strong>WCAG 2.2 AA</strong>, and hosted in a UK region inside an account you own. One agreed monthly fee including updates, no upfront project fee, and an audit of your current site before anything is committed. We work remotely from India; there is no Reading office.');

body += L.benefitRow('rdg-market', 'What Makes the Thames Valley Different', 'Three things about this corridor that change what your site has to do.', [
  { icon: '\u{1F686}', h4: 'Your Traffic Is Commuting', p: 'Reading is one of the busiest interchanges in the country. A serious share of your visitors arrive on a phone, on moving 4G, with about two seconds of patience &mdash; which is why speed here is a commercial decision, not a technical one.' },
  { icon: '\u{1F9EA}', h4: 'A Technical Buyer', p: 'The corridor is weighted towards technology, telecoms, software and pharmaceutical services. Those buyers read specifications, check your claims, and are unimpressed by adjectives &mdash; so the site has to explain something real, clearly.' },
  { icon: '\u{1F4CD}', h4: 'Two Jobs, One Site', p: 'B2B enquiry generation and local service search often sit in the same business here. That needs a site that ranks nationally for what you do and locally for where you do it, without either half diluting the other.' },
]);

body += L.modulesGrid('rdg-build', 'What We Build for Reading Businesses', 'Six builds, one engineering standard.', 'The audit decides which of these you actually need. Most Thames Valley engagements start with one and add a second once it has paid for itself.', [
  { icon: '\u{1F3E2}', h4: 'B2B &amp; Technical Sites', p: 'For software, telecoms, engineering and consultancy: architecture that explains a complex offer, and enquiry paths measured properly rather than counted.' },
  { icon: '\u{1F4CD}', h4: 'Local Service Sites', p: 'For trades, clinics and practices across Reading, Wokingham and Bracknell: service and area pages that are genuinely different from each other, plus a Business Profile that earns the call.' },
  { icon: '\u{1F6D2}', h4: 'Online Shops', p: 'Shopify where the ecosystem fits, headless or custom where it does not &mdash; fast product pages, clean checkout, stock synced to your back office.' },
  { icon: '\u{1F511}', h4: 'Portals &amp; Web Apps', p: 'Client logins, dashboards, quoting and booking tools connected to your CRM or finance system, held to the same speed and accessibility bar as the public site.' },
  { icon: '\u{1F504}', h4: 'Redesign &amp; Migration', p: 'Full 301 redirect maps, ranking content preserved, Search Console coverage verified after launch &mdash; so the new site keeps the traffic the old one earned.' },
  { icon: '\u{1F680}', h4: 'Speed Rescue', p: 'For sites that are fine on desktop and failing on mobile: image pipelines, code splitting, caching and hosting tuned to 90+, on the site you already have.' },
], true);

body += L.promise({
  h2: 'We Start by Auditing the Site You Already Have',
  p: 'Before any design work, we go through your current site, your Search Console data and your two closest competitors, and write down what is actually costing you enquiries &mdash; the pages that are slow on mobile, the ones Google is not indexing, the forms nobody finishes, the content that ranks and must survive a redesign. You keep that audit whether or not you hire us, and if it says the site is not your problem, it will say so.',
  href: '#rdg-process', cta: 'See the Process',
  img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Reviewing a website wireframe and structure with a client', w: 720, h: 419,
});

body += L.benefitRow('rdg-speed', 'The Build Standard, in Numbers', 'What we hold every build to &mdash; and how you check it yourself.', [
  { icon: '⏱️', h4: 'LCP Under 2.5 Seconds', p: 'Largest Contentful Paint: how long until the main thing on the page is actually there. Measured on a mid-range Android over 4G, not on office wifi.' },
  { icon: '\u{1F446}', h4: 'INP Under 200ms', p: 'Interaction to Next Paint: how quickly the page responds when a real thumb taps it. This is where plugin-heavy sites fall apart and custom builds do not.' },
  { icon: '\u{1F4D0}', h4: 'CLS Under 0.1', p: 'Cumulative Layout Shift: nothing jumping around as fonts and images load. The difference between a form someone completes and one they abandon.' },
]);

body += L.processRow('rdg-process', 'How the Build Runs', 'Five steps, and what you see at each one.', [
  { h4: 'Audit &amp; Plan', p: 'Your current site, your data and your competitors, written up in plain English with a recommended order of work. Yours to keep.' },
  { h4: 'Wireframes &amp; Design', p: 'Structure first, then visual design and a clickable prototype you approve before any production code exists.' },
  { h4: 'Build in Sprints', p: 'Two-week sprints on Next.js and React, reviewable on a staging URL as they land rather than at the end.' },
  { h4: 'Content, SEO &amp; Access', p: 'Copy, structured data, redirect map, indexing and WCAG 2.2 AA checks, so launch day is not the day you discover problems.' },
  { h4: 'Launch, Then Keep Going', p: 'Core Web Vitals verified on a real phone, then monthly updates, new pages and improvements from the team that built it.' },
]);

body += L.costGrid('rdg-cost', 'What It Costs, and What to Compare', 'Three routes for a Reading business.', 'Not one agency on the first page for this term publishes a price. Rather than invent one, here is the shape of each option and the published figures where they exist.', [
  { tag: 'DIY builder', num: '&pound;10&ndash;&pound;30', sub: 'Per month, plus your own hours', items: ['Right answer for testing an idea or a single page', 'Speed and technical SEO largely out of your control', 'You are the designer, writer and maintainer', 'You rent the platform; leaving means rebuilding'] },
  { tag: 'TechAuditPros', num: 'Let’s talk', sub: 'Audit first, then one agreed monthly fee', hi: true, items: ['Design, custom build, UK hosting setup and updates in one number', 'First live version in 4&ndash;8 weeks', '90+ Core Web Vitals and WCAG 2.2 AA as the build standard', 'You own the code, content, domain and hosting', 'Month to month; stop any time and it is all yours'] },
  { tag: 'UK agency', num: '&pound;20&ndash;&pound;150/hr', sub: 'Clutch UK directory, most &pound;40&ndash;&pound;80', items: ['Minimum project sizes commonly above &pound;8,000', 'Change requests and new pages billed after launch', 'Maintenance retainer quoted separately', 'Ask who writes the code, and where it is hosted'] },
], 'Agency rates and minimums are from Clutch&rsquo;s United Kingdom web-development directory, read 3 September 2026, converted from the USD figures it publishes. Builder pricing is the vendors&rsquo; own published rates. Our number is fixed in writing before work starts.', true);

body += L.benefitRow('rdg-remote', 'Remote, From 4,500 Miles &mdash; and When Not To', 'How this works in practice from the Thames Valley, honestly.', [
  { icon: '\u{1F551}', h4: 'Mornings Are Live', p: 'Kochi is 4.5 hours ahead in summer, 5.5 in winter, so every Reading morning and early afternoon there is a real window for calls and Slack. Anything you send at the end of your day is picked up before ours ends.' },
  { icon: '\u{1F4F9}', h4: 'You Watch It Being Built', p: 'A staging URL from the first sprint and a demo every week, so progress is something you click rather than something you are promised. A written report monthly.' },
  { icon: '⚠️', h4: 'When to Hire Locally', p: 'If you need someone in the room for workshops, or your brand work needs a designer sitting with your marketing team, use one of the Reading studios. We would rather lose the enquiry than the project.' },
]);

body += L.faqHtml('rdg-faq', 'FAQ', 'Web Design in Reading: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s audit the site you have.', 'Takes 60 seconds &middot; the audit is yours to keep &middot; No long-term contract');
s = L.injectExtras(s);

// sanity
L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/reading/"');
L.must(s, 'Toronto', 0); L.must(s, 'Ontario', 0); L.must(s, 'Canadian', 0); L.must(s, 'CA$', 0); L.must(s, 'US$', 0);
L.must(s, '<section class="tap-erp-why-section', 0);
L.must(s, 'Green Park'); L.must(s, 'Thames Valley'); L.must(s, 'Wokingham'); L.must(s, 'WCAG 2.2 AA');
L.must(s, 'no Reading office');           // the honesty line must survive
L.write('uk/reading/index.html', s);
