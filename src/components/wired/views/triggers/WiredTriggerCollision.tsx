import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredTriggerBase } from "./WiredTriggerBase"

export const WiredTriggerCollision: FC<{}> = () => {
  return <WiredTriggerBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={false} save={null} />
}
