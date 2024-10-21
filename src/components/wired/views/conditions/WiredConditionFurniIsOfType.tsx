import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionFurniIsOfType: FC<{}> = () => {
  return <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_OR_BY_TYPE} hasSpecialInput={false} save={null} />
}
