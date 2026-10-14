'use strict';
// HOME JOURNEY: the homepage's opening layer (owner, 2026-10-14). A cartoon laptop hero (nine images the owner made
// in ChatGPT, sharpened 4x with Real-ESRGAN, in assets/images/hero-journey/{1536,2560}) told as one continuous camera
// dive that ends on "TechAuditPros"; scrolling on continues into the existing homepage, unchanged.
// Approved in a local preview (D:/Projects/tap-hero-preview); the owner asked for the words to arrive "slow, one second".
// Runtime: assets/js/home-journey.js. This script writes: CSS + preload (head), the <section class="hj"> right before
// the hero (and id="home-hero" on the hero, the Skip target), and the script tag.
//   node scripts/country-pages/home_journey.js           apply / re-apply
//   node scripts/country-pages/home_journey.js --strip    remove it
// SEO: the page's only <h1> stays the hero's; the journey's lines are <p> and the images have real alt text.
// No JS / reduced motion: the section is one screen showing the final scene with the name, the lines and the buttons.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');
const REL = 'index.html', IMG = '/assets/images/hero-journey';

const SCENES = [
  ['01', 'The arrival', 'Something new just landed.', 'A cartoon laptop superhero with a red cape diving down through golden clouds over a green Kerala valley'],
  ['02', 'The idea', 'It looks. It listens. It thinks.', 'The laptop hero landed in a sunny meadow, looking up and thinking'],
  ['03', 'The problem', 'Office and shop floor, not talking.', 'An office team and a factory team on two separate clouds, with the laptop hero flying between them'],
  ['04', 'Custom ERP', 'ERP connects them. One system, everyone in sync.', 'The laptop hero joins both teams with glowing ropes while boxes and papers travel between them'],
  ['05', 'Unseen talent', 'Great work that nobody sees.', 'A young man dancing alone on a village road while a crowd on the hill does not notice'],
  ['06', 'SEO \u00b7 AEO \u00b7 GEO', 'SEO brings the right people to you.', 'The laptop hero carries the dancer to a cheering crowd with confetti'],
  ['07', 'The hidden shop', 'A great shop, hidden in a tiny corner.', 'Close-up of the laptop hero at sunset with a tiny shop picture in the corner of its screen'],
  ['08', 'Website development', 'A website that brings everyone in.', 'People gathered around the laptop pointing happily at a colourful shop website on its screen'],
  ['09', '', '', 'The laptop hero floating over a golden sunset meadow with happy people cheering on the hill'],
];
const FORM = L.FORM;
const words = t => t.split(' ').map((w, j) => `<span class="w"><span style="--j:${j}">${w}</span></span>`).join(' ');

const SECTION = `<!-- home-journey:start -->
<section class="hj" aria-label="The TechAuditPros story" style="--n:${SCENES.length}">
  <div class="hj-pin">
    <div class="hj-shots">
${SCENES.map(([n, , , alt], i) => {
  const eager = i === 0 || i === SCENES.length - 1;
  const src = eager ? ` src="${IMG}/2560/${n}.webp" srcset="${IMG}/1536/${n}.webp 1536w, ${IMG}/2560/${n}.webp 2560w" sizes="100vw"` : '';
  return `      <div class="hj-shot${i === SCENES.length - 1 ? ' last' : ''}" style="z-index:${i + 1}"><img${src} data-n="${n}" alt="${alt}" width="2560" height="1707" decoding="async"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}></div>`;
}).join('\n')}
    </div>
    <canvas class="hj-motes" aria-hidden="true"></canvas>
    <div class="hj-shade" aria-hidden="true"></div>
    <div class="hj-leftfade" aria-hidden="true"></div>
${SCENES.filter(s => s[2]).map(([, tag, text]) => `    <p class="hj-cap"><span class="hj-tag">${L.esc(tag)}</span><span class="hj-line">${words(L.esc(text))}</span></p>`).join('\n')}
    <div class="hj-final">
      <p class="hj-name">${'TechAuditPros'.split('').map((c, j) => `<span class="ch${j >= 4 ? ' o' : ''}" style="--j:${j}">${c}</span>`).join('')}</p>
      <ul class="hj-lines">
        <li style="--j:0">ERP business software solutions</li>
        <li style="--j:1">Website development</li>
        <li style="--j:2">SEO works</li>
      </ul>
      <p class="hj-it">IT Software &middot; Kochi, Kerala</p>
      <div class="hj-btns"><a class="hj-btn" href="${FORM}" target="_blank" rel="noopener">Book a Free Strategy Call</a><a class="hj-btn ghost" href="#home-hero">See what we do &darr;</a></div>
    </div>
    <div class="hj-track" aria-hidden="true"><i></i></div>
    <a class="hj-skip" href="#home-hero">Skip intro &rarr;</a>
    <div class="hj-hint" aria-hidden="true">Scroll &darr;</div>
  </div>
</section>
<!-- home-journey:end -->
`;

