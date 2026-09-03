# TechAuditPros — Progress & Session Log

Read this before starting work so you know what's already done and what's pending. **Append a dated entry here describing what you did, before you commit** — same discipline as any other project with an `ai_context/` folder.

---

## Current state (as of 2026-08-31)

**Site:** static HTML/CSS/JS, no build system, same repo backing GitHub Pages (`ajipaul1.github.io`) and Vercel (`techauditpros.com`).

**Live and current:**
- Homepage (`index.html`) — full light-theme redesign (white/navy/orange), two-tier header, animated wave hero, "AI-native team for ERP, Web & SEO" positioning (not "audit").
- `/ca/` — Canada homepage, `/ca/erp/` — Canada ERP deep-dive page (canonical template for new Canada pages).
- `/ca/seo-services/` and `/ca/website-development/` — new Canada service pages (added 2026-08-31), each built from real SEMrush keyword research (see below).
- `/ca/toronto/` — new Canada city hub page (added 2026-08-31), links out to the three service pages rather than re-explaining them.
- `blog/` — 26+ posts, unified global blog (deliberately **not** forked into a separate Canada-only blog — see decision below).
- `assets/images/library/` — a running, git-tracked stock-photo library with `CATALOG.md` documenting every image (subject, emotion, colors, best-use, resolution caveats, what it's currently used on). **Check this before sourcing any new image.**

**Pending / next up:**
- Blog content batch: first wave of 3 SHIPPED 2026-09-02 (`what-is-a-content-audit`, `website-design-vs-development`, `what-is-erp-software-plain-english` — one per service pillar, each linking to its `/ca/` service page, cards added to `blog/index.html`). ~6 remaining from the planned list (Local SEO city guide, AI SEO & GEO explained, ERP vs CRM, Manufacturing ERP, Toronto web-design buyer's guide, landing-page conversions).
- Open question, not yet confirmed by owner: whether to trim `/ca/`'s ERP promise section now that `/ca/erp/` covers the topic in depth (offered, no answer yet — don't do it without confirmation).
- Explicitly deferred by owner: 83 unused video files (~1.3GB) slowing Vercel builds. **Do not touch unless asked again.**

---

## Keyword research findings (2026-08-31)

Owner supplied 6 SEMrush Keyword Magic Tool exports for the Canada market: broad-match + questions-match for each of ERP software, SEO, and Website Development (~145k rows total). Full methodology and raw findings are not stored in this repo (they lived in a session scratchpad) — if this research needs to be redone or extended, ask the owner for fresh exports rather than assuming old data is still current.

Headline findings that should keep informing content decisions:

- **City-level demand is real but concentrated.** Toronto was the only city with meaningful cross-service search volume. Vancouver had real but ERP-specific demand (~160/mo). Calgary, Quebec (one strong French term: "logiciel erp quebec"), Surrey, and Ottawa were each in the 20-70/mo range — **not enough to justify standalone pages** (see `RULES.md` §1). This is why `/ca/toronto/` exists and the others don't.
- **Website Development has the strongest commercial keyword cluster** of the three categories: "web design"/"website design" (8,100/mo, Commercial intent), "website design company," "web design services," "website development company," etc.
- **SEO's real angle is "local SEO" (3,600/mo) + an AI-SEO/GEO cluster** ("ai seo," "ai for seo," "ai seo agencies near me") that's directly on-brand given the AI-native positioning — lean into this rather than generic "SEO agency" copy.
- **ERP's volume is mostly definitional** ("what is erp," "erp system meaning") rather than commercial. Real buyer-intent signal exists on "erp implementation," "cloud erp," "manufacturing erp software" (a usable vertical angle).
- **Best AEO/blog targets found:** "what is a content audit" (8,100/mo — the single highest-volume keyword across all 6 files), "what is a landing page conversion" (3,600/mo), "what to look for in a good toronto web designer" (170/mo, matched almost verbatim into a planned blog title).

Planned blog posts (not yet written), grouped by which service page they'd feed:
- ERP: "What Is ERP Software? A Plain-English Guide," "ERP vs CRM: What's the Difference?", "Manufacturing ERP: What Small Manufacturers Actually Need"
- SEO: "What Is a Content Audit?", "Local SEO in Canada: A City-by-City Guide," "AI SEO & GEO Explained"
- Webdev: "Website Design vs. Development: What's the Difference?", "What to Look for in a Toronto Web Design Company," "What Is a Landing Page Conversion?"

## Decisions made and why (so they don't get re-litigated)

- **One global blog, not a separate Canada blog hub.** Owner explicitly chose this over forking a Canada-specific blog section, to avoid two indexes competing for the same topics (duplicate-content risk). Canada-relevant posts get tagged/surfaced on `/ca/*` pages instead.
- **Toronto-only city page**, everywhere else folded into service-page copy/FAQ/schema. Owner explicitly chose this over building a thin page per city, given the volume data above.
- **No "audit" branding.** Owner: "our company have no connections with audit." The live website-scan/audit tool panel was removed from the homepage hero (archived in `archive/homepage-sections-2026-08-31.html`, functional code untouched) and positioning shifted to "AI-native team for ERP, Web & SEO."
- **No emoji in the nav dropdown** (elsewhere on a page, emoji are fine and already the established pattern) — professional SVG line icons only, per explicit, heated owner feedback.

## Earlier milestones (pre-2026-08-31, for context)

- Full homepage redesign: dark indigo/teal theme → light theme (white/navy/orange), loosely modeled on a reference site the owner screenshotted (mrappliance.ca), not a copy.
- Full two-tier desktop header built to match reference-site density; dropdown menus added to Services and Service Areas.
- `/ca/erp/` built as a genuinely distinct deep-dive page after the owner flagged an earlier Canada page as duplicate content — informed by researching real competitor page structures (Numerique.ca via screenshot, Witify.io via direct fetch).
- Security: found and removed three hardcoded secrets (Supabase service_role key, Google PageSpeed API key, DataForSEO credentials) from `api/audit.js`, which had been committed as fallback defaults in a public repo. Confirmed safe before the owner deleted the associated Supabase project.
- Honest, non-competitor-naming buyer's-guide blog post published: `blog/full-service-vs-diy-erp-agency-canada.html`.

---

## How to add an entry

```
## YYYY-MM-DD — short summary
What changed, why, and anything a future session needs to know that isn't obvious from the code/commit history.
```

Add new entries below this line, most recent at the bottom (or top — whichever the file trends toward; just be consistent with what's already there when you add yours).

---

### 2026-08-31 — ai_context/ bootstrap created
Created this `ai_context/` folder (`RULES.md`, `DESIGN_SYSTEM.md`, `PROGRESS.md`, `COMMANDS.md`) plus a root `CLAUDE.md` pointing every future AI session here first, mirroring the pattern already in use on the owner's other project (viraat-marine-erp). Backfilled this file with everything done in the current session (nav fixes, two new Canada service pages, the Toronto city page, and the 12-image library) so nothing gets lost or re-derived from scratch next time.

### 2026-08-31 — Homepage hero aligned to a left gutter on wide desktops
Owner's complaint: on a wide monitor the hero copy (H1, lede, buttons, feature pills, trust stats) started ~360px in from the left edge and read as "misplaced" — the desktop width wasn't being used. Cause: the hero content sits in the standard `.container` (`width:92%; max-width:1180px; margin:0 auto`) and `.hero-grid` was additionally capped at `max-width:640px`, so past ~1280px viewport the whole column just floated in the middle of the section.

Fix (CSS only, `index.html`, hero-scoped — no markup, no copy, no JS changed): added two `min-width` media queries right after the `.hero-grid .eyebrow` rules.
- `≥1200px`: `.tap-new-hero > .container` drops the centering and the 1180px cap (`width:100%; max-width:none; margin:0; padding:0 64px`); `.hero-grid` widens to `min(50%, 820px)`; subtitle to `52ch`; feature list + trust strip `align-self:stretch` so they span the column.
- `≥1600px`: gutter to 72px, wider gaps between the feature pills and the trust stats so they don't huddle.

The `50%`/`820px` cap is deliberate: it keeps clearance from the absolutely-positioned `.hero-side-text` ("Connecting … to the World.", `right:6%`, `max-width:420px`). A wider column collides with it around 1200–1300px. Anything below 1200px is untouched — the original centered container still applies, and the side text still hides at ≤1100px.

Owner chose **hero only** for this change (offered: whole homepage / whole site). Known consequence, flagged to the owner: the header (logo/nav/utility bar) and every section below the hero are still centered at 1180px, so the hero no longer lines up with the logo on wide screens. Extending the same gutter to the header + remaining sections is the obvious follow-up if the mismatch bothers them.

Verification: node/playwright-core are **not installed on this machine** (no `node` on PATH), so the documented Playwright workflow couldn't run. Verified instead with headless Chrome directly (`chrome.exe --headless=new --screenshot`, Chrome lives at `%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe` on this machine, not Program Files) at 1150 / 1440 / 1920 / 2560 px and looked at all four: 1150 unchanged, 1440 gutter 64px with clear separation from the side text, 1920 and 2560 gutter 72px, no collision, no overflow. Change is pure CSS so no console-error surface.

### 2026-08-31 — Wide-desktop layout extended: header + hero, homepage and all 5 Canada pages
Follow-up to the entry above, after the owner saw it live: extend the same treatment to the **header**, make the hero content "lengthy" (wider column + bigger type) because the centre still read as empty space, and apply the identical hero to the Canada pages so they stop looking "big and larger" than the homepage.

One shared 51-line CSS block (`/* ---------- WIDE-DESKTOP LAYOUT (header + hero) ---------- */`) now sits in the same place — right after the `.hero-grid .eyebrow` rules — in all six pages that share this template: `index.html`, `ca/index.html`, `ca/erp/`, `ca/seo-services/`, `ca/toronto/`, `ca/website-development/`. **Keep it identical across all six**; if you change one, change all six (same rule as header/footer sync).

What the block does, in `min-width` steps (nothing below 1200px is touched):
- **1200px**: both header bars (`.site-header .container`) and the hero container break the 1180px cap and take a 64px left gutter; `.header-container{ gap:28px }`; hero column `min(50%, 800px)`; subtitle 56ch; feature list + trust strip stretch.
- **1440px**: hero column `min(55%, 940px)`; h1 `clamp(3rem,3.9vw,4rem)` **plus `text-wrap:normal`** — the global heading rule is `text-wrap:balance`, which keeps line 1 short and left the widened column looking half-empty; nav links + CTA get `white-space:nowrap` (there's room at this width, and it stops the two-line nav/CTA wrap).
- **1600px**: gutter 72px; column `min(56%, 1060px)`; side text grows to 480px / 4.2rem and moves to `right:5%`.
- **1900px**: hero padding 130/136; column `min(54%, 1180px)`; h1 up to 4.6rem; subtitle 1.22rem; stats and pills up a step; side text 540px / 4.8rem.
- **2200px**: column `min(52%, 1320px)`; h1 up to 5.2rem; side text 620px / 5.6rem.

The column cap at every step is set to clear the absolutely-positioned `.hero-side-text` (which grows in the same steps) — the two collide around 1200–1300px if the column goes wider than ~50%, so don't raise these numbers without re-checking that gap at 1200, 1300 and 1600.

**Pages deliberately NOT changed, and why:**
- `/us/`, `/uk/`, `/au/`, `/ae/`, `/blog/index.html` are the **older dark indigo/teal generation** — different header (`.main-header-bar` with no utility bar), hero-grid is a 2-column grid with pricing cards, and their `.container` is already `width:96%; max-width:1720px !important`. They're not narrow, and this block doesn't fit their markup. Bringing them onto the current template is a separate redesign job.
- Blog **articles** use this template but cap `.article-hero .container` at 760px and `.article-body .container` at 720px on purpose — that's reading measure, don't widen it.

Verification: headless Chrome (`chrome --headless=new --screenshot`, `%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe`) at 1200 / 1300 / 1440 / 1600 / 1920 / 2560 across homepage, `/ca/`, `/ca/erp/`, `/ca/seo-services/`, `/ca/website-development/`, `/ca/toronto/` — all looked at. **Tip for next session:** add `--force-prefers-reduced-motion` and use a short `--virtual-time-budget` (~900ms). Without it the hero's rotating headline and the side text get caught mid-fade and screenshot as blank, which looks exactly like a layout bug and isn't one. Also: the PowerShell tool hung on every `chrome.exe` call in this session; running the same command through Bash worked fine.

**Process note (cost a rework this session):** the owner's GitHub Desktop auto-committed and pushed the first version mid-session as two `yy` commits. A later `git checkout -- index.html`, intended to revert an uncommitted edit, therefore restored the *committed* first version and left two competing copies of the media-query block in the file — the later one silently overriding the newer values. If you revert a file in this repo, check `git log` first; assume anything you wrote may already be in HEAD.

### 2026-09-02 — Blog wave 1 (3 posts) + /ca/ services-section links fixed
Shipped the first 3 of the 9 planned keyword-backed posts, one per service pillar, built from the established article template (same head/styles/footer, fresh Article JSON-LD, answer-first openings for AEO, honest no-competitor-naming content): "What Is a Content Audit?" (targets the single highest-volume keyword found, 8,100/mo) → links /ca/seo-services/; "Website Design vs. Website Development" (targets the strongest commercial cluster) → links /ca/website-development/; "What Is ERP Software? A Plain-English Guide" (targets the definitional ERP cluster) → links /ca/erp/. Cards added at the top of blog/index.html. Also fixed a real gap the owner spotted: /ca/'s own "Three Disciplines" pillar cards linked to #contact and the GLOBAL service pages instead of /ca/erp/, /ca/website-development/, /ca/seo-services/ — now wired to the Canada pages. Owner re-sent the 11 library images to double-check intake: verified all already saved + cataloged (incl. the 2 DO-NOT-USE watermarked comps), nothing missing. All pages verified 200 locally + headless-Chrome screenshot of the content-audit post checked.

### 2026-09-02 — Site-wide image pass (owner: "make it look-wise improved, reuse freely")
Placed 7 more library images using the established promise-grid split component: homepage promise upgraded from the old erp_hero.webp to the hero-grade whiteboard process-mapping shot (also root-absolute path fix); /ca/seo-services/ promise upgraded from the 766px team-huddle (now freed) to the 2400px standing-document-review shot + NEW "Reporting You Can Actually Read" split (flatlay charts); /ca/website-development/ NEW "Real Engineers, Really Building" split (red-haired developer); /ca/toronto/ NEW "From Solo Owners to Growing GTA Teams" split (cafe laptop shot); /ca/ NEW "One Team You Can Actually Talk To" split (casual standup); all 3 new blog posts got lead figures (+.article-figure CSS). CATALOG.md Used-on lines all updated. Verified structurally (sections + all image URLs 200) — NOTE: headless-Chrome page loads of localhost started hanging after the day's Docker/WSL installs on this machine (curl fine, plain chrome --screenshot fine earlier); if screenshot verification hangs for a future session, try 127.0.0.1, a reboot, or check Docker Desktop's proxy settings.

### 2026-09-02 — THE GREAT PRUNE: 60+ legacy pages deleted, full 301 map shipped
Owner's decision after reviewing the numbered page inventory + SEMrush backlink exports (read all 4 files): keep ONLY the homepage, the 5 Canada pages, the blog, privacy/terms/404, and /seo-audit-kochi/ (the owner's sentimental first-ever hand-built page — coincidentally also the ONLY inner page with real backlinks: 26 links / 21 ref domains; everything else had ZERO). Deleted: all India-era programmatic pages, random city pages, digital-marketing-* set, global service hubs (seo-services/, website-design-development/, saas-app-development/ + subpages), regional pages (us/au/uk/ae + us/white-label-seo), about.html, case-studies.html, both audit-tool pages, viraatmarine/, autopilot-engine/ (which had node_modules COMMITTED and publicly served), seo-growth-suite, test.html. NEW vercel.json carries ~50 permanent redirects mapping every deleted URL (plus 5 long-dead URLs that still had backlinks) to the closest kept page — India-era pages 301 to /seo-audit-kochi/, SEO-topic pages to /ca/seo-services/, webdev to /ca/website-development/, etc. NOTE: redirects work on the Vercel domain (techauditpros.com) only, NOT on the ajipaul1.github.io mirror. Kept pages scrubbed of dead links (nav dropdowns now Canada+Toronto only, hreflang trimmed to en-ca + x-default, footers cleaned, case-study cards → #contact, SEO Audit Kochi added to footers per owner request). sitemap.xml regenerated: 40 URLs. FOLLOW-UPS: blog/index.html is still the OLD dark design with "Get Free Audit" branding (violates the no-audit-positioning rule — needs redesign); /seo-audit-kochi/ kept as-is in its original old design (sentimental artifact, owner reviewing); homepage/ca "regions" sections still name US/AU/UK/AE as markets (cards now point to #contact — fine, we serve those markets remotely, pages just don't exist).

### 2026-09-02 — Blog hub totally redesigned to the new design system (owner: "international standard, total freedom")
Research first (per the world-class-design law): fetched and analyzed blog.google (The Keyword) and blog.hubspot.com — the two highest-organic-traffic content hubs in the niche. Patterns adopted: dominant featured post (hero card w/ image+kicker+meta), topic/category navigation, consistent card anatomy (tag/title/excerpt/date/read-time), responsive grid, mid-page conversion module, topic-cluster guidance. New blog/index.html built by a generator script that extracts the LIVE header/footer/CSS from index.html (guaranteed design-sync) + blog-specific CSS: navy hero with answer-first AEO intro + working category filter pills (vanilla JS), featured card (content-audit post — the 8,100/mo target), "Start Here" trio (one pillar explainer per service), color-coded card grid (category accent bars: SEO=green, ERP=navy, Web=orange, Outsourcing=gold) with HONEST read-times computed from each post's real word count, full-bleed CTA band, standard footer. SEO/AEO: CollectionPage + BreadcrumbList + 30-item ItemList JSON-LD, clean canonical/OG. Fixed en route: the old hub ORPHANED 12 folder-style posts (now all 30 listed), had a broken link (/blog/uk-growth.html — file never existed), still carried the old dark theme + "Get Free Audit" branding (rule violation, gone), and 5 old posts share one copy-pasted meta description (unique card excerpts written; the posts' own meta tags still need individual fixes — flagged as follow-up). Verified: 200s, structural checks, desktop + 560px screenshots (390px headless shots false-alarm overflow due to the documented ~512px Chrome clamp). NEXT (owner): US page — waiting for owner's keyword files. Follow-up: fix the 5 duplicate meta descriptions in the old posts themselves; remaining 6 planned blog posts.

### 2026-09-02 — Blog hub v2 ("wow" pass) + individual posts enriched (owner: "use images, full-size hero, animations")
Hub rebuilt again per owner feedback: FULL-VIEWPORT hero using the brand's signature wave-canvas animation (script + .tap-new-hero CSS extracted live from index.html; height capped at min(88vh,820px) so tall screens don't balloon), huge display headline, category pills, honest stat row (30 guides / 4 clusters / 0 fluff), animated scroll cue, and the featured card OVERLAPPING the hero bottom (-90px). Every one of the 29 grid cards now carries a photo: per-category image pools rotating through the library (seo/erp/web/out) with 16:10 crops + hover zoom; scroll-reveal via IntersectionObserver (JS-applied classes so no-JS users see everything; prefers-reduced-motion respected). The 4 modern posts each got a navy "Key Takeaways" box (top-of-article, AEO-quotable) + inline captioned figures: content-audit (3 imgs), design-vs-dev (3), erp-plain-english (3), full-service-vs-diy (2, incl. its first lead image + figure CSS it was missing). CATALOG.md: pool-usage note added. Verified: hub desktop full-page + reduced-motion screenshots, enriched post screenshot, all structural counts.

### 2026-09-02 — Hub pagination + post-image sizing fix (owner feedback round 2)
Owner: "many blogs coming — make it page-wise" + "images stretched too much on posts" (screenshot evidence: near-square images rendered as full-column towers). Fixes: (1) blog hub now paginates client-side, 9 cards/page, mono pill pager (Prev/1-2-3-4/Next) integrated with the category filter (filter resets to page 1, count line reads "29 guides · page 1 of 4"), smooth-scrolls to grid top on page change; ALL cards remain in the HTML for crawlers — pagination is presentation-only. (2) Article figures capped at max-height:420px with object-fit:cover across all 4 modern posts — editorial crops instead of towers. (3) Bonus bug found in screenshot: <strong> inside the navy takeaways box inherited near-invisible ink color — forced #fff. NOTE for the coming US page (owner): build it content-rich with images/animations like the CA set from day one. US keyword files: still awaited.

### 2026-09-02 — Full-width desktop layouts for blog hub + posts (owner: "desktop should cover all the space")
Hub: ≥1440px the container widens to 1480px (1720px at ≥1850px) and the grid goes 4 columns; PAGE_SIZE raised to 12 so rows stay clean at both 3-col and 4-col (29 guides = 3 pages). Posts (all 4 modern ones): ≥1280px the article becomes a two-column grid — 780px text column + 300px STICKY "On this page" TOC (auto-built by JS from the h2s, scrollspy highlighting via IntersectionObserver, strategy-call CTA at the bottom of the box); ≥1700px widens further (860px + 320px). Mobile/tablet untouched — TOC hidden below 1280, single column as before. THIS IS NOW THE STANDARD for new pages incl. the coming US set: mobile-first base + explicit ≥1440 wide-desktop tier that actually uses the space (same principle as the 2026-08-31 homepage hero gutter fix). Verified at 1920px: hub 4-col + post TOC screenshots.

### 2026-09-02 — Homepage "wow" pass (owner: full-size top to bottom, more images, storytelling, animation)
Wide tier now GLOBAL on the homepage (@media 1440px container 1480px; 1850px → 1720px) so every section uses the screen. The three service pillar cards got topic photos (ERP=mentor-data walkthrough, Web=developer coding, SEO=team review) with hover zoom — ERP pillar's dead #contact link finally fixed to /ca/erp/. New storytelling split before the final CTA: "Real People. One Accountable Team." (executive-woman-grand-hall image, Kochi story). Scroll-reveal animations added (pillar/case/region cards + promise sections; same JS-applied IntersectionObserver pattern as the hub — no-JS and reduced-motion safe). Gotcha for future sessions: multi-line string .replace() on index.html silently failed (exact-indent mismatch) — the fix used regex literals with (\s*) capture; grep-verify counts after ANY bulk insert. Verified: 1920px full-page screenshots (2 rounds — first exposed the failed inserts).
