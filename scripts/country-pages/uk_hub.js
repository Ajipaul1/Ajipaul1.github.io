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
  title: "UK Website Development, ERP Software &amp; SEO | TechAuditPros",
  desc: "Custom ERP, website development and SEO for UK businesses: MTD-ready VAT records, UK GDPR hosting in London, GBP invoices. Built by a team in Kochi, India.",
  url: URL,
  hreflang: [{ lang: 'en-gb', href: URL }, { lang: 'en-us', href: 'https://techauditpros.com/us/' }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }],
});

const faqs = [
  {
    "q": "Is TechAuditPros a UK company?",
    "a": "No. TechAuditPros is registered in Kerala, India (GSTIN 32CXYPP6750P1ZC), and works for UK businesses remotely from Kochi. There is no UK office and no UK-registered entity, and we would rather you read that here than discover it in a proposal."
  },
  {
    "q": "Do you add UK VAT to your invoices?",
    "a": "No. Invoices are in pounds sterling with no UK VAT on them. Because we belong outside the UK and you receive the service here, a VAT-registered UK business applies the reverse charge &mdash; it records output tax on the value and reclaims it as input tax on the same return, as <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\" target=\"_blank\" rel=\"noopener\">VAT Notice 741A, section 5</a> describes. If you are not yet VAT-registered, reverse-charge services <a href=\"https://www.gov.uk/vat-registration/calculate-turnover\" target=\"_blank\" rel=\"noopener\">count towards your taxable turnover</a> for the &pound;90,000 threshold, so tell your accountant."
  },
  {
    "q": "Will a custom ERP work with Making Tax Digital?",
    "a": "Yes, by design rather than by adding a filing route. The ERP keeps VAT records digitally from order to invoice and passes them to the accounting package you already file from, which submits the return through its HMRC connection &mdash; <a href=\"https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-vat\" target=\"_blank\" rel=\"noopener\">HMRC requires every VAT-registered business</a> to keep digital records and file through compatible software. The same approach carries over to <a href=\"https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax\" target=\"_blank\" rel=\"noopener\">MTD for Income Tax</a>, which started on 6 April 2026 for sole traders and landlords with qualifying income over &pound;50,000."
  },
  {
    "q": "Where is our data hosted, and can engineers in India access it under UK GDPR?",
    "a": "The data sits in a London cloud region inside an account you own. Remote access from India counts as a restricted transfer, because <a href=\"https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/adequacy-regulations/is-the-restricted-transfer-covered-by-adequacy-regulations/\" target=\"_blank\" rel=\"noopener\">India has no UK adequacy regulations</a>, so we put the ICO&rsquo;s <a href=\"https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/appropriate-safeguards/what-are-standard-data-protection-clauses-the-uk-idta-and-the-addendum/\" target=\"_blank\" rel=\"noopener\">International Data Transfer Agreement or the Addendum</a> in place, together with a data processing agreement that names you as controller and us as processor."
  },
  {
    "q": "Do the 2026 cookie rule changes affect our website?",
    "a": "Yes, mostly in your favour. Since 5 February 2026, <a href=\"https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/\" target=\"_blank\" rel=\"noopener\">first-party analytics used only to improve your own site</a> no longer needs consent under PECR, provided visitors are told and can object; advertising and cross-site tracking still need consent, and <a href=\"https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2026/02/key-aspects-of-the-data--use-and-access--act-take-effect.html\" target=\"_blank\" rel=\"noopener\">PECR fines now reach &pound;17.5 million or 4% of global turnover</a>. We draw the banner along that line instead of blocking everything or nothing."
  },
  {
    "q": "How much does it cost?",
    "a": "ERP, web and search work are scoped on a call and put in writing as one agreed monthly fee in pounds, with no per-seat licences, no upfront project fee and no minimum term. Two packages carry fixed prices, and they are shown near the top of this page."
  },
  {
    "q": "How do UK and India working hours overlap?",
    "a": "Kochi is four and a half hours ahead of the UK in British Summer Time and five and a half hours ahead in GMT, because India does not change its clocks. A 10:00 call in London is 14:30 in Kochi in summer and 15:30 in winter, and <a href=\"https://www.gov.uk/when-do-the-clocks-change\" target=\"_blank\" rel=\"noopener\">the UK clocks next change</a> on 25 October 2026 and 28 March 2027."
  },
  {
    "q": "Do you handle Scottish, Welsh and Northern Ireland differences?",
    "a": "Yes, where they touch the system: <a href=\"https://www.gov.uk/tax-codes/what-your-tax-code-means\" target=\"_blank\" rel=\"noopener\">S and C tax-code prefixes</a> carried through to payroll exports, and a separate XI VAT identity for a Northern Ireland business that <a href=\"https://www.gov.uk/register-for-vat/selling-or-moving-goods-between-northern-ireland-and-the-eu\" target=\"_blank\" rel=\"noopener\">moves goods to or from the EU</a> under the Windsor Framework. If none of that applies to you, none of it gets built."
  },
  {
    "q": "Do you have UK clients we can speak to?",
    "a": "Not yet, and we would rather say so here. Everything we can show is in Kerala: the Viraat Marine shipyard ERP (live in 45 days, 19 role desks), the Telgo Power Projects website and the Telgo site staff app. On a call we open them with you and scope your work against your own data before you commit to anything."
  },
  {
    "q": "Which parts of the UK do you cover?",
    "a": "All of it, remotely. London, Manchester, Reading and the Thames Valley, and Scotland have their own pages because buyers there ask for different things; everywhere else is served from this one. If you need someone on site every week, we are the wrong fit, and you will hear that before any proposal is written."
  },
  {
    "q": "How do we start?",
    "a": "Book a free strategy call and bring whichever hurts most: a recent VAT return summary, your current website, or the spreadsheet that really runs the business. We will tell you where the leverage is &mdash; and whether you need us at all yet."
  }
];

