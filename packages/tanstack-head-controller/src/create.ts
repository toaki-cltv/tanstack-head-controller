import { ThcConfigs } from "./configs/type";
import { editContext } from "./context/edit";
import { cLogger } from "./lib/logger";
import { ThcPlugin } from "./plugins/type";

export interface CreateHeadControllerOptions {
  configs?: ThcConfigs
  plugins?: ThcPlugin[]
}

const logger = cLogger().getSubLogger({ name: "Create" });

export const createHeadController = (options: CreateHeadControllerOptions = {}) => {
  const { configs = {}, plugins = [] } = options;

  // logger.info("Initializing head controller with options:", options);
  // logger.info("Registered plugins:", plugins);

  return editContext({}, { configs, plugins })
} 