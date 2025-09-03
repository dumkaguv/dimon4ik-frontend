'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { toast } from 'sonner'

import { Button, Form } from '@/src/components/ui'
import { paths } from '@/src/config/paths'
import { QueryKeys } from '@/src/constants'
import { createBuyCryptoSchema } from '@/src/features/home/zod'
import { useNavigate } from '@/src/hooks'
import { Api } from '@/src/services/apiClient'

import { useAuthStore } from '@/src/stores'

import { BuyCryptoFormItems } from './BuyCryptoFormItems'

export const BuyCryptoForm = () => {
  const { user, isPendingUser } = useAuthStore()
  const t = useTranslations()

  const schema = createBuyCryptoSchema(t)
  const navigate = useNavigate()

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

  const termsAccepted = form.watch('termsAccepted')

  const onSubmit = () => {
    if (!user && !isPendingUser) {
      return navigate(paths.auth.login)
    }
    if (!user?.isVerifiedKYC) {
      return toast.error(t('accountIsNotVerified'))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <BuyCryptoFormItems form={form} />

        <Button
          type="submit"
          disabled={!termsAccepted || isPendingUser}
          size="lg"
          className="mt-8 w-full"
        >
          {t('buy')}
        </Button>
      </form>
    </Form>
  )
}
