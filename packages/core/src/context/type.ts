import type { ThcConfigs } from "../configs/type.js";
import type { ThcPlugin } from "../plugins/type.js";

export type ThcContext = {
  configs: ThcConfigs;
  plugins: ThcPlugin[];
};
