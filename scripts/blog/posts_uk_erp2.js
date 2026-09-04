'use strict';
// UK blog wave 1, posts 5-8 (ai_context/PLAN-UK section 3). Same rules as posts_uk_erp1.js:
// UK spelling, UK compliance detail, third-party market figures kept and attributed, never a price
// we charge, no single-engineer language, and the pictures carry the argument section by section.
//   5 benefits of erp 390/12 + advantages of erp 720/0 + erp benefits 260 + why use an erp system
//   6 is sage an erp 170/28 + sage erp 320/31 + xero vs erp + quickbooks vs erp + erp vs accounting
//     software 260/26
//   7 payroll software uk 140/13 + workplace pension auto enrolment integration (UK-only cluster)
//   8 what is an hris 590/28 + what is hr software 320/25 + hris system 320/24 + hcm 320/21
const D = '2026-09-04';
const ERP_CTA = { h3: 'Want this looked at properly, with your own numbers?', p: 'Book a free strategy call. We walk one real process through your business and tell you honestly whether custom, cloud or off-the-shelf fits &mdash; including when the answer is to change nothing yet.' };

module.exports = [
// ------------------------------------------------------------------ 5. ERP benefits, honestly
{
  slug: 'benefits-of-erp-uk', cat: 'erp', date: D,
  title: 'The Benefits of ERP, With the Costs Left In | TechAuditPros',
  desc: 'Every vendor lists the benefits of ERP. This guide puts a number on each one, says which ones you should not expect, and gives you the arithmetic to work out whether it pays for your business.',
  eyebrow: 'ERP Benefits',
  h1: 'The Benefits of ERP, With the Costs Left In',
  dek: 'Nine benefits worth the money, three that get oversold, and the one calculation that decides it &mdash; which you can do on the back of an envelope before you speak to anyone.',
  lead: { img: 'blog-desk-financial-charts-phone.jpg', alt: 'Financial charts and figures on a working office desk' },
  takeaways: [
    'The benefits that reliably show up are unglamorous: no duplicate data entry, stock people trust, a real cost per job, a month end that closes, and one version of the truth.',
    'The ones that get oversold are &ldquo;better decisions&rdquo;, headcount savings, and any single ROI percentage quoted without your numbers in it.',
    'The only calculation that matters: hours a week currently lost to duplicate entry and reconciliation, times a loaded hourly rate, times 52, against the all-in annual cost.',
    'Independent UK research puts realistic total cost at &pound;15,000&ndash;&pound;60,000 a year, so the saving has to be genuinely that size before the project makes sense.',
  ],
  intro: 'The <strong>benefits of ERP</strong> that actually turn up are administrative rather than visionary: data entered once instead of three times, a stock figure the warehouse believes, a true cost per job, a month end that comes out of the system, and everybody arguing from the same number. Those are worth real money in a business that is currently paying for their absence in salary. The benefits that get oversold &mdash; &ldquo;better decision-making&rdquo;, headcount reduction, a tidy ROI percentage &mdash; are the ones no vendor can promise and no buyer should price in.',
  sections: [
    { h2: 'The Nine That Reliably Show Up', html: `
<div class="article-table-wrap"><table>
<tr><th>Benefit</th><th>Where the money comes from</th><th>How to size it</th></tr>
<tr><th>No duplicate entry</th><td>The same order stops being typed into a sheet, an accounts package and a courier portal</td><td>Count the re-entries per day &times; minutes each &times; loaded hourly rate</td></tr>
<tr><th>Stock people trust</th><td>Fewer emergency buys, fewer stockouts, less dead stock financed on the shelf</td><td>Last year&rsquo;s emergency purchases plus the value of stock you wrote off</td></tr>
<tr><th>A real cost per job</th><td>Loss-making work gets found and repriced instead of averaged away</td><td>Take three finished jobs and cost them properly by hand. The gap is the number</td></tr>
<tr><th>A month end that closes</th><td>Days of senior time recovered every single month</td><td>Days spent closing &times; 12 &times; the day rate of whoever does it</td></tr>
<tr><th>Promise dates you keep</th><td>Fewer late deliveries, fewer credits, fewer customers you lose quietly</td><td>Credits and rework raised last year for late or wrong delivery</td></tr>
<tr><th>One version of the truth</th><td>Meetings stop being about whose spreadsheet is right</td><td>Hard to price, easy to recognise</td></tr>
<tr><th>Traceability on demand</th><td>An audit or recall becomes an afternoon rather than a fortnight</td><td>What the last one cost you in time, or what a failed audit would</td></tr>
<tr><th>Compliance without a scramble</th><td>MTD-ready records, and a year end your accountant can work from</td><td>Your accountant&rsquo;s bill for tidying up, which they will tell you honestly</td></tr>
<tr><th>The business survives a holiday</th><td>Pricing and process stop living in one person&rsquo;s head and one workbook</td><td>Ask what stops when your longest-serving admin is away for two weeks</td></tr>
</table></div>
<div class="article-callout">Every one of those can be estimated from records you already hold. If you cannot get within 20% of a number, that itself is a finding.</div>`,
      figure: { img: 'blog-holding-printout-over-laptop.jpg', alt: 'Holding a printout up against the figures on a laptop', cap: 'Almost every benefit on that list is really the same benefit: the number on the paper and the number on the screen stop disagreeing.' } },
    { h2: 'The Three That Get Oversold', html: `
<ul>
<li><strong>&ldquo;Better decision-making.&rdquo;</strong> A system gives you better <em>information</em>. Whether that turns into better decisions depends on people, and no software has ever fixed a decision nobody wants to make. Buy the information; do not pay a premium for the promise.</li>
<li><strong>Headcount savings.</strong> In practice the same people stop doing re-entry and start doing work that was previously not getting done at all. That is genuinely valuable, and it is not a redundancy. Any business case built on cutting staff usually ends with the system half-adopted and the people who were meant to run it resentful.</li>
<li><strong>A published ROI figure.</strong> &ldquo;Customers see a 20% improvement in X&rdquo; means nothing without knowing which customers, measured how, over what period, and against what baseline. Do the envelope calculation with your own numbers instead. It takes ten minutes and it is yours.</li>
</ul>
<p>There is a fourth that deserves a mention: speed. ERP does not make your business faster on its own. It removes the delays caused by information not being where it is needed. Those are often most of the delay, but not all of it.</p>` },
    { h2: 'The Only Calculation That Decides It', html: `
<p>Two lines. That is the whole business case.</p>
<div class="article-table-wrap"><table>
<tr><th></th><th>How to work it out</th><th>Worked example</th></tr>
<tr><th>Annual cost of the gap</th><td>Hours a week lost to duplicate entry, reconciliation, chasing figures and rebuilding reports &times; loaded hourly rate &times; 52, plus last year&rsquo;s emergency buys, write-offs and late-delivery credits</td><td>14 hrs/wk &times; &pound;22 &times; 52 = &pound;16,016, plus &pound;9,000 of write-offs and emergency buys = <strong>&pound;25,016</strong></td></tr>
<tr><th>Annual cost of the fix</th><td>Licences or build, plus implementation spread over three years, plus support</td><td>Independent UK research puts total cost at <strong>&pound;15,000&ndash;&pound;60,000 a year</strong> depending on scope</td></tr>
</table></div>
<p>If the gap is comfortably bigger than the fix, the project pays. If they are close, phase it &mdash; fix the single most expensive symptom first and re-run the numbers in six months. If the gap is smaller, the honest answer is to change a process and buy nothing, and any supplier worth hiring will tell you that.</p>
<p>Note the loaded hourly rate: salary plus employer&rsquo;s National Insurance, pension contributions and holiday. The gross salary alone understates the cost of a wasted hour by roughly a fifth.</p>`,
      band: { img: 'blog-site-workers-hi-vis-aerial.jpg', alt: 'Site workers in high-visibility clothing seen from above', cap: 'The gap is measured in hours, not opinions.' } },
    { h2: 'What Changes First, and What Takes a Year', html: `
<div class="article-table-wrap"><table>
<tr><th>Timescale</th><th>What you notice</th></tr>
<tr><th>Weeks 1&ndash;8</th><td>One process stops being duplicated. Usually stock or orders. The team notices immediately because the annoying bit of their day disappears</td></tr>
<tr><th>Months 2&ndash;4</th><td>Stock accuracy climbs and the emergency buys drop off. Promise dates start being based on something</td></tr>
<tr><th>Months 4&ndash;8</th><td>The first properly costed jobs close. This is usually where somebody finds a product line that has been losing money for two years</td></tr>
<tr><th>Months 6&ndash;12</th><td>Month end shortens. Year end stops being a rebuild. Reporting becomes something you read rather than something you assemble</td></tr>
<tr><th>Year two</th><td>The improvements get boring, which is the point. New questions get answered from the system instead of from a project</td></tr>
</table></div>
<p>The pattern is worth noticing: everything valuable happens after adoption, not after installation. Which is why phasing beats a big-bang launch, and why the test at the end of each phase is simply whether anybody stopped using a spreadsheet.</p>` },
    { h2: 'Where the Benefits Fail to Appear', html: `
<p>Being straight about this is more useful than another list of upsides. ERP does not pay off when:</p>
<ul>
<li><strong>The data going in is wrong and nobody owns fixing it.</strong> A faster route to a wrong answer is not an improvement.</li>
<li><strong>The team has no capacity to absorb change.</strong> Launching during your busiest quarter guarantees the workarounds survive and the system does not.</li>
<li><strong>The process itself is the problem.</strong> Automating a bad approvals chain gives you a bad approvals chain that runs faster.</li>
<li><strong>Nobody senior is accountable.</strong> Projects with no named owner drift until they are quietly abandoned, having cost the full amount.</li>
<li><strong>You bought modules you do not need.</strong> Every unused module is licence cost, training burden and a screen your team learns to ignore.</li>
</ul>
<p>None of those are software failures. All five are visible before you sign, which is why the audit comes first. Our <a href="/uk/erp/">UK ERP page</a> sets out how that runs, and <a href="/blog/erp-implementation-uk-guide.html">the implementation guide</a> covers the sequencing in detail.</p>`,
      figures: [
        { img: 'blog-desk-calculator-charts-binders.jpg', alt: 'A desk with a calculator, printed charts and binders', cap: 'Do the envelope calculation before the first demo.' },
        { img: 'blog-four-professionals-discussing.jpg', alt: 'Four colleagues discussing a decision in an office', cap: 'And name the person accountable before the first invoice.' },
      ] },
  ],
  faqs: [
    { q: 'What are the main benefits of an ERP system?', a: 'Data entered once instead of several times, a stock figure people trust, a true cost per job, promise dates based on real capacity, a month end that closes from the system, traceability on demand, and compliance records that are ready rather than reconstructed. All of them are measurable from records you already hold.' },
    { q: 'How do I calculate ERP ROI for my business?', a: 'Two lines. Add up hours a week lost to duplicate entry, reconciliation and rebuilding reports, multiply by a loaded hourly rate and by 52, then add last year&rsquo;s emergency purchases, write-offs and late-delivery credits. Compare that with the all-in annual cost, which independent UK research puts at &pound;15,000&ndash;&pound;60,000. Ignore any published ROI percentage that does not contain your numbers.' },
    { q: 'Does ERP reduce headcount?', a: 'Rarely, and you should not build the case on it. What normally happens is that the same people stop doing re-entry and start doing work that was not getting done. That is valuable, but it is not a saving you can put in a budget, and a business case built on redundancies tends to end with a half-adopted system.' },
    { q: 'How long before an ERP system pays for itself?', a: 'The first visible saving usually lands in the first two months, when one duplicated process stops. Costing and month-end benefits arrive between months four and twelve. If a supplier promises payback inside a quarter on a full rollout, ask which single module they mean.' },
    { q: 'What is the most common reason the benefits never arrive?', a: 'Adoption. A big-bang launch onto a team with no spare capacity, built from a questionnaire rather than from watching the work, with no senior owner. All three are visible before you sign, which is why the process audit should come before any software decision.' },
  ],
  cta: ERP_CTA,
},

// ------------------------------------------------------------------ 6. Is Sage an ERP?
{
  slug: 'is-sage-an-erp-vs-accounting-software', cat: 'erp', date: D,
  title: 'Is Sage an ERP? Sage, Xero and QuickBooks vs a Real ERP | TechAuditPros',
  desc: 'Sage 200 and Sage Intacct are ERP; Sage 50, Xero and QuickBooks are accounting software with add-ons. Here is the actual dividing line, what each one does well, and when you need something else.',
  eyebrow: 'ERP vs Accounting',
  h1: 'Is Sage an ERP? And Where Xero and QuickBooks Stop',
  dek: 'It depends which Sage. The useful question is not what the product is called but which of the two jobs it does &mdash; recording money, or running operations.',
  lead: { img: 'blog-spreadsheet-on-laptop-desk.jpg', alt: 'A spreadsheet of figures open on a laptop, the system most businesses actually run on' },
  takeaways: [
    'Sage is a range, not a product. Sage 50 is accounting software; Sage 200 and Sage Intacct are sold as ERP. Xero and QuickBooks are accounting software with an add-on marketplace.',
    'The dividing line: accounting software records what happened to the money. ERP runs the operation that generates it &mdash; stock, works orders, purchasing, costing, traceability.',
    'You almost never have to choose. Keep the accounting package your accountant trusts as the book of record, and let ERP be the system of record for operations.',
    'The signal you have outgrown accounting-plus-add-ons: two tools need the same data and neither is clearly the master.',
  ],
  intro: '<strong>Is Sage an ERP?</strong> It depends which Sage. Sage 50 is accounting software. Sage 200 and Sage Intacct are sold and priced as ERP, with published UK pricing for Sage 200 starting around &pound;374 a month. Xero and QuickBooks are accounting software with a large add-on marketplace. The distinction that actually matters is not the label: accounting software records what happened to the money, while ERP runs the operation that generates it. Most businesses need both, and the mistake is expecting either one to do the other&rsquo;s job.',
  sections: [
    { h2: 'The Dividing Line, in One Table', html: `
<div class="article-table-wrap"><table>
<tr><th>Question</th><th>Accounting software</th><th>ERP</th></tr>
<tr><th>What did we invoice and what are we owed?</th><td>Yes, this is its job</td><td>Yes, usually synced to the accounts package</td></tr>
<tr><th>Is our VAT return right and filed?</th><td>Yes &mdash; MTD-recognised, and this is where it should stay</td><td>Feeds it clean figures</td></tr>
<tr><th>What stock do we hold, per site and per bin?</th><td>Basic quantity at best</td><td>Yes, including committed and subcontract stock</td></tr>
<tr><th>What should we make or buy, and when?</th><td>No</td><td>Yes &mdash; that is MRP</td></tr>
<tr><th>What did that specific job cost?</th><td>No, only what it was invoiced at</td><td>Yes: material, labour, machine, subcontract, scrap</td></tr>
<tr><th>Can we trace this batch forwards and back?</th><td>No</td><td>Yes</td></tr>
<tr><th>Can we promise this delivery date?</th><td>No</td><td>Yes, from BOMs, stock, lead times and capacity</td></tr>
<tr><th>What is our WIP worth at year end?</th><td>Only if somebody works it out by hand</td><td>Yes, at any date</td></tr>
</table></div>
<p>Read the left column as a list of things accounting software is genuinely good at, not a list of failures. Asking Xero to run a shop floor is like asking a shop floor to file a VAT return.</p>`,
      figure: { img: 'blog-focused-on-accounts-at-desk.jpg', alt: 'Working through the accounts at an office desk', cap: 'Accounting software is the book of record for money. It was never meant to be the system of record for operations, and forcing it into that role is how the spreadsheets start.' } },
    { h2: 'Which Sage Is Which', html: `
<ul>
<li><strong>Sage 50</strong> &mdash; accounting for smaller businesses. Nominal ledger, sales and purchase ledger, VAT and MTD, basic stock. Not an ERP, and not pretending to be.</li>
<li><strong>Sage 200</strong> &mdash; sold as a business management or ERP suite for mid-sized companies, with modules for stock, manufacturing and project accounting. Published UK pricing starts near &pound;374 a month, and it is normally implemented through a reseller partner.</li>
<li><strong>Sage Intacct</strong> &mdash; cloud financial management aimed at finance-led organisations, strong on multi-entity consolidation and reporting rather than the shop floor.</li>
<li><strong>Sage X3</strong> &mdash; the larger, more configurable ERP in the range, for complex or multi-site manufacturing and distribution.</li>
</ul>
<p>So &ldquo;we use Sage&rdquo; tells you almost nothing until you know which one. It is worth asking, because the answer decides whether the gap you are feeling is a missing module or a missing system.</p>` },
    { h2: 'Xero and QuickBooks: How Far the Add-Ons Get You', html: `
<p>Both have a large marketplace, and for a while it genuinely works. An inventory app, a job-costing app, a scheduling app, a courier integration. Each one is cheap, each one solves its own problem.</p>
<p>The pattern that follows is consistent enough to predict. Nobody is the master. The inventory app has one stock figure, the courier portal implies another, and the accounts have a third. Because every app syncs to the accounting package rather than to each other, discrepancies appear where two of them overlap, and they are discovered by a customer rather than by a report. Meanwhile the workaround spreadsheet reappears in the middle to reconcile them &mdash; and that spreadsheet is now the real system of record.</p>
<div class="article-callout">The moment to act is not when something breaks. It is when you notice a spreadsheet has quietly become the thing everyone checks.</div>`,
      figures: [
        { img: 'blog-calculator-and-notebook-desk.jpg', alt: 'A calculator and notebook on a working desk', cap: 'Each app is cheap and solves its own problem.' },
        { img: 'blog-holding-papers-in-office.jpg', alt: 'Someone holding a stack of printed forms in an office', cap: 'And then something has to reconcile all of them.' },
      ] },
    { h2: 'You Almost Never Have to Choose', html: `
<p>This is the part that surprises people. The right answer is usually both, with the boundary drawn deliberately:</p>
<ul>
<li><strong>Accounting package stays the book of record for money.</strong> Nominal ledger, VAT, MTD filing, statutory accounts. Your accountant keeps working in software they know, and your compliance stays where it already functions correctly.</li>
<li><strong>ERP becomes the system of record for operations.</strong> Orders, stock, works orders, purchasing, job costing, traceability, despatch.</li>
<li><strong>One direction of truth per field.</strong> Every field has exactly one owner, and the sync moves it one way through the official API. Two-way sync on the same field is how you get a discrepancy nobody can explain.</li>
</ul>
<p>Done this way you do not migrate your accounts, you do not retrain your finance team, and you do not put your VAT filing at risk to fix a stock problem.</p>` },
    { h2: 'The Test, Before You Spend Anything', html: `
<p>Ask five questions and count the answers you dislike.</p>
<ul>
<li>Is the same information typed into more than one system?</li>
<li>Is there a spreadsheet that people check <em>instead</em> of the software?</li>
<li>Can you say what your last big job actually cost, without assembling it by hand?</li>
<li>If a customer asked which batch their order came from, could you answer today?</li>
<li>Does month end involve rebuilding anything?</li>
</ul>
<p>None or one, stay where you are and fix a process. Two or three, look at whether a module in what you already own covers it &mdash; often it does, and nobody switched it on. Four or five, you have outgrown accounting-plus-add-ons, and the honest options are a mid-market suite like Sage 200 or a <a href="/uk/erp/">custom build that keeps your accounting package in place</a>. <a href="/blog/mrp-vs-erp-vs-wms.html">MRP, ERP and WMS</a> explains which of the three you are actually missing.</p>` },
  ],
  faqs: [
    { q: 'Is Sage an ERP system?', a: 'Some of the range is. Sage 200, Sage Intacct and Sage X3 are sold as ERP or business management suites; Sage 50 is accounting software. So the answer depends entirely on which Sage product you mean, which is worth establishing before deciding whether you need something more.' },
    { q: 'What is the difference between ERP and accounting software?', a: 'Accounting software records what happened to the money: ledgers, invoices, VAT, statutory accounts. ERP runs the operation that generates the money: stock by location, works orders, purchasing, job costing, traceability, promise dates. Most businesses need both, with the accounting package kept as the book of record.' },
    { q: 'Can Xero or QuickBooks work as an ERP?', a: 'With add-ons they cover a surprising amount, and for a simple business that is enough. It breaks down when two apps need the same data and neither is clearly the master: you end up with a reconciliation spreadsheet in the middle, which then becomes the real system of record.' },
    { q: 'Do we have to replace Sage or Xero to get an ERP?', a: 'No, and usually you should not. Keep it as the book of record for accounts and let the ERP own operations, syncing one direction per field through the official API. Your accountant stays on software they trust and your MTD filing stays where it already works.' },
    { q: 'How much does Sage 200 cost in the UK?', a: 'Published UK pricing starts around &pound;374 a month, before implementation, and it is normally delivered through a reseller partner whose fees are separate. As with any suite, ask for the year-one total including implementation and the day rate for changes after go-live.' },
  ],
  cta: ERP_CTA,
},

// ------------------------------------------------------------------ 7. Payroll + pensions (UK only)
{
  slug: 'payroll-workplace-pension-integration-uk', cat: 'erp', date: D,
  title: 'Payroll and Workplace Pensions: Stop Re-Keying the Same Hours | TechAuditPros',
  desc: 'How UK payroll actually connects to time capture, job costing and auto-enrolment pensions &mdash; what should be automatic, what must stay manual, and where the re-keying quietly costs you money.',
  eyebrow: 'Payroll &amp; Pensions',
  h1: 'Payroll and Workplace Pensions: Stop Re-Keying the Same Hours',
  dek: 'Hours get written down on site, typed into a spreadsheet, typed into payroll, and typed again into job costing. Each retype is a chance to be wrong about what a job cost and what somebody is owed.',
  lead: { img: 'blog-site-crew-reviewing-plans.jpg', alt: 'A site crew reviewing the job, where the hours that end up in payroll are actually worked' },
  takeaways: [
    'The same hours are commonly entered three or four times: on site, in a spreadsheet, in payroll, and in job costing. Only the first one is real.',
    'What should be automatic: time capture to gross pay, hours to job costing, and auto-enrolment contributions to the pension provider.',
    'What must stay manual and deliberate: RTI submissions to HMRC, auto-enrolment assessment decisions, and anything a person has to sign.',
    'Auto-enrolment duties are ongoing, not a one-off &mdash; assessment happens every pay period, and re-enrolment comes round roughly every three years.',
  ],
  intro: 'In most UK businesses that employ people on site or on shifts, the same hours are recorded three or four times: written down where the work happened, typed into a spreadsheet, typed into <strong>payroll</strong>, then typed again into job costing so somebody can work out what the job cost. Only the first record is real; the rest are copies that can drift. Connecting time capture to payroll, job costing and <strong>workplace pension</strong> contributions removes the copies &mdash; and it is the one integration that pays for itself in a business with more than a handful of hourly staff.',
  sections: [
    { h2: 'Where the Hours Go Today', html: `
<div class="article-table-wrap"><table>
<tr><th>Step</th><th>Who does it</th><th>What can go wrong</th></tr>
<tr><th>1. Hours written down on site</th><td>Supervisor, on paper or in a message</td><td>Illegible, missing a break, guessed at the end of the week</td></tr>
<tr><th>2. Typed into a spreadsheet</th><td>Admin</td><td>Wrong row, wrong week, wrong person, and now two versions exist</td></tr>
<tr><th>3. Typed into payroll</th><td>Whoever runs payroll</td><td>Overtime rate misapplied; a correction lands next period</td></tr>
<tr><th>4. Typed into job costing</th><td>Often nobody, so it is estimated</td><td>The job cost is now fiction, and pricing is based on it</td></tr>
<tr><th>5. Pension contributions</th><td>Payroll, then the provider&rsquo;s portal</td><td>Wrong pensionable pay, missed assessment for a new starter</td></tr>
</table>
</table></div>
<p>Step four is the expensive one and the one nobody notices, because nothing breaks. The job simply closes with an estimated labour cost, and next quarter you quote the next job from that estimate.</p>
<div class="article-callout">Capture the hours once, where the work happens, and every later step becomes a read rather than a retype.</div>` },
    { h2: 'What Should Be Automatic', html: `
<ul>
<li><strong>Time capture to gross pay.</strong> Hours booked against a job, with the rate rules applied by the system rather than remembered: overtime bands, shift premiums, unsocial hours, travel time if you pay it.</li>
<li><strong>Hours to job costing.</strong> The same booking that pays somebody also costs the job. One record, two uses &mdash; which is the whole point.</li>
<li><strong>Auto-enrolment contributions.</strong> Employee and employer amounts calculated on the correct definition of pensionable pay and filed to the provider on schedule.</li>
<li><strong>Absence and holiday accrual.</strong> Especially for irregular-hours and part-year workers, where the calculation has changed in recent years and manual working out is where errors live.</li>
<li><strong>Starters and leavers.</strong> One record creating the payroll entry, the pension assessment and the system access, so nobody is paid after leaving or missed on enrolment.</li>
</ul>`,
      band: { img: 'blog-two-in-hard-hats-pointing.jpg', alt: 'Two workers in hard hats reviewing work on site', cap: 'Capture the hour once, where the work happens.' } },
    { h2: 'What Must Stay Manual', html: `
<p>Being clear about this matters, because &ldquo;fully automated payroll&rdquo; is a claim that should make you suspicious.</p>
<ul>
<li><strong>RTI submissions to HMRC.</strong> Payroll software submits Full Payment Submissions and Employer Payment Summaries under its own recognition. That belongs in recognised payroll software, not in a custom system, and it stays a deliberate, checked action.</li>
<li><strong>Auto-enrolment assessment decisions.</strong> The arithmetic can be automated. The decision about a borderline worker &mdash; and the record of why &mdash; is a human duty with a compliance trail behind it.</li>
<li><strong>Anything anyone signs.</strong> Opt-outs, salary sacrifice agreements, contract variations. Store them against the person; do not generate them silently.</li>
<li><strong>The final approval before the run.</strong> A person should look at the totals and press the button. Every payroll team that has been burned once will tell you the same thing.</li>
</ul>
<p>The right architecture is therefore boring: your operational system owns time, jobs and rates, and pushes clean figures into recognised payroll software, which owns HMRC. Nobody re-types anything, and the regulated submission stays where it is licensed to be.</p>` },
    { h2: 'Auto-Enrolment Is Ongoing, Not a One-Off', html: `
<p>This catches growing employers more than any other part of it. Auto-enrolment is not something you completed in 2017.</p>
<ul>
<li><strong>Every pay period</strong>, workers are assessed against the earnings and age criteria. Somebody who was ineligible last month can become eligible this month because they did overtime.</li>
<li><strong>New starters</strong> are assessed on joining, with the enrolment and opt-out window handled and recorded.</li>
<li><strong>Re-enrolment</strong> comes round roughly every three years, when eligible workers who previously opted out must be put back in and a declaration made.</li>
<li><strong>Records</strong> have to be kept and produced on request &mdash; which is trivial if the system holds them and unpleasant if they live in an inbox.</li>
</ul>
<p>Because the current figures, thresholds and duties are set by The Pensions Regulator and can change, confirm the current rates and dates with them or your payroll provider rather than with any article &mdash; including this one. What does not change is the shape of the duty: assess every period, record everything, re-enrol on cycle.</p>`,
      figures: [
        { img: 'blog-interview-across-office-desk.jpg', alt: 'A new starter being interviewed across an office desk', cap: 'A new starter is a payroll record, a pension assessment and a system account.' },
        { img: 'blog-handshake-across-desk.jpg', alt: 'A handshake across a desk as an offer is accepted', cap: 'One entry should create all three, or one of them gets forgotten.' },
      ] },
    { h2: 'What This Is Worth', html: `
<p>Size it before you build it. Three numbers, all of which you already have:</p>
<ul>
<li><strong>Admin hours a week</strong> spent transcribing timesheets and reconciling them, times a loaded hourly rate, times 52.</li>
<li><strong>Corrections per year</strong> &mdash; underpayments, overpayments, missed overtime. Each one costs admin time and a small amount of trust.</li>
<li><strong>The job-costing gap.</strong> Take three finished jobs, cost the labour properly by hand, and compare with what was booked. That difference has been in your pricing all year.</li>
</ul>
<p>For a business with twenty or thirty hourly staff, the first number alone is usually several thousand pounds. The third is often larger and always more surprising.</p>
<p>This is the sort of integration we build on top of an existing payroll package rather than instead of it &mdash; see <a href="/uk/erp/">custom ERP for UK businesses</a>, and <a href="/blog/what-is-an-hris-uk.html">what an HRIS actually is</a> for where the people data belongs.</p>` },
  ],
  faqs: [
    { q: 'Should payroll be part of our ERP?', a: 'The time capture, rates and job costing should be. The HMRC submission should stay in recognised payroll software, which is licensed and updated for RTI. The right shape is one system owning hours and rates, pushing clean figures into payroll software that owns the filing.' },
    { q: 'Can workplace pension contributions be automated?', a: 'The calculation and the file to the provider can be, based on the correct definition of pensionable pay. The assessment decisions and the records behind them remain an employer duty, and borderline cases need a person and an audit trail. Confirm current thresholds with The Pensions Regulator or your payroll provider.' },
    { q: 'How often do we have to assess workers for auto-enrolment?', a: 'Every pay period, plus on joining for new starters, plus a re-enrolment exercise roughly every three years with a declaration. Someone ineligible last month can become eligible this month through overtime, which is why period-by-period assessment matters.' },
    { q: 'Why do our job costs never match what we paid in wages?', a: 'Almost always because the hours were entered into payroll and estimated into job costing, rather than captured once and used twice. Cost three finished jobs by hand and compare with what was booked; the gap has been sitting in your pricing all year.' },
    { q: 'Do we need timesheet hardware, or will phones do?', a: 'Phones do, provided the app records offline and syncs later. If capturing an hour needs a live connection, the hour gets written on paper instead and you are back where you started. That is the single most important requirement for site and shift work.' },
  ],
  cta: ERP_CTA,
},

// ------------------------------------------------------------------ 8. What is an HRIS
{
  slug: 'what-is-an-hris-uk', cat: 'erp', date: D,
  title: 'What Is an HRIS? HR Software, HRIS, HCM and HRMS Explained | TechAuditPros',
  desc: 'An HRIS is the system of record for your people data. Here is what it holds, how HRIS differs from HCM and HRMS, what a UK business actually needs it to do, and when a spreadsheet is still fine.',
  eyebrow: 'HR Systems',
  h1: 'What Is an HRIS? And Do You Need One Yet?',
  dek: 'Four acronyms for overlapping products, one useful question underneath: where does the authoritative record of a person live, and what reads from it?',
  lead: { img: 'blog-three-colleagues-laptops-table.jpg', alt: 'Colleagues working together, the people data an HRIS is the record of' },
  takeaways: [
    'An <strong>HRIS</strong> is the system of record for people data: contracts, pay history, absence, right-to-work, training, appraisals and documents.',
    '<strong>HCM</strong> adds the talent layer &mdash; recruitment, onboarding, performance, succession. <strong>HRMS</strong> usually means HRIS plus payroll. In practice vendors use all three interchangeably.',
    'For UK employers the non-negotiables are right-to-work evidence, GDPR-compliant retention and access, holiday for irregular-hours workers, and a clean handover to payroll and pensions.',
    'Under about fifteen people a well-kept spreadsheet plus a document folder is genuinely fine. The trigger is when absence, holiday and starters stop fitting in one person&rsquo;s head.',
  ],
  intro: 'An <strong>HRIS</strong> &mdash; human resources information system &mdash; is the system of record for people data: who works here, on what contract, at what rate, who has taken what leave, what training and right-to-work evidence you hold, and which documents belong to whom. That is all it is. The related acronyms mark out roughly where the product stops: <strong>HCM</strong> adds recruitment, onboarding and performance; <strong>HRMS</strong> usually means the same thing with payroll included. The useful question is not which acronym you are buying, but where the authoritative record of a person lives and what reads from it.',
  sections: [
    { h2: 'What an HRIS Actually Holds', html: `
<div class="article-table-wrap"><table>
<tr><th>Record</th><th>Why it has to be in one place</th></tr>
<tr><th>Person and contract</th><td>Start date, role, hours, contract type, rate, notice. Everything else is calculated from these</td></tr>
<tr><th>Right to work</th><td>Evidence and expiry dates, with a reminder before they lapse. A compliance duty, not admin</td></tr>
<tr><th>Absence and holiday</th><td>Entitlement, taken, remaining, carry-over &mdash; and sickness, separately</td></tr>
<tr><th>Pay history</th><td>Changes with effective dates, so you can answer what someone was on in March</td></tr>
<tr><th>Training and certification</th><td>Tickets, licences, competencies and expiry. In regulated trades this decides who can be sent where</td></tr>
<tr><th>Documents</th><td>Contracts, variations, opt-outs, disciplinary records, all attached to the person</td></tr>
<tr><th>Appraisals and notes</th><td>What was agreed and when, in a place that survives a manager leaving</td></tr>
<tr><th>Leavers</th><td>Final pay, access removal, and retention until the retention period expires</td></tr>
</table></div>
<p>Notice what is not in that list: payroll filing, and time capture against jobs. Those belong to payroll software and to your operational system. An HRIS should feed both, not replace either.</p>`,
      figure: { img: 'blog-reviewing-document-together.jpg', alt: 'Two colleagues reviewing a document together at a desk', cap: 'The test for an HRIS is simple: can you answer &ldquo;what was this person on in March, and who approved it?&rdquo; without opening an email.' } },
    { h2: 'HRIS, HCM, HRMS &mdash; the Honest Version', html: `
<div class="article-table-wrap"><table>
<tr><th>Term</th><th>What it usually means</th><th>Buy it when</th></tr>
<tr><th>HRIS</th><td>The people record: contracts, absence, documents, compliance</td><td>Almost always the first thing you need</td></tr>
<tr><th>HCM</th><td>HRIS plus the talent layer: recruitment, onboarding, performance, succession, learning</td><td>You are hiring steadily enough that a pipeline needs managing</td></tr>
<tr><th>HRMS</th><td>HRIS plus payroll in one product</td><td>You want one supplier and are happy for payroll to move</td></tr>
<tr><th>Core HR</th><td>A vendor&rsquo;s name for the HRIS part of their suite</td><td>Not a distinct category, just a module name</td></tr>
</table></div>
<p>In real sales conversations the terms are used interchangeably, so ignore the label and ask which of the eight records above it holds, and what it does with the other two systems in your business. That single question sorts the shortlist faster than any comparison grid.</p>` },
    { h2: 'The UK Parts That Are Not Optional', html: `
<ul>
<li><strong>Right-to-work evidence.</strong> Held, dated and monitored for expiry. This is a legal duty with penalties attached, and a folder on a shared drive is a poor way to discharge it.</li>
<li><strong>UK GDPR.</strong> People data is some of the most sensitive you hold. That means a lawful basis, defined retention periods with actual deletion at the end of them, access limited by role, and an audit trail of who looked at what. &ldquo;Everyone in the office can open the HR folder&rdquo; is a finding waiting to happen.</li>
<li><strong>Holiday for irregular-hours and part-year workers.</strong> The calculation is not the same as for salaried staff, and the rules have moved in recent years. Get it computed by the system, and confirm the current method with ACAS or your accountant rather than with an article.</li>
<li><strong>Statutory absence.</strong> Sick pay, family leave and the records behind them, kept in a form you can produce.</li>
<li><strong>A clean handover to payroll and pensions.</strong> One starter record should create the payroll entry and trigger the auto-enrolment assessment &mdash; see <a href="/blog/payroll-workplace-pension-integration-uk.html">payroll and workplace pensions</a>.</li>
</ul>
<div class="article-callout">Ask any HR system vendor to show you the right-to-work expiry report and the retention-and-deletion settings. Two screens, and they tell you how much UK thinking went into the product.</div>` },
    { h2: 'When a Spreadsheet Is Still the Right Answer', html: `
<p>Under roughly fifteen people, with salaried staff on regular hours and one person who genuinely knows everybody, a well-kept spreadsheet and an organised document folder work. They are free, everyone can read them, and there is nothing to learn.</p>
<p>They stop working at recognisable moments:</p>
<ul>
<li>Somebody&rsquo;s holiday balance is disputed and you cannot settle it from the record.</li>
<li>A right-to-work document expired and nobody was warned.</li>
<li>You cannot say, quickly, who holds a current certificate for a particular job.</li>
<li>Managers ask HR for figures HR has to assemble by hand.</li>
<li>The HR folder is open to more people than it should be, and everyone knows it.</li>
</ul>
<p>Two or more of those and the spreadsheet has become a risk rather than a saving.</p>`,
      figures: [
        { img: 'blog-meeting-with-clipboard.jpg', alt: 'A meeting being minuted on a clipboard', cap: 'What was agreed, and when.' },
        { img: 'blog-workers-on-site.jpg', alt: 'Workers on site, where certification decides who can be sent where', cap: 'And who currently holds the ticket for this job.' },
      ] },
    { h2: 'Buy, or Build It Into What You Already Have?', html: `
<p>Off-the-shelf HR software is a mature market and for most businesses it is the right answer: buy an HRIS, connect it to payroll, and get on with your actual work. It is cheaper and faster than building, and the compliance features are maintained by someone else.</p>
<p>Building the people layer into an existing operational system is worth considering in two cases. First, when certification and competency drive operational decisions &mdash; if who can be sent to which job depends on tickets and expiry dates, having that live next to scheduling and job costing is genuinely better than syncing it between two products. Second, when per-seat pricing on a second product is hard to justify for people who need to be in it twice a month.</p>
<p>Either way the boundary should be the same one: the HRIS or HR module owns the person, payroll owns HMRC, and the operational system owns jobs and hours. Our <a href="/uk/erp/">UK ERP page</a> covers how we draw that line in a build, and the call ends with an honest answer &mdash; including &ldquo;buy an HR product, you do not need us for this&rdquo;.</p>` },
  ],
  faqs: [
    { q: 'What is an HRIS?', a: 'A human resources information system: the system of record for people data. Contracts and rates, absence and holiday, right-to-work evidence and expiry, training and certification, documents, appraisals and leavers. It should feed payroll and your operational system rather than replace either.' },
    { q: 'What is the difference between HRIS, HCM and HRMS?', a: 'HRIS is the people record. HCM adds the talent layer: recruitment, onboarding, performance, succession, learning. HRMS usually means HRIS plus payroll in one product. Vendors use all three loosely, so ask which records it holds and how it talks to your payroll instead of comparing labels.' },
    { q: 'Is HR software the same as payroll software?', a: 'No. HR software holds the person; payroll software calculates pay and files RTI to HMRC under its own recognition. Some products do both, but the filing should always sit in software licensed and updated for it, with a person approving the run.' },
    { q: 'How many employees before we need an HRIS?', a: 'There is no threshold, only symptoms. Under about fifteen salaried people with one person who knows everybody, a good spreadsheet is fine. Move when a holiday balance cannot be settled from the record, a right-to-work document expires unnoticed, or you cannot say who holds a current certificate.' },
    { q: 'What should a UK HR system definitely handle?', a: 'Right-to-work evidence with expiry monitoring, UK GDPR retention and role-based access with an audit trail, holiday for irregular-hours and part-year workers, statutory absence records, and a clean starter handover to payroll and auto-enrolment. Ask to see the expiry report and the deletion settings in the demo.' },
  ],
  cta: ERP_CTA,
},
];
