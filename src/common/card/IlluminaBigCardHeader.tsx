import { FC } from "react";
import { ColumnProps } from "..";

interface IIlluminaBigCardHeader extends ColumnProps {
  headerText?: string;
}

export const IlluminaBigCardHeader: FC<IIlluminaBigCardHeader> = ({ headerText = null, children, ...rest }) => {
  return (
    <div className="mb-[14px] ml-[12px]" {...rest}>
      {headerText &&
        <span className="font-semibold text-white">{headerText}</span>
      }
      {children}
    </div>
  )
}
