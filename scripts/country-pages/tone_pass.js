'use strict';
// TONE PASS (owner, 2026-09-03: "don't promote that one engineer concept anywhere, remove that, and
// don't do the money thing, make it like that is talkable").
//
//   1 THE SINGLE-ENGINEER PROMISE -> A TEAM. "a dedicated engineer", "your engineer", "the same
//     engineer", "a named engineer" become team language. Generic uses of the word (offshore rates,
//     "engineering talent", "real engineers write your code") are deliberately left alone.
//   2 OUR OWN PRICE -> A CONVERSATION. Every figure we charge (US$1,800 / CA$1,490 / GBP 1,200 /
//     AU$1,600 / AED 3,800, and the /mo, /month and 1.8K forms) becomes "one agreed monthly fee",
//     "scoped on a call" or "Let's talk", and the "save 57% vs an agency" claims go with them.
//     THIRD-PARTY MARKET FIGURES ARE KEPT ON PURPOSE - published Sage/NetSuite/Dynamics prices, agency
//     retainer ranges and per-user costs are research that makes the pages worth reading, and they are
//     what makes "let's talk about yours" land instead of looking evasive.
//
// SAFETY, learned the hard way on 2026-09-03: the first version of this script used plain string swaps,
// and 'dedicated engineer' -> 'dedicated engineering team' matched INSIDE ITS OWN OUTPUT, so a second
// run produced "engineering teaming teaming team" across 51 files (restored from the last commit).
// Three guards now make that impossible:
//   - every rule is a RegExp, with a negative lookahead where the output could re-match;
//   - assertFixedPoints() applies every rule to its own replacement before anything is written, and
//     aborts if any rule can match what it produces;
//   - in .js files, lines carrying an L.must() assertion or a comment are never rewritten, so generator
//     self-checks stay honest and are updated by hand when the copy they guard changes.
//   node scripts/country-pages/tone_pass.js           apply, then report residuals
//   node scripts/country-pages/tone_pass.js --report  report only, change nothing
const fs = require('fs'); const path = require('path');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';
const REPORT_ONLY = process.argv.includes('--report');
const rx = s => new RegExp(s, 'g');
const P = '(?:US\\$1,800|CA\\$1,490|&pound;1,200|\u00a31,200|AU\\$1,600|AED ?3,800)';   // our own price, any currency

