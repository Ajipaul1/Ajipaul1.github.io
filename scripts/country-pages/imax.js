'use strict';
// IMAX layer for the US homepage (owner, 2026-09-03: "maximum IMAX experience — moving backgrounds on the white
// sections, text animation, card animation, images travelling as you scroll, all the advanced things").
// Additive on top of cinematic.js: its own marker-wrapped <style> + <script>, plus three small markup inserts
// (hero dust canvas, ticker strip, overnight clock strip). Brand palette only (alphas of orange / navy / ink / white /
// orange-tint), every motion off under prefers-reduced-motion, nothing blocks reading. Idempotent: re-running replaces it.
//   node scripts/country-pages/imax.js           apply / re-apply (cinematic.js must have run first)
//   node scripts/country-pages/imax.js --strip   remove it (do this BEFORE re-running cinematic.js, then re-apply)
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

const CSS = `<!-- imax-layer:start -->
<style>
  /* ================= IMAX LAYER (2026-09-03, US homepage experiment) ================= */
  @property --imx-a{ syntax:'<angle>'; inherits:false; initial-value:0deg; }

  /* ---- hero: word-by-word headline, glint on the orange line, scroll parallax + exit fade, dust ---- */
  .hero-cinema .hero-main-content h1{ animation:none !important; opacity:1 !important; transform:none !important; }
  .hero-cinema h1 .w{ display:inline-block; }
  .hero-cinema h1 .w > span{ display:inline-block; opacity:0; transform:translate3d(0,.55em,0) rotate(2deg); filter:blur(8px); animation:imxWord .85s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.12s + var(--i,0) * .06s); }
  @keyframes imxWord{ to{ opacity:1; transform:none; filter:blur(0); } }
  .hero-cinema h1 .hero-rotate-text{ background:linear-gradient(100deg, var(--orange) 0%, var(--orange) 44%, var(--orange-tint) 50%, var(--orange) 56%, var(--orange) 100%); background-size:280% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; animation:imxGlint 7s ease-in-out infinite; }
  @keyframes imxGlint{ 0%,60%{ background-position:130% 0; } 100%{ background-position:-60% 0; } }
  .hero-cinema .hero-main-content{ transform:translate3d(0, var(--imx-hy,0px), 0); opacity:var(--imx-ho,1); will-change:transform,opacity; }
  .hero-cinema .hero-aurora{ transform:translate3d(0, var(--imx-ay,0px), 0); }
  .hero-dust{ position:absolute; inset:0; z-index:0; pointer-events:none; width:100%; height:100%; }
  body.imx-scrolled .hero-scroll-cue{ opacity:0; transition:opacity .4s ease; }

  /* ---- ticker: what the team does, in one moving line (repeats page content; decorative) ---- */
  .imx-ticker{ background:var(--navy-deep); border-top:1px solid rgba(255,255,255,.08); border-bottom:1px solid rgba(255,255,255,.08); overflow:hidden; padding:15px 0; -webkit-mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
  .imx-ticker-track{ display:flex; width:max-content; animation:imxTick 70s linear infinite; will-change:transform; }
  .imx-ticker:hover .imx-ticker-track{ animation-play-state:paused; }
  .imx-ticker ul{ display:flex; list-style:none; margin:0; padding:0; }
  .imx-ticker li{ display:flex; align-items:center; gap:32px; padding:0 16px; white-space:nowrap; font-family:var(--font-mono); font-size:.72rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,255,255,.62); }
  .imx-ticker li::after{ content:''; width:6px; height:6px; background:var(--orange); transform:rotate(45deg); border-radius:1px; flex-shrink:0; }
  @keyframes imxTick{ to{ transform:translate3d(-50%,0,0); } }

  /* ---- white sections: drifting light blobs, floating brand marks, one light sweep on entry ---- */
  .imx-host{ position:relative; overflow:hidden; }
  .imx-host > .container{ position:relative; z-index:2; }
  .imx-amb{ position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
  .imx-amb .blob{ position:absolute; border-radius:50%; filter:blur(70px); will-change:transform; animation-play-state:paused; }
  .imx-amb .b1{ width:46vw; height:46vw; left:-14vw; top:-34%; background:radial-gradient(circle, rgba(217,83,30,.14) 0%, transparent 62%); animation:imxBlobA 46s ease-in-out infinite alternate; }
  .imx-amb .b2{ width:40vw; height:40vw; right:-14vw; bottom:-36%; background:radial-gradient(circle, rgba(11,32,54,.11) 0%, transparent 62%); animation:imxBlobB 54s ease-in-out infinite alternate; }
  @keyframes imxBlobA{ to{ transform:translate3d(24vw, 28%, 0) scale(1.18); } }
  @keyframes imxBlobB{ to{ transform:translate3d(-20vw, -30%, 0) scale(.88); } }
  .imx-amb .shape{ position:absolute; display:block; border:1.5px solid rgba(217,83,30,.30); border-radius:2px; animation:imxFloat 22s ease-in-out infinite; animation-play-state:paused; will-change:transform; }
  .imx-amb .shape.ring{ border-radius:50%; border-color:rgba(14,42,62,.18); }
  .imx-amb .s1{ width:14px; height:14px; left:7%; top:18%; animation-duration:19s; }
  .imx-amb .s2{ width:26px; height:26px; left:18%; bottom:14%; animation-duration:27s; animation-delay:-8s; }
  .imx-amb .s3{ width:10px; height:10px; right:12%; top:26%; animation-duration:23s; animation-delay:-4s; }
  .imx-amb .s4{ width:38px; height:38px; right:6%; bottom:20%; animation-duration:31s; animation-delay:-14s; }
  .imx-amb .s5{ width:18px; height:18px; left:48%; top:8%; animation-duration:25s; animation-delay:-11s; }
  @keyframes imxFloat{ 0%,100%{ transform:translate3d(0,0,0) rotate(45deg); } 50%{ transform:translate3d(22px,-54px,0) rotate(135deg); } }
  .imx-host.live .imx-amb .blob, .imx-host.live .imx-amb .shape{ animation-play-state:running; }
  .imx-amb .beam{ position:absolute; top:-20%; bottom:-20%; left:0; width:34%; opacity:0; transform:translate3d(-130%,0,0) skewX(-14deg); background:linear-gradient(100deg, transparent 0%, rgba(217,83,30,.05) 44%, rgba(255,255,255,.75) 50%, rgba(217,83,30,.05) 56%, transparent 100%); }
  .imx-host.seen .imx-amb .beam{ animation:imxBeam 2.4s cubic-bezier(.2,.7,.2,1) .1s 1 forwards; }
  @keyframes imxBeam{ 0%{ transform:translate3d(-130%,0,0) skewX(-14deg); opacity:0; } 12%{ opacity:1; } 100%{ transform:translate3d(430%,0,0) skewX(-14deg); opacity:0; } }

  /* ---- text: eyebrow tracks in, headline rises word by word, rule draws under the head, answer highlights ---- */
  .imx-txt .eyebrow{ opacity:0; letter-spacing:.36em; transition:opacity .8s ease, letter-spacing 1.1s cubic-bezier(.2,.8,.2,1); }
  .imx-txt.txt-in .eyebrow{ opacity:1; letter-spacing:.14em; }
  .imx-txt .imx-words .w{ display:inline-block; opacity:0; transform:translate3d(0,.5em,0) rotate(1.5deg); filter:blur(6px); transition:opacity .7s ease, transform .9s cubic-bezier(.2,.8,.2,1), filter .7s ease; transition-delay:calc(.08s + var(--i,0) * 45ms); }
  .imx-txt.txt-in .imx-words .w{ opacity:1; transform:none; filter:blur(0); }
  .imx-txt.section-head{ position:relative; }
  .imx-txt.section-head::after{ content:''; position:absolute; left:0; bottom:-24px; height:2px; width:84px; border-radius:2px; background:linear-gradient(90deg, var(--orange), rgba(217,83,30,.12)); transform:scaleX(0); transform-origin:0 50%; transition:transform 1.1s cubic-bezier(.2,.8,.2,1) .35s; }
  .imx-txt.txt-in.section-head::after{ transform:scaleX(1); }
  .band-cinema .imx-txt.section-head::after{ background:linear-gradient(90deg, var(--orange), rgba(255,255,255,.15)); }
  .tap-answer-section p strong{ padding:0 .12em; margin:0 -.12em; border-radius:3px; background-image:linear-gradient(transparent 60%, rgba(217,83,30,.22) 60%); background-repeat:no-repeat; background-size:0% 100%; }
  .tap-answer-section.seen p strong{ animation:imxHi .8s cubic-bezier(.2,.8,.2,1) forwards; animation-delay:calc(.3s + var(--i,0) * .22s); }
  @keyframes imxHi{ to{ background-size:100% 100%; } }

  /* ---- cards: 3D flip-up entrance, cursor tilt, orbiting light border, pillar top-bar + arrow slide ---- */
  .pillars-grid, .regions-grid, .cases-grid, .compare-grid, .numbers-grid, .faq-accordion, .us-stat-row{ perspective:1200px; }
  .pillar-card.reveal, .region-card.reveal, .case-card.reveal, .compare-card.reveal, .faq-item.reveal, .number-stat-item.reveal, .us-stat-card.reveal{ transition:opacity .75s ease calc(var(--i,0) * 70ms), transform 1s cubic-bezier(.2,.8,.2,1) calc(var(--i,0) * 70ms); }
  .pillar-card.reveal:not(.in), .region-card.reveal:not(.in), .case-card.reveal:not(.in), .compare-card.reveal:not(.in), .faq-item.reveal:not(.in), .number-stat-item.reveal:not(.in), .us-stat-card.reveal:not(.in){ transform:translate3d(0,46px,0) rotateX(9deg) scale(.97); }
  .imx-tilt{ position:relative; transform-style:preserve-3d; will-change:transform; }
  .imx-tilt, .imx-tilt.reveal.in{ transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translate3d(0,var(--tz,0px),0); transition:transform .65s cubic-bezier(.2,.8,.2,1), box-shadow .65s ease, border-color .2s ease, background .15s ease; }
  .imx-tilt.is-tilting{ transition:transform .1s ease-out, box-shadow .3s ease, border-color .2s ease, background .15s ease; box-shadow:0 34px 64px -26px rgba(11,32,54,.5); z-index:3; }
  .pillar-card.is-tilting{ border-radius:14px; }
  .imx-glow::before{ content:''; position:absolute; inset:-1px; border-radius:inherit; padding:1.5px; pointer-events:none; z-index:2; opacity:0; transition:opacity .35s ease; background:conic-gradient(from var(--imx-a), transparent 0 60%, rgba(217,83,30,0) 68%, var(--orange) 84%, rgba(255,255,255,.95) 88%, transparent 96%); -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite:exclude; }
  .imx-glow:hover::before{ opacity:1; animation:imxSpin 2.6s linear infinite; }
  @keyframes imxSpin{ to{ --imx-a:360deg; } }
  .pillar-card{ position:relative; }
  .pillar-card::after{ content:''; position:absolute; left:0; right:0; top:0; height:3px; background:linear-gradient(90deg, var(--orange), var(--orange-dark)); transform:scaleX(0); transform-origin:0 50%; transition:transform .5s cubic-bezier(.2,.8,.2,1); }
  .pillar-card:hover::after{ transform:scaleX(1); }
  .pillar-card .pillar-link, .pillar-card .pillar-index{ transition:transform .35s cubic-bezier(.2,.8,.2,1), color .3s ease; display:inline-block; }
  .pillar-card:hover .pillar-link{ transform:translate3d(8px,0,0); color:var(--orange); }
  .pillar-card:hover .pillar-index{ color:var(--orange); }
  .imx-mag{ transition:transform .45s cubic-bezier(.2,.8,.2,1), background .15s ease, border-color .15s ease, box-shadow .3s ease; will-change:transform; }
  .imx-mag.on{ transition:transform .08s linear, background .15s ease, border-color .15s ease, box-shadow .3s ease; }

  /* ---- images travel: photo drifts inside its frame as you scroll, frame counter-drifts, orange curtain wipe ---- */
  .promise-media.imx-px{ position:relative; overflow:hidden; transform:translate3d(0, var(--imx-fy,0px), 0); will-change:transform; }
  .promise-grid.reveal .promise-media.imx-px img, .promise-grid.reveal.in .promise-media.imx-px img, .promise-media.imx-px img{ transition:none !important; transform:translate3d(0, var(--imx-py,0px), 0) scale(1.2) !important; will-change:transform; }
  .promise-media.imx-px::after{ content:''; position:absolute; inset:0; z-index:2; background:linear-gradient(135deg, var(--orange), var(--orange-dark)); transform:scaleX(1); transform-origin:100% 50%; transition:transform 1.15s cubic-bezier(.7,0,.2,1) .15s; }
  .promise-grid.in .promise-media.imx-px::after{ transform:scaleX(0); }
  #how-it-works.band-cinema::before{ transform:translate3d(0, var(--imx-bp,0px), 0) scale(1.2) !important; will-change:transform; }

  /* ---- numbers band: aurora + drifting grid; how-it-works: the overnight clock strip ---- */
  .tap-numbers-section{ position:relative; overflow:hidden; }
  .tap-numbers-section > .container{ position:relative; z-index:2; }
  .tap-numbers-section::before{ content:''; position:absolute; z-index:0; pointer-events:none; width:52vw; height:52vw; right:-16vw; top:-90%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.3) 0%, transparent 62%); filter:blur(48px); animation:aurB 30s ease-in-out infinite alternate; }
  .tap-numbers-section::after{ content:''; position:absolute; inset:-40px 0; z-index:0; pointer-events:none; background-image:linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px); background-size:72px 72px; -webkit-mask-image:radial-gradient(ellipse 72% 100% at 50% 50%, #000 30%, transparent 85%); mask-image:radial-gradient(ellipse 72% 100% at 50% 50%, #000 30%, transparent 85%); transform:translate3d(0, var(--imx-gp,0px), 0); will-change:transform; }
  .imx-clock{ margin:40px 0 6px; }
  .imx-clock-track{ position:relative; height:2px; border-radius:2px; background:rgba(255,255,255,.14); }
  .imx-clock-fill{ position:absolute; inset:0; border-radius:2px; transform-origin:0 50%; transform:scaleX(var(--imx-cp,0)); background:linear-gradient(90deg, var(--orange), rgba(252,232,223,.95)); will-change:transform; }
  .imx-clock-run{ position:absolute; left:0; top:50%; width:100%; height:0; transform:translate3d(calc((var(--imx-cp,0) - 1) * 100%),0,0); will-change:transform; }
  .imx-clock-dot{ position:absolute; right:-9px; top:-9px; width:18px; height:18px; border-radius:50%; background:var(--orange); box-shadow:0 0 0 6px rgba(217,83,30,.25), 0 0 26px rgba(217,83,30,.85); }
  .imx-clock-stops{ list-style:none; margin:20px 0 0; padding:0; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  .imx-clock-stops li{ position:relative; padding-left:16px; }
  .imx-clock-stops li::before{ content:''; position:absolute; left:0; top:6px; width:6px; height:6px; border-radius:1px; transform:rotate(45deg); background:rgba(255,255,255,.28); transition:background .4s ease, box-shadow .4s ease; }
  .imx-clock-stops li.on::before{ background:var(--orange); box-shadow:0 0 12px rgba(217,83,30,.8); }
  .imx-clock-stops b{ display:block; font-family:var(--font-mono); font-weight:600; font-size:.76rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.55); transition:color .4s ease; }
  .imx-clock-stops li.on b{ color:#fff; }
  .imx-clock-stops span{ display:block; font-size:.86rem; line-height:1.5; color:rgba(255,255,255,.62); margin-top:5px; }
  @media (max-width:900px){ .imx-clock-stops{ grid-template-columns:repeat(2,1fr); } }

  /* ---- chapter rail (desktop) + cursor ring (fine pointers) ---- */
  .imx-rail{ position:fixed; right:22px; top:50%; transform:translateY(-50%); z-index:950; display:flex; flex-direction:column; gap:13px; align-items:flex-end; }
  .imx-rail a{ display:flex; align-items:center; gap:10px; text-decoration:none; padding:2px 0; }
  .imx-rail a span{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink); background:rgba(255,255,255,.94); padding:4px 9px; border-radius:6px; box-shadow:var(--shadow-md); opacity:0; transform:translate3d(8px,0,0); transition:opacity .3s ease, transform .3s ease; pointer-events:none; }
  .imx-rail:hover a span, .imx-rail a:focus-visible span{ opacity:1; transform:none; }
  .imx-rail a i{ display:block; width:8px; height:8px; border-radius:50%; background:rgba(14,42,62,.28); transition:transform .3s ease, background .3s ease, box-shadow .3s ease; }
  body.imx-dark .imx-rail a i{ background:rgba(255,255,255,.38); }
  .imx-rail a.on i{ background:var(--orange) !important; transform:scale(1.5); box-shadow:0 0 0 5px rgba(217,83,30,.22); }
  @media (max-width:1279px){ .imx-rail{ display:none; } }
  .imx-cursor{ position:fixed; left:0; top:0; width:28px; height:28px; border-radius:50%; border:1.5px solid rgba(217,83,30,.9); pointer-events:none; z-index:20000; opacity:0; transition:opacity .25s ease, width .25s ease, height .25s ease, border-color .25s ease, background .25s ease; }
  .imx-cursor.show{ opacity:1; }
  .imx-cursor.big{ width:48px; height:48px; border-color:rgba(217,83,30,.5); background:rgba(217,83,30,.08); }

  @media (max-width:760px){ .imx-amb .blob{ filter:blur(44px); } .imx-amb .s4, .imx-amb .s5{ display:none; } .imx-ticker li{ gap:20px; padding:0 10px; } }

  @media (prefers-reduced-motion: reduce){
    .hero-cinema h1 .w > span{ animation:none !important; opacity:1 !important; transform:none !important; filter:none !important; }
    .hero-cinema h1 .hero-rotate-text{ animation:none !important; background:none !important; -webkit-text-fill-color:currentColor !important; color:var(--orange) !important; }
    .hero-cinema .hero-main-content, .hero-cinema .hero-aurora{ transform:none !important; opacity:1 !important; }
    .hero-dust, .imx-cursor, .imx-amb .blob, .imx-amb .shape, .imx-amb .beam{ display:none !important; }
    .imx-ticker-track{ animation:none !important; }
    .imx-txt .eyebrow, .imx-txt .imx-words .w{ opacity:1 !important; transform:none !important; filter:none !important; letter-spacing:.14em !important; transition:none !important; }
    .imx-txt.section-head::after{ transform:scaleX(1) !important; transition:none !important; }
    .tap-answer-section p strong{ background-size:100% 100% !important; animation:none !important; }
    .pillar-card.reveal, .region-card.reveal, .case-card.reveal, .compare-card.reveal, .faq-item.reveal, .number-stat-item.reveal, .us-stat-card.reveal, .imx-tilt{ transform:none !important; transition:none !important; }
    .imx-glow::before, .pillar-card::after{ animation:none !important; }
    .promise-media.imx-px, .promise-media.imx-px img, #how-it-works.band-cinema::before, .tap-numbers-section::after{ transform:none !important; }
    .promise-media.imx-px::after{ display:none !important; }
    .tap-numbers-section::before{ animation:none !important; }
    .imx-clock-fill, .imx-clock-run{ --imx-cp:1 !important; }
    .imx-clock-stops li::before{ background:var(--orange) !important; } .imx-clock-stops b{ color:#fff !important; }
    .imx-mag{ transform:none !important; transition:none !important; }
  }
</style>
<!-- imax-layer:end -->
`;

