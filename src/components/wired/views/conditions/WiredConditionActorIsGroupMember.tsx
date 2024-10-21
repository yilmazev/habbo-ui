import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionActorIsGroupMember: FC<{}> = () => {
  return <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={false} save={null} />
}
