# 利用方法 {#usage}

ここでは TanStack Head Controller を実運用で使うための代表的なパターンを紹介します。

## 基本構成

1. ルーター context にコントローラー（例: `thc`）を配置する
2. ルートごとに head を返す
3. ルートドキュメントの head で描画コンポーネント（`HeadController`）を配置する

## プラグインを組み合わせる

```tsx
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const thc = createHeadController({
  plugins: [
    thcMerge(),
  ],
})
```

Solid を使う場合は、描画ステップで `@thcjs/react` を `@thcjs/solid` に置き換えてください。

## ルート context を編集する

補助関数（`editContext`）を使うと、既存 context を保ったまま設定をマージできます。

```tsx [about.tsx]
import { editContext } from '@thcjs/core/context'

export const Route = createFileRoute('/about')({
  context: (ctx) =>
    editContext(ctx, {
      configs: {
        debug: true,
      },
    }),
})
```

## プラグインを自作する

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

## 実行順序の考え方

- プラグインは登録順に transform が呼ばれます
- 正規化系（merge）を先に、最終整形系（title template など）を後に置くと扱いやすくなります

## よくある運用

- 共通レイアウトで基本メタ情報を設定し、ページルートで上書き
- OG タグをプラグインで統一
- 環境別の robots 制御をプラグインで集中管理

続きは [クイックスタート](./getting-started) と [開発者向け情報](./development) を参照してください。
