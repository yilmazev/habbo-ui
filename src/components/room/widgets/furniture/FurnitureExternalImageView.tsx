import { FC } from "react"
import { IlluminaCard, IlluminaCardContent, IlluminaCardHeader } from "../../../../common"
import { useFurnitureExternalImageWidget } from "../../../../hooks"
import { CameraWidgetShowPhotoView } from "../../../camera/views/CameraWidgetShowPhotoView"

export const FurnitureExternalImageView: FC<{}> = props => {
  const { objectId = -1, currentPhotoIndex = -1, currentPhotos = null, onClose = null } = useFurnitureExternalImageWidget()

  if ((objectId === -1) || (currentPhotoIndex === -1)) return null

  return (
    <IlluminaCard uniqueKey="external-image-widget" className="illumina-external-image-widget">
      <IlluminaCardHeader headerText="" onCloseClick={onClose} />
      <IlluminaCardContent>
        <CameraWidgetShowPhotoView currentIndex={currentPhotoIndex} currentPhotos={currentPhotos} />
      </IlluminaCardContent>
    </IlluminaCard>
  )
}
