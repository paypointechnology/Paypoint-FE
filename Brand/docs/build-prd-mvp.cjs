/* Builds a compact (≤3pp) branded Paypoint MVP launch PRD from PRD-Paypoint-MVP.md. */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS = __dirname;
const ASSETS = path.join(DOCS, '..', 'Logo Assets');
const FONTS = path.join(DOCS, '..', 'Fonts-Inter', 'static');

const b64img = (p) => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const WORD_MINT = b64img(path.join(ASSETS, 'Wordmark', 'PNG', 'Mint Green.png'));

const fontB64 = (f) => 'data:font/ttf;base64,' + fs.readFileSync(path.join(FONTS, f)).toString('base64');
const FACE = (file, w) => `@font-face{font-family:'Inter';font-style:normal;font-weight:${w};font-display:swap;src:url(${fontB64(file)}) format('truetype');}`;
const FONT_FACES = [
  FACE('Inter_18pt-Regular.ttf', 400),
  FACE('Inter_18pt-Medium.ttf', 500),
  FACE('Inter_18pt-SemiBold.ttf', 600),
  FACE('Inter_18pt-Bold.ttf', 700),
].join('\n');

const md = fs.readFileSync(path.join(DOCS, 'PRD-Paypoint-MVP.md'), 'utf8');
// strip the H1 + the meta line (header band renders them)
const bodyMd = md.split('\n')
  .filter(l => !/^# Paypoint MVP/.test(l) && !/^\*\*Version\*\*/.test(l))
  .join('\n');
const tmp = path.join(DOCS, '.prd-mvp-body.tmp.md');
fs.writeFileSync(tmp, bodyMd);
const bodyHtml = execSync(`pandoc -f gfm -t html --wrap=none "${tmp}"`, { encoding: 'utf8', maxBuffer: 1 << 26 });
fs.unlinkSync(tmp);

const CSS = `
@page { size: A4; margin: 11mm 13mm 11mm; }
* { box-sizing: border-box; }
:root{
  --brand:#5F58F4; --brand-hover:#4A43D6; --tint:#EEEDFE; --tint-soft:#F5F4FF;
  --ink:#14132B; --text:#33323F; --muted:#6C6B7B; --subtle:#9A99A8;
  --bg-soft:#FAFAFE; --border:#ECEBF3;
}
html,body{ margin:0; padding:0; }
body{ font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif; color:var(--text);
  font-size:8.6pt; line-height:1.42; -webkit-font-smoothing:antialiased; }

/* header band */
.band{ background:var(--brand); color:#fff; border-radius:12px; padding:9mm 10mm; margin-bottom:5mm;
  position:relative; overflow:hidden; }
.band img{ height:8mm; position:relative; z-index:2; }
.band .eyebrow{ font-size:8pt; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:#CFCDFF; margin-top:5mm; position:relative; z-index:2; }
.band h1{ font-size:21pt; font-weight:700; letter-spacing:-.02em; margin:1.5mm 0 0; color:#fff; position:relative; z-index:2; }
.band .meta{ font-size:8pt; color:#E2E1FF; margin-top:3mm; position:relative; z-index:2; }
.band .meta b{ color:#fff; font-weight:600; }
.band .glow{ position:absolute; width:160mm; height:160mm; right:-70mm; top:-90mm; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 60%); z-index:1; }

.doc > :first-child{ margin-top:0; }
h2{ font-size:11pt; font-weight:700; color:var(--ink); letter-spacing:-.01em; margin:4.5mm 0 1.5mm;
  padding-bottom:1mm; border-bottom:1.5px solid var(--brand); page-break-after:avoid; }
h2:first-of-type{ margin-top:0; }
p{ margin:0 0 2mm; }
strong{ color:var(--ink); font-weight:700; }
a{ color:var(--brand); text-decoration:none; }
ul{ margin:0 0 2mm; padding-left:4.5mm; }
li{ margin-bottom:1mm; }
li::marker{ color:var(--brand); }
em{ color:var(--text); }

code{ font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace; font-size:7.4pt;
  background:var(--bg-soft); border:1px solid var(--border); border-radius:3px; padding:0 3px; color:#3A0CA3; }

table{ width:100%; border-collapse:collapse; margin:1.5mm 0 3mm; font-size:7.8pt; line-height:1.32;
  page-break-inside:avoid; border:1px solid var(--border); }
thead th{ background:var(--tint); color:var(--ink); font-weight:700; text-align:left;
  padding:1.4mm 2mm; border-bottom:1.2px solid var(--brand); }
td{ padding:1.3mm 2mm; border-top:1px solid var(--border); color:var(--text); vertical-align:top; }
td code{ font-size:7pt; }
tbody tr:nth-child(even){ background:var(--bg-soft); }
table strong{ color:var(--ink); }
`;

const BAND = `
<div class="band">
  <div class="glow"></div>
  <img src="${WORD_MINT}" alt="Paypoint"/>
  <div class="eyebrow">MVP Launch PRD · 2-Week Build</div>
  <h1>Paypoint MVP — 2-Week Launch</h1>
  <div class="meta"><b>v1.0</b> &nbsp;·&nbsp; Author <b>Newman Haruna</b> &nbsp;·&nbsp; Stakeholder <b>Yvonne Joseph</b> &nbsp;·&nbsp; 16 June 2026 &nbsp;·&nbsp; Confidential</div>
</div>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<title>Paypoint MVP — 2-Week Launch PRD</title>
<style>${FONT_FACES}</style><style>${CSS}</style></head>
<body>${BAND}<div class="doc">${bodyHtml}</div></body></html>`;

fs.writeFileSync(path.join(DOCS, 'PRD-Paypoint-MVP.html'), html);
console.log('Wrote PRD-Paypoint-MVP.html');
