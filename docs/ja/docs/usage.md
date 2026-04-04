# 利用方法 {#usage}

ここでは TanStack Head Controller を実運用で使うための代表的なパターンを紹介します。

## 基本構成

1. ルーター context にコントローラー（例: `headCtrlr`）を配置する
2. ルートごとに head を返す
3. ルートドキュメントの head で描画コンポーネント（`HeadControllerRender`）を配置する

## プラグインを組み合わせる

```tsx
import { createHeadController } from 'tanstack-head-controller'
import { thcMerge } from 'thc-plugin-merge'
import { thcTitleTemplate } from 'thc-plugin-ttplate'

export const thc = createHeadController({
  plugins: [
    thcMerge(),
    thcTitleTemplate({
      siteName: 'TanStack Starter',
      separator: ' | ',
    }),
  ],
})
```

## ルート context を編集する

補助関数（`editContext`）を使うと、既存 context を保ったまま設定をマージできます。

```tsx [about.tsx]
import { editContext } from 'tanstack-head-controller/context'

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
import { createThcPlugin } from 'tanstack-head-controller/plugins'

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
