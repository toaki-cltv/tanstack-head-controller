# @thcjs/core

Core package for TanStack Head Controller.

This package collects route-level head data (`meta`, `links`, `styles`, `scripts`) and provides the controller context used by framework adapters.

## Installation

```bash
pnpm add @thcjs/core
```

## Quick Example

```tsx
import { createHeadController } from "@thcjs/core";

const thc = createHeadController();

// Put `thc` in your TanStack Router context.
```

## Related Packages

- `@thcjs/react` for TanStack React Router rendering.
- `@thcjs/solid` for TanStack Solid Router rendering.
- `thc-plugin-merge` for safe head merge behavior.

## Documentation

- [Documentation Site](https://thc.tkcl.tv/en/)
