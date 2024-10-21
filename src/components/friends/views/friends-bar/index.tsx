import { FC, useEffect, useRef, useState } from "react"
import { MessengerFriend } from "../../../../api"
import { FriendBarItemView } from "./FriendBarItemView"

export const FriendBarView: FC<{ onlineFriends: MessengerFriend[] }> = ({ onlineFriends = null }) => {
  const [ indexOffset, setIndexOffset ] = useState(0)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [ containerWidth, setContainerWidth ] = useState(1)
  const [ maxDisplayCount, setMaxDisplayCount ] = useState(1)

  const ITEM_WIDTH = 127
  const MAX_DISPLAY_COUNT = 3

  useEffect(() => {
    function handleResize() {
      const width = elementRef.current?.getBoundingClientRect().width
      setContainerWidth(width)
      const calculatedMaxDisplayCount = Math.floor(containerWidth / ITEM_WIDTH)
      setMaxDisplayCount(calculatedMaxDisplayCount)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ containerWidth, maxDisplayCount, ITEM_WIDTH, onlineFriends ])

  return (
    <div className="flex size-full items-center">
      {onlineFriends.length >= MAX_DISPLAY_COUNT && (
        <button className="friends-arrow left shrink-0 disabled:opacity-10" disabled={indexOffset <= 0} onClick={() => setIndexOffset(indexOffset - 1)} />
      )}
      <div ref={elementRef} className="flex size-full items-center gap-[3px]">
        {Array.from(Array(MAX_DISPLAY_COUNT), (e, i) => (
          <FriendBarItemView key={i} friend={(onlineFriends[indexOffset + i] || null)} itemWidth={ITEM_WIDTH} />
        ))}
      </div>
      {onlineFriends.length >= MAX_DISPLAY_COUNT && (
        <button className="friends-arrow right shrink-0 disabled:opacity-10" disabled={!((onlineFriends.length > maxDisplayCount) && (indexOffset + maxDisplayCount) <= onlineFriends.length - 1)} onClick={() => setIndexOffset(indexOffset + 1)} />
      )}
    </div>
  )
}
