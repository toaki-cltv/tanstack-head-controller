import { useSafeHeadCtrlrContext } from "./context/safe.js";
import { applyPlugins } from "./plugins/apply.js";
import type { ControllerResult } from "./types/controller.js";
import type { TRoute } from "./types/router.js";
import { collectHeadDataFromRoutes } from "./utils/data.js";

export const _controller = (adapter: string, routes: TRoute[]): ControllerResult => {
  //  ルートからheadデータを収集
  const resolvedHead = collectHeadDataFromRoutes(routes);

  // 現在のルート情報
  const currentRouteData = [...routes].reverse().find((d) => d);

  // 現在のルートのコンテキストを安全に取得
  const currentThcContext = useSafeHeadCtrlrContext(currentRouteData?.context);

  // もしコンテキストが取得できない場合
  if (!currentThcContext) {
    return {
      router: routes,
      currentRoute: currentRouteData,
      ctx: null,
      head: resolvedHead,
    };
  }

  // プラグインの適用
  const finalHead = applyPlugins({
    head: resolvedHead,
    ctx: currentThcContext,
    router: routes,
    currentRoute: currentRouteData,
  });

  return {
    router: routes,
    currentRoute: currentRouteData,
    ctx: currentThcContext,
    head: finalHead,
  };
};
