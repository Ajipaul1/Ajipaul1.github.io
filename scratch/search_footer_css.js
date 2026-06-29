const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<style>');
const endIdx = html.indexOf('</style>');
const css = html.slice(startIdx + 7, endIdx);

const lines = css.split('\n');

console.log('--- Footer CSS matches ---');
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('footer')) {
    console.log(`L${index + 1}: ${line}`);
  }
});
