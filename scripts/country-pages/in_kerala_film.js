'use strict';
// /in/kerala/ — FILM version (owner, 2026-10-13: "transform https://techauditpros.com/in/kerala/ into this
// http://morphowater.com/ ... with videos ... full page transform"). The page keeps every word, link, id,
// FAQ and schema it had (all lifted from the pre-film page below, verbatim); what changes is the whole
// presentation, in the manner of morphowater.com:
//   dark cinematic ground · light display type with an italic serif second line · full-screen video chapters
//   whose text lands lower-left and whose body scrolls over the film · a water drop holding the opening film
//   that opens to full screen as you scroll · a pinned map of Kerala's fourteen districts that lights each
//   district as you read it (morpho's globe moment) · glass panels for figures · a chapter rail on the left.
//
// VIDEOS: assets/videos/kerala/ (the only tracked video path: .gitignore drops *.mp4 elsewhere) kerala-<name>-{d,m}.mp4 + .webp posters — Pexels clips (Pexels licence, commercial
//   use allowed, no attribution required; credited anyway in assets/videos/kerala/CREDITS.md), re-encoded as silent
//   seamless loops (desktop 1440/1600 wide, phone 540x960 crop). They are decoration: aria-hidden, no text
//   is burned in, nothing claims they show our premises, people or clients.
// MAP: district outlines from DataMeet (CC BY 4.0) via github.com/geohacker/kerala, simplified here; the
//   credit line is printed under the map.
// MOTION + VIDEO LOADING: assets/js/kerala-film.js (+ the self-hosted Lenis). Start states only under
//   html.kf-on, which that script adds after the reduced-motion check. JS off / reduced motion: the page is
//   complete and static, videos show their posters (a "Play video" button lets reduced-motion users opt in).
//
// RUN ORDER: in_hub -> in_city -> in_story -> in_kerala -> post-passes (truth/tone/fixpack0/hreflang/nav)
//   -> THIS. Re-running is safe: when the page is already the film, it rebuilds from the snapshot of the
//   pre-film page in archive/in-kerala-pre-film/ (refreshed whenever the page is NOT the film).
//   node scripts/country-pages/in_kerala_film.js
const fs = require('fs'); const path = require('path');
const L = require('./lib.js');
const REL = 'in/kerala/index.html', SNAP = 'archive/in-kerala-pre-film/index.html', MARK = '<!-- kf:film -->';

let src = L.read(REL);
if (src.includes(MARK)) src = L.read(SNAP); else L.write(SNAP, src);
src = src.replace(/\r\n/g, '\n');

