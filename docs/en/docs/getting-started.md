# Quick Start {#getting-started}

This page shows the shortest path to integrate TanStack Head Controller into a TanStack Router app.

## 1. Install packages

::: code-group

```sh [ni]
ni @thcjs/core @thcjs/react thc-plugin-merge
```

```sh [npm]
npm install @thcjs/core @thcjs/react thc-plugin-merge
```

```sh [pnpm]
pnpm add @thcjs/core @thcjs/react thc-plugin-merge
```

:::

## 2. Create a controller and place it in router context

```tsx [router.tsx]
import { createRouter } from '@tanstack/react-router'
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const router = createRouter({
  routeTree,
  context: {
    ...createHeadController({
      plugins: [
        thcMerge(),
      ]
    })
  },
})
```

## 3. Render in your root document head

```tsx [__root.tsx]
import { HeadController } from '@thcjs/react'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadController />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 4. Define head at route level

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

## 5. Optionally edit route context

This example uses `editContext`, but the key idea is simple: keep existing route context intact and add only the settings you need.

```tsx [about.tsx]
import { editContext } from '@thcjs/core/context'

export const Route = createFileRoute('/about')({
  context: (ctx) =>
    editContext(ctx, {
      configs: { debug: true },
    }),
})
```

Next, see [Usage](./usage) for plugin patterns and practical tips.