const CSS = `<!-- home-journey-css:start -->
<link rel="preload" as="image" href="${IMG}/2560/01.webp" media="(min-width: 1100px)" fetchpriority="high">
<link rel="preload" as="image" href="${IMG}/1536/01.webp" media="(max-width: 1099px)" fetchpriority="high">
<style>
  /* ================= HOME JOURNEY (2026-10-14) — start states only under html.hj-on ================= */
  .hj{ position:relative; background:#0b1a29; color:#fff; padding:0 !important; margin:0 !important; }   /* the site pads sections on phones */
  .hj-pin{ position:relative; height:calc(100svh - var(--hj-top, 0px)); min-height:520px; overflow:hidden; }
  .hj-shots{ position:absolute; inset:0; z-index:0; overflow:hidden; }
  .hj-shot{ position:absolute; left:0; top:0; width:100%; height:100%; transform-origin:0 0; opacity:0; will-change:transform, opacity; backface-visibility:hidden; }
  .hj-shot.last{ opacity:1; }
  .hj-shot img{ width:100%; height:100%; object-fit:cover; display:block; }
  .hj-motes{ position:absolute; inset:0; z-index:2; pointer-events:none; width:100%; height:100%; }
  .hj-shade{ position:absolute; inset:0; z-index:3; pointer-events:none; background:linear-gradient(180deg, rgba(6,14,24,.3), rgba(6,14,24,0) 26%, rgba(6,14,24,0) 52%, rgba(6,14,24,.74)); }
  .hj-leftfade{ position:absolute; inset:0; z-index:4; pointer-events:none; background:linear-gradient(90deg, rgba(6,14,24,.86), rgba(6,14,24,.56) 38%, rgba(6,14,24,0) 64%); transition:opacity 1s ease; }

  .hj-cap{ position:absolute; left:5vw; bottom:13%; z-index:5; margin:0; max-width:min(660px, 88vw); pointer-events:none; display:none; }
  .hj-tag{ display:block; margin-bottom:14px; font:500 .72rem/1 var(--font-mono); letter-spacing:.2em; text-transform:uppercase; color:#FFB58F; }
  .hj-line{ display:block; font-weight:700; font-size:clamp(1.8rem, 4.1vw, 3.5rem); line-height:1.05; letter-spacing:-.02em; color:#fff; text-shadow:0 3px 34px rgba(0,0,0,.5); }
  .hj .w{ display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.1em; margin-bottom:-.1em; }
  .hj .w > span{ display:inline-block; }

  .hj-final{ position:absolute; left:5vw; top:50%; transform:translateY(-46%); z-index:6; max-width:min(640px, 90vw); }
  .hj-name{ margin:0 0 20px; font-weight:700; font-size:clamp(2.6rem, 6.2vw, 5.6rem); line-height:.98; letter-spacing:-.035em; color:#fff; }
  .hj-name .ch{ display:inline-block; }
  .hj-name .o{ color:#FF8A4C; }
  .hj-lines{ list-style:none; padding:0; margin:0 0 18px; font-size:clamp(1.05rem, 1.6vw, 1.4rem); line-height:1.75; color:#fff; }
  .hj-lines li::before{ content:''; display:inline-block; width:8px; height:8px; margin-right:14px; vertical-align:middle; background:var(--orange); transform:rotate(45deg); }
  .hj-it{ margin:0 0 28px; font:500 .8rem/1 var(--font-mono); letter-spacing:.22em; text-transform:uppercase; color:#cfd9e2; }
  .hj-btns{ display:flex; gap:12px; flex-wrap:wrap; }
  .hj-btn{ display:inline-flex; align-items:center; padding:13px 20px; border-radius:8px; background:var(--orange); color:#fff; font-weight:600; font-size:.95rem; text-decoration:none; transition:background .2s; }
  .hj-btn:hover{ background:var(--orange-dark); }
  .hj-btn.ghost{ background:transparent; border:1px solid rgba(255,255,255,.45); }
  .hj-btn.ghost:hover{ border-color:#fff; background:rgba(255,255,255,.08); }

  .hj-track{ position:absolute; left:5vw; right:5vw; bottom:5%; z-index:6; height:2px; background:rgba(255,255,255,.18); display:none; }
  .hj-track i{ position:absolute; inset:0; background:#FF8A4C; transform-origin:left; transform:scaleX(0); }
  .hj-skip{ position:absolute; right:4vw; bottom:8%; z-index:7; display:none; padding:10px 16px; border-radius:999px; background:rgba(6,14,24,.55); color:#fff;
            border:1px solid rgba(255,255,255,.3); font:500 .7rem/1 var(--font-mono); letter-spacing:.14em; text-transform:uppercase; text-decoration:none; transition:opacity .4s; }
  .hj-hint{ position:absolute; left:50%; bottom:8%; z-index:7; display:none; transform:translateX(-50%); font:500 .7rem var(--font-mono); letter-spacing:.22em; text-transform:uppercase; color:#fff; animation:hjBob 1.6s ease-in-out infinite; }
  @keyframes hjBob{ 50%{ transform:translate(-50%, 6px); } }

  /* the journey itself (JS on, motion allowed) */
  html.hj-on .hj{ height:calc(var(--n) * 100svh + 100svh - var(--hj-top, 0px)); }
  html.hj-on .hj-pin{ position:sticky; top:var(--hj-top, 0px); }
  html.hj-on .hj-shot.last{ opacity:0; }
  html.hj-on .hj-track, html.hj-on .hj-skip{ display:block; }
  html.hj-on .hj-hint{ display:block; }
  html.hj-on .hj.hj-end .hj-skip{ opacity:0; pointer-events:none; }
  html.hj-on .hj-cap{ display:block; }
  html.hj-on .hj-cap .hj-tag{ opacity:0; transition:opacity .45s ease; }
  html.hj-on .hj-cap .w > span{ transform:translate3d(0,110%,0); transition:transform .5s cubic-bezier(.55,0,.8,.2); }
  html.hj-on .hj-cap.on .hj-tag{ opacity:1; transition:opacity 1s ease .1s; }
  html.hj-on .hj-cap.on .w > span{ transform:none; transition:transform 1.05s cubic-bezier(.19,1,.22,1) calc(.15s + var(--j, 0) * 70ms); }
  html.hj-on .hj-leftfade{ opacity:0; }
  html.hj-on .hj.hj-end .hj-leftfade{ opacity:1; }
  html.hj-on .hj-final .ch{ opacity:0; transform:translate3d(0,40px,0) rotateX(70deg); transition:opacity .5s, transform .5s; }
  html.hj-on .hj-final.on .ch{ opacity:1; transform:none; transition:opacity .9s ease calc(var(--j) * 55ms), transform 1.1s cubic-bezier(.19,1,.22,1) calc(var(--j) * 55ms); }
  html.hj-on .hj-final li, html.hj-on .hj-final .hj-it, html.hj-on .hj-final .hj-btns{ opacity:0; transform:translate3d(-24px,0,0); transition:opacity .4s, transform .4s; }
  html.hj-on .hj-final.on li{ opacity:1; transform:none; transition:opacity .9s ease calc(.85s + var(--j) * .15s), transform 1s cubic-bezier(.19,1,.22,1) calc(.85s + var(--j) * .15s); }
  html.hj-on .hj-final.on .hj-it{ opacity:1; transform:none; transition:opacity .9s ease 1.35s, transform 1s cubic-bezier(.19,1,.22,1) 1.35s; }
  html.hj-on .hj-final.on .hj-btns{ opacity:1; transform:none; transition:opacity .9s ease 1.55s, transform 1s cubic-bezier(.19,1,.22,1) 1.55s; }
  @media (max-width:700px){ .hj-cap{ bottom:16%; } .hj-skip{ bottom:9%; } .hj-hint{ bottom:13%; } .hj-final{ top:46%; } }
</style>
<!-- home-journey-css:end -->
`;

