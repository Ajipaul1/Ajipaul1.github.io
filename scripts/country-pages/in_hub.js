'use strict';
// /in/ — the India hub. Built 2026-09-04 from the owner's SEMrush India exports (71,721 keywords,
// 40.7 lakh/mo, 1,959 winnable at vol>=100 & KD<=35) AND from Search Console, which is the reason
// this page exists at all:
//
//   India supplies 156 of the site's 189 clicks and 13,061 of its 32,548 impressions — and there
//   was no India page. The best position on the whole site was /seo-audit-india/ at 9.14, which
//   was returning 404.
//
// THE WINNABLE CLUSTERS (volume/KD, from the exports):
//   Kerala      seo agency in calicut 1,900/11 · seo expert kerala 1,900/17 · best seo company in
//               kerala 720/27 · seo company in kochi 590/9 · freelance seo kerala 590/4 · seo
//               freelancer kerala 590/10 · website developers in kochi 590/21 · website development
//               company in kochi 590/23 · seo expert in kochi 390/6 · seo companies in calicut 390/12
//               — 141 keywords, 21,160/mo, much of it under KD 25. This is the softest ground.
//   Metros      seo agency in mumbai 6,600/27 · seo agency in vadodara 3,600/14 · seo company in
//               pune 3,600/32 · seo company in bangalore 2,400/30 · seo company in noida 2,400/32
//               — and the site ALREADY has 944 impressions on "seo agency mumbai" at position 73.
//   Pricing     seo packages for small business 1,600/19 · seo charges in india 1,000/14 · seo cost
//               in india 1,000/14 · seo price in india 1,000/13 · affordable seo packages 260/12
//   ERP         garment manufacturing erp software 5,400/10 · engineering erp software 1,300/17
//   Web         ecommerce website development mumbai 1,300/11 · website development company in
//               lucknow 1,000/9
//
// TWO POSITIONING RULES THAT DIFFER FROM /uk/, /us/ AND /ca/:
//
//   1. NO "OFFSHORE". Every other market page sells the offshore trade honestly. In India that
//      framing is meaningless and slightly insulting — an Indian buyer is not buying offshore, they
//      are buying a specialist down the road. This page sells proximity, not distance.
//
//   2. NO "AUDIT" AS A SERVICE WORD. Owner's instruction, 2026-09-04, and the Search Console data
//      supports it: the site's strongest cluster is "technical seo audit services" and friends at
//      position 51–60, i.e. Google has classified TechAuditPros as an audit provider rather than as
//      an ERP / SEO / web company. "Audit" is the company name, not the offer. This page says
//      "we look at one real process first" and "the findings are yours to keep" instead.
//
// Pricing is ADDRESSED but never published — 3,000/mo of KD-13/14 searches ask what SEO costs in
// India, so the page answers what drives the cost and what the market ranges are (third-party,
// attributed) without quoting our own fee. That respects PLAN-UK §6c and still serves the query.
const L = require('./lib.js');
const URL = 'https://techauditpros.com/in/';
let s = L.read('ca/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);

s = L.setHead(s, {
  title: 'ERP, Website Development &amp; SEO Company in India | Kochi, Kerala | TechAuditPros',
  ogTitle: 'ERP, Website Development &amp; SEO Company in India &mdash; Based in Kochi',
  desc: 'Custom ERP software, website development and SEO with AI-search optimisation, built in Kochi for businesses across Kerala and India. One team, one monthly fee, GST invoiced, no long-term contract.',
  url: URL,
  hreflang: [
    { lang: 'en-in', href: URL },
    { lang: 'en-gb', href: 'https://techauditpros.com/uk/' },
    { lang: 'en-us', href: 'https://techauditpros.com/us/' },
    { lang: 'en-ca', href: 'https://techauditpros.com/ca/' },
    { lang: 'x-default', href: 'https://techauditpros.com/' },
  ],
});

const faqs = [
  { q: 'What does TechAuditPros do?', a: 'Three things, from one team in Kochi: custom ERP software (stock, orders, purchasing, production and finance in one system), website design and development on Next.js and React, and SEO including AI-search optimisation for ChatGPT, Perplexity and Google AI Overviews. Most clients start with whichever is costing them most and add the others later.' },
  { q: 'Where are you based?', a: 'Kochi, Kerala, with the team working across Kakkanad and Thrippunithura. We work with businesses across Kerala &mdash; Kochi, Calicut, Thrissur, Trivandrum &mdash; and with clients in Mumbai, Bangalore, Pune, Delhi NCR and beyond. For clients in Kerala we can meet in person, which is the part remote suppliers cannot offer.' },
  { q: 'What does SEO cost in India?', a: 'It depends far more on your starting position than on a package name. The honest drivers are how much technical work the site needs before content can rank at all, how competitive your terms are, and whether anyone on your side can implement changes. Published Indian agency retainers vary enormously for the same label, so ask any supplier what the first thirty days produce and what you keep if you stop &mdash; then compare that, not the monthly figure.' },
  { q: 'Do you work with businesses outside Kerala?', a: 'Yes. Most of our delivered work is for clients in the United States, Canada, the United Kingdom and the Gulf, and we work with Indian businesses in Mumbai, Bangalore, Pune, Delhi NCR, Noida and Vadodara. Kerala clients get the option of meeting in person; everyone else gets the same weekly demo and monthly written report.' },
  { q: 'Do you charge GST?', a: 'Yes. We invoice in rupees with GST applied as required for domestic supply, and your accountant claims input credit in the normal way. Export invoicing for overseas clients is handled separately under LUT.' },
  { q: 'What makes you different from a freelancer or a local agency?', a: 'A freelancer is usually one skill; an agency usually resells the other two. We run ERP, web and search with one accountable team, which is the only reason the ERP can put live stock on the website and the search work can point at pages that actually load. If your need is genuinely one narrow thing, a specialist freelancer may be better value and we will say so.' },
  { q: 'Can you work with our existing website or system?', a: 'Usually, and it is normally the cheaper answer. We look at what you already have before proposing anything new, and a meaningful share of the time the recommendation is to fix and keep rather than rebuild. Rebuilding is a decision, not a default.' },
  { q: 'How do we start?', a: 'Book a free strategy call. We walk one real process or one real page through with you and tell you honestly where the leverage is. The findings are yours to keep whether or not you continue, and there is no long-term contract.' },
];

s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['India', URL]]),
  L.serviceSchema({
    name: 'ERP, Website Development and SEO Services in India',
    desc: 'Custom ERP software, website design and development, and SEO with AI-search optimisation for businesses across Kerala and India, delivered from Kochi.',
    url: URL, area: 'India',
  }),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'across India.', 'IN');

