// Build the new blog hub from the live design system (index.html) + full post inventory.
'use strict';
const fs = require('fs');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';
const idx = fs.readFileSync(REPO + '/index.html', 'utf8');

// ---------- extract shared blocks from the live homepage ----------
function slice(s, startMark, endMark, includeEnd) {
    const a = s.indexOf(startMark);
    if (a === -1) throw new Error('missing ' + startMark);
    const b = s.indexOf(endMark, a);
    if (b === -1) throw new Error('missing end ' + endMark);
    return s.slice(a, b + (includeEnd ? endMark.length : 0));
}
const css = slice(idx, '<style>', '</style>', true);
const header = slice(idx, '<header class="site-header">', '</header>', true);
const drawer = slice(idx, '<div class="mobile-drawer"', '\n<section', false);
const footer = slice(idx, '<footer class="site-footer">', '</footer>', true);
// drawer/mobile-menu script: find the <script> containing mobileDrawer wiring
let drawerJs = '';
for (const m of idx.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    if (m[1].includes('mobileDrawer') && m[1].includes('drawerOverlay')) { drawerJs = m[0]; break; }
}
if (!drawerJs) throw new Error('drawer script not found');
let waveJs = '';
for (const m of idx.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    if (m[1].includes('heroCanvas')) { waveJs = m[0]; break; }
}
if (!waveJs) throw new Error('wave script not found');

// ---------- post inventory ----------
const IMG = {
    seo: ['team-standing-document-review-bright-room.jpg','team-flatlay-reviewing-business-report-charts.jpg','team-huddle-reviewing-screen-daylight.jpg','two-women-reviewing-document-bright-office.png'],
    erp: ['whiteboard-process-mapping-two-colleagues.jpg','mentor-explaining-data-on-monitor-warm-office.jpg','confident-leader-office-team-background.webp','client-consultation-meeting-clipboard.jpg'],
    web: ['female-developer-red-hair-dual-monitors-code.jpg','male-developer-dual-monitors-colorful-office.jpg','team-flatlay-reviewing-wireframe-sketch.jpg','female-developer-dual-monitors-colorful-office.jpg','empty-modern-tech-office-open-plan.jpg'],
    out: ['team-casual-standup-meeting-lounge.webp','executive-woman-tablet-grand-hall.jpg','support-agent-headset-smiling-laptop.jpg','small-business-owner-laptop-sidewalk-cafe.jpg'],
};
const imgCounters = { seo: 0, erp: 0, web: 0, out: 0 };
function nextImg(cat) { const pool = IMG[cat]; const f = pool[imgCounters[cat] % pool.length]; imgCounters[cat]++; return '/assets/images/library/' + f; }
const CAT = { seo: 'SEO & AI Search', erp: 'ERP & Software', web: 'Web Development', out: 'Outsourcing & Agencies' };
const posts = [
    // url, cat, dateISO, title-override(optional)
    ['/blog/what-is-a-content-audit.html', 'seo', '2026-09-02'],
    ['/blog/website-design-vs-development.html', 'web', '2026-09-02'],
    ['/blog/what-is-erp-software-plain-english.html', 'erp', '2026-09-02'],
    ['/blog/full-service-vs-diy-erp-agency-canada.html', 'erp', '2026-08-31'],
    ['/blog/enterprise-ai-adoption-literacy-integration-guide.html', 'erp', '2026-07-10'],
    ['/blog/offshore-software-development-guide.html', 'out', '2026-07-10'],
    ['/blog/outsourcing-technical-seo-agency-guide.html', 'seo', '2026-07-09'],
    ['/blog/staff-augmentation-vs-local-hiring-cost.html', 'out', '2026-07-08'],
    ['/blog/advantages-partnering-ai-white-label-seo.html', 'out', '2026-07-02'],
    ['/blog/white-label-seo-agency-uk-growth.html', 'out', '2026-07-01'],
    ['/blog/outsource-seo-services-au-tips.html', 'out', '2026-06-29'],
    ['/blog/how-to-outsource-web-development-to-india.html', 'web', '2026-06-28'],
    ['/blog/offshore-developer-center-dubai.html', 'out', '2026-06-27'],
    ['/blog/outsource-website-management-canada.html', 'web', '2026-06-25'],
    ['/blog/what-to-look-for-outsourcing-website-management.html', 'web', '2026-06-22'],
    ['/blog/why-agencies-outsource-seo-to-india.html', 'out', '2026-06-15'],
    ['/blog/ai-in-digital-marketing/', 'seo', '2026-06-12'],
    ['/blog/what-is-digital-marketing/', 'seo', '2026-06-12'],
    ['/blog/ecommerce-seo-strategy/', 'seo', '2026-06-05'],
    ['/blog/how-much-does-seo-cost-small-business/', 'seo', '2026-06-05'],
    ['/blog/how-to-do-local-seo/', 'seo', '2026-06-05'],
    ['/blog/how-to-qualify-leads-for-seo-agency/', 'seo', '2026-06-05'],
    ['/blog/python-for-seo/', 'seo', '2026-06-05'],
    ['/blog/why-choose-indian-seo-agency/', 'out', '2026-06-05'],
    ['/blog/generative-engine-optimization-geo/', 'seo', '2026-06-05'],
    ['/blog/seo-friendly-web-design-guide/', 'web', '2026-06-05'],
    ['/blog/react-vs-nextjs-for-seo/', 'web', '2026-06-04'],
    ['/blog/how-to-fix-crawlability-issues/', 'seo', '2026-06-04'],
    ['/blog/saas-vs-custom-software/', 'erp', '2026-06-04'],
    ['/blog/what-is-serp-in-seo/', 'seo', '2026-06-04'],
];

