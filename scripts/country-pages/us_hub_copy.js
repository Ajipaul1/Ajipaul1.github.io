'use strict';
// Copy for /us/ (2026-09-29, agent "us"): US-only content — sales-tax nexus after Wayfair, 1099-NEC/1099-K,
// ADA/WCAG, CCPA/CPRA and the other state privacy laws, US platforms, US local search, US time zones vs IST.
// Every third-party figure links to the page it was checked against on 2026-09-29.
// Used by us_hub.js (generator) and by the one-off patch that applied it to the live us/index.html.
const L = require('./lib.js');

const SRC = {
  wayfair: 'https://www.law.cornell.edu/supremecourt/text/17-494',
  nexusAll: 'https://www.salestaxinstitute.com/resources/economic-nexus-state-guide',
  illinois: 'https://www.salestaxinstitute.com/resources/illinois-economic-nexus-update-no-transaction-threshold',
  taxfdn: 'https://taxfoundation.org/data/all/state/sales-tax-rates/',
  nec: 'https://www.irs.gov/instructions/i1099mec',
  k: 'https://www.irs.gov/businesses/understanding-your-form-1099-k',
  adaWeb: 'https://www.ada.gov/resources/web-guidance/',
  adaRule: 'https://www.ada.gov/resources/2024-03-08-web-rule/',
  ccpa: 'https://oag.ca.gov/privacy/ccpa',
  ccpaCpi: 'https://cppa.ca.gov/regulations/cpi_adjustment.html',
  cppaRegs: 'https://www.cppa.ca.gov/announcements/2025/20250923.html',
  states: 'https://www.multistate.us/insider/2026/2/4/all-of-the-comprehensive-privacy-laws-that-take-effect-in-2026',
  pub538: 'https://www.irs.gov/publications/p538',
  dst: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst',
  gbp: 'https://support.google.com/business/answer/7091',
  clutch: 'https://clutch.co/web-designers/pricing',
  ahrefs: 'https://ahrefs.com/blog/seo-pricing/',
};
const a = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const src = (...links) => `<p class="us2-src">Source: ${links.join(' &middot; ')}</p>`;

const head = {
  title: 'Custom ERP, Websites &amp; SEO for US Businesses | TechAuditPros',
  desc: 'Custom ERP, websites and SEO for US companies: sales-tax and 1099-aware systems, WCAG 2.1 AA sites, local search. Fixed US-dollar prices, no lock-in.',
};

const rotateH1 = ['US Businesses.', 'Multi-State Sellers.', 'Teams Outgrowing QuickBooks.', 'Local Service Companies.', 'Shopify Brands.'];
const rotateEyebrow = ['ERP, Websites &amp; SEO for the United States', 'Viraat Marine ERP: Live in 45 Days', 'Fixed US-Dollar Prices to 31 Mar 2027', 'GST-Registered in Kerala, India', 'Eastern &bull; Central &bull; Mountain &bull; Pacific'];

const heroInner = `
            <p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">${rotateEyebrow[0]}</span></p>
            <h1>Custom ERP, Websites &amp; SEO for <span id="heroRotate" class="hero-rotate"><span class="hero-rotate-text">${rotateH1[0]}</span></span></h1>
            <p class="hero-subtitle">TechAuditPros builds the systems a US company runs on: an ERP that knows which states you owe sales tax in and which contractors need a 1099, a website built to WCAG 2.1 AA, and search work aimed at Google Business Profile and AI answers. The engineers work in Kerala, India; you are invoiced in US dollars, month to month.</p>
            <div class="hero-actions">
                <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="#us-rules" class="btn-ghost">The US rules we build for</a>
            </div>
            <div class="hero-features-list">
                <div class="hero-feature-item">🧾 Sales-Tax &amp; 1099 Aware</div>
                <div class="hero-feature-item">♿ WCAG 2.1 AA Built In</div>
                <div class="hero-feature-item">🇺🇸 US-Region Hosting on Request</div>
                <div class="hero-feature-item">🔓 No Long-Term Contract</div>
            </div>
            <div class="trust-strip">
                <div class="trust-item"><span class="num">45 days</span><span class="lbl">Viraat Marine ERP, 20 Jul &ndash; 2 Sep 2026</span></div>
                <div class="trust-item"><span class="num">19</span><span class="lbl">Role desks a Kerala shipyard runs on</span></div>
                <div class="trust-item"><span class="num">3</span><span class="lbl">Client systems live today</span></div>
                <div class="trust-item"><span class="num">GSTIN</span><span class="lbl">32CXYPP6750P1ZC, Kerala</span></div>
            </div>`;

