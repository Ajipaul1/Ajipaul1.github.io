'use strict';
/* offers.js — publishes the two fixed-scope packages on the homepage and the regional hubs.
 *
 * Why this exists: the site ranks for the brand name but never said what a job costs, so the
 * Google result and every AI answer about "who is TechAuditPros" stayed vague. These two
 * packages have a decided scope, so they can carry a price without being a rate card.
 *
 * Pricing is per market on purpose. The same build is half the local agency rate in each of
 * them, and one global figure would either undercharge the West or scare off India. Currencies
 * are never listed side by side on one page — a visitor sees their own market only, and the
 * global homepage points visitors at the hubs for local-currency prices.
 *
 * v2 (2026-09-29): the full 459-word block now lives on the homepage ONLY. It used to be copied
 * onto all six hubs, which made the same passage appear on seven pages. Each hub now carries a
 * short block of its own — the two prices in that market's currency, what matters to a buyer
 * there (invoice currency, tax on the invoice, time-zone handover, what sits outside the fixed
 * scope), and a link to /#offers for the full terms. No sentence is shared between hubs.
 *
 * Re-runnable: on a page that already carries the marked blocks, each block is replaced IN PLACE
 * (by character position; the repo is CRLF, so nothing here rebuilds text from split lines).
 * Only a page with no block gets one inserted at its anchor. Run again after editing a price or
 * a sentence and every page updates without moving anything else on the page.
 */
const L = require('./lib');

const NL = '\r\n';
const RESULTS = '/results/viraat-marine-erp/';

/* ---------------------------------------------------------------- price book */
const MARKETS = {
  global: { site: '$4,500', erpSetup: '$7,500', erpMo: '$750', cur: 'USD', siteNum: '4500', erpNum: '7500', erpMoNum: '750' },
  us: { site: '$4,500', erpSetup: '$7,500', erpMo: '$750', cur: 'USD', siteNum: '4500', erpNum: '7500', erpMoNum: '750', cc: 'US', path: '/us/' },
  uk: { site: '&pound;3,500', erpSetup: '&pound;6,000', erpMo: '&pound;600', cur: 'GBP', siteNum: '3500', erpNum: '6000', erpMoNum: '600', cc: 'GB', path: '/uk/' },
  ca: { site: 'CAD 6,000', erpSetup: 'CAD 10,000', erpMo: 'CAD 1,000', cur: 'CAD', siteNum: '6000', erpNum: '10000', erpMoNum: '1000', cc: 'CA', path: '/ca/' },
  au: { site: 'AUD 7,000', erpSetup: 'AUD 11,500', erpMo: 'AUD 1,150', cur: 'AUD', siteNum: '7000', erpNum: '11500', erpMoNum: '1150', cc: 'AU', path: '/au/' },
  in: { site: '&#8377;1,50,000', erpSetup: '&#8377;2,50,000', erpMo: '&#8377;25,000', cur: 'INR', siteNum: '150000', erpNum: '250000', erpMoNum: '25000', cc: 'IN', path: '/in/' },
  ae: { site: 'AED 16,000', erpSetup: 'AED 27,000', erpMo: 'AED 2,700', cur: 'AED', siteNum: '16000', erpNum: '27000', erpMoNum: '2700', cc: 'AE', path: '/ae/' },
};

/* Each page names its own anchor, because the hubs do not share one section order.
 * The anchor is used ONLY when the page has no offers block yet (first run on a new page).
 * mode 'after' inserts below the anchor, 'before' inserts above it. */
const PAGES = [
  { rel: 'index.html', market: 'global', anchor: '<!-- trust-strip-band:end -->', mode: 'after' },
  { rel: 'us/index.html', market: 'us', anchor: '<!-- trust-strip-band:end -->', mode: 'after' },
  { rel: 'uk/index.html', market: 'uk', anchor: '<!-- trust-strip-band:end -->', mode: 'after' },
  { rel: 'ca/index.html', market: 'ca', anchor: '<!-- trust-strip-band:end -->', mode: 'after' },
  { rel: 'au/index.html', market: 'au', anchor: '<!-- trust-strip-band:end -->', mode: 'after' },
  { rel: 'in/index.html', market: 'in', anchor: '<section class="tap-promise-section">', mode: 'before' },
  { rel: 'ae/index.html', market: 'ae', anchor: '<section class="aea" id="ae-story"', mode: 'before' },
];

