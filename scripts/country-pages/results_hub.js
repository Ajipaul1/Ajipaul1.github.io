'use strict';
// /results/ — the Results hub: everything the company can show, told in pictures first.
//
// SKELETON: ca/erp/index.html (head, nav, footer, closing CTA, FAQ styles); template hero and tools
// marquee removed; everything between header and closing CTA replaced. results_nav.apply() repoints the
// nav "Results" item at this page (idempotent). Run AFTER results_erp.js — the photo-exclusivity check
// reads that generator's photo list.
//
// WHAT RANKS (live Google, 2026-09-06, "results" / "case studies" pages of agencies in CA, UK, UAE):
//   card grids with a logo and one percentage, anonymised, 300–1,200 words, no FAQ, no live system to
//   open, no artefacts. WHAT THIS PAGE DOES ABOUT IT: a named live system you can open now · the search
//   figures the site already publishes, with what was done and how long it took · what a client sees
//   every month · verifiable credentials (real certificates) · where the work went · 8 FAQs.
// RULES: only figures already published by the owner (homepage) or read from the ERP repository; clients
//   of the search engagements stay anonymised as on the homepage; no price of ours; no photo shared with
//   any other page (asserted against results_erp.js); reveal start states only under html.rs-on.
//
// SIGNATURE — "the letterbox": every act's photo plate opens from a thin horizontal slit to full height,
//   the way a cinema screen opens, and a film-sprocket rail on the left lights act by act on desktop.
// PER-SECTION MOTION: hero = letterbox + rising lines · flagship = plate opens, frame slides up · search =
//   diptychs part (left half from left, right from right), numbers count up · month = rail frames rise in
//   sequence · verify = certificates stamp in · map = country tiles flip (rotateY) · band = movement drift.
const fs = require('fs'); const path = require('path');
const L = require('./lib');
const NAV = require('./results_nav');
const ERP = require('./results_erp');   // for PHOTOS (exclusivity) — the require also rebuilds that page, which is the intended run order

const URL = 'https://techauditpros.com/results/';
const ERP_URL = 'https://techauditpros.com/results/viraat-marine-erp/';
const LIVE = 'https://erp.viraatmarine.com/';
const SIZES = JSON.parse(fs.readFileSync(path.join(L.REPO, 'assets/images/library/_sizes.json'), 'utf8'));

function img(slug, alt, sizes, cls, extra) {
  const base = SIZES[slug + '.jpg']; if (!base) throw new Error('no dimensions for ' + slug);
  const tiers = [[700, slug + '-700.jpg'], [1400, slug + '-1400.jpg'], [base.w, slug + '.jpg']].filter(([, f]) => SIZES[f]);
  const seen = new Set(); const srcset = tiers.filter(([w]) => !seen.has(w) && seen.add(w)).map(([w, f]) => '/assets/images/library/' + f + ' ' + w + 'w').join(', ');
  return `<img class="${cls || 'rs-img'}" src="/assets/images/library/${slug}.jpg" srcset="${srcset}" sizes="${sizes}" alt="${alt}" width="${base.w}" height="${base.h}" ${extra || 'loading="lazy" decoding="async"'} />`;
}
const P = {   // chosen on the contact sheet 2026-09-06: crane-silhouette is portrait (rejected for the hero), parcels-in-van shows retailer logos, washer-dryer-pair is a bare bathroom
  hero: 'res-tug-beside-cargo-ship',
  erp: 'res-cargo-ship-and-crane',
  ca1: 'res-front-load-washer', ca2: 'res-toronto-autumn-street',
  us1: 'res-technician-on-roof', us2: 'res-two-on-a-rooftop',
  au1: 'res-parcels-on-rack', au2: 'res-warehouse-boxes',
  m1: 'res-analytics-laptop', m2: 'res-laptop-code-mug', m3: 'res-laptop-dim-light',
  band: 'res-toronto-aerial-autumn',
};
for (const slug of Object.values(P)) if (ERP.PHOTOS.includes(slug)) throw new Error('photo shared with the ERP page: ' + slug);
const SIGNIN = 'vm-shot-signin';   // the public sign-in page — the only screen shared with the case study, by design (it is public)
const CERTS = [
  { f: 'google-analytics-ga4-aji-paul.png', w: 400, h: 400, name: 'Google Analytics (GA4)', by: 'Google' },
  { f: 'google-ads-search-aji-paul.png', w: 400, h: 400, name: 'Google Ads Search', by: 'Google' },
  { f: 'semrush-aji-paul.png', w: 211, h: 187, name: 'Semrush SEO Toolkit', by: 'Semrush Academy' },
  { f: 'digital-marketing-aji-paul.png', w: 315, h: 339, name: 'Digital Marketing', by: 'Certified course' },
];

