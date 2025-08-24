'use client'

import { useTranslations } from 'next-intl'

import { LocalizedLink, Typography } from '@/src/components/shared'

const { Title, Paragraph } = Typography

type Props = {
  titleKey: string
  accountTextKey: string
  url: string
  urlTextKey: string
}

export const FormHeader = ({
  titleKey,
  url,
  accountTextKey,
  urlTextKey
}: Props) => {
  const t = useTranslations()

  return (
    <>
      <Title level={2} className="mb-2 text-center">
        {t(titleKey)}
      </Title>
      <Paragraph className="mb-6 text-center">
        {t(accountTextKey)}{' '}
        <LocalizedLink
          href={url}
          className="text-primary underline-offset-3 hover:underline"
        >
          {t(urlTextKey)}
        </LocalizedLink>
      </Paragraph>
    </>
  )
}
