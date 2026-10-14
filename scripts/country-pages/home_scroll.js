'use strict';
// HOME SCROLL layer for index.html ONLY (owner, 2026-10-13: "transform techauditpros in this way ...
// https://www.varsity.vc/ ... like that animation feeling, breathtaking" and then "I mean the animations").
// So the page keeps its own design, words and SEO; what changes is HOW it moves: scroll-driven scenes in
// the manner of varsity.vc instead of the one-shot moves of home_motion.js, which this layer retires.
//
//   1 HERO       (2026-10-13, austinwerner.io-style intro, v2 after "heavy impression" feedback) a dark full-bleed film
//                opens like a cinema gate and plays alone, then the copy arrives in stages (assets/js/home-film.js;
//                films in assets/videos/home, ?film=orbit|ink|waves|sculpt to preview). The dotted-globe v1 is in archive/.
//   2 MANIFESTO  NEW section after the hero: three colour blocks shrink into keyword tags that drift
//                around one sentence while the band goes from navy to paper (pinned, scrubbed)
//   3 CORDS      the tool band pins; two pairs of cords wind tighter as the stack slides through the middle
//   4 STACK      "How an engagement runs" turns into three colour cards that stack (Audit / Build / Run)
//   5 MARKETS    the six market cards become rows; on a mouse, a city photo follows the pointer
//   6 TYPE       every section heading rises word by word; cards and numbers reveal once
//   + smooth wheel scrolling: Lenis 1.1.13 (MIT), self-hosted in assets/js/vendor, mouse/trackpad only
//
// The motion lives in assets/js/home-scroll.js (deferred). This script writes the CSS, the manifesto
// section and the two script tags. Every start state is scoped to html.vs, which only that JS adds after
// the reduced-motion check: with JS off, for crawlers and under reduced motion the page is static and
// complete. The manifesto words are real page text (an h2 and a line under it); the tags are decorative.
//   node scripts/country-pages/home_scroll.js           apply / re-apply (also strips home_motion)
//   node scripts/country-pages/home_scroll.js --strip    remove this layer (then home_motion.js can go back)
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');
const REL = 'index.html';

// [text, x, y, depth, colour, desktop-only]  x/y are fractions of the half-viewport from the centre;
// the first three are where the three colour blocks land
const TAGS = [
  ['Custom ERP', -.1, -.64, .8, 'orange'], ['Schema', -.68, .16, .5, 'sky'], ['Core Web Vitals', .66, .5, .65, 'amber'],
  ['Stock', -.42, -.82, .35, 'sand'], ['GST', .28, -.78, .55, 'moss'], ['VAT', .74, -.6, .4, 'rose'],
  ['HST', -.86, -.42, .7, 'plum', 1], ['MTD', .9, -.18, .6, 'navy'], ['AEO', -.5, .62, .9, 'orange'],
  ['GEO', .1, .72, .45, 'sky'], ['Orders', -.9, .5, .3, 'amber', 1], ['Billing', .42, .86, .75, 'sand'],
  ['Job costing', -.24, .9, .55, 'navy', 1], ['E-invoicing', .6, -.36, .8, 'moss'], ['Search Console', -.62, -.2, .45, 'rose', 1],
  ['Role desks', .86, .24, .35, 'plum', 1], ['React', -.82, .86, .6, 'sky', 1], ['Supabase', .94, .72, .5, 'orange', 1],
  ['Payroll', .04, -.92, .4, 'amber', 1], ['Monthly report', .4, -.5, .3, 'sky'],
];

const MANI = `<!-- home-scroll-mani:start -->
<section class="vs-mani" aria-labelledby="vs-mani-t">
    <div class="vs-mani-pin">
        <div class="vs-blocks" aria-hidden="true"><i></i><i></i><i></i></div>
        <ul class="vs-tags" aria-hidden="true">
${TAGS.map(t => `            <li class="c-${t[4]}${t[5] ? ' vs-dt' : ''}" style="--x:${t[1]};--y:${t[2]};--z:${t[3]}">${t[0]}</li>`).join('\n')}
        </ul>
        <div class="vs-mani-copy">
            <h2 id="vs-mani-t" class="vs-mani-title">Software needs more than code.</h2>
            <p class="vs-mani-sub">It needs the stock rules, the tax rules and the search rules of the market it runs in. We build those in, not bolt them on.</p>
        </div>
    </div>
</section>
<!-- home-scroll-mani:end -->
`;

