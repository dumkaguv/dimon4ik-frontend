'use client'

import { useTranslations } from 'next-intl'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/src/components/ui'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  dialogTitle?: string
  description?: string
  cancelText?: string
  okText?: string
}

export const ConfirmModal = ({
  children,
  dialogTitle,
  description,
  cancelText,
  okText
}: Props) => {
  const t = useTranslations()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t(dialogTitle ?? 'areYouAbsolutelySure')}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{t(description)}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t(cancelText ?? 'cancel')}</AlertDialogCancel>
          <AlertDialogAction>{t(okText ?? 'confirm')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
