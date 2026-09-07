'use strict';
// /ae/ecommerce-website-development/ — PLAN-AE §2 page 3, the best web cluster in the UAE data.
//
// DATA (ae_read.js, 2026-09-07): ecommerce website development company dubai 1,600/KD22 · ecommerce website development
//   companies in dubai 590/25 · ecommerce website development uae 720/24 · ecommerce website development dubai 390/40 ·
//   ecommerce website development company 390/28 · ecommerce seo services 720/9 — ~3,700/mo.
// WHAT RANKS (live, 2026-09-07): magnetoitsolutions.com (~4,500 words, 5 FAQs, 15+ yrs, 250+ staff, "400+ stores",
//   "$15B empowered", Magento/Adobe/SAP/Salesforce, no price), indglobaldigital.com (~2,500, Magento-certified, 500+
//   clients, awards, no price), gcc-marketing.com (~2,800, since 2009, 1,100+ projects, Arabic option, WhatsApp, no
//   price). Digital Gravity (general web page) publishes AED 15,000–100,000+ for development. Every ranking page sells
//   Magento first; none names VAT-at-checkout, COD, Makani addresses, BNPL or Etisalat/du speed.
//   Parity: 4,000+ words · 12 FAQs · the six UAE checkout realities named · platforms compared honestly (Magento
//   last, not first) · the storefront–ERP stock truth · AED ranges attributed · no office said first · WhatsApp CTA.
// RULES as /ae/: no "audit" as a service word, no "offshore", no price of ours; own photos (asserted unique);
//   start states only under html.aec-on; JS off = complete page.
//
// DESIGN — nothing from /ae/, /ae/abu-dhabi/, /in/ or /uk/:
//   SIGNATURE "the parcel that opens": beside the H1 a cardboard parcel (four flaps, 3-D transforms) unfolds and the six
//   things a UAE store needs rise out of it as tags.
//   Per section: price tags swing in on strings · a conveyor belt carries the six checkout realities in from the right ·
//   platform cards drop onto a shelf whose line draws · a sync line pulses between storefront and ERP and a tick lands ·
//   AED ticks light along a meter · a loading-bar race (a 6-second store vs a 1.8-second store on 4G) · "delivered"
//   stamps land on the hire checklist · a drifting Burj-Al-Arab band.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/ae/ecommerce-website-development/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));
function img(slug, alt, sizes, cls, eager) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  return '<img class="' + (cls || 'aec-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ') + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '"' + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
const STOCK = { hero: 'aec-mall-interior-top-view', shoppers: 'aec-two-women-phone-bags', shelf: 'aec-shopfront-many-signs', pack: 'aec-woman-checking-parcel-laptop', courier: 'aec-delivery-worker-blue', marina: 'ae-marina-boats', band: 'ae-dubai-city-across-water' };

// ---------------------------------------------------------------------------------------------
const H1 = 'Ecommerce Website Development in Dubai and the UAE, <span>built for how the Emirates actually buys.</span>';
const SUB = 'Every ecommerce agency ranking in Dubai leads with Magento and a wall of logos. None of them mentions the six things that decide whether a UAE store sells: a VAT-compliant invoice at checkout, the right gateways and buy-now-pay-later, cash on delivery and addresses without postcodes, Arabic where it counts, a courier that actually delivers, and a page that loads on Etisalat 4G in a taxi. We build stores around those six &mdash; on Shopify, WooCommerce or custom &mdash; from an engineering team in Kochi, four hours away, with the stock system behind the storefront in the same project.';
const ANSWER = 'TechAuditPros builds <strong>ecommerce websites for businesses in Dubai, Abu Dhabi and across the UAE</strong> &mdash; on Shopify, WooCommerce or a custom stack, connected to the stock and order system so the storefront shows what the warehouse actually holds &mdash; from an engineering team in Kochi, India, four hours from Dubai on the same working week. No office in the Emirates, said first. Every store ships with a UAE VAT-compliant invoice at checkout, local payment gateways and BNPL, cash on delivery with Makani-friendly addresses, Arabic and English where they earn it, courier integration, and Core Web Vitals measured on Etisalat and du mobile data. The agencies ranking for this search publish no prices; the one Dubai web agency that does quotes AED 15,000&ndash;100,000+ for development. We give you a written plan and a price against it.';

const TAGS = [
  ['AED 15,000 &ndash; 100,000+', 'development, as published by the largest Dubai web agency on the first page'],
  ['&ldquo;Custom quote&rdquo;', 'what the three ecommerce agencies ranking for this search publish instead'],
  ['15+ years &middot; 400+ stores &middot; $15B', 'the claims one of them carries; ask which of the 400 were built for a UAE SME'],
];

const BELT = [
  ['VAT at checkout', 'A tax invoice with TRN, 5% shown per line, and the FTA-compliant PDF issued at order &mdash; not generated later in the accounts.'],
  ['Gateways &amp; BNPL', 'Telr, Network International, PayTabs, Checkout.com, Stripe UAE; Tabby and Tamara for buy-now-pay-later, which UAE shoppers now expect.'],
  ['Cash on delivery', 'Still a large share of UAE orders. COD needs a fee rule, an order-confirmation call or WhatsApp step, and a returns flow that does not bankrupt you.'],
  ['Addresses without postcodes', 'The UAE has no postcodes. Checkout needs emirate, area, building and a Makani number or map pin &mdash; not a &ldquo;ZIP&rdquo; field that fails.'],
  ['Arabic where it counts', 'Bilingual product pages with correct hreflang and RTL where your buyers search in Arabic; English-first where they do not. The data decides, not the template.'],
  ['Courier &amp; returns', 'Aramex, Fetchr, Quiqup or your own drivers &mdash; integrated, with tracking on the order page and a returns policy that matches UAE consumer law.'],
];

const PLATFORMS = [
  ['Shopify', 'A store selling within days; UAE gateways via apps; VAT invoice via an app; transaction fees that compound. Right for most D2C brands launching now.', 'first'],
  ['WooCommerce', 'Zero platform fee; native UAE gateway and VAT plugins; you own it; you maintain it. Right when the business lives in WordPress.', ''],
  ['Custom (Next.js / headless)', 'For unusual catalogues, pricing rules, B2B trade accounts or a storefront that must read live stock from the ERP. Slowest to launch, fastest to load, wholly yours.', ''],
  ['Magento / Adobe Commerce', 'What every Dubai agency leads with. Right for large catalogues with a development team behind them. For a UAE SME it is usually the most expensive way to sell fifty products.', 'last'],
];

