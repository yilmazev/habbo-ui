import { FC, useEffect, useState } from "react"
import { GetConfiguration } from "../../api"

interface ILoading {
  isError: boolean;
  message: string;
  percent: number;
}

export const Loading: FC<ILoading> = ({ isError = false, message = "", percent = 0 }) => {
  const [ randomImage, setRandomImage ] = useState<string | null>(null)
  const [ randomText, setRandomText ] = useState("") // Rastgele metin için state

  const messages = GetConfiguration<string[]>("client.starting.revolving")
  const images = GetConfiguration<string[]>("client.starting.images")

  const updateRandomText = () => {
    if (messages && messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * messages.length)
      setRandomText(messages[randomIndex])
    }
  }

  useEffect(() => {
    if (images && images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length)
      setRandomImage(images[randomIndex])
    }
    updateRandomText()
  }, [ images, messages ])

  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar")
    if (progressBar) {
      progressBar.addEventListener("animationiteration", updateRandomText)
    }

    return () => {
      if (progressBar) {
        progressBar.removeEventListener("animationiteration", updateRandomText)
      }
    }
  }, [ messages ])

  return (
    <div className="flash-loading relative flex h-screen w-full items-center justify-center bg-[#0e151c]">
      <div className="z-10 flex flex-col items-center">
        <div className="relative mb-[60px] flex h-[434px] w-[500px] bg-[url('/client-assets/images/1flash/loading/bg.png')]">
          <div className="absolute left-[96px] top-[51px] size-[320px]" style={{ backgroundImage: `url(${randomImage || ""})` }} />
          <div className="absolute left-0 top-0 size-full bg-[url('/client-assets/images/1flash/loading/logo.png')]" />
        </div>
        <p className="text-[26px] font-semibold text-white">{randomText}</p>
        <div className="relative mb-[6px] mt-[10px] h-[26px] w-[401px] bg-[url('/client-assets/images/1flash/loading/progress-bg.png')]">
          <div className="absolute left-[3px] top-[3px] size-[calc(100%-5px)] bg-black p-px pr-[3px]">
            <div className="progress-bar h-[18px]" />
          </div>
        </div>
        <p className="text-[14px] font-semibold text-[#909091]">{percent}%</p>
      </div>
    </div>
  )
}