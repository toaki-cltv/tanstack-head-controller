# TanStack Router SSR Route Record 比較レポート

対象:
- react.json
- solid.json

## 1. 概要
- 両ファイルとも配列要素は 2 件。
- ルート識別子は両者で一致。
  - `__root__/`
  - `//`
- 主要な構造はほぼ共通。
- 差分は主に `context`、`_nonReactive`、`fetchCount`、`updatedAt`。

## 2. 共通して存在する項目
以下は、両ファイルの全エントリで共通して存在するキー。

- `id`
- `ssr`
- `index`
- `routeId`
- `params`
- `_strictParams`
- `pathname`
- `updatedAt`
- `search`
- `_strictSearch`
- `status`
- `isFetching`
- `_nonReactive`
- `context`
- `abortController`
- `fetchCount`
- `cause`
- `loaderDeps`
- `invalid`
- `preload`
- `staticData`
- `fullPath`
- `globalNotFound`

また、以下は両ファイルで `__root__/` エントリに共通して存在（`//` には存在しない）。

- `links`
- `headScripts`
- `meta`
- `styles`

## 3. 独自に存在する項目
### react.json のみ
- トップレベルの独自キーはなし

### solid.json のみ
- トップレベルの独自キーはなし

## 4. 同名キーだが内容が異なる項目
### `context`
- react.json: 全エントリで `context.thc` が存在
  - `configs: {}`
  - `plugins: [{ name: "tv.tkcl.thc.merge" }]`
- solid.json: 全エントリで空オブジェクト `{}`

### `_nonReactive`
- react.json: 全エントリで空オブジェクト `{}`
- solid.json: 全エントリで以下を保持
  - `loadPromise.status = "pending"`

### `fetchCount`
- react.json: 全エントリで `1`
- solid.json: 全エントリで `0`

### `updatedAt`
- どちらもタイムスタンプ値だが、記録時刻が異なる
- エントリごとに値が異なるため、固定値比較ではなく「実行時刻差分」として扱う

### `meta`（値は同等、見解修正）
- 以前のレポートでは「react.json のみ」としていたが誤り
- 最新データでは `__root__/` エントリで両ファイルに存在し、内容も同等

## 5. ルートごとの差分詳細
### ルート `__root__/`
- 共通:
  - `links` の内容（stylesheet `/src/styles.css`）
  - `headScripts`（inline script）
  - `meta`（charset / viewport / title / og:*）
  - `styles`（inline style）
  - その他の基本キー群
- 差分:
  - `context`（react は `thc` 情報あり、solid は空）
  - `_nonReactive`（react は空、solid は `loadPromise.status = pending`）
  - `fetchCount`（react=1, solid=0）
  - `updatedAt`（記録時刻差）

### ルート `//`
- 共通:
  - 基本キー群
  - `links` / `headScripts` / `meta` / `styles` はどちらも存在しない
- 差分:
  - `context`（react は `thc` 情報あり、solid は空）
  - `_nonReactive`（react は空、solid は `loadPromise.status = pending`）
  - `fetchCount`（react=1, solid=0）
  - `updatedAt`（記録時刻差）

## 6. 補足解釈
- `meta` / `headScripts` / `styles` は両者で取得されており、ヘッド情報収集の基礎機能は共通している。
- React 側は `context.thc` による追加コンテキストが出力される（補足どおり React 側で context を編集した影響）。
- Solid 側の `_nonReactive.loadPromise` は、ロード処理状態の内部表現がシリアライズされている可能性がある。
- どちらも `status: "success"`, `ssr: true` で、SSR でのルート解決自体は正常に完了している。