/* ---------------------------------------------------------------- css */
const CSS = `/* offers_v1:css:start */
  .ofr-section{ background:var(--paper-alt); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .ofr-lede{ max-width:70ch; margin:0 0 40px; font-size:1.02rem; color:var(--ink-soft); }
  .ofr-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:24px; align-items:stretch; }
  .ofr-card{
    display:flex; flex-direction:column; background:var(--paper); border:1px solid var(--line);
    border-radius:14px; padding:32px 30px 30px; box-shadow:var(--shadow-sm); position:relative;
  }
  .ofr-card::before{
    content:''; position:absolute; inset:-1px -1px auto -1px; height:4px;
    background:var(--orange); border-radius:14px 14px 0 0;
  }
  .ofr-card.is-system::before{ background:var(--navy-deep); }
  .ofr-tag{
    font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase;
    color:var(--ink-faint); margin:0 0 10px;
  }
  .ofr-card h3{ font-size:1.5rem; margin:0 0 4px; }
  .ofr-days{ font-family:var(--font-mono); font-size:0.8rem; color:var(--orange-dark); margin:0 0 18px; }
  .ofr-card.is-system .ofr-days{ color:var(--ink); }
  .ofr-price{
    display:flex; align-items:baseline; flex-wrap:wrap; gap:8px;
    margin:0 0 6px; padding-top:18px; border-top:1px solid var(--line);
  }
  .ofr-amount{ font-size:2.15rem; font-weight:680; letter-spacing:-0.03em; color:var(--ink); line-height:1.05; }
  .ofr-unit{ font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-faint); }
  .ofr-plus{ margin:0 0 18px; font-size:0.92rem; color:var(--ink-soft); }
  .ofr-plus strong{ color:var(--ink); font-weight:620; }
  .ofr-claim{ margin:0 0 20px; font-size:0.98rem; color:var(--ink-soft); }
  .ofr-sub{
    font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase;
    color:var(--ink-faint); margin:0 0 10px;
  }
  .ofr-in{ list-style:none; padding:0; margin:0 0 22px; }
  .ofr-in li{ position:relative; padding:0 0 9px 24px; font-size:0.94rem; color:var(--ink-soft); }
  .ofr-in li::before{
    content:''; position:absolute; left:2px; top:7px; width:9px; height:5px;
    border-left:2px solid var(--good); border-bottom:2px solid var(--good);
    transform:rotate(-45deg);
  }
  .ofr-out{
    margin:0 0 22px; padding:14px 16px; background:var(--paper-alt); border-left:3px solid var(--line-strong);
    border-radius:0 7px 7px 0; font-size:0.88rem; color:var(--ink-soft);
  }
  .ofr-out strong{ color:var(--ink); font-weight:620; }
  .ofr-proof{ margin:0 0 22px; font-size:0.88rem; color:var(--ink-soft); }
  .ofr-proof a{ color:var(--orange-dark); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
  .ofr-cta{
    margin-top:auto; display:inline-flex; align-items:center; justify-content:center; gap:8px;
    background:var(--orange); color:#fff !important; text-decoration:none; font-weight:620; font-size:0.95rem;
    padding:14px 22px; border-radius:8px; transition:background .18s ease, transform .18s ease;
  }
  .ofr-cta:hover{ background:var(--orange-dark); transform:translateY(-1px); }
  .ofr-card.is-system .ofr-cta{ background:var(--navy-deep); }
  .ofr-card.is-system .ofr-cta:hover{ background:var(--ink); }
  .ofr-note{ margin:30px 0 0; font-size:0.85rem; color:var(--ink-faint); max-width:78ch; }
  .ofr-note a{ color:var(--orange-dark); text-decoration:underline; text-underline-offset:2px; }
  /* hub version: one market, two prices, and a door to the full terms on the homepage */
  .ofr-mini .ofr-mini-wrap{ display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,1fr); gap:48px; align-items:start; }
  .ofr-mini .section-head{ margin-bottom:18px; }
  .ofr-mini-copy p.ofr-mini-say{ margin:0 0 14px; font-size:1rem; color:var(--ink-soft); max-width:62ch; }
  .ofr-mini-copy p.ofr-mini-say a{ color:var(--orange-dark); text-decoration:underline; text-underline-offset:2px; }
  .ofr-mini-link{
    display:inline-flex; align-items:center; gap:8px; margin-top:8px; font-weight:620; font-size:0.95rem;
    color:var(--ink); text-decoration:none; border-bottom:2px solid var(--orange); padding-bottom:2px;
  }
  .ofr-mini-link:hover{ color:var(--orange-dark); }
  .ofr-mini-prices{ display:grid; gap:16px; }
  .ofr-tile{
    background:var(--paper); border:1px solid var(--line); border-left:4px solid var(--orange);
    border-radius:12px; padding:22px 24px; box-shadow:var(--shadow-sm);
  }
  .ofr-tile.is-system{ border-left-color:var(--navy-deep); }
  .ofr-tile .ofr-price{ padding-top:0; border-top:0; margin:0 0 8px; }
  .ofr-tile .ofr-amount{ font-size:1.9rem; }
  .ofr-tile-what{ margin:0; font-size:0.92rem; color:var(--ink-soft); }
  @media (max-width:860px){
    .ofr-grid{ grid-template-columns:1fr; gap:20px; }
    .ofr-card{ padding:28px 22px 26px; }
    .ofr-amount{ font-size:1.85rem; }
    .ofr-mini .ofr-mini-wrap{ grid-template-columns:1fr; gap:28px; }
    .ofr-tile{ padding:20px 18px; }
    .ofr-tile .ofr-amount{ font-size:1.7rem; }
  }
/* offers_v1:css:end */`;

