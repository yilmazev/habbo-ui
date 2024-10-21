import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionBotFollowAvatar: FC<{}> = () => {
  const [ botName, setBotName ] = useState("")
  const [ followMode, setFollowMode ] = useState(-1)
  const { trigger = null, setStringParam = null, setIntParams = null } = useWired()

  const save = () => {
    setStringParam(botName)
    setIntParams([ followMode ])
  }

  useEffect(() => {
    setBotName(trigger.stringData)
    setFollowMode((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.bot.name")}
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        maxLength={32}
      />
      <div className="mt-[12px] flex flex-col gap-[8px]">
        <div className="flex gap-[9px]">
          <input type="radio" name="followMode-1" id="followMode-1" checked={(followMode === 1)} onChange={() => setFollowMode(1)} />
          <label htmlFor="followMode-1">{LocalizeText("wiredfurni.params.start.following")}</label>
        </div>
        <div className="flex gap-[9px]">
          <input type="radio" name="followMode-2" id="followMode-2" checked={(followMode === 0)} onChange={() => setFollowMode(0)} />
          <label htmlFor="followMode-2">{LocalizeText("wiredfurni.params.stop.following")}</label>
        </div>
      </div>
    </WiredActionBase>
  )
}
