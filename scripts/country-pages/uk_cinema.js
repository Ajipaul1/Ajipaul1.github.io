'use strict';
// uk_cinema.js -- /uk/ ONLY. The owner asked for this page to be redesigned so the story is told by
// photographs and scrolling, "like a movie", and gave authority to change the design.
//
// So /uk/ becomes a six-act picture narrative, in order, with the argument carried by images and
// three-to-eight-word titles. A visitor who reads nothing still gets: you run on paper -> we watch
// one order -> we build it -> the floor works -> the numbers close -> here is where we do it.
//
//   ACT 01  THE BEFORE      paper, binders, a screen of numbers with no system behind it
//   ACT 02  THE AUDIT       one order followed across a wall, with the people who do it
//   ACT 03  THE BUILD       modelled, built in two-week pieces, on a staging URL
//   ACT 04  THE FLOOR       where it has to survive: production, stock, fabrication, batch
//   ACT 05  THE NUMBERS     one figure, month end out of the system
//   ACT 06  THE MAP         four UK markets, each linking to its own page
//
// HOW IT MOVES, without hurting Core Web Vitals or SEO:
//   * Real <img> markup with width/height and srcset. Crawlable, no CLS, phones pull the 1400px file.
//   * The cinematic feel comes from CSS scroll-driven animation (animation-timeline: view()) inside
//     an @supports block. That runs on the compositor, costs no main-thread work, needs no JS, and
//     simply does not apply in browsers without it -- where the page is a clean static photo essay.
//   * The one-shot curtain reveal reuses the same IntersectionObserver discipline as uk_story.js:
//     add a class, unobserve, nothing left running. Start states live under html.ukc so JS-off and
//     reduced-motion visitors see every photo and every word.
//   * The existing hero, answer block, FAQ, schema and closing CTA band are untouched.
//
//   usage: node scripts/country-pages/uk_cinema.js
//          node scripts/country-pages/uk_cinema.js --strip
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const REPO = path.resolve(__dirname, '..', '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8'));
const FILE = 'uk/index.html';

function img(slug, alt, sizesAttr) {
  const m = SIZES[slug + '.jpg'];
  if (!m) throw new Error('no size recorded for ' + slug + '.jpg');
  // offer every tier we actually have, smallest first -- the opening montage frames are ~290px wide
  const cand = [['-700.jpg', SIZES[slug + '-700.jpg']], ['-1400.jpg', SIZES[slug + '-1400.jpg']], ['.jpg', m]]
    .filter(([, x]) => x)
    .map(([suf, x]) => `/assets/images/library/${slug}${suf} ${x.w}w`);
  const srcset = cand.length > 1 ? ` srcset="${cand.join(', ')}"` : '';
  return `<img class="ukc-img" src="/assets/images/library/${slug}.jpg"${srcset} sizes="${sizesAttr || '100vw'}"`
    + ` alt="${L.esc(alt)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async" />`;
}

