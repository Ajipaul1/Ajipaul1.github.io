'use strict';
// home_story.js -- index.html ONLY. The whole-company picture story, in the same method the owner
// approved on /uk/: photographs and short titles carry the argument, so a visitor who reads nothing
// still learns what TechAuditPros does, what it delivers, where the work goes and where it is built.
//
//   ACT A  THREE DISCIPLINES   ERP, web, search -- one big picture each, with what it actually means
//   ACT B  WHERE THE WORK GOES the UK, the US and Canada, each a door to its own market page
//   ACT C  WHERE IT IS BUILT   Kochi, Kerala, and the overlap that makes remote work
//   ACT D  HOW AN ENGAGEMENT RUNS  audit, build, run -- three frames
//
// ON THE PHOTOGRAPHS. These are licensed stock, not pictures of our own premises or staff, so no
// caption claims otherwise. Nothing here says "our office" or "our team" over a stock photo -- the
// captions describe the kind of work or the place, which is true. The one exception in the library,
// a formal group portrait of somebody else's company, is deliberately not used anywhere.
//
// Design rules kept: its own four layouts, none of them reused from uk_cinema.js or uk_story.js; no
// photo shared with any other page (asserted at build time); real <img> with width/height and a
// 700/1400/2400 srcset; the reveal is one-shot, in-view, then unobserved; start states are scoped
// under html.hs so JS-off and reduced-motion visitors see everything; and it does not touch the
// hero, the existing home_motion.js treatments, the schema or the closing CTA band.
//
//   usage: node scripts/country-pages/home_story.js
//          node scripts/country-pages/home_story.js --strip
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const REPO = path.resolve(__dirname, '..', '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8'));
const FILE = 'index.html';

function img(slug, alt, sizesAttr) {
  const m = SIZES[slug + '.jpg'];
  if (!m) throw new Error('no size recorded for ' + slug + '.jpg');
  const cand = [['-700.jpg', SIZES[slug + '-700.jpg']], ['-1400.jpg', SIZES[slug + '-1400.jpg']], ['.jpg', m]]
    .filter(([, x]) => x).map(([suf, x]) => `/assets/images/library/${slug}${suf} ${x.w}w`);
  return `<img class="hs-img" src="/assets/images/library/${slug}.jpg"`
    + (cand.length > 1 ? ` srcset="${cand.join(', ')}"` : '')
    + ` sizes="${sizesAttr || '100vw'}" alt="${L.esc(alt)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async" />`;
}

