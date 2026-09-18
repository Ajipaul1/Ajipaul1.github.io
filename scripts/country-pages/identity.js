'use strict';
/* identity.js — makes the site say the same thing about the business that the government does.
 *
 * Since 18 September 2026 TechAuditPros is GST-registered, which means anyone can type the GSTIN
 * into a public government page and read back the legal name, the registered address and the
 * status. That changes what the site can safely claim.
 *
 * Two things had to change:
 *
 *   1. The footer on 114 pages claimed "Infopark Phase 1, Kochi, Kerala, 682030" — a real IT park
 *      with real tenants, and not where this business is registered. A prospect who checks the
 *      GSTIN now finds a different address, which is worse than having no address at all.
 *
 *   2. /results/ claimed "a registered office at Infopark Phase 1" and "250+ projects in 16
 *      countries". It is one engineer and a handful of projects. The true version is also the
 *      stronger one: the outreach emails say "sole developer" precisely because that is unusual,
 *      and a prospect who reads both notices the contradiction.
 *
 * The visible footer names the district rather than the village — "Ernakulam, Kerala 686671" is
 * accurate and the PIN pins it exactly — while the schema carries the registered address, so a
 * machine reconciling the GSTIN against the register finds agreement rather than a conflict.
 *
 * Beyond honesty this is a ranking question. Google cross-references name, address and phone
 * across the site, the Google Business Profile and third-party records; a contradiction between
 * them is a known local-SEO negative, and AI assistants answering "who is TechAuditPros" prefer
 * facts that corroborate across sources. PostalAddress and taxID give them something checkable.
 *
 * Re-runnable: every edit is idempotent, and the footer pass accepts any earlier wording, so a
 * change of mind about how the address reads is just another run.
 */
const L = require('./lib');
const fs = require('fs');
const path = require('path');

const FOOTER = '© 2026 TechAuditPros &middot; Proprietor: Aji Paul &middot; Ernakulam, Kerala 686671, India &middot; GSTIN 32CXYPP6750P1ZC';

/* Every footer wording this site has carried, so a re-run converges on the current one. */
const OLD_FOOTERS = [
  '© 2026 TechAuditPros. All rights reserved. | Infopark Phase 1, Kochi, Kerala, 682030, India',
  '© 2026 TechAuditPros &middot; Proprietor: Aji Paul &middot; Pothanicad, Ernakulam, Kerala 686671, India &middot; GSTIN 32CXYPP6750P1ZC',
];

const OLD_TEAM = 'backed by a senior team in Kochi that has shipped 250+ projects across 16 countries';
const NEW_TEAM = 'built and maintained by the engineer who designed it, in Kerala &mdash; including a production ERP of around 20 modules used every working day by the staff of a marine engineering firm';

/* Claims that appear only on /results/ and contradict the public register. Mentions of Infopark
 * elsewhere on the site are legitimate — they describe where competitors and prospects are, not
 * where this business sits — so only these exact sentences are rewritten. */
const FIXES = [
  ['Kochi, Kerala, India, at Infopark Phase 1.', 'Ernakulam district, Kerala, India.'],
  ['Pothanicad, Ernakulam district, Kerala, India.', 'Ernakulam district, Kerala, India.'],
  ['and a registered office at Infopark Phase 1, Kochi.', 'and a registered office in Ernakulam district, Kerala.'],
  [' Across 250+ projects in 16 countries the team keeps 97% of its clients.', ''],
];

/* Schema.org identity. taxID is the GSTIN: a public identifier a search engine or an AI assistant
 * can reconcile against the government register, which is the whole point of putting it here. */
const IDENTITY_JSON = `  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tholanikunnel House, Ayankara",
    "addressLocality": "Kothamangalam",
    "addressRegion": "Kerala",
    "postalCode": "686671",
    "addressCountry": "IN"
  },
  "taxID": "32CXYPP6750P1ZC",
  "telephone": "+91-62825-20339",
  "founder": {
    "@type": "Person",
    "name": "Aji Paul"
  },
`;

/* The repo is CRLF. Matching the line break as a bare \n silently found nothing, which is why the
 * first two runs reported "schemas enriched: 0" without erroring. */
const ORG_ANCHOR = /("@type":\s*"Organization",\r?\n\s*"name":\s*"TechAuditPros",\r?\n)/;

const SKIP = /(^|\/)(node_modules|\.git|archive|scratch|scripts|supabase|videos|assets)(\/|$)/;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name).replace(/\\/g, '/');
    if (SKIP.test(full)) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.html$/i.test(name)) out.push(full);
  }
  return out;
}

const files = walk(L.REPO);
let footers = 0, claims = 0, schemas = 0;

for (const file of files) {
  const rel = path.relative(L.REPO, file).replace(/\\/g, '/');
  let s = fs.readFileSync(file, 'utf8');
  const before = s;

  for (const old of OLD_FOOTERS) {
    if (old !== FOOTER && s.includes(old)) { s = s.split(old).join(FOOTER); footers++; }
  }
  if (s.includes(OLD_TEAM)) { s = s.split(OLD_TEAM).join(NEW_TEAM); claims++; }
  for (const [from, to] of FIXES) { if (s.includes(from)) { s = s.split(from).join(to); claims++; } }

  // guarded on taxID so a second run is a no-op
  if (!s.includes('"taxID"')) {
    const m = s.match(ORG_ANCHOR);
    if (m) {
      const eol = m[1].includes('\r') ? '\r\n' : '\n';
      s = s.replace(ORG_ANCHOR, m[1] + IDENTITY_JSON.split('\n').join(eol));
      schemas++;
    }
  }

  if (s !== before) L.write(rel, s);
}

/* Nothing may survive that the public GST record would contradict. The literal "+" is escaped:
 * unescaped it means "one or more zeroes" and would quietly match the wrong thing. */
const FALSE_CLAIM = /registered office at Infopark|India, at Infopark Phase 1|250\+ projects/;
let leftover = 0;
for (const file of files) {
  if (FALSE_CLAIM.test(fs.readFileSync(file, 'utf8'))) {
    leftover++;
    console.log('  STILL PRESENT: ' + path.relative(L.REPO, file));
  }
}

console.log('\nfooters rewritten  : ' + footers);
console.log('false claims fixed : ' + claims);
console.log('schemas enriched   : ' + schemas);
console.log('contradictions left: ' + leftover);
if (leftover) throw new Error('a false claim survived the pass');

let bad = 0;
for (const file of files) {
  const s = fs.readFileSync(file, 'utf8');
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) {
      bad++;
      console.log('  BROKEN JSON-LD in ' + path.relative(L.REPO, file) + ': ' + e.message.slice(0, 70));
    }
  }
}
if (bad) throw new Error(bad + ' JSON-LD blocks no longer parse');
console.log('all JSON-LD blocks parse cleanly');
