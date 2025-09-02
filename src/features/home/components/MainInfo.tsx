'use client'

import { Typography } from '@/src/components/shared'

import type { ComponentProps } from 'react'

const { Title, Paragraph } = Typography

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: Record<string, any>
} & ComponentProps<'section'>

export const MainInfo = ({ t, ...props }: Props) => {
  const details = [
    { label: t.home.dailyLimit },
    { label: t.home.acceptedCards },
    { label: t.home.supportedCurrencies },
    { label: t.home.cryptoDelivery },
    { label: t.home.requirements }
  ]

  return (
    <section
      className="my-auto flex w-full flex-col items-center justify-center"
      {...props}
    >
      <Title level={2} className="mb-6">
        {t.home.buyCryptoWithCard}
      </Title>

      <ul className="list-disc space-y-2 pl-6">
        {details.map(({ label }, id) => (
          <li key={id}>
            <Paragraph>{label}</Paragraph>
          </li>
        ))}
      </ul>
    </section>
  )
}
