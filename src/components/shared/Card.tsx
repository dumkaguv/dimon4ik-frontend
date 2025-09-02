import { Skeleton } from '@/src/components/ui'
import { cn } from '@/src/utils'

import type { ComponentProps } from 'react'

type Props = {
  isLoading?: boolean
  rows?: number
} & ComponentProps<'div'>

export const Card = ({
  children,
  className,
  isLoading = false,
  rows = 3,
  ...rest
}: Props) => {
  return (
    <div
      className={cn(
        'border-accent bg-card rounded-md border p-5 shadow-sm',
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