function esc(t) { return t.replace(/&(?!amp;|mdash;|rsquo;|lsquo;|ldquo;|rdquo;|bull;|middot;|rarr;|#)/g, '&amp;'); }
function fileFor(url) {
    return REPO + url + (url.endsWith('/') ? 'index.html' : '');
}
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function pretty(d) { const [y, m, day] = d.split('-').map(Number); return months[m - 1] + ' ' + day + ', ' + y; }

// 5 old posts share one copy-pasted meta description — card excerpts overridden here
const DESC_OVERRIDES = {
    '/blog/advantages-partnering-ai-white-label-seo.html': 'How marketing firms use an AI-driven white-label SEO partner to scale client delivery without growing headcount — and what to check before signing.',
    '/blog/enterprise-ai-adoption-literacy-integration-guide.html': 'A playbook for bringing AI into a real business: adoption stages, team literacy, and integrating AI into existing systems without breaking them.',
    '/blog/offshore-software-development-guide.html': 'What offshore software development actually costs, where it goes wrong, and how to structure an engagement that ships — the 2026 guide.',
    '/blog/outsourcing-technical-seo-agency-guide.html': 'When an agency should outsource technical SEO, what a good backend partner handles, and the handoff structure that keeps clients happy.',
    '/blog/staff-augmentation-vs-local-hiring-cost.html': 'The loaded cost of a local hire vs. offshore staff augmentation, in real numbers — salaries, overhead, ramp time, and the break-even point.',
};
const enriched = posts.map(([url, cat, date]) => {
    const s = fs.readFileSync(fileFor(url), 'utf8');
    let title = ((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s*\|[^|]*$/, '').replace(/\s+/g, ' ').trim();
    let desc = DESC_OVERRIDES[url] || ((s.match(/name="description" content="([^"]*)"/) || s.match(/content="([^"]*)"[^>]*name="description"/) || [])[1] || '').replace(/\s+/g, ' ').trim();
    if (desc.length > 165) desc = desc.slice(0, desc.lastIndexOf(' ', 162)) + '…';
    const words = (s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length;
    const mins = Math.max(2, Math.round(words / 230));
    return { url, cat, date, title, desc, mins };
});

// ---------- blog-specific CSS ----------
const blogCss = `
<style>
  /* ---------- BLOG HUB ---------- */
  .tap-new-hero.blog-hero{ min-height:min(88vh, 820px); display:flex; align-items:center; padding:120px 0 150px; }
  .blog-hero .hero-inner{ position:relative; z-index:3; }
  .blog-hero .eyebrow{ color:var(--orange); }
  .blog-hero h1{ color:#fff; font-size:clamp(2.4rem,5.4vw,4.2rem); font-weight:800; max-width:17ch; margin:18px 0 22px; letter-spacing:-0.03em; line-height:1.08; }
  .blog-hero .lede{ color:rgba(255,255,255,0.75); max-width:58ch; font-size:1.12rem; line-height:1.75; margin:0; }
  .blog-hero .hero-stats-row{ display:flex; gap:34px; margin-top:34px; flex-wrap:wrap; }
  .blog-hero .hero-stat .num{ display:block; font-family:var(--font-mono); font-weight:700; font-size:1.5rem; color:#fff; }
  .blog-hero .hero-stat .lbl{ font-size:0.8rem; color:rgba(255,255,255,0.55); }
  .blog-scroll-cue{ position:absolute; left:50%; bottom:26px; transform:translateX(-50%); z-index:3; color:rgba(255,255,255,0.5); font-size:1.4rem; animation:cueBob 2.2s ease-in-out infinite; }
  @keyframes cueBob{ 0%,100%{ transform:translateX(-50%) translateY(0); } 50%{ transform:translateX(-50%) translateY(8px); } }
  @media (prefers-reduced-motion: reduce){ .blog-scroll-cue{ animation:none; } }
  .bloghub-pills{ display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
  .bloghub-pill{
    font-family:var(--font-mono); font-size:0.78rem; letter-spacing:0.04em; cursor:pointer;
    padding:9px 16px; border-radius:999px; border:1px solid rgba(255,255,255,0.25);
    background:transparent; color:rgba(255,255,255,0.85); transition:all .15s ease;
  }
  .bloghub-pill:hover{ border-color:var(--orange); color:#fff; }
  .bloghub-pill.active{ background:var(--orange); border-color:var(--orange); color:#fff; font-weight:600; }

  .bloghub-featured{ padding:0 0 8px; margin-top:-90px; position:relative; z-index:5; }
  .featured-card{
    display:grid; grid-template-columns:1.1fr 1fr; gap:0; background:var(--paper); border:1px solid var(--line);
    border-radius:18px; overflow:hidden; box-shadow:var(--shadow-md); text-decoration:none; transition:box-shadow .2s ease;
  }
  .featured-card:hover{ box-shadow:var(--shadow-lg); }
  .featured-media{ min-height:320px; }
  .featured-media img{ width:100%; height:100%; object-fit:cover; display:block; }
  .featured-body{ padding:40px 44px; display:flex; flex-direction:column; justify-content:center; }
  .featured-kicker{ font-family:var(--font-mono); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--orange-dark); margin-bottom:14px; }
  .featured-body h2{ font-size:clamp(1.4rem,2.4vw,1.9rem); line-height:1.2; margin-bottom:14px; }
  .featured-body p{ color:var(--ink-soft); line-height:1.65; margin:0 0 18px; }
  .featured-meta{ font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-faint); }
  .featured-cta{ margin-top:18px; color:var(--orange-dark); font-weight:700; font-size:0.95rem; }

  .bloghub-start{ padding:56px 0 8px; }
  .start-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:24px; }
  .start-card{
    background:var(--paper-alt); border:1px solid var(--line); border-radius:14px; padding:26px 26px 22px;
    text-decoration:none; transition:all .15s ease; display:flex; flex-direction:column; gap:10px;
  }
  .start-card:hover{ border-color:var(--orange); transform:translateY(-2px); box-shadow:var(--shadow-sm); }
  .start-card .start-tag{ font-family:var(--font-mono); font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--orange-dark); }
  .start-card h3{ font-size:1.05rem; line-height:1.35; }
  .start-card p{ font-size:0.88rem; color:var(--ink-soft); margin:0; line-height:1.55; flex:1; }
  .start-card .start-link{ font-size:0.85rem; font-weight:700; color:var(--ink); }

  .bloghub-grid-section{ padding:56px 0 88px; }
  .bloghub-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:28px; }
  .post-card{
    background:var(--paper); border:1px solid var(--line); border-radius:14px; overflow:hidden;
    display:flex; flex-direction:column; text-decoration:none; transition:all .15s ease; position:relative;
  }
  .post-card::before{ content:''; display:block; height:4px; background:var(--line-strong); }
  .post-card[data-cat="seo"]::before{ background:var(--good); }
  .post-card[data-cat="erp"]::before{ background:var(--navy-deep); }
  .post-card[data-cat="web"]::before{ background:var(--orange); }
  .post-card[data-cat="out"]::before{ background:var(--warn); }
  .post-media{ aspect-ratio:16/10; overflow:hidden; background:var(--paper-alt); }
  .post-media img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
  .post-card:hover .post-media img{ transform:scale(1.06); }
  .post-card:hover{ transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:var(--line-strong); }
  .reveal{ opacity:0; transform:translateY(20px); transition:opacity .55s ease, transform .55s ease; }
  .reveal.in{ opacity:1; transform:none; }
  @media (prefers-reduced-motion: reduce){ .reveal{ opacity:1; transform:none; transition:none; } }
  .bloghub-pager{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:44px; }
  .pager-btn{
    font-family:var(--font-mono); font-size:0.85rem; min-width:42px; padding:10px 14px; cursor:pointer;
    background:var(--paper); border:1px solid var(--line); border-radius:10px; color:var(--ink-soft); transition:all .15s ease;
  }
  .pager-btn:hover:not(:disabled){ border-color:var(--orange); color:var(--orange-dark); }
  .pager-btn.active{ background:var(--orange); border-color:var(--orange); color:#fff; font-weight:700; }
  .pager-btn:disabled{ opacity:0.35; cursor:default; }
  .post-card-body{ padding:24px 24px 20px; display:flex; flex-direction:column; gap:10px; flex:1; }
  .post-card .post-tag{ font-family:var(--font-mono); font-size:0.68rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--ink-faint); }
  .post-card h3{ font-size:1.02rem; line-height:1.4; }
  .post-card p{ font-size:0.87rem; color:var(--ink-soft); line-height:1.55; margin:0; flex:1; }
  .post-card .post-meta{ font-family:var(--font-mono); font-size:0.74rem; color:var(--ink-faint); display:flex; gap:10px; padding-top:12px; border-top:1px solid var(--line); }
  .post-card.hidden{ display:none; }
  .bloghub-count{ font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-faint); margin-top:8px; }

  @media (min-width:1440px){
    .blog-hero .container, .bloghub-featured .container, .bloghub-start .container, .bloghub-grid-section .container{ max-width:1480px; }
    .bloghub-grid{ grid-template-columns:repeat(4,1fr); }
    .blog-hero h1{ max-width:20ch; }
    .featured-body{ padding:52px 56px; }
    .final-cta{ max-width:1480px; }
    .site-footer .container{ max-width:1480px; }
  }
  @media (min-width:1850px){
    .blog-hero .container, .bloghub-featured .container, .bloghub-start .container, .bloghub-grid-section .container{ max-width:1720px; }
    .final-cta{ max-width:1720px; }
    .site-footer .container{ max-width:1720px; }
  }
  @media (max-width:900px){
    .featured-card{ grid-template-columns:1fr; }
    .featured-media{ min-height:220px; order:-1; }
    .start-grid, .bloghub-grid{ grid-template-columns:1fr; }
  }
</style>`;

// ---------- schema ----------
const itemList = enriched.map((p, i) => '        { "@type": "ListItem", "position": ' + (i + 1) + ', "url": "https://techauditpros.com' + p.url + '" }').join(',\n');
const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "TechAuditPros Blog — Guides for ERP, Web & AI-Era Search",
  "url": "https://techauditpros.com/blog/",
  "description": "Plain-English guides and playbooks on custom ERP software, website development, and SEO/AEO/GEO — written by the engineers who do the work.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techauditpros.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://techauditpros.com/blog/" }
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
${itemList}
    ]
  }
}
</script>`;

// org schema from index head
const orgSchema = slice(idx, '<script type="application/ld+json">', '</script>', true);
const favicons = slice(idx, '<!-- Favicons -->', '<style>', false);

// ---------- content sections ----------
const featured = enriched[0]; // content audit
const rest = enriched.slice(1);
const featuredHtml = `
<section class="bloghub-featured">
    <div class="container">
        <a class="featured-card" href="${featured.url}">
            <div class="featured-body">
                <div class="featured-kicker">Featured &bull; ${CAT[featured.cat]}</div>
                <h2>${esc(featured.title)}</h2>
                <p>${esc(featured.desc)}</p>
                <div class="featured-meta">${pretty(featured.date)} &nbsp;&bull;&nbsp; ${featured.mins} min read</div>
                <div class="featured-cta">Read the guide &rarr;</div>
            </div>
            <div class="featured-media">
                <img src="/assets/images/library/team-standing-document-review-bright-room.jpg" alt="Team reviewing audit findings together around a table" width="2400" height="1601" loading="eager" />
            </div>
        </a>
    </div>
</section>`;

const startHtml = `
<section class="bloghub-start">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Start Here</p>
            <h2>New to a topic? These three explain everything in plain English.</h2>
        </div>
        <div class="start-grid">
            <a class="start-card" href="/blog/what-is-erp-software-plain-english.html">
                <span class="start-tag">ERP &amp; Software</span>
                <h3>What Is ERP Software? A Plain-English Guide</h3>
                <p>One system for inventory, orders, finance and people &mdash; what ERP replaces, and the honest signs you need one.</p>
                <span class="start-link">Read &rarr; &nbsp;or see our <u>ERP service</u></span>
            </a>
            <a class="start-card" href="/blog/website-design-vs-development.html">
                <span class="start-tag">Web Development</span>
                <h3>Website Design vs. Development: The Difference</h3>
                <p>Two disciplines, priced differently &mdash; and how to buy both without a three-vendor headache.</p>
                <span class="start-link">Read &rarr; &nbsp;or see our <u>web service</u></span>
            </a>
            <a class="start-card" href="/blog/generative-engine-optimization-geo/">
                <span class="start-tag">SEO &amp; AI Search</span>
                <h3>Generative Engine Optimization (GEO), Explained</h3>
                <p>How content gets cited by ChatGPT, Perplexity and AI Overviews &mdash; the search channel growing fastest.</p>
                <span class="start-link">Read &rarr; &nbsp;or see our <u>SEO service</u></span>
            </a>
        </div>
    </div>
</section>`;

const cards = rest.map(p => `            <a class="post-card" data-cat="${p.cat}" href="${p.url}">
                <div class="post-media"><img src="${nextImg(p.cat)}" alt="${esc(p.title).replace(/"/g, '&quot;')}" loading="lazy" /></div>
                <div class="post-card-body">
                    <span class="post-tag">${CAT[p.cat]}</span>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.desc)}</p>
                    <span class="post-meta"><span>${pretty(p.date)}</span><span>&bull;</span><span>${p.mins} min read</span></span>
                </div>
            </a>`).join('\n');

const gridHtml = `
<section class="bloghub-grid-section" id="all-posts">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">All Guides</p>
            <h2>Every playbook, newest first.</h2>
            <p class="bloghub-count" id="postCount">${rest.length + 1} guides</p>
        </div>
        <div class="bloghub-grid" id="postGrid">
