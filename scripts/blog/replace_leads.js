'use strict';
// Replace the lead image on the 27 older blog posts whose lead master was 800px or narrower.
//
// WHY. The article column renders a lead at about 780px, so a 612px master was visibly soft --
// and it is exactly the case the owner ruled out: the narrow iStock batch is for small cards only.
// Those files stay in the library and stay in use on cards; only the leads change.
//
// WHAT IT TOUCHES, per post: the lead <figure> image (src, srcset, width, height), plus the three
// other places the same file is named -- og:image, twitter:image and the Article schema "image".
// If a post's old lead file is still referenced further down the article as an in-body figure, that
// reference is left alone: a narrow file is fine at in-body width.
//
//   usage: node scripts/blog/replace_leads.js          # apply
//          node scripts/blog/replace_leads.js --dry    # report only
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const LIB = path.join(REPO, 'assets', 'images', 'library');
const SIZES = JSON.parse(fs.readFileSync(path.join(LIB, '_sizes.json'), 'utf8'));
const CR = String.fromCharCode(13), LF = String.fromCharCode(10);
const DRY = process.argv.includes('--dry');

// post slug -> new lead, and the alt text that goes with it. One picture per post, chosen for the
// subject of that post rather than for its category.
//
// Only the 20 posts whose lead master is 690px or narrower are listed -- under about 88% of the
// 780px slot, which is where softness becomes visible. Seven more sit at 720-767px (92-98% of the
// slot); those are indistinguishable in practice and their existing pictures already fit their
// subjects, so they are deliberately left alone rather than churned.
const LEADS = {
  // ERP
  'what-is-cloud-erp':                       ['lead-server-rack-close', 'A server rack in the data centre where cloud ERP actually runs'],
  'erp-system-examples':                     ['lead-data-centre-cooling-fans', 'Cooling fans across a data centre rack'],
  'erp-vs-crm':                              ['lead-headset-at-computer', 'Handling a customer call at a computer'],
  'manufacturing-erp-small-manufacturers':   ['lead-workshop-stacked-materials', 'A small manufacturing shop with stock stacked along the wall'],
  'how-to-choose-erp-software':              ['lead-working-at-a-workbench', 'Working at the bench in a small production business'],
  // SEO, AEO and GEO
  'what-is-seo':                             ['lead-illuminated-light-pattern', 'A field of connected lights, the index a search engine builds'],
  'what-is-technical-seo':                   ['lead-screen-lines-and-dots', 'Structure rendered as lines and points on a screen'],
  'what-are-backlinks':                      ['lead-network-of-dots-mono', 'A network of connected points'],
  'on-page-vs-off-page-seo':                 ['lead-blue-lines-and-dots', 'Connected lines and points across a blue field'],
  'seo-vs-sem':                              ['lead-speech-bubbles-on-screen', 'Message panels floating on a translucent screen'],
  'is-seo-dead':                             ['lead-ai-assistant-interface', 'An AI assistant interface, the new front door to search'],
  'international-seo-guide':                 ['lead-world-map-with-pins', 'A world map marked with pins'],
  'keyword-research-guide':                  ['lead-writing-notes-with-coffee', 'Working through keyword notes by hand'],
  'what-should-an-seo-report-include':       ['lead-desk-charts-and-glasses', 'Printed charts and glasses on a reporting desk'],
  // Web development
  'custom-website-vs-template':              ['lead-working-desk-computer-tablet', 'Working on a build at a desk with a computer and a tablet'],
  'web-application-vs-website':              ['lead-app-screens-illustration', 'A set of application screens laid out'],
  'what-is-a-landing-page-conversion':       ['lead-writing-beside-keyboard', 'Working out the offer on paper beside the keyboard'],
  'how-much-does-a-website-cost':            ['lead-pen-beside-laptop', 'A pen on the desk beside a laptop, working through a quote'],
  'how-to-choose-a-web-development-company': ['lead-pen-and-paper-planning', 'Working through a shortlist on paper'],
  'how-to-get-a-business-website':           ['lead-laptop-notebook-tea-plant', 'A laptop and notebook on a small-business desk'],
};

function srcsetFor(slug) {
  const master = SIZES[slug + '.jpg'];
  if (!master) throw new Error('no size recorded for ' + slug + '.jpg -- run fetch_stock.js first');
  const cand = [['-700.jpg', SIZES[slug + '-700.jpg']], ['-1400.jpg', SIZES[slug + '-1400.jpg']], ['.jpg', master]]
    .filter(([, m]) => m).map(([suf, m]) => '/assets/images/library/' + slug + suf + ' ' + m.w + 'w');
  return { cand, master };
}
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let done = 0, skipped = 0;
for (const [slug, [newLead, alt]] of Object.entries(LEADS)) {
  const rel = 'blog/' + slug + '.html';
  const p = path.join(REPO, rel);
  if (!fs.existsSync(p)) { console.log('  MISSING ' + rel); skipped++; continue; }
  let raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf(CR + LF) >= 0;
  let s = crlf ? raw.split(CR + LF).join(LF) : raw;

  // find the lead figure and the old file it points at
  const m = /(<figure class="article-figure[^"]*">\s*)(<img\b[^>]*?src="\/assets\/images\/library\/([^"]+)"[^>]*>)/.exec(s);
  if (!m) { console.log('  no lead figure found in ' + rel); skipped++; continue; }
  const oldFile = m[3];
  const { cand, master } = srcsetFor(newLead);

  const newImg = '<img src="/assets/images/library/' + newLead + '.jpg"'
    + (cand.length > 1 ? ' srcset="' + cand.join(', ') + '" sizes="(max-width:900px) 100vw, 780px"' : '')
    + ' alt="' + esc(alt) + '" width="' + master.w + '" height="' + master.h + '"'
    + ' loading="eager" fetchpriority="high" decoding="async" />';
  s = s.slice(0, m.index) + m[1] + newImg + s.slice(m.index + m[0].length);

  // the same file is named in og:image, twitter:image and the Article schema -- keep them in step
  let meta = 0;
  s = s.replace(new RegExp('(property="og:image" content="https://techauditpros\\.com/assets/images/library/)' + oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g'),
    (mm, pre) => { meta++; return pre + newLead + '.jpg"'; });
  s = s.replace(new RegExp('(name="twitter:image" content="https://techauditpros\\.com/assets/images/library/)' + oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g'),
    (mm, pre) => { meta++; return pre + newLead + '.jpg"'; });
  s = s.replace(new RegExp('("image": "https://techauditpros\\.com/assets/images/library/)' + oldFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g'),
    (mm, pre) => { meta++; return pre + newLead + '.jpg"'; });

  if (!DRY) fs.writeFileSync(p, crlf ? s.split(LF).join(CR + LF) : s);
  console.log('  ' + (DRY ? 'would set ' : 'set ') + slug.padEnd(42) + oldFile.replace('.jpg', '') + ' -> ' + newLead
    + '  (' + master.w + 'px, ' + meta + ' meta refs)');
  done++;
}
console.log('\n' + (DRY ? 'would update ' : 'updated ') + done + ' posts' + (skipped ? ', ' + skipped + ' skipped' : ''));
