# PLAN-IN — India, built from the data

Written 2026-09-04 after the owner said, correctly, that the first six India city pages were text
skeletons: no picture story, no signature animation per page, no blog plan, no plan written first.
This is the plan. Every page and post below is then rebuilt one at a time to it, and nothing is
called done until it has passed §6.

Sources: the India SEMrush exports in `ai_context/data/` (71,721 keywords, 40.7 lakh/mo, 1,959
winnable at vol ≥100 and KD ≤35) and Search Console (India = 156 of the site's 189 clicks, 13,061 of
32,548 impressions). Parsed by `scripts/keyword-research/in_read.js` into `in_keywords.json`.

---

## 1. What the data says, in four lines

1. **India is already the market.** 83% of clicks. There was no India page until today.
2. **Kerala is the softest ground anywhere in the owner's data.** `seo agency in calicut` 1,900/KD 11,
   `seo company in kochi` 590/KD 9, `freelance seo kerala` 590/KD 4. Nothing in the UK file is that soft.
3. **The metros have real volume at winnable difficulty** — but the site already earns impressions in
   Mumbai (944 on `seo agency mumbai`, position 73) and nowhere else, so Mumbai first.
4. **One product cluster is exceptional:** `garment manufacturing erp software` **5,400/KD 10**. That is a
   service page, not a blog post, and it is the single best keyword in either country's data.

Two positioning rules that differ from every other market page:
- **No "offshore".** Meaningless in India — an Indian buyer is buying a specialist down the road.
  These pages sell proximity.
- **No "audit" as a service word.** Owner's instruction, and the data supports it: the site's strongest
  cluster is *technical seo audit services* at position 51–60, i.e. Google has classified the company
  as an audit provider. Audit is the company name, not the offer. Enforced by a build-time guard on
  every India page.

---

## 2. The pages

### 2.1 Hub — `/in/` (live, rebuilt to this plan)

Signature: **the coastline** — a single orange line that draws itself along the Kerala coast from
Kochi and then reaches inland to each metro as its card scrolls into view. One-shot, stroke-dashoffset
only. Story acts: *where we are* (Kochi) → *who we build for* (Kerala sectors: textiles, spices,
marine, tourism, ayurveda) → *where the work goes* (six city doors) → *what it costs and what drives it*.

### 2.2 City pages — six, each with its own signature and its own photographs

| Page | Winnable/mo | Med KD | What the cluster asks for | Signature animation | Photo set |
|---|---|---|---|---|---|
| `/in/mumbai/` | 29,940 | 19 | agency · ecommerce · WordPress · Navi Mumbai | **the sea link** — a bridge of dashes connecting island city to Navi Mumbai, lit segment by segment | Marine Drive, Sea Link, Gateway, a D2C parcel, a warehouse |
| `/in/kolkata/` | 14,900 | 18 | consultant vs company (unique to this city) | **the two columns** — consultant and company weighed on a scale that settles | Howrah bridge, tram, Park Street, a single desk, a team table |
| `/in/kerala/` **— REBUILT 2026-09-05 to §8 parity (`in_kerala.js`, 5,131 words, 12 FAQs, founder + 4 real certificates, 14 districts, 11 photos)** | 8,010 | 14 | freelancer intent — 4 of top 7 terms | **one becomes many** — a single dot that multiplies into a team as you scroll | backwaters, tea, a loom, spices, a fishing harbour |
| `/in/vadodara/` | 6,000 | 14 | one huge term + technical buyers | **the specification sheet** — a datasheet that fills in row by row | chemical plant, pipework, a lab, Laxmi Vilas, a machine shop |
| `/in/lucknow/` | 5,740 | 17 | website development leads, not SEO | **the handover** — repo → hosting → domain → yours, four keys turning | Bara Imambara, Hazratganj, a developer, a laptop on a desk |
| `/in/calicut/` | 3,380 | 12 | pure agency intent, least contested | **the open door** — a doorway that widens as the competition bars shrink | Kozhikode beach, Mananchira, a spice warehouse, a shopfront |

