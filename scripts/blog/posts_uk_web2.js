'use strict';
// UK blog wave 3, posts 5-8 — the four replacements for topics that already had genuine posts.
//
//   5 what does a web developer do 210/26 + what does a web designer do 170/25 + graphic design in
//     web 210/31 + web designer wordpress 140/19                                       (~730/mo)
//   6 how to structure a website 170/39 + how do you create your own website 170/0 + how to set up
//     a internet site 390/40                                                            (~730/mo)
//   7 what is this website built with 170/34 + what was this website built with 170/32   (340/mo)
//   8 web development services 3,600/38 + web development service 720/28 + web page development
//     services 320/25 + web developer company 390/36 + website developer uk 390/38    (~5,420/mo,
//     head term is hard so the page targets the buying-guide tail)
const D = '2026-09-04';
const WEB_CTA = { h3: 'Not sure which of these you actually need?', p: 'Book a free strategy call. We look at what you have and tell you which of these jobs would move the needle for you &mdash; and which you can safely ignore this year.' };

module.exports = [
// ------------------------------------------------------------------ 5. Developer vs designer
{
  slug: 'what-does-a-web-developer-do', cat: 'web', date: D,
  title: 'What Does a Web Developer Do? And How Is It Different From a Designer? | TechAuditPros',
  desc: 'What a web developer actually does day to day, how front end differs from back end, what a web designer does instead, and which one you need for the job you have in mind.',
  eyebrow: 'Roles Explained',
  h1: 'What Does a Web Developer Do?',
  dek: 'Two different crafts, frequently sold as one, and hiring the wrong one is the most common reason a website project disappoints.',
  lead: { img: 'web2-two-working-in-creative-office.jpg', alt: 'Two colleagues working together in a design and development studio' },
  takeaways: [
    'A <strong>web developer</strong> builds: they write the code that makes a site work. A <strong>web designer</strong> decides how it should look and behave before that code exists.',
    'Front-end developers build what you see and interact with. Back-end developers build what happens after you press the button.',
    'Most website disappointments trace to hiring one when you needed the other &mdash; a beautiful site nobody can use, or a functional site nobody trusts.',
    'For a small project one person often does both competently. Past a certain complexity, wanting one person to do both is how you get a compromise on each.',
  ],
  intro: 'A <strong>web developer</strong> writes the code that makes a website or application work. A <strong>web designer</strong> decides what it should look like, how it should be laid out and how someone moves through it &mdash; before any of that code exists. They are related crafts with different training, different tools and different judgement, and they are routinely sold under one heading. Knowing which you need is worth more than any amount of comparing portfolios.',
  sections: [
    { h2: 'What Each One Actually Does', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Web designer</th><th>Web developer</th></tr>
<tr><th>Decides</th><td>Layout, hierarchy, type, colour, how a journey feels</td><td>How it is built, what it runs on, how it performs and scales</td></tr>
<tr><th>Produces</th><td>Wireframes, prototypes, a design system, specifications</td><td>Working code, in version control, deployed</td></tr>
<tr><th>Worries about</th><td>Whether someone can find the thing they came for</td><td>Whether it still works on a slow phone, under load, next year</td></tr>
<tr><th>Typical tools</th><td>Figma, prototyping tools, type and colour systems</td><td>HTML, CSS, JavaScript, a framework, a database, Git, a deployment pipeline</td></tr>
<tr><th>Fails visibly as</th><td>A site that looks good and buries the contact details</td><td>A site that works and looks like a 2009 admin panel</td></tr>
<tr><th>You need them when</th><td>Nobody has decided what the site should be</td><td>Something has to be built, integrated or made fast</td></tr>
</table></div>
<div class="article-callout">The clean test: if your problem is &ldquo;we do not know what this should look like or how it should work&rdquo;, that is design. If it is &ldquo;we know what we want and it does not exist yet&rdquo;, that is development.</div>` },
    { h2: 'Front End and Back End', html: `
<p>Within development the split matters, because it changes who you need.</p>
<ul>
<li><strong>Front end</strong> is everything in the browser: the markup, the styling, the interaction, accessibility, and how fast it renders on a mid-range phone. A front-end developer turns a design into something real that behaves properly on every screen size and for someone using a keyboard or a screen reader.</li>
<li><strong>Back end</strong> is everything behind it: the database, the business logic, authentication and permissions, integrations with other systems, and the API the front end talks to. A back-end developer decides what happens after the form is submitted &mdash; and whether it can be trusted.</li>
<li><strong>Full stack</strong> means someone works across both. Genuinely useful on small and mid-sized projects. On large ones it usually means one of the two halves is weaker, which is fine as long as everyone knows which.</li>
<li><strong>DevOps or platform</strong> is the deployment, hosting, monitoring and security layer. On a small project the developer covers it; at scale it is a job of its own.</li>
</ul>
<p>A brochure site with a contact form needs front-end skill and very little back end. A customer portal that shows live order status is mostly back end with a front end attached. Those are different hires.</p>`,
      band: { img: 'web2-three-at-tables-working.jpg', alt: 'Three colleagues working at adjoining desks', cap: 'Two crafts, frequently sold as one.' } },
    { h2: 'What a Web Developer Does in a Normal Week', html: `
<p>Since the job title tells you almost nothing, here is the actual shape of it. Perhaps a third of the time is writing new code. The rest divides between reading existing code to understand it before changing it, fixing things that broke for reasons nobody predicted, reviewing someone else&rsquo;s work, and the unglamorous business of deployment, dependency updates and making the same thing work on a browser that disagrees.</p>
<p>Two implications worth drawing out, because they explain a lot about estimates. First, changing existing code is usually slower than writing new code, because understanding comes first &mdash; which is why &ldquo;it is only a small change&rdquo; is often wrong. Second, most of the cost of software is incurred after it is first built, which is why decisions that make code easy to read later are not fussiness.</p>` },
    { h2: 'Which One Do You Actually Need?', html: `
<div class="article-table-wrap"><table>
<tr><th>What you want</th><th>Who you need</th></tr>
<tr><th>A new site and no clear idea what it should be</th><td>Designer first, then developer. Doing it the other way round means building twice</td></tr>
<tr><th>A design already signed off, needing to be built</th><td>Front-end developer</td></tr>
<tr><th>A form that writes into your system</th><td>Back-end developer</td></tr>
<tr><th>A customer portal or dashboard</th><td>Back end, with front-end help. This is software, not a website</td></tr>
<tr><th>An existing site that is slow</th><td>Front-end developer, and possibly hosting. Not a designer</td></tr>
<tr><th>An existing site that nobody converts on</th><td>Designer, and honest analytics. Not more code</td></tr>
<tr><th>WordPress set up properly for a team to edit</th><td>Someone who genuinely does both &mdash; see <a href="/blog/wordpress-website-done-properly.html">WordPress done properly</a></td></tr>
</table></div>
<p>The two rows in the middle of that table are the ones people get wrong most often, and in opposite directions: paying a developer to fix a conversion problem, or paying a designer to fix a speed problem. Both produce a tidy invoice and no change in outcome.</p>` },
    { h2: 'And Where Graphic Design Fits', html: `
<p>Graphic design and web design overlap and are not the same. A graphic designer works with composition, type and brand, usually for a fixed canvas &mdash; a page, a poster, an identity. Web design has to work at any width, on any device, for someone who may be using a keyboard, a screen reader or a poor connection, and every element has states: hover, focus, disabled, loading, error.</p>
<p>A strong graphic designer produces something beautiful. Whether it survives being built depends on whether they have designed for the web before &mdash; whether the type scale works at 390 pixels, whether the contrast passes, whether there is a design for the empty state and the error state. When a build goes slowly, this is very often why: the design was drawn rather than specified.</p>
<p>If you want both handled by one team that has to live with the result, that is what we do &mdash; see <a href="/uk/website-development/">UK web development</a>.</p>`,
      figures: [
        { img: 'web2-working-at-laptop-table.jpg', alt: 'Working at a laptop at a studio table', cap: 'A design that is drawn, not specified, is where builds slow down.' },
        { img: 'web2-desk-laptop-and-clipboard.jpg', alt: 'A desk with a laptop and a clipboard of notes', cap: 'Ask for the empty state, the error state and the 390px layout.' },
      ] },
  ],
  faqs: [
    { q: 'What does a web developer do?', a: 'Writes and maintains the code that makes a website or application work. In a normal week that is roughly a third new code and the rest reading existing code before changing it, fixing unexpected breakages, reviewing others&rsquo; work, and handling deployment, dependency updates and browser differences.' },
    { q: 'What is the difference between a web designer and a web developer?', a: 'A designer decides what the site should look like and how someone moves through it, and produces wireframes, prototypes and specifications. A developer builds it in code and makes it work, perform and integrate. If you do not yet know what the site should be, you need design first; if you know and it does not exist, you need development.' },
    { q: 'What does a web designer do?', a: 'Decides layout, visual hierarchy, type, colour and the shape of the user journey, then specifies it well enough to be built &mdash; including the states people forget: hover, focus, loading, empty and error. On the web that also means designing for any screen width and for keyboard and screen-reader use.' },
    { q: 'What is the difference between front end and back end?', a: 'Front end is everything in the browser: markup, styling, interaction, accessibility and rendering speed. Back end is everything behind it: database, business logic, authentication, permissions and integrations. A brochure site is mostly front end; a customer portal is mostly back end with a front end attached.' },
    { q: 'Do I need a designer and a developer, or will one person do?', a: 'For a small site, one capable person often does both well. Past a certain complexity, wanting one person to cover both usually means accepting a compromise on one of them &mdash; which is fine if you choose which, and a problem if you discover it at the end.' },
  ],
  cta: WEB_CTA,
},

// ------------------------------------------------------------------ 6. How to structure a website
{
  slug: 'how-to-structure-a-website', cat: 'web', date: D,
  title: 'How to Structure a Website: Pages, URLs and Navigation | TechAuditPros',
  desc: 'How to decide what pages a website needs, how to nest them, what URLs should look like, and how to build a structure that still makes sense after three years of additions.',
  eyebrow: 'Site Structure',
  h1: 'How to Structure a Website',
  dek: 'Structure is decided once and lived with for years. Get it right and adding a page is obvious; get it wrong and every addition is an argument.',
  lead: { img: 'web2-wall-of-labelled-drawers.jpg', alt: 'A wall of labelled drawers where everything has one obvious place' },
  takeaways: [
    'Start from what people are trying to do, not from your organisation chart. Sites structured around internal departments confuse everyone outside the building.',
    'Keep it shallow. Any page a customer needs should be reachable in about three clicks from the homepage.',
    'URLs should be lowercase, hyphenated, readable, and describe the page. Once published, changing one costs you a redirect and some risk &mdash; so decide the pattern before you build.',
    'The test of a structure is not launch day. It is whether a new page has one obvious home in three years&rsquo; time.',
  ],
  intro: 'A website&rsquo;s structure is the set of decisions about what pages exist, how they nest, what the URLs look like and how someone navigates between them. It gets decided quickly at the start of a project and then lived with for years, which is a poor ratio of thought to consequence. A good structure makes adding a page obvious. A bad one makes every addition a debate about where it goes, and eventually produces the miscellaneous section that nobody can navigate.',
  sections: [
    { h2: 'Start From Intent, Not From Your Org Chart', html: `
<p>The most common structural mistake is organising a site the way the business is organised. Visitors do not know your departments and do not care which team owns which service. They arrive with a task.</p>
<p>So begin by writing down the five or six things people actually come to do. For a business like ours that is roughly: work out whether you can solve my problem; see whether you have done it for someone like me; understand roughly what it involves; check you are real; and get in touch. Every page should serve one of those, and a page that serves none of them is a page to question.</p>
<div class="article-callout">If you cannot say which visitor task a page serves, that is not a structural problem with the site. It is a page that should not exist.</div>` },
    { h2: 'The Shape That Works for Most Businesses', html: `
<div class="article-table-wrap"><table>
<tr><th>Level</th><th>What lives there</th><th>Example</th></tr>
<tr><th>Home</th><td>What you do, for whom, and the three routes onward</td><td><code>/</code></td></tr>
<tr><th>Service or product hubs</th><td>One page per thing you sell, deep enough to answer the buying questions</td><td><code>/uk/erp/</code></td></tr>
<tr><th>Segment pages</th><td>Only where the need is genuinely different &mdash; a market, a sector, a place</td><td><code>/uk/manchester/</code></td></tr>
<tr><th>Proof</th><td>Results, case studies, credentials</td><td><code>/results/</code></td></tr>
<tr><th>Knowledge</th><td>Articles that answer real questions and link up to the service they support</td><td><code>/blog/&hellip;</code></td></tr>
<tr><th>Trust &amp; admin</th><td>About, contact, privacy, terms</td><td><code>/contact/</code></td></tr>
</table></div>
<p>Two rules keep this honest. <strong>Depth:</strong> anything a customer needs should be about three clicks from the homepage; if something is five levels down, either it does not matter or your categories are wrong. <strong>Breadth:</strong> a navigation menu with fourteen top-level items is not a structure, it is a list &mdash; group until it is five to seven.</p>
<p>And segment pages only where the need genuinely differs. Duplicating a page per town with the name swapped is the single most common way to build a structure that neither people nor search engines respect.</p>` },
    { h2: 'URLs: Decide the Pattern Before You Build', html: `
<ul>
<li><strong>Readable and descriptive.</strong> <code>/uk/website-development/</code> tells a person and a crawler what is there. <code>/page?id=4471</code> tells neither.</li>
<li><strong>Lowercase, hyphenated, no spaces or underscores.</strong> Boring and universally understood.</li>
<li><strong>Short, but not cryptic.</strong> Drop filler words; keep the meaning.</li>
<li><strong>Reflect the hierarchy, once.</strong> <code>/uk/erp/</code> is useful. <code>/services/software/erp/systems/uk/custom/</code> is a filing accident.</li>
<li><strong>No dates in evergreen URLs.</strong> A guide with 2024 in its URL looks stale in 2026 even after you update it.</li>
<li><strong>Pick a trailing-slash convention and enforce it,</strong> with the other form redirecting. Two URLs serving one page is a duplicate you created yourself.</li>
<li><strong>Do not put the format in the path</strong> unless it is genuinely a file. <code>.html</code> in a URL commits you to a technology choice for as long as the URL lives.</li>
</ul>
<p>The reason to settle this before building: once a URL is published and linked, changing it costs a redirect and a little risk every time. It is the cheapest decision to get right and one of the more annoying to reverse. See <a href="/blog/redesign-website-without-losing-seo.html">redesigning without losing SEO</a> for what that reversal involves.</p>`,
      band: { img: 'web2-rows-of-filing-cabinets-room.jpg', alt: 'A room filled with rows of filing cabinets', cap: 'A structure is judged in three years, not on launch day.' } },
    { h2: 'Navigation, Breadcrumbs and Internal Links', html: `
<p>Three different jobs, often conflated.</p>
<ul>
<li><strong>The main navigation</strong> is for the handful of routes most people need. It is not a site map, and it should not contain everything.</li>
<li><strong>Breadcrumbs</strong> tell someone who arrived from search where they have landed and what the parent category is. On a site more than two levels deep they are genuinely useful, and BreadcrumbList structured data makes them useful to search engines too.</li>
<li><strong>Internal links in the body</strong> carry the real weight: they route people to the next thing and pass authority between your pages. This is the part most sites leave entirely to the template &mdash; see <a href="/blog/internal-linking-and-nofollow.html">internal linking done properly</a>.</li>
<li><strong>The footer</strong> is where the long tail belongs: everything legitimate that does not deserve main navigation.</li>
</ul>
<p>One check worth running: pick your three most commercially important pages and count how many internal links point at each. If the answer is one, the structure is not supporting them regardless of how the menu looks.</p>` },
    { h2: 'The Three-Year Test', html: `
<p>Every structure looks fine at launch, when the page count matches the plan. The real test is what happens as things get added, so run it in advance:</p>
<ul>
<li><strong>A new service launches.</strong> Does it have one obvious home, or does it need a new top-level item?</li>
<li><strong>You expand to a new market.</strong> Does the pattern extend, or does it require a parallel structure?</li>
<li><strong>Fifty articles get published.</strong> Are they findable by subject, or only by date?</li>
<li><strong>A service is retired.</strong> Is it clear what to redirect it to?</li>
<li><strong>Someone joins and has to add a page.</strong> Could they work out where it goes without asking?</li>
</ul>
<p>If the answer to the last one is no, the structure will decay no matter how carefully it was drawn. Write the rule down &mdash; where things go and why &mdash; and keep it with the site. See <a href="/uk/website-development/">UK web development</a> for how we settle this before design starts.</p>`,
      figure: { img: 'web2-wooden-drawer-detail.jpg', alt: 'A labelled wooden drawer in a filing system', cap: 'The real question: could someone who joined last week work out where a new page goes, without asking anyone?' } },
  ],
  faqs: [
    { q: 'How should I structure a website?', a: 'Start from the five or six things visitors are actually trying to do, not from your internal departments. Give each thing you sell one deep hub page, add segment pages only where the need genuinely differs, keep anything a customer needs within about three clicks, and group the main navigation down to five to seven items.' },
    { q: 'How many levels deep should a website be?', a: 'Anything a customer needs should be reachable in about three clicks from the homepage. If a page sits five levels down, either it does not matter enough to exist or your categories are wrong. Depth also shows up in URLs &mdash; a path with six segments is usually a filing accident.' },
    { q: 'What should website URLs look like?', a: 'Lowercase, hyphenated, readable, and descriptive of the page. Reflect the hierarchy once, keep them short without being cryptic, avoid dates in evergreen URLs, pick one trailing-slash convention and redirect the other, and avoid committing to a file format in the path. Decide the pattern before building, because changing a published URL costs a redirect and some risk.' },
    { q: 'How do I create my own website structure from scratch?', a: 'Write down the tasks visitors arrive with. List every page you think you need and delete any that serves none of those tasks. Group what remains into five to seven top-level areas. Draw the URL pattern. Then apply the three-year test: could a new colleague work out where a new page goes without asking?' },
    { q: 'Do breadcrumbs matter?', a: 'On a site more than two levels deep, yes &mdash; they tell someone who arrived from search where they have landed and what the parent category is, and BreadcrumbList structured data makes that legible to search engines. On a flat five-page site they add little.' },
  ],
  cta: WEB_CTA,
},

// ------------------------------------------------------------------ 7. What is this site built with
{
  slug: 'what-is-this-website-built-with', cat: 'web', date: D,
  title: 'What Is This Website Built With? How to Check Any Site&rsquo;s Stack | TechAuditPros',
  desc: 'How to work out what platform, framework, hosting and analytics any website uses &mdash; using nothing but a browser &mdash; and what the answer tells you before you hire a developer or buy a competitor&rsquo;s idea.',
  eyebrow: 'Inspecting a Site',
  h1: 'What Is This Website Built With?',
  dek: 'You can work out most of a site&rsquo;s stack in about two minutes with a browser you already have. Here is where to look, and what each finding actually implies.',
  lead: { img: 'web2-magnifier-on-printed-text.jpg', alt: 'A magnifying glass over printed text, which is roughly what viewing source is' },
  takeaways: [
    'Almost everything is visible: view source and the network tab reveal the platform, the framework, the CDN, the fonts, the analytics and often the hosting.',
    'Four checks cover most of it: the page source, the response headers, the network requests, and the file paths.',
    'It is worth doing before hiring a developer (to know what skills you need), before copying a competitor (to know what it would cost), and before buying a site.',
    'What you cannot see: the database, the back-end language in most cases, and anything server-side. Any tool claiming certainty about those is guessing.',
  ],
  intro: 'You can usually work out <strong>what a website is built with</strong> in a couple of minutes, using nothing but the browser you already have. The front end of a site has to be sent to your computer in order to display, which means the platform, the framework, the fonts, the analytics and often the hosting are all sitting there in plain sight. This is useful before you hire a developer, before you decide to copy something a competitor has done, and before you buy a website from anybody.',
  sections: [
    { h2: 'The Four Checks', html: `
<div class="article-table-wrap"><table>
<tr><th>Where to look</th><th>How</th><th>What it tells you</th></tr>
<tr><th>Page source</th><td>Right-click &rarr; View page source</td><td>Generator meta tags, framework fingerprints, script and stylesheet names, inline configuration</td></tr>
<tr><th>Response headers</th><td>Developer tools &rarr; Network &rarr; click the document &rarr; Headers</td><td>Server, CDN, caching, security headers, sometimes the platform outright</td></tr>
<tr><th>Network requests</th><td>Developer tools &rarr; Network, reload the page</td><td>Every third-party service: analytics, tag managers, chat widgets, fonts, payment scripts</td></tr>
<tr><th>File paths</th><td>Read the URLs of the CSS and JavaScript files</td><td>Platform conventions give it away almost immediately</td></tr>
</table></div>
<p>Developer tools open with F12 in most browsers, or Ctrl+Shift+I. On a Mac, Cmd+Option+I. That is the entire toolkit.</p>` },
    { h2: 'The Fingerprints Worth Knowing', html: `
<ul>
<li><strong>WordPress:</strong> paths containing <code>/wp-content/</code> or <code>/wp-includes/</code>. Conclusive, and the theme name is usually in the path too. A <code>generator</code> meta tag often names the version.</li>
<li><strong>Shopify:</strong> requests to <code>cdn.shopify.com</code>, and a global configuration object in the source.</li>
<li><strong>Wix, Squarespace, Webflow:</strong> each loads its own distinctive asset domains and script bundles, and they are hard to disguise.</li>
<li><strong>React, Vue, Angular:</strong> a mostly empty HTML body with a single root element and a large JavaScript bundle. Framework names frequently appear in the bundle filenames.</li>
<li><strong>Next.js:</strong> a <code>/_next/</code> path and a <code>__NEXT_DATA__</code> script block. Nuxt and SvelteKit have equivalents.</li>
<li><strong>Static sites:</strong> plain HTML that already contains the content, few or no framework bundles, and no server fingerprint. Fast, and much less to attack.</li>
<li><strong>The CDN and host:</strong> often in a response header &mdash; a <code>server</code>, <code>x-vercel-id</code>, <code>cf-ray</code> or similar tells you who is serving it.</li>
<li><strong>Analytics and tags:</strong> visible in the network tab by hostname. This is also how you see how many third-party scripts a site loads, which is usually the reason it is slow.</li>
</ul>
<div class="article-callout">Browser extensions will report all of this in one click. They are convenient and they guess, especially about anything server-side. The four manual checks are slower and correct.</div>`,
      band: { img: 'web2-inspecting-mechanism-with-loupe.jpg', alt: 'Inspecting a small mechanism through a magnifier', cap: 'The front end has to be sent to your computer. So it is all there to read.' } },
    { h2: 'What You Cannot See', html: `
<p>Worth being clear about, because tools imply more certainty than they have. The database is invisible. The back-end language is usually invisible unless a header or a file extension leaks it. Server-side business logic, integrations and internal architecture are all invisible by design &mdash; and if any of that were visible, it would be a security problem rather than a research opportunity.</p>
<p>So a stack-detection tool telling you a site &ldquo;uses PHP and MySQL&rdquo; is often inferring from the platform rather than observing. That inference is usually right for WordPress and frequently wrong for anything custom.</p>` },
    { h2: 'Why It Is Worth Doing', html: `
<ul>
<li><strong>Before hiring.</strong> If your site is WordPress you need someone who knows WordPress properly, not a React developer. Knowing the stack turns a vague brief into a specific one.</li>
<li><strong>Before copying a competitor.</strong> A rival&rsquo;s slick interaction might be a hosted platform feature you could switch on this afternoon, or six weeks of custom work. The network tab tells you which before you commission anything.</li>
<li><strong>Before buying a site or a business.</strong> Check the platform, whether it is a current version, how many third-party dependencies it carries, and whether the hosting is somewhere transferable. This is basic diligence and it takes ten minutes.</li>
<li><strong>When your own site is slow.</strong> Look at your own network tab and count the third-party requests. The answer is frequently visible in thirty seconds &mdash; see <a href="/blog/wordpress-website-done-properly.html">what actually makes a site slow</a>.</li>
<li><strong>When a developer&rsquo;s explanation does not add up.</strong> You can check the claim yourself, which changes the conversation.</li>
</ul>` },
    { h2: 'A Two-Minute Routine', html: `
<p>The order that gets the most information fastest:</p>
<ul>
<li><strong>Open developer tools, go to Network, reload.</strong> Sort by domain. Everything third party is now listed.</li>
<li><strong>Click the first request &mdash; the document itself &mdash; and read the response headers.</strong> Server, CDN, cache, security headers.</li>
<li><strong>View source and search for <code>generator</code>, <code>wp-</code>, <code>_next</code>, <code>shopify</code>.</strong> Four searches, most platforms identified.</li>
<li><strong>Look at the stylesheet and script paths.</strong> Theme names, framework names, build hashes.</li>
<li><strong>Count the total requests and the transferred size.</strong> This is the single best predictor of whether the site feels fast.</li>
</ul>
<p>Do that on your own site first. Most people are surprised by how many third-party scripts they are shipping, and that list is usually the cheapest performance win available. If you would like someone to do it properly and write it down, that is part of what our audit covers &mdash; see <a href="/uk/website-development/">UK web development</a>.</p>`,
      figures: [
        { img: 'web2-magnifier-over-open-book.jpg', alt: 'A magnifying glass held over an open book', cap: 'Four searches in the source identify most platforms.' },
        { img: 'web2-magnifier-on-desk.jpg', alt: 'A magnifying glass on a working desk', cap: 'Then count the requests. That predicts how fast it feels.' },
      ] },
  ],
  faqs: [
    { q: 'How do I find out what a website is built with?', a: 'Four checks with the browser you already have: view the page source for generator tags and framework fingerprints, read the document&rsquo;s response headers in developer tools for server and CDN, watch the network tab on reload for every third-party service, and read the CSS and JavaScript file paths, which give away the platform almost immediately.' },
    { q: 'How can I tell if a site uses WordPress?', a: 'Look for paths containing /wp-content/ or /wp-includes/ in the page source &mdash; that is conclusive, and the theme name is usually in the path as well. A generator meta tag often names the version too, which is itself worth noticing: an old version on a live site is a security finding.' },
    { q: 'Can I see what programming language a website uses?', a: 'Usually not. The front end has to be sent to your browser so it is fully visible, but the back-end language, the database and the server-side logic are invisible by design. Tools that report them are generally inferring from the platform &mdash; often right for WordPress, frequently wrong for anything custom.' },
    { q: 'Are website technology checker extensions accurate?', a: 'Accurate about the front end, which is observable, and guessing about anything server-side. They are convenient for a first look; the four manual checks are slower and give you facts rather than inferences. Treat any claim about a database or back-end language as a guess.' },
    { q: 'Why would I want to know a competitor&rsquo;s stack?', a: 'Because it tells you what their capability would cost you. An impressive feature might be a hosted-platform toggle or six weeks of custom development, and the network tab distinguishes the two before you commission anything. It also shows how many third-party scripts they carry, which explains a lot about their page speed and yours.' },
  ],
  cta: WEB_CTA,
},

// ------------------------------------------------------------------ 8. Web development services
{
  slug: 'web-development-services-what-you-buy', cat: 'web', date: D,
  title: 'Web Development Services: What You Are Actually Buying | TechAuditPros',
  desc: 'What web development services include, how to compare quotes that describe different work, the questions that expose a weak supplier, and what you should own at the end of the project.',
  eyebrow: 'Buying Development',
  h1: 'Web Development Services: What You Are Actually Buying',
  dek: 'Two quotes at the same figure routinely describe completely different work. Here is how to make them comparable, and what has to be in writing before you sign.',
  lead: { img: 'web2-handshake-over-paperwork.jpg', alt: 'A handshake over a signed document' },
  takeaways: [
    'A web development engagement has eight parts: discovery, design, build, content, integrations, testing, launch and aftercare. Quotes routinely include four of them and imply the rest.',
    'The single question that makes quotes comparable: which of those eight are included, and who does the ones that are not?',
    'What you should own at the end: the code in your repository, the hosting in your account, the domain in your name, and the content in a portable format. If not, leaving later is a rebuild.',
    'The clearest quality signal is not a portfolio. It is whether a supplier will show you work in progress every week and tell you what went wrong.',
  ],
  intro: '<strong>Web development services</strong> covers everything from a five-page brochure site to an application with a login. Because the label is so wide, two quotes at the same price frequently describe entirely different work &mdash; one including content, testing and a year of aftercare, the other including a build and an invoice. This is a buying guide: the eight parts of the job, how to compare offers honestly, and what has to be in writing before you commit.',
  sections: [
    { h2: 'The Eight Parts of the Job', html: `
<div class="article-table-wrap"><table>
<tr><th>Part</th><th>What it involves</th><th>Commonly missing from quotes?</th></tr>
<tr><th>1. Discovery</th><td>What the site must do, for whom, what success looks like, and the structure that follows</td><td>Often, and it is the part that decides everything else</td></tr>
<tr><th>2. Design</th><td>Layout, hierarchy, responsive behaviour, and the states people forget &mdash; empty, loading, error</td><td>Sometimes only the desktop homepage is designed</td></tr>
<tr><th>3. Build</th><td>The front end, the back end, the CMS, the deployment pipeline</td><td>Rarely missing; this is what people think they are buying</td></tr>
<tr><th>4. Content</th><td>Writing and migrating the actual words and images</td><td><strong>Very often.</strong> The most common reason launches slip</td></tr>
<tr><th>5. Integrations</th><td>Forms, CRM, payments, accounting, ERP, couriers, analytics</td><td>Frequently listed as &ldquo;standard integrations&rdquo; without naming any</td></tr>
<tr><th>6. Testing</th><td>Real devices, keyboard and screen-reader use, forms, performance under a throttled connection</td><td>Often assumed rather than specified</td></tr>
<tr><th>7. Launch</th><td>Redirects, DNS, sitemap, analytics, monitoring, and a rollback plan</td><td>The redirect map is the piece that gets skipped &mdash; see <a href="/blog/redesign-website-without-losing-seo.html">redesign without losing SEO</a></td></tr>
<tr><th>8. Aftercare</th><td>Bug fixes, security patching, backups, and someone to call</td><td>Usually a separate retainer &mdash; see <a href="/blog/what-website-maintenance-includes.html">what maintenance includes</a></td></tr>
</table></div>
<div class="article-callout">Send every supplier that table and ask them to mark which rows are in their price and who does the rest. The differences between quotes stop being mysterious immediately.</div>` },
    { h2: 'Where Projects Actually Go Wrong', html: `
<ul>
<li><strong>Content.</strong> The build finishes and the site waits three months for the words. Decide early who writes them, and put a date on it.</li>
<li><strong>Approval by committee.</strong> Every extra approver adds a round of revisions. Name one decision-maker in writing.</li>
<li><strong>Discovering an integration late.</strong> &ldquo;It also needs to talk to our stock system&rdquo; in week six is a new project. Every integration should be proven against the real API during discovery, not assumed.</li>
<li><strong>Design that was drawn, not specified.</strong> A beautiful desktop homepage with no mobile layout, no error state and no empty state means the developer designs the rest, at speed, without being briefed.</li>
<li><strong>Scope creep dressed as feedback.</strong> &ldquo;Small tweak&rdquo; requests that are new features. Agree in advance what counts as a change and what it costs.</li>
</ul>
<p>Four of those five are on the client side of the line, which is worth knowing before blaming a supplier. The fixes are all administrative and all free: a content owner, one approver, integrations proven early, a signed-off design that covers every state.</p>`,
      band: { img: 'web2-two-with-papers-and-pen.jpg', alt: 'Two people going through paperwork with a pen', cap: 'Four of the five common failures are on the buyer&rsquo;s side of the line.' } },
    { h2: 'What You Should Own at the End', html: `
<p>This is the part that decides whether you have a supplier or a landlord, and it is easiest to settle before any money changes hands.</p>
<ul>
<li><strong>The code, in your repository.</strong> Your GitHub, GitLab or equivalent, with the full history &mdash; not a zip file emailed at the end.</li>
<li><strong>The hosting, in your account.</strong> Your name on the account, your card, your access. A supplier can be granted access; they should not be the owner.</li>
<li><strong>The domain, in your name.</strong> This one catches people out and it is the most painful to unwind.</li>
<li><strong>The content, in a portable format.</strong> A database export or a documented CMS, so it can move.</li>
<li><strong>Documentation of the decisions,</strong> not just the code. Why the structure is what it is, what the integrations do, what the deployment process is.</li>
<li><strong>Analytics and Search Console in your own account,</strong> with the supplier as a user.</li>
</ul>
<p>None of that is unreasonable and a good supplier will offer it unprompted. Reluctance on any of the six is the most useful signal you will get.</p>` },
    { h2: 'Questions That Expose a Weak Supplier', html: `
<ul>
<li><strong>&ldquo;Show me the current state of a live project.&rdquo;</strong> Not a portfolio &mdash; work in progress. Suppliers who work on a weekly staging URL will show you immediately; those who reveal everything at the end will not.</li>
<li><strong>&ldquo;What went wrong on your last project, and what did you do?&rdquo;</strong> Every project has a problem. &ldquo;Nothing&rdquo; means either inexperience or a poor memory.</li>
<li><strong>&ldquo;Who exactly will do the work?&rdquo;</strong> Names and roles, and whether they are the people in the meeting.</li>
<li><strong>&ldquo;What have you talked a client out of?&rdquo;</strong> Anyone who has never argued against a feature is taking orders, not advising.</li>
<li><strong>&ldquo;How will you test it?&rdquo;</strong> Listen for real devices, keyboard and screen-reader use, and a throttled connection. &ldquo;We test on all browsers&rdquo; is not an answer.</li>
<li><strong>&ldquo;What is your Core Web Vitals target, and how will you prove it?&rdquo;</strong> A supplier without a number is not designing for speed.</li>
<li><strong>&ldquo;What happens in month nine?&rdquo;</strong> If the answer is a support queue, the build team leaves at launch.</li>
</ul>
<p>How we answer those is on <a href="/uk/website-development/">the UK web development page</a>, and the call ends with a straight recommendation &mdash; including the times it is that your current site is fine and the money belongs elsewhere.</p>`,
      figure: { img: 'web2-signing-document-at-desk.jpg', alt: 'Signing a document at a desk', cap: 'Settle the code, the hosting and the domain before any money moves. Reluctance on any of the three is the answer.' } },
  ],
  faqs: [
    { q: 'What do web development services include?', a: 'Eight parts: discovery, design, build, content, integrations, testing, launch and aftercare. Quotes commonly include the build and the design and imply the rest, which is why two quotes at the same price can describe very different work. Ask each supplier which of the eight are in their figure and who does the others.' },
    { q: 'How do I compare web development quotes?', a: 'Make them describe the same scope. Send every supplier the same list of the eight parts and ask them to mark what is included, then ask specifically about named integrations, who writes the content, what testing means in practice, and whether the redirect map and aftercare are in or out.' },
    { q: 'What should I own after a web development project?', a: 'The code in your own repository with its full history, the hosting in an account in your name, the domain in your name, the content in a portable format, documentation of the decisions rather than only the code, and analytics and Search Console in your own accounts with the supplier added as a user.' },
    { q: 'Why do website projects run late?', a: 'Most often content &mdash; the build finishes and waits for the words. Then approval by committee, an integration discovered in week six, a design that was drawn rather than specified so the mobile and error states were never briefed, and scope creep arriving as feedback. Four of those five are fixable by the client for free, before the project starts.' },
    { q: 'How do I know a web development company is any good?', a: 'Ask to see a live project&rsquo;s current work in progress rather than a finished portfolio, ask what went wrong on the last one and what they did, ask who specifically will do the work, and ask what they have talked a client out of. A supplier who works on a weekly staging URL can answer the first immediately.' },
  ],
  cta: WEB_CTA,
},
];
