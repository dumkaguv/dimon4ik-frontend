import { create } from 'zustand'

import type { User } from '@/src/types'

type AuthStoreState = {
  user: User | null
  isPendingUser: boolean
  setUser: (user: User | null) => void
  setIsPendingUser: (isPendingUser: boolean) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,

  isPendingUser: false,

  setUser: (user) => set({ user }),
  setIsPendingUser: (isPendingUser) => set({ isPendingUser })
}))
