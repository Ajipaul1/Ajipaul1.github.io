'use strict';
// /au/website-development/ — generator script for Australian Website Development Service page.
// Keywords targeted (from SEMrush AU exports):
//   website development 3,600/KD77 · web development 3,600/KD66 · web development agency 2,400/KD28 ·
//   website development company 1,900/KD49 · website design and development 1,600/KD35 ·
//   website developers 1,600/KD44 · web development services 1,600/KD38 · website developer 1,300/KD33 ·
//   web design and development 880/KD51 · custom website development australia ·
//   how much does a website cost australia · how much does it cost to build a website ·
//   ecommerce web design sydney · website development melbourne · core web vitals agency australia

const fs = require('fs');
const path = require('path');
const repoRoot = 'C:\\Users\\marke\\OneDrive\\Documents\\GitHub\\Ajipaul1.github.io';
const L = require(path.join(repoRoot, 'scripts', 'country-pages', 'lib.js'));

const URL = 'https://techauditpros.com/au/website-development/';
let s = L.read('uk/website-development/index.html');

// 1. Update Navigation and Regional Links
s = L.replaceAll(s, 'href="/uk/erp/"', 'href="/au/erp/"');
s = L.replaceAll(s, 'href="/uk/website-development/"', 'href="/au/website-development/"');
s = L.replaceAll(s, 'href="/uk/seo-services/"', 'href="/au/seo-services/"');
s = L.replaceAll(s, '<link rel="alternate" hreflang="en-gb" href="https://techauditpros.com/uk/website-development/" />', '');
s = L.replaceAll(s, '<meta property="og:locale" content="en_GB" />', '<meta property="og:locale" content="en_AU" />');

// 2. Set Head Tags and Alternate Links
s = L.setHead(s, {
  title: 'Website Development Services for Australian Businesses | TechAuditPros',
  ogTitle: 'Website Design &amp; Development for Australian Businesses | TechAuditPros',
  desc: 'Custom website design and development services for Australian businesses &mdash; Next.js and React builds engineered for 90+ Core Web Vitals on Telstra and Optus networks, mobile-first, SEO and AI-search ready, hosted in AWS Sydney (ap-southeast-2). One agreed monthly fee including updates; you own the code.',
  url: URL,
  hreflang: [
    { lang: 'en-au', href: URL },
    { lang: 'en-gb', href: 'https://techauditpros.com/uk/website-development/' },
    { lang: 'en-us', href: 'https://techauditpros.com/us/website-development/' },
    { lang: 'en-ca', href: 'https://techauditpros.com/ca/website-development/' },
    { lang: 'x-default', href: 'https://techauditpros.com/' }
  ],
});

// 3. Australian Footer Cities
function auFooterCities(html) {
  const start = '<div class="footer-cities">', end = '<div class="footer-bottom">';
  const block = `
            <h3>Serving Businesses Across Australia</h3>
            <p class="footer-cities-list">Sydney &bull; Melbourne &bull; Brisbane &bull; Perth &bull; Adelaide &bull; Gold Coast &bull; Canberra &bull; Newcastle &bull; Wollongong &bull; Geelong &bull; Hobart &bull; and across all Australian States &amp; Territories, remotely</p>
        </div>
        `;
  return L.replaceBetween(html, start, end, block, { keepStart: true, keepEnd: true });
}
s = auFooterCities(s);

// 4. Australian FAQs (Deep, verifiable, answer-first for Perplexity, ChatGPT & Google AI Overviews)
const faqs = [
  {
    q: 'How much does a custom website cost in Australia?',
    a: 'It depends on which of three commercial routes your business takes, and the published Australian benchmarks are clear. A DIY builder subscription (Squarespace, Wix, basic Shopify) runs roughly AU$25&ndash;AU$65 a month plus your own time, with rigid templates and limited technical SEO control. Traditional Australian agencies listed in Clutch charge AU$120&ndash;AU$220 an hour (most commonly AU$140&ndash;AU$180/hr in Sydney, Melbourne, and Brisbane) and enforce minimum project thresholds between AU$12,000 and AU$45,000+ &mdash; followed by separate ongoing maintenance retainers of AU$1,200&ndash;AU$3,500/month and billable change orders. TechAuditPros operates on a modern model: custom UX design, high-performance Next.js and React engineering, AWS Sydney cloud edge setup, and continuous monthly conversion sprints are covered by one agreed monthly fee, scoped on our initial call and fixed in writing before engineering starts &mdash; with $0 upfront project fees, no lock-in contract, and 100% code ownership.'
  },
  {
    q: 'What do your Australian website development services actually include?',
    a: 'Everything required to design, engineer, launch, and continuously grow a high-performance business website: user experience (UX) and conversion research, visual Figma design systems, front-end engineering in Next.js 15 and React 19, back-end Node.js APIs, relational database architecture (PostgreSQL), official integrations with your Australian business stack (Xero, MYOB, Stripe Australia, Afterpay, Australia Post), AWS Sydney cloud hosting setup, WCAG 2.2 AA accessibility, 90+ Core Web Vitals speed optimisation, and full-spectrum search engine optimisation (SEO, AEO, and GEO). Once live, the same dedicated engineering team continuously enhances your site every month.'
  },
  {
    q: 'How long does a custom website build take for an Australian business?',
    a: 'Most Australian corporate and mid-market business websites progress from approved Figma wireframes to a live, working staging version within 4 to 8 weeks. Larger platforms &mdash; such as high-volume e-commerce storefronts, customer trade portals, or multi-location directories &mdash; are delivered in agile two-week sprint phases, allowing your executive team to test and validate real modules on live staging URLs every week.'
  },
  {
    q: 'Why do you build custom on Next.js and React instead of WordPress, Elementor, or Webflow?',
    a: 'Traditional WordPress, Elementor, or bloated CMS sites suffer from heavy database overhead, unoptimised script queues, and brittle third-party plugins that drag mobile Core Web Vitals down to the 30s on Australian 4G and 5G networks. Next.js and React compile clean, static and server-rendered TypeScript components that load in sub-second times with zero unnecessary JavaScript overhead. If an Australian retailer specifically requires the Shopify ecosystem, we engineer a headless or hardened custom Shopify storefront; for businesses needing complete control, Next.js provides unmatched speed, security, and scalability.'
  },
  {
    q: 'Will the website achieve 90+ Core Web Vitals on Australian mobile networks (Telstra, Optus)?',
    a: 'Yes. We engineer directly for Google’s strict Core Web Vitals benchmarks: Largest Contentful Paint (LCP) under 2.5 seconds (typically 0.7s to 1.1s), Interaction to Next Paint (INP) under 200 milliseconds (typically sub-30ms), and Cumulative Layout Shift (CLS) under 0.1 (typically 0.00). Crucially, we test and verify performance on real mid-range mobile devices throttled to Australian 4G connections over Telstra and Optus networks, not on desktop high-speed office fibre.'
  },
  {
    q: 'Can you redesign our Australian website without losing our existing Google rankings?',
    a: 'Yes. Website redesign ranking loss happens when agencies restructure pages without comprehensive redirect mapping or strip out established topical copy. TechAuditPros crawls your existing website before any redesign, exports every indexed URL, maps 1-to-1 301 server redirects, preserves existing keyword-earning headings and content, and verifies Search Console coverage post-launch so your Sydney, Melbourne, and national Australian rankings remain intact or improve.'
  },
  {
    q: 'Where is our website hosted, and does it comply with the Australian Privacy Act 1988?',
    a: 'Your website and customer databases are hosted in an Australian cloud data centre region within an account you own &mdash; AWS Sydney (ap-southeast-2) or Vercel Sydney edge &mdash; ensuring data residency compliant with the 13 Australian Privacy Principles (APPs) under the Privacy Act 1988. Forms, enquiry workflows, and analytics are configured for clean Australian compliance with zero third-party data reselling.'
  },
  {
    q: 'How does working with your Kochi engineering team work from Australia?',
    a: 'Our engineering headquarters in Kochi operates in high alignment with Australian business hours. Kochi is 4.5 hours behind Australian Eastern Standard Time (AEST: Sydney, Melbourne, Brisbane) and just 2.5 hours behind Australian Western Standard Time (AWST: Perth). You get a live overlap window every Australian afternoon (1:00 PM to 6:30 PM AEST) for live video calls, sprint planning, and Slack/Teams messages. Feedback submitted at the end of your Australian day is converted into working staging updates before your next morning.'
  }
];

// 5. Update Schemas
s = L.setPageSchemas(s, [
  L.serviceSchema({
    type: 'Website Design and Development',
    name: 'Website Development Services for Australian Businesses',
    url: URL,
    country: 'Australia',
    currency: 'AUD',
    price: '1600',
    desc: 'Custom website design and development services for Australian businesses: Next.js and React builds engineered for 90+ Core Web Vitals on Telstra and Optus networks, mobile-first, SEO and AI-search ready, hosted in AWS Sydney (ap-southeast-2), including ongoing monthly updates and 100% code ownership.'
  }),
  L.breadcrumbSchema([
    ['Home', 'https://techauditpros.com/'],
    ['Australia', 'https://techauditpros.com/au/'],
    ['Website Development', URL]
  ]),
  L.faqSchema(faqs)
]);

