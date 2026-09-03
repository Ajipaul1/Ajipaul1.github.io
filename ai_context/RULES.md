# TechAuditPros (techauditpros.com) — Non-Negotiable Rules

This file is the law for this repo. Read it before writing or editing any content.
If a request conflicts with a rule here, flag the conflict to the owner (Aji Paul) instead of silently picking one side.

---

## 1. No duplicate content — SEO, AEO, GEO

This is the rule the owner has pushed back hardest on. Do not violate it.

- **Never clone a page and reword it for a new region/city/keyword.** Google (and AI answer engines) treat near-identical pages as duplicate content, and it actively hurts every page involved, not just the new one.
- Before building any new page (a new city, a new service, a new country), check whether the topic is **genuinely distinct** from what already exists. If the honest answer is "it's the same pitch with different city names swapped in," don't build it as a standalone page — fold it into an existing page's copy, FAQ, or schema `areaServed` list instead.
- A new page earns its existence by having a **different angle**, not just different words: a different buyer question, a different keyword cluster with real search volume behind it, a different comparison, a different depth of detail.
- **City/location pages specifically:** only build a dedicated page for a city when real keyword data shows meaningful, genuine search demand for that city (see `/ca/toronto/` — built because Toronto had real cross-service volume in the SEMrush export; Vancouver/Calgary/Quebec/Surrey/Ottawa did NOT get pages because their combined volume was 20-70/mo — that demand was folded into service-page copy and schema instead of thin pages).
- **Canonical + hreflang discipline:** every regional page (`/ca/`, `/us/`, `/au/`, `/uk/`, `/ae/`) needs its own correct `rel="canonical"` pointing at itself, not at the global homepage. Double-check this after any find/replace across regional pages — a prior session accidentally repointed `x-default` hreflang and the Organization JSON-LD `"url"` at a regional URL during a broad find/replace. Always grep and verify after bulk edits.
- When in doubt, do the keyword research first (real SEMrush/Keyword Magic exports, not assumptions) and let real search volume decide whether a page is worth building. See `PROGRESS.md` for the most recent keyword research and its findings.

## 2. AEO / GEO — write to be cited, not just ranked

TechAuditPros is positioned as an **AI-native team**, so content should practice what it sells:

- Lead sections with a direct, answer-first paragraph (the "answer-section" pattern already used on every page) — state the plain-English answer before the elaboration. This is what gets pulled into Google AI Overviews, ChatGPT, and Perplexity answers.
- Every service/FAQ page should carry `FAQPage` JSON-LD, and the **visible FAQ text must match the schema text exactly** — don't let them drift.
- Prefer concrete numbers over vague claims ("40–57% below GTA agency rates" beats "affordable pricing").

## 3. Brand identity — no "audit" positioning, no AI bluffs

