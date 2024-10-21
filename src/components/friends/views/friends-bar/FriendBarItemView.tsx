import { FindNewFriendsMessageComposer, MouseEventType } from "@nitrots/nitro-renderer"
import { FC, useEffect, useRef, useState } from "react"
import { GetUserProfile, LocalizeText, MessengerFriend, OpenMessengerChat, SendMessageComposer } from "../../../../api"
import { Button, LayoutAvatarImage, LayoutBadgeImageView } from "../../../../common"
import { useFriends } from "../../../../hooks"

export const FriendBarItemView: FC<{ friend: MessengerFriend, itemWidth: number }> = ({ friend = null, itemWidth = 0 }) => {
  const [isVisible, setVisible] = useState(false)
  const { followFriend = null } = useFriends()
  const elementRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = elementRef.current

      if (!element) return

      if ((event.target !== element) && !element.contains((event.target as Node))) {
        setVisible(false)
      }
    }

    document.addEventListener(MouseEventType.MOUSE_CLICK, onClick)

    return () => document.removeEventListener(MouseEventType.MOUSE_CLICK, onClick)
  }, [])

  if (!friend) {
    return (
      <div ref={elementRef} className={`flash-find-friend-bar cursor-pointer flex flex-col h-[36px] ${isVisible ? "active" : "h-[36px]"}`} style={{ width: itemWidth }} onClick={() => setVisible(prevValue => !prevValue)}>
        <div className="flex items-center h-[36px]">
          <i className="icon-head ml-[5px] mt-[-2px] mr-[2px] self-start" />
          <p className="text-white font-bold text-[12px] leading-[14px]">
            {LocalizeText("friend.bar.find.title")}
          </p>
        </div>
        {isVisible && (
          <div className="px-[7px]">
            <div className="bg-white mt-[-2px] h-[62px] p-[5px]">
              <p className="text-black text-[11px] leading-[13px]">{LocalizeText("friend.bar.find.text")}</p>
            </div>
            <Button className="w-full mt-[6px] min-h-[32px]" onClick={() => SendMessageComposer(new FindNewFriendsMessageComposer())}>
              {LocalizeText("friend.bar.find.button")}
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={elementRef} className={`flash-friend-bar relative flex cursor-pointer ${isVisible ? "active" : "h-[36px]"}`} style={{ width: itemWidth }} onClick={() => setVisible(prevValue => !prevValue)}>
      <div className="flex w-full">
        <div className="h-[49px] w-[43px] ml-[-4px] shrink-0 translate-y-[-17px]" onClick={() => GetUserProfile(friend.id)}>
          {(friend.id > 0)
            ? <LayoutAvatarImage figure={friend.figure} direction={2} headOnly={true} className="!absolute !-left-0 !top-0 !bg-[-24px_-22px]" />
            : <LayoutBadgeImageView className="size-full bg-center bg-no-repeat shrink-0" badgeCode={friend.figure} />
          }
        </div>
        <div className="flex w-full flex-col">
          <p className="text-white font-bold text-[12px] leading-[14px] h-[36px] content-center">
            {friend.name}
          </p>
          {isVisible && (
            <div className="flex justify-between w-[78px] mt-[6px]">
              <i className="cursor-pointer icon-messenger drop-shadow-[1px_1px_0_#0000004D] hover:-translate-x-px hover:-translate-y-px hover:drop-shadow-[2px_2px_0_#0000004D] active:translate-x-0 active:translate-y-0 active:brightness-90 active:drop-shadow-[1px_1px_0_#0000004D]" onClick={() => OpenMessengerChat(friend.id)} />
              {friend.followingAllowed &&
                <i className="cursor-pointer icon-follow drop-shadow-[1px_1px_0_#0000004D] hover:-translate-x-px hover:-translate-y-px hover:drop-shadow-[2px_2px_0_#0000004D] active:translate-x-0 active:translate-y-0 active:brightness-90 active:drop-shadow-[1px_1px_0_#0000004D]" onClick={() => followFriend(friend)} />
              }
              <i className="cursor-pointer icon-profile drop-shadow-[1px_1px_0_#0000004D] hover:-translate-x-px hover:-translate-y-px hover:drop-shadow-[2px_2px_0_#0000004D] active:translate-x-0 active:translate-y-0 active:brightness-90 active:drop-shadow-[1px_1px_0_#0000004D]" onClick={() => GetUserProfile(friend.id)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
