'use strict';
const D = '2026-09-03';
const SEO_CTA = { h3: 'Want this done for your site, not just explained?', p: 'Book a free strategy call. We look at your real search data together and tell you honestly where the leverage is &mdash; and what we would leave alone.' };
module.exports = [
// ------------------------------------------------------------------ 14. On-page vs off-page
{
  slug: 'on-page-vs-off-page-seo', cat: 'seo', date: D,
  title: 'On-Page SEO vs. Off-Page SEO: What Each Covers and Which Matters More | TechAuditPros',
  desc: 'On-page SEO is everything you control on your own pages (content, titles, headings, internal links, images). Off-page SEO is everything that happens elsewhere (links, mentions, reviews, listings). What each includes, how they interact, and where to start.',
  eyebrow: 'SEO Fundamentals',
  h1: 'On-Page SEO vs. Off-Page SEO: What Each Covers and Which Matters More',
  dek: 'One decides what you can rank for; the other decides how high. Here is exactly what belongs in each bucket, the checklist for both, and the order to work in.',
  lead: { img: 'team-huddle-reviewing-screen-daylight.jpg', alt: 'Team reviewing a web page together on a monitor', w: 605, h: 507 },
  takeaways: [
    '<strong>On-page SEO</strong> is everything on your own pages that you fully control: the content, titles, headings, internal links, images, URL and structured data. It determines <em>what</em> a page can rank for.',
    '<strong>Off-page SEO</strong> is everything that happens away from your site: links from other websites, brand mentions, reviews, local listings. It determines <em>how high</em> you rank among relevant pages.',
    'Work on-page first &mdash; it is faster, cheaper and entirely in your hands &mdash; then earn off-page signals with content worth citing. Neither replaces technical SEO, which decides whether you are in the race at all.',
  ],
  intro: '<strong>On-page SEO</strong> covers every ranking factor that lives on your own web pages and that you control directly &mdash; the content, the title tag, the headings, the internal links, the images and their alt text, the URL, the structured data. <strong>Off-page SEO</strong> covers every factor that lives elsewhere and that you can only influence &mdash; links from other sites, mentions of your brand, reviews, directory listings and social signals. The simplest way to hold the difference: on-page tells search engines what your page is about; off-page tells them whether to believe you.',
  sections: [
    { h2: 'On-Page SEO: What It Includes', html: `
<ul>
<li><strong>The content itself.</strong> Does the page fully answer the question the searcher typed? Depth, accuracy, specifics, and an answer stated plainly near the top &mdash; that last part is what AI answer engines lift.</li>
<li><strong>Title tag.</strong> The clickable headline in search results, roughly 50&ndash;60 characters, containing the primary term and a reason to click. (Full guide: <a href="/blog/title-tags-and-meta-descriptions.html">title tags and meta descriptions</a>.)</li>
<li><strong>Meta description.</strong> Not a ranking factor, but it decides whether people click &mdash; which is.</li>
<li><strong>Headings (H1, H2, H3).</strong> One H1 that says what the page is; H2s that map the sections so both readers and machines can scan.</li>
<li><strong>Keyword usage.</strong> The primary term and its natural variations in the title, H1, opening paragraph and a few headings &mdash; used the way a person would write, never stuffed.</li>
<li><strong>Internal links.</strong> Links from this page to related pages and from related pages to this one, with descriptive anchor text. This is how you tell Google which pages matter most.</li>
<li><strong>Images.</strong> Compressed, correctly sized, with alt text that describes the image (and, where honest, the topic).</li>
<li><strong>URL.</strong> Short, readable, containing the topic: /blog/on-page-vs-off-page-seo, not /p?id=4821.</li>
<li><strong>Structured data.</strong> Schema markup (Article, FAQPage, Product, LocalBusiness) that labels the page for machines.</li>
<li><strong>Page experience.</strong> Speed and layout stability overlap with technical SEO, but the choices that cause slowness &mdash; huge images, embedded videos, pop-ups &mdash; are made on the page.</li>
</ul>` },
    { h2: 'Off-Page SEO: What It Includes', html: `
<ul>
<li><strong>Backlinks.</strong> Links from other websites to yours, weighted by the relevance and authority of the linking site. Still the strongest off-page signal. (Deep dive: <a href="/blog/what-are-backlinks.html">what backlinks are and how to earn them</a>.)</li>
<li><strong>Brand mentions.</strong> Your company named in articles, podcasts, forums and directories even without a link. Increasingly important for AI engines deciding which brands to recommend.</li>
<li><strong>Reviews.</strong> Google reviews above all for local businesses, plus industry platforms. Volume, recency and how you respond all matter.</li>
<li><strong>Local listings and citations.</strong> Google Business Profile, Apple Business Connect, Bing Places and the directories relevant to your industry, with name, address and phone identical everywhere.</li>
<li><strong>Digital PR.</strong> Original data, expert commentary and stories that earn coverage &mdash; the legitimate way to get links from publications.</li>
<li><strong>Social and community signals.</strong> Not direct ranking factors, but they drive the discovery that produces links and mentions.</li>
</ul>
<div class="article-callout">What off-page SEO is <em>not</em>: buying links, link exchanges, private blog networks, or paying for "guest posts" on sites that exist only to sell them. All of it violates Google’s spam policies, and penalties can take months to recover from.</div>`,
      figure: { img: 'istock-1404269031-digital-handshake-lowpoly-neon.jpg', alt: 'Digital handshake representing links and mentions between websites', w: 612, h: 349, cap: 'Off-page SEO is other sites vouching for you. It cannot be bought without consequences.' } },
    { h2: 'On-Page vs. Off-Page: Side by Side', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>On-page SEO</th><th>Off-page SEO</th></tr>
<tr><th>Where it happens</th><td>Your own pages</td><td>Other websites and platforms</td></tr>
<tr><th>Control</th><td>Total &mdash; you can change it today</td><td>Indirect &mdash; you earn it, others grant it</td></tr>
<tr><th>Decides</th><td><em>What</em> you can rank for (relevance)</td><td><em>How high</em> you rank (trust and authority)</td></tr>
<tr><th>Speed of impact</th><td>Weeks</td><td>Months</td></tr>
<tr><th>Cost pattern</th><td>Writing and editing time</td><td>Content worth citing, outreach, PR, reputation</td></tr>
<tr><th>Main risk</th><td>Thin or duplicated content, keyword stuffing</td><td>Buying links and getting penalized</td></tr>
<tr><th>Who does it</th><td>Writers, strategists, engineers for schema</td><td>Marketing, PR, the business (reviews)</td></tr>
</table></div>` },
    { h2: 'Which Matters More?', html: `
<p>Both, in sequence. A page with weak content will not rank for a competitive term no matter how many links point to it &mdash; Google has to know what the page is about before authority can help. A brilliant page on a site nobody links to will rank for low-competition terms and stall below stronger domains for competitive ones.</p>
<p>For most small and mid-size businesses the practical order is: technical foundation first (see <a href="/blog/what-is-technical-seo.html">technical SEO</a>), then on-page &mdash; because it is fast, cheap and fully in your control &mdash; then off-page, earned with the content you just improved. Local businesses are the exception where an off-page element, the Google Business Profile, deserves attention from day one.</p>`,
      figure: { img: 'team-flatlay-reviewing-business-report-charts.jpg', alt: 'Reviewing ranking and traffic charts after on-page changes', w: 739, h: 415, cap: 'On-page moves rankings in weeks; off-page compounds over months. Do them in that order.' } },
    { h2: 'A Combined Checklist', html: `
<div class="article-checklist">
<h3>On-page, for each important page</h3>
<ol>
<li>One clear target question or term, and the answer stated in the first paragraph.</li>
<li>Title tag with the term and a reason to click; unique across the site.</li>
<li>One H1; H2s that map the sections; no skipped heading levels.</li>
<li>Content deeper and more specific than what currently ranks.</li>
<li>Descriptive internal links in and out.</li>
<li>Compressed images with real alt text.</li>
<li>Clean URL; structured data appropriate to the page type.</li>
</ol>
<h3>Off-page, for the site</h3>
<ol>
<li>Google Business Profile complete, categories right, photos current, reviews requested consistently.</li>
<li>Name, address and phone identical across every listing.</li>
<li>Two or three pieces of genuinely citable content a year: original data, a definitive guide, a tool.</li>
<li>Outreach to publications and partners that would plausibly reference that content.</li>
<li>Monitor new links and mentions monthly; disavow only genuinely toxic ones.</li>
</ol>
</div>
<p>Both halves run inside our <a href="/us/seo-services/">US SEO service</a> and <a href="/ca/seo-services/">Canadian SEO service</a> &mdash; on-page by the same team that fixes the technical side, off-page without ever buying a link.</p>` },
  ],
  faqs: [
    { q: 'Is technical SEO part of on-page SEO?', a: 'They overlap but are usually treated separately. On-page SEO is the content and markup of individual pages; technical SEO is site-wide infrastructure &mdash; crawlability, indexation, speed, security. Page speed sits on the boundary: caused on the page, fixed by engineers.' },
    { q: 'What is an example of off-page SEO?', a: 'A local newspaper writing about your business and linking to your site; a customer leaving a Google review; an industry directory listing your company with the correct address; a podcast mentioning your brand by name.' },
    { q: 'Can you rank with on-page SEO alone?', a: 'For low-competition and long-tail searches, often yes &mdash; a page that answers the question best can rank with little external authority. For competitive commercial terms, off-page authority is usually what separates the first page from the third.' },
    { q: 'How long does on-page SEO take to show results?', a: 'Changes to existing indexed pages are typically re-crawled within days and can move rankings within two to six weeks. New pages take longer to earn a stable position, especially on newer sites.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 15. Backlinks
{
  slug: 'what-are-backlinks', cat: 'seo', date: D,
  title: 'What Are Backlinks? How They Work and How to Earn Them Without Getting Penalized | TechAuditPros',
  desc: 'A backlink is a link from another website to yours. Why they still matter, what makes one valuable, the 9 ways to earn them legitimately, the tactics that get sites penalized, and how to check your own backlink profile.',
  eyebrow: 'SEO Fundamentals',
  h1: 'What Are Backlinks? How They Work and How to Earn Them Without Getting Penalized',
  dek: 'Backlinks are the web’s votes of confidence, and still one of the strongest ranking signals. Here is what makes one valuable, how to earn them honestly, and the shortcuts that end in a penalty.',
  lead: { img: 'istock-1404269031-digital-handshake-lowpoly-neon.jpg', alt: 'Digital handshake symbolizing one website linking to another', w: 612, h: 349 },
  takeaways: [
    'A <strong>backlink</strong> is a hyperlink from a page on another website to a page on yours. Search engines treat it as a citation: a signal that the linked page is worth referencing.',
    'Quality beats quantity by a wide margin: one relevant link from a respected site in your industry outweighs hundreds from directories and comment sections.',
    'Links are earned with content worth citing and relationships worth having. Buying them is the fastest route to a penalty that can take months to undo.',
  ],
  intro: 'A <strong>backlink</strong> (also called an inbound link or incoming link) is a hyperlink on someone else’s website that points to a page on yours. Search engines read backlinks the way academics read citations: if respected, relevant sites reference your page, it is probably worth ranking. Backlinks remain one of the strongest off-page ranking factors in 2026 and a growing input into which brands AI answer engines choose to mention &mdash; which is exactly why the market for buying them exists, and why buying them is a mistake.',
  sections: [
    { h2: 'How Backlinks Affect Rankings', html: `
<p>Google’s original insight was that a link is a vote, and votes from important pages count more. The modern version is more nuanced but the core holds: links pass <em>authority</em> (how trusted the linking site is), <em>relevance</em> (how related its topic is to yours) and <em>context</em> (the words around the link and the anchor text itself). A page with strong content and no links can rank for easy terms; for competitive commercial terms, the page with better links usually wins.</p>
<p>Two attributes change how a link is counted:</p>
<ul>
<li><strong>Followed links</strong> (the default) pass authority.</li>
<li><strong>Links marked <code>rel="nofollow"</code>, <code>rel="sponsored"</code> or <code>rel="ugc"</code></strong> tell Google not to treat them as endorsements. They still bring visitors and brand awareness; they just do not "vote."</li>
</ul>` },
    { h2: 'What Makes a Backlink Valuable', html: `
<div class="article-table-wrap"><table>
<tr><th>Factor</th><th>More valuable</th><th>Less valuable</th></tr>
<tr><th>Authority of the linking site</th><td>Established publications, universities, industry bodies, respected companies</td><td>New sites, link farms, sites that link to anyone</td></tr>
<tr><th>Topical relevance</th><td>A manufacturing trade publication linking to your manufacturing ERP guide</td><td>A recipe blog linking to the same guide</td></tr>
<tr><th>Placement</th><td>Inside the main body of an article, in context</td><td>Footer, sidebar, author bio, comment section</td></tr>
<tr><th>Anchor text</th><td>Descriptive and natural ("their guide to ERP implementation")</td><td>Exact-match keyword stuffing repeated across many links</td></tr>
<tr><th>Uniqueness</th><td>The first link from a new domain</td><td>The 50th link from the same domain</td></tr>
<tr><th>Editorial intent</th><td>Someone chose to cite you</td><td>You paid, traded or placed it yourself</td></tr>
</table></div>`,
      figure: { img: 'istock-1128252197-analyst-data-wall-pencil-thinking.jpg', alt: 'Analyst evaluating a backlink profile on a data wall', w: 612, h: 344, cap: 'One relevant, editorial link from a respected site outweighs hundreds of directory entries.' } },
    { h2: 'Nine Ways to Earn Backlinks Legitimately', html: `
<div class="article-checklist">
<h3>Ranked roughly by return on effort for a small or mid-size business</h3>
<ol>
<li><strong>Publish something citable.</strong> Original data from your own operations, a genuinely definitive guide, a free calculator or template. Links follow content people <em>need</em> to reference.</li>
<li><strong>Digital PR.</strong> Offer journalists and trade publications expert commentary, data or a story. One placement in a respected outlet can outweigh a year of small links.</li>
<li><strong>Partners, suppliers and customers.</strong> The companies you already work with often have a "partners" or "case studies" page. Ask.</li>
<li><strong>Industry associations and chambers.</strong> Membership directories are relevant, legitimate and usually followed.</li>
<li><strong>Unlinked brand mentions.</strong> Find places that already name your company without linking and ask for the link. High success rate.</li>
<li><strong>Broken-link replacement.</strong> Find dead links on relevant sites pointing to content you have an equivalent of, and offer yours.</li>
<li><strong>Guest contributions to real publications.</strong> Written for their readers, not for the link, on sites that do not sell placements.</li>
<li><strong>Local sponsorships and events.</strong> Teams, charities and events you genuinely support usually list sponsors.</li>
<li><strong>Be quotable.</strong> Answer journalist queries, appear on podcasts, speak at events. Mentions turn into links and into AI-engine recognition.</li>
</ol>
</div>` },
    { h2: 'What Gets Sites Penalized', html: `
<ul>
<li><strong>Buying links</strong> that pass authority, including "sponsored posts" without the sponsored attribute.</li>
<li><strong>Private blog networks</strong> &mdash; groups of sites built only to link to each other and to paying customers.</li>
<li><strong>Link exchanges at scale</strong> ("link to me and I’ll link to you").</li>
<li><strong>Automated link building</strong> &mdash; comment spam, forum profiles, bookmark sites.</li>
<li><strong>Exact-match anchor text</strong> repeated across many low-quality sites, a pattern Google recognizes instantly.</li>
</ul>
<p>Google’s systems now largely ignore spammy links rather than punishing them, but manual actions still happen, and a site caught in a paid-link scheme can lose rankings for months. The cheap link that "worked" for a competitor is usually the one that will not work next year. TechAuditPros does not buy links for clients under any label &mdash; it is written into how our <a href="/us/seo-services/">US SEO service</a> and <a href="/ca/seo-services/">Canadian SEO service</a> operate.</p>`,
      figure: { img: 'istock-1164885329-developer-afro-night-code-overlays.jpg', alt: 'Engineer reviewing link data with code overlays on screen', w: 612, h: 390, cap: 'Algorithms recognize paid-link patterns faster than sellers can invent new ones.' } },
    { h2: 'How to Check Your Backlinks', html: `
<p>Google Search Console (Links report) shows the sites linking to you for free. Commercial tools add competitor comparison, authority estimates and alerts for new and lost links. Look monthly for: new referring domains (growth), lost links (a page moved or a site closed &mdash; sometimes recoverable), and anything that looks like spam pointing at you. Disavow only genuinely toxic patterns; random low-quality links are ignored anyway and disavowing them is wasted effort.</p>
<p>Backlinks are the off-page half of the picture; the on-page half is covered in <a href="/blog/on-page-vs-off-page-seo.html">on-page vs. off-page SEO</a>.</p>` },
  ],
  faqs: [
    { q: 'How many backlinks do I need to rank?', a: 'There is no number. It depends on the competition for the specific term: the pages already ranking set the bar. Check how many referring domains the top results have and aim to match them with better, more relevant links &mdash; quality closes the gap faster than volume.' },
    { q: 'Do nofollow links help SEO?', a: 'Not directly as ranking votes, but they bring visitors, brand awareness and sometimes the followed links that result. A natural backlink profile always includes some nofollow links.' },
    { q: 'Are internal links backlinks?', a: 'No. Backlinks come from other websites. Internal links are links between pages on your own site; they matter for SEO too, but as part of on-page and technical work rather than authority.' },
    { q: 'How long does it take for backlinks to affect rankings?', a: 'Google needs to discover and re-evaluate the linking page, so weeks is typical, and the effect builds as more relevant links accumulate. Expect months, not days, for a measurable change on competitive terms.' },
    { q: 'Is buying backlinks ever safe?', a: 'No. Paid links that pass authority violate Google’s spam policies. Paid placements are legitimate only when marked with rel="sponsored", which means they do not count as ranking votes anyway.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 16. Keyword research
{
  slug: 'keyword-research-guide', cat: 'seo', date: D,
  title: 'How to Do Keyword Research: Choosing SEO Keywords That Bring Customers | TechAuditPros',
  desc: 'Keyword research is finding the words and questions your customers actually search, measuring demand and difficulty, and mapping them to pages. The 6-step process, how to read volume and intent, and a worked example.',
  eyebrow: 'SEO Fundamentals',
  h1: 'How to Do Keyword Research: Choosing SEO Keywords That Bring Customers, Not Just Traffic',
  dek: 'Keyword research is the step that decides whether your content brings buyers or browsers. Here is the process we run for every client, how to read the numbers, and a real worked example.',
  lead: { img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Reviewing keyword demand charts on a tablet', w: 612, h: 402 },
  takeaways: [
    '<strong>Keyword research</strong> is finding the words and questions your customers type into Google (and ask AI), measuring how many people use them and how hard they are to rank for, and deciding which page should win each one.',
    'Intent beats volume. A term searched 500 times a month by people ready to hire beats one searched 50,000 times by students writing essays.',
    'The output is a map &mdash; one primary term and its cluster of variations per page &mdash; not a list. Two pages chasing the same term compete with each other.',
  ],
  intro: '<strong>Keyword research</strong> is the process of discovering the exact words and questions your potential customers use when they search, measuring how much demand each one has and how hard it will be to rank for, and then assigning each worthwhile term to the page that should answer it. It is the foundation of on-page SEO and content strategy alike: without it you are guessing what people search for, and businesses guess wrong far more often than they expect &mdash; usually by using their own vocabulary instead of their customers’.',
  sections: [
    { h2: 'The Four Numbers That Matter', html: `
<div class="article-table-wrap"><table>
<tr><th>Metric</th><th>What it tells you</th><th>How to use it</th></tr>
<tr><th>Search volume</th><td>Average monthly searches for the exact term in a country</td><td>Prioritize, but do not worship &mdash; volume includes people who will never buy</td></tr>
<tr><th>Intent</th><td>Why someone searches: to learn (informational), to compare (commercial), to buy or act (transactional), to reach a specific site (navigational)</td><td>Match the page type: guides for learning, service and comparison pages for commercial and transactional</td></tr>
<tr><th>Difficulty</th><td>How strong the pages already ranking are (usually a 0&ndash;100 score based on their backlinks)</td><td>Newer or smaller sites should start where difficulty is lower and climb</td></tr>
<tr><th>Cost per click (CPC)</th><td>What advertisers pay for a click on the term</td><td>A proxy for commercial value: high CPC means the click is worth money to someone</td></tr>
</table></div>
<p>A term with modest volume, commercial intent, moderate difficulty and a high CPC is usually worth more to a business than a giant informational term. This is the single most common mistake in DIY keyword research: chasing the big number.</p>` },
    { h2: 'The 6-Step Keyword Research Process', html: `
<div class="article-checklist">
<h3>From seed terms to a page map</h3>
<ol>
<li><strong>List seed terms.</strong> Your services, products and the problems they solve, in the words customers use on calls and in emails &mdash; not your internal jargon.</li>
<li><strong>Expand.</strong> Put each seed into a keyword tool and Google itself (autocomplete, "People also ask," related searches) and collect every variation and question. Expect hundreds per seed.</li>
<li><strong>Get the numbers.</strong> Volume, intent, difficulty and CPC for your target country. Export everything &mdash; you will filter later.</li>
<li><strong>Filter for fit.</strong> Remove terms you cannot honestly serve (wrong product, wrong geography, job-seekers, students). Keep a short list of commercial terms and a longer list of questions.</li>
<li><strong>Cluster.</strong> Group terms that mean the same thing &mdash; "custom ERP development," "custom ERP software development company," "bespoke ERP" &mdash; into one cluster with one primary term. One cluster, one page.</li>
<li><strong>Map to pages.</strong> Commercial clusters go to service pages; question clusters go to blog posts that link back to the service page. Note which clusters have no page yet &mdash; that is your content plan.</li>
</ol>
</div>`,
      figure: { img: 'team-flatlay-reviewing-business-report-charts.jpg', alt: 'Team sorting keyword clusters and volumes on printed charts', w: 739, h: 415, cap: 'The output is a map: one cluster, one primary term, one page. Lists are where keyword research goes to die.' } },
    { h2: 'A Worked Example From Our Own Research', html: `
<p>When we planned the US pages on this site, we exported roughly 125,000 keyword rows across ERP, SEO and web development. The raw list was dominated by terms like "erp" (74,000 searches a month) and "web development" (1.5 million) &mdash; huge, informational and impossible to win. Filtering for intent and fit changed the picture completely:</p>
<ul>
<li><strong>"seo service"</strong> &mdash; 12,100 searches, commercial intent, difficulty 34, CPC around US$14. A buyer’s term with a realistic difficulty: it became the primary target for our <a href="/us/seo-services/">US SEO services page</a>.</li>
<li><strong>"custom web development"</strong> &mdash; 3,600 searches, difficulty 23. Small but precisely our buyer: mapped to the <a href="/us/website-development/">website development page</a>.</li>
<li><strong>"what does erp stand for"</strong> &mdash; 8,100 searches, purely informational. Not a service-page term; it strengthened an existing explainer instead of getting its own page.</li>
<li><strong>"how to make a website mobile friendly"</strong> &mdash; 33,100 searches, difficulty 50, informational. Worth a dedicated guide because the people asking it own websites that are not mobile-friendly, which is a problem we solve.</li>
</ul>
<p>Notice the pattern: the winners were rarely the biggest numbers. They were the terms where the searcher’s problem and our service were the same thing.</p>` },
    { h2: 'Long-Tail Keywords and Questions', html: `
<p>Long-tail keywords are longer, more specific phrases with lower volume each &mdash; "erp for small manufacturing business" instead of "erp." Individually small, collectively they usually outnumber the head terms, they are far easier to rank for, and the intent is clearer. Question phrasings ("how much does an erp system cost") are the most valuable long tail of all in 2026, because they are exactly what people type into AI assistants and what AI Overviews answer. Every question your customers ask deserves a page or a section that answers it directly.</p>` },
    { h2: 'Keyword Research for AI Search', html: `
<p>Traditional tools measure Google queries; people ask AI engines in longer, more conversational sentences. The fix is not a new tool but a different reading of the data: treat every question cluster as a prompt, answer it in the first paragraph of the page, structure the rest so a machine can quote it, and add FAQ schema. Then test the questions yourself in ChatGPT, Perplexity and Google’s AI Mode and record who gets cited &mdash; that is your AI-visibility baseline.</p>`,
      figure: { img: 'istock-2148073937-ai-wireframe-head-particles.jpg', alt: 'Visualization of an AI system processing questions', w: 612, h: 323, cap: 'Question clusters are prompts. Answer them plainly, and the citations follow.' } },
    { h2: 'Common Keyword Research Mistakes', html: `
<ul>
<li><strong>Using your own vocabulary.</strong> You sell "enterprise resource planning solutions"; customers search "inventory software for small business."</li>
<li><strong>Chasing volume.</strong> The biggest terms are informational and dominated by giants.</li>
<li><strong>One keyword per page, literally.</strong> Pages rank for dozens of variations; target the cluster, not a single string.</li>
<li><strong>Two pages, one term.</strong> They cannibalize each other; merge them.</li>
<li><strong>Doing it once.</strong> Search behavior shifts; re-run the research yearly and whenever you add a service.</li>
</ul>
<p>Keyword research is step two of every engagement we run &mdash; after the audit and before a word is written. It feeds the <a href="/blog/what-is-a-content-strategy.html">content strategy</a> and the on-page work described in <a href="/blog/on-page-vs-off-page-seo.html">on-page vs. off-page SEO</a>.</p>` },
  ],
  faqs: [
    { q: 'What are SEO keywords?', a: 'The words and phrases people type into search engines that you want your pages to appear for. In practice each page targets a cluster of related terms &mdash; a primary keyword plus its natural variations and questions &mdash; rather than a single string.' },
    { q: 'What is a good keyword to target?', a: 'One your customers actually use, with intent that matches what the page offers, difficulty your site can realistically beat, and enough volume to matter. For a business, a modest-volume commercial term usually beats a high-volume informational one.' },
    { q: 'How many keywords should a page target?', a: 'One primary term and its cluster of variations &mdash; often 10&ndash;30 closely related phrases and questions. Trying to target unrelated terms on one page dilutes it; use separate pages for separate topics.' },
    { q: 'Are free keyword research tools good enough?', a: 'For a start, yes: Google autocomplete, "People also ask," Google Trends and Search Console reveal a lot. Paid tools add reliable volume, difficulty and CPC data at scale, which matters once you are planning more than a handful of pages.' },
    { q: 'How often should keyword research be redone?', a: 'Review it yearly, whenever you add a service or enter a new market, and after major shifts in search behavior &mdash; the growth of AI answer engines is one such shift, favoring question-style research.' },
  ],
  cta: SEO_CTA,
},
// ------------------------------------------------------------------ 17. SEO content writing
{
  slug: 'seo-content-writing', cat: 'seo', date: D,
  title: 'SEO Content Writing: How to Write Content That Ranks and Gets Cited by AI | TechAuditPros',
  desc: 'SEO content writing is writing that answers a real search question thoroughly and is structured so search engines and AI answer engines can understand and quote it. The process, the structure that gets cited, and what to avoid.',
  eyebrow: 'SEO & Content',
  h1: 'SEO Content Writing: How to Write Content That Ranks and Gets Cited by AI',
  dek: 'SEO writing is not stuffing keywords into paragraphs. It is answering the searcher’s question better than anyone else, in a structure machines can read. Here is the process and the anatomy of a page that ranks.',
  lead: { img: 'female-developer-red-hair-dual-monitors-code.jpg', alt: 'Writer drafting a long-form article across two monitors', w: 2400, h: 1601 },
  takeaways: [
    '<strong>SEO content writing</strong> is writing that fully answers a real search question and is structured so both readers and machines can extract the answer: clear title, answer-first opening, scannable headings, specifics.',
    'In 2026 the bar is "would an AI engine quote this?" &mdash; which means a direct answer in the first paragraph, defined terms, numbered steps, comparison tables and FAQs.',
    'Keyword stuffing, generic filler and articles that restate what everyone else says are now actively harmful. Specific experience and honest trade-offs are what rank and get cited.',
  ],
  intro: '<strong>SEO content writing</strong> is the craft of writing web content that answers a specific question people search for &mdash; completely, accurately and more usefully than the pages already ranking &mdash; and structuring it so search engines and AI answer engines can understand what it is about and lift the answer from it. It is not a separate kind of writing with its own tricks. It is good writing for a reader who arrived with a question, plus a handful of structural habits that make the page legible to machines.',
  sections: [
    { h2: 'What Search Engines and AI Actually Reward', html: `
<p>Google’s guidance and the behavior of AI answer engines point the same way: they reward content that demonstrates experience, expertise, authority and trust, answers the query directly, and is easy to parse. In practice, pages that rank and get cited share five traits:</p>
<ul>
<li><strong>They answer the question in the first paragraph</strong>, then elaborate &mdash; the "answer-first" pattern you can see on every page of this site.</li>
<li><strong>They are specific.</strong> Real numbers, real steps, real trade-offs, named tools, worked examples. Vague content is what AI now summarizes away.</li>
<li><strong>They are structured.</strong> One H1, descriptive H2s and H3s, lists for steps, tables for comparisons, an FAQ for the follow-up questions.</li>
<li><strong>They are complete.</strong> They cover the sub-questions a searcher would ask next, so the reader does not need to go elsewhere.</li>
<li><strong>They are honest.</strong> They say when something is not worth doing, when a competitor’s approach is fine, when the answer is "it depends" and on what.</li>
</ul>` },
    { h2: 'The SEO Content Writing Process', html: `
<div class="article-checklist">
<h3>Six steps, in order</h3>
<ol>
<li><strong>Start from one keyword cluster.</strong> One primary question and its variations, from your <a href="/blog/keyword-research-guide.html">keyword research</a>. If you cannot state the question in one sentence, the page is not ready.</li>
<li><strong>Read what already ranks &mdash; and what AI already says.</strong> Note what the top pages cover, what they miss, what they get wrong, and what ChatGPT or Google’s AI Overview currently answers. Your page must be more complete and more specific, not a rewrite.</li>
<li><strong>Outline with headings first.</strong> H2s that mirror the sub-questions a reader will have, in the order they will have them. This is the page’s table of contents and its machine-readable structure.</li>
<li><strong>Write the answer paragraph first.</strong> Two to four sentences that fully answer the primary question. If a reader stopped there, they should have the answer.</li>
<li><strong>Write the body with specifics.</strong> Numbers, steps, examples, trade-offs. Add a comparison table where a reader would compare, a numbered list where they would follow steps, a callout for the counterintuitive point.</li>
<li><strong>Finish the machine layer.</strong> Title tag and meta description (<a href="/blog/title-tags-and-meta-descriptions.html">guide</a>), image alt text, internal links to and from related pages, FAQ section with matching FAQ schema, and a human review for accuracy.</li>
</ol>
</div>`,
      figure: { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Outlining an article structure on paper before writing', w: 720, h: 419, cap: 'Headings first. The outline is the page’s structure for readers and its schema for machines.' } },
    { h2: 'Anatomy of a Page That Ranks and Gets Cited', html: `
<div class="article-table-wrap"><table>
<tr><th>Element</th><th>What it does</th><th>Guideline</th></tr>
<tr><th>Title tag</th><td>Earns the click in search results</td><td>Primary term + a reason to click, roughly 50&ndash;60 characters</td></tr>
<tr><th>H1</th><td>States what the page is</td><td>One per page; can be longer and more natural than the title tag</td></tr>
<tr><th>Opening paragraph</th><td>The answer, for readers and AI engines</td><td>Define the term or answer the question in 2&ndash;4 sentences; bold the key term</td></tr>
<tr><th>Key takeaways box</th><td>Quotable summary</td><td>Three bullets a reader could repeat to a colleague</td></tr>
<tr><th>H2 sections</th><td>Each sub-question, answered</td><td>Descriptive headings; 100&ndash;300 words each; one idea per section</td></tr>
<tr><th>Lists and tables</th><td>Structure machines and skimmers love</td><td>Steps as numbered lists; comparisons as tables</td></tr>
<tr><th>Figures</th><td>Break up text, illustrate</td><td>Relevant images with descriptive alt text and captions; compressed</td></tr>
<tr><th>Internal links</th><td>Connect the cluster</td><td>Link to the service page and related guides with descriptive anchors</td></tr>
<tr><th>FAQ</th><td>Catches follow-up searches and feeds AI answers</td><td>3&ndash;6 real questions, direct answers, matching FAQPage schema</td></tr>
<tr><th>Author</th><td>Trust signal</td><td>A real person with a role, not "admin"</td></tr>
</table></div>` },
    { h2: 'How Long Should SEO Content Be?', html: `
<p>As long as it takes to answer the question completely and no longer. A definition might need 600 words; a buyer’s guide might need 2,500. Length correlates with rankings only because complete answers tend to be longer than incomplete ones &mdash; padding a thin article to 2,000 words makes it worse, not better. Check what the top results cover, cover it more precisely, add what they missed, and stop.</p>` },
    { h2: 'Keywords: How to Use Them Without Stuffing', html: `
<p>Put the primary term in the title tag, the H1, the first paragraph and one or two H2s where it fits naturally. Use the variations from the cluster where a person would use them. Then stop thinking about it. Search engines understand synonyms and context; a page that repeats "custom ERP software development company" eleven times reads as spam to both algorithms and humans. If a sentence would embarrass you read aloud to a customer, rewrite it.</p>`,
      figure: { img: 'istock-1332827275-businessman-ai-robot-double-exposure.jpg', alt: 'Double exposure of a person and an AI figure, representing human review of AI-assisted drafts', w: 612, h: 408, cap: 'AI can draft; a named human has to check, add the specifics and take responsibility.' } },
    { h2: 'Using AI to Write SEO Content: The Honest Position', html: `
<p>AI tools are excellent at research summaries, outlines and first drafts, and terrible at the things that make content rank: your real numbers, your experience, your judgment about what to leave out. Publishing raw AI output produces exactly the generic, sourceless content search engines are demoting and AI engines summarize without citing. Our practice &mdash; and our recommendation &mdash; is AI for speed to a first draft, then an engineer or specialist who fact-checks, adds the specifics only your business knows, and signs it. That is how the content on this site is produced, including this page.</p>
<p>Content is the third step of the program described in our <a href="/us/seo-services/">US SEO service</a> and <a href="/ca/seo-services/">Canadian SEO service</a>, after the audit and the technical fixes &mdash; because the best article in the world cannot rank on a site Google cannot crawl.</p>` },
  ],
  faqs: [
    { q: 'What is SEO writing?', a: 'Writing web content that fully answers a specific search question and is structured so search engines and AI answer engines can understand and quote it &mdash; clear title, answer-first opening, descriptive headings, specifics, internal links and FAQ.' },
    { q: 'How do I write SEO content for beginners?', a: 'Pick one question your customers ask, read what already ranks, outline with headings that mirror the reader’s follow-up questions, write the direct answer first, fill each section with specifics, then add the title tag, meta description, alt text, internal links and an FAQ.' },
    { q: 'Does AI-generated content hurt SEO?', a: 'Unedited, generic AI content performs poorly because it lacks the specifics and experience that rank and get cited. AI used for research and drafting, followed by expert editing and fact-checking, performs like any other well-made content.' },
    { q: 'How many keywords should I use in an article?', a: 'One primary term in the title, H1, first paragraph and a heading or two, plus its natural variations where a person would use them. There is no target density; if it reads as repetitive, it is.' },
    { q: 'What is the ideal length for an SEO article?', a: 'Whatever fully answers the question. Definitions may need 600 words, buyer’s guides 2,000 or more. Match and exceed the completeness of the pages already ranking rather than a word count.' },
  ],
  cta: SEO_CTA,
},
];
