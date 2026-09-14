import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const indexPage = await readFile(new URL('src/pages/index.astro', root), 'utf8');
const config = await readFile(new URL('src/config.ts', root), 'utf8');
const sourceFiles = await Array.fromAsync(glob('src/**/*.{astro,css,js,ts}', {
  cwd: root,
  exclude: ['node_modules/**', 'dist/**', '.astro/**'],
}));
const source = (await Promise.all(sourceFiles.map((file) => readFile(new URL(file, root), 'utf8')))).join('\n');

test('営業用LPに、対象者・提案・行動導線が揃っている', () => {
  for (const phrase of ['小さな事業', '無料デモ', '森塚 響', '30,000', '5,000', '月2回']) {
    assert.match(source, new RegExp(phrase));
  }

  for (const section of ['about', 'service', 'pricing', 'demo', 'flow', 'faq', 'contact']) {
    assert.match(source, new RegExp(`id=["']${section}["']`));
  }
});

test('更新代行の前提が伝わり、CMSに依存していない', () => {
  assert.match(source, /メール|LINE/);
  assert.match(source, /大幅な修正/);
  assert.doesNotMatch(source, /microCMS/i);
});

test('サイトの基本設定が今回のポートフォリオ向けになっている', () => {
  assert.match(config, /Dodo Works/);
  assert.match(config, /contactFormUrl/);
  assert.doesNotMatch(config, /Your Site/);
});
