# thc-plugin-merge

Official merge plugin for `@thcjs/core`.

This plugin merges duplicate-like `meta` entries (same `name`) so route-level head data can be composed safely.

## Installation

```bash
pnpm add @thcjs/core thc-plugin-merge
```

## Usage

```tsx
import { createHeadController } from "@thcjs/core";
import { thcMerge } from "thc-plugin-merge";

const thc = createHeadController({
  plugins: [thcMerge()],
});
```

## Documentation

- [Usage Guide](https://thc.tkcl.tv/en/docs/usage)
