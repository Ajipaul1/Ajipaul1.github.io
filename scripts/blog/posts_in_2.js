'use strict';
// India blog wave 2, posts 9-16 (ai_context/PLAN-IN §3) — the build questions. Same rules as wave 1: one cluster per
// post, Indian figures attributed, no "audit" as a service word, no "offshore", no price we charge, links up to /in/.
//   9  website development cost in india (cluster) · 10 wordpress website developer near me 390/13 · wordpress seo company 320/28
//   11 ecommerce website development mumbai/kolkata (1,300+260+260) · 12 manufacturing erp software india 1,000/15
//   13 garment manufacturing erp software 5,400/10 (companion to the service page) · 14 gst e-invoicing + erp
//   15 mobile speed / core web vitals india · 16 aeo / geo india
const D = '2026-09-07';
const WEB_CTA = { h3: 'Planning a site or a store?', p: 'Book a free strategy call. We look at what you have, tell you what it should cost to fix or replace &mdash; honestly, including &ldquo;keep it&rdquo; &mdash; and you get a staging URL from week one if we build it.' };
const ERP_CTA = { h3: 'Weighing up a system for your own business?', p: 'Book a free strategy call. We walk one real order through your business &mdash; from enquiry to invoice &mdash; and tell you honestly whether Tally plus discipline, a product or a custom build fits, including when the answer is &ldquo;not yet&rdquo;.' };
const SEO_CTA = { h3: 'Want the honest version for your own site?', p: 'Book a free strategy call, or message us on WhatsApp. We walk one real page through with you and tell you where the leverage is. The findings are yours to keep.' };
const F = (img, alt, cap) => ({ img: img + '.jpg', alt, cap });

