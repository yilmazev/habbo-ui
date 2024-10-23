import { FC, useMemo } from "react";
import { BaseProps } from "..";

interface ILayoutItemCount extends BaseProps<HTMLDivElement> {
  count: number;
}

export const LayoutItemCount: FC<ILayoutItemCount> = ({ count = 0, classNames = [], className = "", children = null, ...rest }) => {
  const getClassNames = useMemo(() => {
    const newClassNames: string[] = ["flash-item-count flex justify-center absolute top-0 right-0 pl-[7px] pr-[6px] h-[18px] text-[12px] leading-[16px] font-bold [text-shadow:_0_1px_0_#AC1D19] text-white z-30"]

    if (classNames.length) newClassNames.push(...classNames)

    return newClassNames
  }, [classNames])

  const getClassName = useMemo(() => {
    let newClassName = getClassNames.join(" ")

    if (className.length) newClassName += (" " + className)

    return newClassName.trim()
  }, [getClassNames, className])

  return (
    <div className={getClassName} {...rest}>
      {count}
      {children}
    </div>
  )
}
