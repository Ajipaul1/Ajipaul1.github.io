'use strict';
// /uk/ hub — generated from the CA hub template, targeting the UK keyword set in ai_context/PLAN-UK.md
// (website development uk 880/KD41, website development company in uk 880/36, erp systems uk 480/28,
// erp software uk 390/18, website developer uk 390/38, website development company uk 390/37, website
// development services uk 390/36, uk website development 260/39, erp system uk 140/22, how much does it
// cost to make a website uk 140/18, cloud erp uk 110/26, erp manufacturing software uk 110/9).
// Facts confirmed by the owner 2026-09-03: the team works from India for UK clients, invoiced in GBP,
// no UK VAT charged on the invoice (a UK VAT-registered client accounts for it under the reverse charge).
// No UK client exists yet, so the case studies stay labelled by their real market (US / Canada / AU).
const L = require('./lib.js');
const URL = 'https://techauditpros.com/uk/';
let s = L.read('ca/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/uk/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/uk/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/uk/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.addUkToNavAndFooter(s);
s = L.ukFooterCities(s);

s = L.setHead(s, {
  title: 'ERP, Web Development &amp; SEO Agency for UK Businesses | TechAuditPros',
  desc: 'TechAuditPros is an AI-native engineering team for UK businesses: custom ERP software, high-performance website development and SEO/AEO/GEO from one dedicated team &mdash; flat &pound;1,200/month, UK GDPR compliant, data in AWS London, no long-term contract.',
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }, { lang: 'en-us', href: 'https://techauditpros.com/us/' }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }],
});

const faqs = [
  { q: 'What does TechAuditPros do for UK businesses?', a: 'Three things, from one team: custom ERP software (stock, orders, purchasing, production and finance in one system), custom website design and development on Next.js and React, and SEO with AI-search optimisation (AEO/GEO). Most UK clients start with whichever hurts most and add the others when they are ready.' },
  { q: 'How much does it cost?', a: 'A flat &pound;1,200 per month per engagement, all-in &mdash; dedicated engineer, design, development, integrations and monthly reporting, with no per-seat licences, no upfront project fee and no long-term contract. For orientation, subscription ERP for UK businesses commonly runs &pound;74&ndash;&pound;112 per user per month before implementation, and UK development agencies typically quote &pound;2,500&ndash;&pound;5,000 a month or project fees in the tens of thousands.' },
  { q: 'Where is your team based, and how does that work from the UK?', a: 'We are an India-based engineering team working for UK clients &mdash; our engineers are in Kochi, which runs 4.5 hours ahead of London in summer (BST) and 5.5 hours ahead in winter (GMT). Work you send at the end of your day is picked up the same evening and waiting when you start, and there is a live overlap window every UK morning and early afternoon for calls, Slack or Teams. You get a weekly demo and a monthly written report from a named engineer.' },
  { q: 'Do you charge UK VAT?', a: 'No. Invoices are issued from India in pounds sterling with no UK VAT added; a UK VAT-registered business accounts for the VAT itself under the reverse charge for services bought from outside the UK, and normally reclaims it in the same return. Your accountant will confirm your position, and we will supply whatever invoice wording they need.' },
  { q: 'Is our data protected under UK GDPR?', a: 'Yes. Every engagement runs under an NDA, and we sign a data processing agreement naming us as processor with you as controller. Systems are built in cloud accounts you own &mdash; AWS London (eu-west-2) or Google Cloud europe-west2 by default, so data stays in the UK &mdash; with role-based access you control and can revoke, weekly encrypted backups, and no shared credentials. UK GDPR and PECR requirements are scoped before build, not bolted on after.' },
  { q: 'Which UK cities do you work with?', a: 'All of them, remotely &mdash; London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Bristol, Liverpool, Sheffield, Cardiff, Belfast, Aberdeen and Reading and the Thames Valley included. We do not have a UK office and we say so up front: if you need someone on site, we are not the right fit.' },
  { q: 'Do you have UK clients we can speak to?', a: 'Not yet &mdash; we are open about that. Our delivered work is in the United States, Canada, Australia and the Gulf, and the numbers on this page come from those engagements. What we can do on a call is walk you through one of them in detail, including the reporting you would get, and scope your work against real data before you commit to anything. Nothing is on a long-term contract.' },
  { q: 'How do we start?', a: 'Book a free strategy call. We look at your current site, systems or search data together and tell you honestly where the leverage is &mdash; and if the answer is that you do not need us yet, we say that too.' },
];

