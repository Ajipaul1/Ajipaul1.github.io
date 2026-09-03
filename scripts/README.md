# Site tooling scripts

Run with Node from the repo root (`node scripts/<name>.js`).

- **build_bloghub.js** — REGENERATES `blog/index.html` from scratch. It extracts the live
  header/footer/CSS/wave-script from `index.html` (so the hub always matches the current
  design system) and builds the hub from the post inventory hard-coded inside it.
  **When a new blog post is published: add one line to the `posts` array (url, category
  seo|erp|web|out, date) and re-run.** Titles/descriptions/read-times are read from the
  post files automatically. Category image pools are defined at the top (IMG).
  NOTE: the script contains hand-written excerpt overrides for 5 old posts with a shared
  meta description — leave those in place.
- **enrich_posts_reference.js / widen_posts_reference.js** — one-shot scripts already
  applied to the 4 modern posts (takeaways box + inline figures; wide-desktop TOC layout).
  Kept as REFERENCE for applying the same treatment to future/old posts. Running them
  again is safe (they skip already-enriched files) but review before reuse.

The image-library intake process and page-creation how-to live in `ai_context/COMMANDS.md`.


## Added 2026-09-03

- **blog/** — `make_post.js` (post generator: live header/footer/CSS from index.html + modern article anatomy + Article/Breadcrumb/FAQ schema), `run_posts.js <content-file>` (builds every definition in a file, maintains `posts_manifest.json`), `posts_erp1-3.js`, `posts_seo1-4.js`, `posts_web1-2.js` (the definitions behind all 31 posts published 2026-09-03 — the record of what was written and the template for new ones), `update_erp_post.js` (one-shot upgrade of the plain-English ERP explainer), `lib.js` (shared helpers).
- **country-pages/** — `us_hub.js`, `us_erp.js`, `us_seo.js`, `us_web.js` (build /us/* from the CA templates with all-new content), `nav_patch.js` (site-wide dropdown/footer/hreflang/vercel wiring), `patch_bloghub.js` + `patch_bloghub2.js` (the inventory + organization changes applied to build_bloghub.js — already applied, kept as record), `gen_sitemap.js`, `update_catalog.js`.
- **verify/** — `server.js` (static server on 8934), `shot.js` (Playwright-core screenshot + console/4xx/broken-image checks).
- **keyword-research/** — `parse.js`, `termgrep.js` for SEMrush Keyword Magic exports.
- `build_bloghub.js` now sorts newest-first, reads each post's lead figure and eyebrow (sub-topic), renders sub-topic chips + search, and features `/blog/what-is-seo.html`.
