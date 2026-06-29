const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<style>');
const endIdx = html.indexOf('</style>');
const css = html.slice(startIdx + 7, endIdx);

const classes = ['tap-new-hero', 'hero-grid', 'hero-pricing-stack', 'hero-pricing-card', 'hero-main-content', 'hero-flex-layout', 'hero-astronaut-image'];
const lines = css.split('\n');

console.log('--- Hero Styles found ---');
lines.forEach((line, index) => {
  const hasClass = classes.some(cls => line.includes(cls) || (lines[index-1] && lines[index-1].includes(cls)));
  if (hasClass) {
    console.log(`L${index + 1}: ${line}`);
  }
});
