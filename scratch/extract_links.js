const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<link[^>]*href="([^"]+)"[^>]*>/g;
let match;
console.log('--- Stylesheet Links ---');
while ((match = regex.exec(html)) !== null) {
  if (match[0].includes('stylesheet') || match[1].endsWith('.css')) {
    console.log(match[0]);
  }
}