s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to Britain.', 'UK');

const hero = `
            <p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">AI-Native Engineering Team &mdash; Serving the United Kingdom</span></p>
            <h1>An AI-Native Team for <span id="heroRotate" class="hero-rotate"><span class="hero-rotate-text">UK ERP, Web &amp; SEO.</span></span></h1>
            <p class="hero-subtitle">TechAuditPros is a dedicated AI-native technical team running custom ERP builds, website development and SEO with AI-search optimisation for UK businesses and agencies &mdash; from London and Manchester to Leeds, Bristol and the Thames Valley &mdash; at a flat &pound;1,200/month, with your data in AWS London.</p>
            <div class="hero-actions">
                <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="#services" class="btn-ghost">See the three services</a>
            </div>
            <div class="hero-features-list">
                <div class="hero-feature-item">\u{1F468}‍\u{1F4BB} Dedicated Engineer</div>
                <div class="hero-feature-item">\u{1F4C5} Monthly Plain-English Report</div>
                <div class="hero-feature-item">\u{1F512} UK GDPR &amp; AWS London</div>
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
        'UK ERP, Web &amp; SEO.',
        'Best AI Developers for Britain.',
        'Trusted ERP Partner in the UK.',
        'Full-Spectrum SEO Experts.',
        'AI-Native Web Development.'
    ], 2600, 0);`);
s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, `rotateText('heroEyebrowRotate', [
        'AI-Native Engineering Team — Serving the United Kingdom',
        '250+ Projects Delivered',
        '&pound;1,200/mo &bull; Save 57%',
        '4.9/5 Client Rating',
        'London &bull; Manchester &bull; Leeds &bull; Bristol'
    ], 3200, 1200);`);
L.must(s, 'Best AI Developers for Britain.', 1); L.must(s, 'Serving the United Kingdom', 2);

let body = '';
body += L.answer('TechAuditPros is an <strong>AI-native technical team</strong> serving UK businesses and agencies with <strong>custom ERP software</strong>, <strong>high-performance website development</strong> and <strong>SEO with AI-search optimisation (AEO/GEO)</strong> &mdash; built to rank on Google and to get cited by ChatGPT, Perplexity and AI Overviews. Flat pricing of <strong>&pound;1,200/month</strong>, one dedicated engineer and project manager on every engagement, data hosted in <strong>AWS London</strong> under UK GDPR, month to month in pounds sterling. We work from India for UK clients, and invoice with no UK VAT added.');

body += L.promise({
  h2: 'Built for UK Businesses That Are Done Juggling Suppliers',
  p: 'A developer for the website, an agency for SEO, a consultant for the system that runs the back office &mdash; three invoices, three roadmaps and nobody accountable for the whole picture. TechAuditPros puts one engineering team behind all three, so the site is built to rank, the ERP talks to the site, and one named engineer answers for the result.',
  href: '#services', cta: 'See the Three Services',
  img: 'team-standing-document-review-bright-room.jpg', alt: 'A team reviewing system documentation together in a bright meeting room', w: 2400, h: 1601,
});

