'use strict';
// Blog hub organization for a growing library (60+ posts): newest-first ordering, per-post lead
// images on cards, a second filter level (sub-topics read from each post's eyebrow), search,
// live counts, and the "What is SEO" pillar featured. All inside scripts/build_bloghub.js.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const rel = 'scripts/build_bloghub.js';
let s = L.read(rel);
if (s.includes('data-sub=')) { console.log('hub generator already organized'); process.exit(0); }
function rep(from, to) { if (!s.includes(from)) throw new Error('anchor not found: ' + from.slice(0, 80)); s = s.replace(from, to); }

// 1. enrich: sub-topic (eyebrow), lead image, then newest-first sort
rep(`    const mins = Math.max(2, Math.round(words / 230));
    return { url, cat, date, title, desc, mins };
});`,
`    const mins = Math.max(2, Math.round(words / 230));
    // sub-topic = the post's eyebrow label (modern posts); falls back to the category name
    const heroBlock = (s.match(/<section class="article-hero">[\\s\\S]*?<\\/section>/) || [''])[0];
    const sub = ((heroBlock.match(/<p class="eyebrow">([^<]*)<\\/p>/) || [])[1] || CAT[cat]).replace(/&amp;/g, '&').replace(/\\s+/g, ' ').trim();
    // lead image = the post's first article figure (modern posts); falls back to the category pool
    const lead = (s.match(/<figure class="article-figure"><img src="\\/assets\\/images\\/library\\/([^"]+)"/) || [])[1] || null;
    return { url, cat, date, title, desc, mins, sub, lead };
});
enriched.sort((a, b) => b.date.localeCompare(a.date)); // newest first; stable for same-day posts
const subCounts = {}; for (const p of enriched) subCounts[p.sub] = (subCounts[p.sub] || 0) + 1;`);

// 2. featured = the biggest-demand pillar, with its own lead image
rep(`const featured = enriched[0]; // content audit
const rest = enriched.slice(1);`,
`const FEATURED_URL = '/blog/what-is-seo.html'; // highest-demand cluster in the US research (40,500/mo)
const featured = enriched.find(p => p.url === FEATURED_URL) || enriched[0];
const rest = enriched.filter(p => p !== featured);
const featuredImg = featured.lead ? '/assets/images/library/' + featured.lead : '/assets/images/library/team-standing-document-review-bright-room.jpg';`);
rep(`                <img src="/assets/images/library/team-standing-document-review-bright-room.jpg" alt="Team reviewing audit findings together around a table" width="2400" height="1601" loading="eager" />`,
`                <img src="\${featuredImg}" alt="\${esc(featured.title).replace(/"/g, '&quot;')}" loading="eager" />`);

// 3. cards: own lead image, sub-topic tag, data attributes for filtering/search
rep(`const cards = rest.map(p => \`            <a class="post-card" data-cat="\${p.cat}" href="\${p.url}">
                <div class="post-media"><img src="\${nextImg(p.cat)}" alt="\${esc(p.title).replace(/"/g, '&quot;')}" loading="lazy" /></div>
                <div class="post-card-body">
                    <span class="post-tag">\${CAT[p.cat]}</span>`,
`const cards = rest.map(p => \`            <a class="post-card" data-cat="\${p.cat}" data-sub="\${esc(p.sub).replace(/"/g, '&quot;')}" data-date="\${p.date}" href="\${p.url}">
                <div class="post-media"><img src="\${p.lead ? '/assets/images/library/' + p.lead : nextImg(p.cat)}" alt="\${esc(p.title).replace(/"/g, '&quot;')}" loading="lazy" /></div>
                <div class="post-card-body">
                    <span class="post-tag">\${esc(p.sub)}</span>`);

// 4. grid section: toolbar with search + sub-topic chips
rep(`            <h2>Every playbook, newest first.</h2>
            <p class="bloghub-count" id="postCount">\${rest.length + 1} guides</p>
        </div>`,
`            <h2>Every playbook, newest first.</h2>
            <p class="bloghub-count" id="postCount">\${rest.length + 1} guides</p>
        </div>
        <div class="bloghub-toolbar">
            <label class="bloghub-search" for="postSearch"><span aria-hidden="true">&#x1F50D;</span><input type="search" id="postSearch" placeholder="Search \${rest.length + 1} guides&hellip;" autocomplete="off" /></label>
            <div class="bloghub-subchips" id="subChips" aria-label="Filter by topic"></div>
        </div>`);

// 5. hero stat: topics count from sub-topics
rep(`            <div class="hero-stat"><span class="num">4</span><span class="lbl">Topic clusters</span></div>`,
`            <div class="hero-stat"><span class="num">\${Object.keys(subCounts).length}</span><span class="lbl">Topics</span></div>`);

