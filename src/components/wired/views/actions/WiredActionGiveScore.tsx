import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredRange } from "../WiredRange"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionGiveScore: FC<{}> = () => {
  const [ points, setPoints ] = useState(1)
  const [ time, setTime ] = useState(1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ points, time ])

  useEffect(() => {
    if (trigger.intData.length >= 2) {
      setPoints(trigger.intData[0])
      setTime(trigger.intData[1])
    }
    else {
      setPoints(1)
      setTime(1)
    }
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredRange
        title={LocalizeText("wiredfurni.params.setpoints", [ "points" ], [ points.toString() ])}
        setState={setPoints}
        state={points}
        sliderMin={1}
        sliderMax={100}
      />
      <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
      <WiredRange
        title={LocalizeText("wiredfurni.params.settimesingame", [ "times" ], [ time.toString() ])}
        setState={setTime}
        state={time}
        sliderMin={1}
        sliderMax={10}
      />
    </WiredActionBase>
  )
}
