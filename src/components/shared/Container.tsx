import type { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto max-w-[1280px]">{children}</div>
}
