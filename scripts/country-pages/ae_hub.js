'use strict';
// /ae/ — the UAE hub. PLAN-AE §2 (page 1) and §4.1 (the design: "Title Sequence").
//
// DATA (ai_context/data/ae/, ae_read.js, 2026-09-07): 32,989 keywords, 144 winnable at vol>=100 & KD<=40.
//   This page owns the UAE-wide cluster: seo united arab emirates 720/35 · best seo company in uae 390/33 · erp
//   software uae 590/22 · erp solution providers in uae 390/25 · erp system in uae 260/18 · erp software companies in
//   uae 260/16 · ecommerce website development uae 720/24 · website development uae 170/22 · best seo company in uae.
//   AI Overviews sit on 53% of the winnable SERPs — every heading here is answered in its first sentence.
// WHAT RANKS (live, 2026-09-07): seo.ae (~4,500 words, 10 FAQs, AED 900–2,500 tiers, 7 emirates + GCC listed),
//   gear-up.ae (~8,500 words, VAT/CT/PINT-AE/WPS/EOSB, Arabic RTL, WhatsApp x5), digitalgravity.ae (~8,000 words,
//   50+ FAQs, AED 8k–40k / 15k–100k+ published). Parity here: 4,000+ words, 12 FAQs, compliance item by item, AED
//   ranges attributed, the no-office fact said first, WhatsApp CTA.
// POSITIONING: the buyer IS buying a team in another country — a Kochi team a four-hour flight from Dubai on the
//   same working week. The word "offshore" is avoided (owner decision pending; plan assumes avoided). "Audit" is the
//   company name only. No price of ours. No +971 number exists yet — the page says so and uses the WhatsApp we have.
//
// DESIGN — "TITLE SEQUENCE" (owner's brief: open like a Malayalam film — the name, who worked on it, the core idea,
//   over beautiful moving images; the SEO/AEO/GEO content is the story). Nothing borrowed from /in/, /uk/ or /us/.
//   • The hero is replaced by a letterboxed, grain-overlaid, full-viewport title sequence of six cards, auto-
//     advancing (~2.6s each, ~15s total, one shot, JS-driven, skippable by button, key, click or scroll):
//       1 "TechAuditPros presents" — the word PRESENTS assembles from scattered letters (transform only; scatter
//         offsets set in JS)            backdrop: desert ridge
//       2 "a team from Kochi" — caption "a four-hour flight · ninety minutes on the clock · the same working week"
//                                        backdrop: Kochi water, wiped in by clip-path from the right
//       3 "for Dubai · Abu Dhabi · the Emirates" — three names light left to right, a hairline draws between them
//                                        backdrop: Dubai skyline across the water at sunset
//       4 "in three disciplines" — a crew list in credit typography (role left, person right)
//                                        backdrop: Abu Dhabi Corniche
//       5 "written to be quoted" — the AEO card: "53% of these searches are answered by an AI before a click" types
//         in, then the page's own first sentence appears as the first quotable
//                                        backdrop: Dubai at night across the water
//       6 the title card: "United Arab Emirates" + the H1; the letterbox bands slide open and the nav appears
//                                        backdrop: the Burj above the interchange
//     JS off (or reduced motion): only card 6 and its backdrop exist visually — a complete poster with the H1.
//   • Every chapter ("reel") is introduced by a clapperboard slate that snaps shut (top arm rotates on a hinge).
//   • Reel 1 carries two live clocks (Dubai / Kochi) set by JS; static 10:10 / 11:40 without JS.
//   • Reel 4 (compliance) is a sprocket-holed film strip that travels sideways with the scroll (view() timeline,
//     movement only). Reel 5 (cost) is end-credit "with thanks to" cards naming the sources. The FAQ is a credit
//     roll of native <details>. The CTA is "a TechAuditPros production".
//   • Start states only under html.ae-on; overflow-x:clip on every reel; verified with shot/jsoff/overflow at 1440/390.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'ae-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
// the photographs of this page — asserted unique to it
const STOCK = {
  c1: 'ae-dunes-ridge', c2: 'home-kerala-boat-on-water', c3: 'ae-dubai-skyline-sunset-water', c4: 'ae-abu-dhabi-corniche-skyline',
  c5: 'ae-dubai-night-across-water', c6: 'ae-burj-khalifa-interchange',
  seo: 'ae-dubai-towers-by-water', web: 'ae-people-walking-marina', erp: 'ae-cranes-at-sunset',
  strip1: 'ae-spice-souk-baskets', strip2: 'ae-gold-souk-display', strip3: 'ae-abra-on-the-creek',
  cost: 'ae-dunes-blue-sky',
};
const CITY_PAGE = slug => fs.existsSync(path.join(L.REPO, 'ae', slug, 'index.html')) ? '/ae/' + slug + '/' : null;

// ---------------------------------------------------------------------------------------------
// copy
const H1 = 'SEO, Websites and ERP for the UAE, <span>from a team four hours away.</span>';
const ANSWER = 'TechAuditPros provides <strong>SEO with AI-search optimisation, website and e-commerce development, and custom ERP</strong> to businesses in <strong>Dubai, Abu Dhabi and across the United Arab Emirates</strong> from an engineering team in Kochi, India &mdash; a four-hour flight from Dubai, ninety minutes apart on the clock, on the same working week. We have no office in the Emirates and we say so first. What you get instead: a developer who ships the fix rather than a deck that recommends it, a staging URL you can open every week, a written report every month, UAE compliance built in (VAT at 5%, Corporate Tax at 9%, PINT-AE e-invoicing, WPS payroll, EOSB), and a price against a written ninety-day plan rather than a tier name.';

const CREW = [
  ['Search', 'a specialist who reads Search Console every day and writes pages that AI answers quote'],
  ['Websites', 'a developer who ships the fix the week it is found, on a staging URL you can open'],
  ['Systems', 'an engineer who has stood on a shop floor and builds the ERP the storefront reads from'],
];

const STRIP = [
  { k: 'VAT', h: 'VAT at 5%', p: 'FTA-compliant tax invoices, input/output reconciliation, VAT201 filing data from the ledger, designated-zone and reverse-charge handling. Built into the flow, not bolted on.' },
  { photo: 'strip1' },
  { k: 'CT', h: 'Corporate Tax at 9%', p: 'Taxable income above the threshold, the small-business relief election, free-zone qualifying income, transfer-pricing documentation where it applies. The ERP keeps the books that make the return possible.' },
  { k: 'E-INV', h: 'E-invoicing, PINT-AE', p: 'The UAE&rsquo;s Peppol-based PINT-AE format with accredited service providers; Phase 2 mandates from July 2026 per the current Ministry of Finance guidance. Invoices must leave the system already compliant.' },
  { photo: 'strip2' },
  { k: 'WPS', h: 'WPS payroll', p: 'Salaries paid through the Wages Protection System with SIF files generated from payroll, MoHRE portal timing, and the fines that follow a late file avoided by design.' },
  { k: 'EOSB', h: 'Gratuity (EOSB)', p: 'End-of-service benefit accrued monthly under UAE Labour Law, per contract type and tenure, so the liability is a number in the accounts rather than a surprise at resignation.' },
  { photo: 'strip3' },
  { k: 'ZONE', h: 'Free zone or mainland', p: 'JAFZA, DMCC, DIFC, KIZAD, Sharjah free zones: different licensing, VAT designated-zone status, customs and reporting. The system knows which entity it is invoicing from.' },
  { k: 'AR', h: 'Arabic where it counts', p: 'Bilingual invoices and RTL interfaces for the people who use them; English-first search pages, because 99% of the searches in the data are in English.' },
];

