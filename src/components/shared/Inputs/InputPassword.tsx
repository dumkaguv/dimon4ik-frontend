'use client'

import { Eye, EyeOff } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button, Input } from '@/src/components/ui'
import { cn } from '@/src/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'input'>

export const InputPassword = ({ className, ...rest }: Props) => {
  const [isShowed, setIsShowed] = useState(false)

  const t = useTranslations()

  const onShow = () => setIsShowed((prev) => !prev)

  return (
    <div className="flex h-12 items-center">
      <Input
        type={isShowed ? 'text' : 'password'}
        placeholder={t('inputPassword')}
        className={cn('flex-1 rounded-r-none', className)}
        autoComplete="current-password"
        {...rest}
      />
      <Button
        type="button"
        onClick={onShow}
        variant="outline"
        size="icon"
        className="h-full rounded-l-none border-l-0"
      >
        {isShowed ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  )
}
