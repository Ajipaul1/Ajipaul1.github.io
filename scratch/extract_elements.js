const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Parse HTML tags and headings
const lines = html.split('\n');
let currentTag = null;
let currentId = null;
let currentClass = null;

console.log('--- HTML OUTLINE WITH HEADINGS ---');
lines.forEach((line, index) => {
  const sectionMatch = line.match(/<(section|div|header|footer)[^>]*(id|class)="([^"]+)"[^>]*>/);
  if (sectionMatch) {
    const tag = sectionMatch[1];
    const attr = sectionMatch[2];
    const val = sectionMatch[3];
    if (attr === 'id') {
      console.log(`L${index + 1}: <${tag} id="${val}">`);
    } else if (attr === 'class' && (tag === 'section' || val.includes('hero') || val.includes('container') || val.includes('wrapper'))) {
      console.log(`L${index + 1}: <${tag} class="${val}">`);
    }
  }
  const headingMatch = line.match(/<(h1|h2|h3)[^>]*>(.*?)<\/\1>/);
  if (headingMatch) {
    console.log(`  L${index + 1}:   ${headingMatch[1].toUpperCase()}: ${headingMatch[2].replace(/<[^>]*>/g, '')}`);
  }
});