const COST = [
  ['AED 900 &ndash; 2,500 a month', 'three SEO tiers published by a Dubai agency that ranks first page for &ldquo;seo company in dubai&rdquo;'],
  ['AED 8,000 &ndash; 40,000 design; AED 15,000 &ndash; 100,000+ development', 'the published website ranges of the largest Dubai web agency on the first page'],
  ['USD 20 &ndash; 99 per user per month', 'the per-user ERP prices a Dubai reseller lists for Odoo, Dynamics 365 and NetSuite'],
  ['&ldquo;60&ndash;70% lower than SAP or Oracle&rdquo;', 'the way a leading UAE ERP vendor prices itself &mdash; against a comparison, not a number'],
];
const DRIVERS = [
  ['How much of the work is engineering', 'A storefront that is slow on Etisalat 4G and half-indexed needs a developer before a writer. Developer hours cost more, and most Dubai SEO tiers assume the site is fine.'],
  ['How contested the shelf is', 'Ranking a clinic in Al Reem and ranking a gold trader across the GCC are different projects sold under one word. Dubai head terms sit at difficulty 50+; Abu Dhabi&rsquo;s at 22.'],
  ['Who ships the changes', 'Recommendations that wait in a developer queue cost you the waiting. Our developer is on the team; the fix ships the week it is found.'],
  ['One discipline or three', 'Search alone; search plus a rebuild; search plus a rebuild plus the ERP the storefront reads from. Sequenced, cheaper and calmer.'],
];

const CHECK = [
  ['Who, by name, does the work?', 'Dubai agencies of 60 and 200 people rank for these searches. Ask which three of them are yours, and whether you will ever speak to them.'],
  ['Can I open the staging site today?', 'Work in progress is visible or it is not happening yet. This is the question that separates the two kinds of supplier in any market.'],
  ['What ships in the first thirty days?', 'A list &mdash; these pages, this fix, this Business Profile in Abu Dhabi &mdash; is a plan. &ldquo;Research and strategy&rdquo; is a delay.'],
  ['Where is my data, and whose name is on the hosting?', 'UAE data-residency expectations are real for some sectors. Ask where the site and the ERP run, and whether the accounts are yours.'],
  ['What do I keep if I stop in month three?', 'Accounts, code, content, reports, the plan. If any stays with the supplier, the quoted AED figure is not the price.'],
  ['Will you tell me when a Dubai agency is the better answer?', 'Sometimes it is: a launch that needs people in the room, a brand that needs a local address on the proposal. Anyone who never says so is selling.'],
];

