import { headCtrlrContext } from "../context/type"
import { Head } from "../types/head"

export type ThcPlugin = {
  name: string

  transform?: (
    head: Head.index,
    ctx: headCtrlrContext
  ) => Head.index
}