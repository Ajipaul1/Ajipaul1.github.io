'use strict';
// FLOW layer for the US homepage ONLY (owner, 2026-09-03: "the background is flowing like water, the
// objects like SEO symbols, ERP symbol, growth symbol all flowing background top to bottom endlessly,
// all the contents like floating above on the water, floating along with it, when we scroll we can move
// the content a little bit like on waves — also add like a 5D site page, only do the US homepage" +
// "add more layers, make it 5d"). Replaces the earlier fall layer (fall.js, deleted).
//
// Third layer, additive on top of cinematic.js + imax.js: its own marker-wrapped <style> + <script>, no
// markup inserts — the canvases and the direction control are created by JS. Idempotent; --strip removes
// it (and any leftover fall layer).
//
// FIVE depth planes, back to front, each with its own speed, scale, alpha and turn rate, so a tap swings
// the whole ocean around with real parallax:
//   0 deep current   0.28x speed, 0.55x scale  ]  drawn on .flow-far  (half-res + CSS blur = distance)
//   1 back current   0.55x speed, 0.80x scale  ]
//   2 focus plane    1.00x speed, 1.00x scale  -> drawn on .flow-mid  (full-res, crisp: the readable one)
//   3 near drift     1.70x speed, 1.60x scale  ]  drawn on .flow-near (low-res + CSS blur = out of focus
//   4 surface foam   2.50x speed, 2.30x scale  ]                       right in front of the lens)
// Water itself: wide gradient bands + current lines on the deep plane, thin lines on the focus plane,
// foam streaks on the surface plane, plus bubbles on every plane.
// Objects: 12 stroked glyphs from the three service lines — SEO (search, target, globe, link), growth
// (trend, bars, funnel), ERP (gear, modules, database, clipboard) and web (code) — brand orange /
// ink-faint only, kept upright by counter-rotating against their plane.
// Content: every card, media block and section head rides a travelling swell (sine over document Y,
// pushed along by scroll position and scroll speed) and tilts on a diagonal axis under a shared
// perspective, so the page reads as rafts floating on the current. Written to the individual `translate`
// and `rotate` properties, never `transform`, so the cinematic reveals and the IMAX hover tilt survive.
// Trapped text: the hero's ghost 'Connecting / India / to America.' block is caught on the current — it
// drifts along the flow, drags downstream as you scroll, sways, and runs a VIBGYOR sheen (the gradient
// the hover state already had, at half opacity so it reads as oil on water — the one off-palette colour
// on the page, owner's explicit ask). When a focus-plane glyph passes within 90px it lights up and the
// sheen speeds up, so the symbols visibly touch it. Desktop only (the block is display:none under 1100px).
// Perf: one rAF loop, blurred planes repaint every 2nd / 3rd frame, off-screen content skipped, paused on
// hidden tabs, everything off under prefers-reduced-motion.
//   node scripts/country-pages/flow.js           apply / re-apply
//   node scripts/country-pages/flow.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