const RULES = [
  // ===== 1. the single-engineer promise =====
  [rx('one dedicated engineer and project manager on every engagement'), 'one accountable team on every engagement'],
  [rx('One dedicated engineer owns the build end to end &mdash; with a team behind them\\.'), 'One accountable team owns the build end to end.'],
  [rx('One engineer owns your engagement end to end &mdash; the same person on every call, not a rotating account team\\.'), 'One accountable team owns your engagement end to end &mdash; the same people on every call, not a rotating account team.'],
  [rx('one dedicated engineer running all three'), 'one accountable team running all three'],
  [rx('run by one dedicated engineer instead of three separate vendors'), 'run by one accountable team instead of three separate vendors'],
  [rx('one dedicated engineer runs your ERP, website, and SEO together'), 'one accountable team runs your ERP, website, and SEO together'],
  [rx('and one named engineer answers for the result'), 'and one accountable team answers for the result'],
  [rx('A dedicated engineer \\+ project manager, not a ticket queue'), 'A dedicated engineering team, not a ticket queue'],
  [rx('A dedicated engineer \\+ PM, not a ticket queue'), 'A dedicated engineering team, not a ticket queue'],
  [rx('A named engineer beats an account manager relaying messages\\.'), 'An accountable engineering team beats an account manager relaying messages.'],
  [rx('a named engineer you will actually talk to'), 'an engineering team you will actually talk to'],
  [rx('named engineer you can actually talk to'), 'engineering team you can actually talk to'],
  [rx('named engineer who knows your account'), 'engineering team that knows your account'],
  [rx('named engineer who does the work and answers your questions'), 'engineering team that does the work and answers your questions'],
  [rx('a named engineer or specialist who fact-checks'), 'an engineer or specialist who fact-checks'],
  [rx('a named engineer fact-checks'), 'a senior engineer fact-checks'],
  [rx('overlap hours, response times, a named engineer'), 'overlap hours, response times, a named point of contact'],
  [rx('run by a named engineer you can talk to directly'), 'run by an accountable engineering team you can talk to directly'],
  [rx('from a named engineer'), 'from your engineering team'],
  [rx('A dedicated engineer already knows your system\\.'), 'The team that built it already knows your system.'],
  [rx('keep their dedicated engineer through the "run" phase'), 'keep the same team through the "run" phase'],
  [rx('assigns a dedicated engineer \\(and usually a project manager\\) who scopes'), 'assigns a dedicated engineering team who scope'],
  [rx('gets a dedicated engineer who scopes your actual workflows'), 'gets a dedicated engineering team who scope your actual workflows'],
  [rx('your dedicated engineer walking through'), 'your engineering team walking through'],
  [rx('includes a dedicated engineer and monthly reporting'), 'includes a dedicated engineering team and monthly reporting'],
  [rx('through the same dedicated engineer who built it'), 'through the same team that built it'],
  [rx('through the same dedicated engineer who ran your audit'), 'through the same team that ran your audit'],
  [rx('with a dedicated engineer reviewing, fact-checking, and editing'), 'with a senior engineer reviewing, fact-checking, and editing'],
  [rx('your dedicated engineer sits down with your team'), 'your engineering team sits down with you'],
  [rx('a dedicated engineer you can reach directly'), 'an engineering team you can reach directly'],
  [rx('You know your engineer by name, they know your business by heart'), 'You know the team by name, they know your business by heart'],
  [rx('Your engineer studies your real data'), 'Your engineering team studies your real data'],
  [rx('your engineer on Slack or Teams'), 'your team on Slack or Teams'],
  [rx('with your engineer(?!ing)'), 'with your team'],
  [rx('The same engineer keeps improving the system'), 'The same team keeps improving the system'],
  [rx('the same engineer keeps evolving it'), 'the same team keeps evolving it'],
  [rx('The engineer on your project is the same person from the first call to the hundredth deploy\\.'), 'The team on your project is the same from the first call to the hundredth deploy.'],
  [rx('the same named engineer, first call to hundredth deploy'), 'the same team, first call to hundredth deploy'],
  [rx('the same engineer on your project from the first call'), 'the same team on your project from the first call'],
  [rx('the same engineer who ran the audit'), 'the same team that ran the audit'],
  [rx('Keep the same engineers after go-live\\.'), 'Keep the same team after go-live.'],
  [rx('because the same engineers run SEO'), 'because the same team runs SEO'],
  [rx('by the same engineers who fix the technical side'), 'by the same team that fixes the technical side'],
  [rx('Dedicated engineer from discovery through support'), 'Dedicated engineering team from discovery through support'],
  [rx('Flat monthly rate, dedicated engineer, source code yours\\.'), 'One agreed monthly fee, a dedicated engineering team, source code yours.'],
  [rx('Dedicated Engineer Assigned'), 'Dedicated Team Assigned'],
  [rx('one invoice &middot; one engineer'), 'one invoice &middot; one team'],
  [rx('A Dedicated Engineer(?!ing)'), 'A Dedicated Team'],
  [rx('\\} Dedicated Engineer(?!ing)'), '} Dedicated Engineering Team'],
  [rx('Dedicated Engineer(?!ing)'), 'Dedicated Engineering Team'],
  [rx('a named engineer(?!ing)'), 'an engineering team'],
  [rx('A named engineer(?!ing)'), 'An engineering team'],
  [rx('named engineer(?!ing)'), 'engineering team'],
  [rx('one engineer(?!ing)'), 'one team'],
  [rx('the same engineers(?!hip)'), 'the same team'],
  [rx('the same engineer(?!ing|s)'), 'the same team'],
  [rx('dedicated engineer(?!ing)'), 'dedicated engineering team'],
  [rx('Dedicated engineer(?!ing)'), 'Dedicated engineering team'],

  // ===== 2. our own price becomes a conversation =====
  [rx('A flat ' + P + ' per month per engagement, all-in'), 'One agreed monthly fee per engagement, all-in'],
  [rx('at a flat &pound;1,200/month, with your data in AWS London'), 'for one agreed monthly fee, with your data in AWS London'],
  [rx('at a flat US\\$1,800/month, about 60% below a typical US agency'), 'for one agreed monthly fee, without the overhead a typical US agency has to recover'],
  [rx('at flat-rate pricing starting CA\\$1,490/month'), 'at one agreed monthly rate'],
  [rx('flat-rate pricing starting at CA\\$1,490/month'), 'one agreed monthly rate'],
  [rx('Plans start at CA\\$1,490/month flat-rate, commonly 40-57% below'), 'Plans run at one agreed monthly rate, commonly well below'],
  [rx('CA\\$1,490/month starting rate, typically 40&ndash;57% below'), 'One agreed monthly rate, typically well below'],
  [rx('at a flat rate starting (?:at )?CA\\$1,490/month'), 'at one agreed monthly rate'],
  [rx('\\(CA\\$1,490 in Canada\\)'), ''],
  [rx('\\(TechAuditPros:? US\\$1,800/month all-in\\)'), '(TechAuditPros: one agreed monthly fee, all-in)'],
  [rx('TechAuditPros:? US\\$1,800/m(?:o|onth) all-in'), 'TechAuditPros on one agreed monthly fee, all-in'],
  [rx('TechAuditPros US\\$1,800 a month all-in'), 'TechAuditPros on one agreed monthly fee, all-in'],
  [rx('support plan costs just CA\\$1,490 per month'), 'support plan runs at one agreed monthly fee'],
  [rx('backend to pay just \u00a31,200 per month\\.'), 'backend for one agreed monthly fee.'],
  [rx('platform costs AU\\$1,600 per month\\.'), 'platform runs at one agreed monthly fee.'],
  [rx('about 60% below a typical US agency'), 'without the overhead a typical US agency has to recover'],
  [rx('about 60% less'), 'well below a comparable agency'],
  [rx('typically 40&ndash;57% below'), 'typically well below'],
  [rx('commonly 40-57% below'), 'commonly well below'],
  [rx('flat one agreed monthly fee monthly rate'), 'one agreed monthly fee'],   // repair: an earlier run left this
  [rx('(?:its|our|the) flat ' + P + ' monthly rate'), 'one agreed monthly fee'],
  [rx('flat ' + P + ' monthly rate'), 'one agreed monthly fee'],
  [rx('(?:for )?a flat ' + P + ' (?:per month|a month|monthly rate)'), 'one agreed monthly fee'],
  [rx('flat ' + P + ' (?:per month|a month)'), 'one agreed monthly fee'],
  [rx('Flat ' + P + '/month, all-in'), 'One agreed monthly fee, all-in'],
  [rx('Flat US\\$1,800/month &mdash; month to month, in US dollars'), 'One agreed monthly fee &mdash; month to month, in US dollars'],
  [rx('Flat &pound;1,200/month &mdash; month to month, in pounds'), 'One agreed monthly fee &mdash; month to month, in pounds'],
  [rx('Flat US\\$1,800/month including'), 'One agreed monthly fee, including'],
  [rx('Flat US\\$1,800/month, you own the code'), 'One agreed monthly fee, and you own the code'],
  [rx('Flat US\\$1,800/month, no long-term contract'), 'One agreed monthly fee, no long-term contract'],
  [rx('flat ' + P + '/month'), 'one agreed monthly fee'],
  [rx('Custom \\(TechAuditPros\\) &mdash; &pound;1,200/mo flat'), 'Custom (TechAuditPros) &mdash; one agreed monthly fee'],
  [rx(P + ' per month'), 'one agreed monthly fee'],
  [rx('US\\$1,800 a month'), 'one agreed monthly fee'],
  // structural: cards, trust strips, stat rows
  [rx('<span class="num">(?:US\\$1,800|&pound;1,200)</span><span class="lbl">Flat starting rate/mo</span>'), '<span class="num">No lock-in</span><span class="lbl">Month to month, stop any time</span>'],
  [rx('<div class="num">(?:US\\$1\\.8K|&pound;1\\.2K|CA\\$1\\.5K)</div><div class="label">Flat monthly rate, no long-term contract</div>'), '<div class="num">Month to month</div><div class="label">No long-term contract, stop any time</div>'],
  [rx(P + '<span class="region-rate-period">/mo</span>'), 'Let\u2019s talk<span class="region-rate-period">pricing</span>'],
  [rx('<span class="region-rate-label">Starting rate</span><span class="region-save">Save \\d\\d%</span>'), '<span class="region-rate-label">Scoped on a call</span><span class="region-save">In writing</span>'],
  [rx(P + '/mo &bull; Save \\d\\d%'), 'Pricing scoped on a call'],
  [rx('&bull; (?:GBP|USD|CAD) pricing &bull;'), '&bull; quote in writing &bull;'],
  // generator literals
  [rx("num: '" + P + "/mo'"), "num: 'Let\u2019s talk'"],
  [rx("sub: 'Flat, all-in, month to month'"), "sub: 'Scoped on the call and put in writing'"],
  [rx("\\['(?:&pound;1,200|US\\$1,800)', 'Flat starting rate/mo'\\]"), "['No lock-in', 'Month to month']"],
  // bare tokens last
  [rx(P + '/month'), 'one agreed monthly fee'],
  [rx(P + '/mo'), 'one agreed fee'],
  [rx(P), 'one agreed monthly fee'],
  [rx('(?:US\\$1\\.8K|CA\\$1\\.5K|&pound;1\\.2K|\u00a31\\.2K)'), 'Let\u2019s talk'],
  [rx('Save (?:5\\d|6\\d)%'), 'Scoped to you'],
];

