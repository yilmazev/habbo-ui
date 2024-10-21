import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredTriggerBase } from "./WiredTriggerBase"

export const WiredTriggerToggleFurni: FC<{}> = () => {
  return <WiredTriggerBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_OR_BY_TYPE} hasSpecialInput={false} save={null} />
}
