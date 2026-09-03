'use strict';
// FALL layer for the US homepage ONLY (owner, 2026-09-03: "animation top to end on the background, some
// object falling from top to bottom, and we can tap it to change its falling direction — full page",
// then "no, only do for the US homepage, thats it").
// Third layer, additive on top of cinematic.js + imax.js: its own marker-wrapped <style> + <script>,
// no markup inserts — the canvas and the direction control are created by JS.
//   - one fixed full-viewport canvas (z-index 5: over the section backgrounds, under header / CTA / rail),
//     pointer-events:none, so it drifts across the whole page without touching reading or clicking
//   - 22-48 depth-sorted objects (dot, ring, square, cross, soft orb) in brand orange / ink-faint only,
//     each with its own speed, spin and perpendicular sway; near objects bigger + faster
//   - tap anywhere (or the bottom-left arrow button) turns the fall 60 degrees: 6 directions, the
//     velocity eases into the new heading so the objects visibly curve, plus a short gust on the turn
//   - paused on hidden tabs, off entirely under prefers-reduced-motion
//   node scripts/country-pages/fall.js           apply / re-apply
//   node scripts/country-pages/fall.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

const CSS = `<!-- fall-layer:start -->
<style>
  /* ================= FALL LAYER (2026-09-03) — full-page falling objects, tap to turn ================= */
  .fall-canvas{ position:fixed; inset:0; z-index:5; width:100%; height:100%; pointer-events:none; }
  .fall-turn{ position:fixed; left:22px; bottom:22px; z-index:949; width:40px; height:40px; padding:0; border-radius:50%; border:1px solid rgba(255,255,255,.22); background:var(--navy-deep); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--shadow-md); transition:background .2s ease, border-color .2s ease, transform .2s ease; }
  .fall-turn:hover{ background:var(--orange); border-color:var(--orange); transform:translateY(-2px); }
  .fall-turn:focus-visible{ outline:2px solid var(--orange); outline-offset:3px; }
  .fall-turn i{ font-style:normal; font-size:1.15rem; line-height:1; transition:transform .6s cubic-bezier(.2,.8,.2,1); }
  .fall-hint{ position:fixed; left:70px; bottom:29px; z-index:949; padding:6px 12px; border-radius:20px; border:1px solid rgba(255,255,255,.16); background:rgba(11,32,54,.9); color:#fff; font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; white-space:nowrap; opacity:0; transform:translateX(-6px); transition:opacity .45s ease, transform .45s ease; pointer-events:none; }
  .fall-hint.on{ opacity:1; transform:none; }
  @media (max-width:900px){ .fall-turn{ left:16px; bottom:74px; } .fall-hint{ left:64px; bottom:81px; } }
  @media (max-width:560px){ .fall-hint{ display:none; } }
  @media (prefers-reduced-motion: reduce){ .fall-canvas, .fall-turn, .fall-hint{ display:none !important; } }
</style>
<!-- fall-layer:end -->
`;

