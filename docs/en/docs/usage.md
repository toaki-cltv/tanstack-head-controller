# Usage {#usage}

This page covers practical patterns for using TanStack Head Controller in real apps.

## Baseline integration

1. Place the controller in router context (for example, `headCtrlr`)
2. Return head from routes
3. Place the render component (`HeadControllerRender`) in the root document head

## Combine plugins

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

## Edit route context

Use the helper (`editContext`) to merge controller-specific values while preserving existing route context.

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

## Write a custom plugin

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

## Ordering guidance

- Plugins run in registration order
- Put normalization plugins first and final formatting plugins later

## Common production patterns

- Define base metadata at layout level and override it at page level
- Standardize OG tags with one plugin
- Centralize environment-based robots behavior with a plugin

Continue with [Quick Start](./getting-started) and [Developer Info](./development).
