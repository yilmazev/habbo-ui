import { MouseEventType, RoomObjectCategory } from "@nitrots/nitro-renderer"
import { FC, useEffect, useRef } from "react"
import { CreateLinkEvent, DispatchUiEvent, GetConfiguration, GetRoomEngine, GetRoomSession, GetSessionDataManager, GetUserProfile, LocalizeText } from "../../api"
import { LayoutItemCount } from "../../common"
import { GuideToolEvent } from "../../events"

interface IToolbarMe {
  useGuideTool: boolean
  unseenAchievementCount: number
  setMeExpanded: (isMeExpanded: boolean) => void
}

export const ToolbarMe: FC<IToolbarMe> = ({ useGuideTool = false, unseenAchievementCount = 0, setMeExpanded = null }) => {
  const elementRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const roomSession = GetRoomSession()

    if (!roomSession) return

    GetRoomEngine().selectRoomObject(roomSession.roomId, roomSession.ownRoomIndex, RoomObjectCategory.UNIT)
  }, [])

  useEffect(() => {
    const onClick = () => setMeExpanded(false)

    document.addEventListener("click", onClick)

    return () => document.removeEventListener(MouseEventType.MOUSE_CLICK, onClick)
  }, [setMeExpanded])

  return (
    <div ref={elementRef} className="flash-toolbar-me absolute bottom-[46px] left-[3px] z-20 flex items-center gap-[12px] px-[15px] pb-[6px] pt-[5px]">
      {(GetConfiguration("guides.enabled") && useGuideTool) &&
        <div className="group w-[57px] flex cursor-pointer flex-col items-center justify-center" onClick={() => DispatchUiEvent(new GuideToolEvent(GuideToolEvent.TOGGLE_GUIDE_TOOL))}>
          <i className="icon-helper-tool grayscale group-hover:grayscale-0" />
          <p className="mt-[4px] max-w-[50px] truncate text-clip text-[10px] text-[#FEFEFE] group-hover:text-[#20C4E6]">{LocalizeText("widget.memenu.guide")}</p>
        </div>}
      <div className="group w-[57px] flex cursor-pointer flex-col items-center justify-center" onClick={() => CreateLinkEvent("achievements/toggle")}>
        <div className="relative h-[30px] w-[31px]">
          <i className="icon-achievements grayscale group-hover:grayscale-0" />
          {(unseenAchievementCount > 0) &&
            <LayoutItemCount count={unseenAchievementCount} />}
        </div>
        <p className="mt-[4px] truncate text-clip text-[10px] text-[#FEFEFE] group-hover:text-[#20C4E6]">{LocalizeText("widget.memenu.achievements")}</p>
      </div>
      <div className="group w-[57px] flex cursor-pointer flex-col items-center justify-center" onClick={() => GetUserProfile(GetSessionDataManager().userId)}>
        <i className="icon-my-profile grayscale group-hover:grayscale-0" />
        <p className="mt-[4px] truncate text-clip text-[10px] text-[#FEFEFE] group-hover:text-[#20C4E6]">{LocalizeText("widget.memenu.profile")}</p>
      </div>
      <div className="group w-[57px] flex cursor-pointer flex-col items-center justify-center" onClick={() => CreateLinkEvent("navigator/search/myworld_view")}>
        <i className="icon-my-rooms grayscale group-hover:grayscale-0" />
        <p className="mt-[4px] truncate text-clip text-[10px] text-[#FEFEFE] group-hover:text-[#20C4E6]">{LocalizeText("widget.memenu.myrooms")}</p>
      </div>
      <div className="group w-[57px] flex cursor-pointer flex-col items-center justify-center" onClick={() => CreateLinkEvent("avatar-editor/toggle")}>
        <i className="icon-clothes grayscale group-hover:grayscale-0" />
        <p className="mt-[4px] truncate text-clip text-[10px] text-[#FEFEFE] group-hover:text-[#20C4E6]">{LocalizeText("widget.memenu.editavatar")}</p>
      </div>
      <div className="group w-[57px] flex cursor-pointer flex-col items-center justify-center">
        <i className="icon-forums grayscale group-hover:grayscale-0" />
        <p className="mt-[4px] truncate text-clip text-[10px] text-[#FEFEFE] group-hover:text-[#20C4E6]">{LocalizeText("widget.memenu.forums")}</p>
      </div>
    </div>
  )
}
