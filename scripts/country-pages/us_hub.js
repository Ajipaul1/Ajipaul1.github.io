'use strict';
const L = require('./lib.js');
const URL = 'https://techauditpros.com/us/';
let s = L.read('ca/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.usFooterCities(s);

s = L.setHead(s, {
  title: 'ERP, Web Development &amp; SEO Agency for US Businesses | TechAuditPros',
  desc: 'TechAuditPros is an AI-native engineering team for US businesses: custom ERP software, high-performance website development and SEO/AEO/GEO from one dedicated team &mdash; one agreed monthly fee, well below a comparable agency than a typical US agency, no long-term contract.',
  url: URL,
  hreflang: [{ lang: 'en-us', href: URL }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }],
});

const faqs = [
  { q: 'What does TechAuditPros do for US businesses?', a: 'Three things, from one team: custom ERP software (inventory, orders, purchasing, production and finance in one system), custom website design and development on Next.js and React, and SEO with AI-search optimization (AEO/GEO). Most US clients start with the one that hurts most and add the others when they are ready.' },
  { q: 'How much does it cost?', a: 'One agreed monthly fee per engagement, all-in &mdash; dedicated engineering team, design, development, integrations and monthly reporting, with no per-seat licenses, no upfront project fee and no long-term contract. That is roughly 60% below the US$4,500-a-month retainers common at US agencies for comparable work.' },
  { q: 'How does working with an India-based team work from the US?', a: 'Our engineers work from Kochi, India &mdash; 9.5 hours ahead of New York and 12.5 ahead of Los Angeles. Work you send at the end of your day is done by your next morning, there is a live overlap window every US morning for calls, Slack and Teams, and you get a weekly demo plus a monthly written report from a engineering team that knows your account.' },
  { q: 'Is there a contract or minimum term?', a: 'No. Engagements run month to month, invoiced in US dollars, and you can pause or stop at any time. Code, content, data and accounts are yours regardless.' },
  { q: 'How do you protect our data and code?', a: 'Every engagement is under NDA. Systems are built in cloud accounts you own, in US regions, with role-based access you control and can revoke, weekly encrypted backups, and no shared credentials. You own the source code from day one.' },
  { q: 'Which US cities and states do you serve?', a: 'All 50 states, remotely &mdash; from New York, Los Angeles, Chicago, Houston and Dallas to Phoenix, Atlanta, Miami, Seattle, Denver, Boston and everywhere between. We do not have a US office, and we say so up front: if you need someone on-site, we are not the right fit.' },
  { q: 'Do you work with US agencies as a white-label partner?', a: 'Yes. Marketing, design and IT agencies hand us the engineering and SEO delivery for their clients under their brand, with a shared project board and one point of contact. Ask about it on the call.' },
  { q: 'How do we start?', a: 'Book a free strategy call. We look at your current site, systems or search data together and tell you honestly where the leverage is &mdash; and if the answer is that you do not need us yet, we say that too.' },
];

s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United States', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to America.', 'US');

