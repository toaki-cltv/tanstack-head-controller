import { useSafeHeadCtrlrContext } from "./context/safe.js";
import { cLogger } from "./lib/logger.js";
import { applyPlugins } from "./plugins/apply.js";
import type { ControllerResult } from "./types/controller.js";
import type { TRoute } from "./types/router.js";
import { collectHeadDataFromRoutes } from "./utils/data.js";

// Loggerの初期化
const logger = cLogger().getSubLogger({ name: "Controller" });

export const _controller = (adapter: string, routes: TRoute[]): ControllerResult => {
  logger.debug("Invoked with adapter:", adapter);

  //  ルートからheadデータを収集
  const resolvedHead = collectHeadDataFromRoutes(routes);

  // 現在のルート情報
  const currentRouteData = [...routes].reverse().find((d) => d);

  // 現在のルートのコンテキストを安全に取得
  const currentThcContext = useSafeHeadCtrlrContext(currentRouteData?.context);

  // もしコンテキストが取得できない場合は、警告を出力して、HeadRenderを返す
  if (!currentThcContext) {
    logger.warn("No valid context found for the current route.");
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
