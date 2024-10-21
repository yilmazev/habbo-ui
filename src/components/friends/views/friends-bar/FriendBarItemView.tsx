import { FindNewFriendsMessageComposer, MouseEventType } from "@nitrots/nitro-renderer"
import { FC, useEffect, useRef, useState } from "react"
import { GetUserProfile, LocalizeText, MessengerFriend, OpenMessengerChat, SendMessageComposer } from "../../../../api"
import { Button, LayoutAvatarImage, LayoutBadgeImageView } from "../../../../common"
import { useFriends } from "../../../../hooks"

export const FriendBarItemView: FC<{ friend: MessengerFriend, itemWidth: number }> = ({ friend = null, itemWidth = 0 }) => {
  const [ isVisible, setVisible ] = useState(false)
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
      <div ref={elementRef} className={`flash-find-friend-bar flex h-[36px] cursor-pointer flex-col ${isVisible ? "active" : "h-[36px]"}`} style={{ width: itemWidth }} onClick={() => setVisible(prevValue => !prevValue)}>
        <div className="flex h-[36px] items-center">
          <i className="icon-head ml-[5px] mr-[2px] mt-[-2px] self-start" />
          <p className="text-[12px] font-bold leading-[14px] text-white">
            {LocalizeText("friend.bar.find.title")}
          </p>
        </div>
        {isVisible && (
          <div className="px-[7px]">
            <div className="mt-[-2px] h-[62px] bg-white p-[5px]">
              <p className="text-[11px] leading-[13px] text-black">{LocalizeText("friend.bar.find.text")}</p>
            </div>
            <Button className="mt-[6px] min-h-[32px] w-full" onClick={() => SendMessageComposer(new FindNewFriendsMessageComposer())}>
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
        <div className="ml-[-4px] h-[49px] w-[43px] shrink-0 translate-y-[-17px]" onClick={() => GetUserProfile(friend.id)}>
          {(friend.id > 0)
            ? <LayoutAvatarImage figure={friend.figure} direction={2} headOnly={true} className="!absolute !-left-0 !top-0 !bg-[-24px_-22px]" />
            : <LayoutBadgeImageView className="size-full shrink-0 bg-center bg-no-repeat" badgeCode={friend.figure} />
          }
        </div>
        <div className="flex w-full flex-col">
          <p className="h-[36px] content-center text-[12px] font-bold leading-[14px] text-white">
            {friend.name}
          </p>
          {isVisible && (
            <div className="mt-[6px] flex w-[78px] justify-between">
              <i className="icon-messenger cursor-pointer drop-shadow-[1px_1px_0_#0000004D] hover:-translate-x-px hover:-translate-y-px hover:drop-shadow-[2px_2px_0_#0000004D] active:translate-x-0 active:translate-y-0 active:brightness-90 active:drop-shadow-[1px_1px_0_#0000004D]" onClick={() => OpenMessengerChat(friend.id)} />
              {friend.followingAllowed &&
                <i className="icon-follow cursor-pointer drop-shadow-[1px_1px_0_#0000004D] hover:-translate-x-px hover:-translate-y-px hover:drop-shadow-[2px_2px_0_#0000004D] active:translate-x-0 active:translate-y-0 active:brightness-90 active:drop-shadow-[1px_1px_0_#0000004D]" onClick={() => followFriend(friend)} />
              }
              <i className="icon-profile cursor-pointer drop-shadow-[1px_1px_0_#0000004D] hover:-translate-x-px hover:-translate-y-px hover:drop-shadow-[2px_2px_0_#0000004D] active:translate-x-0 active:translate-y-0 active:brightness-90 active:drop-shadow-[1px_1px_0_#0000004D]" onClick={() => GetUserProfile(friend.id)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
