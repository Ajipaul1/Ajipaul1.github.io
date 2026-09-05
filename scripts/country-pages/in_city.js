'use strict';
// India city pages, one per genuinely winnable cluster in the owner's SEMrush India export.
//
// THE METHOD: the data chose these pages, not a template. Every keyword in the export was grouped
// by the place it names, each group filtered to volume >=100 and KD <=35, then ranked by winnable
// volume against median difficulty. Only groups that cleared both bars got a page, and each page is
// written to answer the questions ITS OWN cluster actually asks — which is why the Kerala page is
// about freelancers, the Lucknow page leads on website development rather than SEO, and the Mumbai
// page has a Navi Mumbai section. Those are not stylistic choices; they are what the keywords say.
//
//   place        winnable   medKD   what the cluster is actually asking for
//   mumbai         29,940      19   agency + professional services + wordpress + ecommerce + navi mumbai
//   kolkata        14,900      18   company/agency, and unusually strong CONSULTANT intent
//   kerala          8,010      14   FREELANCER intent dominates: 4 of the top 7 terms
//   vadodara        6,000      14   one huge term (seo agency in vadodara 3,600/14) plus web dev
//   lucknow         5,740      17   WEB DEVELOPMENT leads, not SEO (1,000/KD9 is the top term)
//   calicut         3,380      12   pure agency intent, lowest difficulty in Kerala
//
// DELIBERATELY EXCLUDED: "seo jobs in vadodara" (210), "seo vacancy in vadodara" (210), "seo jobs in
// lucknow" (260), "lucknow development authority website" (480+260). Those are careers and
// government-portal intent — real volume, wrong visitor, and chasing them would pull the page
// off-topic. Noted here so nobody adds them later thinking they were missed.
//
// RULES CARRIED OVER: no "offshore" (meaningless in India), no "audit" as a service word (owner's
// instruction — it is the company name, not the offer), no price we charge, and every page gets its
// own section vocabulary so no two share a block.
const L = require('./lib.js');

