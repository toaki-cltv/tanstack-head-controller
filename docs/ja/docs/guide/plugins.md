# プラグイン {#plugins}

このガイドでは、TanStack Head Controller のプラグイン設計、組み合わせ方、運用時の注意点を詳しく解説します。

## プラグインの役割

THC では、ルートが head の素データを定義し、プラグインが最終描画前に変換します。この分離により以下の利点があります。

- 責務分離: ルートは意図を記述し、ポリシーはプラグインに集約
- 再利用性: 同じ変換ロジックを複数ルートに適用
- 予測可能性: 登録順で挙動を追える

## データフロー

1. ルートマッチから `meta` / `links` / `styles` / `headScripts` を収集
2. THC が集約データを生成
3. プラグインを登録順に実行
4. アダプターの `HeadController` が最終 head を描画

## 公式 merge プラグインの利用

```tsx
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const thc = createHeadController({
  plugins: [thcMerge()],
})
```

`thc-plugin-merge` は、ネスト構造で発生しやすい重複メタの統合に有効です。

## カスタムプラグインの作成

```tsx
import { createThcPlugin } from '@thcjs/core/plugins'

export const forceNoIndex = () =>
  createThcPlugin({
    name: 'app.force-noindex',
    transform(head) {
      return {
        ...head,
        meta: [...(head.meta ?? []), { name: 'robots', content: 'noindex' }],
      }
    },
  })
```

## 本番運用での設計指針

- 1プラグイン1責務にする
- 破壊的変更を避け、不変データとして返す
- 非決定的処理（時刻や乱数）を render 経路に入れない
- フレームワーク依存を持ち込まない

## 組み合わせ順序

推奨順序:

1. 正規化（重複除去、merge、整形）
2. 補完（OG/Twitter の既定値付与など）
3. 最終整形（タイトル整形、最終上書き）

例:

```tsx
const plugins = [
  thcMerge(),
  seoDefaultsPlugin(),
  titleSuffixPlugin(' | MySite'),
]

export const thc = createHeadController({ plugins })
```

## 環境ごとの切り替え

```tsx
const plugins = [thcMerge()]

if (import.meta.env.DEV) {
  plugins.push(debugHeadPlugin())
}

export const thc = createHeadController({ plugins })
```

開発時のみデバッグプラグインを有効化し、本番挙動を固定しやすくします。

## テスト観点

- 入力 head に対して期待出力になるか
- ネストルートの競合で優先順位が崩れないか
- 同じ変換を繰り返しても壊れないか（冪等性）

## デバッグチェック

- router context に controller が入っているか
- プラグイン登録順が想定どおりか
- route head が事前に正しく収集されているか
- 配列を上書きしていないか（extend できているか）

続き: [アダプター](./adapters) と [高度な使い方](./advanced)