Each page: 4–6 photographs of its own (no photo on two pages — asserted at build), a full-bleed lead,
one chapter band, one comparison pair. All images verified on a contact sheet before use.

### 2.3 Service pages the data demands

| Page | Cluster | Why a page, not a post |
|---|---|---|
| `/in/erp/garment-manufacturing/` | garment manufacturing erp 5,400/KD 10 · apparel manufacturing erp 170/KD 10 · textile erp | Commercial intent, one exceptional term, and Kerala/Tiruppur/Surat all sew. The best keyword in the whole dataset. |
| `/in/erp/` | best erp software 1,300/30 · manufacturing erp software india 1,000/15 · erp software price 320/15 · erp software kerala 140/13 | India needs its own ERP page — Tally/Zoho/Busy are the incumbents here, not Sage/Xero |
| `/in/seo-services/` | affordable local seo services 3,600/14 · local seo services 1,900/32 · seo packages for small business 1,600/19 | Local SEO dominates India's SEO demand; the UK/US pages are written for a different buyer |
| `/in/website-development/` | website designer near me 5,400/21 · website design services 1,900/25 · wordpress website development company 720/24 | Mobile-data-first buyers; WordPress is expected here in a way it is not in the UK page |

Excluded on purpose, with volume, so nobody re-adds them: the careers cluster (`seo jobs` 3,600,
`seo course in delhi` 1,600, `seo vacancy in vadodara` 210 — 147 keywords, 47,290/mo of the wrong
visitor), and `lucknow development authority website` (740, a government portal).

---

## 3. Blog — 16 posts in two waves of eight

Same rules as PLAN-UK §3: one cluster per post, every variant in an H2 or FAQ, 1,400–2,000 words,
FAQPage schema, 4–6 photographs of its own, a lead, a band and a pair. Indian figures and Indian
incumbents (Tally, Zoho, Busy, Marg) rather than UK ones. No price we charge. Prices that move
(GST rates, MSME thresholds) point at the source rather than being stated.

**Wave 1 — the money questions (`posts_in_1.js`)**
1. **What SEO costs in India, and what actually drives the price** — seo packages for small business 1,600/19 · seo charges in india 1,000/14 · seo cost in india 1,000/14 · seo price in india 1,000/13 · affordable seo packages 260/12 (~9,870/mo, 29 kws)
2. **Local SEO for Indian businesses: the free things first** — affordable local seo services 3,600/14 · local seo services 1,900/32 · local seo in mumbai 1,000/10 · local seo kolkata 480/10 (~15,110/mo, 47 kws)
3. **SEO freelancer or agency? An honest comparison for India** — seo consultant 1,000/30 · seo consultant kolkata 1,000/21 · freelance seo kerala 590/4 · seo freelancer kerala 590/10 (~12,460/mo, 36 kws)
4. **Technical SEO vs on-page SEO, explained** — technical seo vs on page seo **2,400/16** · on page seo vs technical seo 720/15 · on page seo services 880/30 (~5,290/mo)
5. **ERP software price in India: what the quote really contains** — erp software price 320/15 · tally erp 9 software price 260/27 · marg erp software price 210/23 · the cost of erp is 320/19
6. **Best ERP software in India — for whom, honestly** — best erp software 1,300/30 · manufacturing erp software india 1,000/15 · erp software for small business 390/28 (~8,660/mo, 32 kws)
7. **Tally, Zoho, Busy or custom: when to outgrow the incumbent** — zoho erp software 9,900/31 (head term, target the tail) · tally erp · busy erp · marg erp
8. **Shopify SEO for Indian stores** — shopify seo services 590/16 · shopify seo expert 210/8 · shopify seo company 4,400/32 (head, target the tail)

