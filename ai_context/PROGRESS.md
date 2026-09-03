# TechAuditPros — Progress

Full verbose history up to 2026-09-03: `archive/ai_context-verbose-2026-09-03/PROGRESS.md`.

## Live now
- Homepage; `/ca/`, `/ca/erp/`, `/ca/seo-services/`, `/ca/website-development/`, `/ca/toronto/`; `/us/`, `/us/erp/`, `/us/seo-services/`, `/us/website-development/` (cinematic layer on all four; `/us/` also carries the IMAX layer — experiment awaiting the owner's verdict).
- `blog/`: 48 posts, generated hub (newest-first, sub-topic chips, search, pagination). `sitemap.xml` generated (75 URLs). Image library + CATALOG.md (iStock licensed).
- Decisions: one global blog (no per-country blog); no US/UK city pages (no demand); About/Case Studies/Pricing were deleted in the 2026-09-02 prune (301s in vercel.json) — rebuild only if the owner picks them.

## Open queue (owner picks the order)
1. **UK set** (`/uk/`, `/uk/erp/`, `/uk/seo-services/`, `/uk/website-development/`): us_*.js pattern with genuinely UK content — £1,200/mo, UK GDPR/PECR + cookie consent, HMRC/VAT/Making Tax Digital, Xero/Sage/QuickBooks UK, AWS London, "web development agency" (5.4k, KD57), "manufacturing erp software" (880, KD15), "SEO management" (1.3k), Kochi only 4.5–5.5 h ahead; en-gb hreflang on all pairs; no city pages.
2. 30 posts (26 old-layout + the 4 from 09-02) still carry a stale header linking deleted pages → rebuild through `make_post.js` or swap header/drawer/footer from index.html.
3. `/ca/*` lacks the wide-desktop `.container` tier and `.security-badges-grid` CSS (badges stack full-width).
4. Retrofit `/blog/how-to-do-local-seo/` (40.5k cluster) to the modern anatomy.
5. Extra sections (owner to pick): About, Case Studies, Pricing, Industries hub, White-label partners, Glossary, Website Cost Calculator.
6. If the IMAX layer is approved: extend `imax.js` PAGES (and cinematic.js) to the `/us/*` service pages, `/ca/*`, homepage.

## Log (one line per session)
- 2026-08-31 — ai_context created; wide-desktop tier on homepage + CA pages; hero left gutter.
- 2026-09-02 — Blog wave 1; site-wide image pass; 60+ legacy pages pruned with a 301 map; blog hub redesign + pagination + full-width desktop; homepage wow pass; 29 iStock images (licensed); rules 9–13.
- 2026-09-03 — US set (hub + 3 service pages) from 12 SEMrush exports + competitor crawl; 31 keyword-backed posts; hub reorganized; generators committed under `scripts/`; sitemap 75 URLs. Cinematic layer on `/us/*`; rules 14–15; shot.js section argument.
- 2026-09-03 (later) — **IMAX layer on `/us/` only** (`scripts/country-pages/imax.js`, additive + idempotent, `--strip` supported): hero word-by-word headline, glint on the orange line, scroll parallax + exit fade, dust canvas; ticker strip; drifting blobs + floating brand marks + one light sweep on all 8 white sections (paused off-screen); eyebrow/headline/rule text animation with aria-labels; answer-paragraph highlights; 3D card entrance, cursor tilt, orbiting light border, pillar top-bar; magnetic buttons; promise photos travel inside their frame + orange curtain wipe; numbers-band aurora + drifting grid; overnight clock strip (6 pm NY → 9 am Kochi → overnight → 9 am NY overlap); chapter rail; cursor ring. All off under reduced motion. Verified with real motion at 1440 and 600: 0 console/page errors, 0 4xx, no horizontal overflow, all images load; 2 viewport screenshots taken, not reviewed (owner: "stop screenshotting, push"). shot.js gained `MOTION=1`. **ai_context compressed** to CONTEXT.md + this file (owner: minimum tokens); verbose originals archived under `archive/ai_context-verbose-2026-09-03/`.
