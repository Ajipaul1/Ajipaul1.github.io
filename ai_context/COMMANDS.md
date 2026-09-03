# TechAuditPros — How to Work in This Repo

## Environment

- Static HTML/CSS/JS, **no build system**, no npm dependencies for the site itself. Every page is a standalone `.html` file with an inline `<style>` block.
- Same repo serves both GitHub Pages (`ajipaul1.github.io`) and Vercel (`techauditpros.com`). **Vercel deploys are slow** — wait at least 60–120 seconds and verify with `curl` before telling the owner something is live. Declaring success too early has caused confusing "it's not working" reports before.
- Windows environment. Bash tool available for POSIX-style commands; PowerShell also available.

## Local verification workflow

There's no dev server config — spin up a plain static file server manually:

```js
// quick static server, port 8934
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p.endsWith('/')) p += 'index.html';
  let full = path.join(__dirname, p);
  fs.readFile(full, (err,data)=>{
    if(err){ res.writeHead(404); res.end('404'); return; }
    const ext = path.extname(full);
    res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(8934, ()=>console.log('serving on 8934'));
```

Then drive it with `playwright-core` against the **locally installed Chrome** (no bundled Chromium in this environment):

```js
const { chromium } = require('playwright-core');
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push('PAGE: ' + e.message));
page.on('console', msg => { if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text()); });
page.on('response', r => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ': ' + r.url()); });
await page.goto('http://localhost:8934/ca/toronto/');
await page.screenshot({ path: 'out.png' });
console.log(errors);
```

Before calling any visual/interactive change done:
1. Zero entries in `errors` (no console errors, no page errors, no 4xx/5xx responses).
2. Actually **read the screenshot** — don't just check for absence of errors.
3. For hover/dropdown behavior, use stepped `page.mouse.move()` calls, not `.hover()` — `.hover()` teleports and won't reproduce real hover-gap bugs (this repo has had one).

If `xlsx` or another npm package is needed for a one-off task (e.g., parsing a SEMrush export), `npm install` it into the scratchpad directory, not into the site repo — the site has no `package.json` and shouldn't gain one for tooling that isn't part of the shipped site.

## Git conventions

- Commit directly to `main`. This project does **not** use the "plan → wait for Approved" gate that some of the owner's other projects use — the owner expects direct action ("update it please") once a request is clear. Still: don't push anything that fails local verification, and don't guess on ambiguous scope — ask or state your understanding first if a request is large/costly to redo (see `RULES.md`).
- Author identity: `Aji Paul <ajipaul96@gmail.com>` (check `git log` if unsure — do not change committer identity).
- Every commit message ends with:
  ```
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  ```
- Prefer one logical change per commit over one giant mixed commit — makes it possible to `git log` back through what happened.
- Review `git status`/`git diff` before staging broad changes (e.g. after a find/replace across regional pages) — this repo has had a real incident where a broad find/replace briefly corrupted `hreflang`/canonical URLs on the wrong page.

## Image library workflow

When the owner supplies new image files (they do this periodically, in small batches):

1. **View each image fully** before doing anything else.
2. Copy into `assets/images/library/` with a descriptive kebab-case filename (not the original `IMG_1234.jpg`-style name).
3. Add an entry to `assets/images/library/CATALOG.md`: what's in it, emotion/read, colors, resolution/quality caveats, best-used-for recommendation, and a `**Used on:**` line (start as "none yet").
4. **Check for watermarks** (Alamy/Shutterstock/Getty preview comps are a real recurring thing the owner has sent). If watermarked, rename with a `DO-NOT-USE-` prefix and flag it clearly in the catalog and to the owner — never publish a watermarked image live, it's both a licensing risk and looks unprofessional.
5. Commit the images + catalog update as their own commit, separate from whatever page work is happening at the same time (image intake is a distinct, resumable unit of work).
6. When you later use an image on a page, update its `**Used on:**` line in the same commit that adds it to the page.

## Keyword research workflow

The owner periodically supplies SEMrush "Keyword Magic Tool → export all" `.xlsx` files (broad-match and/or questions-match, per topic, per country). These are large (up to ~30k rows) and noisy — mostly generic head terms, not curated. To use one:

1. `npm install xlsx` into the scratchpad (see above).
2. Parse with `XLSX.utils.sheet_to_json(ws, {header:1})`, columns are `Keyword, Intent, Relevance, Volume, Keyword Difficulty, CPC (USD), SERP Features`.
3. Filter for real signal: sort by Volume, filter by `Relevance` to cut noise, split "question-phrased" rows (regex on `^(what|how|why|when|where|which|who|can|does|do|is|are|will|should)\b`) into an AEO/blog-content bucket versus a commercial/head-term bucket for page targeting.
4. If checking city-level demand, scan for city names within keyword strings and sum volume per city — don't build a page on a hunch, build it on an actual number (see `RULES.md` §1 and `PROGRESS.md`'s keyword findings for the threshold this project has already used: sub-100/mo combined did not get a standalone page).
5. Summarize findings back to the owner (or into `PROGRESS.md`) rather than leaving 30k-row dumps anywhere in the repo.

