/**
 * ja: この設定ファイルは、デフォルト言語（ja）用の追加設定を定義します。ほかの言語の設定は、言語ごとのディレクトリのルートにある `config.ts` に記述してください。
 * en: This configuration file defines additional settings for the default language (ja). Settings for other languages should be specified in `config.ts` at the root of each language-specific directory.
 */

import { readFile } from "fs/promises";
import path from "path";
import { type DefaultTheme, defineAdditionalConfig } from "vitepress";

const packageJsonPath = path.join("../package.json");
const pkg = JSON.parse(await readFile(packageJsonPath, "utf-8"));

export default defineAdditionalConfig({
  description:
    "A library for TanStack Router that collects route-level head data, applies plugin-based transforms, and renders tags safely.",
  themeConfig: {
    nav: nav(),
    search: {
      options: searchOptions(),
    },
    sidebar: {
      "/en/docs/": {
        base: "/en/docs/",
        items: sidebarDocs(),
      },
    },
    editLink: {
      pattern: "https://github.com/toaki-cltv/tanstack-head-controller/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the Apache-2.0 License.",
      copyright: "Copyright © 2026-present Toa Kiryu",
    },
    notFound: {
      title: "PAGE NOT FOUND",
      quote:
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkLabel: "go to home",
      linkText: "Take me home",
      code: "404",
    },
  },
});
function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: "Search",
        buttonAriaLabel: "Search",
      },
      modal: {
        footer: {
          selectText: "Select",
          selectKeyAriaLabel: "Enter key",
          navigateText: "Navigate",
          navigateUpKeyAriaLabel: "Arrow Up",
          navigateDownKeyAriaLabel: "Arrow Down",
          closeText: "Close",
          closeKeyAriaLabel: "Esc key",
        },
      },
    },
  };
}
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Documentation",
      link: "/en/docs/what-is-thc",
      activeMatch: "/docs/",
    },
    {
      text: "Resources",
      items: [
        {
          text: "Contributors",
          link: "/en/contributors",
        },
        {
          text: "Discussion",
          link: "https://github.com/toaki-cltv/tanstack-head-controller/discussions",
        },
      ],
    },
    {
      text: pkg.version,
      items: [
        {
          text: "Changelog",
          link: "https://github.com/toaki-cltv/tanstack-head-controller/blob/main/CHANGELOG.md",
        },
        {
          text: "How to Contribute",
          link: "https://github.com/toaki-cltv/tanstack-head-controller/blob/main/.github/contributing.md",
        },
      ],
    },
  ];
}
function sidebarDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {
          text: "What is THC?",
          link: "what-is-thc",
        },
        {
          text: "Quick Start",
          link: "getting-started",
        },
        {
          text: "Usage",
          link: "usage",
        },
      ],
    },
    {
      text: "Guides",
      collapsed: false,
      items: [
        {
          text: "Plugins",
          link: "guide/plugins",
        },
        {
          text: "Adapters",
          link: "guide/adapters",
        },
        {
          text: "Advanced",
          link: "guide/advanced",
        },
      ],
    },
    {
      text: "Developer Resources",
      collapsed: false,
      items: [{ text: "Documentation", link: "development" }],
    },
    {
      text: "LLM Assistant (Beta)",
      collapsed: true,
      items: [
        {
          text: "Docs List",
          link: "../llms.txt",
        },
        {
          text: "Full Docs",
          link: "../llms-full.txt",
        },
        {
          text: "Tiny Docs",
          link: "../llms-small.txt",
        },
      ],
    },
  ];
}
