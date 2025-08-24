'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Card } from '@/src/components/shared'
import { Button, Form } from '@/src/components/ui'

import { paths } from '@/src/config/paths'

import { createLoginFormSchema } from '@/src/features/auth/zod'

import { FormHeader } from './FormHeader'
import { LoginFormItems } from './LoginFormItems'

export type LoginFormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const t = useTranslations()

  const schema = createLoginFormSchema(t)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = () => {
    console.log(form.getValues())
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

          <Button type="submit" className="mt-4">
            {t('login')}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
