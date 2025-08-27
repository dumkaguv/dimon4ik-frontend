import { cookies as nextCookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { paths } from '@/src/config/paths'
import { Cookies } from '@/src/constants'

import type { ReactNode } from 'react'

export default async function AuthLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const cookies = await nextCookies()
  const token = cookies.get(Cookies.refreshToken)?.value
  const locale = cookies.get(Cookies.locale)?.value

  const isAuth = !!token
  if (!isAuth) {
    redirect(`/${locale}${paths.profile.root}`)
  }

  return children
}
