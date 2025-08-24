import { z } from 'zod'

import type { useTranslations } from 'next-intl'

export const createPasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .string()
    .min(8, { error: t('validationMinLength', { count: 8 }) })
    .regex(/[a-z]/, { error: t('validationPasswordLowercase') })
    .regex(/[A-Z]/, { error: t('validationPasswordUppercase') })
    .regex(/[0-9]/, { error: t('validationPasswordNumber') })
    .regex(/[^a-zA-Z0-9]/, {
      error: t('validationPasswordSpecial')
    })
