import { ILinkEventTracker, NitroLogger } from "@nitrots/nitro-renderer"
import { FC, useEffect, useRef, useState } from "react"
import { AddEventLinkTracker, GetConfiguration, OpenUrl, RemoveLinkEventTracker } from "../../api"
import { DraggableWindowPosition, IlluminaCard, IlluminaCardContent, IlluminaCardHeader } from "../../common"

const NEW_LINE_REGEX = /\n\r|\n|\r/mg

export const NitropediaView: FC<{}> = props => {
  const [content, setContent] = useState(null)
  const [header, setHeader] = useState("")
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const openPage = async (link: string) => {
      try {
        const response = await fetch(link)

        if (!response) return

        const text = await response.text()
        const splitData = text.split(NEW_LINE_REGEX)
        const line = splitData.shift().split("|")

        setHeader(line[0])

        setDimensions(prevValue => {
          if (line[1] && (line[1].split(";").length === 2)) {
            return {
              width: parseInt(line[1].split(";")[0]),
              height: parseInt(line[1].split(";")[1])
            }
          }

          return null
        })

        setContent(splitData.join(""))
      }

      catch (error) {
        NitroLogger.error(`Failed to fetch ${link}`)
      }
    }

    const linkTracker: ILinkEventTracker = {
      linkReceived: (url: string) => {
        const value = url.split("/")

        if (value.length < 2) return

        value.shift()

        openPage(GetConfiguration("habbopages.url") + "habbopages/" + value.join("/"))
      },
      eventUrlPrefix: "habbopages/"
    }

    AddEventLinkTracker(linkTracker)

    return () => RemoveLinkEventTracker(linkTracker)
  }, [])

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLAnchorElement)) return

      event.preventDefault()

      const link = event.target.href

      if (!link || !link.length) return

      OpenUrl(link)
    }

    document.addEventListener("click", handle)

    return () => {
      document.removeEventListener("click", handle)
    }
  }, [])

  if (!content) return null

  return (
    <IlluminaCard uniqueKey="nitropedia" className="illumina-nitropedia h-[400px] min-h-[400px] w-[420px] resize-y overflow-auto" windowPosition={DraggableWindowPosition.TOP_LEFT} style={dimensions ? { width: dimensions.width, height: dimensions.height } : {}}>
      <IlluminaCardHeader headerText={header} onCloseClick={() => setContent(null)} />
      <IlluminaCardContent>
        <div className="illumina-scrollbar overflow-auto">
          <div ref={elementRef} className="content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </IlluminaCardContent>
    </IlluminaCard>
  )
}
