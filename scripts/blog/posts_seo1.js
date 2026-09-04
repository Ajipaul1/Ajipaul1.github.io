'use strict';
const D = '2026-09-03';
const SEO_CTA = { h3: 'Want to know where your own site stands?', p: 'Book a free strategy call. We look at your real search data together &mdash; rankings, technical health, AI visibility &mdash; and tell you honestly where the leverage is.' };
module.exports = [
// ------------------------------------------------------------------ 10. What is SEO
{
  slug: 'what-is-seo', cat: 'seo', date: D,
  title: 'What Is SEO and How Does It Work? A Plain-English Guide for Business Owners | TechAuditPros',
  desc: 'SEO (search engine optimization) is the work of making your website easy for Google and AI search engines to find, understand and recommend. How search works, the three types of SEO, what it costs, and how long it takes.',
  eyebrow: 'SEO Fundamentals',
  h1: 'What Is SEO and How Does It Work? A Plain-English Guide for Business Owners',
  dek: 'Search engine optimization, explained without the jargon: what Google and AI answer engines actually do with your website, the three kinds of work that move rankings, and what a realistic result looks like.',
  lead: { img: 'istock-1128252197-analyst-data-wall-pencil-thinking.jpg', alt: 'Analyst studying a wall of search-performance data', w: 612, h: 344 },
  takeaways: [
    '<strong>SEO</strong> stands for search engine optimization: the practice of making your website easier for Google &mdash; and now ChatGPT, Perplexity and Google’s AI Overviews &mdash; to find, understand and trust enough to show people, without paying for ads.',
    'Search engines work in three stages &mdash; <em>crawl</em>, <em>index</em>, <em>rank</em> &mdash; and SEO has three matching kinds of work: technical, on-page (content) and off-page (authority).',
    'SEO compounds: it is slow to start (typically 3&ndash;6 months to meaningful movement) and then keeps delivering without a per-click bill, which is why it remains the highest-return channel for most businesses.',
  ],
  intro: '<strong>SEO</strong> &mdash; search engine optimization &mdash; is the work of making your website easier for search engines to find, understand and trust, so that when someone searches for what you sell, your pages appear near the top of the results without you paying for an ad. In 2026 "search engines" means Google and Bing but also the AI answer engines &mdash; Google’s AI Overviews and AI Mode, ChatGPT, Perplexity &mdash; which draw their answers from the same web pages. SEO is not a trick or a setting. It is a set of practical improvements to how your site is built, what it says and who links to it, done consistently over months.',
  sections: [
    { h2: 'How Search Engines Work: Crawl, Index, Rank', html: `
<p>Every search engine does the same three things, and every part of SEO exists to help with one of them.</p>
<ol>
<li><strong>Crawl.</strong> Software (a "crawler" or "bot") follows links from page to page across the web, downloading what it finds. If your page is not linked from anywhere or is blocked, it is invisible.</li>
<li><strong>Index.</strong> The engine reads each page, works out what it is about, and stores it in a giant database &mdash; the index. Pages that are duplicates, thin, or broken may be crawled but never indexed.</li>
<li><strong>Rank.</strong> When someone searches, the engine pulls candidate pages from the index and orders them by how well they answer the query, how trustworthy the site appears, and how good the experience will be (speed, mobile usability, no intrusive pop-ups). AI answer engines do a version of the same thing, then summarize the top sources and cite some of them.</li>
</ol>
<p>Two practical consequences: your site has to be technically reachable before content matters, and content has to genuinely answer the question before authority matters. Skip a stage and the later ones cannot rescue you.</p>` },
    { h2: 'The Three Types of SEO', html: `
<div class="article-table-wrap"><table>
<tr><th>Type</th><th>What it covers</th><th>Who does it</th><th>Helps with</th></tr>
<tr><th>Technical SEO</th><td>Crawlability, indexing, site speed and Core Web Vitals, mobile-friendliness, HTTPS, structured data, clean URLs, redirects</td><td>Engineers</td><td>Crawl and index; the "experience" part of ranking</td></tr>
<tr><th>On-page SEO</th><td>The content itself: what pages exist, what they say, titles and headings, internal links, images, answering the searcher’s actual question</td><td>Writers and strategists</td><td>Relevance &mdash; matching queries to pages</td></tr>
<tr><th>Off-page SEO</th><td>Signals from elsewhere: links from other sites, brand mentions, reviews, local listings</td><td>Outreach, PR, the business itself</td><td>Trust and authority &mdash; how high you rank among relevant pages</td></tr>
</table></div>
<p>A useful shorthand: on-page decides <em>what</em> you can rank for; off-page decides <em>how high</em>; technical decides whether you are in the race at all. Each has its own deep-dive on this blog: <a href="/blog/what-is-technical-seo.html">technical SEO</a>, <a href="/blog/on-page-vs-off-page-seo.html">on-page vs. off-page SEO</a>, and <a href="/blog/what-are-backlinks.html">backlinks</a>.</p>`,
      figure: { img: 'team-flatlay-reviewing-business-report-charts.jpg', alt: 'Team reviewing search performance charts', w: 739, h: 415, cap: 'Technical, on-page, off-page: three kinds of work, one result &mdash; being found.' } },
    { h2: 'Why SEO Matters (In Numbers a Business Owner Cares About)', html: `
<ul>
<li><strong>It is where buying starts.</strong> Most purchases &mdash; a contractor, a supplier, a clinic, a software tool &mdash; begin with a search. If you are not on the first page or in the AI answer, you are not in the consideration set.</li>
<li><strong>Organic clicks do not carry a per-click bill.</strong> Paid search stops the moment the budget does; a page that ranks keeps working for months or years.</li>
<li><strong>It compounds.</strong> Every good page you publish and every link you earn makes the next page easier to rank. Sites that have invested for two years are very hard to displace.</li>
<li><strong>It feeds AI answers.</strong> AI Overviews, ChatGPT and Perplexity cite web pages. The pages they cite are, overwhelmingly, the ones that were already well structured and well ranked &mdash; SEO is how you become citable.</li>
</ul>
<div class="article-callout">The honest caveat: SEO is slow. Technical fixes can move rankings in 4&ndash;8 weeks; competitive keywords take 3&ndash;6 months of consistent work. If you need leads this week, paid search is the right lever and SEO is the one you start at the same time so you are not still paying per click next year.</div>` },
    { h2: 'How SEO Is Different From Paid Search (SEM / PPC)', html: `
<p>Paid search (PPC, often grouped with SEO under "SEM") buys a position on the results page for as long as you pay. SEO earns a position by being the best answer. Paid is fast, controllable and expensive forever; organic is slow, less controllable and cheap once it works. Most growing businesses run both: paid to cover the gap, organic to close it. The full comparison is in <a href="/blog/seo-vs-sem.html">SEO vs. SEM</a>.</p>` },
    { h2: 'What Does SEO Work Actually Look Like?', html: `
<p>Strip away the tooling and a competent SEO program for a small or mid-size business is a repeating cycle:</p>
<div class="article-checklist">
<h3>The SEO cycle</h3>
<ol>
<li><strong>Audit.</strong> What ranks, what is broken, what is missing &mdash; against what customers actually search. (See <a href="/blog/what-is-an-seo-audit.html">What is an SEO audit?</a>)</li>
<li><strong>Keyword and intent research.</strong> The words customers use, how many of them, and what they mean by them. (See <a href="/blog/keyword-research-guide.html">keyword research</a>.)</li>
<li><strong>Technical fixes.</strong> Speed, crawl, index, mobile, schema &mdash; done by engineers, at the source.</li>
<li><strong>Content.</strong> New pages and rewrites that answer the question directly, structured so both people and machines can lift the answer.</li>
<li><strong>Authority.</strong> Earning links and mentions with content worth citing; for local businesses, Google Business Profile and citations.</li>
<li><strong>Measure and repeat.</strong> Rankings, traffic, leads and AI citations against last month; adjust; go again.</li>
</ol>
</div>` },
    { h2: 'SEO in the Age of AI Search', html: `
<p>AI Overviews now appear on a large share of US searches, and some clicks that once went to websites now stop at the AI summary. That has changed SEO’s job without ending it. Three things are different:</p>
<ul>
<li><strong>Being cited matters as much as ranking.</strong> A brand named inside an AI answer wins the click and the trust; one that merely ranks eighth does not.</li>
<li><strong>Answer-first structure wins.</strong> AI engines lift clear, direct answers with visible structure &mdash; a defined term, a numbered process, a comparison table, an FAQ &mdash; from pages they trust. This is what people mean by AEO (answer engine optimization) and GEO (generative engine optimization).</li>
<li><strong>Thin content is finished.</strong> Generic articles that restate what everyone else says are exactly what AI now summarizes away. Specific experience, real numbers and honest trade-offs are what get cited.</li>
</ul>
<p>For the longer version of this argument, read <a href="/blog/is-seo-dead.html">Is SEO dead? What AI search actually changed</a>; for the mechanics of getting cited, see our guide to <a href="/blog/generative-engine-optimization-geo/">generative engine optimization</a>.</p>`,
      figure: { img: 'istock-2148073937-ai-wireframe-head-particles.jpg', alt: 'Abstract visualization of an AI system processing information', w: 612, h: 323, cap: 'AI engines summarize the web &mdash; the pages they cite are the ones already built to be understood.' } },
    { h2: 'How Much Does SEO Cost, and How Long Does It Take?', html: `
<p>In the US, agencies commonly charge US$3,000&ndash;$5,000 or more per month, consultants roughly US$100&ndash;$300 an hour, and budgets under about US$500 a month rarely fund enough work to move anything. TechAuditPros runs the full program &mdash; audit, technical fixes, content, local, AI-search structuring and monthly reporting &mdash; one agreed monthly fee for <a href="/us/seo-services/">US businesses</a> and one agreed monthly fee for <a href="/ca/seo-services/">Canadian businesses</a>, month to month.</p>
<p>Timeline: expect technical and local fixes to show in 4&ndash;8 weeks, competitive keywords and AI citations in 3&ndash;6 months, and compounding returns after that. Anyone promising page one in 30 days is describing a keyword nobody searches for, or a technique that will get you penalized.</p>` },
    { h2: 'How to Tell Whether SEO Is Working', html: `
<p>Not by rankings alone. Track, monthly: impressions and clicks from Google Search Console; rankings for the 20&ndash;50 keywords that matter commercially; organic leads or sales; and, increasingly, whether AI engines cite you for your core questions. A good report puts those next to last month’s numbers and says in plain English what changed and why &mdash; see <a href="/blog/what-should-an-seo-report-include.html">what an SEO report should include</a>.</p>` },
  ],
  faqs: [
    { q: 'What does SEO stand for?', a: 'Search engine optimization &mdash; the practice of improving a website so search engines (and AI answer engines) can find, understand and rank or cite it for relevant searches, without paid advertising.' },
    { q: 'Can I do SEO myself?', a: 'The basics, yes: clear page titles, pages that actually answer customers’ questions, a complete Google Business Profile, a fast mobile-friendly site. Technical fixes, structured data, content at scale and link earning usually need specialists or an engineering team.' },
    { q: 'How long does SEO take to work?', a: 'Technical and local fixes often show results in 4&ndash;8 weeks. Competitive keywords and AI citations typically take 3&ndash;6 months of consistent work, then keep compounding. Timelines depend on your starting point and competition.' },
    { q: 'Is SEO still worth it with AI search?', a: 'Yes. AI answer engines cite web pages, and the pages they cite are the well-structured, trusted ones that SEO produces. What has changed is the goal: being cited inside the answer matters as much as ranking below it.' },
    { q: 'What is the difference between SEO and SEM?', a: 'SEO earns unpaid visibility over time. SEM is the umbrella term that includes SEO plus paid search ads (PPC), which deliver traffic immediately and stop when the budget stops.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 11. Content strategy
{
  slug: 'what-is-a-content-strategy', cat: 'seo', date: D,
  title: 'What Is a Content Strategy? Definition, Framework and a One-Page Template | TechAuditPros',
  desc: 'A content strategy is the plan for what content your business publishes, for whom, why, where, and how you will know it worked. The definition, how it differs from content marketing, the 7-step framework and a one-page template.',
  eyebrow: 'SEO & Content',
  h1: 'What Is a Content Strategy? Definition, Framework and a One-Page Template',
  dek: 'Most businesses publish content. Few have a strategy for it. Here is what the word actually means, how it differs from content marketing and a content audit, and how to write one that fits on a page.',
  lead: { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Team planning content structure on paper', w: 720, h: 419 },
  takeaways: [
    'A <strong>content strategy</strong> answers five questions before anything is written: who is it for, what should it achieve, what will we publish, where, and how will we know it worked.',
    'Content <em>marketing</em> is the doing; content <em>strategy</em> is the deciding. A content <em>audit</em> is the inventory you take before deciding. Most failed content programs skipped the strategy and went straight to publishing.',
    'For a small or mid-size business, a good strategy fits on one page: audience, goals, topic clusters, formats and channels, cadence, owners and metrics.',
  ],
  intro: 'A <strong>content strategy</strong> is the plan that decides what content your business will create, for whom, to achieve which goals, published where and how often, and measured by what &mdash; before anyone writes a word. Content itself (blog posts, service pages, videos, emails) is the output; the strategy is the set of decisions that make the output worth producing. It exists to stop the most common pattern in business content: publishing whatever comes to mind, to no one in particular, and never knowing whether it worked.',
  sections: [
    { h2: 'Content Strategy vs. Content Marketing vs. Content Audit', html: `
<div class="article-table-wrap"><table>
<tr><th>Term</th><th>What it is</th><th>When it happens</th></tr>
<tr><th>Content audit</th><td>An inventory of the content you already have, scored against performance and search demand &mdash; keep, improve, merge or cut</td><td>First. It tells you what you are starting from. (See <a href="/blog/what-is-a-content-audit.html">What is a content audit?</a>)</td></tr>
<tr><th>Content strategy</th><td>The plan: audience, goals, topics, formats, channels, cadence, governance, metrics</td><td>Second. It decides what to do with what the audit found.</td></tr>
<tr><th>Content marketing</th><td>Creating and distributing the content to attract and convert customers</td><td>Third and ongoing. It executes the strategy.</td></tr>
</table></div>
<p>People use the three interchangeably, and the confusion is expensive: teams "do content marketing" for a year without a strategy and wonder why nothing compounds.</p>` },
    { h2: 'The Five Questions a Content Strategy Must Answer', html: `
<ol>
<li><strong>Who is it for?</strong> Not "everyone." The two or three types of buyer you actually want, what they are trying to accomplish, and what they search for and ask AI along the way.</li>
<li><strong>What should it achieve?</strong> Measurable goals tied to the business: qualified leads from organic search, demo requests, reduced support tickets, faster sales cycles because prospects arrive informed.</li>
<li><strong>What will we publish?</strong> Topic clusters that map to the buyer’s questions &mdash; not a random calendar of "ideas."</li>
<li><strong>Where and how often?</strong> The channels that reach those buyers (for most B2B and local businesses: your own site first, then email, then one or two social channels) and a cadence you can sustain for a year.</li>
<li><strong>How will we know?</strong> The metrics you will look at monthly, and who is responsible for looking.</li>
</ol>`,
      figure: { img: 'two-women-reviewing-document-bright-office.png', alt: 'Two colleagues reviewing a content plan document', w: 411, h: 489, cap: 'Five questions, answered in writing, before the first draft.' } },
    { h2: 'A 7-Step Framework to Build One', html: `
<div class="article-checklist">
<h3>From audience to measurement</h3>
<ol>
<li><strong>Define the audience.</strong> Two or three buyer types, each with the jobs they are trying to do and the questions they ask at each stage &mdash; learning, comparing, deciding.</li>
<li><strong>Set two or three goals.</strong> Specific and measurable: "40 qualified organic leads a month by Q2," not "brand awareness."</li>
<li><strong>Audit what exists.</strong> Inventory every page, score it, decide keep/improve/merge/cut. You will usually find your fastest wins here.</li>
<li><strong>Research demand.</strong> Real search volumes and questions for each buyer stage &mdash; the raw material for topic clusters. (See <a href="/blog/keyword-research-guide.html">how to do keyword research</a>.)</li>
<li><strong>Design topic clusters.</strong> One pillar page per core topic (your service page, usually), supported by posts that answer the questions around it and link back. This is also how AI engines learn what you are an authority on.</li>
<li><strong>Decide formats, channels, cadence and owners.</strong> Which pieces are pages, posts, guides, videos or emails; where each is published; how often; and whose name is next to each.</li>
<li><strong>Define governance and measurement.</strong> A style guide, a review step, a refresh schedule for existing pieces, and the monthly metrics review.</li>
</ol>
</div>` },
    { h2: 'The One-Page Content Strategy Template', html: `
<p>For a business with a marketing team of one to five, the whole strategy should fit on a single page. Ours looks like this:</p>
<div class="article-table-wrap"><table>
<tr><th>Section</th><th>What goes in it</th></tr>
<tr><th>Audience</th><td>2&ndash;3 buyer types; their goals; their questions at learn / compare / decide stages</td></tr>
<tr><th>Goals</th><td>2&ndash;3 measurable outcomes with dates</td></tr>
<tr><th>Topic clusters</th><td>3&ndash;5 pillars (usually your services) and the 5&ndash;10 supporting questions under each</td></tr>
<tr><th>Formats &amp; channels</th><td>Which pieces are pages, posts, guides, emails; where each is published</td></tr>
<tr><th>Cadence</th><td>A number you can hold for 12 months (two strong posts a month beats eight thin ones for a quarter)</td></tr>
<tr><th>Owners</th><td>Who researches, writes, reviews, publishes, measures</td></tr>
<tr><th>Metrics</th><td>Impressions, rankings for cluster keywords, organic leads, AI citations; reviewed monthly</td></tr>
<tr><th>Governance</th><td>Style guide link; review step; refresh schedule (re-audit yearly)</td></tr>
</table></div>` },
    { h2: 'What Changes in the AI-Search Era', html: `
<p>Two adjustments to the classic framework. First, write for the question, not the keyword: AI answer engines and Google’s AI Overviews lift direct answers from pages that state them plainly, so every piece should open with the answer and structure the rest so a machine could quote it. Second, expect fewer clicks per ranking and plan for it: a strategy that measures only traffic will look like it is failing while citations and qualified leads rise. Track both.</p>
<p>The corollary: generic content is now worse than no content. If a piece could have been written by anyone about any company, an AI summary will replace it. Specific experience, your numbers, your honest trade-offs &mdash; that is what survives.</p>`,
      figure: { img: 'istock-1416029563-ar-glasses-future-portrait-dark.jpg', alt: 'Person viewing information through augmented-reality glasses', w: 612, h: 408, cap: 'Plan for the question, not the keyword: AI engines quote the pages that answer plainly.' } },
    { h2: 'Common Content Strategy Mistakes', html: `
<ul>
<li><strong>Starting with a calendar.</strong> A schedule of topics is not a strategy; it is a to-do list without a why.</li>
<li><strong>Everything for everyone.</strong> Content aimed at no specific buyer converts no specific buyer.</li>
<li><strong>Publishing over improving.</strong> The audit almost always shows that fixing and cutting existing pages beats adding new ones. Do that first.</li>
<li><strong>Cadence you cannot sustain.</strong> Ambitious for two months, silent for ten. Pick the number you can hold.</li>
<li><strong>No owner for measurement.</strong> If nobody’s job is to look at the numbers monthly, nobody will.</li>
</ul>
<p>Content strategy is one of the first things we build in an SEO engagement &mdash; it sits between the audit and the writing in our <a href="/us/seo-services/">US SEO service</a> and <a href="/ca/seo-services/">Canadian SEO service</a>. The template above is exactly the one we use.</p>` },
  ],
  faqs: [
    { q: 'What is the difference between content strategy and content marketing?', a: 'Content strategy is the plan &mdash; audience, goals, topics, channels, cadence and metrics decided in advance. Content marketing is the execution: creating and distributing the content. Strategy comes first; marketing without it rarely compounds.' },
    { q: 'What should a content strategy include?', a: 'Audience definitions, measurable goals, topic clusters mapped to buyer questions, formats and channels, a sustainable cadence, named owners, the metrics reviewed monthly, and governance (style guide, review step, refresh schedule).' },
    { q: 'How often should a content strategy be updated?', a: 'Review metrics monthly, adjust the plan quarterly, and re-audit the content inventory about once a year. Rewrite the strategy itself when the business, the audience or the search landscape changes materially &mdash; the shift to AI search is one such moment.' },
    { q: 'Do small businesses need a content strategy?', a: 'Yes, and a short one is better than none: a single page covering who the content is for, what it should achieve, the handful of topics you will own, how often you will publish and how you will measure it. It prevents the most expensive mistake &mdash; a year of publishing with nothing to show.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 12. Technical SEO
{
  slug: 'what-is-technical-seo', cat: 'seo', date: D,
  title: 'What Is Technical SEO? The Checklist That Actually Moves Rankings | TechAuditPros',
  desc: 'Technical SEO makes a website easy for search engines and AI crawlers to crawl, render, index and cite. The definition, how it differs from on-page SEO, Core Web Vitals thresholds, and a prioritized 18-point checklist.',
  eyebrow: 'SEO Fundamentals',
  h1: 'What Is Technical SEO? The Checklist That Actually Moves Rankings',
  dek: 'Technical SEO is the engineering side of search: whether crawlers can reach your pages, whether Google indexes them, how fast they load and whether machines can understand them. Here is the definition and a prioritized checklist.',
  lead: { img: 'istock-1164885329-developer-afro-night-code-overlays.jpg', alt: 'Engineer working through technical site fixes with code overlays on screen', w: 612, h: 390 },
  takeaways: [
    '<strong>Technical SEO</strong> is the work of optimizing a site’s infrastructure so search engines and AI systems can crawl, render, index and cite it: crawlability, indexation, speed, mobile, security, structured data and site architecture.',
    'It is the foundation: excellent content on a site Google cannot crawl or that takes six seconds to load will not rank. Fix technical issues first &mdash; they are also the fastest wins.',
    'Core Web Vitals targets are concrete: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1. Most small-business sites fail at least one.',
  ],
  intro: '<strong>Technical SEO</strong> is the part of search engine optimization that deals with how a website is built rather than what it says: whether search engines and AI crawlers can reach every important page, whether those pages get indexed, how quickly and stably they load, whether they work on a phone, and whether machines can understand what each page is about through clean markup and structured data. It is the foundation of everything else in SEO &mdash; on-page content and backlinks cannot reach their potential on a site that is slow, blocked or confusing to a crawler.',
  sections: [
    { h2: 'Technical SEO vs. On-Page SEO', html: `
<p>On-page SEO is about the content people read &mdash; the words, headings, images and internal links on a page. Technical SEO is about the machinery around it: can the page be found, fetched, rendered and stored, and does it perform? A simple test: if fixing it requires an engineer or access to the server, hosting or code, it is technical SEO. For the content side, see <a href="/blog/on-page-vs-off-page-seo.html">on-page vs. off-page SEO</a>.</p>` },
    { h2: 'Crawling: Can Search Engines Reach Your Pages?', html: `
<p>Crawlers discover pages by following links and reading your XML sitemap. Problems here are silent and fatal &mdash; a page that is never crawled cannot rank no matter how good it is.</p>
<ul>
<li><strong>Site architecture.</strong> Important pages should be reachable within three clicks of the homepage. Deep pages get crawled less often and ranked lower.</li>
<li><strong>Internal links.</strong> Every page you care about needs links from other pages. "Orphan" pages with no internal links are routinely missed.</li>
<li><strong>robots.txt.</strong> The file that tells crawlers what they may fetch. Accidentally blocking CSS, JavaScript or whole sections is a common, invisible disaster. Increasingly, check that you are allowing the AI crawlers too (OpenAI’s, Perplexity’s, Google’s) if you want to be cited.</li>
<li><strong>XML sitemap.</strong> Submitted in Google Search Console, listing only the pages you want indexed, updated automatically.</li>
<li><strong>JavaScript rendering.</strong> Content that only appears after heavy client-side JavaScript runs may be crawled late or not at all. Server-rendered or statically generated pages avoid the problem &mdash; one reason we build on Next.js.</li>
</ul>`,
      figure: { img: 'istock-2228764569-developer-night-debugging-monitors.jpg', alt: 'Developer debugging site rendering across two monitors', w: 612, h: 408, cap: 'If the crawler cannot fetch it, render it and store it, nothing else in SEO matters.' } },
    { h2: 'Indexing: Are the Right Pages in Google’s Database?', html: `
<ul>
<li><strong>Index coverage.</strong> Search Console shows which pages are indexed and why others are not. Read it monthly.</li>
<li><strong>noindex used deliberately.</strong> Thank-you pages, internal search results and filters should be kept out; important pages accidentally tagged noindex are a classic launch mistake.</li>
<li><strong>Canonical tags.</strong> When the same content is reachable at more than one URL (with and without a trailing slash, with tracking parameters, HTTP and HTTPS), the canonical tag tells Google which one counts. Every indexable page should have a self-referencing canonical.</li>
<li><strong>Duplicate content.</strong> Near-identical pages &mdash; city pages with the name swapped, product variants, printer-friendly versions &mdash; dilute rankings. Consolidate or canonicalize.</li>
<li><strong>One version of the site.</strong> www or non-www, HTTP redirected to HTTPS, one trailing-slash convention, all enforced with 301 redirects.</li>
</ul>` },
    { h2: 'Performance: Core Web Vitals and Speed', html: `
<p>Google measures real-user experience with three Core Web Vitals, and they are both a ranking signal and a conversion signal:</p>
<div class="article-table-wrap"><table>
<tr><th>Metric</th><th>Measures</th><th>Good</th><th>Typical fixes</th></tr>
<tr><th>LCP &mdash; Largest Contentful Paint</th><td>How long until the main content is visible</td><td>&le; 2.5 seconds</td><td>Compress and properly size images, preload the hero image, faster hosting/CDN, remove render-blocking scripts</td></tr>
<tr><th>INP &mdash; Interaction to Next Paint</th><td>How quickly the page responds to taps and clicks</td><td>&le; 200 milliseconds</td><td>Less JavaScript, defer third-party scripts, break up long tasks</td></tr>
<tr><th>CLS &mdash; Cumulative Layout Shift</th><td>How much the layout jumps around while loading</td><td>&le; 0.1</td><td>Set width/height on images and embeds, reserve space for ads and banners, avoid injecting content above existing content</td></tr>
</table></div>
<p>Beyond the three vitals: total page weight (aim under 1&ndash;2 MB on key pages), number of requests, and time to first byte from your host. Page-builder plugin stacks are the most common cause of poor scores on small-business sites; hand-built pages on modern frameworks are the most common cure. See how we approach it in <a href="/us/website-development/">website development for US businesses</a>.</p>` },
    { h2: 'Mobile, Security and Structured Data', html: `
<ul>
<li><strong>Mobile-first indexing.</strong> Google indexes the mobile version of your site. If content is hidden or broken on a phone, it is hidden or broken for ranking purposes. Our guide to <a href="/blog/how-to-make-a-website-mobile-friendly.html">making a website mobile-friendly</a> covers the specifics.</li>
<li><strong>HTTPS.</strong> Non-negotiable. Mixed content (secure page loading insecure assets) still trips browsers and crawlers.</li>
<li><strong>Structured data (schema markup).</strong> Machine-readable labels &mdash; Organization, Service, FAQPage, Article, Product, LocalBusiness &mdash; that tell search and AI engines exactly what a page is. It earns rich results and makes your content far easier to cite. Validate it; broken schema is ignored.</li>
<li><strong>Hreflang.</strong> If you serve several countries or languages, hreflang tags tell Google which version to show whom and stop them competing as duplicates. Details in <a href="/blog/international-seo-guide.html">international SEO</a>.</li>
<li><strong>Broken pages and redirects.</strong> 404s waste crawl budget and links; redirect chains slow everything down. Fix or redirect, and keep a redirect map whenever URLs change.</li>
</ul>`,
      figure: { img: 'istock-2215674808-senior-guiding-junior-code-night.jpg', alt: 'Senior engineer guiding a colleague through schema markup in code', w: 612, h: 408, cap: 'Structured data is how you tell machines, unambiguously, what a page is &mdash; and why it is worth citing.' } },
    { h2: 'The Prioritized Technical SEO Checklist', html: `
<div class="article-checklist">
<h3>Do these in order</h3>
<ol>
<li>Confirm the site is crawlable: robots.txt allows key sections, CSS and JS, and the AI crawlers you want.</li>
<li>Confirm important pages are indexed (Search Console coverage) and no key page carries noindex.</li>
<li>Enforce one version: HTTPS, one host, one trailing-slash rule, 301s for the rest.</li>
<li>Self-referencing canonical on every indexable page; canonicalize or consolidate duplicates.</li>
<li>Submit a clean XML sitemap that lists only indexable pages.</li>
<li>Fix 404s and redirect chains; keep a redirect map.</li>
<li>Get LCP under 2.5 s: image compression and sizing, hero preload, hosting/CDN.</li>
<li>Get INP under 200 ms: cut and defer JavaScript, especially third-party tags.</li>
<li>Get CLS under 0.1: dimensions on media, reserved space for dynamic elements.</li>
<li>Verify mobile rendering matches desktop content.</li>
<li>Flatten architecture so key pages are within three clicks; add internal links to orphans.</li>
<li>Add and validate structured data on every page type.</li>
<li>Add breadcrumbs (markup and schema) on deep sites.</li>
<li>Handle pagination and faceted navigation so filters do not create thousands of thin URLs.</li>
<li>Add hreflang if you serve multiple countries or languages.</li>
<li>Ensure server-side rendering for content that must be indexed.</li>
<li>Monitor Search Console and Core Web Vitals monthly; alert on regressions.</li>
<li>Re-run the full technical audit after any redesign, migration or platform change.</li>
</ol>
</div>` },
    { h2: 'Who Should Do Technical SEO?', html: `
<p>Engineers. Most technical SEO fixes are code, server and hosting changes, which is why so many agency recommendations die as tickets in a developer’s backlog. At TechAuditPros the people who build websites are the people who run SEO, so fixes ship instead of being recommended &mdash; that is the structural reason behind the <a href="/us/seo-services/">US SEO service</a> and <a href="/ca/seo-services/">Canadian SEO service</a> being run by an engineering team. If you are auditing your own site, start with <a href="/blog/what-is-an-seo-audit.html">what an SEO audit covers</a>.</p>` },
  ],
  faqs: [
    { q: 'What is included in technical SEO?', a: 'Crawlability (robots.txt, sitemaps, internal linking, architecture), indexation (canonicals, noindex, duplicates), performance (Core Web Vitals, page weight), mobile-friendliness, HTTPS, structured data, hreflang for international sites, redirects and broken-page cleanup, and JavaScript rendering.' },
    { q: 'What are good Core Web Vitals scores?', a: 'Largest Contentful Paint at or under 2.5 seconds, Interaction to Next Paint at or under 200 milliseconds, and Cumulative Layout Shift at or under 0.1, measured on real users (the field data in Google Search Console and PageSpeed Insights).' },
    { q: 'How often should technical SEO be checked?', a: 'Monitor Search Console and Core Web Vitals monthly, and run a full technical audit after any redesign, migration, platform change or major content launch &mdash; those are the moments when things break.' },
    { q: 'Is technical SEO a one-time job?', a: 'No. Sites change &mdash; new plugins, new pages, new scripts, new templates &mdash; and each change can introduce a technical problem. The initial cleanup is the big job; ongoing monitoring keeps it from silently decaying.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 13. SEO audit
{
  slug: 'what-is-an-seo-audit', cat: 'seo', date: D,
  title: 'What Is an SEO Audit? What It Covers, What It Costs and What to Do With It | TechAuditPros',
  desc: 'An SEO audit is a structured review of everything that affects how a website performs in search: technical health, content, on-page, authority, local and AI visibility. The 6 areas it covers, realistic cost and timelines, and how to act on it.',
  eyebrow: 'SEO Fundamentals',
  h1: 'What Is an SEO Audit? What It Covers, What It Costs and What to Do With It',
  dek: '"Free SEO audit" is the most abused phrase in marketing. Here is what a real audit examines, what a good one produces, how long it takes, and how to tell a diagnosis from a sales pitch.',
  lead: { img: 'team-standing-document-review-bright-room.jpg', alt: 'Team reviewing printed SEO audit findings together', w: 2400, h: 1601 },
  takeaways: [
    'An <strong>SEO audit</strong> is a structured review of every factor affecting a site’s search performance &mdash; technical, content, on-page, authority, local and now AI visibility &mdash; that ends in a prioritized plan, not a score.',
    'A real audit takes one to two weeks for a typical small-business site and uses your actual Search Console and analytics data; an "instant free audit" is an automated crawl report with a sales call attached.',
    'The output that matters is the ordered list of what to fix first. Audits that produce a 90-page PDF and no priorities have failed at their only job.',
  ],
  intro: 'An <strong>SEO audit</strong> is a systematic review of everything that affects how your website performs in search: whether search engines can crawl and index it, how fast and usable it is, whether its content matches what customers search for, how much authority it has earned, how it shows up locally, and &mdash; increasingly &mdash; whether AI answer engines cite it. The purpose is not a score. It is a prioritized list of what is holding the site back and what to fix first, grounded in your real data rather than a generic checklist.',
  sections: [
    { h2: 'SEO Audit vs. Content Audit vs. Technical Audit', html: `
<p>Three overlapping terms, worth separating:</p>
<ul>
<li>A <strong>technical SEO audit</strong> covers only the infrastructure &mdash; crawl, index, speed, mobile, schema. (What it checks: <a href="/blog/what-is-technical-seo.html">What is technical SEO?</a>)</li>
<li>A <strong>content audit</strong> inventories every page and scores it for keep / improve / merge / cut. (Full guide: <a href="/blog/what-is-a-content-audit.html">What is a content audit?</a>)</li>
<li>A <strong>full SEO audit</strong> includes both, plus on-page, authority, local and AI visibility, and turns the whole picture into one prioritized plan.</li>
</ul>
<p>This article is about the full version.</p>` },
    { h2: 'The Six Areas a Full SEO Audit Covers', html: `
<div class="article-table-wrap"><table>
<tr><th>Area</th><th>Key questions</th><th>Where the evidence comes from</th></tr>
<tr><th>1. Technical health</th><td>Can crawlers reach and index every important page? Is the site fast (LCP &le; 2.5 s, INP &le; 200 ms, CLS &le; 0.1), mobile-friendly, secure? Are there duplicate versions, broken pages, redirect chains, missing or invalid schema?</td><td>A full crawl, Search Console coverage and Core Web Vitals reports, PageSpeed Insights</td></tr>
<tr><th>2. Content inventory</th><td>What ranks, what has impressions but no clicks, what is thin or outdated, what pages compete with each other, what is orphaned?</td><td>Search Console performance data, analytics, the crawl</td></tr>
<tr><th>3. Keyword and intent gaps</th><td>Which searches customers make that no page answers? Where are you ranking on page two for terms worth winning?</td><td>Keyword research against your market; Search Console positions 8&ndash;30</td></tr>
<tr><th>4. On-page</th><td>Do titles, headings, meta descriptions and internal links match the target query and invite the click? Does each page open with the answer?</td><td>Page-by-page review of the pages that matter commercially</td></tr>
<tr><th>5. Authority and local</th><td>Who links to you and how does it compare with competitors? Is the Google Business Profile complete and consistent with citations? Are reviews being earned?</td><td>Backlink tools, competitor comparison, local listing check</td></tr>
<tr><th>6. AI visibility</th><td>Do ChatGPT, Perplexity and Google’s AI Overviews cite you for your core questions? What do they say about your brand? Which competitors are cited instead?</td><td>Direct testing of the questions your buyers ask, tracked over time</td></tr>
</table></div>`,
      figure: { img: 'istock-1128252197-analyst-data-wall-pencil-thinking.jpg', alt: 'Analyst working through audit data on a wall of charts', w: 612, h: 344, cap: 'Six areas, one prioritized list. The evidence is your own data, not a generic checklist.' } },
    { h2: 'What a Good Audit Produces', html: `
<p>Not a score, and not a 90-page PDF. A good audit delivers:</p>
<ol>
<li><strong>A baseline.</strong> Current impressions, clicks, rankings for the keywords that matter, Core Web Vitals, index coverage and AI citations &mdash; so progress can be measured honestly.</li>
<li><strong>Findings in plain English.</strong> What is wrong, why it matters, and how much it is likely costing.</li>
<li><strong>A prioritized plan.</strong> The order of work, based on impact versus effort: usually technical blockers first, then improving pages already close to ranking, then new content for the gaps, then authority.</li>
<li><strong>Owners and timelines.</strong> Who fixes what, by when &mdash; because most audit recommendations die as tickets nobody owns.</li>
</ol>
<div class="article-callout">The single most common finding across small-business audits: pages ranking in positions 8&ndash;20 for commercially valuable searches. Improving those is almost always higher-leverage than writing new content &mdash; the topical authority is already there.</div>` },
    { h2: 'How Long Does an SEO Audit Take, and What Does It Cost?', html: `
<p>For a typical small or mid-size business site of 30&ndash;300 pages, a thorough audit takes one to two weeks: a few days for crawling, data collection and testing, then the slower human work of interpreting findings and deciding priorities. Enterprise sites with tens of thousands of pages take longer.</p>
<p>Standalone audits from US agencies and consultants commonly run from around US$1,000 for a light review to US$5,000&ndash;$15,000 or more for a deep enterprise audit. At TechAuditPros the full audit is the first month of every <a href="/us/seo-services/">US SEO engagement</a> and <a href="/ca/seo-services/">Canadian SEO engagement</a> &mdash; included in the flat monthly rate, because we would not know what to work on without it.</p>` },
    { h2: 'How to Tell a Real Audit From a Sales Pitch', html: `
<ul>
<li><strong>Instant results.</strong> A real audit needs your Search Console and analytics access and takes days. An instant PDF is an automated crawl with a score designed to alarm you.</li>
<li><strong>Everything is red.</strong> Tools flag hundreds of "errors," most trivial. A real audit tells you which ten matter.</li>
<li><strong>No baseline.</strong> If it does not record where you are today, it cannot show progress later.</li>
<li><strong>No priorities.</strong> A list of 200 items with no order is not a plan.</li>
<li><strong>Findings that would apply to any site.</strong> "Add more content," "build backlinks." Real findings name your pages, your queries, your competitors.</li>
</ul>`,
      figure: { img: 'istock-2231952003-presenting-dashboard-wood-meeting-room.jpg', alt: 'Consultant presenting audit findings and priorities to a client team', w: 612, h: 408, cap: 'A real audit ends with an ordered list and owners &mdash; not a score and a sales call.' } },
    { h2: 'How Often Should You Audit?', html: `
<p>A full audit once a year, or after any major change &mdash; a redesign, a migration, a platform switch, a rebrand &mdash; and a lighter technical check monthly through Search Console and Core Web Vitals monitoring. Sites that publish regularly should also re-run the content inventory yearly; today’s "keep" is next year’s "outdated."</p>
<p>The audit is the map, not the journey. Its value is entirely in the work it directs, which is why ours feeds straight into the technical fixes, content and reporting cycle described in <a href="/blog/what-is-seo.html">What is SEO and how does it work?</a></p>` },
  ],
  faqs: [
    { q: 'What does an SEO audit include?', a: 'Technical health (crawl, index, speed, mobile, schema), a content inventory, keyword and intent gaps, on-page review of key pages, authority and local presence, and AI visibility &mdash; producing a baseline and a prioritized plan with owners.' },
    { q: 'How much does an SEO audit cost?', a: 'Standalone audits from US agencies commonly range from about US$1,000 for a light review to US$5,000&ndash;$15,000+ for deep enterprise audits. TechAuditPros includes the full audit in the first month of its flat-rate SEO service.' },
    { q: 'Can I do an SEO audit myself?', a: 'You can cover a lot with free tools: Google Search Console for indexing and performance, PageSpeed Insights for Core Web Vitals, and a crawler for broken links and duplicates. Interpreting the findings and prioritizing them is where experience matters most.' },
    { q: 'How long does an SEO audit take?', a: 'One to two weeks for a typical small or mid-size business site &mdash; a few days of data collection and testing, then the human work of interpretation and prioritization. Very large sites take longer.' },
    { q: 'What is the difference between an SEO audit and a content audit?', a: 'A content audit inventories and scores your existing pages. An SEO audit is broader: it includes the content audit plus technical health, on-page, authority, local and AI visibility, and turns all of it into one prioritized plan.' },
  ],
  cta: SEO_CTA,
},
];
