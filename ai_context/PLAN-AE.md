# PLAN-AE — the UAE pages, planned from the data before anything is built

Status: **APPROVED by the owner 2026-09-07.** Live: `/ae/` (v2), `/ae/abu-dhabi/`, `/ae/ecommerce-website-development/`. Next: `/ae/dubai/`, `/ae/erp/`, construction, automotive, seo-services, website-development, then the 10 posts. Design rules in §9 override §4 where they differ.

Sources: six SEMrush exports in `ai_context/data/ae/` (git-ignored), parsed by
`scripts/keyword-research/ae_read.js` into `ae_keywords.json` — 32,989 keywords, 2.6 lakh searches/month;
**144 winnable** (vol ≥100, KD ≤40, careers/courses/how-to excluded) worth 58,310/month. Search Console shows
no UAE impressions yet (HANDOVER §5.2), so this is a positioning play the data says is winnable, not a demand we
already have.

---

## 1. What the data says, in six lines

1. **UAE is harder than India.** Every Dubai head term is out of reach for now: `seo agency dubai` 8,100/KD51,
   `seo company dubai` 8,100/53, `erp companies in dubai` 3,600/48, `best seo company in dubai` 2,900/42. The
   winnable threshold had to move to KD ≤40 (India used ≤35). Head terms are a year-two target.
2. **Abu Dhabi is the softest big cluster anywhere in the owner's data.** `seo services abu dhabi` **4,400/KD22**,
   `best seo agency in abu dhabi` 1,300/24, `seo consultant abu dhabi` **1,300/11**, `seo company in abu dhabi`
   480/23, `seo service in abu dhabi` 480/29, `website development company abu dhabi` 390/16. ~8,500/month.
   **First city page.**
