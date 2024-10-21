import { FC } from "react"
import { WiredFurniType } from "../../../../api"
import { WiredBase } from "../WiredBase"

export interface IWiredTriggerBase {
  hasSpecialInput: boolean
  requiresFurni: number
  save: () => void
  children?: React.ReactNode
}

export const WiredTriggerBase: FC<IWiredTriggerBase> = ({ requiresFurni = WiredFurniType.STUFF_SELECTION_OPTION_NONE, save = null, hasSpecialInput = false, children = null }) => {
  const onSave = () => (save && save())

  return (
    <WiredBase wiredType="trigger" requiresFurni={requiresFurni} hasSpecialInput={hasSpecialInput} save={onSave}>
      {children}
    </WiredBase>
  )
}