const JS = `<!-- imax-layer-js:start -->
<script>
(function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var hasIO = 'IntersectionObserver' in window;
    function $(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
    var hero = document.querySelector('.hero-cinema');
    if (hero && !hero.id) hero.id = 'top';
    // chapter rail (desktop only via CSS; useful with or without motion)
    var railDef = [['#top','Top'],['#services','Services'],['#regions','Markets'],['#compare','Compare'],['#how-it-works','How it works'],['#results','Results'],['#us-faq','FAQ'],['#contact','Contact']].filter(function(d){ return document.querySelector(d[0]); });
    var rail = document.createElement('nav'); rail.className = 'imx-rail'; rail.setAttribute('aria-label', 'Page sections');
    railDef.forEach(function(d){ var a = document.createElement('a'); a.href = d[0]; a.innerHTML = '<span>' + d[1] + '</span><i aria-hidden="true"></i>'; rail.appendChild(a); });
    document.body.appendChild(rail);
    var railLinks = $('a', rail), railSecs = railDef.map(function(d){ return document.querySelector(d[0]); });
    if (reduce) { if (railLinks[0]) railLinks[0].classList.add('on'); return; }

    // white-section ambience (blobs, floating marks, one light sweep), paused while off-screen
    var hosts = $('.tap-answer-section, .tap-promise-section, .tap-pillars-section, .tap-regions-section, #compare, .tap-cases-section, .tap-faq-section');
    hosts.forEach(function(sec){
        sec.classList.add('imx-host');
        var amb = document.createElement('div'); amb.className = 'imx-amb'; amb.setAttribute('aria-hidden', 'true');
        amb.innerHTML = '<span class="blob b1"></span><span class="blob b2"></span><i class="shape s1"></i><i class="shape s2 ring"></i><i class="shape s3"></i><i class="shape s4 ring"></i><i class="shape s5"></i><span class="beam"></span>';
        sec.insertBefore(amb, sec.firstChild);
    });
    $('.tap-answer-section p strong').forEach(function(s, i){ s.style.setProperty('--i', i); });

    // headline word split (aria-label keeps the heading readable as one string)
    function splitWords(h){
        if (h.dataset.imx) return; h.dataset.imx = '1';
        var isH1 = h.tagName === 'H1', label = h.textContent.replace(/\\s+/g, ' ').trim();
        var wrap = document.createElement('span'); wrap.className = 'imx-words'; var n = 0;
        function word(content, isNode){ var w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', n++); var inner = isH1 ? document.createElement('span') : w; if (isNode) inner.appendChild(content); else inner.textContent = content; if (isH1) w.appendChild(inner); return w; }
        Array.prototype.slice.call(h.childNodes).forEach(function(node){
            if (node.nodeType === 3) {
                node.textContent.split(/(\\s+)/).forEach(function(p){ if (!p) return; if (/^\\s+$/.test(p)) wrap.appendChild(document.createTextNode(' ')); else wrap.appendChild(word(p, false)); });
            } else wrap.appendChild(word(node, true));
        });
        if (!isH1) { h.setAttribute('aria-label', label); wrap.setAttribute('aria-hidden', 'true'); }
        h.textContent = ''; h.appendChild(wrap);
    }
    var heroH1 = hero && hero.querySelector('h1'); if (heroH1) splitWords(heroH1);
    var txtBlocks = $('.section-head, .promise-content, .final-cta');
    txtBlocks.forEach(function(b){ var h = b.querySelector('h2'); if (h && h.textContent.trim().split(/\\s+/).length <= 26) { splitWords(h); b.classList.add('imx-txt'); } });

    if (hasIO) {
        var ioHost = new IntersectionObserver(function(es){ es.forEach(function(e){ var el = e.target; if (e.isIntersecting) { el.classList.add('live'); el.classList.add('seen'); } else el.classList.remove('live'); }); }, { rootMargin: '15% 0px 15% 0px' });
        hosts.forEach(function(h){ ioHost.observe(h); });
        var ioTxt = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('txt-in'); ioTxt.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px' });
        txtBlocks.forEach(function(b){ if (b.classList.contains('imx-txt')) ioTxt.observe(b); });
        // case-study stats count up
        function countUp(el){
            var t = el.getAttribute('data-target'); var m = t.match(/^([^\\d]*)([\\d,]*\\.?\\d+)(.*)$/); if (!m) return;
            var pre = m[1], numStr = m[2], suf = m[3], hasComma = numStr.indexOf(',') > -1, dec = (numStr.split('.')[1] || '').length, target = parseFloat(numStr.replace(/,/g, ''));
            var start = performance.now(), dur = 1300;
            function fmt(v){ var s = v.toFixed(dec); if (hasComma) { var p = s.split('.'); p[0] = p[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ','); s = p.join('.'); } return s; }
            function step(now){ var p = Math.min(1, (now - start) / dur); var e = 1 - Math.pow(1 - p, 3); el.textContent = pre + fmt(target * e) + suf; if (p < 1) requestAnimationFrame(step); else el.textContent = t; }
            requestAnimationFrame(step);
        }
        var ioNum = new IntersectionObserver(function(es){ es.forEach(function(e){ if (!e.isIntersecting) return; countUp(e.target); ioNum.unobserve(e.target); }); }, { rootMargin: '0px 0px -10% 0px' });
        $('.case-stat-row strong').forEach(function(n){ var t = n.textContent.trim(); if (!/\\d/.test(t) || /[\\u2013\\u2014-]/.test(t)) return; n.setAttribute('data-target', t); ioNum.observe(n); });
    } else { hosts.forEach(function(h){ h.classList.add('live'); h.classList.add('seen'); }); txtBlocks.forEach(function(b){ b.classList.add('txt-in'); }); }

    // one scroll loop: hero parallax/exit, image travel, band photo drift, numbers grid, clock, rail
    var heroMain = hero && hero.querySelector('.hero-main-content');
    var media = $('.promise-media'); media.forEach(function(m){ m.classList.add('imx-px'); });
    var band = document.querySelector('#how-it-works.band-cinema'), numbers = document.querySelector('.tap-numbers-section');
    var clock = document.querySelector('.imx-clock'), stops = clock ? $('.imx-clock-stops li', clock) : [];
    var vh = window.innerHeight; window.addEventListener('resize', function(){ vh = window.innerHeight; });
    function prog(r){ return (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); } // +1 below viewport, -1 above
    function isDark(el){ return !!el && (el.classList.contains('hero-cinema') || el.classList.contains('band-cinema') || el.classList.contains('tap-numbers-section') || el.classList.contains('final-cta-section')); }
    var ticking = false, lastRail = -1;
    function frame(){
        ticking = false; var y = window.scrollY || window.pageYOffset;
        document.body.classList.toggle('imx-scrolled', y > 40);
        if (hero && heroMain && y < vh * 1.3) { hero.style.setProperty('--imx-hy', (y * .28).toFixed(1) + 'px'); hero.style.setProperty('--imx-ho', Math.max(0, 1 - y / (vh * .95)).toFixed(3)); hero.style.setProperty('--imx-ay', (y * .12).toFixed(1) + 'px'); }
        media.forEach(function(m){ var r = m.getBoundingClientRect(); if (r.bottom < -120 || r.top > vh + 120) return; var p = prog(r); m.style.setProperty('--imx-py', (-p * r.height * .09).toFixed(1) + 'px'); m.style.setProperty('--imx-fy', (p * 22).toFixed(1) + 'px'); });
        if (band) { var rb = band.getBoundingClientRect(); if (rb.bottom > -120 && rb.top < vh + 120) { band.style.setProperty('--imx-bp', (-prog(rb) * rb.height * .08).toFixed(1) + 'px'); var cp = Math.max(0, Math.min(1, (vh * .82 - rb.top) / (rb.height + vh * .25))); band.style.setProperty('--imx-cp', cp.toFixed(4)); stops.forEach(function(li, i){ li.classList.toggle('on', cp >= (i / Math.max(1, stops.length - 1)) - .02); }); } }
        if (numbers) { var rn = numbers.getBoundingClientRect(); if (rn.bottom > -120 && rn.top < vh + 120) numbers.style.setProperty('--imx-gp', (prog(rn) * 44).toFixed(1) + 'px'); }
        var line = vh * .42, active = 0; for (var i = 0; i < railSecs.length; i++) { if (railSecs[i].getBoundingClientRect().top <= line) active = i; }
        if (active !== lastRail) { lastRail = active; railLinks.forEach(function(a, j){ a.classList.toggle('on', j === active); }); document.body.classList.toggle('imx-dark', isDark(railSecs[active])); }
    }
    function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); frame();

    // hero dust: slow particles rising through the projector beam, only while the hero is on screen
    var dust = document.querySelector('.hero-dust');
    if (dust && hero && dust.getContext) {
        var ctx = dust.getContext('2d'), P = [], W = 0, H = 0, run = false;
        function size(){ W = dust.width = hero.offsetWidth; H = dust.height = hero.offsetHeight; }
        size(); window.addEventListener('resize', size);
        for (var k = 0; k < 70; k++) P.push({ x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.5, a: .08 + Math.random() * .3, v: .00010 + Math.random() * .00022, s: Math.random() * 6.283, o: Math.random() < .3 });
        function draw(){ if (!run) return; ctx.clearRect(0, 0, W, H); for (var i = 0; i < P.length; i++) { var p = P[i]; p.y -= p.v; p.s += .008; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); } ctx.beginPath(); ctx.arc(p.x * W + Math.sin(p.s) * 16, p.y * H, p.r, 0, 6.283); ctx.fillStyle = p.o ? 'rgba(217,83,30,' + p.a + ')' : 'rgba(255,255,255,' + p.a + ')'; ctx.fill(); } requestAnimationFrame(draw); }
        function setRun(v){ if (v && !run) { run = true; draw(); } else if (!v) run = false; }
        if (hasIO) { new IntersectionObserver(function(es){ setRun(es[0].isIntersecting && !document.hidden); }).observe(hero); } else setRun(true);
        document.addEventListener('visibilitychange', function(){ setRun(!document.hidden && hero.getBoundingClientRect().bottom > 0); });
    }

    // fine pointers only: card tilt, orbiting light border, magnetic buttons, cursor ring
    if (!fine) return;
    $('.pillar-card, .region-card, .case-card, .compare-card, .us-stat-card').forEach(function(c){
        c.addEventListener('mouseenter', function(){ c.classList.add('imx-tilt'); c.classList.add('is-tilting'); c.style.setProperty('--tz', '-6px'); });
        c.addEventListener('mousemove', function(ev){ var r = c.getBoundingClientRect(); var px = (ev.clientX - r.left) / r.width - .5, py = (ev.clientY - r.top) / r.height - .5; c.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg'); c.style.setProperty('--rx', (-py * 8).toFixed(2) + 'deg'); });
        c.addEventListener('mouseleave', function(){ c.classList.remove('is-tilting'); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.style.setProperty('--tz', '0px'); });
    });
    $('.region-card, .case-card, .compare-card').forEach(function(c){ c.classList.add('imx-glow'); });
    $('.primary-btn-large, .btn-navy, .btn-ghost').forEach(function(b){
        b.classList.add('imx-mag');
        b.addEventListener('mousemove', function(ev){ var r = b.getBoundingClientRect(); var dx = (ev.clientX - (r.left + r.width / 2)) / r.width, dy = (ev.clientY - (r.top + r.height / 2)) / r.height; b.classList.add('on'); b.style.transform = 'translate3d(' + (dx * 10).toFixed(1) + 'px,' + (dy * 8).toFixed(1) + 'px,0)'; });
        b.addEventListener('mouseleave', function(){ b.classList.remove('on'); b.style.transform = ''; });
    });
    if (window.innerWidth >= 1024) {
        var cur = document.createElement('div'); cur.className = 'imx-cursor'; cur.setAttribute('aria-hidden', 'true'); document.body.appendChild(cur);
        var mx = -100, my = -100, cx = -100, cy = -100, shown = false, running = false;
        function loop(){ cx += (mx - cx) * .22; cy += (my - cy) * .22; cur.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0) translate(-50%,-50%)'; if (Math.abs(mx - cx) > .2 || Math.abs(my - cy) > .2) requestAnimationFrame(loop); else running = false; }
        window.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; if (!shown) { shown = true; cx = mx; cy = my; cur.classList.add('show'); } var t = e.target && e.target.closest && e.target.closest('a, button, [role="button"], .faq-trigger, input, select, textarea'); cur.classList.toggle('big', !!t); if (!running) { running = true; requestAnimationFrame(loop); } }, { passive: true });
        document.documentElement.addEventListener('mouseleave', function(){ cur.classList.remove('show'); });
        document.documentElement.addEventListener('mouseenter', function(){ if (shown) cur.classList.add('show'); });
    }
})();
</script>
<!-- imax-layer-js:end -->
`;

