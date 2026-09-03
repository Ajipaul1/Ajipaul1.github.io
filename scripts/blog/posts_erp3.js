'use strict';
const D = '2026-09-03';
module.exports = [
// ------------------------------------------------------------------ 34. What is CRM software
{
  slug: 'what-is-crm-software', cat: 'erp', date: D,
  title: 'What Is CRM Software? A Plain-English Guide for Small Businesses | TechAuditPros',
  desc: 'CRM (customer relationship management) software is the system that stores every customer and prospect, tracks every deal and conversation, and organizes sales, marketing and service around them. What it does, what it costs, when a small business needs one, and when it belongs inside your ERP.',
  eyebrow: 'ERP & Software',
  h1: 'What Is CRM Software? A Plain-English Guide for Small Businesses',
  dek: 'Customer relationship management software, explained without the sales pitch: what it stores, what it automates, what it costs, the signs you need one, and when a separate CRM is the wrong purchase.',
  lead: { img: 'support-agent-headset-smiling-laptop.jpg', alt: 'Customer-facing staff member using a CRM while on a call', w: 767, h: 400 },
  takeaways: [
    '<strong>CRM software</strong> is a shared database of every prospect and customer &mdash; contact details, company, every call, email, quote and ticket &mdash; plus the tools to move deals through a pipeline and keep customers served after the sale.',
    'It exists to answer three questions the inbox cannot: who are we talking to, where does each deal stand, and what did we promise this customer? A team of two selling from spreadsheets is already paying for the lack of one.',
    'Standalone CRMs are cheap to start and deep on sales and marketing; for businesses that hold inventory, quote from live pricing or fulfill orders, the CRM functions usually belong inside the ERP so the customer record and the order are one thing.',
  ],
  intro: '<strong>CRM software</strong> &mdash; customer relationship management software &mdash; is the system a business uses to store every prospect and customer in one place, along with everything that has happened with them: calls, emails, meetings, quotes, orders and support tickets. On top of that shared record it adds tools to run the customer-facing work: a sales pipeline that shows where every deal stands, marketing that reaches the right contacts, and service that knows the history before the customer explains it. The acronym makes it sound abstract; the job is concrete: nobody in the company should ever have to ask "what did we tell them?"',
  sections: [
    { h2: 'What a CRM Actually Stores', html: `
<ul>
<li><strong>Contacts and accounts.</strong> People and the companies they belong to, with roles, details and ownership (which salesperson looks after them).</li>
<li><strong>Activity history.</strong> Every call logged, email synced, meeting held and note taken &mdash; the timeline that lets anyone pick up a conversation.</li>
<li><strong>Deals (or opportunities).</strong> Each potential sale with its value, stage, expected close date and next step. Together they form the pipeline and the forecast.</li>
<li><strong>Quotes and proposals.</strong> Priced offers, versioned, tracked until signed or lost.</li>
<li><strong>Tasks and reminders.</strong> The follow-up that would otherwise live on a sticky note.</li>
<li><strong>Service cases.</strong> Complaints, requests and tickets, with status and resolution.</li>
<li><strong>Marketing data.</strong> Which campaigns a contact received and responded to; lead source; consent.</li>
</ul>` },
    { h2: 'What a CRM Does With It', html: `
<div class="article-table-wrap"><table>
<tr><th>Function</th><th>What it replaces</th><th>Who uses it</th></tr>
<tr><th>Pipeline management</th><td>The deals spreadsheet and the weekly "where are we with&hellip;" meeting</td><td>Sales, owners</td></tr>
<tr><th>Contact and activity tracking</th><td>Inboxes, phone memories, handover chaos when someone leaves</td><td>Everyone customer-facing</td></tr>
<tr><th>Quoting</th><td>Word templates and copy-paste pricing errors</td><td>Sales</td></tr>
<tr><th>Task automation</th><td>Forgotten follow-ups; the lead that went cold</td><td>Sales, service</td></tr>
<tr><th>Email marketing and lead capture</th><td>Disconnected newsletter tools; web forms that email one person</td><td>Marketing</td></tr>
<tr><th>Service and ticketing</th><td>"Did anyone reply to this?"</td><td>Support</td></tr>
<tr><th>Reporting</th><td>Forecasts by gut feel</td><td>Owners, managers</td></tr>
</table></div>`,
      figure: { img: 'istock-1094918638-manager-tablet-evening-office-smile.jpg', alt: 'Sales manager reviewing the pipeline on a tablet', w: 612, h: 392, cap: 'The pipeline view &mdash; every deal, its stage, its value &mdash; is the screen owners open first.' } },
    { h2: 'Signs a Business Needs a CRM', html: `
<ul>
<li>Two or more people talk to the same customers and do not know what the others said.</li>
<li>Follow-ups are missed, or done twice.</li>
<li>The forecast is a feeling.</li>
<li>Quotes are built from an old spreadsheet and sometimes wrong.</li>
<li>When a salesperson leaves, their customers leave with them &mdash; because the relationship lived in their inbox.</li>
<li>Website leads go to one email address and sometimes nowhere.</li>
</ul>
<p>Two of those is enough. The cost of the tool is trivial next to one lost deal.</p>` },
    { h2: 'What CRM Software Costs', html: `
<p>Standalone CRMs are among the cheapest business software categories to start with: free tiers exist for very small teams, entry plans commonly run US$15&ndash;$50 per user per month, and mid-market plans US$50&ndash;$150+ per user per month once automation, quoting and advanced reporting are included. Two costs are routinely underestimated: setup and data cleanup (getting years of contacts out of inboxes and spreadsheets in usable shape) and the integration to accounting, e-commerce or ERP, without which the customer record and the order history live in two places.</p>
<div class="article-callout">A CRM that nobody updates is an expensive address book. The system only works if logging a call takes ten seconds and the pipeline is the screen the sales meeting runs from.</div>` },
    { h2: 'CRM vs. ERP: Which One Is This?', html: `
<p>CRM runs the front office &mdash; prospects, deals, quotes, service. ERP runs the back office &mdash; inventory, orders, purchasing, production, finance. They meet at the order: the CRM hands over a won deal, the ERP fulfills and invoices it. The full comparison is in <a href="/blog/erp-vs-crm.html">ERP vs. CRM</a>. The practical question for a small business is whether they should be one system or two.</p>
<ul>
<li><strong>Services business, no inventory:</strong> a standalone CRM first, almost always. Your operational complexity is in projects and time, not stock.</li>
<li><strong>You hold stock, quote from live pricing or fulfill orders:</strong> the CRM functions usually belong inside the ERP, so a quote is built from real prices and availability and becomes an order without re-keying. That is how TechAuditPros scopes <a href="/us/erp/">custom ERP for US businesses</a> and <a href="/ca/erp/">Canadian businesses</a>: if the team already loves a CRM, we integrate with it; if sales runs from spreadsheets, the pipeline and quoting module is part of the build.</li>
<li><strong>Already on a CRM the team uses daily:</strong> keep it and integrate. Forcing a change costs more than the duplication.</li>
</ul>`,
      figure: { img: 'istock-2196870531-consultants-walking-tablet-corridor.jpg', alt: 'Sales and operations colleagues reviewing a customer record together', w: 612, h: 408, cap: 'One customer record from first call to final invoice is the goal; whether it lives in a CRM, an ERP or both is the design choice.' } },
    { h2: 'How to Choose a CRM', html: `
<div class="article-checklist">
<h3>Six checks</h3>
<ol>
<li><strong>Will your salespeople actually use it?</strong> Mobile app, email sync, one-tap logging. Test with the least technical person on the team.</li>
<li><strong>Does the pipeline match how you sell?</strong> Stages should be your stages; if you have to bend your process to the tool, look elsewhere.</li>
<li><strong>Does it quote the way you quote?</strong> From a price book, with the discounts and approvals you actually use.</li>
<li><strong>What does it integrate with</strong> &mdash; your email, calendar, website forms, accounting and (if you have one) ERP?</li>
<li><strong>Five-year cost at future headcount.</strong> Per-user pricing looks cheap at four seats and different at twenty.</li>
<li><strong>Can you export everything?</strong> Your customer data should never be hostage to a subscription.</li>
</ol>
</div>
<p>For how a CRM fits alongside the other systems a growing company runs, see <a href="/blog/erp-system-examples.html">ERP system examples by business type</a> and <a href="/blog/what-is-erp-software-plain-english.html">what ERP software is</a>.</p>` },
  ],
  faqs: [
    { q: 'What does CRM stand for?', a: 'Customer relationship management. CRM software is the system that stores every prospect and customer with their full history and organizes sales, marketing and service work around them.' },
    { q: 'What is CRM software used for?', a: 'Tracking contacts and every interaction with them, managing the sales pipeline and forecast, producing quotes, automating follow-ups, running email marketing and capturing leads, handling service tickets, and reporting on all of it.' },
    { q: 'Do small businesses need a CRM?', a: 'Once two or more people talk to the same customers, or follow-ups are being missed, yes. Very small teams can start with a free or entry-level plan; the value is in the shared record, not the feature list.' },
    { q: 'Is CRM part of ERP?', a: 'It can be. Many ERP systems include a CRM module, and a custom ERP can include the pipeline and quoting functions a small sales team uses so the customer record and the order are one thing. Larger companies usually run a dedicated CRM integrated with the ERP.' },
    { q: 'How much does CRM software cost?', a: 'Free tiers exist for very small teams; entry plans commonly run US$15&ndash;$50 per user per month and mid-market plans US$50&ndash;$150+. Setup, data cleanup and integrations are the costs most often underestimated.' },
  ],
  cta: { h3: 'Not sure whether you need a CRM, an ERP or both?', p: 'Book a free strategy call. We look at how your business actually sells and delivers and tell you honestly which system fits &mdash; including when a free CRM is the right answer.' },
},
];