// =============================================================================================
// the six acts
// =============================================================================================
const ACTS = [
  {
    n: '01', kind: 'strip', tone: 'dark',
    label: 'Act one',
    title: 'This is what it looks like before we start.',
    lede: 'Not a criticism. Almost every business that calls us is running on some version of this, and it worked right up until it did not.',
    shots: [
      { slug: 'uk-stacks-of-paper-and-folders', cap: 'The job travels on paper.', alt: 'Stacks of paper documents and file folders' },
      { slug: 'uk-rows-of-filing-cabinets', cap: 'Last year lives in a drawer.', alt: 'Rows of old filing cabinets with handwritten labels' },
      { slug: 'uk-printed-numbers-closeup', cap: 'And the real system is a spreadsheet.', alt: 'Printed rows of figures, the spreadsheet the business actually runs on' },
      { slug: 'uk-desk-papers-calculator-tray', cap: 'Checked by hand, every month.', alt: 'A desk covered with papers, a calculator and an in-tray' },
    ],
  },
  {
    n: '02', kind: 'wide', tone: 'light',
    label: 'Act two',
    title: 'We follow one real order. That is the whole first step.',
    lede: 'Enquiry to invoice, on a wall, with the people who actually do it &mdash; not a questionnaire, and not a demo of our software. Every workaround gets written down in their words, and the map that comes out is yours whether or not you carry on.',
    hero: { slug: 'uk-planning-on-glass-panel', alt: 'Colleagues mapping a process on a glass panel', cap: 'One order, one wall, the people who do the work.' },
    shots: [
      { slug: 'uk-whiteboard-session-two-people', cap: 'Every step, in their words.', alt: 'Two people working through a process diagram at a whiteboard' },
      { slug: 'uk-two-professionals-in-discussion', cap: 'Including the parts nobody documents.', alt: 'Two professionals talking through a step in the process' },
      { slug: 'uk-colleagues-checking-paper-file', cap: 'And the workaround everyone forgot was a workaround.', alt: 'Two colleagues checking figures in a paper file' },
    ],
  },
  {
    n: '03', kind: 'split', tone: 'dark',
    label: 'Act three',
    title: 'Then it gets built, in two-week pieces you can click.',
    lede: 'Modelled and clickable before any production code. Each fortnight you get a staging URL and a written note of what changed. Progress you verify, not progress you are told about.',
    shots: [
      { slug: 'uk-team-collaborating-modern-office', cap: 'Modelled first.', sub: 'Data model and screens you approve before anything is coded.', alt: 'A delivery team working through a data model together' },
      { slug: 'uk-desk-laptop-focused-work', cap: 'Built in increments.', sub: 'Two weeks at a time, on a staging system, on your own data.', alt: 'Focused development work at a laptop' },
      { slug: 'uk-presenting-to-team-laptops-table', cap: 'Reviewed with your team.', sub: 'The people who will use it break it before your customers can.', alt: 'Presenting a working module to the client team' },
      { slug: 'uk-four-colleagues-laptops-board-meeting', cap: 'Signed off, then the next piece.', sub: 'Nothing moves on until the last piece is in genuine daily use.', alt: 'A review meeting signing off a delivered module' },
    ],
  },
  {
    n: '04', kind: 'rail', tone: 'light',
    label: 'Act four',
    title: 'And then it has to survive a real working day.',
    lede: 'This is the part a demo never shows you. Scanned in a cold warehouse with gloves on, booked at a machine, run on a batch line, sent out to a subcontractor and brought back. If it does not work here, it does not work.',
    shots: [
      { slug: 'uk-production-floor-people-working', cap: 'On the production floor', alt: 'Production staff working along a busy manufacturing floor' },
      { slug: 'uk-two-colleagues-warehouse-aisle', cap: 'In the racking, with gloves on', alt: 'Two colleagues walking a warehouse aisle lined with racking' },
      { slug: 'uk-forklift-yellow-warehouse', cap: 'On a forklift, one-handed', alt: 'Forklift moving stock inside a warehouse' },
      { slug: 'uk-operator-running-machine-closeup', cap: 'On the pallet truck, scanning', alt: 'Operative working the controls of a powered pallet truck' },
      { slug: 'uk-welder-at-work-factory', cap: 'Out at the subcontractor', alt: 'Welder working steel inside a fabrication shop' },
      { slug: 'uk-bottles-filling-automated-line', cap: 'On a batch line, by recipe', alt: 'Bottles being filled on an automated production line' },
      { slug: 'uk-food-plant-staff-lab-coats-masks', cap: 'Under traceability rules', alt: 'Production staff in lab coats and masks on a food manufacturing floor' },
      { slug: 'uk-colourful-stacking-crates', cap: 'And out of the door', alt: 'Stacking crates ready for despatch' },
    ],
  },
  {
    n: '05', kind: 'wide', tone: 'dark',
    label: 'Act five',
    title: 'Until everyone is arguing from the same number.',
    lede: 'Which is the entire point of the exercise. Stock the floor believes, a cost per job that is real, VAT records ready for Making Tax Digital, and a month end that comes out of the system instead of out of three spreadsheets and somebody&rsquo;s memory.',
    hero: { slug: 'uk-analytics-screengrab-monitor', alt: 'An operational report open on a monitor', cap: 'One figure. Floor, office and board.' },
    shots: [
      { slug: 'uk-team-round-table-laptops', cap: 'The same report every month.', alt: 'A team reviewing the monthly report together' },
      { slug: 'uk-two-colleagues-at-table-working', cap: 'Including the parts that went the wrong way.', alt: 'Two colleagues working through the month&rsquo;s figures' },
      { slug: 'uk-office-desk-laptop-working', cap: 'And a year end your accountant can use.', alt: 'Preparing year-end figures at a desk' },
    ],
  },
  {
    n: '06', kind: 'map', tone: 'light',
    label: 'Act six',
    title: 'Four UK markets, four different problems.',
    lede: 'We work remotely from Kochi for clients across the United Kingdom. Each of these pages is written for what that place actually asks us for &mdash; not the same page with the city name swapped.',
    shots: [
      { slug: 'uk-london-river-and-bridge', cap: 'London', sub: 'The City, the Wharf, and the industrial belt &mdash; and they need different software.', href: '/uk/london/', alt: 'The Thames and a London bridge with the city behind' },
      { slug: 'uk-manchester-red-brick-street', cap: 'Manchester', sub: 'A broad production base: textiles, food, plastics, fabrication, distribution round the M60.', href: '/uk/manchester/', alt: 'Manchester street lined with tall red-brick buildings' },
      { slug: 'uk-two-passengers-on-train', cap: 'Reading &amp; the Thames Valley', sub: 'Technical buyers who read your source before the first call, on a train, on 4G.', href: '/uk/reading/', alt: 'Two passengers on a Thames Valley commuter train' },
      { slug: 'uk-edinburgh-balmoral-clock-tower', cap: 'Scotland', sub: 'Aberdeen works in the field, Edinburgh works in the office. One page, two jobs.', href: '/uk/scotland/', alt: 'The Balmoral clock tower and Scott Monument in Edinburgh' },
    ],
  },
];

