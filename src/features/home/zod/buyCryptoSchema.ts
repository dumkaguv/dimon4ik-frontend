import { z } from 'zod'

import type { useTranslations } from 'next-intl'

export const createBuyCryptoSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    pricePay: z.preprocess(
      (value) => {
        if (typeof value === 'string') {
          return parseFloat(value)
        }

        return value
      },
      z
        .number({ error: t('validationNumberError') })
        .positive({ error: t('validationNumberError') })
    ),
    termsAccepted: z.boolean().refine((val) => val === true, {
      error: t('youMustAcceptTerms')
    })
  })

export type BuyCryptoSchema =
  ReturnType<typeof createBuyCryptoSchema> extends z.ZodType<infer T>
    ? T
    : never
