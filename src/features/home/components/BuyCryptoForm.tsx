'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label
} from '@/src/components/ui'
import { QueryKeys } from '@/src/constants'
import { createBuyCryptoSchema } from '@/src/features/home/zod'
import { Api } from '@/src/services/apiClient'

export const BuyCryptoForm = () => {
  const t = useTranslations()

  const schema = createBuyCryptoSchema(t)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      pricePay: 1000,
      termsAccepted: false
    }
  })

  const { data: cryptos } = useQuery({
    queryKey: [QueryKeys.crypto.root],
    queryFn: Api.crypto.getCryptos
  })

  console.log(cryptos)

  const termsAccepted = form.watch('termsAccepted')

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button
          type="submit"
          disabled={!termsAccepted}
          size="lg"
          className="mt-8 w-full"
        >
          {t('buy')}
        </Button>
      </form>
    </Form>
  )
}
