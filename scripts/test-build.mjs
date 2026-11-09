// Build-output smoke checks, run after `astro build` (npm run test:build).
// Grows with the site: U6 adds sitemap/hreflang checks, U5 adds nav assertions,
// U8 adds the education-content ban.
import { access, readFile } from 'node:fs/promises';

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

console.log('test:build — ok');
