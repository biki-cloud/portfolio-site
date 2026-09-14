import test from 'node:test';
import assert from 'node:assert/strict';
import { glob } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('template provides a neutral static-site starter', async () => {
  const page = await source('src/pages/index.astro');
  const config = await source('src/config.ts');
  const layout = await source('src/layouts/Layout.astro');

  assert.match(config, /siteName:\s*['"]Your Site['"]/);
  assert.match(page, /siteConfig\.siteName/);
  assert.match(layout, /lang="ja"/);
});

test('template is deployable as a static Cloudflare Pages site', async () => {
  const packageJson = JSON.parse(await source('package.json'));
  const astroConfig = await source('astro.config.mjs');

  assert.equal(packageJson.scripts.build, 'astro build');
  assert.equal(packageJson.scripts.test, 'node --test');
  assert.match(astroConfig, /output:\s*['"]static['"]/);
  assert.match(astroConfig, /@astrojs\/sitemap/);
});

test('template contains no customer-specific CMS or personal content', async () => {
  const sourceFiles = await Array.fromAsync(glob('src/**/*.{astro,css,js,ts,json,md,mjs}', {
    cwd: new URL('../', import.meta.url),
    exclude: ['node_modules/**', 'dist/**', '.astro/**'],
  }));
  const files = [...sourceFiles, 'README.md', 'astro.config.mjs', 'package.json'];
  const contents = await Promise.all(files.map((file) => source(file)));
  const combined = contents.join('\n');

  assert.doesNotMatch(combined, /microcms/i);
  assert.doesNotMatch(combined, /森塚|Dodo Works|外構屋/);
});
