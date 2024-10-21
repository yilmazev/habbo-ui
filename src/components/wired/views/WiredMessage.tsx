import { ChangeEvent, FC } from "react"

export interface IWiredMessage {
  title: string
  value: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
}

export const WiredMessage: FC<IWiredMessage> = ({ title = "", value = "", onChange, maxLength = 100 }) => {
  return (
    <>
      <p className="mb-[5px] font-bold">{title}</p>
      <input type="text" value={value} onChange={onChange} maxLength={maxLength} />
    </>
  )
}