${cards}
        </div>
        <nav class="bloghub-pager" id="pager" aria-label="Blog pages"></nav>
    </div>
</section>`;

const heroHtml = `
<section class="tap-new-hero blog-hero">
    <canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>
    <div class="hero-spotlight" aria-hidden="true"></div>
    <div class="container hero-inner">
        <p class="eyebrow">The TechAuditPros Blog</p>
        <h1>Plain-English Guides to ERP, Web &amp; AI-Era Search</h1>
        <p class="lede">Practical playbooks on custom ERP software, high-performance websites, and getting found on Google and cited by AI &mdash; written by the engineers who do the work, not a content mill. No jargon, no fluff, honest trade-offs included.</p>
        <div class="bloghub-pills" id="catPills">
            <button class="bloghub-pill active" data-filter="all">All Topics</button>
            <button class="bloghub-pill" data-filter="seo">SEO &amp; AI Search</button>
            <button class="bloghub-pill" data-filter="erp">ERP &amp; Software</button>
            <button class="bloghub-pill" data-filter="web">Web Development</button>
            <button class="bloghub-pill" data-filter="out">Outsourcing &amp; Agencies</button>
        </div>
        <div class="hero-stats-row">
            <div class="hero-stat"><span class="num">${enriched.length}</span><span class="lbl">In-depth guides</span></div>
            <div class="hero-stat"><span class="num">4</span><span class="lbl">Topic clusters</span></div>
            <div class="hero-stat"><span class="num">0</span><span class="lbl">Fluff articles</span></div>
        </div>
    </div>
    <div class="blog-scroll-cue" aria-hidden="true">&darr;</div>
