const fs = require('fs');

const css = fs.readFileSync('assets/css/hero-page.css', 'utf8');

// Remove comments
let minified = css.replace(/\/\*[\s\S]*?\*\//g, '');

// Remove extra whitespace
minified = minified.replace(/\s+/g, ' ');

// Remove spaces around selectors, properties, etc.
minified = minified.replace(/\s*{\s*/g, '{');
minified = minified.replace(/\s*}\s*/g, '}');
minified = minified.replace(/\s*;\s*/g, ';');
minified = minified.replace(/\s*:\s*/g, ':');
minified = minified.replace(/;\s*}/g, '}');

fs.writeFileSync('assets/css/hero-page.min.css', minified);