import { ChatRecordData, GetUserChatlogMessageComposer, UserChatlogEvent } from "@nitrots/nitro-renderer"
import { FC, useEffect, useState } from "react"
import { SendMessageComposer } from "../../../../api"
import { DraggableWindowPosition, IlluminaCard, IlluminaCardContent, IlluminaCardHeader } from "../../../../common"
import { useMessageEvent } from "../../../../hooks"
import { ChatlogView } from "../chatlog/ChatlogView"

interface ModToolsUserChatlogViewProps {
  userId: number;
  onCloseClick: () => void;
}

export const ModToolsUserChatlogView: FC<ModToolsUserChatlogViewProps> = props => {
  const { userId = null, onCloseClick = null } = props
  const [userChatlog, setUserChatlog] = useState<ChatRecordData[]>(null)
  const [username, setUsername] = useState(null)

  useMessageEvent<UserChatlogEvent>(UserChatlogEvent, event => {
    const parser = event.getParser()

    if (!parser || parser.data.userId !== userId) return

    setUsername(parser.data.username)
    setUserChatlog(parser.data.roomChatlogs)
  })

  useEffect(() => {
    SendMessageComposer(new GetUserChatlogMessageComposer(userId))
  }, [userId])

  return (
    <IlluminaCard uniqueKey="mod-tools-chatlog" className="illumina-mod-tools-chatlog" windowPosition={DraggableWindowPosition.TOP_LEFT}>
      <IlluminaCardHeader headerText={`User Chatlog: ${username || ""}`} onCloseClick={onCloseClick} />
      <IlluminaCardContent>
        {userChatlog &&
          <ChatlogView records={userChatlog} />}
      </IlluminaCardContent>
    </IlluminaCard>
  )
}