// =============================================================================================
const ACTS = [
  {
    n: 'A', kind: 'tri', tone: 'light',
    label: 'What we actually deliver',
    title: 'Three disciplines, one team, one monthly fee.',
    lede: 'Most businesses end up buying these from three different suppliers who blame each other. We run all three, which is the only reason the ERP can put live stock on the website and the search work can point at pages that load.',
    shots: [
      { slug: 'home-colour-coded-bins-stacked', eyebrow: 'Custom ERP', cap: 'One system instead of nine spreadsheets.', sub: 'Stock, orders, purchasing, production and job costing in one place, integrated with the accounting package you already use.', href: '/us/erp/', go: 'ERP' },
      { slug: 'home-two-at-code-review', eyebrow: 'Web development', cap: 'Built in code, handed to you.', sub: 'Fast, accessible sites and web apps in your repository and your hosting account &mdash; not locked to a page builder or to us.', href: '/us/website-development/', go: 'Web' },
      { slug: 'home-stylus-charts-on-tablet', eyebrow: 'SEO, AEO &amp; GEO', cap: 'Found by Google, and by the answer engines.', sub: 'Technical fixes, content that answers real questions, and the structured data that gets you quoted rather than skipped.', href: '/us/seo-services/', go: 'Search' },
    ],
  },
  {
    n: 'B', kind: 'doors', tone: 'dark',
    label: 'Where the work goes',
    title: 'Three markets with their own pages, because they are not the same job.',
    lede: 'A US importer, a UK manufacturer and a Canadian distributor ask us for genuinely different things &mdash; different compliance, different buyers, different software. Each market has a page written for it rather than the same page with the country swapped.',
    shots: [
      { slug: 'home-new-york-skyline-golden-hour', cap: 'United States', sub: 'Multi-state operations, sales tax by jurisdiction, and buyers who compare you against agencies charging several times more.', href: '/us/', go: 'United States' },
      { slug: 'uk-london-skyline-night-water', cap: 'United Kingdom', sub: 'Making Tax Digital, UK GAAP, post-Brexit customs and duty, hosted in an AWS London account you own.', href: '/uk/', go: 'United Kingdom' },
      { slug: 'home-toronto-cn-tower-night', cap: 'Canada', sub: 'GST, HST and PST by province, bilingual requirements where they apply, and data kept in a Canadian region.', href: '/ca/', go: 'Canada' },
    ],
    note: 'Plus project work across sixteen countries. If your market is not one of the three above, the engagement runs the same way &mdash; the compliance layer is what changes.',
  },
  {
    n: 'C', kind: 'place', tone: 'light',
    label: 'Where it gets built',
    title: 'Kochi, Kerala. We are open about that being the trade.',
    lede: 'There is no London, New York or Toronto office, and most of a local quote is local labour. What you get instead is a team that starts its day before yours, a live window every working morning for calls, and a written report every month. What you give up is somebody who can be in your building this afternoon &mdash; and if you need that weekly, hire locally. We will tell you so on the call.',
    hero: { slug: 'home-kerala-green-backwaters-buildings', cap: 'Kerala, four and a half to five and a half hours ahead of the UK.', alt: 'Buildings above the green Kerala backwaters' },
    shots: [
      { slug: 'home-standup-to-seated-team', cap: 'The day starts before yours.', sub: 'What you send at six in the evening is picked up before our day ends.', alt: 'A morning briefing to a seated delivery team' },
      { slug: 'home-workstations-open-plan', cap: 'A staging URL every week.', sub: 'Progress you click through yourself, plus a written monthly report.', alt: 'Workstations across an open-plan delivery floor' },
      { slug: 'home-kerala-palms-at-sunset', cap: 'And an overlap window, every day.', sub: 'Roughly four hours with the UK, and the whole US morning with the east coast.', alt: 'Palms silhouetted over the water at sunset in Kerala' },
    ],
  },
  {
    n: 'D', kind: 'steps', tone: 'dark',
    label: 'How an engagement runs',
    title: 'Audit first. Then a working module. Then the rest.',
    lede: 'Nobody signs a retainer to find out whether we are any good. The audit comes first, it is yours to keep either way, and it ends with an honest recommendation &mdash; including the times that recommendation is to change nothing yet.',
    shots: [
      { slug: 'home-team-in-meeting', n: '01', cap: 'We follow one real process.', sub: 'Enquiry to invoice, with the people who do it. You keep the map whether or not you continue.', alt: 'A working session mapping a client process' },
      { slug: 'home-pair-working-at-office-computers', n: '02', cap: 'One module, live in weeks.', sub: 'On your own data, used by your own team &mdash; a far better test of fit than any demo.', alt: 'A pair building a module at office computers' },
      { slug: 'home-hands-on-tablet-timeline', n: '03', cap: 'Then we run it, monthly.', sub: 'One agreed fee, a written report, and no long-term contract holding you in place.', alt: 'Working a delivery schedule on a tablet' },
    ],
  },
];

