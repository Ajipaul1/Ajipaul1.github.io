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
- Blog content batch: ~9 planned posts tied to the keyword research below (titles listed under "Keyword research findings"), not yet written.
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
