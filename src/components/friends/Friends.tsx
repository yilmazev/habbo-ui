import { FC } from "react"
import { createPortal } from "react-dom"
import { useFriends } from "../../hooks"
import { FriendBar } from "./views/friends-bar/FriendBar"
import { FriendsListView } from "./views/friends-list/FriendsListView"
import { FriendsMessengerView } from "./views/messenger/FriendsMessengerView"

export const Friends: FC<{}> = () => {
  const { settings = null, onlineFriends = [] } = useFriends()

  if (!settings) return null

  return (
    <>
      {createPortal(<FriendBar onlineFriends={onlineFriends} />, document.getElementById("toolbar-friend-bar-container"))}
      <FriendsListView />
      <FriendsMessengerView />
    </>
  )
}
