import { FC, useEffect, useState } from "react"
import { GetWiredTimeLocale, LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredRange } from "../WiredRange"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionTimeElapsedLess: FC<{}> = () => {
  const [ time, setTime ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ time ])

  useEffect(() => {
    setTime((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredRange
        title={LocalizeText("wiredfurni.params.allowbefore", [ "seconds" ], [ GetWiredTimeLocale(time) ])}
        setState={setTime}
        state={time}
        sliderMin={1}
        sliderMax={1200}
      />
    </WiredConditionBase>
  )
}
