import { StringDataType } from "@nitrots/nitro-renderer"
import { FC, useEffect, useMemo, useState } from "react"
import { AutoGridProps, LayoutBadgeImageView, LayoutGridItem } from "../../../../../common"
import { useCatalog, useInventoryBadges } from "../../../../../hooks"

const EXCLUDED_BADGE_CODES: string[] = []

interface CatalogBadgeSelectorWidgetViewProps extends AutoGridProps {

}

export const CatalogBadgeSelectorWidgetView: FC<CatalogBadgeSelectorWidgetViewProps> = props => {
  const { columnCount = 5, ...rest } = props
  const [isVisible, setIsVisible] = useState(false)
  const [currentBadgeCode, setCurrentBadgeCode] = useState(null)
  const { currentOffer = null, setPurchaseOptions = null } = useCatalog()
  const { badgeCodes = [], activate = null, deactivate = null } = useInventoryBadges()

  const previewStuffData = useMemo(() => {
    if (!currentBadgeCode) return null

    const stuffData = new StringDataType()

    stuffData.setValue(["0", currentBadgeCode, "", ""])

    return stuffData
  }, [currentBadgeCode])

  useEffect(() => {
    if (!currentOffer) return

    setPurchaseOptions(prevValue => {
      const newValue = { ...prevValue }

      newValue.extraParamRequired = true
      newValue.extraData = ((previewStuffData && previewStuffData.getValue(1)) || null)
      newValue.previewStuffData = previewStuffData

      return newValue
    })
  }, [currentOffer, previewStuffData, setPurchaseOptions])

  useEffect(() => {
    if (!isVisible) return

    const id = activate()

    return () => deactivate(id)
  }, [isVisible, activate, deactivate])

  useEffect(() => {
    setIsVisible(true)

    return () => setIsVisible(false)
  }, [])

  return (
    <div className="illumina-scrollbar grid h-full grid-cols-3 grid-rows-[max-content] gap-[3px] overflow-auto" {...rest}>
      {badgeCodes && (badgeCodes.length > 0) && badgeCodes.map((badgeCode, index) => {
        return (
          <LayoutGridItem key={index} itemActive={(currentBadgeCode === badgeCode)} itemAbsolute={true} onClick={event => setCurrentBadgeCode(badgeCode)}>
            <LayoutBadgeImageView badgeCode={badgeCode} />
          </LayoutGridItem>
        )
      })}
    </div>
  )
}
