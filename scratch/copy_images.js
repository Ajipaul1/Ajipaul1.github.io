const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Elitebook\\.gemini\\antigravity\\brain\\81ae9d47-e68b-49de-85fd-fbb6f83bc774';
const destLocDir = 'assets/images/locations';
const destBgDir = 'assets/images/bg';

// Create dest dirs if not exist
if (!fs.existsSync(destLocDir)) fs.mkdirSync(destLocDir, { recursive: true });
if (!fs.existsSync(destBgDir)) fs.mkdirSync(destBgDir, { recursive: true });

// Copy Australia
const ausSrc = path.join(srcDir, 'australia_seo_hero_1782744255954.png');
if (fs.existsSync(ausSrc)) {
  fs.copyFileSync(ausSrc, path.join(destLocDir, 'australia_seo_hero.png'));
  console.log('Copied Australia image');
}

// Copy Dubai
const dbiSrc = path.join(srcDir, 'dubai_seo_hero_1782744271629.png');
if (fs.existsSync(dbiSrc)) {
  fs.copyFileSync(dbiSrc, path.join(destLocDir, 'dubai_seo_hero.png'));
  console.log('Copied Dubai image');
}

// Copy Spacetime Gravity Grid
const grvSrc = path.join(srcDir, 'space_gravity_well_1782744286663.png');
if (fs.existsSync(grvSrc)) {
  fs.copyFileSync(grvSrc, path.join(destBgDir, 'space_gravity_well.png'));
  console.log('Copied Space Gravity Grid image');
}
