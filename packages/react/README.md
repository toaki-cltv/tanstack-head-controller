# @thcjs/react

React adapter for TanStack Head Controller.

Use this package with `@thcjs/core` to render route-resolved head tags in TanStack React Router.

## Installation

```bash
pnpm add @thcjs/core @thcjs/react
```

## Quick Example

```tsx
import { HeadController } from "@thcjs/react";

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
