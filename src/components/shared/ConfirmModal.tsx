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

import type {
  AlertDialogActionProps,
  AlertDialogCancelProps
} from '@radix-ui/react-alert-dialog'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  dialogTitle?: string
  description?: string
  cancelText?: string
  okText?: string
  okButtonProps?: AlertDialogActionProps
  cancelProps?: AlertDialogCancelProps
}

export const ConfirmModal = ({
  children,
  dialogTitle,
  description,
  cancelText,
  okText,
  okButtonProps,
  cancelProps
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

          <AlertDialogDescription>
            {description ? t(description) : ''}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel {...cancelProps}>
            {t(cancelText ?? 'cancel')}
          </AlertDialogCancel>
          <AlertDialogAction {...okButtonProps}>
            {t(okText ?? 'confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
