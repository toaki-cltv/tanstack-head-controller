import { createThcPlugin, type ThcPlugin } from "tanstack-head-controller/plugins";

export interface TitleTemplatePluginOptions {
  siteName?: string;
  separator?: string;
}

export const thcTitleTemplate = (options: TitleTemplatePluginOptions = {}): ThcPlugin =>
  createThcPlugin({
    name: "tv.tkcl.thc.title-template",

    transform(head) {
      const m = head.meta?.find((m) => m?.title);

      if (!m?.title) return head;

      const result = {
        ...m,
        title: `${m.title}${options.separator ?? " | "}${options.siteName ?? "App"}`,
      };

      return {
        ...head,
        meta: head.meta?.map((meta) => (meta === m ? result : meta)),
      };
    },
  });
