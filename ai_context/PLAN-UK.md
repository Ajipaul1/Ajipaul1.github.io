# UK plan — pages, cities, blog, design, images (2026-09-03)

Source: the six SEMrush exports the owner dropped on 2026-09-03 (ERP-software / seo / website-development, UK,
two copies each — near-identical, merged). 160,181 rows → **148,132 unique keywords, 1.69M searches/month**.
37,258 have ≥10/mo, 4,257 have ≥50, 1,798 have ≥100. Full deduped set with volume/KD/intent was kept as
`uk_keywords.json` in the session scratchpad; regenerate with the two scripts noted in PROGRESS if needed.
Owner's rules for this work: every page a different style/animation, same brand palette; hero even shorter than
/us/; more images, but the 612px iStock batch only on small cards; use every keyword (nothing dropped — they are
mapped to a page or a post below); rank for SEO + AEO + GEO; the goal is a paying client.

## 1. What the data actually says
- **Head terms are not winnable for a new site**: "search engine optimization" 49,500 (KD 83), "seo" 40,500 (88),
  "website builder" 33,100 (83), "web design" 22,200 (67), "erp" 18,100 (67). They go in copy, never as targets.
- **The money is commercial mid-tail at KD 15–45**: "web development services" 3,600 (38), "website development
  services" 2,400 (34), "website development company" 2,400 (47), "web development service" 720 (28), "custom
  web development" 720 (10), "custom website development" 720 (17), "manufacturing erp software" 880 (15),
  "erp solutions for manufacturing" 720 (22), "erp implementation" 1,000 (22), "erp for small business" 480 (27),
  "erp software uk" 390 (18), "erp systems uk" 480 (28), "website development uk" 880 (41),
  "website development company in uk" 880 (36).
- **Place modifiers** (988 keywords, 9,260/mo): "uk" 651 kw / 6,900; London 180 kw / 530; Reading 29 kw / 410
  (web design/dev, KD 7–16); Manchester 4 kw / 340 (all ERP manufacturing + cloud ERP, KD 7–11); Edinburgh 160
  and Aberdeen 160 (ERP small-business/manufacturing, KD 0–8); "near me" 93 kw / 600. Birmingham, Leeds,
  Bristol, Glasgow, Cardiff, Liverpool, Newcastle: 0–1 keywords, 0 volume → **no page**.
- **Questions = the AEO surface: 67,828 keywords, 695,660/mo.** "how to create a website" 22,200 (65), "how to
  make a website mobile friendly" 9,900 (48), "what is seo" 8,100 (83), "what is erp" 4,400 (53), **"what is a
  content audit" 3,600 (KD 28 — the single best blog target in the whole set)**, "what is mrp" 480 (33),
  "what is wms" 390 (32), "how long does it take for seo to work" 210 (28).
- **AI search / GEO / AEO: 264 keywords, 5,180/mo, almost all KD 0** — "how to rank in ai overview" 90, "how to
  optimize for ai search" 70, "what is generative engine optimization geo" 70, "what is ai seo" 70, "how do i rank
  my website on chatgpt" 40, "what is aeo vs seo" 40. Nobody is competing. This is the site's own service line
  with open air — own it with one pillar post + a section on /uk/seo-services/.
- **Intent**: 146k rows carry no intent label (long tail); of the labelled ones 1,799 informational, 197
  commercial, 76 mixed, 12 transactional. Commercial intent is thin in the raw labels — the MONEY regex slice
  (agency/company/services/cost/near me/…) found 1,235 buyer-shaped keywords, 72,390/mo, which is the real
  commercial pool.

