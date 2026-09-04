'use strict';
// UK MOTION — the signature design for the UK set (owner, 2026-09-03: "every page different different
// design but our branding colours all are same, only change with every page the styles, animation, all
// that ... also the hero section make it even shorter for the new pages ... without hurting page speed
// or SEO"). Same discipline as home_motion.js: one-shot, in-view, transform/opacity/clip-path/dashoffset
// only, one IntersectionObserver that unobserves after firing, so once a visitor has scrolled past a
// section it costs nothing. Start states are scoped under html.ukm, a class only JS adds after the
// reduced-motion check, so with JS off (and for a crawler) the page renders complete and static.
//
//   /uk/       "TUBE MAP" — an Underground-style diagram drawn into the services section: one origin
//              roundel (Kochi), three service lines that dogleg out to ERP / WEB / SEO stations, then
//              converge into one terminus, "Your business". The lines draw themselves once via
//              pathLength=1 + stroke-dashoffset; the roundels pop in behind each line as it arrives.
//              It ships as real inline SVG markup, so with JS off it is simply a finished diagram.
//   /uk/erp/   "ASSEMBLY LINE" — a belt draws across the top of the eight module cards and each card
//              rides up onto it in sequence, like parts arriving on a line.
//   both       an even shorter hero than /us/ (~500px at 1440 vs 622), and the closing navy band with
//              the converging-lines canvas and the VIBGYOR sheen on the heading — the one signature
//              that repeats across the site. That canvas is the only continuous animation, it runs only
//              while the band is on screen, and it stops on a hidden tab.
//   node scripts/country-pages/uk_motion.js           apply / re-apply
//   node scripts/country-pages/uk_motion.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = { 'uk/index.html': 'hub', 'uk/erp/index.html': 'erp', 'uk/website-development/index.html': 'web', 'uk/seo-services/index.html': 'seo', 'uk/manchester/index.html': 'city', 'uk/reading/index.html': 'reading', 'uk/london/index.html': 'london', 'uk/scotland/index.html': 'scotland' };

