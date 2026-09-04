'use strict';
// UK blog wave 2, posts 1-4 (ai_context/PLAN-UK section 3, revised against what is already live).
//
// Three of the eight topics in the original wave-2 list already have a genuine post -- content
// audit, SEO copywriting, and the GEO page -- so two were replaced with uncovered clusters from the
// owner's exports, and the AI-search cluster was split into two posts because it is by far the
// biggest winnable thing in the data: 476 keywords, every one at KD 0, 3,950/mo.
//
//   1 what are seo services 390/29 + what is seo services 210/39 + how to get seo on my website
//     170/31 + seo team training 170/24                                                (~940/mo)
//   2 how long does it take for seo to work 210/28 + how long does seo take to see results 140/25
//     + how long does an seo audit take 90/0 + how long does seo take to start working 90/0 (530/mo)
//   3 why seo is important 390/34 + why is seo important 720/38 (head terms are hard, so the page
//     targets the winnable tail: why seo 170/25, why seo audit is important 110/22, why unique
//     content so important in seo 110/17, why is ux design important for seo 110/20)   (~2,740/mo)
//   4 how to get your site to the top of google 210/29 + how to get website to top of google
//     210/21 + how to bring your website on top of google search 110/0 + 5 more        (~1,170/mo)
const D = '2026-09-04';
const SEO_CTA = { h3: 'Want to know what is actually holding your rankings back?', p: 'Book a free strategy call. We run the audit first, you keep it either way, and it ends with an honest recommendation &mdash; including the times that recommendation is that search is not your problem.' };

