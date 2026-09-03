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