const FAQS = [
  { q: 'Do you have an office in Dubai or Abu Dhabi?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight from Dubai, ninety minutes apart on the clock, working the same Monday-to-Friday week the UAE moved to in 2022. Clients see a staging URL every week and a written report every month, and we visit for kick-offs and systems projects when it earns the journey. If your project needs people in the room every week, hire in Dubai; we will say so on the first call.' },
  { q: 'What does SEO cost in the UAE?', a: 'Agencies on the first page for these searches publish tiers from AED 900 to AED 2,500 a month, and larger Dubai agencies quote far more for full-service retainers; those are their figures, as published in September 2026. We do not publish a rate card &mdash; the same figure buys different months &mdash; and give you a written plan for the first ninety days with a price against it instead.' },
  { q: 'Which UAE compliance does your ERP handle?', a: 'VAT at 5% with FTA-compliant invoices and VAT201 data; Corporate Tax at 9% including free-zone qualifying income; e-invoicing in the PINT-AE format through accredited service providers, with Phase 2 from July 2026 per current Ministry of Finance guidance; WPS payroll with SIF files; EOSB gratuity accrual; and free-zone versus mainland entity handling. Thresholds and dates move, so the system reads them from configuration and we point you at the FTA and MoHRE for current values.' },
  { q: 'Do you build Arabic or bilingual websites?', a: 'Yes, where the data says your customers search in Arabic. In the UAE exports we work from, 99% of search volume is in English, so pages are English-first; ERP interfaces and invoices are bilingual with proper RTL because the people using them need it.' },
  { q: 'Which emirates do you serve?', a: 'Dubai and Abu Dhabi first, because that is where the search demand is: Abu Dhabi is the softest large cluster in our data (4,400 monthly searches at low difficulty) and Dubai the largest. Sharjah, Ajman, Ras Al Khaimah and Al Ain have almost no measurable search volume for these services, so we serve them without pretending a page for each would help.' },
  { q: 'How does the time difference work?', a: 'The UAE is GMT+4 and India GMT+5:30 &mdash; ninety minutes apart. Your 9 a.m. is our 10:30; your 6 p.m. is our 7:30. The whole UAE working day overlaps ours, and since the UAE moved to a Monday-to-Friday week in 2022 the weekends align too.' },
  { q: 'Do you do local SEO and Google Business Profile in the UAE?', a: 'Yes. For clinics, showrooms and services in Abu Dhabi and Dubai the map results decide the call, and the profile work &mdash; categories, hours, photographs, reviews, Arabic and English service names &mdash; is the first thirty days.' },
  { q: 'What is AEO and why does it matter more in the UAE?', a: 'Answer Engine Optimisation is writing pages so that Google&rsquo;s AI Overviews and engines like ChatGPT and Perplexity quote them. In the UAE data, 53% of the searches we can win already show an AI Overview above the results &mdash; more than half the shelf is answered before a click. Every heading on this page is answered in its first sentence for that reason.' },
  { q: 'Shopify, WooCommerce or custom for a UAE store?', a: 'Shopify to be selling within days with UAE payment gateways; WooCommerce when the business lives in WordPress and wants no platform fee; custom when the catalogue, pricing or stock model is unusual or when the store must read live availability from the ERP. All three need VAT-compliant invoices and a checkout that handles cash-on-delivery, which is still common here.' },
  { q: 'Can you work with our existing Dubai agency or IT company?', a: 'Yes, and often that is the right shape: they keep the relationship and the paid media, we do the engineering half &mdash; the site, the search structure, the system. We work alongside rather than replace, and we do not run Google Ads or social media.' },
  { q: 'How do I know work is happening each month?', a: 'You open the staging URL and see what changed; you read the monthly report against the ninety-day plan; you can ask for the commit history. If a supplier cannot show you the work before it goes live, you are being asked to trust the invoice.' },
  { q: 'What happens if I stop after three months?', a: 'You keep everything: code, accounts, content, reports and the plan. No notice period measured in quarters, no retainer trap. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
];

// ---------------------------------------------------------------------------------------------
// the title sequence
const letters = w => w.split('').map((ch, i) => '<i style="--i:' + i + '">' + ch + '</i>').join('');
const TITLES = [
  '<section class="aet" id="ae-titles" aria-label="Opening titles">',
  '  <a class="aet-skip" href="#ae-story">Skip titles &darr;</a>',
  '  <div class="aet-plates" aria-hidden="true">',
  '    <div class="aet-plate" data-c="1">' + img(STOCK.c1, 'A ridge of sand dunes in the desert', '100vw', 'ae-img', true) + '</div>',
  '    <div class="aet-plate" data-c="2">' + img(STOCK.c2, 'A boat on still water in Kerala', '100vw') + '</div>',
  '    <div class="aet-plate" data-c="3">' + img(STOCK.c3, 'The Dubai skyline across the water at sunset', '100vw') + '</div>',
  '    <div class="aet-plate" data-c="4">' + img(STOCK.c4, 'The Abu Dhabi skyline over the Corniche', '100vw') + '</div>',
  '    <div class="aet-plate" data-c="5">' + img(STOCK.c5, 'Dubai at night from across the water', '100vw') + '</div>',
  '    <div class="aet-plate on" data-c="6">' + img(STOCK.c6, 'The Burj Khalifa above a multi-level highway interchange in Dubai', '100vw', 'ae-img', true) + '</div>',
  '    <div class="aet-grain"></div>',
  '  </div>',
  '  <div class="aet-band top" aria-hidden="true"></div><div class="aet-band bottom" aria-hidden="true"></div>',
  '  <ol class="aet-cards">',
  '    <li class="aet-card" data-c="1"><span class="aet-small">TechAuditPros</span><b class="aet-word">' + letters('presents') + '</b></li>',
  '    <li class="aet-card" data-c="2"><b class="aet-line">a team from Kochi</b><span class="aet-cap">a four-hour flight &middot; ninety minutes on the clock &middot; the same working week</span></li>',
  '    <li class="aet-card" data-c="3"><span class="aet-small">for</span><b class="aet-cities"><span>Dubai</span><i></i><span>Abu Dhabi</span><i></i><span>the Emirates</span></b></li>',
  '    <li class="aet-card" data-c="4"><span class="aet-small">in three disciplines</span><dl class="aet-crew">' + CREW.map(([r, n], i) => '<div style="--d:' + i + '"><dt>' + r + '</dt><dd>' + n + '</dd></div>').join('') + '</dl></li>',
  '    <li class="aet-card" data-c="5"><span class="aet-small">written to be quoted</span><b class="aet-type">53% of the searches on this shelf are answered by an AI before anyone clicks.</b><span class="aet-cap quote">So every heading on this page is answered in its first sentence.</span></li>',
  '    <li class="aet-card on" data-c="6"><span class="aet-small">TechAuditPros &middot; Kochi &middot; for the</span><b class="aet-title">United Arab Emirates</b><h1 class="aet-h1">' + H1 + '</h1><p class="aet-sub">No office in the Emirates. A staging URL every week, a written report every month, UAE compliance built in, and a price against a plan &mdash; not a tier.</p><div class="aet-ctas"><a class="ae-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="ae-btn ghost" href="#ae-story">Read the story &darr;</a></div><ul class="aet-facts"><li><b>250+</b> projects</li><li><b>128+</b> active clients</li><li><b>16</b> countries</li><li><b>4.9/5</b> rating</li></ul></li>',
  '  </ol>',
  '  <div class="aet-progress" aria-hidden="true">' + [1, 2, 3, 4, 5, 6].map(i => '<i data-c="' + i + '"></i>').join('') + '</div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
// the reels
const slate = (n, label) => '      <div class="aer-slate" aria-hidden="true"><div class="arm"></div><div class="body"><span class="n">Reel ' + n + '</span><span class="l">' + label + '</span></div></div>';
const head = (title, lede) => '      <h2 class="aer-h2">' + title + '</h2>' + (lede ? '\n      <p class="aer-lede">' + lede + '</p>' : '');

const REEL1 = [
  '<section class="aer dark" id="ae-story" aria-label="Where we are and are not">',
  '  <div class="container">',
  slate(1, 'Where we are, and are not'),
  head('We are not in Dubai. Here is exactly how far away we are, and what that buys you.', 'Every page that ranks for these searches has a Dubai address, a +971 number and a wall of logos. We have none of those, and this page starts by saying so, because most of them will not tell you what they lack. What a team in Kochi gives a UAE business instead is measurable: a four-hour flight, ninety minutes on the clock, the same Monday-to-Friday week, and a cost base that lets you buy engineering rather than an account manager.'),
  '    <div class="aer-clocks" aria-label="Local time in Dubai and Kochi">',
  '      <div class="clk" data-tz="Asia/Dubai" data-h="10" data-m="10"><div class="face"><i class="h"></i><i class="m"></i><i class="c"></i></div><b>Dubai</b><span>GMT+4</span></div>',
  '      <div class="gap"><b>1h 30m</b><span>apart on the clock</span><b>4h</b><span>by air, COK&rarr;DXB</span><b>Mon&ndash;Fri</b><span>the same week since 2022</span></div>',
  '      <div class="clk" data-tz="Asia/Kolkata" data-h="11" data-m="40"><div class="face"><i class="h"></i><i class="m"></i><i class="c"></i></div><b>Kochi</b><span>GMT+5:30</span></div>',
  '    </div>',
  '    <div class="aer-two">',
  '      <div><h3>What you do not get</h3><ul class="aer-list"><li>An office in Dubai or Abu Dhabi, or a meeting room to walk into.</li><li>A UAE phone number. Until we have one, this page uses the WhatsApp we have and says so.</li><li>A wall of GCC logos. Our delivered work is mostly for clients in the United States, Canada, the United Kingdom and India, with Gulf clients among the sixteen countries served.</li></ul></div>',
  '      <div><h3>What you get instead</h3><ul class="aer-list"><li>A staging URL you can open every week to see what changed, and a written report every month against a ninety-day plan.</li><li>A developer on the same call as the search specialist, so a title tag, a redirect or a template fix ships the same week.</li><li>UAE compliance built into the system rather than sold as a localisation partner.</li><li>Everything yours from day one: code, accounts, content, reports.</li></ul></div>',
  '    </div>',
  '    <p class="aer-p on-dark">When a Dubai agency is the better answer: a launch that needs people in the room every week, a brand that needs a local address on the proposal, a project where the paid media is the point. Several good ones rank for these searches. Come to us when what you want to see is the work.</p>',
  '  </div>',
  '</section>',
].join('\n');

const ABU = CITY_PAGE('abu-dhabi'), DXB = CITY_PAGE('dubai');
const REEL2 = [
  '<section class="aer" id="ae-emirates" aria-label="The Emirates, one by one">',
  '  <div class="container">',
  slate(2, 'The Emirates, one by one'),
  head('Abu Dhabi first, Dubai second, and an honest word about the rest.', 'We planned these pages from 32,989 UAE search terms, and the demand is not where the billboards are. This is what the data says about each emirate and what a business there tends to need first.'),
  '    <div class="aer-em">',
  '      <article class="em" style="--d:0"><span class="k">Abu Dhabi</span><h3>The softest large market in our data.</h3><p>&ldquo;SEO services Abu Dhabi&rdquo; is searched 4,400 times a month at a difficulty of 22; the consultant and agency terms beside it are lower still. The pages ranking for it are small local agencies with thin content. For a clinic on Al Reem, a school in Khalifa City or a contractor in Mussafah, local search and a fast site are the first thirty days.</p>' + (ABU ? '<a class="aer-link" href="' + ABU + '">Abu Dhabi page &rarr;</a>' : '<span class="aer-link soon">Abu Dhabi page &mdash; next</span>') + '</article>',
  '      <article class="em" style="--d:1"><span class="k">Dubai</span><h3>The largest market, and the hardest head terms.</h3><p>&ldquo;SEO agency Dubai&rdquo; is searched 8,100 times a month at a difficulty above 50, owned by agencies of sixty to two hundred people. What is winnable now is the tail: e-commerce development (1,600 a month at 22), local SEO packages, ERP for trading and distribution. Dubai runs on trade, and trade runs on stock that the storefront gets wrong.</p>' + (DXB ? '<a class="aer-link" href="' + DXB + '">Dubai page &rarr;</a>' : '<span class="aer-link soon">Dubai page &mdash; next</span>') + '</article>',
  '      <article class="em" style="--d:2"><span class="k">Sharjah, Ajman, RAK, Al Ain</span><h3>Served, not paged.</h3><p>Between them these emirates show almost no measurable search for these services &mdash; &ldquo;SEO services in Sharjah&rdquo; is 70 searches a month. We work with businesses there exactly as we do in Dubai; we do not build a page per emirate to pretend otherwise, because a page nobody searches for helps nobody.</p><span class="aer-link soon">No page, on purpose</span></article>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const REEL3 = [
  '<section class="aer dark" id="ae-crew" aria-label="Three disciplines, one crew">',
  '  <div class="container">',
  slate(3, 'Three disciplines, one crew'),
  head('What a UAE business usually buys from three suppliers, run by one crew.', 'A Dubai agency for search, a web company for the site, an ERP vendor for the system, and three invoices that blame each other. We run all three with one team, which is the only reason the storefront can show the stock the ERP actually holds and the search work can point at pages built to load on a phone in a taxi on Sheikh Zayed Road.'),
  '    <div class="aer-crew">',
  '      <article class="cr" style="--d:0"><figure>' + img(STOCK.seo, 'High-rise towers beside the water in Dubai', '(max-width:860px) 100vw, 30vw') + '</figure><span class="k">01 &middot; Search</span><h3>SEO, AEO &amp; GEO</h3><p>Technical fixes, local visibility in Abu Dhabi and Dubai, content written from real UAE search data &mdash; and the structure that gets a page quoted by Google&rsquo;s AI Overviews, ChatGPT and Perplexity, which already answer more than half of the searches we can win here.</p><a class="aer-link" href="/us/seo-services/">How the search work runs &rarr;</a></article>',
  '      <article class="cr" style="--d:1"><figure>' + img(STOCK.web, 'People walking near the high-rises of Dubai Marina', '(max-width:860px) 100vw, 30vw') + '</figure><span class="k">02 &middot; Websites</span><h3>Website &amp; e-commerce development</h3><p>Next.js, WordPress, Shopify or WooCommerce &mdash; chosen for the business, not the developer &mdash; fast on Etisalat and du mobile data, VAT-compliant at checkout, cash-on-delivery handled, and delivered in your own repository with a staging URL from week one.</p><a class="aer-link" href="/us/website-development/">How the builds run &rarr;</a></article>',
  '      <article class="cr" style="--d:2"><figure>' + img(STOCK.erp, 'Construction cranes and buildings at sunset', '(max-width:860px) 100vw, 30vw') + '</figure><span class="k">03 &middot; Systems</span><h3>Custom ERP for the UAE</h3><p>Stock, orders, purchasing, projects and payroll in one system of record with VAT, Corporate Tax, PINT-AE e-invoicing, WPS and EOSB built in &mdash; for trading, construction, automotive and distribution businesses that have outgrown Tally, Zoho or a spreadsheet.</p><a class="aer-link" href="/us/erp/">How the systems run &rarr;</a></article>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const REEL4 = [
  '<section class="aer alt" id="ae-compliance" aria-label="The compliance layer">',
  '  <div class="container">',
  slate(4, 'The compliance layer'),
  head('Nine things a UAE system has to get right, in one strip.', 'The ERP pages ranking here list these as features. We treat them as the floor. Figures and dates are as published by the FTA and the Ministry of Finance in September 2026; the system reads them from configuration so they can change without a developer.'),
  '  </div>',
  '  <div class="aer-stripwrap">',
  '    <div class="aer-strip" aria-label="UAE compliance items">',
  ...STRIP.map((f, i) => f.photo
    ? '      <figure class="fr photo" style="--d:' + i + '">' + img(STOCK[f.photo], ({ strip1: 'Spices in baskets at the Dubai spice souk', strip2: 'Gold jewellery displayed in the Dubai gold souk', strip3: 'A wooden abra on Dubai Creek' })[f.photo], '(max-width:860px) 80vw, 30vw') + '</figure>'
    : '      <div class="fr" style="--d:' + i + '"><span class="k">' + f.k + '</span><h3>' + f.h + '</h3><p>' + f.p + '</p></div>'),
  '    </div>',
  '  </div>',
  '  <div class="container"><p class="aer-p">Ask any vendor, product or custom, to show one invoice go from despatch to PINT-AE submission to the ledger in a demo, with your data. Products that need a &ldquo;localisation partner&rdquo; for this are not UAE-ready, whatever the list says.</p></div>',
  '</section>',
].join('\n');

const REEL5 = [
  '<section class="aer dark" id="ae-cost" aria-label="What it costs">',
  '  <div class="container aer-two wide">',
  '    <div>',
  slate(5, 'What it costs'),
  head('What SEO, websites and ERP cost in the UAE, with thanks to the people who publish a price.', 'We read the first page of Google for these searches so you do not have to. The figures below are theirs, as published in September 2026. Ours comes after a written plan, not before it.'),
  '      <div class="aer-drivers">' + DRIVERS.map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '      <p class="aer-p on-dark">What we publish instead of a rate card: a written plan for the first ninety days, what you will have at the end of it, and what you keep if you stop. Put it beside any AED figure above and the price will explain itself.</p>',
  '    </div>',
  '    <div>',
  '      <figure class="aer-plate">' + img(STOCK.cost, 'Sand dunes under a deep blue sky', '(max-width:860px) 100vw, 46vw') + '</figure>',
  '      <ol class="aer-thanks" aria-label="Published UAE prices, attributed">' + COST.map(([p, by], i) => '<li style="--d:' + i + '"><span class="wt">with thanks to</span><b>' + p + '</b><span>' + by + '</span></li>').join('') + '</ol>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const REEL6 = [
  '<section class="aer" id="ae-check" aria-label="Before you hire anyone">',
  '  <div class="container">',
  slate(6, 'Before you hire anyone'),
  head('Six questions for any supplier in the Emirates &mdash; including one four hours away.', 'Take these into every meeting in Dubai or Abu Dhabi. They separate the people who do the work from the people who sell it, and they apply to us word for word.'),
  '    <ol class="aer-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '  </div>',
  '</section>',
].join('\n');

const CREDITS = [
  '<section class="aer credits" id="ae-faq" aria-label="Frequently asked questions">',
  '  <div class="container">',
  '    <div class="aer-roll" aria-hidden="true"><span>End credits</span><span>Twelve questions UAE businesses ask</span><span>Answered in the first sentence</span></div>',
  '    <h2 class="aer-h2 on-dark">Questions from Dubai and Abu Dhabi, answered straight.</h2>',
  '    <div class="aer-faq">' + FAQS.map((f, i) => '<details style="--d:' + i + '"' + (i === 0 ? ' open' : '') + '><summary><span class="n">' + String(i + 1).padStart(2, '0') + '</span><span>' + f.q + '</span><i></i></summary><p>' + f.a + '</p></details>').join('') + '</div>',
  '  </div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_hub.js : "Title Sequence" ================= */
  :root{ --ae-black:#06090F; --ae-paper:#F4F1EA; }
  .ae-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .ae-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .ae-btn:hover{ background:var(--orange-dark); }
  .ae-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }

  /* ---- the titles ---- */
  .aet{ position:relative; min-height:100svh; background:var(--ae-black); color:#fff; overflow:hidden; display:grid; place-items:center; }
  .aet-plates{ position:absolute; inset:0; }
  .aet-plate{ position:absolute; inset:0; clip-path:inset(0 0 0 100%); }
  .aet-plate.on{ clip-path:inset(0); }
  .aet-plate::after{ content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 60%, rgba(6,9,15,.25) 0%, rgba(6,9,15,.78) 100%); }
  .aet-plate .ae-img{ transform:scale(1.04); }
  .aet-grain{ position:absolute; inset:-50%; width:200%; height:200%; opacity:.055; pointer-events:none; mix-blend-mode:screen;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>"); }
  .aet-band{ position:absolute; left:0; right:0; height:11vh; background:#000; z-index:5; }
  .aet-band.top{ top:0; } .aet-band.bottom{ bottom:0; }
  .aet-skip{ position:absolute; z-index:9; right:clamp(14px,3vw,40px); top:calc(11vh + 14px); font-family:var(--font-mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.7); text-decoration:none; border:1px solid rgba(255,255,255,.25); padding:8px 12px; border-radius:6px; }
  .aet-skip:hover{ color:#fff; border-color:#fff; }
  .aet-cards{ position:relative; z-index:6; list-style:none; margin:0; padding:0; width:min(1100px,92vw); min-height:60svh; display:grid; }
  .aet-card{ grid-area:1 / 1; display:none; text-align:center; align-self:center; }
  .aet-card.on{ display:block; }
  .aet-small{ display:block; font-family:var(--font-mono); font-size:clamp(.72rem,1vw,.9rem); letter-spacing:.34em; text-transform:uppercase; color:rgba(255,255,255,.72); margin-bottom:18px; }
  .aet-word{ display:block; font-family:var(--font-sans); font-weight:800; font-size:clamp(3rem,9vw,8.5rem); letter-spacing:.22em; text-transform:uppercase; line-height:1; }
  .aet-word i{ display:inline-block; font-style:normal; }
  .aet-line{ display:block; font-weight:700; font-size:clamp(2.2rem,6vw,5.6rem); letter-spacing:-.01em; line-height:1.02; }
  .aet-cap{ display:block; margin-top:18px; font-family:var(--font-mono); font-size:clamp(.78rem,1.1vw,1rem); letter-spacing:.12em; color:rgba(255,255,255,.75); }
  .aet-cap.quote{ letter-spacing:.02em; text-transform:none; font-family:var(--font-sans); font-size:clamp(1rem,1.6vw,1.4rem); color:#fff; max-width:60ch; margin:22px auto 0; }
  .aet-cities{ display:flex; align-items:center; justify-content:center; gap:clamp(12px,2vw,28px); flex-wrap:wrap; font-weight:800; font-size:clamp(1.5rem,3.6vw,3.4rem); letter-spacing:-.01em; white-space:nowrap; }
  .aet-cities i{ display:block; width:clamp(30px,6vw,120px); height:2px; background:var(--orange); transform-origin:left center; }
  .aet-crew{ margin:0 auto; width:min(760px,100%); text-align:left; }
  .aet-crew > div{ display:grid; grid-template-columns:1fr 2fr; gap:18px; padding:14px 0; border-bottom:1px solid rgba(255,255,255,.14); }
  .aet-crew dt{ font-family:var(--font-mono); font-size:clamp(.85rem,1.3vw,1.05rem); font-weight:700; letter-spacing:.24em; text-transform:uppercase; color:#fff; text-align:right; text-shadow:0 2px 12px rgba(0,0,0,.8); }
  .aet-crew dt::before{ content:''; display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--orange); margin-right:10px; vertical-align:middle; }
  .aet-crew dd{ text-shadow:0 2px 12px rgba(0,0,0,.8); }
  .aet-crew dd{ margin:0; font-size:clamp(1rem,1.6vw,1.35rem); line-height:1.4; color:#fff; }
  .aet-type{ display:block; font-weight:700; font-size:clamp(1.5rem,3.6vw,3.2rem); line-height:1.15; max-width:24ch; margin:0 auto; }
  .aet-title{ display:block; font-weight:800; font-size:clamp(2rem,6.4vw,6rem); letter-spacing:.04em; text-transform:uppercase; line-height:1; margin-bottom:22px; }
  .aet-h1{ font-size:clamp(1.3rem,2.6vw,2.2rem); line-height:1.2; font-weight:600; color:#fff; margin:0 auto 14px; max-width:34ch; }
  .aet-h1 span{ color:var(--orange); }
  .aet-sub{ margin:0 auto 20px; max-width:64ch; color:rgba(255,255,255,.8); font-size:clamp(.95rem,1.2vw,1.1rem); line-height:1.6; }
  .aet-ctas{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:18px; }
  .aet-facts{ list-style:none; margin:0; padding:0; display:flex; justify-content:center; gap:clamp(14px,3vw,40px); flex-wrap:wrap; font-family:var(--font-mono); font-size:.74rem; letter-spacing:.08em; color:rgba(255,255,255,.65); }
  .aet-facts b{ color:#fff; margin-right:6px; }
  .aet-progress{ position:absolute; z-index:7; left:50%; transform:translateX(-50%); bottom:calc(11vh + 16px); display:flex; gap:8px; }
  .aet-progress i{ width:28px; height:2px; background:rgba(255,255,255,.25); }
  .aet-progress i.on{ background:var(--orange); }
  @media (max-width:860px){ .aet-band{ height:7vh; } .aet-skip{ top:calc(7vh + 10px); } .aet-progress{ bottom:calc(7vh + 12px); } .aet-crew > div{ grid-template-columns:1fr; gap:4px; } .aet-crew dt{ text-align:left; } .aet-cards{ min-height:74svh; } }

  /* ---- the reels ---- */
  .aer{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:var(--ae-paper); }
  .aer.dark{ background:var(--ae-black); color:#fff; }
  .aer.alt{ background:#fff; }
  .aer-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); max-width:26ch; }
  .aer.dark .aer-h2, .aer-h2.on-dark{ color:#fff; }
  .aer-lede, .aer-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; }
  .aer.dark .aer-lede, .aer-p.on-dark{ color:rgba(255,255,255,.8); }
  .aer-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; }
  @media (min-width:860px){ .aer-two{ grid-template-columns:1fr 1fr; } .aer-two.wide{ grid-template-columns:6fr 6fr; } }
  .aer h3{ margin:0 0 8px; font-size:1.1rem; }
  .aer-list{ margin:0; padding:0 0 0 18px; line-height:1.6; color:var(--ink-soft); }
  .aer.dark .aer-list{ color:rgba(255,255,255,.82); }
  .aer-list li{ margin-bottom:8px; }
  .aer-link{ display:inline-block; margin-top:12px; color:var(--orange); font-weight:700; text-decoration:none; }
  .aer-link.soon{ color:var(--ink-faint); font-weight:500; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.06em; }
  /* the slate */
  .aer-slate{ position:relative; width:min(340px,80vw); height:78px; margin:0 0 26px; }
  .aer-slate .body{ position:absolute; left:0; right:0; bottom:0; height:52px; background:#111; color:#fff; border-radius:0 0 8px 8px; display:flex; align-items:center; gap:14px; padding:0 16px; font-family:var(--font-mono); }
  .aer-slate .body .n{ color:var(--orange); letter-spacing:.14em; text-transform:uppercase; font-size:.72rem; }
  .aer-slate .body .l{ font-size:.86rem; letter-spacing:.02em; }
  .aer-slate .arm{ position:absolute; left:0; right:0; top:8px; height:18px; border-radius:6px 6px 0 0; transform-origin:left bottom;
    background:repeating-linear-gradient(-45deg, #111 0 14px, #F4F1EA 14px 28px); }
  .aer.dark .aer-slate .body{ background:#fff; color:#111; } .aer.dark .aer-slate .body .n{ color:var(--orange-dark); }
  /* reel 1 clocks */
  .aer-clocks{ display:grid; grid-template-columns:1fr; gap:22px; align-items:center; margin:clamp(22px,3vw,40px) 0; }
  @media (min-width:760px){ .aer-clocks{ grid-template-columns:1fr 1fr 1fr; } }
  .clk{ text-align:center; }
  .clk .face{ position:relative; width:150px; height:150px; margin:0 auto 12px; border-radius:50%; border:2px solid rgba(255,255,255,.35); background:radial-gradient(circle, rgba(255,255,255,.06), rgba(255,255,255,0) 70%); }
  .clk .face i{ position:absolute; left:50%; bottom:50%; transform-origin:50% 100%; border-radius:2px; background:#fff; }
  .clk .face .h{ width:4px; height:40px; margin-left:-2px; transform:rotate(var(--h,300deg)); }
  .clk .face .m{ width:2px; height:58px; margin-left:-1px; background:var(--orange); transform:rotate(var(--m,60deg)); }
  .clk .face .c{ width:8px; height:8px; margin-left:-4px; bottom:calc(50% - 4px); border-radius:50%; }
  .clk b{ display:block; font-size:1.2rem; } .clk span{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.14em; color:rgba(255,255,255,.6); }
  .aer-clocks .gap{ text-align:center; display:grid; gap:2px; }
  .aer-clocks .gap b{ font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); margin-top:8px; } .aer-clocks .gap span{ font-size:.82rem; color:rgba(255,255,255,.7); }
  /* reel 2 */
  .aer-em{ display:grid; grid-template-columns:1fr; gap:16px; }
  @media (min-width:860px){ .aer-em{ grid-template-columns:repeat(3,1fr); } }
  .em{ background:#fff; border:1px solid var(--line); border-radius:14px; padding:22px; }
  .em .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); }
  .em h3{ margin:8px 0 10px; font-size:1.2rem; color:var(--ink); } .em p{ margin:0; color:var(--ink-soft); line-height:1.6; font-size:.95rem; }
  /* reel 3 */
  .aer-crew{ display:grid; grid-template-columns:1fr; gap:18px; }
  @media (min-width:860px){ .aer-crew{ grid-template-columns:repeat(3,1fr); } }
  .cr figure{ margin:0 0 14px; aspect-ratio:4/3; overflow:hidden; border-radius:12px; }
  .cr .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); }
  .cr h3{ margin:8px 0 8px; color:#fff; font-size:1.2rem; } .cr p{ margin:0; color:rgba(255,255,255,.78); line-height:1.6; font-size:.95rem; }
  /* reel 4 strip */
  .aer-stripwrap{ overflow:hidden; padding:8px 0 20px; }
  .aer-strip{ display:flex; gap:14px; width:max-content; padding:26px 0; position:relative;
    background:linear-gradient(#111,#111) top/100% 22px no-repeat, linear-gradient(#111,#111) bottom/100% 22px no-repeat; }
  .aer-strip::before, .aer-strip::after{ content:''; position:absolute; left:0; right:0; height:22px; background:radial-gradient(circle at 12px 11px, var(--ae-paper) 5px, transparent 6px) 0 0/34px 22px repeat-x; }
  .aer-strip::before{ top:0; } .aer-strip::after{ bottom:0; }
  .aer-strip .fr{ width:300px; flex:none; background:#111; color:#fff; padding:18px; border-radius:4px; }
  .aer-strip .fr.photo{ padding:0; margin:0; overflow:hidden; }
  .aer-strip .fr .k{ font-family:var(--font-mono); color:var(--orange); letter-spacing:.2em; font-size:.68rem; } .aer-strip .fr h3{ margin:6px 0 8px; font-size:1.05rem; color:#fff; } .aer-strip .fr p{ margin:0; font-size:.86rem; line-height:1.5; color:rgba(255,255,255,.78); }
  @media (max-width:560px){ .aer-strip .fr{ width:240px; } }
  /* reel 5 */
  .aer-drivers{ display:grid; gap:14px; margin:8px 0 18px; }
  .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; }
  .drv h3{ margin:0; font-size:1.02rem; color:#fff; } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:rgba(255,255,255,.72); }
  .aer-plate{ margin:0 0 16px; aspect-ratio:16/9; overflow:hidden; border-radius:12px; }
  .aer-thanks{ list-style:none; margin:0; padding:0; }
  .aer-thanks li{ padding:14px 0; border-top:1px solid rgba(255,255,255,.16); display:grid; gap:4px; text-align:center; }
  .aer-thanks .wt{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.5); }
  .aer-thanks b{ font-size:1.15rem; color:#fff; } .aer-thanks span{ font-size:.84rem; color:rgba(255,255,255,.7); }
  /* reel 6 */
  .aer-qs{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr; gap:6px 32px; }
  @media (min-width:760px){ .aer-qs{ grid-template-columns:1fr 1fr; } }
  .aer-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; border-bottom:1px solid var(--line); }
  .aer-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; } .aer-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); } .aer-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  /* credits */
  .aer.credits{ background:var(--ae-black); color:#fff; }
  .aer-roll{ display:flex; gap:22px; flex-wrap:wrap; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.5); margin-bottom:22px; }
  .aer-faq details{ border-top:1px solid rgba(255,255,255,.16); }
  .aer-faq details:last-child{ border-bottom:1px solid rgba(255,255,255,.16); }
  .aer-faq summary{ list-style:none; cursor:pointer; display:grid; grid-template-columns:40px 1fr 24px; gap:12px; align-items:center; padding:16px 0; font-weight:600; font-size:1.02rem; color:#fff; }
  .aer-faq summary::-webkit-details-marker{ display:none; }
  .aer-faq summary .n{ font-family:var(--font-mono); color:var(--orange); }
  .aer-faq summary i{ width:18px; height:18px; position:relative; } .aer-faq summary i::before, .aer-faq summary i::after{ content:''; position:absolute; left:0; top:8px; width:18px; height:2px; background:#fff; } .aer-faq summary i::after{ transform:rotate(90deg); }
  .aer-faq details[open] summary i::after{ transform:none; }
  .aer-faq p{ margin:0 0 18px 52px; color:rgba(255,255,255,.8); line-height:1.65; max-width:70ch; }
  @media (max-width:560px){ .aer-faq p{ margin-left:0; } }

  /* ================= motion : start states only under html.ae-on ================= */
  html.ae-on .aet-card{ display:block; opacity:0; pointer-events:none; }
  html.ae-on .aet-card.on{ opacity:1; pointer-events:auto; transition:opacity .5s linear; }
  html.ae-on .aet-card.off{ opacity:0; transition:opacity .45s linear; }
  html.ae-on .aet-plate{ transition:clip-path 1.1s cubic-bezier(.7,0,.2,1); }
  html.ae-on .aet-plate .ae-img{ transition:transform 9s linear; }
  html.ae-on .aet-plate.on .ae-img{ transform:scale(1.12); }
  html.ae-on .aet-plate.on.still .ae-img{ transform:scale(1.04); transition:none; }
  html.ae-on .aet-word i{ transform:translate(var(--x,0px),var(--y,0px)) rotate(var(--r,0deg)); opacity:0; }
  html.ae-on .aet-card.on .aet-word i{ transform:none; opacity:1; transition:transform 1.1s cubic-bezier(.2,.8,.2,1) calc(.15s + var(--i) * .07s), opacity .4s linear calc(.15s + var(--i) * .07s); }
  html.ae-on .aet-cities span{ opacity:.2; } html.ae-on .aet-cities i{ transform:scaleX(0); }
  html.ae-on .aet-card.on .aet-cities span:nth-child(1){ opacity:1; transition:opacity .4s linear .2s; }
  html.ae-on .aet-card.on .aet-cities i:nth-child(2){ transform:none; transition:transform .5s cubic-bezier(.3,0,.2,1) .6s; }
  html.ae-on .aet-card.on .aet-cities span:nth-child(3){ opacity:1; transition:opacity .4s linear 1s; }
  html.ae-on .aet-card.on .aet-cities i:nth-child(4){ transform:none; transition:transform .5s cubic-bezier(.3,0,.2,1) 1.3s; }
  html.ae-on .aet-card.on .aet-cities span:nth-child(5){ opacity:1; transition:opacity .4s linear 1.7s; }
  html.ae-on .aet-crew > div{ opacity:0; transform:translateX(calc(-30px + var(--d) * 30px)); }
  html.ae-on .aet-card.on .aet-crew > div{ opacity:1; transform:none; transition:opacity .5s linear calc(.2s + var(--d) * .35s), transform .7s cubic-bezier(.2,.8,.2,1) calc(.2s + var(--d) * .35s); }
  html.ae-on .aet-type{ clip-path:inset(0 100% 0 0); } html.ae-on .aet-card.on .aet-type{ clip-path:inset(0); transition:clip-path 1.6s steps(44) .2s; }
  html.ae-on .aet-cap.quote{ opacity:0; } html.ae-on .aet-card.on .aet-cap.quote{ opacity:1; transition:opacity .6s linear 2s; }
  html.ae-on .aet-title{ transform:scale(1.08); } html.ae-on .aet-card.on .aet-title{ transform:none; transition:transform 1.4s cubic-bezier(.2,.8,.2,1); }
  html.ae-on .aet-band{ transition:transform 1.2s cubic-bezier(.7,0,.2,1) .3s; }
  html.ae-on .aet.open .aet-band.top{ transform:translateY(-100%); } html.ae-on .aet.open .aet-band.bottom{ transform:translateY(100%); }
  html.ae-on .aet.open .aet-skip, html.ae-on .aet.open .aet-progress{ opacity:0; transition:opacity .4s linear; pointer-events:none; }
  html.ae-on .aet-skip, html.ae-on .aet-progress{ opacity:1; }
  /* nav hidden until the titles end */
  html.ae-on.ae-titles-running .site-header{ transform:translateY(-100%); transition:transform .4s ease; }
  /* reels */
  html.ae-on .aer-slate .arm{ transform:rotate(-16deg); }
  html.ae-on .aer-slate.lit .arm{ animation:aeSnap .5s cubic-bezier(.6,0,.9,.3) forwards; }
  @keyframes aeSnap{ to{ transform:rotate(0); } }
  html.ae-on .aer-slate .body{ opacity:0; transform:translateY(8px); } html.ae-on .aer-slate.lit .body{ animation:aeIn .4s ease .35s forwards; }
  @keyframes aeIn{ to{ opacity:1; transform:none; } }
  html.ae-on .aer-h2, html.ae-on .aer-lede{ opacity:0; transform:translateY(12px); }
  html.ae-on .lit ~ .aer-h2, html.ae-on .lit ~ .aer-lede, html.ae-on .aer-h2.lit, html.ae-on .aer-lede.lit{ animation:aeIn .6s cubic-bezier(.2,.7,.2,1) forwards; }
  html.ae-on .aer-lede.lit{ animation-delay:.15s; }
  html.ae-on .clk .face i{ transform:rotate(0deg); } html.ae-on .aer-clocks.lit .clk .face .h{ transform:rotate(var(--h)); transition:transform 1.6s cubic-bezier(.2,.8,.2,1) .2s; } html.ae-on .aer-clocks.lit .clk .face .m{ transform:rotate(var(--m)); transition:transform 1.6s cubic-bezier(.2,.8,.2,1) .2s; }
  html.ae-on .aer-clocks .gap b, html.ae-on .aer-clocks .gap span{ opacity:0; } html.ae-on .aer-clocks.lit .gap b, html.ae-on .aer-clocks.lit .gap span{ opacity:1; transition:opacity .5s linear 1.4s; }
  html.ae-on .aer-two > div{ opacity:0; transform:translateY(16px); } html.ae-on .aer-two.lit > div{ animation:aeIn .6s ease forwards; } html.ae-on .aer-two.lit > div:nth-child(2){ animation-delay:.15s; }
  html.ae-on .em{ opacity:0; transform:translateY(24px) rotate(calc(-1deg + var(--d) * 1deg)); } html.ae-on .aer-em.lit .em{ animation:aeIn .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.ae-on .cr{ opacity:0; transform:translateY(20px); } html.ae-on .aer-crew.lit .cr{ animation:aeIn .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.ae-on .cr figure .ae-img{ clip-path:inset(0 0 100% 0); } html.ae-on .aer-crew.lit .cr figure .ae-img{ animation:aeDrop .8s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(.2s + var(--d) * .14s); }
  @keyframes aeDrop{ to{ clip-path:inset(0); } }
  @supports (animation-timeline: view()){ html.ae-on .aer-strip{ animation:aeSlide linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; } @keyframes aeSlide{ from{ transform:translateX(6vw); } to{ transform:translateX(calc(-100% + 100vw - 6vw)); } } }
  html.ae-on .aer-thanks li{ opacity:0; transform:translateY(14px); } html.ae-on .aer-thanks.lit li{ animation:aeIn .6s ease forwards; animation-delay:calc(var(--d) * .22s); }
  html.ae-on .drv{ opacity:0; transform:translateY(14px); } html.ae-on .aer-drivers.lit .drv{ animation:aeIn .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.ae-on .aer-plate .ae-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.ae-on .aer-plate.lit .ae-img{ transform:none; }
  html.ae-on .aer-qs li{ opacity:0; transform:translateX(-10px); } html.ae-on .aer-qs.lit li{ animation:aeIn .5s ease forwards; animation-delay:calc(var(--d) * .1s); }
  html.ae-on .aer-faq details{ opacity:0; transform:translateY(10px); } html.ae-on .aer-faq.lit details{ animation:aeIn .45s ease forwards; animation-delay:calc(var(--d) * .07s); }
  @media (prefers-reduced-motion: reduce){ html.ae-on .aet-card, html.ae-on .aet-word i, html.ae-on .aet-cities span, html.ae-on .aet-cities i, html.ae-on .aet-crew > div, html.ae-on .aet-type, html.ae-on .aet-cap, html.ae-on .aet-title, html.ae-on .aer-slate .arm, html.ae-on .aer-slate .body, html.ae-on .aer-h2, html.ae-on .aer-lede, html.ae-on .aer-two > div, html.ae-on .em, html.ae-on .cr, html.ae-on .cr figure .ae-img, html.ae-on .aer-strip, html.ae-on .aer-thanks li, html.ae-on .drv, html.ae-on .aer-plate .ae-img, html.ae-on .aer-qs li, html.ae-on .aer-faq details, html.ae-on .clk .face i{ opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; } }
`;

const JS = `
/* ae_hub.js : the title sequence (one shot, ~15s, skippable) and the reel reveals. html.ae-on is added only here. */
(function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var root = document.documentElement, aet = document.querySelector('.aet'); if (!aet) return;
    /* scatter the letters of PRESENTS before the start state applies */
    var ls = aet.querySelectorAll('.aet-word i');
    for (var i = 0; i < ls.length; i++) { var a = (i * 137.5) % 360; var r = 120 + (i * 53) % 160; ls[i].style.setProperty('--x', Math.round(Math.cos(a) * r) + 'px'); ls[i].style.setProperty('--y', Math.round(Math.sin(a) * r * .6) + 'px'); ls[i].style.setProperty('--r', ((i % 2 ? -1 : 1) * (8 + (i * 7) % 20)) + 'deg'); }
    root.classList.add('ae-on'); root.classList.add('ae-titles-running');
    var cards = aet.querySelectorAll('.aet-card'), plates = aet.querySelectorAll('.aet-plate'), dots = aet.querySelectorAll('.aet-progress i');
    var DUR = [2600, 2600, 3000, 3400, 3800, 0], cur = 0, timer = null, done = false;
    function show(n) {
        for (var c = 0; c < cards.length; c++) { cards[c].classList.toggle('on', c === n); cards[c].classList.toggle('off', c < n); }
        for (var p = 0; p < plates.length; p++) { plates[p].classList.toggle('on', p <= n); plates[p].classList.remove('still'); }
        for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('on', d <= n);
        cur = n;
        if (n === cards.length - 1) { done = true; aet.classList.add('open'); root.classList.remove('ae-titles-running'); }
    }
    function finish() { if (done) return; clearTimeout(timer); show(cards.length - 1); }
    function step() { if (done) return; show(cur); if (DUR[cur] > 0) timer = setTimeout(function () { step2(); }, DUR[cur]); }
    function step2() { if (done) return; if (cur < cards.length - 1) { cur++; step(); } }
    /* start: card 6 is the JS-off default, so rewind to card 1 and roll */
    show(0); timer = setTimeout(step2, DUR[0]);
    var skip = aet.querySelector('.aet-skip'); if (skip) skip.addEventListener('click', function () { finish(); });
    window.addEventListener('scroll', function onS() { if (window.scrollY > 40) { finish(); window.removeEventListener('scroll', onS); } });
    window.addEventListener('keydown', function onK(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { finish(); window.removeEventListener('keydown', onK); } });
    aet.addEventListener('click', function (e) { if (!e.target.closest('a')) finish(); });
    /* the clocks: real local time, else the static 10:10 / 11:40 the CSS shows */
    var clks = document.querySelectorAll('.clk[data-tz]');
    for (var k = 0; k < clks.length; k++) {
        try { var parts = new Intl.DateTimeFormat('en-GB', { timeZone: clks[k].getAttribute('data-tz'), hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date()); var hh = +parts.find(function (x) { return x.type === 'hour'; }).value % 12, mm = +parts.find(function (x) { return x.type === 'minute'; }).value; clks[k].style.setProperty('--h', (hh * 30 + mm * .5) + 'deg'); clks[k].style.setProperty('--m', (mm * 6) + 'deg'); }
        catch (e) { clks[k].style.setProperty('--h', (+clks[k].getAttribute('data-h') * 30 + +clks[k].getAttribute('data-m') * .5) + 'deg'); clks[k].style.setProperty('--m', (+clks[k].getAttribute('data-m') * 6) + 'deg'); }
    }
    /* the reels */
    var frames = document.querySelectorAll('.aer-slate, .aer-h2, .aer-lede, .aer-clocks, .aer-two, .aer-em, .aer-crew, .aer-thanks, .aer-drivers, .aer-plate, .aer-qs, .aer-faq');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
// build
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];

s = L.setHead(s, {
  title: 'SEO, Website Development &amp; ERP for the UAE | A Team Four Hours from Dubai | TechAuditPros',
  ogTitle: 'SEO, Websites and ERP for the UAE &mdash; from a team four hours away',
  desc: 'SEO with AI-search optimisation, website and e-commerce development, and custom ERP with UAE VAT, Corporate Tax, PINT-AE e-invoicing and WPS built in &mdash; for Dubai and Abu Dhabi, from an engineering team in Kochi. No office in the Emirates, said first. Weekly staging URL, monthly report.',
  url: URL,
  hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'en-in', href: 'https://techauditpros.com/in/' }, { lang: 'en-gb', href: 'https://techauditpros.com/uk/' }, { lang: 'en-us', href: 'https://techauditpros.com/us/' }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', URL]]),
  L.serviceSchema({ name: 'SEO, Website Development and ERP Services in the UAE', desc: 'SEO with AI-search optimisation, website and e-commerce development, and custom ERP with UAE VAT, Corporate Tax, e-invoicing and WPS compliance for businesses in Dubai, Abu Dhabi and across the United Arab Emirates, delivered from Kochi.', url: URL, area: 'United Arab Emirates' }),
  L.faqSchema(FAQS),
]);

// the hero becomes the title sequence
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', TITLES.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, '');
s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, '');
s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');

// the story
s = L.setBody(s, [L.answer(ANSWER), REEL1, REEL2, REEL3, REEL4, REEL5, REEL6, CREDITS].join('\n'));
s = L.setFinalCta(s, 'A TechAuditPros production. Let&rsquo;s look at one real page or one real process together.', 'Takes 60 seconds &middot; For Dubai, Abu Dhabi and the Emirates &middot; The findings are yours to keep &middot; No long-term contract');

// taglines, footer, the two word rules
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Dubai');
s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Dubai.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING BUSINESSES ACROSS THE UAE');
s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Dubai &bull; Abu Dhabi &bull; Sharjah &bull; Ajman &bull; Ras Al Khaimah &bull; Al Ain &bull; JAFZA &bull; DIFC &bull; KIZAD &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [
  ['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'],
  ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'],
  ['manage audits and deployments securely', 'manage builds and deployments securely'],
  ['>SEO Audit Kochi<', '>SEO in Kochi<'],
  ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.'],
]) if (s.includes(from)) s = s.split(from).join(to);
{
  const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at);
  const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt);
}
// guards
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" survives on /ae/: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on /ae/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3800) throw new Error('only ' + words + ' words; parity needs 3,800+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'node_modules' || e.name.startsWith('.')) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html' || e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.replace(/\\/g, '/').endsWith('/ae/index.html') && !p.replace(/\\/g, '/').includes('/archive/') && !p.replace(/\\/g, '/').includes('/scripts/'));
  const used = [];
  for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<li class="aet-card', 6); L.must(s, ' data-c="', 18);   // 6 plates + 6 cards + 6 progress dots L.must(s, 'class="aer-slate"', 6); L.must(s, '<details', FAQS.length); L.must(s, 'href="/ae/" class="nav-dropdown-item"', 1);
fs.mkdirSync(path.join(L.REPO, 'ae'), { recursive: true });
L.write('ae/index.html', s);
console.log('/ae/ written — the UAE hub as a title sequence: 6 cards, 6 reels, credit-roll FAQ' + (ABU ? '' : ' (city links pending: rebuild after ae_abu_dhabi/ae_dubai)'));
