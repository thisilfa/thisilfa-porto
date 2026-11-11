// Build-output smoke checks, run after `astro build` (npm run test:build).
// Grows with the site: U6 adds sitemap/hreflang checks, U5 adds nav assertions,
// U8 adds the education-content ban.
import { access, readdir, readFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const index = new URL('index.html', dist);
if (!(await exists(index))) {
  console.error('test:build — dist/index.html missing; did `astro build` run?');
  process.exit(1);
}

// The sitemap is the canonical base-bearing artifact: every URL it emits must
// carry the project-site base, or nothing on GitHub Pages will resolve.
const sitemap = new URL('sitemap-0.xml', dist);
if (!(await exists(sitemap))) {
  console.error('test:build — dist/sitemap-0.xml missing; is the sitemap integration configured?');
  process.exit(1);
}

const xml = await readFile(sitemap, 'utf8');
if (!xml.includes('https://thisilfa.github.io/thisilfa-porto')) {
  console.error('test:build — sitemap URLs do not carry the /thisilfa-porto base');
  process.exit(1);
}
for (const marker of ['hreflang="en-US"', 'hreflang="id-ID"', 'hreflang="x-default"']) {
  if (!xml.includes(marker)) {
    console.error(`test:build — sitemap is missing ${marker} alternates`);
    process.exit(1);
  }
}

// AE2: every locale's home page renders exactly five nav entries, and no
// nav entry ever points at Personal Lab or Engineering Journal.
const homePages = ['index.html', 'id/index.html'];
for (const page of homePages) {
  const url = new URL(page, dist);
  if (!(await exists(url))) continue; // locale pages appear from U6 onward
  const html = await readFile(url, 'utf8');
  const desktopNav = html.match(/<nav class="desktop-nav[^"]*"[^>]*>([\s\S]*?)<\/nav>/);
  if (!desktopNav) {
    console.error(`test:build — ${page}: desktop nav not found`);
    process.exit(1);
  }
  const entries = (desktopNav[1].match(/<a /g) ?? []).length;
  if (entries !== 5) {
    console.error(`test:build — ${page}: expected 5 nav entries, found ${entries}`);
    process.exit(1);
  }
  if (/lab|journal/i.test(desktopNav[1])) {
    console.error(`test:build — ${page}: deferred section leaked into the nav`);
    process.exit(1);
  }

  // The switcher's current locale is a label, not a self-link (plan U6).
  const switcher = html.match(/<div class="switcher[^"]*"[^>]*>([\s\S]*?)<\/div>/);
  if (!switcher) {
    console.error(`test:build — ${page}: language switcher not found`);
    process.exit(1);
  }
  const switcherLinks = (switcher[1].match(/<a /g) ?? []).length;
  if (switcherLinks !== 1 || !switcher[1].includes('aria-current="true"')) {
    console.error(
      `test:build — ${page}: switcher must have exactly one destination link and one aria-current label`,
    );
    process.exit(1);
  }

  // The hreflang cluster: en-US, id-ID, self-referencing, x-default.
  for (const marker of [
    'hreflang="en-US"',
    'hreflang="id-ID"',
    'hreflang="x-default"',
    'rel="canonical"',
  ]) {
    if (!html.includes(marker)) {
      console.error(`test:build — ${page}: SEO head is missing ${marker}`);
      process.exit(1);
    }
  }
}

// The 404 serves both locales from one page, with base-prefixed home links.
const notFound = new URL('404.html', dist);
if (!(await exists(notFound))) {
  console.error('test:build — dist/404.html missing');
  process.exit(1);
}
const nf = await readFile(notFound, 'utf8');
for (const marker of [
  'href="/thisilfa-porto/"',
  'href="/thisilfa-porto/id/"',
  'Page not found',
  'Halaman tidak ditemukan',
]) {
  if (!nf.includes(marker)) {
    console.error(`test:build — 404.html is missing: ${marker}`);
    process.exit(1);
  }
}

// AE3, site-wide: education content lives only in the downloadable PDF.
// Scan every built HTML file for education terms.
const educationTerms =
  /universit|bachelor|master of|b\.?sc|m\.?sc|gelar|sarjana|\bIPK\b|\bGPA\b|coursework|transcript|thesis|skripsi/i;
async function* htmlFiles(dir) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const child = new URL(name.name + (name.isDirectory() ? '/' : ''), dir);
    if (name.isDirectory()) yield* htmlFiles(child);
    else if (name.name.endsWith('.html')) yield child;
  }
}
for await (const file of htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  if (educationTerms.test(html)) {
    console.error(`test:build — education term found in ${file.pathname.split('/dist/')[1]} (AE3)`);
    process.exit(1);
  }
}

