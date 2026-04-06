# @thcjs/solid

Solid adapter for TanStack Head Controller.

Use this package with `@thcjs/core` to render route-resolved head tags in TanStack Solid Router.

## Installation

```bash
pnpm add @thcjs/core @thcjs/solid
```

## Quick Example

```tsx
import { HeadController } from "@thcjs/solid";

function RootDocument() {
  return (
    <html>
      <head>
        <HeadController />
      </head>
      <body>{/* ... */}</body>
    </html>
  );
}
```

## Documentation

- [Documentation Site](https://thc.tkcl.tv/en/)
