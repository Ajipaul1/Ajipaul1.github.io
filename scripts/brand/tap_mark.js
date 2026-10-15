'use strict';
// THE TECHAUDITPROS LOGO MARK (owner's choice 2026-10-15: "Option A, screen face"): the laptop hero's screen with
// his eyes and smile, on a laptop base with the orange glow line. Drawn once here, in 64 x 64 artwork units, and
// used by every place that shows the logo:
//   scripts/brand/apply_logo.js  - the website headers and footers (inline, with the hop and the blink)
//   scripts/brand/build_kit.js   - favicons, app icons and every brand-kit download (PNG, SVG, PDF)
// Change the drawing here, then re-run both scripts.

const C = {
  navy: '#0B2036',      // screen, base, pupils, and "Tech" in the name
  orange: '#D9531E',    // screen rim, and "AuditPros" in the name
  orangeL: '#FF8A4C',   // glow line, and "AuditPros" on dark backgrounds
  amber: '#FFB547',     // eyes and smile
  baseDark: '#26476E'   // the base on dark backgrounds, where navy would vanish
};

// The mark's own box (for lockups with the name) and the square box (for icons): the drawing is 56 x 47 units,
// so in the square it is moved down 2.8 units to sit in the middle.
const TIGHT = { x: 4, y: 5.75, w: 56, h: 46.95 };
const SQUARE_SHIFT = 2.8;

const EYES = '<circle cx="24.5" cy="23" r="7"/><circle cx="39.5" cy="23" r="7"/>';
const PUPILS = '<circle cx="25.6" cy="22" r="3.3"/><circle cx="40.6" cy="22" r="3.3"/>';
const SHINE = '<circle cx="26.7" cy="20.8" r="1.1"/><circle cx="41.7" cy="20.8" r="1.1"/>';
const SMILE = 'M27.5 33 Q32 36.6 36.5 33';
const SCREEN = 'x="9" y="7" width="46" height="34" rx="8"';
const BASE = 'M4 45 H60 L56 52.5 H8 Z';
const GLOW = 'M9 51.8 H55';

// variant: 'color' (light backgrounds), 'dark' (dark backgrounds), 'mono' (one colour; eyes, smile and glow line are
// cut out so it works as a rubber stamp). id: unique id for the mono cut-out mask.
function parts(variant, opt) {
  opt = opt || {};
  if (variant === 'mono') {
    const fill = opt.fill || '#000', id = opt.id || 'tm-cut';
    return '<defs><mask id="' + id + '" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">'
      + '<rect x="0" y="0" width="64" height="64" fill="#fff"/>'
      + '<g fill="#000">' + EYES + '</g><g fill="#fff">' + PUPILS + '</g><g fill="#000">' + SHINE + '</g>'
      + '<path d="' + SMILE + '" fill="none" stroke="#000" stroke-width="2.4" stroke-linecap="round"/>'
      + '<path d="' + GLOW + '" stroke="#000" stroke-width="1.8" stroke-linecap="round"/>'
      + '</mask></defs>'
      + '<g mask="url(#' + id + ')" fill="' + fill + '"><rect ' + SCREEN + ' stroke="' + fill + '" stroke-width="2.5"/><path d="' + BASE + '"/></g>';
  }
  const base = variant === 'dark' ? C.baseDark : C.navy;
  return '<rect ' + SCREEN + ' fill="' + C.navy + '" stroke="' + C.orange + '" stroke-width="2.5"/>'
    + '<g class="tm-eyes"><g fill="' + C.amber + '">' + EYES + '</g><g fill="' + C.navy + '">' + PUPILS + '</g><g fill="#fff">' + SHINE + '</g></g>'
    + '<path d="' + SMILE + '" fill="none" stroke="' + C.amber + '" stroke-width="2.4" stroke-linecap="round"/>'
    + '<path d="' + BASE + '" fill="' + base + '"/>'
    + '<path d="' + GLOW + '" stroke="' + C.orangeL + '" stroke-width="1.8" stroke-linecap="round"/>';
}

// A complete SVG file. square: centred in 64 x 64 (icons); otherwise the tight box (lockups).
function svg(variant, opt) {
  opt = opt || {};
  const box = opt.square ? '0 0 64 64' : [TIGHT.x, TIGHT.y, TIGHT.w, TIGHT.h].join(' ');
  const inner = opt.square ? '<g transform="translate(0 ' + SQUARE_SHIFT + ')">' + parts(variant, opt) + '</g>' : parts(variant, opt);
  const size = opt.width ? ' width="' + opt.width + '" height="' + (opt.height || opt.width) + '"' : '';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + box + '"' + size + ' role="img" aria-label="TechAuditPros">' + inner + '</svg>';
}

module.exports = { C, TIGHT, SQUARE_SHIFT, parts, svg };
