import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionActorIsWearingBadge: FC<{}> = () => {
  const [ badge, setBadge ] = useState("")
  const { trigger = null, setStringParam = null } = useWired()

  const save = () => setStringParam(badge)

  useEffect(() => {
    setBadge(trigger.stringData)
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.badgecode")}
        value={badge}
        onChange={(e) => setBadge(e.target.value)}
      />
    </WiredConditionBase>
  )
}