// =============================================================================================
const CSS = `
  /* ============ home_story.js : the company story in pictures ============ */
  .hs{ position:relative; }
  .hs-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .hs-act{ position:relative; overflow-x:hidden; overflow-x:clip; padding:clamp(50px,6.5vw,98px) 0; }
  .hs-act.tone-dark{ background:var(--navy-deep); color:#fff; }
  .hs-act.tone-light{ background:var(--paper); }
  .hs-head{ max-width:1180px; width:92%; margin:0 auto clamp(24px,3.4vw,48px); }
  .hs-slate{ display:flex; align-items:center; gap:12px; margin:0 0 12px; }
  .hs-slate b{ font-family:var(--font-mono); font-size:.78rem; font-weight:700; letter-spacing:.06em; color:#fff; background:var(--orange); border-radius:5px; padding:3px 9px; }
  .hs-slate span{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-faint); }
  .tone-dark .hs-slate span{ color:rgba(255,255,255,.52); }
  .hs-title{ font-size:clamp(1.55rem,3.3vw,2.8rem); line-height:1.1; font-weight:800; margin:0 0 14px; max-width:30ch; color:var(--ink); }
  .tone-dark .hs-title{ color:#fff; }
  .hs-lede{ font-size:clamp(.95rem,1.1vw,1.05rem); line-height:1.66; color:var(--ink-soft); margin:0; max-width:66ch; }
  .tone-dark .hs-lede{ color:rgba(255,255,255,.72); }
  .hs-note{ max-width:1180px; width:92%; margin:clamp(16px,2vw,26px) auto 0; font-size:.88rem; line-height:1.6; color:var(--ink-faint); }
  .tone-dark .hs-note{ color:rgba(255,255,255,.55); }
  .hs-cap{ font-weight:700; line-height:1.2; margin:0; color:var(--ink); }
  .tone-dark .hs-cap{ color:#fff; }
  .hs-sub{ font-size:.88rem; line-height:1.58; color:var(--ink-soft); margin:7px 0 0; }
  .tone-dark .hs-sub{ color:rgba(255,255,255,.62); }
  .hs-eyebrow{ font-family:var(--font-mono); font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:var(--orange); margin:0 0 8px; }
  .hs-n{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.1em; color:var(--orange); display:block; margin-bottom:7px; }
  .hs-go{ display:inline-flex; align-items:center; gap:6px; margin-top:13px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:var(--orange); }
  .hs-shot{ position:relative; overflow:hidden; background:rgba(120,130,150,.14); }

  /* --- A : TRIPTYCH -- the three disciplines, portrait plates, text below --- */
  .hsTri{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(16px,2.2vw,30px); grid-template-columns:1fr; }
  .hsTri a.pane{ display:block; text-decoration:none; }
  .hsTri .hs-shot{ aspect-ratio:4/3; border-radius:14px; }
  .hsTri .w{ padding:16px 2px 0; }
  .hsTri .hs-cap{ font-size:clamp(1.1rem,1.5vw,1.32rem); }
  .hsTri a.pane:hover .hs-shot{ box-shadow:0 16px 38px rgba(15,23,42,.14); }
  .hsTri a.pane:hover .hs-cap{ color:var(--orange); }
  @media (min-width:860px){ .hsTri{ grid-template-columns:repeat(3,1fr); } .hsTri .hs-shot{ aspect-ratio:3/4; } }

  /* --- B : DOORS -- the markets, wide plates with the words over the picture --- */
  .hsDoors{ display:grid; gap:3px; grid-template-columns:1fr; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); }
  .hsDoors a.door{ position:relative; display:block; text-decoration:none; overflow:hidden; }
  .hsDoors .hs-shot{ aspect-ratio:16/11; }
  .hsDoors .hs-shot::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.93) 0%, rgba(4,9,20,.42) 46%, rgba(4,9,20,.1) 100%); }
  .hsDoors .w{ position:absolute; z-index:2; inset:auto 0 0 0; padding:clamp(20px,2.6vw,34px); }
  .hsDoors .hs-cap{ color:#fff; font-size:clamp(1.35rem,2.2vw,1.85rem); }
  .hsDoors .hs-sub{ color:rgba(255,255,255,.76); max-width:40ch; }
  .hsDoors a.door:hover .hs-shot::after{ background:linear-gradient(0deg, rgba(4,9,20,.96) 0%, rgba(217,83,30,.3) 60%, rgba(4,9,20,.1) 100%); }
  @media (min-width:900px){ .hsDoors{ grid-template-columns:repeat(3,1fr); } .hsDoors .hs-shot{ aspect-ratio:3/4; } }

  /* --- C : PLACE -- one wide plate, then three beats in a row --- */
  .hsPlace .plate{ position:relative; overflow:hidden; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); margin-bottom:clamp(16px,2.2vw,30px); }
  .hsPlace .plate .hs-shot{ aspect-ratio:21/9; }
  .hsPlace .plate .hs-shot::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.82), rgba(4,9,20,.06) 70%); }
  .hsPlace .plate .w{ position:absolute; z-index:2; inset:auto 0 0 0; padding:clamp(18px,3.2vw,44px) max(4vw, calc(50% - 590px + 4vw)); }
  .hsPlace .plate .hs-cap{ color:#fff; font-size:clamp(1.2rem,2.4vw,2rem); max-width:28ch; }
  .hsPlace .beats{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(14px,1.8vw,24px); grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); }
  .hsPlace .beat .hs-shot{ aspect-ratio:16/10; border-radius:12px; }
  .hsPlace .beat .w{ padding:13px 2px 0; }
  .hsPlace .beat .hs-cap{ font-size:1.02rem; }
  @media (max-width:700px){ .hsPlace .plate .hs-shot{ aspect-ratio:3/2; } }

  /* --- D : STEPS -- three numbered frames, offset so the eye walks them --- */
  .hsSteps{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(16px,2.2vw,30px); grid-template-columns:1fr; }
  .hsSteps .step .hs-shot{ aspect-ratio:16/10; border-radius:13px; }
  .hsSteps .step .w{ padding:15px 2px 0; }
  .hsSteps .step .hs-cap{ font-size:1.1rem; }
  @media (min-width:880px){
    .hsSteps{ grid-template-columns:repeat(3,1fr); align-items:start; }
    .hsSteps .step:nth-child(2){ margin-top:clamp(20px,3vw,46px); }
    .hsSteps .step:nth-child(3){ margin-top:clamp(40px,6vw,92px); }
  }

  /* ---- reveal : one shot, in view, then finished ---- */
  html.hs-on .hs .hs-shot{ clip-path:inset(0 0 100% 0); }
  html.hs-on .hs .hs-shot > .hs-img{ transform:scale(1.07); transition:transform 1.2s cubic-bezier(.18,.72,.2,1); }
  html.hs-on .hs .w{ opacity:0; transform:translateY(14px); }
  html.hs-on .hs .lit .hs-shot{ animation:hsWipe .8s cubic-bezier(.32,0,.18,1) forwards; animation-delay:calc(var(--d,0) * .1s); }
  html.hs-on .hs .lit .hs-shot > .hs-img{ transform:scale(1); transition-delay:calc(var(--d,0) * .1s); }
  html.hs-on .hs .lit .w{ animation:hsLift .58s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d,0) * .1s + .18s); }
  html.hs-on .hs-head{ opacity:0; transform:translateY(15px); }
  html.hs-on .hs-head.lit{ animation:hsLift .6s cubic-bezier(.2,.7,.2,1) forwards; }
  @keyframes hsWipe{ from{ clip-path:inset(0 0 100% 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes hsLift{ to{ opacity:1; transform:none; } }

  /* ---- the scroll-driven layer: compositor only, no JS, absent where unsupported.
          Movement only -- never opacity, because this runs with JS off too and a fade would leave
          below-the-fold content dimmed until the visitor scrolled to it. ---- */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) and (min-width:860px) {
      .hsDoors a.door, .hsPlace .plate, .hsTri a.pane{ view-timeline-name:--hsf; }
      .hsDoors a.door .hs-img, .hsPlace .plate .hs-img{
        animation:hsDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%;
      }
      .hsSteps .step{ animation:hsWalk linear both; animation-timeline:view(); animation-range:entry 8% cover 45%; }
    }
  }
  @keyframes hsDrift{ from{ transform:scale(1.12) translateY(-2.2%); } to{ transform:scale(1.12) translateY(2.2%); } }
  @keyframes hsWalk{ from{ transform:translateY(22px); } to{ transform:none; } }

  /* ---- the phone cut ---- */
  @media (max-width:700px){
    .hs-act{ padding:38px 0 42px; }
    .hs-head{ width:88%; margin-bottom:22px; }
    .hs-title{ font-size:1.5rem; max-width:none; }
    .hs-lede{ font-size:.95rem; }
    .hs-note{ width:88%; }
    .hsTri{ width:88%; gap:20px; }
    .hsTri .hs-shot{ aspect-ratio:16/11; }
    .hsDoors{ gap:2px; }
    .hsDoors .hs-shot{ aspect-ratio:5/4; }
    .hsDoors .w{ padding:20px; }
    .hsDoors .hs-cap{ font-size:1.42rem; }
    .hsDoors .hs-sub{ max-width:none; }
    .hsPlace .plate .w{ padding:20px; }
    .hsPlace .plate .hs-cap{ font-size:1.24rem; max-width:none; }
    .hsPlace .beats{ width:88%; gap:16px; }
    .hsSteps{ width:88%; gap:20px; }
    .hsSteps .step .hs-shot{ aspect-ratio:4/3; }
  }

  @media (prefers-reduced-motion: reduce){
    html.hs-on .hs .hs-shot, html.hs-on .hs .w, html.hs-on .hs .hs-shot > .hs-img, html.hs-on .hs-head{
      clip-path:none !important; opacity:1 !important; transform:none !important; animation:none !important; transition:none !important;
    }
  }`;

