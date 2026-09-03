'use strict';
const D = '2026-09-03';
const WEB_CTA = { h3: 'Want a website that does this out of the box?', p: 'Book a free strategy call. We look at your current site’s real speed, mobile and search data together and tell you honestly what to fix, rebuild or leave alone.' };
module.exports = [
// ------------------------------------------------------------------ 29. Web app vs website
{
  slug: 'web-application-vs-website', cat: 'web', date: D,
  title: 'Web Application vs. Website: What’s the Difference, and Which Do You Need? | TechAuditPros',
  desc: 'A website presents information; a web application lets users do things — log in, transact, manage data. The real differences in purpose, engineering, cost and hosting, examples of each, and how to tell which one your business is actually asking for.',
  eyebrow: 'Web Development',
  h1: 'Web Application vs. Website: What’s the Difference, and Which Does Your Business Need?',
  dek: '"We need a website" and "we need a web app" are priced and built very differently. Here is the distinction that matters, with examples, and how to tell which one you are actually describing.',
  lead: { img: 'istock-1321462048-woman-holographic-ui-network.jpg', alt: 'User interacting with a connected web application interface', w: 612, h: 344 },
  takeaways: [
    'A <strong>website</strong> mostly <em>presents</em> &mdash; the same pages to every visitor: services, about, contact, blog. A <strong>web application</strong> mostly <em>does</em> &mdash; it lets a logged-in user create, change and retrieve their own data: portals, dashboards, booking systems, stores, internal tools.',
    'The line is blurry (an online store is both), but it decides the engineering: applications are mostly back-end work &mdash; databases, authentication, permissions, integrations &mdash; and are planned and priced like software.',
    'Most small businesses need a website first and an application when a manual process (quotes, bookings, order status, client files) starts costing real staff time. Often the smartest version is a small portal attached to the website you already have.',
  ],
  intro: 'A <strong>website</strong> is a set of pages that present information to visitors &mdash; who you are, what you offer, how to contact you &mdash; and shows essentially the same content to everyone. A <strong>web application</strong> is software delivered through a browser that lets an individual user do things with their own data: log in, place and track orders, book appointments, upload documents, see a dashboard, run a workflow. Both run on the same technologies and are often reached from the same domain, which is why the terms blur; but they are different products, engineered, priced and maintained differently, and knowing which one you are asking for is the first step to buying it well.',
  sections: [
    { h2: 'The Core Difference: Presenting vs. Doing', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Website</th><th>Web application</th></tr>
<tr><th>Purpose</th><td>Inform, persuade, be found</td><td>Let users accomplish tasks with their data</td></tr>
<tr><th>Content</th><td>Same for every visitor</td><td>Personal to each logged-in user</td></tr>
<tr><th>Login</th><td>Rarely</td><td>Almost always</td></tr>
<tr><th>Data</th><td>Content the business publishes</td><td>Records users create and change: orders, bookings, files, settings</td></tr>
<tr><th>Engineering weight</th><td>Mostly front end and content</td><td>Mostly back end: database, authentication, permissions, integrations, APIs</td></tr>
<tr><th>Examples</th><td>Company site, service pages, blog, landing pages</td><td>Customer portal, booking system, quoting tool, online store, internal dashboard, SaaS product</td></tr>
<tr><th>Search visibility</th><td>Central &mdash; pages exist to be found</td><td>Usually behind a login; the marketing site around it does the SEO</td></tr>
<tr><th>Typical cost (US agency)</th><td>US$3,000&ndash;$40,000</td><td>US$30,000&ndash;$150,000+</td></tr>
<tr><th>Maintenance</th><td>Content, updates, security</td><td>All of that plus bugs, data, uptime, user support, feature changes</td></tr>
</table></div>` },
    { h2: 'Examples: Which Is Which?', html: `
<ul>
<li><strong>A contractor’s site</strong> with services, service areas, reviews and a quote form &mdash; <em>website</em>. Add a portal where customers log in to approve estimates, see schedules and pay invoices &mdash; <em>web application</em>.</li>
<li><strong>An online store</strong> &mdash; both: the catalog pages are a website (and need SEO); the cart, checkout, accounts and order history are an application.</li>
<li><strong>A clinic’s site</strong> with locations and providers &mdash; website. Online booking with patient logins and reminders &mdash; application.</li>
<li><strong>A distributor’s catalog</strong> &mdash; website. A B2B ordering portal with customer-specific prices, stock and reorder history &mdash; application, and usually connected to the ERP.</li>
<li><strong>Internal tools</strong> &mdash; job tracking, approvals, dashboards &mdash; applications with no public website at all. These shade into <a href="/blog/what-is-erp-software-plain-english.html">ERP</a> territory: when several internal tools share one database, that is what an ERP is.</li>
</ul>`,
      figure: { img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Customer reviewing a personal dashboard on a tablet', w: 612, h: 402, cap: 'If each user sees their own data after logging in, it is an application &mdash; whatever it is called.' } },
    { h2: 'Why the Distinction Changes Everything About the Build', html: `
<ul>
<li><strong>Data model first.</strong> An application starts with the data &mdash; what records exist, who owns them, how they relate &mdash; not with the design. Skipping that step is how portals end up rebuilt.</li>
<li><strong>Authentication and permissions.</strong> Logins, password resets, roles (a customer sees their orders; a manager sees everyone’s), audit trails. Invisible when done right; catastrophic when wrong.</li>
<li><strong>Integrations.</strong> Applications almost always connect to something &mdash; payments, accounting, CRM, ERP, email &mdash; through APIs that need building and monitoring.</li>
<li><strong>Testing and reliability.</strong> A typo on a website is embarrassing; a bug in a payment or booking flow costs money. Applications need real testing, error handling and monitoring.</li>
<li><strong>Hosting.</strong> A website can be static files on a CDN; an application needs a server or serverless back end, a database with backups, and uptime monitoring.</li>
<li><strong>Ongoing work.</strong> Websites need updates; applications need <em>operations</em>. Budget for it.</li>
</ul>` },
    { h2: 'How to Tell Which One You Actually Need', html: `
<div class="article-checklist">
<h3>Ask these five questions</h3>
<ol>
<li>Will users need to log in and see something specific to them? If yes &rarr; application.</li>
<li>Is there a manual process today (emailing quotes, phoning for order status, spreadsheets of bookings) that staff spend hours a week on? If yes &rarr; a small application would likely pay for itself.</li>
<li>Does the site mainly need to be <em>found</em> and <em>persuade</em>? If yes &rarr; website, and SEO matters most.</li>
<li>Will the thing store records that must be accurate, secure and backed up? If yes &rarr; application, with the rigor that implies.</li>
<li>Could a well-chosen existing tool (a booking platform, a payment link, an off-the-shelf store) do the application part? If yes &rarr; use it, and connect it to the website, unless it fights your process.</li>
</ol>
</div>
<p>The most common right answer for a growing small business is a good website with one focused application attached &mdash; a customer portal, a quoting tool, an order-status page &mdash; built on the same stack so they share data and a team. That is how TechAuditPros scopes it: the marketing site through our <a href="/us/website-development/">US website development service</a>, and the portal or internal tool as part of a <a href="/us/erp/">custom ERP or software build</a>, on one flat monthly rate.</p>`,
      figure: { img: 'istock-1489414046-woman-engineer-laptop-ops-room.jpg', alt: 'Engineer monitoring a live web application', w: 612, h: 323, cap: 'Websites need updates; applications need operations. Budget for the difference.' } },
    { h2: 'Progressive Web Apps, SaaS and Other Terms', html: `
<ul>
<li><strong>Progressive web app (PWA):</strong> a web application built to feel like a native mobile app &mdash; installable, works offline to a degree, sends notifications &mdash; without an app store.</li>
<li><strong>SaaS (software as a service):</strong> a web application sold by subscription to many customers. If you are building one, it is a product business, not a website project.</li>
<li><strong>Portal:</strong> a web application scoped to one audience &mdash; customers, suppliers, staff &mdash; usually connected to a back-office system.</li>
<li><strong>Dashboard:</strong> an application view that summarizes data; often the first internal tool a business builds.</li>
</ul>
<p>Costs for both categories are laid out in <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>; the technical layers are explained in <a href="/blog/what-is-web-development.html">what is web development</a>.</p>` },
  ],
  faqs: [
    { q: 'Is an online store a website or a web application?', a: 'Both. The product and category pages are a website and need search visibility; the cart, checkout, customer accounts and order history are an application. Plan, build and maintain the two halves accordingly.' },
    { q: 'Can a website become a web application later?', a: 'Yes, and it is the usual path: start with the marketing site, then attach a portal, booking system or quoting tool when a manual process starts costing staff time. Building both on the same stack keeps one team and one data model.' },
    { q: 'How much more does a web application cost than a website?', a: 'US agencies commonly quote US$30,000&ndash;$150,000+ for web applications against US$3,000&ndash;$40,000 for websites, because applications are mostly back-end engineering. TechAuditPros builds portals and internal tools as part of a flat US$1,800 per month engagement.' },
    { q: 'Do web applications need SEO?', a: 'The application itself usually sits behind a login and is not indexed. The marketing website around it does the SEO. Public-facing parts &mdash; a store’s product pages, a directory &mdash; need it as much as any website.' },
    { q: 'What is the difference between a web app and a mobile app?', a: 'A web app runs in the browser on any device with no installation; a mobile app is installed from an app store and built for iOS or Android. Progressive web apps blur the line by making web apps installable and partly offline-capable.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 30. Business website
{
  slug: 'how-to-get-a-business-website', cat: 'web', date: D,
  title: 'How to Get a Website for Your Business: DIY, Freelancer or Agency? | TechAuditPros',
  desc: 'The practical path to a business website: what to decide before you build (domain, goals, pages, content), the three ways to get it built and what each costs, what a launch-ready site must include, and the mistakes that cost owners a year.',
  eyebrow: 'Web Development',
  h1: 'How to Get a Website for Your Business: DIY, Freelancer or Agency, Step by Step',
  dek: 'Not a tutorial on dragging blocks around. The owner’s version: what to decide first, how to get it built, what it must include on launch day, and the mistakes that quietly cost a year.',
  lead: { img: 'small-business-owner-laptop-sidewalk-cafe.jpg', alt: 'Small business owner planning a new website on a laptop', w: 678, h: 452 },
  takeaways: [
    'Getting a <strong>business website</strong> is five decisions, in order: what it must achieve, who it is for, what pages it needs, who builds it, and how it is maintained. Design comes after all five.',
    'Three ways to build: do it yourself on a builder (US$20&ndash;$100/month, your time), hire a freelancer (US$3,000&ndash;$10,000), or hire an agency or build-and-run partner (agencies US$15,000&ndash;$75,000+; TechAuditPros US$1,800/month all-in). Pick by how much the site has to <em>win</em>, not by budget alone.',
    'Launch-ready means: mobile-fast, findable (technical SEO in place), one clear action per page, real contact paths, tracking installed, and a plan for who updates it &mdash; not just "it looks good."',
  ],
  intro: 'To <strong>get a website for your business</strong>, work through five decisions in order &mdash; what the site must achieve, who it is for, which pages it needs, who will build it, and who will maintain it &mdash; then choose between building it yourself on a website builder, hiring a freelancer, or hiring an agency or build-and-run partner. Most owners start at the wrong end (colors, templates, a cousin who "does websites") and end up with a site that exists but does not produce customers. This guide is the order of operations that avoids that, with realistic 2026 costs and a launch checklist.',
  sections: [
    { h2: 'Step 1: Decide What the Website Has to Do', html: `
<p>Finish this sentence: "The website is a success if it ______ every month." Typical honest answers: produces 15 quote requests; books 40 appointments; makes phone calls from Google; sells US$20,000 of product; convinces referrals that we are legitimate. The answer decides everything downstream &mdash; a site built to <em>generate</em> leads is structured very differently from one built to <em>reassure</em> referrals.</p>` },
    { h2: 'Step 2: Decide Who It Is For', html: `
<p>Two or three types of visitor, and what each needs to see before they act: the homeowner comparing three contractors wants proof, price signals and a fast way to call; the procurement manager wants specs, certifications and a downloadable PDF. Write those needs down. They become your pages.</p>` },
    { h2: 'Step 3: Decide the Pages (and Write the Content First)', html: `
<p>A typical small-business site needs a homepage, one page per service (not one "Services" page &mdash; one <em>per</em> service, because that is what people search for), an about page with real people, proof (reviews, case studies, credentials), a contact page with every way to reach you, and a blog or guides section if search is part of the plan. Local businesses add location or service-area pages where there is real search demand.</p>
<p>Write the content before design begins. Sites stall for months waiting for copy, and design done without content is design for placeholder text. If writing is not your strength, have it written &mdash; it is the cheapest part of the project to get right and the most expensive to skip.</p>`,
      figure: { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Planning website pages and content on paper', w: 720, h: 419, cap: 'Pages come from visitor needs; content comes before design. Reverse either and the project stalls.' } },
    { h2: 'Step 4: Choose Who Builds It', html: `
<div class="article-table-wrap"><table>
<tr><th>Option</th><th>Best when</th><th>2026 cost (US)</th><th>Watch out for</th></tr>
<tr><th>Do it yourself (website builder)</th><td>Testing an idea; a placeholder; you have the hours and the site does not drive sales yet</td><td>US$20&ndash;$100/month plus your time</td><td>Slow pages, weak SEO control, rented not owned; most owners spend far more hours than planned</td></tr>
<tr><th>Freelancer</th><td>A simple brochure site on a template, modest budget, someone to maintain it afterwards</td><td>US$3,000&ndash;$10,000 upfront</td><td>Continuity depends on one person; maintenance often unavailable; speed and SEO depend on the theme</td></tr>
<tr><th>Agency (project)</th><td>Custom design and development with project management</td><td>US$15,000&ndash;$75,000+ upfront, plus US$500&ndash;$2,000+/month maintenance</td><td>Change requests billed hourly; 3&ndash;6 month timelines; confirm code ownership</td></tr>
<tr><th>Build-and-run partner (flat monthly)</th><td>The site has to win customers and keep improving; you want one accountable team</td><td>TechAuditPros: US$1,800/month all-in</td><td>Confirm what "all-in" includes and that you own the code (with us, everything)</td></tr>
</table></div>
<p>The full comparison of DIY, template and custom is in <a href="/blog/custom-website-vs-template.html">custom website vs. template vs. builder</a>, and the numbers behind the table in <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>. If you are hiring, <a href="/blog/how-to-choose-a-web-development-company.html">how to choose a web development company</a> lists the questions to ask.</p>` },
    { h2: 'Step 5: Secure the Basics You Must Own', html: `
<ul>
<li><strong>Domain name.</strong> Buy it yourself, in your own account, with your own card. Never let a builder or freelancer register it for you &mdash; ownership disputes over domains are a genuine small-business nightmare.</li>
<li><strong>Hosting account.</strong> Likewise in your name, even if your partner manages it.</li>
<li><strong>Google Business Profile</strong> (for any business serving a location) and <strong>Google Search Console</strong>, both in your account, with your partner added as a user.</li>
<li><strong>Business email on the domain</strong> &mdash; you@yourbusiness.com, not a free address.</li>
</ul>` },
    { h2: 'What a Launch-Ready Business Website Must Include', html: `
<div class="article-checklist">
<h3>Launch checklist</h3>
<ol>
<li><strong>Works and loads fast on a phone</strong> &mdash; LCP under 2.5 seconds on mobile; no zooming, no sideways scrolling. (See <a href="/blog/how-to-make-a-website-mobile-friendly.html">making a website mobile-friendly</a>.)</li>
<li><strong>One clear action per page</strong> &mdash; call, quote, book, buy &mdash; visible without scrolling.</li>
<li><strong>Real contact paths</strong> &mdash; tappable phone number, a short form that actually delivers to someone, address and hours if you have them.</li>
<li><strong>Proof</strong> &mdash; reviews, photos of real work and real people, credentials, case studies.</li>
<li><strong>Technical SEO foundation</strong> &mdash; unique titles and descriptions, clean URLs, structured data (Organization or LocalBusiness), an XML sitemap submitted to Search Console, HTTPS.</li>
<li><strong>Tracking</strong> &mdash; analytics and conversion tracking for forms and calls, so you can answer "is it working?" with a number.</li>
<li><strong>Legal pages</strong> &mdash; privacy policy and terms; accessibility considered.</li>
<li><strong>A maintenance plan</strong> &mdash; who updates content, applies security patches and adds pages, and what it costs.</li>
</ol>
</div>`,
      figure: { img: 'support-agent-headset-smiling-laptop.jpg', alt: 'Business staff member answering an inquiry that came through the website', w: 767, h: 400, cap: 'A launch-ready site has one clear action per page and a real person on the other end of it.' } },
    { h2: 'The Mistakes That Cost Owners a Year', html: `
<ul>
<li><strong>Starting with design.</strong> Months on colors and templates, then discovering the pages and content were never decided.</li>
<li><strong>Letting someone else own the domain or hosting.</strong></li>
<li><strong>One "Services" page instead of one page per service</strong> &mdash; invisible in search for every individual service you offer.</li>
<li><strong>No tracking.</strong> A year later, nobody knows whether the site produced anything.</li>
<li><strong>Treating launch as the end.</strong> Websites are never finished; the ones that produce customers are the ones someone keeps improving.</li>
<li><strong>Buying the cheapest build and paying for it twice.</strong> The rebuild eighteen months later costs more than doing it properly once.</li>
</ul>
<p>If you would rather hand the whole sequence to one team &mdash; planning, content structure, design, build, SEO foundation and the ongoing improvement &mdash; that is what our <a href="/us/website-development/">US website development service</a> and <a href="/ca/website-development/">Canadian service</a> do for a flat monthly rate, with the first live version in 4&ndash;8 weeks.</p>` },
  ],
  faqs: [
    { q: 'How do I create a website for my small business?', a: 'Decide what it must achieve and for whom, list the pages (one per service), write the content, register the domain and hosting in your own name, then choose DIY, a freelancer or an agency/partner based on how much the site has to win customers. Launch with mobile speed, one clear action per page, tracking and a maintenance plan.' },
    { q: 'How much does it cost to get a business website made?', a: 'DIY builders run US$20&ndash;$100 a month plus your time; freelancers US$3,000&ndash;$10,000 upfront; agencies US$15,000&ndash;$75,000+ plus maintenance; TechAuditPros builds and runs business websites for a flat US$1,800 a month.' },
    { q: 'How long does it take to get a business website?', a: 'A DIY site can be live in days; a freelancer template site in 2&ndash;6 weeks; a custom build in 4&ndash;8 weeks to a first live version. The most common delay is content &mdash; write it before design starts.' },
    { q: 'Do I need a website if I have a Google Business Profile and social media?', a: 'Yes. Profiles and social accounts are rented visibility on platforms you do not control, with no room for service detail, proof or conversion paths. The website is the asset you own and the destination those profiles point to.' },
    { q: 'What pages should a small business website have?', a: 'Homepage, one page per service, about (with real people), proof (reviews, work, credentials), contact, legal pages, and &mdash; if search is part of the plan &mdash; a guides or blog section. Local businesses add location pages where real search demand exists.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 31. Choose a web dev company
{
  slug: 'how-to-choose-a-web-development-company', cat: 'web', date: D,
  title: 'How to Choose a Web Development Company: 15 Questions to Ask Before You Sign | TechAuditPros',
  desc: 'How to evaluate a web development company or agency: what to check before the first call, the 15 questions that reveal quality (Core Web Vitals of live work, code ownership, SEO, maintenance, change requests), the red flags, and how to compare proposals.',
  eyebrow: 'Web Development',
  h1: 'How to Choose a Web Development Company: 15 Questions to Ask Before You Sign',
  dek: 'Every web development company has a nice portfolio. The differences that matter show up after launch &mdash; in speed, rankings, ownership and change requests. Here is how to find them out beforehand.',
  lead: { img: 'client-consultation-meeting-clipboard.jpg', alt: 'Business owner interviewing a web development partner', w: 547, h: 365 },
  takeaways: [
    'Judge a <strong>web development company</strong> by evidence, not portfolio screenshots: the mobile Core Web Vitals of their <em>live</em> sites, who owns the code when they leave, and how changes are handled after launch.',
    'Fifteen questions separate a good partner from an expensive one &mdash; and the most revealing are about what happens <em>after</em> the site goes live.',
    'Compare proposals on a five-year total, ownership, speed and SEO foundation. The cheapest build is often the most expensive website.',
  ],
  intro: 'To <strong>choose a web development company</strong>, evaluate the things that determine whether the website earns money after launch rather than the things that look good in a pitch: whether their live sites are actually fast on mobile, whether the technical SEO foundation is part of the build, who owns the code and accounts when the project ends, how changes and maintenance are handled and billed, and whether you will be talking to the people doing the work. A polished portfolio proves they can make something look good once. The fifteen questions below find out whether they can make something that works, and keeps working, for you.',
  sections: [
    { h2: 'Before the First Call: Three Checks', html: `
<ol>
<li><strong>Test their own website on your phone</strong> over cellular data, and run it through PageSpeed Insights. A web development company whose own site fails Core Web Vitals will not pass yours.</li>
<li><strong>Test three live client sites</strong> from their portfolio the same way. Screenshots hide slowness; live pages do not.</li>
<li><strong>Search for their clients’ services.</strong> Do the sites they built actually rank for what those businesses sell? If not, the SEO foundation was not part of the build.</li>
</ol>` },
    { h2: 'The 15 Questions', html: `
<div class="article-checklist">
<h3>About the work</h3>
<ol>
<li><strong>Show me three live sites you built in the last year and their mobile Core Web Vitals.</strong> Good: LCP under 2.5 s, INP under 200 ms, CLS under 0.1. Anyone can claim "fast"; the numbers are public.</li>
<li><strong>What will you build ours on, and why for our case?</strong> A good answer references your needs (integrations, content volume, e-commerce) rather than one platform for everyone.</li>
<li><strong>Is the technical SEO foundation included</strong> &mdash; structure, unique titles, schema, redirects, sitemap, speed &mdash; or a separate service? "Separate" means the site will launch invisible.</li>
<li><strong>How do you handle a redesign without losing rankings?</strong> Listen for "redirect map," "content preserved," "indexing verified after launch." If they do not mention redirects, walk.</li>
<li><strong>How do you make the site mobile-first and accessible?</strong> Real answers mention testing on devices, WCAG practices, keyboard navigation and contrast &mdash; not "it’s responsive."</li>
</ol>
<h3>About ownership and money</h3>
<ol start="6">
<li><strong>Who owns the code, the content, the domain and the hosting account when we are done?</strong> The only acceptable answer is "you, entirely."</li>
<li><strong>What is the total cost over five years</strong> including hosting, maintenance and a realistic number of changes? Build price alone is a fraction of it.</li>
<li><strong>How are changes and new pages handled after launch, and at what rate?</strong> Hourly change requests at US$100&ndash;$200 add up fast; a flat monthly arrangement is predictable.</li>
<li><strong>What exactly is included in maintenance</strong> &mdash; security patches, backups, monitoring, content updates &mdash; and what is extra?</li>
<li><strong>What is the minimum term, and what are the exit terms?</strong> Confidence in the work does not need a lock-in.</li>
</ol>
<h3>About the relationship</h3>
<ol start="11">
<li><strong>Who exactly will do the work, and who will I talk to?</strong> A named engineer beats an account manager relaying messages.</li>
<li><strong>What is the timeline to a live first version, and what could delay it?</strong> Honest answers mention content and approvals on your side.</li>
<li><strong>How will I see progress?</strong> A staging site you can click through beats a PDF of mockups.</li>
<li><strong>Can I talk to a current client of my size?</strong></li>
<li><strong>What would you tell us not to build?</strong> A partner who cannot name something you do not need is selling a list.</li>
</ol>
</div>`,
      figure: { img: 'istock-2196870531-consultants-walking-tablet-corridor.jpg', alt: 'Client and consultant reviewing a web development proposal', w: 612, h: 408, cap: 'The revealing questions are about after launch: speed, ownership, changes, who you talk to.' } },
    { h2: 'Red Flags', html: `
<ul>
<li>Their own site is slow on mobile.</li>
<li>They will not name the platform or framework until you sign.</li>
<li>Pricing only after a discovery call, with no ranges at all.</li>
<li>Vague or evasive answers about code ownership or the hosting account.</li>
<li>SEO is an upsell rather than part of the build.</li>
<li>No mention of redirects when you ask about a redesign.</li>
<li>Long contracts with exit fees.</li>
<li>The person selling is not the person building, and you will not meet the builder.</li>
</ul>` },
    { h2: 'Freelancer vs. Agency vs. Build-and-Run Partner', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Freelancer</th><th>Agency (project)</th><th>Build-and-run partner</th></tr>
<tr><th>Strength</th><td>Cost; direct relationship</td><td>Custom design and development; project management</td><td>One team from build through ongoing improvement; predictable cost</td></tr>
<tr><th>Weakness</th><td>Continuity; capacity; maintenance often unavailable</td><td>Change requests and maintenance billed on top; account-manager layer</td><td>Requires a partner who actually includes what they say they include</td></tr>
<tr><th>Typical US cost</th><td>US$3,000&ndash;$10,000 upfront</td><td>US$15,000&ndash;$75,000+ upfront, plus US$500&ndash;$2,000+/month</td><td>TechAuditPros: US$1,800/month all-in</td></tr>
<tr><th>Fits when</th><td>Simple brochure site; you can maintain it</td><td>Large custom project with internal staff to maintain it</td><td>The website has to win customers and keep improving; you want one accountable team</td></tr>
</table></div>
<p>Cost detail in <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>; the build-type decision in <a href="/blog/custom-website-vs-template.html">custom website vs. template vs. builder</a>.</p>` },
    { h2: 'How to Compare Proposals', html: `
<ol>
<li>Put every proposal on a five-year total: build, hosting, maintenance, and a realistic number of change hours at their rate.</li>
<li>Score each on the three things that compound: mobile speed of their live work, SEO foundation included, and ownership.</li>
<li>Note who you will actually talk to, and how progress is shown.</li>
<li>Discount the portfolio. Everyone’s looks good.</li>
<li>Choose the one whose answers to the fifteen questions were specific. Specificity is the best predictor of a smooth project.</li>
</ol>`,
      figure: { img: 'istock-1313265074-boardroom-team-through-glass-dark.jpg', alt: 'Leadership team comparing web development proposals', w: 612, h: 408, cap: 'Five-year total, speed, SEO foundation, ownership. The portfolio is the least useful page.' } },
    { h2: 'How TechAuditPros Answers the Fifteen', html: `
<p>In the interest of practicing what we recommend: our sites are custom-built on Next.js and React to 90+ mobile Core Web Vitals; the technical SEO foundation is part of every build because the same engineers run SEO; you own the code, content, domain and hosting; there is no minimum term; design, build, hosting setup, maintenance and ongoing changes are one flat US$1,800 per month for <a href="/us/website-development/">US businesses</a> (CA$1,490 for <a href="/ca/website-development/">Canadian businesses</a>); you talk to the engineer doing the work, on a staging site you can click through; and we will tell you what not to build. The honest weakness: we are in Kochi, India, 9.5 hours ahead of New York, so if you need someone in your office, we are not the right fit &mdash; ask us anything else on a strategy call.</p>` },
  ],
  faqs: [
    { q: 'What should I look for in a web development company?', a: 'Live sites that are fast on mobile (check Core Web Vitals yourself), the technical SEO foundation included in the build, full ownership of code and accounts, clear handling and pricing of post-launch changes and maintenance, a named engineer you will actually talk to, and no long-term lock-in.' },
    { q: 'How much should I pay a web development company?', a: 'US agencies commonly charge US$15,000&ndash;$75,000+ upfront plus US$500&ndash;$2,000 a month for maintenance; freelancers US$3,000&ndash;$10,000 for template sites. TechAuditPros charges a flat US$1,800 a month including design, build, hosting setup and ongoing updates. Compare five-year totals.' },
    { q: 'Should I hire a freelancer or an agency for my website?', a: 'A freelancer suits a simple brochure site you can maintain yourself. An agency or build-and-run partner suits a site that has to win customers and grow, where design, engineering, SEO and ongoing improvement need one accountable team.' },
    { q: 'What questions should I ask a web developer?', a: 'Ask for live examples with mobile Core Web Vitals, the platform and why, whether SEO is included, how redesigns preserve rankings, who owns the code and accounts, five-year cost, how changes are billed, minimum term, who does the work, timeline, how you see progress, a client reference, and what they would tell you not to build.' },
    { q: 'Is it safe to hire an offshore web development company?', a: 'Yes, with the same checks as any provider plus two: confirm the communication model (overlap hours, response times, a named engineer) and that code, accounts and data are in your name from day one. Time zones can be an advantage &mdash; work sent at the end of your day is done by morning.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 32. Landing page conversion
{
  slug: 'what-is-a-landing-page-conversion', cat: 'web', date: D,
  title: 'What Is a Landing Page Conversion? Rates, Benchmarks and How to Improve Yours | TechAuditPros',
  desc: 'A landing page conversion is a visitor completing the one action the page exists for. How to calculate conversion rate, what a good rate is (median around 6%, 10%+ is strong), why most landing pages underperform, and the 12 changes that move the number.',
  eyebrow: 'Web Development',
  h1: 'What Is a Landing Page Conversion? Rates, Benchmarks and How to Improve Yours',
  dek: 'Traffic is a cost until it converts. Here is what a conversion actually is, how to measure the rate honestly, what "good" looks like by industry, and the changes that reliably move it.',
  lead: { img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Reviewing landing page conversion charts on a tablet', w: 612, h: 402 },
  takeaways: [
    'A <strong>landing page conversion</strong> is a visitor completing the single action the page was built for &mdash; a form, a call, a booking, a purchase, a download. The <strong>conversion rate</strong> is conversions divided by visitors, times 100.',
    'Across industries the median landing page converts around 6%; above 10% is strong; below 2% almost always means a mismatch between what the visitor wanted and what the page offered.',
    'The biggest levers are not colors and buttons: message match with the ad or search that brought the visitor, one clear offer, proof, speed on mobile, and a form that asks only for what you need.',
  ],
  intro: 'A <strong>landing page conversion</strong> happens when a visitor to a landing page completes the one action the page exists to produce &mdash; submitting a quote form, calling, booking an appointment, buying, downloading a guide, starting a trial. The <strong>landing page conversion rate</strong> is that number of conversions divided by the number of visitors, expressed as a percentage: 1,000 visitors and 50 quote requests is a 5% conversion rate. It is the metric that turns traffic into a business result, which is why a landing page that converts at 8% is worth four times one that converts at 2% on the same ad budget.',
  sections: [
    { h2: 'Landing Page vs. Homepage vs. Any Other Page', html: `
<p>A landing page is built for one audience arriving from one source &mdash; a paid ad, an email, a specific search &mdash; with one offer and one action. It strips out the navigation and choices a homepage needs, because choices dilute conversion. A homepage has to serve everyone; a landing page serves one visitor with one intent. The discipline of "one page, one job" is what makes a landing page convert at multiples of a general page.</p>` },
    { h2: 'How to Calculate Conversion Rate (and What to Count)', html: `
<p><strong>Conversion rate = (conversions &divide; visitors) &times; 100.</strong> The definitions matter more than the arithmetic:</p>
<ul>
<li><strong>Count unique visitors</strong> (or sessions, consistently) &mdash; not page views, which inflate the denominator.</li>
<li><strong>Count real conversions</strong> &mdash; a submitted form, a completed call over 30 seconds, a paid order &mdash; not button clicks or "thank you" page loads that can fire twice.</li>
<li><strong>Track by source.</strong> The same page converts differently for paid search, email and organic visitors. A blended rate hides the source that is wasting money.</li>
<li><strong>Track the next step too.</strong> A 12% form rate is not a win if 80% of the leads are unqualified. Qualified conversion rate is the honest number.</li>
</ul>`,
      figure: { img: 'team-flatlay-reviewing-business-report-charts.jpg', alt: 'Reviewing conversion data by traffic source', w: 739, h: 415, cap: 'One rate per source, counting real conversions, is the only version worth optimizing.' } },
    { h2: 'What Is a Good Landing Page Conversion Rate?', html: `
<p>Published benchmark studies across tens of thousands of landing pages put the all-industry median around 6&ndash;7%, with wide variation by sector and offer. Useful reference points:</p>
<div class="article-table-wrap"><table>
<tr><th>Rate</th><th>Reading</th></tr>
<tr><th>Under 2%</th><td>Something is mismatched: the traffic, the offer, the page speed, or the form. Fix before spending more on traffic.</td></tr>
<tr><th>2&ndash;5%</th><td>Common for high-consideration B2B and expensive services; room to improve.</td></tr>
<tr><th>5&ndash;10%</th><td>Solid. Most well-built pages for local services, lead generation and simple offers land here.</td></tr>
<tr><th>10%+</th><td>Strong. Typical of tight message match, a low-friction ask (a call, a short form) and warm traffic.</td></tr>
</table></div>
<p>Context beats benchmarks. A 3% rate for a US$40,000 custom software inquiry is excellent; a 3% rate for a free checklist download is poor. Compare your page to its own history and to the value of what a conversion is worth, not to a global average.</p>` },
    { h2: 'Why Most Landing Pages Underperform', html: `
<ol>
<li><strong>Message mismatch.</strong> The ad promised "same-day HVAC repair"; the page talks about the company’s history. The visitor leaves in three seconds.</li>
<li><strong>Too many choices.</strong> Full navigation, three offers, five buttons. Every option not taken is a leak.</li>
<li><strong>Slow on mobile.</strong> Paid traffic is mostly phones; a four-second page loses a large share before it renders. Aim for LCP under 2.5 seconds.</li>
<li><strong>No proof.</strong> Claims without reviews, numbers, logos or photos of real work.</li>
<li><strong>A form that asks for everything.</strong> Each unnecessary field costs conversions; ask for what you need to follow up, nothing more.</li>
<li><strong>The action is below the fold, or unclear.</strong> Visitors should see what to do and why without scrolling.</li>
<li><strong>No follow-through.</strong> The form submits into a void; the call goes to voicemail. Conversion is only the start.</li>
</ol>` },
    { h2: 'The 12 Changes That Move the Number', html: `
<div class="article-checklist">
<h3>In roughly the order of impact</h3>
<ol>
<li><strong>Match the headline to the source.</strong> The visitor should see the words they clicked on.</li>
<li><strong>One offer, one action.</strong> Remove navigation and secondary links.</li>
<li><strong>Make it fast on a phone.</strong> Compress images, cut scripts, preload the hero. (See <a href="/blog/how-to-make-a-website-mobile-friendly.html">mobile-friendly fixes</a>.)</li>
<li><strong>State the value in one sentence</strong> under the headline: what they get, how fast, at what cost or with what guarantee.</li>
<li><strong>Put the action above the fold</strong> and repeat it after each major section.</li>
<li><strong>Add proof near the action</strong> &mdash; a review, a number, a logo row, a photo of real work or real people.</li>
<li><strong>Shorten the form.</strong> Name, email or phone, one qualifying question. Everything else can be asked later.</li>
<li><strong>Offer the low-friction alternative</strong> &mdash; a tappable phone number next to the form, for the people who would rather talk.</li>
<li><strong>Answer the objections on the page</strong> &mdash; price range, timeline, what happens next &mdash; in a short FAQ.</li>
<li><strong>Remove distractions</strong> &mdash; pop-ups, chat widgets that cover the button, autoplay video.</li>
<li><strong>Test one change at a time</strong> when traffic allows (a few hundred visitors per variant is the floor for a meaningful read).</li>
<li><strong>Fix the follow-through</strong> &mdash; instant confirmation, a real response within the hour during business hours.</li>
</ol>
</div>`,
      figure: { img: 'istock-2231952003-presenting-dashboard-wood-meeting-room.jpg', alt: 'Team reviewing landing page test results in a meeting', w: 612, h: 408, cap: 'Message match, one action, speed, proof, short form: the five that carry most of the gain.' } },
    { h2: 'Landing Pages and SEO', html: `
<p>Paid landing pages are usually kept out of the search index (noindex) so they do not compete with your main pages. Organic landing pages &mdash; the service and location pages people find through search &mdash; follow the same conversion principles with the navigation kept in, and they are the higher-value version: the traffic is free and the intent is often stronger. Building them is part of both our <a href="/us/website-development/">website development</a> and <a href="/us/seo-services/">SEO</a> work for US businesses, and the same for <a href="/ca/website-development/">Canadian clients</a>; conversion tracking is set up in the first sprint so the rate is measurable from day one.</p>` },
  ],
  faqs: [
    { q: 'How do you calculate landing page conversion rate?', a: 'Divide the number of conversions (real completed actions: forms, calls, orders) by the number of unique visitors in the same period, then multiply by 100. Track it separately for each traffic source.' },
    { q: 'What is a good conversion rate for a landing page?', a: 'The all-industry median is roughly 6&ndash;7%. Above 10% is strong; below 2% signals a mismatch between traffic, offer, speed or form. Judge your page against its own history and the value of a conversion, not a global average.' },
    { q: 'Why is my landing page not converting?', a: 'Most often: the headline does not match what the visitor clicked, the page is slow on mobile, there are too many choices, the form asks for too much, or there is no proof near the call to action. Fix those five before anything else.' },
    { q: 'How many visitors do I need to test a landing page?', a: 'A few hundred visitors per variant is the practical floor for a meaningful A/B read; small pages with less traffic should make one clear change at a time and compare month over month rather than run formal tests.' },
    { q: 'Should landing pages be indexed by Google?', a: 'Paid-campaign landing pages are usually set to noindex so they do not compete with the main site. Organic landing pages &mdash; service and location pages &mdash; should be indexed and are often the most valuable conversion pages you have.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 33. How to design a website
{
  slug: 'how-to-design-a-website', cat: 'web', date: D,
  title: 'How to Design a Website: The Process Professionals Actually Follow | TechAuditPros',
  desc: 'Website design is a process, not a template pick: goals, audience, content, information architecture, wireframes, visual design, prototype, handoff. The 8 stages explained, the principles that make a design convert, and the mistakes that send projects back to step one.',
  eyebrow: 'Web Development',
  h1: 'How to Design a Website: The 8-Stage Process Professionals Actually Follow',
  dek: 'Good website design is not choosing a nice template. It is a sequence &mdash; goals, audience, content, structure, wireframes, visual design, prototype, handoff &mdash; that produces a site people can use and a build that goes smoothly. Here it is, stage by stage.',
  lead: { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Designers reviewing website wireframe sketches', w: 720, h: 419 },
  takeaways: [
    '<strong>Website design</strong> is the process of deciding how a site is structured, how it looks and how people move through it toward an action &mdash; done in stages, each approved before the next, so the build starts from a plan rather than a guess.',
    'The order matters: goals and audience before content, content before structure, structure (wireframes) before visual design. Projects that start with colors and templates loop back to the beginning.',
    'Design that converts follows a few principles &mdash; hierarchy, one action per page, readable type, mobile-first layout, real imagery and speed as a design constraint &mdash; and none of them are about being clever.',
  ],
  intro: '<strong>Designing a website</strong> professionally means working through eight stages in order: defining what the site must achieve and for whom, gathering and writing the content, organizing it into a structure (information architecture), sketching page layouts as wireframes, applying visual design (typography, color, imagery) in a brand system, building a clickable prototype, testing it with real users, and handing a complete specification to development. Each stage is approved before the next begins. That sequence is what separates a site that works and ships on time from one that is redesigned twice during development &mdash; and it is the process behind every build TechAuditPros delivers.',
  sections: [
    { h2: 'Stage 1: Goals and Audience', html: `
<p>Before anything visual: what must the site achieve (leads, bookings, sales, credibility), for which two or three types of visitor, and what does each of them need to see before they act? These answers drive every later decision, from which pages exist to where the phone number sits. A design brief that fits on one page &mdash; goals, audiences, the one action per audience, the competitors they will compare you with &mdash; is the most valuable document in the project.</p>` },
    { h2: 'Stage 2: Content First', html: `
<p>Real headlines, real service descriptions, real proof, real photos &mdash; gathered or written before layout begins. Designing around placeholder text produces layouts that break when the real words arrive, and projects that stall for months waiting for copy. If the content does not exist yet, writing it <em>is</em> the next design task.</p>` },
    { h2: 'Stage 3: Information Architecture', html: `
<p>Organize the content into pages and the pages into a structure: what the main navigation contains (five to seven items at most), how services are grouped (one page per service, because that is how people search), where proof lives, how a visitor gets from any page to the action in one click. Sketch it as a simple tree. This stage decides most of the site’s usability and much of its SEO structure &mdash; see <a href="/blog/what-is-technical-seo.html">technical SEO</a> on crawl depth and internal linking.</p>`,
      figure: { img: 'whiteboard-process-mapping-two-colleagues.jpg', alt: 'Two colleagues mapping a website’s structure on a whiteboard', w: 2400, h: 1601, cap: 'The site map is the design decision that most affects usability and search &mdash; and the cheapest to change now.' } },
    { h2: 'Stage 4: Wireframes', html: `
<p>Wireframes are grayscale layouts of each key page type &mdash; homepage, service page, contact, article &mdash; showing where every element sits and in what hierarchy, without color or imagery. They force decisions about priority (what does a visitor see first?) and conversion (where is the action?) before aesthetics can distract from them. Design the phone layout first; expanding to desktop is easier than compressing to mobile.</p>` },
    { h2: 'Stage 5: Visual Design', html: `
<p>Now typography, color, imagery, spacing and components are applied to the approved wireframes, within a brand system: a small palette, one or two typefaces, consistent buttons, cards and spacing rules. The system matters more than any single page &mdash; it keeps fifty pages coherent and makes the build faster. Real photography of real people and work beats stock; where stock is unavoidable, choose images that could plausibly be yours.</p>` },
    { h2: 'Stage 6: Clickable Prototype', html: `
<p>The designed pages linked together so stakeholders can tap through the actual journeys &mdash; landing, browsing a service, reaching the form &mdash; on a phone. This is where the "I didn’t realize it would work like that" conversations happen, at a cost of hours rather than the weeks they cost during development. TechAuditPros does not start coding until this prototype is approved; it is the promise on our <a href="/us/website-development/">website development page</a>.</p>` },
    { h2: 'Stage 7: Test With Real Users', html: `
<p>Five people from the target audience, each given a task ("find out what this costs and request a quote"), watched without help. Five is enough to expose the major problems. Fix what confused them; repeat once if the changes were large.</p>`,
      figure: { img: 'istock-2150307337-creative-studio-neon-review.jpg', alt: 'Design team reviewing a prototype together in a studio', w: 612, h: 323, cap: 'Five real users, one task each, watched in silence: the cheapest usability test there is.' } },
    { h2: 'Stage 8: Handoff to Development', html: `
<p>The developer receives the approved prototype, the design system (tokens for color, type, spacing, components), the content, the site map with URLs, the redirect map if this is a redesign, and notes on interactions and states (hover, error, empty). A complete handoff is why a build can ship in 4&ndash;8 weeks; an incomplete one is why builds take six months. When design and development are the same team &mdash; as at TechAuditPros &mdash; this stage is a conversation rather than a document, and nothing is lost in translation. The two disciplines are compared in <a href="/blog/website-design-vs-development.html">website design vs. development</a>.</p>` },
    { h2: 'Principles of Website Design That Converts', html: `
<div class="article-checklist">
<h3>Ten rules that hold across every industry</h3>
<ol>
<li><strong>Visual hierarchy.</strong> One thing dominates each screen; the eye goes where you want it.</li>
<li><strong>One primary action per page</strong>, visible without scrolling and repeated after each section.</li>
<li><strong>Readable type.</strong> 16px+ body text, generous line height, line lengths of 50&ndash;75 characters.</li>
<li><strong>Mobile-first layout.</strong> Designed for the phone, expanded for desktop &mdash; not shrunk from it.</li>
<li><strong>Speed as a design constraint.</strong> Every image, font and animation costs load time; design within a performance budget.</li>
<li><strong>Consistency.</strong> Same buttons, spacing and patterns everywhere; users learn once.</li>
<li><strong>Real imagery.</strong> Actual people, actual work. Generic stock signals generic business.</li>
<li><strong>Proof near the action.</strong> Reviews, numbers and logos where the decision is made.</li>
<li><strong>Accessibility.</strong> Contrast, focus states, alt text, keyboard navigation &mdash; better for everyone and for search.</li>
<li><strong>Restraint.</strong> Animation and effects only where they aid understanding; never where they block reading.</li>
</ol>
</div>` },
    { h2: 'Mistakes That Send Projects Back to Stage One', html: `
<ul>
<li>Starting with a template or a color palette before goals and content exist.</li>
<li>Designing for desktop and "making it responsive" afterwards.</li>
<li>Approving mockups as static images instead of a clickable prototype on a phone.</li>
<li>Skipping the content stage and designing around lorem ipsum.</li>
<li>Treating speed and SEO as the developer’s problem later.</li>
<li>Design by committee &mdash; every stakeholder’s favorite element added, none removed.</li>
</ul>
<p>Whether you run this process in-house or hand it to a partner, the sequence is the same. For what to expect to pay for it, see <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>; for choosing that partner, <a href="/blog/how-to-choose-a-web-development-company.html">how to choose a web development company</a>.</p>` },
  ],
  faqs: [
    { q: 'What are the steps to design a website?', a: 'Define goals and audience; gather or write the content; organize it into a site structure; wireframe the key page types mobile-first; apply visual design within a brand system; build a clickable prototype; test it with five real users; hand a complete specification to development.' },
    { q: 'How long does it take to design a website?', a: 'For a typical business site, two to four weeks from brief to approved prototype when content is ready; longer when content has to be written during the project, which is the most common cause of delay.' },
    { q: 'What makes a good website design?', a: 'Clear hierarchy, one primary action per page, readable type, a mobile-first layout, speed treated as a constraint, consistent components, real imagery, proof near the call to action, accessibility, and restraint with effects. Good design is measured by whether visitors act, not by how novel it looks.' },
    { q: 'Should I design my website for mobile or desktop first?', a: 'Mobile first. Most visitors and Google’s index use the phone version; designing the constrained layout first produces a lighter, clearer site, and expanding it to desktop is easier than compressing a desktop design to a phone.' },
    { q: 'What is the difference between web design and web development?', a: 'Web design decides how the site is structured, looks and flows; web development builds the working software. They are separate skills that work best on one team, so the design is built as designed and the build informs the design.' },
  ],
  cta: WEB_CTA,
},
];
