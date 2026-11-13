/* Tyre business demo - TechAuditPros.
   No backend: the sample data is built in the browser and starts again on every reload.
   Only the look (colour, light or dark, spacing, business name, currency, tax) is remembered, in localStorage. */
(() => {
'use strict';

/* ---------- small helpers ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
const r2 = n => Math.round(n * 100) / 100;
const DAY = 864e5;
const NOW = new Date();
const TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const dAgo = n => addDays(TODAY, -n);
const dayDiff = (a, b) => Math.round((addDays(b, 0) - addDays(a, 0)) / DAY);
const fmtD = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const fmtDs = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const fmtT = d => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const num = n => Number(n).toLocaleString('en-US');
const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
function ago(ts) {
  const m = Math.round((Date.now() - ts) / 6e4);
  if (m < 1) return 'just now';
  if (m < 60) return m + ' min ago';
  if (m < 720) return Math.round(m / 60) + ' h ago';
  return fmtDs(ts) + ', ' + fmtT(ts);
}

/* ---------- icons (24px, drawn with strokes) ---------- */
const I = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14zM20 20l-3.6-3.6',
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  home: 'M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z',
  box: 'M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16zM3.5 8L12 12.5 20.5 8M12 12.5v8',
  in: 'M12 4v10M7.5 9.5L12 14l4.5-4.5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
  out: 'M12 14V4M7.5 8.5L12 4l4.5 4.5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
  chart: 'M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3',
  users: 'M9 11a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7zM2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.5 2.4 3.5 5.2',
  bell: 'M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0',
  palette: 'M12 3a9 9 0 1 0 0 18c1.2 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.2A3.8 3.8 0 0 0 21 10.6C21 6.4 17 3 12 3zM7.5 11.5h.01M9.5 7.5h.01M14.5 7h.01',
  alert: 'M12 4l9 16H3zM12 10v4.5M12 17.5h.01',
  download: 'M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14',
  print: 'M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2M7 14h10v6H7z',
  'chev-right': 'M9 6l6 6-6 6',
  'chev-left': 'M15 6l-6 6 6 6',
  sun: 'M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z',
  monitor: 'M4 5h16v11H4zM9 20h6M12 16v4',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  refresh: 'M20 11a8 8 0 0 0-14.3-4M4 4v4h4M4 13a8 8 0 0 0 14.3 4M20 20v-4h-4',
  table: 'M4 5h16v14H4zM4 10h16M4 15h16M10 5v14',
  truck: 'M3 6h11v10H3zM14 9h4l3 3.5V16h-7M7 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4z',
  receipt: 'M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8zM9 8h6M9 12h6',
  wallet: 'M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 7V6a2 2 0 0 1 2-2h10M16 13.5h.01',
  send: 'M4 12l16-8-6 16-3-7z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17zM12 7.5V12l3 2',
  tyre: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zM12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zM12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21'
};
const icon = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="${I[n]}"/></svg>`;

/* ---------- settings (the only thing that is remembered) ---------- */
const KEY = 'tyredemo.settings';
const SWATCHES = [['Blue', '#1a73e8'], ['Indigo', '#4f46e5'], ['Violet', '#7c3aed'], ['Pink', '#d01884'], ['Red', '#d93025'], ['Orange', '#e8710a'], ['Green', '#188038'], ['Teal', '#0d9488'], ['Graphite', '#3c4858']];
const CURS = [['USD', 'US dollar'], ['EUR', 'Euro'], ['GBP', 'British pound'], ['AED', 'UAE dirham'], ['SAR', 'Saudi riyal'], ['ZAR', 'South African rand'], ['INR', 'Indian rupee'], ['AUD', 'Australian dollar'], ['CAD', 'Canadian dollar']];
const DEFAULTS = { name: 'Demo Tyre Co.', color: '#1a73e8', mode: 'system', density: 'comfortable', cur: 'USD', tax: 0, link: '' };
function loadSettings() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { s = {}; }
  s = Object.assign({}, DEFAULTS, s);
  /* a link can carry a look: ?name=...&color=1a73e8&mode=dark&cur=USD (applied once per link) */
  try {
    const qs = location.search, q = new URLSearchParams(qs);
    if (qs && s.link !== qs) {
      const n = (q.get('name') || '').trim().slice(0, 40), c = q.get('color') || '', m = q.get('mode') || '', cu = (q.get('cur') || '').toUpperCase();
      if (n) s.name = n;
      if (/^[0-9a-f]{6}$/i.test(c)) s.color = '#' + c.toLowerCase();
      if (['light', 'dark', 'system'].includes(m)) s.mode = m;
      if (cu) s.cur = cu;
      s.link = qs;
    }
  } catch (e) { /* no URL support: keep stored settings */ }
  if (!/^#[0-9a-f]{6}$/i.test(s.color)) s.color = DEFAULTS.color;
  if (!['light', 'dark', 'system'].includes(s.mode)) s.mode = 'system';
  if (!['comfortable', 'compact'].includes(s.density)) s.density = 'comfortable';
  if (!CURS.some(c => c[0] === s.cur)) s.cur = 'USD';
  s.tax = Math.min(30, Math.max(0, +s.tax || 0));
  s.name = String(s.name || DEFAULTS.name).slice(0, 40);
  return s;
}
let S = loadSettings();
const saveSettings = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private window: the look lasts for this visit only */ } };

let nf, nf0, nfc;
function setCurrency() {
  const mk = o => { try { return new Intl.NumberFormat('en-US', Object.assign({ style: 'currency', currency: S.cur, currencyDisplay: 'narrowSymbol' }, o)); } catch (e) { return new Intl.NumberFormat('en-US', Object.assign({ style: 'currency', currency: S.cur }, o)); } };
  nf = mk({}); nf0 = mk({ maximumFractionDigits: 0 });
  try { nfc = mk({ notation: 'compact', maximumFractionDigits: 1 }); } catch (e) { nfc = nf0; }
}
const money = n => nf.format(n || 0);
const money0 = n => nf0.format(Math.round(n || 0));
const moneyC = n => nfc.format(n || 0);

/* ---------- theme: every accent shade is worked out from the one chosen colour ---------- */
const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb2hex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => { const x = hex2rgb(a), y = hex2rgb(b); return rgb2hex(x.map((v, i) => v + (y[i] - v) * t)); };
const lum = h => { const a = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
function tune(c, bg, target, toward) { let out = c, t = 0; while (contrast(out, bg) < target && t < 1) { t += 0.05; out = mix(c, toward, t); } return out; }
const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
function applyTheme() {
  const root = document.documentElement, dark = S.mode === 'dark' || (S.mode === 'system' && mq.matches);
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.setAttribute('data-density', S.density);
  const surface = dark ? '#161a21' : '#ffffff', pole = dark ? '#ffffff' : '#000000';
  const accent = dark ? tune(S.color, surface, 5, '#ffffff') : S.color;
  const weak = mix(surface, accent, dark ? 0.2 : 0.1);
  const st = root.style;
  st.setProperty('--accent', accent);
  st.setProperty('--accent-hover', mix(accent, pole, 0.12));
  st.setProperty('--accent-weak', weak);
  st.setProperty('--accent-text', tune(S.color, weak, 4.6, pole));
  st.setProperty('--accent-mark', tune(S.color, surface, 3, pole));
  st.setProperty('--on-accent', contrast(accent, '#ffffff') >= 3 ? '#ffffff' : '#10151c');
  const tc = $('#theme-color'); if (tc) tc.setAttribute('content', surface);
}

/* ---------- sample data ---------- */
const STAFF = [
  { id: 'owner', name: 'Alex Morgan', role: 'Owner', init: 'AM', sees: 'Everything: stock, money, profit and the team.' },
  { id: 'sales', name: 'Sam Patel', role: 'Sales desk', init: 'SP', sees: 'Invoices, customers and stock. No cost prices, no profit.' },
  { id: 'store', name: 'Jordan Lee', role: 'Warehouse', init: 'JL', sees: 'Stock only. No prices to change, no money pages.' }
];
const PAGES = [
  { id: 'home', label: 'Dashboard', short: 'Home', icon: 'home' },
  { id: 'inventory', label: 'Inventory', short: 'Stock', icon: 'box' },
  { id: 'collect', label: 'Money to collect', short: 'Collect', icon: 'in' },
  { id: 'pay', label: 'Money to pay', short: 'Pay', icon: 'out' },
  { id: 'finance', label: 'Finance', short: 'Finance', icon: 'chart' },
  { id: 'team', label: 'Team & access', short: 'Team', icon: 'users' }
];
const ACCESS = { owner: ['home', 'inventory', 'collect', 'pay', 'finance', 'team'], sales: ['collect', 'inventory'], store: ['inventory'] };

function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

function seed() {
  const R = mulberry(90210), ri = (a, b) => a + Math.floor(R() * (b - a + 1)), pick = a => a[Math.floor(R() * a.length)];
  const clampNow = t => t > NOW ? new Date(NOW.getTime() - ri(10, 200) * 6e4) : t;
  /* brand, pattern, size, type, selling price, in stock now, reorder level */
  const raw = [
    ['Michelin', 'Primacy 4', '205/55 R16', 'Car', 128, 34, 12],
    ['Michelin', 'Energy XM2+', '185/65 R15', 'Car', 92, 46, 16],
    ['Bridgestone', 'Turanza T005', '215/60 R16', 'Car', 121, 28, 12],
    ['Bridgestone', 'Ecopia EP150', '195/65 R15', 'Car', 88, 52, 16],
    ['Goodyear', 'Assurance TripleMax 2', '195/55 R16', 'Car', 96, 24, 12],
    ['Goodyear', 'EfficientGrip Performance', '225/45 R17', 'Car', 134, 18, 8],
    ['Continental', 'PremiumContact 6', '225/50 R17', 'Car', 149, 3, 8],
    ['Continental', 'UltraContact UC6', '205/60 R16', 'Car', 112, 30, 12],
    ['Pirelli', 'Cinturato P7', '225/45 R18', 'Car', 162, 14, 8],
    ['Yokohama', 'BluEarth-GT AE51', '215/55 R17', 'Car', 118, 22, 8],
    ['Dunlop', 'SP Sport LM705', '195/60 R15', 'Car', 79, 38, 12],
    ['Hankook', 'Kinergy Eco2 K435', '175/65 R14', 'Car', 64, 6, 16],
    ['Hankook', 'Ventus Prime 3', '215/45 R17', 'Car', 104, 20, 8],
    ['Michelin', 'Latitude Sport 3', '235/60 R18', 'SUV', 196, 16, 8],
    ['Bridgestone', 'Dueler H/T 684 II', '265/65 R17', 'SUV', 178, 26, 8],
    ['Goodyear', 'Wrangler AT SilentTrac', '265/70 R16', 'SUV', 169, 12, 8],
    ['Continental', 'CrossContact LX2', '225/65 R17', 'SUV', 158, 18, 8],
    ['Pirelli', 'Scorpion Verde', '235/55 R19', 'SUV', 214, 2, 6],
    ['Yokohama', 'Geolandar A/T G015', '245/70 R16', 'SUV', 152, 20, 8],
    ['Dunlop', 'Grandtrek AT5', '265/60 R18', 'SUV', 171, 10, 6],
    ['Michelin', 'Agilis 3', '215/70 R15C', 'Van', 138, 24, 8],
    ['Bridgestone', 'Duravis R660', '195 R14C', 'Van', 109, 32, 12],
    ['Bridgestone', 'R156', '11R22.5', 'Truck', 412, 0, 4],
    ['Goodyear', 'KMAX S', '315/80 R22.5', 'Truck', 468, 8, 4]
  ];
  const products = raw.map((r, i) => ({ id: 'p' + (i + 1), brand: r[0], pattern: r[1], size: r[2], type: r[3], price: r[4], cost: Math.round(r[4] * (0.74 + R() * 0.06)), qty: r[5], reorder: r[6], sku: r[0].slice(0, 3).toUpperCase() + '-' + r[2].replace(/[^0-9C]/g, ''), rack: 'ABCD'[i % 4] + (1 + i % 6) + '-' + String(1 + (i * 7) % 12).padStart(2, '0') }));
  const customers = [
    { id: 'cash', name: 'Walk-in customer', phone: '', limit: 0, terms: 0 },
    { id: 'c1', name: 'Coastal Cabs', phone: '+1 555 0114', limit: 6000, terms: 30 },
    { id: 'c2', name: 'Rapid Logistics', phone: '+1 555 0127', limit: 12000, terms: 30 },
    { id: 'c3', name: 'Greenline Transport', phone: '+1 555 0132', limit: 8000, terms: 30 },
    { id: 'c4', name: 'City Auto Care', phone: '+1 555 0145', limit: 4000, terms: 15 },
    { id: 'c5', name: 'Metro Car Rentals', phone: '+1 555 0158', limit: 7000, terms: 30 },
    { id: 'c6', name: 'Sunrise Motors', phone: '+1 555 0163', limit: 3000, terms: 15 },
    { id: 'c7', name: 'Harbour Movers', phone: '+1 555 0176', limit: 9000, terms: 30 },
    { id: 'c8', name: 'Prime Auto Garage', phone: '+1 555 0189', limit: 3000, terms: 15 }
  ];
  const suppliers = [
    { id: 's1', name: 'Apex Tyre Distributors', phone: '+1 555 0201', terms: 30, brands: ['Michelin', 'Continental'], pre: 'AX' },
    { id: 's2', name: 'Global Rubber Imports', phone: '+1 555 0212', terms: 45, brands: ['Bridgestone', 'Dunlop'], pre: 'GR' },
    { id: 's3', name: 'Summit Wheels Wholesale', phone: '+1 555 0223', terms: 30, brands: ['Goodyear', 'Pirelli'], pre: 'SW' },
    { id: 's4', name: 'Eastern Tyre Traders', phone: '+1 555 0234', terms: 15, brands: ['Yokohama', 'Hankook'], pre: 'ET' }
  ];
  const invoices = [], bills = [], expenses = [], moves = [], log = [];
  let invNo = 1000, billNo = 0, expNo = 0, turn = 0;
  const weighted = [];
  products.forEach(p => { for (let k = ({ Car: 4, SUV: 3, Van: 2, Truck: 1 })[p.type]; k > 0; k--) weighted.push(p); });
  const qtyFor = (p, credit) => p.type === 'Truck' ? (credit ? pick([2, 4, 6]) : pick([1, 2])) : credit ? pick([4, 4, 4, 6, 8]) : pick([1, 2, 2, 2, 4, 4, 4]);
  /* the story the demo tells: two customers are late, one is close to the credit limit */
  const fixed = { 52: [['c6', [[11, 8]], 0]], 38: [['c6', [[3, 4], [10, 4]], 0]], 41: [['c5', [[13, 8], [16, 4]], 0.4]], 6: [['c1', [[2, 16], [7, 16], [0, 8]], 0]] };

  const addInv = (d, day, ts, cid, items, by, part) => {
    const c = customers.find(x => x.id === cid), credit = cid !== 'cash';
    const lines = items.map(it => ({ pid: it[0].id, qty: it[1], price: r2(it[0].price * (it[2] || 1)), cost: it[0].cost }));
    const total = r2(sum(lines, l => l.qty * l.price));
    const inv = { id: 'INV-' + (++invNo), date: day, ts, cust: cid, lines, taxRate: 0, paid: 0, pays: [], due: credit ? addDays(day, c.terms) : null, by };
    const payOn = n => clampNow(new Date(addDays(day, Math.min(d, n)).getTime() + ri(570, 1020) * 6e4));
    if (!credit) { inv.paid = total; inv.pays.push({ date: ts, amt: total, method: pick(['Cash', 'Card', 'Cash', 'Bank transfer']) }); }
    else if (part != null) { if (part > 0) { inv.paid = r2(total * part); inv.pays.push({ date: payOn(9), amt: inv.paid, method: 'Bank transfer' }); } }
    else if (d >= c.terms - 1) { inv.paid = total; inv.pays.push({ date: payOn(ri(Math.max(1, c.terms - 8), c.terms)), amt: total, method: 'Bank transfer' }); }
    else if (d > 3 && R() < 0.25) { inv.paid = r2(total * 0.5); inv.pays.push({ date: payOn(ri(1, 3)), amt: inv.paid, method: 'Bank transfer' }); }
    invoices.push(inv);
    lines.forEach(l => moves.push({ ts, pid: l.pid, qty: -l.qty, kind: 'Sale', ref: inv.id, by }));
    if (d <= 10) log.push({ ts, by, text: 'made invoice ' + inv.id + ' for ' + c.name, amt: total });
  };

  for (let d = 199; d >= 0; d--) {
    const day = dAgo(d), at = m => new Date(day.getTime() + m * 6e4);
    /* supplier bills: one every five days, plus one overdue and one due this week */
    const fb = d === 19 ? 3 : d === 28 ? 2 : -1;
    if (d % 5 === 2 || fb >= 0) {
      const s = suppliers[fb >= 0 ? fb : turn++ % 4], pool = products.filter(p => s.brands.includes(p.brand));
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)), t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
      const lines = pool.slice(0, ri(3, 4)).map(p => ({ pid: p.id, qty: p.type === 'Truck' ? pick([4, 6, 8]) : pick([12, 16, 20, 24, 32]), price: p.cost }));
      const total = r2(sum(lines, l => l.qty * l.price)), ts = at(ri(600, 720));
      const b = { id: 'BILL-' + String(++billNo).padStart(4, '0'), ref: s.pre + '-' + (20400 + billNo * 7), date: day, ts, sup: s.id, lines, paid: 0, pays: [], due: addDays(day, s.terms), by: 'store' };
      const early = R() < 0.3;
      if (fb < 0 && (d >= s.terms - 2 || early)) {
        const after = Math.min(d, early ? ri(1, 5) : s.terms - ri(0, 3));
        b.paid = total; b.pays.push({ date: clampNow(new Date(addDays(day, after).getTime() + ri(600, 960) * 6e4)), amt: total, method: 'Bank transfer' });
      }
      bills.push(b);
      lines.forEach(l => moves.push({ ts, pid: l.pid, qty: l.qty, kind: 'Purchase', ref: b.ref, by: 'store' }));
      if (d <= 10) log.push({ ts, by: 'store', text: 'received ' + sum(lines, l => l.qty) + ' tyres from ' + s.name + ' (bill ' + b.ref + ')', amt: total });
    }
    /* sales */
    const fx = fixed[d] || [], n = d === 0 ? 3 : day.getDay() === 0 ? ri(1, 2) : ri(3, 6);
    const mins = Array.from({ length: n + fx.length }, () => ri(545, 1090)).sort((a, b) => a - b);
    let k = 0;
    fx.forEach(f => addInv(d, day, at(mins[k++]), f[0], f[1].map(x => [products[x[0]], x[1]]), 'sales', f[2]));
    for (let i = 0; i < n; i++) {
      const ts = d === 0 ? new Date(NOW.getTime() - [96, 41, 9][i] * 6e4) : at(mins[k++]);
      const pool = customers.filter(c => c.id !== 'cash' && !(d < 60 && (c.id === 'c5' || c.id === 'c6')) && !(d < 30 && c.id === 'c1'));
      const credit = d > 0 && R() < 0.12, cid = credit ? pick(pool).id : 'cash';
      const p1 = pick(weighted), items = [[p1, qtyFor(p1, credit), credit && R() < 0.5 ? 0.96 : 1]];
      if (R() < 0.25) { const p2 = pick(weighted); if (p2 !== p1) items.push([p2, qtyFor(p2, credit)]); }
      addInv(d, day, ts, cid, items, R() < 0.8 ? 'sales' : 'owner');
    }
    /* expenses (today's are not entered yet) */
    if (d > 0) {
      const ex = (cat, amt, note) => { const e = { id: 'EXP-' + (++expNo), date: day, ts: at(ri(960, 1080)), cat, amt, note, by: 'owner' }; expenses.push(e); if (d <= 10) log.push({ ts: e.ts, by: 'owner', text: 'added an expense: ' + note, amt }); };
      if (day.getDate() === 1) ex('Rent', 1800, 'Warehouse rent');
      if (day.getDate() === 5) ex('Electricity & water', ri(230, 290), 'Monthly electricity and water');
      if (day.getDate() === 28) ex('Salaries', 3600, 'Salaries for 3 staff');
      if (day.getDay() === 5) ex('Transport & delivery', ri(90, 160), 'Delivery van fuel');
      if (d % 23 === 4) ex('Repairs & maintenance', ri(60, 220), pick(['Compressor service', 'Forklift service', 'Rack repair']));
      if (d % 17 === 9) ex('Office & other', ri(25, 90), pick(['Printer paper and ink', 'Internet bill', 'Tea and cleaning']));
    }
    if (d === 9) { const ts = at(700); moves.push({ ts, pid: products[14].id, qty: -1, kind: 'Adjustment', ref: 'Damaged in handling', by: 'store' }); log.push({ ts, by: 'store', text: 'corrected stock of ' + products[14].brand + ' ' + products[14].pattern + ' by -1 (damaged in handling)' }); }
    if (d === 3) { const ts = at(1020); moves.push({ ts, pid: products[1].id, qty: 2, kind: 'Adjustment', ref: 'Stock count correction', by: 'store' }); log.push({ ts, by: 'store', text: 'corrected stock of ' + products[1].brand + ' ' + products[1].pattern + ' by +2 (stock count)' }); }
  }
  invoices.forEach(i => { if (i.cust !== 'cash') i.pays.forEach(p => { if (dayDiff(p.date, TODAY) <= 10) log.push({ ts: p.date, by: 'owner', text: 'received a payment from ' + customers.find(c => c.id === i.cust).name + ' for ' + i.id, amt: p.amt }); }); });
  return { products, customers, suppliers, invoices, bills, expenses, moves, log, invNo, billNo, expNo };
}

/* ---------- state ---------- */
let db = seed(), role = 'owner', route = '', F = null, G = null, menuEl = null, menuFor = '';
const ui = { guide: true, pg: {}, ct: {}, inv: { tab: 'tyres', q: '', brand: '', type: '', low: false, mq: '', kind: '' }, col: { tab: 'inv', f: 'unpaid', q: '' }, pay: { tab: 'bills', f: 'unpaid', q: '' }, fin: { tab: 'pl', m: 0 } };

/* ---------- what the numbers mean ---------- */
const P = id => db.products.find(p => p.id === id);
const C = id => db.customers.find(c => c.id === id);
const SUP = id => db.suppliers.find(s => s.id === id);
const ST = id => STAFF.find(s => s.id === id);
const can = page => ACCESS[role].includes(page);
const pname = p => p.brand + ' ' + p.pattern;
const pfull = p => p.brand + ' ' + p.pattern + ' · ' + p.size;
function tot(doc) {
  const sub = r2(sum(doc.lines, l => l.qty * l.price)), tax = r2(sub * (doc.taxRate || 0) / 100), total = r2(sub + tax);
  return { sub, tax, total, bal: Math.max(0, r2(total - doc.paid)), cost: sum(doc.lines, l => l.qty * (l.cost || 0)), units: sum(doc.lines, l => l.qty) };
}
function stat(doc) {
  if (tot(doc).bal < 0.005) return { k: 'paid', label: 'Paid', cls: 'ok', ic: 'check' };
  const late = doc.due ? dayDiff(doc.due, TODAY) : 0;
  if (late > 0) return { k: 'overdue', label: plural(late, 'day') + ' late', cls: 'bad', ic: 'alert' };
  const due = late === 0 ? 'Due today' : 'Due in ' + plural(-late, 'day');
  return doc.paid > 0 ? { k: 'part', label: 'Part paid · ' + due, cls: 'warn', ic: 'clock' } : { k: 'open', label: due, cls: 'neutral', ic: 'clock' };
}
function cstats(c) {
  let out = 0, over = 0, late = 0;
  db.invoices.forEach(i => { if (i.cust !== c.id) return; const b = tot(i).bal; if (b < 0.005) return; out += b; const l = i.due ? dayDiff(i.due, TODAY) : 0; if (l > 0) { over += b; late = Math.max(late, l); } });
  return { out: r2(out), over: r2(over), late, hold: over > 0, room: Math.max(0, r2(c.limit - out)) };
}
function sstats(s) {
  let out = 0, over = 0, n = 0;
  db.bills.forEach(b => { if (b.sup !== s.id) return; const x = tot(b).bal; if (x < 0.005) return; out += x; n++; if (dayDiff(b.due, TODAY) > 0) over += x; });
  return { out: r2(out), over: r2(over), n };
}
function arSum() {
  let total = 0, over = 0, n = 0;
  db.invoices.forEach(i => { const b = tot(i).bal; if (b < 0.005) return; total += b; if (i.due && dayDiff(i.due, TODAY) > 0) { over += b; n++; } });
  return { total, over, notDue: total - over, n, hold: db.customers.filter(c => c.id !== 'cash' && cstats(c).hold).length };
}
function apSum() {
  let total = 0, over = 0, week = 0;
  db.bills.forEach(b => { const x = tot(b).bal; if (x < 0.005) return; total += x; const l = dayDiff(b.due, TODAY); if (l > 0) over += x; else if (l >= -7) week += x; });
  const m0 = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  return { total, over, week, paidM: sum(db.bills, b => sum(b.pays.filter(p => p.date >= m0), p => p.amt)) };
}
function stockSum() {
  const ps = db.products;
  return { units: sum(ps, p => p.qty), value: sum(ps, p => p.qty * p.cost), low: ps.filter(p => p.qty > 0 && p.qty <= p.reorder).length, out: ps.filter(p => p.qty === 0).length };
}
function fin(a, b) {
  const inv = db.invoices.filter(i => i.date >= a && i.date < b), ex = db.expenses.filter(e => e.date >= a && e.date < b), cats = {};
  const sales = sum(inv, i => tot(i).sub), cogs = sum(inv, i => tot(i).cost), exp = sum(ex, e => e.amt);
  ex.forEach(e => { cats[e.cat] = (cats[e.cat] || 0) + e.amt; });
  return { n: inv.length, units: sum(inv, i => tot(i).units), sales, cogs, gross: sales - cogs, exp, cats, net: sales - cogs - exp };
}
function months() {
  const out = [];
  for (let i = 0; i < 6; i++) { const a = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1); out.push({ a, b: new Date(TODAY.getFullYear(), TODAY.getMonth() - i + 1, 1), label: a.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), short: a.toLocaleDateString('en-GB', { month: 'short' }) }); }
  return out;
}
function alerts() {
  const a = [];
  if (can('collect')) db.customers.forEach(c => { if (c.id === 'cash') return; const s = cstats(c); if (s.hold) a.push({ cls: 'bad', ic: 'lock', t: c.name + ' is on credit hold', s: money(s.over) + ' overdue, ' + plural(s.late, 'day') + ' late', act: 'open-cust', id: c.id }); });
  if (can('pay')) db.bills.forEach(b => { const x = tot(b).bal; if (x < 0.005) return; const l = dayDiff(b.due, TODAY); if (l > 0) a.push({ cls: 'bad', ic: 'alert', t: 'Pay ' + SUP(b.sup).name, s: money(x) + ' was due ' + plural(l, 'day') + ' ago', act: 'open-bill', id: b.id }); else if (l >= -7) a.push({ cls: 'warn', ic: 'clock', t: 'Pay ' + SUP(b.sup).name, s: money(x) + (l === 0 ? ' due today' : ' due in ' + plural(-l, 'day')), act: 'open-bill', id: b.id }); });
  db.products.forEach(p => { if (p.qty === 0) a.push({ cls: 'bad', ic: 'box', t: pfull(p), s: 'Out of stock', act: 'open-prod', id: p.id }); else if (p.qty <= p.reorder) a.push({ cls: 'warn', ic: 'box', t: pfull(p), s: 'Only ' + p.qty + ' left (reorder at ' + p.reorder + ')', act: 'open-prod', id: p.id }); });
  return a.sort((x, y) => (x.cls === 'bad' ? 0 : 1) - (y.cls === 'bad' ? 0 : 1));
}

/* ---------- building blocks ---------- */
const chip = (cls, label, ic) => `<span class="chip chip-${cls}">${ic ? icon(ic) : ''}${esc(label)}</span>`;
const head = (t, s, actions) => `<div class="page-head"><div><h1>${t}</h1><p class="sub">${s}</p></div>${actions ? `<div class="head-actions">${actions}</div>` : ''}</div>`;
const tile = (label, value, sub, tone, href) => `<${href ? `a href="#/${href}"` : 'div'} class="tile${tone ? ' tile-' + tone : ''}"><span class="tile-l">${label}</span><span class="tile-v">${value}</span><span class="tile-s">${tone === 'bad' || tone === 'warn' ? icon('alert') : ''}${sub || ''}</span></${href ? 'a' : 'div'}>`;
const tabs = (k, items) => `<div class="tabs" role="tablist">${items.map(t => `<button class="tab${ui[k].tab === t[0] ? ' on' : ''}" role="tab" aria-selected="${ui[k].tab === t[0]}" data-act="tab" data-k="${k}" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>`;
const searchBox = (f, v, ph) => `<label class="search-in">${icon('search')}<input type="search" data-f="${f}" value="${esc(v)}" placeholder="${ph}" aria-label="${ph}"></label>`;
const sel = (f, v, opts, full, label) => `<select data-f="${f}"${full ? ' data-full="1"' : ''} aria-label="${label || 'Filter'}">${opts.map(o => `<option value="${esc(o[0])}"${String(o[0]) === String(v) ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select>`;
const seg = (k, v, items) => `<div class="seg" role="group">${items.map(o => `<button class="seg-b${o[0] === v ? ' on' : ''}" aria-pressed="${o[0] === v}" data-act="seg" data-k="${k}" data-v="${o[0]}">${o[1]}</button>`).join('')}</div>`;
const prodCell = p => `<b>${esc(pname(p))}</b><small>${esc(p.size)}</small>`;
const stockChip = p => p.qty === 0 ? chip('bad', 'Out of stock', 'alert') : p.qty <= p.reorder ? chip('warn', 'Low', 'alert') : '';
const signed = n => `<b class="${n > 0 ? 'up' : 'down'}">${n > 0 ? '+' : '−'}${Math.abs(n)}</b>`;
const kindWord = k => k === 'Sale' ? 'Sold' : k === 'Purchase' ? 'Bought' : 'Corrected';

function tbl(key, cols, rows, o) {
  o = o || {};
  if (!rows.length) return `<div class="empty">${o.empty || 'Nothing to show.'}</div>`;
  const per = o.per || 12, pages = Math.ceil(rows.length / per), pg = Math.min(ui.pg[key] || 0, pages - 1);
  ui.pg[key] = pg;
  const body = rows.slice(pg * per, pg * per + per).map(r => `<tr${o.act ? ` data-act="${o.act}" data-id="${esc(o.id(r))}" tabindex="0"` : ''}>${cols.map(c => `<td class="${c.cls || ''}">${c.cell(r)}</td>`).join('')}</tr>`).join('');
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${cols.map(c => `<th scope="col" class="${c.cls || ''}">${c.h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>` +
    (pages > 1 ? `<div class="pager"><span>${pg * per + 1} to ${Math.min(rows.length, (pg + 1) * per)} of ${num(rows.length)}</span><button class="icon-btn" data-act="pg" data-k="${key}" data-d="-1"${pg === 0 ? ' disabled' : ''} aria-label="Previous page">${icon('chev-left')}</button><button class="icon-btn" data-act="pg" data-k="${key}" data-d="1"${pg >= pages - 1 ? ' disabled' : ''} aria-label="Next page">${icon('chev-right')}</button></div>` : '');
}
const alertList = (a, max) => a.length ? `<ul class="alerts">${a.slice(0, max).map(x => `<li><button class="alert-row" data-act="${x.act}" data-id="${x.id}"><span class="dot dot-${x.cls}">${icon(x.ic)}</span><span class="alert-t"><b>${esc(x.t)}</b><small>${esc(x.s)}</small></span>${icon('chev-right')}</button></li>`).join('')}</ul>${a.length > max ? `<p class="more">and ${a.length - max} more</p>` : ''}` : '<div class="empty">All clear. Nothing needs attention.</div>';
const feed = n => `<ul class="feed">${db.log.slice().sort((a, b) => b.ts - a.ts).slice(0, n).map(l => { const s = ST(l.by); return `<li><span class="avatar sm" aria-hidden="true">${s.init}</span><span class="feed-t"><b>${esc(s.name)}</b> ${esc(l.text)}${l.amt != null ? ' · ' + money(l.amt) : ''}<small>${ago(l.ts)}</small></span></li>`; }).join('')}</ul>`;

/* ---------- charts (one colour: each chart shows one series) ---------- */
const SERIES = {
  sales14: () => ({ unit: 'Day', fmt: money, rows: Array.from({ length: 14 }, (_, i) => { const d = dAgo(13 - i); return { label: fmtDs(d), long: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }), value: fin(d, addDays(d, 1)).sales }; }) }),
  profit6: () => ({ unit: 'Month', fmt: money, rows: months().reverse().map((m, i) => ({ label: m.short, long: m.label + (i === 5 ? ' (so far)' : ''), value: fin(m.a, m.b).net })) })
};
function chartCard(id, title, sub) {
  const asTable = !!ui.ct[id], s = SERIES[id]();
  return `<section class="card"><header class="card-head"><div><h2>${title}</h2><p class="sub">${sub}</p></div><button class="btn btn-sm btn-ghost" data-act="chart-table" data-id="${id}" aria-pressed="${asTable}">${icon(asTable ? 'chart' : 'table')}${asTable ? 'Chart' : 'Table'}</button></header>` +
    (asTable ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">${s.unit}</th><th scope="col" class="num">Amount</th></tr></thead><tbody>${s.rows.map(r => `<tr><td>${esc(r.long)}</td><td class="num">${s.fmt(r.value)}</td></tr>`).join('')}</tbody></table></div>` : `<div class="chart" data-chart="${id}" data-label="${title}"></div>`) + '</section>';
}
function drawChart(el) {
  const s = SERIES[el.dataset.chart](), data = s.rows, vals = data.map(d => d.value);
  const top = Math.max(1, ...vals), raw = top / 4, mag = Math.pow(10, Math.floor(Math.log10(raw))), nrm = raw / mag, step = (nrm <= 1 ? 1 : nrm <= 2 ? 2 : nrm <= 2.5 ? 2.5 : nrm <= 5 ? 5 : 10) * mag;
  const hi = Math.ceil(top / step) * step, low = Math.min(0, ...vals), lo = low < 0 ? -Math.ceil(-low / step) * step : 0;
  const ticks = []; for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Math.abs(v) < step / 1e6 ? 0 : v);
  const W = Math.max(260, el.clientWidth - 28), H = 236, m = { l: 12 + Math.max(...ticks.map(v => moneyC(v).length)) * 6.6, r: 6, t: 12, b: 26 }, pw = W - m.l - m.r, ph = H - m.t - m.b;
  const y = v => m.t + ph * (1 - (v - lo) / (hi - lo)), band = pw / data.length, bw = Math.min(24, Math.max(4, band * 0.6)), every = Math.max(1, Math.ceil(data.length * 46 / pw));
  let g = '', bars = '', xl = '', hit = '';
  ticks.forEach(v => { g += `<line class="grid${v === 0 ? ' base' : ''}" x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${esc(moneyC(v))}</text>`; });
  data.forEach((d, i) => {
    const cx = m.l + band * (i + 0.5), x = cx - bw / 2, y0 = y(0), y1 = y(d.value), h = Math.abs(y0 - y1), r = Math.min(4, h, bw / 2), e = d.value >= 0 ? r : -r;
    if (h > 0.5) bars += `<path class="bar${d.value < 0 ? ' neg' : ''}" data-i="${i}" d="M${x},${y0}V${y1 + e}Q${x},${y1} ${x + r},${y1}H${x + bw - r}Q${x + bw},${y1} ${x + bw},${y1 + e}V${y0}Z"/>`;
    if (i % every === (data.length - 1) % every) xl += `<text class="tick" x="${cx}" y="${H - 8}" text-anchor="middle">${esc(d.label)}</text>`;
    hit += `<rect class="hit" data-i="${i}" x="${m.l + band * i}" y="${m.t}" width="${band}" height="${ph}" tabindex="0" role="img" aria-label="${esc(d.long)}: ${esc(s.fmt(d.value))}"/>`;
  });
  el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(el.dataset.label)}">${g}${bars}${xl}${hit}</svg><div class="tip" hidden><b></b><span></span></div>`;
  const svg = el.firstChild, tip = el.lastChild;
  const hide = () => { tip.hidden = true; $$('.bar.hov', el).forEach(b => b.classList.remove('hov')); };
  const show = i => {
    const d = data[i]; tip.firstChild.textContent = s.fmt(d.value); tip.lastChild.textContent = d.long; tip.hidden = false;
    tip.style.left = Math.min(W + 14 - tip.offsetWidth, Math.max(14, 14 + m.l + band * (i + 0.5) - tip.offsetWidth / 2)) + 'px';
    tip.style.top = Math.max(0, 6 + y(Math.max(0, d.value)) - tip.offsetHeight - 8) + 'px';
    $$('.bar', el).forEach(b => b.classList.toggle('hov', +b.dataset.i === i));
  };
  svg.addEventListener('pointermove', e => { const h = e.target.closest('.hit'); if (h) show(+h.dataset.i); else hide(); });
  svg.addEventListener('pointerleave', hide);
  svg.addEventListener('focusin', e => { if (e.target.dataset.i != null) show(+e.target.dataset.i); });
  svg.addEventListener('focusout', hide);
}
function brandBars() {
  const by = {};
  db.products.forEach(p => { by[p.brand] = (by[p.brand] || 0) + p.qty; });
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1]), max = Math.max(1, ...rows.map(r => r[1]));
  return `<div class="bars" role="list">${rows.map(r => `<div class="bar-row" role="listitem"><span class="bar-name">${esc(r[0])}</span><span class="bar-track"><span class="bar-fill" style="width:calc((100% - 48px) * ${(r[1] / max).toFixed(4)})"></span><span class="bar-val">${num(r[1])}</span></span></div>`).join('')}</div>`;
}

