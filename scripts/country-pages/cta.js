'use strict';
// CTA layer for the US homepage ONLY (owner, 2026-09-03: after seeing the whole page animated —
// "will this page hurt SEO? change it, no, normal SEO / AEO / GEO page that will rank, delete all the
// animations, all that, like the design homepage ... but keep this section only as it is and update it",
// pointing at the closing "Let's Talk." band).
//
// So every other layer (cinematic, imax, flow, engine, vib) has been stripped from us/index.html and the
// page is back to the plain, fast template the homepage and the /ca/ pages use. This one small layer keeps
// the closing band exactly as it looked in that screenshot, and nothing else on the page is touched:
//   - the section is the containing block again (the stripped cinematic layer used to provide that)
//   - one soft warm aurora behind it, drifting slowly
//   - one canvas: every line in the section eases into a single point behind the heading, then holds,
//     with a glow that swells as they arrive
//   - the heading and its note carry the VIBGYOR sheen, which is now the only colour of its kind left on
//     the page — one deliberate accent at the point of conversion instead of a page-wide effect
// It costs one canvas that only runs while the band is on screen (IntersectionObserver) and stops on a
// hidden tab. Under prefers-reduced-motion there is no canvas and no movement at all: the heading keeps a
// still VIBGYOR gradient, which is colour, not motion.
//   node scripts/country-pages/cta.js           apply / re-apply
//   node scripts/country-pages/cta.js --strip   remove it
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const STRIP = process.argv.includes('--strip');

const PAGES = ['us/index.html'];

const CSS = `<!-- cta-layer:start -->
<style>
  /* ================= CTA LAYER (2026-09-03) — the closing "Let's Talk." band ================= */
  .final-cta-section{ position:relative; overflow:hidden; }
  .final-cta-section > *{ position:relative; z-index:2; }
  .final-cta-section::before{ content:''; position:absolute; z-index:0; pointer-events:none; width:60vw; height:60vw; left:-16vw; top:-38%; border-radius:50%; background:radial-gradient(circle, rgba(217,83,30,.30), transparent 62%); filter:blur(50px); animation:ctaAurora 30s ease-in-out infinite alternate; }
  @keyframes ctaAurora{ from{ transform:translate3d(0,0,0) scale(1); } to{ transform:translate3d(12vw,8vh,0) scale(1.16); } }
  .cta-spark{ position:absolute; inset:0; z-index:1 !important; width:100%; height:100%; pointer-events:none; }
  /* the one VIBGYOR accent left on the page, at the point of conversion */
  .final-cta h2.cta-vib, .final-cta .cta-vib{ background-image:linear-gradient(90deg,#86FFAE,#FFF06B,#FFC46B,#FF8A8A,#D9A6FF,#7FE3FF,#86FFAE); background-size:220% 100%; background-position:0% 50%; background-repeat:no-repeat; -webkit-background-clip:text; background-clip:text; color:transparent !important; -webkit-text-fill-color:transparent; animation:ctaSheen 14s linear infinite; }
  @keyframes ctaSheen{ to{ background-position:100% 50%; } }
  @media (prefers-reduced-motion: reduce){
    .cta-spark{ display:none !important; }
    .final-cta-section::before{ animation:none; }
    .final-cta h2.cta-vib, .final-cta .cta-vib{ animation:none; }   /* colour, not motion: the gradient stays */
  }
</style>
<!-- cta-layer:end -->
`;

const JS = `<!-- cta-layer-js:start -->
<script>
(function(){
    var sec = document.querySelector('.final-cta-section'), h2 = sec && sec.querySelector('.final-cta h2');
    if (!sec) return;
    var note = sec.querySelector('.final-cta-note');
    if (h2) h2.classList.add('cta-vib');
    if (note){ note.classList.add('cta-vib'); note.style.color = ''; }
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = document.createElement('canvas');
    if (!cv.getContext) return;
    cv.className = 'cta-spark'; cv.setAttribute('aria-hidden', 'true');
    sec.insertBefore(cv, sec.firstChild);
    var x = cv.getContext('2d'), W = 0, H = 0, P = [], run = false, last = 0, glow = 0, fx = 0, fy = 0;
    function seed(){
        var e = Math.random(), px, py;
        if (e < .5){ px = Math.random() * W; py = Math.random() < .5 ? -20 : H + 20; }
        else { px = Math.random() < .5 ? -20 : W + 20; py = Math.random() * H; }
        return { ox: px, oy: py, t: Math.random(), v: .1 + Math.random() * .22, c: Math.random() < .45, r: .9 + Math.random() * 1.6 };
    }
    function layout(){
        W = sec.offsetWidth; H = sec.offsetHeight;
        var r = Math.min(window.devicePixelRatio || 1, 1.75);
        cv.width = Math.max(1, Math.round(W * r)); cv.height = Math.max(1, Math.round(H * r));
        x.setTransform(r, 0, 0, r, 0, 0);
        var sr = sec.getBoundingClientRect();
        if (h2){ var hr = h2.getBoundingClientRect(); fx = hr.left - sr.left + hr.width * .5; fy = hr.top - sr.top + hr.height * .5; }
        else { fx = W * .3; fy = H * .5; }
        var want = W < 760 ? 34 : 70;
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
            var g = x.createRadialGradient(fx, fy, 0, fx, fy, 120 + glow * 90);
            g.addColorStop(0, 'rgba(217,83,30,' + (.2 * glow) + ')'); g.addColorStop(1, 'rgba(217,83,30,0)');
            x.fillStyle = g; x.beginPath(); x.arc(fx, fy, 120 + glow * 90, 0, 6.283); x.fill();
        }
        requestAnimationFrame(frame);
    }
    function setRun(v){ if (v && !run){ run = true; last = 0; requestAnimationFrame(frame); } else if (!v) run = false; }
    layout();
    var rt = 0; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(layout, 180); });
    window.addEventListener('load', layout);
    document.addEventListener('visibilitychange', function(){ setRun(!document.hidden && run); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ setRun(es[0].isIntersecting && !document.hidden); }, { rootMargin: '10% 0px' }).observe(sec);
    else setRun(true);
})();
</script>
<!-- cta-layer-js:end -->
`;

function strip(s) {
  return s.replace(/<!-- cta-layer:start -->[\s\S]*?<!-- cta-layer:end -->\n/, '')
          .replace(/<!-- cta-layer-js:start -->[\s\S]*?<!-- cta-layer-js:end -->\n/, '');
}

for (const rel of PAGES) {
  let s = L.read(rel).replace(/\r\n/g, '\n');
  s = strip(s);
  if (!STRIP) {
    L.must(s, '<section class="final-cta-section" id="contact">', 1);
    L.must(s, 'cinematic-layer', 0);   // this layer exists because the animation layers are gone
    s = L.replaceAll(s, '</head>', CSS + '</head>', 1);
    s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
    L.must(s, 'cta-layer:start', 1); L.must(s, 'cta-layer-js:start', 1); L.must(s, 'cta-spark', 3);
  }
  s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(path.join(L.REPO, rel), s);
  console.log((STRIP ? 'CTA layer stripped:' : 'CTA layer applied:'), rel);
}
