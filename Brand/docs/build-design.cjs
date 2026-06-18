/* Assembles the self-contained Paypoint UX/UI design doc from design-body.html. */
const fs = require('fs');
const path = require('path');

const DOCS = __dirname;
const ASSETS = path.join(DOCS, '..', 'Logo Assets');
const FONTS = path.join(DOCS, '..', 'Fonts-Inter', 'static');
const LOCAL = path.join(DOCS, '.assets');

const imgB64 = (p, mime) => `data:${mime};base64,` + fs.readFileSync(p).toString('base64');
const ICON_INDIGO = imgB64(path.join(ASSETS, 'Iconmark', 'PNG', 'Electric Blue.png'), 'image/png');
const WORD_INDIGO = imgB64(path.join(ASSETS, 'Wordmark', 'PNG', 'Electric Blue.png'), 'image/png');
const WORD_MINT = imgB64(path.join(ASSETS, 'Wordmark', 'PNG', 'Mint Green.png'), 'image/png');

// --- Inter (embedded) ---
const fontB64 = (f) => 'data:font/ttf;base64,' + fs.readFileSync(path.join(FONTS, f)).toString('base64');
const FACE = (file, w) => `@font-face{font-family:'Inter';font-style:normal;font-weight:${w};font-display:swap;src:url(${fontB64(file)}) format('truetype');}`;
const INTER = [
  FACE('Inter_18pt-Regular.ttf', 400),
  FACE('Inter_18pt-Medium.ttf', 500),
  FACE('Inter_18pt-SemiBold.ttf', 600),
  FACE('Inter_18pt-Bold.ttf', 700),
].join('\n');

// --- Tabler icons (embed woff2 into the official CSS) ---
const tablerWoff2 = 'data:font/woff2;base64,' + fs.readFileSync(path.join(LOCAL, 'tabler.woff2')).toString('base64');
let tablerCss = fs.readFileSync(path.join(LOCAL, 'tabler.css'), 'utf8');
tablerCss = tablerCss.replace(/src:url\("\.\/fonts\/tabler-icons[\s\S]*?format\("truetype"\)/,
  `src:url(${tablerWoff2}) format("woff2")`);

// --- body fragment + asset token replacement ---
let body = fs.readFileSync(path.join(DOCS, 'design-body.html'), 'utf8');
body = body.split('{{LOGO_ICON_INDIGO}}').join(ICON_INDIGO)
           .split('{{LOGO_WORD_INDIGO}}').join(WORD_INDIGO)
           .split('{{LOGO_WORD_MINT}}').join(WORD_MINT);

// embed every external image: cache-first, otherwise download (robust to new URLs)
const { execSync } = require('child_process');
const extUrls = [...new Set(body.match(/https?:\/\/[^"')\s]+/g) || [])];
extUrls.forEach((u) => {
  const key = u.replace(/[^a-z0-9]/gi, '_').slice(0, 80);
  const cached = path.join(LOCAL, key + '.bin');
  if (!fs.existsSync(cached)) {
    execSync(`curl -fsSL ${JSON.stringify(u)} -o ${JSON.stringify(cached)}`);
  }
  const data = imgB64(cached, 'image/jpeg');
  body = body.split(u).join(data);
});

const PAGE_CSS = `
@page { size: A4 portrait; margin: 14mm 12mm; }
*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; }
body{ font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif; -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility; background:#fff; }
img{ max-width:100%; }
/* print pagination backstop: each screen on a fresh page; no device frame splits */
.screen-head{ break-before:page; page-break-before:always; }
.section .screen-head:first-of-type{ break-before:page; }
.phone, .web-frame{ break-inside:avoid; page-break-inside:avoid; }
.proto-caption{ break-after:avoid; page-break-after:avoid; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<title>Paypoint — UX/UI Design System & MVP Screens</title>
<style>${INTER}</style>
<style>${tablerCss}</style>
<style>${PAGE_CSS}</style>
</head><body>${body}</body></html>`;

fs.writeFileSync(path.join(DOCS, 'Paypoint-UX-UI-Design.html'), html);
console.log('Wrote Paypoint-UX-UI-Design.html (' + Math.round(html.length / 1024) + ' KB)');
