import type { ThcConfigs } from "./configs/type.js";
import { editContext } from "./context/internal.js";
import type { ThcPlugin } from "./plugins/type.js";

export interface CreateHeadControllerOptions {
  configs?: ThcConfigs;
  plugins?: ThcPlugin[];
}

export const createHeadController = (options: CreateHeadControllerOptions = {}) => {
  const { configs = {}, plugins = [] } = options;

  return {
    thc: editContext({}, { configs, plugins }),
  };
};