// ---- guard: no rule may match its own output, or a repeat run corrupts text ----
(function assertFixedPoints() {
  const bad = [];
  for (const [re, to] of RULES) {
    if (new RegExp(re.source).test(String(to))) bad.push(re.source + '   ->   ' + to);
  }
  if (bad.length) {
    console.error('ABORT: these rules match their own replacement, so a repeat run would corrupt text:');
    bad.forEach(b => console.error('  ' + b));
    process.exit(1);
  }
  console.log('fixed-point check: all ' + RULES.length + ' rules are safe to re-run');
})();

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(path.join(REPO, d || '.'))) {
    if (['node_modules', '.git', 'assets', 'archive', '.vercel'].includes(f)) continue;
    const rel = d ? d + '/' + f : f;
    if (fs.statSync(path.join(REPO, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html') || (rel.startsWith('scripts/') && f.endsWith('.js'))) files.push(rel);
  }
})('');

const isCodeLine = l => /L\.must\(|^\s*\/\//.test(l);   // generator assertions and comments are never rewritten

let touched = 0, edits = 0;
if (!REPORT_ONLY) {
  for (const rel of files) {
    if (rel.endsWith('tone_pass.js')) continue;
    const p = path.join(REPO, rel);
    const isJs = rel.endsWith('.js');
    const src = fs.readFileSync(p, 'utf8');
    const eol = src.includes('\r\n') ? '\r\n' : '\n';
    const out = src.split(/\r?\n/).map(line => {
      if (isJs && isCodeLine(line)) return line;
      let l = line;
      for (const [re, to] of RULES) { const n = (l.match(re) || []).length; if (n) { edits += n; l = l.replace(re, to); } }
      return l;
    }).join(eol);
    if (out !== src) { fs.writeFileSync(p, out); touched++; }
  }
  console.log('tone pass: ' + edits + ' replacements across ' + touched + ' files (of ' + files.length + ' scanned)');
}

// ---- residual + corruption report: all three must be zero ----
const OURS = /(US\$1,?800|CA\$1,?490|AU\$1,?600|AED\s?3,?800|&pound;1,?200|\u00a31,?200|US\$1\.8K|CA\$1\.5K|&pound;1\.2K|Save 5\d%|Save 6\d%)/;
const ENG = /(dedicated engineer(?!ing)|one engineer(?!ing)|named engineer(?!ing)|your engineer(?!ing|s)|the same engineer(?!ing|s))/i;
const CORRUPT = /(teaming|team team|fee fee|monthly fee monthly|feeing)/i;
let rp = 0, reng = 0, rc = 0;
for (const rel of files) {
  if (rel.endsWith('tone_pass.js')) continue;
  const s = fs.readFileSync(path.join(REPO, rel), 'utf8');
  for (const line of s.split(/\r?\n/)) {
    const code = isCodeLine(line);
    if (OURS.test(line) && !code) { rp++; if (rp <= 8) console.log('  PRICE LEFT ' + rel + ': ' + line.trim().replace(/\s+/g, ' ').slice(0, 130)); }
    if (ENG.test(line) && !code) { reng++; if (reng <= 8) console.log('  ENGINEER LEFT ' + rel + ': ' + line.trim().replace(/\s+/g, ' ').slice(0, 130)); }
    if (CORRUPT.test(line)) { rc++; if (rc <= 8) console.log('  CORRUPTION ' + rel + ': ' + line.trim().replace(/\s+/g, ' ').slice(0, 130)); }
  }
}
console.log('residual: our-price = ' + rp + ' | single-engineer = ' + reng + ' | corruption = ' + rc);