// ---------------------------------------------------------------------------------------------- extract
function one(s, re, what) { const m = s.match(re); if (!m) throw new Error('missing: ' + what); return m[1]; }
function all(s, re, what, min = 1) { const r = [...s.matchAll(re)].map(m => m.slice(1)); if (r.length < min) throw new Error('too few: ' + what + ' (' + r.length + ')'); return r; }
function sec(re, what) { return one(src, re, what); }
const byId = id => sec(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)\\n</section>`), id);
const headOf = (s, what) => ({ slate: one(s, /<p class="ker-slate"><span>([\s\S]*?)<\/span><\/p>/, what + ' slate'), h2: one(s, /<h2 class="ker-h2">([\s\S]*?)<\/h2>/, what + ' h2'), lede: (s.match(/<p class="ker-lede">([\s\S]*?)<\/p>/) || [])[1] });
const imgTag = t => t.replace(/\s+class="ker-img"/, '').replace(/\s{2,}/g, ' ');

const HEAD = src.slice(0, src.indexOf('</head>'));
const heroStart = src.indexOf('<section class="tap-new-hero">');
const BODY_OPEN = src.slice(src.indexOf('</head>'), heroStart);
const ctaM = src.match(/<section class="final-cta-section" id="contact">([\s\S]*?)\n<\/section>\n?/);
if (heroStart < 0 || !ctaM) throw new Error('page shape changed: hero or closing CTA not found');
let TAIL = src.slice(ctaM.index + ctaM[0].length);

const hero = sec(/<section class="tap-new-hero">([\s\S]*?)\n<\/section>/, 'hero');
const H = {
  eyebrow: one(hero, /<p class="eyebrow"[^>]*><span class="hero-rotate-text">([\s\S]*?)<\/span><\/p>/, 'eyebrow'),
  h1: one(hero, /<h1>([\s\S]*?)<\/h1>/, 'h1'),
  sub: one(hero, /<p class="hero-subtitle">([\s\S]*?)<\/p>/, 'subtitle'),
  actions: one(hero, /<div class="hero-actions">([\s\S]*?)<\/div>/, 'actions'),
  feats: all(hero, /<div class="hero-feature-item">([^<]*)<\/div>/g, 'features').map(m => m[0].replace(/^[^A-Za-z0-9]+/, '').trim()),
  trust: all(hero, /<div class="trust-item"><span class="num">([\s\S]*?)<\/span><span class="lbl">([\s\S]*?)<\/span><\/div>/g, 'trust', 4),
};
const ANSWER = sec(/<section class="tap-answer-section">[\s\S]*?<p>([\s\S]*?)<\/p>/, 'answer');

const s1 = byId('ker-one');
const ONE = { ...headOf(s1, 'one'),
  facts: all(s1, /<li><b>([\s\S]*?)<\/b>\s*([\s\S]*?)<\/li>/g, 'facts', 4),
  ctas: all(s1, /<a class="ker-btn([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, 'one ctas', 2),
  nodes: all(s1, /<div class="ker-node([^"]*)"[^>]*><i><\/i><b>([\s\S]*?)<\/b><\/div>/g, 'nodes', 7),
  cap: one(s1, /<p class="ker-stage-cap">([\s\S]*?)<\/p>/, 'stage cap'),
  stageLabel: one(s1, /<div class="ker-stage" role="img" aria-label="([^"]*)"/, 'stage label') };

const s2 = byId('ker-founder');
const FOUNDER = { ...headOf(s2, 'founder'),
  img: imgTag(one(s2, /<figure class="ker-portrait">\s*(<img[^>]*>)/, 'portrait')),
  figcap: one(s2, /<figure class="ker-portrait">[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>/, 'portrait caption'),
  ps: all(s2, /<p class="ker-p">([\s\S]*?)<\/p>/g, 'founder paras', 2).map(m => m[0]),
  certsLabel: one(s2, /<div class="ker-certs" aria-label="([^"]*)"/, 'certs label'),
  certs: all(s2, /<figure class="ker-cert"[^>]*>(<img[^>]*>)<figcaption><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/figcaption><\/figure>/g, 'certs', 4),
  note: one(s2, /<p class="ker-note">([\s\S]*?)<\/p>/, 'cert note') };

const s3 = byId('ker-districts');
const DIST = { ...headOf(s3, 'districts'),
  items: all(s3, /<li[^>]*><i aria-hidden="true"><\/i><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/li>/g, 'districts', 14),
  photos: all(s3, /<figure class="ker-photo"[^>]*>(<img[^>]*>)<figcaption>([\s\S]*?)<\/figcaption><\/figure>/g, 'district photos', 3) };

const s4 = byId('ker-compare');
const COMPARE = { ...headOf(s4, 'compare'),
  table: one(s4, /(<table class="ker-tbl">[\s\S]*?<\/table>)/, 'table').replace('class="ker-tbl"', 'class="kf-tbl"').replace(/ style="--d:\d+"/g, ''),
  callout: one(s4, /<aside class="ker-callout">([\s\S]*?)<\/aside>/, 'callout') };

const s5 = byId('ker-services');
const SERV = { ...headOf(s5, 'services'),
  items: all(s5, /<article class="ker-svc"[^>]*><div class="in"><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div><\/article>/g, 'services', 6) };

const s6 = byId('ker-sectors');
const SECT = { ...headOf(s6, 'sectors'),
  tiles: all(s6, /<figure class="ker-tile"[^>]*>(<img[^>]*>)<figcaption><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/figcaption><\/figure>/g, 'sector tiles', 4) };

const s7 = byId('ker-process');
const PROC = { ...headOf(s7, 'process'),
  figcap: one(s7, /<figure class="ker-widefig">[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>/, 'process caption'),
  steps: all(s7, /<li class="ker-step"[^>]*><i>(\d+)<\/i><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/li>/g, 'steps', 4) };

const s8 = byId('ker-cost');
const COST = { ...headOf(s8, 'cost'),
  rangeLabel: one(s8, /<div class="ker-range" aria-label="([^"]*)"/, 'range label'),
  axis: all(one(s8, /<div class="axis">([\s\S]*?)<\/div>/, 'axis'), /<span>([\s\S]*?)<\/span>/g, 'axis ticks', 3).map(m => m[0]),
  bars: all(s8, /<div class="bar (b\d)" style="--from:([\d.]+)%;--to:([\d.]+)%;[^"]*"><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/div>/g, 'bars', 2),
  note: one(s8, /<p class="ker-range-note">([\s\S]*?)<\/p>/, 'range note'),
  drivers: all(s8, /<div class="drv"[^>]*><b>(\d+)<\/b><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div>/g, 'drivers', 4),
  close: one(s8, /<p class="ker-p on-dark">([\s\S]*?)<\/p>/, 'cost close') };

const s9 = byId('ker-checklist');
const CHECK = { ...headOf(s9, 'checklist'),
  qs: all(s9, /<li[^>]*><svg[\s\S]*?<\/svg><div><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div><\/li>/g, 'questions', 7) };

const band = sec(/<section class="ker-band"[^>]*>([\s\S]*?)\n<\/section>/, 'band');
const BAND = { slate: one(band, /<p class="ker-slate"><span>([\s\S]*?)<\/span><\/p>/, 'band slate'), h2: one(band, /<h2 class="ker-h2">([\s\S]*?)<\/h2>/, 'band h2'),
  p: one(band, /<\/h2><p>([\s\S]*?)<\/p>/, 'band p'), cta: one(band, /(<a class="ker-btn"[\s\S]*?<\/a>)/, 'band cta').replace('class="ker-btn"', 'class="kf-btn"') };

const FAQ = sec(/(<section class="tap-faq-section" id="city-faq">[\s\S]*?\n<\/section>)/, 'faq');
const CTA = { h2: one(ctaM[1], /<h2>([\s\S]*?)<\/h2>/, 'cta h2'), actions: one(ctaM[1], /<div class="final-cta-actions">([\s\S]*?)<\/div>/, 'cta actions') };

// ---------------------------------------------------------------------------------------------- helpers
// morpho sets the second line of a headline in an italic serif; split at the first sentence or dash break
function film(h) {
  let m = h.match(/^([\s\S]*?[.?!])\s+([\s\S]+)$/);
  if (m && m[2].length > 6) return `${m[1]} <em class="kf-it">${m[2]}</em>`;
  m = h.match(/^([\s\S]*?)\s+&mdash;\s+([\s\S]+)$/);
  if (m) return `${m[1]} <em class="kf-it">&mdash; ${m[2]}</em>`;
  m = h.match(/^([^,]{6,}?),\s+([\s\S]{12,})$/);
  if (m) return `${m[1]}, <em class="kf-it">${m[2]}</em>`;
  return h;
}
const slate = (t, extra = '') => `<p class="kf-slate kf-r${extra}">${t}</p>`;
const video = (name, cls = '') => `<video class="kf-video${cls}" data-kf-v="${name}" muted playsinline loop preload="none" aria-hidden="true" poster="/assets/videos/kerala/kerala-${name}-d.webp"></video>`;
const ch = (n, label) => `data-kf-ch="${n}" data-kf-label="${label}"`;

// Kerala map: project, simplify, write paths + label points
function keralaMap() {
  const g = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/kerala-districts.geojson'), 'utf8'));
  const W = 320, LAT0 = 12.82, LON0 = 74.84, K = 118, COS = Math.cos(10.5 * Math.PI / 180);
  const P = ([lon, lat]) => [(lon - LON0) * COS * K + 6, (LAT0 - lat) * K + 6];
  function dp(pts, eps) {
    if (pts.length < 3) return pts;
    let dmax = 0, idx = 0; const [a, b] = [pts[0], pts[pts.length - 1]];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);   // len 0 = a closed ring: measure from the start point
    for (let i = 1; i < pts.length - 1; i++) { const d = len ? Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len : Math.hypot(pts[i][0] - a[0], pts[i][1] - a[1]); if (d > dmax) { dmax = d; idx = i; } }
    if (dmax <= eps) return [a, b];
    return dp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(dp(pts.slice(idx), eps));
  }
  let maxY = 0; const out = {};
  for (const f of g.features) {
    const name = f.properties.DISTRICT; const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    let d = '', best = null, bestA = 0;
    for (const poly of polys) {
      const ring = dp(poly[0].map(P), 0.55); if (ring.length < 4) continue;
      d += 'M' + ring.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
      let A = 0, cx = 0, cy = 0;
      for (let i = 0; i < ring.length - 1; i++) { const c = ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]; A += c; cx += (ring[i][0] + ring[i + 1][0]) * c; cy += (ring[i][1] + ring[i + 1][1]) * c; }
      if (Math.abs(A) > bestA) { bestA = Math.abs(A); best = [cx / (3 * A), cy / (3 * A)]; }
      ring.forEach(p => { maxY = Math.max(maxY, p[1]); });
    }
    out[name] = { d, c: best };
  }
  return { W, H: Math.ceil(maxY + 6), out };
}
const MAP = keralaMap();
const slug = t => t.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z]+/g, '-');
DIST.items.forEach(([n]) => { if (!MAP.out[n]) throw new Error('no map shape for district ' + n); });

// ---------------------------------------------------------------------------------------------- body
const [ctaA, ctaB] = H.actions.match(/<a [\s\S]*?<\/a>/g);
const BODY = `${MARK}
<main class="kf-main">
<nav class="kf-rail" aria-hidden="true"><span class="kf-rail-n">00</span><span class="kf-rail-line"><i></i></span><span class="kf-rail-t">Kerala</span></nav>

