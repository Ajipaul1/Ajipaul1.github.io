// Wide-desktop layout for the 4 modern posts: content column + sticky "On this page" TOC.
'use strict';
const fs = require('fs');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';
const files = [
    'blog/what-is-a-content-audit.html',
    'blog/website-design-vs-development.html',
    'blog/what-is-erp-software-plain-english.html',
    'blog/full-service-vs-diy-erp-agency-canada.html',
];

const wideCss = `
  /* wide-desktop article layout: text column + sticky TOC using the free space */
  .article-toc{ display:none; }
  @media (min-width:1280px){
    .article-hero .container{ max-width:1200px; }
    .article-body .container{ max-width:1200px; display:grid; grid-template-columns:minmax(0,780px) 300px; gap:72px; align-items:start; }
    .article-content{ min-width:0; }
    .article-toc{
      display:block; position:sticky; top:130px;
      background:var(--paper-alt); border:1px solid var(--line); border-radius:14px; padding:22px 24px;
    }
    .article-toc h4{ font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-faint); margin:0 0 12px; }
    .article-toc a{ display:block; font-size:0.87rem; color:var(--ink-soft); text-decoration:none; padding:6px 0 6px 12px; line-height:1.4; border-left:2px solid var(--line); }
    .article-toc a:hover{ color:var(--orange-dark); }
    .article-toc a.active{ color:var(--orange-dark); border-left-color:var(--orange); font-weight:600; }
    .article-toc .toc-cta{ margin-top:16px; padding:12px 0 0; border-top:1px solid var(--line); }
    .article-toc .toc-cta a{ border-left:none; padding-left:0; font-weight:700; color:var(--orange-dark); }
  }
  @media (min-width:1700px){
    .article-hero .container, .article-body .container{ max-width:1360px; }
    .article-body .container{ grid-template-columns:minmax(0,860px) 320px; gap:96px; }
  }`;

const tocJs = `<script>
(function(){
    var content = document.querySelector('.article-content');
    var nav = document.getElementById('tocLinks');
    if (!content || !nav) return;
    var hs = content.querySelectorAll('h2');
    if (hs.length < 3) return;
    var links = [];
    hs.forEach(function(h, i){
        if (!h.id) h.id = 'sec-' + (i + 1);
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        nav.appendChild(a);
        links.push(a);
    });
    if ('IntersectionObserver' in window) {
        var current = null;
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(e){
                if (e.isIntersecting) {
                    if (current) current.classList.remove('active');
                    var i = Array.prototype.indexOf.call(hs, e.target);
                    current = links[i];
                    if (current) current.classList.add('active');
                }
            });
        }, { rootMargin: '-15% 0px -70% 0px' });
        hs.forEach(function(h){ io.observe(h); });
    }
})();
</script>`;

const asideHtml = `        </div>
        <aside class="article-toc" aria-label="On this page">
            <h4>On this page</h4>
            <nav id="tocLinks"></nav>
            <div class="toc-cta"><a href="https://forms.zohopublic.in/infotechau1/form/ContactUs/formperma/dbhRozkUnAh8YL0_CF5nUiAKfUFzPOL3FKmZnW6D0Fg" target="_blank">Book a Free Strategy Call &rarr;</a></div>
        </aside>
    </div>
</section>`;

for (const f of files) {
    const path = REPO + '/' + f;
    let s = fs.readFileSync(path, 'utf8');
    if (s.includes('article-toc')) { console.log(f + ': already widened, skipping'); continue; }

    // 1. CSS
    const cssAnchor = '.article-takeaways li strong, .article-takeaways li em{ color:#fff; }';
    if (!s.includes(cssAnchor)) { console.error(f + ': css anchor missing'); process.exit(1); }
    s = s.replace(cssAnchor, cssAnchor + wideCss);

    // 2. open content wrapper right after the article-body container opens
    const bodyMark = '<section class="article-body">\n    <div class="container">';
    if (!s.includes(bodyMark)) { console.error(f + ': body mark missing'); process.exit(1); }
    s = s.replace(bodyMark, bodyMark + '\n        <div class="article-content">');

    // 3. close wrapper + insert aside before the article-body section closes (right after author-row)
    const authorIdx = s.indexOf('<div class="article-author-row">');
    if (authorIdx === -1) { console.error(f + ': author row missing'); process.exit(1); }
    const closeSeq = '    </div>\n</section>';
    const closeIdx = s.indexOf(closeSeq, authorIdx);
    if (closeIdx === -1) { console.error(f + ': close sequence missing'); process.exit(1); }
    s = s.slice(0, closeIdx) + asideHtml.replace('        </div>\n', '        </div>\n') + s.slice(closeIdx + closeSeq.length);

    // 4. TOC script before </body>
    s = s.replace('</body>', tocJs + '\n</body>');

    fs.writeFileSync(path, s);
    console.log(f + ': wide layout + sticky TOC added');
}