/* ---------------------------------------------------------------- homepage copy (full terms) */
const SITE_IN = [
  'Up to 100 pages built on your domain, your hosting, your accounts',
  'Titles, descriptions, headings and internal links written for every page',
  'Schema markup, so Google and AI assistants can quote you correctly',
  'Core Web Vitals tuned on mobile and desktop before handover',
  'Forms, Google Analytics 4 and Search Console connected and verified',
  'One round of revisions after you have seen it live',
];
const SITE_OUT = 'writing the content itself for pages you have not drafted, paid advertising, ongoing link building, and anything that needs a customer login or a payment gateway. Each of those is quoted separately, and we tell you before you pay, not after.';

const ERP_IN = [
  'Stock, orders, jobs and billing in one system your staff actually open',
  'Your existing spreadsheets and records migrated in',
  'A separate login and permission level for every role',
  'Staff training, plus written documentation you keep',
  'Source code, database and documentation are yours from the first commit',
  'The monthly fee covers hosting, backups, support and small changes',
];
const ERP_OUT = 'payroll, manufacturing planning, multi-branch consolidation, and integrations with systems you already run. Any of those is a second phase, priced only after the first system is live and being used.';

const LEDE = 'TechAuditPros is a technical team based in Kochi, Kerala, India. We build websites, do technical SEO including AEO and GEO, and build custom ERP systems for digital agencies and growing businesses in the United States, Canada, Australia, the UAE, India and the United Kingdom. Most work we scope before we price it, because most work is not the same twice. These two are, so they carry a price and a date.';

