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
 * global homepage points Indian visitors at /in/ for rupees.
 *
 * Re-runnable: stripOld() removes the previous marked blocks by character position (the repo is
 * CRLF, so nothing here rebuilds text from split lines) before re-inserting. Run again after
 * editing a price and every page updates.
 */
const L = require('./lib');

const NL = '\r\n';
const RESULTS = '/results/viraat-marine-erp/';

/* ---------------------------------------------------------------- price book */
const MARKETS = {
  global: { site: '$4,500', erpSetup: '$7,500', erpMo: '$750', cur: 'USD', siteNum: '4500', erpNum: '7500', note: 'inr' },
  us: { site: '$4,500', erpSetup: '$7,500', erpMo: '$750', cur: 'USD', siteNum: '4500', erpNum: '7500' },
  uk: { site: '&pound;3,500', erpSetup: '&pound;6,000', erpMo: '&pound;600', cur: 'GBP', siteNum: '3500', erpNum: '6000' },
  ca: { site: 'CAD 6,000', erpSetup: 'CAD 10,000', erpMo: 'CAD 1,000', cur: 'CAD', siteNum: '6000', erpNum: '10000' },
  au: { site: 'AUD 7,000', erpSetup: 'AUD 11,500', erpMo: 'AUD 1,150', cur: 'AUD', siteNum: '7000', erpNum: '11500' },
  in: { site: '&#8377;1,50,000', erpSetup: '&#8377;2,50,000', erpMo: '&#8377;25,000', cur: 'INR', siteNum: '150000', erpNum: '250000' },
  ae: { site: 'AED 16,000', erpSetup: 'AED 27,000', erpMo: 'AED 2,700', cur: 'AED', siteNum: '16000', erpNum: '27000' },
};

/* Each page names its own anchor, because the hubs do not share one section order.
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
  @media (max-width:860px){
    .ofr-grid{ grid-template-columns:1fr; gap:20px; }
    .ofr-card{ padding:28px 22px 26px; }
    .ofr-amount{ font-size:1.85rem; }
  }
/* offers_v1:css:end */`;

/* ---------------------------------------------------------------- copy */
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

function lede(market) {
  const where = market === 'in'
    ? 'businesses across India and for digital agencies abroad'
    : 'digital agencies and growing businesses in the United States, the United Kingdom, Canada, the UAE and India';
  return 'TechAuditPros is a technical team based in Kochi, Kerala, India. We build websites, do technical SEO including AEO and GEO, and build custom ERP systems for ' + where
    + '. Most work we scope before we price it, because most work is not the same twice. These two are, so they carry a price and a date.';
}

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
${isSite ? '' : '                <p class="ofr-proof">This is the same system already running the daily operations of a marine engineering company &mdash; <a href="' + RESULTS + '">read what it replaced</a>.</p>' + NL}                <a class="ofr-cta" href="${L.FORM}" target="_blank" rel="noopener">${isSite ? 'Start the 14-day clock' : 'Scope the 30 days'}</a>
            </article>`;
}

function note(m) {
  const p = MARKETS[m];
  let s = 'Both figures are fixed for the scope listed above. Anything outside that scope is quoted in writing before it starts, '
    + 'never added to an invoice afterwards. These two prices are held until 31 March 2027.';
  if (p.cur === 'USD') s += ' For scale: a comparable US agency retainer, elsewhere on this site, runs about $4,500 a <em>month</em>. The site package is $4,500 <em>once</em>.';
  if (p.note === 'inr') s += ' Figures shown in US dollars &mdash; if you are buying from India, the rupee prices are on our <a href="/in/">India page</a>.';
  return s;
}

function section(m) {
  return `<!-- offers_v1:start -->
<section class="ofr-section" id="offers" aria-label="Fixed-price packages">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Two Things We Price Up Front</p>
            <h2>Fixed scope. Fixed price. Fixed date.</h2>
        </div>
        <p class="ofr-lede">${lede(m)}</p>
        <div class="ofr-grid">
${card(m, 'site')}
${card(m, 'erp')}
        </div>
        <p class="ofr-note">${note(m)}</p>
    </div>
</section>
<!-- offers_v1:end -->`;
}

/* ---------------------------------------------------------------- schema */
function schema(m) {
  const p = MARKETS[m];
  const svc = (name, desc, price, unit) => `        {
          "@type": "Offer",
          "name": ${L.jsonStr(name)},
          "description": ${L.jsonStr(desc)},
          "price": "${price}",
          "priceCurrency": "${p.cur}",
          "priceValidUntil": "2027-03-31",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "${price}",
            "priceCurrency": "${p.cur}",
            "valueAddedTaxIncluded": false
          },
          "itemOffered": {
            "@type": "Service",
            "name": ${L.jsonStr(name)},
            "serviceType": ${L.jsonStr(unit)},
            "provider": { "@type": "Organization", "name": "TechAuditPros", "url": "https://techauditpros.com/" },
            "areaServed": ["US", "GB", "CA", "AU", "AE", "IN"]
          }
        }`;
  return `<!-- offers_v1:schema:start -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "TechAuditPros Fixed-Price Packages",
  "url": "https://techauditpros.com/#offers",
  "itemListElement": [
${svc('The 14-Day Site',
    'A complete website of up to 100 pages, live in 14 working days from content sign-off. Includes the build, on-page technical SEO, schema markup, Core Web Vitals tuning, analytics and Search Console setup, and one round of revisions.',
    p.siteNum, 'Website design and development')},
${svc('The 30-Day System',
    'A custom ERP covering stock, orders, jobs and billing, live in 30 days, with existing data migrated, role-based logins, staff training and documentation. Setup is one time; hosting, support and changes are ' + L.plain(p.erpMo) + ' a month afterwards.',
    p.erpNum, 'Custom ERP software development')}
  ]
}
</script>
<!-- offers_v1:schema:end -->`;
}

