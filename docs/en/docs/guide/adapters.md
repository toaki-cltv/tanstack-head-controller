# Adapters {#adapters}

This guide explains how framework adapters connect THC core output to actual head rendering.

## Adapter concept

THC core (`@thcjs/core`) collects and transforms head data. Adapters render that resolved data in framework-specific apps.

Available adapters:

- React adapter: `@thcjs/react`
- Solid adapter: `@thcjs/solid`

## Shared setup

No matter the adapter, start by creating one controller in router context.

```tsx
import { createHeadController } from '@thcjs/core'
import { thcMerge } from 'thc-plugin-merge'

export const thcContext = createHeadController({
  plugins: [thcMerge()],
})
```

Then spread this into router context.

## React adapter (`@thcjs/react`)

Install:

```sh
pnpm add @thcjs/core @thcjs/react thc-plugin-merge
```

Render once in your root document head:

```tsx
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

## Solid adapter (`@thcjs/solid`)

Install:

```sh
pnpm add @thcjs/core @thcjs/solid thc-plugin-merge
```

Render once in your root document head:

```tsx
import { HeadController } from '@thcjs/solid'

function RootDocument() {
  return (
    <html lang='en'>
      <head>
        <HeadController />
      </head>
      <body>{/* ... */}</body>
    </html>
  )
}
```

## Adapter selection matrix

- TanStack React Router app -> `@thcjs/react`
- TanStack Solid Router app -> `@thcjs/solid`

Use one adapter per app runtime.

## Common pitfalls

- Missing controller in router context: renderer has nothing to transform
- Multiple `HeadController` render points: duplicated or unstable output
- Mixing adapter packages in one app: unnecessary complexity

## Migration tip

When migrating from one adapter to another, keep plugin setup unchanged in `@thcjs/core` and only replace render integration.

Next: [Plugins](./plugins) and [Advanced](./advanced).
