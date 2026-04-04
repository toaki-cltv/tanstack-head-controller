/**
 * ja: この設定ファイルは、デフォルト言語（ja）用の追加設定を定義します。ほかの言語の設定は、言語ごとのディレクトリのルートにある `config.ts` に記述してください。
 * en: This configuration file defines additional settings for the default language (ja). Settings for other languages should be specified in `config.ts` at the root of each language-specific directory.
 */

import { readFile } from "fs/promises";
import path from "path";
import { type DefaultTheme, defineAdditionalConfig } from "vitepress";

const packageJsonPath = path.join("../packages/tanstack-head-controller/package.json");
const pkg = JSON.parse(await readFile(packageJsonPath, "utf-8"));

export default defineAdditionalConfig({
  description:
    "TanStack Router のルート定義から head 情報を収集し、プラグインで整形して安全に描画するためのライブラリです。",

  themeConfig: {
    nav: nav(),

    search: {
      options: searchOptions(),
    },

    sidebar: {
      "/docs/": { base: "/docs/", items: sidebarDocs() },
    },

    editLink: {
      pattern: "https://github.com/toaki-cltv/tanstack-head-controller/edit/main/docs/:path",
      text: "GitHub でこのページを編集",
    },

    footer: {
      message: "Apache-2.0 ライセンスの下で公開されています。",
      copyright: "Copyright © 2026-present Toa Kiryu",
    },

    notFound: {
      title: "ページが見つかりません",
      quote:
        "お探しのページは削除されたか、名前が変更されたか、一時的に利用できない可能性があります。",
      linkLabel: "ホームへ戻る",
      linkText: "ホームへ戻る",
      code: "404",
    },
  },
});

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: "検索",
        buttonAriaLabel: "検索",
      },
      modal: {
        footer: {
          selectText: "選択",
          selectKeyAriaLabel: "Enter キー",
          navigateText: "移動",
          navigateUpKeyAriaLabel: "上矢印キー",
          navigateDownKeyAriaLabel: "下矢印キー",
          closeText: "閉じる",
          closeKeyAriaLabel: "Esc キー",
        },
      },
    },
  };
}

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "ドキュメント",
      link: "/docs/what-is-thc",
      activeMatch: "/docs/",
    },
    {
      text: "リソース",
      items: [
        { text: "貢献者", link: "/contributors" },
        {
          text: "ディスカッション",
          link: "https://github.com/toaki-cltv/tanstack-head-controller/discussions",
        },
      ],
    },
    {
      text: pkg.version,
      items: [
        {
          text: "更新履歴",
          link: "https://github.com/toaki-cltv/tanstack-head-controller/blob/main/CHANGELOG.md",
        },
        {
          text: "コントリビュート方法",
          link: "https://github.com/toaki-cltv/tanstack-head-controller/blob/main/.github/contributing.md",
        },
      ],
    },
  ];
}

function sidebarDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "導入",
      collapsed: false,
      items: [
        { text: "THC とは？", link: "what-is-thc" },
        { text: "クイックスタート", link: "getting-started" },
        { text: "使い方", link: "usage" },
      ],
    },
    {
      text: "開発者向けリソース",
      collapsed: false,
      items: [{ text: "ドキュメント", link: "development" }],
    },
    {
      text: "LLM アシスタント (ベータ)",
      collapsed: true,
      items: [
        { text: "Docs List", link: "../llms.txt" },
        { text: "Full Docs", link: "../llms-full.txt" },
        { text: "Tiny Docs", link: "../llms-small.txt" },
      ],
    },
  ];
}
