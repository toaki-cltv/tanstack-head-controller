import type { ThcHead } from "@thcjs/core/types";
import { createComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

/**
 * ヘッダーのレンダリングコンポーネント
 * @param param0
 * @returns
 */
export const HeadRender = ({ head }: { head: ThcHead }) => {
  const meta = (head.meta ?? []).map((meta) => {
    if (meta?.title) {
      return createComponent(Dynamic, {
        component: "title",
        children: meta.title,
      });
    }
    return createComponent(Dynamic, {
      component: "meta",
      ...meta,
    });
  });

  const links = (head.links ?? []).map((link) => {
    return createComponent(Dynamic, {
      component: "link",
      ...link,
    });
  });

  const styles = (head.styles ?? []).map((style) => {
    return createComponent(Dynamic, {
      component: "style",
      ...style,
    });
  });

  const scripts = (head.scripts ?? []).map((script) => {
    return createComponent(Dynamic, {
      component: "script",
      ...script,
    });
  });

  return [...meta, ...links, ...styles, ...scripts];
};
