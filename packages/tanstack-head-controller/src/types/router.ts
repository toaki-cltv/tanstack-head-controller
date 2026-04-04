import type { headCtrlrContext } from "../context/type.js";

export type ThcContextWithRouter<T = {}> = T & {
  thc: headCtrlrContext;
};
