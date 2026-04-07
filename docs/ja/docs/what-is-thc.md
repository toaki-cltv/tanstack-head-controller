# TanStack Head Controller とは？ {#what-is-thc}

TanStack Head Controller は、TanStack Router のルート定義から head 情報を収集し、必要に応じてプラグインで加工して描画するためのライブラリです。React ルーター構成に薄く追加でき、head の責務を整理できます。

::: tip
まずは試してみたい？ [クイックスタート](./getting-started) へどうぞ
:::

## できること

- ルートに定義されたページ情報（`meta` / `links` / `styles` / `scripts`）を収集する
- プラグインチェーンで head を変換する
- 最終的な head 要素を React コンポーネントとして描画する

## 主な API

- コントローラーを作成する（`createHeadController`）
- 現在のルートに応じた head を描画する（`HeadController`）
- ルートコンテキストへ設定を安全にマージする（`editContext`）

## プラグインモデル

プラグインは変換関数（`transform`）を持ち、head と context を受け取って新しい head を返します。

- 重複しやすいメタ情報を統合する（`thc-plugin-merge`）

この仕組みにより、アプリ固有の SEO ポリシーや title ルールをライブラリ外で拡張できます。

## 想定ユースケース

- レイアウトルートとページルートの head を一つの流れで管理したい
- 画面単位の title を共通フォーマットで統一したい
- 既存 TanStack Router アプリに最小変更で head 管理を導入したい

## 注意点

- 現状の実装はルート定義由来の head を前提としています
- スクリプト要素はルートのスクリプト定義（`headScripts`）を収集して反映します

続きは [クイックスタート](./getting-started) と [利用方法](./usage) を参照してください。