// =============================================================================================
// CSS
// =============================================================================================
const CSS = `
  /* ================= uk_cinema.js : /uk/ told as six acts of pictures ================= */
  .ukc{ position:relative; }
  .ukc-img{ display:block; width:100%; height:100%; object-fit:cover; }
  /* full-bleed without the 100vw scrollbar bug -- see .ukc-act overflow below */
  .ukc-act{ position:relative; overflow-x:hidden; overflow-x:clip; padding:clamp(52px,7vw,104px) 0; }
  .ukc-act.tone-dark{ background:var(--navy-deep); color:#fff; }
  .ukc-act.tone-light{ background:var(--paper); }
  .ukc-act + .ukc-act{ border-top:1px solid rgba(255,255,255,.06); }
  .ukc-act.tone-light + .ukc-act.tone-light{ border-top:1px solid var(--line); }
  .ukc-head{ max-width:1180px; width:92%; margin:0 auto clamp(26px,3.6vw,52px); }
  .ukc-slate{ display:flex; align-items:baseline; gap:14px; margin:0 0 14px; }
  .ukc-slate b{ font-family:var(--font-mono); font-size:clamp(2.2rem,5vw,4.4rem); line-height:.85; font-weight:700; color:var(--orange); letter-spacing:-.02em; }
  .ukc-slate span{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint); }
  .tone-dark .ukc-slate span{ color:rgba(255,255,255,.5); }
  .ukc-title{ font-size:clamp(1.6rem,3.6vw,3rem); line-height:1.08; font-weight:800; margin:0 0 14px; max-width:26ch; color:var(--ink); }
  .tone-dark .ukc-title{ color:#fff; }
  .ukc-lede{ font-size:clamp(.95rem,1.15vw,1.06rem); line-height:1.66; color:var(--ink-soft); margin:0; max-width:62ch; }
  .tone-dark .ukc-lede{ color:rgba(255,255,255,.72); }
  .ukc-cap{ font-weight:700; line-height:1.2; margin:0; color:var(--ink); }
  .tone-dark .ukc-cap{ color:#fff; }
  .ukc-sub{ font-size:.86rem; line-height:1.55; color:var(--ink-soft); margin:6px 0 0; }
  .tone-dark .ukc-sub{ color:rgba(255,255,255,.62); }
  .ukc-shot{ position:relative; overflow:hidden; background:rgba(120,130,150,.14); }

  /* ---- kind: STRIP -- four frames edge to edge, the opening montage ---- */
  .ukcStrip{ display:grid; grid-template-columns:1fr; gap:3px; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); }
  .ukcStrip .f{ position:relative; }
  .ukcStrip .ukc-shot{ aspect-ratio:4/3; }
  .ukcStrip .w{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:clamp(14px,2vw,26px); background:linear-gradient(0deg, rgba(6,12,26,.9), rgba(6,12,26,0)); }
  .ukcStrip .ukc-cap{ color:#fff; font-size:clamp(.95rem,1.5vw,1.2rem); }
  @media (min-width:760px){ .ukcStrip{ grid-template-columns:repeat(4,1fr); } .ukcStrip .ukc-shot{ aspect-ratio:3/4; } }

  /* ---- kind: WIDE -- one cinematic plate, then three smaller beats ---- */
  .ukcWide .plate{ position:relative; overflow:hidden; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); margin-bottom:clamp(16px,2.2vw,30px); }
  .ukcWide .plate .ukc-shot{ aspect-ratio:21/9; }
  .ukcWide .plate .w{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:clamp(20px,4vw,54px) max(4vw, calc(50% - 590px + 4vw)); background:linear-gradient(0deg, rgba(6,12,26,.86), rgba(6,12,26,.06) 78%); }
  .ukcWide .plate .ukc-cap{ color:#fff; font-size:clamp(1.15rem,2.6vw,2.1rem); max-width:24ch; }
  .ukcWide .beats{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(12px,1.6vw,22px); grid-template-columns:repeat(auto-fit,minmax(215px,1fr)); }
  .ukcWide .beat .ukc-shot{ aspect-ratio:16/10; border-radius:11px; }
  .ukcWide .beat .w{ padding:12px 2px 0; }
  .ukcWide .beat .ukc-cap{ font-size:.98rem; }
  @media (max-width:700px){ .ukcWide .plate .ukc-shot{ aspect-ratio:3/2; } }

  /* ---- kind: SPLIT -- a 2x2 of tall frames, the build in four moves ---- */
  .ukcSplit{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(14px,2vw,26px); grid-template-columns:1fr; }
  .ukcSplit .q .ukc-shot{ aspect-ratio:16/10; border-radius:12px; }
  .ukcSplit .q .w{ padding:14px 2px 0; }
  .ukcSplit .q .ukc-cap{ font-size:1.06rem; }
  @media (min-width:820px){
    .ukcSplit{ grid-template-columns:1fr 1fr; }
    .ukcSplit .q:nth-child(1) .ukc-shot, .ukcSplit .q:nth-child(4) .ukc-shot{ aspect-ratio:4/3; }
  }

  /* ---- kind: RAIL -- eight frames of the working day, scrolls sideways ---- */
  .ukcRail{ width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); }
  .ukcRail .track{ display:flex; gap:8px; overflow-x:auto; scroll-snap-type:x mandatory; padding:0 max(4vw, calc(50% - 590px)) 20px; scrollbar-width:thin; }
  .ukcRail .f{ flex:0 0 min(70vw,340px); scroll-snap-align:center; }
  .ukcRail .ukc-shot{ aspect-ratio:3/4; border-radius:10px; }
  .ukcRail .w{ padding:11px 2px 0; }
  .ukcRail .ukc-cap{ font-size:.92rem; }
  .ukcRail .rail-note{ max-width:1180px; width:92%; margin:6px auto 0; font-family:var(--font-mono); font-size:.66rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); }

  /* ---- kind: MAP -- the four markets, each a door ---- */
  .ukcMap{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(14px,2vw,24px); grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); }
  .ukcMap a.door{ display:block; text-decoration:none; border:1px solid var(--line); border-radius:13px; overflow:hidden; background:var(--paper); transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
  .ukcMap a.door:hover{ transform:translateY(-3px); border-color:var(--orange); box-shadow:0 14px 34px rgba(15,23,42,.11); }
  .ukcMap .ukc-shot{ aspect-ratio:5/4; }
  .ukcMap .w{ padding:15px 17px 18px; }
  .ukcMap .ukc-cap{ font-size:1.1rem; }
  .ukcMap .go{ display:inline-flex; align-items:center; gap:6px; margin-top:11px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:var(--orange); }

  /* ================= the reveal : one shot, in view, then finished ================= */
  html.ukc-on .ukc .ukc-shot{ clip-path:inset(0 0 100% 0); }
  html.ukc-on .ukc .ukc-shot > .ukc-img{ transform:scale(1.08); transition:transform 1.3s cubic-bezier(.18,.72,.2,1); }
  html.ukc-on .ukc .w{ opacity:0; transform:translateY(15px); }
  html.ukc-on .ukc .lit .ukc-shot{ animation:ukcCurtain .82s cubic-bezier(.32,0,.18,1) forwards; animation-delay:calc(var(--d,0) * .085s); }
  html.ukc-on .ukc .lit .ukc-shot > .ukc-img{ transform:scale(1); transition-delay:calc(var(--d,0) * .085s); }
  html.ukc-on .ukc .lit .w{ animation:ukcLift .58s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d,0) * .085s + .2s); }
  html.ukc-on .ukc-head{ opacity:0; transform:translateY(16px); }
  html.ukc-on .ukc-head.lit{ animation:ukcLift .62s cubic-bezier(.2,.7,.2,1) forwards; }
  @keyframes ukcCurtain{ from{ clip-path:inset(0 0 100% 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes ukcLift{ to{ opacity:1; transform:none; } }

  /* ================= the movie part : scroll-driven, compositor only, no JS =================
     animation-timeline: view() ties the animation to the element's own progress through the
     viewport. It runs off the main thread, so it costs nothing in INP, and browsers without it
     simply never apply the block -- the page stays a clean static photo essay. */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) and (min-width:760px) {
      .ukcStrip .f, .ukcWide .plate, .ukcRail .f, .ukcSplit .q{ view-timeline-name:--f; }
      .ukcStrip .f .ukc-img, .ukcWide .plate .ukc-img, .ukcSplit .q .ukc-img{
        animation:ukcDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%;
      }
      /* the opening montage grows taller as it passes -- the "camera pushing in" beat */
      .ukcStrip .f .ukc-shot{ animation:ukcTall linear both; animation-timeline:view(); animation-range:entry 10% cover 55%; }
      /* act titles ease up and settle */
      .ukc-act .ukc-head{ animation:ukcSettle linear both; animation-timeline:view(); animation-range:entry 5% entry 90%; }
    }
  }
  @keyframes ukcDrift{ from{ transform:scale(1.13) translateY(-2.4%); } to{ transform:scale(1.13) translateY(2.4%); } }
  @keyframes ukcTall{ from{ aspect-ratio:4/3; } to{ aspect-ratio:3/4; } }
  /* movement only -- never opacity. This runs without JS (scroll-driven CSS needs none), so any
     fade here would leave every below-the-fold heading faded until the visitor scrolled to it. */
  @keyframes ukcSettle{ from{ transform:translateY(26px); } to{ transform:none; } }


  /* ================= the phone cut =================
     Not a narrowed desktop: the rail gives one frame almost the whole screen so a swipe lands on
     a single picture, the opening montage becomes a 5:4 filmstrip, and the scrims are heavier
     because at 390px the image detail is much denser per pixel behind the white text. */
  @media (max-width:700px){
    .ukc-act{ padding:38px 0 42px; }
    .ukc-head{ width:88%; margin-bottom:22px; }
    .ukc-slate{ gap:10px; margin-bottom:10px; }
    .ukc-slate b{ font-size:2.6rem; }
    .ukc-title{ font-size:1.55rem; line-height:1.14; max-width:none; }
    .ukc-lede{ font-size:.96rem; line-height:1.6; }

    /* opening montage: a filmstrip, hairline gaps, taller frames */
    .ukcStrip{ gap:2px; }
    .ukcStrip .ukc-shot{ aspect-ratio:5/4; }
    .ukcStrip .w{ padding:14px 18px 16px; background:linear-gradient(0deg, rgba(6,12,26,.94), rgba(6,12,26,.05) 82%); }
    .ukcStrip .ukc-cap{ font-size:1.08rem; }

    /* the wide plate: taller crop so faces survive, heavier scrim */
    .ukcWide .plate .ukc-shot{ aspect-ratio:5/4; }
    .ukcWide .plate .w{ padding:20px 20px 22px; background:linear-gradient(0deg, rgba(6,12,26,.93), rgba(6,12,26,.04) 76%); }
    .ukcWide .plate .ukc-cap{ font-size:1.32rem; max-width:none; }
    .ukcWide .beats{ width:88%; gap:16px; }

    /* the build 2x2 stacks, but keep the pictures generous */
    .ukcSplit{ width:88%; gap:18px; }
    .ukcSplit .q .ukc-shot{ aspect-ratio:4/3; }

    /* the working-day rail: one frame per swipe */
    .ukcRail .track{ gap:6px; padding:0 6vw 16px; }
    .ukcRail .f{ flex:0 0 82vw; }
    .ukcRail .ukc-shot{ aspect-ratio:4/5; }
    .ukcRail .ukc-cap{ font-size:1rem; }
    .ukcRail .rail-note{ width:88%; }

    /* the four markets: full-width doors, bigger tap area */
    .ukcMap{ width:88%; gap:16px; }
    .ukcMap .ukc-shot{ aspect-ratio:16/10; }
    .ukcMap .w{ padding:16px 18px 20px; }
    .ukcMap .go{ margin-top:13px; padding:4px 0; }
  }

  @media (prefers-reduced-motion: reduce){
    html.ukc-on .ukc .ukc-shot, html.ukc-on .ukc .w, html.ukc-on .ukc .ukc-shot > .ukc-img, html.ukc-on .ukc-head{
      clip-path:none !important; opacity:1 !important; transform:none !important; animation:none !important; transition:none !important;
    }
  }`;