/* ---------------------------------------------------------------- injection */
/* Cuts previous blocks out by index. Deliberately not a line-based rebuild: the repo is CRLF
 * and every earlier attempt at rebuilding text here silently converted the file to LF. */
function cutBlock(s, startMark, endMark) {
  for (;;) {
    const a = s.indexOf(startMark);
    if (a === -1) return s;
    const b = s.indexOf(endMark, a);
    if (b === -1) throw new Error('unclosed block ' + startMark);
    let end = b + endMark.length;
    while (s[end] === '\r' || s[end] === '\n') end++;
    let start = a;
    while (start > 0 && (s[start - 1] === '\r' || s[start - 1] === '\n')) start--;
    s = s.slice(0, start) + NL + s.slice(end);
  }
}

function stripOld(s) {
  s = cutBlock(s, '<!-- offers_v1:start -->', '<!-- offers_v1:end -->');
  s = cutBlock(s, '<!-- offers_v1:schema:start -->', '<!-- offers_v1:schema:end -->');
  s = cutBlock(s, '/* offers_v1:css:start */', '/* offers_v1:css:end */');
  return s;
}

const chr = 'class='+String.fromCharCode(34)+'ofr-amount'+String.fromCharCode(34)+'>';
const lt = String.fromCharCode(60);

function inject(page) {
  const p = MARKETS[page.market];
  if (!p) throw new Error('no price book for ' + page.market);
  let s = L.read(page.rel);
  s = stripOld(s);

  // css into the first <style> on the page
  const styleEnd = s.indexOf('</style>');
  if (styleEnd === -1) throw new Error('no </style> in ' + page.rel);
  s = s.slice(0, styleEnd) + CSS + NL + s.slice(styleEnd);

  // schema before </head>
  const headEnd = s.indexOf('</head>');
  if (headEnd === -1) throw new Error('no </head> in ' + page.rel);
  s = s.slice(0, headEnd) + schema(page.market) + NL + s.slice(headEnd);

  // the section itself
  const a = s.indexOf(page.anchor);
  if (a === -1) throw new Error('anchor not found in ' + page.rel + ': ' + page.anchor);
  const body = section(page.market);
  // Absorb whatever blank lines already sit at the seam, then emit a fixed two, so run 1 and
  // run 2 produce byte-identical files instead of a one-blank-line git diff.
  // left keeps the text before the seam, right resumes after it, so the blank lines already
  // sitting there are dropped and re-emitted as exactly two. Without this, run 1 and run 2
  // differ by one blank line and every re-run shows a phantom git diff.
  let left, right;
  if (page.mode === 'after') {
    left = a + page.anchor.length; right = left;
    while (s[right] === '\r' || s[right] === '\n') right++;
  } else {
    right = a; left = a;
    while (left > 0 && (s[left - 1] === '\r' || s[left - 1] === '\n')) left--;
  }
  s = s.slice(0, left) + NL + NL + body + NL + NL + s.slice(right);

  // one of everything, and no stray duplicate ids
  L.must(s, '<!-- offers_v1:start -->', 1);
  L.must(s, '<!-- offers_v1:end -->', 1);
  L.must(s, '/* offers_v1:css:start */', 1);
  L.must(s, '<!-- offers_v1:schema:start -->', 1);
  L.must(s, 'id="offers"', 1);
  L.must(s, 'class="ofr-card', 2);
  L.must(s, [chr,p.site,lt].join(''), 1);
  L.must(s, [chr,p.erpSetup,lt].join(''), 1);
  if (L.count(s, '<html') !== 1) throw new Error('html tag count wrong in ' + page.rel);
  L.write(page.rel, s);
}

/* The homepage search result had to change too, or the price is on the page and invisible in
 * Google. Only the homepage: the hub titles are tuned per market and are not mine to overwrite. */
function homeHead() {
  const rel = 'index.html';
  let s = L.read(rel);
  const title = 'TechAuditPros | 100-Page SEO Website in 14 Days, Fixed Price';
  const desc = 'TechAuditPros is a technical team in Kochi, India. Fixed price: a complete 100-page SEO website live in 14 working days, or a custom ERP live in 30 days.';
  s = s.replace(/<title>[\s\S]*?<\/title>/, '<title>' + title + '</title>');
  s = s.replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="' + desc + '" />');
  s = s.replace(/<meta property="og:title" content="[^"]*" \/>/g, '<meta property="og:title" content="' + title + '" />');
  s = s.replace(/<meta name="twitter:title" content="[^"]*" \/>/g, '<meta name="twitter:title" content="' + title + '" />');
  s = s.replace(/<meta property="og:description" content="[^"]*" \/>/g, '<meta property="og:description" content="' + desc + '" />');
  s = s.replace(/<meta name="twitter:description" content="[^"]*" \/>/g, '<meta name="twitter:description" content="' + desc + '" />');
  L.must(s, title, 3);
  L.must(s, desc, 3);
  if (desc.length > 165) throw new Error('description too long: ' + desc.length);
  if (title.length > 62) throw new Error('title too long: ' + title.length);
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
console.log('offers_v1 published on ' + PAGES.length + ' pages');