const CSS = `<!-- flow-layer:start -->
<style>
  /* ================= FLOW LAYER (2026-09-03) — 5-plane water current, floating content ================= */
  .flow-plane{ position:fixed; inset:0; z-index:5; width:100%; height:100%; pointer-events:none; }
  .flow-far{ filter:blur(3px); opacity:.9; }
  .flow-near{ filter:blur(5px); opacity:.8; }
  .flow-deck{ perspective:1100px; }
  .flow-float{ will-change:translate, rotate; }
  /* the ghost hero text, trapped on the water */
  .flow-trap{ will-change:translate, rotate; transition:filter .9s ease; }
  .flow-trap .hero-side-text-line, .flow-trap .hero-side-text-inner span{ background-image:linear-gradient(90deg,#ff3b3b,#ff9a3b,#ffe93b,#3bff6e,#3bd4ff,#7a5cff,#ff3bd4,#ff3b3b); background-size:400% 100%; -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent; opacity:.5; animation:flowSheen 9s linear infinite; transition:opacity .9s ease; }
  .flow-trap.trap-hit{ filter:drop-shadow(0 0 16px rgba(217,83,30,.38)); }
  .flow-trap.trap-hit .hero-side-text-line, .flow-trap.trap-hit .hero-side-text-inner span{ animation-duration:2.4s; opacity:.72; }
  @keyframes flowSheen{ to{ background-position:400% 0%; } }
  .flow-turn{ position:fixed; left:22px; bottom:22px; z-index:949; width:40px; height:40px; padding:0; border-radius:50%; border:1px solid rgba(255,255,255,.22); background:var(--navy-deep); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--shadow-md); transition:background .2s ease, border-color .2s ease, transform .2s ease; }
  .flow-turn:hover{ background:var(--orange); border-color:var(--orange); transform:translateY(-2px); }
  .flow-turn:focus-visible{ outline:2px solid var(--orange); outline-offset:3px; }
  .flow-turn i{ font-style:normal; font-size:1.15rem; line-height:1; transition:transform .8s cubic-bezier(.2,.8,.2,1); }
  .flow-hint{ position:fixed; left:70px; bottom:29px; z-index:949; padding:6px 12px; border-radius:20px; border:1px solid rgba(255,255,255,.16); background:rgba(11,32,54,.9); color:#fff; font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; white-space:nowrap; opacity:0; transform:translateX(-6px); transition:opacity .45s ease, transform .45s ease; pointer-events:none; }
  .flow-hint.on{ opacity:1; transform:none; }
  @media (max-width:900px){ .flow-turn{ left:16px; bottom:74px; } .flow-hint{ left:64px; bottom:81px; } }
  @media (max-width:560px){ .flow-hint{ display:none; } }
  @media (prefers-reduced-motion: reduce){
    .flow-plane, .flow-turn, .flow-hint{ display:none !important; }
    .flow-trap, .flow-trap .hero-side-text-line, .flow-trap .hero-side-text-inner span{ animation:none !important; translate:none !important; rotate:none !important; filter:none !important; }
    .flow-float{ will-change:auto; translate:none !important; rotate:none !important; }
  }
</style>
<!-- flow-layer:end -->
`;