s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United Kingdom', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to Britain.', 'UK');

const hero = `
            <p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">From Kochi, India &mdash; for businesses across the UK</span></p>
            <h1>UK Website Development, ERP Software &amp; <span id="heroRotate" class="hero-rotate"><span class="hero-rotate-text">SEO.</span></span></h1>
            <p class="hero-subtitle">ERP that keeps the VAT records Making Tax Digital asks for, websites hosted in a London cloud region and built to UK GDPR and PECR, and search work written for Google UK and AI answers &mdash; engineered by one team in Kochi, Kerala, invoiced in pounds, with no minimum term.</p>
            <div class="hero-actions">
                <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="#services" class="btn-ghost">Compare the three services</a>
            </div>
            <div class="hero-features-list">
                <div class="hero-feature-item">🧾 MTD-Ready VAT Records</div>
                <div class="hero-feature-item">🇬🇧 Data Hosted in London</div>
                <div class="hero-feature-item">💷 GBP Invoices, No UK VAT</div>
                <div class="hero-feature-item">🔓 Month to Month</div>
            </div>
            <div class="trust-strip">
                <div class="trust-item"><span class="num">45 days</span><span class="lbl">Shipyard ERP, first line to live</span></div>
                <div class="trust-item"><span class="num">19</span><span class="lbl">Role desks live at the yard</span></div>
                <div class="trust-item"><span class="num">2</span><span class="lbl">Client systems live today</span></div>
                <div class="trust-item"><span class="num">GST</span><span class="lbl">Registered business, Kerala</span></div>
            </div>
        </div>
    </div>
    </div>
</section>

`;
s = L.replaceBetween(s, '<div class="hero-main-content">', '<section class="tap-answer-section">', hero, { keepStart: true, keepEnd: true });

s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, `rotateText('heroRotate', [
        'SEO.',
        'AEO &amp; GEO.',
        'MTD-Ready VAT Records.',
        'London-Hosted Data.'
    ], 2600, 0);`);
s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, `rotateText('heroEyebrowRotate', [
        'From Kochi, India — for businesses across the UK',
        'GBP invoices, reverse-charge VAT',
        'UK GDPR, data kept in London',
        'England &bull; Scotland &bull; Wales &bull; Northern Ireland'
    ], 3200, 1200);`);
L.must(s, 'MTD-Ready VAT Records.', 1); L.must(s, 'for businesses across the UK', 2);

