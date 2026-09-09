'use strict';
// Adds the YouTube channel everywhere the site already lists its social profiles, and completes the footer set.
// Owner request 2026-09-09: "add this link to the homepage, also mention all these other links in the footer".
//
// Before: hero icon row = Facebook, Instagram, LinkedIn, X on the 28 pages that render one (no YouTube anywhere
//         on the site); footer text links = Facebook, Instagram, LinkedIn on 114 pages (no X, no YouTube);
//         Organization sameAs = 6 profiles on 115 pages (no YouTube).
// After:  all three carry the full set. The hero row is shared chrome, so the channel goes on every page that
//         renders the row, not the homepage alone — a link that appears on one page only reads as a mistake.
//         Only 28 pages actually render the row; the other 116 carry the .hero-social-row CSS but no markup,
//         and /why-us/ has a bespoke hero, so on all of those the footer is what carries the profiles.
// Idempotent: every insertion is skipped when the target is already present.
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');

const YT = 'https://www.youtube.com/@TechAuditPros';
// the row is rendered on only 28 pages; the bare class name is in every page's <style>, so match the tag
const ROW_OPEN = '<div class="hero-social-row">';
const SKIP = ['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'];
const walk = (d, out) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};

// the YouTube glyph, drawn to match the single-path 24x24 icons already in the row
const YT_PATH = 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z';

const stat = { hero: 0, footer: 0, schema: 0, files: 0 };

for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  let s = fs.readFileSync(p, 'utf8');
  const before = s;

  // 1. hero icon row — insert after the X anchor, matching its indentation
  if (s.includes(ROW_OPEN) && !s.includes('aria-label="TechAuditPros on YouTube"')) {
    const re = /([ \t]*)<a href="https:\/\/x\.com\/techauditpros"[^>]*aria-label="TechAuditPros on X">[\s\S]*?<\/a>/;
    const m = s.match(re);
    if (m) {
      const ind = m[1];
      const block = '\n' + ind + '<a href="' + YT + '" target="_blank" rel="noopener" aria-label="TechAuditPros on YouTube">\n'
        + ind + '    <svg viewBox="0 0 24 24"><path d="' + YT_PATH + '"/></svg>\n'
        + ind + '</a>';
      s = s.replace(re, m[0] + block);
      stat.hero++;
    }
  }

  // 2. footer text links — complete the set after LinkedIn
  if (s.includes('footer-social-icons') && !s.includes('rel="noopener">YouTube</a>')) {
    const re = /([ \t]*)<a href="https:\/\/linkedin\.com\/in\/ajipaul-officia\/" target="_blank" rel="noopener">LinkedIn<\/a>/;
    const m = s.match(re);
    if (m) {
      const ind = m[1];
      let add = '';
      if (!/rel="noopener">X<\/a>/.test(s)) add += '\n' + ind + '<a href="https://x.com/techauditpros" target="_blank" rel="noopener">X</a>';
      add += '\n' + ind + '<a href="' + YT + '" target="_blank" rel="noopener">YouTube</a>';
      s = s.replace(re, m[0] + add);
      stat.footer++;
    }
  }

  // 3. Organization sameAs — the channel belongs in the entity's profile list.
  //    Scoped to the array: a whole-file test would be satisfied by the footer href added in step 2.
  {
    const si = s.indexOf('"sameAs"');
    const sj = si < 0 ? -1 : s.indexOf(']', si);
    if (sj > si) {
      const block = s.slice(si, sj);
      const m = block.match(/([ \t]*)"https:\/\/x\.com\/techauditpros",/);
      if (!block.includes(YT) && m) {
        s = s.slice(0, si) + block.replace(m[0], m[0] + '\n' + m[1] + '"' + YT + '",') + s.slice(sj);
        stat.schema++;
      }
    }
  }

  if (s !== before) { L.write(rel, s); stat.files++; }
}

// ---- guards: no page may end up with a partial set -------------------------------------------------
const problems = [];
for (const p of walk(L.REPO, [])) {
  const rel = path.relative(L.REPO, p).split(path.sep).join('/');
  const s = fs.readFileSync(p, 'utf8');
  if (s.includes(ROW_OPEN) && !s.includes('aria-label="TechAuditPros on YouTube"')) problems.push(rel + ': hero row without YouTube');
  if (s.includes('footer-social-icons') && !s.includes('rel="noopener">YouTube</a>')) problems.push(rel + ': footer without YouTube');
  if (s.includes('footer-social-icons') && !s.includes('rel="noopener">X</a>')) problems.push(rel + ': footer without X');
  {   // scoped to the array, for the same reason as the edit above
    const si = s.indexOf('"sameAs"');
    const sj = si < 0 ? -1 : s.indexOf(']', si);
    if (sj > si && !s.slice(si, sj).includes(YT)) problems.push(rel + ': sameAs without YouTube');
    if (sj > si && s.slice(si, sj).split(YT).length - 1 > 1) problems.push(rel + ': duplicate sameAs entry');
  }
  // one YouTube link per surface, not two
  if ((s.match(/aria-label="TechAuditPros on YouTube"/g) || []).length > 1) problems.push(rel + ': duplicate hero YouTube icon');
  if ((s.match(/rel="noopener">YouTube<\/a>/g) || []).length > 1) problems.push(rel + ': duplicate footer YouTube link');
}
if (problems.length) throw new Error(problems.length + ' page(s) left with a partial social set:\n  ' + problems.slice(0, 12).join('\n  '));

console.log('YouTube added — hero rows: ' + stat.hero + ' | footers: ' + stat.footer + ' | sameAs: ' + stat.schema + ' | files written: ' + stat.files);
