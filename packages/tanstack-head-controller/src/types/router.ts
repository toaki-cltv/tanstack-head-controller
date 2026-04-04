import type { headCtrlrContext } from "../context/type.js";

export type THCcontextWithRouter<T> = T & {
  headCtrlr: headCtrlrContext;
};
