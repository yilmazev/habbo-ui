import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredTriggerBase } from "./WiredTriggerBase"

export const WiredTriggerAvatarEnterRoom: FC<{}> = () => {
  const [ username, setUsername ] = useState("")
  const [ avatarMode, setAvatarMode ] = useState(0)
  const { trigger = null, setStringParam = null } = useWired()

  const save = () => setStringParam((avatarMode === 1) ? username : "")

  useEffect(() => {
    setUsername(trigger.stringData)
    setAvatarMode(trigger.stringData ? 1 : 0)
  }, [ trigger ])

  return (
    <WiredTriggerBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <div>
        <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.picktriggerer")}</p>
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <input type="radio" name="avatarMode" id="avatarMode0" checked={(avatarMode === 0)} onChange={() => setAvatarMode(0)} />
            <label htmlFor="avatarMode0">{LocalizeText("wiredfurni.params.anyavatar")}</label>
          </div>
          <div className="flex gap-[8px]">
            <input type="radio" name="avatarMode" id="avatarMode1" checked={(avatarMode === 1)} onChange={() => setAvatarMode(1)} />
            <label htmlFor="avatarMode1">{LocalizeText("wiredfurni.params.certainavatar")}</label>
          </div>
        </div>
        {(avatarMode === 1) &&
          <div className="mt-[5px] pl-[20px]">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>}
      </div>
    </WiredTriggerBase>
  )
}
