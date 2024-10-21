import { FC } from "react"
import ReactSlider from "react-slider"
import { Button } from "../../../common"

export interface IWiredRange {
  title?: string
  setState: (state: any) => void
  state: any
  sliderMin?: number
  sliderMax?: number
}

export const WiredRange: FC<IWiredRange> = ({ title = "", setState = () => { }, state = null, sliderMin = 1, sliderMax = 120 }) => {
  return (
    <div className="mb-[17px]">
      <p className="font-bold">{title}</p>
      <div className="mt-[11px] flex items-center justify-center gap-[6px]">
        <Button className="!size-[20px] !min-w-[20px] !px-0" onClick={() => setState(state - 1)}>
          <i className="icon-range-increase" />
        </Button>
        <ReactSlider
          className="wired-range"
          min={sliderMin}
          max={sliderMax}
          value={state}
          onChange={(e) => setState(e)}
          renderThumb={(props, state) => <div {...props}>
            <div className="mt-px w-[12px]">
              <i className="icon-range-thumb" />
            </div>
          </div>
          }
        />
        <Button className="!size-[20px] !min-w-[20px] !px-0" onClick={() => setState(state + 1)}>
          <i className="icon-range-decrase" />
        </Button>
      </div>
    </div>
  )
}
