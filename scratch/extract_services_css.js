const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<style>');
const endIdx = html.indexOf('</style>');
const css = html.slice(startIdx + 7, endIdx);

const classes = ['tap-services', 'services-dashboard', 'dashboard-services', 'live-dashboard', 'tap-security', 'security-badges'];
const lines = css.split('\n');

console.log('--- Services & Dashboard Styles ---');
lines.forEach((line, index) => {
  const hasClass = classes.some(cls => line.includes(cls));
  if (hasClass) {
    console.log(`L${index + 1}: ${line}`);
  }
});
