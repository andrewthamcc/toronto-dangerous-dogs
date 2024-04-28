import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  title: string
}

export const Card = ({ children, title }: CardProps) => {
  return (
    <div className="flex flex-col rounded-lg border-[1px] p-4 px-6 shadow-lg gap-4">
      <p className="text-lg">{title}</p>
      <div className="border-b-2" />
      <div className="flex flex-col flex-grow">{children}</div>
    </div>
  )
}
