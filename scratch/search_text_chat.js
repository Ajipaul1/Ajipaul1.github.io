const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /[^<]*chat[^<]*/gi;
let match;
console.log('--- Chat Text Matches ---');
while ((match = regex.exec(html)) !== null) {
  const text = match[0].trim();
  if (text && !text.startsWith('<!--') && !text.includes('script') && !text.includes('svg')) {
    console.log(text);
  }
}