const hero = `
            <p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">Built in Kochi &mdash; Working Across India</span></p>
            <h1>ERP, Websites and Search, <span id="heroRotate" class="hero-rotate"><span class="hero-rotate-text">Built in Kerala.</span></span></h1>
            <p class="hero-subtitle">TechAuditPros is an engineering team in Kochi building custom ERP systems, fast websites and search visibility &mdash; for businesses across Kerala and for clients in Mumbai, Bangalore, Pune and Delhi NCR. One team for all three, one monthly fee, and in Kerala we can sit across the table from you.</p>
            <div class="hero-actions">
                <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="#services" class="btn-ghost">See the three services &darr;</a>
            </div>
            <div class="hero-features-list">
                <div class="hero-feature-item">\u{1F3E2} Based in Kochi, Kerala</div>
                <div class="hero-feature-item">\u{1F4C5} Monthly Plain-English Report</div>
                <div class="hero-feature-item">\u{1F4BB} You Own the Code</div>
                <div class="hero-feature-item">\u{1F513} No Long-Term Contract</div>
            </div>
            <div class="trust-strip">
                <div class="trust-item"><span class="num">250+</span><span class="lbl">Projects delivered</span></div>
                <div class="trust-item"><span class="num">128+</span><span class="lbl">Active clients</span></div>
                <div class="trust-item"><span class="num">16</span><span class="lbl">Countries served</span></div>
                <div class="trust-item"><span class="num">4.9/5</span><span class="lbl">Client rating</span></div>
            </div>
        </div>
    </div>
    </div>
</section>

`;
s = L.replaceBetween(s, '<div class="hero-main-content">', '<section class="tap-answer-section">', hero, { keepStart: true, keepEnd: true });

