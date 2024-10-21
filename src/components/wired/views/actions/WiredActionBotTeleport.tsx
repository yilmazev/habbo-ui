import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionBotTeleport: FC<{}> = () => {
  const [ botName, setBotName ] = useState("")
  const { trigger = null, setStringParam = null } = useWired()

  const save = () => setStringParam(botName)

  useEffect(() => {
    setBotName(trigger.stringData)
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.bot.name")}
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        maxLength={32}
      />
    </WiredActionBase>
  )
}