// =============================================================================================
// JS -- the one-shot curtain, for browsers without scroll-driven animation and for the phone
// =============================================================================================
const JS = `
/* uk_cinema.js : light each frame once as it arrives, then stop watching it. html.ukc-on is added
   only here, so with JS off or reduced motion on the whole photo essay is simply visible. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var frames = document.querySelectorAll('.ukc .f, .ukc .plate, .ukc .beat, .ukc .q, .ukc a.door, .ukc-head');
    if (!frames.length || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('ukc-on');
    var acts = document.querySelectorAll('.ukc-act');
    for (var a = 0; a < acts.length; a++) {
        var kids = acts[a].querySelectorAll('.f, .plate, .beat, .q, a.door');
        for (var k = 0; k < kids.length; k++) kids[k].style.setProperty('--d', k % 8);
    }
    var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            entries[i].target.classList.add('lit');
            io.unobserve(entries[i].target);
        }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    for (var f = 0; f < frames.length; f++) io.observe(frames[f]);
})();`;

// =============================================================================================
// renderers
// =============================================================================================
const ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function head(a) {
  return [
    '    <div class="ukc-head">',
    '        <p class="ukc-slate"><b>' + a.n + '</b> <span>' + a.label + '</span></p>',
    '        <h2 class="ukc-title">' + a.title + '</h2>',
    '        <p class="ukc-lede">' + a.lede + '</p>',
    '    </div>',
  ].join('\n');
}
const words = (s, extra) => {
  const l = ['            <div class="w">', '                <p class="ukc-cap">' + s.cap + '</p>'];
  if (s.sub) l.push('                <p class="ukc-sub">' + s.sub + '</p>');
  if (extra) l.push(extra);
  l.push('            </div>');
  return l.join('\n');
};
const shotOf = (s, sz) => '            <div class="ukc-shot">' + img(s.slug, s.alt, sz) + '</div>';