// the search engagements the homepage publishes (owner's figures, kept anonymised as there)
const CASES = [
  { flag: '🇨🇦', where: 'Canada', who: 'Appliance repair &amp; retail', h: 'From page three to the phone ringing.', num: 205, pre: '+', suf: '%', numLabel: 'organic traffic in 8 months',
    rows: [['Keywords ranking', '+460'], ['Timeframe', '8 months'], ['Work', 'Technical fixes, service &amp; suburb pages, reviews']],
    did: ['Rebuilt service pages around how Ontario households actually search: brand + fault + suburb.', 'Fixed crawl paths, speed and structured data so the pages could be found before they could rank.', 'Monthly written report against the plan; Search Console shared from week one.'],
    imgs: [[P.ca1, 'A row of front-loading washing machines'], [P.ca2, 'A tree-lined residential street in autumn']] },
  { flag: '🇺🇸', where: 'United States', who: 'HVAC contractor', h: 'The season you must be found in.', num: 180, pre: '+', suf: '%', numLabel: 'organic traffic in 6 months',
    rows: [['Keywords ranking', '+320'], ['Timeframe', '6 months'], ['Work', 'Local SEO, service pages, review programme']],
    did: ['Local pack first: the profile, categories and reviews that decide who gets the emergency call.', 'Service and repair pages written for the two seasons the phone rings, not for a keyword list.', 'A page speed pass so mobile searchers on a hot day did not bounce.'],
    imgs: [[P.us1, 'A technician in a hard hat walking across a rooftop of air-conditioning units'], [P.us2, 'Two technicians working on rooftop air-conditioning units']] },
  { flag: '🇦🇺', where: 'Australia', who: 'E-commerce store', h: 'Categories that sell, not just products that exist.', num: 165, pre: '+', suf: '%', numLabel: 'organic traffic in 7 months',
    rows: [['Top-3 keywords', '+380'], ['Timeframe', '7 months'], ['Work', 'Category architecture, product schema, speed']],
    did: ['Category architecture rebuilt so the money pages carried the demand, with faceted URL bloat closed off.', 'Product schema and image work so listings showed price, stock and reviews in the results.', 'Core Web Vitals to green on the templates that mattered.'],
    imgs: [[P.au1, 'A stack of cardboard shipping boxes inside a delivery van'], [P.au2, 'A large warehouse filled with boxes']] },
];

const MONTH = [
  ['A staging URL, every week', 'You can open a copy of the work in progress any week and see what changed. No slide decks about work; the work.'],
  ['A written report, every month', 'Plain English, against the ninety-day plan, with the numbers a business cares about and the ones we care about kept apart.'],
  ['Your accounts, not ours', 'Search Console, Analytics, hosting, repository. Opened in your name from day one, shared with us, never the other way round.'],
  ['Everything handed over', 'Code, content, credentials, the report history. If you stop, nothing of yours leaves with us.'],
];

const MARKETS = [
  ['🇨🇦', 'Canada', '/ca/', 'Our best-converting market. Toronto and every province, remotely.'],
  ['🇺🇸', 'United States', '/us/', 'ERP, web and search for US owners who want one accountable team.'],
  ['🇬🇧', 'United Kingdom', '/uk/', 'London, Manchester, Reading and Scotland pages, UK spelling and compliance.'],
  ['🇮🇳', 'India', '/in/', 'Home. Kochi first, then Kerala, Mumbai, Kolkata and beyond.'],
  ['🇦🇪', 'United Arab Emirates', '/blog/offshore-developer-center-dubai.html', 'Dubai and the free zones, the same time zone plus ninety minutes.'],
  ['🇦🇺', 'Australia', '/blog/outsource-seo-services-au-tips.html', 'Kochi is four and a half to five and a half hours behind AEST: a real working overlap.'],
];

const FAQS = [
  { q: 'Are these results real?', a: `Yes. The shipyard ERP is a live system with a public sign-in page at <a href="${LIVE}" target="_blank" rel="noopener">erp.viraatmarine.com</a>, and every figure about it is read from its repository. The search figures are the ones we publish on our homepage, taken from each client&rsquo;s Search Console; the clients are not named here at their request, and the underlying reports are shown on a call.` },
  { q: 'Why are the search clients not named?', a: 'Because they asked us not to. An appliance repair company and an HVAC contractor compete locally, and publishing what worked for them is publishing a playbook for their competitors. We name clients when they say yes, as Viraat Marine did, and otherwise show the numbers with the industry and the country.' },
  { q: 'Can I see the shipyard ERP live?', a: 'The sign-in page is public; the desks behind it hold the yard&rsquo;s own data and are not. On a call we share a screen and walk through the real system with the client&rsquo;s permission, then talk about which parts match your business.' },
  { q: 'What do I get every month if I work with you?', a: 'A staging URL you can open any week, a written report every month against a ninety-day plan, your own accounts opened in your name, and everything handed over if you stop. One agreed monthly fee, no long-term contract.' },
  { q: 'Do you only work with shipyards and repair companies?', a: 'No. The pattern travels: any business with a workflow that crosses departments needs the same kind of system, and any business that gets found online needs the same kind of search work. Manufacturing, trade contractors, e-commerce, clinics and agencies are what we see most.' },
  { q: 'Where is the team?', a: 'Kochi, Kerala, India, at Infopark Phase 1. Clients in Canada, the United States, the United Kingdom, India, Australia and the UAE, worked with remotely, with a real overlap of working hours in every one of those time zones.' },
  { q: 'Do you sign NDAs?', a: 'Yes, before we see anything. It is also why some of the most interesting work we have done is not on this page.' },
  { q: 'How do I start?', a: 'Book a free strategy call. We look at one real page or one real workflow with you, tell you where the leverage is, and send a written plan for the first ninety days. The findings are yours whether or not we ever speak again.' },
];

