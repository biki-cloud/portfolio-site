# Dodo Works portfolio site

小さな事業向けのホームページ制作・運用サービス「Dodo Works」の営業用ポートフォリオです。

`portfolio-cloudflare-pages-template` を土台に、今回のサービス向けの文章・UI/UX・料金導線を独自実装しています。顧客サイト用のCMSはまだ導入せず、公開後の軽微な更新はメールやLINEで受け付ける前提です。

## 開発

```sh
npm install
npm run dev
```

## 検証

```sh
npm test
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Astro

サイト名・説明・公開URL・問い合わせフォームは `src/config.ts` で変更できます。
