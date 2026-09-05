'use strict';
// /in/kolkata/ — rebuilt to SERP parity (PLAN-IN §10) with its own design (PLAN-IN §2.2, §7).
//
// RUN ORDER (not idempotent alone): in_hub -> in_city -> in_story -> in_kerala -> in_mumbai -> in_kolkata
//
// WHAT RANKS (live Google, 2026-09-05): a mixed SERP — agencies (Digital Piloto ~15,000 words, ₹15k–₹2L/mo, ISO,
//   Google Partner, 20+ localities; House of Leads ₹7,500/15,000/22,000 tiers; SEOControl ₹15k–₹50k retainers and
//   19 technical items; Brandatory "from ₹15,000") AND named consultants (Amlan Maiti 15+ yrs, 20 case studies, no
//   FAQ, no price; Krishna 9+ yrs, no proof). The most price-published market in the data; the only city whose cluster
//   asks for a CONSULTANT as often as a company.
// WHAT THIS PAGE DOES ABOUT IT: 4,500+ words · 12 FAQs (both consultants have none) · consultant vs company weighed
//   honestly (the signature) · local SEO as the first thirty days · the technical layer item by item · 12 localities ·
//   the market's prices ATTRIBUTED and the point made that ₹7,500 and ₹2,00,000 carry the same word · websites and
//   e-commerce (480 + 730/mo) · the ERP angle · no office, said first · WhatsApp CTA.
// RULES: no "audit" as a service word, no "offshore", no price of ours, every photograph unique to this page (asserted),
//   start states only under html.kol-on, added by JS after the reduced-motion check — JS off = complete page.
//
// SIGNATURE — "the scale": a balance over the Howrah plate. Weights drop into the consultant pan and the company pan
//   in turn; the beam tips each way (rotate) and settles level. Both are right; weigh the job, not the label.
// PER-SECTION MOTION, each its own, none from Kerala or Mumbai: profile card fills field by field (clip-path from the
//   right + tick pop) · terminal types line by line (steps) · tram route draws with stops popping as the line reaches
//   them · price ladder: rail grows, rungs slide in · mirrored columns rise from a reflection · storefront wireframe
//   assembles block by block (scale) · report bars grow (scaleY) · question numbers roll (rotateX) · band drifts.
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const URL = 'https://techauditpros.com/in/kolkata/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'kol-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '" loading="lazy" decoding="async" />';
}
const STOCK = {
  plate: 'kol-howrah-purple-sky', flowers: 'kol-woman-flower-display', food: 'kol-man-food-table', marigold: 'kol-marigold-pile',
  steel: 'kol-yellow-taxi-under-bridge', tram1: 'kol-tram-yellow-blue', tram2: 'kol-tram-yellow-white',
  market: 'kol-crowded-market', mirror: 'kol-victoria-memorial-reflection', speed: 'kol-night-road-timelapse',
  boat: 'kol-rowing-boat-vidyasagar-setu', band: 'kol-bridge-lit-at-night',
};

// ---------------------------------------------------------------------------------------------
const HERO = {
  eyebrow: 'Kolkata &amp; West Bengal &mdash; SEO, websites and ERP',
  h1: 'SEO consultant or SEO company in Kolkata? <span>Here is how to weigh it.</span>',
  sub: 'Kolkata is the one city in India that searches for a consultant as often as for a company, and it is the city where the same word is sold at &#8377;7,500 a month and at &#8377;2,00,000. We are a team in Kochi with no Kolkata office, a staging URL you can open every week and a written report every month &mdash; and this page tells you when a consultant is the better answer.',
};
const ANSWER = 'TechAuditPros provides <strong>SEO, website and e-commerce development, and custom ERP</strong> to businesses in <strong>Kolkata</strong> &mdash; Salt Lake and New Town, Park Street and Ballygunge, Howrah and the south &mdash; from an engineering team in Kochi in the same time zone. No Kolkata office; a weekly staging URL and a monthly written report instead. Kolkata searches for a consultant almost as often as for a company: a consultant is one person&rsquo;s judgement and is often the right buy; a team is continuity plus a developer who ships the fix. We say which on the first call, and the first thirty days here are almost always the Google Business Profile.';

const PANS = {
  l: { head: 'One consultant', w: ['One person&rsquo;s judgement', 'Cheaper by the month', 'Advice you act on yourself', 'Capacity is the risk'] },
  r: { head: 'A team', w: ['Continuity when someone is away', 'A developer ships the fix', 'Search, site and system together', 'Costs more than one person'] },
};

const PROFILE = [
  ['Business name', 'Exactly as it appears on the signboard and the GST certificate'],
  ['Primary category', 'The one your best customer would search, not the broadest'],
  ['Address &amp; pin', 'Identical everywhere it appears &mdash; site, directories, invoices'],
  ['Hours', 'True this month, including Durga Puja closures'],
  ['Photographs', 'Twelve recent ones of the actual premises, not stock'],
  ['Reviews', 'A steady habit after every completed job, answered within a day'],
  ['Services &amp; products', 'Named the way Kolkata searches for them, in English and Bengali'],
  ['Q&amp;A', 'The questions your counter staff answer daily, written down once'],
];

const TERMINAL = [
  'indexation      pages Google has not indexed, and why',
  'canonicals      duplicate URLs pointing at the wrong version',
  'core-web-vitals measured on a mid-range Android on Jio, not a laptop',
  'schema          LocalBusiness, Product, FAQ, Breadcrumb — validated',
  'hreflang        Bengali and English pages declared to each other',
  'crawl-budget    parameter URLs and filters eating the crawl',
  'js-rendering    content that exists only after scripts run',
  'redirects       301 map after a redesign or a domain move',
  'sitemaps        current, split, and submitted',
  'internal-links  money pages three clicks from anywhere, not eight',
  'images          weight, dimensions, alt text — product by product',
  'server          response time and caching before anything else',
];

const STOPS = [
  ['Salt Lake Sector V', 'IT services and BPOs whose buyers search in English, from other cities.'],
  ['New Town &amp; Rajarhat', 'New clinics, schools, showrooms &mdash; map results decide the first visit.'],
  ['Dum Dum &amp; Barasat', 'Retail and services with strong local names and no online footprint.'],
  ['Park Street', 'Hospitality and professional firms competing on brand and reviews.'],
  ['Ballygunge &amp; Alipore', 'Established practices &mdash; doctors, lawyers, schools &mdash; with dated sites.'],
  ['Tollygunge &amp; Jadavpur', 'Education and coaching, with seasonal search that spikes in May.'],
  ['Garia &amp; Behala', 'Household services and small manufacturers selling across the state.'],
  ['Howrah', 'Engineering units and wholesale, where the order system is the first project.'],
];

const LADDER = [
  ['&#8377;7,500 / month', 'a three-tier agency&rsquo;s starter plan: 10 pages, 10 phrases'],
  ['&#8377;15,000 / month', 'the most-quoted figure in the city: three agencies start here'],
  ['&#8377;22,000 / month', 'the same agency&rsquo;s top tier: 50 pages, 50 phrases'],
  ['&#8377;50,000 / month', 'a technical agency&rsquo;s advanced retainer'],
  ['&#8377;2,00,000 / month', 'the top of the largest agency&rsquo;s published range'],
];
const DRIVERS = [
  ['How many pages actually matter', 'A clinic has five pages that earn money. A distributor with 400 SKUs has 400. The tiers above are counting pages; that is the honest part of them.'],
  ['Whether the site needs a developer first', 'Half of Kolkata&rsquo;s sites are slow on a mid-range phone and half-indexed. Until that is fixed, content money is spent on pages nobody can load.'],
  ['Who ships the changes', 'A consultant&rsquo;s recommendations wait for your developer. Ours ship the week they are found, because the developer is on the team.'],
  ['One discipline or three', 'Search alone; search plus a site; search plus a site plus the stock system. Sequenced, cheaper and calmer.'],
];

