import { GroupInformationEvent, GroupInformationParser } from "@nitrots/nitro-renderer"
import { FC, useState } from "react"
import { LocalizeText } from "../../../api"
import { IlluminaCard, IlluminaCardContent, IlluminaCardHeader } from "../../../common"
import { useMessageEvent } from "../../../hooks"
import { GroupInformationView } from "./GroupInformationView"

export const GroupInformationStandaloneView: FC<{}> = props => {
  const [groupInformation, setGroupInformation] = useState<GroupInformationParser>(null)

  useMessageEvent<GroupInformationEvent>(GroupInformationEvent, event => {
    const parser = event.getParser()

    if ((groupInformation && (groupInformation.id === parser.id)) || parser.flag) setGroupInformation(parser)
  })

  if (!groupInformation) return null

  return (
    <IlluminaCard uniqueKey="group-information-standalone" className="illumina-group-information-standalone w-[363px]" customZIndex={500}>
      <IlluminaCardHeader headerText={LocalizeText("group.window.title")} onCloseClick={event => setGroupInformation(null)} />
      <IlluminaCardContent>
        <GroupInformationView groupInformation={groupInformation} onClose={() => setGroupInformation(null)} />
      </IlluminaCardContent>
    </IlluminaCard>
  )
}
