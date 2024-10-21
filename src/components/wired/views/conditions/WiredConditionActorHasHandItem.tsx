import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { IOption, Select } from "../../../../common"
import { useWired } from "../../../../hooks"
import { WiredConditionBase } from "./WiredConditionBase"

const ALLOWED_HAND_ITEM_IDS: number[] = [ 2, 5, 7, 8, 9, 10, 27 ]

export const WiredConditionActorHasHandItem: FC<{}> = () => {
  const [ handItemId, setHandItemId ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ handItemId ])

  useEffect(() => {
    setHandItemId((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.handitem")}</p>
      <Select
        options={ALLOWED_HAND_ITEM_IDS.map(value => ({
          value: value.toString(),
          label: LocalizeText(`handitem${value}`)
        }))}
        value={handItemId.toString()}
        onChange={(selectedOption: IOption) => setHandItemId(parseInt(selectedOption.value))}
      />
    </WiredConditionBase >
  )
}
