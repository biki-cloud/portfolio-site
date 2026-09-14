# portfolio-cloudflare-pages-template

Astro + Tailwind CSS v4 + Cloudflare Pagesで静的サイトを始めるための、個人・顧客サイト向けスターターテンプレートです。

このリポジトリはGitHub Template repositoryとして利用します。ページのUI/UX、文章、配色、コンポーネント構成は、作成するサイトごとに自由に実装してください。

## 含まれるもの

- Astroの静的ビルド
- Tailwind CSS v4のVite統合
- Cloudflare Pages向けの設定
- sitemap生成
- 404ページ
- 最小限のレスポンシブスターターUI
- Node.js標準テストによるテンプレート契約テスト

## 含まないもの

- CMS
- 顧客固有の文章・画像・ドメイン
- 問い合わせフォームの送信先
- 業種固有のUI/UX

## 使い方

GitHubの「Use this template」から新しいリポジトリを作成し、`src/config.ts` と `astro.config.mjs` のサイト情報を変更してください。

```sh
npm install
npm run dev
```

## 検証

```sh
npm test
npm run build
```

## Cloudflare Pages設定

- Build command: `npm run build`
- Output directory: `dist`
