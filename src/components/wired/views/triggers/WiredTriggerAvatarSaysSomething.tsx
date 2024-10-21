import { FC, useEffect, useState } from "react"
import { GetSessionDataManager, LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredTriggerBase } from "./WiredTriggerBase"

export const WiredTriggerAvatarSaysSomething: FC<{}> = () => {
  const [ message, setMessage ] = useState("")
  const [ triggererAvatar, setTriggererAvatar ] = useState(-1)
  const { trigger = null, setStringParam = null, setIntParams = null } = useWired()

  const save = () => {
    setStringParam(message)
    setIntParams([ triggererAvatar ])
  }

  useEffect(() => {
    setMessage(trigger.stringData)
    setTriggererAvatar((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredTriggerBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.whatissaid")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
      <div>
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.picktriggerer")}</p>
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <input type="radio" name="triggererAvatar" id="triggererAvatar0" checked={(triggererAvatar === 0)} onChange={() => setTriggererAvatar(0)} />
            <label htmlFor="triggererAvatar0">{LocalizeText("wiredfurni.params.anyavatar")}</label>
          </div>
          <div className="flex gap-[8px]">
            <input type="radio" name="triggererAvatar" id="triggererAvatar1" checked={(triggererAvatar === 1)} onChange={() => setTriggererAvatar(1)} />
            <label htmlFor="triggererAvatar1">{GetSessionDataManager().userName}</label>
          </div>
        </div>
      </div>
    </WiredTriggerBase>
  )
}