const JS = `<!-- fall-layer-js:start -->
<script>
(function(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var NAMES = ['down', 'down and right', 'up and right', 'up', 'up and left', 'down and left'];
    var STEP = Math.PI / 3;                      // 6 headings, 60 degrees apart, starting straight down
    var turn = 0, tx = 0, ty = 1, cx = 0, cy = 1, gust = 0;

    var cv = document.createElement('canvas'); cv.className = 'fall-canvas'; cv.setAttribute('aria-hidden', 'true');
    var ctx = cv.getContext && cv.getContext('2d'); if (!ctx) return;
    document.body.appendChild(cv);

    // pre-rendered soft orb, one per brand colour (cheaper than a gradient per frame)
    function orbSprite(col){
        var c = document.createElement('canvas'), s = 64, x = c.getContext('2d'); c.width = c.height = s;
        var g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, 'rgba(' + col + ',1)'); g.addColorStop(1, 'rgba(' + col + ',0)');
        x.fillStyle = g; x.fillRect(0, 0, s, s); return c;
    }
    var COL = ['217,83,30', '133,149,160'];      // --orange, --ink-faint
    var ORB = [orbSprite(COL[0]), orbSprite(COL[1])];

    var W = 0, H = 0, P = [], run = false, last = 0;
    function make(spread){
        var d = .35 + Math.random() * .65;       // depth: near objects are bigger, faster and stronger
        return { x: Math.random() * W, y: spread ? Math.random() * H : -40, r: 1.4 + d * 7,
                 v: 16 + d * 54, rot: Math.random() * 6.283, vr: (Math.random() - .5) * 1.2,
                 a: .07 + d * .17, k: Math.floor(Math.random() * 5), c: Math.random() < .42 ? 0 : 1,
                 ph: Math.random() * 6.283, sw: 5 + Math.random() * 16 };
    }
    function size(){
        W = window.innerWidth; H = window.innerHeight;
        var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var want = W < 760 ? 22 : Math.max(24, Math.min(48, Math.round(W * H / 26000)));
        while (P.length > want) P.pop();
        while (P.length < want) P.push(make(true));
    }
    function shape(p){
        var col = COL[p.c], lw;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        if (p.k === 0){ ctx.beginPath(); ctx.arc(0, 0, p.r * .36, 0, 6.283); ctx.fillStyle = 'rgba(' + col + ',' + (p.a + .07) + ')'; ctx.fill(); }
        else if (p.k === 1){ lw = Math.max(1, p.r * .15); ctx.beginPath(); ctx.arc(0, 0, p.r * .74, 0, 6.283); ctx.lineWidth = lw; ctx.strokeStyle = 'rgba(' + col + ',' + p.a + ')'; ctx.stroke(); }
        else if (p.k === 2){ var s = p.r * .6; lw = Math.max(1, p.r * .14); ctx.lineWidth = lw; ctx.strokeStyle = 'rgba(' + col + ',' + p.a + ')'; ctx.strokeRect(-s, -s, s * 2, s * 2); }
        else if (p.k === 3){ var q = p.r * .74; lw = Math.max(1, p.r * .16); ctx.lineWidth = lw; ctx.strokeStyle = 'rgba(' + col + ',' + p.a + ')'; ctx.beginPath(); ctx.moveTo(-q, 0); ctx.lineTo(q, 0); ctx.moveTo(0, -q); ctx.lineTo(0, q); ctx.stroke(); }
        else { var R = p.r * 2.8; ctx.globalAlpha = p.a * .85; ctx.drawImage(ORB[p.c], -R, -R, R * 2, R * 2); ctx.globalAlpha = 1; }
        ctx.restore();
    }
    function frame(now){
        if (!run) return;
        var f = Math.min(.05, (now - (last || now)) / 1000); last = now;
        cx += (tx - cx) * Math.min(1, f * 3.2); cy += (ty - cy) * Math.min(1, f * 3.2);   // ease into the new heading
        if (gust > 0) gust = Math.max(0, gust - f * 1.5);
        var boost = 1 + gust * 1.7, nx = -cy, ny = cx;                                    // nx,ny = perpendicular, for the sway
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < P.length; i++){
            var p = P[i], s = Math.sin(p.ph += f * 1.4) * p.sw * f;
            p.x += cx * p.v * boost * f + nx * s;
            p.y += cy * p.v * boost * f + ny * s;
            p.rot += p.vr * f;
            if (p.x < -90){ p.x = W + 90; p.y = Math.random() * H; } else if (p.x > W + 90){ p.x = -90; p.y = Math.random() * H; }
            if (p.y < -90){ p.y = H + 90; p.x = Math.random() * W; } else if (p.y > H + 90){ p.y = -90; p.x = Math.random() * W; }
            shape(p);
        }
        requestAnimationFrame(frame);
    }
    function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }

    // direction control (bottom-left; the arrow keeps spinning forward so every tap reads as a turn)
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'fall-turn'; btn.innerHTML = '<i aria-hidden="true">&darr;</i>';
    var arrow = btn.firstChild;
    var hint = document.createElement('span'); hint.className = 'fall-hint'; hint.textContent = 'Tap anywhere to turn the drift';
    document.body.appendChild(btn); document.body.appendChild(hint);
    function point(first){
        var a = (turn % 6) * STEP;
        tx = Math.sin(a); ty = Math.cos(a);
        if (!first) gust = 1;
        arrow.style.transform = 'rotate(' + (-turn * 60) + 'deg)';
        btn.setAttribute('aria-label', 'Background objects are drifting ' + NAMES[turn % 6] + ' \\u2014 press to turn them');
        btn.title = 'Drifting ' + NAMES[turn % 6] + ' \\u2014 tap to turn';
    }
    function step(){ turn++; point(false); hideHint(); }
    var hintTimer = 0;
    function hideHint(){ hint.classList.remove('on'); if (hintTimer) clearTimeout(hintTimer); }
    point(true);

    // tap anywhere on the page, as long as it is not a control, a link, a drag or a text selection
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

    size();
    var rt = 0;
    window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(size, 160); });
    document.addEventListener('visibilitychange', function(){ setRun(!document.hidden); });
    setRun(!document.hidden);

    // one-time hint, so the tap is discoverable without adding permanent furniture
    var seen = false; try { seen = localStorage.getItem('tapFallHint') === '1'; } catch (err) {}
    if (!seen){
        setTimeout(function(){ hint.classList.add('on'); try { localStorage.setItem('tapFallHint', '1'); } catch (err) {} hintTimer = setTimeout(hideHint, 6500); }, 1600);
    }
})();
</script>
<!-- fall-layer-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- fall-layer:start -->[\s\S]*?<!-- fall-layer:end -->\n/, '')
          .replace(/<!-- fall-layer-js:start -->[\s\S]*?<!-- fall-layer-js:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '<section class="tap-new-hero hero-cinema">', 1); // cinematic.js must have run first
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'fall-layer:start', 1); L.must(s, 'fall-layer-js:start', 1); L.must(s, 'fall-canvas', 3);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'fall layer stripped:' : 'fall layer applied:'), rel);
}
