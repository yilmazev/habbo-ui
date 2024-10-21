import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredRange } from "../WiredRange"
import { WiredActionBase } from "./WiredActionBase"

const directionOptions: { value: number }[] = [
  {
    value: 0
  },
  {
    value: 2
  },
  {
    value: 4
  },
  {
    value: 6
  }
]

export const WiredActionMoveFurniTo: FC<{}> = () => {
  const [ spacing, setSpacing ] = useState(-1)
  const [ movement, setMovement ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ movement, spacing ])

  useEffect(() => {
    if (trigger.intData.length >= 2) {
      setSpacing(trigger.intData[1])
      setMovement(trigger.intData[0])
    }
    else {
      setSpacing(-1)
      setMovement(-1)
    }
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_OR_BY_TYPE} hasSpecialInput={true} save={save}>
      <div>
        <WiredRange
          title={LocalizeText("wiredfurni.params.emptytiles", [ "tiles" ], [ spacing.toString() ])}
          setState={setSpacing}
          state={spacing}
          sliderMin={1}
          sliderMax={5}
        />
      </div>
      <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
      <div>
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.startdir")}</p>
        <div className="flex items-center gap-[8px]">
          {directionOptions.map((option, index) => {
            return (
              <div key={index} className="move-furni-to flex gap-[4px]">
                <input type="radio" name="movement" id={`movement-${option.value}`} checked={(movement === option.value)} onChange={() => setMovement(option.value)} />
                <label htmlFor={`movement-${option.value}`}>
                  <i className={`icon-direction icon-direction-${option.value}`} />
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </WiredActionBase>
  )
}
