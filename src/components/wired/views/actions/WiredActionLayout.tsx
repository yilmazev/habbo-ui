import { WiredActionLayoutCode } from "../../../../api"
import { WiredActionBotChangeFigure } from "./WiredActionBotChangeFigure"
import { WiredActionBotFollowAvatar } from "./WiredActionBotFollowAvatar"
import { WiredActionBotGiveHandItem } from "./WiredActionBotGiveHandItem"
import { WiredActionBotMove } from "./WiredActionBotMove"
import { WiredActionBotTalk } from "./WiredActionBotTalk"
import { WiredActionBotTalkToAvatar } from "./WiredActionBotTalkToAvatar"
import { WiredActionBotTeleport } from "./WiredActionBotTeleport"
import { WiredActionCallAnotherStack } from "./WiredActionCallAnotherStack"
import { WiredActionChase } from "./WiredActionChase"
import { WiredActionChat } from "./WiredActionChat"
import { WiredActionFlee } from "./WiredActionFlee"
import { WiredActionGiveRewardView } from "./WiredActionGiveRewardView"
import { WiredActionGiveScore } from "./WiredActionGiveScore"
import { WiredActionGiveScoreToPredefinedTeam } from "./WiredActionGiveScoreToPredefinedTeam"
import { WiredActionJoinTeam } from "./WiredActionJoinTeam"
import { WiredActionKickFromRoom } from "./WiredActionKickFromRoom"
import { WiredActionLeaveTeam } from "./WiredActionLeaveTeam"
import { WiredActionMoveAndRotateFurni } from "./WiredActionMoveAndRotateFurni"
import { WiredActionMoveFurni } from "./WiredActionMoveFurni"
import { WiredActionMoveFurniTo } from "./WiredActionMoveFurniTo"
import { WiredActionMuteUser } from "./WiredActionMuteUser"
import { WiredActionReset } from "./WiredActionReset"
import { WiredActionSetFurniStateTo } from "./WiredActionSetFurniStateTo"
import { WiredActionTeleport } from "./WiredActionTeleport"
import { WiredActionToggleFurniState } from "./WiredActionToggleFurniState"

export const WiredActionLayout = (code: number) => {
  switch (code) {
  case WiredActionLayoutCode.BOT_CHANGE_FIGURE:
    return <WiredActionBotChangeFigure />
  case WiredActionLayoutCode.BOT_FOLLOW_AVATAR:
    return <WiredActionBotFollowAvatar />
  case WiredActionLayoutCode.BOT_GIVE_HAND_ITEM:
    return <WiredActionBotGiveHandItem />
  case WiredActionLayoutCode.BOT_MOVE:
    return <WiredActionBotMove />
  case WiredActionLayoutCode.BOT_TALK:
    return <WiredActionBotTalk />
  case WiredActionLayoutCode.BOT_TALK_DIRECT_TO_AVTR:
    return <WiredActionBotTalkToAvatar />
  case WiredActionLayoutCode.BOT_TELEPORT:
    return <WiredActionBotTeleport />
  case WiredActionLayoutCode.CALL_ANOTHER_STACK:
    return <WiredActionCallAnotherStack />
  case WiredActionLayoutCode.CHASE:
    return <WiredActionChase />
  case WiredActionLayoutCode.CHAT:
    return <WiredActionChat />
  case WiredActionLayoutCode.FLEE:
    return <WiredActionFlee />
  case WiredActionLayoutCode.GIVE_REWARD:
    return <WiredActionGiveRewardView />
  case WiredActionLayoutCode.GIVE_SCORE:
    return <WiredActionGiveScore />
  case WiredActionLayoutCode.GIVE_SCORE_TO_PREDEFINED_TEAM:
    return <WiredActionGiveScoreToPredefinedTeam />
  case WiredActionLayoutCode.JOIN_TEAM:
    return <WiredActionJoinTeam />
  case WiredActionLayoutCode.KICK_FROM_ROOM:
    return <WiredActionKickFromRoom />
  case WiredActionLayoutCode.LEAVE_TEAM:
    return <WiredActionLeaveTeam />
  case WiredActionLayoutCode.MOVE_FURNI:
    return <WiredActionMoveFurni />
  case WiredActionLayoutCode.MOVE_AND_ROTATE_FURNI:
    return <WiredActionMoveAndRotateFurni />
  case WiredActionLayoutCode.MOVE_FURNI_TO:
    return <WiredActionMoveFurniTo />
  case WiredActionLayoutCode.MUTE_USER:
    return <WiredActionMuteUser />
  case WiredActionLayoutCode.RESET:
    return <WiredActionReset />
  case WiredActionLayoutCode.SET_FURNI_STATE:
    return <WiredActionSetFurniStateTo />
  case WiredActionLayoutCode.TELEPORT:
    return <WiredActionTeleport />
  case WiredActionLayoutCode.TOGGLE_FURNI_STATE:
    return <WiredActionToggleFurniState />
  }

  return null
}
