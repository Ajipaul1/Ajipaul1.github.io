'use strict';
// /ae/dubai/ — PLAN-AE §2 page 4: win the tail now, grow into the 8,100/month head terms.
//
// DATA (ae_read.js, 2026-09-07): seo expert dubai 1,000/KD29 · local seo packages dubai 480/16 · seo packages dubai
//   320/25 · website development dubai 1,600/37 · best website development company in dubai 390/29 · best website
//   developers in dubai 480/40 · erp software dubai 480/33 · top erp companies in dubai 320/25 · best erp software
//   solution provider in dubai 320/16 · erp dubai 320/33 — ~5,500/mo winnable. Head terms (seo agency dubai 8,100/51,
//   seo company dubai 8,100/53, best seo company in dubai 2,900/42) are year two; this page is built to grow into them.
// WHAT RANKS (live, 2026-09-07): "seo expert dubai" = named consultants — shahidmaqbool.com (~3,500 words, 9 FAQs,
//   16 yrs, 450 projects, 300 clients, no price, 7 emirates listed, GEO named), saadrazadigital (~1,200, 10+ yrs,
//   1,000+ clients, Fiverr/Upwork badges, no FAQ), nivilseo, jijojosephseo, plus Upwork and LinkedIn lists.
//   "local seo packages dubai" = agencies publishing AED: lucidly.ae (~3,500 words, 8 FAQs, AED 1,500–2,500 /
//   2,500–4,500 / 4,500–7,000 tiers, "what to avoid" list), bold-in.com (AED 1,500–3,500; warns off AED 500–1,000
//   packages; from AED 2,000 on its packages page), GMI, GS Digital. Digital Gravity publishes AED 8k–40k design /
//   15k–100k+ development for websites.
//   Parity: 4,000+ words · 12 FAQs · AED ranges attributed · neighbourhoods named · the consultant shelf answered honestly
//   (a team vs a person) · no office said first · WhatsApp CTA.
// RULES as /ae/ (PLAN-AE §9): brand palette (paper / paper-alt / navy-deep / orange), image-led, no cinema props;
//   no "audit" as a service word, no "offshore", no price of ours; own photos (asserted); start states under html.dx-on.
//
// DESIGN — nothing from /ae/, /ae/abu-dhabi/, /ae/ecommerce-website-development/, /in/ or /uk/:
//   SIGNATURE "the skyline staircase": six photo tiles step up left to right like towers, each carrying one Dubai term
//   from the winnable tail (KD 16) to the head (KD 51, "year two"); they rise in sequence from the waterline.
//   Per section: consultant business cards fan out · neighbourhood chips inflate onto an aerial · blueprint lines draw
//   over the websites photo and fade · navy containers stack for the trade/ERP act · price rows slide in with their
//   sources · questions with orange rules that draw · a Burj Al Arab band that drifts.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/dubai/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'dx-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
const STOCK = {
  hero: 'dxb-skyline-across-water', experts: 'dxb-two-people-walking',
  s1: 'dxb-palm-lined-street', s2: 'dxb-highway-buildings', s3: 'dxb-bridge-over-water', s4: 'ae-metro-past-towers', s5: 'ae-boat-near-marina-towers', s6: 'dxb-skyline-night',
  local: 'dxb-aerial-resort-marina', web: 'dxb-night-street-lights', trade: 'ae-creek-boats-group', cost: 'dxb-burj-al-arab-aerial', check: 'dxb-jumeirah-beach-people', band: 'dxb-burj-al-arab-day',
};

// ---------------------------------------------------------------------------------------------
const H1 = 'SEO expert in Dubai? Here is the honest version, <span>from a team four hours away.</span>';
const SUB = 'Dubai searches for an SEO expert a thousand times a month and finds named consultants with sixteen-year histories and Fiverr badges; it searches for local SEO packages and finds tiers from AED 1,500 to AED 7,000. We are an engineering team in Kochi with no Dubai office &mdash; a four-hour flight, ninety minutes on the clock &mdash; and this page tells you what is winnable in Dubai search right now, what the packages actually contain, and when a good Dubai consultant is the better buy.';
const ANSWER = 'TechAuditPros provides <strong>SEO, website development and custom ERP</strong> to businesses in <strong>Dubai</strong> &mdash; Downtown and Business Bay, Jumeirah and the Marina, Deira, Al Quoz, JLT, Al Barsha, Bur Dubai and out to JAFZA &mdash; from an engineering team in Kochi, India, four hours from Dubai on the same working week. No Dubai office, said first; a staging URL you can open every week and a written report every month instead. The Dubai head terms (&ldquo;SEO agency Dubai&rdquo;, 8,100 searches a month) are owned by agencies of sixty to two hundred people at a difficulty above fifty; what is winnable now is the tail &mdash; local SEO in your neighbourhood, website and e-commerce development, ERP for traders &mdash; and this page is built to win it, then grow.';

const STAIRS = [
  ['local seo packages dubai', 480, 16, 's1'],
  ['best erp software solution provider in dubai', 320, 16, 's2'],
  ['seo packages dubai', 320, 25, 's3'],
  ['seo expert dubai', 1000, 29, 's4'],
  ['website development dubai', 1600, 37, 's5'],
  ['seo agency dubai', 8100, 51, 's6'],
];

const CARDS = [
  ['16 years &middot; 450 projects &middot; 300 clients', 'a Dubai consultant ranking first page for &ldquo;SEO expert Dubai&rdquo;; no prices published'],
  ['10+ years &middot; 1,000+ clients &middot; Fiverr Level Two', 'a second consultant, ranked in Karachi and Dubai, badges from Google, HubSpot, Moz and Semrush'],
  ['Upwork &middot; LinkedIn', 'the marketplaces that rank beside them: hourly experts, four steps to hire, no accountability past the gig'],
];

