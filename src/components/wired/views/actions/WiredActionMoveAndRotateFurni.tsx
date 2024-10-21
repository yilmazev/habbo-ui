import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
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

const rotationOptions: number[] = [ 0, 1, 2, 3, 4, 5, 6 ]

export const WiredActionMoveAndRotateFurni: FC<{}> = () => {
  const [ movement, setMovement ] = useState(-1)
  const [ rotation, setRotation ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ movement, rotation ])

  useEffect(() => {
    if (trigger.intData.length >= 2) {
      setMovement(trigger.intData[0])
      setRotation(trigger.intData[1])
    }
    else {
      setMovement(-1)
      setRotation(-1)
    }
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_BY_TYPE_OR_FROM_CONTEXT} hasSpecialInput={true} save={save}>
      <div>
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.startdir")}</p>
        <div className="flex items-center gap-[13px]">
          {directionOptions.map((option, index) => {
            return (
              <div key={index} className="move-and-rotate-furni flex gap-[4px]">
                <input type="radio" name="movement" id={`movement-${option.value}`} checked={(movement === option.value)} onChange={() => setMovement(option.value)} />
                <label htmlFor={`movement-${option.value}`}>
                  <i className={`icon-direction icon-direction-${option.value}`} />
                </label>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
      <div>
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.turn")}</p>
        <div className="flex flex-col gap-[8px]">
          {rotationOptions.map((option, index) => {
            return (
              <div key={index} className="flex gap-[9px]">
                <input type="radio" name="rotation" id={`rotation-${option}`} checked={(rotation === option)} onChange={() => setRotation(option)} />
                <label htmlFor={`rotation-${option}`}>
                  <p>{LocalizeText(`wiredfurni.params.turn.${option}`)}</p>
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </WiredActionBase>
  )
}
