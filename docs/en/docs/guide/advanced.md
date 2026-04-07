# Advanced {#advanced}

This guide covers advanced patterns for larger applications and teams.

## Context composition at route level

Use `editContext` so THC settings are appended without breaking existing route context.

```tsx
import { editContext } from '@thcjs/core/context'

export const Route = createFileRoute('/admin')({
  context: (ctx) =>
    editContext(ctx, {
      configs: { debug: true },
    }),
})
```

This is safer than replacing context manually.

## Layered head strategy

For nested routes, prefer this structure:

- Layout routes: global defaults (`charset`, viewport, base OG values)
- Feature routes: section-level overrides
- Leaf routes: page-specific title and final metadata

This keeps overrides intentional and easy to audit.

## Environment-specific behavior

```tsx
const plugins = [thcMerge()]

if (import.meta.env.DEV) {
  plugins.push(debugHeadPlugin())
}

if (import.meta.env.PROD) {
  plugins.push(strictSeoPlugin())
}

export const thc = createHeadController({ plugins })
```

Use this to make development diagnostics explicit while preserving strict production policies.

## SSR and hydration consistency

For stable SSR:

- Render `HeadController` exactly once in root head
- Keep route `head` functions deterministic
- Avoid time-dependent values in render path
- Keep plugin transforms pure and repeatable

Hydration mismatches often come from non-deterministic values.

## Metadata governance pattern

In team environments, split responsibilities:

- Product teams set page-level metadata in route files
- Platform team owns shared plugins and validation
- CI checks enforce minimum metadata requirements

This balances velocity and consistency.

## Observability and debugging

When output is unexpected, inspect in this order:

1. Route match order
2. Aggregated head before plugins
3. Plugin registration order
4. Final output from adapter render

Add temporary debug plugins in development to log transforms per stage.

## Performance considerations

- Keep plugin transforms linear-time where possible
- Avoid expensive deep clones unless required
- Prefer small, composable plugins over one large plugin
- Reuse constants for repeated metadata blocks

## Hardening checklist

- Default metadata defined at layout level
- Merge/normalization plugin configured
- Route overrides tested for precedence
- SSR and CSR outputs compared
- Debug plugins excluded from production

Next: [Plugins](./plugins) and [Adapters](./adapters).