**Wave 2 — the build questions (`posts_in_2.js`)**
9. Website development cost in India — what moves the number
10. WordPress website development in India: done properly — wordpress website developer near me 390/13 · wordpress seo company 320/28
11. Ecommerce website development in India — Shopify vs WooCommerce vs custom, with GST
12. Manufacturing ERP in India — MRP, GST, e-invoicing and e-way bills in one system
13. Garment & textile ERP explained — the companion post to the service page
14. GST e-invoicing and your ERP — what has to be automatic, what must stay manual
15. Why your website is slow on Indian mobile data, and the five fixes
16. AEO and GEO for Indian businesses — being cited by AI answers when your market searches in three languages

After each wave: `run_posts.js` → `build_bloghub.js` → `gen_sitemap.js` → `tone_pass.js`. Every post
links up to `/in/` or the India service page it supports.

---

## 4. Images — the rule and the pipeline

`scripts/images/fetch_stock.js` + a manifest per page. Unsplash only (licence permits commercial use;
Unsplash+ returns 403). **Every photo verified on an ImageMagick contact sheet before it ships** —
the descriptions lie (a Covid dashboard was "numbers on a screen"; sheet music was "paperwork").

Fit to content first, then colour, then real people at work where the content is about people.
No photo on two pages — the build asserts it. Kerala pages use Kerala photographs; a Mumbai page
does not get a Bangalore skyline. Never caption stock people as "our team".

Pipeline outputs 2400 / 1400 / 700 px, EXIF stripped, real dimensions recorded in `_sizes.json`.

---

## 5. Animation — the rule

One signature per page (§2.2), never reused. One-shot, in-view, then unobserved. Transform, opacity,
clip-path and stroke-dashoffset only. Start states scoped under a class JS adds after the
reduced-motion check, so crawlers and no-JS users see a complete page. Zero running animations at
rest except the shared closing band. Scroll-driven CSS (`animation-timeline: view()`) may add drift
inside `@supports`, movement only — never opacity.

---

## 6. Definition of done, per page

- Built by a generator, not hand-edited HTML
- Own photo set, verified on a contact sheet; no photo shared with another page
- Own signature animation; `KIND`-substituted so it runs only on its page
- No "offshore"; the audit-word guard passes
- `node --check`; screenshots at 1440 and 390
- 0 horizontal overflow, 0 broken images, 0 images without width/height, 0 JS errors
- 0 elements hidden or faded with JavaScript off
- `tone_pass.js` reports `0 | 0 | 0`
- Section-hash audit: 0 blocks shared with any other page
- Linked from `/in/` and the Markets dropdown; in the sitemap
- `PROGRESS.md` appended before commit; pushed with the repo's own identity

---

## 7. Owner's design rules — 2026-09-04, point by point

- Every section on every page: its own animation. No two sections move the same way.
- Content told by images + design, like a film. A visitor who reads nothing must still get what the
  page is and what it is for.
- No limit on image count. "Even if it looks like a photographer's page" — that is acceptable.
- Full-desktop-width treatment, as `/uk/` has. Not a centred 1180px column of text.
- Hero height: the UK ratio (~576px at 1440). Not the 750px template hero.
- Build `/in/` to this standard first; owner reviews; only then the city pages and the rest.
- Rank targets on every page: SEO + AEO + GEO together. Question-shaped H2s, answer in the first
  sentence, FAQPage schema, verifiable specifics.
- No "offshore" on India pages. No "audit" as a service word anywhere (company name only).
- ai_context entries: bullets, not paragraphs. Tokens are the owner's cost.
- Rebuild order for India: `in_hub.js` → `in_city.js` → `in_story.js`. Cities inherit the clean hub;
  the story layer is hub-only.
- `L.setFinalCta(s, h2, note)` is positional. Passing an object renders `[object Object]`.
- Footer inherits the CA template: fix tagline (offshore swap doubles "dedicated") and the
- Never reuse a class from another template (.erp-benefit-row, .article-table-wrap) without checking
  the target page actually carries its CSS. Bare HTML is the result.
  "SERVING ... CANADA" cities line on every India page.

---

