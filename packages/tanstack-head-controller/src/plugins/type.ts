import type { AnyRouteMatch } from "@tanstack/react-router";
import type { headCtrlrContext } from "../context/type.js";
import type { Head } from "../types/head.js";

export type ThcPluginAdvanced = {
  router: AnyRouteMatch[];
  currentRoute?: AnyRouteMatch;
  head: Head.index;
  ctx: headCtrlrContext,
};

export type TransformFunction = (
  head: Head.index,
  advanced: ThcPluginAdvanced
) => Head.index;

export type ThcPlugin = {
  name: string;

  transform?: TransformFunction;
};
