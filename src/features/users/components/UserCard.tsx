'use client'

import { CircleUser } from 'lucide-react'

import { Card, Typography } from '@/src/components/shared'
import { Popover, PopoverTrigger } from '@/src/components/ui'

import { StatusKYC } from './StatusKYC'
import { UserModalContent } from './UserModalContent'

import type { User } from '@/src/types'

const { Title, Paragraph } = Typography

type Props = {
  user: User
}

export const UserCard = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card className="cursor-pointer p-4">
          <div className="flex gap-2">
            <CircleUser size={32} className="text-muted-foreground" />

            <div className="flex flex-col">
              <Title level={5} className="text-base">
                {user.email}
              </Title>
              <Paragraph className="text-sm">
                {user.profile?.username}
              </Paragraph>
              <StatusKYC user={user} />
            </div>
          </div>
        </Card>
      </PopoverTrigger>
      <UserModalContent user={user} />
    </Popover>
  )
}