/* ---------- pages ---------- */
function vHome() {
  const t = fin(TODAY, addDays(TODAY, 1)), ar = arSum(), ap = apSum(), st = stockSum(), al = alerts();
  const step = (n, t1, text, act, label) => `<div class="step"><span class="step-n"><i>${n}</i>${t1}</span><p>${text}</p><button class="btn btn-sm" data-act="${act}">${label}</button></div>`;
  const guide = ui.guide ? `<section class="card guide"><header class="card-head"><div><h2>See how it works</h2><p class="sub">Three things happen in a tyre business every day. Try each one and watch the numbers on this page change by themselves.</p></div><button class="icon-btn" data-act="guide-x" aria-label="Hide this guide">${icon('x')}</button></header><div class="steps">` +
    step(1, 'You buy tyres', 'Enter the supplier bill. Stock goes up and the amount shows in Money to pay.', 'new-bill', 'Enter a supplier bill') +
    step(2, 'You sell tyres', 'Make the customer invoice. Stock goes down and the amount shows in Money to collect.', 'new-inv', 'Make an invoice') +
    step(3, 'Money comes in', 'Record the payment. The customer\'s balance goes down straight away.', 'guide-pay', 'Receive a payment') + '</div></section>' : '';
  return head('Dashboard', TODAY.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + ' · ' + esc(S.name), `<button class="btn" data-act="new-bill">${icon('truck')}Enter supplier bill</button><button class="btn btn-primary" data-act="new-inv">${icon('plus')}New invoice</button>`) +
    `<div class="tiles">${tile('Sales today', money0(t.sales), plural(t.n, 'invoice') + ' · profit ' + money0(t.net), '', 'finance')}${tile('Money to collect', money0(ar.total), ar.over > 0 ? money0(ar.over) + ' overdue' : 'Nothing overdue', ar.over > 0 ? 'bad' : '', 'collect')}${tile('Money to pay', money0(ap.total), ap.over > 0 ? money0(ap.over) + ' overdue' : money0(ap.week) + ' due in 7 days', ap.over > 0 ? 'bad' : '', 'pay')}${tile('Tyres in stock', num(st.units), money0(st.value) + ' at cost · ' + (st.low + st.out) + ' to reorder', '', 'inventory')}</div>` + guide +
    `<div class="grid-2-1">${chartCard('sales14', 'Sales', 'Last 14 days')}<section class="card"><header class="card-head"><div><h2>Needs attention</h2><p class="sub">${al.length ? plural(al.length, 'thing') + ' to look at' : 'Nothing right now'}</p></div></header>${alertList(al, 6)}</section></div>` +
    `<div class="grid-2"><section class="card"><header class="card-head"><div><h2>Stock by brand</h2><p class="sub">Tyres in the warehouse now</p></div></header>${brandBars()}</section><section class="card"><header class="card-head"><div><h2>Latest activity</h2><p class="sub">Who did what, and when</p></div></header>${feed(6)}</section></div>`;
}

