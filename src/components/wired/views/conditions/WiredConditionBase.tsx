import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredBase } from "../WiredBase"

export interface IWiredConditionBase {
  hasSpecialInput: boolean
  requiresFurni: number
  save: () => void
  children?: React.ReactNode
}

export const WiredConditionBase: FC<IWiredConditionBase> = ({ requiresFurni = WiredFurniType.STUFF_SELECTION_OPTION_NONE, save = null, hasSpecialInput = false, children = null }) => {
  const onSave = () => (save && save())

  return (
    <WiredBase wiredType="condition" requiresFurni={requiresFurni} hasSpecialInput={hasSpecialInput} save={onSave}>
      {children}
    </WiredBase>
  )
}