const HOODS = [
  ['Downtown &amp; Business Bay', 'Head offices, D2C brands, clinics in towers; brand terms and map results.'],
  ['Jumeirah &amp; Umm Suqeim', 'Clinics, salons, schools and villas&rsquo; service trades; the map decides.'],
  ['Dubai Marina &amp; JLT', 'Residents on phones, restaurants and services; reviews carry the shelf.'],
  ['Deira &amp; Bur Dubai', 'Trading houses and wholesalers with strong offline names and no site to speak of.'],
  ['Al Quoz', 'Warehouses, workshops and galleries; the stock system before the website.'],
  ['Al Barsha &amp; Karama', 'Family services, nurseries, healthcare; searched in English, Hindi and Arabic.'],
  ['JAFZA &amp; Jebel Ali', 'Distributors and manufacturers whose buyers search from other countries.'],
  ['Silicon Oasis &amp; Academic City', 'Tech firms and education; English search, international audience.'],
];

const TIERS = [
  ['AED 1,500 &ndash; 2,500 / month', 'startups, single location: profile optimisation, keyword mapping, a basic review', 'a Dubai agency&rsquo;s published guide'],
  ['AED 2,500 &ndash; 4,500 / month', 'growing clinics and SMBs: local landing pages, technical fixes, competitor review', 'the same guide'],
  ['AED 4,500 &ndash; 7,000 / month', 'competitive sectors, multi-location: content planning, technical SEO, authority', 'the same guide'],
  ['AED 1,500 &ndash; 3,500 / month', 'small businesses &mdash; with a warning that AED 500&ndash;1,000 packages are automation', 'a second Dubai agency'],
  ['AED 8,000 &ndash; 40,000 design; 15,000 &ndash; 100,000+ build', 'websites, as published by the largest Dubai web agency', 'its pricing page'],
];

const CHECK = [
  ['Who, by name, does the work &mdash; and is it one person?', 'A consultant is one person&rsquo;s judgement: excellent for a defined job, and one holiday away from a stop. An agency of two hundred is the opposite risk. Ask which you are buying.'],
  ['Which neighbourhood, and which map pack?', 'Dubai is not one market. A clinic in Jumeirah and a wholesaler in Deira are different shelves. If the proposal says &ldquo;Dubai&rdquo;, it has not looked.'],
  ['Can I open the staging site today?', 'Work in progress is visible or it is not happening yet.'],
  ['What exactly is in the package?', 'Two Dubai agencies publish what AED 1,500 buys and what to avoid. Hold any proposal to that list: deliverables named, reports you can open, no guaranteed rankings.'],
  ['What do I keep if I stop in month three?', 'Accounts, code, content, reports and the plan. If any stays with the supplier, the AED figure is not the price.'],
  ['Will you say when a Dubai consultant is the better answer?', 'Often it is: a defined job, a fixed budget, your own developer. Anyone who never says so is selling.'],
];