body += `<section class="tap-pillars-section" id="services">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Three Disciplines, One Team</p>
            <h2>Everything a growing UK business outsources to three different suppliers, run by one accountable team.</h2>
        </div>
        <div class="pillars-grid">
            <a href="/uk/erp/" class="pillar-card">
                <span class="pillar-index">01 / ERP</span>
                <h3>Custom ERP Software</h3>
                <p>Stock, orders, purchasing, production and finance in one system of record &mdash; integrated with Xero, Sage, QuickBooks and Shopify, built around how your business actually runs, and MTD-ready where it touches VAT.</p>
                <div class="pillar-specs">
                    <div><span>Stack</span><span>Node &middot; Postgres &middot; React</span></div>
                    <div><span>First module</span><span>6&ndash;10 weeks</span></div>
                </div>
                <span class="pillar-link">Explore custom ERP for UK businesses &rarr;</span>
            </a>
            <a href="/uk/website-development/" class="pillar-card">
                <span class="pillar-index">02 / WEB</span>
                <h3>Website Design &amp; Development</h3>
                <p>Mobile-first Next.js and React builds engineered for 90+ Core Web Vitals &mdash; fast enough to rank, built to convert, and kept current every month.</p>
                <div class="pillar-specs">
                    <div><span>Stack</span><span>Next.js &middot; React</span></div>
                    <div><span>First live version</span><span>4&ndash;8 weeks</span></div>
                </div>
                <span class="pillar-link">Explore website development &rarr;</span>
            </a>
            <a href="/uk/seo-services/" class="pillar-card">
                <span class="pillar-index">03 / SEO</span>
                <h3>SEO, AEO &amp; GEO</h3>
                <p>Technical, local and content SEO plus Answer and Generative Engine Optimisation &mdash; built on real UK search data to get cited by AI, not just ranked.</p>
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
            <h2>Priced for the UK, backing businesses across four other markets too.</h2>
        </div>
        <div class="regions-grid">
            <a href="/uk/" class="region-card region-card-current">
                <span class="region-card-badge">You are here</span>
                <span class="region-flag"><img src="https://flagcdn.com/w80/gb.png" srcset="https://flagcdn.com/w160/gb.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>United Kingdom</h3>
                <span class="region-rate-amount">&pound;1,200<span class="region-rate-period">/mo</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Starting rate</span><span class="region-save">Save 57%</span></div>
            </a>
            <a href="/us/" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/us.png" srcset="https://flagcdn.com/w160/us.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>United States</h3>
                <span class="region-rate-amount">US$1,800<span class="region-rate-period">/mo</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Starting rate</span><span class="region-save">Save 60%</span></div>
            </a>
            <a href="/ca/" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/ca.png" srcset="https://flagcdn.com/w160/ca.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>Canada</h3>
                <span class="region-rate-amount">CA$1,490<span class="region-rate-period">/mo</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Starting rate</span><span class="region-save">Save 57%</span></div>
            </a>
            <a href="#contact" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/au.png" srcset="https://flagcdn.com/w160/au.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>Australia</h3>
                <span class="region-rate-amount">AU$1,600<span class="region-rate-period">/mo</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Starting rate</span><span class="region-save">Save 59%</span></div>
            </a>
            <a href="#contact" class="region-card">
                <span class="region-flag"><img src="https://flagcdn.com/w80/ae.png" srcset="https://flagcdn.com/w160/ae.png 2x" alt="" width="40" height="40" loading="lazy" /></span>
                <h3>Dubai, UAE</h3>
                <span class="region-rate-amount">AED 3,800<span class="region-rate-period">/mo</span></span>
                <div class="region-rate-row"><span class="region-rate-label">Starting rate</span><span class="region-save">Save 52%</span></div>
            </a>
        </div>
        <p class="regions-footnote">* Starting rates shown vs. average local agency pricing in each market.</p>
    </div>
</section>

<section id="compare">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Why This, Not That</p>
            <h2>Raw AI tools skip the judgment. UK agencies mark up the overhead.</h2>
        </div>
        <div class="compare-grid">
            <div class="compare-card negative">
                <h4>The usual options</h4>
                <ul>
                    <li>Generic AI-generated code with no system-level review</li>
                    <li>UK agency retainers of &pound;2,500&ndash;&pound;5,000+ a month, often on 12-month terms</li>
                    <li>Upfront project fees, then change requests billed by the hour</li>
                    <li>An account manager between you and the people doing the work</li>
                </ul>
            </div>
            <div class="compare-card positive">
                <h4>TechAuditPros</h4>
                <ul>
                    <li>A dedicated engineer + project manager, not a ticket queue</li>
                    <li>Flat &pound;1,200/month &mdash; month to month, in pounds, no UK VAT added</li>
                    <li>Every engagement starts with real technical scoping or a real audit</li>
                    <li>Monthly plain-English report; code, content and data fully yours</li>
                </ul>
            </div>
        </div>
    </div>
</section>

`;

body += L.statRow('how-it-works', 'How the UK &harr; India Model Works', 'Our afternoon is your morning &mdash; and our evening is your build window.', 'Kochi runs 4.5 hours ahead of London in summer (BST) and 5.5 hours ahead in winter (GMT). Here is what that means in practice.', [
  ['Every UK morning', 'A live overlap window for calls, Slack and Teams with your engineer'],
  ['Same evening', 'Feedback you send at the end of your day is picked up before ours ends'],
  ['Weekly', 'A demo of what shipped, on a staging site you can click through'],
  ['Monthly', 'A written report in plain English: what changed, what moved, what is next'],
], true);