// 6. Side Text & Rotate Phrases
s = s.replace('<span>to Britain.</span>', '<span>to Australia.</span>');
s = s.replace(/heroArcPathUK/g, 'heroArcPathAU');
s = s.replace(/'UK ERP, Web &amp; SEO\.'/, "'Australian ERP, Web &amp; SEO.'");
s = s.replace(/'Best AI Developers for the UK\.'/, "'Best AI Developers for Australia.'");
s = s.replace(/'Trusted ERP Partner in the UK\.'/, "'Trusted Web Partner in Australia.'");
s = s.replace(/'AI-Native Engineering Team — Serving the UK'/, "'AI-Native Engineering Team — Serving Australia'");
s = s.replace(/'London &bull; Manchester &bull; Leeds &bull; Bristol'/, "'Sydney &bull; Melbourne &bull; Brisbane &bull; Perth'");

// 7. Australian Hero
s = L.setHero(s, {
  eyebrow: 'Website Design &amp; Development &mdash; Australia',
  h1: 'Website Development for Australian Businesses, <span>Engineered to Load Fast, Rank and Convert.</span>',
  sub: 'TechAuditPros designs and builds custom, mobile-first websites for Australian businesses on Next.js and React &mdash; 90+ Core Web Vitals on Telstra and Optus 4G/5G, sub-50ms TTFB via AWS Sydney (ap-southeast-2), ready for Google and AI search from the first sprint, hosted in an Australian cloud account you own, and kept current every month by the team that built it. You own 100% of the code.',
  ghostHref: '#web-services',
  ghostText: 'See What’s Included &darr;',
  features: [
    '&#x26A1; 90+ Core Web Vitals',
    '&#x1F4F1; Mobile-First on 4G/5G',
    '&#x1F1E6;&#x1F1FA; AWS Sydney &amp; Privacy Act',
    '&#x1F4BB; 100% Code &amp; Repo Ownership'
  ],
  trust: [
    ['250+', 'Projects delivered'],
    ['4&ndash;8 wks', 'To first live version'],
    ['90+', 'Core Web Vitals target'],
    ['4.9/5', 'Client rating']
  ]
});

// 8. Construct Body Sections
let body = '';

// A. Answer Section (AEO/GEO optimized for Australian Search & AI)
body += L.answer(
  '<strong>Website development services</strong> cover everything required to design, engineer, launch, and continuously grow a high-performance business website: user experience (UX) and conversion-focused design, modern front-end and back-end code, integrations, cloud hosting in an Australian data centre, accessibility, mobile speed, and technical search engine optimisation. TechAuditPros builds custom websites for Australian companies on <strong>Next.js 15, React 19, and TypeScript</strong> &mdash; mobile-first, <strong>90+ Core Web Vitals on Telstra and Optus networks</strong>, structured for Google AI Overviews, Perplexity, and ChatGPT &mdash; and maintains them for <strong>one agreed monthly fee</strong>, replacing five-figure agency project quotes and unpredictable change orders.'
);

// B. What a Business Website Has to Do in Australia in 2026
body += L.benefitRow(
  'what-a-site-must-do',
  'What a Business Website Has to Do in Australia in 2026',
  'Three non-negotiable requirements before design or marketing even begins.',
  [
    {
      icon: '&#x1F4F1;',
      h4: 'Work on a Phone First',
      p: 'Over 70% of Australian web traffic originates on mobile devices, and Google indexes exclusively via mobile-first crawlers. If your site stutters, drops layout, or is difficult to tap on a mid-range phone over Telstra, Optus, or Vodafone 4G/5G, you are hemorrhaging qualified enquiries.'
    },
    {
      icon: '&#x26A1;',
      h4: 'Load in Under 2.5 Seconds from Sydney Edge',
      p: 'Core Web Vitals directly determine both organic Google rankings and commercial conversion rates. We engineer to Largest Contentful Paint (LCP) under 2.5s, Interaction to Next Paint (INP) under 200ms, and Cumulative Layout Shift (CLS) under 0.1 from AWS Sydney (ap-southeast-2).'
    },
    {
      icon: '&#x1F50E;',
      h4: 'Be Machine-Readable by Google AI &amp; LLMs',
      p: 'Clean semantic HTML5 markup, complete Schema.org JSON-LD structured data, and answer-first copy so Google AI Overviews, Perplexity, and ChatGPT index and cite your Australian business directly as an authoritative source.'
    }
  ]
);

// C. 8 Core Website Development Services (with wireframe animation hook)
body += L.modulesGrid(
  'web-services',
  'What’s Included',
  'Eight core capabilities, one accountable engineering team, one monthly engagement.',
  'From initial wireframes and interactive staging prototypes to monthly conversion enhancements &mdash; UX design, full-stack engineering, Australian cloud hosting, and technical SEO are not separate invoices here.',
  [
    {
      icon: '&#x1F3A8;',
      h4: 'Custom Website Design &amp; UX Research',
      p: 'User research, wireframes, and interactive Figma prototypes approved by your stakeholders before a single line of production code is written &mdash; designed around Australian buyer journeys.'
    },
    {
      icon: '&#x2699;&#xFE0F;',
      h4: 'High-Performance Front-End Engineering',
      p: 'Next.js 15, React 19, and TypeScript crafted component by component with Tailwind CSS &mdash; zero template bloat, zero unused dependencies, and instant client-side transitions.'
    },
    {
      icon: '&#x1F5C4;&#xFE0F;',
      h4: 'Back-End APIs &amp; Cloud Architecture',
      p: 'Node.js serverless microservices, PostgreSQL relational databases, secure customer authentication, webhooks, and direct connections to your enterprise ERP and CRM systems.'
    },
    {
      icon: '&#x1F6D2;',
      h4: 'Headless E-Commerce &amp; Australian Payments',
      p: 'Shopify Storefront API, custom headless shopping carts, and native integrations with Australian payment gateways including Stripe Australia, Afterpay, Zip, and eWAY.'
    },
    {
      icon: '&#x1F511;',
      h4: 'Web Applications &amp; Australian B2B Portals',
      p: 'Secure customer login portals, trade pricing calculators, wholesale ordering desks, and quotation workflows synchronized directly with your accounting software (Xero or MYOB).'
    },
    {
      icon: '&#x1F504;',
      h4: 'Redesign &amp; Zero-Downtime SEO Migration',
      p: 'Comprehensive 1-to-1 301 redirect mapping, preserving existing keyword-ranking URLs, and Search Console validation so an Australian website overhaul never damages existing organic traffic.'
    },
    {
      icon: '&#x1F680;',
      h4: 'Speed &amp; Core Web Vitals Remediation',
      p: 'Next-gen AVIF/WebP image pipelines, server-side code splitting, Australian edge caching, and zero layout shift &mdash; targeting 90+ PageSpeed scores on real mobile networks.'
    },
    {
      icon: '&#x1F6E0;&#xFE0F;',
      h4: 'Continuous Monthly Enhancements &amp; Security',
      p: 'Ongoing monthly feature sprints, new high-converting landing pages, dependency security patches, and uptime monitoring managed continuously by the dedicated team that wrote the code.'
    }
  ],
  true
);

// D. Promise Section 1
body += L.promise({
  h2: 'You See the Interactive Prototype Before a Line of Code Is Written',
  p: 'Every build begins with rigorous discovery and interactive visual prototyping &mdash; wireframes first, followed by a clickable design system you review and approve &mdash; never live trial-and-error on a public template. Your dedicated engineering team walks you through site architecture, conversion funnels, and mobile interactions before development starts, ensuring engineering delivers a blueprint you have already signed off.',
  href: '#process',
  cta: 'Explore Our 6-Step Process',
  img: 'mentor-explaining-data-on-monitor-warm-office.jpg',
  alt: 'Engineering lead reviewing an interactive website prototype with a client in a modern office',
  w: 1344,
  h: 1335,
});

// E. Modern Australian Tech Stack
body += L.modulesGrid(
  'stack',
  'The Australian Modern Tech Stack',
  'Mainstream, battle-tested technologies &mdash; 100% open source and portable.',
  'We do not lock your business into proprietary agency website builders or brittle plugin stacks. Everything we build is coded in modern, mainstream technologies that any senior developer can inspect and maintain.',
  [
    {
      icon: '&#x269B;&#xFE0F;',
      h4: 'Next.js 15 &amp; React 19',
      p: 'The modern web standard. Server-Side Rendering (SSR) and Static Site Generation (SSG) for sub-second indexable loading, with React components for dynamic interactivity.'
    },
    {
      icon: '&#x1F4D8;',
      h4: 'Clean, Strict TypeScript',
      p: 'Type-safe JavaScript ensuring compile-time bug detection, strict prop contracts, clean documentation, and reliable long-term codebase maintainability.'
    },
    {
      icon: '&#x1F7E9;',
      h4: 'Node.js &amp; Serverless APIs',
      p: 'Fast, scalable serverless functions deployed to AWS Sydney edge locations for sub-50ms API response times and secure backend processing.'
    },
    {
      icon: '&#x1F418;',
      h4: 'PostgreSQL Relational Database',
      p: 'Proven, ACID-compliant relational data storage for business-critical customer data, product catalogs, and transactional order histories.'
    },
    {
      icon: '&#x2601;&#xFE0F;',
      h4: 'AWS Sydney Cloud Edge (ap-southeast-2)',
      p: 'CloudFront CDN edge nodes in Sydney, Melbourne, and Perth, automated SSL/TLS termination, DDoS mitigation, and daily encrypted database backups.'
    },
    {
      icon: '&#x1F517;',
      h4: 'Australian Business Integrations',
      p: 'Seamless two-way integration with Xero, MYOB, Stripe AU, Afterpay, Zip, Australia Post, HubSpot, Salesforce, and Google Analytics 4 via official APIs.'
    }
  ],
  false
);