- The company is **not** an audit company. Don't frame the brand around "website audits" as the core identity — the live audit-tool panel was deliberately removed from the homepage hero for this reason (archived, not deleted — see `archive/homepage-sections-2026-08-31.html`).
- Position as: **"an AI-native team for ERP, Web & SEO."**
- Do not write marketing copy that makes unverifiable AI claims or "AI bluffs" (the owner's words) — no "no contracts because AI" type non-sequiturs, no invented capabilities. Every claim should be something the team can actually back up.
- Never name or rank real competitors in blog content or comparison copy. Write honest, general buyer's-guide content instead (see `blog/full-service-vs-diy-erp-agency-canada.html` as the reference pattern).

## 4. Live-data-only, no fake success

- Never fabricate stats, testimonials, or "results" that don't correspond to something real. Numbers used across the site (250+ projects, 4.9/5 rating, CA$1,490/mo starting rate, 16 countries) are the owner's real figures — reuse them consistently, don't invent new ones per page.
- Don't add fallback/mock content that pretends to be live data if a real integration fails. Fail visibly, don't fake success.

## 5. Security

- **Never commit secrets.** A prior session found and removed hardcoded Supabase service_role keys, Google PageSpeed API keys, and DataForSEO credentials from `api/audit.js` — they were committed as `||` fallback defaults in a public repo. All secrets must come from `process.env.*` with no hardcoded fallback, ever.
- Before committing, check `git status` / `git diff` for anything that looks like a credential, token, or connection string — even in a file whose name looks innocuous.

## 6. Content preservation

- When removing a section from a page (e.g., during a redesign), **archive it, don't delete it** — copy the removed HTML verbatim into `archive/` with a dated filename. The owner has explicitly asked not to lose removed content in case it's reused later.

## 7. Image usage

- Reusable stock/source photography lives in `assets/images/library/`, cataloged in `assets/images/library/CATALOG.md`. **Check that catalog before sourcing a new image for any page** — there may already be one that fits.
- Never publish a file prefixed `DO-NOT-USE-*` — those are unlicensed/watermarked preview comps kept for reference only.
- Note each image's native resolution before using it large — several library images are small (under 800px wide) and are marked card/thumbnail-only in the catalog. Don't stretch them into full-bleed heroes.
- After using a library image on a page, update its `**Used on:**` line in `CATALOG.md` in the same commit.

## 8. Design consistency

- The **purchase island** equivalent here is the established page template first built for `/ca/erp/` — full two-tier header, wave-canvas hero, dropdown nav, promise section, process steps, why-section, FAQ accordion, full-bleed final CTA, footer. Every new Canada page should be built by **copying that template and editing content**, not rebuilt from scratch — this is what keeps 2000+ line pages consistent and avoids reintroducing bugs that were already fixed once (dropdown hover-gap, missing CSS on cloned pages, nested `background-clip` overlap, etc.). See `DESIGN_SYSTEM.md` for the full breakdown.
- All internal links must be **root-absolute paths** (`/ca/erp/`, not `erp/` or `../erp/`) — relative paths break the moment a page is nested or cloned. This has caused real bugs before.

---

## 9. Full-page design standard (owner rule, 2026-09-02)

Every page — existing and new, including all future country pages (US next) — ships with **two explicit design tiers**:
- **Mobile-first base** (what already exists): single column, drawer nav, no sidebar clutter.
- **Wide-desktop tier**: `@media (min-width:1440px){ .container{ max-width:1480px; } }` and `@media (min-width:1850px){ ... 1720px }` (or page-appropriate equivalents). Desktop must USE the screen — a narrow centered column on a 1920px monitor is a defect, not a style. Grids widen (blog grid goes 4-col), long articles gain a sticky "On this page" TOC in the free space (see DESIGN_SYSTEM.md).
Never bolt the wide tier on later; it ships with the page.

## 10. Content pages are image-rich and animated (owner rule, 2026-09-02)

- Pages tell their story WITH images: section splits, card thumbnails, 2–3 captioned figures per blog post, a "Key Takeaways" navy box at the top of every new post (AEO-quotable).
- Reuse library images freely when the content fits ("use it many more times if content demands it" — owner). Check `assets/images/library/CATALOG.md` first; track placements in its Used-on lines (blog hub pool usage is noted at the top instead).
- Article figures are capped (`max-height:420px; object-fit:cover`) — never let near-square images render as full-column towers.
- Motion: scroll-reveal on cards/sections (IntersectionObserver, classes applied BY JS so no-JS users see everything, `prefers-reduced-motion` respected) + the brand wave-canvas hero where a page deserves a "wow" opening. Never animation that blocks reading.
- No artificial image upscaling — it blurs and has zero SEO value. 612px sources are fine at card/split sizes.

## 11. Competitor-crawl rule for new keyword-targeted pages (owner rule, 2026-09-02)

Before building any page that targets a keyword (country pages, service pages, major blog posts):
1. Search the main keyword and identify the CURRENT #1–3 ranking pages.
2. Crawl/fetch the top page (WebFetch; screenshot if it blocks crawlers — both approaches used successfully for Numerique.ca/Witify.io during the /ca/erp/ build).
3. Build ours to be MORE complete and better structured than that page: answer-first opening, deeper sections, FAQ schema, honest specifics the competitor lacks.
The page is not done until it credibly out-answers the current #1.

## 12. Blog program rules (owner rule, 2026-09-02)

- Blogs must be genuinely useful and rank-worthy for SEO + AEO + GEO: answer-first intro, Key Takeaways box, real substance, no competitor-naming, no fluff — and ZERO duplicate content between posts (each post owns ONE topic/keyword cluster).
- **Cover every keyword cluster from the research — don't skip any.** The owner is not coming back to re-plan: when keyword files arrive for a market, extract ALL clusters (head terms → service pages; questions → blog posts) and maintain the full topic list in PROGRESS.md until every item ships.
- Every new post: add to `scripts/build_bloghub.js` posts array + regenerate the hub, so it's never orphaned.

## 13. iStock / paid-stock license gate (2026-09-02)

29 iStock images entered the library cataloged but LICENSE-GATED (see CATALOG.md banner): none may appear on a live page until the owner confirms they were downloaded under an iStock account. Same gate applies to any future paid-stock batch. Unsplash/Pexels/Pixabay files remain the preferred, always-safe pool.
