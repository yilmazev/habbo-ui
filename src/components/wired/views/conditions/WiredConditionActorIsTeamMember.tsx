import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredConditionBase } from "./WiredConditionBase"

const teamIds: number[] = [ 1, 2, 3, 4 ]

export const WiredConditionActorIsTeamMember: FC<{}> = () => {
  const [ selectedTeam, setSelectedTeam ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ selectedTeam ])

  useEffect(() => {
    setSelectedTeam((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.team")}</p>
      <div className="grid grid-cols-2 gap-[8px]">
        {teamIds.map(value => {
          return (
            <div key={value} className="flex gap-[8px]">
              <input type="radio" name="selectedTeam" id={`selectedTeam-${value}`} checked={(selectedTeam === value)} onChange={() => setSelectedTeam(value)} />
              <label htmlFor={`selectedTeam-${value}`}>{LocalizeText(`wiredfurni.params.team.${value}`)}</label>
            </div>
          )
        })}
      </div>
    </WiredConditionBase>
  )
}
