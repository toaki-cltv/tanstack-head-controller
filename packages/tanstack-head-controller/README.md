# tanstack-head-controller

Head management library for TanStack Router.

It collects route-level head data (`meta`, `links`, `styles`, `scripts`), applies plugin-based transforms, and renders the final tags in your root document.

## Installation

```bash
pnpm add tanstack-head-controller
```

## Quick Example

```tsx
import { createHeadController, HeadControllerRender } from 'tanstack-head-controller'

const headCtrlr = createHeadController()

// Put headCtrlr in router context,
// then render in your root document:
// <head><HeadControllerRender /></head>
```

## Documentation

- [Documentation Site](https://thc.tkcl.tv/en/)
