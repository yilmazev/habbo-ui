import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { IOption, Select } from "../../../../common"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredActionBase } from "./WiredActionBase"

const ALLOWED_HAND_ITEM_IDS: number[] = [ 2, 5, 7, 8, 9, 10, 27 ]

export const WiredActionBotGiveHandItem: FC<{}> = () => {
  const [ botName, setBotName ] = useState("")
  const [ handItemId, setHandItemId ] = useState(-1)
  const { trigger = null, setStringParam = null, setIntParams = null } = useWired()

  const save = () => {
    setStringParam(botName)
    setIntParams([ handItemId ])
  }

  useEffect(() => {
    setBotName(trigger.stringData)
    setHandItemId((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.bot.name")}
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        maxLength={32}
      />
      <div className="mt-[8px]">
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.handitem")}</p>
        <Select
          options={[
            { value: "0", label: LocalizeText("wiredfurni.tooltip.bot.handitem") },

            ...ALLOWED_HAND_ITEM_IDS.map((value) => ({
              value: value.toString(),
              label: LocalizeText(`handitem${value}`)
            }))
          ]}
          value={handItemId.toString()}
          onChange={(selectedOption: IOption) => setHandItemId(parseInt(selectedOption.value))}
        />
      </div>
    </WiredActionBase>
  )
}
