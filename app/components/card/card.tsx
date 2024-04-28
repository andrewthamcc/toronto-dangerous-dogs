import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  title: string
}

export const Card = ({ children, title }: CardProps) => {
  return (
    <div className="rounded-lg border-[1px] p-4 px-6 shadow-lg">
      <p className="text-lg">{title}</p>
      <div className="my-2 border-b-2" />
      {children}
    </div>
  )
}
