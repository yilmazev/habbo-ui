import { FC, useMemo, useRef } from "react";
import { ColumnProps } from "..";
import { DraggableWindowProps } from "../draggable-window";

export interface IIlluminaBigCard extends DraggableWindowProps, ColumnProps {
  onCloseClick?: () => void;
}

export const IlluminaBigCard: FC<IIlluminaBigCard> = ({ uniqueKey = null, onCloseClick = null, classNames = [], className = "", ...rest }) => {
  const elementRef = useRef<HTMLDivElement>()

  const getClassNames = useMemo(() => {
    const newClassNames: string[] = ["relative z-[9999]"]

    if (classNames.length) newClassNames.push(...classNames)

    return newClassNames
  }, [classNames])

  const getClassName = useMemo(() => {
    let newClassName = getClassNames.join(" ")

    if (className.length) newClassName += (" " + className)

    return newClassName.trim()
  }, [getClassNames, className])

  return (
    <div>
      <div className="absolute left-0 top-0 z-[450] flex size-full items-center justify-center">
        <div ref={elementRef} className={getClassName} {...rest} />
        <div className="absolute left-0 top-0 z-[999] flex size-full items-center justify-center bg-[#121212]/75" onClick={onCloseClick} />
      </div>
    </div>
  )
}
