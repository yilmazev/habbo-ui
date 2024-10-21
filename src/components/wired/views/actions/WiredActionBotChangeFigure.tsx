import { FC, useEffect, useState } from "react"
import { GetSessionDataManager, LocalizeText, WIRED_STRING_DELIMETER, WiredFurniType } from "../../../../api"
import { Button, LayoutAvatarImage } from "../../../../common"
import { useWired } from "../../../../hooks"
import { WiredMessage } from "../WiredMessage"
import { WiredActionBase } from "./WiredActionBase"

const DEFAULT_FIGURE: string = "hd-180-1.ch-210-66.lg-270-82.sh-290-81"

export const WiredActionBotChangeFigure: FC<{}> = () => {
  const [ botName, setBotName ] = useState("")
  const [ figure, setFigure ] = useState("")
  const { trigger = null, setStringParam = null } = useWired()

  const save = () => setStringParam((botName + WIRED_STRING_DELIMETER + figure))

  useEffect(() => {
    const data = trigger.stringData.split(WIRED_STRING_DELIMETER)

    if (data.length > 0) setBotName(data[0])
    if (data.length > 1) setFigure(data[1].length > 0 ? data[1] : DEFAULT_FIGURE)
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <WiredMessage
        title={LocalizeText("wiredfurni.params.bot.name")}
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        maxLength={32}
      />
      <div className="flex h-[128px] items-end">
        <LayoutAvatarImage figure={figure} direction={2} className="!bg-[0_9px]" />
        <Button onClick={() => setFigure(GetSessionDataManager().figure)}>{LocalizeText("wiredfurni.params.capture.figure")}</Button>
      </div>
    </WiredActionBase>
  )
}
