# Quick Start {#getting-started}

This page shows the shortest path to integrate TanStack Head Controller into a TanStack Router app.

## 1. Install packages

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

## 2. Create a controller and place it in router context

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

## 3. Render in your root document head

```tsx [__root.tsx]
import { HeadControllerRender } from 'tanstack-head-controller'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadControllerRender />
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
import { editContext } from 'tanstack-head-controller/context'

export const Route = createFileRoute('/about')({
  context: (ctx) =>
    editContext(ctx, {
      configs: { debug: true },
    }),
})
```

Next, see [Usage](./usage) for plugin patterns and practical tips.
