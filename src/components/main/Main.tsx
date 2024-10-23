import { HabboWebTools, ILinkEventTracker, RoomSessionEvent } from "@nitrots/nitro-renderer"
import { FC, useEffect, useState } from "react"
import { AddEventLinkTracker, GetCommunication, RemoveLinkEventTracker } from "../../api"
import { useRoomSessionManagerEvent } from "../../hooks"
import { AchievementsView } from "../achievements/AchievementsView"
import { AvatarEditorView } from "../avatar-editor/AvatarEditorView"
import { CameraWidgetView } from "../camera/CameraWidgetView"
import { CampaignView } from "../campaign/CampaignView"
import { CatalogView } from "../catalog/CatalogView"
import { FloorplanEditorView } from "../floorplan-editor/FloorplanEditorView"
import { Friends } from "../friends/Friends"
import { GameCenter } from "../game-center/GameCenter"
import { GroupsView } from "../groups/GroupsView"
import { GuideToolView } from "../guide-tool/GuideToolView"
import { HcCenterView } from "../hc-center/HcCenterView"
import { Help } from "../help/Help"
import { HotelView } from "../hotel-view/HotelView"
import { InventoryView } from "../inventory/InventoryView"
import { ModToolsView } from "../mod-tools/ModToolsView"
import { NavigatorView } from "../navigator/NavigatorView"
import { NitropediaView } from "../nitropedia/NitropediaView"
import { RightSideView } from "../right-side/RightSideView"
import { RoomView } from "../room/RoomView"
import { Toolbar } from "../toolbar/Toolbar"
import { UserProfileView } from "../user-profile/UserProfileView"
import { UserSettingsView } from "../user-settings/UserSettingsView"
import { Wired } from "../wired/Wired"

export const Main: FC<{}> = () => {
  const [isReady, setIsReady] = useState(false)
  const [landingViewVisible, setLandingViewVisible] = useState(true)

  useRoomSessionManagerEvent<RoomSessionEvent>(RoomSessionEvent.CREATED, event => setLandingViewVisible(false))
  useRoomSessionManagerEvent<RoomSessionEvent>(RoomSessionEvent.ENDED, event => setLandingViewVisible(event.openLandingView))

  useEffect(() => {
    setIsReady(true)
    GetCommunication().connection.onReady()
  }, [])

  useEffect(() => {
    const linkTracker: ILinkEventTracker = {
      linkReceived: (url: string) => {
        const parts = url.split("/")

        if (parts.length < 2) return

        switch (parts[1]) {
          case "open":
            if (parts.length > 2) {
              switch (parts[2]) {
                case "credits":
                  //HabboWebTools.openWebPageAndMinimizeClient(this._windowManager.getProperty(ExternalVariables.WEB_SHOP_RELATIVE_URL));
                  break
                default: {
                  const name = parts[2]
                  HabboWebTools.openHabblet(name)
                }
              }
            }
            return
        }
      },
      eventUrlPrefix: "habblet/"
    }

    AddEventLinkTracker(linkTracker)

    return () => RemoveLinkEventTracker(linkTracker)
  }, [])

  return (
    <>
      <HotelView />
      <Toolbar isInRoom={!landingViewVisible} />
      <ModToolsView /> {/* todo */}
      <RoomView /> {/* todo */}
      <Wired /> {/* todo */}
      <AvatarEditorView /> {/* todo */}
      <AchievementsView /> {/* todo */}
      <NavigatorView /> {/* todo */}
      <InventoryView /> {/* todo */}
      <CatalogView /> {/* todo */}
      <Friends /> {/* todo */}
      <RightSideView /> {/* todo */}
      <UserSettingsView /> {/* todo */}
      <UserProfileView /> {/* todo */}
      <GroupsView /> {/* todo */}
      <CameraWidgetView /> {/* todo */}
      <Help /> {/* todo */}
      <NitropediaView /> {/* todo */}
      <GuideToolView /> {/* todo */}
      <HcCenterView /> {/* todo */}
      <CampaignView /> {/* todo */}
      <GameCenter />
      <FloorplanEditorView /> {/* todo */}
    </>
  )
}
