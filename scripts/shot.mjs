// Screenshot harness: captures built-site pages at the three reference
// widths so design changes get visual QA, not just build checks.
//   node scripts/shot.mjs <route> <outfile> [width] [height]
// Requires `npm run build` (and optionally `npm run preview`) first —
// it serves dist/ itself via a tiny static handler.
import { createRequire } from 'node:module';

// Playwright lives outside the project's dependencies (a screenshot tool,
// not a site dependency) — resolve it from its install location.
const require = createRequire('/home/akbarwijaya/.npm/_npx/e41f203b7505f1fb/node_modules/');
const { chromium } = require('playwright');

const route = process.argv[2] ?? '/';
const out = process.argv[3] ?? '/tmp/shot.png';
const width = Number(process.argv[4] ?? 1440);
const height = Number(process.argv[5] ?? 900);

// `astro preview` serves dist/ as a managed daemon — start it if no server
// answers, poll until ready, then stop it when done.
import { spawnSync } from 'node:child_process';

async function reachable() {
  try {
    await fetch('http://localhost:4173/thisilfa-porto/');
    return true;
  } catch {
    return false;
  }
}

let started = false;
for (let attempt = 0; attempt < 20 && !(await reachable()); attempt++) {
  if (attempt === 0) {
    spawnSync('npx', ['astro', 'preview', '--port', '4173'], {
      cwd: new URL('..', import.meta.url).pathname,
      stdio: 'ignore',
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  started = true;
}
if (!(await reachable())) {
  console.error('shot — preview server never became reachable');
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium-browser',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(`http://localhost:4173/thisilfa-porto${route === '/' ? '/' : route}`, {
  waitUntil: 'networkidle',
});
await page.screenshot({ path: out, fullPage: true });
await browser.close();
if (started) spawnSync('npx', ['astro', 'preview', 'stop'], { stdio: 'ignore' });
console.log(`shot — ${route} @${width} → ${out}`);
