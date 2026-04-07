# アダプター {#adapters}

このガイドでは、THC core の出力を各フレームワークで描画するためのアダプター設計を説明します。

## アダプターの考え方

`@thcjs/core` は head を収集・変換し、アダプターはその結果を実際の `<head>` に描画します。

利用可能なアダプター:

- React: `@thcjs/react`
- Solid: `@thcjs/solid`

## 共通セットアップ

まずは router context に controller を1つだけ用意します。

```tsx
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const thcContext = createHeadController({
  plugins: [thcMerge()],
})
```

これを router context に spread して利用します。

## React アダプター (`@thcjs/react`)

インストール:

```sh
pnpm add @thcjs/core @thcjs/react thc-plugin-merge
```

ルートドキュメントで1回だけ描画:

```tsx
import { HeadController } from '@thcjs/react'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <HeadController />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Solid アダプター (`@thcjs/solid`)

インストール:

```sh
pnpm add @thcjs/core @thcjs/solid thc-plugin-merge
```

ルートドキュメントで1回だけ描画:

```tsx
import { HeadController } from '@thcjs/solid'

function RootDocument() {
  return (
    <html lang='ja'>
      <head>
        <HeadController />
      </head>
      <body>{/* ... */}</body>
    </html>
  )
}
```

## 選択基準

- TanStack React Router -> `@thcjs/react`
- TanStack Solid Router -> `@thcjs/solid`

原則として、1アプリに1アダプターを採用します。

## よくある落とし穴

- context に controller がない
- `HeadController` を複数箇所で描画している
- 不要に複数アダプターを混在させている

## 移行時のコツ

プラグインや core 側の設計は維持し、描画部分だけをアダプターごとに差し替えると移行が安全です。

続き: [プラグイン](./plugins) と [高度な使い方](./advanced)
