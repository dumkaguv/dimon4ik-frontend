'use client'

import { useTranslations } from 'next-intl'

import {
  LanguageSwitcher,
  LocalizedLink,
  Logo,
  ThemeSwitcher
} from '@/src/components/shared'
import { Button } from '@/src/components/ui'
import { paths } from '@/src/config/paths'

export const Header = () => {
  const t = useTranslations()

  return (
    <header className="bg-card sticky top-0 z-10 mb-5 flex items-center justify-between gap-5 rounded-b-md p-2 shadow-md">
      <Logo />

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />

        <Button asChild>
          <LocalizedLink href={paths.auth.login}>{t('login')}</LocalizedLink>
        </Button>
      </div>
    </header>
  )
}
