import { LocalStorage } from '@/src/constants'

export const getAccessToken = () => localStorage.getItem(LocalStorage.token)

export const saveAccessToken = (token: string) =>
  localStorage.setItem(LocalStorage.token, token)
