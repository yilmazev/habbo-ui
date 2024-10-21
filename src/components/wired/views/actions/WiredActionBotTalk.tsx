import { FC, useEffect, useState } from "react"
import { GetConfiguration, LocalizeText, WIRED_STRING_DELIMETER, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionBotTalk: FC<{}> = () => {
  const [botName, setBotName] = useState("")
  const [message, setMessage] = useState("")
  const [talkMode, setTalkMode] = useState(-1)
  const { trigger = null, setStringParam = null, setIntParams = null } = useWired()

  const save = () => {
    setStringParam(botName + WIRED_STRING_DELIMETER + message)
    setIntParams([talkMode])
  }

  useEffect(() => {
    const data = trigger.stringData.split(WIRED_STRING_DELIMETER)

    if (data.length > 0) setBotName(data[0])
    if (data.length > 1) setMessage(data[1].length > 0 ? data[1] : "")

    setTalkMode((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [trigger])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.bot.name")}
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        maxLength={32}
      />
      <div className="mt-[8px]" />
      <WiredMessage
        title={LocalizeText("wiredfurni.params.message")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={GetConfiguration("wired.action.bot.talk.max.length", 64)}
      />
      <div className="mt-[12px] flex flex-col gap-[8px]">
        <div className="flex gap-[8px]">
          <input type="radio" name="talkMode" id="talkMode-1" checked={(talkMode === 0)} onChange={() => setTalkMode(0)} />
          <label htmlFor="talkMode-1">{LocalizeText("wiredfurni.params.talk")}</label>
        </div>
        <div className="flex gap-[8px]">
          <input type="radio" name="talkMode" id="talkMode-2" checked={(talkMode === 1)} onChange={() => setTalkMode(1)} />
          <label htmlFor="talkMode-2">{LocalizeText("wiredfurni.params.shout")}</label>
        </div>
      </div>
    </WiredActionBase>
  )
}