const CSS = `<!-- uk-motion:start -->
<style>
  /* ================= UK MOTION (2026-09-03) — one signature per page, one-shot ================= */
  /* hero: shorter again than /us/ (owner: even shorter for the new pages) */
  .tap-new-hero{ padding:56px 0 48px; }
  .tap-new-hero .eyebrow{ margin:2px 0 6px; }
  .hero-main-content h1{ line-height:1.02; margin:8px 0 10px; }
  .hero-subtitle{ margin:0 0 16px; }
  .hero-features-list{ gap:10px 30px; padding-top:14px; margin-top:0; }
  .hero-grid .trust-strip{ gap:10px 30px; padding-top:14px; }
  @media (min-width:1250px){ .hero-features-list{ gap:10px 40px; } .hero-grid .trust-strip{ gap:10px 52px; } }
  @media (min-width:1900px){ .tap-new-hero{ padding:68px 0 60px; } }
  @media (max-width:760px){ .tap-new-hero{ padding:48px 0 44px; } .hero-subtitle{ margin:0 0 14px; } }

  /* quiet fade for section heads, so the signature move is the loud part */
  html.ukm .ukm-a{ opacity:0; }
  html.ukm .ukm-a.in{ animation:ukmFade .7s ease forwards; }
  @keyframes ukmFade{ to{ opacity:1; } }

  /* ---- /uk/ : the tube map ---- */
  .uk-tube{ margin:30px 0 6px; }
  .uk-tube svg{ display:block; width:100%; height:auto; max-height:230px; overflow:visible; }
  .uk-tube .ln{ fill:none; stroke-width:7; stroke-linecap:round; stroke-linejoin:round; }
  .uk-tube .l1{ stroke:var(--orange); } .uk-tube .l2{ stroke:var(--navy-deep); } .uk-tube .l3{ stroke:var(--ink-faint); }
  .uk-tube .stn{ fill:var(--paper); stroke:var(--ink); stroke-width:4; }
  .uk-tube .stn.o{ stroke:var(--orange); } .uk-tube .term{ fill:var(--orange); stroke:none; }
  .uk-tube text{ font-family:var(--font-mono); font-size:13px; letter-spacing:.09em; fill:var(--ink); text-transform:uppercase; }
  .uk-tube text.sub{ font-size:11px; fill:var(--ink-faint); letter-spacing:.06em; }
  html.ukm .uk-tube .ln{ stroke-dasharray:1; stroke-dashoffset:1; }
  html.ukm .uk-tube.in .ln{ animation:ukmDraw 1.5s cubic-bezier(.4,0,.3,1) forwards; animation-delay:calc(var(--d,0) * 1s); }
  @keyframes ukmDraw{ to{ stroke-dashoffset:0; } }
  html.ukm .uk-tube .stn, html.ukm .uk-tube .term, html.ukm .uk-tube text{ opacity:0; }
  html.ukm .uk-tube.in .stn, html.ukm .uk-tube.in .term, html.ukm .uk-tube.in text{ animation:ukmPop .5s cubic-bezier(.2,.9,.3,1) forwards; animation-delay:calc(.55s + var(--d,0) * 1s); }
  @keyframes ukmPop{ from{ opacity:0; transform:scale(.4); } to{ opacity:1; transform:none; } }
  .uk-tube .stn, .uk-tube .term{ transform-box:fill-box; transform-origin:50% 50%; }
  @media (max-width:760px){ .uk-tube{ display:none; } }   /* the copy below carries the same information */

  /* ---- /uk/erp/ : the assembly line ---- */
  .us-modules-grid{ position:relative; }
  .uk-belt{ position:absolute; left:0; right:0; top:-16px; height:2px; background:linear-gradient(90deg, var(--orange), var(--orange-dark)); transform:scaleX(0); transform-origin:0 50%; }
  html.ukm .uk-belt.in{ animation:ukmBelt 1.1s cubic-bezier(.3,0,.2,1) forwards; }
  @keyframes ukmBelt{ to{ transform:scaleX(1); } }
  html.ukm .uk-part{ opacity:0; transform:translate3d(0,30px,0) rotate(-1.5deg); }
  html.ukm .uk-part.in{ animation:ukmPart .75s cubic-bezier(.2,.85,.25,1) forwards; animation-delay:calc(.25s + var(--i,0) * .08s); }
  @keyframes ukmPart{ to{ opacity:1; transform:none; } }

  /* ---- /uk/website-development/ : wireframe becomes the real thing ---- */
  html.ukm .uk-wire{ opacity:0; }
  html.ukm .uk-wire.in{ animation:ukmWire 1.15s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(var(--i,0) * .07s); }
  @keyframes ukmWire{
    0%{ opacity:0; transform:translate3d(0,14px,0) scale(.985); border-style:dashed; border-color:var(--ink-faint); background:transparent; }
    45%{ opacity:1; transform:none; border-style:dashed; border-color:var(--ink-faint); background:transparent; }
    100%{ opacity:1; transform:none; border-style:solid; }
  }
  .uk-blueprint{ position:absolute; inset:0; z-index:0; pointer-events:none; opacity:0; background-image:linear-gradient(rgba(14,42,62,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(14,42,62,.07) 1px, transparent 1px); background-size:34px 34px; }
  html.ukm .uk-blueprint.in{ animation:ukmBlueprint 2.4s ease forwards; }
  @keyframes ukmBlueprint{ 0%{ opacity:0; } 22%{ opacity:1; } 100%{ opacity:0; } }

  /* ---- /uk/seo-services/ : the SERP climb ---- */
  .uk-serp{ margin:30px 0 4px; border:1px solid var(--line); border-radius:14px; background:var(--paper); padding:18px 20px; max-width:760px; }
  .uk-serp ol{ list-style:none; margin:0; padding:0; counter-reset:pos; }
  .uk-serp li{ counter-increment:pos; display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px dashed var(--line); font-size:.92rem; color:var(--ink-soft); }
  .uk-serp li:last-child{ border-bottom:none; }
  .uk-serp li::before{ content:counter(pos); flex:0 0 26px; height:26px; border-radius:7px; background:var(--paper-alt); color:var(--ink-faint); font-family:var(--font-mono); font-size:.76rem; display:flex; align-items:center; justify-content:center; }
  .uk-serp li.you{ color:var(--ink); font-weight:600; }
  .uk-serp li.you::before{ background:var(--orange); color:#fff; }
  .uk-serp .ai{ margin-top:14px; padding:14px 16px; border-radius:12px; background:var(--navy-deep); color:rgba(255,255,255,.92); font-size:.9rem; line-height:1.55; }
  .uk-serp .ai b{ display:block; font-family:var(--font-mono); font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--orange); margin-bottom:6px; }
  .uk-serp .ai i{ font-style:normal; border-right:2px solid var(--orange); padding-right:2px; }
  html.ukm .uk-serp li.you{ order:9; }
  html.ukm .uk-serp.in li.you{ animation:ukmClimb 1.5s cubic-bezier(.3,0,.2,1) .3s forwards; }
  @keyframes ukmClimb{ 0%{ order:9; transform:translateY(0); } 99%{ transform:translateY(0); } 100%{ order:-1; } }
  html.ukm .uk-serp .ai{ opacity:0; }
  html.ukm .uk-serp.in .ai{ animation:ukmFade .8s ease 1.6s forwards; }

  /* ---- /uk/manchester/ : the postcode stamp ---- */
  .uk-stamp{ display:inline-flex; align-items:center; gap:14px; margin:26px 0 2px; padding:14px 22px; border:2px solid var(--orange); border-radius:12px; background:var(--paper); }
  .uk-stamp b{ font-family:var(--font-mono); font-size:clamp(1.6rem, 3.4vw, 2.4rem); letter-spacing:.06em; color:var(--orange-dark); line-height:1; }
  .uk-stamp span{ font-family:var(--font-mono); font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-faint); max-width:26ch; line-height:1.5; }
  html.ukm .uk-stamp{ opacity:0; transform:scale(1.35) rotate(-7deg); }
  html.ukm .uk-stamp.in{ animation:ukmStamp .5s cubic-bezier(.2,1.4,.4,1) forwards; }
  @keyframes ukmStamp{ 60%{ opacity:1; transform:scale(.97) rotate(1deg); } 100%{ opacity:1; transform:none; } }

  /* ---- /uk/reading/ : the Core Web Vitals dials ---- */
  .uk-dials{ display:flex; flex-wrap:wrap; gap:clamp(20px, 4vw, 54px); margin:28px 0 4px; }
  .uk-dial{ text-align:center; width:132px; }
  .uk-dial svg{ display:block; width:132px; height:78px; overflow:visible; }
  .uk-dial .bg{ fill:none; stroke:var(--line); stroke-width:9; stroke-linecap:round; }
  .uk-dial .val{ fill:none; stroke:var(--orange); stroke-width:9; stroke-linecap:round; }
  .uk-dial b{ display:block; font-family:var(--font-mono); font-size:1.02rem; color:var(--ink); margin-top:-16px; }
  .uk-dial span{ display:block; font-family:var(--font-mono); font-size:.62rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); margin-top:4px; }
  html.ukm .uk-dial .val{ stroke-dasharray:1; stroke-dashoffset:1; }
  html.ukm .uk-dials.in .val{ animation:ukmSweep 1.3s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d,0) * .18s); }
  @keyframes ukmSweep{ to{ stroke-dashoffset:.1; } }   /* 0.1 of the arc left = a 90+ score */

  /* ---- /uk/london/ : the working-day overlap bar ---- */
  .uk-overlap{ margin:28px 0 4px; max-width:820px; }
  .uk-overlap .row{ display:flex; align-items:center; gap:14px; margin-bottom:10px; }
  .uk-overlap .who{ flex:0 0 108px; font-family:var(--font-mono); font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); text-align:right; }
  .uk-overlap .bar{ position:relative; flex:1; height:26px; border-radius:7px; background:var(--paper-alt); border:1px solid var(--line); overflow:hidden; }
  .uk-overlap .bar i{ position:absolute; top:0; bottom:0; background:var(--ink-faint); opacity:.32; transform:scaleX(0); transform-origin:0 50%; }
  .uk-overlap .bar i.lap{ background:var(--orange); opacity:.9; }
  .uk-overlap .hours{ display:flex; gap:14px; margin-left:122px; font-family:var(--font-mono); font-size:.62rem; color:var(--ink-faint); justify-content:space-between; }
  html.ukm .uk-overlap.in .bar i{ animation:ukmBar .9s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d,0) * .22s); }
  @keyframes ukmBar{ to{ transform:scaleX(1); } }

  /* ---- /uk/scotland/ : the two-city sector bars ---- */
  .uk-cities{ display:flex; flex-wrap:wrap; gap:clamp(24px, 5vw, 64px); margin:28px 0 4px; }
  .uk-city{ flex:1 1 260px; min-width:240px; }
  .uk-city h4{ font-family:var(--font-mono); font-size:.76rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink); margin:0 0 14px; }
  .uk-city .b{ display:flex; align-items:center; gap:12px; margin-bottom:9px; font-size:.86rem; color:var(--ink-soft); }
  .uk-city .b em{ font-style:normal; flex:0 0 118px; }
  .uk-city .b s{ text-decoration:none; flex:1; height:9px; border-radius:5px; background:var(--paper-alt); overflow:hidden; }
  .uk-city .b s u{ display:block; height:100%; text-decoration:none; background:var(--orange); transform:scaleX(0); transform-origin:0 50%; }
  html.ukm .uk-cities.in .b s u{ animation:ukmBar 1s cubic-bezier(.3,0,.2,1) forwards; animation-delay:calc(var(--d,0) * .12s); }

  /* ---- both : the closing band ---- */
  .final-cta-section{ position:relative; overflow:hidden; }
  .final-cta-section > *{ position:relative; z-index:2; }
  .final-cta-section::before{ content:''; position:absolute; z-index:0; pointer-events:none; width:46%; height:320%; left:-8%; top:-110%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.32), transparent 62%); filter:blur(46px); }
  html.ukm .final-cta-section.ukm-live::before{ animation:ukmAurora 30s ease-in-out infinite alternate; }
  @keyframes ukmAurora{ from{ transform:translate3d(0,0,0) scale(1); } to{ transform:translate3d(10%,6%,0) scale(1.15); } }
  .ukm-spark{ position:absolute; inset:0; z-index:1; width:100%; height:100%; pointer-events:none; }
  .ukm-vib{ background-image:linear-gradient(90deg,#86FFAE,#FFF06B,#FFC46B,#FF8A8A,#D9A6FF,#7FE3FF,#86FFAE); background-size:220% 100%; background-position:0% 50%; background-repeat:no-repeat; -webkit-background-clip:text; background-clip:text; color:transparent !important; -webkit-text-fill-color:transparent; }
  html.ukm .final-cta-section.ukm-live .ukm-vib{ animation:ukmSheen 14s linear infinite; }
  @keyframes ukmSheen{ to{ background-position:100% 50%; } }
  .final-cta .final-cta-note{ color:rgba(255,255,255,.62); }

  @media (prefers-reduced-motion: reduce){
    .ukm-spark{ display:none !important; }
    .final-cta-section::before, .ukm-vib{ animation:none !important; }
  }
</style>
<!-- uk-motion:end -->
`;

