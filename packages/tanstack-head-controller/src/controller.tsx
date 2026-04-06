import { useRouterState } from "@tanstack/react-router";
import { useSafeHeadCtrlrContext } from "./context/safe.js";
import { cLogger } from "./lib/logger.js";
import { applyPlugins } from "./plugins/apply.js";
import { collectHeadDataFromRoutes } from "./utils/data.js";
import { HeadRender } from "./utils/render.js";

// Loggerの初期化
const logger = cLogger().getSubLogger({ name: "Controller" });

export const HeadControllerRender = () => {
  // ルーターの状態を取得
  const routes = useRouterState({ select: (s) => s.matches });

  //  ルートからheadデータを収集
  const resolvedHead = collectHeadDataFromRoutes(routes);

  // 現在のルート情報
  const currentRouteData = [...routes].reverse().find((d) => d);

  // logger.info("Resolved Head from Routes:", { resolvedHead, ctx: currentRouteData?.context });

  // 現在のルートのコンテキストを安全に取得
  const currentThcContext = useSafeHeadCtrlrContext(currentRouteData?.context);

  // もしコンテキストが取得できない場合は、警告を出力して、HeadRenderを返す
  if (!currentThcContext) {
    logger.warn("No valid context found for the current route.");
    return <HeadRender head={resolvedHead} />;
  }

  // ログ出力
  // logger.info("Current Route:", { pathname: currentRouteData?.pathname, resolvedHead });

  // プラグインの適用
  const finalHead = applyPlugins({
    head: resolvedHead,
    ctx: currentThcContext,
    router: routes,
  });

  // ログ出力
  // logger.info("Final Head:", { finalHead });

  return <HeadRender head={finalHead} />;
};