## 2. Pages — 8 UK pages, in build order
### Phase 1 — the UK set (clone the us_*.js generators, which template from /ca/*)
| # | URL | Primary targets (vol / KD) | Must-cover sections (cluster size) |
|---|---|---|---|
| 1 | `/uk/` hub | website development uk 880/41 · website development company in uk 880/36 · erp systems uk 480/28 · erp software uk 390/18 · website developer uk 390/38 · website development company uk 390/37 · website development services uk 390/36 · uk website development 260/39 · web development websites in uk 210/32 · erp system uk 140/22 · how much does it cost to make a website uk 140/18 · erp united kingdom 110/38 · cloud erp uk 110/26 · erp manufacturing software uk 110/9 (≈4,900/mo direct) | three services · markets (London, Manchester, Reading, Scotland) · £1,200/mo vs UK agency rates · UK GDPR/PECR/ICO · UK↔Kochi overnight (5.5h) · FAQ (8, visible = schema) |
| 2 | `/uk/erp/` | manufacturing erp software 880/15 · erp solutions for manufacturing 720/22 · erp implementation 1,000/22 · erp for small business 480/27 · erp software for small business 390/28 · erp accounting software 320/22 · erp for manufacturing 320/17 · small business erp 320/22 · benefits of erp 390/12 · erp systems for small companies 210/23 · erp implementation services 140/11 · erp implementation partner 110/5 · cloud erp 1,300/39 (stretch) · erp services 170/27 | manufacturing (444 kw, 17,940/mo) · cloud (403, 14,730) · implementation (706, 15,150) · small business (280, 9,430) · finance/accounting (250, 7,160) · HR/payroll incl. **"how to integrate payroll software with workplace pension" 140/13 — UK-only pain** · MRP/WMS (what is mrp 480, what is wms 390) · Sage/Xero/QuickBooks UK stack ("is sage an erp system" 170/28) · cost ("how much does erp cost" 90/0, "cost of erp for small business" 50/0) |
| 3 | `/uk/website-development/` | web development services 3,600/38 · website development services 2,400/34 · website development company 2,400/47 · custom web development 720/10 · custom website development 720/17 · web development service 720/28 · company website design 590/32 · custom website development services 390/16 · professional website development company 390/31 · website development service 390/25 · web page development services 320/25 · custom website development company 260/18 · web development agency 5,400/57 (stretch, in H1 copy) | **cost section with real £ figures** (926 kw, 23,220/mo: how much cost to create a website 590/42, …to build 480/37, …to make 480/41, …for website 480/33, per month 260/34, uk 140/18) · ecommerce (195, 3,910) · WordPress (987, 18,370) · web apps (web application development 1,000/47) · redesign without losing SEO 140/5 · mobile (383, 18,700) · maintenance (what is website maintenance 170/38) · speed/Core Web Vitals |
| 4 | `/uk/seo-services/` | what are seo services 390/29 · what is seo services 210/39 · technical seo 3,600/49 (stretch) · seo site audit 1,300 · what is enterprise seo 260/22 · javascript seo agency 170/15 · how much does seo cost for small business 110/0 · how long does it take for seo to work 210/28 · how to get website to top of google 210/21 · international seo 2,400/47 (stretch) | local (78 kw, 13,300) · technical (152, 8,870) · audit (107, 8,870) · content (247, 10,580) · links (290, 13,580) · keywords (595, 28,180) · international (3,040) · **AEO/GEO (264 kw, 5,180, KD 0)** as its own section with the pillar post linked · UK spelling "optimisation" everywhere ("search engine optimisation" 5,400/73) |

### Phase 2 — location pages (the earlier "no city pages" note is overturned by the data)
| # | URL | Why (vol / KD) | Angle |
|---|---|---|---|
| 5 | `/uk/london/` | 180 kw, 530/mo: erp manufacturing software london 110/14 · erp system london 90/0 · erp systems london 90/0 · cloud erp london 90/0 · erp for small business london 70/0 + web/seo London tail | hub style like /ca/toronto/: all three services, London rates vs £1,200, City/Canary Wharf/Shoreditch/Croydon named |
| 6 | `/uk/manchester/` | 340/mo, KD ≤11: erp manufacturing software manchester 110/7 · cloud erp manchester 110/11 · erp for small business manchester 70/0 · enterprise resource planning manchester 50/0 | ERP-first: Northern manufacturing, Trafford Park, MediaCity, Salford — the cheapest ranking win in the set |
| 7 | `/uk/reading/` | 29 kw, 410/mo, KD 7–16: web designer reading 90/7 · web development reading 90/16 + 27 long-tail | web-first: Thames Valley / M4 corridor tech, Green Park, Slough/Bracknell/Wokingham catchment |
| 8 | `/uk/scotland/` | Edinburgh 160 + Aberdeen 160, KD 0–8: erp manufacturing software edinburgh 90/8 · …aberdeen 90/0 · erp for small business edinburgh 70/0 · …aberdeen 70/0 | one page, two cities (two thin pages would be worse): ERP for Scottish manufacturers and energy-sector SMEs |

