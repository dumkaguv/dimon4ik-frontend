import z from 'zod'

import type { useTranslations } from 'next-intl'

const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp'
]

export const createDocumentsFormSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z.object({
    documentFRONT: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: t('fileTooLarge', { maxFileSizeMb: MAX_FILE_SIZE_MB })
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: t('fileInvalidType')
      }),
    documentBACK: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: t('fileTooLarge', { maxFileSizeMb: MAX_FILE_SIZE_MB })
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: t('fileInvalidType')
      })
  })

export type DocumentsFormSchema = z.infer<
  ReturnType<typeof createDocumentsFormSchema>
>