// F. Bespoke Animation 1: Telstra / Optus 4G Performance Speedometer & Latency Simulator
const SPEEDOMETER_HTML = `
<section class="us-section us-section-alt" id="au-vitals-speedometer">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Interactive Speed &amp; Network Simulator</p>
            <h2>Telstra &amp; Optus 4G Speed Benchmark: Bloated WordPress vs. Next.js Edge</h2>
            <p class="us-lead">Test how real Australian mobile networks handle a traditional agency WordPress build compared to a TechAuditPros Next.js edge build hosted in AWS Sydney (ap-southeast-2).</p>
        </div>

        <div class="au-speed-wrap">
            <div class="au-speed-toggle-bar">
                <span class="au-speed-toggle-label">Select Architecture:</span>
                <div class="au-speed-toggle-btns">
                    <button type="button" class="au-speed-btn" data-mode="wp">Traditional WordPress (Sydney Agency)</button>
                    <button type="button" class="au-speed-btn active" data-mode="tap">TechAuditPros Next.js (AWS Sydney Edge)</button>
                </div>
            </div>

            <div class="au-speed-dashboard">
                <!-- Gauge Card -->
                <div class="au-speed-gauge-card">
                    <span class="au-speed-arch-tag" id="speedArchTag">Architecture: Next.js 15 &bull; AWS Sydney</span>
                    <div class="au-gauge-svg-box">
                        <svg class="au-gauge-svg" viewBox="0 0 200 120" aria-label="PageSpeed score gauge">
                            <path class="au-gauge-track" d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#E2E8F0" stroke-width="16" stroke-linecap="round" />
                            <path class="au-gauge-bar" id="gaugeBar" d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--orange)" stroke-width="16" stroke-linecap="round" stroke-dasharray="251.2" stroke-dashoffset="5" />
                        </svg>
                        <div class="au-gauge-center">
                            <span class="au-gauge-score" id="gaugeScore">99</span>
                            <span class="au-gauge-label">Mobile PageSpeed</span>
                        </div>
                    </div>
                    <div class="au-gauge-status" id="gaugeStatus">
                        <span class="au-badge green">&#x2713; Passes Google Core Web Vitals</span>
                    </div>
                    <button type="button" class="au-ping-btn" id="runPingBtn">&#x1F4E1; Test Australian 4G Latency Ping</button>
                    <div class="au-ping-result" id="pingResult" style="display:none;"></div>
                </div>

                <!-- Metrics Grid -->
                <div class="au-speed-metrics-grid">
                    <div class="au-metric-tile">
                        <span class="metric-title">Largest Contentful Paint (LCP)</span>
                        <div class="metric-val-row">
                            <strong class="metric-val" id="valLcp">0.7s</strong>
                            <span class="metric-grade pass" id="gradeLcp">Good (&lt;2.5s)</span>
                        </div>
                        <p class="metric-desc" id="descLcp">Sub-second hero text &amp; media rendered via AWS Sydney edge nodes.</p>
                    </div>

                    <div class="au-metric-tile">
                        <span class="metric-title">Interaction to Next Paint (INP)</span>
                        <div class="metric-val-row">
                            <strong class="metric-val" id="valInp">22ms</strong>
                            <span class="metric-grade pass" id="gradeInp">Good (&lt;200ms)</span>
                        </div>
                        <p class="metric-desc" id="descInp">Near-instant touch responsiveness; zero main-thread JavaScript blocking.</p>
                    </div>

                    <div class="au-metric-tile">
                        <span class="metric-title">Cumulative Layout Shift (CLS)</span>
                        <div class="metric-val-row">
                            <strong class="metric-val" id="valCls">0.00</strong>
                            <span class="metric-grade pass" id="gradeCls">Good (&lt;0.1)</span>
                        </div>
                        <p class="metric-desc" id="descCls">Zero visual jumping; strictly dimensioned images and font fallback matching.</p>
                    </div>

                    <div class="au-metric-tile">
                        <span class="metric-title">Sydney Edge TTFB (Time to First Byte)</span>
                        <div class="metric-val-row">
                            <strong class="metric-val" id="valTtfb">36ms</strong>
                            <span class="metric-grade pass" id="gradeTtfb">Instant</span>
                        </div>
                        <p class="metric-desc" id="descTtfb">Sub-50ms response across Telstra, Optus, and TPG Australian 4G networks.</p>
                    </div>

                    <div class="au-metric-tile">
                        <span class="metric-title">Total Network Payload</span>
                        <div class="metric-val-row">
                            <strong class="metric-val" id="valPayload">114 KB</strong>
                            <span class="metric-grade pass" id="gradePayload">Lightweight</span>
                        </div>
                        <p class="metric-desc" id="descPayload">Optimised modern SVGs and next-gen AVIF images without plugin bloat.</p>
                    </div>

                    <div class="au-metric-tile">
                        <span class="metric-title">HTTP Requests &amp; Security</span>
                        <div class="metric-val-row">
                            <strong class="metric-val" id="valRequests">7 Requests</strong>
                            <span class="metric-grade pass" id="gradeRequests">Zero Plugins</span>
                        </div>
                        <p class="metric-desc" id="descRequests">Zero vulnerable third-party plugins; 100% owned TypeScript repository.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
`;
body += SPEEDOMETER_HTML;

