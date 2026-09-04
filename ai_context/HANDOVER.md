# TechAuditPros — handover for the next AI session

Read this **after** `RULES.md` / `CONTEXT.md` and `PROGRESS.md`. This file exists because on
2026-09-04 the owner supplied Search Console exports for the first time, and they changed the
priorities. Everything built before that date was built blind.

**Read the numbers in §2 before you build anything.** The most valuable work on this site right now
is not new content.

---

## 1. What the site is

TechAuditPros (techauditpros.com), founded by Aji Paul, based in Kochi, Kerala. Three services sold
as one team: technical SEO including AEO/GEO, web development, and custom ERP. Clients in the UK,
US, Canada and the UAE; local work in Kerala.

Static HTML on Vercel. No build step. CRLF line endings. Pages are produced by generator scripts in
`scripts/country-pages/` and `scripts/blog/`, which rewrite HTML from templates — **edit the
generator, not the output**, unless you are patching a one-off.

Current inventory: 107 URLs in the sitemap, 85 blog posts, 8 UK pages, 4 US, 5 CA, homepage.

### The canonical host is `www`

`techauditpros.com` issues a 308 to `https://www.techauditpros.com`. **www is canonical.** Search
Console is a Domain property (`sc-domain:techauditpros.com`) so it reports both, which is why the
Pages export shows the same content under two hostnames. Do not "fix" this by adding non-www
canonicals — the redirect is correct. Just be aware when reading exports.

---

## 2. The real numbers (Search Console, 31 Dec 2025 – 2 Sep 2026)

Raw exports are in `ai_context/data/` (git-ignored). Re-export monthly.

| Metric | Value | What it means |
|---|---|---|
| Clicks | **189** in 246 days | Roughly 0.8 a day |
| Impressions | **32,548** | The site is being surfaced, a lot |
| CTR | **0.58%** | Almost nobody clicks |
| Position on the high-impression terms | **51–79** | Page 5 to 8. Registered, not competitive |
| Indexed | **69** pages | Against 107 in the sitemap |
| Not indexed | **47** pages | See §3 |
| Linking domains | **12** | See §4 |
| Core Web Vitals field data | **None** | Not enough traffic for CrUX to report |

### Where the traffic is, and is not

| Country | Clicks | Impressions | Note |
|---|---|---|---|
| India | **156** | 13,061 | 83% of all clicks. **There is no India page.** |
| Canada | 27 | 5,098 | Best converting market |
| United States | 2 | 10,182 | Huge impressions, almost no clicks |
| Australia | 1 | 1,282 | No page |
| United Kingdom | **0** | 1,293 | All 8 UK pages are new; this is the baseline |

Desktop 28,212 impressions vs mobile 4,218 — a desktop skew that suggests many of these impressions
are agency/tool-side searches rather than buyers.

### What Google already associates the site with

The strongest existing signal is a **technical-SEO-audit** cluster, all sitting around position
51–60 with zero clicks:

- `technical seo audit services` 818 impressions · `technical seo audit service` 744
- `seo technical audit service` 903 · `seo technical audit services` 602
- `technical seo audit consultant` 583 · `technical seo audit consultancy` 530
- `professional seo audit usa` 613

≈ **4,800 impressions** on one tight cluster. Plus an unexpected Mumbai cluster —
`seo agency mumbai` 944, `seo company in mumbai` 854, `seo services in mumbai` 592 — around
position 73–79. The site is Kochi-based; Google has decided it is relevant to Indian SEO-agency
queries anyway.

**Branded search works:** `techauditpros` converts at 100% (2 clicks / 2 impressions). Everything
else does not, because nothing is on page one.

---

## 3. FIX THIS FIRST — 8,803 impressions are pointing at 404s

This is worth more than any new page, and it is an afternoon's work.

Seven URLs that earn impressions no longer resolve. **Redirects exist for four of them, but only in
the non-trailing-slash form, and Google indexed the trailing-slash form.**