function vInventory() {
  const s = stockSum(), owner = role === 'owner', u = ui.inv, brands = Array.from(new Set(db.products.map(p => p.brand))).sort();
  const filters = u.tab === 'tyres'
    ? searchBox('inv.q', u.q, 'Search brand, pattern or size') + sel('inv.brand', u.brand, [['', 'All brands']].concat(brands.map(b => [b, b])), false, 'Brand') + sel('inv.type', u.type, [['', 'All types'], ['Car', 'Car'], ['SUV', 'SUV'], ['Van', 'Van'], ['Truck', 'Truck']], false, 'Type') + `<label class="check"><input type="checkbox" data-f="inv.low"${u.low ? ' checked' : ''}> To reorder only</label>`
    : searchBox('inv.mq', u.mq, 'Search tyre or reference') + sel('inv.kind', u.kind, [['', 'In and out'], ['Purchase', 'Stock in (bought)'], ['Sale', 'Stock out (sold)'], ['Adjustment', 'Corrections']], false, 'Movement');
  return head('Inventory', 'Every tyre by brand, size and pattern. Stock changes by itself when you buy and sell.', `<button class="btn" data-act="export" data-id="stock">${icon('download')}Export</button>${owner ? `<button class="btn btn-primary" data-act="new-prod">${icon('plus')}Add tyre</button>` : ''}`) +
    `<div class="tiles">${tile('Tyres in stock', num(s.units), db.products.length + ' different tyres')}${owner ? tile('Stock value', money0(s.value), 'At cost price') : ''}${tile('Low stock', s.low, 'At or below the reorder level', s.low ? 'warn' : '')}${tile('Out of stock', s.out, 'Cannot be sold until restocked', s.out ? 'bad' : '')}</div>` +
    tabs('inv', [['tyres', 'Tyres'], ['moves', 'Stock in / out']]) + `<section class="card"><div class="filters">${filters}</div><div id="region">${rInventory()}</div></section>`;
}
function rInventory() {
  const u = ui.inv, owner = role === 'owner';
  if (u.tab === 'moves') {
    const q = u.mq.trim().toLowerCase();
    const rows = db.moves.filter(m => (!u.kind || m.kind === u.kind) && (!q || (pfull(P(m.pid)) + ' ' + m.ref).toLowerCase().includes(q))).sort((a, b) => b.ts - a.ts);
    return tbl('moves', [
      { h: 'Date', cell: m => fmtD(m.ts) + `<small>${fmtT(m.ts)}</small>` },
      { h: 'Tyre', cell: m => prodCell(P(m.pid)) },
      { h: 'What happened', cls: 'hide-sm only-chip', cell: m => chip(m.kind === 'Sale' ? 'neutral' : m.kind === 'Purchase' ? 'ok' : 'warn', kindWord(m.kind)) },
      { h: 'Qty', cls: 'num', cell: m => signed(m.qty) },
      { h: 'Reference', cls: 'hide-sm', cell: m => esc(m.ref) },
      { h: 'By', cls: 'hide-md', cell: m => esc(ST(m.by).name) }
    ], rows, { act: 'open-prod', id: m => m.pid, empty: 'No stock movement matches.' });
  }
  const q = u.q.trim().toLowerCase();
  const rows = db.products.filter(p => (!u.brand || p.brand === u.brand) && (!u.type || p.type === u.type) && (!u.low || p.qty <= p.reorder) && (!q || (pfull(p) + ' ' + p.sku).toLowerCase().includes(q)));
  const cols = [
    { h: 'Tyre', cell: p => `<b>${esc(pname(p))}</b><small>${esc(p.sku)}</small>` },
    { h: 'Size', cell: p => esc(p.size) },
    { h: 'Type', cls: 'hide-sm', cell: p => p.type },
    { h: 'Rack', cls: 'hide-md', cell: p => p.rack },
    { h: 'In stock', cls: 'num', cell: p => `<b>${p.qty}</b>${stockChip(p)}` },
    { h: 'Reorder at', cls: 'num hide-md', cell: p => p.reorder }
  ];
  if (owner) cols.push({ h: 'Cost', cls: 'num hide-sm', cell: p => money(p.cost) });
  cols.push({ h: 'Price', cls: 'num', cell: p => money(p.price) });
  if (owner) cols.push({ h: 'Stock value', cls: 'num hide-md', cell: p => money0(p.qty * p.cost) });
  return tbl('tyres', cols, rows, { act: 'open-prod', id: p => p.id, empty: 'No tyre matches.' });
}

