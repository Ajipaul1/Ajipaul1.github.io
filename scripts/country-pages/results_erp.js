'use strict';
// /results/viraat-marine-erp/ — the flagship case study: the shipyard ERP live at erp.viraatmarine.com.
//
// SKELETON: ca/erp/index.html (head, nav, footer, closing CTA, FAQ styles). Everything between the header
// and the closing CTA is replaced; the template hero and the tools marquee are removed. Run AFTER any
// nav_patch so the copied nav is current; results_nav.apply() is called here too (idempotent).
//
// WHAT RANKS (live Google, 2026-09-06, "custom ERP case study" / "ERP case study manufacturing" / "shipyard ERP"):
//   agency case-study pages of 150–1,500 words, anonymised clients, one or two metrics, no screenshots of a
//   real system, at most three FAQs; vendor pages of ~2,800 words with a feature list and a 9-question FAQ.
// WHAT THIS PAGE DOES ABOUT IT: a named, live system with a public sign-in page · redacted screenshots of
//   the real desks on desktop and phone · verifiable scale figures from the repository (desks, tables,
//   modules, commits, dates) · how a request actually travels · the engineering that makes the numbers
//   trustworthy · a real timeline · what the client keeps · 10 FAQs answered in the first sentence.
// RULES: real figures only (every number below is read from the ERP repository or its live screens);
//   no price of ours; no employee or counterparty named — screenshots are redacted before import; reveal
//   start states only under html.vm-on, which JS adds after the reduced-motion check (JS off = full page);
//   transform / opacity / clip-path / stroke-dashoffset only; nothing runs at rest but the closing band.
//
// SIGNATURE — "the hull takes shape": an SVG hull outline on which nineteen plates weld on one by one, a
//   spark at each seam, as the desks section is lit. Nowhere else on the site.
// PER-SECTION MOTION, each its own: hero = one 7s settle of the plate + rising title lines · brief = four
//   frames wipe in from their own corners · desks = the hull, then cards rise · screens = frames roll in
//   from the right like a reel · flow = a marker travels the approval track, stations pop as it passes ·
//   floor = three phones rise at offsets · truth = ledger rows stamp in · timeline = the line draws itself,
//   dots pop · next = movement-only drift on the wide plate (view timeline, @supports).
const fs = require('fs'); const path = require('path');
const L = require('./lib');
const NAV = require('./results_nav');

const URL = 'https://techauditpros.com/results/viraat-marine-erp/';
const HUB = 'https://techauditpros.com/results/';
const LIVE = 'https://erp.viraatmarine.com/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));

// ---------------------------------------------------------------------------------------------
// images (library slugs; every one must exist with recorded dimensions — the build throws otherwise)
function img(slug, alt, sizes, cls, extra) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  const seen = new Set(); const srcset = tiers.filter(([w]) => !seen.has(w) && seen.add(w)).map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ');
  return `<img class="${cls || 'vm-img'}" src="/assets/images/library/${slug}.jpg" srcset="${srcset}" sizes="${sizes}" alt="${alt}" width="${base.w}" height="${base.h}" ${extra || 'loading="lazy" decoding="async"'} />`;
}
const P = {   // photographs — none may appear on another page (asserted in the hub build against this list)
  hero: 'vm-welder-ship-hull-dry-dock',
  paper1: 'vm-paper-stacks-folders', paper2: 'vm-binders', weld: 'vm-welding-sparks-blue-smoke', hull: 'vm-red-ship-in-drydock',
  floor: 'vm-ship-at-dock-night',        // the two hard-hat-with-tablet photos are studio backdrops (contact sheet) — not used
  seam: 'vm-grinding-sparks-dark',
  wide: 'vm-kochi-river-cranes-sunset',
  dock: 'vm-rusted-hull-plates',          // vm-vessel-on-blocks turned out to be a famous wreck, not a yard — rejected on the sheet
};
const S = {   // redacted screenshots of the live system (imported with scripts/images/import_local.js)
  signin: 'vm-shot-signin', director: 'vm-shot-director', design: 'vm-shot-design', purchase: 'vm-shot-purchase',
  live: 'vm-shot-live-stream', attendance: 'vm-shot-attendance', review: 'vm-shot-register', yard: 'vm-shot-sitelog',
  mDirector: 'vm-shot-m-yard', mProduction: 'vm-shot-m-purchase', mDesign: 'vm-shot-m-design',
};
module.exports.PHOTOS = Object.values(P);

// ---------------------------------------------------------------------------------------------
// facts (repository of the ERP, read 2026-09-06)
const F = { desks: 19, people: 15, roles: 11, tables: 38, pipelines: 80, jsFiles: 411, jsLines: '44,000', commits: 424, days: 45, events: '3,500', drawings: 47, finRows: '1,500', files: 21 };

const FRAME = (slug, alt, url, sizes, cls) => `<figure class="vm-frame ${cls || ''}">
  <div class="vm-frame-bar"><span></span><span></span><span></span><em>${url}</em></div>
  ${img(slug, alt, sizes || '(max-width:900px) 100vw, 1100px', 'vm-shot')}
</figure>`;
const PHONE = (slug, alt, d) => `<figure class="vm-phone" style="--d:${d}"><div class="vm-phone-notch"></div>${img(slug, alt, '(max-width:700px) 70vw, 300px', 'vm-shot')}</figure>`;

const head = (n, label, h2, lede, dark) => `
    <div class="vm-head${dark ? ' dark' : ''}">
      <span class="vm-slate"><i>${n}</i>${label}</span>
      <h2>${h2}</h2>
      ${lede ? `<p class="vm-lede">${lede}</p>` : ''}
    </div>`;

const DESKS = [
  ['Direction', ['Executive command: projects, workforce, interventions, approvals, the enquiry pipeline', 'Project tracker and construction overview across every vessel', 'Company directives, announcements, delayed activities, team efficiency', 'Final capital-expenditure clearance and leave sign-off']],
  ['Design &amp; engineering', ['Design head: drawing vault, review queue, team tasks', 'Senior naval architect and three naval architects, each with a review desk', 'Three draftsman desks: submit a drawing, follow its revision', 'Every drawing carries a revision history and its reviewer&rsquo;s comments']],
  ['Production', ['Production head: milestones, construction progress, team workload', 'Two supervisor desks for the slipway: daily site logs with photo evidence', 'Crew present today, computed from the logs, pushed to payroll', 'Material requests raised from the floor straight into the purchase chain']],
  ['Purchase &amp; finance', ['Purchase desk: requests, master inventory, live stock registry, vendors, delayed deliveries', 'Accounts desk: purchase clearances, invoice requests, generated invoices, budgets', 'Finance suite: profit and loss, project costing, OPEX and CAPEX', 'A ledger of every finance record, exportable to Excel']],
  ['People &amp; communication', ['Members &amp; roles: roster, access roles, credentials issued by the director', 'Attendance control: daily clock-in, regularisation requests, monthly matrix', 'Leave requests with approval routing, birthdays and announcements', 'Live activity stream, notification centre, per-desk chat, and a client portal']],
];