const faqs = [
  { q: 'What does TechAuditPros build for US businesses?', a: 'Custom ERP software, websites and SEO, from one team in Kerala, India. The ERP covers stock, orders, purchasing, jobs and billing and syncs with QuickBooks Online, NetSuite, Shopify or Stripe; the websites are Next.js builds made to WCAG 2.1 AA; the SEO covers Google Business Profile, local pages and AI answer engines. You can hire one service or all three.' },
  { q: 'What do your fixed prices include, in US dollars?', a: 'The 14-day website is US$4,500 one time for up to 100 pages. The 30-day ERP covering stock, orders, jobs and billing is US$7,500 to set up, then US$750 a month for hosting, support and changes. Both prices are held until 31 March 2027. Retainers start from US$1,200 a month, and any other job gets a written scope and price before anyone writes code.' },
  { q: 'Can your ERP tell us where we have sales-tax nexus?', a: 'It can show you where you are getting close. The system totals sales and transaction counts by ship-to state over the period each state measures and flags a state before it crosses its threshold, the most common being $100,000 of sales. Deciding whether to register, and filing the returns, stays with your CPA or a tax service; we build the numbers they need and can connect a tax engine such as Stripe Tax.' },
  { q: 'How does the system handle 1099 contractors?', a: 'It stores each contractor’s W-9 details, totals what you paid them in the calendar year and flags anyone who reaches the $2,000 Form 1099-NEC threshold that applies from tax year 2026. Because anyone filing 10 or more information returns must e-file, the year-end export is built to feed your e-filing tool, not paper forms.' },
  { q: 'Will our website meet ADA accessibility requirements?', a: 'We build and test every site to WCAG 2.1 Level AA, the standard the Justice Department adopted for state and local government websites and one its ADA guidance points businesses to. Automated scans catch only part of the problem, so we also test with a keyboard and a screen reader. Nobody can promise a site will never draw a complaint, but you will know what was tested and what was fixed.' },
  { q: 'How do you handle CCPA/CPRA and the other state privacy laws?', a: 'We build the mechanics: a privacy notice that matches what the site really collects, a “Do Not Sell or Share” link where it applies, support for the Global Privacy Control browser signal, and a way to find and delete one person’s data when they ask. California’s law reaches businesses above US$26,625,000 in annual revenue, among other tests, and twenty states now have comprehensive privacy laws. Your lawyer decides what applies to you; we make the site do it.' },
  { q: 'What hours will you be working in US time?', a: 'Kerala runs on India Standard Time, UTC+5:30, with no daylight saving. Between 8 March and 1 November 2026, New York is 9.5 hours behind Kerala and Los Angeles 12.5; in winter those gaps grow to 10.5 and 13.5 hours. Calls fit your morning, which is our evening, and the day’s work is on a staging link before your next 9 a.m.' },
  { q: 'Do you have a US office or US staff?', a: 'No. TechAuditPros is registered in Kerala, India (GSTIN 32CXYPP6750P1ZC) and has no office outside India. Meetings are video calls and invoices are in US dollars. If your project needs someone on site in the US, we will tell you on the first call.' },
  { q: 'Can US agencies hire you as a white-label partner?', a: 'Yes. Marketing, design and IT agencies can pass us the website build, the ERP work or the SEO delivery for their own clients and keep the client relationship. We work in your project tool, to your brand and your deadlines, and we do not contact your client unless you ask us to.' },
  { q: 'How does a US project start?', a: 'With a free call in your morning. We look at your site, your QuickBooks or order data and your Search Console together, then send a written scope with a fixed price or a monthly fee. If an off-the-shelf tool would serve you better, the scope says so instead.' },
];

