import { getMessages } from 'next-intl/server'

import { BuyCrypto, MainInfo } from '@/src/features/home'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  const t = await getMessages({ locale })

  return (
    <div className="flex w-full gap-10">
      <MainInfo t={t} className="my-auto w-full" />

      <BuyCrypto t={t} className="bg-card my-auto h-full w-full rounded-lg" />
    </div>
  )
}
