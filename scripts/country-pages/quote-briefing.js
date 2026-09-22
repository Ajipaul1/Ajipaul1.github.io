'use strict';
/* quote-briefing.js — the markup and styling for the changes quote-structure.js wired up.
 *
 * Three insertions:
 *   - a preset strip above the line items, so a newcomer starts from something close to right
 *   - a briefing panel, closed by default, explaining the product in plain words
 *   - CSS for the group headings and the preset buttons
 *
 * The briefing is written for someone who has never sold software. It deliberately spends more
 * space on what NOT to promise than on what to sell: an over-promise made in a meeting becomes
 * work Aji has to do for free, and a new salesperson has no way of knowing where those edges are.
 *
 * Idempotent, guarded per block.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', 'quote', 'index.html');
let s = fs.readFileSync(FILE, 'utf8');
const before = s;

/* ------------------------------------------------------------------ the briefing + presets */

const PANEL = `
    <details class="brief" data-briefing="1">
      <summary>New here? Read this first &mdash; 3 minutes</summary>
      <div class="brief-in">

        <h3>What we sell</h3>
        <p>Three things, and a customer usually wants one of them:</p>
        <ul>
          <li><b>A custom ERP.</b> Software that runs the inside of a business &mdash; attendance,
            stock, purchase approvals, job cards, invoices. It replaces the registers, the
            spreadsheets and the WhatsApp groups a company is using now.</li>
          <li><b>A website.</b> How customers find them and decide to call.</li>
          <li><b>SEO.</b> Work that makes their website appear on Google, and now inside AI
            answers like ChatGPT and Gemini too.</li>
        </ul>

        <h3>What an ERP actually is, in one example</h3>
        <p>A marine engineering company in Kochi uses ours every working day. Their supervisor
          opens his phone and marks who came to work. The store keeper enters what stock went out.
          A purchase request goes to the manager, then to the owner, and only then to the supplier.
          The owner opens one screen and sees all of it. Fifteen people, every day, since July.</p>
        <p>That is the whole pitch. It is real, it is running, and you can show it.</p>

        <h3>How to use this page</h3>
        <ol>
          <li>Pick what they want at the top &mdash; ERP, SEO or Website.</li>
          <li>Tap the button that sounds most like their business. The quantities fill in.</li>
          <li>Talk it through and change the numbers as they tell you more.</li>
          <li>Put their company name and your name in the two boxes.</li>
          <li>Download the PDF and send it.</li>
        </ol>
        <p>Every line has a grey sentence under it explaining what it is. If a customer asks what
          something means, read that sentence out. It is written for exactly that moment.</p>

        <h3>Never promise these</h3>
        <ul>
          <li><b>A date.</b> Say &ldquo;Aji will confirm the timeline&rdquo;. A date promised in a
            meeting becomes a date we owe.</li>
          <li><b>A discount.</b> If the price is too much, do not lower it &mdash; take something
            out. &ldquo;We could start with four modules instead of seven and add the rest later.&rdquo;</li>
          <li><b>A Google ranking.</b> Nobody can promise position one. Anyone who does is lying,
            and saying so out loud is usually why we get the work.</li>
          <li><b>Anything not on this page.</b> If they ask for something you cannot see here, write
            it down and say you will check. That is a good answer, not a weak one.</li>
        </ul>

        <h3>When you do not know</h3>
        <p>Say: <i>&ldquo;That is a good question and I want to give you the right answer rather than
          a quick one. Let me check with our engineer and come back to you today.&rdquo;</i></p>
        <p>Then send it to Aji. Guessing in front of a customer costs far more than waiting an hour.</p>

        <h3>Words customers use</h3>
        <dl class="gloss">
          <dt>Module</dt><dd>One job the system does &mdash; attendance is a module, purchasing is a module.</dd>
          <dt>Portal</dt><dd>What one kind of person sees when they log in. The owner's portal shows everything; the store keeper's shows stock.</dd>
          <dt>Dashboard</dt><dd>One screen with the important numbers on it.</dd>
          <dt>SEO</dt><dd>Work that makes a website show up on Google without paying for ads.</dd>
          <dt>AEO / GEO</dt><dd>The same idea for AI answers &mdash; getting quoted by ChatGPT, Gemini and Google's AI results.</dd>
          <dt>Core Web Vitals</dt><dd>Google's measure of whether a page loads fast enough. Slow pages rank lower.</dd>
          <dt>Schema</dt><dd>Hidden labels on a page that tell Google what the business is. It is what makes a listing show stars and details.</dd>
          <dt>Domain / SSL</dt><dd>The web address, and the certificate that puts the padlock in the browser.</dd>
          <dt>Retainer</dt><dd>A monthly fee for ongoing work, rather than a one-time project.</dd>
        </dl>

      </div>
    </details>

    <div class="presetbar">
      <span class="plab">Start from a business like theirs</span>
      <div id="presets"></div>
    </div>
`;

