# 高度な使い方 {#advanced}

このガイドでは、大規模アプリ・複数人開発で有効な設計パターンを扱います。

## route context の安全な合成

`editContext` を使うことで、既存 context を壊さずに THC 設定を追加できます。

```tsx
import { editContext } from '@thcjs/core/context'

export const Route = createFileRoute('/admin')({
  context: (ctx) =>
    editContext(ctx, {
      configs: { debug: true },
    }),
})
```

手動で context 全体を差し替えるより安全です。

## ルート階層の運用ルール

推奨分担:

- レイアウトルート: 共通デフォルト（charset, viewport, 共通OG）
- 機能ルート: セクション単位の上書き
- ページルート: 最終タイトルやページ固有メタ

この分割で責務が明確になり、レビューもしやすくなります。

## 環境別プラグイン戦略

```tsx
const plugins = [thcMerge()]

if (import.meta.env.DEV) {
  plugins.push(debugHeadPlugin())
}

if (import.meta.env.PROD) {
  plugins.push(strictSeoPlugin())
}

export const thc = createHeadController({ plugins })
```

開発時は観測性を高め、本番では厳密なポリシーを適用できます。

## SSR / Hydration 一貫性

安定運用のポイント:

- root head で `HeadController` を1回だけ描画
- route `head` の返り値を決定的にする
- 時刻や乱数など非決定値を render 時に使わない
- プラグインを純粋関数として維持する

Hydration mismatch の多くは非決定値が原因です。

## メタデータのガバナンス

チーム開発では責務を分離すると運用しやすくなります。

- プロダクト側: route ごとのページ意図を定義
- 基盤側: プラグインと共通SEOルールを維持
- CI: 必須メタの不足を検知

## 調査手順（トラブル時）

1. route match 順序を確認
2. プラグイン適用前の head を確認
3. プラグイン順序を確認
4. 最終描画結果を確認

必要に応じて DEV 専用デバッグプラグインで変換過程をログ化します。

## パフォーマンス観点

- 可能なら線形時間の変換にする
- 不要な deep clone を避ける
- 巨大プラグイン1つより小さいプラグインを分割
- 再利用できる共通メタを定数化

## 本番前チェック

- レイアウト共通メタが定義済み
- merge/正規化プラグインが有効
- 競合時の優先順位がテスト済み
- SSR/CSR 出力差分を確認済み
- デバッグプラグインが本番から除外済み

続き: [プラグイン](./plugins) と [アダプター](./adapters)
