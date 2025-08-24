'use client'

import { Check } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { type FC, type SVGProps, startTransition } from 'react'

import {
  RomaniaFlagCircular,
  RussiaFlagCircular,
  UsaFlagCircular
} from '@/public/icons'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/src/components/ui'
import { usePathname, useRouter } from '@/src/i18n/navigation'

import type { Locale } from 'next-intl'

export const LanguageSwitcher = () => {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const languages: {
    code: Locale
    label: string
    icon: FC<SVGProps<SVGSVGElement>>
  }[] = [
    { code: 'en', label: t('en'), icon: UsaFlagCircular },
    { code: 'ro', label: t('ro'), icon: RomaniaFlagCircular },
    { code: 'ru', label: t('ru'), icon: RussiaFlagCircular }
  ]

  const currentLanguage = languages.find((l) => l.code === locale)

  const onLanguageChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error - params
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }
  const renderMenuItem = (
    value: Locale,
    label: string,
    Icon: FC<SVGProps<SVGSVGElement>>
  ) => (
    <DropdownMenuItem key={value} onClick={() => onLanguageChange(value)}>
      <Icon className="size-5" />
      <span>{label}</span>
      <span className="ml-auto">{locale === value && <Check size={16} />}</span>
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size="icon"
              className="hover:bg-primary/25 w-fit text-white"
            >
              {currentLanguage && (
                <>
                  <currentLanguage.icon className="size-5" />
                  <span className="max-sm:hidden">{currentLanguage.label}</span>
                </>
              )}
              <span className="sr-only">{t('changeLanguage')}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('changeLanguage')}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {languages.map(({ code, label, icon }) =>
          renderMenuItem(code, label, icon)
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
