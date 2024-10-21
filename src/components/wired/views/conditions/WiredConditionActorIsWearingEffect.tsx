import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionActorIsWearingEffect: FC<{}> = () => {
  const [ effect, setEffect ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ effect ])

  useEffect(() => {
    setEffect(trigger?.intData[0] ?? 0)
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.tooltip.effectid")}
        value={effect}
        onChange={(e) => setEffect(parseInt(e.target.value))}
      />
    </WiredConditionBase>
  )
}
