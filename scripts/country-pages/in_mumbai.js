'use strict';
// /in/mumbai/ — rebuilt to SERP parity (PLAN-IN §9) with its own design (PLAN-IN §2.2, §7).
//
// RUN ORDER (not idempotent alone): in_hub.js -> in_city.js -> in_story.js -> in_kerala.js -> in_mumbai.js
//   in_city writes the Mumbai skeleton (head, hero, nav, footer); this file replaces everything between the hero
//   and the closing CTA and asserts it is reading a fresh in_city output.
//
// WHAT RANKS (live Google, 2026-09-05, "seo agency mumbai" / "best seo company in mumbai" / "ecommerce seo services mumbai"):
//   established agencies, 2,800–8,000 words, 4–12 FAQs, years + client counts, case studies with %, testimonial and
//   logo walls, 10–18 services, a numbered process, an office address in Mumbai, some publish price bands
//   (₹35,000–₹1,00,000+/mo; ₹40,000/mo minimum; bands from ₹50,000). Opposite of Kerala: nobody here is a freelancer.
// WHAT THIS PAGE DOES ABOUT IT:
//   4,500+ words · 12 FAQs · the office question answered in the first screen and turned into the argument · e-commerce
//   as the spine (the cluster's second intent and the city's economy) · Navi Mumbai and Thane as named sections ·
//   localities named along the railway lines · WordPress/website development (1,900 + 1,600 + 720/mo) · the market
//   price range ATTRIBUTED, never ours · the ERP angle none of them have · a hire checklist · WhatsApp CTA.
// RULES: no "audit" as a service word, no "offshore", no price of ours, every photograph unique to this page (asserted),
//   reveal start states only under html.mum-on which JS adds after the reduced-motion check — JS off = complete page.
//
// SIGNATURE — "the sea link": over the Bandra–Worli plate an SVG bridge of twelve segments lights one after another
//   from the island city to Navi Mumbai, pylons drawing up beneath it (pathLength/stroke-dashoffset, scaleY).
// PER-SECTION MOTION, each its own and none from /in/kerala/: ledger = three drawers slide in from three sides ·
//   stock truth = the storefront number counts down to the godown number, then a receipt prints line by line (scaleY) ·
//   the lines = a marker travels each railway track and stations pop behind it · Navi Mumbai = photos open from the
//   centre (clip-path inset(0 50%)) · websites = trade-off bars grow · cost = quote cards type in (clip-path from the
//   right) · one system = three ledgers slide into one stack · checklist = cards flip on Y · band = movement-only drift.
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const URL = 'https://techauditpros.com/in/mumbai/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));

function img(slug, alt, sizes, cls) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  const srcset = tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ');
  return '<img class="' + (cls || 'mum-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + srcset + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '" loading="lazy" decoding="async" />';
}
// the photographs of this page — no other page may carry any of them
const STOCK = {
  sealink: 'in-mumbai-sea-link-bridge', harbour: 'mum-harbour-colourful-boats',
  jewellery: 'mum-jewellery-display-man', crates: 'mum-stacked-cardboard-boxes',
  train: 'mum-train-at-platform', commuters: 'mum-commuters-platform',
  truck: 'mum-truck-blue-crates', parcels: 'mum-bicycle-parcel-boxes',
  market: 'mum-street-market-motorcycles', promenade: 'mum-marine-drive-promenade',
  band: 'mum-water-and-city',
};

// ---------------------------------------------------------------------------------------------
// copy
const HERO = {
  eyebrow: 'Mumbai, Navi Mumbai &amp; Thane &mdash; SEO, e-commerce and ERP',
  h1: 'An SEO agency for Mumbai <span>that will tell you when to hire locally.</span>',
  sub: 'We have no office in Andheri, and we say so in the first line because most pages that rank for this search will not tell you what they lack. What you get instead: a team in Kochi in your time zone, a developer who ships the fixes rather than a deck that recommends them, a staging URL you can open every week, and a storefront that shows the stock the godown actually has. Month to month, in rupees with GST.',
};

const ANSWER = 'TechAuditPros provides <strong>SEO, e-commerce and website development, and custom ERP</strong> to businesses in <strong>Mumbai, Navi Mumbai and Thane</strong> from an engineering team in Kochi. No Mumbai office &mdash; same time zone, a weekly staging URL and a written monthly report instead. The work most Mumbai clients bring us is e-commerce: a Shopify, WooCommerce or custom storefront whose visibility problems are structural, and whose stock numbers disagree with the warehouse. We fix both as one project, and we will say plainly when a local agency is the better choice.';

// the twelve bridge segments, left pin to right pin, with the pylons beneath
const BRIDGE = { x0: 6, x1: 94, y: 46, segs: 12, pylons: [22, 38, 54, 70, 86] };

const LEDGER = {
  heads: ['A Mumbai agency', 'A freelancer', 'Us, from Kochi'],
  rows: [
    ['In your office', 'Yes, when the account manager can make it. The people doing the work usually cannot.', 'Sometimes, if they are nearby. Often the same person on every call, which is the real strength.', 'No. On a screen every week instead, with the staging URL open. If you need someone at your desk, hire locally &mdash; we will say so.'],
    ['Who does the work', 'A team you rarely meet, behind an account manager you always do.', 'The person you hired, until the job needs a skill they do not have.', 'The team you talk to. The developer on the call is the developer on the code.'],
    ['Disciplines', 'One done properly, the others resold. Web development is often a partner agency.', 'One, done well. Anything else is a referral.', 'Search, the site and the stock system by one team, because in Mumbai e-commerce they are one problem.'],
    ['What you see weekly', 'A dashboard, sometimes. A monthly call, usually.', 'A WhatsApp message, often a ranking screenshot.', 'A staging URL with the week&rsquo;s changes live on it, and a written report every month against a ninety-day plan.'],
    ['When you stop', 'Notice periods measured in quarters; access and accounts sometimes theirs.', 'Depends entirely on the individual.', 'Everything yours from day one: code, accounts, content, report history. No notice period.'],
    ['The honest verdict', 'Right when you want a large team, a Mumbai address and a wall of logos, and can pay for all three.', 'Right for a defined job with a fixed budget and your own developer.', 'Right when the storefront, the search work and the stock system need doing together, and you would rather see the work than the office.'],
  ],
};

const RECEIPT = [
  ['Category architecture', 'Which collections exist, what they are called, how deep the tree goes. Most Mumbai storefronts rank for nothing because everything sits two clicks too deep.'],
  ['Faceted-URL bloat', 'Filters generating thousands of near-identical URLs that Google crawls instead of your products. Canonicals, noindex rules and parameter handling &mdash; developer work.'],
  ['Product schema', 'Price, availability, reviews and shipping as structured data, so the listing carries the numbers the shopper decides on.'],
  ['Speed on a 4G commute', 'Your buyer is on a local train between Andheri and Churchgate. A storefront that takes six seconds on that connection is a storefront nobody sees.'],
  ['Image search', 'Gold, garments and home products are found by picture as often as by word. File names, alt text, dimensions and compression, product by product.'],
  ['Stock truth', 'Availability on the product page fed from the system that knows, not from a spreadsheet updated on Fridays. Overselling stops being a weekly apology.'],
  ['The platform, honestly', 'Shopify when speed to market matters, WooCommerce when you already live in WordPress, custom when the catalogue or the pricing rules are genuinely unusual.'],
  ['Reporting that means something', 'Revenue by landing page, not rankings by keyword. If a page ranks and does not sell, we say so and fix the page.'],
];

const LINES = [
  { name: 'Western line', stations: ['Churchgate', 'Marine Lines', 'Lower Parel', 'Dadar', 'Bandra', 'Andheri', 'Goregaon', 'Malad', 'Borivali'], note: 'Head offices and D2C brands from Lower Parel to Andheri; the retail belt from Goregaon to Borivali where the map results decide the walk-in. E-commerce first, then local visibility.' },
  { name: 'Central line', stations: ['CST', 'Byculla', 'Kurla', 'Ghatkopar', 'Mulund', 'Thane'], note: 'Trading houses, wholesale and the industrial estates of Kurla and Ghatkopar out to Thane: businesses with strong offline names, thin websites and stock kept in three places. Usually the system comes before the search work.' },
  { name: 'Harbour &amp; Trans-Harbour', stations: ['Vashi', 'Nerul', 'Belapur', 'Airoli'], note: 'Navi Mumbai: manufacturing, warehousing, IT services and B2B distribution. Its own search cluster &mdash; people look for a supplier in Navi Mumbai, not Mumbai &mdash; and a different first project, more often the order system than the storefront.' },
];