## 3. Blog — 24 posts in 3 waves of 8 (48 live now → 72), from 353 winnable candidates (KD ≤35, vol ≥100, 3+ words; 150 of them KD ≤20)
Each post = one cluster (all variants in H2s/FAQ so no keyword is dropped), 1,400–2,200 words, FAQPage schema, 2–3 inline figures.
**Wave 1 — ERP (posts_erp4.js):** 1 Manufacturing ERP software in the UK — what it should do (880/15 + 720 + 320 + 320 + 260 ≈ 2,500) · 2 ERP for small business UK (480 + 390 + 320 + 210 + 140 ≈ 1,540) · 3 ERP implementation: steps, timeline, cost, choosing a partner (1,000 + 140 + 110 + "how much does erp cost" 90 + 90) · 4 MRP vs ERP vs WMS explained (what is mrp 480/33 · what is wms 390/32 · what is warehouse management 320) · 5 The benefits of ERP, with numbers (390/12 + "erp in it" 720/0) · 6 Is Sage an ERP? Sage, Xero and QuickBooks vs a custom ERP (170/28 + UK stack tail) · 7 Payroll ↔ workplace-pension integration: how to automate it (140/13 ×2 — UK-only) · 8 What is an HRIS / HR system (590/28 + 320 + 320 + 320 + "what is workforce management" 320/21).
**Wave 2 — SEO (posts_seo5.js):** 9 **What is a content audit, and how to run one** (3,600/28) · 10 How long does SEO take to work (210/28 + 210 + 210) · 11 Why SEO is important — the business case (390/34 + is seo important 210) · 12 How to get to the top of Google — realistic playbook (210/21 + 210/29 + 140/19) · 13 How many internal links per page (260/31 + title tags & meta descriptions 170/21 + nofollow 170/21) · 14 SEO copywriting and SEO content (260/35 + 210/31) · 15 What is enterprise SEO (260/22 + cost tail) · 16 **How to rank in AI Overviews, ChatGPT and Perplexity — AEO/GEO explained** (the whole 264-kw, 5,180/mo, KD-0 cluster).
**Wave 3 — Web (posts_web3.js):** 17 How much does a website cost in the UK (590 + 480 + 480 + 480 + 260 + 260 + 140 UK ≈ 2,700) · 18 Custom web development vs templates/builders (720/10 + 720/17 + 390/16 + 260/18) · 19 How to make a website mobile friendly (9,900/48 — big, medium KD; the one stretch post) · 20 How to redesign a website without losing SEO (140/5 + 90) · 21 What website maintenance includes and costs (170/38 + 110) · 22 What is a web application (1,000/47 + 260 + 210) · 23 WordPress site development done properly (320/35 + 260) · 24 Ecommerce website development in the UK (110/41 + 90 + Shopify/Woo tail).
After each wave: `run_posts.js` → `build_bloghub.js` → `gen_sitemap.js`. Every post links up to its UK service page.

## 4. Design — one signature per page, same palette, same type, one-shot/in-view/transform-only, JS-off safe (the `html.hm` pattern from home_motion.js), ≤10KB each, hero ≤560px at 1440 (shorter than /us/'s 622)
- `/uk/` — **"Tube map"**: services and markets drawn as an Underground-style line diagram in SVG (stroke-dashoffset draws once as it enters), eyebrows as roundels. No photo hero — the map is the hero art.
- `/uk/erp/` — **"Assembly line"**: ERP modules ride a conveyor into place (one-shot translate), blueprint grid behind the manufacturing section.
- `/uk/website-development/` — **"Wireframe to real"**: a wireframe of the page draws itself, then blocks fill with the real content (clip-path reveals, greyscale→colour on images).
- `/uk/seo-services/` — **"SERP climb"**: a stylised results page where the client's row climbs #9 → #1 (one-shot translateY), plus an AI-answer card that types out — the AEO/GEO proof, on the page that sells it.
- City pages — **"Postcode stamp"**: the postcode area stamps in (scale + rotate, one-shot), skyline as an SVG line drawing.
- Every UK page closes with the converging-lines band (cta.js) with the heading in the sheen — the one recurring signature.