function card(m, kind) {
  const p = MARKETS[m];
  const isSite = kind === 'site';
  const items = isSite ? SITE_IN : ERP_IN;
  return `            <article class="ofr-card${isSite ? '' : ' is-system'}">
                <p class="ofr-tag">${isSite ? 'Package 01' : 'Package 02'}</p>
                <h3>${isSite ? 'The 14-Day Site' : 'The 30-Day System'}</h3>
                <p class="ofr-days">${isSite ? 'Live in 14 working days' : 'Live in 30 days'}</p>
                <p class="ofr-price">
                    <span class="ofr-amount">${isSite ? p.site : p.erpSetup}</span>
                    <span class="ofr-unit">${isSite ? 'fixed, one time' : 'setup, one time'}</span>
                </p>
                <p class="ofr-plus">${isSite
      ? 'No monthly fee. Search and content work afterwards is optional and separate.'
      : 'Then <strong>' + p.erpMo + ' a month</strong> for hosting, support and changes.'}</p>
                <p class="ofr-claim">${isSite
      ? 'A complete website of up to 100 pages, live in 14 working days counted from the day you sign off the content &mdash; not from the day you pay.'
      : 'A working ERP covering stock, orders, jobs and billing, live in 30 days, with your data already in it and your team already trained on it.'}</p>
                <p class="ofr-sub">What you get</p>
                <ul class="ofr-in">
${items.map(i => '                    <li>' + i + '</li>').join(NL)}
                </ul>
                <p class="ofr-out"><strong>Not in this price:</strong> ${isSite ? SITE_OUT : ERP_OUT}</p>
${isSite ? '' : '                <p class="ofr-proof">The same stack runs Viraat Marine&rsquo;s shipyard: a larger build, 19 role desks, that went from first line to live in 45 days. <a href="' + RESULTS + '">Read the case study</a>.</p>' + NL}                <a class="ofr-cta" href="${L.FORM}" target="_blank" rel="noopener">${isSite ? 'Start the 14-day clock' : 'Scope the 30 days'}</a>
            </article>`;
}

/* The old note compared the site price with "a comparable US agency retainer ... about $4,500 a
 * month". That was a third-party figure with no source behind it, so it is gone. In its place the
 * note sends each market to the hub that prices the same two packages in its own currency. */
function homeNote() {
  return 'Both figures are fixed for the scope listed above. Anything outside that scope is quoted in writing before it starts, '
    + 'never added to an invoice afterwards. These two prices are held until 31 March 2027. '
    + 'Figures shown in US dollars &mdash; the same two packages are priced in local currency on our '
    + '<a href="/ca/">Canada</a>, <a href="/uk/">UK</a>, <a href="/au/">Australia</a>, <a href="/ae/">UAE</a> and <a href="/in/">India</a> pages.';
}

function homeSection() {
  const m = 'global';
  return `<!-- offers_v1:start -->
<section class="ofr-section" id="offers" aria-label="Fixed-price packages">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Two Things We Price Up Front</p>
            <h2>Fixed scope. Fixed price. Fixed date.</h2>
        </div>
        <p class="ofr-lede">${LEDE}</p>
        <div class="ofr-grid">
${card(m, 'site')}
${card(m, 'erp')}
        </div>
        <p class="ofr-note">${homeNote()}</p>
    </div>
</section>
<!-- offers_v1:end -->`;
}

/* ---------------------------------------------------------------- hub copy (one market each)
 * Every string here is written for its own market. Nothing longer than a price label repeats
 * between two hubs, and nothing is lifted from the homepage block or from the hub's own body.
 * Facts only: invoice currency and tax treatment as the hubs already state them, time
 * differences from UTC offsets (IST = UTC+5:30), and exclusions that follow from the fixed scope. */