let body = '';
body += L.answer("<strong>TechAuditPros</strong> is a software and search team in Kochi, Kerala, that builds three things for UK businesses: <strong>custom ERP systems</strong> that run stock, orders, production and job costing and hand clean VAT figures to Xero, Sage or QuickBooks for Making Tax Digital; <strong>websites</strong> engineered for speed, accessibility and the PECR consent rules; and <strong>SEO, AEO and GEO</strong>, so a page ranks on Google UK and gets quoted in AI answers. There is no UK office. Invoices are in pounds sterling without UK VAT &mdash; a VAT-registered buyer applies the reverse charge &mdash; and UK data sits in a London region inside an account you own.");

body += `<section class="tap-promise-section">
    <div class="container promise-grid">
        <div class="promise-content">
            <h2>Why do the next UK deadlines favour one team for the website, the ERP and search?</h2>
            <p>Because each of them assumes your records are digital and joined up. <a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax" target="_blank" rel="noopener">Making Tax Digital for Income Tax</a> began on 6 April 2026 for sole traders and landlords with qualifying income over &pound;50,000; from April 2028 <a href="https://www.gov.uk/government/news/companies-house-to-bring-in-changes-to-accounts-filing-from-april-2028" target="_blank" rel="noopener">Companies House will take accounts only through commercial software</a>; and the government has confirmed <a href="https://www.gov.uk/government/consultations/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector/outcome/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector-consultation-response" target="_blank" rel="noopener">mandatory e-invoicing for all VAT invoices from 2029</a>. When the site takes the order, the ERP holds it and your accounts package files it, one team can keep the three in step &mdash; instead of three suppliers each owning a piece and nobody owning the joins.</p>
            <a href="#services" class="btn-navy">How Each Service Handles It</a>
        </div>
        <div class="promise-media">
            <img src="/assets/images/library/team-standing-document-review-bright-room.jpg" alt="A team reviewing system documentation together in a bright meeting room" width="2400" height="1601" loading="lazy" srcset="/assets/images/library/team-standing-document-review-bright-room-700.jpg 700w, /assets/images/library/team-standing-document-review-bright-room-1400.jpg 1400w, /assets/images/library/team-standing-document-review-bright-room.jpg 2400w" sizes="(max-width:700px) 100vw, 760px" decoding="async" />
        </div>
    </div>
</section>

`;

