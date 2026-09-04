'use strict';
// uk_story.js -- the picture layer for the eight UK pages.
//
// Owner's brief: "use more big images ... the story should convey with images and design, even
// someone not read anything at all, all content should be understood by the images and scrolling."
// So this is not decoration. Each page gets a sequence of LARGE photographs that carry the page's
// argument in order, with three-to-seven-word captions, so a visitor who reads nothing still gets
// the point by scrolling. Every photo is chosen to fit the specific claim it sits next to.
//
// Rules kept:
//   * ONE layout variant per page, and no two pages share a variant or a photo -- PLAN-UK 6c says
//     each page owns its own design and content, so there are five different story layouts here.
//   * Additive and idempotent: everything lives between <!-- uk-story:start --> markers, so a
//     re-run replaces rather than duplicates, and --strip removes the layer cleanly.
//   * SEO/CWV safe: real <img> in real markup (crawlable, no JS needed to see it), width+height on
//     every image so nothing shifts, srcset so phones pull the 1400px file not the 2400px one,
//     lazy + async decoding, and the reveal animation is one-shot, in-view, transform/clip-path
//     only -- nothing is left running. Start states are scoped under html.ukst, which only exists
//     if JS ran and the visitor has not asked for reduced motion, so crawlers and no-JS users see
//     every photo and caption.
//
//   usage: node scripts/country-pages/uk_story.js            # all eight pages
//          node scripts/country-pages/uk_story.js --only=erp
//          node scripts/country-pages/uk_story.js --strip
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const REPO = path.resolve(__dirname, '..', '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8'));

// ---------------------------------------------------------------------------------------------
// picture helper: real dimensions come from _sizes.json so width/height are never guessed
// ---------------------------------------------------------------------------------------------
function img(slug, alt, cls) {
  const master = SIZES[slug + '.jpg'];
  if (!master) throw new Error('no size recorded for ' + slug + '.jpg -- run scripts/images/fetch_stock.js first');
  // offer every tier we actually have, smallest first, so a 350px card does not pull a 1400px file
  const cand = [['-700.jpg', SIZES[slug + '-700.jpg']], ['-1400.jpg', SIZES[slug + '-1400.jpg']], ['.jpg', master]]
    .filter(([, m]) => m)
    .map(([suf, m]) => `/assets/images/library/${slug}${suf} ${m.w}w`);
  const srcset = cand.length > 1 ? ` srcset="${cand.join(', ')}"` : '';
  return `<img class="${cls || 'uks-img'}" src="/assets/images/library/${slug}.jpg"${srcset} sizes="(max-width:900px) 100vw, 92vw"`
    + ` alt="${L.esc(alt)}" width="${master.w}" height="${master.h}" loading="lazy" decoding="async" />`;
}

