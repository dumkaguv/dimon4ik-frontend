import { type ComponentProps, createElement } from 'react'

import { cn } from '@/src/utils'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingTag<L extends HeadingLevel> = `h${L}`
type Props<L extends HeadingLevel> = {
  level: L
} & ComponentProps<HeadingTag<L>>

const baseClass = 'scroll-m-20 tracking-tight font-semibold text-balance'

const headingLevelClassMap: Record<HeadingLevel, string> = {
  1: 'text-4xl font-extrabold',
  2: 'text-3xl',
  3: 'text-2xl',
  4: 'text-xl',
  5: 'text-lg',
  6: 'text-base'
}

export const Title = <L extends HeadingLevel>({
  level,
  children,
  className,
  ...rest
}: Props<L>) =>
  createElement(
    `h${level}`,
    {
      ...rest,
      className: cn(baseClass, headingLevelClassMap[level], className)
    },
    children
  )