---

## How to create a new page (standard flow, locked 2026-09-02)

1. **Research first**: keyword files from the owner (SEMrush exports — parsing recipe above) + the competitor-crawl rule (RULES §11): search the main keyword, fetch the #1 page, list what it covers; ours must out-answer it.
2. **Copy the closest template** — never start blank: service page → `ca/erp/index.html`; city/hub page → `ca/toronto/index.html`; blog post → `blog/what-is-a-content-audit.html` (carries takeaways/TOC/figure anatomy).
3. Edit head (title/meta/OG/canonical — page's own URL!), Service|ProfessionalService + FAQPage JSON-LD (visible FAQ text must match schema), hero, sections, FAQ (unique section id + scoped toggle JS).
4. Images from `assets/images/library/` per CATALOG (respect license gates); update Used-on lines.
5. Wide-desktop tier + reveal animations ship WITH the page (RULES §9–10).
6. Wire links: header dropdowns + footers across all full pages (no shared template — grep to find every copy), sitemap.xml, blog hub generator if it's a post.
7. Verify (server + screenshots at 1440/1920 and ≥560 narrow), PROGRESS.md entry, commit, push.

## Country-page workflow (US is next, files awaited)

Owner supplies per-country SEMrush exports → analyze (volumes, question split, city demand) → propose page set (country hub + service deep-dives + city pages ONLY where volume justifies; anything thin folds into copy/schema) → competitor-crawl each target keyword → build content-rich with images/animations from day one → hreflang: add the new region to every page's alternate set + sitemap. The Canada set (/ca/*) is the reference implementation.

## Blog hub maintenance

New post published? Add one line to the `posts` array in `scripts/build_bloghub.js`, run `node scripts/build_bloghub.js`, verify, commit. Never hand-edit blog/index.html (generated file).


## Generators (standard since 2026-09-03)

Everything new is produced by scripts under `scripts/` so pages stay consistent and nothing is hand-cloned. Run from the repo root with Node 24 (installed on this machine).

**New blog post:** write a content definition (see any `scripts/blog/posts_*.js` — slug, title, desc, eyebrow = sub-topic shown on the hub, cat seo|erp|web|out, lead image, 3 takeaways, answer-first intro, sections with h2 + HTML + optional captioned figure, faqs, cta), then:
```
node scripts/blog/run_posts.js posts_<batch>.js      # writes blog/<slug>.html, updates posts_manifest.json
node scripts/build_bloghub.js                        # hub regenerates: newest-first, own lead image, sub-topic chips, search
node scripts/country-pages/gen_sitemap.js            # sitemap.xml
node scripts/country-pages/update_catalog.js         # CATALOG.md Used-on lines (diffs against the pre-session base commit — update BASE)
```
`make_post.js` pulls the LIVE header/drawer/footer/CSS from index.html (homepage anchors rewritten to `/#…`), so posts never carry stale nav. Article + BreadcrumbList + FAQPage schema, TOC, reveal and table CSS are built in. Add the post to the `posts` array in `build_bloghub.js` (run_posts prints the line) — `patch_bloghub.js` shows the batch way.

**New country page set:** copy `scripts/country-pages/us_hub.js` / `us_erp.js` / `us_seo.js` / `us_web.js` → `uk_*.js`, change the template source only if needed (they clone the CA pages), rewrite ALL content (RULES §1 — a different market needs different questions, prices, proof, depth), set hreflang pairs, then run `nav_patch.js`-style wiring (dropdown + footer item on every current-header page, hreflang on the pairs, vercel.json). Verify with `scripts/verify/`.

**Verify:** `node scripts/verify/server.js` (port 8934) then `node scripts/verify/shot.js us/erp/ name 1440 1` → screenshot + console/pageerror/4xx + broken-image report (`npm install playwright-core` in the scratchpad first; Chrome at Program Files is used). Pass paths WITHOUT a leading slash (Git Bash mangles `/us/…`). Repo HTML files are CRLF — use `\r?\n` in regexes.

**Keyword research:** `node scripts/keyword-research/parse.js` (edit the Downloads glob) → per-country/topic head terms, questions, geo sums; `termgrep.js us|uk` for thematic clusters (cost, industry, AI, vs, examples…). Output goes to files, not the repo.

**Commit trailer:** `Co-Authored-By:` names the Claude model that did the work (Sonnet 5 on 2026-09-02, Fable 5.1 on 2026-09-03).