const HUB = {
  us: {
    label: 'United States',
    eyebrow: 'Fixed prices &middot; United States',
    h2: 'Two jobs with a US-dollar price before any call',
    say: [
      'Most of what we build is scoped first and priced in writing afterwards. Two packages are the exception, because their scope does not change from one buyer to the next.',
      'You are quoted and invoiced in US dollars. Kerala runs 9&frac12; to 13&frac12; hours ahead of the mainland US depending on your zone and daylight saving, so a change you send as your day closes is normally ready when the next one starts.',
    ],
    siteTag: 'The 14-Day Site', siteUnit: 'once, no monthly fee',
    siteWhat: 'Up to 100 pages, launched 14 working days after you approve the content.',
    erpTag: 'The 30-Day System', erpUnit: 'setup, then $750 each month',
    erpWhat: 'Stock, orders, jobs and billing, with your records moved across and your staff trained.',
    link: 'See what each US package includes and leaves out',
  },
  uk: {
    label: 'United Kingdom',
    eyebrow: 'Fixed prices &middot; United Kingdom',
    h2: 'What the two fixed packages cost in sterling',
    say: [
      'For a UK buyer the detail that matters is the invoice: it comes from India, in pounds, with no UK VAT on it. A VAT-registered business applies the <a href="https://www.gov.uk/vat-on-services-from-abroad" target="_blank" rel="noopener">reverse charge HMRC describes for services bought from abroad</a>, which normally leaves nothing extra to pay.',
      'London is 4&frac12; hours behind Kerala in summer and 5&frac12; in winter, so most of a British morning sits inside our working day for calls and reviews.',
    ],
    siteTag: 'The 14-Day Site', siteUnit: 'fixed fee, paid once',
    siteWhat: 'A 100-page site, live a fortnight of working days after content sign-off.',
    erpTag: 'The 30-Day System', erpUnit: 'setup, plus &pound;600 monthly',
    erpWhat: 'An ERP for stock, orders, jobs and billing. Payroll and links to your accounts package come later, as phase two.',
    link: 'Full inclusions and exclusions for both packages',
  },
  ca: {
    label: 'Canada',
    eyebrow: 'Fixed prices &middot; Canada',
    h2: 'Priced in Canadian dollars, not converted',
    say: [
      'Both packages are set in CAD, so the number in your budget is the number on our quote, with no US-dollar exchange swing between approval and invoice. Both are held until 31 March 2027.',
      'In daylight time Kerala is 9&frac12; hours ahead of Toronto and 12&frac12; ahead of Vancouver, one more in winter. Reviews happen on your morning call; the build moves on while you are offline.',
    ],
    siteTag: 'The 14-Day Site', siteUnit: 'one payment',
    siteWhat: 'Up to 100 pages; the 14 working days are counted from the day your content is signed off.',
    erpTag: 'The 30-Day System', erpUnit: 'setup + CAD 1,000 a month',
    erpWhat: 'Stock, orders, jobs and billing. Payroll and accounting-software connections are priced once the system is in daily use.',
    link: 'Read the complete terms for both packages',
  },
  au: {
    label: 'Australia',
    eyebrow: 'Fixed prices &middot; Australia',
    h2: 'Two packages with an Australian-dollar price',
    say: [
      'Both are priced in AUD and held to 31 March 2027. Sydney and Melbourne are 4&frac12; hours ahead of Kerala (5&frac12; during daylight saving) and Perth 2&frac12;, so our day begins in your early afternoon.',
      'The 30-day scope is deliberately narrow. Single Touch Payroll and a connection to your accounting software are a second phase, quoted after the first system is live and in use.',
    ],
    siteTag: 'The 14-Day Site', siteUnit: 'fixed, paid once',
    siteWhat: 'A site of up to 100 pages, live 14 working days after content approval.',
    erpTag: 'The 30-Day System', erpUnit: 'setup, AUD 1,150 a month after',
    erpWhat: 'One system for stock, orders, jobs and billing, with your spreadsheets migrated in.',
    link: 'The full package terms, line by line',
  },
  in: {
    label: 'India',
    eyebrow: 'Fixed prices &middot; India',
    h2: 'The two fixed packages, in rupees',
    say: [
      'These are the only rupee prices we publish; every other job is scoped on a call and put in writing. They exclude GST, which is shown on our tax invoice, so a GST-registered buyer can claim it as input tax credit in the usual way.',
      'We share your time zone, and for a business in Kerala we can sit with your team in person while the scope is being agreed.',
    ],
    siteTag: 'The 14-Day Site', siteUnit: 'one time, plus GST',
    siteWhat: 'Up to 100 pages, live in 14 working days once you sign off the content.',
    erpTag: 'The 30-Day System', erpUnit: 'setup, then &#8377;25,000 a month',
    erpWhat: 'Stock, orders, jobs and billing in one system. Payroll and links to your accounting software are a later phase.',
    link: 'What each package includes, point by point',
  },
  ae: {
    label: 'UAE',
    eyebrow: 'Fixed prices &middot; UAE',
    h2: 'Two fixed packages, priced in dirhams',
    say: [
      'Dubai and Abu Dhabi are 1&frac12; hours behind Kerala, so calls fall inside ordinary office hours in both places and a question asked before lunch is answered the same day.',
      'The 30-day system covers stock, orders, jobs and billing. PINT-AE e-invoicing through an accredited provider and WPS salary files sit outside that fixed scope and are priced separately.',
    ],
    siteTag: 'The 14-Day Site', siteUnit: 'single fixed fee',
    siteWhat: 'Up to 100 pages, handed over 14 working days after the content is approved.',
    erpTag: 'The 30-Day System', erpUnit: 'setup; AED 2,700 monthly',
    erpWhat: 'Your stock, orders, jobs and billing in one place, with existing records imported and users trained.',
    link: 'Everything in and out of both packages',
  },
};

