# Usage {#usage}

This page covers practical patterns for using TanStack Head Controller in real apps.

## Baseline integration

1. Place the controller in router context (for example, `thc`)
2. Return head from routes
3. Place the render component (`HeadController`) in the root document head

## Combine plugins

```tsx
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const thc = createHeadController({
  plugins: [
    thcMerge(),
  ],
})
```

If you are using Solid, replace `@thcjs/react` with `@thcjs/solid` in the render step.

## Edit route context

Use the helper (`editContext`) to merge controller-specific values while preserving existing route context.

```tsx [about.tsx]
import { editContext } from '@thcjs/core/context'

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
import { createThcPlugin } from '@thcjs/core/plugins'

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
