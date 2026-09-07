'use strict';
// /ae/abu-dhabi/ — PLAN-AE §2 page 2, the softest large cluster in the owner's data.
//
// DATA (ae_read.js, 2026-09-07): seo services abu dhabi 4,400/KD22 · best seo agency in abu dhabi 1,300/24 ·
//   seo consultant abu dhabi 1,300/11 · seo company in abu dhabi 480/23 · seo service in abu dhabi 480/29 ·
//   website development company abu dhabi 390/16 (+170) — ~8,500/mo. Dubai's equivalents sit at KD 43–53.
// WHAT RANKS (live, 2026-09-07): pentame.com (~6,500 words, "30+ years", "3,500 clients", 12+ FAQs, 3 unpriced
//   tiers, Google/Microsoft/AWS partner badges, WhatsApp), integrateitsolutions.com (~8,500 words, 6 FAQs, AED
//   850–5,000/mo stated, 14+ yrs, 750+ projects, 4.8★, 5 case studies, GEO named), 10xdigital.ae (~4,500 words,
//   10 FAQs, "100% guaranteed rankings", no proof), tranetech.com (~2,500, ISO/ICV certified, no FAQ, no price).
//   Parity: 4,500+ words · 12 FAQs · AED 850–5,000 attributed · districts named · ICV/government-supplier reality ·
//   the guarantee problem addressed head-on · no office said first · WhatsApp CTA.
// RULES as /ae/: no "audit" as a service word, no "offshore", no price of ours; own photos (asserted unique);
//   start states only under html.ad-on; JS off = complete page.
//
// DESIGN — nothing from /ae/, /in/ or /uk/:
//   SIGNATURE "the Corniche line": over the Corniche plate, the skyline is drawn as ONE continuous line
//   (stroke-dashoffset), then the towers rise beneath it (scaleY from the waterline).
//   Per section: difficulty gauges with swinging needles (22 vs 51) · district pins drop and bounce · sector cards
//   rise from a baseline like buildings (clip-path from the bottom) · a strike-through draws across "100% guaranteed
//   rankings" · the Louvre pair opens as domes (ellipse clip from the bottom centre) · a tide table where AED rows
//   fill like a water level · hire questions with underlines that draw · a drifting sunset band.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/abu-dhabi/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'ad-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
const STOCK = {
  hero: 'ad-corniche-skyline-day', walk: 'ad-man-walking-towers',
  gov: 'ae-sheikh-zayed-mosque-sunset', realty: 'ad-corniche-skyline-two', hosp: 'ae-abu-dhabi-sunset-water', ind: 'ad-towers-blue-sea-boat', culture: 'ad-louvre-white-by-water', health: 'ae-abu-dhabi-skyline-sea-day',
  dome1: 'ad-louvre-dome-modern', dome2: 'ad-louvre-dome-water',
  cost: 'ad-city-across-water', band: 'ad-corniche-beach-sunset',
};

// ---------------------------------------------------------------------------------------------
const H1 = 'SEO Services in Abu Dhabi, <span>from a team four hours away.</span>';
const SUB = 'Abu Dhabi is the softest large search market in the Emirates: 4,400 people a month look for SEO services here and the pages that rank are small local agencies. We are an engineering team in Kochi with no office on the Corniche &mdash; a four-hour flight, ninety minutes on the clock &mdash; and this page says what that costs you and what it buys you before it says anything else.';
const ANSWER = 'TechAuditPros provides <strong>SEO with AI-search optimisation, website development and custom ERP</strong> to businesses in <strong>Abu Dhabi</strong> &mdash; Al Reem, Khalifa City, Mussafah, Yas and Saadiyat, Al Raha, the Corniche district and out to Al Ain and KIZAD &mdash; from an engineering team in Kochi, India. No Abu Dhabi office, said first; a staging URL you can open every week and a written report every month instead. The Abu Dhabi search market is unusually open (4,400 monthly searches for &ldquo;SEO services Abu Dhabi&rdquo; at a difficulty of 22, against 50+ in Dubai), the ranking pages publish AED 850&ndash;5,000 a month, and one promises &ldquo;100% guaranteed rankings&rdquo;. We do not guarantee positions; we guarantee what ships, and we show it.';

const GAUGES = [
  ['Abu Dhabi', 'seo services abu dhabi', 4400, 22],
  ['Abu Dhabi', 'seo consultant abu dhabi', 1300, 11],
  ['Dubai', 'seo agency dubai', 8100, 51],
];

const PINS = [
  ['Al Reem Island', 'Clinics, schools and professional firms in new towers; map results decide the first visit.', 62, 38],
  ['Corniche &amp; Al Markaziyah', 'Established practices, banks and government-adjacent suppliers with dated websites.', 40, 30],
  ['Khalifa City', 'Family services, nurseries and healthcare; searched in English and Arabic.', 74, 56],
  ['Mussafah &amp; ICAD', 'Contractors, workshops, traders and industrial suppliers; ERP before SEO.', 46, 74],
  ['Yas &amp; Saadiyat', 'Hospitality, leisure and culture competing for the same booking and ticket terms.', 84, 24],
  ['Al Raha &amp; Al Bandar', 'Real estate, marinas and retail; brand and reviews do the work.', 80, 44],
  ['KIZAD', 'Manufacturing and logistics in the free zone; supplier portals and English search.', 18, 84],
  ['Al Ain', 'A second city with its own local search shelf, ninety minutes down the E22.', 14, 60],
];

