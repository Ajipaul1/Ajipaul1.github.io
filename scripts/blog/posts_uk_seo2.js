'use strict';
// UK blog wave 2, posts 5-8.
//
//   5 how many internal links per page seo 260/31 + are nofollow links good for seo 170/21 + what
//     are internal links 110/0 + how many internal links per page 110/36 + what is anchor text in
//     seo 110/37 + what are internal links and external links 90/0            (~850/mo winnable)
//   6 the AEO/GEO terminology cluster: what is generative engine optimization geo 70/0 + what is
//     geo generative engine optimization 70/0 + what is aeo vs seo 40/0 + what is answer engine
//     optimization aeo 30/0 + what is ai search optimization called 30/0 + ~210 more, ALL KD 0
//   7 what is enterprise seo 260/22 + how does enterprise seo differ from other seo 90/0 + how much
//     does enterprise seo cost 90/0 + what makes enterprise seo different 90/0 + 9 more (1,160/mo)
//   8 the AI how-to cluster: how to rank in ai overview 90/0 + how to optimize for ai search 70/0 +
//     how to measure ai search visibility 70/0 + how do i rank my website on chatgpt 40/0 + how to
//     appear in ai search results 40/0 + ~115 more, ALL KD 0
//
// The existing /blog/generative-engine-optimization-geo/ page is four headings of service
// boilerplate rather than an article, so this cluster was effectively uncovered. Flagged to the
// owner: that thin page and these two will compete unless it is rewritten or redirected.
const D = '2026-09-04';
const SEO_CTA = { h3: 'Want to know whether AI answers currently mention you at all?', p: 'Book a free strategy call. We check what the answer engines say about your business today, what they cite instead of you, and what would have to change &mdash; and the audit is yours either way.' };

