import { CfhChatlogData, CfhChatlogEvent, GetCfhChatlogMessageComposer } from "@nitrots/nitro-renderer"
import { FC, useEffect, useState } from "react"
import { SendMessageComposer } from "../../../../api"
import { IlluminaCard, IlluminaCardContent, IlluminaCardHeader } from "../../../../common"
import { useMessageEvent } from "../../../../hooks"
import { ChatlogView } from "../chatlog/ChatlogView"

interface CfhChatlogViewProps {
  issueId: number;
  onCloseClick(): void;
}

export const CfhChatlogView: FC<CfhChatlogViewProps> = props => {
  const { onCloseClick = null, issueId = null } = props
  const [chatlogData, setChatlogData] = useState<CfhChatlogData>(null)

  useMessageEvent<CfhChatlogEvent>(CfhChatlogEvent, event => {
    const parser = event.getParser()

    if (!parser || parser.data.issueId !== issueId) return

    setChatlogData(parser.data)
  })

  useEffect(() => {
    SendMessageComposer(new GetCfhChatlogMessageComposer(issueId))
  }, [issueId])

  return (
    <IlluminaCard uniqueKey="mod-tools-chatlog" className="illumina-mod-tools-chatlog">
      <IlluminaCardHeader headerText={"Issue Chatlog"} onCloseClick={onCloseClick} />
      <IlluminaCardContent>
        {chatlogData && <ChatlogView records={[chatlogData.chatRecord]} />}
      </IlluminaCardContent>
    </IlluminaCard>
  )
}
