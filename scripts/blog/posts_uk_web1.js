'use strict';
// UK blog wave 3, posts 1-4 (web development). Checked against what is live first: four of the eight
// originally planned topics already have genuine posts (website cost, custom vs template, mobile
// friendly, web application vs website), so those were replaced with uncovered clusters from the
// owner's exports.
//
//   1 how to redesign website without losing seo 140/5 + does website redesign affect seo 90/0 +
//     what is website migration 90/0                                                    (320/mo)
//   2 what is website maintenance 170/38 + how much does it cost to maintain a website 110/19 +
//     what does website maintenance include 110/0 + what is website maintenance services 90/0 (480/mo)
//   3 how to make a wordpress website 320/35 + web designer wordpress 140/19 + how to build a
//     website with wordpress 140/37 + how do i build a wordpress website 110/45 + how to add title
//     tag in wordpress 90/0                                                              (890/mo)
//   4 what is ecommerce website 110/41 + how to build an ecommerce website 90/34 + how to make
//     ecommerce website 90/29 + how much does an ecommerce website cost 90/0 + what is long tail
//     ecommerce 110/7                                                                    (600/mo)
const D = '2026-09-04';
const WEB_CTA = { h3: 'Want a straight answer on your own site?', p: 'Book a free strategy call. We look at what you have, tell you what is worth changing and what is not, and the audit is yours to keep either way &mdash; including the times the answer is that your site is fine.' };