</section>`;

const ctaHtml = `
<section class="final-cta-section" id="contact">
    <div class="final-cta">
        <h2>Prefer answers about your own site?</h2>
        <div class="final-cta-actions">
            <a href="https://forms.zohopublic.in/infotechau1/form/ContactUs/formperma/dbhRozkUnAh8YL0_CF5nUiAKfUFzPOL3FKmZnW6D0Fg" target="_blank" class="primary-btn-large">Book a Free Strategy Call</a>
            <span class="final-cta-note">Takes 60 seconds &middot; No contracts</span>
        </div>
    </div>
</section>`;

const filterJs = `<script>
(function(){
    var PAGE_SIZE = 12;
    var pills = document.querySelectorAll('.bloghub-pill');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.post-card'));
    var count = document.getElementById('postCount');
    var pager = document.getElementById('pager');
    var gridTop = document.getElementById('all-posts');
    var state = { cat: 'all', page: 1 };

    function apply(scroll){
        var filtered = cards.filter(function(c){
            return state.cat === 'all' || c.getAttribute('data-cat') === state.cat;
        });
        var pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
        if (state.page > pages) state.page = pages;
        var from = (state.page - 1) * PAGE_SIZE, to = from + PAGE_SIZE;
        cards.forEach(function(c){ c.classList.add('hidden'); });
        filtered.slice(from, to).forEach(function(c){ c.classList.remove('hidden'); });
        if (count) count.textContent = filtered.length + ' guide' + (filtered.length === 1 ? '' : 's') + (pages > 1 ? ' \\u00b7 page ' + state.page + ' of ' + pages : '');
        // pager buttons
        if (pager) {
            pager.innerHTML = '';
            if (pages > 1) {
                var mk = function(label, page, opts){
                    var b = document.createElement('button');
                    b.className = 'pager-btn' + (opts && opts.active ? ' active' : '');
                    b.textContent = label;
                    if (opts && opts.disabled) b.disabled = true;
                    else b.addEventListener('click', function(){ state.page = page; apply(true); });
                    pager.appendChild(b);
                };
                mk('\\u2190 Prev', state.page - 1, { disabled: state.page === 1 });
                for (var i = 1; i <= pages; i++) mk(String(i), i, { active: i === state.page });
                mk('Next \\u2192', state.page + 1, { disabled: state.page === pages });
            }
        }
        if (scroll && gridTop) gridTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    pills.forEach(function(pill){
        pill.addEventListener('click', function(){
            pills.forEach(function(p){ p.classList.remove('active'); });
            pill.classList.add('active');
            state.cat = pill.getAttribute('data-filter');
            state.page = 1;
            apply(false);
        });
    });

    // scroll-reveal: classes applied by JS only, so no-JS visitors see everything
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
        var targets = document.querySelectorAll('.post-card, .start-card, .featured-card');
        targets.forEach(function(t){ t.classList.add('reveal'); });
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(e){
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        targets.forEach(function(t){ io.observe(t); });
    }

    apply(false);
})();
</script>`;

const head = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Blog &amp; Guides &mdash; ERP, Web Development &amp; SEO | TechAuditPros</title>
<meta name="description" content="Plain-English guides and playbooks on custom ERP software, website development, and SEO/AEO/GEO -- written by the engineers who do the work. ${enriched.length} guides and growing." />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="TechAuditPros" />
<meta property="og:url" content="https://techauditpros.com/blog/" />
<meta property="og:title" content="Blog &amp; Guides &mdash; ERP, Web Development &amp; SEO | TechAuditPros" />
<meta property="og:description" content="Plain-English guides and playbooks on custom ERP software, website development, and SEO/AEO/GEO -- written by the engineers who do the work." />
<meta property="og:image" content="https://techauditpros.com/assets/images/og-share-cover.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@techauditpros" />
<meta name="twitter:title" content="Blog &amp; Guides &mdash; ERP, Web Development &amp; SEO | TechAuditPros" />
<meta name="twitter:description" content="Plain-English guides and playbooks on custom ERP software, website development, and SEO/AEO/GEO -- written by the engineers who do the work." />
<meta name="twitter:image" content="https://techauditpros.com/assets/images/og-share-cover.jpg" />
<meta content="index, follow" name="robots"/>
<meta content="nKm7MzLndhPXbTGfdIvEyhdbTuWd1fgOMhpKg3GPozM" name="google-site-verification"/>
<link href="https://techauditpros.com/blog/" rel="canonical"/>
${orgSchema}
${schema}
${favicons}${css}
${blogCss}
</head>
<body class="home-page-redesign">

${header}

${drawer}
${heroHtml}
${featuredHtml}
${startHtml}
${gridHtml}
${ctaHtml}

${footer}

${drawerJs}
${waveJs}
${filterJs}
</body>
</html>
`;

fs.writeFileSync(REPO + '/blog/index.html', head);
console.log('new blog hub written: ' + head.split('\n').length + ' lines, ' + enriched.length + ' posts listed');
