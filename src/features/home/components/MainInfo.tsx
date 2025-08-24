'use client'

import { useTranslations } from 'next-intl'

import { Typography } from '@/src/components/shared'

import type { ComponentProps } from 'react'

const { Title, Paragraph } = Typography

export const MainInfo = (props: ComponentProps<'section'>) => {
  const t = useTranslations()

  const details = [
    { label: t('dailyLimit') },
    { label: t('acceptedCards') },
    { label: t('supportedCurrencies') },
    { label: t('cryptoDelivery') },
    { label: t('requirements') }
  ]

  return (
    <section {...props}>
      <Title level={2} className="mb-6">
        {t('buyCryptoWithCard')}
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
