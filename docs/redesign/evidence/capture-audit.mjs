import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const require = createRequire('/home/akbarwijaya/.npm/_npx/e41f203b7505f1fb/node_modules/');
const { chromium } = require('playwright');

const origin = 'http://127.0.0.1:4180';
const base = '/thisilfa-porto';
const root = join(new URL('../../..', import.meta.url).pathname, 'dist');
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
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
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': mime[extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});
await new Promise((resolve) => server.listen(4180, '127.0.0.1', resolve));

const captures = [
  ['home-en', '/', 1440, 900],
  ['home-en', '/', 768, 1024],
  ['home-en', '/', 390, 844],
  ['sims-en', '/projects/sims/', 1440, 900],
  ['sims-en', '/projects/sims/', 768, 1024],
  ['sims-en', '/projects/sims/', 390, 844],
  ['home-id', '/id/', 1440, 900],
  ['home-id', '/id/', 768, 1024],
  ['home-id', '/id/', 390, 844],
  ['sims-id', '/id/projects/sims/', 1440, 900],
  ['sims-id', '/id/projects/sims/', 768, 1024],
  ['sims-id', '/id/projects/sims/', 390, 844],
];

let browser;
try {
  browser = await chromium.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox'],
  });
  for (const [name, route, width, height] of captures) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(`${origin}${base}${route}`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.screenshot({
      path: `docs/redesign/evidence/phase1/${name}-${width}.png`,
      fullPage: true,
    });
    await page.close();
    process.stdout.write(`captured ${name} at ${width}x${height}\n`);
  }
} finally {
  await browser?.close();
  server.close();
}
