import { Dispose, DropBounce, EaseOut, JumpBy, Motions, NitroToolbarAnimateIconEvent, PerkAllowancesMessageEvent, PerkEnum, Queue, Wait } from "@nitrots/nitro-renderer"
import { FC, useState } from "react"
import { CreateLinkEvent, GetConfiguration, MessengerIconState, VisitDesktop } from "../../api"
import { LayoutAvatarImage, LayoutItemCountView, TransitionAnimation, TransitionAnimationTypes } from "../../common"
import { useAchievements, useFriends, useInventoryUnseenTracker, useMessageEvent, useMessenger, useRoomEngineEvent, useSessionInfo } from "../../hooks"
import { ToolbarMeView } from "./ToolbarMeView"

export const Toolbar: FC<{ isInRoom: boolean }> = ({ isInRoom }) => {
  const [ isMeExpanded, setMeExpanded ] = useState(false)
  const [ useGuideTool, setUseGuideTool ] = useState(false)
  const [ isMinimizeLeft, setIsMinimizeLeft ] = useState(false)
  const [ isMinimizeRight, setIsMinimizeRight ] = useState(false)

  const { userFigure = null } = useSessionInfo()
  const { getFullCount = 0 } = useInventoryUnseenTracker()
  const { getTotalUnseen = 0 } = useAchievements()
  const { iconState = MessengerIconState.HIDDEN } = useMessenger()
  const { requests = [] } = useFriends()

  const gameCenterEnabled: boolean = GetConfiguration("game.center.enabled")

  useMessageEvent<PerkAllowancesMessageEvent>(PerkAllowancesMessageEvent, (e) => {
    const parser = e.getParser()

    setUseGuideTool(parser.isAllowed(PerkEnum.USE_GUIDE_TOOL))
  })

  useRoomEngineEvent<NitroToolbarAnimateIconEvent>(NitroToolbarAnimateIconEvent.ANIMATE_ICON, (e) => {
    const animationIconToToolbar = (iconName: string, image: HTMLImageElement, x: number, y: number) => {
      const target = (document.body.getElementsByClassName(iconName)[0] as HTMLElement)

      if (!target) return

      image.className = "toolbar-icon-animation"
      image.style.visibility = "visible"
      image.style.left = (x + "px")
      image.style.top = (y + "px")

      document.body.append(image)

      const targetBounds = target.getBoundingClientRect()
      const imageBounds = image.getBoundingClientRect()

      const left = (imageBounds.x - targetBounds.x)
      const top = (imageBounds.y - targetBounds.y)
      const squared = Math.sqrt(((left * left) + (top * top)))
      const wait = (500 - Math.abs(((((1 / squared) * 100) * 500) * 0.5)))
      const height = 20

      const motionName = (`ToolbarBouncing[${iconName}]`)

      if (!Motions.getMotionByTag(motionName)) {
        Motions.runMotion(new Queue(new Wait((wait + 8)), new DropBounce(target, 400, 12))).tag = motionName
      }

      const motion = new Queue(new EaseOut(new JumpBy(image, wait, ((targetBounds.x - imageBounds.x) + height), (targetBounds.y - imageBounds.y), 100, 1), 1), new Dispose(image))

      Motions.runMotion(motion)
    }

    animationIconToToolbar("icon-inventory", e.image, e.x, e.y)
  })

  return (
    <>
      <TransitionAnimation type={TransitionAnimationTypes.FADE_IN} inProp={isMeExpanded} timeout={0}>
        <ToolbarMeView useGuideTool={useGuideTool} unseenAchievementCount={getTotalUnseen} setMeExpanded={setMeExpanded} />
      </TransitionAnimation>
      <div className="flash-toolbar absolute bottom-0 left-0 z-10 flex h-[51px] w-full items-center justify-center bg-[url('/client-assets/images/1flash/toolbar/bg.png')] bg-repeat-x">
        <button className="flash-minimize absolute left-0 top-[5px] flex h-[43px] w-[14px] items-center justify-center bg-[url('/client-assets/images/1flash/toolbar/minimize-left.png')]">
          {isMinimizeLeft
            ? <i className="arrow-right" />
            : <i className="arrow-left" />
          }
        </button>
        <div className="absolute left-0 flex h-full items-center py-[4px]">
          {isInRoom
            ? <div className="ml-[27px]" onClick={() => VisitDesktop()}>
              <i className="icon-toolbar icon-hotelview mr-[17px]" />
            </div>
            : <div className="ml-[25px]" onClick={() => CreateLinkEvent("navigator/goto/home")}>
              <i className="icon-toolbar icon-homeroom mr-[15px]" />
            </div>
          }
          <div onClick={() => CreateLinkEvent("navigator/toggle")}>
            <i className="icon-toolbar icon-rooms mr-[13px]" />
          </div>
          {gameCenterEnabled &&
            <div onClick={() => CreateLinkEvent("games/show")}>
              <i className="icon-toolbar icon-gamecenter mr-[13px]" />
            </div>
          }
          <div onClick={() => CreateLinkEvent("catalog/toggle")}>
            <i className="icon-toolbar icon-shop mr-[13px]" />
          </div>
          {isInRoom &&
            <div onClick={() => CreateLinkEvent("inventory/toggle")}>
              <i className="icon-toolbar icon-inventory mr-[10px]">
                {(getFullCount > 0) && <LayoutItemCountView count={getFullCount} />}
              </i>
            </div>
          }
          <div className="icon-toolbar h-[40px] w-[44px] overflow-hidden" onClick={() => setMeExpanded(!isMeExpanded)}>
            <LayoutAvatarImage figure={userFigure} direction={2} className="!absolute bottom-0 !h-[100px] w-full !bg-[left_-24px_top_20px]" />
            {(getTotalUnseen > 0) && <LayoutItemCountView count={getTotalUnseen} className="-right-2 -top-2" />}
          </div>
          {(isInRoom) && <div onClick={() => CreateLinkEvent("camera/toggle")}>
            <i className="icon-toolbar icon-camera ml-[11px] mt-[6px]" />
          </div>
          }
          <div className="mx-[16px] h-[40px] w-px bg-[#454442]" />
        </div>
      </div >
    </>
  )
}
