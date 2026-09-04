'use strict';
// Blog post generator: live header/footer/CSS from index.html + the modern article anatomy
// (lead figure -> Key Takeaways -> answer-first intro -> sections with captioned figures -> FAQ -> CTA -> author),
// Article + BreadcrumbList + FAQPage schema, sticky TOC on wide desktop.
const L = require('./lib.js');
const fs = require('fs');

function slice(s, a, b, inc) { const i = s.indexOf(a); if (i < 0) throw new Error('missing ' + a); const j = s.indexOf(b, i); if (j < 0) throw new Error('missing end ' + b); return s.slice(i, j + (inc ? b.length : 0)); }
const idx = L.read('index.html').replace(/\r\n/g, '\n');
const tpl = L.read('blog/what-is-a-content-audit.html').replace(/\r\n/g, '\n');
const css = slice(idx, '<style>', '</style>', true);
let header = slice(idx, '<header class="site-header">', '</header>', true);
let drawer = slice(idx, '<div class="mobile-drawer"', '\n<section', false);
const footer = slice(idx, '<footer class="site-footer">', '</footer>', true);
// on a post, homepage section anchors must go back to the homepage
header = header.replace(/href="#(services|regions|results|compare|contact)"/g, 'href="/#$1"');
drawer = drawer.replace(/href="#(services|regions|results|compare|contact)"/g, 'href="/#$1"');
let drawerJs = ''; for (const m of idx.matchAll(/<script>([\s\S]*?)<\/script>/g)) { if (m[1].includes('mobileDrawer') && m[1].includes('drawerOverlay')) { drawerJs = m[0]; break; } }
if (!drawerJs) throw new Error('drawer script not found');
const articleCss = slice(tpl, '<style>\n  .article-hero{', '</style>', true);
const orgSchema = slice(idx, '<script type="application/ld+json">', '</script>', true);
const favicons = slice(idx, '<!-- Favicons -->', '<style>', false);
const tocJs = slice(tpl, '<script>\n(function(){\n    var content = document.querySelector(\'.article-content\');', '</script>', true);

