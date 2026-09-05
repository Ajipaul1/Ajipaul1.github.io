'use strict';
// in_story.js -- /in/ ONLY. The India hub told in pictures, to PLAN-IN §2.1.
//
//   ACT 1  WHERE WE ARE       Kochi. The Chinese nets, because nothing says "this is Kochi" faster.
//   ACT 2  WHO WE BUILD FOR   Kerala's real economy: textiles, spices, marine. Six tiles, mosaic.
//   ACT 3  WHERE THE WORK GOES six city doors, each a real photograph of that city, each a link.
//
// SIGNATURE: the coastline. A stylised Kerala coast draws itself (stroke-dashoffset, one shot) across
// the act-1 plate, and in act 3 an orange dot pops at each city as its door scrolls into view. No
// other page uses a self-drawing map; /uk/ has the tube map, /uk/erp/ the assembly line, and so on.
//
// RULES: real <img> with width/height and a 700/1400/2400 srcset; every photo unique to this page
// (asserted against the whole site at build time); one-shot in-view reveal, then unobserved; start
// states scoped under html.ins so JS-off and reduced-motion visitors see everything; no "offshore",
// and the audit-word guard from in_hub.js still passes because this layer adds no such text.
//
//   usage: node scripts/country-pages/in_story.js        # apply (idempotent)
//          node scripts/country-pages/in_story.js --strip
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const REPO = path.resolve(__dirname, '..', '..');
const SIZES = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8'));
const FILE = 'in/index.html';

function img(slug, alt, sizesAttr) {
  const m = SIZES[slug + '.jpg'];
  if (!m) throw new Error('no size recorded for ' + slug + '.jpg');
  const cand = [['-700.jpg', SIZES[slug + '-700.jpg']], ['-1400.jpg', SIZES[slug + '-1400.jpg']], ['.jpg', m]]
    .filter(([, x]) => x).map(([suf, x]) => `/assets/images/library/${slug}${suf} ${x.w}w`);
  return `<img class="ins-img" src="/assets/images/library/${slug}.jpg"`
    + (cand.length > 1 ? ` srcset="${cand.join(', ')}"` : '')
    + ` sizes="${sizesAttr || '100vw'}" alt="${L.esc(alt)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async" />`;
}

