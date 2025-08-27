'use client'

import { Card, Typography } from '@/src/components/shared'

import { cn } from '@/src/utils'

import { BuyCryptoForm } from './BuyCryptoForm'

import type { ComponentProps } from 'react'

const { Title, Text } = Typography

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: Record<string, any>
  className?: string
} & ComponentProps<'section'>

export const BuyCrypto = ({ t, className, ...props }: Props) => {
  return (
    <section
      className={cn('flex items-center justify-center px-8 py-5', className)}
      {...props}
    >
      <Card className="flex h-fit flex-col gap-6 px-8 shadow-lg">
        <Title level={2} className="text-2xl">
          {t.home.buyCryptoWithCard}
        </Title>

        <BuyCryptoForm />
      </Card>
    </section>
  )
}
