import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionReset: FC<{}> = () => {
  return <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={false} save={null} />
}
