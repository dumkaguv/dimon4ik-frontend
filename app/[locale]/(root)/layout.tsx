import { Container, Header } from '@/src/components/shared'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Container>
      <Header />

      <main className="flex min-h-[calc(100dvh-var(--header-height))] py-5 max-[1280px]:px-2">
        {children}
      </main>
    </Container>
  )
}
