'use strict';
// India blog wave 1, posts 1-8 (ai_context/PLAN-IN §3). Each post owns one keyword cluster from the owner's India
// SEMrush export, uses Indian incumbents and Indian figures (attributed), links up to /in/ or the India city page it
// supports, and follows the India rules: no "audit" as a service word, no "offshore", no price we charge; rates that
// move (GST, MSME thresholds) point at the source. Written 2026-09-07 against the live first page for each cluster.
//   1 seo packages for small business 1,600/19 · seo charges in india 1,000/14 · seo cost in india 1,000/14 · seo price in india 1,000/13 · affordable seo packages 260/12
//   2 affordable local seo services 3,600/14 · local seo services 1,900/32 · local seo in mumbai 1,000/10 · local seo kolkata 480/10
//   3 seo consultant 1,000/30 · seo consultant kolkata 1,000/21 · freelance seo kerala 590/4 · seo freelancer kerala 590/10
//   4 technical seo vs on page seo 2,400/16 · on page seo vs technical seo 720/15 · on page seo services 880/30
//   5 erp software price 320/15 · tally erp 9 software price 260/27 · marg erp software price 210/23 · the cost of erp is 320/19
//   6 best erp software 1,300/30 · manufacturing erp software india 1,000/15 · erp software for small business 390/28
//   7 zoho erp software 9,900/31 (tail) · tally erp · busy erp · marg erp
//   8 shopify seo services 590/16 · shopify seo expert 210/8 · shopify seo company 4,400/32 (tail)
const D = '2026-09-07';
const SEO_CTA = { h3: 'Want the honest version for your own site?', p: 'Book a free strategy call, or message us on WhatsApp. We walk one real page through with you and tell you where the leverage is &mdash; including when the answer is a good freelancer, or nothing yet. The findings are yours to keep.' };
const ERP_CTA = { h3: 'Weighing up a system for your own business?', p: 'Book a free strategy call. We walk one real order through your business &mdash; from enquiry to invoice &mdash; and tell you honestly whether Tally plus a spreadsheet, a cloud product or a custom build fits, including when the answer is &ldquo;not yet&rdquo;.' };
const F = (img, alt, cap) => ({ img: img + '.jpg', alt, cap });

