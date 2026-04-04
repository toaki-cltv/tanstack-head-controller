
import { ThcConfigs } from "../configs/type"
import { ThcPlugin } from "../plugins/type"

export type headCtrlrContext = {
  configs: ThcConfigs
  plugins: ThcPlugin[]
}
