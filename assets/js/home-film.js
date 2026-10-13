/* home-film.js -- homepage hero: a cinematic film intro (2026-10-13, second version).
   Owner, after the dotted-globe version: "I don't like the image ... and the texts are all there at the same
   time; the referenced site [austinwerner.io] is not like that ... it should give a heavy impression".
   So: a dark full-bleed film owns the screen first, alone, and the copy arrives afterwards in stages:
     0.15s  two black lids part like a cinema gate; the film is already moving and slowly pushing in
     2.3s   eyebrow     2.5s  headline, word by word, out of its own line     3.1s  sub-line
     3.35s  buttons     3.55s badges + figures
   First visit per tab session only (an inline head script sets html.vs-intro before first paint; a 5s CSS
   fail-safe shows the copy even if this file never runs). "Skip intro" lands everything at once. Repeat
   visits: the film plays and the copy is simply there. Reduced motion or Save-Data: the poster still, no
   download of the film. The film pauses whenever the hero is off screen.
   Films (Pexels licence, assets/videos/home/CREDITS.md): orbit (default), ink, waves, sculpt -- any can be
   previewed with ?film=<name>; canonical stays the bare homepage. */
(function () {
  'use strict';
  var d = document, de = d.documentElement, w = window;
  var hero = d.querySelector('.tap-new-hero');
  function release() { de.classList.add('vs-intro-text'); setTimeout(function () { de.classList.remove('vs-intro', 'vs-intro-text'); }, 2600); }
  if (!hero) { release(); return; }
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var intro = de.classList.contains('vs-intro') && !reduce;
  if (!intro) de.classList.remove('vs-intro');
  try { sessionStorage.setItem('tapIntro', '1'); } catch (e) {}
  de.classList.add('vs-film-on');

  var FILMS = ['sculpt', 'orbit', 'ink', 'waves'], film = 'sculpt';
  try { var q = new URLSearchParams(location.search).get('film'); if (q && FILMS.indexOf(q) >= 0) film = q; } catch (e) {}
  var cut = (w.innerWidth < 768 || w.innerHeight > w.innerWidth * 1.1) ? 'm' : 'd';
  var base = '/assets/videos/home/hero-' + film + '-' + cut;

  /* ---------- the film ---------- */
  var wrap = d.createElement('div'); wrap.className = 'vs-film vs-film-' + film; wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = '<video muted playsinline loop preload="' + (reduce || saveData ? 'none' : 'auto') + '" poster="' + base + '.webp"></video>'
    + '<span class="vs-film-shade"></span><span class="vs-lid t"></span><span class="vs-lid b"></span>';
  hero.insertBefore(wrap, hero.firstChild);
  var v = wrap.querySelector('video'); v.muted = true; v.defaultMuted = true;
  function play() { if (reduce || saveData) return; if (!v.src) v.src = base + '.mp4'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if ('IntersectionObserver' in w) new IntersectionObserver(function (es) { if (es[0].isIntersecting) play(); else v.pause(); }, { threshold: 0.02 }).observe(wrap);
  else play();
  requestAnimationFrame(function () { requestAnimationFrame(function () { wrap.classList.add('open'); }); });

  /* ---------- the headline, word by word (the rotating phrase rises as one piece) ---------- */
  var h1 = hero.querySelector('h1'), n = 0;
  if (h1 && !h1.__vs) {
    h1.__vs = 1;
    Array.prototype.slice.call(h1.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = d.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
          var o = d.createElement('span'), i = d.createElement('span'); o.className = 'vs-hw'; i.className = 'vs-hwi'; i.textContent = part;
          i.style.setProperty('--w', n++); o.appendChild(i); frag.appendChild(o);
        });
        h1.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        node.classList.add('vs-hws'); node.style.setProperty('--w', n++);   // the rotating phrase: fades up, still free to wrap
      }
    });
  }
  var kids = hero.querySelectorAll('.hero-main-content > *');
  for (var k = 0; k < kids.length; k++) kids[k].style.setProperty('--hi', k);

  /* ---------- timeline ---------- */
  if (!intro) return;
  var skip = d.createElement('button'); skip.type = 'button'; skip.className = 'vs-skip'; skip.innerHTML = 'Skip intro <span aria-hidden="true">&rarr;</span>';
  hero.appendChild(skip);
  var timer = setTimeout(done, 2300);
  function done() { clearTimeout(timer); release(); skip.classList.add('gone'); setTimeout(function () { if (skip.parentNode) skip.parentNode.removeChild(skip); }, 700); }
  skip.addEventListener('click', function () { de.classList.add('vs-intro-fast'); done(); });
})();
