import { FC, useEffect, useState } from "react"
import { GetConfiguration, LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionKickFromRoom: FC<{}> = () => {
  const [message, setMessage] = useState("")
  const { trigger = null, setStringParam = null } = useWired()

  const save = () => setStringParam(message)

  useEffect(() => {
    setMessage(trigger.stringData)
  }, [trigger])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.message")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={GetConfiguration("wired.action.kick.from.room.max.length", 100)}
      />
    </WiredActionBase>
  )
}
