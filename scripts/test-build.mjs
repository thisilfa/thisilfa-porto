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

console.log('test:build — ok');
