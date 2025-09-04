'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Card } from '@/src/components/shared'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input
} from '@/src/components/ui'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/src/constants'
import { Api } from '@/src/services/apiClient'

export const AdminSettings = () => {
  const t = useTranslations()

  const form = useForm()

  const {data: cryptoPrices, isPending} = useQuery({
    queryKey: [QueryKeys.crypto.prices],
    queryFn: Api.crypto.
  })

  const onSubmit = () => {}

  return (
    <Card className="h-fit">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`${t('cryptoPrice')} (MDL)`}</FormLabel>
                <FormControl>
                  <Input placeholder="19.45" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  )
}
