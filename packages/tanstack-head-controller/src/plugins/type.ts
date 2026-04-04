import type { headCtrlrContext } from "../context/type.js";
import type { Head } from "../types/head.js";

export type ThcPlugin = {
  name: string;

  transform?: (head: Head.index, ctx: headCtrlrContext) => Head.index;
};