const PICK_END = `    </div>

    <div class="block">`;
if (!s.includes('data-briefing="1"') && s.includes(PICK_END)) {
  s = s.replace(PICK_END, '    </div>\n' + PANEL + '\n    <div class="block">');
}

/* ------------------------------------------------------------------ styling */

const CSS = `
/* quote-briefing.js */
.brief{margin:18px 0;border:1px solid var(--line,#e2e5ea);border-radius:10px;background:#fbfcfd}
.brief>summary{cursor:pointer;padding:13px 16px;font-weight:600;font-size:15px;list-style:none}
.brief>summary::-webkit-details-marker{display:none}
.brief>summary::before{content:'\\25B8 ';display:inline-block;transition:transform .15s}
.brief[open]>summary::before{transform:rotate(90deg)}
.brief-in{padding:2px 18px 18px;max-width:72ch;font-size:14.5px;line-height:1.62}
.brief-in h3{font-size:14px;letter-spacing:.04em;text-transform:uppercase;margin:22px 0 7px;color:#4a5361}
.brief-in ul,.brief-in ol{padding-left:20px;margin:8px 0}
.brief-in li{margin:6px 0}
.brief-in p{margin:8px 0}
.gloss{margin:8px 0 0;display:grid;grid-template-columns:auto 1fr;gap:5px 14px;align-items:baseline}
.gloss dt{font-weight:600;white-space:nowrap}
.gloss dd{margin:0;color:#4a5361}
@media(max-width:560px){.gloss{grid-template-columns:1fr;gap:1px 0}.gloss dd{margin:0 0 9px}}

.presetbar{margin:0 0 14px}
.plab{display:block;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:#6b7480;margin-bottom:7px}
#presets{display:flex;flex-wrap:wrap;gap:8px}
.preset{border:1px solid var(--line,#d8dde4);background:#fff;border-radius:999px;padding:8px 15px;
  font:inherit;font-size:13.5px;cursor:pointer;transition:background .12s,border-color .12s}
.preset:hover{background:#f1f5f9;border-color:#9aa5b4}
.preset:active{background:#e6ecf3}

.grouphead{grid-column:1/-1;margin:20px 0 3px;padding-top:13px;border-top:1px solid var(--line,#e8ebef);
  font-size:12.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#5a6472}
.grouphead:first-child{margin-top:2px;padding-top:0;border-top:0}
`;

if (!s.includes('/* quote-briefing.js */')) {
  const i = s.lastIndexOf('</style>');
  if (i > -1) s = s.slice(0, i) + CSS + '\n' + s.slice(i);
}

fs.writeFileSync(FILE, s);
console.log('briefing panel : ' + (s.includes('data-briefing="1"') ? 'in' : 'MISSING'));
console.log('preset host    : ' + (s.includes('id="presets"') ? 'in' : 'MISSING'));
console.log('css            : ' + (s.includes('/* quote-briefing.js */') ? 'in' : 'MISSING'));
console.log(before === s ? 'NO CHANGE (already applied)' : 'changed');
