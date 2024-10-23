import { ConditionDefinition, TriggerDefinition, WiredActionDefinition } from "@nitrots/nitro-renderer"
import { FC } from "react"
import { useWired } from "../../hooks"
import { WiredActionLayout } from "./views/actions/WiredActionLayout"
import { WiredConditionLayout } from "./views/conditions/WiredConditionLayout"
import { WiredTriggerLayout } from "./views/triggers/WiredTriggerLayout"

export const Wired: FC<{}> = () => {
  const { trigger = null } = useWired()

  if (!trigger) return null
  if (trigger instanceof WiredActionDefinition) return WiredActionLayout(trigger.code)
  if (trigger instanceof TriggerDefinition) return WiredTriggerLayout(trigger.code)
  if (trigger instanceof ConditionDefinition) return WiredConditionLayout(trigger.code)

  return null
}