const CITIES = [
  {
    slug: 'mumbai', name: 'Mumbai', region: 'Maharashtra',
    hreflangName: 'Mumbai',
    title: 'SEO, Website Development &amp; ERP in Mumbai | TechAuditPros',
    desc: 'Search, website development and custom ERP for Mumbai businesses &mdash; including Navi Mumbai and Thane. Built by an engineering team in Kochi, reviewed weekly, no long-term contract.',
    h1: 'SEO, Websites and ERP for <span>Mumbai Businesses.</span>',
    sub: 'Mumbai has more agencies than any other Indian city, and most of them do one of these three things. We do all three with one team &mdash; which is the only reason your storefront can show real stock and your search work can point at pages that actually load.',
    eyebrow: 'Mumbai &amp; Navi Mumbai',
    lead: 'in-mumbai-sea-link-bridge',
    leadAlt: 'The Bandra-Worli Sea Link and the Mumbai skyline',
    // what the cluster asks for, in the order the volume says
    sections: [
      { h: 'What Mumbai businesses actually ask us for', p: 'The search data for this city is unusually clear about intent. The biggest term is people looking for an agency, but the next tier is specific: professional services rather than packages, WordPress development, e-commerce builds, and local visibility. Almost nobody in Mumbai is searching for theory &mdash; they are searching for someone to do a defined job.', kind: 'lead' },
      { h: 'E-commerce, because that is what Mumbai runs on', p: 'Trading, distribution and D2C brands dominate the enquiries we get from this city, and they share one failure: the storefront says one thing and the warehouse says another. We build the shop and the stock system as one problem, not two &mdash; so availability on the product page is the real number, and overselling stops being a weekly apology.', kind: 'ecom' },
      { h: 'Navi Mumbai and Thane', p: 'Distinct enough in the search data to matter: the businesses there are more often manufacturing, warehousing and B2B distribution than the D2C brands of the island city. Different problem, same three disciplines &mdash; usually starting with the stock system rather than the website.', kind: 'navi' },
      { h: 'What you can check before hiring anyone in this city', p: 'Mumbai has no shortage of suppliers, so the useful question is not who is cheapest but who will show you work in progress. Ask for a live staging URL you can open yourself, ask who specifically does the work, and ask what they have talked a client out of buying. Anyone who cannot answer the third question is taking orders.', kind: 'check' },
    ],
    faqs: [
      { q: 'Do you have an office in Mumbai?', a: 'No. Our team is in Kochi and we work with Mumbai clients remotely &mdash; same time zone, a live overlap all day, a staging URL you can click through every week and a written monthly report. If you need somebody in your office regularly, hire locally; we will say so on the call rather than pretend otherwise.' },
      { q: 'What does SEO cost in Mumbai?', a: 'It depends far more on your starting position than on any package. The honest drivers are how much technical work the site needs before content can rank at all, how competitive your terms are, and whether anyone on your side can implement changes. Ask any supplier what the first thirty days produce and what you keep if you stop &mdash; then compare those answers rather than the monthly figure.' },
      { q: 'Can you do e-commerce SEO as well as the build?', a: 'Yes, and doing both is the point. Most e-commerce visibility problems in this market are structural &mdash; thin product pages, filters generating thousands of near-identical URLs, a storefront too slow on mobile data. Fixing those is development work that happens to be the highest-value search work.' },
      { q: 'Do you work with Navi Mumbai and Thane businesses?', a: 'Yes, and the work usually looks different: more manufacturing, warehousing and B2B distribution, so the first project is more often the stock and order system than the website. Same team, same weekly demo.' },
      { q: 'What makes you different from a Mumbai agency?', a: 'Most run one of the three disciplines properly and resell the other two. We run all three with one accountable team, which is why the ERP can feed live stock to the website and the search work can point at pages built to load. If your need is genuinely one narrow thing, a local specialist may be better value.' },
    ],
  },
  {
    slug: 'kolkata', name: 'Kolkata', region: 'West Bengal',
    hreflangName: 'Kolkata',
    title: 'SEO Company &amp; Website Development in Kolkata | TechAuditPros',
    desc: 'Search, website development and custom ERP for Kolkata businesses. A team rather than a single consultant, reviewed weekly, with a written monthly report and no long-term contract.',
    h1: 'SEO and Websites for <span>Kolkata Businesses.</span>',
    sub: 'The search data for Kolkata is unusual: alongside the normal agency terms, a large share of people here are specifically looking for a consultant. That tells you what the market has been getting, and it is worth understanding before you hire either.',
    eyebrow: 'Kolkata &amp; West Bengal',
    lead: 'in-street-past-bank-branch',
    leadAlt: 'A street scene past a bank branch in India',
    sections: [
      { h: 'Consultant or company? The honest comparison', p: 'Kolkata searches for "SEO consultant" almost as often as for "SEO company", which is rare. Both are legitimate answers and they fail differently. A consultant is one person’s judgement, usually cheaper and genuinely good when the job is advice or one narrow discipline. The risk is capacity: one holiday, one bigger client, and your work stops. A company is continuity and a wider skill set, and the risk is that you never meet the people doing the work.', kind: 'lead' },
      { h: 'What we are, plainly', p: 'A team, not a marketplace and not one freelancer. The same people run your search work, your website and your systems, and you meet them. If your need is genuinely one narrow thing for a few weeks, a good consultant in Kolkata will be better value than us, and we will tell you that rather than sell you a retainer.', kind: 'what' },
      { h: 'Local visibility is where most Kolkata businesses are losing', p: 'A striking share of the winnable local terms here are being competed for by profiles that are incomplete: wrong categories, no recent photographs, opening hours that were true two years ago, and no steady flow of reviews. That work is cheap, fast and mostly something you can do yourself &mdash; and it frequently outperforms anything you could pay for.', kind: 'local' },
      { h: 'Then the technical layer, which nobody sells you', p: 'The thing a consultant rarely fixes and an agency rarely mentions: pages that are not indexed, canonicals pointing at the wrong URL, a site too slow on a mid-range phone. None of it is glamorous and all of it caps everything else. It is where we start, because it is usually where the fastest movement is.', kind: 'tech' },
    ],
    faqs: [
      { q: 'Should I hire an SEO consultant or an SEO company in Kolkata?', a: 'A consultant is one person’s judgement &mdash; often cheaper and genuinely good for advice or one narrow discipline, with capacity as the risk. A company gives continuity and a wider skill set, with the risk that you never meet whoever does the work. Ask either one who specifically does the work and what happens when they are unavailable.' },
      { q: 'Do you have an office in Kolkata?', a: 'No. We are in Kochi and work with Kolkata clients remotely, in the same time zone, with a weekly staging URL you can open yourself and a written monthly report. If you need regular in-person presence, hire locally.' },
      { q: 'What should local SEO in Kolkata actually involve?', a: 'A complete and correct Google Business Profile with the right categories and real photographs, business details identical everywhere they appear, a steady habit of asking for reviews after every completed job, and genuinely useful answers to the questions your customers already ask. Most of that you can do yourself, and it often beats paid work.' },
      { q: 'How long before we see results?', a: 'Technical fixes can move within days if pages were being blocked rather than outranked. Improving pages that already rank between 8th and 20th usually shows in one to three months. A new page competing on a commercial term takes four to nine. Anyone quoting one number for all three has not looked at your site.' },
      { q: 'Do you also build websites and internal systems?', a: 'Yes &mdash; websites on Next.js and React, and custom ERP for stock, orders, purchasing and job costing. Running search and the build with one team is the reason the site can be fast and the stock figure on it can be true.' },
    ],
  },
  {
    slug: 'kerala', name: 'Kerala', region: 'Kerala',
    hreflangName: 'Kerala',
    title: 'SEO Expert &amp; Website Development in Kerala | TechAuditPros, Kochi',
    desc: 'Search, website development and custom ERP for Kerala businesses, from a team based in Kochi. A team rather than a freelancer, with weekly progress you can click through.',
    h1: 'SEO and Software for <span>Kerala Businesses.</span>',
    sub: 'We are in Kochi. For a business in Ernakulam, Calicut, Thrissur or Trivandrum that means the people building your system can sit in your office, see how your team actually works, and come back &mdash; which is the one thing no remote supplier can offer.',
    eyebrow: 'Kerala &mdash; based in Kochi',
    lead: 'in-kerala-river-boats-palms',
    leadAlt: 'Boats on a Kerala river lined with palms',
    sections: [
      { h: 'Almost everyone here is searching for a freelancer', p: 'The Kerala search data is dominated by one intent: freelance and independent experts, not agencies. Four of the seven strongest terms in this state are some form of "freelance SEO Kerala". That is worth being honest about, because it tells you what the market has been buying &mdash; and where it has been let down.', kind: 'lead' },
      { h: 'Why that keeps going wrong, and when it does not', p: 'A good freelancer in Kerala is excellent value for a defined piece of work: a one-off fix, a specific campaign, advice you act on yourself. It fails predictably in two situations. When the work spans disciplines &mdash; the site needs rebuilding AND the search work needs doing AND the stock system is the real problem &mdash; no single person covers all three well. And when continuity matters, because one person is one holiday away from your work stopping.', kind: 'why' },
      { h: 'What a team gives you that one person cannot', p: 'Someone who writes the code, someone who does the search work, someone who owns the system, and a written record that survives any of them being away. You still meet the people. What you do not get is the lowest possible price, and if price is the binding constraint then a freelancer genuinely is the better answer &mdash; we will say so.', kind: 'team' },
      { h: 'The businesses we build for in Kerala', p: 'Textiles and garments, spices and food processing, marine exports, tourism and hospitality, construction, ayurveda and healthcare. The production layer differs enormously between them; the system of record underneath does not. That is the part we build.', kind: 'sectors' },
    ],
    faqs: [
      { q: 'Should I hire a freelance SEO expert in Kerala or an agency?', a: 'A freelancer is genuinely good value for a defined piece of work &mdash; a one-off fix, a campaign, advice you act on yourself. It fails when the work spans disciplines (site, search and systems at once) or when continuity matters, because one person is one holiday away from your work stopping. If price is your binding constraint, a freelancer is the honest answer.' },
      { q: 'Where in Kerala do you work?', a: 'We are based in Kochi, working across Kakkanad and Thrippunithura, and we work with businesses in Ernakulam, Calicut, Thrissur, Trivandrum, Kollam and Kannur. For Kerala clients we can meet in person, which is the part clients outside the state do not get.' },
      { q: 'Do you build ERP software for Kerala businesses?', a: 'Yes &mdash; stock, orders, purchasing, production and job costing in one system, built around how your business actually runs and integrated with the accounting package you already use. Textiles, food processing, marine export and construction are the sectors we see most here.' },
      { q: 'Do you work in Malayalam?', a: 'Our written reporting is in English, and conversations happen in whichever of Malayalam or English suits you. Interfaces we build can be bilingual where that genuinely helps the people using them.' },
      { q: 'How do we start?', a: 'Book a free strategy call, or meet us in Kochi. We walk one real process or one real page through with you and tell you where the leverage is. The findings are yours to keep either way, and nothing is on a long-term contract.' },
    ],
  },
  {
    slug: 'vadodara', name: 'Vadodara', region: 'Gujarat',
    hreflangName: 'Vadodara',
    title: 'SEO Agency &amp; Website Development in Vadodara | TechAuditPros',
    desc: 'Search and website development for Vadodara businesses &mdash; manufacturing, chemicals and engineering. Weekly progress you can click through, and a written monthly report.',
    h1: 'SEO and Websites for <span>Vadodara Businesses.</span>',
    sub: 'Vadodara is an engineering and chemicals city, and that changes what a website has to do. Your buyer is technical, the purchase is considered, and nobody is buying from a page that will not tell them a specification.',
    eyebrow: 'Vadodara &amp; Gujarat',
    lead: 'in-blue-machines-workshop',
    leadAlt: 'A workshop of blue production machines',
    sections: [
      { h: 'A technical city needs a technical page', p: 'Engineering, chemicals, pharmaceuticals and heavy manufacturing dominate here, and B2B buyers in those sectors behave differently from consumers. They arrive already knowing what they need, they want specifications rather than adjectives, and they will leave a page that makes them enquire just to find out whether you can do the job at all.', kind: 'lead' },
      { h: 'Put the specification on the page', p: 'The single highest-return change for most industrial suppliers in this market is unglamorous: publish the actual detail. Capabilities, tolerances, materials, certifications, capacity, lead times, the sectors you serve. Every one of those is something a buyer searches for and most competitors hide behind a contact form. Pages that answer get found and get quoted by AI answers; pages that tease do neither.', kind: 'spec' },
      { h: 'Then make it survive a factory-floor phone', p: 'Your enquiries are as likely to come from someone standing on a plant floor on mobile data as from a desk. If the page takes six seconds and the enquiry form fights a thumb, the enquiry does not happen and nothing in your analytics will tell you why.', kind: 'speed' },
      { h: 'And the system behind the quote', p: 'For manufacturers the website is rarely the real bottleneck &mdash; quoting is. If a quote takes two days because somebody is reconstructing a cost from three spreadsheets, more enquiries make that worse rather than better. We build the system of record too, which is often where we suggest starting.', kind: 'erp' },
    ],
    faqs: [
      { q: 'Do you work with manufacturers in Vadodara?', a: 'Yes, and it is the most common enquiry from this city &mdash; engineering, chemicals, pharmaceuticals and heavy manufacturing. The work usually splits between putting real specifications on the website and fixing whatever makes quoting slow behind it.' },
      { q: 'What should an industrial website in Vadodara actually contain?', a: 'The detail your buyer is searching for: capabilities, tolerances, materials, certifications, capacity, lead times and the sectors you serve. Most competitors hide all of it behind a contact form, which is exactly why publishing it wins &mdash; both with search engines and with AI answers that need something specific to quote.' },
      { q: 'Do you have an office in Vadodara?', a: 'No. We work remotely from Kochi, in the same time zone, with a weekly staging URL and a written monthly report. If you need someone on site regularly, hire locally &mdash; we will say so rather than pretend distance does not matter.' },
      { q: 'Can you build the quoting system as well as the website?', a: 'Yes, and for manufacturers it is often the better place to start. If a quote takes two days because a cost is being reconstructed from spreadsheets, more enquiries make the problem worse. Job costing, materials, routing and a real cost per job is what we build.' },
      { q: 'How long does SEO take for a B2B manufacturer?', a: 'Technical fixes can move within days. Pages that already rank between 8th and 20th usually improve in one to three months. New pages on commercial terms take four to nine. Industrial mid-tail terms are frequently less competitive than consumer terms, which works in your favour.' },
    ],
  },
  {
    slug: 'lucknow', name: 'Lucknow', region: 'Uttar Pradesh',
    hreflangName: 'Lucknow',
    title: 'Website Development Company &amp; SEO in Lucknow | TechAuditPros',
    desc: 'Website development and search for Lucknow businesses. Built in code and handed over in your own repository, with weekly progress you can click through.',
    h1: 'Website Development for <span>Lucknow Businesses.</span>',
    sub: 'Unusually for an Indian city, the search demand here leads with website development rather than SEO &mdash; people in Lucknow are looking for someone to build something. So this page starts there.',
    eyebrow: 'Lucknow &amp; Uttar Pradesh',
    lead: 'in-modern-office-workstations',
    leadAlt: 'Modern office workstations',
    sections: [
      { h: 'What you should own when the build is finished', p: 'The question almost nobody asks before signing, and the one that decides whether you have a supplier or a landlord. The code should be in your repository with its history. The hosting should be in an account in your name. The domain should be in your name. If any of those sit with the developer, leaving later is a rebuild rather than a handover.', kind: 'lead' },
      { h: 'Built in code, not assembled in a builder', p: 'A page builder is quick to start and expensive to live with: heavier pages, slower on the phones most of your visitors use, and a lock-in you only discover when you try to move. We build in Next.js and React. It takes slightly longer at the start and it is still yours in three years.', kind: 'code' },
      { h: 'The five things that make a build run late', p: 'Almost never the code. Content that nobody was assigned to write. Approval by committee. An integration discovered in week six. A design that was drawn rather than specified, so nobody briefed the mobile layout or the error state. And "small tweaks" that are new features. Four of those five are fixable by you, for nothing, before the project starts.', kind: 'late' },
      { h: 'Then search, once there is something worth ranking', p: 'Search work on a site that is about to be rebuilt is money spent twice. Build first, with the structure and speed right from the start, and the search work that follows is cheaper and faster because it is not fighting the site.', kind: 'seo' },
    ],
    faqs: [
      { q: 'What should I own after a website project?', a: 'The code in your own repository with its full history, the hosting in an account in your name, the domain in your name, the content in a portable format, and analytics in your own account with the developer added as a user. If any of those sit with the developer, leaving later is a rebuild rather than a handover.' },
      { q: 'Do you have an office in Lucknow?', a: 'No. We work remotely from Kochi in the same time zone, with a staging URL every week that you can click through yourself and a written monthly report. If you need regular in-person meetings, hire locally.' },
      { q: 'Why not just use a page builder?', a: 'It is quicker to start and more expensive to live with: heavier pages, slower on the mid-range phones most visitors use, and lock-in you discover when you try to move. If your site is simple and you need it next week, a builder is a reasonable answer &mdash; just choose it knowing the trade.' },
      { q: 'Why do website projects run late?', a: 'Content that nobody was assigned to write, approval by committee, an integration discovered in week six, a design that was drawn rather than specified so the mobile and error states were never briefed, and scope creep arriving as feedback. Four of those five are on the client side and cost nothing to fix in advance.' },
      { q: 'Should we do SEO at the same time as the build?', a: 'The technical foundations, yes &mdash; structure, speed and markup are cheaper to get right during the build than to retrofit. Content and link work are usually better spent after launch, because search work on a site about to be replaced is money spent twice.' },
    ],
  },
  {
    slug: 'calicut', name: 'Calicut', region: 'Kerala',
    hreflangName: 'Calicut',
    title: 'SEO Agency in Calicut (Kozhikode) &amp; Website Development | TechAuditPros',
    desc: 'Search and website development for Calicut and Kozhikode businesses, from a team based in Kochi &mdash; close enough to meet, with weekly progress you can click through.',
    h1: 'SEO and Websites for <span>Calicut Businesses.</span>',
    sub: 'Calicut has real search demand and unusually little serious competition for it &mdash; the terms here are among the least contested anywhere in our India data. For a local business that is an opening that will not stay open.',
    eyebrow: 'Calicut &amp; Kozhikode',
    lead: 'in-kerala-tall-building-street',
    leadAlt: 'A tall building on a Kerala city street',
    sections: [
      { h: 'An opening that is genuinely open', p: 'Most local search markets are crowded. This one is not yet. The businesses currently ranking for the terms that matter here are largely doing so on the strength of a directory listing and an incomplete profile rather than on a page anybody built deliberately. That is a low bar, and clearing it is mostly work you can do without paying anyone.', kind: 'lead' },
      { h: 'Start with the free things, in this order', p: 'A complete Google Business Profile with the right categories, real photographs and current hours. The same business details everywhere they appear. A steady habit of asking for a review after every completed job. And written answers to the questions your customers already ask you on the phone. That is the whole starting playbook, it costs nothing but attention, and in this market it moves more than paid work does.', kind: 'free' },
      { h: 'Then a page that answers rather than boasts', p: 'Once the profile is right, the differentiator is a page that actually says what you do, for whom, where and what it involves. Specific beats polished. It is also what gets you quoted by AI answers, which increasingly decide what a buyer sees before they reach any list of results.', kind: 'page' },
      { h: 'And we are two hours away', p: 'We are in Kochi. For a Calicut business that means the people building your system can come and see how you actually work. Not essential, and genuinely useful for the first conversation about something that will run your business.', kind: 'near' },
    ],
    faqs: [
      { q: 'Do you work with businesses in Calicut and Kozhikode?', a: 'Yes. We are based in Kochi, roughly two hours away, so we can meet in person &mdash; which is the part a Bangalore or Mumbai supplier cannot offer a Calicut business. Day-to-day work runs the same way as for every client: a weekly staging URL and a written monthly report.' },
      { q: 'What should a Calicut business do first?', a: 'The free things, in order: a complete Google Business Profile with correct categories, real photographs and current hours; identical business details everywhere they appear; a habit of asking for a review after every job; and written answers to the questions customers already ask you. In this market that moves more than paid work does.' },
      { q: 'Is SEO in Calicut competitive?', a: 'Less than almost anywhere else in our India data. The businesses currently ranking here are mostly doing so on a directory listing and an incomplete profile rather than on a page anyone built deliberately. That is a low bar, and it will not stay low.' },
      { q: 'Do you build websites and ERP too, or only search?', a: 'All three. Websites on Next.js and React, custom ERP for stock, orders and job costing, and search including AI-answer visibility. Most Calicut businesses start with whichever is costing them most and add the others later.' },
      { q: 'How much does it cost?', a: 'It depends on your starting position rather than on a package name. Ask us &mdash; or any supplier &mdash; what the first thirty days produce and what you keep if you stop after three months, and compare those answers rather than the monthly figure.' },
    ],
  },
];

