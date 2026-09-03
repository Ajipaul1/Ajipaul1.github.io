'use strict';
// ENGINE layer for the US homepage ONLY — "THE DIGITAL BUSINESS ENGINE" (owner, 2026-09-03: a long
// concept doc — the site should feel like a living digital operating system for a business; the hero is
// near-black with thousands of data particles that connect into WEBSITE -> SEO -> ERP -> AI, the network
// bends toward the cursor, hovering a hub lights up that subsystem; the page reads as stages of one
// engine; the US<->India model plays as a data packet; everything converges into one point at the CTA).
//
// Fourth layer, additive on cinematic.js + imax.js + flow.js. Own marker-wrapped <style> + <script>, no
// markup inserts — every element is created by JS. Idempotent; --strip removes it.
//
// What this layer builds on the existing page:
//   1 HERO NETWORK  a near-black veil over the hero gradient, then one canvas carrying the live network:
//                   ~90-170 particles typed as real business records (VISITORS, SEARCHES, ORDERS,
//                   INVOICES, PRODUCTS, CUSTOMERS, EMPLOYEES, FORECASTS...), a proximity graph that forms
//                   over the first 1.6s, and a WEBSITE -> SEO -> ERP -> AI spine with data pulsing down it.
//                   The links bend toward the cursor, mouse speed feeds the whole network's energy, and
//                   each hub owns a subsystem that plays when you hover it (auto-cycles on touch):
//                     WEBSITE  a page structure builds itself: FOUNDATION, STRUCTURE, PERFORMANCE, UX, CONVERSION
//                     SEO      real search queries rise into LOCAL / TECHNICAL / CONTENT / AEO / GEO clusters
//                     ERP      ORDER -> INVENTORY -> PURCHASE -> PRODUCTION -> INVOICE -> FINANCE, packet moving through
//                     AI       every particle in the hero fires a pulse into the AI node
//                   The water layer fades out while the hero is on screen, so the network owns the opening
//                   and the current owns the body of the page.
//   2 ENGINE STAGES the IMAX chapter rail is relabelled as the stages of the engine, in page order:
//                   01 CONNECT, 02 BUILD, 03 SCALE, 04 CHOOSE, 05 OPERATE, 06 GROW, 07 ASK, 08 ACT.
//   3 DATA PACKET   the overnight US<->India strip gets the packet itself: a label riding the running dot
//                   that changes at each stop — FEEDBACK LEAVES NEW YORK, IN THE KOCHI QUEUE, BUILT AND
//                   TESTED OVERNIGHT, NEW BUILD READY.
//   4 CONVERGENCE   at the closing CTA every line in the section converges into one glowing point behind
//                   the heading, then holds.
// Brand palette only (orange / ink / ink-faint / white alphas). Nothing blocks reading: every canvas is
// pointer-events:none and sits under the page content. Off entirely under prefers-reduced-motion, paused
// on hidden tabs, and each canvas only runs while its own section is on screen.
//   node scripts/country-pages/engine.js           apply / re-apply
//   node scripts/country-pages/engine.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

const CSS = `<!-- engine-layer:start -->
<style>
  /* ================= ENGINE LAYER (2026-09-03) — the digital business engine ================= */
  /* hero: kill the gradient back to near-black so the data network is the light in the room */
  .eng-veil{ position:absolute; inset:0; z-index:0; pointer-events:none; background:radial-gradient(ellipse 76% 66% at 44% 46%, rgba(3,9,15,.40) 0%, rgba(2,6,11,.90) 100%); }
  .eng-net{ position:absolute; inset:0; z-index:1; width:100%; height:100%; pointer-events:none; }
  /* the current gives the hero to the network, and takes the rest of the page back */
  .flow-plane{ transition:opacity .7s ease; }
  body.eng-in-hero .flow-plane{ opacity:0; }
  /* the packet riding the overnight strip */
  .eng-packet{ position:absolute; right:-9px; top:-42px; transform:translateX(50%) translateY(4px); padding:4px 9px; border-radius:5px; background:var(--orange); color:#fff; font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; white-space:nowrap; box-shadow:0 8px 20px rgba(0,0,0,.35); opacity:0; transition:opacity .45s ease, transform .45s ease; }
  .eng-packet.on{ opacity:1; transform:translateX(50%) translateY(0); }
  @media (max-width:900px){ .eng-packet{ display:none; } }
  /* the closing convergence */
  .eng-converge{ position:absolute; inset:0; z-index:1 !important; width:100%; height:100%; pointer-events:none; }
  /* the rail now reads as the stages of the engine */
  .imx-rail a span{ font-variant-numeric:tabular-nums; }
  @media (prefers-reduced-motion: reduce){
    .eng-veil, .eng-net, .eng-converge, .eng-packet{ display:none !important; }
    body.eng-in-hero .flow-plane{ opacity:1; }
  }
</style>
<!-- engine-layer:end -->
`;

