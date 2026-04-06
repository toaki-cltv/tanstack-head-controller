import type { ThcContext } from "../context/type.js";
import type { ThcHead } from "../types/head.js";
import type { TRoute } from "../types/router.js";

export type ThcPluginAdvanced = {
  router: TRoute[];
  currentRoute?: TRoute;
  head: ThcHead;
  ctx: ThcContext;
};

export type TransformFunction = (head: ThcHead, advanced: ThcPluginAdvanced) => ThcHead;

export type ThcPlugin = {
  name: string;

  transform?: TransformFunction;
};