module.exports = [
// ------------------------------------------------------------------ 5. Internal linking
{
  slug: 'internal-linking-and-nofollow', cat: 'seo', date: D,
  title: 'Internal Linking Done Properly: How Many, Anchor Text and Nofollow | TechAuditPros',
  desc: 'What internal links are, how many belong on a page, how to write anchor text, when nofollow helps and when it does nothing &mdash; and why internal linking is the cheapest ranking work you control.',
  eyebrow: 'Internal Linking',
  h1: 'Internal Linking Done Properly',
  dek: 'The only ranking signal you control completely, and the one most sites waste. There is no magic number of links &mdash; but there is a right way to decide.',
  lead: { img: 'seo3-signpost-arrows-forest.jpg', alt: 'A signpost of directional arrows, which is what an internal link actually is' },
  takeaways: [
    'An <strong>internal link</strong> points from one page of your site to another. An external link points off it. Internal links are the only ranking signal you control entirely.',
    'There is no correct number per page. The test is whether every link would genuinely help the reader &mdash; a page with eight useful links beats one with forty decorative ones.',
    'Anchor text should describe the destination in the words a person would search for. &ldquo;Click here&rdquo; wastes the signal completely.',
    '<strong>Nofollow</strong> on your own internal links achieves almost nothing useful. It is for links you do not vouch for &mdash; user-generated content, paid placements &mdash; not for shaping your own site.',
  ],
  intro: 'An <strong>internal link</strong> is a link from one page on your site to another; an external link points somewhere else entirely. Internal links do three jobs at once: they help people find the next thing, they let a crawler discover pages, and they pass a share of one page&rsquo;s earned authority to another. That last job is the only ranking signal you control completely &mdash; nobody has to agree to it, and it costs nothing but thought. Which makes it remarkable how often it is left to a template.',
  sections: [
    { h2: 'How Many Internal Links Per Page?', html: `
<p>There is no correct number, and any specific figure you are given is somebody&rsquo;s rule of thumb rather than a rule. What actually matters:</p>
<div class="article-table-wrap"><table>
<tr><th>Question</th><th>The useful answer</th></tr>
<tr><th>Is there a limit?</th><td>Not a hard one. Very old guidance suggested around a hundred; modern crawlers handle far more. Practical limits are about the reader, not the crawler</td></tr>
<tr><th>So how many?</th><td>As many as genuinely help. On a 1,500-word article that is usually five to fifteen in the body. On a hub page it can be dozens, because listing is the page&rsquo;s job</td></tr>
<tr><th>Can there be too many?</th><td>Yes, in two ways: each link passes a smaller share of authority, and a page dense with links reads like a directory and gets skimmed</td></tr>
<tr><th>What about the same link twice?</th><td>Pointless. The first instance is the one that counts, so vary the destination rather than repeating it</td></tr>
</table></div>
<div class="article-callout">The honest test, link by link: would a reader who followed this actually be better off? If not, it is not an internal link, it is furniture.</div>` },
    { h2: 'Anchor Text: The Part That Is Usually Wasted', html: `
<p>Anchor text is the clickable words. It tells both the reader and the search engine what is at the other end, which makes it a free description of the destination page &mdash; and most sites throw it away.</p>
<ul>
<li><strong>Describe the destination, in searchable words.</strong> &ldquo;Custom ERP for UK businesses&rdquo; tells everyone what is there. &ldquo;Click here&rdquo; and &ldquo;read more&rdquo; tell them nothing.</li>
<li><strong>Vary it naturally.</strong> The same exact phrase on forty links looks manufactured. Write it as the sentence needs it.</li>
<li><strong>Keep it honest.</strong> Anchor text that oversells the destination produces a bounce, which helps nobody.</li>
<li><strong>Front-load the meaning.</strong> Long anchors dilute; three to six meaningful words is usually plenty.</li>
<li><strong>Do not link images without alt text.</strong> An image link with no alt text is an anchor with nothing in it.</li>
</ul>`,
      band: { img: 'seo3-pole-of-street-signs.jpg', alt: 'A pole carrying a stack of street signs', cap: 'Anchor text is a free description of the destination. Most sites write &ldquo;click here&rdquo;.' } },
    { h2: 'Nofollow: What It Is Actually For', html: `
<p>A <code>rel="nofollow"</code> attribute tells search engines you do not want to vouch for the link. It exists for links you cannot stand behind &mdash; and that is not the same thing as links you want to de-emphasise.</p>
<div class="article-table-wrap"><table>
<tr><th>Situation</th><th>Nofollow?</th><th>Why</th></tr>
<tr><th>A comment or forum link from a user</th><td>Yes</td><td>You did not choose it and cannot vouch for it</td></tr>
<tr><th>A paid or sponsored placement</th><td>Yes &mdash; and mark it sponsored</td><td>Not disclosing paid links is the actual risk</td></tr>
<tr><th>An affiliate link</th><td>Yes</td><td>Same reason: it is a commercial relationship</td></tr>
<tr><th>Your own login, cart or admin page</th><td>No &mdash; noindex or block it instead</td><td>Nofollow is the wrong tool; you do not want it indexed at all</td></tr>
<tr><th>Your own internal links, to &ldquo;save&rdquo; authority</th><td>No</td><td>This is the myth. It does not concentrate authority anywhere useful; it just discards a signal</td></tr>
<tr><th>A source you are citing honestly</th><td>No</td><td>Citing real sources is good practice, and linking to them is part of it</td></tr>
</table></div>
<p>So: are nofollow links good for SEO? For links you did not choose or were paid for, yes &mdash; they are the correct and honest markup. As a tool for shaping your own site&rsquo;s internal structure, no. That approach was never as effective as claimed and is not worth doing now.</p>` },
    { h2: 'A Simple Internal Linking Routine', html: `
<p>Five steps, repeatable, and it takes an hour a month on a normal site.</p>
<ul>
<li><strong>Find your strongest pages.</strong> In Search Console, the pages with the most impressions. These have authority to share.</li>
<li><strong>Find your orphans.</strong> Pages nothing links to. They are invisible to readers and nearly invisible to crawlers.</li>
<li><strong>Link down, deliberately.</strong> From each strong page, add links to the pages you actually want to rank &mdash; where the sentence genuinely calls for it.</li>
<li><strong>Link up from new pages.</strong> Every new article should link to the service page it supports. That is how a blog earns its keep commercially.</li>
<li><strong>Check the anchor text you used.</strong> If any of it says &ldquo;here&rdquo; or &ldquo;this page&rdquo;, rewrite it to name the destination.</li>
</ul>
<p>Done consistently, this is the cheapest ranking work available, and it compounds with every page you add. It also helps AI answers understand which of your pages is authoritative on what &mdash; see <a href="/blog/aeo-and-geo-explained.html">AEO and GEO explained</a>. For the wider picture, <a href="/blog/what-is-technical-seo.html">technical SEO</a> covers where linking sits among the rest.</p>`,
      figures: [
        { img: 'seo3-wooden-sign-two-directions.jpg', alt: 'A wooden sign pointing in two directions', cap: 'Link down from your strongest pages.' },
        { img: 'seo3-two-signs-opposite-directions.jpg', alt: 'Two signs pointing in opposite directions', cap: 'And up from every new page to the service it supports.' },
      ] },
  ],
  faqs: [
    { q: 'What are internal links?', a: 'Links from one page on your site to another page on the same site. They help readers find the next thing, let crawlers discover pages, and pass a share of a page&rsquo;s earned authority onward. External links point off your site instead.' },
    { q: 'How many internal links should a page have?', a: 'There is no correct number. On a 1,500-word article, five to fifteen in the body is typical; a hub page can carry dozens because listing is its job. The test is per link: would a reader who followed it be better off? Very old advice about a hundred links per page is no longer a meaningful limit.' },
    { q: 'What is anchor text in SEO?', a: 'The clickable words in a link. It describes the destination to both readers and search engines, which makes it a free summary of the page you are pointing at. Use three to six meaningful words that name the destination; "click here" and "read more" waste the signal entirely.' },
    { q: 'Are nofollow links good for SEO?', a: 'For links you did not choose or were paid for &mdash; user comments, sponsored placements, affiliate links &mdash; yes, nofollow is the correct and honest markup. As a way to shape your own site&rsquo;s internal authority it does not work and simply discards a signal you control.' },
    { q: 'What is the difference between internal and external links?', a: 'Internal links point to another page on your own site; external links point to a different site. Internal links are the only link signal you fully control. Linking out to real sources is good practice, not a leak &mdash; and should not be nofollowed when you genuinely stand behind the source.' },
  ],
  cta: SEO_CTA,
},

// ------------------------------------------------------------------ 6. AEO and GEO explained
{
  slug: 'aeo-and-geo-explained', cat: 'seo', date: D,
  title: 'AEO and GEO Explained: Answer and Generative Engine Optimisation | TechAuditPros',
  desc: 'What AEO and GEO actually mean, how they differ from SEO, why there are three names for roughly one job, and what genuinely changes about the work when the first answer a buyer sees is generated.',
  eyebrow: 'AEO &amp; GEO',
  h1: 'AEO and GEO Explained &mdash; and How They Differ From SEO',
  dek: 'Three acronyms, one underlying shift: the first thing a buyer sees is increasingly a generated answer that cites a handful of sources. The work is to be one of them.',
  lead: { img: 'seo3-ask-anything-prompt.jpg', alt: 'An interface offering to answer anything, which is where a growing share of searches now start' },
  takeaways: [
    '<strong>AEO</strong> (answer engine optimisation) is about being the source an answer draws on. <strong>GEO</strong> (generative engine optimisation) is the same idea named for generative models. Vendors use both, plus &ldquo;AI SEO&rdquo;, for roughly one job.',
    'It is not a replacement for SEO. An answer engine builds its answer from pages it has crawled and trusts, so being findable and credible in the classic sense is the entry requirement.',
    'What genuinely changes: the unit of success moves from a position to a citation, structure matters more, and verifiable specifics beat persuasive adjectives.',
    'What genuinely does not change: technical health, clear structure, real expertise and honest facts. Anyone selling AEO as a brand-new discipline with brand-new tactics is selling a rename.',
  ],
  intro: '<strong>AEO</strong> means answer engine optimisation: making your content the source an AI-generated answer draws on and cites. <strong>GEO</strong> &mdash; generative engine optimisation &mdash; is the same idea named after generative models rather than answers. You will also see &ldquo;AI SEO&rdquo; and &ldquo;AI search optimisation&rdquo;. They describe roughly one job, and the honest framing is that this is an extension of search work rather than a replacement for it: the engines building these answers are drawing on pages they have already crawled and decided to trust.',
  sections: [
    { h2: 'The Three Names, and What Each One Emphasises', html: `
<div class="article-table-wrap"><table>
<tr><th>Term</th><th>Stands for</th><th>What it emphasises</th></tr>
<tr><th>SEO</th><td>Search engine optimisation</td><td>Ranking a page in a list of results a person then clicks</td></tr>
<tr><th>AEO</th><td>Answer engine optimisation</td><td>Being the source an answer is built from, whether or not anyone clicks</td></tr>
<tr><th>GEO</th><td>Generative engine optimisation</td><td>The same, framed around generative models specifically</td></tr>
<tr><th>AI SEO / AI search optimisation</th><td>No agreed definition</td><td>Usually a vendor&rsquo;s label for the above, sometimes for using AI to do SEO &mdash; a different thing entirely</td></tr>
</table></div>
<p>The distinction worth holding on to is between <em>optimising for AI</em> and <em>using AI to optimise</em>. They get sold under the same heading and they are unrelated. This page is about the first.</p>
<div class="article-callout">If a supplier cannot tell you plainly whether they mean &ldquo;get you cited in AI answers&rdquo; or &ldquo;we use AI to write your content&rdquo;, that ambiguity is doing work for them, not for you.</div>` },
    { h2: 'AEO vs SEO: What Actually Differs', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Classic SEO</th><th>Answer / generative engines</th></tr>
<tr><th>The goal</th><td>A position in a list</td><td>Being quoted, and named as the source</td></tr>
<tr><th>The winning unit</th><td>A page</td><td>A passage &mdash; often a few sentences that answer cleanly</td></tr>
<tr><th>How you measure it</th><td>Position, clicks, impressions</td><td>Whether you appear in answers, and how you are described. Harder, and the tooling is young</td></tr>
<tr><th>What earns it</th><td>Relevance, authority, technical health</td><td>The same, plus being easy to extract: clear question-shaped headings, direct answers, real specifics</td></tr>
<tr><th>What kills it</th><td>Being outranked</td><td>Being vague. A model cannot quote an adjective</td></tr>
<tr><th>Traffic effect</th><td>A click</td><td>Sometimes no click at all &mdash; but a named mention at the moment of decision</td></tr>
</table></div>
<p>That last row is the genuinely uncomfortable one, and worth being honest about: some of this visibility does not produce a visit. You are being recommended rather than visited. For a considered purchase that is often still valuable &mdash; being the firm the answer named is a strong start to a conversation &mdash; but it will not show up as a session in your analytics.</p>` },
    { h2: 'What Actually Makes a Page Quotable', html: `
<p>Everything on this list is also good SEO, which is the point.</p>
<ul>
<li><strong>Answer the question in the first sentence under the heading.</strong> Then explain. A model extracting an answer takes the clean sentence, not the paragraph that builds to it.</li>
<li><strong>Use the question as the heading,</strong> in the words people actually use. Our own exports are full of question-shaped searches; those are literal headings.</li>
<li><strong>Give verifiable specifics.</strong> Figures, ranges, named standards, dates. &ldquo;Published UK list prices start around &pound;74 per user per month&rdquo; is quotable; &ldquo;affordable pricing&rdquo; is not.</li>
<li><strong>Attribute anything you did not measure yourself.</strong> Models and readers both weigh sourced claims more heavily.</li>
<li><strong>Keep the entity consistent.</strong> Same business name, address, service description everywhere. An engine that cannot tell who you are will not name you.</li>
<li><strong>Use structured data honestly.</strong> FAQPage, Organisation, Service, Breadcrumb &mdash; matching what is visibly on the page. Marking up things that are not there is the fastest way to be distrusted.</li>
<li><strong>Say when your answer does not apply.</strong> Caveats are distinctive, and distinctive text is what gets quoted.</li>
</ul>`,
      band: { img: 'seo3-long-row-of-library-books.jpg', alt: 'A long row of books in a library', cap: 'An answer engine is quoting a library it has already read. Being in it is the entry requirement.' } },
    { h2: 'Where the Opportunity Is Right Now', html: `
<p>One observation from the keyword research behind this site, offered as an observation rather than a promise: the AI-search terminology cluster in our own UK exports runs to several hundred phrases, and effectively all of them carry a difficulty score of zero. Volumes per phrase are small &mdash; tens per month &mdash; but there are hundreds of them and almost nobody has written properly about them.</p>
<p>That is what an emerging category looks like before it consolidates: low competition, fragmented phrasing, high intent. It will not stay that way. The businesses that write clear, honest, specific answers now are the ones the engines will have been drawing on for a year by the time it does.</p>
<p>The practical version of that is unglamorous: take the twenty questions your customers actually ask, answer each properly on a page of your own, and keep the answers accurate. That is the entire strategy, and it is the same strategy that worked before any of this had an acronym.</p>` },
    { h2: 'What Not to Do', html: `
<ul>
<li><strong>Do not rewrite your site for a rename.</strong> If your technical health, structure and expertise are sound, you are most of the way there already.</li>
<li><strong>Do not mark up claims that are not on the page.</strong> Structured data is a description, not an assertion.</li>
<li><strong>Do not publish generated filler at volume.</strong> Answer engines are being trained to prefer distinctive, sourced, specific writing. Bulk output is the opposite of that.</li>
<li><strong>Do not abandon classic measurement.</strong> Positions, impressions and clicks are still the most reliable signals you have; AI visibility sits alongside them, not instead.</li>
<li><strong>Do not pay for &ldquo;guaranteed AI citations&rdquo;.</strong> Nobody controls what a model quotes. Anyone guaranteeing it is describing something they cannot deliver.</li>
</ul>
<p>The companion piece, <a href="/blog/how-to-rank-in-ai-overviews-and-chatgpt.html">how to get cited by AI Overviews, ChatGPT and Perplexity</a>, is the practical checklist. Our <a href="/uk/seo-services/">UK search page</a> covers how we handle both together.</p>`,
      figures: [
        { img: 'seo3-typing-to-ai-on-phone.jpg', alt: 'Typing a question to an AI assistant on a phone', cap: 'The search still happens. The results page is what changed.' },
        { img: 'seo3-phone-with-speech-bubble.jpg', alt: 'A phone showing a speech bubble on screen', cap: 'And sometimes there is no click at all &mdash; only a recommendation.' },
      ] },
  ],
  faqs: [
    { q: 'What is generative engine optimisation (GEO)?', a: 'Making your content the material a generative AI answer is built from and cites. In practice it means being crawlable and credible in the classic sense, then writing so answers can be extracted cleanly: question-shaped headings, the answer in the first sentence, and verifiable specifics rather than adjectives.' },
    { q: 'What is answer engine optimisation (AEO)?', a: 'The same job named for answers rather than for generative models: being the source an AI answer draws on and names. AEO, GEO and "AI SEO" are used interchangeably by most vendors, so ask what someone means before comparing offers.' },
    { q: 'What is the difference between AEO and SEO?', a: 'SEO aims at a position in a list of results a person clicks. AEO aims at being quoted in the answer above that list, sometimes with no click at all. The winning unit shifts from a page to a passage, and vagueness becomes fatal because a model cannot quote an adjective. The underlying requirements &mdash; technical health, structure, real expertise &mdash; are the same.' },
    { q: 'Is AI search optimisation a real discipline or just a rename?', a: 'Mostly an extension, partly a rename. The genuinely new parts are measurement, entity consistency and writing for clean extraction. The claim that it requires a completely new set of tactics does not survive contact with how these engines actually build answers &mdash; from pages they have crawled and trust.' },
    { q: 'Do we need to do AEO if our SEO is already good?', a: 'You are most of the way there. The additions are small and cheap: put the real question in the heading, answer it in the first sentence underneath, add verifiable figures with attribution, keep your business details identical everywhere, and make sure your structured data describes what is visibly on the page.' },
  ],
  cta: SEO_CTA,
},

// ------------------------------------------------------------------ 7. Enterprise SEO
{
  slug: 'what-is-enterprise-seo', cat: 'seo', date: D,
  title: 'What Is Enterprise SEO? How It Differs, and What It Costs | TechAuditPros',
  desc: 'Enterprise SEO is not just bigger SEO. What actually changes at thousands of pages and multiple stakeholders: governance, templates, internal linking at scale, and getting work through someone else&rsquo;s release process.',
  eyebrow: 'Enterprise SEO',
  h1: 'What Is Enterprise SEO, and How Is It Different?',
  dek: 'At a few hundred pages you fix pages. At fifty thousand you fix templates, rules and approval processes &mdash; and the hardest part stops being search and becomes getting a change deployed.',
  lead: { img: 'seo3-glass-skyscraper-stepped.jpg', alt: 'A tall office building, the scale at which SEO becomes a governance problem' },
  takeaways: [
    '<strong>Enterprise SEO</strong> is search work at a scale where you can no longer fix pages individually. You fix templates, rules and processes, and every change is a deployment.',
    'What changes: template-level work instead of page-level, internal linking by rule, governance across teams who all own part of the site, and a release process you do not control.',
    'What does not change: the fundamentals. Index coverage, structure, speed, real content and honest markup still decide the outcome.',
    'The real constraint is rarely knowing what to do. It is getting it prioritised against everything else in a development backlog.',
  ],
  intro: '<strong>Enterprise SEO</strong> is search work at a scale where individual pages stop being the unit. On a hundred-page site you fix a page. On a fifty-thousand-page site you fix the template that generates twelve thousand of them, and you get that change through a release process shared with everyone else in the business. The techniques are largely the same. What differs is that everything happens through systems and people rather than directly, and the bottleneck moves from knowledge to organisation.',
  sections: [
    { h2: 'What Actually Changes at Scale', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Normal SEO</th><th>Enterprise SEO</th></tr>
<tr><th>Unit of work</th><td>A page</td><td>A template, a rule, or a data feed</td></tr>
<tr><th>Fixing a title tag</th><td>Edit the page</td><td>Change the pattern that generates thousands, and check the edge cases it breaks</td></tr>
<tr><th>Internal linking</th><td>Add links where they help</td><td>Define rules, then verify the rules produced sensible links at volume</td></tr>
<tr><th>Index management</th><td>Occasional noindex</td><td>A deliberate policy on facets, filters, parameters, pagination and near-duplicates</td></tr>
<tr><th>Who has to agree</th><td>One or two people</td><td>Product, engineering, content, legal, brand, and whoever owns the release calendar</td></tr>
<tr><th>Time to deploy</th><td>Same day</td><td>The next sprint, or the one after</td></tr>
<tr><th>The main risk</th><td>Doing nothing</td><td>Doing something at scale that is wrong at scale</td></tr>
</table></div>
<div class="article-callout">The defining enterprise problem: a correct recommendation that nobody deploys is worth exactly nothing, and it will not look like anyone&rsquo;s fault.</div>` },
    { h2: 'The Four Problems That Only Appear at Scale', html: `
<ul>
<li><strong>Index bloat.</strong> Facets, filters, sort orders and parameters multiplying into hundreds of thousands of thin, near-identical URLs. This dilutes everything and is invisible until someone counts.</li>
<li><strong>Template debt.</strong> One bad pattern &mdash; a duplicated title, a missing heading, schema that does not match the page &mdash; replicated across every page the template generates.</li>
<li><strong>Orphaned pages at volume.</strong> Products, locations or articles that no navigation reaches, often because a category was retired and the links went with it.</li>
<li><strong>Conflicting ownership.</strong> Three teams each own part of the site, each with their own roadmap, and nobody owns the whole. This is a governance problem wearing a technical costume.</li>
</ul>
<p>Notice that all four are structural. None is fixed by writing more content, which is where enterprise budgets most often go.</p>`,
      band: { img: 'seo3-glass-towers-from-below.jpg', alt: 'Glass towers seen from below', cap: 'At this scale you change the template, not the page.' } },
    { h2: 'What Enterprise SEO Costs', html: `
<p>We do not publish our own fees, and any figure quoted without seeing your site would be invented. What is worth knowing is where the money actually goes, because it is not where people expect.</p>
<ul>
<li><strong>Discovery is a real project.</strong> Crawling and making sense of tens of thousands of URLs, and mapping which team owns what, takes weeks rather than days.</li>
<li><strong>Engineering time dominates.</strong> Most of the cost of an enterprise fix is the development work to deploy it, and that is usually your team, not the supplier&rsquo;s. Budget it explicitly.</li>
<li><strong>Tooling scales with URLs.</strong> Crawl and rank-tracking tools are priced per URL or per keyword, and at this scale that becomes a line item rather than a rounding error.</li>
<li><strong>Coordination is the hidden cost.</strong> The meetings to get a template change agreed across four teams often cost more than the change.</li>
</ul>
<p>Which is why the useful question is not &ldquo;what does enterprise SEO cost?&rdquo; but &ldquo;what will it cost us to deploy the first three recommendations, and who signs that off?&rdquo; If nobody can answer, the engagement will stall regardless of budget.</p>` },
    { h2: 'How to Run It So It Actually Ships', html: `
<ul>
<li><strong>Name one accountable owner.</strong> Not a committee. Someone whose job is measured on whether search work ships.</li>
<li><strong>Get onto the release calendar, not into a backlog.</strong> A recommendation with a sprint date is work; one in a backlog is a document.</li>
<li><strong>Fix templates before pages.</strong> The leverage is enormous and it is where the compounding happens.</li>
<li><strong>Decide the indexing policy in writing.</strong> What is indexable, what is not, and who may create new URL patterns. Then enforce it in code.</li>
<li><strong>Test at small scale first.</strong> Roll a template change to a slice, measure it, then go wide. A wrong change at scale is expensive to unwind.</li>
<li><strong>Report by segment.</strong> One site-wide traffic line hides everything. Split by template or section, or you cannot tell what worked.</li>
</ul>
<p>For smaller sites almost none of this applies, and the page-level approach in <a href="/blog/how-to-get-to-the-top-of-google.html">how to get to the top of Google</a> is the better read. If you are somewhere between the two, our <a href="/uk/seo-services/">UK search page</a> explains how we scope it.</p>`,
      figure: { img: 'seo3-curtain-wall-buildings.jpg', alt: 'Curtain-wall office buildings from a low angle', cap: 'The hardest part of enterprise search work is rarely the search work. It is the release calendar.' } },
  ],
  faqs: [
    { q: 'What is enterprise SEO?', a: 'Search work at a scale where you cannot fix pages one at a time. Instead of editing a page you change the template, rule or data feed that generates thousands of them, and every change goes through a release process shared with the rest of the business. The techniques are similar; the constraints are organisational.' },
    { q: 'How does enterprise SEO differ from regular SEO?', a: 'Four ways: the unit of work is a template rather than a page; internal linking and index management become policies rather than decisions; many teams have to agree; and deployment takes a sprint rather than an afternoon. The fundamentals &mdash; index coverage, structure, speed, real content &mdash; are unchanged.' },
    { q: 'How much does enterprise SEO cost?', a: 'It depends on the site, and most of the cost is not the search work. Budget for a discovery project measured in weeks, significant engineering time to deploy changes (usually your own team), per-URL tooling, and the coordination overhead of getting template changes agreed. The more useful question is what it will cost to deploy the first three recommendations.' },
    { q: 'When does a business need enterprise SEO?', a: 'Roughly when three things are true: the site has enough pages that they are generated rather than written, more than one team can create URLs, and changes require a release process. Page count alone is a poor guide &mdash; a 2,000-page site with three owning teams behaves like an enterprise; a 20,000-page site with one owner may not.' },
    { q: 'What are the benefits of enterprise SEO?', a: 'Leverage. A single template fix can improve thousands of pages at once, and a written indexing policy prevents a whole class of future problems. The trade-off is that mistakes also scale, which is why template changes should be tested on a slice before going wide.' },
  ],
  cta: SEO_CTA,
},

// ------------------------------------------------------------------ 8. Getting cited by AI
{
  slug: 'how-to-rank-in-ai-overviews-and-chatgpt', cat: 'seo', date: D,
  title: 'How to Get Cited by AI Overviews, ChatGPT and Perplexity | TechAuditPros',
  desc: 'A practical checklist for appearing in AI answers: what each engine draws on, how to write a passage that can be quoted, how to measure whether it is working, and what nobody can promise you.',
  eyebrow: 'AI Visibility',
  h1: 'How to Get Cited by AI Overviews, ChatGPT and Perplexity',
  dek: 'You cannot control what a model says. You can control whether you are the clearest, most specific, most citable source on the question &mdash; which is most of the battle.',
  lead: { img: 'seo3-ai-assistant-options-phone.jpg', alt: 'An AI assistant offering answers on a phone, where a growing share of buyers now start' },
  takeaways: [
    'Each engine draws on something different: AI Overviews largely on Google&rsquo;s own index, ChatGPT on training data plus live browsing, Perplexity on live search with visible citations. Being crawlable and credible serves all three.',
    'Write for extraction: the real question as the heading, the answer in the first sentence beneath it, then the detail. A model quotes the clean sentence.',
    'Specifics get quoted, adjectives do not. Figures, ranges, named standards and dates &mdash; attributed when they are not yours.',
    'Measure it by asking the engines. There is no Search Console for this yet, so a monthly manual check of your twenty key questions is the honest method.',
  ],
  intro: 'Getting <strong>cited by AI answers</strong> is not a trick, and nobody can guarantee it &mdash; no one controls what a model quotes. What you can control is whether you are the clearest, most specific and most verifiable source on a question a buyer is actually asking. That is the whole method, and it happens to be indistinguishable from writing a genuinely good page. This is the practical checklist; <a href="/blog/aeo-and-geo-explained.html">AEO and GEO explained</a> covers what the terms mean.',
  sections: [
    { h2: 'What Each Engine Is Actually Drawing On', html: `
<div class="article-table-wrap"><table>
<tr><th>Engine</th><th>Where the answer comes from</th><th>What that means for you</th></tr>
<tr><th>Google AI Overviews</th><td>Largely Google&rsquo;s own index and ranking signals</td><td>Classic SEO is the entry requirement. If you are not indexed and reasonably ranked, you are not in the answer</td></tr>
<tr><th>ChatGPT</th><td>Training data, plus live browsing when it searches</td><td>Two routes: be well enough established to be in the training data, and be findable when it browses</td></tr>
<tr><th>Perplexity</th><td>Live search, with citations shown prominently</td><td>The most transparent of the three. If you rank and answer cleanly, you can appear quickly</td></tr>
<tr><th>Copilot / Gemini</th><td>Their parent search index plus their own models</td><td>Same requirements again: crawlable, credible, clearly structured</td></tr>
</table></div>
<p>The common factor is worth stating plainly: every one of them is drawing on pages that have been crawled and, in most cases, judged reasonably trustworthy. There is no route that skips that.</p>` },
    { h2: 'Write a Passage That Can Be Quoted', html: `
<p>This is the part that genuinely differs from writing for a human reader alone.</p>
<ul>
<li><strong>Put the question in the heading,</strong> in the words people use. Not &ldquo;Timelines&rdquo; but &ldquo;How long does SEO take to work?&rdquo;</li>
<li><strong>Answer it in the first sentence underneath.</strong> Complete, self-contained, quotable without the surrounding paragraph. Then explain, qualify and expand.</li>
<li><strong>Keep the quotable sentence free of pronouns pointing backwards.</strong> &ldquo;It usually takes four to nine months&rdquo; is useless out of context; &ldquo;A new page on a mid-tail commercial term usually takes four to nine months&rdquo; survives extraction.</li>
<li><strong>Use numbers, ranges and named things.</strong> Standards, versions, dates, published figures. Attribute what is not yours.</li>
<li><strong>One idea per paragraph.</strong> Dense paragraphs covering three points are hard to quote cleanly.</li>
<li><strong>Add a real FAQ</strong> with FAQPage markup that matches the visible text exactly.</li>
<li><strong>State the limits of your answer.</strong> &ldquo;This does not apply if&hellip;&rdquo; is distinctive, useful, and frequently the sentence that gets quoted.</li>
</ul>
<div class="article-callout">Read your own page as a machine would: can any single sentence be lifted out and still be true and complete? If not, it cannot be quoted.</div>` },
    { h2: 'Make Sure the Engine Knows Who You Are', html: `
<p>An engine that cannot resolve your identity will not name you. Entity consistency is unglamorous and it is the part most businesses get wrong.</p>
<ul>
<li><strong>One canonical business name,</strong> spelled identically everywhere &mdash; your site, your profiles, your directory listings, your invoices.</li>
<li><strong>Organisation structured data</strong> on your site naming the business, its URL, and its verifiable profiles.</li>
<li><strong>The same address, phone and hours everywhere.</strong> Contradictions make you a less reliable entity to cite.</li>
<li><strong>A clear description of what you do,</strong> consistent across your own pages. If your homepage, your profile and your service page describe three different businesses, that ambiguity is your problem to fix.</li>
<li><strong>Verifiable third-party mentions.</strong> Being described consistently by other credible sources is what turns a name into an entity.</li>
</ul>`,
      band: { img: 'seo3-pathway-between-piled-books.jpg', alt: 'A pathway between piled books', cap: 'An engine that cannot work out who you are will not name you.' } },
    { h2: 'How to Measure It', html: `
<p>Honestly: the tooling is immature and there is no Search Console for AI citations. The method that works today is manual and takes an hour a month.</p>
<ul>
<li><strong>Write down your twenty questions.</strong> The ones your customers actually ask, in their words.</li>
<li><strong>Ask each engine, monthly.</strong> Google with AI Overviews, ChatGPT, Perplexity. Same questions, same order, logged in a sheet.</li>
<li><strong>Record three things:</strong> are you mentioned, are you cited with a link, and who is cited instead of you.</li>
<li><strong>Read how you are described.</strong> This is the most valuable output and the one people skip. If the description is wrong or dated, that is a content problem you can fix.</li>
<li><strong>Watch referrals from AI sources</strong> in your analytics. Small numbers, but the trend is informative.</li>
<li><strong>Do not expect it to look like SEO reporting.</strong> Answers vary between sessions and users. You are reading a trend, not a rank.</li>
</ul>
<p>That third point &mdash; who is cited instead of you &mdash; is the practical roadmap. Open those pages and see what they did that you have not.</p>` },
    { h2: 'What Nobody Can Promise You', html: `
<ul>
<li><strong>A guaranteed citation.</strong> Nobody controls model output. A guarantee is a claim about something the seller does not own.</li>
<li><strong>Consistency.</strong> The same question can produce different answers to different people at different times. That is how these systems work.</li>
<li><strong>Traffic.</strong> Some of this visibility ends in no click at all. You are recommended rather than visited, which is valuable for considered purchases and invisible in a sessions report.</li>
<li><strong>A shortcut.</strong> There is no equivalent of buying a link. The route is being genuinely the clearest source, which is slow and cannot be faked at volume.</li>
</ul>
<p>What is realistic: over a few months, being the source that answers your twenty questions best, and being described accurately when you are named. That is achievable, it is measurable in the rough way described above, and it is the same work that makes the page good for people.</p>
<p>If you want to know what the engines currently say about your business, that is the first thing we check. See <a href="/uk/seo-services/">UK search work</a>, or <a href="/blog/what-is-an-seo-audit.html">what an audit covers</a>.</p>`,
      figure: { img: 'seo3-large-library-interior.jpg', alt: 'A large library filled with books', cap: 'Ask the engines your own twenty questions once a month, and note who gets cited instead of you. That list is the roadmap.' } },
  ],
  faqs: [
    { q: 'How do I rank in AI Overviews?', a: 'Be indexed and ranking reasonably in classic Google results first, because AI Overviews draw largely on Google&rsquo;s own index. Then write for extraction: the real question as a heading, a complete self-contained answer in the first sentence underneath, verifiable specifics, and FAQPage markup that matches the visible text.' },
    { q: 'How do I get my website mentioned by ChatGPT?', a: 'Two routes. Be established enough that credible sources describe you consistently, which is what puts a business into training data; and be findable and clearly structured when it browses live. Entity consistency matters more here than anywhere else &mdash; one business name, one description, the same details everywhere.' },
    { q: 'How do I measure AI search visibility?', a: 'Manually, for now. List the twenty questions your customers actually ask, put each to Google, ChatGPT and Perplexity once a month, and record whether you are mentioned, whether you are cited with a link, who is cited instead, and how you are described. Track AI referrals in analytics alongside it. Answers vary by session, so read the trend rather than a rank.' },
    { q: 'How do I optimise content for AI search?', a: 'Question-shaped headings in the words people use; the answer complete in the first sentence beneath, with no backward-pointing pronouns so it survives being lifted out; numbers, ranges and named standards rather than adjectives; attribution for anything you did not measure; one idea per paragraph; and an honest statement of when your answer does not apply.' },
    { q: 'Can anyone guarantee citations in AI answers?', a: 'No. Nobody controls what a model quotes, and the same question can produce different answers to different people. What can be done is making you the clearest and most specific source on the questions that matter, then measuring whether the engines describe you accurately. Anyone selling a guarantee is selling something they do not own.' },
  ],
  cta: SEO_CTA,
},
];
