'use strict';
// Adds every generated post to scripts/build_bloghub.js (posts array, newest first), widens the
// category image pools with the now-licensed iStock shots, and points the Start Here SEO card at the
// new "What is SEO" pillar. Idempotent.
const L = require('./lib.js');
const fs = require('fs'); const path = require('path');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts_manifest.json'), 'utf8'));
const rel = 'scripts/build_bloghub.js';
let s = L.read(rel);

// ordered list: ERP pillars first, then SEO, then web (all same date; hub sorts by array order)
const order = [
  '/blog/what-is-seo.html', '/blog/how-much-does-a-website-cost.html', '/blog/what-is-cloud-erp.html',
  '/blog/what-is-a-content-strategy.html', '/blog/how-to-make-a-website-mobile-friendly.html', '/blog/erp-implementation-guide.html',
  '/blog/what-is-technical-seo.html', '/blog/custom-website-vs-template.html', '/blog/manufacturing-erp-small-manufacturers.html',
  '/blog/what-is-an-seo-audit.html', '/blog/what-is-web-development.html', '/blog/erp-system-examples.html',
  '/blog/on-page-vs-off-page-seo.html', '/blog/how-to-choose-a-web-development-company.html', '/blog/erp-vs-crm.html',
  '/blog/what-are-backlinks.html', '/blog/web-application-vs-website.html', '/blog/what-is-crm-software.html',
  '/blog/keyword-research-guide.html', '/blog/how-to-get-a-business-website.html', '/blog/how-to-choose-erp-software.html',
  '/blog/seo-content-writing.html', '/blog/what-is-a-landing-page-conversion.html', '/blog/what-is-hr-software.html',
  '/blog/title-tags-and-meta-descriptions.html', '/blog/how-to-design-a-website.html',
  '/blog/international-seo-guide.html', '/blog/seo-vs-sem.html', '/blog/is-seo-dead.html',
  '/blog/how-to-build-an-seo-strategy.html', '/blog/what-should-an-seo-report-include.html',
];
const missing = order.filter(u => !manifest[u]); if (missing.length) throw new Error('not in manifest: ' + missing.join(', '));
const extra = Object.keys(manifest).filter(u => !order.includes(u)); if (extra.length) throw new Error('manifest posts not ordered: ' + extra.join(', '));
const lines = order.filter(u => !s.includes(`'${u}'`)).map(u => `    ['${u}', '${manifest[u].cat}', '${manifest[u].date}'],`);
if (lines.length) {
  s = s.replace('const posts = [\n    // url, cat, dateISO, title-override(optional)\n', 'const posts = [\n    // url, cat, dateISO, title-override(optional)\n' + lines.join('\n') + '\n');
  console.log('added', lines.length, 'posts to the hub inventory');
} else console.log('hub inventory already complete');
L.must(s, "'/blog/what-is-seo.html'", 1);

// image pools: add licensed iStock shots so 60 cards do not cycle through 4 images per category
if (!s.includes('istock-2148073937-ai-wireframe-head-particles.jpg')) {
  s = s.replace("seo: ['team-standing-document-review-bright-room.jpg','team-flatlay-reviewing-business-report-charts.jpg','team-huddle-reviewing-screen-daylight.jpg','two-women-reviewing-document-bright-office.png'],",
    "seo: ['team-standing-document-review-bright-room.jpg','istock-1128252197-analyst-data-wall-pencil-thinking.jpg','team-flatlay-reviewing-business-report-charts.jpg','istock-2148073937-ai-wireframe-head-particles.jpg','team-huddle-reviewing-screen-daylight.jpg','istock-1954420507-stylus-tablet-charts-city-dusk.jpg','two-women-reviewing-document-bright-office.png','istock-2231952003-presenting-dashboard-wood-meeting-room.jpg'],");
  s = s.replace("erp: ['whiteboard-process-mapping-two-colleagues.jpg','mentor-explaining-data-on-monitor-warm-office.jpg','confident-leader-office-team-background.webp','client-consultation-meeting-clipboard.jpg'],",
    "erp: ['whiteboard-process-mapping-two-colleagues.jpg','istock-2155877725-factory-engineers-hardhats-tablet.jpg','mentor-explaining-data-on-monitor-warm-office.jpg','istock-1313265074-boardroom-team-through-glass-dark.jpg','confident-leader-office-team-background.webp','istock-2072805054-woman-tablet-neon-corridor.jpg','client-consultation-meeting-clipboard.jpg','istock-2189585598-electronics-factory-engineers-laptop.jpg'],");
  s = s.replace("web: ['female-developer-red-hair-dual-monitors-code.jpg','male-developer-dual-monitors-colorful-office.jpg','team-flatlay-reviewing-wireframe-sketch.jpg','female-developer-dual-monitors-colorful-office.jpg','empty-modern-tech-office-open-plan.jpg'],",
    "web: ['female-developer-red-hair-dual-monitors-code.jpg','istock-2150307337-creative-studio-neon-review.jpg','male-developer-dual-monitors-colorful-office.jpg','istock-2228764569-developer-night-debugging-monitors.jpg','team-flatlay-reviewing-wireframe-sketch.jpg','istock-2215674808-senior-guiding-junior-code-night.jpg','female-developer-dual-monitors-colorful-office.jpg','istock-1321462048-woman-holographic-ui-network.jpg','empty-modern-tech-office-open-plan.jpg'],");
  L.must(s, 'istock-2148073937-ai-wireframe-head-particles.jpg', 1);
  L.must(s, 'istock-2155877725-factory-engineers-hardhats-tablet.jpg', 1);
  L.must(s, 'istock-2150307337-creative-studio-neon-review.jpg', 1);
  console.log('image pools widened');
}

// Start Here: SEO pillar is now the "What is SEO" guide (GEO explainer stays in the grid)
const oldCard = `            <a class="start-card" href="/blog/generative-engine-optimization-geo/">
                <span class="start-tag">SEO &amp; AI Search</span>
                <h3>Generative Engine Optimization (GEO), Explained</h3>
                <p>How content gets cited by ChatGPT, Perplexity and AI Overviews &mdash; the search channel growing fastest.</p>`;
const newCard = `            <a class="start-card" href="/blog/what-is-seo.html">
                <span class="start-tag">SEO &amp; AI Search</span>
                <h3>What Is SEO and How Does It Work?</h3>
                <p>How Google and AI engines find, understand and recommend a site &mdash; the three types of SEO, what it costs, how long it takes.</p>`;
if (s.includes(oldCard)) { s = s.replace(oldCard, newCard); console.log('Start Here SEO card updated'); }
L.must(s, 'href="/blog/what-is-seo.html"', 1);
fs.writeFileSync(path.join(L.REPO, rel), s);
console.log('patched', rel);
