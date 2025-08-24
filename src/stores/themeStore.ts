import { create } from 'zustand'

export type Theme = 'light' | 'dark' | 'system'

type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
  applyTheme: (theme?: Theme) => void
}

const storageKey = 'ui-theme'

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme)
      document.documentElement.classList.remove('light', 'dark')
      const appliedTheme =
        theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : theme

      document.documentElement.classList.add(appliedTheme)
    }

    set({ theme })
  },

  applyTheme: (theme) => {
    if (typeof window !== 'undefined') {
      const current =
        theme ??
        (localStorage.getItem(storageKey) as Theme) ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light')

      const appliedTheme =
        current === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : current

      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(appliedTheme)

      set({ theme: current })
    }
  }
}))