## 5. Images — hard rules
- **Hero / full-bleed / large split: ONLY the 2400px free-licence files** (4): executive-woman-tablet-grand-hall → `/uk/seo-services/`; female-developer-red-hair-dual-monitors-code → `/uk/website-development/`; team-standing-document-review-bright-room → `/uk/`; whiteboard-process-mapping-two-colleagues → `/uk/erp/`. mentor-explaining-data-on-monitor (1344px) → one split section. analyst-pointing-pen-bi-dashboard (1600px PNG, 1.4MB) → convert to JPEG/WebP ≤200KB before any use.
- 700–767px (6 files) → medium cards only.
- **The 29 iStock files at 612px → small cards only, never a hero, split, or large card, never upscaled** (owner's rule 2026-09-03 + CATALOG rule).
- **Gap: 8 pages + 24 posts want ~12 more large images.** Owner to source (Unsplash, free licence): London / Manchester / Reading / Edinburgh skylines or streets, a UK factory floor, a UK warehouse, a UK office team, a laptop with a GBP invoice or Xero-style dashboard (no logos), Thames Valley business park, Northern Quarter. Until they land: design-led heroes (SVG art, no photo) — which also delivers "hero even shorter".

## 6. UK specifics that build trust (real only — nothing invented)
£1,200/month flat, invoiced in GBP · UK GDPR + PECR, DPA offered, ICO-registered wording only if the owner confirms registration · HMRC MTD-compatible VAT flows when ERP touches invoicing · Xero, Sage, QuickBooks UK integrations · AWS London (eu-west-2) / Google Cloud europe-west2 · en-gb spelling throughout (optimisation, organisation, colour, licence) · Kochi is 4.5h (BST) / 5.5h (GMT) ahead of London — the overnight window · Companies House-style specifics only from real facts.
**Open with the owner (these change sentences, not structure):** 1 VAT position on UK invoices (reverse charge for B2B services from India — state it only if confirmed). 2 Any UK or European client we can cite, even as "sector + result". 3 Confirm £1,200. 4 Source the 12 images, or approve design-led heroes.

## 6b. SERP-parity rule (owner, 2026-09-03: "search the current competitor pages Google is trusting, cover all he is having and little more, so Google cannot avoid our page")
Before every page: search the primary keyword, crawl the top 1-3, and write down their H1/H2 inventory, word count, prices, FAQ set and trust signals. Our page must (a) cover every theme they cover, (b) add what they miss, (c) exceed their word count on the same ground. Recorded per page in the generator header.
- Done for session A.  -> comparesoft (~3,500 words, 10 products with GBP prices, production methodologies, features, implementation challenges, 3 FAQs) and erpresearch (~18,000 words, 40+ systems, costing methods, MTD/FRS 102/post-Brexit/SECR, ROI 18-30 months). Neither builds software.  answers with 3,816 words, 17 H2s, 13 FAQs: production methodologies (8), costing (standard/actual/job, COGM, WIP/overhead), UK compliance (MTD, FRS 102, post-Brexit customs, UK GDPR/PECR, SECR, auto-enrolment), an honest when-each-vendor-wins block naming Sage 200/NetSuite/Dynamics/Epicor/SAP B1 with their published GBP prices, failure modes, MRP-vs-ERP-vs-WMS, plus cost and process.  -> Lightflows (~4,500 words, 6 FAQs, no pricing) and Clutch (directory, 5-199/hr, 0k+ minimums): both beatable on transparent pricing; carried into session B.

## 7. Mechanics
`lib.js`: add `addUkToNavAndFooter`, `ukFooterCities`; hreflang cluster gains `en-gb` on `/`, `/ca/*`, `/us/*` and the new pages (x-default stays `/`). Generators: `uk_hub.js`, `uk_erp.js`, `uk_seo.js`, `uk_web.js` cloned from `us_*.js`; `uk_city.js` templating from `ca/toronto/` for the four location pages; `hero_tight.js` pattern reused with a tighter budget. Rule 2 (crawl the current #1) before each page: `website development company in uk`, `manufacturing erp software`, `web development services`, `what are seo services`. Verify each page: text checks, JS-off check, ≤2 shots, sitemap count. Sessions: **A** lib helpers + `/uk/` + `/uk/erp/` · **B** web + seo + hreflang + sitemap · **C** London, Manchester, Reading, Scotland · **D–F** blog waves 1–3.