// ---------------------------------------------------------------------------------------------
const ACTS = [
  {
    n: '01', kind: 'coast', tone: 'dark',
    label: 'Where we are',
    title: 'Kochi. Not a sales office in Kochi &mdash; the team.',
    lede: 'The people who build your system work from here, in the same time zone as every client in India, and for a business in Kerala they can be in your office the same week. That is the whole difference between us and a supplier in another city, and we would rather show you the place than describe it.',
    hero: { slug: 'inhub-chinese-fishing-nets-mono', cap: 'Fort Kochi. The nets have been here since the 14th century; we have been here rather less long.', alt: 'Traditional Chinese fishing nets at Fort Kochi with workers' },
    shots: [
      { slug: 'inhub-fishing-nets-over-water', cap: 'Same time zone as every client in India.', alt: 'A row of Chinese fishing nets over the water at Kochi' },
      { slug: 'inhub-dock-silhouette-sunset', cap: 'Same week in your office, if you are in Kerala.', alt: 'A figure on a wooden dock at sunset on the Kerala coast' },
    ],
  },
  {
    n: '02', kind: 'mosaic', tone: 'light',
    label: 'Who we build for',
    title: 'Kerala&rsquo;s real economy, and the system each part is missing.',
    lede: 'Textiles and garments, spices and food processing, marine and fishing, tourism, ayurveda, construction. The production layer is completely different in each. The system of record underneath &mdash; stock, orders, purchasing, a real cost per job &mdash; is the same one, and it is the part almost none of them have.',
    shots: [
      { slug: 'inhub-textile-factory-workers', cap: 'Garments', sub: 'Styles, sizes, fabric lots and a cost per piece that is real.', alt: 'Workers sewing textiles in a large garment factory' },
      { slug: 'inhub-sewing-machines-line', cap: 'Job work', sub: 'Orders in, pieces out, and what each one actually cost.', alt: 'Workers at a line of sewing machines' },
      { slug: 'inhub-dried-chillies-in-bags', cap: 'Spices', sub: 'Grades, lots and moisture, traceable back to the estate.', alt: 'Dried red chillies in bags at a market' },
      { slug: 'inhub-sacks-in-storage', cap: 'Food processing', sub: 'Batches, yields and expiry, with FSSAI records that come out of the system.', alt: 'Sacks of produce in a storage godown' },
      { slug: 'inhub-fishing-boats-harbour', cap: 'Marine', sub: 'Landings, grades, cold-chain custody and export paperwork.', alt: 'Fishing boats moored in a Kerala harbour' },
      { slug: 'inhub-fishing-boat-at-sea', cap: 'Export', sub: 'Documents, duty and the landed cost you actually made money on.', alt: 'A fishing boat out on the water' },
    ],
  },
  {
    n: '03', kind: 'doors', tone: 'dark',
    label: 'Where the work goes',
    title: 'Six cities with their own page, because the search data says they are six markets.',
    lede: 'Each of these was written from that city&rsquo;s own keyword cluster, not from a template. Kerala&rsquo;s page is about freelancers because that is what Kerala searches for. Lucknow&rsquo;s leads on website development because that is what Lucknow searches for. Open two side by side.',
    shots: [
      { slug: 'in-mumbai-gateway-of-india', cap: 'Mumbai', sub: 'Trading, D2C and Navi Mumbai. The storefront and the warehouse have to agree.', href: '/in/mumbai/', alt: 'The Gateway of India on the Mumbai waterfront', x: 22, y: 43 },
      { slug: 'inhub-door-kolkata-howrah-sunset', cap: 'Kolkata', sub: 'The one city that searches for a consultant as often as a company.', href: '/in/kolkata/', alt: 'Howrah Bridge over the Hooghly at sunset', x: 78, y: 45 },
      { slug: 'in-house-on-the-lake-shore', cap: 'Kerala', sub: 'Home ground, and honest about when a freelancer is the better answer.', href: '/in/kerala/', alt: 'A house on the shore of a Kerala lake', x: 40, y: 86 },
      { slug: 'inhub-door-vadodara-red-white-pipes', cap: 'Vadodara', sub: 'Engineering and chemicals. Specifications, not adjectives.', href: '/in/vadodara/', alt: 'A process plant with red and white pipework', x: 25, y: 33 },
      { slug: 'inhub-door-lucknow-columns-clock', cap: 'Lucknow', sub: 'Searches for builders, not SEO. So the page starts with the build.', href: '/in/lucknow/', alt: 'A columned building in Lucknow with a clock tower', x: 55, y: 30 },
      { slug: 'inhub-door-calicut-beach-aerial', cap: 'Calicut', sub: 'The least contested market in our data. An opening that will not stay open.', href: '/in/calicut/', alt: 'Aerial view of Kozhikode beach and the city', x: 36, y: 78 },
    ],
  },
];

// A stylised Kerala coastline for the act-1 plate. Drawn once, top to bottom, when the plate is lit.
// viewBox 0 0 200 600 -- a long thin strip; Kochi is the dot roughly two-thirds down.
const COAST = `<svg class="ins-coast" viewBox="0 0 200 600" aria-hidden="true" focusable="false">
  <path class="ins-coast-line" d="M62 4 C 70 60, 40 110, 58 170 S 92 250, 74 310 S 44 400, 66 460 S 96 540, 84 596" />
  <circle class="ins-coast-dot" cx="70" cy="392" r="5" />
  <text class="ins-coast-label" x="86" y="396">Kochi</text>
</svg>`;

