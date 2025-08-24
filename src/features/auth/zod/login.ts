import { z } from 'zod'

import { createPasswordSchema } from '@/src/zodSchemas'

import type { useTranslations } from 'next-intl'

export const createLoginFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.email({ error: t('validationEmailInvalid') }),
    password: createPasswordSchema(t)
  })

export type LoginFormSchema = z.infer<ReturnType<typeof createLoginFormSchema>>
