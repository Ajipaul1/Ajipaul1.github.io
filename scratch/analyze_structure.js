const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<(section|div|header|footer)[^>]*id="([^"]+)"[^>]*>/g;
let match;
const elements = [];
while ((match = regex.exec(html)) !== null) {
  elements.push({ tag: match[1], id: match[2] });
}

console.log('Structure Outline:');
elements.forEach(el => {
  console.log(`- <${el.tag} id="${el.id}">`);
});
