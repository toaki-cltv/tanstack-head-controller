import { headCtrlrContext } from "../context/type"
import { Head } from "../types/head"

export interface ApplyPluginsOptions {
  head: Head.index
  ctx: headCtrlrContext
}

export function applyPlugins({ head, ctx }: ApplyPluginsOptions): Head.index {
  let result = head

  for (const plugin of ctx.plugins) {
    if (plugin.transform) {
      result = plugin.transform(result, ctx)
    }
  }

  return result
}