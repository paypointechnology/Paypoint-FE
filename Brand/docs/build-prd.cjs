/* Builds a branded Paypoint PRD document (A4 portrait) from PRD-Paypoint.md. */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS = __dirname;
const ASSETS = path.join(DOCS, '..', 'Logo Assets');
const FONTS = path.join(DOCS, '..', 'Fonts-Inter', 'static');

const b64img = (p) => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const ICON_INDIGO = b64img(path.join(ASSETS, 'Iconmark', 'PNG', 'Electric Blue.png'));
const WORD_MINT = b64img(path.join(ASSETS, 'Wordmark', 'PNG', 'Mint Green.png'));

const fontB64 = (f) => 'data:font/ttf;base64,' + fs.readFileSync(path.join(FONTS, f)).toString('base64');
const FACE = (file, w) => `@font-face{font-family:'Inter';font-style:normal;font-weight:${w};font-display:swap;src:url(${fontB64(file)}) format('truetype');}`;
const FONT_FACES = [
  FACE('Inter_18pt-Regular.ttf', 400),
  FACE('Inter_18pt-Medium.ttf', 500),
  FACE('Inter_18pt-SemiBold.ttf', 600),
  FACE('Inter_18pt-Bold.ttf', 700),
].join('\n');

// --- markdown -> html body via pandoc (drop the H1 title + Status/Stakeholders meta lines; cover handles them) ---
const md = fs.readFileSync(path.join(DOCS, 'PRD-Paypoint.md'), 'utf8');
const bodyMd = md.split('\n')
  .filter(l => !/^# PRD:/.test(l) && !/^\*\*Status\*\*/.test(l) && !/^\*\*Stakeholders\*\*/.test(l))
  .join('\n');
const tmp = path.join(DOCS, '.prd-body.tmp.md');
fs.writeFileSync(tmp, bodyMd);
const bodyHtml = execSync(`pandoc -f gfm -t html --wrap=none "${tmp}"`, { encoding: 'utf8', maxBuffer: 1 << 26 });
fs.unlinkSync(tmp);

const CSS = `
@page { size: A4; margin: 18mm 15mm 16mm; }
@page :first { margin: 0; }
* { box-sizing: border-box; }
:root{
  --brand:#5F58F4; --brand-hover:#4A43D6; --tint:#EEEDFE; --tint-soft:#F5F4FF;
  --ink:#14132B; --text:#33323F; --muted:#6C6B7B; --subtle:#9A99A8;
  --bg:#FFFFFF; --bg-soft:#FAFAFE; --border:#ECEBF3; --border-strong:#E3E2EE;
  --success:#0B7A4B; --warning:#9A5A00; --danger:#B42318;
}
html,body{ margin:0; padding:0; }
body{ font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif; color:var(--text);
  font-size:10pt; line-height:1.55; -webkit-font-smoothing:antialiased; }

/* cover */
.cover{ position:relative; width:210mm; height:297mm; background:var(--brand); color:#fff;
  padding:34mm 26mm; display:flex; flex-direction:column; page-break-after:always; overflow:hidden; }
.cover-word{ height:15mm; margin-bottom:24mm; position:relative; z-index:2; }
.cover-eyebrow{ font-size:11pt; font-weight:600; letter-spacing:.28em; text-transform:uppercase; color:#CFCDFF; position:relative; z-index:2; }
.cover-title{ font-size:40pt; font-weight:700; letter-spacing:-.02em; line-height:1.05; margin:6mm 0 0; position:relative; z-index:2; }
.cover-sub{ font-size:14pt; color:#E7E6FF; margin-top:7mm; max-width:150mm; line-height:1.4; position:relative; z-index:2; font-weight:500; }
.cover-meta{ margin-top:auto; position:relative; z-index:2; border-top:1px solid rgba(255,255,255,.25); padding-top:8mm; display:grid; grid-template-columns:repeat(2,auto); gap:5mm 24mm; }
.cover-meta div{ font-size:10.5pt; }
.cover-meta .k{ color:#BCB8FF; font-weight:600; letter-spacing:.08em; text-transform:uppercase; font-size:8.5pt; }
.cover-meta .v{ color:#fff; font-weight:500; margin-top:1mm; }
.cover-conf{ margin-top:10mm; font-size:9pt; letter-spacing:.2em; text-transform:uppercase; color:#CFCDFF; position:relative; z-index:2; }
.cover-glow{ position:absolute; width:340mm; height:340mm; right:-130mm; top:-120mm; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,.15) 0%, rgba(255,255,255,0) 60%); z-index:1; }

/* content wrapper */
.doc{ }
.doc > :first-child{ margin-top:0; }

/* headings */
h2{ font-size:17pt; font-weight:700; color:var(--ink); letter-spacing:-.02em; line-height:1.15;
  page-break-before:always; padding-bottom:3mm; margin:0 0 5mm; border-bottom:2px solid var(--brand); }
h2:first-of-type{ page-break-before:avoid; }
h3{ font-size:12.5pt; font-weight:700; color:var(--brand); letter-spacing:-.01em; margin:7mm 0 2mm; }
h4{ font-size:10.5pt; font-weight:700; color:var(--ink); margin:5mm 0 1mm; }
h2,h3,h4{ page-break-after:avoid; }

p{ margin:0 0 3mm; }
strong{ color:var(--ink); font-weight:700; }
em{ color:var(--text); }
a{ color:var(--brand); text-decoration:none; }
hr{ border:none; border-top:1px solid var(--border); margin:6mm 0; }

ul,ol{ margin:0 0 3mm; padding-left:6mm; }
li{ margin-bottom:1.5mm; }
li::marker{ color:var(--brand); }

/* inline code */
code{ font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace; font-size:8.5pt;
  background:var(--bg-soft); border:1px solid var(--border); border-radius:4px; padding:.5px 4px; color:#3A0CA3; }
pre{ background:var(--bg-soft); border:1px solid var(--border); border-radius:8px; padding:4mm; overflow:auto; }
pre code{ border:none; background:none; padding:0; color:var(--text); }

/* blockquote -> brand callout */
blockquote{ margin:4mm 0; padding:3mm 5mm; background:var(--tint-soft); border:1px solid var(--border);
  border-left:3px solid var(--brand); border-radius:0 10px 10px 0; color:var(--text); page-break-inside:avoid; }
blockquote p{ margin:0 0 2mm; } blockquote p:last-child{ margin:0; }
blockquote strong{ color:var(--brand-hover); }

/* tables */
table{ width:100%; border-collapse:collapse; margin:3mm 0 5mm; font-size:8.3pt; line-height:1.4;
  page-break-inside:avoid; border:1px solid var(--border); }
thead th{ background:var(--tint); color:var(--ink); font-weight:700; text-align:left;
  padding:2mm 2.5mm; border-bottom:1.5px solid var(--brand); vertical-align:bottom; }
td{ padding:1.8mm 2.5mm; border-top:1px solid var(--border); color:var(--text); vertical-align:top; }
td code{ font-size:7.6pt; }
tbody tr:nth-child(even){ background:var(--bg-soft); }
table strong{ color:var(--ink); }
`;

const COVER = `
<section class="cover">
  <div class="cover-glow"></div>
  <img class="cover-word" src="${WORD_MINT}" alt="Paypoint"/>
  <div class="cover-eyebrow">Product Requirements Document</div>
  <div class="cover-title">Paypoint</div>
  <div class="cover-sub">MVP &amp; Near-Term (6–12 month) Roadmap — commerce infrastructure for Africa's social sellers.</div>
  <div class="cover-meta">
    <div><div class="k">Version</div><div class="v">2.0 — Final (ready for sign-off)</div></div>
    <div><div class="k">Last updated</div><div class="v">16 June 2026</div></div>
    <div><div class="k">Author</div><div class="v">Newman Haruna</div></div>
    <div><div class="k">Stakeholders</div><div class="v">Yvonne Joseph</div></div>
  </div>
  <div class="cover-conf">Confidential</div>
</section>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<title>Paypoint — Product Requirements Document</title>
<style>${FONT_FACES}</style>
<style>${CSS}</style></head>
<body>${COVER}<div class="doc">${bodyHtml}</div></body></html>`;

fs.writeFileSync(path.join(DOCS, 'PRD-Paypoint.html'), html);
console.log('Wrote PRD-Paypoint.html (' + Math.round(html.length / 1024) + ' KB)');