const WHEN = {
  l: ['The job is defined: a Business Profile, one campaign, one set of pages, or a second opinion on an agency&rsquo;s work.', 'You have a developer of your own who can make the changes a consultant recommends.', 'You want to learn and act yourself. Several Kolkata consultants teach, and teach well.'],
  r: ['The work spans the website, the search work and the systems behind them &mdash; three jobs one person cannot carry at once.', 'Continuity matters: a shop cannot stop for one person&rsquo;s holiday, illness or better client.', 'You would rather see the work &mdash; a staging URL, a written report &mdash; than a face in your office.'],
};

const BLOCKS = ['nav', 'hero', 'p', 'p', 'p', 'p', 'p', 'p', 'foot'];
const REPORT = [['Home', 40], ['Category: sarees', 78], ['Category: gold', 62], ['Blog', 22], ['Contact', 55], ['Locations', 70]];

const CHECK = [
  ['Who, by name, does the work?', 'A consultant answers this in one word. An agency should be able to as well; if the answer is a department, you are buying a process.'],
  ['What ships in the first thirty days?', 'For most Kolkata businesses the honest answer is the Business Profile and the technical layer. If it is &ldquo;keyword research&rdquo;, ask what happens in month two.'],
  ['Can I open the staging site now?', 'Work in progress is visible or it is not happening yet.'],
  ['Why is your price what it is?', 'Not &ldquo;how much&rdquo; &mdash; &ldquo;why&rdquo;. The answer should mention your pages, your site&rsquo;s condition and who ships changes, not a tier name.'],
  ['What do I keep if I stop in month three?', 'Accounts, code, content, reports. If any of it stays with the supplier, the quoted price is not the price.'],
  ['Which results were yours alone?', 'Case-study percentages are easy. Ask how much was the client&rsquo;s own ads, season or team.'],
];

