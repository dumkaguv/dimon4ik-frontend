'use client'

import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ConfirmModal, ImagePreview, Typography } from '@/src/components/shared'
import { Button, PopoverContent } from '@/src/components/ui'

import { queryClient } from '@/src/config/providers'
import { QueryKeys } from '@/src/constants'
import { Api } from '@/src/services/apiClient'
import { showApiErrors } from '@/src/utils'

import type { User } from '@/src/types'

const { Paragraph, Title } = Typography

type Props = {
  user: User
}

export const UserPopupContent = ({ user }: Props) => {
  const t = useTranslations()
  const { mutateAsync: acceptDocuments, isPending } = useMutation({
    mutationFn: () => Api.users.updateUser(String(user.userId), true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.users.root] })
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e, t)
  })

  const slides = user.documents?.map((d) => ({ src: d.fileUrl })) || []

  const onAcceptDocuments = async () => await acceptDocuments()

  return (
    <PopoverContent className="p-3">
      <Title level={5} className="mb-3">
        {t('documents')}
      </Title>

      {slides.length > 0 ? (
        <ImagePreview srcs={user.documents?.map((d) => d.fileUrl) ?? []} />
      ) : (
        <Paragraph>{t('noDocuments')}</Paragraph>
      )}

      {slides.length > 0 && !user.isVerifiedKYC && (
        <ConfirmModal okButtonProps={{ onClick: onAcceptDocuments }}>
          <Button loading={isPending} className="mt-4 w-full">
            {t('acceptDocuments')}
          </Button>
        </ConfirmModal>
      )}
    </PopoverContent>
  )
}
