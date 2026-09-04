'use strict';
const D = '2026-09-03';
const ERP_CTA = { h3: 'Want a second opinion before you buy software?', p: 'Book a free strategy call. We look at how your business actually runs and tell you honestly which system fits &mdash; CRM, ERP, both, or neither yet.' };
module.exports = [
// ------------------------------------------------------------------ 5. ERP vs CRM
{
  slug: 'erp-vs-crm', cat: 'erp', date: D,
  title: 'ERP vs. CRM: What’s the Difference, and Do You Need Both? | TechAuditPros',
  desc: 'ERP runs the back office (inventory, orders, purchasing, finance); CRM runs the front office (leads, deals, customer service). The real differences, how they connect, which to buy first, and when one system should do both.',
  eyebrow: 'ERP Fundamentals',
  h1: 'ERP vs. CRM: What’s the Difference, and Do You Need Both?',
  dek: 'Two acronyms, two different jobs. Here is what each system actually manages, where they overlap, how they should connect &mdash; and the honest answer to "which one first?"',
  lead: { img: 'istock-1404269031-digital-handshake-lowpoly-neon.jpg', alt: 'Digital handshake representing the customer relationship a CRM manages and the operations an ERP fulfills', w: 612, h: 349 },
  takeaways: [
    '<strong>CRM</strong> (customer relationship management) manages the people who might buy and have bought: leads, deals, quotes, support tickets. <strong>ERP</strong> (enterprise resource planning) manages what happens after the sale: inventory, orders, purchasing, production, finance.',
    'Front office versus back office is the cleanest way to remember it. The two overlap at exactly one point &mdash; the order &mdash; and that is where they must be connected.',
    'Most companies under about 15 people need a CRM first; companies that hold inventory or make things need ERP sooner than they think; a custom ERP can include the CRM functions a small team actually uses.',
  ],
  intro: '<strong>ERP</strong> (enterprise resource planning) is the system that runs the operational back office &mdash; inventory, orders, purchasing, production, finance and reporting. <strong>CRM</strong> (customer relationship management) is the system that runs the front office &mdash; leads, pipeline, quotes, marketing and customer service. They meet at the moment a quote becomes an order: the CRM hands the deal over and the ERP fulfills, invoices and accounts for it. Everything else about the ERP vs. CRM question follows from that handoff.',
  sections: [
    { h2: 'What a CRM Does', html: `
<p>A CRM is a database of people and companies plus the tools to move them toward a purchase and keep them happy afterwards:</p>
<ul>
<li><strong>Contacts and accounts</strong> &mdash; every person and company you talk to, with the history of every call, email and meeting.</li>
<li><strong>Pipeline</strong> &mdash; open deals by stage, value and expected close date; the forecast your sales manager lives in.</li>
<li><strong>Quotes and proposals</strong> &mdash; generated from a price book, tracked until they are signed or lost.</li>
<li><strong>Marketing</strong> &mdash; email campaigns, lead capture from the website, lead scoring.</li>
<li><strong>Service</strong> &mdash; tickets, cases, SLAs, the knowledge base.</li>
</ul>
<p>The CRM's unit of work is a <em>relationship</em>. It answers: who are we talking to, what do they want, where is the deal, and are they happy?</p>` },
    { h2: 'What an ERP Does', html: `
<p>An ERP is the system of record for everything that happens once a customer says yes &mdash; and everything the business must do to be able to say yes:</p>
<ul>
<li><strong>Inventory</strong> &mdash; what you have, where, in what lot, at what cost.</li>
<li><strong>Orders and fulfillment</strong> &mdash; the order, the pick, the ship, the invoice, the return.</li>
<li><strong>Purchasing</strong> &mdash; suppliers, purchase orders, receipts, lead times.</li>
<li><strong>Production</strong> &mdash; bills of materials, work orders, job costing, for those who make things.</li>
<li><strong>Finance</strong> &mdash; receivables, payables, general ledger, or a sync to the accounting system that holds them.</li>
<li><strong>People</strong> &mdash; time, roles, approvals, payroll data.</li>
<li><strong>Reporting</strong> &mdash; margin, stock cover, cash, on-time delivery, from live data.</li>
</ul>
<p>The ERP's unit of work is a <em>transaction</em>. It answers: can we deliver, what will it cost, did we get paid, and what did we actually make on it? For a fuller picture, see <a href="/blog/what-is-erp-software-plain-english.html">What is ERP software? A plain-English guide</a>.</p>`,
      figure: { img: 'istock-2196870531-consultants-walking-tablet-corridor.jpg', alt: 'Sales and operations colleagues reviewing an order handoff on a tablet', w: 612, h: 408, cap: 'CRM owns the deal until it is won; ERP owns the order from that second on.' } },
    { h2: 'ERP vs. CRM: Side by Side', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>CRM</th><th>ERP</th></tr>
<tr><th>Office</th><td>Front &mdash; sales, marketing, service</td><td>Back &mdash; operations, warehouse, purchasing, finance</td></tr>
<tr><th>Core record</th><td>Contact, account, deal, ticket</td><td>Item, order, purchase order, work order, invoice</td></tr>
<tr><th>Primary users</th><td>Sales reps, marketers, support agents</td><td>Operations, warehouse, buyers, production, accounting, owners</td></tr>
<tr><th>Main question</th><td>Will they buy, and are they happy?</td><td>Can we deliver, what does it cost, did we get paid?</td></tr>
<tr><th>Typical pricing</th><td>Per user per month, often free or cheap for small teams</td><td>Per user per month for SaaS, upfront for on-premise, or flat monthly for a custom build</td></tr>
<tr><th>Failure when missing</th><td>Leads lost in inboxes, forecast by guesswork</td><td>Stockouts, re-keyed orders, unknown margins, slow month-end</td></tr>
</table></div>` },
    { h2: 'Where They Overlap &mdash; and Why That Causes Trouble', html: `
<p>Both systems hold the customer record, and both can hold a quote. That overlap is where companies get into trouble: the CRM has the customer's new address, the ERP has the old one, invoices go to the wrong place, and two teams argue about which system is right.</p>
<p>The fix is a rule, not a product: decide which system is the source of truth for each type of record, and integrate accordingly.</p>
<ul>
<li><strong>Contacts and deals</strong> &mdash; CRM is the master. It pushes new accounts to the ERP when a deal is won.</li>
<li><strong>Products, prices and stock</strong> &mdash; ERP is the master. It feeds the CRM's price book and shows reps real availability while they quote.</li>
<li><strong>The order</strong> &mdash; created in the ERP from the won deal, with the status (shipped, invoiced, paid) synced back so the rep can see it without asking.</li>
<li><strong>Invoices and payments</strong> &mdash; ERP or accounting is the master; the CRM shows a read-only view.</li>
</ul>
<div class="article-callout">If your sales team ever has to ask the warehouse whether something is in stock before quoting it, the two systems are not connected properly &mdash; or the ERP does not exist yet.</div>` },
    { h2: 'Which Should You Buy First?', html: `
<p>The honest answer depends on what your business does, not on its size alone.</p>
<ul>
<li><strong>You sell services with no inventory (agencies, consultants, professionals):</strong> CRM first. Your operational complexity lives in projects and time, which a lightweight project tool or a services-focused ERP handles later.</li>
<li><strong>You hold inventory or make things (distributors, manufacturers, retailers, e-commerce):</strong> ERP earlier than you expect. The cost of stockouts, re-keying and unknown margins arrives well before the pipeline outgrows a spreadsheet.</li>
<li><strong>You are under about 15 people with a simple product:</strong> a good CRM plus accounting software is usually enough. Add ERP when you find yourself maintaining three spreadsheets that should be one system.</li>
<li><strong>You already have a CRM your team loves:</strong> keep it. A custom ERP integrates with the CRM you have instead of forcing a change.</li>
</ul>`,
      figure: { img: 'istock-1094918638-manager-tablet-evening-office-smile.jpg', alt: 'Business owner reviewing sales pipeline and order status on a tablet', w: 612, h: 392, cap: 'Services firms usually need CRM first; anyone holding stock needs ERP sooner than they expect.' } },
    { h2: 'When One System Should Do Both', html: `
<p>Large companies run a dedicated CRM and a dedicated ERP because thousands of users need deep functionality on each side. Small and mid-size businesses often do not. A custom ERP built around your business can include the CRM functions a 10-person sales team actually uses &mdash; accounts, pipeline, quotes generated from live pricing and stock, order status &mdash; without a second subscription and a second integration to maintain.</p>
<p>That is how TechAuditPros usually scopes it: if your team already runs a CRM it likes, we integrate with it; if it is running sales from spreadsheets and email, the CRM module becomes part of the <a href="/us/erp/">custom ERP build</a> (see the <a href="/ca/erp/">Canadian page</a> for CA pricing). One database, one login, one version of the customer.</p>` },
    { h2: 'ERP vs. CRM vs. Everything Else: A Quick Glossary', html: `
<ul>
<li><strong>Accounting software</strong> &mdash; the general ledger, invoices, bills, tax. Not an ERP; usually the system an ERP syncs to.</li>
<li><strong>SCM (supply chain management)</strong> &mdash; the purchasing, inventory and logistics part of ERP, sometimes sold separately at enterprise scale.</li>
<li><strong>HRMS / HRIS</strong> &mdash; the people system: records, payroll, benefits, time. Often a module of ERP; see <a href="/blog/what-is-hr-software.html">What is HR software?</a></li>
<li><strong>MRP</strong> &mdash; the production-planning engine inside manufacturing ERP.</li>
<li><strong>BI (business intelligence)</strong> &mdash; the reporting and dashboard layer on top of ERP and CRM data; in a custom build it is simply the reporting module.</li>
</ul>` },
  ],
  faqs: [
    { q: 'Is CRM part of ERP?', a: 'It can be. Many ERP systems include a CRM module, and a custom ERP can include the CRM functions a small sales team uses. Large companies usually run a dedicated CRM integrated with the ERP because each side needs deeper functionality.' },
    { q: 'What is the main difference between ERP and CRM?', a: 'CRM manages the front office &mdash; leads, deals, quotes and customer service. ERP manages the back office &mdash; inventory, orders, purchasing, production and finance. They connect at the order, where a won deal becomes something to fulfill and invoice.' },
    { q: 'Can a small business use ERP without a CRM?', a: 'Yes, if the ERP includes basic account, quote and order tracking, or if sales are simple enough to run from the ERP’s customer records. A dedicated CRM becomes worth it when you have multiple reps working a pipeline and running campaigns.' },
    { q: 'Do ERP and CRM need to be integrated?', a: 'If you run both, yes. Without integration, customer data drifts between the two systems and orders get re-keyed. Decide which system is the master for contacts, products, orders and invoices, and sync in that direction.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 6. HR software
{
  slug: 'what-is-hr-software', cat: 'erp', date: D,
  title: 'What Is HR Software? HRIS vs. HRMS vs. the HR Module in Your ERP | TechAuditPros',
  desc: 'HR software stores employee records and automates HR work: onboarding, time, leave, payroll data, benefits, reviews. What HRIS, HRMS and HCM mean, what a small business actually needs, and when HR belongs inside your ERP.',
  eyebrow: 'ERP Fundamentals',
  h1: 'What Is HR Software? HRIS vs. HRMS vs. the HR Module in Your ERP',
  dek: 'Employee records, onboarding, time off, payroll data, reviews &mdash; here is what HR software actually does, what the acronyms mean, and how to decide between a standalone tool and the HR module of your ERP.',
  lead: { img: 'team-standing-document-review-bright-room.jpg', alt: 'Team reviewing employee documents together during onboarding', w: 2400, h: 1601 },
  takeaways: [
    '<strong>HR software</strong> is the system that holds employee records and automates the routine work around them: hiring paperwork, onboarding, time and attendance, leave, payroll inputs, benefits, performance reviews.',
    'HRIS, HRMS and HCM are marketing tiers of the same idea &mdash; records, records plus processes, and records plus processes plus talent strategy. Small businesses need the first two.',
    'If your ERP already tracks who works where and for how long, the HR module usually belongs inside it; payroll itself is almost always better left to a specialist provider and integrated.',
  ],
  intro: '<strong>HR software</strong> is the system a business uses to store employee information and run the recurring processes around it &mdash; hiring paperwork and onboarding, time and attendance, leave requests, payroll inputs, benefits enrollment, performance reviews and compliance documents. Its job is to replace the personnel folder, the timesheet spreadsheet and the "who approved this?" email chain with one record per employee that the right people can see and update. Whether that system is standalone or a module of your ERP is the real decision, and this guide covers it.',
  sections: [
    { h2: 'HRIS vs. HRMS vs. HCM: What the Acronyms Mean', html: `
<div class="article-table-wrap"><table>
<tr><th>Term</th><th>Stands for</th><th>What it usually covers</th><th>Who needs it</th></tr>
<tr><th>HRIS</th><td>Human resources information system</td><td>The employee database: records, documents, org chart, basic reporting</td><td>Every business with more than a handful of staff</td></tr>
<tr><th>HRMS</th><td>Human resources management system</td><td>HRIS plus processes: time and attendance, leave, payroll inputs, benefits, onboarding workflows</td><td>Most small and mid-size businesses</td></tr>
<tr><th>HCM</th><td>Human capital management</td><td>HRMS plus talent: recruiting, learning, succession planning, engagement analytics</td><td>Larger organizations with dedicated HR teams</td></tr>
</table></div>
<p>Vendors use these labels loosely, so judge products by the feature list, not the acronym. A "HCM suite" for a 30-person company is mostly features nobody will open.</p>` },
    { h2: 'What HR Software Actually Does, Day to Day', html: `
<ul>
<li><strong>Employee records.</strong> One profile per person: contact details, role, manager, compensation history, documents (offer letter, tax forms, certifications), with access controlled by role.</li>
<li><strong>Onboarding.</strong> A checklist that fires when someone is hired: paperwork to sign, accounts to create, equipment to issue, training to complete, each with an owner and a due date.</li>
<li><strong>Time and attendance.</strong> Clock-ins from a phone or terminal, schedules, overtime rules, approvals.</li>
<li><strong>Leave and absence.</strong> Requests, balances, approvals, a shared calendar so a department never discovers on Monday that three people are away.</li>
<li><strong>Payroll inputs.</strong> Hours, rates, bonuses and deductions exported cleanly to whichever payroll provider actually runs the pay &mdash; ADP, Gusto, Paychex or a local bureau.</li>
<li><strong>Benefits.</strong> Enrollment windows, elections, carrier files.</li>
<li><strong>Performance and reviews.</strong> Goals, check-ins, review cycles, with history the next manager can actually read.</li>
<li><strong>Compliance.</strong> Expiring certifications and licenses, required training, audit trails.</li>
</ul>`,
      figure: { img: 'istock-2231952003-presenting-dashboard-wood-meeting-room.jpg', alt: 'Manager presenting headcount and attendance data to a team', w: 612, h: 408, cap: 'Headcount, absence and overtime are operational numbers &mdash; which is why HR data belongs next to the rest of the business.' } },
    { h2: 'Standalone HR Software vs. the HR Module in Your ERP', html: `
<p>A standalone HR tool is quick to start and good at the HR-specific parts: benefits enrollment, compliance libraries, applicant tracking. Its weakness is isolation. Hours entered there have to be re-entered in job costing; a new hire created there has to be created again in the scheduling system; the headcount number never quite matches finance.</p>
<p>An HR module inside your ERP is weaker on benefits and recruiting and stronger on everything that touches operations: labor cost by job, crew scheduling, certifications tied to the work people are allowed to do, time captured once and used everywhere.</p>
<p><strong>Rule of thumb:</strong> if labor is a direct cost of what you sell &mdash; manufacturing, construction, field service, clinics, agencies billing time &mdash; HR data belongs in or tightly connected to the ERP. If you are an office-based team where labor is overhead, a standalone tool is fine and the ERP only needs headcount and cost.</p>
<div class="article-callout">Payroll is the exception either way. Tax tables, filings and direct deposit are a specialist's business; nearly every company should run payroll through a dedicated provider and feed it clean data from the HR or ERP system rather than trying to build payroll itself.</div>` },
    { h2: 'What a Small Business Actually Needs', html: `
<div class="article-checklist">
<h3>The short list for 10 to 150 employees</h3>
<ol>
<li>One employee record with documents and role-based access.</li>
<li>Onboarding and offboarding checklists that actually get completed.</li>
<li>Time capture that is easy enough to be accurate &mdash; phone or terminal, two taps.</li>
<li>Leave requests and balances with a shared calendar.</li>
<li>A clean payroll export to your provider every pay period.</li>
<li>Expiry alerts for certifications, licenses and required training.</li>
<li>A simple review cycle with history.</li>
</ol>
</div>
<p>Skip until proven necessary: applicant-tracking suites, learning-management platforms, engagement surveys, and succession planning. They matter at scale; at 40 employees they are features paid for and not used.</p>` },
    { h2: 'How TechAuditPros Handles HR in a Custom ERP', html: `
<p>When we build a <a href="/us/erp/">custom ERP for a US business</a> (or a <a href="/ca/erp/">Canadian one</a>), the people module is scoped around how labor flows through that company: roles and rates, time captured on the same tablets that update work orders or jobs, approvals, certification expiries tied to what someone is allowed to work on, and a payroll export in the exact format the provider wants. Benefits and recruiting stay with the specialist tools that do them well, integrated where it saves re-keying. The result is one number for labor cost that operations, HR and finance all agree on &mdash; which, in our experience, is the thing most small businesses have never had.</p>
<p>For how the people module fits with the rest of the system, see <a href="/blog/erp-system-examples.html">ERP system examples by business type</a>.</p>` },
  ],
  faqs: [
    { q: 'What is the difference between HRIS and HRMS?', a: 'An HRIS is primarily the employee database &mdash; records, documents and reporting. An HRMS adds the processes on top: time and attendance, leave, onboarding workflows, payroll inputs and benefits. In practice most modern products are HRMS regardless of what they call themselves.' },
    { q: 'Does HR software include payroll?', a: 'Some products include payroll; many integrate with a dedicated payroll provider instead. For most small and mid-size businesses, running payroll through a specialist provider and feeding it clean hours and rates from the HR or ERP system is the lower-risk setup.' },
    { q: 'Is HR software part of ERP?', a: 'Often, yes &mdash; ERP systems commonly include a people or HR module covering records, time, leave and payroll inputs. Standalone HR tools go deeper on benefits, recruiting and compliance content. Which is right depends on whether labor is a direct cost of what you sell.' },
    { q: 'How much does HR software cost for a small business?', a: 'Standalone HR tools commonly run from a few dollars to around US$20 per employee per month, with payroll and benefits administration priced separately. Inside a TechAuditPros custom ERP, the people module is part of the one agreed monthly fee rather than a per-employee fee.' },
  ],
  cta: ERP_CTA,
},
// ------------------------------------------------------------------ 7. How to choose ERP software
{
  slug: 'how-to-choose-erp-software', cat: 'erp', date: D,
  title: 'How to Choose ERP Software: A Buyer’s Guide for Small and Mid-Size Businesses | TechAuditPros',
  desc: 'How to choose ERP software without a 12-month selection project: define the problem, score the options (custom, cloud subscription, industry suite, open source), the 15 questions to ask every vendor, and the red flags.',
  eyebrow: 'ERP Buyer’s Guide',
  h1: 'How to Choose ERP Software: A Buyer’s Guide That Fits in One Afternoon',
  dek: 'Most ERP selection advice is written for enterprises with a procurement department. This is the version for a business owner who needs a good decision, not a perfect one &mdash; in an afternoon, not a year.',
  lead: { img: 'client-consultation-meeting-clipboard.jpg', alt: 'Business owner and consultant working through an ERP requirements checklist', w: 547, h: 365 },
  takeaways: [
    'Start from the three numbers you cannot get today, not from a feature list. The right ERP is the one that produces them with the least friction.',
    'You are choosing between four options &mdash; a subscription product, an industry-specific suite, open source you host, or a custom build &mdash; and each wins in a specific situation described below.',
    'Total cost over five years at your future headcount, who owns the data, and what happens when your process changes are the three questions that separate good choices from expensive ones.',
  ],
  intro: 'To <strong>choose ERP software</strong> well, work backwards from the problem: write down the two or three operational numbers you cannot get today (real margin per job, stock cover per SKU, on-time delivery rate), map the workflow that would produce them, and only then compare options against that map. Businesses that start from vendor feature lists end up buying the longest list; businesses that start from their own workflow end up buying the system they will actually use. The rest of this guide is that process, in order.',
  sections: [
    { h2: 'Step 1: Define the Problem in Three Numbers', html: `
<p>Before any demo, finish these sentences:</p>
<ul>
<li>"Every month I wish I knew ______ and today it takes ______ hours of spreadsheet work to find out."</li>
<li>"Our team re-types ______ from ______ into ______, and it goes wrong about ______ times a month."</li>
<li>"We lost or delayed ______ last quarter because we did not know ______ in time."</li>
</ul>
<p>Those answers are your requirements. A system that fixes all three is a success even if it lacks 200 features on someone's comparison chart. Common answers we hear: margin per job or product, stock on hand by location, order status without calling the warehouse, month-end close time, and quotes that reflect real cost.</p>` },
    { h2: 'Step 2: Map the Workflow That Produces Them', html: `
<p>Take one order &mdash; a real one from last month &mdash; and write every step from the first customer contact to the money arriving in the bank, with who does it and which tool they use. Do the same for one purchase and, if you make things, one production run. Mark every step where something is re-typed, waited for or guessed.</p>
<p>That map is the single most useful document in the whole selection. It tells you which modules you need first, where integrations must exist, and &mdash; crucially &mdash; how standard or unusual your process really is. Standard processes fit products; unusual processes fight them.</p>`,
      figure: { img: 'whiteboard-process-mapping-two-colleagues.jpg', alt: 'Two colleagues mapping the order-to-cash workflow on a whiteboard', w: 2400, h: 1601, cap: 'One real order, every step, every hand-off: the map decides the software, not the other way round.' } },
    { h2: 'Step 3: Know the Four Options and When Each Wins', html: `
<div class="article-table-wrap"><table>
<tr><th>Option</th><th>Wins when</th><th>Watch for</th><th>Cost pattern (US, SMB)</th></tr>
<tr><th>Subscription (SaaS) ERP</th><td>Your processes are standard, your team is small, you want to start in weeks</td><td>Per-seat fees rising with headcount; configuration limits; vendor roadmap decides features</td><td>US$100&ndash;$250 per user per month plus implementation of US$15k&ndash;$100k+</td></tr>
<tr><th>Industry-specific suite</th><td>You are in a vertical with a mature suite (e.g., distribution, construction) and your process matches the industry norm</td><td>Expensive to leave; customization by consultants; features aimed at bigger companies</td><td>Custom-quoted; first-year totals often six figures</td></tr>
<tr><th>Open source, self-hosted</th><td>You have in-house technical staff who will own it, and license cost matters more than time</td><td>You become the vendor: hosting, upgrades, security, and the gaps are yours to fill</td><td>No license; real cost is engineering time and hosting</td></tr>
<tr><th>Custom build</th><td>Your process is genuinely non-standard, per-seat costs are climbing, or you want the system to change as fast as the business does</td><td>Choose a partner that phases delivery and hands you the code; avoid big-bang upfront projects</td><td>Upfront: high five to six figures; or flat monthly &mdash; TechAuditPros on one agreed monthly fee, all-in</td></tr>
</table></div>
<p>Notice that "custom" and "cloud" are not opposites. A custom ERP is normally cloud-hosted in an account you own &mdash; see <a href="/blog/what-is-cloud-erp.html">What is cloud ERP?</a> for the distinction.</p>` },
    { h2: 'Step 4: Ask Every Vendor (Including Us) These 15 Questions', html: `
<div class="article-checklist">
<h3>The questions that separate good options from expensive ones</h3>
<ol>
<li>Show me how <em>my</em> order (from the map) flows through your system, step by step. Not a demo &mdash; my order.</li>
<li>Which of my steps require a workaround, a customization or a third-party add-on?</li>
<li>What is the total cost over five years at the headcount I expect in year three?</li>
<li>What exactly is included in implementation, and what is billed separately?</li>
<li>How long until the first module is in daily use? How long until all of them are?</li>
<li>How do you migrate my existing data, and how many trial migrations are included?</li>
<li>Which of my current tools do you integrate with natively, and which need middleware?</li>
<li>Who owns the data, where is it hosted, and how do I export everything if I leave?</li>
<li>Who owns the code (for custom builds), and can another team maintain it?</li>
<li>What happens when my process changes next year &mdash; who makes the change and what does it cost?</li>
<li>Who exactly will I talk to after go-live? A named person or a support queue?</li>
<li>What are your backup, recovery and access-control practices?</li>
<li>Is there a minimum contract term, and what are the exit terms?</li>
<li>Can I talk to a current customer of my size and industry?</li>
<li>What will you tell me I do <em>not</em> need?</li>
</ol>
</div>
<p>The last question is the tell. A vendor who cannot name a module you should skip is selling a list, not solving a problem.</p>` },
    { h2: 'Step 5: Watch for These Red Flags', html: `
<ul>
<li><strong>Pricing only after a discovery call.</strong> Ranges exist for every option; a vendor who will not give any is optimizing for negotiation, not fit.</li>
<li><strong>"Yes, with customization" three or more times.</strong> You are about to pay for a product and a custom build. Pick one.</li>
<li><strong>A twelve-month implementation for a forty-person company.</strong> Something is oversized &mdash; the product, the scope or the partner.</li>
<li><strong>Demo data that is never yours.</strong> If they will not load a sample of your real products and orders before you sign, they are not confident it fits.</li>
<li><strong>Long contracts with exit fees.</strong> Confidence in a product does not need a lock-in.</li>
<li><strong>No answer to "who owns the data?"</strong> Walk away.</li>
</ul>`,
      figure: { img: 'istock-1313265074-boardroom-team-through-glass-dark.jpg', alt: 'Leadership team evaluating ERP options in a boardroom', w: 612, h: 408, cap: 'Judge every option against your workflow map and your five-year cost, not the demo.' } },
    { h2: 'Step 6: Decide, Then Phase', html: `
<p>Whichever option you choose, insist on phasing: one module, one department or one site first, with the rest following once it is in daily use. It de-risks the decision, produces value in weeks instead of quarters, and gives you a real exit if the fit turns out to be wrong. Our guide to <a href="/blog/erp-implementation-guide.html">ERP implementation</a> covers how to run that rollout.</p>
<p>If your workflow map shows a process that no product quite fits, that is the case for a custom build &mdash; and it is exactly what TechAuditPros does for <a href="/us/erp/">US businesses</a> and <a href="/ca/erp/">Canadian businesses</a> on a flat monthly rate with the first module live in 6&ndash;10 weeks. If the map shows a standard process and a small team, we will tell you a subscription product is the better buy. Either way, the map decides.</p>` },
  ],
  faqs: [
    { q: 'What is the best ERP software for a small business?', a: 'The one that produces the numbers you cannot get today with the least friction and the lowest five-year cost at your future headcount. For standard processes and small teams that is often a subscription product; for non-standard processes, growing headcount or heavy integration needs, a custom build usually costs less over five years and fits better.' },
    { q: 'How long should ERP selection take?', a: 'For a small or mid-size business, two to four weeks is plenty: a week to write the three-numbers brief and workflow map, two weeks of demos run against your own order and data, and a decision. Selection projects that run for months usually mean the problem was never defined.' },
    { q: 'Custom ERP or off-the-shelf: how do I decide?', a: 'Count the workarounds. If demos of off-the-shelf systems fit your workflow map with one or two minor workarounds, buy the product. If you hear "with customization, yes" three or more times, your process is non-standard and a custom build will fit better and usually cost less over time.' },
    { q: 'What questions should I ask an ERP vendor?', a: 'Run your own real order through their system; ask what needs workarounds; get the five-year cost at future headcount; clarify what implementation includes; confirm data and code ownership and exit terms; ask who you will talk to after go-live; and ask what they would tell you not to buy.' },
  ],
  cta: ERP_CTA,
},
];
