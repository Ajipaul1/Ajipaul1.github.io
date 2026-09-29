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
- 2026-09-29 — Telgo Power Projects site app added as live work: /results/ gets a third "More live work" case (GPS sign-in and attendance, four-step daily site report to the director, chat, inventory with admin approval, route and work plan on a map, file manager; built May-Jul 2026, rebuilt Sep 2026; link telgo-app.vercel.app only) with two screenshots of the PUBLIC sign-in page (home2-telgo-app-signin-phone / -desktop, import_local.js, CATALOG.md), ItemList position 3 (staff app moved to 4), the "Are these results real?" FAQ (visible = schema), the page description (152 chars) and the summary paragraph; grid 3 columns above 1100px. Same text in results_hub.js. Homepage FAQ "What have you built that I can check for myself?" names the app in visible text and FAQPage schema (checked equal). Trust-strip "2 Client systems live" left for the lead.

## Needs from lead
