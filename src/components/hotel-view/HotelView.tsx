import { NitroConfiguration, RoomSessionEvent } from "@nitrots/nitro-renderer"
import { FC, useState } from "react"
import { GetConfiguration } from "../../api"
import { LayoutAvatarImage } from "../../common"
import { useRoomSessionManagerEvent, useSessionInfo } from "../../hooks"

const widgetSlotCount = 7

export const HotelView: FC<{}> = () => {
  const [ isVisible, setIsVisible ] = useState(true)
  const { userFigure = null } = useSessionInfo()

  useRoomSessionManagerEvent<RoomSessionEvent>([
    RoomSessionEvent.CREATED,
    RoomSessionEvent.ENDED ], event => {
    switch (event.type) {
    case RoomSessionEvent.CREATED:
      setIsVisible(false)
      return
    case RoomSessionEvent.ENDED:
      setIsVisible(event.openLandingView)
      return
    }
  })

  if (!isVisible) return null

  const background = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["background"])
  const drape = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["drape"])
  const left = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["left"])
  const right = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["right"])

  return (
    <div className="h-screen w-full bg-[#121212]">
      <div className="fixed block h-[calc(100%_-_51px)] w-full bg-[#9AE2F2]">
        <div className="absolute top-0 size-full bg-bottom bg-repeat" style={{ backgroundImage: `url(${background})` }} />
        <div className="absolute left-[106px] top-0 z-10 size-full bg-no-repeat" style={{ backgroundImage: `url(${drape})` }} />
        <div className=" absolute bottom-0 right-0 size-full bg-right-bottom bg-no-repeat" style={{ backgroundImage: `url(${right})` }} />
        <div className="absolute inset-0 bg-[left_bottom_-13px] bg-no-repeat" style={{ backgroundImage: `url(${left})` }}>
          {GetConfiguration("hotelview")["show.avatar"] && (
            <div className="absolute bottom-[14px] left-[110px] z-20">
              <LayoutAvatarImage figure={userFigure} direction={2} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
