# 開発者向け情報 {#development}

このページでは、`tanstack-head-controller` モノレポの開発フローを簡潔にまとめます。

## 前提

- Node.js 22 以上
- pnpm 10 系

## セットアップ

::: code-group

```sh [ni]
ni
```

```sh [npm]
npm install
```

```sh [pnpm]
pnpm install
```

:::

## ビルド

リポジトリルートで以下を実行します。

::: code-group

```sh [ni]
nr build
```

```sh [npm]
npm build
```

```sh [pnpm]
pnpm build
```

:::

内部的には `scripts/build.ts` が各パッケージで次を実行します。

- SWC で JavaScript を生成
- TypeScript で型定義（`d.ts`）を生成

個別パッケージをビルドする場合:

::: code-group

```sh [node]
node ./scripts/build.ts core
node ./scripts/build.ts react
node ./scripts/build.ts solid
node ./scripts/build.ts thc-plugin-merge
```

:::

## 主要パッケージ

- `packages/core`: コアライブラリ
- `packages/react`: React アダプター
- `packages/solid`: Solid アダプター
- `packages/thc-plugin-merge`: head 統合プラグイン
- `examples/tanstack-react`: React 導入サンプル
- `examples/tanstack-solid`: Solid 導入サンプル

## ドキュメント更新時の確認

- 日本語ページを更新したら、英語ページも同じ構成に追従する
- コードブロックの言語・ファイルラベル（例: `tsx [router.tsx]`）を揃える
- 参照リンクにリンク切れがないことを確認する

必要に応じて [クイックスタート](./getting-started) と [使い方](./usage) も参照してください。