// ------------------------------------------------------------------------------------------------
for (const c of CITIES) {
  const URL = 'https://techauditpros.com/in/' + c.slug + '/';
  let s = L.read('in/index.html');

  s = L.setHead(s, {
    title: c.title,
    ogTitle: c.title.replace(' | TechAuditPros', ''),
    desc: c.desc,
    url: URL,
    hreflang: [{ lang: 'en-in', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/in/' }],
  });

  s = L.setPageSchemas(s, [
    L.breadcrumbSchema([
      ['Home', 'https://techauditpros.com/'],
      ['India', 'https://techauditpros.com/in/'],
      [c.name, URL],
    ]),
    L.serviceSchema({
      name: 'SEO, Website Development and ERP in ' + c.name,
      desc: c.desc.replace(/&mdash;/g, '—'),
      url: URL, area: c.name + ', ' + c.region + ', India',
    }),
    L.faqSchema(c.faqs),
  ]);

  // the parent /in/ page already ran setSideText, so swap its text rather than calling it again
  s = L.replaceAll(s, '>across India.<', '>to ' + c.name + '.<');
  s = s.replace(/id="heroArcPathIN"/g, 'id="heroArcPath' + c.slug.slice(0, 3).toUpperCase() + '"');
  s = s.replace(/#heroArcPathIN/g, '#heroArcPath' + c.slug.slice(0, 3).toUpperCase());

  const hero = `
            <p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">${c.eyebrow}</span></p>
            <h1>${c.h1}</h1>
            <p class="hero-subtitle">${c.sub}</p>
            <div class="hero-actions">
                <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="#city-body" class="btn-ghost">What this city actually asks for &darr;</a>
            </div>
            <div class="hero-features-list">
                <div class="hero-feature-item">\u{1F3E2} Based in Kochi, Kerala</div>
                <div class="hero-feature-item">\u{1F4C5} Weekly Staging URL</div>
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
  s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, '');
  s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, '');

  let body = L.answer(`TechAuditPros builds <strong>websites</strong>, <strong>custom ERP systems</strong> and <strong>search visibility</strong> for businesses in <strong>${c.name}</strong>. We are an engineering team based in Kochi, working in the same time zone, with a staging URL you can open every week and a written report every month. One team runs all three disciplines, invoiced in rupees with GST, month to month.`);

  body += `<section class="tap-section" id="city-body">
    <div class="container">
`;
  for (const sec of c.sections) {
    body += `        <div class="city-block city-${sec.kind}">
            <h2 class="section-title">${sec.h}</h2>
            <p class="us-lead">${sec.p}</p>
        </div>
`;
  }
  body += `    </div>
</section>
`;

  body += L.faqHtml('city-faq', 'Questions we get from ' + c.name, 'Straight answers, including the ones that send you elsewhere.', c.faqs);

  s = L.setBody(s, body);
  s = L.setFinalCta(s, 'Let&rsquo;s look at one real page together.', 'Takes 60 seconds &middot; For ' + c.name + ' businesses &middot; No long-term contract');

  // the standing India rules, enforced per page
  s = s.replace(/[Oo]ffshore/g, m => (m[0] === 'O' ? 'Dedicated' : 'dedicated'));
  {
    const prose = s
      .replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ')
      .replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ')
      .replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ')
      .replace(/seo-audit-kochi/g, ' ')
      .replace(/<[^>]+>/g, ' ');
    if (/audit/i.test(prose)) throw new Error('"audit" survives as a service word on /in/' + c.slug + '/');
  }

  L.write('in/' + c.slug + '/index.html', s);
  console.log('  /in/' + c.slug + '/  ' + c.name);
}
console.log(CITIES.length + ' India city pages written from their own keyword clusters');
