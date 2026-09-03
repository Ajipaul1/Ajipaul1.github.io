# TechAuditPros — Context (rules · design · how to work)

Static HTML/CSS/JS, no build, no package.json. One repo = GitHub Pages (ajipaul1.github.io) + Vercel (techauditpros.com; deploys are slow — curl-verify after 60–120 s). Windows, Node 24, repo HTML is CRLF (regex `\r?\n`). The owner's GitHub Desktop auto-commits and pushes "yy" mid-session: anything on disk may already be live — diff against a base commit, never `git checkout --`.

## Rules (non-negotiable)
1. **No duplicate content.** Never clone-and-reword a page for a region/city/keyword. A new page needs a different angle AND real search volume (SEMrush export). City pages only with real demand (Toronto yes; sub-100/mo no — fold into copy/schema). Every regional page: its own canonical + hreflang; grep-verify after bulk edits.
2. **AEO/GEO.** Answer-first paragraph per section; FAQPage JSON-LD text = visible FAQ text exactly; concrete numbers over vague claims.
3. **Brand.** "An AI-native team for ERP, Web & SEO" — not an audit company. No AI bluffs or unverifiable claims. Never name or rank competitors.
4. **Live data only.** Real figures (250+ projects, 4.9/5, CA$1,490/mo, US$1,800/mo, 16 countries); no invented stats/testimonials; no mock fallbacks — fail visibly.
5. **Security.** No secrets in the repo, ever (process.env only). Check the diff for credentials before committing.
6. **Preserve.** Removed sections/docs go to `archive/` with a dated name, never deleted.
7. **Images.** Use `assets/images/library/` (read CATALOG.md first; update its Used-on line in the same commit). Never `DO-NOT-USE-*`. No upscaling; small files stay card-size. iStock batch is licensed (2026-09-02).
8. **Consistency.** Copy the closest template (service → ca/erp, hub → ca/toronto, post → generator). Root-absolute links only (`/ca/erp/`). No shared header include — grep every page when nav changes.
9. **Two design tiers on every page:** mobile-first + wide desktop (`@media(min-width:1440px){.container{max-width:1480px}}`, 1850px → 1720px). A narrow column on a 1920px screen is a defect.
10. **Content pages are image-rich and animated:** Key Takeaways box, 2–3 captioned figures (`max-height:420px`), scroll-reveal applied by JS, `prefers-reduced-motion` respected, nothing blocks reading.
11. **Keyword pages:** crawl the current #1–3 first; ours must out-answer it (deeper, FAQ schema, honest specifics).
12. **Blog:** one topic per post, cover EVERY researched cluster, every post added to `scripts/build_bloghub.js` and the hub regenerated (never hand-edit blog/index.html).
13. **Token economy:** text checks first (shot.js prints errors/4xx/overflow/broken images); at most 2 viewport screenshots per change, never full-page; never `cat` a page or export — grep/sed/scripts; don't re-read files you wrote; one chat per task; read only this file + PROGRESS.md at start.
14. **Animation layers are scripts.** Country pages carry the cinematic layer (`cinematic.js`); `/us/` also carries the IMAX layer (`imax.js`). Brand-palette alphas only, every motion off under reduced motion, layers are re-run, never hand-edited.

## Design system (canonical page: /ca/erp/)
- Tokens: `--paper #FFFFFF --paper-alt #F3F6F5 --ink #0E2A3E --ink-soft #4B5B67 --ink-faint #8595A0 --line #DCE3E1 --line-strong #C3CDCA --orange #D9531E --orange-dark #B84313 --orange-tint #FCE8DF --navy-deep #0B2036 --good #1B7A4D --good-tint #E3F3EA --warn #B8860B --bad #C13A2E`. No other hex.
- Type: IBM Plex Sans (headings 650, -0.02em, text-wrap:balance; body ink-soft, lh 1.6–1.7); IBM Plex Mono eyebrows (.72rem uppercase .14em, rotated-square `::before`).
- Layout: `.container` 92% / 1180px + wide tier; sections 88px alternating paper/paper-alt; a full-bleed band puts its background on the `<section>`, never on a child inside `.container`.
- Header: sticky two-tier (navy utility bar + 96px white bar). Dropdown keeps the `.nav-dropdown::after` hover bridge; SVG line icons, never emoji; flags from flagcdn. Mobile = right drawer.
- Hero `.tap-new-hero`: wave canvas, cursor spotlight, rotating text, side text; `background-clip:text` only on leaf spans and only inside `:hover`.
- Page skeleton: header → hero → answer-first → what-is row → advantages grid → promise (photo) → process → why-us badges → FAQ (unique section id) → final CTA band → footer.
- Cinematic layer (/us/*): full-viewport hero with aurora/grid/vignette, progress bar, dot-grid sections, dark `.band-cinema` chapters with a photo, drawing timeline, count-ups, card spotlight.
- IMAX layer (/us/ only, experiment): word-by-word h1 + glint + scroll parallax + dust canvas; ticker strip; white sections get drifting blobs, floating brand marks, one light sweep; eyebrow/headline/rule text animation; answer highlights; 3D card entrance, cursor tilt, orbiting light border, pillar top-bar; magnetic buttons; promise photos travel inside their frame with an orange curtain wipe; numbers-band aurora + drifting grid; overnight clock strip in how-it-works; chapter rail; cursor ring.
- Blog: hub generated by `build_bloghub.js`; post anatomy = lead figure → Key Takeaways → answer-first → sections with figures → CTA → author; ≥1280px sticky TOC.
- Bugs fixed once — don't reintroduce: dropdown hover gap; missing CSS on cloned pages (CA why-us badges still lack grid CSS); nested background-clip overlap; CTA band bg on a nested child; relative links; multi-line `.replace` on CRLF files; headless Chrome clamps <512px (test narrow at ≥560).

## How to work
- **Verify:** `node scripts/verify/server.js` (127.0.0.1:8934), then `node scripts/verify/shot.js us/ name 1440 0 [scrollY|selector]` — path without leading slash; `MOTION=1` for real animations; playwright-core is npm-installed in the session scratchpad (set `NODE_PATH`). Hover tests: stepped `mouse.move`, never `.hover()`.
- **Generators (repo root):** posts `node scripts/blog/run_posts.js posts_x.js` → `node scripts/build_bloghub.js`; country pages `scripts/country-pages/us_*.js` (copy to `uk_*.js`, rewrite ALL content) + `nav_patch.js`; layers `node scripts/country-pages/cinematic.js` then `imax.js` (`imax.js --strip` before re-running cinematic); `gen_sitemap.js` after any page change (set its BASE to the last pushed commit; add new country folders to its list); `update_catalog.js` for Used-on lines. Keyword exports: `scripts/keyword-research/parse.js`, `termgrep.js` (output to files).
- **Git:** commit to main; author Aji Paul <ajipaul96@gmail.com>; trailer `Co-Authored-By: Claude <model> <noreply@anthropic.com>`; one logical change per commit; check the diff for secrets and hreflang/canonical damage; add a PROGRESS.md line before every commit.
- Verbose originals of these docs (with rationale): `archive/ai_context-verbose-2026-09-03/`. Read only if a rule's reasoning is needed.