const body = `<section class="tap-answer-section">
    <div class="container answer-grid">
        <div class="answer-mark" aria-hidden="true"></div>
        <p><strong>TechAuditPros</strong> is an engineering team in Kerala, India that builds <strong>custom ERP software</strong>, <strong>websites</strong> and <strong>SEO</strong> for US companies. The ERP tracks stock, orders, jobs and billing together with what US rules add to them &mdash; sales by destination state for sales-tax nexus, W-9 details and payment totals for 1099-NEC. The websites are built to WCAG 2.1 AA and Google&rsquo;s Core Web Vitals. The SEO work targets Google Business Profile, the ordinary results and the AI answers in ChatGPT, Perplexity and Google&rsquo;s AI Overviews. Two prices are fixed: a <strong>14-day website for US$4,500</strong> and a <strong>30-day ERP for US$7,500 plus US$750 a month</strong>, both held until 31 March 2027.</p>
    </div>
</section>

<section class="tap-promise-section" id="us-nexus">
    <div class="container promise-grid">
        <div class="promise-content">
            <h2>Why should a US company&rsquo;s ERP know about sales-tax nexus?</h2>
            <p>Because since ${a(SRC.wayfair, '<em>South Dakota v. Wayfair</em>')} (21 June 2018), a state can require you to collect its sales tax without you ever having an office there. The Court overruled the old physical-presence rule and found South Dakota&rsquo;s test &mdash; more than $100,000 of sales, or 200 or more separate transactions, into the state in a year &mdash; enough to create that duty. ${a(SRC.nexusAll, 'Every state with a sales tax now has an economic-nexus rule')}, and the lines still move: ${a(SRC.illinois, 'Illinois dropped its 200-transaction count on 1 January 2026')}. A spreadsheet will not warn you that a state you ship to twice a week just crossed its line. The systems we build total sales by ship-to state, flag a state as it nears its threshold, and hand your CPA an export instead of a scramble.</p>
            <a href="#us-rules" class="btn-navy">See the Rules We Build For</a>
        </div>
        <div class="promise-media">
            <img src="/assets/images/library/istock-1489414046-woman-engineer-laptop-ops-room.jpg" alt="Engineer working on a laptop in an operations room" width="612" height="323" loading="lazy" decoding="async" />
        </div>
    </div>
</section>

<section class="tap-pillars-section" id="services">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Three Services, One Set of US Data</p>
            <h2>What does TechAuditPros build for US companies?</h2>
            <p class="us-lead">Each service can run on its own. Together they share one database, so the order your website takes is the order your ERP ships, taxes and reports.</p>
        </div>
        <div class="pillars-grid">
            <a href="/us/erp/" class="pillar-card">
                <span class="pillar-index">01 / ERP</span>
                <h3>Custom ERP Software</h3>
                <p>Stock, orders, purchasing, jobs and billing in one database, synced with QuickBooks Online or NetSuite, Shopify and Stripe &mdash; with sales by ship-to state and contractor payment totals kept as you go, not rebuilt at year end.</p>
                <div class="pillar-specs">
                    <div><span>Fixed offer</span><span>30 days &middot; US$7,500 + $750/mo</span></div>
                    <div><span>Syncs</span><span>QuickBooks &middot; NetSuite &middot; Stripe</span></div>
                </div>
                <span class="pillar-link">Custom ERP for US businesses &rarr;</span>
            </a>
            <a href="/us/website-development/" class="pillar-card">
                <span class="pillar-index">02 / WEB</span>
                <h3>Website Design &amp; Development</h3>
                <p>Next.js sites of up to 100 pages, built to WCAG 2.1 AA and Google&rsquo;s Core Web Vitals, with privacy notices and opt-outs that match the state laws your visitors live under.</p>
                <div class="pillar-specs">
                    <div><span>Fixed offer</span><span>14 days &middot; US$4,500</span></div>
                    <div><span>Standard</span><span>WCAG 2.1 AA &middot; Core Web Vitals</span></div>
                </div>
                <span class="pillar-link">Website development for the US &rarr;</span>
            </a>
            <a href="/us/seo-services/" class="pillar-card">
                <span class="pillar-index">03 / SEO</span>
                <h3>SEO, AEO &amp; GEO</h3>
                <p>Google Business Profile, a page for every metro or service area you really cover, &ldquo;near me&rdquo; intent, and the structured data AI answer engines read before they quote you.</p>
                <div class="pillar-specs">
                    <div><span>Covers</span><span>GBP &middot; Local &middot; AI answers</span></div>
                    <div><span>Retainer</span><span>From US$1,200/mo</span></div>
                </div>
                <span class="pillar-link">SEO services for the US &rarr;</span>
            </a>
        </div>
    </div>
</section>

<section id="us-rules" class="us-section us-section-alt">
    <div class="container">
        <div class="section-head us2-wide-head">
            <p class="eyebrow">US Rules, Built In</p>
            <h2>Which US tax, accessibility and privacy rules does the work account for?</h2>
            <p class="us-lead">Eight rules a US build has to respect. We are engineers, not your lawyer or CPA: we build the records, notices and checks so the people who advise you have what they need. Every card links to its source.</p>
        </div>
        <div class="us-modules-grid">
            <div class="us-module-card">
                <span class="us-module-icon">🧾</span>
                <h4>Sales-tax economic nexus</h4>
                <p>Forty-five states levy a state-level sales tax and 38 allow local sales taxes, as of 1 January 2026. Remote-seller thresholds are set state by state; the most common is $100,000 of sales a year.</p>
                ${src(a(SRC.taxfdn, 'Tax Foundation'), a(SRC.nexusAll, 'Sales Tax Institute'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">📄</span>
                <h4>1099-NEC for contractors</h4>
                <p>For tax years after 2025 the Form 1099-NEC reporting threshold is $2,000, and anyone filing 10 or more information returns must e-file. The ERP keeps W-9 details and a running total per contractor.</p>
                ${src(a(SRC.nec, 'IRS, 1099-MISC/NEC instructions'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">💳</span>
                <h4>1099-K from payment platforms</h4>
                <p>Payment platforms and marketplaces report your receipts to the IRS once they total over $20,000 in more than 200 transactions, so your books have to reconcile to what Stripe, PayPal or Amazon files.</p>
                ${src(a(SRC.k, 'IRS, understanding Form 1099-K'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">♿</span>
                <h4>ADA and web accessibility</h4>
                <p>The Justice Department&rsquo;s March 2022 guidance says the ADA applies to what businesses open to the public offer on the web, and names WCAG as helpful technical guidance. We build and test to WCAG 2.1 AA.</p>
                ${src(a(SRC.adaWeb, 'ADA.gov web guidance'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">🏛️</span>
                <h4>Selling to the public sector</h4>
                <p>State and local governments must meet WCAG 2.1 AA for web content and apps. After an April 2026 extension the dates are 26 April 2027 for entities of 50,000 people or more and 26 April 2028 for smaller ones.</p>
                ${src(a(SRC.adaRule, 'ADA.gov Title II web rule'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">🔐</span>
                <h4>California CCPA / CPRA</h4>
                <p>Reaches businesses above $26,625,000 in annual revenue, among other tests. Sellers or sharers of data need a &ldquo;Do Not Sell or Share&rdquo; link and must honour the Global Privacy Control signal; new risk-assessment rules started on 1 January 2026.</p>
                ${src(a(SRC.ccpaCpi, 'CPPA thresholds'), a(SRC.ccpa, 'California AG'), a(SRC.cppaRegs, 'CPPA regulations'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">🗺️</span>
                <h4>The other state privacy laws</h4>
                <p>Twenty states now have comprehensive privacy laws on the books; Indiana, Kentucky and Rhode Island&rsquo;s took effect on 1 January 2026. Consent, opt-outs and data requests are built as features, not a banner.</p>
                ${src(a(SRC.states, 'MultiState, Feb 2026'))}
            </div>
            <div class="us-module-card">
                <span class="us-module-icon">📦</span>
                <h4>Inventory costing: FIFO or LIFO</h4>
                <p>US tax rules allow first-in first-out or last-in first-out stock valuation, and adopting LIFO takes IRS Form 970. The ERP keeps a cost layer for every receipt so your accountant can use either method.</p>
                ${src(a(SRC.pub538, 'IRS Publication 538'))}
            </div>
        </div>
        <p class="us-links-row"><span>Selling outside the US too?</span> <a href="/ca/">Canada</a> <a href="/uk/">United Kingdom</a> <a href="/au/">Australia</a> <a href="/ae/">UAE</a> <a href="/in/">India</a></p>
    </div>
</section>

<section id="us-search" class="us-section">
    <div class="container">
        <div class="section-head us2-wide-head">
            <p class="eyebrow">How US Buyers Find You</p>
            <h2>What does a US buyer see before they ever visit your site?</h2>
            <p class="us-lead">For a local or regional business, three places decide who gets the call, and each is won a different way.</p>
        </div>
        <div class="us2-search-grid">
            <div class="us2-search-card">
                <span class="us2-search-k">01 &middot; The map pack</span>
                <h3>Google Business Profile</h3>
                <p>Google ranks local profiles on relevance, distance and prominence, and says plainly that there is no way to pay for a better local ranking. We fix categories, service areas, hours and photos, and set up the review requests that build prominence.</p>
                ${src(a(SRC.gbp, 'Google Business Profile Help'))}
            </div>
            <div class="us2-search-card">
                <span class="us2-search-k">02 &middot; Place searches</span>
                <h3>&ldquo;Near me&rdquo; and city pages</h3>
                <p>Many searches name a service and a place, or say &ldquo;near me&rdquo; and let the phone supply the place. A page for each metro or county you genuinely serve, with the work you do there, ranks; the same page with the city name swapped does not help anyone.</p>
            </div>
            <div class="us2-search-card">
                <span class="us2-search-k">03 &middot; AI answers</span>
                <h3>ChatGPT, Perplexity, AI Overviews</h3>
                <p>These tools answer before anyone clicks. They lean on pages that state facts plainly &mdash; prices, service areas, licences, hours &mdash; and mark them up with structured data. We write and mark up your pages that way, and check which answers mention you.</p>
            </div>
        </div>
    </div>
</section>

<section id="compare">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">How US Companies Usually Buy This</p>
            <h2>What changes when one team builds the ERP, the site and the search?</h2>
        </div>
        <div class="compare-grid">
            <div class="compare-card negative">
                <h4>The usual US setup</h4>
                <ul>
                    <li>A web agency, an SEO retainer and a QuickBooks consultant: three invoices, three logins, no shared data</li>
                    <li>Per-seat software fees that rise with every hire</li>
                    <li>Accessibility and privacy treated as add-ons after launch</li>
                    <li>Hourly change requests once the site is live</li>
                </ul>
            </div>
            <div class="compare-card positive">
                <h4>With TechAuditPros</h4>
                <ul>
                    <li>One team and one data model across ERP, website and search</li>
                    <li>Two fixed prices in writing: US$4,500 site, US$7,500 + US$750/mo ERP</li>
                    <li>WCAG 2.1 AA, privacy notices and opt-outs in the first build</li>
                    <li>Code, cloud accounts and data registered in your company&rsquo;s name</li>
                </ul>
            </div>
        </div>
        <p class="us-cost-note">For comparison: ${a(SRC.clutch, 'Clutch&rsquo;s pricing data')} (updated 21 September 2026) puts US web-design firms at $100&ndash;$149 an hour, and ${a(SRC.ahrefs, 'an Ahrefs survey of 439 SEO providers')} found 79.1% of those in North America charge at least $1,001 a month.</p>
    </div>
</section>

<section id="how-it-works" class="us-section us-section-alt">
    <div class="container">
        <div class="section-head us2-wide-head">
            <p class="eyebrow">Kerala Time vs. US Time</p>
            <h2>When is TechAuditPros working, in your time zone?</h2>
            <p class="us-lead">India Standard Time is UTC+5:30 all year. US clocks ${a(SRC.dst, 'go forward on the second Sunday in March and back on the first Sunday in November')} &mdash; 8 March and 1 November in 2026 &mdash; so the gap to New York is 9&frac12; hours in summer and 10&frac12; in winter. Hawaii and most of Arizona never change their clocks.</p>
        </div>
        <div class="us-stat-row">
            <div class="us-stat-card"><span class="num">6:30 p.m.</span><span class="lbl">In Kerala at 9:00 a.m. Eastern (EDT); 7:30 p.m. once New York is on EST</span></div>
            <div class="us-stat-card"><span class="num">7:30 p.m.</span><span class="lbl">At 9:00 a.m. Central (CDT) in Chicago, Dallas or Houston; 8:30 p.m. in winter</span></div>
            <div class="us-stat-card"><span class="num">8:30 p.m.</span><span class="lbl">At 9:00 a.m. Mountain (MDT) in Denver; Phoenix stays on MST, so 9:30 p.m. all year</span></div>
            <div class="us-stat-card"><span class="num">9:30 p.m.</span><span class="lbl">At 9:00 a.m. Pacific (PDT) in Seattle or Los Angeles; 10:30 p.m. in winter</span></div>
        </div>
        <p class="us-lead">In practice: calls happen in your morning, which is our evening; the build runs through your night; and a staging link with the day&rsquo;s changes is waiting before your next stand-up. A late-afternoon call from Hawaii lands in Kerala&rsquo;s morning.</p>
    </div>
</section>

<section class="tap-promise-section">
    <div class="container promise-grid">
        <div class="promise-content">
            <h2>Who will a US client actually talk to?</h2>
            <p>The founder, Aji Paul, and the engineers writing your code &mdash; no account manager relaying messages. Aji holds Google&rsquo;s Analytics (GA4) and Ads Search certifications, the Semrush SEO Toolkit certificate (<a href="/semrush-seo-certification-ajipaul.pdf" target="_blank" rel="noopener">PDF</a>) and a Digital Marketing certificate. There is no US office and we will not pretend otherwise: calls run on the video tool you already use, and the registered address in Ernakulam, Kerala, the phone number +91 62825 20339 and GSTIN 32CXYPP6750P1ZC are published on this site.</p>
            <a href="#contact" class="btn-navy">Book a Call in Your Morning</a>
        </div>
        <div class="promise-media">
            <img src="/assets/images/library/istock-1954420507-stylus-tablet-charts-city-dusk.jpg" alt="Tablet showing charts against a city skyline at dusk" width="612" height="402" loading="lazy" decoding="async" />
        </div>
    </div>
</section>

<section class="tap-numbers-section" id="results">
    <div class="container numbers-grid">
        <div class="number-stat-item"><div class="num">45 days</div><div class="label">From first line of code to a shipyard running on it</div></div>
        <div class="number-stat-item"><div class="num">19</div><div class="label">Desks, one per role, each seeing only its own work</div></div>
        <div class="number-stat-item"><div class="num">38</div><div class="label">Database tables under one shipyard&rsquo;s operations</div></div>
        <div class="number-stat-item"><div class="num">31 Mar 2027</div><div class="label">Both fixed US-dollar prices are held until</div></div>
    </div>
</section>

<section class="tap-cases-section" id="us-proof">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Work You Can Open Today</p>
            <h2>What has TechAuditPros built that a US buyer can check?</h2>
            <p class="us-lead">None of it is in the US yet, and we say so. Each one maps onto a kind of US business.</p>
        </div>
        <div class="cases-grid">
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Shipyard</span>
                <h3>Viraat Marine custom ERP</h3>
                <div class="case-stat-row"><span>Built</span><strong>20 Jul &ndash; 2 Sep 2026</strong></div>
                <div class="case-stat-row"><span>Role desks</span><strong>19</strong></div>
                <div class="case-stat-row"><span>US parallel</span><strong>Job shop, fabricator</strong></div>
                <a class="case-card-link" href="/results/viraat-marine-erp/">Read the case study →</a>
            </div>
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Site crews</span>
                <h3>Telgo Power Projects staff app</h3>
                <div class="case-stat-row"><span>Sign-in</span><strong>GPS attendance</strong></div>
                <div class="case-stat-row"><span>Daily report</span><strong>4 steps, to the director</strong></div>
                <div class="case-stat-row"><span>US parallel</span><strong>Field-service crews</strong></div>
                <a class="case-card-link" href="https://telgo-app.vercel.app/" target="_blank" rel="noopener">telgo-app.vercel.app →</a>
            </div>
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Power infrastructure</span>
                <h3>Telgo Power Projects website</h3>
                <div class="case-stat-row"><span>Built</span><strong>May&ndash;Jul 2026</strong></div>
                <div class="case-stat-row"><span>Credits us</span><strong>In its footer</strong></div>
                <div class="case-stat-row"><span>US parallel</span><strong>Contractor website</strong></div>
                <a class="case-card-link" href="https://telgopowerprojects.com/" target="_blank" rel="noopener">telgopowerprojects.com →</a>
            </div>
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Our own sales desk</span>
                <h3>TechAuditPros staff app</h3>
                <div class="case-stat-row"><span>Calls, chat, quotes</span><strong>One phone app</strong></div>
                <div class="case-stat-row"><span>Sales course</span><strong>60 lessons, 2 languages</strong></div>
                <div class="case-stat-row"><span>Live since</span><strong>Sep 2026</strong></div>
                <a class="case-card-link" href="/results/">See all our work →</a>
            </div>
        </div>
    </div>
</section>

${L.faqHtml('us-faq', 'FAQ', 'Buying ERP, Web and SEO From India as a US Company: Questions Answered', faqs)}`;

