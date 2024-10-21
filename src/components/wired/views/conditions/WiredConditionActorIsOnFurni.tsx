import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionActorIsOnFurni: FC<{}> = () => {
  return <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID} hasSpecialInput={false} save={null} />
}
