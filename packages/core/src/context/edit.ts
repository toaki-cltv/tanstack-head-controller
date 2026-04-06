import type { ThcConfigs } from "../configs/type.js";
import type { ThcPlugin } from "../plugins/type.js";

export interface ContextEditProps {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}
export const editContext = (ctx: any, props: ContextEditProps) => {
  const thc = ctx.context?.thc;

  const result = {
    ...ctx,
    context: {
      ...ctx.context,
      thc: {
        ...thc,
        configs: { ...(thc?.configs || {}), ...(props.configs || {}) },
        plugins: [...(thc?.plugins || []), ...(props.plugins || [])],
      },
    },
  };

  return result;
};
