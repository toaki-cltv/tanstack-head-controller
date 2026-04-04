# What is TanStack Head Controller? {#what-is-thc}

TanStack Head Controller is a small library that collects head data from TanStack Router route matches, transforms that data through plugins, and renders the final tags in your document head.

::: tip
If you are starting from scratch, go to the [Quick Start](./getting-started).
:::

## What it does

- Collects route-level page data (meta, links, styles, and scripts)
- Applies plugin transforms in sequence
- Renders the resolved head with a React component

## Core API

- Create a controller with configs and plugins (`createHeadController`)
- Resolve and render head tags for the current route (`HeadControllerRender`)
- Safely merge controller-related values into route context (`editContext`)

## Plugin model

Plugins implement a transform function:

- Input: current head payload and controller context
- Output: transformed head payload

Built-in examples in this monorepo:

- Merge duplicate-like metadata entries (`thc-plugin-merge`)
- Apply a site-name template to page titles (`thc-plugin-ttplate`)

## Typical use cases

- Keep head logic centralized across nested layouts and page routes
- Standardize title patterns without repeating route-level logic
- Add custom SEO transforms without modifying the core library

## Notes

- Current implementation resolves head primarily from route matches
- Script entries are collected from route script definitions (`headScripts`)

Continue with [Quick Start](./getting-started) and [Usage](./usage).
