---
layout: home

hero:
  name: TanStack Head Controller
  text: A head management layer for TanStack Router
  tagline: Collect route head entries, transform them with plugins, and render safely
  actions:
    - theme: brand
      text: Library Overview
      link: ./docs/what-is-thc
    - theme: alt
      text: Quick Start
      link: ./docs/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/toaki-cltv/tanstack-head-controller

features:
  - icon: ⚙️
    title: Aggregate route head
    details: Collects route-level page data (meta, links, styles, and scripts) into one unified head output.
  - icon: 🧩
    title: Plugin-driven transforms
    details: Apply transform steps to shape head data, such as merging entries or formatting titles.
  - icon: ⚡
    title: Minimal API surface
    details: "Easy to adopt with a small setup: create a controller and render it once in your layout."
  - icon: 🛡️
    title: Safer router context usage
    details: Keeps router context handling safe and predictable, reducing mistakes when passing route-level settings.
---
