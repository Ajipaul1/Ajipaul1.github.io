'use strict';
// /uk/seo-services/ — session B of ai_context/PLAN-UK.md. Targets:
//   what are seo services 390/KD29 · what is seo services 210/39 · technical seo 3,600/49 (stretch) ·
//   seo site audit 1,300 · what is enterprise seo 260/22 · how long does it take for seo to work 210/28 ·
//   how to get website to top of google 210/21 · how to get seo on my website 170/31 · javascript seo
//   agency 170/15 · how much does seo cost for small business 110/0 · what affects local seo 140/28 ·
//   plus the whole AI-search cluster (264 keywords, 5,180/mo, almost all KD 0): how to rank in ai
//   overview 90 · how to optimize for ai search 70 · what is generative engine optimization geo 70 ·
//   what is ai seo 70 · how do i rank my website on chatgpt 40 · what is aeo vs seo 40.
// Clusters to cover: keywords (595 kw, 28,180/mo), links (290 / 13,580), local (78 / 13,300), content
// (247 / 10,580), technical (152 / 8,870), audit (107 / 8,870), international (3,040), AEO/GEO (5,180).
// SERP crawl 2026-09-03: seoworks.co.uk (~2,500 words; H2s are award/results/services/sectors/
// testimonials/awards/blog; 80+ specialists, established 2009, Sheffield + London + Leeds, five award
// logos, 24+ client logos, 9 testimonials; names technical, local, content, digital PR, AI SEO, GEO and
// AEO; NO PRICING, NO FAQ) and goup.co.uk (~3,000 words; 15 named sub-services, 5 case studies with
// metrics, 15+ testimonials, London + LA; AI coverage is one "AI SEO" link and a single sentence;
// NO PRICING, NO FAQ).
// They win on trust we do not have yet (two decades, 80 staff, awards) and we do not pretend otherwise.
// We beat them on the three things they leave open: a real FAQ with FAQPage schema (neither has one), an
// honest cost section (neither shows a figure), and genuine AEO/GEO depth instead of a single mention -
// which is also the cheapest cluster in the whole UK dataset to rank for.
// Section vocabulary is deliberately disjoint from /uk/, /uk/erp/ and /uk/website-development/ (owner:
// "each page its own independent design and content").
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/seo-services/';
let s = L.read('ca/seo-services/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
['optimization|optimisation','Optimization|Optimisation','optimize|optimise','optimized|optimised','organization|organisation','specialization|specialisation','analyze|analyse','behavior|behaviour','catalog|catalogue','license|licence'].forEach(pair => { const [us_, uk_] = pair.split('|'); s = s.split(us_).join(uk_); });
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'SEO Services for UK Businesses &mdash; Search, AEO &amp; GEO | TechAuditPros',
  ogTitle: 'SEO, AEO &amp; GEO Services for UK Businesses | TechAuditPros',
  desc: 'SEO services for UK businesses built on real search data &mdash; technical SEO, content, local and links, plus Answer and Generative Engine Optimisation so you get cited by ChatGPT, Perplexity and AI Overviews. Every engagement starts with an audit, not a retainer.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }, { lang: 'en-us', href: 'https://techauditpros.com/us/seo-services/' }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/seo-services/' }],
});

