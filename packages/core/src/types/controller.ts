import type { ThcContext } from "../context/type.js";
import type { ThcHead } from "./head.js";
import type { TRoute } from "./router.js";

export type ControllerResult = {
  router: TRoute[];
  currentRoute: TRoute | undefined;
  ctx: ThcContext | null;
  head: ThcHead;
};
