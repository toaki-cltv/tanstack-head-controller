import type { ThcHead } from "../types/head.js";
import type { TRoute } from "../types/router.js";

/**
 * route の生データから head 情報を収集するためのユーティリティ関数
 *
 * @param routeMatches
 * @returns
 *
 * @example
 * ```ts
 * import { useRouterState } from "@tanstack/react-router";
 * import { collectHeadDataFromRoute } from "@/plugins/head-controller/data";
 *
 * const routeMatches = useRouterState({ select: (s) => s.matches });;
 * const match = [...routeMatches].reverse().find((d) => d);
 *
 * const headData = collectHeadDataFromRoute(match);
 * ```
 */
export function collectHeadDataFromRoute(route?: TRoute): ThcHead {
  const headData = {
    meta: route?.meta,
    links: route?.links,
    styles: route?.styles,
    scripts: route?.headScripts,
  };
  return headData;
}

export function collectHeadDataFromRoutes(routeMatches: TRoute[]): ThcHead {
  const resolvedHead = {
    meta: routeMatches.flatMap((m) => m.meta ?? []),
    links: routeMatches.flatMap((m) => m.links ?? []),
    styles: routeMatches.flatMap((m) => m.styles ?? []),
    scripts: routeMatches.flatMap((m) => m.headScripts ?? []),
  };
  return resolvedHead;
}
