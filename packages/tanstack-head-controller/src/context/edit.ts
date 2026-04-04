import type { ThcConfigs } from "../configs/type";
import type { ThcPlugin } from "../plugins/type";
import { rLogger } from "./log";

const logger = rLogger.getSubLogger({ name: "Edit" });

export interface ContextEditProps {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}
export const editContext = (ctx: any, props: ContextEditProps) => {
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
