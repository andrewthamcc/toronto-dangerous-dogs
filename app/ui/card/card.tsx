import { PropsWithChildren } from 'react'
import InfoPopover from '../info-popover/info-popover'

interface CardProps extends PropsWithChildren {
  info?: React.ReactNode
  title: string
}

export const Card = ({ children, info, title }: CardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border-[1px] p-4 px-6 shadow-lg">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-lg">{title}</p>
        {info && <InfoPopover>{info}</InfoPopover>}
      </div>
      <div className="border-b-2" />
      <div className="flex flex-grow flex-col">{children}</div>
    </div>
  )
}
