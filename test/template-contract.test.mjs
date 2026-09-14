import test from 'node:test';
import assert from 'node:assert/strict';
import { glob } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('site provides the configured portfolio metadata', async () => {
  const page = await source('src/pages/index.astro');
  const config = await source('src/config.ts');
  const layout = await source('src/layouts/Layout.astro');

  assert.match(config, /siteName:\s*['"]Dodo Works['"]/);
  assert.match(config, /contactFormUrl/);
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

test('site contains no CMS dependency or starter placeholders', async () => {
  const sourceFiles = await Array.fromAsync(glob('src/**/*.{astro,css,js,ts,json,md,mjs}', {
    cwd: new URL('../', import.meta.url),
    exclude: ['node_modules/**', 'dist/**', '.astro/**'],
  }));
  const files = [...sourceFiles, 'README.md', 'astro.config.mjs', 'package.json'];
  const contents = await Promise.all(files.map((file) => source(file)));
  const combined = contents.join('\n');

  assert.doesNotMatch(combined, /microcms/i);
  assert.doesNotMatch(combined, /Your Site|Replace this starter UI|Start building/);
});