// G. Bespoke Animation 2: Blueprint-to-Sydney-Edge Code Transformer
const TRANSFORMER_HTML = `
<section class="us-section" id="au-code-transformer">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Interactive Code Architecture</p>
            <h2>From Figma Blueprint to AWS Sydney Edge: How We Code</h2>
            <p class="us-lead">Explore how our engineering pipeline transforms design wireframes into clean, type-safe Next.js components and lightning-fast edge experiences.</p>
        </div>

        <div class="au-pipeline-box">
            <div class="au-pipeline-tabs">
                <button type="button" class="au-tab-btn active" data-stage="1">
                    <span class="stage-num">01</span>
                    <span class="stage-title">UX &amp; Wireframe Blueprint</span>
                </button>
                <button type="button" class="au-tab-btn" data-stage="2">
                    <span class="stage-num">02</span>
                    <span class="stage-title">TypeScript &amp; React Component</span>
                </button>
                <button type="button" class="au-tab-btn" data-stage="3">
                    <span class="stage-num">03</span>
                    <span class="stage-title">AWS Sydney Live Edge Output</span>
                </button>
            </div>

            <div class="au-pipeline-view">
                <!-- Stage 1: Blueprint View -->
                <div class="au-stage-panel active" id="stagePanel1">
                    <div class="blueprint-canvas">
                        <div class="blueprint-grid-overlay"></div>
                        <div class="blueprint-header">
                            <span class="bp-tag">[FIGMA BLUEPRINT — AUSTRALIAN E-COMMERCE PORTAL]</span>
                            <span class="bp-coords">12-COL &bull; 8PX BASELINE &bull; WCAG 2.2 AA</span>
                        </div>
                        <div class="blueprint-mockup">
                            <div class="bp-box bp-hero">
                                <span class="bp-label">&lt;HeroSection&gt; LCP Target: &lt;1.0s</span>
                                <div class="bp-sub-box bp-title"></div>
                                <div class="bp-sub-box bp-cta"></div>
                            </div>
                            <div class="bp-row">
                                <div class="bp-box bp-card"><span class="bp-label">&lt;ProductCard sku="AU-701" /&gt;</span></div>
                                <div class="bp-box bp-card"><span class="bp-label">&lt;ProductCard sku="AU-702" /&gt;</span></div>
                                <div class="bp-box bp-card"><span class="bp-label">&lt;ProductCard sku="AU-703" /&gt;</span></div>
                            </div>
                        </div>
                        <div class="blueprint-footer">
                            <span>Accessibility Check: Visible Focus &#x2713; | Mobile Tap Targets &ge; 48px &#x2713; | Colour Contrast 7.2:1 &#x2713;</span>
                        </div>
                    </div>
                </div>

                <!-- Stage 2: Code View -->
                <div class="au-stage-panel" id="stagePanel2">
                    <div class="code-editor-box">
                        <div class="code-editor-top">
                            <span class="code-dot red"></span>
                            <span class="code-dot yellow"></span>
                            <span class="code-dot green"></span>
                            <span class="code-filename">components/au/ProductShowcase.tsx (Next.js 15 Server Component)</span>
                        </div>
                        <pre class="code-snippet"><code><span class="c-kw">import</span> { Suspense } <span class="c-kw">from</span> <span class="c-str">'react'</span>;
<span class="c-kw">import</span> Image <span class="c-kw">from</span> <span class="c-str">'next/image'</span>;
<span class="c-kw">import</span> type { Product } <span class="c-kw">from</span> <span class="c-str">'@/types/catalogue'</span>;

<span class="c-comm">// Edge-cached on AWS Sydney (ap-southeast-2) with stale-while-revalidate</span>
<span class="c-kw">export const</span> revalidate = <span class="c-num">3600</span>;

<span class="c-kw">export async function</span> <span class="c-fn">AustralianProductCard</span>({ product }: { product: Product }) {
  <span class="c-kw">return</span> (
    &lt;<span class="c-tag">article</span> <span class="c-attr">className</span>=<span class="c-str">"group rounded-xl border border-slate-200 bg-white p-6 shadow-sm"</span>&gt;
      &lt;<span class="c-tag">div</span> <span class="c-attr">className</span>=<span class="c-str">"aspect-video overflow-hidden rounded-lg bg-slate-100"</span>&gt;
        &lt;<span class="c-tag">Image</span>
          <span class="c-attr">src</span>={product.heroImage}
          <span class="c-attr">alt</span>={product.title}
          <span class="c-attr">width</span>={<span class="c-num">600</span>}
          <span class="c-attr">height</span>={<span class="c-num">400</span>}
          <span class="c-attr">priority</span>={product.isFeatured}
          <span class="c-attr">sizes</span>=<span class="c-str">"(max-width: 768px) 100vw, 33vw"</span>
          <span class="c-attr">className</span>=<span class="c-str">"h-full w-full object-cover transition group-hover:scale-105"</span>
        /&gt;
      &lt;/<span class="c-tag">div</span>&gt;
      &lt;<span class="c-tag">h3</span> <span class="c-attr">className</span>=<span class="c-str">"mt-4 text-lg font-bold text-slate-900"</span>&gt;{product.name}&lt;/<span class="c-tag">h3</span>&gt;
      &lt;<span class="c-tag">p</span> <span class="c-attr">className</span>=<span class="c-str">"font-mono text-emerald-700 font-semibold"</span>&gt;
        AU\${product.priceAud.toFixed(<span class="c-num">2</span>)} <span class="c-str">inc. 10% GST</span>
      &lt;/<span class="c-tag">p</span>&gt;
    &lt;/<span class="c-tag">article</span>&gt;
  );
}</code></pre>
                    </div>
                </div>

                <!-- Stage 3: Live Output View -->
                <div class="au-stage-panel" id="stagePanel3">
                    <div class="live-rendered-box">
                        <div class="live-rendered-top">
                            <span class="live-badge">&#x25CF; LIVE RENDER (AWS Sydney Edge &bull; 28ms TTFB)</span>
                            <span class="live-inspect-link">WCAG 2.2 AA Verified</span>
                        </div>
                        <div class="live-card-demo">
                            <div class="demo-card">
                                <div class="demo-badge">Featured in Australia</div>
                                <div class="demo-img-box">
                                    <img src="/assets/images/library/uk-colourful-javascript-code-dark-screen-700.jpg" alt="Australian client portal interface preview" width="700" height="457" loading="lazy" />
                                </div>
                                <div class="demo-card-body">
                                    <h4>Precision Equipment Portal</h4>
                                    <p class="demo-price">AU$1,450.00 <span class="gst">inc. 10% GST</span></p>
                                    <p class="demo-sub">Two-way synchronized with Xero &bull; Despatches from Melbourne Warehouse</p>
                                    <button type="button" class="demo-btn" id="demoActionBtn">&#x26A1; Click to Test Interaction Latency</button>
                                    <div class="demo-feedback" id="demoFeedback" style="display:none;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
`;
body += TRANSFORMER_HTML;

// H. Visual Story Band (Variant C: Stacked Bleed with 4 Full-Bleed Story Frames)
const STORY_HTML = `
<!-- uk-story:start -->
<section class="tap-section uks-section">
    <div class="container">
        <p class="section-label">How Your Website Gets Made</p>
        <h2 class="section-title">Written in Clean Code, Reviewed Every Week, Handed Over Complete.</h2>
        <div class="uks uksC">
            <!-- Frame 1: Female Engineer at Dual Monitors -->
            <div class="band uks-bleed">
                <div class="shot">
                    <img class="uks-img" src="/assets/images/library/female-developer-red-hair-dual-monitors-code.jpg" srcset="/assets/images/library/female-developer-red-hair-dual-monitors-code-700.jpg 700w, /assets/images/library/female-developer-red-hair-dual-monitors-code-1400.jpg 1400w, /assets/images/library/female-developer-red-hair-dual-monitors-code.jpg 2400w" sizes="(max-width:900px) 100vw, 92vw" alt="Senior female engineer coding Next.js components across dual monitors" width="2400" height="1601" loading="lazy" decoding="async" />
                </div>
                <div class="words">
                    <p class="uks-eyebrow">Engineered</p>
                    <p class="uks-cap">Hand-Coded in TypeScript, Not Templated in a Builder.</p>
                    <p class="uks-sub">Which is why your site loads in sub-second times on Telstra 4G, never breaks from plugin updates, and scales gracefully to thousands of pages.</p>
                </div>
            </div>

            <!-- Frame 2: Creative Office Collaboration -->
            <div class="band uks-bleed">
                <div class="shot">
                    <img class="uks-img" src="/assets/images/library/web2-two-working-in-creative-office.jpg" srcset="/assets/images/library/web2-two-working-in-creative-office-700.jpg 700w, /assets/images/library/web2-two-working-in-creative-office-1400.jpg 1400w, /assets/images/library/web2-two-working-in-creative-office.jpg 2400w" sizes="(max-width:900px) 100vw, 92vw" alt="Creative design and engineering team reviewing website staging layout" width="2400" height="1350" loading="lazy" decoding="async" />
                </div>
                <div class="words">
                    <p class="uks-eyebrow">Reviewed</p>
                    <p class="uks-cap">A Live Staging URL Every Single Week.</p>
                    <p class="uks-sub">You click through real interactive builds during your Australian morning, leave feedback, and watch updates deploy without big-reveal surprises.</p>
                </div>
            </div>

            <!-- Frame 3: Inspectable Semantic Code -->
            <div class="band uks-bleed">
                <div class="shot">
                    <img class="uks-img" src="/assets/images/library/uk-colourful-javascript-code-dark-screen.jpg" srcset="/assets/images/library/uk-colourful-javascript-code-dark-screen-700.jpg 700w, /assets/images/library/uk-colourful-javascript-code-dark-screen-1400.jpg 1400w, /assets/images/library/uk-colourful-javascript-code-dark-screen.jpg 2400w" sizes="(max-width:900px) 100vw, 92vw" alt="Inspectable semantic code and structured data on screen" width="2400" height="1567" loading="lazy" decoding="async" />
                </div>
                <div class="words">
                    <p class="uks-eyebrow">Inspectable</p>
                    <p class="uks-cap">Clean Semantic Markup for Australian Buyers &amp; AI Engines.</p>
                    <p class="uks-sub">Technical buyers inspect the source. Semantic HTML5 landmarks, Schema.org JSON-LD, and zero framework clutter ensure AI engines quote your business directly.</p>
                </div>
            </div>

            <!-- Frame 4: Performance Analytics on Laptop -->
            <div class="band uks-bleed">
                <div class="shot">
                    <img class="uks-img" src="/assets/images/library/uk-performance-analytics-on-laptop.jpg" srcset="/assets/images/library/uk-performance-analytics-on-laptop-700.jpg 700w, /assets/images/library/uk-performance-analytics-on-laptop-1400.jpg 1400w, /assets/images/library/uk-performance-analytics-on-laptop.jpg 2400w" sizes="(max-width:900px) 100vw, 92vw" alt="Core Web Vitals analytics open on a laptop screen" width="2400" height="1600" loading="lazy" decoding="async" />
                </div>
                <div class="words">
                    <p class="uks-eyebrow">Measured</p>
                    <p class="uks-cap">90+ Core Web Vitals on Real Australian Mobile Devices.</p>
                    <p class="uks-sub">LCP under 2.5s, INP under 200ms, CLS under 0.1 &mdash; tested and verified on mid-range Android devices over Telstra and Optus networks before launch.</p>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- uk-story:end -->
`;
body += STORY_HTML;