module.exports = [
// ------------------------------------------------------------------ 1. What are SEO services
{
  slug: 'what-are-seo-services-uk', cat: 'seo', date: D,
  title: 'What Are SEO Services? What You Are Actually Paying For | TechAuditPros',
  desc: 'A plain breakdown of what SEO services include: the audit, technical fixes, content, links, local and AI search, and reporting. What each one does, what it is worth, and which parts you can do yourself.',
  eyebrow: 'SEO Services',
  h1: 'What Are SEO Services? What You Are Actually Paying For',
  dek: 'Seven things sit under the label. Some move the needle, some are hygiene, and one or two are usually being charged for twice. Here is how to tell them apart before you sign.',
  lead: { img: 'seo2-google-on-screen.jpg', alt: 'A search engine home page, the front door SEO services are trying to get you through' },
  takeaways: [
    'SEO services are seven separate jobs: audit, technical fixes, on-page work, content, links, local and AI visibility, and reporting. Most retainers bundle them without saying how the hours split.',
    'Ask for the split. A retainer that is 80% content and 20% everything else is a content service with an SEO label on it, which may be fine &mdash; but you should know.',
    'The audit should come first and it should be yours to keep. Anything that starts with a twelve-month contract before anyone has looked at your site is selling a package, not a plan.',
    'You can genuinely do some of it yourself: Google Business Profile, review requests, and answering customer questions in writing. Save the retainer for what needs specialist tools and time.',
  ],
  intro: '<strong>SEO services</strong> is a label covering seven fairly different jobs: auditing what is wrong, fixing the technical side, improving the pages you already have, writing new ones, earning links and mentions, handling local and AI-answer visibility, and reporting on all of it. A retainer usually bundles them and rarely says how the hours divide. That split is the single most useful thing to ask about, because it tells you what you are actually buying.',
  sections: [
    { h2: 'The Seven Things Under the Label', html: `
<div class="article-table-wrap"><table>
<tr><th>Service</th><th>What it involves</th><th>How to tell it is being done properly</th></tr>
<tr><th>1. Technical audit</th><td>Crawl, index coverage, Core Web Vitals, structured data, internal linking, redirects, canonicals</td><td>You receive a written document with named issues and page-level examples, not a tool export</td></tr>
<tr><th>2. Technical fixes</th><td>Actually implementing them &mdash; in your codebase or CMS</td><td>Someone shows you the change and the before/after measurement</td></tr>
<tr><th>3. On-page work</th><td>Titles, headings, internal links, schema, and matching pages to real intent</td><td>Changes are listed per URL, and rankings for those URLs are tracked</td></tr>
<tr><th>4. Content</th><td>New pages that answer questions people actually search for</td><td>Each brief cites the keyword, the volume and the difficulty, and names what it will beat</td></tr>
<tr><th>5. Links &amp; mentions</th><td>Earning citations from places with genuine editorial standards</td><td>You are shown the domains before outreach, not a monthly count afterwards</td></tr>
<tr><th>6. Local &amp; AI visibility</th><td>Google Business Profile, consistent details, and being quotable by AI answers</td><td>Named checks: profile completeness, review velocity, entity consistency, citation tracking</td></tr>
<tr><th>7. Reporting</th><td>Positions, clicks, impressions and conversions, monthly</td><td>The same keyword set every month, including the ones that went down</td></tr>
</table></div>
<div class="article-callout">The question that sorts good suppliers from bad in one minute: &ldquo;Of the hours you bill us, roughly what percentage goes to each of those seven?&rdquo; A supplier who cannot answer is not tracking it.</div>` },
    { h2: 'What Is Worth Paying For, and What Is Hygiene', html: `
<p>Not all seven are equally valuable at all times, and an honest supplier will say so.</p>
<ul>
<li><strong>Worth real money, most of the time:</strong> the technical fixes, because they are the ones you cannot do without a developer; and content built from actual search demand, because it compounds.</li>
<li><strong>Worth money once, then cheap to maintain:</strong> the audit, structured data, and the local profile. These are set-up jobs with light upkeep, not permanent line items. If year three costs the same as year one for these, ask why.</li>
<li><strong>Hygiene, and should not dominate an invoice:</strong> monitoring, reporting, and routine checks. Necessary; not a service in its own right.</li>
<li><strong>The one to interrogate:</strong> links. Done properly it is slow, selective and expensive. Done badly it is a monthly volume figure and a long-term liability. Ask to see the target domains first.</li>
</ul>`,
      band: { img: 'seo2-hands-typing-spreadsheet.jpg', alt: 'Hands typing with a spreadsheet of figures on screen', cap: 'Ask how the hours split. That one answer tells you what you are buying.' } },
    { h2: 'What You Can Genuinely Do Yourself', html: `
<p>This is the part most suppliers leave out, and it is where a small business gets the fastest return on nothing but attention.</p>
<ul>
<li><strong>Your Google Business Profile.</strong> Complete every field, correct categories, real photographs, current opening hours. For a local business this often outranks everything else you could pay for.</li>
<li><strong>Ask for reviews, consistently.</strong> Not a campaign &mdash; a habit, after every completed job. Steady recent reviews beat a burst of old ones.</li>
<li><strong>Answer the questions customers actually ask you.</strong> Write the answer once, properly, on your own site. You already know these questions; you answer them on the phone every week.</li>
<li><strong>Keep your details identical everywhere.</strong> Name, address, phone, opening hours. Inconsistency across directories quietly costs you local visibility and confuses AI answers.</li>
</ul>
<p>None of that needs a retainer. Save the retainer for the technical work, the content research and the tools &mdash; the parts that genuinely need specialist time.</p>` },
    { h2: 'The Questions to Ask Before You Sign', html: `
<ul>
<li>What will you do in the first thirty days, specifically, and what will I have at the end of it?</li>
<li>How do the billed hours split across those seven services?</li>
<li>Who does the work, and are they the people in this meeting?</li>
<li>What happens if we stop after three months &mdash; what do we keep?</li>
<li>Show me a report you sent a client whose rankings went down that month.</li>
<li>What have you told a client not to buy?</li>
</ul>
<p>That fifth one is the real test. Every SEO engagement has bad months. A supplier who can show you how they reported one is a supplier who reports honestly. See <a href="/uk/seo-services/">how our UK search work runs</a>, and <a href="/blog/what-is-an-seo-audit.html">what an SEO audit actually contains</a>.</p>`,
      figures: [
        { img: 'seo2-laptop-at-desk-with-tea.jpg', alt: 'Working through search figures at a desk', cap: 'Ask what you keep if you stop after three months.' },
        { img: 'seo2-typing-a-question-on-laptop.jpg', alt: 'Typing a question into a laptop', cap: 'And ask to see a report from a month that went badly.' },
      ] },
  ],
  faqs: [
    { q: 'What is included in SEO services?', a: 'Seven jobs: a technical audit, implementing the technical fixes, on-page work on existing pages, new content built from real search demand, earning links and mentions, local and AI-answer visibility, and monthly reporting. Retainers bundle them, so ask how the billed hours split across the seven.' },
    { q: 'How much do SEO services cost in the UK?', a: 'It varies with scope and with how much of the technical work needs a developer. The more useful question is what the first thirty days produce and what you keep if you stop. Ask for that in writing before comparing prices, because two quotes at the same figure can contain very different work.' },
    { q: 'Can I do SEO myself?', a: 'Some of it, and the parts you can do are genuinely valuable: your Google Business Profile, asking for reviews consistently, keeping your business details identical everywhere, and writing proper answers to the questions customers already ask you. The technical work and the keyword research are where specialist time and tools earn their keep.' },
    { q: 'What is the difference between SEO services and an SEO audit?', a: 'The audit is the diagnosis: a written document naming what is wrong, with page-level examples. The services are the treatment. A supplier who wants a twelve-month commitment before anyone has audited the site is selling a package rather than a plan.' },
    { q: 'How do I know if an SEO agency is any good?', a: 'Ask them to show you a monthly report from a client whose rankings fell that month. Every engagement has bad months; only honest reporting survives one. Also ask who does the work, whether those people are in the room, and what they have talked a client out of buying.' },
  ],
  cta: SEO_CTA,
},

// ------------------------------------------------------------------ 2. How long does SEO take
{
  slug: 'how-long-does-seo-take-uk', cat: 'seo', date: D,
  title: 'How Long Does SEO Take to Work? An Honest Timeline | TechAuditPros',
  desc: 'A realistic month-by-month timeline for SEO results, what changes fastest, what takes a year, and the four things that make it slower &mdash; plus what to expect from an audit and from the first quarter.',
  eyebrow: 'SEO Timelines',
  h1: 'How Long Does SEO Take to Work?',
  dek: 'Technical fixes can move within days. A new page competing on a real commercial term takes months. Anyone quoting one number for &ldquo;SEO&rdquo; is quoting for something they have not looked at yet.',
  lead: { img: 'seo2-hourglass-counting-down.jpg', alt: 'An hourglass counting down, the honest picture of an SEO timeline' },
  takeaways: [
    'There is no single answer, because &ldquo;SEO&rdquo; is several jobs with different speeds. Fixing indexing can work in days; ranking a new page on a competitive term takes months.',
    'A realistic shape: weeks 1&ndash;2 audit, weeks 2&ndash;6 technical fixes and the first movement, months 2&ndash;4 existing pages improving, months 4&ndash;9 new content landing, months 9+ compounding.',
    'The four things that slow it down: a small or new site, a competitive market, technical debt nobody will pay to fix, and changes waiting on someone else&rsquo;s development queue.',
    'What should be immediate: the audit. If nobody can tell you what is wrong inside two weeks, that is a finding in itself.',
  ],
  intro: 'The honest answer to <strong>how long SEO takes to work</strong> is that it depends which part. Getting pages indexed that were accidentally blocked can work within days. Improving a page that already ranks eleventh often shows inside a month. Ranking a brand-new page against established competitors on a commercial term usually takes several months. Those are three different jobs with three different timescales, and quoting a single number for all of them is how expectations get broken.',
  sections: [
    { h2: 'The Realistic Shape of the First Year', html: `
<div class="article-table-wrap"><table>
<tr><th>When</th><th>What is happening</th><th>What you can see</th></tr>
<tr><th>Weeks 1&ndash;2</th><td>Audit: crawl, index coverage, Core Web Vitals, structured data, the pages you already have and what they actually rank for</td><td>A written document naming the problems. This part should never take longer than two weeks</td></tr>
<tr><th>Weeks 2&ndash;6</th><td>Technical fixes: indexing, redirects, canonicals, speed, schema, internal links</td><td>The first genuine movement, usually on pages that were being held back rather than outranked</td></tr>
<tr><th>Months 2&ndash;4</th><td>On-page work on pages that already rank somewhere</td><td>Positions 8&ndash;20 climbing. This is the fastest real progress available to most sites</td></tr>
<tr><th>Months 4&ndash;9</th><td>New pages built from actual search demand start to settle</td><td>New terms appearing at all, then rising. Long-tail first, head terms later or never</td></tr>
<tr><th>Months 9&ndash;12</th><td>Compounding: the pages that landed earlier gain authority and start supporting each other</td><td>Traffic growth that is no longer tied to a specific launch</td></tr>
</table></div>
<p>Notice which part is fastest: improving what you already have. A site with fifty existing pages almost always has more short-term upside in fixing and sharpening those than in writing the fifty-first.</p>` },
    { h2: 'What Moves in Days, and What Cannot', html: `
<ul>
<li><strong>Days:</strong> pages that were blocked, noindexed, canonicalised to the wrong URL, or unreachable. Fixing these is not really ranking work &mdash; it is removing a blocker &mdash; and it is the most common quick win we find.</li>
<li><strong>Two to six weeks:</strong> title and heading changes on pages that already rank; internal linking; structured data being picked up.</li>
<li><strong>Two to four months:</strong> a page in positions 8&ndash;20 moving into the top five, given the content genuinely improves.</li>
<li><strong>Four to nine months:</strong> a new page competing on a mid-tail commercial term.</li>
<li><strong>Longer, or never:</strong> a new page competing on a head term against national brands. Sometimes the honest answer is that a term is not winnable and the budget belongs elsewhere.</li>
</ul>
<div class="article-callout">If a supplier promises a specific position by a specific date, they are describing something they do not control. What they can promise is the work, the reporting and the honesty about what is not working.</div>`,
      band: { img: 'seo2-hourglass-in-the-dark.jpg', alt: 'An hourglass on a table in low light', cap: 'Removing a blocker takes days. Earning a position takes months.' } },
    { h2: 'The Four Things That Make It Slower', html: `
<ul>
<li><strong>A small or new site.</strong> Fewer pages and less history means less to work with and less trust to draw on. Nothing fixes this except time and doing the work.</li>
<li><strong>A genuinely competitive market.</strong> If the top ten are national brands with dedicated teams, the mid-tail is where the winnable volume is &mdash; and that is a longer, quieter road than a head term.</li>
<li><strong>Technical debt nobody will pay to fix.</strong> A slow, badly structured site caps everything else. Writing more content on top of it is spending money on the wrong layer.</li>
<li><strong>A development queue you do not control.</strong> This is the most common one. Recommendations that sit in someone else&rsquo;s backlog for three months are three months of nothing happening, and it will not look like the supplier&rsquo;s fault or yours.</li>
</ul>
<p>That last point is worth planning for before you start. Agree who implements changes and how quickly, in writing. It matters more to the timeline than almost anything in the strategy.</p>` },
    { h2: 'How to Tell It Is Working Before the Rankings Move', html: `
<p>Positions are a lagging indicator. These move first, and they are what a good monthly report leads with:</p>
<ul>
<li><strong>Impressions</strong> in Search Console, for the terms you are targeting. Being seen at position 30 is the first sign of being seen at all.</li>
<li><strong>Index coverage</strong> &mdash; pages moving from excluded to indexed.</li>
<li><strong>Average position</strong> on a fixed keyword set, even when no single term has broken the top ten.</li>
<li><strong>Core Web Vitals</strong> moving into the green on real-user data, not lab tests.</li>
<li><strong>New terms appearing at all</strong> &mdash; the long tail arriving is how content starts.</li>
</ul>
<p>If none of those five have moved after three months, something is wrong with the work rather than with the timeline. That is the point to ask hard questions. Our <a href="/uk/seo-services/">UK search page</a> sets out how we report, and <a href="/blog/what-should-an-seo-report-include.html">what a monthly report should contain</a> covers the detail.</p>`,
      figure: { img: 'seo2-hourglass-on-wooden-table.jpg', alt: 'An hourglass standing on a wooden table', cap: 'Three months with no movement in impressions, index coverage or average position is not a slow timeline. It is a problem with the work.' } },
  ],
  faqs: [
    { q: 'How long does SEO take to work?', a: 'It depends which part. Unblocking pages that were noindexed or misconfigured can work within days. Improving a page that already ranks 8th to 20th often shows in one to three months. A new page competing on a commercial term usually takes four to nine months. A single number for "SEO" is a number for something nobody has looked at yet.' },
    { q: 'How long does SEO take to start working?', a: 'The first genuine movement usually lands in weeks two to six, and it normally comes from technical fixes rather than new content &mdash; pages that were being held back rather than outranked. Content-driven gains follow from about month four.' },
    { q: 'How long does an SEO audit take?', a: 'One to two weeks for a thorough one on a normal site, and it should end with a written document naming specific issues with page-level examples. If nobody can tell you what is wrong within two weeks, that is itself a finding.' },
    { q: 'Why is my SEO taking longer than expected?', a: 'Usually one of four things: the site is small or new, the market is genuinely competitive, there is technical debt nobody will fund fixing, or recommended changes are sitting in a development queue. The last one is the most common and the easiest to fix &mdash; agree implementation and turnaround in writing before you start.' },
    { q: 'How do I know SEO is working before rankings improve?', a: 'Watch impressions for your target terms, index coverage, average position across a fixed keyword set, Core Web Vitals on real-user data, and whether new long-tail terms are appearing at all. All five move before positions do. If none has moved in three months, question the work rather than the timeline.' },
  ],
  cta: SEO_CTA,
},

// ------------------------------------------------------------------ 3. Why SEO is important
{
  slug: 'why-seo-is-important-business-case', cat: 'seo', date: D,
  title: 'Why SEO Is Important: The Business Case, Not the Sales Pitch | TechAuditPros',
  desc: 'The honest case for SEO: what it is genuinely good at, what it is bad at, when paid search or sales effort is the better spend, and how to work out whether it pays for your business.',
  eyebrow: 'The Business Case',
  h1: 'Why SEO Is Important &mdash; and When It Is Not',
  dek: 'The case for search is strong and specific. It is also frequently overstated, which is why so many businesses have paid for it twice and believed in it once.',
  lead: { img: 'seo2-laptop-with-ai-integration.jpg', alt: 'Working through search performance at a laptop' },
  takeaways: [
    'What SEO is genuinely good at: capturing demand that already exists, at the moment someone is looking, without paying per click.',
    'What it is bad at: creating demand, delivering next week, and competing on head terms against national brands with dedicated teams.',
    'The case is strongest when your customers actively search for what you sell, your average order or lifetime value is meaningful, and you can survive a few months before returns compound.',
    'Sometimes the honest answer is paid search, or a salesperson. A supplier who never says that is selling, not advising.',
  ],
  intro: '<strong>SEO is important</strong> for one specific reason: it captures demand that already exists, at the moment someone is actively looking, without paying for each click. That is a genuinely valuable position to hold, and unlike advertising it does not stop the day the budget does. It is also routinely oversold. Search cannot create demand that is not there, cannot deliver next week, and cannot win a head term against a national brand with a dedicated team. The case is strong where it applies and weak where it does not, and knowing which you are is the whole point.',
  sections: [
    { h2: 'What Search Is Genuinely Good At', html: `
<ul>
<li><strong>Catching intent at the right moment.</strong> Someone searching &ldquo;ERP for small manufacturers&rdquo; has a problem today. No other channel reaches a person at that exact point for that little.</li>
<li><strong>Compounding rather than renting.</strong> A page that ranks keeps working. Stop paying for ads and traffic stops that afternoon; stop paying for SEO and the pages you already own keep earning for a while.</li>
<li><strong>Qualifying before the conversation.</strong> People who arrive through a detailed answer have already read your reasoning. Those conversations start further along.</li>
<li><strong>Being the source AI answers quote.</strong> Increasingly the first answer someone sees is generated, and it cites sources. The work that makes you quotable is largely the work that made you rankable.</li>
<li><strong>Defending your own name.</strong> What appears when someone searches your business is part of your reputation whether you manage it or not.</li>
</ul>` },
    { h2: 'What It Is Bad At &mdash; Stated Plainly', html: `
<div class="article-table-wrap"><table>
<tr><th>If you need&hellip;</th><th>Search is&hellip;</th><th>Better spend</th></tr>
<tr><th>Enquiries next week</th><td>The wrong tool. Nothing moves that fast</td><td>Paid search, or outbound</td></tr>
<tr><th>Demand for something nobody searches for</th><td>Powerless. It captures demand, it does not create it</td><td>Category education, PR, social, direct sales</td></tr>
<tr><th>A head term against national brands</th><td>Usually unwinnable, and expensive to fail at</td><td>The mid-tail, where the buying intent actually lives</td></tr>
<tr><th>Volume on a tiny margin</th><td>Possibly not worth it. The traffic has to be worth more than the work</td><td>Fix the margin, or the offer</td></tr>
<tr><th>To fix a product nobody wants</th><td>Irrelevant. More visitors will find out faster</td><td>The product</td></tr>
</table></div>
<div class="article-callout">The most useful thing a search supplier can tell you is which row you are in. We have told clients to spend on ads instead, and one to fix their quoting process before spending anything on search.</div>`,
      band: { img: 'seo2-many-chains-together.jpg', alt: 'Many chains hanging together', cap: 'Search compounds. That is the whole argument, and it is also why it is slow.' } },
    { h2: 'The Test: Does It Pay for You?', html: `
<p>Four questions. If you answer yes to all four, the case is strong. Three, it is worth doing at a modest scale. Two or fewer, spend the money elsewhere and come back later.</p>
<ul>
<li><strong>Do people actively search for what you sell?</strong> Not your brand &mdash; the problem you solve. If the monthly volume for your category is negligible, no amount of good work creates it.</li>
<li><strong>Is an order worth enough?</strong> A handful of extra enquiries a month has to be worth more than the work. High-value or repeat-purchase businesses clear this easily; low-margin one-offs often do not.</li>
<li><strong>Can you wait?</strong> The realistic shape is first movement in weeks, meaningful returns from month four, compounding after that. A business that needs cash this quarter should buy ads.</li>
<li><strong>Can you actually handle the enquiries?</strong> This one gets skipped and it is the most common reason SEO &ldquo;does not work&rdquo;. Enquiries that nobody follows up look identical to no enquiries.</li>
</ul>` },
    { h2: 'Where the UK Specifics Matter', html: `
<p>Two things change the calculation for a UK business.</p>
<p><strong>Local intent is stronger than most owners expect.</strong> A large share of commercial searches carry a place in them or are resolved locally by Google regardless. For anyone with a service area, the Google Business Profile, consistent business details and genuine recent reviews often move more than any amount of content. That work is cheap, fast, and mostly something you can do yourself.</p>
<p><strong>Answer engines are becoming the first screen.</strong> When the first thing a buyer sees is a generated answer with three citations, being one of those three matters more than being fourth on a page nobody scrolls. That is the same discipline as good SEO &mdash; clear structure, real answers, verifiable facts &mdash; applied with citation in mind. We cover it in <a href="/blog/aeo-and-geo-explained.html">AEO and GEO explained</a>.</p>
<p>If you want the honest version applied to your own numbers, that is what the call is for. See <a href="/uk/seo-services/">UK search work</a>.</p>`,
      figures: [
        { img: 'seo2-steel-chain-tilt-shift.jpg', alt: 'A steel chain in close focus', cap: 'Every page that ranks supports the next one.' },
        { img: 'seo2-silver-chain-daylight.jpg', alt: 'A silver chain in daylight', cap: 'Which is why the fifth month looks nothing like the first.' },
      ] },
  ],
  faqs: [
    { q: 'Why is SEO important for a business?', a: 'Because it captures demand that already exists, at the moment someone is looking, without paying per click &mdash; and the pages keep working after the invoice stops. It also increasingly decides whether AI-generated answers cite you. It is not important for every business: if nobody searches for what you sell, it cannot create that demand.' },
    { q: 'Is SEO still worth it with AI search?', a: 'Yes, and arguably more so, because generated answers cite sources and the work that makes a page citable is largely the work that made it rankable: clear structure, genuine answers, verifiable facts and clean markup. What changes is the measurement &mdash; visibility in answers matters alongside classic positions.' },
    { q: 'When is SEO not the right spend?', a: 'When you need enquiries next week, when nobody searches for your category, when you would be competing on a head term against national brands, when the margin cannot support the work, or when nobody is following up the enquiries you already get. In those cases paid search, outbound, or fixing the offer beats search work.' },
    { q: 'Why is an SEO audit important?', a: 'Because it separates "we are being outranked" from "we are being blocked". A surprising share of lost visibility is technical: pages noindexed, canonicalised to the wrong URL, or unreachable. Those are days of work, not months, and you cannot know which you have without looking.' },
    { q: 'Why is unique content so important in SEO?', a: 'Because duplicated or near-identical pages give a search engine no reason to prefer yours, and give an AI answer nothing distinctive to quote. The value is in saying something specific &mdash; your real figures, your actual process, the questions your customers really ask &mdash; which by definition nobody else can copy.' },
  ],
  cta: SEO_CTA,
},

// ------------------------------------------------------------------ 4. Top of Google
{
  slug: 'how-to-get-to-the-top-of-google', cat: 'seo', date: D,
  title: 'How to Get to the Top of Google: The Realistic Playbook | TechAuditPros',
  desc: 'What it actually takes to reach the top of Google for a term worth having: picking a winnable term, fixing what blocks you, beating the page that is there now, and earning the trust to hold it.',
  eyebrow: 'Ranking',
  h1: 'How to Get to the Top of Google',
  dek: 'Four steps, in order, and the first one decides everything: choosing a term you can actually win. Most sites fail here and then blame the three steps that follow.',
  lead: { img: 'seo2-typing-a-question-on-laptop.jpg', alt: 'Typing a search into a laptop, the moment ranking work is aiming at' },
  takeaways: [
    'Step one is choosing a winnable term. Ranking first for something with buying intent and modest volume beats ranking eleventh for a head term forever.',
    'Step two is removing blockers. A meaningful share of pages that do not rank are not being outranked at all &mdash; they are noindexed, canonicalised elsewhere, or unreachable.',
    'Step three is beating the page that currently ranks, on its own ground: cover everything it covers, then add what it lacks.',
    'Step four is trust: mentions from places with editorial standards, consistent business details, and reviews. This is the slow part and there is no shortcut worth taking.',
  ],
  intro: 'Getting to the <strong>top of Google</strong> for a term worth having is four jobs in a fixed order: pick a term you can realistically win, remove whatever is stopping the page being seen, make your page genuinely better than the one ranking now, and earn enough trust to hold the position. Most attempts fail at step one, by choosing a term the site cannot win, and then blame the content or the supplier for the outcome.',
  sections: [
    { h2: 'Step 1: Pick a Term You Can Actually Win', html: `
<p>This is the whole game and it takes an afternoon. For any term you care about, get three numbers and one judgement.</p>
<div class="article-table-wrap"><table>
<tr><th>What to check</th><th>What you are looking for</th></tr>
<tr><th>Monthly volume</th><td>Enough to matter, which for a considered B2B purchase can be as low as a hundred a month</td></tr>
<tr><th>Difficulty</th><td>Under about 30 for a site without much history. Above 50, assume you are not winning it this year</td></tr>
<tr><th>Intent</th><td>Does someone searching this want to buy, or are they writing an essay? Volume with no intent is a vanity metric</td></tr>
<tr><th>Who is there now</th><td>Open the top three. If they are national brands with dedicated teams, move on. If they are thin, generic pages &mdash; and they very often are &mdash; that is your opening</td></tr>
</table></div>
<p>That last check is the most valuable and the most skipped. We have looked at location and service terms where every page in the top three was 85&ndash;95% generic boilerplate with no FAQ, no pricing guidance and nothing specific to the place. Those are winnable with genuinely useful writing, and no amount of difficulty score tells you that. Only opening the pages does.</p>
<div class="article-callout">Ranking first for a term with real buying intent and modest volume is worth more than ranking eleventh for a head term for three years.</div>` },
    { h2: 'Step 2: Remove What Is Blocking You', html: `
<p>Before improving anything, check that the page can be seen at all. This is unglamorous and it is where the fastest wins live.</p>
<ul>
<li><strong>Is it indexed?</strong> Check coverage in Search Console rather than assuming. Excluded pages cannot rank at any quality.</li>
<li><strong>Is it canonicalised to itself?</strong> A canonical pointing elsewhere tells Google to rank the other page instead.</li>
<li><strong>Can it be reached?</strong> A page no internal link points at is a page nobody &mdash; crawler or customer &mdash; is going to find.</li>
<li><strong>Is it fast enough on a phone?</strong> Core Web Vitals on real-user data, not a lab score on your desktop.</li>
<li><strong>Does the markup say what the page is?</strong> One h1, honest headings, and schema that matches the content.</li>
</ul>
<p>None of that is ranking work. It is removing a handbrake, and it can move a page within days.</p>`,
      band: { img: 'seo2-chain-close-up.jpg', alt: 'Close view of the links in a metal chain', cap: 'Most pages that do not rank are not being outranked. They are being blocked.' } },
    { h2: 'Step 3: Beat the Page That Is There Now', html: `
<p>Not &ldquo;write good content&rdquo; &mdash; beat a specific page. Open the one currently ranking first and inventory it: every heading, its word count, whether it answers questions directly, whether it gives numbers, whether it has an FAQ, and what it conspicuously avoids saying.</p>
<p>Then cover everything it covers, and add what it will not:</p>
<ul>
<li><strong>Real figures.</strong> Most pages avoid numbers because numbers can be wrong. Published third-party figures, properly attributed, immediately outclass a page of adjectives.</li>
<li><strong>The honest caveats.</strong> When your thing is the wrong choice. Nobody in the top three usually says this, and it is the most trust-building paragraph on any page.</li>
<li><strong>Direct answers to the actual questions.</strong> In the words people use, as headings, answered in the first sentence underneath.</li>
<li><strong>Specificity only you have.</strong> Your process, your sector, your place. Generic pages cannot copy it, and AI answers prefer quoting it.</li>
</ul>` },
    { h2: 'Step 4: Earn the Trust to Hold It', html: `
<p>This is the slow part, and where the shortcuts do damage. What genuinely works:</p>
<ul>
<li><strong>Mentions from places with editorial standards.</strong> Trade press, suppliers, industry bodies, real partners. Few and genuine beats many and bought.</li>
<li><strong>Consistent business details everywhere.</strong> Same name, address, phone, hours. Inconsistency undermines local visibility and confuses AI answers about who you even are.</li>
<li><strong>Steady, recent reviews.</strong> A slow trickle continuing today outperforms a cluster from two years ago.</li>
<li><strong>Internal links from your own strongest pages.</strong> The cheapest ranking signal you control, and the most commonly wasted &mdash; see <a href="/blog/internal-linking-and-nofollow.html">internal linking done properly</a>.</li>
</ul>
<p>What does not work, and can cost you: bought links, private networks, directory blasts. The upside is temporary and the downside is not.</p>
<p>If you would rather have someone run steps one and two on your site and tell you honestly which of your terms are winnable, that is what the audit is. See <a href="/uk/seo-services/">UK search work</a>.</p>`,
      figure: { img: 'seo2-google-on-screen.jpg', alt: 'A search engine home page on screen', cap: 'Open the page that ranks first for your term. Inventory it. Then decide whether you can beat it &mdash; before writing anything.' } },
  ],
  faqs: [
    { q: 'How do I get my website to the top of Google?', a: 'Four steps in order: pick a term you can realistically win, remove whatever is blocking the page from being indexed or reached, make your page genuinely better than the one ranking first by covering everything it covers and adding what it lacks, then earn enough trust through real mentions, consistent details and steady reviews to hold the position.' },
    { q: 'How long does it take to reach the top of Google?', a: 'For a term where you are already in positions 8 to 20 and the blockers are technical, weeks to a couple of months. For a new page on a mid-tail commercial term, four to nine months. For a head term against national brands with dedicated teams, usually not at all &mdash; and that is the answer worth hearing early.' },
    { q: 'Can I pay to be at the top of Google?', a: 'You can pay for ad placements, which are labelled as ads and stop the moment the budget does. You cannot pay for an organic position, and anyone offering to is either selling ads without saying so or planning something that will cost you later.' },
    { q: 'Why is my website not ranking at all?', a: 'Check whether it can be seen before assuming it is being outranked. The usual causes are a noindex tag, a canonical pointing at another URL, no internal links to the page, or the page being too slow on mobile. Those are days of work, and they are the most common finding in an audit.' },
    { q: 'Does being first on Google actually matter?', a: 'Less than it did, and still a lot. A generated AI answer above the results now takes some of the attention, and it cites sources &mdash; so the goal has widened from "be first" to "be the page that both the ranking and the answer draw on". The work for both is largely the same.' },
  ],
  cta: SEO_CTA,
},
];