const JS = `
/* home_story.js : light each frame once as it arrives, then stop watching it. html.hs-on is added
   only here, so with JS off or reduced motion on, the whole photo story is simply visible. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var frames = document.querySelectorAll('.hs a.pane, .hs a.door, .hs .plate, .hs .beat, .hs .step, .hs-head');
    if (!frames.length || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('hs-on');
    var acts = document.querySelectorAll('.hs-act');
    for (var a = 0; a < acts.length; a++) {
        var kids = acts[a].querySelectorAll('a.pane, a.door, .plate, .beat, .step');
        for (var k = 0; k < kids.length; k++) kids[k].style.setProperty('--d', k % 4);
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
const ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function head(a) {
  return [
    '    <div class="hs-head">',
    '        <p class="hs-slate"><b>' + a.n + '</b> <span>' + a.label + '</span></p>',
    '        <h2 class="hs-title">' + a.title + '</h2>',
    '        <p class="hs-lede">' + a.lede + '</p>',
    '    </div>',
  ].join('\n');
}
const shotOf = (s, sz) => '            <div class="hs-shot">' + img(s.slug, s.alt || s.cap.replace(/&[a-z]+;/g, ''), sz) + '</div>';
const words = (s, indent) => {
  const p = ' '.repeat(indent);
  const l = [p + '<div class="w">'];
  if (s.n) l.push(p + '    <span class="hs-n">' + s.n + '</span>');
  if (s.eyebrow) l.push(p + '    <p class="hs-eyebrow">' + s.eyebrow + '</p>');
  l.push(p + '    <p class="hs-cap">' + s.cap + '</p>');
  if (s.sub) l.push(p + '    <p class="hs-sub">' + s.sub + '</p>');
  if (s.go) l.push(p + '    <span class="hs-go">See ' + s.go + ' ' + ARROW + '</span>');
  l.push(p + '</div>');
  return l.join('\n');
};

const BODY = {
  tri: a => '    <div class="hs hsTri">\n'
    + a.shots.map(s => '        <a class="pane" href="' + s.href + '">\n' + shotOf(s, '(max-width:860px) 88vw, 31vw') + '\n' + words(s, 12) + '\n        </a>').join('\n')
    + '\n    </div>',
  doors: a => '    <div class="hs hsDoors">\n'
    + a.shots.map(s => '        <a class="door" href="' + s.href + '">\n' + shotOf(s, '(max-width:900px) 100vw, 33vw') + '\n' + words(s, 12) + '\n        </a>').join('\n')
    + '\n    </div>',
  place: a => '    <div class="hs hsPlace">\n'
    + '        <div class="plate">\n' + shotOf(a.hero, '100vw') + '\n' + words(a.hero, 12) + '\n        </div>\n'
    + '        <div class="beats">\n'
    + a.shots.map(s => '            <div class="beat">\n' + shotOf(s, '(max-width:700px) 88vw, 30vw') + '\n' + words(s, 16) + '\n            </div>').join('\n')
    + '\n        </div>\n    </div>',
  steps: a => '    <div class="hs hsSteps">\n'
    + a.shots.map(s => '        <div class="step">\n' + shotOf(s, '(max-width:880px) 88vw, 31vw') + '\n' + words(s, 12) + '\n        </div>').join('\n')
    + '\n    </div>',
};

// =============================================================================================
const M0 = '<!-- home-story:start -->', M1 = '<!-- home-story:end -->';
const C0 = '/* home-story-css:start */', C1 = '/* home-story-css:end */';
const J0 = '/* home-story-js:start */', J1 = '/* home-story-js:end */';
const esc = t => t.replace(/[*/]/g, '\\$&');

function strip(s) {
  return s
    .replace(new RegExp('[ \\t]*' + M0 + '[\\s\\S]*?' + M1 + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + esc(C0) + '[\\s\\S]*?' + esc(C1) + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + esc(J0) + '[\\s\\S]*?' + esc(J1) + '\\n?', 'g'), '');
}

// no photo may be shared with any other page on the site
const seen = {};
for (const a of ACTS) {
  for (const s of a.shots.concat(a.hero ? [a.hero] : [])) {
    if (seen[s.slug]) throw new Error('photo ' + s.slug + ' used twice in the homepage story');
    seen[s.slug] = a.n;
  }
}
{
  const mine = new Set(Object.keys(seen));
  const elsewhere = [];
  (function walk(d) {
    for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
      if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
      const rel = d ? d + '/' + f : f;
      if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
      else if (f.endsWith('.html') && rel !== FILE) {
        const body = fs.readFileSync(path.join(REPO, rel), 'utf8');
        for (const m of body.matchAll(/library\/([a-z0-9-]+?)(?:-700|-1400)?\.jpg/g)) {
          if (mine.has(m[1])) elsewhere.push(m[1] + ' (also on ' + rel + ')');
        }
      }
    }
  })('');
  if (elsewhere.length) throw new Error('homepage photos already used elsewhere: ' + [...new Set(elsewhere)].join(', '));
}

let s = strip(L.read(FILE));

if (process.argv.includes('--strip')) {
  L.write(FILE, s);
  console.log('home_story stripped from ' + FILE);
} else {
  const styleEnd = s.indexOf('</style>');
  if (styleEnd < 0) throw new Error('no </style> in ' + FILE);
  s = s.slice(0, styleEnd) + '\n' + C0 + CSS + '\n' + C1 + '\n' + s.slice(styleEnd);

  // the story sits after the services section, before the regions block it then explains
  const at = s.indexOf('id="services"');
  if (at < 0) throw new Error('anchor id="services" not found');
  const close = s.indexOf('\n</section>', at);
  if (close < 0) throw new Error('end of the services section not found');
  const insertAt = close + '\n</section>'.length;

  const film = ACTS.map(a => [
    '<section class="hs-act tone-' + a.tone + '" aria-label="' + L.esc(a.label) + '">',
    head(a),
    BODY[a.kind](a),
    a.note ? '    <p class="hs-note">' + a.note + '</p>' : null,
    '</section>',
  ].filter(Boolean).join('\n')).join('\n\n');

  s = s.slice(0, insertAt) + '\n' + M0 + '\n' + film + '\n' + M1 + s.slice(insertAt);

  const bodyEnd = s.lastIndexOf('</body>');
  if (bodyEnd < 0) throw new Error('no </body>');
  s = s.slice(0, bodyEnd) + '<script>\n' + J0 + JS + '\n' + J1 + '\n</script>\n' + s.slice(bodyEnd);

  L.must(s, M0, 1);
  L.must(s, 'class="hs-act', ACTS.length);
  L.write(FILE, s);

  const n = Object.keys(seen).length;
  console.log('homepage rebuilt: ' + ACTS.length + ' acts, ' + n + ' photographs, none shared with any other page');
  ACTS.forEach(a => console.log('  ' + a.n + '  ' + a.kind.padEnd(6) + a.tone.padEnd(7) + (a.shots.length + (a.hero ? 1 : 0)) + ' shots  ' + a.title));
}
