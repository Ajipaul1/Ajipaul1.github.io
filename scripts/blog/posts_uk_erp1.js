'use strict';
// UK blog wave 1, posts 1-4 (ai_context/PLAN-UK section 3). Every post owns one keyword cluster from the
// owner's SEMrush exports so nothing is dropped, uses UK spelling and UK stack references, links up to
// /uk/erp/, and follows the copy rules in PLAN-UK 6c: no price we charge, no single-engineer promise,
// third-party market figures kept and attributed.
//   1 manufacturing erp software 880/KD15 + erp solutions for manufacturing 720/22 + erp for
//     manufacturing industry 320/21 + erp for manufacturing 320/17 + manufacturing erp program 320/22
//     + enterprise resource planning for manufacturing 260/23  (~2,500/mo)
//   2 erp for small business 480/27 + erp software for small business 390/28 + small business erp 320/22
//     + erp systems for small companies 210/23 + erp for small companies 140/22
//     + enterprise resource planning software for small business 260/23  (~1,800/mo)
//   3 erp implementation 1,000/22 + erp implementation services 140/11 + erp implementation partner
//     110/5 + how much does it cost to implement an erp system 90/0 + can you capitalize erp
//     implementation costs 70/0  (~1,400/mo)
//   4 what is mrp 480/33 + what is wms 390/32 + what is warehouse management system wms 320/35
//     + what is warehouse management 320/29  (~1,500/mo)
const D = '2026-09-04';
const ERP_CTA = { h3: 'Weighing up ERP for your own business?', p: 'Book a free strategy call. We walk one real order through your business with you and tell you honestly whether custom, cloud or off-the-shelf fits &mdash; including when the answer is &ldquo;not yet&rdquo;.' };

