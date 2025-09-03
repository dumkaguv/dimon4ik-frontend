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

  console.log(users)

  return (
    <Card
      isLoading={isPending}
      rows={10}
      className="flex h-fit w-full flex-col gap-8"
    >
      <Title level={2}>{`${t('users')} (${users?.data?.length})`}</Title>

      <ul className="flex flex-wrap gap-8">
        {users?.data?.map((user) => (
          <UserCard key={user.userId} user={user} />
        ))}
      </ul>
    </Card>
  )
}
