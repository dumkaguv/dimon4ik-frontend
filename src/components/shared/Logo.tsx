import { LoaderPinwheel } from 'lucide-react'

import { paths } from '@/src/config/paths'

import { LocalizedLink } from './LocalizedLink'
import { Typography } from './Typography'

const { Title } = Typography

export const Logo = () => {
  return (
    <LocalizedLink
      href={paths.root}
      className="hover:text-primary flex items-center gap-1"
    >
      <LoaderPinwheel size={36} className="text-primary" />

      <Title level={1} className="text-xl">
        Abra
      </Title>
    </LocalizedLink>
  )
}
