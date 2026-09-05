'use strict';
// /in/kerala/ — rebuilt to SERP parity (PLAN-IN §8) with its own design (PLAN-IN §2.2, §7).
//
// RUN ORDER (not idempotent alone): in_hub.js -> in_city.js -> in_story.js -> in_kerala.js
//   in_city writes the Kerala skeleton (head, hero, nav, footer); this file replaces everything between
//   the hero and the closing CTA with the full page, and asserts it is reading a fresh in_city output.
//
// WHAT RANKS (live Google, 2026-09-04, "seo expert kerala" / "best seo company in kerala" / "freelance seo kerala"):
//   personal-brand freelancers and small agencies, 2,500–8,500 words, 4–11 FAQs, a named person with a story,
//   years + project counts, Google/HubSpot/Semrush certificates, client logos, testimonials, a services list,
//   a process, a cities list, published monthly prices (₹6,000–₹75,000), WhatsApp CTA.
// WHAT THIS PAGE DOES ABOUT IT:
//   3,500+ words · 12 FAQs answered in the first sentence · the founder, named, with the REAL certificates the
//   site already holds (GA4, Google Ads, Semrush, digital marketing) · all 14 districts with what we see in each ·
//   services incl. AEO/GEO · the market price range ATTRIBUTED, never ours · a freelancer-vs-team table none of
//   them have · an honest "when a freelancer is the better answer" · a hire-anyone checklist · WhatsApp CTA.
// RULES: no "audit" as a service word (company name only), no "offshore", no price of ours, UK/Indian spelling,
//   every photograph used here appears on no other page (asserted), reveal start states only under html.ker-on,
//   which JS adds after the reduced-motion check — JS off = complete page.
//
// SIGNATURE — "one becomes many": Kerala searches for ONE SEO expert. One orange point on a backwater plate
//   splits into a team of six as the plate is lit: nodes fly out from the centre (transform only, offsets
//   measured in JS), the lines to them draw (pathLength/stroke-dashoffset), labels follow.
// PER-SECTION MOTION, each its own: founder = veil slides off + certificates stamp in · districts = spine grows
//   north→south, items tick in, photos wipe diagonally · comparison = rows flip in (rotateX) · services = ink
//   rule draws then text rises · sectors = iris (clip-path circle) · process = track fills, steps pop as it
//   passes · cost = range brackets extend · checklist = ticks draw · band = movement-only drift (view timeline).
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const URL = 'https://techauditpros.com/in/kerala/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));

// ---------------------------------------------------------------------------------------------
// images
function img(slug, alt, sizes, cls, dims) {
  const base = SIZES[slug + '.jpg'] || dims;
  if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']]
    .filter(([, f]) => SIZES[f] || (dims && (f === slug + '.jpg' || dims.tiers.includes(parseInt(f.match(/-(\d+)\.jpg$/)?.[1] || '0')))));
  const srcset = tiers.map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ');
  return '<img class="' + (cls || 'ker-img') + '" src="/assets/images/library/' + slug + '.jpg" srcset="' + srcset + '" sizes="' + sizes + '" alt="' + alt + '" width="' + base.w + '" height="' + base.h + '" loading="lazy" decoding="async" />';
}
// the photographs of this page — no other page may carry any of them
const STOCK = {
  plate: 'ker-backwater-palms-wide',
  north: 'ker-foggy-palm-road', paddy: 'ker-women-crossing-river', backwater: 'ker-still-water-palms',
  textiles: 'in-weaving-on-a-loom', marine: 'ker-man-on-boat', tourism: 'ker-wooden-house-on-lake', agri: 'ker-water-and-palm-shore',
  road: 'ker-dirt-road-palms-ocean',
  band: 'in-kerala-river-boats-palms',
};
const FOUNDER = { slug: 'ker-founder-aji-paul', dims: { w: 1000, h: 1249, tiers: [700] } };
const CERTS = [
  { f: 'google-analytics-ga4-aji-paul.png', w: 400, h: 400, name: 'Google Analytics (GA4)', by: 'Google' },
  { f: 'google-ads-search-aji-paul.png', w: 400, h: 400, name: 'Google Ads Search', by: 'Google' },
  { f: 'semrush-aji-paul.png', w: 211, h: 187, name: 'Semrush SEO Toolkit', by: 'Semrush Academy' },
  { f: 'digital-marketing-aji-paul.png', w: 315, h: 339, name: 'Digital Marketing', by: 'Certified course' },
];

// ---------------------------------------------------------------------------------------------
// copy
const HERO = {
  eyebrow: 'Kerala &mdash; SEO expert, website and ERP team in Kochi',
  h1: 'Looking for an SEO expert in Kerala? <span>Hire the team behind one.</span>',
  sub: 'Kerala searches for one person. We are a team in Kochi doing that same work: a developer, a search specialist, a systems engineer, a writer and someone who checks everything before you see it. A staging URL you can open every week, a written report every month, no long-term contract. Meet us in Kochi, or start on WhatsApp.',
};

const ANSWER = 'TechAuditPros is a Kochi-based team providing <strong>SEO, website development and custom ERP</strong> to businesses across <strong>Kerala</strong> &mdash; from Kasaragod to Thiruvananthapuram. Most people searching this phrase want a freelance SEO expert; we do the same work as a team, in the same time zone, with a developer who can actually make the changes, a monthly written report, and everything you pay for left in your hands if you stop. Founded by Aji Paul, a mechanical engineer turned technical search specialist, holding Google Analytics, Google Ads and Semrush certifications.';

// x/y = desktop position on the 16/10 plate; m = mobile position on the 4/5 plate (labels must not collide
// at 318px wide — checked on the 390 screenshot, not guessed)
const TEAM = [
  { x: 20, y: 30, m: [16, 22], d: 0, label: 'Developer' },
  { x: 72, y: 24, m: [86, 12], d: 1, label: 'Systems engineer', flip: true },
  { x: 30, y: 74, m: [14, 66], d: 2, label: 'Search specialist' },
  { x: 84, y: 58, m: [88, 30], d: 3, label: 'Designer', flip: true },
  { x: 46, y: 90, m: [24, 83], d: 4, label: 'Writer' },
  { x: 88, y: 86, m: [88, 78], d: 5, label: 'Reporting &amp; QA', flip: true },
];

const DISTRICTS = [
  ['Kasaragod', 'Border trade, cashew and coir units, and a market that shops in two languages.'],
  ['Kannur', 'Handloom and plywood exporters who sell abroad and are invisible to buyers online.'],
  ['Wayanad', 'Coffee and spice growers, and resorts competing for the same twenty booking terms.'],
  ['Kozhikode', 'Trading houses, timber, hospitality and the softest agency-intent search in the state.'],
  ['Malappuram', 'Gold, retail and NRI-funded ventures with strong offline names and thin websites.'],
  ['Palakkad', 'Rice mills and the Kanjikode engineering belt &mdash; ERP buyers before they are SEO buyers.'],
  ['Thrissur', 'Gold, textiles and banks; a city where local map results decide the walk-in.'],
  ['Ernakulam', 'Home. Kochi, Kakkanad and Infopark, where we can be in your office the same week.'],
  ['Idukki', 'Cardamom, tea and hill tourism, where seasonal search swings by a factor of five.'],
  ['Kottayam', 'Rubber, publishing and education, with pages that need to rank in two languages.'],
  ['Alappuzha', 'Coir, houseboats and marine landings, sold to a national and foreign audience.'],
  ['Pathanamthitta', 'Pilgrimage-season trade and NRI households; demand arrives in one concentrated window.'],
  ['Kollam', 'Cashew processing and marine exports, with buyers who search from other countries.'],
  ['Thiruvananthapuram', 'Technopark firms and government suppliers, where tender pages and trust signals matter.'],
];