const CHECK = [
  ['Show me a VAT invoice from a store you built.', 'The TRN, the 5% per line, the FTA format. If it comes from the accounts a week later, the store does not do VAT at checkout.'],
  ['Which gateways and which BNPL did you integrate last quarter?', 'Named, with a store you can open. &ldquo;All major gateways&rdquo; is a brochure.'],
  ['How does the store know what is in stock?', 'If the answer is &ldquo;the client updates it&rdquo;, you will be apologising for oversold orders by month two.'],
  ['What does the product page score on mobile, on 4G?', 'Ask for the Core Web Vitals field data, not a desktop screenshot.'],
  ['Who, by name, does the work &mdash; and where is the code?', 'Two-hundred-person agencies rank here. Ask which three people are yours, and whether the repository is in your name.'],
  ['Why Magento?', 'If they cannot answer without &ldquo;enterprise-grade&rdquo;, they are selling the platform they know, not the one you need.'],
];

const FAQS = [
  { q: 'Do you have an office in Dubai?', a: 'No. We are an engineering team in Kochi, India &mdash; a four-hour flight, ninety minutes apart on the clock, the same Monday-to-Friday week. UAE clients open a staging URL every week and receive a written report every month. If your launch needs people in the room, several good Dubai agencies rank for this search; we will say so on the first call.' },
  { q: 'How much does an ecommerce website cost in Dubai?', a: 'The ecommerce agencies ranking for this search publish no prices. The largest Dubai web agency on the first page publishes AED 15,000&ndash;100,000+ for development and AED 8,000&ndash;40,000 for design (September 2026). Platform costs add: Shopify plans in USD plus transaction fees; WooCommerce hosting; gateway fees per transaction. We do not publish a rate card; you get a written plan and a price against it, and the four things that move the number are on this page.' },
  { q: 'Shopify, WooCommerce, Magento or custom for a UAE store?', a: 'Shopify to be selling within days with UAE gateways via apps; WooCommerce when the business lives in WordPress and wants no platform fee; custom when the catalogue, pricing or stock model is unusual or the store must read live availability from an ERP; Magento only for large catalogues with a development team behind them. Every Dubai agency leads with Magento because it is what they build. Most UAE SMEs should not.' },
  { q: 'Does the store handle UAE VAT?', a: 'Yes, at checkout: a tax invoice with your TRN, 5% shown per line, zero-rated and exempt items handled, and the FTA-compliant PDF issued with the order. On Shopify this needs an app; on WooCommerce a plugin; in a custom build it is written to your accountant&rsquo;s specification. It should never be generated later in the accounts.' },
  { q: 'Which payment gateways work in the UAE?', a: 'Telr, Network International, PayTabs, Checkout.com and Stripe UAE are the ones we integrate most, with Tabby and Tamara for buy-now-pay-later, which UAE shoppers increasingly expect at checkout. Which is right depends on your volume, your bank and your platform; we say which on the call.' },
  { q: 'Do UAE stores still need cash on delivery?', a: 'Yes for most consumer categories &mdash; COD remains a meaningful share of UAE orders. It needs a COD fee rule, an order-confirmation step (call or WhatsApp) to cut failed deliveries, and a returns flow. A store that ignores COD loses the customers who trust it; a store that handles it badly loses money on every failed delivery.' },
  { q: 'How do you handle addresses without postcodes?', a: 'The UAE has no postcode system. Checkout collects emirate, area, street and building, plus a Makani number or a map pin, and validates against the courier&rsquo;s coverage. A US-style template with a required ZIP field fails UAE customers at the last step.' },
  { q: 'Should the store be in Arabic?', a: 'Bilingual where your buyers search in Arabic &mdash; the data decides. For many UAE consumer categories English carries most of the volume and Arabic earns a bilingual product page with correct hreflang and RTL; for others Arabic is the majority. We check the search data for your category before building either.' },
  { q: 'How do you connect the store to our stock?', a: 'The storefront reads availability, price and lead time from the system that knows &mdash; the stock and order system, or the ERP &mdash; through its API, so what the customer sees is what the warehouse in Al Quoz or JAFZA actually holds. For traders and distributors this is the difference between an online store and an apology machine.' },
  { q: 'How fast should a UAE store load?', a: 'Under 2.5 seconds to Largest Contentful Paint on a mid-range Android on Etisalat or du 4G &mdash; measured there, not on a laptop in an office. Industry guides put most Gulf stores well outside that; a six-second store loses the customer before the first product loads.' },
  { q: 'Do you also do ecommerce SEO?', a: 'Yes, and it is built in from day one: collection architecture that mirrors how people search, canonical hygiene, Product schema with price and availability, speed, and bilingual hreflang where used. A store that has to be re-architected for search a year after launch pays twice.' },
  { q: 'What happens if we stop after three months?', a: 'You keep everything: the store, the code and theme, the accounts, the content, the report history and the plan. No notice period measured in quarters, no retainer trap.' },
];

