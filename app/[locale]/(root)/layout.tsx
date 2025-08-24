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

      <main className="pb-5 max-[1280px]:px-4">{children}</main>
    </Container>
  )
}
