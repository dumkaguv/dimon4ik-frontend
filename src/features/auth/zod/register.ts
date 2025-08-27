import { z } from 'zod'

import { createPasswordSchema } from '@/src/zodSchemas'

import type { useTranslations } from 'next-intl'

export const createRegisterFormSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z
    .object({
      email: z.email({ error: t('validationEmailInvalid') }),
      username: z.string().min(1, { error: t('validationRequired') }),
      password: createPasswordSchema(t),
      confirmPassword: z.string().min(1, { error: t('validationRequired') })
    })
    .refine((fields) => fields.password === fields.confirmPassword, {
      error: t('validationPasswordMismatch'),
      path: ['confirmPassword']
    })

export type RegisterFormSchema = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>