const CSS = `<!-- home-scroll:start -->
<script>try{var r=document.documentElement;r.classList.add('vs-fh')}catch(e){}</script>
<style>
  /* ================= HOME SCROLL (2026-10-13) — scroll-driven scenes; start states only under html.vs ================= */
  html.lenis, html.lenis body{ height:auto; }
  html.lenis.lenis-smooth{ scroll-behavior:auto !important; }
  .lenis.lenis-smooth [data-lenis-prevent]{ overscroll-behavior:contain; }
  .lenis.lenis-stopped{ overflow:hidden; }

  /* closing band: the navy full-bleed treatment kept from the retired home-motion layer */
  .final-cta-section{ position:relative; overflow:hidden; padding:0 !important; background:var(--navy-deep); }
  .final-cta-section > .container{ position:relative; z-index:2; max-width:none; padding:0; }
  .final-cta{ position:relative; background:transparent !important; border-radius:0; max-width:1180px; margin:0 auto; padding:120px 40px; }
  @media (min-width:1440px){ .final-cta{ max-width:1480px; } }
  @media (min-width:1850px){ .final-cta{ max-width:1720px; } }
  @media (max-width:760px){ .final-cta{ padding:72px 24px; } }
  .final-cta-section::before{ content:''; position:absolute; z-index:0; pointer-events:none; width:46%; height:320%; left:-8%; top:-110%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.32), transparent 62%); filter:blur(46px); }
  .final-cta h2{ color:#fff; position:relative; z-index:2; }
  .final-cta .final-cta-actions{ position:relative; z-index:2; }
  .final-cta .final-cta-note{ color:rgba(255,255,255,.62); }

  /* 6 type: words rise out of their own line */
  .vs-w{ display:inline-block; overflow:hidden; vertical-align:top; padding:0 .03em .14em; margin:0 -.03em -.14em; }
  .vs-wi{ display:inline-block; }
  html.vs .vs-split .vs-wi{ transform:translate3d(0,108%,0); transition:transform 1.1s cubic-bezier(.19,1,.22,1); transition-delay:calc(min(var(--wi), 16) * 40ms); }
  html.vs .vs-split.vs-in .vs-wi{ transform:none; }
  html.vs .vs-r{ opacity:0; transform:translate3d(0,36px,0); transition:opacity .9s cubic-bezier(.19,1,.22,1), transform 1.15s cubic-bezier(.19,1,.22,1); transition-delay:calc(var(--ri,0) * 90ms); }
  html.vs .vs-r.vs-in{ opacity:1; transform:none; }

  /* shared grid lines (the closing band draws them) */
  .vs-hgrid{ position:absolute; inset:0; z-index:1; pointer-events:none; }
  .vs-l{ position:absolute; display:block; background:rgba(255,255,255,.15); }
  .vs-l.v{ top:0; bottom:0; width:1px; }
  .vs-l.v1{ left:33.333%; } .vs-l.v2{ left:66.666%; }
  .vs-l.h{ left:0; right:0; top:58%; height:1px; }
  html.vs .vs-hgrid .vs-l.v{ clip-path:inset(0 0 100% 0); transition:clip-path 1.5s cubic-bezier(.77,0,.18,1); }
  html.vs .vs-hgrid .vs-l.h{ clip-path:inset(0 100% 0 0); transition:clip-path 1.5s cubic-bezier(.77,0,.18,1) .45s; }
  html.vs .vs-hgrid .vs-l.v2{ transition-delay:.18s; }
  html.vs .vs-go .vs-hgrid .vs-l, html.vs .vs-go.vs-hgrid .vs-l, html.vs .vs-go > .vs-hgrid .vs-l{ clip-path:inset(0 0 0 0); }
  html.vs .vs-go .vs-tile{ opacity:1; transform:none; }

  /* 1 hero: cinematic film + staged copy (assets/js/home-film.js); html.vs-fh / html.vs-intro are set in <head> */
  html.vs-fh .tap-new-hero .hero-canvas, html.vs-fh .tap-new-hero .hero-side-text, html.vs-fh .tap-new-hero .hero-spotlight{ display:none; }
  html.vs-fh .tap-new-hero{ background:#05080d; }
  .vs-film{ position:absolute; inset:0; z-index:0; overflow:hidden; pointer-events:none; background:#05080d; }
  .vs-film video{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transform:scale(1.14); transition:transform 10s cubic-bezier(.2,.6,.2,1); }
  .vs-film.open video{ transform:scale(1.02); }
  .vs-film-orbit video{ transform:scale(-1.14, 1.14); }   /* mirrored: the Earth sits right, the dark cockpit behind the copy */
  .vs-film-orbit.open video{ transform:scale(-1.02, 1.02); }
  .vs-film-shade{ position:absolute; inset:0; background:linear-gradient(90deg, rgba(4,9,16,.93) 0%, rgba(4,9,16,.84) 36%, rgba(4,9,16,.48) 58%, rgba(4,9,16,.08) 84%), linear-gradient(180deg, rgba(4,9,16,.4) 0%, rgba(4,9,16,0) 28%, rgba(4,9,16,0) 62%, rgba(4,9,16,.88) 100%); }
  .vs-lid{ position:absolute; left:0; right:0; z-index:2; height:50.5%; background:#05080d; transition:transform 1.7s cubic-bezier(.77,0,.18,1) .2s; }
  .vs-lid.t{ top:0; } .vs-lid.b{ bottom:0; }
  .vs-film.open .vs-lid.t{ transform:translateY(-100%); } .vs-film.open .vs-lid.b{ transform:translateY(100%); }
  html:not(.vs-intro) .vs-lid{ display:none; }
  html.vs-fh .tap-new-hero .container{ position:relative; z-index:2; }
  html.vs-fh .tap-new-hero .hero-social-row{ z-index:3; }
  .vs-hw{ display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.1em; margin-bottom:-.1em; }
  .vs-hwi{ display:inline-block; }
  .hero-main-content h1 .vs-hw, .hero-main-content h1 .vs-hwi{ color:#fff; }   /* the site paints every h1 span orange; only the rotating phrase should be */
  html.vs-intro .tap-new-hero .hero-main-content > :not(h1), html.vs-intro .tap-new-hero h1 .vs-hws{ opacity:0; transform:translate3d(0,26px,0); animation:vsIntroFail 0s linear 5s forwards; }
  html.vs-intro .tap-new-hero h1 .vs-hwi{ transform:translate3d(0,112%,0); animation:vsIntroFail 0s linear 5s forwards; }
  html.vs-intro.vs-intro-text .tap-new-hero .hero-main-content > :not(h1), html.vs-intro.vs-intro-text .tap-new-hero h1 .vs-hws, html.vs-intro.vs-intro-text .tap-new-hero h1 .vs-hwi{ opacity:1; transform:none; animation:none; transition:opacity 1s ease, transform 1.2s cubic-bezier(.19,1,.22,1); }
  html.vs-intro.vs-intro-text .tap-new-hero h1 .vs-hwi, html.vs-intro.vs-intro-text .tap-new-hero h1 .vs-hws{ transition-delay:calc(.2s + var(--w, 0) * .09s); }
  html.vs-intro.vs-intro-text .tap-new-hero .hero-subtitle{ transition-delay:.85s; }
  html.vs-intro.vs-intro-text .tap-new-hero .hero-actions{ transition-delay:1.1s; }
  html.vs-intro.vs-intro-text .tap-new-hero .hero-features-list{ transition-delay:1.3s; }
  html.vs-intro.vs-intro-text .tap-new-hero .trust-strip{ transition-delay:1.45s; }
  html.vs-intro.vs-intro-fast .tap-new-hero .hero-main-content > *, html.vs-intro.vs-intro-fast .tap-new-hero h1 .vs-hwi, html.vs-intro.vs-intro-fast .tap-new-hero h1 .vs-hws{ transition-duration:.45s !important; transition-delay:0s !important; }
  @keyframes vsIntroFail{ to{ opacity:1; transform:none; } }
  @media (max-width:767px){ .vs-film-shade{ background:linear-gradient(180deg, rgba(4,9,16,.5) 0%, rgba(4,9,16,.72) 38%, rgba(4,9,16,.9) 100%); } }
  .vs-skip{ position:fixed; left:50%; bottom:28px; z-index:1001; transform:translateX(-50%); padding:11px 18px; border-radius:999px; border:1px solid rgba(255,255,255,.24); background:rgba(11,32,54,.62); color:#fff; font:500 .68rem/1 var(--font-mono); letter-spacing:.14em; text-transform:uppercase; cursor:pointer; -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); transition:opacity .5s ease, border-color .3s; }
  .vs-skip:hover, .vs-skip:focus-visible{ border-color:rgba(255,255,255,.55); }
  .vs-skip.gone{ opacity:0; pointer-events:none; }

  /* 2 manifesto: static scatter without JS; pinned, scrubbed scene with it */
  .vs-mani{ position:relative; background:#F4F2EC; }
  .vs-mani-pin{ position:relative; min-height:100vh; display:grid; place-items:center; overflow:hidden; padding:14vh 5vw; }
  .vs-mani-copy{ position:relative; z-index:3; text-align:center; width:min(1000px, 90vw); margin:5vh auto 0; will-change:transform; }
  .vs-mani-title{ margin:0; font-family:var(--font-sans); font-weight:700; font-size:clamp(2.6rem, 5.8vw, 6.2rem); line-height:.96; letter-spacing:-.045em; color:var(--ink); }
  .vs-mani-sub{ max-width:38ch; margin:26px auto 0; font-size:clamp(.98rem, 1.15vw, 1.12rem); line-height:1.6; color:var(--ink-soft); }
  .vs-blocks{ display:none; }
  .vs-tags{ list-style:none; margin:0; padding:0; position:absolute; inset:0; z-index:2; pointer-events:none; }
  .vs-tags li{ position:absolute; left:50%; top:50%; padding:7px 10px 6px; font:500 .68rem/1 var(--font-mono); letter-spacing:.12em; text-transform:uppercase; white-space:nowrap; transform:translate(calc(var(--x) * 44vw - 50%), calc(var(--y) * 42vh - 50%)); }
  .c-orange{ background:#D9531E; color:#fff; } .c-sky{ background:#A9C4DE; color:#0B2036; } .c-amber{ background:#F2B53A; color:#0B2036; }
  .c-moss{ background:#5E7426; color:#fff; } .c-navy{ background:#0B2036; color:#fff; } .c-sand{ background:#E3DBC2; color:#0B2036; }
  .c-rose{ background:#F2C3D8; color:#0B2036; } .c-plum{ background:#7A1E48; color:#fff; }
  html.vs .vs-mani{ height:260vh; }
  html.vs .vs-mani-pin{ position:sticky; top:0; height:100vh; min-height:0; padding:0; background:var(--navy-deep); }
  html.vs .vs-mani-pin::before{ content:''; position:absolute; inset:0; background:#F4F2EC; opacity:var(--vs-bg,0); }
  html.vs .vs-blocks{ display:block; position:absolute; inset:0; z-index:1; pointer-events:none; }
  html.vs .vs-blocks i{ position:absolute; left:50%; top:50%; width:100px; height:100px; transform-origin:0 0; will-change:transform,opacity; }
  html.vs .vs-tags li{ transform:none; opacity:0; will-change:transform,opacity; }
  html.vs .vs-mani-title .vs-wi{ will-change:transform; transform:translate3d(0,108%,0); }
  html.vs .vs-mani-sub{ opacity:0; }
  @media (max-width:767px){
    html.vs .vs-mani{ height:230vh; }
    .vs-mani-title{ font-size:clamp(2.5rem, 12vw, 3.4rem); }
    .vs-tags li{ font-size:.6rem; padding:6px 8px 5px; }
    .vs-tags li.vs-dt{ display:none; }
  }

  /* 3 cords: the tool band pins and the stack slides through the middle */
  html.vs .tl-band.vs-cords{ height:380vh; padding:0; overflow:visible; background:#F3F2EE; }
  html.vs .vs-cords .tl-view{ display:none; }
  .vs-cords-pin{ position:sticky; top:0; height:100vh; overflow:hidden; }
  .vs-cord-cv, .vs-cord-gl{ position:absolute; inset:0; z-index:1; display:block; }
  .vs-cords-row{ position:absolute; inset:0; z-index:2; will-change:transform, opacity; }
  .vs-cords-l, .vs-cords-r{ position:absolute; top:50%; z-index:3; margin:0; max-width:5.6em; font-family:var(--font-sans); font-weight:700; font-size:clamp(2.6rem, 5.4vw, 5.6rem); line-height:.94; letter-spacing:-.045em; color:var(--ink); will-change:transform; }
  .vs-cords-l{ left:4.5vw; }
  .vs-cords-r{ right:4.5vw; text-align:right; }
  .vs-cords-mid{ position:absolute; inset:0; z-index:2; }
  .vs-stack-list{ list-style:none; margin:0; padding:0; }
  .vs-si{ position:absolute; left:50%; top:50%; display:flex; flex-direction:column; align-items:center; gap:10px; white-space:nowrap; opacity:0; will-change:transform,opacity; }
  .vs-si img{ height:46px; width:auto; display:block; }
  .vs-si i{ display:none; }
  .vs-si span{ font:500 .68rem/1 var(--font-mono); letter-spacing:.12em; text-transform:uppercase; color:var(--ink-faint); transition:color .3s; }
  .vs-si:not(.has-logo) span{ font:700 1.75rem/1 var(--font-sans); letter-spacing:-.03em; text-transform:none; color:var(--ink); }
  .vs-si.on span{ color:var(--orange-dark); }
  .vs-cords-pin .tl-label{ position:absolute; left:4.5vw; right:auto; bottom:28px; z-index:3; margin:0; padding:0; max-width:30vw; text-align:left; }
  @media (max-width:767px){ .vs-cords-pin .tl-label{ left:6vw; right:6vw; max-width:none; bottom:20px; } }
  @media (max-width:767px){
    html.vs .tl-band.vs-cords{ height:330vh; }
    .vs-cords-l{ top:19%; left:6vw; }
    .vs-cords-r{ top:76%; left:6vw; right:auto; text-align:left; }
    .vs-cords-l, .vs-cords-r{ font-size:2.3rem; }
    .vs-si img{ height:38px; }
    .vs-si:not(.has-logo) span{ font-size:1.4rem; }
  }

  /* 4 stack: How an engagement runs */
  html.vs .hsSteps.vs-stack{ display:block; }
  html.vs .vs-stack .step{ position:sticky; top:calc(var(--vs-top, 110px) + var(--si, 0) * 22px); margin:0 0 9vh !important; animation:none !important; min-height:min(74vh, 640px); border-radius:22px; padding:clamp(22px, 3vw, 44px); display:grid; grid-template-columns:1.05fr 1fr; grid-template-rows:1fr auto; column-gap:clamp(18px, 3vw, 44px); row-gap:20px; overflow:hidden; transform-origin:50% 0; color:var(--ink); box-shadow:0 -24px 60px -34px rgba(0,0,0,.55); will-change:transform; }
  html.vs .vs-stack .step:last-child{ margin-bottom:0 !important; }
  html.vs .vs-stack .step:nth-child(1){ background:#D9531E; color:#fff; }
  html.vs .vs-stack .step:nth-child(2){ background:#A9C4DE; }
  html.vs .vs-stack .step:nth-child(3){ background:#F2EEE3; }
  html.vs .vs-stack .step::after{ content:''; position:absolute; inset:0; z-index:4; background:#06121F; opacity:var(--dim, 0); pointer-events:none; }
  .vs-giant{ display:none; }
  html.vs .vs-stack .vs-giant{ display:block; grid-column:1; grid-row:1; align-self:start; font-family:var(--font-sans); font-weight:700; font-size:clamp(4.6rem, 13vw, 13rem); line-height:.8; letter-spacing:-.065em; margin:0 0 0 -.05em; }
  html.vs .vs-stack .step .hs-shot{ grid-column:2; grid-row:1 / span 2; aspect-ratio:auto; height:100%; min-height:300px; border-radius:14px; margin:0; }
  html.vs .vs-stack .step .hs-shot > .hs-img{ width:100%; height:100%; object-fit:cover; }
  html.vs .vs-stack .step .w{ grid-column:1; grid-row:2; align-self:end; padding:0; }
  html.vs .vs-stack .step .hs-cap{ font-size:clamp(1.5rem, 2.3vw, 2.2rem); letter-spacing:-.02em; color:inherit; }
  html.vs .vs-stack .step .hs-sub{ font-size:clamp(.95rem, 1.1vw, 1.08rem); max-width:36ch; color:inherit; opacity:.82; }
  html.vs .vs-stack .step .hs-n{ color:inherit; opacity:.75; }
  @media (max-width:767px){
    html.vs .vs-stack .step{ grid-template-columns:1fr; grid-template-rows:auto 1fr auto; min-height:70vh; top:calc(var(--vs-top, 90px) + var(--si, 0) * 14px); }
    html.vs .vs-stack .vs-giant{ font-size:4.4rem; }
    html.vs .vs-stack .step .hs-shot{ grid-column:1; grid-row:2; min-height:190px; }
    html.vs .vs-stack .step .w{ grid-row:3; }
  }

  /* 5 markets: rows */
  html.vs .regions-grid.vs-rows{ display:block; border-top:1px solid var(--line-strong); }
  html.vs .vs-rows .region-card{ position:relative; display:grid; grid-template-columns:48px minmax(0, 1.5fr) minmax(0, 1fr) 44px; grid-template-areas:"f n a r" "f n s r"; align-items:center; column-gap:clamp(14px, 2.2vw, 34px); padding:clamp(18px, 2.3vw, 32px) 14px; margin:0; border:0; border-bottom:1px solid var(--line-strong); border-radius:0; background:transparent; box-shadow:none; overflow:hidden; isolation:isolate; }
  html.vs .vs-rows .region-card::after{ display:none; }
  html.vs .vs-rows .region-card::before{ content:''; position:absolute; inset:0; z-index:-1; background:var(--navy-deep); transform:scaleY(0); transform-origin:50% 100%; transition:transform .65s cubic-bezier(.19,1,.22,1); }
  html.vs .vs-rows .region-card:hover{ transform:none; box-shadow:none; }
  html.vs .vs-rows .region-card:hover::before, html.vs .vs-rows .region-card:focus-visible::before{ transform:scaleY(1); transform-origin:50% 0; }
  html.vs .vs-rows .region-flag{ grid-area:f; }
  html.vs .vs-rows .region-card h3{ grid-area:n; margin:0; padding:0; font-size:clamp(1.6rem, 3vw, 2.9rem); letter-spacing:-.035em; line-height:1; transition:transform .7s cubic-bezier(.19,1,.22,1), color .35s; }
  html.vs .vs-rows .region-rate-amount{ grid-area:a; align-self:end; transition:color .35s; }
  html.vs .vs-rows .region-rate-row{ grid-area:s; align-self:start; margin:0; transition:color .35s; }
  html.vs .vs-rows .vs-arrow{ grid-area:r; justify-self:end; font-size:1.5rem; color:var(--orange); transition:transform .6s cubic-bezier(.19,1,.22,1), color .35s; }
  html.vs .vs-rows .region-card:hover h3, html.vs .vs-rows .region-card:focus-visible h3{ transform:translateX(14px); color:#fff; }
  html.vs .vs-rows .region-card:hover .region-rate-amount, html.vs .vs-rows .region-card:hover .region-rate-label, html.vs .vs-rows .region-card:hover .region-rate-period{ color:rgba(255,255,255,.8); }
  html.vs .vs-rows .region-card:hover .vs-arrow{ transform:rotate(45deg); color:#fff; }
  @media (max-width:767px){
    html.vs .vs-rows .region-card{ grid-template-columns:40px minmax(0, 1fr) 30px; grid-template-areas:"f n r" "f a r" "f s r"; row-gap:6px; }
  }
  .vs-chip{ position:fixed; left:0; top:0; z-index:950; width:300px; pointer-events:none; opacity:0; transform:translate3d(-999px,0,0); transition:opacity .35s ease; }
  .vs-chip.on{ opacity:1; }
  .vs-chip-img{ height:192px; border-radius:12px; background:#0B2036 center / cover no-repeat; box-shadow:0 34px 60px -22px rgba(0,0,0,.5); transform:scale(.82); transition:transform .6s cubic-bezier(.19,1,.22,1); }
  .vs-chip.on .vs-chip-img{ transform:none; }
  .vs-chip-tag{ display:inline-block; margin-top:9px; padding:7px 10px 6px; background:#F2B53A; color:#0B2036; font:500 .66rem/1 var(--font-mono); letter-spacing:.12em; text-transform:uppercase; }

  /* closing band grid */
  .vs-cgrid .vs-l{ background:rgba(255,255,255,.12); }
  .vs-cgrid .vs-l.h{ top:50%; }
  html.vs .final-cta.vs-go .vs-l{ clip-path:inset(0 0 0 0); }
</style>
<!-- home-scroll:end -->
`;

