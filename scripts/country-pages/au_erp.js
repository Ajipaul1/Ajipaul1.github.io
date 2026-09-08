'use strict';
// /au/erp/ — generated from the UK ERP base template and tailored for Australia.
// Keywords targeted (from SEMrush AU exports):
//   erp software australia 590/KD20 · erp systems australia 590/KD24 · cloud erp australia 260/KD26 ·
//   manufacturing erp australia 90/KD10 · best erp software australia 140/KD18 · erp implementation cost australia ·
//   erp accounting software australia · small business erp australia · erp for manufacturing australia ·
//   custom erp software australia · pronto xi alternatives · netsuite pricing australia

const fs = require('fs');
const path = require('path');
const repoRoot = path.resolve(__dirname, '..', '..');
const L = require(path.join(repoRoot, 'scripts', 'country-pages', 'lib.js'));

const URL = 'https://techauditpros.com/au/erp/';
let s = L.read('uk/erp/index.html');

// 1. Update Navigation and Regional Links
s = L.replaceAll(s, 'href="/uk/erp/"', 'href="/au/erp/"');
s = L.replaceAll(s, 'href="/uk/website-development/"', 'href="/au/website-development/"');
s = L.replaceAll(s, 'href="/uk/seo-services/"', 'href="/au/seo-services/"');
s = L.replaceAll(s, '<link rel="alternate" hreflang="en-gb" href="https://techauditpros.com/uk/erp/" />', '');
s = L.replaceAll(s, '<meta property="og:locale" content="en_GB" />', '<meta property="og:locale" content="en_AU" />');