// hero (keeps the rotating ids)
const hero = `
            <p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">AI-Native Engineering Team &mdash; Serving the United States</span></p>
            <h1>An AI-Native Team for <span id="heroRotate" class="hero-rotate"><span class="hero-rotate-text">US ERP, Web &amp; SEO.</span></span></h1>
            <p class="hero-subtitle">TechAuditPros is a dedicated AI-native technical team running custom ERP builds, website development and SEO with AI-search optimization for US businesses and agencies &mdash; from New York and Chicago to Texas and California &mdash; for one agreed monthly fee, without the overhead a typical US agency has to recover.</p>
            <div class="hero-actions">
                <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="#services" class="btn-ghost">See the three services</a>
            </div>
            <div class="hero-features-list">
                <div class="hero-feature-item">\u{1F468}‍\u{1F4BB} Dedicated Engineering Team</div>
                <div class="hero-feature-item">\u{1F4C5} Monthly Plain-English Report</div>
                <div class="hero-feature-item">\u{1F512} NDA &amp; US Data Residency</div>
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

// rotating phrases
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, `rotateText('heroRotate', [
        'US ERP, Web &amp; SEO.',
        'Best AI Developers for America.',
        'Trusted ERP Partner in the US.',
        'Full-Spectrum SEO Experts.',
        'AI-Native Web Development.'
    ], 2600, 0);`);
s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, `rotateText('heroEyebrowRotate', [
        'AI-Native Engineering Team — Serving the United States',
        '250+ Projects Delivered',
        'Pricing scoped on a call',
        '4.9/5 Client Rating',
        'New York &bull; Los Angeles &bull; Chicago &bull; Houston'
    ], 3200, 1200);`);
L.must(s, 'Best AI Developers for America.', 1); L.must(s, 'Serving the United States', 2);

let body = '';
body += L.answer('TechAuditPros is an <strong>AI-native technical team</strong> serving US businesses and agencies with <strong>custom ERP software</strong>, <strong>high-performance website development</strong> and <strong>SEO with AI-search optimization (AEO/GEO)</strong> &mdash; built to rank on Google and get cited by ChatGPT, Perplexity and AI Overviews. Flat pricing of <strong>one agreed monthly fee</strong>, about <strong>60% less</strong> than a comparable US agency, with one accountable team on every engagement, month to month, in US dollars.');

body += L.promise({
  h2: 'Built for US Businesses That Are Done Juggling Vendors',
  p: 'A developer for the website, an agency for SEO, a consultant for the software that runs the back office &mdash; three invoices, three roadmaps, and nobody accountable for the whole picture. TechAuditPros puts one engineering team behind all three, so the site is built to rank, the ERP talks to the site, and one accountable team answers for the result.',
  href: '#services', cta: 'See the Three Services',
  img: 'istock-1489414046-woman-engineer-laptop-ops-room.jpg', alt: 'TechAuditPros engineer working on a client system from the operations room', w: 612, h: 323,
});

body += `<section class="tap-pillars-section" id="services">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Three Disciplines, One Team</p>
            <h2>Everything a growing US business outsources to three different vendors, run by one accountable team.</h2>
        </div>
        <div class="pillars-grid">
            <a href="/us/erp/" class="pillar-card">
                <span class="pillar-index">01 / ERP</span>
                <h3>Custom ERP Software</h3>
                <p>Inventory, orders, purchasing, production and finance in one system of record &mdash; integrated with QuickBooks, Shopify and Salesforce, built around how your business actually runs.</p>
                <div class="pillar-specs">
                    <div><span>Stack</span><span>Node &middot; Postgres &middot; React</span></div>
                    <div><span>First module</span><span>6&ndash;10 weeks</span></div>
                </div>
                <span class="pillar-link">Explore custom ERP for US businesses &rarr;</span>
            </a>
            <a href="/us/website-development/" class="pillar-card">
                <span class="pillar-index">02 / WEB</span>
                <h3>Website Design &amp; Development</h3>
                <p>Mobile-first Next.js and React builds engineered for 90+ Core Web Vitals &mdash; fast enough to rank, built to convert, and kept current every month.</p>
                <div class="pillar-specs">
                    <div><span>Stack</span><span>Next.js &middot; React</span></div>
                    <div><span>First live version</span><span>4&ndash;8 weeks</span></div>
                </div>
                <span class="pillar-link">Explore website development &rarr;</span>
            </a>
            <a href="/us/seo-services/" class="pillar-card">
                <span class="pillar-index">03 / SEO</span>
                <h3>SEO, AEO &amp; GEO</h3>
                <p>Technical, local and content SEO plus Answer and Generative Engine Optimization &mdash; built on real US search data to get cited by AI, not just ranked.</p>
                <div class="pillar-specs">
                    <div><span>Covers</span><span>Technical &middot; Local &middot; AI</span></div>
                    <div><span>Reporting</span><span>Monthly, plain English</span></div>
                </div>
                <span class="pillar-link">Explore SEO services &rarr;</span>
            </a>
        </div>
    </div>
</section>

