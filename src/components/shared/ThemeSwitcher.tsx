'use client'

import { Check, Laptop, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
import { useThemeStore } from '@/src/stores'

import type { ReactNode } from 'react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore()

  const t = useTranslations()

  const changeTheme = (value: typeof theme) => setTheme(value)

  const renderMenuItem = (
    value: typeof theme,
    label: string,
    icon: ReactNode
  ) => (
    <DropdownMenuItem onClick={() => changeTheme(value)}>
      {icon}
      <span>{label}</span>
      <span className="ml-auto">{theme === value && <Check size={16} />}</span>
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon" className="hover:bg-primary/25">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">{t('toggleTheme')}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('toggleTheme')}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {renderMenuItem('light', t('light'), <Sun size={16} />)}
        {renderMenuItem('dark', t('dark'), <Moon size={16} />)}
        {renderMenuItem('system', t('system'), <Laptop size={16} />)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