function vCollect() {
  const a = arSum(), u = ui.col;
  return head('Money to collect', 'Customer invoices, payments received and who still owes you.', `<button class="btn" data-act="export" data-id="inv">${icon('download')}Export</button>${u.tab === 'cust' ? `<button class="btn" data-act="new-cust">${icon('plus')}Add customer</button>` : ''}<button class="btn btn-primary" data-act="new-inv">${icon('plus')}New invoice</button>`) +
    `<div class="tiles">${tile('To collect', money0(a.total), 'From all customers')}${tile('Not due yet', money0(a.notDue), 'Still inside the agreed days')}${tile('Overdue', money0(a.over), a.n ? plural(a.n, 'invoice') + ' late' : 'Nothing late', a.over > 0 ? 'bad' : 'ok')}${tile('On credit hold', a.hold, a.hold ? 'No new credit until they pay' : 'No customer is blocked', a.hold ? 'warn' : '')}</div>` +
    tabs('col', [['inv', 'Invoices'], ['cust', 'Customers']]) +
    `<section class="card"><div class="filters">${u.tab === 'inv' ? seg('col.f', u.f, [['unpaid', 'Unpaid'], ['overdue', 'Overdue'], ['paid', 'Paid'], ['all', 'All']]) : ''}${searchBox('col.q', u.q, u.tab === 'inv' ? 'Search invoice or customer' : 'Search customer')}</div><div id="region">${rCollect()}</div></section>`;
}
function rCollect() {
  const u = ui.col, q = u.q.trim().toLowerCase();
  if (u.tab === 'cust') {
    const rows = db.customers.filter(c => c.id !== 'cash' && (!q || c.name.toLowerCase().includes(q))).map(c => ({ c, s: cstats(c) })).sort((a, b) => b.s.over - a.s.over || b.s.out - a.s.out);
    return tbl('cust', [
      { h: 'Customer', cell: r => `<b>${esc(r.c.name)}</b><small>${esc(r.c.phone)}</small>` },
      { h: 'Pays in', cls: 'hide-md', cell: r => r.c.terms + ' days' },
      { h: 'Credit limit', cls: 'num hide-sm', cell: r => money0(r.c.limit) },
      { h: 'To collect', cls: 'num', cell: r => money(r.s.out) },
      { h: 'Overdue', cls: 'num hide-sm', cell: r => r.s.over ? `<b class="down">${money(r.s.over)}</b>` : '—' },
      { h: 'Status', cls: 'only-chip', cell: r => r.s.hold ? chip('bad', 'Credit hold', 'lock') : r.s.out > r.c.limit ? chip('warn', 'Over limit', 'alert') : r.s.out >= r.c.limit * 0.75 ? chip('warn', 'Near limit', 'alert') : chip('ok', 'Good', 'check') }
    ], rows, { act: 'open-cust', id: r => r.c.id, empty: 'No customer matches.' });
  }
  const rows = db.invoices.filter(i => { const k = stat(i).k; return (u.f === 'all' || (u.f === 'unpaid' ? k !== 'paid' : u.f === 'overdue' ? k === 'overdue' : k === 'paid')) && (!q || (i.id + ' ' + C(i.cust).name).toLowerCase().includes(q)); });
  rows.sort(u.f === 'unpaid' || u.f === 'overdue' ? (a, b) => (a.due || a.date) - (b.due || b.date) : (a, b) => b.ts - a.ts);
  return tbl('invs', [
    { h: 'Invoice', cls: 'nw', cell: i => `<b>${i.id}</b><small>${fmtD(i.date)}</small>` },
    { h: 'Customer', cell: i => esc(C(i.cust).name) },
    { h: 'Total', cls: 'num hide-sm', cell: i => money(tot(i).total) },
    { h: 'To collect', cls: 'num', cell: i => money(tot(i).bal) },
    { h: 'Status', cls: 'hide-sm only-chip', cell: i => { const s = stat(i); return chip(s.cls, s.label, s.ic); } },
    { h: '', cls: 'num', cell: i => tot(i).bal > 0.005 ? `<button class="btn btn-sm" data-act="pay-inv" data-id="${i.id}">Receive<span class="hide-md">&nbsp;payment</span></button>` : '' }
  ], rows, { act: 'open-inv', id: i => i.id, empty: u.f === 'overdue' ? 'No invoice is overdue.' : 'No invoice matches.' });
}

function vPay() {
  const a = apSum(), u = ui.pay;
  return head('Money to pay', 'Supplier bills, payments made and what is due next.', `<button class="btn" data-act="export" data-id="bills">${icon('download')}Export</button><button class="btn btn-primary" data-act="new-bill">${icon('plus')}Enter supplier bill</button>`) +
    `<div class="tiles">${tile('To pay', money0(a.total), 'To all suppliers')}${tile('Due in 7 days', money0(a.week), 'Keep this much ready')}${tile('Overdue', money0(a.over), a.over > 0 ? 'Pay these first' : 'Nothing late', a.over > 0 ? 'bad' : 'ok')}${tile('Paid this month', money0(a.paidM), 'To suppliers')}</div>` +
    tabs('pay', [['bills', 'Supplier bills'], ['sup', 'Suppliers']]) +
    `<section class="card"><div class="filters">${u.tab === 'bills' ? seg('pay.f', u.f, [['unpaid', 'Unpaid'], ['overdue', 'Overdue'], ['paid', 'Paid'], ['all', 'All']]) : ''}${searchBox('pay.q', u.q, u.tab === 'bills' ? 'Search bill or supplier' : 'Search supplier')}</div><div id="region">${rPay()}</div></section>`;
}
function rPay() {
  const u = ui.pay, q = u.q.trim().toLowerCase();
  if (u.tab === 'sup') {
    const rows = db.suppliers.filter(s => !q || s.name.toLowerCase().includes(q)).map(s => ({ s, x: sstats(s) }));
    return tbl('sups', [
      { h: 'Supplier', cell: r => `<b>${esc(r.s.name)}</b><small>${esc(r.s.brands.join(', '))}</small>` },
      { h: 'You pay in', cls: 'hide-sm', cell: r => r.s.terms + ' days' },
      { h: 'Unpaid bills', cls: 'num hide-sm', cell: r => r.x.n },
      { h: 'To pay', cls: 'num', cell: r => money(r.x.out) },
      { h: 'Overdue', cls: 'num', cell: r => r.x.over ? `<b class="down">${money(r.x.over)}</b>` : '—' }
    ], rows, { act: 'open-sup', id: r => r.s.id, empty: 'No supplier matches.' });
  }
  const rows = db.bills.filter(b => { const k = stat(b).k; return (u.f === 'all' || (u.f === 'unpaid' ? k !== 'paid' : u.f === 'overdue' ? k === 'overdue' : k === 'paid')) && (!q || (b.ref + ' ' + SUP(b.sup).name).toLowerCase().includes(q)); });
  rows.sort(u.f === 'unpaid' || u.f === 'overdue' ? (a, b) => a.due - b.due : (a, b) => b.ts - a.ts);
  return tbl('bills', [
    { h: 'Bill', cls: 'nw', cell: b => `<b>${esc(b.ref)}</b><small>${fmtD(b.date)}</small>` },
    { h: 'Supplier', cell: b => esc(SUP(b.sup).name) },
    { h: 'Total', cls: 'num hide-sm', cell: b => money(tot(b).total) },
    { h: 'To pay', cls: 'num', cell: b => money(tot(b).bal) },
    { h: 'Status', cls: 'hide-sm only-chip', cell: b => { const s = stat(b); return chip(s.cls, s.label, s.ic); } },
    { h: '', cls: 'num', cell: b => tot(b).bal > 0.005 ? `<button class="btn btn-sm" data-act="pay-bill" data-id="${b.id}">Pay</button>` : '' }
  ], rows, { act: 'open-bill', id: b => b.id, empty: u.f === 'overdue' ? 'No bill is overdue.' : 'No bill matches.' });
}

