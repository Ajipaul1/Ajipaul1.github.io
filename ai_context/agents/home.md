# Agent "home" — log (run of 2026-09-29)

Scope: /, /results/, /results/viraat-marine-erp/, /why-us/, /blog/ hub, the new-template blog posts,
scripts/country-pages/offers.js and ONLY the offers_v1 marked blocks on /us/ /uk/ /ca/ /au/ /in/ /ae/.

## Done
- 2026-09-29 — offers block de-duplicated. offers.js v2: the full block (459 words) stays on the homepage only;
  each hub gets its own ~130–145-word market block (two prices in its currency, invoice currency / tax on the
  invoice / time-zone handover / what sits outside the fixed scope, link to /#offers). 0 passages of 12+ words
  shared between any two of the 7 blocks (agents/home/offers_dupes.js). Blocks are now replaced in place (the
  old script cut and re-inserted the CSS, moving ~60 lines on every run). Homepage note: the unsourced
  "comparable US agency retainer ... $4,500 a month" comparison removed; replaced by links to the 5 local-currency
  hubs. Offer schema: per-hub OfferCatalog url (/xx/#offers) and areaServed = that country; the ERP offer now
  carries its monthly fee as a UnitPriceSpecification. UK block links the gov.uk reverse-charge page (verified).
  Homepage description 157 -> 152 chars; og/twitter image alt no longer says "for clients in the UK, US and Canada".

## Needs from lead
