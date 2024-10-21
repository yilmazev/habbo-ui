import { WiredActionDefinition } from "@nitrots/nitro-renderer"
import { FC, PropsWithChildren, useEffect } from "react"
import { GetWiredTimeLocale, LocalizeText, WiredFurniType } from "../../../../api"
import { useWired } from "../../../../hooks"
import { WiredBase } from "../WiredBase"
import { WiredRange } from "../WiredRange"

export interface IWiredActionBase {
  hasSpecialInput: boolean;
  requiresFurni: number;
  save: () => void;
}

export const WiredActionBase: FC<PropsWithChildren<IWiredActionBase>> = ({ requiresFurni = WiredFurniType.STUFF_SELECTION_OPTION_NONE, save = null, hasSpecialInput = false, children = null }) => {
  const { trigger = null, actionDelay = 0, setActionDelay = null } = useWired()

  useEffect(() => {
    setActionDelay((trigger as WiredActionDefinition).delayInPulses)
  }, [ trigger, setActionDelay ])

  return (
    <WiredBase wiredType="action" requiresFurni={requiresFurni} save={save} hasSpecialInput={hasSpecialInput}>
      {children}
      {!!children && <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />}
      <WiredRange
        title={LocalizeText("wiredfurni.params.delay", [ "seconds" ], [ GetWiredTimeLocale(actionDelay) ])}
        setState={setActionDelay}
        state={actionDelay}
        sliderMin={0}
        sliderMax={20}
      />
    </WiredBase>
  )
}