function vFinance() {
  const u = ui.fin, ms = months(), m = ms[u.m] || ms[0], f = fin(m.a, m.b);
  let body;
  if (u.tab === 'pl') {
    const cats = Object.entries(f.cats).sort((a, b) => b[1] - a[1]), row = (l, v, cls) => `<div${cls ? ` class="${cls}"` : ''}><span>${l}</span><span>${v}</span></div>`;
    body = `<div class="tiles">${tile('Sales', money0(f.sales), plural(f.n, 'invoice') + ' · ' + num(f.units) + ' tyres')}${tile('Cost of tyres sold', money0(f.cogs), 'What those tyres cost you')}${tile('Expenses', money0(f.exp), 'Rent, salaries, transport and more')}${tile('Net profit', money0(f.net), f.sales ? Math.round(f.net / f.sales * 100) + '% of sales' : 'No sales yet', f.net >= 0 ? 'ok' : 'bad')}</div>` +
      `<div class="grid-2">${chartCard('profit6', 'Net profit by month', 'Last 6 months. The current month is so far.')}<section class="card"><header class="card-head"><div><h2>Profit and loss</h2><p class="sub">${m.label}</p></div></header><div class="totals" style="width:auto;margin:6px 18px 18px">` +
      row('Sales', money(f.sales)) + row('Cost of tyres sold', '−' + money(f.cogs)) + row('Gross profit', money(f.gross), 'strong') + cats.map(c => row(esc(c[0]), '−' + money(c[1]))).join('') + row('Net profit', money(f.net), 'strong') + '</div></section></div>';
  } else body = `<section class="card"><div id="region">${rFinance()}</div></section>`;
  return head('Finance', 'Daily sales, expenses and a simple profit and loss.', `<button class="btn" data-act="export" data-id="fin">${icon('download')}Export</button>${u.tab === 'exp' ? `<button class="btn btn-primary" data-act="new-exp">${icon('plus')}Add expense</button>` : ''}`) +
    tabs('fin', [['pl', 'Profit & loss'], ['daily', 'Daily sales'], ['exp', 'Expenses']]) +
    `<div class="filters bare"><span>Month</span>${sel('fin.m', u.m, ms.map((x, i) => [i, x.label + (i === 0 ? ' (so far)' : '')]), true, 'Month')}</div>` + body;
}
function dailyRows(m) {
  const rows = [];
  for (let d = m.b > TODAY ? TODAY : addDays(m.b, -1); d >= m.a; d = addDays(d, -1)) rows.push(Object.assign({ d }, fin(d, addDays(d, 1))));
  return rows;
}
function rFinance() {
  const u = ui.fin, ms = months(), m = ms[u.m] || ms[0];
  if (u.tab === 'daily') return tbl('daily', [
    { h: 'Date', cell: r => r.d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) },
    { h: 'Invoices', cls: 'num hide-sm', cell: r => r.n },
    { h: 'Tyres sold', cls: 'num hide-sm', cell: r => r.units },
    { h: 'Sales', cls: 'num', cell: r => money(r.sales) },
    { h: 'Cost of tyres', cls: 'num hide-md', cell: r => money(r.cogs) },
    { h: 'Expenses', cls: 'num hide-sm', cell: r => r.exp ? money(r.exp) : '—' },
    { h: 'Net profit', cls: 'num', cell: r => `<b${r.net < 0 ? ' class="down"' : ''}>${money(r.net)}</b>` }
  ], dailyRows(m), { per: 16 });
  return tbl('exp', [
    { h: 'Date', cell: e => fmtD(e.date) },
    { h: 'Category', cell: e => esc(e.cat) },
    { h: 'Note', cls: 'hide-sm', cell: e => esc(e.note) },
    { h: 'Amount', cls: 'num', cell: e => money(e.amt) },
    { h: 'By', cls: 'hide-md', cell: e => esc(ST(e.by).name) }
  ], db.expenses.filter(e => e.date >= m.a && e.date < m.b).sort((a, b) => b.ts - a.ts), { empty: 'No expenses in this month yet.' });
}

