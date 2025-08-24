import { Container, Header } from '@/src/components/shared'

import type { ReactNode } from 'react'

export default function Layout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <Container>
      <Header />

      <main className="flex min-h-[calc(100dvh-var(--header-height))] py-5 max-[1280px]:px-2">
        {children}
      </main>
    </Container>
  )
}
