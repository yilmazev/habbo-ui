import { FC, MouseEvent } from "react";
import { ColumnProps } from "..";
import { LayoutSubView } from "../layout/LayoutSubView";
import { LayoutTimesView } from "../layout/LayoutTimesView";

interface IIlluminaCardHeader extends ColumnProps {
  headerText: string;
  isClose?: boolean;
  noCloseButton?: boolean;
  onCloseClick: (e: MouseEvent) => void;
}

export const IlluminaCardHeader: FC<IIlluminaCardHeader> = ({ headerText = null, isClose = true, noCloseButton = null, onCloseClick = null, ...rest }) => {
  return (
    <div className="drag-handler relative h-[33px] max-h-[33px] min-h-[33px] px-[10px]" {...rest}>
      <div className="flex size-full items-center justify-between">
        <span className="text-[12px] font-semibold [text-shadow:_0_1px_0_#fff]">{headerText}</span>
        {!noCloseButton
          ? <>
            {isClose
              ? <LayoutTimesView onClick={onCloseClick} />
              : <LayoutSubView onClick={onCloseClick} />}
          </>
          : null}
      </div>
    </div>
  )
}
