# クイックスタート {#getting-started}

このページでは、TanStack Router アプリに TanStack Head Controller を導入する最短手順を示します。

## 1. パッケージをインストール

::: code-group

```sh [ni]
ni tanstack-head-controller thc-plugin-merge thc-plugin-ttplate
```

```sh [npm]
npm install tanstack-head-controller thc-plugin-merge thc-plugin-ttplate
```

```sh [pnpm]
pnpm add tanstack-head-controller thc-plugin-merge thc-plugin-ttplate
```

:::

## 2. ルーター作成時にコントローラーを context へ追加

```tsx [router.tsx]
import { createRouter } from '@tanstack/react-router'
import { createHeadController } from 'tanstack-head-controller'
import { thcMerge } from 'thc-plugin-merge'
import { thcTitleTemplate } from 'thc-plugin-ttplate'

export const router = createRouter({
  routeTree,
  context: {
    ...createHeadController({
      plugins: [
        thcMerge(),
        thcTitleTemplate({
          siteName: "My App"
        })
      ]
    })
  },
})
```

## 3. ルートドキュメントの head で描画

```tsx [__root.tsx]
import { HeadControllerRender } from 'tanstack-head-controller'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <HeadControllerRender />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 4. 各ルートで head を定義

```tsx [about.tsx]
export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About' },
      { property: 'og:title', content: 'About' },
    ],
  }),
})
```

## 5. 必要なら route context を編集

ここでは `editContext` を使っていますが、要点は「既存の context を保ったまま必要な設定だけを追加する」ことです。

```tsx [about.tsx]
import { editContext } from 'tanstack-head-controller/context'

export const Route = createFileRoute('/about')({
  context: (ctx) =>
    editContext(ctx, {
      configs: { debug: true },
    }),
})
```

次は [利用方法](./usage) で、プラグインや運用パターンを確認してください。
