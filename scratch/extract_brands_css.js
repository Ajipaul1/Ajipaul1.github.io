const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<style>');
const endIdx = html.indexOf('</style>');
const css = html.slice(startIdx + 7, endIdx);

const classes = ['tap-brands', 'brands-carousel-grid', 'brands-section-header'];
const lines = css.split('\n');

console.log('--- Brands Section Styles ---');
lines.forEach((line, index) => {
  const hasClass = classes.some(cls => line.includes(cls));
  if (hasClass) {
    console.log(`L${index + 1}: ${line}`);
  }
});
