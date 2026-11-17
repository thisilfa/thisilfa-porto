import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const require = createRequire('/home/akbarwijaya/.npm/_npx/e41f203b7505f1fb/node_modules/');
const { chromium } = require('playwright');
const origin = 'http://127.0.0.1:4181';
const base = '/thisilfa-porto';
const root = join(new URL('../../..', import.meta.url).pathname, 'dist');
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', origin);
    const relative = decodeURIComponent(url.pathname).replace(new RegExp(`^${base}`), '') || '/';
    let file = join(root, relative);
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    response.writeHead(200, { 'content-type': mime[extname(file)] ?? 'application/octet-stream' });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end('Not found');
  }
});

await new Promise((resolve) => server.listen(4181, '127.0.0.1', resolve));

const routes = ['/', '/id/', '/projects/sims/', '/id/projects/sims/'];
const sizes = [[1440, 900], [768, 1024], [390, 844]];
const results = [];
let browser;

try {
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] });
  for (const route of routes) {
    for (const [width, height] of sizes) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const broken = [];
      const consoleErrors = [];
      page.on('response', (response) => { if (response.status() >= 400) broken.push(`${response.status()} ${response.url()}`); });
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      await page.goto(`${origin}${base}${route}`, { waitUntil: 'networkidle' });
      await page.keyboard.press('Tab');
      const checks = await page.evaluate(() => {
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        };
        const undersized = [...document.querySelectorAll('a, button')]
          .filter(visible)
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { label: element.textContent.trim().replace(/\s+/g, ' ').slice(0, 48), width: Math.round(rect.width), height: Math.round(rect.height) };
          })
          .filter(({ width, height }) => width < 44 || height < 44);
        const architecture = document.querySelector('[data-diagram] .phase-grid');
        const animationDurations = [...document.querySelectorAll('*')]
          .map((element) => parseFloat(getComputedStyle(element).animationDuration) || 0);
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          undersized,
          focused: document.activeElement?.tagName === 'A' || document.activeElement?.tagName === 'BUTTON',
          focusOutline: getComputedStyle(document.activeElement).outlineStyle,
          diagramColumns: architecture ? getComputedStyle(architecture).gridTemplateColumns.split(' ').length : null,
          maxAnimationSeconds: Math.max(0, ...animationDurations),
        };
      });
      results.push({ route, width, height, ...checks, broken, consoleErrors });
      await page.close();
    }
  }
} finally {
  await browser?.close();
  server.close();
}

const failures = results.flatMap((result) => {
  const failures = [];
  if (result.overflow) failures.push('horizontal overflow');
  if (result.undersized.length) failures.push(`${result.undersized.length} undersized controls`);
  if (!result.focused || result.focusOutline === 'none') failures.push('keyboard focus not visible');
  if (result.broken.length) failures.push(`${result.broken.length} broken requests`);
  if (result.consoleErrors.length) failures.push(`${result.consoleErrors.length} console errors`);
  if (result.width === 390 && result.diagramColumns && result.diagramColumns !== 1) failures.push('mobile diagram did not reflow');
  if (result.maxAnimationSeconds > 0.01) failures.push('reduced motion not honored');
  return failures.map((failure) => ({ route: result.route, width: result.width, failure }));
});

console.log(JSON.stringify({ results, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
