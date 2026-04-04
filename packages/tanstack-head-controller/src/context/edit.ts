import type { ThcConfigs } from "../configs/type.js";
import type { ThcPlugin } from "../plugins/type.js";
import { rLogger } from "./log.js";

const logger = rLogger.getSubLogger({ name: "Edit" });

export interface ContextEditProps {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}
export const editContext = (ctx: any, props: ContextEditProps): ContextEditProps => {
  const result = {
    ...ctx,
    ...props,
    configs: {
      ...ctx.configs,
      ...props.configs,
    },
  };

  logger.debug("Context edited", { ctx, props, result });

  return result;
};
