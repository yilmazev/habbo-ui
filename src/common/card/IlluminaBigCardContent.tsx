import { FC, useMemo } from "react"
import { ColumnProps } from ".."

export const IlluminaBigCardContent: FC<ColumnProps> = ({ classNames = [], className = "", ...rest }) => {
  const getClassNames = useMemo(() => {
    const newClassNames: string[] = ["illumina-card illumina-card-body flex flex-col p-[10px] overflow-hidden"]

    if (classNames.length) newClassNames.push(...classNames)

    return newClassNames
  }, [classNames])

  const getClassName = useMemo(() => {
    let newClassName = getClassNames.join(" ")

    if (className.length) newClassName += (" " + className)

    return newClassName.trim()
  }, [getClassNames, className])

  return <div className={getClassName} {...rest} />
}
