'use client'

import { useAuthStore } from '@/src/stores'

import { AdminSettings } from './admin'

export const Settings = () => {
  const { user } = useAuthStore()

  if (user?.role === 'ADMIN') {
    return <AdminSettings />
  }

  return <div>default</div>
}
