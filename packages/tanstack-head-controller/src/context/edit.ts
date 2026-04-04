import type { ThcConfigs } from "../configs/type.js";
import type { ThcPlugin } from "../plugins/type.js";
import { rLogger } from "./log.js";

const logger = rLogger.getSubLogger({ name: "Edit" });

export interface ContextEditProps {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}
export const editContext = (ctx: any, props: ContextEditProps): ContextEditProps => {
  const thc = ctx.context?.thc;

  const result = {
    ...ctx,
    context: {
      ...ctx.context,
      thc: {
        ...thc,
        ...props,
        configs: { ...(thc?.configs || {}), ...(props.configs || {}) },
        plugins: [...(thc?.plugins || []), ...(props.plugins || [])],
      },
    },
  };

  logger.debug("Context edited", { ctx: thc, result: result.context.thc });

  return result;
};