// page-only CSS (own components on /us/)
const css = `
  /* us2: /us/ own components (2026-09-29) */
  .us2-wide-head{ max-width:860px; }
  .us2-src, .us-module-card .us2-src, .us2-search-card .us2-src{ font-size:0.76rem; color:var(--ink-faint); margin:12px 0 0; line-height:1.5; }
  .us2-src a, .us-cost-note a, .promise-content p a, .us-lead a{ color:var(--orange-dark); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
  #us-rules .us-module-card{ display:flex; flex-direction:column; }
  #us-rules .us-module-card .us2-src{ margin-top:auto; padding-top:12px; }
  #us-rules .us-links-row{ align-items:baseline; color:var(--ink-soft); }
  .us2-search-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:0; margin-top:36px; border-top:2px solid var(--ink); }
  .us2-search-card{ padding:28px 28px 30px 0; border-right:1px solid var(--line); }
  .us2-search-card + .us2-search-card{ padding-left:28px; }
  .us2-search-card:last-child{ border-right:none; }
  .us2-search-k{ display:block; font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--orange-dark); margin-bottom:12px; }
  .us2-search-card h3{ font-size:1.15rem; margin:0 0 10px; }
  .us2-search-card p{ font-size:0.93rem; color:var(--ink-soft); line-height:1.65; margin:0; }
  #how-it-works .us-stat-row + .us-lead{ margin-top:28px; }
  #us-proof .section-head{ max-width:760px; }
  #us-proof .cases-grid{ grid-template-columns:repeat(4,1fr); }
  @media (max-width:1100px){ #us-proof .cases-grid{ grid-template-columns:repeat(2,1fr); } }
  @media (max-width:860px){ .us2-search-grid{ grid-template-columns:1fr; } .us2-search-card, .us2-search-card + .us2-search-card{ padding:24px 0; border-right:none; border-bottom:1px solid var(--line); } .us2-search-card:last-child{ border-bottom:none; } }
  @media (max-width:640px){ #us-proof .cases-grid{ grid-template-columns:1fr; } }`;

module.exports = { SRC, head, rotateH1, rotateEyebrow, heroInner, faqs, body, css };