// 2. Set Head Tags and Alternate Links
s = L.setHead(s, {
  title: 'Custom ERP Software Development for Australian Businesses | TechAuditPros',
  ogTitle: 'Custom ERP Software Development for Australian Businesses | TechAuditPros',
  desc: 'TechAuditPros builds custom ERP and manufacturing ERP software for Australian mid-market businesses &mdash; inventory, orders, BOM, job costing, ATO STP 2 and finance in one system, integrated with Xero and MYOB, hosted in AWS Sydney. Flat one agreed monthly fee, dedicated engineering team, you own the code.',
  url: URL,
  hreflang: [
    { lang: 'en-au', href: URL },
    { lang: 'en-gb', href: 'https://techauditpros.com/uk/erp/' },
    { lang: 'en-us', href: 'https://techauditpros.com/us/erp/' },
    { lang: 'en-ca', href: 'https://techauditpros.com/ca/erp/' },
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

// 4. Australian FAQs (Deep, verifiable, answer-first for Perplexity/AEO)
const faqs = [
  {
    q: 'How much does custom ERP software cost in Australia?',
    a: 'TechAuditPros builds, integrates, and evolves your custom ERP for one agreed monthly fee &mdash; covering your dedicated engineering team, system architecture, database design, official Xero/MYOB integrations, AWS Sydney hosting guidance, and continuous monthly improvements, with $0 per-seat licences and zero upfront consultant lock-in invoices. For market comparison, published Australian list prices for commercial subscription ERP range from AU$150 to AU$350 per user per month (Oracle NetSuite typically AU$150&ndash;AU$350/user/mo, Pronto Xi AU$180&ndash;AU$320/user/mo, SAP Business One AU$140&ndash;AU$280/user/mo, Microsoft Dynamics 365 Business Central AU$120&ndash;AU$260/user/mo). For a 35-person Australian business, subscription seats alone cost AU$70,000&ndash;AU$145,000 every year, before adding AU$80,000&ndash;AU$200,000+ for implementation partner consulting. Our scope call ends with a fixed monthly investment, put in writing before engineering starts.'
  },
  {
    q: 'How does the custom ERP handle ATO Single Touch Payroll (STP Phase 2) and Superannuation?',
    a: 'Your ERP captures time, attendance, machine hours, and job allocations directly at the point of work, feeding compliant payroll runs. For Single Touch Payroll Phase 2 (STP 2), pay events are disaggregated into gross wages, paid leave, salary sacrifice, allowances, and tax treatments exactly as mandated by the Australian Taxation Office (ATO). We either push payroll data automatically through official APIs to Xero or MYOB for direct ATO lodgement, or generate SuperStream-compliant export batches for the Superannuation Guarantee (11.5% rising to 12% in July 2026), eliminating duplicate manual data entry and compliance penalties.'
  },
  {
    q: 'Can the ERP integrate with Xero, MYOB, Shopify, and Australian trade portals?',
    a: 'Yes. Two-way synchronisation with Xero, MYOB Business / AccountRight, and QuickBooks Online is scoped during discovery and built directly against their official REST APIs. Sales orders, progressive tax invoices, and payments flow into your accounting system with 10% GST automatically categorized into your Business Activity Statement (BAS) lines. We also integrate with Shopify, WooCommerce, Amazon Australia, and custom EDI or B2B trade portals, so customer-specific trade pricing, credit limits, and purchase orders stay synchronized across all channels.'
  },
  {
    q: 'Where is our company data hosted, and does it comply with the Australian Privacy Act?',
    a: 'Your ERP and database are deployed exclusively in an Australian cloud region within an account you own and control &mdash; AWS Sydney (ap-southeast-2) by default, or Google Cloud Melbourne/Sydney (australia-southeast1/2). This guarantees Australian data residency in full compliance with the 13 Australian Privacy Principles (APPs) under the Privacy Act 1988. We execute a comprehensive Non-Disclosure Agreement (NDA) and Data Processing Agreement naming you as the sole owner and data controller, with automated daily encrypted backups and zero shared credentials.'
  },
  {
    q: 'How does custom ERP compare to Australian vendors like Pronto Xi or global SaaS like NetSuite?',
    a: 'Commercial subscription products like Pronto Xi or NetSuite are multi-tenant platforms where you pay per user and adapt your business to the vendor’s rigid data structures. When you need custom shop-floor screens, barcode routing, or specialised trade quoting, you must pay implementation partners hefty hourly consulting rates or buy expensive add-on modules. A custom ERP from TechAuditPros is coded 100% around how your Australian facility runs. You pay no user fees, so you can give warehouse staff, machine operators, drivers, and external subcontractors their own logins at zero extra cost, and you own 100% of the IP.'
  },
  {
    q: 'What is the difference between MRP, ERP, and WMS for Australian manufacturers?',
    a: 'MRP (Material Requirements Planning) calculates what raw materials or components to make or buy and when, based on your multi-level Bills of Materials (BOMs), existing stock, supplier lead times, and active sales orders. ERP is the wider operational system of record that unifies MRP with sales, purchasing, job costing, finance, and people. WMS (Warehouse Management System) manages the physical warehouse: barcode bin locations, directed picking routes, and stock transfers across Australian distribution centers. We build right-sized ERP with MRP and warehouse barcode tracking embedded in one cohesive system.'
  },
  {
    q: 'How long does a custom ERP build take, and when can our team use it?',
    a: 'Most Australian engagements deploy a working, tested first module &mdash; usually multi-site inventory, orders, or quoting, whichever creates the most operational friction &mdash; within 6 to 10 weeks. The complete system then rolls out in continuous two-week sprint phases over 4 to 9 months. Your staff tests and uses each module on real operational data as it ships, rather than waiting through an 18-month "big-bang" launch that disrupts daily business.'
  },
  {
    q: 'How does the time-zone overlap work between Australia and your Kochi engineering team?',
    a: 'Our engineering headquarters in Kochi operates in high alignment with Australian business hours. Kochi is 4.5 hours behind Australian Eastern Standard Time (AEST: Sydney, Melbourne, Brisbane) and just 2.5 hours behind Australian Western Standard Time (AWST: Perth). In practice, you have a live joint overlap window every Australian afternoon (1:00 PM to 6:30 PM AEST, or 10:30 AM to 6:00 PM AWST) for sprint planning, live Slack/Teams queries, and screen-shares. Requests submitted in the Australian morning are actively worked on during the afternoon, giving you a continuous delivery engine.'
  }
];

// 5. Update Schemas
s = L.setPageSchemas(s, [
  L.serviceSchema({
    type: 'Custom ERP Software Development',
    name: 'Custom ERP and Manufacturing ERP Software Development for Australian Businesses',
    url: URL,
    country: 'Australia',
    currency: 'AUD',
    price: '1800',
    desc: 'Custom ERP and manufacturing ERP software development for Australian mid-market businesses: inventory, orders, purchasing, BOM, job costing, ATO STP 2, and finance in one system, integrated with Xero and MYOB, hosted in AWS Sydney, built and maintained by a dedicated AI-native engineering team.'
  }),
  L.breadcrumbSchema([
    ['Home', 'https://techauditpros.com/'],
    ['Australia', 'https://techauditpros.com/au/'],
    ['Custom ERP Development', URL]
  ]),
  L.faqSchema(faqs)
]);

// 6. Side Text & Rotate Phrases (direct replacements)
s = s.replace('<span>to Britain.</span>', '<span>to Australia.</span>');
s = s.replace(/heroArcPathUK/g, 'heroArcPathAU');
s = s.replace(/'UK ERP, Web &amp; SEO\.'/, "'Australian ERP, Web &amp; SEO.'");
s = s.replace(/'Best AI Developers for the UK\.'/, "'Best AI Developers for Australia.'");
s = s.replace(/'Trusted ERP Partner in the UK\.'/, "'Trusted ERP Partner in Australia.'");
s = s.replace(/'AI-Native Engineering Team — Serving the UK'/, "'AI-Native Engineering Team — Serving Australia'");
s = s.replace(/'London &bull; Manchester &bull; Leeds &bull; Bristol'/, "'Sydney &bull; Melbourne &bull; Brisbane &bull; Perth'");

// 7. Australian Hero
s = L.setHero(s, {
  eyebrow: 'Custom ERP &amp; Manufacturing Software &mdash; Built for Australian Operations',
  h1: 'Custom ERP Software <span>Engineered for How Your Australian Business Actually Runs.</span>',
  sub: 'TechAuditPros designs, codes, and supports custom cloud ERP and manufacturing systems for mid-market Australian companies &mdash; one unified system of record for multi-site inventory, job costing, ATO Single Touch Payroll 2, and real-time Xero or MYOB syncing, hosted in AWS Sydney. One agreed monthly fee, dedicated engineering team, $0 per-seat licences, and you own 100% of the code.',
  ghostHref: '#erp-modules',
  ghostText: 'Explore ERP Modules &darr;',
  features: [
    '&#x1F468;&#x200D;&#x1F4BB; Dedicated Engineering Team',
    '&#x1F1E6;&#x1F1FA; AWS Sydney Data Residency',
    '&#x1F4BB; You Own 100% of Code &amp; IP',
    '&#x1F4B0; $0 Per-Seat Licences'
  ],
  trust: [
    ['250+', 'Projects delivered'],
    ['No lock-in', 'Month to month'],
    ['6&ndash;10 wks', 'To first working module'],
    ['4.9/5', 'Client satisfaction']
  ]
});

// 8. Construct Body Sections
let body = '';

// Answer Section (AEO/GEO optimized for Australian Search & AI engines)
body += L.answer(
  '<strong>Custom ERP software</strong> is an operational management system designed, coded, and evolved for one business’s exact workflows, instead of a rigid subscription product every company shares. TechAuditPros builds custom ERP and <strong>manufacturing ERP</strong> for Australian mid-market companies on <strong>Node.js, TypeScript, PostgreSQL, and React</strong>, hosted in <strong>AWS Sydney (ap-southeast-2)</strong> in an account you own, for a <strong>one agreed monthly fee</strong> &mdash; with $0 per-seat licence fees, no five-figure upfront consultant invoices, and no lock-in contract. Fully compliant with <strong>ATO Single Touch Payroll Phase 2 (STP 2)</strong>, 10% GST, and the <strong>Privacy Act 1988 (APPs)</strong>, most clients are using their first working module within 6 to 10 weeks.'
);

// What Custom ERP Replaces
body += L.benefitRow(
  'what-custom-erp-replaces',
  'What a Custom ERP Replaces',
  'The three operational friction points that quietly drain mid-market Australian businesses.',
  [
    {
      icon: '&#x1F4CA;',
      h4: 'The Spreadsheet Sprawl',
      p: 'The multi-tab stock spreadsheet, the shop-floor whiteboard, the custom pricing matrix, the workbook only Dave understands. A custom ERP replaces disconnected files with one authoritative system of record and live data across every site.'
    },
    {
      icon: '&#x1F9E9;',
      h4: 'The Per-Seat SaaS Penalty',
      p: 'NetSuite, Pronto Xi, or SAP B1 charging AU$150&ndash;AU$350 per user each month. Adding warehouse staff, drivers, or machine operators causes subscription bills to spiral, forcing teams to ration logins and leave the floor on clipboards.'
    },
    {
      icon: '&#x1F501;',
      h4: 'Disconnected Compliance &amp; Sync',
      p: 'Manual CSV exports between inventory and Xero or MYOB, double-handling job sheets, and manually calculating ATO STP 2 disaggregated gross. Automation handles the repetitive calculations; your staff focuses on production and clients.'
    }
  ]
);

// Bespoke Animation Section 1: Interactive Australian Live Operational Pipeline
const PIPELINE_HTML = `
<section class="us-section us-section-alt" id="au-operational-pipeline">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Interactive Operations Architecture</p>
            <h2>How Live Operational Data Moves Through Your System</h2>
            <p class="us-lead">From customer trade quote to workshop machine booking and automated Xero/MYOB reconciliation &mdash; engineered as one continuous, automated pipeline without manual re-keying.</p>
        </div>

        <div class="au-pipeline-wrap">
            <!-- Animated SVG connecting spine -->
            <div class="au-pipeline-svg-box" aria-hidden="true">
                <svg viewBox="0 0 1000 70" preserveAspectRatio="none">
                    <line x1="100" y1="35" x2="900" y2="35" class="au-pipe-base"></line>
                    <line x1="100" y1="35" x2="900" y2="35" class="au-pipe-flow"></line>
                </svg>
            </div>

            <div class="au-pipeline-steps">
                <div class="au-pipe-step active" data-step="1">
                    <div class="au-pipe-node">01</div>
                    <h4>B2B Quote &amp; Order</h4>
                    <p>Customer trade order lands via portal or CRM; automated ABR API validates ABN, credit terms, and GST status.</p>
                    <span class="au-pipe-tag">Instant Validation</span>
                </div>
                <div class="au-pipe-step" data-step="2">
                    <div class="au-pipe-node">02</div>
                    <h4>BOM &amp; MRP Allocation</h4>
                    <p>Multi-level bill of materials checks raw materials in AWS Sydney; issues supplier POs for shortages automatically.</p>
                    <span class="au-pipe-tag">Demand-Driven</span>
                </div>
                <div class="au-pipe-step" data-step="3">
                    <div class="au-pipe-node">03</div>
                    <h4>Barcode WMS Pick</h4>
                    <p>Warehouse staff pick via RF/camera barcode scanning by bin and batch number; inventory counts update live across sites.</p>
                    <span class="au-pipe-tag">Zero Despatch Errors</span>
                </div>
                <div class="au-pipe-step" data-step="4">
                    <div class="au-pipe-node">04</div>
                    <h4>Shop Floor &amp; STP 2</h4>
                    <p>Machine runtime and direct labour hours logged at touch terminals; real job costing feeds ATO STP 2 and Super.</p>
                    <span class="au-pipe-tag">ATO Compliant</span>
                </div>
                <div class="au-pipe-step" data-step="5">
                    <div class="au-pipe-node">05</div>
                    <h4>Xero &amp; MYOB Sync</h4>
                    <p>Tax invoice generated; receivables, 10% GST, and COGS sync two-way to the general ledger, closing month-end cleanly.</p>
                    <span class="au-pipe-tag">Real Gross Margin</span>
                </div>
            </div>

            <div class="au-pipeline-payload">
                <div class="au-payload-head">
                    <span class="au-payload-indicator"></span>
                    <span class="au-payload-title">Live Payload Inspector: <strong id="auPayloadTitle">01 &bull; B2B Quote &amp; Trade Order Ingestion</strong></span>
                </div>
                <div class="au-payload-code" id="auPayloadCode">
{
  "event": "order.approved",
  "customer": "Southern Cross Fabrication Pty Ltd",
  "abn": "48 123 456 789 (Verified Active ABR)",
  "tradeCredit": "Approved (30 Days EOM)",
  "items": 4,
  "subtotal": "AU$14,850.00",
  "gst10": "AU$1,485.00",
  "total": "AU$16,335.00",
  "routing": "Auto-Dispatched to MRP & BOM Engine"
}
                </div>
            </div>
        </div>
    </div>
</section>
`;
body += PIPELINE_HTML;

// MRP vs ERP vs WMS
body += L.benefitRow(
  'mrp-erp-wms',
  'MRP, ERP or WMS?',
  'The three acronyms software vendors sell interchangeably &mdash; and what each actually does in Australia.',
  [
    {
      icon: '&#x1F9EE;',
      h4: 'MRP (Material Requirements Planning)',
      p: 'Calculates what raw materials or sub-assemblies to buy or manufacture and when, based on multi-level Bills of Materials (BOM), current physical stock, and supplier lead times. It answers: "Can we promise this delivery date to the client?"'
    },
    {
      icon: '&#x1F5C3;&#xFE0F;',
      h4: 'ERP (Enterprise Resource Planning)',
      p: 'The unified system of record surrounding MRP: quotes, orders, purchasing, job costing, inventory, ATO Single Touch Payroll 2, and general ledger sync in one database. It answers: "What is the true profit margin on every job we ship?"'
    },
    {
      icon: '&#x1F3EC;',
      h4: 'WMS (Warehouse Management System)',
      p: 'Manages physical warehouse mechanics: multi-bin locations, barcode picking routes, stock transfers across Australian state depots, and goods receipting. Embedded seamlessly inside our ERP builds so you do not need third-party connectors.'
    }
  ]
);

// 8 Modules Grid with Assembly Line Conveyor Belt Motion
body += L.modulesGrid(
  'erp-modules',
  'What’s Included in Your Custom Build',
  'Eight core operational modules, deployed in the sequence that pays back fastest.',
  'Every Australian engagement begins with the operational module causing the most friction &mdash; usually inventory, orders, or job quoting &mdash; and adds the remaining modules in continuous two-week sprints. You build only what your business needs.',
  [
    {
      icon: '&#x1F4E6;',
      h4: 'Multi-Site Stock &amp; Barcode WMS',
      p: 'Live inventory across Sydney, Melbourne, Brisbane, and regional depots. Bin locations, lot/batch tracking, serial numbers, mobile barcode scanning, and automated reorder points.'
    },
    {
      icon: '&#x1F9FE;',
      h4: 'B2B Trade Orders &amp; Fulfilment',
      p: 'Quote-to-invoice workflow, customer tier pricing, trade credit limits, back-order management, and automatic order ingestion from Shopify, WooCommerce, or trade portals.'
    },
    {
      icon: '&#x1F6D2;',
      h4: 'Purchasing &amp; Landed Cost',
      p: 'Purchase orders, Australian customs duty, international freight allocation, supplier lead times, and automated three-way matching against goods-in and supplier invoices.'
    },
    {
      icon: '&#x1F3ED;',
      h4: 'Production, BOM &amp; Shop Floor',
      p: 'Multi-level Bills of Materials (BOM), routing, work orders, machine capacity planning, shop-floor touch kiosks, and work-in-progress (WIP) valuation.'
    },
    {
      icon: '&#x1F4B5;',
      h4: 'Xero &amp; MYOB Two-Way Sync',
      p: 'Seamless daily synchronization with Xero and MYOB. Automated sales invoices, supplier bills, BAS 10% GST line categorization, and debtor/creditor visibility.'
    },
    {
      icon: '&#x1F91D;',
      h4: 'Accurate Job Costing &amp; Quoting',
      p: 'Quotes generated from live bill-of-materials and current supplier pricing. Real-time capture of direct labour, machine runtime, and materials for true job margin.'
    },
    {
      icon: '&#x1F465;',
      h4: 'ATO Single Touch Payroll (STP 2)',
      p: 'Compliant pay event generation with disaggregated gross, tax treatments, and allowances, plus SuperStream Superannuation Guarantee (11.5% rising to 12%) batching.'
    },
    {
      icon: '&#x1F4C8;',
      h4: 'Executive Dashboards &amp; Reporting',
      p: 'Real-time gross margin by job, customer, and product line. Inventory turnover, cash-flow projections, and BAS tax liabilities without reconstructing spreadsheets.'
    }
  ],
  true
);

// 6-Frame Visual Story (Variant B Filmstrip) embedded right after Modules Grid
const AU_STORY_HTML = `
<!-- uk-story:start -->
<section class="tap-section uks-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Six frames, in order</p>
            <h2>The Entire Build Journey, Without the Sales Presentation</h2>
            <p class="us-lead">How a mid-market Australian business transitions from disconnected spreadsheets to an integrated, automated operational core.</p>
        </div>
        <div class="uks uksB">
            <div class="rail">
                <div class="frame">
                    <div class="shot"><img class="uks-img" src="/assets/images/library/aec2-two-women-hard-hats-blueprints.jpg" alt="Engineers in hard hats reviewing facility plans and job specs" width="2400" height="1600" loading="lazy" decoding="async" /></div>
                    <div class="words">
                        <span class="uks-n">01</span>
                        <p class="uks-cap">Today the job runs on spreadsheets and clipboards.</p>
                        <p class="hint">Where we always start</p>
                    </div>
                </div>
                <div class="frame">
                    <div class="shot"><img class="uks-img" src="/assets/images/library/inb-woman-many-papers.jpg" alt="Operations review with paperwork and spreadsheets" width="2400" height="1600" loading="lazy" decoding="async" /></div>
                    <div class="words">
                        <span class="uks-n">02</span>
                        <p class="uks-cap">And stock &amp; job costing are educated guesses.</p>
                        <p class="hint">The hidden leakage</p>
                    </div>
                </div>
                <div class="frame">
                    <div class="shot"><img class="uks-img" src="/assets/images/library/female-developer-red-hair-dual-monitors-code.jpg" alt="TechAuditPros software engineer coding custom ERP modules on dual screens" width="2400" height="1601" loading="lazy" decoding="async" /></div>
                    <div class="words">
                        <span class="uks-n">03</span>
                        <p class="uks-cap">We model your workflows, then build.</p>
                        <p class="hint">Tested every two-week sprint</p>
                    </div>
                </div>
                <div class="frame">
                    <div class="shot"><img class="uks-img" src="/assets/images/library/inb-woman-organised-warehouse.jpg" alt="Logistics manager in an organised warehouse scanning inventory" width="2400" height="1600" loading="lazy" decoding="async" /></div>
                    <div class="words">
                        <span class="uks-n">04</span>
                        <p class="uks-cap">Stock is tracked by barcode where it moves.</p>
                        <p class="hint">Live multi-bin visibility</p>
                    </div>
                </div>
                <div class="frame">
                    <div class="shot"><img class="uks-img" src="/assets/images/library/uk-industrial-robot-arm-blue-factory.jpg" alt="Automated production line and discrete manufacturing operation" width="2400" height="1505" loading="lazy" decoding="async" /></div>
                    <div class="words">
                        <span class="uks-n">05</span>
                        <p class="uks-cap">Shop floor &amp; machine capacity captured live.</p>
                        <p class="hint">BOM, WIP and labour routing</p>
                    </div>
                </div>
                <div class="frame">
                    <div class="shot"><img class="uks-img" src="/assets/images/library/executive-woman-tablet-grand-hall.jpg" alt="Executive operations leader reviewing real-time ERP analytics on a tablet" width="2400" height="1601" loading="lazy" decoding="async" /></div>
                    <div class="words">
                        <span class="uks-n">06</span>
                        <p class="uks-cap">Month-end, BAS &amp; STP 2 close automatically.</p>
                        <p class="hint">True gross margins &amp; ATO compliance</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- uk-story:end -->
`;
body += AU_STORY_HTML;

// Promise Banner: Whiteboard Workflow Mapping
body += L.promise({
  h2: 'We Walk Your Real Australian Workflows Before Writing Code',
  p: 'Every TechAuditPros engagement begins with our engineering team reviewing your actual spreadsheets, ERP exports, order forms, and daily routines alongside you &mdash; how an order moves from quote to cash, where it stalls, and who steps in to fix it manually. You review and approve an interactive prototype and data model before development starts, so the software matches how your business operates today.',
  href: '#process',
  cta: 'See Our 6-Step Build Process',
  img: 'whiteboard-process-mapping-two-colleagues.jpg',
  alt: 'TechAuditPros engineering team mapping an Australian client workflow on a whiteboard',
  w: 2400,
  h: 1601
});

// Production Methodologies Grid
body += L.modulesGrid(
  'production-methods',
  'Australian Production Methodologies',
  'Configured for how you actually manufacture, assemble, or distribute.',
  'Off-the-shelf software vendors force you into standard templates. Here is how our custom core adapts to your operational methodology &mdash; with zero per-seat licence penalties.',
  [
    {
      icon: '&#x1F527;',
      h4: 'Discrete Manufacturing',
      p: 'Engineered assemblies, machinery, structural steel, and electronics with multi-tier BOMs, component routing, and serialized batch tracking from raw stock to despatch.'
    },
    {
      icon: '&#x2697;&#xFE0F;',
      h4: 'Process &amp; Batch Processing',
      p: 'Formulas and recipes for Australian food, craft brewing, wine, and specialty chemicals. Batch sizing, yield tracking, expiry dates, and forward/backward lot recall compliance.'
    },
    {
      icon: '&#x1F3ED;',
      h4: 'Custom Job Shop &amp; Fabrication',
      p: 'Every contract is unique. Quoting from technical drawings, per-job machine routing, actual labour hour capture, and accurate final cost calculation when the job closes.'
    },
    {
      icon: '&#x1F4E5;',
      h4: 'Make to Order (MTO)',
      p: 'Production scheduled only when confirmed orders land. Demand-driven MRP, realistic completion dates based on live shop capacity, and deposit stage tracking.'
    },
    {
      icon: '&#x1F4E6;',
      h4: 'Make to Stock (MTS)',
      p: 'Forecast planning and reorder-point calculations. Safety stock levels by warehouse location, preventing stockouts during peak seasons and eliminating dead inventory.'
    },
    {
      icon: '&#x1F9F1;',
      h4: 'Assemble to Order (ATO)',
      p: 'Modular products assembled from stocked sub-assemblies. A custom visual product configurator that prices and validates technical component rules as quotes are generated.'
    },
    {
      icon: '&#x1F4D0;',
      h4: 'Commercial Contracting &amp; Trades',
      p: 'Multi-stage trade projects, subcontractor hour tracking, variation requests, plant hire allocations, and progress claim invoicing connected to Xero and MYOB.'
    },
    {
      icon: '&#x267B;&#xFE0F;',
      h4: 'Wholesale &amp; Trade Distribution',
      p: 'High-volume pick-pack-despatch across national distribution hubs, trade account customer portals, courier label generation, and dynamic landed cost tracking.'
    }
  ],
  false
);

// Costing You Can Defend
body += L.benefitRow(
  'erp-costing',
  'Costing You Can Defend to the Board',
  'Standard, actual, and job costing &mdash; and the difference it makes to Australian gross margin.',
  [
    {
      icon: '&#x1F4CB;',
      h4: 'Standard Costing &amp; Variances',
      p: 'Establish planned unit costs with automatic variance reporting against materials, labour, and machine hours so you identify exactly where profit leaked, rather than wondering why margins dipped.'
    },
    {
      icon: '&#x1F9FE;',
      h4: 'Actual &amp; Job Costing',
      p: 'Roll up real material issues, landed freight, machine runtime, and actual staff hours per work order. Know the true cost of goods manufactured instead of relying on blended averages that mask loss-making jobs.'
    },
    {
      icon: '&#x1F4C9;',
      h4: 'Overhead &amp; WIP Valuation',
      p: 'Absorb factory overhead cleanly and value work-in-progress across any date range &mdash; providing the accurate inventory figures your accountant and tax agent need for end-of-year tax returns.'
    }
  ]
);

// Australian Compliance Built-In
body += L.modulesGrid(
  'au-compliance',
  'Australian Compliance, Built In',
  'The country-specific regulations that global ERP vendors overlook.',
  'Ranking overseas software comparison sites are written for North America or Europe and gloss over Australian statutory obligations. If you operate in Australia, these are non-negotiable &mdash; and we build them into your core system from day one.',
  [
    {
      icon: '&#x1F9FE;',
      h4: 'ATO Single Touch Payroll (STP 2)',
      p: 'Digital reporting broken down into gross pay, allowances, paid leave, salary sacrifice, and tax treatments, ready for direct transmission or seamless sync into Xero/MYOB.'
    },
    {
      icon: '&#x1F4D8;',
      h4: '10% GST &amp; Automated BAS Lodgement',
      p: 'Tax invoices structured with required ATO details; automated line-item GST classification (taxable, GST-free, input-taxed) for seamless quarterly Business Activity Statements.'
    },
    {
      icon: '&#x1F465;',
      h4: 'Superannuation Guarantee (11.5% / 12%)',
      p: 'Ordinary Time Earnings (OTE) calculation rules and SuperStream-compliant export batching, keeping your business compliant with legislated super rate increases.'
    },
    {
      icon: '&#x1F510;',
      h4: 'Privacy Act 1988 &amp; Australian Privacy Principles',
      p: 'Data residency in AWS Sydney (ap-southeast-2) with encrypted storage at rest and in transit, role-based access controls, and a binding Data Processing Agreement.'
    },
    {
      icon: '&#x1F3E2;',
      h4: 'ABN &amp; ACN ABR Register Validation',
      p: 'Direct integration with the Australian Business Register (ABR) API for real-time validation of supplier and customer ABN status and GST registration.'
    },
    {
      icon: '&#x1F6A2;',
      h4: 'Import Customs &amp; Landed Cost',
      p: 'Australian customs tariffs, freight forwarder fees, port handling charges, and import GST allocated proportionally across purchase orders for true inventory valuation.'
    }
  ],
  true
);

// If You Are Evaluating the Big Names
body += L.modulesGrid(
  'vs-products',
  'Evaluating the Big Names in Australia',
  'Pronto Xi, NetSuite, Dynamics 365, MYOB Advanced, SAP B1 &mdash; honest comparison.',
  'We do not receive commissions or reseller incentives from any vendor. Here is our direct evaluation of where commercial products shine, and where a custom ERP build is the superior commercial decision for an Australian company.',
  [
    {
      icon: '&#x1F4D7;',
      h4: 'Pronto Xi &mdash; from AU$180/user/mo',
      p: 'A respected Australian ERP vendor with strong domestic history. However, user licensing fees, heavy legacy architecture, and high implementation partner retainers make scaling expensive as your headcount grows.'
    },
    {
      icon: '&#x1F535;',
      h4: 'Oracle NetSuite &mdash; from AU$150/user/mo',
      p: 'A powerful global platform suited for complex multi-national corporations. For mid-market Australian firms, contract renewal hikes, per-seat licensing, and rigid customization constraints frequently create friction.'
    },
    {
      icon: '&#x1F7E6;',
      h4: 'Microsoft Dynamics 365 &mdash; from AU$120/user/mo',
      p: 'An excellent choice if your enterprise is deeply committed to the Microsoft ecosystem. However, real-world deployment requires certified local implementation partners whose daily billing rates rapidly consume project capital.'
    },
    {
      icon: '&#x1F7E0;',
      h4: 'MYOB Advanced &mdash; from AU$130/user/mo',
      p: 'Built on the Acumatica platform and tailored for Australian businesses. Excellent accounting roots, but per-tier transaction limits and custom shop-floor constraints often push growing manufacturers back to spreadsheets.'
    },
    {
      icon: '&#x1F536;',
      h4: 'SAP Business One &mdash; from AU$140/user/mo',
      p: 'Frequently chosen when an overseas parent company requires SAP compatibility. Relies heavily on third-party partner add-ons and specialized consultants for ongoing modifications.'
    },
    {
      icon: '&#x2705;',
      h4: 'TechAuditPros Custom &mdash; one agreed monthly fee',
      p: 'The optimal choice when your operations give you a competitive advantage that packaged software cannot handle, when per-user seat fees penalize your growth, and when you want full IP ownership.'
    }
  ],
  false
);

// Where ERP Projects Go Wrong
body += L.benefitRow(
  'erp-risks',
  'Where ERP Projects Actually Go Wrong in Australia',
  'The four primary failure modes &mdash; and how our delivery process systematically avoids them.',
  [
    {
      icon: '&#x1F5C2;&#xFE0F;',
      h4: 'Dirty Legacy Data',
      p: 'Duplicate supplier records, inaccurate unit costs, and warehouse stock balances that were never reconciled. We audit, clean, and map your historical data during discovery, running side-by-side verification before live cut-over.'
    },
    {
      icon: '&#x1F4C8;',
      h4: 'Scope Creep &amp; Budget Blowouts',
      p: 'Attempting to launch an 18-month multi-million dollar system all at once. We build in modular two-week sprints, deploying a working, tested module within 6 to 10 weeks so your team derives immediate commercial value.'
    },
    {
      icon: '&#x1F464;',
      h4: 'Poor Shop-Floor &amp; Warehouse Adoption',
      p: 'Complex software designed for accountants that floor staff find impossible to use. We design intuitive, high-contrast mobile and touchscreen interfaces tailored to your machine operators and warehouse team.'
    },
    {
      icon: '&#x1F50C;',
      h4: 'Late-Discovered Integration Traps',
      p: 'Discovering six months into a build that an API connector does not support critical line-item GST or batch numbers. Every third-party integration (Xero, MYOB, carriers, Shopify) is tested against live APIs during initial discovery.'
    }
  ]
);

// Honest Comparison Table
body += L.compareTable(
  'erp-compare',
  'Custom vs. Commercial Subscription vs. Legacy',
  'Three pathways to operate an Australian business &mdash; compared objectively.',
  'The optimal decision depends on how unique your workflows are and your staffing trajectory. Here is how the models compare, using verified Australian market rates for reference.',
  ['Custom ERP (TechAuditPros)', 'Subscription SaaS (NetSuite / Pronto)', 'Legacy On-Premise Systems'],
  0,
  [
    [
      'Workflow Alignment',
      'Coded 100% around your exact business processes; zero generic compromises',
      'Configured within vendor limits; unique workflows require manual workarounds',
      'Deep functionality but rigid architecture; modifications require specialized consultants'
    ],
    [
      'Pricing Model',
      'One agreed monthly fee, all-in',
      'AU$120&ndash;AU$350 per user per month, plus partner implementation consulting',
      'Substantial upfront software licence plus 18&ndash;22% annual maintenance fees'
    ],
    [
      'Per-User Fees',
      '$0 &mdash; Add warehouse staff, machine operators, drivers, and subcontractors freely',
      'Every new hire increases your monthly software bill permanently',
      'Typically billed per named or concurrent workstation seat'
    ],
    [
      'Implementation Cadence',
      'First operational module live in 6&ndash;10 weeks; phased two-week sprints',
      'Commonly 6&ndash;14 months with external partner consulting invoices',
      'Frequently 12&ndash;18 months before company-wide adoption'
    ],
    [
      'Accounting &amp; Tax Sync',
      'Custom direct API sync for Xero, MYOB, and QuickBooks Online',
      'Pre-built marketplace connectors; custom workflows require middleware',
      'Batch file exports and manual CSV reconciliation'
    ],
    [
      'Australian Compliance',
      'ATO STP 2, automated 10% GST/BAS, SuperStream 11.5%/12%, and ABR integration built-in',
      'Dependent on Australian country localization packs and third-party modules',
      'Reliable baseline, but statutory compliance updates carry chargeable consulting fees'
    ],
    [
      'Post-Launch Evolution',
      'Included &mdash; your dedicated engineering team continually refines and adds features',
      'Submit feature requests to vendor roadmap or pay third-party developers',
      'Hourly change orders billed by specialized legacy software partners'
    ],
    [
      'Data Residency &amp; IP',
      'Your AWS Sydney (ap-southeast-2) cloud account; you own 100% of source code &amp; data',
      'Vendor-hosted multi-tenant cloud; data exportable on contract termination',
      'Hosted on your private physical servers with associated internal IT maintenance'
    ],
    [
      'Ideal For',
      'Mid-market Australian businesses with specialized processes or growing headcount',
      'Businesses with standard workflows and fixed administrative headcounts',
      'Organizations requiring closed physical network infrastructure'
    ]
  ],
  true,
  'Third-party figures reflect published Australian list prices and market rates as of September 2026 (Oracle NetSuite from AU$150/user/mo, Pronto Xi AU$180/user/mo, SAP Business One AU$140/user/mo, Microsoft Dynamics 365 AU$120/user/mo, MYOB Advanced AU$130/user/mo) and vary depending on modules, edition, and implementation partner. Our rate is fixed in writing before engineering starts.'
);

// 6-Step Build Process
body += L.processRow(
  'process',
  'How We Engineer Your System',
  'A structured 6-step roadmap from operational discovery to a live system.',
  [
    {
      h4: '1. Discovery &amp; Data Walkthrough',
      p: 'Your dedicated engineering team walks through your live spreadsheets, ERP exports, order forms, and daily bottlenecks with your staff &mdash; not a boilerplate sales questionnaire.'
    },
    {
      h4: '2. Architecture &amp; Prototype',
      p: 'We create the PostgreSQL relational schema and clickable interactive user interface prototypes for you to test and approve before any code is written.'
    },
    {
      h4: '3. Agile Two-Week Sprints',
      p: 'First working module deployed to a secure staging environment in 6&ndash;10 weeks; your team validates functionality with real data and steers sprint priorities.'
    },
    {
      h4: '4. Migration &amp; Xero/MYOB Sync',
      p: 'Clean migration of historical customer, product, and stock records, alongside verified live API synchronization with your Xero or MYOB accounting ledger.'
    },
    {
      h4: '5. Warehouse/Floor Go-Live &amp; Training',
      p: 'Intuitive touch and mobile interfaces, hands-on user training, and cut-over management with optional parallel running to ensure zero disruption to daily trade.'
    },
    {
      h4: '6. Continuous Evolution &amp; Reports',
      p: 'The same dedicated engineering team continues refining and extending your software every month, accompanied by a clear written report of everything deployed.'
    }
  ]
);

// Bespoke Animation Section 2: Interactive 3-Year TCO & Seat Calculator
const CALCULATOR_HTML = `
<section class="us-section" id="au-tco-calculator">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Interactive 3-Year TCO Calculator</p>
            <h2>Calculate Your 3-Year Savings: Custom vs. Subscription ERP</h2>
            <p class="us-lead">Compare the total cost of ownership across your team size. Subscription ERP per-seat fees accumulate rapidly &mdash; our custom ERP carries $0 user licences for life.</p>
        </div>

        <div class="au-calc-wrap">
            <div class="au-calc-selector">
                <span class="au-calc-label">Select Your Team Size:</span>
                <div class="au-calc-buttons">
                    <button type="button" class="au-calc-btn" data-seats="15">15 Users</button>
                    <button type="button" class="au-calc-btn active" data-seats="30">30 Users</button>
                    <button type="button" class="au-calc-btn" data-seats="50">50 Users</button>
                    <button type="button" class="au-calc-btn" data-seats="80">80 Users</button>
                </div>
            </div>

            <div class="au-calc-grid">
                <!-- Subscription Column -->
                <div class="au-calc-col sub">
                    <span class="au-calc-tag">Commercial Subscription ERP</span>
                    <h3 class="au-calc-vendor">NetSuite / Pronto Xi / Dynamics</h3>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Monthly Seat Licences</span>
                        <strong class="au-calc-metric-val" id="calcSubMonthly">AU$5,400 / mo</strong>
                        <span class="au-calc-metric-sub">Based on AU$180/user/mo industry average</span>
                    </div>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Typical Partner Implementation</span>
                        <strong class="au-calc-metric-val" id="calcSubImpl">AU$110,000</strong>
                        <span class="au-calc-metric-sub">Consultant configuration &amp; migration</span>
                    </div>
                    <div class="au-calc-total-box">
                        <span class="au-calc-total-lbl">Estimated 3-Year Total Cost (TCO)</span>
                        <strong class="au-calc-total-val" id="calcSubTotal">AU$304,400</strong>
                    </div>
                    <ul class="au-calc-list">
                        <li>Every new hire increases your monthly subscription</li>
                        <li>Warehouse staff often excluded to reduce seat costs</li>
                        <li>Vendor owns the cloud; ongoing fee increases</li>
                    </ul>
                </div>

                <!-- Custom Column (TechAuditPros) -->
                <div class="au-calc-col custom">
                    <span class="au-calc-tag highlight">TechAuditPros Custom ERP</span>
                    <h3 class="au-calc-vendor">Engineered for Your Business</h3>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Monthly Seat Licences</span>
                        <strong class="au-calc-metric-val highlight">$0 / mo (Unlimited Users)</strong>
                        <span class="au-calc-metric-sub">Include all warehouse, floor &amp; office staff</span>
                    </div>
                    <div class="au-calc-metric">
                        <span class="au-calc-metric-lbl">Upfront Implementation Invoices</span>
                        <strong class="au-calc-metric-val highlight">$0 Separate Implementation</strong>
                        <span class="au-calc-metric-sub">Scoped in your one agreed monthly fee</span>
                    </div>
                    <div class="au-calc-total-box highlight">
                        <span class="au-calc-total-lbl">Estimated 3-Year Savings</span>
                        <strong class="au-calc-total-val highlight" id="calcSavings">AU$140,000+ Saved</strong>
                    </div>
                    <ul class="au-calc-list">
                        <li>100% full IP and source code ownership</li>
                        <li>Hosted in your AWS Sydney account (APPs compliant)</li>
                        <li>Dedicated engineering team continuously improves it</li>
                    </ul>
                </div>
            </div>
            <p class="us-cost-note">Third-party figures are based on published Australian ERP subscription benchmarks and implementation partner averages as of September 2026. Custom ERP fees are agreed in writing before scoping begins.</p>
        </div>
    </div>
</section>
`;
body += CALCULATOR_HTML;

// Cost Grid
body += L.costGrid(
  'erp-cost',
  'Transparent Cost &amp; Timeline',
  'What ERP software truly costs in Australia &mdash; with verifiable numbers.',
  'Most enterprise software providers hide pricing behind sales qualification forms. Here is an honest, objective breakdown for an Australian mid-market business.',
  [
    {
      tag: 'Typical Australian Custom Agency',
      num: 'AU$80k&ndash;AU$250k+',
      sub: 'Upfront project quote, commonly billed',
      items: [
        '8 to 18 months before any operational module is usable',
        'Subsequent modifications billed at AU$180&ndash;AU$250/hr',
        'Client funds entire budget before seeing working software',
        'Separate monthly support retainers on top'
      ]
    },
    {
      tag: 'TechAuditPros Custom ERP',
      num: 'Let’s talk',
      sub: 'Scoped on the call and agreed in writing',
      hi: true,
      items: [
        'Dedicated engineering team from initial discovery through support',
        'Working first module in 6&ndash;10 weeks; complete system rolled out in phases',
        'Official Xero/MYOB integrations, historical data migration, and staff training included',
        'AWS Sydney cloud hosting in your own account; you own 100% of code',
        'Monthly written report of deploys; cancel or pause anytime'
      ]
    },
    {
      tag: 'Commercial Subscription SaaS',
      num: 'AU$150&ndash;AU$350',
      sub: 'Per user per month, plus implementation',
      items: [
        'Australian research shows all-in 3-year cost of AU$150,000&ndash;AU$450,000+',
        'Monthly bill rises automatically with every new hire and new location',
        'Workflows constrained to vendor model; custom adjustments cost extra',
        'Client data stored in vendor multi-tenant cloud'
      ]
    }
  ],
  'Third-party ranges reflect published Australian software pricing and consultant implementation fees as of September 2026, provided for orientation. Our monthly rate is agreed upon in writing before work begins.',
  true
);

// Promise Banner: Time-Zone Collaboration
body += L.promise({
  h2: 'Your Australian Working Day Overlaps Our Delivery Engine',
  p: 'Our engineering center in Kochi is strategically positioned for the Australian market. Kochi operates 4.5 hours behind Australian Eastern Standard Time (AEST &mdash; Sydney, Melbourne, Brisbane) and only 2.5 hours behind Australian Western Standard Time (AWST &mdash; Perth). You enjoy an uninterrupted live collaboration window every Australian afternoon for video reviews, Slack/Teams communications, and sprint demos. Tasks submitted during your morning are actively engineered during the afternoon, providing your company with a rapid delivery engine.',
  href: '#erp-faq',
  cta: 'Read the Australian ERP FAQ',
  img: 'female-developer-red-hair-dual-monitors-code.jpg',
  alt: 'A TechAuditPros systems engineer coding an Australian ERP module across dual monitors',
  w: 2400,
  h: 1601
});

// Industries Grid (with authentic photography)
body += L.industriesGrid(
  'erp-industries',
  'Industries We Serve in Australia',
  'Engineered for Australian businesses that outgrow off-the-shelf software.',
  'The same proven foundational core &mdash; inventory, orders, purchasing, job costing, ATO payroll, and accounting sync &mdash; tailored to each sector’s exact physical reality.',
  [
    {
      img: 'istock-2155877725-factory-engineers-hardhats-tablet.jpg',
      alt: 'Australian manufacturing engineers reviewing production status on a tablet',
      w: 612,
      h: 408,
      h4: 'Manufacturing &amp; Engineering',
      p: 'Multi-tier bills of materials, work orders, routing, and machine touch kiosks &mdash; complete manufacturing resource planning without per-user licensing penalties.'
    },
    {
      img: 'istock-2189585598-electronics-factory-engineers-laptop.jpg',
      alt: 'Australian wholesale distribution team reviewing inventory on laptop in warehouse',
      w: 612,
      h: 344,
      h4: 'Wholesale &amp; Building Supplies',
      p: 'Multi-location warehouse stock, trade pricing tiers, mobile barcode scanning, and landed cost calculation including Australian customs and freight.'
    },
    {
      img: 'istock-1496103633-healthcare-nurse-tablet-hologram.jpg',
      alt: 'Healthcare operations professional reviewing clinic supplies on tablet',
      w: 612,
      h: 375,
      h4: 'Healthcare &amp; Food Processing',
      p: 'Batch sizing, recipe management, forward/backward lot traceability, and expiry date management complying with Australian regulatory frameworks.'
    },
    {
      img: 'istock-2196870531-consultants-walking-tablet-corridor.jpg',
      alt: 'Commercial contractors reviewing job costing dashboard in modern office',
      w: 612,
      h: 408,
      h4: 'Commercial Contracting &amp; Trades',
      p: 'Job estimating, field crew allocations, plant hire tracking, and progress claim invoicing seamlessly synced into Xero or MYOB.'
    }
  ],
  false
);

// FAQ Section
body += L.faqHtml(
  'erp-faq',
  'Frequently Asked Questions',
  'Custom ERP Development in Australia: Answers to Key Questions',
  faqs,
  'Everything Australian directors and operations leaders ask about our engineering, compliance, data sovereignty, and pricing models.'
);

// 9. Apply Body
s = L.setBody(s, body);

// 10. Final CTA
s = L.setFinalCta(
  s,
  'Let’s map your Australian operations and scope the build.',
  'Takes 60 seconds &middot; Scoped in AUD &middot; No long-term lock-in contract'
);

// 11. Add Bespoke CSS for Interactive Components (Pipeline + Calculator)
const EXTRA_AU_CSS = `
  /* ---------- Bespoke Australian ERP Interactivity & Animations ---------- */
  .au-pipeline-wrap{ margin-top:36px; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:32px 28px; position:relative; overflow:hidden; }
  .au-pipeline-svg-box{ width:100%; height:50px; position:relative; display:none; }
  @media(min-width:900px){ .au-pipeline-svg-box{ display:block; } }
  .au-pipeline-svg-box svg{ width:100%; height:100%; overflow:visible; }
  .au-pipe-base{ stroke:var(--line); stroke-width:3; stroke-dasharray:6 6; }
  .au-pipe-flow{ stroke:var(--orange); stroke-width:3; stroke-dasharray:12 180; stroke-dashoffset:0; animation:auFlowDash 6s linear infinite; }
  @keyframes auFlowDash{ to{ stroke-dashoffset:-384; } }
  
  .au-pipeline-steps{ display:grid; grid-template-columns:repeat(5, 1fr); gap:16px; position:relative; z-index:2; margin-top:-20px; }
  @media(max-width:1000px){ .au-pipeline-steps{ grid-template-columns:repeat(2, 1fr); margin-top:0; } }
  @media(max-width:600px){ .au-pipeline-steps{ grid-template-columns:1fr; } }
  
  .au-pipe-step{ background:var(--paper-alt); border:1px solid var(--line); border-radius:12px; padding:20px 16px; transition:all .2s ease; cursor:pointer; display:flex; flex-direction:column; }
  .au-pipe-step:hover, .au-pipe-step.active{ background:var(--paper); border-color:var(--orange); transform:translateY(-3px); box-shadow:var(--shadow-md); }
  .au-pipe-step.active .au-pipe-node{ background:var(--orange); color:#fff; }
  .au-pipe-node{ width:36px; height:36px; border-radius:50%; background:var(--navy-deep); color:var(--orange); font-family:var(--font-mono); font-weight:700; font-size:.85rem; display:flex; align-items:center; justify-content:center; margin-bottom:14px; transition:all .2s ease; }
  .au-pipe-step h4{ font-size:.96rem; margin:0 0 8px; color:var(--ink); }
  .au-pipe-step p{ font-size:.82rem; color:var(--ink-soft); line-height:1.5; margin:0 0 12px; flex-grow:1; }
  .au-pipe-tag{ align-self:flex-start; font-family:var(--font-mono); font-size:.65rem; text-transform:uppercase; letter-spacing:.08em; padding:3px 8px; border-radius:4px; background:var(--orange-tint); color:var(--orange-dark); font-weight:600; }
  
  .au-pipeline-payload{ margin-top:24px; background:var(--navy-deep); border-radius:12px; padding:20px 24px; border:1px solid rgba(255,255,255,.08); }
  .au-payload-head{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
  .au-payload-indicator{ width:10px; height:10px; border-radius:50%; background:#10B981; box-shadow:0 0 10px #10B981; }
  .au-payload-title{ font-family:var(--font-mono); font-size:.82rem; color:rgba(255,255,255,.75); }
  .au-payload-title strong{ color:#fff; }
  .au-payload-code{ font-family:var(--font-mono); font-size:.8rem; color:#A7F3D0; line-height:1.6; white-space:pre-wrap; margin:0; }

  /* TCO Calculator */
  .au-calc-wrap{ margin-top:36px; background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:36px 30px; }
  .au-calc-selector{ display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:30px; border-bottom:1px solid var(--line); padding-bottom:24px; }
  .au-calc-label{ font-family:var(--font-mono); font-size:.82rem; font-weight:600; text-transform:uppercase; letter-spacing:.1em; color:var(--ink); }
  .au-calc-buttons{ display:flex; gap:10px; flex-wrap:wrap; }
  .au-calc-btn{ font-family:var(--font-mono); font-size:.82rem; font-weight:600; padding:9px 18px; border-radius:8px; border:1px solid var(--line); background:var(--paper-alt); color:var(--ink-soft); cursor:pointer; transition:all .15s ease; }
  .au-calc-btn:hover{ border-color:var(--ink-faint); color:var(--ink); }
  .au-calc-btn.active{ background:var(--navy-deep); color:#fff; border-color:var(--navy-deep); }
  
  .au-calc-grid{ display:grid; grid-template-columns:1fr 1fr; gap:26px; }
  @media(max-width:820px){ .au-calc-grid{ grid-template-columns:1fr; } }
  .au-calc-col{ border:1px solid var(--line); border-radius:14px; padding:28px 24px; background:var(--paper); display:flex; flex-direction:column; gap:16px; }
  .au-calc-col.sub{ background:var(--paper-alt); }
  .au-calc-col.custom{ border-color:var(--orange); box-shadow:var(--shadow-md); position:relative; }
  .au-calc-tag{ font-family:var(--font-mono); font-size:.68rem; text-transform:uppercase; letter-spacing:.1em; color:var(--ink-faint); font-weight:600; }
  .au-calc-tag.highlight{ color:var(--orange-dark); }
  .au-calc-vendor{ font-size:1.18rem; margin:0; color:var(--ink); }
  .au-calc-metric{ padding:12px 0; border-top:1px dashed var(--line); }
  .au-calc-metric-lbl{ font-size:.78rem; color:var(--ink-faint); display:block; margin-bottom:4px; }
  .au-calc-metric-val{ font-family:var(--font-mono); font-size:1.4rem; color:var(--ink); font-weight:700; display:block; }
  .au-calc-metric-val.highlight{ color:var(--orange-dark); }
  .au-calc-metric-sub{ font-size:.76rem; color:var(--ink-soft); display:block; margin-top:3px; }
  .au-calc-total-box{ margin-top:auto; padding:18px 20px; border-radius:10px; background:rgba(11,32,54,.04); border:1px solid var(--line); }
  .au-calc-total-box.highlight{ background:var(--orange-tint); border-color:rgba(217,83,30,.3); }
  .au-calc-total-lbl{ font-size:.75rem; text-transform:uppercase; font-family:var(--font-mono); letter-spacing:.08em; color:var(--ink-faint); display:block; margin-bottom:6px; }
  .au-calc-total-val{ font-family:var(--font-mono); font-size:1.65rem; color:var(--ink); font-weight:700; display:block; }
  .au-calc-total-val.highlight{ color:var(--orange-dark); }
  .au-calc-list{ margin:14px 0 0; padding-left:18px; font-size:.85rem; color:var(--ink-soft); line-height:1.55; }
  .au-calc-list li{ margin-bottom:6px; }
`;

// Inject CSS into head
s = s.replace('</head>', `<style>${EXTRA_AU_CSS}</style>\n</head>`);

// 12. Add Bespoke Client-Side JS for Pipeline & Calculator Interactivity
const EXTRA_AU_JS = `
<script>
(function(){
    // 1. Operational Pipeline Interactive Payloads
    var payloads = {
        '1': {
            title: '01 • B2B Quote & Trade Order Ingestion',
            code: '{\\n  "event": "order.approved",\\n  "customer": "Southern Cross Fabrication Pty Ltd",\\n  "abn": "48 123 456 789 (Verified Active ABR)",\\n  "tradeCredit": "Approved (30 Days EOM)",\\n  "items": 4,\\n  "subtotal": "AU$14,850.00",\\n  "gst10": "AU$1,485.00",\\n  "total": "AU$16,335.00",\\n  "routing": "Auto-Dispatched to MRP & BOM Engine"\\n}'
        },
        '2': {
            title: '02 • Automated BOM & MRP Allocation',
            code: '{\\n  "workOrder": "WO-2026-089",\\n  "assembly": "Heavy-Duty Hydraulic Conveyor Unit",\\n  "bomRevision": "v3.2 (Approved)",\\n  "stockAllocated": "92% Parts In-Stock (Sydney Hub)",\\n  "autoPO": "PO-9912 Sent to BlueScope Steel for 4x Beams",\\n  "estimatedCompletion": "4 Business Days",\\n  "wipLedger": "Allocated to AWS Sydney Database"\\n}'
        },
        '3': {
            title: '03 • Barcode WMS Pick & Serial Tracking',
            code: '{\\n  "wmsStation": "Bay 4 • Aisle 12 (Brisbane DC)",\\n  "scannerId": "RF-Terminal-08",\\n  "operator": "Sarah M.",\\n  "action": "Scan Verified • Lot #AU-26-8841",\\n  "status": "Pick Confirmed (100% Accuracy)",\\n  "inventorySync": "Live Deduction across All 4 Depots",\\n  "carrierDispatch": "Direct Integration with StarTrack / Toll"\\n}'
        },
        '4': {
            title: '04 • Shop Floor Machine Kiosks & ATO STP 2',
            code: '{\\n  "workstation": "CNC Plasma Cutter 02",\\n  "runtimeLogged": "3.5 hrs (Machine Direct)",\\n  "operatorHours": "7.6 hrs (Single Touch Payroll 2)",\\n  "payEvent": "STP Phase 2 Disaggregated Gross",\\n  "superannuation": "11.5% SG Allocated to Clearing House",\\n  "labourVariance": "0.4 hrs Under Quoted Plan"\\n}'
        },
        '5': {
            title: '05 • Two-Way Xero & MYOB Financial Reconciliation',
            code: '{\\n  "syncTarget": "Xero / MYOB API",\\n  "taxInvoice": "INV-2026-4421 Dispatched to Debtor",\\n  "cogsRecognised": "AU$8,940.00",\\n  "gstReported": "AU$1,485.00 (BAS G1 & 1A Ledger)",\\n  "trueGrossMargin": "39.8% (Quoted 38.0%)",\\n  "reconciliation": "Bank Feed Matched Automatically"\\n}'
        }
    };

    var steps = document.querySelectorAll('.au-pipe-step');
    var titleEl = document.getElementById('auPayloadTitle');
    var codeEl = document.getElementById('auPayloadCode');

    steps.forEach(function(st){
        st.addEventListener('click', function(){
            steps.forEach(function(s){ s.classList.remove('active'); });
            this.classList.add('active');
            var stepNum = this.getAttribute('data-step');
            if (payloads[stepNum]) {
                if (titleEl) titleEl.innerHTML = payloads[stepNum].title;
                if (codeEl) codeEl.textContent = payloads[stepNum].code;
            }
        });
    });

    // 2. Interactive 3-Year TCO & Seat Calculator
    var seatData = {
        '15': { subMo: 'AU$2,700 / mo', subImpl: 'AU$75,000', subTot: 'AU$172,200', savings: 'AU$85,000+ Saved' },
        '30': { subMo: 'AU$5,400 / mo', subImpl: 'AU$110,000', subTot: 'AU$304,400', savings: 'AU$140,000+ Saved' },
        '50': { subMo: 'AU$9,000 / mo', subImpl: 'AU$150,000', subTot: 'AU$474,000', savings: 'AU$235,000+ Saved' },
        '80': { subMo: 'AU$14,400 / mo', subImpl: 'AU$180,000', subTot: 'AU$698,400', savings: 'AU$410,000+ Saved' }
    };

    var calcBtns = document.querySelectorAll('.au-calc-btn');
    var subMoEl = document.getElementById('calcSubMonthly');
    var subImplEl = document.getElementById('calcSubImpl');
    var subTotEl = document.getElementById('calcSubTotal');
    var savEl = document.getElementById('calcSavings');

    calcBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            calcBtns.forEach(function(b){ b.classList.remove('active'); });
            this.classList.add('active');
            var seats = this.getAttribute('data-seats');
            if (seatData[seats]) {
                if (subMoEl) subMoEl.textContent = seatData[seats].subMo;
                if (subImplEl) subImplEl.textContent = seatData[seats].subImpl;
                if (subTotEl) subTotEl.textContent = seatData[seats].subTot;
                if (savEl) savEl.textContent = seatData[seats].savings;
            }
        });
    });
})();
</script>
`;

s = s.replace('</body>', `${EXTRA_AU_JS}\n</body>`);

// 13. Ensure British / Australian Spelling (no leakage to CSS/JS)
s = L.ukSpelling(s);

// 14. Sanity Checks & Assertions
L.must(s, 'href="/au/erp/"');
L.must(s, 'href="/au/website-development/"');
L.must(s, 'href="/au/seo-services/"');
L.must(s, 'Single Touch Payroll');
L.must(s, 'ap-southeast-2');
L.must(s, 'Xero and MYOB');
L.must(s, 'Privacy Act 1988');
L.must(s, 'one agreed monthly fee');
L.must(s, '$0 per-seat');

// Write out to au/erp/index.html
const destPath = path.join(repoRoot, 'au', 'erp', 'index.html');
fs.mkdirSync(path.dirname(destPath), { recursive: true });
if ((s.match(/\r\n/g) || []).length > 100) s = s.replace(/\r?\n/g, '\r\n');
fs.writeFileSync(destPath, s);
console.log('Successfully wrote au/erp/index.html', (s.length / 1024).toFixed(0) + 'KB');

// Also save permanent generator script to scripts/country-pages/au_erp.js
const scriptDest = path.join(repoRoot, 'scripts', 'country-pages', 'au_erp.js');
const scriptContent = fs.readFileSync(__filename, 'utf8')
  .replace("const repoRoot = path.resolve(__dirname, '..', '..');", "const repoRoot = path.resolve(__dirname, '..', '..');");
fs.writeFileSync(scriptDest, scriptContent);
console.log('Successfully wrote scripts/country-pages/au_erp.js');
