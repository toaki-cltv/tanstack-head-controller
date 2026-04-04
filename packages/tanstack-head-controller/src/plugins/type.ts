import type { headCtrlrContext } from "../context/type";
import type { Head } from "../types/head";

export type ThcPlugin = {
  name: string;

  transform?: (head: Head.index, ctx: headCtrlrContext) => Head.index;
};
