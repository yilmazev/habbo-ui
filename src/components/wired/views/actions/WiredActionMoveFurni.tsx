import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredActionBase } from "./WiredActionBase"

const directionOptions: { value: number }[] = [
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 1
  }
]

const rotationOptions: { value: number }[] = [
  {
    value: 0
  },
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  }
]

export const WiredActionMoveFurni: FC<{}> = () => {
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
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.movefurni")}</p>
        <div className="mb-2 flex gap-[9px]">
          <input type="radio" name="selectedTeam" id="movement-0" checked={(movement === 0)} onChange={() => setMovement(0)} />
          <label htmlFor="movement-0">{LocalizeText("wiredfurni.params.movefurni.0")}</label>
        </div>
        <div className="flex flex-wrap items-center gap-x-[13px] gap-y-2">
          {directionOptions.map((option, index) => {
            return (
              <div key={index} className="move-furni flex gap-[4px]">
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
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.rotatefurni")}</p>
        <div className="flex flex-col gap-[8px]">
          {rotationOptions.map(option => {
            return (
              <div key={option.value} className="flex gap-[9px]">
                <input type="radio" name="rotation" id={`rotation-${option.value}`} checked={(rotation === option.value)} onChange={() => setRotation(option.value)} />
                <label className="flex items-center gap-[7px]" htmlFor={`rotation-${option.value}`}>
                  <i className={`icon-rotation-${option.value}`} />
                  {LocalizeText(`wiredfurni.params.rotatefurni.${option.value}`)}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </WiredActionBase>
  )
}