<section id="regions" class="tap-regions-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Also Serving</p>
            <h2>Priced for the US, backing businesses across four other markets too.</h2>
        </div>
        <div class="regions-grid">
            <a href="/us/" class="region-card region-card-current">
                <span class="region-card-badge">You are here</span>
                <span class="region-flag"><img src="https://flagcdn.com/w80/us.png" srcset="https://flagcdn.com/w160/us.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>United States</h3>
                <span class="region-rate-amount">Let’s talk<span class="region-rate-period">pricing</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Scoped on a call</span><span class="region-save">In writing</span></div>
            </a>
            <a href="/ca/" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/ca.png" srcset="https://flagcdn.com/w160/ca.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>Canada</h3>
                <span class="region-rate-amount">Let’s talk<span class="region-rate-period">pricing</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Scoped on a call</span><span class="region-save">In writing</span></div>
            </a>
            <a href="#contact" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/au.png" srcset="https://flagcdn.com/w160/au.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>Australia</h3>
                <span class="region-rate-amount">Let’s talk<span class="region-rate-period">pricing</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Scoped on a call</span><span class="region-save">In writing</span></div>
            </a>
            <a href="#contact" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/gb.png" srcset="https://flagcdn.com/w160/gb.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>United Kingdom</h3>
                <span class="region-rate-amount">Let’s talk<span class="region-rate-period">pricing</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Scoped on a call</span><span class="region-save">In writing</span></div>
            </a>
            <a href="#contact" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/ae.png" srcset="https://flagcdn.com/w160/ae.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>Dubai, UAE</h3>
                <span class="region-rate-amount">Let’s talk<span class="region-rate-period">pricing</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Scoped on a call</span><span class="region-save">In writing</span></div>
            </a>
        </div>
        <p class="regions-footnote">* Starting rates shown vs. average local agency pricing in each market.</p>
    </div>
</section>

<section id="compare">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Why This, Not That</p>
            <h2>Raw AI tools skip the judgment. US agencies mark up the overhead.</h2>
        </div>
        <div class="compare-grid">
            <div class="compare-card negative">
                <h4>The usual options</h4>
                <ul>
                    <li>Generic AI-generated code with no system-level review</li>
                    <li>US agency retainers of US$3,000&ndash;$5,000+ a month, on 6&ndash;12 month contracts</li>
                    <li>Upfront project fees, then change requests billed by the hour</li>
                    <li>An account manager between you and the people doing the work</li>
                </ul>
            </div>
            <div class="compare-card positive">
                <h4>TechAuditPros</h4>
                <ul>
                    <li>A dedicated engineering team, not a ticket queue</li>
                    <li>One agreed monthly fee &mdash; month to month, in US dollars</li>
                    <li>Every engagement starts with real technical scoping or a real audit</li>
                    <li>Monthly plain-English report; code, content and data fully yours</li>
                </ul>
            </div>
        </div>
    </div>
</section>

`;

body += L.statRow('how-it-works', 'How the US &harr; India Model Works', 'Your working day and ours barely overlap &mdash; and that is the advantage.', 'Kochi runs 9.5 hours ahead of New York and 12.5 ahead of Los Angeles. Here is what that means in practice.', [
  ['Overnight', 'Feedback you send at the end of your day is built and waiting the next morning'],
  ['Every morning', 'A live overlap window for calls, Slack and Teams with your team'],
  ['Weekly', 'A demo of what shipped, on a staging site you can click through'],
  ['Monthly', 'A written report in plain English: what changed, what moved, what is next'],
], true);

body += L.promise({
  h2: 'One Team You Can Actually Reach',
  p: 'Behind every US engagement is a small, senior team &mdash; not a rotating cast of account managers. You know the team by name, they know your business by heart, and the whole team stands behind every launch. That is what one accountable partner for ERP, web and SEO feels like week to week.',
  href: '#contact', cta: 'Meet Us on a Call',
  img: 'istock-1818616410-young-team-tablet-night-huddle.jpg', alt: 'The TechAuditPros team reviewing a client launch together', w: 612, h: 408,
});

body += `<section class="tap-numbers-section" id="results">
    <div class="container numbers-grid">
        <div class="number-stat-item"><div class="num">180%</div><div class="label">Traffic growth &mdash; US HVAC client, 6 months</div></div>
        <div class="number-stat-item"><div class="num">205%</div><div class="label">Traffic growth &mdash; Canadian appliance client, 8 months</div></div>
        <div class="number-stat-item"><div class="num">97%</div><div class="label">Client retention rate</div></div>
        <div class="number-stat-item"><div class="num">Month to month</div><div class="label">No long-term contract, stop any time</div></div>
    </div>