const faqs = [
  { q: 'What are SEO services, exactly?', a: 'Four workstreams that only matter together. Technical SEO makes the site crawlable, fast and correctly structured. On-page and content work makes each page the best answer to a real query. Local SEO makes you findable in your area and in Maps. Off-page work earns the citations and links that prove you are credible. Anything sold as one of these alone &mdash; &ldquo;we do links&rdquo;, &ldquo;we write blogs&rdquo; &mdash; tends to move rankings for a month and then stop.' },
  { q: 'How long does SEO take to work?', a: 'Honestly: technical fixes can show in Search Console within two to four weeks, local visibility in one to three months, and competitive content and authority work in six to twelve. What should never take six months is knowing whether it is working &mdash; the audit tells you what is broken in week one, and the monthly report shows movement in impressions and rankings long before revenue moves.' },
  { q: 'How much do SEO services cost in the UK?', a: 'We checked the two UK agency sites ranking highest for this term while writing this page: neither publishes a single figure. The honest answer is that pricing takes three shapes &mdash; an hourly rate, a monthly retainer, or a project fee for an audit or migration &mdash; and what you should compare is what is inside it: who does the work, how many hours, whether content and links are included, and what happens if it does not move. Ours is one agreed monthly fee, quoted in writing on the call once we have seen your site and your Search Console data. If tools are all you need, Semrush and Ahrefs publish their own prices at roughly &pound;100&ndash;&pound;200 a month and you can run this yourself.' },
  { q: 'What is the difference between SEO, AEO and GEO?', a: 'SEO earns a ranking on a results page. AEO (Answer Engine Optimisation) earns the answer box &mdash; featured snippets, People Also Ask, voice results &mdash; by structuring a direct answer a machine can lift. GEO (Generative Engine Optimisation) earns a citation inside an AI-generated answer in ChatGPT, Perplexity, Gemini or Google AI Overviews. They share a foundation but not their tactics: AEO rewards a clean question-and-answer structure, GEO rewards being the source an AI trusts enough to name.' },
  { q: 'How do you actually get a business cited by ChatGPT or AI Overviews?', a: 'By being the clearest, most specific, most verifiable source on a narrow question. In practice that means answer-first pages where the answer sits in the first 60 words, question-shaped headings, FAQPage and Organization structured data, real figures and dates rather than adjectives, an entity that is consistent everywhere (name, address, services, author), and enough corroboration elsewhere on the web that a model treats you as a fact rather than a claim. We then measure it: we track which prompts return your name, and which return a competitor.' },
  { q: 'Can you guarantee a number-one ranking?', a: 'No, and anyone who does is either lying or bidding on your brand name. Nobody controls Google&rsquo;s index. What we will commit to is the work, the reporting and the honesty: you will know exactly what changed, what moved, and whether it is worth continuing.' },
  { q: 'What is technical SEO and do we need it?', a: 'Technical SEO is everything that decides whether Google can crawl, render, index and trust your pages: site speed and Core Web Vitals, mobile rendering, crawl budget, canonical and duplicate handling, sitemaps and robots rules, structured data, HTTPS, and internal linking. You need it when pages are not indexed, traffic dropped after a redesign, the site is slow on mobile, or the site is built in JavaScript and Google is seeing an empty page.' },
  { q: 'Our site is a JavaScript app. Can Google even index it?', a: 'Sometimes, badly, and often with a delay. Google renders JavaScript but on its own schedule and budget, which is why React and Angular sites often have pages that rank late or not at all. The fix is not a plugin: it is server-side rendering or static generation for anything that must rank, with hydration for the interactive parts. We build sites that way and we retrofit sites that were not.' },
  { q: 'What does local SEO involve in the UK?', a: 'A correct and complete Google Business Profile, consistent name-address-phone data across UK directories, service and location pages that are genuinely different from each other, review generation and response, and local links from real UK organisations. If you serve an area rather than a shopfront, the service-area setup matters more than the pin.' },
  { q: 'Do you buy links?', a: 'No. We earn citations through content worth referencing, digital PR, supplier and trade-body listings, and genuine local relationships. Bought links are a temporary lift with a permanent risk, and the risk lands on your domain, not on ours.' },
  { q: 'What do we actually receive each month?', a: 'A written report in plain English: what changed on the site, what moved in rankings, impressions and clicks, what the AI-search tracking showed, what we learned, and what we are doing next month &mdash; plus a call to argue about it if you want one. Not a 40-page dashboard export nobody reads.' },
  { q: 'Do you work with agencies as a white-label partner?', a: 'Yes. UK marketing, design and IT agencies hand us the technical SEO and AI-search delivery for their clients under their own brand, with a shared board and one point of contact. Ask about it on the call.' },
  { q: 'Do you have UK clients we can speak to?', a: 'Not yet, and we will not pretend otherwise while the UK set is new. Our delivered results are in the United States, Canada and Australia, and we will walk you through any of them in detail on a call, including the reporting you would receive. Nothing here runs on a long-term contract, so the risk of starting is one month.' },
  { q: 'What happens on the first call?', a: 'We look at your site, your Search Console and your competitors together, and tell you where the leverage actually is &mdash; which is sometimes technical, sometimes content, and occasionally not SEO at all. If the honest answer is that you do not need us yet, you will hear that instead of a proposal.' },
];