const FAQS = [
  { q: 'Do you have an office in Dubai?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight, ninety minutes apart on the clock, the same Monday-to-Friday week. Dubai clients open a staging URL every week and receive a written report every month; we visit for kick-offs and systems projects when it earns the journey. If your project needs people in the room, several good Dubai agencies and consultants rank for these searches, and we will say so on the first call.' },
  { q: 'Should I hire an SEO expert in Dubai or a team?', a: 'Hire a consultant when the job is defined, the budget is fixed and you have a developer who can make the changes; hire a team when the work spans the website, the search work and the systems behind them, or when continuity matters more than the lowest monthly figure. The consultants ranking for this search are genuinely experienced; where they fail is capacity and range, and we say so plainly.' },
  { q: 'How much do local SEO packages cost in Dubai?', a: 'Dubai agencies publishing prices in September 2026 put local SEO at AED 1,500&ndash;2,500 a month for a single location, AED 2,500&ndash;4,500 for growing clinics and SMBs, and AED 4,500&ndash;7,000 for competitive multi-location work; another publishes AED 1,500&ndash;3,500 and warns that AED 500&ndash;1,000 packages are automation. Those are their figures. We do not publish a rate card; you get a written plan for the first ninety days and a price against it.' },
  { q: 'What is winnable in Dubai search right now?', a: 'The tail. &ldquo;Local SEO packages Dubai&rdquo; sits at difficulty 16, &ldquo;SEO expert Dubai&rdquo; at 29, &ldquo;website development Dubai&rdquo; at 37 and the ERP terms at 16&ndash;33; the head terms &mdash; &ldquo;SEO agency Dubai&rdquo; at 8,100 searches a month &mdash; sit above 50 and are owned by large agencies. A page that wins the tail honestly is the page that grows into the head terms in year two.' },
  { q: 'Which Dubai neighbourhoods do you work with?', a: 'All of them, and the work differs: Downtown and Business Bay brands live on brand terms and maps; Jumeirah and Marina services on reviews; Deira and Bur Dubai traders need a website that exists; Al Quoz and JAFZA businesses usually need the stock system before the storefront. The proposal names your neighbourhood, not &ldquo;Dubai&rdquo;.' },
  { q: 'Do you build websites in Dubai?', a: 'Yes &mdash; &ldquo;website development Dubai&rdquo; is 1,600 searches a month and part of what this page is for. WordPress when your staff must edit it, Shopify or WooCommerce for a store, Next.js when the catalogue or portal is unusual; fast on Etisalat and du mobile data, VAT-compliant, delivered in your repository with a staging URL from week one. The largest Dubai web agency publishes AED 8,000&ndash;40,000 for design and AED 15,000&ndash;100,000+ for development; ours comes after a plan.' },
  { q: 'Do you build ERP for Dubai trading companies?', a: 'Yes. Stock, orders, purchasing, pricing rules and job costing in one system with UAE VAT, Corporate Tax, PINT-AE e-invoicing, WPS and EOSB built in &mdash; for Deira traders, Al Quoz distributors and JAFZA importers whose storefront and warehouse disagree. &ldquo;ERP software Dubai&rdquo; and its cousins are 1,400 searches a month, and the ranking vendors sell Arabic RTL and fourteen-day guarantees; we sell the number on the page being true.' },
  { q: 'How long until we see results in Dubai?', a: 'Local results in one neighbourhood typically move within three to six months here; the citywide head terms are a year-two project by any honest measure. The first month should still show visible work on the staging URL &mdash; a profile corrected, fixes shipped, pages rewritten. If it does not, ask why, whoever you hired.' },
  { q: 'Do you handle Arabic?', a: 'Where the data says your customers search in Arabic, yes &mdash; bilingual pages with correct hreflang and RTL. In the UAE export we work from, 99% of search volume is English, so pages are English-first; ERP interfaces and invoices are bilingual because the people using them need it.' },
  { q: 'What should a local SEO package in Dubai avoid?', a: 'The ranking guides agree, and so do we: guaranteed first-page rankings, very cheap packages with vague deliverables, hundreds of low-quality backlinks, no access to reporting, the same package for every business type, and ignoring the website itself. Add one from us: any package that does not name your neighbourhood.' },
  { q: 'How do I know work is happening each month?', a: 'You open the staging URL and see what changed; you read the monthly report against the ninety-day plan; you can ask for the commit history. If a supplier cannot show you the work before it goes live, you are being asked to trust the invoice.' },
  { q: 'What happens if I stop after three months?', a: 'You keep everything: code, accounts, content, the report history and the plan. No notice period measured in quarters, no retainer trap. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
];

// ---------------------------------------------------------------------------------------------
const HERO = [
  '<section class="dxh" id="dx-hero" aria-label="SEO expert in Dubai, the honest version">',
  '  <div class="dxh-plate">' + img(STOCK.hero, 'The Dubai skyline across the water', '100vw', 'dx-img', true) + '</div>',
  '  <div class="container dxh-text">',
  '    <p class="eyebrow">Dubai &middot; Downtown &middot; Marina &middot; Jumeirah &middot; Deira &middot; Al Quoz &middot; JAFZA</p>',
  '    <h1>' + H1 + '</h1>',
  '    <p class="dxh-sub">' + SUB + '</p>',
  '    <div class="dxh-ctas"><a class="dx-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="dx-btn ghost" href="#dx-stairs">What is winnable now &darr;</a></div>',
  '    <ul class="dxh-facts"><li><b>250+</b> projects</li><li><b>128+</b> active clients</li><li><b>16</b> countries</li><li><b>4.9/5</b> rating</li></ul>',
  '  </div>',
  '</section>',
].join('\n');

const head = (eyebrow, title, lede) => '      <div class="dxs-head"><p class="eyebrow">' + eyebrow + '</p><h2 class="dxs-h2">' + title + '</h2>' + (lede ? '<p class="dxs-lede">' + lede + '</p>' : '') + '</div>';

const S1 = [
  '<section class="dxs" id="dx-experts" aria-label="Who ranks for SEO expert Dubai">',
  '  <div class="container dxs-two">',
  '    <div>',
  head('Who ranks for &ldquo;SEO expert Dubai&rdquo;', 'Dubai searches for one expert. It finds sixteen-year consultants, Fiverr badges and Upwork.', 'The people who rank for this search are individuals, and good ones: a consultant with sixteen years and 450 projects, another with a thousand clients and marketplace badges, and the marketplaces themselves. Nobody publishes a price. That tells you what Dubai has been buying &mdash; one person&rsquo;s judgement, hired quickly &mdash; and where it goes wrong: capacity, range, and the month the one person is unavailable. We are a team, which is a side too, so here is the comparison with the row where the consultant wins.'),
  '      <div class="dxs-cards">' + CARDS.map(([b, by], i) => '<div class="bc" style="--d:' + i + '"><b>' + b + '</b><span>' + by + '</span></div>').join('') + '</div>',
  '    </div>',
  '    <figure class="dxs-side">' + img(STOCK.experts, 'Two people walking down a Dubai street', '(max-width:860px) 100vw, 40vw') + '<figcaption>One person or a team: both are right for something. The job decides, not the label.</figcaption></figure>',
  '  </div>',
  '  <div class="container"><div class="dxs-tblwrap"><table class="dxs-tbl"><thead><tr><th>Question</th><th>A Dubai SEO consultant</th><th class="hi">A team in Kochi</th></tr></thead><tbody>' + [
    ['Capacity', 'One holiday, one better client, and your work pauses.', 'Someone is always on it; a written record means anyone continues.'],
    ['Range', 'Excellent at search. A template fix, a migration or a stock integration becomes a second supplier.', 'A developer, a search specialist and a systems engineer on one invoice.'],
    ['Who you talk to', 'The person doing the work &mdash; the real strength.', 'The people doing the work. No account layer.'],
    ['Where they are', 'Dubai. In the room if you need it.', 'Kochi. On a screen every week, with the staging URL open.'],
    ['When you stop', 'Depends on the individual.', 'Everything yours from day one.'],
    ['Wins when', 'The job is defined, the budget is fixed and you have a developer.', 'The site, the search work and the system need doing together.'],
  ].map(([q, a, b], i) => '<tr style="--d:' + i + '"><th scope="row">' + q + '</th><td data-l="Consultant">' + a + '</td><td class="hi" data-l="Team">' + b + '</td></tr>').join('') + '</tbody></table></div></div>',
  '</section>',
].join('\n');

const S2 = [
  '<section class="dxs dark" id="dx-stairs" aria-label="What is winnable in Dubai search">',
  '  <div class="container">',
  head('The staircase', 'What is winnable in Dubai search now, and what is a year-two climb.', 'Six Dubai terms from the owner&rsquo;s September 2026 export, in order of difficulty. The bottom steps are open to honest work today; the top step &mdash; 8,100 searches a month for &ldquo;SEO agency Dubai&rdquo; &mdash; belongs to agencies of two hundred people and is a year-two target. This page is built to take the steps in order.'),
  '    <div class="dxs-stairs" role="img" aria-label="Six keyword tiles stepping up from difficulty 16 to 51">' + STAIRS.map(([kw, vol, kd, p], i) => '<figure class="step" style="--d:' + i + ';--h:' + (44 + i * 11) + '%">' + img(STOCK[p], ({ s1: 'A palm-lined street in Dubai', s2: 'A Dubai highway with vehicles and towers', s3: 'A bridge over the water with the Dubai skyline behind', s4: 'A Dubai Metro train travelling past high-rise towers', s5: 'A boat near Dubai Marina towers', s6: 'The Dubai skyline at night' })[p], '(max-width:860px) 50vw, 16vw') + '<figcaption><b>KD ' + kd + '</b><span>&ldquo;' + kw + '&rdquo;</span><i>' + vol.toLocaleString('en-IN') + ' / mo' + (kd > 40 ? ' &middot; year two' : '') + '</i></figcaption></figure>').join('') + '</div>',
  '    <p class="dxs-p on-dark">Keyword difficulty is Semrush&rsquo;s 0&ndash;100 estimate of how hard a first-page ranking is. Below 30 an honest ninety-day plan moves a page; above 50 it takes authority the site does not yet have in the Emirates. We say which step you are on before we quote.</p>',
  '  </div>',
  '</section>',
].join('\n');

const S3 = [
  '<section class="dxs alt" id="dx-local" aria-label="Local SEO packages in Dubai">',
  '  <div class="container dxs-two rev">',
  '    <div class="dxs-aerial"><figure>' + img(STOCK.local, 'An aerial view of a Dubai resort and marina', '(max-width:860px) 100vw, 46vw') + '</figure><div class="chips">' + HOODS.map(([n], i) => '<span style="--d:' + i + '">' + n + '</span>').join('') + '</div></div>',
  '    <div>',
  head('Local SEO packages in Dubai', 'A local SEO package is only local if it names your neighbourhood.', '&ldquo;Local SEO packages Dubai&rdquo; is the softest term on this page, and the agencies ranking for it publish real tiers &mdash; AED 1,500 to 7,000 a month &mdash; and honest warnings about what to avoid. What most packages still miss is that Dubai is eight markets, not one: a clinic in Jumeirah, a wholesaler in Deira and a workshop in Al Quoz do not share a map pack, a buyer or a first project.'),
  '      <ol class="dxs-hoods">' + HOODS.map(([n, p], i) => '<li style="--d:' + i + '"><b>' + n + '</b><span>' + p + '</span></li>').join('') + '</ol>',
  '      <p class="dxs-p">The first thirty days are the same everywhere and cost attention, not money: primary category, an address identical everywhere, hours true this month including Ramadan, twelve recent photographs, a review habit, services named in English and Arabic. Then the paid work: a page per neighbourhood, citations that agree, and the technical layer that lets it load on du 4G.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S4 = [
  '<section class="dxs" id="dx-web" aria-label="Website development in Dubai">',
  '  <div class="container dxs-two">',
  '    <div>',
  head('Websites in Dubai', 'Sixteen hundred searches a month for a website developer, and one agency that publishes what it costs.', '&ldquo;Website development Dubai&rdquo; is the largest winnable term on this page. The agencies ranking for it are large, awarded and mostly silent on price; the one that publishes quotes AED 8,000&ndash;40,000 for design and AED 15,000&ndash;100,000+ for development. Whatever the figure, a Dubai site has to be fast on Etisalat and du mobile data, VAT-compliant if it sells, bilingual where the data says so, and yours &mdash; repository, hosting and domain in your name.'),
  '      <ul class="dxs-list"><li><b>WordPress</b> when your staff must edit it.</li><li><b>Shopify or WooCommerce</b> for a store &mdash; the six UAE checkout realities are on the <a href="/ae/ecommerce-website-development/">e-commerce page</a>.</li><li><b>Next.js</b> when the catalogue, portal or pricing is unusual.</li><li><b>Always:</b> a staging URL from week one, Core Web Vitals measured on a mid-range Android on 4G, and the code handed over.</li></ul>',
  '    </div>',
  '    <figure class="dxs-blue">' + img(STOCK.web, 'A Dubai street at night, full of light', '(max-width:860px) 100vw, 46vw') + '<svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">' + [[4, 6, 96, 6], [4, 6, 4, 54], [96, 6, 96, 54], [4, 54, 96, 54], [4, 16, 96, 16], [30, 16, 30, 54], [30, 34, 96, 34]].map(([a, b, c, d], i) => '<line x1="' + a + '" y1="' + b + '" x2="' + c + '" y2="' + d + '" pathLength="1" style="--d:' + i + '" />').join('') + '</svg><figcaption>The blueprint is the cheap part. The build is measured on a phone in a taxi.</figcaption></figure>',
  '  </div>',
  '</section>',
].join('\n');

const S5 = [
  '<section class="dxs dark" id="dx-trade" aria-label="ERP for Dubai traders">',
  '  <div class="container dxs-two rev">',
  '    <div class="dxs-stack" aria-label="Containers stacking: storefront, warehouse, accounts, one system">' + ['Storefront', 'Warehouse in Al Quoz', 'Accounts &amp; VAT', 'One system'].map((t, i) => '<div class="ctr" style="--d:' + i + '"><span>' + t + '</span></div>').join('') + '</div>',
  '    <div>',
  head('ERP for Dubai&rsquo;s traders', 'Dubai runs on trade, and trade runs on stock kept in three places.', '&ldquo;ERP software Dubai&rdquo;, &ldquo;top ERP companies in Dubai&rdquo; and &ldquo;best ERP software solution provider in Dubai&rdquo; are 1,400 searches a month between them, and the vendors ranking for them sell Arabic interfaces and fourteen-day guarantees. What a Deira trading house or a JAFZA distributor actually needs is one number: the stock the warehouse holds, on the page the customer sees and in the ledger the accountant files. We build that system &mdash; stock, orders, purchasing, pricing rules, job costing &mdash; with VAT, Corporate Tax, PINT-AE e-invoicing, WPS and EOSB built in, and connect the storefront to it.'),
  '      <figure class="dxs-side short">' + img(STOCK.trade, 'Boats moored together on Dubai Creek', '(max-width:860px) 100vw, 46vw') + '<figcaption>The Creek, where the trade started. Most of it still runs on paper and a phone.</figcaption></figure>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S6 = [
  '<section class="dxs alt" id="dx-cost" aria-label="What it costs in Dubai">',
  '  <div class="container dxs-two">',
  '    <div>',
  head('What it costs in Dubai', 'The published tiers, attributed, and the four things that move any of them.', 'Two Dubai agencies publish local SEO tiers; one publishes website ranges. Here they are as published in September 2026. Ours is not on the table, because a tier is not a plan.'),
  '      <ol class="dxs-tiers">' + TIERS.map(([p, inc, by], i) => '<li style="--d:' + i + '"><b>' + p + '</b><span>' + inc + '</span><i>' + by + '</i></li>').join('') + '</ol>',
  '    </div>',
  '    <div>',
  '      <figure class="dxs-side short">' + img(STOCK.cost, 'An aerial view of the Burj Al Arab in the sea', '(max-width:860px) 100vw, 46vw') + '<figcaption>Dubai prices run from a thousand dirhams to a hundred thousand for the same word. The plan explains the number.</figcaption></figure>',
  '      <div class="dxs-drivers">' + [['How much of the work is engineering', 'A site that is slow on 4G and half-indexed needs a developer before a writer. The tiers above assume the site is fine.'], ['Which neighbourhood, which shelf', 'A Jumeirah clinic and a citywide brand are different projects sold under one word; the staircase above is why.'], ['Who ships the changes', 'Recommendations that wait in your IT company&rsquo;s queue cost you the waiting. Our developer is on the team.'], ['One discipline or three', 'Search alone; search plus a site; search plus a site plus the stock system. Sequenced, cheaper and calmer.']].map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S7 = [
  '<section class="dxs" id="dx-check" aria-label="Before you hire anyone in Dubai">',
  '  <div class="container dxs-two rev">',
  '    <figure class="dxs-side">' + img(STOCK.check, 'People on Jumeirah beach with the Dubai skyline behind', '(max-width:860px) 100vw, 40vw') + '<figcaption>Six questions, for the consultant and the agency alike.</figcaption></figure>',
  '    <div>',
  head('Before you hire anyone', 'Six questions for any SEO expert or agency in Dubai &mdash; including one four hours away.', 'They separate the people who do the work from the people who sell it. They apply to us word for word.'),
  '      <ol class="dxs-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><b>0' + (i + 1) + '</b><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="dxs-band" aria-label="Start on WhatsApp">',
  '  <div class="dxs-bandfig">' + img(STOCK.band, 'The Burj Al Arab in Dubai by day', '100vw') + '</div>',
  '  <div class="container dxs-bandtext"><p class="eyebrow">No office in Dubai</p><h2 class="dxs-h2">Tell us your neighbourhood and the step you are on.</h2><p>Message us on WhatsApp or book a call. We will say what is winnable this quarter, what is a year-two climb, and when a Dubai consultant is the better buy.</p><a class="dx-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_dubai.js : "the skyline staircase" ================= */
  .dx-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .dx-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .dx-btn:hover{ background:var(--orange-dark); } .dx-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }
  .dxh{ position:relative; min-height:82svh; background:var(--navy-deep); color:#fff; overflow:hidden; display:grid; align-items:center; }
  .dxh-plate{ position:absolute; inset:0; } .dxh-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.94) 0%, rgba(11,32,54,.72) 45%, rgba(11,32,54,.3) 100%); }
  .dxh-text{ position:relative; z-index:2; padding:clamp(100px,14vh,160px) 0 clamp(56px,8vh,100px); }
  .dxh .eyebrow{ color:rgba(255,255,255,.7); margin:0 0 14px; }
  .dxh h1{ font-size:clamp(1.9rem,4.2vw,3.8rem); line-height:1.05; letter-spacing:-.02em; margin:0 0 16px; color:#fff; max-width:22ch; } .dxh h1 span{ color:var(--orange); }
  .dxh-sub{ max-width:64ch; color:rgba(255,255,255,.82); font-size:clamp(.98rem,1.15vw,1.1rem); line-height:1.65; margin:0 0 20px; }
  .dxh-ctas{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
  .dxh-facts{ list-style:none; margin:0; padding:0; display:flex; gap:clamp(14px,3vw,40px); flex-wrap:wrap; font-family:var(--font-mono); font-size:.74rem; letter-spacing:.08em; color:rgba(255,255,255,.65); } .dxh-facts b{ color:#fff; margin-right:6px; }
  .dxs{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:var(--paper); }
  .dxs.dark{ background:var(--navy-deep); color:#fff; } .dxs.alt{ background:var(--paper-alt); }
  .dxs-head{ max-width:66ch; margin-bottom:clamp(22px,3vw,40px); } .dxs-head .eyebrow{ margin:0 0 10px; } .dxs.dark .eyebrow, .dxs-band .eyebrow{ color:rgba(255,255,255,.7); }
  .dxs-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); } .dxs.dark .dxs-h2, .dxs-band .dxs-h2{ color:#fff; }
  .dxs-lede, .dxs-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; } .dxs.dark .dxs-lede, .dxs-p.on-dark{ color:rgba(255,255,255,.8); }
  .dxs-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; }
  @media (min-width:860px){ .dxs-two{ grid-template-columns:7fr 5fr; } .dxs-two.rev{ grid-template-columns:5fr 7fr; } }
  .dxs-side{ margin:0; position:relative; aspect-ratio:4/5; overflow:hidden; border-radius:14px; } .dxs-side.short{ aspect-ratio:16/10; margin-top:14px; }
  .dxs-side figcaption, .dxs-blue figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  .dxs-list{ margin:0; padding:0 0 0 18px; line-height:1.6; color:var(--ink-soft); } .dxs-list li{ margin-bottom:8px; } .dxs-list b{ color:var(--ink); } .dxs-list a{ color:var(--orange); }
  /* 01 cards + table */
  .dxs-cards{ display:grid; grid-template-columns:1fr; gap:12px; margin-top:18px; perspective:900px; }
  @media (min-width:640px){ .dxs-cards{ grid-template-columns:repeat(3,1fr); } }
  .bc{ background:#fff; border:1px solid var(--line); border-radius:10px; padding:16px; box-shadow:0 10px 24px rgba(14,42,62,.1); transform-origin:left bottom; }
  .bc b{ display:block; font-family:var(--font-mono); font-size:.86rem; color:var(--ink); margin-bottom:6px; } .bc span{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }
  .dxs-tblwrap{ margin-top:clamp(22px,3vw,36px); overflow-x:auto; } .dxs-tbl{ width:100%; border-collapse:collapse; font-size:.94rem; line-height:1.55; min-width:640px; }
  .dxs-tbl th, .dxs-tbl td{ text-align:left; vertical-align:top; padding:14px 12px; border-bottom:1px solid var(--line); } .dxs-tbl thead th{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); border-bottom:2px solid var(--line-strong); }
  .dxs-tbl tbody th{ color:var(--ink); width:16%; } .dxs-tbl td{ color:var(--ink-soft); } .dxs-tbl .hi{ background:var(--orange-tint); color:var(--ink); }
  @media (max-width:700px){ .dxs-tbl{ min-width:0; } .dxs-tbl thead{ display:none; } .dxs-tbl, .dxs-tbl tbody, .dxs-tbl tr, .dxs-tbl th, .dxs-tbl td{ display:block; width:auto; } .dxs-tbl tbody tr{ margin-bottom:14px; border:1px solid var(--line); border-radius:12px; overflow:hidden; } .dxs-tbl tbody th{ background:var(--navy-deep); color:#fff; padding:12px 14px; border:0; } .dxs-tbl td{ padding:12px 14px; border:0; } .dxs-tbl td::before{ content:attr(data-l); display:block; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:4px; } }
  /* 02 stairs */
  .dxs-stairs{ display:grid; grid-template-columns:repeat(6,1fr); gap:10px; align-items:end; height:clamp(320px,44vw,560px); margin:clamp(18px,3vw,32px) 0; }
  .step{ margin:0; position:relative; height:var(--h); overflow:hidden; border-radius:10px 10px 0 0; background:rgba(255,255,255,.06); transform-origin:bottom center; }
  .step::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(11,32,54,.92) 0%, rgba(11,32,54,.35) 55%, rgba(11,32,54,.05) 100%); }
  .step figcaption{ position:absolute; z-index:2; left:10px; right:10px; bottom:10px; color:#fff; }
  .step figcaption b{ display:block; font-family:var(--font-mono); font-size:1.1rem; color:var(--orange); } .step figcaption span{ display:block; font-size:.78rem; line-height:1.3; margin:4px 0; } .step figcaption i{ font-style:normal; font-family:var(--font-mono); font-size:.64rem; letter-spacing:.08em; color:rgba(255,255,255,.7); }
  @media (max-width:860px){ .dxs-stairs{ grid-template-columns:repeat(3,1fr); height:auto; align-items:stretch; } .step{ height:auto; aspect-ratio:3/4; } }
  /* 03 aerial + chips */
  .dxs-aerial{ position:relative; } .dxs-aerial figure{ margin:0; aspect-ratio:4/3; overflow:hidden; border-radius:14px; }
  .dxs-aerial .chips{ position:absolute; inset:0; padding:14px; display:flex; flex-wrap:wrap; gap:8px; align-content:flex-end; }
  .dxs-aerial .chips span{ background:rgba(11,32,54,.85); color:#fff; font-size:.74rem; padding:6px 10px; border-radius:20px; border:1px solid rgba(255,255,255,.25); }
  .dxs-hoods{ list-style:none; margin:0 0 14px; padding:0; display:grid; gap:8px; }
  .dxs-hoods li{ display:grid; grid-template-columns:200px 1fr; gap:10px; padding:9px 0; border-bottom:1px solid var(--line); font-size:.92rem; } .dxs-hoods b{ color:var(--ink); } .dxs-hoods span{ color:var(--ink-soft); line-height:1.5; }
  @media (max-width:560px){ .dxs-hoods li{ grid-template-columns:1fr; } }
  /* 04 blueprint */
  .dxs-blue{ margin:0; position:relative; aspect-ratio:16/10; overflow:hidden; border-radius:14px; }
  .dxs-blue svg{ position:absolute; inset:0; width:100%; height:100%; } .dxs-blue line{ stroke:var(--orange); stroke-width:2; vector-effect:non-scaling-stroke; }
  /* 05 stack */
  .dxs-stack{ display:grid; gap:8px; align-content:end; min-height:320px; }
  .ctr{ background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.18); border-radius:8px; padding:22px 18px; color:#fff; font-weight:700; transform-origin:bottom center; position:relative; }
  .ctr::before{ content:''; position:absolute; left:14px; right:14px; top:6px; height:2px; background:repeating-linear-gradient(90deg, rgba(255,255,255,.3) 0 8px, transparent 8px 16px); }
  .ctr:last-child{ background:var(--orange); border-color:var(--orange); }
  /* 06 tiers */
  .dxs-tiers{ list-style:none; margin:0; padding:0; display:grid; gap:10px; }
  .dxs-tiers li{ background:#fff; border:1px solid var(--line); border-radius:10px; padding:14px 16px; display:grid; gap:3px; }
  .dxs-tiers b{ font-family:var(--font-mono); font-size:1rem; color:var(--ink); } .dxs-tiers span{ font-size:.86rem; color:var(--ink-soft); line-height:1.45; } .dxs-tiers i{ font-style:normal; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-faint); }
  .dxs-drivers{ display:grid; gap:14px; margin-top:18px; } .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; } .drv h3{ margin:0; font-size:1.02rem; color:var(--ink); } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:var(--ink-soft); }
  /* 07 */
  .dxs-qs{ list-style:none; margin:0; padding:0; } .dxs-qs li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:14px 0; position:relative; }
  .dxs-qs li::after{ content:''; position:absolute; left:0; right:0; bottom:0; height:2px; background:var(--orange); transform-origin:left center; opacity:.6; }
  .dxs-qs b{ font-family:var(--font-mono); color:var(--orange); font-size:1.3rem; } .dxs-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); } .dxs-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  /* band */
  .dxs-band{ position:relative; background:var(--navy-deep); color:#fff; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .dxs-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; } .dxs-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,32,54,.88) 0%, rgba(11,32,54,.5) 50%, rgba(11,32,54,.2) 100%); }
  .dxs-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); } .dxs-bandtext p{ color:rgba(255,255,255,.8); max-width:48ch; margin:0 0 18px; }
  @media (max-width:700px){ .dxs-bandfig{ aspect-ratio:4/5; } }

  /* ================= motion : start states only under html.dx-on ================= */
  html.dx-on .dxh-text > *{ opacity:0; transform:translateY(14px); } html.dx-on .dxh.lit .dxh-text > *{ animation:dxIn .7s cubic-bezier(.2,.7,.2,1) forwards; }
  html.dx-on .dxh.lit .dxh-text > *:nth-child(2){ animation-delay:.12s; } html.dx-on .dxh.lit .dxh-text > *:nth-child(3){ animation-delay:.24s; } html.dx-on .dxh.lit .dxh-text > *:nth-child(4){ animation-delay:.36s; } html.dx-on .dxh.lit .dxh-text > *:nth-child(5){ animation-delay:.48s; }
  html.dx-on .dxh-plate .dx-img{ transform:scale(1.06); transition:transform 2s cubic-bezier(.18,.72,.2,1); } html.dx-on .dxh.lit .dxh-plate .dx-img{ transform:none; }
  @keyframes dxIn{ to{ opacity:1; transform:none; } }
  html.dx-on .dxs-head .eyebrow, html.dx-on .dxs-head .dxs-h2, html.dx-on .dxs-head .dxs-lede{ opacity:0; transform:translateY(12px); }
  html.dx-on .dxs-head.lit .eyebrow{ animation:dxIn .5s ease forwards; } html.dx-on .dxs-head.lit .dxs-h2{ animation:dxIn .6s cubic-bezier(.2,.7,.2,1) .1s forwards; } html.dx-on .dxs-head.lit .dxs-lede{ animation:dxIn .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  html.dx-on .bc{ opacity:0; transform:rotate(-6deg) translateX(-30px); } html.dx-on .dxs-cards.lit .bc{ animation:dxFan .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .14s); } @keyframes dxFan{ to{ opacity:1; transform:none; } }
  html.dx-on .dxs-tbl tbody tr{ opacity:0; transform:translateX(-14px); } html.dx-on .dxs-tblwrap.lit tbody tr{ animation:dxIn .5s ease forwards; animation-delay:calc(var(--d) * .09s); }
  html.dx-on .dxs-side .dx-img, html.dx-on .dxs-aerial figure .dx-img, html.dx-on .dxs-blue .dx-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.dx-on .dxs-side.lit .dx-img, html.dx-on .dxs-aerial.lit figure .dx-img, html.dx-on .dxs-blue.lit .dx-img{ transform:none; }
  html.dx-on .dxs-side figcaption, html.dx-on .dxs-blue figcaption{ opacity:0; } html.dx-on .dxs-side.lit figcaption, html.dx-on .dxs-blue.lit figcaption{ opacity:1; transition:opacity .5s linear .6s; }
  html.dx-on .step{ transform:scaleY(0); } html.dx-on .dxs-stairs.lit .step{ animation:dxRise .9s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .16s); } @keyframes dxRise{ to{ transform:none; } }
  html.dx-on .step figcaption{ opacity:0; } html.dx-on .dxs-stairs.lit .step figcaption{ opacity:1; transition:opacity .4s linear calc(.6s + var(--d) * .16s); }
  html.dx-on .dxs-aerial .chips span{ opacity:0; transform:scale(.5); } html.dx-on .dxs-aerial.lit .chips span{ animation:dxPop .5s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(.4s + var(--d) * .1s); } @keyframes dxPop{ to{ opacity:1; transform:none; } }
  html.dx-on .dxs-hoods li{ opacity:0; transform:translateY(8px); } html.dx-on .dxs-hoods.lit li{ animation:dxIn .45s ease forwards; animation-delay:calc(var(--d) * .07s); }
  html.dx-on .dxs-blue line{ stroke-dasharray:1; stroke-dashoffset:1; opacity:1; } html.dx-on .dxs-blue.lit line{ animation:dxDraw 1.8s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(.2s + var(--d) * .18s); } @keyframes dxDraw{ 60%{ stroke-dashoffset:0; opacity:1; } 100%{ stroke-dashoffset:0; opacity:0; } }
  html.dx-on .ctr{ opacity:0; transform:translateY(-40px); } html.dx-on .dxs-stack.lit .ctr{ animation:dxLand .6s cubic-bezier(.3,1.3,.5,1) forwards; animation-delay:calc((3 - var(--d)) * .22s); } @keyframes dxLand{ to{ opacity:1; transform:none; } }
  html.dx-on .dxs-tiers li{ opacity:0; transform:translateX(-16px); } html.dx-on .dxs-tiers.lit li{ animation:dxIn .5s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.dx-on .drv{ opacity:0; transform:translateY(14px); } html.dx-on .dxs-drivers.lit .drv{ animation:dxIn .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.dx-on .dxs-qs li::after{ transform:scaleX(0); } html.dx-on .dxs-qs.lit li::after{ animation:dxRule .7s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .12s); } @keyframes dxRule{ to{ transform:scaleX(1); } }
  html.dx-on .dxs-qs li > *{ opacity:0; } html.dx-on .dxs-qs.lit li > *{ opacity:1; transition:opacity .5s linear calc(.2s + var(--d) * .12s); }
  @supports (animation-timeline: view()){ .dxs-bandfig .dx-img{ animation:dxDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; } @keyframes dxDrift{ from{ transform:scale(1.14) translateY(-4%); } to{ transform:scale(1.14) translateY(4%); } } }
  @media (prefers-reduced-motion: reduce){ html.dx-on .dxh-text > *, html.dx-on .dxh-plate .dx-img, html.dx-on .dxs-head .eyebrow, html.dx-on .dxs-head .dxs-h2, html.dx-on .dxs-head .dxs-lede, html.dx-on .bc, html.dx-on .dxs-tbl tbody tr, html.dx-on .dxs-side .dx-img, html.dx-on .dxs-aerial figure .dx-img, html.dx-on .dxs-blue .dx-img, html.dx-on .dxs-side figcaption, html.dx-on .dxs-blue figcaption, html.dx-on .step, html.dx-on .step figcaption, html.dx-on .dxs-aerial .chips span, html.dx-on .dxs-hoods li, html.dx-on .dxs-blue line, html.dx-on .ctr, html.dx-on .dxs-tiers li, html.dx-on .drv, html.dx-on .dxs-qs li::after, html.dx-on .dxs-qs li > *, .dxs-bandfig .dx-img{ opacity:1 !important; transform:none !important; animation:none !important; transition:none !important; stroke-dashoffset:0 !important; } html.dx-on .dxs-blue line{ opacity:0 !important; } }
`;

const JS = `
/* ae_dubai.js : light each frame once as it arrives. html.dx-on is added only here. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('dx-on');
    var frames = document.querySelectorAll('.dxh, .dxs-head, .dxs-cards, .dxs-tblwrap, .dxs-side, .dxs-stairs, .dxs-aerial, .dxs-hoods, .dxs-blue, .dxs-stack, .dxs-tiers, .dxs-drivers, .dxs-qs');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"'); s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"'); s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];
s = L.setHead(s, {
  title: 'SEO Expert in Dubai? The Honest Version | Local SEO, Websites &amp; ERP | TechAuditPros',
  ogTitle: 'SEO expert in Dubai? The honest version, from a team four hours away',
  desc: 'Dubai searches for an SEO expert and finds consultants; for local SEO packages and finds AED 1,500&ndash;7,000 tiers. Here is what is winnable in Dubai search now, neighbourhood by neighbourhood, what the packages contain, websites and ERP for traders &mdash; from a Kochi team with no Dubai office, said first.',
  url: URL,
  hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/ae/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', 'https://techauditpros.com/ae/'], ['Dubai', URL]]),
  L.serviceSchema({ name: 'SEO, Website Development and ERP in Dubai', desc: 'Local SEO, website and e-commerce development, and custom ERP for businesses in Dubai, Business Bay, Jumeirah, the Marina, Deira, Al Quoz and JAFZA, delivered from Kochi.', url: URL, area: 'Dubai' }),
  L.faqSchema(FAQS),
]);
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, ''); s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, ''); s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');
s = L.setBody(s, [L.answer(ANSWER), S1, S2, S3, S4, S5, S6, S7, BAND, L.faqHtml('city-faq', 'Questions Dubai businesses ask us', 'Twelve straight answers, starting with the office.', FAQS)].join('\n').split('__WA__').join(WA));
s = L.setFinalCta(s, 'Tell us your neighbourhood. We will tell you which step you are on.', 'Takes 60 seconds &middot; For Dubai businesses &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Dubai');
s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Dubai.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING BUSINESSES ACROSS THE UAE');
s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Dubai &bull; Downtown &bull; Business Bay &bull; Jumeirah &bull; Marina &bull; Deira &bull; Al Quoz &bull; JAFZA &bull; Abu Dhabi &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'], ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'], ['manage audits and deployments securely', 'manage builds and deployments securely'], ['>SEO Audit Kochi<', '>SEO in Kochi<'], ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.']]) if (s.includes(from)) s = s.split(from).join(to);
{ const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt); }
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" on /ae/dubai/: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on /ae/dubai/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3800) throw new Error('only ' + words + ' words; parity needs 3,800+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.split(path.sep).join('/').endsWith('/ae/dubai/index.html'));
  const used = []; for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<figure class="step"', STAIRS.length); L.must(s, '<div class="bc"', CARDS.length); L.must(s, '<div class="ctr"', 4); L.must(s, 'class="dxs-blue"', 1);
fs.mkdirSync(path.join(L.REPO, 'ae', 'dubai'), { recursive: true });
L.write('ae/dubai/index.html', s);
console.log('/ae/dubai/ written — the skyline staircase, consultant cards, neighbourhood chips, blueprint, containers, attributed tiers, 12 FAQs');