body += `<section class="tap-pillars-section" id="services">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">ERP &middot; Web &middot; Search</p>
            <h2>Three services, each built for UK rules rather than adapted from a US template.</h2>
        </div>
        <div class="pillars-grid">
            <a href="/uk/erp/" class="pillar-card">
                <span class="pillar-index">01 / ERP</span>
                <h3>Custom ERP Software</h3>
                <p>Stock, works orders, purchasing and job costing in one system of record. VAT figures pass to Xero, Sage or QuickBooks, so the return still reaches HMRC through software HMRC accepts, and stock and WIP are structured for an FRS 102 year end.</p>
                <div class="pillar-specs">
                    <div><span>Hands VAT to</span><span>Xero &middot; Sage &middot; QuickBooks</span></div>
                    <div><span>First module</span><span>6&ndash;10 weeks</span></div>
                </div>
                <span class="pillar-link">Custom ERP for UK firms &rarr;</span>
            </a>
            <a href="/uk/website-development/" class="pillar-card">
                <span class="pillar-index">02 / WEB</span>
                <h3>Website Design &amp; Development</h3>
                <p>Next.js and React sites with a cookie banner drawn to PECR as amended in February 2026, hosting in a UK region, WCAG 2.2 AA practices, and British spelling in the copy and the structured data alike.</p>
                <div class="pillar-specs">
                    <div><span>Hosting</span><span>London region</span></div>
                    <div><span>First live version</span><span>4&ndash;8 weeks</span></div>
                </div>
                <span class="pillar-link">UK website development &rarr;</span>
            </a>
            <a href="/uk/seo-services/" class="pillar-card">
                <span class="pillar-index">03 / SEO</span>
                <h3>SEO, AEO &amp; GEO</h3>
                <p>Technical, local and content work aimed at Google UK searchers, plus the answer-engine work that gets a page quoted in AI Overviews, ChatGPT and Perplexity &mdash; reported every month in writing.</p>
                <div class="pillar-specs">
                    <div><span>Aims at</span><span>Google UK &middot; AI answers</span></div>
                    <div><span>Reporting</span><span>Monthly, in writing</span></div>
                </div>
                <span class="pillar-link">UK SEO services &rarr;</span>
            </a>
        </div>
    </div>
</section>

<section id="regions" class="uk-nations">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">England &middot; Scotland &middot; Wales &middot; Northern Ireland</p>
            <h2>Does it matter which UK nation your business is in?</h2>
            <p>For most of the system, no. For payroll tax codes and for VAT on goods it does &mdash; and those are exactly the fields a generic package tends to get wrong.</p>
        </div>
        <div class="ukn-grid">
            <article class="ukn-card">
                <span class="ukn-code" aria-hidden="true">GB</span>
                <h3>England</h3>
                <p>The default every UK package assumes: rest-of-UK income tax rates and a GB-prefixed VAT number. If your staff and stock are all in England, none of the extra fields on this row get built.</p>
            </article>
            <article class="ukn-card">
                <span class="ukn-code" aria-hidden="true">S</span>
                <h3>Scotland</h3>
                <p>People who live in Scotland pay <a href="https://www.gov.uk/scottish-income-tax" target="_blank" rel="noopener">Scottish Income Tax</a> &mdash; six bands from 19% to 48% in 2026 to 2027 &mdash; and HMRC starts their <a href="https://www.gov.uk/tax-codes/what-your-tax-code-means" target="_blank" rel="noopener">tax code with an S</a>. We carry that code from the employee record to the payroll export untouched.</p>
            </article>
            <article class="ukn-card">
                <span class="ukn-code" aria-hidden="true">C</span>
                <h3>Wales</h3>
                <p><a href="https://www.gov.uk/welsh-income-tax" target="_blank" rel="noopener">Welsh rates of Income Tax</a> apply to people who live in Wales, and HMRC adds a C to the start of their tax code. Same rule here: the code travels with the person, and nobody re-types it at the month end.</p>
            </article>
            <article class="ukn-card">
                <span class="ukn-code" aria-hidden="true">XI</span>
                <h3>Northern Ireland</h3>
                <p>Under the Windsor Framework, a business moving goods between Northern Ireland and the EU <a href="https://www.gov.uk/register-for-vat/selling-or-moving-goods-between-northern-ireland-and-the-eu" target="_blank" rel="noopener">uses an XI prefix on its VAT number</a> on those invoices. We build the ERP to hold both identities and pick the right one on each order.</p>
            </article>
        </div>
        <p class="ukn-more">Buying for a business outside the UK? The same team keeps separate pages for <a href="/us/">the United States</a>, <a href="/ca/">Canada</a>, <a href="/au/">Australia</a>, <a href="/ae/">the UAE</a> and <a href="/in/">India</a>.</p>
    </div>
</section>

<section id="compare" class="uk-ask">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Before You Sign Anything</p>
            <h2>What should a UK business ask a software or SEO supplier before signing?</h2>
            <p>Six questions separate most suppliers in a single call: where the data lives, how VAT reaches HMRC, who owns what, what a change costs, who you talk to, and how you leave. These are ours, answered in advance.</p>
        </div>
        <ol class="uk-ask-list">
            <li>
                <h3>Where is personal data stored, and what covers access from abroad?</h3>
                <p>In a London cloud region &mdash; AWS eu-west-2 or Google Cloud europe-west2 &mdash; inside an account registered to you. India is not on the <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/adequacy-regulations/is-the-restricted-transfer-covered-by-adequacy-regulations/" target="_blank" rel="noopener">UK adequacy list</a>, so our engineers&rsquo; access is a restricted transfer, covered by the ICO&rsquo;s <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/appropriate-safeguards/what-are-standard-data-protection-clauses-the-uk-idta-and-the-addendum/" target="_blank" rel="noopener">IDTA or the Addendum</a> alongside a data processing agreement.</p>
            </li>
            <li>
                <h3>How do the VAT figures reach HMRC?</h3>
                <p>Through the accounting package you already file from. The ERP keeps the digital records; Xero, Sage or QuickBooks submits the return through its own connection, as <a href="https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-vat" target="_blank" rel="noopener">MTD for VAT</a> requires. We do not build a second route to HMRC.</p>
            </li>
            <li>
                <h3>Who owns the code, the domain and the cloud accounts?</h3>
                <p>You do, from the first commit. Repositories, databases, domains and hosting sit in accounts in your company&rsquo;s name, so there is nothing to hand back if you ever leave.</p>
            </li>
            <li>
                <h3>What does a change cost once the system is live?</h3>
                <p>Nothing on top: changes and new pages sit inside the agreed monthly fee. There are no hourly change-request invoices and no separate support retainer to negotiate later.</p>
            </li>
            <li>
                <h3>Who will we actually speak to?</h3>
                <p>The people building it, on Teams, Slack or a call during your working day. Nobody sits in between relaying messages, and nothing gets lost in a ticket queue.</p>
            </li>
            <li>
                <h3>How do we leave, and what do we keep?</h3>
                <p>At the end of any month, with the code, the data and the documentation. There is no minimum term and no exit fee, which is also why we have to keep earning the next month.</p>
            </li>
        </ol>
    </div>
</section>

`;

