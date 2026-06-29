const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- Matches for "Canada" ---');
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('canada')) {
    console.log(`L${index + 1}: ${line.trim()}`);
  }
});
