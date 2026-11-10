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

console.log('test:build — ok');