module.exports = [
// ------------------------------------------------------------------ 1. Manufacturing ERP (UK)
{
  slug: 'manufacturing-erp-software-uk', cat: 'erp', date: D,
  title: 'Manufacturing ERP Software in the UK: What It Should Actually Do | TechAuditPros',
  desc: 'Manufacturing ERP adds the production layer generic ERP leaves out: bills of materials, works orders, MRP, shop-floor status, traceability and true cost of goods. Here is what to look for, what UK systems cost, and how to choose.',
  eyebrow: 'Manufacturing ERP',
  h1: 'Manufacturing ERP Software in the UK: What It Should Actually Do',
  dek: 'Most ERP comparison sites list features. This one starts from the four questions a UK manufacturer needs software to answer &mdash; and works backwards to the modules that answer them.',
  lead: { img: 'uk-industrial-robot-arm-blue-factory.jpg', alt: 'A production cell on a UK manufacturing floor, the layer generic ERP leaves out' },
  takeaways: [
    '<strong>Manufacturing ERP</strong> is generic ERP plus the production layer: bills of materials, works orders and routing, MRP planning, shop-floor status, WIP and scrap, lot or batch traceability, and true cost of goods manufactured.',
    'The four questions worth buying software for: what stock do we really hold, can we promise this date, what did that job actually cost, and can we prove traceability on demand.',
    'Published UK list prices sit around &pound;74&ndash;&pound;112 per user per month before implementation, with Sage 200 from about &pound;374 a month; independent UK research puts realistic all-in cost at &pound;15,000&ndash;&pound;60,000 a year.',
    'Your production methodology &mdash; discrete, process, job shop, make-to-order, engineer-to-order &mdash; matters more to fit than any feature list.',
  ],
  intro: '<strong>Manufacturing ERP software</strong> is an enterprise resource planning system that includes the production layer generic ERP leaves out: bills of materials, works orders and routing, material requirements planning against real stock and lead times, shop-floor status, work in progress and scrap, lot or batch traceability, and the true cost of a job when it closes. If you make, assemble, machine or blend anything, that layer is where the money leaks &mdash; and it is the part a finance-first system will not give you.',
  sections: [
    { h2: 'The Four Questions Worth Buying Software For', html: `
<p>Feature lists are how ERP gets sold and not how it gets chosen. Every manufacturer we have walked through this ends up with the same four questions, and a system either answers them or it does not.</p>
<ul>
<li><strong>What stock do we actually hold?</strong> Not the spreadsheet figure, not the count from last Friday &mdash; the live number per site, per bin, including what is committed to open works orders and what is out with a subcontractor.</li>
<li><strong>Can we promise this date?</strong> A real answer needs the bill of materials, current stock, supplier lead times and available capacity in the same place. Without that, every promise is a guess with a confident voice.</li>
<li><strong>What did that job actually cost?</strong> Material issued, hours booked, machine time, subcontract, scrap. Averages hide loss-makers; job-level truth exposes them.</li>
<li><strong>Can we prove it?</strong> Lot and serial traceability forwards and backwards, with the certificate or test result attached to the job rather than in a folder on somebody&rsquo;s desktop.</li>
</ul>
<div class="article-callout">If a demo cannot answer those four with your own data in front of you, the rest of the feature list is decoration. Ask to see them in that order.</div>`,
      figure: { img: 'uk-warehouse-racking-pallets-wide.jpg', alt: 'Pallet racking across a working warehouse', cap: 'Question one, made physical: what is really on those racks right now, per site and per bin, including what is committed to open works orders.' } },
    { h2: 'What the Production Layer Actually Contains', html: `
<p>These are the modules that separate manufacturing ERP from an accounting package with a stock table bolted on.</p>
<div class="article-table-wrap"><table>
<tr><th>Module</th><th>What it does</th><th>What it fixes</th></tr>
<tr><th>Bills of materials</th><td>Multi-level component and sub-assembly structures, with revisions</td><td>The &ldquo;which version did we build in March?&rdquo; argument</td></tr>
<tr><th>Routing &amp; operations</th><td>The sequence of operations, work centres and standard times</td><td>Promise dates based on capacity rather than optimism</td></tr>
<tr><th>MRP</th><td>Works out what to make or buy and when, from BOMs, stock and lead times</td><td>Shortages discovered on the line instead of in planning</td></tr>
<tr><th>Shop-floor booking</th><td>Labour, machine time, quantities and scrap captured where they happen</td><td>Costs reconstructed at month end from memory</td></tr>
<tr><th>WIP valuation</th><td>Work in progress valued at any date</td><td>The year-end question your accountant always asks</td></tr>
<tr><th>Traceability</th><td>Lot and serial genealogy, forwards and backwards</td><td>A recall or audit becoming a two-week project</td></tr>
<tr><th>Subcontract</th><td>Operations sent out and brought back, with cost and custody tracked</td><td>Stock that is &ldquo;missing&rdquo; because it is at the platers</td></tr>
</table></div>
<p>Not all of it is needed on day one. The sensible order is the one that stops the most expensive daily problem first &mdash; usually stock accuracy or works orders &mdash; and phases the rest as each piece goes into real use.</p>`,
      band: { img: 'uk-factory-orange-machines-line.jpg', alt: 'A line of production machines running inside a manufacturing plant', cap: 'This is the layer a finance-first system will not give you.' } },
    { h2: 'Your Production Methodology Decides the Fit', html: `
<p>This is the part comparison sites gloss over, and it predicts fit better than any feature matrix. The same core system behaves very differently depending on how you make things.</p>
<ul>
<li><strong>Discrete</strong> &mdash; countable units with BOMs and routings. Serial and lot tracking through build and despatch.</li>
<li><strong>Process and batch</strong> &mdash; formulas and recipes rather than BOMs, with yields, batch sizing, potency and full traceability. Food, drink, chemicals, cosmetics.</li>
<li><strong>Job shop</strong> &mdash; every job different: quoting from drawings, per-job routing, time capture, and true cost per job when it closes.</li>
<li><strong>Make to order</strong> &mdash; nothing built until the order lands, so demand-driven MRP and honest promise dates matter more than forecasting.</li>
<li><strong>Make to stock</strong> &mdash; forecast and reorder-point planning, safety stock by line, and finished-goods visibility.</li>
<li><strong>Assemble to order</strong> &mdash; configurable products from stocked sub-assemblies, which needs a product configurator that prices and validates as it quotes.</li>
<li><strong>Engineer to order</strong> &mdash; design work inside the order: revision control, engineering change orders, drawings against the job, progress billing.</li>
<li><strong>Lean and just in time</strong> &mdash; kanban signals, pull replenishment and supplier schedules for lines that cannot carry buffer stock.</li>
</ul>
<p>Most UK SMEs are a mix &mdash; a job shop with a make-to-stock spares line, or a batch producer with an engineer-to-order side. That mix is exactly where configurable products start generating workarounds, and where a system built around your processes stops.</p>`,
      figures: [
        { img: 'uk-golden-bottle-caps-batch.jpg', alt: 'Bottle caps ready for a bottling batch', cap: 'Process and batch: a formula, a yield and a lot number.' },
        { img: 'uk-welding-seam-closeup.jpg', alt: 'A welder running a seam on steel', cap: 'Job shop: every job different, costed when it closes.' },
      ] },
    { h2: 'What It Costs in the UK', html: `
<p>Published figures, so you can compare rather than guess. These are third-party list prices as of September 2026 and vary by reseller and scope.</p>
<ul>
<li><strong>Per-user subscription ERP:</strong> Oracle NetSuite from about &pound;74 per user per month, Epicor Kinetic from about &pound;75, SAP Business One from about &pound;77, Microsoft Dynamics 365 from about &pound;82, Infor CloudSuite from about &pound;112 &mdash; all before implementation.</li>
<li><strong>Named-price UK products:</strong> Sage 200 from around &pound;374 a month; smaller UK manufacturing systems advertise from roughly &pound;99&ndash;&pound;220 a month.</li>
<li><strong>All-in reality:</strong> independent UK research puts total cost at roughly &pound;15,000&ndash;&pound;60,000 a year once implementation, support and the licences are counted.</li>
<li><strong>Implementation timelines:</strong> commonly three to six months for a small business and six to twelve for mid-market, before customisation.</li>
</ul>
<p>The licence is rarely what hurts. What hurts is per-seat growth &mdash; adding a second shift or a third site raises the bill every month &mdash; and change requests after go-live, which is where a configured product turns into a series of quotes.</p>` },
    { h2: 'The UK-Specific Parts Nobody Mentions', html: `
<p>Global comparison pages are written for a global audience. If you manufacture in Britain, these are not optional extras.</p>
<ul>
<li><strong>Making Tax Digital for VAT.</strong> Digital records kept from order through invoice, with the figures pushed to Xero, Sage or QuickBooks, which files to HMRC through its own recognised connection.</li>
<li><strong>UK GAAP (FRS 102).</strong> Stock valuation, WIP and revenue recognition structured so year-end comes out of the system rather than out of a spreadsheet rebuild.</li>
<li><strong>Post-Brexit customs.</strong> Commodity codes, country of origin, rules-of-origin evidence, duty and import VAT captured on the purchase and carried into landed cost.</li>
<li><strong>Workplace pensions.</strong> Auto-enrolment contributions automated from time and job costing rather than re-keyed into payroll each period.</li>
<li><strong>SECR.</strong> Energy and carbon figures captured against sites and production where the reporting duty applies.</li>
</ul>
<div class="article-callout">Ask any shortlisted vendor to show you the VAT audit trail from a works order to a filed return. It is a five-minute question that tells you how much UK thinking went into the product.</div>`,
      figure: { img: 'uk-shipping-containers-port-sunset.jpg', alt: 'Containers and a lorry at a working port at sunset', cap: 'Post-Brexit, the commodity code, country of origin and import VAT belong on the purchase &mdash; and in landed cost &mdash; not in an email thread.' } },
    { h2: 'Custom or Off the Shelf?', html: `
<p>Honestly: off the shelf wins when your processes are standard and your headcount is stable. A subscription product is faster to start, someone else maintains it, and the community around it is large.</p>
<p>Custom wins in three situations. When your process <em>is</em> the reason you are still on spreadsheets &mdash; the subcontract loop, the odd costing rule, the way your customers order &mdash; and configuration keeps producing workarounds. When per-seat pricing is climbing faster than the business, because every shift added is another monthly charge. And when the ERP has to work with the website and the search side, so live stock or lead times can appear publicly without a fragile integration in the middle.</p>
<p>We build the custom side &mdash; see <a href="/uk/erp/">custom ERP for UK businesses</a> for how that runs, and <a href="/uk/manchester/">ERP for Manchester manufacturers</a> for the subcontract-heavy version of it. If your answer is off the shelf, that is a fine answer and we will say so on the call.</p>`,
      figure: { img: 'uk-two-developers-monitors-bright-office.jpg', alt: 'Two developers reviewing a build at their monitors', cap: 'The custom answer only earns its place when configuration keeps producing workarounds &mdash; not because building is more interesting.' } },
  ],
  faqs: [
    { q: 'What is the difference between manufacturing ERP and generic ERP?', a: 'Generic ERP handles finance, purchasing, stock and sales. Manufacturing ERP adds the production layer: bills of materials, works orders and routing, MRP planning, shop-floor booking, WIP and scrap, lot traceability and true cost of goods manufactured. If you make anything, that layer is where the margin is won or lost.' },
    { q: 'How much does manufacturing ERP cost in the UK?', a: 'Published per-user list prices sit around &pound;74&ndash;&pound;112 a month before implementation, Sage 200 starts near &pound;374 a month, and independent UK research puts realistic all-in cost at &pound;15,000&ndash;&pound;60,000 a year once implementation and support are included. Per-seat growth and post-launch change requests are usually the bigger number, not the licence.' },
    { q: 'Do we need MRP or is stock control enough?', a: 'Stock control tells you what you have. MRP tells you what to make or buy and when, from your bills of materials, current stock and supplier lead times. If you are promising delivery dates on made-to-order work, you need MRP; if you only hold and ship finished goods, stock control may be enough.' },
    { q: 'How long does implementation take?', a: 'Published UK timelines are commonly three to six months for a small business and six to twelve for mid-market, before customisation. A phased build can have one useful module in real use within six to ten weeks, which is a better test of fit than any demo.' },
    { q: 'Will it work with Sage or Xero?', a: 'It should, and you should not have to replace them. Keep the accounting package your accountant trusts as the book of record, and let the ERP be the system of record for operations, feeding it clean figures through the official API. That also keeps MTD compliance where it already works.' },
  ],
  cta: ERP_CTA,
},

// ------------------------------------------------------------------ 2. ERP for small business (UK)
{
  slug: 'erp-for-small-business-uk', cat: 'erp', date: D,
  title: 'ERP for Small Business UK: When It Is Worth It (and When It Is Not) | TechAuditPros',
  desc: 'An honest guide to ERP for UK small businesses: the five signals you have outgrown spreadsheets, what per-user pricing really costs as you hire, the alternatives, and how to phase a rollout that pays for itself.',
  eyebrow: 'ERP for SMEs',
  h1: 'ERP for Small Business in the UK: When It Is Worth It, and When It Is Not',
  dek: 'Most ERP content assumes you have already decided to buy. This one starts with the case for not buying &mdash; then shows what changes when the numbers actually justify it.',
  lead: { img: 'blog-owner-in-coffee-shop.jpg', alt: 'A small business owner standing in her own premises' },
  takeaways: [
    'The five signals that matter: the same data typed into two systems, stock nobody trusts, a month-end that takes a week, one person who is the only one who knows, and quoting that guesses.',
    'If none of those apply, keep your money. Xero or Sage plus one good tool beats a system nobody has time to adopt.',
    'Per-user pricing is the trap for growing SMEs: at published UK rates of &pound;74&ndash;&pound;112 per user per month, going from 8 to 25 staff can triple the bill without adding a single feature.',
    'Phase it. One module in real use inside six to ten weeks tells you more than any demo or reference call.',
  ],
  intro: '<strong>ERP for a small business</strong> means one system of record for stock, orders, purchasing and finance instead of a spreadsheet for each. For UK SMEs the honest answer is that it is worth it later than the vendors say and earlier than most owners think &mdash; and the deciding factor is almost never the software. It is whether the same information is currently being typed in twice, and whether anyone can answer &ldquo;what did that job cost?&rdquo; without opening four files.',
  sections: [
    { h2: 'Five Signals You Have Outgrown Spreadsheets', html: `
<p>Not opinions &mdash; symptoms. Two or more of these and the maths usually works.</p>
<ul>
<li><strong>The same data goes into two systems.</strong> An order typed into the sales sheet, then into Xero, then into a courier portal. Every duplicate entry is a future discrepancy with a delivery date attached.</li>
<li><strong>Nobody trusts the stock figure.</strong> The number exists, and everybody checks the shelf anyway. That is not a stock problem, it is a system-of-record problem.</li>
<li><strong>Month end takes a week.</strong> If closing the month means reconstructing what happened from memory, email and three spreadsheets, you are paying for the missing system in salary rather than licence fees.</li>
<li><strong>One person is the system.</strong> When Dawn is on holiday, quoting slows down, because the pricing logic lives in her head and one workbook. That is a business risk, not an admin quirk.</li>
<li><strong>Quoting is guessing.</strong> If you cannot say what last quarter&rsquo;s equivalent job actually cost, you are pricing on hope and finding out afterwards.</li>
</ul>
<div class="article-callout">Count them honestly. Zero or one, and the right advice is to fix a process and buy nothing. Three or more, and the cost of the missing system is already on your payroll.</div>`,
      figures: [
        { img: 'uk-checking-figure-on-printout.jpg', alt: 'Checking a figure on a printout away from the screen', cap: 'Signal one: the number exists on a screen, and it still gets checked on paper.' },
        { img: 'blog-operative-carrying-box.jpg', alt: 'Two warehouse staff checking a printed list against stock', cap: 'Signal two: nobody trusts the stock figure, so everybody walks to the shelf.' },
      ] },
    { h2: 'The Per-User Trap', html: `
<p>This is the part that catches growing UK SMEs, and it is arithmetic rather than opinion. Published UK list prices for subscription ERP run about &pound;74&ndash;&pound;112 per user per month before implementation.</p>
<div class="article-table-wrap"><table>
<tr><th>Headcount needing access</th><th>At &pound;80 per user/month</th><th>Per year</th></tr>
<tr><th>8 users</th><td>&pound;640</td><td>&pound;7,680</td></tr>
<tr><th>15 users</th><td>one agreed monthly fee</td><td>&pound;14,400</td></tr>
<tr><th>25 users</th><td>&pound;2,000</td><td>&pound;24,000</td></tr>
<tr><th>40 users</th><td>&pound;3,200</td><td>&pound;38,400</td></tr>
</table></div>
<p>Nothing was added between those rows except people. Independent UK research puts realistic all-in cost at &pound;15,000&ndash;&pound;60,000 a year once implementation and support are counted, and estimates for a 10&ndash;20 user cloud rollout commonly land at &pound;1,000&ndash;&pound;3,000 a month.</p>
<p>Two consequences worth planning for. First, businesses ration logins to control cost, which quietly defeats the purpose &mdash; the warehouse operative who cannot see the system goes back to paper. Second, seasonal or shift-based growth becomes a budget conversation instead of an operational one.</p>`,
      band: { img: 'uk-group-meeting-discussion.jpg', alt: 'A management meeting reviewing costs', cap: 'Nothing was added between those rows except people.' } },
    { h2: 'The Alternatives, Fairly Stated', html: `
<div class="article-table-wrap"><table>
<tr><th>Option</th><th>Where it wins</th><th>Where it fails</th></tr>
<tr><th>Xero or Sage plus one good tool</th><td>Under about eight people, one simple sales process, standard stock</td><td>The moment two tools need the same data and neither is the master</td></tr>
<tr><th>Subscription ERP</th><td>Standard processes, stable headcount, fast start</td><td>Per-seat growth; edge cases become workarounds; changes wait for the vendor roadmap</td></tr>
<tr><th>Industry-specific product</th><td>A genuinely close sector match, especially in regulated trades</td><td>Small ecosystems, thin integrations, and the fit ends where your differences begin</td></tr>
<tr><th>Custom build</th><td>Non-standard process, rising per-seat cost, ERP that must talk to your site</td><td>Slower than signing up for a product; needs a partner who will still be there in month nine</td></tr>
</table></div>
<p>Note what is not on that list: doing nothing while growing. That is the option that costs the most and never appears on an invoice.</p>`,
      figures: [
        { img: 'uk-shelves-of-binders-folders.jpg', alt: 'Shelves of binders and folders', cap: 'Doing nothing while growing is the option that never appears on an invoice.' },
        { img: 'uk-laptop-on-dark-desk-reporting.jpg', alt: 'A laptop open on a desk showing an operational report', cap: 'And the one it is usually compared against.' },
      ] },
    { h2: 'How to Phase It So It Pays for Itself', html: `
<p>The failure pattern for SMEs is a big-bang launch that lands on a team with no capacity to absorb it. The alternative is deliberately boring.</p>
<ul>
<li><strong>Weeks 1&ndash;2: follow one order.</strong> Enquiry to invoice, with the people who do it, writing down every workaround in their words. This is the audit, and it decides the order of everything else.</li>
<li><strong>Weeks 3&ndash;10: one module, live.</strong> Whichever hurts most &mdash; usually stock or orders. On your real data, used by your real team, not a sandbox.</li>
<li><strong>Months 3&ndash;9: the rest, in phases.</strong> Purchasing, costing, finance sync, reporting &mdash; each in genuine use before the next begins.</li>
<li><strong>Throughout: keep the accounting package.</strong> Xero or Sage stays the book of record; the ERP feeds it. Nobody has to relearn the accounts.</li>
</ul>
<p>The test after each phase is the same: did anyone stop using a spreadsheet? If not, the module has not landed, and adding another will not help.</p>`,
      figure: { img: 'uk-two-colleagues-whiteboard-sticky-notes.jpg', alt: 'Two colleagues mapping a process on a whiteboard with sticky notes', cap: 'Weeks one and two: one order followed end to end, on a wall, with the people who do it.' } },
    { h2: 'What to Ask Before You Sign Anything', html: `
<ul>
<li>What is the total for year one, including implementation, and for year three at our expected headcount?</li>
<li>Who does the work &mdash; your team or a partner &mdash; and what is the day rate after go-live?</li>
<li>Show me our VAT trail from order to filed return, and our year-end stock and WIP figures coming out of the system.</li>
<li>What happens to our spreadsheet and Xero history? Migrated and reconciled, or left behind?</li>
<li>If we grow from 12 to 30 people, what changes on the invoice?</li>
<li>Can we leave? What do we take with us, and in what format?</li>
</ul>
<p>If you want a second opinion on the answers, that is what our <a href="/uk/erp/">UK ERP page</a> exists for &mdash; and the call ends with an honest recommendation even when it is &ldquo;stay on Xero for another year&rdquo;.</p>`,
      figure: { img: 'blog-two-staff-behind-counter.jpg', alt: 'Two staff working behind the counter of a small business', cap: 'Ask for year one and year three at your expected headcount. The monthly headline is the least useful number in the quote.' } },
  ],
  faqs: [
    { q: 'How small is too small for ERP?', a: 'There is no headcount threshold, only symptoms. A five-person distributor duplicating every order into three systems needs one more than a twenty-person consultancy with a clean process. Count the five signals: duplicate entry, untrusted stock, week-long month end, single points of knowledge, and guesswork quoting.' },
    { q: 'What does ERP cost for a UK small business?', a: 'Published per-user list prices are about &pound;74&ndash;&pound;112 a month before implementation, and estimates for a 10&ndash;20 user cloud rollout commonly reach &pound;1,000&ndash;&pound;3,000 a month all-in. Independent UK research puts total annual cost at &pound;15,000&ndash;&pound;60,000. Ask for year one and year three at your expected headcount, not the monthly headline.' },
    { q: 'Do we have to replace Xero or Sage?', a: 'No, and usually you should not. Keep it as the book of record for accounts and let the ERP be the system of record for operations, syncing through the official API. Your accountant stays on software they trust and your MTD compliance stays where it already works.' },
    { q: 'Is custom ERP realistic for a small business?', a: 'Yes, once your process is the reason you are still on spreadsheets, or once per-seat pricing is rising faster than the business. If you are five people with one simple sales process, an off-the-shelf tool is still the better answer, and any honest supplier will tell you that.' },
    { q: 'What is the most common reason SME ERP projects fail?', a: 'Adoption, not software. A big-bang launch onto a team with no spare capacity, built from a questionnaire rather than from watching the work. Phasing one module into real use at a time, and checking whether a spreadsheet actually got retired, avoids most of it.' },
  ],
  cta: ERP_CTA,
},

// ------------------------------------------------------------------ 3. ERP implementation
{
  slug: 'erp-implementation-uk-guide', cat: 'erp', date: D,
  title: 'ERP Implementation: Steps, Timeline, Cost and Choosing a Partner | TechAuditPros',
  desc: 'A practical guide to ERP implementation for UK businesses: the seven phases, realistic timelines, what drives cost, how to pick an implementation partner, and the four failure modes that sink projects.',
  eyebrow: 'ERP Implementation',
  h1: 'ERP Implementation: The Steps, the Timeline, the Cost and the Partner',
  dek: 'Implementation is where ERP projects are won or lost, and almost none of it is about the software. Here is the sequence that works, what it realistically takes, and the questions that expose a weak partner.',
  lead: { img: 'uk-project-team-round-table.jpg', alt: 'A delivery team working through an implementation plan together' },
  takeaways: [
    'Seven phases: discovery, data model and prototype, build or configure, migrate and integrate, test with real work, go live, then run and evolve.',
    'Published UK timelines are commonly three to six months for a small business and six to twelve for mid-market before customisation; a phased build can have one module in real use in six to ten weeks.',
    'Cost is driven by data quality, integration count and decision speed &mdash; not by the number of features you licence.',
    'Four failure modes account for most disasters: dirty data, scope drift, non-adoption, and integrations discovered late.',
  ],
  intro: '<strong>ERP implementation</strong> is the work of getting a system from a signed contract into genuine daily use: mapping how the business actually runs, modelling the data, building or configuring, migrating history, integrating the tools you keep, training people by role, and cutting over without stopping the business. The software is rarely the hard part. The hard part is that implementation is an organisational change wearing a technical costume.',
  sections: [
    { h2: 'The Seven Phases, and What Each One Produces', html: `
<div class="article-table-wrap"><table>
<tr><th>Phase</th><th>What happens</th><th>What you should hold at the end</th></tr>
<tr><th>1. Discovery</th><td>Real data, exports and daily routines walked through with the people doing the work</td><td>A written map of the current process, in their words, with every workaround named</td></tr>
<tr><th>2. Model &amp; prototype</th><td>Data model and clickable screens before any production code</td><td>Something you clicked and approved, not a specification you skimmed</td></tr>
<tr><th>3. Build or configure</th><td>Two-week increments on a staging system</td><td>A working module you can open, on your own data</td></tr>
<tr><th>4. Migrate &amp; integrate</th><td>History imported and reconciled; live syncs switched on</td><td>Reconciliation reports proving the numbers match</td></tr>
<tr><th>5. Test with real work</th><td>Your team runs genuine transactions, not scripted demos</td><td>A defect list that is shrinking, and named owners</td></tr>
<tr><th>6. Go live</th><td>Cut-over plan, role-based training, parallel run where risk justifies it</td><td>A rollback plan you hope not to use</td></tr>
<tr><th>7. Run &amp; evolve</th><td>Monthly improvements from the team that built it</td><td>A written record of what shipped and what is next</td></tr>
</table></div>
<p>Phase one is the one most often shortened and the one that decides everything after it. A questionnaire is not discovery. Watching an order move through the business is.</p>`,
      figure: { img: 'uk-colleagues-collaborating-business-attire.jpg', alt: 'Colleagues working through a process on a whiteboard', cap: 'Phase one produces a written map of how the business actually runs, in the words of the people who run it. That document is the project.' } },
    { h2: 'Realistic Timelines', html: `
<p>Published UK figures for subscription ERP are commonly three to six months for a small business and six to twelve months for mid-market, before customisation. Larger multi-site programmes run longer.</p>
<p>Those numbers describe the whole system going live at once. A phased approach changes the shape rather than the total: one useful module in real use inside six to ten weeks, then the rest over roughly four to nine months, with each piece earning its keep before the next starts. The total effort is similar; the risk profile is completely different, because you learn whether the thing fits while it is still cheap to change.</p>
<div class="article-callout">Ask any partner this: &ldquo;What will be in genuine daily use eight weeks after we start?&rdquo; A confident, specific answer is the strongest signal you will get in a sales process.</div>`,
      band: { img: 'uk-plant-machines-running-wide.jpg', alt: 'Plant machinery running on a factory floor', cap: 'Phased or big-bang changes the shape of the risk, not the total effort.' } },
    { h2: 'What Actually Drives the Cost', html: `
<ul>
<li><strong>Data quality.</strong> Duplicate part numbers, wrong costs, stock that never matched. Cleaning is unglamorous, unavoidable, and the single biggest swing factor in an implementation quote.</li>
<li><strong>Integration count.</strong> Every system that must exchange data &mdash; accounting, e-commerce, payments, payroll, couriers, EDI &mdash; is a small project with its own failure modes.</li>
<li><strong>Decision speed.</strong> Projects are billed in elapsed time as well as effort. The businesses that finish quickly are the ones that can decide.</li>
<li><strong>Process change appetite.</strong> Every insistence that the software match an existing habit exactly is a customisation. Some are worth it; many are habit.</li>
<li><strong>Testing discipline.</strong> Skipping real-work testing does not save money, it moves the cost to the week after go-live at a worse exchange rate.</li>
</ul>
<p>On the accounting question: whether implementation costs can be capitalised depends on the nature of the spend and the standard you report under, and it is genuinely a question for your accountant rather than your software supplier. Configuration and training are commonly treated differently from development that creates an asset &mdash; get it confirmed in writing before the invoices start.</p>`,
      figures: [
        { img: 'uk-coloured-binders-on-shelf.jpg', alt: 'Rows of coloured binders on a shelf', cap: 'Data cleaning is the biggest swing factor in any implementation quote.' },
        { img: 'blog-calculator-beside-laptop.jpg', alt: 'A calculator on a desk beside a laptop', cap: 'And capitalisation is a question for your accountant, in writing, before the invoices start.' },
      ] },
    { h2: 'Choosing an Implementation Partner', html: `
<p>The product shortlist gets all the attention and the partner decides the outcome. Six questions that separate them:</p>
<ul>
<li><strong>Who is actually doing the work?</strong> Names and roles, not a capability statement. Are the people in the pitch the people in the project?</li>
<li><strong>Show me a discovery output.</strong> A redacted process map from a real client tells you more than any case study.</li>
<li><strong>What happens in month nine?</strong> Whoever answers this with a support-queue diagram is telling you the build team leaves.</li>
<li><strong>What is a change request?</strong> Ask for the day rate and the approval process in writing, before signing.</li>
<li><strong>Whose cloud account, whose code?</strong> If the answer is theirs, leaving later is a rebuild rather than a handover.</li>
<li><strong>What have you told a client not to buy?</strong> A partner who has never talked someone out of a module is selling, not advising.</li>
</ul>`,
      figure: { img: 'uk-engineers-working-large-machine.jpg', alt: 'Engineers working together on a production machine', cap: 'Ask who is actually doing the work, by name, and whether the people in the pitch are the people in the project.' } },
    { h2: 'The Four Failure Modes', html: `
<ul>
<li><strong>Dirty data.</strong> Migrate rubbish and you have a faster way to be wrong. Reconcile during migration and run old and new side by side before cut-over, not after.</li>
<li><strong>Scope drift.</strong> Phase one becomes everything. The defence is a defined outcome per phase, live on real data, before the next one opens.</li>
<li><strong>Nobody adopts it.</strong> A system built for the org chart rather than the job. The defence is your team testing every increment on their own data, so by go-live they are using something they shaped.</li>
<li><strong>Integrations discovered late.</strong> The surprise that blows timelines. Every integration should be proven against the live API during discovery, not assumed from a feature list.</li>
</ul>
<p>If you want the phased version of this run for you, our <a href="/uk/erp/">UK ERP build</a> works exactly this way, and the audit that comes out of phase one is yours whether or not you continue.</p>`,
      figure: { img: 'uk-worn-binders-dusty-shelf.jpg', alt: 'A row of worn binders on a dusty shelf', cap: 'Migrate rubbish and you have bought a faster way to be wrong. Reconcile during migration, and run old and new side by side before cut-over &mdash; not after.' } },
  ],
  faqs: [
    { q: 'How long does ERP implementation take?', a: 'Published UK timelines are commonly three to six months for a small business and six to twelve for mid-market, before customisation. A phased build puts one useful module into real use within six to ten weeks and rolls out the rest over roughly four to nine months, which lowers risk without changing the total effort much.' },
    { q: 'How much does ERP implementation cost?', a: 'It varies more with your data and integrations than with the software. The swing factors are data cleaning, the number of systems that must exchange data, how quickly you can make decisions, and how much process change you will accept. Ask for year-one total including implementation and the day rate for changes after go-live.' },
    { q: 'Can ERP implementation costs be capitalised?', a: 'It depends on the nature of the spend and the accounting standard you report under, and it is a question for your accountant rather than your supplier. Development that creates an asset is commonly treated differently from configuration and training. Get the treatment confirmed in writing before invoices start.' },
    { q: 'What is an ERP implementation partner?', a: 'The firm that does the discovery, configuration or build, migration, integration, training and cut-over. With subscription ERP the vendor sells the licence and a partner delivers the project, which is why partner selection matters as much as product selection.' },
    { q: 'Should we go big-bang or phased?', a: 'Phased, unless something forces a single cut-over. Phasing lets you discover misfit while it is still cheap to fix, gets value earlier, and gives the team capacity to absorb change. Big-bang concentrates all the risk on one weekend.' },
  ],
  cta: ERP_CTA,
},

// ------------------------------------------------------------------ 4. MRP vs ERP vs WMS
{
  slug: 'mrp-vs-erp-vs-wms', cat: 'erp', date: D,
  title: 'MRP vs ERP vs WMS: What Each One Does, in Plain English | TechAuditPros',
  desc: 'MRP plans what to make and buy, ERP is the system of record around it, and WMS runs the physical warehouse. Here is what each actually does, how they overlap, and which one you need first.',
  eyebrow: 'ERP Fundamentals',
  h1: 'MRP vs ERP vs WMS: What Each One Actually Does',
  dek: 'Three acronyms sold interchangeably, doing three different jobs. This is the plain-English version, plus the test for which one your business needs first.',
  lead: { img: 'uk-yellow-crates-stacked-floor.jpg', alt: 'Bin racking down a warehouse aisle, where planning meets the physical warehouse' },
  takeaways: [
    '<strong>MRP</strong> answers &ldquo;what should we make or buy, and when?&rdquo; from bills of materials, stock and lead times.',
    '<strong>ERP</strong> is the system of record around it: orders, purchasing, production, stock and finance in one place.',
    '<strong>WMS</strong> runs the physical warehouse: locations, directed picking, goods-in and stock accuracy.',
    'Most UK SMEs need ERP with MRP inside it. A separate WMS only pays for itself once the warehouse is big or complex enough to need directed picking.',
  ],
  intro: 'These three get sold as alternatives and they are not. <strong>MRP</strong> (material requirements planning) works out what to make or buy and when. <strong>ERP</strong> (enterprise resource planning) is the wider system of record that holds orders, purchasing, production, stock and finance together. <strong>WMS</strong> (warehouse management system) runs the physical warehouse: where things are, who picks them, in what order. Knowing which question you actually have is the difference between buying the right thing and buying the expensive thing.',
  sections: [
    { h2: 'What Each One Answers', html: `
<div class="article-table-wrap"><table>
<tr><th></th><th>MRP</th><th>ERP</th><th>WMS</th></tr>
<tr><th>The question it answers</th><td>What do we make or buy, and when?</td><td>What is really happening in the business?</td><td>Where is it, and who picks it next?</td></tr>
<tr><th>Core inputs</th><td>Bills of materials, stock, lead times, demand</td><td>Everything: orders, purchases, jobs, invoices</td><td>Locations, bins, tasks, scans</td></tr>
<tr><th>Typical users</th><td>Planners, buyers</td><td>Everyone, by role</td><td>Warehouse operatives and supervisors</td></tr>
<tr><th>Fails without</th><td>Accurate BOMs and lead times</td><td>One agreed system of record</td><td>Disciplined location data</td></tr>
<tr><th>Signature output</th><td>A works order and a purchase plan</td><td>A costed, traceable transaction history</td><td>A pick list and a stock-accuracy figure</td></tr>
</table></div>
<p>The overlap is real: most ERP systems include MRP, and many include basic warehouse functions. That is why the labels blur in sales conversations. The useful distinction is not the acronym, it is which of those three questions is costing you money this month.</p>`,
      figure: { img: 'blog-warehouse-boxes-wide.jpg', alt: 'A wide warehouse aisle stacked to the roof with boxed stock', cap: 'Three acronyms, one building. MRP decides what to make, ERP records what happened, WMS runs the aisle.' } },
    { h2: 'MRP, Concretely', html: `
<p>MRP takes what you have promised to deliver, explodes it through your bills of materials, subtracts what you already hold and what is already on order, applies supplier and production lead times, and tells you what to raise and when. Done well it turns &ldquo;can we hit that date?&rdquo; from an opinion into a calculation.</p>
<p>It fails in one predictable way: garbage BOMs and fictional lead times. If a component list is a version behind, or a supplier&rsquo;s stated lead time bears no relation to reality, MRP will confidently plan the wrong things. That is why the first phase of any planning project is unglamorous data work rather than software.</p>
<p>Related terms you will hear: <strong>MPS</strong> (master production schedule) sits above MRP and sets what to build at a higher level; <strong>MRP II</strong> extended the idea to capacity and finance and is, essentially, where ERP came from.</p>`,
      figure: { img: 'uk-fresh-pasta-commercial-kitchen.jpg', alt: 'Fresh pasta being made in a commercial production kitchen', cap: 'MRP explodes what you promised through the recipe or parts list. Get the recipe or the lead time wrong and it will plan the wrong things, confidently.' } },
    { h2: 'ERP, Concretely', html: `
<p>ERP is the ledger of operational truth. An order arrives once, becomes a works order, consumes stock, books labour, closes with a real cost, becomes an invoice, and lands in the accounts &mdash; all as one thread rather than five re-typings. Its value is not any single feature; it is that everybody is arguing over the same number.</p>
<p>For UK businesses it is also where the compliance layer sits: MTD-ready digital records from order to invoice, stock and WIP valuation your accountant can use at year end, and duty and origin data captured on the purchase if you import. See <a href="/uk/erp/">custom ERP for UK businesses</a> for how that gets built in practice.</p>`,
      band: { img: 'uk-harbour-cranes-row.jpg', alt: 'Cranes along a working harbour at dusk', cap: 'ERP is the ledger of operational truth.' } },
    { h2: 'WMS, Concretely', html: `
<p>A WMS is about physical movement. Bin and location management, put-away rules, directed and batch picking, wave planning, cycle counting, goods-in and despatch confirmation, usually with handheld scanners. The output that matters is stock accuracy and picks per hour.</p>
<p>The honest test for whether you need one: are your pickers walking the wrong route, picking the wrong bin, or unable to find stock that the system says exists? If yes, and the warehouse is large or fast enough for that to cost real money, a WMS earns its place. If your &ldquo;warehouse&rdquo; is a stockroom where everyone knows where everything is, warehouse functions inside your ERP will do, and a WMS is an expensive way to add process.</p>`,
      figures: [
        { img: 'blog-multi-layer-racking.jpg', alt: 'Multi-layer racking with location labels', cap: 'A WMS needs this: every location labelled, and the discipline to keep it true.' },
        { img: 'blog-shipping-boxes-label-printer.jpg', alt: 'Shipping boxes beside a label printer', cap: 'Its output is picks per hour and a stock-accuracy figure.' },
      ] },
    { h2: 'Which Do You Need First?', html: `
<ul>
<li><strong>You cannot promise dates reliably</strong> &rarr; you have an MRP problem. Fix BOMs and lead times, then plan properly.</li>
<li><strong>Everyone works from a different number</strong> &rarr; you have an ERP problem. One system of record first; planning improves as a side effect.</li>
<li><strong>Stock exists but cannot be found</strong> &rarr; you have a WMS problem, or a location-discipline problem masquerading as one.</li>
<li><strong>All three at once</strong> &rarr; start with the system of record. MRP without trustworthy data is theatre, and a WMS on top of a system nobody trusts just automates the confusion.</li>
</ul>
<p>For most UK SMEs the practical answer is ERP with MRP inside it, warehouse functions in the same system, and a separate WMS only if and when the warehouse outgrows that. Buying all three at once is how a sensible project becomes an eighteen-month programme.</p>`,
      figure: { img: 'blog-worker-beside-forklift.jpg', alt: 'A warehouse worker beside a forklift in a distribution unit', cap: 'Start with the system of record. MRP on data nobody trusts is theatre, and a WMS on top of it just automates the confusion.' } },
  ],
  faqs: [
    { q: 'What is MRP?', a: 'Material requirements planning: it works out what to make or buy and when, using your bills of materials, current stock, open orders, demand and lead times. Its answer is a works order and a purchase plan, and its accuracy depends entirely on the quality of your BOMs and lead times.' },
    { q: 'What is a WMS, and how is it different from stock control?', a: 'A warehouse management system runs the physical warehouse: bin locations, put-away rules, directed and batch picking, cycle counting, goods-in and despatch, usually with scanners. Stock control tells you how many you have; a WMS tells you exactly where it is and who should pick it next.' },
    { q: 'Is MRP part of ERP?', a: 'Usually yes. Most ERP systems include MRP, and MRP II &mdash; which extended planning to capacity and finance &mdash; is effectively where ERP came from. You rarely buy MRP as a standalone product today unless you are adding planning to a system that lacks it.' },
    { q: 'Do we need a separate WMS if we have ERP?', a: 'Only when the warehouse is big or complex enough to need directed picking, wave planning and tight location discipline. Below that, the warehouse functions inside a decent ERP are enough, and adding a WMS mostly adds process and integration work.' },
    { q: 'Which should a small manufacturer buy first?', a: 'The system of record. MRP built on data nobody trusts will plan the wrong things confidently, and a WMS layered over an unreliable system automates the confusion. Get one agreed source of truth for stock and orders working first, then improve planning.' },
  ],
  cta: ERP_CTA,
},
];