function vTeam() {
  const yes = `<span class="yes">${icon('check')}<span class="sr">Yes</span></span>`, no = '<span class="no">—<span class="sr">No</span></span>';
  const M = [['Dashboard, profit and finance', 1, 0, 0], ['See stock, sizes and selling prices', 1, 1, 1], ['See cost prices and stock value', 1, 0, 0], ['Correct stock after a count', 1, 0, 1], ['Add tyres and change prices', 1, 0, 0], ['Make invoices and receive payments', 1, 1, 0], ['Approve a sale to a customer on credit hold', 1, 0, 0], ['Supplier bills and payments', 1, 0, 0], ['Team and access', 1, 0, 0]];
  return head('Team & access', 'Three people, three logins. Each person sees only what their job needs.') +
    `<div class="people">${STAFF.map(s => `<section class="card person"><span class="avatar lg" aria-hidden="true">${s.init}</span><div><h2>${esc(s.name)}</h2><p class="sub">${s.role}</p><p>${s.sees}</p></div><button class="btn btn-sm${s.id === role ? '' : ' btn-primary'}" data-act="as" data-id="${s.id}"${s.id === role ? ' disabled' : ''}>${s.id === role ? 'You are here' : 'See as ' + s.name.split(' ')[0]}</button></section>`).join('')}</div>` +
    `<div class="grid-2"><section class="card"><header class="card-head"><div><h2>Who can do what</h2><p class="sub">Set by the owner. It can be changed for each person.</p></div></header><div class="tbl-wrap"><table class="tbl matrix"><thead><tr><th scope="col">Action</th>${STAFF.map(s => `<th scope="col" class="ctr">${s.role}</th>`).join('')}</tr></thead><tbody>${M.map(r => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map(v => `<td class="ctr">${v ? yes : no}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>` +
    `<section class="card"><header class="card-head"><div><h2>Activity log</h2><p class="sub">Every change is recorded with the person and the time.</p></div></header>${feed(12)}</section></div>`;
}
const VIEWS = { home: vHome, inventory: vInventory, collect: vCollect, pay: vPay, finance: vFinance, team: vTeam };
const REGIONS = { inventory: rInventory, collect: rCollect, pay: rPay, finance: rFinance };

/* ---------- frame: top bar, side menu, phone tab bar ---------- */
function renderTop() {
  const me = ST(role);
  $('#topbar').innerHTML = `<button class="icon-btn" data-act="nav-toggle" aria-label="Menu">${icon('menu')}</button>
    <a class="brand" href="#/${ACCESS[role][0]}"><span class="brand-mark">${icon('tyre')}</span><span class="brand-name" id="co-name">${esc(S.name)}</span></a>
    <span class="chip chip-demo hide-sm" title="Sample data. Nothing is saved.">Demo</span>
    <label class="search" id="search">${icon('search')}<input id="q" type="search" placeholder="Search tyres, customers, invoices" autocomplete="off" aria-label="Search tyres, customers, invoices"></label>
    <div class="top-actions">
      <button class="icon-btn only-sm" data-act="search-toggle" aria-label="Search">${icon('search')}</button>
      ${role === 'store' ? '' : `<button class="btn btn-primary" data-act="new-menu" aria-haspopup="menu" aria-label="New">${icon('plus')}<span class="hide-sm">New</span></button>`}
      <button class="icon-btn" data-act="customise" aria-label="Change colours" title="Change colours">${icon('palette')}</button>
      <button class="icon-btn hide-sm" data-act="bell" aria-label="Needs attention" title="Needs attention">${icon('bell')}<span class="badge" id="bell-n" hidden></span></button>
      <button class="avatar" data-act="user-menu" aria-label="${esc(me.name)}, ${me.role}" title="${esc(me.name)} · ${me.role}">${me.init}</button>
    </div>`;
}
function renderNav() {
  const pages = PAGES.filter(p => can(p.id)), ar = can('collect') ? arSum().n : 0, st = stockSum(), badge = { collect: ar ? `<b class="nav-n">${ar}</b>` : '', inventory: st.low + st.out ? `<b class="nav-n warn">${st.low + st.out}</b>` : '' };
  $('#nav').innerHTML = `<div class="nav-list">${pages.map(p => `<a class="nav-item${p.id === route ? ' on' : ''}" href="#/${p.id}"${p.id === route ? ' aria-current="page"' : ''} title="${p.label}">${icon(p.icon)}<span>${p.label}</span>${badge[p.id] || ''}</a>`).join('')}</div>
    <div class="nav-foot"><button class="nav-item" data-act="customise" title="Change colours">${icon('palette')}<span>Change colours</span></button><p class="nav-note">Sample data. Nothing is saved: reload the page to start again.</p><a class="by" href="https://techauditpros.com/" target="_blank" rel="noopener"><img src="/assets/logoonly.svg" alt="" width="22" height="22"><span>Built by TechAuditPros</span></a></div>`;
  const tabsP = pages.filter(p => p.id !== 'team');
  $('#tabbar').innerHTML = tabsP.length > 1 ? tabsP.map(p => `<a href="#/${p.id}"${p.id === route ? ' class="on" aria-current="page"' : ''}><span>${icon(p.icon)}</span>${p.short}</a>`).join('') : '';
  document.body.classList.toggle('has-tabbar', tabsP.length > 1);
  const n = alerts().filter(a => a.cls === 'bad').length, b = $('#bell-n');
  if (b) { b.textContent = n; b.hidden = !n; }
}
function render(top) {
  const allowed = ACCESS[role];
  let r = location.hash.replace(/^#\/?/, '').split('/')[0];
  if (!allowed.includes(r)) { r = allowed[0]; try { history.replaceState(null, '', location.pathname + location.search + '#/' + r); } catch (e) { /* stays on the same view */ } }
  const moved = r !== route;
  route = r;
  renderNav();
  $('#view').innerHTML = VIEWS[r]();
  $$('[data-chart]').forEach(drawChart);
  document.title = PAGES.find(p => p.id === r).label + ' · ' + S.name + ' (demo)';
  if (moved || top) window.scrollTo(0, 0);
}
function region() { const el = $('#region'); if (el && REGIONS[route]) el.innerHTML = REGIONS[route](); }

/* ---------- menus, side panel, messages ---------- */
function closeMenu() { if (menuEl) { menuEl.remove(); menuEl = null; } menuFor = ''; }
function openMenu(anchor, html, name, left) {
  closeMenu();
  const m = document.createElement('div');
  m.className = 'menu'; m.setAttribute('role', 'menu'); m.innerHTML = html;
  $('#menu-root').appendChild(m);
  const r = anchor.getBoundingClientRect();
  if (left) m.style.width = Math.max(280, r.width) + 'px';
  const w = m.offsetWidth;
  m.style.left = Math.max(8, Math.min(left ? r.left : r.right - w, innerWidth - w - 8)) + 'px';
  m.style.top = (r.bottom + 6) + 'px';
  menuEl = m; menuFor = name;
}
const mi = (act, ic, label, sub, id) => `<button class="menu-item" role="menuitem" data-act="${act}"${id ? ` data-id="${esc(id)}"` : ''}>${icon(ic)}<span><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`;
function closeSheet() { $('#sheet-root').innerHTML = ''; document.body.classList.remove('sheet-open'); F = null; G = null; }
function openSheet(title, body, foot, o) {
  o = o || {};
  closeSheet(); closeMenu();
  $('#sheet-root').innerHTML = `<div class="sheet-scrim" data-act="close-sheet"></div><aside class="sheet${o.wide ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header class="sheet-head"><h2>${esc(title)}</h2><button class="icon-btn" data-act="close-sheet" aria-label="Close">${icon('x')}</button></header><div class="sheet-body" id="sheet-body">${body}</div>${foot ? `<footer class="sheet-foot">${foot}</footer>` : ''}</aside>`;
  document.body.classList.add('sheet-open');
  const first = o.form && $('#sheet-body input, #sheet-body select');
  (first || $('.sheet-head .icon-btn')).focus();
}
function toast(msg, act, id, label) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${esc(msg)}</span>${act ? `<button class="toast-act" data-act="${act}" data-id="${esc(id)}">${esc(label || 'View')}</button>` : ''}`;
  const box = $('#toasts'); while (box.children.length > 2) box.firstChild.remove();
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 5200);
}
function csv(name, headRow, rows) {
  const q = v => { let s = String(v == null ? '' : v); if (typeof v !== 'number' && /^[=+\-@]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
  const text = [headRow].concat(rows).map(r => r.map(q).join(',')).join('\r\n'), a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv' })); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('Downloaded ' + name + '. It opens in Excel.');
}

/* ---------- detail panels ---------- */
function docSheet(kind, id) {
  const inv = kind === 'inv', d = (inv ? db.invoices : db.bills).find(x => x.id === id);
  if (!d) return;
  const t = tot(d), s = stat(d), who = inv ? C(d.cust) : SUP(d.sup);
  const body = `<div class="doc"><div class="doc-top"><div><div class="doc-co">${esc(inv ? S.name : who.name)}</div><div class="muted">${inv ? 'Tyre sales' : 'Supplier'}</div></div><div class="doc-no"><span>${inv ? 'Invoice' : 'Supplier bill'}</span><b>${esc(inv ? d.id : d.ref)}</b></div></div>
    <dl class="kv"><div><dt>${inv ? 'Bill to' : 'Bill for'}</dt><dd>${esc(inv ? who.name : S.name)}</dd></div><div><dt>Date</dt><dd>${fmtD(d.date)}</dd></div><div><dt>Due</dt><dd>${d.due ? fmtD(d.due) : 'Paid at sale'}</dd></div><div><dt>Status</dt><dd>${chip(s.cls, s.label, s.ic)}</dd></div></dl>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Tyre</th><th scope="col" class="num">Qty</th><th scope="col" class="num">${inv ? 'Price' : 'Cost'}</th><th scope="col" class="num">Amount</th></tr></thead><tbody>${d.lines.map(l => `<tr><td>${prodCell(P(l.pid))}</td><td class="num">${l.qty}</td><td class="num">${money(l.price)}</td><td class="num">${money(l.qty * l.price)}</td></tr>`).join('')}</tbody></table></div>
    <div class="totals">${t.tax ? `<div><span>Subtotal</span><span>${money(t.sub)}</span></div><div><span>Tax (${d.taxRate}%)</span><span>${money(t.tax)}</span></div>` : ''}<div class="strong"><span>Total</span><span>${money(t.total)}</span></div><div><span>Paid</span><span>${money(d.paid)}</span></div><div class="strong"><span>${inv ? 'To collect' : 'To pay'}</span><span>${money(t.bal)}</span></div></div>
    <h3>Payments</h3>${d.pays.length ? `<ul class="plain">${d.pays.map(p => `<li><span>${fmtD(p.date)} · ${esc(p.method)}</span><b>${money(p.amt)}</b></li>`).join('')}</ul>` : '<p class="muted">No payment yet.</p>'}
    <p class="muted small">${inv ? 'Made' : 'Received'} by ${esc(ST(d.by).name)} on ${fmtD(d.ts)} at ${fmtT(d.ts)}.</p></div>`;
  const canPay = t.bal > 0.005 && (inv ? can('collect') : can('pay'));
  openSheet(inv ? 'Invoice ' + d.id : 'Bill ' + d.ref, body, (inv ? `<button class="btn" data-act="print">${icon('print')}Print or save as PDF</button>` : '') + (canPay ? `<button class="btn btn-primary" data-act="${inv ? 'pay-inv' : 'pay-bill'}" data-id="${d.id}">${inv ? 'Receive payment' : 'Pay this bill'}</button>` : ''));
}
function prodSheet(id) {
  const p = P(id), owner = role === 'owner';
  if (!p) return;
  const mv = db.moves.filter(m => m.pid === id).sort((a, b) => b.ts - a.ts).slice(0, 8), kv = (k, v) => `<div><dt>${k}</dt><dd>${v}</dd></div>`;
  const body = `<div class="doc"><div class="doc-top"><div><div class="doc-co">${esc(pname(p))}</div><div class="muted">${esc(p.size)} · ${p.type} tyre</div></div><div class="doc-no"><span>In stock</span><b>${p.qty}</b>${stockChip(p)}</div></div>
    <dl class="kv">${kv('Code', esc(p.sku))}${kv('Rack', p.rack)}${kv('Reorder at', p.reorder)}${kv('Selling price', money(p.price))}${owner ? kv('Cost price', money(p.cost)) + kv('Profit per tyre', money(p.price - p.cost)) : ''}</dl>
    <h3>Stock in and out</h3>${mv.length ? `<ul class="plain">${mv.map(m => `<li><span>${fmtD(m.ts)} · ${kindWord(m.kind)} · ${esc(m.ref)}<small>${esc(ST(m.by).name)}</small></span>${signed(m.qty)}</li>`).join('')}</ul>` : '<p class="muted">No movement yet.</p>'}</div>`;
  openSheet(pname(p), body, (role !== 'sales' ? `<button class="btn" data-act="adjust" data-id="${id}">Correct stock</button>` : '') + (owner ? `<button class="btn" data-act="prices" data-id="${id}">Change prices</button>` : '') + (can('collect') ? `<button class="btn btn-primary" data-act="sell" data-id="${id}"${p.qty ? '' : ' disabled'}>Sell this tyre</button>` : ''));
}
function custSheet(id) {
  const c = C(id), s = cstats(c);
  const list = db.invoices.filter(i => i.cust === id).sort((a, b) => (tot(b).bal > 0.005) - (tot(a).bal > 0.005) || b.ts - a.ts).slice(0, 10);
  const body = `<div class="doc"><div class="doc-top"><div><div class="doc-co">${esc(c.name)}</div><div class="muted">${esc(c.phone)}${c.phone ? ' · ' : ''}pays in ${c.terms} days</div></div><div class="doc-no"><span>To collect</span><b>${money(s.out)}</b></div></div>
    ${s.hold ? `<div class="banner banner-bad">${icon('lock')}<div><b>Credit hold</b><p>${money(s.over)} is overdue, ${plural(s.late, 'day')} late. New credit sales are blocked until it is paid.</p></div></div>` : ''}
    <dl class="kv"><div><dt>Credit limit</dt><dd>${money0(c.limit)}</dd></div><div><dt>Credit left</dt><dd>${money0(s.room)}</dd></div><div><dt>Overdue</dt><dd>${money(s.over)}</dd></div></dl>
    <h3>Invoices</h3>${list.length ? `<ul class="plain">${list.map(i => { const t = tot(i), st = stat(i); return `<li><button class="link" data-act="open-inv" data-id="${i.id}">${i.id}</button><span class="grow">${fmtD(i.date)}</span>${chip(st.cls, st.label, st.ic)}<b>${money(t.bal > 0.005 ? t.bal : t.total)}</b></li>`; }).join('')}</ul>` : '<p class="muted">No invoice yet.</p>'}</div>`;
  openSheet(c.name, body, (s.out > 0 ? `<button class="btn" data-act="remind" data-id="${id}">${icon('send')}Send reminder on WhatsApp</button>` : '') + `<button class="btn btn-primary" data-act="new-inv" data-id="${id}">New invoice</button>`);
}
function supSheet(id) {
  const s = SUP(id), x = sstats(s);
  const list = db.bills.filter(b => b.sup === id).sort((a, b) => (tot(b).bal > 0.005) - (tot(a).bal > 0.005) || b.ts - a.ts).slice(0, 10);
  const body = `<div class="doc"><div class="doc-top"><div><div class="doc-co">${esc(s.name)}</div><div class="muted">${esc(s.phone)} · you pay in ${s.terms} days</div></div><div class="doc-no"><span>To pay</span><b>${money(x.out)}</b></div></div>
    <dl class="kv"><div><dt>Brands</dt><dd>${esc(s.brands.join(', '))}</dd></div><div><dt>Unpaid bills</dt><dd>${x.n}</dd></div><div><dt>Overdue</dt><dd>${money(x.over)}</dd></div></dl>
    <h3>Bills</h3><ul class="plain">${list.map(b => { const t = tot(b), st = stat(b); return `<li><button class="link" data-act="open-bill" data-id="${b.id}">${esc(b.ref)}</button><span class="grow">${fmtD(b.date)}</span>${chip(st.cls, st.label, st.ic)}<b>${money(t.bal > 0.005 ? t.bal : t.total)}</b></li>`; }).join('')}</ul></div>`;
  openSheet(s.name, body, `<button class="btn btn-primary" data-act="new-bill" data-id="${id}">Enter supplier bill</button>`);
}

/* ---------- short forms ---------- */
function formSheet(title, fields, submit, onSubmit, intro) {
  const field = f => `<div class="field"><label for="g-${f.n}">${f.label}</label>` + (f.type === 'select'
    ? `<select id="g-${f.n}">${f.options.map(o => { const p = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(p[0])}"${String(p[0]) === String(f.value) ? ' selected' : ''}>${esc(p[1])}</option>`; }).join('')}</select>`
    : `<input id="g-${f.n}" type="${f.type || 'text'}" value="${esc(f.value == null ? '' : f.value)}"${f.type === 'number' ? ` step="${f.step || 1}" min="0" inputmode="decimal"` : ' maxlength="60"'}${f.ph ? ` placeholder="${esc(f.ph)}"` : ''}>`) + (f.hint ? `<p class="hint">${esc(f.hint)}</p>` : '') + '</div>';
  openSheet(title, `<div class="form">${intro || ''}${fields.map(field).join('')}<p class="form-err" id="g-err" role="alert" hidden></p></div>`, `<button class="btn" data-act="close-sheet">Cancel</button><button class="btn btn-primary" data-act="g-save">${submit}</button>`, { form: true });
  G = { fields, onSubmit };
}
function payForm(kind, id) {
  const inv = kind === 'inv', d = (inv ? db.invoices : db.bills).find(x => x.id === id), t = tot(d), who = inv ? C(d.cust) : SUP(d.sup);
  formSheet(inv ? 'Receive payment' : 'Pay supplier bill', [
    { n: 'amt', label: 'Amount', type: 'number', step: '0.01', value: t.bal, req: 1, hint: 'The balance is ' + money(t.bal) + '. A smaller amount is saved as a part payment.' },
    { n: 'method', label: inv ? 'Received by' : 'Paid by', type: 'select', options: ['Bank transfer', 'Cash', 'Card', 'Cheque'] }
  ], 'Save payment', v => {
    if (!(v.amt > 0)) return 'Enter the amount.';
    if (v.amt > t.bal + 0.005) return 'That is more than the balance of ' + money(t.bal) + '.';
    const ts = new Date(), amt = r2(v.amt);
    d.paid = r2(d.paid + amt); d.pays.push({ date: ts, amt, method: v.method });
    db.log.push({ ts, by: role, text: inv ? 'received a payment from ' + who.name + ' for ' + d.id : 'paid ' + who.name + ' for bill ' + d.ref, amt });
    toast(inv ? 'Payment saved. ' + who.name + ' now owes ' + money(cstats(who).out) + '.' : 'Payment saved. You now owe ' + who.name + ' ' + money(sstats(who).out) + '.', inv ? 'open-inv' : 'open-bill', d.id);
  }, `<p class="lead"><b>${esc(who.name)}</b> · ${esc(inv ? d.id : d.ref)}</p>`);
}
function adjustForm(id) {
  const p = P(id);
  formSheet('Correct stock', [
    { n: 'qty', label: 'Tyres counted on the rack', type: 'number', value: p.qty, req: 1, hint: 'The system says ' + p.qty + '. Enter what you actually counted.' },
    { n: 'why', label: 'Reason', type: 'select', options: ['Stock count correction', 'Damaged', 'Returned by customer', 'Returned to supplier'] }
  ], 'Save', v => {
    if (!(v.qty >= 0) || v.qty % 1) return 'Enter a whole number.';
    const diff = v.qty - p.qty, ts = new Date();
    if (!diff) return 'That is the same as the system. Nothing to correct.';
    p.qty = v.qty; db.moves.push({ ts, pid: id, qty: diff, kind: 'Adjustment', ref: v.why, by: role });
    db.log.push({ ts, by: role, text: 'corrected stock of ' + pname(p) + ' by ' + (diff > 0 ? '+' : '') + diff + ' (' + v.why.toLowerCase() + ')' });
    toast('Stock corrected. ' + pname(p) + ' is now ' + p.qty + '.', 'open-prod', id);
  }, `<p class="lead"><b>${esc(pname(p))}</b> · ${esc(p.size)}</p>`);
}
function priceForm(id) {
  const p = P(id);
  formSheet('Change prices', [
    { n: 'price', label: 'Selling price', type: 'number', step: '0.01', value: p.price, req: 1 },
    { n: 'cost', label: 'Cost price', type: 'number', step: '0.01', value: p.cost, req: 1 },
    { n: 'reorder', label: 'Reorder when stock reaches', type: 'number', value: p.reorder, req: 1 }
  ], 'Save', v => {
    if (!(v.price > 0)) return 'Enter the selling price.';
    p.price = r2(v.price); p.cost = r2(v.cost); p.reorder = Math.round(v.reorder);
    db.log.push({ ts: new Date(), by: role, text: 'changed the prices of ' + pname(p) });
    toast('Prices saved for ' + pname(p) + '.', 'open-prod', id);
  }, `<p class="lead"><b>${esc(pname(p))}</b> · ${esc(p.size)}</p>`);
}
function newProd() {
  formSheet('Add tyre', [
    { n: 'brand', label: 'Brand', req: 1, ph: 'Michelin' }, { n: 'pattern', label: 'Pattern', req: 1, ph: 'Primacy 4' }, { n: 'size', label: 'Size', req: 1, ph: '205/55 R16' },
    { n: 'type', label: 'Type', type: 'select', options: ['Car', 'SUV', 'Van', 'Truck'] },
    { n: 'price', label: 'Selling price', type: 'number', step: '0.01', req: 1 }, { n: 'cost', label: 'Cost price', type: 'number', step: '0.01', req: 1 },
    { n: 'qty', label: 'Tyres in stock now', type: 'number', value: 0, req: 1 }, { n: 'reorder', label: 'Reorder when stock reaches', type: 'number', value: 8, req: 1 }
  ], 'Add tyre', v => {
    if (!(v.price > 0)) return 'Enter the selling price.';
    if (v.qty % 1 || v.qty < 0) return 'Stock must be a whole number.';
    const ts = new Date(), p = { id: 'p' + (db.products.length + 1) + '-' + ts.getTime(), brand: v.brand, pattern: v.pattern, size: v.size, type: v.type, price: r2(v.price), cost: r2(v.cost), qty: v.qty, reorder: Math.round(v.reorder), sku: v.brand.slice(0, 3).toUpperCase() + '-' + v.size.replace(/[^0-9C]/gi, ''), rack: 'New' };
    db.products.unshift(p);
    if (p.qty) db.moves.push({ ts, pid: p.id, qty: p.qty, kind: 'Adjustment', ref: 'Opening stock', by: role });
    db.log.push({ ts, by: role, text: 'added a new tyre: ' + pfull(p) });
    toast(pname(p) + ' added to the stock list.', 'open-prod', p.id);
  });
}
function newCust() {
  formSheet('Add customer', [
    { n: 'name', label: 'Customer or company name', req: 1 }, { n: 'phone', label: 'Phone' },
    { n: 'limit', label: 'Credit limit', type: 'number', value: 2000, req: 1, hint: 'The most this customer may owe you at one time.' },
    { n: 'terms', label: 'Must pay within', type: 'select', value: 30, options: [[15, '15 days'], [30, '30 days'], [45, '45 days']] }
  ], 'Add customer', v => {
    const c = { id: 'c' + Date.now(), name: v.name, phone: v.phone, limit: Math.max(0, v.limit), terms: +v.terms };
    db.customers.push(c); ui.col.tab = 'cust';
    db.log.push({ ts: new Date(), by: role, text: 'added a new customer: ' + c.name });
    toast(c.name + ' added.', 'open-cust', c.id);
  });
}
function newExp() {
  formSheet('Add expense', [
    { n: 'cat', label: 'Category', type: 'select', options: ['Transport & delivery', 'Rent', 'Salaries', 'Electricity & water', 'Repairs & maintenance', 'Office & other'] },
    { n: 'note', label: 'What was it for', req: 1, ph: 'Delivery van fuel' },
    { n: 'amt', label: 'Amount', type: 'number', step: '0.01', req: 1 }
  ], 'Add expense', v => {
    if (!(v.amt > 0)) return 'Enter the amount.';
    const ts = new Date(), amt = r2(v.amt);
    db.expenses.push({ id: 'EXP-' + (++db.expNo), date: TODAY, ts, cat: v.cat, amt, note: v.note, by: role });
    db.log.push({ ts, by: role, text: 'added an expense: ' + v.note, amt });
    ui.fin.m = 0;
    toast('Expense saved. Today\'s profit is updated.');
  }, '<p class="hint">It is saved with today\'s date and comes off the profit straight away.</p>');
}

