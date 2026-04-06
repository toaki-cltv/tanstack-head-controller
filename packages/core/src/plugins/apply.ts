import type { ThcContext } from "../context/type.js";
import type { ThcHead } from "../types/head.js";
import type { TRoute } from "../types/router.js";
import { rLogger } from "./_log.js";

export interface ApplyPluginsOptions {
  head: ThcHead;
  ctx: ThcContext;
  router: TRoute[];
  currentRoute?: TRoute;
}

export function applyPlugins({ head, ctx, router, currentRoute }: ApplyPluginsOptions): ThcHead {
  let result = head;

  const advanced = {
    router,
    head,
    ctx,
    currentRoute,
  } as const;

  for (const plugin of ctx.plugins) {
    rLogger.debug("Applying plugin:", plugin.name || "Unnamed Plugin");
    if (plugin.transform) {
      result = plugin.transform(result, advanced);
    }
  }

  return result;
}
