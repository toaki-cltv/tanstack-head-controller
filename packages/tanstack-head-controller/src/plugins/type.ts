import type { AnyRouteMatch } from "@tanstack/react-router";
import type { headCtrlrContext } from "../context/type.js";
import type { Head } from "../types/head.js";

export type ThcPluginAdvanced = {
  router: AnyRouteMatch[];
  head: Head.index;
};

export type TransformFunction = (
  head: Head.index,
  ctx: headCtrlrContext,
  advanced: ThcPluginAdvanced
) => Head.index;

export type ThcPlugin = {
  name: string;

  transform?: TransformFunction;
};
