import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredActionBase } from "./WiredActionBase"

export const WiredActionJoinTeam: FC<{}> = () => {
  const [ selectedTeam, setSelectedTeam ] = useState(-1)
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => setIntParams([ selectedTeam ])

  useEffect(() => {
    setSelectedTeam((trigger.intData.length > 0) ? trigger.intData[0] : 0)
  }, [ trigger ])

  return (
    <WiredActionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <p className="mb-[5px] font-bold">{LocalizeText("wiredfurni.params.team")}</p>
      <div className="grid grid-cols-2 gap-[8px]">
        {[ 1, 2, 3, 4 ].map(team => {
          return (
            <div key={team} className="flex gap-[8px]">
              <input type="radio" name="selectedTeam" id={`selectedTeam-${team}`} checked={(selectedTeam === team)} onChange={() => setSelectedTeam(team)} />
              <label htmlFor={`selectedTeam-${team}`}>{LocalizeText(`wiredfurni.params.team.${team}`)}</label>
            </div>
          )
        })}
      </div>
    </WiredActionBase>
  )
}
