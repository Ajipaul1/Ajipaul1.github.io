'use strict';
const D = '2026-09-03';
const SEO_CTA = { h3: 'Want a strategy and a report you can actually read?', p: 'Book a free strategy call. We look at your real search data together and tell you honestly where the leverage is &mdash; and what we would leave alone.' };
module.exports = [
// ------------------------------------------------------------------ 22. SEO strategy
{
  slug: 'how-to-build-an-seo-strategy', cat: 'seo', date: D,
  title: 'How to Build an SEO Strategy: A Step-by-Step Plan for 2026 | TechAuditPros',
  desc: 'An SEO strategy is the prioritized plan that connects your business goals to the technical, content and authority work that will move rankings and AI citations. The 8-step framework, a 12-month roadmap template, and how to measure it.',
  eyebrow: 'SEO Strategy',
  h1: 'How to Build an SEO Strategy: A Step-by-Step Plan for 2026',
  dek: 'An SEO strategy is not a list of tactics. It is the ordered plan that gets a specific business from where its search visibility is to where it needs to be. Here is how to build one, with a 12-month roadmap you can copy.',
  lead: { img: 'whiteboard-process-mapping-two-colleagues.jpg', alt: 'Two colleagues mapping an SEO roadmap on a whiteboard', w: 2400, h: 1601 },
  takeaways: [
    'An <strong>SEO strategy</strong> answers four questions in order: where are we now, which searches matter to the business, what is stopping us from winning them, and in what order do we fix it.',
    'The order is almost always the same: technical blockers, then pages already close to ranking, then new content for demand gaps, then authority &mdash; because each stage multiplies the next.',
    'In 2026 the strategy has two targets, not one: rank for the commercial searches where people still click, and be cited by AI engines for the questions they ask on the way.',
  ],
  intro: 'An <strong>SEO strategy</strong> is a prioritized plan that connects what the business needs &mdash; leads, sales, bookings &mdash; to the specific technical, content and authority work that will earn the search visibility to deliver it. It is different from a list of SEO tactics in one crucial way: it has an order, and the order is based on your site’s actual data. Businesses without a strategy do SEO activities; businesses with one fix the thing that is blocking everything else first, then the next, and see the results compound.',
  sections: [
    { h2: 'Step 1: Set Business Goals, Not SEO Goals', html: `
<p>"Rank on page one" is not a goal; it is a means. Start with two or three outcomes the business would recognize: 40 qualified organic leads a month by Q2, a 25% increase in bookings from the service-area pages, first-page visibility and AI citations for the ten questions your sales team answers most. Every later decision &mdash; which pages, which keywords, which fixes first &mdash; is judged against these.</p>` },
    { h2: 'Step 2: Establish the Baseline With an Audit', html: `
<p>You cannot plan a route without knowing the starting point. A full <a href="/blog/what-is-an-seo-audit.html">SEO audit</a> records current impressions, clicks, rankings for the terms that matter, Core Web Vitals, index coverage, backlink profile and whether AI engines cite you today. It also produces the first draft of the priority list, because it surfaces what is broken.</p>` },
    { h2: 'Step 3: Research Demand and Map It to Pages', html: `
<p><a href="/blog/keyword-research-guide.html">Keyword research</a> turns "what our customers search for" from a guess into a spreadsheet: volumes, intent, difficulty and the questions people ask. Cluster the terms, then map each cluster to the page that should win it &mdash; commercial clusters to service pages, question clusters to guides that link back to them. The clusters with no page yet are your content plan. The clusters where you rank in positions 8&ndash;20 are your quickest wins.</p>`,
      figure: { img: 'team-flatlay-reviewing-business-report-charts.jpg', alt: 'Team mapping keyword clusters to pages using printed charts', w: 739, h: 415, cap: 'Demand mapped to pages is the spine of the strategy. Every cluster gets one owner page.' } },
    { h2: 'Step 4: Fix the Technical Blockers First', html: `
<p>Nothing else in the plan works on a site that crawlers cannot reach, that takes five seconds to load, or that serves duplicate versions of itself. The <a href="/blog/what-is-technical-seo.html">technical SEO</a> findings from the audit go first: crawl and index issues, Core Web Vitals, canonical and duplicate problems, mobile rendering, schema. These are also the fastest to show results &mdash; often within four to eight weeks &mdash; which buys patience for the slower work.</p>` },
    { h2: 'Step 5: Improve Before You Publish', html: `
<p>The counterintuitive finding of nearly every audit: pages that already have impressions but weak rankings or clicks are worth more than new pages. Rewrite them answer-first, deepen them, fix titles and internal links, add FAQ schema. Improving a page from position 12 to position 4 on a term with real demand routinely outperforms a month of new content. Only then start filling the demand gaps with new guides, following the <a href="/blog/seo-content-writing.html">content anatomy that ranks and gets cited</a>.</p>` },
    { h2: 'Step 6: Build Authority Without Buying It', html: `
<p>With the technical base fixed and the content improved, off-page work has something to point at. Complete and actively manage the Google Business Profile if you serve a location; make name, address and phone consistent everywhere; publish one or two genuinely citable assets a year; do the outreach and PR to get them referenced; convert unlinked brand mentions into links. Never buy links &mdash; the <a href="/blog/what-are-backlinks.html">backlinks guide</a> explains why the shortcut costs more than the road.</p>` },
    { h2: 'Step 7: Structure for AI Answers', html: `
<p>This is the step that did not exist in most strategies three years ago. For every question cluster, the owning page opens with the direct answer, uses headings that mirror the follow-up questions, includes a comparison table or numbered steps where a reader would want them, and carries an FAQ with matching schema. Check robots.txt allows the AI crawlers. Then test the questions monthly in ChatGPT, Perplexity and Google’s AI Mode and record who is cited &mdash; that is the AI half of your scorecard. Background: <a href="/blog/is-seo-dead.html">what AI search actually changed</a>.</p>`,
      figure: { img: 'istock-2148073937-ai-wireframe-head-particles.jpg', alt: 'Visualization of an AI engine assembling answers from sources', w: 612, h: 323, cap: 'Two scorecards now: rankings where people click, citations where AI answers.' } },
    { h2: 'Step 8: Measure Monthly and Re-Prioritize Quarterly', html: `
<p>Track a small set of numbers against the baseline every month &mdash; impressions, clicks, rankings for the mapped clusters, organic leads, AI citations, Core Web Vitals &mdash; and write down what changed and why. Every quarter, re-order the plan based on what the numbers say. A strategy that is not revised is a document; one that is revised is a system. See <a href="/blog/what-should-an-seo-report-include.html">what an SEO report should include</a> for the format.</p>` },
    { h2: 'A 12-Month SEO Roadmap Template', html: `
<div class="article-table-wrap"><table>
<tr><th>Months</th><th>Focus</th><th>Typical deliverables</th><th>What you should see</th></tr>
<tr><th>1</th><td>Audit and plan</td><td>Baseline recorded; technical findings; keyword clusters mapped to pages; 12-month priority list</td><td>Clarity on what is blocking what</td></tr>
<tr><th>2&ndash;3</th><td>Technical fixes and quick wins</td><td>Crawl/index fixes, Core Web Vitals, canonicals, schema; rewrite of the 5&ndash;10 pages closest to ranking</td><td>First ranking movement on quick-win pages; Search Console errors cleared</td></tr>
<tr><th>4&ndash;6</th><td>Content and local</td><td>Service pages rebuilt answer-first; first new guides for demand gaps; Google Business Profile and citations cleaned; FAQ schema everywhere</td><td>Rankings on commercial terms; first AI citations for core questions</td></tr>
<tr><th>7&ndash;9</th><td>Authority</td><td>One citable asset published; outreach and PR; unlinked mentions converted; review generation running</td><td>Referring domains growing; competitive terms climbing</td></tr>
<tr><th>10&ndash;12</th><td>Compound and expand</td><td>Second wave of guides; conversion improvements on ranking pages; expansion to new clusters or markets</td><td>Organic leads at or near the goal; clear next-year plan</td></tr>
</table></div>
<p>Timelines assume a small or mid-size business site with normal competition; heavily competitive markets stretch the middle phases. The roadmap above is essentially how our <a href="/us/seo-services/">US SEO engagements</a> and <a href="/ca/seo-services/">Canadian engagements</a> run, for a flat monthly rate.</p>` },
    { h2: 'Common SEO Strategy Mistakes', html: `
<ul>
<li><strong>Starting with content.</strong> Publishing on a technically broken site wastes the content.</li>
<li><strong>Chasing volume.</strong> The biggest keywords are informational, dominated by giants, and increasingly answered by AI without a click.</li>
<li><strong>No owner page per cluster.</strong> Several pages competing for one term split the authority.</li>
<li><strong>Measuring traffic alone.</strong> In the AI-search era traffic can fall while visibility and leads rise. Track leads and citations too.</li>
<li><strong>Never revising.</strong> The plan you wrote in January should look different in July if you learned anything.</li>
</ul>` },
  ],
  faqs: [
    { q: 'What should an SEO strategy include?', a: 'Business goals, a baseline audit, keyword clusters mapped to owner pages, a prioritized technical fix list, a plan for improving existing pages before publishing new ones, an authority-building approach that does not involve buying links, AI-answer structuring, and a monthly measurement routine.' },
    { q: 'How long does an SEO strategy take to work?', a: 'Technical and quick-win improvements typically show in 4&ndash;8 weeks; commercial rankings and AI citations in 3&ndash;6 months; compounding returns through the second half of the first year. Competitive markets take longer.' },
    { q: 'What is the difference between an SEO strategy and SEO tactics?', a: 'Tactics are individual actions &mdash; fix a redirect, write a page, earn a link. A strategy is the prioritized, data-based order in which those actions are taken to reach a business goal, and the measurement loop that revises the order.' },
    { q: 'How often should an SEO strategy be updated?', a: 'Measure monthly, re-prioritize quarterly, and rebuild the strategy annually or after major changes &mdash; a redesign, a new market, or a shift in how search works such as the rise of AI answers.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 23. SEO report
{
  slug: 'what-should-an-seo-report-include', cat: 'seo', date: D,
  title: 'What Should an SEO Report Include? A Plain-English Guide to Reading Yours | TechAuditPros',
  desc: 'A good SEO report answers three questions in plain English: what changed, what moved, and what is next. The 9 metrics that belong in it, the vanity metrics that do not, a one-page template, and how to tell a real report from a dashboard export.',
  eyebrow: 'SEO Strategy',
  h1: 'What Should an SEO Report Include? A Plain-English Guide to Reading (and Demanding) a Good One',
  dek: 'If you need an SEO to translate your SEO report, it is not a report. Here is what a useful one contains, what it leaves out, and a one-page template any business owner can read in five minutes.',
  lead: { img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Business owner reading a monthly SEO report on a tablet', w: 612, h: 402 },
  takeaways: [
    'An <strong>SEO report</strong> should answer three questions in this order: <em>what did we change</em>, <em>what moved</em> (against last month and the baseline), and <em>what is next</em> &mdash; in plain English, on one page, with the data behind it available if you want it.',
    'Nine metrics belong in it: impressions, clicks, rankings for the mapped keyword clusters, organic leads or sales, AI citations, Core Web Vitals, index coverage, referring domains, and the work completed.',
    'Vanity metrics &mdash; total keywords "tracked," domain authority scores, raw traffic without leads &mdash; belong in the appendix at most. If a report leads with them, ask why.',
  ],
  intro: 'An <strong>SEO report</strong> is the regular (usually monthly) account of what was done to your search visibility, what happened as a result, and what the plan is next. A good one is written for the person paying for the work, not for another SEO: it leads with plain-English answers, shows the handful of numbers that connect to the business, compares them honestly to last month and to the starting baseline, and says clearly when a month was slow and why. Most reports fail that test because they are dashboard exports &mdash; forty charts and no sentences.',
  sections: [
    { h2: 'The Three Questions Every Report Must Answer', html: `
<ol>
<li><strong>What did we change?</strong> The specific work completed this month: pages rewritten, technical fixes shipped, links earned, listings fixed. If this section is vague, nothing was done.</li>
<li><strong>What moved?</strong> The metrics, each against last month and against the baseline from the start of the engagement, with one sentence of interpretation. Up, down or flat, and the most likely reason.</li>
<li><strong>What is next?</strong> The plan for the coming month, in priority order, and anything you need to decide or provide.</li>
</ol>
<p>Everything else is supporting detail.</p>` },
    { h2: 'The Nine Metrics That Belong in an SEO Report', html: `
<div class="article-table-wrap"><table>
<tr><th>Metric</th><th>Source</th><th>Why it is in</th></tr>
<tr><th>1. Impressions</th><td>Google Search Console</td><td>How often you appeared in results &mdash; visibility, the leading indicator</td></tr>
<tr><th>2. Clicks</th><td>Search Console</td><td>Visits from search; read with impressions to see click-through rate</td></tr>
<tr><th>3. Rankings for mapped clusters</th><td>Rank tracking</td><td>Positions for the 20&ndash;50 terms tied to your pages and goals &mdash; not "all keywords"</td></tr>
<tr><th>4. Organic leads or sales</th><td>Analytics, CRM, call tracking</td><td>The business outcome; the number the rest exist to move</td></tr>
<tr><th>5. AI citations</th><td>Monthly testing in ChatGPT, Perplexity, Google AI Mode</td><td>Whether AI engines name you for your core questions &mdash; the new visibility channel</td></tr>
<tr><th>6. Core Web Vitals</th><td>Search Console, PageSpeed Insights</td><td>Speed and stability; a ranking and conversion factor that regresses silently</td></tr>
<tr><th>7. Index coverage</th><td>Search Console</td><td>Pages indexed versus excluded; new errors flag problems early</td></tr>
<tr><th>8. Referring domains</th><td>Backlink tools</td><td>Authority growth; new and lost links</td></tr>
<tr><th>9. Work completed</th><td>The team</td><td>The changes that explain the numbers</td></tr>
</table></div>`,
      figure: { img: 'team-flatlay-reviewing-business-report-charts.jpg', alt: 'Reviewing a monthly report with charts at a desk', w: 739, h: 415, cap: 'Nine numbers, each against last month and the baseline, each with one sentence of meaning.' } },
    { h2: 'What Does Not Belong (or Belongs in the Appendix)', html: `
<ul>
<li><strong>"Total keywords ranking."</strong> A site ranks for thousands of accidental terms; the number rises and falls with Google’s index and means little. Track the mapped clusters instead.</li>
<li><strong>Domain authority and similar scores.</strong> Third-party estimates, not Google metrics. Useful for comparing competitors occasionally; not a monthly KPI.</li>
<li><strong>Raw traffic without leads.</strong> Traffic that does not convert is a cost. In the AI-search era it can also fall while business results rise.</li>
<li><strong>Forty charts.</strong> If it needs a scroll bar, it is a dashboard, not a report.</li>
<li><strong>Jargon without translation.</strong> "Optimized LCP on 14 templates" is fine only if the next sentence says "pages load about a second faster on phones."</li>
</ul>` },
    { h2: 'The One-Page SEO Report Template', html: `
<div class="article-checklist">
<h3>Section by section</h3>
<ol>
<li><strong>Summary (3&ndash;5 sentences).</strong> The month in plain English: what changed, what moved, the one thing to know.</li>
<li><strong>Work completed.</strong> A short list with links to the pages or fixes.</li>
<li><strong>Scorecard.</strong> The nine metrics in a small table: this month, last month, baseline, direction.</li>
<li><strong>Wins and misses.</strong> Two or three specific results (a page that jumped, a question now cited by AI) and anything that went backwards, with the reason.</li>
<li><strong>Next month.</strong> The plan in priority order.</li>
<li><strong>Needs from you.</strong> Approvals, content input, access &mdash; the things only the client can provide.</li>
<li><strong>Appendix (optional).</strong> Full keyword table, technical crawl summary, link list, for those who want the data.</li>
</ol>
</div>
<p>This is the format we use for every <a href="/us/seo-services/">US SEO client</a> and <a href="/ca/seo-services/">Canadian SEO client</a>, written by the engineer who did the work rather than an account manager summarizing it.</p>`,
      figure: { img: 'istock-2231952003-presenting-dashboard-wood-meeting-room.jpg', alt: 'Consultant walking a client through a one-page report in a meeting room', w: 612, h: 408, cap: 'Written by the person who did the work, readable by the person who paid for it.' } },
    { h2: 'How to Read Your SEO Report Like an Owner', html: `
<ul>
<li><strong>Look at trend, not month.</strong> Search data is noisy; a single month down means little. Three months down means something.</li>
<li><strong>Read impressions and clicks together.</strong> Rising impressions with flat clicks means visibility without appeal &mdash; often a title-tag problem, or AI Overviews absorbing the click.</li>
<li><strong>Connect rankings to pages.</strong> A ranking gain on a term nobody buys from is not a win. Ask which pages moved and whether they lead anywhere.</li>
<li><strong>Ask the "why" question once.</strong> If the report does not explain a movement, ask. If it cannot explain it, that is informative too.</li>
<li><strong>Check that "next month" follows from "this month."</strong> A plan that does not respond to the results is a template.</li>
</ul>` },
    { h2: 'Red Flags in SEO Reporting', html: `
<ul>
<li>The report is a screenshot of a dashboard with no written interpretation.</li>
<li>Every month is positive. Real SEO has flat and down months; a report that never admits one is curating.</li>
<li>Metrics change from month to month to whatever looks best.</li>
<li>No baseline &mdash; progress is claimed but cannot be measured against a start point.</li>
<li>"Links built" listed without the linking domains. Ask to see them; if you would be embarrassed by the sites, so should they be.</li>
</ul>
<p>Reporting is the last step of the cycle described in <a href="/blog/how-to-build-an-seo-strategy.html">how to build an SEO strategy</a>, and the step that keeps the rest honest.</p>` },
  ],
  faqs: [
    { q: 'How often should I get an SEO report?', a: 'Monthly is the standard for most businesses &mdash; frequent enough to catch problems, long enough for search data to be meaningful. A short quarterly review that re-prioritizes the plan is useful on top of it.' },
    { q: 'What metrics matter most in SEO?', a: 'Organic leads or sales first, because they are the business outcome; then impressions, clicks and rankings for the keyword clusters tied to your pages; then AI citations, Core Web Vitals, index coverage and referring domains as the health and authority indicators.' },
    { q: 'What is a good SEO report format?', a: 'One page: a plain-English summary, the work completed, a nine-metric scorecard against last month and the baseline, wins and misses with reasons, the plan for next month, and what the client needs to provide. Data tables go in an appendix.' },
    { q: 'How do I know if my SEO agency is doing a good job?', a: 'The report explains what changed and why in plain language, admits slow months, shows steady multi-month trends in the metrics tied to your goals, can name every link earned, and the next month’s plan visibly responds to this month’s results.' },
  ],
  cta: SEO_CTA,
},
];
