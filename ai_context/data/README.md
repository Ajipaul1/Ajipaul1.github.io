# Drop Search Console and Analytics exports here

This folder is git-ignored. Nothing in it is committed or pushed — it is a drop box so exported
data can be read without putting business figures into the repository.

Drop the CSV or ZIP files straight in. No renaming needed; the filenames Google gives them are fine.

## What to export, in priority order

1. **Search Console → Performance → Export** (the whole thing, 16-month date range)
   Answers: what you already rank for, what has impressions but no clicks, which pages earn traffic.
2. **Search Console → Links → Export external links**
   Answers the biggest open question: whether anything credible links to the site.
3. **Search Console → Indexing → Pages → Export**
   Answers: how many of the 107 pages Google has actually indexed, and why the rest are excluded.
4. **Search Console → Core Web Vitals → Export** (if it has data)
   Real-user speed, as opposed to the lab measurements taken during the build.
5. **GA4 → Reports → Acquisition → Traffic acquisition → Export**
   Answers: how much traffic arrives, from where, and whether any of it converts.

Bing Webmaster Tools exports are welcome too if that property exists — free extra data, and Bing
feeds some AI answers.
