/**
 * Driver for jaramillolandscaping static site.
 * Usage: node .claude/skills/run-jaramillolandscaping/driver.mjs [command] [args]
 *
 * Commands:
 *   screenshot <url-path> <out.png>   — screenshot one page (full-height)
 *   smoke [out-dir]                   — screenshot key pages + verify titles
 *   serve                             — start HTTP server only (port 3456)
 *
 * Run from project root (c:/jaramillolandscaping).
 */

import { chromium }                        from 'playwright';
import { createServer }                     from 'http';
import { readFileSync, mkdirSync }          from 'fs';
import { extname, join, dirname, resolve }  from 'path';
import { fileURLToPath }                    from 'url';

const ROOT = process.cwd();   // must be project root
const PORT = 3456;
const MIME = {
  html: 'text/html', css: 'text/css', js: 'application/javascript',
  png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', ico: 'image/x-icon',
};

// ── HTTP server ──────────────────────────────────────────────────────────────

function startServer() {
  return new Promise((res) => {
    const srv = createServer((req, reply) => {
      // strip query string; normalise leading slash
      const urlPath  = req.url.split('?')[0];
      const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
      const filePath = join(ROOT, relative);
      try {
        const data = readFileSync(filePath);
        const ext  = extname(filePath).slice(1).toLowerCase();
        reply.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
        reply.end(data);
      } catch {
        reply.writeHead(404); reply.end('Not found');
      }
    });
    srv.listen(PORT, () => res(srv));
  });
}

async function serverRunning() {
  const { default: http } = await import('http');
  return new Promise((res) => {
    const req = http.get(`http://localhost:${PORT}/`, (r) => { r.destroy(); res(true); });
    req.on('error', () => res(false));
    req.setTimeout(500, () => { req.destroy(); res(false); });
  });
}

// ── Browser helpers ──────────────────────────────────────────────────────────

async function withBrowser(fn) {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  try { return await fn(browser); }
  finally { await browser.close(); }
}

async function shot(page, urlPath, outPath, viewport = { width: 1280, height: 900 }) {
  await page.setViewportSize(viewport);
  await page.goto(`http://localhost:${PORT}${urlPath}`, { waitUntil: 'networkidle' });
  mkdirSync(dirname(resolve(outPath)), { recursive: true });
  await page.screenshot({ path: outPath, fullPage: true });
  return page.title();
}

// ── Commands ─────────────────────────────────────────────────────────────────

const [,, cmd = 'smoke', ...rest] = process.argv;

let srv;
if (cmd !== 'serve' && !(await serverRunning())) {
  srv = await startServer();
  console.error(`[driver] HTTP server started on :${PORT}`);
}

if (cmd === 'serve') {
  srv = await startServer();
  console.log(`[driver] Serving ${ROOT} on http://localhost:${PORT} — Ctrl-C to stop`);
  process.on('SIGINT', () => { srv.close(); process.exit(0); });

} else if (cmd === 'screenshot') {
  const [urlPath = '/', outPath = 'screenshot.png'] = rest;
  await withBrowser(async (browser) => {
    const page  = await browser.newPage();
    const title = await shot(page, urlPath, outPath);
    console.log(`Saved: ${outPath}  ("${title}")`);
  });
  srv?.close();

} else if (cmd === 'smoke') {
  const outDir = rest[0] || '.claude/skills/run-jaramillolandscaping/screenshots';
  const pages  = [
    ['/', 'home'],
    ['/services.html',      'services'],
    ['/free-estimate.html', 'free-estimate'],
    ['/contact.html',       'contact'],
    ['/reviews.html',       'reviews'],
    ['/gallery.html',       'gallery'],
    ['/faq.html',           'faq'],
    ['/about.html',         'about'],
    ['/drainage.html',      'drainage'],
  ];
  let ok = 0;
  await withBrowser(async (browser) => {
    const page = await browser.newPage();
    for (const [urlPath, name] of pages) {
      const title = await shot(page, urlPath, `${outDir}/${name}.png`);
      console.log(`  ✓ ${name.padEnd(16)} "${title}"`);
      ok++;
    }
    // mobile menu open
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await page.click('#hamburger');
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${outDir}/home-mobile-menu.png` });
    console.log(`  ✓ home-mobile-menu`);
  });
  console.log(`\n✓ Smoke passed (${ok} pages) — screenshots in ${outDir}/`);
  srv?.close();

} else {
  console.error(`Unknown command: ${cmd}. Use: screenshot | smoke | serve`);
  srv?.close();
  process.exit(1);
}