const FLOW = [
  ['Slipway', 'A supervisor raises a material request from the yard desk &mdash; on a phone, standing next to the job.'],
  ['Purchase', 'The purchase manager sees it in the queue, checks stock and vendors, approves or flags it. Step three of five.'],
  ['Accounts', 'Finance clearance: budget line, invoice terms. Step four. Nothing moves without a returned database row.'],
  ['Director', 'Final capital-expenditure clearance on the executive desk. Step five. The whole chain is visible from here.'],
  ['Everyone', 'The requester is notified, the stock registry updates, and the event lands in the live activity stream.'],
];

const TRUTH = [
  ['No fake green', 'Every insert and update is chained to a read-back. A save only shows as saved when the database returns the row. An empty response is treated as a failure, not a success.'],
  ['Red, not silent', 'A failing query raises a red banner with a copyable report of exactly what was attempted. Nothing fails quietly; the owner can paste the report to us and the fix is one message away.'],
  ['Nothing deleted', 'Records are archived, never destroyed. Deletion is blocked at the database itself by a trigger, so no screen, script or mistake can remove history.'],
  ['One event log', 'Every desk writes to the same activity stream. At the time of writing it holds ' + F.events + '+ events, re-audited on a thirty-second cycle so a missed write is caught, not lost.'],
  ['Live, always', 'Realtime channels push changes to every open tab &mdash; one channel per tab, fanned out internally, so the director and the slipway see the same row at the same second.'],
  ['Locked doors', 'A sign-in gate in front of every desk, role rules per desk, sessions that expire after 24 hours of inactivity, and credentials issued personally by the director from the members desk.'],
];

const TIMELINE = [
  ['20 Jul', 'First commit', 'Portal, director desk and the first operations views, deployed the same day.'],
  ['23&ndash;30 Jul', 'The foundations', 'Roles and desks, the live event log with its 48-hour history and 30-second re-audit, the 40-member roster, the Kerala marine calendar.'],
  ['5&ndash;12 Aug', 'The islands', 'A shared core library, then the isolated desks: four naval architects with drawing vaults, purchase inventory and material requests, production planning.'],
  ['17&ndash;25 Aug', 'Live data only', 'Every mock and bypass removed; the accounts, purchase and design desks redesigned to one visual system.'],
  ['27&ndash;31 Aug', 'The hard parts', 'Finance module, portfolio and construction engine, drawing revision control, the admin console, confirmable writes on every table, realtime everywhere.'],
  ['1 Sep', 'Handover round', 'Sign-in and session lock on all ' + F.desks + ' desks, notification indicators, archive controls, the phone app shell.'],
  ['2 Sep', 'Their own machine', 'Self-hosting scaffold: the full database stack in Docker on one office PC, ' + F.tables + ' tables and ' + F.files + ' files migrated, working with no internet.'],
];

const FAQS = [
  { q: 'Can I see the Viraat Marine ERP myself?', a: `The sign-in page is public at <a href="${LIVE}" target="_blank" rel="noopener">erp.viraatmarine.com</a>; the desks behind it are the yard&rsquo;s live data, so they are not. Book a call and we will walk you through the real system on a screen share, with the client&rsquo;s permission, and show you the parts that match your own business.` },
  { q: 'How long did the shipyard ERP take to build?', a: `Forty-five days from first commit to handover round &mdash; 20 July to 2 September 2026, ${F.commits} commits &mdash; with the yard using desks as they went live rather than waiting for a single launch day. The self-hosting work that followed took one further day.` },
  { q: 'What does a custom ERP like this cost?', a: 'It is scoped on a call, because the honest number depends on how many desks, how many approval chains and how much data already exists. What we can promise in advance is a written plan for the first ninety days, a staging URL you can open every week, and one agreed monthly fee rather than a rate card with surprises.' },
  { q: 'Is this an off-the-shelf ERP with a new skin?', a: `No. It is hand-built for one shipyard: ${F.desks} desks written for the people who sit at them, ${F.tables} database tables shaped around vessels, drawings, purchase chains and site logs, and ${F.pipelines} isolated modules. Nothing was licensed from an ERP vendor and there is no per-user fee.` },
  { q: 'What is it built on?', a: `Plain HTML, CSS and JavaScript on the front end &mdash; no framework, each desk an isolated island &mdash; and a managed PostgreSQL database with realtime channels and file storage behind it, hosted on a global edge network. That choice is why it runs on a phone on the slipway and why the yard can self-host it later on a single office PC.` },
  { q: 'Who owns the code and the data?', a: 'The client does. The repository, the database and the hosting accounts are theirs, and the handover package includes a self-hosting installer and runbook so the system can run on their own machine with no dependency on us or on any cloud subscription.' },
  { q: 'Does it work on phones?', a: 'Yes. Below 768 pixels every desk switches to an app shell: a bottom bar with the four destinations that desk uses most, tables that become stacked cards, and a chat button that stays reachable with a thumb. Supervisors log the day and upload photo evidence from the yard.' },
  { q: 'How do you keep the numbers trustworthy?', a: 'Nothing on a screen is shown as saved until the database has returned the saved row; failures raise a red banner instead of a silent nothing; records are archived rather than deleted; and every desk writes to one live event log that is re-audited every thirty seconds.' },
  { q: 'Can you build the same for my yard, plant or fleet?', a: 'Yes, and the pattern travels well beyond shipbuilding: any business with drawings or specifications, a purchase approval chain, work on a floor and accounts at the end has the same shape. We start by looking at one real workflow with you, free, and writing down what one system would replace.' },
  { q: 'How is a system like this maintained after go-live?', a: 'The same team that built it keeps improving it on one agreed monthly fee: new desks, changed approval chains, reports, and the self-hosting migration when the client is ready. Every change ships to a staging copy first and is written up in a monthly report.' },
];

