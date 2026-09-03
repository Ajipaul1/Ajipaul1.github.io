'use strict';
// Strengthen the existing ERP explainer for the US question cluster it already targets:
// "what does erp stand for" (8.1k/mo), "what erp does" (9.9k), "erp in accounting" (~1k), "erp in supply chain" (~1k).
// Adds four H2 sections before the CTA box + a matching FAQPage schema. Idempotent.
const L = require('./lib.js');
const rel = 'blog/what-is-erp-software-plain-english.html';
let s = L.read(rel);
if (s.includes('id="what-does-erp-stand-for"')) { console.log('already updated'); process.exit(0); }

const faqs = [
  { q: 'What does ERP stand for?', a: 'ERP stands for enterprise resource planning: software that runs a company’s core operations &mdash; inventory, orders, purchasing, production, finance and people &mdash; on one shared database, so a change in one area updates every other area automatically.' },
  { q: 'What does an ERP system actually do?', a: 'It records every operational transaction once and uses it everywhere: an order reduces stock, creates a pick list, posts revenue, updates the customer record and feeds the reorder calculation without anyone re-typing it. It replaces spreadsheets and disconnected tools with one system of record.' },
  { q: 'What is ERP in accounting?', a: 'In accounting, ERP means the operational transactions &mdash; sales, purchases, inventory movements, payroll costs &mdash; flow into the ledger automatically instead of being keyed in from other systems, so the books are always current and month-end closing takes days instead of weeks.' },
  { q: 'What is ERP in supply chain management?', a: 'In supply chain terms, ERP connects demand (orders and forecasts) to supply (stock, purchase orders, production) in one place, so purchasing is driven by real requirements and lead times rather than guesswork, and stock-outs and overstock both fall.' },
];

const add = `
        <h2 id="what-does-erp-stand-for">What Does ERP Stand For?</h2>
        <p><strong>ERP stands for enterprise resource planning.</strong> The name is a 1990s artifact: it grew out of MRP (material requirements planning) software for factories, expanded to cover the whole "enterprise," and kept the word "planning" even though most of what the software does is record-keeping and automation. Ignore the name and remember the idea: one shared database for the operations of the business. "ERP software," "an ERP system" and "an ERP" all mean the same thing in everyday use.</p>

        <h2>What Does an ERP System Actually Do, Day to Day?</h2>
        <p>Follow one order. A customer places it online; the ERP checks stock at the nearest warehouse and reserves it; a pick list appears on a tablet in that warehouse; the shipment is confirmed and an invoice goes out automatically; revenue posts to accounting; the customer record shows the order and its status; and the reorder calculation notices the stock is now below its threshold and suggests a purchase order to the supplier with the shortest lead time. Six departments, one transaction, nothing re-typed. Multiply that by every order, purchase and production run and you have the day-to-day value of an ERP: the business runs on one set of facts.</p>

        <h2>ERP in Accounting</h2>
        <p>Accounting is where ERP was first felt in most companies, and it is still the clearest example. Without ERP, the bookkeeper re-keys sales from the order system, bills from email, inventory adjustments from a spreadsheet and payroll from another tool &mdash; then spends the first two weeks of every month reconciling the differences. With ERP, those transactions post to the ledger as they happen, so accounts receivable, payables, cost of goods sold and margins are current every day, and the month-end close becomes a review rather than a reconstruction. Small businesses usually keep their accounting software (QuickBooks, Xero) as the general ledger and let the ERP feed it; the ERP holds the operational detail, the accounting system holds the books.</p>

        <h2>ERP in Supply Chain Management</h2>
        <p>In supply chain terms, ERP is the link between demand and supply. Orders and forecasts on one side; stock on hand, open purchase orders and production capacity on the other. The system nets them &mdash; what we need, minus what we have and have coming &mdash; and turns the result into purchase suggestions with supplier lead times and, for manufacturers, production orders (that calculation is MRP, which lives inside the ERP). The practical outcome is fewer stock-outs of the cheap part that halts the expensive order, less cash tied up in slow stock, and purchasing decisions based on numbers rather than a buyer’s memory. For how this looks in a factory, see <a href="/blog/manufacturing-erp-small-manufacturers.html">manufacturing ERP for small manufacturers</a>; for other industries, <a href="/blog/erp-system-examples.html">ERP system examples by business type</a>.</p>

        <h2>Frequently Asked Questions</h2>
${faqs.map(f => `        <h3>${f.q}</h3>\n        <p>${f.a}</p>`).join('\n')}

`;
const marker = '        <div class="article-cta-box">';
L.must(s, marker, 1);
s = s.replace(marker, add + marker);
// FAQPage schema into the head (after the Article schema block)
s = s.replace(/(\n\s*<\/head>)/, '\n' + L.faqSchema(faqs) + '$1');
L.must(s, '"@type": "FAQPage"', 1);
// keep dateModified honest
s = s.replace(/"dateModified": "\d{4}-\d{2}-\d{2}"/, '"dateModified": "2026-09-03"');
L.write(rel, s);