// The tube map ships as real markup: with JS off it is a finished diagram, not an empty box.
const TUBE = `        <!-- uk-tube:start -->
        <div class="uk-tube" aria-hidden="true">
            <svg viewBox="0 0 1200 210" role="presentation" focusable="false">
                <path class="ln l1" style="--d:0" pathLength="1" d="M70 105 H250 L330 45 H700" />
                <path class="ln l2" style="--d:.18" pathLength="1" d="M70 105 H700" />
                <path class="ln l3" style="--d:.36" pathLength="1" d="M70 105 H250 L330 165 H700" />
                <path class="ln l1" style="--d:1.05" pathLength="1" d="M700 45 L790 105 H1030" />
                <path class="ln l2" style="--d:1.05" pathLength="1" d="M700 105 H1030" />
                <path class="ln l3" style="--d:1.05" pathLength="1" d="M700 165 L790 105 H1030" />
                <circle class="stn o" style="--d:0" cx="70" cy="105" r="11" />
                <text style="--d:0" x="70" y="140" text-anchor="middle">Kochi</text>
                <text class="sub" style="--d:0" x="70" y="157" text-anchor="middle">one team</text>
                <circle class="stn o" style="--d:.62" cx="700" cy="45" r="11" />
                <text style="--d:.62" x="700" y="28" text-anchor="middle">ERP</text>
                <circle class="stn" style="--d:.8" cx="700" cy="105" r="11" />
                <text style="--d:.8" x="716" y="98" text-anchor="start">Web</text>
                <circle class="stn" style="--d:.98" cx="700" cy="165" r="11" />
                <text style="--d:.98" x="700" y="192" text-anchor="middle">SEO / AEO / GEO</text>
                <circle class="term" style="--d:1.5" cx="1030" cy="105" r="14" />
                <text style="--d:1.5" x="1030" y="78" text-anchor="middle">Your business</text>
                <text class="sub" style="--d:1.5" x="1030" y="140" text-anchor="middle">one invoice &middot; one team</text>
            </svg>
        </div>
        <!-- uk-tube:end -->
`;