body += L.promise({
  h2: 'One Team You Can Actually Reach',
  p: 'Behind every UK engagement is a small, senior team &mdash; not a rotating cast of account managers. You know your engineer by name, they know your business by heart, and the whole team stands behind every launch. That is what one accountable partner for ERP, web and SEO feels like week to week.',
  href: '#contact', cta: 'Meet Us on a Call',
  img: 'mentor-explaining-data-on-monitor-warm-office.jpg', alt: 'A TechAuditPros engineer walking a client through their reporting on screen', w: 1344, h: 1335,
});

body += `<section class="tap-numbers-section" id="results">
    <div class="container numbers-grid">
        <div class="number-stat-item"><div class="num">205%</div><div class="label">Traffic growth &mdash; Canadian appliance client, 8 months</div></div>
        <div class="number-stat-item"><div class="num">180%</div><div class="label">Traffic growth &mdash; US HVAC client, 6 months</div></div>
        <div class="number-stat-item"><div class="num">97%</div><div class="label">Client retention rate</div></div>
        <div class="number-stat-item"><div class="num">&pound;1.2K</div><div class="label">Flat monthly rate, no long-term contract</div></div>
    </div>
</section>

<section class="tap-cases-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Case Studies</p>
            <h2>Real engagements, real numbers &mdash; from our other markets.</h2>
            <p class="us-lead">We are open about this: the UK set is new, so every figure below comes from a delivered engagement in North America or Australia rather than a British client. Ask us to walk through any of them on the call, including the monthly reporting you would get.</p>
        </div>
        <div class="cases-grid">
            <div class="case-card">
                <span class="case-tag">\u{1F1E8}\u{1F1E6} Canada &middot; Appliance retailer</span>
                <h3>Organic traffic growth</h3>
                <div class="case-stat-row"><span>Traffic increase</span><strong>+205%</strong></div>
                <div class="case-stat-row"><span>Keywords ranked</span><strong>+460</strong></div>
                <div class="case-stat-row"><span>Timeframe</span><strong>8 months</strong></div>
                <a class="case-card-link" href="#contact">Ask About This Project &rarr;</a>
            </div>
            <div class="case-card">
                <span class="case-tag">\u{1F1FA}\u{1F1F8} USA &middot; HVAC business</span>
                <h3>Local rank dominance</h3>
                <div class="case-stat-row"><span>Traffic increase</span><strong>+180%</strong></div>
                <div class="case-stat-row"><span>Keywords ranked</span><strong>+320</strong></div>
                <div class="case-stat-row"><span>Timeframe</span><strong>6 months</strong></div>
                <a class="case-card-link" href="#contact">Ask About This Project &rarr;</a>
            </div>
            <div class="case-card">
                <span class="case-tag">\u{1F1E6}\u{1F1FA} Australia &middot; E-commerce</span>
                <h3>Revenue growth optimisation</h3>
                <div class="case-stat-row"><span>Traffic increase</span><strong>+165%</strong></div>
                <div class="case-stat-row"><span>Top-3 keywords</span><strong>+380</strong></div>
                <div class="case-stat-row"><span>Timeframe</span><strong>7 months</strong></div>
                <a class="case-card-link" href="#contact">Ask About This Project &rarr;</a>
            </div>
        </div>
    </div>
</section>

`;

body += L.faqHtml('uk-faq', 'FAQ', 'Working With TechAuditPros From the UK: Frequently Asked Questions', faqs);

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s Talk.', 'Takes 60 seconds &middot; GBP pricing &middot; No long-term contract');

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

// sanity: UK wiring present, no stray CA hub artefacts, honest case-study labelling kept
L.must(s, 'href="/uk/erp/"'); L.must(s, 'href="/uk/seo-services/"'); L.must(s, 'href="/uk/website-development/"');
L.must(s, 'https://techauditpros.com/ca/', 1);   // hreflang alternate only
L.must(s, '&pound;1,200'); L.must(s, 'reverse charge');
L.must(s, 'the UK set is new', 1);                // the honest case-study note must survive
L.must(s, 'Canadian businesses', 0);              // no leftover CA hub copy
L.must(s, 'US$1,800', 1); L.must(s, 'CA$1,490', 1);   // sibling region cards, one each
L.write('uk/index.html', s);