const TICKER_ITEMS = ['Custom ERP Software', 'Website Design &amp; Development', 'SEO &middot; AEO &middot; GEO', 'one agreed monthly fee flat', 'Dedicated engineering team + project manager', 'NDA &amp; US data residency', 'No long-term contract', 'New York &middot; Chicago &middot; Texas &middot; California', '250+ projects delivered', '16 countries served', '4.9/5 client rating', 'Monthly plain-English report'];
const tickerList = '<ul>' + TICKER_ITEMS.map(t => `<li>${t}</li>`).join('') + '</ul>';
const TICKER = `<!-- imax-ticker:start -->
<div class="imx-ticker" aria-hidden="true"><div class="imx-ticker-track">${tickerList}${tickerList}</div></div>
<!-- imax-ticker:end -->
`;
const CLOCK = `        <!-- imax-clock:start -->
        <div class="imx-clock">
            <div class="imx-clock-track"><span class="imx-clock-fill"></span><span class="imx-clock-run"><span class="imx-clock-dot"></span></span></div>
            <ul class="imx-clock-stops">
                <li><b>6 pm New York</b><span>You send the day&rsquo;s feedback and log off.</span></li>
                <li><b>9 am Kochi</b><span>Our day starts &mdash; 11:30 pm your time. Your notes are already in the queue.</span></li>
                <li><b>Overnight for you</b><span>Built, tested and pushed to staging while you sleep.</span></li>
                <li><b>9 am New York</b><span>Live overlap window &mdash; 6:30 pm in Kochi, your team on Slack or Teams.</span></li>
            </ul>
        </div>
        <!-- imax-clock:end -->
`;
const DUST = `    <canvas class="hero-dust" aria-hidden="true"></canvas>\n`;

