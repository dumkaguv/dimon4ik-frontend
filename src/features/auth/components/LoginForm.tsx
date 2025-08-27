'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'

import { Card } from '@/src/components/shared'
import { Button, Form } from '@/src/components/ui'

import { paths } from '@/src/config/paths'

import { createLoginFormSchema } from '@/src/features/auth/zod'

import { Api } from '@/src/services/apiClient'

import { useAuthStore } from '@/src/stores'
import { saveAccessToken, showApiErrors } from '@/src/utils'

import { FormHeader } from './FormHeader'
import { LoginFormItems } from './LoginFormItems'

import type { LoginPayload } from '@/src/services/auth'

export type LoginFormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { setUser } = useAuthStore()

  const t = useTranslations()
  const schema = createLoginFormSchema(t)
  const router = useRouter()
  const locale = useLocale()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const urlRedirectAfterLogin = `/${locale}${paths.profile.root}`
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => Api.auth.login(payload),
    onSuccess: ({ data, message }) => {
      const userData = data?.user
      if (data?.tokens?.accessToken && userData) {
        saveAccessToken(data.tokens.accessToken)
        setUser(userData)
        router.push(urlRedirectAfterLogin)
        toast.success(message ?? t('loginSuccess'))
      }
    },
    onError: (e) => showApiErrors(e, t)
  })

  const onSubmit = async () => {
    const payload = form.getValues()
    await login(payload)
  }

  return (
    <Card className="mx-auto flex h-fit max-w-[650px] flex-col">
      <FormHeader
        titleKey="login"
        accountTextKey="dontHaveAccount"
        url={paths.auth.register}
        urlTextKey="clickHereToRegister"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <LoginFormItems form={form} />

          <Button type="submit" loading={isPending} className="mt-4">
            {t('login')}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
