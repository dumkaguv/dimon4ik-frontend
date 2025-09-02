'use client'

import { useQuery } from '@tanstack/react-query'

import { type PropsWithChildren, useEffect } from 'react'

import { QueryKeys } from '@/src/constants'
import { Api } from '@/src/services/apiClient'
import { useAuthStore } from '@/src/stores'
import { getAccessToken } from '@/src/utils'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const { setUser, setIsPendingUser } = useAuthStore()

  const accessToken = getAccessToken()
  const isAuth = Boolean(accessToken)

  const { data: user, isLoading } = useQuery({
    queryKey: [QueryKeys.users.me, accessToken],
    queryFn: Api.users.getUser,
    enabled: isAuth
  })

  useEffect(() => {
    setIsPendingUser(isLoading)

    if (user?.data) {
      setUser(user.data)
    }
  }, [setUser, setIsPendingUser, isLoading, user?.data])

  return children
}