3. **Dubai's tail is winnable now:** `ecommerce website development company dubai` **1,600/22**, `website
   development dubai` 1,600/37, `seo expert dubai` 1,000/29, `local seo packages dubai` 480/16, `erp software
   dubai` 480/33, `best erp software solution provider in dubai` 320/16, `top erp companies in dubai` 320/25.
4. **Two ERP sector terms are almost free:** `construction erp software uae` **480/KD5** (+170 + 140 for the
   generic construction terms) and `automotive erp software` **590/KD7**; `real estate erp software` 140/8. These
   are pages, not sections.
5. **AI Overviews sit on 53% of the winnable SERPs** (1% of all keywords, 53% of the ones we can win). AEO/GEO is
   not a section on these pages; it is how every page is written. Answer first, evidence second, FAQ schema.
6. **Arabic is a note, not a page:** 170 Arabic-script keywords total 660 searches/month; only `شركة seo` (170/21)
   matters. Bilingual UI is a trust signal on the ERP pages (RTL invoices), not a keyword target. Sharjah, Ajman,
   RAK and Al Ain have no winnable volume; **no pages for them**.

Positioning that differs from India: the buyer here *is* buying a team in another country — the whole value is a
Kochi team four hours from Dubai on the same working week, at a fraction of the AED 8,000+/month a Dubai agency
charges (the site's own archived comparison). So "offshore" is not banned here as it was for India — but the pages
will say **"in Kochi, four hours away"** rather than lean on the word. **Owner to confirm.** "Audit" stays a
company name only, everywhere.

---

## 2. The pages — nine, in the order the data says

| # | Page | Winnable/mo | Cluster it owns | Why this position |
|---|---|---|---|---|
| 1 | `/ae/` — UAE hub | ~4,000 | `seo united arab emirates` 720/35 · `best seo company in uae` 390/33 · `erp software uae` 590/22 · `erp solution providers in uae` 390/25 · `erp system in uae` 260/18 · `ecommerce website development uae` 720/24 · `website development uae` 170/22 | The film opening (§4). Every other page hangs off it |
| 2 | `/ae/abu-dhabi/` | ~8,500 | the whole Abu Dhabi SEO cluster + `website development company abu dhabi` | Softest big cluster in the data; SERP is small local agencies (§6) |
| 3 | `/ae/ecommerce-website-development/` | ~3,700 | `ecommerce website development company dubai` 1,600/22 · `companies in dubai` 590/25 · `uae` 720/24 · `dubai` 390/40 · `company` 390/28 | Best web cluster; a service page, city-agnostic with Dubai first |
| 4 | `/ae/dubai/` | ~4,500 (tail) | `seo expert dubai` 1,000/29 · `local seo packages dubai` 480/16 · `seo packages dubai` 320/25 · `website development dubai` 1,600/37 · `best website development company in dubai` 390/29 · `erp software dubai` 480/33 · `top erp companies in dubai` 320/25 | Wins the tail now, is the page that grows into the 8,100 head terms |
| 5 | `/ae/erp/` | ~2,500 | `erp software uae/dubai` · `erp solution providers` · `erp software companies in uae` 260/16 · `best erp software in uae` 170/11 · `supply chain management erp software` 390/22 · `manufacturing erp software` 210/26 · `erp and accounting software` 590/36 | The compliance page: VAT 5%, Corporate Tax 9%, e-invoicing PINT-AE (Phase 2 July 2026), WPS/SIF, EOSB, free zone vs mainland |
| 6 | `/ae/erp/construction/` | ~800 | `construction erp software uae` **480/5** · `construction erp software` 170/16 · `erp software for construction industry` 140/11 | Near-free; UAE's largest sector; project costing, subcontractors, retention, WPS |
| 7 | `/ae/erp/automotive/` | ~600 | `automotive erp software` **590/7** | Near-free; dealers, workshops, parts — Dubai's re-export trade |
| 8 | `/ae/seo-services/` | ~7,000 (mixed intent) | `search engine optimization seo services` 4,400/16 · `seo consulting services` 390/17 · `ecommerce seo services` 720/9 · `international seo expert` 1,000/22 · `seo agency` 880/31 | Generic-intent terms with UAE geo; written answer-first because AI Overviews own these SERPs |
| 9 | `/ae/website-development/` | ~4,000 | `website design and development services` 1,900/40 · `website development company` 720/19 · `agency` 590/19 · `real estate website development company` 210/16 · `cms website development company` 170/15 · `cost in dubai/uae` 140/11 ×2 | Includes the cost section (attributed AED ranges) and the real-estate angle |

Nine pages, all from the data. Not planned (no volume): Sharjah, Ajman, RAK, Al Ain, Arabic-language pages.

### 2.1 Blog — ten posts, one wave (`posts_ae_1.js`), after the pages
1. SEO cost in the UAE — what AED 900, AED 2,500 and AED 22,000 a month each buy (attributed to ranking pages)
2. Abu Dhabi or Dubai agency? What actually differs
3. Local SEO packages in Dubai — what to do free first (`local seo packages dubai` 480/16)
4. Ecommerce SEO services — the structural fixes for UAE stores (`ecommerce seo services` 720/9)
5. International SEO from the UAE — GCC, hreflang, Arabic/English (`international seo expert` 1,000/22)
6. Construction ERP in the UAE — retention, subcontractors, WPS, VAT on progress billing
7. Automotive ERP — dealer, workshop, parts, re-export
8. VAT, Corporate Tax and PINT-AE e-invoicing in your ERP — automatic vs manual
9. Website development cost in Dubai and the UAE (`cost in dubai/uae` 140/11 ×2)
10. AEO/GEO for UAE businesses — AI Overviews on half the SERPs, in two languages

---

## 3. What ranks (live, 2026-09-07) — and what parity means here

| Query | Who ranks | What they carry |
|---|---|---|
| `seo company in dubai` | seo.ae (~4,500 words, 10 FAQs, **AED 900–2,500/mo tiers**, 12+ yrs, 100+ clients, 7 emirates + GCC listed, AEO/GEO service named), BeOnTop (60+ SEOs, 750+ sites), Pentamedia, Haris&Co, Clutch/Semrush lists | prices, emirate lists, GCC reach, "Google certified" |
| `erp software uae` | gear-up.ae (~8,500 words, "1,247+ UAE clients", **14-day implementation or refund**, VAT/CT/WPS/PINT-AE/EOSB/free-zone workflows, Arabic RTL, 8 testimonials, 18 logos, 4 case studies, WhatsApp ×5), facts.ae, TrueBays top-10 (per-user USD prices: Dynamics ~$95, NetSuite ~$99, Odoo $20) | compliance depth, Arabic invoices, guarantees |
| `website development company in dubai` | digitalgravity.ae (~8,000 words, **50+ FAQs**, **AED 8k–40k design / AED 15k–100k+ development**, 950+ clients, 200+ staff, MENA Search Awards, 7 video testimonials), Webcastle, Tomsher, FiveFour54 | published AED ranges, awards, portfolio |
| `seo services abu dhabi` | Pentagon (pentame.com), Online IT Solutions, 10X Digital, Tranetech, Integrate Solutions, a Gulf News classified | small local agencies, thin pages — the opening |

**Parity minimums for every UAE page:** 4,000+ words · 12 FAQs answered in the first sentence · compliance
named item by item (VAT 5%, CT 9%, PINT-AE Phase 2 July 2026, WPS/SIF, EOSB, free zone vs mainland, data
residency) · AED market ranges **attributed** (AED 900–2,500 SEO tiers; AED 8k–40k / 15k–100k+ web; per-user
USD ERP) — never ours · the Kochi-team argument said first and honestly (no Dubai office; four hours away; same
working week Mon–Fri with the UAE's Sat–Sun weekend) · WhatsApp CTA (every ranking page has it) · what none of
them have: what you keep, the weekly staging URL, "when a Dubai agency is the better answer".

---

## 4. The design — a film opening, and nothing borrowed

Owner's brief (2026-09-07): *"make the main page beautiful, like in a Malayalam movie or a famous movie when the
movie is starting — that writes the main thanks and who works about in the background; the core of the idea
displayed with beautiful images and animation; the SEO/GEO/AEO content is the story of what the page is about."*
And: *"don't take the other pages' design — experiment with new design."*

### 4.1 `/ae/` — "Title Sequence"
The hub opens as a **title sequence**, not a hero. Full-viewport, letterboxed (2.39:1 black bands), film grain
(SVG `feTurbulence` data-URI overlay, 4% opacity), no navigation chrome until the sequence ends (nav slides in
when the first chapter arrives; skip link + "Skip titles" button always visible for accessibility).

**The cards, in order, each over a slow, movement-only backdrop** (scroll-driven `animation-timeline: view()`,
transform only; JS-off shows the whole sequence as a static poster stack):
1. *"TechAuditPros presents"* — letters assemble from scattered positions (transform only, offsets measured in
   JS like Kerala's constellation but the object is type, not dots). Backdrop: desert dunes, dusk.
2. *"a team from Kochi"* — small mono caption *four hours from Dubai · same working week*. Backdrop: Kochi
   water → dissolve to the Gulf (two plates cross-fade by clip-path, movement only).
3. *"for Dubai · Abu Dhabi · the Emirates"* — three city names light left to right with a hairline that draws
   between them. Backdrop: Dubai skyline from the water.
4. *"in three disciplines"* — SEO · websites · ERP appear as a **crew list** (film credit typography: role left,
   name right): "Search — a specialist who reads Search Console daily", "Websites — a developer who ships",
   "Systems — an engineer who has stood on a shop floor". Backdrop: Abu Dhabi Corniche.
5. *"written to be quoted"* — the AEO/GEO card: the sentence *"53% of the searches on this page's shelf are
   answered by an AI Overview before a click"* types in; then the page's own first answer paragraph appears
   as the first *quotable* — this is where the sequence becomes the story.
6. **Title card:** *"United Arab Emirates"* + the H1 beneath. The letterbox bands slide off; the page begins.

**Signature (never reused):** the **assembling title** — type that gathers from scatter — and the **letterbox
that opens**. Every later chapter is introduced by a **slate** (a clapperboard graphic that snaps shut: the top
arm rotates 12°→0° on a hinge, transform only) carrying "Reel 2 · Abu Dhabi", "Reel 3 · What it costs", etc.

**Chapters (the story = the content):** Reel 1 *Where we are and are not* (no Dubai office, said first; the
four-hour argument; the AED comparison attributed) · Reel 2 *The Emirates, one by one* (Abu Dhabi, Dubai, and
why not Sharjah — honest) · Reel 3 *Three disciplines, one crew* (services as a crew list with real work stills)
· Reel 4 *The compliance layer* (VAT / CT / PINT-AE / WPS / EOSB / free zone, as a **film strip**: sprocket-holed
horizontal strip of six frames that scrolls sideways with the page, movement only) · Reel 5 *What it costs*
(AED ranges attributed, as end-credit "with thanks to" cards naming the sources) · Reel 6 *Before you hire
anyone* · **End credits**: the FAQ as a slow credit roll (12 questions; answers expand; the roll is a
`view()` movement, never opacity) · final CTA as the *"a TechAuditPros production"* card with WhatsApp.

Mobile: letterbox becomes a **portrait poster** (4:5), cards stack vertically, the film strip becomes a
vertical strip, the credit roll is a normal list. All start states under `html.ae-on`; JS off = complete poster
+ page; `overflow-x:clip` on every reel; verified with `shot.js`, `jsoff.js`, `overflow.js` at 1440 and 390.

### 4.2 City and service pages — each its own picture, none of them a sequel
| Page | Signature (one-shot, transform/clip only) | Photo set (own, contact-sheet verified) |
|---|---|---|
| `/ae/abu-dhabi/` | **the Corniche line** — a single horizon line that becomes the skyline as it draws | Corniche, Sheikh Zayed Grand Mosque, Al Reem towers, a majlis, a date market |
| `/ae/dubai/` | **the split screen** — Dubai on the left, Kochi on the right, the seam slides to show four hours' difference (two clocks) | Marina, Creek abras, Deira souk, JAFZA containers, metro |
| `/ae/ecommerce-website-development/` | **the parcel that opens** — a box unfolds (clip-path) into the six things a UAE store needs | warehouse, courier bike, Al Quoz shelves, a phone at checkout |
| `/ae/erp/` | **the ledger that balances** — VAT, CT, WPS columns that reconcile to one line | Mussafah workshops, DIP warehouses, an FTA-style invoice mock |
| `/ae/erp/construction/` | **the tower that rises** — floors stack as progress-billing milestones | cranes, rebar, site office, a retention schedule mock |
| `/ae/erp/automotive/` | **the odometer** — digits roll to parts, service, sales | showroom, workshop bay, parts shelves, Sharjah used-car lots |
| `/ae/seo-services/` | **the query that becomes an answer** — a search box types, an AI-Overview card assembles from the page's own sentences | none staged; real Search Console shapes (illustrative, labelled) |
| `/ae/website-development/` | **the wireframe to the storefront** — grey blocks fill with real screens | real work screens from `/results/` where permitted |

Rules carried over (PLAN-IN §7): one signature per page, never reused; per-section motion different on every
page; photos unique per page, asserted at build; reveal start states only under a JS-added class; slates
numbered in DOM order; build order fixed and documented; `overflow.js` + `jsoff.js` before any screenshot review.

---

## 5. Images
Unsplash search harvests (landscape) → manifests `manifest_ae_hub.js`, `manifest_ae_<page>.js` → `fetch_stock.js`
→ contact sheet → owner-visible check before use. Subjects: Dubai skyline from the water · Marina · Creek abras
· Deira spice/gold souk · Sheikh Zayed Grand Mosque · Abu Dhabi Corniche · Al Reem · desert dunes at dusk ·
JAFZA/Jebel Ali containers · Mussafah/Al Quoz industrial · construction cranes · car showroom · metro · date
market · a Kochi water plate for the Kochi→Gulf dissolve. People only where the content is about people.
Estimated 60–70 photographs across nine pages + 40 for the ten posts.

## 6. Definition of done (every page)
Word count and FAQ count at parity or above (§3) · SERP re-checked the day it is built · compliance items current
and pointing at the FTA/MoHRE sources for values that move · AED figures attributed · no "audit" as a service
word · no price of ours · own photos, contact-sheet verified · own signature · JS-off complete · no overflow at
1440/390 · 0 JS errors · hreflang `en-ae` + `x-default` · FAQPage + Service + Breadcrumb schema · linked from
nav/footer on every page · sitemap regenerated · PROGRESS.md appended · committed and pushed.

## 7. Build order
`ae_hub.js` (§4.1) → `ae_abu_dhabi.js` → `ae_ecommerce.js` → `ae_dubai.js` → `ae_erp.js` → `ae_erp_construction.js`
→ `ae_erp_automotive.js` → `ae_seo.js` → `ae_web.js` → `posts_ae_1.js` → nav/footer wiring (`nav_patch.js`
pattern) → `gen_sitemap.js` (add `ae` to dirs) → `tone_pass.js`. Each page: research → build → verify → PROGRESS →
commit → push, one at a time.

## 8. Decisions needed from the owner before building
1. **"Approved"** for this plan (pages, order, design).
2. **"Offshore" on UAE pages** — allowed, or avoided as on India? (Plan assumes: avoided; "in Kochi, four hours
   away" instead.)
3. **A Dubai phone/WhatsApp number?** Every ranking page has a +971 number. If none exists, the pages say so and
   use the Indian WhatsApp — honest, but weaker. Owner to decide.
4. **The AED 3,800/month figure** from the archived homepage pricing card — is it still a price we publish
   anywhere? If not, it stays out (tone_pass already treats it as "our price").

## 9. Design rules added after the owner saw /ae/ v1 (2026-09-07)

- **Keep the title-sequence hero. Nothing else from the cinema.** No clapperboards, sprockets, credit rolls or "reel"
  labels in the body of any page. The hero's letterbox black is the only black on the site.
- **Brand palette only:** `--paper` #FFFFFF, `--paper-alt` #F3F6F5, `--navy-deep` #0B2036, `--orange`. Dark sections
  are navy-deep, never #06090F / #08111C / #0B1420. Section heads use the shared `.eyebrow` + h2 pattern like `/uk/`.
- **Every section is image-led**, the way the hero is: large photographs carry the argument; text explains them.
  The hub carries 22 photographs; a city or service page 8–14.
- Motion rules unchanged (§4.2): one signature per page, start states under a JS-added class, transform/clip only,
  `overflow.js` + `jsoff.js` at 1440/390 before any screenshot review.
