'use strict';
const fs = require('fs'); const path = require('path');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';
const FORM = 'https://forms.zohopublic.in/infotechau1/form/ContactUs/formperma/dbhRozkUnAh8YL0_CF5nUiAKfUFzPOL3FKmZnW6D0Fg';
function read(rel) { return fs.readFileSync(path.join(REPO, rel), 'utf8'); }
function write(rel, s) {
  const p = path.join(REPO, rel); fs.mkdirSync(path.dirname(p), { recursive: true });
  // keep one line-ending style per file: templates in this repo are CRLF, so normalize when the file is mostly CRLF
  if ((s.match(/\r\n/g) || []).length > 100) s = s.replace(/\r?\n/g, '\r\n');
  fs.writeFileSync(p, s); console.log('wrote', rel, (s.length / 1024).toFixed(0) + 'KB');
}
function count(s, needle) { return s.split(needle).length - 1; }
function must(s, needle, n) { const c = count(s, needle); if (n === undefined ? c < 1 : c !== n) { const i = s.indexOf(needle); const ctx = i >= 0 ? s.slice(Math.max(0, i - 160), i + 120).replace(/\s+/g, ' ') : ''; throw new Error(`expected ${n === undefined ? '>=1' : n} of ${JSON.stringify(needle.slice(0, 60))}, found ${c}\n  context: ${ctx}`); } return s; }
function replaceAll(s, from, to, expect) { const c = count(s, from); if (expect !== undefined && c !== expect) throw new Error(`replaceAll ${JSON.stringify(from.slice(0, 60))}: expected ${expect}, found ${c}`); if (c === 0) throw new Error('replaceAll: not found ' + from.slice(0, 80)); return s.split(from).join(to); }
function replaceBetween(s, startMark, endMark, content, opts = {}) {
  const a = s.indexOf(startMark); if (a === -1) throw new Error('start not found: ' + startMark.slice(0, 60));
  const b = s.indexOf(endMark, a + startMark.length); if (b === -1) throw new Error('end not found: ' + endMark.slice(0, 60));
  const keepStart = opts.keepStart !== false, keepEnd = opts.keepEnd !== false;
  return s.slice(0, keepStart ? a + startMark.length : a) + content + s.slice(keepEnd ? b : b + endMark.length);
}
function esc(t) { return String(t).replace(/&(?!amp;|mdash;|ndash;|rsquo;|lsquo;|ldquo;|rdquo;|bull;|middot;|rarr;|larr;|nbsp;|hellip;|#\d+;|times;|pound;)/g, '&amp;'); }
function plain(t) { return String(t).replace(/&mdash;/g, '\u2014').replace(/&ndash;/g, '\u2013').replace(/&rsquo;/g, '\u2019').replace(/&lsquo;/g, '\u2018').replace(/&ldquo;/g, '\u201c').replace(/&rdquo;/g, '\u201d').replace(/&pound;/g, '\u00a3').replace(/&bull;/g, '\u2022').replace(/&middot;/g, '\u00b7').replace(/&rarr;/g, '\u2192').replace(/&hellip;/g, '\u2026').replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'); }
function jsonStr(t) { return JSON.stringify(plain(t)); }
// ----- head -----
function setHead(s, o) {
  s = s.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(o.title)}</title>`);
  s = s.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(o.desc)}" />`);
  s = s.replace(/<meta property="og:url" content="[^"]*" \/>/g, `<meta property="og:url" content="${o.url}" />`);
  s = s.replace(/<meta property="og:title" content="[^"]*" \/>/g, `<meta property="og:title" content="${esc(o.ogTitle || o.title)}" />`);
  s = s.replace(/<meta property="og:description" content="[^"]*" \/>/g, `<meta property="og:description" content="${esc(o.desc)}" />`);
  s = s.replace(/<meta name="twitter:title" content="[^"]*" \/>/g, `<meta name="twitter:title" content="${esc(o.ogTitle || o.title)}" />`);
  s = s.replace(/<meta name="twitter:description" content="[^"]*" \/>/g, `<meta name="twitter:description" content="${esc(o.desc)}" />`);
  if (o.ogType) s = s.replace(/<meta property="og:type" content="[^"]*" \/>/g, `<meta property="og:type" content="${o.ogType}" />`);
  s = s.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\r?\n/g, '');
  const hl = (o.hreflang || []).map(h => `<link rel="alternate" hreflang="${h.lang}" href="${h.href}" />\n`).join('');
  s = s.replace(/<link href="[^"]*" rel="canonical"\/>/, `${hl}<link href="${o.url}" rel="canonical"/>`);
  must(s, `rel="canonical"`, 1);
  return s;
}
// ----- schema blocks -----
function faqSchema(faqs) {
  return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
${faqs.map(f => `        {
          "@type": "Question",
          "name": ${jsonStr(f.q)},
          "acceptedAnswer": { "@type": "Answer", "text": ${jsonStr(f.a)} }
        }`).join(',\n')}
      ]
    }
    </script>`;
}
function faqHtml(id, eyebrow, heading, faqs, lead) {
  return `<section class="tap-faq-section" id="${id}">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">${eyebrow}</p>
            <h2>${heading}</h2>