module.exports = [
// ------------------------------------------------------------------ 1. What SEO costs in India
{
  slug: 'seo-cost-in-india-what-drives-the-price', cat: 'seo', date: D,
  title: 'SEO Cost in India (2026): What the Price Actually Depends On | TechAuditPros',
  desc: 'Published SEO prices in India run from ₹5,000 to ₹1,00,000+ a month for the same word. Here is what the packages contain, what genuinely moves the price, and the three questions that make any quote comparable.',
  eyebrow: 'SEO pricing',
  h1: 'SEO Cost in India: What the Price Actually Depends On',
  dek: 'Every pricing page in India quotes a different number for the same word. This one explains the number instead &mdash; what a ₹10,000 package and a ₹1,00,000 retainer are each actually paying for, and how to compare two quotes that look nothing alike.',
  lead: F('inb-rupee-notes-closeup', 'Indian rupee banknotes, close up', 'Published SEO prices in India span a twenty-fold range. The word is the same; the work is not.'),
  takeaways: [
    'Published figures on the first page of Google for &ldquo;SEO cost in India&rdquo; run from about <strong>&#8377;5,000 to &#8377;1,00,000+ a month</strong>; most small and medium businesses quoted in those guides sit between &#8377;10,000 and &#8377;50,000.',
    'Four things move the price: how much of the work is <strong>development</strong>, how <strong>contested</strong> your terms are, whether anyone can <strong>ship the changes</strong>, and whether you are buying <strong>one discipline or three</strong>.',
    'Packages priced by &ldquo;keywords&rdquo; and &ldquo;backlinks per month&rdquo; are counting inputs. Ask instead what ships in the first thirty days and what you keep if you stop.',
    'Below roughly &#8377;5,000 a month the guides themselves warn the work cannot include real research, writing or clean link acquisition &mdash; that money buys automation.',
  ],
  intro: '<strong>SEO in India costs</strong> anywhere from about &#8377;5,000 to more than &#8377;1,00,000 a month, according to the pricing guides that rank for this search in September 2026 &mdash; and the spread is the point, not a mistake. A five-page clinic in Thrissur and a 400-product jewellery store selling nationally are both &ldquo;doing SEO&rdquo;, and the tiers on most pricing pages are quietly counting pages, phrases and hours. This article explains what each part of the price pays for, what genuinely moves it, and the three questions that turn two incomparable quotes into a decision.',
  sections: [
    { h2: 'What the Published Prices Actually Say', html: `
<p>We read the guides on the first page rather than inventing a range. Their own figures, as published:</p>
<ul>
<li><strong>Small local businesses:</strong> about &#8377;10,000&ndash;&#8377;20,000 a month is the most common band quoted for a single-city service business.</li>
<li><strong>Growing SMEs:</strong> &#8377;25,000&ndash;&#8377;50,000 a month is where most guides place a business that wants meaningful organic growth within four to six months.</li>
<li><strong>National and e-commerce:</strong> &#8377;50,000 to &#8377;1,00,000 and above, with agency retainers for full-service mandates quoted up to &#8377;3,00,000.</li>
<li><strong>Freelancers:</strong> established practitioners are quoted at &#8377;15,000&ndash;&#8377;80,000 a month depending on scope and specialism.</li>
<li><strong>The floor:</strong> several guides say plainly that below about &#8377;5,000 a month the work cannot contain genuine keyword research, quality writing or clean link building, and is usually automation, spun content or directory spam.</li>
</ul>
<p>Notice what the bands are keyed to: business size and ambition, not work. That is why two quotes at &#8377;25,000 can describe completely different months.</p>`,
      figure: F('inb-rupee-coins-and-notes', 'Rupee coins and banknotes on a table', 'The bands on most pricing pages are keyed to your business size, not to the work. That is why two quotes at the same figure can describe different months.') },
    { h2: 'What a Package Is Actually Counting', html: `
<p>Open any three Indian SEO packages side by side and the columns are the same: number of keywords, number of pages optimised, blog posts per month, backlinks per month, a reporting frequency. These are <em>inputs</em>. They are honest as far as they go &mdash; a 50-phrase plan really does take more hours than a 10-phrase plan &mdash; but they tell you nothing about whether those hours land on the thing that is holding your site back.</p>
<div class="article-table-wrap"><table>
<tr><th>The package line</th><th>What it is really counting</th><th>The question it leaves out</th></tr>
<tr><th>&ldquo;20 keywords&rdquo;</th><td>Hours of research and a set of target pages</td><td>Are those the terms your buyers actually use, in your city, in your language?</td></tr>
<tr><th>&ldquo;10 pages optimised&rdquo;</th><td>Title tags, headings, copy edits</td><td>Are those pages indexed, and do they load on a mid-range phone?</td></tr>
<tr><th>&ldquo;4 blogs a month&rdquo;</th><td>Writing output</td><td>Does anyone search for what they are about?</td></tr>
<tr><th>&ldquo;30 backlinks a month&rdquo;</th><td>Link acquisition volume</td><td>From where, and would you be comfortable if a client saw the list?</td></tr>
<tr><th>&ldquo;Monthly report&rdquo;</th><td>A ranking screenshot, usually</td><td>Does it show enquiries and revenue by page, or positions by phrase?</td></tr>
</table></div>
<p>None of that makes packages wrong. It makes them incomplete, and it explains why the price is not the useful number.</p>` },
    { h2: 'The Four Things That Genuinely Move the Price', html: `
<p>Strip away the tier names and the cost of doing search work well in India comes down to four variables. Any honest quote can be explained in terms of them.</p>
<ul>
<li><strong>How much of the work is development.</strong> A site that needs its templates fixed &mdash; slow on Jio, half-indexed, filters generating thousands of duplicate URLs &mdash; needs a developer before it needs a writer. Developer hours cost more than writer hours, and most packages quietly assume the site is fine.</li>
<li><strong>How contested the terms are.</strong> Ranking a dental clinic in one Kochi neighbourhood and ranking a gold-jewellery brand nationally are different projects sold under one word. The second needs more content, more authority and more time.</li>
<li><strong>Whether anyone can ship the changes.</strong> Recommendations that wait three months in your developer&rsquo;s queue cost you three months. A supplier whose developer is on the team charges more and delivers sooner; a consultant who hands you a document charges less and depends on you.</li>
<li><strong>One discipline or three.</strong> Search alone is one project. Search plus a rebuild plus the stock system that feeds the storefront is three, and pretending otherwise is how &ldquo;SEO&rdquo; quotes balloon mid-engagement.</li>
</ul>
<div class="article-callout">Ask any supplier to explain their figure in those four terms. If the answer is a tier name, you have learnt something about the supplier, not the price.</div>`,
      band: F('inb-rupee-symbol-large', 'A large Indian rupee symbol', 'The price is explainable or it is a tier name.') },
    { h2: 'Freelancer, Agency or Team &mdash; the Cost Shape Differs', html: `
<p>The published guides agree on the shape: freelancers cost less per month, agencies cost more but bundle tools, writing and reporting that a freelancer charges for separately or does not provide. What they rarely say is that the two are cheap and expensive in different places.</p>
<p>A freelancer is cheap up front and expensive when the job needs a skill they do not have &mdash; a template fix, a migration, a stock integration &mdash; because that becomes a second supplier. An agency is expensive up front and cheap when the work spans disciplines, because it is one invoice. A small team that does the engineering and the search work together sits between the two and is usually the right buy when the site itself is part of the problem. We wrote the honest version of that comparison for <a href="/in/kerala/">Kerala</a>, where the market searches for freelancers, and for <a href="/in/kolkata/">Kolkata</a>, where it searches for consultants.</p>`,
      figure: F('inb-stack-of-rupee-notes', 'A stack of Indian banknotes', 'Cheap up front and expensive later, or the reverse: freelancers and agencies are cheap in different places.') },
    { h2: 'The Three Questions That Make Any Quote Comparable', html: `
<p>Whatever you are quoted, in whatever city, ask these three and write the answers down. They convert a price into a plan.</p>
<ol>
<li><strong>What ships in the first thirty days?</strong> A specific list &mdash; these pages, this fix, this Business Profile &mdash; is a plan. &ldquo;Keyword research and strategy&rdquo; is a delay you are paying for.</li>
<li><strong>What will I have at the end of ninety days?</strong> Pages that exist, fixes that are live, a profile that is complete, a report that shows enquiries. Not &ldquo;improved rankings&rdquo;.</li>
<li><strong>What do I keep if I stop then?</strong> Accounts, content, code, reports and the plan itself should be yours from day one. If any of it stays with the supplier, the quoted price is not the price.</li>
</ol>
<p>We do not publish a rate card, for the reasons this article gives: the same figure means different work. What we give a business in <a href="/in/">India</a> instead is a written ninety-day plan and a price against it, so you can put it beside any of the figures above and see exactly what differs.</p>` },
  ],
  faqs: [
    { q: 'How much does SEO cost in India per month?', a: 'Published guides on the first page of Google for this search quote roughly &#8377;5,000 to &#8377;1,00,000+ a month, with most small and medium businesses placed between &#8377;10,000 and &#8377;50,000, freelancers at &#8377;15,000&ndash;&#8377;80,000, and full-service agency retainers up to &#8377;3,00,000 (September 2026). The spread reflects business size and ambition more than the work itself.' },
    { q: 'Why is there such a big range in SEO prices?', a: 'Because &ldquo;SEO&rdquo; covers a five-page local clinic and a 400-product national store. The price moves with four things: how much of the work is development, how contested the terms are, whether anyone can ship the changes, and whether you are buying one discipline or three.' },
    { q: 'Are cheap SEO packages worth it?', a: 'Below roughly &#8377;5,000 a month the pricing guides themselves warn that the work cannot include real research, writing or clean link acquisition, and usually relies on automation or spun content. Cheap is fine when the job is small and defined; cheap for a competitive term is money spent on nothing.' },
    { q: 'Is a freelancer cheaper than an SEO agency in India?', a: 'Per month, usually yes. Freelancers are quoted at &#8377;15,000&ndash;&#8377;80,000 against agency retainers from &#8377;40,000. The freelancer becomes expensive when the job needs a skill they lack &mdash; a template fix, a migration &mdash; because that becomes a second supplier. Agencies bundle it.' },
    { q: 'What should an SEO package include in the first month?', a: 'Visible work: fixes shipped on a staging site, the Google Business Profile corrected, the pages that already rank between 8th and 20th sharpened. If the first month is entirely research and a strategy document, ask what happens in month two before you pay for month one.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 2. Local SEO for Indian businesses
{
  slug: 'local-seo-india-the-free-things-first', cat: 'seo', date: D,
  title: 'Local SEO for Indian Businesses: The Free Things First | TechAuditPros',
  desc: 'Most winnable local searches in India are lost to incomplete Google Business Profiles, not to rivals. Here is the free work that moves the map results in Mumbai, Kolkata and Kerala, and what to pay for after it.',
  eyebrow: 'Local SEO',
  h1: 'Local SEO for Indian Businesses: The Free Things First',
  dek: 'Affordable local SEO is the most-searched SEO phrase in the owner&rsquo;s India data, and the honest answer is that the first month of it costs nothing but attention. This is that month, step by step, and then the part worth paying for.',
  lead: F('inb-crowded-street-shops', 'A busy Indian street lined with small shops', 'Every shop on this street is a local business. The ones Google can find are the ones with a complete, current profile.'),
  takeaways: [
    'The map pack decides the walk-in and the phone call for clinics, showrooms, restaurants and services. In most Indian cities it is contested by <strong>incomplete profiles</strong>, not strong ones.',
    'The first thirty days of local SEO are free: <strong>primary category, address consistency, true hours, twelve recent photographs, a review habit</strong> and answers to the questions your counter staff hear daily.',
    'After that, the work worth paying for is <strong>locality pages written the way people search</strong> (in English and the local language), citations that agree, and the technical layer that lets the site load on a mid-range phone.',
    '&ldquo;Affordable local SEO&rdquo; packages typically start around &#8377;10,000&ndash;&#8377;30,000 a month; check what in them you could have done yourself this week.',
  ],
  intro: '<strong>Local SEO</strong> is the work that gets a business into the map results and the &ldquo;near me&rdquo; searches for its city &mdash; and in India it is the most cost-effective search work there is, because the competition is usually weak. When we pull the winnable local terms for <a href="/in/mumbai/">Mumbai</a>, <a href="/in/kolkata/">Kolkata</a> or <a href="/in/kerala/">Kerala</a>, a striking share are contested by Google Business Profiles with the wrong category, photographs from 2019, hours that stopped being true two Pujas ago and no steady reviews. That means the first month of local SEO is free, and this article is that month, followed by what is genuinely worth paying for.',
  sections: [
    { h2: 'Why the Map Pack Matters More in India', html: `
<p>For a clinic in New Town, a jeweller in Thrissur or a restaurant in Bandra, the buyer is on a phone, often on the move, and the three map results with a phone button are the whole decision. The organic listings below them matter for research-heavy purchases; for &ldquo;dentist near me&rdquo; at 7 p.m. they barely exist.</p>
<p>Two things make this sharper in India than the global guides suggest. First, the share of mobile search is higher &mdash; industry guides put Indian e-commerce traffic at around 98% mobile, and local search is not far behind &mdash; so the map pack is visible before anything else on almost every screen. Second, profile quality is lower on average, so a complete profile stands out more than it would in London or Toronto.</p>`,
      figure: F('inb-variety-store-scooter', 'A variety store with a scooter passing in front', 'On a phone, the three map results with a call button are the whole decision for most local purchases.') },
    { h2: 'The First Thirty Days Cost Nothing', html: `
<p>This is the free work. It is unglamorous, which is why most suppliers skip it and most businesses never do it.</p>
<div class="article-table-wrap"><table>
<tr><th>Field</th><th>Get it to this</th><th>Why it moves results</th></tr>
<tr><th>Business name</th><td>Exactly as on the signboard and the GST certificate</td><td>Mismatches across the web read as different businesses</td></tr>
<tr><th>Primary category</th><td>The one your best customer would search, not the broadest</td><td>The single strongest ranking signal in the profile</td></tr>
<tr><th>Address and pin</th><td>Identical on the profile, the site, directories and invoices</td><td>Consistency is trust</td></tr>
<tr><th>Hours</th><td>True this month, festival closures included</td><td>A wrong &ldquo;open now&rdquo; earns a bad review</td></tr>
<tr><th>Photographs</th><td>Twelve recent ones of the actual premises, staff and work</td><td>Profiles with photographs get more direction requests</td></tr>
<tr><th>Reviews</th><td>Asked for after every completed job, answered within a day</td><td>Recency and reply rate both count</td></tr>
<tr><th>Services and products</th><td>Named the way your city searches, in English and the local language</td><td>Matches the query text</td></tr>
<tr><th>Q&amp;A</th><td>The questions your counter staff answer daily, written down once</td><td>Pre-empts the call that never happens</td></tr>
</table></div>
<p>Do that for one location and watch the profile insights for four weeks. For most businesses we see, direction requests and calls rise before a rupee is spent.</p>`,
      band: F('inb-shop-sign-street', 'A shop sign on an Indian street', 'The signboard is complete. Is the profile?') },
    { h2: 'Then the Part Worth Paying For', html: `
<p>Once the profile is complete, three pieces of work genuinely need a professional, and this is where an affordable package should be spending your money.</p>
<ul>
<li><strong>Locality pages written the way people search.</strong> Not one &ldquo;areas we serve&rdquo; page with forty place names. A page for Andheri, a page for Salt Lake, a page for Kakkanad, each answering what that neighbourhood actually asks &mdash; in English and, where the data says so, in Marathi, Bengali or Malayalam.</li>
<li><strong>Citations that agree.</strong> Justdial, Sulekha, IndiaMART, the trade directories for your sector, and the big global ones &mdash; all carrying the same name, address, phone and hours as the profile. Boring, effective, and usually wrong somewhere.</li>
<li><strong>The technical layer.</strong> A locality page that takes six seconds to load on a mid-range Android on a 4G connection is a page nobody reads. Speed, indexation and structured data (LocalBusiness schema with the same details as the profile) are developer work, and they cap everything above.</li>
</ul>`,
      figure: F('inb-street-food-cart-night', 'A man cooking at a street food cart beside closed shops', 'Open when the shops are closed: hours that are true right now are worth more than a paragraph of copy.') },
    { h2: 'What &ldquo;Affordable Local SEO&rdquo; Packages Contain', html: `
<p>The providers ranking for this search in September 2026 publish starter tiers from roughly &#8377;10,000 to &#8377;30,000 a month, typically bundling profile optimisation, a set number of citations, a locality page or two and a monthly report. Those are their figures, and for a business that will never do the free month itself, a package that does it for them is fair value.</p>
<p>Before you buy one, though, do the free month. Then look at the package and cross out everything you have already done. What is left &mdash; the locality pages, the citations, the technical fixes &mdash; is what you are actually paying for, and you can now judge the price against that rather than against the whole list.</p>
<div class="article-callout">The cheapest local SEO in India is a complete profile, kept true. The second cheapest is a page per neighbourhood that answers what the neighbourhood asks. Everything else is third.</div>` },
  ],
  faqs: [
    { q: 'What is local SEO and does a small Indian business need it?', a: 'Local SEO is the work that gets a business into the map results and &ldquo;near me&rdquo; searches for its city. If customers walk in, call or visit you, yes &mdash; the map pack decides most of those decisions on a phone, and in most Indian cities it is contested by incomplete profiles you can beat with attention alone.' },
    { q: 'How much do affordable local SEO services cost in India?', a: 'Providers ranking for this search publish starter tiers around &#8377;10,000&ndash;&#8377;30,000 a month (September 2026), usually bundling profile optimisation, citations, a locality page and a report. Do the free profile work first, then judge a package by what remains.' },
    { q: 'What is the single most important thing in a Google Business Profile?', a: 'The primary category. Choose the one your best customer would search for, not the broadest. After that: a complete, consistent address, true hours, recent photographs of the actual premises, and a steady flow of answered reviews.' },
    { q: 'Should locality pages be in English or the local language?', a: 'Both, when the search data says your customers search in both. Many local service searches in Kerala, Bengal and Maharashtra happen in Malayalam, Bengali or Marathi; a bilingual page with correct hreflang serves both without competing with itself.' },
    { q: 'How long does local SEO take to show results?', a: 'Profile fixes often move calls and direction requests within four weeks. Locality pages and citations take one to three months. Anyone quoting a single number for both is guessing.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 3. SEO freelancer or agency
{
  slug: 'seo-freelancer-or-agency-india-honest-comparison', cat: 'seo', date: D,
  title: 'SEO Freelancer or Agency in India? An Honest Comparison | TechAuditPros',
  desc: 'Kerala searches for a freelancer, Kolkata for a consultant, Mumbai for an agency. Here is what each actually gives you, what each costs, where each fails, and the honest rule for choosing.',
  eyebrow: 'Choosing a supplier',
  h1: 'SEO Freelancer or Agency in India? An Honest Comparison',
  dek: 'Most articles on this question are written by one side. This one is written by a small team &mdash; which is a side too &mdash; so it names the row where the freelancer wins, and the one where the agency does.',
  lead: F('inb-one-man-one-laptop', 'A man working alone at a laptop', 'One person&rsquo;s judgement, one invoice, one holiday away from a stop. That is both the strength and the risk.'),
  takeaways: [
    'A <strong>freelancer</strong> is one person&rsquo;s judgement: cheaper by the month (&#8377;15,000&ndash;&#8377;80,000 in published guides), direct, and genuinely the right buy for a defined job. Capacity and range are the risks.',
    'An <strong>agency</strong> is continuity and a wider skill set (retainers from about &#8377;40,000 up to &#8377;3,00,000): the right buy when the work spans disciplines. Never meeting the person doing the work is the risk.',
    'A <strong>consultant</strong> &mdash; the word Kolkata uses &mdash; is a freelancer who advises rather than executes; the plan is theirs, the shipping is yours.',
    'The honest rule: weigh the <strong>job</strong>, not the label. Defined job plus your own developer &rarr; freelancer. Three disciplines or continuity &rarr; team.',
  ],
  intro: 'Should you hire an <strong>SEO freelancer or an SEO agency</strong>? The search data across India answers differently by city &mdash; Kerala searches for a freelancer, Kolkata for a consultant, Mumbai for an agency &mdash; and every article ranking for the question is written by whichever kind of supplier wrote it. We are a small team in Kochi, which is a side too. So this comparison is built around where each option fails, including us, and ends with a rule you can apply without trusting any of us.',
  sections: [
    { h2: 'What Each One Actually Is', html: `
<p>The labels blur, so here is what you are buying in each case.</p>
<ul>
<li><strong>A freelancer</strong> is a single specialist, usually strong in one or two areas, who does the work themselves. You talk to the person doing it. Published Indian rates for established freelancers run &#8377;15,000&ndash;&#8377;80,000 a month depending on scope.</li>
<li><strong>A consultant</strong> is a freelancer who advises rather than executes: they produce the plan, the recommendations and the priorities, and your team or your developer ships them. Cheaper, and dependent on you having someone to ship.</li>
<li><strong>An agency</strong> is a coordinated team covering strategy, technical work, content, links and reporting, usually behind an account manager. Indian retainers are quoted from about &#8377;40,000 for boutique work to &#8377;3,00,000+ for full-service mandates, and the figure typically bundles tools, writing and reporting a freelancer charges for separately.</li>
<li><strong>A small team</strong> &mdash; what we are &mdash; is three to six people who do the engineering and the search work together without an account layer. Between the two in price; closest to the agency in range and to the freelancer in directness.</li>
</ul>`,
      figures: [
        F('inb-team-meeting-table', 'A team in discussion around a table', 'Agency: range and continuity, behind an account manager.'),
        F('inb-team-listening-presenter', 'A team seated at a table listening to a colleague', 'Team: the people on the call are the people on the work.'),
      ] },
    { h2: 'Where Each One Fails', html: `
<p>This is the useful table, because the failures are predictable.</p>
<div class="article-table-wrap"><table>
<tr><th>Question</th><th>Freelancer</th><th>Agency</th></tr>
<tr><th>Capacity</th><td>One holiday, one illness or one better client, and your work stops.</td><td>Someone is always on it. Whether the someone is good is the question.</td></tr>
<tr><th>Range</th><td>Excellent at one thing. A template fix, a migration or a stock integration becomes a second supplier.</td><td>Covers it, or resells it to a partner you never meet.</td></tr>
<tr><th>Who does the work</th><td>The person you hired.</td><td>A team behind an account manager; often juniors.</td></tr>
<tr><th>Speed on small fixes</th><td>Fast if inside their skill; otherwise waits for your developer.</td><td>Ticket queue; fast if the retainer is large.</td></tr>
<tr><th>Reporting</th><td>Often a WhatsApp message and a ranking screenshot.</td><td>A dashboard and a monthly call; sometimes revenue by page, often positions by phrase.</td></tr>
<tr><th>When you stop</th><td>Depends on the individual; accounts and logins are often theirs.</td><td>Notice periods in quarters; access sometimes theirs.</td></tr>
<tr><th>Wins when</th><td>The job is defined, the budget is fixed and you have a developer.</td><td>The work spans disciplines and continuity matters more than the monthly figure.</td></tr>
</table></div>`,
      band: F('inb-woman-laptop-bench', 'A woman working on a laptop on a concrete bench', 'The freelancer&rsquo;s strength is that you talk to the person doing the work. Ask the agency whether you will.') },
    { h2: 'The Indian Wrinkle: Who Ships the Changes?', html: `
<p>Global comparison articles assume you have a developer. Many Indian SMEs do not &mdash; the site was built by an agency two years ago, or by a cousin, and nobody currently has the keys. That changes the answer more than anything else on this page.</p>
<p>A consultant&rsquo;s recommendations are worth exactly as much as your ability to implement them. If you have no developer, a freelancer who can only advise is the wrong buy however good they are; you need someone who can ship a title tag, a redirect and a template fix the week they are found. That is the case for a team with a developer on it &mdash; not because teams are better, but because the work is half development in most Indian sites we see, and half of nothing is nothing.</p>` },
    { h2: 'The Honest Rule', html: `
<p>Weigh the job, not the label.</p>
<ol>
<li><strong>Hire a freelancer</strong> when the job is defined &mdash; a Business Profile, one campaign, one set of pages, a second opinion on an agency&rsquo;s work &mdash; and you have someone who can make the changes. Several good ones rank in Kerala and Kolkata, and some teach; if you want to learn and do it yourself, that is the best value on this page.</li>
<li><strong>Hire an agency</strong> when you want a large team, a local address and a wall of logos, and can pay for all three; Mumbai has excellent ones.</li>
<li><strong>Hire a small team</strong> when the storefront, the search work and the system behind them need doing together, and you would rather see the work than the office.</li>
</ol>
<p>We wrote the city-specific versions of this for <a href="/in/kerala/">Kerala</a>, <a href="/in/kolkata/">Kolkata</a> and <a href="/in/mumbai/">Mumbai</a>, each with the row where we lose filled in.</p>` },
  ],
  faqs: [
    { q: 'Is an SEO freelancer cheaper than an agency in India?', a: 'Per month, usually: published guides quote freelancers at &#8377;15,000&ndash;&#8377;80,000 and agency retainers from about &#8377;40,000 to &#8377;3,00,000+. The agency figure typically bundles tools, writing and reporting a freelancer charges for separately, and the freelancer becomes expensive when the job needs a skill they lack.' },
    { q: 'What is the difference between an SEO consultant and an SEO freelancer?', a: 'A consultant advises &mdash; the plan and the priorities are theirs, the implementation is yours. A freelancer usually executes as well. If you have no developer to ship changes, a pure consultant is the wrong buy regardless of quality.' },
    { q: 'When is a freelancer the better choice?', a: 'When the job is defined (a profile, a campaign, one set of pages), the budget is fixed, and you have someone who can make the changes they recommend. Also when you want to learn and act yourself &mdash; several Indian freelancers teach well.' },
    { q: 'When is an agency the better choice?', a: 'When the work spans the website, the search work and the systems behind them, or when continuity matters more than the lowest monthly figure &mdash; a shop cannot stop for one person&rsquo;s holiday.' },
    { q: 'What should I ask either one before hiring?', a: 'Who, by name, does the work; what ships in the first thirty days; whether you can see the staging site; what you keep if you stop in month three; and which of their case-study results were theirs alone rather than the client&rsquo;s own ads or season.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 4. Technical SEO vs on-page SEO
{
  slug: 'technical-seo-vs-on-page-seo-explained', cat: 'seo', date: D,
  title: 'Technical SEO vs On-Page SEO: The Difference, Explained Plainly | TechAuditPros',
  desc: 'Technical SEO asks whether search engines can reach and render your pages; on-page SEO asks whether the pages deserve to rank. Here is what each contains, which to do first, and why in India the answer is usually technical.',
  eyebrow: 'SEO fundamentals',
  h1: 'Technical SEO vs On-Page SEO: The Difference, Explained Plainly',
  dek: 'One is engineering, the other is editing. Both are called SEO, both appear on every package, and the order you do them in decides whether the money works.',
  lead: F('inb-macbook-dark-code', 'A laptop screen on a dark background', 'Technical SEO is the part of search that happens in code. On-page SEO is the part that happens in words.'),
  takeaways: [
    '<strong>Technical SEO</strong> is infrastructure: can search engines crawl, render and index the site, and does it load fast on the devices your buyers own? It is developer work.',
    '<strong>On-page SEO</strong> is the page itself: does the title, heading, copy, internal linking and structured data match what the searcher wants? It is editorial work.',
    'Do technical first. On-page work on a page that is not indexed, or takes six seconds on a mid-range phone, is money spent on a page nobody sees.',
    'In India the technical layer is more often the problem than elsewhere: industry guides put around 60% of Indian websites outside Core Web Vitals thresholds, against roughly 40% globally.',
  ],
  intro: '<strong>Technical SEO</strong> is the work that lets search engines reach, render and index your site and lets it load fast on the phones your customers own; <strong>on-page SEO</strong> is the work that makes an individual page deserve to rank &mdash; its title, headings, copy, internal links and structured data. Technical answers &ldquo;can Google get here?&rdquo;; on-page answers &ldquo;does this page satisfy the search?&rdquo;. Every Indian SEO package lists both. The useful questions are which one your site actually needs, in which order, and who is qualified to do each &mdash; because one is engineering and the other is editing.',
  sections: [
    { h2: 'What Technical SEO Contains', html: `
<p>Technical SEO is everything that has to be true before content matters. On most Indian sites we look at, several of these are not true.</p>
<ul>
<li><strong>Crawlability and indexation:</strong> can Googlebot reach every page that should rank, and is it choosing to index them? Robots rules, sitemaps, noindex tags left over from a redesign, pages orphaned from the navigation.</li>
<li><strong>Canonicalisation:</strong> one URL per page. Filters, tracking parameters, trailing slashes and http/https variants routinely create dozens of duplicates that split the signal.</li>
<li><strong>Speed and Core Web Vitals:</strong> measured on a mid-range Android on a 4G connection, not on a laptop in the office. Largest Contentful Paint, layout shift and responsiveness are ranking inputs.</li>
<li><strong>Rendering:</strong> content that exists only after JavaScript runs may not exist for the crawler at all.</li>
<li><strong>Site architecture:</strong> money pages three clicks from anywhere, not eight; internal links that pass authority where it earns money.</li>
<li><strong>Structured data:</strong> LocalBusiness, Product, FAQ and Breadcrumb schema, validated, matching the visible page.</li>
<li><strong>Redirects and migrations:</strong> a 301 map after every redesign or domain move, so the authority built over years is not thrown away in an afternoon.</li>
<li><strong>Hreflang:</strong> Bengali and English, or Malayalam and English, pages declared to each other so they help rather than compete.</li>
</ul>`,
      figure: F('inb-laptop-lamp-coffee-desk', 'A laptop on a dark desk with a lamp and coffee', 'Everything on the technical list has to be true before a word of content matters.') },
    { h2: 'What On-Page SEO Contains', html: `
<p>On-page SEO is the page as a reader and a search engine see it. It is where most &ldquo;SEO packages&rdquo; spend their hours, because it is visible and countable.</p>
<ul>
<li><strong>Search intent match:</strong> does the page answer what the phrase means? A page selling gold jewellery will not rank for &ldquo;gold rate today&rdquo; however well it is written.</li>
<li><strong>Title tag and H1:</strong> the phrase, the promise, the place &mdash; in that order, in under sixty characters for the title.</li>
<li><strong>Headings and structure:</strong> H2s that mirror the sub-questions people actually ask, so a reader and a crawler can both scan the argument.</li>
<li><strong>Copy that answers first:</strong> the first sentence under each heading answers the heading. This is also what AI answer engines quote.</li>
<li><strong>Internal links:</strong> from the pages that have authority to the pages that need it, with descriptive anchor text.</li>
<li><strong>Images:</strong> file names, alt text, dimensions and compression &mdash; part of both disciplines, which is why the two blur.</li>
<li><strong>Meta description:</strong> not a ranking factor, but the sentence that decides the click.</li>
</ul>`,
      band: F('inb-man-glasses-laptop', 'A man in glasses looking down at a laptop', 'On-page work is editing. It is visible, countable, and useless on a page the crawler cannot reach.') },
    { h2: 'Which to Do First &mdash; and Why in India It Is Usually Technical', html: `
<p>Technical first, almost always. The reasoning is arithmetic: on-page work multiplies the value of a page that can be crawled, rendered and loaded; on a page that cannot, it multiplies zero.</p>
<p>India tilts this further. Speed guides written for the Indian market put roughly 60% of Indian websites outside Google&rsquo;s Core Web Vitals thresholds against about 40% globally, and around 80% of Indian traffic on mobile. The typical Indian SME site was built once, on a page builder, with 3MB hero images and no caching, and is read on a &#8377;12,000 Android over a variable 4G connection. On that site the highest-value &ldquo;SEO&rdquo; work is a developer compressing images, fixing the template and cleaning the URL structure &mdash; and most packages have no developer in them.</p>
<div class="article-table-wrap"><table>
<tr><th>Symptom</th><th>It is probably</th><th>Who fixes it</th></tr>
<tr><th>Pages missing from Google entirely</th><td>Technical (indexation, robots, canonicals)</td><td>Developer</td></tr>
<tr><th>Pages indexed but ranking 30th&ndash;60th</th><td>On-page (intent, copy, links) or authority</td><td>Editor / strategist</td></tr>
<tr><th>Rankings fine, traffic bounces</th><td>Technical (speed) or intent mismatch</td><td>Developer first, then editor</td></tr>
<tr><th>Ranks for brand name only</th><td>Both: architecture and thin pages</td><td>Both</td></tr>
</table></div>` },
    { h2: 'Why the Two Are Sold Separately, and Why They Should Not Be', html: `
<p>Agencies sell on-page because it is countable &mdash; ten pages optimised, four blogs written. Developers sell technical because it is their trade. The buyer gets two suppliers and a gap between them, and the gap is where sites stay stuck: the editor cannot fix the template, the developer does not know which page matters.</p>
<p>The fix is to buy them from people who do both, or at least to insist that whoever does the on-page work can show you the technical layer is clean first. That is how we run the search work for <a href="/in/">India</a> &mdash; the developer on the call is the developer on the code &mdash; and why <a href="/in/kolkata/">our Kolkata page</a> names the twelve technical checks that run before any content is written.</p>`,
      figure: F('inb-laptop-closeup-black', 'Close up of a black laptop', 'Two suppliers and a gap between them is where sites stay stuck. Buy both from people who can show you the technical layer is clean first.') },
  ],
  faqs: [
    { q: 'What is the difference between technical SEO and on-page SEO?', a: 'Technical SEO is the infrastructure work that lets search engines crawl, render and index a site and lets it load fast &mdash; canonicals, speed, sitemaps, structured data, redirects. On-page SEO is the work on an individual page &mdash; title, headings, copy, internal links &mdash; that makes it deserve to rank. One is engineering, the other is editing.' },
    { q: 'Which should I do first, technical or on-page SEO?', a: 'Technical, almost always. On-page work multiplies the value of a page that can be crawled and loaded; on a page that cannot, it multiplies zero. In India the technical layer is more often the problem, with roughly 60% of sites outside Core Web Vitals thresholds according to Indian speed guides.' },
    { q: 'Is Core Web Vitals technical or on-page SEO?', a: 'Technical. Largest Contentful Paint, layout shift and responsiveness are properties of the code and the images, fixed by a developer &mdash; and they should be measured on a mid-range Android on 4G, not on an office laptop.' },
    { q: 'Do I need a developer for SEO?', a: 'For the technical half, yes. Title tags and copy can be edited by anyone; canonicals, redirects, rendering and speed cannot. If your SEO package has no developer in it, ask who will make the technical changes it recommends.' },
    { q: 'What about off-page SEO?', a: 'Off-page SEO is everything that happens away from your site &mdash; links, mentions, reviews. It matters, but it multiplies what technical and on-page work have built; buying links for a slow, half-indexed site is the most expensive mistake in the field.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 5. ERP software price in India
{
  slug: 'erp-software-price-in-india-what-the-quote-contains', cat: 'erp', date: D,
  title: 'ERP Software Price in India: What the Quote Really Contains | TechAuditPros',
  desc: 'Published ERP prices in India run from ₹5,500 a year for a single cloud user to ₹1 crore for a large implementation. Here is what each line of a quote pays for, the per-user trap, and what Tally, Marg and Busy actually cost.',
  eyebrow: 'ERP pricing',
  h1: 'ERP Software Price in India: What the Quote Really Contains',
  dek: 'Licence, implementation, customisation, training, support, and the line that grows every year. This is the anatomy of an Indian ERP quote, with the published figures beside each part.',
  lead: F('inb-factory-interior-machinery', 'Industrial factory interior with machinery', 'The licence is rarely what hurts. What hurts is the per-user line growing with every shift you add.'),
  takeaways: [
    'Published Indian figures (September 2026): <strong>&#8377;60,000 to &#8377;20 lakh</strong> all-in for small and mid-sized implementations, <strong>&#8377;25 lakh to &#8377;1 crore</strong> for large ones, <strong>&#8377;2,000&ndash;&#8377;10,000 per user</strong> for subscription products, cloud plans from about <strong>&#8377;5,500 a year</strong> for one user.',
    'A quote has six parts: licence, implementation, customisation, data migration, training, and support. Sales pages show the first; the other five are usually larger.',
    'The <strong>per-user line</strong> is the one to model: a second shift or a third site raises the bill every month, forever.',
    'Tally and Marg are accounting-first products with stock; their prices are a floor for the &ldquo;system&rdquo;, not the ERP.',
  ],
  intro: 'The <strong>price of ERP software in India</strong> is one number on the sales page and six numbers on the invoice. Published Indian guides for September 2026 put a small or mid-sized implementation at roughly &#8377;60,000 to &#8377;20 lakh all-in, a large one at &#8377;25 lakh to &#8377;1 crore, subscription products at &#8377;2,000&ndash;&#8377;10,000 per user per month, and single-user cloud plans from about &#8377;5,500 a year. All of those are true and none of them is the number you will pay, because the quote is assembled from parts that the sales page does not show. This article names the parts, puts the published figures beside each, and explains the one line worth modelling before you sign.',
  sections: [
    { h2: 'The Six Lines of an Indian ERP Quote', html: `
<div class="article-table-wrap"><table>
<tr><th>Line</th><th>What it pays for</th><th>Published range</th><th>The catch</th></tr>
<tr><th>Licence / subscription</th><td>The right to use the software</td><td>&#8377;2,000&ndash;&#8377;10,000 per user per month; cloud from &#8377;5,500 a year for one user</td><td>Grows with every user, every year</td></tr>
<tr><th>Implementation</th><td>Configuring it to your business</td><td>Often 1&ndash;2&times; the first-year licence</td><td>Scope creep lives here</td></tr>
<tr><th>Customisation</th><td>Making it do what configuration cannot</td><td>Hourly or per change request</td><td>Where a &ldquo;standard&rdquo; product turns into a series of quotes</td></tr>
<tr><th>Data migration</th><td>Moving your items, ledgers, customers and history</td><td>Frequently underestimated</td><td>Dirty data costs weeks</td></tr>
<tr><th>Training</th><td>Getting your people to use it</td><td>Per day or per user</td><td>Skipped, then blamed</td></tr>
<tr><th>Support / AMC</th><td>Keeping it running</td><td>15&ndash;22% of licence a year is typical</td><td>Renewed forever</td></tr>
</table></div>
<p>When a vendor quotes &ldquo;&#8377;3 lakh&rdquo;, ask which of the six it includes. The honest answer is usually two of them.</p>`,
      figure: F('inb-five-hundred-rupee-notes', 'Five-hundred rupee banknotes', 'Ask which of the six lines the quoted figure includes. The honest answer is usually two.') },
    { h2: 'What Tally, Marg and Busy Actually Cost', html: `
<p>These searches sit beside &ldquo;ERP price&rdquo; because for many Indian businesses the incumbent <em>is</em> the system. Their published pricing is public and stable, so we point at it rather than repeat numbers that will move:</p>
<ul>
<li><strong>TallyPrime</strong> is sold as a perpetual licence in Silver (single user) and Gold (multi-user) editions with an annual software service subscription; the current figures are on Tally&rsquo;s own pricing page and every reseller&rsquo;s.</li>
<li><strong>Marg ERP</strong> publishes Basic, Silver and Gold editions with a similar perpetual-plus-annual model, priced for retail, distribution and pharma.</li>
<li><strong>Busy</strong> publishes Basic, Standard and Enterprise editions, strongest in trade and distribution features such as batch tracking and salesman-wise reporting.</li>
</ul>
<p>All three are accounting-first products with stock and GST built around Indian compliance, and at their price they are extraordinary value <em>for that</em>. What they are not is a production, order or job-costing system. When a business searches &ldquo;Tally ERP 9 price&rdquo; while trying to solve a stock problem across three godowns, the real question is not the price of Tally; it is the price of the layer Tally was never built to be. We wrote that comparison separately: <a href="/blog/tally-zoho-busy-or-custom-when-to-outgrow.html">Tally, Zoho, Busy or custom</a>.</p>`,
      band: F('inb-man-beside-machine', 'A man standing beside a machine in a small factory', 'The incumbent is the system. The question is the price of the layer it was never built to be.') },
    { h2: 'The Per-User Line Is the One to Model', html: `
<p>Every subscription ERP prices per user per month, and every business starts with the number of users it has today. Model the number you will have in three years. A second shift, a third godown, a sales team given handhelds: each adds seats, and each seat is a line that renews forever. At &#8377;5,000 a user, ten added seats is &#8377;6 lakh a year &mdash; more than many small implementations cost outright.</p>
<p>This is the honest case for a custom or fixed-fee system for a business whose headcount is growing: not that building is better, but that per-seat pricing is designed for stable headcounts and punishes growing ones. Conversely, a stable twelve-person trading firm should almost never build; a subscription product is faster to start and somebody else maintains it.</p>` },
    { h2: 'Custom Development: What the Indian Figures Say', html: `
<p>Indian development guides for 2026 put custom ERP builds anywhere from about &#8377;5 lakh for a basic system to &#8377;1 crore and beyond for enterprise scope, at blended Indian agency rates of roughly $25&ndash;$60 an hour. That range is as wide as the product range, and for the same reason: scope. A stock-and-orders system for one godown is a different object from a multi-site manufacturing system with e-invoicing, e-way bills and MRP.</p>
<p>The way to price custom honestly is the way to price anything honestly: one real process, walked through, then a fixed scope with a fixed figure and a staging URL from week one. We build this way for <a href="/in/">Indian businesses</a>, and we say on the first call when a product is the better answer &mdash; which, for most businesses under twenty users with standard processes, it is.</p>
<div class="article-callout">Ask every vendor, product or custom, three things: what will I have in ninety days, what does the bill look like when I have twice the users, and what do I own if we part ways.</div>`,
      figure: F('inb-stack-of-papers-flat', 'A stack of papers, flat lay', 'Six lines, three years, twice the users: model the quote as it will be, not as it is today.') },
  ],
  faqs: [
    { q: 'How much does ERP software cost in India?', a: 'Published Indian guides (September 2026) put small and mid-sized implementations at roughly &#8377;60,000 to &#8377;20 lakh all-in, large ones at &#8377;25 lakh to &#8377;1 crore, subscription products at &#8377;2,000&ndash;&#8377;10,000 per user per month, and single-user cloud plans from about &#8377;5,500 a year. The quote has six lines; the sales page shows one.' },
    { q: 'What is the price of Tally ERP?', a: 'TallyPrime is sold as a perpetual licence in single-user (Silver) and multi-user (Gold) editions plus an annual service subscription. The current figures are published on Tally&rsquo;s pricing page and by every reseller; we point there because they change. It is accounting-first with stock and GST, not a production or order system.' },
    { q: 'Why does ERP cost more than the licence?', a: 'Because implementation, customisation, data migration, training and annual support are separate lines, and together they usually exceed the first-year licence. Support alone is typically 15&ndash;22% of licence per year, renewed forever.' },
    { q: 'Is custom ERP cheaper than a product in India?', a: 'Rarely up front &mdash; Indian guides put custom builds from about &#8377;5 lakh to &#8377;1 crore+. It becomes cheaper over time when per-user pricing is growing faster than the business, or when configuration keeps producing workarounds. For a stable business under twenty users with standard processes, a product is almost always the right answer.' },
    { q: 'What does &ldquo;the cost of ERP&rdquo; usually leave out?', a: 'Your own people&rsquo;s time, the cleaning of your data before migration, the change requests after go-live, and the seats you will add in year two. Model those four before comparing vendors.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 6. Best ERP software in India
{
  slug: 'best-erp-software-in-india-for-whom-honestly', cat: 'erp', date: D,
  title: 'Best ERP Software in India: For Whom, Honestly | TechAuditPros',
  desc: 'There is no best ERP in India — there is a best fit for a size, a sector and a production method. Here is how SAP Business One, Sage X3, NetSuite, Odoo, ERPNext and the Indian products divide up, and when to build instead.',
  eyebrow: 'Choosing ERP',
  h1: 'Best ERP Software in India: For Whom, Honestly',
  dek: 'Every &ldquo;top 10 ERP in India&rdquo; list is written by a reseller of something on it. This one sorts the field by who each product is actually for, including the answer none of them give: sometimes Tally plus discipline, sometimes a custom build.',
  lead: F('inb-factory-floor-yellow-lines', 'A factory floor with machinery and yellow safety lines', 'The &ldquo;best&rdquo; ERP for a manufacturer is the one that understands how this floor actually makes things.'),
  takeaways: [
    'There is no best ERP in India; there is a best fit for <strong>size, sector and production method</strong>. Lists that rank without asking those three are reseller pages.',
    'Global tier: <strong>SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365</strong> for large or multi-country businesses. Mid-market: <strong>SAP Business One, Sage X3, Odoo</strong>. Open source: <strong>ERPNext</strong>. Indian-built: a dozen sector products for textiles, pharma, food and engineering.',
    'For a business under about twenty users with standard processes, the honest answer is often <strong>Tally or Zoho plus discipline</strong>, not ERP at all.',
    'Custom earns its place when your process is the reason you are still on spreadsheets and configuration keeps producing workarounds.',
  ],
  intro: 'The <strong>best ERP software in India</strong> does not exist, and any page that tells you it does is selling it. What exists is a best fit for three things: your size (users and sites), your sector (a garment exporter, a spice processor and a machine shop need different production layers) and your production method (make to order, make to stock, job work, batch). This article sorts the field the way a buyer should &mdash; by who each product is for &mdash; and includes the two answers the &ldquo;top 10&rdquo; lists leave out: that many businesses do not need ERP yet, and that some need one that does not exist off the shelf.',
  sections: [
    { h2: 'Sort by Size First', html: `
<div class="article-table-wrap"><table>
<tr><th>Your business</th><th>Products that fit</th><th>Honest note</th></tr>
<tr><th>Under ~20 users, standard trading or services</th><td>TallyPrime, Zoho Books + Inventory, Busy, Marg</td><td>Probably not ERP yet. Discipline and a clean chart of accounts beat a system you will not use.</td></tr>
<tr><th>20&ndash;100 users, one or two sites, manufacturing or distribution</th><td>SAP Business One, Sage X3, Odoo, ERPNext, Indian sector products</td><td>The real mid-market. Fit is decided by production method, below.</td></tr>
<tr><th>100+ users, multi-site or multi-country</th><td>SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365</td><td>Implementation partners matter more than the product.</td></tr>
<tr><th>Any size with a genuinely unusual process</th><td>Custom, or ERPNext/Odoo heavily extended</td><td>Only when configuration keeps producing workarounds.</td></tr>
</table></div>
<p>The Indian &ldquo;top 10&rdquo; pages ranking for this search list Sage X3, SAP Business One, S/4HANA, NetSuite, Dynamics, Odoo, ERPNext and a handful of Indian products (Zyno, Vasy, Udyog and others) in various orders. They are all real; they are not all for you.</p>`,
      figure: F('inb-workers-operate-machinery', 'Workers operating machinery in a factory', 'Size first: a twenty-person unit and a three-site group need different products, and the lists rarely say which is which.') },
    { h2: 'Then by Production Method', html: `
<p>For a manufacturer this predicts fit better than any feature matrix, and it is the question the lists skip.</p>
<ul>
<li><strong>Make to order / job work</strong> (engineering units, garment CMT, printing): every job different, so quoting from a bill of materials, per-job costing and honest promise dates matter most. Job-work and subcontract tracking is the Indian wrinkle &mdash; fabric out to a dyeing unit is still your stock.</li>
<li><strong>Batch / process</strong> (spices, food, pharma, chemicals, ayurveda): formulas not BOMs, yields, batch traceability, expiry. Pharma adds regulatory batch records.</li>
<li><strong>Make to stock</strong> (consumer goods, components): forecasting, reorder points, finished-goods visibility across godowns.</li>
<li><strong>Trading and distribution</strong> (the largest group in India): no production layer at all; what matters is multi-godown stock truth, scheme and pricing rules, salesman-wise reporting and e-way bills. Busy and Marg were built for exactly this.</li>
</ul>
<p>Sector-specific Indian products earn their place here: a garment ERP that understands a size-and-colour matrix, cut-to-pack ratios and CMT job work will fit a Tiruppur unit better than a global product configured for it. We wrote that case in full at <a href="/in/">garment manufacturing ERP for Indian units</a>.</p>`,
      band: F('inb-woman-organised-warehouse', 'A woman working in an organised warehouse', 'Trading and distribution is India&rsquo;s largest ERP need, and it has no production layer at all. Stock truth across godowns is the whole job.') },
    { h2: 'The Indian Compliance Layer Is Not Optional', html: `
<p>Global products are sold by global comparison pages. If you operate in India, these are the tests to run in the demo, with your own data:</p>
<ul>
<li><strong>GST:</strong> CGST/SGST/IGST splits, HSN at the required digit level, GSTR-ready reporting, reverse charge.</li>
<li><strong>E-invoicing:</strong> IRN generation through the IRP or a GSP, QR codes on invoices, the 2FA requirement in force from April 2026, and error handling when the IRP rejects.</li>
<li><strong>E-way bills:</strong> generated from the despatch, not re-keyed on the portal.</li>
<li><strong>TDS/TCS</strong> at purchase and sale where applicable.</li>
<li><strong>Integration with the accountant&rsquo;s book of record</strong> &mdash; usually Tally &mdash; because most Indian CAs will not move.</li>
</ul>
<p>The thresholds and rates in that list change; we point at the GST portal rather than restating them. What does not change is the test: ask to see an invoice go from despatch to IRN to e-way bill in one flow. Products that pass are Indian-ready; products that need a &ldquo;localisation partner&rdquo; are not, whatever the list says.</p>` },
    { h2: 'The Two Answers the Lists Leave Out', html: `
<p><strong>Not yet.</strong> A twelve-person trading firm with one godown does not need ERP. It needs Tally kept clean, a stock count that is believed, and a spreadsheet nobody edits without telling the owner. Buying a system to impose discipline the business does not have produces a system nobody uses. We say this on calls more often than we say anything else.</p>
<p><strong>Not off the shelf.</strong> When the process is the reason you are still on spreadsheets &mdash; the odd pricing rule, the subcontract loop, the way your customers order &mdash; and every product demo ends with &ldquo;we can configure that&rdquo; and then a change request, a system built around the process stops the workarounds. That is what we build for <a href="/in/">Indian businesses</a>, and the honest test for it is that you have already tried two products and are still on spreadsheets.</p>
<div class="article-callout">Ask any list-maker one question: which product on your list do you resell? The answer sorts the list for you.</div>`,
      figure: F('inb-woman-packaged-products', 'A woman handling packaged products in a warehouse', 'Two answers the top-ten lists never give: not yet, and not off the shelf.') },
  ],
  faqs: [
    { q: 'Which is the best ERP software in India?', a: 'None is best for everyone. Under about twenty users with standard processes, Tally, Zoho or Busy plus discipline usually beats ERP. In the mid-market SAP Business One, Sage X3, Odoo, ERPNext and Indian sector products divide up by production method. For large, multi-site groups, SAP S/4HANA, Oracle NetSuite and Microsoft Dynamics 365, where the implementation partner matters more than the product.' },
    { q: 'What is the best manufacturing ERP in India?', a: 'It depends on how you make things. Job-work and make-to-order units need per-job costing and subcontract tracking; batch and process producers need formulas, yields and traceability; make-to-stock needs forecasting. Sector-specific Indian products often fit a garment or pharma unit better than a global product configured for it.' },
    { q: 'Is ERPNext or Odoo good for Indian businesses?', a: 'Both are credible mid-market options with Indian GST localisation and large communities, and both are open source, which removes the per-user trap. Both need a capable implementation partner; the licence is free, the fit is not.' },
    { q: 'Does an Indian business need ERP or is Tally enough?', a: 'Tally is enough for accounting, stock and GST in a stable business with one or two sites and standard processes. It stops being enough when production, job costing, multi-godown stock truth or a storefront that needs live availability enter the picture &mdash; and then the question is what sits on top of Tally, not what replaces it.' },
    { q: 'When should a business build custom ERP instead of buying?', a: 'When its process is the reason it is still on spreadsheets, when two product demos have ended in workarounds, or when per-user pricing is growing faster than the business. Not because building is more interesting; for most businesses a product is the right answer and we say so.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 7. Tally, Zoho, Busy or custom
{
  slug: 'tally-zoho-busy-or-custom-when-to-outgrow', cat: 'erp', date: D,
  title: 'Tally, Zoho, Busy or Custom: When to Outgrow the Incumbent | TechAuditPros',
  desc: 'Tally runs India\'s accounts, Busy runs its distribution, Zoho runs its cloud-first startups. Here is what each does brilliantly, the five signs a business has outgrown it, and what to put on top rather than replace.',
  eyebrow: 'The incumbents',
  h1: 'Tally, Zoho, Busy or Custom: When to Outgrow the Incumbent',
  dek: 'Thirty-five million users cannot be wrong about Tally. They can, however, be asking it to do things it was never built for. This is how to tell the difference, and what to do next without upsetting your CA.',
  lead: F('inb-currency-on-map-of-india', 'Indian currency resting on a map of India', 'Tally runs the accounts of most of India. The question is what runs everything else.'),
  takeaways: [
    '<strong>TallyPrime</strong> (35 million+ users) is the compliance-first, offline, keyboard-driven book of record most Indian CAs trust. <strong>Busy</strong> is the trade-and-distribution specialist (batch, route, salesman-wise). <strong>Zoho Books</strong> is the cloud-native choice for startups and service firms inside the Zoho ecosystem. <strong>Marg</strong> owns retail and pharma distribution.',
    'Five signs you have outgrown the incumbent: stock kept in three places, quotes built in Excel, production or job costing done by memory, a storefront showing stock the godown does not have, and month-end taking a week.',
    'The right move is almost never to replace Tally. It is to put a <strong>system of record for operations</strong> on top and feed Tally clean figures.',
    'Custom earns its place only when two products have ended in workarounds. Otherwise, a product.',
  ],
  intro: '<strong>Tally, Zoho or Busy</strong> is a real question for most Indian businesses under fifty people, and the comparison pages ranking for it answer it well: Tally for compliance-heavy businesses, Busy for trade and distribution, Zoho Books for cloud-first startups and service firms, Marg for retail and pharma. What those pages do not answer is the question behind the search &mdash; the business is asking because something has stopped fitting &mdash; and the honest answer is usually not a different accounting package. It is a layer above it. This article gives the incumbents their due, names the five signs of outgrowing them, and explains what to add without upsetting the CA who lives in Tally.',
  sections: [
    { h2: 'What Each Incumbent Does Brilliantly', html: `
<div class="article-table-wrap"><table>
<tr><th>Product</th><th>Built for</th><th>Where it shines</th><th>Where it stops</th></tr>
<tr><th>TallyPrime</th><td>Accounting and GST, offline, keyboard-first</td><td>Compliance (GST, TDS, TCS, e-invoice, e-way bill), the CA&rsquo;s trust, speed of entry</td><td>Production, job costing, multi-godown truth, anything web-facing</td></tr>
<tr><th>Busy</th><td>Trade and distribution</td><td>Batch and expiry, route and salesman-wise reporting, schemes</td><td>Manufacturing, integrations, cloud collaboration</td></tr>
<tr><th>Zoho Books (+ Inventory)</th><td>Cloud-first services and startups</td><td>UI, automation, the Zoho ecosystem (CRM, projects), multi-currency</td><td>Deep Indian distribution features, complex production</td></tr>
<tr><th>Marg</th><td>Retail and pharma distribution</td><td>Pharma batch/expiry, retail billing, distributor workflows</td><td>Everything outside that lane</td></tr>
</table></div>
<p>All four are extraordinary value for what they are. None of them is an operations system for a manufacturer or a multi-site distributor, and none of them was meant to be.</p>`,
      figure: F('inb-printer-paper-purple', 'A hundred-rupee note, close up', 'Compliance, entry speed and the CA&rsquo;s trust: Tally earns its place. Ask it to run production and it will not, because it was never meant to.') },
    { h2: 'Five Signs You Have Outgrown It', html: `
<ol>
<li><strong>Stock lives in three places.</strong> Tally says one number, the godown supervisor&rsquo;s book says another, the salesman&rsquo;s WhatsApp says a third. Nobody believes any of them, so nobody orders from them.</li>
<li><strong>Quotes are built in Excel.</strong> Pricing rules, discounts by customer class, GST by item &mdash; all in a spreadsheet that one person understands, re-keyed into Tally after the fact.</li>
<li><strong>Production or job costing is done from memory.</strong> What a job actually cost is reconstructed at month end from bills and recollection. Loss-making jobs hide in averages.</li>
<li><strong>The storefront shows stock the godown does not have.</strong> Overselling has become a weekly apology, because the website and Tally have never met.</li>
<li><strong>Month-end takes a week.</strong> Not because the accounts are complex, but because operations are being re-keyed into the accounts.</li>
</ol>
<p>Two of the five means you are working around the system. Four means the system is working around you.</p>`,
      band: F('inb-woman-many-papers', 'A woman at a table covered in papers', 'Month-end takes a week when operations are being re-keyed into the accounts. That is the sign, not the accounts.') },
    { h2: 'Do Not Replace Tally. Put a System on Top', html: `
<p>Your CA lives in Tally and will not move; nor should they. The book of record for accounting should stay where the accountant trusts it. What a growing business needs is a <em>system of record for operations</em> &mdash; stock, orders, quotes, purchasing, production, job costing &mdash; that feeds Tally clean, summarised figures through its official integration rather than replacing it.</p>
<p>This is how the incumbents were always meant to be used, and it is the architecture we build for <a href="/in/">Indian businesses</a>: operations in one system everyone reads from, accounts in Tally, the two connected. It is also why the storefront problem disappears &mdash; the website reads availability from the system that knows, not from a Friday spreadsheet. The <a href="/in/mumbai/">Mumbai page</a> shows what that looks like for a trader with a storefront and a godown that disagree.</p>` },
    { h2: 'When to Buy, When to Build', html: `
<p><strong>Buy</strong> when your processes are standard and your headcount is stable. Zoho Inventory on top of Zoho Books, or a mid-market ERP feeding Tally, is faster to start and someone else maintains it. Most businesses reading this should buy.</p>
<p><strong>Build</strong> when the process is the reason you are still on spreadsheets &mdash; the odd pricing rule, the job-work loop, the way your customers order &mdash; and you have already tried two products and are still on spreadsheets. Custom stops the workarounds; it does not make them unnecessary before you have tried configuration.</p>
<div class="article-callout">The test in one sentence: if a product demo ends with &ldquo;we can configure that&rdquo; for the third time, ask for the change-request rate card before you sign.</div>`,
      figure: F('inb-papers-and-pen-table', 'A wooden table with papers and a pen', 'Buy when the process is standard. Build when the process is the reason you are still on paper.') },
  ],
  faqs: [
    { q: 'Tally vs Zoho vs Busy: which is best?', a: 'Tally for compliance-heavy businesses and any business whose CA lives in it; Busy for trade and distribution with batch, route and salesman-wise reporting; Zoho Books for cloud-first startups and service firms that want CRM and projects in one ecosystem; Marg for retail and pharma distribution. None is an operations system for manufacturing or multi-site stock.' },
    { q: 'Is Zoho an ERP?', a: 'Zoho Books is accounting; with Zoho Inventory, CRM and the rest of the suite it becomes a light ERP for services and simple trading. It is not a manufacturing or job-costing system, and its Indian distribution features are shallower than Busy&rsquo;s or Marg&rsquo;s.' },
    { q: 'How do I know I have outgrown Tally?', a: 'Stock kept in three places, quotes built in Excel, job costs reconstructed from memory, a storefront showing stock you do not have, and month-end taking a week. Two of those and you are working around it; four and it is working around you.' },
    { q: 'Should I replace Tally with ERP?', a: 'Almost never. Keep Tally as the accounting book of record your CA trusts, and put a system of record for operations &mdash; stock, orders, production, costing &mdash; on top, connected through Tally&rsquo;s official integration. Replacing Tally upsets the accountant and gains nothing.' },
    { q: 'When does custom software make sense over Zoho or an ERP product?', a: 'When you have tried two products and every demo ended in &ldquo;we can configure that&rdquo; followed by a change request; when your process is genuinely unusual; or when per-user pricing is growing faster than the business. Otherwise buy, and we will say so.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 8. Shopify SEO for Indian stores
{
  slug: 'shopify-seo-for-indian-stores', cat: 'seo', date: D,
  title: 'Shopify SEO for Indian Stores: The Structural Fixes First | TechAuditPros',
  desc: 'Most Indian Shopify stores run on ads and stop when the budget stops. Shopify SEO fixes that — but only after the platform\'s structural holes are closed: duplicate collection URLs, missing schema, slow themes on 4G, and stock the storefront gets wrong.',
  eyebrow: 'Shopify SEO',
  h1: 'Shopify SEO for Indian Stores: The Structural Fixes First',
  dek: 'D2C brands are leaving marketplaces for their own Shopify stores and discovering that a store nobody searches for is a store nobody finds. This is the order the work goes in when 98% of your buyers are on a phone.',
  lead: F('inb-bicycle-laden-parcels', 'A bicycle heavily laden with wrapped parcels', 'Every parcel here started as a search or an ad. The ones that started as a search cost nothing to repeat.'),
  takeaways: [
    'Shopify&rsquo;s defaults leave <strong>structural holes</strong>: duplicate product URLs under every collection, thin collection pages, missing Product schema, themes that are slow on a 4G Android. Fix those before content.',
    'India-specific: ~<strong>98% of e-commerce traffic is mobile</strong> (industry guides), GST-compliant invoices need an app, and D2C brands migrating from Amazon and Flipkart have zero organic history to lean on.',
    'The order: <strong>architecture &rarr; speed &rarr; schema &rarr; collection copy &rarr; product copy &rarr; content</strong>. Most agencies sell it backwards because content is countable.',
    'Stock truth is an SEO problem: a product page that says &ldquo;in stock&rdquo; when the godown disagrees earns returns, bad reviews and a bounce Google can see.',
  ],
  intro: '<strong>Shopify SEO</strong> is the work that makes a Shopify store findable in search rather than dependent on Meta and Google ads &mdash; and in India, where industry guides put e-commerce traffic at around 98% mobile and where D2C brands are migrating off Amazon, Flipkart and Myntra to own their customers, it is the difference between a channel that keeps sending buyers in the months you spend nothing and one that stops the day the budget does. Shopify is a good platform with predictable holes. This article closes them in the order that works: structure first, speed second, then schema, then the words.',
  sections: [
    { h2: 'The Structural Holes Every Shopify Store Ships With', html: `
<ul>
<li><strong>Duplicate product URLs.</strong> Shopify serves the same product at <code>/products/x</code> and <code>/collections/y/products/x</code> for every collection it sits in. The canonical usually points the right way, but internal links often do not, so authority splits and crawl budget is spent on copies.</li>
<li><strong>Thin collection pages.</strong> A grid of products with a one-line description &mdash; yet collection pages are where category searches (&ldquo;kanjivaram sarees online&rdquo;) should land. They need real copy, FAQs and internal links.</li>
<li><strong>Missing or generic schema.</strong> Many themes ship Product schema without price, availability, reviews or shipping details, or with brand fields blank. The rich result the shopper decides on never appears.</li>
<li><strong>Tag and filter pages indexed.</strong> <code>/collections/all/red</code> and friends create hundreds of near-identical URLs unless noindexed.</li>
<li><strong>Theme weight.</strong> Apps stack scripts; hero images ship at 3MB; the store that loads in two seconds on office Wi-Fi takes eight on a Jio 4G connection between Andheri and Churchgate.</li>
<li><strong>Blog buried.</strong> Shopify&rsquo;s blog lives at <code>/blogs/news/</code> with weak templates, which is why most store content earns nothing.</li>
</ul>`,
      figure: F('inb-phone-in-box', 'A new phone in its box on a table', 'The shopper decides on the rich result &mdash; price, availability, rating. If your Product schema has blank fields, that result never appears.') },
    { h2: 'The Indian Layer', html: `
<p>Global Shopify SEO guides assume a desktop-heavy, invoice-simple market. India is neither.</p>
<ul>
<li><strong>Mobile is everything.</strong> Measure Core Web Vitals on a mid-range Android on 4G, not on a laptop. A theme that scores 90 on desktop and 35 on mobile is a 35.</li>
<li><strong>GST invoices need an app.</strong> Shopify does not generate GST-compliant invoices natively (HSN codes, CGST/SGST/IGST splits, seller GSTIN); comparison guides name Tera GST, Sufio and others. Registered sellers can claim input credit on Shopify fees.</li>
<li><strong>Marketplace refugees start from zero.</strong> A brand that sold &#8377;2 crore on Myntra has no organic history on its own domain. The first six months are architecture and authority, not content volume.</li>
<li><strong>Payment and pincode UX are ranking-adjacent.</strong> COD availability, pincode checks and UPI at checkout affect bounce and conversion, which affect how Google reads the page.</li>
<li><strong>Language.</strong> Category searches in Hindi, Tamil or Bengali are real; a bilingual collection page with correct hreflang can own a shelf nobody else is on.</li>
</ul>`,
      band: F('inb-night-market-lit-signs', 'A crowded street market with illuminated signs at night', 'Ninety-eight per cent of Indian e-commerce traffic is a phone in a crowd like this one. Measure your store there.') },
    { h2: 'The Order the Work Goes In', html: `
<div class="article-table-wrap"><table>
<tr><th>Phase</th><th>Work</th><th>Why this position</th></tr>
<tr><th>1. Architecture</th><td>Collections that mirror how people search; canonical and internal-link hygiene; tag/filter pages noindexed; navigation three clicks deep at most</td><td>Everything else multiplies this</td></tr>
<tr><th>2. Speed</th><td>Image compression and sizing, app script diet, theme fixes, lazy loading below the fold</td><td>Mobile Core Web Vitals are a ranking input and a conversion input</td></tr>
<tr><th>3. Schema</th><td>Product (price, availability, reviews, shipping), Breadcrumb, Organization, FAQ on collections</td><td>The rich result is the click</td></tr>
<tr><th>4. Collection copy</th><td>Real category pages: 300&ndash;600 words, FAQs, links to sub-collections</td><td>Category searches are the volume</td></tr>
<tr><th>5. Product copy</th><td>Unique descriptions for the products that earn money; templated for the tail</td><td>Duplicate manufacturer copy ranks nowhere</td></tr>
<tr><th>6. Content and authority</th><td>Buying guides, comparisons, care pages; links earned from them</td><td>Only now does content have somewhere to send people</td></tr>
</table></div>
<p>Most packages sold as &ldquo;Shopify SEO services&rdquo; in India start at phase 4 or 6, because copy is countable and phases 1&ndash;3 need a developer. That is the whole reason results take &ldquo;three to six months&rdquo; on their pages and stall after.</p>`,
      figure: F('inb-delivery-motorcycle-traffic', 'A delivery rider on a motorcycle in city traffic', 'Phases one to three need a developer. Packages that skip them are selling phase six on a store that cannot carry it.') },
    { h2: 'Stock Truth Is an SEO Problem', html: `
<p>A product page that says &ldquo;in stock&rdquo; when the godown disagrees produces a cancelled order, a refund, a one-star review and a shopper who bounces back to Google &mdash; all signals the algorithm reads. For Indian D2C brands running Shopify off a spreadsheet inventory, this is the largest invisible leak in the store.</p>
<p>The fix is not an app. It is connecting Shopify&rsquo;s inventory to the system that actually knows &mdash; the stock and order system, feeding Tally &mdash; so availability, lead time and price on the page are true. That is why we treat the storefront and the stock system as one project for <a href="/in/mumbai/">Mumbai</a> e-commerce clients, and why the Shopify SEO work on those stores holds.</p>
<div class="article-callout">Ask any Shopify SEO agency two questions: who on your team can edit the theme code, and how does the store know what is in stock? The answers tell you which phase they will start at.</div>` },
  ],
  faqs: [
    { q: 'Is Shopify good for SEO?', a: 'Good enough, with predictable holes: duplicate product URLs under collections, thin collection templates, incomplete Product schema, indexable tag pages and heavy themes. All are fixable by a developer; none are fixed by content alone.' },
    { q: 'How long does Shopify SEO take to show results in India?', a: 'Agencies ranking for this search quote three to six months. The honest version: architecture and speed fixes can move indexed pages within weeks; collection pages built for category searches take two to four months; a marketplace refugee with no organic history should plan for six months before content volume pays.' },
    { q: 'Does Shopify generate GST-compliant invoices?', a: 'Not natively. Indian comparison guides point to apps such as Tera GST or Sufio to produce invoices with HSN codes, CGST/SGST/IGST splits and the seller GSTIN. GST-registered sellers can claim input tax credit on Shopify subscription and gateway fees.' },
    { q: 'What should a Shopify SEO service in India include?', a: 'In order: collection architecture and canonical hygiene, mobile speed measured on a 4G Android, complete Product schema, real collection copy, unique product copy for the money products, then content and authority. If the proposal starts with blog posts, ask who will do phases one to three.' },
    { q: 'Shopify or WooCommerce for an Indian store?', a: 'Shopify when the store must be selling next month and you would rather not manage hosting and plugins; WooCommerce when the business already lives in WordPress, wants zero platform transaction fees, and can handle maintenance. Both need the same structural SEO work; WooCommerce gives a developer more room to do it.' },
  ],
  cta: SEO_CTA,
},
];