// ---------------------------------------------------------------------------------------------
// CSS -- one block, shared skeleton, but each variant has its own geometry
// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ============ uk_story.js : the picture layer ============ */
  .uks{ position:relative; }
  .uks-img{ display:block; width:100%; height:100%; object-fit:cover; }
  /* full-bleed without the classic 100vw bug: 100vw counts the scrollbar, so on a page with a
     vertical scrollbar a 100vw child is ~15px wider than the viewport and the whole document gains
     a horizontal scrollbar. overflow-x:clip on the section absorbs it without creating a scroll
     container (hidden is the fallback for older Safari). */
  .uks-section{ overflow-x:hidden; overflow-x:clip; }
  .uks-bleed{ width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); }
  .uks-eyebrow{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 10px; }
  .uks-cap{ font-family:var(--font-sans); font-weight:700; color:var(--ink); line-height:1.18; margin:0; }
  .uks-sub{ font-size:.88rem; color:var(--ink-soft); margin:6px 0 0; max-width:46ch; }
  .uks-n{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.12em; color:var(--orange); display:block; margin-bottom:7px; }

  /* --- variant A : CASCADE (/uk/) -- alternating full-width plates, text riding the edge --- */
  .uksA{ margin:0 0 8px; }
  .uksA .plate{ position:relative; margin:0 0 clamp(18px,3vw,34px); }
  .uksA .shot{ position:relative; overflow:hidden; border-radius:14px; aspect-ratio:21/9; background:var(--paper-alt); }
  .uksA .plate:nth-child(even) .shot{ border-radius:14px; }
  .uksA .words{ margin:16px 0 0; max-width:52ch; }
  .uksA .words .uks-cap{ font-size:clamp(1.3rem,2.5vw,2rem); }
  @media (min-width:900px){
    .uksA .plate{ display:grid; grid-template-columns:1.55fr .95fr; gap:clamp(26px,3.4vw,52px); align-items:center; }
    .uksA .plate:nth-child(even){ grid-template-columns:.95fr 1.55fr; }
    .uksA .plate:nth-child(even) .shot{ order:2; }
    .uksA .plate:nth-child(even) .words{ order:1; }
    .uksA .words{ margin:0; }
    .uksA .shot{ aspect-ratio:16/10; }
  }

  /* --- variant B : FILMSTRIP (/uk/erp/) -- the build as six numbered frames, scrolls sideways --- */
  .uksB{ margin:4px 0 6px; }
  .uksB .rail{ display:flex; gap:clamp(14px,1.8vw,24px); overflow-x:auto; scroll-snap-type:x mandatory; padding:2px 2px 18px; scrollbar-width:thin; }
  .uksB .frame{ flex:0 0 min(78vw, 460px); scroll-snap-align:start; }
  .uksB .shot{ position:relative; overflow:hidden; border-radius:12px; aspect-ratio:4/3; background:var(--paper-alt); }
  .uksB .words{ padding:13px 2px 0; }
  .uksB .words .uks-cap{ font-size:1.06rem; }
  .uksB .hint{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); margin:2px 0 0; }
  @media (min-width:1250px){ .uksB .frame{ flex:0 0 calc((100% - 5 * 24px) / 5.4); } }

  /* --- variant C : STACKED BLEED (/uk/website-development/) -- edge to edge, caption inset --- */
  .uksC .band{ position:relative; overflow:hidden; margin:0 0 clamp(14px,2vw,26px); }
  .uksC .shot{ position:relative; overflow:hidden; aspect-ratio:2/1; background:var(--navy-deep); }
  .uksC .shot::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(6,12,26,.88) 0%, rgba(6,12,26,.55) 44%, rgba(6,12,26,.06) 76%); }
  .uksC .words{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:clamp(20px,4vw,48px) clamp(18px,5vw,72px); }
  .uksC .uks-cap{ color:#fff; font-size:clamp(1.25rem,2.7vw,2.15rem); max-width:22ch; }
  .uksC .uks-sub{ color:rgba(255,255,255,.72); }
  .uksC .uks-eyebrow{ color:var(--orange); }
  @media (max-width:700px){ .uksC .shot{ aspect-ratio:4/5; } .uksC .shot::after{ background:linear-gradient(0deg, rgba(6,12,26,.92) 0%, rgba(6,12,26,.4) 52%, rgba(6,12,26,.05) 100%); } }

  /* --- variant D : EVIDENCE WALL (/uk/seo-services/) -- screens, uneven grid, one big --- */
  .uksD{ display:grid; gap:clamp(12px,1.6vw,20px); grid-template-columns:1fr; }
  .uksD .cell{ position:relative; overflow:hidden; border-radius:12px; background:var(--paper-alt); }
  .uksD .shot{ position:relative; overflow:hidden; aspect-ratio:16/10; }
  .uksD .words{ padding:14px 16px 16px; }
  .uksD .words .uks-cap{ font-size:1.02rem; }
  .uksD .cell{ border:1px solid var(--line); }
  @media (min-width:820px){
    .uksD{ grid-template-columns:repeat(6,1fr); }
    .uksD .cell:nth-child(1){ grid-column:span 4; }
    .uksD .cell:nth-child(1) .shot{ aspect-ratio:2/1; }
    .uksD .cell:nth-child(1) .words .uks-cap{ font-size:clamp(1.2rem,2vw,1.6rem); }
    .uksD .cell:nth-child(2){ grid-column:span 2; }
    .uksD .cell:nth-child(3), .uksD .cell:nth-child(4), .uksD .cell:nth-child(5){ grid-column:span 2; }
  }

  /* --- variant E : POSTCARDS (/uk/manchester/, /uk/london/) -- place first, then its sectors --- */
  .uksE .lead{ position:relative; overflow:hidden; border-radius:0; margin:0 0 clamp(14px,2vw,24px); }
  .uksE .lead .shot{ position:relative; overflow:hidden; aspect-ratio:24/9; background:var(--navy-deep); }
  .uksE .lead .shot::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(6,12,26,.8), rgba(6,12,26,.12) 62%); }
  .uksE .lead .words{ position:absolute; z-index:2; left:0; bottom:0; padding:clamp(18px,3.4vw,44px) clamp(18px,5vw,72px); }
  .uksE .lead .uks-cap{ color:#fff; font-size:clamp(1.4rem,3vw,2.4rem); }
  .uksE .lead .uks-eyebrow{ color:var(--orange); }
  .uksE .cards{ display:grid; gap:clamp(12px,1.6vw,20px); grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); }
  .uksE .card{ position:relative; overflow:hidden; border-radius:12px; border:1px solid var(--line); }
  .uksE .card .shot{ position:relative; overflow:hidden; aspect-ratio:4/3; background:var(--paper-alt); }
  .uksE .card .words{ padding:13px 15px 15px; }
  .uksE .card .uks-cap{ font-size:1rem; }
  @media (max-width:700px){ .uksE .lead .shot{ aspect-ratio:3/2; } }

  /* --- variant F : TWO COLUMNS (/uk/scotland/, /uk/reading/) -- two worlds, side by side --- */
  .uksF{ display:grid; gap:clamp(22px,3vw,46px); grid-template-columns:1fr; }
  .uksF .col > h4{ font-family:var(--font-mono); font-size:.74rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink); margin:0 0 14px; }
  .uksF .stackrow{ display:grid; gap:clamp(10px,1.4vw,16px); }
  .uksF .tile{ position:relative; overflow:hidden; border-radius:11px; border:1px solid var(--line); }
  .uksF .tile .shot{ position:relative; overflow:hidden; aspect-ratio:16/9; background:var(--paper-alt); }
  .uksF .tile .words{ padding:12px 14px 14px; }
  .uksF .tile .uks-cap{ font-size:.98rem; }
  @media (min-width:880px){ .uksF{ grid-template-columns:1fr 1fr; } }

  /* ---- the reveal : one shot, in view, then done. Nothing is left animating. ---- */
  html.ukst .uks .shot > .uks-img{ transform:scale(1.07); transition:transform 1.15s cubic-bezier(.2,.7,.2,1); }
  html.ukst .uks .shot{ clip-path:inset(0 0 100% 0); }
  html.ukst .uks .words{ opacity:0; transform:translateY(14px); }
  html.ukst .uks .in .shot{ animation:uksWipe .78s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d,0) * .09s); }
  html.ukst .uks .in .shot > .uks-img{ transform:scale(1); transition-delay:calc(var(--d,0) * .09s); }
  html.ukst .uks .in .words{ animation:uksRise .6s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d,0) * .09s + .16s); }
  @keyframes uksWipe{ from{ clip-path:inset(0 0 100% 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes uksRise{ to{ opacity:1; transform:none; } }
  @media (prefers-reduced-motion: reduce){
    html.ukst .uks .shot, html.ukst .uks .words, html.ukst .uks .shot > .uks-img{ clip-path:none !important; opacity:1 !important; transform:none !important; animation:none !important; transition:none !important; }
  }`;

// ---------------------------------------------------------------------------------------------
// JS -- adds html.ukst, then one observer, unobserving as it goes
// ---------------------------------------------------------------------------------------------
const JS = `
/* uk_story.js : reveal the picture layer once, in view, then stop observing. The html.ukst class is
   added only here, so with JS off or reduced motion on, every photo and caption is simply visible. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var groups = document.querySelectorAll('.uks');
    if (!groups.length || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('ukst');
    var units = [];
    for (var g = 0; g < groups.length; g++) {
        var kids = groups[g].querySelectorAll('.plate, .frame, .band, .cell, .tile, .lead, .card');
        for (var k = 0; k < kids.length; k++) { kids[k].style.setProperty('--d', k % 6); units.push(kids[k]); }
    }
    var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            entries[i].target.classList.add('in');
            io.unobserve(entries[i].target);
        }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    for (var u = 0; u < units.length; u++) io.observe(units[u]);
})();`;

// ---------------------------------------------------------------------------------------------
// the eight stories. Every photo appears on exactly one page (asserted below).
// ---------------------------------------------------------------------------------------------
const STORIES = {
  // ---- /uk/ : one team, three disciplines, one system -------------------------------------
  hub: {
    file: 'uk/index.html', variant: 'A', after: 'regions',
    eyebrow: 'The shape of a TechAuditPros engagement',
    head: 'What the work looks like, before anyone writes a word about it.',
    items: [
      { slug: 'uk-checking-figure-on-printout', cap: 'It nearly always starts here.', sub: 'Someone checking a figure on a printout, because no system holds the number they need and the screen cannot be trusted.', alt: 'Checking a figure on a printout away from the screen' },
      { slug: 'uk-two-colleagues-whiteboard-sticky-notes', cap: 'We walk one real order end to end.', sub: 'Enquiry to invoice, on a wall, with the people who actually do it. Every workaround gets written down in their own words.', alt: 'Two colleagues mapping a process on a whiteboard with sticky notes' },
      { slug: 'uk-two-developers-monitors-bright-office', cap: 'Then it gets built, in two-week pieces.', sub: 'On a staging URL you can click through each week. Progress you verify rather than progress you are told about.', alt: 'Two developers working on code at monitors in a bright office' },
      { slug: 'uk-warehouse-racking-pallets-wide', cap: 'Stock stops being an argument.', sub: 'One live figure per site and per bin, including what is committed and what is out with a subcontractor.', alt: 'Wide view of a warehouse filled with pallet racking' },
      { slug: 'uk-laptop-on-dark-desk-reporting', cap: 'And the month closes from the system.', sub: 'Not from three spreadsheets and somebody&rsquo;s memory. Same numbers for the floor, the office and the board.', alt: 'A laptop open on a desk showing the month&rsquo;s figures' },
    ],
  },

  // ---- /uk/erp/ : the build, as six frames ------------------------------------------------
  erp: {
    file: 'uk/erp/index.html', variant: 'B', after: 'erp-modules',
    eyebrow: 'Six frames, in order',
    head: 'The whole build, without the sales deck.',
    items: [
      { slug: 'uk-hard-hat-worker-reading-paperwork', n: '01', cap: 'Today the job travels on paper.', hint: 'Where we always start', alt: 'Worker in a hard hat reading a printed job sheet on site' },
      { slug: 'uk-operative-seated-stock-trolley', n: '02', cap: 'And the stock figure is a guess.', hint: 'The most expensive habit', alt: 'Warehouse operative sitting with a stock trolley' },
      { slug: 'uk-react-source-in-editor', n: '03', cap: 'We model it, then build it.', hint: 'Clickable before it is coded', alt: 'Component source open in a code editor' },
      { slug: 'uk-staff-walking-warehouse-aisle', n: '04', cap: 'Stock is counted where it moves.', hint: 'Scanned, not re-keyed', alt: 'Staff walking down an aisle in a busy warehouse' },
      { slug: 'uk-machine-operator-at-controls', n: '05', cap: 'Hours are booked at the machine.', hint: 'Not reconstructed at month end', alt: 'Machine operator working the controls of an industrial machine' },
      { slug: 'uk-dashboard-trends-key-metrics', n: '06', cap: 'The job closes with a real cost.', hint: 'Which is the entire point', alt: 'A reporting dashboard showing trends and key metrics' },
    ],
  },

  // ---- /uk/website-development/ : four dark full-bleed bands -------------------------------
  web: {
    file: 'uk/website-development/index.html', variant: 'C', after: 'stack',
    eyebrow: 'How the site gets made',
    head: 'Written, reviewed, handed over.',
    items: [
      { slug: 'uk-colourful-javascript-code-dark-screen', eyebrow: 'Written', cap: 'Code, not a page builder.', sub: 'Which is why it stays fast when you add the fiftieth page, and why another developer can pick it up.', alt: 'Lines of colourful JavaScript on a dark editor screen' },
      { slug: 'uk-developer-at-workstation-green', eyebrow: 'Reviewed', cap: 'A staging URL every week.', sub: 'You click it, you comment on it, we change it. No reveal at the end of the project.', alt: 'Developer working at a workstation' },
      { slug: 'uk-html-markup-on-screen', eyebrow: 'Inspectable', cap: 'Your buyers read the source.', sub: 'Technical buyers do check. Semantic markup, real headings, no framework noise where none is needed.', alt: 'HTML markup for a web build displayed on screen' },
      { slug: 'uk-performance-analytics-on-laptop', eyebrow: 'Measured', cap: 'Core Web Vitals, on real devices.', sub: 'LCP under 2.5s, INP under 200ms, CLS under 0.1 &mdash; tested on a mid-range Android on 4G, not on our desks.', alt: 'Performance analytics graphs open on a laptop screen' },
    ],
  },

  // ---- /uk/seo-services/ : the evidence wall -----------------------------------------------
  seo: {
    file: 'uk/seo-services/index.html', variant: 'D', after: 'aeo-geo',
    eyebrow: 'What you actually get sent',
    head: 'Search work you can check, every month.',
    items: [
      { slug: 'uk-rising-line-graph-dark', cap: 'Positions, tracked from day one.', sub: 'The same keyword set every month, including the ones that went the wrong way. A report that only shows wins is marketing, not measurement.', alt: 'A rising line graph against a dark reporting background' },
      { slug: 'uk-monitoring-screen-live', cap: 'What people really typed.', alt: 'A live monitoring screen in an operations room' },
      { slug: 'uk-bar-chart-on-screen', cap: 'Clicks and impressions, split by page.', alt: 'A bar chart displayed on a reporting screen' },
      { slug: 'uk-analytics-screengrab-monitor', cap: 'Speed and Core Web Vitals.', alt: 'An analytics report open on a monitor' },
      { slug: 'uk-explaining-figures-on-paper', cap: 'And a call to go through it.', alt: 'Talking through the month&rsquo;s figures line by line' },
    ],
  },

  // ---- /uk/manchester/ : the city, then its sectors ---------------------------------------
  manchester: {
    file: 'uk/manchester/index.html', variant: 'E', after: 'mcr-sectors',
    eyebrow: 'Greater Manchester',
    head: 'The work we are actually asked for here.',
    lead: { slug: 'uk-manchester-towers-behind-brick-warehouses', eyebrow: 'Greater Manchester', cap: 'New towers, old mills, and a lot of production in between.', alt: 'Modern towers rising behind historic red-brick warehouses in Manchester' },
    items: [
      { slug: 'uk-textile-factory-machinery-pipes', cap: 'Textiles &amp; technical fabrics', sub: 'Batch and roll goods, where a metre is not a unit and yield matters.', alt: 'Industrial textile factory floor with machinery and overhead pipework' },
      { slug: 'uk-grinding-steel-beam-sparks', cap: 'Engineering &amp; fabrication', sub: 'Job shops with routing, subcontract operations and a real cost per job.', alt: 'Fabricator grinding a steel beam, sparks flying' },
      { slug: 'uk-worker-filling-food-trays-conveyor', cap: 'Food &amp; drink', sub: 'Recipes rather than parts lists: yields, allergens and traceability that answers a recall.', alt: 'Worker filling food trays on a conveyor belt' },
      { slug: 'uk-forklift-driver-loading', cap: 'Distribution round the M60', sub: 'Pick, pack, courier and returns, with stock that matches the shelf.', alt: 'Forklift driver moving a load in a warehouse' },
      { slug: 'uk-manchester-yellow-tram', cap: 'And offices in town', sub: 'Professional services with project costing, approvals and a month end that closes.', alt: 'A yellow Metrolink tram on a Manchester street' },
    ],
  },

  // ---- /uk/reading/ : two audiences, two columns ------------------------------------------
  reading: {
    file: 'uk/reading/index.html', variant: 'F', after: 'rdg-speed',
    eyebrow: 'Thames Valley',
    head: 'Two people have to be convinced here.',
    columns: [
      { title: 'The technical buyer', items: [
        { slug: 'uk-page-source-on-screen', cap: 'They open the source first.', sub: 'Headers, schema, bundle size, whether the markup means anything. In this corridor that happens before the first call.', alt: 'Page source open on a computer screen' },
        { slug: 'uk-line-graph-on-screen', cap: 'And they already ran Lighthouse.', sub: 'The number they saw is the number we design to. There is no version of this where we argue with their measurement.', alt: 'A site performance report open on screen' },
        { slug: 'uk-analyst-in-glasses-at-laptop', cap: 'Then they check who built it.', sub: 'Which is why every build is handed over in your repository, in your hosting account, documented.', alt: 'An analyst working through a technical report on a laptop' },
      ] },
      { title: 'The person on the 07:42', items: [
        { slug: 'uk-phone-on-public-transport', cap: 'Read one-handed, on a moving train.', sub: 'Paddington to Reading is twenty-five minutes of patchy signal. A site that only works at a desk fails the buyer who reads it here.', alt: 'Passenger using a smartphone on public transport' },
        { slug: 'uk-crowded-train-carriage', cap: 'On 4G, in a full carriage.', sub: 'Which is the connection we test on: a mid-range Android on throttled mobile data, not a fibre line in an office.', alt: 'A crowded commuter train carriage' },
        { slug: 'uk-platform-checking-phone', cap: 'And it must survive a dropped signal.', sub: 'Thumb-reachable actions, real tap targets, and forms that do not empty themselves when the tunnel arrives.', alt: 'Commuter checking a phone on a station platform' },
      ] },
    ],
  },

  // ---- /uk/london/ : the city, then what London firms ask for -----------------------------
  london: {
    file: 'uk/london/index.html', variant: 'E', after: 'ldn-where',
    eyebrow: 'London',
    head: 'Same city, four different problems.',
    lead: { slug: 'uk-london-skyline-across-thames', eyebrow: 'London', cap: 'From the City to the industrial belt, and the two need different software.', alt: 'The City of London skyline seen across the Thames' },
    items: [
      { slug: 'uk-london-canary-wharf-towers', cap: 'The City &amp; Canary Wharf', sub: 'Approvals, audit trails and reporting that survives a due-diligence request.', alt: 'Canary Wharf towers in London' },
      { slug: 'uk-containers-stacked-high', cap: 'Importers &amp; wholesalers', sub: 'Commodity codes, origin evidence, duty and import VAT carried into landed cost.', alt: 'Shipping containers stacked high at a container terminal' },
      { slug: 'uk-worker-beside-stacked-cartons', cap: 'Park Royal &amp; the belt', sub: 'Production and distribution where stock accuracy is the whole job.', alt: 'Worker standing beside stacked cartons in a stockroom' },
      { slug: 'uk-four-colleagues-laptops-board-meeting', cap: 'Multi-site operators', sub: 'One system across branches, one set of numbers, multi-currency where you trade &mdash; and one person accountable for it.', alt: 'A management team reviewing figures from several branches' },
    ],
  },

  // ---- /uk/scotland/ : field vs office ----------------------------------------------------
  scotland: {
    file: 'uk/scotland/index.html', variant: 'F', after: 'sco-field',
    eyebrow: 'Aberdeen and Edinburgh',
    head: 'One page, two completely different jobs.',
    columns: [
      { title: 'Aberdeen &mdash; field first', items: [
        { slug: 'uk-offshore-rigs-on-water', cap: 'The work happens offshore.', sub: 'Or on a yard, or at an installation &mdash; somewhere with no signal and no time for a laptop.', alt: 'Offshore rigs standing on open water' },
        { slug: 'uk-welder-helmet-gloves-sparks', cap: 'Then it has to become a costed job.', sub: 'Hours, materials, inspection results and certificates, attached to the job rather than a folder.', alt: 'Welder in protective helmet and gloves working steel' },
        { slug: 'uk-operator-protective-gear-machine', cap: 'Captured offline, synced later.', sub: 'If the app needs a connection to record work, the work gets recorded on paper instead.', alt: 'Operator in protective gear working a fabrication machine' },
      ] },
      { title: 'Edinburgh &mdash; office first', items: [
        { slug: 'uk-edinburgh-skyline-golden-hour-monument', cap: 'Process, not production.', sub: 'Onboarding, project costing, approvals and a month end that does not take a week.', alt: 'The Dugald Stewart Monument overlooking the Edinburgh skyline at golden hour' },
        { slug: 'uk-board-room-laptop-review', cap: 'Signed off by committee.', sub: 'Financial and professional services buy software the way they buy everything else: with a paper trail and a named owner.', alt: 'A board room review with a laptop open on the table' },
        { slug: 'uk-monitor-graph-closeup', cap: 'And it must behave like a product.', sub: 'The fintech and software layer here expects the internal tool to be as good as the one they ship to customers.', alt: 'Live market data on a trading screen' },
      ] },
    ],
  },
};

// ---------------------------------------------------------------------------------------------
// renderers
// ---------------------------------------------------------------------------------------------
const shot = (it) => `                    <div class="shot">${img(it.slug, it.alt)}</div>`;
const words = (it, tag) => {
  const l = [`                    <div class="words">`];
  if (it.n) l.push(`                        <span class="uks-n">${it.n}</span>`);
  if (it.eyebrow) l.push(`                        <p class="uks-eyebrow">${it.eyebrow}</p>`);
  l.push(`                        <p class="uks-cap">${it.cap}</p>`);
  if (it.sub) l.push(`                        <p class="uks-sub">${it.sub}</p>`);
  if (it.hint) l.push(`                        <p class="hint">${it.hint}</p>`);
  l.push(`                    </div>`);
  return l.join('\n');
};

function renderA(s) {
  return `        <div class="uks uksA">\n`
    + s.items.map(it => `            <div class="plate">\n${shot(it)}\n${words(it)}\n            </div>`).join('\n')
    + `\n        </div>`;
}
function renderB(s) {
  return `        <div class="uks uksB">\n            <div class="rail">\n`
    + s.items.map(it => `                <div class="frame">\n${shot(it)}\n${words(it)}\n                </div>`).join('\n')
    + `\n            </div>\n        </div>`;
}
function renderC(s) {
  return `        <div class="uks uksC">\n`
    + s.items.map(it => `            <div class="band uks-bleed">\n${shot(it)}\n${words(it)}\n            </div>`).join('\n')
    + `\n        </div>`;
}
function renderD(s) {
  return `        <div class="uks uksD">\n`
    + s.items.map(it => `            <div class="cell">\n${shot(it)}\n${words(it)}\n            </div>`).join('\n')
    + `\n        </div>`;
}
function renderE(s) {
  return `        <div class="uks uksE">\n`
    + `            <div class="lead uks-bleed">\n${shot(s.lead)}\n${words(s.lead)}\n            </div>\n`
    + `            <div class="cards">\n`
    + s.items.map(it => `                <div class="card">\n${shot(it)}\n${words(it)}\n                </div>`).join('\n')
    + `\n            </div>\n        </div>`;
}
function renderF(s) {
  return `        <div class="uks uksF">\n`
    + s.columns.map(c => `            <div class="col">\n                <h4>${c.title}</h4>\n                <div class="stackrow">\n`
      + c.items.map(it => `                    <div class="tile">\n${shot(it)}\n${words(it)}\n                    </div>`).join('\n')
      + `\n                </div>\n            </div>`).join('\n')
    + `\n        </div>`;
}
const RENDER = { A: renderA, B: renderB, C: renderC, D: renderD, E: renderE, F: renderF };

// ---------------------------------------------------------------------------------------------
// injection
// ---------------------------------------------------------------------------------------------
const M0 = '<!-- uk-story:start -->', M1 = '<!-- uk-story:end -->';
const C0 = '/* uk-story-css:start */', C1 = '/* uk-story-css:end */';
const J0 = '/* uk-story-js:start */', J1 = '/* uk-story-js:end */';

function stripLayer(s) {
  return s
    .replace(new RegExp('[ \\t]*' + M0 + '[\\s\\S]*?' + M1 + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + C0.replace(/[*/]/g, '\\$&') + '[\\s\\S]*?' + C1.replace(/[*/]/g, '\\$&') + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + J0.replace(/[*/]/g, '\\$&') + '[\\s\\S]*?' + J1.replace(/[*/]/g, '\\$&') + '\\n?', 'g'), '');
}

function apply(key, story, strip) {
  const rel = story.file;
  let s = L.read(rel);
  s = stripLayer(s);                                     // idempotent: always rebuild from clean
  if (strip) { L.write(rel, s); return 'stripped'; }

  // 1. CSS, just before </style> of the first stylesheet
  const styleEnd = s.indexOf('</style>');
  if (styleEnd < 0) throw new Error('no </style> in ' + rel);
  s = s.slice(0, styleEnd) + '\n' + C0 + CSS + '\n' + C1 + '\n' + s.slice(styleEnd);

  // 2. the section itself, immediately after the anchor section closes
  const at = s.indexOf('id="' + story.after + '"');
  if (at < 0) throw new Error('anchor section id="' + story.after + '" not found in ' + rel);
  const close = s.indexOf('\n</section>', at);
  if (close < 0) throw new Error('could not find the end of section ' + story.after + ' in ' + rel);
  const insertAt = close + '\n</section>'.length;

  const body = RENDER[story.variant](story);
  const block = [
    '', M0,
    '<section class="tap-section uks-section">',
    '    <div class="container">',
    '        <p class="section-label">' + story.eyebrow + '</p>',
    '        <h2 class="section-title">' + story.head + '</h2>',
    body,
    '    </div>',
    '</section>',
    M1,
  ].join('\n');
  s = s.slice(0, insertAt) + block + s.slice(insertAt);

  // 3. JS, just before the closing </body>
  const bodyEnd = s.lastIndexOf('</body>');
  if (bodyEnd < 0) throw new Error('no </body> in ' + rel);
  s = s.slice(0, bodyEnd) + '<script>\n' + J0 + JS + '\n' + J1 + '\n</script>\n' + s.slice(bodyEnd);

  L.must(s, M0, 1);
  L.must(s, 'class="uks ', 1);
  L.write(rel, s);
  const n = (body.match(/<img /g) || []).length;
  return n + ' photos, variant ' + story.variant;
}

// ---------------------------------------------------------------------------------------------
const args = process.argv.slice(2);
const strip = args.includes('--strip');
const only = (args.find(a => a.startsWith('--only=')) || '').slice(7);

// no photo may appear on two pages -- PLAN-UK 6c, each page owns its own content
const seen = {};
for (const [k, st] of Object.entries(STORIES)) {
  const all = (st.items || []).concat(st.lead ? [st.lead] : []).concat((st.columns || []).flatMap(c => c.items));
  for (const it of all) {
    if (seen[it.slug]) throw new Error('photo ' + it.slug + ' used on both ' + seen[it.slug] + ' and ' + k);
    seen[it.slug] = k;
  }
}

for (const [k, st] of Object.entries(STORIES)) {
  if (only && k !== only) continue;
  console.log(('  ' + k).padEnd(16) + apply(k, st, strip));
}
console.log((strip ? 'stripped' : 'applied') + ' -- ' + Object.keys(seen).length + ' distinct photos, no reuse across pages');