// ---------------------------------------------------------------------------------------------
// markup
const HERO = `
<section class="vm vm-hero" id="vm-hero" data-act aria-label="Viraat Marine ERP case study">
  <div class="vm-hero-plate">${img(P.hero, 'A welder working on the hull of a ship in dry dock', '100vw', 'vm-hero-img', 'loading="eager" fetchpriority="high" decoding="async"')}</div>
  <div class="vm-hero-shade" aria-hidden="true"></div>
  <div class="wrap vm-hero-body">
    <p class="vm-eyebrow vm-rise" style="--d:.1s"><a href="/results/">Results</a> <span aria-hidden="true">/</span> Case study &middot; Custom ERP &middot; Shipbuilding &middot; Kerala, India</p>
    <h1 class="vm-rise" style="--d:.25s">A shipyard, one system. <span>Design, production, purchase and finance in a single browser.</span></h1>
    <p class="vm-sub vm-rise" style="--d:.4s">Viraat Marine Shipyard builds and repairs vessels in Kerala. In forty-five days of summer 2026 we built them an ERP that runs the yard from the first enquiry to vessel delivery &mdash; live today at erp.viraatmarine.com, on desks in the office and on phones at the slipway.</p>
    <div class="vm-hero-actions vm-rise" style="--d:.55s">
      <a class="vm-btn" href="${LIVE}" target="_blank" rel="noopener">Open the live sign-in page &nearr;</a>
      <a class="vm-btn ghost" href="${L.FORM}" target="_blank">Book a Free Strategy Call</a>
    </div>
    <ul class="vm-facts vm-rise" style="--d:.7s" aria-label="Scale of the system">
      <li><b>${F.desks}</b><span>role desks</span></li><li><b>${F.tables}</b><span>database tables</span></li><li><b>${F.pipelines}</b><span>isolated modules</span></li><li><b>${F.people}</b><span>people, ${F.roles} roles</span></li><li><b>${F.days}</b><span>days to handover</span></li><li><b>${F.commits}</b><span>commits</span></li>
    </ul>
  </div>
</section>
`;

const ANSWER = `
<section class="vm vm-answer" id="vm-answer" data-act>
  <div class="wrap">
    <p><strong>Viraat Marine ERP</strong> is a custom enterprise system TechAuditPros built for Viraat Marine Shipyard Pvt Ltd between 20 July and 2 September 2026. It replaces separate tools and paper with one browser-based system of ${F.desks} role desks &mdash; director, design, naval architecture, production, purchase, accounts, marketing, members and attendance &mdash; on ${F.tables} database tables, with a live activity stream, realtime updates on every open screen, a sign-in gate on every desk and a phone layout for the yard. It is live at erp.viraatmarine.com and is being prepared to run on the shipyard&rsquo;s own office computer with no internet connection.</p>
  </div>
</section>
`;

const BRIEF = `
<section class="vm vm-brief" id="vm-brief" data-act>
  <div class="wrap vm-two">
    <div>
      ${head('01', 'The brief', 'What a shipyard has to keep straight, and what the director asked for.', null)}
      <p>A vessel is a long project made of short ones. Drawings go out for review and come back with comments. Steel, paint and electrodes are requested from the slipway and approved by people who are not standing on it. Crews are counted every morning, paid every month. Invoices follow milestones. Somewhere a director needs to see all of it on one screen without phoning six people.</p>
      <p>The brief we were given was short. One system for design, production, purchase, finance and people. Usable on a phone at the yard, not just at a desk. Nothing ever deleted, everything traceable to who did it and when. Live data only &mdash; no demo numbers, no green tick before the database says so. And, at the end, a system the yard owns outright and can run on its own machine.</p>
      <p class="vm-note">We went to work on 20 July 2026. The first desk was deployed the same day.</p>
    </div>
    <div class="vm-quad" aria-label="Before and during: paper, binders, welding, a hull in dock">
      <figure style="--c:0 100% 100% 0">${img(P.paper1, 'Stacks of paper documents and file folders', '(max-width:900px) 50vw, 360px')}</figure>
      <figure style="--c:0 0 100% 100%">${img(P.paper2, 'A shelf of binders', '(max-width:900px) 50vw, 360px')}</figure>
      <figure style="--c:100% 100% 0 0">${img(P.weld, 'A welding arc with sparks and blue smoke', '(max-width:900px) 50vw, 360px')}</figure>
      <figure style="--c:100% 0 0 100%">${img(P.hull, 'A red-hulled ship standing in dry dock', '(max-width:900px) 50vw, 360px')}</figure>
    </div>
  </div>
</section>
`;

// the hull: 19 plates on a hull profile, viewBox 1200x300
const plates = Array.from({ length: F.desks }, (_, i) => { const x = 110 + i * 52; const top = 92 + Math.round(Math.pow(Math.abs(i - 9) / 9, 2) * 26); return `<rect class="vm-plate" x="${x}" y="${top}" width="48" height="${210 - top}" rx="3" style="--i:${i}"/><circle class="vm-spark" cx="${x + 48}" cy="${top + 8}" r="4" style="--i:${i}"/>`; }).join('');
const HULL = `<svg class="vm-hull" viewBox="0 0 1200 300" aria-hidden="true" focusable="false">
  <path class="vm-keel" d="M60 120 C 120 60, 300 90, 1100 92 L 1150 96 C 1120 160, 1060 212, 1000 216 L 160 216 C 110 210, 70 170, 60 120 Z" pathLength="100"/>
  ${plates}
  <path class="vm-water" d="M0 258 C 100 246, 200 270, 300 258 S 500 246, 600 258 S 800 270, 900 258 S 1100 246, 1200 258" pathLength="100"/>
</svg>`;

const SYSTEM = `
<section class="vm dark vm-system" id="vm-system" data-act>
  <div class="wrap">
    ${head('02', 'The system', `One system, ${F.desks} desks. Each written for the person who sits at it.`, 'Every desk is an isolated island with its own screens and its own modules, sharing one locked database connection. The hull below fills in the way the yard did: plate by plate, over six weeks.', true)}
    ${HULL}
    <div class="vm-desks">
      ${DESKS.map(([h, items], i) => `<div class="vm-desk" style="--d:${i * 0.12}s"><h3>${h}</h3><ul>${items.map(t => `<li>${t}</li>`).join('')}</ul></div>`).join('\n      ')}
    </div>
  </div>
</section>
`;

