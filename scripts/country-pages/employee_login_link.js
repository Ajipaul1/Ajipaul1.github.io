'use strict';
// "Employee login" in the top utility bar of every page that has the site-wide header (2026-09-23).
// WHY: owner asked for a link from the website to the staff app at https://app.techauditpros.com/.
// rel="nofollow": the app is a noindexed login screen on its own subdomain, so search engines have
// nothing to gain from following it. nav_v4.js (drawerNav) carries the drawer link too, for its next full run.
// Idempotent: a page that already links to the app is left alone. Run again after any new page is built.
const L = require('./lib.js'); const fs = require('fs'); const path = require('path');

const APP = 'https://app.techauditpros.com/';
const LINK = `<a href="${APP}" rel="nofollow">Employee login</a>`;
const SKIP = ['node_modules', '.git', 'archive', 'scripts', 'scratch', 'supabase', 'api', 'videos', 'assets', 'ai_context'];
const walk = (d, out) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};

// Inserted in place, never by re-running nav_v4.js over the site: some pages (the homepage and the country hubs)
// were edited after nav_v4's last run, and a re-run moves their CSS block and drops the "Get a quote" drawer item.
let bar = 0, drawer = 0, already = 0;
for (const p of walk(L.REPO, [])) {
  let s = fs.readFileSync(p, 'utf8');
  const start = s;
  const eol = s.includes('\r\n') ? '\r\n' : '\n';

  // 1. top utility bar: last link, same indentation as the WhatsApp link before it
  const open = s.indexOf('<div class="header-utility-links">');
  if (open >= 0) {
    const close = s.indexOf('</div>', open);
    if (!s.slice(open, close).includes(APP)) {
      const before = s.slice(0, close);
      const indent = (before.match(/\n([ \t]*)<a [^\n]*<\/a>\s*$/) || [, '                '])[1];
      const trimmed = before.replace(/\s*$/, '');
      s = trimmed + eol + indent + LINK + before.slice(trimmed.length) + s.slice(close);
      bar++;
    }
  }

  // 2. phone drawer: after "Get a quote" (or after "Contact" where there is no quote link), before the CTA button
  const dOpen = s.indexOf('<nav class="drawer-nav">');
  if (dOpen >= 0) {
    const dClose = s.indexOf('</nav>', dOpen);
    const nav = s.slice(dOpen, dClose);
    if (!nav.includes(APP)) {
      const anchor = nav.match(/\n([ \t]*)<a href="\/quote\/">Get a quote<\/a>/) || nav.match(/\n([ \t]*)<a href="[^"]*#contact">Contact<\/a>/);
      if (anchor) {
        const at = dOpen + anchor.index + anchor[0].length;
        s = s.slice(0, at) + eol + anchor[1] + LINK + s.slice(at);
        drawer++;
      }
    }
  }

  if (s === start) { if (s.includes(APP)) already++; continue; }
  fs.writeFileSync(p, s);
}
console.log(`Employee login: top bar +${bar}, phone drawer +${drawer}, pages already done ${already}`);
