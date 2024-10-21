import { WiredTriggerlayout } from "../../../../api"
import { WiredTriggerAvatarEnterRoom } from "./WiredTriggerAvatarEnterRoom"
import { WiredTriggerAvatarSaysSomething } from "./WiredTriggerAvatarSaysSomething"
import { WiredTriggerAvatarWalksOffFurni } from "./WiredTriggerAvatarWalksOffFurni"
import { WiredTriggerAvatarWalksOn } from "./WiredTriggerAvatarWalksOn"
import { WiredTriggerBotReachedAvatar } from "./WiredTriggerBotReachedAvatar"
import { WiredTriggerBotReachedStuff } from "./WiredTriggerBotReachedStuff"
import { WiredTriggerCollision } from "./WiredTriggerCollision"
import { WiredTriggerExecuteOnce } from "./WiredTriggerExecuteOnce"
import { WiredTriggerExecutePeriodically } from "./WiredTriggerExecutePeriodically"
import { WiredTriggerExecutePeriodicallyLong } from "./WiredTriggerExecutePeriodicallyLong"
import { WiredTriggerGameEnds } from "./WiredTriggerGameEnds"
import { WiredTriggerGameStarts } from "./WiredTriggerGameStarts"
import { WiredTriggerScoreAchieved } from "./WiredTriggerScoreAchieved"
import { WiredTriggerToggleFurni } from "./WiredTriggerToggleFurni"

export const WiredTriggerLayout = (code: number) => {
  switch (code) {
  case WiredTriggerlayout.AVATAR_ENTERS_ROOM:
    return <WiredTriggerAvatarEnterRoom />
  case WiredTriggerlayout.AVATAR_SAYS_SOMETHING:
    return <WiredTriggerAvatarSaysSomething />
  case WiredTriggerlayout.AVATAR_WALKS_OFF_FURNI:
    return <WiredTriggerAvatarWalksOffFurni />
  case WiredTriggerlayout.AVATAR_WALKS_ON_FURNI:
    return <WiredTriggerAvatarWalksOn />
  case WiredTriggerlayout.BOT_REACHED_AVATAR:
    return <WiredTriggerBotReachedAvatar />
  case WiredTriggerlayout.BOT_REACHED_STUFF:
    return <WiredTriggerBotReachedStuff />
  case WiredTriggerlayout.COLLISION:
    return <WiredTriggerCollision />
  case WiredTriggerlayout.EXECUTE_ONCE:
    return <WiredTriggerExecuteOnce />
  case WiredTriggerlayout.EXECUTE_PERIODICALLY:
    return <WiredTriggerExecutePeriodically />
  case WiredTriggerlayout.EXECUTE_PERIODICALLY_LONG:
    return <WiredTriggerExecutePeriodicallyLong />
  case WiredTriggerlayout.GAME_ENDS:
    return <WiredTriggerGameEnds />
  case WiredTriggerlayout.GAME_STARTS:
    return <WiredTriggerGameStarts />
  case WiredTriggerlayout.SCORE_ACHIEVED:
    return <WiredTriggerScoreAchieved />
  case WiredTriggerlayout.TOGGLE_FURNI:
    return <WiredTriggerToggleFurni />
  }

  return null
}