function strip(s) {
  s = s.replace(/<!-- imax-layer:start -->[\s\S]*?<!-- imax-layer:end -->\n/, '').replace(/<!-- imax-layer-js:start -->[\s\S]*?<!-- imax-layer-js:end -->\n/, '');
  s = s.replace(/<!-- imax-ticker:start -->[\s\S]*?<!-- imax-ticker:end -->\n\n/, '').replace(/ *<!-- imax-clock:start -->[\s\S]*?<!-- imax-clock:end -->\n/, '');
  s = s.replace(/    <canvas class="hero-dust" aria-hidden="true"><\/canvas>\n/, '');
  return s;
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '<section class="tap-new-hero hero-cinema">', 1); // cinematic.js must have run first
    s = L.replaceAll(s, '    <div class="hero-vignette" aria-hidden="true"></div>\n', '    <div class="hero-vignette" aria-hidden="true"></div>\n' + DUST, 1);
    s = L.replaceAll(s, '</section>\n\n<section class="tap-answer-section">', '</section>\n\n' + TICKER + '\n<section class="tap-answer-section">', 1);
    const leadRe = /(<p class="us-lead">Kochi runs[^\n]*<\/p>\n\s*<\/div>\n)/;
    if (!leadRe.test(s)) throw new Error('how-it-works section head not found for the clock strip');
    s = s.replace(leadRe, '$1' + CLOCK);
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'imax-layer:start', 1); L.must(s, 'imax-layer-js:start', 1); L.must(s, 'imax-ticker:start', 1); L.must(s, 'imax-clock:start', 1); L.must(s, 'class="hero-dust"', 1);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'IMAX layer stripped:' : 'IMAX layer applied:'), rel);
}