| Indexed URL | Impressions | Position | `/path` (no slash) | `/path/` (as indexed) |
|---|---|---|---|---|
| `/seo-audit-canada/` | **4,075** | 46.6 | 404 | **404** |
| `/orlando-seo-agency/` | **2,883** | 46.0 | → `/us/seo-services/` | **404** |
| `/technical-seo-audit/` | 695 | 46.3 | → `/ca/seo-services/` | **404** |
| `/seo-audit-usa/` | 667 | 53.2 | 404 | **404** |
| `/seo-services/` | 368 | 70.3 | → `/ca/seo-services/` | **404** |
| `/about.html` | 101 | **12.8** | → `/` | n/a |
| `/seo-audit-india/` | 14 | **9.14** | → `/seo-audit-kochi/` | **404** |

That is **27% of the site's total impressions** hitting a 404. It also explains the coverage report:
20 "Page with redirect", 12 "Redirect error", 9 "Not found (404)".

### What to do

1. In `vercel.json`, make every redirect match **both** forms. Vercel's `source` matching is exact,
   so `/orlando-seo-agency` does not cover `/orlando-seo-agency/`. Add both, or use
   `"source": "/orlando-seo-agency/:path*"`, and confirm with curl on **both** forms before
   claiming it is fixed.
2. `/seo-audit-canada/` (4,075 impressions) and `/seo-audit-usa/` (667) have **no redirect at all**.
   Point them at `/ca/seo-services/` and `/us/seo-services/`. Better: these were clearly ranking
   pages — consider **rebuilding them as real pages** at those URLs rather than redirecting away
   4,700 impressions of accrued signal.
3. `/about.html` sits at **position 12.8** and redirects to the homepage, which is a soft-404
   pattern. There is no About page in the repo. **Build one** — it is the single best-positioned URL
   the site has, and an About page is also what AI answers cite for "who is TechAuditPros".
4. `/seo-audit-india/` is at **position 9.14** — the best position on the whole site — and 404s.
   See §5: India deserves a real page.
5. Resubmit `sitemap.xml`. Search Console last read 75 URLs; there are now 107.
6. Delete the two junk sitemap submissions showing "Unknown / 1 error":
   `techauditpros.com/seo-audit-kochi/` and `techauditpros.com/` are not sitemaps.
7. `www.techauditpros.com/sitemap.xml` (15 URLs, last read 31 Aug) is stale — remove or repoint.

**Verification for every one of the above: `curl -sIL` the indexed URL and confirm a single 301 to a
URL that returns 200.** Do not mark this done from a config diff.

---

## 4. Authority is the binding constraint, and nothing has addressed it

All 12 linking domains, with their link counts:

`goodfirms.co` 8 · `blogspot.com` 5 · `businessfirms.co` 3 · `linkedin.com` 2 · `agencylist.com` ·
`cylex-canada.ca` · `edverise.com` · `freelistingindia.in` · `glassdoor.co.in` ·
`mdhridoyahmed.com` · `medium.com` · `telgopowerprojects.com`

Top anchor texts: *"visit website"*, *"view site"*, *"view website"*, *"tech audit pros"*, and bare
URLs. That is a directory-listing profile. **Zero editorial links. Zero trade press. Zero client or
supplier links.**

This is why 32,548 impressions produce position 51–79 rather than page one. The content is not the
problem — a page with no authority behind it cannot rank against pages that have it, however good it
is. **Do not respond to flat rankings by writing more posts.** Say so plainly to the owner.

What would actually move it, in order of value per hour:
1. **Client and supplier links.** Ask every client for a "built by" credit or a case-study mention.
2. **A real case study with client permission** — the only asset that earns links and closes deals.
3. **Original data.** The site now contains genuine market figures; turn them into a chart or a
   small annual survey. Original data is the most reliable link magnet in B2B.
4. **Kerala and Indian trade press.** India is 83% of clicks; local coverage is achievable.
5. Prune the directory listings that add nothing.

---

## 5. The three country pages to build next — and the data says which

The owner wants three more country hubs. The existing set is `/us/`, `/uk/`, `/ca/`. Based on the
export, build them in this order:

### 5.1 India — `/in/` (highest priority by a wide margin)

**156 of 189 clicks and 13,061 impressions come from India, and there is no India page.** The
strongest positions on the whole site are Indian: `/seo-audit-india/` at 9.14 (currently 404) and
`/seo-audit-kochi/` at 17.55 (live, 20 clicks). There is a live Mumbai impression cluster the site
never targeted.