const BODY = {
  strip: a => '    <div class="ukc ukcStrip">\n'
    + a.shots.map(s => '        <div class="f">\n' + shotOf(s, '(max-width:760px) 100vw, 25vw') + '\n' + words(s) + '\n        </div>').join('\n')
    + '\n    </div>',
  wide: a => '    <div class="ukc ukcWide">\n'
    + '        <div class="plate">\n' + shotOf(a.hero, '100vw') + '\n' + words(a.hero) + '\n        </div>\n'
    + '        <div class="beats">\n'
    + a.shots.map(s => '            <div class="beat">\n' + shotOf(s, '(max-width:700px) 100vw, 30vw') + '\n' + words(s) + '\n            </div>').join('\n')
    + '\n        </div>\n    </div>',
  split: a => '    <div class="ukc ukcSplit">\n'
    + a.shots.map(s => '        <div class="q">\n' + shotOf(s, '(max-width:820px) 100vw, 46vw') + '\n' + words(s) + '\n        </div>').join('\n')
    + '\n    </div>',
  rail: a => '    <div class="ukc ukcRail">\n        <div class="track">\n'
    + a.shots.map(s => '            <div class="f">\n' + shotOf(s, '(max-width:760px) 70vw, 340px') + '\n' + words(s) + '\n            </div>').join('\n')
    + '\n        </div>\n        <p class="rail-note">Scroll the strip &mdash; eight places the same system has to work</p>\n    </div>',
  map: a => '    <div class="ukc ukcMap">\n'
    + a.shots.map(s => '        <a class="door" href="' + s.href + '">\n' + shotOf(s, '(max-width:760px) 100vw, 26vw') + '\n'
      + words(s, '                <span class="go">Read the ' + s.cap.replace(/&amp;/g, 'and').split(' ')[0] + ' page ' + ARROW + '</span>') + '\n        </a>').join('\n')
    + '\n    </div>',
};