</section>

<section class="tap-cases-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Case Studies</p>
            <h2>Real engagements, real numbers.</h2>
        </div>
        <div class="cases-grid">
            <div class="case-card">
                <span class="case-tag">\u{1F1FA}\u{1F1F8} USA &middot; HVAC business</span>
                <h3>Local rank dominance</h3>
                <div class="case-stat-row"><span>Traffic increase</span><strong>+180%</strong></div>
                <div class="case-stat-row"><span>Keywords ranked</span><strong>+320</strong></div>
                <div class="case-stat-row"><span>Timeframe</span><strong>6 months</strong></div>
                <a class="case-card-link" href="#contact">Ask About This Project &rarr;</a>
            </div>
            <div class="case-card">
                <span class="case-tag">\u{1F1E8}\u{1F1E6} Canada &middot; Appliance retailer</span>
                <h3>Organic traffic growth</h3>
                <div class="case-stat-row"><span>Traffic increase</span><strong>+205%</strong></div>
                <div class="case-stat-row"><span>Keywords ranked</span><strong>+460</strong></div>
                <div class="case-stat-row"><span>Timeframe</span><strong>8 months</strong></div>
                <a class="case-card-link" href="#contact">Ask About This Project &rarr;</a>
            </div>
            <div class="case-card">
                <span class="case-tag">\u{1F1E6}\u{1F1FA} Australia &middot; E-commerce</span>
                <h3>Revenue growth optimization</h3>
                <div class="case-stat-row"><span>Traffic increase</span><strong>+165%</strong></div>
                <div class="case-stat-row"><span>Top-3 keywords</span><strong>+380</strong></div>
                <div class="case-stat-row"><span>Timeframe</span><strong>7 months</strong></div>
                <a class="case-card-link" href="#contact">Ask About This Project &rarr;</a>
            </div>
        </div>
    </div>
</section>

`;

body += L.faqHtml('us-faq', 'FAQ', 'Working With TechAuditPros From the US: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s Talk.', 'Takes 60 seconds &middot; USD pricing &middot; No long-term contract');

// FAQ CSS is not part of the hub template — bring it in
const faqCss = s.includes('.faq-trigger{') ? '' : `
  .tap-faq-section{ padding:88px 0; background:var(--paper); }
  .faq-accordion{ max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
  .faq-item{ background:var(--paper-alt); border:1px solid var(--line); border-radius:12px; overflow:hidden; }
  .faq-item.active{ background:var(--paper); border-color:var(--orange); }
  .faq-trigger{ width:100%; padding:20px 24px; background:none; border:none; text-align:left; color:var(--ink); font-family:var(--font-sans); font-size:1rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:15px; }
  .faq-icon{ font-family:var(--font-mono); font-size:1.1rem; color:var(--orange); flex-shrink:0; }
  .faq-content{ max-height:0; overflow:hidden; transition:max-height .3s ease-out; }
  .faq-content p{ padding:0 24px 22px; margin:0; color:var(--ink-soft); font-size:0.92rem; line-height:1.6; }`;
s = L.injectExtras(s, faqCss);

L.must(s, 'https://techauditpros.com/ca/', 1); // hreflang alternate (region card uses a relative href)
L.must(s, 'Canadian', 1); // real Canadian case stat
L.must(s, 'region-rate-amount', 5); // five market cards
L.write('us/index.html', s);
