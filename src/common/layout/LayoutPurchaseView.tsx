import { ColorConverter, GetTicker, IRoomRenderingCanvas, RoomPreviewer, TextureUtils } from "@nitrots/nitro-renderer"
import { FC, ReactNode, useEffect, useRef, useState } from "react"

export interface LayoutPurchaseViewProps
{
    roomPreviewer: RoomPreviewer;
    height?: number;
    children?: ReactNode;
}

export const LayoutPurchaseView: FC<LayoutPurchaseViewProps> = props =>
{
  const { roomPreviewer = null, height = 0, children = null } = props
  const [ renderingCanvas, setRenderingCanvas ] = useState<IRoomRenderingCanvas>(null)
  const elementRef = useRef<HTMLDivElement>()

  useEffect(() =>
  {
    if(!roomPreviewer) return

    const update = (time: number) =>
    {
      if(!roomPreviewer || !renderingCanvas || !elementRef.current) return
        
      roomPreviewer.updatePreviewRoomView()

      if(!renderingCanvas.canvasUpdated) return

      elementRef.current.style.backgroundImage = `url(${ TextureUtils.generateImageUrl(renderingCanvas.master) })`
    }

    if(!renderingCanvas)
    {
      if(elementRef.current && roomPreviewer)
      {
        const computed = document.defaultView.getComputedStyle(elementRef.current, null)

        let backgroundColor = computed.backgroundColor

        backgroundColor = ColorConverter.rgbStringToHex(backgroundColor)
        backgroundColor = backgroundColor.replace("#", "0x")

        roomPreviewer.backgroundColor = parseInt(backgroundColor, 16)

        const width = elementRef.current.parentElement.clientWidth
                
        roomPreviewer.getRoomCanvas(width, height)

        const canvas = roomPreviewer.getRenderingCanvas()

        setRenderingCanvas(canvas)

        canvas.canvasUpdated = false

        update(-1)
      }
    }

    GetTicker().add(update)

    const resizeObserver = new ResizeObserver(() =>
    {
      if(!roomPreviewer || !elementRef.current) return

      const width = elementRef.current.parentElement.offsetWidth

      roomPreviewer.modifyRoomCanvas(width, height)

      update(-1)
    })
        
    resizeObserver.observe(elementRef.current)

    return () =>
    {
      resizeObserver.disconnect()

      GetTicker().remove(update)
    }

  }, [ renderingCanvas, roomPreviewer, elementRef, height ])

  return (
    <>
      <div ref={ elementRef } className="size-full bg-[#e2e2e2] bg-no-repeat dark:bg-[#27251F]" style={ { height } } />
      { children }
    </>
  )
}
