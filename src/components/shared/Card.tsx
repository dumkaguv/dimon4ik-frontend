import { cn } from '@/src/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const Card = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        'border-accent bg-card rounded-md border-1 p-5 shadow-sm',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