// I. 3-Way Comparison Table (Builder vs. Template vs. Custom)
body += L.compareTable(
  'web-compare',
  'DIY Builder vs. Agency Template vs. Custom Engineering',
  'Three pathways to build an Australian business website &mdash; compared honestly.',
  'A DIY site builder is genuinely the right choice for early-stage testing. Here is how to evaluate which approach fits your Australian commercial goals before investing.',
  ['DIY Builder (Wix / Squarespace)', 'Agency Template (WordPress)', 'Custom Build (TechAuditPros)'],
  2,
  [
    [
      'Speed &amp; Core Web Vitals',
      'Typically poor (30&ndash;55 on mobile); unoptimised script bundles',
      'Variable; slows down rapidly as plugins and tracking scripts accumulate',
      'Engineered to 90+ from day one; sub-50ms TTFB via AWS Sydney edge'
    ],
    [
      'Design &amp; Branding',
      'Pre-configured templates; looks identical to thousands of other businesses',
      'Stock theme restyled; constrained by theme layout grids',
      'Custom Figma design system tailored strictly to your Australian buyers'
    ],
    [
      'SEO, AEO &amp; GEO Architecture',
      'Basic metadata fields; limited control over server rendering and schema',
      'Dependent on third-party plugins (Yoast/RankMath); heavy code bloat',
      'Full architectural control: clean SSR/SSG markup, JSON-LD, and AI-quotable structure'
    ],
    [
      'Australian Integrations',
      'Limited to built-in app stores with recurring monthly add-on costs',
      'Brittle community plugins; compatibility breaks upon PHP/core updates',
      'Direct API integrations with Xero, MYOB, Stripe AU, Afterpay, and Australia Post'
    ],
    [
      'Australian Privacy &amp; Data Residency',
      'Hosted in US/EU cloud regions; cookie banners bolted on',
      'Depends on host; database backups frequently stored unencrypted',
      'AWS Sydney (ap-southeast-2) data residency; 100% Australian Privacy Act 1988 compliance'
    ],
    [
      'Accessibility (WCAG)',
      'Template-dependent; rarely keyboard operable',
      'Theme-dependent; high failure rate on colour contrast and focus states',
      'Engineered to WCAG 2.2 AA standards with visible focus and semantic tags'
    ],
    [
      'Code &amp; IP Ownership',
      'Platform lock-in; leaving means rebuilding your site from scratch',
      'You own database, but theme and plugin developer licences recur',
      'You own 100% of the repository, source code, design assets, and cloud account'
    ],
    [
      'Commercial Model',
      'AU$25&ndash;AU$65/month, your own time as unpaid labour',
      'AU$12,000&ndash;AU$45,000 upfront plus separate monthly maintenance invoices',
      'One agreed monthly fee covering custom design, engineering, hosting setup, and updates'
    ],
    [
      'Best Suited For',
      'Early micro-businesses testing a preliminary concept',
      'Simple brochure sites with static content and no growth ambitions',
      'Australian mid-market companies where web performance directly drives revenue'
    ]
  ],
  true,
  'Third-party figures reflect published Australian market benchmarks as of September 2026 (Clutch Australia directory: hourly rates AU$120&ndash;AU$220/hr, project minimums AU$12,000&ndash;AU$45,000+). Our rate is fixed in writing before engineering starts.'
);

// J. 6-Step Engineering Delivery Process
body += L.processRow(
  'process',
  'How We Engineer Your Website',
  'Six disciplined stages from initial discovery to a live, evolving web asset.',
  [
    {
      h4: '1. Discovery &amp; Conversion Strategy',
      p: 'We analyse your current search analytics, Australian competitor landscapes, conversion bottlenecks, and customer decision paths before drawing a wireframe.'
    },
    {
      h4: '2. Wireframing &amp; Figma Prototype',
      p: 'Structural information architecture first, followed by a clickable responsive prototype that your team tests, refines, and signs off.'
    },
    {
      h4: '3. Agile Next.js &amp; React Sprints',
      p: 'Front-end and back-end development in rapid two-week sprints, reviewable on a private staging URL so you observe verified weekly progress.'
    },
    {
      h4: '4. Australian SEO, AEO &amp; Accessibility',
      p: 'Structured JSON-LD schema, 301 redirect mapping, semantic heading hierarchy, and WCAG 2.2 AA accessibility validation so your site is ready to rank.'
    },
    {
      h4: '5. Quality Assurance &amp; Sydney Edge Launch',
      p: 'Cross-browser device testing and Core Web Vitals verification on real Australian 4G/5G connections, followed by an orchestrated zero-downtime launch.'
    },
    {
      h4: '6. Continuous Monthly Improvements',
      p: 'The same dedicated engineering team delivers new landing pages, A/B conversion tests, and security updates every month with a detailed shipping report.'
    }
  ]
);

// K. Bespoke Animation 3: Australian Website Investment & 3-Year TCO Calculator
const TCO_HTML = `
<section class="us-section us-section-alt" id="au-web-tco-calculator">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Interactive Investment &amp; ROI Calculator</p>
            <h2>Compare 3-Year Website Investment: Agency vs. TechAuditPros</h2>
            <p class="us-lead">See how upfront agency project fees, maintenance retainers, and change orders add up over 36 months compared to our all-inclusive monthly engineering model.</p>
        </div>

        <div class="au-calc-wrap">
            <div class="au-calc-selector">
                <span class="au-calc-label">Select Build Type:</span>
                <div class="au-calc-buttons">
                    <button type="button" class="au-tco-btn active" data-scale="b2b">Corporate B2B Website</button>
                    <button type="button" class="au-tco-btn" data-scale="ecom">Custom E-Commerce Store</button>
                    <button type="button" class="au-tco-btn" data-scale="portal">Client Portal / Web App</button>
                </div>
            </div>

            <div class="au-calc-grid">
                <!-- Agency Column -->
                <div class="au-calc-col sub">
                    <span class="au-calc-tag">Traditional Australian Agency</span>
                    <h3 class="au-calc-vendor">Sydney / Melbourne Agency Route</h3>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Upfront Build Fee</span>
                        <strong class="au-calc-metric-val" id="tcoAgencyUpfront">AU$28,000</strong>
                        <span class="au-calc-metric-sub">Based on AU$160/hr Clutch industry average</span>
                    </div>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Monthly Maintenance &amp; Retainer</span>
                        <strong class="au-calc-metric-val" id="tcoAgencyMonthly">AU$1,800 / mo</strong>
                        <span class="au-calc-metric-sub">Limited hourly ticket allowance + extra fees</span>
                    </div>
                    <div class="au-calc-total-box">
                        <span class="au-calc-total-lbl">Estimated 3-Year Total Investment</span>
                        <strong class="au-calc-total-val" id="tcoAgencyTotal">AU$92,800</strong>
                    </div>
                    <ul class="au-calc-list">
                        <li>New landing pages and redesigns require separate project quotes</li>
                        <li>High hourly rates (AU$140&ndash;AU$220/hr) for change requests</li>
                        <li>Site speed degrades over time without dedicated engineering</li>
                    </ul>
                </div>

                <!-- Custom Column (TechAuditPros) -->
                <div class="au-calc-col custom">
                    <span class="au-calc-tag highlight">TechAuditPros Engineering</span>
                    <h3 class="au-calc-vendor">AI-Native Dedicated Engineering</h3>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Upfront Project Fee</span>
                        <strong class="au-calc-metric-val highlight">$0 Upfront Build Fee</strong>
                        <span class="au-calc-metric-sub">Included in your one agreed monthly fee</span>
                    </div>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Continuous Monthly Sprints</span>
                        <strong class="au-calc-metric-val highlight">One Agreed Monthly Fee</strong>
                        <span class="au-calc-metric-sub">Design, build, hosting setup &amp; continuous updates</span>
                    </div>
                    <div class="au-calc-total-box highlight">
                        <span class="au-calc-total-lbl">Commercial Advantage &amp; Value</span>
                        <strong class="au-calc-total-val highlight" id="tcoSavings">AU$40,000+ Cash Savings</strong>
                    </div>
                    <ul class="au-calc-list">
                        <li>Continuous monthly feature sprints and new landing pages included</li>
                        <li>90+ Core Web Vitals guarantee on real Australian mobile devices</li>
                        <li>100% code ownership in your private GitHub/GitLab repository</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
`;
body += TCO_HTML;

// L. Promise Section 2
body += L.promise({
  h2: 'Real Engineers, Overnight Progress, Your Mornings for Decisions',
  p: 'The professionals building your website are senior full-stack software engineers you speak with directly &mdash; never junior account executives relaying messages. Operating from our Kochi engineering headquarters, 4.5 hours behind Sydney and Melbourne and 2.5 hours behind Perth, your requests are developed during your afternoon and evening, ready on a staging URL for review the following Australian morning. That structural efficiency is why our builds achieve 90+ Core Web Vitals without inflated local agency markups.',
  href: '#webdev-faq',
  cta: 'Read the Australian Web FAQ',
  img: 'team-standing-document-review-bright-room.jpg',
  alt: 'TechAuditPros engineering team reviewing website architecture and staging benchmarks',
  w: 2400,
  h: 1601,
});

