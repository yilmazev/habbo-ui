import { FC, useEffect, useState } from "react"
import { LocalizeText, WiredDateToString, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredConditionBase } from "./WiredConditionBase"

export const WiredConditionDateRange: FC<{}> = () => {
  const [ startDate, setStartDate ] = useState("")
  const [ endDate, setEndDate ] = useState("")
  const { trigger = null, setIntParams = null } = useWired()

  const save = () => {
    let startDateMili = 0
    let endDateMili = 0

    const startDateInstance = new Date(startDate)
    const endDateInstance = new Date(endDate)

    if (startDateInstance && endDateInstance) {
      startDateMili = startDateInstance.getTime() / 1000
      endDateMili = endDateInstance.getTime() / 1000
    }

    setIntParams([ startDateMili, endDateMili ])
  }

  useEffect(() => {
    if (trigger.intData.length >= 2) {
      let startDate = new Date()
      let endDate = new Date()

      if (trigger.intData[0] > 0) startDate = new Date((trigger.intData[0] * 1000))

      if (trigger.intData[1] > 0) endDate = new Date((trigger.intData[1] * 1000))

      setStartDate(WiredDateToString(startDate))
      setEndDate(WiredDateToString(endDate))
    }
  }, [ trigger ])

  return (
    <WiredConditionBase requiresFurni={WiredFurniType.STUFF_SELECTION_OPTION_NONE} hasSpecialInput={true} save={save}>
      <div className="mb-[7px] flex justify-between">
        <p className="font-bold">{LocalizeText("wiredfurni.params.startdate")}</p>
        <input type="text" className="max-w-[94px]" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="flex justify-between">
        <p className="font-bold">{LocalizeText("wiredfurni.params.enddate")}</p>
        <input type="text" className="max-w-[94px]" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
    </WiredConditionBase>
  )
}
