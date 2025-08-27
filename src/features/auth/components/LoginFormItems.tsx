'use client'

import { useTranslations } from 'next-intl'

import { InputPassword } from '@/src/components/shared'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/src/components/ui'

import type { LoginFormSchema } from '@/src/features/auth/zod'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<LoginFormSchema>
}

export const LoginFormItems = ({ form }: Props) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('email')}</FormLabel>
            <FormControl>
              <Input
                placeholder="josh-smith@gmail.com"
                autoComplete="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('password')}</FormLabel>
            <FormControl>
              <InputPassword autoComplete="new-password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
