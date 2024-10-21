import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredRange } from "../WiredRange"
import { WiredTriggerBase } from "./WiredTriggerBase"

export const WiredTriggerScoreAchieved: FC<{}> = () => {
  const [ points, setPoints ] = useState(1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ points ])

  useEffect(() => {
    setPoints((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredTriggerBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredRange
        title={LocalizeText("wiredfurni.params.setscore", [ "points" ], [ points.toString() ])}
        setState={setPoints}
        state={points}
        sliderMin={1}
        sliderMax={1000}
      />
    </WiredTriggerBase>
  )
}