/* ---------- invoice and supplier bill (several lines) ---------- */
const fLine = (kind, pid) => { const p = pid && P(pid); return { pid: pid || '', qty: kind === 'inv' ? (p ? Math.max(1, Math.min(4, p.qty)) : 4) : 20, price: p ? (kind === 'inv' ? p.price : p.cost) : '' }; };
function fOpen(kind, pre) {
  pre = pre || {};
  const inv = kind === 'inv';
  openSheet(inv ? 'New invoice' : 'Enter supplier bill', '', `<button class="btn" data-act="close-sheet">Cancel</button><button class="btn btn-primary" data-act="f-save" id="f-save">${inv ? 'Save invoice' : 'Save bill'}</button>`, { wide: true });
  F = inv ? { kind, cust: pre.cust || 'cash', lines: [fLine(kind, pre.pid)], pay: pre.cust && pre.cust !== 'cash' ? 'credit' : 'now', method: 'Cash', ok: false } : { kind, sup: pre.sup || db.suppliers[0].id, ref: '', lines: [fLine(kind, pre.pid)] };
  fRender();
  const first = $('#sheet-body select'); if (first) first.focus();
}
function fCheck() {
  const inv = F.kind === 'inv', need = {}, errs = F.lines.map(() => '');
  let sub = 0, valid = true;
  F.lines.forEach((l, i) => {
    const p = l.pid && P(l.pid), q = +l.qty, pr = +l.price;
    if (!p) { valid = false; return; }
    if (!(q >= 1) || q % 1) { errs[i] = 'Enter a whole number of tyres.'; valid = false; return; }
    if (l.price === '' || !(pr >= 0)) { errs[i] = inv ? 'Enter the price.' : 'Enter the cost.'; valid = false; return; }
    if (inv) { need[p.id] = (need[p.id] || 0) + q; if (need[p.id] > p.qty) { errs[i] = p.qty ? 'Only ' + p.qty + ' in stock. You cannot sell more than you have.' : 'Out of stock. It cannot be sold until it is restocked.'; valid = false; } }
    sub += q * pr;
  });
  sub = r2(sub);
  const tax = inv ? r2(sub * S.tax / 100) : 0, total = r2(sub + tax);
  let block = null;
  if (inv && F.pay === 'credit' && F.cust !== 'cash') {
    const c = C(F.cust), s = cstats(c);
    if (s.hold) block = { t: 'Credit hold', x: c.name + ' has ' + money(s.over) + ' overdue (' + plural(s.late, 'day') + ' late). No new credit until it is paid.' };
    else if (s.out + total > c.limit + 0.005) block = { t: 'Over the credit limit', x: 'This sale takes ' + c.name + ' to ' + money(s.out + total) + '. The limit is ' + money(c.limit) + '.' };
  }
  return { sub, tax, total, errs, block, valid };
}
function fRefresh() {
  const k = fCheck(), inv = F.kind === 'inv', row = (l, v, cls) => `<div${cls ? ` class="${cls}"` : ''}><span>${l}</span><span>${v}</span></div>`;
  $$('#sheet-body .line').forEach((el, i) => {
    const l = F.lines[i], e = $('.line-err', el);
    $('.line-amt', el).textContent = l.pid && +l.qty > 0 ? money((+l.qty || 0) * (+l.price || 0)) : '—';
    e.textContent = k.errs[i]; e.hidden = !k.errs[i];
  });
  $('#f-totals').innerHTML = (k.tax ? row('Subtotal', money(k.sub)) + row('Tax (' + S.tax + '%)', money(k.tax)) : '') + row('Total', money(k.total), 'strong');
  if (inv) {
    const c = C(F.cust), s = c.id === 'cash' ? null : cstats(c);
    $('#f-hint').textContent = s ? 'Owes ' + money(s.out) + ' now · credit limit ' + money0(c.limit) + ' · pays in ' + c.terms + ' days' : 'Walk-in customers pay at the counter.';
    $('#f-banner').innerHTML = k.block ? `<div class="banner banner-bad" role="alert">${icon('lock')}<div><b>${k.block.t}</b><p>${esc(k.block.x)}</p>${role === 'owner' ? `<label class="check"><input type="checkbox" data-ff="ok"${F.ok ? ' checked' : ''}> Approve this sale anyway (owner only)</label>` : '<p>Take the payment now, or ask the owner to approve it.</p>'}</div></div>` : '';
  }
  $('#f-save').disabled = !k.valid || !!(k.block && !(role === 'owner' && F.ok));
}
function fRender() {
  const inv = F.kind === 'inv';
  const opts = db.products.map(p => `<option value="${p.id}">${esc(pfull(p))} (${p.qty} in stock)</option>`).join('');
  const lines = F.lines.map((l, i) => `<div class="line" data-i="${i}"><select data-ff="pid" aria-label="Tyre"><option value="">Choose a tyre…</option>${l.pid ? opts.replace('value="' + l.pid + '"', 'value="' + l.pid + '" selected') : opts}</select><input type="number" data-ff="qty" min="1" step="1" inputmode="numeric" value="${esc(l.qty)}" aria-label="Quantity"><input type="number" data-ff="price" min="0" step="0.01" inputmode="decimal" value="${esc(l.price)}" aria-label="${inv ? 'Price each' : 'Cost each'}"><span class="line-amt"></span><button class="icon-btn" data-act="line-del" data-i="${i}" aria-label="Remove this tyre"${F.lines.length < 2 ? ' disabled' : ''}>${icon('x')}</button><p class="line-err" role="alert" hidden></p></div>`).join('');
  const top = inv
    ? `<div class="field"><label for="f-cust">Customer</label><select id="f-cust" data-ff="cust">${db.customers.map(c => `<option value="${c.id}"${c.id === F.cust ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}</select><p class="hint" id="f-hint"></p></div><div id="f-banner"></div>`
    : `<div class="field-row"><div class="field"><label for="f-sup">Supplier</label><select id="f-sup" data-ff="sup">${db.suppliers.map(s => `<option value="${s.id}"${s.id === F.sup ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</select></div><div class="field"><label for="f-ref">Supplier's bill number</label><input id="f-ref" data-ff="ref" maxlength="30" value="${esc(F.ref)}" placeholder="As printed on their bill"></div></div>`;
  const pay = inv
    ? `<fieldset class="field pay"><legend>Payment</legend><label class="radio"><input type="radio" name="f-pay" data-ff="pay" value="now"${F.pay === 'now' ? ' checked' : ''}><span>Paid now</span><select data-ff="method" aria-label="How it was paid"${F.pay === 'now' ? '' : ' disabled'}>${['Cash', 'Card', 'Bank transfer'].map(m => `<option${m === F.method ? ' selected' : ''}>${m}</option>`).join('')}</select></label><label class="radio"><input type="radio" name="f-pay" data-ff="pay" value="credit"${F.pay === 'credit' ? ' checked' : ''}${F.cust === 'cash' ? ' disabled' : ''}><span>${F.cust === 'cash' ? 'On credit (choose a customer with an account)' : 'On credit, to be paid within ' + C(F.cust).terms + ' days'}</span></label></fieldset>`
    : `<p class="hint">This bill is due ${SUP(F.sup).terms} days from today. Stock goes up as soon as you save, and the amount shows in Money to pay.</p>`;
  $('#sheet-body').innerHTML = `<div class="form">${top}<div class="lines"><div class="lines-head"><span>Tyre</span><span>Qty</span><span>${inv ? 'Price each' : 'Cost each'}</span><span>Amount</span><span></span></div>${lines}<button class="btn btn-sm btn-ghost" data-act="line-add">${icon('plus')}Add another tyre</button></div><div class="totals" id="f-totals"></div>${pay}</div>`;
  fRefresh();
}
function fInput(t) {
  const k = t.dataset.ff, rowEl = t.closest('.line'), i = rowEl ? +rowEl.dataset.i : -1;
  if (k === 'qty' || k === 'price') { F.lines[i][k] = t.value; return fRefresh(); }
  if (k === 'ok') { F.ok = t.checked; return fRefresh(); }
  if (k === 'method' || k === 'ref') { F[k] = t.value; return; }
  if (k === 'pid') { const p = P(t.value); F.lines[i].pid = t.value; if (p) F.lines[i].price = F.kind === 'inv' ? p.price : p.cost; fRender(); const q = $$('#sheet-body .line')[i]; if (q) $('[data-ff="qty"]', q).focus(); return; }
  if (k === 'cust') { F.cust = t.value; F.pay = t.value === 'cash' ? 'now' : 'credit'; F.ok = false; }
  else if (k === 'pay') { F.pay = t.value; F.ok = false; }
  else F[k] = t.value;
  fRender();
  const again = $('#sheet-body [data-ff="' + k + '"]' + (k === 'pay' ? ':checked' : '')); if (again) again.focus();
}
function fSave() {
  const k = fCheck(), ts = new Date();
  if (!k.valid) return;
  if (F.kind === 'inv') {
    if (k.block && !(role === 'owner' && F.ok)) return;
    const c = C(F.cust), credit = F.pay === 'credit';
    const doc = { id: 'INV-' + (++db.invNo), date: TODAY, ts, cust: c.id, lines: F.lines.map(l => ({ pid: l.pid, qty: +l.qty, price: r2(+l.price), cost: P(l.pid).cost })), taxRate: S.tax, paid: 0, pays: [], due: credit ? addDays(TODAY, c.terms) : null, by: role };
    if (!credit) { doc.paid = k.total; doc.pays.push({ date: ts, amt: k.total, method: F.method }); }
    db.invoices.push(doc);
    doc.lines.forEach(l => { P(l.pid).qty -= l.qty; db.moves.push({ ts, pid: l.pid, qty: -l.qty, kind: 'Sale', ref: doc.id, by: role }); });
    db.log.push({ ts, by: role, text: 'made invoice ' + doc.id + ' for ' + c.name, amt: k.total });
    closeSheet(); render();
    toast('Invoice ' + doc.id + ' saved. Stock went down by ' + plural(tot(doc).units, 'tyre') + '.', 'open-inv', doc.id);
  } else {
    const s = SUP(F.sup), n = ++db.billNo;
    const doc = { id: 'BILL-' + String(n).padStart(4, '0'), ref: F.ref.trim() || s.pre + '-' + (20400 + n * 7), date: TODAY, ts, sup: s.id, lines: F.lines.map(l => ({ pid: l.pid, qty: +l.qty, price: r2(+l.price) })), paid: 0, pays: [], due: addDays(TODAY, s.terms), by: role };
    db.bills.push(doc);
    doc.lines.forEach(l => { const p = P(l.pid); p.qty += l.qty; p.cost = l.price; db.moves.push({ ts, pid: l.pid, qty: l.qty, kind: 'Purchase', ref: doc.ref, by: role }); });
    db.log.push({ ts, by: role, text: 'received ' + tot(doc).units + ' tyres from ' + s.name + ' (bill ' + doc.ref + ')', amt: k.total });
    closeSheet(); render();
    toast('Bill ' + doc.ref + ' saved. Stock went up by ' + plural(tot(doc).units, 'tyre') + '.', 'open-bill', doc.id);
  }
}

/* ---------- colours and settings ---------- */
function customise() {
  const segSet = (k, items) => `<div class="seg" role="group">${items.map(o => `<button class="seg-b${S[k] === o[0] ? ' on' : ''}" aria-pressed="${S[k] === o[0]}" data-act="set-seg" data-k="${k}" data-v="${o[0]}">${o[2] ? icon(o[2]) : ''}${o[1]}</button>`).join('')}</div>`;
  openSheet('Colours and settings', `<div class="form">
    <div class="field"><span class="label">Theme colour</span><div class="swatches">${SWATCHES.map(c => `<button class="swatch${c[1] === S.color ? ' on' : ''}" style="--sw:${c[1]}" data-act="set-color" data-id="${c[1]}" aria-label="${c[0]}" aria-pressed="${c[1] === S.color}" title="${c[0]}">${icon('check')}</button>`).join('')}<label class="swatch swatch-custom" title="Pick any colour"><input type="color" data-set="color" value="${S.color}" aria-label="Pick any colour"><span>${icon('palette')}</span></label></div><p class="hint">Buttons, links, the menu and the charts follow this colour. It can be your own brand colour.</p></div>
    <div class="field"><span class="label">Background</span>${segSet('mode', [['light', 'Light', 'sun'], ['dark', 'Dark', 'moon'], ['system', 'Auto', 'monitor']])}</div>
    <div class="field"><span class="label">Row spacing</span>${segSet('density', [['comfortable', 'Comfortable'], ['compact', 'Compact']])}</div>
    <hr>
    <div class="field"><label for="s-name">Business name</label><input id="s-name" data-set="name" maxlength="40" value="${esc(S.name)}"></div>
    <div class="field-row"><div class="field"><label for="s-cur">Currency</label><select id="s-cur" data-set="cur">${CURS.map(c => `<option value="${c[0]}"${c[0] === S.cur ? ' selected' : ''}>${c[0]} · ${c[1]}</option>`).join('')}</select></div><div class="field"><label for="s-tax">Sales tax or VAT (%)</label><input id="s-tax" type="number" min="0" max="30" step="0.5" inputmode="decimal" data-set="tax" value="${S.tax}"></div></div>
    <p class="hint">Tax is added to new invoices. The currency changes how amounts are shown; it does not convert them.</p>
    <hr>
    <button class="btn" data-act="copy-link">${icon('link')}Copy a link with this look</button>
    <button class="btn btn-ghost" data-act="reset-data">${icon('refresh')}Start again with fresh sample data</button>
  </div>`, '<button class="btn btn-primary" data-act="close-sheet">Done</button>');
}
function setInput(t) {
  const k = t.dataset.set;
  if (k === 'color') { S.color = t.value.toLowerCase(); applyTheme(); $$('.swatch[data-id]').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); }); }
  else if (k === 'name') { S.name = t.value.slice(0, 40) || DEFAULTS.name; $('#co-name').textContent = S.name; render(); }
  else if (k === 'cur') { S.cur = t.value; setCurrency(); render(); }
  else if (k === 'tax') { S.tax = Math.min(30, Math.max(0, parseFloat(t.value) || 0)); }
  saveSettings();
}

