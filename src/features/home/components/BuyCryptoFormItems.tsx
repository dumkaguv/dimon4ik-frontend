'use client'

import { useTranslations } from 'next-intl'

import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label
} from '@/src/components/ui'

import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<{ pricePay: unknown; termsAccepted: boolean }>
}

export const BuyCryptoFormItems = ({ form }: Props) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="pricePay"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{`${t('youPay')} (MDL)`}</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="95.12"
                {...field}
                value={field.value as number}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pricePay"
        render={({ field }) => (
          <FormItem className="mt-5">
            <FormLabel>{`${t('youPay')} (MDL)`}</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="95.12"
                {...field}
                value={field.value as number}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <div className="mt-5 flex items-center gap-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id="terms"
              className="size-6"
            />
            <Label
              htmlFor="terms"
              className="text-primary cursor-pointer underline underline-offset-4"
            >
              {t('acceptTerms')}
            </Label>
          </div>
        )}
      />
    </>
  )
}
