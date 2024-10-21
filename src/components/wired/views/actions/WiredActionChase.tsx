import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionChase: FC<{}> = () => {
  return <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_BY_TYPE_OR_FROM_CONTEXT} hasSpecialInput={false} save={null} />
}