// The SEO page's illustration: a results page where the client's row climbs to the top, then the AI
// answer that follows. Real markup, so with JS off it is a finished, honest diagram. No competitor
// names (CONTEXT rule 2) - the other rows are described by type.
const SERP = `        <!-- uk-serp:start -->
        <div class="uk-serp">
            <p class="us-cost-note" style="margin:0 0 12px">Illustration &mdash; the same query, both games. Your page has to climb the list <em>and</em> become the source the AI answer names.</p>
            <ol>
                <li>Directory listing</li>
                <li>Software comparison site</li>
                <li>Vendor brochure page</li>
                <li>Trade publication article</li>
                <li class="you">Your page &mdash; answer-first, structured, verifiable</li>
            </ol>
            <div class="ai">
                <b>AI answer</b>
                <i>For a UK manufacturer, the practical shortlist depends on production method, VAT and MTD handling, and whether per-user licensing will outgrow the business &mdash; as set out in your guide.</i>
            </div>
        </div>
        <!-- uk-serp:end -->
`;
// The city pages' signature: the postcode area stamped onto the page, once.
const STAMP = `        <!-- uk-stamp:start -->
        <div class="uk-stamp">
            <b>M1&ndash;M90</b>
            <span>Greater Manchester &middot; Trafford Park to Oldham &middot; remote team, UK data</span>
        </div>
        <!-- uk-stamp:end -->
`;
// The Reading page's signature: the three Core Web Vitals we hold every build to, sweeping to the
// 90+ mark once. These are our build standard, not a measured client result, and the labels say so.
const DIALS = `        <!-- uk-dials:start -->
        <div class="uk-dials" aria-hidden="true">
            <div class="uk-dial">
                <svg viewBox="0 0 120 70" role="presentation" focusable="false"><path class="bg" d="M12 62a48 48 0 0196 0"/><path class="val" style="--d:0" pathLength="1" d="M12 62a48 48 0 0196 0"/></svg>
                <b>LCP</b>
                <span>under 2.5s</span>
            </div>
            <div class="uk-dial">
                <svg viewBox="0 0 120 70" role="presentation" focusable="false"><path class="bg" d="M12 62a48 48 0 0196 0"/><path class="val" style="--d:1" pathLength="1" d="M12 62a48 48 0 0196 0"/></svg>
                <b>INP</b>
                <span>under 200ms</span>
            </div>
            <div class="uk-dial">
                <svg viewBox="0 0 120 70" role="presentation" focusable="false"><path class="bg" d="M12 62a48 48 0 0196 0"/><path class="val" style="--d:2" pathLength="1" d="M12 62a48 48 0 0196 0"/></svg>
                <b>CLS</b>
                <span>under 0.1</span>
            </div>
        </div>
        <p class="us-cost-note" style="margin:6px 0 0">The build standard we hold, measured on a mid-range Android over 4G &mdash; verifiable in PageSpeed Insights on launch day.</p>
        <!-- uk-dials:end -->
`;
// The London page's signature: the two working days side by side, with the live window highlighted.
// Hours are BST (Kochi is UTC+5:30, London UTC+1 in summer), so the overlap shown is real.
const OVERLAP = `        <!-- uk-overlap:start -->
        <div class="uk-overlap" aria-hidden="true">
            <div class="row">
                <span class="who">London 9&ndash;6</span>
                <span class="bar"><i style="--d:0;left:0%;width:100%"></i><i class="lap" style="--d:1;left:22%;width:33%"></i></span>
            </div>
            <div class="row">
                <span class="who">Kochi 9&ndash;6</span>
                <span class="bar"><i style="--d:0;left:19%;width:81%"></i><i class="lap" style="--d:1;left:22%;width:33%"></i></span>
            </div>
            <div class="hours"><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></div>
        </div>
        <p class="us-cost-note" style="margin:8px 0 0">The orange band is the live window: roughly 09:00&ndash;13:30 London time in summer, when calls, Slack and Teams all work without anyone staying late.</p>
        <!-- uk-overlap:end -->
`;
// The Scotland page's signature: the two economies as sector weightings, rising once. These are
// shape-of-demand indications from the keyword and SERP research, labelled as such - not statistics.
const CITIES = `        <!-- uk-cities:start -->
        <div class="uk-cities" aria-hidden="true">
            <div class="uk-city">
                <h4>Aberdeen &mdash; field first</h4>
                <div class="b"><em>Energy services</em><s><u style="--d:0;width:92%"></u></s></div>
                <div class="b"><em>Inspection</em><s><u style="--d:1;width:74%"></u></s></div>
                <div class="b"><em>Fabrication</em><s><u style="--d:2;width:61%"></u></s></div>
                <div class="b"><em>Construction</em><s><u style="--d:3;width:55%"></u></s></div>
            </div>
            <div class="uk-city">
                <h4>Edinburgh &mdash; office first</h4>
                <div class="b"><em>Financial services</em><s><u style="--d:2;width:88%"></u></s></div>
                <div class="b"><em>Professional</em><s><u style="--d:3;width:76%"></u></s></div>
                <div class="b"><em>Software &amp; fintech</em><s><u style="--d:4;width:68%"></u></s></div>
                <div class="b"><em>Food &amp; drink</em><s><u style="--d:5;width:58%"></u></s></div>
            </div>
        </div>
        <p class="us-cost-note" style="margin:8px 0 0">Indicative weighting of the work these two cities ask us about, from the keyword and SERP research behind this page &mdash; not published statistics.</p>
        <!-- uk-cities:end -->
`;
const BELT = `            <!-- uk-belt:start --><i class="uk-belt" aria-hidden="true"></i><!-- uk-belt:end -->
`;

