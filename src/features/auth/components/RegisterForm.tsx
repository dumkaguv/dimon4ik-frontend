'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { toast } from 'sonner'

import { Card } from '@/src/components/shared'
import { Button, Form } from '@/src/components/ui'

import { paths } from '@/src/config/paths'

import { createRegisterFormSchema } from '@/src/features/auth/zod'

import { Api } from '@/src/services/apiClient'

import { showApiErrors } from '@/src/utils'

import { FormHeader } from './FormHeader'
import { RegisterFormItems } from './RegisterFormItems'

import type { RegistrationPayload } from '@/src/services/auth'

export type RegisterFormValues = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const t = useTranslations()

  const schema = createRegisterFormSchema(t)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: (payload: RegistrationPayload) => Api.auth.register(payload),
    onSuccess: () => toast.success(t('emailSentSuccess'), { duration: 10000 }),
    onError: (e) => showApiErrors(e, t)
  })

  const onSubmit = async () => {
    const payload = form.getValues()
    await register(payload)
  }

  return (
    <Card className="mx-auto flex h-fit max-w-[650px] flex-col">
      <FormHeader
        titleKey="register"
        accountTextKey="haveAccount"
        url={paths.auth.login}
        urlTextKey="clickHereToLogin"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <RegisterFormItems form={form} />

          <Button type="submit" loading={isPending} className="mt-4">
            {t('register')}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