- Rebuild `/seo-audit-india/` or fold it into `/in/` with a 301 from the old URL.
- Content angle differs from the export markets: Indian buyers are not buying "offshore", they are
  buying a local specialist. Drop the offshore framing entirely on this page.
- Real clusters to target: the Mumbai/agency terms already earning impressions, plus the
  technical-audit cluster from §2.
- `/seo-audit-kochi/` already exists and works — link `/in/` to it rather than duplicating it.
- Currency and compliance: INR, GST, and the owner's published ₹15,000 local audit package.

### 5.2 UAE — `/ae/`

Named in the company's own positioning and there is an existing `blog/offshore-developer-center-dubai.html`.
No impressions yet, so this is a positioning play rather than a demand play — say so to the owner and
size it accordingly. Compliance layer: VAT at 5%, free-zone vs mainland, Arabic-language
consideration, data residency.

### 5.3 Australia — `/au/`

1,282 impressions, 1 click, and an existing `blog/outsource-seo-services-au-tips.html`. Modest but
real demand. Compliance layer: GST, ABN, Privacy Act, and the timezone story is genuinely good
(Kochi is 4.5–5.5 hours behind AEST, so there is a real working overlap).

### How to build them — the established method

Follow `ai_context/PLAN-UK.md`, which is the worked example. Non-negotiables from it:

1. **Copy a generator, do not hand-write HTML.** `scripts/country-pages/uk_hub.js` is the cleanest
   model. Each generator reads a template, repoints hrefs, sets head/schema, and asserts with
   `L.must()`.
2. **Use `L.ukSpelling()` — or the equivalent — never a blanket string swap.** A blanket
   `center → centre` over a whole file previously broke ~75 CSS declarations per page. The helper
   masks `<style>`, `<script>` and every tag first, and throws if a CSS keyword is rewritten.
3. **SERP parity (PLAN-UK §6b).** Before writing, search the target terms, open the top 1–3, and
   record their H1/H2 inventory, word count, prices and FAQs in the generator's header comment.
   Cover everything they have, then add what they lack. On every market checked so far the leaders
   were 85–95% generic with no FAQ and no pricing guidance.
4. **Never duplicate a page across markets.** A section-hash audit must show zero byte-identical
   blocks between country pages. Each page gets its own section vocabulary and its own signature
   animation (`uk_motion.js` substitutes a page `KIND` so each runs only its own).
5. **Copy rules (PLAN-UK §6c):** no single-engineer framing, never publish a price we charge
   (third-party market prices are kept and attributed), no repeated boilerplate, every page
   independent. Run `scripts/country-pages/tone_pass.js` **after every generator run** — it must
   report `0 | 0 | 0`.
6. **hreflang.** Adding markets means updating the cluster on every existing page. Currently
   `en-gb`, `en-us`, `en-ca`, `x-default`. Add `en-in`, `en-ae`, `en-au`.
7. Then: `gen_sitemap.js`, `build_bloghub.js` if posts were added, resubmit the sitemap.

---

## 6. Imagery — the pipeline and the rules

`scripts/images/fetch_stock.js` downloads from **Unsplash** and writes three sizes (2400 / 1400 /
700), strips EXIF, records real pixel dimensions in `assets/images/library/_sizes.json`, and credits
the photographer in `CREDITS.md`.

**Do not download from Google Images.** It indexes other people's photographs and the good business
results are Getty, iStock and Adobe, who scan for their files and invoice UK businesses. Unsplash's
licence permits commercial use. Unsplash+ (paid) photos return HTTP 403 — their tell when harvesting
is a quoted, agency-style caption.

**Never trust an Unsplash description.** Build an ImageMagick contact sheet of the 700px variants
with labels and look at every image before publishing. Doing this caught an LED share-price ticker
captioned "the real system is a spreadsheet", a Covid-19 dashboard, sheet music sold as
"paperwork", US IRS forms on a UK page, and a Japanese noodle factory. Files already marked
`DO-NOT-USE-*` in the library are watermarked or branded — leave them alone.

Owner's direction, in his priority order: fit to content first; big images; colourful and
international-standard; real people where the content involves people; **no photo more than about
twice site-wide**; and mobile must be designed, not a narrowed desktop.

**Never caption stock people as "our team" or "our office".** There is a formal group portrait in
the library that is somebody else's company; it is used nowhere, deliberately.