// ---------------------------------------------------------------------------------------------
const head = (n, label, h2, lede, dark) => `
    <div class="rs-head${dark ? ' dark' : ''}">
      <span class="rs-slate"><i>${n}</i>${label}</span>
      <h2>${h2}</h2>
      ${lede ? `<p class="rs-lede">${lede}</p>` : ''}
    </div>`;
const NUM = c => `<b class="rs-num"><span>${c.pre}</span><span class="rs-count" data-to="${c.num}">${c.num}</span><span>${c.suf}</span></b>`;

const RAIL = `<ol class="rs-rail" aria-hidden="true">${['01', '02', '03', '04', '05'].map(n => `<li data-for="${n}">${n}</li>`).join('')}</ol>`;

const HERO = `
<section class="rs rs-hero" id="rs-hero" data-act="00" aria-label="Results and case studies">
  <div class="rs-plate rs-box">${img(P.hero, 'Tugs alongside a container ship under red harbour cranes', '100vw', 'rs-hero-img', 'loading="eager" fetchpriority="high" decoding="async"')}</div>
  <div class="rs-hero-shade" aria-hidden="true"></div>
  <div class="wrap rs-hero-body">
    <p class="rs-eyebrow rs-rise" style="--d:.1s">Results &amp; case studies</p>
    <h1 class="rs-rise" style="--d:.25s">The work, not the pitch. <span>A shipyard ERP you can open right now, and search engagements with the numbers attached.</span></h1>
    <p class="rs-sub rs-rise" style="--d:.4s">Everything on this page is something we actually shipped. One system for a Kerala shipyard, live since summer 2026. Three search engagements on three continents, reported the way we report to clients: the figure, the timeframe, what was done.</p>
    <div class="rs-hero-actions rs-rise" style="--d:.55s">
      <a class="rs-btn" href="${ERP_URL}">See the shipyard ERP</a>
      <a class="rs-btn ghost" href="${L.FORM}" target="_blank">Book a Free Strategy Call</a>
    </div>
    <ul class="rs-facts rs-rise" style="--d:.7s" aria-label="Company figures">
      <li><b>250+</b><span>projects delivered</span></li><li><b>128+</b><span>active clients</span></li><li><b>16</b><span>countries served</span></li><li><b>97%</b><span>client retention</span></li><li><b>4.9/5</b><span>client rating</span></li>
    </ul>
  </div>
</section>
`;

const ANSWER = `
<section class="rs rs-answer" id="rs-answer" data-act="00">
  <div class="wrap">
    <p><strong>TechAuditPros results:</strong> a custom ERP for Viraat Marine Shipyard in Kerala, built in 45 days and live at erp.viraatmarine.com, with 19 role desks, 38 database tables and a phone layout for the slipway; and search engagements that grew organic traffic by 205% for a Canadian appliance company in 8 months, 180% for a US HVAC contractor in 6 months and 165% for an Australian e-commerce store in 7 months. Across 250+ projects in 16 countries the team keeps 97% of its clients. Clients of the search work are anonymised at their request; the ERP is named with the client&rsquo;s permission.</p>
  </div>
</section>
`;

const FLAGSHIP = `
<section class="rs dark rs-flag" id="rs-flag" data-act="01">
  <div class="wrap rs-two">
    <div class="rs-flag-media">
      <figure class="rs-plate rs-box rs-flag-photo">${img(P.erp, 'A container ship under blue harbour cranes', '(max-width:900px) 100vw, 720px')}</figure>
      <figure class="rs-frame rs-flag-frame"><div class="rs-frame-bar"><span></span><span></span><span></span><em>erp.viraatmarine.com</em></div>${img(SIGNIN, 'The public sign-in page of the Viraat Marine ERP: Marine ERP Command Centre', '(max-width:900px) 92vw, 620px', 'rs-shot')}</figure>
    </div>
    <div>
      ${head('01', 'Flagship &middot; Custom ERP', 'A shipyard that runs on one system we built.', null, true)}
      <p>Viraat Marine Shipyard builds and repairs vessels in Kerala. Between 20 July and 2 September 2026 we built them an ERP that runs the yard from the first enquiry to vessel delivery: design and drawing approvals, production logs from the slipway, a five-step purchase chain, accounts, attendance and a live activity stream every desk writes to. It is live today, on desks in the office and on phones at the water&rsquo;s edge.</p>
      <ul class="rs-facts small" aria-label="Scale of the ERP">
        <li><b>19</b><span>role desks</span></li><li><b>38</b><span>database tables</span></li><li><b>80</b><span>isolated modules</span></li><li><b>45</b><span>days to handover</span></li>
      </ul>
      <p class="rs-cta-row"><a class="rs-btn" href="${ERP_URL}">Read the case study &rarr;</a> <a class="rs-btn ghost" href="${LIVE}" target="_blank" rel="noopener">Open the live sign-in page &nearr;</a></p>
    </div>
  </div>
</section>
`;