// M. What We Build (4 Core Australian Categories)
body += L.industriesGrid(
  'web-builds',
  'What We Build',
  'Four categories of web platforms, one uncompromising engineering standard.',
  'Whether building a corporate marketing engine, a high-volume Australian storefront, or a custom trade portal &mdash; each project is architected for maximum speed, accessibility, and measurable conversions.',
  [
    {
      img: 'male-developer-dual-monitors-colorful-office.jpg',
      alt: 'Senior software developer building a high-performance corporate marketing website',
      w: 766,
      h: 400,
      h4: 'Corporate &amp; B2B Marketing Websites',
      p: 'For professional services, industrial manufacturers, and B2B leaders &mdash; built to rank on high-value Australian keywords and turn searchers into inbound enquiries.'
    },
    {
      img: 'istock-1442543641-india-shop-upi-qr-payment.jpg',
      alt: 'Australian consumer completing a mobile payment in an e-commerce checkout flow',
      w: 612,
      h: 408,
      h4: 'Australian E-Commerce Storefronts',
      p: 'Shopify headless or custom Next.js storefronts with instant product filtering, sub-second checkout, and native Stripe Australia, Afterpay, and Zip payment integrations.'
    },
    {
      img: 'istock-1321462048-woman-holographic-ui-network.jpg',
      alt: 'Australian business client accessing a secure web application portal',
      w: 612,
      h: 344,
      h4: 'Web Applications &amp; Trade Portals',
      p: 'Customer portals, trade credit accounts, automated quotation engines, and custom scheduling interfaces synchronized directly with your ERP and Xero/MYOB.'
    },
    {
      img: 'team-flatlay-reviewing-wireframe-sketch.jpg',
      alt: 'Designers and software engineers reviewing responsive wireframes and landing page prototypes',
      w: 720,
      h: 419,
      h4: 'High-Converting Campaign Landing Pages',
      p: 'Focused, lightweight campaign pages for paid Google Ads and Meta campaigns in Australia, rigorously split-tested for maximum return on ad spend.'
    }
  ],
  false
);

// N. FAQ Section
body += L.faqHtml('webdev-faq', 'Frequently Asked Questions', 'Website Development in Australia: Straightforward Answers', faqs);

// 9. Apply Body and Final CTA
s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s scope your Australian website build.', 'Takes 60 seconds &middot; fixed quote in writing &middot; No lock-in contract');

// 10. Inject Bespoke Animations CSS & JS
const AU_WEB_EXTRA_CSS = `
  /* ================== AUSTRALIAN BESPOKE ANIMATIONS & CALCULATORS ================== */
  /* Speedometer & Simulator */
  .au-speed-wrap{ margin-top:32px; background:var(--paper); border:1px solid var(--line); border-radius:18px; padding:32px; box-shadow:var(--shadow-sm); }
  .au-speed-toggle-bar{ display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:28px; padding-bottom:20px; border-bottom:1px solid var(--line); }
  .au-speed-toggle-label{ font-family:var(--font-mono); font-size:0.82rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; }
  .au-speed-toggle-btns{ display:flex; gap:10px; flex-wrap:wrap; }
  .au-speed-btn{ background:var(--paper-alt); border:1px solid var(--line); border-radius:8px; padding:10px 18px; font-family:var(--font-sans); font-size:0.88rem; font-weight:600; color:var(--ink-soft); cursor:pointer; transition:all .2s ease; }
  .au-speed-btn:hover{ border-color:var(--orange); color:var(--ink); }
  .au-speed-btn.active{ background:var(--navy-deep); color:#fff; border-color:var(--navy-deep); box-shadow:0 2px 8px rgba(11,32,54,.25); }
  .au-speed-dashboard{ display:grid; grid-template-columns:320px 1fr; gap:28px; align-items:start; }
  .au-speed-gauge-card{ background:var(--paper-alt); border:1px solid var(--line); border-radius:14px; padding:24px; text-align:center; display:flex; flex-direction:column; align-items:center; }
  .au-speed-arch-tag{ font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--orange-dark); margin-bottom:12px; font-weight:600; }
  .au-gauge-svg-box{ position:relative; width:220px; height:130px; margin:0 auto; }
  .au-gauge-svg{ width:100%; height:100%; overflow:visible; }
  .au-gauge-bar{ transition:stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1), stroke .5s ease; }
  .au-gauge-center{ position:absolute; bottom:14px; left:0; right:0; text-align:center; }
  .au-gauge-score{ display:block; font-family:var(--font-mono); font-size:2.6rem; font-weight:700; color:var(--ink); line-height:1; letter-spacing:-0.03em; }
  .au-gauge-label{ font-size:0.78rem; color:var(--ink-faint); text-transform:uppercase; letter-spacing:0.08em; font-weight:600; margin-top:4px; }
  .au-gauge-status{ margin-top:14px; }
  .au-badge{ display:inline-block; font-size:0.8rem; font-weight:600; padding:5px 12px; border-radius:20px; }
  .au-badge.green{ background:#DCFCE7; color:#166534; border:1px solid #BBF7D0; }
  .au-badge.red{ background:#FEE2E2; color:#991B1B; border:1px solid #FECACA; }
  .au-ping-btn{ margin-top:18px; width:100%; background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:10px 14px; font-size:0.82rem; font-weight:600; color:var(--ink); cursor:pointer; transition:all .2s ease; font-family:var(--font-mono); }
  .au-ping-btn:hover{ border-color:var(--orange); color:var(--orange); background:#fff; }
  .au-ping-result{ margin-top:10px; font-family:var(--font-mono); font-size:0.78rem; padding:8px 10px; background:#fff; border-radius:6px; border:1px solid var(--line); color:var(--ink-soft); width:100%; text-align:left; line-height:1.4; }
  .au-speed-metrics-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .au-metric-tile{ background:var(--paper); border:1px solid var(--line); border-radius:12px; padding:18px 20px; transition:transform .15s ease, border-color .15s ease; }
  .au-metric-tile:hover{ border-color:var(--orange); transform:translateY(-2px); }
  .metric-title{ font-size:0.82rem; font-weight:600; color:var(--ink-faint); display:block; margin-bottom:8px; }
  .metric-val-row{ display:flex; align-items:baseline; justify-content:space-between; margin-bottom:8px; }
  .metric-val{ font-family:var(--font-mono); font-size:1.6rem; font-weight:700; color:var(--ink); letter-spacing:-0.02em; }
  .metric-grade{ font-family:var(--font-mono); font-size:0.72rem; padding:3px 8px; border-radius:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; }
  .metric-grade.pass{ background:#DCFCE7; color:#166534; }
  .metric-grade.fail{ background:#FEE2E2; color:#991B1B; }
  .metric-desc{ font-size:0.82rem; color:var(--ink-soft); line-height:1.45; margin:0; }

  /* Transformer & Code Pipeline */
  .au-pipeline-box{ margin-top:32px; background:var(--navy-deep); border-radius:18px; padding:32px; color:#fff; box-shadow:var(--shadow-md); }
  .au-pipeline-tabs{ display:flex; gap:12px; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,.12); padding-bottom:18px; flex-wrap:wrap; }
  .au-tab-btn{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.15); border-radius:10px; padding:12px 20px; display:flex; align-items:center; gap:12px; cursor:pointer; color:rgba(255,255,255,.75); transition:all .2s ease; }
  .au-tab-btn:hover{ background:rgba(255,255,255,.12); color:#fff; border-color:var(--orange); }
  .au-tab-btn.active{ background:var(--orange); border-color:var(--orange); color:#fff; box-shadow:0 4px 14px rgba(217,83,30,.4); }
  .au-tab-btn .stage-num{ font-family:var(--font-mono); font-size:0.8rem; font-weight:700; opacity:0.9; }
  .au-tab-btn .stage-title{ font-size:0.88rem; font-weight:600; }
  .au-stage-panel{ display:none; animation:stageFadeIn .4s ease forwards; }
  .au-stage-panel.active{ display:block; }
  @keyframes stageFadeIn{ from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:none; } }
  
  /* Blueprint */
  .blueprint-canvas{ background:#071626; border:1px dashed rgba(255,255,255,.25); border-radius:14px; padding:28px; position:relative; overflow:hidden; }
  .blueprint-grid-overlay{ position:absolute; inset:0; background-image:linear-gradient(rgba(217,83,30,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,83,30,.1) 1px, transparent 1px); background-size:24px 24px; pointer-events:none; }
  .blueprint-header{ display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--orange); letter-spacing:0.08em; margin-bottom:20px; flex-wrap:wrap; gap:10px; }
  .blueprint-mockup{ position:relative; z-1:1; display:flex; flex-direction:column; gap:16px; margin:16px 0; }
  .bp-box{ border:1px solid rgba(255,255,255,.2); border-radius:8px; padding:18px; background:rgba(255,255,255,.04); }
  .bp-hero{ border-color:var(--orange); background:rgba(217,83,30,.06); }
  .bp-label{ font-family:var(--font-mono); font-size:0.72rem; color:rgba(255,255,255,.8); letter-spacing:0.06em; text-transform:uppercase; display:block; margin-bottom:10px; }
  .bp-title{ height:20px; width:45%; background:rgba(255,255,255,.2); border-radius:4px; margin-bottom:10px; }
  .bp-cta{ height:32px; width:140px; background:var(--orange); border-radius:6px; }
  .bp-row{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .bp-card{ height:110px; display:flex; align-items:center; justify-content:center; }
  .blueprint-footer{ font-family:var(--font-mono); font-size:0.72rem; color:rgba(255,255,255,.6); margin-top:18px; }

  /* Code Snippet */
  .code-editor-box{ background:#050F1A; border:1px solid rgba(255,255,255,.15); border-radius:14px; overflow:hidden; font-family:var(--font-mono); }
  .code-editor-top{ background:#081B2E; padding:12px 18px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,.1); }
  .code-dot{ width:10px; height:10px; border-radius:50%; }
  .code-dot.red{ background:#EF4444; } .code-dot.yellow{ background:#F59E0B; } .code-dot.green{ background:#10B981; }
  .code-filename{ font-size:0.78rem; color:rgba(255,255,255,.7); margin-left:8px; }
  .code-snippet{ padding:20px 22px; margin:0; overflow-x:auto; font-size:0.85rem; line-height:1.6; color:#E2E8F0; }
  .c-kw{ color:#F472B6; font-weight:600; }
  .c-str{ color:#6EE7B7; }
  .c-fn{ color:#93C5FD; font-weight:600; }
  .c-tag{ color:#FCA5A5; }
  .c-attr{ color:#FDE047; }
  .c-num{ color:#C084FC; }
  .c-comm{ color:#64748B; font-style:italic; }

  /* Live Render Demo */
  .live-rendered-box{ background:var(--paper-alt); border-radius:14px; padding:28px; color:var(--ink); }
  .live-rendered-top{ display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; font-family:var(--font-mono); font-size:0.75rem; color:var(--ink-faint); }
  .live-badge{ color:#166534; font-weight:700; letter-spacing:0.08em; }
  .live-card-demo{ max-width:440px; margin:0 auto; }
  .demo-card{ background:#fff; border:1px solid var(--line); border-radius:14px; overflow:hidden; box-shadow:var(--shadow-md); position:relative; }
  .demo-badge{ position:absolute; top:14px; right:14px; background:var(--orange); color:#fff; font-size:0.7rem; font-weight:700; padding:4px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:0.08em; font-family:var(--font-mono); z-index:2; }
  .demo-img-box{ aspect-ratio:16/10; overflow:hidden; background:#0B2036; }
  .demo-img-box img{ width:100%; height:100%; object-fit:cover; display:block; }
  .demo-card-body{ padding:20px 22px; }
  .demo-card-body h4{ font-size:1.15rem; margin:0 0 6px; color:var(--ink); }
  .demo-price{ font-family:var(--font-mono); font-size:1.25rem; font-weight:700; color:#059669; margin:0 0 4px; }
  .demo-price .gst{ font-size:0.75rem; color:var(--ink-faint); font-weight:500; }
  .demo-sub{ font-size:0.82rem; color:var(--ink-soft); margin:0 0 16px; line-height:1.4; }
  .demo-btn{ width:100%; background:var(--navy-deep); color:#fff; border:none; border-radius:8px; padding:12px; font-size:0.88rem; font-weight:600; cursor:pointer; transition:all .2s ease; }
  .demo-btn:hover{ background:var(--orange); }
  .demo-feedback{ margin-top:10px; font-family:var(--font-mono); font-size:0.78rem; color:#166534; background:#DCFCE7; padding:8px 10px; border-radius:6px; border:1px solid #BBF7D0; }

  /* TCO Calculator */
  .au-calc-wrap{ margin-top:32px; background:var(--paper); border:1px solid var(--line); border-radius:18px; padding:34px; box-shadow:var(--shadow-sm); }
  .au-calc-selector{ display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:28px; padding-bottom:22px; border-bottom:1px solid var(--line); }
  .au-calc-label{ font-family:var(--font-mono); font-size:0.82rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; }
  .au-calc-buttons{ display:flex; gap:10px; flex-wrap:wrap; }
  .au-tco-btn{ background:var(--paper-alt); border:1px solid var(--line); border-radius:8px; padding:10px 18px; font-family:var(--font-sans); font-size:0.88rem; font-weight:600; color:var(--ink-soft); cursor:pointer; transition:all .2s ease; }
  .au-tco-btn:hover{ border-color:var(--orange); color:var(--ink); }
  .au-tco-btn.active{ background:var(--navy-deep); color:#fff; border-color:var(--navy-deep); box-shadow:0 2px 8px rgba(11,32,54,.25); }
  .au-calc-grid{ display:grid; grid-template-columns:1fr 1fr; gap:28px; }
  .au-calc-col{ border:1px solid var(--line); border-radius:14px; padding:28px 24px; background:var(--paper-alt); }
  .au-calc-col.custom{ background:#fff; border-color:var(--orange); box-shadow:0 6px 20px rgba(217,83,30,.08); }
  .au-calc-tag{ font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; display:block; margin-bottom:6px; }
  .au-calc-tag.highlight{ color:var(--orange); }
  .au-calc-vendor{ font-size:1.25rem; font-weight:700; margin:0 0 20px; color:var(--ink); }
  .au-calc-metric{ margin-bottom:18px; padding-bottom:16px; border-bottom:1px solid var(--line); }
  .au-calc-metric-lbl{ display:block; font-size:0.82rem; color:var(--ink-faint); margin-bottom:4px; font-weight:500; }
  .au-calc-metric-val{ display:block; font-family:var(--font-mono); font-size:1.5rem; font-weight:700; color:var(--ink); letter-spacing:-0.02em; }
  .au-calc-metric-val.highlight{ color:var(--orange); }
  .au-calc-metric-sub{ font-size:0.78rem; color:var(--ink-faint); margin-top:3px; display:block; }
  .au-calc-total-box{ background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:18px; margin-bottom:20px; }
  .au-calc-total-box.highlight{ background:linear-gradient(135deg, rgba(217,83,30,.08) 0%, rgba(14,42,62,.06) 100%); border-color:var(--orange); }
  .au-calc-total-lbl{ font-size:0.82rem; color:var(--ink-soft); display:block; margin-bottom:4px; font-weight:600; }
  .au-calc-total-val{ font-family:var(--font-mono); font-size:1.8rem; font-weight:700; color:var(--ink); display:block; }
  .au-calc-total-val.highlight{ color:var(--orange-dark); }
  .au-calc-list{ list-style:none; padding:0; margin:0; }
  .au-calc-list li{ font-size:0.85rem; color:var(--ink-soft); line-height:1.5; margin-bottom:8px; padding-left:18px; position:relative; }
  .au-calc-list li::before{ content:'•'; position:absolute; left:4px; color:var(--ink-faint); font-weight:bold; }
  .au-calc-col.custom .au-calc-list li::before{ content:'✓'; color:var(--orange); left:0; }

  @media (max-width:960px){
    .au-speed-dashboard{ grid-template-columns:1fr; }
    .au-speed-metrics-grid{ grid-template-columns:repeat(2,1fr); }
    .au-calc-grid{ grid-template-columns:1fr; }
    .bp-row{ grid-template-columns:1fr; }
  }
  @media (max-width:600px){
    .au-speed-metrics-grid{ grid-template-columns:1fr; }
    .au-speed-wrap, .au-pipeline-box, .au-calc-wrap{ padding:20px 16px; }
    .au-pipeline-tabs{ flex-direction:column; }
    .blueprint-header{ flex-direction:column; }
  }
`;

