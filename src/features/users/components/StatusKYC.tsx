'use client'

import { Loader2, ShieldCheck, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Typography } from '@/src/components/shared'

import type { User } from '@/src/types'

const { Text } = Typography

type Props = {
  user: User
}

export const StatusKYC = ({ user }: Props) => {
  const t = useTranslations()

  const isVerified = user?.isVerifiedKYC
  const areDocumentsUploaded =
    !isVerified && user.documents && user.documents?.length > 0

  if (isVerified) {
    return (
      <Text className="flex items-center gap-1 text-green-500">
        <ShieldCheck size={16} />
        {t('verified')}
      </Text>
    )
  }

  if (areDocumentsUploaded) {
    ;<Text className="flex items-center gap-1 text-yellow-500">
      <Loader2 size={16} className="animate-spin" />
      {t('pending')}
    </Text>
  }

  return (
    <Text className="flex items-center gap-1 text-red-500">
      <X size={16} />
      {t('notSubmitted')}
    </Text>
  )
}
