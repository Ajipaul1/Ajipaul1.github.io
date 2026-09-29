'use strict';
const L = require('./lib.js');
const URL = 'https://techauditpros.com/us/';
let s = L.read('ca/index.html');

s = L.replaceAll(s, 'href="/ca/erp/"', 'href="/us/erp/"');
s = L.replaceAll(s, 'href="/ca/website-development/"', 'href="/us/website-development/"');
s = L.replaceAll(s, 'href="/ca/seo-services/"', 'href="/us/seo-services/"');
s = L.addUsToNavAndFooter(s);
s = L.usFooterCities(s);

// 2026-09-29: all /us/ copy lives in us_hub_copy.js (US-only content, sourced figures), shared with the live-page patch
const C = require('./us_hub_copy.js');
s = L.setHead(s, {
  title: C.head.title,
  desc: C.head.desc,
  url: URL,
  hreflang: [{ lang: 'en-us', href: URL }, { lang: 'en-ca', href: 'https://techauditpros.com/ca/' }, { lang: 'x-default', href: 'https://techauditpros.com/' }],
});

const faqs = C.faqs;

s = L.setPageSchemas(s, [
  L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['United States', URL]]),
  L.faqSchema(faqs),
]);

s = L.setSideText(s, 'to America.', 'US');

// hero (keeps the rotating ids)
const hero = C.heroInner + `
        </div>
    </div>
    </div>
</section>

`;
s = L.replaceBetween(s, '<div class="hero-main-content">', '<section class="tap-answer-section">', hero, { keepStart: true, keepEnd: true });

// rotating phrases
const rot = (list, tail) => () => `rotateText('${tail[0]}', [\n${list.map(x => `        '${x}'`).join(',\n')}\n    ], ${tail[1]});`;
s = s.replace(/rotateText\('heroRotate', \[[\s\S]*?\], 2600, 0\);/, rot(C.rotateH1, ['heroRotate', '2600, 0']));
s = s.replace(/rotateText\('heroEyebrowRotate', \[[\s\S]*?\], 3200, 1200\);/, rot(C.rotateEyebrow, ['heroEyebrowRotate', '3200, 1200']));
L.must(s, C.rotateH1[2], 1);

let body = C.body;

s = L.setBody(s, body);
s = L.setFinalCta(s, 'Let’s Talk.', 'Takes 60 seconds &middot; USD pricing &middot; No long-term contract');

// FAQ CSS is not part of the hub template — bring it in
const faqCss = s.includes('.faq-trigger{') ? '' : `
  .tap-faq-section{ padding:88px 0; background:var(--paper); }
  .faq-accordion{ max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
  .faq-item{ background:var(--paper-alt); border:1px solid var(--line); border-radius:12px; overflow:hidden; }
  .faq-item.active{ background:var(--paper); border-color:var(--orange); }
  .faq-trigger{ width:100%; padding:20px 24px; background:none; border:none; text-align:left; color:var(--ink); font-family:var(--font-sans); font-size:1rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:15px; }
  .faq-icon{ font-family:var(--font-mono); font-size:1.1rem; color:var(--orange); flex-shrink:0; }
  .faq-content{ max-height:0; overflow:hidden; transition:max-height .3s ease-out; }
  .faq-content p{ padding:0 24px 22px; margin:0; color:var(--ink-soft); font-size:0.92rem; line-height:1.6; }`;
s = L.injectExtras(s, faqCss + C.css);

L.must(s, 'https://techauditpros.com/ca/', 1); // hreflang alternate (the markets row uses root-relative links)
L.must(s, 'id="us-rules"', 1); L.must(s, 'id="us-search"', 1);
L.write('us/index.html', s);
