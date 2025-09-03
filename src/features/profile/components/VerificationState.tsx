'use client'

import { Loader2, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, Typography } from '@/src/components/shared'

import type { User } from '@/src/types'

const { Text, Title } = Typography

type Props = {
  user: User
}

export const VerificationState = ({ user }: Props) => {
  const t = useTranslations()

  const isVerified = user?.isVerifiedKYC

  if (isVerified) {
    return (
      <Card className="mx-auto flex h-fit items-center gap-10">
        <Title level={5}>{t('verificationKYC')}</Title>
        <Text className="flex items-center gap-1 text-green-500">
          <ShieldCheck size={16} />
          {t('verified')}
        </Text>
      </Card>
    )
  }

  return (
    <Card className="mx-auto flex h-fit flex-col gap-5">
      <div className="flex items-center gap-10">
        <Title level={5}>{t('verificationKYC')}</Title>
        <Text className="flex items-center gap-1 text-yellow-500">
          <Loader2 size={16} className="animate-spin" />
          {t('pending')}
        </Text>
      </div>
      <Text className="text-muted-foreground">{t('weNotifyASAP')}</Text>
    </Card>
  )
}
