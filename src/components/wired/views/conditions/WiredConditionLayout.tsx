import { WiredConditionLayoutCode } from "../../../../api"
import { WiredConditionActorHasHandItem } from "./WiredConditionActorHasHandItem"
import { WiredConditionActorIsGroupMember } from "./WiredConditionActorIsGroupMember"
import { WiredConditionActorIsOnFurni } from "./WiredConditionActorIsOnFurni"
import { WiredConditionActorIsTeamMember } from "./WiredConditionActorIsTeamMember"
import { WiredConditionActorIsWearingBadge } from "./WiredConditionActorIsWearingBadge"
import { WiredConditionActorIsWearingEffect } from "./WiredConditionActorIsWearingEffect"
import { WiredConditionDateRange } from "./WiredConditionDateRange"
import { WiredConditionFurniHasAvatarOn } from "./WiredConditionFurniHasAvatarOn"
import { WiredConditionFurniHasFurniOn } from "./WiredConditionFurniHasFurniOn"
import { WiredConditionFurniHasNotFurniOn } from "./WiredConditionFurniHasNotFurniOn"
import { WiredConditionFurniIsOfType } from "./WiredConditionFurniIsOfType"
import { WiredConditionFurniMatchesSnapshot } from "./WiredConditionFurniMatchesSnapshot"
import { WiredConditionTimeElapsedLess } from "./WiredConditionTimeElapsedLess"
import { WiredConditionTimeElapsedMore } from "./WiredConditionTimeElapsedMore"
import { WiredConditionUserCountInRoom } from "./WiredConditionUserCountInRoom"

export const WiredConditionLayout = (code: number) => {
  switch (code) {
  case WiredConditionLayoutCode.ACTOR_HAS_HANDITEM:
    return <WiredConditionActorHasHandItem />
  case WiredConditionLayoutCode.ACTOR_IS_GROUP_MEMBER:
  case WiredConditionLayoutCode.NOT_ACTOR_IN_GROUP:
    return <WiredConditionActorIsGroupMember />
  case WiredConditionLayoutCode.ACTOR_IS_ON_FURNI:
  case WiredConditionLayoutCode.NOT_ACTOR_ON_FURNI:
    return <WiredConditionActorIsOnFurni />
  case WiredConditionLayoutCode.ACTOR_IS_IN_TEAM:
  case WiredConditionLayoutCode.NOT_ACTOR_IN_TEAM:
    return <WiredConditionActorIsTeamMember />
  case WiredConditionLayoutCode.ACTOR_IS_WEARING_BADGE:
  case WiredConditionLayoutCode.NOT_ACTOR_WEARS_BADGE:
    return <WiredConditionActorIsWearingBadge />
  case WiredConditionLayoutCode.ACTOR_IS_WEARING_EFFECT:
  case WiredConditionLayoutCode.NOT_ACTOR_WEARING_EFFECT:
    return <WiredConditionActorIsWearingEffect />
  case WiredConditionLayoutCode.DATE_RANGE_ACTIVE:
    return <WiredConditionDateRange />
  case WiredConditionLayoutCode.FURNIS_HAVE_AVATARS:
  case WiredConditionLayoutCode.FURNI_NOT_HAVE_HABBO:
    return <WiredConditionFurniHasAvatarOn />
  case WiredConditionLayoutCode.HAS_STACKED_FURNIS:
    return <WiredConditionFurniHasFurniOn />
  case WiredConditionLayoutCode.NOT_HAS_STACKED_FURNIS:
    return <WiredConditionFurniHasNotFurniOn />
  case WiredConditionLayoutCode.STUFF_TYPE_MATCHES:
  case WiredConditionLayoutCode.NOT_FURNI_IS_OF_TYPE:
    return <WiredConditionFurniIsOfType />
  case WiredConditionLayoutCode.STATES_MATCH:
  case WiredConditionLayoutCode.NOT_STATES_MATCH:
    return <WiredConditionFurniMatchesSnapshot />
  case WiredConditionLayoutCode.TIME_ELAPSED_LESS:
    return <WiredConditionTimeElapsedLess />
  case WiredConditionLayoutCode.TIME_ELAPSED_MORE:
    return <WiredConditionTimeElapsedMore />
  case WiredConditionLayoutCode.USER_COUNT_IN:
  case WiredConditionLayoutCode.NOT_USER_COUNT_IN:
    return <WiredConditionUserCountInRoom />
  }

  return null
}