// ---------------------------------------------------------------------------------------------
const CSS = `
  /* ================= in_story.js : the India hub in pictures ================= */
  .ins{ position:relative; }
  .ins-img{ display:block; width:100%; height:100%; object-fit:cover; }
  .ins-act{ position:relative; overflow-x:hidden; overflow-x:clip; padding:clamp(52px,7vw,104px) 0; }
  .ins-act.tone-dark{ background:var(--navy-deep); color:#fff; }
  .ins-act.tone-light{ background:var(--paper); }
  .ins-head{ max-width:1180px; width:92%; margin:0 auto clamp(26px,3.6vw,52px); }
  .ins-slate{ display:flex; align-items:baseline; gap:14px; margin:0 0 14px; }
  .ins-slate b{ font-family:var(--font-mono); font-size:clamp(2.2rem,5vw,4.4rem); line-height:.85; font-weight:700; color:var(--orange); letter-spacing:-.02em; }
  .ins-slate span{ font-family:var(--font-mono); font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint); }
  .tone-dark .ins-slate span{ color:rgba(255,255,255,.5); }
  .ins-title{ font-size:clamp(1.6rem,3.6vw,3rem); line-height:1.08; font-weight:800; margin:0 0 14px; max-width:26ch; color:var(--ink); }
  .tone-dark .ins-title{ color:#fff; }
  .ins-lede{ font-size:clamp(.95rem,1.15vw,1.06rem); line-height:1.66; color:var(--ink-soft); margin:0; max-width:64ch; }
  .tone-dark .ins-lede{ color:rgba(255,255,255,.72); }
  .ins-cap{ font-weight:700; line-height:1.2; margin:0; color:var(--ink); }
  .tone-dark .ins-cap{ color:#fff; }
  .ins-sub{ font-size:.86rem; line-height:1.55; color:var(--ink-soft); margin:6px 0 0; }
  .tone-dark .ins-sub{ color:rgba(255,255,255,.62); }
  .ins-shot{ position:relative; overflow:hidden; background:rgba(120,130,150,.14); }

  /* ---- kind: COAST -- one wide plate with the coastline drawn over it, then two beats ---- */
  .insCoast .plate{ position:relative; overflow:hidden; width:100vw; max-width:100vw; margin-left:calc(50% - 50vw); margin-bottom:clamp(16px,2.2vw,30px); }
  .insCoast .plate .ins-shot{ aspect-ratio:21/9; }
  .insCoast .plate .ins-shot::after{ content:''; position:absolute; inset:0; background:linear-gradient(90deg, rgba(6,12,26,.55) 0%, rgba(6,12,26,.15) 40%, rgba(6,12,26,.7) 100%); }
  .insCoast .plate .w{ position:absolute; z-index:2; left:0; right:0; bottom:0; padding:clamp(20px,4vw,54px) max(4vw, calc(50% - 590px + 4vw)); background:linear-gradient(0deg, rgba(6,12,26,.86), rgba(6,12,26,0) 80%); }
  .insCoast .plate .ins-cap{ color:#fff; font-size:clamp(1.05rem,2.2vw,1.7rem); max-width:34ch; font-weight:600; }
  .ins-coast{ position:absolute; z-index:3; right:max(3vw, calc(50% - 590px + 3vw)); top:0; height:100%; width:auto; pointer-events:none; }
  .ins-coast-line{ fill:none; stroke:var(--orange); stroke-width:3; stroke-linecap:round; }
  .ins-coast-dot{ fill:#fff; stroke:var(--orange); stroke-width:3; }
  .ins-coast-label{ fill:#fff; font-family:var(--font-mono); font-size:13px; letter-spacing:.1em; text-transform:uppercase; }
  .insCoast .beats{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(12px,1.6vw,22px); grid-template-columns:1fr 1fr; }
  .insCoast .beat .ins-shot{ aspect-ratio:16/10; border-radius:11px; }
  .insCoast .beat .w{ padding:12px 2px 0; }
  .insCoast .beat .ins-cap{ font-size:1rem; }
  @media (max-width:700px){ .insCoast .plate .ins-shot{ aspect-ratio:4/5; } .insCoast .beats{ grid-template-columns:1fr; } .ins-coast{ right:4vw; } }

  /* ---- kind: MOSAIC -- six sector tiles, two big and four small ---- */
  .insMosaic{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(10px,1.4vw,18px); grid-template-columns:repeat(2,1fr); }
  .insMosaic .tile{ position:relative; overflow:hidden; border-radius:12px; }
  .insMosaic .tile .ins-shot{ aspect-ratio:4/3; }
  .insMosaic .tile .w{ position:absolute; z-index:2; inset:auto 0 0 0; padding:clamp(14px,2vw,22px); background:linear-gradient(0deg, rgba(6,12,26,.9), rgba(6,12,26,0)); }
  .insMosaic .tile .ins-cap{ color:#fff; font-size:clamp(1rem,1.5vw,1.25rem); }
  .insMosaic .tile .ins-sub{ color:rgba(255,255,255,.78); }
  @media (min-width:860px){
    .insMosaic{ grid-template-columns:repeat(4,1fr); grid-auto-rows:1fr; }
    .insMosaic .tile:nth-child(1), .insMosaic .tile:nth-child(4){ grid-column:span 2; grid-row:span 2; }
    .insMosaic .tile:nth-child(1) .ins-shot, .insMosaic .tile:nth-child(4) .ins-shot{ aspect-ratio:auto; height:100%; }
  }

  /* ---- kind: DOORS -- six city doors, each a link, with the map-dot pop ---- */
  .insDoors{ max-width:1180px; width:92%; margin:0 auto; display:grid; gap:clamp(12px,1.6vw,20px); grid-template-columns:1fr; }
  .insDoors a.door{ position:relative; display:block; text-decoration:none; overflow:hidden; border-radius:12px; }
  .insDoors .ins-shot{ aspect-ratio:16/10; }
  .insDoors .ins-shot::after{ content:''; position:absolute; inset:0; background:linear-gradient(0deg, rgba(4,9,20,.92) 0%, rgba(4,9,20,.35) 55%, rgba(4,9,20,.08) 100%); }
  .insDoors .w{ position:absolute; z-index:2; inset:auto 0 0 0; padding:clamp(16px,2.2vw,26px); }
  .insDoors .ins-cap{ color:#fff; font-size:clamp(1.25rem,1.9vw,1.6rem); }
  .insDoors .ins-sub{ color:rgba(255,255,255,.76); }
  .insDoors .go{ display:inline-flex; align-items:center; gap:6px; margin-top:10px; font-family:var(--font-mono); font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--orange); }
  .insDoors a.door:hover .ins-shot::after{ background:linear-gradient(0deg, rgba(4,9,20,.95) 0%, rgba(217,83,30,.3) 60%, rgba(4,9,20,.08) 100%); }
  .ins-pin{ position:absolute; z-index:3; top:14px; right:14px; width:12px; height:12px; border-radius:50%; background:var(--orange); box-shadow:0 0 0 4px rgba(217,83,30,.28); }
  @media (min-width:700px){ .insDoors{ grid-template-columns:repeat(2,1fr); } }
  @media (min-width:1000px){ .insDoors{ grid-template-columns:repeat(3,1fr); } }

  /* ================= the reveal : one shot, in view, then finished ================= */
  html.ins-on .ins .ins-shot{ clip-path:inset(0 0 100% 0); }
  html.ins-on .ins .ins-shot > .ins-img{ transform:scale(1.07); transition:transform 1.25s cubic-bezier(.18,.72,.2,1); }
  html.ins-on .ins .w{ opacity:0; transform:translateY(14px); }
  html.ins-on .ins .lit .ins-shot{ animation:insCurtain .8s cubic-bezier(.32,0,.18,1) forwards; animation-delay:calc(var(--d,0) * .09s); }
  html.ins-on .ins .lit .ins-shot > .ins-img{ transform:scale(1); transition-delay:calc(var(--d,0) * .09s); }
  html.ins-on .ins .lit .w{ animation:insLift .58s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:calc(var(--d,0) * .09s + .18s); }
  html.ins-on .ins-head{ opacity:0; transform:translateY(15px); }
  html.ins-on .ins-head.lit{ animation:insLift .6s cubic-bezier(.2,.7,.2,1) forwards; }
  /* the coastline draws itself once the plate is lit; the Kochi dot and label follow */
  html.ins-on .ins-coast-line{ stroke-dasharray:900; stroke-dashoffset:900; }
  html.ins-on .ins-coast-dot, html.ins-on .ins-coast-label{ opacity:0; }
  html.ins-on .lit .ins-coast-line{ animation:insDraw 2.2s cubic-bezier(.4,0,.2,1) .4s forwards; }
  html.ins-on .lit .ins-coast-dot{ animation:insPop .5s cubic-bezier(.2,.9,.3,1.4) 1.9s forwards; }
  html.ins-on .lit .ins-coast-label{ animation:insLift .5s ease 2.2s forwards; }
  /* the city pin pops as its door lights */
  html.ins-on .ins-pin{ transform:scale(0); }
  html.ins-on .lit .ins-pin{ animation:insPop .55s cubic-bezier(.2,.9,.3,1.4) forwards; animation-delay:calc(var(--d,0) * .09s + .5s); }
  @keyframes insCurtain{ from{ clip-path:inset(0 0 100% 0); } to{ clip-path:inset(0 0 0 0); } }
  @keyframes insLift{ to{ opacity:1; transform:none; } }
  @keyframes insDraw{ to{ stroke-dashoffset:0; } }
  @keyframes insPop{ to{ transform:scale(1); opacity:1; } }

  /* scroll-driven drift on the big plate: compositor only, movement only, absent where unsupported */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) and (min-width:760px) {
      .insCoast .plate .ins-img{ animation:insDrift linear both; animation-timeline:view(); animation-range:entry 0% exit 100%; }
    }
  }
  @keyframes insDrift{ from{ transform:scale(1.12) translateY(-2.2%); } to{ transform:scale(1.12) translateY(2.2%); } }

  /* the phone cut */
  @media (max-width:700px){
    .ins-act{ padding:38px 0 42px; }
    .ins-head{ width:88%; margin-bottom:22px; }
    .ins-slate b{ font-size:2.6rem; }
    .ins-title{ font-size:1.55rem; max-width:none; }
    .ins-lede{ font-size:.96rem; }
    .insCoast .plate .w{ padding:20px; }
    .insCoast .beats{ width:88%; }
    .insMosaic{ width:88%; gap:12px; }
    .insDoors{ width:88%; }
    .insDoors .ins-shot{ aspect-ratio:5/4; }
  }
  @media (prefers-reduced-motion: reduce){
    html.ins-on .ins .ins-shot, html.ins-on .ins .w, html.ins-on .ins .ins-shot > .ins-img, html.ins-on .ins-head,
    html.ins-on .ins-coast-line, html.ins-on .ins-coast-dot, html.ins-on .ins-coast-label, html.ins-on .ins-pin{
      clip-path:none !important; opacity:1 !important; transform:none !important; animation:none !important; transition:none !important; stroke-dashoffset:0 !important;
    }
  }`;

