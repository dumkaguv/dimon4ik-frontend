'use client'

import { useQuery } from '@tanstack/react-query'

import { BadgeX, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, Typography } from '@/src/components/shared'
import { Button } from '@/src/components/ui'
import { paths } from '@/src/config/paths'
import { QueryKeys } from '@/src/constants'
import { useNavigate } from '@/src/hooks'
import { Api } from '@/src/services/apiClient'

const { Title, Paragraph, Text } = Typography

export const PersonalInfo = () => {
  const t = useTranslations()
  const navigate = useNavigate()

  const { data: personalInfo, isPending } = useQuery({
    queryKey: [QueryKeys.users.me],
    queryFn: Api.users.getUser
  })

  return (
    <Card
      className="mx-auto flex h-fit w-full max-w-[500px] flex-col gap-3"
      rows={5}
      isLoading={isPending}
    >
      <div className="flex items-center justify-between gap-10">
        <Title level={4}>{t('email')}</Title>
        <Paragraph>{personalInfo?.data?.email}</Paragraph>
      </div>

      <div className="flex items-center justify-between gap-10">
        <Title level={4}>{t('verificationKYC')}</Title>
        {personalInfo?.data?.isVerifiedKYC ? (
          <Text className="flex items-center gap-1 text-green-500">
            <ShieldCheck size={16} />
            {t('verified')}
          </Text>
        ) : (
          <Text className="flex items-center gap-1 text-red-500">
            <BadgeX size={16} />
            {t('notVerified')}
          </Text>
        )}
      </div>

      {personalInfo?.data?.isVerifiedKYC ? (
        <Button onClick={() => navigate(paths.root)} className="mt-5">
          {t('buyCrypto')}
        </Button>
      ) : (
        <Button
          onClick={() => navigate(paths.profile.verification)}
          className="mt-5"
        >
          {t('verification')}
        </Button>
      )}
    </Card>
  )
}