const JS = `<!-- home-journey-js:start -->
<script src="/assets/js/home-journey.js" defer></script>
<!-- home-journey-js:end -->
`;

const cut = (s, a, b) => s.replace(new RegExp(`<!-- ${a} -->[\\s\\S]*?<!-- ${b} -->\\n?`), '');
let s = L.read(REL).replace(/\r\n/g, '\n');
s = cut(s, 'home-journey:start', 'home-journey:end');
s = cut(s, 'home-journey-css:start', 'home-journey-css:end');
s = cut(s, 'home-journey-js:start', 'home-journey-js:end');
s = s.replace('<section class="tap-new-hero" id="home-hero">', '<section class="tap-new-hero">');
if (!STRIP) {
  L.must(s, '<section class="tap-new-hero">', 1);
  s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
  s = L.replaceAll(s, '<section class="tap-new-hero">', SECTION + '<section class="tap-new-hero" id="home-hero">', 1);
  s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
  ['home-journey:start', 'home-journey-css:start', 'home-journey-js:start', 'id="home-hero"'].forEach(k => L.must(s, k, 1));
  if ((s.match(/<h1[\s>]/g) || []).length !== 1) throw new Error('the page must keep exactly one <h1>');
}
fs.writeFileSync(path.join(L.REPO, REL), s.replace(/\r?\n/g, '\r\n'));
console.log((STRIP ? 'home journey stripped:' : 'home journey applied:'), REL);