// U8: home sections and hero CTA targets, both locales.
const homes = [
  {
    file: 'index.html',
    markers: [
      'Building intelligent systems through practical engineering',
      'Featured Projects',
      'Technical Expertise',
      'Professional Journey',
      'href="/thisilfa-porto/projects/"',
      'href="/thisilfa-porto/contact/"',
      'href="/thisilfa-porto/downloads/silfaradila-mei-resume-en.pdf"',
    ],
  },
  {
    file: 'id/index.html',
    markers: [
      'Membangun sistem cerdas melalui rekayasa yang praktis',
      'Proyek Unggulan',
      'Keahlian Teknis',
      'Perjalanan Profesional',
      'href="/thisilfa-porto/id/projects/"',
      'href="/thisilfa-porto/id/contact/"',
      'href="/thisilfa-porto/downloads/silfaradila-mei-resume-en.pdf"',
    ],
  },
];
for (const home of homes) {
  const url = new URL(home.file, dist);
  if (!(await exists(url))) {
    console.error(`test:build — dist/${home.file} missing`);
    process.exit(1);
  }
  const html = await readFile(url, 'utf8');
  for (const marker of home.markers) {
    if (!html.includes(marker)) {
      console.error(`test:build — ${home.file} is missing: ${marker}`);
      process.exit(1);
    }
  }
}

// U8: contact pages carry the real details (origin R10), both locales.
for (const contactFile of ['contact.html', 'id/contact.html']) {
  const url = new URL(contactFile.replace(/\.html$/, '/index.html'), dist);
  if (!(await exists(url))) {
    console.error(`test:build — dist/${contactFile} missing`);
    process.exit(1);
  }
  const html = await readFile(url, 'utf8');
  for (const marker of [
    'silfaradilamei@gmail.com',
    'linkedin.com/in/silfaradila',
    'github.com/thisilfa',
    'Yogyakarta, Indonesia',
  ]) {
    if (!html.includes(marker)) {
      console.error(`test:build — ${contactFile} is missing: ${marker}`);
      process.exit(1);
    }
  }
}

// U9: three case studies in both locales, each with its disclosure note and
// the honesty labels; CSSD never claims production readiness (R11).
const caseStudies = ['sims', 'cssd-instrument-id', 'prophesy-ai-prime'];
for (const slug of caseStudies) {
  for (const prefix of ['projects/', 'id/projects/']) {
    const url = new URL(`${prefix}${slug}/index.html`, dist);
    if (!(await exists(url))) {
      // Diagnostics for a transient build race: show what actually emitted
      // next to the missing page before failing.
      console.error(`test:build — case study missing: dist/${prefix}${slug}/index.html`);
      try {
        const siblings = await readdir(new URL(prefix, dist), { recursive: true });
        console.error(
          `test:build — dist/${prefix} contains: ${siblings.join(', ') || '(nothing)'}`,
        );
      } catch {
        console.error(`test:build — dist/${prefix} does not exist at all`);
      }
      process.exit(1);
    }
    const html = await readFile(url, 'utf8');
    const disclosureInEntry = /excluded|not included|tidak dicantumkan/i.test(html);
    if (!disclosureInEntry) {
      console.error(`test:build — ${prefix}${slug} has no disclosure note`);
      process.exit(1);
    }
    if (!html.includes('Partially Redacted') && !html.includes('Sebagian Disunting')) {
      console.error(`test:build — ${prefix}${slug} is missing its honesty labels`);
      process.exit(1);
    }
  }
}
const cssd = {
  en: await readFile(new URL('projects/cssd-instrument-id/index.html', dist), 'utf8'),
  id: await readFile(new URL('id/projects/cssd-instrument-id/index.html', dist), 'utf8'),
};
for (const [locale, html] of Object.entries(cssd)) {
  if (/production[- ]ready|production ready|siap produksi|siap untuk produksi/i.test(html)) {
    console.error(`test:build — CSSD (${locale}) claims production readiness (R11)`);
    process.exit(1);
  }
}