const SCREENS = `
<section class="vm black vm-screens" id="vm-screens" data-act>
  <div class="wrap">
    ${head('03', 'The screens', 'What it looks like at 9 a.m. on the executive desk.', 'Real screens from the live system, captured on 6 September 2026. Names, counterparties and amounts are redacted; the layout, the numbers of drawings and the approval queues are as they were.', true)}
    ${FRAME(S.director, 'The director desk of the Viraat Marine ERP: project health, approvals awaiting signature, announcements', 'erp.viraatmarine.com/director', '(max-width:900px) 100vw, 1300px', 'vm-frame-lead')}
    <div class="vm-reel" aria-label="More desks">
      ${FRAME(S.design, 'The design head desk: drawings in the vault, pending review, projects ready for invoice', 'erp.viraatmarine.com/design', '(max-width:900px) 86vw, 640px')}
      ${FRAME(S.review, 'The drawing and document register: 47 items under revision control, each with its review status and history', 'erp.viraatmarine.com/design', '(max-width:900px) 86vw, 640px')}
      ${FRAME(S.purchase, 'The purchase desk: incoming material requests and where each one sits in the approval chain', 'erp.viraatmarine.com/purchase', '(max-width:900px) 86vw, 640px')}
      ${FRAME(S.live, 'The live activity stream: every system event from every desk, read live from the event log', 'erp.viraatmarine.com/live-status', '(max-width:900px) 86vw, 640px')}
      ${FRAME(S.attendance, 'Attendance control: the daily clock-in and the regularisation queue', 'erp.viraatmarine.com/attendance', '(max-width:900px) 86vw, 640px')}
      ${FRAME(S.yard, 'A yard supervisor desk: the daily site log for crew attendance and work done, pushed to payroll', 'erp.viraatmarine.com/akash', '(max-width:900px) 86vw, 640px')}
    </div>
    <p class="vm-cap">${F.drawings} drawings under revision control on the day of capture. Six of the ${F.desks} desks shown; the sign-in page is public, the desks are not.</p>
  </div>
</section>
`;

const FLOWS = `
<section class="vm vm-flow" id="vm-flow" data-act>
  <div class="wrap">
    ${head('04', 'One request', 'How a bag of welding electrodes travels through the system.', 'The purchase chain is the pattern the whole ERP is built on: a request moves through numbered steps, each step confirmed by the database before the next person sees it.')}
    <ol class="vm-track">
      <span class="vm-marker" aria-hidden="true"></span>
      ${FLOW.map(([h, p], i) => `<li class="vm-station" style="--i:${i}"><b>${String(i + 1).padStart(2, '0')}</b><h3>${h}</h3><p>${p}</p></li>`).join('\n      ')}
    </ol>
    <p class="vm-note">Drawings follow the same shape: a draftsman submits, the design head reviews and comments, a revision is recorded, an approved drawing can be shared with the client through the portal. Leave requests, invoice requests and enquiries each have their own chain. None of them can skip a step.</p>
  </div>
</section>
`;

const FLOOR = `
<section class="vm dark vm-floor" id="vm-floor" data-act>
  <div class="vm-floor-plate">${img(P.floor, 'A cargo ship at a lit dock at night', '100vw', 'vm-floor-img')}</div>
  <div class="wrap vm-two rev">
    <div class="vm-phones" aria-label="The ERP on a phone">
      ${PHONE(S.mDirector, 'The production desk on a phone: active fabrications, manpower on site, delayed milestones, a bottom app bar', '0s')}
      ${PHONE(S.mProduction, 'The purchase desk on a phone: requisitions, finance clearance, delayed deliveries', '.15s')}
      ${PHONE(S.mDesign, 'The drawing register on a phone: filters and the first register entry', '.3s')}
    </div>
    <div>
      ${head('05', 'The floor', 'Built for the slipway, not the boardroom.', null, true)}
      <p>Below 768 pixels every desk becomes an app: a bottom bar with the four things that role does most, tables that turn into stacked cards, a chat button that stays under the thumb. A supervisor logs the crew, photographs the day&rsquo;s welding and raises a material request without leaving the yard. Photos are compressed on the phone before upload so a bad signal at the water&rsquo;s edge still gets the evidence through.</p>
      <p>The same principle runs the other way. Nothing on any screen, desk or phone, is shown as done until the database has said so. That is what makes it safe to work from the slipway.</p>
    </div>
  </div>
</section>
`;

const TRUTHS = `
<section class="vm vm-truth" id="vm-truth" data-act>
  <div class="wrap vm-two">
    <div>
      ${head('06', 'The engineering', 'Why the numbers on these screens can be trusted.', 'An ERP is only useful if the people using it believe it. These six rules are enforced in code and at the database, not in a policy document.')}
      <figure class="vm-seamfig">${img(P.seam, 'A worker grinding steel in the dark, sparks flying', '(max-width:900px) 100vw, 560px')}</figure>
    </div>
    <ol class="vm-ledger">
      ${TRUTH.map(([h, p], i) => `<li class="vm-seal" style="--i:${i}"><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${h}</h3><p>${p}</p></div></li>`).join('\n      ')}
    </ol>
  </div>
</section>
`;

const TIME = `
<section class="vm dark vm-timeline" id="vm-timeline" data-act>
  <div class="wrap">
    ${head('07', 'Forty-five days', 'From the first commit to a system the yard runs on.', `${F.commits} commits between 20 July and 2 September 2026, read from the repository. The yard used each desk as it went live; there was no single launch day to be afraid of.`, true)}
    <div class="vm-tl">
      <svg class="vm-tl-line" viewBox="0 0 1000 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0 5 L1000 5" pathLength="100"/></svg>
      <ol>
        ${TIMELINE.map(([d, h, p], i) => `<li style="--i:${i}"><i></i><time>${d}</time><h3>${h}</h3><p>${p}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </div>