const WEB = [
  { h: 'WordPress', bars: [['Speed to launch', 90], ['Speed on mobile', 55], ['You own it', 85]], p: 'The right answer more often than developers admit: fast to launch, everyone can edit it, and it is yours. The cost is speed &mdash; a WordPress storefront on 4G is only quick if someone disciplined built it. That is the work.' },
  { h: 'Shopify or WooCommerce', bars: [['Speed to launch', 80], ['Speed on mobile', 70], ['You own it', 60]], p: 'Shopify for a catalogue that needs to be selling next month; WooCommerce if the business already lives in WordPress. Both need the category architecture and faceted-URL work done, or they rank for the brand name and nothing else.' },
  { h: 'Hand-built', bars: [['Speed to launch', 40], ['Speed on mobile', 95], ['You own it', 100]], p: 'For a catalogue, a pricing rule or a stock model that a platform cannot express. Slower to launch, fastest to load, and the repository is handed to you with the staging URL from week one.' },
];

const QUOTES = [
  ['&#8377;35,000 to &#8377;1,00,000+ a month', 'published by a Navi Mumbai agency ranking for this search'],
  ['&#8377;40,000 a month minimum; &#8377;46,000 to &#8377;1,20,000 by category', 'the full rate card of an Andheri West agency'],
  ['budget bands from &#8377;50,000 to &#8377;10 lakh+', 'the enquiry form of a Navi Mumbai agency with branches in four cities'],
];

const DRIVERS = [
  ['How much is development', 'A storefront with faceted-URL bloat and a six-second mobile load needs a developer before it needs a writer. That is the expensive half, and the half most quotes leave out.'],
  ['Which shelf you are competing for', 'Ranking a clinic in Malad and ranking a gold-jewellery brand nationally are different projects sold under the same word.'],
  ['Who ships the changes', 'Recommendations that wait in your developer&rsquo;s queue cost you the waiting. Our developer is on the team; the fix ships the same week it is found.'],
  ['One project or three', 'Search alone; search plus a rebuild; search plus a rebuild plus a stock system. Sequenced, they cost less and run calmer than done at once.'],
];

const CHECK = [
  ['Who, by name, will do the work?', 'Not the account manager. If the answer is a team you will never meet, you are buying a process, not people.'],
  ['Can I open the staging site today?', 'Anyone doing real work has changes to show before they go live. Anyone who cannot is asking you to trust the invoice.'],
  ['What ships in the first thirty days?', 'A specific list &mdash; these pages, this fix, this profile &mdash; is a plan. &ldquo;Research and strategy&rdquo; is a delay.'],
  ['What do I keep if I stop in month three?', 'Accounts, content, code, reports: yours from day one, or the quoted price is not the price.'],
  ['Show me one monthly report you sent a client.', 'Redacted is fine. Does it read like a plan being worked through, or a screenshot of rankings?'],
  ['Which of these case-study numbers were yours alone?', 'Logo walls are easy. Ask which part of the growth was the agency and which was the client&rsquo;s own team, ads or season.'],
];

