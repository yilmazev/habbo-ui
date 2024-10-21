import { AvatarScaleType, AvatarSetType } from "@nitrots/nitro-renderer";
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
import { GetAvatarRenderManager } from "../../api";
import { BaseProps } from "../Base";

export interface ILayoutAvatarImage extends BaseProps<HTMLDivElement> {
  figure: string;
  gender?: string;
  headOnly?: boolean;
  direction?: number;
  scale?: number;
}

export const LayoutAvatarImage: FC<ILayoutAvatarImage> = ({ figure = "", gender = "M", headOnly = false, direction = 0, scale = 1, classNames = [], className = "", style = {}, ...rest }) => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [randomValue, setRandomValue] = useState(-1)
  const isDisposed = useRef(false)

  const getClassNames = useMemo(() => {
    const newClassNames: string[] = ["avatar-image"]

    if (classNames.length) newClassNames.push(...classNames)

    return newClassNames
  }, [classNames])

  const getClassName = useMemo(() => {
    let newClassName = getClassNames.join(" ")

    if (className.length) newClassName += (" " + className)

    return newClassName.trim()
  }, [getClassNames, className])

  const getStyle = useMemo(() => {
    let newStyle: CSSProperties = {}

    if (avatarUrl && avatarUrl.length) newStyle.backgroundImage = `url('${avatarUrl}')`

    if (scale !== 1) {
      newStyle.transform = `scale(${scale})`

      if (!(scale % 1)) newStyle.imageRendering = "pixelated"
    }

    if (Object.keys(style).length) newStyle = { ...newStyle, ...style }

    return newStyle
  }, [avatarUrl, scale, style])

  useEffect(() => {
    const avatarImage = GetAvatarRenderManager().createAvatarImage(figure, AvatarScaleType.LARGE, gender, {
      resetFigure: figure => {
        if (isDisposed.current) return

        setRandomValue(Math.random())
      },
      dispose: () => { },
      disposed: false
    }, null)

    if (!avatarImage) return

    let setType = AvatarSetType.FULL

    if (headOnly) setType = AvatarSetType.HEAD

    avatarImage.setDirection(setType, direction)

    const image = avatarImage.getCroppedImage(setType)

    if (image) setAvatarUrl(image.src)

    avatarImage.dispose()
  }, [figure, gender, direction, headOnly, randomValue])

  useEffect(() => {
    isDisposed.current = false

    return () => {
      isDisposed.current = true
    }
  }, [])

  return <div className={getClassName} style={getStyle} {...rest} />
}
