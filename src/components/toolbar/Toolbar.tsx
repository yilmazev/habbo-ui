import { Dispose, DropBounce, EaseOut, JumpBy, Motions, NitroToolbarAnimateIconEvent, PerkAllowancesMessageEvent, PerkEnum, Queue, Wait } from "@nitrots/nitro-renderer"
import { FC, useState } from "react"
import { CreateLinkEvent, GetConfiguration, MessengerIconState, OpenMessengerChat, VisitDesktop } from "../../api"
import { LayoutAvatarImage, LayoutItemCount, TransitionAnimation, TransitionAnimationTypes } from "../../common"
import { useAchievements, useFriends, useInventoryUnseenTracker, useMessageEvent, useMessenger, useRoomEngineEvent, useSessionInfo } from "../../hooks"
import { ToolbarMe } from "./ToolbarMe"

export const Toolbar: FC<{ isInRoom: boolean }> = ({ isInRoom }) => {
  const [isMeExpanded, setMeExpanded] = useState(false)
  const [useGuideTool, setUseGuideTool] = useState(false)
  const [isMinimizeLeft, setIsMinimizeLeft] = useState(false)
  const [isMinimizeRight, setIsMinimizeRight] = useState(false)

  const { userFigure = null } = useSessionInfo()
  const { getFullCount = 0 } = useInventoryUnseenTracker()
  const { getTotalUnseen = 0 } = useAchievements()
  const { requests = [] } = useFriends()
  const { iconState = MessengerIconState.HIDDEN } = useMessenger()

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
        <ToolbarMe useGuideTool={useGuideTool} unseenAchievementCount={getTotalUnseen} setMeExpanded={setMeExpanded} />
      </TransitionAnimation>
      <div className="flash-toolbar absolute bottom-0 left-0 z-10 flex h-[51px] w-full items-center justify-center bg-[url('/client-assets/images/1flash/toolbar/bg.png')] bg-repeat-x">
        <button className="flash-minimize absolute left-0 top-[5px] flex h-[43px] w-[14px] items-center justify-center bg-[url('/client-assets/images/1flash/toolbar/minimize-left.png')]" onClick={() => setIsMinimizeLeft(!isMinimizeLeft)}>
          {isMinimizeLeft
            ? <i className="arrow-right" />
            : <i className="arrow-left" />
          }
        </button>
        <div className="absolute left-[14px] flex h-full items-center py-[4px]">
          {!isMinimizeLeft && (
            <>
              {isInRoom
                ? <button className="ml-[13px]" onClick={() => VisitDesktop()}>
                  <i className="icon-toolbar icon-hotelview" />
                </button>
                : <button className="ml-[11px]" onClick={() => CreateLinkEvent("navigator/goto/home")}>
                  <i className="icon-toolbar icon-homeroom" />
                </button>
              }
              <button className="ml-[15px]" onClick={() => CreateLinkEvent("navigator/toggle")}>
                <i className="icon-toolbar icon-rooms" />
              </button>
              {gameCenterEnabled &&
                <button className="ml-[13px]" onClick={() => CreateLinkEvent("games/show")}>
                  <i className="icon-toolbar icon-gamecenter" />
                </button>
              }
            </>
          )}
          <button className="ml-[13px]" onClick={() => CreateLinkEvent("catalog/toggle")}>
            <i className="icon-toolbar icon-shop" />
          </button>
          {(isInRoom || isMinimizeLeft) &&
            <button className="ml-[13px]" onClick={() => CreateLinkEvent("inventory/toggle")}>
              <i className="icon-toolbar icon-inventory">
                {(getFullCount > 0) && <LayoutItemCount count={getFullCount} />}
              </i>
            </button>
          }
          <button className="icon-toolbar ml-[10px] h-[40px] w-[44px] overflow-hidden" onClick={() => setMeExpanded(!isMeExpanded)}>
            <LayoutAvatarImage figure={userFigure} direction={2} className="!absolute bottom-0 !h-[100px] w-full !bg-[left_-24px_top_20px]" />
            {(getTotalUnseen > 0) && <LayoutItemCount count={getTotalUnseen} />}
          </button>
          {(isInRoom) &&
            <button className="ml-[11px] mt-[6px]" onClick={() => CreateLinkEvent("camera/toggle")}>
              <i className="icon-toolbar icon-camera" />
            </button>
          }
          <div className="mx-[16px] h-[40px] w-px bg-[#454442]" />
        </div>
        <div id="toolbar-chat-input-container" className="translate-y-[-62px]" />
        <div className="absolute right-[14px] flex h-full items-center py-[4px]">
          <div className="mx-[16px] h-[40px] w-px bg-[#454442]" />
          <button onClick={() => CreateLinkEvent("friends/toggle")}>
            <i className="icon-toolbar icon-friends mr-[15px]">
              {(requests.length > 0) && <LayoutItemCount count={requests.length} />}
            </i>
          </button>
          <button onClick={() => CreateLinkEvent("friends/toggle")}>
            <i className="icon-toolbar icon-search mr-[10px]" />
          </button>
          <div className="mr-[21px] h-[31px] w-[26px]">
            {((iconState === MessengerIconState.SHOW) || (iconState === MessengerIconState.UNREAD)) &&
              <button onClick={() => OpenMessengerChat()}>
                <i className={`icon-toolbar icon-messages ${(iconState === MessengerIconState.UNREAD) && "unread"}`} />
              </button>
            }
          </div>
          <div id="toolbar-friend-bar-container" className={`${isMinimizeRight && "hidden"}`} />
        </div>
        <button className="flash-minimize absolute right-0 top-[5px] flex h-[43px] w-[14px] items-center justify-center bg-[url('/client-assets/images/1flash/toolbar/minimize-right.png')]" onClick={() => setIsMinimizeRight(!isMinimizeRight)}>
          {isMinimizeRight
            ? <i className="arrow-left" />
            : <i className="arrow-right" />
          }
        </button>
      </div >
    </>
  )
}