const JS = `<!-- flow-layer-js:start -->
<script>
(function(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var body = document.body, small = window.innerWidth < 760;
    var COL = ['217,83,30', '133,149,160'];              // --orange, --ink-faint: the only two colours used
    var NAMES = ['down', 'down and right', 'up and right', 'up', 'up and left', 'down and left'];

    /* ---------- the three composited surfaces ---------- */
    function surface(cls, res, every){
        var c = document.createElement('canvas'); c.className = 'flow-plane ' + cls; c.setAttribute('aria-hidden', 'true');
        var x = c.getContext && c.getContext('2d'); if (!x) return null;
        body.appendChild(c);
        return { el: c, ctx: x, res: res, every: every, W: 0, H: 0, D: 0 };
    }
    var far = surface('flow-far', .5, 4), mid = surface('flow-mid', 0, 1), near = surface('flow-near', .45, 3);
    if (!far || !mid || !near) return;
    var SURF = [far, mid, near];

    /* ---------- five depth planes ---------- */
    //            surface  speed  scale  alpha  turn   objects        bubbles   water
    var PLANES = [
        { s: far,  sp: .28, sz: .55, al: .50, tn: .9,  n: small ? 5 : 9,  b: small ? 4 : 8, w: 'deep' },
        { s: far,  sp: .55, sz: .80, al: .78, tn: 1.4, n: small ? 5 : 9,  b: small ? 3 : 6, w: 0 },
        { s: mid,  sp: 1,   sz: 1,   al: 1,   tn: 2.2, n: small ? 11 : 22, b: small ? 6 : 12, w: 'lines', hit: 1 },
        { s: near, sp: 1.7, sz: 1.6, al: .60, tn: 3,   n: small ? 3 : 6,  b: small ? 2 : 4, w: 0 },
        { s: near, sp: 2.5, sz: 2.3, al: .38, tn: 3.6, n: small ? 2 : 3,  b: small ? 1 : 2, w: 'foam' }
    ];
    var GLYPHS = 12;
    function seed(p, spread){
        var D = p.s.D || 1200;
        return { x: Math.random() * D, y: spread ? Math.random() * D : -70,
                 r: (11 + Math.random() * 12) * p.sz, k: Math.floor(Math.random() * GLYPHS),
                 c: Math.random() < .44 ? 0 : 1, a: (.13 + Math.random() * .15) * p.al,
                 rot: (Math.random() - .5) * .5, vr: (Math.random() - .5) * .5,
                 ph: Math.random() * 6.283, sw: (6 + Math.random() * 18) * p.sz, v: 14 + Math.random() * 26 };
    }
    function seedBubble(p, spread){
        var D = p.s.D || 1200;
        return { x: Math.random() * D, y: spread ? Math.random() * D : -40,
                 r: (1.4 + Math.random() * 4.5) * p.sz, c: Math.random() < .3 ? 0 : 1,
                 a: (.12 + Math.random() * .18) * p.al, ph: Math.random() * 6.283,
                 sw: (5 + Math.random() * 14) * p.sz, v: 12 + Math.random() * 22 };
    }
    PLANES.forEach(function(p){
        p.ang = 0; p.O = []; p.B = [];
        // one wavy band / line set per water plane, defined once and warped per frame
        p.lines = [];
        var nl = p.w === 'deep' ? 6 : p.w === 'lines' ? 6 : p.w === 'foam' ? 4 : 0;
        for (var i = 0; i < nl; i++) p.lines.push({ o: Math.random(), t: 40 + Math.random() * 150, ph: Math.random() * 6.283, sp: .4 + Math.random() * .7, a: .045 + Math.random() * .075, c: Math.random() < .35 ? 0 : 1 });
    });

    /* ---------- the glyph set: SEO / growth / ERP / web, stroked in a unit box ---------- */
    function glyph(x, k, s){
        x.lineWidth = Math.max(.9, s * .1); x.lineCap = 'round'; x.lineJoin = 'round';
        x.beginPath();
        if (k === 0){                                                   // search — SEO
            x.arc(-s * .18, -s * .18, s * .52, 0, 6.283); x.moveTo(s * .2, s * .2); x.lineTo(s * .75, s * .75);
        } else if (k === 1){                                            // trend arrow — growth
            x.moveTo(-s * .8, s * .45); x.lineTo(-s * .2, -s * .12); x.lineTo(s * .16, s * .22); x.lineTo(s * .8, -s * .55);
            x.moveTo(s * .34, -s * .55); x.lineTo(s * .8, -s * .55); x.lineTo(s * .8, -s * .1);
        } else if (k === 2){                                            // bar chart — growth
            var w = s * .32;
            x.moveTo(-s * .8, s * .7); x.lineTo(s * .8, s * .7);
            x.rect(-s * .72, s * .18, w, s * .5); x.rect(-s * .16, -s * .18, w, s * .86); x.rect(s * .4, -s * .62, w, s * 1.3);
        } else if (k === 3){                                            // gear — ERP
            x.arc(0, 0, s * .42, 0, 6.283);
            for (var i = 0; i < 8; i++){ var a = i * .785; x.moveTo(Math.cos(a) * s * .56, Math.sin(a) * s * .56); x.lineTo(Math.cos(a) * s * .85, Math.sin(a) * s * .85); }
        } else if (k === 4){                                            // module grid — ERP
            var u = s * .62, g = s * .1;
            x.rect(-u, -u, u - g, u - g); x.rect(g, -u, u - g, u - g); x.rect(-u, g, u - g, u - g); x.rect(g, g, u - g, u - g);
        } else if (k === 5){                                            // database — ERP
            for (var j = -1; j <= 1; j++){ x.moveTo(-s * .62, j * s * .42); x.bezierCurveTo(-s * .62, j * s * .42 - s * .26, s * .62, j * s * .42 - s * .26, s * .62, j * s * .42); x.bezierCurveTo(s * .62, j * s * .42 + s * .26, -s * .62, j * s * .42 + s * .26, -s * .62, j * s * .42); }
        } else if (k === 6){                                            // globe — AEO / GEO
            x.arc(0, 0, s * .72, 0, 6.283); x.moveTo(-s * .72, 0); x.lineTo(s * .72, 0);
            x.moveTo(0, -s * .72); x.bezierCurveTo(s * .5, -s * .3, s * .5, s * .3, 0, s * .72); x.bezierCurveTo(-s * .5, s * .3, -s * .5, -s * .3, 0, -s * .72);
        } else if (k === 7){                                            // funnel — conversion
            x.moveTo(-s * .72, -s * .6); x.lineTo(s * .72, -s * .6); x.lineTo(s * .16, s * .12); x.lineTo(s * .16, s * .72); x.lineTo(-s * .16, s * .72); x.lineTo(-s * .16, s * .12); x.closePath();
        } else if (k === 8){                                            // target — keywords
            x.arc(0, 0, s * .74, 0, 6.283); x.moveTo(s * .36, 0); x.arc(0, 0, s * .36, 0, 6.283); x.moveTo(s * .08, 0); x.arc(0, 0, s * .08, 0, 6.283);
        } else if (k === 9){                                            // link — backlinks
            x.arc(-s * .3, 0, s * .4, 0, 6.283); x.moveTo(s * .7, 0); x.arc(s * .3, 0, s * .4, 0, 6.283);
        } else if (k === 10){                                           // clipboard + tick — audit
            x.rect(-s * .5, -s * .68, s, s * 1.36); x.moveTo(-s * .2, -s * .68); x.lineTo(-s * .2, -s * .86); x.lineTo(s * .2, -s * .86); x.lineTo(s * .2, -s * .68);
            x.moveTo(-s * .26, s * .06); x.lineTo(-s * .04, s * .3); x.lineTo(s * .3, -s * .26);
        } else {                                                        // code brackets — web
            x.moveTo(-s * .3, -s * .6); x.lineTo(-s * .78, 0); x.lineTo(-s * .3, s * .6);
            x.moveTo(s * .3, -s * .6); x.lineTo(s * .78, 0); x.lineTo(s * .3, s * .6);
            x.moveTo(s * .1, -s * .5); x.lineTo(-s * .1, s * .5);
        }
        x.stroke();
    }

    /* ---------- geometry ---------- */
    var W = 0, H = 0, dpr = 1;
    function size(){
        W = window.innerWidth; H = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        var D = Math.ceil(Math.sqrt(W * W + H * H)) + 140;
        SURF.forEach(function(s){
            s.W = W; s.H = H; s.D = D; s.r = s.res || dpr;
            s.el.width = Math.max(1, Math.round(W * s.r)); s.el.height = Math.max(1, Math.round(H * s.r));
        });
        PLANES.forEach(function(p){
            var wantO = p.n, wantB = p.b;
            while (p.O.length > wantO) p.O.pop();
            while (p.O.length < wantO) p.O.push(seed(p, true));
            while (p.B.length > wantB) p.B.pop();
            while (p.B.length < wantB) p.B.push(seedBubble(p, true));
        });
        measure();
    }

    /* ---------- water: wavy bands, current lines, foam ---------- */
    function water(p, t){
        var x = p.s.ctx, D = p.s.D, i, j, n = 12;
        for (i = 0; i < p.lines.length; i++){
            var l = p.lines[i], base = ((l.o + t * l.sp * .012 * p.sp) % 1.4 - .2) * D, col = COL[l.c];
            x.beginPath();
            for (j = 0; j <= n; j++){
                var px = j / n * D, py = base + Math.sin(j / n * 4.2 + t * .5 + l.ph) * 26 + Math.sin(j / n * 9 - t * .32) * 11;
                if (j === 0) x.moveTo(px, py); else x.lineTo(px, py);
            }
            if (p.w === 'deep'){                                        // wide translucent current band
                for (j = n; j >= 0; j--){
                    var qx = j / n * D, qy = base + l.t + Math.sin(j / n * 3.6 + t * .42 + l.ph) * 22;
                    x.lineTo(qx, qy);
                }
                x.closePath();
                var g = x.createLinearGradient(0, base, 0, base + l.t);
                g.addColorStop(0, 'rgba(' + col + ',' + (l.a * p.al).toFixed(3) + ')');
                g.addColorStop(1, 'rgba(' + col + ',0)');
                x.fillStyle = g; x.fill();
            } else {                                                    // current line / foam streak
                x.lineWidth = p.w === 'foam' ? 4 : 1.8; x.lineCap = 'round';
                x.strokeStyle = 'rgba(' + col + ',' + (l.a * p.al * (p.w === 'foam' ? 1.5 : 1.1)).toFixed(3) + ')';
                x.stroke();
            }
        }
    }

    /* ---------- one plane ---------- */
    function drawPlane(p, t, f){
        var x = p.s.ctx, D = p.s.D, r = p.s.r, i, o;
        p.ang += (ta - p.ang) * Math.min(1, f * p.tn);                  // deeper planes swing round slower
        x.save();
        x.setTransform(r, 0, 0, r, W * r / 2, H * r / 2);
        x.rotate(p.ang); x.translate(-D / 2, -D / 2);
        if (p.w) water(p, t);
        for (i = 0; i < p.B.length; i++){                               // bubbles
            o = p.B[i];
            o.y += o.v * p.sp * f; o.ph += f * 1.3; o.x += Math.sin(o.ph) * o.sw * f;
            if (o.y > D + 50){ o.y = -40; o.x = Math.random() * D; }
            if (o.y < -60){ o.y = D + 40; o.x = Math.random() * D; }
            x.beginPath(); x.arc(o.x, o.y, o.r, 0, 6.283);
            x.strokeStyle = 'rgba(' + COL[o.c] + ',' + o.a.toFixed(3) + ')'; x.lineWidth = Math.max(.8, o.r * .3); x.stroke();
        }
        for (i = 0; i < p.O.length; i++){                               // glyphs, kept upright
            o = p.O[i];
            o.y += o.v * p.sp * f; o.ph += f * 1.1; o.x += Math.sin(o.ph) * o.sw * f; o.rot += o.vr * f * .3;
            if (o.y > D + 80){ o.y = -70; o.x = Math.random() * D; o.k = Math.floor(Math.random() * GLYPHS); }
            if (o.y < -90){ o.y = D + 70; o.x = Math.random() * D; }
            if (p.hit && trapC){                                             // does this glyph touch the trapped text?
                var ca = Math.cos(p.ang), sa = Math.sin(p.ang), ox = o.x - D / 2, oy = o.y - D / 2;
                var gx = W / 2 + ox * ca - oy * sa, gy = H / 2 + ox * sa + oy * ca;
                // distance from the glyph to the text box itself, so it fires when they really overlap
                var qx = Math.max(Math.abs(gx - trapC.x) - trapC.w, 0), qy = Math.max(Math.abs(gy - trapC.y) - trapC.h, 0), reach = o.r * .5;
                if (qx * qx + qy * qy < reach * reach){
                    hitAt = t; if (!hitOn){ hitOn = true; trap.classList.add('trap-hit'); }
                }
            }
            x.save(); x.translate(o.x, o.y); x.rotate(-p.ang + o.rot * .5);
            x.strokeStyle = 'rgba(' + COL[o.c] + ',' + o.a.toFixed(3) + ')';
            glyph(x, o.k, o.r); x.restore();
        }
        x.restore();
    }

    /* ---------- content floating on the swell ---------- */
    var FLOAT = '.pillar-card, .region-card, .case-card, .compare-card, .us-stat-card, .number-stat-item, .faq-item, .promise-media, .trust-item, .hero-feature-item, .imx-clock, .section-head, .us-module-card, .us-industry-card, .us-cost-card';
    var F = [], io = null, live = [];
    var trap = document.querySelector('.hero-side-text'), trapC = null, trapT = 0, hitOn = false, hitAt = 0;
    if (trap) trap.classList.add('flow-trap');
    function trapLive(){ return trap && trap.offsetParent !== null; }
    function measure(){
        var sy = window.scrollY || 0;
        F.forEach(function(o){ var r = o.el.getBoundingClientRect(); o.y = r.top + sy + r.height / 2; o.cx = r.left + r.width / 2; });
    }
    function collect(){
        var nodes = Array.prototype.slice.call(document.querySelectorAll(FLOAT));
        F = nodes.map(function(el){
            var head = el.classList.contains('section-head');
            if (!el.classList.contains('flow-float')) el.classList.add('flow-float');
            var par = el.parentElement; if (par && !par.classList.contains('flow-deck')) par.classList.add('flow-deck');
            return { el: el, amp: head ? 2.6 : 5.4, tilt: head ? .5 : 1.25, y: 0, cx: 0, vis: false };
        });
        if ('IntersectionObserver' in window){
            io = new IntersectionObserver(function(es){
                es.forEach(function(e){ for (var i = 0; i < F.length; i++) if (F[i].el === e.target) F[i].vis = e.isIntersecting; });
                live = F.filter(function(o){ return o.vis; });
            }, { rootMargin: '15% 0px' });
            F.forEach(function(o){ io.observe(o.el); });
        } else live = F;
        measure();
    }
    var sy0 = window.scrollY || 0, vel = 0;
    window.addEventListener('scroll', function(){
        var s = window.scrollY || 0; vel = Math.min(1.6, vel + Math.abs(s - sy0) / 90); sy0 = s;
    }, { passive: true });
    function floatContent(t, f){
        var bx = Math.sin(ta), by = Math.cos(ta), fx = bx * .55, fy = by, sy = window.scrollY || 0, swell = 1 + vel * .85;
        for (var i = 0; i < live.length; i++){
            // phase from the element projected onto the current, so the swell travels the way the water runs
            var o = live[i], proj = (o.cx - W / 2) * bx + (o.y - sy - H / 2) * by;
            var off = Math.sin(t * .85 + proj / 240) * o.amp * swell;
            o.el.style.translate = (fx * off).toFixed(2) + 'px ' + (fy * off).toFixed(2) + 'px';
            o.el.style.rotate = '1 ' + ((o.cx - W / 2) / W).toFixed(2) + ' 0 ' + (off / o.amp * o.tilt).toFixed(2) + 'deg';
        }
        if (trapLive()){
            var bx = Math.sin(ta), by = Math.cos(ta);                       // the trap follows the full current
            var ride = Math.sin(t * .55) * 22 + Math.min(130, sy * .12), pp = Math.sin(t * .37 + 1.1) * 9;
            trap.style.translate = (bx * ride - by * pp).toFixed(2) + 'px ' + (by * ride + bx * pp).toFixed(2) + 'px';
            trap.style.rotate = (Math.sin(t * .45) * 2.2).toFixed(2) + 'deg';
            if (t - trapT > .25){ trapT = t; var r = trap.getBoundingClientRect(); trapC = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width / 2, h: r.height / 2 }; }
            if (hitOn && t - hitAt > .9){ hitOn = false; trap.classList.remove('trap-hit'); }
        } else if (trapC){ trapC = null; if (hitOn){ hitOn = false; trap.classList.remove('trap-hit'); } }
        vel *= Math.pow(.945, f * 60);
    }

    /* ---------- turn control ---------- */
    var turn = 0, ta = 0;
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'flow-turn'; btn.innerHTML = '<i aria-hidden="true">&darr;</i>';
    var arrow = btn.firstChild;
    var hint = document.createElement('span'); hint.className = 'flow-hint'; hint.textContent = 'Tap anywhere to turn the current';
    body.appendChild(btn); body.appendChild(hint);
    var hintTimer = 0;
    function hideHint(){ hint.classList.remove('on'); if (hintTimer) clearTimeout(hintTimer); }
    function point(first){
        ta = (turn % 6) * (Math.PI / 3);
        arrow.style.transform = 'rotate(' + (-turn * 60) + 'deg)';
        btn.setAttribute('aria-label', 'The background current is flowing ' + NAMES[turn % 6] + ' \\u2014 press to turn it');
        btn.title = 'Current flowing ' + NAMES[turn % 6] + ' \\u2014 tap to turn';
        if (!first) vel = Math.min(1.6, vel + .7);                      // a turn stirs the water
    }
    function step(){ turn++; point(false); hideHint(); }
    point(true);
    var dx = 0, dy = 0;
    document.addEventListener('pointerdown', function(e){ dx = e.clientX; dy = e.clientY; }, { passive: true });
    document.addEventListener('pointerup', function(e){
        if (Math.abs(e.clientX - dx) > 12 || Math.abs(e.clientY - dy) > 12) return;
        var t = e.target;
        if (!t || !t.closest || t.closest('a, button, input, select, textarea, label, summary, iframe, [role="button"], .site-header, .mobile-drawer, .imx-rail, #zoho-modal')) return;
        var sel = window.getSelection && window.getSelection(); if (sel && String(sel).length) return;
        step();
    }, { passive: true });
    btn.addEventListener('click', step);

    /* ---------- loop ---------- */
    var run = false, last = 0, tick = 0;
    function frame(now){
        if (!run) return;
        var f = Math.min(.05, (now - (last || now)) / 1000); last = now; tick++;
        var t = now / 1000;
        SURF.forEach(function(s){ if (tick % s.every === 0) s.ctx.clearRect(0, 0, s.el.width, s.el.height); });
        for (var i = 0; i < PLANES.length; i++){ var p = PLANES[i]; if (tick % p.s.every === 0) drawPlane(p, t, f * p.s.every); }
        floatContent(t, f);
        requestAnimationFrame(frame);
    }
    function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }

    collect(); size();
    var rt = 0;
    window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ small = window.innerWidth < 760; size(); }, 160); });
    window.addEventListener('load', measure);
    document.addEventListener('visibilitychange', function(){ setRun(!document.hidden); });
    setRun(!document.hidden);

    var seen = false; try { seen = localStorage.getItem('tapFlowHint') === '1'; } catch (err) {}
    if (!seen && (window.scrollY || 0) < 40){
        setTimeout(function(){
            if ((window.scrollY || 0) > 200) return;                    // only ever over the hero
            hint.classList.add('on'); try { localStorage.setItem('tapFlowHint', '1'); } catch (err) {}
            hintTimer = setTimeout(hideHint, 6500);
            window.addEventListener('scroll', hideHint, { passive: true, once: true });
        }, 1600);
    }
})();
</script>
<!-- flow-layer-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- flow-layer:start -->[\s\S]*?<!-- flow-layer:end -->\n/, '')
          .replace(/<!-- flow-layer-js:start -->[\s\S]*?<!-- flow-layer-js:end -->\n/, '')
          // the layer this one replaces
          .replace(/<!-- fall-layer:start -->[\s\S]*?<!-- fall-layer:end -->\n/, '')
          .replace(/<!-- fall-layer-js:start -->[\s\S]*?<!-- fall-layer-js:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '<section class="tap-new-hero hero-cinema">', 1); // cinematic.js must have run first
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'flow-layer:start', 1); L.must(s, 'flow-layer-js:start', 1);
    L.must(s, 'flow-plane', 3); L.must(s, 'fall-layer', 0);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'flow layer stripped:' : 'flow layer applied:'), rel);
}
