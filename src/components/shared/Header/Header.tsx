'use client'

import { useTranslations } from 'next-intl'

import { useEffect } from 'react'

import {
  LanguageSwitcher,
  LocalizedLink,
  Logo,
  ThemeSwitcher
} from '@/src/components/shared'
import { Button } from '@/src/components/ui'
import { paths } from '@/src/config/paths'
import { useAuthStore } from '@/src/stores'
import { defineHeaderHeightCssVar } from '@/src/utils'

import { Profile } from './Profile'

export const Header = () => {
  const { user } = useAuthStore()

  const t = useTranslations()

  useEffect(() => {
    defineHeaderHeightCssVar()
  }, [])

  return (
    <header className="bg-card sticky top-0 z-10 flex items-center justify-between gap-5 rounded-b-md p-2 shadow-md">
      <Logo />

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />

        {user ? (
          <Profile />
        ) : (
          <Button asChild>
            <LocalizedLink href={paths.auth.login}>{t('login')}</LocalizedLink>
          </Button>
        )}
      </div>
    </header>
  )
}
