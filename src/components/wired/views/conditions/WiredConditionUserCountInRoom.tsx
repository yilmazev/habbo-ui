import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredRange } from "../WiredRange"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionUserCountInRoom: FC<{}> = () => {
  const [ min, setMin ] = useState(1)
  const [ max, setMax ] = useState(1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ min, max ])

  useEffect(() => {
    if (trigger.intData.length >= 2) {
      setMin(trigger.intData[0])
      setMax(trigger.intData[1])
    }
    else {
      setMin(1)
      setMax(1)
    }
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredRange
        title={LocalizeText("wiredfurni.params.usercountmin", [ "value" ], [ min.toString() ])}
        setState={setMin}
        state={min}
        sliderMin={1}
        sliderMax={50}
      />
      <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
      <WiredRange
        title={LocalizeText("wiredfurni.params.usercountmax", [ "value" ], [ max.toString() ])}
        setState={setMax}
        state={max}
        sliderMin={1}
        sliderMax={50}
      />
    </WiredConditionBase>
  )
}