body += `<section id="how-it-works" class="us-section us-section-alt">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">GMT, BST and IST</p>
            <h2>What time is it in Kochi when you are at your desk in the UK?</h2>
            <p class="us-lead">Kochi is four and a half hours ahead of the UK during British Summer Time and five and a half hours ahead during GMT. India does not change its clocks, so only the UK side moves &mdash; next on <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener">25 October 2026 and 28 March 2027</a>.</p>
        </div>
        <div class="uk-clock" role="table" aria-label="UK time against Kochi time">
            <div class="ukc-row ukc-hd" role="row"><span role="columnheader">In the UK</span><span role="columnheader">Kochi, summer (BST)</span><span role="columnheader">Kochi, winter (GMT)</span><span role="columnheader">What the slot is for</span></div>
            <div class="ukc-row" role="row"><span role="cell" class="t">09:00</span><span role="cell">13:30</span><span role="cell">14:30</span><span role="cell">Stand-up, and decisions on the staging build made overnight</span></div>
            <div class="ukc-row" role="row"><span role="cell" class="t">11:00</span><span role="cell">15:30</span><span role="cell">16:30</span><span role="cell">Workshops, screen-shares and data walkthroughs</span></div>
            <div class="ukc-row" role="row"><span role="cell" class="t">13:00</span><span role="cell">17:30</span><span role="cell">18:30</span><span role="cell">Early-afternoon questions and sign-offs</span></div>
            <div class="ukc-row" role="row"><span role="cell" class="t">17:30</span><span role="cell">22:00</span><span role="cell">23:00</span><span role="cell">Leave feedback; it is first on the list when Kochi starts, before the UK is awake</span></div>
        </div>
        <p class="uk-clock-note">Invites go out in UK time, so nobody has to recalculate twice a year.</p>
    </div>
</section>

`;

body += `<section class="tap-promise-section">
    <div class="container promise-grid">
        <div class="promise-content">
            <h2>What paperwork comes with a UK engagement?</h2>
            <p>Four documents, all in plain English. A mutual NDA before we see anything; a statement of work with the scope, the dates and the agreed monthly fee in pounds; a UK GDPR data processing agreement, with the IDTA or Addendum attached wherever we touch personal data; and a sterling invoice each month with no UK VAT on it, which your accountant handles under the reverse charge described in <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a" target="_blank" rel="noopener">HMRC&rsquo;s VAT Notice 741A</a>.</p>
            <a href="#contact" class="btn-navy">Talk It Through on a Call</a>
        </div>
        <div class="promise-media">
            <img src="/assets/images/library/mentor-explaining-data-on-monitor-warm-office.jpg" alt="Two people going through figures together on a monitor" width="1344" height="1335" loading="lazy" srcset="/assets/images/library/mentor-explaining-data-on-monitor-warm-office-700.jpg 700w, /assets/images/library/mentor-explaining-data-on-monitor-warm-office.jpg 1344w" sizes="(max-width:700px) 100vw, 760px" decoding="async" />
        </div>
    </div>
</section>

`;