const FAQS = [
  { q: 'Should I hire an SEO consultant or an SEO company in Kolkata?', a: 'Hire a consultant when the job is defined &mdash; a Business Profile, a campaign, a second opinion &mdash; and you have a developer who can make the changes; hire a company when the work spans the website, the search work and the systems behind them, or when continuity matters more than the lowest monthly figure. Kolkata searches for both almost equally, and both are legitimate. They fail differently: a consultant fails on capacity, a company fails when you never meet whoever does the work. We are a team you meet, and we will tell you on the call if a consultant is the better answer.' },
  { q: 'Do you have an office in Kolkata?', a: 'No. We are in Kochi and work with Kolkata clients remotely, in the same time zone, with a weekly staging URL you can open yourself and a written monthly report. We visit for a kick-off or a systems project when it earns the journey. If you need regular in-person presence, hire in Salt Lake or Park Street and we will say so.' },
  { q: 'What does SEO cost in Kolkata?', a: 'Published figures on the first page of Google for this search run from &#8377;7,500 a month (a starter tier) through &#8377;15,000 (where three agencies start) and &#8377;22,000 (the same agency&rsquo;s top tier) to &#8377;50,000 retainers and a &#8377;2,00,000 ceiling &mdash; all September 2026, all theirs. The 26-fold spread under one word is the point: the tiers count pages and phrases, and a five-page clinic and a 400-SKU distributor are not the same job. We do not publish a rate card; you get a written plan for the first ninety days and a price against it.' },
  { q: 'What should local SEO in Kolkata actually involve?', a: 'A complete and correct Google Business Profile &mdash; the right primary category, an address identical everywhere, hours that are true this month, twelve recent photographs of the actual premises &mdash; plus a steady habit of asking for reviews after every completed job, and pages that answer the questions your counter staff answer daily, in English and Bengali where it earns it. Most winnable local terms here are contested by incomplete profiles, which is why this is the first thirty days.' },
  { q: 'How long before we see results?', a: 'Technical fixes can move within days if pages were blocked rather than outranked; profile work in weeks; improving pages already ranking between 8th and 20th usually shows in one to three months; a new page on a commercial term takes four to nine. Anyone quoting one number for all four is guessing.' },
  { q: 'Do you work in Bengali?', a: 'Written reporting is in English; conversations happen in English or Hindi, and we write Bengali pages when the search data shows your customers search in Bengali &mdash; for many local services they do. Bilingual sites get the hreflang and the structure right so the two languages help each other rather than compete.' },
  { q: 'Do you build websites and e-commerce stores in Kolkata?', a: 'Yes &mdash; WordPress when everyone needs to edit it, Shopify or WooCommerce for a catalogue that must sell next month, Next.js or React when the catalogue or pricing is unusual. Always fast on a mid-range phone, always with the repository and hosting handed to you, and with the storefront connected to the stock system so the number on the page is true.' },
  { q: 'Do you build ERP for Kolkata businesses?', a: 'Yes. Stock, orders, purchasing, production and job costing in one system, connected to the accounting package you already keep. Wholesale and trading houses, Howrah&rsquo;s engineering units, garment and saree businesses and distributors are the ones we see most. Often it is the first project, because search work on a site that shows the wrong stock is wasted.' },
  { q: 'How do I know work is happening each month?', a: 'You open the staging URL and see what changed; you read the monthly report and check it against the ninety-day plan; you ask for the commit history if you like. If a supplier cannot show you the work before it goes live, you are being asked to trust the invoice.' },
  { q: 'What happens if I stop after three months?', a: 'You keep everything: code, accounts, content, the report history and the plan. No notice period measured in quarters, no retainer trap. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
  { q: 'Do you serve Salt Lake, New Town and Howrah as well as central Kolkata?', a: 'Yes, and the work differs by area: Sector V firms sell to other cities in English; New Town clinics and schools live on map results; Howrah&rsquo;s engineering units usually need the order system before the website. The search data even separates Salt Lake as its own term, and the pages are written that way.' },
  { q: 'Is a freelancer or consultant cheaper than you?', a: 'Usually, yes, by the month, and for a defined job that is the right choice &mdash; we say so above and we will say so on the call. Where the comparison changes is when the site needs a developer, when the work spans three disciplines, or when you count what happens the month your one person is unavailable.' },
];

// ---------------------------------------------------------------------------------------------
const head = (n, label, title, lede) => [
  '      <div class="kol-head">',
  '        <p class="kol-slate"><i></i><b>' + n + '</b><span>' + label + '</span></p>',
  '        <h2 class="kol-h2">' + title + '</h2>',
  lede ? '        <p class="kol-lede">' + lede + '</p>' : '',
  '      </div>',
].filter(Boolean).join('\n');

const pan = (side, p) => '      <div class="kol-pan ' + side + '"><h3>' + p.head + '</h3>' + p.w.map((w, i) => '<span class="wt" style="--d:' + i + '">' + w + '</span>').join('') + '</div>';
const ACT_SCALE = [
  '<section class="kol dark" id="kol-scale" aria-label="The scale">',
  '  <div class="container kol-two">',
  '    <div>',
  head('01', 'The scale', 'Consultant or company. Kolkata asks the question; almost nobody answers it honestly.', 'The search data for this city is rare: &ldquo;SEO consultant Kolkata&rdquo; is searched almost as often as &ldquo;SEO company&rdquo;. The consultants ranking for it publish no prices and no FAQs; the agencies publish tiers from &#8377;7,500 to &#8377;2,00,000 a month under the same word. Both sides are selling their own answer. We are a team, so we have a side too &mdash; which is why we built the scale and put weights in both pans.'),
  '      <ul class="kol-facts"><li><b>250+</b> projects delivered</li><li><b>128+</b> active clients</li><li><b>16</b> countries served</li><li><b>4.9/5</b> client rating</li></ul>',
  '      <div class="kol-cta-row"><a class="kol-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="kol-btn ghost" href="#kol-when">When each is right &darr;</a></div>',
  '    </div>',
  '    <div class="kol-stage" role="img" aria-label="A balance scale over Howrah Bridge: weights drop into a consultant pan and a team pan and the beam settles level">',
  '      <div class="kol-plate">' + img(STOCK.plate, 'Howrah Bridge against a purple evening sky', '(max-width:860px) 100vw, 58vw') + '</div>',
  '      <div class="kol-balance">',
  '        <div class="kol-post"></div>',
  '        <div class="kol-beam"><div class="kol-string l"></div><div class="kol-string r"></div></div>',
  pan('l', PANS.l),
  pan('r', PANS.r),
  '      </div>',
  '      <p class="kol-stage-cap">Both are right. Weigh the job, not the label.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_PROFILE = [
  '<section class="kol" id="kol-local" aria-label="The first thirty days">',
  '  <div class="container">',
  head('02', 'The first thirty days', 'In Kolkata the first thirty days are almost always the Business Profile.', 'A striking share of the winnable local terms here &mdash; &ldquo;local SEO Kolkata&rdquo; is 480 searches a month at a difficulty of 10 &mdash; are contested by profiles that are incomplete: wrong categories, photographs from 2019, hours that stopped being true two Pujas ago, no steady reviews. That work is cheap, fast and measurable, and most suppliers skip it because it is not glamorous. It is where we start.'),
  '    <div class="kol-three">',
  '      <figure class="kol-pola" style="--d:0">' + img(STOCK.flowers, 'A woman behind a colourful flower display at a Kolkata market', '(max-width:860px) 92vw, 28vw') + '<figcaption>Every one of these is a local business Google cannot find.</figcaption></figure>',
  '      <div class="kol-profile" aria-label="A Google Business Profile filling in field by field">',
  '        <div class="ph"><span class="dot"></span><b>Business Profile</b><span class="st">8 of 8 complete</span></div>',
  ...PROFILE.map(([k, v], i) => '        <div class="row" style="--d:' + i + '"><span class="k">' + k + '</span><span class="v">' + v + '</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg></div>'),
  '      </div>',
  '      <figure class="kol-pola" style="--d:1">' + img(STOCK.food, 'A man at a table filled with food in a Kolkata market', '(max-width:860px) 92vw, 28vw') + '<figcaption>The map results decide who walks in.</figcaption></figure>',
  '    </div>',
  '    <figure class="kol-strip">' + img(STOCK.marigold, 'A pile of orange and yellow marigolds at the Kolkata flower market', '100vw') + '<figcaption>Mullick Ghat, 6 a.m. Local search works the same way: whoever is complete and present gets the sale.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_TERM = [
  '<section class="kol dark" id="kol-tech" aria-label="The technical layer">',
  '  <div class="container kol-two rev">',
  '    <figure class="kol-side">' + img(STOCK.steel, 'Yellow taxis crossing beneath the steel lattice of Howrah Bridge', '(max-width:860px) 100vw, 40vw') + '<figcaption>The structure nobody looks at carries everything that crosses it.</figcaption></figure>',
  '    <div>',
  head('03', 'The technical layer', 'Then the layer a consultant rarely fixes and an agency rarely mentions.', 'One Kolkata agency sells nineteen technical items as a package. We do the engineering half of search every day, so here is ours in plain terms &mdash; twelve things, checked on every site before a word of content is written, because every one of them caps everything else.'),
  '      <div class="kol-term" aria-label="Twelve technical checks">',
  '        <div class="tbar"><i></i><i></i><i></i><span>techauditpros ~ kolkata-client</span></div>',
  ...TERMINAL.map((l, i) => { const [k, ...rest] = l.split(/\s+/); return '        <div class="tl" style="--d:' + i + '"><span class="pr">&gt;</span><span class="k">' + k + '</span><span class="v">' + rest.join(' ') + '</span></div>'; }),
  '        <div class="tl cur" style="--d:' + TERMINAL.length + '"><span class="pr">&gt;</span><span class="caret"></span></div>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

// tram route: a winding path through a 100x62 map, stops placed along it (fractions of the path)
const ROUTE = 'M6 10 C 22 4, 30 22, 44 18 S 66 6, 74 20 S 60 40, 48 44 S 30 60, 52 56 S 84 50, 94 56';
// x, y on the 100x62 map, and where the label sits so none collide at 780px or 340px: a=above b=below l=left ''=right
const STOP_POS = [[6, 10, 'a'], [28, 14, 'b'], [44, 18, 'b'], [62, 9, ''], [74, 20, ''], [60, 38, ''], [42, 52, ''], [78, 53, 'l']];
const ACT_ROUTE = [
  '<section class="kol alt" id="kol-route" aria-label="Where in Kolkata">',
  '  <div class="container">',
  head('04', 'Where in Kolkata', 'Eight stops, thirteen neighbourhoods, and what a business in each tends to need.', 'The agencies ranking for this search list twenty localities as keywords. These are the eight stops we actually see work come from, with the first project each one usually needs.'),
  '    <div class="kol-two wide">',
  '      <div class="kol-map" role="img" aria-label="A tram route through Kolkata with eight stops lighting as the line reaches them">',
  '        <svg viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true"><path class="rail bg" d="' + ROUTE + '" /><path class="rail" d="' + ROUTE + '" pathLength="1" /></svg>',
  ...STOPS.map(([n], i) => '        <div class="stop' + (STOP_POS[i][2] ? ' ' + STOP_POS[i][2] : '') + '" style="left:' + STOP_POS[i][0] + '%;top:' + (STOP_POS[i][1] / 62 * 100).toFixed(1) + '%;--d:' + i + '"><i></i><b>' + n + '</b></div>'),
  '      </div>',
  '      <div class="kol-mapphotos">',
  '        <figure class="kol-mphoto" style="--d:0">' + img(STOCK.tram1, 'A yellow and blue tram on a Kolkata street', '(max-width:860px) 92vw, 30vw') + '</figure>',
  '        <figure class="kol-mphoto" style="--d:1">' + img(STOCK.tram2, 'Yellow and white trams at a Kolkata depot', '(max-width:860px) 92vw, 30vw') + '</figure>',
  '      </div>',
  '    </div>',
  '    <ol class="kol-stops">',
  ...STOPS.map(([n, p], i) => '      <li style="--d:' + i + '"><b>' + n + '</b><span>' + p + '</span></li>'),
  '    </ol>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_LADDER = [
  '<section class="kol dark" id="kol-cost" aria-label="What SEO costs in Kolkata">',
  '  <div class="container kol-two">',
  '    <div>',
  head('05', 'What it costs', 'The same word, sold at &#8377;7,500 and at &#8377;2,00,000 a month.', 'Kolkata is the most price-published SEO market in India. The figures on the ladder are the ranking agencies&rsquo; own, as published in September 2026; ours is not on it, because a rung with a name on it is not a plan.'),
  '      <div class="kol-drivers">',
  ...DRIVERS.map(([h, p], i) => '        <div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>'),
  '      </div>',
  '      <p class="kol-p on-dark">What we publish instead: a written plan for the first ninety days, what you will have at the end of it, and what you keep if you stop. Put it beside any rung on the ladder and the price will explain itself.</p>',
  '    </div>',
  '    <div>',
  '      <figure class="kol-side short">' + img(STOCK.market, 'A crowded Kolkata market bustling with people', '(max-width:860px) 100vw, 46vw') + '<figcaption>A market, in the literal sense.</figcaption></figure>',
  '      <ol class="kol-ladder" aria-label="Published monthly SEO prices in Kolkata">',
  ...LADDER.map(([p, by], i) => '        <li style="--d:' + i + '"><b>' + p + '</b><span>' + by + '</span></li>'),
  '      </ol>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_WHEN = [
  '<section class="kol" id="kol-when" aria-label="When each is right">',
  '  <div class="container">',
  head('06', 'When each is right', 'The answer to the scale, in words.', 'Read both columns. If the left one describes you, hire a consultant &mdash; several good ones rank on this search &mdash; and come back when the work outgrows one person.'),
  '    <figure class="kol-mirror">' + img(STOCK.mirror, 'The Victoria Memorial reflected in still water under a pink sky', '100vw') + '</figure>',
  '    <div class="kol-cols">',
  '      <div class="kol-col l" style="--d:0"><h3>Hire a consultant when</h3>' + WHEN.l.map(p => '<p>' + p + '</p>').join('') + '</div>',
  '      <div class="kol-col r" style="--d:1"><h3>Hire a team when</h3>' + WHEN.r.map(p => '<p>' + p + '</p>').join('') + '</div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_STORE = [
  '<section class="kol alt" id="kol-web" aria-label="Websites and e-commerce">',
  '  <div class="container kol-two">',
  '    <div>',
  head('07', 'Websites &amp; e-commerce', 'A site built to load on a mid-range phone in Garia, and to show the stock you actually have.', 'Kolkata searches for a website developer and for e-commerce development in three different phrasings. What it needs is the same in all three: fast on the phones people here actually own, editable by your own staff, owned by you, and connected to the system that knows what is in stock.'),
  '      <ul class="kol-list"><li><b>WordPress</b> when everyone needs to edit it.</li><li><b>Shopify or WooCommerce</b> when the catalogue must be selling next month.</li><li><b>Next.js / React</b> when the catalogue, pricing or stock model is unusual.</li><li><b>Always:</b> a staging URL from week one, the repository and hosting handed to you, Core Web Vitals measured on a &#8377;12,000 Android.</li></ul>',
  '    </div>',
  '    <div>',
  '      <div class="kol-wire" aria-label="A storefront wireframe assembling itself block by block">',
  '        <div class="wbar"><i></i><i></i><i></i><span>yourstore.in</span></div>',
  '        <div class="wgrid">' + BLOCKS.map((b, i) => '<div class="wb ' + b + '" style="--d:' + i + '"></div>').join('') + '</div>',
  '      </div>',
  '      <figure class="kol-side short" style="margin-top:14px">' + img(STOCK.speed, 'Light trails on a Kolkata road at night', '(max-width:860px) 100vw, 46vw') + '<figcaption>Speed is the feature. Everything else is a feature of speed.</figcaption></figure>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_REPORT = [
  '<section class="kol dark" id="kol-report" aria-label="What you get every month">',
  '  <div class="container kol-two rev">',
  '    <div class="kol-report" aria-label="The shape of the monthly report">',
  '      <div class="rh"><b>Monthly report</b><span>revenue by landing page &middot; illustrative shape, not a client&rsquo;s numbers</span></div>',
  '      <div class="bars">' + REPORT.map(([l, v], i) => '<div class="bar" style="--v:' + v + '%;--d:' + i + '"><i></i><span>' + l + '</span></div>').join('') + '</div>',
  '      <div class="rf"><span>Shipped this month: 14 changes</span><span>Staging: open any time</span><span>Plan: day 61 of 90</span></div>',
  '    </div>',
  '    <div>',
  head('08', 'Every month', 'What you actually get, month by month.', 'Not rankings by keyword: revenue and enquiries by page, what shipped, what is next, and where we are against the ninety-day plan. The staging URL is open every week; the report is written every month; the commit history is yours to read.'),
  '      <p class="kol-p on-dark">The point of showing you the shape is honesty about what it is not: it is not a screenshot of positions, and it is not a dashboard you are left to interpret. If a page ranks and does not sell, the report says so and the next month&rsquo;s plan fixes the page.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_CHECK = [
  '<section class="kol" id="kol-check" aria-label="Before you hire anyone in Kolkata">',
  '  <div class="container kol-two">',
  '    <div>',
  head('09', 'Before you hire anyone', 'Six questions for any consultant or company in Kolkata &mdash; including us.', 'This city has good consultants and good agencies. These questions separate the ones who do the work from the ones who sell it, whichever kind you are talking to.'),
  '      <ol class="kol-qs">',
  ...CHECK.map(([q, p], i) => '        <li style="--d:' + i + '"><b><span>0' + (i + 1) + '</span></b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>'),
  '      </ol>',
  '    </div>',
  '    <figure class="kol-side tall">' + img(STOCK.boat, 'A wooden boat rowed with passengers under the Vidyasagar Setu at dusk', '(max-width:860px) 100vw, 40vw') + '<figcaption>A steady hand, and you can see the whole boat.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="kol-band" aria-label="No office in Kolkata">',
  '  <div class="kol-bandfig">' + img(STOCK.band, 'Howrah Bridge lit gold at night, reflected in the Hooghly', '100vw') + '</div>',
  '  <div class="container kol-bandtext"><p class="kol-slate"><i></i><span>No office in Kolkata</span></p><h2 class="kol-h2">A team you can see working, every week.</h2><p>Message us on WhatsApp, book a call, or tell us whether you were looking for a consultant or a company &mdash; we will help you decide, even if the answer is not us.</p><a class="kol-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= in_kolkata.js : the page's own design ================= */
  .kol{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; }
  .kol.dark{ background:var(--navy-deep); color:#fff; }
  .kol.alt{ background:#F3F6F5; }
  .kol-band, .kol-strip, .kol-mirror{ width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .kol-two{ display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,64px); align-items:center; }
  @media (min-width:860px){ .kol-two{ grid-template-columns:5fr 7fr; } .kol-two.rev{ grid-template-columns:5fr 7fr; } .kol-two.wide{ grid-template-columns:7fr 5fr; align-items:start; } }
  .kol-head{ max-width:64ch; margin-bottom:clamp(22px,3vw,40px); }
  .kol-slate{ display:flex; align-items:center; gap:10px; margin:0 0 12px; font-family:var(--font-mono); }
  .kol-slate i{ width:10px; height:10px; border-radius:50%; background:var(--orange); flex:none; }
  .kol-slate b{ font-size:.9rem; color:var(--orange); letter-spacing:.08em; }
  .kol-slate span{ font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }
  .kol.dark .kol-slate span, .kol-band .kol-slate span{ color:rgba(255,255,255,.55); }
  .kol-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); }
  .kol.dark .kol-h2, .kol-band .kol-h2{ color:#fff; }
  .kol-lede, .kol-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:66ch; }
  .kol.dark .kol-lede, .kol-p.on-dark, .kol.dark .kol-p{ color:rgba(255,255,255,.8); }
  .kol-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .kol-btn:hover{ background:var(--orange-dark); }
  .kol-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.35); color:#fff; }
  .kol-cta-row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }
  .kol-facts{ list-style:none; padding:0; margin:18px 0 22px; display:grid; grid-template-columns:repeat(2,1fr); gap:10px 18px; }
  .kol-facts li{ font-size:.86rem; color:rgba(255,255,255,.7); font-family:var(--font-mono); }
  .kol-facts b{ display:block; font-size:1.5rem; color:#fff; letter-spacing:-.02em; }
  .kol-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .kol-side{ margin:0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:14px; }
  .kol-side.tall{ aspect-ratio:4/5; } .kol-side.short{ aspect-ratio:16/9; }
  .kol-side figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  .kol-list{ margin:0; padding:0 0 0 18px; color:var(--ink-soft); line-height:1.6; }
  .kol-list li{ margin-bottom:8px; } .kol-list b{ color:var(--ink); }

  /* 01 — the scale */
  .kol-stage{ position:relative; }
  .kol-plate{ position:relative; aspect-ratio:16/10; overflow:hidden; border-radius:12px; background:rgba(255,255,255,.06); }
  .kol-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(11,32,54,.2) 0%, rgba(11,32,54,.7) 100%); }
  .kol-balance{ position:absolute; inset:0; }
  .kol-post{ position:absolute; left:50%; top:18%; bottom:10%; width:6px; margin-left:-3px; background:rgba(255,255,255,.85); border-radius:3px; }
  .kol-post::after{ content:''; position:absolute; left:50%; bottom:-2px; width:120px; margin-left:-60px; height:8px; border-radius:4px; background:rgba(255,255,255,.85); }
  .kol-beam{ position:absolute; left:10%; right:10%; top:18%; height:6px; background:var(--orange); border-radius:3px; transform-origin:50% 50%; }
  .kol-string{ position:absolute; top:6px; width:2px; height:38px; background:rgba(255,255,255,.75); }
  .kol-string.l{ left:0; } .kol-string.r{ right:0; }
  .kol-pan{ position:absolute; top:calc(18% + 44px); width:38%; background:rgba(4,9,20,.82); border:1px solid rgba(255,255,255,.18); border-radius:10px; padding:12px 12px 8px; transform-origin:50% 0; }
  .kol-pan.l{ left:calc(10% - 19% + 1px); } .kol-pan.r{ right:calc(10% - 19% + 1px); }
  .kol-pan h3{ margin:0 0 8px; font-size:.95rem; color:#fff; font-family:var(--font-mono); letter-spacing:.04em; }
  .kol-pan .wt{ display:block; font-size:.78rem; line-height:1.35; color:rgba(255,255,255,.85); background:rgba(255,255,255,.1); border-radius:6px; padding:5px 8px; margin-bottom:5px; }
  .kol-stage-cap{ margin:14px 0 0; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.04em; color:rgba(255,255,255,.62); }
  @media (max-width:860px){ .kol-plate{ aspect-ratio:4/5; } .kol-pan{ width:44%; } .kol-pan.l{ left:calc(10% - 22% + 1px); } .kol-pan.r{ right:calc(10% - 22% + 1px); } .kol-pan .wt{ font-size:.68rem; } }

  /* 02 — the profile card */
  .kol-three{ display:grid; grid-template-columns:1fr; gap:22px; align-items:center; margin-bottom:clamp(26px,3vw,44px); }
  @media (min-width:860px){ .kol-three{ grid-template-columns:3fr 5fr 3fr; } }
  .kol-pola{ margin:0; background:#fff; padding:10px 10px 12px; border-radius:6px; box-shadow:0 14px 34px rgba(14,42,62,.18); }
  .kol-pola .kol-img{ aspect-ratio:4/5; border-radius:3px; }
  .kol-pola figcaption{ margin-top:10px; font-size:.82rem; color:var(--ink-soft); font-family:var(--font-mono); }
  .kol-profile{ border:1px solid var(--line); border-radius:14px; background:#fff; overflow:hidden; box-shadow:0 20px 50px rgba(14,42,62,.12); }
  .kol-profile .ph{ display:flex; align-items:center; gap:10px; padding:14px 18px; background:var(--navy-deep); color:#fff; }
  .kol-profile .ph .dot{ width:10px; height:10px; border-radius:50%; background:#3DDC84; }
  .kol-profile .ph .st{ margin-left:auto; font-family:var(--font-mono); font-size:.7rem; color:rgba(255,255,255,.6); }
  .kol-profile .row{ display:grid; grid-template-columns:150px 1fr 24px; gap:12px; align-items:center; padding:11px 18px; border-bottom:1px solid var(--line); }
  .kol-profile .row:last-child{ border-bottom:0; }
  .kol-profile .k{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); }
  .kol-profile .v{ font-size:.9rem; color:var(--ink); line-height:1.4; position:relative; }
  .kol-profile svg{ width:22px; height:22px; } .kol-profile path{ fill:none; stroke:#2E9E5B; stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
  @media (max-width:560px){ .kol-profile .row{ grid-template-columns:1fr 24px; } .kol-profile .k{ grid-column:1 / -1; } }
  .kol-strip{ position:relative; aspect-ratio:21/8; overflow:hidden; margin-top:clamp(26px,3vw,44px); }
  .kol-strip figcaption{ position:absolute; left:50%; transform:translateX(-50%); bottom:clamp(14px,3vw,36px); width:min(92vw,900px); text-align:center; color:#fff; font-size:clamp(1rem,1.6vw,1.35rem); text-shadow:0 2px 14px rgba(0,0,0,.7); }
  @media (max-width:700px){ .kol-strip{ aspect-ratio:4/3; } }

  /* 03 — the terminal */
  .kol-term{ background:#07131F; border:1px solid rgba(255,255,255,.14); border-radius:12px; font-family:var(--font-mono); font-size:.86rem; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,.4); }
  .kol-term .tbar{ display:flex; align-items:center; gap:6px; padding:10px 14px; background:rgba(255,255,255,.06); border-bottom:1px solid rgba(255,255,255,.1); }
  .kol-term .tbar i{ width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,.25); }
  .kol-term .tbar span{ margin-left:10px; font-size:.72rem; color:rgba(255,255,255,.5); }
  .kol-term .tl{ display:grid; grid-template-columns:16px 130px 1fr; gap:10px; padding:7px 14px; line-height:1.4; }
  .kol-term .pr{ color:var(--orange); } .kol-term .k{ color:#7FD1FF; } .kol-term .v{ color:rgba(255,255,255,.82); }
  .kol-term .caret{ display:inline-block; width:9px; height:15px; background:#fff; animation:kolBlink 1s steps(1) infinite; }
  @keyframes kolBlink{ 50%{ opacity:0; } }
  @media (max-width:560px){ .kol-term .tl{ grid-template-columns:16px 1fr; } .kol-term .v{ grid-column:2; } }

  /* 04 — the route */
  .kol-map{ position:relative; aspect-ratio:100/62; }
  .kol-map svg{ position:absolute; inset:0; width:100%; height:100%; overflow:visible; }
  .kol-map .rail{ fill:none; stroke:var(--orange); stroke-width:4; stroke-linecap:round; vector-effect:non-scaling-stroke; }
  .kol-map .rail.bg{ stroke:var(--line-strong); }
  .kol-map .stop{ position:absolute; width:0; height:0; }
  .kol-map .stop i{ position:absolute; left:-8px; top:-8px; width:16px; height:16px; border-radius:50%; background:#fff; border:4px solid var(--orange); }
  .kol-map .stop b{ position:absolute; left:12px; top:-11px; white-space:nowrap; font-size:.78rem; background:#fff; border:1px solid var(--line); border-radius:6px; padding:3px 8px; color:var(--ink); }
  .kol-map .stop.l b{ left:auto; right:12px; }
  .kol-map .stop.a b{ left:-10px; top:-40px; }
  .kol-map .stop.b b{ left:-10px; top:14px; }
  .kol-mapphotos{ display:grid; gap:14px; }
  .kol-mphoto{ margin:0; aspect-ratio:4/3; overflow:hidden; border-radius:12px; }
  .kol-stops{ list-style:none; margin:clamp(22px,3vw,36px) 0 0; padding:0; display:grid; grid-template-columns:1fr; gap:10px 28px; }
  @media (min-width:760px){ .kol-stops{ grid-template-columns:1fr 1fr; } }
  .kol-stops li{ display:grid; grid-template-columns:170px 1fr; gap:10px; padding:10px 0; border-bottom:1px solid var(--line); font-size:.92rem; }
  .kol-stops b{ color:var(--ink); } .kol-stops span{ color:var(--ink-soft); line-height:1.5; }
  @media (max-width:560px){ .kol-map .stop b{ font-size:.62rem; } .kol-map .stop.l b{ left:-10px; right:auto; top:14px; } .kol-stops li{ grid-template-columns:1fr; } .kol-mapphotos{ grid-template-columns:1fr 1fr; } }

  /* 05 — the ladder */
  .kol-drivers{ display:grid; gap:14px; margin:8px 0 18px; }
  .kol-drivers .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; }
  .kol-drivers .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; }
  .kol-drivers .drv h3{ margin:0; font-size:1.02rem; color:#fff; }
  .kol-drivers .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:rgba(255,255,255,.72); }
  .kol-ladder{ list-style:none; margin:18px 0 0; padding:0 0 0 34px; position:relative; }
  .kol-ladder::before, .kol-ladder::after{ content:''; position:absolute; top:0; bottom:0; width:4px; border-radius:2px; background:rgba(255,255,255,.35); transform-origin:bottom center; }
  .kol-ladder::before{ left:10px; } .kol-ladder::after{ left:auto; right:10px; }
  .kol-ladder li{ position:relative; display:flex; justify-content:space-between; gap:14px; align-items:baseline; padding:14px 18px; margin:0 20px 10px 0; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); border-radius:8px; transform-origin:left center; }
  .kol-ladder li:first-child{ background:rgba(217,83,30,.28); border-color:rgba(217,83,30,.55); }
  .kol-ladder li:last-child{ background:rgba(217,83,30,.28); border-color:rgba(217,83,30,.55); }
  .kol-ladder b{ font-family:var(--font-mono); font-size:1.02rem; color:#fff; white-space:nowrap; }
  .kol-ladder span{ font-size:.82rem; color:rgba(255,255,255,.7); text-align:right; }
  @media (max-width:560px){ .kol-ladder li{ flex-direction:column; align-items:flex-start; } .kol-ladder span{ text-align:left; } }

  /* 06 — the mirror */
  .kol-mirror{ position:relative; aspect-ratio:21/7; overflow:hidden; margin-bottom:-60px; }
  .kol-mirror::after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(255,255,255,0) 40%, #fff 100%); }
  @media (max-width:700px){ .kol-mirror{ aspect-ratio:16/9; } }
  .kol-cols{ position:relative; z-index:2; display:grid; grid-template-columns:1fr; gap:18px; }
  @media (min-width:760px){ .kol-cols{ grid-template-columns:1fr 1fr; } }
  .kol-col{ background:#fff; border:1px solid var(--line); border-radius:14px; padding:clamp(20px,2.6vw,32px); box-shadow:0 20px 50px rgba(14,42,62,.14); }
  .kol-col.r{ background:var(--navy-deep); color:#fff; border-color:var(--navy-deep); }
  .kol-col h3{ margin:0 0 12px; font-size:1.2rem; }
  .kol-col p{ margin:0 0 10px; font-size:.95rem; line-height:1.6; color:var(--ink-soft); }
  .kol-col.r p{ color:rgba(255,255,255,.84); }

  /* 07 — the wireframe */
  .kol-wire{ background:#fff; border:1px solid var(--line); border-radius:12px; overflow:hidden; box-shadow:0 20px 50px rgba(14,42,62,.14); }
  .kol-wire .wbar{ display:flex; align-items:center; gap:6px; padding:10px 14px; background:#EEF2F1; border-bottom:1px solid var(--line); }
  .kol-wire .wbar i{ width:10px; height:10px; border-radius:50%; background:#C3CDCA; }
  .kol-wire .wbar span{ margin-left:10px; font-family:var(--font-mono); font-size:.72rem; color:var(--ink-faint); }
  .kol-wire .wgrid{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; padding:14px; }
  .kol-wire .wb{ border-radius:6px; background:#E4EAE8; min-height:34px; }
  .kol-wire .wb.nav{ grid-column:1 / -1; height:26px; background:var(--navy-deep); }
  .kol-wire .wb.hero{ grid-column:1 / -1; height:90px; background:linear-gradient(135deg, var(--orange-tint), #FBD3C2); }
  .kol-wire .wb.p{ aspect-ratio:1; background:#E4EAE8; position:relative; }
  .kol-wire .wb.p::after{ content:''; position:absolute; left:10px; right:30%; bottom:10px; height:6px; border-radius:3px; background:#C3CDCA; }
  .kol-wire .wb.foot{ grid-column:1 / -1; height:26px; background:#C3CDCA; }

  /* 08 — the report */
  .kol-report{ background:#fff; color:var(--ink); border-radius:14px; padding:clamp(18px,2.4vw,28px); box-shadow:0 20px 50px rgba(0,0,0,.35); }
  .kol-report .rh b{ display:block; font-size:1.1rem; } .kol-report .rh span{ font-family:var(--font-mono); font-size:.68rem; letter-spacing:.06em; color:var(--ink-faint); }
  .kol-report .bars{ display:grid; grid-template-columns:repeat(6,1fr); gap:10px; height:200px; align-items:end; margin:18px 0 12px; border-bottom:2px solid var(--line-strong); padding-bottom:0; }
  .kol-report .bar{ display:flex; flex-direction:column; justify-content:flex-end; height:100%; }
  .kol-report .bar i{ display:block; height:var(--v); background:linear-gradient(180deg, var(--orange), var(--orange-dark)); border-radius:6px 6px 0 0; transform-origin:bottom center; }
  .kol-report .bar span{ font-family:var(--font-mono); font-size:.6rem; color:var(--ink-faint); margin-top:6px; text-align:center; line-height:1.2; }
  .kol-report .rf{ display:flex; flex-wrap:wrap; gap:8px 18px; font-family:var(--font-mono); font-size:.68rem; color:var(--ink-soft); }

  /* 09 — the questions */
  .kol-qs{ list-style:none; margin:0; padding:0; }
  .kol-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; border-bottom:1px solid var(--line); }
  .kol-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; perspective:300px; }
  .kol-qs b span{ display:inline-block; transform-origin:50% 50%; }
  .kol-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); }
  .kol-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }

  /* band */
  .kol-band{ position:relative; background:var(--navy-deep); color:#fff; }
  .kol-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; }
  .kol-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(4,9,20,.85) 0%, rgba(4,9,20,.45) 50%, rgba(4,9,20,.15) 100%); }
  .kol-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); }
  .kol-bandtext p{ color:rgba(255,255,255,.8); max-width:46ch; margin:0 0 18px; }
  @media (max-width:700px){ .kol-bandfig{ aspect-ratio:4/5; } }

  /* ================= reveals : start states only under html.kol-on ================= */
  html.kol-on .kol-head .kol-slate i{ transform:scale(0); }
  html.kol-on .kol-head .kol-h2, html.kol-on .kol-head .kol-lede{ opacity:0; transform:translateY(14px); }
  html.kol-on .kol-head.lit .kol-slate i{ animation:kolPop .5s cubic-bezier(.2,.9,.3,1.4) forwards; }
  html.kol-on .kol-head.lit .kol-h2{ animation:kolIn .6s cubic-bezier(.2,.7,.2,1) .1s forwards; }
  html.kol-on .kol-head.lit .kol-lede{ animation:kolIn .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  @keyframes kolIn{ to{ opacity:1; transform:none; } }
  @keyframes kolPop{ to{ transform:none; } }
  /* 01 */
  html.kol-on .kol-stage .kol-plate .kol-img{ transform:scale(1.06); transition:transform 1.8s cubic-bezier(.18,.72,.2,1); }
  html.kol-on .kol-stage.lit .kol-plate .kol-img{ transform:none; }
  html.kol-on .kol-pan .wt{ opacity:0; transform:translateY(-46px); }
  html.kol-on .kol-stage.lit .kol-pan.l .wt{ animation:kolDrop .5s cubic-bezier(.3,.6,.3,1.2) forwards; animation-delay:calc(.5s + var(--d) * .7s); }
  html.kol-on .kol-stage.lit .kol-pan.r .wt{ animation:kolDrop .5s cubic-bezier(.3,.6,.3,1.2) forwards; animation-delay:calc(.85s + var(--d) * .7s); }
  @keyframes kolDrop{ to{ opacity:1; transform:none; } }
  html.kol-on .kol-stage.lit .kol-beam{ animation:kolTilt 3.6s cubic-bezier(.4,0,.3,1) .5s forwards; }
  html.kol-on .kol-stage.lit .kol-pan.l{ animation:kolPanL 3.6s cubic-bezier(.4,0,.3,1) .5s forwards; }
  html.kol-on .kol-stage.lit .kol-pan.r{ animation:kolPanR 3.6s cubic-bezier(.4,0,.3,1) .5s forwards; }
  @keyframes kolTilt{ 0%{ transform:rotate(0); } 15%{ transform:rotate(-5deg); } 30%{ transform:rotate(4deg); } 45%{ transform:rotate(-3.5deg); } 60%{ transform:rotate(3deg); } 75%{ transform:rotate(-1.5deg); } 88%{ transform:rotate(.8deg); } 100%{ transform:rotate(0); } }
  @keyframes kolPanL{ 0%{ transform:translateY(0); } 15%{ transform:translateY(22px); } 30%{ transform:translateY(-18px); } 45%{ transform:translateY(15px); } 60%{ transform:translateY(-13px); } 75%{ transform:translateY(7px); } 88%{ transform:translateY(-3px); } 100%{ transform:translateY(0); } }
  @keyframes kolPanR{ 0%{ transform:translateY(0); } 15%{ transform:translateY(-22px); } 30%{ transform:translateY(18px); } 45%{ transform:translateY(-15px); } 60%{ transform:translateY(13px); } 75%{ transform:translateY(-7px); } 88%{ transform:translateY(3px); } 100%{ transform:translateY(0); } }
  html.kol-on .kol-stage .kol-stage-cap{ opacity:0; }
  html.kol-on .kol-stage.lit .kol-stage-cap{ opacity:1; transition:opacity .5s linear 3.9s; }
  /* 02 */
  html.kol-on .kol-pola{ opacity:0; transform:translateY(-30px) rotate(calc(-6deg + var(--d) * 12deg)); }
  html.kol-on .kol-pola.lit{ animation:kolSettle .8s cubic-bezier(.2,.8,.2,1.15) forwards; }
  @keyframes kolSettle{ to{ opacity:1; transform:rotate(calc(-1.5deg + var(--d) * 3deg)); } }
  html.kol-on .kol-profile .row .v{ clip-path:inset(0 100% 0 0); }
  html.kol-on .kol-profile .row svg{ transform:scale(0); }
  html.kol-on .kol-profile .ph .st{ opacity:0; }
  html.kol-on .kol-profile.lit .row .v{ animation:kolType .45s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(.2s + var(--d) * .28s); }
  html.kol-on .kol-profile.lit .row svg{ animation:kolPop .4s cubic-bezier(.2,.9,.3,1.5) forwards; animation-delay:calc(.55s + var(--d) * .28s); }
  html.kol-on .kol-profile.lit .ph .st{ opacity:1; transition:opacity .4s linear 2.7s; }
  @keyframes kolType{ to{ clip-path:inset(0 0 0 0); } }
  html.kol-on .kol-strip .kol-img{ transform:scale(1.08); transition:transform 1.6s cubic-bezier(.18,.72,.2,1); }
  html.kol-on .kol-strip.lit .kol-img{ transform:none; }
  html.kol-on .kol-strip figcaption{ opacity:0; } html.kol-on .kol-strip.lit figcaption{ opacity:1; transition:opacity .6s linear .5s; }
  /* 03 */
  html.kol-on .kol-term .tl{ opacity:0; }
  html.kol-on .kol-term.lit .tl{ animation:kolStep .01s steps(1) forwards; animation-delay:calc(.3s + var(--d) * .22s); }
  @keyframes kolStep{ to{ opacity:1; } }
  html.kol-on .kol-side .kol-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); }
  html.kol-on .kol-side.lit .kol-img{ transform:none; }
  html.kol-on .kol-side figcaption{ opacity:0; } html.kol-on .kol-side.lit figcaption{ opacity:1; transition:opacity .5s linear .5s; }
  /* 04 */
  html.kol-on .kol-map .rail:not(.bg){ stroke-dasharray:1; stroke-dashoffset:1; }
  html.kol-on .kol-map.lit .rail:not(.bg){ stroke-dashoffset:0; transition:stroke-dashoffset 3s cubic-bezier(.4,0,.3,1) .2s; }
  html.kol-on .kol-map .stop i{ transform:scale(0); }
  html.kol-on .kol-map .stop b{ opacity:0; transform:translateX(-6px); }
  html.kol-on .kol-map.lit .stop i{ animation:kolPop .4s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(.2s + var(--d) * .4s); }
  html.kol-on .kol-map.lit .stop b{ animation:kolIn .4s ease forwards; animation-delay:calc(.35s + var(--d) * .4s); }
  html.kol-on .kol-mphoto .kol-img{ clip-path:inset(0 0 0 100%); }
  html.kol-on .kol-mphoto.lit .kol-img{ animation:kolSlideL .8s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .2s); }
  @keyframes kolSlideL{ to{ clip-path:inset(0 0 0 0); } }
  html.kol-on .kol-stops li{ opacity:0; transform:translateY(10px); }
  html.kol-on .kol-stops.lit li{ animation:kolIn .45s ease forwards; animation-delay:calc(var(--d) * .08s); }
  /* 05 */
  html.kol-on .kol-ladder::before, html.kol-on .kol-ladder::after{ transform:scaleY(0); }
  html.kol-on .kol-ladder.lit::before, html.kol-on .kol-ladder.lit::after{ animation:kolGrow 1.4s cubic-bezier(.3,0,.2,1) forwards; }
  @keyframes kolGrow{ to{ transform:scaleY(1); } }
  html.kol-on .kol-ladder li{ opacity:0; transform:scaleX(0); }
  html.kol-on .kol-ladder.lit li{ animation:kolRung .5s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.3s + (4 - var(--d)) * .22s); }
  @keyframes kolRung{ to{ opacity:1; transform:none; } }
  html.kol-on .kol-drivers .drv{ opacity:0; transform:translateY(14px); }
  html.kol-on .kol-drivers.lit .drv{ animation:kolIn .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  /* 06 */
  html.kol-on .kol-mirror .kol-img{ transform:scaleY(-1) scale(1.06); transition:transform 1.4s cubic-bezier(.2,.8,.2,1); }
  html.kol-on .kol-mirror.lit .kol-img{ transform:none; }
  html.kol-on .kol-col{ opacity:0; transform:translateY(40px); }
  html.kol-on .kol-cols.lit .kol-col{ animation:kolIn .8s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.2s + var(--d) * .18s); }
  /* 07 */
  html.kol-on .kol-wire .wb{ opacity:0; transform:scale(.7); }
  html.kol-on .kol-wire.lit .wb{ animation:kolIn .45s cubic-bezier(.2,.9,.3,1.3) forwards; animation-delay:calc(.2s + var(--d) * .14s); }
  /* 08 */
  html.kol-on .kol-report .bar i{ transform:scaleY(0); }
  html.kol-on .kol-report.lit .bar i{ animation:kolGrow .9s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.3s + var(--d) * .12s); }
  html.kol-on .kol-report .rf{ opacity:0; } html.kol-on .kol-report.lit .rf{ opacity:1; transition:opacity .5s linear 1.4s; }
  /* 09 */
  html.kol-on .kol-qs b span{ transform:rotateX(90deg); opacity:0; }
  html.kol-on .kol-qs li div{ opacity:0; transform:translateX(10px); }
  html.kol-on .kol-qs.lit b span{ animation:kolRoll .6s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.kol-on .kol-qs.lit li div{ animation:kolIn .5s ease forwards; animation-delay:calc(.1s + var(--d) * .14s); }
  @keyframes kolRoll{ to{ transform:none; opacity:1; } }
  /* band */
  @supports (animation-timeline: view()){
    .kol-bandfig .kol-img{ animation:kolDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; }
    @keyframes kolDrift{ from{ transform:scale(1.14) translateY(-4%); } to{ transform:scale(1.14) translateY(4%); } }
  }
  @media (prefers-reduced-motion: reduce){
    html.kol-on .kol-head .kol-slate i, html.kol-on .kol-head .kol-h2, html.kol-on .kol-head .kol-lede,
    html.kol-on .kol-stage .kol-plate .kol-img, html.kol-on .kol-pan .wt, html.kol-on .kol-beam, html.kol-on .kol-pan, html.kol-on .kol-stage .kol-stage-cap,
    html.kol-on .kol-pola, html.kol-on .kol-profile .row .v, html.kol-on .kol-profile .row svg, html.kol-on .kol-profile .ph .st, html.kol-on .kol-strip .kol-img, html.kol-on .kol-strip figcaption,
    html.kol-on .kol-term .tl, html.kol-on .kol-side .kol-img, html.kol-on .kol-side figcaption,
    html.kol-on .kol-map .rail, html.kol-on .kol-map .stop i, html.kol-on .kol-map .stop b, html.kol-on .kol-mphoto .kol-img, html.kol-on .kol-stops li,
    html.kol-on .kol-ladder::before, html.kol-on .kol-ladder::after, html.kol-on .kol-ladder li, html.kol-on .kol-drivers .drv,
    html.kol-on .kol-mirror .kol-img, html.kol-on .kol-col, html.kol-on .kol-wire .wb, html.kol-on .kol-report .bar i, html.kol-on .kol-report .rf,
    html.kol-on .kol-qs b span, html.kol-on .kol-qs li div, .kol-bandfig .kol-img, .kol-term .caret{
      opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; stroke-dashoffset:0 !important;
    }
  }
`;

const JS = `
/* in_kolkata.js : light each frame once as it arrives, then stop watching it. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var frames = document.querySelectorAll('.kol-head, .kol-stage, .kol-pola, .kol-profile, .kol-strip, .kol-term, .kol-side, .kol-map, .kol-mphoto, .kol-stops, .kol-ladder, .kol-drivers, .kol-mirror, .kol-cols, .kol-wire, .kol-report, .kol-qs');
    if (!frames.length) return;
    document.documentElement.classList.add('kol-on');
    var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            entries[i].target.classList.add('lit');
            io.unobserve(entries[i].target);
        }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('in/kolkata/index.html');
L.must(s, 'id="city-body"', 1);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];

s = L.setHead(s, {
  title: 'SEO Consultant or SEO Company in Kolkata? How to Weigh It | TechAuditPros',
  desc: 'Kolkata searches for an SEO consultant as often as a company, and pays &#8377;7,500 to &#8377;2,00,000 a month for the same word. A Kochi team weighs both honestly: local SEO first, the technical layer, websites and ERP, weekly staging URL.',
  url: URL,
  hreflang: [{ lang: 'en-in', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/in/' }],
});
s = s.replace(/(<p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">)[\s\S]*?(<\/span><\/p>)/, '$1' + HERO.eyebrow + '$2');
s = s.replace(/<h1>[\s\S]*?<\/h1>/, '<h1>' + HERO.h1 + '</h1>');
s = s.replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/, '<p class="hero-subtitle">' + HERO.sub + '</p>');
s = L.replaceAll(s, 'href="#city-body" class="btn-ghost">What this city actually asks for &darr;</a>', 'href="#kol-scale" class="btn-ghost">Consultant or company &darr;</a>');

const body = [
  L.answer(ANSWER),
  ACT_SCALE, ACT_PROFILE, ACT_TERM, ACT_ROUTE, ACT_LADDER, ACT_WHEN, ACT_STORE, ACT_REPORT, ACT_CHECK, BAND,
  L.faqHtml('city-faq', 'Questions Kolkata businesses ask us', 'Twelve straight answers, starting with consultant or company.', FAQS),
].join('\n').split('__WA__').join(WA);
s = L.setBody(s, body);
s = L.setFinalCta(s, 'Tell us whether you were looking for a consultant or a company. We will help you decide.', 'Takes 60 seconds &middot; For Kolkata businesses &middot; The findings are yours to keep &middot; No long-term contract');

{
  const firstStyle = s.indexOf('<style');
  const blocks = s.slice(firstStyle).match(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  const typeOf = x => { try { return JSON.parse(x.replace(/^[\s\S]*?<script[^>]*>/, '').replace(/<\/script>[\s\S]*$/, ''))['@type']; } catch (e) { return '?'; } };
  const keep = blocks.filter(x => ['BreadcrumbList', 'Service'].includes(typeOf(x)));
  if (keep.length !== 2) throw new Error('expected breadcrumb + service blocks from in_city, found: ' + blocks.map(typeOf).join(', '));
  s = L.setPageSchemas(s, keep.map(b => b.replace(/^\s+/, '    ')).concat([L.faqSchema(FAQS)]));
}
{
  const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at);
  const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt);
}
if (/[Oo]ffshore/.test(s)) throw new Error('"offshore" on /in/kolkata/');
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) throw new Error('"audit" survives as a service word on /in/kolkata/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 4200) throw new Error('only ' + words + ' words; SERP parity needs 4,200+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'node_modules' || e.name.startsWith('.')) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html') out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.replace(/\\/g, '/').endsWith('/in/kolkata/index.html'));
  const used = [];
  for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<section class="kol', 10); L.must(s, '<div class="stop', STOPS.length); L.must(s, 'class="tl"', TERMINAL.length); L.must(s, 'class="kol-ladder"', 1);
L.write('in/kolkata/index.html', s);
console.log('/in/kolkata/ rebuilt to SERP parity: 9 acts + band, own signature "the scale", 12 FAQs, consultant vs company');
