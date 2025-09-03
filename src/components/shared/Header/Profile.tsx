'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut, ShieldCheck, SquareUserRound, User } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/src/components/ui'
import { paths } from '@/src/config/paths'
import { queryClient } from '@/src/config/providers'
import { useNavigate } from '@/src/hooks'
import { Api } from '@/src/services/apiClient'
import { useAuthStore } from '@/src/stores'
import { removeAccessToken, showApiErrors } from '@/src/utils'

import { LocalizedLink } from '../LocalizedLink'

export const Profile = () => {
  const { setUser, setIsPendingUser } = useAuthStore()

  const navigate = useNavigate()

  const t = useTranslations()

  const { mutateAsync: logout } = useMutation({
    mutationFn: Api.auth.logout,
    onSuccess: () => {
      removeAccessToken()
      setUser(null)
      setIsPendingUser(false)
      queryClient.cancelQueries()
      queryClient.clear()
      toast.success(t('logoutSuccess'))
      navigate(paths.auth.login)
    },
    onError: (e) => showApiErrors(e, t)
  })

  const onLogout = async () => await logout()

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipContent>{t('profile')}</TooltipContent>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon" className="hover:bg-primary/25">
              <User size={20} className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
      </Tooltip>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem asChild>
          <LocalizedLink
            href={paths.profile.root}
            className="flex items-center gap-1"
          >
            <SquareUserRound size={16} className="text-primary" />
            {t('profile')}
          </LocalizedLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LocalizedLink
            href={paths.profile.verification}
            className="flex items-center gap-1"
          >
            <ShieldCheck size={16} className="text-primary" />
            {t('verification')}
          </LocalizedLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout}>
          <LogOut size={16} className="text-primary" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