const COMPARE = [
  ['What you pay', 'Lowest possible monthly figure, because it is one person&rsquo;s time. Genuinely good value for a defined piece of work.', 'More than one person, because there are several. Priced against the plan for your first ninety days, not a rate card.'],
  ['Continuity', 'One holiday, one illness or one better client, and your work stops with nobody to pick it up.', 'Someone is always on it. A written record means anyone on the team can continue where another left off.'],
  ['Disciplines', 'Excellent at one thing. When the site needs rebuilding as well, or the stock system is the real problem, it is a referral.', 'A developer, a search specialist and a systems engineer under one invoice, so the fix goes to whoever should make it.'],
  ['Reporting', 'Often a ranking screenshot and a chat message. Useful, but hard to act on and impossible to compare month to month.', 'A written monthly report against the plan, and a staging URL you can open any week to see what changed.'],
  ['Speed on small fixes', 'Fast, if the change is inside their skill. A code change means waiting for your developer.', 'The developer is on the team, so a title tag, a redirect or a template fix ships the same week.'],
  ['Accountability', 'Personal and direct, which is the real strength of a good freelancer.', 'A team, with one person who answers for the result &mdash; you still know exactly who to call.'],
  ['If you stop', 'Depends entirely on the individual. Access, documents and logins are often theirs.', 'Everything is yours from day one: code, accounts, content, the report history. Stopping costs you nothing but the work not done.'],
  ['The honest verdict', 'The better answer when the job is defined, the budget is fixed, and you have a developer of your own.', 'The better answer when the work spans site, search and systems, or when continuity matters more than the lowest figure.'],
];

const SERVICES = [
  ['Technical SEO', 'Crawl paths, indexation, Core Web Vitals, structured data, hreflang for pages in Malayalam and English. The engineering half of search, done by people who write code every day.'],
  ['Local SEO &amp; Google Business Profile', 'The map results for Kochi, Calicut, Thrissur and Trivandrum decide who gets the walk-in and the call. Profile, categories, reviews, citations, and pages that match how people here actually search.'],
  ['Ecommerce SEO', 'Category architecture, faceted navigation, product schema and speed on Shopify, WooCommerce and custom builds. Kerala sells gold, garments, spices and ayurveda to the whole country; the site has to be found first.'],
  ['Content, AEO and GEO', 'Pages written to be quoted: by Google&rsquo;s AI Overviews, by ChatGPT and Perplexity, and by the people who still read. Answer first, evidence second, in Indian English and, where it earns it, Malayalam.'],
  ['Website development', 'Fast, owned, hand-built or on the platform you already run. No page builder lock-in, no monthly ransom, a staging URL from week one and the repository handed to you.'],
  ['ERP for Kerala&rsquo;s producers', 'Stock, orders, purchasing, production and job costing in one system, connected to the accounting package you already keep. Textiles, food processing, marine export and construction are the ones we see most.'],
];

const SECTORS = [
  { k: 'textiles', h: 'Textiles &amp; garments', p: 'Handloom, power-loom and garment units from Kannur to Thrissur, selling to buyers who search in English.', alt: 'Weaving cloth on a handloom' },
  { k: 'marine', h: 'Marine &amp; seafood export', p: 'Landings, grades and cold-chain custody, with importers checking the website before the first call.', alt: 'A man on a small boat on Kerala waters' },
  { k: 'tourism', h: 'Tourism &amp; hospitality', p: 'Houseboats, resorts and homestays competing for the same booking terms every season.', alt: 'Houseboats moored along a tree-lined Kerala backwater' },
  { k: 'agri', h: 'Coconut, spices &amp; food processing', p: 'Growers and processors moving from commodity sales to a brand of their own, online.', alt: 'A palm-fringed shore on the Kerala backwaters' },
];

const PROCESS = [
  ['One page, one process', 'Free. We look at one real page or one real workflow with you &mdash; in Kochi, or on a call &mdash; and tell you where the leverage is. The findings are yours whether or not we ever speak again.'],
  ['A written plan for ninety days', 'What gets done in the first thirty days, what you will have at the end of ninety, and what you keep if you stop then. Compare it with any other quote; two quotes at the same price routinely describe different work.'],
  ['Weekly staging, monthly report', 'A staging URL you can open any week to see what changed. A written report every month against the plan, in plain English, with the numbers that matter to a business and not just to us.'],
  ['You keep everything', 'Code, accounts, content, the report history. No retainer trap, no notice period measured in quarters. If we are worth keeping, you will keep us; if not, nothing of yours leaves with us.'],
];

const DRIVERS = [
  ['How much of the work is engineering', 'A site that needs its templates fixed costs more than one that only needs pages written, because the person doing it is a developer.'],
  ['How contested your terms are', 'Ranking a clinic in Thrissur and ranking a jewellery brand nationally are different projects with the same label.'],
  ['Whether anyone can ship changes', 'Recommendations that wait three months in a developer queue cost three months. This is the single most common reason work stalls, and the reason our developer is on the team.'],
  ['One discipline or three', 'Search alone is one project. Search plus a rebuild plus a stock system is three. Sequencing them is usually cheaper and always calmer than doing them at once.'],
];

const CHECKLIST = [
  ['Who actually makes the code changes?', 'If the answer is &ldquo;your developer&rdquo;, budget for the queue. If there is no developer, technical recommendations become a PDF.'],
  ['What happens in the first thirty days?', 'A specific answer &mdash; these pages, this fix, this profile &mdash; is a plan. &ldquo;Keyword research and strategy&rdquo; is a delay.'],
  ['Can I see the staging site?', 'Anyone doing real work has something to show before it goes live. Anyone who cannot is asking you to trust the invoice.'],
  ['What do I keep if I stop after three months?', 'Accounts, content, code and reports should be yours from the first day. If they are not, the price you were quoted is not the price.'],
  ['Show me a monthly report you sent a client.', 'Redacted is fine. What matters is whether it reads like a plan being worked through or a screenshot of rankings.'],
  ['Which of these results did you do alone?', 'Testimonials and logos are easy to collect. Ask which parts of the work were theirs and which were the client&rsquo;s own team.'],
  ['Will you tell me if I should not hire you?', 'The right answer for some Kerala businesses is a good freelancer, or nothing yet. Anyone who never says so is selling, not advising.'],
];

const FAQS = [
  { q: 'Should I hire a freelance SEO expert in Kerala or a company?', a: 'Hire a freelancer when the job is defined, the budget is fixed and you already have a developer who can make changes; hire a team when the work spans the website, the search work and the systems behind them, or when continuity matters more than the lowest monthly figure. Four of the seven strongest Kerala search terms ask for a freelancer, and a good one is genuine value. Where it goes wrong is predictable: one person cannot rebuild a site, do the search work and fix the stock system at once, and one person is one holiday away from your work stopping.' },
  { q: 'How much does SEO cost in Kerala?', a: 'Published retainers on the first page of Google for these searches run from about &#8377;6,000 to &#8377;75,000 a month: freelancers mostly between &#8377;8,000 and &#8377;25,000, agencies between &#8377;25,000 and &#8377;75,000 or more, with several recommending &#8377;20,000 as a realistic starting point. We do not publish a rate card, because two quotes at the same price routinely describe completely different work. Instead you get a written plan for the first ninety days and a price against that plan, and you are free to compare it with any of those figures.' },
  { q: 'How long does SEO take to show results in Kerala?', a: 'Local results &mdash; a clinic, a showroom, a resort in one district &mdash; typically move within three to six months; statewide or national terms in gold, garments or ayurveda take six to twelve. The first month should still show visible work: fixes shipped on a staging URL, a Business Profile corrected, pages rewritten. If nothing is visible after thirty days, ask why, whoever you hired.' },
  { q: 'Do you do local SEO and Google Business Profile for Kochi, Calicut, Thrissur and Trivandrum?', a: 'Yes. For most Kerala businesses the map results decide the walk-in and the phone call, so profile categories, reviews, photographs, citations and location pages written the way people here actually search are usually the first work we do, before anything more ambitious.' },
  { q: 'Where in Kerala do you work, and can we meet?', a: 'We are based in Kochi and work with businesses in all fourteen districts. For Ernakulam, Thrissur, Alappuzha and Kottayam we can be in your office the same week; for Calicut, Kannur, Kollam and Thiruvananthapuram we plan a visit; everywhere else we start on a call and meet when it is worth the journey. Walking your shop floor once is worth more than ten video calls, and it is the one thing an agency in Mumbai or Bangalore cannot offer you.' },
  { q: 'Do you work in Malayalam?', a: 'Conversations happen in whichever of Malayalam or English suits you; written reports are in English. Websites and interfaces we build can be bilingual where that genuinely helps the people using them, and we write Malayalam pages when the search data says your customers search in Malayalam.' },
  { q: 'What are AEO and GEO, and does a Kerala business need them?', a: 'Answer Engine Optimisation and Generative Engine Optimisation mean writing pages so that Google&rsquo;s AI Overviews, ChatGPT and Perplexity quote you when someone asks a question your business answers. A growing share of &ldquo;best resort in Wayanad&rdquo; or &ldquo;ERP for a garment unit&rdquo; questions now get answered without a click, so yes &mdash; the pages that get cited are the ones that answer in the first sentence and show evidence in the second. Every page we write is built that way, including this one.' },
  { q: 'Do you build websites and ERP too, or only SEO?', a: 'All three, and that is the point of a team. Search work on a slow, badly built site is wasted; a good site with no search work is invisible; and for many Kerala producers the real bottleneck is a stock or order system that nobody can see into. Depending on the business we start with whichever one is binding, and sequence the rest.' },
  { q: 'Which sectors in Kerala do you know?', a: 'Textiles and garments, marine and seafood export, tourism and hospitality, coconut, spices and food processing, gold and jewellery retail, ayurveda and healthcare, construction and real estate, and education. The production layer differs enormously between them; the system of record underneath does not, and neither does the way their customers search.' },
  { q: 'How do I know work is actually happening each month?', a: 'You open the staging URL and see what changed; you read the monthly report and check it against the ninety-day plan; you ask to see the commit history if you like. If a supplier cannot show you the work before it goes live, you are being asked to trust the invoice.' },
  { q: 'What happens if I stop after three months?', a: 'You keep everything: the code, the accounts, the content, the report history and the plan. There is no notice period measured in quarters and no retainer trap. If the work has been worth it you will continue; if not, nothing of yours leaves with us.' },
  { q: 'Are you certified?', a: 'Yes &mdash; Google Analytics (GA4), Google Ads Search, Semrush SEO Toolkit and a digital marketing certification, all held by the founder and shown on this page as issued. They prove training, not results. What proves results is the report history, and any client we have worked with in Kerala can show you theirs.' },
];