const FAQS = [
  { q: 'Do you have an office in Mumbai?', a: 'No. We are an engineering team in Kochi and we work with Mumbai, Navi Mumbai and Thane clients remotely: same time zone, a live overlap all day, a staging URL you can open every week and a written monthly report. We visit for a kick-off or a systems project when it earns the journey. If you need somebody at your desk every week, hire in Andheri or Vashi &mdash; we will say so on the first call rather than pretend otherwise.' },
  { q: 'What does SEO cost in Mumbai?', a: 'Agencies ranking for this search publish between &#8377;35,000 and &#8377;1,00,000+ a month, one lists a &#8377;40,000 monthly minimum with category-based rates up to &#8377;1,20,000, and another takes enquiries in bands from &#8377;50,000. Those are their figures, as published in September 2026. We do not publish a rate card because two quotes at the same price routinely describe different work; you get a written plan for the first ninety days and a price against it, to compare with any of those.' },
  { q: 'Can you do e-commerce SEO as well as the build?', a: 'Yes, and doing both is the point. Most e-commerce visibility problems in this market are structural &mdash; thin product pages, filters generating thousands of near-identical URLs, a storefront too slow on mobile data &mdash; and fixing them is development work that happens to be the highest-value search work. We build on Shopify, WooCommerce and custom, and we connect the storefront to the stock system so availability is the real number.' },
  { q: 'Shopify, WooCommerce or a custom storefront?', a: 'Shopify when the catalogue needs to be selling next month and the pricing is ordinary; WooCommerce when the business already lives in WordPress and wants one system to edit; custom when the catalogue, the pricing rules or the stock model are genuinely unusual. We will tell you which on the call, including when the answer is the platform you already have.' },
  { q: 'Do you work with Navi Mumbai and Thane businesses?', a: 'Yes, and the work usually looks different: more manufacturing, warehousing and B2B distribution than the D2C brands of the island city, so the first project is more often the stock and order system than the website. Search there is its own cluster &mdash; people look for a supplier in Navi Mumbai or Thane, not Mumbai &mdash; and the pages are written that way.' },
  { q: 'Do you do local SEO and Google Business Profile in Mumbai?', a: 'Yes. For clinics, showrooms, restaurants and services from Borivali to Colaba the map results decide the walk-in and the call, so profile categories, reviews, photographs, citations and locality pages written the way people here search are usually the first thirty days&rsquo; work.' },
  { q: 'How long until we see results?', a: 'Local results in one locality typically move within three to six months; competitive city-wide or national terms in gold, garments, real estate or finance take six to twelve. The first month should still show visible work on the staging URL &mdash; fixes shipped, a profile corrected, pages rewritten. If nothing is visible after thirty days, ask why, whoever you hired.' },
  { q: 'Do you build WordPress websites in Mumbai?', a: 'Yes, and we recommend WordPress more often than developers usually do: fast to launch, everyone can edit it, and you own it. The discipline is speed &mdash; a WordPress site on a 4G commute is only quick if it is built carefully &mdash; and we hand you the repository and hosting access, not a page-builder subscription.' },
  { q: 'Do you build ERP for Mumbai traders and distributors?', a: 'Yes. Stock, orders, purchasing, pricing rules and job costing in one system, connected to the accounting package you already keep and, where there is a storefront, feeding it live availability. Traders, distributors, D2C brands and the manufacturers of Navi Mumbai and Thane are the businesses we see most.' },
  { q: 'How do I know work is happening each month?', a: 'You open the staging URL and see what changed; you read the monthly report and check it against the ninety-day plan; you can ask for the commit history. If a supplier cannot show you the work before it goes live, you are being asked to trust the invoice.' },
  { q: 'What happens if I stop after three months?', a: 'You keep everything: code, accounts, content, the report history and the plan. There is no notice period measured in quarters and no retainer trap. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
  { q: 'Do you run Google Ads or social media as well?', a: 'No. Mumbai has excellent agencies for both, and several of the ones ranking for this search do them well. We do the engineering half &mdash; search, the site, the system &mdash; and we work alongside your ads or social agency rather than competing with it for the budget.' },
];

// ---------------------------------------------------------------------------------------------
// markup
const head = (n, label, title, lede) => [
  '      <div class="mum-head">',
  '        <p class="mum-slate"><b>' + n + '</b><span>' + label + '</span></p>',
  '        <h2 class="mum-h2">' + title + '</h2>',
  lede ? '        <p class="mum-lede">' + lede + '</p>' : '',
  '      </div>',
].filter(Boolean).join('\n');

const segs = [];
for (let i = 0; i < BRIDGE.segs; i++) {
  const a = BRIDGE.x0 + (BRIDGE.x1 - BRIDGE.x0) * i / BRIDGE.segs, b = BRIDGE.x0 + (BRIDGE.x1 - BRIDGE.x0) * (i + 1) / BRIDGE.segs;
  segs.push('        <line class="seg" x1="' + a.toFixed(2) + '" y1="' + BRIDGE.y + '" x2="' + b.toFixed(2) + '" y2="' + BRIDGE.y + '" pathLength="1" style="--d:' + i + '" />');
}
const ACT_LINK = [
  '<section class="mum dark" id="mum-link" aria-label="The sea link">',
  '  <div class="container mum-two">',
  '    <div>',
  head('01', 'The sea link', 'Mumbai has more agencies than any city in India. We are not one of them, and that is the point.', 'The search data for this city is unusually clear about what people buy: an agency first, then professional services, WordPress and e-commerce development, local visibility, and &mdash; distinct enough to matter &mdash; a supplier in Navi Mumbai or Thane. Almost nobody is searching for theory. They are searching for someone who will do the work and show it. This page is written to that list, in that order, and it starts by telling you what we do not have.'),
  '      <ul class="mum-facts"><li><b>250+</b> projects delivered</li><li><b>128+</b> active clients</li><li><b>16</b> countries served</li><li><b>4.9/5</b> client rating</li></ul>',
  '      <div class="mum-cta-row"><a class="mum-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="mum-btn ghost" href="#mum-ledger">What we lack, honestly &darr;</a></div>',
  '    </div>',
  '    <div class="mum-stage" role="img" aria-label="A bridge lighting up segment by segment from the island city to Navi Mumbai over the Bandra–Worli Sea Link">',
  '      <div class="mum-plate">' + img(STOCK.sealink, 'The Bandra–Worli Sea Link in morning haze with the Mumbai skyline behind', '(max-width:860px) 100vw, 58vw') + '</div>',
  '      <svg class="mum-bridge" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">',
  ...BRIDGE.pylons.map((x, i) => '        <line class="pylon" x1="' + x + '" y1="' + (BRIDGE.y + 1) + '" x2="' + x + '" y2="' + (BRIDGE.y + 30) + '" pathLength="1" style="--d:' + i + '" />'),
  ...segs,
  '      </svg>',
  '      <div class="mum-pin l" style="left:' + BRIDGE.x0 + '%;top:' + BRIDGE.y + '%"><i></i><b>Island city</b><span>Colaba to Bandra</span></div>',
  '      <div class="mum-pin r" style="left:' + BRIDGE.x1 + '%;top:' + BRIDGE.y + '%"><i></i><b>Navi Mumbai &middot; Thane</b><span>Vashi, Airoli, Belapur</span></div>',
  '      <p class="mum-stage-cap">One team, both sides of the creek. No office on either.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_LEDGER = [
  '<section class="mum" id="mum-ledger" aria-label="Three columns, honestly">',
  '  <div class="container">',
  head('02', 'What we lack, honestly', 'Three ways to buy this work in Mumbai, and what each one does not give you.', 'Every agency page ranking for this search compares itself with freelancers and wins. Here is the version with our own column filled in truthfully, including the row where we lose.'),
  '    <figure class="mum-wideplate">' + img(STOCK.harbour, 'Colourful fishing boats packed into a Mumbai harbour', '100vw') + '<figcaption>Mumbai has a supplier for everything. The question is what each one leaves out.</figcaption></figure>',
  '    <div class="mum-drawers">',
  ...LEDGER.heads.map((h, c) => '      <div class="mum-drawer' + (c === 2 ? ' hi' : '') + '" style="--d:' + c + '"><h3>' + h + '</h3>' + LEDGER.rows.map(r => '<div class="cell"><b>' + r[0] + '</b><p>' + r[c + 1] + '</p></div>').join('') + '</div>'),
  '    </div>',
  '    <aside class="mum-callout"><h3>Hire locally if</h3><p>you want a large team you can visit, a Mumbai address on the proposal and a wall of logos in the lobby &mdash; and can pay for all three. Several of the agencies ranking for this search are good at exactly that. Come to us when what you want to see is the work.</p></aside>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_STOCK = [
  '<section class="mum dark" id="mum-stock" aria-label="Stock truth">',
  '  <div class="container">',
  head('03', 'The e-commerce problem', 'The storefront says 40 in stock. The godown has 6.', 'Trading, distribution and D2C brands dominate the enquiries we get from this city, and they share one failure: the shop says one thing and the warehouse says another. Everything called &ldquo;e-commerce SEO&rdquo; sits on top of that, so we fix the number first, then the pages.'),
  '    <div class="mum-truth">',
  '      <figure class="mum-tphoto" style="--d:0">' + img(STOCK.jewellery, 'A shopkeeper behind a display of necklaces in a Mumbai jewellery shop', '(max-width:860px) 100vw, 33vw') + '<figcaption>The storefront</figcaption></figure>',
  '      <div class="mum-counter" aria-label="Storefront stock counting down from 40 to the true figure of 6"><div class="n"><b class="from" data-from="40" data-to="6">40</b><span>storefront says</span></div><div class="eq" aria-hidden="true"></div><div class="n"><b class="to">6</b><span>godown has</span></div><p>One number, fed from the system that knows.</p></div>',
  '      <figure class="mum-tphoto" style="--d:1">' + img(STOCK.crates, 'Plastic crates stacked high in a Mumbai wholesale yard', '(max-width:860px) 100vw, 33vw') + '<figcaption>The godown</figcaption></figure>',
  '    </div>',
  '    <div class="mum-receipt" aria-label="What e-commerce SEO in Mumbai consists of">',
  '      <div class="rhead"><span>E-COMMERCE SEO &middot; MUMBAI</span><span>WHAT IT ACTUALLY CONSISTS OF</span></div>',
  ...RECEIPT.map(([h, p], i) => '      <div class="rline" style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + h + '</h3><p>' + p + '</p></div></div>'),
  '      <div class="rfoot">Shopify &middot; WooCommerce &middot; custom &nbsp;&mdash;&nbsp; storefront and stock system as one project</div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_LINES = [
  '<section class="mum alt" id="mum-lines" aria-label="The lines">',
  '  <div class="container">',
  head('04', 'Where in Mumbai', 'Mumbai is organised by its railway lines. So is the work.', 'Agencies list localities. We would rather tell you what a business on each line tends to need, because a D2C brand in Lower Parel, a wholesaler in Kurla and a manufacturer in Airoli are three different first projects.'),
  '    <div class="mum-two rails">',
  '      <div class="mum-lineset">',
  ...LINES.map((ln, i) => [
    '        <div class="mum-line" style="--d:' + i + '" data-n="' + ln.stations.length + '">',
    '          <h3>' + ln.name + '</h3>',
    '          <div class="track"><i class="train" aria-hidden="true"></i>' + ln.stations.map((s, k) => '<span class="st" style="--k:' + k + '"><i></i><b>' + s + '</b></span>').join('') + '</div>',
    '          <p>' + ln.note + '</p>',
    '        </div>',
  ].join('\n')),
  '      </div>',
  '      <div class="mum-railphotos">',
  '        <figure class="mum-rphoto" style="--d:0">' + img(STOCK.train, 'A Mumbai local train pulling into a platform', '(max-width:860px) 92vw, 26vw') + '<figcaption>Every buyer you want is on this</figcaption></figure>',
  '        <figure class="mum-rphoto" style="--d:1">' + img(STOCK.commuters, 'Commuters walking along a Mumbai station platform beside a local train', '(max-width:860px) 92vw, 26vw') + '<figcaption>On a 4G connection, between stations</figcaption></figure>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_NAVI = [
  '<section class="mum dark" id="mum-navi" aria-label="Navi Mumbai and Thane">',
  '  <div class="container">',
  head('05', 'Navi Mumbai &amp; Thane', 'Across the creek the search is different, and so is the first project.', 'People in Navi Mumbai and Thane look for a supplier in Navi Mumbai and Thane &mdash; the search data separates them from the island city cleanly. The businesses are more often manufacturing, warehousing and B2B distribution than D2C, and the thing that is broken is more often the order system than the website.'),
  '    <div class="mum-doors">',
  '      <figure class="mum-door" style="--d:0">' + img(STOCK.truck, 'A green goods tempo beside a wall of blue plastic crates', '(max-width:860px) 100vw, 46vw') + '<figcaption><b>Distribution &amp; warehousing</b><span>Stock in three places, one truth in none of them. The system first; the storefront, if any, after.</span></figcaption></figure>',
  '      <figure class="mum-door" style="--d:1">' + img(STOCK.parcels, 'A delivery bicycle leaning against a stack of red parcel boxes', '(max-width:860px) 100vw, 46vw') + '<figcaption><b>Manufacturing &amp; B2B</b><span>Buyers who search for a supplier in Vashi or Airoli, and a website that has never been asked to sell.</span></figcaption></figure>',
  '    </div>',
  '    <p class="mum-p on-dark">Same team, same weekly staging URL, same written report. Different order of work: for most Navi Mumbai and Thane clients we start with the stock and order system, then build the site on top of numbers that are finally right, then do the search work for the terms their buyers actually use &mdash; which, the data says, include the words Navi Mumbai and Thane.</p>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_WEB = [
  '<section class="mum" id="mum-web" aria-label="Websites and WordPress">',
  '  <div class="container">',
  head('06', 'Website development', 'WordPress, a platform, or hand-built: the honest trade-offs.', 'The second-largest cluster in Mumbai&rsquo;s search data is website development &mdash; WordPress specifically. Here is how we choose, with the bars set where we would set them for a client, not for a sales page.'),
  '    <div class="mum-webgrid">',
  ...WEB.map((w, i) => '      <article class="mum-web" style="--d:' + i + '"><h3>' + w.h + '</h3>' + w.bars.map(([l, v]) => '<div class="bar"><span>' + l + '</span><i style="--v:' + v + '%"></i></div>').join('') + '<p>' + w.p + '</p></article>'),
  '    </div>',
  '    <p class="mum-p">Whichever it is: a staging URL from week one, the repository and hosting access handed to you, no page-builder subscription you cannot leave, and Core Web Vitals measured on a 4G connection rather than on our desks.</p>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_COST = [
  '<section class="mum alt" id="mum-cost" aria-label="What SEO costs in Mumbai">',
  '  <div class="container">',
  head('07', 'What it costs', 'What SEO costs in Mumbai, quoted from the people who publish a price.', 'We read the first page of Google for these searches so you do not have to. Three of the agencies ranking there publish figures; here they are as published in September 2026. Ours comes after a plan, not before it.'),
  '    <div class="mum-quotes">',
  ...QUOTES.map(([q, by], i) => '      <blockquote class="mum-quote" style="--d:' + i + '"><p>' + q + '</p><cite>' + by + '</cite></blockquote>'),
  '    </div>',
  '    <div class="mum-drivers">',
  ...DRIVERS.map(([h, p], i) => '      <div class="drv" style="--d:' + i + '"><h3>' + h + '</h3><p>' + p + '</p></div>'),
  '    </div>',
  '    <p class="mum-p">What we publish instead of a rate card: a written plan for the first ninety days, what you will have at the end of it, and what you keep if you stop. Ask any of those three agencies for the same and put the answers side by side. The monthly figure only makes sense then.</p>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_ERP = [
  '<section class="mum dark" id="mum-erp" aria-label="One system of record">',
  '  <div class="container mum-two">',
  '    <div>',
  head('08', 'One system of record', 'Mumbai runs on trade. Trade runs on three ledgers that disagree.', 'The storefront, the godown and the accounts each keep their own number. A trader in Kurla, a distributor in Bhiwandi and a D2C brand in Lower Parel all live with it until the day a large order exposes it. We build the one system that all three read from &mdash; stock, orders, purchasing, pricing rules and job costing &mdash; connected to the accounting package you already keep.'),
  '      <div class="mum-stack" aria-label="Three ledgers merging into one system">',
  '        <div class="ledger a" style="--d:0"><b>Storefront</b><span>Shopify / WooCommerce / custom</span></div>',
  '        <div class="ledger b" style="--d:1"><b>Godown</b><span>Bins, batches, three warehouses</span></div>',
  '        <div class="ledger c" style="--d:2"><b>Accounts</b><span>Tally, Zoho, whatever you keep</span></div>',
  '        <div class="one"><b>One number</b><span>the system everyone reads from</span></div>',
  '      </div>',
  '      <p class="mum-p on-dark">This is also why the search work sticks: a product page that shows real availability, a category that reflects what you actually stock, and a report that shows revenue rather than rankings all depend on the number being right first.</p>',
  '    </div>',
  '    <figure class="mum-sideplate">' + img(STOCK.market, 'A crowded Mumbai wholesale street lined with stalls and parked motorcycles', '(max-width:860px) 100vw, 42vw') + '<figcaption>Crawford Market to Kalbadevi: the city&rsquo;s trade, mostly still on paper.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_CHECK = [
  '<section class="mum" id="mum-check" aria-label="Before you hire any agency in this city">',
  '  <div class="container mum-two rev">',
  '    <figure class="mum-sideplate tall">' + img(STOCK.promenade, 'People walking along the Marine Drive promenade with towers behind', '(max-width:860px) 100vw, 40vw') + '<figcaption>Walk before you sign.</figcaption></figure>',
  '    <div>',
  head('09', 'Before you hire anyone', 'Six questions for any SEO agency in Mumbai &mdash; including us.', 'This city has no shortage of suppliers, so the useful question is not who is cheapest but who will show you the work. Take these into every meeting.'),
  '      <div class="mum-cards">',
  ...CHECK.map(([q, p], i) => '        <div class="mum-card" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + q + '</h3><p>' + p + '</p></div>'),
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="mum-band" aria-label="On your screen every week">',
  '  <div class="mum-bandfig">' + img(STOCK.band, 'Marine Drive curving along the water at dusk with the Mumbai skyline lit', '100vw') + '</div>',
  '  <div class="container mum-bandtext"><p class="mum-slate"><b>&nbsp;</b><span>No office in Mumbai</span></p><h2 class="mum-h2">On your screen every week instead.</h2><p>Message us on WhatsApp, book a call, or send us the storefront and the stock sheet that disagree with it.</p><a class="mum-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
// styles — all prefixed mum-, all start states under html.mum-on
const CSS = `
  /* ================= in_mumbai.js : the page's own design ================= */
  .mum{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; }   /* start-state transforms must not widen the page before they are lit */
  .mum.dark{ background:var(--navy-deep); color:#fff; }
  .mum.alt{ background:#F3F6F5; }
  .mum-band, .mum-wideplate{ width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .mum-two{ display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,64px); align-items:center; }
  @media (min-width:860px){ .mum-two{ grid-template-columns:5fr 7fr; } .mum-two.rev{ grid-template-columns:5fr 7fr; } .mum-two.rails{ grid-template-columns:8fr 4fr; align-items:start; } }
  .mum-head{ max-width:64ch; margin-bottom:clamp(22px,3vw,40px); }
  .mum-slate{ display:flex; align-items:baseline; gap:12px; margin:0 0 12px; font-family:var(--font-mono); }
  .mum-slate b{ font-size:.95rem; color:#fff; background:var(--orange); padding:3px 8px; border-radius:4px; letter-spacing:.06em; }
  .mum-slate span{ font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }
  .mum.dark .mum-slate span, .mum-band .mum-slate span{ color:rgba(255,255,255,.55); }
  .mum-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); }
  .mum.dark .mum-h2, .mum-band .mum-h2{ color:#fff; }
  .mum-lede, .mum-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:66ch; }
  .mum.dark .mum-lede, .mum-p.on-dark, .mum.dark .mum-p{ color:rgba(255,255,255,.8); }
  .mum-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .mum-btn:hover{ background:var(--orange-dark); }
  .mum-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.35); color:#fff; }
  .mum-cta-row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }
  .mum-facts{ list-style:none; padding:0; margin:18px 0 22px; display:grid; grid-template-columns:repeat(2,1fr); gap:10px 18px; }
  .mum-facts li{ font-size:.86rem; color:rgba(255,255,255,.7); font-family:var(--font-mono); }
  .mum-facts b{ display:block; font-size:1.5rem; color:#fff; letter-spacing:-.02em; }
  .mum-img{ display:block; width:100%; height:100%; object-fit:cover; }

  /* 01 — the sea link */
  .mum-stage{ position:relative; }
  .mum-plate{ position:relative; aspect-ratio:16/9; overflow:hidden; border-radius:12px; background:rgba(255,255,255,.06); }
  .mum-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(11,32,54,.05) 0%, rgba(11,32,54,.55) 100%); }
  .mum-bridge{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
  .mum-bridge .seg{ stroke:var(--orange); stroke-width:5; stroke-linecap:round; vector-effect:non-scaling-stroke; }
  .mum-bridge .pylon{ stroke:rgba(255,255,255,.7); stroke-width:2; vector-effect:non-scaling-stroke; }
  .mum-pin{ position:absolute; width:0; height:0; }
  .mum-pin i{ position:absolute; left:-9px; top:-9px; width:18px; height:18px; border-radius:50%; background:#fff; border:5px solid var(--orange); }
  .mum-pin b, .mum-pin span{ position:absolute; white-space:nowrap; left:-6px; font-family:var(--font-mono); }
  .mum-pin b{ top:-46px; color:#fff; font-size:.8rem; letter-spacing:.06em; background:rgba(4,9,20,.82); padding:5px 9px; border-radius:6px; }
  .mum-pin span{ top:18px; color:rgba(255,255,255,.75); font-size:.66rem; letter-spacing:.08em; }
  .mum-pin.r b, .mum-pin.r span{ left:auto; right:-6px; }
  .mum-stage-cap{ margin:14px 0 0; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.04em; color:rgba(255,255,255,.62); }
  @media (max-width:860px){ .mum-plate{ aspect-ratio:4/3; } .mum-pin b{ font-size:.66rem; } .mum-pin span{ display:none; } }

  /* 02 — the drawers */
  .mum-wideplate{ position:relative; margin:0 0 clamp(28px,4vw,56px) calc(50% - 50vw); aspect-ratio:21/8; overflow:hidden; }   /* the shorthand must carry the bleed, or it resets margin-left */
  .mum-wideplate figcaption{ position:absolute; left:50%; transform:translateX(-50%); bottom:clamp(14px,3vw,36px); width:min(92vw,900px); text-align:center; color:#fff; font-size:clamp(1rem,1.6vw,1.35rem); text-shadow:0 2px 14px rgba(0,0,0,.7); }
  @media (max-width:700px){ .mum-wideplate{ aspect-ratio:4/3; } }
  .mum-drawers{ display:grid; grid-template-columns:1fr; gap:16px; }
  @media (min-width:860px){ .mum-drawers{ grid-template-columns:repeat(3,1fr); } }
  .mum-drawer{ border:1px solid var(--line); border-radius:14px; padding:22px 20px; background:#fff; }
  .mum-drawer.hi{ background:var(--navy-deep); color:#fff; border-color:var(--navy-deep); }
  .mum-drawer h3{ margin:0 0 16px; font-size:1.2rem; padding-bottom:12px; border-bottom:2px solid var(--orange); }
  .mum-drawer .cell{ padding:10px 0; border-bottom:1px solid var(--line); }
  .mum-drawer.hi .cell{ border-color:rgba(255,255,255,.14); }
  .mum-drawer .cell:last-child{ border-bottom:0; }
  .mum-drawer .cell b{ display:block; font-family:var(--font-mono); font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:4px; }
  .mum-drawer.hi .cell b{ color:rgba(255,255,255,.55); }
  .mum-drawer .cell p{ margin:0; font-size:.92rem; line-height:1.55; color:var(--ink-soft); }
  .mum-drawer.hi .cell p{ color:rgba(255,255,255,.86); }
  .mum-callout{ margin-top:clamp(22px,3vw,36px); border-left:4px solid var(--orange); padding:6px 0 6px 18px; max-width:70ch; }
  .mum-callout h3{ margin:0 0 6px; font-size:1.05rem; color:var(--ink); }
  .mum-callout p{ margin:0; color:var(--ink-soft); line-height:1.6; }

  /* 03 — stock truth */
  .mum-truth{ display:grid; grid-template-columns:1fr; gap:18px; align-items:center; margin-bottom:clamp(26px,3vw,44px); }
  @media (min-width:860px){ .mum-truth{ grid-template-columns:1fr 1fr 1fr; } }
  .mum-tphoto{ margin:0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:12px; }
  .mum-tphoto figcaption{ position:absolute; left:14px; bottom:12px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:#fff; background:rgba(4,9,20,.7); padding:6px 10px; border-radius:6px; }
  .mum-counter{ text-align:center; display:grid; grid-template-columns:1fr 40px 1fr; align-items:center; gap:6px; }
  .mum-counter .n b{ display:block; font-family:var(--font-mono); font-size:clamp(3rem,6vw,5.2rem); line-height:1; color:#fff; letter-spacing:-.04em; font-variant-numeric:tabular-nums; }
  .mum-counter .n .to{ color:var(--orange); }
  .mum-counter .n span{ display:block; margin-top:6px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.55); }
  .mum-counter .eq{ height:2px; background:rgba(255,255,255,.3); transform-origin:left center; }
  .mum-counter p{ grid-column:1 / -1; margin:14px 0 0; font-size:.9rem; color:rgba(255,255,255,.72); }
  .mum-receipt{ background:#FBFAF6; color:var(--ink); border-radius:6px; padding:clamp(18px,2.6vw,34px) clamp(16px,2.6vw,36px); font-family:var(--font-sans); box-shadow:0 20px 50px rgba(0,0,0,.35); max-width:920px; margin:0 auto; position:relative; }
  .mum-receipt::before, .mum-receipt::after{ content:''; position:absolute; left:0; right:0; height:8px; background:radial-gradient(circle at 6px -2px, transparent 6px, #FBFAF6 6.5px) repeat-x; background-size:12px 8px; }
  .mum-receipt::before{ top:-7px; } .mum-receipt::after{ bottom:-7px; transform:scaleY(-1); }
  .mum-receipt .rhead, .mum-receipt .rfoot{ display:flex; justify-content:space-between; gap:12px; font-family:var(--font-mono); font-size:.68rem; letter-spacing:.14em; color:var(--ink-faint); padding-bottom:12px; border-bottom:1px dashed var(--line-strong); }
  .mum-receipt .rfoot{ border-bottom:0; border-top:1px dashed var(--line-strong); padding:12px 0 0; margin-top:6px; justify-content:center; text-align:center; text-transform:uppercase; }
  .mum-receipt .rline{ display:grid; grid-template-columns:44px 1fr; gap:12px; padding:14px 0; border-bottom:1px dashed var(--line); transform-origin:top center; }
  .mum-receipt .rline b{ font-family:var(--font-mono); color:var(--orange); font-size:1.1rem; }
  .mum-receipt .rline h3{ margin:0 0 4px; font-size:1.02rem; }
  .mum-receipt .rline p{ margin:0; font-size:.92rem; line-height:1.55; color:var(--ink-soft); }
  @media (max-width:560px){ .mum-receipt .rhead{ flex-direction:column; gap:4px; } }

  /* 04 — the lines */
  .mum-lineset{ display:grid; gap:clamp(22px,3vw,36px); }
  .mum-line h3{ margin:0 0 12px; font-size:1.05rem; color:var(--ink); font-family:var(--font-mono); letter-spacing:.04em; }
  .mum-line .track{ position:relative; display:flex; justify-content:space-between; padding:0 0 30px; margin:0 0 12px; }
  .mum-line .track::before{ content:''; position:absolute; left:6px; right:6px; top:6px; height:4px; border-radius:2px; background:var(--line-strong); }
  .mum-line .track::after{ content:''; position:absolute; left:6px; right:6px; top:6px; height:4px; border-radius:2px; background:var(--orange); transform-origin:left center; }
  .mum-line .train{ position:absolute; top:-2px; left:0; width:22px; height:20px; border-radius:4px; background:var(--navy-deep); z-index:3; box-shadow:0 2px 8px rgba(0,0,0,.3); }
  .mum-line .train::before{ content:''; position:absolute; left:4px; top:5px; width:14px; height:5px; border-radius:2px; background:#FCE8DF; }
  .mum-line .st{ position:relative; z-index:2; flex:1; display:flex; flex-direction:column; align-items:center; min-width:0; }
  .mum-line .st i{ width:16px; height:16px; border-radius:50%; background:#fff; border:4px solid var(--orange); }
  .mum-line .st b{ margin-top:8px; font-size:.72rem; line-height:1.2; color:var(--ink); text-align:center; font-weight:600; }
  .mum-line .st:nth-child(even) b{ transform:translateY(16px); }
  .mum-line > p{ margin:0; font-size:.95rem; line-height:1.6; color:var(--ink-soft); }
  .mum-railphotos{ display:grid; gap:14px; position:sticky; top:96px; }
  .mum-rphoto{ margin:0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:12px; }
  .mum-rphoto figcaption{ position:absolute; left:14px; bottom:12px; font-family:var(--font-mono); font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:#fff; background:rgba(4,9,20,.7); padding:6px 10px; border-radius:6px; }
  @media (max-width:860px){ .mum-railphotos{ position:static; grid-template-columns:1fr 1fr; } }
  @media (max-width:700px){
    .mum-line .track{ flex-direction:column; gap:10px; padding:0 0 0 30px; }
    .mum-line .track::before, .mum-line .track::after{ left:6px; right:auto; top:6px; bottom:6px; width:4px; height:auto; transform-origin:top center; }
    .mum-line .train{ left:-3px; top:0; width:20px; height:22px; }
    .mum-line .st{ flex-direction:row; align-items:center; gap:10px; }
    .mum-line .st i{ margin-left:-30px; }
    .mum-line .st b{ margin:0; text-align:left; }
    .mum-line .st:nth-child(even) b{ transform:none; }
    .mum-railphotos{ grid-template-columns:1fr; }
  }

  /* 05 — the doors */
  .mum-doors{ display:grid; grid-template-columns:1fr; gap:16px; margin-bottom:clamp(20px,3vw,32px); }
  @media (min-width:860px){ .mum-doors{ grid-template-columns:1fr 1fr; } }
  .mum-door{ margin:0; position:relative; aspect-ratio:16/10; overflow:hidden; border-radius:12px; background:rgba(255,255,255,.06); }
  .mum-door::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.92) 0%, rgba(4,9,20,.3) 50%, rgba(4,9,20,0) 100%); }
  .mum-door figcaption{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:20px; color:#fff; }
  .mum-door figcaption b{ display:block; font-size:1.1rem; margin-bottom:6px; }
  .mum-door figcaption span{ font-size:.9rem; line-height:1.5; color:rgba(255,255,255,.82); }

  /* 06 — the bars */
  .mum-webgrid{ display:grid; grid-template-columns:1fr; gap:18px; margin-bottom:clamp(18px,2.4vw,28px); }
  @media (min-width:860px){ .mum-webgrid{ grid-template-columns:repeat(3,1fr); } }
  .mum-web{ border:1px solid var(--line); border-radius:14px; padding:22px 20px; background:#fff; }
  .mum-web h3{ margin:0 0 14px; font-size:1.2rem; color:var(--ink); }
  .mum-web .bar{ margin:0 0 10px; }
  .mum-web .bar span{ display:block; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:4px; }
  .mum-web .bar i{ display:block; height:8px; border-radius:4px; background:linear-gradient(90deg, var(--orange), var(--orange-dark)); width:var(--v); transform-origin:left center; }
  .mum-web p{ margin:14px 0 0; font-size:.92rem; line-height:1.55; color:var(--ink-soft); }

  /* 07 — the quotes */
  .mum-quotes{ display:grid; grid-template-columns:1fr; gap:14px; margin-bottom:clamp(22px,3vw,36px); }
  @media (min-width:860px){ .mum-quotes{ grid-template-columns:repeat(3,1fr); } }
  .mum-quote{ margin:0; background:var(--navy-deep); color:#fff; border-radius:12px; padding:22px 20px; }
  .mum-quote p{ margin:0 0 10px; font-family:var(--font-mono); font-size:1.05rem; line-height:1.4; color:#fff; }
  .mum-quote cite{ font-style:normal; font-size:.8rem; color:rgba(255,255,255,.6); }
  .mum-drivers{ display:grid; grid-template-columns:1fr; gap:16px 32px; margin-bottom:clamp(18px,2.4vw,28px); }
  @media (min-width:760px){ .mum-drivers{ grid-template-columns:repeat(2,1fr); } }
  .mum-drivers .drv h3{ margin:0 0 6px; font-size:1.05rem; color:var(--ink); }
  .mum-drivers .drv p{ margin:0; font-size:.92rem; line-height:1.55; color:var(--ink-soft); }

  /* 08 — the stack */
  .mum-stack{ position:relative; height:220px; margin:14px 0 22px; }
  .mum-stack .ledger{ position:absolute; top:0; left:50%; width:min(260px,80%); margin-left:min(-130px,-40%); padding:16px 18px; border-radius:10px; background:#fff; color:var(--ink); box-shadow:0 14px 34px rgba(0,0,0,.35); }
  .mum-stack .ledger b{ display:block; font-size:1.05rem; }
  .mum-stack .ledger span{ font-size:.8rem; color:var(--ink-soft); }
  .mum-stack .ledger.a{ transform:translate(-62%, 0) rotate(-3deg); }
  .mum-stack .ledger.b{ transform:translate(0, 70px) rotate(1deg); }
  .mum-stack .ledger.c{ transform:translate(62%, 0) rotate(3deg); }
  .mum-stack .one{ position:absolute; left:50%; bottom:0; transform:translateX(-50%); text-align:center; font-family:var(--font-mono); }
  .mum-stack .one b{ display:block; color:var(--orange); font-size:1.2rem; }
  .mum-stack .one span{ font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.6); }
  @media (max-width:560px){ .mum-stack{ height:300px; } .mum-stack .ledger.a{ transform:translate(-8%, 0) rotate(-3deg); } .mum-stack .ledger.b{ transform:translate(0, 80px) rotate(1deg); } .mum-stack .ledger.c{ transform:translate(8%, 160px) rotate(3deg); } }
  .mum-sideplate{ margin:0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:14px; }
  .mum-sideplate.tall{ aspect-ratio:4/5; }
  .mum-sideplate figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.7); }

  /* 09 — the cards */
  .mum-cards{ display:grid; grid-template-columns:1fr; gap:14px; perspective:1200px; }
  @media (min-width:700px){ .mum-cards{ grid-template-columns:1fr 1fr; } }
  .mum-card{ border:1px solid var(--line); border-radius:12px; padding:18px; background:#fff; transform-origin:left center; }
  .mum-card b{ font-family:var(--font-mono); color:var(--orange); }
  .mum-card h3{ margin:6px 0 6px; font-size:1.02rem; color:var(--ink); }
  .mum-card p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }

  /* band */
  .mum-band{ position:relative; background:var(--navy-deep); color:#fff; }
  .mum-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; }
  .mum-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(4,9,20,.85) 0%, rgba(4,9,20,.45) 50%, rgba(4,9,20,.15) 100%); }
  .mum-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); }
  .mum-bandtext p{ color:rgba(255,255,255,.8); max-width:44ch; margin:0 0 18px; }
  .mum-bandtext .mum-slate b{ background:transparent; padding:0; width:0; }
  @media (max-width:700px){ .mum-bandfig{ aspect-ratio:4/5; } }

  /* ================= reveals : start states only under html.mum-on ================= */
  html.mum-on .mum-head .mum-slate b{ transform:translateX(-12px); opacity:0; }
  html.mum-on .mum-head .mum-h2, html.mum-on .mum-head .mum-lede{ opacity:0; transform:translateY(14px); }
  html.mum-on .mum-head.lit .mum-slate b{ animation:mumIn .5s cubic-bezier(.2,.7,.2,1) forwards; }
  html.mum-on .mum-head.lit .mum-h2{ animation:mumIn .6s cubic-bezier(.2,.7,.2,1) .12s forwards; }
  html.mum-on .mum-head.lit .mum-lede{ animation:mumIn .6s cubic-bezier(.2,.7,.2,1) .26s forwards; }
  @keyframes mumIn{ to{ opacity:1; transform:none; } }
  /* 01 */
  html.mum-on .mum-stage .mum-plate .mum-img{ transform:scale(1.06); transition:transform 1.8s cubic-bezier(.18,.72,.2,1); }
  html.mum-on .mum-stage.lit .mum-plate .mum-img{ transform:scale(1); }
  html.mum-on .mum-bridge .seg, html.mum-on .mum-bridge .pylon{ stroke-dasharray:1; stroke-dashoffset:1; }
  html.mum-on .mum-stage.lit .mum-bridge .seg{ stroke-dashoffset:0; transition:stroke-dashoffset .22s linear calc(.5s + var(--d) * .16s); }
  html.mum-on .mum-stage.lit .mum-bridge .pylon{ stroke-dashoffset:0; transition:stroke-dashoffset .5s cubic-bezier(.3,0,.2,1) calc(.7s + var(--d) * .38s); }
  html.mum-on .mum-pin i{ transform:scale(0); }
  html.mum-on .mum-pin b, html.mum-on .mum-pin span{ opacity:0; }
  html.mum-on .mum-stage.lit .mum-pin.l i{ animation:mumPop .45s cubic-bezier(.2,.9,.3,1.4) .3s forwards; }
  html.mum-on .mum-stage.lit .mum-pin.r i{ animation:mumPop .45s cubic-bezier(.2,.9,.3,1.4) 2.5s forwards; }
  html.mum-on .mum-stage.lit .mum-pin.l b, html.mum-on .mum-stage.lit .mum-pin.l span{ opacity:1; transition:opacity .4s linear .5s; }
  html.mum-on .mum-stage.lit .mum-pin.r b, html.mum-on .mum-stage.lit .mum-pin.r span{ opacity:1; transition:opacity .4s linear 2.7s; }
  @keyframes mumPop{ to{ transform:none; } }
  html.mum-on .mum-stage .mum-stage-cap{ opacity:0; }
  html.mum-on .mum-stage.lit .mum-stage-cap{ opacity:1; transition:opacity .5s linear 3s; }
  /* 02 */
  html.mum-on .mum-wideplate .mum-img{ transform:scale(1.08); transition:transform 1.6s cubic-bezier(.18,.72,.2,1); }
  html.mum-on .mum-wideplate.lit .mum-img{ transform:none; }
  html.mum-on .mum-wideplate figcaption{ opacity:0; }
  html.mum-on .mum-wideplate.lit figcaption{ opacity:1; transition:opacity .6s linear .6s; }
  html.mum-on .mum-drawer{ opacity:0; }
  html.mum-on .mum-drawer[style*="--d:0"]{ transform:translateX(-60px); }
  html.mum-on .mum-drawer[style*="--d:1"]{ transform:translateY(60px); }
  html.mum-on .mum-drawer[style*="--d:2"]{ transform:translateX(60px); }
  html.mum-on .mum-drawers.lit .mum-drawer{ animation:mumIn .75s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.mum-on .mum-callout{ opacity:0; transform:translateY(16px); }
  html.mum-on .mum-callout.lit{ animation:mumIn .6s ease forwards; }
  /* 03 */
  html.mum-on .mum-tphoto .mum-img{ transform:scale(1.1); }
  html.mum-on .mum-tphoto{ clip-path:inset(50% 0 50% 0); }
  html.mum-on .mum-tphoto.lit{ animation:mumSplit .8s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .2s); }
  html.mum-on .mum-tphoto.lit .mum-img{ transform:none; transition:transform 1.4s cubic-bezier(.18,.72,.2,1) calc(var(--d) * .2s); }
  @keyframes mumSplit{ to{ clip-path:inset(0 0 0 0); } }
  html.mum-on .mum-counter .eq{ transform:scaleX(0); }
  html.mum-on .mum-counter.lit .eq{ animation:mumRule .8s cubic-bezier(.3,0,.2,1) 1.2s forwards; }
  @keyframes mumRule{ to{ transform:scaleX(1); } }
  html.mum-on .mum-counter p{ opacity:0; }
  html.mum-on .mum-counter.lit p{ opacity:1; transition:opacity .5s linear 2s; }
  html.mum-on .mum-receipt .rline{ transform:scaleY(0); opacity:0; }
  html.mum-on .mum-receipt.lit .rline{ animation:mumPrint .38s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(.2s + var(--d) * .16s); }
  @keyframes mumPrint{ to{ transform:none; opacity:1; } }
  html.mum-on .mum-receipt .rfoot{ opacity:0; }
  html.mum-on .mum-receipt.lit .rfoot{ opacity:1; transition:opacity .4s linear 1.7s; }
  /* 04 */
  html.mum-on .mum-line .track::after{ transform:scaleX(0); }
  html.mum-on .mum-line .train{ opacity:0; }
  html.mum-on .mum-line .st i{ transform:scale(0); }
  html.mum-on .mum-line .st b{ opacity:0; }
  html.mum-on .mum-line.lit .track::after{ animation:mumRule 2.4s cubic-bezier(.4,0,.3,1) .2s forwards; }
  html.mum-on .mum-line.lit .train{ opacity:1; animation:mumTrain 2.4s cubic-bezier(.4,0,.3,1) .2s forwards; }
  @keyframes mumTrain{ from{ left:0; } to{ left:calc(100% - 22px); } }
  html.mum-on .mum-line.lit .st i{ animation:mumPop .4s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(.25s + var(--k) * (2.2s / var(--n, 8))); }
  html.mum-on .mum-line.lit .st b{ opacity:1; transition:opacity .35s linear calc(.4s + var(--k) * (2.2s / var(--n, 8))); }
  @media (max-width:700px){ html.mum-on .mum-line .track::after{ transform:scaleY(0); } html.mum-on .mum-line.lit .track::after{ animation-name:mumRuleY; } @keyframes mumRuleY{ to{ transform:scaleY(1); } } @keyframes mumTrain{ from{ top:0; } to{ top:calc(100% - 22px); } } }
  html.mum-on .mum-rphoto .mum-img{ clip-path:inset(0 0 100% 0); }
  html.mum-on .mum-rphoto.lit .mum-img{ animation:mumDrop .8s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .2s); }
  @keyframes mumDrop{ to{ clip-path:inset(0 0 0 0); } }
  html.mum-on .mum-rphoto figcaption{ opacity:0; }
  html.mum-on .mum-rphoto.lit figcaption{ opacity:1; transition:opacity .4s linear calc(.7s + var(--d) * .2s); }
  /* 05 */
  html.mum-on .mum-door .mum-img{ clip-path:inset(0 50% 0 50%); transform:scale(1.08); }
  html.mum-on .mum-door.lit .mum-img{ animation:mumOpen .9s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .18s); }
  @keyframes mumOpen{ to{ clip-path:inset(0 0 0 0); transform:none; } }
  html.mum-on .mum-door figcaption{ opacity:0; transform:translateY(10px); }
  html.mum-on .mum-door.lit figcaption{ animation:mumIn .5s ease forwards; animation-delay:calc(.5s + var(--d) * .18s); }
  /* 06 */
  html.mum-on .mum-web{ opacity:0; transform:translateY(18px); }
  html.mum-on .mum-webgrid.lit .mum-web{ animation:mumIn .6s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  html.mum-on .mum-web .bar i{ transform:scaleX(0); }
  html.mum-on .mum-webgrid.lit .mum-web .bar i{ animation:mumRule .9s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(.4s + var(--d) * .12s); }
  /* 07 */
  html.mum-on .mum-quote{ clip-path:inset(0 100% 0 0); }
  html.mum-on .mum-quotes.lit .mum-quote{ animation:mumType .7s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .22s); }
  @keyframes mumType{ to{ clip-path:inset(0 0 0 0); } }
  html.mum-on .mum-drivers .drv{ opacity:0; transform:translateY(14px); }
  html.mum-on .mum-drivers.lit .drv{ animation:mumIn .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  /* 08 */
  /* the three ledgers settle into one fanned stack — edges of all three stay visible */
  html.mum-on .mum-stack.lit .ledger{ transition:transform 1s cubic-bezier(.2,.8,.2,1) calc(.2s + var(--d) * .18s); }
  html.mum-on .mum-stack.lit .ledger.a{ transform:translate(-7%, 26px) rotate(-2deg); }
  html.mum-on .mum-stack.lit .ledger.b{ transform:translate(0, 36px) rotate(0); }
  html.mum-on .mum-stack.lit .ledger.c{ transform:translate(7%, 46px) rotate(2deg); }
  html.mum-on .mum-stack .one{ opacity:0; }
  html.mum-on .mum-stack.lit .one{ opacity:1; transition:opacity .5s linear 1.3s; }
  html.mum-on .mum-sideplate .mum-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); }
  html.mum-on .mum-sideplate.lit .mum-img{ transform:none; }
  html.mum-on .mum-sideplate figcaption{ opacity:0; }
  html.mum-on .mum-sideplate.lit figcaption{ opacity:1; transition:opacity .5s linear .5s; }
  /* 09 */
  html.mum-on .mum-card{ opacity:0; transform:rotateY(-80deg); }
  html.mum-on .mum-cards.lit .mum-card{ animation:mumIn .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .1s); }
  /* band : movement only, scroll-driven where supported */
  @supports (animation-timeline: view()){
    .mum-bandfig .mum-img{ animation:mumDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; }
    @keyframes mumDrift{ from{ transform:scale(1.14) translateX(-3%); } to{ transform:scale(1.14) translateX(3%); } }
  }

  @media (prefers-reduced-motion: reduce){
    html.mum-on .mum-head .mum-slate b, html.mum-on .mum-head .mum-h2, html.mum-on .mum-head .mum-lede,
    html.mum-on .mum-stage .mum-plate .mum-img, html.mum-on .mum-bridge .seg, html.mum-on .mum-bridge .pylon, html.mum-on .mum-pin i, html.mum-on .mum-pin b, html.mum-on .mum-pin span, html.mum-on .mum-stage .mum-stage-cap,
    html.mum-on .mum-wideplate .mum-img, html.mum-on .mum-wideplate figcaption, html.mum-on .mum-drawer, html.mum-on .mum-callout,
    html.mum-on .mum-tphoto, html.mum-on .mum-tphoto .mum-img, html.mum-on .mum-counter .eq, html.mum-on .mum-counter p, html.mum-on .mum-receipt .rline, html.mum-on .mum-receipt .rfoot,
    html.mum-on .mum-line .track::after, html.mum-on .mum-line .train, html.mum-on .mum-line .st i, html.mum-on .mum-line .st b, html.mum-on .mum-rphoto .mum-img, html.mum-on .mum-rphoto figcaption,
    html.mum-on .mum-door .mum-img, html.mum-on .mum-door figcaption, html.mum-on .mum-web, html.mum-on .mum-web .bar i, html.mum-on .mum-quote, html.mum-on .mum-drivers .drv,
    html.mum-on .mum-stack .one, html.mum-on .mum-sideplate .mum-img, html.mum-on .mum-sideplate figcaption, html.mum-on .mum-card, .mum-bandfig .mum-img{
      opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; stroke-dashoffset:0 !important;
    }
    html.mum-on .mum-line .train{ display:none !important; }
  }
`;

// ---------------------------------------------------------------------------------------------
const JS = `
/* in_mumbai.js : light each frame once as it arrives, then stop watching it. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var frames = document.querySelectorAll('.mum-head, .mum-stage, .mum-wideplate, .mum-drawers, .mum-callout, .mum-tphoto, .mum-counter, .mum-receipt, .mum-line, .mum-rphoto, .mum-door, .mum-webgrid, .mum-quotes, .mum-drivers, .mum-stack, .mum-sideplate, .mum-cards');
    if (!frames.length) return;
    document.documentElement.classList.add('mum-on');
    /* the stock counter: 40 counts down to 6 over 1.4s, one shot */
    function count(el) {
        var from = +el.getAttribute('data-from'), to = +el.getAttribute('data-to'), t0 = null;
        function step(t) {
            if (t0 === null) t0 = t;
            var p = Math.min(1, (t - t0) / 1400); p = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(from + (to - from) * p);
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            var el = entries[i].target;
            el.classList.add('lit');
            if (el.classList.contains('mum-counter')) { var n = el.querySelector('.from'); if (n) count(n); }
            io.unobserve(el);
        }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
// build
let s = L.read('in/mumbai/index.html');
L.must(s, 'id="city-body"', 1);   // fresh in_city output; run in_hub -> in_city -> in_story -> in_kerala -> in_mumbai
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];

s = L.setHead(s, {
  title: 'SEO Agency in Mumbai for E-commerce, Websites &amp; ERP | TechAuditPros',
  desc: 'SEO, e-commerce and website development, and custom ERP for Mumbai, Navi Mumbai and Thane &mdash; from a Kochi team with no Mumbai office, a weekly staging URL and a monthly report. Honest about when to hire locally.',
  url: URL,
  hreflang: [{ lang: 'en-in', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/in/' }],
});

s = s.replace(/(<p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">)[\s\S]*?(<\/span><\/p>)/, '$1' + HERO.eyebrow + '$2');
s = s.replace(/<h1>[\s\S]*?<\/h1>/, '<h1>' + HERO.h1 + '</h1>');
s = s.replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/, '<p class="hero-subtitle">' + HERO.sub + '</p>');
s = L.replaceAll(s, 'href="#city-body" class="btn-ghost">What this city actually asks for &darr;</a>', 'href="#mum-ledger" class="btn-ghost">What we lack, honestly &darr;</a>');

const body = [
  L.answer(ANSWER),
  ACT_LINK, ACT_LEDGER, ACT_STOCK, ACT_LINES, ACT_NAVI, ACT_WEB, ACT_COST, ACT_ERP, ACT_CHECK, BAND,
  L.faqHtml('city-faq', 'Questions Mumbai businesses ask us', 'Twelve straight answers, starting with the office.', FAQS),
].join('\n').split('__WA__').join(WA);
s = L.setBody(s, body);
s = L.setFinalCta(s, 'Send us the storefront and the stock sheet that disagree with it.', 'Takes 60 seconds &middot; For Mumbai, Navi Mumbai &amp; Thane &middot; The findings are yours to keep &middot; No long-term contract');

// schemas: keep in_city's breadcrumb + service blocks (picked by parsed @type), replace its FAQ block
{
  const firstStyle = s.indexOf('<style');
  const blocks = s.slice(firstStyle).match(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  const typeOf = x => { try { return JSON.parse(x.replace(/^[\s\S]*?<script[^>]*>/, '').replace(/<\/script>[\s\S]*$/, ''))['@type']; } catch (e) { return '?'; } };
  const keep = blocks.filter(x => ['BreadcrumbList', 'Service'].includes(typeOf(x)));
  if (keep.length !== 2) throw new Error('expected breadcrumb + service blocks from in_city, found: ' + blocks.map(typeOf).join(', '));
  s = L.setPageSchemas(s, keep.map(b => b.replace(/^\s+/, '    ')).concat([L.faqSchema(FAQS)]));
}

{
  const at = s.indexOf('</style>'); if (at === -1) throw new Error('no </style>');
  s = s.slice(0, at) + CSS + s.slice(at);
  const bt = s.lastIndexOf('</body>'); if (bt === -1) throw new Error('no </body>');
  s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt);
}

// guards
if (/[Oo]ffshore/.test(s)) throw new Error('"offshore" on /in/mumbai/');
{
  const prose = s
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ')
    .replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ')
    .replace(/seo-audit-kochi/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) throw new Error('"audit" survives as a service word on /in/mumbai/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 4200) throw new Error('only ' + words + ' words; SERP parity needs 4,200+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'node_modules' || e.name.startsWith('.')) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html') out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.replace(/\\/g, '/').endsWith('/in/mumbai/index.html'));
  const used = [];
  for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<section class="mum', 10); L.must(s, 'class="seg"', BRIDGE.segs); L.must(s, 'class="mum-line"', LINES.length); L.must(s, 'class="mum-card"', CHECK.length);

L.write('in/mumbai/index.html', s);
console.log('/in/mumbai/ rebuilt to SERP parity: 9 acts + band, own signature "the sea link", 12 FAQs, e-commerce spine');
