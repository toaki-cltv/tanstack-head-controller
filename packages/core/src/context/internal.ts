import type { ThcContext } from "./type.js";

export interface ContextEditProps {
  configs?: ThcContext["configs"];
  plugins?: ThcContext["plugins"];
}
export const editContext = (ctx: any, props: ContextEditProps): ThcContext => {
  const thc = ctx?.thc;

  const result = {
    ...ctx,
    ...props,
    configs: { ...(thc?.configs || {}), ...(props.configs || {}) },
    plugins: [...(thc?.plugins || []), ...(props.plugins || [])],
  };

  return result;
};
