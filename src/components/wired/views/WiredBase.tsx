import { FC, useEffect, useState } from "react"
import { GetSessionDataManager, LocalizeText, WiredFurniType, WiredSelectionVisualizer } from "../../../api"
import { Button, DraggableWindow } from "../../../common"
import { useWired } from "../../../hooks"
import { WiredFurniSelector } from "./WiredFurniSelector"

export interface IWiredBase {
  wiredType: string
  requiresFurni: number
  hasSpecialInput: boolean
  save: () => void
  validate?: () => boolean
  children?: React.ReactNode
}

export const WiredBase: FC<IWiredBase> = ({ wiredType = "", requiresFurni = WiredFurniType.STUFF_SELECTION_OPTION_NONE, save = null, validate = null, children = null, hasSpecialInput = false }) => {
  const [ wiredName, setWiredName ] = useState(null)
  const [ wiredDescription, setWiredDescription ] = useState(null)
  const [ needsSave, setNeedsSave ] = useState(false)
  const { trigger = null, setTrigger = null, setIntParams = null, setStringParam = null, setFurniIds = null, setAllowsFurni = null, saveWired = null } = useWired()

  const onClose = () => setTrigger(null)

  const onSave = () => {
    if (validate && !validate()) return

    if (save) save()

    setNeedsSave(true)
  }

  useEffect(() => {
    if (!needsSave) return

    saveWired()

    setNeedsSave(false)
  }, [ needsSave, saveWired ])

  useEffect(() => {
    if (!trigger) return

    const spriteId = (trigger.spriteId || -1)
    const furniData = GetSessionDataManager().getFloorItemData(spriteId)

    if (!furniData) {
      setWiredName(("NAME: " + spriteId))
      setWiredDescription(("NAME: " + spriteId))
    }
    else {
      setWiredName(furniData.name)
      setWiredDescription(furniData.description)
    }

    if (hasSpecialInput) {
      setIntParams(trigger.intData)
      setStringParam(trigger.stringData)
    }

    if (requiresFurni > WiredFurniType.STUFF_SELECTION_OPTION_NONE) {
      setFurniIds(prevValue => {
        if (prevValue && prevValue.length) WiredSelectionVisualizer.clearSelectionShaderFromFurni(prevValue)

        if (trigger.selectedItems && trigger.selectedItems.length) {
          WiredSelectionVisualizer.applySelectionShaderToFurni(trigger.selectedItems)

          return trigger.selectedItems
        }

        return []
      })
    }

    setAllowsFurni(requiresFurni)
  }, [ trigger, hasSpecialInput, requiresFurni, setIntParams, setStringParam, setFurniIds, setAllowsFurni ])

  const WIRED_TYPE = {
    trigger: "icon-trigger",
    action: "icon-action",
    condition: "icon-condition"
  }

  return (
    <DraggableWindow handleSelector=".drag-handler">
      <div className="oldskool-wired-card oldskool-infomatic-card w-[240px] p-[6px] pb-[8px] text-white">
        <div className="drag-handler oldskool-wired-header relative flex items-center justify-center">
          <p className="font-bold">{LocalizeText("wiredfurni.title")}</p>
          <button className="absolute right-0" onClick={onClose}>
            <i className="icon-wired-times" />
          </button>
        </div>
        <div className="mt-[9px] px-[5px]">
          <div className="flex gap-[9px]">
            <i className={`icon-wired ${WIRED_TYPE[wiredType]}`} />
            <p className="font-bold">{wiredName}</p>
          </div>
          {!!children && <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />}
          <div className="mb-[16px]">
            {children}
            {(requiresFurni > WiredFurniType.STUFF_SELECTION_OPTION_NONE) &&
              <>
                <div className="mb-[6px] mt-[14px] h-px w-full bg-[#232323]" />
                <div className="px-[5px]">
                  <WiredFurniSelector />
                </div>
              </>}
          </div>
          <div className="my-[5px] h-px w-full bg-[#232323]" />
          <div className="flex items-center gap-[14px] px-[5px]">
            <Button className="w-full" onClick={onSave}>{LocalizeText("wiredfurni.ready")}</Button>
            <Button className="w-full" onClick={onClose}>{LocalizeText("cancel")}</Button>
          </div>
        </div>
      </div>
    </DraggableWindow>
  )
}
