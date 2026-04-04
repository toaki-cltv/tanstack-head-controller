import type { ThcConfigs } from "../configs/type";
import type { ThcPlugin } from "../plugins/type";

export type headCtrlrContext = {
  configs: ThcConfigs;
  plugins: ThcPlugin[];
};