function hubSection(m) {
  const p = MARKETS[m], h = HUB[m];
  if (!h) throw new Error('no hub copy for ' + m);
  return `<!-- offers_v1:start -->
<section class="ofr-section ofr-mini" id="offers" aria-label="Fixed-price packages, ${h.label}">
    <div class="container ofr-mini-wrap">
        <div class="ofr-mini-copy">
            <div class="section-head">
                <p class="eyebrow">${h.eyebrow}</p>
                <h2>${h.h2}</h2>
            </div>
${h.say.map(t => '            <p class="ofr-mini-say">' + t + '</p>').join(NL)}
            <a class="ofr-mini-link" href="/#offers">${h.link} &rarr;</a>
        </div>
        <div class="ofr-mini-prices">
            <div class="ofr-tile">
                <p class="ofr-tag">${h.siteTag}</p>
                <p class="ofr-price"><span class="ofr-amount">${p.site}</span> <span class="ofr-unit">${h.siteUnit}</span></p>
                <p class="ofr-tile-what">${h.siteWhat}</p>
            </div>
            <div class="ofr-tile is-system">
                <p class="ofr-tag">${h.erpTag}</p>
                <p class="ofr-price"><span class="ofr-amount">${p.erpSetup}</span> <span class="ofr-unit">${h.erpUnit}</span></p>
                <p class="ofr-tile-what">${h.erpWhat}</p>
            </div>
        </div>
    </div>
</section>
<!-- offers_v1:end -->`;
}

/* ---------------------------------------------------------------- schema */
/* The ERP offer carries both parts of its price: the one-time setup and the monthly fee, as a
 * UnitPriceSpecification per month, so a machine reading the page sees the whole commitment. */
