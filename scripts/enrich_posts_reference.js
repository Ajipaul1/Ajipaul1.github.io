// Add 2-3 images + a key-takeaways box + figcaption styling to the 4 modern posts.
'use strict';
const fs = require('fs');
const REPO = 'C:/Users/marke/OneDrive/Documents/GitHub/Ajipaul1.github.io';

const extraCss = `
  .article-figure figcaption{ font-family:var(--font-mono); font-size:0.75rem; color:var(--ink-faint); padding:10px 6px 0; text-align:center; }
  .article-takeaways{ background:var(--navy-deep); border-radius:14px; padding:26px 30px; margin:0 0 36px; }
  .article-takeaways h3{ color:#fff; font-size:0.85rem; font-family:var(--font-mono); text-transform:uppercase; letter-spacing:0.12em; margin:0 0 14px; }
  .article-takeaways ul{ margin:0; padding-left:20px; }
  .article-takeaways li{ color:rgba(255,255,255,0.85); font-size:0.95rem; line-height:1.6; margin-bottom:8px; }
  .article-takeaways li:last-child{ margin-bottom:0; }`;

const figureCss = `
  .article-figure{ margin:0 0 36px; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-md); }
  .article-figure img{ width:100%; display:block; }`;

function fig(src, alt, cap, w, h) {
    return `\n        <figure class="article-figure"><img src="/assets/images/library/${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy" /><figcaption>${cap}</figcaption></figure>\n        `;
}
function takeaways(items) {
    return `\n        <div class="article-takeaways">\n            <h3>Key Takeaways</h3>\n            <ul>\n${items.map(i => '                <li>' + i + '</li>').join('\n')}\n            </ul>\n        </div>\n`;
}

const jobs = [
    {
        file: 'blog/what-is-a-content-audit.html',
        takeaways: [
            'A content audit inventories every page on your site and scores it against real search data &mdash; before any new content gets written.',
            'Every page gets one of four verdicts: keep, improve, merge, or cut. The fastest gains usually come from fixing and cutting, not publishing more.',
            'In the AI-search era, audits also find the pages that <em>almost</em> qualify for AI citations &mdash; often the cheapest wins on the whole site.',
        ],
        inserts: [
            ['<h2>Why It Matters Even More in the AI-Search Era</h2>', fig('team-huddle-reviewing-screen-daylight.jpg', 'Team discussing audit findings around a monitor', 'The audit review: deciding keep, improve, merge, or cut &mdash; page by page.', 766, 400)],
            ['<h2>Where It Fits in an SEO Engagement</h2>', fig('team-standing-document-review-bright-room.jpg', 'Team reviewing printed audit documents together', 'Findings first, plan second &mdash; the audit sets the order of work.', 2400, 1601)],
        ],
    },
    {
        file: 'blog/website-design-vs-development.html',
        takeaways: [
            '<strong>Design</strong> is how the site looks and guides visitors; <strong>development</strong> is the engineering that makes it fast, secure, and functional.',
            'Most project failures happen in the handoff between separate design and development vendors &mdash; fewer handoffs, better results.',
            'Template builders are fine for simple sites; they break down the moment you need something the template didn&rsquo;t plan for.',
        ],
        inserts: [
            ['<h2>What a Developer Actually Does</h2>', fig('female-developer-red-hair-dual-monitors-code.jpg', 'Developer writing website code across two monitors', 'Development quality is measurable: Core Web Vitals score exactly this work.', 2400, 1601)],
            ['<h2>What to Ask Before Hiring Either</h2>', fig('male-developer-dual-monitors-colorful-office.jpg', 'Developer building a website in a modern studio office', 'One team, both disciplines: the designer and engineer sit at the same table.', 766, 400)],
        ],
    },
    {
        file: 'blog/what-is-erp-software-plain-english.html',
        takeaways: [
            'ERP software connects inventory, orders, finance, and people into <strong>one system</strong> &mdash; a single source of truth replacing scattered spreadsheets.',
            'The readiness test isn&rsquo;t company size, it&rsquo;s friction: hours spent re-typing data between systems is an ERP-shaped problem.',
            'Custom ERP flips the usual trade-off: the software adapts to your workflows instead of your business adapting to a template.',
        ],
        inserts: [
            ['<h2>Off-the-Shelf vs. Custom ERP</h2>', fig('mentor-explaining-data-on-monitor-warm-office.jpg', 'Engineer walking a client through operational data on screen', 'A custom build starts with your real data and workflows, not a demo environment.', 1344, 1335)],
            ['<h2>What a Custom ERP Build Actually Looks Like</h2>', fig('confident-leader-office-team-background.webp', 'Project lead reviewing an ERP build with the team working behind her', 'One accountable team owns the build end to end.', 2000, 1333)],
        ],
    },
    {
        file: 'blog/full-service-vs-diy-erp-agency-canada.html',
        needsFigureCss: true,
        leadFig: fig('confident-leader-office-team-background.webp', 'Project lead standing while the delivery team works behind her', 'Full-service means someone else owns the outcome &mdash; that&rsquo;s what you&rsquo;re paying for.', 2000, 1333),
        takeaways: [
            'DIY platforms suit simple requirements and teams with technical time to spare; full-service suits specific workflows and no appetite for self-configuration.',
            'The expensive mistake is mismatching: forcing complex operations through a template, or paying agency rates for template-grade needs.',
            'Five contract questions &mdash; human review, real pricing at scale, a named contact, code ownership, and time-to-working-software &mdash; expose most bad fits early.',
        ],
        inserts: [
            ['<h2>Five Questions to Ask Before You Sign</h2>', fig('client-consultation-meeting-clipboard.jpg', 'Consultant walking a client through scoping questions', 'Ask these before signing &mdash; good partners answer all five without flinching.', 547, 365)],
        ],
    },
];

for (const job of jobs) {
    const path = REPO + '/' + job.file;
    let s = fs.readFileSync(path, 'utf8');
    if (s.includes('article-takeaways')) { console.log(job.file + ': already enriched, skipping'); continue; }

    // css additions into the article style block
    const cssAnchor = '.article-author-role{ font-size:0.8rem; color:var(--ink-faint); }';
    let cssAdd = extraCss;
    if (job.needsFigureCss && !s.includes('.article-figure{')) cssAdd = figureCss + extraCss;
    s = s.replace(cssAnchor, cssAnchor + cssAdd);

    // lead figure (only for the post missing one)
    const bodyMark = '<section class="article-body">\n    <div class="container">';
    if (job.leadFig) s = s.replace(bodyMark, bodyMark + job.leadFig.replace(/<figcaption>[\s\S]*?<\/figcaption>/, '')); // lead has no caption, like the other posts

    // takeaways after the lead figure (or right at body start if none)
    if (s.includes('</figure>')) {
        s = s.replace('</figure>', '</figure>' + takeaways(job.takeaways));
    } else {
        s = s.replace(bodyMark, bodyMark + takeaways(job.takeaways));
    }

    // inline figures before chosen h2s
    for (const [anchor, markup] of job.inserts) {
        if (!s.includes(anchor)) { console.error(job.file + ': MISSING ANCHOR ' + anchor); process.exit(1); }
        s = s.replace(anchor, markup + anchor);
    }
    fs.writeFileSync(path, s);
    console.log(job.file + ': enriched (takeaways + ' + (job.inserts.length + (job.leadFig ? 1 : 0)) + ' images)');
}