Also enforced site-wide, keep it that way: every `<img>` carries width and height; a narrow master
is never upscaled (`width:auto; max-width:100%`); `srcset` offers all three tiers; leads are
`loading="eager" fetchpriority="high"`, everything else lazy. `scripts/images/responsive_pass.js`
re-applies all of that.

### The open image gaps
- **JPEG only.** WebP would cut another 25–30%. Not done.
- **No original photography.** Everything is licensed stock, which caps E-E-A-T. Only the owner can
  fix this: photos of him, the workspace, real screens.
- **No original charts or infographics.** The biggest missed link-earning opportunity, per §4.

---

## 7. Traps that have already cost time

- **Blanket string replacement over an HTML file.** Broke ~75 CSS declarations per page once, and
  `tone_pass.js` once produced "engineering teaming teaming team" ×146 across 51 files because a
  rule matched its own output. Every text-rewriting script needs a fixed-point check.
- **Reversed meta attribute order.** 14 pages write `<meta content="…" property="…">`. Harmless to
  browsers, invisible to naive regexes — a share-tag script could not see existing tags and appended
  duplicates. Attributes are now normalised; keep them that way.
- **`<picture>` does not fall back after a 404.** `/seo-audit-kochi/` shipped a broken hero for
  months because its `.avif` and `.webp` sources did not exist. If a matching `<source>` 404s, the
  `<img>` is never reached.
- **Placeholder files committed as images.** `hero-mobile.jpg` was an 80-byte text file reading
  "Placeholder for hero-mo…". Check that an image is an image.
- **Hardcoded lists in generators.** `build_bloghub.js` had a hardcoded post array, so eight live,
  sitemapped posts were invisible on `/blog/`. It now reads `posts_manifest.json`.
- **`100vw` full-bleed causes horizontal scroll** when a scrollbar is present. Use
  `overflow-x: clip` on the section.
- **Scroll-driven CSS animation runs without JS.** An opacity fade in a `view()`-timeline keyframe
  left below-the-fold headings at 25% opacity for crawlers. Movement only, never opacity.
- **Shell quoting.** Backticks and multi-line anchors inside `node -e "…"` have mangled files
  repeatedly. Write patch scripts to a file instead.
- **Commit identity.** Use the repo's configured `Aji Paul <ajipaul96@gmail.com>`. Never pass
  `-c user.email=…`. ~12 pushed commits were wrongly attributed once.
- **The owner's GitHub Desktop auto-commits "yy" mid-session.** Diff against a base commit; never
  `git checkout --`.

---

## 8. Open decisions that need the owner, not an AI

1. **`/blog/generative-engine-optimization-geo/` is four headings of service boilerplate**, not an
   article, and now competes with `/blog/aeo-and-geo-explained.html` for the same terms. Recommend a
   301. It is a live URL, so it is his call.
2. **`/seo-audit-canada/` (4,075 impressions) and `/seo-audit-usa/` (667)** — rebuild as real pages,
   or redirect? Rebuilding preserves more.
3. **The word "offshore"** in the site header signals cost-saving rather than expertise, which works
   against the premium positioning he says he wants — and is actively wrong for the Indian market
   that supplies 83% of clicks.
4. **No prices anywhere.** His decision, applied site-wide. The trade-off is that buyers of
   considered purchases self-qualify on price, so this filters out some serious enquiries too.
5. **Original photography and a client case study** — the two highest-value assets on this list, and
   both need him.

---

## 9. Definition of done, for any task on this site

Anything reported as complete must have been verified, not assumed:

- `node --check` on every edited `.js`
- Headless-Chrome screenshot of the changed page at **1440 and 390**
- Zero horizontal overflow, zero broken images, zero images without width/height, zero JS errors
- Zero elements hidden or faded with **JavaScript off**
- `tone_pass.js` reporting `0 | 0 | 0`
- For redirects: `curl -sIL` the real indexed URL, both slash forms
- `PROGRESS.md` appended **before** committing
- Commit and push to `main` with the repo's own identity

The verification harness is `scripts/verify/server.js` (port 8934) and `scripts/verify/shot.js`
(`MOTION=1` for real animation). It needs `playwright-core`; set `NODE_PATH` to a scratch install.