const JS = `<!-- engine-layer-js:start -->
<script>
(function(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var body = document.body, fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var ORANGE = '217,83,30', FAINT = '133,149,160', PAPER = '255,255,255';
    function ctx2(c){ return c.getContext ? c.getContext('2d') : null; }
    function dpr(){ return Math.min(window.devicePixelRatio || 1, 1.75); }
    function fit(c, w, h){ var r = dpr(); c.width = Math.max(1, Math.round(w * r)); c.height = Math.max(1, Math.round(h * r)); var x = c.getContext('2d'); x.setTransform(r, 0, 0, r, 0, 0); return x; }

    /* ============================ 1. THE HERO NETWORK ============================ */
    var hero = document.querySelector('.tap-new-hero');
    if (hero && ctx2(document.createElement('canvas'))) (function(){
        var veil = document.createElement('div'); veil.className = 'eng-veil'; veil.setAttribute('aria-hidden', 'true');
        var cv = document.createElement('canvas'); cv.className = 'eng-net'; cv.setAttribute('aria-hidden', 'true');
        var before = hero.querySelector('.hero-social-row') || hero.querySelector('.container');
        hero.insertBefore(veil, before); hero.insertBefore(cv, before);
        var x = ctx2(cv), W = 0, H = 0, P = [], run = false, last = 0, form = 0, energy = 0, tNow = 0;
        // typed business records: the particles are the data a business actually runs on
        var TYPES = [['VISITORS',0],['SESSIONS',0],['PAGEVIEWS',0],['SEARCHES',1],['KEYWORDS',1],['QUERIES',1],
                     ['ORDERS',2],['INVOICES',2],['PRODUCTS',2],['PURCHASES',2],['STOCK',2],
                     ['CUSTOMERS',3],['EMPLOYEES',3],['FORECASTS',3]];
        var HUBS = [{ n: 'WEBSITE' }, { n: 'SEO' }, { n: 'ERP' }, { n: 'AI' }];
        var QUERIES = ['hvac repair near me', 'erp software for manufacturers', 'best seo agency usa',
                       'ai search optimization', 'inventory management system', 'custom web development texas'];
        var CLUSTERS = ['LOCAL', 'TECHNICAL', 'CONTENT', 'AEO', 'GEO'];
        var BUILD = ['FOUNDATION', 'STRUCTURE', 'PERFORMANCE', 'UX', 'CONVERSION'];
        var PIPE = ['ORDER', 'INVENTORY', 'PURCHASE', 'PRODUCTION', 'INVOICE', 'FINANCE'];
        var hov = -1, autoAt = 0, auto = 0, small = false, panel = null, spine = 0;
        var side = hero.querySelector('.hero-side-text'), tb = null, tbT = 0;   // the draggable ghost text

        function layout(){
            W = hero.offsetWidth; H = hero.offsetHeight; x = fit(cv, W, H);
            small = W < 900;
            // put the spine in the corridor between the headline column and the ghost side text
            var content = hero.querySelector('.hero-main-content'), side = hero.querySelector('.hero-side-text');
            var hr = hero.getBoundingClientRect();
            var cr = content ? content.getBoundingClientRect() : null, sr = side && side.offsetParent ? side.getBoundingClientRect() : null;
            var lo = cr ? cr.right - hr.left + 70 : W * .56, hi = sr ? sr.left - hr.left - 40 : W - 150;
            var hx = Math.min(Math.max((lo + hi) / 2, lo), Math.max(lo, hi));
            if (!isFinite(hx) || hx < W * .4 || hx > W - 90) hx = W * .62;
            for (var i = 0; i < HUBS.length; i++){ HUBS[i].x = hx; HUBS[i].y = H * (.17 + i * .115); HUBS[i].lit = HUBS[i].lit || 0; }
            // the subsystem panel lives in the empty right-hand band, clear of the headline column
            var pxs = Math.max(W * .5, cr ? cr.right - hr.left + 24 : W * .5);
            panel = { x: pxs, y: H * .58, w: Math.max(300, W - pxs - 40), h: H * .32 };
            var want = small ? 55 : Math.max(90, Math.min(170, Math.round(W * H / 8600)));
            while (P.length > want) P.pop();
            while (P.length < want) P.push(seed(true));
        }
        function seed(spread){
            var t = Math.floor(Math.random() * TYPES.length);
            return { x: Math.random() * W, y: spread ? Math.random() * H : Math.random() * H,
                     vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
                     g: TYPES[t][1], t: TYPES[t][0], lab: Math.random() < .12,
                     r: .8 + Math.random() * 1.7, a: .22 + Math.random() * .5, ph: Math.random() * 6.283 };
        }
        // pointer: the network leans into the cursor, and mouse speed is the network's energy
        var mx = -999, my = -999, pmx = 0, pmy = 0, mOn = false;
        hero.addEventListener('pointermove', function(e){
            var r = hero.getBoundingClientRect(), nx = e.clientX - r.left, ny = e.clientY - r.top;
            if (mOn) energy = Math.min(1, energy + Math.min(1, Math.abs(nx - pmx) + Math.abs(ny - pmy)) * .05);
            pmx = nx; pmy = ny; mx = nx; my = ny; mOn = true;
            if (fine && !small){                                        // hub hover
                var best = -1, bd = 52 * 52;
                for (var i = 0; i < HUBS.length; i++){ var dx = nx - HUBS[i].x, dy = ny - HUBS[i].y, d = dx * dx + dy * dy; if (d < bd){ bd = d; best = i; } }
                if (best !== hov){ hov = best; if (best >= 0){ auto = best; autoAt = tNow; resetSub(); } }
            }
        }, { passive: true });
        hero.addEventListener('pointerleave', function(){ mOn = false; mx = my = -999; hov = -1; }, { passive: true });

        // subsystem state
        var sub = { q: 0, rows: [], pkt: 0 };
        function resetSub(){ sub.q = 0; sub.pkt = 0; sub.rows = []; }

        function label(s, px, py, size, col, al, align){
            x.font = '600 ' + size + 'px "IBM Plex Mono", ui-monospace, monospace';
            x.textAlign = align || 'center'; x.textBaseline = 'middle';
            x.fillStyle = 'rgba(' + col + ',' + al + ')'; x.fillText(s, px, py);
        }
        function roundRect(px, py, w, h, r){
            x.beginPath(); x.moveTo(px + r, py); x.arcTo(px + w, py, px + w, py + h, r); x.arcTo(px + w, py + h, px, py + h, r);
            x.arcTo(px, py + h, px, py, r); x.arcTo(px, py, px + w, py, r); x.closePath();
        }

        /* ---- the four subsystems, drawn in the panel under the spine ---- */
        function subWebsite(q){                                          // a page builds itself
            var p = panel, w = Math.min(p.w * .62, 330), h = p.h * .82, px = p.x, py = p.y, i;
            x.strokeStyle = 'rgba(' + PAPER + ',.20)'; x.lineWidth = 1; roundRect(px, py, w, h, 8); x.stroke();
            var parts = [[px + 10, py + 10, w - 20, 14], [px + 10, py + 32, w - 20, h * .38],
                         [px + 10, py + 42 + h * .38, (w - 32) / 3, h * .2], [px + 20 + (w - 32) / 3, py + 42 + h * .38, (w - 32) / 3, h * .2],
                         [px + 30 + 2 * (w - 32) / 3, py + 42 + h * .38, (w - 32) / 3, h * .2]];
            for (i = 0; i < parts.length; i++){
                var on = Math.min(1, Math.max(0, q * 5.4 - i)); if (on <= 0) continue;
                x.fillStyle = 'rgba(' + ORANGE + ',' + (.10 + on * .13) + ')';
                x.strokeStyle = 'rgba(' + ORANGE + ',' + (.30 * on) + ')';
                roundRect(parts[i][0], parts[i][1], parts[i][2], parts[i][3] * on, Math.min(4, parts[i][3] * on / 2)); x.fill(); x.stroke();
            }
            for (i = 0; i < BUILD.length; i++){
                var oo = Math.min(1, Math.max(0, q * 5.4 - i));
                if (oo > 0) label(BUILD[i], px + w + 16, py + 14 + i * 22, 9, i < 4 ? PAPER : ORANGE, .28 + oo * .5, 'left');
            }
        }
        function subSeo(q, dt){                                          // queries rise into their clusters
            var p = panel, i, r;
            if (sub.rows.length < 6 && Math.random() < dt * 2.6) sub.rows.push({ s: QUERIES[Math.floor(Math.random() * QUERIES.length)], c: Math.floor(Math.random() * CLUSTERS.length), p: 0, o: .2 + Math.random() * .7 });
            for (i = 0; i < CLUSTERS.length; i++){
                var cx = p.x + (i + .5) * (p.w / CLUSTERS.length);
                x.strokeStyle = 'rgba(' + ORANGE + ',.34)'; x.lineWidth = 1; roundRect(cx - 30, p.y - 2, 60, 18, 9); x.stroke();
                label(CLUSTERS[i], cx, p.y + 7, 8, ORANGE, .72);
            }
            for (i = sub.rows.length - 1; i >= 0; i--){
                r = sub.rows[i]; r.p += dt * .42; if (r.p > 1){ sub.rows.splice(i, 1); continue; }
                var tx = p.x + (r.c + .5) * (p.w / CLUSTERS.length), sx = p.x + p.w * r.o;
                var qx = sx + (tx - sx) * r.p, qy = p.y + p.h - r.p * p.h;
                var al = Math.sin(r.p * 3.1416) * .8;
                label(r.s, qx, qy, 9, PAPER, al * .6);
                x.beginPath(); x.arc(qx - 6, qy, 1.6, 0, 6.283); x.fillStyle = 'rgba(' + ORANGE + ',' + al + ')'; x.fill();
            }
            label('EVERY QUERY SORTED, THEN PUSHED INTO GOOGLE AND AI SEARCH', p.x + p.w / 2, p.y + p.h + 14, 8, FAINT, .5);
        }
        function subErp(q, dt){                                          // an order moves down the pipeline
            var p = panel, n = PIPE.length, bw = Math.min((p.w - (n - 1) * 10) / n, 92), i;
            sub.pkt = (sub.pkt + dt * .26) % 1;
            var at = sub.pkt * n;
            for (i = 0; i < n; i++){
                var bx = p.x + i * (bw + 10), by = p.y + p.h * .3, on = Math.max(0, 1 - Math.abs(at - i - .5) * 1.4);
                x.strokeStyle = 'rgba(' + ORANGE + ',' + (.22 + on * .6) + ')'; x.lineWidth = 1;
                x.fillStyle = 'rgba(' + ORANGE + ',' + (.05 + on * .16) + ')';
                roundRect(bx, by, bw, 34, 6); x.fill(); x.stroke();
                label(PIPE[i], bx + bw / 2, by + 17, 8, on > .3 ? PAPER : FAINT, .45 + on * .5);
                if (i < n - 1){
                    x.beginPath(); x.moveTo(bx + bw + 1, by + 17); x.lineTo(bx + bw + 8, by + 17);
                    x.strokeStyle = 'rgba(' + PAPER + ',.22)'; x.stroke();
                }
            }
            var gx = p.x + at * (bw + 10);
            x.beginPath(); x.arc(gx, p.y + p.h * .3 + 17, 4, 0, 6.283);
            x.fillStyle = 'rgba(' + ORANGE + ',.95)'; x.fill();
            x.beginPath(); x.arc(gx, p.y + p.h * .3 + 17, 11, 0, 6.283);
            x.strokeStyle = 'rgba(' + ORANGE + ',.35)'; x.stroke();
            label('ONE RECORD, END TO END \\u2014 NO RE-TYPING BETWEEN SYSTEMS', p.x + p.w / 2, p.y + p.h * .3 + 64, 8, FAINT, .5);
        }
        function subAi(q){                                               // every record fires into the model
            var h = HUBS[3], i, p;
            for (i = 0; i < P.length; i++){
                p = P[i]; if ((i % 3) !== 0) continue;
                var t = (tNow * .5 + i * .07) % 1;
                var lx = p.x + (h.x - p.x) * t, ly = p.y + (h.y - p.y) * t;
                x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(lx, ly);
                x.strokeStyle = 'rgba(' + ORANGE + ',' + (.10 * (1 - t) * q) + ')'; x.lineWidth = 1; x.stroke();
                x.beginPath(); x.arc(lx, ly, 1.5, 0, 6.283); x.fillStyle = 'rgba(' + PAPER + ',' + (.5 * (1 - t) * q) + ')'; x.fill();
            }
            label('EVERY SIGNAL FROM THE SITE, THE SEARCH AND THE ERP, READ TOGETHER', panel.x + panel.w / 2, panel.y + panel.h * .5, 9, FAINT, .55 * q);
        }
        var SUBS = [subWebsite, subSeo, subErp, subAi];

        function frame(now){
            if (!run) return;
            var dt = Math.min(.05, (now - (last || now)) / 1000); last = now; tNow = now / 1000;
            form = Math.min(1, form + dt / 1.6);
            energy = Math.max(0, energy - dt * .8);
            if (!small && (hov < 0 || !fine) && tNow - autoAt > 4.6){ auto = (auto + 1) % HUBS.length; autoAt = tNow; resetSub(); }
            var act = small ? -1 : (hov >= 0 ? hov : auto);
            var i, j, p, q, d, dx, dy;
            // the trapped text is a solid body in the data: the network parts around it, and dragging it surges the field
            if (side && side.offsetParent && tNow - tbT > .2){
                tbT = tNow;
                var sr = side.getBoundingClientRect(), hr2 = hero.getBoundingClientRect();
                var nx = sr.left - hr2.left + sr.width / 2, ny = sr.top - hr2.top + sr.height / 2;
                if (tb && (Math.abs(nx - tb.x) > 2 || Math.abs(ny - tb.y) > 2)) energy = Math.min(1, energy + .22);
                tb = { x: nx, y: ny, w: sr.width / 2 + 14, h: sr.height / 2 + 14 };
            } else if (side && !side.offsetParent) tb = null;
            x.clearRect(0, 0, W, H);

            // particles
            var sp = 1 + energy * 2.4;
            for (i = 0; i < P.length; i++){
                p = P[i];
                p.x += p.vx * sp; p.y += p.vy * sp;
                if (mOn){                                                // lean into the cursor
                    dx = mx - p.x; dy = my - p.y; d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 210 && d > 1){ var f = (1 - d / 210) * .05; p.vx += dx / d * f; p.vy += dy / d * f; }
                }
                if (act >= 0 && p.g === act){                            // its own hub pulls it in when lit
                    var h = HUBS[act]; dx = h.x - p.x; dy = h.y - p.y; d = Math.sqrt(dx * dx + dy * dy) || 1;
                    p.vx += dx / d * .012; p.vy += dy / d * .012;
                }
                if (tb){                                                 // shouldered aside by the text
                    var ax = p.x - tb.x, ay = p.y - tb.y;
                    if (ax > -tb.w && ax < tb.w && ay > -tb.h && ay < tb.h){
                        var px2 = (ax < 0 ? -tb.w : tb.w) - ax, py2 = (ay < 0 ? -tb.h : tb.h) - ay;
                        if (Math.abs(px2) < Math.abs(py2)){ p.x += px2 * .14; p.vx += px2 * .005; }
                        else { p.y += py2 * .14; p.vy += py2 * .005; }
                    }
                }
                p.vx *= .985; p.vy *= .985;
                if (Math.abs(p.vx) < .04) p.vx += (Math.random() - .5) * .04;
                if (Math.abs(p.vy) < .04) p.vy += (Math.random() - .5) * .04;
                if (p.x < -30) p.x = W + 30; else if (p.x > W + 30) p.x = -30;
                if (p.y < -30) p.y = H + 30; else if (p.y > H + 30) p.y = -30;
            }
            // proximity graph, bent toward the cursor
            var LK = small ? 96 : 118, links = 0;
            for (i = 0; i < P.length && links < 260; i++){
                p = P[i];
                for (j = i + 1; j < P.length && links < 260; j++){
                    q = P[j]; dx = q.x - p.x; dy = q.y - p.y;
                    if (dx > LK || dx < -LK || dy > LK || dy < -LK) continue;
                    d = Math.sqrt(dx * dx + dy * dy); if (d > LK) continue;
                    var al = (1 - d / LK) * .16 * form;
                    var midx = (p.x + q.x) / 2, midy = (p.y + q.y) / 2;
                    if (mOn){
                        var bd = Math.sqrt((mx - midx) * (mx - midx) + (my - midy) * (my - midy));
                        if (bd < 260){ var k = (1 - bd / 260) * .3; midx += (mx - midx) * k; midy += (my - midy) * k; al += .05 * (1 - bd / 260); }
                    }
                    var lit = act >= 0 && (p.g === act || q.g === act);
                    x.beginPath(); x.moveTo(p.x, p.y); x.quadraticCurveTo(midx, midy, q.x, q.y);
                    x.strokeStyle = 'rgba(' + (lit ? ORANGE : PAPER) + ',' + (lit ? al * 2.1 : al) + ')';
                    x.lineWidth = 1; x.stroke(); links++;
                }
            }
            // the records themselves
            for (i = 0; i < P.length; i++){
                p = P[i];
                var on = act >= 0 && p.g === act, a = p.a * (on ? 1 : .62);
                x.beginPath(); x.arc(p.x, p.y, p.r * (on ? 1.5 : 1), 0, 6.283);
                x.fillStyle = 'rgba(' + (on ? ORANGE : PAPER) + ',' + a + ')'; x.fill();
                if (p.lab && form > .6) label(p.t, p.x + 8, p.y - 7, 8, on ? ORANGE : FAINT, (on ? .8 : .4) * form, 'left');
            }
            if (small) { requestAnimationFrame(frame); return; }

            // the spine: WEBSITE -> SEO -> ERP -> AI, with data running down it
            spine = Math.min(1, form * 1.6);
            if (spine > .1){
                var y0 = HUBS[0].y, y1 = HUBS[3].y, hx = HUBS[0].x;
                x.beginPath(); x.moveTo(hx, y0); x.lineTo(hx, y0 + (y1 - y0) * spine);
                x.strokeStyle = 'rgba(' + PAPER + ',.22)'; x.lineWidth = 1; x.stroke();
                for (i = 0; i < 3; i++){
                    var t = ((tNow * .32 + i / 3) % 1), py = y0 + (y1 - y0) * t;
                    x.beginPath(); x.arc(hx, py, 2.4, 0, 6.283); x.fillStyle = 'rgba(' + ORANGE + ',.85)'; x.fill();
                }
                for (i = 0; i < HUBS.length; i++){
                    var h2 = HUBS[i], isOn = i === act;
                    h2.lit += ((isOn ? 1 : 0) - h2.lit) * .12;
                    x.beginPath(); x.arc(h2.x, h2.y, 20 + h2.lit * 5, 0, 6.283);
                    x.fillStyle = 'rgba(2,6,11,' + (.55 + h2.lit * .3) + ')'; x.fill();
                    x.strokeStyle = 'rgba(' + ORANGE + ',' + (.35 + h2.lit * .6) + ')'; x.lineWidth = 1 + h2.lit; x.stroke();
                    if (h2.lit > .02){
                        x.beginPath(); x.arc(h2.x, h2.y, 20 + h2.lit * 16, 0, 6.283);
                        x.strokeStyle = 'rgba(' + ORANGE + ',' + (.28 * h2.lit) + ')'; x.lineWidth = 1; x.stroke();
                    }
                    x.beginPath(); x.arc(h2.x, h2.y, 3 + h2.lit * 1.5, 0, 6.283);
                    x.fillStyle = 'rgba(' + ORANGE + ',' + (.7 + h2.lit * .3) + ')'; x.fill();
                    label(h2.n, h2.x + 30, h2.y, 10, h2.lit > .3 ? PAPER : FAINT, .55 + h2.lit * .45, 'left');
                }
            }
            // the live subsystem
            if (act >= 0 && form > .5){
                var lit2 = HUBS[act].lit;
                if (lit2 > .05){ sub.q = Math.min(1, sub.q + dt / 1.3); SUBS[act](sub.q * lit2, dt); }
            }
            requestAnimationFrame(frame);
        }
        function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }
        layout();
        var rt = 0; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(layout, 180); });
        window.addEventListener('load', layout);
        if ('IntersectionObserver' in window){
            new IntersectionObserver(function(es){
                var vis = es[0].isIntersecting;
                body.classList.toggle('eng-in-hero', vis);               // hand the hero to the network
                document.documentElement.setAttribute('data-flow-hold', vis ? '1' : '0');
                setRun(vis && !document.hidden);
            }, { rootMargin: '0px' }).observe(hero);
        } else { body.classList.add('eng-in-hero'); setRun(true); }
        document.addEventListener('visibilitychange', function(){ setRun(!document.hidden && body.classList.contains('eng-in-hero')); });
    })();

    /* ============================ 2. THE ENGINE STAGES ============================ */
    (function(){
        var STAGE = { '#top': 'CONNECT', '#services': 'BUILD', '#regions': 'SCALE', '#compare': 'CHOOSE',
                      '#how-it-works': 'OPERATE', '#results': 'GROW', '#us-faq': 'ASK', '#contact': 'ACT' };
        var links = document.querySelectorAll('.imx-rail a');
        for (var i = 0; i < links.length; i++){
            var href = links[i].getAttribute('href'), s = links[i].querySelector('span');
            if (!s || !STAGE[href]) continue;
            s.textContent = ('0' + (i + 1)).slice(-2) + '  ' + STAGE[href];
        }
    })();

    /* ============================ 3. THE US <-> INDIA PACKET ============================ */
    (function(){
        var run = document.querySelector('.imx-clock-run'), clock = document.querySelector('.imx-clock');
        if (!run || !clock) return;
        var STEPS = ['FEEDBACK LEAVES NEW YORK', 'IN THE KOCHI QUEUE', 'BUILT AND TESTED OVERNIGHT', 'NEW BUILD READY'];
        var pk = document.createElement('span'); pk.className = 'eng-packet'; pk.setAttribute('aria-hidden', 'true');
        pk.textContent = STEPS[0]; run.appendChild(pk);
        var stops = document.querySelectorAll('.imx-clock-stops li'), tick = false;
        function upd(){
            tick = false;
            var n = 0; for (var i = 0; i < stops.length; i++) if (stops[i].classList.contains('on')) n++;
            pk.textContent = STEPS[Math.max(0, Math.min(STEPS.length - 1, n - 1))];
            var r = clock.getBoundingClientRect();
            pk.classList.toggle('on', n > 0 && r.top < window.innerHeight * .9 && r.bottom > 0);
        }
        window.addEventListener('scroll', function(){ if (!tick){ tick = true; requestAnimationFrame(upd); } }, { passive: true });
        upd();
    })();

    /* ============================ 4. THE CLOSING CONVERGENCE ============================ */
    (function(){
        var sec = document.querySelector('.final-cta-section'), h2 = sec && sec.querySelector('h2');
        if (!sec || !ctx2(document.createElement('canvas'))) return;
        var cv = document.createElement('canvas'); cv.className = 'eng-converge'; cv.setAttribute('aria-hidden', 'true');
        sec.insertBefore(cv, sec.firstChild);
        var x = null, W = 0, H = 0, P = [], run = false, last = 0, glow = 0, fx = 0, fy = 0;
        function layout(){
            W = sec.offsetWidth; H = sec.offsetHeight; x = fit(cv, W, H);
            var sr = sec.getBoundingClientRect();
            if (h2){ var hr = h2.getBoundingClientRect(); fx = hr.left - sr.left + hr.width * .5; fy = hr.top - sr.top + hr.height * .5; }
            else { fx = W * .3; fy = H * .5; }
            var want = W < 760 ? 34 : 70;
            while (P.length > want) P.pop();
            while (P.length < want) P.push(seed());
        }
        function seed(){
            var e = Math.random(), px, py;
            if (e < .5){ px = Math.random() * W; py = Math.random() < .5 ? -20 : H + 20; }
            else { px = Math.random() < .5 ? -20 : W + 20; py = Math.random() * H; }
            return { x: px, y: py, ox: px, oy: py, t: Math.random(), v: .1 + Math.random() * .22, c: Math.random() < .45, r: .9 + Math.random() * 1.6 };
        }
        function frame(now){
            if (!run) return;
            var dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
            x.clearRect(0, 0, W, H);
            var arrived = 0;
            for (var i = 0; i < P.length; i++){
                var p = P[i];
                p.t += dt * p.v; if (p.t >= 1){ P[i] = seed(); continue; }
                var e = 1 - Math.pow(1 - p.t, 3);                        // ease into the point
                var px = p.ox + (fx - p.ox) * e, py = p.oy + (fy - p.oy) * e;
                if (p.t > .82) arrived++;
                var tail = Math.max(0, e - .12);
                x.beginPath(); x.moveTo(p.ox + (fx - p.ox) * tail, p.oy + (fy - p.oy) * tail); x.lineTo(px, py);
                x.strokeStyle = 'rgba(' + (p.c ? ORANGE : PAPER) + ',' + (.05 + e * .22) + ')'; x.lineWidth = 1; x.stroke();
                x.beginPath(); x.arc(px, py, p.r, 0, 6.283);
                x.fillStyle = 'rgba(' + (p.c ? ORANGE : PAPER) + ',' + (.2 + e * .6) + ')'; x.fill();
            }
            glow += (Math.min(1, arrived / 8) - glow) * .08;
            if (glow > .01){
                var g = x.createRadialGradient(fx, fy, 0, fx, fy, 120 + glow * 90);
                g.addColorStop(0, 'rgba(' + ORANGE + ',' + (.20 * glow) + ')'); g.addColorStop(1, 'rgba(' + ORANGE + ',0)');
                x.fillStyle = g; x.beginPath(); x.arc(fx, fy, 120 + glow * 90, 0, 6.283); x.fill();
            }
            requestAnimationFrame(frame);
        }
        function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }
        layout();
        var rt = 0; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(layout, 180); });
        window.addEventListener('load', layout);
        if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ setRun(es[0].isIntersecting && !document.hidden); }, { rootMargin: '10% 0px' }).observe(sec);
        else setRun(true);
    })();
})();
</script>
<!-- engine-layer-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- engine-layer:start -->[\s\S]*?<!-- engine-layer:end -->\n/, '')
          .replace(/<!-- engine-layer-js:start -->[\s\S]*?<!-- engine-layer-js:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '<section class="tap-new-hero hero-cinema">', 1);  // cinematic.js first
    L.must(s, 'imax-layer-js:start', 1);                         // imax.js (rail + clock strip) first
    L.must(s, 'flow-layer-js:start', 1);                         // flow.js (the water it hands the hero to) first
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'engine-layer:start', 1); L.must(s, 'engine-layer-js:start', 1);
    L.must(s, 'eng-net', 3); L.must(s, 'eng-converge', 3);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'engine layer stripped:' : 'engine layer applied:'), rel);
}