// ---------------------------------------------------------------------------------------------
const HERO = [
  '<section class="ech" id="aec-hero" aria-label="Ecommerce website development in the UAE">',
  '  <div class="ech-plate">' + img(STOCK.hero, 'A Dubai mall interior seen from above', '100vw', 'aec-img', true) + '</div>',
  '  <div class="container ech-grid">',
  '    <div class="ech-text">',
  '      <p class="ech-eyebrow">Dubai &middot; Abu Dhabi &middot; Sharjah &middot; the UAE &middot; Shopify &middot; WooCommerce &middot; custom</p>',
  '      <h1>' + H1 + '</h1>',
  '      <p class="ech-sub">' + SUB + '</p>',
  '      <div class="ech-ctas"><a class="aec-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="aec-btn ghost" href="#aec-belt">The six things &darr;</a></div>',
  '    </div>',
  '    <div class="ech-parcel" role="img" aria-label="A parcel unfolding to reveal the six things a UAE store needs">',
  '      <div class="box"><div class="flap n"></div><div class="flap s"></div><div class="flap w"></div><div class="flap e"></div><div class="tape"></div></div>',
  '      <ul class="out">' + BELT.map(([h], i) => '<li style="--d:' + i + '">' + h + '</li>').join('') + '</ul>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const head = (n, label, title, lede) => '      <div class="ecs-head"><p class="ecs-k"><span class="n">' + n + '</span><span>' + label + '</span></p><h2 class="ecs-h2">' + title + '</h2>' + (lede ? '<p class="ecs-lede">' + lede + '</p>' : '') + '</div>';

const S1 = [
  '<section class="ecs" id="aec-market" aria-label="What Dubai searches for, and what ranks">',
  '  <div class="container ecs-two">',
  '    <div>',
  head('01', 'What ranks, and what it says', 'Dubai searches for an ecommerce developer 3,700 times a month. What it finds is Magento and a wall of logos.', '&ldquo;Ecommerce website development company Dubai&rdquo; is 1,600 searches a month at a difficulty of 22 &mdash; the best web cluster in the whole UAE export. The pages that rank are agencies of 250 people leading with Magento, Adobe Commerce and Salesforce, carrying fifteen-year histories and awards, and publishing no price. They are good at what they build. This page is about what a UAE store needs that none of them mentions, and it hangs the published numbers where you can see them.'),
  '    </div>',
  '    <div class="ecs-tags">' + TAGS.map(([p, by], i) => '<div class="tag" style="--d:' + i + '"><i class="string"></i><div class="card"><b>' + p + '</b><span>' + by + '</span></div></div>').join('') + '</div>',
  '  </div>',
  '  <div class="container"><figure class="ecs-wide">' + img(STOCK.shoppers, 'Two women with a smartphone and shopping bags', '100vw') + '<figcaption>The buyer is on a phone, in a mall or a taxi, and has already compared three stores. The fourth one has to load.</figcaption></figure></div>',
  '</section>',
].join('\n');

const S2 = [
  '<section class="ecs dark" id="aec-belt" aria-label="The six things a UAE store needs">',
  '  <div class="container">',
  head('02', 'The six things', 'Six things a UAE store needs at checkout, in the order they lose you customers.', 'Global ecommerce templates are written for markets with postcodes, card-only payment and one language. The Emirates has none of those. These six are the difference between a store that looks finished and a store that sells; every one is engineering, and every one is missing from the pages that rank.'),
  '  </div>',
  '  <div class="ecs-beltwrap"><div class="ecs-belt">' + BELT.map(([h, p], i) => '<div class="crate" style="--d:' + i + '"><span class="n">0' + (i + 1) + '</span><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div><div class="rollers" aria-hidden="true"></div></div>',
  '  <div class="container"><p class="ecs-p on-dark">Ask any Dubai agency to show you a live store of theirs with all six. Most can show you two.</p></div>',
  '</section>',
].join('\n');

const S3 = [
  '<section class="ecs alt" id="aec-platform" aria-label="Which platform, honestly">',
  '  <div class="container ecs-two rev">',
  '    <figure class="ecs-side">' + img(STOCK.shelf, 'A Dubai building front crowded with shop signs', '(max-width:860px) 100vw, 40vw') + '<figcaption>Deira. Every sign is a shop; every shop is a catalogue that should be online by now.</figcaption></figure>',
  '    <div>',
  head('03', 'The platform, honestly', 'Shopify, WooCommerce, custom &mdash; and why Magento comes last on this shelf.', 'Every agency ranking for this search leads with Magento, because that is what a 250-person agency is built to sell. For a UAE business with fifty to five thousand products it is usually the most expensive way to sell them. Here is the shelf in the order we would put it for you.'),
  '      <div class="ecs-shelf"><div class="plank" aria-hidden="true"></div>' + PLATFORMS.map(([h, p, k], i) => '<article class="prod ' + k + '" style="--d:' + i + '"><h3>' + h + '</h3><p>' + p + '</p></article>').join('') + '</div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S4 = [
  '<section class="ecs dark" id="aec-stock" aria-label="The stock truth">',
  '  <div class="container">',
  head('04', 'The stock truth', 'The storefront says in stock. The warehouse in Al Quoz says otherwise.', 'Dubai runs on trade &mdash; Deira wholesalers, Al Quoz warehouses, JAFZA distributors &mdash; and trade runs on stock kept in three places. An online store built on top of that oversells every week, and the refunds, the reviews and the bounce back to Google are all things the algorithm reads. We build the store and the stock system as one project, so the number on the page is the number on the shelf.'),
  '    <div class="ecs-sync">',
  '      <figure class="node" style="--d:0">' + img(STOCK.pack, 'A woman checking a parcel beside her laptop', '(max-width:860px) 100vw, 38vw') + '<figcaption><b>The storefront</b><span>Shopify, WooCommerce or custom &mdash; reading price, availability and lead time from the system, not a spreadsheet.</span></figcaption></figure>',
  '      <div class="link" aria-hidden="true"><i class="wire"></i><i class="pulse"></i><b class="tick">&#10003;</b><span>one number</span></div>',
  '      <figure class="node" style="--d:1">' + img(STOCK.courier, 'A delivery worker in blue uniform on a scooter', '(max-width:860px) 100vw, 38vw') + '<figcaption><b>The warehouse and the courier</b><span>Stock, orders, purchasing, despatch and the courier manifest in the ERP &mdash; with UAE VAT, e-invoicing and WPS built in.</span></figcaption></figure>',
  '    </div>',
  '    <p class="ecs-p on-dark">How the systems side runs, with the UAE compliance layer, is on the <a href="/ae/">UAE page</a>. The point here is simpler: a store that lies about stock is not a store, it is a complaints department.</p>',
  '  </div>',
  '</section>',
].join('\n');

const S5 = [
  '<section class="ecs" id="aec-speed" aria-label="Speed and search for UAE stores">',
  '  <div class="container ecs-two">',
  '    <div>',
  head('05', 'Speed and search', 'A six-second store and a two-second store, side by side, on Etisalat 4G.', 'Industry guides put the great majority of Gulf ecommerce traffic on mobile, and a store that takes six seconds to show its first product on a 4G connection has lost the customer to the store that took two. Speed is a specification we build to &mdash; measured on a mid-range Android, throttled &mdash; and it is also a ranking input, so the same work makes the store findable.'),
  '      <ul class="ecs-list"><li><b>Collections that mirror how people search</b> &mdash; category pages with real copy, not grids with a sentence.</li><li><b>Canonical hygiene</b> &mdash; one URL per product, filters kept out of the index.</li><li><b>Product schema</b> with price, availability and reviews, so the rich result carries the numbers shoppers decide on.</li><li><b>Images sized and compressed</b> &mdash; the single largest cause of slow Gulf stores.</li><li><b>Bilingual hreflang</b> where Arabic pages exist, so the two languages help rather than compete.</li></ul>',
  '    </div>',
  '    <div class="ecs-race" aria-label="Two stores loading on 4G: six seconds against under two">',
  '      <div class="lane slow" style="--t:6s"><span class="lbl">A typical Dubai store &middot; 6.0s to first product</span><div class="track"><i></i></div><span class="end">customer gone</span></div>',
  '      <div class="lane fast" style="--t:1.8s"><span class="lbl">Built to the specification &middot; 1.8s</span><div class="track"><i></i></div><span class="end">first product shown</span></div>',
  '      <p class="note">Illustrative timings on a throttled 4G profile, not a specific client&rsquo;s store. Ask us for the field data on yours.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S6 = [
  '<section class="ecs alt" id="aec-cost" aria-label="What it costs">',
  '  <div class="container ecs-two rev">',
  '    <figure class="ecs-side">' + img(STOCK.marina, 'Dubai Marina crowded with boats', '(max-width:860px) 100vw, 40vw') + '<figcaption>A hundred boats, one harbour. Prices in this market run the same way.</figcaption></figure>',
  '    <div>',
  head('06', 'What it costs', 'What an ecommerce build costs in Dubai, from the one agency that publishes it.', 'Three of the pages ranking for this search say &ldquo;custom quote&rdquo;. The largest Dubai web agency on the first page publishes AED 15,000&ndash;100,000+ for development and AED 8,000&ndash;40,000 for design (September 2026). Those are theirs. Ours comes after a written plan, and these four things move it.'),
  '      <div class="ecs-meter" aria-label="Published Dubai development range, AED 15,000 to 100,000+"><div class="ticks">' + Array.from({ length: 12 }, (_, i) => '<i style="--d:' + i + '"></i>').join('') + '</div><div class="ends"><span>AED 15,000</span><span>AED 100,000+</span></div></div>',
  '      <div class="ecs-drivers">' + [['Catalogue and rules', 'Fifty products with one price is a week. Five thousand SKUs with trade pricing, bundles and per-emirate delivery rules is a project.'], ['Integrations', 'Gateways, BNPL, courier, the ERP or accounting system, WhatsApp confirmation. Each is development; each is where quotes diverge.'], ['Speed as a specification', 'A store built to 1.8 seconds on 4G is built differently from one that happens to load. Say the number and the quote will change to match.'], ['Who ships changes afterwards', 'A store is never finished. Ask what an hour costs after launch, and whether the repository is yours.']].map(([h, p], i) => '<div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const S7 = [
  '<section class="ecs" id="aec-check" aria-label="Before you hire an ecommerce agency in Dubai">',
  '  <div class="container">',
  head('07', 'Before you hire anyone', 'Six questions for any ecommerce agency in Dubai &mdash; including one four hours away.', 'Take these into every meeting. The answers separate the agency that builds stores from the one that sells a platform.'),
  '    <ol class="ecs-qs">' + CHECK.map(([q, p], i) => '<li style="--d:' + i + '"><span class="stamp" aria-hidden="true">Delivered</span><div><h3>' + q + '</h3><p>' + p + '</p></div></li>').join('') + '</ol>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="ecs-band" aria-label="Start on WhatsApp">',
  '  <div class="ecs-bandfig">' + img(STOCK.band, 'Dubai seen across a wide stretch of water', '100vw') + '</div>',
  '  <div class="container ecs-bandtext"><p class="ecs-k on-dark"><span class="n">UAE</span><span>No office in the Emirates</span></p><h2 class="ecs-h2 on-dark">Send us the store that oversells, or the one you have not built yet.</h2><p>Message us on WhatsApp or book a call. We will tell you which platform, which six things are missing, and what it should cost &mdash; honestly, including &ldquo;keep what you have&rdquo;.</p><a class="aec-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= ae_ecommerce.js : "the parcel that opens" ================= */
  .aec-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .aec-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .aec-btn:hover{ background:var(--orange-dark); } .aec-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.4); color:#fff; }
  /* hero */
  .ech{ position:relative; min-height:86svh; background:var(--navy-deep); color:#fff; overflow:hidden; display:grid; align-items:center; }
  .ech-plate{ position:absolute; inset:0; } .ech-plate::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,20,32,.94) 0%, rgba(11,20,32,.7) 50%, rgba(11,20,32,.35) 100%); }
  .ech-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,60px); align-items:center; padding:clamp(100px,14vh,160px) 0 clamp(60px,8vh,100px); }
  @media (min-width:900px){ .ech-grid{ grid-template-columns:7fr 5fr; } }
  .ech-eyebrow{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.7); margin:0 0 14px; }
  .ech h1{ font-size:clamp(1.9rem,4.2vw,3.8rem); line-height:1.05; letter-spacing:-.02em; margin:0 0 16px; color:#fff; max-width:22ch; } .ech h1 span{ color:var(--orange); }
  .ech-sub{ max-width:64ch; color:rgba(255,255,255,.82); font-size:clamp(.98rem,1.15vw,1.1rem); line-height:1.65; margin:0 0 20px; }
  .ech-ctas{ display:flex; gap:12px; flex-wrap:wrap; }
  /* the parcel */
  .ech-parcel{ position:relative; perspective:1200px; min-height:420px; display:grid; place-items:center; }
  .ech-parcel .box{ position:relative; width:220px; height:220px; background:#C89B6D; border-radius:6px; box-shadow:0 30px 60px rgba(0,0,0,.5); transform-style:preserve-3d; }
  .ech-parcel .box::before{ content:''; position:absolute; inset:0; background:repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 2px, transparent 2px 14px); border-radius:6px; }
  .ech-parcel .flap{ position:absolute; background:#B98959; box-shadow:0 4px 12px rgba(0,0,0,.25); }
  .ech-parcel .flap.n{ left:0; right:0; top:0; height:50%; transform-origin:top center; border-radius:6px 6px 0 0; }
  .ech-parcel .flap.s{ left:0; right:0; bottom:0; height:50%; transform-origin:bottom center; border-radius:0 0 6px 6px; }
  .ech-parcel .flap.w{ top:0; bottom:0; left:0; width:50%; transform-origin:left center; }
  .ech-parcel .flap.e{ top:0; bottom:0; right:0; width:50%; transform-origin:right center; }
  .ech-parcel .tape{ position:absolute; left:50%; top:0; bottom:0; width:26px; margin-left:-13px; background:rgba(217,83,30,.85); }
  .ech-parcel .out{ position:absolute; list-style:none; margin:0; padding:0; left:50%; top:50%; width:0; height:0; }
  .ech-parcel .out li{ position:absolute; white-space:nowrap; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.06em; background:#fff; color:var(--ink); padding:7px 11px; border-radius:6px; box-shadow:0 8px 20px rgba(0,0,0,.35); transform:translate(-50%,-50%); }
  .ech-parcel .out li:nth-child(1){ --tx:-150px; --ty:-170px; } .ech-parcel .out li:nth-child(2){ --tx:140px; --ty:-160px; } .ech-parcel .out li:nth-child(3){ --tx:-190px; --ty:-40px; } .ech-parcel .out li:nth-child(4){ --tx:190px; --ty:-30px; } .ech-parcel .out li:nth-child(5){ --tx:-140px; --ty:120px; } .ech-parcel .out li:nth-child(6){ --tx:150px; --ty:130px; }
  .ech-parcel .out li{ transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))); }
  @media (max-width:560px){ .ech-parcel{ min-height:380px; } .ech-parcel .box{ width:160px; height:160px; } .ech-parcel .out li{ font-size:.6rem; } .ech-parcel .out li:nth-child(1){ --tx:-100px; --ty:-140px; } .ech-parcel .out li:nth-child(2){ --tx:100px; --ty:-135px; } .ech-parcel .out li:nth-child(3){ --tx:-125px; --ty:-40px; } .ech-parcel .out li:nth-child(4){ --tx:125px; --ty:-30px; } .ech-parcel .out li:nth-child(5){ --tx:-100px; --ty:110px; } .ech-parcel .out li:nth-child(6){ --tx:100px; --ty:120px; } }
  /* sections */
  .ecs{ padding:clamp(56px,7vw,104px) 0; position:relative; overflow-x:clip; background:#fff; }
  .ecs.dark{ background:var(--navy-deep); color:#fff; } .ecs.alt{ background:#F3F5F2; }
  .ecs-head{ max-width:66ch; margin-bottom:clamp(22px,3vw,40px); }
  .ecs-k{ display:flex; align-items:center; gap:10px; margin:0 0 12px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }
  .ecs-k .n{ background:#C89B6D; color:var(--navy-deep); padding:3px 8px; border-radius:4px; letter-spacing:.08em; font-weight:700; }
  .ecs.dark .ecs-k, .ecs-k.on-dark{ color:rgba(255,255,255,.55); }
  .ecs-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); }
  .ecs.dark .ecs-h2, .ecs-h2.on-dark{ color:#fff; }
  .ecs-lede, .ecs-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:68ch; }
  .ecs.dark .ecs-lede, .ecs-p.on-dark{ color:rgba(255,255,255,.8); } .ecs-p.on-dark a{ color:#fff; }
  .ecs-two{ display:grid; grid-template-columns:1fr; gap:clamp(24px,4vw,56px); align-items:start; }
  @media (min-width:860px){ .ecs-two{ grid-template-columns:1fr 1fr; } .ecs-two.rev{ grid-template-columns:5fr 7fr; } }
  .ecs-side{ margin:0; position:relative; aspect-ratio:4/5; overflow:hidden; border-radius:14px; }
  .ecs-side figcaption{ position:absolute; left:16px; right:16px; bottom:14px; color:#fff; font-size:.9rem; text-shadow:0 2px 12px rgba(0,0,0,.75); }
  .ecs-wide{ position:relative; margin:clamp(24px,3vw,40px) 0 0; aspect-ratio:21/8; overflow:hidden; border-radius:14px; }
  .ecs-wide figcaption{ position:absolute; left:50%; transform:translateX(-50%); bottom:clamp(14px,3vw,30px); width:min(92%,900px); text-align:center; color:#fff; font-size:clamp(1rem,1.5vw,1.3rem); text-shadow:0 2px 14px rgba(0,0,0,.75); }
  @media (max-width:700px){ .ecs-wide{ aspect-ratio:4/3; } }
  .ecs-list{ margin:0; padding:0 0 0 18px; line-height:1.6; color:var(--ink-soft); } .ecs-list li{ margin-bottom:8px; } .ecs-list b{ color:var(--ink); }
  /* 01 tags */
  .ecs-tags{ display:grid; grid-template-columns:1fr; gap:14px; padding-top:30px; }
  @media (min-width:560px){ .ecs-tags{ grid-template-columns:repeat(3,1fr); } }
  .tag{ position:relative; padding-top:34px; transform-origin:50% 0; }
  .tag .string{ position:absolute; left:50%; top:0; width:2px; height:34px; background:var(--ink-faint); margin-left:-1px; }
  .tag .card{ background:#fff; border:1px solid var(--line); border-radius:8px 8px 14px 14px; padding:18px 16px; text-align:center; position:relative; box-shadow:0 12px 28px rgba(14,42,62,.12); }
  .tag .card::before{ content:''; position:absolute; left:50%; top:-6px; width:10px; height:10px; margin-left:-5px; border-radius:50%; background:#fff; border:2px solid var(--ink-faint); }
  .tag b{ display:block; font-family:var(--font-mono); font-size:1rem; color:var(--ink); margin-bottom:6px; } .tag span{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }
  /* 02 belt */
  .ecs-beltwrap{ overflow:hidden; padding:10px 0 0; }
  .ecs-belt{ display:grid; grid-template-columns:1fr; gap:14px; padding:0 clamp(16px,4vw,60px) 26px; }
  @media (min-width:700px){ .ecs-belt{ grid-template-columns:repeat(2,1fr); } } @media (min-width:1100px){ .ecs-belt{ grid-template-columns:repeat(3,1fr); } }
  .crate{ background:#C89B6D; color:var(--navy-deep); border-radius:6px; padding:18px; position:relative; }
  .crate::before{ content:''; position:absolute; inset:0; background:repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 2px, transparent 2px 14px); border-radius:6px; pointer-events:none; }
  .crate .n{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.16em; } .crate h3{ margin:6px 0 8px; font-size:1.1rem; } .crate p{ margin:0; font-size:.9rem; line-height:1.5; }
  .rollers{ height:18px; margin:0 clamp(16px,4vw,60px); background:radial-gradient(circle at 9px 9px, rgba(255,255,255,.35) 6px, transparent 7px) 0 0/28px 18px repeat-x; }
  /* 03 shelf */
  .ecs-shelf{ position:relative; display:grid; grid-template-columns:1fr; gap:14px; padding-bottom:22px; }
  @media (min-width:700px){ .ecs-shelf{ grid-template-columns:repeat(2,1fr); } }
  .ecs-shelf .plank{ position:absolute; left:0; right:0; bottom:0; height:10px; border-radius:4px; background:#C89B6D; transform-origin:left center; }
  .prod{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px; } .prod.first{ border-color:var(--orange); } .prod.last{ opacity:.85; }
  .prod h3{ margin:0 0 8px; font-size:1.1rem; color:var(--ink); } .prod p{ margin:0; font-size:.92rem; line-height:1.55; color:var(--ink-soft); }
  /* 04 sync */
  .ecs-sync{ display:grid; grid-template-columns:1fr; gap:18px; align-items:center; margin-bottom:18px; }
  @media (min-width:860px){ .ecs-sync{ grid-template-columns:5fr 2fr 5fr; } }
  .ecs-sync .node{ margin:0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:14px; background:rgba(255,255,255,.05); }
  .ecs-sync .node::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.9) 0%, rgba(4,9,20,.25) 55%, rgba(4,9,20,0) 100%); }
  .ecs-sync figcaption{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:18px; color:#fff; } .ecs-sync figcaption b{ display:block; font-size:1.05rem; margin-bottom:6px; } .ecs-sync figcaption span{ font-size:.86rem; line-height:1.5; color:rgba(255,255,255,.82); }
  .ecs-sync .link{ position:relative; height:80px; display:grid; place-items:center; text-align:center; }
  .ecs-sync .wire{ position:absolute; left:0; right:0; top:50%; height:2px; background:rgba(255,255,255,.3); transform-origin:left center; }
  .ecs-sync .pulse{ position:absolute; top:50%; left:0; width:12px; height:12px; margin-top:-6px; border-radius:50%; background:var(--orange); }
  .ecs-sync .tick{ position:relative; width:44px; height:44px; border-radius:50%; background:var(--orange); color:#fff; display:grid; place-items:center; font-size:1.3rem; }
  .ecs-sync .link span{ position:absolute; bottom:-6px; left:0; right:0; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.6); }
  @media (max-width:860px){ .ecs-sync .link{ height:60px; } .ecs-sync .wire{ left:50%; right:auto; top:0; bottom:0; width:2px; height:auto; transform-origin:top center; } .ecs-sync .pulse{ left:50%; margin-left:-6px; top:0; } }
  /* 05 race */
  .ecs-race{ background:var(--navy-deep); color:#fff; border-radius:14px; padding:clamp(18px,2.6vw,30px); }
  .lane{ margin-bottom:18px; } .lane .lbl{ display:block; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.08em; color:rgba(255,255,255,.7); margin-bottom:8px; }
  .lane .track{ height:14px; border-radius:7px; background:rgba(255,255,255,.12); overflow:hidden; } .lane .track i{ display:block; height:100%; width:100%; transform-origin:left center; background:linear-gradient(90deg, var(--orange), var(--orange-dark)); }
  .lane.fast .track i{ background:linear-gradient(90deg, #3DDC84, #1FA35A); }
  .lane .end{ display:block; margin-top:6px; font-size:.82rem; color:rgba(255,255,255,.7); } .lane.fast .end{ color:#3DDC84; }
  .ecs-race .note{ margin:8px 0 0; font-size:.76rem; color:rgba(255,255,255,.5); }
  /* 06 meter */
  .ecs-meter{ margin:8px 0 18px; } .ecs-meter .ticks{ display:flex; gap:6px; } .ecs-meter .ticks i{ flex:1; height:22px; border-radius:3px; background:var(--line-strong); }
  .ecs-meter .ends{ display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.06em; color:var(--ink-soft); margin-top:8px; }
  .ecs-drivers{ display:grid; gap:14px; } .drv{ display:grid; grid-template-columns:44px 1fr; gap:2px 12px; } .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.6rem; color:var(--orange); line-height:1; }
  .drv h3{ margin:0; font-size:1.02rem; color:var(--ink); } .drv p{ margin:0; font-size:.9rem; line-height:1.55; color:var(--ink-soft); }
  /* 07 stamps */
  .ecs-qs{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr; gap:14px; }
  @media (min-width:760px){ .ecs-qs{ grid-template-columns:1fr 1fr; } }
  .ecs-qs li{ position:relative; display:grid; grid-template-columns:1fr; gap:6px; padding:18px 18px 18px 22px; border:1px solid var(--line); border-radius:12px; background:#fff; overflow:hidden; }
  .ecs-qs .stamp{ position:absolute; right:14px; top:12px; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); border:2px solid var(--orange); border-radius:4px; padding:3px 7px; transform:rotate(-8deg); }
  .ecs-qs h3{ margin:0 0 6px; font-size:1.02rem; color:var(--ink); padding-right:90px; } .ecs-qs p{ margin:0; font-size:.9rem; line-height:1.5; color:var(--ink-soft); }
  /* band */
  .ecs-band{ position:relative; background:var(--navy-deep); color:#fff; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .ecs-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; } .ecs-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(4,9,20,.85) 0%, rgba(4,9,20,.45) 50%, rgba(4,9,20,.15) 100%); }
  .ecs-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); } .ecs-bandtext p{ color:rgba(255,255,255,.8); max-width:48ch; margin:0 0 18px; }
  @media (max-width:700px){ .ecs-bandfig{ aspect-ratio:4/5; } }

  /* ================= motion : start states only under html.aec-on ================= */
  html.aec-on .ech-parcel .flap{ transition:transform 1.1s cubic-bezier(.3,.8,.2,1); }
  html.aec-on .ech.lit .ech-parcel .flap.n{ transform:rotateX(150deg); transition-delay:.4s; } html.aec-on .ech.lit .ech-parcel .flap.s{ transform:rotateX(-150deg); transition-delay:.5s; }
  html.aec-on .ech.lit .ech-parcel .flap.w{ transform:rotateY(-150deg); transition-delay:.7s; } html.aec-on .ech.lit .ech-parcel .flap.e{ transform:rotateY(150deg); transition-delay:.8s; }
  html.aec-on .ech-parcel .tape{ transition:transform .5s ease .2s, opacity .3s linear .2s; } html.aec-on .ech.lit .ech-parcel .tape{ transform:scaleY(0); opacity:0; }
  html.aec-on .ech-parcel .out li{ opacity:0; transform:translate(-50%,-50%) scale(.3); }
  html.aec-on .ech.lit .ech-parcel .out li{ opacity:1; transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); transition:transform .9s cubic-bezier(.2,.8,.2,1) calc(1.2s + var(--d) * .12s), opacity .3s linear calc(1.2s + var(--d) * .12s); }
  html.aec-on .ech-text > *{ opacity:0; transform:translateY(14px); } html.aec-on .ech.lit .ech-text > *{ animation:aecIn .7s cubic-bezier(.2,.7,.2,1) forwards; }
  html.aec-on .ech.lit .ech-text > *:nth-child(2){ animation-delay:.12s; } html.aec-on .ech.lit .ech-text > *:nth-child(3){ animation-delay:.24s; } html.aec-on .ech.lit .ech-text > *:nth-child(4){ animation-delay:.36s; }
  @keyframes aecIn{ to{ opacity:1; transform:none; } }
  html.aec-on .ecs-head .ecs-k, html.aec-on .ecs-head .ecs-h2, html.aec-on .ecs-head .ecs-lede{ opacity:0; transform:translateY(12px); }
  html.aec-on .ecs-head.lit .ecs-k{ animation:aecIn .5s ease forwards; } html.aec-on .ecs-head.lit .ecs-h2{ animation:aecIn .6s cubic-bezier(.2,.7,.2,1) .1s forwards; } html.aec-on .ecs-head.lit .ecs-lede{ animation:aecIn .6s cubic-bezier(.2,.7,.2,1) .25s forwards; }
  /* 01 */
  html.aec-on .tag{ opacity:0; transform:rotate(-14deg) translateY(-20px); } html.aec-on .ecs-tags.lit .tag{ animation:aecSwing 1.6s cubic-bezier(.3,.8,.3,1) forwards; animation-delay:calc(var(--d) * .18s); }
  @keyframes aecSwing{ 0%{ opacity:0; transform:rotate(-14deg) translateY(-20px); } 30%{ opacity:1; transform:rotate(8deg) translateY(0); } 55%{ transform:rotate(-5deg); } 75%{ transform:rotate(2.5deg); } 100%{ opacity:1; transform:none; } }
  html.aec-on .ecs-wide .aec-img{ transform:scale(1.08); transition:transform 1.6s cubic-bezier(.18,.72,.2,1); } html.aec-on .ecs-wide.lit .aec-img{ transform:none; }
  html.aec-on .ecs-wide figcaption{ opacity:0; } html.aec-on .ecs-wide.lit figcaption{ opacity:1; transition:opacity .6s linear .5s; }
  /* 02 */
  html.aec-on .crate{ opacity:0; transform:translateX(120px); } html.aec-on .ecs-belt.lit .crate{ animation:aecIn .8s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .16s); }
  /* 03 */
  html.aec-on .ecs-shelf .plank{ transform:scaleX(0); } html.aec-on .ecs-shelf.lit .plank{ animation:aecRule .8s cubic-bezier(.3,0,.2,1) forwards; }
  @keyframes aecRule{ to{ transform:scaleX(1); } }
  html.aec-on .prod{ opacity:0; transform:translateY(-30px); } html.aec-on .ecs-shelf.lit .prod{ animation:aecDrop .6s cubic-bezier(.3,1.4,.5,1) forwards; animation-delay:calc(.5s + var(--d) * .16s); }
  @keyframes aecDrop{ to{ opacity:1; transform:none; } }
  /* 04 */
  html.aec-on .ecs-sync .node .aec-img{ clip-path:inset(0 100% 0 0); } html.aec-on .ecs-sync .node:nth-child(3) .aec-img{ clip-path:inset(0 0 0 100%); }
  html.aec-on .ecs-sync.lit .node .aec-img{ animation:aecWipe .9s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .2s); }
  @keyframes aecWipe{ to{ clip-path:inset(0 0 0 0); } }
  html.aec-on .ecs-sync .wire{ transform:scaleX(0); } html.aec-on .ecs-sync.lit .wire{ animation:aecRule .9s cubic-bezier(.3,0,.2,1) .8s forwards; }
  @media (max-width:860px){ html.aec-on .ecs-sync .wire{ transform:scaleY(0); } html.aec-on .ecs-sync.lit .wire{ animation-name:aecRuleY; } @keyframes aecRuleY{ to{ transform:scaleY(1); } } }
  html.aec-on .ecs-sync .pulse{ opacity:0; } html.aec-on .ecs-sync.lit .pulse{ animation:aecPulse 1.2s linear 1.7s 2; } @keyframes aecPulse{ 0%{ opacity:1; left:0; } 100%{ opacity:1; left:calc(100% - 12px); } }
  html.aec-on .ecs-sync .tick{ transform:scale(0); } html.aec-on .ecs-sync.lit .tick{ animation:aecPop .5s cubic-bezier(.2,.9,.3,1.5) 4.1s forwards; } @keyframes aecPop{ to{ transform:none; } }
  html.aec-on .ecs-sync .link span, html.aec-on .ecs-sync figcaption{ opacity:0; } html.aec-on .ecs-sync.lit .link span{ opacity:1; transition:opacity .4s linear 4.5s; } html.aec-on .ecs-sync.lit figcaption{ opacity:1; transition:opacity .5s linear calc(.8s + var(--d) * .2s); }
  /* 05 */
  html.aec-on .lane .track i{ transform:scaleX(0); } html.aec-on .ecs-race.lit .lane .track i{ animation:aecRule var(--t) linear .3s forwards; }
  html.aec-on .lane .end{ opacity:0; } html.aec-on .ecs-race.lit .lane .end{ opacity:1; transition:opacity .4s linear calc(.3s + var(--t)); }
  /* 06 */
  html.aec-on .ecs-meter .ticks i{ transform:scaleY(0); transform-origin:bottom center; } html.aec-on .ecs-meter.lit .ticks i{ animation:aecTick .4s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .09s); }
  @keyframes aecTick{ to{ transform:none; background:var(--orange); } }
  html.aec-on .drv{ opacity:0; transform:translateY(14px); } html.aec-on .ecs-drivers.lit .drv{ animation:aecIn .55s ease forwards; animation-delay:calc(var(--d) * .12s); }
  html.aec-on .ecs-side .aec-img{ transform:scale(1.08); transition:transform 1.5s cubic-bezier(.18,.72,.2,1); } html.aec-on .ecs-side.lit .aec-img{ transform:none; }
  html.aec-on .ecs-side figcaption{ opacity:0; } html.aec-on .ecs-side.lit figcaption{ opacity:1; transition:opacity .5s linear .5s; }
  /* 07 */
  html.aec-on .ecs-qs li{ opacity:0; transform:translateY(12px); } html.aec-on .ecs-qs.lit li{ animation:aecIn .5s ease forwards; animation-delay:calc(var(--d) * .1s); }
  html.aec-on .ecs-qs .stamp{ opacity:0; transform:rotate(-8deg) scale(1.8); } html.aec-on .ecs-qs.lit .stamp{ animation:aecStamp .45s cubic-bezier(.2,.9,.3,1.3) forwards; animation-delay:calc(.4s + var(--d) * .1s); }
  @keyframes aecStamp{ to{ opacity:1; transform:rotate(-8deg) scale(1); } }
  @supports (animation-timeline: view()){ .ecs-bandfig .aec-img{ animation:aecDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; } @keyframes aecDrift{ from{ transform:scale(1.14) translateX(-3%); } to{ transform:scale(1.14) translateX(3%); } } }
  @media (prefers-reduced-motion: reduce){ html.aec-on .ech-parcel .flap, html.aec-on .ech-parcel .tape, html.aec-on .ech-parcel .out li, html.aec-on .ech-text > *, html.aec-on .ecs-head .ecs-k, html.aec-on .ecs-head .ecs-h2, html.aec-on .ecs-head .ecs-lede, html.aec-on .tag, html.aec-on .ecs-wide .aec-img, html.aec-on .ecs-wide figcaption, html.aec-on .crate, html.aec-on .ecs-shelf .plank, html.aec-on .prod, html.aec-on .ecs-sync .node .aec-img, html.aec-on .ecs-sync .wire, html.aec-on .ecs-sync .pulse, html.aec-on .ecs-sync .tick, html.aec-on .ecs-sync .link span, html.aec-on .ecs-sync figcaption, html.aec-on .lane .track i, html.aec-on .lane .end, html.aec-on .ecs-meter .ticks i, html.aec-on .drv, html.aec-on .ecs-side .aec-img, html.aec-on .ecs-side figcaption, html.aec-on .ecs-qs li, html.aec-on .ecs-qs .stamp, .ecs-bandfig .aec-img{ opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; } html.aec-on .ech-parcel .out li{ transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) !important; } }
`;

const JS = `
/* ae_ecommerce.js : light each frame once as it arrives. html.aec-on is added only here. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('aec-on');
    var frames = document.querySelectorAll('.ech, .ecs-head, .ecs-tags, .ecs-wide, .ecs-belt, .ecs-shelf, .ecs-sync, .ecs-race, .ecs-meter, .ecs-drivers, .ecs-side, .ecs-qs');
    var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) { if (!es[i].isIntersecting) continue; es[i].target.classList.add('lit'); io.unobserve(es[i].target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/index.html');
s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"'); s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"'); s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s); s = L.addUkToNavAndFooter(s); s = L.addAeToNavAndFooter(s);
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];
s = L.setHead(s, {
  title: 'Ecommerce Website Development Company in Dubai &amp; the UAE | Built for How the Emirates Buys | TechAuditPros',
  ogTitle: 'Ecommerce website development in Dubai and the UAE &mdash; built for how the Emirates actually buys',
  desc: 'Ecommerce website development for Dubai, Abu Dhabi and the UAE on Shopify, WooCommerce or custom: VAT invoice at checkout, UAE gateways and BNPL, cash on delivery, addresses without postcodes, Arabic where it counts, courier integration, 4G speed &mdash; and the stock system behind the store. From a Kochi team, four hours away.',
  url: URL,
  hreflang: [{ lang: 'en-ae', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/ae/' }],
});
s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Arab Emirates', 'https://techauditpros.com/ae/'], ['Ecommerce Website Development', URL]]),
  L.serviceSchema({ name: 'Ecommerce Website Development in Dubai and the UAE', desc: 'Ecommerce store development on Shopify, WooCommerce and custom stacks for UAE businesses, with VAT-compliant checkout, local payment gateways, cash on delivery, Arabic support, courier integration and ERP stock integration.', url: URL, area: 'United Arab Emirates' }),
  L.faqSchema(FAQS),
]);
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO.split('__WA__').join(WA) + '\n\n', { keepStart: false, keepEnd: true });
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, ''); s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, ''); s = s.replace(/rotateText\('heroSideRotate', \[[\s\S]*?\], \d+, \d+\);/, '');
s = L.setBody(s, [L.answer(ANSWER), S1, S2, S3, S4, S5, S6, S7, BAND, L.faqHtml('city-faq', 'Questions UAE store owners ask us', 'Twelve straight answers, starting with the office.', FAQS)].join('\n').split('__WA__').join(WA));
s = L.setFinalCta(s, 'Send us the store that oversells &mdash; or the one you have not built yet.', 'Takes 60 seconds &middot; Dubai, Abu Dhabi and the UAE &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team, Four Hours from Dubai');
s = s.replace(/Your dedicated offshore technical team\./i, 'Your technical team, four hours from Dubai.');
s = s.replace(/SERVING BUSINESSES ACROSS CANADA/i, 'SERVING BUSINESSES ACROSS THE UAE');
s = s.replace(/Toronto &bull; Vancouver[\s\S]*?and every Canadian province/, 'Dubai &bull; Abu Dhabi &bull; Sharjah &bull; Ajman &bull; Deira &bull; Al Quoz &bull; JAFZA &bull; DIFC &bull; and every emirate, remotely');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Remote' : 'remote'));
for (const [from, to] of [['Technical SEO Audits &amp; Core Web Vitals Optimization', 'Technical SEO &amp; Core Web Vitals Optimisation'], ['Technical SEO Audits & Core Web Vitals Optimization', 'Technical SEO & Core Web Vitals Optimisation'], ['manage audits and deployments securely', 'manage builds and deployments securely'], ['>SEO Audit Kochi<', '>SEO in Kochi<'], ['Technical%20SEO%20&%20Digital%20Marketing%20Audit.', 'ERP,%20website%20and%20SEO%20work.']]) if (s.includes(from)) s = s.split(from).join(to);
{ const at = s.indexOf('</style>'); s = s.slice(0, at) + CSS + s.slice(at); const bt = s.lastIndexOf('</body>'); s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt); }
{
  const prose = s.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ').replace(/seo-audit-kochi/g, ' ').replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) { const i = prose.search(/audit/i); throw new Error('"audit" on ecommerce page: …' + prose.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' ')); }
  if (/offshore/i.test(prose)) throw new Error('"offshore" on ecommerce page');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3800) throw new Error('only ' + words + ' words; parity needs 3,800+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + Object.keys(STOCK).length);
}
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (['node_modules', '.git', 'archive', 'scripts', 'ai_context'].includes(e.name)) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.split(path.sep).join('/').endsWith('/ae/ecommerce-website-development/index.html'));
  const used = []; for (const slug of Object.values(STOCK)) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<div class="crate"', BELT.length); L.must(s, '<article class="prod', PLATFORMS.length); L.must(s, '<div class="tag"', TAGS.length); L.must(s, 'class="ech-parcel"', 1);
fs.mkdirSync(path.join(L.REPO, 'ae', 'ecommerce-website-development'), { recursive: true });
L.write('ae/ecommerce-website-development/index.html', s);
console.log('/ae/ecommerce-website-development/ written — the parcel that opens, tags, belt, shelf, sync, race, meter, stamps, 12 FAQs');
