'use strict';
// /why-us/ — the page behind the "Why Us" item in the shared header.
//
// WHY THIS PAGE EXISTS: "Why Us" pointed at #compare, a homepage anchor that exists on only 5 of the 38 pages
//   carrying the link — on the other 33 it went nowhere. This gives it a real destination and a home for the
//   75-second founder film (2026-09-09).
// NOT a keyword page: "why us" has no search demand, so there is no SEMrush figure or #1 crawl behind it. It is a
//   brand/trust page — clean title, description, VideoObject + FAQPage + BreadcrumbList, and no keyword stuffing.
// RULES: no "audit" as a service word (company name only) · no "offshore" · no price of ours · real claims only ·
//   root-absolute links · visible FAQ text = FAQPage schema · honest about what the film is.
//
// ASSETS: assets/videos/techauditpros-why-us-film-1080p.mp4 (1080p, 9.4 MB, captions burned in, eng + mal subtitle
//   tracks inside the container; assets/videos/ is the un-ignored path, plain videos/*.mp4 is gitignored) and assets/images/why-us-film-poster.jpg (1920x1080 still, frame at 6.4s).
//   4K master lives outside the repo at Downloads/TechAuditPros_Film_Final_4K.mp4.
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const URL = 'https://techauditpros.com/why-us/';
const VIDEO = '/assets/videos/techauditpros-why-us-film-1080p.mp4';
const POSTER = '/assets/images/why-us-film-poster.jpg';

let s = L.read('ca/erp/index.html');

// ---------------------------------------------------------------------------------------------- head
s = L.setHead(s, {
  title: 'Why TechAuditPros | An engineering team in Kochi, and a straight answer',
  ogTitle: 'Why TechAuditPros &mdash; an engineering team, not an agency',
  desc: 'Who we are and how we work: an engineering team in Kochi, India, building custom ERP systems, search visibility and websites for companies in the US, UK, Canada and the UAE. No office in your country, the code and data are yours, and we say when an off-the-shelf product is the better answer. Includes our 75-second film.',
  url: URL,
  ogType: 'website',
});
s = L.replaceAll(s, 'https://techauditpros.com/assets/images/og-share-cover.jpg', 'https://techauditpros.com' + POSTER);

// -------------------------------------------------------------------------------------------- content
const FACTS = [
  ['An engineering team, not an agency',
    'The people who scope your system are the people who build it. There is no account manager between you and the work, and no ticket queue &mdash; you talk to the engineers who wrote the code.'],
  ['In Kochi, and honest about it',
    'We have no office in your country and no local support desk, and we say so on the first call rather than the last. Our working day overlaps the Gulf entirely, the UK morning, and the North American evening.'],
  ['The code and the data are yours',
    'Source code, database and documentation belong to you from the first commit, in your own accounts. Nothing is held back to keep you paying, and there is no platform of ours to be locked into.'],
  ['We will tell you not to build',
    'If an accounting package or an off-the-shelf product already fits how you work, that is the answer you get &mdash; even though it is not the sale. A system nobody needed is worse for us than a project we did not win.'],
];

const STEPS = [
  ['Scoping before anything is quoted',
    'We look at the actual processes, the actual data and the places where things break now. If that look says a product fits better than a build, the engagement stops there and costs you nothing.'],
  ['A staging site you can open every week',
    'You watch the system being built instead of waiting for a reveal. Anything that looks wrong is cheap to change in week three and expensive to change in month three.'],
  ['A written report every month',
    'What changed, what it is doing for you, and what comes next &mdash; in writing, so there is a record you can hold us to.'],
  ['A handover you can act on',
    'Code, data and documentation in your accounts, and a walkthrough for the people who will use the system every day.'],
];

const WRONG = [
  ['You need someone in the building',
    'Some work needs a person on site with the machines or the stock. We cannot be that, and a video call is not a substitute.'],
  ['You need a phone answered at 2am',
    'We answer inside our working day. If your operation needs round-the-clock cover, you need a vendor with a support desk in your timezone.'],
  ['A standard product already fits',
    'Plenty of businesses are well served by a licence and a good accountant. When that is true, buying it is cheaper and faster than anything we would build.'],
  ['Price is the only criterion',
    'Kochi rates make us good value, but someone will always quote lower. If the lowest number is what decides it, take theirs with our blessing.'],
];