const CAT = { seo: 'SEO, AEO & GEO', erp: 'ERP & Software', web: 'Web Development', out: 'Outsourcing & Agencies' };
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function pretty(d) { const [y, m, day] = d.split('-').map(Number); return months[m - 1] + ' ' + day + ', ' + y; }
// Real dimensions and a three-tier srcset come from the download index, so nothing shifts on load
// and a phone never pulls a 2400px file. Falls back to the declared w/h for the older library
// images that predate the index.
const SIZES = (function () {
  try { return JSON.parse(fs.readFileSync(require('path').join(L.REPO, 'assets', 'images', 'library', '_sizes.json'), 'utf8')); }
  catch (e) { return {}; }
})();
function srcOf(name) {
  const base = name.replace(/\.jpg$/, '');
  const master = SIZES[name];
  const cand = [['-700.jpg', SIZES[base + '-700.jpg']], ['-1400.jpg', SIZES[base + '-1400.jpg']], ['.jpg', master]]
    .filter(([, m]) => m).map(([suf, m]) => '/assets/images/library/' + base + suf + ' ' + m.w + 'w');
  return { srcset: cand.length > 1 ? ' srcset="' + cand.join(', ') + '"' : '', master };
}
function imgTag(f, eager, sizesAttr, cls) {
  const { srcset, master } = srcOf(f.img);
  const w = master ? master.w : (f.w || 612);
  const h = master ? master.h : (f.h || 408);
  return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/assets/images/library/' + f.img + '"' + srcset
    + ' sizes="' + (sizesAttr || '(max-width:900px) 100vw, 760px') + '"'
    + ' alt="' + L.esc(f.alt) + '" width="' + w + '" height="' + h + '"'
    + (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" />';
}
// one image, sized to the column
function fig(f, eager) {
  return '        <figure class="article-figure' + (eager ? ' is-lead' : '') + '">' + imgTag(f, eager)
    + (f.cap ? '<figcaption>' + f.cap + '</figcaption>' : '') + '</figure>\n';
}
// a two-up pair, for before/after or this-not-that
function figDuo(pair) {
  return '        <div class="article-duo">\n'
    + pair.map(f => '            <figure class="article-figure">' + imgTag(f, false, '(max-width:700px) 100vw, 380px')
        + (f.cap ? '<figcaption>' + f.cap + '</figcaption>' : '') + '</figure>').join('\n')
    + '\n        </div>\n';
}
// a full-bleed chapter break with the words over the picture
function figBand(f) {
  return '        <figure class="article-band">' + imgTag(f, false, '(max-width:900px) 100vw, 760px')
    + '<figcaption><span>' + f.cap + '</span></figcaption></figure>\n';
}

function buildPost(d) {
  const url = 'https://techauditpros.com/blog/' + d.slug + '.html';
  const sectionsHtml = d.sections.map(sec => {
    let h = `\n        <h2>${sec.h2}</h2>\n${sec.html.trim().split('\n').map(l => '        ' + l.trim()).join('\n')}\n`;
    if (sec.figure) h += fig(sec.figure);
    if (sec.figures) h += figDuo(sec.figures);
    if (sec.band) h += figBand(sec.band);
    return h;
  }).join('');
  const faqHtml = d.faqs && d.faqs.length ? `\n        <h2>Frequently Asked Questions</h2>\n${d.faqs.map(f => `        <h3>${f.q}</h3>\n        <p>${f.a}</p>`).join('\n')}\n` : '';
  const body = `
<section class="article-hero">
    <div class="container">
        <p class="eyebrow">${d.eyebrow}</p>
        <h1>${d.h1}</h1>
        <p style="font-size:1.05rem; color:var(--ink-soft); margin:0;">${d.dek}</p>
        <div class="article-meta">
            <span>${pretty(d.date)}</span>
            <span>&bull;</span>
            <span id="readTime">__MINS__ min read</span>
            <span>&bull;</span>
            <span>${CAT[d.cat].replace(/&/g, '&amp;')}</span>
        </div>
    </div>
</section>

<section class="article-body">
    <div class="container">
        <div class="article-content">
${fig(d.lead, true)}        <div class="article-takeaways">
            <h3>Key Takeaways</h3>
            <ul>
${d.takeaways.map(t => `                <li>${t}</li>`).join('\n')}
            </ul>
        </div>

        <p>${d.intro}</p>
${sectionsHtml}${faqHtml}
        <div class="article-cta-box">
            <h3>${d.cta.h3}</h3>
            <p>${d.cta.p}</p>
            <a href="${L.FORM}" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
        </div>

        <div class="article-author-row">
            <img src="/assets/images/founder/aji-paul.webp" alt="Aji Paul" width="1536" height="1024" loading="lazy" decoding="async" />
            <div>
                <div class="article-author-name">Aji Paul</div>
                <div class="article-author-role">Founder &amp; CEO, TechAuditPros</div>
            </div>
        </div>
        </div>
        <aside class="article-toc" aria-label="On this page">
            <h4>On this page</h4>
            <nav id="tocLinks"></nav>
            <div class="toc-cta"><a href="${L.FORM}" target="_blank">Book a Free Strategy Call &rarr;</a></div>
        </aside>
    </div>
</section>
`;
  const words = (body.replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length;
  const mins = Math.max(3, Math.round(words / 230));
  const schema = [`    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ${L.jsonStr(d.h1)},
      "description": ${L.jsonStr(d.desc)},
      "image": "https://techauditpros.com/assets/images/library/${d.lead.img}",
      "author": { "@type": "Person", "name": "Aji Paul", "url": "https://linkedin.com/in/ajipaul-officia/" },
      "publisher": { "@type": "Organization", "name": "TechAuditPros", "logo": { "@type": "ImageObject", "url": "https://techauditpros.com/assets/logoonly.svg" } },
      "datePublished": "${d.date}",
      "dateModified": "${d.date}",
      "mainEntityOfPage": "${url}",
      "wordCount": ${words},
      "articleSection": ${L.jsonStr(CAT[d.cat])}
    }
    </script>`, L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['Blog', 'https://techauditpros.com/blog/'], [L.plain(d.h1), url]])];
  if (d.faqs && d.faqs.length) schema.push(L.faqSchema(d.faqs));
  const revealJs = `<script>
(function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var t = document.querySelectorAll('.article-figure, .article-callout, .article-checklist, .article-cta-box');
    t.forEach(function(e){ e.classList.add('reveal'); });
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    t.forEach(function(e){ io.observe(e); });
})();
</script>`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${L.esc(d.title)}</title>
<meta name="description" content="${L.esc(d.desc)}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="TechAuditPros" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${L.esc(d.title)}" />
<meta property="og:description" content="${L.esc(d.desc)}" />
<meta property="og:image" content="https://techauditpros.com/assets/images/library/${d.lead.img}" />
<meta property="article:published_time" content="${d.date}" />
<meta property="article:author" content="Aji Paul" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@techauditpros" />
<meta name="twitter:title" content="${L.esc(d.title)}" />
<meta name="twitter:description" content="${L.esc(d.desc)}" />
<meta name="twitter:image" content="https://techauditpros.com/assets/images/library/${d.lead.img}" />
<meta content="index, follow" name="robots"/>
<meta content="nKm7MzLndhPXbTGfdIvEyhdbTuWd1fgOMhpKg3GPozM" name="google-site-verification"/>
<link href="${url}" rel="canonical"/>
${orgSchema}
${favicons}${css}
${articleCss.replace('<style>\n', '<style>\n  .reveal{ opacity:0; transform:translateY(20px); transition:opacity .55s ease, transform .55s ease; }\n  .reveal.in{ opacity:1; transform:none; }\n  @media (prefers-reduced-motion: reduce){ .reveal{ opacity:1; transform:none; transition:none; } }\n  .article-body .container > .article-content{ min-width:0; }\n  .article-body table{ width:100%; border-collapse:collapse; font-size:0.95rem; margin:0 0 28px; }\n  .article-body th, .article-body td{ text-align:left; padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top; line-height:1.5; color:var(--ink-soft); }\n  .article-body th{ color:var(--ink); font-weight:600; background:var(--paper-alt); }\n  .article-table-wrap{ overflow-x:auto; margin:0 0 28px; }\n  .article-table-wrap table{ margin:0; min-width:560px; }\n  /* Pictures carry the argument on these pages, so they are allowed to be big. The old shared\n     rule capped every figure at 420px tall, which made a 2400px photograph pointless. */\n  .article-figure img{ display:block; width:auto; max-width:100%; height:auto; margin-left:auto; margin-right:auto; }\n  /* a wide master fills the column, a narrow one shows at its own size rather than being upscaled */\n  .article-figure.is-lead img{ width:100%; max-height:620px; object-fit:cover; }\n  .article-duo{ display:grid; gap:14px; grid-template-columns:1fr; margin:0 0 32px; }\n  .article-duo .article-figure{ margin:0; }\n  .article-duo .article-figure img{ max-height:360px; }\n  @media (min-width:700px){ .article-duo{ grid-template-columns:1fr 1fr; } }\n  /* Chapter break. Deliberately NOT full-bleed: the article column is offset by the sticky TOC, so calc(50% - 50vw) measures from the column centre and clipped the caption. */\n  .article-band{ position:relative; margin:0 0 36px; border-radius:14px; overflow:hidden;\n    width:100%; box-shadow:var(--shadow-md); }\n  .article-band img{ width:100%; display:block; height:clamp(300px, 46vh, 520px); object-fit:cover; }\n  /* the phone cut: pictures stay generous, the band caption gets a heavier scrim, and the first\n     table column stops wrapping to three lines on a 390px screen */\n  @media (max-width:700px){\n    .article-figure.is-lead img{ max-height:none; height:clamp(240px, 42vh, 380px); object-fit:cover; }\n    .article-content .article-figure img{ max-height:none; height:clamp(220px, 38vh, 340px); object-fit:cover; }\n    .article-duo{ gap:12px; }\n    .article-duo .article-figure img{ height:clamp(200px, 34vh, 300px); }\n    .article-band img{ height:clamp(280px, 44vh, 400px); }\n    .article-band figcaption{ padding:18px 20px 20px; background:linear-gradient(0deg, rgba(6,12,26,.94), rgba(6,12,26,.05) 78%); }\n    .article-band figcaption span{ font-size:1.22rem; max-width:none; }\n    .article-figure figcaption{ text-align:left; padding:10px 2px 0; }\n    .article-body th:first-child, .article-body td:first-child{ min-width:110px; }\n    .article-table-wrap table{ min-width:520px; }\n  }\n\n  .article-band figcaption{ position:absolute; inset:auto 0 0 0; padding:clamp(18px,4vw,46px) clamp(18px,6vw,80px);\n    background:linear-gradient(0deg, rgba(6,12,26,.9), rgba(6,12,26,.05)); text-align:left; }\n  .article-band figcaption span{ display:block; max-width:24ch; color:#fff; font-family:var(--font-sans);\n    font-weight:700; font-size:clamp(1.15rem,2.6vw,2rem); line-height:1.16; }\n  .article-body{ overflow-x:hidden; overflow-x:clip; }\n')}
${schema.join('\n')}
</head>
<body class="home-page-redesign">

${header}

${drawer}
${body.replace('__MINS__', String(mins))}

${footer}

${drawerJs}

${tocJs}

${revealJs}
</body>
</html>
`;
  L.write('blog/' + d.slug + '.html', html);
  return { url: '/blog/' + d.slug + '.html', cat: d.cat, date: d.date, words, mins, title: d.title };
}
module.exports = { buildPost, CAT };
