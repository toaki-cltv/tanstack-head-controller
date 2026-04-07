# Plugins {#plugins}

This guide covers plugin design, composition, and operational best practices for TanStack Head Controller.

## Plugin role in THC

In THC, routes define raw head entries, and plugins transform the aggregated result before rendering. This separation gives you:

- Clear ownership: routes describe intent, plugins enforce policy
- Reuse: one plugin can standardize behavior across many routes
- Predictability: order-based transforms are easier to reason about than ad-hoc route logic

## Data flow overview

1. Route matches provide head entries (`meta`, `links`, `styles`, `headScripts`)
2. THC aggregates all entries from active matches
3. Plugins run in registration order
4. Final head data is rendered by adapter component (`HeadController`)

## Use the official merge plugin

```tsx
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const thc = createHeadController({
  plugins: [thcMerge()],
})
```

`thc-plugin-merge` is a good default in nested route structures where duplicate-like meta entries can appear.

## Build a custom plugin

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

## Production-safe plugin patterns

- Keep each plugin single-purpose
- Return new objects instead of mutating inputs
- Keep transforms deterministic (avoid `Date.now()` or random values in render path)
- Avoid framework-specific assumptions inside generic plugins

## Composition strategy

Recommended order:

1. Normalization plugins (dedupe, merge, sanitize)
2. Enrichment plugins (derive OG/Twitter tags, defaults)
3. Final formatting plugins (title style or final overrides)

Example:

```tsx
const plugins = [
  thcMerge(),
  seoDefaultsPlugin(),
  titleSuffixPlugin(' | MySite'),
]

export const thc = createHeadController({ plugins })
```

## Environment-aware plugins

```tsx
const plugins = [thcMerge()]

if (import.meta.env.DEV) {
  plugins.push(debugHeadPlugin())
}

export const thc = createHeadController({ plugins })
```

Use this pattern to keep debug-only behavior out of production bundles and runtime behavior.

## Testing plugin behavior

Focus on behavior, not implementation details:

- Input head shape -> expected output head shape
- Nested route conflicts -> final precedence rules
- Idempotency -> applying plugin twice should not break output

## Debug checklist

- Is the controller present in router context?
- Are plugins registered in intended order?
- Is route head data present before plugin transforms?
- Is a plugin accidentally replacing (not extending) arrays?

Next: [Adapters](./adapters) and [Advanced](./advanced).