const FAQS = [
  { q: 'Where is your team, and do you have an office in my country?',
    a: 'We are an engineering team in Kochi, in Kerala, India. We have no office and no support desk in the United States, the United Kingdom, Canada or the UAE, and we say so before you ask. Our working day covers the Gulf in full, the UK morning and the North American evening; Dubai is a four-hour flight and shares our working week.' },
  { q: 'Who owns the code and the data?',
    a: 'You do, from the first commit. The repository, the database and the documentation sit in your accounts, and the handover includes all three. There is no platform of ours in the middle and nothing withheld to keep you on a retainer.' },
  { q: 'Is the video on this page real?',
    a: 'The film was produced with generative AI. Our founder&rsquo;s likeness was generated from his own photograph and the words are his own; the second presenter is an AI narrator, not an employee of ours, and carries no name or job title for that reason. Everything the film says about the team, the work and the way we run an engagement is accurate.' },
  { q: 'How do I know work is actually happening?',
    a: 'A staging environment you can open any week of the build, and a written report every month. You are not asked to trust a status meeting.' },
  { q: 'What if an off-the-shelf product would suit us better?',
    a: 'Then we say so, and we say it on the first call rather than after the scoping fee. Several excellent products serve small and mid-sized businesses well, and pointing you at one costs us a project but keeps the advice worth asking for.' },
  { q: 'What do you actually build?',
    a: 'Custom ERP systems &mdash; stock, orders, purchasing, projects, payroll and job costing in one system of record &mdash; along with search visibility work for Google and for the AI answers that increasingly sit above it, and the websites and online stores those systems run behind.' },
];

const factCards = FACTS.map(([h, p]) => `                <article class="wu-fact">
                    <h3>${h}</h3>
                    <p>${p}</p>
                </article>`).join('\n');

const stepRows = STEPS.map(([h, p], i) => `                <li class="wu-step">
                    <span class="wu-step-n" aria-hidden="true">${i + 1}</span>
                    <div>
                        <h3>${h}</h3>
                        <p>${p}</p>
                    </div>
                </li>`).join('\n');

const wrongRows = WRONG.map(([h, p]) => `                <li class="wu-wrong">
                    <h3>${h}</h3>
                    <p>${p}</p>
                </li>`).join('\n');

// ------------------------------------------------------------------------------------------------ hero
const HERO = `<section class="tap-new-hero wu-hero">
    <div class="container">
        <div class="wu-hero-inner">
            <p class="eyebrow">Why Us</p>
            <h1>Why work with us &mdash; <span>a team you can actually reach, and a straight answer about what you need.</span></h1>
            <p class="wu-hero-sub">TechAuditPros is an engineering team in Kochi, India. We build custom ERP systems, search visibility and websites for companies in the United States, the United Kingdom, Canada and the United Arab Emirates. We have no office in your country, the code we write belongs to you, and when an off-the-shelf product fits your business better than a build, we say so. This page is the short version &mdash; and the film below says it in our own words.</p>
            <div class="wu-hero-cta">
                <a href="#film" class="wu-btn wu-btn-primary">Watch the film</a>
                <a href="#contact" class="wu-btn wu-btn-ghost">Talk to an engineer</a>
            </div>
        </div>
    </div>
</section>
`;

// ------------------------------------------------------------------------------------------------ body
const BODY = `<section class="wu-film-section" id="film">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">Our Film</p>
            <h2>Seventy-five seconds, start to finish.</h2>
            <p class="section-lead">What we do, what an ERP actually is, what being found now means, where we work and what an engagement gets you.</p>
        </div>
        <figure class="wu-film">
            <div class="wu-film-frame">
                <video class="wu-video" controls playsinline preload="none" poster="${POSTER}" width="1920" height="1080">
                    <source src="${VIDEO}" type="video/mp4" />
                    Your browser cannot play this video. <a href="${VIDEO}">Download the film</a> instead.
                </video>
            </div>
            <figcaption>
                <p class="wu-film-cap">Captions are part of the picture; English and Malayalam subtitle tracks are inside the file.</p>
                <p class="wu-film-note"><strong>About this film:</strong> it was produced with generative AI. Our founder&rsquo;s likeness was generated from his own photograph and the words are his; the second presenter is an AI narrator rather than an employee, which is why no one in the film carries a name or a job title. The team, the work and the words are real.</p>
            </figcaption>
        </figure>
    </div>
</section>

<section class="wu-facts-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">What We Are</p>
            <h2>Four things worth knowing before you write to us.</h2>
        </div>
        <div class="wu-facts">
${factCards}
        </div>
    </div>
</section>

<section class="wu-steps-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">How An Engagement Runs</p>
            <h2>You see the work while it is being built.</h2>
        </div>
        <ol class="wu-steps">
${stepRows}
        </ol>
    </div>
</section>

<section class="wu-wrong-section">
    <div class="container">
        <div class="section-head">
            <p class="eyebrow">When We Are The Wrong Choice</p>
            <h2>Four times you should hire somebody else.</h2>
            <p class="section-lead">Every vendor page tells you who they are for. This is the other half, and it is the half that saves everyone a wasted month.</p>
        </div>
        <ul class="wu-wrongs">
${wrongRows}
        </ul>
    </div>
</section>

${L.faqHtml('faq', 'Questions', 'The things people ask before the first call.', FAQS)}
`;

