import { createThcPlugin, type ThcPlugin } from "tanstack-head-controller/plugins";

/**
 * THC Merge Plugin
 * 
 * このプラグインは、head のマージ処理を提供します。
 * 例えば、meta タグの name 属性が同じ場合、title タグが複数ある場合などに、後から来たものを優先してマージします。

 * @returns 
 */
export const thcMerge = (): ThcPlugin =>
  createThcPlugin({
    name: "tv.tkcl.thc.merge",

    transform(head) {
      const mergedMeta = head.meta?.reduce(
        (acc, meta) => {
          if (!meta) return acc;
          const existing = acc.find((m) => m?.name === meta.name);
          if (existing) {
            return acc.map((m) => (m === existing ? { ...m, ...meta } : m));
          }
          return [...acc, meta];
        },
        [] as typeof head.meta
      );

      return {
        ...head,
        meta: mergedMeta,
      };
    },
  });