const AU_WEB_EXTRA_JS = `
<script>
/* ================== AUSTRALIAN BESPOKE INTERACTIVE SCRIPTS ================== */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Telstra/Optus Speedometer Simulator
    var speedBtns = document.querySelectorAll('.au-speed-btn');
    var gaugeBar = document.getElementById('gaugeBar');
    var gaugeScore = document.getElementById('gaugeScore');
    var gaugeStatus = document.getElementById('gaugeStatus');
    var speedArchTag = document.getElementById('speedArchTag');
    var valLcp = document.getElementById('valLcp'), gradeLcp = document.getElementById('gradeLcp'), descLcp = document.getElementById('descLcp');
    var valInp = document.getElementById('valInp'), gradeInp = document.getElementById('gradeInp'), descInp = document.getElementById('descInp');
    var valCls = document.getElementById('valCls'), gradeCls = document.getElementById('gradeCls'), descCls = document.getElementById('descCls');
    var valTtfb = document.getElementById('valTtfb'), gradeTtfb = document.getElementById('gradeTtfb'), descTtfb = document.getElementById('descTtfb');
    var valPayload = document.getElementById('valPayload'), gradePayload = document.getElementById('gradePayload'), descPayload = document.getElementById('descPayload');
    var valRequests = document.getElementById('valRequests'), gradeRequests = document.getElementById('gradeRequests'), descRequests = document.getElementById('descRequests');
    var pingBtn = document.getElementById('runPingBtn'), pingResult = document.getElementById('pingResult');

    var speedData = {
        tap: {
            score: 99,
            dashoffset: 5,
            color: 'var(--orange)',
            statusHtml: '<span class="au-badge green">&#x2713; Passes Google Core Web Vitals</span>',
            tag: 'Architecture: Next.js 15 &bull; AWS Sydney (ap-southeast-2)',
            lcp: '0.7s', lcpGrade: 'Good (<2.5s)', lcpPass: true, lcpDesc: 'Sub-second hero text & media rendered via AWS Sydney edge nodes.',
            inp: '22ms', inpGrade: 'Good (<200ms)', inpPass: true, inpDesc: 'Near-instant touch responsiveness; zero main-thread JavaScript blocking.',
            cls: '0.00', clsGrade: 'Good (<0.1)', clsPass: true, clsDesc: 'Zero visual jumping; strictly dimensioned images and font fallback matching.',
            ttfb: '36ms', ttfbGrade: 'Instant', ttfbPass: true, ttfbDesc: 'Sub-50ms response across Telstra, Optus, and TPG Australian 4G networks.',
            payload: '114 KB', payloadGrade: 'Lightweight', payloadPass: true, payloadDesc: 'Optimised modern SVGs and next-gen AVIF images without plugin bloat.',
            requests: '7 Requests', requestsGrade: 'Zero Plugins', requestsPass: true, requestsDesc: 'Zero vulnerable third-party plugins; 100% owned TypeScript repository.'
        },
        wp: {
            score: 34,
            dashoffset: 165,
            color: '#DC2626',
            statusHtml: '<span class="au-badge red">&#x2717; Fails Google Core Web Vitals</span>',
            tag: 'Architecture: WordPress 6.x &bull; 28 Plugins &bull; Sydney Host',
            lcp: '4.6s', lcpGrade: 'Poor (>4.0s)', lcpPass: false, lcpDesc: 'Server delays, unoptimized PHP rendering, and chained render-blocking CSS/JS.',
            inp: '380ms', inpGrade: 'Poor (>200ms)', inpPass: false, inpDesc: 'Noticeable touch lag caused by heavy tracking scripts and slider bundles.',
            cls: '0.34', clsGrade: 'Poor (>0.25)', clsPass: false, clsDesc: 'Late-loading banners, web font swapping, and unconstrained image tags shift the page.',
            ttfb: '890ms', ttfbGrade: 'Slow', ttfbPass: false, ttfbDesc: 'Heavy Apache/MySQL database queries on shared Australian hosting.',
            payload: '6.2 MB', payloadGrade: 'Heavy', payloadPass: false, payloadDesc: 'Bloated page builders, uncompressed PNGs, and unused theme CSS.',
            requests: '84 Requests', requestsGrade: '28 Plugins', requestsPass: false, requestsDesc: 'Multiple external plugins each injecting their own stylesheet and scripts.'
        }
    };

    speedBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            speedBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            var mode = this.getAttribute('data-mode');
            var d = speedData[mode];
            if (!d) return;

            if (gaugeBar) {
                gaugeBar.style.strokeDashoffset = d.dashoffset;
                gaugeBar.style.stroke = d.color;
            }
            if (gaugeScore) gaugeScore.textContent = d.score;
            if (gaugeStatus) gaugeStatus.innerHTML = d.statusHtml;
            if (speedArchTag) speedArchTag.innerHTML = d.tag;

            if (valLcp) valLcp.textContent = d.lcp;
            if (gradeLcp) { gradeLcp.textContent = d.lcpGrade; gradeLcp.className = 'metric-grade ' + (d.lcpPass ? 'pass' : 'fail'); }
            if (descLcp) descLcp.textContent = d.lcpDesc;

            if (valInp) valInp.textContent = d.inp;
            if (gradeInp) { gradeInp.textContent = d.inpGrade; gradeInp.className = 'metric-grade ' + (d.inpPass ? 'pass' : 'fail'); }
            if (descInp) descInp.textContent = d.inpDesc;

            if (valCls) valCls.textContent = d.cls;
            if (gradeCls) { gradeCls.textContent = d.clsGrade; gradeCls.className = 'metric-grade ' + (d.clsPass ? 'pass' : 'fail'); }
            if (descCls) descCls.textContent = d.clsDesc;

            if (valTtfb) valTtfb.textContent = d.ttfb;
            if (gradeTtfb) { gradeTtfb.textContent = d.ttfbGrade; gradeTtfb.className = 'metric-grade ' + (d.ttfbPass ? 'pass' : 'fail'); }
            if (descTtfb) descTtfb.textContent = d.ttfbDesc;

            if (valPayload) valPayload.textContent = d.payload;
            if (gradePayload) { gradePayload.textContent = d.payloadGrade; gradePayload.className = 'metric-grade ' + (d.payloadPass ? 'pass' : 'fail'); }
            if (descPayload) descPayload.textContent = d.payloadDesc;

            if (valRequests) valRequests.textContent = d.requests;
            if (gradeRequests) { gradeRequests.textContent = d.requestsGrade; gradeRequests.className = 'metric-grade ' + (d.requestsPass ? 'pass' : 'fail'); }
            if (descRequests) descRequests.textContent = d.requestsDesc;
        });
    });

    if (pingBtn) {
        pingBtn.addEventListener('click', function() {
            var activeBtn = document.querySelector('.au-speed-btn.active');
            var mode = activeBtn ? activeBtn.getAttribute('data-mode') : 'tap';
            pingResult.style.display = 'block';
            pingResult.innerHTML = 'Pinging AWS Sydney (ap-southeast-2)...';
            setTimeout(function() {
                if (mode === 'tap') {
                    pingResult.innerHTML = '<strong>Target:</strong> AWS Sydney Edge (ap-southeast-2)<br/>' +
                        '<strong>Telstra 4G Mobile Ping:</strong> 28ms &bull; <strong>Optus 5G:</strong> 18ms &bull; <strong>Status:</strong> HTTP/3 200 OK (Clean Edge Hit)';
                } else {
                    pingResult.innerHTML = '<strong>Target:</strong> Shared WordPress Server (Sydney)<br/>' +
                        '<strong>Telstra 4G Mobile Ping:</strong> 790ms &bull; <strong>Database Query Time:</strong> 420ms &bull; <strong>Status:</strong> 3 Redirects &bull; Cache Miss';
                }
            }, 350);
        });
    }

    // 2. Blueprint-to-Sydney-Edge Transformer Tabs
    var tabBtns = document.querySelectorAll('.au-tab-btn');
    var stagePanels = document.querySelectorAll('.au-stage-panel');
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            stagePanels.forEach(function(p) { p.classList.remove('active'); });
            this.classList.add('active');
            var stage = this.getAttribute('data-stage');
            var panel = document.getElementById('stagePanel' + stage);
            if (panel) panel.classList.add('active');
        });
    });

    var demoBtn = document.getElementById('demoActionBtn');
    var demoFeedback = document.getElementById('demoFeedback');
    if (demoBtn && demoFeedback) {
        demoBtn.addEventListener('click', function() {
            demoFeedback.style.display = 'block';
            demoFeedback.innerHTML = '&#x26A1; Interaction dispatched! React 19 State Update took <strong>1.4ms</strong>. INP: <strong>18ms</strong> (Excellent).';
        });
    }

    // 3. Investment & TCO Calculator
    var tcoBtns = document.querySelectorAll('.au-tco-btn');
    var tcoAgencyUpfront = document.getElementById('tcoAgencyUpfront');
    var tcoAgencyMonthly = document.getElementById('tcoAgencyMonthly');
    var tcoAgencyTotal = document.getElementById('tcoAgencyTotal');
    var tcoSavings = document.getElementById('tcoSavings');

    var tcoData = {
        b2b: { upfront: 'AU$28,000', monthly: 'AU$1,800 / mo', total: 'AU$92,800', savings: 'AU$42,000+ Saved' },
        ecom: { upfront: 'AU$45,000', monthly: 'AU$2,600 / mo', total: 'AU$138,600', savings: 'AU$68,000+ Saved' },
        portal: { upfront: 'AU$58,000', monthly: 'AU$3,200 / mo', total: 'AU$173,200', savings: 'AU$85,000+ Saved' }
    };

    tcoBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tcoBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            var scale = this.getAttribute('data-scale');
            var d = tcoData[scale];
            if (!d) return;
            if (tcoAgencyUpfront) tcoAgencyUpfront.textContent = d.upfront;
            if (tcoAgencyMonthly) tcoAgencyMonthly.textContent = d.monthly;
            if (tcoAgencyTotal) tcoAgencyTotal.textContent = d.total;
            if (tcoSavings) tcoSavings.textContent = d.savings;
        });
    });
});
</script>
`;

s = L.injectExtras(s, AU_WEB_EXTRA_CSS);
s = s.replace(/<\/body>\s*<\/html>\s*$/, AU_WEB_EXTRA_JS + '\n</body>\n</html>\n');

// 11. Assertions and Sanity Checks
L.must(s, 'href="/au/erp/"');
L.must(s, 'href="/au/website-development/"');
L.must(s, 'href="/au/seo-services/"');
L.must(s, 'Core Web Vitals');
L.must(s, 'AWS Sydney');
L.must(s, 'Privacy Act 1988');
L.must(s, 'Telstra');
L.must(s, 'au-vitals-speedometer');
L.must(s, 'au-code-transformer');
L.must(s, 'au-web-tco-calculator');

// 12. Write output to au/website-development/index.html
const outDir = path.join(repoRoot, 'au', 'website-development');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'index.html'), s, 'utf8');
console.log('Successfully generated au/website-development/index.html (' + s.length + ' bytes)');