</section>
`;

const NEXT = `
<section class="vm vm-next" id="vm-next" data-act>
  <div class="wrap vm-two">
    <div>
      ${head('08', 'What the yard keeps', 'The code, the data, the hosting &mdash; and a machine of their own.', null)}
      <p>The repository, the database and the hosting accounts belong to Viraat Marine. The next step, already scaffolded and rehearsed on the owner&rsquo;s machine, moves the whole system onto one office PC at the yard: the full database stack in Docker, every desk served over the office network, working with no internet at all, and a nightly backup as the safety net. In the rehearsal, ${F.tables} tables and ${F.files} stored files came across intact.</p>
      <p>That is the difference between a subscription and a system. If we disappeared tomorrow, the yard would still open the ERP on Monday morning.</p>
      <p class="vm-cta-row"><a class="vm-btn navy" href="${L.FORM}" target="_blank">Talk to us about your yard, plant or fleet</a> <a class="vm-btn ghost-ink" href="/results/">All results &rarr;</a></p>
    </div>
    <figure class="vm-dockfig">${img(P.dock, 'Weathered steel plates and an anchor on the side of a large ship', '(max-width:900px) 100vw, 640px')}</figure>
  </div>
  <div class="vm-band vm-drift">${img(P.wide, 'A calm river under an orange sky with industrial cranes', '100vw', 'vm-band-img')}<p>Kerala builds ships. Now one of its yards runs on a system built twenty kilometres from the slipway.</p></div>
