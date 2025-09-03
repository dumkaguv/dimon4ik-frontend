'use client'

import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useState } from 'react'

import { toast } from 'sonner'

import { ConfirmModal, ImagePreview, Typography } from '@/src/components/shared'
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/src/components/ui'

import { Api } from '@/src/services/apiClient'
import { showApiErrors } from '@/src/utils'

import type { User } from '@/src/types'

const { Paragraph } = Typography

type Props = {
  user: User
}

export const UserModalContent = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const t = useTranslations()

  const { mutateAsync: acceptDocuments, isPending } = useMutation({
    mutationFn: Api.documents.verifyDocument,
    onSuccess: () => toast.success(t('success')),
    onError: (e) => showApiErrors(e, t)
  })

  const slides = user.documents?.map(({ fileUrl }) => ({ src: fileUrl })) || []

  const onSlide = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }
  const onClose = () => setIsOpen(false)

  const onAcceptDocuments = async () => await acceptDocuments()

  return (
    <DialogContent className="min-h-[20dvh] w-fit min-w-[300px] p-6">
      <DialogHeader>
        <DialogTitle>{t('documents')}</DialogTitle>
      </DialogHeader>

      {slides.length > 0 ? (
        <ImagePreview srcs={user.documents?.map((d) => d.fileUrl) ?? []} />
      ) : (
        <Paragraph>{t('noDocuments')}</Paragraph>
      )}

      {slides.length > 0 && (
        <ConfirmModal>
          <Button onClick={onAcceptDocuments} loading={isPending}>
            {t('acceptDocuments')}
          </Button>
        </ConfirmModal>
      )}
    </DialogContent>
  )
}