const SECTORS = [
  { k: 'gov', h: 'Government suppliers', p: 'Businesses selling to Abu Dhabi entities live by tender portals, the ICV (In-Country Value) programme and a website that has to look like a company that can deliver. English and Arabic, fast, with the certificates findable.', alt: 'Sheikh Zayed Grand Mosque reflected in its pool at sunset' },
  { k: 'health', h: 'Healthcare &amp; education', p: 'Clinics, hospitals, schools and nurseries win on map results, reviews and a Business Profile that is true this month, in both languages.', alt: 'The Abu Dhabi skyline across the sea by day' },
  { k: 'realty', h: 'Real estate', p: 'Developers, brokers and property managers competing on brand for terms the big portals own; the winnable shelf is neighbourhood by neighbourhood.', alt: 'Abu Dhabi towers across the water' },
  { k: 'hosp', h: 'Hospitality &amp; leisure', p: 'Yas and Saadiyat hotels, restaurants and experiences competing for booking terms against the OTAs; direct-booking pages that load fast are the whole game.', alt: 'The sun setting over Abu Dhabi and the water' },
  { k: 'ind', h: 'Industrial &amp; trading', p: 'Mussafah, ICAD and KIZAD: contractors, fabricators, traders and logistics firms whose first project is usually the stock and order system, then the site that reads from it.', alt: 'Modern towers rising above a blue sea with a boat' },
  { k: 'culture', h: 'Culture &amp; tourism', p: 'Museums, galleries, tours and the businesses around them, found by international visitors searching in several languages before they land.', alt: 'The white Louvre Abu Dhabi beside the water' },
];

const COST = [
  ['AED 850 a month', 'the entry tier an Abu Dhabi agency on the first page states in its FAQ', 17],
  ['AED 2,500 a month', 'the top of a Dubai agency&rsquo;s three published SEO tiers', 45],
  ['AED 5,000 a month', 'the top of the Abu Dhabi agency&rsquo;s stated monthly range', 78],
  ['&ldquo;Custom quote&rdquo;', 'what the thirty-year Abu Dhabi firm and the guarantee-maker publish instead', 100],
];
const DRIVERS = [
  ['How much is engineering', 'A site that is slow on Etisalat 4G and half-indexed needs a developer before a writer. Developer hours cost more, and the tiers above assume the site is fine.'],
  ['How contested the shelf is', 'Abu Dhabi&rsquo;s SEO terms sit at difficulty 11&ndash;29 today; Dubai&rsquo;s at 43&ndash;53. The same work buys more here, for now.'],
  ['Who ships the changes', 'Recommendations that wait in your IT company&rsquo;s queue cost you the waiting. Our developer is on the team; the fix ships the week it is found.'],
  ['One discipline or three', 'Search alone; search plus a rebuild; search plus a rebuild plus the ERP your Mussafah workshop actually runs on. Sequenced, cheaper and calmer.'],
];

const CHECK = [
  ['Who, by name, does the work?', 'Thirty-year firms with 3,500 clients rank here. Ask which three people are yours and whether you will ever speak to them.'],
  ['What exactly is guaranteed?', 'Positions cannot be guaranteed by anyone; Google says so. What can be guaranteed is what ships each month. Ask for that list instead.'],
  ['Can I open the staging site today?', 'Work in progress is visible or it is not happening yet.'],
  ['Do you understand ICV and tender portals?', 'If you sell to Abu Dhabi entities, your website is read by procurement. Ask how the supplier will make certificates, capability statements and Arabic content findable.'],
  ['What do I keep if I stop in month three?', 'Accounts, code, content, reports and the plan. If any stays with the supplier, the AED figure is not the price.'],
  ['Will you say when a local agency is the better answer?', 'Sometimes it is: a government launch that needs people in the room, a brand that needs an Abu Dhabi address on the proposal. Anyone who never says so is selling.'],
];

