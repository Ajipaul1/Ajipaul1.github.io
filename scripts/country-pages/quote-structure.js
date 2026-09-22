'use strict';
/* quote-structure.js — make /quote/ usable by someone who has never sold this before.
 *
 * Aji has taken on a salesperson with no technical background. The page as it stood assumed the
 * operator already knew the catalogue: three flat lists of line items, a quantity box beside each,
 * and no indication of which ones a given customer actually needs. Someone who does not know what
 * a "module" is cannot tell whether a fabrication workshop needs four of them or fourteen, and a
 * quote built by guessing is worse than no quote — it either loses the job or commits Aji to work
 * he did not price.
 *
 * Three additions, in order of how much they help a newcomer:
 *
 *   1. PRESETS. One tap fills sensible quantities for a recognisable kind of customer — a
 *      workshop, a contractor, a small office. She starts from something close to right and
 *      adjusts, rather than starting from zero and inventing. This is the single change that
 *      makes the page usable on day one.
 *
 *   2. GROUP HEADINGS. The rows are the same rows, gathered under headings that say what that
 *      part of the quote is for. "Step 2 — who logs in" means something to a reader; six
 *      undifferentiated rows do not.
 *
 *   3. A BRIEFING PANEL, collapsed by default so it does not get in the way of someone who
 *      already knows the product. It explains in plain words what the company sells, what an ERP
 *      actually is, and — the part that protects Aji — what must never be promised in a meeting.
 *
 * Idempotent: guarded on a marker, so re-running after a change of wording is just another run.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', 'quote', 'index.html');
const MARKER = 'data-briefing="1"';

let s = fs.readFileSync(FILE, 'utf8');
const before = s;

/* ---------------------------------------------------------------- 1. group headings */

/* Each row gains a grp. drawRows prints the heading when it changes, so the order of the rows
 * array is what groups them — no second list to keep in step. */
const GROUPS = [
  ["{ id:'plan',", "Step 1 \\u2014 design"],
  ["{ id:'dash',", "Step 2 \\u2014 who logs in"],
  ["{ id:'mod',", "Step 3 \\u2014 what the system does"],
  ["{ id:'qa',", "Step 4 \\u2014 before it goes live"],

  ["{ id:'audit',", "Foundation \\u2014 do these first"],
  ["{ id:'aeo',", "Being found inside AI answers"],
  ["{ id:'content',", "Ongoing, every month"],

  ["{ id:'land',", "The website itself \\u2014 pick ONE"],
  ["{ id:'extra',", "Add to it"],
  ["{ id:'mail',", "Setup and technical"],
];

let grouped = 0;
for (const [anchor, label] of GROUPS) {
  if (!s.includes(anchor)) { console.log('  ANCHOR MISSING: ' + anchor); continue; }
  if (s.includes(anchor + " grp:'")) continue;
  s = s.replace(anchor, anchor + " grp:'" + label + "',");
  grouped++;
}

/* Print a heading row whenever the group changes. Inserted at the top of the forEach that builds
 * each row, so it needs no separate pass over the data. */
const ROW_START = `    svc.rows.forEach(function (r) {
      var row = document.createElement('div');`;
const ROW_START_NEW = `    var lastGrp = null;
    svc.rows.forEach(function (r) {
      if (r.grp && r.grp !== lastGrp) {
        lastGrp = r.grp;
        var gh = document.createElement('div');
        gh.className = 'grouphead';
        gh.textContent = r.grp;
        host.appendChild(gh);
      }
      var row = document.createElement('div');`;
if (s.includes(ROW_START) && !s.includes('grouphead')) {
  s = s.replace(ROW_START, ROW_START_NEW);
}

/* ---------------------------------------------------------------- 2. presets */

const PRESETS = `
  /* What a recognisable customer usually needs. Not a package and not a discount — just a
     starting point, so nobody has to invent quantities in front of a client. */
  var PRESETS = {
    erp: [
      { nm:'Workshop / fabrication', q:{ plan:1, dash:4, mod:5, add:1, rep:4, qa:1 } },
      { nm:'Contractor / site work', q:{ plan:1, dash:5, mod:7, add:2, rep:5, qa:1 } },
      { nm:'Office / trading',       q:{ plan:1, dash:3, mod:4, add:1, rep:3, qa:1 } },
      { nm:'Full system',            q:{ plan:1, dash:8, mod:12, add:5, rep:8, qa:1 } }
    ],
    seo: [
      { nm:'Just starting',        q:{ audit:1, onpage:5,  local:1, report:1 } },
      { nm:'Serious about Google', q:{ audit:1, onpage:15, local:1, aeo:1, content:4, report:1 } },
      { nm:'Full, with AI search', q:{ audit:1, onpage:25, local:1, aeo:1, geo:1, content:8, links:1, report:1 } }
    ],
    web: [
      { nm:'Small business',    q:{ s5:1, logo:1, mail:1, dns:1 } },
      { nm:'Growing business',  q:{ s10:1, copy:10, logo:1, mail:1, dns:1, speed:1 } },
      { nm:'Online shop',       q:{ shop:1, copy:10, logo:1, mail:1, dns:1 } }
    ]
  };

  function applyPreset(p) {
    var svc = SERVICES[cur];
    svc.rows.forEach(function (r) {
      r.qty = p.q[r.id] || 0;
      /* Chips must agree with the number, or the proposal lists roles the total never charged for. */
      if (r.chips) r.sel = r.chips.slice(0, r.qty);
    });
    drawRows(); recalc();
  }

  function drawPresets() {
    var host = el('presets');
    if (!host) return;
    host.textContent = '';
    (PRESETS[cur] || []).forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'preset'; b.textContent = p.nm;
      b.addEventListener('click', function () { applyPreset(p); });
      host.appendChild(b);
    });
  }
`;

if (!s.includes('var PRESETS = {')) {
  s = s.replace('  function drawRows() {', PRESETS + '\n  function drawRows() {');
}

/* Presets must redraw when the service dropdown changes, and on first paint. */
s = s.replace(
  "el('svc').addEventListener('change', function () { cur = el('svc').value; drawRows(); recalc(); });",
  "el('svc').addEventListener('change', function () { cur = el('svc').value; drawRows(); drawPresets(); recalc(); });");
if (!/drawRows\(\); drawPresets\(\); recalc\(\);\s*$/m.test(s)) {
  s = s.replace(/(\n\s*)drawRows\(\); recalc\(\);(\s*\n)/, '$1drawRows(); drawPresets(); recalc();$2');
}

console.log('groups tagged      : ' + grouped);
console.log('presets added      : ' + (s.includes('var PRESETS = {') ? 'yes' : 'no'));
console.log('group headings     : ' + (s.includes('grouphead') ? 'yes' : 'no'));

fs.writeFileSync(FILE, s);
console.log('\nwrote ' + path.relative(path.join(__dirname, '..', '..'), FILE));
console.log(before === s ? 'NO CHANGE (already applied)' : 'changed');
