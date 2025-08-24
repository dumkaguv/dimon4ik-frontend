'use client'

import { type ReactNode, useEffect } from 'react'

import { useThemeStore } from '@/src/stores'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { applyTheme } = useThemeStore()

  useEffect(() => {
    applyTheme()
  }, [applyTheme])

  return <>{children}</>
}
