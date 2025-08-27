import { LocalStorage } from '@/src/constants'

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem(LocalStorage.token)
}

export const saveAccessToken = (token: string) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(LocalStorage.token, token)
}
