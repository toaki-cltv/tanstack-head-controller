import type { headCtrlrContext } from "../context/type";

export type THCcontextWithRouter<T> = T & {
  headCtrlr: headCtrlrContext;
};