- **Every page gets its own design, not only its own photos** (owner, 2026-09-05: "every page new designs… storytelling, I mean the design"). A new page never inherits another page's section layouts or motion; it gets its own signature (§2.2), its own section shapes, its own reveal choreography. Shared: nav, footer, type scale, colours, final CTA. Nothing else.
- **Reveal scoping rule** (bug found 2026-09-05): a reveal keyed on `.ins .lit .x` needs `lit` on a frame *inside* `.ins`. Whatever the observer lights must be the element the CSS expects — measure with a computed-style diagnostic (`/tmp/diag_panels.js` pattern), not by eye.
- **Slates number in DOM order.** Sections replaced in place + sections inserted later drift; re-read the built HTML.

- **India rebuild order is fixed:** `in_hub.js → in_city.js → in_story.js → in_kerala.js` (each later step destructively edits what the earlier one wrote; none is idempotent alone). `in_kerala.js` asserts it is reading a fresh `in_city` skeleton.
- **Verify with `scripts/verify/jsoff.js <path> <scope>`** (JS disabled → hidden must be 0) as well as `shot.js`; scope to the page's own sections, the template nav dropdowns are hidden by design.

## 8. SERP parity — Kerala (crawled 2026-09-04, live Google)

Queries: `seo expert kerala` · `best seo company in kerala` · `freelance seo kerala`.
**The SERP is owned by individual freelancers' personal-brand sites**, not agencies. Our honest angle
(team vs freelancer, said plainly) matches the intent instead of fighting it.

| Ranking page | Words | FAQs | Price stated | Claims carried |
|---|---|---|---|---|
| jijojosephseo.in | ~8,500 | 10 | "from ₹9,000/mo" | 14+ yrs · 300+ projects · 1,000+ audits · 12k students · Google + HubSpot certs · 10+ testimonials · 7 logos · Clutch/Trustpilot badges |
| techpullers.com | ~6,500 | 6 | ₹25k–40k / 40k–75k / 75k+ per mo | 13+ yrs · 100+ projects · Clutch 5.0 · Google Partner · 6 case studies · 10+ logos · 14 cities |
| graffiti9.com/seo-expert-kerala | ~3,500 | 4 | none | 17+ yrs · 400+ projects · "10,376+ leads" · 5 testimonials · 9 logos · 3 case studies · team of 7 |
| seoexpertkiran.in | ~2,800 | 8 | from ₹6,000/mo, rec. ₹20,000 | Google/HubSpot/SEMrush certs · 73 Google reviews 4.9 · 6 logos |
| sanoopbalan.com/services/seo-expert-kerala | ~2,500 | 11 | ₹8k–50k/mo | 10+ yrs · all 14 districts listed · GEO/AEO section · Knowledge Panel |

**Every one carries:** a named person + story · years + project counts · Google/HubSpot certs ·
client logos · testimonials · a services list (technical, local/GBP, ecommerce, links, content,
reporting) · a process · a cities list · WhatsApp CTA · FAQ.

**To be directly competitive, `/in/kerala/` needs, minimum:**
- 3,500–4,500 words (currently ~1,200)
- 10–12 FAQs (currently 5), answers in the first sentence
- the founder, named, with story and photo (`assets/images/founder/aji-paul.webp` exists)
- the **real** certificates already on `/seo-audit-kochi/` (GA4, Google Ads, Semrush, Digital
  Marketing — `videos/mainvideos/Certificates/`) — genuine E-E-A-T, currently unused on India pages
- the trust strip figures (250+ projects · 128+ clients · 16 countries · 4.9/5) stated in prose too
- all 14 Kerala districts named
- services incl. GEO/AEO (only Sanoop has it — an opening)
- the market price range **attributed** ("published Kerala retainers run ₹6,000–₹75,000/mo") — never ours
- a freelancer-vs-team comparison table, which none of them have
- 6+ Kerala photographs, own signature ("one becomes many"), per-section motion
- what none of them have: honest caveats, "when a freelancer is the better answer", a written
  monthly report shown, a weekly staging URL

Same method for every other page before it is written: search → crawl top 3–5 → table → build to beat.