const SEARCH = `
<section class="rs rs-search" id="rs-search" data-act="02">
  <div class="wrap">
    ${head('02', 'Search &middot; three continents', 'Three businesses that are found now.', 'The figures we publish on our homepage, with what was actually done. Organic traffic from each client&rsquo;s Search Console; clients anonymised at their request, shown on a call.')}
    <div class="rs-cases">
      ${CASES.map((c, i) => `<article class="rs-case" style="--d:${i * 0.15}s">
        <div class="rs-dip"><figure class="l">${img(c.imgs[0][0], c.imgs[0][1], '(max-width:900px) 50vw, 420px')}</figure><figure class="r">${img(c.imgs[1][0], c.imgs[1][1], '(max-width:900px) 50vw, 420px')}</figure></div>
        <div class="rs-case-body">
          <p class="rs-tag">${c.flag} ${c.where} &middot; ${c.who}</p>
          <h3>${c.h}</h3>
          <div class="rs-big">${NUM(c)}<span>${c.numLabel}</span></div>
          <dl>${c.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
          <ul>${c.did.map(t => `<li>${t}</li>`).join('')}</ul>
          <a class="rs-link" href="${L.FORM}" target="_blank">Ask about this engagement &rarr;</a>
        </div>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>
`;

const MONTHLY = `
<section class="rs alt rs-month" id="rs-month" data-act="03">
  <div class="wrap">
    ${head('03', 'What a month looks like', 'How a client sees the work while it is happening.', 'Results are only worth publishing if the client could see them coming. This is what every engagement looks like from the other side of the screen.')}
    <div class="rs-month-grid">
      <div class="rs-strip">
        <figure style="--d:0s">${img(P.m1, 'Graphs of performance analytics on a laptop screen', '(max-width:900px) 92vw, 460px')}</figure>
        <figure style="--d:.15s">${img(P.m2, 'A laptop showing code beside a hot cup of coffee', '(max-width:900px) 92vw, 460px')}</figure>
        <figure style="--d:.3s">${img(P.m3, 'A laptop switched on in dim light', '(max-width:900px) 92vw, 460px')}</figure>
      </div>
      <ol class="rs-month-list">
        ${MONTH.map(([h, p], i) => `<li style="--d:${i * 0.12}s"><b>${String(i + 1).padStart(2, '0')}</b><div><h3>${h}</h3><p>${p}</p></div></li>`).join('\n        ')}
      </ol>
    </div>
  </div>
</section>
`;

const VERIFY = `
<section class="rs dark rs-verify" id="rs-verify" data-act="04">
  <div class="wrap rs-two">
    <div>
      ${head('04', 'Verify us', 'Things you can check without taking our word for it.', null, true)}
      <ul class="rs-checks">
        <li><b>A live system.</b> The shipyard ERP&rsquo;s sign-in page is public at <a href="${LIVE}" target="_blank" rel="noopener">erp.viraatmarine.com</a>. Open it. It is the same system the yard signs into every morning.</li>
        <li><b>Real certificates.</b> The founder&rsquo;s Google Analytics, Google Ads, Semrush and digital marketing certificates are shown here as issued, not as badges we drew ourselves.</li>
        <li><b>A public footprint.</b> <a href="https://linkedin.com/in/ajipaul-officia/" target="_blank" rel="noopener">LinkedIn</a>, <a href="https://github.com/Ajipaul1" target="_blank" rel="noopener">GitHub</a>, and a registered office at Infopark Phase 1, Kochi.</li>
        <li><b>The rest, on a call.</b> Search Console for the engagements above, the ERP behind its sign-in, and references from clients who have agreed to be asked.</li>
      </ul>
    </div>
    <div class="rs-certs" aria-label="Certificates">
      ${CERTS.map((c, i) => `<figure class="rs-cert" style="--d:${i * 0.12}s"><img src="/assets/images/certificates/${c.f}" alt="${c.name} certificate issued to Aji Paul" width="${c.w}" height="${c.h}" loading="lazy" decoding="async" /><figcaption><b>${c.name}</b><span>${c.by}</span></figcaption></figure>`).join('\n      ')}
    </div>
  </div>
</section>
`;

const MAP = `
<section class="rs rs-map" id="rs-map" data-act="05">
  <div class="wrap">
    ${head('05', 'Where the work went', 'Sixteen countries, six with pages of their own.', 'The same team, the same monthly rhythm, in every one of these time zones.')}
    <div class="rs-tiles">
      ${MARKETS.map(([f, n, h, p], i) => `<a class="rs-tile" href="${h}" style="--d:${i * 0.1}s"><span class="rs-tile-flag">${f}</span><h3>${n}</h3><p>${p}</p></a>`).join('\n      ')}
    </div>
  </div>
  <div class="rs-band rs-drift">${img(P.band, 'Aerial view of a city skyline behind autumn trees', '100vw', 'rs-band-img')}<p>Built in Kochi. Read in Toronto, Houston, Manchester, Dubai and Sydney.</p></div>
</section>
`;

const CSS = `
  /* ================= /results/ ================= */
  .rs{ position:relative; padding:clamp(60px,7vw,110px) 0; overflow-x:clip; background:var(--paper); color:var(--ink); }
  .rs .wrap{ width:min(1480px,92%); margin:0 auto; }
  .rs.dark{ background:var(--navy-deep); color:#fff; }
  .rs.alt{ background:var(--paper-alt); }
  .rs h2{ font-size:clamp(1.9rem,3vw,2.9rem); line-height:1.1; letter-spacing:-0.015em; margin:14px 0 14px; max-width:20ch; }
  .rs.dark h2{ color:#fff; }
  .rs p{ font-size:1.05rem; line-height:1.72; color:var(--ink-soft); max-width:62ch; }
  .rs.dark p{ color:rgba(255,255,255,.78); }
  .rs h3{ font-size:1.05rem; margin:0 0 8px; }
  .rs-head{ margin-bottom:34px; }
  .rs-slate{ display:inline-flex; align-items:center; gap:12px; font-family:var(--font-mono); font-size:.74rem; letter-spacing:.14em; text-transform:uppercase; color:var(--orange); }
  .rs-slate i{ font-style:normal; font-weight:600; padding:3px 8px; border:1px solid currentColor; border-radius:4px; }
  .rs-lede{ font-size:1.12rem !important; }
  .rs-two{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,4vw,64px); align-items:center; }
  .rs-img, .rs-shot{ display:block; width:100%; height:auto; }
  .rs-btn{ display:inline-block; background:var(--orange); color:#fff; font-weight:700; padding:14px 22px; border-radius:8px; text-decoration:none; border:1.5px solid var(--orange); transition:transform .15s ease, background .15s ease; }
  .rs-btn:hover{ transform:translateY(-2px); background:var(--orange-dark); }
  .rs-btn.ghost{ background:transparent; border-color:rgba(255,255,255,.4); }
  .rs-btn.ghost:hover{ background:rgba(255,255,255,.08); }
  .rs-cta-row{ display:flex; flex-wrap:wrap; gap:12px; margin-top:26px; }
  .rs-link{ color:var(--orange-dark); font-weight:600; text-decoration:none; } .rs-link:hover{ text-decoration:underline; }
  /* rail */
  .rs-rail{ position:fixed; left:18px; top:50%; transform:translateY(-50%); list-style:none; margin:0; padding:10px 0; display:none; flex-direction:column; gap:14px; z-index:5; }
  .rs-rail li{ font-family:var(--font-mono); font-size:.7rem; color:var(--ink-faint); border-left:2px solid var(--line-strong); padding-left:8px; transition:color .3s, border-color .3s; }
  .rs-rail li.on{ color:var(--orange); border-color:var(--orange); }
  @media (min-width:1600px){ .rs-rail{ display:flex; } }
  /* hero */
  .rs-hero{ padding:0; min-height:min(92vh,900px); display:flex; align-items:flex-end; background:var(--navy-deep); color:#fff; }
  .rs-plate{ margin:0; overflow:hidden; }
  .rs-hero .rs-plate{ position:absolute; inset:0; }
  .rs-hero-img{ width:100%; height:100%; object-fit:cover; object-position:center 60%; display:block; }
  .rs-hero-shade{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(6,17,28,.2) 0%, rgba(6,17,28,.5) 45%, rgba(6,17,28,.92) 100%); }
  .rs-hero-body{ position:relative; padding:140px 0 56px; }
  .rs-eyebrow{ font-family:var(--font-mono); font-size:.78rem; letter-spacing:.12em; text-transform:uppercase; color:var(--orange) !important; }
  .rs-hero h1{ font-size:clamp(2.4rem,5.2vw,4.8rem); line-height:1.02; letter-spacing:-0.02em; margin:16px 0 20px; color:#fff; max-width:16ch; }
  .rs-hero h1 span{ display:block; font-size:.5em; line-height:1.25; font-weight:500; color:rgba(255,255,255,.85); margin-top:14px; max-width:38ch; letter-spacing:0; }
  .rs-sub{ color:rgba(255,255,255,.82) !important; max-width:66ch; font-size:1.1rem !important; }
  .rs-hero-actions{ display:flex; flex-wrap:wrap; gap:12px; margin:26px 0 34px; }
  .rs-facts{ list-style:none; margin:0; padding:22px 0 0; border-top:1px solid rgba(255,255,255,.18); display:grid; grid-template-columns:repeat(5,1fr); gap:14px; }
  .rs-facts b{ display:block; font-family:var(--font-mono); font-size:clamp(1.4rem,2.2vw,2rem); font-weight:700; letter-spacing:-0.02em; }
  .rs-facts span{ font-size:.82rem; color:rgba(255,255,255,.7); }
  .rs-facts.small{ grid-template-columns:repeat(4,1fr); margin-top:22px; }
  .rs-facts.small b{ font-size:1.5rem; }
  /* answer */
  .rs-answer{ padding:44px 0; background:var(--paper-alt); border-bottom:1px solid var(--line); }
  .rs-answer p{ max-width:920px; margin:0 auto; border-left:4px solid var(--orange); padding-left:20px; font-size:1.08rem; }
  /* flagship */
  .rs-flag-media{ position:relative; padding-bottom:70px; }
  .rs-flag-photo{ border-radius:12px; aspect-ratio:4/3; }
  .rs-flag-photo img{ width:100%; height:100%; object-fit:cover; }
  .rs-frame{ margin:0; border-radius:12px; overflow:hidden; background:#0E1B29; border:1px solid rgba(255,255,255,.14); box-shadow:0 30px 60px -30px rgba(0,0,0,.8); }
  .rs-frame-bar{ display:flex; align-items:center; gap:6px; padding:9px 12px; background:rgba(255,255,255,.06); }
  .rs-frame-bar span{ width:9px; height:9px; border-radius:50%; background:rgba(255,255,255,.22); }
  .rs-frame-bar em{ flex:1; margin-left:8px; font-style:normal; font-family:var(--font-mono); font-size:.72rem; color:rgba(255,255,255,.55); background:rgba(0,0,0,.25); border-radius:6px; padding:3px 10px; }
  .rs-flag-frame{ position:absolute; right:-6%; bottom:0; width:78%; }
  /* search */
  .rs-cases{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
  .rs-case{ background:var(--paper); border:1px solid var(--line); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
  .rs-dip{ display:grid; grid-template-columns:1fr 1fr; gap:4px; aspect-ratio:2/1; }
  .rs-dip figure{ margin:0; overflow:hidden; } .rs-dip img{ width:100%; height:100%; object-fit:cover; }
  .rs-case-body{ padding:24px 24px 26px; display:flex; flex-direction:column; gap:12px; }
  .rs-tag{ font-family:var(--font-mono); font-size:.76rem !important; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-faint) !important; margin:0; }
  .rs-case h3{ font-size:1.25rem; line-height:1.25; }
  .rs-big{ display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; }
  .rs-num{ font-family:var(--font-mono); font-size:clamp(2.2rem,3vw,3rem); font-weight:700; color:var(--ink); letter-spacing:-0.03em; }
  .rs-big > span{ font-size:.9rem; color:var(--ink-soft); }
  .rs-case dl{ margin:0; display:grid; gap:6px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:12px 0; }
  .rs-case dl div{ display:flex; justify-content:space-between; gap:12px; font-size:.92rem; } .rs-case dt{ color:var(--ink-faint); } .rs-case dd{ margin:0; font-weight:600; text-align:right; }
  .rs-case ul{ margin:0; padding-left:18px; } .rs-case li{ font-size:.92rem; line-height:1.55; color:var(--ink-soft); margin-bottom:6px; }
  /* month */
  .rs-month-grid{ display:grid; grid-template-columns:1.1fr 1fr; gap:clamp(28px,4vw,64px); align-items:center; }
  .rs-strip{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; align-items:end; }
  .rs-strip figure{ margin:0; border-radius:10px; overflow:hidden; aspect-ratio:3/4; }
  .rs-strip figure:nth-child(2){ margin-bottom:36px; }
  .rs-strip img{ width:100%; height:100%; object-fit:cover; }
  .rs-month-list{ list-style:none; margin:0; padding:0; }
  .rs-month-list li{ display:grid; grid-template-columns:44px 1fr; gap:14px; padding:18px 0; border-bottom:1px solid var(--line); }
  .rs-month-list b{ font-family:var(--font-mono); color:var(--orange); font-size:.9rem; padding-top:3px; }
  .rs-month-list p{ font-size:.95rem; line-height:1.6; margin:0; }
  /* verify */
  .rs-checks{ list-style:none; margin:0; padding:0; }
  .rs-checks li{ padding:14px 0; border-bottom:1px solid rgba(255,255,255,.14); font-size:1rem; line-height:1.65; color:rgba(255,255,255,.8); }
  .rs-checks b{ color:#fff; } .rs-checks a{ color:var(--orange); }
  .rs-certs{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .rs-cert{ margin:0; background:#fff; border-radius:12px; padding:16px; color:var(--ink); }
  .rs-cert img{ width:100%; height:auto; max-height:220px; object-fit:contain; display:block; }
  .rs-cert figcaption{ margin-top:10px; font-size:.85rem; display:flex; flex-direction:column; } .rs-cert figcaption span{ color:var(--ink-faint); }
  /* map + band */
  .rs-tiles{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .rs-tile{ display:block; text-decoration:none; color:var(--ink); background:var(--paper-alt); border:1px solid var(--line); border-radius:14px; padding:22px; transition:transform .15s ease, border-color .15s ease; }
  .rs-tile:hover{ transform:translateY(-3px); border-color:var(--orange); }
  .rs-tile-flag{ font-size:1.6rem; display:block; margin-bottom:8px; }
  .rs-tile p{ font-size:.92rem; line-height:1.55; margin:0; }
  .rs-band{ position:relative; margin:clamp(60px,7vw,110px) 0 calc(-1 * clamp(60px,7vw,110px)); height:clamp(300px,42vw,560px); overflow:hidden; background:var(--navy-deep); }
  .rs-band-img{ width:100%; height:120%; object-fit:cover; display:block; margin-top:-10%; }
  .rs-band p{ position:absolute; left:4%; right:4%; bottom:32px; margin:0; color:#fff !important; font-size:clamp(1.2rem,2.4vw,2rem) !important; font-weight:700; max-width:30ch; text-shadow:0 2px 20px rgba(0,0,0,.6); line-height:1.25; }
  @supports (animation-timeline: view()){ .rs-drift .rs-band-img{ animation:rsDrift linear both; animation-timeline:view(); } @keyframes rsDrift{ from{ transform:translateY(-8%); } to{ transform:translateY(8%); } } }
  /* ---------- reveals: start states only under html.rs-on ---------- */
  html.rs-on .rs-box{ clip-path:inset(46% 0 46% 0); } html.rs-on .lit .rs-box, html.rs-on .rs-hero.lit .rs-box{ clip-path:inset(0); transition:clip-path 1.4s cubic-bezier(.2,.7,.2,1); }
  html.rs-on .rs-rise{ opacity:0; transform:translateY(28px); } html.rs-on .lit .rs-rise{ opacity:1; transform:none; transition:opacity .8s ease calc(.5s + var(--d,0s)), transform .9s cubic-bezier(.2,.7,.2,1) calc(.5s + var(--d,0s)); }
  html.rs-on .rs-head .rs-slate{ opacity:0; transform:translateX(-14px); } html.rs-on .lit .rs-head .rs-slate{ opacity:1; transform:none; transition:all .6s ease; }
  html.rs-on .rs-head h2{ opacity:0; transform:translateY(18px); } html.rs-on .lit .rs-head h2{ opacity:1; transform:none; transition:all .8s ease .15s; }
  html.rs-on .rs-flag-frame{ opacity:0; transform:translateY(50px); } html.rs-on .lit .rs-flag-frame{ opacity:1; transform:none; transition:all .9s cubic-bezier(.2,.7,.2,1) .7s; }
  html.rs-on .rs-dip .l{ transform:translateX(-40%); } html.rs-on .rs-dip .r{ transform:translateX(40%); } html.rs-on .lit .rs-dip figure{ transform:none; transition:transform 1s cubic-bezier(.2,.7,.2,1) var(--d); }
  html.rs-on .rs-case{ opacity:0; transform:translateY(30px); } html.rs-on .lit .rs-case{ opacity:1; transform:none; transition:opacity .7s ease var(--d), transform .8s ease var(--d); }
  html.rs-on .rs-strip figure{ opacity:0; transform:translateY(40px); } html.rs-on .lit .rs-strip figure{ opacity:1; transform:none; transition:all .9s cubic-bezier(.2,.7,.2,1) var(--d); }
  html.rs-on .rs-month-list li{ opacity:0; transform:translateX(24px); } html.rs-on .lit .rs-month-list li{ opacity:1; transform:none; transition:all .6s ease calc(.3s + var(--d)); }
  html.rs-on .rs-cert{ opacity:0; transform:scale(1.08) rotate(-2deg); } html.rs-on .lit .rs-cert{ opacity:1; transform:none; transition:all .5s cubic-bezier(.2,.7,.2,1) calc(.2s + var(--d)); }
  html.rs-on .rs-tile{ transform:perspective(900px) rotateY(-70deg); opacity:0; transform-origin:left center; } html.rs-on .lit .rs-tile{ transform:none; opacity:1; transition:transform .8s cubic-bezier(.2,.7,.2,1) var(--d), opacity .5s ease var(--d); }
  /* ---------- wide ---------- */
  @media (min-width:1850px){ .rs .wrap{ width:min(1720px,92%); } }
  /* ---------- tablet + phone ---------- */
  @media (max-width:1100px){ .rs-cases{ grid-template-columns:1fr; } .rs-tiles{ grid-template-columns:repeat(2,1fr); } .rs-facts{ grid-template-columns:repeat(3,1fr); } }
  @media (max-width:900px){ .rs-two, .rs-month-grid{ grid-template-columns:1fr; } .rs-hero{ min-height:78vh; } .rs-hero-body{ padding:120px 0 40px; } .rs-hero h1{ max-width:none; } .rs-flag-media{ padding-bottom:0; } .rs-flag-frame{ position:static; width:100%; margin-top:14px; } .rs-certs{ grid-template-columns:1fr 1fr; } }
  @media (max-width:640px){ .rs-tiles{ grid-template-columns:1fr; } .rs-facts, .rs-facts.small{ grid-template-columns:repeat(2,1fr); } .rs-facts b{ font-size:1.5rem; } .rs-strip{ grid-template-columns:repeat(3,1fr); gap:6px; } .rs-strip figure:nth-child(2){ margin-bottom:0; } .rs-band p{ font-size:1.15rem !important; bottom:20px; } .rs-dip{ aspect-ratio:16/9; } }
`;

const JS = `<script>
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('rs-on');
  var rail = document.querySelector('.rs-rail');
  function count(el){ var to = +el.getAttribute('data-to'), t0 = null; function step(t){ if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1300); p = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * p); if (p < 1) requestAnimationFrame(step); } el.textContent = '0'; requestAnimationFrame(step); }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (!e.isIntersecting) return; e.target.classList.add('lit'); e.target.querySelectorAll('.rs-count').forEach(count); io.unobserve(e.target); }); }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  document.querySelectorAll('.rs[data-act]').forEach(function(a){ io.observe(a); });
  if (rail) { var spy = new IntersectionObserver(function(es){ es.forEach(function(e){ if (!e.isIntersecting) return; var n = e.target.getAttribute('data-act'); rail.querySelectorAll('li').forEach(function(li){ li.classList.toggle('on', li.getAttribute('data-for') <= n && n !== '00'); }); }); }, { rootMargin: '-40% 0px -40% 0px' }); document.querySelectorAll('.rs[data-act]').forEach(function(a){ spy.observe(a); }); }
  var hero = document.getElementById('rs-hero'); if (hero) requestAnimationFrame(function(){ hero.classList.add('lit'); });
})();
</script>
`;

// ---------------------------------------------------------------------------------------------
let s = L.read('ca/erp/index.html');
L.must(s, '<section class="tap-new-hero">', 1); L.must(s, '<!-- trust-strip-band:start -->', 1);

const TITLE = 'Results & Case Studies: Real ERP, Web and SEO Work | TechAuditPros';
const DESC = 'A shipyard ERP live at erp.viraatmarine.com, built in 45 days. Search engagements up 205%, 180% and 165% in Canada, the US and Australia. The work, the numbers, the timeframes.';
s = L.setHead(s, { title: TITLE, desc: DESC, url: URL, hreflang: [{ lang: 'en', href: URL }, { lang: 'x-default', href: URL }] });
s = L.replaceBetween(s, '<section class="tap-new-hero">', '<!-- trust-strip-band:start -->', RAIL + HERO, { keepStart: false, keepEnd: true });
s = L.replaceBetween(s, '<!-- trust-strip-band:start -->', '<!-- trust-strip-band:end -->', '', { keepStart: false, keepEnd: false });
if (s.includes('<!-- trust-strip-js:start -->') && s.includes('<!-- trust-strip-js:end -->')) s = L.replaceBetween(s, '<!-- trust-strip-js:start -->', '<!-- trust-strip-js:end -->', '', { keepStart: false, keepEnd: false });
if (s.includes('<!-- trust-strip:start -->') && s.includes('<!-- trust-strip:end -->')) s = L.replaceBetween(s, '<!-- trust-strip:start -->', '<!-- trust-strip:end -->', '', { keepStart: false, keepEnd: false });   // its stylesheet block in <head>

const BODY = [ANSWER, FLAGSHIP, SEARCH, MONTHLY, VERIFY, MAP, L.faqHtml('rs-faq', 'Questions about our results', 'Eight straight answers, including why some clients are not named.', FAQS)].join('\n');
s = L.setBody(s, BODY);
s = L.setFinalCta(s, 'Let&rsquo;s look at one real page or one real workflow together.', 'Takes 60 seconds &middot; The findings are yours to keep &middot; No long-term contract');
s = L.replaceBetween(s, '<div class="footer-cities">', '<div class="footer-bottom">', `
            <h3>Serving Businesses in 16 Countries</h3>
            <p class="footer-cities-list">Canada &bull; United States &bull; United Kingdom &bull; India &bull; Australia &bull; United Arab Emirates &bull; and clients in ten more, remotely, from Kochi</p>
        </div>
        `, { keepStart: true, keepEnd: true });

const COLLECTION = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": ${L.jsonStr('Results & Case Studies — TechAuditPros')},
      "description": ${L.jsonStr(DESC)},
      "url": "${URL}",
      "isPartOf": { "@type": "WebSite", "name": "TechAuditPros", "url": "https://techauditpros.com/" },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "url": "${ERP_URL}", "name": ${L.jsonStr('Viraat Marine ERP: a shipyard run on one system')} },
          { "@type": "ListItem", "position": 2, "name": ${L.jsonStr('Canadian appliance company: +205% organic traffic in 8 months')} },
          { "@type": "ListItem", "position": 3, "name": ${L.jsonStr('US HVAC contractor: +180% organic traffic in 6 months')} },
          { "@type": "ListItem", "position": 4, "name": ${L.jsonStr('Australian e-commerce store: +165% organic traffic in 7 months')} }
        ]
      }
    }
    </script>`;
s = L.setPageSchemas(s, [COLLECTION, L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['Results', URL]]), L.faqSchema(FAQS)]);
s = L.injectExtras(s, CSS);
s = s.replace(/<\/body>\s*<\/html>\s*$/, JS + '</body>\n</html>\n');
s = NAV.apply(s);

L.must(s, '<section class="rs', 7); L.must(s, 'class="rs-case"', CASES.length); L.must(s, 'class="rs-cert"', CERTS.length); L.must(s, 'class="rs-tile"', MARKETS.length);
L.must(s, 'href="/results/">Results</a>', 2); L.must(s, 'rel="canonical"', 1); L.must(s, 'class="tl-band"', 0);
if (/\boffshore\b/i.test(L.plain(BODY + HERO))) throw new Error('offshore in copy');
L.write('results/index.html', s);
console.log('words in our sections:', L.plain(HERO + BODY).split(/\s+/).filter(Boolean).length, '| photos:', Object.values(P).length);