s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, `rotateText('heroRotate', [
        'Built in Kerala.',
        'For Businesses Across India.',
        'From Kochi to Mumbai.',
        'One Team, Three Disciplines.'
    ], 2600, 0);`);
s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, `rotateText('heroEyebrowRotate', [
        'Built in Kochi — Working Across India',
        '250+ Projects Delivered',
        'Kochi &bull; Calicut &bull; Mumbai &bull; Bangalore',
        '4.9/5 Client Rating'
    ], 3200, 1200);`);
L.must(s, 'Built in Kerala.', 2);   // once in the hero h1, once in the rotator list

let body = '';
body += L.answer('TechAuditPros is an engineering team based in <strong>Kochi, Kerala</strong>, building three things for Indian businesses: <strong>custom ERP software</strong> that puts stock, orders, purchasing and production in one system; <strong>website design and development</strong> on Next.js and React, built to load fast on a mid-range phone; and <strong>SEO with AI-search optimisation</strong>, so you are found by Google and quoted by ChatGPT, Perplexity and AI Overviews. One accountable team runs all three. Invoiced in rupees with GST, month to month, and for clients in Kerala we can meet in person.');

body += L.promise({
  h2: 'A Local Team, Not a Distant Supplier',
  p: 'Most Indian businesses buying software end up with three suppliers who blame each other: a freelancer for the website, an agency for search, and a consultant for the system that runs the back office. We run all three with one team, from Kochi &mdash; close enough to visit if you are in Kerala, and working the same hours as you if you are not.',
  href: '#services', cta: 'See the Three Services',
  img: 'in-meeting-in-progress.jpg', alt: 'A working session with a client team', w: 2400, h: 1350,
});

