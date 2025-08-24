'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Card } from '@/src/components/shared'
import { Button, Form } from '@/src/components/ui'

import { paths } from '@/src/config/paths'

import { createRegisterFormSchema } from '@/src/features/auth/zod'

import { FormHeader } from './FormHeader'
import { RegisterFormItems } from './RegisterFormItems'

export type RegisterFormValues = {
  email: string
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
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = () => {
    console.log(form.getValues())
  }

  return (
    <Card className="mx-auto flex max-w-[650px] flex-col">
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

          <Button type="submit" className="mt-4">
            {t('register')}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
