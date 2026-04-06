import type { AnyRouteMatch } from "@tanstack/react-router";
import type { headCtrlrContext } from "../context/type.js";
import type { Head } from "../types/head.js";
export interface ApplyPluginsOptions {
  head: Head.index;
  ctx: headCtrlrContext;
  router: AnyRouteMatch[];
}

export function applyPlugins({ head, ctx, router }: ApplyPluginsOptions): Head.index {
  let result = head;

  const advanced = {
    router,
    head,
    ctx,
  } as const;

  for (const plugin of ctx.plugins) {
    if (plugin.transform) {
      result = plugin.transform(result, advanced);
    }
  }

  return result;
}