body += `<section class="tap-numbers-section uk-dates" id="results" aria-label="UK dates your systems have to meet">
    <div class="container numbers-grid">
        <div class="number-stat-item"><div class="num">&pound;90,000</div><div class="label">VAT registration threshold, rolling 12 months</div></div>
        <div class="number-stat-item"><div class="num">6 Apr 2026</div><div class="label">MTD for Income Tax began, qualifying income over &pound;50,000</div></div>
        <div class="number-stat-item"><div class="num">5 Feb 2026</div><div class="label">PECR fines raised to &pound;17.5m or 4% of global turnover</div></div>
        <div class="number-stat-item"><div class="num">Apr 2028</div><div class="label">Companies House accounts by commercial software only</div></div>
    </div>
    <div class="container"><p class="uk-dates-src">Sources: <a href="https://www.gov.uk/vat-registration/when-to-register" target="_blank" rel="noopener">HMRC, when to register for VAT</a> &middot; <a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax" target="_blank" rel="noopener">HMRC, MTD for Income Tax</a> &middot; <a href="https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2026/02/key-aspects-of-the-data--use-and-access--act-take-effect.html" target="_blank" rel="noopener">Clifford Chance on the Data (Use and Access) Act</a> &middot; <a href="https://www.gov.uk/government/news/companies-house-to-bring-in-changes-to-accounts-filing-from-april-2028" target="_blank" rel="noopener">Companies House, 9 June 2026</a></p></div>
</section>

<section class="tap-cases-section uk-proof">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Proof you can open</p>
            <h2>What can a UK buyer open and check before a first call?</h2>
            <p>Nothing we can show is in the UK yet. Everything below is live in Kerala, every link opens the real thing, and our own sales team runs on a staff app we built in-house.</p>
        </div>
        <div class="cases-grid">
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Shipyard ERP</span>
                <h3>Viraat Marine ERP</h3>
                <div class="case-stat-row"><span>First line to live</span><strong>45 days</strong></div>
                <div class="case-stat-row"><span>Role desks</span><strong>19</strong></div>
                <div class="case-stat-row"><span>Tables behind them</span><strong>38</strong></div>
                <a class="case-card-link" href="/results/viraat-marine-erp/">Read how it was built →</a>
            </div>
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Site operations</span>
                <h3>Telgo Power Projects staff app</h3>
                <div class="case-stat-row"><span>Site sign-in</span><strong>GPS attendance</strong></div>
                <div class="case-stat-row"><span>Daily site report</span><strong>Four steps</strong></div>
                <div class="case-stat-row"><span>Rebuilt</span><strong>Sep 2026</strong></div>
                <a class="case-card-link" href="https://telgo-app.vercel.app/" target="_blank" rel="noopener">Open the sign-in page →</a>
            </div>
            <div class="case-card">
                <span class="case-tag">🇮🇳 Kerala · Company website</span>
                <h3>Telgo Power Projects website</h3>
                <div class="case-stat-row"><span>Built</span><strong>May–Jul 2026</strong></div>
                <div class="case-stat-row"><span>Footer credit</span><strong>TechAuditPros</strong></div>
                <div class="case-stat-row"><span>Status</span><strong>Live</strong></div>
                <a class="case-card-link" href="https://telgopowerprojects.com/" target="_blank" rel="noopener">telgopowerprojects.com →</a>
            </div>
        </div>
    </div>
</section>

`;

