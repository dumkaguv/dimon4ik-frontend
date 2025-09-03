'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { Card, Typography } from '@/src/components/shared'
import { QueryKeys } from '@/src/constants'
import { Api } from '@/src/services/apiClient'

import { UserCard } from './UserCard'

const { Title } = Typography

export const UsersList = () => {
  const t = useTranslations()

  const { data: users, isPending } = useQuery({
    queryKey: [QueryKeys.users.root],
    queryFn: Api.users.getAllUsers
  })

  return (
    <Card
      isLoading={isPending}
      rows={10}
      className="flex h-fit w-full flex-col gap-8"
    >
      <Title level={2}>{`${t('users')} (${users?.data?.length ?? 0})`}</Title>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users?.data?.map((user) => (
          <li key={user.userId}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