module.exports = [
// ------------------------------------------------------------------ 9. Website development cost in India
{
  slug: 'website-development-cost-in-india-what-moves-the-number', cat: 'web', date: D,
  title: 'Website Development Cost in India: What Moves the Number | TechAuditPros',
  desc: 'Published Indian prices run from ₹10,000 for a template to ₹10 lakh+ for a custom platform. Here is what each band buys, the five things that actually move the number, and what a quote must include to be comparable.',
  eyebrow: 'Website pricing',
  h1: 'Website Development Cost in India: What Moves the Number',
  dek: 'A hundredfold range for the same phrase. This is the anatomy of a website quote in India, with the published bands beside each part and the questions that make two quotes comparable.',
  lead: F('inb-laptop-wooden-table', 'A laptop on a wooden table', 'The screen is the same size at ₹10,000 and at ₹10 lakh. What differs is everything behind it.'),
  takeaways: [
    'Published Indian bands (2026 guides): <strong>&#8377;10,000&ndash;&#8377;25,000</strong> template sites, <strong>&#8377;50,000&ndash;&#8377;1.5 lakh</strong> small business sites, <strong>&#8377;1.5&ndash;&#8377;4 lakh</strong> e-commerce, <strong>&#8377;2&ndash;&#8377;6 lakh</strong> custom, <strong>&#8377;10 lakh+</strong> web applications; blended Indian agency rates about $25&ndash;$60 an hour.',
    'Five things move the number: <strong>who writes the content, how many templates, what it must integrate with, how fast it must be on a phone, and who owns it afterwards</strong>.',
    'The cheapest quote is often the most expensive: page-builder lock-in, hosting you cannot leave, and a rebuild in eighteen months.',
    'A comparable quote states: pages and templates, content responsibility, integrations, a mobile speed target, ownership of code and hosting, and what support costs after launch.',
  ],
  intro: '<strong>Website development in India costs</strong> anywhere from about &#8377;10,000 for a template site to more than &#8377;10 lakh for a custom web application, according to the pricing guides ranking for this search in 2026 &mdash; a hundredfold range for one phrase. The range is real. A five-page clinic site and a 400-product store with GST invoicing and a stock integration are both &ldquo;a website&rdquo;. This article puts the published bands beside what each actually buys, names the five things that move the number, and lists what a quote has to state before you can compare it with another.',
  sections: [
    { h2: 'The Published Bands, and What Each Buys', html: `
<div class="article-table-wrap"><table>
<tr><th>Band (published, 2026)</th><th>What you typically get</th><th>What you typically do not</th></tr>
<tr><th>&#8377;10,000&ndash;&#8377;25,000</th><td>A theme on WordPress or a builder, your text pasted in, shared hosting</td><td>Speed on a phone, unique design, anyone to call later</td></tr>
<tr><th>&#8377;50,000&ndash;&#8377;1.5 lakh</th><td>A small business site: 5&ndash;15 pages, some design, a contact form, basic search setup</td><td>Content written for you, integrations, a performance target</td></tr>
<tr><th>&#8377;1.5&ndash;&#8377;4 lakh</th><td>E-commerce on Shopify or WooCommerce: catalogue, payments, GST invoicing via an app</td><td>Stock integration, custom pricing rules, speed work</td></tr>
<tr><th>&#8377;2&ndash;&#8377;6 lakh</th><td>Custom-designed site with unique templates and integrations</td><td>Ongoing development unless contracted</td></tr>
<tr><th>&#8377;10 lakh+</th><td>A web application: portals, dashboards, ERP-connected storefronts</td><td>A fixed scope, unless you insist on one</td></tr>
</table></div>
<p>Indian agency rates blended across a team are quoted at roughly $25&ndash;$60 an hour against $80&ndash;$180 in the US, which is why the same scope costs a third here &mdash; and why &ldquo;cheap&rdquo; in India still buys real work if the scope is real.</p>`,
      figure: F('inb-workspace-blue-seating', 'A contemporary workspace with blue seating', 'Blended Indian rates are a third of US rates. Cheap still buys real work here &mdash; if the scope is real.') },
    { h2: 'The Five Things That Move the Number', html: `
<ol>
<li><strong>Who writes the content.</strong> A site with your text pasted in is half the price of a site where someone interviews you, writes the pages and structures them for search. Most cheap quotes assume you will write it, and most clients never do.</li>
<li><strong>How many distinct templates.</strong> Not pages &mdash; templates. Twenty locality pages on one template cost little; five pages each designed from scratch cost a lot.</li>
<li><strong>What it must talk to.</strong> A form that emails you is free. A form that creates a lead in Zoho CRM, a store that reads stock from Tally, a booking system that syncs a calendar &mdash; each integration is development.</li>
<li><strong>How fast it must be on a phone.</strong> A site that scores 90 on Core Web Vitals on a mid-range Android on 4G is built differently from one that scores 35. Speed is a specification, not a hope.</li>
<li><strong>Who owns it afterwards.</strong> Code in your repository, hosting in your name, a domain you control: cheaper to specify up front than to recover later.</li>
</ol>`,
      band: F('inb-man-headphones-laptop', 'A man wearing headphones working at a laptop', 'Speed is a specification, not a hope. Say the number you want on a phone, and the quote will change to match.') },
    { h2: 'Why the Cheapest Quote Is Often the Most Expensive', html: `
<p>The &#8377;15,000 site arrives on a page builder the developer licenses, on hosting the developer controls, with a theme that ships 3MB images and a dozen plugins. It looks fine in the office. On a phone it takes eight seconds, so it ranks nowhere, so eighteen months later it is rebuilt &mdash; and the rebuild cannot reuse anything because nothing is yours.</p>
<p>The eighteen-month rebuild is the real price of the cheap site. When we are asked to quote against a much lower figure for <a href="/in/">Indian businesses</a>, we say this plainly and let the client decide; sometimes the cheap site genuinely is right, because the business needs a card on the internet and nothing more.</p>` },
    { h2: 'What a Comparable Quote Has to State', html: `
<p>Two quotes are comparable only when both state the same eight things. Ask for any that are missing before comparing figures.</p>
<ul>
<li>Number of pages <em>and</em> number of distinct templates.</li>
<li>Who writes and structures the content, and in which languages.</li>
<li>Every integration, named.</li>
<li>A mobile speed target, and on what device and connection it will be measured.</li>
<li>Where the code lives and whose name is on the hosting and domain.</li>
<li>What happens to search rankings on migration (the redirect map).</li>
<li>What is included after launch, for how long, and what an hour costs afterwards.</li>
<li>A staging URL you can open during the build.</li>
</ul>
<div class="article-callout">The staging URL is the tell. A developer who will show you the site as it is built has nothing to hide about how it is built.</div>`,
      figure: F('inb-laptop-black-blue', 'A black and blue laptop', 'Eight things stated, and two quotes become comparable. Without them, you are comparing confidence.') },
  ],
  faqs: [
    { q: 'How much does a website cost in India?', a: 'Published 2026 guides put template sites at &#8377;10,000&ndash;&#8377;25,000, small business sites at &#8377;50,000&ndash;&#8377;1.5 lakh, e-commerce at &#8377;1.5&ndash;&#8377;4 lakh, custom sites at &#8377;2&ndash;&#8377;6 lakh and web applications above &#8377;10 lakh. Blended Indian agency rates are roughly $25&ndash;$60 an hour.' },
    { q: 'Why do website quotes vary so much?', a: 'Because &ldquo;a website&rdquo; covers a five-page clinic site and a 400-product store with stock integration. Five things move the number: content responsibility, number of templates, integrations, the mobile speed target, and ownership afterwards.' },
    { q: 'Is a cheap website worth it?', a: 'When the business needs a card on the internet and nothing more, yes. When it needs to rank or sell, the cheap site is usually rebuilt within eighteen months and nothing from it is reusable, which makes it the most expensive option.' },
    { q: 'What should I own after the site is built?', a: 'The code (in a repository you control), the hosting account, the domain, the content and the analytics. If any is in the developer&rsquo;s name, the price you paid did not buy the site.' },
    { q: 'WordPress or custom for a small Indian business?', a: 'WordPress for most: fast to launch, everyone can edit it, and it is yours. Custom when the catalogue, pricing or integrations are genuinely unusual. Either way, insist on a mobile speed target and a staging URL.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 10. WordPress in India, done properly
{
  slug: 'wordpress-website-development-india-done-properly', cat: 'web', date: D,
  title: 'WordPress Website Development in India: Done Properly | TechAuditPros',
  desc: 'WordPress is the right answer for most Indian small businesses and the wrong build for most of them. Here is what "done properly" means: speed on a 4G Android, no builder lock-in, ownership, and search structure from day one.',
  eyebrow: 'WordPress',
  h1: 'WordPress Website Development in India: Done Properly',
  dek: 'Forty-odd per cent of the web runs on it, and most Indian WordPress sites are slow, locked to a page builder and owned by whoever built them. The platform is not the problem. The build is.',
  lead: F('inb-macbook-two', 'A laptop on a desk', 'The platform is fine. Most WordPress problems in India are build problems: weight, lock-in and ownership.'),
  takeaways: [
    'WordPress is the <strong>right choice for most Indian small businesses</strong>: fast to launch, editable by your staff, owned by you.',
    '&ldquo;Done properly&rdquo; means four things: <strong>speed measured on a mid-range Android on 4G, no page-builder lock-in, the repository and hosting in your name, and search structure from day one</strong>.',
    'The typical Indian WordPress site fails all four: a builder theme, 3MB images, twenty plugins, shared hosting, and the developer&rsquo;s login.',
    'A WordPress SEO company that cannot edit the theme is a content agency. Ask who will fix the template.',
  ],
  intro: '<strong>WordPress website development in India</strong> is the most common way a small business gets online, and the platform deserves its share: it launches fast, your own staff can edit it, and it is genuinely yours. The trouble is the typical build &mdash; a page-builder theme, hero images at 3MB, twenty plugins, shared hosting, and a developer who keeps the only login. That site scores 35 on mobile, ranks for its own name and nothing else, and is rebuilt in eighteen months. This article is what &ldquo;done properly&rdquo; means, so you can specify it or check for it.',
  sections: [
    { h2: 'When WordPress Is the Right Answer', html: `
<p>More often than developers admit. WordPress is right when:</p>
<ul>
<li>your own people need to edit pages, add posts and change prices without a developer;</li>
<li>you want to launch in weeks, not months;</li>
<li>the site is content and enquiry, or a modest store on WooCommerce;</li>
<li>you want to own it outright and be able to move it.</li>
</ul>
<p>It is the wrong answer when the catalogue, pricing rules or stock model are genuinely unusual, or when the site is really an application. For those, see <a href="/blog/ecommerce-website-development-india-shopify-woocommerce-custom.html">Shopify vs WooCommerce vs custom</a>. For most businesses reading this, though, WordPress is right &mdash; and the build is where it goes wrong.</p>`,
      figure: F('inb-man-table-laptop', 'A man sitting at a table with a laptop', 'Right for most: your people edit it, it launches in weeks, and it is yours.') },
    { h2: 'Done Properly, Part One: Speed on a Phone', html: `
<p>Indian speed guides put around 60% of Indian websites outside Core Web Vitals thresholds, and WordPress sites built on page builders are the bulk of them. Done properly means:</p>
<ul>
<li><strong>A light theme, not a builder.</strong> Block-based themes or a hand-built theme; no Elementor-style builder shipping a megabyte of CSS to every page.</li>
<li><strong>Images sized and compressed.</strong> WebP or AVIF, dimensions set, lazy-loaded below the fold. The 3MB hero is the single largest cause of slow Indian sites.</li>
<li><strong>Plugins counted.</strong> Under ten, each justified. Every plugin is a script on every page.</li>
<li><strong>Caching and a CDN with Indian edges.</strong> Server-side caching plus a CDN that serves from Mumbai and Chennai, not only from Singapore.</li>
<li><strong>Measured on the right device.</strong> A &#8377;12,000 Android on a 4G connection, throttled. If the build brief does not say this, the build will be measured on a laptop and will pass.</li>
</ul>`,
      band: F('inb-macbook-on', 'A laptop showing an error screen', 'Measured on an office laptop, every site passes. Measure where your buyer is: a mid-range Android on a variable 4G connection.') },
    { h2: 'Done Properly, Part Two: Ownership and No Lock-In', html: `
<p>The second failure is quieter. The site runs on a builder the developer licenses, on hosting the developer resells, with a theme bought under the developer&rsquo;s account, and only the developer can log in. It is a subscription dressed as a website.</p>
<p>Done properly: the WordPress install is in your hosting account, in your name, with your card; the theme and plugins are licensed to you; the code is in a repository you can hand to the next developer; and you have the administrator login, not a limited editor role. None of this costs more. It only has to be asked for &mdash; and a developer who resists it has told you something.</p>` },
    { h2: 'Done Properly, Part Three: Search Structure From Day One', html: `
<p>&ldquo;WordPress SEO company&rdquo; is a search of its own, and most of what ranks for it sells content. The structural half is set at build time and rarely revisited:</p>
<ul>
<li>clean permalinks and one canonical URL per page (no <code>?p=</code>, no tag archives indexed);</li>
<li>a heading hierarchy the theme respects (one H1, H2s that mean something);</li>
<li>schema for LocalBusiness or Organization, Article and FAQ, from the theme rather than a plugin bolted on;</li>
<li>hreflang if the site is bilingual &mdash; Malayalam and English, Bengali and English &mdash; so the languages help rather than compete;</li>
<li>a locality-page template if the business serves several neighbourhoods;</li>
<li>a redirect map if the site replaces an old one, so years of authority are not thrown away on launch day.</li>
</ul>
<p>Ask any WordPress SEO company who on their team can edit the theme. If nobody can, they are a content agency, and the structural half of your search work will stay undone. We build WordPress for <a href="/in/">Indian businesses</a> with the search structure in the theme and hand you the repository; the <a href="/in/mumbai/">Mumbai</a> and <a href="/in/kolkata/">Kolkata</a> pages set out how that runs.</p>`,
      figure: F('inb-phone-on-keyboard', 'A phone resting on a laptop keyboard', 'Structure is set at build time. A content agency cannot fix a theme it cannot edit.') },
  ],
  faqs: [
    { q: 'Is WordPress good for a small business website in India?', a: 'Yes, for most. It launches fast, your staff can edit it, and you own it. The failures are build failures &mdash; page-builder weight, huge images, too many plugins, hosting in the developer&rsquo;s name &mdash; not platform failures.' },
    { q: 'Why is my WordPress site slow on mobile?', a: 'Usually a page-builder theme shipping a megabyte of CSS, uncompressed hero images, fifteen to twenty plugins and shared hosting without caching or an Indian CDN edge. Fixing images and the theme typically moves Core Web Vitals more than anything else.' },
    { q: 'How much does WordPress development cost in India?', a: 'Published 2026 guides put template WordPress sites at &#8377;10,000&ndash;&#8377;25,000 and properly built small business sites at &#8377;50,000&ndash;&#8377;1.5 lakh, with WooCommerce stores from about &#8377;1.5 lakh. The difference is content, speed work, and ownership.' },
    { q: 'What should I ask a WordPress developer before hiring?', a: 'Whose name the hosting and domain will be in; whether you get the administrator login and the repository; what device and connection the speed will be measured on; how many plugins; and whether the theme is a builder.' },
    { q: 'Do I need a WordPress SEO company?', a: 'You need someone who can edit the theme and someone who can write. If a WordPress SEO company has no one who can do the first, the structural half of the work &mdash; canonicals, schema, speed, hreflang &mdash; will not get done.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 11. Ecommerce website development in India
{
  slug: 'ecommerce-website-development-india-shopify-woocommerce-custom', cat: 'web', date: D,
  title: 'Ecommerce Website Development in India: Shopify vs WooCommerce vs Custom, with GST | TechAuditPros',
  desc: 'The honest three-way comparison for Indian stores: launch speed, transaction fees, GST invoicing, payment gateways, stock integration and who owns what. Plus the one question that decides it.',
  eyebrow: 'E-commerce development',
  h1: 'Ecommerce Website Development in India: Shopify vs WooCommerce vs Custom, with GST',
  dek: 'Every Indian store guide picks a winner. The truthful answer depends on how fast you must launch, how much you sell, how odd your catalogue is, and whether the number on the product page has to be true.',
  lead: F('inb-red-truck-white-wall', 'A red goods truck against a white wall', 'The store is the front. The truck, the godown and the GST invoice are the business. Pick the platform that can talk to them.'),
  takeaways: [
    '<strong>Shopify:</strong> fastest launch (days), hosting and security bundled, GST invoices need an app, transaction fees that compound; comparison guides call it expensive past roughly &#8377;10 crore a year.',
    '<strong>WooCommerce:</strong> zero platform transaction fee, native Indian gateway support, mature GST plugins, more maintenance; guides estimate ~&#8377;1.2 lakh a year saved on fees at &#8377;5 lakh monthly sales versus Shopify Basic.',
    '<strong>Custom:</strong> for unusual catalogues, pricing rules or stock models; slowest to launch, fastest to load, wholly yours.',
    'The deciding question is not features. It is: <strong>does the number on the product page have to be true?</strong> If yes, the platform must integrate with the stock system.',
  ],
  intro: '<strong>Ecommerce website development in India</strong> comes down to three choices &mdash; Shopify, WooCommerce or a custom build &mdash; and the comparison guides ranking for the question in 2026 mostly agree on the facts: Shopify launches fastest and bundles hosting; WooCommerce has no platform transaction fee and the deepest Indian payment and GST plugin ecosystem; custom fits what neither can express. Where they differ is which to pick, and that depends on your business, not on the guide. This article lays the facts side by side, adds the GST and stock realities Indian stores actually live with, and ends with the one question that decides it.',
  sections: [
    { h2: 'The Facts, Side by Side', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>Shopify</th><th>WooCommerce</th><th>Custom</th></tr>
<tr><th>Time to first sale</th><td>Days: theme, products, gateway</td><td>One to two weeks with a professional</td><td>Weeks to months</td></tr>
<tr><th>Hosting and security</th><td>Bundled</td><td>Yours to manage (or managed hosting)</td><td>Yours</td></tr>
<tr><th>Platform transaction fee</th><td>Yes, unless Shopify Payments (not available in India as of the guides)</td><td>None</td><td>None</td></tr>
<tr><th>GST invoicing</th><td>Via an app (Tera GST, Sufio and others named in guides)</td><td>Mature plugins; HSN, CGST/SGST/IGST splits</td><td>Built in, to your accountant&rsquo;s spec</td></tr>
<tr><th>Indian payment gateways</th><td>Razorpay, PayU, Cashfree and others via integrations</td><td>Native plugins for all major gateways and UPI</td><td>Direct integration</td></tr>
<tr><th>Speed on 4G Android</th><td>Good if the theme is light and apps are few</td><td>Depends entirely on the build</td><td>Fastest, if built for it</td></tr>
<tr><th>Unusual pricing / stock</th><td>Apps, with limits</td><td>Plugins and code</td><td>Anything</td></tr>
<tr><th>Cost at scale</th><td>Guides call it expensive past ~&#8377;10 crore/yr (Plus tier, fees)</td><td>Hosting grows; no fee</td><td>Development grows</td></tr>
<tr><th>You own</th><td>Your data; not the platform</td><td>Everything</td><td>Everything</td></tr>
</table></div>`,
      figure: F('inb-night-market-shopping', 'A crowded street market at night', 'Three platforms, one market. The right one depends on how fast you must open, how much you sell, and how odd your shelf is.') },
    { h2: 'The GST Reality', html: `
<p>Every Indian store must issue GST-compliant invoices: HSN codes at the required digit level, CGST/SGST or IGST splits by destination state, the seller&rsquo;s GSTIN on every order, and &mdash; above the e-invoicing turnover threshold &mdash; an IRN from the Invoice Registration Portal. Shopify does not do this natively; guides point to apps. WooCommerce does it through mature plugins. Custom does it however your CA specifies.</p>
<p>Two practical notes the guides make: GST-registered sellers can claim input tax credit on platform subscription and gateway fees; and destination-state tax splits depend on shipping address logic that must be right at checkout, not fixed in the accounts later. Thresholds and rates move; we point at the GST portal rather than restating them, and we wrote the system side separately in <a href="/blog/gst-e-invoicing-and-your-erp-india.html">GST e-invoicing and your ERP</a>.</p>`,
      band: F('inb-street-market-shops', 'A crowded street market with shops and people', 'Every one of these sales carries a GST split by destination. The platform has to get it right at checkout, not in the accounts afterwards.') },
    { h2: 'The Fee Arithmetic', html: `
<p>Indian comparison guides run the numbers roughly like this: at &#8377;5 lakh a month in sales, Shopify Basic&rsquo;s transaction fee costs around &#8377;10,000 a month more than WooCommerce&rsquo;s zero &mdash; about &#8377;1.2 lakh a year &mdash; before hosting and maintenance are counted on the WooCommerce side. At &#8377;50 lakh a month the gap is large enough to fund a developer; at &#8377;50,000 a month it is smaller than the cost of managing your own hosting. So the honest answer to &ldquo;which is cheaper&rdquo; is &ldquo;at what volume&rdquo;.</p>
<p>The guides also agree on the other end: past roughly &#8377;10 crore a year, Shopify Plus pricing and fees make Shopify expensive relative to a well-run WooCommerce or custom store. Brands that start on Shopify to launch fast and migrate later are common, and the migration is a redirect-map exercise if planned.</p>` },
    { h2: 'The Question That Decides It', html: `
<p>Not features. Not fees. This: <strong>does the number on the product page have to be true?</strong></p>
<p>For a small store shipping from one shelf, the answer is &ldquo;more or less&rdquo;, and Shopify or WooCommerce with a spreadsheet is fine. For a trader with three godowns, a manufacturer selling finished goods, or a D2C brand that has been apologising for overselling every week, the answer is yes &mdash; and then the platform is chosen by how well it integrates with the stock and order system, because that system is the truth and the storefront is a window on it.</p>
<p>That is how we choose for <a href="/in/mumbai/">Mumbai</a> e-commerce clients: the storefront and the stock system are one project. Shopify when the store must be selling next month and the catalogue is ordinary; WooCommerce when the business lives in WordPress and wants zero fees; custom when the catalogue, pricing or stock model is genuinely unusual. And whichever it is: fast on a 4G Android, a staging URL from week one, and the code and accounts in your name.</p>
<div class="article-callout">If a developer answers &ldquo;which platform?&rdquo; before asking how you know what is in stock, they are selling the platform they know.</div>`,
      figure: F('inb-load-on-motorcycle', 'A motorcycle parked on a city street', 'The last mile is the easy part. The hard part is the product page telling the truth about what the godown holds.') },
  ],
  faqs: [
    { q: 'Shopify or WooCommerce for an Indian online store?', a: 'Shopify when the store must be selling within days and you would rather not manage hosting, plugins or security. WooCommerce when the business already lives in WordPress, wants zero platform transaction fees and native Indian gateway and GST plugins, and can handle maintenance. Comparison guides estimate WooCommerce saves around &#8377;1.2 lakh a year in fees at &#8377;5 lakh monthly sales.' },
    { q: 'Does Shopify support GST invoices in India?', a: 'Not natively. Indian guides point to apps such as Tera GST or Sufio for invoices with HSN codes, CGST/SGST/IGST splits and the seller GSTIN. WooCommerce does it through mature plugins; a custom store does it to your accountant&rsquo;s specification.' },
    { q: 'How much does an e-commerce website cost in India?', a: 'Published 2026 guides put e-commerce builds at roughly &#8377;1.5&ndash;&#8377;4 lakh on Shopify or WooCommerce, and custom stores from about &#8377;2 lakh to well above &#8377;10 lakh when stock integration, pricing rules or a portal are involved.' },
    { q: 'When does a custom e-commerce build make sense?', a: 'When the catalogue, pricing rules or stock model cannot be expressed by a platform &mdash; configurable products, customer-class pricing, multi-godown allocation &mdash; or when the storefront must read live availability from an ERP. Otherwise a platform is faster and cheaper.' },
    { q: 'Can I start on Shopify and move later?', a: 'Yes, and many Indian brands do once fees or limits bite. Plan the migration as a redirect-map exercise so search authority moves with the products, and export orders and customers before the switch.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 12. Manufacturing ERP in India
{
  slug: 'manufacturing-erp-india-mrp-gst-einvoicing-eway-bills', cat: 'erp', date: D,
  title: 'Manufacturing ERP in India: MRP, GST, E-Invoicing and E-Way Bills in One System | TechAuditPros',
  desc: 'What a manufacturing ERP in India must do beyond generic ERP: bills of materials, MRP, job work, shop-floor booking, plus the compliance layer — GST, IRN, e-way bills, TDS — in one flow. With the four questions worth buying software for.',
  eyebrow: 'Manufacturing ERP',
  h1: 'Manufacturing ERP in India: MRP, GST, E-Invoicing and E-Way Bills in One System',
  dek: 'Generic ERP stops at the factory door. Indian manufacturing ERP has to add the production layer and the compliance layer, and make them one flow from works order to e-way bill.',
  lead: F('inb-factory-behind-field', 'A factory beyond a field of grass', 'From this building, every despatch needs a works order behind it and an e-way bill in front of it. The system has to hold both.'),
  takeaways: [
    'Manufacturing ERP = generic ERP + the <strong>production layer</strong> (BOMs, routing, MRP, works orders, shop-floor booking, WIP, traceability, job work) + in India the <strong>compliance layer</strong> (GST splits, IRN via IRP, e-way bills, TDS/TCS).',
    'The four questions worth buying software for: <strong>what stock do we really hold, can we promise this date, what did that job cost, can we prove it</strong>.',
    'Job work is the Indian wrinkle: fabric at the dyer, castings at the machinist &mdash; still your stock, still your liability, and invisible to most generic systems.',
    'The test in a demo: one flow from works order to despatch to IRN to e-way bill, with your data. Products that need a &ldquo;localisation partner&rdquo; are not Indian-ready.',
  ],
  intro: '<strong>Manufacturing ERP software in India</strong> has to do two things generic ERP does not. First, the production layer: bills of materials, routing, material requirements planning, works orders, shop-floor booking, work in progress, traceability and &mdash; the Indian wrinkle &mdash; job work sent to and returned from subcontractors. Second, the compliance layer: GST splits at item level, e-invoice IRNs generated through the Invoice Registration Portal, e-way bills raised from the despatch, TDS and TCS where they apply. The products ranking for this search in 2026 &mdash; Sage X3, SAP Business One, ERPNext, Odoo, and Indian sector products like Zyno, Vasy and Udyog &mdash; all claim both. This article is how to test the claim, and the four questions that decide whether you need any of it.',
  sections: [
    { h2: 'The Four Questions Worth Buying Software For', html: `
<ul>
<li><strong>What stock do we actually hold?</strong> Per godown, per bin, including what is committed to open works orders and what is out at a job-worker. Not the figure in Tally, not Friday&rsquo;s count.</li>
<li><strong>Can we promise this date?</strong> Needs the BOM, current stock, supplier lead times and shop capacity in one place. Without it, every date is a guess with a confident voice.</li>
<li><strong>What did that job actually cost?</strong> Material issued, hours booked, machine time, job-work charges, scrap. Averages hide the loss-makers.</li>
<li><strong>Can we prove it?</strong> Lot and batch genealogy forwards and backwards, with test certificates attached to the job &mdash; for the buyer&rsquo;s inspector, the FSSAI or drug inspector, or the export documentation.</li>
</ul>
<div class="article-callout">If a demo cannot answer those four with your own data, the feature list is decoration. Ask to see them in that order.</div>`,
      figure: F('inb-cluttered-industrial-workshop', 'A man in a cluttered industrial workshop', 'Question one, made physical: what is really here, what is committed, and what is out at the job-worker.') },
    { h2: 'The Production Layer', html: `
<div class="article-table-wrap"><table>
<tr><th>Module</th><th>What it does</th><th>The Indian detail</th></tr>
<tr><th>Bills of materials</th><td>Multi-level components with revisions</td><td>Size-and-colour matrices for garments; formulas and yields for food, spices, pharma</td></tr>
<tr><th>Routing and MRP</th><td>What to make or buy, and when</td><td>Supplier lead times that include transit from another state</td></tr>
<tr><th>Works orders and shop-floor booking</th><td>Labour, machine time, quantities, scrap where they happen</td><td>Piece-rate and contract labour booking</td></tr>
<tr><th>Job work</th><td>Material out to a subcontractor and back, with cost and custody</td><td>Delivery challans, job-work returns within the GST time limits, ITC-04 reporting</td></tr>
<tr><th>WIP valuation</th><td>Work in progress at any date</td><td>The year-end question the CA always asks</td></tr>
<tr><th>Traceability</th><td>Lot and batch genealogy</td><td>FSSAI, drug licence and export inspection evidence</td></tr>
</table></div>
<p>Not all of it on day one. The sensible order stops the most expensive daily problem first &mdash; usually stock accuracy or job-work visibility &mdash; and phases the rest as each piece goes into real use.</p>`,
      band: F('inb-blue-industrial-sheds', 'A row of blue industrial buildings along a road', 'Job work is the Indian wrinkle: material out to the unit next door is still your stock and still your liability.') },
    { h2: 'The Compliance Layer, as One Flow', html: `
<p>Indian compliance is not a report at month end. It is a sequence of events on every despatch, and a manufacturing ERP either performs them in one flow or leaves your people re-keying between systems and the portal.</p>
<ol>
<li><strong>The invoice</strong> carries HSN at the required digit level, the correct CGST/SGST or IGST split by destination, and the buyer&rsquo;s GSTIN validated.</li>
<li><strong>The IRN</strong> is generated through the IRP (directly or via a GSP) with the QR code on the invoice, for businesses above the e-invoicing threshold; two-factor authentication applies from April 2026 per the current guidance.</li>
<li><strong>The e-way bill</strong> is raised from the despatch record &mdash; vehicle, transporter, distance &mdash; not typed again on the portal.</li>
<li><strong>TDS/TCS</strong> is applied where the thresholds require.</li>
<li><strong>The accounting entry</strong> lands in Tally (or whichever book of record the CA keeps) through the official integration.</li>
</ol>
<p>Thresholds, digit levels and dates move; we point at the GST portal rather than restating them. The test does not move: ask to watch one despatch go from works order to e-way bill in a demo, with your data. We wrote the e-invoicing part in full at <a href="/blog/gst-e-invoicing-and-your-erp-india.html">GST e-invoicing and your ERP</a>.</p>` },
    { h2: 'Buy, Build, or Not Yet', html: `
<p><strong>Not yet</strong> is the honest answer for a unit under twenty people with one shed and standard processes: Tally kept clean, a stock count that is believed, a works-order book. Software does not create discipline.</p>
<p><strong>Buy</strong> for most mid-sized manufacturers with standard production methods. Sage X3 and SAP Business One at the top of the mid-market, Odoo and ERPNext where a capable partner exists, Indian sector products where the sector fit is real &mdash; garments, pharma, food. Test the compliance flow and the job-work module before anything else.</p>
<p><strong>Build</strong> when the process is the reason the business is still on spreadsheets and two demos have ended in &ldquo;we can configure that&rdquo;. We build that for <a href="/in/">Indian manufacturers</a>, and the garment version is a page of its own: <a href="/blog/garment-textile-erp-explained-india.html">garment and textile ERP explained</a>.</p>`,
      figure: F('inb-metal-pipework', 'Dusty machinery in an old mill', 'Buy when the process is standard. Build when the process is the reason you are still on paper. Wait when the discipline is not there yet.') },
  ],
  faqs: [
    { q: 'What is the difference between manufacturing ERP and generic ERP?', a: 'Generic ERP handles finance, purchasing, stock and sales. Manufacturing ERP adds the production layer &mdash; bills of materials, routing, MRP, works orders, shop-floor booking, WIP, traceability and job work &mdash; and in India must run the compliance layer (GST splits, IRN, e-way bills, TDS) as one flow from works order to despatch.' },
    { q: 'Which is the best manufacturing ERP software in India?', a: 'It depends on production method and size. Sage X3 and SAP Business One lead the mid-market; ERPNext and Odoo are strong open-source options with Indian localisation; sector products (garments, pharma, food) often fit better than a global product configured for the sector. Test the job-work module and the GST flow with your own data.' },
    { q: 'What is job work in ERP and why does it matter in India?', a: 'Material sent to a subcontractor &mdash; fabric to a dyer, castings to a machinist &mdash; and returned as processed goods. It is still your stock and your GST liability, with delivery challans, return time limits and ITC-04 reporting. Generic systems make it invisible; Indian manufacturing ERP must track it.' },
    { q: 'Does manufacturing ERP handle e-invoicing and e-way bills?', a: 'It should generate the IRN through the IRP or a GSP and raise the e-way bill from the despatch record without re-keying. Ask to see one despatch go from works order to e-way bill in a demo; a product that needs a &ldquo;localisation partner&rdquo; for this is not Indian-ready.' },
    { q: 'Should a small manufacturer buy ERP or keep Tally?', a: 'Under about twenty people with one shed and standard processes, keep Tally clean and add discipline. Buy when stock accuracy, job-work visibility or job costing has become a daily cost. Build only when two products have ended in workarounds.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 13. Garment & textile ERP explained
{
  slug: 'garment-textile-erp-explained-india', cat: 'erp', date: D,
  title: 'Garment & Textile ERP Explained: What a Tiruppur or Kannur Unit Actually Needs | TechAuditPros',
  desc: 'Size-and-colour matrices, cut-to-pack ratios, fabric consumption and GSM, CMT job work, style costing and GST — the parts of garment manufacturing that generic ERP cannot express, explained for Indian units, with the questions to ask any vendor.',
  eyebrow: 'Garment ERP',
  h1: 'Garment &amp; Textile ERP Explained: What a Tiruppur or Kannur Unit Actually Needs',
  dek: 'The single strongest keyword in the owner&rsquo;s India data is &ldquo;garment manufacturing ERP software&rdquo;. This is the plain-language version of what it means, and why a T-shirt is not a widget.',
  lead: F('inb-garment-factory-busy', 'Workers busy in an industrial garment factory', 'A style, six sizes, four colours, three fabric lots, two job-workers and one shipping date. Generic ERP sees a product; a garment ERP sees this.'),
  takeaways: [
    'Garments break generic ERP on five things: the <strong>size-and-colour matrix</strong>, <strong>fabric consumption and GSM</strong>, <strong>cut-to-pack ratios</strong>, <strong>CMT and job work</strong>, and <strong>style-level costing</strong>.',
    'Indian apparel is roughly 2.3% of GDP and 45 million jobs (industry figures); most units run on Tally, Excel and WhatsApp, which is why the search is so large.',
    'A garment ERP must handle job work as first-class: fabric to dyeing, cut panels to a CMT unit, back as finished pieces &mdash; with GST challans and returns.',
    'The vendor test: load one real style with its matrix and ask the system to plan fabric, cost the style and track a job-work lot. Most demos cannot.',
  ],
  intro: '<strong>Garment manufacturing ERP software</strong> exists because a garment is not a widget. One style comes in six sizes and four colours (a 24-cell matrix, each cell an SKU), is cut from fabric whose consumption depends on GSM and marker efficiency, passes through a cutting room, a sewing line and often a CMT job-worker, and is costed at style level with fabric, trims, labour and job-work charges. Generic ERP, and Tally, see a product with a quantity. This article explains the five things that break generic systems, what a garment ERP does about each, the Indian compliance detail around job work, and the one test that separates a real garment system from a relabelled one.',
  sections: [
    { h2: 'Five Things That Break Generic ERP', html: `
<ul>
<li><strong>The size-and-colour matrix.</strong> Style A in S&ndash;XXL and four colours is 24 SKUs that must be planned, cut, sewn, packed and sold as one style and as 24 items at once. Generic ERP makes you choose.</li>
<li><strong>Fabric consumption and GSM.</strong> How many metres of 180 GSM single jersey per piece depends on size, marker efficiency and shrinkage. Fabric is the largest cost; guessing it is guessing the margin.</li>
<li><strong>Cut-to-pack ratios.</strong> A buyer&rsquo;s order for 1,200 pieces in a 1:2:3:2:1 size ratio drives the cut plan, and the cut plan drives fabric issue. The ratio is a first-class object.</li>
<li><strong>CMT and job work.</strong> Cut panels out to a sewing unit, garments to washing or printing, back as finished pieces &mdash; with the pieces still your stock, and GST challans, return time limits and ITC-04 reporting attached.</li>
<li><strong>Style-level costing.</strong> Fabric at actual consumption, trims by BOM, labour by operation or piece rate, job-work charges, and a target FOB or ex-factory price against which the style either makes money or does not.</li>
</ul>`,
      figure: F('inb-seamstress-textile-factory', 'A seamstress at work in a textile factory', 'Piece-rate labour on one operation of one size of one style: costing has to reach this far down.') },
    { h2: 'What a Garment ERP Does About Each', html: `
<div class="article-table-wrap"><table>
<tr><th>Problem</th><th>Garment ERP answer</th><th>What to check in a demo</th></tr>
<tr><th>Matrix</th><td>Style as parent, size&times;colour grid as children, planned and reported both ways</td><td>Enter one style with a 6&times;4 grid in under two minutes</td></tr>
<tr><th>Fabric</th><td>Consumption per size, marker efficiency, shrinkage, lot-wise fabric stock with GSM and width</td><td>Plan fabric for a 1,200-piece order and see the shortfall by lot</td></tr>
<tr><th>Cut plan</th><td>Ratio-driven lay planning, bundle tickets, cut-to-pack tracking</td><td>Change the ratio and watch the fabric requirement change</td></tr>
<tr><th>Job work</th><td>Challan out, return in, WIP at the job-worker, charges to the style, GST reporting</td><td>Send a lot to a CMT unit and receive it back short</td></tr>
<tr><th>Costing</th><td>Pre-costing at quote, actual costing at close, variance by style</td><td>Compare quoted and actual cost on one closed style</td></tr>
<tr><th>Compliance</th><td>GST splits, IRN, e-way bills on despatch; export documentation</td><td>One despatch from packing list to e-way bill</td></tr>
</table></div>`,
      band: F('inb-workers-sewing-fabric', 'Factory workers sewing fabric together', 'Cut, sew, wash, pack: each operation is a booking, and each booking is a number in the style&rsquo;s true cost.') },
    { h2: 'The Indian Detail: Job Work and GST', html: `
<p>Most Indian garment units run on subcontracting. Fabric goes to a dyeing or printing unit; cut panels go to a CMT sewing unit; finished garments go for washing. Every movement is a delivery challan under GST, every return has a time limit beyond which the movement is deemed a supply, and the periodic ITC-04 return has to reconcile what went out and what came back. Do this on paper and one lost challan becomes a tax problem.</p>
<p>A garment ERP treats the job-worker as a location: stock at the dyer is your stock at the dyer, with the challan attached, the due date visible and the charge posted to the style when it returns. That is the feature most units are actually searching for when they type &ldquo;garment ERP&rdquo;, even if they call it something else. The thresholds and time limits are the GST portal&rsquo;s to state; the system&rsquo;s job is to make them impossible to miss.</p>` },
    { h2: 'Buy, Build, or Tally-plus-Excel', html: `
<p><strong>Tally plus Excel</strong> is right for a unit under about thirty machines doing one or two styles for one buyer. Add discipline, not software.</p>
<p><strong>Buy</strong> a sector product when your styles, buyers and job-workers have multiplied and the product demo passes the tests above with your own style. Indian garment ERPs exist for exactly this and some are good; the vendors ranking for this search in 2026 include Focus, Zyno, Apna, Vasy and others.</p>
<p><strong>Build</strong> when your process is genuinely unusual &mdash; a made-to-measure workflow, a handloom cooperative&rsquo;s weaver-wise costing, a Kannur exporter&rsquo;s buyer-specific packing rules &mdash; and two demos have ended in workarounds. That is what we build for <a href="/in/">Indian units</a>, and the Kerala handloom and garment version is why <a href="/in/kerala/">our Kerala page</a> talks about looms.</p>
<div class="article-callout">The one test: bring one real style with its full matrix and one real job-work lot to the demo. Ask the system to plan the fabric, cost the style and receive the lot back short. Watch what happens.</div>`,
      figure: F('inb-workers-organise-clothes', 'Factory workers organising finished clothes', 'Finished, folded, counted: the last number in the chain, and the one the buyer checks against the packing list.') },
  ],
  faqs: [
    { q: 'What is garment manufacturing ERP software?', a: 'A production and business system built for apparel: it plans and tracks styles as size-and-colour matrices, calculates fabric consumption by GSM and marker efficiency, drives cut plans from buyer ratios, treats CMT and job work as first-class with GST challans, and costs at style level. Generic ERP sees a product with a quantity; garment ERP sees the matrix.' },
    { q: 'Why can\'t a garment unit just use Tally?', a: 'It can, for accounts and GST, and should keep it. Tally cannot plan fabric for a size ratio, track cut panels at a CMT unit, or cost a style at actual consumption. A unit under about thirty machines with one or two styles can live on Tally plus Excel; beyond that the spreadsheet becomes the risk.' },
    { q: 'What is CMT and how does ERP handle it?', a: 'Cut, Make and Trim &mdash; sewing subcontracted to another unit. A garment ERP sends cut panels out on a delivery challan, holds them as your work in progress at the job-worker, receives finished pieces back (possibly short), posts the CMT charge to the style and reconciles the GST job-work return.' },
    { q: 'Which garment ERP is best in India?', a: 'Vendors ranking for this search in 2026 include Focus, Zyno, Apna, Vasy and others, alongside ERPNext and NetSuite with apparel extensions. Fit is decided by one test: load your real style with its matrix and a real job-work lot, and see whether the system plans, costs and reconciles it without a workaround.' },
    { q: 'How much does garment ERP cost in India?', a: 'Published Indian ERP guides put small and mid-sized implementations at roughly &#8377;60,000 to &#8377;20 lakh all-in and subscription products at &#8377;2,000&ndash;&#8377;10,000 per user per month; sector garment products sit inside that range. The per-user line grows with every line supervisor given a screen, so model three years, not today.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 14. GST e-invoicing and your ERP
{
  slug: 'gst-e-invoicing-and-your-erp-india', cat: 'erp', date: D,
  title: 'GST E-Invoicing and Your ERP: What Must Be Automatic, What Must Stay Manual | TechAuditPros',
  desc: 'IRN generation, QR codes, IRP and GSP integration, the 2FA rule, HSN digit levels, e-way bills, cancellations and the 30-day window — what a system should do without a human, and the four decisions a human must still make.',
  eyebrow: 'GST compliance',
  h1: 'GST E-Invoicing and Your ERP: What Must Be Automatic, What Must Stay Manual',
  dek: 'Every guide explains how to generate an e-invoice. This one explains where the line sits between what the system should do silently and what a person must decide &mdash; because both mistakes cost money.',
  lead: F('inb-tax-forms-dark-desk', 'Tax forms, a pen and a mug on a dark desk', 'The portal will accept a perfectly formatted invoice for the wrong customer. Automation is for format; judgement is for facts.'),
  takeaways: [
    'E-invoicing applies to B2B, B2G and export invoices above the turnover threshold set by GSTN (&#8377;5 crore as of the current guides); an <strong>IRN</strong> must be generated through the Invoice Registration Portal, directly or via a GSP.',
    '<strong>Automatic:</strong> JSON to the current schema, HSN at the right digit level, tax splits by destination, IRN and QR on the PDF, e-way bill from the despatch, retries and error handling, the accounting entry.',
    '<strong>Manual:</strong> which GSTIN and address the invoice is raised on, whether a supply is B2B or B2C, cancellations within the 24-hour window, and credit notes that change the tax position.',
    'Per current guidance, <strong>2FA is mandatory</strong> for e-invoice generation from 1 April 2026, and taxpayers above &#8377;10 crore have a 30-day reporting window. Point at the portal for current values.',
  ],
  intro: '<strong>GST e-invoicing</strong> means that for every B2B, B2G or export invoice above the turnover threshold, your system must send the invoice to the Invoice Registration Portal, receive an Invoice Reference Number and a signed QR code, and print both on the document &mdash; and, where goods move, raise the e-way bill from the same record. The 2026 guides ranking for this search explain the mechanics well: API credentials from a GSP or the NIC, JSON to the current schema, HSN at four or six digits by turnover, two-factor authentication mandatory from April 2026, a 30-day reporting window above &#8377;10 crore. What they do not explain is where automation should stop. This article draws that line.',
  sections: [
    { h2: 'What the System Must Do Without a Human', html: `
<ul>
<li><strong>Build the JSON</strong> to the current e-invoice schema (version 1.1 per the guides), from the invoice record &mdash; never re-keyed.</li>
<li><strong>Carry HSN at the right digit level</strong> for your turnover band (four digits up to &#8377;5 crore, six above, per current rules), from the item master.</li>
<li><strong>Split tax by destination:</strong> CGST/SGST for intra-state, IGST for inter-state, based on the place of supply logic, not on which warehouse shipped.</li>
<li><strong>Validate the buyer&rsquo;s GSTIN</strong> before submission; mismatched GSTIN and address is the most common IRN rejection the guides describe.</li>
<li><strong>Submit to the IRP</strong> directly or through a GSP, with 2FA handled per the rules, retries on transient failure, and rejections surfaced with the reason.</li>
<li><strong>Print the IRN and QR</strong> on the PDF and hold the signed JSON for the record.</li>
<li><strong>Raise the e-way bill</strong> from the despatch: vehicle, transporter, distance, validity &mdash; from the same record, in the same flow.</li>
<li><strong>Post the accounting entry</strong> to Tally or the book of record through the official integration.</li>
</ul>
<p>Any of these done by hand is a re-keying error waiting to happen, and at volume the guides are blunt: API integration is the only method that scales.</p>`,
      figure: F('inb-phone-pen-certificate', 'A phone and pen beside a certificate on a folder', 'From invoice record to signed JSON to QR on the PDF: none of it should pass through a keyboard twice.') },
    { h2: 'What Must Stay a Human Decision', html: `
<p>The portal validates format, not facts. Four decisions cannot be automated safely, and a system that pretends to make them is the more dangerous kind.</p>
<ol>
<li><strong>Which GSTIN and which address.</strong> A buyer with registrations in three states; a delivery to a site that is not the billing address. The system should propose; a person confirms.</li>
<li><strong>B2B or B2C.</strong> E-invoicing applies to B2B, B2G and exports. A registered buyer purchasing for personal use, or an unregistered trader, changes the treatment. Somebody has to know the customer.</li>
<li><strong>Cancellation.</strong> An IRN can be cancelled within 24 hours on the IRP; after that the correction is a credit note with its own tax consequences. Whether to cancel or credit is a judgement, and it has a clock.</li>
<li><strong>Credit and debit notes that change the tax position.</strong> Rate disputes, returns, post-sale discounts. The system prepares; a person who understands the GSTR consequences approves.</li>
</ol>
<p>The right design surfaces these four as explicit approval steps with the clock visible, and automates everything around them.</p>`,
      band: F('inb-pen-on-pile-of-papers', 'A pen on a pile of papers', 'Format is the machine&rsquo;s job. Facts &mdash; which GSTIN, B2B or not, cancel or credit &mdash; are a person&rsquo;s, with a clock running.') },
    { h2: 'Integration Choices: Direct, GSP, or Someone Else&rsquo;s Portal', html: `
<div class="article-table-wrap"><table>
<tr><th>Method</th><th>Fits</th><th>Cost of being wrong</th></tr>
<tr><th>Manual upload on the portal</th><td>A handful of invoices a month</td><td>Re-keying errors; does not scale; 2FA friction on every batch</td></tr>
<tr><th>Direct IRP API</th><td>A capable in-house or custom system</td><td>You own retries, schema changes and credential rotation</td></tr>
<tr><th>Via a GSP</th><td>Most businesses of scale; large ERPs (SAP, Oracle, Dynamics)</td><td>A subscription; dependence on the GSP&rsquo;s uptime and schema updates</td></tr>
<tr><th>Built into the product</th><td>Tally, Busy, Zoho and most Indian ERPs</td><td>Only as good as the product&rsquo;s invoice data; job work and multi-GSTIN often thin</td></tr>
</table></div>
<p>For a custom system we integrate through a GSP where volume justifies it and directly where the client wants no third party; either way the four human decisions above are modelled as approval steps, and the accounting entry lands in Tally. That is the architecture behind the systems we build for <a href="/in/">Indian businesses</a>, and the manufacturing version &mdash; works order to e-way bill &mdash; is in <a href="/blog/manufacturing-erp-india-mrp-gst-einvoicing-eway-bills.html">Manufacturing ERP in India</a>.</p>` },
    { h2: 'The Numbers That Move, and Where to Read Them', html: `
<p>Turnover thresholds, HSN digit rules, the reporting window and the 2FA date have all changed since e-invoicing began and will change again. This article states them as the 2026 guides state them and deliberately does not promise they still hold when you read it. The authoritative sources are the GST portal, the e-invoice portal (einvoice1.gst.gov.in) and your GSP&rsquo;s release notes.</p>
<p>What does not change: the system should read those values from configuration a person can update, not from code a developer has to redeploy; and every threshold crossing &mdash; turnover passing &#8377;5 crore, then &#8377;10 crore &mdash; should be an alert, not a discovery at the next filing.</p>
<div class="article-callout">Ask any ERP vendor: when the schema version changed last, how long before your customers were compliant, and did they have to do anything? The answer is the product&rsquo;s real e-invoicing feature.</div>`,
      figure: F('inb-stack-of-papers-closeup', 'Close up of a stack of papers', 'Thresholds move. The system should read them from configuration a person can change, and warn before you cross one.') },
  ],
  faqs: [
    { q: 'Who needs to generate GST e-invoices in India?', a: 'Businesses with aggregate turnover above the threshold set by GSTN &mdash; &#8377;5 crore per the current 2026 guides &mdash; for B2B, B2G and export invoices. B2C invoices are outside e-invoicing (though large B2C invoices need a dynamic QR). Check the e-invoice portal for the current threshold.' },
    { q: 'What should my ERP do automatically for e-invoicing?', a: 'Build the JSON to the current schema, carry HSN at the right digit level, split CGST/SGST/IGST by place of supply, validate the buyer&rsquo;s GSTIN, submit to the IRP directly or via a GSP with 2FA and retries, print the IRN and QR, raise the e-way bill from the same despatch, and post the entry to Tally.' },
    { q: 'What should never be automated in GST invoicing?', a: 'Which GSTIN and address the invoice is raised on, whether a supply is B2B or B2C, whether to cancel an IRN (24-hour window) or issue a credit note, and credit or debit notes that change the tax position. Surface these as approvals with the clock visible.' },
    { q: 'Can an e-invoice be cancelled?', a: 'Within 24 hours of IRN generation, on the IRP, provided no e-way bill is active against it. After that, the correction is a credit or debit note with its own GSTR consequences.' },
    { q: 'Is 2FA mandatory for e-invoicing?', a: 'Per the 2026 guides, two-factor authentication is mandatory for all taxpayers generating e-invoices from 1 April 2026. Systems integrating directly or via a GSP handle it in the credential flow; manual portal users face it on every session.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 15. Slow on Indian mobile data
{
  slug: 'why-your-website-is-slow-on-indian-mobile-data-five-fixes', cat: 'web', date: D,
  title: 'Why Your Website Is Slow on Indian Mobile Data, and the Five Fixes | TechAuditPros',
  desc: 'Around 60% of Indian websites fail Core Web Vitals against 40% globally. The reasons are specific — 3MB images, builder themes, no Indian CDN edge, JavaScript that blocks, hosting abroad — and so are the fixes.',
  eyebrow: 'Mobile speed',
  h1: 'Why Your Website Is Slow on Indian Mobile Data, and the Five Fixes',
  dek: 'Your site is fast in the office. Your customer is on a &#8377;12,000 Android on a variable 4G connection between two stations. This is why the two experiences differ by six seconds, and what closes the gap.',
  lead: F('inb-hand-holding-phone', 'A hand holding a grey smartphone', 'This is where your site is judged: a mid-range phone, a variable connection, a thumb that leaves after three seconds.'),
  takeaways: [
    'Indian speed guides put ~<strong>60% of Indian sites outside Core Web Vitals</strong> thresholds against ~40% globally, with ~80% of Indian traffic on mobile. Google ranks the mobile experience.',
    'Five causes, five fixes: <strong>image weight &rarr; compression and sizing; builder themes &rarr; a light theme; hosting abroad &rarr; Indian data centre or CDN edge; blocking JavaScript &rarr; defer and diet; no caching &rarr; server and browser caching</strong>.',
    'Measure on a mid-range Android on throttled 4G, not on a laptop. The guides estimate image work alone moves scores 30&ndash;40%.',
    'A one-second mobile delay is put at up to 20% fewer conversions by the guides; on a store that is revenue, not a score.',
  ],
  intro: 'Your website is <strong>slow on Indian mobile data</strong> for reasons that are specific to how Indian sites are built and where Indian users are. The speed guides written for this market in 2026 put around 60% of Indian websites outside Google&rsquo;s Core Web Vitals thresholds, against roughly 40% globally, with about 80% of traffic on mobile &mdash; and Google indexes and ranks the mobile experience. The gap between the office laptop and the customer&rsquo;s &#8377;12,000 Android on a variable 4G connection is usually four to six seconds, and it is made of five things. Each has a fix a developer can ship in days.',
  sections: [
    { h2: 'First, Measure Where the Customer Is', html: `
<p>Every slow Indian site we see passed its own developer&rsquo;s test, because the test was a laptop on office Wi-Fi. Before fixing anything, measure honestly:</p>
<ul>
<li>Open PageSpeed Insights and read the <strong>mobile</strong> score and the field data (Chrome UX Report), which reflects real Indian visitors on real connections.</li>
<li>In Chrome DevTools, throttle to &ldquo;Slow 4G&rdquo; and a 4&times; CPU slowdown &mdash; a fair proxy for a mid-range Android on Jio or Airtel outside a metro core.</li>
<li>Note three numbers: Largest Contentful Paint (should be under 2.5s), Interaction to Next Paint (under 200ms), Cumulative Layout Shift (under 0.1).</li>
</ul>
<p>Those three are the ranking inputs, and they are also what your customer feels.</p>`,
      figure: F('inb-android-phone-black', 'A black Android smartphone', 'Measure on this, throttled, not on a laptop. Every slow site passed a laptop test.') },
    { h2: 'The Five Causes and the Five Fixes', html: `
<div class="article-table-wrap"><table>
<tr><th>Cause</th><th>What it does on 4G</th><th>The fix</th></tr>
<tr><th>1. Image weight</th><td>A 3MB hero and 800KB product shots take the whole budget</td><td>WebP/AVIF, sized to the slot, compressed, lazy-loaded below the fold; guides put this at a 30&ndash;40% score gain alone</td></tr>
<tr><th>2. Builder themes</th><td>A megabyte of CSS and JS on every page before content renders</td><td>A light or hand-built theme; remove the builder or restrict it to the pages that need it</td></tr>
<tr><th>3. Hosting abroad, no Indian edge</th><td>Every request crosses an ocean; latency stacks</td><td>Indian data centre (Mumbai, Chennai, Hyderabad) or a CDN with Indian edges</td></tr>
<tr><th>4. Blocking JavaScript</th><td>Chat widgets, analytics, sliders and app scripts block the first paint</td><td>Defer and async everything non-critical; delete the widgets nobody uses; one analytics tag</td></tr>
<tr><th>5. No caching</th><td>Every visit rebuilds every page</td><td>Server-side caching, browser cache headers, a CDN cache for static assets</td></tr>
</table></div>
<p>Do them in that order. The first two are usually 70% of the problem; the last three finish it.</p>`,
      band: F('inb-bike-beside-bus-traffic', 'A person riding a bike beside a bus in traffic', 'Between two stations on a variable connection: that is the network your site has to load on.') },
    { h2: 'Why It Is Revenue, Not a Score', html: `
<p>Speed guides cite Google&rsquo;s own figure that a one-second mobile delay cuts conversions by up to 20%. On a store selling &#8377;20 lakh a month, a site that loads in six seconds instead of two is not scoring badly; it is leaving lakhs on the floor every month, and paying for ads that land on a page people abandon.</p>
<p>It is also a ranking input. Core Web Vitals are part of how Google orders results, and with mobile-first indexing the mobile numbers are the ones that count. A slow site pays twice: it ranks lower, and it converts less of what it does get. That is why speed is the first thing we fix on any <a href="/in/">Indian site</a> before content or links, and why the <a href="/in/kolkata/">Kolkata page</a> lists Core Web Vitals &ldquo;measured on a mid-range Android on Jio&rdquo; among its twelve technical checks.</p>` },
    { h2: 'What Not to Do', html: `
<ul>
<li><strong>Do not install a &ldquo;speed plugin&rdquo; and stop.</strong> Caching plugins help; they do not shrink a 3MB image or remove a builder.</li>
<li><strong>Do not trust a desktop score.</strong> Ninety on desktop and thirty-five on mobile is thirty-five.</li>
<li><strong>Do not add a second CDN or a second analytics tag</strong> to fix the slowness the first ones caused.</li>
<li><strong>Do not rebuild the whole site</strong> before trying the five fixes. Most Indian sites go from failing to passing without a redesign; the ones that do not are the builder-theme sites, and for those the theme is the redesign.</li>
</ul>
<div class="article-callout">Ask whoever maintains your site for the mobile Core Web Vitals field data, this month. If they send a desktop screenshot, you have found the problem.</div>`,
      figure: F('inb-phone-on-white-table', 'A phone lying on a white table', 'Ninety on desktop and thirty-five on mobile is thirty-five.') },
  ],
  faqs: [
    { q: 'Why is my website slow on mobile in India?', a: 'Five common causes: heavy images (often 3MB heroes), page-builder themes shipping a megabyte of CSS and JavaScript, hosting abroad with no Indian CDN edge, blocking scripts (chat widgets, sliders, multiple analytics tags), and no caching. Indian speed guides put around 60% of Indian sites outside Core Web Vitals thresholds for these reasons.' },
    { q: 'What are Core Web Vitals and why do they matter in India?', a: 'Three measurements of real user experience: Largest Contentful Paint (under 2.5s), Interaction to Next Paint (under 200ms) and Cumulative Layout Shift (under 0.1). They are ranking inputs, and with about 80% of Indian traffic on mobile and mobile-first indexing, the mobile numbers are the ones Google uses.' },
    { q: 'How do I test my site speed properly?', a: 'PageSpeed Insights on mobile, reading the field data from real visitors; and Chrome DevTools throttled to Slow 4G with a 4&times; CPU slowdown, which approximates a mid-range Android on Jio or Airtel outside a metro core. Ignore desktop scores.' },
    { q: 'What is the quickest speed fix?', a: 'Images. Converting to WebP or AVIF, sizing to the slot, compressing and lazy-loading below the fold moves scores 30&ndash;40% on most Indian sites according to the guides. Removing a page builder is the second largest fix and the harder one.' },
    { q: 'Does hosting location matter for Indian visitors?', a: 'Yes. Every request to a server in the US or Europe adds latency that stacks across dozens of files. An Indian data centre or a CDN with Mumbai and Chennai edges removes most of it for the cost of a plan change.' },
  ],
  cta: WEB_CTA,
},
// ------------------------------------------------------------------ 16. AEO and GEO for Indian businesses
{
  slug: 'aeo-geo-for-indian-businesses-cited-by-ai-answers', cat: 'seo', date: D,
  title: 'AEO and GEO for Indian Businesses: Being Cited by AI Answers in Three Languages | TechAuditPros',
  desc: 'Answer Engine and Generative Engine Optimisation, explained for India: what AI Overviews, ChatGPT and Perplexity actually quote, how to write for it, and the multilingual reality nobody in the global guides mentions.',
  eyebrow: 'AEO & GEO',
  h1: 'AEO and GEO for Indian Businesses: Being Cited by AI Answers in Three Languages',
  dek: 'SEO gets you on the page. AEO and GEO get you quoted as the answer &mdash; and in India the question arrives in Hindi, Tamil or Bengali as often as in English.',
  lead: F('inb-busy-street-many-signs', 'A busy street with many signs in several scripts', 'Three scripts on one street. Your market asks AI the same question in all of them.'),
  takeaways: [
    '<strong>AEO</strong> (Answer Engine Optimisation) is writing so that Google&rsquo;s AI Overviews and featured snippets quote you. <strong>GEO</strong> (Generative Engine Optimisation) extends that to ChatGPT, Gemini and Perplexity.',
    'What gets cited: pages that <strong>answer in the first sentence</strong>, show evidence in the second, carry FAQ and Article schema, and are consistent with what the rest of the web says about you.',
    'The Indian reality: questions arrive in <strong>English, Hindi and a regional language</strong>; bilingual pages with correct hreflang and native-language FAQs get cited where English-only pages do not.',
    'GEO is not a separate service. It is on-page SEO done honestly, with structure, plus entity consistency &mdash; the same work, judged by a stricter reader.',
  ],
  intro: '<strong>AEO and GEO</strong> &mdash; Answer Engine Optimisation and Generative Engine Optimisation &mdash; describe the work of getting a page quoted by AI answers: Google&rsquo;s AI Overviews and featured snippets, and the generative engines ChatGPT, Gemini and Perplexity. The Indian agencies ranking for these terms in 2026 describe it accurately as the shift from ranking on a page to being chosen as the answer. What the global guides leave out is the Indian condition: the question arrives in Hindi, Tamil, Bengali or Malayalam as often as in English, and the engines answer in the language they were asked. This article explains what actually gets cited, how to write for it, and how to do it in three languages without tripling the work.',
  sections: [
    { h2: 'What AI Answers Actually Quote', html: `
<p>Watch what AI Overviews and Perplexity cite for a commercial question in your sector and a pattern appears fast. They quote pages that:</p>
<ul>
<li><strong>answer the question in the first sentence</strong> under a heading that is the question &mdash; not after three paragraphs of context;</li>
<li><strong>give a number, a range or a list</strong> in the second sentence, with a source or a date;</li>
<li><strong>carry structure the engine can parse</strong>: FAQ schema, Article schema, tables, headings that mirror sub-questions;</li>
<li><strong>agree with the rest of the web about who you are</strong> &mdash; the same business name, address, services and claims on your site, your Google Business Profile, directories and LinkedIn;</li>
<li><strong>are fast and indexable</strong>, because an engine cannot quote what its crawler did not get.</li>
</ul>
<p>Notice that every item is also good on-page and technical SEO. GEO is not a new discipline; it is the old one judged by a stricter reader who quotes rather than links.</p>`,
      figure: F('inb-tablet-on-wooden-table', 'A tablet on a wooden table', 'An engine quotes the sentence that answers. Put it first, under a heading that is the question.') },
    { h2: 'How to Write for It', html: `
<div class="article-table-wrap"><table>
<tr><th>Habit</th><th>Why the engine rewards it</th></tr>
<tr><th>Heading = the question people ask</th><td>Matches the query the engine is answering</td></tr>
<tr><th>First sentence = the answer</th><td>The quotable unit is one sentence, sometimes two</td></tr>
<tr><th>Second sentence = evidence, dated</th><td>Engines prefer specific, sourced, recent claims</td></tr>
<tr><th>One idea per paragraph</th><td>Extractable without context</td></tr>
<tr><th>FAQ section with schema</th><td>Directly parsed; each Q&amp;A is a citation candidate</td></tr>
<tr><th>Tables for comparisons</th><td>Engines lift table rows into answers</td></tr>
<tr><th>Named entities</th><td>&ldquo;TallyPrime&rdquo;, &ldquo;Kochi&rdquo;, &ldquo;Shopify&rdquo;: specificity builds the entity graph</td></tr>
<tr><th>Honest caveats</th><td>Hedged, sourced claims are cited more than absolute ones</td></tr>
</table></div>
<p>Every page on this site is written that way, including this one. The <a href="/in/kerala/">Kerala</a> and <a href="/in/mumbai/">Mumbai</a> pages answer their headings in the first sentence for exactly this reason.</p>`,
      band: F('inb-laptop-black-and-white', 'A laptop computer, black and white', 'Heading, answer, evidence, next. The structure the engine quotes is the structure a hurried reader wants anyway.') },
    { h2: 'The Indian Condition: Three Languages', html: `
<p>Global GEO guides assume English. In India a business in Kochi is asked about in English and Malayalam; in Kolkata in English and Bengali; in Mumbai in English, Hindi and Marathi. The engines answer in the language of the question and prefer to cite sources in that language. An English-only site is invisible to a third or more of the questions about its own category.</p>
<p>The efficient approach is not three sites. It is:</p>
<ul>
<li><strong>Bilingual pages where the data says so</strong> &mdash; the pages that answer high-volume local questions &mdash; with correct hreflang so the languages help rather than compete;</li>
<li><strong>Native-language FAQs</strong> written by a speaker, not machine-translated, with FAQ schema in that language;</li>
<li><strong>Entity consistency across scripts:</strong> your business name transliterated the same way everywhere, including the Business Profile;</li>
<li><strong>Answer-first structure in every language</strong>, because the quotable unit is the same.</li>
</ul>
<p>This is a real opening. Most Indian agencies selling GEO in 2026 are writing English pages for English engines; the regional-language answer shelf is nearly empty.</p>` },
    { h2: 'What to Buy, and What Not To', html: `
<p><strong>Do not buy</strong> GEO as a separate line item from someone who is not also doing your on-page and technical SEO. The work is the same pages, the same schema, the same speed; splitting it produces two invoices and one result.</p>
<p><strong>Do buy</strong> from someone who can show you a page they wrote being cited by an AI Overview or Perplexity for a commercial query, who writes in your customers&rsquo; languages or works with someone who does, and who will fix the technical layer first so the engine&rsquo;s crawler can reach the answer at all.</p>
<p>That is how the search work runs for <a href="/in/">India</a> here: every page answer-first, FAQ schema on every page, bilingual where the data earns it, and the technical layer checked before a word is written.</p>
<div class="article-callout">Test any GEO claim in two minutes: ask Perplexity a commercial question in the supplier&rsquo;s own sector and see whether it cites them. Then ask in Hindi.</div>`,
      figure: F('inb-phone-beside-laptop', 'A person using a phone beside a laptop screen', 'Ask the engine a question in your sector, then ask it again in Hindi. Whoever is cited both times is doing GEO.') },
  ],
  faqs: [
    { q: 'What is AEO and how is it different from SEO?', a: 'Answer Engine Optimisation is writing and structuring pages so that Google&rsquo;s AI Overviews and featured snippets quote them as the answer. It is on-page SEO with stricter discipline: the heading is the question, the first sentence is the answer, the second is evidence, and FAQ schema makes each answer parseable.' },
    { q: 'What is GEO (Generative Engine Optimisation)?', a: 'The same discipline extended to generative engines &mdash; ChatGPT, Gemini, Perplexity &mdash; which cite sources when answering. They reward answer-first structure, dated evidence, named entities, consistent facts about your business across the web, and pages their crawlers can actually reach.' },
    { q: 'Does an Indian small business need GEO?', a: 'If your customers ask AI engines the questions your business answers &mdash; &ldquo;best ayurveda resort in Wayanad&rdquo;, &ldquo;ERP for a garment unit&rdquo; &mdash; yes, and increasingly they do. The cost is low if your SEO is already honest: it is the same pages written answer-first, with schema.' },
    { q: 'Should I write in English or regional languages for AI answers?', a: 'Both, where the search data shows your customers ask in both. Engines answer in the language of the question and prefer sources in that language; bilingual pages with correct hreflang and native-language FAQs are cited where English-only pages are not. The regional-language answer shelf in India is largely empty.' },
    { q: 'How do I check whether my site is being cited by AI?', a: 'Ask Perplexity or Google (with AI Overviews) the commercial questions in your sector and note the cited sources. Search Console now shows some AI Overview impressions. Then ask the same questions in Hindi or your regional language and compare.' },
  ],
  cta: SEO_CTA,
},
];
