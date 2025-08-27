import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

export const useNavigate = () => {
  const router = useRouter()
  const locale = useLocale()

  const navigate = (url: string) => router.push(`/${locale}${url}`)

  return navigate
}
