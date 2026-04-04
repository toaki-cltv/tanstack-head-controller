import type { ThcConfigs } from "./configs/type.js";
import { editContext } from "./context/edit.js";
import { cLogger } from "./lib/logger.js";
import type { ThcPlugin } from "./plugins/type.js";

export interface CreateHeadControllerOptions {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}

const logger = cLogger().getSubLogger({ name: "Create" });

export const createHeadController = (options: CreateHeadControllerOptions = {}) => {
  const { configs = {}, plugins = [] } = options;

  // logger.info("Initializing head controller with options:", options);
  // logger.info("Registered plugins:", plugins);

  return {
    thc: editContext({}, { configs, plugins }),
  };
};
