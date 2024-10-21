import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredTriggerBase } from "./WiredTriggerBase"

export const WiredTriggerBotReachedStuff: FC<{}> = () => {
  const [ botName, setBotName ] = useState("")
  const { trigger = null, setStringParam = null } = useWired()

  const save = () => setStringParam(botName)

  useEffect(() => {
    setBotName(trigger.stringData)
  }, [ trigger ])

  return (
    <WiredTriggerBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_BY_ID_OR_BY_TYPE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.bot.name")}
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        maxLength={32}
      />
    </WiredTriggerBase>
  )
}
