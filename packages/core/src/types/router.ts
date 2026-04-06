import type { RouteMatch } from "@tanstack/router-core";
import type { ThcContext } from "../context/type.js";
import type { ThcHead } from "./head.js";

export type ThcContextWithRouter<T = Record<string, unknown>> = T & {
  thc: ThcContext;
};

export interface TRouteLink {
  rel: string;
  href: string;
  [key: string]: unknown;
}

export type TRouteMeta = Record<string, string>;
export interface TRouteHeadNode {
  children: string;
  [key: string]: unknown;
}
export type TRouterKind = "react" | "solid" | "other";

declare module "@tanstack/router-core" {
  interface RouteMatchExtensions {
    meta?: ThcHead["meta"];
    links?: ThcHead["links"];
    scripts?: ThcHead["scripts"];
    styles?: ThcHead["styles"];
    headScripts?: ThcHead["scripts"];
  }
}
export type TRoute = RouteMatch<any, any, any, any, any, any, any>;