function schema(m) {
  const p = MARKETS[m];
  const hub = m !== 'global';
  const area = hub ? `["${p.cc}"]` : '["US", "GB", "CA", "AU", "AE", "IN"]';
  const url = 'https://techauditpros.com' + (hub ? p.path : '/') + '#offers';
  const name = 'TechAuditPros Fixed-Price Packages' + (hub ? ' - ' + L.plain(HUB[m].label) : '');
  const spec = (price) => `{
            "@type": "PriceSpecification",
            "price": "${price}",
            "priceCurrency": "${p.cur}",
            "valueAddedTaxIncluded": false
          }`;
  const svc = (oname, desc, price, unit, monthly) => `        {
          "@type": "Offer",
          "name": ${L.jsonStr(oname)},
          "description": ${L.jsonStr(desc)},
          "price": "${price}",
          "priceCurrency": "${p.cur}",
          "priceValidUntil": "2027-03-31",
          "availability": "https://schema.org/InStock",
          "url": "${url}",
          "priceSpecification": ${monthly ? `[
          ${spec(price)},
          {
            "@type": "UnitPriceSpecification",
            "price": "${monthly}",
            "priceCurrency": "${p.cur}",
            "unitText": "MONTH",
            "valueAddedTaxIncluded": false
          }
          ]` : spec(price)},
          "itemOffered": {
            "@type": "Service",
            "name": ${L.jsonStr(oname)},
            "serviceType": ${L.jsonStr(unit)},
            "provider": { "@type": "Organization", "name": "TechAuditPros", "url": "https://techauditpros.com/" },
            "areaServed": ${area}
          }
        }`;
  return `<!-- offers_v1:schema:start -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": ${JSON.stringify(name)},
  "url": "${url}",
  "itemListElement": [
${svc('The 14-Day Site',
    'A complete website of up to 100 pages, live in 14 working days from content sign-off. Includes the build, on-page technical SEO, schema markup, Core Web Vitals tuning, analytics and Search Console setup, and one round of revisions.',
    p.siteNum, 'Website design and development', null)},
${svc('The 30-Day System',
    'A custom ERP covering stock, orders, jobs and billing, live in 30 days, with existing data migrated, role-based logins, staff training and documentation. Setup is one time; hosting, support and changes are ' + L.plain(p.erpMo) + ' a month afterwards.',
    p.erpNum, 'Custom ERP software development', p.erpMoNum)}
  ]
}
</script>
<!-- offers_v1:schema:end -->`;
}

/* ---------------------------------------------------------------- injection */
/* Replace a marked block where it already sits. Returns null when the page has no such block. */
function replaceInPlace(s, startMark, endMark, body) {
  const a = s.indexOf(startMark);
  if (a === -1) return null;
  if (s.indexOf(startMark, a + 1) !== -1) throw new Error('two blocks of ' + startMark);
  const b = s.indexOf(endMark, a);
  if (b === -1) throw new Error('unclosed block ' + startMark);
  return s.slice(0, a) + body + s.slice(b + endMark.length);
}

const chr = 'class=' + String.fromCharCode(34) + 'ofr-amount' + String.fromCharCode(34) + '>';
const lt = String.fromCharCode(60);

function inject(page) {
  const p = MARKETS[page.market];
  if (!p) throw new Error('no price book for ' + page.market);
  const hub = page.market !== 'global';
  let s = L.read(page.rel);

  // css: in place, or into the first <style> on a page that has none yet
  let r = replaceInPlace(s, '/* offers_v1:css:start */', '/* offers_v1:css:end */', CSS);
  if (r === null) {
    const styleEnd = s.indexOf('</style>');
    if (styleEnd === -1) throw new Error('no </style> in ' + page.rel);
    r = s.slice(0, styleEnd) + CSS + NL + s.slice(styleEnd);
  }
  s = r;

  // schema: in place, or before </head>
  r = replaceInPlace(s, '<!-- offers_v1:schema:start -->', '<!-- offers_v1:schema:end -->', schema(page.market));
  if (r === null) {
    const headEnd = s.indexOf('</head>');
    if (headEnd === -1) throw new Error('no </head> in ' + page.rel);
    r = s.slice(0, headEnd) + schema(page.market) + NL + s.slice(headEnd);
  }
  s = r;

  // the section itself: in place, or at the page's anchor
  const body = hub ? hubSection(page.market) : homeSection();
  r = replaceInPlace(s, '<!-- offers_v1:start -->', '<!-- offers_v1:end -->', body);
  if (r === null) {
    const a = s.indexOf(page.anchor);
    if (a === -1) throw new Error('anchor not found in ' + page.rel + ': ' + page.anchor);
    let left, right;
    if (page.mode === 'after') {
      left = a + page.anchor.length; right = left;
      while (s[right] === '\r' || s[right] === '\n') right++;
    } else {
      right = a; left = a;
      while (left > 0 && (s[left - 1] === '\r' || s[left - 1] === '\n')) left--;
    }
    r = s.slice(0, left) + NL + NL + body + NL + NL + s.slice(right);
  }
  s = r;

  // one of everything, and no stray duplicate ids
  L.must(s, '<!-- offers_v1:start -->', 1);
  L.must(s, '<!-- offers_v1:end -->', 1);
  L.must(s, '/* offers_v1:css:start */', 1);
  L.must(s, '<!-- offers_v1:schema:start -->', 1);
  L.must(s, 'id="offers"', 1);
  L.must(s, hub ? '<div class="ofr-tile' : '<article class="ofr-card', 2);
  L.must(s, [chr, p.site, lt].join(''), 1);
  L.must(s, [chr, p.erpSetup, lt].join(''), 1);
  if (L.count(s, '<html') !== 1) throw new Error('html tag count wrong in ' + page.rel);
  // the retired unsourced comparison must never come back
  if (s.includes('comparable US agency retainer, elsewhere on this site')) throw new Error('unsourced retainer figure reappeared in ' + page.rel);
  L.write(page.rel, s);
}