// U10: the full professional census — nine entries per listing locale, every
// card with a disclosure note, compact entries with no detail pages, and the
// AI Agent entry honest about being research (AE4).
for (const listing of ['projects/index.html', 'id/projects/index.html']) {
  const html = await readFile(new URL(listing, dist), 'utf8');
  const cards = (html.match(/<article class="card/g) ?? []).length;
  if (cards !== 9) {
    console.error(`test:build — ${listing}: expected 9 project cards, found ${cards}`);
    process.exit(1);
  }
  const disclosures = (html.match(/class="disclosure"/g) ?? []).length;
  if (disclosures !== 9) {
    console.error(`test:build — ${listing}: expected 9 disclosure notes, found ${disclosures}`);
    process.exit(1);
  }

  // Review regression gate (owner review, 2026-11-11): every link inside any
  // card on the ID listing points into /id/ — compact cards (no case-study
  // page) carry no link at all.
  if (listing.startsWith('id/')) {
    const cardFragments = html
      .split('<article class="card')
      .slice(1)
      .map((f) => f.split('</article>')[0]);
    for (const fragment of cardFragments) {
      const hrefs = [...fragment.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
      const bad = hrefs.filter((href) => !href.startsWith('/thisilfa-porto/id/'));
      if (bad.length > 0) {
        console.error(`test:build — ${listing}: card links outside /id/: ${bad.join(', ')}`);
        process.exit(1);
      }
    }
  }
}

for (const compact of [
  'clinical-lab-scheduling',
  'workguard',
  'face-attendance',
  'cbir-tokoquick',
  'yolov5-counting',
  'ai-agent-research',
]) {
  for (const prefix of ['projects/', 'id/projects/']) {
    if (await exists(new URL(`${prefix}${compact}/index.html`, dist))) {
      console.error(
        `test:build — compact entry has a detail page: ${prefix}${compact} (only case studies do)`,
      );
      process.exit(1);
    }
  }
}

// The AI Agent card, scoped to its own fragment (a lazy match from the first
// card would capture all nine and trip on other cards' legitimate words).
const agentCard = {};
for (const [locale, file, title] of [
  ['en', 'projects/index.html', 'Internal AI Agent for Task Manager'],
  ['id', 'id/projects/index.html', 'AI Agent Internal untuk Task Manager'],
]) {
  const html = await readFile(new URL(file, dist), 'utf8');
  agentCard[locale] =
    html
      .split('<article class="card')
      .slice(1)
      .map((f) => f.split('</article>')[0])
      .find((f) => f.includes(title)) ?? '';
}
for (const [locale, block] of Object.entries(agentCard)) {
  if (!block) {
    console.error(`test:build — AI Agent card not found on the ${locale} listing`);
    process.exit(1);
  }
  if (!/Research|Penelitian/.test(block)) {
    console.error(`test:build — AI Agent card (${locale}) lacks the research status label (AE4)`);
    process.exit(1);
  }
  if (
    /\bbuilt\b|\bdeployed\b|\bshipped\b|\bdelivered\b|terdeploy|dibangun dan dikirim/i.test(block)
  ) {
    console.error(`test:build — AI Agent card (${locale}) makes a delivery claim (AE4)`);
    process.exit(1);
  }
}

// U11: resume pages and the downloadable PDF. The PDF is committed and served
// verbatim from public/ — its presence in dist is the download link's truth.
const pdf = new URL('downloads/silfaradila-mei-resume-en.pdf', dist);
if (!(await exists(pdf))) {
  console.error('test:build — dist/downloads/silfaradila-mei-resume-en.pdf missing');
  process.exit(1);
}
const PDF_HREF = 'href="/thisilfa-porto/downloads/silfaradila-mei-resume-en.pdf"';
for (const [resumeFile, extra] of [
  ['resume/index.html', []],
  ['id/resume/index.html', ['Resume saat ini tersedia dalam bahasa Inggris']],
]) {
  const url = new URL(resumeFile, dist);
  if (!(await exists(url))) {
    console.error(`test:build — dist/${resumeFile} missing`);
    process.exit(1);
  }
  const html = await readFile(url, 'utf8');
  for (const marker of [PDF_HREF, 'Biologic Technik', 'Quick Tractor', ...extra]) {
    if (!html.includes(marker)) {
      console.error(`test:build — ${resumeFile} is missing: ${marker}`);
      process.exit(1);
    }
  }
}

// U5 (depth plan): the SIMS gold standard — contribution groups, the diagram,
// and the owner-decided metric sentence in exactly one of its two legal
// states (defined claim or qualitative, never a bare figure).
const METRIC_SENTENCES = [
  'Peak average daily item-counting correctness of 98.6% in October',
  'Akurasi penghitungan harian rata-rata puncak sebesar 98,6% pada Oktober',
];
const metricState = (html) => {
  const hasSentence = METRIC_SENTENCES.some((s) => html.includes(s));
  const hasFigure = /98[.,]6\s*%/.test(html);
  if (hasSentence) return 'defined';
  if (!hasFigure) return 'qualitative';
  return 'ILLEGAL'; // figure without its definition — R4 violation
};
for (const prefix of ['projects/sims/', 'id/projects/sims/']) {
  const url = new URL(`${prefix}index.html`, dist);
  if (!(await exists(url))) {
    console.error(`test:build — SIMS page missing: dist/${prefix}index.html`);
    process.exit(1);
  }
  const html = await readFile(url, 'utf8');

  // Contribution section: audit groups present, unattributed as the muted
  // single line, and no unattributed component claimed as implemented.
  const contribution = html.match(/<section class="contribution"[\s\S]*?<\/section>/)?.[0] ?? '';
  if (!contribution) {
    console.error(`test:build — ${prefix}: contribution section missing`);
    process.exit(1);
  }
  const groupLabels = prefix.startsWith('id/')
    ? // HTML escapes ampersands, so these match the unescaped fragments.
      ['Saya mengimplementasikan', 'Saya berkontribusi dalam', 'Tidak teratribusi individual']
    : ['I implemented', 'I contributed to', 'Designed', 'Not individually attributed'];
  for (const label of groupLabels) {
    if (!contribution.includes(label)) {
      console.error(`test:build — ${prefix}: contribution group missing: ${label}`);
      process.exit(1);
    }
  }
  // Each rendered group block must not claim unattributed components; the
  // muted unattributed line is exempt (that is its purpose).
  const groupBlocks = contribution.match(/<div class="group">[\s\S]*?<\/div>/g) ?? [];
  if (
    groupBlocks.some((block) => /camera setup|image acquisition|frontend|dashboard/i.test(block))
  ) {
    console.error(
      `test:build — ${prefix}: unattributed component rendered as an implemented/contributed bullet`,
    );
    process.exit(1);
  }

  // The diagram: inline SVG with role=img and the localized legend.
  if (!/<svg[^>]*role="img"/.test(html)) {
    console.error(`test:build — ${prefix}: the architecture diagram (role="img" SVG) is missing`);
    process.exit(1);
  }
  const legendStrings = prefix.startsWith('id/')
    ? ['Diimplementasikan', 'Konteks — tidak teratribusi individual']
    : ['Implemented', 'Context — not individually attributed'];
  const legendOk = legendStrings.every((s) => html.includes(s));
  if (!legendOk) {
    console.error(`test:build — ${prefix}: the diagram legend is missing or untranslated`);
    process.exit(1);
  }

  // The metric: exactly one legal state (R4).
  const state = metricState(html);
  if (state === 'ILLEGAL') {
    console.error(
      `test:build — ${prefix}: metric figure appears without its decided definition (R4)`,
    );
    process.exit(1);
  }
  if (
    /model accuracy|model accuracy figure|akurasi model|shelf-level/i.test(html) &&
    !/not a model accuracy/i.test(html)
  ) {
    console.error(
      `test:build — ${prefix}: metric mislabeled as model or shelf-level accuracy (R4)`,
    );
    process.exit(1);
  }
}

// U5: grouped listings — 8 professional + 1 research, with the research group
// heading present and the listing copy covering both groups.
for (const listing of ['projects/index.html', 'id/projects/index.html']) {
  const html = await readFile(new URL(listing, dist), 'utf8');
  // Astro injects data-astro-cid attributes on styled elements — match the
  // heading text regardless of the attribute noise; ampersands arrive escaped.
  const professionalGroup = html.match(
    /<h2[^>]*>(Professional Experience|Pengalaman Profesional)<\/h2>/,
  );
  const researchGroup = html.match(
    /<h2[^>]*>(Research &amp; Experiments|Riset &amp; Eksperimen)<\/h2>/,
  );
  if (!professionalGroup || !researchGroup) {
    console.error(`test:build — ${listing}: group headings missing`);
    process.exit(1);
  }
  const professionalBlock = html.slice(
    html.indexOf(professionalGroup[0]),
    html.indexOf(researchGroup[0]),
  );
  const professionalCount = (professionalBlock.match(/<article class="card/g) ?? []).length;
  const researchBlock = html.slice(html.indexOf(researchGroup[0]));
  const researchCount = (researchBlock.match(/<article class="card/g) ?? []).length;
  if (professionalCount !== 8 || researchCount !== 1) {
    console.error(
      `test:build — ${listing}: expected 8 professional + 1 research cards, found ${professionalCount} + ${researchCount}`,
    );
    process.exit(1);
  }
}

// U5: employment periods — verbatim on the seven attributed entries' cards
// and on the three Biologic case-study headers; absent on the two
// unattributed entries.
const periodChecks = [
  {
    file: 'projects/index.html',
    mustHave: ['July 2025 – Present', 'Jun 2024 – Jun 2025', 'Jun 2023 – Jun 2024'],
    mustNotHave: [],
  },
  {
    file: 'id/projects/index.html',
    mustHave: ['Juli 2025 – sekarang', 'Juni 2024 – Juni 2025', 'Juni 2023 – Juni 2024'],
    mustNotHave: [],
  },
  { file: 'projects/sims/index.html', mustHave: ['July 2025 – Present'], mustNotHave: [] },
  {
    file: 'projects/clinical-lab-scheduling/index.html',
    mustNotHave: ['July 2025', 'Jun 2024', 'Jun 2023'],
  },
  {
    file: 'id/projects/clinical-lab-scheduling/index.html',
    mustNotHave: ['Juli 2025', 'Juni 2024', 'Juni 2023'],
  },
];
for (const check of periodChecks) {
  const url = new URL(check.file, dist);
  if (!(await exists(url))) continue; // case-study pages asserted in the U9 loop
  const html = await readFile(url, 'utf8');
  for (const marker of check.mustHave) {
    if (!html.includes(marker)) {
      console.error(`test:build — ${check.file} is missing period: ${marker}`);
      process.exit(1);
    }
  }
  for (const marker of check.mustNotHave) {
    if (html.includes(marker)) {
      console.error(`test:build — ${check.file} must not carry period: ${marker}`);
      process.exit(1);
    }
  }
}

console.log('test:build — ok');
