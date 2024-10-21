import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionFurniHasNotFurniOn: FC<{}> = () => {
  const [ notRequireAll, setNotRequireAll ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ notRequireAll ])

  useEffect(() => {
    setNotRequireAll((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID} hasSpecialInput={true} save={save}>
      <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.not_requireall")}</p>
      <div className="flex flex-col gap-[8px]">
        {[ 0, 1 ].map(value => {
          return (
            <div key={value} className="flex gap-[9px]">
              <input
                type="radio"
                name="notRequireAll"
                id={`notRequireAll${value}`}
                checked={(notRequireAll === value)}
                onChange={() => setNotRequireAll(value)}
                className="shrink-0"
              />
              <p>{LocalizeText(`wiredfurni.params.not_requireall.${value}`)}</p>
            </div>
          )
        })}
      </div>
    </WiredConditionBase>
  )
}