/* The homepage search result. Kept here so a re-run writes the CURRENT snippet, not an old one.
 * Only the homepage: the hub titles are tuned per market and are not this script's to overwrite. */
function homeHead() {
  const rel = 'index.html';
  let s = L.read(rel);
  const title = 'Custom ERP, Websites &amp; SEO from India | TechAuditPros';
  const desc = 'Custom ERP, websites and SEO from an engineering team in Kerala, India, for firms in the US, Canada, Australia, UAE and India. Fixed prices, live proof.';
  const alt = 'TechAuditPros &mdash; custom ERP, websites and technical SEO, built in Kerala, India, for businesses in the US, Canada, Australia, the UAE and India';
  s = s.replace(/<title>[\s\S]*?<\/title>/, '<title>' + title + '</title>');
  s = s.replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + desc + '" />');
  s = s.replace(/<meta property="og:title" content="[^"]*" \/>/g, '<meta property="og:title" content="' + title + '" />');
  s = s.replace(/<meta name="twitter:title" content="[^"]*" \/>/g, '<meta name="twitter:title" content="' + title + '" />');
  s = s.replace(/<meta property="og:description" content="[^"]*" \/>/g, '<meta property="og:description" content="' + desc + '" />');
  s = s.replace(/<meta name="twitter:description" content="[^"]*" \/>/g, '<meta name="twitter:description" content="' + desc + '" />');
  // the old alt text said "for clients in the UK, US and Canada" — a client history we cannot show
  s = s.replace(/<meta property="og:image:alt" content="[^"]*" \/>/g, '<meta property="og:image:alt" content="' + alt + '" />');
  s = s.replace(/<meta name="twitter:image:alt" content="[^"]*" \/>/g, '<meta name="twitter:image:alt" content="' + alt + '" />');
  L.must(s, title, 3);
  L.must(s, desc, 3);
  const tlen = L.plain(title).length, dlen = L.plain(desc).length;
  if (tlen > 60) throw new Error('title too long: ' + tlen);
  if (dlen < 120 || dlen > 155) throw new Error('description length out of range: ' + dlen);
  L.write(rel, s);
}

/* The comparison card advertised a monthly retainer as if it were the only way to buy.
 * Left alone it now contradicts the fixed prices sitting further up the same page. */
function reconcileCompare() {
  for (const rel of ['index.html', 'ca/index.html']) {
    let s = L.read(rel);
    const re = /<li>Flat-rate pricing from \$1,200\/mo[^<]*<\/li>/;
    const fixed = '<li>Fixed-price packages, or a flat retainer from $1,200/mo &mdash; no long contracts</li>';
    if (re.test(s)) { s = s.replace(re, fixed); L.write(rel, s); }
    else if (s.includes(fixed)) console.log('  compare card already reconciled in ' + rel);
    else throw new Error('compare card line not found in ' + rel);
  }
}

for (const page of PAGES) inject(page);
homeHead();
reconcileCompare();
console.log('offers_v1 published on ' + PAGES.length + ' pages (full block on the homepage, short market blocks on ' + (PAGES.length - 1) + ' hubs)');