</section>
`;

const CSS = `
  /* ================= /results/viraat-marine-erp/ ================= */
  .vm{ position:relative; padding:clamp(60px,7vw,110px) 0; overflow-x:clip; background:var(--paper); color:var(--ink); }
  .vm .wrap{ width:min(1480px,92%); margin:0 auto; }
  .vm.dark{ background:var(--navy-deep); color:#fff; }
  .vm.black{ background:#06111C; color:#fff; }
  .vm h2{ font-size:clamp(1.9rem,3vw,2.9rem); line-height:1.1; letter-spacing:-0.015em; margin:14px 0 14px; max-width:20ch; }
  .vm.dark h2, .vm.black h2{ color:#fff; }
  .vm p{ font-size:1.05rem; line-height:1.72; color:var(--ink-soft); max-width:62ch; }
  .vm.dark p, .vm.black p{ color:rgba(255,255,255,.78); }
  .vm h3{ font-size:1.05rem; margin:0 0 8px; }
  .vm-head{ margin-bottom:34px; }
  .vm-slate{ display:inline-flex; align-items:center; gap:12px; font-family:var(--font-mono); font-size:.74rem; letter-spacing:.14em; text-transform:uppercase; color:var(--orange); }
  .vm-slate i{ font-style:normal; font-weight:600; padding:3px 8px; border:1px solid currentColor; border-radius:4px; }
  .vm-lede{ font-size:1.12rem !important; }
  .vm-note{ font-family:var(--font-mono); font-size:.86rem !important; color:var(--ink-faint) !important; border-left:3px solid var(--orange); padding-left:14px; }
  .vm.dark .vm-note{ color:rgba(255,255,255,.6) !important; }
  .vm-two{ display:grid; grid-template-columns:1.05fr 1fr; gap:clamp(28px,4vw,64px); align-items:center; }
  .vm-two.rev > :first-child{ order:2; }
  .vm-img, .vm-shot{ display:block; width:100%; height:auto; }
  .vm-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; border:1.5px solid var(--orange); transition:transform .15s ease, background .15s ease; }
  .vm-btn:hover{ transform:translateY(-2px); background:var(--orange-dark); }
  .vm-btn.ghost{ background:transparent; border-color:rgba(255,255,255,.4); }
  .vm-btn.ghost:hover{ background:rgba(255,255,255,.08); }
  .vm-btn.navy{ background:var(--navy-deep); border-color:var(--navy-deep); }
  .vm-btn.ghost-ink{ background:transparent; color:var(--ink); border-color:var(--line-strong); }
  .vm-cta-row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:26px; }
  /* hero */
  .vm-hero{ padding:0; min-height:min(92vh,900px); display:flex; align-items:flex-end; background:var(--navy-deep); color:#fff; }
  .vm-hero-plate{ position:absolute; inset:0; overflow:hidden; }
  .vm-hero-img{ width:100%; height:100%; object-fit:cover; object-position:center 40%; display:block; }
  .vm-hero-shade{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(6,17,28,.25) 0%, rgba(6,17,28,.55) 45%, rgba(6,17,28,.92) 100%); }
  .vm-hero-body{ position:relative; padding:140px 0 56px; }
  .vm-eyebrow{ font-family:var(--font-mono); font-size:.78rem; letter-spacing:.12em; text-transform:uppercase; color:#fff !important; opacity:.85; }
  .vm-eyebrow a{ color:var(--orange); text-decoration:none; }
  .vm-hero h1{ font-size:clamp(2.3rem,5vw,4.6rem); line-height:1.02; letter-spacing:-0.02em; margin:16px 0 20px; color:#fff; max-width:18ch; }
  .vm-hero h1 span{ display:block; font-size:.5em; line-height:1.25; font-weight:500; color:rgba(255,255,255,.85); margin-top:14px; max-width:36ch; letter-spacing:0; }
  .vm-sub{ color:rgba(255,255,255,.82) !important; max-width:64ch; font-size:1.1rem !important; }
  .vm-hero-actions{ display:flex; flex-wrap:wrap; gap:12px; margin:26px 0 34px; }
  .vm-facts{ list-style:none; margin:0; padding:22px 0 0; border-top:1px solid rgba(255,255,255,.18); display:grid; grid-template-columns:repeat(6,1fr); gap:14px; }
  .vm-facts b{ display:block; font-family:var(--font-mono); font-size:clamp(1.4rem,2.2vw,2rem); font-weight:700; letter-spacing:-0.02em; }
  .vm-facts span{ font-size:.82rem; color:rgba(255,255,255,.7); }
  /* answer */
  .vm-answer{ padding:44px 0; background:var(--paper-alt); border-bottom:1px solid var(--line); }
  .vm-answer p{ max-width:920px; margin:0 auto; border-left:4px solid var(--orange); padding-left:20px; font-size:1.08rem; }
  /* brief */
  .vm-quad{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .vm-quad figure{ margin:0; aspect-ratio:4/3; overflow:hidden; border-radius:10px; }
  .vm-quad img{ width:100%; height:100%; object-fit:cover; }
  /* the hull */
  .vm-hull{ display:block; width:100%; height:auto; margin:10px 0 30px; }
  .vm-keel{ fill:none; stroke:rgba(255,255,255,.35); stroke-width:2; }
  .vm-plate{ fill:#2C4A66; stroke:#0B2036; stroke-width:1.5; transform-box:fill-box; transform-origin:left center; }
  .vm-spark{ fill:var(--orange); opacity:0; }
  .vm-water{ fill:none; stroke:var(--orange); stroke-width:2; opacity:.7; }
  .vm-desks{ display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
  .vm-desk{ background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:22px 20px; }
  .vm-desk h3{ color:var(--orange); font-family:var(--font-mono); font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; margin-bottom:12px; }
  .vm-desk ul{ margin:0; padding-left:16px; }
  .vm-desk li{ font-size:.92rem; line-height:1.55; color:rgba(255,255,255,.8); margin-bottom:8px; }
  /* frames */
  .vm-frame{ margin:0; border-radius:12px; overflow:hidden; background:#0E1B29; border:1px solid rgba(255,255,255,.14); box-shadow:0 30px 60px -30px rgba(0,0,0,.8); }
  .vm-frame-bar{ display:flex; align-items:center; gap:6px; padding:9px 12px; background:rgba(255,255,255,.06); }
  .vm-frame-bar span{ width:9px; height:9px; border-radius:50%; background:rgba(255,255,255,.22); }
  .vm-frame-bar em{ flex:1; margin-left:8px; font-style:normal; font-family:var(--font-mono); font-size:.72rem; color:rgba(255,255,255,.55); background:rgba(0,0,0,.25); border-radius:6px; padding:3px 10px; }
  .vm-frame-lead{ margin:0 auto 26px; max-width:1300px; }
  .vm-reel{ display:grid; grid-auto-flow:column; grid-auto-columns:min(640px,86vw); gap:18px; overflow-x:auto; scroll-snap-type:x mandatory; padding:6px 0 18px; scrollbar-width:thin; }
  .vm-reel .vm-frame{ scroll-snap-align:start; }
  .vm-cap{ font-family:var(--font-mono); font-size:.82rem !important; color:rgba(255,255,255,.55) !important; margin-top:6px; }
  /* flow */
  .vm-track{ list-style:none; margin:20px 0 30px; padding:44px 0 0; display:grid; grid-template-columns:repeat(5,1fr); gap:18px; position:relative; }
  .vm-track::before{ content:''; position:absolute; left:0; right:0; top:22px; height:2px; background:var(--line-strong); }
  .vm-marker{ position:absolute; top:15px; left:0; width:16px; height:16px; border-radius:50%; background:var(--orange); box-shadow:0 0 0 6px var(--orange-tint); }
  .vm-station{ background:var(--paper-alt); border:1px solid var(--line); border-radius:12px; padding:20px; position:relative; }
  .vm-station::before{ content:''; position:absolute; top:-30px; left:50%; width:10px; height:10px; margin-left:-5px; border-radius:50%; background:var(--paper); border:2px solid var(--line-strong); }
  .vm-station b{ font-family:var(--font-mono); color:var(--orange); font-size:.8rem; }
  .vm-station p{ font-size:.92rem; line-height:1.55; }
  /* floor */
  .vm-floor{ background:#0B2036; }
  .vm-floor-plate{ position:absolute; inset:0; overflow:hidden; opacity:.28; }
  .vm-floor-img{ width:100%; height:100%; object-fit:cover; display:block; }
  .vm-floor .wrap{ position:relative; }
  .vm-phones{ display:flex; gap:18px; justify-content:center; align-items:flex-end; }
  .vm-phone{ margin:0; width:min(300px,28vw); border-radius:28px; border:6px solid #1B2B3A; background:#000; overflow:hidden; box-shadow:0 30px 60px -20px rgba(0,0,0,.8); position:relative; }
  .vm-phone:nth-child(2){ margin-bottom:34px; }
  .vm-phone-notch{ position:absolute; top:8px; left:50%; width:36%; height:18px; margin-left:-18%; border-radius:12px; background:#1B2B3A; z-index:1; }
  /* truth */
  .vm-seamfig{ margin:26px 0 0; border-radius:12px; overflow:hidden; aspect-ratio:4/3; }
  .vm-seamfig img{ width:100%; height:100%; object-fit:cover; }
  .vm-ledger{ list-style:none; margin:0; padding:0; border-top:1px solid var(--line); }
  .vm-seal{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:20px 0; border-bottom:1px solid var(--line); }
  .vm-seal b{ font-family:var(--font-mono); color:var(--orange); font-size:.9rem; padding-top:3px; }
  .vm-seal p{ font-size:.95rem; line-height:1.6; margin:0; }
  /* timeline */
  .vm-tl{ position:relative; margin-top:36px; }
  .vm-tl-line{ position:absolute; left:0; right:0; top:8px; width:100%; height:10px; }
  .vm-tl-line path{ stroke:var(--orange); stroke-width:3; fill:none; }
  .vm-tl ol{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(7,1fr); gap:14px; }
  .vm-tl li{ position:relative; padding-top:34px; }
  .vm-tl li i{ position:absolute; top:4px; left:0; width:18px; height:18px; border-radius:50%; background:var(--navy-deep); border:3px solid var(--orange); }
  .vm-tl time{ font-family:var(--font-mono); font-size:.78rem; color:var(--orange); letter-spacing:.06em; }
  .vm-tl h3{ font-size:1rem; margin:6px 0 6px; }
  .vm-tl p{ font-size:.88rem; line-height:1.55; }
  /* next + band */
  .vm-dockfig{ margin:0; border-radius:12px; overflow:hidden; aspect-ratio:4/3; }
  .vm-dockfig img{ width:100%; height:100%; object-fit:cover; }
  .vm-band{ position:relative; margin:clamp(60px,7vw,110px) 0 calc(-1 * clamp(60px,7vw,110px)); height:clamp(300px,42vw,560px); overflow:hidden; background:var(--navy-deep); }
  .vm-band-img{ width:100%; height:120%; object-fit:cover; display:block; margin-top:-10%; }
  .vm-band p{ position:absolute; left:4%; right:4%; bottom:32px; margin:0; color:#fff !important; font-size:clamp(1.2rem,2.4vw,2rem) !important; font-weight:700; max-width:30ch; text-shadow:0 2px 20px rgba(0,0,0,.6); line-height:1.25; }
  @supports (animation-timeline: view()){ .vm-drift .vm-band-img{ animation:vmDrift linear both; animation-timeline:view(); } @keyframes vmDrift{ from{ transform:translateY(-8%); } to{ transform:translateY(8%); } } }
  /* ---------- reveals: start states only under html.vm-on ---------- */
  html.vm-on .vm-hero-img{ transform:scale(1.08); }
  html.vm-on .vm-hero.lit .vm-hero-img{ transform:scale(1); transition:transform 7s cubic-bezier(.2,.6,.2,1); }
  html.vm-on .vm-rise{ opacity:0; transform:translateY(28px); }
  html.vm-on .lit .vm-rise{ opacity:1; transform:none; transition:opacity .8s ease var(--d,0s), transform .9s cubic-bezier(.2,.7,.2,1) var(--d,0s); }
  html.vm-on .vm-head .vm-slate{ opacity:0; transform:translateX(-14px); } html.vm-on .lit .vm-head .vm-slate{ opacity:1; transform:none; transition:all .6s ease; }
  html.vm-on .vm-head h2{ opacity:0; transform:translateY(18px); } html.vm-on .lit .vm-head h2{ opacity:1; transform:none; transition:all .8s ease .15s; }
  html.vm-on .vm-quad figure{ clip-path:inset(var(--c)); } html.vm-on .lit .vm-quad figure{ clip-path:inset(0); transition:clip-path 1s cubic-bezier(.2,.7,.2,1); }
  html.vm-on .lit .vm-quad figure:nth-child(2){ transition-delay:.15s; } html.vm-on .lit .vm-quad figure:nth-child(3){ transition-delay:.3s; } html.vm-on .lit .vm-quad figure:nth-child(4){ transition-delay:.45s; }
  html.vm-on .vm-keel{ stroke-dasharray:100; stroke-dashoffset:100; } html.vm-on .lit .vm-keel{ stroke-dashoffset:0; transition:stroke-dashoffset 2.2s ease; }
  html.vm-on .vm-plate{ transform:scaleX(0); } html.vm-on .lit .vm-plate{ transform:scaleX(1); transition:transform .45s ease calc(.6s + var(--i) * .13s); }
  html.vm-on .lit .vm-spark{ animation:vmSpark .5s ease calc(.95s + var(--i) * .13s) 1 both; }
  @keyframes vmSpark{ 0%{ opacity:0; transform:scale(.4); } 40%{ opacity:1; transform:scale(1.6); } 100%{ opacity:0; transform:scale(.6); } }
  html.vm-on .vm-water{ stroke-dasharray:100; stroke-dashoffset:100; } html.vm-on .lit .vm-water{ stroke-dashoffset:0; transition:stroke-dashoffset 1.6s ease 3.2s; }
  html.vm-on .vm-desk{ opacity:0; transform:translateY(30px); } html.vm-on .lit .vm-desk{ opacity:1; transform:none; transition:all .7s ease calc(1.2s + var(--d)); }
  html.vm-on .vm-frame-lead{ opacity:0; transform:translateY(40px) scale(.98); } html.vm-on .lit .vm-frame-lead{ opacity:1; transform:none; transition:all .9s cubic-bezier(.2,.7,.2,1) .1s; }
  html.vm-on .vm-reel .vm-frame{ opacity:0; transform:translateX(80px); } html.vm-on .lit .vm-reel .vm-frame{ opacity:1; transform:none; transition:all .8s cubic-bezier(.2,.7,.2,1); }
  html.vm-on .lit .vm-reel .vm-frame:nth-child(2){ transition-delay:.12s; } html.vm-on .lit .vm-reel .vm-frame:nth-child(3){ transition-delay:.24s; } html.vm-on .lit .vm-reel .vm-frame:nth-child(4){ transition-delay:.36s; } html.vm-on .lit .vm-reel .vm-frame:nth-child(5){ transition-delay:.48s; } html.vm-on .lit .vm-reel .vm-frame:nth-child(6){ transition-delay:.6s; }
  html.vm-on .vm-marker{ left:0; } html.vm-on .lit .vm-marker{ animation:vmMarker 3.2s steps(4, end) .3s 1 both; }
  @keyframes vmMarker{ from{ left:calc(0% + 10% - 8px); } to{ left:calc(100% - 10% - 8px); } }
  html.vm-on .vm-station{ opacity:0; transform:translateY(16px) scale(.96); } html.vm-on .lit .vm-station{ opacity:1; transform:none; transition:all .5s ease calc(.3s + var(--i) * .8s); }
  html.vm-on .vm-phone{ opacity:0; transform:translateY(60px); } html.vm-on .lit .vm-phone{ opacity:1; transform:none; transition:all .9s cubic-bezier(.2,.7,.2,1) var(--d); }
  html.vm-on .vm-seal{ opacity:0; transform:scale(1.06); } html.vm-on .lit .vm-seal{ opacity:1; transform:none; transition:all .5s cubic-bezier(.2,.7,.2,1) calc(var(--i) * .14s); }
  html.vm-on .vm-tl-line path{ stroke-dasharray:100; stroke-dashoffset:100; } html.vm-on .lit .vm-tl-line path{ stroke-dashoffset:0; transition:stroke-dashoffset 2.4s ease; }
  html.vm-on .vm-tl li{ opacity:0; transform:translateY(14px); } html.vm-on .lit .vm-tl li{ opacity:1; transform:none; transition:all .6s ease calc(var(--i) * .3s); }
  html.vm-on .vm-tl li i{ transform:scale(0); } html.vm-on .lit .vm-tl li i{ transform:scale(1); transition:transform .4s cubic-bezier(.2,.9,.3,1.4) calc(.1s + var(--i) * .3s); }
  html.vm-on .vm-dockfig, html.vm-on .vm-seamfig{ clip-path:inset(0 0 0 100%); } html.vm-on .lit .vm-dockfig, html.vm-on .lit .vm-seamfig{ clip-path:inset(0); transition:clip-path 1s cubic-bezier(.2,.7,.2,1) .2s; }
  /* ---------- wide ---------- */
  @media (min-width:1850px){ .vm .wrap{ width:min(1720px,92%); } }
  /* ---------- tablet + phone ---------- */
  @media (max-width:1100px){ .vm-desks{ grid-template-columns:repeat(2,1fr); } .vm-track{ grid-template-columns:repeat(2,1fr); padding-top:0; } .vm-track::before, .vm-marker, .vm-station::before{ display:none; } .vm-tl ol{ grid-template-columns:repeat(3,1fr); } .vm-tl-line{ display:none; } .vm-facts{ grid-template-columns:repeat(3,1fr); } }
  @media (max-width:900px){ .vm-two{ grid-template-columns:1fr; } .vm-two.rev > :first-child{ order:0; } .vm-hero{ min-height:78vh; } .vm-hero-body{ padding:120px 0 40px; } .vm-hero h1{ max-width:none; } .vm-phones{ justify-content:flex-start; overflow-x:auto; padding-bottom:10px; } .vm-phone{ width:min(260px,64vw); flex:none; } .vm-phone:nth-child(2){ margin-bottom:0; } }
  @media (max-width:640px){ .vm-desks, .vm-track, .vm-tl ol{ grid-template-columns:1fr; } .vm-facts{ grid-template-columns:repeat(2,1fr); } .vm-facts b{ font-size:1.5rem; } .vm-quad{ gap:10px; } .vm-hull{ margin-bottom:22px; } .vm-band p{ font-size:1.15rem !important; bottom:20px; } }
`;

const JS = `<script>
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('vm-on');
  var acts = document.querySelectorAll('.vm[data-act]');
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('lit'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  acts.forEach(function(a){ io.observe(a); });
  var hero = document.getElementById('vm-hero'); if (hero) requestAnimationFrame(function(){ hero.classList.add('lit'); });
})();
</script>
`;

// ---------------------------------------------------------------------------------------------
// build
let s = L.read('ca/erp/index.html');
L.must(s, '<section class="tap-new-hero">', 1); L.must(s, '<!-- trust-strip-band:start -->', 1); L.must(s, '<section class="tap-answer-section">', 1);

const TITLE = 'Viraat Marine ERP Case Study: a Shipyard Run on One System | TechAuditPros';
const DESC = 'How we built a custom ERP for Viraat Marine Shipyard in 45 days: 19 role desks, 38 tables, live activity stream, phone layout for the slipway. Real screens, real numbers, live at erp.viraatmarine.com.';
s = L.setHead(s, { title: TITLE, desc: DESC, url: URL, ogType: 'article', hreflang: [{ lang: 'en', href: URL }, { lang: 'x-default', href: URL }] });

// hero + marquee out, our hero in
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<!-- trust-strip-band:start -->', HERO, { keepStart: false, keepEnd: true });
s = L.replaceBetween(s, '<!-- trust-strip-band:start -->', '<!-- trust-strip-band:end -->', '', { keepStart: false, keepEnd: false });
if (s.includes('<!-- trust-strip-js:start -->') && s.includes('<!-- trust-strip-js:end -->')) s = L.replaceBetween(s, '<!-- trust-strip-js:start -->', '<!-- trust-strip-js:end -->', '', { keepStart: false, keepEnd: false });
if (s.includes('<!-- trust-strip:start -->') && s.includes('<!-- trust-strip:end -->')) s = L.replaceBetween(s, '<!-- trust-strip:start -->', '<!-- trust-strip:end -->', '', { keepStart: false, keepEnd: false });   // its stylesheet block in <head>

// body
const BODY = [ANSWER, BRIEF, SYSTEM, SCREENS, FLOWS, FLOOR, TRUTHS, TIME, NEXT,
  L.faqHtml('vm-faq', 'Questions about this case study', 'Ten straight answers, including the one about cost.', FAQS)].join('\n');
s = L.setBody(s, BODY);
s = L.setFinalCta(s, 'Want one system for your yard, plant or fleet? Let&rsquo;s look at your workflow together.', 'Takes 60 seconds &middot; We reply with a written plan &middot; No long-term contract');

// footer: global line
s = L.replaceBetween(s, '<div class="footer-cities">', '<div class="footer-bottom">', `
            <h3>Serving Businesses in 16 Countries</h3>
            <p class="footer-cities-list">Canada &bull; United States &bull; United Kingdom &bull; India &bull; Australia &bull; United Arab Emirates &bull; and clients in ten more, remotely, from Kochi</p>
        </div>
        `, { keepStart: true, keepEnd: true });

// schema: Article + Breadcrumb + FAQ (the site-wide Organization block stays)
const ARTICLE = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ${L.jsonStr('Viraat Marine ERP: a shipyard run on one system')},
      "description": ${L.jsonStr(DESC)},
      "url": "${URL}",
      "mainEntityOfPage": "${URL}",
      "image": "https://techauditpros.com/assets/images/library/${P.hero}-1400.jpg",
      "datePublished": "2026-09-06",
      "dateModified": "2026-09-06",
      "author": { "@type": "Organization", "name": "TechAuditPros", "url": "https://techauditpros.com/" },
      "publisher": { "@type": "Organization", "name": "TechAuditPros", "logo": { "@type": "ImageObject", "url": "https://techauditpros.com/assets/logoonly.svg" } },
      "about": { "@type": "SoftwareApplication", "name": "Viraat Marine ERP", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "url": "${LIVE}" },
      "keywords": "custom ERP case study, shipyard ERP, shipbuilding ERP software, ERP Kerala, custom ERP development India"
    }
    </script>`;
s = L.setPageSchemas(s, [ARTICLE, L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['Results', HUB], ['Viraat Marine ERP', URL]]), L.faqSchema(FAQS)]);

// css + reveal helpers, our js, nav
s = L.injectExtras(s, CSS);
s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
s = NAV.apply(s);

// guards
L.must(s, '<section class="vm', 10); L.must(s, 'class="vm-plate"', F.desks); L.must(s, 'class="vm-station"', FLOW.length); L.must(s, 'class="vm-seal"', TRUTH.length);
L.must(s, 'html.vm-on', 1 + (CSS.match(/html\.vm-on/g) || []).length - 1);
L.must(s, 'href="/results/">Results</a>', 3); /* desktop nav + drawer + the hero breadcrumb */ L.must(s, 'rel="canonical"', 1); L.must(s, 'class="tl-band"', 0);
if (/\boffshore\b/i.test(L.plain(BODY + HERO))) throw new Error('offshore in copy');
const words = L.plain(HERO + BODY).split(/\s+/).filter(Boolean).length;
L.write('results/viraat-marine-erp/index.html', s);
console.log('words in our sections:', words, '| photos:', Object.values(P).length, '| screenshots:', Object.values(S).length);