// 6. CSS for the toolbar
rep(`  .bloghub-count{ font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-faint); margin-top:8px; }`,
`  .bloghub-count{ font-family:var(--font-mono); font-size:0.78rem; color:var(--ink-faint); margin-top:8px; }
  .bloghub-toolbar{ display:flex; flex-wrap:wrap; gap:14px 18px; align-items:center; margin-top:8px; }
  .bloghub-search{ display:flex; align-items:center; gap:8px; background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:9px 14px; min-width:260px; flex:0 1 320px; }
  .bloghub-search:focus-within{ border-color:var(--orange); box-shadow:0 0 0 3px var(--orange-tint); }
  .bloghub-search input{ border:none; outline:none; background:transparent; font-family:var(--font-sans); font-size:0.92rem; color:var(--ink); width:100%; }
  .bloghub-subchips{ display:flex; flex-wrap:wrap; gap:8px; flex:1 1 420px; }
  .sub-chip{ font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.03em; cursor:pointer; padding:7px 12px; border-radius:999px; border:1px solid var(--line); background:var(--paper); color:var(--ink-soft); transition:all .15s ease; }
  .sub-chip .n{ color:var(--ink-faint); margin-left:6px; }
  .sub-chip:hover{ border-color:var(--orange); color:var(--orange-dark); }
  .sub-chip.active{ background:var(--navy-deep); border-color:var(--navy-deep); color:#fff; }
  .sub-chip.active .n{ color:rgba(255,255,255,0.6); }
  .bloghub-empty{ font-size:0.95rem; color:var(--ink-soft); padding:32px 0; }`);

// 7. filter JS: state gains sub + query; chips rendered per category; search wired
rep(`    var state = { cat: 'all', page: 1 };

    function apply(scroll){
        var filtered = cards.filter(function(c){
            return state.cat === 'all' || c.getAttribute('data-cat') === state.cat;
        });`,
`    var state = { cat: 'all', sub: 'all', q: '', page: 1 };
    var search = document.getElementById('postSearch');
    var chips = document.getElementById('subChips');
    var textOf = {};
    cards.forEach(function(c){ textOf[c.href] = (c.textContent || '').toLowerCase(); });

    function renderChips(){
        if (!chips) return;
        var inCat = cards.filter(function(c){ return state.cat === 'all' || c.getAttribute('data-cat') === state.cat; });
        var counts = {}; inCat.forEach(function(c){ var k = c.getAttribute('data-sub'); counts[k] = (counts[k] || 0) + 1; });
        var subs = Object.keys(counts).sort(function(a, b){ return counts[b] - counts[a] || a.localeCompare(b); });
        chips.innerHTML = '';
        if (subs.length < 2) return;
        var mk = function(label, key, n){
            var b = document.createElement('button');
            b.className = 'sub-chip' + (state.sub === key ? ' active' : '');
            b.innerHTML = label + (n ? '<span class="n">' + n + '</span>' : '');
            b.addEventListener('click', function(){ state.sub = key; state.page = 1; apply(false); });
            chips.appendChild(b);
        };
        mk('All topics', 'all', inCat.length);
        subs.forEach(function(k){ mk(k, k, counts[k]); });
    }

    function apply(scroll){
        var q = state.q.trim().toLowerCase();
        var filtered = cards.filter(function(c){
            if (state.cat !== 'all' && c.getAttribute('data-cat') !== state.cat) return false;
            if (state.sub !== 'all' && c.getAttribute('data-sub') !== state.sub) return false;
            if (q && textOf[c.href].indexOf(q) === -1) return false;
            return true;
        });
        renderChips();
        var empty = document.getElementById('postEmpty');
        if (!empty && gridTop) { empty = document.createElement('p'); empty.id = 'postEmpty'; empty.className = 'bloghub-empty'; empty.hidden = true; empty.textContent = 'No guides match that search yet. Try a broader term, or ask us on a strategy call.'; pager.parentNode.insertBefore(empty, pager); }
        if (empty) empty.hidden = filtered.length !== 0;`);

rep(`            state.cat = pill.getAttribute('data-filter');
            state.page = 1;
            apply(false);
        });
    });`,
`            state.cat = pill.getAttribute('data-filter');
            state.sub = 'all';
            state.page = 1;
            apply(true);
        });
    });
    if (search) {
        var t;
        search.addEventListener('input', function(){ clearTimeout(t); t = setTimeout(function(){ state.q = search.value; state.page = 1; apply(false); }, 120); });
    }`);

// 8. schema: numberOfItems
rep(`  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [`,
`  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": \${enriched.length},
    "itemListElement": [`);

fs.writeFileSync(path.join(L.REPO, rel), s);
console.log('hub generator organized:', rel);