body += L.faqHtml('uk-faq', 'FAQ', 'Questions UK businesses ask before hiring a team in India', faqs);

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
L.must(s, 'one agreed monthly fee'); L.must(s, 'reverse charge');
L.must(s, 'Nothing we can show is in the UK yet', 1);   // the honest proof note must survive
L.must(s, 'Canadian businesses', 0);              // no leftover CA hub copy
L.must(s, 'class="ukn-card"', 4);                 // four UK nations
s = s.replace('</head>', `
<style id="uk-hub-v2">
  /* uk-hub-v2 (2026-09-29): UK nations row, supplier questions, clock table, dates row, proof lead */
  .uk-nations{ padding:88px 0; background:var(--paper); border-bottom:1px solid var(--line); }
  .ukn-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
  .ukn-card{ position:relative; border:1px solid var(--line); border-radius:14px; padding:26px 22px 22px; background:var(--paper); }
  .ukn-card h3{ font-size:1.05rem; margin:14px 0 10px; }
  .ukn-card p{ font-size:0.9rem; color:var(--ink-soft); line-height:1.6; margin:0; }
  .ukn-card a, .ukn-more a, .uk-ask-list a, .uk-clock-note a, .us-lead a{ color:var(--orange-dark); }
  .ukn-code{ display:inline-grid; place-items:center; min-width:44px; height:44px; padding:0 10px; border-radius:22px; border:3px solid var(--orange); font-family:var(--font-mono); font-weight:700; font-size:0.95rem; color:var(--ink); background:var(--paper-alt); }
  .ukn-more{ margin:28px 0 0; font-size:0.92rem; color:var(--ink-soft); }
  .uk-ask{ padding:88px 0; background:var(--paper-alt); }
  .uk-ask-list{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(2,1fr); gap:18px; counter-reset:ask; }
  .uk-ask-list li{ counter-increment:ask; background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:24px 24px 22px 70px; position:relative; }
  .uk-ask-list li::before{ content:counter(ask, decimal-leading-zero); position:absolute; left:22px; top:24px; font-family:var(--font-mono); font-weight:600; color:var(--orange); font-size:0.95rem; }
  .uk-ask-list h3{ font-size:1rem; margin:0 0 8px; line-height:1.4; }
  .uk-ask-list p{ margin:0; font-size:0.9rem; color:var(--ink-soft); line-height:1.6; }
  .uk-clock{ margin-top:36px; border:1px solid var(--line); border-radius:14px; overflow:hidden; background:var(--paper); }
  .ukc-row{ display:grid; grid-template-columns:120px 170px 170px 1fr; gap:0; border-top:1px solid var(--line); }
  .ukc-row:first-child{ border-top:0; }
  .ukc-row > span{ padding:14px 18px; font-size:0.92rem; color:var(--ink-soft); }
  .ukc-row > span:nth-child(-n+3){ font-family:var(--font-mono); font-variant-numeric:tabular-nums; color:var(--ink); }
  .ukc-row .t{ font-weight:700; color:var(--orange-dark) !important; }
  .ukc-hd{ background:var(--navy-deep); }
  .ukc-hd > span, .ukc-hd > span:nth-child(-n+3){ color:rgba(255,255,255,0.8); font-family:var(--font-mono); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; }
  .uk-clock-note{ margin:16px 0 0; font-size:0.88rem; color:var(--ink-faint); }
  .uk-dates .number-stat-item .num{ font-size:1.6rem; }
  .uk-dates-src{ margin:26px 0 0; font-size:0.78rem; color:rgba(255,255,255,0.55); line-height:1.7; }
  .uk-dates-src a{ color:rgba(255,255,255,0.8); }
  .uk-proof .section-head p{ max-width:60ch; }
  @media (max-width:1024px){ .ukn-grid{ grid-template-columns:repeat(2,1fr); } }
  @media (max-width:760px){
    .uk-nations, .uk-ask{ padding:64px 0; }
    .ukn-grid, .uk-ask-list{ grid-template-columns:1fr; }
    .uk-ask-list li{ padding:22px 20px 20px 60px; }
    .ukc-hd{ display:none; }
    .ukc-row{ grid-template-columns:auto 1fr; grid-template-areas:"t s" "t w" "d d"; row-gap:2px; padding:14px 16px; }
    .ukc-row > span{ padding:0; }
    .ukc-row .t{ grid-area:t; font-size:1.3rem; padding-right:16px; }
    .ukc-row > span:nth-child(2){ grid-area:s; font-size:0.85rem; }
    .ukc-row > span:nth-child(2)::before{ content:'Kochi, summer '; font-family:var(--font-sans); color:var(--ink-faint); }
    .ukc-row > span:nth-child(3){ grid-area:w; font-size:0.85rem; }
    .ukc-row > span:nth-child(3)::before{ content:'Kochi, winter '; font-family:var(--font-sans); color:var(--ink-faint); }
    .ukc-row > span:nth-child(4){ grid-area:d; margin-top:8px; font-size:0.88rem; }
    .uk-dates .number-stat-item .num{ font-size:1.2rem; }
    .uk-dates .number-stat-item{ padding-left:14px; }
  }
</style>
` + '</head>');
L.write('uk/index.html', s);
