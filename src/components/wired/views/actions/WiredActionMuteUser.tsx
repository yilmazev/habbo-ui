import { FC, useEffect, useState } from "react"
import { GetConfiguration, LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredRange } from "../WiredRange"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionMuteUser: FC<{}> = () => {
  const [ time, setTime ] = useState(-1)
  const [ message, setMessage ] = useState("")
  const { trigger = null, setIntParams = null, setStringParam = null } = useWired()

  const save = () => {
    setIntParams([ time ])
    setStringParam(message)
  }

  useEffect(() => {
    setTime((trigger.intData.length > 0) ? trigger.intData[0] : 0)
    setMessage(trigger.stringData)
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.message")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={GetConfiguration("wired.action.mute.user.max.length", 100)}
      />
      <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
      <WiredRange
        title={LocalizeText("wiredfurni.params.length.minutes", [ "minutes", "dk" ], [ time.toString() ])}
        setState={setTime}
        state={time}
        sliderMin={1}
        sliderMax={10}
      />
    </WiredActionBase>
  )
}
