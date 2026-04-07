# Developer Info {#development}

This page briefly summarizes the development workflow for the `tanstack-head-controller` monorepo.

## Prerequisites

- Node.js 22+
- pnpm 10.x

## Setup

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

## Build

Run the following from the repository root.

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

Internally, `scripts/build.ts` does the following for each package.

- Generates JavaScript with SWC
- Generates declaration files (`d.ts`) with TypeScript

To build individual packages:

::: code-group

```sh [node]
node ./scripts/build.ts core
node ./scripts/build.ts react
node ./scripts/build.ts solid
node ./scripts/build.ts thc-plugin-merge
```

:::

## Main packages

- `packages/core`: core library
- `packages/react`: React adapter
- `packages/solid`: Solid adapter
- `packages/thc-plugin-merge`: head merge plugin
- `examples/tanstack-react`: React integration example
- `examples/tanstack-solid`: Solid integration example

## Docs update checklist

- If you update Japanese pages, keep English pages in the same structure.
- Keep code block language/file labels aligned (for example, `tsx [router.tsx]`).
- Verify that all referenced links resolve correctly.

When needed, also see [Quick Start](./getting-started) and [Usage](./usage).
