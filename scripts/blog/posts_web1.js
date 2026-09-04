'use strict';
const D = '2026-09-03';
const WEB_CTA = { h3: 'Want a website that does this out of the box?', p: 'Book a free strategy call. We look at your current site’s real speed, mobile and search data together and tell you honestly what to fix, rebuild or leave alone.' };
module.exports = [
// ------------------------------------------------------------------ 25. Mobile friendly
{
  slug: 'how-to-make-a-website-mobile-friendly', cat: 'web', date: D,
  title: 'How to Make a Website Mobile-Friendly: 14 Fixes That Actually Matter | TechAuditPros',
  desc: 'A mobile-friendly website is readable, tappable and fast on a phone without zooming or sideways scrolling. How to test yours in two minutes, the 14 fixes in priority order, the Core Web Vitals thresholds, and when a redesign beats patching.',
  eyebrow: 'Web Development',
  h1: 'How to Make a Website Mobile-Friendly: 14 Fixes That Actually Matter',
  dek: 'Google indexes the phone version of your site, and most of your visitors are on one. Here is how to test whether your site passes, the fixes in the order that pays back fastest, and when it is time to stop patching.',
  lead: { img: 'casual-outdoor-study-picnic-phones.jpg', alt: 'People using websites on their phones outdoors', w: 1336, h: 2000 },
  takeaways: [
    'A <strong>mobile-friendly website</strong> works on a phone without zooming, pinching or sideways scrolling: text is readable, buttons are tappable, the layout adapts to the screen and pages load in under about 2.5 seconds on a cellular connection.',
    'Google uses <em>mobile-first indexing</em> &mdash; it ranks you based on the phone version of your site &mdash; so a site that only works on desktop is invisible in the way that matters.',
    'The fixes, in order: responsive layout and the viewport tag, readable type (16px+), tappable targets (44px+), fast images, less JavaScript, no intrusive pop-ups. Test on a real phone, not just a browser window.',
  ],
  intro: 'To <strong>make a website mobile-friendly</strong>, it has to do four things on a phone: adapt its layout to the screen width (responsive design), stay readable without zooming (16-pixel body text or larger, sensible line lengths), be easy to operate with a thumb (buttons at least 44&times;44 pixels with space between them), and load fast on a cellular connection (Largest Contentful Paint under 2.5 seconds). Google’s mobile-first indexing means the phone version <em>is</em> your site as far as rankings go, and most visitors arrive on a phone, so this is not a nice-to-have &mdash; it is the version of your website that matters most.',
  sections: [
    { h2: 'How to Check If Your Website Is Mobile-Friendly (Two Minutes)', html: `
<ol>
<li><strong>Open it on your own phone</strong> over cellular data, not Wi-Fi. Can you read everything without zooming? Tap every button without hitting the wrong one? Does anything scroll sideways?</li>
<li><strong>Run PageSpeed Insights</strong> (Google’s free tool) on your homepage and your most important service page, and read the <em>mobile</em> tab. Note the three Core Web Vitals: LCP, INP and CLS.</li>
<li><strong>Check Google Search Console</strong> for Core Web Vitals and any mobile usability issues on the pages Google has actually indexed.</li>
<li><strong>Resize your desktop browser</strong> down to about 375 pixels wide. If the layout breaks, overlaps or requires horizontal scrolling, the site is not responsive.</li>
</ol>
<p>If you failed any of the four, the fixes below are in the order that pays back fastest.</p>` },
    { h2: 'The 14 Fixes, in Priority Order', html: `
<div class="article-checklist">
<h3>Foundation (do these first)</h3>
<ol>
<li><strong>Add the viewport meta tag.</strong> <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> in the head. Without it, phones render the desktop layout shrunk to unreadable size. Astonishingly common on older sites.</li>
<li><strong>Use a responsive layout.</strong> Flexible grids and CSS media queries that rearrange content by screen width, so one site serves every device. Separate "m.dot" mobile sites are obsolete and split your SEO.</li>
<li><strong>Kill horizontal scrolling.</strong> Fixed-width elements &mdash; tables, images, embeds, wide containers &mdash; must be allowed to shrink or scroll inside their own box. Any sideways scroll on the page itself is a failure.</li>
<li><strong>Make text readable.</strong> Body text 16px or larger, line height around 1.5, and line lengths that do not run edge to edge on a large phone. No one should zoom to read.</li>
</ol>
<h3>Usability</h3>
<ol start="5">
<li><strong>Size tap targets.</strong> Buttons and links at least 44&times;44 pixels with 8px or more between them. Menus, footers and inline link lists are the usual offenders.</li>
<li><strong>Simplify navigation.</strong> A clear menu button, a short primary menu, a search field if the site is large, and the phone number tappable in the header for local businesses.</li>
<li><strong>Fix forms.</strong> Big fields, the right keyboard per field (email, phone, number), labels that stay visible, autofill enabled, and as few fields as the job allows.</li>
<li><strong>Remove intrusive pop-ups.</strong> Full-screen interstitials on mobile hurt rankings and conversions. A small banner, or a prompt after real engagement, if you must.</li>
</ol>
<h3>Performance</h3>
<ol start="9">
<li><strong>Compress and resize images.</strong> Serve images no wider than the screen needs, in modern formats (WebP or AVIF), with width and height attributes so the layout does not jump. Images are the number-one cause of slow mobile pages.</li>
<li><strong>Cut JavaScript.</strong> Every plugin, tracker and widget runs on a phone’s slower processor. Remove what you do not use; defer the rest.</li>
<li><strong>Preload the hero.</strong> The largest visible image or font should start loading first, not last.</li>
<li><strong>Reserve space for anything that loads late</strong> &mdash; ads, embeds, banners &mdash; so content does not jump as the page fills in.</li>
</ol>
<h3>Verification</h3>
<ol start="13">
<li><strong>Test on real devices</strong>, in both orientations, on a slow connection. Emulators miss touch and performance problems.</li>
<li><strong>Re-check after every change.</strong> One new plugin can undo a month of work.</li>
</ol>
</div>`,
      figure: { img: 'female-developer-red-hair-dual-monitors-code.jpg', alt: 'Engineer testing a responsive layout across screen sizes', w: 2400, h: 1601, cap: 'Responsive layout and the viewport tag first; everything else is refinement.' } },
    { h2: 'The Numbers That Define "Fast Enough" on Mobile', html: `
<div class="article-table-wrap"><table>
<tr><th>Metric</th><th>Good</th><th>What it measures on a phone</th></tr>
<tr><th>LCP &mdash; Largest Contentful Paint</th><td>&le; 2.5 s</td><td>How long until the main content shows on a cellular connection</td></tr>
<tr><th>INP &mdash; Interaction to Next Paint</th><td>&le; 200 ms</td><td>How quickly the page reacts to a tap</td></tr>
<tr><th>CLS &mdash; Cumulative Layout Shift</th><td>&le; 0.1</td><td>How much things jump around while loading &mdash; the "I tapped the wrong thing" metric</td></tr>
<tr><th>Body text size</th><td>&ge; 16 px</td><td>Readable without zooming</td></tr>
<tr><th>Tap targets</th><td>&ge; 44&times;44 px</td><td>Thumb-sized, with spacing</td></tr>
<tr><th>Page weight (key pages)</th><td>&lt; 1&ndash;2 MB</td><td>Loads in reasonable time on 4G; cheaper for visitors on metered data</td></tr>
</table></div>
<p>Users abandon slow mobile pages within a few seconds, and every extra second of load time measurably cuts conversions. These thresholds are Google’s published targets and a good build standard. For the engineering behind them, see <a href="/blog/what-is-technical-seo.html">technical SEO</a>.</p>` },
    { h2: 'Responsive Design, Explained Briefly', html: `
<p><strong>Responsive web design</strong> means building one site whose layout responds to the screen it is shown on: three columns on a desktop become one on a phone, images scale, menus collapse, type adjusts. It is done with flexible CSS grids and <em>media queries</em> &mdash; rules that apply at certain widths. The alternative approaches (a separate mobile site, or "adaptive" fixed layouts for a few set sizes) are legacy. "Mobile-first" is the modern refinement: design the phone layout first, then add complexity for larger screens, which produces lighter, cleaner sites. Every site TechAuditPros builds is mobile-first by default.</p>` },
    { h2: 'Mobile-Friendly and SEO', html: `
<p>Since Google moved to mobile-first indexing, the phone version of your page is the one it reads and ranks. Consequences: content hidden on mobile is hidden from ranking; slow mobile pages carry a Core Web Vitals penalty; intrusive interstitials are explicitly penalized; and the mobile-friendliness of your competitors is the bar you are measured against. A site that is beautiful on desktop and broken on phones is, for search purposes, broken.</p>`,
      figure: { img: 'istock-1489414046-woman-engineer-laptop-ops-room.jpg', alt: 'Engineer monitoring mobile performance metrics', w: 612, h: 323, cap: 'Google ranks the phone version. If it is slow or broken there, it is slow or broken everywhere that counts.' } },
    { h2: 'When to Stop Patching and Rebuild', html: `
<p>Patching a site that was never designed for phones has a ceiling. Signs you have hit it: the theme or page builder adds weight faster than you can remove it; every fix breaks something else; LCP will not drop below four seconds no matter what you compress; the layout is a set of desktop assumptions with mobile exceptions bolted on. At that point a mobile-first rebuild is cheaper than another year of patches &mdash; and it is an opportunity to fix the structure, content and SEO at the same time. That is how our <a href="/us/website-development/">US website builds</a> and <a href="/ca/website-development/">Canadian builds</a> are engineered: phone-first, to 90+ Core Web Vitals, with the technical SEO foundation in place from the first sprint. For what a rebuild costs, see <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>.</p>` },
  ],
  faqs: [
    { q: 'How do I know if my website is mobile-friendly?', a: 'Open it on a phone over cellular data: everything should be readable without zooming, tappable without mistakes, and free of sideways scrolling. Then run Google’s PageSpeed Insights on the mobile tab and check Core Web Vitals in Search Console.' },
    { q: 'What is the difference between mobile-friendly and responsive?', a: 'Responsive design is the technique &mdash; one layout that adapts to any screen width. Mobile-friendly is the outcome &mdash; a site that is readable, usable and fast on phones. Responsive design is how nearly every mobile-friendly site achieves it today.' },
    { q: 'Does a mobile-friendly website rank higher on Google?', a: 'Google indexes and ranks the mobile version of your site, uses Core Web Vitals as a ranking signal and penalizes intrusive mobile pop-ups. A site that is not mobile-friendly is at a direct disadvantage; one that is fast and usable on phones meets the baseline competitors are judged by.' },
    { q: 'How much does it cost to make a website mobile-friendly?', a: 'Fixing a mostly-sound site &mdash; viewport tag, images, tap targets, a few layout rules &mdash; is often a few days of engineering. Sites built on heavy desktop-era themes usually need a rebuild; TechAuditPros builds mobile-first sites one agreed monthly fee including ongoing updates.' },
    { q: 'What size should text be on a mobile website?', a: 'At least 16 pixels for body text, with line height around 1.5 and comfortable line lengths. Smaller text forces zooming, which Google flags as a mobile usability problem.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 26. Website cost
{
  slug: 'how-much-does-a-website-cost', cat: 'web', date: D,
  title: 'How Much Does a Website Cost in 2026? Real Numbers for US Businesses | TechAuditPros',
  desc: 'A business website costs anywhere from US$20 a month on a DIY builder to US$75,000+ from an agency. The real 2026 price ranges by site type and who builds it, the recurring costs nobody quotes, and how to compare quotes on a five-year basis.',
  eyebrow: 'Web Development',
  h1: 'How Much Does a Website Cost in 2026? Real Numbers for US Businesses',
  dek: 'Every "how much does a website cost" article says "it depends." It does &mdash; but on a small number of things you can actually price. Here are the 2026 ranges by site type and builder, the recurring costs, and how to compare quotes fairly.',
  lead: { img: 'istock-1954420507-stylus-tablet-charts-city-dusk.jpg', alt: 'Business owner reviewing website cost estimates on a tablet', w: 612, h: 402 },
  takeaways: [
    'In the US in 2026, a <strong>business website costs</strong> roughly US$20&ndash;$100 a month to build yourself on a DIY platform, US$3,000&ndash;$10,000 upfront from a freelancer, US$15,000&ndash;$75,000+ from an agency, or a flat monthly fee (TechAuditPros: one agreed monthly fee, all-in) from a build-and-run partner.',
    'The upfront number is only half the cost. Hosting, domain, security, maintenance, updates and the inevitable changes typically add US$500&ndash;$2,000+ a month for an agency-built site over its life.',
    'Compare quotes on a five-year total that includes ownership (do you own the code?), speed and SEO readiness, and what happens when you need a change &mdash; not on the build price alone.',
  ],
  intro: 'A <strong>business website costs</strong> between roughly US$20 a month and well over US$75,000 in 2026, and the spread comes down to three things: who builds it (you, a freelancer, an agency, or a build-and-run partner), what kind of site it is (brochure, lead generation, e-commerce, web application), and what is included after launch (hosting, maintenance, updates, SEO). Most articles stop at the first number. The number that matters is what the site costs over three to five years, including the changes you will inevitably need &mdash; and that total often favors a different option than the cheapest build.',
  sections: [
    { h2: 'Website Cost by Who Builds It', html: `
<div class="article-table-wrap"><table>
<tr><th>Option</th><th>Typical 2026 cost (US)</th><th>What you get</th><th>Hidden costs</th></tr>
<tr><th>DIY website builder</th><td>US$20&ndash;$100 per month, plus your time</td><td>Templates, drag-and-drop editing, hosting included</td><td>Your hours; limited speed and SEO control; you rent it &mdash; leaving means rebuilding</td></tr>
<tr><th>Freelancer</th><td>US$3,000&ndash;$10,000 upfront</td><td>Usually a template or theme customized to your brand</td><td>Maintenance often unavailable; continuity depends on one person; plugin licenses</td></tr>
<tr><th>Agency</th><td>US$15,000&ndash;$75,000+ upfront; six figures for large custom builds</td><td>Custom design and development, project management</td><td>Change requests billed hourly after launch; maintenance retainer US$500&ndash;$2,000+/month; timelines of 3&ndash;6 months</td></tr>
<tr><th>Build-and-run partner (flat monthly)</th><td>TechAuditPros on one agreed monthly fee, all-in</td><td>Custom design, Next.js/React build, hosting setup, ongoing updates, speed and SEO foundation</td><td>None beyond the monthly fee; you own the code and can leave with it</td></tr>
</table></div>
<p>Third-party ranges reflect commonly quoted US market pricing for small and mid-size businesses and vary with scope. The freelancer and agency figures usually exclude content, photography, hosting and maintenance.</p>` },
    { h2: 'Website Cost by Type of Site', html: `
<div class="article-table-wrap"><table>
<tr><th>Site type</th><th>Pages / complexity</th><th>Typical agency build</th><th>Notes</th></tr>
<tr><th>Brochure / small business</th><td>5&ndash;15 pages, contact form</td><td>US$3,000&ndash;$15,000</td><td>Design quality and speed vary enormously in this range</td></tr>
<tr><th>Lead-generation site</th><td>15&ndash;50 pages, service and location pages, forms, tracking, blog</td><td>US$10,000&ndash;$40,000</td><td>SEO structure and conversion design matter more than visual polish</td></tr>
<tr><th>E-commerce store</th><td>Catalog, cart, checkout, payments, shipping, inventory sync</td><td>US$10,000&ndash;$50,000 for small stores; US$50,000&ndash;$150,000+ for large or custom</td><td>Platform fees (Shopify plans, payment processing) are ongoing</td></tr>
<tr><th>Web application / portal</th><td>Logins, dashboards, integrations with CRM/ERP/payments</td><td>US$30,000&ndash;$150,000+</td><td>Closer to software development than web design; see <a href="/blog/web-application-vs-website.html">web application vs. website</a></td></tr>
<tr><th>Redesign of an existing site</th><td>Same as the new build, plus migration</td><td>70&ndash;110% of a new build</td><td>The redirect map and content migration are where redesigns lose rankings</td></tr>
</table></div>`,
      figure: { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Reviewing website wireframes that define the scope of a build', w: 720, h: 419, cap: 'Scope drives cost: pages, integrations and conversion features, not visual polish.' } },
    { h2: 'The Recurring Costs Nobody Quotes', html: `
<ul>
<li><strong>Domain:</strong> US$10&ndash;$20 a year for a standard .com.</li>
<li><strong>Hosting:</strong> US$5&ndash;$50 a month for a typical business site on modern infrastructure; more for e-commerce and applications. Cheap shared hosting is a common cause of slow sites.</li>
<li><strong>SSL certificate:</strong> free from most hosts now; still sometimes sold for US$50&ndash;$200 a year.</li>
<li><strong>Platform and plugin licenses:</strong> premium WordPress themes and plugins, Shopify plans (US$39&ndash;$399+/month), page builders, form tools &mdash; often US$300&ndash;$2,000 a year in total.</li>
<li><strong>Maintenance and security:</strong> updates, backups, patching, monitoring. Agencies commonly charge US$500&ndash;$2,000+ a month; unmaintained sites are how small businesses get hacked.</li>
<li><strong>Content changes and new pages:</strong> billed hourly (US$75&ndash;$200) after an upfront project, or included in a flat monthly arrangement.</li>
<li><strong>Email:</strong> US$6&ndash;$25 per user per month if bundled with your domain.</li>
</ul>
<div class="article-callout">A US$12,000 agency site with a US$800/month maintenance retainer and two hours of changes a month costs about US$70,000 over five years. That is the number to compare, not the US$12,000.</div>` },
    { h2: 'What Actually Drives the Price Up', html: `
<ol>
<li><strong>Custom design versus a template.</strong> Original design work is the biggest single variable in the build price &mdash; and the biggest driver of conversion and brand differentiation. See <a href="/blog/custom-website-vs-template.html">custom website vs. template vs. builder</a>.</li>
<li><strong>Number and type of pages.</strong> Ten templated pages cost little more than five; fifty unique service and location pages need content and structure.</li>
<li><strong>Integrations.</strong> CRM, booking, payments, inventory, ERP. Each is engineering, and each is where template sites break.</li>
<li><strong>E-commerce complexity.</strong> Catalog size, variants, shipping rules, tax, subscriptions.</li>
<li><strong>Content and photography.</strong> Often excluded from quotes and then discovered as a US$2,000&ndash;$10,000 line item.</li>
<li><strong>Performance and SEO engineering.</strong> Building to 90+ Core Web Vitals with proper structure costs more upfront than assembling a theme, and pays back in rankings and conversions for years.</li>
<li><strong>Accessibility.</strong> WCAG-conformant builds take more care; retrofitting accessibility is more expensive than building it in.</li>
</ol>` },
    { h2: 'How to Compare Website Quotes Fairly', html: `
<div class="article-checklist">
<h3>Ask every provider</h3>
<ol>
<li>What is the total cost over five years, including hosting, maintenance and a realistic number of changes?</li>
<li>Who owns the code, the content and the hosting account when we are done?</li>
<li>What Core Web Vitals scores do your recent sites achieve on mobile? Show me three live ones.</li>
<li>Is technical SEO (structure, schema, redirects, speed) included, or a separate service?</li>
<li>How are changes after launch handled and billed?</li>
<li>What is the timeline to a live first version?</li>
<li>What happens to our search rankings during a redesign &mdash; who owns the redirect map?</li>
</ol>
</div>
<p>The provider who answers all seven clearly is usually the right one even if not the cheapest. More on choosing in <a href="/blog/how-to-choose-a-web-development-company.html">how to choose a web development company</a>.</p>`,
      figure: { img: 'executive-woman-tablet-grand-hall.jpg', alt: 'Business owner comparing website proposals on a tablet', w: 2400, h: 1601, cap: 'Compare five-year totals, ownership and speed &mdash; not build prices.' } },
    { h2: 'What TechAuditPros Charges, and Why It Is Monthly', html: `
<p>We design, build and keep improving business websites one agreed monthly fee for <a href="/us/website-development/">US businesses</a> (one agreed monthly fee for <a href="/ca/website-development/">Canadian businesses</a>): custom design, a Next.js/React build engineered to 90+ Core Web Vitals, hosting setup in an account you own, the technical SEO foundation, and ongoing updates and new pages by the engineer who built it. The first live version typically ships in 4&ndash;8 weeks, and there is no long-term contract &mdash; you own the code and can leave with it. The reason it is monthly rather than a project fee is the five-year math above: a website is never finished, so pricing it as if it were just moves the real cost into change requests and retainers.</p>` },
  ],
  faqs: [
    { q: 'How much should a small business website cost?', a: 'In 2026, a DIY builder site runs US$20&ndash;$100 a month plus your time; a freelancer template site US$3,000&ndash;$10,000 upfront; an agency custom build US$15,000&ndash;$75,000+; and a build-and-run partner like TechAuditPros on one agreed monthly fee, all-in. Compare the five-year total, not the build price.' },
    { q: 'How much does a website cost per month?', a: 'Ongoing costs for a professionally built site commonly total US$500&ndash;$2,000+ a month once hosting, licenses, maintenance and changes are counted. A flat monthly build-and-run arrangement bundles all of it; DIY builders run US$20&ndash;$100 a month but include your own labor.' },
    { q: 'Why do website quotes vary so much?', a: 'Because "website" covers everything from a five-page template to a custom web application. Scope (pages, integrations, e-commerce), custom design versus a theme, performance and SEO engineering, content, and what is included after launch account for almost all of the spread.' },
    { q: 'Is it cheaper to build a website yourself?', a: 'Cheaper in cash, not in hours, and the result is usually slower, weaker for SEO and rented rather than owned. DIY makes sense for testing a very early idea; a business that depends on its website for customers usually outgrows it quickly.' },
    { q: 'How much does website maintenance cost?', a: 'Agencies commonly charge US$500&ndash;$2,000+ a month for updates, security patching, backups and monitoring, with content changes billed hourly on top. TechAuditPros includes maintenance and updates in its one agreed monthly fee.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 27. What is web development
{
  slug: 'what-is-web-development', cat: 'web', date: D,
  title: 'What Is Web Development? Front-End, Back-End and Full-Stack Explained for Business Owners | TechAuditPros',
  desc: 'Web development is the engineering that makes a website work: the front end people see, the back end that stores and processes data, and the infrastructure between. What each layer does, the technologies involved, how it differs from web design, and what to ask a developer.',
  eyebrow: 'Web Development',
  h1: 'What Is Web Development? Front-End, Back-End and Full-Stack, Explained for Business Owners',
  dek: 'You do not need to code to buy web development well, but you do need to know what the words mean. Here is what developers actually build, layer by layer, in plain English.',
  lead: { img: 'male-developer-dual-monitors-colorful-office.jpg', alt: 'Web developer writing code across two monitors', w: 766, h: 400 },
  takeaways: [
    '<strong>Web development</strong> is the engineering work of building and maintaining websites and web applications: writing the code that renders pages, handles forms, stores data, connects to other systems and keeps everything fast and secure.',
    'It has two halves. The <strong>front end</strong> is everything in the visitor’s browser (layout, interactivity, speed as experienced). The <strong>back end</strong> is everything on the server (databases, logins, payments, integrations). A <strong>full-stack</strong> developer works on both.',
    'Web <em>design</em> decides how it looks and flows; web <em>development</em> makes it work. Buying both from one team avoids the handoff where most projects lose time and fidelity.',
  ],
  intro: '<strong>Web development</strong> is the process of building and maintaining the software that runs a website or web application: the code that turns a design into pages a browser can display, makes buttons and forms work, stores and retrieves data, talks to other systems such as payment processors and CRMs, and keeps the whole thing fast, secure and online. It is distinct from web design (deciding how the site looks and how people move through it) and from content (what the site says), though a good build integrates all three. For a business owner, understanding the two halves &mdash; front end and back end &mdash; is enough to buy it well.',
  sections: [
    { h2: 'Front-End Development: What the Visitor Sees', html: `
<p>The front end is everything that runs in the visitor’s browser. Front-end developers take a design and turn it into working pages using three core technologies:</p>
<ul>
<li><strong>HTML</strong> &mdash; the structure and content: headings, paragraphs, images, links, forms.</li>
<li><strong>CSS</strong> &mdash; the presentation: layout, colors, typography, spacing, and how the layout adapts to phones and desktops (responsive design).</li>
<li><strong>JavaScript</strong> &mdash; the behavior: menus that open, forms that validate, content that updates without a page reload, animations.</li>
</ul>
<p>Modern front ends are usually built with a framework such as React (often via Next.js), Vue or Svelte, which organize the interface into reusable components. Front-end quality is what determines how fast a page <em>feels</em>, whether it works on a phone, and whether it is accessible to people using screen readers or keyboards.</p>` },
    { h2: 'Back-End Development: What Happens on the Server', html: `
<p>The back end is everything the visitor never sees. When someone submits a quote form, logs in, searches a catalog or pays, the back end does the work:</p>
<ul>
<li><strong>Server-side code</strong> in a language such as JavaScript (Node.js), Python, PHP, Ruby, Java or C# receives requests, applies business rules and returns results.</li>
<li><strong>Databases</strong> (PostgreSQL, MySQL, MongoDB and others) store the data: customers, orders, content, users.</li>
<li><strong>APIs</strong> (application programming interfaces) let the site exchange data with other systems &mdash; payment processors, CRMs, ERPs, shipping carriers, email tools.</li>
<li><strong>Authentication and security</strong>: logins, permissions, encryption, protection against attacks.</li>
<li><strong>Infrastructure</strong>: hosting, servers or serverless functions, content delivery networks, backups, monitoring &mdash; sometimes split out as "DevOps."</li>
</ul>
<p>A brochure site has a small back end or none; a customer portal or e-commerce store is mostly back end. TechAuditPros builds back ends on Node.js and PostgreSQL &mdash; the same stack behind our <a href="/us/erp/">custom ERP systems</a>, which is why a website and the business software behind it can share one team and one database.</p>`,
      figure: { img: 'istock-2215674808-senior-guiding-junior-code-night.jpg', alt: 'Senior developer reviewing back-end code with a colleague', w: 612, h: 408, cap: 'Front end is what you see; back end is what happens when you click.' } },
    { h2: 'Full-Stack Development', html: `
<p>A full-stack developer works across both halves &mdash; interface and server, database and deployment. For small and mid-size business projects this is usually the right shape of team: a couple of full-stack engineers can build a complete site or application without the coordination overhead of separate specialists, and there is no gap where "the front-end person" and "the back-end person" each assume the other handled something. Larger applications still benefit from specialists in each layer.</p>` },
    { h2: 'Web Development vs. Web Design', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Web design</th><th>Web development</th></tr>
<tr><th>Decides</th><td>How it looks and how people move through it</td><td>How it works, how fast it is, how it connects to other systems</td></tr>
<tr><th>Deliverables</th><td>Wireframes, prototypes, visual design, brand application</td><td>Working code, database, integrations, hosting, performance</td></tr>
<tr><th>Tools</th><td>Design software, prototyping tools</td><td>Code editors, frameworks, databases, cloud platforms</td></tr>
<tr><th>Failure mode when bought separately</th><td>Beautiful designs that are slow or impossible to build as drawn</td><td>Working sites that look generic or convert poorly</td></tr>
</table></div>
<p>The two disciplines are covered in depth in <a href="/blog/website-design-vs-development.html">website design vs. website development</a>. The short version: buy them from one team, so the design is built as designed and the build informs the design.</p>` },
    { h2: 'Website vs. Web Application', html: `
<p>A website mostly presents information; a web application mostly does things &mdash; logins, dashboards, transactions, workflows. The line is blurry (an e-commerce store is both) and it matters for cost and skills: an application is largely back-end engineering, priced and planned like software. The distinction is explored in <a href="/blog/web-application-vs-website.html">web application vs. website</a>.</p>` },
    { h2: 'Common Technologies, Decoded', html: `
<div class="article-table-wrap"><table>
<tr><th>Term</th><th>Plain English</th></tr>
<tr><th>CMS (content management system)</th><td>Software that lets non-developers edit content. WordPress is the best-known; "headless" CMS platforms store content and let developers render it with a modern front end.</td></tr>
<tr><th>Framework</th><td>A pre-built structure for writing an application faster and more consistently &mdash; React/Next.js for front ends, Node.js/Express for back ends.</td></tr>
<tr><th>Static site / SSG</th><td>Pages generated in advance and served as files &mdash; extremely fast and secure; how most of this site works.</td></tr>
<tr><th>SSR (server-side rendering)</th><td>Pages assembled on the server per request, so search engines and users get full content immediately. Good for SEO on dynamic sites.</td></tr>
<tr><th>API</th><td>A defined way for two systems to exchange data; how a site talks to a payment processor or CRM.</td></tr>
<tr><th>Hosting / cloud</th><td>Where the code runs: platforms such as Vercel, AWS or Google Cloud.</td></tr>
<tr><th>CDN (content delivery network)</th><td>Servers around the world that cache your pages close to visitors for speed.</td></tr>
<tr><th>Core Web Vitals</th><td>Google’s three speed and stability metrics; a good build targets LCP &le; 2.5 s, INP &le; 200 ms, CLS &le; 0.1.</td></tr>
</table></div>`,
      figure: { img: 'istock-2186780970-pair-review-workstation-atrium.jpg', alt: 'Two developers reviewing a build together at a workstation', w: 612, h: 408, cap: 'Frameworks, rendering, hosting: the choices behind how fast and findable a site is.' } },
    { h2: 'What to Ask a Web Developer Before Hiring', html: `
<ol>
<li>Which framework and hosting will you use, and why for our case?</li>
<li>Show me three live sites you built and their mobile Core Web Vitals.</li>
<li>Who owns the code and the hosting account?</li>
<li>How is the technical SEO foundation handled &mdash; structure, schema, redirects, speed?</li>
<li>How do you handle integrations with our CRM, payments or booking system?</li>
<li>What happens after launch &mdash; who maintains it, and how are changes billed?</li>
</ol>
<p>Fuller list in <a href="/blog/how-to-choose-a-web-development-company.html">how to choose a web development company</a>. For what it should cost, see <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>; for how we do it, the <a href="/us/website-development/">US website development page</a>.</p>` },
  ],
  faqs: [
    { q: 'What does a web developer do?', a: 'A web developer writes and maintains the code that makes websites and web applications work: turning designs into working pages (front end), building the databases, logins, payments and integrations behind them (back end), and keeping the result fast, secure and online.' },
    { q: 'What is the difference between front-end and back-end development?', a: 'Front-end development is everything that runs in the visitor’s browser &mdash; layout, interactivity, responsiveness. Back-end development is everything on the server &mdash; databases, business logic, authentication, integrations. Full-stack developers do both.' },
    { q: 'Is web development the same as web design?', a: 'No. Web design decides how a site looks and how people move through it; web development builds the working software. They are separate skills that work best on one team.' },
    { q: 'What programming languages are used in web development?', a: 'HTML, CSS and JavaScript on the front end (often with React or Next.js); JavaScript (Node.js), Python, PHP, Ruby, Java or C# on the back end; SQL for databases such as PostgreSQL and MySQL.' },
    { q: 'How long does web development take?', a: 'A business website typically goes from approved design to a live first version in 4&ndash;8 weeks. E-commerce stores and web applications are phased over several months, with useful pieces shipping early.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 28. Custom vs template
{
  slug: 'custom-website-vs-template', cat: 'web', date: D,
  title: 'Custom Website vs. Template vs. Website Builder: Which Should Your Business Use? | TechAuditPros',
  desc: 'A custom website is designed and coded for one business; a template site restyles a theme thousands share; a website builder rents you a drag-and-drop platform. Speed, SEO, ownership, cost and growth compared honestly, with a decision rule.',
  eyebrow: 'Web Development',
  h1: 'Custom Website vs. Template vs. Website Builder: Which Should Your Business Actually Use?',
  dek: 'Every business website starts with this choice, usually made by budget alone. Here is how the three options really differ on speed, SEO, ownership and growth &mdash; and a simple rule for which column you are in.',
  lead: { img: 'istock-2150307337-creative-studio-neon-review.jpg', alt: 'Designers comparing custom layouts and templates in a studio', w: 612, h: 323 },
  takeaways: [
    'A <strong>website builder</strong> rents you a platform and blocks; a <strong>template</strong> site customizes a theme thousands of other sites also run; a <strong>custom website</strong> is designed and coded around your business, and you own it outright.',
    'The differences that matter are not visual. They are speed (custom builds ship nothing you do not need), SEO control (markup, schema, redirects), integrations (direct rather than plugins), and ownership (leaving a builder means starting over).',
    'The rule: if the website has to <em>win customers</em> and grow with the business, build custom; if it only has to <em>exist</em> for a while, a builder or template is fine. Most growing companies cross that line sooner than they expect.',
  ],
  intro: 'A <strong>custom website</strong> is designed and coded specifically for one business &mdash; its customers, its conversion path, its integrations &mdash; and owned outright by that business. A <strong>template website</strong> takes a pre-built theme (most often for WordPress) shared by thousands of sites and restyles it with your logo, colors and content. A <strong>website builder</strong> (the drag-and-drop platforms advertised everywhere) rents you hosting and a block editor in one subscription. All three can produce something that looks acceptable. They differ sharply in how fast the site is, how much control you have over search visibility, how it connects to the rest of your business, and what happens when you want to leave &mdash; and those differences decide whether the site earns money or merely exists.',
  sections: [
    { h2: 'The Three Options, Defined', html: `
<ul>
<li><strong>Website builder.</strong> A hosted platform with drag-and-drop blocks and templates. You pay monthly, edit in a browser, and the platform handles hosting and updates. The trade: convenience for control, and you never own the site &mdash; it exists only on their platform.</li>
<li><strong>Template / theme site.</strong> Usually WordPress (or another CMS) with a purchased theme and a set of plugins, customized by you or a freelancer. You own the files, but the design and much of the code are shared with everyone else who bought the theme, and the plugin stack becomes your maintenance burden.</li>
<li><strong>Custom build.</strong> Designed from your business and customers, then coded &mdash; today usually on a modern framework such as Next.js and React &mdash; with only what you need. You own the code, the content and the hosting account.</li>
</ul>` },
    { h2: 'Side-by-Side Comparison', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Website builder</th><th>Template / theme</th><th>Custom build</th></tr>
<tr><th>Speed (Core Web Vitals)</th><td>Often poor; heavy scripts you cannot remove</td><td>Varies; degrades as plugins accumulate</td><td>Engineered to 90+; nothing unnecessary ships</td></tr>
<tr><th>Design</th><td>Preset blocks; recognizable as the builder</td><td>A theme thousands of sites share, restyled</td><td>Built around your customers and conversion path</td></tr>
<tr><th>SEO control</th><td>Basic; limited markup, schema and redirect control</td><td>Plugin-dependent; theme markup is what it is</td><td>Full control of structure, schema, redirects, rendering, speed</td></tr>
<tr><th>Integrations</th><td>Whatever the platform offers</td><td>Plugins, with compatibility and security upkeep</td><td>Direct connections to your CRM, ERP, payments, booking</td></tr>
<tr><th>Ownership</th><td>Rented; leaving means rebuilding from scratch</td><td>You own files; theme and plugin licenses continue</td><td>You own code, content, domain and hosting outright</td></tr>
<tr><th>Maintenance</th><td>Platform handles it</td><td>Yours: updates, plugin conflicts, security</td><td>Your engineering partner’s, or included in a flat fee</td></tr>
<tr><th>Cost pattern (US)</th><td>US$20&ndash;$100/month plus your time</td><td>US$3,000&ndash;$10,000 upfront plus maintenance</td><td>US$15,000&ndash;$75,000+ upfront from an agency, or flat monthly (TechAuditPros: one agreed monthly fee, all-in)</td></tr>
<tr><th>Time to launch</th><td>Days</td><td>2&ndash;6 weeks</td><td>4&ndash;8 weeks to a first live version</td></tr>
<tr><th>Best for</th><td>Testing a very early idea; a placeholder</td><td>Simple brochure sites with no growth plans</td><td>Businesses whose website has to win customers and grow</td></tr>
</table></div>`,
      figure: { img: 'female-developer-red-hair-dual-monitors-code.jpg', alt: 'Engineer hand-building a custom website across two monitors', w: 2400, h: 1601, cap: 'Custom builds ship only what you need &mdash; which is why they are fast and why they rank.' } },
    { h2: 'Where Templates and Builders Actually Fail', html: `
<p>Not on looks &mdash; on the things you discover six months in.</p>
<ul>
<li><strong>Speed decays.</strong> Every feature is a plugin or a block with its own scripts. Mobile scores slide; rankings and conversions follow. See why in <a href="/blog/how-to-make-a-website-mobile-friendly.html">how to make a website mobile-friendly</a>.</li>
<li><strong>The integration you need is not available,</strong> or exists as a fragile plugin that breaks on the next update.</li>
<li><strong>SEO hits a ceiling.</strong> You cannot control rendering, structured data or redirects well enough to compete on serious terms.</li>
<li><strong>You cannot leave cleanly.</strong> Builder sites do not export to anything usable; template sites carry plugin debt into any migration.</li>
<li><strong>You look like everyone else.</strong> The theme your competitor also bought is not a brand.</li>
</ul>` },
    { h2: 'Where Custom Builds Fail (Honestly)', html: `
<ul>
<li><strong>Bought as a one-time project.</strong> A custom site with no plan for maintenance and updates rots like any other; the upfront-project model pushes the real cost into change requests. Buy it with the running included.</li>
<li><strong>Over-engineered.</strong> A five-page site does not need a custom CMS and a microservice architecture. Custom should mean "only what you need," not "everything from scratch."</li>
<li><strong>Bought from the wrong team.</strong> A custom build by a team that does not do SEO produces a fast site nobody finds. Insist the technical SEO foundation is part of the build.</li>
</ul>`,
      figure: { img: 'team-flatlay-reviewing-wireframe-sketch.jpg', alt: 'Reviewing wireframes for a custom website before development', w: 720, h: 419, cap: 'Custom means designed from your business &mdash; not everything rebuilt from scratch.' } },
    { h2: 'The Decision Rule', html: `
<div class="article-checklist">
<h3>Which column are you in?</h3>
<ol>
<li><strong>Use a website builder if</strong> you are testing an idea, need something live this week, and would not mind rebuilding in a year.</li>
<li><strong>Use a template if</strong> the site is a simple brochure that will not change much, you have someone to maintain the plugins, and search visibility is not how you get customers.</li>
<li><strong>Build custom if</strong> the website has to win customers &mdash; through search, through conversion, through integration with how you sell &mdash; and you expect the business to grow. Every dollar of speed, SEO control and ownership compounds from here.</li>
</ol>
</div>
<p>Most businesses start in column one or two and move to column three when the site starts to matter. The cheapest path is to make that move once, deliberately, rather than through two or three rebuilds. TechAuditPros builds column-three sites for <a href="/us/website-development/">US businesses</a> and <a href="/ca/website-development/">Canadian businesses</a> on a flat monthly rate that includes the running &mdash; the pricing is compared in <a href="/blog/how-much-does-a-website-cost.html">how much a website costs in 2026</a>.</p>` },
  ],
  faqs: [
    { q: 'Is a custom website worth it for a small business?', a: 'If the website is how customers find and choose you, yes: speed, SEO control, direct integrations and ownership compound over years. If the site only needs to exist as a brochure, a template is usually enough.' },
    { q: 'What is the difference between a template and a custom website?', a: 'A template restyles a pre-built theme shared by many sites, with functionality added through plugins. A custom website is designed from your business and coded to include only what you need, which is why it is faster, more controllable for SEO, and fully yours.' },
    { q: 'Can a website builder site rank on Google?', a: 'For low-competition local terms, yes. For competitive terms, builders limit control over speed, markup, structured data and redirects, which caps how far the site can go.' },
    { q: 'How much more does a custom website cost?', a: 'From US agencies, US$15,000&ndash;$75,000+ upfront versus US$3,000&ndash;$10,000 for a template site. TechAuditPros builds custom sites one agreed monthly fee including design, build and ongoing updates, which over five years is often less than a template site plus maintenance.' },
    { q: 'Can I move from a website builder to a custom site later?', a: 'Yes, but builder platforms rarely export anything reusable, so it is a rebuild rather than a migration. Plan the redirect map carefully to keep whatever search visibility the old site earned.' },
  ],
  cta: WEB_CTA,
},
];
