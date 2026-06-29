const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- Matches for "Chat" or "Widget" ---');
lines.forEach((line, index) => {
  if (line.toLowerCase().includes('chat') || line.toLowerCase().includes('widget')) {
    console.log(`L${index + 1}: ${line.trim()}`);
  }
});