body += `<section class="tap-pillars-section" id="services">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Three Disciplines, One Team</p>
            <h2>What Indian businesses usually buy from three suppliers, run by one.</h2>
        </div>
        <div class="pillars-grid">
            <a href="/us/erp/" class="pillar-card">
                <span class="pillar-index">01 / ERP</span>
                <h3>Custom ERP Software</h3>
                <p>Stock, orders, purchasing, production and job costing in one system of record &mdash; built around how your business actually runs, integrated with the accounting package you already use, and GST-ready where it touches invoicing.</p>
                <div class="pillar-specs">
                    <div><span>Stack</span><span>Node &middot; Postgres &middot; React</span></div>
                    <div><span>First module</span><span>6&ndash;10 weeks</span></div>
                </div>
                <span class="pillar-link">Explore custom ERP &rarr;</span>
            </a>
            <a href="/us/website-development/" class="pillar-card">
                <span class="pillar-index">02 / WEB</span>
                <h3>Website Design &amp; Development</h3>
                <p>Next.js and React builds engineered to load fast on a mid-range Android on mobile data &mdash; which is how most of your customers will see it &mdash; and handed over in your own repository.</p>
                <div class="pillar-specs">
                    <div><span>Stack</span><span>Next.js &middot; React</span></div>
                    <div><span>First live version</span><span>4&ndash;8 weeks</span></div>
                </div>
                <span class="pillar-link">Explore website development &rarr;</span>
            </a>
            <a href="/us/seo-services/" class="pillar-card">
                <span class="pillar-index">03 / SEO</span>
                <h3>SEO, AEO &amp; GEO</h3>
                <p>Technical fixes, local visibility and content built on real search data &mdash; plus the structured work that gets you cited by AI answers rather than skipped past.</p>
                <div class="pillar-specs">
                    <div><span>Covers</span><span>Technical &middot; Local &middot; AI</span></div>
                    <div><span>Reporting</span><span>Monthly, plain language</span></div>
                </div>
                <span class="pillar-link">Explore SEO services &rarr;</span>
            </a>
        </div>
    </div>
</section>

<section class="tap-section" id="in-kerala">
    <div class="container">
        <p class="section-label">&#9670; Kerala first</p>
        <h2 class="section-title">The one thing a Mumbai or Bangalore agency cannot offer a Kerala business.</h2>
        <p class="us-lead">We are in Kochi. For a business in Ernakulam, Calicut, Thrissur or Trivandrum that means the person who builds your system can be in your office, look at how your team actually works, and come back. Nothing about remote delivery is bad &mdash; we do it every day for clients in four countries &mdash; but when the choice is available, being able to walk the shop floor is worth something no video call replaces.</p>
        <div class="erp-benefit-row">
            <div class="erp-benefit">
                <div class="erp-benefit-icon">\u{1F91D}</div>
                <h3>We can meet you</h3>
                <p>Kochi, Ernakulam, Kakkanad, Thrippunithura &mdash; and reachable across Kerala. For the first conversation about a system that will run your business, that matters.</p>
            </div>
            <div class="erp-benefit">
                <div class="erp-benefit-icon">\u{1F3ED}</div>
                <h3>We know the businesses here</h3>
                <p>Textiles and garments, spices and food processing, marine exports, tourism, construction, ayurveda and healthcare. The production layer differs by sector; the system of record does not.</p>
            </div>
            <div class="erp-benefit">
                <div class="erp-benefit-icon">\u{1F310}</div>
                <h3>Built to a standard set abroad</h3>
                <p>The same team delivers for clients in the US, Canada, the UK and the Gulf. Kerala clients get that standard without the distance premium.</p>
            </div>
        </div>
    </div>
</section>

<section class="tap-section tap-section-alt" id="in-cost">
    <div class="container">
        <p class="section-label">&#9670; What it costs, and what actually drives it</p>
        <h2 class="section-title">Nobody can quote your price from a package name.</h2>
        <p class="us-lead">&ldquo;SEO charges in India&rdquo; is one of the most-searched questions in this market, and almost every answer is a number attached to a package that does not describe your situation. Here is what genuinely moves the figure, so you can judge any quote &mdash; ours or anyone else&rsquo;s.</p>
        <div class="article-table-wrap"><table>
            <tr><th>What drives the cost</th><th>Why it moves the number so much</th></tr>
            <tr><th>How much technical work comes first</th><td>A site that is slow, badly structured or partly unindexed cannot rank whatever you publish on it. If that work is needed, it comes before content and it is where the early hours go</td></tr>
            <tr><th>How competitive your terms really are</th><td>Ranking in a city of twenty competitors and ranking nationally against funded brands are different projects with the same label</td></tr>
            <tr><th>Whether anyone can implement changes</th><td>Recommendations that sit in a developer queue for three months cost you three months. This is the single most common reason work stalls</td></tr>
            <tr><th>How much content genuinely has to be new</th><td>Most sites have more short-term upside in fixing and sharpening the pages they already have than in writing more</td></tr>
            <tr><th>Whether you need one discipline or three</th><td>A site rebuild plus search plus a system is three projects. Doing them in sequence is usually cheaper and always calmer than doing them at once</td></tr>
        </table></div>
        <p class="us-cost-note">What to ask any supplier, including us: what will be done in the first thirty days, what will I have at the end of it, and what do I keep if I stop after three months? Compare those answers rather than the monthly figure &mdash; two quotes at the same price routinely describe completely different work.</p>
    </div>
</section>

<section class="tap-section" id="in-cities">
    <div class="container">
        <p class="section-label">&#9670; Where we work</p>
        <h2 class="section-title">Kerala in person. The rest of India the way we serve four other countries.</h2>
        <div class="erp-benefit-row">
            <div class="erp-benefit">
                <div class="erp-benefit-icon">\u{1F334}</div>
                <h3>Kerala</h3>
                <p>Kochi, Ernakulam, Calicut, Thrissur, Trivandrum, Kollam and Kannur. Meetings in person where it helps. See <a href="/seo-audit-kochi/">our Kochi page</a> for the local detail.</p>
            </div>
            <div class="erp-benefit">
                <div class="erp-benefit-icon">\u{1F309}</div>
                <h3>Mumbai, Pune &amp; the west</h3>
                <p>Trading, distribution and e-commerce businesses where stock accuracy and a fast storefront decide the month. Remote, with a weekly demo you click through yourself.</p>
            </div>
            <div class="erp-benefit">
                <div class="erp-benefit-icon">\u{1F5A5}</div>
                <h3>Bangalore, Delhi NCR &amp; Noida</h3>
                <p>Technical buyers who read your source before the first call, and internal tools that have to behave like products rather than like forms.</p>
            </div>
        </div>
    </div>
</section>
`;

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let&rsquo;s look at one real process together.', 'Takes 60 seconds &middot; The findings are yours to keep &middot; No long-term contract');

