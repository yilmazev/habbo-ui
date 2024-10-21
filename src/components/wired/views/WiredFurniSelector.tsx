import { FC } from "react"
import { LocalizeText } from "../../../api"
import { useWired } from "../../../hooks"

export const WiredFurniSelector: FC<{}> = () => {
  const { trigger = null, furniIds = [] } = useWired()

  return (
    <div>
      <p className="mb-[3px] font-bold">{LocalizeText("wiredfurni.pickfurnis.caption", [ "count", "limit" ], [ furniIds.length.toString(), trigger.maximumItemSelectionCount.toString() ])}</p>
      <p>{LocalizeText("wiredfurni.pickfurnis.desc")}</p>
    </div>
  )
}