<section class="kf-hero" ${ch('00', 'Kerala')}>
  <div class="kf-hero-copy">
    <p class="kf-eyebrow">${H.eyebrow}</p>
    <h1 class="kf-h1">${H.h1.replace('<span>', '<span class="kf-it">')}</h1>
    <p class="kf-hero-sub">${H.sub}</p>
    <div class="kf-actions">${ctaA.replace(/class="[^"]*"/, 'class="kf-btn"')}${ctaB.replace(/class="[^"]*"/, 'class="kf-btn ghost"')}</div>
    <ul class="kf-feats">${H.feats.map(f => `<li>${f}</li>`).join('')}</ul>
  </div>
  <div class="kf-hero-run">
    <div class="kf-hero-stage">
      <div class="kf-glow" aria-hidden="true"></div>
      <div class="kf-drop-media">${video('falls')}<span class="kf-shade"></span></div>
      <p class="kf-hero-aside" aria-hidden="true"><em class="kf-it">Kochi, Kerala.</em><span>From Kasaragod to Thiruvananthapuram</span></p>
      <div class="kf-answer"><p>${ANSWER}</p></div>
    </div>
  </div>
  <ul class="kf-trust">${H.trust.map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join('')}</ul>
</section>

<section class="kf-film" id="ker-one" ${ch('01', 'One becomes many')} aria-label="One becomes many">
  <div class="kf-film-media"><div class="kf-stick">${video('mangrove')}<span class="kf-shade"></span></div></div>
  <div class="kf-film-title">${slate(ONE.slate)}<h2 class="kf-h2 kf-r">${film(ONE.h2)}</h2></div>
  <div class="kf-film-body kf-wrap">
    <div class="kf-glass kf-two kf-r">
      <div>
        <p class="kf-lede">${ONE.lede}</p>
        <div class="kf-actions">${ONE.ctas.map(([c, a, t]) => `<a class="kf-btn${c.includes('ghost') ? ' ghost' : ''}"${a}>${t}</a>`).join('')}</div>
      </div>
      <div class="kf-team" role="img" aria-label="${ONE.stageLabel}">
        <svg class="kf-team-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${ONE.nodes.slice(1).map((_, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return `<line x1="50" y1="50" x2="${(50 + 38 * Math.cos(a)).toFixed(1)}" y2="${(50 + 38 * Math.sin(a)).toFixed(1)}" pathLength="1" style="--i:${i}"/>`; }).join('')}</svg>
        <span class="kf-node core"><i></i>${ONE.nodes[0][1]}</span>
        ${ONE.nodes.slice(1).map(([, t], i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return `<span class="kf-node" style="--x:${(50 + 38 * Math.cos(a)).toFixed(1)}%;--y:${(50 + 38 * Math.sin(a)).toFixed(1)}%;--i:${i}"><i></i>${t}</span>`; }).join('\n        ')}
        <p class="kf-team-cap">${ONE.cap}</p>
      </div>
    </div>
    <ul class="kf-figures kf-r">${ONE.facts.map(([b, t]) => `<li><b>${b}</b> <span>${t}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="kf-sec kf-founder" id="ker-founder" ${ch('02', 'The person')} aria-label="The person behind the team">
  <div class="kf-wrap kf-two">
    <figure class="kf-portrait kf-r">${FOUNDER.img}<figcaption>${FOUNDER.figcap}</figcaption></figure>
    <div>
      ${slate(FOUNDER.slate)}
      <h2 class="kf-h2 kf-r">${film(FOUNDER.h2)}</h2>
      <p class="kf-lede kf-r">${FOUNDER.lede}</p>
      ${FOUNDER.ps.map(p => `<p class="kf-p kf-r">${p}</p>`).join('\n      ')}
      <div class="kf-certs" aria-label="${FOUNDER.certsLabel}">${FOUNDER.certs.map(([img, b, s]) => `<figure class="kf-cert kf-r">${img}<figcaption><b>${b}</b><span>${s}</span></figcaption></figure>`).join('')}</div>
      <p class="kf-note kf-r">${FOUNDER.note}</p>
    </div>
  </div>
</section>

<section class="kf-sec kf-districts" id="ker-districts" ${ch('03', 'Fourteen districts')} aria-label="Fourteen districts">
  <div class="kf-dist-bg" aria-hidden="true">${video('paddy')}</div>
  <div class="kf-wrap kf-head">${slate(DIST.slate)}<h2 class="kf-h2 kf-r">${film(DIST.h2)}</h2><p class="kf-lede kf-r">${DIST.lede}</p></div>
  <div class="kf-wrap kf-map-grid">
    <ol class="kf-dlist">
${DIST.items.map(([b, s]) => `      <li data-d="${slug(b)}"><b>${b}</b><span>${s}</span></li>`).join('\n')}
    </ol>
    <div class="kf-map-stick">
      <figure class="kf-map">
        <svg viewBox="0 0 ${MAP.W} ${MAP.H}" role="img" aria-label="Map of Kerala's fourteen districts, north to south">
${DIST.items.map(([b]) => `          <path data-d="${slug(b)}" d="${MAP.out[b].d}"/>`).join('\n')}
${DIST.items.map(([b]) => `          <circle data-d="${slug(b)}" cx="${MAP.out[b].c[0].toFixed(1)}" cy="${MAP.out[b].c[1].toFixed(1)}" r="2.6"/>`).join('\n')}
        </svg>
        <p class="kf-map-name" aria-hidden="true"><b>Kasaragod</b><span>01 / 14</span></p>
        <figcaption class="kf-credit">District boundaries: DataMeet, CC BY 4.0</figcaption>
      </figure>
    </div>
  </div>
  <div class="kf-wrap kf-photos">${DIST.photos.map(([img, c]) => `<figure class="kf-photo kf-r">${imgTag(img)}<figcaption>${c}</figcaption></figure>`).join('')}</div>
</section>

<section class="kf-sec kf-compare" id="ker-compare" ${ch('04', 'Freelancer or team')} aria-label="Freelancer or team">
  <div class="kf-wrap kf-head">${slate(COMPARE.slate)}<h2 class="kf-h2 kf-r">${film(COMPARE.h2)}</h2><p class="kf-lede kf-r">${COMPARE.lede}</p></div>
  <div class="kf-wrap"><div class="kf-tblwrap kf-r">${COMPARE.table}</div>
  <aside class="kf-glass kf-callout kf-r">${COMPARE.callout.trim()}</aside></div>
</section>

<section class="kf-film" id="ker-services" ${ch('05', 'What we do')} aria-label="What we do for Kerala businesses">
  <div class="kf-film-media"><div class="kf-stick">${video('nets')}<span class="kf-shade"></span></div></div>
  <div class="kf-film-title">${slate(SERV.slate)}<h2 class="kf-h2 kf-r">${film(SERV.h2)}</h2><p class="kf-lede kf-r">${SERV.lede}</p></div>
  <div class="kf-film-body kf-wrap"><div class="kf-svcgrid">${SERV.items.map(([h, p], i) => `<article class="kf-glass kf-svc kf-r"><span class="kf-idx">0${i + 1}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></div>
</section>

<section class="kf-sec kf-sectors" id="ker-sectors" ${ch('06', 'Who we build for')} aria-label="Who we build for in Kerala">
  <div class="kf-wrap kf-head">${slate(SECT.slate)}<h2 class="kf-h2 kf-r">${film(SECT.h2)}</h2><p class="kf-lede kf-r">${SECT.lede}</p></div>
  <div class="kf-wrap kf-tiles">${SECT.tiles.map(([img, b, s]) => `<figure class="kf-tile kf-r">${imgTag(img)}<figcaption><b>${b}</b><span>${s}</span></figcaption></figure>`).join('')}</div>
</section>

<section class="kf-film" id="ker-process" ${ch('07', 'How the work runs')} aria-label="How the work runs">
  <div class="kf-film-media"><div class="kf-stick">${video('road')}<span class="kf-shade"></span></div></div>
  <div class="kf-film-title">${slate(PROC.slate)}<h2 class="kf-h2 kf-r">${film(PROC.h2)}</h2><p class="kf-lede kf-r">${PROC.lede}</p><p class="kf-filmcap kf-r">${PROC.figcap}</p></div>
  <div class="kf-film-body kf-wrap"><ol class="kf-steps"><span class="kf-steps-line" aria-hidden="true"><i></i></span>${PROC.steps.map(([n, h, p]) => `<li class="kf-glass kf-step kf-r"><i>${n}</i><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol></div>
</section>

<section class="kf-sec kf-cost" id="ker-cost" ${ch('08', 'What it costs')} aria-label="What SEO costs in Kerala">
  <div class="kf-wrap kf-head">${slate(COST.slate)}<h2 class="kf-h2 kf-r">${film(COST.h2)}</h2><p class="kf-lede kf-r">${COST.lede}</p></div>
  <div class="kf-wrap">
    <div class="kf-glass kf-range kf-r" aria-label="${COST.rangeLabel}">
      <div class="kf-axis">${COST.axis.map(a => `<span>${a}</span>`).join('')}</div>
      ${COST.bars.map(([c, f, t, b, s]) => `<div class="kf-bar ${c}" style="--from:${f}%;--to:${t}%"><i></i><b>${b}</b><span>${s}</span></div>`).join('\n      ')}
      <p class="kf-range-note">${COST.note}</p>
    </div>
    <div class="kf-drivers">${COST.drivers.map(([n, h, p]) => `<div class="kf-drv kf-r"><b>${n}</b><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
    <p class="kf-p kf-close kf-r">${COST.close}</p>
  </div>
</section>

<section class="kf-sec kf-check" id="ker-checklist" ${ch('09', 'Before you hire')} aria-label="Before you hire anyone">
  <div class="kf-wrap kf-two">
    <div class="kf-check-head">${slate(CHECK.slate)}<h2 class="kf-h2 kf-r">${film(CHECK.h2)}</h2><p class="kf-lede kf-r">${CHECK.lede}</p></div>
    <ol class="kf-qs">${CHECK.qs.map(([h, p], i) => `<li class="kf-r"><i class="kf-it">${i + 1}</i><div><h3>${h}</h3><p>${p}</p></div></li>`).join('')}</ol>
  </div>
</section>

<section class="kf-film kf-band" ${ch('10', 'Kerala')} aria-label="${BAND.slate}">
  <div class="kf-film-media"><div class="kf-stick">${video('canoe')}<span class="kf-shade"></span></div></div>
  <div class="kf-film-title">${slate(BAND.slate)}<h2 class="kf-h2 kf-xl kf-r">${BAND.h2.replace(/is where we work\./, '<em class="kf-it">is where we work.</em>')}</h2><p class="kf-lede kf-r">${BAND.p}</p><div class="kf-actions kf-r">${BAND.cta}</div></div>
</section>

<div class="kf-faq" ${ch('11', 'Questions')}>
${FAQ}
</div>

<section class="kf-film kf-final" id="contact" ${ch('12', 'Talk to us')}>
  <div class="kf-film-media"><div class="kf-stick">${video('mist')}<span class="kf-shade"></span></div></div>
  <div class="kf-film-title kf-final-in"><h2 class="kf-h2 kf-xl kf-r">${film(CTA.h2)}</h2><div class="final-cta-actions kf-actions kf-r">${CTA.actions.trim().replace(/class="primary-btn-large"/, 'class="kf-btn"').replace(/ style="[^"]*"/, '')}</div></div>
</section>
<button class="kf-pause" type="button" aria-pressed="false" hidden>Pause video</button>
</main>
`;

// ---------------------------------------------------------------------------------------------- tail
// the old page's reveal script only ever served the old markup
TAIL = TAIL.replace(/<script>\s*\/\* in_kerala\.js : light each frame[\s\S]*?<\/script>\n?/, '');
// the inherited footer listed Canadian cities under "serving businesses across India" (in_city.js template;
// the other /in/ city pages still carry it) -- on this page it names Kerala's districts instead
TAIL = TAIL.replace(/<h3>SERVING BUSINESSES ACROSS INDIA<\/h3>\s*<p class="footer-cities-list">[\s\S]*?<\/p>/,
  `<h3>SERVING BUSINESSES ACROSS KERALA</h3>\n            <p class="footer-cities-list">${DIST.items.map(([b]) => b).join(' &bull; ')} &bull; from our base in Kochi</p>`);
if (/every Canadian province/.test(TAIL)) throw new Error('footer city list not replaced');
TAIL = TAIL.replace(/<!-- kf-js:start -->[\s\S]*?<!-- kf-js:end -->\n?/, '');
TAIL = TAIL.replace(/<\/body>\s*<\/html>\s*$/, `<!-- kf-js:start -->
<script src="/assets/js/vendor/lenis-1.1.13.min.js" defer></script>
<script src="/assets/js/kerala-film.js" defer></script>
<!-- kf-js:end -->
</body>
</html>
`);
L.must(TAIL, 'kf-js:start', 1);

let head = HEAD.replace(/<!-- kf-css:start -->[\s\S]*?<!-- kf-css:end -->\n?/, '');
head += `<!-- kf-css:start -->
<link rel="preload" as="image" href="/assets/videos/kerala/kerala-falls-d.webp" media="(min-width: 768px)" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
${fs.readFileSync(path.join(__dirname, 'in_kerala_film.css'), 'utf8')}
</style>
<!-- kf-css:end -->
`;

let bodyOpen = BODY_OPEN.replace(/<body class="([^"]*)">/, (m, c) => `<body class="${c.split(' ').filter(x => x && x !== 'kf').concat('kf').join(' ')}">`);
L.must(bodyOpen, 'kf"', 1);

const out = head + bodyOpen + BODY + TAIL;
// nothing that was on the page may go missing: every FAQ question, heading and paragraph of the old body
for (const t of [H.h1, ANSWER, ONE.h2, FOUNDER.h2, DIST.h2, COMPARE.h2, SERV.h2, SECT.h2, PROC.h2, COST.h2, CHECK.h2, BAND.h2, CTA.h2]) {
  const plain = t.replace(/<[^>]+>/g, '').slice(0, 40);
  if (!out.replace(/<[^>]+>/g, '').includes(plain)) throw new Error('lost text: ' + plain);
}
['id="ker-one"', 'id="ker-founder"', 'id="ker-districts"', 'id="ker-compare"', 'id="ker-services"', 'id="ker-sectors"', 'id="ker-process"', 'id="ker-cost"', 'id="ker-checklist"', 'id="city-faq"', 'id="contact"', 'application/ld+json'].forEach(k => L.must(out, k));
fs.writeFileSync(path.join(L.REPO, REL), out.replace(/\r?\n/g, '\r\n'));
console.log('kerala film written:', REL, (out.length / 1024).toFixed(0) + 'KB');