const JS = `
/* in_story.js : light each frame once as it arrives, then stop watching it. html.ins-on is added
   only here, so with JS off or reduced motion on, the whole picture story is simply visible. */
(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var frames = document.querySelectorAll('.ins .plate, .ins .beat, .ins .tile, .ins a.door, .ins-head');
    if (!frames.length || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('ins-on');
    var acts = document.querySelectorAll('.ins-act');
    for (var a = 0; a < acts.length; a++) {
        var kids = acts[a].querySelectorAll('.plate, .beat, .tile, a.door');
        for (var k = 0; k < kids.length; k++) kids[k].style.setProperty('--d', k % 6);
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

// ---------------------------------------------------------------------------------------------
const ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const head = a => [
  '    <div class="ins-head">',
  '        <p class="ins-slate"><b>' + a.n + '</b> <span>' + a.label + '</span></p>',
  '        <h2 class="ins-title">' + a.title + '</h2>',
  '        <p class="ins-lede">' + a.lede + '</p>',
  '    </div>'].join('\n');
const shot = (s, sz) => '            <div class="ins-shot">' + img(s.slug, s.alt, sz) + '</div>';
const words = (s, extra) => {
  const l = ['            <div class="w">', '                <p class="ins-cap">' + s.cap + '</p>'];
  if (s.sub) l.push('                <p class="ins-sub">' + s.sub + '</p>');
  if (extra) l.push(extra);
  l.push('            </div>');
  return l.join('\n');
};

const BODY = {
  coast: a => '    <div class="ins insCoast">\n'
    + '        <div class="plate">\n' + shot(a.hero, '100vw') + '\n' + COAST + '\n' + words(a.hero) + '\n        </div>\n'
    + '        <div class="beats">\n'
    + a.shots.map(s => '            <div class="beat">\n' + shot(s, '(max-width:700px) 88vw, 46vw') + '\n' + words(s) + '\n            </div>').join('\n')
    + '\n        </div>\n    </div>',
  mosaic: a => '    <div class="ins insMosaic">\n'
    + a.shots.map(s => '        <div class="tile">\n' + shot(s, '(max-width:860px) 46vw, 30vw') + '\n' + words(s) + '\n        </div>').join('\n')
    + '\n    </div>',
  doors: a => '    <div class="ins insDoors">\n'
    + a.shots.map(s => '        <a class="door" href="' + s.href + '">\n            <span class="ins-pin" aria-hidden="true"></span>\n' + shot(s, '(max-width:700px) 88vw, 31vw') + '\n'
      + words(s, '                <span class="go">Read the ' + s.cap + ' page ' + ARROW + '</span>') + '\n        </a>').join('\n')
    + '\n    </div>',
};

// ---------------------------------------------------------------------------------------------
const M0 = '<!-- in-story:start -->', M1 = '<!-- in-story:end -->';
const C0 = '/* in-story-css:start */', C1 = '/* in-story-css:end */';
const J0 = '/* in-story-js:start */', J1 = '/* in-story-js:end */';
const esc = t => t.replace(/[*/]/g, '\\$&');
function strip(s) {
  return s
    .replace(new RegExp('[ \\t]*' + M0 + '[\\s\\S]*?' + M1 + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + esc(C0) + '[\\s\\S]*?' + esc(C1) + '\\n?', 'g'), '')
    .replace(new RegExp('[ \\t]*' + esc(J0) + '[\\s\\S]*?' + esc(J1) + '\\n?', 'g'), '');
}

// no photo on this page may appear anywhere else on the site
const mine = new Set();
for (const a of ACTS) for (const s of a.shots.concat(a.hero ? [a.hero] : [])) {
  if (mine.has(s.slug)) throw new Error('photo ' + s.slug + ' used twice on /in/');
  mine.add(s.slug);
}
{
  const elsewhere = [];
  (function walk(d) {
    for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
      if (['node_modules', '.git', 'assets', 'archive', 'scripts', '.vercel'].includes(f)) continue;
      const rel = d ? d + '/' + f : f;
      if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
      else if (f.endsWith('.html') && rel !== FILE) {
        const body = fs.readFileSync(path.join(REPO, rel), 'utf8');
        for (const m of body.matchAll(/library\/([a-z0-9-]+?)(?:-700|-1400)?\.jpg/g)) if (mine.has(m[1])) elsewhere.push(m[1] + ' (on ' + rel + ')');
      }
    }
  })('');
  if (elsewhere.length) throw new Error('/in/ photos already used elsewhere: ' + [...new Set(elsewhere)].join(', '));
}

let s = strip(L.read(FILE));
if (process.argv.includes('--strip')) { L.write(FILE, s); console.log('in_story stripped'); }
else {
  // this layer replaces the text-only city grid that link_in_cities.js added
  s = s.replace(/<section class="tap-section tap-section-alt" id="in-city-pages">[\s\S]*?<\/section>\n?/, '');

  const styleEnd = s.indexOf('</style>');
  s = s.slice(0, styleEnd) + '\n' + C0 + CSS + '\n' + C1 + '\n' + s.slice(styleEnd);

  // acts 1 and 2 go after the answer block (before the pillars); act 3 replaces the city grid before the cost section
  const film12 = ACTS.slice(0, 2).map(a => ['<section class="ins-act tone-' + a.tone + '" aria-label="' + L.esc(a.label) + '">', head(a), BODY[a.kind](a), '</section>'].join('\n')).join('\n\n');
  const film3 = ACTS.slice(2).map(a => ['<section class="ins-act tone-' + a.tone + '" aria-label="' + L.esc(a.label) + '">', head(a), BODY[a.kind](a), '</section>'].join('\n')).join('\n\n');

  const at1 = s.indexOf('<section class="tap-pillars-section" id="services">');
  if (at1 < 0) throw new Error('services section not found');
  s = s.slice(0, at1) + M0 + '\n' + film12 + '\n' + s.slice(at1);

  const at3 = s.indexOf('<section class="tap-section" id="in-cities">');
  if (at3 < 0) throw new Error('in-cities section not found');
  s = s.slice(0, at3) + film3 + '\n' + M1 + '\n' + s.slice(at3);
  // the old text-only "where we work" trio is now redundant next to the doors
  s = s.replace(/<section class="tap-section" id="in-cities">[\s\S]*?<\/section>\n?/, '');

  const bodyEnd = s.lastIndexOf('</body>');
  s = s.slice(0, bodyEnd) + '<script>\n' + J0 + JS + '\n' + J1 + '\n</script>\n' + s.slice(bodyEnd);

  L.must(s, 'class="ins-act', ACTS.length);
  L.must(s, 'class="ins-coast"', 1);
  L.write(FILE, s);
  console.log('/in/ rebuilt: ' + ACTS.length + ' acts, ' + mine.size + ' photographs, coastline signature');
}