module.exports = [
// ------------------------------------------------------------------ 1. Redesign without losing SEO
{
  slug: 'redesign-website-without-losing-seo', cat: 'web', date: D,
  title: 'How to Redesign a Website Without Losing Your SEO | TechAuditPros',
  desc: 'Most traffic drops after a redesign are caused by four avoidable mistakes. The pre-launch inventory, the redirect map, what to test before you go live, and what to watch for six weeks afterwards.',
  eyebrow: 'Redesign &amp; Migration',
  h1: 'How to Redesign a Website Without Losing Your SEO',
  dek: 'A redesign does not damage rankings. Losing URLs, content and internal links during a redesign does &mdash; and it is entirely avoidable with one document written before anyone touches the design.',
  lead: { img: 'web1-building-under-scaffolding.jpg', alt: 'A building being rebuilt behind scaffolding while it stays standing' },
  takeaways: [
    'A redesign does not inherently cost you rankings. What costs you rankings is changing URLs without redirects, dropping content, losing internal links, or launching something slower than what you had.',
    'The one document that prevents nearly all of it: a full inventory of every current URL with its traffic, its rankings and its inbound links, taken <em>before</em> the project starts.',
    'Every changed URL needs a 301 to the closest equivalent page. Not the homepage &mdash; redirecting everything to the homepage is treated as a soft 404.',
    'Expect a short dip while the new URLs are recrawled. Two to four weeks is normal; six weeks with no recovery is a problem to investigate, not to wait out.',
  ],
  intro: 'Redesigning a website does not cost you search visibility. Four specific mistakes made <em>during</em> a redesign do: changing URLs without redirecting them, quietly dropping content that was ranking, losing the internal links that supported your key pages, and launching something slower than what you replaced. Each is avoidable, and the thing that avoids all four is a single inventory taken before any design work begins &mdash; not after.',
  sections: [
    { h2: 'Before Anything: Take the Inventory', html: `
<p>This is the whole insurance policy, and it takes a day. Do it before the design is agreed, because what it tells you should influence the design.</p>
<div class="article-table-wrap"><table>
<tr><th>What to record</th><th>Where from</th><th>Why it matters later</th></tr>
<tr><th>Every URL on the site</th><td>A crawl of the live site</td><td>Your redirect map is built from this. Missing URLs are missing redirects</td></tr>
<tr><th>Clicks and impressions per URL</th><td>Search Console, last 12 months</td><td>Tells you which pages you cannot afford to lose. Some will surprise you</td></tr>
<tr><th>Ranking keywords per URL</th><td>Your rank tracker or Search Console</td><td>So you can tell afterwards whether a drop is real or a reshuffle</td></tr>
<tr><th>Pages with inbound links</th><td>Any backlink tool</td><td>These carry earned authority. Break them and it is gone, not moved</td></tr>
<tr><th>Existing title tags and headings</th><td>The crawl</td><td>Rewriting these wholesale on a page that already ranks is a common own goal</td></tr>
<tr><th>Core Web Vitals now</th><td>Search Console, real-user data</td><td>Your baseline. A redesign that is slower is a redesign that went backwards</td></tr>
</table></div>
<div class="article-callout">Save this inventory somewhere permanent. On launch day it is the only thing that tells you whether something broke or something merely moved.</div>` },
    { h2: 'The Four Things That Actually Cause Drops', html: `
<ul>
<li><strong>URLs changed without redirects.</strong> The most common and the most damaging. Every old URL that no longer exists must return a 301 to the closest equivalent. Not a 302, which signals temporary; not the homepage, which search engines treat as a soft 404.</li>
<li><strong>Content quietly dropped.</strong> Redesigns are usually driven by design, and design prefers less text. If a page ranked because it answered something thoroughly, the shorter version will not. Cut design elements, not substance.</li>
<li><strong>Internal links lost.</strong> A new navigation that no longer links to the pages you care about silently removes the signal that supported them. Compare the internal link count per key page before and after.</li>
<li><strong>The new site is slower.</strong> A heavier framework, unoptimised images, or a page builder replacing hand-written markup. Measure Core Web Vitals on the staging build against your baseline before you launch, not after.</li>
</ul>
<p>Notice that none of these is caused by the visual design. You can change how a site looks entirely without touching any of the four.</p>`,
      band: { img: 'web1-two-workers-on-scaffolding.jpg', alt: 'Two workers on scaffolding partway up a building', cap: 'Change how it looks. Keep the structure standing.' } },
    { h2: 'Building the Redirect Map', html: `
<p>A redirect map is a two-column list: every old URL, and the single best new URL for it. Rules that matter:</p>
<ul>
<li><strong>One-to-one wherever possible.</strong> The closest equivalent page, not a category, not the homepage.</li>
<li><strong>301, not 302.</strong> Permanent, because it is.</li>
<li><strong>No chains.</strong> Old A to new B, not A to B to C. Chains dilute and slow.</li>
<li><strong>Keep the URL if you can.</strong> The best redirect is the one you did not need. If a URL is fine, leave it alone even if the page behind it changes completely.</li>
<li><strong>Handle the tail.</strong> Old blog posts, PDFs, image URLs, parameter variations. The long tail is where forgotten inbound links live.</li>
<li><strong>Decide what to retire deliberately.</strong> Some pages should go. Redirect them to the nearest useful thing and record the decision, so nobody is puzzled by it in a year.</li>
</ul>
<p>Test the map on staging by requesting a sample of old URLs and confirming each returns a single 301 to a page that returns 200. Ten minutes with a crawler catches what a spreadsheet review will not.</p>` },
    { h2: 'Launch Day, and the Six Weeks After', html: `
<div class="article-table-wrap"><table>
<tr><th>When</th><th>What to do</th></tr>
<tr><th>Before you go live</th><td>Confirm robots.txt is not blocking the new site, the staging noindex is removed, canonicals point to the new URLs, and the sitemap lists them</td></tr>
<tr><th>Launch day</th><td>Crawl the new site for 404s and redirect chains. Submit the new sitemap. Spot-check twenty old URLs by hand</td></tr>
<tr><th>Week 1</th><td>Watch Search Console coverage for a spike in errors or excluded pages. Compare Core Web Vitals against the baseline</td></tr>
<tr><th>Weeks 2&ndash;4</th><td>Expect a dip while URLs are recrawled and reindexed. This is normal and usually recovers</td></tr>
<tr><th>Week 6</th><td>If it has not recovered, this is the point to investigate rather than wait. Compare your inventory against reality, page by page</td></tr>
</table></div>
<p>One thing worth saying plainly: a dip in the first fortnight is not evidence something went wrong, and a recovery in week five is not evidence it went right. The inventory is what turns anxiety into a diagnosis.</p>` },
    { h2: 'Website Migration Is a Bigger Version of the Same Job', html: `
<p><strong>Website migration</strong> is the broader term: moving to a new domain, a new platform, a new URL structure, or from HTTP to HTTPS. A redesign changes how the site looks; a migration changes where it lives or how it is built. Everything above applies, plus:</p>
<ul>
<li><strong>Domain change:</strong> use Google&rsquo;s change-of-address tool, keep the old domain and its redirects for at least a year, and expect a longer settling period.</li>
<li><strong>Platform change:</strong> URL patterns almost always change. This is where the largest redirect maps come from, and where they are most often incomplete.</li>
<li><strong>Structure change:</strong> if you are reorganising categories, decide the new information architecture first and map to it &mdash; not the other way round. See <a href="/blog/how-to-structure-a-website.html">how to structure a website</a>.</li>
<li><strong>Do one at a time.</strong> A new domain, a new platform and a new design in one weekend means that when something breaks you will not know which change caused it.</li>
</ul>
<p>If you would rather have someone run the inventory and the map before your redesign starts, that is a contained piece of work with a clear output. See <a href="/uk/website-development/">UK web development</a>.</p>`,
      figures: [
        { img: 'web1-scaffolding-golden-hour.jpg', alt: 'Scaffolding silhouetted at golden hour', cap: 'One change at a time.' },
        { img: 'web1-tall-building-scaffolded.jpg', alt: 'A tall building wrapped in scaffolding', cap: 'Otherwise you cannot tell which change broke it.' },
      ] },
  ],
  faqs: [
    { q: 'Does a website redesign affect SEO?', a: 'A redesign in itself does not. Four things done during one do: changing URLs without 301 redirects, dropping content that was ranking, losing the internal links that supported key pages, and launching something slower than before. All four are avoidable, and none is caused by the visual design.' },
    { q: 'How do I redesign a website without losing rankings?', a: 'Take a full inventory before the project starts &mdash; every URL with its clicks, rankings, inbound links, titles and Core Web Vitals. Build a one-to-one 301 map for any URL that changes. Keep the substance of pages that rank. Compare internal link counts and page speed against the baseline on staging. Then watch coverage for six weeks.' },
    { q: 'How long does it take for rankings to recover after a redesign?', a: 'A dip of two to four weeks while new URLs are recrawled is normal. If there is no recovery by about week six, treat that as a problem to investigate rather than wait out &mdash; compare your pre-launch inventory against reality page by page, starting with the URLs that had inbound links.' },
    { q: 'What is website migration?', a: 'Moving a site to a new domain, platform, URL structure or protocol. A redesign changes appearance; a migration changes where the site lives or how it is built. The precautions are the same but larger, and the redirect map is usually where migrations go wrong &mdash; platform changes almost always alter URL patterns.' },
    { q: 'Should I redirect old pages to the homepage?', a: 'No. Search engines commonly treat a mass redirect to the homepage as a soft 404, so the earned value is lost rather than moved. Redirect each old URL to the closest equivalent page. If there genuinely is no equivalent, redirect to the nearest useful section and record why.' },
  ],
  cta: WEB_CTA,
},

// ------------------------------------------------------------------ 2. Website maintenance
{
  slug: 'what-website-maintenance-includes', cat: 'web', date: D,
  title: 'What Website Maintenance Includes, and What It Should Cost | TechAuditPros',
  desc: 'The seven jobs that make up website maintenance, which are genuinely necessary, which are padding, what happens if you skip it, and how to tell a support retainer from a hosting bill.',
  eyebrow: 'Maintenance',
  h1: 'What Website Maintenance Includes &mdash; and What It Should Cost',
  dek: 'Some of it protects you from a real and expensive problem. Some of it is a hosting bill wearing a service name. Here is how to tell which retainer you have been sold.',
  lead: { img: 'web1-wall-full-of-tools.jpg', alt: 'A workshop wall of tools, each in its place' },
  takeaways: [
    'Website maintenance is seven jobs: security updates, backups, uptime monitoring, performance checks, content changes, broken-link and form checks, and platform or dependency upgrades.',
    'The genuinely necessary parts are security updates, tested backups and upgrades. These protect you from problems that are expensive and sometimes unrecoverable.',
    'The padding to watch for: &ldquo;monitoring&rdquo; billed as a service when it is an automated alert, and hosting rebadged as maintenance.',
    'The test of a backup is a restore. A backup nobody has ever restored is a belief, not a backup.',
  ],
  intro: '<strong>Website maintenance</strong> is the ongoing work of keeping a site secure, working and current: applying security updates, taking and testing backups, watching uptime, checking speed, making content changes, catching broken links and dead forms, and upgrading the platform and its dependencies before they become a problem. Some of that protects you from genuinely expensive failures. Some of what gets billed under the same heading is a hosting invoice with a service name on it. The difference is worth knowing.',
  sections: [
    { h2: 'The Seven Jobs', html: `
<div class="article-table-wrap"><table>
<tr><th>Job</th><th>What it involves</th><th>Necessary?</th></tr>
<tr><th>Security updates</th><td>Patching the platform, plugins, themes and dependencies as fixes are released</td><td><strong>Yes.</strong> Most site compromises exploit a known vulnerability that had a patch available</td></tr>
<tr><th>Backups</th><td>Automated, off-site, versioned &mdash; and periodically restored to prove they work</td><td><strong>Yes,</strong> and the restore test is the part that matters</td></tr>
<tr><th>Platform &amp; dependency upgrades</th><td>Major-version upgrades, deprecations, end-of-life packages</td><td><strong>Yes.</strong> Deferring these turns a routine upgrade into a rebuild</td></tr>
<tr><th>Uptime monitoring</th><td>An alert if the site goes down</td><td>Yes, but it is a cheap automated service, not skilled labour</td></tr>
<tr><th>Performance checks</th><td>Core Web Vitals on real-user data, image weight, caching</td><td>Quarterly is usually enough unless the site changes constantly</td></tr>
<tr><th>Link, form &amp; integration checks</th><td>Broken links, forms that silently stopped sending, expired API keys and certificates</td><td>Yes &mdash; and a dead contact form is the most expensive item on this table</td></tr>
<tr><th>Content changes</th><td>Text edits, new pages, image swaps</td><td>Only if you want someone else doing it. This is billable work, not maintenance</td></tr>
</table></div>
<div class="article-callout">If your retainer is mostly content changes, you have bought a content service. Fine &mdash; but you are not covered on the security side, and you should know that.</div>` },
    { h2: 'What Happens If You Skip It', html: `
<ul>
<li><strong>You get compromised through a known hole.</strong> Automated scanners find unpatched sites within days. The result is usually injected spam links or a redirect &mdash; damaging to rankings, embarrassing to customers, and slow to clean.</li>
<li><strong>You discover the backup does not work</strong> on the day you need it. This is the single most common serious failure we see, and it is entirely preventable by restoring one occasionally.</li>
<li><strong>A routine upgrade becomes a rebuild.</strong> Three major versions behind, with plugins that no longer have maintained equivalents, is a project rather than an afternoon.</li>
<li><strong>A form stops sending and nobody notices.</strong> Weeks of enquiries, gone, and it looks exactly like a quiet month.</li>
<li><strong>A certificate expires</strong> and every browser warns visitors away from your site. Cheap to prevent, painful for the hour it lasts.</li>
</ul>
<p>The pattern is worth noticing: none of these is gradual. Maintenance is not about slow decline, it is insurance against sudden, avoidable events.</p>`,
      band: { img: 'web1-hands-working-on-engine.jpg', alt: 'Hands working on an engine with a spanner', cap: 'A backup nobody has restored is a belief, not a backup.' } },
    { h2: 'What It Should Cost, and How to Compare Quotes', html: `
<p>We do not publish our own fees, and any figure quoted without seeing your site would be invented. What you can do is make two quotes comparable, which most people never manage because the quotes describe different things. Ask every supplier for the same six answers:</p>
<ul>
<li><strong>Is hosting included, and at what spec?</strong> A retainer that is mostly hosting should cost about what hosting costs.</li>
<li><strong>How often are security updates applied, and who tests them?</strong> &ldquo;Automatically&rdquo; without testing is how sites break on a Tuesday morning.</li>
<li><strong>Where are backups stored, how many versions, and when did you last restore one?</strong> The third part is the real question.</li>
<li><strong>How many hours of changes are included, and what is the rate beyond that?</strong></li>
<li><strong>What is the response time if the site goes down, and does that include out of hours?</strong></li>
<li><strong>If we leave, what do we take?</strong> Codebase, database, DNS, and whose accounts everything sits in.</li>
</ul>
<p>That last one decides whether you have a supplier or a landlord. If the hosting account, the domain and the repository are all in their name, leaving is a negotiation rather than a decision.</p>` },
    { h2: 'What You Can Reasonably Do Yourself', html: `
<ul>
<li><strong>Test your own contact form monthly.</strong> Send one. Confirm it arrives. This takes a minute and catches the most costly failure on the list.</li>
<li><strong>Keep a note of renewal dates</strong> &mdash; domain, certificate, licences. Diary them a month early.</li>
<li><strong>Check your own site on a phone occasionally,</strong> on mobile data rather than office wifi.</li>
<li><strong>Watch Search Console coverage</strong> once a month for a spike in errors. It is free and it is the earliest warning you get.</li>
</ul>
<p>Leave the security patching, the upgrades and the restore testing to whoever maintains it. Those are the parts where being wrong is expensive, and where doing it properly needs someone who does it often. See <a href="/uk/website-development/">UK web development</a> for how we structure it, and <a href="/blog/redesign-website-without-losing-seo.html">redesigning without losing SEO</a> for when maintenance turns into a rebuild.</p>`,
      figures: [
        { img: 'web1-toolbox-full-of-tools.jpg', alt: 'An open toolbox filled with tools', cap: 'Security patching, upgrades and restore tests belong to whoever does them often.' },
        { img: 'web1-pile-of-spanners.jpg', alt: 'A pile of spanners side by side', cap: 'Testing your own contact form belongs to you, and takes a minute.' },
      ] },
  ],
  faqs: [
    { q: 'What does website maintenance include?', a: 'Seven jobs: security updates to the platform and its plugins, automated off-site backups that get restore-tested, platform and dependency upgrades, uptime monitoring, periodic performance checks, checks on broken links, forms and integrations, and content changes. The first three are the genuinely necessary ones.' },
    { q: 'How much does it cost to maintain a website?', a: 'It depends on the platform, how much of the retainer is hosting, and how many hours of changes are included &mdash; which is why two quotes at the same price often describe very different work. Ask every supplier the same six questions about hosting spec, patch testing, backup restores, included hours, response times and what you keep if you leave.' },
    { q: 'What happens if I do not maintain my website?', a: 'The failures are sudden rather than gradual: compromise through an unpatched known vulnerability, discovering the backup does not restore on the day you need it, a routine upgrade becoming a rebuild, a contact form silently stopping, or a certificate expiring and browsers warning visitors away.' },
    { q: 'Is website maintenance the same as hosting?', a: 'No, though they are often billed together in a way that hides the split. Hosting is where the site runs. Maintenance is the work of keeping it secure, current and functioning. If a retainer is mostly hosting, it should cost roughly what hosting costs &mdash; ask for the split.' },
    { q: 'How often should a website be updated?', a: 'Security patches as soon as they are released and tested. Platform major versions on a planned schedule rather than when forced. Performance and link checks quarterly for a stable site, monthly if it changes often. Content whenever the content is out of date, which is a business decision rather than a maintenance one.' },
  ],
  cta: WEB_CTA,
},

// ------------------------------------------------------------------ 3. WordPress properly
{
  slug: 'wordpress-website-done-properly', cat: 'web', date: D,
  title: 'How to Build a WordPress Website Properly | TechAuditPros',
  desc: 'WordPress is a good choice for a lot of businesses and a bad one for some. How to build it so it stays fast and secure, how many plugins is too many, and when to use something else instead.',
  eyebrow: 'WordPress',
  h1: 'How to Build a WordPress Website Properly',
  dek: 'WordPress is not the problem. Twenty-eight plugins, a page builder, an unmaintained theme and no update policy are the problem &mdash; and that combination is what most people mean when they say WordPress is slow.',
  lead: { img: 'web1-blueprints-pencils-ruler.jpg', alt: 'Drawings, pencils and a ruler &mdash; deciding the structure before building' },
  takeaways: [
    'WordPress powers a very large share of the web and is a sensible choice when someone non-technical needs to publish regularly and the site is mostly content.',
    'What makes a WordPress site slow and insecure is almost never WordPress: it is plugin count, a heavy page builder, an unmaintained theme, unoptimised images and no update policy.',
    'A reasonable target is fewer than ten plugins, each actively maintained, each doing something you could name and justify.',
    'When to choose something else: complex custom data models, high transaction volumes, or a site that is really an application wearing a website costume.',
  ],
  intro: '<strong>WordPress</strong> is a good choice for a large number of businesses. It is a bad choice for some, and it is very often implemented badly, which is where its reputation comes from. Built properly &mdash; a lean theme, few plugins, images handled sensibly, and an actual update policy &mdash; a WordPress site is fast, secure and easy for a non-technical person to publish on. Built the usual way, it is a slow site with twenty-eight plugins that nobody dares update.',
  sections: [
    { h2: 'When WordPress Is the Right Answer', html: `
<div class="article-table-wrap"><table>
<tr><th>Your situation</th><th>WordPress?</th><th>Why</th></tr>
<tr><th>Mostly content, published regularly by non-technical staff</th><td><strong>Yes</strong></td><td>This is precisely what it is for, and nothing does it better for the money</td></tr>
<tr><th>A brochure site with a blog and a contact form</th><td><strong>Yes</strong></td><td>Fast to build, easy to hand over, cheap to keep</td></tr>
<tr><th>A shop with a manageable catalogue</th><td>Probably</td><td>WooCommerce is capable; at real scale a dedicated platform is usually calmer</td></tr>
<tr><th>Complex custom data and relationships</th><td>Probably not</td><td>You will spend the project fighting the content model instead of using it</td></tr>
<tr><th>High transaction volume or heavy logged-in traffic</th><td>No</td><td>Caching, which is what makes WordPress fast, does not help logged-in users</td></tr>
<tr><th>It is really an application</th><td>No</td><td>Dashboards, workflows and permissions belong in something built for them</td></tr>
</table></div>
<p>The honest summary: if your site is content with some forms on it, WordPress is a good answer. If your site is a piece of software that happens to have pages, it is the wrong tool and no amount of plugins fixes that.</p>` },
    { h2: 'What Actually Makes a WordPress Site Slow', html: `
<p>In rough order of how often it is the cause:</p>
<ul>
<li><strong>Plugin sprawl.</strong> Each plugin adds queries, scripts and stylesheets, loaded on every page whether that page uses them or not. Twenty-eight plugins is not a configuration, it is an accumulation.</li>
<li><strong>A page builder.</strong> Convenient to edit, and it generates markup several layers deeper than necessary with its own CSS and JavaScript on every page. This is the single biggest structural cost.</li>
<li><strong>Images at original size.</strong> A 4,000-pixel photograph displayed in a 600-pixel box, with no modern format and no responsive sizes. Usually the largest single download on the page.</li>
<li><strong>A bloated theme.</strong> Multipurpose themes ship code for every layout they could produce, and load much of it regardless.</li>
<li><strong>No caching, or caching fighting a plugin.</strong> Two caching plugins is worse than one.</li>
<li><strong>Cheap shared hosting.</strong> Real, and last on the list, because the four items above usually cost more than the hosting does.</li>
</ul>
<div class="article-callout">Every item on that list is a decision, not a property of WordPress. That is the useful thing to know: a slow WordPress site is a fixable WordPress site.</div>`,
      band: { img: 'web1-floor-plan-sketch-markers.jpg', alt: 'A pencil floor plan marked up with highlighters', cap: 'Decide what the site has to do before choosing what builds it.' } },
    { h2: 'How to Build It So It Stays Good', html: `
<ul>
<li><strong>Start with a lean theme, or a purpose-built one.</strong> A block theme or a small custom theme beats a multipurpose one with a demo importer.</li>
<li><strong>Justify every plugin out loud.</strong> Name what it does and what breaks without it. Under ten is a reasonable target; each one actively maintained, with recent updates and a real support history.</li>
<li><strong>Handle images at upload.</strong> Sensible dimensions, modern formats, responsive sizes, and explicit width and height so nothing shifts as the page loads.</li>
<li><strong>Set the titles and meta properly.</strong> One good SEO plugin handles titles, descriptions, canonicals, sitemaps and structured data. You do not need a plugin per job, and you should not be editing theme files to add a title tag.</li>
<li><strong>Decide the update policy before launch.</strong> Who applies updates, how often, on what staging environment, and who tests afterwards. Write it down.</li>
<li><strong>Keep the code somewhere you own.</strong> Version control, and hosting in an account in your name. This is what makes leaving a decision rather than a negotiation.</li>
<li><strong>Measure on real devices.</strong> Core Web Vitals from real-user data, on a mid-range phone on mobile data, not a desktop lab score.</li>
</ul>` },
    { h2: 'The Editing Question Nobody Asks Early Enough', html: `
<p>The reason page builders win is that somebody has to be able to change the site next year without calling a developer. That is a legitimate requirement and it deserves a real answer rather than being discovered after launch.</p>
<p>There are three honest options. A <strong>block editor with well-defined blocks</strong>: your team edits within patterns a developer set up, which is flexible enough for most businesses and does not carry a builder&rsquo;s weight. A <strong>page builder, accepted knowingly</strong>: you trade page speed for editing freedom, which is a reasonable trade if you genuinely need the freedom and understand the cost. Or <strong>structured fields</strong>: editors fill in defined fields and cannot break the layout, which is the fastest and the least flexible.</p>
<p>Pick deliberately. The failure mode is choosing the third, then bolting on a builder eighteen months later because nobody asked who would be editing.</p>` },
    { h2: 'And When Not to Use WordPress', html: `
<p>We build custom sites and we also build WordPress sites, so this is not an argument for either. The dividing line in practice:</p>
<ul>
<li><strong>Use WordPress</strong> when the site is content, someone non-technical publishes regularly, and the functionality is standard.</li>
<li><strong>Use something custom</strong> when the site has a real data model, when users log in and do things, when it must talk to your ERP or your stock system, or when performance is a competitive requirement rather than a target.</li>
</ul>
<p>See <a href="/uk/website-development/">UK web development</a> for how we scope either, and <a href="/blog/custom-website-vs-template.html">custom versus template</a> for the wider comparison. If your answer is WordPress, that is a perfectly good answer and we will say so.</p>`,
      figures: [
        { img: 'web1-architect-drafting-with-ruler.jpg', alt: 'An architect working on a drawing with a pencil and ruler', cap: 'Decide who will edit the site before choosing how it is built.' },
        { img: 'web1-ruler-on-blueprints.jpg', alt: 'A ruler resting on a set of drawings', cap: 'That one question settles the theme, the editor and half the plugin list.' },
      ] },
  ],
  faqs: [
    { q: 'How do I make a WordPress website?', a: 'Decide what the site has to do and who will edit it, choose a lean theme rather than a multipurpose one, keep plugins under about ten with each one justified, handle images properly at upload, set titles and structured data with one good SEO plugin, and write down the update policy before launch. The order matters: the editing question settles most of the other decisions.' },
    { q: 'Is WordPress good for SEO?', a: 'Yes, when built properly. It produces clean URLs, handles titles and structured data well with one plugin, and publishes content easily. What harms SEO is what gets built on top: plugin sprawl, a heavy page builder, unoptimised images and no update policy. Those are decisions rather than properties of WordPress.' },
    { q: 'How many plugins is too many?', a: 'There is no hard number, but under ten is a reasonable target and every one should be justifiable out loud &mdash; what it does and what breaks without it. The problem is rarely a specific count; it is plugins accumulated over years, none actively maintained, all loading on every page whether used or not.' },
    { q: 'Why is my WordPress site slow?', a: 'In order of likelihood: too many plugins, a page builder generating deep markup with its own CSS and JavaScript, images served at original size, a bloated multipurpose theme, caching misconfigured or duplicated, and only then cheap hosting. The first four usually cost more than the hosting does.' },
    { q: 'When should I not use WordPress?', a: 'When the site has a genuinely complex custom data model, when users log in and perform actions (caching, which is what makes WordPress fast, does not help logged-in traffic), when it needs to integrate deeply with an ERP or stock system, or when it is really an application with pages attached rather than a site with functions attached.' },
  ],
  cta: WEB_CTA,
},

// ------------------------------------------------------------------ 4. Ecommerce in the UK
{
  slug: 'ecommerce-website-development-uk', cat: 'web', date: D,
  title: 'Ecommerce Website Development in the UK: What It Really Takes | TechAuditPros',
  desc: 'What an ecommerce build actually involves beyond the shop front: VAT and MTD, stock that matches reality, delivery and returns, the platform choice, and where the cost really goes.',
  eyebrow: 'Ecommerce',
  h1: 'Ecommerce Website Development in the UK',
  dek: 'The shop front is the easy part. What decides whether it works is stock accuracy, delivery promises you can keep, and VAT records that survive a return &mdash; none of which is visible on the page.',
  lead: { img: 'web1-holding-parcel-and-phone.jpg', alt: 'A parcel and a phone &mdash; the moment an ecommerce build is judged' },
  takeaways: [
    'The storefront is perhaps a third of the work. The rest is stock accuracy, delivery and returns, payments and VAT, and the operational plumbing behind them.',
    'Platform choice comes second, not first: decide the operational requirements &mdash; stock, fulfilment, VAT, integrations &mdash; and the platform choice usually makes itself.',
    'UK specifics that are not optional: VAT at the right rate per product with MTD-ready records, credit-note trails for returns, and post-Brexit customs data if you import or export.',
    'The most common expensive mistake: launching a shop whose stock figure does not match the shelf. Overselling costs more than a slow website ever will.',
  ],
  intro: '<strong>Ecommerce website development</strong> is usually discussed as though it were a design project with a checkout attached. In practice the storefront is about a third of the work. The rest is whether the stock figure on the page matches the shelf, whether the delivery promise can be kept, whether payments and VAT produce records that survive a return and an audit, and whether any of it talks to the systems you already run. Get those right and a plain shop sells. Get them wrong and a beautiful one generates complaints.',
  sections: [
    { h2: 'What an Ecommerce Build Actually Contains', html: `
<div class="article-table-wrap"><table>
<tr><th>Layer</th><th>What it covers</th><th>Rough share of the work</th></tr>
<tr><th>Storefront</th><td>Catalogue, search and filtering, product pages, basket, checkout</td><td>About a third</td></tr>
<tr><th>Stock &amp; pricing</th><td>Live availability, price rules, variants, bundles, backorders</td><td>Often the largest single piece</td></tr>
<tr><th>Fulfilment</th><td>Picking, packing, labels, tracking, partial shipments, returns</td><td>Consistently underestimated</td></tr>
<tr><th>Payments &amp; tax</th><td>Gateways, VAT per product, invoices, credit notes, refunds</td><td>Small to build, expensive to get wrong</td></tr>
<tr><th>Integrations</th><td>Accounting, ERP or stock system, couriers, marketplaces</td><td>Each one a small project of its own</td></tr>
<tr><th>Operations</th><td>Who processes an order, who handles a return, what happens at 5pm on Friday</td><td>Not development at all, and it decides whether the rest works</td></tr>
</table></div>
<div class="article-callout">Ask any prospective supplier how they will keep the stock figure on the product page true. The quality of that answer predicts the project.</div>` },
    { h2: 'The UK Parts That Are Not Optional', html: `
<ul>
<li><strong>VAT at the right rate, per product.</strong> Not everything is standard-rated: some goods are zero-rated or reduced, and getting it wrong is a liability that accrues quietly with every sale.</li>
<li><strong>Making Tax Digital records.</strong> Digital records from order through invoice, feeding the accounting package that files. The shop is a source of records, not the filer.</li>
<li><strong>Returns that produce a credit-note trail.</strong> Consumer rights mean returns are normal, not exceptional. A refund that does not generate a matching credit note is a reconciliation problem every month.</li>
<li><strong>Post-Brexit customs, if you cross a border.</strong> Commodity codes, country of origin, duty and import VAT captured on the purchase and carried into landed cost &mdash; otherwise your margin is a guess.</li>
<li><strong>Consumer information duties.</strong> Clear pricing including VAT, delivery costs before checkout, cancellation rights, and honest stock statements.</li>
<li><strong>UK GDPR and PECR.</strong> Lawful basis for marketing consent, a cookie approach that is actually compliant, and retention that ends in deletion.</li>
</ul>
<p>Confirm current VAT rates and consumer-rights detail with HMRC or your accountant rather than with any article, including this one. What does not change is that these belong in the build rather than being bolted on afterwards.</p>` },
    { h2: 'Choosing the Platform &mdash; Second, Not First', html: `
<p>Platform arguments are the most enjoyable part of an ecommerce project and the least useful place to start. Decide the operational requirements first and the choice usually narrows itself.</p>
<div class="article-table-wrap"><table>
<tr><th>Option</th><th>Where it wins</th><th>Where it strains</th></tr>
<tr><th>Hosted platform</th><td>Fast to launch, someone else handles security and PCI scope, large app ecosystem</td><td>Per-transaction and per-app costs compound; unusual logic means fighting the platform</td></tr>
<tr><th>WordPress with WooCommerce</th><td>Content-heavy shops, full control, no per-transaction cut</td><td>You own performance and security; large catalogues need real care</td></tr>
<tr><th>Custom build</th><td>Unusual pricing or fulfilment rules, deep ERP integration, performance as a differentiator</td><td>Slower to launch and you own everything, including PCI scope decisions</td></tr>
<tr><th>Headless</th><td>Multiple channels from one catalogue, editorial and shop as one experience</td><td>More moving parts, more to maintain, rarely justified below real scale</td></tr>
</table></div>
<p>For most UK SMEs the honest answer is a hosted platform or WooCommerce, with the effort going into stock accuracy and fulfilment rather than the storefront. Custom earns its place when the pricing or fulfilment logic is genuinely yours &mdash; trade pricing tiers, made-to-order items, split shipments from multiple locations.</p>`,
      band: { img: 'web1-two-in-store-with-tablet.jpg', alt: 'Two people in a shop checking stock on a tablet', cap: 'If the number on the page is not the number on the shelf, nothing else matters.' } },
    { h2: 'Where the Money Actually Goes', html: `
<p>We do not publish our own fees. What is worth knowing is which lines surprise people, because it is rarely the design.</p>
<ul>
<li><strong>Product data.</strong> Getting a catalogue clean, consistent and complete &mdash; variants, dimensions, weights, images, tax codes &mdash; is frequently the largest single cost, and it is your data, so nobody else can do it alone.</li>
<li><strong>Integrations, per system.</strong> Accounting, stock, courier, marketplace. Each has its own quirks, rate limits and failure modes.</li>
<li><strong>Returns and edge cases.</strong> Partial refunds, exchanges, replacements, lost parcels. Easy to leave out of scope, and then handled by hand forever.</li>
<li><strong>Ongoing per-transaction costs.</strong> Payment fees, platform commission, app subscriptions. On a hosted platform these can exceed the build cost within a couple of years, which is worth modelling before you choose.</li>
<li><strong>The photography.</strong> Not development, and it does more for conversion than most development does.</li>
</ul>` },
    { h2: 'The Long Tail Point, Since People Ask', html: `
<p><strong>Long-tail ecommerce</strong> means most of your revenue coming from many low-volume products rather than a few bestsellers. If that is your shape &mdash; spares, specialist components, wide catalogues &mdash; three things follow.</p>
<p>Product pages have to earn their own traffic, because nobody browses to a specific bracket; they search for it. That means genuinely useful product content: specifications, compatibility, dimensions, what it fits, what it replaces. Second, search and filtering inside your own site matters more than the homepage, because visitors arrive mid-catalogue and need to find the adjacent thing. Third, stock accuracy becomes critical rather than important: with thousands of lines, overselling is a systems problem, not a diligence problem.</p>
<p>This is also where ERP integration stops being optional &mdash; see <a href="/blog/mrp-vs-erp-vs-wms.html">MRP, ERP and WMS</a> and <a href="/uk/erp/">custom ERP for UK businesses</a>. For the build itself, <a href="/uk/website-development/">UK web development</a>.</p>`,
      figures: [
        { img: 'web1-paper-bags-on-table.jpg', alt: 'Paper bags packed and ready to go out', cap: 'Packing, labels and partial shipments are underestimated on every project.' },
        { img: 'web1-carrying-a-parcel.jpg', alt: 'Carrying a delivered parcel', cap: 'And returns are normal, not exceptional.' },
      ] },
  ],
  faqs: [
    { q: 'What is an ecommerce website?', a: 'A site that sells directly: a catalogue, product pages, a basket and a checkout, plus the operational layer behind them &mdash; stock, pricing, payments, tax records, fulfilment and returns. The storefront is roughly a third of the work; the rest decides whether the shop actually functions.' },
    { q: 'How much does an ecommerce website cost in the UK?', a: 'It depends far more on your catalogue and integrations than on the design. The lines that surprise people are cleaning and completing product data, one small project per integration, handling returns and edge cases properly, and ongoing per-transaction and per-app costs, which on a hosted platform can exceed the build cost within a couple of years.' },
    { q: 'How do I build an ecommerce website?', a: 'Decide the operational requirements first &mdash; how stock stays accurate, how orders are fulfilled, how VAT and returns are recorded, what it must integrate with &mdash; and the platform choice usually narrows itself. Then get the product data clean, because that is normally the biggest single piece of work and only you can supply it.' },
    { q: 'Which platform is best for a UK ecommerce site?', a: 'For most SMEs, a hosted platform or WooCommerce, with the effort spent on stock accuracy and fulfilment rather than the storefront. A custom build earns its place when the pricing or fulfilment logic is genuinely yours &mdash; trade tiers, made-to-order items, split shipments &mdash; or when it must integrate deeply with an ERP.' },
    { q: 'What is long-tail ecommerce?', a: 'When most revenue comes from many low-volume products rather than a few bestsellers &mdash; spares, specialist components, wide catalogues. It changes three things: product pages must earn their own search traffic with real specifications, on-site search and filtering matter more than the homepage, and stock accuracy becomes a systems requirement rather than a matter of diligence.' },
  ],
  cta: WEB_CTA,
},
];
