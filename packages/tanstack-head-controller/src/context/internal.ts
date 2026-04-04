import type { ThcConfigs } from "../configs/type.js";
import type { ThcPlugin } from "../plugins/type.js";
import { headCtrlrContext } from "./type.js";

export interface ContextEditProps {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}
export const editContext = (ctx: any, props: ContextEditProps): headCtrlrContext => {
  const thc = ctx?.thc;

  const result = {
    ...ctx,
    ...props,
    configs: { ...(thc?.configs || {}), ...(props.configs || {}) },
    plugins: [...(thc?.plugins || []), ...(props.plugins || [])],
  };

  return result;
};