// =============================================================================================
// injection
// =============================================================================================
const M0 = '<!-- uk-cinema:start -->', M1 = '<!-- uk-cinema:end -->';
const C0 = '/* uk-cinema-css:start */', C1 = '/* uk-cinema-css:end */';
const J0 = '/* uk-cinema-js:start */', J1 = '/* uk-cinema-js:end */';
const esc = t => t.replace(/[*/]/g, '\\$&');

function strip(s) {
  return s
    .replace(new RegExp('[ \\t]*' + M0 + '[\\s\\S]*?' + M1 + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + esc(C0) + '[\\s\\S]*?' + esc(C1) + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + esc(J0) + '[\\s\\S]*?' + esc(J1) + '\\n?', 'g'), '');
}

let s = strip(L.read(FILE));

if (process.argv.includes('--strip')) {
  L.write(FILE, s);
  console.log('uk_cinema stripped from ' + FILE);
} else {
  // the acts replace the uk_story cascade on this page -- /uk/ now carries the full narrative
  s = s.replace(/[ \t]*<!-- uk-story:start -->[\s\S]*?<!-- uk-story:end -->\n?/g, '');

  const styleEnd = s.indexOf('</style>');
  if (styleEnd < 0) throw new Error('no </style> in ' + FILE);
  s = s.slice(0, styleEnd) + '\n' + C0 + CSS + '\n' + C1 + '\n' + s.slice(styleEnd);

  // insert the whole feature after the regions section, before "how it works"
  const at = s.indexOf('id="regions"');
  if (at < 0) throw new Error('anchor id="regions" not found');
  const close = s.indexOf('\n</section>', at);
  if (close < 0) throw new Error('end of the regions section not found');
  const insertAt = close + '\n</section>'.length;

  const film = ACTS.map(a => [
    '<section class="ukc-act tone-' + a.tone + '" aria-label="' + L.esc(a.label + ': ' + a.title.replace(/&[a-z]+;/g, '')) + '">',
    head(a),
    BODY[a.kind](a),
    '</section>',
  ].join('\n')).join('\n\n');

  s = s.slice(0, insertAt) + '\n' + M0 + '\n' + film + '\n' + M1 + s.slice(insertAt);

  const bodyEnd = s.lastIndexOf('</body>');
  if (bodyEnd < 0) throw new Error('no </body>');
  s = s.slice(0, bodyEnd) + '<script>\n' + J0 + JS + '\n' + J1 + '\n</script>\n' + s.slice(bodyEnd);

  L.must(s, M0, 1);
  L.must(s, 'class="ukc-act', ACTS.length);
  L.must(s, 'uk-story:start', 0);
  L.write(FILE, s);

  const shots = ACTS.reduce((n, a) => n + a.shots.length + (a.hero ? 1 : 0), 0);
  console.log('/uk/ rebuilt as ' + ACTS.length + ' acts, ' + shots + ' photographs');
  ACTS.forEach(a => console.log('  ' + a.n + '  ' + a.kind.padEnd(6) + a.tone.padEnd(7) + (a.shots.length + (a.hero ? 1 : 0)) + ' shots  ' + a.title));
}