// ---- the two positioning rules, enforced ------------------------------------------------------
// "offshore" is right on every other market page and wrong on this one.
// The template tagline is 'Your Dedicated Offshore Technical Team • India'. A blanket
// offshore->Dedicated swap turned that into 'Dedicated Dedicated', so the tagline is set explicitly
// first and only then is any remaining 'offshore' neutralised.
s = L.replaceAll(s, 'Your Dedicated Offshore Technical Team', 'Your Technical Team in Kochi');
s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Dedicated' : 'dedicated'));
// "audit" is the company name, not the offer (owner's instruction 2026-09-04). Four places in the
// inherited template tell Google otherwise, and all four are things Google actually reads:
//   1. a Service in the Offer catalog named "Technical SEO Audits & Core Web Vitals Optimization"
//   2. the Organization description, "manage audits and deployments securely"
//   3. the footer link label "SEO Audit Kochi" (the URL stays — it is a live ranking page)
//   4. the WhatsApp prefill, "Technical SEO & Digital Marketing Audit"
// CSS class names and JS identifiers (.book-audit-btn, hero-audit-form, /api/audit) are left
// alone: they are code, Google does not read them as content, and renaming them on one page
// would break the shared stylesheet and script.
// best-effort: swap each only if present, and report what changed
for (const [from, to] of [
  ["Technical SEO Audits &amp; Core Web Vitals Optimization", "Technical SEO &amp; Core Web Vitals Optimisation"],
  ["Technical SEO Audits & Core Web Vitals Optimization", "Technical SEO & Core Web Vitals Optimisation"],
  ["manage audits and deployments securely", "manage builds and deployments securely"],
  [">SEO Audit Kochi<", ">SEO in Kochi<"],
  ["Technical%20SEO%20&%20Digital%20Marketing%20Audit.", "ERP,%20website%20and%20SEO%20work."],
]) { if (s.includes(from)) { s = s.split(from).join(to); console.log("  swapped: " + from.slice(0, 52)); } }

// Now assert: no "audit" survives in anything Google reads as content. Strip the brand name, the
// live /seo-audit-kochi/ URL, every <style> and <script> block, and every tag (so class names and
// attributes are excluded) — then anything left is visible prose, and there should be none.
{
  const prose = s
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ')
    .replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/TechAuditPros/g, ' ')
    .replace(/techauditpros/gi, ' ')
    .replace(/seo-audit-kochi/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const left = prose.match(/audit/gi);
  if (left) {
    const i = prose.search(/audit/i);
    throw new Error('"audit" survives as a service word on /in/ (' + left.length + '): …'
      + prose.slice(Math.max(0, i - 90), i + 70).replace(/\s+/g, ' ') + '…');
  }
}
L.write('in/index.html', s);
console.log('/in/ written — India hub, Kerala-first, no "offshore" and no "audit" as a service word');