${lead ? `            <p class="us-lead">${lead}</p>\n` : ''}        </div>
        <div class="faq-accordion">
${faqs.map(f => `            <div class="faq-item">
                <button class="faq-trigger"><span>${f.q}</span><span class="faq-icon">+</span></button>
                <div class="faq-content"><p>${f.a}</p></div>
            </div>`).join('\n')}
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('#${id} .faq-trigger').forEach(function(trigger) {
                trigger.addEventListener('click', function() {
                    const item = this.parentElement;
                    const content = this.nextElementSibling;
                    const isActive = item.classList.contains('active');
                    document.querySelectorAll('#${id} .faq-item').forEach(function(el) {
                        el.classList.remove('active');
                        el.querySelector('.faq-content').style.maxHeight = '0';
                        el.querySelector('.faq-icon').textContent = '+';
                    });
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                        this.querySelector('.faq-icon').textContent = '\u2212';
                    }
                });
            });
        });
    </script>
</section>

`;
}
// ----- nav / footer -----
const US_NAV_ITEM = `                        <a href="/us/" class="nav-dropdown-item"><img src="https://flagcdn.com/w40/us.png" alt="" /> United States</a>`;
const US_FOOTER_ITEM = `                <p><a href="/us/" class="footer-link">\u{1F1FA}\u{1F1F8} United States</a></p>`;
function addUsToNavAndFooter(s) {
  if (!s.includes('href="/us/" class="nav-dropdown-item"')) {
    const tor = s.match(/^( *)<a href="\/ca\/toronto\/" class="nav-dropdown-item">.*<\/a>$/m);
    if (tor) s = s.replace(tor[0], tor[0] + '\n' + US_NAV_ITEM);
    else { const ca = s.match(/^( *)<a href="\/ca\/" class="nav-dropdown-item">.*<\/a>$/m); if (!ca) throw new Error('no CA nav item'); s = s.replace(ca[0], ca[0] + '\n' + US_NAV_ITEM); }
  }
  if (!s.includes('href="/us/" class="footer-link"')) {
    const caf = s.match(/^( *)<p><a href="\/ca\/" class="footer-link">\u{1F1E8}\u{1F1E6} Canada<\/a><\/p>$/mu); if (!caf) throw new Error('no CA footer item');
    s = s.replace(caf[0], caf[0] + '\n' + US_FOOTER_ITEM);
  }
  return s;
}
function usFooterCities(s) {
  const start = '<div class="footer-cities">', end = '<div class="footer-bottom">';
  const block = `
            <h3>Serving Businesses Across the United States</h3>
            <p class="footer-cities-list">New York &bull; Los Angeles &bull; Chicago &bull; Houston &bull; Dallas&ndash;Fort Worth &bull; Phoenix &bull; Atlanta &bull; Miami &bull; Seattle &bull; Denver &bull; Boston &bull; San Francisco Bay Area &bull; Austin &bull; Charlotte &bull; and all 50 states, remotely</p>
        </div>
        `;
  return replaceBetween(s, start, end, block, { keepStart: true, keepEnd: true });
}
// ----- extras: reveal, wide tier, component css -----
const REVEAL_CSS = `
  /* scroll-reveal (classes applied by JS; no-JS and reduced-motion users see everything) */
  .reveal{ opacity:0; transform:translateY(20px); transition:opacity .55s ease, transform .55s ease; }
  .reveal.in{ opacity:1; transform:none; }
  @media (prefers-reduced-motion: reduce){ .reveal{ opacity:1; transform:none; transition:none; } }`;
const WIDE_CSS = `
  /* wide-desktop tier (RULES 9): desktop must use the screen */
  @media (min-width:1440px){ .container{ max-width:1480px; } .final-cta{ max-width:1480px; } }
  @media (min-width:1850px){ .container{ max-width:1720px; } .final-cta{ max-width:1720px; } }`;
const REVEAL_JS = `<script>
(function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var sel = '.erp-benefit-item, .erp-advantage-card, .erp-process-step, .promise-grid, .security-badge-item, .faq-item, .pillar-card, .region-card, .case-card, .compare-card, .number-stat-item, .us-module-card, .us-industry-card, .us-cost-card, .us-compare-wrap, .us-stat-card';
    var targets = document.querySelectorAll(sel);
    targets.forEach(function(t){ t.classList.add('reveal'); });
    var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function(t){ io.observe(t); });
})();
</script>
`;
const US_COMPONENT_CSS = `
  /* ---------- country-page components ---------- */
  .us-modules-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:36px; }
  .us-module-card{ background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:24px 22px; transition:all .15s ease; }
  .us-module-card:hover{ border-color:var(--orange); transform:translateY(-3px); box-shadow:var(--shadow-md); }
  .us-module-card .us-module-icon{ font-size:1.6rem; display:block; margin-bottom:12px; }
  .us-module-card h4{ font-size:1rem; margin:0 0 8px; }
  .us-module-card p{ font-size:0.88rem; color:var(--ink-soft); line-height:1.55; margin:0; }
  .us-compare-wrap{ margin-top:36px; overflow-x:auto; border:1px solid var(--line); border-radius:14px; background:var(--paper); }
  .us-compare{ width:100%; border-collapse:collapse; min-width:720px; font-size:0.92rem; }
  .us-compare th, .us-compare td{ padding:14px 18px; text-align:left; border-bottom:1px solid var(--line); vertical-align:top; line-height:1.5; }
  .us-compare thead th{ background:var(--navy-deep); color:#fff; font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.1em; text-transform:uppercase; font-weight:600; }
  .us-compare thead th.us-compare-hi{ background:var(--orange); }
  .us-compare tbody th{ font-weight:600; color:var(--ink); background:var(--paper-alt); width:22%; }
  .us-compare td{ color:var(--ink-soft); }
  .us-compare td.us-compare-hi{ color:var(--ink); font-weight:500; background:var(--orange-tint); }
  .us-compare tr:last-child th, .us-compare tr:last-child td{ border-bottom:none; }
  .us-cost-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:36px; }
  .us-cost-card{ background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:30px 28px; }
  .us-cost-card.us-cost-hi{ border-color:var(--orange); box-shadow:var(--shadow-md); position:relative; }
  .us-cost-card .us-cost-tag{ font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--orange-dark); }
  .us-cost-card .us-cost-num{ display:block; font-family:var(--font-mono); font-weight:700; font-size:1.9rem; color:var(--ink); margin:10px 0 4px; letter-spacing:-0.02em; }
  .us-cost-card .us-cost-sub{ font-size:0.85rem; color:var(--ink-faint); margin:0 0 16px; }
  .us-cost-card ul{ margin:0; padding-left:18px; }
  .us-cost-card li{ font-size:0.9rem; color:var(--ink-soft); line-height:1.55; margin-bottom:6px; }
  .us-cost-note{ font-size:0.82rem; color:var(--ink-faint); margin-top:18px; line-height:1.6; }
  .us-industries-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:36px; }
  .us-industry-card{ background:var(--paper); border:1px solid var(--line); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; transition:all .15s ease; }
  .us-industry-card:hover{ transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:var(--line-strong); }
  .us-industry-media{ aspect-ratio:16/10; overflow:hidden; background:var(--paper-alt); }
  .us-industry-media img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
  .us-industry-card:hover .us-industry-media img{ transform:scale(1.05); }
  .us-industry-body{ padding:20px 22px 22px; }
  .us-industry-body h4{ font-size:1rem; margin:0 0 8px; }
  .us-industry-body p{ font-size:0.88rem; color:var(--ink-soft); line-height:1.55; margin:0; }
  .us-stat-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:36px; }
  .us-stat-card{ background:var(--navy-deep); color:#fff; border-radius:14px; padding:26px 24px; }
  .us-stat-card .num{ display:block; font-family:var(--font-mono); font-weight:700; font-size:1.7rem; letter-spacing:-0.02em; }
  .us-stat-card .lbl{ display:block; font-size:0.85rem; color:rgba(255,255,255,0.7); margin-top:6px; line-height:1.45; }
  .us-section{ padding:88px 0; }
  .us-section-alt{ background:var(--paper-alt); }
  .us-lead{ color:var(--ink-soft); font-size:1.05rem; line-height:1.7; max-width:72ch; margin:14px 0 0; }
  .us-links-row{ display:flex; flex-wrap:wrap; gap:10px 22px; margin-top:22px; font-size:0.92rem; }
  .us-links-row a{ color:var(--orange-dark); font-weight:600; text-decoration:none; }
  .us-links-row a:hover{ text-decoration:underline; }
  @media (max-width:1100px){ .us-modules-grid, .us-industries-grid, .us-stat-row{ grid-template-columns:repeat(2,1fr); } .us-cost-grid{ grid-template-columns:1fr; } }
  @media (max-width:640px){ .us-modules-grid, .us-industries-grid, .us-stat-row{ grid-template-columns:1fr; } }`;
function injectExtras(s, extraCss) {
  const hasWide = s.includes('max-width:1480px');
  const css = `<style>${REVEAL_CSS}${hasWide ? '' : WIDE_CSS}${US_COMPONENT_CSS}${extraCss || ''}\n</style>\n`;
  s = s.replace('</head>', css + '</head>');
  s = s.replace(/<\/body>\s*<\/html>\s*$/, REVEAL_JS + '</body>\n</html>\n');
  return s;
}
// ----- hero -----
function heroBlock(o) {
  return `
            <p class="eyebrow">${o.eyebrow}</p>
            <h1>${o.h1}</h1>
            <p class="hero-subtitle">${o.sub}</p>
            <div class="hero-actions">
                <a href="${FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
                <a href="${o.ghostHref}" class="btn-ghost">${o.ghostText}</a>
            </div>
            <div class="hero-features-list">
${o.features.map(f => `                <div class="hero-feature-item">${f}</div>`).join('\n')}
            </div>
            <div class="trust-strip">
${o.trust.map(t => `                <div class="trust-item"><span class="num">${t[0]}</span><span class="lbl">${t[1]}</span></div>`).join('\n')}
            </div>
        </div>
    </div>
    </div>
</section>

`;
}
function setHero(s, o) { return replaceBetween(s, '<div class="hero-main-content">', '<section class="tap-answer-section">', heroBlock(o), { keepStart: true, keepEnd: true }); }
function setRotatePhrases(s, country, currencyLine, cities, ctry2) {
  s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, `rotateText('heroRotate', [
        '${country} ERP, Web &amp; SEO.',
        'Best AI Developers for ${ctry2}.',
        'Trusted ERP Partner in ${ctry2}.',
        'Full-Spectrum SEO Experts.',
        'AI-Native Web Development.'
    ], 2600, 0);`);
  s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, `rotateText('heroEyebrowRotate', [
        'AI-Native Engineering Team — Serving ${ctry2}',
        '250+ Projects Delivered',
        '${currencyLine}',
        '4.9/5 Client Rating',
        '${cities}'
    ], 3200, 1200);`);
  // literal fallbacks (the dead rotateText calls on service pages use other timing args)
  const lit = {
    "'Canadian ERP, Web &amp; SEO.'": `'${country} ERP, Web &amp; SEO.'`,
    "'Best AI Developers for Canada.'": `'Best AI Developers for ${ctry2}.'`,
    "'Trusted ERP Partner in Canada.'": `'Trusted ERP Partner in ${ctry2}.'`,
    "'AI-Native Engineering Team — Serving Canada'": `'AI-Native Engineering Team — Serving ${ctry2}'`,
    "'CA$1,490/mo &bull; Save 57%'": `'${currencyLine}'`,
    "'Toronto &bull; Vancouver &bull; Montreal'": `'${cities}'`,
  };
  for (const [from, to] of Object.entries(lit)) s = s.split(from).join(to);
  return s;
}
function setSideText(s, to, idSuffix) { s = replaceAll(s, '<span>to Canada.</span>', `<span>${to}</span>`, 1); s = replaceAll(s, 'heroArcPathCA', 'heroArcPath' + idSuffix); return s; }
function setBody(s, bodyHtml) { return replaceBetween(s, '<section class="tap-answer-section">', '<section class="final-cta-section"', bodyHtml, { keepStart: false, keepEnd: true }); }
function setFinalCta(s, h2, note) { s = s.replace(/(<section class="final-cta-section" id="contact">\s*<div class="final-cta">\s*<h2>)[\s\S]*?(<\/h2>)/, `$1${h2}$2`); if (note) s = s.replace(/(<span class="final-cta-note"[^>]*>)[\s\S]*?(<\/span>)/, `$1${note}$2`); return s; }
function setPageSchemas(s, blocks) {
  const a = s.indexOf('</style>'); const b = s.indexOf('        </head>', a); if (a === -1 || b === -1) throw new Error('schema area not found');
  return s.slice(0, a + '</style>'.length) + '\n\n\n\n' + blocks.join('\n') + '\n' + s.slice(b);
}
function promise(o) { return `<section class="tap-promise-section">
    <div class="container promise-grid">
        <div class="promise-content">
            <h2>${o.h2}</h2>
            <p>${o.p}</p>
            <a href="${o.href}" class="btn-navy">${o.cta}</a>
        </div>
        <div class="promise-media">
            <img src="/assets/images/library/${o.img}" alt="${o.alt}" width="${o.w}" height="${o.h}" loading="lazy" />
        </div>
    </div>
</section>

`; }
function sectionHead(eyebrow, h2, lead) { return `        <div class="section-head">
            <p class="eyebrow">${eyebrow}</p>
            <h2>${h2}</h2>
${lead ? `            <p class="us-lead">${lead}</p>\n` : ''}        </div>\n`; }
function answer(html) { return `<section class="tap-answer-section">
    <div class="container answer-grid">
        <div class="answer-mark" aria-hidden="true"></div>
        <p>${html}</p>
    </div>
</section>

`; }
function benefitRow(id, eyebrow, h2, items) { return `<section id="${id}" class="tap-erp-what-section">
    <div class="container">
${sectionHead(eyebrow, h2)}        <div class="erp-benefit-row">
${items.map(i => `            <div class="erp-benefit-item">
                <span class="erp-benefit-icon">${i.icon}</span>
                <h4>${i.h4}</h4>
                <p>${i.p}</p>
            </div>`).join('\n')}
        </div>
    </div>
</section>

`; }
function modulesGrid(id, eyebrow, h2, lead, items, alt) { return `<section id="${id}" class="us-section${alt ? ' us-section-alt' : ''}">
    <div class="container">
${sectionHead(eyebrow, h2, lead)}        <div class="us-modules-grid">
${items.map(i => `            <div class="us-module-card">
                <span class="us-module-icon">${i.icon}</span>
                <h4>${i.h4}</h4>
                <p>${i.p}</p>
            </div>`).join('\n')}
        </div>
    </div>
</section>

`; }
function compareTable(id, eyebrow, h2, lead, cols, hiIndex, rows, alt, note) { return `<section id="${id}" class="us-section${alt ? ' us-section-alt' : ''}">
    <div class="container">
${sectionHead(eyebrow, h2, lead)}        <div class="us-compare-wrap">
            <table class="us-compare">
                <thead><tr><th></th>${cols.map((c, i) => `<th${i === hiIndex ? ' class="us-compare-hi"' : ''}>${c}</th>`).join('')}</tr></thead>
                <tbody>
${rows.map(r => `                    <tr><th>${r[0]}</th>${r.slice(1).map((c, i) => `<td${i === hiIndex ? ' class="us-compare-hi"' : ''}>${c}</td>`).join('')}</tr>`).join('\n')}
                </tbody>
            </table>
        </div>
${note ? `        <p class="us-cost-note">${note}</p>\n` : ''}    </div>
</section>

`; }
function processRow(id, eyebrow, h2, steps) { return `<section class="tap-erp-process-section" id="${id}">
    <div class="container">
${sectionHead(eyebrow, h2)}        <div class="erp-process-row">
${steps.map((st, i) => `            <div class="erp-process-step">
                <div class="erp-process-num">${i + 1}</div>
                <h4>${st.h4}</h4>
                <p>${st.p}</p>
            </div>`).join('\n')}
        </div>
    </div>
</section>

`; }
function costGrid(id, eyebrow, h2, lead, cards, note, alt) { return `<section id="${id}" class="us-section${alt ? ' us-section-alt' : ''}">
    <div class="container">
${sectionHead(eyebrow, h2, lead)}        <div class="us-cost-grid">
${cards.map(c => `            <div class="us-cost-card${c.hi ? ' us-cost-hi' : ''}">
                <span class="us-cost-tag">${c.tag}</span>
                <span class="us-cost-num">${c.num}</span>
                <p class="us-cost-sub">${c.sub}</p>
                <ul>
${c.items.map(i => `                    <li>${i}</li>`).join('\n')}
                </ul>
            </div>`).join('\n')}
        </div>
${note ? `        <p class="us-cost-note">${note}</p>\n` : ''}    </div>
</section>

`; }
function industriesGrid(id, eyebrow, h2, lead, cards, alt) { return `<section id="${id}" class="us-section${alt ? ' us-section-alt' : ''}">
    <div class="container">
${sectionHead(eyebrow, h2, lead)}        <div class="us-industries-grid">
${cards.map(c => `            <div class="us-industry-card">
                <div class="us-industry-media"><img src="/assets/images/library/${c.img}" alt="${c.alt}" width="${c.w || 612}" height="${c.h || 408}" loading="lazy" /></div>
                <div class="us-industry-body">
                    <h4>${c.h4}</h4>
                    <p>${c.p}</p>
                </div>
            </div>`).join('\n')}
        </div>
    </div>
</section>

`; }
function whySection(eyebrow, h2, badges, stackLabel, stack) { return `<section class="tap-erp-why-section">
    <div class="container">
${sectionHead(eyebrow, h2)}        <div class="security-badges-grid">
${badges.map(b => `            <div class="security-badge-item"><span class="security-badge-icon">${b[0]}</span><h4>${b[1]}</h4></div>`).join('\n')}
        </div>
        <div class="erp-stack-strip">
            <span class="erp-stack-label">${stackLabel}</span>
${stack.map(x => `            <span class="erp-stack-item">${x}</span>`).join('\n')}
        </div>
    </div>
</section>

`; }
function statRow(id, eyebrow, h2, lead, stats, alt) { return `<section id="${id}" class="us-section${alt ? ' us-section-alt' : ''}">
    <div class="container">
${sectionHead(eyebrow, h2, lead)}        <div class="us-stat-row">
${stats.map(s => `            <div class="us-stat-card"><span class="num">${s[0]}</span><span class="lbl">${s[1]}</span></div>`).join('\n')}
        </div>
    </div>
</section>

`; }
function serviceSchema(o) { return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": ${jsonStr(o.type)},
      "name": ${jsonStr(o.name)},
      "url": "${o.url}",
      "provider": { "@type": "Organization", "name": "TechAuditPros", "url": "https://techauditpros.com/" },
      "areaServed": { "@type": "Country", "name": ${jsonStr(o.country)} },
      "description": ${jsonStr(o.desc)},
      "offers": {
        "@type": "Offer",
        "priceCurrency": "${o.currency}",
        "price": "${o.price}",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "${o.price}", "priceCurrency": "${o.currency}", "unitText": "MONTH" }
      }
    }
    </script>`; }
function breadcrumbSchema(items) { return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
${items.map((it, i) => `        { "@type": "ListItem", "position": ${i + 1}, "name": ${jsonStr(it[0])}, "item": "${it[1]}" }`).join(',\n')}
      ]
    }
    </script>`; }
module.exports = { REPO, FORM, read, write, count, must, replaceAll, replaceBetween, esc, plain, jsonStr, setHead, faqSchema, faqHtml, addUsToNavAndFooter, usFooterCities, injectExtras, setHero, setSideText, setRotatePhrases, setBody, setFinalCta, setPageSchemas, promise, sectionHead, answer, benefitRow, modulesGrid, compareTable, processRow, costGrid, industriesGrid, whySection, statRow, serviceSchema, breadcrumbSchema };