s = L.replaceBetween(s, '<section class="tap-new-hero">', '<section class="tap-answer-section">', HERO, { keepStart: false, keepEnd: true });
s = L.setBody(s, BODY);
s = L.setFinalCta(s, 'Talk to the people who would build it.', 'A first call with an engineer, not a sales desk.');

// ---------------------------------------------------------------------------------------------- schema
{
  const video = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Why TechAuditPros — an engineering team in Kochi",
      "description": "A 75-second film in which the founder of TechAuditPros and an AI presenter explain what the company builds: custom ERP systems, search visibility for Google and AI answers, and the websites those systems run behind. Produced with generative AI; the team, the work and the words are real.",
      "thumbnailUrl": "https://techauditpros.com${POSTER}",
      "contentUrl": "https://techauditpros.com${VIDEO}",
      "uploadDate": "2026-09-09",
      "duration": "PT1M15S",
      "inLanguage": "en",
      "isFamilyFriendly": true,
      "publisher": { "@type": "Organization", "name": "TechAuditPros", "url": "https://techauditpros.com/" }
    }
    </script>`;
  s = L.setPageSchemas(s, [
    L.breadcrumbSchema([['Home', 'https://techauditpros.com/'], ['Why Us', URL]]),
    video,
    L.faqSchema(FAQS),
  ]);
}

// ------------------------------------------------------------------------------------------------- css
const CSS = `
  /* ---- /why-us/ ---- */
  .wu-hero{ background:var(--navy-deep); padding:96px 0 84px; overflow-x:clip; }
  .wu-hero-inner{ max-width:900px; }
  .wu-hero .eyebrow{ color:var(--orange); }
  .wu-hero h1{ color:#fff; font-size:clamp(2rem,4.4vw,3.4rem); line-height:1.12; margin:.3em 0 .6em; }
  .wu-hero h1 span{ color:#C9D6E2; font-weight:400; display:block; margin-top:.25em; }
  .wu-hero-sub{ color:#C9D6E2; font-size:1.06rem; line-height:1.75; max-width:74ch; }
  .wu-hero-cta{ display:flex; flex-wrap:wrap; gap:14px; margin-top:32px; }
  .wu-btn{ display:inline-block; padding:14px 26px; border-radius:8px; font-weight:700; text-decoration:none; font-size:.98rem; }
  .wu-btn-primary{ background:var(--orange); color:#fff; }
  .wu-btn-primary:hover{ filter:brightness(1.08); }
  .wu-btn-ghost{ color:#fff; border:1px solid rgba(255,255,255,.35); }
  .wu-btn-ghost:hover{ background:rgba(255,255,255,.08); }

  .wu-film-section{ background:var(--paper); padding:84px 0; overflow-x:clip; }
  .wu-film{ margin:40px auto 0; max-width:1080px; }
  .wu-film-frame{ position:relative; border-radius:16px; overflow:hidden; background:var(--navy-deep); box-shadow:0 24px 60px rgba(11,32,54,.22); }
  .wu-video{ display:block; width:100%; height:auto; aspect-ratio:16/9; background:var(--navy-deep); }
  .wu-film figcaption{ margin-top:22px; }
  .wu-film-cap{ color:var(--ink-soft); font-size:.95rem; margin:0 0 12px; }
  .wu-film-note{ color:var(--ink-soft); font-size:.92rem; line-height:1.7; margin:0; padding:14px 18px; border-left:3px solid var(--orange); background:var(--paper-alt); border-radius:0 8px 8px 0; }
  .wu-film-note strong{ color:var(--ink); }

  .wu-facts-section{ background:var(--paper-alt); padding:84px 0; overflow-x:clip; }
  .wu-facts{ display:grid; grid-template-columns:repeat(2,1fr); gap:22px; margin-top:38px; }
  .wu-fact{ background:var(--paper); border-radius:12px; padding:30px 28px; border-top:3px solid var(--orange); }
  .wu-fact h3{ font-size:1.14rem; margin:0 0 .5em; color:var(--ink); }
  .wu-fact p{ color:var(--ink-soft); line-height:1.75; margin:0; font-size:.98rem; }

  .wu-steps-section{ background:var(--paper); padding:84px 0; overflow-x:clip; }
  .wu-steps{ list-style:none; margin:38px 0 0; padding:0; display:grid; gap:18px; max-width:920px; }
  .wu-step{ display:flex; gap:22px; align-items:flex-start; background:var(--paper-alt); border-radius:12px; padding:26px 28px; }
  .wu-step-n{ flex:0 0 44px; width:44px; height:44px; border-radius:50%; background:var(--navy-deep); color:#fff; display:grid; place-items:center; font-weight:700; }
  .wu-step h3{ font-size:1.1rem; margin:0 0 .4em; color:var(--ink); }
  .wu-step p{ color:var(--ink-soft); line-height:1.75; margin:0; font-size:.98rem; }

  .wu-wrong-section{ background:var(--navy-deep); padding:84px 0; overflow-x:clip; }
  .wu-wrong-section .eyebrow{ color:var(--orange); }
  .wu-wrong-section h2{ color:#fff; }
  .wu-wrong-section .section-lead{ color:#C9D6E2; }
  .wu-wrongs{ list-style:none; margin:38px 0 0; padding:0; display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
  .wu-wrong{ background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:26px 26px; }
  .wu-wrong h3{ color:#fff; font-size:1.08rem; margin:0 0 .5em; }
  .wu-wrong p{ color:#C9D6E2; line-height:1.75; margin:0; font-size:.96rem; }

  @media (max-width:860px){
    .wu-hero{ padding:70px 0 60px; }
    .wu-facts, .wu-wrongs{ grid-template-columns:1fr; }
    .wu-step{ padding:22px; gap:16px; }
    .wu-film-frame{ border-radius:12px; }
  }
`;
{
  const at = s.indexOf('</style>'); if (at === -1) throw new Error('no </style>');
  s = s.slice(0, at) + CSS + s.slice(at);
}

// ---------------------------------------------------------------------------------------------- guards
{
  if (!fs.existsSync(path.join(L.REPO, VIDEO.replace(/^\//, '')))) throw new Error('film missing: ' + VIDEO);
  if (!fs.existsSync(path.join(L.REPO, POSTER.replace(/^\//, '')))) throw new Error('poster missing: ' + POSTER);
  const body = s.slice(s.indexOf('<body'));
  const prose = L.plain(body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, ''));
  // allowed: the brand in any case (domain, email) and the site-wide footer link to the existing /seo-audit-kochi/ page
  const bare = prose.replace(/techauditpros/gi, '').replace(/SEO Audit Kochi/g, '');
  if (/audit/i.test(bare)) throw new Error('"audit" survives as a service word on /why-us/');
  const noTag = prose.replace(/Your dedicated offshore technical team/gi, '');
  const off = noTag.match(/.{0,70}offshore.{0,70}/i);
  if (off) throw new Error('"offshore" appears in /why-us/ prose: ...' + off[0].replace(/\s+/g, ' ') + '...');
  const words = prose.replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  L.must(s, '<video class="wu-video"', 1);
  L.must(s, 'poster="' + POSTER + '"', 1);
  L.must(s, '"@type": "VideoObject"', 1);
  L.must(s, 'class="wu-fact"', FACTS.length);
  L.must(s, 'class="wu-step"', STEPS.length);
  L.must(s, 'class="wu-wrong"', WRONG.length);
  L.must(s, 'class="faq-item"', FAQS.length);
  console.log('  words: ' + words + ' | FAQs: ' + FAQS.length + ' | video 1080p + poster + VideoObject');
}

L.write('why-us/index.html', s);
console.log('/why-us/ built: film showcase + what we are + how an engagement runs + when we are the wrong choice + ' + FAQS.length + ' FAQs');