const JS = `<!-- uk-motion-js:start -->
<script>
(function(){
    var KIND = '__UKM_KIND__';                  // hub | erp | web - substituted per page by the generator
    var doc = document.documentElement;
    var band = document.querySelector('.final-cta-section'), cta = band && band.querySelector('.final-cta');
    var h2 = cta && cta.querySelector('h2'), note = cta && cta.querySelector('.final-cta-note');
    if (h2) h2.classList.add('ukm-vib');
    if (note) note.classList.add('ukm-vib');
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    doc.classList.add('ukm');
    function $(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

    var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target); });
    }, { rootMargin: '0px 0px -12% 0px' });
    function arm(els){ els.forEach(function(e){ e.classList.remove('reveal'); io.observe(e); }); }

    /* the tube map draws itself once */
    arm($('.uk-tube'));

    /* the assembly line: the ERP page only */
    var grid = KIND === 'erp' ? document.querySelector('.us-modules-grid') : null;
    if (grid && !grid.querySelector('.uk-belt')){
        var belt = document.createElement('i'); belt.className = 'uk-belt'; belt.setAttribute('aria-hidden', 'true');
        grid.appendChild(belt);
    }
    if (grid){
        arm($('.uk-belt', grid));
        var parts = Array.prototype.slice.call(grid.children).filter(function(c){ return !c.classList.contains('uk-belt'); });
        parts.forEach(function(c, i){ c.classList.add('uk-part'); c.style.setProperty('--i', Math.min(i, 8)); });
        arm(parts);
    }

    /* the wireframe pass: the website page only - cards resolve from dashed outlines into real cards */
    if (KIND === 'web'){
        $('.us-modules-grid').forEach(function(g){
            if (getComputedStyle(g).position === 'static') g.style.position = 'relative';
            var bp = document.createElement('i'); bp.className = 'uk-blueprint'; bp.setAttribute('aria-hidden', 'true');
            g.appendChild(bp); arm([bp]);
            var cards = Array.prototype.slice.call(g.children).filter(function(c){ return !c.classList.contains('uk-blueprint'); });
            cards.forEach(function(c, i){ c.classList.add('uk-wire'); c.style.setProperty('--i', Math.min(i, 8)); });
            arm(cards);
        });
    }

    /* the SERP climb: the client's row rises to the top, then the AI answer types itself */
    if (KIND === 'seo'){
        var serp = document.querySelector('.uk-serp');
        if (serp){
            arm([serp]);
            var you = serp.querySelector('li.you'), list = serp.querySelector('ol');
            var typeEl = serp.querySelector('.ai i'), full = typeEl ? typeEl.textContent : '';
            if (typeEl) typeEl.textContent = '';
            new IntersectionObserver(function(es, ob){
                if (!es[0].isIntersecting) return;
                ob.disconnect();
                setTimeout(function(){ if (you && list) list.insertBefore(you, list.firstChild); }, 1500);
                var i = 0;
                setTimeout(function tick(){ if (!typeEl || i > full.length) return; typeEl.textContent = full.slice(0, i++); setTimeout(tick, 18); }, 2100);
            }, { rootMargin: '0px 0px -20% 0px' }).observe(serp);
        }
    }

    /* the postcode stamp: it lands once, like a rubber stamp */
    if (KIND === 'city') arm($('.uk-stamp'));

    /* the dials sweep once to the 90+ mark */
    if (KIND === 'reading') arm($('.uk-dials'));

    if (KIND === 'london') arm($('.uk-overlap'));
    if (KIND === 'scotland') arm($('.uk-cities'));

    /* everything else gets the quiet fade */
    arm($('.section-head'));

    /* the closing band: converging lines into the heading */
    if (band && cta && document.createElement('canvas').getContext){
        var cv = document.createElement('canvas');
        cv.className = 'ukm-spark'; cv.setAttribute('aria-hidden', 'true');
        band.insertBefore(cv, band.firstChild);
        var x = cv.getContext('2d'), W = 0, H = 0, P = [], run = false, last = 0, glow = 0, fx = 0, fy = 0;
        function seed(){
            var e = Math.random(), px, py;
            if (e < .5){ px = Math.random() * W; py = Math.random() < .5 ? -20 : H + 20; }
            else { px = Math.random() < .5 ? -20 : W + 20; py = Math.random() * H; }
            return { ox: px, oy: py, t: Math.random(), v: .1 + Math.random() * .22, c: Math.random() < .45, r: .9 + Math.random() * 1.6 };
        }
        function layout(){
            W = band.offsetWidth; H = band.offsetHeight;
            var r = Math.min(window.devicePixelRatio || 1, 1.75);
            cv.width = Math.max(1, Math.round(W * r)); cv.height = Math.max(1, Math.round(H * r));
            x.setTransform(r, 0, 0, r, 0, 0);
            var br = band.getBoundingClientRect();
            if (h2){ var hr = h2.getBoundingClientRect(); fx = hr.left - br.left + hr.width * .5; fy = hr.top - br.top + hr.height * .5; }
            else { fx = W * .3; fy = H * .5; }
            var want = W < 760 ? 30 : 64;
            while (P.length > want) P.pop();
            while (P.length < want) P.push(seed());
        }
        function frame(now){
            if (!run) return;
            var dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
            var arrived = 0, i;
            x.clearRect(0, 0, W, H);
            for (i = 0; i < P.length; i++){
                var p = P[i];
                p.t += dt * p.v; if (p.t >= 1){ P[i] = seed(); continue; }
                var e = 1 - Math.pow(1 - p.t, 3), px = p.ox + (fx - p.ox) * e, py = p.oy + (fy - p.oy) * e, tail = Math.max(0, e - .12);
                if (p.t > .82) arrived++;
                x.beginPath(); x.moveTo(p.ox + (fx - p.ox) * tail, p.oy + (fy - p.oy) * tail); x.lineTo(px, py);
                x.strokeStyle = 'rgba(' + (p.c ? '217,83,30' : '255,255,255') + ',' + (.05 + e * .22) + ')'; x.lineWidth = 1; x.stroke();
                x.beginPath(); x.arc(px, py, p.r, 0, 6.283);
                x.fillStyle = 'rgba(' + (p.c ? '217,83,30' : '255,255,255') + ',' + (.2 + e * .6) + ')'; x.fill();
            }
            glow += (Math.min(1, arrived / 8) - glow) * .08;
            if (glow > .01){
                var g = x.createRadialGradient(fx, fy, 0, fx, fy, 110 + glow * 80);
                g.addColorStop(0, 'rgba(217,83,30,' + (.2 * glow) + ')'); g.addColorStop(1, 'rgba(217,83,30,0)');
                x.fillStyle = g; x.beginPath(); x.arc(fx, fy, 110 + glow * 80, 0, 6.283); x.fill();
            }
            requestAnimationFrame(frame);
        }
        function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }
        layout();
        var rt = 0; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(layout, 180); });
        window.addEventListener('load', layout);
        document.addEventListener('visibilitychange', function(){ if (document.hidden) setRun(false); });
        new IntersectionObserver(function(es){
            var vis = es[0].isIntersecting;
            band.classList.toggle('ukm-live', vis);      // the two loops only exist while the band is on screen
            setRun(vis && !document.hidden);
        }, { rootMargin: '10% 0px' }).observe(band);
    }
})();
</script>
<!-- uk-motion-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- uk-motion:start -->[\s\S]*?<!-- uk-motion:end -->\n/, '')
          .replace(/<!-- uk-motion-js:start -->[\s\S]*?<!-- uk-motion-js:end -->\n/, '')
          .replace(/ *<!-- uk-tube:start -->[\s\S]*?<!-- uk-tube:end -->\n/, '')
          .replace(/ *<!-- uk-belt:start -->.*?<!-- uk-belt:end -->\n/, '')
          .replace(/ *<!-- uk-serp:start -->[\s\S]*?<!-- uk-serp:end -->\n/, '')
          .replace(/ *<!-- uk-stamp:start -->[\s\S]*?<!-- uk-stamp:end -->\n/, '')
          .replace(/ *<!-- uk-dials:start -->[\s\S]*?<!-- uk-dials:end -->\n/, '')
          .replace(/ *<!-- uk-overlap:start -->[\s\S]*?<!-- uk-overlap:end -->\n/, '')
          .replace(/ *<!-- uk-cities:start -->[\s\S]*?<!-- uk-cities:end -->\n/, '');
}

for (const [rel, kind] of Object.entries(PAGES)) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '<section class="final-cta-section" id="contact">', 1);
    if (kind === 'hub') {
      // the diagram goes between the services section head and the three cards
      const anchor = '        <div class="pillars-grid">';
      L.must(s, anchor, 1);
      s = L.replaceAll(s, anchor, TUBE + anchor, 1);
      L.must(s, 'uk-tube:start', 1);
    }
    if (kind === 'london') {
      const at = s.indexOf('id="ldn-overlap"');
      if (at < 0) throw new Error('ldn-overlap section not found');
      const row = s.indexOf('        <div class="erp-benefit-row">', at);
      if (row < 0) throw new Error('ldn-overlap benefit row not found');
      s = s.slice(0, row) + OVERLAP + s.slice(row);
      L.must(s, 'uk-overlap:start', 1);
    }
    if (kind === 'scotland') {
      const at = s.indexOf('id="sco-two"');
      if (at < 0) throw new Error('sco-two section not found');
      const row = s.indexOf('        <div class="erp-benefit-row">', at);
      if (row < 0) throw new Error('sco-two benefit row not found');
      s = s.slice(0, row) + CITIES + s.slice(row);
      L.must(s, 'uk-cities:start', 1);
    }
    if (kind === 'reading') {
      const at = s.indexOf('id="rdg-speed"');
      if (at < 0) throw new Error('rdg-speed section not found');
      const row = s.indexOf('        <div class="erp-benefit-row">', at);
      if (row < 0) throw new Error('rdg-speed benefit row not found');
      s = s.slice(0, row) + DIALS + s.slice(row);
      L.must(s, 'uk-dials:start', 1);
    }
    if (kind === 'city') {
      const at = s.indexOf('id="mcr-floor"');
      if (at < 0) throw new Error('mcr-floor section not found');
      const grid = s.indexOf('        <div class="erp-benefit-row">', at);
      if (grid < 0) throw new Error('city benefit row not found');
      s = s.slice(0, grid) + STAMP + s.slice(grid);
      L.must(s, 'uk-stamp:start', 1);
    }
    if (kind === 'seo') {
      // the illustration goes inside the AEO/GEO section, just before its card grid
      const at = s.indexOf('id="aeo-geo"');
      if (at < 0) throw new Error('aeo-geo section not found');
      const grid = s.indexOf('        <div class="us-modules-grid">', at);
      if (grid < 0) throw new Error('aeo-geo card grid not found');
      s = s.slice(0, grid) + SERP + s.slice(grid);
      L.must(s, 'uk-serp:start', 1);
    }
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS.replace('__UKM_KIND__', kind) + '</body>\n</html>\n');
    L.must(s, 'uk-motion:start', 1); L.must(s, 'uk-motion-js:start', 1);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'uk motion stripped:' : 'uk motion applied:'), rel, '(' + kind + ')');
}