const JS = `<!-- home-scroll-js:start -->
<script src="/assets/js/vendor/lenis-1.1.13.min.js" defer></script>
<script src="/assets/js/home-scroll.js" defer></script>
<script src="/assets/js/home-film.js" defer></script>
<!-- home-scroll-js:end -->
`;

const cut = (s, a, b) => s.replace(new RegExp(`<!-- ${a} -->[\\s\\S]*?<!-- ${b} -->\\n?`), '');
let s = L.read(REL).replace(/\r\n/g, '\n');
// retire the one-shot layer this replaces, and any earlier copy of this one
s = cut(s, 'home-motion:start', 'home-motion:end');
s = cut(s, 'home-motion-js:start', 'home-motion-js:end');
s = cut(s, 'home-scroll:start', 'home-scroll:end');
s = cut(s, 'home-scroll-mani:start', 'home-scroll-mani:end');
s = cut(s, 'home-scroll-js:start', 'home-scroll-js:end');
if (!STRIP) {
  ['<section class="tap-new-hero">', '<!-- trust-strip-band:start -->', 'class="tl-band"', 'hsSteps', 'regions-grid', '<div class="final-cta">'].forEach(k => L.must(s, k));
  s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
  s = L.replaceAll(s, '<!-- trust-strip-band:start -->', MANI + '\n<!-- trust-strip-band:start -->', 1);
  s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
  ['home-scroll:start', 'home-scroll-mani:start', 'home-scroll-js:start'].forEach(k => L.must(s, k, 1));
}
if (s.includes('home-motion:start')) throw new Error('home-motion layer still present');
s = s.replace(/\r?\n/g, '\r\n');
fs.writeFileSync(path.join(L.REPO, REL), s);
console.log((STRIP ? 'home scroll stripped:' : 'home scroll applied:'), REL);