/* ---------- search ---------- */
function searchRun(v) {
  const q = v.trim().toLowerCase(), out = [];
  if (!q) return closeMenu();
  db.products.filter(p => (pfull(p) + ' ' + p.sku).toLowerCase().includes(q)).slice(0, 5).forEach(p => out.push(mi('open-prod', 'box', pfull(p), p.qty + ' in stock', p.id)));
  if (can('collect')) {
    db.customers.filter(c => c.id !== 'cash' && c.name.toLowerCase().includes(q)).slice(0, 3).forEach(c => out.push(mi('open-cust', 'users', c.name, 'Customer', c.id)));
    db.invoices.filter(i => i.id.toLowerCase().includes(q)).slice(-3).reverse().forEach(i => out.push(mi('open-inv', 'receipt', i.id, C(i.cust).name + ' · ' + fmtD(i.date), i.id)));
  }
  if (can('pay')) db.suppliers.filter(s => s.name.toLowerCase().includes(q)).slice(0, 3).forEach(s => out.push(mi('open-sup', 'truck', s.name, 'Supplier', s.id)));
  openMenu($('#search'), out.join('') || '<div class="menu-empty">Nothing found.</div>', 'search', true);
}

/* ---------- what each button does ---------- */
const A = {
  'nav-toggle'() { if (innerWidth < 1024) { const open = document.body.classList.toggle('nav-open'); $('#scrim').hidden = !open; } else { document.body.classList.toggle('nav-mini'); setTimeout(() => $$('[data-chart]').forEach(drawChart), 220); } },
  'nav-close'() { document.body.classList.remove('nav-open'); $('#scrim').hidden = true; },
  'search-toggle'() { if (document.body.classList.toggle('search-open')) $('#q').focus(); },
  'new-menu'(el) { openMenu(el, (can('collect') ? mi('new-inv', 'receipt', 'New invoice', 'Sell tyres to a customer') : '') + (can('pay') ? mi('new-bill', 'truck', 'Enter supplier bill', 'Tyres you bought') : '') + (can('finance') ? mi('new-exp', 'wallet', 'Add expense', 'Rent, fuel, salaries') : '') + (role === 'owner' ? mi('new-prod', 'box', 'Add tyre', 'A new brand, pattern or size') : '') + (can('collect') ? mi('new-cust', 'users', 'Add customer', 'With a credit limit') : ''), 'new-menu'); },
  bell(el) { openMenu(el, '<div class="menu-label">Needs attention</div>' + alertList(alerts(), 7), 'bell'); },
  'user-menu'(el) { const me = ST(role); openMenu(el, `<div class="menu-head"><span class="avatar sm">${me.init}</span><span><b>${esc(me.name)}</b><small>${me.role} · ${esc(S.name)}</small></span></div><hr><div class="menu-label">See the system as</div>${STAFF.map(s => `<button class="menu-item" role="menuitemradio" aria-checked="${s.id === role}" data-act="as" data-id="${s.id}"><span class="avatar sm">${s.init}</span><span><b>${esc(s.name)} · ${s.role}</b><small>${s.sees}</small></span>${s.id === role ? icon('check') : ''}</button>`).join('')}<hr>${mi('customise', 'palette', 'Colours and settings')}${mi('reset-data', 'refresh', 'Start again with fresh sample data')}`, 'user-menu'); },
  as(el) { const s = ST(el.dataset.id); if (!s || s.id === role) return; role = s.id; closeSheet(); renderTop(); render(true); toast('You now see what ' + s.name + ' (' + s.role + ') sees. Switch back with the round button at the top right.'); },
  customise() { customise(); },
  'set-color'(el) { S.color = el.dataset.id; saveSettings(); applyTheme(); $$('.swatch[data-id]').forEach(b => { const on = b.dataset.id === S.color; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); const ci = $('.swatch-custom input'); if (ci) ci.value = S.color; },
  'set-seg'(el) { S[el.dataset.k] = el.dataset.v; saveSettings(); applyTheme(); $$('.seg-b[data-k="' + el.dataset.k + '"]').forEach(b => { const on = b.dataset.v === el.dataset.v; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); },
  'copy-link'() {
    const url = location.origin + location.pathname + '?name=' + encodeURIComponent(S.name) + '&color=' + S.color.slice(1) + '&mode=' + S.mode + '&cur=' + S.cur;
    const done = () => toast('Link copied. Anyone who opens it sees this name and colour.');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => window.prompt('Copy this link', url)); else window.prompt('Copy this link', url);
  },
  'reset-data'() { db = seed(); ui.pg = {}; ui.guide = true; closeSheet(); render(true); toast('Fresh sample data loaded.'); },
  'guide-x'() { ui.guide = false; render(); },
  'guide-pay'() { const open = db.invoices.filter(i => tot(i).bal > 0.005).sort((a, b) => a.due - b.due)[0]; if (open) payForm('inv', open.id); else toast('Every invoice is paid. Make a credit invoice first.'); },
  tab(el) { ui[el.dataset.k].tab = el.dataset.v; ui.pg = {}; render(); },
  seg(el) { const p = el.dataset.k.split('.'); ui[p[0]][p[1]] = el.dataset.v; ui.pg = {}; render(); },
  pg(el) { ui.pg[el.dataset.k] = (ui.pg[el.dataset.k] || 0) + +el.dataset.d; region(); },
  'chart-table'(el) { ui.ct[el.dataset.id] = !ui.ct[el.dataset.id]; render(); },
  export(el) {
    const k = el.dataset.id, owner = role === 'owner';
    if (k === 'stock') csv('tyre-stock.csv', ['Brand', 'Pattern', 'Size', 'Type', 'Code', 'Rack', 'In stock', 'Reorder at', 'Price'].concat(owner ? ['Cost', 'Stock value'] : []), db.products.map(p => [p.brand, p.pattern, p.size, p.type, p.sku, p.rack, p.qty, p.reorder, p.price].concat(owner ? [p.cost, p.qty * p.cost] : [])));
    if (k === 'inv') csv('invoices.csv', ['Invoice', 'Date', 'Customer', 'Total', 'Paid', 'To collect', 'Due', 'Status'], db.invoices.slice().reverse().map(i => { const t = tot(i); return [i.id, iso(i.date), C(i.cust).name, t.total, i.paid, t.bal, i.due ? iso(i.due) : '', stat(i).label]; }));
    if (k === 'bills') csv('supplier-bills.csv', ['Bill', 'Date', 'Supplier', 'Total', 'Paid', 'To pay', 'Due', 'Status'], db.bills.slice().reverse().map(b => { const t = tot(b); return [b.ref, iso(b.date), SUP(b.sup).name, t.total, b.paid, t.bal, iso(b.due), stat(b).label]; }));
    if (k === 'fin') { const ms = months(), m = ms[ui.fin.m] || ms[0]; csv('daily-profit-' + iso(m.a).slice(0, 7) + '.csv', ['Date', 'Invoices', 'Tyres sold', 'Sales', 'Cost of tyres', 'Expenses', 'Net profit'], dailyRows(m).reverse().map(r => [iso(r.d), r.n, r.units, r2(r.sales), r2(r.cogs), r2(r.exp), r2(r.net)])); }
  },
  'new-inv'(el) { if (can('collect')) fOpen('inv', { cust: el.dataset.id }); },
  'new-bill'(el) { if (can('pay')) fOpen('bill', { sup: el.dataset.id }); },
  'new-exp'() { newExp(); },
  'new-prod'() { newProd(); },
  'new-cust'() { newCust(); },
  sell(el) { fOpen('inv', { pid: el.dataset.id }); },
  'line-add'() { F.lines.push(fLine(F.kind)); fRender(); const s = $$('#sheet-body .line select'); s[s.length - 1].focus(); },
  'line-del'(el) { F.lines.splice(+el.dataset.i, 1); fRender(); },
  'f-save'() { fSave(); },
  'g-save'() {
    const v = {}; let err = '';
    G.fields.forEach(f => { const el = $('#g-' + f.n); v[f.n] = f.type === 'number' ? parseFloat(el.value) : el.value.trim(); if (!err && f.req && (f.type === 'number' ? isNaN(v[f.n]) : !v[f.n])) err = 'Please fill in: ' + f.label + '.'; });
    err = err || G.onSubmit(v) || '';
    if (err) { const e = $('#g-err'); e.textContent = err; e.hidden = false; return; }
    closeSheet(); render();
  },
  'close-sheet'() { closeSheet(); },
  'open-inv'(el) { docSheet('inv', el.dataset.id); },
  'open-bill'(el) { docSheet('bill', el.dataset.id); },
  'open-prod'(el) { prodSheet(el.dataset.id); },
  'open-cust'(el) { custSheet(el.dataset.id); },
  'open-sup'(el) { supSheet(el.dataset.id); },
  'pay-inv'(el) { payForm('inv', el.dataset.id); },
  'pay-bill'(el) { payForm('bill', el.dataset.id); },
  adjust(el) { adjustForm(el.dataset.id); },
  prices(el) { priceForm(el.dataset.id); },
  remind(el) {
    const c = C(el.dataset.id), s = cstats(c), list = db.invoices.filter(i => i.cust === c.id && tot(i).bal > 0.005).map(i => i.id).join(', ');
    const msg = 'Hello ' + c.name + ', this is a reminder from ' + S.name + '. ' + (s.over ? money(s.over) + ' is overdue' : money(s.out) + ' is due') + ' on ' + list + '. Total to pay: ' + money(s.out) + '. Thank you.';
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  },
  print() { window.print(); }
};

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'), inMenu = !!e.target.closest('.menu'), was = menuFor;
  if (menuEl && !inMenu && !e.target.closest('#search')) closeMenu();
  if (!el || el.disabled) return;
  const a = el.dataset.act;
  if (inMenu) { closeMenu(); document.body.classList.remove('search-open'); const q = $('#q'); if (q) q.value = ''; }
  if (was === a && (a === 'new-menu' || a === 'bell' || a === 'user-menu')) return;
  if (A[a]) A[a](el, e);
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'q') return searchRun(t.value);
  if (t.dataset.f) { const p = t.dataset.f.split('.'); ui[p[0]][p[1]] = t.type === 'checkbox' ? t.checked : t.value; ui.pg = {}; if (t.dataset.full) render(); else region(); return; }
  if (F && t.dataset.ff) return fInput(t);
  if (t.dataset.set) setInput(t);
});
document.addEventListener('focusin', e => { if (e.target.id === 'q' && e.target.value) searchRun(e.target.value); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (menuEl) closeMenu(); else if ($('.sheet')) closeSheet(); else { A['nav-close'](); document.body.classList.remove('search-open'); }
    return;
  }
  if (e.key !== 'Enter') return;
  const t = e.target;
  if (t.matches('tr[data-act]')) { e.preventDefault(); t.click(); }
  else if (t.matches('.sheet-body input:not([type="checkbox"]):not([type="radio"]):not([type="color"])')) { const b = $('.sheet-foot .btn-primary'); if (b && !b.disabled) { e.preventDefault(); b.click(); } }
});
window.addEventListener('hashchange', () => { A['nav-close'](); closeMenu(); closeSheet(); render(); });
let rz = 0;
window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { closeMenu(); $$('[data-chart]').forEach(drawChart); }, 150); });
if (mq.addEventListener) mq.addEventListener('change', () => { if (S.mode === 'system') applyTheme(); });

/* ---------- start ---------- */
setCurrency();
applyTheme();
saveSettings();
renderTop();
render();
})();