// ---------------------------------------------------------------------------------------------
// markup
const head = (n, label, title, lede, dark) => [
  '      <div class="ker-head' + (dark ? ' on-dark' : '') + '">',
  '        <p class="ker-slate"><span>' + n + ' &middot; ' + label + '</span></p>',
  '        <h2 class="ker-h2">' + title + '</h2>',
  lede ? '        <p class="ker-lede">' + lede + '</p>' : '',
  '      </div>',
].filter(Boolean).join('\n');

const ACT_ONE = [
  '<section class="ker dark" id="ker-one" aria-label="One becomes many">',
  '  <div class="container ker-two">',
  '    <div>',
  head('01', 'One becomes many', 'Kerala searches for one expert. This is what that one person looks like when it is a team.', 'The search data for this state is unusually clear: people want a freelance SEO expert in Kerala, not an agency. We think that instinct is right about the important thing &mdash; you want a person, not an account manager &mdash; and wrong about the arithmetic. Real search work today is a developer&rsquo;s job as often as a marketer&rsquo;s, and for Kerala&rsquo;s producers it very often turns out to be a systems job too. So we kept the person, and put a team behind them.', true),
  '      <ul class="ker-facts">',
  '        <li><b>250+</b> projects delivered</li><li><b>128+</b> active clients</li><li><b>16</b> countries served</li><li><b>4.9/5</b> client rating</li>',
  '      </ul>',
  '      <div class="ker-cta-row"><a class="ker-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a><a class="ker-btn ghost" href="#ker-founder">Meet the person first &darr;</a></div>',
  '    </div>',
  '    <div class="ker-stage" role="img" aria-label="One point splitting into a team of six over the Kerala backwaters">',
  '      <div class="ker-plate">' + img(STOCK.plate, 'Kerala backwater lined with coconut palms, seen wide', '(max-width:860px) 100vw, 58vw') + '</div>',
  '      <svg class="ker-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">',
  ...TEAM.map(t => '        <line x1="50" y1="50" x2="' + t.x + '" y2="' + t.y + '" pathLength="1" style="--d:' + t.d + '" />'),
  '      </svg>',
  '      <div class="ker-node core" style="left:50%;top:50%"><i></i><b>One SEO expert</b></div>',
  ...TEAM.map(t => '      <div class="ker-node' + (t.flip ? ' flip' : '') + '" data-i="' + t.d + '" style="left:' + t.x + '%;top:' + t.y + '%;--d:' + t.d + '"><i></i><b>' + t.label + '</b></div>'),
  '      <p class="ker-stage-cap">One search. Six people. One invoice, one person who answers for it.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_FOUNDER = [
  '<section class="ker" id="ker-founder" aria-label="The person behind the team">',
  '  <div class="container ker-two rev">',
  '    <figure class="ker-portrait">',
  '      ' + img(FOUNDER.slug, 'Aji Paul, founder of TechAuditPros, at his desk in Kochi', '(max-width:860px) 92vw, 40vw', 'ker-img', FOUNDER.dims),
  '      <span class="ker-veil" aria-hidden="true"></span>',
  '      <figcaption><b>Aji Paul</b> Founder &middot; Kochi, Kerala</figcaption>',
  '    </figure>',
  '    <div>',
  head('02', 'The person you would actually talk to', 'Aji Paul. A mechanical engineer first, then a technical search specialist.', 'Every page that ranks for &ldquo;SEO expert Kerala&rdquo; is built around a person, and rightly: you are about to trust someone with how your business is found. So here is ours. Aji trained as a mechanical engineer, spent years around production floors before he spent them around search consoles, and founded TechAuditPros in Kochi to do one thing the market was not doing &mdash; treat search, the website and the systems behind it as one engineering problem.'),
  '      <p class="ker-p">That background is why this team looks the way it does. A search specialist who has stood in a garment unit reads a Kerala manufacturer&rsquo;s website differently. A developer who has built a stock system understands why the ecommerce catalogue is wrong. The work has since gone to clients in sixteen countries, and Kerala businesses get exactly that standard without the distance.</p>',
  '      <p class="ker-p">What you will not find here is a wall of logos or a decade of screenshots. What you will find is the founder&rsquo;s name on the work, the certificates as issued, and a phone number that reaches a person.</p>',
  '      <div class="ker-certs" aria-label="Certifications held by the founder, shown as issued">',
  ...CERTS.map((c, i) => '        <figure class="ker-cert" style="--d:' + i + '"><img src="/assets/images/certificates/' + c.f + '" alt="' + c.name + ' certificate issued to Aji Paul" width="' + c.w + '" height="' + c.h + '" loading="lazy" decoding="async" /><figcaption><b>' + c.name + '</b><span>' + c.by + '</span></figcaption></figure>'),
  '      </div>',
  '      <p class="ker-note">Certificates prove training, not results. Results are in the monthly reports, and any Kerala client we work with can show you theirs.</p>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_DISTRICTS = [
  '<section class="ker alt" id="ker-districts" aria-label="Fourteen districts">',
  '  <div class="container">',
  head('03', 'Fourteen districts, one team', 'North to south, what we actually see in each district of Kerala.', 'Ranking pages list the districts. We would rather tell you what a business in each one tends to need, because it differs more than the search terms suggest &mdash; and because if you are in Kannur or Kollam you should know we have thought about you, not just tagged you.'),
  '    <div class="ker-two wide">',
  '      <ol class="ker-spine">',
  ...DISTRICTS.map(([n, p], i) => '        <li style="--d:' + i + '"><i aria-hidden="true"></i><b>' + n + '</b><span>' + p + '</span></li>'),
  '      </ol>',
  '      <div class="ker-photos">',
  '        <figure class="ker-photo" style="--d:0">' + img(STOCK.north, 'A foggy road through coconut palms in north Kerala', '(max-width:860px) 92vw, 20vw') + '<figcaption>The hills and the north</figcaption></figure>',
  '        <figure class="ker-photo" style="--d:1">' + img(STOCK.paddy, 'Women in Kerala kasavu saris walking a bund between paddy fields at dusk', '(max-width:860px) 92vw, 20vw') + '<figcaption>The paddy belt</figcaption></figure>',
  '        <figure class="ker-photo" style="--d:2">' + img(STOCK.backwater, 'A backwater village in Kerala with houseboats under coconut palms', '(max-width:860px) 92vw, 20vw') + '<figcaption>The backwaters and the coast</figcaption></figure>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_COMPARE = [
  '<section class="ker" id="ker-compare" aria-label="Freelancer or team">',
  '  <div class="container">',
  head('04', 'Freelancer or team', 'The comparison nobody ranking for this search will show you.', 'Because most of them are the freelancer. This is our honest version, including the row where the freelancer wins.'),
  '    <div class="ker-tblwrap">',
  '      <table class="ker-tbl">',
  '        <thead><tr><th>Question</th><th>A freelance SEO expert in Kerala</th><th class="hi">A team in Kochi</th></tr></thead>',
  '        <tbody>',
  ...COMPARE.map(([q, a, b], i) => '          <tr style="--d:' + i + '"><th scope="row">' + q + '</th><td data-l="Freelancer">' + a + '</td><td class="hi" data-l="Team">' + b + '</td></tr>'),
  '        </tbody>',
  '      </table>',
  '    </div>',
  '    <aside class="ker-callout">',
  '      <h3>When a freelancer is the better answer</h3>',
  '      <ul><li>The work is one defined thing &mdash; a Business Profile, a campaign, one set of pages &mdash; and you have your own developer for anything technical.</li><li>The budget is genuinely fixed at a level where a team does not make sense, and you would rather have one good person than none.</li><li>You want advice to act on yourself. Several of the people ranking for this search teach, and they are good at it.</li></ul>',
  '      <p>If that is you, hire one, and come back when the work outgrows one person. We will say the same on the call.</p>',
  '    </aside>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_SERVICES = [
  '<section class="ker dark" id="ker-services" aria-label="What we do for Kerala businesses">',
  '  <div class="container">',
  head('05', 'What we do', 'Six things, one team, one invoice.', 'Everything below is done by people on the team, not referred out. That is the practical difference between this page and most of the others you will read today.', true),
  '    <div class="ker-svcgrid">',
  ...SERVICES.map(([h, p], i) => '      <article class="ker-svc" style="--d:' + i + '"><div class="in"><h3>' + h + '</h3><p>' + p + '</p></div></article>'),
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_SECTORS = [
  '<section class="ker" id="ker-sectors" aria-label="Who we build for in Kerala">',
  '  <div class="container">',
  head('06', 'Who we build for', 'Kerala&rsquo;s real economy, and what each part needs found.', 'These are the businesses we see most. The production layer differs enormously between them; the way their customers search does not.'),
  '    <div class="ker-tiles">',
  ...SECTORS.map((t, i) => '      <figure class="ker-tile" style="--d:' + i + '">' + img(STOCK[t.k], t.alt, '(max-width:860px) 92vw, 24vw') + '<figcaption><b>' + t.h + '</b><span>' + t.p + '</span></figcaption></figure>'),
  '    </div>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_PROCESS = [
  '<section class="ker alt" id="ker-process" aria-label="How the work runs">',
  '  <div class="ker-wide">',
  '    <figure class="ker-widefig"><span class="ker-shade" aria-hidden="true"></span>' + img(STOCK.road, 'A dirt road between coconut palms near the Kerala coast', '100vw') + '<figcaption>The road is the same for everyone. What differs is whether you can see where you are on it.</figcaption></figure>',
  '  </div>',
  '  <div class="container">',
  head('07', 'How the work runs', 'Four steps, and you can see every one of them.', 'This is the process every Kerala client gets, from a one-page clinic site in Thrissur to a garment exporter&rsquo;s ERP in Kannur.'),
  '    <ol class="ker-track">',
  ...PROCESS.map(([h, p], i) => '      <li class="ker-step" style="--d:' + i + '"><i>' + (i + 1) + '</i><h3>' + h + '</h3><p>' + p + '</p></li>'),
  '    </ol>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_COST = [
  '<section class="ker dark" id="ker-cost" aria-label="What SEO costs in Kerala">',
  '  <div class="container">',
  head('08', 'What it costs', 'What SEO costs in Kerala, according to the people who publish a price.', 'We read the first page of Google for these searches so you do not have to. The figures below are theirs, as published in September 2026; ours comes after a plan, not before it.', true),
  '    <div class="ker-range" aria-label="Published monthly SEO retainers in Kerala">',
  '      <div class="axis"><span>&#8377;0</span><span>&#8377;20k</span><span>&#8377;40k</span><span>&#8377;60k</span><span>&#8377;80k+</span></div>',
  '      <div class="bar b1" style="--from:7.5%;--to:31%;--d:0"><b>Freelancers</b><span>about &#8377;6,000 &ndash; &#8377;25,000 a month</span></div>',
  '      <div class="bar b2" style="--from:31%;--to:94%;--d:1"><b>Agencies</b><span>about &#8377;25,000 &ndash; &#8377;75,000 and up</span></div>',
  '      <p class="ker-range-note">Several of them recommend around &#8377;20,000 a month as a realistic starting point for a competitive local business. That is a fair reading of the market, and you should compare any quote &mdash; including ours &mdash; against the plan behind it rather than the figure.</p>',
  '    </div>',
  '    <div class="ker-drivers">',
  ...DRIVERS.map(([h, p], i) => '      <div class="drv" style="--d:' + i + '"><b>0' + (i + 1) + '</b><h3>' + h + '</h3><p>' + p + '</p></div>'),
  '    </div>',
  '    <p class="ker-p on-dark">What we publish instead of a rate card: a written plan for your first ninety days, what you will have at the end of it, and what you keep if you stop. Ask any other supplier for the same three things and put the answers side by side. The monthly figure will make sense only then.</p>',
  '  </div>',
  '</section>',
].join('\n');

const ACT_CHECK = [
  '<section class="ker" id="ker-checklist" aria-label="Before you hire anyone">',
  '  <div class="container ker-two">',
  '    <div>',
  head('09', 'Before you hire anyone', 'Seven questions to ask any SEO expert in Kerala &mdash; including us.', 'Take this list into every conversation. The answers separate people who do the work from people who sell it, and we would rather you hire the right freelancer than the wrong team.'),
  '    </div>',
  '    <ol class="ker-check">',
  ...CHECKLIST.map(([q, p], i) => '      <li style="--d:' + i + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" pathLength="1" /></svg><div><h3>' + q + '</h3><p>' + p + '</p></div></li>'),
  '    </ol>',
  '  </div>',
  '</section>',
].join('\n');

const BAND = [
  '<section class="ker-band" aria-label="Kochi is where we are">',
  '  <div class="ker-bandfig">' + img(STOCK.band, 'Boats on a Kerala river lined with coconut palms', '100vw') + '</div>',
  '  <div class="container ker-bandtext"><p class="ker-slate"><span>Kochi is where we are</span></p><h2 class="ker-h2">Kerala is where we work.</h2><p>Message us on WhatsApp, book a call, or tell us where you are and we will come to you.</p><a class="ker-btn" href="__WA__" target="_blank" rel="noopener">Start on WhatsApp</a></div>',
  '</section>',
].join('\n');

// ---------------------------------------------------------------------------------------------
// styles — all prefixed ker-, all start states under html.ker-on
const CSS = `
  /* ================= in_kerala.js : the page's own design ================= */
  .ker{ padding:clamp(56px,7vw,104px) 0; position:relative; }
  .ker.dark{ background:var(--navy-deep); color:#fff; }
  .ker.alt{ background:#F3F6F5; }
  .ker-wide, .ker-band{ width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); overflow-x:clip; }
  .ker-two{ display:grid; grid-template-columns:1fr; gap:clamp(28px,4vw,64px); align-items:center; }
  @media (min-width:860px){ .ker-two{ grid-template-columns:5fr 7fr; } .ker-two.rev{ grid-template-columns:5fr 7fr; } .ker-two.wide{ grid-template-columns:7fr 5fr; align-items:start; } }
  .ker-head{ max-width:62ch; margin-bottom:clamp(22px,3vw,40px); }
  .ker-slate{ display:flex; align-items:center; gap:12px; margin:0 0 14px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); }
  .ker-slate::before{ content:''; width:44px; height:2px; background:var(--orange); flex:none; transform-origin:left center; }
  .ker-h2{ font-size:clamp(1.85rem,3.4vw,2.9rem); line-height:1.08; letter-spacing:-.02em; margin:0 0 14px; color:var(--ink); }
  .ker.dark .ker-h2, .on-dark .ker-h2, .ker-band .ker-h2{ color:#fff; }
  .ker-lede, .ker-p{ font-size:clamp(1rem,1.15vw,1.12rem); line-height:1.68; color:var(--ink-soft); margin:0 0 14px; max-width:64ch; }
  .ker.dark .ker-lede, .ker-p.on-dark, .ker.dark .ker-p{ color:rgba(255,255,255,.8); }
  .ker-note{ font-size:.86rem; color:var(--ink-faint); border-left:3px solid var(--orange); padding:6px 0 6px 14px; margin:18px 0 0; max-width:60ch; }
  .ker-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; }
  .ker-btn:hover{ background:var(--orange-dark); }
  .ker-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.35); color:#fff; }
  .ker-cta-row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }
  .ker-facts{ list-style:none; padding:0; margin:18px 0 22px; display:grid; grid-template-columns:repeat(2,1fr); gap:10px 18px; }
  .ker-facts li{ font-size:.86rem; color:rgba(255,255,255,.7); font-family:var(--font-mono); }
  .ker-facts b{ display:block; font-size:1.5rem; color:#fff; letter-spacing:-.02em; }
  .ker-img{ display:block; width:100%; height:100%; object-fit:cover; }

  /* 01 — the stage: plate + constellation */
  .ker-stage{ position:relative; }
  .ker-plate{ position:relative; aspect-ratio:16/10; overflow:hidden; border-radius:12px; background:rgba(255,255,255,.06); }
  .ker-plate::after{ content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 50%, rgba(11,32,54,.15) 0%, rgba(11,32,54,.72) 100%); }
  .ker-lines{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
  .ker-lines line{ stroke:rgba(255,255,255,.55); stroke-width:1.5; vector-effect:non-scaling-stroke; }
  .ker-node{ position:absolute; width:0; height:0; }
  .ker-node i{ position:absolute; left:-8px; top:-8px; width:16px; height:16px; border-radius:50%; background:var(--orange); box-shadow:0 0 0 4px rgba(255,255,255,.22); }
  .ker-node b{ position:absolute; left:16px; top:-13px; white-space:nowrap; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.06em; background:rgba(4,9,20,.82); color:#fff; padding:5px 9px; border-radius:6px; }
  .ker-node.flip b{ left:auto; right:16px; }
  .ker-node.core i{ width:22px; height:22px; left:-11px; top:-11px; box-shadow:0 0 0 6px rgba(217,83,30,.28); }
  .ker-node.core b{ top:14px; left:-58px; background:var(--orange); }
  .ker-stage-cap{ margin:14px 0 0; font-family:var(--font-mono); font-size:.78rem; letter-spacing:.04em; color:rgba(255,255,255,.62); }
  @media (max-width:860px){ .ker-plate{ aspect-ratio:4/5; } .ker-node b{ font-size:.64rem; } .ker-node.core b{ left:-50px; } }
  /* mobile node positions: the inline desktop positions are overridden per node so no label collides on a 318px plate */
  @media (max-width:860px){
${TEAM.map(t => '    .ker-node[data-i="' + t.d + '"]{ left:' + t.m[0] + '% !important; top:' + t.m[1] + '% !important; }').join('\n')}
  }
  /* (the SVG lines follow the nodes: x2/y2 are attributes, not CSS, so the script re-aims them from the computed positions) */

  /* 02 — founder */
  .ker-portrait{ position:relative; margin:0; overflow:hidden; border-radius:14px; aspect-ratio:4/5; }
  .ker-veil{ position:absolute; inset:0; background:var(--orange-tint); z-index:2; }
  .ker-portrait figcaption{ position:absolute; z-index:3; left:16px; bottom:16px; background:rgba(4,9,20,.82); color:#fff; padding:10px 14px; border-radius:8px; font-size:.82rem; }
  .ker-portrait figcaption b{ display:block; font-size:1rem; }
  .ker-certs{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:22px; }
  .ker-cert{ margin:0; text-align:center; }
  .ker-cert img{ display:block; width:100%; height:auto; aspect-ratio:1; object-fit:contain; background:#fff; border:1px solid var(--line); border-radius:10px; padding:8px; }
  .ker-cert figcaption{ margin-top:8px; font-size:.74rem; line-height:1.35; color:var(--ink-soft); }
  .ker-cert figcaption b{ display:block; color:var(--ink); }
  @media (max-width:560px){ .ker-certs{ grid-template-columns:repeat(2,1fr); } }

  /* 03 — the spine */
  .ker-spine{ list-style:none; margin:0; padding:0 0 0 26px; position:relative; }
  .ker-spine::before{ content:''; position:absolute; left:6px; top:8px; bottom:8px; width:2px; background:var(--orange); transform-origin:top center; }
  .ker-spine li{ position:relative; padding:9px 0 9px 8px; display:grid; grid-template-columns:150px 1fr; gap:6px 16px; align-items:baseline; border-bottom:1px solid var(--line); }
  .ker-spine li i{ position:absolute; left:-25px; top:16px; width:12px; height:12px; border-radius:50%; background:#fff; border:3px solid var(--orange); }
  .ker-spine li b{ color:var(--ink); font-size:1rem; }
  .ker-spine li span{ color:var(--ink-soft); font-size:.92rem; line-height:1.5; }
  @media (max-width:560px){ .ker-spine li{ grid-template-columns:1fr; } }
  .ker-photos{ display:grid; grid-template-columns:1fr; gap:14px; position:sticky; top:96px; }
  .ker-photo{ margin:0; position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:12px; }
  .ker-photo figcaption{ position:absolute; left:14px; bottom:12px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.12em; text-transform:uppercase; color:#fff; background:rgba(4,9,20,.7); padding:6px 10px; border-radius:6px; }
  @media (max-width:860px){ .ker-photos{ position:static; grid-template-columns:repeat(3,1fr); } .ker-photo{ aspect-ratio:3/4; } }
  @media (max-width:560px){ .ker-photos{ grid-template-columns:1fr; } .ker-photo{ aspect-ratio:16/10; } }

  /* 04 — the table */
  .ker-tblwrap{ overflow-x:auto; perspective:1200px; }
  .ker-tbl{ width:100%; border-collapse:collapse; font-size:.95rem; line-height:1.55; min-width:640px; }
  .ker-tbl th, .ker-tbl td{ text-align:left; vertical-align:top; padding:16px 14px; border-bottom:1px solid var(--line); }
  .ker-tbl thead th{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); border-bottom:2px solid var(--line-strong); }
  .ker-tbl tbody th{ color:var(--ink); width:18%; }
  .ker-tbl td{ color:var(--ink-soft); width:41%; }
  .ker-tbl .hi{ background:var(--orange-tint); color:var(--ink); }
  .ker-tbl tbody tr{ transform-origin:top center; }
  /* mobile: the table stacks into cards, so the team column is never scrolled off-screen */
  @media (max-width:700px){
    .ker-tbl{ min-width:0; }
    .ker-tbl thead{ display:none; }
    .ker-tbl, .ker-tbl tbody, .ker-tbl tr, .ker-tbl th, .ker-tbl td{ display:block; width:auto; }
    .ker-tbl tbody tr{ margin-bottom:16px; border:1px solid var(--line); border-radius:12px; overflow:hidden; }
    .ker-tbl tbody th{ width:auto; background:var(--navy-deep); color:#fff; padding:12px 14px; border:0; }
    .ker-tbl td{ padding:12px 14px; border:0; }
    .ker-tbl td::before{ content:attr(data-l); display:block; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:4px; }
    .ker-tbl td.hi::before{ color:var(--orange-dark); }
  }
  .ker-callout{ margin-top:clamp(24px,3vw,40px); background:var(--navy-deep); color:#fff; border-radius:14px; padding:clamp(22px,3vw,36px); }
  .ker-callout h3{ margin:0 0 12px; font-size:1.25rem; }
  .ker-callout ul{ margin:0 0 12px; padding-left:20px; color:rgba(255,255,255,.82); line-height:1.6; }
  .ker-callout li{ margin-bottom:8px; }
  .ker-callout p{ margin:0; color:rgba(255,255,255,.7); }

  /* 05 — services */
  .ker-svcgrid{ display:grid; grid-template-columns:1fr; gap:22px 32px; }
  @media (min-width:700px){ .ker-svcgrid{ grid-template-columns:repeat(2,1fr); } }
  @media (min-width:1040px){ .ker-svcgrid{ grid-template-columns:repeat(3,1fr); } }
  .ker-svc{ position:relative; padding:22px 0 0; }
  .ker-svc::before{ content:''; position:absolute; left:0; top:0; width:100%; height:2px; background:var(--orange); transform-origin:left center; }
  .ker-svc h3{ margin:0 0 8px; font-size:1.12rem; color:#fff; }
  .ker-svc p{ margin:0; color:rgba(255,255,255,.74); line-height:1.6; font-size:.95rem; }

  /* 06 — sector tiles */
  .ker-tiles{ display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
  @media (min-width:1000px){ .ker-tiles{ grid-template-columns:repeat(4,1fr); } }
  .ker-tile{ margin:0; position:relative; aspect-ratio:3/4; overflow:hidden; border-radius:12px; background:var(--ink); }
  .ker-tile::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.9) 0%, rgba(4,9,20,.3) 55%, rgba(4,9,20,0) 100%); }
  .ker-tile figcaption{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:18px; color:#fff; }
  .ker-tile figcaption b{ display:block; font-size:1.05rem; margin-bottom:6px; }
  .ker-tile figcaption span{ font-size:.86rem; line-height:1.5; color:rgba(255,255,255,.8); }
  @media (max-width:560px){ .ker-tiles{ grid-template-columns:1fr; } .ker-tile{ aspect-ratio:16/10; } }

  /* 07 — process */
  .ker-widefig{ position:relative; margin:0 0 clamp(28px,4vw,56px); aspect-ratio:21/9; overflow:hidden; }
  .ker-widefig .ker-img{ will-change:transform; }
  .ker-shade{ position:absolute; inset:0; background:var(--navy-deep); z-index:2; }
  .ker-widefig figcaption{ position:absolute; z-index:3; left:50%; transform:translateX(-50%); bottom:clamp(14px,3vw,36px); width:min(92vw,900px); text-align:center; color:#fff; font-size:clamp(1rem,1.6vw,1.35rem); text-shadow:0 2px 14px rgba(0,0,0,.6); }
  @media (max-width:700px){ .ker-widefig{ aspect-ratio:4/5; } }
  .ker-track{ list-style:none; margin:0; padding:0; position:relative; display:grid; grid-template-columns:1fr; gap:24px; }
  .ker-track::before{ content:''; position:absolute; background:var(--orange); left:17px; top:0; bottom:0; width:2px; transform-origin:top center; }
  .ker-step{ position:relative; padding-left:56px; }
  .ker-step i{ position:absolute; left:0; top:0; width:36px; height:36px; border-radius:50%; background:var(--orange); color:#fff; font-style:normal; font-weight:700; font-family:var(--font-mono); display:grid; place-items:center; }
  .ker-step h3{ margin:6px 0 8px; font-size:1.1rem; color:var(--ink); }
  .ker-step p{ margin:0; color:var(--ink-soft); line-height:1.6; font-size:.95rem; }
  @media (min-width:900px){ .ker-track{ grid-template-columns:repeat(4,1fr); gap:32px; padding-top:54px; } .ker-track::before{ left:18px; right:18px; top:17px; bottom:auto; height:2px; width:auto; transform-origin:left center; } .ker-step{ padding-left:0; } .ker-step i{ top:-54px; } }

  /* 08 — the range */
  .ker-range{ margin:8px 0 clamp(28px,3vw,44px); }
  .ker-range .axis{ display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:.7rem; color:rgba(255,255,255,.5); border-bottom:1px solid rgba(255,255,255,.18); padding-bottom:8px; margin-bottom:14px; }
  .ker-range .bar{ position:relative; height:54px; margin-bottom:10px; }
  .ker-range .bar::before{ content:''; position:absolute; left:var(--from); width:calc(var(--to) - var(--from)); top:0; height:100%; border-radius:8px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.22); transform-origin:left center; }
  .ker-range .bar.b2::before{ background:rgba(217,83,30,.28); border-color:rgba(217,83,30,.55); }
  .ker-range .bar b, .ker-range .bar span{ position:absolute; left:calc(var(--from) + 14px); }
  .ker-range .bar b{ top:8px; font-size:.95rem; }
  .ker-range .bar span{ top:30px; font-family:var(--font-mono); font-size:.72rem; color:rgba(255,255,255,.7); }
  .ker-range-note{ margin:16px 0 0; font-size:.92rem; line-height:1.6; color:rgba(255,255,255,.72); max-width:70ch; }
  .ker-drivers{ display:grid; grid-template-columns:1fr; gap:18px 32px; margin-bottom:clamp(22px,3vw,36px); }
  @media (min-width:760px){ .ker-drivers{ grid-template-columns:repeat(2,1fr); } }
  .drv{ display:grid; grid-template-columns:52px 1fr; gap:4px 14px; }
  .drv b{ grid-row:1 / span 2; font-family:var(--font-mono); font-size:1.8rem; color:var(--orange); line-height:1; }
  .drv h3{ margin:0; font-size:1.05rem; color:#fff; }
  .drv p{ margin:0; font-size:.92rem; line-height:1.55; color:rgba(255,255,255,.72); }

  /* 09 — the checklist */
  .ker-check{ list-style:none; margin:0; padding:0; }
  .ker-check li{ display:grid; grid-template-columns:34px 1fr; gap:14px; padding:14px 0; border-bottom:1px solid var(--line); }
  .ker-check svg{ width:30px; height:30px; margin-top:2px; }
  .ker-check path{ fill:none; stroke:var(--orange); stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
  .ker-check h3{ margin:0 0 6px; font-size:1.05rem; color:var(--ink); }
  .ker-check p{ margin:0; font-size:.92rem; line-height:1.55; color:var(--ink-soft); }

  /* band */
  .ker-band{ position:relative; background:var(--navy-deep); color:#fff; }
  .ker-bandfig{ aspect-ratio:21/9; overflow:hidden; position:relative; }
  .ker-bandfig::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(4,9,20,.85) 0%, rgba(4,9,20,.45) 50%, rgba(4,9,20,.2) 100%); }
  .ker-bandtext{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); }
  .ker-bandtext p{ color:rgba(255,255,255,.8); max-width:44ch; margin:0 0 18px; }
  @media (max-width:700px){ .ker-bandfig{ aspect-ratio:4/5; } }

  /* ================= reveals : start states only under html.ker-on ================= */
  html.ker-on .ker-head .ker-slate::before{ transform:scaleX(0); }
  html.ker-on .ker-head .ker-h2, html.ker-on .ker-head .ker-lede{ opacity:0; transform:translateY(14px); }
  html.ker-on .ker-head.lit .ker-slate::before{ animation:kerRule .7s cubic-bezier(.3,0,.2,1) forwards; }
  html.ker-on .ker-head.lit .ker-h2{ animation:kerRise .6s cubic-bezier(.2,.7,.2,1) .15s forwards; }
  html.ker-on .ker-head.lit .ker-lede{ animation:kerRise .6s cubic-bezier(.2,.7,.2,1) .3s forwards; }
  @keyframes kerRule{ to{ transform:scaleX(1); } }
  @keyframes kerRise{ to{ opacity:1; transform:none; } }
  /* 01 */
  html.ker-on .ker-stage .ker-plate .ker-img{ transform:scale(1.08); transition:transform 1.6s cubic-bezier(.18,.72,.2,1); }
  html.ker-on .ker-stage.lit .ker-plate .ker-img{ transform:scale(1); }
  html.ker-on .ker-stage .ker-node:not(.core){ opacity:0; transform:translate(var(--sx,0px),var(--sy,0px)) scale(.15); }
  html.ker-on .ker-stage.lit .ker-node:not(.core){ opacity:1; transform:none; transition:transform .95s cubic-bezier(.2,.8,.2,1) calc(.45s + var(--d) * .13s), opacity .35s linear calc(.45s + var(--d) * .13s); }
  html.ker-on .ker-stage .ker-node b{ opacity:0; }
  html.ker-on .ker-stage.lit .ker-node b{ opacity:1; transition:opacity .4s linear calc(1.1s + var(--d,0) * .13s); }
  html.ker-on .ker-stage.lit .ker-node.core b{ transition-delay:.1s; }
  html.ker-on .ker-stage .ker-lines line{ stroke-dasharray:1; stroke-dashoffset:1; }
  html.ker-on .ker-stage.lit .ker-lines line{ stroke-dashoffset:0; transition:stroke-dashoffset .8s cubic-bezier(.3,0,.2,1) calc(.55s + var(--d) * .13s); }
  html.ker-on .ker-stage.lit .ker-node.core i{ animation:kerPulse 1.1s ease-out .2s 1; }
  @keyframes kerPulse{ 0%{ box-shadow:0 0 0 6px rgba(217,83,30,.28); } 60%{ box-shadow:0 0 0 26px rgba(217,83,30,0); } 100%{ box-shadow:0 0 0 6px rgba(217,83,30,.28); } }
  html.ker-on .ker-stage .ker-stage-cap{ opacity:0; }
  html.ker-on .ker-stage.lit .ker-stage-cap{ opacity:1; transition:opacity .5s linear 1.9s; }
  /* 02 */
  html.ker-on .ker-portrait .ker-img{ transform:scale(1.08); transition:transform 1.4s cubic-bezier(.18,.72,.2,1) .1s; }
  html.ker-on .ker-portrait.lit .ker-img{ transform:scale(1); }
  html.ker-on .ker-portrait.lit .ker-veil{ animation:kerVeil .9s cubic-bezier(.7,0,.2,1) forwards; }
  @keyframes kerVeil{ to{ transform:translateX(101%); } }
  html.ker-on .ker-portrait figcaption{ opacity:0; transform:translateY(10px); }
  html.ker-on .ker-portrait.lit figcaption{ animation:kerRise .5s ease .8s forwards; }
  html.ker-on .ker-cert{ opacity:0; transform:scale(1.35) rotate(-7deg); }
  html.ker-on .ker-certs.lit .ker-cert{ animation:kerStamp .55s cubic-bezier(.2,.9,.3,1.25) forwards; animation-delay:calc(var(--d) * .14s); }
  @keyframes kerStamp{ to{ opacity:1; transform:none; } }
  /* 03 */
  html.ker-on .ker-spine::before{ transform:scaleY(0); }
  html.ker-on .ker-spine.lit::before{ animation:kerGrowY 2.2s cubic-bezier(.3,0,.2,1) forwards; }
  @keyframes kerGrowY{ to{ transform:scaleY(1); } }
  html.ker-on .ker-spine li{ opacity:0; transform:translateX(-18px); }
  html.ker-on .ker-spine li i{ transform:scale(0); }
  html.ker-on .ker-spine.lit li{ animation:kerSlide .5s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d) * .14s); }
  html.ker-on .ker-spine.lit li i{ animation:kerPop .4s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(var(--d) * .14s + .1s); }
  @keyframes kerSlide{ to{ opacity:1; transform:none; } }
  @keyframes kerPop{ to{ transform:none; } }
  html.ker-on .ker-photo .ker-img{ clip-path:polygon(0 0, 0 0, 0 100%, 0 100%); }
  html.ker-on .ker-photo.lit .ker-img{ animation:kerDiag .9s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .18s); }
  @keyframes kerDiag{ 50%{ clip-path:polygon(0 0, 70% 0, 30% 100%, 0 100%); } to{ clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%); } }
  html.ker-on .ker-photo figcaption{ opacity:0; }
  html.ker-on .ker-photo.lit figcaption{ opacity:1; transition:opacity .4s linear calc(.8s + var(--d) * .18s); }
  /* 04 */
  html.ker-on .ker-tbl tbody tr{ opacity:0; transform:rotateX(-70deg); }
  html.ker-on .ker-tbl.lit tbody tr{ animation:kerFlip .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--d) * .1s); }
  @keyframes kerFlip{ to{ opacity:1; transform:none; } }
  html.ker-on .ker-callout{ opacity:0; transform:translateY(20px); }
  html.ker-on .ker-callout.lit{ animation:kerRise .6s cubic-bezier(.2,.7,.2,1) forwards; }
  /* 05 */
  html.ker-on .ker-svc::before{ transform:scaleX(0); }
  html.ker-on .ker-svc .in{ opacity:0; transform:translateY(12px); }
  html.ker-on .ker-svcgrid.lit .ker-svc::before{ animation:kerRule .6s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .1s); }
  html.ker-on .ker-svcgrid.lit .ker-svc .in{ animation:kerRise .55s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d) * .1s + .3s); }
  /* 06 */
  html.ker-on .ker-tile .ker-img{ clip-path:circle(0% at 50% 50%); transform:scale(1.1); }
  html.ker-on .ker-tile.lit .ker-img{ animation:kerIris 1s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  @keyframes kerIris{ to{ clip-path:circle(75% at 50% 50%); transform:none; } }
  html.ker-on .ker-tile figcaption{ opacity:0; transform:translateY(10px); }
  html.ker-on .ker-tile.lit figcaption{ animation:kerRise .5s ease forwards; animation-delay:calc(var(--d) * .12s + .5s); }
  /* 07 */
  html.ker-on .ker-widefig .ker-img{ transform:translateX(-4%) scale(1.1); transition:transform 1.8s cubic-bezier(.18,.72,.2,1); }
  html.ker-on .ker-widefig.lit .ker-img{ transform:none; }
  html.ker-on .ker-widefig.lit .ker-shade{ animation:kerShade 1.1s cubic-bezier(.3,0,.2,1) forwards; }
  @keyframes kerShade{ to{ opacity:0; visibility:hidden; } }
  html.ker-on .ker-widefig figcaption{ opacity:0; }
  html.ker-on .ker-widefig.lit figcaption{ opacity:1; transition:opacity .6s linear .9s; }
  html.ker-on .ker-track::before{ transform:scaleX(0) scaleY(0); }
  html.ker-on .ker-track.lit::before{ animation:kerTrack 1.8s cubic-bezier(.3,0,.2,1) forwards; }
  @keyframes kerTrack{ to{ transform:none; } }
  html.ker-on .ker-step i{ transform:scale(0); }
  html.ker-on .ker-step h3, html.ker-on .ker-step p{ opacity:0; transform:translateY(10px); }
  html.ker-on .ker-track.lit .ker-step i{ animation:kerPop .45s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(.1s + var(--d) * .42s); }
  html.ker-on .ker-track.lit .ker-step h3, html.ker-on .ker-track.lit .ker-step p{ animation:kerRise .5s ease forwards; animation-delay:calc(.3s + var(--d) * .42s); }
  /* 08 */
  html.ker-on .ker-range .bar::before{ transform:scaleX(0); }
  html.ker-on .ker-range .bar b, html.ker-on .ker-range .bar span{ opacity:0; }
  html.ker-on .ker-range.lit .bar::before{ animation:kerRule 1.1s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d) * .35s); }
  html.ker-on .ker-range.lit .bar b, html.ker-on .ker-range.lit .bar span{ opacity:1; transition:opacity .4s linear calc(.7s + var(--d) * .35s); }
  html.ker-on .ker-range .ker-range-note{ opacity:0; }
  html.ker-on .ker-range.lit .ker-range-note{ opacity:1; transition:opacity .5s linear 1.6s; }
  html.ker-on .drv{ opacity:0; transform:translateY(16px); }
  html.ker-on .ker-drivers.lit .drv{ animation:kerRise .55s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d) * .12s); }
  /* 09 */
  html.ker-on .ker-check path{ stroke-dasharray:1; stroke-dashoffset:1; }
  html.ker-on .ker-check li div{ opacity:0; transform:translateX(12px); }
  html.ker-on .ker-check.lit path{ stroke-dashoffset:0; transition:stroke-dashoffset .5s cubic-bezier(.3,0,.2,1) calc(var(--d) * .16s); }
  html.ker-on .ker-check.lit li div{ animation:kerSlide .5s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d) * .16s + .1s); }
  /* band : movement only, scroll-driven where supported */
  @supports (animation-timeline: view()){
    .ker-bandfig .ker-img{ animation:kerDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; transform-origin:center; }
    @keyframes kerDrift{ from{ transform:scale(1.14) translateY(-4%); } to{ transform:scale(1.14) translateY(4%); } }
  }

  @media (prefers-reduced-motion: reduce){
    html.ker-on .ker-head .ker-slate::before, html.ker-on .ker-head .ker-h2, html.ker-on .ker-head .ker-lede,
    html.ker-on .ker-stage .ker-node, html.ker-on .ker-stage .ker-node b, html.ker-on .ker-stage .ker-lines line, html.ker-on .ker-stage .ker-stage-cap, html.ker-on .ker-stage .ker-plate .ker-img,
    html.ker-on .ker-portrait .ker-img, html.ker-on .ker-portrait figcaption, html.ker-on .ker-cert,
    html.ker-on .ker-spine::before, html.ker-on .ker-spine li, html.ker-on .ker-spine li i, html.ker-on .ker-photo .ker-img, html.ker-on .ker-photo figcaption,
    html.ker-on .ker-tbl tbody tr, html.ker-on .ker-callout, html.ker-on .ker-svc::before, html.ker-on .ker-svc .in,
    html.ker-on .ker-tile .ker-img, html.ker-on .ker-tile figcaption, html.ker-on .ker-widefig .ker-img, html.ker-on .ker-widefig figcaption,
    html.ker-on .ker-track::before, html.ker-on .ker-step i, html.ker-on .ker-step h3, html.ker-on .ker-step p,
    html.ker-on .ker-range .bar::before, html.ker-on .ker-range .bar b, html.ker-on .ker-range .bar span, html.ker-on .ker-range .ker-range-note, html.ker-on .drv,
    html.ker-on .ker-check path, html.ker-on .ker-check li div, .ker-bandfig .ker-img{
      opacity:1 !important; transform:none !important; clip-path:none !important; animation:none !important; transition:none !important; stroke-dashoffset:0 !important;
    }
    html.ker-on .ker-veil, html.ker-on .ker-shade{ display:none !important; }
  }
`;

// ---------------------------------------------------------------------------------------------
// the observer — html.ker-on is added only here, after the reduced-motion check
const JS = `
/* in_kerala.js : light each frame once as it arrives, then stop watching it. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var frames = document.querySelectorAll('.ker-head, .ker-stage, .ker-portrait, .ker-certs, .ker-spine, .ker-photo, .ker-tbl, .ker-callout, .ker-svcgrid, .ker-tile, .ker-widefig, .ker-track, .ker-range, .ker-drivers, .ker-check');
    if (!frames.length) return;
    /* the constellation: measure each node's offset back to the centre BEFORE the start states apply */
    var stage = document.querySelector('.ker-stage');
    if (stage) {
        var r = stage.getBoundingClientRect();   /* nodes and the SVG are positioned against the stage, so measure the stage */
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var nodes = stage.querySelectorAll('.ker-node:not(.core)');
        var lines = stage.querySelectorAll('.ker-lines line');
        for (var n = 0; n < nodes.length; n++) {
            var b = nodes[n].getBoundingClientRect();
            /* aim the line at wherever CSS put the node at this breakpoint (x2/y2 are attributes, not CSS) */
            if (lines[n]) { lines[n].setAttribute('x2', ((b.left - r.left) / r.width * 100).toFixed(2)); lines[n].setAttribute('y2', ((b.top - r.top) / r.height * 100).toFixed(2)); }
            nodes[n].style.setProperty('--sx', (cx - b.left) + 'px');
            nodes[n].style.setProperty('--sy', (cy - b.top) + 'px');
        }
    }
    document.documentElement.classList.add('ker-on');
    var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            entries[i].target.classList.add('lit');
            io.unobserve(entries[i].target);
        }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// ---------------------------------------------------------------------------------------------
// build
let s = L.read('in/kerala/index.html');
L.must(s, 'id="city-body"', 1);   // fresh in_city output; run in_hub -> in_city -> in_story -> in_kerala
const WA = (s.match(/https:\/\/wa\.me\/[^"'\s]+/) || ['#contact'])[0];

// head
s = L.setHead(s, {
  title: 'SEO Expert in Kerala? Hire the Team Behind One | TechAuditPros Kochi',
  desc: 'Searching for a freelance SEO expert in Kerala? We are a Kochi team doing that work with a developer, a search specialist and a systems engineer. Weekly staging URL, monthly report, no contract.',
  url: URL,
  hreflang: [{ lang: 'en-in', href: URL }, { lang: 'x-default', href: 'https://techauditpros.com/in/' }],
});

// hero copy
s = s.replace(/(<p class="eyebrow" id="heroEyebrowRotate"><span class="hero-rotate-text">)[\s\S]*?(<\/span><\/p>)/, '$1' + HERO.eyebrow + '$2');
s = s.replace(/<h1>[\s\S]*?<\/h1>/, '<h1>' + HERO.h1 + '</h1>');
s = s.replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/, '<p class="hero-subtitle">' + HERO.sub + '</p>');
s = L.replaceAll(s, 'href="#city-body" class="btn-ghost">What this city actually asks for &darr;</a>', 'href="#ker-one" class="btn-ghost">Why a team, not one person &darr;</a>');

// body
const body = [
  L.answer(ANSWER),
  ACT_ONE, ACT_FOUNDER, ACT_DISTRICTS, ACT_COMPARE, ACT_SERVICES, ACT_SECTORS, ACT_PROCESS, ACT_COST, ACT_CHECK, BAND,
  L.faqHtml('city-faq', 'Questions Kerala businesses ask us', 'Twelve straight answers, including the ones that send you to a freelancer.', FAQS),
].join('\n').split('__WA__').join(WA);
s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let&rsquo;s look at one real page together &mdash; in Kochi or on WhatsApp.', 'Takes 60 seconds &middot; For Kerala businesses &middot; The findings are yours to keep &middot; No long-term contract');

// schemas: keep in_city's breadcrumb + service blocks, replace its FAQ block, add the founder
{
  // pick by parsed top-level @type — the site-wide Organization block nests a Service, so no regex on the text
  const firstStyle = s.indexOf('<style');
  const blocks = s.slice(firstStyle).match(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  const typeOf = x => { try { return JSON.parse(x.replace(/^[\s\S]*?<script[^>]*>/, '').replace(/<\/script>[\s\S]*$/, ''))['@type']; } catch (e) { return '?'; } };
  const keep = blocks.filter(x => ['BreadcrumbList', 'Service'].includes(typeOf(x)));
  if (keep.length !== 2) throw new Error('expected breadcrumb + service blocks from in_city, found: ' + blocks.map(typeOf).join(', '));
  const person = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "${URL}#founder",
      "name": "Aji Paul",
      "jobTitle": "Founder",
      "worksFor": { "@type": "Organization", "name": "TechAuditPros", "url": "https://techauditpros.com/" },
      "image": "https://techauditpros.com/assets/images/library/${FOUNDER.slug}.jpg",
      "url": "${URL}#ker-founder",
      "address": { "@type": "PostalAddress", "addressLocality": "Kochi", "addressRegion": "Kerala", "addressCountry": "IN" },
      "knowsAbout": ["Technical SEO", "Local SEO", "Ecommerce SEO", "Answer Engine Optimisation", "Website development", "ERP software"],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "Google Analytics (GA4) Certification", "credentialCategory": "certificate", "recognizedBy": { "@type": "Organization", "name": "Google" } },
        { "@type": "EducationalOccupationalCredential", "name": "Google Ads Search Certification", "credentialCategory": "certificate", "recognizedBy": { "@type": "Organization", "name": "Google" } },
        { "@type": "EducationalOccupationalCredential", "name": "Semrush SEO Toolkit Certification", "credentialCategory": "certificate", "recognizedBy": { "@type": "Organization", "name": "Semrush" } }
      ]
    }
    </script>`;
  s = L.setPageSchemas(s, keep.map(b => b.replace(/^\s+/, '    ')).concat([L.faqSchema(FAQS), person]));
}

// styles + script
{
  const at = s.indexOf('</style>'); if (at === -1) throw new Error('no </style>');
  s = s.slice(0, at) + CSS + s.slice(at);
  const bt = s.lastIndexOf('</body>'); if (bt === -1) throw new Error('no </body>');
  s = s.slice(0, bt) + '<script>' + JS + '</script>\n' + s.slice(bt);
}

// ---------------------------------------------------------------------------------------------
// guards
if (/[Oo]ffshore/.test(s)) throw new Error('"offshore" on /in/kerala/');
{
  const prose = s
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, ' ')
    .replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/TechAuditPros/g, ' ').replace(/techauditpros/gi, ' ')
    .replace(/seo-audit-kochi/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  if (/audit/i.test(prose)) throw new Error('"audit" survives as a service word on /in/kerala/');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 3400) throw new Error('only ' + words + ' words; SERP parity needs 3,400+');
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | photographs: ' + (Object.keys(STOCK).length + 1) + ' + ' + CERTS.length + ' certificates');
}
// no photograph of this page appears on any other page
{
  const walk = (d, out) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'node_modules' || e.name.startsWith('.')) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html') out.push(p); } return out; };
  const pages = walk(L.REPO, []).filter(p => !p.replace(/\\/g, '/').endsWith('/in/kerala/index.html'));
  const used = [];
  for (const slug of Object.values(STOCK).concat([FOUNDER.slug])) for (const p of pages) if (fs.readFileSync(p, 'utf8').includes('library/' + slug)) used.push(slug + ' on ' + path.relative(L.REPO, p));
  if (used.length) throw new Error('photographs reused across pages:\n  ' + used.join('\n  '));
}
L.must(s, '<section class="ker', 10); L.must(s, 'class="ker-band"', 1);   // 9 acts + the band L.must(s, 'html.ker-on', 1 + (CSS.match(/html\.ker-on/g) || []).length - 1);
L.must(s, 'class="ker-node', TEAM.length + 1); L.must(s, '<li style="--d:', DISTRICTS.length + CHECKLIST.length);

L.write('in/kerala/index.html', s);
console.log('/in/kerala/ rebuilt to SERP parity: 9 acts + band, own signature "one becomes many", 12 FAQs, founder + certificates');
