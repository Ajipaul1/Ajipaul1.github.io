'use strict';
// Batch 2. Replaces the 13 batch-1 entries that returned HTTP 403 -- those are Unsplash+ (paid)
// photos and cannot be downloaded on the free licence. The tell when harvesting: Unsplash+ entries
// carry a quoted, stock-agency-style caption ("Group of factory employees in hardhats and blue
// workwear...") while free photos have a plain lowercase description. Prefer the plain ones.
//
// Same selection rule as batch 1: fit to the specific claim first, then colour, real people at work,
// and a wide crop.
module.exports = [
  // ---- people + paper: the "before" state every page argues against ------------------------
  { id: 'N_nAAwnBDy8', slug: 'uk-hard-hat-worker-reading-paperwork', alt: 'Worker in a hard hat reading a printed job sheet on site' },
  { id: 'j3ay5s6Irlk', slug: 'uk-colleagues-checking-paper-file', alt: 'Two colleagues checking figures in a paper file' },
  { id: 'md4QnifG-Io', slug: 'uk-operative-seated-stock-trolley', alt: 'Warehouse operative sitting with a stock trolley' },
  { id: 'c_4eaGRDSVU', slug: 'uk-staff-walking-warehouse-aisle', alt: 'Staff walking down an aisle in a busy warehouse' },
  { id: 'qqtE2yX7POI', slug: 'uk-worker-beside-stacked-cartons', alt: 'Worker standing beside stacked cardboard cartons in a stockroom' },
  { id: 'S-3AnKlICmY', slug: 'uk-forklift-driver-loading', alt: 'Forklift driver moving a load in a warehouse' },
  { id: 'jgVX6cdeU4M', slug: 'uk-operator-running-machine-closeup', alt: 'Operator running a production machine' },
  { id: 'InMD-APxayI', slug: 'uk-yellow-crates-stacked-floor', alt: 'Yellow stacking crates lined up on a warehouse floor' },

  // ---- the build side: web development ------------------------------------------------------
  { id: 'Im_cQ6hQo10', slug: 'uk-two-developers-monitors-bright-office', alt: 'Two developers working on code at monitors in a bright office' },
  { id: 'cvBBO4PzWPg', slug: 'uk-colourful-javascript-code-dark-screen', alt: 'Lines of colourful JavaScript on a dark editor screen' },
  { id: '64YrPKiguAE', slug: 'uk-developer-at-workstation-green', alt: 'Developer working at a workstation' },
  { id: 'oXlXu2qukGE', slug: 'uk-html-markup-on-screen', alt: 'HTML markup for a web build displayed on screen' },
  { id: 'mZnx9429i94', slug: 'uk-react-source-in-editor', alt: 'React component source open in a code editor' },

  // ---- Manchester --------------------------------------------------------------------------
  { id: 'j_E2qlXCWOw', slug: 'uk-manchester-towers-behind-brick-warehouses', alt: 'Modern towers rising behind historic red-brick warehouses in Manchester' },
  { id: 'lv-H5A1HwPQ', slug: 'uk-manchester-yellow-tram', alt: 'A yellow Metrolink tram on a Manchester street' },
  { id: 'Idj62Yy0jms', slug: 'uk-manchester-red-brick-street', alt: 'Manchester street lined with tall red-brick buildings' },
  { id: 'F9UD07hgHuE', slug: 'uk-manchester-golden-hour-buildings', alt: 'Manchester buildings lit at golden hour' },

  // ---- Scotland ----------------------------------------------------------------------------
  { id: 'd7_TtRp1s9s', slug: 'uk-edinburgh-skyline-golden-hour-monument', alt: 'The Dugald Stewart Monument overlooking the Edinburgh skyline at golden hour' },
  { id: 'ktDODr-3tvY', slug: 'uk-edinburgh-balmoral-clock-tower', alt: 'The Balmoral clock tower and Scott Monument in Edinburgh at golden hour' },
  { id: 'atR3IxyshrY', slug: 'uk-scotland-river-through-city', alt: 'A river running through a Scottish city beside tall buildings' },
  { id: 'RKGx41Dc1DM', slug: 'uk-scotland-castle-on-hill', alt: 'A Scottish castle on a hill above the city' },

  // ---- London (dusk / aerial) --------------------------------------------------------------
  { id: '6G1AGm8NXBg', slug: 'uk-london-skyline-night-water', alt: 'The London skyline at night seen across the water' },
  { id: 'BRa_BWNZXUs', slug: 'uk-london-aerial-skyline', alt: 'Aerial view of the London skyline' },
  { id: 'sOlI0fOIaII', slug: 'uk-london-river-and-bridge', alt: 'The Thames and a London bridge with the city behind' },

  // ---- ports, freight, landed cost ---------------------------------------------------------
  { id: 'Annl9CjEaEs', slug: 'uk-containers-stacked-high', alt: 'Shipping containers stacked high at a container terminal' },
  { id: 'CpsTAUPoScw', slug: 'uk-cargo-ships-docked-pier', alt: 'Cargo ships docked at the pier during the working day' },
  { id: 'YTh-Yu_BEXw', slug: 'uk-harbour-cranes-row', alt: 'A row of large cranes along a working harbour' },
  { id: 'sigzPF1sT7k', slug: 'uk-colourful-stacking-crates', alt: 'Red, blue and white stacking crates ready for despatch' },

  // ---- the room where the audit happens ----------------------------------------------------
  { id: 'mBVDBC-JgCc', slug: 'uk-four-professionals-charts-laptops-table', alt: 'Four professionals around a table with laptops and printed charts' },
  { id: 'VBLHICVh-lI', slug: 'uk-group-meeting-discussion', alt: 'A group of colleagues in discussion during a meeting' },
  { id: 'rtD_lcsN6_U', slug: 'uk-team-round-table-laptops', alt: 'A team working around a table with laptops open' },
  { id: 'nISqmehpBQk', slug: 'uk-two-colleagues-at-table-working', alt: 'Two colleagues working together at a table' },
];