s = L.setPageSchemas(s, [
  L.serviceSchema({ type: 'Search Engine Optimisation', name: 'SEO, AEO and GEO Services for UK Businesses', url: URL, country: 'United Kingdom', currency: 'GBP', price: '1200', desc: 'SEO services for UK businesses: technical SEO, content, local and off-page work, plus Answer and Generative Engine Optimisation for citation in ChatGPT, Perplexity and Google AI Overviews. Every engagement starts with a technical and content audit.' }),
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', 'https://techauditpros.com/uk/'], ['SEO Services', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to Britain.', 'UK');
s = L.setRotatePhrases(s, 'UK', 'Pricing scoped on a call', 'London &bull; Manchester &bull; Leeds &bull; Bristol', 'the UK');
s = L.setHero(s, {
  eyebrow: 'SEO, AEO &amp; GEO &mdash; United Kingdom',
  h1: 'SEO Services for UK Businesses, <span>Built to Rank on Google and Get Quoted by AI.</span>',
  sub: 'Technical SEO, content, local and off-page work on real UK search data &mdash; plus Answer and Generative Engine Optimisation, so you are the source ChatGPT, Perplexity and Google AI Overviews cite. Every engagement starts with an audit, not a retainer.',
  ghostHref: '#seo-audit', ghostText: 'Start with the audit &darr;',
  features: ['\u{1F50D} Technical &amp; Content', '\u{1F916} AEO &amp; GEO', '\u{1F4C4} Plain-English Reporting'],
  trust: [['250+', 'Projects delivered'], ['16', 'Countries served'], ['Audit', 'Before any retainer'], ['4.9/5', 'Client rating']],
});

let body = '';
body += L.answer('<strong>SEO services</strong> are four workstreams that only work together: <strong>technical SEO</strong> so Google can crawl, render and index your site; <strong>content and on-page</strong> so each page is the best answer to a real query; <strong>local SEO</strong> so you are found in your area; and <strong>off-page work</strong> so you are credible. TechAuditPros adds the two that most UK agencies still treat as a footnote &mdash; <strong>AEO</strong> (Answer Engine Optimisation) for answer boxes and <strong>GEO</strong> (Generative Engine Optimisation) for citation inside AI answers &mdash; and every engagement opens with a technical and content audit rather than a retainer.');

body += L.benefitRow('search-today', 'Search in 2026 Is Two Games', 'You now have to win a ranking and win a citation &mdash; and they are not the same job.', [
  { icon: '\u{1F50E}', h4: 'The Ranking Game', p: 'Ten blue links still send most commercial traffic in the UK, and they still go to the fastest, clearest, best-linked page on the query. That is classic SEO and it has not stopped mattering.' },
  { icon: '\u{1F4AC}', h4: 'The Citation Game', p: 'A growing share of questions are answered before anyone clicks &mdash; in AI Overviews, ChatGPT, Perplexity and Gemini. There you are not ranked, you are quoted or ignored, and being quoted depends on structure and verifiability rather than ad spend.' },
  { icon: '⚖️', h4: 'What It Means for You', p: 'Optimise only for rankings and you slowly vanish from the answers. Chase only AI and you lose the traffic that actually converts today. The work has to serve both, from the same technical foundation.' },
]);

body += L.promise({
  h2: 'We Start With an Audit, Not a Retainer',
  p: 'Before anything is committed, we go through your site, your Search Console and Analytics data and your three closest competitors, and produce a plain-English audit: what is technically broken, which pages already earn attention, where the gaps are, and what the realistic upside looks like. You own that document whatever happens next. If it says your problem is your offer or your pricing rather than your search visibility, it will say so &mdash; and you will have lost nothing but an hour.',
  href: '#timeline', cta: 'See the First 12 Months',
  img: 'executive-woman-tablet-grand-hall.jpg', alt: 'Reviewing a technical and content audit before committing to a programme of work', w: 2400, h: 1601,
});

body += L.modulesGrid('seo-pillars', 'The Work Itself', 'Eight workstreams, priced as one engagement.', 'Not everything runs every month. The audit decides the order, and the order changes as the site changes.', [
  { icon: '⚙️', h4: 'Technical SEO', p: 'Crawling, rendering and indexing, Core Web Vitals, canonicals and duplication, sitemaps and robots rules, structured data, internal linking and log-level diagnosis when it is needed.' },
  { icon: '\u{1F4DD}', h4: 'Content &amp; On-Page', p: 'Query-first briefs, pages that answer in the first paragraph, headings shaped like the questions people actually type, and internal links that pass authority where it earns something.' },
  { icon: '\u{1F4CD}', h4: 'Local SEO', p: 'Google Business Profile, consistent UK citations, genuinely distinct service and location pages, review generation, and local links from real organisations.' },
  { icon: '\u{1F517}', h4: 'Off-Page &amp; Digital PR', p: 'Earned citations from content worth referencing, trade bodies, suppliers and UK press. No paid link schemes, ever &mdash; the risk would sit on your domain.' },
  { icon: '\u{1F6D2}', h4: 'E-commerce SEO', p: 'Faceted navigation that does not eat your crawl budget, category and product page structure, product schema, and out-of-stock handling that keeps rankings.' },
  { icon: '\u{1F310}', h4: 'International SEO', p: 'hreflang done properly, market-specific content rather than translation, and the honest call on when a country subfolder is worth the effort.' },
  { icon: '⚛️', h4: 'JavaScript SEO', p: 'For React, Angular and Vue sites where Google is rendering late or not at all: server-side rendering or static generation for anything that must rank.' },
  { icon: '\u{1F504}', h4: 'Migrations &amp; Recovery', p: 'Redesigns, replatforms and domain moves without losing rankings &mdash; full redirect mapping and post-launch verification. Plus diagnosis when traffic has already dropped.' },
], true);

body += L.modulesGrid('aeo-geo', 'AEO &amp; GEO: Being the Answer', 'How to get quoted by ChatGPT, Perplexity and AI Overviews &mdash; the actual method.', 'Both UK agencies ranking above us for &ldquo;SEO services&rdquo; mention AI search in a single line. It is the cheapest, emptiest ground in UK search right now, so here is the whole method rather than a teaser.', [
  { icon: '\u{1F9E9}', h4: 'How an AI Answer Is Assembled', p: 'A model retrieves a handful of sources, extracts the claims that agree, and names the ones it trusts. Your job is to be easy to extract from and hard to contradict &mdash; which is a structural problem before it is a content problem.' },
  { icon: '\u{1F3AF}', h4: 'Answer-First Pages', p: 'The direct answer in the first 60 words, then the detail. Headings phrased as the question. One idea per section. It reads better for humans too, which is why it is not a trick.' },
  { icon: '\u{1F3F7}️', h4: 'Structured Data That Machines Read', p: 'FAQPage on visible questions, Organization and Service on the entity, Article with real authors and dates, Product and Breadcrumb where they apply &mdash; matching the visible text exactly.' },
  { icon: '\u{1F464}', h4: 'A Consistent Entity', p: 'The same name, address, services, author bios and claims everywhere you appear. Models corroborate across sources; inconsistency is what gets you dropped from an answer.' },
  { icon: '\u{1F4CF}', h4: 'Verifiable Specifics', p: 'Figures, dates, named tools, real prices where you publish them. &ldquo;Fast&rdquo; is unquotable; &ldquo;LCP under 2.5 seconds on a mid-range Android&rdquo; is a fact a model can lift and attribute.' },
  { icon: '\u{1F4C8}', h4: 'Measuring AI Visibility', p: 'We track a prompt set every month &mdash; the questions your buyers would actually ask &mdash; and record whether you are named, which competitor is, and what source the model leaned on. That is the reporting line nobody else sends you.' },
], false);

body += L.processRow('timeline', 'The First Twelve Months', 'What actually happens, month by month &mdash; and when you should expect to see it.', [
  { h4: 'Weeks 1&ndash;2 &mdash; Audit', p: 'Technical crawl, Search Console and Analytics review, competitor gap analysis, and a written plan you own. No work committed before you have read it.' },
  { h4: 'Month 1 &mdash; Fix the Foundation', p: 'Indexing, speed, rendering, structured data and internal links. The cheapest wins live here and they show in Search Console within weeks.' },
  { h4: 'Months 2&ndash;3 &mdash; Local &amp; On-Page', p: 'Business Profile, citations and the pages you already almost rank for &mdash; rewritten answer-first and given the internal links they were missing.' },
  { h4: 'Months 4&ndash;6 &mdash; Content &amp; AEO', p: 'New pages for the queries the audit found, structured for answer boxes and AI citation, with the prompt-set tracking running every month.' },
  { h4: 'Months 6&ndash;12 &mdash; Authority', p: 'Earned citations, digital PR and the long-tail library that compounds. This is where competitive head terms start to move, not before.' },
  { h4: 'Every Month &mdash; Report and Argue', p: 'A plain-English report of what changed, what moved and what is next &mdash; and a call where you are welcome to disagree with the plan.' },
]);

body += L.benefitRow('reporting', 'What You Receive Every Month', 'Three things, none of them a 40-page dashboard export.', [
  { icon: '\u{1F4C4}', h4: 'A Written Report in Plain English', p: 'What we changed, what moved in rankings, impressions and clicks, what the AI-prompt tracking showed, what we learned and what happens next. Readable in five minutes by someone who is not a marketer.' },
  { icon: '\u{1F5C2}️', h4: 'The Working Documents', p: 'The audit, the keyword map, the content briefs and the redirect maps &mdash; in your Drive, in your name. If you leave, the strategy leaves with you rather than staying in our tooling.' },
  { icon: '\u{1F4DE}', h4: 'A Call Where You Can Push Back', p: 'The people doing the work explain the reasoning and defend the priorities. When we get it wrong, you hear that from us before you notice it in the numbers.' },
]);

body += L.costGrid('seo-cost', 'What SEO Costs, Honestly', 'Three routes, and what you should actually compare.', 'Neither of the two UK agencies ranking above us for this term publishes a single price &mdash; we checked while writing this page. So rather than invent a number, here is the shape of each option and the questions that matter.', [
  { tag: 'Do it yourself', num: '&pound;100&ndash;&pound;200', sub: 'Per month, tools only, published prices', items: ['Semrush or Ahrefs subscription, and your own hours', 'Fine if someone in-house genuinely has the time and the appetite', 'The tools tell you what; deciding what matters is the hard part', 'No help when the diagnosis is wrong'] },
  { tag: 'TechAuditPros', num: 'Let’s talk', sub: 'Audit first, then one agreed monthly fee', hi: true, items: ['A written audit you own before anything is committed', 'Technical, content, local, off-page, AEO and GEO in one engagement', 'The team that builds and fixes the site also ranks it', 'Monthly report in plain English, and the documents stay yours', 'Month to month &mdash; stop when it stops being worth it'] },
  { tag: 'UK agency retainer', num: 'Not published', sub: 'Hourly, monthly or per project', items: ['Ask who does the work, and how many hours it actually buys', 'Ask whether content and outreach are inside the number', 'Ask what happens in month six if nothing has moved', 'Ask for the audit before the contract, not after'] },
], 'Tool prices are the vendors&rsquo; own published rates as of September 2026. The absence of agency pricing is a finding, not an omission: we read the two highest-ranking UK SEO agency pages for this term on 3 September 2026 and neither shows a figure.', true);

body += L.benefitRow('seo-myths', 'Four Things You Will Be Told That Are Not True', 'The claims that make an SEO pitch sound confident and turn out expensive.', [
  { icon: '\u{1F947}', h4: '&ldquo;We guarantee page one&rdquo;', p: 'Nobody controls Google&rsquo;s index. A guarantee is either about a keyword nobody searches, or about your own brand name, or it is a lie you will pay for.' },
  { icon: '\u{1F4CA}', h4: '&ldquo;More keywords is better&rdquo;', p: 'Five hundred tracked keywords is a reporting decoration. Twenty that a buyer types before spending money is a strategy.' },
  { icon: '\u{1F517}', h4: '&ldquo;We have a network of sites&rdquo;', p: 'That is a paid link scheme with a friendlier name. It lifts for a quarter and the penalty risk stays on your domain, not the agency&rsquo;s.' },
  { icon: '\u{1F480}', h4: '&ldquo;SEO is dead now AI answers everything&rdquo;', p: 'The traffic moved, it did not evaporate &mdash; and AI answers are assembled from indexed pages. Being unrankable and being unquotable are the same problem.' },
]);

body += L.industriesGrid('seo-sectors', 'Where This Work Lands', 'Four kinds of UK business where search is the whole channel.', 'The method is the same; what changes is which of the eight workstreams carries the weight.', [
  { img: 'istock-1128252197-analyst-data-wall-pencil-thinking.jpg', alt: 'Analyst reviewing search performance data', w: 612, h: 344, h4: 'B2B &amp; Professional Services', p: 'Long sales cycles and a handful of high-value queries &mdash; where being the clearest answer beats being the loudest advertiser.' },
  { img: 'istock-1094918638-manager-tablet-evening-office-smile.jpg', alt: 'Local business owner checking enquiries on a tablet', w: 612, h: 392, h4: 'Local &amp; Multi-Site Services', p: 'Trades, clinics and branch networks, where Maps, service-area pages and reviews decide who gets the call.' },
  { img: 'istock-1442543641-india-shop-upi-qr-payment.jpg', alt: 'Customer buying from an online shop on a phone', w: 612, h: 408, h4: 'E-commerce', p: 'Category and product structure, faceted navigation and crawl budget &mdash; the unglamorous work that moves revenue.' },
  { img: 'istock-1332827275-businessman-ai-robot-double-exposure.jpg', alt: 'Business leader considering AI search visibility', w: 612, h: 408, h4: 'SaaS &amp; Technology', p: 'JavaScript rendering, documentation that ranks, and the AI-citation work that decides whether a model recommends you or a rival.' },
], false);

body += L.faqHtml('seo-faq', 'FAQ', 'SEO, AEO and GEO in the UK: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s start with the audit.', 'Takes 60 seconds &middot; the audit is yours to keep &middot; No long-term contract');
s = L.injectExtras(s);

// sanity
L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/seo-services/"'); L.must(s, 'href="/uk/website-development/"');
L.must(s, 'https://techauditpros.com/ca/seo-services/', 1);   // hreflang alternate only
L.must(s, 'Canadian', 0);
L.must(s, '<section class="tap-erp-why-section', 0);
L.must(s, 'Generative Engine Optimisation'); L.must(s, 'Answer Engine Optimisation'); L.must(s, 'Optimisation'); L.must(s, 'optimization', 0);   // UK spelling throughout
L.must(s, 'library/istock', 4);   // 612px files only on the four small sector cards
L.write('uk/seo-services/index.html', s);