const FAQS = [
  { q: 'Do you have an office in Abu Dhabi?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight, ninety minutes apart on the clock, the same Monday-to-Friday week. Abu Dhabi clients see a staging URL every week and a written report every month, and we visit for kick-offs and systems projects when it earns the journey. If your project needs people in the room every week, hire on the Corniche; we will say so on the first call.' },
  { q: 'How much do SEO services cost in Abu Dhabi?', a: 'One Abu Dhabi agency on the first page states AED 850 to AED 5,000 a month in its FAQ; a Dubai agency publishes three tiers from AED 900 to AED 2,500; the thirty-year firm and the guarantee-maker publish nothing. Those are their figures, September 2026. We do not publish a rate card; you get a written plan for the first ninety days and a price against it.' },
  { q: 'Why is Abu Dhabi easier to rank in than Dubai?', a: 'The numbers say so: &ldquo;SEO services Abu Dhabi&rdquo; has 4,400 monthly searches at a keyword difficulty of 22, and &ldquo;SEO consultant Abu Dhabi&rdquo; 1,300 at 11, while Dubai&rsquo;s equivalent terms sit at 43&ndash;53. Fewer agencies have built deep pages here, so the same quality of work moves further &mdash; for now.' },
  { q: 'Can you guarantee first-page rankings?', a: 'No, and neither can anyone else; Google itself says no one can guarantee a ranking. One agency ranking for this search promises &ldquo;100% guaranteed rankings&rdquo; and 60% of keywords in twelve months &mdash; ask what happens if they miss. What we guarantee is what ships each month, visible on a staging URL, and a written account of it.' },
  { q: 'Do you do local SEO and Google Business Profile in Abu Dhabi?', a: 'Yes, and it is usually the first thirty days: primary category, an address identical everywhere, hours that are true this month including Ramadan timings, twelve recent photographs, a review habit, and services named in English and Arabic. For clinics on Al Reem, nurseries in Khalifa City and showrooms in Mussafah the map results decide the call.' },
  { q: 'Do you build Arabic websites?', a: 'Bilingual where it earns its place. In the UAE search data 99% of volume is English, so pages are English-first; for government suppliers, healthcare and education we build Arabic versions with correct hreflang and RTL, because procurement and families read them.' },
  { q: 'What is ICV and does my website matter for it?', a: 'In-Country Value is Abu Dhabi&rsquo;s programme scoring suppliers on local spend, employment and investment, used in ADNOC and government procurement. The certificate is issued by approved bodies, not by a website &mdash; but procurement reads your site: certificates, capability statements, Arabic content and a company that looks able to deliver should be findable in two clicks.' },
  { q: 'Do you build websites for Abu Dhabi companies too?', a: 'Yes &mdash; &ldquo;website development company Abu Dhabi&rdquo; is part of what this page is for. WordPress when your staff must edit it, Shopify or WooCommerce for a store, Next.js when the catalogue or portal is unusual; fast on a mid-range phone on Etisalat or du, VAT-compliant, and delivered in your own repository with a staging URL from week one.' },
  { q: 'Do you build ERP for Mussafah and KIZAD businesses?', a: 'Yes. Stock, orders, purchasing, projects, payroll and job costing in one system with UAE VAT, Corporate Tax, PINT-AE e-invoicing, WPS and EOSB built in. For contractors and traders the system usually comes before the website, because a site that quotes stock the yard does not have loses the customer twice.' },
  { q: 'How long until we see results in Abu Dhabi?', a: 'Local results for a clinic or showroom in one district typically move within two to four months here, faster than Dubai because the shelf is less contested; city-wide commercial terms take four to nine. The first month should still show visible work on the staging URL. If it does not, ask why, whoever you hired.' },
  { q: 'How do I know work is happening each month?', a: 'You open the staging URL and see what changed; you read the monthly report against the ninety-day plan; you can ask for the commit history. If a supplier cannot show you the work before it goes live, you are being asked to trust the invoice.' },
  { q: 'What happens if I stop after three months?', a: 'You keep everything: code, accounts, content, the report history and the plan. No notice period measured in quarters, no retainer trap. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
];

// ---------------------------------------------------------------------------------------------
// the skyline: one continuous line across a 100x40 box, then tower rectangles beneath it
const SKY = [[0, 34], [6, 34], [6, 22], [10, 22], [10, 34], [14, 34], [14, 14], [17, 14], [17, 10], [19, 10], [19, 34], [24, 34], [24, 26], [29, 26], [29, 34], [33, 34], [33, 18], [36, 18], [36, 8], [38, 8], [38, 18], [41, 18], [41, 34], [46, 34], [46, 24], [50, 24], [50, 12], [53, 12], [53, 24], [57, 24], [57, 34], [61, 34], [61, 20], [65, 20], [65, 34], [70, 34], [70, 16], [72, 16], [72, 6], [74, 6], [74, 16], [77, 16], [77, 34], [82, 34], [82, 28], [87, 28], [87, 34], [91, 34], [91, 22], [94, 22], [94, 34], [100, 34]];
const skyPath = 'M' + SKY.map(p => p.join(' ')).join(' L ');
const towers = []; for (let i = 0; i < SKY.length - 1; i++) { const [x1, y1] = SKY[i], [x2, y2] = SKY[i + 1]; if (y1 === y2 && y1 < 34 && x2 > x1) towers.push([x1, y1, x2 - x1, 34 - y1]); }

const HERO = [
  '<section class="adh" id="ad-hero" aria-label="SEO services in Abu Dhabi">',
  '  <div class="adh-plate">' + img(STOCK.hero, 'The Abu Dhabi skyline across the water from the Corniche', '100vw', 'ad-img', true) + '</div>',
  '  <svg class="adh-sky" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">',
  '    <g class="towers">' + towers.map(([x, y, w, h], i) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" style="--d:' + i + '" />').join('') + '</g>',
  '    <path class="line" d="' + skyPath + '" pathLength="1" />',
  '  </svg>',
  '  <div class="container adh-text">',
  '    <p class="adh-eyebrow">Abu Dhabi &middot; Al Reem &middot; Khalifa City &middot; Mussafah &middot; Yas &middot; Al Ain</p>',
  '    <h1>' + H1 + '</h1>',
  '    <p class="adh-sub">' + SUB + '</p>',
  '    <div class="adh-ctas"><a class="ad-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="ad-btn ghost" href="#ad-shelf">Why Abu Dhabi first &darr;</a></div>',
  '    <ul class="adh-facts"><li><b>250+</b> projects</li><li><b>128+</b> active clients</li><li><b>16</b> countries</li><li><b>4.9/5</b> rating</li></ul>',
  '  </div>',
  '</section>',
].join('\n');

const head = (n, label, title, lede) => '      <div class="ads-head"><p class="ads-k"><b>' + n + '</b><span>' + label + '</span></p><h2 class="ads-h2">' + title + '</h2>' + (lede ? '<p class="ads-lede">' + lede + '</p>' : '') + '</div>';

const S1 = [
  '<section class="ads" id="ad-shelf" aria-label="The softest shelf">',
  '  <div class="container">',
  head('01', 'The softest shelf', 'Abu Dhabi is the easiest large search market in the Emirates. The numbers, not the billboards.', 'We planned the UAE pages from 32,989 search terms. Dubai&rsquo;s head terms are owned by agencies of sixty to two hundred people at a difficulty above fifty. Abu Dhabi&rsquo;s sit at eleven to twenty-nine, with more volume per point of difficulty than anywhere else in the data. The pages that rank here are a thirty-year IT firm, an agency stating AED 850&ndash;5,000 a month, one promising &ldquo;100% guaranteed rankings&rdquo;, and an ISO-certified software house with no FAQ at all.'),
  '    <div class="ads-gauges">' + GAUGES.map(([city, kw, vol, kd], i) => '<div class="g" style="--d:' + i + ';--kd:' + kd + '"><div class="dial"><i class="arc"></i><i class="needle"></i></div><b>' + kd + '</b><span class="kw">&ldquo;' + kw + '&rdquo;</span><span class="vol">' + vol.toLocaleString('en-IN') + ' searches / month &middot; ' + city + '</span></div>').join('') + '</div>',
  '    <p class="ads-p">Keyword difficulty, 0&ndash;100, from the owner&rsquo;s September 2026 export. The same month of honest work moves further on a shelf at 22 than on one at 51 &mdash; which is why this page exists before the Dubai one, and why we say &ldquo;for now&rdquo;: soft shelves get found.</p>',
  '  </div>',
  '</section>',
].join('\n');

const S2 = [
  '<section class="ads dark" id="ad-pins" aria-label="The first thirty days in Abu Dhabi">',
  '  <div class="container ads-two">',
  '    <div>',
  head('02', 'The first thirty days', 'In Abu Dhabi the first thirty days are the map, district by district.', 'For a clinic on Al Reem or a showroom in Mussafah, the three map results with a call button are the whole decision. Most profiles here are incomplete: wrong primary category, photographs from before the tower was finished, hours that ignore Ramadan, no Arabic service names. That work costs attention, not money, and it is where we start &mdash; then locality pages written the way each district actually searches.'),
  '      <figure class="ads-side">' + img(STOCK.walk, 'A man walking along a pavement beside tall towers in Abu Dhabi', '(max-width:860px) 100vw, 40vw') + '<figcaption>Al Reem, mid-morning. Every tower is a hundred businesses Google may or may not be able to find.</figcaption></figure>',
  '    </div>',
  '    <div class="ads-map" role="img" aria-label="Eight Abu Dhabi districts, pinned">',
  '      <div class="ads-mapbg"></div>',
  ...PINS.map(([n, p, x, y], i) => '      <div class="pin" style="left:' + x + '%;top:' + y + '%;--d:' + i + '"><i></i><b>' + n + '</b><span>' + p + '</span></div>'),
  '    </div>',
  '  </div>',
  '  <div class="container"><ol class="ads-pinlist">' + PINS.map(([n, p], i) => '<li style="--d:' + i + '"><b>' + n + '</b><span>' + p + '</span></li>').join('') + '</ol></div>',
  '</section>',
].join('\n');

const S3 = [
  '<section class="ads alt" id="ad-sectors" aria-label="Who Abu Dhabi is">',
  '  <div class="container">',
  head('03', 'Who Abu Dhabi is', 'Six kinds of business, and what each one needs found first.', 'Abu Dhabi is not Dubai with fewer people. It is a government-and-energy economy with a hospitality coast, a healthcare and education boom in the new districts, and an industrial belt at Mussafah and KIZAD. The first project differs for each.'),
  '    <div class="ads-rise">' + SECTORS.map((t, i) => '<article class="bld" style="--d:' + i + '"><figure>' + img(STOCK[t.k], t.alt, '(max-width:860px) 92vw, 30vw') + '</figure><h3>' + t.h + '</h3><p>' + t.p + '</p></article>').join('') + '</div>',
  '  </div>',
  '</section>',
].join('\n');

const S4 = [
  '<section class="ads" id="ad-guarantee" aria-label="The guarantee problem">',
  '  <div class="container ads-two">',
  '    <div>',
  head('04', 'The guarantee problem', 'One page ranking here promises <span class="strike"><span>100% guaranteed rankings</span><i></i></span>. Here is what can actually be promised.', 'Google states plainly that no one can guarantee a first-page ranking, and every honest practitioner in Abu Dhabi knows it. A guarantee of positions is either a guarantee of easy terms nobody searches, or a promise that will be renegotiated in month eleven. We think the buyer deserves a different kind of guarantee, and it is the one we give.'),
  '    </div>',
  '    <div class="ads-promise">',
  '      <div class="col no"><h3>Cannot be promised</h3><ul><li>A position for a term, by a date.</li><li>&ldquo;60% of keywords ranking in twelve months&rdquo; &mdash; unless the keywords are chosen after the fact.</li><li>Traffic figures, before anyone has seen the site.</li></ul></div>',
  '      <div class="col yes"><h3>Can be promised, and is</h3><ul><li>What ships in the first thirty days, as a list.</li><li>A staging URL open every week, a written report every month.</li><li>Fixes made by the developer on the team, the week they are found.</li><li>Everything yours &mdash; code, accounts, content, reports &mdash; from day one.</li><li>A plain answer when we are not the right buy.</li></ul></div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S5 = [
  '<section class="ads dark" id="ad-build" aria-label="Websites and systems for Abu Dhabi">',
  '  <div class="container">',
  head('05', 'Websites &amp; systems', 'For the company that sells to Abu Dhabi, the website is read by procurement.', '&ldquo;Website development company Abu Dhabi&rdquo; is its own search here, and the reason is specific: government entities, ADNOC-adjacent suppliers and the ICV programme mean a website is a capability statement. Certificates findable in two clicks, Arabic where procurement reads it, fast on a phone in a Mussafah yard &mdash; and, for the industrial belt, an ERP behind it that knows what is in stock.'),
  '    <div class="ads-domes">',
  '      <figure class="dome" style="--d:0">' + img(STOCK.dome1, 'The modern domed roof of the Louvre Abu Dhabi over water', '(max-width:860px) 100vw, 46vw') + '<figcaption><b>Websites</b><span>WordPress, Shopify, WooCommerce or Next.js &mdash; chosen for the business. Bilingual with proper hreflang and RTL where it earns it. Delivered in your repository with a staging URL from week one.</span></figcaption></figure>',
  '      <figure class="dome" style="--d:1">' + img(STOCK.dome2, 'The domed Louvre Abu Dhabi next to the sea', '(max-width:860px) 100vw, 46vw') + '<figcaption><b>Systems</b><span>Custom ERP for contractors, traders and workshops in Mussafah, ICAD and KIZAD: stock, orders, projects, payroll &mdash; with VAT, Corporate Tax, PINT-AE e-invoicing, WPS and EOSB built in.</span></figcaption></figure>',
  '    </div>',
  '    <p class="ads-p on-dark">How the three run together is on the <a href="/ae/">UAE page</a>; the compliance detail is there too, as a strip you can read in a minute.</p>',
  '  </div>',
  '</section>',
].join('\n');

const S6 = [
  '<section class="ads alt" id="ad-cost" aria-label="What SEO costs in Abu Dhabi">',
  '  <div class="container ads-two">',
  '    <div>',
  head('06', 'What it costs', 'What SEO costs in Abu Dhabi, according to the pages that publish a number.', 'Two of the four pages ranking for this search state a price; two say &ldquo;custom quote&rdquo;. Here are theirs, as published in September 2026, and the four things that actually move the figure. Ours is not on the table, because a number without a plan is a tier name.'),
  '      <div class="ads-drivers">' + DRIVERS.map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '    </div>',
  '    <div>',
  '      <figure class="ads-side short">' + img(STOCK.cost, 'Abu Dhabi seen across a wide stretch of water', '(max-width:860px) 100vw, 46vw') + '</figure>',
  '      <ol class="ads-tide" aria-label="Published monthly SEO prices, Abu Dhabi and Dubai">' + COST.map(([p, by, lvl], i) => '<li style="--d:' + i + ';--lvl:' + lvl + '%"><i></i><b>' + p + '</b><span>' + by + '</span></li>').join('') + '</ol>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S7 = [
  '<section class="ads" id="ad-check" aria-label="Before you hire anyone in Abu Dhabi">',
  '  <div class="container">',
  head('07', 'Before you hire anyone', 'Six questions for any SEO supplier in Abu Dhabi &mdash; including one four hours away.', 'Take these into every meeting on the Corniche. They apply to us word for word.'),
  '    <ol class="ads-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="ads-band" aria-label="Start on WhatsApp">',
  '  <div class="ads-bandfig">' + img(STOCK.band, 'The sun setting over the water at the Corniche beach', '100vw') + '</div>',
  '  <div class="container ads-bandtext"><p class="ads-k"><b>Abu Dhabi</b><span>No office on the Corniche</span></p><h2 class="ads-h2 on-dark">The softest shelf in the Emirates, and a team that will show you the work.</h2><p>Message us on WhatsApp, book a call, or send us the page that should be ranking.</p><a class="ad-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_abu_dhabi.js : "the Corniche line" ================= */
  .ad-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .ad-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .ad-btn:hover{ background:var(--orange-dark); } .ad-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }
  /* hero */
  .adh{ position:relative; min-height:88svh; background:#08111C; color:#fff; overflow:hidden; display:grid; align-items:end; }
  .adh-plate{ position:absolute; inset:0; }
  .adh-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(8,17,28,.15) 0%, rgba(8,17,28,.55) 55%, rgba(8,17,28,.92) 100%); }
  .adh-sky{ position:absolute; left:0; right:0; bottom:0; width:100%; height:24%; pointer-events:none; }
  .adh-sky .line{ fill:none; stroke:var(--orange); stroke-width:1.6; vector-effect:non-scaling-stroke; stroke-linejoin:round; }
  .adh-sky .towers rect{ fill:rgba(217,83,30,.16); transform-origin:50% 100%; transform-box:fill-box; }
  .adh-text{ position:relative; z-index:2; padding:clamp(110px,16vh,200px) 0 clamp(170px,27vh,300px); max-width:1200px; }
  @media (max-width:860px){ .adh-sky{ height:16%; } .adh-text{ padding-bottom:clamp(120px,20vh,200px); } }
  .adh-eyebrow{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.7); margin:0 0 14px; }
  .adh h1{ font-size:clamp(2rem,4.6vw,4.2rem); line-height:1.04; letter-spacing:-.02em; margin:0 0 16px; max-width:20ch; color:#fff; }
  .adh h1 span{ color:var(--orange); }
  .adh-sub{ max-width:66ch; color:rgba(255,255,255,.82); font-size:clamp(1rem,1.2vw,1.12rem); line-height:1.65; margin:0 0 20px; }
  .adh-ctas{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
  .adh-facts{ list-style:none; margin:0; padding:0; display:flex; gap:clamp(14px,3vw,40px); flex-wrap:wrap; font-family:var(--font-mono); font-size:.74rem; letter-spacing:.08em; color:rgba(255,255,255,.65); }
  .adh-facts b{ color:#fff; margin-right:6px; }
  /* sections */
  .ads{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:#fff; }
  .ads.dark{ background:#08111C; color:#fff; } .ads.alt{ background:#F2F5F7; }
  .ads-head{ max-width:66ch; margin-bottom:clamp(22px,3vw,40px); }
  .ads-k{ display:flex; align-items:baseline; gap:12px; margin:0 0 12px; font-family:var(--font-mono); }
  .ads-k b{ font-size:.8rem; color:var(--orange); letter-spacing:.1em; border-bottom:2px solid var(--orange); padding-bottom:2px; }
  .ads-k span{ font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }
  .ads.dark .ads-k span, .ads-band .ads-k span{ color:rgba(255,255,255,.55); }
  .ads-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); }
  .ads.dark .ads-h2, .ads-h2.on-dark{ color:#fff; }
  .ads-lede, .ads-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; }
  .ads.dark .ads-lede, .ads-p.on-dark{ color:rgba(255,255,255,.8); } .ads-p.on-dark a{ color:#fff; }
  .ads-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; }
  @media (min-width:860px){ .ads-two{ grid-template-columns:1fr 1fr; } }
  .ads-side{ margin:14px 0 0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:14px; }
  .ads-side.short{ aspect-ratio:16/9; margin:0 0 16px; }
  .ads-side figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  /* 01 gauges */
  .ads-gauges{ display:grid; grid-template-columns:1fr; gap:18px; margin:clamp(18px,3vw,32px) 0; }
  @media (min-width:760px){ .ads-gauges{ grid-template-columns:repeat(3,1fr); } }
  .g{ text-align:center; padding:22px 16px; border:1px solid var(--line); border-radius:14px; background:#fff; }
  .g .dial{ position:relative; width:180px; height:96px; margin:0 auto 10px; overflow:hidden; }
  .g .dial .arc{ position:absolute; left:0; top:0; width:180px; height:90px; border:12px solid var(--line); border-bottom:none; border-radius:180px 180px 0 0; box-sizing:border-box; }
  .g .dial .arc::after{ content:''; position:absolute; left:-12px; top:-12px; width:180px; height:90px; box-sizing:border-box; border:12px solid transparent; border-bottom:none; border-radius:180px 180px 0 0; border-left-color:var(--orange); border-top-color:rgba(217,83,30,.35); }
  .g .dial .needle{ position:absolute; left:50%; bottom:0; width:3px; height:82px; margin-left:-1.5px; background:var(--ink); transform-origin:50% 100%; transform:rotate(calc(-90deg + var(--kd) * 1.8deg)); border-radius:2px; }
  .g b{ display:block; font-family:var(--font-mono); font-size:2.2rem; color:var(--ink); line-height:1; }
  .g .kw{ display:block; margin-top:6px; font-size:.95rem; color:var(--ink); } .g .vol{ display:block; margin-top:4px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.06em; color:var(--ink-faint); }
  .g:nth-child(3) .dial .needle{ background:var(--orange-dark); }
  /* 02 map */
  .ads-map{ position:relative; aspect-ratio:1; border-radius:16px; overflow:hidden; background:#0F2033; border:1px solid rgba(255,255,255,.12); }
  .ads-mapbg{ position:absolute; inset:0; background:radial-gradient(circle at 60% 40%, rgba(217,83,30,.14), transparent 45%), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 40px); }
  .pin{ position:absolute; width:0; height:0; }
  .pin i{ position:absolute; left:-9px; top:-24px; width:18px; height:18px; border-radius:50% 50% 50% 0; background:var(--orange); transform:rotate(-45deg); box-shadow:0 6px 14px rgba(0,0,0,.5); }
  .pin b{ position:absolute; left:12px; top:-20px; white-space:nowrap; font-size:.8rem; color:#fff; background:rgba(4,9,20,.85); padding:4px 8px; border-radius:6px; }
  .pin span{ display:none; }
  .pin[style*="left:8"] b, .pin[style*="left:74"] b{ left:auto; right:12px; }
  .ads-pinlist{ list-style:none; margin:clamp(22px,3vw,36px) 0 0; padding:0; display:grid; grid-template-columns:1fr; gap:8px 28px; }
  @media (min-width:760px){ .ads-pinlist{ grid-template-columns:1fr 1fr; } }
  .ads-pinlist li{ display:grid; grid-template-columns:190px 1fr; gap:10px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.14); font-size:.92rem; }
  .ads-pinlist b{ color:#fff; } .ads-pinlist span{ color:rgba(255,255,255,.75); line-height:1.5; }
  @media (max-width:560px){ .ads-pinlist li{ grid-template-columns:1fr; } .pin b{ font-size:.66rem; } }
  /* 03 rise */
  .ads-rise{ display:grid; grid-template-columns:1fr; gap:18px; }
  @media (min-width:700px){ .ads-rise{ grid-template-columns:1fr 1fr; } } @media (min-width:1040px){ .ads-rise{ grid-template-columns:repeat(3,1fr); } }
  .bld{ background:#fff; border:1px solid var(--line); border-radius:14px; overflow:hidden; padding-bottom:18px; }
  .bld figure{ margin:0 0 14px; aspect-ratio:16/10; overflow:hidden; }
  .bld h3{ margin:0 18px 8px; font-size:1.12rem; color:var(--ink); } .bld p{ margin:0 18px; color:var(--ink-soft); line-height:1.6; font-size:.94rem; }
  /* 04 guarantee */
  .strike{ position:relative; display:inline-block; }
  .strike i{ position:absolute; left:-2%; right:-2%; top:52%; height:.09em; background:var(--orange); transform-origin:left center; }
  .ads-promise{ display:grid; grid-template-columns:1fr; gap:16px; }
  @media (min-width:640px){ .ads-promise{ grid-template-columns:1fr 1fr; } }
  .ads-promise .col{ border-radius:14px; padding:22px; }
  .ads-promise .col.no{ background:#F2F5F7; border:1px solid var(--line); } .ads-promise .col.yes{ background:#08111C; color:#fff; }
  .ads-promise h3{ margin:0 0 12px; font-size:1.1rem; } .ads-promise ul{ margin:0; padding-left:18px; line-height:1.6; } .ads-promise .no ul{ color:var(--ink-soft); } .ads-promise .yes ul{ color:rgba(255,255,255,.86); }
  .ads-promise li{ margin-bottom:8px; }
  /* 05 domes */
  .ads-domes{ display:grid; grid-template-columns:1fr; gap:18px; margin-bottom:18px; }
  @media (min-width:860px){ .ads-domes{ grid-template-columns:1fr 1fr; } }
  .dome{ margin:0; position:relative; aspect-ratio:16/11; overflow:hidden; border-radius:14px; background:rgba(255,255,255,.05); }
  .dome::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.92) 0%, rgba(4,9,20,.3) 55%, rgba(4,9,20,0) 100%); }
  .dome figcaption{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:20px; color:#fff; }
  .dome figcaption b{ display:block; font-size:1.15rem; margin-bottom:6px; } .dome figcaption span{ font-size:.9rem; line-height:1.5; color:rgba(255,255,255,.84); }
  /* 06 tide */
  .ads-drivers{ display:grid; gap:14px; margin:8px 0 18px; }
  .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; }
  .drv h3{ margin:0; font-size:1.02rem; color:var(--ink); } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:var(--ink-soft); }
  .ads-tide{ list-style:none; margin:0; padding:0; display:grid; gap:10px; }
  .ads-tide li{ position:relative; overflow:hidden; border-radius:10px; background:#fff; border:1px solid var(--line); padding:14px 16px 14px 18px; display:grid; gap:2px; }
  .ads-tide li i{ position:absolute; left:0; right:0; bottom:0; height:100%; background:linear-gradient(180deg, rgba(217,83,30,0) 0%, rgba(217,83,30,.18) 100%); transform-origin:bottom center; transform:scaleY(var(--lvl-f, 1)); }
  .ads-tide b{ position:relative; font-family:var(--font-mono); font-size:1.05rem; color:var(--ink); } .ads-tide span{ position:relative; font-size:.84rem; color:var(--ink-soft); }
  /* 07 */
  .ads-qs{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr; gap:6px 32px; }
  @media (min-width:760px){ .ads-qs{ grid-template-columns:1fr 1fr; } }
  .ads-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; position:relative; }
  .ads-qs li::after{ content:''; position:absolute; left:0; right:0; bottom:0; height:1px; background:var(--line-strong); transform-origin:left center; }
  .ads-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; } .ads-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); } .ads-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  /* band */
  .ads-band{ position:relative; background:#08111C; color:#fff; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .ads-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; }
  .ads-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(4,9,20,.85) 0%, rgba(4,9,20,.45) 50%, rgba(4,9,20,.15) 100%); }
  .ads-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); }
  .ads-bandtext p{ color:rgba(255,255,255,.8); max-width:46ch; margin:0 0 18px; }
  @media (max-width:700px){ .ads-bandfig{ aspect-ratio:4/5; } }

  /* ================= motion : start states only under html.ad-on ================= */
  html.ad-on .adh-sky .line{ stroke-dasharray:1; stroke-dashoffset:1; }
  html.ad-on .adh.lit .adh-sky .line{ stroke-dashoffset:0; transition:stroke-dashoffset 3.2s cubic-bezier(.4,0,.3,1) .3s; }
  html.ad-on .adh-sky .towers rect{ transform:scaleY(0); }
  html.ad-on .adh.lit .adh-sky .towers rect{ transform:none; transition:transform .9s cubic-bezier(.2,.8,.2,1) calc(.6s + var(--d) * .12s); }
  html.ad-on .adh-text > *{ opacity:0; transform:translateY(14px); }
  html.ad-on .adh.lit .adh-text > *{ animation:adIn .7s cubic-bezier(.2,.7,.2,1) forwards; }
  html.ad-on .adh.lit .adh-text > *:nth-child(2){ animation-delay:.12s; } html.ad-on .adh.lit .adh-text > *:nth-child(3){ animation-delay:.24s; } html.ad-on .adh.lit .adh-text > *:nth-child(4){ animation-delay:.36s; } html.ad-on .adh.lit .adh-text > *:nth-child(5){ animation-delay:.48s; }
  @keyframes adIn{ to{ opacity:1; transform:none; } }
  html.ad-on .ads-head .ads-k b{ transform:translateY(6px); opacity:0; } html.ad-on .ads-head .ads-h2, html.ad-on .ads-head .ads-lede{ opacity:0; transform:translateY(12px); }
  html.ad-on .ads-head.lit .ads-k b{ animation:adIn .5s ease forwards; } html.ad-on .ads-head.lit .ads-h2{ animation:adIn .6s cubic-bezier(.2,.7,.2,1) .1s forwards; } html.ad-on .ads-head.lit .ads-lede{ animation:adIn .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  /* 01 */
  html.ad-on .g .dial .needle{ transform:rotate(-90deg); } html.ad-on .ads-gauges.lit .g .dial .needle{ transform:rotate(calc(-90deg + var(--kd) * 1.8deg)); transition:transform 1.4s cubic-bezier(.3,1.4,.4,1) calc(.2s + var(--d) * .25s); }
  html.ad-on .g b, html.ad-on .g .kw, html.ad-on .g .vol{ opacity:0; } html.ad-on .ads-gauges.lit .g b, html.ad-on .ads-gauges.lit .g .kw, html.ad-on .ads-gauges.lit .g .vol{ opacity:1; transition:opacity .5s linear calc(1s + var(--d) * .25s); }
  /* 02 */
  html.ad-on .pin{ opacity:0; transform:translateY(-60px); } html.ad-on .ads-map.lit .pin{ animation:adDropPin .7s cubic-bezier(.3,1.5,.5,1) forwards; animation-delay:calc(.2s + var(--d) * .16s); }
  @keyframes adDropPin{ to{ opacity:1; transform:none; } }
  html.ad-on .pin b{ opacity:0; } html.ad-on .ads-map.lit .pin b{ opacity:1; transition:opacity .4s linear calc(.7s + var(--d) * .16s); }
  html.ad-on .ads-pinlist li{ opacity:0; transform:translateY(10px); } html.ad-on .ads-pinlist.lit li{ animation:adIn .45s ease forwards; animation-delay:calc(var(--d) * .08s); }
  html.ad-on .ads-side .ad-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.ad-on .ads-side.lit .ad-img{ transform:none; }
  html.ad-on .ads-side figcaption{ opacity:0; } html.ad-on .ads-side.lit figcaption{ opacity:1; transition:opacity .5s linear .5s; }
  /* 03 */
  html.ad-on .bld{ clip-path:inset(100% 0 0 0); } html.ad-on .ads-rise.lit .bld{ animation:adRise .9s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  @keyframes adRise{ to{ clip-path:inset(0 0 0 0); } }
  /* 04 */
  html.ad-on .strike i{ transform:scaleX(0); } html.ad-on .ads-head.lit .strike i{ animation:adRule .7s cubic-bezier(.3,0,.2,1) 1s forwards; }
  @keyframes adRule{ to{ transform:scaleX(1); } }
  html.ad-on .ads-promise .col{ opacity:0; transform:translateY(20px); } html.ad-on .ads-promise.lit .col{ animation:adIn .7s cubic-bezier(.2,.8,.2,1) forwards; } html.ad-on .ads-promise.lit .col.yes{ animation-delay:.2s; }
  /* 05 */
  html.ad-on .dome .ad-img{ clip-path:ellipse(0% 0% at 50% 100%); } html.ad-on .dome.lit .ad-img{ animation:adDome 1.1s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .22s); }
  @keyframes adDome{ to{ clip-path:ellipse(130% 130% at 50% 100%); } }
  html.ad-on .dome figcaption{ opacity:0; transform:translateY(10px); } html.ad-on .dome.lit figcaption{ animation:adIn .5s ease forwards; animation-delay:calc(.6s + var(--d) * .22s); }
  /* 06 */
  html.ad-on .ads-tide li i{ transform:scaleY(0); } html.ad-on .ads-tide.lit li i{ animation:adTide 1.2s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .2s); }
  @keyframes adTide{ to{ transform:scaleY(var(--lvl-f)); } }
  html.ad-on .ads-tide li b, html.ad-on .ads-tide li span{ opacity:0; } html.ad-on .ads-tide.lit li b, html.ad-on .ads-tide.lit li span{ opacity:1; transition:opacity .5s linear calc(.4s + var(--d) * .2s); }
  html.ad-on .drv{ opacity:0; transform:translateY(14px); } html.ad-on .ads-drivers.lit .drv{ animation:adIn .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  /* 07 */
  html.ad-on .ads-qs li::after{ transform:scaleX(0); } html.ad-on .ads-qs.lit li::after{ animation:adRule .7s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  html.ad-on .ads-qs li > *{ opacity:0; } html.ad-on .ads-qs.lit li > *{ opacity:1; transition:opacity .5s linear calc(.2s + var(--d) * .12s); }
  @supports (animation-timeline: view()){ .ads-bandfig .ad-img{ animation:adDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; } @keyframes adDrift{ from{ transform:scale(1.14) translateX(-3%); } to{ transform:scale(1.14) translateX(3%); } } }
  @media (prefers-reduced-motion: reduce){ html.ad-on .adh-sky .line, html.ad-on .adh-sky .towers rect, html.ad-on .adh-text > *, html.ad-on .ads-head .ads-k b, html.ad-on .ads-head .ads-h2, html.ad-on .ads-head .ads-lede, html.ad-on .g .dial .needle, html.ad-on .g b, html.ad-on .g .kw, html.ad-on .g .vol, html.ad-on .pin, html.ad-on .pin b, html.ad-on .ads-pinlist li, html.ad-on .ads-side .ad-img, html.ad-on .ads-side figcaption, html.ad-on .bld, html.ad-on .strike i, html.ad-on .ads-promise .col, html.ad-on .dome .ad-img, html.ad-on .dome figcaption, html.ad-on .ads-tide li i, html.ad-on .ads-tide li b, html.ad-on .ads-tide li span, html.ad-on .drv, html.ad-on .ads-qs li::after, html.ad-on .ads-qs li > *, .ads-bandfig .ad-img{ opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; stroke-dashoffset:0 !important; } }
`;

const JS = `
/* ae_abu_dhabi.js : light each frame once as it arrives. html.ad-on is added only here. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    /* tide levels as a scale factor before the start state applies */
    var tides = document.querySelectorAll('.ads-tide li');
    for (var t = 0; t < tides.length; t++) { var lvl = parseFloat(tides[t].style.getPropertyValue('--lvl')) || 100; tides[t].style.setProperty('--lvl-f', String(lvl / 100)); }
    document.documentElement.classList.add('ad-on');
    var frames = document.querySelectorAll('.adh, .ads-head, .ads-gauges, .ads-map, .ads-pinlist, .ads-side, .ads-rise, .ads-promise, .dome, .ads-tide, .ads-drivers, .ads-qs');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"'); s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"'); s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];
s = L.setHead(s, {
  title: 'SEO Services in Abu Dhabi | Honest, from a Team Four Hours Away | TechAuditPros',
  ogTitle: 'SEO Services in Abu Dhabi &mdash; from a team four hours away',
  desc: 'SEO services, websites and ERP for Abu Dhabi businesses &mdash; Al Reem, Khalifa City, Mussafah, Yas, Al Ain &mdash; from an engineering team in Kochi. No office on the Corniche, said first. The softest search shelf in the Emirates, published AED prices attributed, no guaranteed-ranking promises, weekly staging URL.',
  url: URL,
  hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/ae/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', 'https://techauditpros.com/ae/'], ['Abu Dhabi', URL]]),
  L.serviceSchema({ name: 'SEO Services in Abu Dhabi', desc: 'SEO with AI-search optimisation, local SEO, website development and custom ERP for businesses in Abu Dhabi, delivered from Kochi.', url: URL, area: 'Abu Dhabi' }),
  L.faqSchema(FAQS),
]);
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, ''); s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, ''); s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');
s = L.setBody(s, [L.answer(ANSWER), S1, S2, S3, S4, S5, S6, S7, BAND, L.faqHtml('city-faq', 'Questions Abu Dhabi businesses ask us', 'Twelve straight answers, starting with the office.', FAQS)].join('\n').split('__WA__').join(WA));
s = L.setFinalCta(s, 'Send us the Abu Dhabi page that should be ranking. We will tell you why it is not.', 'Takes 60 seconds &middot; For Abu Dhabi businesses &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Abu Dhabi');
s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Abu Dhabi.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING BUSINESSES ACROSS THE UAE');
s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Abu Dhabi &bull; Al Reem &bull; Khalifa City &bull; Mussafah &bull; Yas &bull; Saadiyat &bull; Al Ain &bull; KIZAD &bull; Dubai &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'], ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'], ['manage audits and deployments securely', 'manage builds and deployments securely'], ['>SEO Audit Kochi<', '>SEO in Kochi<'], ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.']]) if (s.includes(from)) s = s.split(from).join(to);
{ const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt); }
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" on /ae/abu-dhabi/: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on /ae/abu-dhabi/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 4000) throw new Error('only ' + words + ' words; parity needs 4,000+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.split(path.sep).join('/').endsWith('/ae/abu-dhabi/index.html'));
  const used = []; for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<div class="pin"', PINS.length); L.must(s, '<article class="bld"', SECTORS.length); L.must(s, 'class="adh-sky"', 1); L.must(s, '<figure class="dome"', 2);
fs.mkdirSync(path.join(L.REPO, 'ae', 'abu-dhabi'), { recursive: true });
L.write('ae/abu-dhabi/index.html', s);
console.log('/ae/abu-dhabi/ written — the Corniche line, gauges, pins, rising sectors, the guarantee problem, domes, tide, 12 FAQs');
