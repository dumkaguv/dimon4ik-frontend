'use client'

import Link, { type LinkProps } from 'next/link'
import { useLocale } from 'next-intl'
import { type ComponentProps, type PropsWithChildren, forwardRef } from 'react'

type Props = LinkProps & ComponentProps<'a'> & PropsWithChildren

export const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, ...rest }, ref) => {
    const locale = useLocale()

    return (
      <Link ref={ref} href={`/${locale}${href}`} {...rest}>
        {children}
      </Link>
    )
  }
)

LocalizedLink.displayName = 'LocalizedLink'
